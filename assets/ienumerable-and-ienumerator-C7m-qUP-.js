import{j as e}from"./index-CoWj0v4y.js";function h(a){const r={code:"code",p:"p",...a.components},{Bullet:o,Callout:d,CodeBlock:s,DocsTable:c,H2:i,InlineCode:n,Prose:t}=r;return o||l("Bullet"),d||l("Callout"),s||l("CodeBlock"),c||l("DocsTable"),i||l("H2"),n||l("InlineCode"),t||l("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:e.jsxs(r.p,{children:["The ",e.jsx(n,{children:"shard.collections"}),` library is built on two generic interfaces:
`,e.jsx(n,{children:"IEnumerable<T>"})," and ",e.jsx(n,{children:"IEnumerator<T>"}),`.
Together they form the `,e.jsx("strong",{children:"iteration contract"}),` that powers the
`,e.jsx(n,{children:"foreach"}),` statement, generic algorithms, and every standard
collection type.`]})}),`
`,e.jsx(i,{children:"Summary"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"IEnumerable<T>"}),` represents a readable sequence of elements of
type `,e.jsx(n,{children:"T"}),". ",e.jsx(n,{children:"IEnumerator<T>"}),` is the cursor
that walks that sequence one element at a time. The `,e.jsx(n,{children:"foreach"}),`
statement calls `,e.jsx(n,{children:"GetEnumerator()"}),`, then repeatedly calls
`,e.jsx(n,{children:"MoveNext()"})," and reads ",e.jsx(n,{children:"Current"}),` until the
sequence is exhausted.`]})}),`
`,e.jsx(i,{children:"Syntax"}),`
`,e.jsx(t,{children:e.jsx(r.p,{children:`Both interfaces are declared in the global namespace by the compiler. They are written
exactly as shown here when used as parameter types, return types, or variable types.`})}),`
`,e.jsx(s,{code:`// Interface signatures (compiler-provided).
interface IEnumerable<T>
{
  func GetEnumerator() -> IEnumerator<T>;
}

interface IEnumerator<T>
{
  func MoveNext() -> bool;
  prop Current: T;
}`,language:"csharp",filename:"ienumerable_ienumerator.shard"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:["The ",e.jsx(n,{children:"foreach"}),` statement uses the following syntax. The loop variable
type may be explicit or inferred with `,e.jsx(n,{children:":"}),"."]})}),`
`,e.jsx(s,{code:`foreach (item in source)
{
  // body
}`,language:"csharp",filename:"foreach_syntax.shard"}),`
`,e.jsx(i,{children:"Parameters / Arguments"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"IEnumerable<T>"})," members:"]})}),`
`,e.jsx(c,{headers:["Member","Parameters","Returns","Description"],rows:[[e.jsx(r.code,{children:"GetEnumerator()"}),e.jsx(e.Fragment,{}),e.jsx(e.Fragment,{children:e.jsx(n,{children:"IEnumerator<T>"})}),"Returns a new enumerator positioned before the first element of the sequence."]]}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"IEnumerator<T>"})," members:"]})}),`
`,e.jsx(c,{headers:["Member","Parameters","Returns","Description"],rows:[[e.jsx(r.code,{children:"MoveNext()"}),e.jsx(e.Fragment,{}),e.jsx(e.Fragment,{children:e.jsx(n,{children:"bool"})}),"Advances the cursor to the next element. Returns <InlineCode>true</InlineCode> if a valid element is available; otherwise <InlineCode>false</InlineCode>."],[e.jsx(r.code,{children:"Current"}),e.jsx(e.Fragment,{}),e.jsx(e.Fragment,{children:e.jsx(n,{children:"T"})}),"Gets the element at the current cursor position. Valid only after a successful <InlineCode>MoveNext()</InlineCode> call."]]}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:["The ",e.jsx(n,{children:"foreach"})," statement accepts these arguments:"]})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(o,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Loop variable"}),` — A local variable name
that receives the current element. The type is inferred from the enumerator's element
type unless explicitly declared.`]})}),e.jsx(o,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Source expression"}),` — Any expression whose
type implements `,e.jsx(n,{children:"IEnumerable<T>"}),`. Arrays, lists, dictionaries,
queues, stacks, and ranges are all valid sources.`]})})]}),`
`,e.jsx(i,{children:"Returns"}),`
`,e.jsx(c,{headers:["Member","Return Value"],rows:[[e.jsx(r.code,{children:"GetEnumerator()"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"IEnumerator<T>"})," — a fresh cursor positioned before the first element."]})],[e.jsx(r.code,{children:"MoveNext()"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"bool"})," — ",e.jsx(n,{children:"true"})," while elements remain; ",e.jsx(n,{children:"false"})," when the sequence ends."]})],[e.jsx(r.code,{children:"Current"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"T"})," — the element at the current cursor position."]})],[e.jsx(r.code,{children:"foreach"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"void"})," — the statement itself produces no value."]})]]}),`
`,e.jsx(i,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(o,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Type does not implement IEnumerable<T>"}),` —
Using `,e.jsx(n,{children:"foreach"}),` on a non-enumerable type or passing a non-enumerable
argument to a parameter typed as `,e.jsx(n,{children:"IEnumerable<T>"}),` fails semantic
analysis.`]})}),e.jsx(o,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Current before MoveNext"}),` — Accessing
`,e.jsx(n,{children:"Current"})," before the first successful ",e.jsx(n,{children:"MoveNext()"}),`
call, or after `,e.jsx(n,{children:"MoveNext()"})," has returned ",e.jsx(n,{children:"false"}),`,
yields undefined behavior. The standard enumerators return the underlying storage element at
the internal index, which is typically `,e.jsx(n,{children:"null"})," or the last valid value."]})}),e.jsx(o,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Invalid generic type argument"}),` — Passing a
concrete element type that does not match the source's element type (for example,
`,e.jsx(n,{children:"IEnumerable<string>"})," for an ",e.jsx(n,{children:"int[]"}),`)
produces a compile-time type mismatch error.`]})})]}),`
`,e.jsx(i,{children:"Remarks"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Compiler-provided interfaces."})," ",e.jsx(n,{children:"IEnumerable<T>"}),`
and `,e.jsx(n,{children:"IEnumerator<T>"}),` are defined as
`,e.jsx(n,{children:"InterfaceSymbol"}),` instances in the compiler's standard type system,
not in user code. This lets the compiler recognize them during semantic analysis before any
library is loaded. Concrete collection types register their conformance with
`,e.jsx(n,{children:"Implements(...)"})," in the native library registration code."]})}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Arrays are implicitly enumerable."}),` The primitive array type is made to
implement `,e.jsx(n,{children:"IEnumerable<T>"}),` through a hidden
`,e.jsx(n,{children:"ArrayEnumerator<T>"}),` class. No wrapping or boxing occurs; the
compiler treats an array as directly compatible with `,e.jsx(n,{children:"IEnumerable<T>"}),"."]})}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"foreach lowering."})," The compiler lowers ",e.jsx(n,{children:"foreach (x in source)"}),`
to the following bytecode pattern:`]})}),`
`,e.jsxs("ol",{className:"space-y-2 text-text-secondary list-decimal pl-5",children:[e.jsxs("li",{children:["Evaluate ",e.jsx(n,{children:"source"}),"."]}),e.jsxs("li",{children:["Call ",e.jsx(n,{children:"GetEnumerator()"})," and store the result in a hidden local."]}),e.jsxs("li",{children:["Loop: call ",e.jsx(n,{children:"MoveNext()"}),"; jump to the end if it returns ",e.jsx(n,{children:"false"}),"."]}),e.jsxs("li",{children:["Call the ",e.jsx(n,{children:"Current"})," getter and assign the value to the loop variable."]}),e.jsx("li",{children:"Execute the loop body, then jump back to step 3."})]}),`
`,e.jsx(d,{tone:"blue",children:e.jsxs(r.p,{children:["The current emitter does not emit a ",e.jsx(n,{children:"Dispose"}),` call for the enumerator
when the loop exits. Standard ShardScript enumerators are unmanaged structs or classes with
no resources, so this is safe today. If you implement a custom enumerator that holds native
resources, dispose it manually with a `,e.jsx(n,{children:"defer"})," block."]})}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Interface dispatch."})," When ",e.jsx(n,{children:"GetEnumerator()"}),` is called
through a variable typed as `,e.jsx(n,{children:"IEnumerable<T>"}),`, the compiler emits
`,e.jsx(n,{children:"CALLINTERFACE"}),`. The VM resolves the concrete implementation at runtime
through the `,e.jsx(n,{children:"InterfaceMethodMap"}),`. Each collection type registers both
the interface and its matching enumerator type during library loading.`]})}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Enumerators are independent cursors."})," Calling ",e.jsx(n,{children:"GetEnumerator()"}),`
twice on the same collection returns two independent cursors. Modifying the collection through
its own methods while an enumerator is active does not invalidate the enumerator; the enumerator
continues to walk the snapshot of backing storage it was created with. This means additions made
after the enumerator was created will not appear in the enumeration.`]})}),`
`,e.jsx(i,{children:"Examples"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Basic foreach over List<T>."})}),`
`,e.jsx(s,{code:`using stdio;
using collections;

namespace demo;

public static func Main() -> void
{
  list: List<int> = new List<int>();
  list.Add(10);
  list.Add(20);
  list.Add(30);

  foreach (n in list)
  {
      print(n);
      print(" ");
  }
  println("");   // 10 20 30
}`,language:"csharp",filename:"list_foreach.shard"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Manual enumeration with IEnumerator<T>."}),` This is the exact pattern
`,e.jsx(n,{children:"foreach"})," compiles to."]})}),`
`,e.jsx(s,{code:`using stdio;
using collections;

namespace demo;

public static func Main() -> void
{
  list: List<int> = new List<int>();
  list.Add(7);
  list.Add(8);
  list.Add(9);

  e: IEnumerator<int> = list.GetEnumerator();
  while (e.MoveNext())
  {
      println(e.Current);   // 7, 8, 9 (one per line)
  }
}`,language:"csharp",filename:"manual_enumerator.shard"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Arrays as IEnumerable<T>."}),` Arrays can be assigned directly to an
`,e.jsx(n,{children:"IEnumerable<T>"})," variable or passed to generic functions."]})}),`
`,e.jsx(s,{code:`using stdio;
using collections;

namespace demo;

public static func Sum(source: IEnumerable<int>) -> int
{
  total: int = 0;
  foreach (n in source)
  {
      total = total + n;
  }
  return total;
}

public static func Main() -> void
{
  nums: int[] = [10, 20, 30];
  e: IEnumerable<int> = nums;

  println(Sum(e));   // 60
  println(Sum(nums));   // 60 (array implicitly implements IEnumerable<int>)
}`,language:"csharp",filename:"array_ienumerable.shard"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Enumerating a Dictionary<K, V>."}),` The enumerator yields
`,e.jsx(n,{children:"KeyValuePair<K, V>"}),` values with public
`,e.jsx(n,{children:"Key"})," and ",e.jsx(n,{children:"Value"})," fields."]})}),`
`,e.jsx(s,{code:`using stdio;
using collections;

namespace demo;

public static func Main() -> void
{
  ages: Dictionary<string, int> = new Dictionary<string, int>();
  ages.Add("alice", 30);
  ages.Add("bob", 25);

  foreach (pair in ages)
  {
      println(pair.Key + " = " + pair.Value);
  }
  // Output:
  // alice = 30
  // bob = 25
}`,language:"csharp",filename:"dictionary_foreach.shard"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Multiple independent enumerators."}),` Each call to
`,e.jsx(n,{children:"GetEnumerator()"})," produces a separate cursor."]})}),`
`,e.jsx(s,{code:`using stdio;
using collections;

namespace demo;

public static func Main() -> void
{
  list: List<int> = new List<int>();
  list.Add(1);
  list.Add(2);

  a: IEnumerator<int> = list.GetEnumerator();
  b: IEnumerator<int> = list.GetEnumerator();

  a.MoveNext();
  b.MoveNext();
  b.MoveNext();

  println(a.Current);   // 1
  println(b.Current);   // 2
}`,language:"csharp",filename:"independent_enumerators.shard"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Edge case: Current outside the valid window."}),` Always call
`,e.jsx(n,{children:"MoveNext()"})," before reading ",e.jsx(n,{children:"Current"}),"."]})}),`
`,e.jsx(s,{code:`using stdio;
using collections;

namespace demo;

public static func Main() -> void
{
  list: List<int> = new List<int>();
  list.Add(100);

  e: IEnumerator<int> = list.GetEnumerator();

  // Current is undefined here; do not rely on it before MoveNext.
  if (e.MoveNext())
  {
      println(e.Current);   // 100
  }

  // Current is also undefined after MoveNext returns false.
  while (e.MoveNext())
  {
      // No more elements; loop body never runs.
  }
}`,language:"csharp",filename:"current_safety.shard"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Common mistake: modifying the collection during enumeration."}),` The enumerator
holds a reference to the backing storage that existed when it was created. Later additions are
not reflected, and the loop may appear to skip new elements.`]})}),`
`,e.jsx(s,{code:`using stdio;
using collections;

namespace demo;

public static func Main() -> void
{
  list: List<int> = new List<int>();
  list.Add(1);
  list.Add(2);

  // This enumerator captures the current backing array.
  foreach (n in list)
  {
      println(n);

      // The addition allocates a new backing array; the enumerator keeps walking the old one.
      if (n == 1)
      {
          list.Add(99);
      }
  }
  // Output: 1, 2 (99 is not printed by this loop)
}`,language:"csharp",filename:"modification_during_enum.shard"}),`
`,e.jsx(d,{tone:"amber",title:"Custom enumerators",children:e.jsxs(r.p,{children:[`User-defined classes and structs cannot yet implement compiler-standard interfaces such as
`,e.jsx(n,{children:"IEnumerable<T>"})," or ",e.jsx(n,{children:"IEnumerator<T>"}),`
from ShardScript source code. The interfaces are recognized, but explicit interface
implementation and user-authored generic interface implementations are still being finalized.
Today, custom enumeration is best achieved by returning a built-in collection type.`]})}),`
`,e.jsx(i,{children:"Category Summary"}),`
`,e.jsx(c,{headers:["Feature","Members"],rows:[["IEnumerable<T>","GetEnumerator()"],["IEnumerator<T>","MoveNext(), Current"],["foreach lowering","GetEnumerator() → MoveNext() → Current"],["Built-in implementers","Array, List<T>, Dictionary<K, V>, Queue<T>, Stack<T>"]]})]})}function m(a={}){const{wrapper:r}=a.components||{};return r?e.jsx(r,{...a,children:e.jsx(h,{...a})}):h(a)}function l(a,r){throw new Error("Expected component `"+a+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default};
