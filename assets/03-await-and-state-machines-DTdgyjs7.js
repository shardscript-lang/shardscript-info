import{j as e}from"./index-hFDFiLgA.js";function d(r){const s={code:"code",p:"p",...r.components},{Bullet:a,Callout:c,CodeBlock:i,DocsTable:h,H2:l,InlineCode:n,Prose:t}=s;return a||o("Bullet"),c||o("Callout"),i||o("CodeBlock"),h||o("DocsTable"),l||o("H2"),n||o("InlineCode"),t||o("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:e.jsxs(s.p,{children:["The ",e.jsx(n,{children:"await"})," keyword is the suspension point in an ",e.jsx(n,{children:"async"})," ",`
method. When execution reaches `,e.jsx(n,{children:"await"}),`, the method returns control to the
event loop, registers a continuation, and later resumes exactly where it left off. The compiler
makes this possible by rewriting every `,e.jsx(n,{children:"async"}),` method into a state machine
whose `,e.jsx(n,{children:"MoveNext"})," method is driven by an integer ",e.jsx(n,{children:"State"})," ",`
field.`]})}),`
`,e.jsx(l,{children:"Introduction"}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:["ShardScript runs asynchronous work on a single-threaded libuv event loop. An ",e.jsx(n,{children:"async"})," ",`
method never blocks an OS thread while it waits for a timer, file, socket, or other background
operation. Instead, it `,e.jsx("em",{children:"suspends"})," at an ",e.jsx(n,{children:"await"}),` expression, stores its
local state, and lets the loop process other work. When the awaited operation completes, the
runtime calls the stored continuation, which re-enters the method and continues from the next
statement.`]})}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[`This behavior is implemented by the compiler, not by the runtime alone. Before bytecode is emitted,
the `,e.jsx(n,{children:"AsyncStateMachineLowering"}),` pass transforms each eligible async method
into a compiler-generated class. The original method body becomes a `,e.jsx(n,{children:"MoveNext"})," ",`
method that switches on the current state, and every local variable that must survive a suspension
is lifted into a field.`]})}),`
`,e.jsx(l,{children:"What it is"}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Await is a unary operator."}),` It takes an awaitable expression on its right and
either returns the awaitable's result immediately (if it is already completed) or suspends the
current async method until the awaitable completes. The operand must implement the`," ",`
`,e.jsx(n,{children:"async.IAwaitable"})," interface, which exposes a ",e.jsx(n,{children:"GetAwaiter"})," ",`
method. The awaiter must implement `,e.jsx(n,{children:"async.IAwaiter"})," with"," ",`
`,e.jsx(n,{children:"IsCompleted"}),", ",e.jsx(n,{children:"OnCompleted"}),", and"," ",`
`,e.jsx(n,{children:"GetResult"})," members."]})}),`
`,e.jsx(h,{headers:["Member","Purpose"],rows:[[e.jsx(s.code,{children:"IAwaitable.GetAwaiter()"}),"Returns an IAwaiter that tracks completion and produces the result."],[e.jsx(s.code,{children:"IAwaiter.IsCompleted"}),"True if the operation has already finished."],[e.jsx(s.code,{children:"IAwaiter.OnCompleted(IAsyncState)"}),"Registers the state machine so it is resumed when the operation completes."],[e.jsx(s.code,{children:"IAwaiter.GetResult()"}),"Returns the result of the completed operation."]]}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"The state machine is the continuation."}),` When the compiler lowers an async method,
it generates a private class that implements `,e.jsx(n,{children:"IAsyncState"}),`. That interface
has a single member, `,e.jsx(n,{children:"MoveNext()"}),`, which the runtime invokes each time the
method resumes. The generated class also stores:`]})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(a,{children:e.jsxs(s.p,{children:["A ",e.jsx(n,{children:"State"})," integer that records which suspension point to continue from."]})}),e.jsx(a,{children:e.jsxs(s.p,{children:["The ",e.jsx(n,{children:"Task"})," or ",e.jsx(n,{children:"ValueTask"}),` object that represents the
async method's own completion.`]})}),e.jsx(a,{children:e.jsxs(s.p,{children:["Lifted copies of every parameter and local variable that are live across an"," ",`
`,e.jsx(n,{children:"await"}),"."]})}),e.jsx(a,{children:e.jsxs(s.p,{children:["An optional ",e.jsx(n,{children:"OuterThis"}),` reference when the async method is an instance
member.`]})})]}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Lowering is a three-pass pipeline."})," ",e.jsx(n,{children:"AsyncStateMachineLowering"})," ",`
runs after semantic analysis and before layout:`]})}),`
`,e.jsxs("ol",{className:"space-y-2 text-text-secondary",children:[e.jsx(a,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Hoisting pass."}),` Nested awaits inside expressions, conditions, and return
statements are rewritten as top-level statements with temporary variables. This keeps the
subsequent passes simple and predictable.`]})}),e.jsx(a,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Analysis pass."}),` The rewritten body is scanned for await sites. For each site, the
pass records the active `,e.jsx(n,{children:"try"}),` regions, the statement that follows the
await, and any variable that receives the await result.`]})}),e.jsx(a,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Emission pass."}),` After layout assigns field and slot offsets, bytecode is emitted
for the state-machine constructor, the factory method that creates it, and the`," ",`
`,e.jsx(n,{children:"MoveNext"})," body."]})})]}),`
`,e.jsx(l,{children:"When to use it"}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:["Use ",e.jsx(n,{children:"await"}),` whenever an async method must wait for an operation without
blocking the event loop. Typical cases include timers, I/O, network calls, thread-pool offloads, and
composing multiple async operations.`]})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(a,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Timers and delays."})," ",e.jsx(n,{children:"await Task.Delay(milliseconds)"}),` yields
cooperatively and resumes after the interval.`]})}),e.jsx(a,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"I/O and sockets."}),` File and socket operations register libuv handles; the method
suspends until data is ready.`]})}),e.jsx(a,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Composing async helpers."})," Await another ",e.jsx(n,{children:"async"}),` method to
reuse sequential asynchronous logic.`]})}),e.jsx(a,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Consuming results."})," Await a ",e.jsx(n,{children:"ValueTask<T>"}),` to obtain
the typed result when it becomes available.`]})})]}),`
`,e.jsx(c,{tone:"blue",children:e.jsxs(s.p,{children:["Await is only valid inside an ",e.jsx(n,{children:"async"})," method. The compiler rejects"," ",`
`,e.jsx(n,{children:"await"})," in synchronous methods such as ",e.jsx(n,{children:"Main"}),`. To block
synchronously on an async operation, call `,e.jsx(n,{children:"Task.Wait(task)"})," or"," ",`
`,e.jsx(n,{children:"ValueTask.Wait(task)"}),"."]})}),`
`,e.jsx(l,{children:"Remarks"}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Suspension is cooperative and single-threaded."})," When ",e.jsx(n,{children:"await"})," ",`
is reached, the runtime checks `,e.jsx(n,{children:"IsCompleted"}),`. If the operation is already
done, execution continues synchronously. Otherwise the runtime stores the state machine as the
continuation on the awaiter, sets the state machine's `,e.jsx(n,{children:"State"}),` to the resume
label, and returns from `,e.jsx(n,{children:"MoveNext"}),`. The libuv loop then processes other
timers and I/O until the operation completes and calls `,e.jsx(n,{children:"OnCompleted"}),"."]})}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Resumption reads the continuation field."})," The runtime helper"," ",`
`,e.jsx(n,{children:"ResumeContinuation"})," retrieves the stored ",e.jsx(n,{children:"IAsyncState"}),`,
calls its `,e.jsx(n,{children:"MoveNext"}),` method, and the generated switch jumps to the correct
resume label. The task is rooted by the event loop while suspended so the garbage collector cannot
reclaim it.`]})}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Locals survive suspension as fields."}),` Any parameter or local variable whose value is
needed after an `,e.jsx(n,{children:"await"}),` is copied into a field on the state machine before
the method returns, and copied back into a local slot when `,e.jsx(n,{children:"MoveNext"})," ",`
resumes. Variables that are no longer live after the await are not lifted, keeping the state machine
small.`]})}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Exception handling is preserved across awaits."})," If an ",e.jsx(n,{children:"await"})," ",`
appears inside a `,e.jsx(n,{children:"try"}),` block, the analysis pass records the active try stack at
the resume point. When the method resumes, the emitter restores the correct exception-handler
context before executing the code that follows the await. If the awaited operation faults, the
exception is propagated through the stored continuation and dispatched to the matching`," ",`
`,e.jsx(n,{children:"catch"})," clause."]})}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Loops and conditionals require enumerator hoisting."})," A ",e.jsx(n,{children:"foreach"})," ",`
or `,e.jsx(n,{children:"for-in"})," loop that contains an ",e.jsx(n,{children:"await"}),` must store its
enumerator in a state-machine field, because the enumerator object must survive across suspensions.
The same applies to the loop variable and any condition expression that is evaluated after each
iteration.`]})}),`
`,e.jsx(c,{tone:"amber",title:"Expression-level awaits",children:e.jsx(s.p,{children:`The compiler supports awaits inside expressions such as return values, conditions, and assignments,
but it first rewrites them into top-level statements during the hoisting pass. Write awaits as
separate statements when possible; it makes the generated state machine smaller and easier to
diagnose if lowering fails.`})}),`
`,e.jsx(c,{tone:"amber",title:"Async lambdas",children:e.jsxs(s.p,{children:["The language supports ",e.jsx(n,{children:"async"}),` methods on classes and top-level functions.
Async lambda expressions are recognized by the parser in some contexts, but full state-machine
lowering for lambdas is still being stabilized. Prefer named async methods for production code until
support is complete.`]})}),`
`,e.jsx(l,{children:"Examples"}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Basic suspension and resume."}),` The simplest await yields the loop and resumes after a
timer fires.`]})}),`
`,e.jsx(i,{code:`using stdio;
using async;

namespace demo;

public class Program
{
  public static async func DelayAndReport() -> Task
  {
      println("before await");
      await Task.Delay(100);
      println("after await");
  }

  public static func Main() -> void
  {
      Task task = DelayAndReport();
      Task.Wait(task);
  }
}`,language:"csharp",filename:"basic_await.shard"}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Awaiting a result with ValueTask."}),` Await returns the underlying value once the
operation completes.`]})}),`
`,e.jsx(i,{code:`using stdio;
using async;

namespace demo;

public class Program
{
  public static async func ComputeAsync() -> ValueTask<int>
  {
      await Task.Delay(10);
      return 42;
  }

  public static async func UseResultAsync() -> Task
  {
      int value = await ComputeAsync();
      println(value + 1);
  }

  public static func Main() -> void
  {
      Task task = UseResultAsync();
      Task.Wait(task);
  }
}`,language:"csharp",filename:"valuetask_await.shard"}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Await inside a loop."}),` Each iteration suspends independently. The loop variable and
any condition state are preserved across suspensions.`]})}),`
`,e.jsx(i,{code:`using stdio;
using async;

namespace demo;

public class Program
{
  public static async func CountWithPauses() -> Task
  {
      int i = 0;
      while (i < 3)
      {
          println(i);
          await Task.Delay(10);
          i = i + 1;
      }

      println("done");
  }

  public static func Main() -> void
  {
      Task task = CountWithPauses();
      Task.Wait(task);
  }
}`,language:"csharp",filename:"await_in_loop.shard"}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Await inside conditionals."})," Both branches of an ",e.jsx(n,{children:"if/else"}),` can
contain awaits. The state machine records which branch was taken so it resumes at the correct
statement.`]})}),`
`,e.jsx(i,{code:`using stdio;
using async;

namespace demo;

public class Program
{
  public static async func ToggleAsync() -> Task
  {
      int i = 0;
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

      println("done");
  }

  public static func Main() -> void
  {
      Task task = ToggleAsync();
      Task.Wait(task);
  }
}`,language:"csharp",filename:"await_in_conditional.shard"}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Nested awaits."}),` Awaiting an async method that itself awaits another operation works
because each method has its own state machine. The outer continuation is registered on the inner
task, and the inner continuation is registered on the timer or I/O handle.`]})}),`
`,e.jsx(i,{code:`using stdio;
using async;

namespace demo;

public class Program
{
  public static async func InnerAsync() -> ValueTask<int>
  {
      await Task.Delay(10);
      return 7;
  }

  public static async func OuterAsync() -> ValueTask<int>
  {
      await Task.Delay(10);
      int inner = await InnerAsync();
      return inner * 2;
  }

  public static func Main() -> void
  {
      ValueTask<int> task = OuterAsync();
      ValueTask.Wait(task);
      println(task.Result);
  }
}`,language:"csharp",filename:"nested_await.shard"}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Custom awaitable."})," You can implement ",e.jsx(n,{children:"IAwaitable"})," and"," ",`
`,e.jsx(n,{children:"IAwaiter"}),` to make any type awaitable. The example below completes
synchronously, so `,e.jsx(n,{children:"IsCompleted"})," returns ",e.jsx(n,{children:"true"}),` and no
continuation is scheduled.`]})}),`
`,e.jsx(i,{code:`using stdio;
using async;

namespace demo;

public class ImmediateAwaiter : IAwaiter
{
  private Result: int;

  public init(value: int)
  {
      this.Result = value;
  }

  public func IsCompleted() -> bool
  {
      return true;
  }

  public func OnCompleted(continuation: IAsyncState) -> void
  {
      // Already completed, so no continuation is needed.
  }

  public func GetResult() -> int
  {
      return this.Result;
  }
}

public class ImmediateAwaitable : IAwaitable
{
  private Value: int;

  public init(value: int)
  {
      this.Value = value;
  }

  public func GetAwaiter() -> ImmediateAwaiter
  {
      return new ImmediateAwaiter(this.Value);
  }
}

public class Program
{
  public static async func TestCustomAwaitable() -> Task
  {
      ImmediateAwaitable awaitable = new ImmediateAwaitable(123);
      int result = await awaitable;
      println(result);
  }

  public static func Main() -> void
  {
      Task task = TestCustomAwaitable();
      Task.Wait(task);
  }
}`,language:"csharp",filename:"custom_awaitable.shard"}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Exception handling across await."}),` Exceptions thrown by an awaited operation are
delivered to the active `,e.jsx(n,{children:"try"})," block in the awaiting method."]})}),`
`,e.jsx(i,{code:`using stdio;
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
          println("unreachable");
      }
      catch (ex: RuntimeException)
      {
          println("caught inside async");
          await Task.Delay(10);
          println(ex.message);
      }

      println("after catch");
  }

  public static func Main() -> void
  {
      Task task = CaughtAwait();
      Task.Wait(task);
  }
}`,language:"csharp",filename:"await_exception.shard"}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Common mistakes."}),` These patterns are rejected by the compiler or produce surprising
behavior.`]})}),`
`,e.jsx(i,{code:`using stdio;
using async;

namespace demo;

public class Program
{
  public static async func FireAndForget() -> Task
  {
      await Task.Delay(10);
      println("fires later");
  }

  public static func Main() -> void
  {
      // This starts the async method but does not wait for it.
      // The program may exit before "fires later" is printed.
      FireAndForget();

      // Correct: capture the task and wait.
      Task task = FireAndForget();
      Task.Wait(task);
  }
}`,language:"csharp",filename:"await_mistakes.shard"}),`
`,e.jsx(c,{tone:"red",title:"Await outside async",children:e.jsxs(s.p,{children:["Writing ",e.jsx(n,{children:"await Task.Delay(100);"})," inside a synchronous method such as"," ",`
`,e.jsx(n,{children:"Main"})," produces a compile error. Use ",e.jsx(n,{children:"Task.Wait(task)"})," ",`
to bridge sync and async code.`]})}),`
`,e.jsx(c,{tone:"red",title:"Forgetting to wait",children:e.jsx(s.p,{children:`Calling an async method without awaiting or waiting on the returned task starts it concurrently but
gives no guarantee it completes before the program exits. Always wait on the returned task unless
the runtime explicitly keeps it alive.`})})]})}function p(r={}){const{wrapper:s}=r.components||{};return s?e.jsx(s,{...r,children:e.jsx(d,{...r})}):d(r)}function o(r,s){throw new Error("Expected component `"+r+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
