import{j as e}from"./index-IfqX08ny.js";function d(c){const s={p:"p",...c.components},{Bullet:n,Callout:o,CodeBlock:r,DocsTable:h,H2:i,InlineCode:t,Prose:a}=s;return n||l("Bullet"),o||l("Callout"),r||l("CodeBlock"),h||l("DocsTable"),i||l("H2"),t||l("InlineCode"),a||l("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(a,{children:e.jsxs(s.p,{children:["ShardScript implements ",e.jsx(t,{children:"async"})," / ",e.jsx(t,{children:"await"}),` through a
compiler transformation called `,e.jsx("strong",{children:"async state-machine lowering"}),`. Instead of generating
bytecode for the async method directly, the compiler emits a compiler-generated class that
remembers where execution was suspended, hoists local variables into fields, and resumes execution
later via a generated `,e.jsx(t,{children:"MoveNext"}),` method. The VM itself has no
`,e.jsx(t,{children:"AWAIT"}),` opcode — the entire cooperative-multitasking story is expressed with
ordinary method calls, fields, jumps, and the libuv event loop.`]})}),`
`,e.jsx(i,{children:"Introduction"}),`
`,e.jsx(a,{children:e.jsxs(s.p,{children:["Writing an async method feels sequential: you call an API, use ",e.jsx(t,{children:"await"}),` to wait
for it, and continue on the next line. Under the hood, however, the original stack frame is
destroyed when the method suspends. To make variables and control flow survive across suspension
points, the compiler rewrites the method into a `,e.jsx("strong",{children:"state machine"}),` before bytecode is
emitted.`]})}),`
`,e.jsx(a,{children:e.jsxs(s.p,{children:[`This article explains that rewrite: the three compiler passes that produce the state machine, the
fields the generated class carries, the `,e.jsx(t,{children:"MoveNext"}),` dispatch loop, and the
bytecode sequence emitted around every `,e.jsx(t,{children:"await"}),`. Understanding lowering helps
you predict which variables are allocated, why exceptions behave the way they do across awaits,
and which async constructs are currently supported.`]})}),`
`,e.jsx(i,{children:"What it is"}),`
`,e.jsx(a,{children:e.jsxs(s.p,{children:["When the parser sees an ",e.jsx(t,{children:"async func"}),` with a return type of
`,e.jsx(t,{children:"Task"})," or ",e.jsx(t,{children:"ValueTask<T>"}),`, it marks the method
symbol as async. The compiler then runs `,e.jsx(t,{children:"AsyncStateMachineLowering"}),`, a
three-pass pipeline that replaces the original method body with:`]})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(n,{children:e.jsxs(s.p,{children:["A ",e.jsx("strong",{className:"text-text-primary",children:"factory method"}),` with the original signature that
creates the state machine, roots its task, and kicks off the first segment.`]})}),e.jsx(n,{children:e.jsxs(s.p,{children:["A compiler-generated ",e.jsx("strong",{className:"text-text-primary",children:"state-machine class"}),` whose
fields hold the suspended state, the returned task, lifted parameters/locals, and one awaiter
field per await site.`]})}),e.jsx(n,{children:e.jsxs(s.p,{children:["A ",e.jsx("strong",{className:"text-text-primary",children:"MoveNext"}),` method that switches on an integer
`,e.jsx(t,{children:"_state"})," field and runs the code between awaits."]})})]}),`
`,e.jsx(h,{headers:["Pass","Phase","Class","Responsibility"],rows:[["1","Prepare","AsyncHoistingPass","Rewrites nested awaits into top-level variable or expression statements so lowering can split the body at await boundaries."],["2","Prepare","AsyncAnalysisPass","Scans the rewritten body for await sites and builds the state-machine class, its fields, and the MoveNext symbol."],["3","Emit","AsyncEmissionPass","Emits bytecode for the state-machine constructor, the factory body, and the segmented MoveNext body."]]}),`
`,e.jsx(a,{children:e.jsxs(s.p,{children:["Passes 1 and 2 run during ",e.jsx(t,{children:"Prepare"}),`, before slot layout, so the generated
fields receive correct offsets. Pass 3 runs during `,e.jsx(t,{children:"Emit"}),`, after layout, so
every `,e.jsx(t,{children:"LOADFIELD"})," / ",e.jsx(t,{children:"STOREFIELD"}),` uses the final slot
indices.`]})}),`
`,e.jsx(i,{children:"When to use it"}),`
`,e.jsx(a,{children:e.jsxs(s.p,{children:[`You do not invoke lowering manually. It runs automatically for every method marked
`,e.jsx(t,{children:"async"}),". The concept matters when:"]})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(n,{children:e.jsxs(s.p,{children:[`You are writing non-trivial async code and need to know which variables survive an
`,e.jsx(t,{children:"await"})," and which constructs are not yet supported."]})}),e.jsx(n,{children:e.jsxs(s.p,{children:["You are reading decompiled bytecode (",e.jsx(t,{children:"shard -d"}),`) and see a generated
`,e.jsx(t,{children:"<MethodName>k__AsyncStateMachine_N"})," class."]})}),e.jsx(n,{children:e.jsx(s.p,{children:`You are debugging a suspended task and want to understand how the runtime resumes it through the
event loop.`})}),e.jsx(n,{children:e.jsx(s.p,{children:`You are optimizing allocation: every async method allocates one state-machine instance and one
task/value-task instance.`})})]}),`
`,e.jsx(i,{children:"Remarks"}),`
`,e.jsx(i,{children:"The generated state-machine class"}),`
`,e.jsx(a,{children:e.jsxs(s.p,{children:[`For each async method, the compiler emits a class named
`,e.jsx(t,{children:"<MethodName>k__AsyncStateMachine_N"}),` that implements
`,e.jsx(t,{children:"IAsyncState"}),`. The class contains the fields needed to resume execution
after a suspension:`]})}),`
`,e.jsx(h,{headers:["Field","Type","Purpose"],rows:[[e.jsx(t,{children:"_state"}),"int","Segment index. 0 is the entry segment; awaitIndex + 1 is the segment that runs after the await completes."],[e.jsx(t,{children:"_task"}),e.jsxs(e.Fragment,{children:["'Task or '",e.jsx(t,{children:"ValueTask<T>"})]}),"The task returned to the caller. It is completed or faulted when the async method finishes."],[e.jsx(t,{children:"_outerThis"}),"Enclosing class","For instance async methods, a copy of this so member access still works after suspension."],[e.jsx(t,{children:"_awaiterN"}),"Awaiter type","One per await site. Holds the awaiter across the suspension so GetResult can be called on resume."],[e.jsx(t,{children:"<p>name"}),"Parameter type","Lifted parameter. The factory copies each argument into its field."],[e.jsx(t,{children:"<l>name"}),"Variable type","Lifted local variable. Survives across awaits because it lives on the heap."],[e.jsx(t,{children:"<e>N"}),e.jsx(t,{children:"IEnumerator"}),"For foreach / for-in loops that contain awaits, the enumerator is stored in a field."],[e.jsx(t,{children:"_currentException"}),e.jsx(t,{children:"RuntimeException"}),"Present only when an await appears inside a catch clause. Preserves the caught exception across the suspension."]]}),`
`,e.jsx(a,{children:e.jsxs(s.p,{children:["The class also has an empty ",e.jsx(t,{children:"init"}),` constructor (just
`,e.jsx(t,{children:"RETURN"}),") and a ",e.jsx(t,{children:"MoveNext"}),` method that implements
`,e.jsx(t,{children:"IAsyncState.MoveNext"}),"."]})}),`
`,e.jsx(i,{children:"The factory method"}),`
`,e.jsx(a,{children:e.jsx(s.p,{children:`The original async method is replaced entirely by a factory. Its emitted bytecode performs the
following steps in order:`})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Create the state machine."})," ",`
`,e.jsx(t,{children:"NEWOBJECT"})," allocates the generated class."]})}),e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Save outer this."}),` For instance methods, copy the
original `,e.jsx(t,{children:"this"})," (slot 0) into ",e.jsx(t,{children:"_outerThis"}),"."]})}),e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Copy parameters."}),` For each lifted parameter, load
the argument and store it into the matching `,e.jsx(t,{children:"<p>name"})," field."]})}),e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Create the task."})," Allocate a new"," ",`
`,e.jsx(t,{children:"Task"})," or ",e.jsx(t,{children:"ValueTask<T>"})," and store it in"," ",`
`,e.jsx(t,{children:"_task"}),"."]})}),e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Root the task."})," Call"," ",`
`,e.jsx(t,{children:"InternalRoot"})," so the GC cannot reclaim the task while it is suspended."]})}),e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Kick off segment 0."})," Call"," ",`
`,e.jsx(t,{children:"stateMachine.MoveNext()"})," synchronously to run up to the first await."]})}),e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Return the task."})," Load ",e.jsx(t,{children:"_task"})," ",`
from the state machine and return it to the caller.`]})})]}),`
`,e.jsx(i,{children:"MoveNext: segment dispatch"}),`
`,e.jsx(a,{children:e.jsxs(s.p,{children:[e.jsx(t,{children:"MoveNext"}),` is the heart of the lowering. It is emitted as a flat bytecode
stream with one segment per await site plus the entry segment. At runtime it works like this:`]})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Top-level exception guard."}),` The whole body is
wrapped in `,e.jsx(t,{children:"ENTER_TRY"}),". Any unhandled exception calls"," ",`
`,e.jsx(t,{children:"task.SetException"})," and returns."]})}),e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"State dispatch."})," The code loads"," ",`
`,e.jsx(t,{children:"_state"})," and compares it to 0, 1, 2, …, jumping to the matching segment."]})}),e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Segment entry."}),` Each segment first restores lifted
parameters and locals from fields into their MoveNext local slots.`]})}),e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Resume context (segments > 0)."}),` The segment
re-enters active try regions, re-registers active defers, and calls`," ",`
`,e.jsx(t,{children:"_awaiterN.GetResult()"}),`. If resuming inside a catch clause, it restores the
captured exception into `,e.jsx(t,{children:"CurrentException"}),"."]})}),e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Run user code."}),` Execution continues from the
resume point until the next await, return, or end of the method.`]})})]}),`
`,e.jsx(i,{children:"The bytecode around an await"}),`
`,e.jsx(a,{children:e.jsxs(s.p,{children:["There is no dedicated ",e.jsx(t,{children:"AWAIT"}),` opcode. The compiler emits a fixed sequence of
ordinary instructions at every await site:`]})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Evaluate."}),` Emit the awaited expression, leaving
the awaitable on the evaluation stack.`]})}),e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"GetAwaiter."})," Call"," ",`
`,e.jsx(t,{children:"GetAwaiter()"}),` (or use the awaitable itself as a self-awaiter) and store
the awaiter in a temporary local.`]})}),e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Store in field."})," Copy the awaiter into"," ",`
`,e.jsx(t,{children:"this._awaiterN"})," so it survives suspension."]})}),e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Fast-path check."})," If"," ",`
`,e.jsx(t,{children:"_awaiterN.IsCompleted"}),` is true, jump directly to the next segment without
suspending.`]})}),e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Preserve catch context."}),` Inside a catch clause,
load the current exception and store it in `,e.jsx(t,{children:"_currentException"}),"."]})}),e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Set state."})," Write"," ",`
`,e.jsx(t,{children:"_state = awaitIndex + 1"})," so the next resume runs the correct segment."]})}),e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Register continuation."})," Call"," ",`
`,e.jsx(t,{children:"_awaiterN.OnCompleted(this)"}),`, passing the state machine as the callback.
The event loop calls `,e.jsx(t,{children:"MoveNext"})," when the operation finishes."]})}),e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Return."})," Exit ",e.jsx(t,{children:"MoveNext"}),`,
unwinding the VM call stack back to the event loop.`]})})]}),`
`,e.jsx(o,{tone:"blue",children:e.jsxs(s.p,{children:[`The VM does not understand async/await. Suspension and resumption are implemented with standard
opcodes such as `,e.jsx(t,{children:"CALLMETHODSYMBOL"}),", ",e.jsx(t,{children:"LOADFIELD"}),`,
`,e.jsx(t,{children:"STOREFIELD"}),", conditional jumps, and ",e.jsx(t,{children:"RETURN"}),"."]})}),`
`,e.jsx(i,{children:"Lifting parameters, locals, and enumerators"}),`
`,e.jsx(a,{children:e.jsxs(s.p,{children:[`Local variables normally live in the method's local-slot array, which disappears when the
frame is popped. Any variable whose value must survive an `,e.jsx(t,{children:"await"}),` is
`,e.jsx("strong",{children:"lifted"})," into a field on the state-machine class:"]})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Parameters"})," become"," ",`
`,e.jsx(t,{children:"<p>name"}),` fields. The factory copies arguments into them; each
segment copies them back into MoveNext local slots at entry.`]})}),e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Locals"})," become ",e.jsx(t,{children:"<l>name"})," ",`
fields. The original variable's `,e.jsx(t,{children:"SlotIndex"}),` is permanently retargeted
to its MoveNext slot during emission.`]})}),e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Enumerators"})," from"," ",`
`,e.jsx(t,{children:"foreach"})," / ",e.jsx(t,{children:"for..in"}),` loops that contain awaits become
`,e.jsx(t,{children:"<e>N"})," fields so iteration state survives suspension."]})})]}),`
`,e.jsx(o,{tone:"blue",children:e.jsxs(s.p,{children:["The ",e.jsx(t,{children:"ParameterSlotRemapper"}),` helper temporarily redirects parameter slot
indices during MoveNext emission, so every `,e.jsx(t,{children:"LOADVARIABLE"})," /"," ",`
`,e.jsx(t,{children:"STOREVARIABLE"})," targets the correct local slot."]})}),`
`,e.jsx(i,{children:"Control flow across awaits"}),`
`,e.jsx(a,{children:e.jsxs(s.p,{children:[`After hoisting, every await is a top-level statement. The compiler records the statement that
follows each await as the `,e.jsx(t,{children:"NextStatement"}),` for that site. On resume,
execution jumps to that statement. If the await is the last statement in a try block, the
generated code leaves the try region and continues with the code that follows it.`]})}),`
`,e.jsx(a,{children:e.jsxs(s.p,{children:["Loops with awaits are supported, but ",e.jsx(t,{children:"break"})," and"," ",`
`,e.jsx(t,{children:"continue"}),` are patched at emission time to target the correct epilogue or
re-entry label inside the segmented structure. For `,e.jsx(t,{children:"foreach"})," /"," ",`
`,e.jsx(t,{children:"for..in"}),` loops, the enumerator is stored in a state-machine field so the
loop can resume its iteration.`]})}),`
`,e.jsx(i,{children:"Try/catch, defer, and exceptions"}),`
`,e.jsx(a,{children:e.jsxs(s.p,{children:[e.jsx(t,{children:"try"})," / ",e.jsx(t,{children:"catch"}),` blocks inside async methods are
preserved across suspensions. The compiler records the active try stack at each await site and
re-emits `,e.jsx(t,{children:"ENTER_TRY"}),` instructions when resuming. If an await appears inside
a catch clause, the caught exception is stored in `,e.jsx(t,{children:"_currentException"}),` before
suspending and restored on resume.`]})}),`
`,e.jsx(a,{children:e.jsxs(s.p,{children:[e.jsx(t,{children:"defer"}),` works in async methods because the emission pass re-emits all active
`,e.jsx(t,{children:"DEFER"}),` registrations on every resume path, rebuilding the defer stack to
the correct state before execution continues. Defers run when the scope exits, even after one or
more await suspensions.`]})}),`
`,e.jsx(o,{tone:"amber",title:"Await inside defer is not supported",children:e.jsxs(s.p,{children:["A ",e.jsx(t,{children:"defer"})," body must not contain an ",e.jsx(t,{children:"await"}),`. The
deferred code runs on scope exit, after the await that triggered the suspension has already
completed; suspending again inside the deferred body is not supported and produces a compile error.`]})}),`
`,e.jsx(i,{children:"Task completion"}),`
`,e.jsx(a,{children:e.jsxs(s.p,{children:["When the async method reaches its end, ",e.jsx(t,{children:"MoveNext"}),` transitions the task to
completed:`]})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(n,{children:e.jsxs(s.p,{children:["For ",e.jsx(t,{children:"Task"}),", it calls ",e.jsx(t,{children:"task.Complete()"}),"."]})}),e.jsx(n,{children:e.jsxs(s.p,{children:["For ",e.jsx(t,{children:"ValueTask<T>"}),", it calls"," ",`
`,e.jsx(t,{children:"task.SetResult(default(T))"}),` by default, or the awaited result when the
last statement is `,e.jsx(t,{children:"return await expr;"}),"."]})}),e.jsx(n,{children:e.jsxs(s.p,{children:["If an unhandled exception escapes, the top-level catch handler calls"," ",`
`,e.jsx(t,{children:"task.SetException(exception)"}),"."]})})]}),`
`,e.jsx(i,{children:"Runtime resumption and GC roots"}),`
`,e.jsx(a,{children:e.jsxs(s.p,{children:["When a libuv callback completes an async operation, the runtime calls"," ",`
`,e.jsx(t,{children:"ResumeContinuation"}),`. It reads the continuation off the task, finds the
state machine's `,e.jsx(t,{children:"MoveNext"}),` method, and invokes it. Because the task was
rooted by the factory, the state machine and its lifted fields are kept alive by the GC while the
method is suspended.`]})}),`
`,e.jsx(i,{children:"Examples"}),`
`,e.jsx(a,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Basic async method with Task.Delay."}),` This example prints before and after a delay.
The compiler emits a state machine with two segments: entry, and the segment after the await.`]})}),`
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
      task: Task = DelayedHello();
      task.Wait();
      println("done");
  }
}`,language:"csharp",filename:"basic_async.shard"}),`
`,e.jsx(a,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Awaiting a ValueTask<int> and lifting a local."})," The result of"," ",`
`,e.jsx(t,{children:"GetIntAsync"}),` is stored in a lifted local so it is available after the
await resumes.`]})}),`
`,e.jsx(r,{code:`using stdio;
using async;

namespace demo;

public class Program
{
  public static async func GetIntAsync() -> ValueTask<int>
  {
      await Task.Delay(10);
      return 42;
  }

  public static async func DoItAsync() -> Task
  {
      n: int = await GetIntAsync();
      println(n);
  }

  public static func Main() -> void
  {
      task: Task = DoItAsync();
      task.Wait();
  }
}`,language:"csharp",filename:"await_value_task.shard"}),`
`,e.jsx(a,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Concurrent async methods interleave on the event loop."}),` Each call returns its own
task and state-machine instance. Waiting on them in sequence still lets the shorter delays
complete first.`]})}),`
`,e.jsx(r,{code:`using stdio;
using async;

namespace demo;

async func CounterA() -> Task
{
  println("A: 1");
  await Task.Delay(500);
  println("A: 2");
}

async func CounterB() -> Task
{
  println("B: 1");
  await Task.Delay(300);
  println("B: 2");
}

public func Main() -> void
{
  t1: Task = CounterA();
  t2: Task = CounterB();

  t1.Wait();
  t2.Wait();
  println("done");
}`,language:"csharp",filename:"concurrent_async.shard"}),`
`,e.jsx(a,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Exception handling across an await."}),` The exception thrown after the await is
propagated through the state machine and caught by the async method's try/catch block.`]})}),`
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
          println("after await");
      }
      catch (ex: RuntimeException)
      {
          println("caught inside async");
      }
  }

  public static func Main() -> void
  {
      task: Task = CaughtAwait();
      task.Wait();
      println("done");
  }
}`,language:"csharp",filename:"async_exception.shard"}),`
`,e.jsx(a,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Defer runs after an await suspension."}),` The deferred call is re-registered on the
resume path and executes when the scope exits.`]})}),`
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
      task.Wait();
  }
}`,language:"csharp",filename:"async_defer.shard"}),`
`,e.jsx(a,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Loop with an await inside the body."}),` The loop variable and enumerator state are
lifted into the state-machine class so the loop can resume on each iteration.`]})}),`
`,e.jsx(r,{code:`using stdio;
using async;

namespace demo;

public class Program
{
  public static async func CountAsync() -> Task
  {
      for (i: int = 0; i < 3; i = i + 1)
      {
          println(i);
          await Task.Delay(50);
      }
      println("loop finished");
  }

  public static func Main() -> void
  {
      task: Task = CountAsync();
      task.Wait();
  }
}`,language:"csharp",filename:"async_loop.shard"}),`
`,e.jsx(a,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Common mistake: awaiting inside a conditional expression."}),` The hoisting pass can
only lift awaits that appear as top-level statements. Awaiting inside the condition of an`," ",`
`,e.jsx(t,{children:"if"}),` or the short-circuiting branch of an operator is currently unsupported
and reports a compile-time error.`]})}),`
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

  public static async func Bad() -> Task
  {
      // ERROR: await is not allowed inside the condition expression.
      // Rewrite it by awaiting into a local first, then testing the local.
      if (await GetBoolAsync())
      {
          println("yes");
      }
  }

  public static async func Good() -> Task
  {
      ready: bool = await GetBoolAsync();
      if (ready)
      {
          println("yes");
      }
  }

  public static func Main() -> void
  {
      task: Task = Good();
      task.Wait();
  }
}`,language:"csharp",filename:"await_in_condition.shard"}),`
`,e.jsx(o,{tone:"amber",title:"Unsupported await shapes",children:e.jsxs(s.p,{children:["Awaits nested inside conditional expressions, short-circuiting branches, or"," ",`
`,e.jsx(t,{children:"defer"}),` bodies are not supported by the current lowering. Rewrite them so
the await is a top-level statement assigned to an explicitly typed local.`]})}),`
`,e.jsx(i,{children:"Lowered bytecode overview"}),`
`,e.jsx(a,{children:e.jsx(s.p,{children:`The decompiled outline below shows the shape of the generated code for a single-await async method.
Addresses and pool indices are illustrative; the actual offsets depend on the method and layout.`})}),`
`,e.jsx(r,{code:`; Factory: original async method body is replaced by this.
; It creates the state machine, roots the task, and runs segment 0.
NEWOBJECT   <DelayedHello>k__AsyncStateMachine_0
STOREVAR    temp_stateMachine
NEWOBJECT   Task
STOREVAR    temp_task
LDVAR       temp_stateMachine
LDVAR       temp_task
STOREFIELD  _task
LDVAR       temp_stateMachine
LDFIELD     _task
CALLMETHOD  Task.InternalRoot
LDVAR       temp_stateMachine
CALLMETHOD  <DelayedHello>k__AsyncStateMachine_0.MoveNext
LDVAR       temp_stateMachine
LDFIELD     _task
RETURN

; MoveNext: switches on _state and runs the matching segment.
ENTER_TRY   handler_end
LDVAR       this
LDFIELD     _state
LDC.INT64   0
CEQ
JMP.TRUE    segment_0
LDVAR       this
LDFIELD     _state
LDC.INT64   1
CEQ
JMP.TRUE    segment_1
RETURN

segment_0:
  ; Restore lifted locals/parameters (none in this trivial example).
  ; User code up to the await.
  LDSTR       "before delay"
  CALL        stdio.println

  ; Evaluate the awaitable and get its awaiter.
  LDC.INT64   100
  CALL        Task.Delay
  CALL        Task.GetAwaiter
  STOREVAR    temp_awaiter
  LDVAR       this
  LDVAR       temp_awaiter
  STOREFIELD  _awaiter0

  ; Fast path: if already completed, jump to segment 1.
  LDVAR       this
  LDFIELD     _awaiter0
  CALL        TaskAwaiter.get_IsCompleted
  JMP.TRUE    segment_1

  ; Suspend: set state, register continuation, return.
  LDVAR       this
  LDC.INT64   1
  STOREFIELD  _state
  LDVAR       this
  LDVAR       this
  LDFIELD     _awaiter0
  CALL        TaskAwaiter.OnCompleted
  RETURN

segment_1:
  ; Resume context: consume the previous awaiter.
  LDVAR       this
  LDFIELD     _awaiter0
  CALL        TaskAwaiter.GetResult

  ; Remaining user code.
  LDSTR       "after delay"
  CALL        stdio.println

  ; Normal exit.
  LEAVE_TRY
  JMP         normal_exit

handler_end:
  STOREVAR    ex
  LDVAR       this
  LDFIELD     _task
  LDVAR       ex
  CALL        Task.SetException
  RETURN

normal_exit:
  LDVAR       this
  LDFIELD     _task
  CALL        Task.Complete
  RETURN`,language:"csharp",filename:"lowered_overview.txt"}),`
`,e.jsx(o,{tone:"blue",children:e.jsxs(s.p,{children:["The emitted bytecode uses real opcodes such as ",e.jsx(t,{children:"ENTER_TRY"}),","," ",`
`,e.jsx(t,{children:"LEAVE_TRY"}),", ",e.jsx(t,{children:"CALLMETHOD"}),", and"," ",`
`,e.jsx(t,{children:"STOREFIELD"}),`. The example above is simplified for readability; decompile your
own program with `,e.jsx(t,{children:"shard -d app.shard"})," to see the exact layout."]})})]})}function p(c={}){const{wrapper:s}=c.components||{};return s?e.jsx(s,{...c,children:e.jsx(d,{...c})}):d(c)}function l(c,s){throw new Error("Expected component `"+c+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
