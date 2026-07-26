import{j as e}from"./index-JSRqoYtX.js";function h(s){const n={p:"p",...s.components},{Bullet:o,Callout:l,CodeBlock:i,DocsTable:d,H2:a,InlineCode:t,Prose:r}=n;return o||c("Bullet"),l||c("Callout"),i||c("CodeBlock"),d||c("DocsTable"),a||c("H2"),t||c("InlineCode"),r||c("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(a,{children:"Summary"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:["A ",e.jsx("strong",{children:"method"}),` is a named block of code declared inside a class, struct, or interface
that defines the behaviour of a type. Methods may receive parameters, return values, be overloaded,
and be marked as instance, static, generic, asynchronous, or operator implementations.`]})}),`
`,e.jsx(a,{children:"Syntax"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:["A method declaration consists of optional modifiers, the ",e.jsx(t,{children:"func"}),` keyword,
an identifier, a parenthesized parameter list, an arrow return type, and a braced body.`]})}),`
`,e.jsx(i,{code:`[access] [static|async|extern|export] func Name<T>(parameters) -> ReturnType
{
  // body
}`,language:"csharp",filename:"method_syntax.shard"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:["The grammar also supports constructor declarations using the ",e.jsx(t,{children:"init"}),` keyword
instead of `,e.jsx(t,{children:"func"}),`. Constructors follow the same parameter and overload rules
as ordinary methods, but have no return type annotation.`]})}),`
`,e.jsx(i,{code:`[access] init(parameters)
{
  // body
}`,language:"csharp",filename:"constructor_syntax.shard"}),`
`,e.jsx(d,{headers:["Modifier","Position","Effect"],rows:[[e.jsx(t,{children:"public"}),"before func/init","Member is visible outside the declaring type."],[e.jsx(t,{children:"private"}),"before func/init","Member is visible only inside the declaring type (default)."],[e.jsx(t,{children:"static"}),"after access modifier","Method belongs to the type itself; no this reference is passed."],[e.jsx(t,{children:"async"}),"after access modifier","Method is lowered into a state machine and must return Task or ValueTask<T>."],[e.jsx(t,{children:"extern"}),"after access modifier","Method body is supplied by a native host callback instead of bytecode."],[e.jsx(t,{children:"export"}),"after access modifier","Marks the member for external visibility across shard boundaries."]]}),`
`,e.jsx(a,{children:"Parameters / Arguments"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[`Parameters are declared positionally with an explicit type annotation. The compiler checks every
argument at the call site for type compatibility. Instance methods have an implicit leading
parameter named `,e.jsx(t,{children:"this"})," that holds the receiver object."]})}),`
`,e.jsx(d,{headers:["Form","Example","Meaning"],rows:[["Named typed parameter",e.jsx(t,{children:"name: string"}),"A parameter called name of type string."],["Multiple parameters",e.jsx(t,{children:"a: int, b: int"}),"Two independent parameters."],["Generic parameter list",e.jsx(t,{children:"func Swap<T>(a: T, b: T)"}),"Type parameter T is bound at call time."],["No parameters",e.jsx(t,{children:"()"}),"Empty parameter list."]]}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:["Methods are resolved by ",e.jsx("strong",{children:"signature"}),`: the combination of the declaring type, method
name, and parameter types. Return type alone does not distinguish overloads.`]})}),`
`,e.jsx(a,{children:"Returns"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:["Every method must declare a return type after ",e.jsx(t,{children:"->"}),". Use"," ",`
`,e.jsx(t,{children:"void"}),` when the method does not produce a value. The compiler verifies that
every control path returns a value of the declared type for non-void methods.`]})}),`
`,e.jsx(d,{headers:["Return Type","Usage"],rows:[[e.jsx(t,{children:"void"}),"The method performs work but returns nothing."],[e.jsx(t,{children:"int"}),"Returns a 64-bit signed integer."],[e.jsx(t,{children:"double"}),"Returns a 64-bit IEEE 754 floating-point value."],[e.jsx(t,{children:"bool"}),"Returns a Boolean value."],[e.jsx(t,{children:"string"}),"Returns an immutable Unicode string."],[e.jsx(t,{children:"T"}),"Returns a value of generic type T."],[e.jsx(t,{children:"Task / ValueTask<T>"}),"Returned by async methods."]]}),`
`,e.jsx(a,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(o,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Missing return type"})," — Every method except"," ",`
`,e.jsx(t,{children:"init"})," must specify ",e.jsx(t,{children:"-> ReturnType"}),"."]})}),e.jsx(o,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Return type mismatch"})," — Returning an"," ",`
`,e.jsx(t,{children:"int"})," from a method declared ",e.jsx(t,{children:"-> string"}),` fails
semantic analysis.`]})}),e.jsx(o,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Unreachable end of non-void method"}),` — If a
non-void method can complete without a `,e.jsx(t,{children:"return"}),` statement, the compiler
reports an error.`]})}),e.jsx(o,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Ambiguous overload"}),` — Two methods in the same
type with the same name and identical parameter lists produce a duplicate-symbol error.`]})}),e.jsx(o,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"This in static context"})," — Using"," ",`
`,e.jsx(t,{children:"this"})," inside a ",e.jsx(t,{children:"static"}),` method is a compile-time
error because there is no receiver instance.`]})}),e.jsx(o,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Access violation"})," — Calling a"," ",`
`,e.jsx(t,{children:"private"})," method from outside the declaring type fails at compile time."]})})]}),`
`,e.jsx(a,{children:"Remarks"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Instance versus static."}),` An instance method receives the receiver object as the
first argument on the new frame's evaluation stack (slot 0). The body accesses it through the`," ",`
`,e.jsx(t,{children:"this"}),` keyword. A static method has no implicit receiver, so its first
declared parameter occupies slot 0. Static methods are invoked through the type name, while
instance methods are invoked through an object reference.`]})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Overloading."}),` Multiple methods may share the same name as long as their parameter
lists differ in arity or type. Constructors (`,e.jsx(t,{children:"init"}),`) may also be overloaded,
which is the primary way to provide several initialization patterns for a class. Overload
resolution is performed at compile time and prefers exact type matches.`]})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Generic methods."}),` A method can declare its own type parameters independent of any
enclosing type. The type arguments may be specified explicitly at the call site
(`,e.jsx(t,{children:"obj.Method<int>(value)"}),`) or, in many cases, inferred from the
argument types.`]})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Operator methods."}),` Operator overloading is implemented with a static method whose
name is an operator symbol. Binary operators take two parameters; unary operators take one. Only
a fixed set of operators can be overloaded; see the Operators reference page for the complete
table.`]})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Async methods."})," Marking a method with ",e.jsx(t,{children:"async"}),` causes the
compiler to rewrite it into a state machine. The method must return `,e.jsx(t,{children:"Task"})," ",`
when it produces no value, or `,e.jsx(t,{children:"ValueTask<T>"}),` when it produces a value.
Inside an async method, `,e.jsx(t,{children:"await"}),` yields control until the awaited operation
completes.`]})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Extern methods."})," An ",e.jsx(t,{children:"extern"}),` method declares a signature
without a body. The implementation is provided by the host runtime through a native callback.
Extern methods are used for interop with the standard library shards and with custom native
plugins.`]})}),`
`,e.jsx(l,{tone:"amber",title:"Virtual and override not yet implemented",children:e.jsxs(n.p,{children:["ShardScript recognizes the access modifiers ",e.jsx(t,{children:"public"})," and"," ",`
`,e.jsx(t,{children:"private"}),", and reserves the keywords ",e.jsx(t,{children:"protected"})," and"," ",`
`,e.jsx(t,{children:"internal"})," at the lexer level. However, class inheritance with"," ",`
`,e.jsx(t,{children:"virtual"}),", ",e.jsx(t,{children:"override"}),", ",e.jsx(t,{children:"abstract"}),`,
or `,e.jsx(t,{children:"sealed"}),` modifiers is not implemented in the current compiler. Use
interfaces for polymorphic dispatch today.`]})}),`
`,e.jsx(a,{children:"Examples"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Basic instance method."})}),`
`,e.jsx(i,{code:`using stdio;

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
`,e.jsx(i,{code:`using stdio;

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
`,e.jsx(i,{code:`using stdio;

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
`,e.jsx(i,{code:`using stdio;

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
`,e.jsx(i,{code:`using stdio;

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
`,e.jsx(i,{code:`using stdio;
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
`,e.jsx(i,{code:`using stdio;

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
`,e.jsx(l,{tone:"blue",children:e.jsxs(n.p,{children:["The default accessibility for methods is ",e.jsx(t,{children:"private"}),`. Mark methods that form
the public API of a type with `,e.jsx(t,{children:"public"})," explicitly."]})})]})}function u(s={}){const{wrapper:n}=s.components||{};return n?e.jsx(n,{...s,children:e.jsx(h,{...s})}):h(s)}function c(s,n){throw new Error("Expected component `"+s+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};
