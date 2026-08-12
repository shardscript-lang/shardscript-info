import{j as e}from"./index-DbX8E4-q.js";function h(a){const r={p:"p",strong:"strong",...a.components},{Bullet:s,Callout:c,CodeBlock:o,DocsTable:l,H2:t,InlineCode:n,Prose:i}=r;return s||d("Bullet"),c||d("Callout"),o||d("CodeBlock"),l||d("DocsTable"),t||d("H2"),n||d("InlineCode"),i||d("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:"Summary"}),`
`,e.jsx(i,{children:e.jsxs(r.p,{children:["The ",e.jsx(n,{children:"SHARDLIB_GETMETADATA"})," and ",e.jsx(n,{children:"SHARDLIB_ENTRYPOINT"}),` macros define the only
two symbols a native C++ ShardScript library must export. `,e.jsx(n,{children:"SHARDLIB_GETMETADATA"}),` fills the library
metadata record, including its name, description, version, and optional dependencies.
`,e.jsx(n,{children:"SHARDLIB_ENTRYPOINT"}),` registers every namespace, type, method, property, and operator that the
library exposes to ShardScript code. The build system compiles each `,e.jsx(n,{children:".shard.cpp"}),` file into a
separate shared library, and the runtime resolves the exported C symbols at load time.`]})}),`
`,e.jsx(t,{children:"Syntax"}),`
`,e.jsx(i,{children:e.jsxs(r.p,{children:["Place both macros at global scope in a single ",e.jsx(n,{children:".shard.cpp"}),` source file. The preprocessor expands
each macro into an `,e.jsx(n,{children:'extern "C"'}),` function decorated with the platform visibility attribute
required for dynamic linking.`]})}),`
`,e.jsx(l,{headers:["Macro","Expanded export"],rows:[[e.jsx(n,{children:"SHARDLIB_GETMETADATA"}),e.jsx(e.Fragment,{children:e.jsx(n,{children:'extern "C" void ShardLib_GetMetadata(shard::ShardLibMetadata& lib)'})})],[e.jsx(n,{children:"SHARDLIB_ENTRYPOINT"}),e.jsx(e.Fragment,{children:e.jsx(n,{children:'extern "C" void ShardLib_EntryPoint(shard::CompilationContext& context)'})})]]}),`
`,e.jsx(t,{children:"Parameters / Arguments"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"ShardLibMetadata fields"})}),`
`,e.jsx(l,{headers:["Field","Type","Required","Description"],rows:[[e.jsx(n,{children:"Name"}),e.jsx(n,{children:"const wchar_t*"}),"Yes",'Unique library identifier, for example L"shard.mylibrary".'],[e.jsx(n,{children:"Description"}),e.jsx(n,{children:"const wchar_t*"}),"No","Short human-readable summary of the library."],[e.jsx(n,{children:"Version"}),e.jsx(n,{children:"const wchar_t*"}),"Yes",'Semantic version of the library, for example L"1.0.0".'],[e.jsx(n,{children:"Dependencies"}),e.jsx(n,{children:"const ShardLibDependencyInfo*"}),"No","Pointer to the first element of a dependency array."],[e.jsx(n,{children:"DependenciesLength"}),e.jsx(n,{children:"std::size_t"}),"No","Number of entries in the array pointed to by Dependencies."]]}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"ShardLibDependencyInfo fields"})}),`
`,e.jsx(l,{headers:["Field","Type","Description"],rows:[[e.jsx(n,{children:"Name"}),e.jsx(n,{children:"const wchar_t*"}),'Name of the required library, for example L"shard.streams".'],[e.jsx(n,{children:"VersionExpression"}),e.jsx(n,{children:"const wchar_t*"}),'Version constraint accepted by the loader, for example L"0.1.0" or L"^0.3.0".']]}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Entry point context"})}),`
`,e.jsx(l,{headers:["Parameter","Type","Description"],rows:[[e.jsx(n,{children:"context"}),e.jsx(n,{children:"shard::CompilationContext&"}),"Registration context used to build NamespaceSymbol, ClassSymbol, MethodSymbol, and other semantic symbols."]]}),`
`,e.jsx(t,{children:"Returns"}),`
`,e.jsx(l,{headers:["Export","Return type","Description"],rows:[[e.jsx(n,{children:"ShardLib_GetMetadata"}),e.jsx(n,{children:"void"}),"Fills the supplied ShardLibMetadata structure; no value is returned."],[e.jsx(n,{children:"ShardLib_EntryPoint"}),e.jsx(n,{children:"void"}),"Registers symbols into the compilation context; no value is returned."]]}),`
`,e.jsx(t,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Missing export"}),` — A library that does not export both
`,e.jsx(n,{children:"ShardLib_GetMetadata"})," and ",e.jsx(n,{children:"ShardLib_EntryPoint"}),` is rejected by the
runtime loader with a runtime error naming the library path.`]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Missing metadata"})," — Leaving ",e.jsx(n,{children:"lib.Name"}),` or
`,e.jsx(n,{children:"lib.Version"})," as ",e.jsx(n,{children:"nullptr"}),` produces an invalid metadata record and may
cause the loader to skip the library.`]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Unresolved dependency"}),` — If a dependency listed in
`,e.jsx(n,{children:"lib.Dependencies"}),` is not present, the runtime throws a load-order error before
`,e.jsx(n,{children:"ShardLib_EntryPoint"})," is invoked."]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Registration-time C++ exception"}),` — Throwing from inside
`,e.jsx(n,{children:"SHARDLIB_ENTRYPOINT"}),` aborts library load and propagates the exception message to the
ShardScript host.`]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Callback signature mismatch"}),` — Registering a native callback whose
signature is not `,e.jsx(n,{children:"shard::ObjectInstance*(const shard::CallState&)"}),` results in undefined
behavior when the method is invoked.`]})})]}),`
`,e.jsx(t,{children:"Remarks"}),`
`,e.jsx(i,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Required headers."})," A minimal library includes ",e.jsx(n,{children:"<ShardScript.hpp>"}),`, which
transitively pulls in the registration and runtime helpers, and `,e.jsx(n,{children:"<shard/ShardScriptLIB.hpp>"}),`,
which declares the macros. Add specialized headers such as `,e.jsx(n,{children:"<shard/semantic/SymbolBuilder.hpp>"}),`
only when you need the corresponding fluent registration API.`]})}),`
`,e.jsx(i,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"One file per shared library."})," The CMake glob in ",e.jsx(n,{children:"ShardScript.Framework/CMakeLists.txt"}),`
builds every `,e.jsx(n,{children:"*.shard.cpp"}),` file into its own shared library. Keep one logical library per file so
the output name, metadata name, and exported symbols stay aligned.`]})}),`
`,e.jsx(i,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"C linkage and symbol names."})," The macros intentionally expand to ",e.jsx(n,{children:'extern "C"'}),`
functions named `,e.jsx(n,{children:"ShardLib_GetMetadata"})," and ",e.jsx(n,{children:"ShardLib_EntryPoint"}),`. Do not
define these functions manually or change their names; the runtime searches for exactly these exported names.`]})}),`
`,e.jsx(i,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Dependency declaration."}),` Declare every library you depend on inside
`,e.jsx(n,{children:"SHARDLIB_GETMETADATA"}),`. The loader uses the dependency list to enforce load order before calling
your entry point. The dependency array must remain valid for the lifetime of the shared library; store it in a
`,e.jsx(n,{children:"static const"})," array or in another storage that is not destroyed when the function returns."]})}),`
`,e.jsx(i,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"No global symbol registration."})," All calls to ",e.jsx(n,{children:"SymbolBuilder"}),` and related APIs must
happen inside `,e.jsx(n,{children:"SHARDLIB_ENTRYPOINT"}),`. Avoid global constructors or static initializers that touch
ShardScript symbols, because load order is not guaranteed.`]})}),`
`,e.jsx(c,{tone:"blue",children:e.jsxs(r.p,{children:[`Keep dependency arrays alive for the lifetime of the module. Returning a pointer to a stack-allocated array from
`,e.jsx(n,{children:"SHARDLIB_GETMETADATA"}),` is a use-after-return bug that may corrupt the metadata seen by the
loader.`]})}),`
`,e.jsx(c,{tone:"amber",title:"Platform differences",children:e.jsxs(r.p,{children:["On Windows the macros use ",e.jsx(n,{children:"__declspec(dllexport)"}),`; on GCC they use
`,e.jsxs(n,{children:[e.jsx(r.strong,{children:"attribute"}),'((visibility("default")))']}),`. The source code is identical on both platforms because
the macro hides the attribute.`]})}),`
`,e.jsx(t,{children:"Examples"}),`
`,e.jsx(i,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Minimal native library."})," The following ",e.jsx(n,{children:"math.shard.cpp"}),` file declares a library
named `,e.jsx(n,{children:"shard.minmath"}),", optionally depends on ",e.jsx(n,{children:"shard.stdio"}),`, and registers a
single static method that doubles an integer.`]})}),`
`,e.jsx(o,{code:`#include <ShardScript.hpp>

using namespace shard;

SHARDLIB_GETMETADATA
{
  lib.Name        = L"shard.minmath";
  lib.Description = L"Minimal arithmetic helpers for ShardScript.";
  lib.Version     = L"1.0.0";

  static const shard::ShardLibDependencyInfo deps[] =
  {
      { L"shard.stdio", L"1.0.0" }
  };

  lib.Dependencies       = deps;
  lib.DependenciesLength = sizeof(deps) / sizeof(deps[0]);
}

static ObjectInstance* DoubleValue(const CallState& context)
{
  // Read the first real argument; static methods have no implicit this.
  std::int64_t value = context.Args[0]->AsInteger();
  return context.Collector.FromValue(value * 2);
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> minmath(context, L"minmath");

  minmath.AddMethod(L"Double", TYPE_INT, LINK_STATIC, ACS_PUBLIC)
         .AddParameter(L"value", TYPE_INT)
         .SetCallback(&DoubleValue);
}`,language:"cpp",filename:"math.shard.cpp"}),`
`,e.jsx(i,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"ShardScript consumer."}),` After the native library is built and discovered by the runtime, the registered
namespace and method are visible to ShardScript code.`]})}),`
`,e.jsx(o,{code:`using stdio;
using minmath;

namespace demo;

public static func Main() -> void
{
  input: int  = 21;
  result: int = minmath.Double(input);

  println(result);   // 42
}`,language:"csharp"}),`
`,e.jsx(i,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Library with dependencies only."}),` If a library exists only to bundle types that depend on another standard
library, declare the dependency in metadata and perform lazy cross-library lookups inside callbacks.`]})}),`
`,e.jsx(o,{code:`#include <ShardScript.hpp>

using namespace shard;

SHARDLIB_GETMETADATA
{
  lib.Name        = L"shard.depends";
  lib.Description = L"Library that relies on shard.collections.";
  lib.Version     = L"0.1.0";

  static const shard::ShardLibDependencyInfo deps[] =
  {
      { L"shard.collections", L"^0.3.0" }
  };

  lib.Dependencies       = deps;
  lib.DependenciesLength = sizeof(deps) / sizeof(deps[0]);
}

static TypeSymbol* g_listType = nullptr;

static void EnsureListType(SymbolTable* table)
{
  if (g_listType != nullptr)
  {
      return;
  }

  // Lazy lookup avoids brittle static initialization order.
  g_listType = SemanticModel::FindTypeByName(table, L"collections.List");
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> depends(context, L"depends");

  depends.AddMethod(L"UseList", TYPE_VOID, LINK_STATIC, ACS_PUBLIC)
         .SetCallback([](const CallState& context)
         {
             EnsureListType(context.GetSemanticModel().Table.get());

             // Callback body omitted for brevity.
             return nullptr;
         });
}`,language:"cpp",filename:"depends.shard.cpp"}),`
`,e.jsx(t,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"library-building/accessibility-and-linking"})," — linking and accessibility values."]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"library-building/native-library-overview"})," — native library loading overview."]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"library-building/library-build-setup"})," — CMake build setup."]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"library-building/headers-quick-reference"})," — header quick reference."]})})]}),`
`,e.jsx(t,{children:"Source"}),`
`,e.jsx(i,{children:e.jsxs(r.p,{children:["The native side of this API is implemented in ",e.jsx(n,{children:"shard/runtime/NativeLibrary.hpp"}),`.
View the source on GitHub: `,e.jsx(n,{children:"https://github.com/Rikitav/ShardScript/blob/main/ShardScript/include/shard/runtime/NativeLibrary.hpp"}),"."]})})]})}function x(a={}){const{wrapper:r}=a.components||{};return r?e.jsx(r,{...a,children:e.jsx(h,{...a})}):h(a)}function d(a,r){throw new Error("Expected component `"+a+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
