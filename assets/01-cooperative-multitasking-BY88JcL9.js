import{j as e}from"./index-OPpZgTHq.js";function d(i){const t={p:"p",...i.components},{Bullet:a,Callout:c,CodeBlock:o,DocsTable:h,H2:l,InlineCode:n,Prose:s}=t;return a||r("Bullet"),c||r("Callout"),o||r("CodeBlock"),h||r("DocsTable"),l||r("H2"),n||r("InlineCode"),s||r("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(s,{children:e.jsxs(t.p,{children:["ShardScript programs are ",e.jsx("strong",{children:"single-threaded and cooperative"}),". Instead of spawning one OS thread per asynchronous operation, the runtime multiplexes every timer, I/O request, and background offload through one ",e.jsx(n,{children:"libuv"})," event loop. An ",e.jsx(n,{children:"async"})," method runs only while it has work to do; when it reaches an ",e.jsx(n,{children:"await"}),", it yields control back to the loop so other tasks can run. This model gives the appearance of concurrency without locks, race conditions, or preemptive context switches."]})}),`
`,e.jsx(l,{children:"What it is"}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:["At the center of asynchronous execution is the ",e.jsx(n,{children:"EventLoop"})," class owned by each ",e.jsx(n,{children:"ApplicationDomain"}),". It wraps a single ",e.jsx(n,{children:"uv_loop_t"})," from libuv and is shared by every virtual machine in that domain. The loop keeps track of active handles such as timers (",e.jsx(n,{children:"uv_timer_t"}),") and async send handles (",e.jsx(n,{children:"uv_async_t"}),"), invoking their callbacks when the underlying OS signals readiness."]})}),`
`,e.jsx(h,{headers:["Concept","Runtime representation","Role"],rows:[[e.jsx(n,{children:"EventLoop"}),"uv_loop_t wrapper","Schedules all async work on a single thread."],[e.jsx(n,{children:"Task"}),"Object instance with state, continuation, and exception fields","Represents an operation that completes or faults in the future."],[e.jsx(n,{children:"IAwaiter / IAwaitable"}),"Interface contracts","Allow any type to participate in await."],[e.jsx(n,{children:"NativeContinuation"}),"Internal IAsyncState implementation","Bridges libuv callbacks back into VM bytecode."],[e.jsx(n,{children:"RootTask"}),"Reference-counted list in EventLoop","Keeps pending Task objects alive across suspensions."]]}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:["When an async method is invoked, the compiler has already rewritten it into a state machine with a ",e.jsx(n,{children:"MoveNext"})," method. The first ",e.jsx(n,{children:"MoveNext"})," call runs synchronously until the first ",e.jsx(n,{children:"await"}),". At that point the method registers its own state machine as the awaited task's continuation and returns. Later, when the libuv callback completes the task, the runtime calls ",e.jsx(n,{children:"ResumeContinuation"}),", which invokes ",e.jsx(n,{children:"MoveNext"})," again to continue exactly where execution left off."]})}),`
`,e.jsx(l,{children:"When to use it"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(a,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"I/O-bound work."})," HTTP requests, socket reads, file system operations, and timers spend most of their time waiting. Cooperative multitasking lets one thread juggle hundreds of pending operations."]})}),e.jsx(a,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Many lightweight concurrent operations."})," Spawning a thread per counter, delay, or connection is expensive; scheduling callbacks on a shared loop is cheap."]})}),e.jsx(a,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Scenarios that need simple sequencing."})," Because awaits are expressed directly in the source, reading and writing async code follows the same top-to-bottom order as synchronous code."]})}),e.jsx(a,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Heavy CPU work."})," Long-running computations must be offloaded with ",e.jsx(n,{children:"RunOnThreadPool"})," so they do not starve the event loop."]})})]}),`
`,e.jsx(l,{children:"Fire-and-forget vs blocking wait"}),`
`,e.jsx(s,{children:e.jsx(t.p,{children:"ShardScript offers two ways to relate a synchronous caller to an async operation:"})}),`
`,e.jsx(h,{headers:["Style","Syntax","Behavior","Use when"],rows:[["Blocking wait",e.jsx(n,{children:"Task.Wait(task)"}),"Pumps the event loop until the task completes, then returns (or rethrows a fault).","The caller needs the result or completion before continuing."],["Fire-and-forget",e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"Background();"})," or ",e.jsx(n,{children:"Task.Shoot(task);"})]}),"Starts the operation and lets the loop drive it to completion independently.","The caller does not depend on the outcome."]]}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"Task.Wait"})," is the typical bridge from synchronous ",e.jsx(n,{children:"Main"})," into async code. It is implemented as a tight loop that calls ",e.jsx(n,{children:"EventLoop.RunOnce()"})," until the task leaves the ",e.jsx(n,{children:"PENDING"})," state. While the call blocks its caller, the loop underneath continues to drain timers and I/O, so other tasks still make progress."]})}),`
`,e.jsx(c,{tone:"blue",children:e.jsxs(t.p,{children:["A pending task is ",e.jsx("strong",{children:"rooted"})," by the event loop while it is suspended. Rooting keeps the task alive even if no ShardScript variable references it, which is why fire-and-forget calls do not disappear mid-flight."]})}),`
`,e.jsx(l,{children:"Remarks"}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Single-threaded means no preemptive races."})," Because only one piece of VM code runs at a time, two async methods cannot mutate the same object simultaneously. The only way to interleave is through an explicit ",e.jsx(n,{children:"await"}),", so reasoning about shared state is straightforward."]})}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"CPU work starves the loop."})," If an async method performs a long computation without awaiting, no timer or I/O callback can run. Native shards solve this by calling ",e.jsx(n,{children:"AsyncScope::RunOnThreadPool"}),", which runs the work on a background ",e.jsx(n,{children:"std::thread"})," and posts completion through a ",e.jsx(n,{children:"uv_async_t"})," handle. The continuation always runs back on the loop thread, so VM state remains safe to touch."]})}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Exceptions propagate through the task."})," If an async method throws before its first await, the exception is captured in the returned ",e.jsx(n,{children:"Task"}),". If it throws after an await, the state machine captures it into the task's exception field. ",e.jsx(n,{children:"Task.Wait"})," rethrows the captured exception into the caller, which is why wrapping async calls in ",e.jsx(n,{children:"try/catch"})," works as expected."]})}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsxs("strong",{children:["Do not call ",e.jsx(n,{children:"Task.Wait"})," inside an async method."]})," Because the loop is single-threaded, blocking the loop waiting for a task prevents the very callback that would complete that task. This produces a deadlock. Inside async code, use ",e.jsx(n,{children:"await"})," instead."]})}),`
`,e.jsx(c,{tone:"amber",title:"Composition helpers not yet implemented",children:e.jsxs(t.p,{children:["Helpers such as ",e.jsx(n,{children:"Task.WhenAll"}),", ",e.jsx(n,{children:"Task.WhenAny"}),", and ",e.jsx(n,{children:"Task.ContinueWith"})," are not available today. To wait for multiple operations, store each ",e.jsx(n,{children:"Task"})," in a variable and call ",e.jsx(n,{children:"Task.Wait"})," on them in the order you need, or await them sequentially inside another ",e.jsx(n,{children:"async"})," method."]})}),`
`,e.jsx(l,{children:"Examples"}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Interleaved timers."})," Three counters start together. The first await in each returns control to the loop, so the shortest delay finishes first even though the methods were called in A-B-C order."]})}),`
`,e.jsx(o,{code:`using stdio;
using async;

namespace demo;

async func CounterA() -> Task
{
  println("A: 1");
  await Task.Delay(500);
  println("A: 2");
  await Task.Delay(500);
  println("A: 3");
}

async func CounterB() -> Task
{
  println("B: 1");
  await Task.Delay(800);
  println("B: 2");
  await Task.Delay(800);
  println("B: 3");
}

async func CounterC() -> Task
{
  println("C: 1");
  await Task.Delay(300);
  println("C: 2");
  await Task.Delay(300);
  println("C: 3");
}

public static func Main() -> void
{
  t1: Task = CounterA();
  t2: Task = CounterB();
  t3: Task = CounterC();

  Task.Wait(t1);
  Task.Wait(t2);
  Task.Wait(t3);

  println("All counters finished");
}`,language:"csharp",filename:"interleaved_counters.shard"}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Blocking wait from synchronous code."})," This is the normal entry pattern: start the async operation, then pump the loop until it finishes."]})}),`
`,e.jsx(o,{code:`using stdio;
using async;

namespace demo;

async func DelayedHello() -> Task
{
  println("before");
  await Task.Delay(100);
  println("after");
}

public static func Main() -> void
{
  task: Task = DelayedHello();
  Task.Wait(task);
  println("done");
}`,language:"csharp",filename:"blocking_wait.shard"}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Fire-and-forget."})," The background task starts without blocking ",e.jsx(n,{children:"Main"}),". The runtime keeps it alive until the delay fires and the method completes."]})}),`
`,e.jsx(o,{code:`using stdio;
using async;

namespace demo;

public class Program
{
  public static async func Background() -> Task
  {
      println("background start");
      await Task.Delay(100);
      println("background end");
  }

  public static func Main() -> void
  {
      // Start the operation and intentionally do not wait.
      Background();
      println("main end");
  }
}`,language:"csharp",filename:"fire_and_forget.shard"}),`
`,e.jsx(c,{tone:"blue",children:e.jsxs(t.p,{children:["To make fire-and-forget intent explicit, call ",e.jsx(n,{children:"Task.Shoot(task)"}),". ",e.jsx(n,{children:"Task.Shoot"})," marks the task as detached and is useful when a linter or reader needs to know the result is intentionally ignored."]})}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Custom awaitable."})," Any type implementing ",e.jsx(n,{children:"IAwaitable"})," and returning an ",e.jsx(n,{children:"IAwaiter"})," can be awaited. This is how native shards surface libuv handles to ShardScript code."]})}),`
`,e.jsx(o,{code:`using stdio;
using async;

namespace demo;

public class MyAwaiter : IAwaiter
{
  public func IsCompleted() -> bool
  {
      return true;
  }

  public func OnCompleted(continuation: IAsyncState) -> void
  {
  }

  public func GetResult() -> int
  {
      return 123;
  }
}

public class MyAwaitable : IAwaitable
{
  public func GetAwaiter() -> MyAwaiter
  {
      return new MyAwaiter();
  }
}

public class Program
{
  public static async func Test() -> Task
  {
      a: MyAwaitable = new MyAwaitable();
      x: int = await a;
      println(x);
  }

  public static func Main() -> void
  {
      Task.Wait(Test());
  }
}`,language:"csharp",filename:"custom_awaitable.shard"}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Offloading CPU-bound work from a native shard."})," The ",e.jsx(n,{children:"RunOnThreadPool"})," helper is not exposed directly to ShardScript; it is the pattern native libraries use when they need to perform blocking or CPU-heavy work without freezing the loop. The work lambda runs on a background thread, and the completion lambda runs on the loop thread through a ",e.jsx(n,{children:"uv_async_t"})," handle."]})}),`
`,e.jsx(o,{code:`#include <shard/runtime/NativeAsync.hpp>

// Inside a native shard callback.
static ObjectInstance* HeavySumAsync(const CallState& context) noexcept
{
  std::int64_t count = context.Args[0]->AsInteger();

  return shard::DoAsync(context, [count](shard::AsyncScope async)
  {
      async.RunOnThreadPool(
          [count]()
          {
              // This executes on a background std::thread.
              std::int64_t sum = 0;
              for (std::int64_t i = 0; i < count; i = i + 1)
              {
                  sum = sum + i;
              }
          },
          [async]() mutable
          {
              // This continuation runs back on the libuv loop thread.
              async.Complete();
          }
      );
  });
}`,language:"cpp",filename:"thread_pool_offload.cpp"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Common mistakes."})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(a,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Blocking the loop."})," Avoid synchronous sleeps or long loops inside async methods. Use ",e.jsx(n,{children:"Task.Delay"})," for delays and ",e.jsx(n,{children:"RunOnThreadPool"})," for heavy work."]})}),e.jsx(a,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Waiting inside async code."})," ",e.jsx(n,{children:"Task.Wait"})," inside an ",e.jsx(n,{children:"async func"})," deadlocks the single-threaded loop. Always ",e.jsx(n,{children:"await"})," instead."]})}),e.jsx(a,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Forgetting the task lifetime."})," A task is rooted while pending, but the root is released when it completes. If you need the result later, keep a variable referencing it so the GC does not collect the completed object before you read it."]})}),e.jsx(a,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Awaiting outside async."})," ",e.jsx(n,{children:"await"})," is only valid inside an ",e.jsx(n,{children:"async func"})," or async lambda. Using it in an ordinary method is a compile-time error."]})})]})]})}function u(i={}){const{wrapper:t}=i.components||{};return t?e.jsx(t,{...i,children:e.jsx(d,{...i})}):d(i)}function r(i,t){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};
