import{j as e}from"./index-B-x28vAk.js";function d(i){const s={p:"p",...i.components},{Bullet:r,Callout:o,CodeBlock:l,H2:t,InlineCode:n,Prose:a}=s;return r||c("Bullet"),o||c("Callout"),l||c("CodeBlock"),t||c("H2"),n||c("InlineCode"),a||c("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(a,{children:e.jsx(s.p,{children:`Writing a ShardScript native library is more than exporting two C-linkage symbols. The runtime expects a
coherent API surface, predictable lifetime behavior, and clean interaction with the garbage collector and
async scheduler. The practices here help you produce libraries that behave like built-in framework shards,
compose correctly with other shards, and remain maintainable as the number of native types grows.`})}),`
`,e.jsx(t,{children:"Summary"}),`
`,e.jsx(a,{children:e.jsx(s.p,{children:`A well-designed native library exposes one logical API surface per shared library, follows existing
framework naming conventions, uses the registration helpers correctly, and respects the runtime's
memory and threading model. This article explains how to structure a library, avoid common lifetime
mistakes, register symbols cleanly, produce async primitives, and declare dependencies so the loader can
enforce load order.`})}),`
`,e.jsx(t,{children:"What problem it solves"}),`
`,e.jsx(a,{children:e.jsx(s.p,{children:`Native libraries sit at the boundary between C++ and managed ShardScript code. Without a consistent design,
you can end up with:`})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Scattered or duplicated APIs"}),` — one physical file that
registers several unrelated namespaces, or several build outputs that claim the same namespace.`]})}),e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Use-after-collect crashes"}),` — an object is passed to a
thread-pool callback and collected before the callback runs.`]})}),e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Leaked native handles"}),` — a type wraps a file descriptor,
socket, or OS handle but never releases it when the managed object disappears.`]})}),e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Fragile cross-library lookups"}),` — static pointers are
initialized before the dependency has registered its symbols, producing null pointers at runtime.`]})}),e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Inconsistent async behavior"}),` — callbacks complete tasks on
the wrong thread or re-implement state machines that the runtime already provides.`]})})]}),`
`,e.jsx(a,{children:e.jsx(s.p,{children:`The guidelines below prevent these problems by matching the conventions already used in the framework
shards.`})}),`
`,e.jsx(t,{children:"How it works"}),`
`,e.jsx(a,{children:e.jsxs(s.p,{children:["A native library is any shared library (a ",e.jsx(n,{children:".dll"})," on Windows, a"," ",`
`,e.jsx(n,{children:".so"})," on Linux, or a ",e.jsx(n,{children:".dylib"}),` on macOS) that exports exactly
two C-linkage symbols: `,e.jsx(n,{children:"ShardLib_GetMetadata"})," and"," ",`
`,e.jsx(n,{children:"ShardLib_EntryPoint"}),`. The library can be built from one C++ source file or many,
and it can live inside `,e.jsx(n,{children:"ShardScript.Framework"}),` or in a completely separate project.
It links against the ShardScript runtime shared library and includes headers from`," ",`
`,e.jsx(n,{children:"ShardScript/include"}),"."]})}),`
`,e.jsx(a,{children:e.jsxs(s.p,{children:["Inside ",e.jsx(n,{children:"SHARDLIB_ENTRYPOINT"}),` you register namespaces, types, methods, properties,
and operators into the compiler's semantic model. The runtime then invokes your callbacks whenever
ShardScript code calls the registered members. Every design decision below is about keeping that contract
predictable.`]})}),`
`,e.jsx(t,{children:"Key ideas"}),`
`,e.jsx(t,{children:"One logical library per shared library"}),`
`,e.jsx(a,{children:e.jsxs(s.p,{children:["Keep one coherent API surface per shared-library output. In the framework this usually means one"," ",`
`,e.jsx(n,{children:".shard.cpp"}),` file per shared library, but the rule is broader: a single library
should own one namespace (or a small family of closely related namespaces) and one responsibility. Do not
register unrelated APIs in the same shared library, and do not split a single logical API across multiple
shared libraries unless the dependencies genuinely justify it.`]})}),`
`,e.jsx(l,{code:`#include <ShardScript.hpp>

using namespace shard;

SHARDLIB_GETMETADATA
{
  lib.Name        = L"shard.mynetworking";
  lib.Description = L"TCP and UDP networking primitives";
  lib.Version     = L"0.1.0";
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> net(context, L"net");

  net.AddClass(L"Socket", ACS_PUBLIC, LINK_INSTANCE, [](SymbolBuilder<ClassSymbol> cls)
  {
      cls.AddMethod(L"Connect", TYPE_VOID, LINK_INSTANCE)
          .AddParameter(L"host", TYPE_STRING)
          .AddParameter(L"port", TYPE_INT)
          .SetCallback(&Socket_Connect);
  });
}`,language:"cpp",filename:"mynetworking.shard.cpp"}),`
`,e.jsx(t,{children:"Mirror .NET-style APIs"}),`
`,e.jsx(a,{children:e.jsx(s.p,{children:`When you wrap OS services or design new system APIs, prefer names and shapes that match .NET class
libraries. This makes the framework feel consistent and lowers the learning curve for developers who know
other managed environments.`})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsxs(s.p,{children:["Use namespaces such as ",e.jsx(n,{children:"net"}),", ",e.jsx(n,{children:"io"}),","," ",`
`,e.jsx(n,{children:"process"}),", ",e.jsx(n,{children:"text"}),", and ",e.jsx(n,{children:"collections"}),"."]})}),e.jsx(r,{children:e.jsxs(s.p,{children:["Name stream types ",e.jsx(n,{children:"FileStream"}),", ",e.jsx(n,{children:"MemoryStream"}),","," ",`
`,e.jsx(n,{children:"StreamReader"}),", and ",e.jsx(n,{children:"StreamWriter"}),"."]})}),e.jsx(r,{children:e.jsxs(s.p,{children:["Use ",e.jsx(n,{children:"Dispose()"})," for deterministic cleanup and implement"," ",`
`,e.jsx(n,{children:"IDisposable"}),"."]})}),e.jsx(r,{children:e.jsxs(s.p,{children:["Prefer asynchronous methods that return ",e.jsx(n,{children:"async.Task"})," or"," ",`
`,e.jsx(n,{children:"async.ValueTask<T>"})," with an ",e.jsx(n,{children:"Async"})," suffix."]})})]}),`
`,e.jsx(o,{tone:"blue",children:e.jsx(s.p,{children:`Consistency matters more than literal .NET compatibility. Choose names that fit the existing framework
shards so that code written against one library transfers naturally to the next.`})}),`
`,e.jsx(t,{children:"Implement IDisposable for native handles"}),`
`,e.jsx(a,{children:e.jsxs(s.p,{children:[`Any type that owns an unmanaged handle, pointer, file descriptor, or other external resource should
implement `,e.jsx(n,{children:"IDisposable"}),". Call ",e.jsx(n,{children:".Implements(TRAIT_DISPOSABLE)"})," ",`
on the class and provide a `,e.jsx(n,{children:"Dispose"}),` method that releases the native resource. Also
store the handle in a private `,e.jsx(n,{children:"nint"}),` field so the GC does not try to interpret it as
a managed reference.`]})}),`
`,e.jsx(l,{code:`#include <ShardScript.hpp>

using namespace shard;

static FieldSymbol* FileStream_handleField = nullptr;

static ObjectInstance* FileStream_Dispose(const CallState& context)
{
  ObjectInstance* self = context.Args[0];
  ObjectInstance* handleObj = self->GetField(FileStream_handleField->SlotIndex);

  if (handleObj != nullptr && handleObj != GarbageCollector::NullInstance)
  {
      void* handle = handleObj->AsNint();

      if (handle != nullptr)
      {
          // Release the OS handle and clear the slot so Dispose is idempotent.
          CloseNativeHandle(handle);
          self->SetField(FileStream_handleField->SlotIndex, GarbageCollector::NullInstance);
      }
  }

  return nullptr;
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> io(context, L"io");

  io.AddClass(L"FileStream", ACS_PUBLIC, LINK_INSTANCE, [](SymbolBuilder<ClassSymbol> cls)
  {
      FileStream_handleField = cls.AddField(L"_handle", TYPE_NINT, LINK_INSTANCE, ACS_PRIVATE);

      cls.Implements(TRAIT_DISPOSABLE);

      cls.AddMethod(L"Dispose", TYPE_VOID, LINK_INSTANCE)
          .SetCallback(&FileStream_Dispose);
  });
}`,language:"cpp",filename:"streams.shard.cpp"}),`
`,e.jsx(t,{children:"Use ObjectRef to pin objects across async boundaries"}),`
`,e.jsx(a,{children:e.jsxs(s.p,{children:["When an ",e.jsx(n,{children:"ObjectInstance*"}),` escapes the synchronous callback boundary, for example into
a thread-pool worker or a libuv handle, the garbage collector may collect it before the async work finishes.
Use `,e.jsx(n,{children:"ObjectRef"})," to keep the object alive. The reference is released when the"," ",`
`,e.jsx(n,{children:"ObjectRef"})," goes out of scope or is assigned a new value."]})}),`
`,e.jsx(l,{code:`#include <ShardScript.hpp>
#include <shard/runtime/NativeAsync.hpp>

using namespace shard;

static ObjectInstance* Socket_ReadAsync(const CallState& context) noexcept
{
  ObjectInstance* socket = context.Args[0];

  return shard::DoValueTask<std::int64_t>(context, [socket](shard::AsyncValueScope<std::int64_t> async)
  {
      ObjectRef pinnedSocket(socket);

      async.RunOnThreadPool([async, pinnedSocket]() mutable
      {
          ObjectInstance* self = pinnedSocket.Get();

          if (self == nullptr || self == GarbageCollector::NullInstance)
          {
              async.Complete(0);
              return;
          }

          // Read from the native socket while the managed object stays pinned.
          std::int64_t bytesRead = ReadFromNativeSocket(self);
          async.Complete(bytesRead);
      });
  });
}`,language:"cpp",filename:"socket.shard.cpp"}),`
`,e.jsx(o,{tone:"red",children:e.jsxs(s.p,{children:["Do not store a raw ",e.jsx(n,{children:"ObjectInstance*"}),` in a lambda or native handle and use it later
without an `,e.jsx(n,{children:"ObjectRef"}),". The object may have been moved or collected."]})}),`
`,e.jsx(t,{children:"Avoid global constructors that touch ShardScript symbols"}),`
`,e.jsx(a,{children:e.jsxs(s.p,{children:["All symbol registration must happen inside ",e.jsx(n,{children:"SHARDLIB_ENTRYPOINT"}),`. Do not rely on
global C++ constructors to register types, cache symbol pointers, or initialize field layouts. Load order
between libraries is not guaranteed, and global constructors run before the runtime is ready to accept
registrations.`]})}),`
`,e.jsx(l,{code:`#include <ShardScript.hpp>

using namespace shard;

// Safe: these are plain pointers initialized to null and assigned inside the entry point.
static FieldSymbol* g_bufferField = nullptr;
static TypeSymbol*  g_otherType   = nullptr;

static void EnsureOtherType(SymbolTable* table)
{
  if (g_otherType != nullptr)
  {
      return;
  }

  g_otherType = SemanticModel::FindTypeByName(table, L"othernamespace.OtherType");
}

SHARDLIB_ENTRYPOINT
{
  SymbolFactory factory(context.GetSemanticModel().Table.get());
  SymbolBuilder<NamespaceSymbol> myLib(context, L"mylib");

  myLib.AddClass(L"Buffer", ACS_PUBLIC, LINK_INSTANCE, [](SymbolBuilder<ClassSymbol> cls)
  {
      ArrayTypeSymbol* byteArray = factory.Array(TYPE_BYTE);
      g_bufferField = cls.AddField(L"_data", byteArray, LINK_INSTANCE, ACS_PRIVATE);
  });
}`,language:"cpp",filename:"mylib.shard.cpp"}),`
`,e.jsx(t,{children:"Use SymbolFactory for arrays and generics"}),`
`,e.jsx(a,{children:e.jsxs(s.p,{children:["Do not construct array or generic type symbols manually. Use ",e.jsx(n,{children:"SymbolFactory"}),` so the
semantic model receives correctly linked type arguments. This is especially important when registering
generic classes or fields whose type involves a type parameter.`]})}),`
`,e.jsx(l,{code:`#include <ShardScript.hpp>
#include <shard/semantic/SymbolFactory.hpp>

using namespace shard;

SHARDLIB_ENTRYPOINT
{
  SymbolFactory factory(context.GetSemanticModel().Table.get());

  SymbolBuilder<NamespaceSymbol> collections(context, L"collections");

  collections.AddClass(L"List", ACS_PUBLIC, LINK_INSTANCE, [](SymbolBuilder<ClassSymbol> cls)
  {
      TypeParameterSymbol* T = cls.AddTypeParameter(L"T").Get();

      // Use the factory to build the array-of-T field type.
      ArrayTypeSymbol* arrayOfT = factory.Array(T);
      cls.AddField(L"_items", arrayOfT, LINK_INSTANCE, ACS_PRIVATE);

      cls.AddMethod(L"Add", TYPE_VOID, LINK_INSTANCE)
          .AddParameter(L"value", T)
          .SetCallback(&List_Add);
  });
}`,language:"cpp",filename:"collections.shard.cpp"}),`
`,e.jsx(t,{children:"Prefer DoAsync and DoValueTask"}),`
`,e.jsx(a,{children:e.jsxs(s.p,{children:["Use ",e.jsx(n,{children:"shard::DoAsync"})," and ",e.jsx(n,{children:"shard::DoValueTask<T>"}),` instead
of manually allocating task objects and manipulating libuv handles. The helpers ensure the task is created
on the correct event-loop thread, transition states safely, and marshal continuations properly.`]})}),`
`,e.jsx(l,{code:`#include <ShardScript.hpp>
#include <shard/runtime/NativeAsync.hpp>

using namespace shard;

static ObjectInstance* DelayMilliseconds(const CallState& context) noexcept
{
  std::int64_t milliseconds = context.Args[0]->AsInteger();

  return shard::DoAsync(context, [milliseconds](shard::AsyncScope async)
  {
      async.Delay(static_cast<std::uint32_t>(milliseconds), [async]() mutable
      {
          async.Complete();
      });
  });
}

static ObjectInstance* ReadTemperatureAsync(const CallState& context) noexcept
{
  return shard::DoValueTask<double>(context, [](shard::AsyncValueScope<double> async)
  {
      async.RunOnThreadPool([async]() mutable
      {
          // Simulate a sensor read on a worker thread.
          double temperature = ReadSensor();
          async.Complete(temperature);
      });
  });
}`,language:"cpp",filename:"sensors.shard.cpp"}),`
`,e.jsx(o,{tone:"blue",children:e.jsx(s.p,{children:`Fall back to manual task allocation only when you need features the helpers do not provide, such as custom
cancellation-token integration or explicit control over continuation scheduling.`})}),`
`,e.jsx(t,{children:"Document dependencies in metadata"}),`
`,e.jsx(a,{children:e.jsxs(s.p,{children:["If your library uses symbols from another shard, declare the dependency in"," ",`
`,e.jsx(n,{children:"SHARDLIB_GETMETADATA"}),`. The runtime loader uses this list to enforce load order and
to fail early with a clear message when a required shard is missing.`]})}),`
`,e.jsx(l,{code:`SHARDLIB_GETMETADATA
{
  lib.Name        = L"shard.filesystem";
  lib.Description = L"File and directory APIs";
  lib.Version     = L"0.2.0";

  static const shard::ShardLibDependencyInfo deps[] =
  {
      { L"shard.streams",   L"0.1.0" },
      { L"shard.collections", L"^0.3.0" }
  };

  lib.Dependencies = deps;
  lib.DependenciesLength = sizeof(deps) / sizeof(deps[0]);
}`,language:"cpp",filename:"filesystem.shard.cpp"}),`
`,e.jsx(a,{children:e.jsxs(s.p,{children:["Even with declared dependencies, look up cross-library symbols lazily inside"," ",`
`,e.jsx(n,{children:"EnsureSymbols"}),` helpers rather than caching pointers during static initialization.
Load order between dependencies is guaranteed, but individual symbols inside those libraries should still be
resolved on demand.`]})}),`
`,e.jsx(t,{children:"Additional conventions"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Expose constants as static properties"})," — use"," ",`
`,e.jsx(n,{children:"AddProperty"})," with a getter callback so values are read-only from ShardScript."]})}),e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Throw std::runtime_error for expected failures"}),` — the
runtime converts thrown exceptions into ShardScript exceptions with the provided message.`]})}),e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Use explicit accessibility"}),` — keep helper fields private
and public only the types and members that callers need.`]})}),e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Match linking mode to call site"}),` — register static members
with `,e.jsx(n,{children:"LINK_STATIC"})," and instance members with"," ",`
`,e.jsx(n,{children:"LINK_INSTANCE"}),"."]})})]}),`
`,e.jsx(t,{children:"When to use"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsx(s.p,{children:"You are writing a new framework shard or wrapping an external C/C++ library for ShardScript consumption."})}),e.jsx(r,{children:e.jsx(s.p,{children:`The library manages unmanaged resources, performs asynchronous I/O, or depends on symbols from other
native libraries.`})}),e.jsx(r,{children:e.jsx(s.p,{children:"You want the library to feel like a built-in part of the ShardScript standard library."})})]}),`
`,e.jsx(t,{children:"When not to use"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsxs(s.p,{children:["The code is pure ShardScript business logic. Keep it in ordinary"," ",`
`,e.jsx(n,{children:".shard"})," source files so you retain debugging and hot-reload support."]})}),e.jsx(r,{children:e.jsxs(s.p,{children:["You only need to call a few raw C functions from a one-off shared library. Use"," ",`
`,e.jsx(n,{children:"interop.NativeLibrary"})," instead of authoring a full native library."]})}),e.jsx(r,{children:e.jsx(s.p,{children:`You are tempted to register many unrelated namespaces in a single shared library. Split them into separate
libraries with their own dependencies and metadata.`})})]}),`
`,e.jsx(t,{children:"Related articles"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx(n,{children:"library-building/native-library-overview"}),` — what a native library is and how the
runtime loads it.`]})}),e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx(n,{children:"library-building/library-build-setup"}),` — CMake recipes for standalone native
libraries.`]})}),e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx(n,{children:"common-language-features/defer-and-idisposable"}),` — detailed patterns for disposable
types.`]})}),e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx(n,{children:"syntax/async/04-task-and-valuetask"}),` — how async primitives fit into ShardScript
code.`]})}),e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx(n,{children:"stdlib/interop/native-interop"}),` — loading arbitrary shared libraries from
ShardScript without writing C++.`]})})]})]})}function p(i={}){const{wrapper:s}=i.components||{};return s?e.jsx(s,{...i,children:e.jsx(d,{...i})}):d(i)}function c(i,s){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
