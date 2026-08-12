import{j as e}from"./index-hFDFiLgA.js";function c(r){const n={p:"p",...r.components},{Bullet:i,Callout:o,CodeBlock:l,H2:a,InlineCode:t,Prose:s}=n;return i||d("Bullet"),o||d("Callout"),l||d("CodeBlock"),a||d("H2"),t||d("InlineCode"),s||d("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(s,{children:e.jsxs(n.p,{children:[`Native libraries that build on top of other native libraries need a safe way to find symbols that belong to
those dependencies. The ShardScript semantic model exposes a reflection-style lookup API that lets you resolve
a type by its fully qualified name at runtime inside your `,e.jsx(t,{children:"SHARDLIB_ENTRYPOINT"}),`. This
guide shows how to use `,e.jsx(t,{children:"SemanticModel::FindTypeByName"}),` for cross-library symbol lookup
combined with lazy caching so your library stays resilient to load order.`]})}),`
`,e.jsx(a,{children:"Prerequisites"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsxs(n.p,{children:["A working native library project that compiles to a shared library exporting"," ",`
`,e.jsx(t,{children:"ShardLib_GetMetadata"})," and ",e.jsx(t,{children:"ShardLib_EntryPoint"}),"."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:["The library links against the ShardScript runtime shared library and includes headers from"," ",`
`,e.jsx(t,{children:"ShardScript/include"}),"."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[`You have a second native library whose symbols you need to reference, and that library is declared as a
dependency in your `,e.jsx(t,{children:"SHARDLIB_GETMETADATA"})," block."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:["Familiarity with ",e.jsx(t,{children:"SymbolBuilder"}),", fields, and callback registration."]})})]}),`
`,e.jsx(a,{children:"Goal"}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[`Reference types and members from another native library without hard-coding pointers, relying on static
initializers, or assuming that the dependency has already registered its symbols. By the end of this guide
you will have an `,e.jsx(t,{children:"EnsureSymbols"}),` helper that lazily populates a cache of looked-up
symbols and guards every callback that depends on them.`]})}),`
`,e.jsx(a,{children:"Step-by-Step Instructions"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"1. Declare the dependency."})}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[`Even though you will look symbols up lazily, the runtime still needs to know that your library depends on
the other library. Add the dependency to `,e.jsx(t,{children:"SHARDLIB_GETMETADATA"}),` so the loader can
enforce load order.`]})}),`
`,e.jsx(l,{code:`#include <ShardScript.hpp>

using namespace shard;

SHARDLIB_GETMETADATA
{
  lib.Name        = L"shard.mylibrary";
  lib.Description = L"Library that reuses types from shard.collections";
  lib.Version     = L"1.0.0";

  static const shard::ShardLibDependencyInfo deps[] =
  {
      { L"shard.collections", L"0.1.0" }
  };
  lib.Dependencies = deps;
  lib.DependenciesLength = sizeof(deps) / sizeof(deps[0]);
}`,language:"cpp",filename:"mylibrary.cpp"}),`
`,e.jsx(s,{children:e.jsxs("strong",{children:["2. Add lazy cache variables and an ",e.jsx(t,{children:"EnsureSymbols"})," helper."]})}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:["Store the symbols your callbacks need as static pointers initialized to ",e.jsx(t,{children:"nullptr"}),`.
Populate them inside a single helper that uses the semantic model's lookup API. The helper is idempotent:
once the cache is populated it returns immediately.`]})}),`
`,e.jsx(l,{code:`// Cache for cross-library symbol lookups.
static TypeSymbol* g_listType = nullptr;
static MethodSymbol* g_listAddMethod = nullptr;
static FieldSymbol* g_listArrayField = nullptr;

static void EnsureSymbols(SymbolTable* table)
{
  if (g_listType != nullptr)
  {
      return;
  }

  // Resolve the raw generic definition by fully qualified name.
  g_listType = SemanticModel::FindTypeByName(table, L"collections.List");

  if (g_listType == nullptr)
  {
      return;
  }

  // Walk the resolved type for the members this library needs.
  ClassSymbol* listClass = static_cast<ClassSymbol*>(g_listType);

  g_listAddMethod = listClass->FindMethod(L"Add");
  g_listArrayField = listClass->FindField(L"_array");
}`,language:"cpp",filename:"mylibrary.cpp"}),`
`,e.jsx(o,{tone:"blue",title:"Why lazy lookup matters",children:e.jsxs(n.p,{children:[`Static initializers run in an unpredictable order across translation units and shared libraries. A global
pointer set during static initialization may be assigned before the dependency's entry point has
registered its symbols, leading to null or stale pointers. Lazy lookup inside`," ",`
`,e.jsx(t,{children:"SHARDLIB_ENTRYPOINT"})," or the first callback guarantees the semantic model is ready."]})}),`
`,e.jsx(s,{children:e.jsxs("strong",{children:["3. Call ",e.jsx(t,{children:"EnsureSymbols"})," from your entry point."]})}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:["The entry point receives a ",e.jsx(t,{children:"SymbolRegistrationContext"}),` that exposes the semantic model.
Seed the cache there if any symbol is needed during registration itself, such as when you register a method
whose return type comes from the other library.`]})}),`
`,e.jsx(l,{code:`SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> myNamespace(context, L"mylibrary");

  // The semantic model table is available from the registration context.
  EnsureSymbols(context.GetSemanticModel().Table.get());

  // Register a method whose callback will use the cached symbols.
  myNamespace.AddClass(L"MyType", ACS_PUBLIC, LINK_STATIC, [](SymbolBuilder<ClassSymbol> type)
  {
      type.AddMethod(L"AppendAndCount", TYPE_INT, LINK_STATIC)
          .AddParameter(L"list", TYPE_OBJECT)
          .AddParameter(L"value", TYPE_INT)
          .SetCallback(&MyLibrary_AppendAndCount);
  });
}`,language:"cpp",filename:"mylibrary.cpp"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"4. Guard every callback that depends on looked-up symbols."})}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[`Callbacks can run before or after your entry point, and the runtime may invoke them on different code paths.
Call `,e.jsx(t,{children:"EnsureSymbols"}),` at the start of each callback and fail gracefully if a symbol is
still missing.`]})}),`
`,e.jsx(l,{code:`ObjectInstance* MyLibrary_AppendAndCount(const CallState& context)
{
  SymbolTable* table = context.Program->SemanticModel.Table.get();
  EnsureSymbols(table);

  if (g_listType == nullptr || g_listAddMethod == nullptr || g_listArrayField == nullptr)
  {
      // The dependency is declared, so this should not happen once load order is enforced.
      // Throwing lets the runtime surface a ShardScript exception.
      throw std::runtime_error("Could not resolve collections.List symbols");
  }

  ObjectInstance* list = context.Args[0];
  ObjectInstance* value = context.Args[1];

  // Read the internal array to obtain the current length before adding.
  ObjectInstance* array = list->GetField(g_listArrayField->SlotIndex);
  std::size_t lengthBefore = 0;
  if (array != nullptr && array != GarbageCollector::NullInstance)
  {
      lengthBefore = array->GetArrayLength();
  }

  // Call the dependency's Add method through the runtime invocation helper.
  // Keeping a direct pointer to the method avoids a second name lookup on every call.
  std::array<ObjectInstance*, 2> addArgs = { list, value };
  context.Runtimer->InvokeMethod(g_listAddMethod, addArgs, context.Frame);

  // Return the new element count.
  std::int64_t newLength = static_cast<std::int64_t>(lengthBefore + 1);
  return context.Collector.FromValue(newLength);
}`,language:"cpp",filename:"callbacks.cpp"}),`
`,e.jsx(o,{tone:"blue",children:e.jsxs(n.p,{children:["The ",e.jsx(t,{children:"EnsureSymbols"}),` call inside the callback accepts the program's semantic model.
This is the same lookup surface used during registration, so the cache stays valid across compile-time and
runtime phases.`]})}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"5. Consume the library from ShardScript."})}),`
`,e.jsx(s,{children:e.jsx(n.p,{children:`The consumer imports both namespaces and lets the runtime resolve the dependency chain through the metadata
declarations.`})}),`
`,e.jsx(l,{code:`using stdio;
using collections;
using mylibrary;

namespace demo;

public static func Main() -> void
{
  numbers: List<int> = new List<int>();
  count: int = MyType.AppendAndCount(numbers, 10);
  println("Count: " + count);
}`,language:"csharp",filename:"app.shard"}),`
`,e.jsx(a,{children:"Verification"}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:["Build your shared library and run the ShardScript program with the ",e.jsx(t,{children:"-l"}),` flag for both
libraries.`]})}),`
`,e.jsx(l,{code:`# Windows
shard app.shard -l build/mylibrary.dll -l "\${SHARDSCRIPT_ROOT}/bin/system/collections.dll"

# Linux
shard app.shard -l build/libmylibrary.so -l "\${SHARDSCRIPT_ROOT}/bin/system/libcollections.so"

# macOS
shard app.shard -l build/libmylibrary.dylib -l "\${SHARDSCRIPT_ROOT}/bin/system/libcollections.dylib"`,language:"bash"}),`
`,e.jsx(s,{children:e.jsx(n.p,{children:"Expected output:"})}),`
`,e.jsx(l,{code:"Count: 1",language:"text"}),`
`,e.jsx(o,{tone:"green",title:"Success criteria",children:e.jsxs(n.p,{children:["If the program prints ",e.jsx(t,{children:"Count: 1"}),` without exceptions, the lazy lookup succeeded, the
cached `,e.jsx(t,{children:"List"}),` symbol is valid, and the callback invoked the dependency method
correctly.`]})}),`
`,e.jsx(a,{children:"Troubleshooting"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsxs(i,{children:[e.jsx("strong",{className:"text-text-primary",children:e.jsxs(n.p,{children:[e.jsx(t,{children:"SemanticModel::FindTypeByName"})," returns ",e.jsx(t,{children:"nullptr"})]})})," ",e.jsxs(n.p,{children:[`— Verify the fully qualified name matches the dependency's registration name, including namespace
nesting. Confirm the dependency library is loaded and declared in `,e.jsx(t,{children:"SHARDLIB_GETMETADATA"}),"."]})]}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Method callback is never called"})," — Ensure"," ",`
`,e.jsx(t,{children:".SetCallback(...)"}),` was called on the method builder and that the parameter count
and types match the ShardScript call site.`]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Crash on first use of a cached symbol"}),` — Do not assign the
cache during static initialization. Populate it inside `,e.jsx(t,{children:"EnsureSymbols"}),`, which runs
after the runtime has loaded and registered the dependency.`]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Null reference when accessing a field"}),` — Check that the
field symbol was found successfully and that `,e.jsx(t,{children:"SlotIndex"}),` is being used on the
correct instance type. Fields belong to the type that registered them.`]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Dependency library not loaded"}),` — The runtime loads libraries
in dependency order only when the dependency is declared. Double-check the name and version in`," ",`
`,e.jsx(t,{children:"SHARDLIB_GETMETADATA"}),"."]})})]}),`
`,e.jsx(a,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"library-building/inter-library-dependencies"})," — declaring and using library dependencies."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"library-building/generic-types-and-type-parameters"})," — constructing generic types at runtime."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"library-building/working-with-objects"})," — working with looked-up instances."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"library-building/shardlib-entrypoint"})," — entry point registration."]})})]})]})}function p(r={}){const{wrapper:n}=r.components||{};return n?e.jsx(n,{...r,children:e.jsx(c,{...r})}):c(r)}function d(r,n){throw new Error("Expected component `"+r+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
