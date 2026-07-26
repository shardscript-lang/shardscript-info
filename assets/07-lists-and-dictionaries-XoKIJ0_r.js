import{j as e}from"./index-CoWj0v4y.js";function h(r){const t={code:"code",p:"p",...r.components},{Bullet:s,Callout:d,CodeBlock:l,DocsTable:c,H2:a,InlineCode:n,Prose:i}=t;return s||o("Bullet"),d||o("Callout"),l||o("CodeBlock"),c||o("DocsTable"),a||o("H2"),n||o("InlineCode"),i||o("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(i,{children:e.jsxs(t.p,{children:["The ",e.jsx(n,{children:"shard.collections"}),` shard provides two generic container types:
`,e.jsx(n,{children:"List<T>"})," (a growable, ordered sequence) and"," ",`
`,e.jsx(n,{children:"Dictionary<K, V>"})," (a hash map from keys to values). Both live in the"," ",`
`,e.jsx(n,{children:"collections"})," namespace, require ",e.jsx(n,{children:"using collections;"}),`,
and support indexers, explicit mutation, and `,e.jsx(n,{children:"foreach"})," enumeration."]})}),`
`,e.jsx(a,{children:"Summary"}),`
`,e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"List<T>"}),` stores elements in insertion order and exposes a zero-based
integer indexer, an `,e.jsx(n,{children:"Add"})," method, a ",e.jsx(n,{children:"RemoveAt"}),` method,
and a `,e.jsx(n,{children:"Length"})," property. ",e.jsx(n,{children:"Dictionary<K, V>"}),` maps
keys to values using a hash table and exposes a key-based indexer, `,e.jsx(n,{children:"Add"}),","," ",`
`,e.jsx(n,{children:"ContainsKey"}),", ",e.jsx(n,{children:"Remove"}),", and a ",e.jsx(n,{children:"Count"})," ",`
property. Both types implement the enumerable contract used by `,e.jsx(n,{children:"foreach"}),"."]})}),`
`,e.jsx(a,{children:"Syntax"}),`
`,e.jsx(l,{code:`using collections;

// Construction
list: List<int> = new List<int>();
listWithRoom: List<int> = new List<int>(16);
scores: Dictionary<string, int> = new Dictionary<string, int>();

// List operations
list.Add(10);
first: int = list[0];
list[0] = 99;
list.RemoveAt(0);
remaining: int = list.Length;

// Dictionary operations
scores.Add("alice", 30);
score: int = scores["alice"];
scores["alice"] = 31;
hasKey: bool = scores.ContainsKey("alice");
wasRemoved: bool = scores.Remove("alice");
total: int = scores.Count;

// Enumeration
foreach (item in list)
{
  // item has type T
}

foreach (pair in scores)
{
  name: string = pair.Key;
  value: int = pair.Value;
}`,language:"csharp",filename:"collections_syntax.shard"}),`
`,e.jsx(a,{children:"Parameters / Arguments"}),`
`,e.jsx(i,{children:e.jsxs(t.p,{children:[`The constructors and members shown in the following tables are the public surface of each type.
Generic arguments must be concrete ShardScript types such as `,e.jsx(n,{children:"int"}),","," ",`
`,e.jsx(n,{children:"string"}),", or a user-defined class."]})}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"List<T> members"})}),`
`,e.jsx(c,{headers:["Member","Parameters","Returns","Description"],rows:[[e.jsx(t.code,{children:"new List<T>()"}),"none","List&lt;T&gt;","Creates an empty list with a default backing array."],[e.jsx(t.code,{children:"new List<T>(capacity)"}),"capacity: int","List&lt;T&gt;","Creates a list whose backing array is pre-sized to capacity (clamped to 0 if negative)."],[e.jsx(t.code,{children:"Add(item)"}),"item: T","void","Appends the item to the end of the list."],[e.jsx(t.code,{children:"ElementAt(index)"}),"index: int","T","Returns the element at the given index."],[e.jsx(t.code,{children:"[index]"}),"index: int","T","Indexer get/set for the element at the given index."],[e.jsx(t.code,{children:"RemoveAt(index)"}),"index: int","void","Removes the element at the given index and shifts later elements down."],[e.jsx(t.code,{children:"Clear()"}),"none","void","Removes every element from the list."],[e.jsx(t.code,{children:"Length"}),"none","int","Property that returns the current number of stored elements."]]}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Dictionary<K, V> members"})}),`
`,e.jsx(c,{headers:["Member","Parameters","Returns","Description"],rows:[[e.jsx(t.code,{children:"new Dictionary<K, V>()"}),"none","Dictionary&lt;K, V&gt;","Creates an empty hash table."],[e.jsx(t.code,{children:"Add(key, value)"}),"key: K, value: V","void","Inserts a new key/value pair."],[e.jsx(t.code,{children:"[key]"}),"key: K","V","Indexer get/set. Get throws if the key is missing; set inserts or updates."],[e.jsx(t.code,{children:"ContainsKey(key)"}),"key: K","bool","Returns true when the key is present."],[e.jsx(t.code,{children:"Remove(key)"}),"key: K","bool","Removes the key/value pair if present and returns true; otherwise returns false."],[e.jsx(t.code,{children:"Clear()"}),"none","void","Removes every entry from the dictionary."],[e.jsx(t.code,{children:"Count"}),"none","int","Property that returns the number of stored key/value pairs."],[e.jsx(t.code,{children:"Keys"}),"none","K[]","Property that returns a fresh array containing every key."],[e.jsx(t.code,{children:"Values"}),"none","V[]","Property that returns a fresh array containing every value."]]}),`
`,e.jsx(a,{children:"Returns"}),`
`,e.jsx(c,{headers:["Operation","Return value"],rows:[[e.jsx(t.code,{children:"List<T>.Add"}),"void — the list is mutated in place."],[e.jsx(t.code,{children:"List<T>.ElementAt"}),"T — the element stored at the requested index."],[e.jsx(t.code,{children:"List<T>.Length"}),"int — the number of elements currently stored."],[e.jsx(t.code,{children:"Dictionary<K, V>.Add"}),"void — the dictionary is mutated in place."],[e.jsx(t.code,{children:"Dictionary<K, V>.ContainsKey"}),"bool — true when the key exists."],[e.jsx(t.code,{children:"Dictionary<K, V>.Remove"}),"bool — true if an entry was actually removed."],[e.jsx(t.code,{children:"Dictionary<K, V>.Count"}),"int — the number of key/value pairs stored."],[e.jsx(t.code,{children:"Dictionary<K, V>.Keys"}),"K[] — a newly allocated array snapshot of all keys."],[e.jsx(t.code,{children:"Dictionary<K, V>.Values"}),"V[] — a newly allocated array snapshot of all values."]]}),`
`,e.jsx(a,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-3",children:[e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"List index out of bounds"})," —"," ",`
`,e.jsx(n,{children:"list[index]"})," (get or set), ",e.jsx(n,{children:"ElementAt(index)"}),", and"," ",`
`,e.jsx(n,{children:"RemoveAt(index)"})," throw when ",e.jsx(n,{children:"index"}),` is negative or
greater than or equal to `,e.jsx(n,{children:"list.Length"}),"."]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Dictionary key already exists"})," —"," ",`
`,e.jsx(n,{children:"dict.Add(key, value)"})," throws if ",e.jsx(n,{children:"key"}),` is already in
the dictionary. Use the indexer set syntax to insert-or-update instead.`]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Dictionary key not found"})," —"," ",`
`,e.jsx(n,{children:"dict[key]"})," (get) throws when the key is absent. Prefer"," ",`
`,e.jsx(n,{children:"ContainsKey"})," or ",e.jsx(n,{children:"Remove"}),` to guard against missing
keys.`]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Missing namespace import"})," — Forgetting"," ",`
`,e.jsx(n,{children:"using collections;"}),` produces a compile-time error because the compiler
cannot resolve `,e.jsx(n,{children:"List"})," or ",e.jsx(n,{children:"Dictionary"}),"."]})})]}),`
`,e.jsx(a,{children:"Remarks"}),`
`,e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"List<T>"}),` stores its elements in a private backing array. In the
current implementation, every call to `,e.jsx(n,{children:"Add"}),` allocates a brand-new array one
element larger and copies every existing element into it. Appends are therefore`," ",`
`,e.jsx(n,{children:"O(n)"})," rather than amortized ",e.jsx(n,{children:"O(1)"}),`, so very large
lists should be built with care. `,e.jsx(n,{children:"RemoveAt"})," is also"," ",`
`,e.jsx(n,{children:"O(n)"}),` because it shifts all later elements down. The capacity constructor
only avoids the first few reallocations; it does not change the copy-on-add behavior.`]})}),`
`,e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"Dictionary<K, V>"}),` is implemented as an open-addressing hash table with
linear probing. The internal table doubles in size once the load factor exceeds 0.75, and removed
slots are marked as tombstones so that probe chains remain intact. Enumeration yields entries in
internal slot order, which is not guaranteed to match insertion order. The `,e.jsx(n,{children:"Keys"})," ",`
and `,e.jsx(n,{children:"Values"}),` properties allocate a new array on every access, so cache the
result if it is needed repeatedly.`]})}),`
`,e.jsx(i,{children:e.jsxs(t.p,{children:["Both types implement the enumerable contract used by ",e.jsx(n,{children:"foreach"}),". A"," ",`
`,e.jsx(n,{children:"List<T>"})," enumeration yields elements of type ",e.jsx(n,{children:"T"}),`.
A `,e.jsx(n,{children:"Dictionary<K, V>"})," enumeration yields"," ",`
`,e.jsx(n,{children:"KeyValuePair<K, V>"})," instances whose public fields are"," ",`
`,e.jsx(n,{children:"Key"})," and ",e.jsx(n,{children:"Value"}),"."]})}),`
`,e.jsx(d,{tone:"blue",children:e.jsxs(t.p,{children:["Key hashing and equality are supported for primitives (",e.jsx(n,{children:"int"}),","," ",`
`,e.jsx(n,{children:"char"}),", ",e.jsx(n,{children:"bool"}),", ",e.jsx(n,{children:"double"}),", and"," ",`
`,e.jsx(n,{children:"string"}),`) by value. For other reference types, the dictionary falls back to
identity-based hashing and equality, which means two different object instances are never equal
even if their fields match.`]})}),`
`,e.jsx(a,{children:"Examples"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Basic List usage"})}),`
`,e.jsx(l,{code:`using stdio;
using collections;

namespace demo;

public static func Main() -> void
{
  list: List<string> = new List<string>();

  // Add appends items in order.
  list.Add("alpha");
  list.Add("beta");
  list.Add("gamma");

  println(list.Length);   // 3
  println(list[0]);       // alpha
  println(list[2]);       // gamma

  // Replace an element through the indexer.
  list[1] = "BETA";
  println(list[1]);       // BETA

  // Remove the first element; later elements shift down.
  list.RemoveAt(0);
  println(list.Length);   // 2
  println(list[0]);       // BETA

  // foreach visits elements from index 0 upward.
  foreach (word in list)
  {
      println(word);      // BETA, then gamma
  }
}`,language:"csharp",filename:"list_basic.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Basic Dictionary usage"})}),`
`,e.jsx(l,{code:`using stdio;
using collections;

namespace demo;

public static func Main() -> void
{
  ages: Dictionary<string, int> = new Dictionary<string, int>();

  ages.Add("alice", 30);
  ages.Add("bob", 25);
  ages.Add("carol", 27);

  println(ages.Count);            // 3
  println(ages["alice"]);         // 30

  // Indexer set updates an existing value.
  ages["bob"] = 26;
  println(ages["bob"]);           // 26

  // ContainsKey tests presence without throwing.
  println(ages.ContainsKey("bob"));   // true
  println(ages.ContainsKey("dave"));  // false

  // Remove reports whether the key existed.
  removed: bool = ages.Remove("carol");
  println(removed);               // true
  println(ages.Count);            // 2

  // foreach yields KeyValuePair<string, int> in internal slot order.
  foreach (pair in ages)
  {
      println(pair.Key + " = " + pair.Value);
  }
}`,language:"csharp",filename:"dictionary_basic.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Edge cases and exception handling"})}),`
`,e.jsx(l,{code:`using stdio;
using collections;

namespace demo;

public static func Main() -> void
{
  list: List<int> = new List<int>();
  list.Add(10);

  // Negative indices are always rejected.
  try
  {
      value: int = list[-1];
      println(value);
  }
  catch (ex: RuntimeException)
  {
      println("caught: negative list index");
  }

  dict: Dictionary<int, string> = new Dictionary<int, string>();
  dict.Add(1, "one");

  // Duplicate keys are rejected by Add.
  try
  {
      dict.Add(1, "ONE");
  }
  catch (ex: RuntimeException)
  {
      println("caught: duplicate key");
  }

  // Missing keys are rejected by the indexer getter.
  try
  {
      missing: string = dict[42];
      println(missing);
  }
  catch (ex: RuntimeException)
  {
      println("caught: missing key");
  }

  // Remove returns false without throwing when the key is absent.
  removed: bool = dict.Remove(99);
  println(removed);   // false
}`,language:"csharp",filename:"collections_edge_cases.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Capacity preallocation"})}),`
`,e.jsx(l,{code:`using stdio;
using collections;

namespace demo;

public static func Main() -> void
{
  // Pre-size the backing array to reduce the number of reallocations.
  list: List<int> = new List<int>(100);

  // The capacity constructor does not affect Length; the list starts empty.
  println(list.Length);   // 0

  list.Add(1);
  list.Add(2);
  println(list.Length);   // 2
}`,language:"csharp",filename:"list_capacity.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Common mistakes"})}),`
`,e.jsxs("ul",{className:"space-y-3",children:[e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Using Count on a List"})," —"," ",`
`,e.jsx(n,{children:"List<T>"})," exposes ",e.jsx(n,{children:"Length"}),", not"," ",`
`,e.jsx(n,{children:"Count"}),". The opposite is true for dictionaries: they expose"," ",`
`,e.jsx(n,{children:"Count"}),", not ",e.jsx(n,{children:"Length"}),"."]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Mutating while enumerating"}),` — Adding or removing
elements from a list after creating an enumerator does not update that enumerator; the loop may
see stale data or skip elements. Clear the collection only after the loop completes.`]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Treating Dictionary order as meaningful"}),` — The
order produced by `,e.jsx(n,{children:"foreach"}),` reflects the internal hash-table layout, not
the order in which keys were inserted.`]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Forgetting the using directive"}),` — Both types live
in the `,e.jsx(n,{children:"collections"})," namespace. Without"," ",`
`,e.jsx(n,{children:"using collections;"})," the compiler reports an unresolved type error."]})})]})]})}function m(r={}){const{wrapper:t}=r.components||{};return t?e.jsx(t,{...r,children:e.jsx(h,{...r})}):h(r)}function o(r,t){throw new Error("Expected component `"+r+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default};
