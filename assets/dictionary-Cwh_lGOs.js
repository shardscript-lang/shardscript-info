import{j as e}from"./index-BQw6jbtc.js";function h(r){const n={code:"code",p:"p",...r.components},{Bullet:a,Callout:d,CodeBlock:c,DocsTable:l,H2:i,InlineCode:t,Prose:s}=n;return a||o("Bullet"),d||o("Callout"),c||o("CodeBlock"),l||o("DocsTable"),i||o("H2"),t||o("InlineCode"),s||o("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(i,{children:"Summary"}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"Dictionary<K, V>"})," is a generic hash table that maps unique keys of type"," ",`
`,e.jsx(t,{children:"K"})," to values of type ",e.jsx(t,{children:"V"}),`. It supports insertion, lookup by key,
removal, and enumeration over `,e.jsx(t,{children:"KeyValuePair<K, V>"})," entries via the"," ",`
`,e.jsx(t,{children:"IEnumerable<T>"})," contract in the ",e.jsx(t,{children:"collections"})," namespace."]})}),`
`,e.jsx(i,{children:"Syntax"}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:["A dictionary is created with ",e.jsx(t,{children:"new Dictionary<K, V>()"}),`. Keys and values are accessed
through the indexer, and the public API is expressed as follows:`]})}),`
`,e.jsx(c,{code:`using stdio;
using collections;

namespace demo;

public static func Main() -> void
{
  // Explicit generic instantiation.
  ages: Dictionary<string, int> = new Dictionary<string, int>();

  // Add fails if the key already exists.
  ages.Add("alice", 30);
  ages.Add("bob", 25);

  // Indexer get/set: setter inserts or overwrites; getter throws on a missing key.
  println(ages["alice"]);
  ages["bob"] = 26;

  // Membership test without exceptions.
  if (ages.ContainsKey("carol"))
  {
      println(ages["carol"]);
  }
}`,language:"csharp",filename:"dictionary_syntax.shard"}),`
`,e.jsx(i,{children:"Parameters / Arguments"}),`
`,e.jsx(l,{headers:["Member","Parameters","Description"],rows:[[e.jsx(n.code,{children:"new Dictionary<K, V>()"}),"—","Creates an empty dictionary. Internal storage is allocated lazily on the first insertion."],[e.jsx(n.code,{children:"Count"}),"—","Read-only property returning the number of active key-value pairs."],[e.jsx(n.code,{children:"Keys"}),"—","Read-only property returning a new K[] snapshot of all active keys."],[e.jsx(n.code,{children:"Values"}),"—","Read-only property returning a new V[] snapshot of all active values."],[e.jsx(n.code,{children:"this[key]"}),e.jsxs(e.Fragment,{children:[e.jsx(n.code,{children:"key"}),": K"]}),"Indexer getter returns the value for an existing key; setter inserts or updates."],[e.jsx(n.code,{children:"Add(key, value)"}),e.jsxs(e.Fragment,{children:[e.jsx(n.code,{children:"key"}),": K, ",e.jsx(n.code,{children:"value"}),": V"]}),"Inserts a new key-value pair. Throws if the key is already present."],[e.jsx(n.code,{children:"ContainsKey(key)"}),e.jsxs(e.Fragment,{children:[e.jsx(n.code,{children:"key"}),": K"]}),"Returns true if the key exists, false otherwise. Never throws."],[e.jsx(n.code,{children:"Remove(key)"}),e.jsxs(e.Fragment,{children:[e.jsx(n.code,{children:"key"}),": K"]}),"Removes the key if it exists and returns true; otherwise returns false."],[e.jsx(n.code,{children:"Clear()"}),"—","Removes every entry by replacing the internal arrays with zero-length arrays."],[e.jsx(n.code,{children:"GetEnumerator()"}),"—","Returns a <code>DictionaryEnumerator&lt;K, V&gt;</code> positioned before the first entry."]]}),`
`,e.jsx(i,{children:"Returns"}),`
`,e.jsx(l,{headers:["Member","Return Type","Meaning"],rows:[[e.jsx(n.code,{children:"Count"}),"int","The current number of occupied slots."],[e.jsx(n.code,{children:"Keys"}),"K[]","A newly allocated array containing every active key."],[e.jsx(n.code,{children:"Values"}),"V[]","A newly allocated array containing every active value."],[e.jsx(n.code,{children:"this[key]"})(get),"V","The value associated with the supplied key."],[e.jsx(n.code,{children:"this[key]"})(set),"void","Assigns the value to the key, inserting a new pair when necessary."],[e.jsx(n.code,{children:"Add(key, value)"}),"void","No meaningful return; the side effect is the inserted pair."],[e.jsx(n.code,{children:"ContainsKey(key)"}),"bool","True when the key is present; false otherwise."],[e.jsx(n.code,{children:"Remove(key)"}),"bool","True when an entry was removed; false when the key was absent."],[e.jsx(n.code,{children:"Clear()"}),"void","No return value."],[e.jsx(n.code,{children:"GetEnumerator()"}),"DictionaryEnumerator&lt;K, V&gt;","An enumerator that yields <code>KeyValuePair&lt;K, V&gt;</code> values."]]}),`
`,e.jsx(i,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Key already exists"})," — ",e.jsx(t,{children:"Add(key, value)"})," ",`
throws a runtime exception when the key is already present. Use the indexer or guard with`," ",`
`,e.jsx(t,{children:"ContainsKey"})," if you need overwrite semantics."]})}),e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Key not found"}),` — The indexer getter throws when the requested key
is absent. Always check `,e.jsx(t,{children:"ContainsKey"})," before reading, or be prepared to catch the runtime error."]})}),e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Type mismatch"}),` — The compiler rejects keys or values whose type does
not match the dictionary's generic arguments. The key type must also be hashable by the runtime.`]})}),e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Unhashable key"}),` — Custom reference types use identity hashing
(object address) and identity equality by default. A mutable key that changes its identity-related state will
become unreachable through normal lookups.`]})})]}),`
`,e.jsx(i,{children:"Remarks"}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Open-addressing hash table with linear probing."})," ",`
`,e.jsx(t,{children:"Dictionary<K, V>"}),` stores keys, values, hashes, and slot states in four parallel arrays.
Each slot is marked empty (`,e.jsx(t,{children:"0"}),"), occupied (",e.jsx(t,{children:"1"}),`), or deleted
(`,e.jsx(t,{children:"-1"}),`, a tombstone). Tombstones keep probe chains intact so that lookups continue to find
entries that were inserted after a deleted entry.`]})}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Growth policy."}),` The dictionary starts with zero-length internal arrays and allocates an initial
capacity of four slots on the first insertion. After that, it doubles in size whenever the next insertion would push
occupancy past a 75% load factor. Resizing rehashes every active entry into the new arrays, discarding tombstones.`]})}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Hashing and equality."}),` The runtime dispatches hashing through an internal helper that mirrors the
key's type: integers, characters, and booleans hash to their own value; doubles use their IEEE 754 bit pattern;
strings use a DJB2-style polynomial hash; all other types fall back to a hash of their object reference. Equality
matches the same pattern: value equality for primitives and strings, reference equality for everything else. This
means that using a mutable object as a key is generally unsafe.`]})}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Enumeration and snapshots."})," Iteration yields ",e.jsx(t,{children:"KeyValuePair<K, V>"}),`
structs in the physical order of occupied slots, which is not the insertion order. The `,e.jsx(t,{children:"Keys"})," ",`
and `,e.jsx(t,{children:"Values"}),` properties allocate fresh arrays on every access; modifying the dictionary does
not affect an array that was already returned.`]})}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Asymmetric indexer."}),` The indexer setter silently inserts a missing key or overwrites an existing one,
while the getter throws on a missing key. This matches the design in the legacy page but is worth emphasizing:
treat the getter as a fast path when you already know the key exists, and `,e.jsx(t,{children:"ContainsKey"}),` as the
defensive alternative.`]})}),`
`,e.jsx(d,{tone:"blue",children:e.jsxs(n.p,{children:[e.jsx(t,{children:"Dictionary<K, V>"}),` is not sorted. If you need predictable ordering, copy the keys into
a `,e.jsx(t,{children:"List<T>"})," and sort them, or iterate over the ",e.jsx(t,{children:"Keys"}),` array after
sorting it with host-side utilities.`]})}),`
`,e.jsx(i,{children:"Examples"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Basic create, read, update, and delete."})}),`
`,e.jsx(c,{code:`using stdio;
using collections;

namespace demo;

public static func Main() -> void
{
  scores: Dictionary<string, int> = new Dictionary<string, int>();

  scores.Add("alice", 95);
  scores.Add("bob", 87);

  // Read an existing value.
  println(scores["alice"]);

  // Update through the indexer.
  scores["bob"] = 92;
  println(scores["bob"]);

  // Remove an entry and verify it is gone.
  removed: bool = scores.Remove("alice");
  println(removed);
  println(scores.ContainsKey("alice"));

  // Current size after the removal.
  println(scores.Count);
}`,language:"csharp",filename:"dictionary_crud.shard"}),`
`,e.jsx(s,{children:e.jsxs("strong",{children:["Iterating with ",e.jsx(t,{children:"foreach"})," and snapshot properties."]})}),`
`,e.jsx(c,{code:`using stdio;
using collections;

namespace demo;

public static func Main() -> void
{
  capitals: Dictionary<string, string> = new Dictionary<string, string>();
  capitals.Add("france", "paris");
  capitals.Add("japan", "tokyo");
  capitals.Add("brazil", "brasília");

  // foreach exposes KeyValuePair<K, V> values.
  foreach (pair in capitals)
  {
      println(pair.Key + " -> " + pair.Value);
  }

  // Keys and Values allocate independent arrays.
  keys: string[] = capitals.Keys;
  values: string[] = capitals.Values;

  println(keys.Length);
  println(values.Length);
}`,language:"csharp",filename:"dictionary_iteration.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Defensive reads and overwrite-on-conflict."})}),`
`,e.jsx(c,{code:`using stdio;
using collections;

namespace demo;

public static func Main() -> void
{
  settings: Dictionary<string, int> = new Dictionary<string, int>();
  settings.Add("timeout", 30);

  // Add only when the key is absent; otherwise overwrite.
  if (!settings.ContainsKey("retries"))
  {
      settings.Add("retries", 3);
  }

  // Safe read: provide a fallback without throwing.
  timeout: int = 0;
  if (settings.ContainsKey("timeout"))
  {
      timeout = settings["timeout"];
  }
  else
  {
      timeout = 60;
  }
  println(timeout);

  // Indexer overwrites without error.
  settings["timeout"] = 45;
  println(settings["timeout"]);
}`,language:"csharp",filename:"dictionary_defensive.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Edge cases and common mistakes."})}),`
`,e.jsx(c,{code:`using stdio;
using collections;

namespace demo;

public static func Main() -> void
{
  counts: Dictionary<int, string> = new Dictionary<int, string>();
  counts.Add(1, "one");

  // Duplicate Add throws; indexer would have overwritten.
  // counts.Add(1, "uno");   // ERROR at runtime

  // Reading a missing key throws.
  // println(counts[99]);    // ERROR at runtime

  // Remove returns false without throwing for a missing key.
  println(counts.Remove(99));

  // Clearing empties the dictionary but keeps the type arguments intact.
  counts.Clear();
  println(counts.Count);

  // Re-insertion after Clear works normally.
  counts.Add(2, "two");
  println(counts.Count);
}`,language:"csharp",filename:"dictionary_edgecases.shard"}),`
`,e.jsx(i,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"IEnumerable & IEnumerator"})," — the iteration contract implemented by ",e.jsx(t,{children:"Dictionary<K, V>"}),"."]})}),e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"List<T>"})," — dynamic array collection."]})}),e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"Queue & Stack"})," — FIFO and LIFO collections."]})})]}),`
`,e.jsx(i,{children:"Source"}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:["The ",e.jsx(t,{children:"shard.collections"})," implementation ships as part of"," ",`
`,e.jsx(t,{children:"ShardScript.Framework"}),". The native binding for ",e.jsx(t,{children:"Dictionary<K, V>"}),","," ",`
`,e.jsx(t,{children:"KeyValuePair<K, V>"}),", and related enumerators is in"," ",`
`,e.jsx(t,{children:"ShardScript.Framework/system/collections.shard.cpp"}),"."]})})]})}function u(r={}){const{wrapper:n}=r.components||{};return n?e.jsx(n,{...r,children:e.jsx(h,{...r})}):h(r)}function o(r,n){throw new Error("Expected component `"+r+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};
