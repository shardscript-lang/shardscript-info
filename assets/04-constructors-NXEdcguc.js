import{j as e}from"./index-BqaCWg-u.js";function h(s){const n={p:"p",...s.components},{Bullet:c,Callout:l,CodeBlock:r,DocsTable:d,H2:a,InlineCode:t,Prose:i}=n;return c||o("Bullet"),l||o("Callout"),r||o("CodeBlock"),d||o("DocsTable"),a||o("H2"),t||o("InlineCode"),i||o("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(a,{children:"Summary"}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:["A ",e.jsx("strong",{children:"constructor"})," in ShardScript is an instance method named ",e.jsx(t,{children:"init"})," ",`
that runs once for every newly created object. The `,e.jsx(t,{children:"new"}),` expression allocates
the instance on the garbage-collected heap, zero-initializes every field slot, and then invokes the
constructor overload whose parameters match the supplied arguments.`]})}),`
`,e.jsx(a,{children:"Syntax"}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:["Constructors are declared without a return type. The canonical name is ",e.jsx(t,{children:"init"}),`;
a class-named constructor is still accepted by the parser for compatibility, but new code should use`," ",`
`,e.jsx(t,{children:"init"}),"."]})}),`
`,e.jsx(r,{code:`// Constructor declaration.
[access-modifier] init(parameter: Type, ...)
{
  // Initialize fields, validate arguments, acquire resources, etc.
}

// Object creation.
new TypeName(argument, ...)
new TypeName<TypeArgument>(argument, ...)`,language:"csharp",filename:"constructor_syntax.shard"}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:["A constructor is invoked by writing ",e.jsx(t,{children:"new"}),` followed by the type name and an
argument list. The resulting reference can be assigned to a variable, passed as an argument, or used
as a receiver immediately:`]})}),`
`,e.jsx(r,{code:`// Explicitly typed binding.
p: Point = new Point(3, 4);

// Used directly as a receiver.
area: double = new Rectangle(5.0, 4.0).Area;`,language:"csharp",filename:"constructor_usage.shard"}),`
`,e.jsx(a,{children:"Parameters / Arguments"}),`
`,e.jsx(d,{headers:["Form","Parameter / Argument Rules"],rows:[[e.jsxs(e.Fragment,{children:[e.jsx(t,{children:"init"})," parameters"]}),e.jsxs(e.Fragment,{children:["Typed, comma-separated, exactly like a normal method parameter list. The implicit ",e.jsx(t,{children:"this"})," reference occupies evaluation-stack slot 0, so the first declared parameter is stored in slot 1."]})],[e.jsxs(e.Fragment,{children:[e.jsx(t,{children:"new"})," arguments"]}),e.jsx(e.Fragment,{children:"Must match one declared constructor overload in both count and types. The compiler resolves the overload at compile time."})],[e.jsx(e.Fragment,{children:e.jsx(t,{children:"new Type()"})}),e.jsx(e.Fragment,{children:"Calls the parameterless constructor. If the class declares no constructors, the compiler generates a public parameterless constructor automatically."})],[e.jsx(e.Fragment,{children:e.jsx(t,{children:"new Type<T>()"})}),e.jsx(e.Fragment,{children:"For generic types, supply the type argument list between the type name and the argument list."})]]}),`
`,e.jsx(a,{children:"Returns"}),`
`,e.jsx(d,{headers:["Construct","Return"],rows:[[e.jsxs(e.Fragment,{children:[e.jsx(t,{children:"init"})," body"]}),e.jsxs(e.Fragment,{children:["No return type. The method implicitly returns the fully initialized instance to the ",e.jsx(t,{children:"new"})," expression."]})],[e.jsx(e.Fragment,{children:e.jsx(t,{children:"new Type(...)"})}),e.jsx(e.Fragment,{children:"A reference to the newly allocated and initialized instance."})]]}),`
`,e.jsx(a,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(c,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"No matching constructor"})," —"," ",`
`,e.jsx(t,{children:"new Type(args)"}),` fails at compile time if no overload accepts the supplied
argument count and types.`]})}),e.jsx(c,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Inaccessible constructor"})," — A"," ",`
`,e.jsx(t,{children:"private"}),` constructor can only be called from code inside the declaring type.
Calling it from another type produces an accessibility error.`]})}),e.jsx(c,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Static constructor"}),` — Constructors cannot be declared
with `,e.jsx(t,{children:"static"}),". Use a static field or static method for type-level initialization."]})}),e.jsx(c,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Return type on constructor"})," — Writing"," ",`
`,e.jsx(t,{children:"init(...) -> Type"})," is invalid syntax; constructors never declare a return type."]})}),e.jsx(c,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Read-only auto-property assigned outside init"}),` — An
auto-property with only a getter can be assigned inside `,e.jsx(t,{children:"init"}),`, but assigning
to it from an ordinary method produces a compile error.`]})}),e.jsx(c,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Argument validation at runtime"}),` — A constructor body is
ordinary ShardScript code; throwing from `,e.jsx(t,{children:"init"}),` leaves the object partially
initialized and propagates the exception to the `,e.jsx(t,{children:"new"})," call site."]})})]}),`
`,e.jsx(a,{children:"Remarks"}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Default constructor."}),` If a class declares no constructor at all, the compiler
synthesizes a public parameterless `,e.jsx(t,{children:"init()"}),` with an empty body. The moment you
declare any constructor, the implicit default constructor disappears; if you still need a
parameterless form, declare it explicitly.`]})}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Overload resolution."})," Multiple ",e.jsx(t,{children:"init"}),` overloads are allowed.
Resolution is performed at compile time using the argument count and types. There is no implicit
fallback or coercion beyond the normal assignability rules, so ambiguous calls are reported as
compile-time errors.`]})}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Object allocation order."})," The bytecode for ",e.jsx(t,{children:"new"})," emits the"," ",`
`,e.jsx(t,{children:"NEWOBJECT"}),` opcode. The VM first allocates a GC object whose field slots are
zeroed (reference fields are `,e.jsx(t,{children:"null"}),", numeric fields are ",e.jsx(t,{children:"0"}),`
), then pushes the constructor arguments and calls the matching `,e.jsx(t,{children:"init"}),`. Inside
the constructor, `,e.jsx(t,{children:"this"}),` already refers to that object, so fields can be
populated with `,e.jsx(t,{children:"STOREFIELD"})," instructions. After ",e.jsx(t,{children:"init"})," ",`
returns, the initialized reference is left on the caller's evaluation stack.`]})}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Read-only auto-properties in init."}),` An auto-property declared with only a getter has no
setter method, but the compiler allows a direct write to its compiler-generated backing field inside
the constructor. Once construction finishes, the property becomes read-only for the lifetime of the
object.`]})}),`
`,e.jsx(l,{tone:"amber",title:"Field initializers are not yet emitted",children:e.jsxs(n.p,{children:["Field declarations may include an initializer expression, e.g."," ",`
`,e.jsx(t,{children:"public Count: int = 0;"}),`. The parser and semantic binder recognize the syntax
and type-check the expression, but the current emitter does not inject that expression into
constructors or static storage. Until this is implemented, initialize fields explicitly inside`," ",`
`,e.jsx(t,{children:"init"}),` or in ordinary assignment statements. Relying on a field initializer
currently leaves the field at its zero-initialized default at runtime.`]})}),`
`,e.jsx(l,{tone:"amber",title:"Constructor chaining is not implemented",children:e.jsxs(n.p,{children:["ShardScript does not support ",e.jsx(t,{children:"init(...) : this(...)"})," or"," ",`
`,e.jsx(t,{children:"init(...) : base(...)"}),` initializer syntax. To share setup logic, extract a
private method and call it from each constructor overload.`]})}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Static constructors."}),` The language has no special static constructor construct. Static
fields are initialized by the runtime when first accessed, and static methods can perform any
type-level setup. Declaring `,e.jsx(t,{children:"static init(...)"})," is rejected by the compiler."]})}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsxs("strong",{children:["Avoid leaking ",e.jsx(t,{children:"this"})," during construction."]})," Because"," ",`
`,e.jsx(t,{children:"this"})," is available inside ",e.jsx(t,{children:"init"}),`, it is possible to pass
the partially constructed object to another method or store it in a static collection before all
fields are set. Doing so is a common source of bugs and should be avoided.`]})}),`
`,e.jsx(a,{children:"Examples"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Basic constructor and object creation."})}),`
`,e.jsx(r,{code:`using stdio;

namespace demo;

public class Counter
{
  public Name: string;
  public Count: int;

  public init(name: string)
  {
      this.Name = name;
      this.Count = 0;
  }

  public func Step() -> void
  {
      this.Count = this.Count + 1;
      println(this.Name + ": " + this.Count);
  }
}

public static func Main() -> void
{
  c: Counter = new Counter("clicks");
  c.Step();   // clicks: 1
  c.Step();   // clicks: 2
}`,language:"csharp",filename:"constructor_basic.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Default constructor when none is declared."})}),`
`,e.jsx(r,{code:`using stdio;

namespace demo;

public class Buffer
{
  // No init is declared, so the compiler provides public init().
  public Data: string;
}

public static func Main() -> void
{
  b: Buffer = new Buffer();
  b.Data = "hello";
  println(b.Data);   // hello
}`,language:"csharp",filename:"constructor_default.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Multiple constructor overloads."})}),`
`,e.jsx(r,{code:`using stdio;

namespace demo;

public class Point
{
  public X: int;
  public Y: int;
  public Label: string;

  // Parameterless overload: useful when defaults are known.
  public init()
  {
      this.X = 0;
      this.Y = 0;
      this.Label = "origin";
  }

  // Coordinate-only overload.
  public init(x: int, y: int)
  {
      this.X = x;
      this.Y = y;
      this.Label = "point";
  }

  // Fully specified overload.
  public init(x: int, y: int, label: string)
  {
      this.X = x;
      this.Y = y;
      this.Label = label;
  }
}

public static func Main() -> void
{
  a: Point = new Point();
  b: Point = new Point(3, 4);
  c: Point = new Point(3, 4, "target");

  println(a.Label + " (" + a.X + ", " + a.Y + ")");   // origin (0, 0)
  println(b.Label + " (" + b.X + ", " + b.Y + ")");   // point (3, 4)
  println(c.Label + " (" + c.X + ", " + c.Y + ")");   // target (3, 4)
}`,language:"csharp",filename:"constructor_overloads.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Private constructor used by a factory method."})}),`
`,e.jsx(r,{code:`using stdio;

namespace demo;

public class Session
{
  public Id: int;

  // External code cannot call this directly.
  private init(id: int)
  {
      this.Id = id;
  }

  public static func Create(id: int) -> Session
  {
      // A private constructor is accessible inside the declaring type.
      return new Session(id);
  }
}

public static func Main() -> void
{
  s: Session = Session.Create(42);
  println(s.Id);   // 42

  // Session s2 = new Session(7);   // ERROR: constructor is private
}`,language:"csharp",filename:"constructor_private.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Initializing a read-only auto-property in init."})}),`
`,e.jsx(r,{code:`using stdio;

namespace demo;

public class Invoice
{
  // Read-only outside the constructor.
  public Number: string { get; }

  public init(number: string)
  {
      this.Number = number;
  }
}

public static func Main() -> void
{
  inv: Invoice = new Invoice("INV-2025-001");
  println(inv.Number);   // INV-2025-001

  // inv.Number = "other";   // ERROR: property has no setter
}`,language:"csharp",filename:"constructor_readonly_property.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Shared initialization helper instead of constructor chaining."})}),`
`,e.jsx(r,{code:`using stdio;

namespace demo;

public class Rectangle
{
  public Width: double;
  public Height: double;
  public Area: double;

  // Common setup factored into a private method.
  private func Initialize(w: double, h: double) -> void
  {
      this.Width = w;
      this.Height = h;
      this.Area = w * h;
  }

  public init(width: double, height: double)
  {
      this.Initialize(width, height);
  }

  public init(size: double)
  {
      // Reuse the same helper to create a square.
      this.Initialize(size, size);
  }
}

public static func Main() -> void
{
  r1: Rectangle = new Rectangle(5.0, 4.0);
  r2: Rectangle = new Rectangle(3.0);

  println(r1.Area);   // 20.0
  println(r2.Area);   // 9.0
}`,language:"csharp",filename:"constructor_helper.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Common mistakes."})}),`
`,e.jsx(r,{code:`using stdio;

namespace demo;

public class Widget
{
  public Id: int;

  public init(id: int)
  {
      this.Id = id;
  }
}

public static func Main() -> void
{
  // CORRECT: argument type and count match the constructor.
  w: Widget = new Widget(7);
  println(w.Id);   // 7

  // INCORRECT: these would fail at compile time.
  // Widget a = new Widget();         // ERROR: no parameterless constructor
  // Widget b = new Widget("seven");  // ERROR: type mismatch
}`,language:"csharp",filename:"constructor_mistakes.shard"})]})}function p(s={}){const{wrapper:n}=s.components||{};return n?e.jsx(n,{...s,children:e.jsx(h,{...s})}):h(s)}function o(s,n){throw new Error("Expected component `"+s+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
