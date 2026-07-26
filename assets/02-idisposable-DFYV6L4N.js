import{j as e}from"./index-IfqX08ny.js";function h(t){const n={br:"br",p:"p",...t.components},{Bullet:r,Callout:c,CodeBlock:a,DocsTable:d,H2:o,InlineCode:s,Prose:i}=n;return r||l("Bullet"),c||l("Callout"),a||l("CodeBlock"),d||l("DocsTable"),o||l("H2"),s||l("InlineCode"),i||l("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(o,{children:"Summary"}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:["ShardScript provides deterministic resource cleanup through the built-in"," ",`
`,e.jsx(s,{children:"IDisposable"})," interface and the resource form of the"," ",`
`,e.jsx(s,{children:"defer"}),` statement. The compiler verifies that a deferred
variable implements `,e.jsx(s,{children:"IDisposable"}),", resolves the concrete"," ",`
`,e.jsx(s,{children:"Dispose()"}),` implementation at compile time, and guarantees
that disposal runs when the enclosing scope exits — whether by normal flow, early
return, or exception unwinding.`]})}),`
`,e.jsx(o,{children:"Syntax"}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx(s,{children:"IDisposable"}),` is a compiler-provided interface with a single
parameterless method. A type participates in deterministic disposal by implementing
it, and a variable is bound to automatic disposal with the resource-defer form.`]})}),`
`,e.jsx(d,{headers:["Construct","Syntax","Description"],rows:[[e.jsx(s,{children:"IDisposable"}),e.jsxs(e.Fragment,{children:[e.jsx(s,{children:"public interface IDisposable"}),e.jsx(n.br,{}),e.jsxs(s,{children:["{"," func Dispose() -> void; ","}"]})]}),"Contract that defines a single cleanup method."],[e.jsx(s,{children:"Resource defer"}),e.jsx(e.Fragment,{children:e.jsx(s,{children:"defer name: Type = expression;"})}),"Declares a variable and schedules <InlineCode>name.Dispose()</InlineCode> at scope exit."],[e.jsx(s,{children:"Inferred resource defer"}),e.jsx(e.Fragment,{children:e.jsx(s,{children:"defer name := expression;"})}),"Same behavior; the type is inferred from the initializer."]]}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:["The statement-defer form (",e.jsx(s,{children:"defer expression;"}),`) also exists, but it
is unrelated to `,e.jsx(s,{children:"IDisposable"}),`; it defers arbitrary statements rather
than calling `,e.jsx(s,{children:"Dispose()"})," automatically."]})}),`
`,e.jsx(o,{children:"Parameters / Arguments"}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx(s,{children:"IDisposable.Dispose()"}),` takes no arguments and returns nothing.
The resource-defer form accepts the same initializer as a normal variable declaration.`]})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Variable type"})," — must be assignable to"," ",`
`,e.jsx(s,{children:"IDisposable"}),". The compiler rejects the declaration if it is not."]})}),e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Initializer"}),` — any expression whose type is
assignable to the variable type. Evaluation happens immediately, before the defer is
registered.`]})}),e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Dispose implementation"}),` — the compiler
locates the concrete implementation through interface-implementation lookup and stores it
directly in the defer AST node.`]})})]}),`
`,e.jsx(o,{children:"Returns"}),`
`,e.jsx(d,{headers:["Member / Form","Return type"],rows:[[e.jsx(s,{children:"IDisposable.Dispose()"}),e.jsxs(e.Fragment,{children:[e.jsx(s,{children:"void"})," — the method exists only for side effects."]})],[e.jsx(s,{children:"defer name: Type = expression;"}),"No value. The statement produces a registered cleanup action."]]}),`
`,e.jsx(o,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Type does not implement IDisposable"}),` — the
binder emits `,e.jsx("em",{children:`"Type 'X' declared in defer statement must implement IDisposable"`}),"."]})}),e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"IDisposable not defined"}),` — if the standard
interface has been removed or is unreachable, the binder reports `,e.jsx("em",{children:'"IDisposable interface is not defined"'}),"."]})}),e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Missing Dispose implementation"}),` — a type that
claims to implement `,e.jsx(s,{children:"IDisposable"})," but provides no matching"," ",`
`,e.jsx(s,{children:"Dispose()"})," method produces ",e.jsx("em",{children:`"Type 'X' does not provide an implementation for IDisposable.Dispose()"`}),"."]})}),e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"defer outside a block"}),` — the emitter reports
`,e.jsx("em",{children:'"defer statement must be inside a block"'})," because defers are scoped to brace-enclosed statement blocks."]})}),e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Empty defer"})," — ",e.jsx(s,{children:"defer;"}),` is
rejected by the parser with `,e.jsx("em",{children:'"defer statement cannot be empty"'}),"."]})}),e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Double dispose"})," — manually calling"," ",`
`,e.jsx(s,{children:"Dispose()"}),` on a resource-deferred instance can invoke the method twice.
Implementations should guard against this with a disposed flag.`]})})]}),`
`,e.jsx(o,{children:"Remarks"}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Compile-time binding."}),` The resource-defer form is not duck typing. The
binder resolves `,e.jsx(s,{children:"FindInterfaceImplementation"})," for the concrete"," ",`
`,e.jsx(s,{children:"Dispose()"}),` method and stores it in the defer node. At bytecode level,
the deferred expression is a direct `,e.jsx(s,{children:"LOADVARIABLE"})," followed by"," ",`
`,e.jsx(s,{children:"CALLMETHODSYMBOL"}),` on that concrete method. There is no interface
dispatch at runtime.`]})}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"LIFO execution order."}),` Multiple defers in the same scope execute in
reverse declaration order (last in, first out). Nested scopes drain their defers before the
outer scope drains its own, so inner resources are released before resources that own them.`]})}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Disposal chains."}),` A class that owns another disposable object should call
the owned object's `,e.jsx(s,{children:"Dispose()"}),` inside its own. This composes into
chains where the outer object triggers cleanup of everything it wraps. Because defers run
LIFO, the outermost resource is disposed last, which is the safe order for nested ownership.`]})}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Exception safety."}),` Resource defers are drained during exception unwinding.
When a `,e.jsx(s,{children:"try"}),` block is entered, the VM records the current defer-stack
baseline. If an exception propagates, `,e.jsx(s,{children:"DrainDefersTo(baseline)"}),` runs
every defer registered inside the `,e.jsx(s,{children:"try"}),` before control reaches the
matching `,e.jsx(s,{children:"catch"}),`. Unhandled exceptions drain the entire frame before
propagating to the caller.`]})}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Async functions."})," Resource defers work across ",e.jsx(s,{children:"await"})," ",`
suspension points. The async emission pass re-emits active `,e.jsx(s,{children:"DEFER"})," ",`
instructions on every resume path so the defer stack is reconstructed when the state machine
continues. The resource is disposed when the async method completes, faults, or is cancelled,
even if it never reached the first `,e.jsx(s,{children:"await"}),"."]})}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Runtime mechanism."}),` The VM stores each defer as a bytecode offset in the
frame's `,e.jsx(s,{children:"DeferStack"}),". A ",e.jsx(s,{children:"DEFER_DRAIN"})," ",`
opcode pops the requested count and executes each deferred body through a sub-interpreter loop
until `,e.jsx(s,{children:"DEFER_BREAK"}),` is reached. The runtime does not distinguish a
resource defer from a statement defer; the difference was resolved at compile time.`]})}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsxs("strong",{children:["No ",e.jsx(s,{children:"using"})," statement."]}),` ShardScript does not have a
C#-style `,e.jsx(s,{children:"using"}),` block. The resource-defer form is the only built-in
deterministic disposal syntax.`]})}),`
`,e.jsx(c,{tone:"blue",children:e.jsxs(n.p,{children:["Because the concrete ",e.jsx(s,{children:"Dispose()"}),` method is resolved at compile time,
the resource-defer form is effectively zero-overhead relative to writing the call manually at
every exit point. The compiler emits the same direct method call you would write yourself.`]})}),`
`,e.jsx(c,{tone:"amber",children:e.jsxs(n.p,{children:["Implement ",e.jsx(s,{children:"Dispose()"}),` defensively. If user code or another dispose
chain calls it a second time, the method should silently return rather than throw or close an
already-released handle. Track this with a private `,e.jsx(s,{children:"disposed"})," bool field."]})}),`
`,e.jsx(o,{children:"Examples"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Basic IDisposable implementation."})}),`
`,e.jsx(a,{code:`using stdio;

namespace demo;

public class Resource : IDisposable
{
  private name: string;

  public init(name: string)
  {
      this.name = name;
      println("acquired: " + name);
  }

  public func Dispose() -> void
  {
      // Release whatever the resource owns; here we just trace.
      println("disposed: " + this.name);
  }
}

public static func Main() -> void
{
  defer r: Resource = new Resource("alpha");
  println("using alpha");

  // Output:
  //   acquired: alpha
  //   using alpha
  //   disposed: alpha
}`,language:"csharp",filename:"disposable_basic.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Idempotent Dispose with a disposed flag."})}),`
`,e.jsx(a,{code:`using stdio;

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
`,e.jsx(i,{children:e.jsx("strong",{children:"Multiple resources dispose in LIFO order."})}),`
`,e.jsx(a,{code:`using stdio;

namespace demo;

public class Database : IDisposable
{
  public func Dispose() -> void
  {
      println("database disposed");
  }
}

public class Logger : IDisposable
{
  public func Dispose() -> void
  {
      println("logger disposed");
  }
}

public static func Main() -> void
{
  defer db: Database = new Database();
  defer log: Logger = new Logger();
  println("working...");

  // Output:
  //   working...
  //   logger disposed   // registered second, disposed first
  //   database disposed
}`,language:"csharp",filename:"disposable_lifo.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Disposal chain: an outer object owns an inner disposable."})}),`
`,e.jsx(a,{code:`using stdio;

namespace demo;

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
`,e.jsx(i,{children:e.jsx("strong",{children:"Disposal during exception unwinding."})}),`
`,e.jsx(a,{code:`using stdio;

namespace demo;

public class CriticalResource : IDisposable
{
  public func Dispose() -> void
  {
      println("critical resource cleaned up");
  }
}

public static func Work() -> void
{
  defer r: CriticalResource = new CriticalResource();
  println("about to throw");
  throw new RuntimeException();
}

public static func Main() -> void
{
  try
  {
      Work();
  }
  catch (ex: RuntimeException)
  {
      println("caught exception");
  }

  // Output:
  //   about to throw
  //   critical resource cleaned up
  //   caught exception
}`,language:"csharp",filename:"disposable_exception.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Resource defer in an async method."})}),`
`,e.jsx(a,{code:`using stdio;
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
`,e.jsx(a,{code:`using stdio;

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
`,e.jsx(i,{children:e.jsxs("strong",{children:["Standard-library types that implement ",e.jsx(s,{children:"IDisposable"}),"."]})}),`
`,e.jsx(d,{headers:["Type","Namespace","What Dispose() releases"],rows:[[e.jsx(s,{children:"FileStream"}),"filesystem","Closes the underlying OS file handle."],[e.jsx(s,{children:"MemoryStream"}),"io","Marks the internal buffer as closed."],[e.jsx(s,{children:"SocketStream"}),"net","Disassociates from the socket handle."],[e.jsx(s,{children:"Socket"}),"net","Closes the OS socket descriptor."],[e.jsx(s,{children:"StreamReader"}),"io","Releases the wrapped stream reference and disposed flag."],[e.jsx(s,{children:"StreamWriter"}),"io","Flushes pending data and releases the wrapped stream."]]})]})}function u(t={}){const{wrapper:n}=t.components||{};return n?e.jsx(n,{...t,children:e.jsx(h,{...t})}):h(t)}function l(t,n){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};
