import{j as e}from"./index-JSRqoYtX.js";function p(a){const n={code:"code",p:"p",strong:"strong",...a.components},{Bullet:s,Callout:l,CodeBlock:i,DocsTable:d,H2:c,InlineCode:t,Prose:r}=n;return s||o("Bullet"),l||o("Callout"),i||o("CodeBlock"),d||o("DocsTable"),c||o("H2"),t||o("InlineCode"),r||o("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(c,{children:"Summary"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[`Generic types and methods let classes, structs, methods, delegates, and extension
methods operate on a placeholder type `,e.jsx(t,{children:"T"}),` instead of a fixed
concrete type. The compiler substitutes the placeholder with the requested type
arguments at compile time, and the runtime creates a distinct layout for every
concrete instantiation.`]})}),`
`,e.jsx(c,{children:"Syntax"}),`
`,e.jsx(r,{children:e.jsx(n.p,{children:`Generic declarations introduce one or more type parameters inside angle brackets.
The same syntax is used for classes, methods, delegates, and extension methods.`})}),`
`,e.jsx(d,{headers:["Construct","Syntax"],rows:[[e.jsx(n.strong,{children:"Generic class"}),e.jsx(n.code,{children:"public class Name<T> { ... }"})],[e.jsx(n.strong,{children:"Generic method"}),e.jsx(n.code,{children:"public func Name<T>(p: T) -> T { ... }"})],[e.jsx(n.strong,{children:"Static generic method"}),e.jsx(n.code,{children:"public static func Name<T>(p: T) -> T { ... }"})],[e.jsx(n.strong,{children:"Generic delegate"}),e.jsx(n.code,{children:"public delegate Name<T, U>(value: T) -> U;"})],[e.jsx(n.strong,{children:"Generic extension method"}),e.jsx(n.code,{children:"public static func Name<T>(this: T) -> T { ... }"})],[e.jsx(n.strong,{children:"Type application"}),e.jsxs(e.Fragment,{children:[e.jsx(n.code,{children:"Name<int>"})," or ",e.jsx(n.code,{children:"obj.Method<int>()"})]})]]}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[`Multiple type parameters are separated by commas. Nested generic types are written by
applying type arguments to a type argument, for example`," ",`
`,e.jsx(t,{children:"Container<Container<int>>"}),"."]})}),`
`,e.jsx(c,{children:"Parameters / Arguments"}),`
`,e.jsx(r,{children:e.jsx(n.p,{children:`Type parameters are declared on the type or method and are scoped to that declaration.
Type arguments are the concrete types supplied when the generic is used.`})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Type parameter"}),` — A placeholder
identifier such as `,e.jsx(t,{children:"T"}),", ",e.jsx(t,{children:"K"}),", or"," ",`
`,e.jsx(t,{children:"V"}),`. It can appear in field types, parameter types, return
types, and local variable types inside the declaration.`]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Type argument"}),` — A concrete type
supplied inside angle brackets, for example `,e.jsx(t,{children:"int"}),","," ",`
`,e.jsx(t,{children:"string"}),", or ",e.jsx(t,{children:"List<double>"}),`.
The argument count must exactly match the parameter count.`]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Inference candidate"}),` — For method
calls, the compiler can infer type arguments from the types of the supplied value
arguments. Inference is not available for class instantiations; you must write the
type arguments explicitly.`]})})]}),`
`,e.jsx(c,{children:"Returns"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[`A generic method or property returns the type that results from substituting the type
arguments into the return-type expression. For example, a method declared as`," ",`
`,e.jsx(t,{children:"func Make<T>(v: T) -> Container<T>"})," returns"," ",`
`,e.jsx(t,{children:"Container<int>"})," when called with ",e.jsx(t,{children:"T = int"}),"."]})}),`
`,e.jsx(c,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Wrong number of type arguments"}),` —
Supplying `,e.jsx(t,{children:"Container<int, string>"}),` for a single-parameter
class produces a compile error.`]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Cannot infer type arguments"}),` — If
the arguments do not provide enough information to determine every type parameter,
the compiler reports an inference failure and you must supply the type arguments
explicitly.`]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Type mismatch in inferred call"}),` —
When inference succeeds, every use of the type parameter must be consistent. Passing
an `,e.jsx(t,{children:"int"})," to a parameter of type ",e.jsx(t,{children:"T"}),` and
a `,e.jsx(t,{children:"string"})," to another parameter of type ",e.jsx(t,{children:"T"}),`
fails because `,e.jsx(t,{children:"T"})," cannot be both."]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Generic entry point"}),` — A class that
contains the program entry point `,e.jsx(t,{children:"Main"}),` must not itself have
type parameters.`]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Invalid operation on type parameter"}),` —
Because type parameters are unconstrained, you cannot perform arithmetic, equality
tests, or member access on a value of type `,e.jsx(t,{children:"T"}),` unless the
concrete type argument happens to support it and the compiler can prove it.`]})})]}),`
`,e.jsx(c,{children:"Remarks"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Reified layouts versus shared bytecode."}),` ShardScript generics are a
hybrid. Every distinct instantiation such as `,e.jsx(t,{children:"Container<int>"}),`
and `,e.jsx(t,{children:"Container<string>"})," receives its own"," ",`
`,e.jsx(t,{children:"TypeShape"}),` and field layout at runtime, so value types are stored
inline and reference types are stored as pointers. The bytecode for the generic method
bodies, however, is emitted once per declaration. At runtime the VM passes the concrete
type arguments in the call frame or derives them from the receiver object’s shape, then
uses them for allocation and method dispatch. This gives the memory characteristics of
reified generics while keeping the compiled image compact.`]})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Type inference."}),` When you call a generic method without supplying type
arguments, the compiler compares the declared parameter types against the arguments you
passed and solves for the type parameters. Inference works for single arguments, multiple
arguments, generic return types, array types, and nested generic types. If the compiler
cannot determine every parameter, or if the solution would be inconsistent, you must
provide the type arguments explicitly.`]})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Generic methods on non-generic classes."}),` A plain class can declare a
generic method. The method’s own type parameters are independent of any type parameters
on the containing class. This is the typical pattern for factory helpers and generic
extension methods.`]})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Generic extension methods."}),` Extension methods can introduce their own
type parameters. The first parameter is the receiver and may itself be generic. The call
syntax uses the receiver value followed by the method name and type arguments, for example
`,e.jsx(t,{children:"value.Identity<int>()"}),"."]})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Generic delegates."}),` A delegate type may declare type parameters and use
them in its parameter list and return type. Lambda expressions and named functions that
match the instantiated signature can be assigned to the delegate.`]})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Nested generic types."}),` You can use an already-generic type as a type
argument to another generic type. The compiler resolves the nesting left to right, and
the runtime builds a separate shape for the fully constructed type.`]})}),`
`,e.jsx(l,{tone:"amber",title:"Generic constraints are not implemented",children:e.jsxs(n.p,{children:["ShardScript currently does not support ",e.jsx(t,{children:"where"}),` clauses or other
generic constraints. Type parameters are effectively unconstrained, which means you cannot
call operators or interface members on a value of type `,e.jsx(t,{children:"T"}),` without
first casting it to a concrete type. If you need a constraint, use an explicit cast or
redesign around a concrete interface parameter until constraints are added.`]})}),`
`,e.jsx(c,{children:"Examples"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Generic class with a single type parameter."})}),`
`,e.jsx(i,{code:`using stdio;

namespace demo;

public class Container<T>
{
  public Value: T;

  public func Set(v: T) -> void
  {
      // Store the caller-supplied value in the generic field.
      this.Value = v;
  }

  public func Get() -> T
  {
      return this.Value;
  }
}

public static func Main() -> void
{
  c: Container<int> = new Container<int>();
  c.Set(42);
  println(c.Get());        // 42

  d: Container<string> = new Container<string>();
  d.Set("hello");
  println(d.Get());        // hello
}`,language:"csharp",filename:"generic_container.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Multiple type parameters."})}),`
`,e.jsx(i,{code:`using stdio;

namespace demo;

public class Pair<K, V>
{
  public Key: K;
  public Value: V;
}

public static func Main() -> void
{
  p: Pair<int, string> = new Pair<int, string>();
  p.Key = 1;
  p.Value = "one";

  println(p.Key);          // 1
  println(p.Value);        // one
}`,language:"csharp",filename:"generic_pair.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Generic method on a non-generic class."})}),`
`,e.jsx(i,{code:`using stdio;

namespace demo;

public class Factory
{
  public static func Make<T>(v: T) -> Container<T>
  {
      c: Container<T> = new Container<T>();
      c.Value = v;
      return c;
  }
}

public class Container<T>
{
  public Value: T;
}

public static func Main() -> void
{
  // Type inference: T is int because the argument is int.
  a: Container<int> = Factory.Make(42);
  println(a.Value);        // 42

  // Explicit type arguments are also allowed.
  b: Container<string> = Factory.Make<string>("hi");
  println(b.Value);        // hi
}`,language:"csharp",filename:"generic_factory.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Generic instance method inside a generic class."})}),`
`,e.jsx(i,{code:`using stdio;

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

  // U is independent of the class type parameter T.
  public func As<U>() -> Container<U>
  {
      result: Container<U> = new Container<U>();
      return result;
  }
}

public static func Main() -> void
{
  c: Container<int> = new Container<int>();
  c.Set(42);
  println(c.Get());        // 42

  e: Container<string> = c.As<string>();
  e.Set("converted");
  println(e.Get());        // converted
}`,language:"csharp",filename:"generic_class_method.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Nested generic types."})}),`
`,e.jsx(i,{code:`using stdio;

namespace demo;

public class Container<T>
{
  public Value: T;
}

public static func Main() -> void
{
  // The outer container stores another Container<int>.
  outer: Container<Container<int>> = new Container<Container<int>>();
  inner: Container<int> = new Container<int>();
  inner.Value = 99;
  outer.Value = inner;

  println(outer.Value.Value);   // 99
}`,language:"csharp",filename:"generic_nested.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Generic extension method."})}),`
`,e.jsx(i,{code:`using stdio;

namespace demo;

public static func Identity<T>(x: T) -> T
{
  return x;
}

public static func Duplicate<T>(x: T) -> List<T>
{
  result: List<T> = new List<T>();
  result.Add(x);
  result.Add(x);
  return result;
}

public class List<T>
{
  private count: int;

  public func Add(item: T) -> void
  {
      this.count = this.count + 1;
  }

  public func GetCount() -> int
  {
      return this.count;
  }
}

public static func Main() -> void
{
  a: int = 5;
  b: int = a.Identity<int>();
  println(b);              // 5

  c: List<int> = a.Duplicate<int>();
  println(c.GetCount());   // 2
}`,language:"csharp",filename:"generic_extension.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Generic delegate."})}),`
`,e.jsx(i,{code:`using stdio;

namespace demo;

public delegate Transform<T, U>(value: T) -> U;

public static func Make<T, U>(action: Transform<T, U>) -> Transform<T, U>
{
  return action;
}

public static func Main() -> void
{
  addTen: Transform<int, int> = Make<int, int>(lambda (a: int) -> int
  {
      return a + 10;
  });

  println(addTen(5));      // 15
}`,language:"csharp",filename:"generic_delegate.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Type inference with arrays and nested generics."})}),`
`,e.jsx(i,{code:`using stdio;

namespace demo;

public static func First<T>(source: T[]) -> T
{
  // The caller is expected to pass a non-empty array.
  return source[0];
}

public static func MakeContainer<T>(v: T) -> Container<T>
{
  c: Container<T> = new Container<T>();
  c.Value = v;
  return c;
}

public class Container<T>
{
  public Value: T;
}

public static func Main() -> void
{
  nums: int[] = [10, 20, 30];

  // T is inferred as int from the int[] argument.
  first: int = First(nums);
  println(first);          // 10

  // T is inferred as string from the string argument.
  wrapped: Container<string> = MakeContainer("boxed");
  println(wrapped.Value);  // boxed
}`,language:"csharp",filename:"generic_inference.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Common mistakes."})}),`
`,e.jsx(i,{code:`using stdio;

namespace demo;

public class Container<T>
{
  public Value: T;
}

public static func Swap<T>(a: T, b: T) -> void
{
  // The body is intentionally empty; the signature is what matters here.
}

public static func Main() -> void
{
  // Correct: both arguments have the same inferred type.
  Swap(1, 2);

  // ERROR: T cannot be both int and string.
  // Swap(1, "two");

  // ERROR: Container has one type parameter, not two.
  // c: Container<int, string> = new Container<int, string>();

  // Correct: nested generic types need matching arity at every level.
  outer: Container<Container<int>> = new Container<Container<int>>();
}`,language:"csharp",filename:"generic_mistakes.shard"})]})}function u(a={}){const{wrapper:n}=a.components||{};return n?e.jsx(n,{...a,children:e.jsx(p,{...a})}):p(a)}function o(a,n){throw new Error("Expected component `"+a+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};
