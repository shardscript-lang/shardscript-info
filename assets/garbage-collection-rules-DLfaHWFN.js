import{j as e}from"./index-DkFwvLJL.js";function d(s){const n={p:"p",...s.components},{Bullet:a,CodeBlock:i,DocsTable:l,H2:o,InlineCode:t,Prose:r}=n;return a||c("Bullet"),i||c("CodeBlock"),l||c("DocsTable"),o||c("H2"),t||c("InlineCode"),r||c("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(r,{children:e.jsxs(n.p,{children:[`Every native callback operates inside the ShardScript runtime's tracing garbage collector. The callback
receives raw `,e.jsx(t,{children:"ObjectInstance*"})," pointers and a ",e.jsx(t,{children:"GarbageCollector"}),`
reference, and it must follow a strict ownership contract: arguments are borrowed, returns must be GC-owned,
native handles must declare their lifetime, and objects that outlive the synchronous call must be pinned.`]})}),`
`,e.jsx(o,{children:"Summary"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[`Native library callbacks never own their arguments, always produce GC-owned return values, and must explicitly
declare whether native pointers are transient or managed. Strings returned by `,e.jsx(t,{children:"AsString()"}),`
are views into GC memory, and any object used across an async or thread-pool boundary must be kept alive with an
`,e.jsx(t,{children:"ObjectRef"}),`. Violating any of these rules causes use-after-free crashes, double frees,
or premature collection.`]})}),`
`,e.jsx(o,{children:"What problem it solves"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:["A native library is a normal shared library (",e.jsx(t,{children:".dll"}),", ",e.jsx(t,{children:".so"}),`, or
`,e.jsx(t,{children:".dylib"}),") that exports ",e.jsx(t,{children:"ShardLib_GetMetadata"})," and"," ",`
`,e.jsx(t,{children:"ShardLib_EntryPoint"}),". It can contain one source file or many, live inside"," ",`
`,e.jsx(t,{children:"ShardScript.Framework"}),` or in a completely separate project, and be built with CMake,
MSBuild, Make, or any other C++ toolchain. Because the runtime passes managed objects across the C++ boundary
as raw pointers, the library author needs a clear contract that separates borrowed references from owned
allocations. The garbage collection rules prevent memory corruption without forcing every callback to manage
refcounts manually.`]})}),`
`,e.jsx(o,{children:"How it works"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[`The runtime stops the world, traces from roots, and reclaims unreachable objects. During a native callback the
collector treats the callback's arguments as live because they are reachable from the call frame. Anything the
callback returns must either be a value already tracked by the collector or a freshly allocated object that the
collector can later trace. Native pointers stored as `,e.jsx(t,{children:"nint"}),` are opaque to the GC unless
the callback tells the collector how to treat them.`]})}),`
`,e.jsx(l,{headers:["Rule","What to do","Why it matters"],rows:[["Arguments are borrowed","Read from context.Args but never delete or free them.","The caller owns the argument objects; freeing them corrupts the caller frame."],["Returns are GC-owned","Box return values through context.Collector.","The caller expects to receive a live object that the GC can trace."],["Native pointers declare lifetime","Use FromNint(ptr, isTransient) with the correct flag.","The GC must know whether it can free the underlying memory."],["Async objects are pinned","Wrap objects in ObjectRef before handing them to a thread pool or timer.","An object reachable only from native code is collected when the callback returns."],["Strings are copied for native use","Copy AsString() into std::wstring if you keep it.","AsString() is a view into a GC-managed string that may move or be reclaimed."]]}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"1. Arguments are borrowed."})," The objects in ",e.jsx(t,{children:"context.Args"}),` belong to the
caller. You can read their fields, call their methods through the runtime API, and pass them back as return
values, but you must not call `,e.jsx(t,{children:"delete"}),", ",e.jsx(t,{children:"free"}),`, or any destructor
on them.`]})}),`
`,e.jsx(i,{code:`static ObjectInstance* Increment(const CallState& context)
{
  // The argument is borrowed; we only read from it.
  ObjectInstance* arg = context.Args[0];

  if (arg == nullptr || arg == GarbageCollector::NullInstance)
  {
      return context.Collector.FromValue(static_cast<std::int64_t>(0));
  }

  std::int64_t value = arg->AsInteger();

  // Returning the boxed value gives ownership to the GC, not to the caller's stack.
  return context.Collector.FromValue(value + 1);
}`,language:"cpp",filename:"callbacks.cpp"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"2. Return values must be GC-owned."})," Always allocate or box return values through"," ",`
`,e.jsx(t,{children:"context.Collector"}),`. Returning a stack pointer, a local variable address, or an
unboxed primitive pointer crashes the runtime when the collector tries to trace it.`]})}),`
`,e.jsx(i,{code:`static ObjectInstance* MakeGreeting(const CallState& context)
{
  // The collector allocates the string object and owns it.
  return context.Collector.FromValue(L"Hello from native code");
}

static ObjectInstance* AllocateBuffer(const CallState& context)
{
  // The returned array is GC-owned and safe to hand back to ShardScript.
  ObjectInstance* buffer = context.Collector.AllocateArray(TYPE_BYTE, 1024);
  return buffer;
}`,language:"cpp",filename:"callbacks.cpp"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"3. Native pointers are transient or managed."}),` When you store a C++ pointer inside a managed
`,e.jsx(t,{children:"nint"}),", tell the collector whether it should treat the pointer as opaque data. Use"," ",`
`,e.jsx(t,{children:"isTransient = true"}),` for raw OS handles, external library pointers, and anything the
GC must never free. Use `,e.jsx(t,{children:"isTransient = false"}),` only when the GC is allowed to reclaim
the memory.`]})}),`
`,e.jsx(i,{code:`static ObjectInstance* OpenHandle(const CallState& context)
{
  // A raw OS handle must never be freed by the GC.
  void* osHandle = OpenSomeNativeResource();

  return context.Collector.FromNint(osHandle, true);
}

static ObjectInstance* CreateNativeBuffer(const CallState& context)
{
  // A buffer allocated by the native library and intended to be released by the GC.
  std::uint8_t* buffer = new std::uint8_t[256];

  return context.Collector.FromNint(buffer, false);
}`,language:"cpp",filename:"callbacks.cpp"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"4. Pin objects that escape the synchronous callback."}),` When an object is captured by a
thread-pool callback, a libuv handle, or any other async continuation, the runtime's stack frame no longer
keeps it alive. Create an `,e.jsx(t,{children:"ObjectRef"})," to pin the object until the continuation runs."]})}),`
`,e.jsx(i,{code:`static ObjectInstance* ReadAsync(const CallState& context)
{
  ObjectInstance* stream = context.Args[0];

  // Pin the stream so it survives past the end of this callback.
  ObjectRef pinnedStream(stream);

  return shard::DoAsync(context, [pinnedStream](shard::AsyncScope async)
  {
      async.RunOnThreadPool([pinnedStream, async]() mutable
      {
          ObjectInstance* buffer = ReadFromNativeHandle(pinnedStream.Get());

          async.Complete(buffer);
      });
  });
}`,language:"cpp",filename:"callbacks.cpp"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"5. Strings are views into GC memory."})," ",e.jsx(t,{children:"AsString()"}),` returns a pointer
to the characters inside a managed string instance. If you need the string after the callback returns, copy
it into a `,e.jsx(t,{children:"std::wstring"}),`. Never store the raw pointer in native state that outlives the
callback.`]})}),`
`,e.jsx(i,{code:`static ObjectInstance* ToUpperCase(const CallState& context)
{
  ObjectInstance* arg = context.Args[0];

  if (arg == nullptr || arg == GarbageCollector::NullInstance)
  {
      return context.Collector.FromValue(std::wstring());
  }

  // Copy the view so we can safely manipulate it.
  std::wstring text = arg->AsString();

  for (std::size_t i = 0; i < text.size(); i++)
  {
      text[i] = static_cast<wchar_t>(std::towupper(static_cast<wint_t>(text[i])));
  }

  return context.Collector.FromValue(text);
}`,language:"cpp",filename:"callbacks.cpp"}),`
`,e.jsx(o,{children:"Key ideas"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Borrowed means read-only with respect to lifetime."}),` You can inspect, measure, and traverse
argument objects, but their destruction is the caller's responsibility. Returning an argument without
allocating a new object is valid because the caller already owns it.`]})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"The collector is the only owner of returned objects."}),` Box primitives, allocate instances, and
create arrays through `,e.jsx(t,{children:"context.Collector"}),`. The runtime expects every return value to be
either `,e.jsx(t,{children:"nullptr"})," for ",e.jsx(t,{children:"void"})," or a valid GC object."]})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Transient is the safe default for opaque handles."}),` Most native resources — file descriptors,
sockets, OS handles, third-party library pointers — should be passed with `,e.jsx(t,{children:"isTransient = true"}),`.
Only set `,e.jsx(t,{children:"isTransient = false"}),` when you have designed an explicit disposal path and want the
GC to call it.`]})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"ObjectRef is refcount pinning, not a root."}),` It keeps the object alive while the reference exists,
but it does not prevent finalization logic from running elsewhere. Use it whenever an object leaves the
synchronous call stack.`]})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"String views are invalidated by collection and compaction."})," Treat ",e.jsx(t,{children:"AsString()"}),`
like a temporary span. Copy before suspending, before allocating more GC objects, or before returning control to
the runtime if you need the text later.`]})}),`
`,e.jsx(o,{children:"When to use"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(a,{children:e.jsx(n.p,{children:"You are writing a callback that returns a managed object, string, array, or boxed primitive."})}),e.jsx(a,{children:e.jsxs(n.p,{children:["You are wrapping a native handle or pointer in a ",e.jsx(t,{children:"nint"})," field."]})}),e.jsx(a,{children:e.jsx(n.p,{children:"You are scheduling async work or thread-pool work that references a managed object."})}),e.jsx(a,{children:e.jsx(n.p,{children:"You need to store text from a ShardScript string beyond the lifetime of the current callback."})})]}),`
`,e.jsx(o,{children:"When not to use"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(a,{children:e.jsx(n.p,{children:`You are writing pure ShardScript code. These rules apply only to the C++ callback boundary; managed code
follows the normal ShardScript garbage-collection semantics.`})}),e.jsx(a,{children:e.jsxs(n.p,{children:["You only need to read a primitive value from an argument and perform a side effect. In that case return"," ",`
`,e.jsx(t,{children:"nullptr"})," for ",e.jsx(t,{children:"void"})," and do not allocate."]})}),e.jsx(a,{children:e.jsx(n.p,{children:`You are passing a pointer that is owned by static process state and never freed. Mark it transient, but do
not try to make the GC manage it.`})})]}),`
`,e.jsx(o,{children:"Related articles"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"library-building/native-library-overview"}),` — what a native library is and how the
runtime loads it.`]})}),e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"library-building/shardlib-entrypoint"})," — registering namespaces, types, and callbacks."]})}),e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"syntax/resource-management/01-garbage-collection"}),` — garbage collection from the
ShardScript language perspective.`]})}),e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"stdlib/interop/native-interop"})," — loading arbitrary shared libraries and raw C pointers."]})}),e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"syntax/async/04-task-and-valuetask"})," — producing async primitives from native code."]})}),e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"common-language-features/defer-and-idisposable"}),` — releasing native handles held by managed
objects.`]})})]})]})}function u(s={}){const{wrapper:n}=s.components||{};return n?e.jsx(n,{...s,children:e.jsx(d,{...s})}):d(s)}function c(s,n){throw new Error("Expected component `"+s+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};
