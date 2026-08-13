import{j as e}from"./index-DkFwvLJL.js";function h(a){const r={p:"p",...a.components},{Bullet:s,Callout:o,CodeBlock:l,DocsTable:d,H2:i,InlineCode:n,Prose:t}=r;return s||c("Bullet"),o||c("Callout"),l||c("CodeBlock"),d||c("DocsTable"),i||c("H2"),n||c("InlineCode"),t||c("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(i,{children:"Summary"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:["The ",e.jsx(n,{children:"shard.collections"}),` native library implements four generic collection types:
`,e.jsx(n,{children:"List<T>"}),", ",e.jsx(n,{children:"Dictionary<K,V>"}),","," ",`
`,e.jsx(n,{children:"Queue<T>"}),", and ",e.jsx(n,{children:"Stack<T>"}),". Its source lives in"," ",`
`,e.jsx(n,{children:"ShardScript.Framework/system/collections.shard.cpp"}),` and demonstrates how to
register generic classes, structs, indexers, properties, methods, and enumerator implementations in
a single native library. The library registers the `,e.jsx(n,{children:"collections"}),` namespace and
exposes generic collection APIs that ShardScript code consumes like ordinary managed types.`]})}),`
`,e.jsx(i,{children:"Syntax"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:["The library exports metadata and registration through the macros provided by"," ",`
`,e.jsx(n,{children:"<shard/ShardScriptLIB.hpp>"}),`. The macros expand to the required
`,e.jsx(n,{children:'extern "C"'})," symbols."]})}),`
`,e.jsx(l,{code:`#include <ShardScript.hpp>

using namespace shard;

SHARDLIB_GETMETADATA
{
  lib.Name        = L"shard.collections";
  lib.Description = L"Standard collections";
  lib.Version     = L"0.3.0";
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> collectionsNs(context, L"collections");

  // Register List<T>, Dictionary<K,V>, Queue<T>, Stack<T>,
  // supporting structs, and enumerators here.
}`,language:"cpp",filename:"collections.shard.cpp"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:[`Each collection is registered as a generic class with type parameters and fields. The following
table lists the public surface area that `,e.jsx(n,{children:"shard.collections"}),` exposes to
ShardScript.`]})}),`
`,e.jsx(d,{headers:["Type","Members","Description"],rows:[[e.jsx(n,{children:"List<T>"}),"Add(item), ElementAt(index), RemoveAt(index), Clear, Length, [index]","Growable array-backed list."],[e.jsx(n,{children:"Dictionary<K,V>"}),"Add(key, value), Remove(key), ContainsKey(key), Clear, Count, Keys, Values, [key]","Open-addressed hash table."],[e.jsx(n,{children:"Queue<T>"}),"Enqueue(item), Dequeue(), Peek(), Clear, Count, Contains(item)","Circular array-backed FIFO queue."],[e.jsx(n,{children:"Stack<T>"}),"Push(item), Pop(), Peek(), Clear, Count, Contains(item)","Array-backed LIFO stack."],[e.jsx(n,{children:"KeyValuePair<K,V>"}),"Key, Value","Value type returned by Dictionary enumerator."]]}),`
`,e.jsx(i,{children:"Parameters / Arguments"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:["The generic arguments are resolved at runtime from ",e.jsx(n,{children:"context.Frame->TypeArguments"}),`
in the same order in which the type parameters were registered.`]})}),`
`,e.jsx(d,{headers:["Type parameter","Registered as","Runtime index"],rows:[[e.jsx(n,{children:"T in List<T>"}),'listClass.AddTypeParameter(L"T")',"context.Frame->TypeArguments[0]"],[e.jsx(n,{children:"K in Dictionary<K,V>"}),'dictClass.AddTypeParameter(L"K")',"context.Frame->TypeArguments[0]"],[e.jsx(n,{children:"V in Dictionary<K,V>"}),'dictClass.AddTypeParameter(L"V")',"context.Frame->TypeArguments[1]"],[e.jsx(n,{children:"T in Queue<T>"}),'queueClass.AddTypeParameter(L"T")',"context.Frame->TypeArguments[0]"],[e.jsx(n,{children:"T in Stack<T>"}),'stackClass.AddTypeParameter(L"T")',"context.Frame->TypeArguments[0]"]]}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:["Instance callbacks receive ",e.jsx(n,{children:"context.Args[0]"})," as ",e.jsx(n,{children:"this"}),`.
Additional arguments follow in order. For example, `,e.jsx(n,{children:"List.Add(item)"}),` maps to
`,e.jsx(n,{children:"context.Args[1]"}),"."]})}),`
`,e.jsx(i,{children:"Returns"}),`
`,e.jsx(t,{children:e.jsx(r.p,{children:"Callbacks return values through the garbage collector. The library uses the following patterns:"})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(r.p,{children:["Integer counts and lengths are returned with"," ",`
`,e.jsx(n,{children:"context.Collector.FromValue(static_cast<std::int64_t>(value))"}),"."]})}),e.jsx(s,{children:e.jsxs(r.p,{children:["Boolean results are returned with ",e.jsx(n,{children:"context.Collector.FromValue(found)"}),"."]})}),e.jsx(s,{children:e.jsxs(r.p,{children:["Element lookups return the existing ",e.jsx(n,{children:"ObjectInstance*"}),` borrowed from the
underlying array.`]})}),e.jsx(s,{children:e.jsxs(r.p,{children:["Void methods return ",e.jsx(n,{children:"nullptr"}),"."]})}),e.jsx(s,{children:e.jsxs(r.p,{children:["Enumerators are allocated with"," ",`
`,e.jsx(n,{children:"context.Collector.AllocateGeneric(rawEnumeratorClass, std::vector<TypeSymbol*>{ ... })"}),"."]})})]}),`
`,e.jsx(i,{children:"Exceptions / Errors"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:["The library throws ",e.jsx(n,{children:"std::runtime_error"}),` for expected failure cases. The
ShardScript runtime converts these into managed exceptions.`]})}),`
`,e.jsx(d,{headers:["Operation","Error condition","Message"],rows:[["List.ElementAt / indexer getter / indexer setter / RemoveAt",e.jsx(n,{children:"index < 0 or index >= Length"}),"index is out of bounds"],["Dictionary indexer getter","key not found","key not found in dictionary"],["Dictionary.Add","key already present","dictionary already contains the given key"],["Queue.Dequeue / Queue.Peek","queue empty","queue is empty"],["Stack.Pop / Stack.Peek","stack empty","stack is empty"]]}),`
`,e.jsx(i,{children:"Remarks"}),`
`,e.jsx(o,{tone:"blue",title:"Native library shape",children:e.jsxs(r.p,{children:["A ShardScript native library is any shared library (",e.jsx(n,{children:".dll"})," on Windows, ",e.jsx(n,{children:".so"})," on Linux, ",e.jsx(n,{children:".dylib"})," on macOS) that exports the two C-linkage symbols ",e.jsx(n,{children:"ShardLib_GetMetadata"})," and ",e.jsx(n,{children:"ShardLib_EntryPoint"}),". It can be built from one or many C++ source files, live inside ",e.jsx(n,{children:"ShardScript.Framework"})," or in a completely separate project, and links against the ShardScript runtime shared library using headers from ",e.jsx(n,{children:"ShardScript/include"}),". For the full registration contract, see ",e.jsx(n,{children:"native-library-overview.mdx"}),"."]})}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Generic registration."}),` Each collection class is registered with type parameters and
stores the raw `,e.jsx(n,{children:"ClassSymbol*"})," and ",e.jsx(n,{children:"TypeParameterSymbol*"}),`
pointers in static variables. At runtime the concrete element type is read from the frame's type
arguments and used to allocate arrays and generic instances.`]})}),`
`,e.jsx(l,{code:`static ClassSymbol* listClass_raw = nullptr;
static TypeParameterSymbol* list_typeParam_T = nullptr;
static FieldSymbol* list_arrayField = nullptr;

// In SHARDLIB_ENTRYPOINT:
SymbolBuilder<ClassSymbol> listClass = collectionsNs.AddClass(L"List");
TypeParameterSymbol* listClass_typeParam_T = listClass.AddTypeParameter(L"T");

listClass_raw = listClass.Get();
list_typeParam_T = listClass_typeParam_T;

list_arrayField = listClass
  .AddField(L"_array", listClass.GetFactory().Array(listClass_typeParam_T), LINK_INSTANCE, ACS_PRIVATE)
  .Get();`,language:"cpp",filename:"collections.shard.cpp (excerpt)"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Storage strategies."})," The four collections use different backing layouts:"]})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"List<T>"})," stores a single private ",e.jsx(n,{children:"_array"}),` field.
Adding an element allocates a new array one element larger and copies the old contents across.`]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"Dictionary<K,V>"}),` stores parallel arrays for keys, values, hashes, and
bucket states. It uses open addressing with linear probing, lazy deletion markers, and a load
factor threshold of 75% before resizing.`]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"Queue<T>"})," stores an array plus ",e.jsx(n,{children:"_head"}),","," ",`
`,e.jsx(n,{children:"_tail"}),", and ",e.jsx(n,{children:"_size"}),` fields. When the array fills,
it compacts the elements to the front and doubles capacity.`]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"Stack<T>"})," stores an array and a ",e.jsx(n,{children:"_size"}),` field.
Growth follows the same doubling pattern as the queue.`]})})]}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Hashing and equality."})," The dictionary does not rely on managed"," ",`
`,e.jsx(n,{children:"GetHashCode"})," or ",e.jsx(n,{children:"Equals"}),` methods. Instead it uses the
native helpers `,e.jsx(n,{children:"GetObjectHash"})," and ",e.jsx(n,{children:"ObjectsEqual"}),`.
Primitive types such as `,e.jsx(n,{children:"int"}),", ",e.jsx(n,{children:"double"}),","," ",`
`,e.jsx(n,{children:"bool"}),", ",e.jsx(n,{children:"char"}),", and ",e.jsx(n,{children:"string"}),` are
compared by value. Reference types fall back to pointer identity.`]})}),`
`,e.jsx(o,{tone:"blue",title:"String hashing implementation",children:e.jsxs(r.p,{children:[`The dictionary computes the string hash with the DJB2 algorithm over the wide-character buffer
returned by `,e.jsx(n,{children:"AsString()"}),`. This keeps lookups fast and avoids allocating
managed hash-code objects.`]})}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Enumerators."}),` Each collection exposes a nested value-type enumerator struct that
implements the `,e.jsx(n,{children:"IEnumerator<T>"}),` trait. The enumerator stores a
reference to the source collection and an index. `,e.jsx(n,{children:"MoveNext"}),` advances the
index and reports whether another element exists; `,e.jsx(n,{children:"Current"}),` returns the
element at the stored index.`]})}),`
`,e.jsx(l,{code:`static ObjectInstance* shard_list_GetEnumerator(const CallState& context) noexcept(false)
{
  ObjectInstance* listInstance = context.Args[0];
  TypeSymbol* concreteT = context.Frame->TypeArguments[0];
  ObjectInstance* arrayInstance = listInstance->GetField(list_arrayField->SlotIndex);
  const ArrayTypeSymbol* arrayType = static_cast<const ArrayTypeSymbol*>(arrayInstance->getInfo());

  ObjectInstance* enumerator = context.Collector.AllocateGeneric(
      listEnumeratorClass_raw,
      std::vector<TypeSymbol*>{ concreteT });

  enumerator->SetField(listEnumerator_sourceField->SlotIndex, arrayInstance);
  enumerator->SetField(listEnumerator_indexField->SlotIndex,
      context.Collector.FromValue(static_cast<std::int64_t>(-1)));
  enumerator->SetField(listEnumerator_lengthField->SlotIndex,
      context.Collector.FromValue(static_cast<std::int64_t>(arrayType->Length)));

  return enumerator;
}`,language:"cpp",filename:"collections.shard.cpp (excerpt)"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Capacity growth."}),` All array-backed collections start with zero capacity, allocate
four slots on the first insertion, and double whenever the load threshold is reached. Because
`,e.jsx(n,{children:"List<T>"}),` allocates exactly one larger array per insertion, it does
not need an explicit growth policy; the queue, stack, and dictionary pre-allocate and resize in
exponential steps.`]})}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Cross-library build placement."}),` The file can be compiled as one of many source files
in a shared-library target. It is not tied to a single-file CMake glob. A standalone project that
copies the same patterns only needs to include the ShardScript headers and link the runtime shared
library.`]})}),`
`,e.jsx(i,{children:"Examples"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Example 1: List<T>"})}),`
`,e.jsx(l,{code:`using stdio;
using collections;

namespace demo;

public static func Main() -> void
{
  numbers: List<int> = new List<int>();
  numbers.Add(10);
  numbers.Add(20);
  numbers.Add(30);

  println("Length: " + numbers.Length);
  println("First: " + numbers[0]);

  numbers[1] = 99;
  println("Updated second: " + numbers.ElementAt(1));

  numbers.RemoveAt(0);
  println("After remove, Length: " + numbers.Length);
}`,language:"csharp",filename:"list_demo.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Example 2: Dictionary<K,V>"})}),`
`,e.jsx(l,{code:`using stdio;
using collections;

namespace demo;

public static func Main() -> void
{
  scores: Dictionary<string, int> = new Dictionary<string, int>();
  scores.Add("alice", 95);
  scores.Add("bob", 87);
  scores["alice"] = 98;

  if (scores.ContainsKey("bob"))
  {
      println("bob: " + scores["bob"]);
  }

  scores.Remove("bob");
  println("Count: " + scores.Count);
}`,language:"csharp",filename:"dictionary_demo.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Example 3: Queue<T> and Stack<T>"})}),`
`,e.jsx(l,{code:`using stdio;
using collections;

namespace demo;

public static func Main() -> void
{
  queue: Queue<string> = new Queue<string>();
  queue.Enqueue("first");
  queue.Enqueue("second");
  println("Dequeue: " + queue.Dequeue());
  println("Peek: " + queue.Peek());
  println("Queue count: " + queue.Count);

  stack: Stack<int> = new Stack<int>();
  stack.Push(1);
  stack.Push(2);
  stack.Push(3);
  println("Pop: " + stack.Pop());
  println("Stack count: " + stack.Count);
}`,language:"csharp",filename:"queue_stack_demo.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Example 4: Iterating with foreach"})}),`
`,e.jsx(l,{code:`using stdio;
using collections;

namespace demo;

public static func Main() -> void
{
  list: List<int> = new List<int>();
  list.Add(2);
  list.Add(4);
  list.Add(6);

  foreach (value: int in list)
  {
      println(value);
  }

  dict: Dictionary<string, int> = new Dictionary<string, int>();
  dict.Add("x", 1);
  dict.Add("y", 2);

  foreach (pair: KeyValuePair<string, int> in dict)
  {
      println(pair.Key + " = " + pair.Value);
  }
}`,language:"csharp",filename:"foreach_demo.shard"}),`
`,e.jsx(o,{tone:"green",title:"Verification hint",children:e.jsxs(r.p,{children:["Run these programs with the ",e.jsx(n,{children:"shard"})," interpreter and ensure the"," ",`
`,e.jsx(n,{children:"shard.collections"}),` shared library is loaded. The enumerators implement the
managed `,e.jsx(n,{children:"IEnumerable<T>"})," / ",e.jsx(n,{children:"IEnumerator<T>"})," ",`
traits, so `,e.jsx(n,{children:"foreach"})," resolves without extra host code."]})}),`
`,e.jsx(i,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"library-building/generic-types-and-type-parameters"})," — registering generic types."]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"library-building/example-math-library"})," — a simple stateless native library example."]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"library-building/design-best-practices"})," — design guidelines for native libraries."]})})]}),`
`,e.jsx(i,{children:"Source"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:["The example implementation lives in ",e.jsx(n,{children:"ShardScript.Framework/system/collections.shard.cpp"}),`.
View the source on GitHub: `,e.jsx(n,{children:"https://github.com/Rikitav/ShardScript/blob/main/ShardScript.Framework/system/collections.shard.cpp"}),"."]})})]})}function x(a={}){const{wrapper:r}=a.components||{};return r?e.jsx(r,{...a,children:e.jsx(h,{...a})}):h(a)}function c(a,r){throw new Error("Expected component `"+a+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
