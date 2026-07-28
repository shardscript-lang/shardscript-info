import{j as e}from"./index-Cg_ascQj.js";function h(a){const n={code:"code",p:"p",...a.components},{Bullet:c,Callout:o,CodeBlock:s,DocsTable:d,H2:r,InlineCode:i,Prose:t}=n;return c||l("Bullet"),o||l("Callout"),s||l("CodeBlock"),d||l("DocsTable"),r||l("H2"),i||l("InlineCode"),t||l("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:e.jsxs(n.p,{children:["ShardScript is a ",e.jsx("strong",{children:"statically typed"})," language: every value has a type that is known before the program runs. Type inference lets the compiler deduce that type from the initializer expression, so you can write ",e.jsx(i,{children:"name := value"})," instead of spelling out ",e.jsx(i,{children:"name: Type = value"})," every time. The resulting code is shorter, but the type system is just as strict — once the compiler has chosen a type, it never changes."]})}),`
`,e.jsx(r,{children:"Introduction"}),`
`,e.jsx(t,{children:e.jsx(n.p,{children:"Type inference removes repetitive type annotations for local variables whose type is obvious from the right-hand side. The compiler still builds a complete symbol table with concrete types, emits the same bytecode, and reports the same assignment errors. Inference is purely a source-level convenience; it does not make ShardScript dynamically typed."})}),`
`,e.jsx(t,{children:e.jsx(n.p,{children:"There are two separate ideas that are often both called “inference”:"})}),`
`,e.jsxs(c,{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Local-variable inference:"})," ",e.jsx(i,{children:"x := 42"})," lets the compiler decide that ",e.jsx(i,{children:"x"})," is ",e.jsx(i,{children:"int"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Generic argument inference:"})," ",e.jsx(i,{children:"Factory.Make(42)"})," lets the compiler decide that the type parameter ",e.jsx(i,{children:"T"})," is ",e.jsx(i,{children:"int"}),"."]})]}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:["This article explains both, where each is allowed, and how they interact with method overloads and the special ",e.jsx(i,{children:"any"})," type."]})}),`
`,e.jsx(r,{children:"What it is"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:["Local-variable inference uses the declare-assign operator ",e.jsx(i,{children:":="})," (sometimes called the “walrus” operator). The grammar is:"]})}),`
`,e.jsx(s,{code:"identifier := expression;",language:"csharp",filename:"inference_syntax.shard"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:["Internally, the parser treats ",e.jsx(i,{children:":="})," as a variable declaration whose declared type is ",e.jsx(i,{children:"var"}),". During semantic analysis ",e.jsx(i,{children:"var"})," is represented by the internal ",e.jsx(i,{children:"any"})," placeholder. The binder evaluates the initializer, records the resulting concrete type, and then ",e.jsx("strong",{children:"replaces"})," the variable’s type with that concrete type. From that point on the variable behaves exactly as if you had written an explicit annotation."]})}),`
`,e.jsx(t,{children:e.jsx(n.p,{children:"The compiler can infer the type from any expression whose type is known:"})}),`
`,e.jsx(d,{headers:["Initializer","Inferred type","Notes"],rows:[[e.jsx(n.code,{children:"42"}),"int","Integer literals without a decimal point are int."],[e.jsx(n.code,{children:"3.14"}),"double","Floating-point literals are double."],[e.jsx(n.code,{children:"true"}),"bool","Boolean literal."],[e.jsx(n.code,{children:'"hello"'}),"string","String literal."],[e.jsx(n.code,{children:"'A'"}),"char","Character literal."],[e.jsx(n.code,{children:"[1, 2, 3]"}),"int[]","Collection literals are arrays when no target type forces another shape."],[e.jsx(n.code,{children:"1..10"}),"Range","Range expression."],[e.jsx(n.code,{children:"new List<int>()"}),"List&lt;int&gt;","Generic construction with explicit arguments."],[e.jsx(n.code,{children:"Make()"}),"return type of Make","Call expressions inherit the callee return type."]]}),`
`,e.jsx(t,{children:e.jsx(n.p,{children:"Because the type is fixed at the declaration, later assignments must match it:"})}),`
`,e.jsx(s,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  count := 10;
  count = 20;          // OK -- count is still int

  // count = "twenty"; // ERROR -- cannot assign string to int
  println(count);
}`,language:"csharp",filename:"inference_fixed_type.shard"}),`
`,e.jsx(r,{children:"When to use it"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:["Use ",e.jsx(i,{children:":="})," whenever the initializer already says everything important about the type and the explicit annotation would add noise. Typical places are:"]})}),`
`,e.jsxs(c,{children:[e.jsx("li",{children:"Local variables inside methods."}),e.jsxs("li",{children:["The initializer of a C-style ",e.jsx(i,{children:"for"})," loop, because it is parsed as a normal statement."]}),e.jsxs("li",{children:["The iteration variable of ",e.jsx(i,{children:"foreach"})," and ",e.jsx(i,{children:"for..in"})," loops, where the type is inferred from the enumerable or range."]}),e.jsx("li",{children:"Generic method calls where the type arguments can be inferred from the arguments."})]}),`
`,e.jsx(t,{children:e.jsx(n.p,{children:"You must still write explicit types in places where there is no initializer expression to infer from:"})}),`
`,e.jsx(d,{headers:["Location","Inference allowed?","Reason"],rows:[[e.jsx(n.code,{children:"Local variable"}),"Yes","Initializer expression is available."],[e.jsx(n.code,{children:"for init statement"}),"Yes","Parsed as a normal variable statement."],[e.jsx(n.code,{children:"foreach variable"}),"Yes","Inferred from IEnumerable&lt;T&gt; or range."],[e.jsx(n.code,{children:"for..in variable"}),"Yes","Inferred from range."],[e.jsx(n.code,{children:"Field"}),"No","Fields require an explicit type annotation."],[e.jsx(n.code,{children:"Parameter"}),"No","Callers must know the expected parameter type."],[e.jsx(n.code,{children:"Return type"}),"No","Method contracts are always explicit."],[e.jsx(n.code,{children:"Property"}),"No","Property declarations require an explicit type."]]}),`
`,e.jsx(o,{tone:"blue",children:e.jsxs(n.p,{children:["The parser also rejects ",e.jsx(i,{children:"var x = ..."}),". ShardScript does not use the ",e.jsx(i,{children:"var"})," keyword for inference; use ",e.jsx(i,{children:"x := ..."})," instead."]})}),`
`,e.jsx(r,{children:"Remarks"}),`
`,e.jsx(t,{children:e.jsx(n.p,{children:`The following sections cover the compiler mechanics, edge cases, and interactions with other language
features that govern type inference.`})}),`
`,e.jsx(r,{children:"How inference works at compile time"}),`
`,e.jsx(t,{children:e.jsx(n.p,{children:"The semantic binder performs two passes over the declaration:"})}),`
`,e.jsxs(c,{children:[e.jsxs("li",{children:["During collection, the variable is created with type ",e.jsx(i,{children:"any"}),"."]}),e.jsx("li",{children:"During binding, the initializer expression is visited and its type is computed."}),e.jsxs("li",{children:["If the variable’s type is ",e.jsx(i,{children:"any"}),", it is replaced by the initializer’s type."]}),e.jsxs("li",{children:["If the variable already has a concrete type (because you wrote ",e.jsx(i,{children:"name: Type = value"}),"), the binder checks assignability instead."]})]}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:["This means ",e.jsx(i,{children:":="})," is not a special runtime type. The emitted bytecode is identical to an explicit declaration; the compiler simply filled in the annotation for you."]})}),`
`,e.jsx(r,{children:"Numeric literals and widening"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:["Integer literals are always ",e.jsx(i,{children:"int"})," and floating-point literals are always ",e.jsx(i,{children:"double"}),". There is no suffix syntax to request ",e.jsx(i,{children:"byte"})," or ",e.jsx(i,{children:"char"})," from a literal. If you need a smaller numeric type, declare it explicitly:"]})}),`
`,e.jsx(s,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  i := 42;        // int
  d := 3.14;      // double
  b: byte = 255;  // explicit byte -- cannot be inferred from the literal

  println(i);
  println(d);
  println(b);
}`,language:"csharp",filename:"inference_numeric.shard"}),`
`,e.jsx(r,{children:"Null initializers"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:["Initializing a variable with ",e.jsx(i,{children:"null"})," leaves the compiler without enough information to choose a concrete type. Use an explicit annotation when the value starts as null:"]})}),`
`,e.jsx(s,{code:`using stdio;

namespace demo;

public class Widget
{
  public Name: string;

  public init(name: string)
  {
      this.Name = name;
  }
}

public static func Main() -> void
{
  // found := null;              // ERROR -- cannot infer type from null
  found: Widget = null;          // OK -- type is explicit

  if (found != null)
  {
      println(found.Name);
  }
  else
  {
      println("not found");
  }
}`,language:"csharp",filename:"inference_null.shard"}),`
`,e.jsx(r,{children:"Collection and range inference"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:["Array literals infer their element type from the first element. All elements must be compatible with that type. An empty array literal ",e.jsx(i,{children:"[]"})," cannot be inferred on its own unless it appears in a context with a known element type:"]})}),`
`,e.jsx(s,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  numbers := [10, 20, 30];     // int[]
  range := [1..10];            // Range[] because the literal contains Range values

  println(numbers.Length);     // 3
  println(range.Length);       // 1

  // empty: int[] = [];        // OK only with an explicit target type
}`,language:"csharp",filename:"inference_collections.shard"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:["In ",e.jsx(i,{children:"foreach"})," loops, the iteration variable is inferred from the collection’s element type. A range expression yields ",e.jsx(i,{children:"int"}),":"]})}),`
`,e.jsx(s,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  foreach (i in 0..3)
  {
      println(i);     // 0, 1, 2  -- i is int
  }

  names := ["one", "two", "three"];
  foreach (name in names)
  {
      println(name);  // name is string
  }
}`,language:"csharp",filename:"inference_foreach.shard"}),`
`,e.jsx(r,{children:"Generic method inference"}),`
`,e.jsx(t,{children:e.jsx(n.p,{children:"When you call a generic method without explicit type arguments, the compiler tries to infer each type parameter by matching the method’s parameter types against the argument types you supplied. Inference succeeds only when every type parameter is determined unambiguously:"})}),`
`,e.jsx(s,{code:`using stdio;

namespace demo;

public class Factory
{
  public static func Make<T>(value: T) -> Container<T>
  {
      c: Container<T> = new Container<T>();
      c.Value = value;
      return c;
  }
}

public class Container<T>
{
  public Value: T;
}

public static func Main() -> void
{
  c := Factory.Make(42);      // T is inferred as int
  println(c.Value);           // 42

  s := Factory.Make("hi");    // T is inferred as string
  println(s.Value);           // hi
}`,language:"csharp",filename:"inference_generic_method.shard"}),`
`,e.jsx(t,{children:e.jsx(n.p,{children:"If the compiler cannot infer every type parameter, you must supply them explicitly:"})}),`
`,e.jsx(s,{code:`using stdio;

namespace demo;

public class Tool
{
  public static func Create<T, U>() -> Pair<T, U>
  {
      return new Pair<T, U>();
  }
}

public class Pair<T, U>
{
  public First: T;
  public Second: U;
}

public static func Main() -> void
{
  // p := Tool.Create();              // ERROR -- T and U have no argument sources
  p: Pair<int, string> = Tool.Create<int, string>();  // OK
  println("created");
}`,language:"csharp",filename:"inference_generic_explicit.shard"}),`
`,e.jsx(r,{children:"Interplay with method overloads"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:["Method overload resolution runs ",e.jsx("strong",{children:"after"})," the argument expressions have been typed. That means an inferred local variable already has its concrete type before it is passed to an overloaded method. Overload resolution then picks the most specific matching signature:"]})}),`
`,e.jsx(s,{code:`using stdio;

namespace demo;

public class Printer
{
  public static func Show(value: int) -> void
  {
      println("int: " + value);
  }

  public static func Show(value: double) -> void
  {
      println("double: " + value);
  }
}

public static func Main() -> void
{
  i := 42;            // int
  d := 3.14;          // double

  Printer.Show(i);    // resolves to Show(int)
  Printer.Show(d);    // resolves to Show(double)
}`,language:"csharp",filename:"inference_overloads.shard"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:["If you pass an untyped ",e.jsx(i,{children:"null"})," literal directly, overload resolution has no concrete type to match and will fail unless there is an ",e.jsx(i,{children:"any"})," parameter. Assign the null to a typed variable first, or cast it:"]})}),`
`,e.jsx(s,{code:`using stdio;

namespace demo;

public class Box
{
  public static func Check(value: string) -> void
  {
      if (value == null)
      {
          println("null string");
      }
      else
      {
          println("string: " + value);
      }
  }
}

public static func Main() -> void
{
  s: string = null;
  Box.Check(s);       // OK -- s is typed as string
}`,language:"csharp",filename:"inference_overload_null.shard"}),`
`,e.jsx(r,{children:"The any fallback"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:["ShardScript has an ",e.jsx(i,{children:"any"})," type that bypasses static checking. You can request it explicitly with ",e.jsx(i,{children:"x: any = ..."}),". A variable declared with ",e.jsx(i,{children:":="})," never becomes ",e.jsx(i,{children:"any"})," unless the initializer itself evaluates to ",e.jsx(i,{children:"any"}),", which can happen when calling an external or native method whose return type was not specialized."]})}),`
`,e.jsx(o,{tone:"amber",children:e.jsxs(n.p,{children:["Relying on ",e.jsx(i,{children:"any"})," disables compile-time type safety and may postpone errors to runtime. Prefer explicit annotations or concrete inferred types in normal code."]})}),`
`,e.jsx(r,{children:"Common mistakes"}),`
`,e.jsx(d,{headers:["Mistake","Why it fails","Fix"],rows:[[e.jsx(n.code,{children:"var x = 10;"}),"ShardScript does not use 'var'.",e.jsxs(e.Fragment,{children:[e.jsx(n.code,{children:"x := 10;"})," or ",e.jsx(n.code,{children:"x: int = 10;"})]})],[e.jsx(n.code,{children:"x := null;"}),"null has no concrete type.",e.jsx(e.Fragment,{children:e.jsx(n.code,{children:"x: Widget = null;"})})],[e.jsx(n.code,{children:'x := 10; x = "ten";'}),"Inferred type is int, not string.","Use separate variables or a common base type."],[e.jsx(n.code,{children:"x := [];"}),"Empty collection has no element type.",e.jsx(e.Fragment,{children:e.jsx(n.code,{children:"x: int[] = [];"})})],[e.jsx(n.code,{children:"Factory.Make();"}),"No arguments to infer T from.",e.jsxs(e.Fragment,{children:[e.jsx(n.code,{children:"Factory.Make<int>();"})," or provide an argument."]})]]}),`
`,e.jsx(r,{children:"Examples"}),`
`,e.jsx(t,{children:e.jsx(n.p,{children:"The following program demonstrates inference in a single realistic method, including locals, loops, and generic helpers:"})}),`
`,e.jsx(s,{code:`using stdio;
using collections;

namespace demo;

public class Counter
{
  public static func Sum(values: IEnumerable<int>) -> int
  {
      total := 0;

      foreach (value in values)
      {
          total = total + value;
      }

      return total;
  }
}

public static func Main() -> void
{
  numbers := [1, 2, 3, 4, 5];     // int[]
  result := Counter.Sum(numbers); // int, with T inferred from the argument

  for (i := 0; i < result; i++)   // i is int, inferred from the literal 0
  {
      if (i % 2 == 0)
      {
          println(i);             // 0, 2, 4
      }
  }

  println("sum = " + result);     // sum = 15
}`,language:"csharp",filename:"inference_complete.shard"}),`
`,e.jsx(t,{children:e.jsx(n.p,{children:"The next example shows explicit annotations used where inference is impossible, such as fields, null initializers, and generic construction:"})}),`
`,e.jsx(s,{code:`using stdio;

namespace demo;

public class Node<T>
{
  public Value: T;
  public Next: Node<T>;

  public init(value: T)
  {
      this.Value = value;
      this.Next = null;
  }
}

public static func Main() -> void
{
  head: Node<string> = new Node<string>("first");
  head.Next = new Node<string>("second");

  current := head;                            // inferred as Node<string>
  while (current != null)
  {
      println(current.Value);
      current = current.Next;
  }
}`,language:"csharp",filename:"inference_mixed.shard"}),`
`,e.jsx(o,{tone:"blue",children:e.jsx(n.p,{children:"When in doubt, add an explicit annotation. Inference is a convenience, not a requirement, and explicit types often make the intent clearer in complex generic code."})})]})}function u(a={}){const{wrapper:n}=a.components||{};return n?e.jsx(n,{...a,children:e.jsx(h,{...a})}):h(a)}function l(a,n){throw new Error("Expected component `"+a+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};
