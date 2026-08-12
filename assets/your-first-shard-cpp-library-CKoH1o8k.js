import{j as e}from"./index-hFDFiLgA.js";function o(n){const i={p:"p",...n.components},{Bullet:s,Callout:c,CodeBlock:t,DocsTable:h,H2:d,InlineCode:r,Prose:a}=i;return s||l("Bullet"),c||l("Callout"),t||l("CodeBlock"),h||l("DocsTable"),d||l("H2"),r||l("InlineCode"),a||l("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(a,{children:e.jsxs(i.p,{children:[`This tutorial walks through building a minimal native C++ library for the ShardScript runtime as a
completely separate project. By the end you will have a compiled shared library —`," ",`
`,e.jsx(r,{children:"my_shard_library"})," — in its own directory ",e.jsx(r,{children:"my-shard-library"}),`,
exposing a static class `,e.jsx(r,{children:"MyType"})," with a ",e.jsx(r,{children:"DoWork"}),` method,
and a ShardScript program that calls it.`]})}),`
`,e.jsx(d,{children:"Prerequisites"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsx(i.p,{children:"A working C++20 toolchain and CMake 3.20 or later."})}),e.jsx(s,{children:e.jsxs(i.p,{children:["A pre-built ShardScript runtime shared library and its headers. The headers are in"," ",`
`,e.jsx(r,{children:"ShardScript/include"})," and the runtime binary is next to the interpreter."]})}),e.jsx(s,{children:e.jsxs(i.p,{children:["The ",e.jsx(r,{children:"shard"}),` interpreter available on your PATH or in your ShardScript
build output directory.`]})}),e.jsx(s,{children:e.jsx(i.p,{children:"Basic familiarity with ShardScript namespaces, classes, and methods."})})]}),`
`,e.jsx(d,{children:"Scenario"}),`
`,e.jsx(a,{children:e.jsxs(i.p,{children:[`You want to extend the runtime with a small native library built outside the ShardScript
repository. The library will contain two C++ source files: one that holds the callback bodies and
one that registers the metadata and symbols. You will build a shared library manually with CMake,
then load it from a ShardScript program using the `,e.jsx(r,{children:"-l"})," flag."]})}),`
`,e.jsx(d,{children:"Step-by-Step Instructions"}),`
`,e.jsx(a,{children:e.jsx("strong",{children:"1. Create the project directory."})}),`
`,e.jsx(a,{children:e.jsxs(i.p,{children:["Make a new directory anywhere on your filesystem. This tutorial uses"," ",`
`,e.jsx(r,{children:"my-shard-library/"})," next to the ShardScript repository."]})}),`
`,e.jsx(t,{code:`mkdir my-shard-library
cd my-shard-library`,language:"bash"}),`
`,e.jsx(h,{headers:["Path","Purpose"],rows:[["my-shard-library/CMakeLists.txt","CMake build script that produces the shared library."],["my-shard-library/callbacks.cpp","Callback bodies that run when ShardScript invokes the library."],["my-shard-library/library.cpp","Library metadata and symbol registration."],["my-shard-library/app.shard","ShardScript program that consumes the library."]]}),`
`,e.jsx(a,{children:e.jsx("strong",{children:"2. Write the callback bodies."})}),`
`,e.jsx(a,{children:e.jsxs(i.p,{children:["Open ",e.jsx(r,{children:"callbacks.cpp"}),` and include the ShardScript runtime headers. The
callback reads the integer argument, doubles it, and returns the result through the garbage
collector. Keeping callbacks in a separate file is not required, but it mirrors how larger native
libraries organize implementation code away from registration code.`]})}),`
`,e.jsx(t,{code:`#include <shard/ShardScriptLIB.hpp>
#include <shard/runtime/ObjectInstance.hpp>
#include <shard/runtime/MethodCallState.hpp>

using namespace shard;

ObjectInstance* MyLibrary_DoWork(const CallState& context)
{
  // Instance methods receive 'this' as Args[0]; for a static method the first
  // argument is the first real parameter passed from ShardScript.
  std::int64_t value = context.Args[0]->AsInteger();

  // The tutorial example simply doubles the input so the result is easy to verify.
  std::int64_t result = value * 2;

  return context.Collector.FromValue(result);
}`,language:"cpp",filename:"callbacks.cpp"}),`
`,e.jsx(a,{children:e.jsx("strong",{children:"3. Register the library metadata and symbols."})}),`
`,e.jsx(a,{children:e.jsxs(i.p,{children:["Create ",e.jsx(r,{children:"library.cpp"}),`. Include the ShardScript authoring headers,
forward-declare the callback defined in `,e.jsx(r,{children:"callbacks.cpp"}),", then use"," ",`
`,e.jsx(r,{children:"SHARDLIB_GETMETADATA"})," to describe the library and"," ",`
`,e.jsx(r,{children:"SHARDLIB_ENTRYPOINT"})," to register the namespace, class, and method."]})}),`
`,e.jsx(t,{code:`#include <shard/ShardScriptLIB.hpp>
#include <shard/CompilationContext.hpp>
#include <shard/semantic/SymbolBuilder.hpp>

using namespace shard;

// Callbacks defined in callbacks.cpp.
ObjectInstance* MyLibrary_DoWork(const CallState& context);

SHARDLIB_GETMETADATA
{
  lib.Name        = L"shard.mylibrary";
  lib.Description = L"A minimal native shard library";
  lib.Version     = L"1.0.0";
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> myNamespace(context, L"mylibrary");

  // Register a static class so it can be called through the type name.
  myNamespace.AddClass(L"MyType", ACS_PUBLIC, LINK_STATIC, [](SymbolBuilder<ClassSymbol> type)
  {
      type.AddMethod(L"DoWork", TYPE_INT, LINK_STATIC)
          .AddParameter(L"value", TYPE_INT)
          .SetCallback(&MyLibrary_DoWork);
  });
}`,language:"cpp",filename:"library.cpp"}),`
`,e.jsx(c,{tone:"blue",title:"Why LINK_STATIC for the class",children:e.jsxs(i.p,{children:["A class registered with ",e.jsx(r,{children:"LINK_STATIC"}),` behaves like a static class in
ShardScript: it cannot be instantiated and its members are reached through the type name. This
matches the tutorial call site `,e.jsx(r,{children:"MyType.DoWork(7)"}),"."]})}),`
`,e.jsx(a,{children:e.jsx("strong",{children:"4. Add a CMake build script."})}),`
`,e.jsx(a,{children:e.jsx(i.p,{children:`The CMakeLists.txt is a normal shared-library target. It points to the ShardScript include
directory and links the pre-built ShardScript runtime library. Adjust the library and include
paths to match where you built or installed ShardScript.`})}),`
`,e.jsx(t,{code:`cmake_minimum_required(VERSION 3.20)
project(MyShardLibrary CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Path to the ShardScript checkout or installation.
set(SHARDSCRIPT_ROOT "\${CMAKE_CURRENT_SOURCE_DIR}/../ShardScript"
  CACHE PATH "Root of the ShardScript repository or install prefix")

# ShardScript runtime library location.
find_library(SHARDSCRIPT_LIB
  NAMES ShardScript libShardScript
  PATHS "\${SHARDSCRIPT_ROOT}/build/bin" "\${SHARDSCRIPT_ROOT}/lib"
  NO_DEFAULT_PATH
  REQUIRED
)

add_library(my_shard_library SHARED
  library.cpp
  callbacks.cpp
)

set_target_properties(my_shard_library PROPERTIES
  WINDOWS_EXPORT_ALL_SYMBOLS ON
)

target_include_directories(my_shard_library PRIVATE "\${SHARDSCRIPT_ROOT}/ShardScript/include")
target_link_libraries(my_shard_library PRIVATE \${SHARDSCRIPT_LIB})`,language:"cmake",filename:"CMakeLists.txt"}),`
`,e.jsx(a,{children:e.jsx("strong",{children:"5. Build the library."})}),`
`,e.jsx(a,{children:e.jsx(i.p,{children:"Configure and build from the project directory."})}),`
`,e.jsx(t,{code:`cmake -S . -B build -G Ninja -DCMAKE_BUILD_TYPE=Release
cmake --build build --parallel`,language:"bash"}),`
`,e.jsx(a,{children:e.jsxs(i.p,{children:["The build emits a shared library in the ",e.jsx(r,{children:"build/"})," directory:"]})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(i.p,{children:["On Windows: ",e.jsx(r,{children:"build/my_shard_library.dll"})]})}),e.jsx(s,{children:e.jsxs(i.p,{children:["On Linux: ",e.jsx(r,{children:"build/libmy_shard_library.so"})]})}),e.jsx(s,{children:e.jsxs(i.p,{children:["On macOS: ",e.jsx(r,{children:"build/libmy_shard_library.dylib"})]})})]}),`
`,e.jsx(a,{children:e.jsx("strong",{children:"6. Write a ShardScript program that consumes the library."})}),`
`,e.jsx(a,{children:e.jsxs(i.p,{children:["Create ",e.jsx(r,{children:"app.shard"})," in the project directory. Import the"," ",`
`,e.jsx(r,{children:"mylibrary"})," namespace and call the static method."]})}),`
`,e.jsx(t,{code:`using stdio;
using mylibrary;

namespace demo;

public static func Main() -> void
{
  result: int = MyType.DoWork(7);
  println("Result: " + result);
}`,language:"csharp",filename:"app.shard"}),`
`,e.jsx(a,{children:e.jsx("strong",{children:"7. Run the program and load the shard explicitly."})}),`
`,e.jsx(a,{children:e.jsxs(i.p,{children:[`The interpreter does not auto-load shards that live outside its own system directory, so pass the
compiled shared library with the `,e.jsx(r,{children:"-l"})," flag."]})}),`
`,e.jsx(t,{code:`# Windows
shard app.shard -l build/my_shard_library.dll

# Linux
shard app.shard -l build/libmy_shard_library.so

# macOS
shard app.shard -l build/libmy_shard_library.dylib`,language:"bash"}),`
`,e.jsx(d,{children:"Expected Output"}),`
`,e.jsx(a,{children:e.jsxs(i.p,{children:["When the program runs, the native callback receives ",e.jsx(r,{children:"7"}),`, doubles it, and the
managed program prints:`]})}),`
`,e.jsx(t,{code:"Result: 14",language:"text"}),`
`,e.jsx(c,{tone:"green",title:"Success criteria",children:e.jsxs(i.p,{children:["If you see ",e.jsx(r,{children:"Result: 14"}),`, the library compiled correctly, the runtime loaded
it, and the method registration resolved the `,e.jsx(r,{children:"MyType.DoWork"})," symbol."]})}),`
`,e.jsx(d,{children:"What's next?"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(i.p,{children:["Add instance fields and a constructor by switching the class to"," ",`
`,e.jsx(r,{children:"LINK_INSTANCE"})," and calling ",e.jsx(r,{children:"AddInit()"}),"."]})}),e.jsx(s,{children:e.jsxs(i.p,{children:["Expose read-only values as static properties with ",e.jsx(r,{children:"AddProperty"}),` and a
getter callback.`]})}),e.jsx(s,{children:e.jsxs(i.p,{children:["Declare dependencies in ",e.jsx(r,{children:"SHARDLIB_GETMETADATA"}),` when your library relies on
other shards.`]})}),e.jsx(s,{children:e.jsxs(i.p,{children:["Learn how arguments move between ShardScript and C++ in"," ",`
`,e.jsx(r,{children:"library-building/reading-arguments"}),"."]})}),e.jsx(s,{children:e.jsxs(i.p,{children:["Follow the full build setup guide in ",e.jsx(r,{children:"library-building/library-build-setup"}),"."]})}),e.jsx(s,{children:e.jsxs(i.p,{children:["Explore the framework source libraries such as"," ",`
`,e.jsx(r,{children:"system/math.shard.cpp"})," for simple static methods and"," ",`
`,e.jsx(r,{children:"system/collections.shard.cpp"})," for generic types."]})})]})]})}function u(n={}){const{wrapper:i}=n.components||{};return i?e.jsx(i,{...n,children:e.jsx(o,{...n})}):o(n)}function l(n,i){throw new Error("Expected component `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};
