import{j as e}from"./index-BJYykHK7.js";function d(i){const t={p:"p",...i.components},{Bullet:s,Callout:o,CodeBlock:r,H2:l,InlineCode:n,Prose:a}=t;return s||c("Bullet"),o||c("Callout"),r||c("CodeBlock"),l||c("H2"),n||c("InlineCode"),a||c("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(a,{children:e.jsxs(t.p,{children:["ShardScript's ",e.jsx(n,{children:"async"})," and ",e.jsx(n,{children:"await"}),` keywords work on any object
that exposes the async-state trait, including objects built by native C++ libraries. The runtime provides
helpers in `,e.jsx(n,{children:"shard/runtime/NativeAsync.hpp"}),` so a native library can produce
`,e.jsx(n,{children:"async.Task"})," and ",e.jsx(n,{children:"async.ValueTask<T>"}),` without writing a
state machine by hand. This guide shows how to use `,e.jsx(n,{children:"DoAsync"}),","," ",`
`,e.jsx(n,{children:"DoValueTask"}),`, the completed and faulted shortcuts, and the event-loop rules that keep
the VM safe.`]})}),`
`,e.jsx(l,{children:"Prerequisites"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(t.p,{children:["A working native-library project that links against the ShardScript runtime shared library and includes"," ",`
`,e.jsx(n,{children:"ShardScript/include"}),"."]})}),e.jsx(s,{children:e.jsxs(t.p,{children:["The async helper header ",e.jsx(n,{children:"<shard/runtime/NativeAsync.hpp>"}),` (included transitively
by `,e.jsx(n,{children:"<ShardScript.hpp>"}),")."]})}),e.jsx(s,{children:e.jsxs(t.p,{children:["Familiarity with the callback contract described in"," ",`
`,e.jsx(n,{children:"library-building/native-library-overview"}),": every native callback receives a"," ",`
`,e.jsx(n,{children:"CallState&"})," and returns an ",e.jsx(n,{children:"ObjectInstance*"}),"."]})}),e.jsx(s,{children:e.jsxs(t.p,{children:["A ShardScript interpreter that loads your shared library with the ",e.jsx(n,{children:"-l"})," flag."]})})]}),`
`,e.jsx(l,{children:"Goal"}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:[`Expose native methods that return awaitable tasks from a C++ shared library. The consumer code in ShardScript
should be able to call the methods with `,e.jsx(n,{children:"await"}),` exactly as if they were written in the
language.`]})}),`
`,e.jsx(l,{children:"Step-by-Step Instructions"}),`
`,e.jsx(a,{children:e.jsx("strong",{children:"1. Create the library skeleton."})}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:[`Include the umbrella header and the library macros, then export the two required C-linkage entry points. The
example below registers a namespace called `,e.jsx(n,{children:"native_async"}),"."]})}),`
`,e.jsx(r,{code:`#include <ShardScript.hpp>

using namespace shard;

SHARDLIB_GETMETADATA
{
  lib.Name        = L"shard.nativeasync";
  lib.Description = L"Native async/await helpers";
  lib.Version     = L"1.0.0";
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> ns(context, L"native_async");

  // Register methods here as the steps progress.
  (void)ns;
}`,language:"cpp",filename:"native_async.cpp"}),`
`,e.jsx(a,{children:e.jsxs("strong",{children:["2. Return a plain ",e.jsx(n,{children:"async.Task"})," with ",e.jsx(n,{children:"DoAsync"}),"."]})}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"shard::DoAsync"})," creates a pending ",e.jsx(n,{children:"async.Task"}),`, passes an
`,e.jsx(n,{children:"AsyncScope"})," to your work lambda, and returns the task object. Call"," ",`
`,e.jsx(n,{children:"async.Complete()"})," when the operation finishes, or ",e.jsx(n,{children:"async.Fail(...)"})," ",`
when it errors.`]})}),`
`,e.jsx(r,{code:`static ObjectInstance* NativeAsync_Delay(const CallState& context) noexcept
{
  std::int64_t milliseconds = context.Args[0]->AsInteger();

  return shard::DoAsync(context, [milliseconds](shard::AsyncScope async)
  {
      async.Delay(milliseconds, [async]() mutable
      {
          async.Complete();
      });
  });
}`,language:"cpp",filename:"native_async.cpp"}),`
`,e.jsx(r,{code:`SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> ns(context, L"native_async");

  ns.AddMethod(L"Delay", CLASS_TASK, LINK_STATIC, ACS_PUBLIC)
      .AddParameter(L"milliseconds", TYPE_INT)
      .SetCallback(&NativeAsync_Delay);
}`,language:"cpp",filename:"native_async.cpp"}),`
`,e.jsx(a,{children:e.jsxs("strong",{children:["3. Return a valued task with ",e.jsx(n,{children:"DoValueTask"}),"."]})}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"shard::DoValueTask<T>"})," produces an"," ",`
`,e.jsx(n,{children:"async.ValueTask<T>"}),`. Register the method with the generic return type built from
`,e.jsx(n,{children:"CLASS_VALUETASK"})," and a ",e.jsx(n,{children:"SymbolFactory"}),"."]})}),`
`,e.jsx(r,{code:`static ObjectInstance* NativeAsync_ReadNumberAsync(const CallState& context) noexcept
{
  std::int64_t value = context.Args[0]->AsInteger();
  std::int64_t delayMs = context.Args[1]->AsInteger();

  return shard::DoValueTask<std::int64_t>(context, [value, delayMs](shard::AsyncValueScope<std::int64_t> async)
  {
      async.Delay(delayMs, [async, value]() mutable
      {
          async.Complete(value);
      });
  });
}`,language:"cpp",filename:"native_async.cpp"}),`
`,e.jsx(r,{code:`SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> ns(context, L"native_async");
  SymbolFactory factory(context.GetSemanticModel().Table.get());

  GenericTypeSymbol* valueTaskOfInt = factory.GenericType(CLASS_VALUETASK, { { L"T", TYPE_INT } });

  ns.AddMethod(L"ReadNumberAsync", valueTaskOfInt, LINK_STATIC, ACS_PUBLIC)
      .AddParameter(L"value", TYPE_INT)
      .AddParameter(L"delayMs", TYPE_INT)
      .SetCallback(&NativeAsync_ReadNumberAsync);
}`,language:"cpp",filename:"native_async.cpp"}),`
`,e.jsx(a,{children:e.jsx("strong",{children:"4. Use completed and faulted shortcuts for synchronous outcomes."})}),`
`,e.jsx(a,{children:e.jsx(t.p,{children:`When the result is already known, avoid scheduling a callback. Return a task that is already in the completed
or faulted state.`})}),`
`,e.jsx(r,{code:`static ObjectInstance* NativeAsync_AlreadyDone(const CallState& context) noexcept
{
  (void)context;
  return shard::CompletedTask(context);
}

static ObjectInstance* NativeAsync_AlwaysFails(const CallState& context) noexcept
{
  return shard::FaultedTask(context, L"native async fault");
}

static ObjectInstance* NativeAsync_AlreadyHasValue(const CallState& context) noexcept
{
  (void)context;
  return shard::CompletedValueTask<std::int64_t>(context, 42);
}`,language:"cpp",filename:"native_async.cpp"}),`
`,e.jsx(a,{children:e.jsx("strong",{children:"5. Move blocking work off the event-loop thread."})}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:["The VM runs async continuations on the ",e.jsx(n,{children:"ApplicationDomain"}),`'s event-loop thread.
Never block that thread with synchronous I/O or heavy computation. Use`," ",`
`,e.jsx(n,{children:"async.RunOnThreadPool"}),` to run work on a pool thread and marshal the callback back to
the loop thread.`]})}),`
`,e.jsx(r,{code:`static ObjectInstance* NativeAsync_ComputeOffLoop(const CallState& context) noexcept
{
  std::int64_t input = context.Args[0]->AsInteger();

  return shard::DoValueTask<std::int64_t>(context, [input](shard::AsyncValueScope<std::int64_t> async)
  {
      async.RunOnThreadPool(
          [input]()
          {
              // Heavy work happens on a thread-pool thread, not the event loop.
              (void)input;
          },
          [async, input]() mutable
          {
              // This callback runs on the event-loop thread, so it is safe to complete the task.
              async.Complete(input * input);
          });
  });
}`,language:"cpp",filename:"native_async.cpp"}),`
`,e.jsx(o,{tone:"blue",children:e.jsxs(t.p,{children:["Always complete or fault tasks on the owning ",e.jsx(n,{children:"ApplicationDomain"}),`'s event-loop
thread. Calling `,e.jsx(n,{children:"Complete"}),", ",e.jsx(n,{children:"Fail"}),", or"," ",`
`,e.jsx(n,{children:"ResumeContinuation"})," from a raw worker thread without marshalling can corrupt VM state."]})}),`
`,e.jsx(a,{children:e.jsx("strong",{children:"6. Manipulate tasks manually when the helpers are not enough."})}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:["For operations with complex lifecycles, allocate a ",e.jsx(n,{children:"ValueTask<T>"}),` directly, set
its state fields, store the result, and resume awaiters with`," ",`
`,e.jsx(n,{children:"ResumeContinuation"}),"."]})}),`
`,e.jsx(r,{code:`static ObjectInstance* NativeAsync_ManualValueTask(const CallState& context) noexcept
{
  ObjectInstance* task = context.Collector.AllocateGeneric(CLASS_VALUETASK, { TYPE_INT });

  // Start in the pending state so awaiters register a continuation.
  SetTaskState(task, CLASS_VALUETASK_StateField, AsyncState::PENDING, context.Collector);

  // Schedule completion later; in real code this would come from an OS callback or thread-pool result.
  shard::AsyncScope placeholder;
  placeholder.Delay(100, [task]() mutable
  {
      (void)task;
      // On the event-loop thread, promote to completed and resume awaiters.
      // SetTaskState(task, CLASS_VALUETASK_StateField, AsyncState::COMPLETED, gc);
      // task->SetField(CLASS_VALUETASK_ResultField->SlotIndex, result);
      // ResumeContinuation(task, CLASS_VALUETASK_ContinuationField, TRAIT_ASYNCSTATE_MoveNext, domain);
  });

  return task;
}`,language:"cpp",filename:"native_async.cpp"}),`
`,e.jsx(o,{tone:"amber",children:e.jsxs(t.p,{children:[`Manual task state changes must happen on the event-loop thread and must use a stable GC reference for the
task. Pin any borrowed arguments with `,e.jsx(n,{children:"ObjectRef"}),` if they outlive the synchronous
callback.`]})}),`
`,e.jsx(l,{children:"Verification"}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:[`Build the shared library with a normal CMake target. The example below assumes the ShardScript runtime library
and headers are next to the project directory; adjust `,e.jsx(n,{children:"SHARDSCRIPT_ROOT"}),` to match your
layout.`]})}),`
`,e.jsx(r,{code:`cmake_minimum_required(VERSION 3.20)
project(NativeAsync CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

set(SHARDSCRIPT_ROOT "\${CMAKE_CURRENT_SOURCE_DIR}/../ShardScript"
  CACHE PATH "Root of the ShardScript repository or install prefix")

find_library(SHARDSCRIPT_LIB
  NAMES ShardScript libShardScript
  PATHS
      "\${SHARDSCRIPT_ROOT}/build/bin"
      "\${SHARDSCRIPT_ROOT}/build/bin/Release"
      "\${SHARDSCRIPT_ROOT}/lib"
  NO_DEFAULT_PATH
  REQUIRED
)

add_library(native_async SHARED native_async.cpp)

set_target_properties(native_async PROPERTIES
  WINDOWS_EXPORT_ALL_SYMBOLS ON
  RUNTIME_OUTPUT_DIRECTORY "\${CMAKE_BINARY_DIR}/bin"
  LIBRARY_OUTPUT_DIRECTORY "\${CMAKE_BINARY_DIR}/bin"
)

target_include_directories(native_async PRIVATE "\${SHARDSCRIPT_ROOT}/ShardScript/include")
target_link_libraries(native_async PRIVATE \${SHARDSCRIPT_LIB})`,language:"cmake",filename:"CMakeLists.txt"}),`
`,e.jsx(r,{code:`# Configure and build.
cmake -S . -B build -G Ninja -DCMAKE_BUILD_TYPE=Release
cmake --build build --target native_async

# Confirm the shared library was produced.
ls build/bin/native_async.dll   # Windows
ls build/bin/libnative_async.so # Linux`,language:"bash"}),`
`,e.jsx(a,{children:e.jsx(t.p,{children:"Write a ShardScript program that awaits the native methods."})}),`
`,e.jsx(r,{code:`using stdio;
using native_async;

namespace demo;

public static async func Main() -> void
{
  await native_async.Delay(100);

  value: int = await native_async.ReadNumberAsync(7, 50);
  println("value: " + value);

  try
  {
      await native_async.AlwaysFails();
  }
  catch (e: Exception)
  {
      println("caught expected fault");
  }

  squared: int = await native_async.ComputeOffLoop(12);
  println("squared: " + squared);
}`,language:"csharp",filename:"app.shard"}),`
`,e.jsx(r,{code:`# On Windows.
shard app.shard -l build/bin/native_async.dll

# On Linux.
shard app.shard -l build/bin/libnative_async.so

# On macOS.
shard app.shard -l build/bin/libnative_async.dylib`,language:"bash"}),`
`,e.jsx(a,{children:e.jsx(t.p,{children:"Expected output:"})}),`
`,e.jsx(r,{code:`value: 7
caught expected fault
squared: 144`,language:"bash"}),`
`,e.jsx(l,{children:"Troubleshooting"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"The VM crashes after the async callback fires."}),` Verify that
the callback that completes or faults the task is running on the same`," ",`
`,e.jsx(n,{children:"ApplicationDomain"}),`'s event-loop thread. If the work started on a thread-pool
thread, use `,e.jsx(n,{children:"RunOnThreadPool"}),"'s second lambda to marshal the completion back."]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"A borrowed object is collected before the async operation finishes."})," ",`
Pin it with `,e.jsx(n,{children:"ObjectRef"}),` before handing it to a thread-pool lambda or a libuv handle.
The scope keeps the object alive until the reference is released.`]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsxs("strong",{className:"text-text-primary",children:["The compiler cannot resolve the ",e.jsx(n,{children:"ValueTask<T>"})," ",`
return type.`]})," Build the generic type with ",e.jsxs(n,{children:["factory.GenericType(CLASS_VALUETASK, "," ",`
`,'{ { L"T", TYPE_INT } }',")"]})," and pass that to ",e.jsx(n,{children:"AddMethod"}),`. Do not pass
the raw `,e.jsx(n,{children:"CLASS_VALUETASK"})," symbol as the return type."]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"The task never completes."})," Ensure"," ",`
`,e.jsx(n,{children:"async.Complete()"})," or ",e.jsx(n,{children:"async.Fail(...)"}),` is called exactly once.
The helper guards against double completion, but a missing callback or an exception swallowed on a worker
thread will leave the task pending forever.`]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"The shared library fails to load."}),` Confirm that the binary
exports `,e.jsx(n,{children:"ShardLib_GetMetadata"})," and ",e.jsx(n,{children:"ShardLib_EntryPoint"}),`, that
the runtime shared library is discoverable by the OS loader, and that the path passed to`," ",`
`,e.jsx(n,{children:"-l"})," points at the file you just built."]})})]}),`
`,e.jsx(l,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"library-building/async-helpers-reference"})," — async helper reference."]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"library-building/example-async-io"})," — async file and stream example."]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"library-building/working-with-objects"})," — pinning objects across async boundaries."]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"library-building/garbage-collection-rules"})," — object lifetime rules."]})})]})]})}function p(i={}){const{wrapper:t}=i.components||{};return t?e.jsx(t,{...i,children:e.jsx(d,{...i})}):d(i)}function c(i,t){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
