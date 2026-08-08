import{j as e}from"./index-BugjY_CW.js";function h(i){const n={p:"p",...i.components},{Bullet:a,Callout:o,CodeBlock:c,DocsTable:d,H2:r,InlineCode:t,Prose:s}=n;return a||l("Bullet"),o||l("Callout"),c||l("CodeBlock"),d||l("DocsTable"),r||l("H2"),t||l("InlineCode"),s||l("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(r,{children:"Summary"}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"TaskCompletionSource<T>"}),` is the manual control side of the
ShardScript async model. It creates a `,e.jsx(t,{children:"ValueTask<T>"}),` that starts
in the `,e.jsx(t,{children:"PENDING"}),` state and exposes methods to transition that task to
`,e.jsx(t,{children:"COMPLETED"})," or ",e.jsx(t,{children:"FAULTED"}),`, enabling callback-based
or event-driven code to participate in `,e.jsx(t,{children:"await"}),"-based workflows."]})}),`
`,e.jsx(r,{children:"Syntax"}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"TaskCompletionSource<T>"}),` is a generic class declared in the
`,e.jsx(t,{children:"async"})," namespace. The type parameter ",e.jsx(t,{children:"T"}),` is the
result type of the task produced by the `,e.jsx(t,{children:"Task"})," property."]})}),`
`,e.jsx(c,{code:`using async;

// Create a source that produces a ValueTask<string>.
tcs: TaskCompletionSource<string> = new TaskCompletionSource<string>();

// Obtain the awaitable task.
task: ValueTask<string> = tcs.Task;

// Complete the task from any context.
tcs.SetResult("ready");

// Or signal failure.
tcs.SetException(new RuntimeException());`,language:"csharp",filename:"tcs_syntax.shard"}),`
`,e.jsx(r,{children:"Parameters / Arguments"}),`
`,e.jsx(d,{headers:["Member","Parameters","Description"],rows:[[e.jsx(t,{children:"init()"}),"—","Creates a new TaskCompletionSource<T> and allocates an internal ValueTask<T> in the PENDING state."],[e.jsx(t,{children:"SetResult(result)"}),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:"result"}),": ",e.jsx(t,{children:"T"})]}),"Transitions the internal task to COMPLETED and stores the result value."],[e.jsx(t,{children:"SetException(exception)"}),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:"exception"}),": ",e.jsx(t,{children:"any"})," (typically IThrowable)"]}),"Transitions the internal task to FAULTED and stores the exception object."]]}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:["The ",e.jsx(t,{children:"Task"}),` property takes no arguments. It returns the same
`,e.jsx(t,{children:"ValueTask<T>"})," instance every time it is accessed."]})}),`
`,e.jsx(r,{children:"Returns"}),`
`,e.jsx(d,{headers:["Member","Return Type","Description"],rows:[[e.jsx(t,{children:"Task"})(property),e.jsx(e.Fragment,{children:e.jsx(t,{children:"ValueTask<T>"})}),"The task that awaits can observe. The task is created during init() and never changes."],[e.jsx(t,{children:"SetResult(result)"}),e.jsx(e.Fragment,{children:e.jsx(t,{children:"void"})}),"Returns nothing. The result is stored inside the ValueTask<T>."],[e.jsx(t,{children:"SetException(exception)"}),e.jsx(e.Fragment,{children:e.jsx(t,{children:"void"})}),"Returns nothing. The exception is stored inside the ValueTask<T>."]]}),`
`,e.jsx(r,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Type mismatch"}),` — Passing a result value whose
type does not match the generic argument `,e.jsx(t,{children:"T"})," fails semantic analysis."]})}),e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Invalid await target"}),` — Attempting to
`,e.jsx(t,{children:"await"})," the ",e.jsx(t,{children:"TaskCompletionSource<T>"}),` itself
instead of `,e.jsx(t,{children:".Task"}),` produces a compile error; only the
`,e.jsx(t,{children:"ValueTask<T>"})," is awaitable."]})}),e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Faulted task"}),` — If the task is completed with
`,e.jsx(t,{children:"SetException"}),", calling ",e.jsx(t,{children:"ValueTask.Wait"}),` or
reading `,e.jsx(t,{children:"Result"}),` after the task is faulted re-throws the stored exception
on the caller.`]})}),e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Accessing Result before completion"}),` — Reading
`,e.jsx(t,{children:".Result"})," while the task is still ",e.jsx(t,{children:"PENDING"}),` returns
the default value for `,e.jsx(t,{children:"T"}),`; always wait or check
`,e.jsx(t,{children:"IsCompleted"})," first."]})})]}),`
`,e.jsx(o,{tone:"amber",title:"SetCanceled is not implemented",children:e.jsxs(n.p,{children:["A ",e.jsx(t,{children:"SetCanceled()"}),` method is not currently exposed on
`,e.jsx(t,{children:"TaskCompletionSource<T>"}),`. To represent cancellation, call
`,e.jsx(t,{children:"SetException"}),` with a cancellation-specific exception type or use a
`,e.jsx(t,{children:"CancellationToken"})," to short-circuit work before the task is completed."]})}),`
`,e.jsx(r,{children:"Remarks"}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"State machine and continuation resume."}),` The internal
`,e.jsx(t,{children:"ValueTask<T>"}),` stores a single continuation field. When
`,e.jsx(t,{children:"SetResult"})," or ",e.jsx(t,{children:"SetException"}),` is called, the
implementation sets the task state, stores the result or exception, and invokes
`,e.jsx(t,{children:"ResumeContinuation"}),`. If exactly one awaiter is registered, that awaiter
resumes; if no awaiter is registered yet, the continuation is invoked as soon as one attaches.`]})}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Single continuation limitation."}),` The current implementation stores only one
continuation per task. If multiple callers independently `,e.jsx(t,{children:"await"}),` the same
`,e.jsx(t,{children:"ValueTask<T>"}),`, only the last registered continuation is resumed.
To support multiple awaiters, wrap the source in an async method that returns a fresh
`,e.jsx(t,{children:"ValueTask<T>"}),` to each caller, or broadcast the result through a
collection or event.`]})}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Generic allocation."}),` During construction the runtime resolves the concrete
generic argument `,e.jsx(t,{children:"T"}),` from the instance type shape and allocates a
`,e.jsx(t,{children:"ValueTask<T>"})," via ",e.jsx(t,{children:"AllocateGeneric"}),`. The
property getter simply returns the pre-created field, so repeated accesses of
`,e.jsx(t,{children:".Task"})," are allocation-free."]})}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Synchronous completion fast path."})," If ",e.jsx(t,{children:"SetResult"}),` is called
before anyone awaits `,e.jsx(t,{children:".Task"}),`, the task is already
`,e.jsx(t,{children:"COMPLETED"}),` when the awaiter attaches. The awaiter fast path detects this
and returns immediately without suspending the state machine or interacting with the event loop.`]})}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Threading and event loop."}),` ShardScript uses a cooperative, single-threaded event
loop backed by libuv. `,e.jsx(t,{children:"SetResult"}),` and
`,e.jsx(t,{children:"SetException"}),` are safe to call from any async context or native callback,
but the continuation itself resumes on the same event-loop thread. Avoid blocking the loop inside
completion callbacks.`]})}),`
`,e.jsx(o,{tone:"blue",children:e.jsxs(n.p,{children:["Use ",e.jsx(t,{children:"TaskCompletionSource<T>"}),` whenever you need to bridge an
imperative or callback-based operation into the async/await model: timers, I/O readiness
notifications, background work completions, or native callbacks that report results later.`]})}),`
`,e.jsx(r,{children:"Examples"}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Basic callback bridge."}),` A separate async operation completes the source after a
short delay.`]})}),`
`,e.jsx(c,{code:`using stdio;
using async;

namespace demo;

public static async func CompleteLater(tcs: TaskCompletionSource<string>) -> Task
{
  // Simulate work that finishes after 10ms.
  await Task.Delay(10);
  tcs.SetResult("done asynchronously");
}

public static func Main() -> void
{
  tcs: TaskCompletionSource<string> = new TaskCompletionSource<string>();
  CompleteLater(tcs);

  // Pump the event loop until the task completes.
  ValueTask.Wait(tcs.Task);

  println(tcs.Task.Result);
}`,language:"csharp",filename:"tcs_callback_bridge.shard"}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Synchronous completion."}),` When the result is known before any awaiter attaches,
the awaiter fast path returns immediately.`]})}),`
`,e.jsx(c,{code:`using stdio;
using async;

namespace demo;

public static async func GetResultSync() -> ValueTask<string>
{
  tcs: TaskCompletionSource<string> = new TaskCompletionSource<string>();

  // Complete before anyone awaits; no suspension occurs.
  tcs.SetResult("sync");

  return await tcs.Task;
}

public static func Main() -> void
{
  task: ValueTask<string> = GetResultSync();
  ValueTask.Wait(task);
  println(task.Result);
}`,language:"csharp",filename:"tcs_sync_completion.shard"}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Error propagation."})," Use ",e.jsx(t,{children:"SetException"}),` to propagate failures
into the await site.`]})}),`
`,e.jsx(c,{code:`using stdio;
using async;

namespace demo;

public static async func FailLater(tcs: TaskCompletionSource<int>) -> Task
{
  await Task.Delay(10);
  tcs.SetException(new RuntimeException());
}

public static func Main() -> void
{
  tcs: TaskCompletionSource<int> = new TaskCompletionSource<int>();
  FailLater(tcs);

  try
  {
      ValueTask.Wait(tcs.Task);
      println(tcs.Task.Result);
  }
  catch (ex: RuntimeException)
  {
      println("task faulted as expected");
  }
}`,language:"csharp",filename:"tcs_exception.shard"}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Single-awaiter limitation."}),` Only one continuation is stored. Awaiting the same task
from two independent callers demonstrates that the second awaiter overwrites the first.`]})}),`
`,e.jsx(c,{code:`using stdio;
using async;

namespace demo;

public static async func AwaitAndPrint(tcs: TaskCompletionSource<string>, label: string) -> Task
{
  result: string = await tcs.Task;
  println(label + ": " + result);
}

public static func Main() -> void
{
  tcs: TaskCompletionSource<string> = new TaskCompletionSource<string>();

  // Only one continuation is stored on the internal ValueTask<T>.
  AwaitAndPrint(tcs, "first");
  AwaitAndPrint(tcs, "second");

  tcs.SetResult("shared");

  // Pump the loop long enough for the one resumed continuation to finish.
  Task.Delay(50).Wait();
}`,language:"csharp",filename:"tcs_single_continuation.shard"}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Checking completion before reading the result."}),` Avoid reading
`,e.jsx(t,{children:".Result"})," on a pending task."]})}),`
`,e.jsx(c,{code:`using stdio;
using async;

namespace demo;

public static func Main() -> void
{
  tcs: TaskCompletionSource<int> = new TaskCompletionSource<int>();

  if (tcs.Task.IsCompleted)
  {
      println("result: " + tcs.Task.Result);
  }
  else
  {
      println("task is still pending");
  }

  tcs.SetResult(42);

  if (tcs.Task.IsCompleted)
  {
      println("result: " + tcs.Task.Result);
  }
}`,language:"csharp",filename:"tcs_check_completion.shard"}),`
`,e.jsx(o,{tone:"amber",title:"Common mistakes",children:e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Calling SetResult more than once"}),` — The current implementation does not guard
against multiple completions. The state and stored value are overwritten, which can corrupt
awaiting logic. Complete each source exactly once.`]})}),e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Awaiting the source instead of .Task"}),` —
`,e.jsx(t,{children:"await tcs"})," is invalid; always write ",e.jsx(t,{children:"await tcs.Task"}),"."]})}),e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Expecting multi-cast continuations"}),` — If several callers need the same result,
give each caller its own `,e.jsx(t,{children:"ValueTask<T>"}),` rather than sharing one
source's task directly.`]})})]})})]})}function p(i={}){const{wrapper:n}=i.components||{};return n?e.jsx(n,{...i,children:e.jsx(h,{...i})}):h(i)}function l(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
