import{j as e}from"./index-B-x28vAk.js";function d(t){const n={p:"p",...t.components},{Bullet:i,CodeBlock:c,DocsTable:o,H2:a,InlineCode:s,Prose:r}=n;return i||l("Bullet"),c||l("CodeBlock"),o||l("DocsTable"),a||l("H2"),s||l("InlineCode"),r||l("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(a,{children:"Summary"}),`
`,e.jsx(r,{children:e.jsx(n.p,{children:`The ShardScript type system is strictly static: every variable, parameter, field, property, and return
type has a compile-time type. The system distinguishes value types from reference types, supports generic
type parameters, arrays, interface contracts, and enums, and uses explicit casts rather than implicit
numeric widening.`})}),`
`,e.jsx(a,{children:"What problem it solves"}),`
`,e.jsx(r,{children:e.jsx(n.p,{children:`Embedded scripting languages often trade compile-time safety for ease of use. ShardScript keeps the
embedding model lightweight while catching type mismatches, missing members, and contract violations before
the script runs. A clear type system also makes code easier to read, refactor, and call from native code.`})}),`
`,e.jsx(a,{children:"How it works"}),`
`,e.jsx(r,{children:e.jsx(n.p,{children:`Types are resolved during semantic analysis. The compiler checks assignments, argument passing, return
values, interface implementations, and generic instantiations. Once analysis succeeds, the bytecode
emitter uses the resolved types to choose opcodes and layouts. At runtime the virtual machine stores
value types inline and reference types as garbage-collected heap references.`})}),`
`,e.jsx(a,{children:"Key ideas"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Value types."})," ",e.jsx(s,{children:"int"}),", ",e.jsx(s,{children:"double"}),","," ",`
`,e.jsx(s,{children:"bool"}),", ",e.jsx(s,{children:"char"}),", ",e.jsx(s,{children:"byte"}),","," ",`
`,e.jsx(s,{children:"nint"}),", and user-defined ",e.jsx(s,{children:"struct"}),` types are value types.
Assignment copies the value. Value types live inline in locals, object fields, and array slots.`]})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Reference types."})," ",e.jsx(s,{children:"string"}),`, classes, arrays, delegates, and
interface references are reference types. Assignment copies the reference, not the object. Multiple
references can point to the same heap object, so mutations are visible through every reference.`]})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Generics."}),` Classes, structs, methods, delegates, and extension methods can declare type
parameters such as `,e.jsx(s,{children:"T"}),`. The compiler substitutes concrete type arguments at
compile time, and the runtime builds a distinct layout for every instantiation. Type inference can
deduce method type arguments from the call site.`]})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Arrays."})," An array ",e.jsx(s,{children:"T[]"}),` is a fixed-size, homogeneous, indexed
sequence. Arrays are reference types allocated on the GC heap. Bounds are checked at runtime.`]})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Interfaces."}),` An interface declares a contract of methods and properties. A class or struct
implements the contract by providing matching public members. Calls through an interface are dispatched at
runtime.`]})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Enums."}),` Enums are value types that name a set of integral constants. They support equality,
bitwise operations for flags enums, and automatic string formatting through `,e.jsx(s,{children:"ToString()"}),"."]})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Nullable references."})," Reference-type variables may hold ",e.jsx(s,{children:"null"}),`. The
compiler does not track nullability; a `,e.jsx(s,{children:"null"}),` check, a cast followed by a guard, or
a defensive `,e.jsx(s,{children:"is"})," test is required before dereferencing a reference of unknown origin."]})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Explicit conversions."}),` ShardScript does not implicitly widen numeric types on assignment
or argument passing. Use the `,e.jsx(s,{children:"as"}),` operator to convert between scalar primitives or
along an inheritance chain.`]})}),`
`,e.jsx(a,{children:"When to use / When not to use"}),`
`,e.jsx(o,{headers:["Use","Avoid"],rows:[[e.jsx(e.Fragment,{children:"Use value types for small, immutable, frequently-copied data such as coordinates, identifiers, and flags."}),e.jsx(e.Fragment,{children:"Do not use value types for large objects that are shared and mutated through multiple references; prefer classes."})],[e.jsx(e.Fragment,{children:"Use classes for object identity, shared mutable state, and interface implementation."}),e.jsx(e.Fragment,{children:"Do not use classes for pure value semantics where accidental aliasing would cause bugs; prefer structs."})],[e.jsx(e.Fragment,{children:"Use generics when the same algorithm or container works for several concrete types."}),e.jsx(e.Fragment,{children:"Do not use generics when every type argument needs a different implementation; prefer explicit types or interfaces."})],[e.jsx(e.Fragment,{children:"Use interfaces to decouple callers from concrete implementations."}),e.jsx(e.Fragment,{children:"Do not use interfaces for single-concrete-type scenarios where direct calls are clearer and cheaper."})],[e.jsx(e.Fragment,{children:"Use enums for a closed set of named constants."}),e.jsx(e.Fragment,{children:"Do not use enums for open sets or values that need runtime extensibility; prefer constants or classes."})]]}),`
`,e.jsx(a,{children:"Examples"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Value versus reference semantics."})}),`
`,e.jsx(c,{code:`using stdio;

namespace demo;

public struct Point
{
  public X: int;
  public Y: int;
}

public class Counter
{
  public Value: int;
}

public static func Main() -> void
{
  // Value type: assignment copies the whole value.
  a: Point = new Point();
  a.X = 1;
  b: Point = a;
  b.X = 2;
  println(a.X);   // 1
  println(b.X);   // 2

  // Reference type: assignment copies the reference.
  c: Counter = new Counter();
  c.Value = 1;
  d: Counter = c;
  d.Value = 2;
  println(c.Value); // 2
  println(d.Value); // 2
}`,language:"csharp",filename:"value_vs_reference.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Generic container and type inference."})}),`
`,e.jsx(c,{code:`using stdio;

namespace demo;

public class Pair<T>
{
  public First: T;
  public Second: T;
}

public static func MakePair<T>(first: T, second: T) -> Pair<T>
{
  pair: Pair<T> = new Pair<T>();
  pair.First = first;
  pair.Second = second;
  return pair;
}

public static func Main() -> void
{
  // Explicit type argument.
  numbers: Pair<int> = MakePair<int>(10, 20);
  println(numbers.First);   // 10

  // Inferred type argument: T is string from the arguments.
  words: Pair<string> = MakePair("hello", "world");
  println(words.Second);    // world
}`,language:"csharp",filename:"generics_example.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Arrays, ranges, and iteration."})}),`
`,e.jsx(c,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  // Literal array.
  values: int[] = [10, 20, 30];
  println(values.Length);   // 3

  // Range produces an int[].
  range: int[] = 1..4;
  foreach (n in range)
  {
      println(n);           // 1, 2, 3
  }

  // Reference-type array.
  items: string[] = new string[2];
  items[0] = "first";
  items[1] = "second";
  println(items[0]);        // first
}`,language:"csharp",filename:"arrays_example.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Interfaces and polymorphism."})}),`
`,e.jsx(c,{code:`using stdio;

namespace demo;

public interface ILogger
{
  func Log(message: string) -> void;
}

public class ConsoleLogger : ILogger
{
  public func Log(message: string) -> void
  {
      println(message);
  }
}

public static func WriteLog(logger: ILogger, message: string) -> void
{
  logger.Log(message);
}

public static func Main() -> void
{
  logger: ILogger = new ConsoleLogger();
  WriteLog(logger, "typed contract");   // typed contract
}`,language:"csharp",filename:"interfaces_example.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Enums and flags."})}),`
`,e.jsx(c,{code:`using stdio;

namespace demo;

public enum Status
{
  Pending,
  Running,
  Completed
}

public enum Permissions : flags
{
  None,
  Read,
  Write,
  Execute
}

public static func Main() -> void
{
  status: Status = Status.Running;
  println(status);                         // Running

  access: Permissions = Permissions.Read | Permissions.Write;
  println(access);                         // Read | Write
  println(access.HasFlag(Permissions.Read)); // true
}`,language:"csharp",filename:"enums_example.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Explicit casts and null handling."})}),`
`,e.jsx(c,{code:`using stdio;

namespace demo;

public class Shape
{
  public Name: string;

  public init(name: string)
  {
      this.Name = name;
  }
}

public static func Main() -> void
{
  // Explicit numeric cast.
  ratio: double = 7 as double;
  println(ratio);   // 7.0

  // Safe reference cast with a null guard.
  shape: Shape = new Shape("circle");
  maybe: Shape = shape as Shape;

  if (maybe != null)
  {
      println(maybe.Name);   // circle
  }
}`,language:"csharp",filename:"casts_and_nulls.shard"}),`
`,e.jsx(a,{children:"Related articles"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx(s,{children:"Primitive Types"})," — the built-in value and reference types in detail."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx(s,{children:"Variables and Types"})," — declarations, type inference, and scope."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx(s,{children:"Classes"})," — reference types, constructors, methods, and access modifiers."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx(s,{children:"Structs and Classes"})," — choosing between value and reference types."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx(s,{children:"Generic Types"})," — generic classes, methods, delegates, and inference."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx(s,{children:"Interfaces and Abstractions"})," — contracts, implementation, and dispatch."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx(s,{children:"Arrays"})," — literals, indexing, ranges, and iteration."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx(s,{children:"Enums"})," — named constants and flags."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx(s,{children:"Feature Tour"})," — a single program that combines the features above."]})})]})]})}function p(t={}){const{wrapper:n}=t.components||{};return n?e.jsx(n,{...t,children:e.jsx(d,{...t})}):d(t)}function l(t,n){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
