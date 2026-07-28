import{j as e}from"./index-Cg_ascQj.js";function h(a){const n={p:"p",...a.components},{Bullet:i,Callout:o,CodeBlock:r,DocsTable:d,H2:c,InlineCode:s,Prose:t}=n;return i||l("Bullet"),o||l("Callout"),r||l("CodeBlock"),d||l("DocsTable"),c||l("H2"),s||l("InlineCode"),t||l("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(c,{children:"Summary"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:["A ",e.jsx("strong",{children:"class"}),` in ShardScript is a reference type that groups fields,
properties, methods, constructors, operators, and indexers under a single named
type. Classes are allocated on the managed heap, support explicit access
modifiers, and can implement one or more interfaces.`]})}),`
`,e.jsx(c,{children:"Syntax"}),`
`,e.jsx(t,{children:e.jsx(n.p,{children:`A class is declared at namespace scope with optional modifiers, an identifier,
optional generic type parameters, optional interface implementations, and a body.`})}),`
`,e.jsx(r,{code:`// Non-generic class.
[access] [static] class ClassName : IInterface
{
  // fields, properties, methods, constructors, operators, indexers
}

// Generic class.
[access] [static] class ClassName<T> : IInterface
{
  // members may use T
}`,language:"csharp",filename:"class_syntax.shard"}),`
`,e.jsx(d,{headers:["Modifier","Applies to","Meaning"],rows:[[e.jsx(s,{children:"public"}),"class, member","Accessible from any code that can see the containing namespace."],[e.jsx(s,{children:"private"}),"member","Accessible only inside the declaring class."],[e.jsx(s,{children:"protected"}),"member","Accessible inside the declaring class and derived types (reserved for future inheritance support)."],[e.jsx(s,{children:"internal"}),"class, member","Accessible only within the same compilation unit or assembly boundary (reserved for multi-module builds)."],[e.jsx(s,{children:"export"}),"class, member","Makes the symbol visible across shard boundaries when used in native/host bindings."],[e.jsx(s,{children:"static"}),"class, member","Declares a class or member that belongs to the type itself rather than to any instance."],[e.jsx(s,{children:"async"}),"method","Marks a method as asynchronously lowerable to a state machine."],[e.jsx(s,{children:"extern"}),"method","Declares a method whose implementation is supplied by the host runtime."]]}),`
`,e.jsx(o,{tone:"amber",title:"Class inheritance is not yet implemented",children:e.jsxs(n.p,{children:["ShardScript classes can only implement ",e.jsx("strong",{children:"interfaces"}),` after the
colon. Extending another class, virtual dispatch, method overriding, and the`," ",`
`,e.jsx(s,{children:"base"}),` keyword are planned but not available in the
current compiler. Use interface-based abstractions and composition until
inheritance lands.`]})}),`
`,e.jsx(o,{tone:"amber",title:"abstract, sealed, and partial are planned",children:e.jsxs(n.p,{children:["The lexer and parser reserve grammar space for ",e.jsx(s,{children:"abstract"}),","," ",`
`,e.jsx(s,{children:"sealed"}),", and ",e.jsx(s,{children:"partial"}),`, but they
are currently commented out of the modifier parser. Writing them today produces
a compile error.`]})}),`
`,e.jsx(c,{children:"Parameters / Arguments"}),`
`,e.jsx(t,{children:e.jsx(n.p,{children:"A class declaration accepts the following grammatical elements:"})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Modifiers"})," — One or more of"," ",`
`,e.jsx(s,{children:"public"}),", ",e.jsx(s,{children:"private"}),","," ",`
`,e.jsx(s,{children:"protected"}),", ",e.jsx(s,{children:"internal"}),","," ",`
`,e.jsx(s,{children:"export"}),", ",e.jsx(s,{children:"static"}),`. The parser
enforces a fixed order: access, then `,e.jsx(s,{children:"static"}),`, then
(when implemented) `,e.jsx(s,{children:"abstract"})," /"," ",`
`,e.jsx(s,{children:"sealed"})," / ",e.jsx(s,{children:"partial"}),"."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Identifier"}),` — The type name.
Must be unique within its namespace and may not collide with imported names.`]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Type parameters"}),` — Optional
generic parameters in angle brackets, e.g. `,e.jsx(s,{children:"Container<T>"}),"."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Base interfaces"}),` — Optional
comma-separated list of interfaces after the colon. Every listed interface
must be fully implemented by the class.`]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Body"}),` — A pair of braces
containing member declarations.`]})})]}),`
`,e.jsx(c,{children:"Returns"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:["A class declaration does not return a value. Evaluating ",e.jsx(s,{children:"new ClassName(...)"})," ",`
returns a reference to a newly allocated instance of the class.`]})}),`
`,e.jsx(c,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Duplicate type name"}),` — Declaring
two classes, structs, interfaces, or enums with the same fully qualified name
in the same scope fails semantic analysis.`]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Base type must be an interface"})," ",`
— Writing `,e.jsx(s,{children:"class B : A"})," where ",e.jsx(s,{children:"A"})," ",`
is a class produces a compile error because class inheritance is not supported.`]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Interface not implemented"}),` — A
class that claims to implement an interface must provide every method,
property, indexer, and accessor declared by that interface with matching
signatures.`]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Invalid modifier combination"})," ",`
— `,e.jsx(s,{children:"static"}),` cannot be combined with instance members in
the same class; static classes cannot declare instance fields, methods,
properties, or constructors.`]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Instance member in static context"})," ",`
— Accessing an instance field or method through the type name, or accessing
`,e.jsx(s,{children:"this"})," inside a static method, produces a compile error."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Out-of-order modifiers"})," —"," ",`
Modifiers must appear in the order expected by the parser; reordering them
reports a modifier-out-of-order error.`]})})]}),`
`,e.jsx(c,{children:"Remarks"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Reference semantics."}),` Classes are reference types. Assigning a
class variable to another copies the reference, not the object. Mutations made
through either reference are visible through the other. Value semantics are
provided by `,e.jsx(s,{children:"struct"}),", which is documented separately."]})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Static classes."})," A class marked ",e.jsx(s,{children:"static"})," ",`
cannot be instantiated and cannot contain instance members. It is useful for
utility methods and constants, such as the standard `,e.jsx(s,{children:"Math"})," ",`
class. The compiler emits a static-class flag and resolves calls with`," ",`
`,e.jsx(s,{children:"CALLSTATICMETHODSYMBOL"}),"."]})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsxs("strong",{children:["The ",e.jsx(s,{children:"this"})," parameter."]}),` Inside every
instance constructor, method, property accessor, indexer accessor, and operator,
the compiler injects an implicit `,e.jsx(s,{children:"this"}),` parameter whose
type is the enclosing class. It is used to access instance state and to
disambiguate parameters from fields of the same name.`]})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Access modifier resolution."}),` The compiler distinguishes public
and private today. `,e.jsx(s,{children:"protected"})," and"," ",`
`,e.jsx(s,{children:"internal"}),` are accepted by the parser and treated
permissively in the current semantic model; their exact cross-assembly behavior
will tighten once modules and inheritance are fully implemented.`]})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Generic classes."}),` Type parameters can appear in field types,
method signatures, property types, and indexer types. Generic methods may also
introduce their own type parameters, distinct from the class-level parameters.`]})}),`
`,e.jsx(o,{tone:"blue",children:e.jsxs(n.p,{children:["Use explicit ",e.jsx(s,{children:"public"}),` on every class and member you intend
to call from outside its namespace. Unmarked top-level classes are public by
default, but unmarked members are private by default, matching C-family
conventions.`]})}),`
`,e.jsx(c,{children:"Examples"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Basic class with fields, constructor, and method."})}),`
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

  public func Increment() -> void
  {
      this.Count = this.Count + 1;
      println(this.Name + ": " + this.Count);
  }
}

public static func Main() -> void
{
  c: Counter = new Counter("clicks");
  c.Increment();   // clicks: 1
  c.Increment();   // clicks: 2
}`,language:"csharp",filename:"class_basic.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Access modifiers: public and private."})}),`
`,e.jsx(r,{code:`using stdio;

namespace demo;

public class Person
{
  public Name: string;      // accessible from anywhere
  private Age: int;         // accessible only within Person

  public init(name: string, age: int)
  {
      this.Name = name;
      this.Age = age;
  }

  public func Birthday() -> void
  {
      // Private state can be mutated by instance methods of the same class.
      this.Age = this.Age + 1;
  }

  public func Describe() -> string
  {
      return this.Name + " is " + this.Age;
  }
}

public static func Main() -> void
{
  p: Person = new Person("Alice", 30);
  println(p.Name);            // Alice
  println(p.Describe());      // Alice is 30
  p.Birthday();
  println(p.Describe());      // Alice is 31
  // p.Age = 31;              // ERROR: Age is private
}`,language:"csharp",filename:"class_access_modifiers.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Static members and static classes."})}),`
`,e.jsx(r,{code:`using stdio;

namespace demo;

public static class Config
{
  public static AppName: string = "MyApp";
  public static Version: double = 1.0;

  public static func PrintInfo() -> void
  {
      println(Config.AppName + " v" + Config.Version);
  }
}

public class Session
{
  public InstanceId: int;

  public init(id: int)
  {
      this.InstanceId = id;
  }

  public func Describe() -> void
  {
      // Static fields are reached through the type name even from instances.
      println("Instance " + this.InstanceId + " of " + Config.AppName);
  }
}

public static func Main() -> void
{
  println(Config.AppName);    // MyApp
  Config.PrintInfo();         // MyApp v1

  s: Session = new Session(42);
  s.Describe();               // Instance 42 of MyApp
}`,language:"csharp",filename:"class_static.shard"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Implementing an interface."}),` Classes support interface
implementation, not class inheritance.`]})}),`
`,e.jsx(r,{code:`using stdio;

namespace demo;

public interface IShape
{
  func Area() -> double;
}

public class Rectangle : IShape
{
  public Width: double;
  public Height: double;

  public init(w: double, h: double)
  {
      this.Width = w;
      this.Height = h;
  }

  public func Area() -> double
  {
      return this.Width * this.Height;
  }
}

public static func Main() -> void
{
  shape: IShape = new Rectangle(5.0, 4.0);
  println(shape.Area());      // 20
}`,language:"csharp",filename:"class_interface.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Generic class."})}),`
`,e.jsx(r,{code:`using stdio;

namespace demo;

public class Container<T>
{
  public Value: T;

  public func Set(v: T) -> void
  {
      this.Value = v;
  }

  public func Get() -> T
  {
      return this.Value;
  }

  public static func Create<U>(v: U) -> Container<U>
  {
      c: Container<U> = new Container<U>();
      c.Value = v;
      return c;
  }
}

public static func Main() -> void
{
  c: Container<int> = new Container<int>();
  c.Set(42);
  println(c.Get());           // 42

  d: Container<string> = Container<string>.Create<string>("hello");
  println(d.Get());           // hello
}`,language:"csharp",filename:"class_generic.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Common mistakes and edge cases."})}),`
`,e.jsx(r,{code:`using stdio;

namespace demo;

public class Example
{
  public Value: int;

  public init(value: int)
  {
      // 'this' disambiguates the parameter from the field.
      this.Value = value;
  }

  public static func StaticWork() -> void
  {
      // Static methods have no 'this'.
      // println(this.Value);    // ERROR: no 'this' in static context
  }
}

public static func Main() -> void
{
  a: Example = new Example(10);
  b: Example = a;            // b references the same object as a
  b.Value = 20;

  // Because classes are reference types, a.Value has changed too.
  println(a.Value);          // 20
  println(b.Value);          // 20
}`,language:"csharp",filename:"class_edge_cases.shard"}),`
`,e.jsx(o,{tone:"amber",title:"What is not yet available",children:e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsxs(n.p,{children:["Class inheritance (",e.jsx(s,{children:"class Derived : Base"}),`) — use
interfaces and composition instead.`]})}),e.jsx(i,{children:e.jsxs(n.p,{children:["Method overriding, ",e.jsx(s,{children:"virtual"}),", and"," ",`
`,e.jsx(s,{children:"override"})," keywords."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:["The ",e.jsx(s,{children:"base"})," keyword for calling base-class members."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx(s,{children:"abstract"})," classes and methods."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx(s,{children:"sealed"})," classes and methods."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx(s,{children:"partial"})," class definitions."]})})]})})]})}function m(a={}){const{wrapper:n}=a.components||{};return n?e.jsx(n,{...a,children:e.jsx(h,{...a})}):h(a)}function l(a,n){throw new Error("Expected component `"+a+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default};
