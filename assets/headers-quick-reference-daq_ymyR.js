import{j as e}from"./index-BJYykHK7.js";function o(i){const n={p:"p",...i.components},{Bullet:s,Callout:d,CodeBlock:c,DocsTable:h,H2:a,InlineCode:r,Prose:t}=n;return s||l("Bullet"),d||l("Callout"),c||l("CodeBlock"),h||l("DocsTable"),a||l("H2"),r||l("InlineCode"),t||l("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(a,{children:"Summary"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[`ShardScript native libraries are authored in C++ and compiled into a shared
library that exports `,e.jsx(r,{children:"ShardLib_GetMetadata"})," and"," ",`
`,e.jsx(r,{children:"ShardLib_EntryPoint"}),`. The public headers live under the
ShardScript include directory and expose the macros, symbol-registration API,
runtime callback contract, and garbage-collection helpers that a library needs
in order to register types and methods with the VM.`]})}),`
`,e.jsx(a,{children:"Syntax"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[`Every header is included with the standard C++ preprocessor directive. Paths that
start with `,e.jsx(r,{children:"shard/"}),` are sub-headers under the ShardScript
include tree; `,e.jsx(r,{children:"ShardScript.hpp"}),` is the umbrella header that
pulls in the most commonly used ones.`]})}),`
`,e.jsx(c,{code:"#include <ShardScript.hpp>",language:"cpp"}),`
`,e.jsx(a,{children:"Parameters / Arguments"}),`
`,e.jsx(t,{children:e.jsx(n.p,{children:`The table below lists every header a native library is likely to include, the
symbols it provides, and the situation in which you should add it. Start with the
minimal include set and add headers only when the code you are writing needs the
types they declare.`})}),`
`,e.jsx(h,{headers:["Header","Purpose","When to add it"],rows:[[e.jsx(r,{children:"<ShardScript.hpp>"}),"Convenience umbrella header that transitively includes the most common registration and runtime headers.","Add to every .shard.cpp file as the first include."],[e.jsx(r,{children:"<shard/ShardScriptLIB.hpp>"}),"Defines the SHARDLIB_GETMETADATA and SHARDLIB_ENTRYPOINT export macros.",'Add to every library that registers symbols; required for the two extern "C" exports.'],[e.jsx(r,{children:"<shard/semantic/SymbolBuilder.hpp>"}),"SymbolBuilder<T> fluent API for registering namespaces, classes, structs, interfaces, enums, methods, properties, and operators.","Add when you register symbols inside SHARDLIB_ENTRYPOINT."],[e.jsx(r,{children:"<shard/runtime/MethodCallState.hpp>"}),"CallState and the native callback signature shard::ObjectInstance* Callback(const shard::CallState&).","Add when you write SetCallback callbacks or reference CallState directly."],[e.jsx(r,{children:"<shard/runtime/ObjectInstance.hpp>"}),"ObjectInstance for reading fields, array elements, string payloads, and primitive values.","Add when a callback inspects arguments, reads this, or manipulates arrays."],[e.jsx(r,{children:"<shard/runtime/GarbageCollector.hpp>"}),"GarbageCollector helpers for boxing values and allocating instances and arrays.","Add when a callback returns values via context.Collector or allocates managed objects."],[e.jsx(r,{children:"<shard/runtime/NativeAsync.hpp>"}),"DoAsync, DoValueTask<T>, CompletedTask, FaultedTask, and async scope helpers.","Add when a method returns async.Task or async.ValueTask<T>."],[e.jsx(r,{children:"<shard/runtime/NativeHelpers.hpp>"}),"GetArgs<T...>, NewObject, CallMethod, GetField, SetField, GetProperty, and SetProperty helpers.","Add when a callback constructs objects, invokes methods, reads fields, or reads primitive arguments by index."],[e.jsx(r,{children:"<shard/semantic/symbols/GenericTypeSymbol.hpp>"}),"GenericTypeSymbol and related symbols for generic classes and type parameters.","Add when registering or allocating generic types such as List<T> or Dictionary<K,V>."],[e.jsx(r,{children:"<shard/semantic/SymbolFactory.hpp>"}),"SymbolFactory for constructing array types, constructed generic types, and IEnumerable<T> at registration time.","Add when a field, parameter, or return type uses an array, generic instantiation, or IEnumerable<T>."]]}),`
`,e.jsx(a,{children:"Returns"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[`Including a header makes the declarations listed in its purpose available in the
current translation unit. The umbrella header `,e.jsx(r,{children:"ShardScript.hpp"})," ",`
is sufficient for the simplest libraries because it transitively pulls in
`,e.jsx(r,{children:"SymbolBuilder.hpp"}),", ",e.jsx(r,{children:"MethodCallState.hpp"}),`,
`,e.jsx(r,{children:"ObjectInstance.hpp"}),", and ",e.jsx(r,{children:"GarbageCollector.hpp"}),`.
Headers that are not pulled in transitively must be added explicitly:`]})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Symbol registration"})," —"," ",`
`,e.jsx(r,{children:"SymbolBuilder"})," specializations for"," ",`
`,e.jsx(r,{children:"NamespaceSymbol"}),", ",e.jsx(r,{children:"ClassSymbol"}),","," ",`
`,e.jsx(r,{children:"StructSymbol"}),", ",e.jsx(r,{children:"InterfaceSymbol"}),", and"," ",`
`,e.jsx(r,{children:"EnumSymbol"}),"."]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Callback context"})," —"," ",`
`,e.jsx(r,{children:"CallState"}),", its ",e.jsx(r,{children:"Args"}),` span, and the
`,e.jsx(r,{children:"Collector"})," reference used to box return values."]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Object manipulation"})," —"," ",`
`,e.jsx(r,{children:"ObjectInstance"}),` methods for field access, array elements,
and primitive conversion helpers such as `,e.jsx(r,{children:"AsInteger"})," and"," ",`
`,e.jsx(r,{children:"AsString"}),"."]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Async helpers"})," —"," ",`
`,e.jsx(r,{children:"DoAsync"})," and ",e.jsx(r,{children:"DoValueTask<T>"}),`
when the corresponding header is included.`]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Native helpers"})," —"," ",`
`,e.jsx(r,{children:"GetArgs<T...>"}),", ",e.jsx(r,{children:"NewObject"}),","," ",`
`,e.jsx(r,{children:"CallMethod"}),", ",e.jsx(r,{children:"GetField"}),","," ",`
`,e.jsx(r,{children:"SetField"}),", ",e.jsx(r,{children:"GetProperty"}),", and"," ",`
`,e.jsx(r,{children:"SetProperty"})," when the helpers header is included."]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Generic factories"})," —"," ",`
`,e.jsx(r,{children:"SymbolFactory::GenericType"}),","," ",`
`,e.jsx(r,{children:"SymbolFactory::Array"}),", and"," ",`
`,e.jsx(r,{children:"SymbolFactory::EnumerableOf"})," when the factory header is included."]})})]}),`
`,e.jsx(a,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"SHARDLIB_GETMETADATA is undefined"})," ",`
— You forgot to include `,e.jsx(r,{children:"<shard/ShardScriptLIB.hpp>"}),`.
The macro is required to produce the `,e.jsx(r,{children:"ShardLib_GetMetadata"})," ",`
export.`]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"SymbolBuilder is not a template"})," ",`
— You are registering symbols but did not include the symbol builder header
explicitly or transitively. Include `,e.jsx(r,{children:"<ShardScript.hpp>"})," ",`
or `,e.jsx(r,{children:"<shard/semantic/SymbolBuilder.hpp>"}),"."]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"CallState has no member named Args"})," ",`
— You referenced `,e.jsx(r,{children:"context.Args"}),` without including the
callback-state header. Include `,e.jsx(r,{children:"<ShardScript.hpp>"})," or"," ",`
`,e.jsx(r,{children:"<shard/runtime/MethodCallState.hpp>"}),"."]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"ObjectInstance is incomplete"})," ",`
— You forward-declared or missed the object header. Include`," ",`
`,e.jsx(r,{children:"<shard/runtime/ObjectInstance.hpp>"}),"."]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"DoAsync was not declared"})," ",`
— You are implementing an async method but did not include`," ",`
`,e.jsx(r,{children:"<shard/runtime/NativeAsync.hpp>"}),"."]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"GenericTypeSymbol is not a type"})," ",`
— You are declaring generic symbols without including`," ",`
`,e.jsx(r,{children:"<shard/semantic/symbols/GenericTypeSymbol.hpp>"}),"."]})})]}),`
`,e.jsx(a,{children:"Remarks"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Minimal include set."}),` The smallest practical library includes the
umbrella header and the library macro header. The umbrella header covers registration,
callback state, object manipulation, and garbage collection for the common case.`]})}),`
`,e.jsx(c,{code:"#include <ShardScript.hpp>",language:"cpp"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"When to add headers incrementally."}),` Start with the minimal set above.
Add `,e.jsx(r,{children:"<shard/runtime/NativeAsync.hpp>"}),` as soon as you return
a Task or ValueTask. Add`," ",`
`,e.jsx(r,{children:"<shard/semantic/symbols/GenericTypeSymbol.hpp>"})," and"," ",`
`,e.jsx(r,{children:"<shard/semantic/SymbolFactory.hpp>"}),` when you register or
allocate generic types. Keeping the include list close to what the file actually uses
makes the build graph easier to reason about and reduces recompilation when upstream
headers change.`]})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Transitive includes."})," Because ",e.jsx(r,{children:"ShardScript.hpp"})," ",`
is an umbrella header, it may include headers that your file does not directly use.
Do not rely on transitive includes for symbols you reference explicitly; include the
corresponding sub-header directly. This protects your library from breaking if the
umbrella header's internal include set changes.`]})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Include order."}),` There is no required order among ShardScript headers,
but place system headers such as `,e.jsx(r,{children:"<cstdint>"})," or"," ",`
`,e.jsx(r,{children:"<string>"}),` before ShardScript headers, and place project
headers last. Use `,e.jsx(r,{children:"using namespace shard;"}),` only after the
includes, or qualify names with the `,e.jsx(r,{children:"shard::"})," prefix."]})}),`
`,e.jsx(d,{tone:"blue",children:e.jsxs(n.p,{children:["Always include ",e.jsx(r,{children:"<shard/ShardScriptLIB.hpp>"}),` in addition to
the umbrella header. The macros it defines are not optional: they create the two`," ",`
`,e.jsx(r,{children:'extern "C"'}),` exports that the ShardScript loader looks
for when it loads your shared library.`]})}),`
`,e.jsx(a,{children:"Examples"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Minimal library with only the umbrella and macro headers."}),` This is the
smallest include set that still produces a valid native library. It is suitable for a
library that defines a namespace and a few static methods whose callbacks only need
primitive arguments and boxed return values.`]})}),`
`,e.jsx(c,{code:`#include <ShardScript.hpp>

using namespace shard;

SHARDLIB_GETMETADATA
{
  lib.Name        = L"shard.example";
  lib.Description = L"Minimal header example";
  lib.Version     = L"1.0.0";
}

static ObjectInstance* double_value(const CallState& context)
{
  std::int64_t value = context.Args[0]->AsInteger();
  return context.Collector.FromValue(value * 2);
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> ns(context, L"example");

  ns.AddMethod(L"Double", TYPE_INT, LINK_STATIC)
      .AddParameter(L"value", TYPE_INT)
      .SetCallback(&double_value);
}`,language:"cpp"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Typical library that works with objects and arrays."}),` The umbrella header
already covers `,e.jsx(r,{children:"ObjectInstance"})," and"," ",`
`,e.jsx(r,{children:"GarbageCollector"}),`, so the extra headers are only the ones that
are not transitively included.`]})}),`
`,e.jsx(c,{code:`#include <ShardScript.hpp>

using namespace shard;

SHARDLIB_GETMETADATA
{
  lib.Name        = L"shard.containers";
  lib.Description = L"Collection helpers";
  lib.Version     = L"1.0.0";
}

static ObjectInstance* first_element(const CallState& context)
{
  ObjectInstance* array = context.Args[0];

  if (array == nullptr || array == GarbageCollector::NullInstance)
  {
      return context.Collector.FromValue(std::wstring());
  }

  ObjectInstance* first = array->GetElement(0, context.Frame);
  return first;
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> ns(context, L"containers");

  ns.AddMethod(L"First", TYPE_ANY, LINK_STATIC)
      .AddParameter(L"source", TYPE_ANY)
      .SetCallback(&first_element);
}`,language:"cpp"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Advanced library with async and generics."}),` Add the async and generic
headers explicitly because they are not pulled in by the umbrella header.`]})}),`
`,e.jsx(c,{code:`#include <ShardScript.hpp>
#include <shard/runtime/NativeAsync.hpp>
#include <shard/semantic/symbols/GenericTypeSymbol.hpp>
#include <shard/semantic/SymbolFactory.hpp>

using namespace shard;

SHARDLIB_GETMETADATA
{
  lib.Name        = L"shard.advanced";
  lib.Description = L"Async and generic example";
  lib.Version     = L"1.0.0";
}

static ObjectInstance* delayed_value(const CallState& context) noexcept
{
  return DoValueTask<std::int64_t>(context, [](AsyncValueScope<std::int64_t> async)
  {
      async.Delay(500, [async]() mutable
      {
          // Complete the task after the requested delay.
          async.Complete(42);
      });
  });
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> ns(context, L"advanced");

  ns.AddMethod(L"DelayedValue", TYPE_ANY, LINK_STATIC)
      .SetCallback(&delayed_value);
}`,language:"cpp"}),`
`,e.jsx(a,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx(r,{children:"library-building/shardlib-entrypoint"})," — library entry point macros."]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx(r,{children:"library-building/native-callback-helpers"})," — callback helper functions."]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx(r,{children:"library-building/async-helpers-reference"})," — async helper reference."]})})]}),`
`,e.jsx(a,{children:"Source"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:["The native side of this API is implemented in ",e.jsx(r,{children:"shard/runtime/NativeHelpers.hpp"}),`.
View the source on GitHub: `,e.jsx(r,{children:"https://github.com/Rikitav/ShardScript/blob/main/ShardScript/include/shard/runtime/NativeHelpers.hpp"}),"."]})})]})}function x(i={}){const{wrapper:n}=i.components||{};return n?e.jsx(n,{...i,children:e.jsx(o,{...i})}):o(i)}function l(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
