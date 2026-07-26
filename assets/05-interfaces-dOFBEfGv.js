import{j as e}from"./index-CoWj0v4y.js";function h(a){const n={p:"p",...a.components},{Bullet:c,Callout:d,CodeBlock:r,DocsTable:o,H2:s,InlineCode:i,Prose:t}=n;return c||l("Bullet"),d||l("Callout"),r||l("CodeBlock"),o||l("DocsTable"),s||l("H2"),i||l("InlineCode"),t||l("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(s,{children:"Summary"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:["An ",e.jsx(i,{children:"interface"}),` in ShardScript declares a named contract of methods and
properties that a class or struct must provide. Interfaces enable polymorphic programming:
code can be written against the abstraction rather than a concrete type, and the virtual
machine resolves the right implementation at runtime through `,e.jsx(i,{children:"CALLINTERFACE"}),"."]})}),`
`,e.jsx(s,{children:"Syntax"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:["Declare an interface with the ",e.jsx(i,{children:"interface"}),` keyword, then implement it by
listing it after the class base clause.`]})}),`
`,e.jsx(r,{code:`// Interface declaration
public interface IName
{
  // Method contract — no body required.
  func MethodName(parameter: Type) -> ReturnType;

  // Property contract — accessor requirements only.
  PropertyName: Type { get; }
  ReadWriteProperty: Type { get; set; }
}

// Interface extension
public interface IDerived : IBase
{
  func Extra() -> void;
}

// Implementation
public class Example : IName, IDisposable
{
  public func MethodName(parameter: Type) -> ReturnType
  {
      // implementation
  }

  public PropertyName: Type
  {
      get { return value; }
  }

  public ReadWriteProperty: Type
  {
      get { return value; }
      set { value = value; }
  }

  public func Dispose() -> void
  {
      // cleanup
  }
}`,language:"csharp",filename:"interface_syntax.shard"}),`
`,e.jsx(s,{children:"Parameters / Arguments"}),`
`,e.jsx(o,{headers:["Construct","Required","Description"],rows:[[e.jsx(i,{children:"interface name"}),"Yes","The declared contract name, conventionally prefixed with I."],[e.jsx(i,{children:"base interfaces"}),"No","One or more interfaces that this interface extends, separated by commas."],[e.jsx(i,{children:"method signatures"}),"No*","Methods without bodies define required behavior. *At least one member is typical."],[e.jsx(i,{children:"property signatures"}),"No","Properties declare required getters and/or setters."],[e.jsx(i,{children:"class : interfaces"}),"No","A class or struct lists every interface it implements after a colon."]]}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:["Interface members are matched by ",e.jsx("strong",{children:"name and signature"}),`. A class member is an
implementation candidate when its name, parameter types, and return type match the interface
member exactly. Access modifiers on the implementing member must make it callable through the
interface, which usually means `,e.jsx(i,{children:"public"}),"."]})}),`
`,e.jsx(s,{children:"Returns"}),`
`,e.jsx(o,{headers:["Expression","Result"],rows:[[e.jsx(i,{children:"value is Type"}),e.jsxs(e.Fragment,{children:[e.jsx(i,{children:"bool"})," — ",e.jsx(i,{children:"true"})," if the runtime type of ",e.jsx(i,{children:"value"})," is assignable to ",e.jsx(i,{children:"Type"}),"; otherwise ",e.jsx(i,{children:"false"}),"."]})],[e.jsx(i,{children:"value as Type"}),e.jsxs(e.Fragment,{children:[e.jsx(i,{children:"Type"})," on success, or ",e.jsx(i,{children:"null"})," if the conversion is not valid. For primitives this performs a numeric cast."]})],[e.jsx(i,{children:"interfaceMember()"}),"The return type declared by the interface member, dispatched to the concrete implementation at runtime."]]}),`
`,e.jsx(s,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(c,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Missing implementation"}),` — A class claims to implement
an interface but does not provide a matching public member for every method and property.`]})}),e.jsx(c,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Signature mismatch"}),` — The implementing member differs
in parameter count, parameter types, or return type from the interface member.`]})}),e.jsx(c,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Invalid base type"}),` — Only interfaces may appear in the
base list of an interface declaration. Classes and structs are not valid base interfaces.`]})}),e.jsx(c,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Fields in interfaces"}),` — Interfaces cannot contain
fields; they may only declare methods, properties, indexers, and events.`]})}),e.jsx(c,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Null dispatch"}),` — Calling an interface method through a
`,e.jsx(i,{children:"null"})," reference throws at runtime."]})}),e.jsx(c,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Invalid cast result"})," — Using a failed ",e.jsx(i,{children:"as"})," ",`
result without a `,e.jsx(i,{children:"null"}),` check throws when the member is invoked on
`,e.jsx(i,{children:"null"}),"."]})})]}),`
`,e.jsx(s,{children:"Remarks"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Implicit interface implementation."}),` ShardScript resolves interface members by
matching name and signature. If a class declares `,e.jsx(i,{children:"public func Area() -> double"})," ",`
and implements `,e.jsx(i,{children:"IShape"})," with the same ",e.jsx(i,{children:"Area()"})," ",`
signature, the compiler records the mapping automatically. There is currently no syntax for
explicit interface implementation (such as `,e.jsx(i,{children:"func IShape.Area()"}),`); all
implementations are name-based.`]})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Interface inheritance."}),` An interface can extend other interfaces, and a class that
implements the derived interface must satisfy every member from the entire inheritance chain.
Interface extension is linearized during binding, so diamond-shaped interface hierarchies are
resolved by member name; if two unrelated base interfaces declare the same member name with
different signatures, the implementing class must provide a member that matches each interface
independently, which is not possible without explicit implementation syntax.`]})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Virtual dispatch."})," Calls through an interface are emitted as"," ",`
`,e.jsx(i,{children:"CALLINTERFACE"}),", not a direct call. The VM pops the ",e.jsx(i,{children:"this"})," ",`
reference, looks up the concrete type, finds the implementation via the type's interface method
map, and invokes it. This is how two different classes implementing the same interface produce
different behavior from the same call site.`]})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Type tests and safe casts."})," The ",e.jsx(i,{children:"is"})," operator compiles to"," ",`
`,e.jsx(i,{children:"ISINSTANCE"}),`, which checks assignability using the semantic model's type
table. The `,e.jsx(i,{children:"as"})," operator compiles to ",e.jsx(i,{children:"CASTINTERFACE"})," ",`
for reference/interface casts; on failure it pushes `,e.jsx(i,{children:"null"}),` instead of
throwing. For primitive conversions (for example `,e.jsx(i,{children:"7 as double"}),"),"," ",`
`,e.jsx(i,{children:"as"})," performs a value cast rather than a reference cast."]})}),`
`,e.jsx(d,{tone:"blue",children:e.jsxs(n.p,{children:["Prefer ",e.jsx(i,{children:"is"})," followed by ",e.jsx(i,{children:"as"}),` (or a guarded cast and
null check) over direct member access on an `,e.jsx(i,{children:"as"}),` result. This mirrors the
defensive pattern used for host callbacks and library-returned references.`]})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Abstract classes."})," The parser and semantic model reserve space for the"," ",`
`,e.jsx(i,{children:"abstract"}),` modifier, but it is not currently enabled. You cannot mark a
class or method `,e.jsx(i,{children:"abstract"}),`; use an interface to express a pure contract
and a concrete base class with stub implementations as a temporary substitute.`]})}),`
`,e.jsx(d,{tone:"amber",title:"Abstract classes not yet implemented",children:e.jsx(n.p,{children:`Abstract classes and abstract methods are planned but not available in the current compiler. The
workaround is to declare a base class with default method bodies and override the behavior in
derived classes, or to use an interface when no shared implementation is needed.`})}),`
`,e.jsx(s,{children:"Examples"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Basic interface declaration and implementation."})}),`
`,e.jsx(r,{code:`using stdio;

namespace demo;

// A simple geometric contract.
public interface IShape
{
  func Area() -> double;
  Name: string { get; }
}

public class Circle : IShape
{
  private radius: double;
  private label: string;

  public init(radius: double, name: string)
  {
      this.radius = radius;
      this.label = name;
  }

  public func Area() -> double
  {
      return 3.14159 * this.radius * this.radius;
  }

  public Name: string
  {
      get { return this.label; }
  }
}

public static func Main() -> void
{
  c: Circle = new Circle(5.0, "unit circle");
  println(c.Name + " area: " + c.Area());   // unit circle area: 78.53975
}`,language:"csharp",filename:"interface_basic.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Polymorphic dispatch through an interface."})}),`
`,e.jsx(r,{code:`using stdio;

namespace demo;

public interface IGreeter
{
  func Greet() -> string;
}

public class Human : IGreeter
{
  private name: string;

  public init(name: string)
  {
      this.name = name;
  }

  public func Greet() -> string
  {
      return "Hello, I'm " + this.name;
  }
}

public class Robot : IGreeter
{
  private id: int;

  public init(id: int)
  {
      this.id = id;
  }

  public func Greet() -> string
  {
      return "Beep-boop #" + this.id;
  }
}

// Accept any IGreeter; the VM resolves the right implementation.
public static func Announce(greeter: IGreeter) -> void
{
  println(greeter.Greet());
}

public static func Main() -> void
{
  alice: IGreeter = new Human("Alice");
  r2: IGreeter = new Robot(42);

  Announce(alice);   // Hello, I'm Alice
  Announce(r2);      // Beep-boop #42
}`,language:"csharp",filename:"interface_dispatch.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Implementing multiple interfaces."})}),`
`,e.jsx(r,{code:`using stdio;

namespace demo;

public interface INameable
{
  Name: string { get; }
}

public interface ICountable
{
  func Count() -> int;
}

public class Tag : INameable, ICountable
{
  private label: string;
  private clicks: int;

  public init(label: string)
  {
      this.label = label;
      this.clicks = 0;
  }

  public func Click() -> void
  {
      this.clicks = this.clicks + 1;
  }

  public Name: string
  {
      get { return this.label; }
  }

  public func Count() -> int
  {
      return this.clicks;
  }
}

public static func PrintName(item: INameable) -> void
{
  println(item.Name);
}

public static func PrintCount(item: ICountable) -> void
{
  println(item.Count());
}

public static func Main() -> void
{
  tag: Tag = new Tag("urgent");
  tag.Click();
  tag.Click();

  PrintName(tag);    // urgent
  PrintCount(tag);   // 2
}`,language:"csharp",filename:"interface_multiple.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Interface extension."})}),`
`,e.jsx(r,{code:`using stdio;

namespace demo;

public interface IReadable
{
  func Read() -> string;
}

public interface IReadWrite : IReadable
{
  func Write(data: string) -> void;
}

public class Buffer : IReadWrite
{
  private data: string;

  public init()
  {
      this.data = "";
  }

  public func Read() -> string
  {
      return this.data;
  }

  public func Write(data: string) -> void
  {
      this.data = data;
  }
}

public static func Main() -> void
{
  buffer: Buffer = new Buffer();
  rw: IReadWrite = buffer;

  rw.Write("hello");
  println(rw.Read());   // hello

  // Upcast to the base interface.
  r: IReadable = rw;
  println(r.Read());    // hello
}`,language:"csharp",filename:"interface_extension.shard"}),`
`,e.jsx(t,{children:e.jsxs("strong",{children:["Using ",e.jsx(i,{children:"is"})," and ",e.jsx(i,{children:"as"}),"."]})}),`
`,e.jsx(r,{code:`using stdio;

namespace demo;

public interface IShape
{
  func Area() -> double;
}

public class Circle : IShape
{
  public Radius: double;

  public init(radius: double)
  {
      this.Radius = radius;
  }

  public func Area() -> double
  {
      return 3.14159 * this.Radius * this.Radius;
  }
}

public class Square : IShape
{
  public Side: double;

  public init(side: double)
  {
      this.Side = side;
  }

  public func Area() -> double
  {
      return this.Side * this.Side;
  }
}

public static func Describe(shape: IShape) -> void
{
  if (shape is Circle)
  {
      c: Circle = shape as Circle;
      println("circle radius " + c.Radius + ", area " + c.Area());
  }
  else if (shape is Square)
  {
      s: Square = shape as Square;
      println("square side " + s.Side + ", area " + s.Area());
  }
  else
  {
      println("unknown shape, area " + shape.Area());
  }
}

public static func TryBox(shape: IShape) -> void
{
  // Safe cast returns null when the conversion is invalid.
  box: Square = shape as Square;

  if (box != null)
  {
      println("cast succeeded: side " + box.Side);
  }
  else
  {
      println("cast failed");
  }
}

public static func Main() -> void
{
  Describe(new Circle(2.0));   // circle radius 2, area 12.56636
  Describe(new Square(3.0));   // square side 3, area 9

  TryBox(new Circle(1.0));     // cast failed
  TryBox(new Square(4.0));     // cast succeeded: side 4

  // Primitive cast with 'as'.
  whole: int = 9.5 as int;
  println(whole);              // 9
}`,language:"csharp",filename:"interface_is_as.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Common mistake: non-public implementation."})}),`
`,e.jsx(r,{code:`using stdio;

namespace demo;

public interface ILogger
{
  func Log(message: string) -> void;
}

public class QuietLogger : ILogger
{
  // ERROR: this must be public to satisfy ILogger.
  // private func Log(message: string) -> void
  // {
  //     println(message);
  // }

  public func Log(message: string) -> void
  {
      println(message);
  }
}

public static func Main() -> void
{
  logger: ILogger = new QuietLogger();
  logger.Log("visible");   // visible
}`,language:"csharp",filename:"interface_accessibility.shard"}),`
`,e.jsx(t,{children:e.jsxs("strong",{children:["Common mistake: assigning without a null check after ",e.jsx(i,{children:"as"}),"."]})}),`
`,e.jsx(r,{code:`using stdio;

namespace demo;

public interface IShape
{
  func Area() -> double;
}

public class Circle : IShape
{
  public Radius: double;

  public init(radius: double)
  {
      this.Radius = radius;
  }

  public func Area() -> double
  {
      return 3.14159 * this.Radius * this.Radius;
  }
}

public static func Main() -> void
{
  shape: IShape = new Circle(1.0);

  // Safe, because the guard prevents null dereference.
  if (shape is Circle)
  {
      c: Circle = shape as Circle;
      println(c.Radius);
  }

  // UNSAFE: this would compile but throw at runtime if shape were not a Circle.
  // bad: Circle = shape as Circle;
  // println(bad.Radius);
}`,language:"csharp",filename:"interface_null_check.shard"}),`
`,e.jsx(t,{children:e.jsxs("strong",{children:["Standard-library interface example: ",e.jsx(i,{children:"IDisposable"}),"."]})}),`
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

public static func Main() -> void
{
  // defer calls Dispose when the scope exits.
  defer handle: FileHandle = new FileHandle("data.txt");
  println("working...");

  // Output:
  //   opened data.txt
  //   working...
  //   closed data.txt
}`,language:"csharp",filename:"interface_disposable.shard"})]})}function p(a={}){const{wrapper:n}=a.components||{};return n?e.jsx(n,{...a,children:e.jsx(h,{...a})}):h(a)}function l(a,n){throw new Error("Expected component `"+a+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
