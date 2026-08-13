import{j as e}from"./index-BQw6jbtc.js";function d(a){const s={p:"p",...a.components},{Bullet:t,CodeBlock:l,DocsTable:c,H2:r,InlineCode:n,Prose:i}=s;return t||o("Bullet"),l||o("CodeBlock"),c||o("DocsTable"),r||o("H2"),n||o("InlineCode"),i||o("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(r,{children:"Summary"}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Object lifetime"}),` describes how long a ShardScript value remains usable and what keeps it alive.
Value types live as long as their container, while reference types are kept alive by roots such as local
variables, fields, array elements, closure captures, and async state machines. Understanding lifetime lets
you predict when memory is reclaimed and when you need explicit cleanup.`]})}),`
`,e.jsx(r,{children:"What problem it solves"}),`
`,e.jsx(i,{children:e.jsx(s.p,{children:`In languages with manual memory management it is easy to free an object too early or forget to free it at
all. ShardScript avoids both problems with automatic reference counting and deterministic disposal, but
those mechanisms only behave predictably when you know what counts as a live reference. Misunderstanding
lifetime leads to surprises such as holding memory longer than intended, leaking objects through static
fields, or letting native handles outlive the managed wrappers that own them.`})}),`
`,e.jsx(r,{children:"How it works"}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Value types."})," ",e.jsx(n,{children:"int"}),", ",e.jsx(n,{children:"double"}),","," ",`
`,e.jsx(n,{children:"bool"}),", ",e.jsx(n,{children:"char"}),", ",e.jsx(n,{children:"byte"}),","," ",`
`,e.jsx(n,{children:"nint"}),", and user-defined ",e.jsx(n,{children:"struct"}),` values are stored inline
inside their owner. A local value type lives until the enclosing method returns; a value-type field lives as
long as the object that contains it; a value-type array element lives as long as the array. Assignment copies
the whole value, so there is only one lifetime to reason about.`]})}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Reference types."}),` Classes, arrays, strings, and delegates are allocated on the GC heap.
A variable of reference type does not contain the object; it contains a reference to it. Assigning the
variable to another variable copies the reference, not the object, so two variables can keep the same object
alive. The object is collected only when every reference to it disappears.`]})}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Roots."}),` An object stays alive while a chain of references reaches it from a root. The main
roots in ShardScript are:`]})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Local variables and temporaries"}),` — held on the evaluation
stack for the duration of the method, constructor, property accessor, or lambda body.`]})}),e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Static fields"}),` — stored in the garbage collector and released
only at process shutdown.`]})}),e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Instance fields and array elements"}),` — kept alive by the
object or array that contains them.`]})}),e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Closure captures"}),` — variables captured by a lambda or
delegate are moved into a hidden object that the delegate keeps alive.`]})}),e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Async state machines"})," — a suspended ",e.jsx(n,{children:"async"})," ",`
method keeps its frame, locals, and active resource defers alive until it completes, faults, or is cancelled.`]})})]}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Reference counting."}),` The runtime increments an object's counter whenever it is stored in a
field, array element, local variable, or argument slot, and decrements it when that storage is overwritten
or released. When the counter reaches zero the object is terminated immediately. Cycles are reclaimed during
termination because the cascade of decrements detaches the whole graph from every root.`]})}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Deterministic cleanup."}),` The garbage collector reclaims managed memory, but it does not invoke
script-level finalizers and it knows nothing about OS handles, sockets, or third-party contexts. For those
resources a type implements `,e.jsx(n,{children:"IDisposable"}),` and is used with the resource-defer form
`,e.jsx(n,{children:"defer name: Type = expression;"}),`. Disposal runs when the enclosing scope exits, even
if an exception is thrown or the method returns early.`]})}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Native handles."})," A managed object can store an opaque native pointer in an"," ",`
`,e.jsx(n,{children:"nint"}),` field. The GC tracks the wrapper object, not the pointer, so the native resource
must be released by the wrapper's `,e.jsx(n,{children:"Dispose()"})," method or by explicit native cleanup."]})}),`
`,e.jsx(r,{children:"Key ideas"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Containers own values."}),` A value type's lifetime is bounded
by the local, field, or array that holds it.`]})}),e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"References share objects."}),` Assigning a reference-type
variable creates another path to the same heap object; mutations are visible through every reference.`]})}),e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Roots keep objects alive."}),` If any root can reach an object,
the object is not collected.`]})}),e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Static fields are long-lived roots."}),` Objects stored in
static fields survive until the runtime shuts down; clear static fields when they are no longer needed.`]})}),e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Closures and async frames are hidden roots."}),` A captured
variable or a suspended async method can keep an object alive longer than its lexical scope suggests.`]})}),e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Dispose is for unmanaged resources."})," Use"," ",`
`,e.jsx(n,{children:"IDisposable"})," and ",e.jsx(n,{children:"defer"}),` when an object owns something the
GC cannot release.`]})}),e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Native pointers do not keep themselves alive."}),` A wrapper
object must be kept alive explicitly when its native handle is used across an async boundary.`]})})]}),`
`,e.jsx(r,{children:"When to use / When not to use"}),`
`,e.jsx(c,{headers:["Use","Avoid"],rows:[[e.jsx(e.Fragment,{children:"Rely on automatic collection for ordinary managed objects, arrays, and strings."}),e.jsx(e.Fragment,{children:"Do not rely on collection for deterministic release of file handles, sockets, or native memory."})],[e.jsxs(e.Fragment,{children:["Use ",e.jsx(n,{children:"defer"})," with ",e.jsx(n,{children:"IDisposable"})," for resources that need immediate cleanup."]}),e.jsxs(e.Fragment,{children:["Do not implement ",e.jsx(n,{children:"IDisposable"})," on types that only hold other managed objects with no unmanaged resources."]})],[e.jsx(e.Fragment,{children:"Use static fields for long-lived shared state, such as caches or service singletons."}),e.jsx(e.Fragment,{children:"Do not store temporary objects in static fields; they will leak until shutdown."})],[e.jsx(e.Fragment,{children:"Use closures and async methods freely; the runtime keeps captured objects alive automatically."}),e.jsx(e.Fragment,{children:"Do not capture large objects in a long-lived delegate or async continuation if they are no longer needed."})]]}),`
`,e.jsx(r,{children:"Examples"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Value types are independent copies."})}),`
`,e.jsx(l,{code:`using stdio;

namespace demo;

public struct Point
{
  public X: int;
  public Y: int;
}

public static func Main() -> void
{
  a: Point = new Point();
  a.X = 1;

  b: Point = a; // Copies the whole value.
  b.X = 2;

  println(a.X); // 1
  println(b.X); // 2
}`,language:"csharp",filename:"lifetime_value_types.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Reference types share identity."})}),`
`,e.jsx(l,{code:`using stdio;

namespace demo;

public class Counter
{
  public Value: int;
}

public static func Main() -> void
{
  c: Counter = new Counter();
  c.Value = 1;

  d: Counter = c; // Copies the reference, not the object.
  d.Value = 2;

  println(c.Value); // 2
  println(d.Value); // 2
}`,language:"csharp",filename:"lifetime_reference_types.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Static fields extend lifetime to shutdown."})}),`
`,e.jsx(l,{code:`using stdio;

namespace demo;

public class Buffer
{
  public Data: int[];
}

public static class Globals
{
  public static Shared: Buffer;
}

public static func Main() -> void
{
  local: Buffer = new Buffer();
  local.Data = new int[4];

  Globals.Shared = new Buffer();
  Globals.Shared.Data = new int[8];

  // 'local' is collected when Main returns.
  // 'Globals.Shared' remains alive until the runtime terminates.
}`,language:"csharp",filename:"lifetime_static_fields.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Closure capture keeps variables alive."})}),`
`,e.jsx(l,{code:`using stdio;

namespace demo;

public class Logger
{
  public Prefix: string;
}

public static func Main() -> void
{
  logger: Logger = new Logger();
  logger.Prefix = "app";

  // 'logger' is captured by the delegate, so it stays alive
  // even after Main would otherwise release the local variable.
  action: delegate void() = lambda () -> void
  {
      println(logger.Prefix + ": action");
  };

  action();
}`,language:"csharp",filename:"lifetime_closure_capture.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Async methods keep frames alive across suspension."})}),`
`,e.jsx(l,{code:`using stdio;
using async;

namespace demo;

public class Session
{
  public Id: int;
}

public class Program
{
  public static async func WorkAsync() -> Task
  {
      session: Session = new Session();
      session.Id = 42;

      println("before await: " + session.Id);
      await Task.Delay(10);
      println("after await: " + session.Id);

      // 'session' is released when the async method completes.
  }

  public static func Main() -> void
  {
      Task.Wait(WorkAsync());
  }
}`,language:"csharp",filename:"lifetime_async_frame.shard"}),`
`,e.jsx(i,{children:e.jsxs("strong",{children:["Deterministic disposal with ",e.jsx(n,{children:"IDisposable"}),"."]})}),`
`,e.jsx(l,{code:`using stdio;

namespace demo;

public class Resource : IDisposable
{
  public func Dispose() -> void
  {
      println("resource released");
  }
}

public static func Main() -> void
{
  defer r: Resource = new Resource();
  println("using resource");

  // Dispose runs here before Main returns.
}`,language:"csharp",filename:"lifetime_dispose.shard"}),`
`,e.jsx(r,{children:"Related articles"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx(n,{children:"syntax/resource-management/garbage-collection"}),` — the reference-counting collector
that implements automatic object lifetime.`]})}),e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx(n,{children:"common-language-features/defer-and-idisposable"})," — the ",e.jsx(n,{children:"defer"})," ",`
statement and `,e.jsx(n,{children:"IDisposable"})," pattern for deterministic cleanup."]})}),e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx(n,{children:"language-overview/type-system"})," — value types, reference types, and how they are stored."]})}),e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx(n,{children:"library-building/native-handles-and-object-lifetime"}),` — pinning managed wrappers and
releasing native handles across async boundaries.`]})}),e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx(n,{children:"library-building/garbage-collection-rules"}),` — the native-library callback lifetime
contract.`]})})]})]})}function p(a={}){const{wrapper:s}=a.components||{};return s?e.jsx(s,{...a,children:e.jsx(d,{...a})}):d(a)}function o(a,s){throw new Error("Expected component `"+a+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
