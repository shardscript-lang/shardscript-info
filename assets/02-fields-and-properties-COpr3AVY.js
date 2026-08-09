import{j as e}from"./index-DIkNH1R5.js";function p(s){const t={p:"p",...s.components},{Bullet:l,Callout:o,CodeBlock:a,DocsTable:d,H2:r,InlineCode:i,Prose:n}=t;return l||c("Bullet"),o||c("Callout"),a||c("CodeBlock"),d||c("DocsTable"),r||c("H2"),i||c("InlineCode"),n||c("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(r,{children:"Summary"}),`
`,e.jsx(n,{children:e.jsxs(t.p,{children:["ShardScript classes and structs store data in ",e.jsx("strong",{children:"fields"}),` and expose it
through `,e.jsx("strong",{children:"properties"}),`. Fields are named typed slots; properties are
accessor methods that look like fields, letting you control read and write access
with `,e.jsx(i,{children:"get"})," and ",e.jsx(i,{children:"set"}),` bodies. Both can
be instance-bound or `,e.jsx(i,{children:"static"}),`, and both support the
`,e.jsx(i,{children:"public"})," and ",e.jsx(i,{children:"private"})," access modifiers."]})}),`
`,e.jsx(r,{children:"Syntax"}),`
`,e.jsx(n,{children:e.jsx(t.p,{children:`A field declares a typed slot. A property declares one or two accessors that wrap
access to a backing field or a computed value.`})}),`
`,e.jsx(d,{headers:["Form","Syntax"],rows:[["Field declaration","[modifiers] Name: Type;"],["Field with initializer","[modifiers] Name: Type = expression;"],["Explicit property","[modifiers] Name: Type { get { ... } set { ... } }"],["Read-only property","[modifiers] Name: Type { get { ... } }"],["Auto-property","[modifiers] Name: Type { get; set; }"],["Read-only auto-property","[modifiers] Name: Type { get; }"]]}),`
`,e.jsx(n,{children:e.jsxs(t.p,{children:["Modifiers appear in this order: access modifier (",e.jsx(i,{children:"public"}),` or
`,e.jsx(i,{children:"private"}),"), then ",e.jsx(i,{children:"static"}),`. If no access
modifier is given, the member is `,e.jsx(i,{children:"private"}),"."]})}),`
`,e.jsx(r,{children:"Parameters / Arguments"}),`
`,e.jsx(n,{children:e.jsx(t.p,{children:`Field and property declarations do not take arguments, but the modifiers and
accessor bodies determine how the member behaves.`})}),`
`,e.jsx(d,{headers:["Modifier / Accessor","Effect","Applies to"],rows:[["public","Accessible from any code that can see the type.","Fields, properties, methods, constructors"],["private","Accessible only inside the declaring type (default).","Fields, properties, methods, constructors"],["static","Belongs to the type itself, not to an instance.","Fields, properties, methods"],["get { ... }","Defines a read accessor; must return the property type.","Properties"],["set { ... }","Defines a write accessor; the new value is named value.","Properties"],["get;","Auto-generated read accessor backed by a compiler field.","Auto-properties"],["set;","Auto-generated write accessor backed by a compiler field.","Auto-properties"]]}),`
`,e.jsx(o,{tone:"blue",children:e.jsxs(t.p,{children:["Static members are accessed through the type name:"," ",`
`,e.jsx(i,{children:"Config.AppName"}),`. Inside instance members you can also reach
static members through `,e.jsx(i,{children:"this"}),`, but the type-qualified form is
clearer.`]})}),`
`,e.jsx(r,{children:"Returns"}),`
`,e.jsx(d,{headers:["Access","Result"],rows:[["Field read","The current value stored in the slot, with the field's declared type."],["Property get","The value returned by the getter accessor, with the property's declared type."],["Property set","No value; the setter stores or processes the supplied value."]]}),`
`,e.jsx(r,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(l,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Private member access"}),` — Reading or
writing a `,e.jsx(i,{children:"private"}),` field or property from outside its
declaring type fails semantic analysis.`]})}),e.jsx(l,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Missing accessor"}),` — A property must
declare at least a getter or a setter. Writing to a read-only property, or reading
from a write-only property, produces an error.`]})}),e.jsx(l,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Static versus instance mismatch"}),` —
Accessing an instance member through the type name, or a static member through an
instance reference, is not allowed.`]})}),e.jsx(l,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Type mismatch"}),` — Assigning a value
of the wrong type to a field or property setter fails semantic analysis.`]})}),e.jsx(l,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Uninitialized reference"}),` — Fields of
reference types are initialized to `,e.jsx(i,{children:"null"}),` by the runtime.
Reading one before assignment throws a null-reference error.`]})})]}),`
`,e.jsx(r,{children:"Remarks"}),`
`,e.jsx(n,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Default accessibility."}),` When you omit an access modifier, the member
is `,e.jsx(i,{children:"private"}),`. ShardScript intentionally keeps the access model
small: only `,e.jsx(i,{children:"public"})," and ",e.jsx(i,{children:"private"}),` affect
compiled output. The parser recognizes `,e.jsx(i,{children:"protected"})," and"," ",`
`,e.jsx(i,{children:"internal"})," as modifiers, but they currently behave like"," ",`
`,e.jsx(i,{children:"private"}),"."]})}),`
`,e.jsx(n,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Instance versus static storage."}),` Instance fields live inside each
object on the GC heap; the VM reads and writes them with`," ",`
`,e.jsx(i,{children:"LOADFIELD"})," and ",e.jsx(i,{children:"STOREFIELD"}),` using a slot
index computed at compile time. Static fields live in a single global static store
and use `,e.jsx(i,{children:"LOADSTATICFIELD"})," and"," ",`
`,e.jsx(i,{children:"STORESTATICFIELD"}),". Static properties and methods receive no"," ",`
`,e.jsx(i,{children:"this"})," reference."]})}),`
`,e.jsx(n,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Auto-properties."})," When you write"," ",`
`,e.jsx(i,{children:"{ get; set; }"}),` without explicit bodies, the compiler
creates a private backing field and generates trivial getter and setter methods that
read from and write to that field. A read-only auto-property (`," ",`
`,e.jsx(i,{children:"{ get; }"}),`) omits the setter, but its backing field is
still writable inside the type's constructor because the constructor emits a direct
field store.`]})}),`
`,e.jsx(n,{children:e.jsxs(t.p,{children:[e.jsxs("strong",{children:["The ",e.jsx(i,{children:"field"})," keyword."]}),` Inside an explicit
property accessor you can refer to the compiler-generated backing field with the bare
keyword `,e.jsx(i,{children:"field"}),`. This is useful when you want validation or
side effects around a stored value without declaring a separate private field by hand.
If the backing field does not yet exist, it is created on first use.`]})}),`
`,e.jsx(o,{tone:"amber",title:"init-only setters are not implemented",children:e.jsxs(t.p,{children:["Some languages allow an ",e.jsx(i,{children:"init"}),` accessor that permits
assignment only during construction. ShardScript currently supports only`," ",`
`,e.jsx(i,{children:"get"})," and ",e.jsx(i,{children:"set"}),`. To achieve init-only
semantics, declare a read-only property (`,e.jsx(i,{children:"{ get; }"})," or"," ",`
`,e.jsx(i,{children:"{ get { ... } }"}),`) and assign its backing field inside
the constructor.`]})}),`
`,e.jsx(n,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Property accessors are methods."})," A property read such as"," ",`
`,e.jsx(i,{children:"rect.Width"}),` compiles to a call to the getter method; a write
such as `,e.jsx(i,{children:"rect.Width = 10.0"}),` compiles to a call to the setter
with `,e.jsx(i,{children:"value"}),` passed as the last argument. Property syntax is
purely a source-level convenience.`]})}),`
`,e.jsx(r,{children:"Examples"}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"Fields with access modifiers."})}),`
`,e.jsx(a,{code:`using stdio;

namespace demo;

public class Person
{
  public Name: string;
  private Age: int;

  public init(name: string, age: int)
  {
      this.Name = name;
      this.Age = age;
  }

  public func Birthday() -> void
  {
      // Private field access is allowed inside the declaring type.
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
  println(p.Name);          // Alice
  println(p.Describe());    // Alice is 30

  p.Birthday();
  println(p.Describe());    // Alice is 31

  // p.Age = 31;            // ERROR: Age is private
}`,language:"csharp",filename:"fields_access_modifiers.shard"}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"Static fields and properties."})}),`
`,e.jsx(a,{code:`using stdio;

namespace demo;

public class Config
{
  public static AppName: string = "MyApp";
  public static Version: double = 1.0;

  public static func PrintInfo() -> void
  {
      println(Config.AppName + " v" + Config.Version);
  }

  public InstanceId: int;

  public init(id: int)
  {
      this.InstanceId = id;
  }

  public func Describe() -> void
  {
      // Static fields are reached through the type name.
      println("Instance " + this.InstanceId + " of " + Config.AppName);
  }
}

public static func Main() -> void
{
  println(Config.AppName);    // MyApp
  Config.PrintInfo();         // MyApp v1

  obj: Config = new Config(42);
  obj.Describe();             // Instance 42 of MyApp
}`,language:"csharp",filename:"static_fields.shard"}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"Explicit properties with getters and setters."})}),`
`,e.jsx(a,{code:`using stdio;

namespace demo;

public class Rectangle
{
  private width: double;
  private height: double;

  public Width: double
  {
      get { return this.width; }
      set { this.width = value; }
  }

  public Height: double
  {
      get { return this.height; }
      set { this.height = value; }
  }

  // Read-only computed property: no setter, no backing storage.
  public Area: double
  {
      get { return this.width * this.height; }
  }

  public init(w: double, h: double)
  {
      this.width = w;
      this.height = h;
  }
}

public static func Main() -> void
{
  r: Rectangle = new Rectangle(5.0, 4.0);
  println(r.Area);     // 20

  r.Width = 10.0;
  println(r.Area);     // 40

  // r.Area = 100.0;    // ERROR: Area has no setter
}`,language:"csharp",filename:"explicit_properties.shard"}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"Auto-properties and read-only auto-properties."})}),`
`,e.jsx(a,{code:`using stdio;

namespace demo;

public class Point
{
  // The compiler generates a private backing field and trivial accessors.
  public X: int { get; set; }

  // Read-only auto-property: no setter, but writable inside init.
  public Label: string { get; }

  public init(x: int, label: string)
  {
      this.X = x;
      this.Label = label;
  }
}

public static func Main() -> void
{
  p: Point = new Point(3, "origin");
  println(p.Label + ": " + p.X);    // origin: 3

  p.X = 7;
  println(p.Label + ": " + p.X);    // origin: 7

  // p.Label = "new";                // ERROR: no setter
}`,language:"csharp",filename:"auto_properties.shard"}),`
`,e.jsx(n,{children:e.jsxs("strong",{children:["Using the ",e.jsx(i,{children:"field"})," keyword."]})}),`
`,e.jsx(a,{code:`using stdio;

namespace demo;

public class Counter
{
  // Explicit bodies with the 'field' keyword avoid a hand-written backing field.
  public Value: int
  {
      get { return field; }
      set
      {
          // Reject negative values at the property boundary.
          if (value < 0)
          {
              value = 0;
          }

          field = value;
      }
  }

  public init(start: int)
  {
      this.Value = start;
  }
}

public static func Main() -> void
{
  c: Counter = new Counter(5);
  println(c.Value);    // 5

  c.Value = -3;
  println(c.Value);    // 0
}`,language:"csharp",filename:"field_keyword.shard"}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"Common mistakes and edge cases."})}),`
`,e.jsx(a,{code:`using stdio;

namespace demo;

public class BankAccount
{
  // Instance field with a declaration-site initializer.
  public Balance: double = 0.0;

  // Reference-type field: initialized to null by the runtime before init runs.
  public Owner: string;

  public static DefaultLimit: double = 1000.0;

  public init(owner: string, startingBalance: double)
  {
      this.Owner = owner;
      this.Balance = startingBalance;
  }
}

public static func Main() -> void
{
  a: BankAccount = new BankAccount("Bob", 100.0);
  println(a.Owner + ": " + a.Balance);              // Bob: 100
  println("Limit: " + BankAccount.DefaultLimit);     // Limit: 1000

  // Reading Owner before init would compile, but would throw at runtime.
  // Always initialize reference fields in a constructor.
}`,language:"csharp",filename:"field_edge_cases.shard"}),`
`,e.jsx(o,{tone:"red",title:"Do not access instance members from static context",children:e.jsxs(t.p,{children:["Static methods and static property accessors have no ",e.jsx(i,{children:"this"}),`.
Trying to read `,e.jsx(i,{children:"this.InstanceField"}),` inside a static member is a
compile-time error.`]})})]})}function u(s={}){const{wrapper:t}=s.components||{};return t?e.jsx(t,{...s,children:e.jsx(p,{...s})}):p(s)}function c(s,t){throw new Error("Expected component `"+s+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};
