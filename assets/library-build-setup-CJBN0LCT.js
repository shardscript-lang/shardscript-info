import{j as e}from"./index-BJYykHK7.js";function o(l){const i={p:"p",...l.components},{Bullet:a,Callout:c,CodeBlock:n,DocsTable:h,H2:s,InlineCode:r,Prose:t}=i;return a||d("Bullet"),c||d("Callout"),n||d("CodeBlock"),h||d("DocsTable"),s||d("H2"),r||d("InlineCode"),t||d("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:e.jsxs(i.p,{children:[`A ShardScript native library is any shared library that exports the two C-linkage symbols
`,e.jsx(r,{children:"ShardLib_GetMetadata"})," and ",e.jsx(r,{children:"ShardLib_EntryPoint"}),`. It can be
built from one or more C++ source files, inside the ShardScript.Framework tree or in a completely
separate project. This guide focuses on the standalone-directory case: writing a normal CMake target,
locating the ShardScript headers, linking against the ShardScript shared library, choosing an output
directory, and loading the result at runtime.`]})}),`
`,e.jsx(s,{children:"Prerequisites"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(a,{children:e.jsx(i.p,{children:"CMake 3.20 or later and a C++20 toolchain (MSVC on Windows, GCC or Clang on Linux, Clang on macOS)."})}),e.jsx(a,{children:e.jsxs(i.p,{children:["A built ShardScript runtime shared library and the headers in"," ",`
`,e.jsx(r,{children:"ShardScript/include"}),"."]})}),e.jsx(a,{children:e.jsxs(i.p,{children:["Optional: an external library already available through ",e.jsx(r,{children:"find_package"}),","," ",`
`,e.jsx(r,{children:"FetchContent"}),", or a system package manager."]})})]}),`
`,e.jsx(s,{children:"Goal"}),`
`,e.jsx(t,{children:e.jsx(i.p,{children:`Produce a shared library from one or more C++ source files in a project that is not inside the
ShardScript repository, link it against the ShardScript runtime, and make it loadable by the
interpreter.`})}),`
`,e.jsx(s,{children:"Step-by-Step Instructions"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"1. Create the project layout."})}),`
`,e.jsx(t,{children:e.jsx(i.p,{children:`Place your source files in a dedicated directory. This example uses two files so registration and
implementation are separated, but a single file is also valid.`})}),`
`,e.jsx(h,{headers:["Path","Purpose"],rows:[["my-library/CMakeLists.txt","Build script for the shared library."],["my-library/library.cpp","Metadata and symbol registration."],["my-library/callbacks.cpp","Native callback implementations."]]}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"2. Write the C++ source files."})}),`
`,e.jsx(t,{children:e.jsxs(i.p,{children:["Include ",e.jsx(r,{children:"shard/ShardScriptLIB.hpp"}),` and the semantic headers, then export the two
required entry points. The example below registers one namespace with a single static method.`]})}),`
`,e.jsx(n,{code:`#include <shard/ShardScriptLIB.hpp>
#include <shard/runtime/ObjectInstance.hpp>
#include <shard/runtime/MethodCallState.hpp>

using namespace shard;

ObjectInstance* MyLibrary_Double(const CallState& context)
{
  std::int64_t value = context.Args[0]->AsInteger();
  return context.Collector.FromValue(value * 2);
}`,language:"cpp",filename:"callbacks.cpp"}),`
`,e.jsx(n,{code:`#include <shard/ShardScriptLIB.hpp>
#include <shard/CompilationContext.hpp>
#include <shard/semantic/SymbolBuilder.hpp>

using namespace shard;

ObjectInstance* MyLibrary_Double(const CallState& context);

SHARDLIB_GETMETADATA
{
  lib.Name        = L"shard.math_ext";
  lib.Description = L"Extended math helpers";
  lib.Version     = L"1.0.0";
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> mathExt(context, L"math_ext");

  mathExt.AddMethod(L"Double", TYPE_INT, LINK_STATIC, ACS_PUBLIC)
      .AddParameter(L"value", TYPE_INT)
      .SetCallback(&MyLibrary_Double);
}`,language:"cpp",filename:"library.cpp"}),`
`,e.jsx(t,{children:e.jsxs(i.p,{children:["The ",e.jsx(r,{children:"SHARDLIB_GETMETADATA"})," and ",e.jsx(r,{children:"SHARDLIB_ENTRYPOINT"})," ",`
macros produce the `,e.jsx(r,{children:'extern "C"'})," exports that the runtime loader expects."]})}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"3. Write the CMakeLists.txt."})}),`
`,e.jsx(t,{children:e.jsxs(i.p,{children:["The CMake target is a normal shared library. Locate the ShardScript runtime library with"," ",`
`,e.jsx(r,{children:"find_library"}),", add the include directory, and link. On Windows, enable"," ",`
`,e.jsx(r,{children:"WINDOWS_EXPORT_ALL_SYMBOLS"}),` or explicitly export the two entry points so they are
visible to the runtime loader.`]})}),`
`,e.jsx(n,{code:`cmake_minimum_required(VERSION 3.20)
project(MyLibrary CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Adjust this path to point at your ShardScript checkout or install prefix.
set(SHARDSCRIPT_ROOT "\${CMAKE_CURRENT_SOURCE_DIR}/../ShardScript"
  CACHE PATH "Root of the ShardScript repository or install prefix")

# ShardScript runtime library.
find_library(SHARDSCRIPT_LIB
  NAMES ShardScript libShardScript
  PATHS
      "\${SHARDSCRIPT_ROOT}/build/bin"
      "\${SHARDSCRIPT_ROOT}/build/bin/Release"
      "\${SHARDSCRIPT_ROOT}/lib"
  NO_DEFAULT_PATH
  REQUIRED
)

add_library(my_library SHARED
  library.cpp
  callbacks.cpp
)

set_target_properties(my_library PROPERTIES
  WINDOWS_EXPORT_ALL_SYMBOLS ON
)

target_include_directories(my_library PRIVATE "\${SHARDSCRIPT_ROOT}/ShardScript/include")
target_link_libraries(my_library PRIVATE \${SHARDSCRIPT_LIB})`,language:"cmake",filename:"CMakeLists.txt"}),`
`,e.jsx(t,{children:e.jsxs(i.p,{children:["If your ShardScript build already exports an imported CMake target named"," ",`
`,e.jsx(r,{children:"ShardScript"}),", you can skip ",e.jsx(r,{children:"find_library"}),` and link against
it directly. You can also create an imported target yourself from a known library path:`]})}),`
`,e.jsx(n,{code:`add_library(ShardScript SHARED IMPORTED GLOBAL)
set_target_properties(ShardScript PROPERTIES
  IMPORTED_LOCATION "\${SHARDSCRIPT_ROOT}/build/bin/ShardScript.dll"
  INTERFACE_INCLUDE_DIRECTORIES "\${SHARDSCRIPT_ROOT}/ShardScript/include"
)

target_link_libraries(my_library PRIVATE ShardScript)`,language:"cmake",filename:"CMakeLists.txt"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"4. Choose an output directory."})}),`
`,e.jsx(t,{children:e.jsx(i.p,{children:`By default CMake writes the shared library next to the build tree. You can override this with
output-directory properties so the library is easier to find from your ShardScript launch scripts:`})}),`
`,e.jsx(n,{code:`set_target_properties(my_library PROPERTIES
  WINDOWS_EXPORT_ALL_SYMBOLS ON
  RUNTIME_OUTPUT_DIRECTORY "\${CMAKE_BINARY_DIR}/bin"
  LIBRARY_OUTPUT_DIRECTORY "\${CMAKE_BINARY_DIR}/bin"
  ARCHIVE_OUTPUT_DIRECTORY "\${CMAKE_BINARY_DIR}/lib"
)`,language:"cmake",filename:"CMakeLists.txt"}),`
`,e.jsx(t,{children:e.jsxs(i.p,{children:[`If you need per-configuration output directories, set the DEBUG and RELEASE variants of these
properties, for example `,e.jsx(r,{children:"RUNTIME_OUTPUT_DIRECTORY_DEBUG"})," and"," ",`
`,e.jsx(r,{children:"RUNTIME_OUTPUT_DIRECTORY_RELEASE"}),"."]})}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"5. Link an external library."})}),`
`,e.jsx(t,{children:e.jsx(i.p,{children:`Because this is a normal CMake target, external dependencies are added with the usual CMake commands.
For example, to link zlib from a package manager:`})}),`
`,e.jsx(n,{code:`find_package(ZLIB REQUIRED)
target_link_libraries(my_library PRIVATE ZLIB::ZLIB)`,language:"cmake",filename:"CMakeLists.txt"}),`
`,e.jsx(t,{children:e.jsxs(i.p,{children:["For libraries discovered through ",e.jsx(r,{children:"find_package"}),`, reference the imported target by
name. For raw library files, prefer an imported target or a `,e.jsx(r,{children:"find_library"}),` result
instead of a hard-coded path.`]})}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"6. Configure and build."})}),`
`,e.jsx(n,{code:`# Configure the project.
cmake -S . -B build -G Ninja -DCMAKE_BUILD_TYPE=Release

# Build only the library target.
cmake --build build --target my_library

# Or build every target in the project.
cmake --build build --parallel`,language:"bash"}),`
`,e.jsx(s,{children:"Loading the library at runtime"}),`
`,e.jsx(t,{children:e.jsxs(i.p,{children:["The interpreter loads native libraries through the ",e.jsx(r,{children:"-l"}),` flag. Pass the full path to
the shared library you just built.`]})}),`
`,e.jsx(n,{code:`# On Windows.
shard app.shard -l build/bin/my_library.dll

# On Linux.
shard app.shard -l build/bin/libmy_library.so

# On macOS.
shard app.shard -l build/bin/libmy_library.dylib`,language:"bash"}),`
`,e.jsx(c,{tone:"blue",children:e.jsxs(i.p,{children:["On Windows, make sure ",e.jsx(r,{children:"ShardScript.dll"}),` is either on your PATH or in the same
directory as the library and the interpreter, otherwise the OS loader will fail to resolve the dependency
before the interpreter starts.`]})}),`
`,e.jsx(s,{children:"Alternative: building inside ShardScript.Framework"}),`
`,e.jsx(t,{children:e.jsxs(i.p,{children:[`If you prefer to keep your library in the ShardScript repository, the framework CMake file already
discovers `,e.jsx(r,{children:"*.shard.cpp"})," files under"," ",`
`,e.jsx(r,{children:"ShardScript.Framework/system"})," and"," ",`
`,e.jsx(r,{children:"ShardScript.Framework/third_party"})," and builds each one as its own shared library:"]})}),`
`,e.jsx(n,{code:`file(GLOB_RECURSE CPP_FILES CONFIGURE_DEPENDS
  "system/*.shard.cpp"
  "system/**/*.shard.cpp"
  "third_party/**/*.shard.cpp"
)

foreach(CPP_FILE IN LISTS CPP_FILES)
  get_filename_component(SHARD_TARGET_NAME "\${CPP_FILE}" NAME_WLE)
  add_library("\${SHARD_TARGET_NAME}" SHARED "\${CPP_FILE}")
  target_include_directories("\${SHARD_TARGET_NAME}" PRIVATE "\${CMAKE_CURRENT_SOURCE_DIR}/../ShardScript/include")
  target_link_libraries("\${SHARD_TARGET_NAME}" PRIVATE ShardScript)
endforeach()`,language:"cmake",filename:"ShardScript.Framework/CMakeLists.txt"}),`
`,e.jsx(t,{children:e.jsxs(i.p,{children:["System libraries are written to ",e.jsx(r,{children:"bin/system/"}),"; third-party libraries go to"," ",`
`,e.jsx(r,{children:"bin/third-party/"}),`. This glob is a convenience for the framework itself, not a
requirement for native libraries in general.`]})}),`
`,e.jsx(s,{children:"Verification"}),`
`,e.jsx(t,{children:e.jsx(i.p,{children:"After building, confirm that the shared library exists in the expected output directory."})}),`
`,e.jsx(n,{code:`# On Windows.
ls build/bin/my_library.dll

# On Linux.
ls build/bin/libmy_library.so`,language:"bash"}),`
`,e.jsx(t,{children:e.jsx(i.p,{children:"Run the ShardScript interpreter with the new library and invoke the registered method."})}),`
`,e.jsx(n,{code:`using stdio;
using math_ext;

namespace demo;

public static func Main() -> void
{
  result: int = math_ext.Double(21);
  println("result: " + result);
}`,language:"csharp",filename:"app.shard"}),`
`,e.jsx(n,{code:"shard app.shard -l build/bin/my_library.dll",language:"bash"}),`
`,e.jsx(s,{children:"Troubleshooting"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(a,{children:e.jsxs(i.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"The entry points are not exported."}),` On Windows, either
set `,e.jsx(r,{children:"WINDOWS_EXPORT_ALL_SYMBOLS ON"}),` or mark the two functions with
`,e.jsx(r,{children:"__declspec(dllexport)"}),". The ",e.jsx(r,{children:"SHARDLIB_*"}),` macros
do this automatically, so verify that the macro expansion is not disabled.`]})}),e.jsx(a,{children:e.jsxs(i.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"CMake cannot find ShardScript."})," Check that"," ",`
`,e.jsx(r,{children:"SHARDSCRIPT_ROOT"})," points to the directory that contains both"," ",`
`,e.jsx(r,{children:"ShardScript/include"}),` and the runtime library, and that the library file name
matches the `,e.jsx(r,{children:"NAMES"})," list in ",e.jsx(r,{children:"find_library"}),"."]})}),e.jsx(a,{children:e.jsxs(i.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"External library link errors."})," Ensure the"," ",`
`,e.jsx(r,{children:"find_package"}),` or imported target is visible in the same directory scope as your
target. Imported targets must be referenced by their CMake target name, not the raw library file path.`]})}),e.jsx(a,{children:e.jsxs(i.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"The library fails to load at runtime."}),` Confirm the shared
library path passed to `,e.jsx(r,{children:"-l"}),` exists and that the runtime's own shared library
is discoverable by the OS dynamic loader.`]})})]}),`
`,e.jsx(s,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(a,{children:e.jsxs(i.p,{children:[e.jsx(r,{children:"library-building/your-first-shard-cpp-library"})," — tutorial for a first native library."]})}),e.jsx(a,{children:e.jsxs(i.p,{children:[e.jsx(r,{children:"library-building/shardlib-entrypoint"})," — entry point and metadata macros."]})}),e.jsx(a,{children:e.jsxs(i.p,{children:[e.jsx(r,{children:"library-building/design-best-practices"})," — design guidelines."]})}),e.jsx(a,{children:e.jsxs(i.p,{children:[e.jsx(r,{children:"library-building/troubleshooting"})," — common problems and solutions."]})})]})]})}function x(l={}){const{wrapper:i}=l.components||{};return i?e.jsx(i,{...l,children:e.jsx(o,{...l})}):o(l)}function d(l,i){throw new Error("Expected component `"+l+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
