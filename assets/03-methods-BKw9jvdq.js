import{j as e}from"./index-DLc5xCYN.js";function h(o){const t={p:"p",...o.components},{Bullet:i,Callout:l,CodeBlock:s,DocsTable:d,H2:a,InlineCode:n,Prose:r}=t;return i||c("Bullet"),l||c("Callout"),s||c("CodeBlock"),d||c("DocsTable"),a||c("H2"),n||c("InlineCode"),r||c("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(a,{children:"Summary"}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:["A ",e.jsx("strong",{children:"method"}),` is a named block of code declared inside a class, struct, or interface
that defines the behaviour of a type. Methods may receive parameters, return values, be overloaded,
and be marked as instance, static, generic, asynchronous, or operator implementations.`]})}),`
`,e.jsx(a,{children:"Syntax"}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:["A method declaration consists of optional modifiers, the ",e.jsx(n,{children:"func"}),` keyword,
an identifier, a parenthesized parameter list, an arrow return type, and a braced body.`]})}),`
`,e.jsx(s,{code:`[access] [static|async|extern|export] func Name<T>(parameters) -> ReturnType
{
  // body
}`,language:"csharp",filename:"method_syntax.shard"}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:["The grammar also supports constructor declarations using the ",e.jsx(n,{children:"init"}),` keyword
instead of `,e.jsx(n,{children:"func"}),`. Constructors follow the same parameter and overload rules
as ordinary methods, but have no return type annotation.`]})}),`
`,e.jsx(s,{code:`[access] init(parameters)
{
  // body
}`,language:"csharp",filename:"constructor_syntax.shard"}),`
`,e.jsx(d,{headers:["Modifier","Position","Effect"],rows:[[e.jsx(n,{children:"public"}),"before func/init","Member is visible outside the declaring type."],[e.jsx(n,{children:"private"}),"before func/init","Member is visible only inside the declaring type (default)."],[e.jsx(n,{children:"static"}),"after access modifier","Method belongs to the type itself; no this reference is passed."],[e.jsx(n,{children:"async"}),"after access modifier","Method is lowered into a state machine and must return Task or ValueTask<T>."],[e.jsx(n,{children:"extern"}),"after access modifier","Method body is supplied by a native host callback instead of bytecode."],[e.jsx(n,{children:"export"}),"after access modifier","Marks the member for external visibility across shard boundaries."]]}),`
`,e.jsx(a,{children:"Parameters / Arguments"}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:[`Parameters are declared positionally with an explicit type annotation. The compiler checks every
argument at the call site for type compatibility. Instance methods have an implicit leading
parameter named `,e.jsx(n,{children:"this"})," that holds the receiver object."]})}),`
`,e.jsx(d,{headers:["Form","Example","Meaning"],rows:[["Named typed parameter",e.jsx(n,{children:"name: string"}),"A parameter called name of type string."],["Multiple parameters",e.jsx(n,{children:"a: int, b: int"}),"Two independent parameters."],["Generic parameter list",e.jsx(n,{children:"func Swap<T>(a: T, b: T)"}),"Type parameter T is bound at call time."],["No parameters",e.jsx(n,{children:"()"}),"Empty parameter list."]]}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:["Methods are resolved by ",e.jsx("strong",{children:"signature"}),`: the combination of the declaring type, method
name, and parameter types. Return type alone does not distinguish overloads.`]})}),`
`,e.jsx(a,{children:"Returns"}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:["Every method must declare a return type after ",e.jsx(n,{children:"->"}),". Use"," ",`
`,e.jsx(n,{children:"void"}),` when the method does not produce a value. The compiler verifies that
every control path returns a value of the declared type for non-void methods.`]})}),`
`,e.jsx(d,{headers:["Return Type","Usage"],rows:[[e.jsx(n,{children:"void"}),"The method performs work but returns nothing."],[e.jsx(n,{children:"int"}),"Returns a 64-bit signed integer."],[e.jsx(n,{children:"double"}),"Returns a 64-bit IEEE 754 floating-point value."],[e.jsx(n,{children:"bool"}),"Returns a Boolean value."],[e.jsx(n,{children:"string"}),"Returns an immutable Unicode string."],[e.jsx(n,{children:"T"}),"Returns a value of generic type T."],[e.jsx(n,{children:"Task / ValueTask<T>"}),"Returned by async methods."]]}),`
`,e.jsx(a,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Missing return type"})," — Every method except"," ",`
`,e.jsx(n,{children:"init"})," must specify ",e.jsx(n,{children:"-> ReturnType"}),"."]})}),e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Return type mismatch"})," — Returning an"," ",`
`,e.jsx(n,{children:"int"})," from a method declared ",e.jsx(n,{children:"-> string"}),` fails
semantic analysis.`]})}),e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Unreachable end of non-void method"}),` — If a
non-void method can complete without a `,e.jsx(n,{children:"return"}),` statement, the compiler
reports an error.`]})}),e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Ambiguous overload"}),` — Two methods in the same
type with the same name and identical parameter lists produce a duplicate-symbol error.`]})}),e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"This in static context"})," — Using"," ",`
`,e.jsx(n,{children:"this"})," inside a ",e.jsx(n,{children:"static"}),` method is a compile-time
error because there is no receiver instance.`]})}),e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Access violation"})," — Calling a"," ",`
`,e.jsx(n,{children:"private"})," method from outside the declaring type fails at compile time."]})})]}),`
`,e.jsx(a,{children:"Remarks"}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Instance versus static."}),` An instance method receives the receiver object as the
first argument on the new frame's evaluation stack (slot 0). The body accesses it through the`," ",`
`,e.jsx(n,{children:"this"}),` keyword. A static method has no implicit receiver, so its first
declared parameter occupies slot 0. Static methods are invoked through the type name, while
instance methods are invoked through an object reference.`]})}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Overloading."}),` Multiple methods may share the same name as long as their parameter
lists differ in arity or type. Constructors (`,e.jsx(n,{children:"init"}),`) may also be overloaded,
which is the primary way to provide several initialization patterns for a class. Overload
resolution is performed at compile time and prefers exact type matches.`]})}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Generic methods."}),` A method can declare its own type parameters independent of any
enclosing type. The type arguments may be specified explicitly at the call site
(`,e.jsx(n,{children:"obj.Method<int>(value)"}),`) or, in many cases, inferred from the
argument types.`]})}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Operator methods."}),` Operator overloading is implemented with a static method whose
name is an operator symbol. Binary operators take two parameters; unary operators take one. Only
a fixed set of operators can be overloaded; see the Operators reference page for the complete
table.`]})}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Async methods."})," Marking a method with ",e.jsx(n,{children:"async"}),` causes the
compiler to rewrite it into a state machine. The method must return `,e.jsx(n,{children:"Task"})," ",`
when it produces no value, or `,e.jsx(n,{children:"ValueTask<T>"}),` when it produces a value.
Inside an async method, `,e.jsx(n,{children:"await"}),` yields control until the awaited operation
completes.`]})}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Extern methods."})," An ",e.jsx(n,{children:"extern"}),` method declares a signature
without a body. The implementation is provided by the host runtime through a native callback.
Extern methods are used for interop with the standard library shards and with custom native
plugins.`]})}),`
`,e.jsx(l,{tone:"amber",title:"Virtual and override not yet implemented",children:e.jsxs(t.p,{children:["ShardScript recognizes the access modifiers ",e.jsx(n,{children:"public"})," and"," ",`
`,e.jsx(n,{children:"private"}),", and reserves the keywords ",e.jsx(n,{children:"protected"})," and"," ",`
`,e.jsx(n,{children:"internal"})," at the lexer level. However, class inheritance with"," ",`
`,e.jsx(n,{children:"virtual"}),", ",e.jsx(n,{children:"override"}),", ",e.jsx(n,{children:"abstract"}),`,
or `,e.jsx(n,{children:"sealed"}),` modifiers is not implemented in the current compiler. Use
interfaces for polymorphic dispatch today.`]})}),`
`,e.jsx(a,{children:"Examples"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Basic instance method."})}),`
`,e.jsx(s,{code:`using stdio;

namespace demo;

public class Counter
{
  public Count: int;

  public init()
  {
      this.Count = 0;
  }

  public func Step() -> void
  {
      this.Count = this.Count + 1;
  }

  public func GetCount() -> int
  {
      return this.Count;
  }
}

public static func Main() -> void
{
  c: Counter = new Counter();

  c.Step();
  c.Step();
  c.Step();

  println(c.GetCount());   // 3
}`,language:"csharp",filename:"instance_method.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Static methods and type-level state."})}),`
`,e.jsx(s,{code:`using stdio;

namespace demo;

public class IdGenerator
{
  private static NextId: int;

  public static func Generate() -> int
  {
      id: int = IdGenerator.NextId;
      IdGenerator.NextId = IdGenerator.NextId + 1;
      return id;
  }

  public static func Reset() -> void
  {
      IdGenerator.NextId = 0;
  }
}

public static func Main() -> void
{
  println(IdGenerator.Generate());   // 0
  println(IdGenerator.Generate());   // 1
  println(IdGenerator.Generate());   // 2

  IdGenerator.Reset();
  println(IdGenerator.Generate());   // 0
}`,language:"csharp",filename:"static_methods.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Method and constructor overloading."})}),`
`,e.jsx(s,{code:`using stdio;

namespace demo;

public class Point
{
  public X: double;
  public Y: double;

  // Parameterless constructor.
  public init()
  {
      this.X = 0.0;
      this.Y = 0.0;
  }

  // Overloaded constructor with coordinates.
  public init(x: double, y: double)
  {
      this.X = x;
      this.Y = y;
  }

  public func Move(dx: double, dy: double) -> void
  {
      this.X = this.X + dx;
      this.Y = this.Y + dy;
  }

  // Overloaded Move that accepts a single offset applied to both axes.
  public func Move(offset: double) -> void
  {
      this.Move(offset, offset);
  }

  public func ToString() -> string
  {
      return "(" + this.X + ", " + this.Y + ")";
  }
}

public static func Main() -> void
{
  a: Point = new Point();
  b: Point = new Point(3.0, 4.0);

  a.Move(1.0);
  b.Move(0.5, -0.5);

  println(a.ToString());   // (1, 1)
  println(b.ToString());   // (3.5, 3.5)
}`,language:"csharp",filename:"overloading.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Generic method."})}),`
`,e.jsx(s,{code:`using stdio;

namespace demo;

public class Container<T>
{
  public Value: T;

  // Wrap a value of a different type in a new container.
  public func As<U>() -> Container<U>
  {
      result: Container<U> = new Container<U>();
      return result;
  }
}

public static func Swap<T>(a: T, b: T) -> T[]
{
  pair: T[] = new T[2];
  pair[0] = b;
  pair[1] = a;
  return pair;
}

public static func Main() -> void
{
  c: Container<int> = new Container<int>();
  c.Value = 7;

  wrapped: Container<string> = c.As<string>();
  wrapped.Value = "seven";
  println(wrapped.Value);

  swapped: int[] = Swap<int>(1, 2);
  println(swapped[0]);   // 2
  println(swapped[1]);   // 1
}`,language:"csharp",filename:"generic_method.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Operator overloading as a static method."})}),`
`,e.jsx(s,{code:`using stdio;

namespace demo;

public class Vector2
{
  public X: double;
  public Y: double;

  public init(x: double, y: double)
  {
      this.X = x;
      this.Y = y;
  }

  // Binary + adds two Vector2 values component-wise.
  public static operator +(a: Vector2, b: Vector2) -> Vector2
  {
      return new Vector2(a.X + b.X, a.Y + b.Y);
  }

  // Unary - negates both components.
  public static operator -(v: Vector2) -> Vector2
  {
      return new Vector2(-v.X, -v.Y);
  }
}

public static func Main() -> void
{
  u: Vector2 = new Vector2(1.0, 2.0);
  v: Vector2 = new Vector2(3.0, 4.0);

  sum: Vector2 = u + v;
  neg: Vector2 = -sum;

  println("sum: " + sum.X + ", " + sum.Y);     // sum: 4, 6
  println("neg: " + neg.X + ", " + neg.Y);     // neg: -4, -6
}`,language:"csharp",filename:"operator_method.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Async method."})}),`
`,e.jsx(s,{code:`using stdio;
using async;

namespace demo;

public class DelayedGreeter
{
  public Message: string;

  public init(message: string)
  {
      this.Message = message;
  }

  public async func GreetAfter(ms: int) -> Task
  {
      await Task.Delay(ms);
      println(this.Message);
  }
}

public static func Main() -> void
{
  greeter: DelayedGreeter = new DelayedGreeter("hello after delay");
  task: Task = greeter.GreetAfter(50);
  task.Wait();
}`,language:"csharp",filename:"async_method.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Access modifiers and common mistakes."})}),`
`,e.jsx(s,{code:`using stdio;

namespace demo;

public class Vault
{
  // Public getter, private backing storage.
  public func Balance() -> int
  {
      return this._balance;
  }

  public func Deposit(amount: int) -> void
  {
      if (amount > 0)
      {
          this._balance = this._balance + amount;
      }
  }

  private _balance: int;
}

public static func Main() -> void
{
  vault: Vault = new Vault();

  vault.Deposit(100);
  println(vault.Balance());   // 100

  // vault._balance = 0;      // ERROR: _balance is private
}`,language:"csharp",filename:"access_modifiers.shard"}),`
`,e.jsx(l,{tone:"blue",children:e.jsxs(t.p,{children:["The default accessibility for methods is ",e.jsx(n,{children:"private"}),`. Mark methods that form
the public API of a type with `,e.jsx(n,{children:"public"})," explicitly."]})}),`
`,e.jsx(a,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"Functions"})," — core function declaration and call syntax shared by every callable named block."]})}),e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"Constructors and Initialization"})," — special ",e.jsx(n,{children:"init"})," methods for object creation."]})}),e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"Delegates"})," — callable value types for storing and passing functions."]})})]}),`
`,e.jsx(a,{children:"Source"}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:["Method declarations are parsed into ",e.jsx(n,{children:"MethodDeclarationSyntax"})," nodes in ",e.jsx(n,{children:"ShardScript/ShardScript/src/parsing/SourceParser.cpp"}),". The syntax node definition is in ",e.jsx(n,{children:"ShardScript/ShardScript/include/shard/parsing/nodes/MemberDeclarations/MethodDeclarationSyntax.hpp"}),"."]})})]})}function u(o={}){const{wrapper:t}=o.components||{};return t?e.jsx(t,{...o,children:e.jsx(h,{...o})}):h(o)}function c(o,t){throw new Error("Expected component `"+o+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};
