import{j as e}from"./index-Dw_NxEHJ.js";function h(a){const s={p:"p",...a.components},{Bullet:n,Callout:d,CodeBlock:c,DocsTable:o,H2:t,InlineCode:r,Prose:i}=s;return n||l("Bullet"),d||l("Callout"),c||l("CodeBlock"),o||l("DocsTable"),t||l("H2"),r||l("InlineCode"),i||l("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(i,{children:e.jsxs(s.p,{children:["A ",e.jsx("strong",{children:"native library"})," is a ShardScript module implemented as a normal shared library: a"," ",`
`,e.jsx(r,{children:".dll"})," on Windows, a ",e.jsx(r,{children:".so"})," on Linux, or a"," ",`
`,e.jsx(r,{children:".dylib"}),` on macOS. It is written in C++, compiled with whatever toolchain and build
system you prefer, and loaded by the ShardScript runtime at startup. The only hard requirement is that the
resulting binary exports exactly two C-linkage symbols: `,e.jsx(r,{children:"ShardLib_GetMetadata"})," and"," ",`
`,e.jsx(r,{children:"ShardLib_EntryPoint"}),"."]})}),`
`,e.jsx(t,{children:"Summary"}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[`Native libraries extend the ShardScript runtime with compiled C++ code. A library can consist of one source
file or many, can live inside the `,e.jsx(r,{children:"ShardScript.Framework"}),` tree or in a completely
separate project, and can be built with CMake, MSBuild, Make, or any other C++ build system. The runtime
discovers the library through the two exported symbols: `,e.jsx(r,{children:"ShardLib_GetMetadata"})," ",`
describes the library's identity, version, and dependencies; `,e.jsx(r,{children:"ShardLib_EntryPoint"})," ",`
registers namespaces, types, methods, properties, and operators into the compiler's semantic model.`]})}),`
`,e.jsx(t,{children:"What problem it solves"}),`
`,e.jsx(i,{children:e.jsx(s.p,{children:`ShardScript is deliberately strict and small. The standard library and parts of the runtime ship as native
libraries because some responsibilities cannot be expressed cleanly or efficiently inside the language:`})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Operating-system services"}),` — sockets, files, processes,
timers, and windowing all need direct OS calls.`]})}),e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Performance-critical algorithms"}),` — heavy math, parsers,
or compression benefit from compiled C++ and hand-managed memory.`]})}),e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Existing C/C++ ecosystems"}),` — wrapping libraries such as
SQLite, OpenSSL, or Raylib lets ShardScript reuse battle-tested code.`]})}),e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Runtime intrinsics"}),` — garbage-collection helpers, async
state machines, and reflection metadata live below the language level.`]})})]}),`
`,e.jsx(t,{children:"How it works"}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:["The runtime loads a native library through the host's platform API (for example"," ",`
`,e.jsx(r,{children:"LoadLibrary"})," on Windows or ",e.jsx(r,{children:"dlopen"}),` on Linux) and resolves
two functions by name. The `,e.jsx(r,{children:"SHARDLIB_GETMETADATA"})," and"," ",`
`,e.jsx(r,{children:"SHARDLIB_ENTRYPOINT"})," macros hide the boilerplate of producing the required"," ",`
`,e.jsx(r,{children:'extern "C"'})," exports with the correct visibility attributes."]})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx(r,{children:"SHARDLIB_GETMETADATA"})," — defines"," ",`
`,e.jsx(r,{children:"ShardLib_GetMetadata"}),` and fills in the library's name, description,
version, and optional dependencies.`]})}),e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx(r,{children:"SHARDLIB_ENTRYPOINT"})," — defines"," ",`
`,e.jsx(r,{children:"ShardLib_EntryPoint"}),` and receives a registration context. Inside this block you
create namespaces and attach classes, structs, interfaces, enums, methods, properties, and operators.`]})})]}),`
`,e.jsx(i,{children:e.jsx(s.p,{children:"A minimal single-file library looks like this:"})}),`
`,e.jsx(c,{code:`#include <ShardScript.hpp>

using namespace shard;

SHARDLIB_GETMETADATA
{
  lib.Name        = L"shard.mylibrary";
  lib.Description = L"Short description";
  lib.Version     = L"1.0.0";
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> myNamespace(context, L"mynamespace");

  myNamespace.AddClass(L"MyType", ACS_PUBLIC, LINK_STATIC, [](SymbolBuilder<ClassSymbol> type)
  {
      type.AddMethod(L"DoWork", TYPE_INT, LINK_STATIC)
          .AddParameter(L"value", TYPE_INT)
          .SetCallback([](const CallState& context)
          {
              std::int64_t value = context.Args[0]->AsInteger();
              return context.Collector.FromValue(value * 2);
          });
  });
}`,language:"cpp",filename:"mylibrary.cpp"}),`
`,e.jsx(i,{children:e.jsx(s.p,{children:"From ShardScript the new member is consumed like any other static method:"})}),`
`,e.jsx(c,{code:`using stdio;
using mynamespace;

namespace demo;

public static func Main() -> void
{
  result: int = MyType.DoWork(21);
  println(result);   // 42
}`,language:"csharp"}),`
`,e.jsx(i,{children:e.jsx(s.p,{children:`The macros expand to the exact symbol names the runtime loader searches for, so the names of the exported
functions are stable across platforms and compilers.`})}),`
`,e.jsx(t,{children:"Key ideas"}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Any shared library that exports the two symbols is a native library."}),` There is no special
file extension, no required project template, and no registration manifest. The build system does not need
to discover the file automatically; you can compile it with a normal shared-library target in CMake,
MSBuild, or any other C++ toolchain.`]})}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"A library can contain many source files."}),` The two macros can live in the same file or in
different files. The only requirement is that the final linked binary exports both`," ",`
`,e.jsx(r,{children:"ShardLib_GetMetadata"})," and ",e.jsx(r,{children:"ShardLib_EntryPoint"}),"."]})}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"A library can live anywhere."})," It may be built inside the"," ",`
`,e.jsx(r,{children:"ShardScript.Framework"}),` tree, but it can also be a standalone project in its own
directory. The runtime loads it by path through the `,e.jsx(r,{children:"-l"}),` flag, so the library does
not need to be adjacent to the interpreter.`]})}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"The framework CMake glob is one convenient integration, not a requirement."}),` The reference
build collects every `,e.jsx(r,{children:"*.shard.cpp"})," file under"," ",`
`,e.jsx(r,{children:"ShardScript.Framework"}),`, creates one shared-library target per file, links against
the `,e.jsx(r,{children:"ShardScript"})," target, and points the include path at"," ",`
`,e.jsx(r,{children:"ShardScript/include"}),`. This is useful for in-tree system or third-party shards, but
it is only a CMake convenience. You can replicate the same behavior in your own project.`]})}),`
`,e.jsx(c,{code:`file(GLOB TEST_LIB_SOURCES CONFIGURE_DEPENDS "*.shard.cpp")

foreach(SOURCE_FILE IN LISTS TEST_LIB_SOURCES)
  get_filename_component(TARGET_NAME "\${SOURCE_FILE}" NAME_WLE)
  add_library("\${TARGET_NAME}" SHARED "\${SOURCE_FILE}")

  set_target_properties("\${TARGET_NAME}" PROPERTIES
      WINDOWS_EXPORT_ALL_SYMBOLS ON
      RUNTIME_OUTPUT_DIRECTORY "\${CMAKE_BINARY_DIR}/bin/test_libs"
      LIBRARY_OUTPUT_DIRECTORY "\${CMAKE_BINARY_DIR}/bin/test_libs"
  )

  target_include_directories("\${TARGET_NAME}" PRIVATE "\${CMAKE_CURRENT_SOURCE_DIR}/../../../ShardScript/include")
  target_link_libraries("\${TARGET_NAME}" PRIVATE ShardScript)
endforeach()`,language:"cmake",filename:"CMakeLists.txt"}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Symbol registration."})," Registration happens through"," ",`
`,e.jsx(r,{children:"SymbolBuilder<T>"}),` specializations. You declare a namespace, then attach
members with explicit accessibility, linking mode, and callback:`]})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx(r,{children:"LINK_STATIC"})," — the member has no implicit ",e.jsx(r,{children:"this"}),` and is
called as `,e.jsx(r,{children:"Type.Method()"}),"."]})}),e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx(r,{children:"LINK_INSTANCE"})," — the member belongs to an object;"," ",`
`,e.jsx(r,{children:"context.Args[0]"})," is ",e.jsx(r,{children:"this"})," inside the callback."]})}),e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx(r,{children:"ACS_PUBLIC"})," and ",e.jsx(r,{children:"ACS_PRIVATE"}),` — control visibility the
same way ShardScript source declarations do.`]})})]}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"The callback contract."})," Every native callback has the same signature:"]})}),`
`,e.jsx(c,{code:"shard::ObjectInstance* Callback(const shard::CallState& context);",language:"cpp"}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:["Arguments arrive in ",e.jsx(r,{children:"context.Args"})," as"," ",`
`,e.jsx(r,{children:"ObjectInstance*"})," pointers. Read primitives through helpers such as"," ",`
`,e.jsx(r,{children:"AsInteger()"})," or ",e.jsx(r,{children:"AsString()"}),", and box return values through"," ",`
`,e.jsx(r,{children:"context.Collector.FromValue(...)"}),`. The collector owns the returned object, so the
callback does not free it.`]})}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Declaring dependencies."}),` If your library reuses symbols from another native library,
declare the dependency inside `,e.jsx(r,{children:"SHARDLIB_GETMETADATA"}),`. The loader enforces load order
before your entry point runs:`]})}),`
`,e.jsx(c,{code:`SHARDLIB_GETMETADATA
{
  lib.Name        = L"shard.filesystem";
  lib.Description = L"File and directory APIs";
  lib.Version     = L"0.2.0";

  static const shard::ShardLibDependencyInfo deps[] =
  {
      { L"shard.streams", L"0.1.0" },
      { L"shard.collections", L"^0.3.0" }
  };
  lib.Dependencies = deps;
  lib.DependenciesLength = sizeof(deps) / sizeof(deps[0]);
}`,language:"cpp"}),`
`,e.jsx(d,{tone:"blue",children:e.jsxs(s.p,{children:["Always look up cross-library symbols lazily inside ",e.jsx(r,{children:"EnsureSymbols"}),` helpers rather
than caching pointers during static initialization. Load order between libraries is not guaranteed, and
eager static initializers are a common source of null-pointer crashes.`]})}),`
`,e.jsx(t,{children:"Existing libraries to study"}),`
`,e.jsx(i,{children:e.jsx(s.p,{children:`The framework ships with many native libraries. Treat the ones closest to your goal as reference
implementations:`})}),`
`,e.jsx(o,{headers:["Library","Source file","Demonstrates"],rows:[[e.jsx(r,{children:"shard.math"}),e.jsx(r,{children:"system/math.shard.cpp"}),"Simple static class, properties, GetArgs helper."],[e.jsx(r,{children:"shard.stdio"}),e.jsx(r,{children:"system/constream.shard.cpp"}),"Console I/O, IPrintable, IEnumerable<T> generic method."],[e.jsx(r,{children:"shard.collections"}),e.jsx(r,{children:"system/collections.shard.cpp"}),"Generic List<T>, Dictionary<K,V>, Queue<T>, Stack<T>."],[e.jsx(r,{children:"shard.streams"}),e.jsx(r,{children:"system/streams.shard.cpp"}),"Interfaces, MemoryStream, StreamReader/Writer, async cancellation."],[e.jsx(r,{children:"shard.filesystem"}),e.jsx(r,{children:"system/filesystem.shard.cpp"}),"Native handles, async file I/O with libuv, cross-library lookups."],[e.jsx(r,{children:"shard.socket"}),e.jsx(r,{children:"system/socket.shard.cpp"}),"TCP sockets, SocketStream, RunOnThreadPool, ObjectRef."],[e.jsx(r,{children:"shard.http"}),e.jsx(r,{children:"system/http.shard.cpp"}),"HTTP client/server, delegates, threading + event-loop marshalling."],[e.jsx(r,{children:"shard.subprocess"}),e.jsx(r,{children:"system/subprocess.shard.cpp"}),"External processes, cross-library dictionary layout lookup."],[e.jsx(r,{children:"shard.cinterop"}),e.jsx(r,{children:"system/cinterop.shard.cpp"}),"FFI, nint, memory marshalling, raw native calls."],[e.jsx(r,{children:"shard.reflection"}),e.jsx(r,{children:"system/reflection.shard.cpp"}),"Runtime type inspection, handle wrappers."],[e.jsx(r,{children:"shard.async"}),e.jsx(r,{children:"system/async.shard.cpp"}),"TaskCompletionSource<T>, cancellation tokens."],[e.jsx(r,{children:"shard.json"}),e.jsx(r,{children:"system/json.shard.cpp"}),"Complex parser, opaque native handle (nint)."]]}),`
`,e.jsx(t,{children:"When to use"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(n,{children:e.jsx(s.p,{children:"You need to call an OS API or a third-party C/C++ library that has no ShardScript equivalent."})}),e.jsx(n,{children:e.jsx(s.p,{children:"The operation is CPU-bound and the overhead of the VM interpreter is measurable in your workload."})}),e.jsx(n,{children:e.jsx(s.p,{children:`You are adding runtime support that the language itself cannot express, such as GC helpers or async
state-machine internals.`})}),e.jsx(n,{children:e.jsx(s.p,{children:"You want to share a single implementation between the host application and ShardScript code."})})]}),`
`,e.jsx(t,{children:"When not to use"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(n,{children:e.jsxs(s.p,{children:["The logic is pure ShardScript business code. Prefer ordinary ",e.jsx(r,{children:".shard"}),` source
files so you keep type safety, debugging, and hot-reload benefits.`]})}),e.jsx(n,{children:e.jsxs(s.p,{children:["The feature is already covered by an existing standard library. Reuse"," ",`
`,e.jsx(r,{children:"shard.collections"}),", ",e.jsx(r,{children:"shard.streams"}),", or"," ",`
`,e.jsx(r,{children:"shard.async"})," before writing a new native library."]})}),e.jsx(n,{children:e.jsxs(s.p,{children:[`You only need to load an arbitrary shared library and call raw C exports. For one-off dynamic loading,
use `,e.jsx(r,{children:"interop.NativeLibrary"})," instead."]})})]}),`
`,e.jsx(t,{children:"Related articles"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx(r,{children:"library-building/your-first-shard-cpp-library"}),` — a step-by-step tutorial that
builds a native library in a standalone project directory.`]})}),e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx(r,{children:"library-building/library-build-setup"}),` — CMake recipes for out-of-tree native
libraries, including how to locate headers and link the ShardScript shared library.`]})}),e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx(r,{children:"stdlib/interop/native-interop"}),` — load arbitrary shared libraries and invoke raw
C function pointers from ShardScript.`]})}),e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx(r,{children:"stdlib/collections/list"}),` — an example of a generic type implemented as a native
library.`]})}),e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx(r,{children:"syntax/async/04-task-and-valuetask"}),` — how async primitives produced by native
libraries fit into ShardScript code.`]})}),e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx(r,{children:"syntax/resource-management/02-idisposable"}),` — patterns for native types that
hold unmanaged handles.`]})})]})]})}function x(a={}){const{wrapper:s}=a.components||{};return s?e.jsx(s,{...a,children:e.jsx(h,{...a})}):h(a)}function l(a,s){throw new Error("Expected component `"+a+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
