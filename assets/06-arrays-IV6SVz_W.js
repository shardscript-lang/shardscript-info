import{j as e}from"./index-DIkNH1R5.js";function h(t){const r={code:"code",p:"p",...t.components},{Bullet:i,Callout:d,CodeBlock:l,DocsTable:o,H2:a,InlineCode:n,Prose:s}=r;return i||c("Bullet"),d||c("Callout"),l||c("CodeBlock"),o||c("DocsTable"),a||c("H2"),n||c("InlineCode"),s||c("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(s,{children:e.jsxs(r.p,{children:["A ",e.jsx("strong",{children:"ShardScript array"}),` is a fixed-size, homogeneous, indexed
sequence allocated on the GC heap. Arrays are written with square-bracket
literals, support element read and write through an indexer, expose their size
through the `,e.jsx(n,{children:"Length"})," property, implement"," ",`
`,e.jsx(n,{children:"IEnumerable<T>"}),", and can be iterated with"," ",`
`,e.jsx(n,{children:"foreach"}),"."]})}),`
`,e.jsx(a,{children:"Summary"}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:["Arrays store a fixed number of elements of a single type ",e.jsx(n,{children:"T"}),`,
accessed by a zero-based `,e.jsx(n,{children:"int"}),` index. They are created with
literals such as `,e.jsx(n,{children:"[1, 2, 3]"}),", by assigning a range such as"," ",`
`,e.jsx(n,{children:"1..5"}),", or with sized creation such as"," ",`
`,e.jsx(n,{children:"new int[10]"}),`. The element type, length, index, and enumerable
behavior are all verified by the compiler; out-of-bounds access produces a
runtime exception.`]})}),`
`,e.jsx(a,{children:"Syntax"}),`
`,e.jsx(o,{headers:["Construct","Syntax","Description"],rows:[["Array type",e.jsx(r.code,{children:"T[]"}),"A fixed-size array whose element type is T."],["Array literal",e.jsx(r.code,{children:"[expr1, expr2, ...]"}),"Creates a new array containing the given elements."],["Empty literal",e.jsx(r.code,{children:"[]"}),"An array literal with no elements (requires a target type for inference)."],["Sized creation",e.jsx(r.code,{children:"new T[size]"}),"Creates a new array of T with the given number of elements, zero-initialized."],["Range-to-array",e.jsx(r.code,{children:"lower..upper"}),"Produces an int[] from lower (inclusive) to upper (exclusive)."],["Inclusive range",e.jsx(r.code,{children:"lower..&upper"}),"Produces an int[] from lower (inclusive) to upper (inclusive)."],["Indexer get",e.jsx(r.code,{children:"array[index]"}),"Reads the element at the zero-based index."],["Indexer set",e.jsx(r.code,{children:"array[index] = value"}),"Replaces the element at the zero-based index."],["Length",e.jsx(r.code,{children:"array.Length"}),"Returns the number of elements as int."],["Iteration",e.jsx(r.code,{children:"foreach (item in array) "}),"Iterates every element of the array."]]}),`
`,e.jsx(a,{children:"Parameters / Arguments"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"T"}),` — the element type. Must be a known ShardScript type
such as `,e.jsx(n,{children:"int"}),", ",e.jsx(n,{children:"double"}),","," ",`
`,e.jsx(n,{children:"byte"}),", ",e.jsx(n,{children:"string"}),", ",e.jsx(n,{children:"char"}),`,
or a class/struct type.`]})}),e.jsx(i,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"exprN"})," — an expression whose type matches"," ",`
`,e.jsx(n,{children:"T"}),". Every element in a literal must have the same type."]})}),e.jsx(i,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"index"})," — an ",e.jsx(n,{children:"int"}),` expression giving
the zero-based position to read or write.`]})}),e.jsx(i,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"value"})," — an expression assignable to the array's element type."]})}),e.jsx(i,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"lower"}),", ",e.jsx(n,{children:"upper"})," —"," ",`
`,e.jsx(n,{children:"int"}),` expressions defining the bounds of a range. Non-integer
bounds are rejected at compile time.`]})}),e.jsx(i,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"item"})," — the loop variable introduced by"," ",`
`,e.jsx(n,{children:"foreach"}),". Its type is inferred from the array's element type."]})}),e.jsx(i,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"size"})," — an ",e.jsx(n,{children:"int"}),` expression that specifies how
many elements the new array should hold. The expression is evaluated once at creation time.`]})})]}),`
`,e.jsx(a,{children:"Returns"}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:["An array literal or range expression evaluates to an object of type"," ",`
`,e.jsx(n,{children:"T[]"}),". The ",e.jsx(n,{children:"Length"}),` property evaluates
to `,e.jsx(n,{children:"int"}),`. An indexer get expression evaluates to the element
type `,e.jsx(n,{children:"T"}),". An indexer set expression evaluates to"," ",`
`,e.jsx(n,{children:"void"}),"."]})}),`
`,e.jsx(a,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Compile error — type mismatch:"})," ",`
`,e.jsx(n,{children:'[1, "two"]'}),` is rejected because the elements do not share
a single type.`]})}),e.jsx(i,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Compile error — untyped empty literal:"})," ",`
`,e.jsx(n,{children:"[]"}),` cannot infer an element type on its own. An explicit
target type such as `,e.jsx(n,{children:"int[] empty = [];"}),` is accepted by the
grammar but is not yet implemented in the current compiler.`]})}),e.jsx(i,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Compile error — non-int index:"})," indexing with"," ",`
`,e.jsx(n,{children:"double"}),", ",e.jsx(n,{children:"string"}),`, or another
non-integer type is rejected.`]})}),e.jsx(i,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Compile error — non-enumerable foreach:"})," ",`
`,e.jsx(n,{children:"foreach"})," requires an expression implementing"," ",`
`,e.jsx(n,{children:"IEnumerable<T>"}),"."]})}),e.jsx(i,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Runtime error — index out of range:"}),` reading or writing with an
index outside `,e.jsx(n,{children:"0 .. Length - 1"})," throws."]})}),e.jsx(i,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Compile error — non-int array size:"})," ",`
`,e.jsx(n,{children:"new T[size]"})," requires ",e.jsx(n,{children:"size"})," to be an"," ",`
`,e.jsx(n,{children:"int"})," expression."]})}),e.jsx(i,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Runtime error — null array access:"})," indexing or reading"," ",`
`,e.jsx(n,{children:"Length"})," on a ",e.jsx(n,{children:"null"}),` array reference
throws a null-reference exception.`]})})]}),`
`,e.jsx(a,{children:"Remarks"}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:["Arrays in ShardScript are ",e.jsx("strong",{children:"fixed-size"}),`. Once created, the length
cannot change. For a dynamically sized sequence, use`," ",`
`,e.jsx(n,{children:"List<T>"})," from the ",e.jsx(n,{children:"collections"})," ",`
shard.`]})}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Sized creation."})," The expression ",e.jsx(n,{children:"new T[size]"}),` allocates a
fixed-length array whose element type is `,e.jsx(n,{children:"T"}),`. The size expression must
evaluate to `,e.jsx(n,{children:"int"}),`. Value-type elements are zero-initialized; reference-type
elements are initialized to `,e.jsx(n,{children:"null"}),`. This is useful when you know the
required length ahead of time and intend to fill the array element by element.`]})}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:["Every array type implicitly implements"," ",`
`,e.jsx(n,{children:"IEnumerable<T>"}),", where ",e.jsx(n,{children:"T"}),` is
the element type. This allows the same `,e.jsx(n,{children:"foreach"}),` loop to
iterate arrays, lists, dictionaries, queues, stacks, and ranges.`]})}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:["Ranges are a compact way to produce an ",e.jsx(n,{children:"int[]"}),". The expression"," ",`
`,e.jsx(n,{children:"1..5"})," creates the array ",e.jsx(n,{children:"[1, 2, 3, 4]"}),`;
`,e.jsx(n,{children:"1..&5"})," creates ",e.jsx(n,{children:"[1, 2, 3, 4, 5]"}),`. A
bracketed range literal such as `,e.jsx(n,{children:"[1..5]"})," is ",e.jsx("em",{children:"not"}),` a
single-element array of ranges — it is parsed as the range value itself.`]})}),`
`,e.jsx(d,{tone:"amber",title:"Ranges count upward only",children:e.jsxs(r.p,{children:["Range expressions always count upward with a step of ",e.jsx(n,{children:"1"}),`.
Descending sequences, custom steps, or empty descending ranges require a C-style`," ",`
`,e.jsx(n,{children:"for"})," loop or another explicit construction."]})}),`
`,e.jsx(s,{children:e.jsx(r.p,{children:`The VM stores reference-type elements as object references and value-type elements
inline. Setting a reference-type element updates reference counts for garbage
collection; setting a value-type element copies the value into the array's backing
storage.`})}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:[`Array bounds are checked at runtime. Negative indices are not supported and, because
the runtime casts the index to `,e.jsx(n,{children:"std::size_t"}),`, they are treated
as very large positive values and will immediately fail the bounds check.`]})}),`
`,e.jsx(a,{children:"Examples"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Basic literals, indexing, and Length"})}),`
`,e.jsx(l,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  // Explicitly typed array literal.
  numbers: int[] = [10, 20, 30];

  println(numbers.Length);    // 3
  println(numbers[0]);        // 10
  println(numbers[2]);        // 30

  // Mutate an element by index.
  numbers[1] = 25;
  println(numbers[1]);        // 25

  // Element access can be used in expressions.
  sum: int = numbers[0] + numbers[1] + numbers[2];
  println(sum);               // 65
}`,language:"csharp",filename:"arrays_basic.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Sized creation with new"})}),`
`,e.jsx(l,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  // Create a fixed-size int array and fill it.
  values: int[] = new int[4];
  values[0] = 10;
  values[1] = 20;
  values[2] = 30;
  values[3] = 40;

  println(values.Length);     // 4
  println(values[0]);         // 10

  // Reference-type elements start as null.
  objects: object[] = new object[3];
  println(objects[0] == null); // true
}`,language:"csharp",filename:"arrays_sized_creation.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Reference-type elements and member access"})}),`
`,e.jsx(l,{code:`using stdio;

namespace demo;

public class Item
{
  public Value: int;
}

public static func Main() -> void
{
  items: Item[] = [new Item(), new Item()];

  // Member access on an indexed element.
  items[0].Value = 7;
  items[1].Value = 14;

  println(items[0].Value);    // 7
  println(items[1].Value);    // 14
}`,language:"csharp",filename:"arrays_objects.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Arrays from ranges"})}),`
`,e.jsx(l,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  // Half-open range: includes 1, excludes 5.
  halfOpen: int[] = 1..5;
  println(halfOpen.Length);   // 4

  // Inclusive range: includes both bounds.
  inclusive: int[] = 1..&5;
  println(inclusive.Length);  // 5

  // A single range inside brackets is still a range, not a nested array.
  alsoRange: int[] = [1..5];
  println(alsoRange.Length);  // 4

  foreach (n in halfOpen)
  {
      print(n);               // 1234
  }
  println("");
}`,language:"csharp",filename:"arrays_ranges.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Iteration with foreach"})}),`
`,e.jsx(l,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  names: string[] = ["alpha", "beta", "gamma"];

  foreach (name in names)
  {
      println(name);
  }

  // Arrays implement IEnumerable<T>, so they can be assigned to an interface variable.
  enumerable: IEnumerable<string> = names;
  foreach (item in enumerable)
  {
      println(item);
  }
}`,language:"csharp",filename:"arrays_foreach.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Common mistakes and edge cases"})}),`
`,e.jsx(l,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  values: int[] = [10, 20, 30];

  // Bounds-checked access: this index is valid.
  lastIndex: int = values.Length - 1;
  println(values[lastIndex]);     // 30

  // The following would fail at runtime:
  // println(values[3]);          // IndexOutOfRangeException
  // println(values[-1]);         // Negative index is treated as huge size_t, also fails

  // Type mismatch is caught at compile time:
  // values[0] = "wrong";         // ERROR: string is not assignable to int

  // Mixed literals are rejected:
  // mixed: object[] = [1, "two"]; // ERROR: elements must share one type
}`,language:"csharp",filename:"arrays_edge_cases.shard"}),`
`,e.jsx(d,{tone:"amber",title:"Empty array literals",children:e.jsxs(r.p,{children:["Writing ",e.jsx(n,{children:"[]"}),` on its own is ambiguous because the compiler has
no element type to infer. An explicitly typed declaration such as`," ",`
`,e.jsx(n,{children:"int[] empty = [];"}),` is the intended syntax, but it is not yet
accepted by the current compiler. Today you can obtain a zero-length`," ",`
`,e.jsx(n,{children:"int[]"})," with ",e.jsx(n,{children:"0..0"})," or assign"," ",`
`,e.jsx(n,{children:"null"})," for reference-element arrays."]})})]})}function p(t={}){const{wrapper:r}=t.components||{};return r?e.jsx(r,{...t,children:e.jsx(h,{...t})}):h(t)}function c(t,r){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
