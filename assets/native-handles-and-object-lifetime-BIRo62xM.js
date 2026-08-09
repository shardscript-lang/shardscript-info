import{j as e}from"./index-BsFLGxt-.js";function o(l){const t={p:"p",...l.components},{Bullet:s,Callout:d,CodeBlock:a,H2:i,InlineCode:n,Prose:r}=t;return s||c("Bullet"),d||c("Callout"),a||c("CodeBlock"),i||c("H2"),n||c("InlineCode"),r||c("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(r,{children:e.jsxs(t.p,{children:[`Native libraries often sit between managed ShardScript objects and unmanaged operating-system or
third-party resources. This article explains how to store those native resources inside instance
fields using the `,e.jsx(n,{children:"nint"}),` type, how the garbage collector treats those
pointers, how to keep an object alive across async boundaries with `,e.jsx(n,{children:"ObjectRef"}),`,
and how to expose deterministic cleanup through `,e.jsx(n,{children:"IDisposable"}),"."]})}),`
`,e.jsx(i,{children:"Summary"}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:[`A ShardScript native library can store opaque C++ pointers in instance fields by using the
`,e.jsx(n,{children:"TYPE_NINT"})," field type and the ",e.jsx(n,{children:"Collector.FromNint"})," ",`
helper. The runtime never dereferences the stored pointer, but it does track the object that
contains it. For types that own native handles, implement `,e.jsx(n,{children:"IDisposable"}),` in
C++ by calling `,e.jsx(n,{children:"cls.Implements(TRAIT_DISPOSABLE)"})," and registering a"," ",`
`,e.jsx(n,{children:"Dispose()"}),` callback that releases the handle. When an object escapes a
synchronous callback into an async continuation, pin it with `,e.jsx(n,{children:"ObjectRef"}),` so
the garbage collector cannot reclaim it before the continuation runs.`]})}),`
`,e.jsx(i,{children:"What problem it solves"}),`
`,e.jsx(r,{children:e.jsx(t.p,{children:"Wrapping OS resources in managed objects creates three lifetime problems:"})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Native handles have no meaning to the GC."}),` A file
descriptor, socket, or third-party context pointer is just an integer in a field as far as the
garbage collector is concerned. The GC will not close the handle when the managed object is
collected.`]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Async callbacks can outlive the current frame."}),` If
you pass a raw `,e.jsx(n,{children:"ObjectInstance*"}),` to a thread-pool or timer callback, the
object may be collected before the callback executes.`]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Non-deterministic finalization is not enough."}),`
Relying on the GC to eventually release a native handle produces leaks and unpredictable
resource exhaustion. ShardScript code expects explicit disposal through`," ",`
`,e.jsx(n,{children:"IDisposable"}),"."]})})]}),`
`,e.jsx(i,{children:"How it works"}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Storing a native pointer."})," A field declared with ",e.jsx(n,{children:"TYPE_NINT"})," ",`
holds a boxed `,e.jsx(n,{children:"nint"}),` value. The box is a normal GC object; the pointer it
stores is opaque to the GC. Use `,e.jsx(n,{children:"Collector.FromNint(ptr, isTransient)"}),` to
create the box and `,e.jsx(n,{children:"field->AsNint()"})," to read it back. The"," ",`
`,e.jsx(n,{children:"isTransient"}),` flag tells the GC whether it should avoid freeing the box's
backing memory; use `,e.jsx(n,{children:"false"}),` for handles whose lifetime the library manages,
and `,e.jsx(n,{children:"true"}),` for truly external handles such as raw OS descriptors that the
GC should never touch.`]})}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Instance field layout."})," Register the field inside"," ",`
`,e.jsx(n,{children:"SHARDLIB_ENTRYPOINT"})," and keep the returned ",e.jsx(n,{children:"FieldSymbol*"}),`.
Its `,e.jsx(n,{children:"SlotIndex"}),` is the stable offset used at runtime. A typical disposable
wrapper stores a `,e.jsx(n,{children:"_handle"})," field of type ",e.jsx(n,{children:"TYPE_NINT"})," ",`
and a `,e.jsx(n,{children:"_disposed"})," field of type ",e.jsx(n,{children:"TYPE_BOOL"}),` so that
repeated disposal is harmless.`]})}),`
`,e.jsx(a,{code:`#include <ShardScript.hpp>
#include <shard/runtime/ObjectInstance.hpp>
#include <shard/runtime/MethodCallState.hpp>
#include <shard/runtime/GarbageCollector.hpp>

using namespace shard;

// A small native resource that the library owns and deletes.
struct TimerHandle
{
  std::int64_t IntervalMs;

  explicit TimerHandle(std::int64_t intervalMs)
      : IntervalMs(intervalMs)
  {
  }
};

static FieldSymbol* g_Timer_Disposed = nullptr;
static FieldSymbol* g_Timer_Handle = nullptr;

static ObjectInstance* timer_Init(const CallState& context)
{
  ObjectInstance* self = context.Args[0];
  std::int64_t intervalMs = context.Args[1]->AsInteger();

  // The library allocates the native object; the GC only sees the nint box.
  TimerHandle* handle = new TimerHandle(intervalMs);

  self->SetField(g_Timer_Handle->SlotIndex, context.Collector.FromNint(handle, false));
  self->SetField(g_Timer_Disposed->SlotIndex, context.Collector.FromValue(false));

  return self;
}

static ObjectInstance* timer_Dispose(const CallState& context)
{
  ObjectInstance* self = context.Args[0];
  ObjectInstance* disposedField = self->GetField(g_Timer_Disposed->SlotIndex);

  if (disposedField != nullptr && disposedField != GarbageCollector::NullInstance)
  {
      if (disposedField->AsBoolean())
      {
          return nullptr;
      }
  }

  ObjectInstance* handleField = self->GetField(g_Timer_Handle->SlotIndex);
  if (handleField != nullptr && handleField != GarbageCollector::NullInstance)
  {
      void* ptr = handleField->AsNint();
      if (ptr != nullptr)
      {
          delete static_cast<TimerHandle*>(ptr);
      }
  }

  // Clear the handle and mark the instance as disposed.
  self->SetField(g_Timer_Handle->SlotIndex, context.Collector.FromNint(nullptr, false));
  self->SetField(g_Timer_Disposed->SlotIndex, context.Collector.FromValue(true));

  return nullptr;
}`,language:"cpp",filename:"timer_callbacks.cpp"}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Registering the disposable type."})," Call"," ",`
`,e.jsx(n,{children:"cls.Implements(TRAIT_DISPOSABLE)"})," and register a public"," ",`
`,e.jsx(n,{children:"Dispose()"}),` method. The compiler can then bind resource-defers to the type
at compile time.`]})}),`
`,e.jsx(a,{code:`SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> ns(context, L"demo");

  ns.AddClass(L"Timer", ACS_PUBLIC, LINK_INSTANCE, [](SymbolBuilder<ClassSymbol> cls)
  {
      // Advertise that this type supports deterministic cleanup.
      cls.Implements(TRAIT_DISPOSABLE);

      g_Timer_Disposed = cls.AddField(L"_disposed", TYPE_BOOL, LINK_INSTANCE, ACS_PRIVATE);
      g_Timer_Handle = cls.AddField(L"_handle", TYPE_NINT, LINK_INSTANCE, ACS_PRIVATE);

      cls.AddInit()
          .AddParameter(L"intervalMs", TYPE_INT)
          .SetCallback(&timer_Init);

      cls.AddMethod(L"Dispose", TYPE_VOID, LINK_INSTANCE, ACS_PUBLIC)
          .SetCallback(&timer_Dispose);
  });
}`,language:"cpp",filename:"timer_registration.cpp"}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Reading the handle safely."})," Always guard against"," ",`
`,e.jsx(n,{children:"nullptr"})," and ",e.jsx(n,{children:"GarbageCollector::NullInstance"}),` before
dereferencing a handle. A small helper keeps the check in one place.`]})}),`
`,e.jsx(a,{code:`static TimerHandle* GetTimerHandle(ObjectInstance* instance)
{
  ObjectInstance* handleField = instance->GetField(g_Timer_Handle->SlotIndex);
  if (handleField == nullptr || handleField == GarbageCollector::NullInstance)
  {
      return nullptr;
  }

  void* ptr = handleField->AsNint();
  if (ptr == nullptr)
  {
      return nullptr;
  }

  return static_cast<TimerHandle*>(ptr);
}`,language:"cpp",filename:"timer_callbacks.cpp"}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Pinning across async boundaries."}),` When a callback schedules work on the thread pool
or a timer, the current frame no longer keeps the object alive. Wrap the instance in an`," ",`
`,e.jsx(n,{children:"ObjectRef"}),` to increment its reference count for the duration of the
continuation. The destructor decrements the reference when the continuation object is destroyed.`]})}),`
`,e.jsx(a,{code:`static ObjectInstance* timer_DelayTick(const CallState& context) noexcept
{
  ObjectInstance* self = context.Args[0];

  return shard::DoAsync(context, [self](shard::AsyncScope async)
  {
      // Pin the instance so it survives until the delayed callback runs.
      ObjectRef pinned(self);

      async.Delay(100, [async, pinned]() mutable
      {
          ObjectInstance* instance = pinned.Instance;
          TimerHandle* handle = GetTimerHandle(instance);
          if (handle != nullptr)
          {
              // Safe to use the native handle because the object is pinned.
              handle->IntervalMs = handle->IntervalMs + 1;
          }

          async.Complete();
      });
  });
}`,language:"cpp",filename:"timer_callbacks.cpp"}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Consuming the wrapper from ShardScript."})," Because the type implements"," ",`
`,e.jsx(n,{children:"IDisposable"}),`, ShardScript code can use the resource-defer form. The
compiler resolves the concrete `,e.jsx(n,{children:"Dispose()"}),` method at compile time and calls
it when the scope exits.`]})}),`
`,e.jsx(a,{code:`using stdio;
using demo;

namespace app;

public static func Main() -> void
{
  defer t: Timer = new Timer(500);
  println("timer is alive");

  // Dispose() runs here, releasing the native TimerHandle.
}`,language:"csharp",filename:"app.shard"}),`
`,e.jsx(i,{children:"Key ideas"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"The GC owns returned objects, not arguments."})," ",`
Values produced by `,e.jsx(n,{children:"Collector.FromValue"}),","," ",`
`,e.jsx(n,{children:"Collector.FromNint"}),", or ",e.jsx(n,{children:"Collector.AllocateInstance"})," ",`
are owned by the GC and safe to return. Never delete or free argument`," ",`
`,e.jsx(n,{children:"ObjectInstance*"})," pointers."]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsxs("strong",{className:"text-text-primary",children:["Use ",e.jsx(n,{children:"TYPE_NINT"}),` for opaque native
pointers.`]}),` The GC treats the field as a value type and does not follow the pointer. The
library is responsible for allocating and freeing the underlying resource.`]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsxs("strong",{className:"text-text-primary",children:["Choose ",e.jsx(n,{children:"isTransient"})," carefully."]})," ",`
Pass `,e.jsx(n,{children:"false"}),` when the library manages the pointed-to memory and will
delete or free it itself. Pass `,e.jsx(n,{children:"true"}),` for raw external handles whose
backing memory the GC must not release.`]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsxs("strong",{className:"text-text-primary",children:["Implement ",e.jsx(n,{children:"IDisposable"}),` for native
handle owners.`]})," Call ",e.jsx(n,{children:"cls.Implements(TRAIT_DISPOSABLE)"}),` and
register a `,e.jsx(n,{children:"Dispose()"}),` callback. This lets ShardScript code use resource
defers and guarantees deterministic cleanup.`]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsxs("strong",{className:"text-text-primary",children:["Make ",e.jsx(n,{children:"Dispose()"})," idempotent."]})," ",`
Track disposal with a private bool field. If the method is called twice, either from a defer and
a manual call or from nested ownership chains, the second call should return silently.`]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Pin objects that escape into async continuations."})," ",`
`,e.jsx(n,{children:"ObjectRef"}),` increments the reference counter in its constructor and
decrements it in its destructor. Use it whenever an instance is captured by a thread-pool
callback, timer, or libuv handle.`]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Null-check before dereferencing."}),` Always compare
argument and field values against `,e.jsx(n,{children:"nullptr"})," and"," ",`
`,e.jsx(n,{children:"GarbageCollector::NullInstance"})," before calling"," ",`
`,e.jsx(n,{children:"AsNint()"})," or accessing the pointed-to object."]})})]}),`
`,e.jsx(d,{tone:"blue",children:e.jsxs(t.p,{children:[e.jsx(n,{children:"ObjectRef"}),` is movable but not copyable. Capture it by value inside the async
lambda and mark the lambda `,e.jsx(n,{children:"mutable"}),` so the move-only wrapper can be moved
into the final continuation.`]})}),`
`,e.jsx(d,{tone:"amber",children:e.jsxs(t.p,{children:["Do not store a raw ",e.jsx(n,{children:"ObjectInstance*"}),` in a native struct that outlives the
synchronous callback. If the struct lives on another thread, use `,e.jsx(n,{children:"ObjectRef"})," ",`
instead. A raw pointer does not keep the managed object alive.`]})}),`
`,e.jsx(i,{children:"When to use"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsx(t.p,{children:`A managed type wraps an OS handle, file stream, socket, third-party context, or other unmanaged
resource.`})}),e.jsx(s,{children:e.jsx(t.p,{children:`The native resource must be released deterministically, not whenever the GC eventually collects
the wrapper.`})}),e.jsx(s,{children:e.jsx(t.p,{children:"The wrapper is passed to async callbacks that run after the current native method returns."})})]}),`
`,e.jsx(i,{children:"When not to use"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(t.p,{children:["The value is just a numeric identifier with no associated cleanup. Use ",e.jsx(n,{children:"int"})," ",`
or `,e.jsx(n,{children:"long"})," instead of ",e.jsx(n,{children:"nint"}),"."]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[`The resource is fully managed by another library. Do not delete a handle you do not own; store it
as `,e.jsx(n,{children:"isTransient = true"})," and let the owning library release it."]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[`The callback is synchronous and the object is only needed for the duration of the call. In that
case the caller's frame already keeps the object alive, so `,e.jsx(n,{children:"ObjectRef"}),` is
unnecessary.`]})})]}),`
`,e.jsx(i,{children:"Related articles"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"library-building/native-library-overview"}),` — what a native library is and
how the runtime loads it.`]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"library-building/library-build-setup"}),` — building a standalone native
library with CMake.`]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"syntax/resource-management/idisposable"}),` — how ShardScript code consumes
disposable types through resource defers.`]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"syntax/resource-management/garbage-collection"}),` — how the GC tracks objects
and when finalization runs.`]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"library-building/garbage-collection-rules"}),` — the full set of native
callback lifetime rules.`]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"stdlib/interop/native-interop"}),` — loading arbitrary shared libraries and
invoking raw C function pointers from ShardScript.`]})})]})]})}function p(l={}){const{wrapper:t}=l.components||{};return t?e.jsx(t,{...l,children:e.jsx(o,{...l})}):o(l)}function c(l,t){throw new Error("Expected component `"+l+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
