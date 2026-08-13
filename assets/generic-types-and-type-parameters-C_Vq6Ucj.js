import{j as e}from"./index-B-x28vAk.js";function o(s){const r={p:"p",...s.components},{Bullet:a,Callout:d,CodeBlock:i,H2:c,InlineCode:n,Prose:t}=r;return a||l("Bullet"),d||l("Callout"),i||l("CodeBlock"),c||l("H2"),n||l("InlineCode"),t||l("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:e.jsxs(r.p,{children:[`This how-to guide shows how to register a generic class from a native C++ ShardScript library. You
will create a raw generic class symbol, add a `,e.jsx(n,{children:"TypeParameterSymbol"}),", use"," ",`
`,e.jsx(n,{children:"SymbolFactory::GenericType"}),` to describe constructed generic types, read runtime
type arguments from `,e.jsx(n,{children:"context.Frame->TypeArguments"}),`, and allocate concrete
instances with `,e.jsx(n,{children:"AllocateGeneric"}),`. The guide is built as a standalone shared
library, because any shared library that exports`," ",`
`,e.jsx(n,{children:"ShardLib_GetMetadata"})," and ",e.jsx(n,{children:"ShardLib_EntryPoint"}),` can be a
ShardScript native library, no matter how many source files it contains or where it lives.`]})}),`
`,e.jsx(c,{children:"Prerequisites"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(a,{children:e.jsx(r.p,{children:"A working C++20 toolchain and CMake 3.20 or later."})}),e.jsx(a,{children:e.jsxs(r.p,{children:["The ShardScript runtime shared library and headers from"," ",`
`,e.jsx(n,{children:"ShardScript/include"}),"."]})}),e.jsx(a,{children:e.jsxs(r.p,{children:["A ShardScript interpreter that can load a shared library with the ",e.jsx(n,{children:"-l"})," flag."]})}),e.jsx(a,{children:e.jsxs(r.p,{children:["Familiarity with registering classes, fields, methods, and constructors through"," ",`
`,e.jsx(n,{children:"SymbolBuilder<ClassSymbol>"}),"."]})})]}),`
`,e.jsx(c,{children:"Goal"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:["Implement a generic ",e.jsx(n,{children:"Container<T>"}),` class in C++ that stores one value of
type `,e.jsx(n,{children:"T"}),", exposes ",e.jsx(n,{children:"GetValue"})," and"," ",`
`,e.jsx(n,{children:"SetValue"}),", and can clone itself into a new"," ",`
`,e.jsx(n,{children:"Container<T>"}),`. The clone callback must know the concrete type argument at
runtime so it can allocate the correct constructed generic instance.`]})}),`
`,e.jsx(c,{children:"Step-by-Step Instructions"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"1. Create a standalone project directory."})}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:[`A native library is a normal shared library. It can be one file or many, and it can live anywhere on
disk. This example uses a single `,e.jsx(n,{children:"container.shard.cpp"}),` file plus a CMake build
script in a separate directory.`]})}),`
`,e.jsx(i,{code:`mkdir generic-container-library
cd generic-container-library`,language:"bash"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"2. Add a CMake build script."})}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:[`The script builds a shared library the same way any other C++ project would. It points the include
path at `,e.jsx(n,{children:"ShardScript/include"})," and links the ShardScript runtime shared library."]})}),`
`,e.jsx(i,{code:`cmake_minimum_required(VERSION 3.20)
project(GenericContainer CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

set(SHARDSCRIPT_ROOT "\${CMAKE_CURRENT_SOURCE_DIR}/../ShardScript"
  CACHE PATH "Root of the ShardScript checkout or install prefix")

find_library(SHARDSCRIPT_LIB
  NAMES ShardScript libShardScript
  PATHS "\${SHARDSCRIPT_ROOT}/build/bin" "\${SHARDSCRIPT_ROOT}/lib"
  NO_DEFAULT_PATH
  REQUIRED
)

add_library(generic_container SHARED container.shard.cpp)

set_target_properties(generic_container PROPERTIES
  WINDOWS_EXPORT_ALL_SYMBOLS ON
)

target_include_directories(generic_container PRIVATE "\${SHARDSCRIPT_ROOT}/ShardScript/include")
target_link_libraries(generic_container PRIVATE \${SHARDSCRIPT_LIB})`,language:"cmake",filename:"CMakeLists.txt"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"3. Include the generic-registration headers."})}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:[`In addition to the usual authoring headers, include the symbol factory and generic-type symbol headers
so you can build `,e.jsx(n,{children:"Container<T>"})," and"," ",`
`,e.jsx(n,{children:"T[]"}),"-shaped types at registration time."]})}),`
`,e.jsx(i,{code:`#include <ShardScript.hpp>
#include <shard/semantic/SymbolFactory.hpp>
#include <shard/semantic/symbols/GenericTypeSymbol.hpp>

using namespace shard;`,language:"cpp",filename:"container.shard.cpp"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"4. Declare raw symbol placeholders."})}),`
`,e.jsx(t,{children:e.jsx(r.p,{children:`Store the raw generic class symbol, its type parameter, and any fields you need to access inside
callbacks. The raw class symbol is the generic definition; the concrete type arguments are supplied at
runtime.`})}),`
`,e.jsx(i,{code:`static ClassSymbol* containerClass_raw = nullptr;
static TypeParameterSymbol* container_T = nullptr;
static FieldSymbol* container_valueField = nullptr;`,language:"cpp",filename:"container.shard.cpp"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"5. Register the generic class and its type parameter."})}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:["Call ",e.jsx(n,{children:"AddClass"})," to create the raw class definition, then call"," ",`
`,e.jsx(n,{children:'AddTypeParameter(L"T")'}),". The returned"," ",`
`,e.jsx(n,{children:"TypeParameterSymbol*"}),` is a placeholder you can use for field types, parameter
types, and return types during registration.`]})}),`
`,e.jsx(i,{code:`SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> ns(context, L"genericsdemo");
  SymbolFactory factory(context.GetSemanticModel().Table.get());

  SymbolBuilder<ClassSymbol> containerClass = ns.AddClass(L"Container", ACS_PUBLIC, LINK_INSTANCE);

  container_T = containerClass.AddTypeParameter(L"T");
  containerClass_raw = containerClass.Get();

  // Registration continues in the next steps.
}`,language:"cpp",filename:"container.shard.cpp"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"6. Use the type parameter for fields, parameters, and constructed return types."})}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:["Fields and method parameters can directly use ",e.jsx(n,{children:"container_T"}),`. To express a return
type of `,e.jsx(n,{children:"Container<T>"}),", call"," ",`
`,e.jsx(n,{children:"SymbolFactory::GenericType"}),` with the raw class symbol and a mapping from the
parameter name to the `,e.jsx(n,{children:"TypeParameterSymbol"}),". For the standard"," ",`
`,e.jsx(n,{children:"IEnumerable<T>"})," interface, use"," ",`
`,e.jsx(n,{children:"SymbolFactory::EnumerableOf(elementType)"})," instead of constructing it manually."]})}),`
`,e.jsx(i,{code:`    container_valueField = containerClass
      .AddField(L"_value", container_T, LINK_INSTANCE, ACS_PRIVATE)
      .Get();

  containerClass.AddInit()
      .AddParameter(L"value", container_T)
      .SetCallback(&container_init);

  containerClass.AddMethod(L"GetValue", container_T, LINK_INSTANCE, ACS_PUBLIC)
      .SetCallback(&container_GetValue);

  containerClass.AddMethod(L"SetValue", TYPE_VOID, LINK_INSTANCE, ACS_PUBLIC)
      .AddParameter(L"value", container_T)
      .SetCallback(&container_SetValue);

  GenericTypeSymbol* containerOfT = factory.GenericType(
      containerClass_raw,
      { { L"T", container_T } });

  containerClass.AddMethod(L"Clone", containerOfT, LINK_INSTANCE, ACS_PUBLIC)
      .SetCallback(&container_Clone);
}`,language:"cpp",filename:"container.shard.cpp"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"7. Implement callbacks that read runtime type arguments."})}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:["Inside a generic method, ",e.jsx(n,{children:"context.Frame->TypeArguments"}),` holds the concrete
substitutions in the same order as the `,e.jsx(n,{children:"AddTypeParameter"})," calls. For"," ",`
`,e.jsx(n,{children:"Container<int>"}),", index ",e.jsx(n,{children:"0"}),` is the integer type
symbol. Use it to allocate arrays or other generic instances whose element type matches the caller's
type argument.`]})}),`
`,e.jsx(i,{code:`static ObjectInstance* container_init(const CallState& context)
{
  ObjectInstance* self = context.Args[0];
  ObjectInstance* value = context.Args[1];

  self->SetField(container_valueField->SlotIndex, value);

  return self;
}

static ObjectInstance* container_GetValue(const CallState& context)
{
  ObjectInstance* self = context.Args[0];

  return self->GetField(container_valueField->SlotIndex);
}

static ObjectInstance* container_SetValue(const CallState& context)
{
  ObjectInstance* self = context.Args[0];
  ObjectInstance* value = context.Args[1];

  self->SetField(container_valueField->SlotIndex, value);

  return nullptr;
}

static ObjectInstance* container_Clone(const CallState& context)
{
  ObjectInstance* self = context.Args[0];
  ObjectInstance* value = self->GetField(container_valueField->SlotIndex);

  TypeSymbol* concreteT = context.Frame->TypeArguments[0];
  ObjectInstance* clone = context.Collector.AllocateGeneric(containerClass_raw, { concreteT });

  clone->SetField(container_valueField->SlotIndex, value);

  return clone;
}`,language:"cpp",filename:"container.shard.cpp"}),`
`,e.jsx(d,{tone:"blue",children:e.jsxs(r.p,{children:["Always index ",e.jsx(n,{children:"TypeArguments"}),` in the same order as the type parameters were
registered. For `,e.jsx(n,{children:"Dictionary<K, V>"}),", index ",e.jsx(n,{children:"0"}),` is K
and index `,e.jsx(n,{children:"1"})," is V."]})}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"8. Add library metadata."})}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:["Every native library must export ",e.jsx(n,{children:"ShardLib_GetMetadata"}),`. Declare the library name,
description, and version so the runtime loader can identify and load it.`]})}),`
`,e.jsx(i,{code:`SHARDLIB_GETMETADATA
{
  lib.Name = L"shard.genericsdemo";
  lib.Description = L"How-To demo for generic native types.";
  lib.Version = L"1.0.0";
}`,language:"cpp",filename:"container.shard.cpp"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"9. Build the shared library."})}),`
`,e.jsx(i,{code:`cmake -S . -B build -G Ninja -DCMAKE_BUILD_TYPE=Release
cmake --build build --parallel`,language:"bash"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:["The build emits a platform-specific shared library in ",e.jsx(n,{children:"build/"}),":"]})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(a,{children:e.jsxs(r.p,{children:["Windows: ",e.jsx(n,{children:"build/generic_container.dll"})]})}),e.jsx(a,{children:e.jsxs(r.p,{children:["Linux: ",e.jsx(n,{children:"build/libgeneric_container.so"})]})}),e.jsx(a,{children:e.jsxs(r.p,{children:["macOS: ",e.jsx(n,{children:"build/libgeneric_container.dylib"})]})})]}),`
`,e.jsx(c,{children:"Verification"}),`
`,e.jsx(t,{children:e.jsx(r.p,{children:`Write a ShardScript program that constructs, reads, and clones the generic container. If the type
parameter flows correctly through registration and runtime allocation, both containers hold the same
value and the clone has the same concrete type as the original.`})}),`
`,e.jsx(i,{code:`using stdio;
using genericsdemo;

namespace demo;

public static func Main() -> void
{
  first: Container<int> = new Container<int>(42);
  second: Container<int> = first.Clone();

  println(first.GetValue());   // 42
  println(second.GetValue());  // 42

  second.SetValue(99);

  println(first.GetValue());   // 42
  println(second.GetValue());  // 99
}`,language:"csharp",filename:"app.shard"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:["Run the program with the ",e.jsx(n,{children:"-l"})," flag pointing at the shared library you built:"]})}),`
`,e.jsx(i,{code:`# Windows
shard app.shard -l build/generic_container.dll

# Linux
shard app.shard -l build/libgeneric_container.so

# macOS
shard app.shard -l build/libgeneric_container.dylib`,language:"bash"}),`
`,e.jsx(t,{children:e.jsx(r.p,{children:"Expected output:"})}),`
`,e.jsx(i,{code:`42
42
42
99`,language:"text"}),`
`,e.jsx(c,{children:"Troubleshooting"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Type argument index is wrong."})," If"," ",`
`,e.jsx(n,{children:"context.Frame->TypeArguments[0]"}),` returns the wrong concrete type, verify
that you read the arguments in the same order as the `,e.jsx(n,{children:"AddTypeParameter"}),` calls.
For multi-parameter generics such as `,e.jsx(n,{children:"Dictionary<K, V>"}),`, K is index 0 and
V is index 1.`]})}),e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Clone returns a raw generic definition."})," Use"," ",`
`,e.jsxs(n,{children:["AllocateGeneric(containerClass_raw, ","{"," concreteT ","}",")"]}),", not"," ",`
`,e.jsx(n,{children:"AllocateInstance(containerClass_raw)"}),`. The latter creates an instance of the
raw definition and loses the caller's concrete type argument.`]})}),e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Field type does not match the type argument."}),` Register
generic fields with the `,e.jsx(n,{children:"TypeParameterSymbol"}),` placeholder, not with a concrete
type. If you register the field as `,e.jsx(n,{children:"TYPE_INT"}),`, every constructed instance of
the generic class will still treat the field as `,e.jsx(n,{children:"int"}),"."]})}),e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Generic interface implementation fails."}),` When a class
implements `,e.jsx(n,{children:"IWrapper<T>"}),", construct the interface type with"," ",`
`,e.jsx(n,{children:'factory.GenericType(wrapperInterface_raw, { { L"T", container_T } })'}),` so the
interface's type parameter is mapped to the class's type parameter.`]})}),e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Callback is not invoked."}),` Confirm that every method has
a matching `,e.jsx(n,{children:".SetCallback(...)"}),` call and that the linking mode matches the call
site. Instance methods on a generic class are still invoked through an instance and receive`," ",`
`,e.jsx(n,{children:"this"})," as ",e.jsx(n,{children:"context.Args[0]"}),"."]})})]}),`
`,e.jsx(c,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"library-building/example-generic-collections"})," — generic collections example."]})}),e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"library-building/inter-library-dependencies"})," — cross-library generic construction."]})}),e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"library-building/reflection-style-lookups"})," — reflection-style symbol lookups."]})}),e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"library-building/class-symbol-builder"})," — registering generic classes."]})})]})]})}function p(s={}){const{wrapper:r}=s.components||{};return r?e.jsx(r,{...s,children:e.jsx(o,{...s})}):o(s)}function l(s,r){throw new Error("Expected component `"+s+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
