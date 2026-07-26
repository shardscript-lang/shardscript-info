import{j as e}from"./index-DbYfS1MK.js";function h(c){const n={p:"p",...c.components},{Bullet:a,Callout:o,CodeBlock:r,DocsTable:d,H2:i,InlineCode:s,Prose:t}=n;return a||l("Bullet"),o||l("Callout"),r||l("CodeBlock"),d||l("DocsTable"),i||l("H2"),s||l("InlineCode"),t||l("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(i,{children:"Summary"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:["The ",e.jsx(s,{children:"async"}),` modifier turns a method into an asynchronous state machine that
can suspend at `,e.jsx(s,{children:"await"}),` expressions and resume later via the libuv event loop.
Async methods return either `,e.jsx(s,{children:"Task"})," (for void operations) or"," ",`
`,e.jsx(s,{children:"ValueTask<T>"}),` (for value-producing operations), giving callers explicit
control over waiting, fire-and-forget execution, and result retrieval.`]})}),`
`,e.jsx(i,{children:"Syntax"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:["An async method is declared by placing ",e.jsx(s,{children:"async"})," immediately before"," ",`
`,e.jsx(s,{children:"func"}),". The return type must be one of the two async task types from the"," ",`
`,e.jsx(s,{children:"async"})," namespace."]})}),`
`,e.jsx(r,{code:`// Void-returning async method.
public static async func DoWork() -> Task
{
  await Task.Delay(100);
}

// Value-returning async method.
public static async func GetNumberAsync() -> ValueTask<int>
{
  await Task.Delay(10);
  return 42;
}`,language:"csharp",filename:"async_signature.shard"}),`
`,e.jsx(d,{headers:["Element","Required","Description"],rows:[[e.jsx(s,{children:"async"}),"Yes","Appears before func; enables await and triggers state-machine lowering."],[e.jsx(s,{children:"func"}),"Yes","Declares a function, just like a synchronous method."],["modifiers","No","Access modifiers (public, internal), static, and other method modifiers are allowed."],["parameters","No","Parameter list is identical to synchronous methods."],["return type","Yes","Must be async.Task or async.ValueTask<T>."]]}),`
`,e.jsx(i,{children:"Parameters / Arguments"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[`Async methods take parameters exactly as synchronous methods do. The only special consideration is
that any parameter whose value must survive an `,e.jsx(s,{children:"await"}),` suspension is lifted
into a field on the compiler-generated state-machine class.`]})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx(s,{children:"async"})," must appear immediately before ",e.jsx(s,{children:"func"}),`. It is
not valid on constructors, destructors, or fields.`]})}),e.jsx(a,{children:e.jsxs(n.p,{children:["The return type must be ",e.jsx(s,{children:"Task"})," or ",e.jsx(s,{children:"ValueTask<T>"}),`.
Other return types produce a compile-time error.`]})}),e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx(s,{children:"await"}),` can only appear inside the body of an async method (or async lambda).
Using it in a synchronous method is an error.`]})}),e.jsx(a,{children:e.jsxs(n.p,{children:["The awaited expression must implement ",e.jsx(s,{children:"IAwaitable"})," or"," ",`
`,e.jsx(s,{children:"IAwaiter"}),". The built-in ",e.jsx(s,{children:"Task"})," and"," ",`
`,e.jsx(s,{children:"ValueTask<T>"})," types are self-awaiters."]})}),e.jsx(a,{children:e.jsxs(n.p,{children:["Parameters and locals whose lifetimes cross an ",e.jsx(s,{children:"await"}),` are hoisted into
state-machine fields automatically by the compiler.`]})})]}),`
`,e.jsx(i,{children:"Returns"}),`
`,e.jsx(d,{headers:["Return type","Use case","Result access"],rows:[[e.jsx(s,{children:"Task"}),"Async work that produces no value.","Call Task.Wait(task) or task.Wait()."],[e.jsx(s,{children:"ValueTask<T>"}),"Async work that produces a value of type T.","Call ValueTask.Wait(task), then read task.Result."]]}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:["When an async method returns ",e.jsx(s,{children:"Task"}),`, the returned object represents only
completion or failure. When it returns `,e.jsx(s,{children:"ValueTask<T>"}),`, the result value
is stored in the task after completion and exposed through the `,e.jsx(s,{children:"Result"})," ",`
property.`]})}),`
`,e.jsx(i,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Invalid async return type"}),` — An async method that
does not return `,e.jsx(s,{children:"Task"})," or ",e.jsx(s,{children:"ValueTask<T>"}),` fails
semantic analysis.`]})}),e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"await outside async"})," — ",e.jsx(s,{children:"await"})," ",`
used in a synchronous method, property getter, or constructor is rejected.`]})}),e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Non-awaitable type"}),` — Awaiting an expression whose
type does not implement `,e.jsx(s,{children:"IAwaitable"})," or ",e.jsx(s,{children:"IAwaiter"})," ",`
produces a compile error.`]})}),e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Mismatched return value"})," — Returning a value from a"," ",`
`,e.jsx(s,{children:"Task"}),"-returning async method, or omitting the return value from a"," ",`
`,e.jsx(s,{children:"ValueTask<T>"}),"-returning method, is an error."]})}),e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Unhandled async exception"}),` — An exception thrown
inside an async method is captured by the task, which transitions to `,e.jsx(s,{children:"FAULTED"}),`.
The exception is re-thrown when the caller invokes `,e.jsx(s,{children:"Wait()"})," or reads"," ",`
`,e.jsx(s,{children:".Result"}),"."]})}),e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Premature result access"})," — Reading"," ",`
`,e.jsx(s,{children:"ValueTask<T>.Result"}),` before the task is completed reads the
uninitialized field. Always `,e.jsx(s,{children:"Wait()"})," first."]})})]}),`
`,e.jsx(i,{children:"Remarks"}),`
`,e.jsx(i,{children:"State machine overview"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[`Before bytecode is emitted, the compiler runs a dedicated lowering pipeline on every async method.
The original body is rewritten into a compiler-generated class with a `,e.jsx(s,{children:"MoveNext"})," ",`
method, a `,e.jsx(s,{children:"State"})," field, and fields for every lifted local and parameter."]})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"AsyncHoistingPass"}),` discovers await sites and decides
which parameters and locals must survive suspension.`]})}),e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"AsyncAnalysisPass"}),` validates control flow, defers,
and try/catch regions across await boundaries.`]})}),e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"AsyncStateMachineLowering"}),` creates the state-machine
class, splits the body at each `,e.jsx(s,{children:"await"}),", and emits a"," ",`
`,e.jsx(s,{children:"MoveNext"})," dispatcher that switches on the state field."]})}),e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"AsyncEmissionPass"}),` emits the bytecode sequences for
saving state, registering continuations, and resuming after completion.`]})})]}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:["Each ",e.jsx(s,{children:"await"}),` becomes a state transition. The compiler emits code that checks
`,e.jsx(s,{children:"IsCompleted"}),", registers the state machine as the continuation via"," ",`
`,e.jsx(s,{children:"OnCompleted"}),`, sets the next state, and returns from the current bytecode loop.
When the awaited operation completes, the event loop invokes `,e.jsx(s,{children:"MoveNext"}),`, which
jumps to the resume segment and restores the lifted locals.`]})}),`
`,e.jsx(i,{children:"Await suspension and the fast path"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx(s,{children:"await"}),` is a unary operator with high precedence. It can appear as a
statement, an assignment initializer, or even inside an `,e.jsx(s,{children:"if"}),` condition. When
the awaited task is already completed — for example, a `,e.jsx(s,{children:"ValueTask.FromResult"})," ",`
value — the compiler bypasses suspension and continues synchronously.`]})}),`
`,e.jsx(o,{tone:"blue",children:e.jsxs(n.p,{children:[e.jsx(s,{children:"Task"})," and ",e.jsx(s,{children:"ValueTask<T>"}),` are self-awaiters: their
`,e.jsx(s,{children:"GetAwaiter()"})," method returns ",e.jsx(s,{children:"this"}),`. This avoids
allocating a separate awaiter object for every await expression.`]})}),`
`,e.jsx(i,{children:"Calling conventions"}),`
`,e.jsx(t,{children:e.jsx(n.p,{children:`Invoking an async method returns a task immediately; the body runs later as the event loop pumps.
The caller decides how to relate to the task:`})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Wait"})," — ",e.jsx(s,{children:"Task.Wait(task)"})," or"," ",`
`,e.jsx(s,{children:"task.Wait()"}),` cooperatively blocks the calling thread by running the event
loop until the task completes. If the task faulted, the stored exception is re-thrown.`]})}),e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Retrieve a result"})," — For ",e.jsx(s,{children:"ValueTask<T>"}),`,
call `,e.jsx(s,{children:"ValueTask.Wait(task)"})," and then read ",e.jsx(s,{children:"task.Result"}),"."]})}),e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Fire and forget"})," — ",e.jsx(s,{children:"Task.Shoot(task)"})," ",`
releases the caller's frame ownership so the task runs independently. The VM terminates outstanding
fire-and-forget tasks at shutdown.`]})})]}),`
`,e.jsx(i,{children:"Cooperative execution and the event loop"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[`ShardScript async code is single-threaded and cooperative. Only one task's bytecode runs at a time;
suspension happens only at explicit `,e.jsx(s,{children:"await"}),` points. The event loop (backed by
libuv) dispatches timer and I/O callbacks on the same thread, so no locks or atomics are required
in user code.`]})}),`
`,e.jsx(o,{tone:"amber",children:e.jsxs(n.p,{children:[`Long-running synchronous work inside an async method starves the event loop. Offload CPU-bound work
or insert yield points such as `,e.jsx(s,{children:"await Task.Delay(0)"})," to let other tasks run."]})}),`
`,e.jsx(i,{children:"defer and exception handling across awaits"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx(s,{children:"defer"})," statements registered before an ",e.jsx(s,{children:"await"}),` are
honored when the method eventually returns, even if the method suspends and resumes multiple times.
`,e.jsx(s,{children:"try"}),"/",e.jsx(s,{children:"catch"}),"/",e.jsx(s,{children:"finally"}),` regions are
preserved across suspensions; exceptions thrown inside awaited tasks are re-thrown at the await site
when the state machine resumes.`]})}),`
`,e.jsx(i,{children:"Examples"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Basic Task and blocking wait."})}),`
`,e.jsx(r,{code:`using stdio;
using async;

namespace demo;

public class Program
{
  public static async func DelayedHello() -> Task
  {
      println("before delay");
      await Task.Delay(100);
      println("after delay");
  }

  public static func Main() -> void
  {
      Task.Wait(DelayedHello());
      println("done");
  }
}`,language:"csharp",filename:"async_basic.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"ValueTask and result access."})}),`
`,e.jsx(r,{code:`using stdio;
using async;

namespace demo;

public class Program
{
  public static async func GetNumberAsync() -> ValueTask<int>
  {
      await Task.Delay(10);
      return 42;
  }

  public static func Main() -> void
  {
      task: ValueTask<int> = GetNumberAsync();
      ValueTask.Wait(task);
      result: int = task.Result + 1;
      println(result);  // 43
  }
}`,language:"csharp",filename:"async_valuetask.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Await inside loops and conditions."})}),`
`,e.jsx(r,{code:`using stdio;
using async;

namespace demo;

public class Program
{
  public static async func GetBoolAsync() -> ValueTask<bool>
  {
      await Task.Delay(10);
      return true;
  }

  public static async func DoItAsync() -> Task
  {
      i: int = 0;
      while (i < 4)
      {
          if (i % 2 == 0)
          {
              println("even before");
              await Task.Delay(1);
              println("even after");
          }
          else
          {
              println("odd before");
              await Task.Delay(1);
              println("odd after");
          }

          i = i + 1;
      }

      if (await GetBoolAsync())
      {
          println("condition true");
      }

      println("done");
  }

  public static func Main() -> void
  {
      Task.Wait(DoItAsync());
  }
}`,language:"csharp",filename:"async_control_flow.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Exception propagation and try/catch."})}),`
`,e.jsx(r,{code:`using stdio;
using async;

namespace demo;

public class Program
{
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
          println("after await");  // never reached
      }
      catch (ex: RuntimeException)
      {
          println("caught inside async");
      }
  }

  public static func Main() -> void
  {
      try
      {
          Task.Wait(CaughtAwait());
      }
      catch (ex: RuntimeException)
      {
          println("caught in Main");
      }

      println("done");
  }
}`,language:"csharp",filename:"async_exceptions.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Fire-and-forget with Task.Shoot."})}),`
`,e.jsx(r,{code:`using stdio;
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
      // Run independently; Main does not wait for completion.
      Task.Shoot(Background());
      println("main end");
  }
}`,language:"csharp",filename:"async_fire_and_forget.shard"}),`
`,e.jsx(o,{tone:"amber",children:e.jsxs(n.p,{children:["Without ",e.jsx(s,{children:"Task.Shoot"}),`, discarding the returned task means the caller is not
blocked. If `,e.jsx(s,{children:"Main"}),` exits while the task is still pending, the VM halts the
outstanding task at shutdown. Use `,e.jsx(s,{children:"Shoot"}),` explicitly to document intent for
true fire-and-forget work.`]})}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Synchronously completed ValueTask."})}),`
`,e.jsx(r,{code:`using stdio;
using async;

namespace demo;

public class Program
{
  public static func Main() -> void
  {
      task: ValueTask<int> = ValueTask.FromResult<int>(99);
      println(task.IsCompleted);  // true
      println(task.Result);       // 99
      task.Wait();                // returns immediately
  }
}`,language:"csharp",filename:"async_fromresult.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"defer across an await suspension."})}),`
`,e.jsx(r,{code:`using stdio;
using async;

namespace demo;

public class Program
{
  public static async func DoItAsync() -> Task
  {
      defer println("deferred cleanup");
      println("before");
      await Task.Delay(10);
      println("after");
  }

  public static func Main() -> void
  {
      task: Task = DoItAsync();
      Task.Wait(task);
  }
}`,language:"csharp",filename:"async_defer.shard"}),`
`,e.jsx(o,{tone:"blue",children:e.jsxs(n.p,{children:[`In the defer example, the deferred action runs after the method body completes, regardless of how
many `,e.jsx(s,{children:"await"})," suspensions occurred."]})})]})}function x(c={}){const{wrapper:n}=c.components||{};return n?e.jsx(n,{...c,children:e.jsx(h,{...c})}):h(c)}function l(c,n){throw new Error("Expected component `"+c+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
