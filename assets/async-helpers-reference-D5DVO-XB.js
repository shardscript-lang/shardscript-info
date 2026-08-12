import{j as e}from"./index-Dw_NxEHJ.js";function h(c){const t={p:"p",...c.components},{Bullet:l,Callout:o,CodeBlock:r,DocsTable:i,H2:s,InlineCode:n,Prose:a}=t;return l||d("Bullet"),o||d("Callout"),r||d("CodeBlock"),i||d("DocsTable"),s||d("H2"),n||d("InlineCode"),a||d("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(s,{children:"Summary"}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:["The async helpers declared in ",e.jsx(n,{children:"<shard/runtime/NativeAsync.hpp>"}),` let a native
callback return ShardScript `,e.jsx(n,{children:"async.Task"})," and"," ",`
`,e.jsx(n,{children:"async.ValueTask<T>"}),` objects without manually allocating the task instance,
setting state fields, or resuming awaiters. They are built on top of the libuv event loop and the
ShardScript garbage collector.`]})}),`
`,e.jsx(s,{children:"DoAsync — Summary"}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:["Starts an asynchronous operation and returns a pending ",e.jsx(n,{children:"async.Task"}),`. The
supplied work lambda receives an `,e.jsx(n,{children:"AsyncScope"}),` that it uses to complete, fault,
delay, run thread-pool work, or await other ShardScript awaitables.`]})}),`
`,e.jsx(s,{children:"DoAsync — Syntax"}),`
`,e.jsx(r,{code:`#include <shard/runtime/NativeAsync.hpp>

shard::ObjectInstance* shard::DoAsync(
  const shard::CallState& context,
  std::function<void(shard::AsyncScope)> work);`,language:"cpp",filename:"NativeAsync.hpp"}),`
`,e.jsx(s,{children:"DoAsync — Parameters / Arguments"}),`
`,e.jsx(i,{headers:["Parameter","Type","Description"],rows:[[e.jsx(n,{children:"context"}),e.jsx(n,{children:"const shard::CallState&"}),"The callback state passed to the native method."],[e.jsx(n,{children:"work"}),e.jsx(n,{children:"std::function<void(shard::AsyncScope)>"}),"A lambda that schedules the async work and eventually calls Complete or Fail on the scope."]]}),`
`,e.jsx(s,{children:"DoAsync — Returns"}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:["Returns a ",e.jsx(n,{children:"shard::ObjectInstance*"})," that represents a pending"," ",`
`,e.jsx(n,{children:"async.Task"}),`. The task is rooted by the event loop until the work lambda
completes or faults it.`]})}),`
`,e.jsx(s,{children:"DoAsync — Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(l,{children:e.jsx(t.p,{children:`If the work lambda throws before scheduling a completion, the exception is propagated through the
runtime and the task is typically faulted by the VM.`})}),e.jsx(l,{children:e.jsxs(t.p,{children:["If the work lambda never calls ",e.jsx(n,{children:"Complete"})," or ",e.jsx(n,{children:"Fail"}),`,
the task remains pending. When the VM stops, the task is faulted automatically with a runtime
halt message.`]})})]}),`
`,e.jsx(s,{children:"DoAsync — Remarks"}),`
`,e.jsx(o,{tone:"blue",title:"Native library shape",children:e.jsxs(t.p,{children:["A ShardScript native library is any shared library (",e.jsx(n,{children:".dll"})," on Windows, ",e.jsx(n,{children:".so"})," on Linux, ",e.jsx(n,{children:".dylib"})," on macOS) that exports the two C-linkage symbols ",e.jsx(n,{children:"ShardLib_GetMetadata"})," and ",e.jsx(n,{children:"ShardLib_EntryPoint"}),". It can be built from one or many C++ source files, live inside ",e.jsx(n,{children:"ShardScript.Framework"})," or in a completely separate project, and links against the ShardScript runtime shared library using headers from ",e.jsx(n,{children:"ShardScript/include"}),". For the full registration contract, see ",e.jsx(n,{children:"native-library-overview.mdx"}),"."]})}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"DoAsync"})," allocates a ",e.jsx(n,{children:"Task"}),` instance, marks it pending,
roots it in the event loop, and then invokes the work lambda. The lambda should not perform blocking
I/O on the event-loop thread; use `,e.jsx(n,{children:"AsyncScope::RunOnThreadPool"}),` for blocking
work and resume on the loop thread in its completion callback.`]})}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:["Any managed object used inside an async continuation must be pinned with"," ",`
`,e.jsx(n,{children:"ObjectRef"}),`. Once the original native callback returns, the call frame no
longer keeps the arguments alive.`]})}),`
`,e.jsx(s,{children:"DoAsync — Examples"}),`
`,e.jsx(r,{code:`#include <ShardScript.hpp>
#include <shard/runtime/NativeAsync.hpp>

using namespace shard;

static ObjectInstance* delayed_void(const CallState& context) noexcept
{
  std::int64_t milliseconds = context.Args[0]->AsInteger();

  return DoAsync(context, [milliseconds](AsyncScope async)
  {
      async.Delay(milliseconds, [async]() mutable
      {
          async.Complete();
      });
  });
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> ns(context, L"demo");

  ns.AddClass(L"Clock", ACS_PUBLIC, LINK_STATIC, [](SymbolBuilder<ClassSymbol> type)
  {
      type.AddMethod(L"Delay", TYPE_VOID, LINK_STATIC, ACS_PUBLIC)
          .AddParameter(L"milliseconds", TYPE_INT)
          .SetCallback(&delayed_void);
  });
}`,language:"cpp",filename:"asyncdemo.cpp"}),`
`,e.jsx(s,{children:"DoValueTask<T> — Summary"}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:["Starts an asynchronous operation that produces a single value and returns a pending"," ",`
`,e.jsx(n,{children:"async.ValueTask<T>"}),". The work lambda receives an"," ",`
`,e.jsx(n,{children:"AsyncValueScope<T>"})," and completes it by calling"," ",`
`,e.jsx(n,{children:"Complete(T value)"}),"."]})}),`
`,e.jsx(s,{children:"DoValueTask<T> — Syntax"}),`
`,e.jsx(r,{code:`#include <shard/runtime/NativeAsync.hpp>

template <typename T>
shard::ObjectInstance* shard::DoValueTask(
  const shard::CallState& context,
  std::function<void(shard::AsyncValueScope<T>)> work);`,language:"cpp",filename:"NativeAsync.hpp"}),`
`,e.jsx(s,{children:"DoValueTask<T> — Parameters / Arguments"}),`
`,e.jsx(i,{headers:["Parameter","Type","Description"],rows:[[e.jsx(n,{children:"T"}),"a supported value or reference type","The result type of the ValueTask."],[e.jsx(n,{children:"context"}),e.jsx(n,{children:"const shard::CallState&"}),"The callback state passed to the native method."],[e.jsx(n,{children:"work"}),e.jsx(n,{children:"std::function<void(shard::AsyncValueScope<T>)>"}),"A lambda that schedules the work and calls Complete with the result value."]]}),`
`,e.jsx(s,{children:"DoValueTask<T> — Returns"}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:["Returns a ",e.jsx(n,{children:"shard::ObjectInstance*"})," that represents a pending"," ",`
`,e.jsx(n,{children:"async.ValueTask<T>"}),`. The result type is inferred from the template
argument.`]})}),`
`,e.jsx(s,{children:"DoValueTask<T> — Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(l,{children:e.jsxs(t.p,{children:["Throws at compile time if ",e.jsx(n,{children:"T"}),` is not one of the supported types. An
unsupported type falls back to `,e.jsx(n,{children:"Any"})," and may produce a"," ",`
`,e.jsx(n,{children:"ValueTask<any>"})," that does not match the registered return type."]})}),e.jsx(l,{children:e.jsx(t.p,{children:"Throws or faults the task if the work lambda throws before completing."})})]}),`
`,e.jsx(s,{children:"DoValueTask<T> — Remarks"}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:["Supported result types are ",e.jsx(n,{children:"std::int64_t"}),","," ",`
`,e.jsx(n,{children:"std::uint8_t"}),", ",e.jsx(n,{children:"double"}),", ",e.jsx(n,{children:"bool"}),`,
`,e.jsx(n,{children:"wchar_t"}),", ",e.jsx(n,{children:"std::wstring"}),","," ",`
`,e.jsx(n,{children:"const wchar_t*"}),", and ",e.jsx(n,{children:"ObjectInstance*"})," (including"," ",`
`,e.jsx(n,{children:"const ObjectInstance*"}),`). The helper boxes the value through the garbage
collector before storing it in the task result field.`]})}),`
`,e.jsx(s,{children:"DoValueTask<T> — Examples"}),`
`,e.jsx(r,{code:`static ObjectInstance* delayed_value(const CallState& context) noexcept
{
  std::int64_t value = context.Args[0]->AsInteger();
  std::int64_t milliseconds = context.Args[1]->AsInteger();

  return DoValueTask<std::int64_t>(context, [value, milliseconds](AsyncValueScope<std::int64_t> async)
  {
      async.Delay(milliseconds, [async, value]() mutable
      {
          async.Complete(value);
      });
  });
}`,language:"cpp",filename:"asyncdemo.cpp"}),`
`,e.jsx(s,{children:"CompletedTask — Summary"}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:["Returns an ",e.jsx(n,{children:"async.Task"}),` that is already in the completed state. Use it when a
native callback has no real asynchronous work to perform but must still return a`," ",`
`,e.jsx(n,{children:"Task"})," to satisfy its registered signature."]})}),`
`,e.jsx(s,{children:"CompletedTask — Syntax"}),`
`,e.jsx(r,{code:`#include <shard/runtime/NativeAsync.hpp>

shard::ObjectInstance* shard::CompletedTask(const shard::CallState& context);`,language:"cpp",filename:"NativeAsync.hpp"}),`
`,e.jsx(s,{children:"CompletedTask — Parameters / Arguments"}),`
`,e.jsx(a,{children:e.jsx(t.p,{children:"Takes only the callback state. No additional arguments are required."})}),`
`,e.jsx(s,{children:"CompletedTask — Returns"}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:["Returns a ",e.jsx(n,{children:"shard::ObjectInstance*"})," representing a completed"," ",`
`,e.jsx(n,{children:"async.Task"}),"."]})}),`
`,e.jsx(s,{children:"CompletedTask — Exceptions / Errors"}),`
`,e.jsx(a,{children:e.jsx(t.p,{children:`This helper does not throw. Allocation failures are handled by the garbage collector and reported
through the runtime.`})}),`
`,e.jsx(s,{children:"CompletedTask — Remarks"}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:[`The returned task has no continuation scheduled. Awaiting it completes synchronously because the
state field is already set to `,e.jsx(n,{children:"AsyncState::COMPLETED"}),"."]})}),`
`,e.jsx(s,{children:"CompletedTask — Examples"}),`
`,e.jsx(r,{code:`static ObjectInstance* noop_async(const CallState& context) noexcept
{
  return CompletedTask(context);
}`,language:"cpp",filename:"asyncdemo.cpp"}),`
`,e.jsx(s,{children:"CompletedValueTask<T> — Summary"}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:["Returns an ",e.jsx(n,{children:"async.ValueTask<T>"}),` that is already completed with the
supplied value. Use it for synchronous fast paths inside an otherwise async API.`]})}),`
`,e.jsx(s,{children:"CompletedValueTask<T> — Syntax"}),`
`,e.jsx(r,{code:`#include <shard/runtime/NativeAsync.hpp>

template <typename T>
shard::ObjectInstance* shard::CompletedValueTask(
  const shard::CallState& context,
  T value);`,language:"cpp",filename:"NativeAsync.hpp"}),`
`,e.jsx(s,{children:"CompletedValueTask<T> — Parameters / Arguments"}),`
`,e.jsx(i,{headers:["Parameter","Type","Description"],rows:[[e.jsx(n,{children:"T"}),"a supported value or reference type","The result type of the ValueTask."],[e.jsx(n,{children:"context"}),e.jsx(n,{children:"const shard::CallState&"}),"The callback state passed to the native method."],[e.jsx(n,{children:"value"}),e.jsx(n,{children:"T"}),"The value to store in the completed task."]]}),`
`,e.jsx(s,{children:"CompletedValueTask<T> — Returns"}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:["Returns a ",e.jsx(n,{children:"shard::ObjectInstance*"})," representing a completed"," ",`
`,e.jsx(n,{children:"async.ValueTask<T>"})," with the result field populated."]})}),`
`,e.jsx(s,{children:"CompletedValueTask<T> — Exceptions / Errors"}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:["This helper does not throw. An unsupported type for ",e.jsx(n,{children:"T"})," falls back to"," ",`
`,e.jsx(n,{children:"Any"})," and may produce a type mismatch at the call site."]})}),`
`,e.jsx(s,{children:"CompletedValueTask<T> — Remarks"}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:["The supported types are the same as for ",e.jsx(n,{children:"DoValueTask<T>"}),`. The value is
boxed through the garbage collector before being stored in the task result field.`]})}),`
`,e.jsx(s,{children:"CompletedValueTask<T> — Examples"}),`
`,e.jsx(r,{code:`static ObjectInstance* cached_value(const CallState& context) noexcept
{
  return CompletedValueTask<std::int64_t>(context, 42);
}`,language:"cpp",filename:"asyncdemo.cpp"}),`
`,e.jsx(s,{children:"FaultedTask — Summary"}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:["Returns an ",e.jsx(n,{children:"async.Task"}),` that is already in the faulted state. Two overloads
are provided: one that builds a `,e.jsx(n,{children:"RuntimeException"}),` from a message, and one
that accepts an existing exception object.`]})}),`
`,e.jsx(s,{children:"FaultedTask — Syntax"}),`
`,e.jsx(r,{code:`#include <shard/runtime/NativeAsync.hpp>

shard::ObjectInstance* shard::FaultedTask(
  const shard::CallState& context,
  const std::wstring& message);

shard::ObjectInstance* shard::FaultedTask(
  const shard::CallState& context,
  shard::ObjectInstance* exception);`,language:"cpp",filename:"NativeAsync.hpp"}),`
`,e.jsx(s,{children:"FaultedTask — Parameters / Arguments"}),`
`,e.jsx(i,{headers:["Parameter","Type","Description"],rows:[[e.jsx(n,{children:"context"}),e.jsx(n,{children:"const shard::CallState&"}),"The callback state passed to the native method."],[e.jsx(n,{children:"message"}),e.jsx(n,{children:"const std::wstring&"}),"The exception message stored in a new RuntimeException."],[e.jsx(n,{children:"exception"}),e.jsx(n,{children:"shard::ObjectInstance*"}),"An existing exception object. Null is stored as NullInstance."]]}),`
`,e.jsx(s,{children:"FaultedTask — Returns"}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:["Returns a ",e.jsx(n,{children:"shard::ObjectInstance*"})," representing a faulted"," ",`
`,e.jsx(n,{children:"async.Task"})," with the exception field populated."]})}),`
`,e.jsx(s,{children:"FaultedTask — Exceptions / Errors"}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:["This helper does not throw. If ",e.jsx(n,{children:"exception"})," is ",e.jsx(n,{children:"nullptr"}),`,
the helper stores `,e.jsx(n,{children:"GarbageCollector::NullInstance"})," in the exception field."]})}),`
`,e.jsx(s,{children:"FaultedTask — Remarks"}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:["The message overload is the most common way to fail a task from native code. It internally calls"," ",`
`,e.jsx(n,{children:"CreateRuntimeException"})," to build a managed"," ",`
`,e.jsx(n,{children:"RuntimeException"})," instance."]})}),`
`,e.jsx(s,{children:"FaultedTask — Examples"}),`
`,e.jsx(r,{code:`static ObjectInstance* always_fails(const CallState& context) noexcept
{
  return FaultedTask(context, L"native operation is not supported");
}`,language:"cpp",filename:"asyncdemo.cpp"}),`
`,e.jsx(s,{children:"CreateRuntimeException — Summary"}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:["Constructs a managed ",e.jsx(n,{children:"RuntimeException"}),` instance with the supplied message and
an empty stack trace. It is the same helper used by `,e.jsx(n,{children:"FaultedTask"})," and by"," ",`
`,e.jsx(n,{children:"AsyncScope::Fail(const std::wstring&)"}),"."]})}),`
`,e.jsx(s,{children:"CreateRuntimeException — Syntax"}),`
`,e.jsx(r,{code:`#include <shard/runtime/NativeAsync.hpp>

shard::ObjectInstance* shard::CreateRuntimeException(
  shard::GarbageCollector& collector,
  const std::wstring& message);`,language:"cpp",filename:"NativeAsync.hpp"}),`
`,e.jsx(s,{children:"CreateRuntimeException — Parameters / Arguments"}),`
`,e.jsx(i,{headers:["Parameter","Type","Description"],rows:[[e.jsx(n,{children:"collector"}),e.jsx(n,{children:"shard::GarbageCollector&"}),"The garbage collector used to allocate the exception instance and box the message."],[e.jsx(n,{children:"message"}),e.jsx(n,{children:"const std::wstring&"}),"The exception message stored in the RuntimeException.Message field."]]}),`
`,e.jsx(s,{children:"CreateRuntimeException — Returns"}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:["Returns a ",e.jsx(n,{children:"shard::ObjectInstance*"})," that represents a new"," ",`
`,e.jsx(n,{children:"RuntimeException"})," object. The object is owned by the garbage collector."]})}),`
`,e.jsx(s,{children:"CreateRuntimeException — Exceptions / Errors"}),`
`,e.jsx(a,{children:e.jsx(t.p,{children:`This helper does not throw. Allocation failures are reported by the garbage collector through the
runtime.`})}),`
`,e.jsx(s,{children:"CreateRuntimeException — Remarks"}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:["Use ",e.jsx(n,{children:"CreateRuntimeException"}),` when you need an exception object independently
of the async helpers, for example when implementing a custom error callback or when passing an
exception to `,e.jsx(n,{children:"AsyncScope::Fail(ObjectInstance*)"}),"."]})}),`
`,e.jsx(s,{children:"CreateRuntimeException — Examples"}),`
`,e.jsx(r,{code:`static ObjectInstance* validate_positive(const CallState& context) noexcept
{
  std::int64_t value = context.Args[0]->AsInteger();

  if (value <= 0)
  {
      ObjectInstance* exception = CreateRuntimeException(
          context.Collector,
          L"value must be greater than zero");

      return FaultedTask(context, exception);
  }

  return CompletedValueTask<std::int64_t>(context, value);
}`,language:"cpp",filename:"asyncdemo.cpp"}),`
`,e.jsx(s,{children:"FaultedValueTask<T> — Summary"}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:["Returns an ",e.jsx(n,{children:"async.ValueTask<T>"}),` that is already in the faulted state. The
helper builds a `,e.jsx(n,{children:"RuntimeException"}),` from the supplied message and faults a value task
of the requested result type.`]})}),`
`,e.jsx(s,{children:"FaultedValueTask<T> — Syntax"}),`
`,e.jsx(r,{code:`#include <shard/runtime/NativeAsync.hpp>

template <typename T>
shard::ObjectInstance* shard::FaultedValueTask(
  const shard::CallState& context,
  const std::wstring& message);`,language:"cpp",filename:"NativeAsync.hpp"}),`
`,e.jsx(s,{children:"FaultedValueTask<T> — Parameters / Arguments"}),`
`,e.jsx(i,{headers:["Parameter","Type","Description"],rows:[[e.jsx(n,{children:"T"}),"a supported value or reference type","The result type of the ValueTask."],[e.jsx(n,{children:"context"}),e.jsx(n,{children:"const shard::CallState&"}),"The callback state passed to the native method."],[e.jsx(n,{children:"message"}),e.jsx(n,{children:"const std::wstring&"}),"The exception message stored in a new RuntimeException."]]}),`
`,e.jsx(s,{children:"FaultedValueTask<T> — Returns"}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:["Returns a ",e.jsx(n,{children:"shard::ObjectInstance*"})," representing a faulted"," ",`
`,e.jsx(n,{children:"async.ValueTask<T>"})," with the exception field populated."]})}),`
`,e.jsx(s,{children:"FaultedValueTask<T> — Exceptions / Errors"}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:["This helper does not throw. It internally creates a ",e.jsx(n,{children:"RuntimeException"}),` and stores
it in the faulted task's exception field.`]})}),`
`,e.jsx(s,{children:"FaultedValueTask<T> — Remarks"}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:["Use ",e.jsx(n,{children:"FaultedValueTask<T>"}),` when a callback that returns a value task needs to
fail synchronously, for example when argument validation fails before any async work is scheduled. The
supported types for `,e.jsx(n,{children:"T"})," are the same as for"," ",`
`,e.jsx(n,{children:"DoValueTask<T>"}),"."]})}),`
`,e.jsx(s,{children:"FaultedValueTask<T> — Examples"}),`
`,e.jsx(r,{code:`static ObjectInstance* read_fails(const CallState& context) noexcept
{
  return FaultedValueTask<std::int64_t>(context, L"native read operation is not supported");
}`,language:"cpp",filename:"asyncdemo.cpp"}),`
`,e.jsx(o,{tone:"blue",title:"Completing the helper set",children:e.jsxs(t.p,{children:[e.jsx(n,{children:"FaultedValueTask<T>"})," is also available in"," ",`
`,e.jsx(n,{children:"<shard/runtime/NativeAsync.hpp>"}),". It behaves like"," ",`
`,e.jsx(n,{children:"FaultedTask"})," but allocates and faults a"," ",`
`,e.jsx(n,{children:"ValueTask<T>"})," with a ",e.jsx(n,{children:"RuntimeException"}),"."]})}),`
`,e.jsx(s,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(l,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"library-building/async-await-native"})," — using async/await in native libraries."]})}),e.jsx(l,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"library-building/example-async-io"})," — file and stream async I/O examples."]})}),e.jsx(l,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"library-building/callback-contract-overview"})," — the native callback contract."]})}),e.jsx(l,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"library-building/headers-quick-reference"})," — header locations for async helpers."]})})]}),`
`,e.jsx(s,{children:"Source"}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:["The native side of this API is implemented in ",e.jsx(n,{children:"shard/runtime/NativeAsync.hpp"}),`.
View the source on GitHub: `,e.jsx(n,{children:"https://github.com/Rikitav/ShardScript/blob/main/ShardScript/include/shard/runtime/NativeAsync.hpp"}),"."]})})]})}function x(c={}){const{wrapper:t}=c.components||{};return t?e.jsx(t,{...c,children:e.jsx(h,{...c})}):h(c)}function d(c,t){throw new Error("Expected component `"+c+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
