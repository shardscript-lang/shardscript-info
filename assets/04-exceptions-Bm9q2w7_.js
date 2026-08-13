import{j as e}from"./index-DLc5xCYN.js";function d(s){const r={p:"p",...s.components},{Bullet:a,Callout:l,CodeBlock:i,DocsTable:h,H2:c,InlineCode:t,Prose:n}=r;return a||o("Bullet"),l||o("Callout"),i||o("CodeBlock"),h||o("DocsTable"),c||o("H2"),t||o("InlineCode"),n||o("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(c,{children:"Summary"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:["ShardScript exceptions transfer control from the point of failure to the nearest enclosing"," ",`
`,e.jsx(t,{children:"catch"})," clause that can handle the thrown object. The language provides"," ",`
`,e.jsx(t,{children:"try"}),"/",e.jsx(t,{children:"catch"})," blocks, the ",e.jsx(t,{children:"throw"})," ",`
statement, typed and catch-all filters, bare `,e.jsx(t,{children:"throw;"}),` rethrow, and automatic
defer unwinding during stack traversal.`]})}),`
`,e.jsx(c,{children:"Syntax"}),`
`,e.jsxs(n,{children:["Statement form — every ",e.jsx(t,{children:"try"})," must have at least one"," ",`
`,e.jsx(t,{children:"catch"})," clause:"]}),`
`,e.jsx(i,{code:`try
{
  // guarded statements
}
catch (variable: ExceptionType)
{
  // handler for ExceptionType and subtypes
}
catch (variable)
{
  // catch-all handler; the variable is typed as any
}

// Throw a new exception.
throw new RuntimeException();

// Rethrow the exception currently being handled.
throw;`,language:"csharp",filename:"exceptions_syntax.shard"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx(t,{children:"throw"}),` is also accepted as a prefix expression inside another expression,
but the statement form is the idiomatic way to raise an error.`]})}),`
`,e.jsx(c,{children:"Parameters / Arguments"}),`
`,e.jsx(h,{headers:["Element","Required","Type","Description"],rows:[[e.jsx(t,{children:"try"}),"yes","keyword","Opens the guarded block whose exceptions are eligible for the attached catches."],[e.jsx(t,{children:"catch"}),"yes (one or more)","keyword","Opens a handler clause. A try without at least one catch is a parser error."],[e.jsx(t,{children:"variable"}),"yes (per clause)","identifier","The local name bound to the caught object inside the handler body."],[e.jsx(t,{children:"ExceptionType"}),"no","type","The type filter. If omitted the clause defaults to <InlineCode>any</InlineCode>. When present, the type must implement <InlineCode>IThrowable</InlineCode>."],[e.jsx(t,{children:"throw expression"}),"yes (statement)","IThrowable","An object implementing <InlineCode>IThrowable</InlineCode> to raise."],[e.jsx(t,{children:"throw;"}),"yes (rethrow)","none","Re-raises the active exception from inside a catch body."]]}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"Catch clause matching order:"})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(a,{children:e.jsx(r.p,{children:`Clauses are evaluated in source order; the first clause whose type filter matches the thrown
object wins.`})}),e.jsx(a,{children:e.jsx(r.p,{children:`A typed catch matches the declared type and any subtype that implements the same interface or
inherits from the declared class.`})}),e.jsx(a,{children:e.jsx(r.p,{children:`A catch with no explicit type matches every object and must be placed last, after all typed
clauses.`})})]}),`
`,e.jsx(c,{children:"Returns"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:["A ",e.jsx(t,{children:"try"}),"/",e.jsx(t,{children:"catch"})," statement has no value. If the"," ",`
`,e.jsx(t,{children:"try"})," block completes normally, execution continues after the last"," ",`
`,e.jsx(t,{children:"catch"}),`. If an exception is thrown and caught, execution continues after the
matching `,e.jsx(t,{children:"catch"}),` body. If an exception is thrown and not caught, it propagates
to the caller.`]})}),`
`,e.jsx(c,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Try without catch"})," — A"," ",`
`,e.jsx(t,{children:"try"})," block with no following ",e.jsx(t,{children:"catch"}),` clause produces
a parser error: "'try' statement must have at least one 'catch' clause".`]})}),e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Catch without variable or type"}),` — Every catch must
declare an exception variable, a type, or both. A bare `,e.jsx(t,{children:"catch "}),` is
rejected.`]})}),e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Non-throwable catch type"}),` — A typed catch filter
must name a type that implements `,e.jsx(t,{children:"IThrowable"}),". Catching"," ",`
`,e.jsx(t,{children:"int"}),", ",e.jsx(t,{children:"string"}),`, or other unrelated reference types
fails semantic analysis.`]})}),e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Throwing a non-throwable"}),` — The expression supplied to
a `,e.jsx(t,{children:"throw"})," statement must evaluate to an object implementing"," ",`
`,e.jsx(t,{children:"IThrowable"}),"."]})}),e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Rethrow outside catch"})," — A bare"," ",`
`,e.jsx(t,{children:"throw;"})," compiles only inside a ",e.jsx(t,{children:"catch"}),` body where an
active exception exists.`]})}),e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Unhandled exception"}),` — If an exception reaches the
entry point without being caught, the VM terminates and prints the stack trace captured at the
throw site.`]})})]}),`
`,e.jsx(c,{children:"Remarks"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsxs("strong",{children:["The ",e.jsx(t,{children:"IThrowable"})," interface."]}),` ShardScript defines a built-in
interface `,e.jsx(t,{children:"IThrowable"}),` in the global namespace. It declares two read-only
instance properties:`]})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx(t,{children:"message: string"})," — A human-readable description of the error."]})}),e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx(t,{children:"stack_trace: string"}),` — The call-stack snapshot captured when the exception
was thrown.`]})})]}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:["Any class or struct that implements ",e.jsx(t,{children:"IThrowable"}),` can be thrown and caught.
The built-in `,e.jsx(t,{children:"RuntimeException"}),` class implements the interface and is the
conventional base for ad-hoc failures. Its default constructor takes no arguments; the`," ",`
`,e.jsx(t,{children:"message"})," and ",e.jsx(t,{children:"stack_trace"}),` properties are populated by
the runtime when the object is thrown.`]})}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsxs("strong",{children:["Auto-population of ",e.jsx(t,{children:"stack_trace"}),"."]}),` When a managed object that
implements `,e.jsx(t,{children:"IThrowable"})," is thrown with ",e.jsx(t,{children:"throw"}),`, the VM
checks whether its `,e.jsx(t,{children:"stack_trace"}),` backing field is empty. If it is, the VM writes
the current managed call stack into that field before control transfers to the handler. This makes
managed throws consistent with exceptions raised from native code.`]})}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Typed exceptions from native libraries."})," Native libraries can register their own"," ",`
`,e.jsx(t,{children:"IThrowable"})," classes and throw them through"," ",`
`,e.jsx(t,{children:"shard::runtime_exception"}),`. The VM catches the C++ exception and instantiates the
requested managed type instead of the built-in `,e.jsx(t,{children:"RuntimeException"}),". See the"," ",`
`,e.jsx(t,{children:"library-building/throwing-typed-exceptions"}),` how-to for the full registration and
throw pattern.`]})}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Typed versus catch-all clauses."}),` Use typed catches for code paths that need to
inspect a specific failure. Use `,e.jsx(t,{children:"catch (ex)"}),` as a final safety net; the
variable is typed as `,e.jsx(t,{children:"any"}),` when no type is supplied. Because matching is
sequential, always place the most specific types first and the catch-all last.`]})}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Rethrow semantics."})," Inside a catch body, ",e.jsx(t,{children:"throw;"}),` re-raises
the exception currently being handled, preserving the original stack trace. This is different from
`,e.jsx(t,{children:"throw ex;"}),`, which would create a new throw point and overwrite the trace.
Use `,e.jsx(t,{children:"throw;"}),` when you only want to log or partially handle an error before
passing it up the stack.`]})}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsxs("strong",{children:["Stack unwinding and ",e.jsx(t,{children:"defer"}),"."]}),` When an exception is thrown, the
VM walks the call stack looking for a handler. Before entering each candidate`," ",`
`,e.jsx(t,{children:"catch"}),", it drains every ",e.jsx(t,{children:"defer"}),` registered in the
scopes being unwound, in last-in, first-out order. If no handler exists in the current frame, all
remaining defers in that frame run before the exception propagates to the caller. See the`," ",`
`,e.jsx(t,{children:"defer"}),` reference page for full details on scope boundaries and resource
cleanup.`]})}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Async methods."})," Exceptions thrown inside an ",e.jsx(t,{children:"async"}),` method are
captured by the returned `,e.jsx(t,{children:"Task"})," or ",e.jsx(t,{children:"ValueTask"}),` and
re-thrown when the task is awaited or when `,e.jsx(t,{children:"Wait()"})," is called."," ",`
`,e.jsx(t,{children:"try"}),"/",e.jsx(t,{children:"catch"})," works around ",e.jsx(t,{children:"await"})," ",`
because the async state-machine lowering preserves exception-handler offsets across suspension
points.`]})}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"VM lowering."})," The compiler emits ",e.jsx(t,{children:"ENTER_TRY"}),` to register a
handler, `,e.jsx(t,{children:"LEAVE_TRY"})," when the guarded block exits normally, and"," ",`
`,e.jsx(t,{children:"END_CATCH"}),` at the end of the handler region. Each typed catch emits an
`,e.jsx(t,{children:"IS_INSTANCE"}),` check followed by a conditional jump; if no clause matches, the
runtime falls through to `,e.jsx(t,{children:"THROW"})," to continue propagation."]})}),`
`,e.jsx(l,{tone:"amber",title:"finally blocks are not implemented",children:e.jsxs(r.p,{children:["ShardScript does not yet support ",e.jsx(t,{children:"finally"})," blocks. Use"," ",`
`,e.jsx(t,{children:"defer"})," inside the ",e.jsx(t,{children:"try"}),` block for deterministic
cleanup that runs on both normal exit and exception unwinding.`]})}),`
`,e.jsx(c,{children:"Examples"}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"Basic try/catch with RuntimeException."})}),`
`,e.jsx(i,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  try
  {
      println("before throw");
      throw new RuntimeException();
  }
  catch (ex: RuntimeException)
  {
      println("caught RuntimeException");
  }

  println("after catch");
}`,language:"csharp",filename:"basic_try_catch.shard"}),`
`,e.jsx(n,{children:"Expected output:"}),`
`,e.jsx(i,{code:`before throw
caught RuntimeException
after catch`,language:"plaintext",filename:"output.txt"}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"Typed catches, IThrowable, and catch-all."})}),`
`,e.jsx(i,{code:`using stdio;

namespace demo;

public class NetworkException : RuntimeException
{
}

public class TimeoutException : NetworkException
{
}

public static func Simulate(code: int) -> void
{
  if (code == 1)
  {
      throw new TimeoutException();
  }
  else if (code == 2)
  {
      throw new NetworkException();
  }
  else
  {
      throw new RuntimeException();
  }
}

public static func Main() -> void
{
  for (code: int in 1..4)
  {
      try
      {
          Simulate(code);
      }
      catch (ex: TimeoutException)
      {
          println("timeout");
      }
      catch (ex: NetworkException)
      {
          println("network error");
      }
      catch (ex: IThrowable)
      {
          println("generic throwable");
      }
  }
}`,language:"csharp",filename:"typed_catches.shard"}),`
`,e.jsx(n,{children:"Expected output:"}),`
`,e.jsx(i,{code:`timeout
network error
generic throwable`,language:"plaintext",filename:"output.txt"}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"Rethrow to preserve the original failure."})}),`
`,e.jsx(i,{code:`using stdio;

namespace demo;

public static func LogAndForward() -> void
{
  try
  {
      throw new RuntimeException();
  }
  catch (ex: RuntimeException)
  {
      // Log locally, then continue propagating the same exception.
      println("logged");
      throw;
  }
}

public static func Main() -> void
{
  try
  {
      LogAndForward();
  }
  catch (ex: RuntimeException)
  {
      println("caught after rethrow");
  }
}`,language:"csharp",filename:"rethrow.shard"}),`
`,e.jsx(n,{children:"Expected output:"}),`
`,e.jsx(i,{code:`logged
caught after rethrow`,language:"plaintext",filename:"output.txt"}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"Catch-all and inspecting the message."})}),`
`,e.jsx(i,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  try
  {
      throw new RuntimeException();
  }
  catch (ex)
  {
      // The catch variable is typed as any, but it is still an IThrowable
      // instance at runtime, so the message property is accessible.
      println("caught: " + ex.message);
  }
}`,language:"csharp",filename:"catch_all.shard"}),`
`,e.jsx(n,{children:"Expected output (message content may be empty for a bare RuntimeException):"}),`
`,e.jsx(i,{code:"caught: ",language:"plaintext",filename:"output.txt"}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"Inspecting the stack trace."})}),`
`,e.jsx(i,{code:`using stdio;

namespace demo;

public static func Inner() -> void
{
  throw new RuntimeException();
}

public static func Outer() -> void
{
  Inner();
}

public static func Main() -> void
{
  try
  {
      Outer();
  }
  catch (ex: RuntimeException)
  {
      println("message: " + ex.message);
      println("stack trace:");
      println(ex.stack_trace);
  }
}`,language:"csharp",filename:"stack_trace.shard"}),`
`,e.jsx(n,{children:"Expected output (exact frame names depend on your namespace):"}),`
`,e.jsx(i,{code:`message:
stack trace:
demo.Program.Outer
demo.Program.Inner
demo.Program.Main`,language:"plaintext",filename:"output.txt"}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"Stack unwinding with defer."})}),`
`,e.jsx(i,{code:`using stdio;

namespace demo;

public static func LevelThree() -> void
{
  defer println("level-three cleanup");
  println("level-three throwing");
  throw new RuntimeException();
}

public static func LevelTwo() -> void
{
  defer println("level-two cleanup");
  LevelThree();
}

public static func LevelOne() -> void
{
  defer println("level-one cleanup");
  LevelTwo();
}

public static func Main() -> void
{
  try
  {
      LevelOne();
  }
  catch (ex: RuntimeException)
  {
      println("caught in Main");
  }
}`,language:"csharp",filename:"defer_unwind.shard"}),`
`,e.jsx(n,{children:"Expected output:"}),`
`,e.jsx(i,{code:`level-three throwing
level-three cleanup
level-two cleanup
level-one cleanup
caught in Main`,language:"plaintext",filename:"output.txt"}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"Async exception propagation."})}),`
`,e.jsx(i,{code:`using stdio;
using async;

namespace demo;

public static async func Faulty() -> Task
{
  await Task.Delay(10);
  throw new RuntimeException();
}

public static func Main() -> void
{
  task: Task = Faulty();

  try
  {
      task.Wait();
  }
  catch (ex: RuntimeException)
  {
      println("async failure observed");
  }
}`,language:"csharp",filename:"async_exception.shard"}),`
`,e.jsx(n,{children:"Expected output:"}),`
`,e.jsx(i,{code:"async failure observed",language:"plaintext",filename:"output.txt"}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"Common mistake: catching a base type before a derived type."})}),`
`,e.jsx(i,{code:`using stdio;

namespace demo;

public class BaseException : RuntimeException
{
}

public class DerivedException : BaseException
{
}

public static func Main() -> void
{
  try
  {
      throw new DerivedException();
  }
  // WRONG ORDER: BaseException matches first, so the more specific
  // DerivedException handler below is unreachable.
  catch (ex: BaseException)
  {
      println("base");
  }
  // catch (ex: DerivedException)
  // {
  //     println("derived");
  // }
}`,language:"csharp",filename:"catch_order_mistake.shard"}),`
`,e.jsx(l,{tone:"blue",children:e.jsxs(r.p,{children:["The commented-out ",e.jsx(t,{children:"DerivedException"}),` handler is unreachable because the
preceding `,e.jsx(t,{children:"BaseException"}),` clause already catches the object. Always order
catches from most derived to least derived, and put the catch-all last.`]})}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"Common mistake: using throw ex instead of throw."})}),`
`,e.jsx(i,{code:`using stdio;

namespace demo;

public static func Wrapper() -> void
{
  try
  {
      throw new RuntimeException();
  }
  catch (ex: RuntimeException)
  {
      // This compiles, but it resets the throw point and stack trace.
      // Prefer the bare 'throw;' rethrow shown earlier.
      throw ex;
  }
}

public static func Main() -> void
{
  try
  {
      Wrapper();
  }
  catch (ex: RuntimeException)
  {
      println("caught wrapper exception");
  }
}`,language:"csharp",filename:"throw_ex_mistake.shard"})]})}function x(s={}){const{wrapper:r}=s.components||{};return r?e.jsx(r,{...s,children:e.jsx(d,{...s})}):d(s)}function o(s,r){throw new Error("Expected component `"+s+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
