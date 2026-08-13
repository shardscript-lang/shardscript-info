import{j as e}from"./index-DLc5xCYN.js";function h(i){const n={p:"p",...i.components},{Bullet:c,Callout:d,CodeBlock:t,DocsTable:o,H2:r,InlineCode:s,Prose:a}=n;return c||l("Bullet"),d||l("Callout"),t||l("CodeBlock"),o||l("DocsTable"),r||l("H2"),s||l("InlineCode"),a||l("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(r,{children:"Summary"}),`
`,e.jsx(a,{children:e.jsxs(n.p,{children:["ShardScript provides two task-like types in the ",e.jsx(s,{children:"async"})," namespace:"," ",`
`,e.jsx(s,{children:"Task"})," for void-returning asynchronous operations, and"," ",`
`,e.jsx(s,{children:"ValueTask<T>"}),` for operations that produce a typed result. Both
implement the awaiter pattern (`,e.jsx(s,{children:"IAsyncState"}),", ",e.jsx(s,{children:"IAwaitable"}),","," ",`
`,e.jsx(s,{children:"IAwaiter"}),`) and integrate with the libuv-based cooperative event loop. The
`,e.jsx(s,{children:"shard.async"})," library adds ",e.jsx(s,{children:"TaskCompletionSource<T>"}),`,
which lets non-async code or native callbacks manually complete a `,e.jsx(s,{children:"ValueTask<T>"}),"."]})}),`
`,e.jsx(r,{children:"Syntax"}),`
`,e.jsx(a,{children:e.jsxs(n.p,{children:["An ",e.jsx(s,{children:"async"})," method declares ",e.jsx(s,{children:"Task"})," or"," ",`
`,e.jsx(s,{children:"ValueTask<T>"})," as its return type. Inside the method body, use"," ",`
`,e.jsx(s,{children:"await"}),` to suspend until an awaitable completes. From synchronous entry points,
use `,e.jsx(s,{children:"Task.Wait(task)"})," or ",e.jsx(s,{children:"ValueTask.Wait(task)"}),` to pump
the event loop until completion.`]})}),`
`,e.jsx(t,{code:`using stdio;
using async;

namespace demo;

public static async func DelayedHello() -> Task
{
  println("before delay");
  await Task.Delay(100);
  println("after delay");
}

public static func Main() -> void
{
  task: Task = DelayedHello();
  task.Wait();
  println("done");
}`,language:"csharp",filename:"task_basic.shard"}),`
`,e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx(s,{children:"ValueTask<T>"}),` is declared with an explicit result type and returns a value
with the ordinary `,e.jsx(s,{children:"return"})," statement:"]})}),`
`,e.jsx(t,{code:`using stdio;
using async;

namespace demo;

public static async func FetchNumber() -> ValueTask<int>
{
  await Task.Delay(10);
  return 42;
}

public static func Main() -> void
{
  task: ValueTask<int> = FetchNumber();
  ValueTask.Wait(task);
  result: int = task.Result;
  println(result);
}`,language:"csharp",filename:"valuetask_basic.shard"}),`
`,e.jsx(r,{children:"Parameters / Arguments"}),`
`,e.jsx(o,{headers:["Member","Parameter","Type","Description"],rows:[[e.jsx(s,{children:"Task.Delay(milliseconds)"}),e.jsx(s,{children:"milliseconds"}),"int","Number of milliseconds to wait before the returned Task completes."],[e.jsx(s,{children:"Task.Wait(task)"}),e.jsx(s,{children:"task"}),e.jsx(s,{children:"Task"}),"Task to block on. Pumps the event loop until the task leaves PENDING state."],[e.jsx(s,{children:"Task.Shoot(task)"}),e.jsx(s,{children:"task"}),e.jsx(s,{children:"Task"}),"Marks the task as fire-and-forget so the caller is not bound to its frame."],[e.jsx(s,{children:"Task.Shoot<T>(task)"}),e.jsx(s,{children:"task"}),e.jsx(s,{children:"ValueTask<T>"}),"Generic overload for ValueTask&lt;T&gt; fire-and-forget."],[e.jsx(s,{children:"ValueTask.Wait(task)"}),e.jsx(s,{children:"task"}),e.jsx(s,{children:"ValueTask<T>"}),"ValueTask to block on. Pumps the event loop until the task leaves PENDING state."],[e.jsx(s,{children:"ValueTask.FromResult<T>(value)"}),e.jsx(s,{children:"value"}),"T","Value to store in an already-completed ValueTask&lt;T&gt;."],[e.jsx(s,{children:"TaskCompletionSource<T>.SetResult(value)"}),e.jsx(s,{children:"value"}),"T","Value to publish through the exposed Task property."],[e.jsx(s,{children:"TaskCompletionSource<T>.SetException(exception)"}),e.jsx(s,{children:"exception"}),e.jsx(s,{children:"Throwable"}),"Exception to store and re-throw when the task is awaited or waited on."]]}),`
`,e.jsx(r,{children:"Returns"}),`
`,e.jsx(o,{headers:["Member","Return Type","Description"],rows:[[e.jsx(s,{children:"async func ... -> Task"}),e.jsx(s,{children:"Task"}),"A reference to the pending or completed void task."],[e.jsx(s,{children:"async func ... -> ValueTask<T>"}),e.jsx(s,{children:"ValueTask<T>"}),"A reference to the pending or completed task carrying a result of type T."],[e.jsx(s,{children:"Task.Delay(ms)"}),e.jsx(s,{children:"Task"}),"A task that completes after the libuv timer fires."],[e.jsx(s,{children:"ValueTask.FromResult<T>(value)"}),e.jsx(s,{children:"ValueTask<T>"}),"An already-completed task containing the supplied value."],[e.jsx(s,{children:"TaskCompletionSource<T>.Task"}),e.jsx(s,{children:"ValueTask<T>"}),"The ValueTask&lt;T&gt; controlled by the completion source."],[e.jsx(s,{children:"task.Result"}),"T","The stored result of a completed ValueTask&lt;T&gt;."],[e.jsx(s,{children:"task.IsCompleted"}),"bool","True when the task is COMPLETED or FAULTED; false while PENDING."]]}),`
`,e.jsx(r,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(c,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Faulted task on Wait()"})," — If a task completes with"," ",`
`,e.jsx(s,{children:"FAULTED"})," state, ",e.jsx(s,{children:"Task.Wait"})," or"," ",`
`,e.jsx(s,{children:"ValueTask.Wait"})," re-throws the captured exception in the calling frame."]})}),e.jsx(c,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Faulted task on await"})," — Awaiting a faulted task calls"," ",`
`,e.jsx(s,{children:"GetResult()"}),`, which raises the stored exception inside the async method so it
can be caught with an ordinary `,e.jsx(s,{children:"try"}),"/",e.jsx(s,{children:"catch"})," block."]})}),e.jsx(c,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Result before completion"})," — Reading"," ",`
`,e.jsx(s,{children:"ValueTask<T>.Result"})," while the task is still ",e.jsx(s,{children:"PENDING"})," ",`
returns the default/uninitialized value for the field. Always call `,e.jsx(s,{children:"Wait()"})," ",`
or `,e.jsx(s,{children:"await"})," the task first."]})}),e.jsx(c,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Type mismatch in async return"})," — An"," ",`
`,e.jsx(s,{children:"async"})," method must return ",e.jsx(s,{children:"Task"})," or"," ",`
`,e.jsx(s,{children:"ValueTask<T>"}),". Returning a plain value type or ",e.jsx(s,{children:"void"})," ",`
from an `,e.jsx(s,{children:"async"})," method fails semantic analysis."]})}),e.jsx(c,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Missing using async"})," — ",e.jsx(s,{children:"Task"}),","," ",`
`,e.jsx(s,{children:"ValueTask<T>"}),", and ",e.jsx(s,{children:"TaskCompletionSource<T>"})," ",`
live in the `,e.jsx(s,{children:"async"})," namespace. Forgetting ",e.jsx(s,{children:"using async;"})," ",`
produces an unresolved-type error.`]})})]}),`
`,e.jsx(r,{children:"Remarks"}),`
`,e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Self-awaiters."})," Both ",e.jsx(s,{children:"Task"})," and"," ",`
`,e.jsx(s,{children:"ValueTask<T>"})," implement ",e.jsx(s,{children:"IAwaiter"}),` directly.
`,e.jsx(s,{children:"GetAwaiter()"})," returns ",e.jsx(s,{children:"this"}),", so an"," ",`
`,e.jsx(s,{children:"await"}),` expression does not allocate a separate awaiter object. This keeps the
hot path allocation-free.`]})}),`
`,e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Lifecycle and rooting."}),` When an async method starts, the compiler-generated state machine
factory allocates the task object and calls `,e.jsx(s,{children:"InternalRoot"}),`. Rooting increments the
task’s reference count and registers it with the event loop, keeping the task alive across suspensions
even if no script variable holds it. On completion, `,e.jsx(s,{children:"Complete()"})," or"," ",`
`,e.jsx(s,{children:"SetResult()"}),` releases the frame owner, resumes the continuation, and unroots the
task so it becomes eligible for garbage collection.`]})}),`
`,e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"States."})," The internal ",e.jsx(s,{children:"_state"})," field uses three values:"]})}),`
`,e.jsx(o,{headers:["State","Value","Meaning"],rows:[["PENDING","0","The operation has not finished."],["COMPLETED","1","The operation finished successfully."],["FAULTED","2","The operation finished with an exception stored in _exception."]]}),`
`,e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Fire-and-forget."})," ",e.jsx(s,{children:"Task.Shoot(task)"}),` explicitly releases the task’s
frame owner and marks it as fire-and-forget. The task continues to run on the event loop but no longer
keeps the caller’s frame alive. At VM shutdown, fire-and-forget tasks are halted cleanly. You can also
discard the return value of an async call, which starts the task independently because the rooted task
object survives on the event loop; however, `,e.jsx(s,{children:"Task.Shoot"}),` is the explicit, supported
API for this pattern.`]})}),`
`,e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Synchronous fast path."})," ",e.jsx(s,{children:"ValueTask.FromResult<T>(value)"})," ",`
returns a task whose `,e.jsx(s,{children:"IsCompleted"})," property is already ",e.jsx(s,{children:"true"}),`.
When such a task is awaited, the compiler’s await sequence sees the completed flag and jumps straight to
the resume segment without registering a continuation or returning to the event loop. Use this for cached
values and trivial synchronous fallbacks inside async APIs.`]})}),`
`,e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"TaskCompletionSource<T>."})," This class, provided by the"," ",`
`,e.jsx(s,{children:"shard.async"})," library rather than the core runtime, creates a"," ",`
`,e.jsx(s,{children:"ValueTask<T>"}),` that is completed manually. It is useful when native code,
callbacks, or another thread must decide when an async operation finishes. Construct the source, expose
its `,e.jsx(s,{children:"Task"})," property to awaiters, and call ",e.jsx(s,{children:"SetResult"})," or"," ",`
`,e.jsx(s,{children:"SetException"})," to transition the task to ",e.jsx(s,{children:"COMPLETED"})," or"," ",`
`,e.jsx(s,{children:"FAULTED"}),"."]})}),`
`,e.jsx(d,{tone:"blue",children:e.jsxs(n.p,{children:[e.jsx(s,{children:"Task.Wait"})," and ",e.jsx(s,{children:"ValueTask.Wait"}),` are cooperative: they block
the calling thread by repeatedly calling `,e.jsx(s,{children:"EventLoop.RunOnce()"}),`. Timers and I/O
callbacks still drain on the same thread while the caller waits, so the VM remains responsive even though
the synchronous entry point is stalled.`]})}),`
`,e.jsx(d,{tone:"amber",title:"Task.WhenAll / Task.WhenAny not implemented",children:e.jsxs(n.p,{children:["Combinators such as ",e.jsx(s,{children:"Task.WhenAll"})," and ",e.jsx(s,{children:"Task.WhenAny"}),` are not
currently part of the `,e.jsx(s,{children:"async"}),` namespace. To wait for multiple tasks, start them and
call `,e.jsx(s,{children:"Wait()"}),` on each reference individually, or build a custom completion source
that tracks the remaining count.`]})}),`
`,e.jsx(r,{children:"Examples"}),`
`,e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Concurrent delays."})," Multiple ",e.jsx(s,{children:"Task.Delay"}),` calls can be started
before any of them are awaited, allowing the timers to run concurrently on the event loop.`]})}),`
`,e.jsx(t,{code:`using stdio;
using async;

namespace demo;

public static func Main() -> void
{
  t1: Task = Task.Delay(100);
  t2: Task = Task.Delay(200);
  t3: Task = Task.Delay(50);

  t1.Wait();
  t2.Wait();
  t3.Wait();

  println("all delays done");
}`,language:"csharp",filename:"task_concurrent.shard"}),`
`,e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"ValueTask.FromResult for cached values."}),` When a result is already known, create a
synchronously completed task instead of spinning up an async state machine.`]})}),`
`,e.jsx(t,{code:`using stdio;
using async;

namespace demo;

public static func LookupCached(id: int) -> ValueTask<int>
{
  if (id == 1)
  {
      return ValueTask.FromResult<int>(99);
  }

  return FetchSlow(id);
}

public static async func FetchSlow(id: int) -> ValueTask<int>
{
  await Task.Delay(10);
  return id * 2;
}

public static func Main() -> void
{
  cached: ValueTask<int> = LookupCached(1);
  println(cached.IsCompleted); // true
  println(cached.Result);      // 99

  slow: ValueTask<int> = LookupCached(5);
  ValueTask.Wait(slow);
  println(slow.Result);        // 10
}`,language:"csharp",filename:"valuetask_fromresult.shard"}),`
`,e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"TaskCompletionSource with a delayed producer."}),` The producer is an async method that
completes the source after a delay; the consumer awaits the source’s task.`]})}),`
`,e.jsx(t,{code:`using stdio;
using async;

namespace demo;

public static async func CompleteAfterDelay(tcs: TaskCompletionSource<string>) -> Task
{
  await Task.Delay(50);
  tcs.SetResult("ready");
}

public static func Main() -> void
{
  tcs: TaskCompletionSource<string> = new TaskCompletionSource<string>();
  CompleteAfterDelay(tcs);

  task: ValueTask<string> = tcs.Task;
  ValueTask.Wait(task);
  println(task.Result); // ready
}`,language:"csharp",filename:"task_completion_source.shard"}),`
`,e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Exception propagation."}),` Exceptions thrown inside an async method are captured by the
task and re-thrown when the task is awaited or waited on.`]})}),`
`,e.jsx(t,{code:`using stdio;
using async;

namespace demo;

public static async func FaultyDelay() -> Task
{
  await Task.Delay(10);
  throw new RuntimeException();
}

public static func Main() -> void
{
  try
  {
      Task.Wait(FaultyDelay());
      println("unreachable");
  }
  catch (ex: RuntimeException)
  {
      println("caught faulted task");
  }

  println("done");
}`,language:"csharp",filename:"task_exception.shard"}),`
`,e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Catching exceptions inside an async method."})," Ordinary"," ",`
`,e.jsx(s,{children:"try"}),"/",e.jsx(s,{children:"catch"})," blocks work across await suspension points."]})}),`
`,e.jsx(t,{code:`using stdio;
using async;

namespace demo;

public static async func FaultyDelay() -> Task
{
  await Task.Delay(10);
  throw new RuntimeException();
}

public static async func CaughtAwait() -> Task
{
  try
  {
      await FaultyDelay();
      println("after await"); // never reached
  }
  catch (ex: RuntimeException)
  {
      println("caught inside async");
  }
}

public static func Main() -> void
{
  Task.Wait(CaughtAwait());
  println("done");
}`,language:"csharp",filename:"task_caught_await.shard"}),`
`,e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Fire-and-forget with Task.Shoot."})," The caller does not wait for the background task."]})}),`
`,e.jsx(t,{code:`using stdio;
using async;

namespace demo;

public static async func Background() -> Task
{
  println("background start");
  await Task.Delay(100);
  println("background end");
}

public static func Main() -> void
{
  Task.Shoot(Background());
  println("main end");
}`,language:"csharp",filename:"task_shoot.shard"}),`
`,e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Fire-and-forget with ValueTask<T>."})," Use the generic overload of"," ",`
`,e.jsx(s,{children:"Task.Shoot"})," when the discarded task carries a result type."]})}),`
`,e.jsx(t,{code:`using stdio;
using async;

namespace demo;

public static async func Background() -> ValueTask<int>
{
  println("background start");
  await Task.Delay(100);
  println("background end");
  return 42;
}

public static func Main() -> void
{
  Task.Shoot<int>(Background());
  println("main end");
}`,language:"csharp",filename:"task_shoot_valuetask.shard"}),`
`,e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Common mistake: reading Result before waiting."})," The ",e.jsx(s,{children:"Result"})," ",`
property is only meaningful after the task has left the `,e.jsx(s,{children:"PENDING"}),` state. The
commented-out line below would read the default field value instead of the real result.`]})}),`
`,e.jsx(t,{code:`using stdio;
using async;

namespace demo;

public static async func GetValue() -> ValueTask<int>
{
  await Task.Delay(10);
  return 7;
}

public static func Main() -> void
{
  task: ValueTask<int> = GetValue();

  // BUG: do not read Result while the task is still pending.
  // result: int = task.Result;

  ValueTask.Wait(task);
  result: int = task.Result;
  println(result);
}`,language:"csharp",filename:"task_result_timing.shard"}),`
`,e.jsx(a,{children:e.jsx("strong",{children:"Task vs ValueTask<T> summary."})}),`
`,e.jsx(o,{headers:["Feature","Task","ValueTask&lt;T&gt;"],rows:[["Result value","None (void)","Typed result T via .Result"],["Completion method","Complete()","SetResult(value)"],["Synchronous factory","None","FromResult<T>(value)"],["Fire-and-forget","Task.Shoot(task)","Task.Shoot<T>(task)"],["Awaiter type","Self-awaiter (returns this)","Self-awaiter (returns this)"],["State values","PENDING, COMPLETED, FAULTED","PENDING, COMPLETED, FAULTED"]]})]})}function p(i={}){const{wrapper:n}=i.components||{};return n?e.jsx(n,{...i,children:e.jsx(h,{...i})}):h(i)}function l(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
