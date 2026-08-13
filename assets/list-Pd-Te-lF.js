import{j as e}from"./index-BQw6jbtc.js";function h(r){const t={code:"code",p:"p",...r.components},{Bullet:l,Callout:d,CodeBlock:a,DocsTable:o,H2:s,InlineCode:n,Prose:i}=t;return l||c("Bullet"),d||c("Callout"),a||c("CodeBlock"),o||c("DocsTable"),s||c("H2"),n||c("InlineCode"),i||c("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(s,{children:"Summary"}),`
`,e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"List<T>"})," is the primary dynamic array collection in"," ",`
`,e.jsx(n,{children:"shard.collections"}),". It stores elements of type"," ",`
`,e.jsx(n,{children:"T"}),` in a contiguous internal array, supports indexed read/write access,
append, remove-at, and enumeration via `,e.jsx(n,{children:"IEnumerable<T>"}),"."]})}),`
`,e.jsx(s,{children:"Syntax"}),`
`,e.jsx(i,{children:e.jsx(t.p,{children:`Declare a list with an explicit element type, then construct it with the default or capacity
initializer.`})}),`
`,e.jsx(a,{code:`using collections;

namespace demo;

public static func Main() -> void
{
  // Empty list with no pre-allocated storage.
  numbers: List<int> = new List<int>();

  // Pre-allocate backing storage for four elements.
  names: List<string> = new List<string>(4);
}`,language:"csharp",filename:"list_syntax.shard"}),`
`,e.jsx(o,{headers:["Constructor","Parameters","Description"],rows:[[e.jsx(t.code,{children:"init()"}),"—","Creates an empty list backed by a zero-length array."],[e.jsx(t.code,{children:"init(capacity: int)"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"capacity"})," — number of slots to pre-allocate."]}),"Creates a list with a pre-allocated internal array. Negative values are clamped to 0."]]}),`
`,e.jsx(s,{children:"Parameters / Arguments"}),`
`,e.jsx(o,{headers:["Member","Parameters","Description"],rows:[[e.jsx(t.code,{children:"T"}),"—","The element type specified when the generic class is closed (for example, int, string, or a user-defined class)."],[e.jsx(t.code,{children:"Length"}),"—","Read-only property. Returns the number of elements currently stored in the list."],[e.jsx(t.code,{children:"[index: int]"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"index"})," — zero-based position."]}),"Indexer that reads or writes the element at the specified position."],[e.jsx(t.code,{children:"Add(item: T)"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"item"})," — value to append."]}),"Appends an element to the end of the list."],[e.jsx(t.code,{children:"ElementAt(index: int)"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"index"})," — zero-based position."]}),"Returns the element at the specified position without exposing the underlying array."],[e.jsx(t.code,{children:"RemoveAt(index: int)"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"index"})," — zero-based position."]}),"Removes the element at the specified position and shifts later elements left."],[e.jsx(t.code,{children:"Clear()"}),"—","Discards all elements by replacing the internal array with a zero-length array."],[e.jsx(t.code,{children:"GetEnumerator()"}),"—","Returns a <InlineCode>ListEnumerator&lt;T&gt;</InlineCode> positioned before the first element."]]}),`
`,e.jsx(s,{children:"Returns"}),`
`,e.jsx(o,{headers:["Member","Return Type","Description"],rows:[[e.jsx(t.code,{children:"Length"}),"int","The current element count."],[e.jsx(t.code,{children:"[index]"}),"T","The element stored at the supplied index."],[e.jsx(t.code,{children:"Add(item)"}),"void","Nothing."],[e.jsx(t.code,{children:"ElementAt(index)"}),"T","The element stored at the supplied index."],[e.jsx(t.code,{children:"RemoveAt(index)"}),"void","Nothing."],[e.jsx(t.code,{children:"Clear()"}),"void","Nothing."],[e.jsx(t.code,{children:"GetEnumerator()"}),"ListEnumerator<T>","An enumerator that implements IEnumerator<T>."]]}),`
`,e.jsx(s,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(l,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Index out of bounds"}),` — Reading or writing an
indexer, calling `,e.jsx(n,{children:"ElementAt"}),", or calling"," ",`
`,e.jsx(n,{children:"RemoveAt"})," with an index less than 0 or greater than or equal to"," ",`
`,e.jsx(n,{children:"Length"})," throws a runtime exception."]})}),e.jsx(l,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Type mismatch"}),` — Passing a value whose type is not
assignable to `,e.jsx(n,{children:"T"})," to ",e.jsx(n,{children:"Add"}),` or the indexer setter
fails at compile time.`]})}),e.jsx(l,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Capacity clamping"}),` — A negative capacity passed to
the capacity constructor is silently clamped to 0; it does not throw.`]})})]}),`
`,e.jsx(s,{children:"Remarks"}),`
`,e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Array-backed storage."})," ",e.jsx(n,{children:"List<T>"}),` owns a single
internal field, `,e.jsx(n,{children:"_array"}),", that holds a ",e.jsx(n,{children:"T[]"})," ",`
allocated through the VM's garbage collector. The concrete element type is resolved from the
generic type argument at runtime.`]})}),`
`,e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Copy-on-mutation semantics."})," Both ",e.jsx(n,{children:"Add"})," and"," ",`
`,e.jsx(n,{children:"RemoveAt"}),` allocate a brand-new internal array sized to the new element
count and copy the surviving elements into it. The old array is replaced and becomes collectible.
This keeps the implementation simple and deterministic, but it means frequent appends or removals
in hot loops perform repeated allocations and copies.`]})}),`
`,e.jsx(d,{tone:"amber",children:e.jsxs(t.p,{children:[e.jsx(n,{children:"Add"})," and ",e.jsx(n,{children:"RemoveAt"})," are"," ",`
`,e.jsx("strong",{className:"text-text-primary",children:"O(n)"}),` in this implementation because they copy the
entire backing array. Pre-allocate with the capacity constructor when the final size is known, or
use `,e.jsx(n,{children:"Queue<T>"})," / ",e.jsx(n,{children:"Stack<T>"}),` for
append/remove-heavy workloads.`]})}),`
`,e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Capacity versus length."}),` The capacity constructor only pre-allocates the backing
array; `,e.jsx(n,{children:"Length"}),` still reports 0 until elements are added. There is currently
no `,e.jsx(n,{children:"Capacity"})," property exposed to ShardScript code."]})}),`
`,e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Enumeration."})," ",e.jsx(n,{children:"List<T>"})," implements"," ",`
`,e.jsx(n,{children:"IEnumerable<T>"})," through ",e.jsx(n,{children:"GetEnumerator"}),`. The
returned `,e.jsx(n,{children:"ListEnumerator<T>"}),` captures the source array and the length
at creation time. You can iterate with `,e.jsx(n,{children:"foreach"}),` or drive the enumerator
manually with `,e.jsx(n,{children:"MoveNext"})," and ",e.jsx(n,{children:"Current"}),"."]})}),`
`,e.jsx(d,{tone:"blue",children:e.jsx(t.p,{children:`Because the enumerator stores a direct reference to the array, mutating the list after creating an
enumerator will not change the sequence that enumerator produces. Always create a fresh enumerator
after modifying the list if you need to see the latest contents.`})}),`
`,e.jsx(s,{children:"Examples"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Basic construction, append, indexer, and removal."})}),`
`,e.jsx(a,{code:`using stdio;
using collections;

namespace demo;

public static func Main() -> void
{
  // Start with an empty list and grow it element by element.
  list: List<int> = new List<int>();

  list.Add(10);
  list.Add(20);
  list.Add(30);

  println(list.Length);     // 3

  // Read by index.
  println(list[0]);         // 10

  // Write by index.
  list[1] = 99;
  println(list[1]);         // 99

  // Remove the middle element; later elements shift left.
  list.RemoveAt(1);
  println(list.Length);     // 2
  println(list[0]);         // 10
  println(list[1]);         // 30
}`,language:"csharp",filename:"list_basic.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Capacity constructor and clearing."})}),`
`,e.jsx(a,{code:`using stdio;
using collections;

namespace demo;

public static func Main() -> void
{
  // Pre-allocate storage even though the logical length starts at zero.
  words: List<string> = new List<string>(4);

  words.Add("alpha");
  words.Add("beta");
  words.Add("gamma");

  println(words.Length);    // 3

  // Clear drops the backing array and starts fresh.
  words.Clear();
  println(words.Length);    // 0

  // A negative capacity is clamped to zero rather than throwing.
  clamped: List<int> = new List<int>(-5);
  clamped.Add(1);
  println(clamped.Length);  // 1
}`,language:"csharp",filename:"list_capacity.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Enumeration with foreach and with a manual enumerator."})}),`
`,e.jsx(a,{code:`using stdio;
using collections;

namespace demo;

public static func Main() -> void
{
  list: List<int> = new List<int>();
  list.Add(7);
  list.Add(8);
  list.Add(9);

  // Syntactic iteration over IEnumerable<T>.
  foreach (n in list)
  {
      print(n);
      print(" ");
  }
  println("");              // 7 8 9

  // Manual IEnumerator<T> access.
  e: IEnumerator<int> = list.GetEnumerator();
  while (e.MoveNext())
  {
      print(e.Current);
      print(" ");
  }
  println("");              // 7 8 9
}`,language:"csharp",filename:"list_enumeration.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Using ElementAt and guarding against out-of-bounds access."})}),`
`,e.jsx(a,{code:`using stdio;
using collections;

namespace demo;

public static func Main() -> void
{
  list: List<int> = new List<int>();
  list.Add(100);
  list.Add(200);

  // ElementAt is equivalent to the indexer read but reads as a method call.
  println(list.ElementAt(1));   // 200

  // Always validate the index before accessing the list.
  index: int = 5;
  if (index >= 0 && index < list.Length)
  {
      println(list[index]);
  }
  else
  {
      println("index out of range");
  }

  // RemoveAt on an invalid index raises an exception.
  try
  {
      list.RemoveAt(10);
  }
  catch (ex: RuntimeException)
  {
      println("caught out-of-bounds remove");
  }
}`,language:"csharp",filename:"list_safety.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Common mistakes."})}),`
`,e.jsx(a,{code:`using stdio;
using collections;

namespace demo;

public static func Main() -> void
{
  list: List<int> = new List<int>();
  list.Add(1);
  list.Add(2);

  // Mistake 1: Lists expose Length, not Count.
  println(list.Length);     // 2

  // Mistake 2: Forgetting that RemoveAt shifts remaining elements.
  list.RemoveAt(0);
  println(list[0]);         // 2, not 1

  // Mistake 3: Assuming Add returns the new element or the new length.
  // It returns void; inspect Length afterwards if needed.
  list.Add(3);
  println(list.Length);     // 2
}`,language:"csharp",filename:"list_mistakes.shard"}),`
`,e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Returning a List as IEnumerable."})," ",e.jsx(n,{children:"List<T>"}),` is the
standard concrete buffer used when materializing a lazy sequence.`]})}),`
`,e.jsx(a,{code:`using stdio;
using collections;

namespace demo;

public delegate Transform<T, U>(value: T) -> U;

public static func Select<T, U>(source: IEnumerable<T>, action: Transform<T, U>) -> IEnumerable<U>
{
  // Materialize the transformed sequence into a list.
  temp: List<U> = new List<U>();

  foreach (item in source)
  {
      temp.Add(action(item));
  }

  return temp;
}

public static func Main() -> void
{
  nums: int[] = [1, 2, 3, 4, 5];
  doubled: IEnumerable<int> = nums.Select(lambda (a: int) -> int
  {
      return a * 2;
  });

  foreach (n in doubled)
  {
      println(n);           // 2, 4, 6, 8, 10
  }
}`,language:"csharp",filename:"list_linq.shard"}),`
`,e.jsx(s,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(l,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"IEnumerable & IEnumerator"})," — the iteration contract implemented by ",e.jsx(n,{children:"List<T>"}),"."]})}),e.jsx(l,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"Dictionary<K, V>"})," — key-value hash table collection."]})}),e.jsx(l,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"Queue & Stack"})," — FIFO and LIFO collections."]})})]}),`
`,e.jsx(s,{children:"Source"}),`
`,e.jsx(i,{children:e.jsxs(t.p,{children:["The ",e.jsx(n,{children:"shard.collections"})," implementation ships as part of"," ",`
`,e.jsx(n,{children:"ShardScript.Framework"}),". The native binding for ",e.jsx(n,{children:"List<T>"})," ",`
and its enumerator is in `,e.jsx(n,{children:"ShardScript.Framework/system/collections.shard.cpp"}),"."]})})]})}function x(r={}){const{wrapper:t}=r.components||{};return t?e.jsx(t,{...r,children:e.jsx(h,{...r})}):h(r)}function c(r,t){throw new Error("Expected component `"+r+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
