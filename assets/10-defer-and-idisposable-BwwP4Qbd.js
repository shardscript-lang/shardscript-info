import{j as e}from"./index-B-x28vAk.js";function h(o){const s={p:"p",...o.components},{Bullet:t,Callout:l,CodeBlock:r,DocsTable:c,H2:a,InlineCode:n,Prose:i}=s;return t||d("Bullet"),l||d("Callout"),r||d("CodeBlock"),c||d("DocsTable"),a||d("H2"),n||d("InlineCode"),i||d("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(a,{children:"Summary"}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:["The ",e.jsx(n,{children:"defer"}),` statement schedules cleanup that runs when control leaves the
enclosing scope. The resource-defer form binds an `,e.jsx(n,{children:"IDisposable"}),` variable
and calls `,e.jsx(n,{children:"Dispose()"}),` automatically, giving ShardScript deterministic,
exception-safe cleanup without a C#-style `,e.jsx(n,{children:"using"})," block."]})}),`
`,e.jsx(a,{children:"Syntax"}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:["A defer statement begins with the ",e.jsx(n,{children:"defer"}),` keyword. The statement-defer form
evaluates any expression at scope exit; the resource-defer form declares a variable whose type
implements `,e.jsx(n,{children:"IDisposable"})," and calls ",e.jsx(n,{children:"Dispose()"}),` when
the scope exits.`]})}),`
`,e.jsx(r,{code:`// Statement defer: evaluate the expression when the scope exits.
defer <expression>;

// Resource defer: declare a variable and call Dispose when the scope exits.
defer <identifier>: <type> = <expression>;

// Inferred resource defer.
defer <identifier> := <expression>;`,language:"csharp",filename:"defer_syntax.shard"}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx(n,{children:"IDisposable"}),` is a compiler-provided interface with a single parameterless
cleanup method:`]})}),`
`,e.jsx(r,{code:`public interface IDisposable
{
  func Dispose() -> void;
}`,language:"csharp",filename:"idisposable.shard"}),`
`,e.jsx(a,{children:"Parameters / Arguments"}),`
`,e.jsx(c,{headers:["Form","Argument","Description"],rows:[[e.jsx(n,{children:"defer expr;"}),"expr","Any expression statement evaluated at scope exit."],[e.jsx(n,{children:"defer v: T = expr;"}),"v: T = expr","A variable declaration where T implements IDisposable; Dispose() is called at scope exit."],[e.jsx(n,{children:"defer v := expr;"}),"v := expr","Same as the resource-defer form, but the type is inferred from the initializer."],[e.jsx(n,{children:"IDisposable.Dispose()"}),"none","The concrete Dispose implementation resolved at compile time for the deferred variable."]]}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:["The deferred statement is captured at the point ",e.jsx(n,{children:"defer"}),` is written, but it
runs when the scope exits. For resource defers, the initializer executes immediately so the object
exists, but `,e.jsx(n,{children:"Dispose()"})," is delayed until scope exit."]})}),`
`,e.jsx(a,{children:"Returns"}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:["A ",e.jsx(n,{children:"defer"})," statement itself has no value. ",e.jsx(n,{children:"IDisposable.Dispose()"}),`
returns `,e.jsx(n,{children:"void"})," and exists only for side effects."]})}),`
`,e.jsx(a,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Empty defer"})," — ",e.jsx(n,{children:"defer;"})," ",`
with no statement is a parse error: "defer statement cannot be empty".`]})}),e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Defer outside a block"}),` — The emitter reports an
error if `,e.jsx(n,{children:"defer"})," is not inside a statements block."]})}),e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Non-disposable resource defer"}),` — A variable
declaration in `,e.jsx(n,{children:"defer"})," requires the type to implement"," ",`
`,e.jsx(n,{children:"IDisposable"}),"; otherwise semantic analysis fails."]})}),e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Missing Dispose implementation"}),` — The type must
provide an implementation for `,e.jsx(n,{children:"IDisposable.Dispose()"}),"."]})}),e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Double dispose"})," — Manually calling"," ",`
`,e.jsx(n,{children:"Dispose()"}),` on a resource-deferred instance can invoke the method twice.
Implementations should guard against this with a disposed flag.`]})}),e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Exception inside a defer"}),` — If a deferred
expression throws, the exception propagates normally. Any defers that have not yet run are still
drained during unwinding.`]})})]}),`
`,e.jsx(a,{children:"Remarks"}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Defer stack and LIFO order."})," Every call frame owns a defer stack. Each"," ",`
`,e.jsx(n,{children:"defer"})," statement emits a ",e.jsx(n,{children:"DEFER"}),` opcode that pushes
the bytecode offset of the deferred expression onto that stack. When the scope exits, the runtime
emits `,e.jsx(n,{children:"DEFER_DRAIN"}),` with the number of defers to run; the VM pops them from
the back and executes them last-in, first-out.`]})}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Scope boundaries."}),` A scope is a block delimited by braces. The compiler drains the
defers registered in that block when execution reaches the closing brace. Nested blocks drain
their own defers first; outer blocks drain afterward.`]})}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Compile-time binding."}),` The resource-defer form is not duck typing. The binder
resolves the concrete `,e.jsx(n,{children:"Dispose()"}),` method and stores it directly in the defer
AST node. At bytecode level, the deferred expression is a direct`," ",`
`,e.jsx(n,{children:"LOADVARIABLE"})," followed by ",e.jsx(n,{children:"CALLMETHODSYMBOL"}),` on that
concrete method. There is no interface dispatch at runtime.`]})}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Interaction with return."}),` The return expression is evaluated before defers run,
then `,e.jsx(n,{children:"DEFER_DRAIN"}),` clears every defer in the method, and finally the frame
returns. This guarantees cleanup runs before the caller receives the result.`]})}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Interaction with break."})," ",e.jsx(n,{children:"break"}),` drains defers from the
innermost scope up to and including the enclosing loop scope, then jumps to the loop end. Defers
declared outside the loop remain scheduled.`]})}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Interaction with exceptions."}),` When an exception is thrown, exception dispatch
records the defer stack size at each `,e.jsx(n,{children:"try"}),` boundary and drains only the
defers registered since that boundary before entering the matching `,e.jsx(n,{children:"catch"}),`.
If no handler is found in the frame, all remaining defers run before the exception propagates to
the caller.`]})}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Async methods."})," Async state-machine lowering re-registers active defers at every"," ",`
`,e.jsx(n,{children:"await"}),` resume point so that cleanup still executes correctly across
suspension boundaries. Resource defers emit the variable declaration into the`," ",`
`,e.jsx(n,{children:"MoveNext"})," method and schedule ",e.jsx(n,{children:"Dispose"}),` exactly as
in synchronous code.`]})}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Disposal chains."}),` A class that owns another disposable object should call the
owned object's `,e.jsx(n,{children:"Dispose()"}),` inside its own. Because defers run LIFO, the
outermost resource is disposed last, which is the safe order for nested ownership.`]})}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"VM opcodes."})," Three opcodes implement deferred execution:"]})}),`
`,e.jsx(c,{headers:["Opcode","Description"],rows:[[e.jsx(n,{children:"DEFER"}),"Pushes the bytecode offset of a deferred expression onto the frame defer stack."],[e.jsx(n,{children:"DEFER_BREAK"}),"Returns from a deferred expression back to the DEFER_DRAIN loop."],[e.jsx(n,{children:"DEFER_DRAIN"}),"Pops the top N deferred offsets and executes them LIFO."]]}),`
`,e.jsx(l,{tone:"amber",title:"Deferred expressions and control flow",children:e.jsxs(s.p,{children:["You cannot ",e.jsx(n,{children:"return"})," or ",e.jsx(n,{children:"break"}),` out of a deferred
expression in a meaningful way; the deferred code is emitted as a standalone fragment that ends
with `,e.jsx(n,{children:"DEFER_BREAK"}),`. Keep deferred statements simple and free of explicit
exit statements.`]})}),`
`,e.jsx(l,{tone:"blue",children:e.jsxs(s.p,{children:["Because the concrete ",e.jsx(n,{children:"Dispose()"}),` method is resolved at compile time, the
resource-defer form is effectively zero-overhead relative to writing the call manually at every
exit point. Implement `,e.jsx(n,{children:"Dispose()"})," defensively with a private"," ",`
`,e.jsx(n,{children:"disposed"})," bool field so repeated calls are harmless."]})}),`
`,e.jsx(a,{children:"Examples"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Basic statement defer."})}),`
`,e.jsx(r,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  println("starting work");

  defer println("cleanup after work");

  println("doing work");
}`,language:"csharp",filename:"defer_basic.shard"}),`
`,e.jsx(i,{children:e.jsx(s.p,{children:"Expected output:"})}),`
`,e.jsx(r,{code:`starting work
doing work
cleanup after work`,language:"plaintext",filename:"output.txt"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Resource defer with IDisposable."})}),`
`,e.jsx(r,{code:`using stdio;

namespace demo;

public class Resource : IDisposable
{
  public func Dispose() -> void
  {
      println("Resource disposed");
  }
}

public static func Main() -> void
{
  defer resource: Resource = new Resource();

  println("using resource");
}`,language:"csharp",filename:"defer_resource.shard"}),`
`,e.jsx(i,{children:e.jsx(s.p,{children:"Expected output:"})}),`
`,e.jsx(r,{code:`using resource
Resource disposed`,language:"plaintext",filename:"output.txt"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Nested scopes and LIFO order."})}),`
`,e.jsx(r,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  defer println("outer defer");

  println("enter outer");

  {
      defer println("inner-2");
      defer println("inner-1");

      println("inside inner");
  }

  println("back in outer");
}`,language:"csharp",filename:"defer_nested.shard"}),`
`,e.jsx(i,{children:e.jsx(s.p,{children:"Expected output:"})}),`
`,e.jsx(r,{code:`enter outer
inside inner
inner-1
inner-2
back in outer
outer defer`,language:"plaintext",filename:"output.txt"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Idempotent Dispose with a disposed flag."})}),`
`,e.jsx(r,{code:`using stdio;

namespace demo;

public class FileHandle : IDisposable
{
  private path: string;
  private opened: bool;

  public init(path: string)
  {
      this.path = path;
      this.opened = true;
      println("opened " + path);
  }

  public func Dispose() -> void
  {
      // Guard against repeated disposal from defer + manual call.
      if (this.opened)
      {
          this.opened = false;
          println("closed " + this.path);
      }
  }
}

public static func Main() -> void
{
  defer handle: FileHandle = new FileHandle("data.txt");
  println("working with data.txt");

  // Output:
  //   opened data.txt
  //   working with data.txt
  //   closed data.txt
}`,language:"csharp",filename:"disposable_idempotent.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Disposal chain: an outer object owns an inner disposable."})}),`
`,e.jsx(r,{code:`using stdio;

namespace demo;

public class FileHandle : IDisposable
{
  private path: string;
  private opened: bool;

  public init(path: string)
  {
      this.path = path;
      this.opened = true;
      println("opened " + path);
  }

  public func Dispose() -> void
  {
      if (this.opened)
      {
          this.opened = false;
          println("closed " + this.path);
      }
  }
}

public class BufferedLogger : IDisposable
{
  private inner: FileHandle;

  public init(path: string)
  {
      this.inner = new FileHandle(path);
  }

  public func Dispose() -> void
  {
      // Forward disposal down the ownership chain.
      this.inner.Dispose();
      println("buffered logger disposed");
  }
}

public static func Main() -> void
{
  defer logger: BufferedLogger = new BufferedLogger("app.log");
  println("writing logs...");

  // Output:
  //   opened app.log
  //   writing logs...
  //   closed app.log
  //   buffered logger disposed
}`,language:"csharp",filename:"disposable_chain.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Defer with early return."})}),`
`,e.jsx(r,{code:`using stdio;

namespace demo;

public static func MaybeReturn(takeEarlyPath: bool) -> void
{
  defer println("always cleanup");

  println("before check");

  if (takeEarlyPath)
  {
      println("early return");
      return;
  }

  println("normal path");
}

public static func Main() -> void
{
  MaybeReturn(true);
  println("---");
  MaybeReturn(false);
}`,language:"csharp",filename:"defer_return.shard"}),`
`,e.jsx(i,{children:e.jsx(s.p,{children:"Expected output:"})}),`
`,e.jsx(r,{code:`before check
early return
always cleanup
---
before check
normal path
always cleanup`,language:"plaintext",filename:"output.txt"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Defer during exception unwinding."})}),`
`,e.jsx(r,{code:`using stdio;

namespace demo;

public static func Inner() -> void
{
  defer println("inner cleanup");
  println("inner throwing");
  throw new RuntimeException();
}

public static func Outer() -> void
{
  defer println("outer cleanup");
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
      println("caught");
  }
}`,language:"csharp",filename:"defer_exception.shard"}),`
`,e.jsx(i,{children:e.jsx(s.p,{children:"Expected output:"})}),`
`,e.jsx(r,{code:`inner throwing
inner cleanup
outer cleanup
caught`,language:"plaintext",filename:"output.txt"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Resource defer in an async method."})}),`
`,e.jsx(r,{code:`using stdio;
using async;

namespace demo;

public class Connection : IDisposable
{
  public func Dispose() -> void
  {
      println("connection closed");
  }
}

public class Program
{
  public static async func WorkAsync() -> Task
  {
      defer conn: Connection = new Connection();
      println("before await");
      await Task.Delay(10);
      println("after await");
  }

  public static func Main() -> void
  {
      Task.Wait(WorkAsync());
      println("done");
  }
}

// Output:
//   before await
//   after await
//   connection closed
//   done`,language:"csharp",filename:"disposable_async.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Common mistake: deferring a non-disposable type."})}),`
`,e.jsx(r,{code:`using stdio;

namespace demo;

public class PlainBox
{
  public Value: int;
}

public static func Main() -> void
{
  // Compile-time error:
  // Type 'PlainBox' declared in defer statement must implement IDisposable.
  defer box: PlainBox = new PlainBox();
  box.Value = 42;
}`,language:"csharp",filename:"disposable_error.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Common mistake: depending on mutated state inside a defer."})}),`
`,e.jsx(r,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  i: int = 0;

  defer println("deferred i = " + i);

  i = 42;
  println("before exit, i = " + i);
}`,language:"csharp",filename:"defer_state.shard"}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:["Expected output. The deferred expression reads ",e.jsx(n,{children:"i"}),` when it executes, after
the assignment:`]})}),`
`,e.jsx(r,{code:`before exit, i = 42
deferred i = 42`,language:"plaintext",filename:"output.txt"}),`
`,e.jsx(l,{tone:"blue",children:e.jsxs(s.p,{children:[`This behavior is useful for cleanup that needs final values, but it can be surprising if you
expected the value at the point `,e.jsx(n,{children:"defer"}),` was written. Capture values into
local variables before deferring if you need snapshot semantics.`]})}),`
`,e.jsx(i,{children:e.jsxs("strong",{children:["Standard-library types that implement ",e.jsx(n,{children:"IDisposable"}),"."]})}),`
`,e.jsx(c,{headers:["Type","Namespace","What Dispose() releases"],rows:[[e.jsx(n,{children:"FileStream"}),"filesystem","Closes the underlying OS file handle."],[e.jsx(n,{children:"MemoryStream"}),"io","Marks the internal buffer as closed."],[e.jsx(n,{children:"SocketStream"}),"net","Disassociates from the socket handle."],[e.jsx(n,{children:"Socket"}),"net","Closes the OS socket descriptor."],[e.jsx(n,{children:"StreamReader"}),"io","Releases the wrapped stream reference and disposed flag."],[e.jsx(n,{children:"StreamWriter"}),"io","Flushes pending data and releases the wrapped stream."]]}),`
`,e.jsx(a,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("a",{href:"/shardscript-info/docs/syntax/exceptions",className:"underline",children:"Exceptions and Error Handling"})," — how defer cleanup interacts with try/catch unwinding."]})}),e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("a",{href:"/shardscript-info/docs/syntax/garbage-collection",className:"underline",children:"Automatic Memory Management"})," — how deterministic disposal complements the garbage collector."]})}),e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("a",{href:"/shardscript-info/docs/syntax/async-functions",className:"underline",children:"Async Functions"})," — how resource defers behave across await suspension points."]})})]}),`
`,e.jsx(a,{children:"Source"}),`
`,e.jsxs(i,{children:[e.jsxs(s.p,{children:["The ShardScript compiler, virtual machine, and standard-library implementations live in the"," "]}),e.jsx("a",{href:"https://github.com/Rikitav/ShardScript",target:"_blank",rel:"noreferrer",className:"underline",children:e.jsx(s.p,{children:"ShardScript repository"})}),e.jsx(s.p,{children:`. The runtime defer mechanism is implemented in the VM execution loop; resource-defer binding and
interface implementation resolution are handled during semantic analysis.`})]})]})}function x(o={}){const{wrapper:s}=o.components||{};return s?e.jsx(s,{...o,children:e.jsx(h,{...o})}):h(o)}function d(o,s){throw new Error("Expected component `"+o+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
