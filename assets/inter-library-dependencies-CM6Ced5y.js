import{j as e}from"./index-BJYykHK7.js";function h(r){const s={p:"p",...r.components},{Bullet:i,Callout:o,CodeBlock:l,DocsTable:d,H2:a,InlineCode:t,Prose:n}=s;return i||c("Bullet"),o||c("Callout"),l||c("CodeBlock"),d||c("DocsTable"),a||c("H2"),t||c("InlineCode"),n||c("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:e.jsxs(s.p,{children:["A ShardScript native library is any shared library (",e.jsx(t,{children:".dll"}),","," ",`
`,e.jsx(t,{children:".so"}),", or ",e.jsx(t,{children:".dylib"}),`) that exports the two C-linkage symbols
`,e.jsx(t,{children:"ShardLib_GetMetadata"})," and ",e.jsx(t,{children:"ShardLib_EntryPoint"}),`. It can be
built from one C++ source file or many, and it can live inside`," ",`
`,e.jsx(t,{children:"ShardScript.Framework"}),` or in a completely separate project. This guide shows how
a standalone library declares that it needs symbols from another native library, and how to look those
symbols up lazily so the loader order does not introduce crashes.`]})}),`
`,e.jsx(a,{children:"Prerequisites"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsxs(s.p,{children:[`A working C++20 toolchain, CMake 3.20 or later, and a built ShardScript runtime shared library with
headers in `,e.jsx(t,{children:"ShardScript/include"}),"."]})}),e.jsx(i,{children:e.jsxs(s.p,{children:["A library you depend on is already built and loadable. This guide uses"," ",`
`,e.jsx(t,{children:"shard.collections"})," as the dependency."]})}),e.jsx(i,{children:e.jsxs(s.p,{children:["Familiarity with ",e.jsx(t,{children:"SHARDLIB_GETMETADATA"}),","," ",`
`,e.jsx(t,{children:"SHARDLIB_ENTRYPOINT"}),", and the ",e.jsx(t,{children:"SymbolBuilder<T>"})," ",`
registration API.`]})})]}),`
`,e.jsx(a,{children:"Goal"}),`
`,e.jsx(n,{children:e.jsxs(s.p,{children:["Build a standalone native library named ",e.jsx(t,{children:"shard.textutils"})," that depends on"," ",`
`,e.jsx(t,{children:"shard.collections"}),". The library will register a static method that returns a new"," ",`
`,e.jsx(t,{children:"List<string>"})," and another method that checks whether an object is a"," ",`
`,e.jsx(t,{children:"collections.List"}),` at runtime. The dependency is declared in metadata, and the
cross-library type is resolved lazily through an `,e.jsx(t,{children:"EnsureSymbols"})," helper."]})}),`
`,e.jsx(a,{children:"Step-by-Step Instructions"}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"1. Create the project layout."})}),`
`,e.jsx(n,{children:e.jsx(s.p,{children:`Place the library in its own directory. A single source file is enough for this example, but the same
patterns work when the code is split across multiple files.`})}),`
`,e.jsx(d,{headers:["Path","Purpose"],rows:[["textutils/CMakeLists.txt","Build script that produces the shared library."],["textutils/textutils.cpp","Metadata, symbol registration, and callback bodies."],["textutils/app.shard","ShardScript program that consumes the library."]]}),`
`,e.jsx(n,{children:e.jsxs("strong",{children:["2. Declare the dependency in ",e.jsx(t,{children:"SHARDLIB_GETMETADATA"}),"."]})}),`
`,e.jsx(n,{children:e.jsxs(s.p,{children:["Fill a ",e.jsx(t,{children:"shard::ShardLibDependencyInfo"})," array and assign it to"," ",`
`,e.jsx(t,{children:"lib.Dependencies"}),`. The runtime loader uses this list to enforce load order before
your entry point runs. Version strings can be exact versions or use common semver prefixes such as`," ",`
`,e.jsx(t,{children:"^"})," and ",e.jsx(t,{children:">="}),"."]})}),`
`,e.jsx(l,{code:`#include <ShardScript.hpp>

using namespace shard;

SHARDLIB_GETMETADATA
{
  lib.Name        = L"shard.textutils";
  lib.Description = L"Text helpers that reuse collections";
  lib.Version     = L"1.0.0";

  static const shard::ShardLibDependencyInfo deps[] =
  {
      { L"shard.collections", L"0.3.0" },
      { L"shard.streams",     L"^0.2.0" }
  };

  lib.Dependencies = deps;
  lib.DependenciesLength = sizeof(deps) / sizeof(deps[0]);
}`,language:"cpp",filename:"textutils.cpp"}),`
`,e.jsx(o,{tone:"red",title:"Avoid eager static initialization",children:e.jsx(s.p,{children:`Do not assign cross-library symbol pointers during static initialization. The load order between libraries
is not guaranteed, so the other library's types may not exist when your static constructors run.`})}),`
`,e.jsx(l,{code:`// BAD: this pointer may be null or point to an incomplete symbol table.
static ClassSymbol* g_listClass =
  SemanticModel::FindTypeByName(nullptr, L"collections.List");

// GOOD: leave the pointer null and resolve it later inside EnsureSymbols.
static ClassSymbol* g_listClass = nullptr;`,language:"cpp"}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"3. Register your own symbols."})}),`
`,e.jsx(n,{children:e.jsxs(s.p,{children:["Use ",e.jsx(t,{children:"SHARDLIB_ENTRYPOINT"})," to create the ",e.jsx(t,{children:"textutils"})," ",`
namespace and register the static class. The callbacks are defined in the same file in this example, but
they can just as easily live in a separate translation unit.`]})}),`
`,e.jsx(l,{code:`// Forward declarations for the callbacks defined later in the file.
static ObjectInstance* TextUtils_CreateStringList(const CallState& context);
static ObjectInstance* TextUtils_IsList(const CallState& context);

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> textutils(context, L"textutils");

  textutils.AddClass(L"TextUtils", ACS_PUBLIC, LINK_STATIC, [](SymbolBuilder<ClassSymbol> type)
  {
      type.AddMethod(L"CreateStringList", TYPE_ANY, LINK_STATIC)
          .SetCallback(&TextUtils_CreateStringList);

      type.AddMethod(L"IsList", TYPE_BOOL, LINK_STATIC)
          .AddParameter(L"value", TYPE_ANY)
          .SetCallback(&TextUtils_IsList);
  });
}`,language:"cpp",filename:"textutils.cpp"}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"4. Add a lazy lookup helper."})}),`
`,e.jsx(n,{children:e.jsxs(s.p,{children:["Store the looked-up symbol in a static pointer and resolve it on first use. The helper takes a"," ",`
`,e.jsx(t,{children:"SymbolTable*"}),` from the current call context, so it works regardless of which
library finished loading first.`]})}),`
`,e.jsx(l,{code:`static ClassSymbol* g_listClass = nullptr;

static void EnsureSymbols(SymbolTable* table)
{
  if (g_listClass != nullptr)
  {
      return;
  }

  TypeSymbol* listType = SemanticModel::FindTypeByName(table, L"collections.List");
  if (listType == nullptr)
  {
      return;
  }

  g_listClass = dynamic_cast<ClassSymbol*>(listType);
}`,language:"cpp",filename:"textutils.cpp"}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"5. Use the looked-up type in callbacks."})}),`
`,e.jsx(n,{children:e.jsxs(s.p,{children:["Call ",e.jsx(t,{children:"EnsureSymbols"}),` at the start of every callback that needs the symbol. If the
dependency is missing, fail gracefully instead of dereferencing a null pointer. The first callback
allocates a generic `,e.jsx(t,{children:"List<string>"}),` instance; the second checks the runtime
type of an arbitrary object.`]})}),`
`,e.jsx(l,{code:`static ObjectInstance* TextUtils_CreateStringList(const CallState& context)
{
  EnsureSymbols(context.GetSemanticModel().Table.get());

  if (g_listClass == nullptr)
  {
      // collections.List is not available; return null so the caller can react.
      return GarbageCollector::NullInstance;
  }

  // AllocateGeneric constructs List<string> from the raw List<T> definition.
  return context.Collector.AllocateGeneric(g_listClass, { TYPE_STRING });
}

static ObjectInstance* TextUtils_IsList(const CallState& context)
{
  EnsureSymbols(context.GetSemanticModel().Table.get());

  ObjectInstance* value = context.Args[0];
  if (value == nullptr || value == GarbageCollector::NullInstance)
  {
      return context.Collector.FromValue(false);
  }

  // For generic instances, getInfo() returns the raw generic definition.
  ClassSymbol* runtimeType = value->getInfo();
  bool isList = (runtimeType != nullptr && runtimeType == g_listClass);

  return context.Collector.FromValue(isList);
}`,language:"cpp",filename:"textutils.cpp"}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"6. Write the build script."})}),`
`,e.jsx(n,{children:e.jsxs(s.p,{children:[`The CMake target is a normal shared library. It links against the ShardScript runtime shared library and
points the include path at `,e.jsx(t,{children:"ShardScript/include"}),`. Because this library depends on
`,e.jsx(t,{children:"shard.collections"}),", both shared libraries must be loaded at runtime."]})}),`
`,e.jsx(l,{code:`cmake_minimum_required(VERSION 3.20)
project(TextUtils CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

set(SHARDSCRIPT_ROOT "\${CMAKE_CURRENT_SOURCE_DIR}/../ShardScript"
  CACHE PATH "Root of the ShardScript repository or install prefix")

find_library(SHARDSCRIPT_LIB
  NAMES ShardScript libShardScript
  PATHS
      "\${SHARDSCRIPT_ROOT}/build/bin"
      "\${SHARDSCRIPT_ROOT}/build/bin/Release"
      "\${SHARDSCRIPT_ROOT}/lib"
  NO_DEFAULT_PATH
  REQUIRED
)

add_library(textutils SHARED textutils.cpp)

set_target_properties(textutils PROPERTIES
  WINDOWS_EXPORT_ALL_SYMBOLS ON
  RUNTIME_OUTPUT_DIRECTORY "\${CMAKE_BINARY_DIR}/bin"
  LIBRARY_OUTPUT_DIRECTORY "\${CMAKE_BINARY_DIR}/bin"
)

target_include_directories(textutils PRIVATE "\${SHARDSCRIPT_ROOT}/ShardScript/include")
target_link_libraries(textutils PRIVATE \${SHARDSCRIPT_LIB})`,language:"cmake",filename:"CMakeLists.txt"}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"7. Build and load both libraries."})}),`
`,e.jsx(n,{children:e.jsxs(s.p,{children:[`Configure and build the project, then run the ShardScript interpreter with both the dependency and your
library on the command line. The order of `,e.jsx(t,{children:"-l"}),` flags does not matter because the
metadata dependency declaration tells the loader the correct order.`]})}),`
`,e.jsx(l,{code:`cmake -S . -B build -G Ninja -DCMAKE_BUILD_TYPE=Release
cmake --build build --parallel`,language:"bash"}),`
`,e.jsx(l,{code:`using stdio;
using textutils;
using collections;

namespace demo;

public static func Main() -> void
{
  list: List<string> = TextUtils.CreateStringList();
  list.Add("hello");
  list.Add("world");

  println("length: " + list.Length);
  println("is list: " + TextUtils.IsList(list));
  println("is list: " + TextUtils.IsList("not a list"));
}`,language:"csharp",filename:"app.shard"}),`
`,e.jsx(l,{code:`# Windows
shard app.shard -l path/to/collections.dll -l build/bin/textutils.dll

# Linux
shard app.shard -l path/to/libcollections.so -l build/bin/libtextutils.so

# macOS
shard app.shard -l path/to/libcollections.dylib -l build/bin/libtextutils.dylib`,language:"bash"}),`
`,e.jsx(a,{children:"Verification"}),`
`,e.jsx(n,{children:e.jsx(s.p,{children:"Confirm that both shared libraries are found in their expected output directories."})}),`
`,e.jsx(l,{code:`# Windows
ls path/to/collections.dll
ls build/bin/textutils.dll

# Linux
ls path/to/libcollections.so
ls build/bin/libtextutils.so`,language:"bash"}),`
`,e.jsx(n,{children:e.jsx(s.p,{children:`Run the ShardScript program. If the dependency declaration and lazy lookup are correct, the output should
show that the list was created, populated, and identified as a list:`})}),`
`,e.jsxs(n,{children:[e.jsx(t,{children:"length: 2"}),e.jsx("br",{}),e.jsx(t,{children:"is list: True"}),e.jsx("br",{}),e.jsx(t,{children:"is list: False"})]}),`
`,e.jsx(o,{tone:"green",title:"Success criteria",children:e.jsxs(s.p,{children:["The program prints the list length and correctly distinguishes a ",e.jsx(t,{children:"List<string>"}),`
instance from a plain string. If `,e.jsx(t,{children:"TextUtils.CreateStringList"}),` returned null, the
dependency was not loaded or the symbol lookup failed.`]})}),`
`,e.jsx(a,{children:"Troubleshooting"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"The callback receives a null symbol pointer."}),` Make sure
every callback that needs the symbol calls `,e.jsx(t,{children:"EnsureSymbols"}),` before using the cached
pointer. Do not access the pointer from a static constructor or from`," ",`
`,e.jsx(t,{children:"SHARDLIB_ENTRYPOINT"})," before the dependency's entry point has run."]})}),e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"The lookup returns null even though the dependency is loaded."}),`
Check the fully qualified name passed to `,e.jsx(t,{children:"SemanticModel::FindTypeByName"}),`. For
`,e.jsx(t,{children:"collections.List"}),", the namespace is ",e.jsx(t,{children:"collections"}),` and the
type name is `,e.jsx(t,{children:"List"}),". Generic type arguments are not part of the lookup name."]})}),e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"The loader reports a missing dependency."}),` Verify that the
dependency is listed in `,e.jsx(t,{children:"lib.Dependencies"}),` and that the version string matches a
loaded library. If the dependency is optional, do not list it in metadata; instead, handle a null lookup
gracefully at runtime.`]})}),e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"The program crashes during module load."}),` Look for global
constructors or non-trivial static initializers that touch ShardScript symbols before all entry points
have run. Move that work into `,e.jsx(t,{children:"EnsureSymbols"})," or into the callback body."]})}),e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Generic allocation fails."})," When calling"," ",`
`,e.jsx(t,{children:"AllocateGeneric"}),`, pass the raw generic class symbol and the concrete type
arguments in the same order as the type parameters were registered. Do not pass a constructed generic
type symbol.`]})})]}),`
`,e.jsx(a,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx(t,{children:"library-building/reflection-style-lookups"})," — reflection-style symbol lookups."]})}),e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx(t,{children:"library-building/generic-types-and-type-parameters"})," — generic type construction across libraries."]})}),e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx(t,{children:"library-building/library-build-setup"})," — declaring dependencies in CMake and metadata."]})}),e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx(t,{children:"library-building/design-best-practices"})," — design guidelines."]})})]})]})}function u(r={}){const{wrapper:s}=r.components||{};return s?e.jsx(s,{...r,children:e.jsx(h,{...r})}):h(r)}function c(r,s){throw new Error("Expected component `"+r+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};
