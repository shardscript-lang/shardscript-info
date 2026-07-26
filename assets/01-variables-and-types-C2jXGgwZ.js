import{j as e}from"./index-BqaCWg-u.js";function h(a){const n={code:"code",p:"p",...a.components},{Bullet:o,Callout:c,CodeBlock:r,DocsTable:d,H2:l,InlineCode:i,Prose:t}=n;return o||s("Bullet"),c||s("Callout"),r||s("CodeBlock"),d||s("DocsTable"),l||s("H2"),i||s("InlineCode"),t||s("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:e.jsxs(n.p,{children:["ShardScript is a ",e.jsx("strong",{children:"statically and strongly typed"})," language: every local binding has a type that is known at compile time and fixed for the rest of its lifetime. There are exactly two ways to introduce a variable — an explicit type annotation or type inference — and both produce the same compile-time guarantee. There is no ",e.jsx(i,{children:"var"})," keyword and no C-style ",e.jsx(i,{children:"Type name = value"})," syntax."]})}),`
`,e.jsx(l,{children:"Introduction"}),`
`,e.jsx(t,{children:e.jsx(n.p,{children:"A variable in ShardScript is a named slot that holds a value of a specific type. The compiler resolves the type during semantic analysis, allocates a slot on the method's evaluation stack, and emits bytecode that operates on that slot. Because the type is fixed at declaration, the runtime never has to guess what a variable contains: assignment compatibility, operator resolution, and method dispatch are all verified before the program runs."})}),`
`,e.jsx(l,{children:"What it is"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:["ShardScript provides a small set of built-in primitive types. Most are value types that are copied on assignment; ",e.jsx(i,{children:"string"})," is a reference type, and ",e.jsx(i,{children:"void"})," is only used to mark the absence of a return value."]})}),`
`,e.jsx(d,{headers:["Type","Kind","Description"],rows:[[e.jsx(n.code,{children:"int"}),"Value","64-bit signed integer."],[e.jsx(n.code,{children:"double"}),"Value","64-bit IEEE 754 floating-point."],[e.jsx(n.code,{children:"bool"}),"Value","true or false."],[e.jsx(n.code,{children:"char"}),"Value","A single UTF-16 character literal ('A')."],[e.jsx(n.code,{children:"byte"}),"Value","Unsigned 8-bit integer."],[e.jsx(n.code,{children:"nint"}),"Value","Pointer-sized native integer."],[e.jsx(n.code,{children:"string"}),"Reference","Immutable UTF-16 string."],[e.jsx(n.code,{children:"void"}),"—","Absence of a value; used only as a return type."]]}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:["There are only two valid local declaration forms. ShardScript is ",e.jsx("strong",{children:"name-first"}),": the identifier always appears before the type."]})}),`
`,e.jsx(d,{headers:["Form","Meaning"],rows:[[e.jsx(n.code,{children:"name: Type = value;"}),"Explicit annotation. The compiler checks that value is assignable to Type."],[e.jsx(n.code,{children:"name := value;"}),"Type inference. The compiler derives the type from value and fixes it permanently."],[e.jsx(n.code,{children:"name = value;"}),"Not a declaration. This is reassignment of an already-declared variable."],[e.jsx(n.code,{children:"Type name = value;"}),"Rejected. C-style declarations are not valid syntax."],[e.jsx(n.code,{children:"var name = value;"}),"Rejected. The var keyword is not allowed."]]}),`
`,e.jsx(l,{children:"When to use it"}),`
`,e.jsx(t,{children:e.jsx(n.p,{children:"Choose the form that makes the code easiest to verify at a glance. The two forms are semantically equivalent — the compiler generates the same bindings and type checks either way."})}),`
`,e.jsx(o,{children:e.jsxs(n.p,{children:["Use ",e.jsx(i,{children:"name: Type = value;"})," when the type carries meaning that the initializer does not show, such as an interface or base-class variable, or when you want to pin a narrower type than the expression would infer."]})}),`
`,e.jsx(o,{children:e.jsxs(n.p,{children:["Use ",e.jsx(i,{children:"name := value;"})," when the type is obvious from the right-hand side, such as a literal, a constructor call, or a well-named factory method."]})}),`
`,e.jsx(o,{children:e.jsxs(n.p,{children:["Avoid either form for fields, parameters, or return types: fields use property-like or member syntax, parameters declare their type in a parenthesized list, and return types follow the ",e.jsx(i,{children:"->"})," arrow."]})}),`
`,e.jsx(l,{children:"Remarks"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Type inference is static."})," The ",e.jsx(i,{children:":="}),' operator reads as "is defined as" and is shorthand for writing the type out by hand. The compiler resolves the type once, at the point of declaration, and that type is immutable. There is no dynamic re-typing, no ',e.jsx(i,{children:"any"})," fallback for locals, and no implicit widening after the fact."]})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Reassignment preserves the declared type."})," A variable can be reassigned as many times as needed, but every new value must be assignable to the original type. Assigning a string to an ",e.jsx(i,{children:"int"})," variable, or a ",e.jsx(i,{children:"double"})," to a ",e.jsx(i,{children:"bool"}),", is a compile-time error."]})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Scoping is method-body."})," A local variable is visible from its declaration point to the end of the enclosing method, constructor, lambda, or property accessor body. Re-declaring a name that already exists in the same body is an error. Nested blocks such as ",e.jsx(i,{children:"if"})," or ",e.jsx(i,{children:"while"})," bodies do not introduce a new scope in the current implementation, so a variable declared inside a block remains visible after the block ends."]})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Locals require an initializer."})," A declaration without a value is rejected by the parser. If a variable truly needs to start empty, declare it with a suitable default value such as ",e.jsx(i,{children:"0"}),", ",e.jsx(i,{children:"false"}),", ",e.jsx(i,{children:'""'}),", or ",e.jsx(i,{children:"null"})," for a reference type."]})}),`
`,e.jsx(c,{tone:"blue",children:e.jsxs(n.p,{children:[e.jsx(i,{children:":="})," does not weaken the type system. ",e.jsx(i,{children:"x := 10"})," is exactly as strongly typed as ",e.jsx(i,{children:"x: int = 10"}),"; the only difference is who wrote the type on the page."]})}),`
`,e.jsx(l,{children:"Examples"}),`
`,e.jsx(t,{children:e.jsx(n.p,{children:"The following example shows every primitive declared with an explicit type. Explicit annotation is useful when the code needs to be explicit about storage width or when a reviewer should see the contract immediately."})}),`
`,e.jsx(r,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  // Explicit type annotation for each primitive.
  count: int       = 42;
  pi: double       = 3.14159;
  flag: bool       = true;
  letter: char     = 'A';
  channel: byte    = 255;
  handle: nint     = 0;
  name: string     = "ShardScript";

  println(count);
  println(pi);
  println(flag);
  println(name);
}`,language:"csharp",filename:"primitives.shard"}),`
`,e.jsx(t,{children:e.jsx(n.p,{children:"The same variables can be written with type inference. The compiler determines the type from the literal on the right, then locks it in place."})}),`
`,e.jsx(r,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  // The type is inferred from the initializer and then fixed.
  count   := 42;         // int
  pi      := 3.14159;    // double
  flag    := true;       // bool
  letter  := 'A';        // char
  channel := 255;        // int -- use byte annotation if the width matters
  name    := "ShardScript"; // string

  println(count);
  println(pi);
  println(flag);
  println(name);
}`,language:"csharp",filename:"inference.shard"}),`
`,e.jsx(t,{children:e.jsx(n.p,{children:"Reassignment is allowed as long as the new value matches the original type. Changing the type after declaration is not."})}),`
`,e.jsx(r,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  // The type is fixed once inferred.
  score := 100;
  score = 200;           // OK -- still int

  // score = "high";      // ERROR: string is not assignable to int

  // Explicit annotation enforces the same rule.
  label: string = "start";
  label = "finish";      // OK

  // label = 42;          // ERROR: int is not assignable to string

  println(score);
  println(label);
}`,language:"csharp",filename:"reassignment.shard"}),`
`,e.jsx(t,{children:e.jsx(n.p,{children:"Explicit annotation is especially valuable when you want a base type or interface on the left and a derived type on the right. Inference would pin the variable to the concrete type."})}),`
`,e.jsx(r,{code:`using stdio;

namespace demo;

interface IShape
{
  func Area() -> double;
}

public class Circle : IShape
{
  public Radius: double;

  public init(r: double)
  {
      this.Radius = r;
  }

  public func Area() -> double
  {
      return 3.14159 * this.Radius * this.Radius;
  }
}

public static func Main() -> void
{
  // Explicit annotation keeps the variable at the abstraction level.
  shape: IShape = new Circle(2.0);

  // Inference would make 'shape' a Circle instead.
  // shape := new Circle(2.0);

  println(shape.Area());
}`,language:"csharp",filename:"explicit_interface.shard"}),`
`,e.jsx(t,{children:e.jsx(n.p,{children:"Scoping is tied to the enclosing method or lambda body. The same name cannot be declared twice in the same body, but parameters and outer variables can be referenced by nested lambdas."})}),`
`,e.jsx(r,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  outer: int = 10;

  if (outer > 0)
  {
      // This declaration is visible for the rest of Main,
      // not just inside the if block.
      inner: int = 20;
      println(inner);
  }

  println(outer);

  // inner is still in scope here because blocks do not create a new scope.
  println(inner);

  // int outer = 99;      // ERROR: a symbol named 'outer' already exists
}`,language:"csharp",filename:"scoping.shard"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:["The two most common mistakes for developers coming from C, C++, C#, or Rust are using C-style type-first declarations and using the ",e.jsx(i,{children:"var"})," keyword. Both are rejected by the parser with a clear diagnostic."]})}),`
`,e.jsx(r,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  // Valid ShardScript declarations.
  count: int    = 10;
  greeting    := "hello";

  // The forms below are invalid and will not compile.
  // int count = 10;          // ERROR: invalid syntax; use 'name: Type = value'
  // var count = 10;          // ERROR: invalid use of 'var'; use 'name := value'
  // count: int;              // ERROR: local declarations require an initializer

  println(count);
  println(greeting);
}`,language:"csharp",filename:"invalid_forms.shard"}),`
`,e.jsx(c,{tone:"amber",children:e.jsxs(n.p,{children:["Only ",e.jsx(i,{children:"name: Type = value;"})," and ",e.jsx(i,{children:"name := value;"})," are valid local declarations. A local declared without an initializer is also rejected — give it a default value, or use a member field if the value must be initialized later."]})})]})}function u(a={}){const{wrapper:n}=a.components||{};return n?e.jsx(n,{...a,children:e.jsx(h,{...a})}):h(a)}function s(a,n){throw new Error("Expected component `"+a+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};
