import{j as e}from"./index-hFDFiLgA.js";function h(l){const t={p:"p",...l.components},{Bullet:a,Callout:d,CodeBlock:c,DocsTable:o,H2:s,InlineCode:r,Prose:n}=t;return a||i("Bullet"),d||i("Callout"),c||i("CodeBlock"),o||i("DocsTable"),s||i("H2"),r||i("InlineCode"),n||i("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:e.jsxs(t.p,{children:[`Native libraries frequently need to allocate, fill, read, and traverse ShardScript arrays from C++.
The runtime exposes four operations for this: `,e.jsx(r,{children:"AllocateArray"}),","," ",`
`,e.jsx(r,{children:"SetElement"}),", ",e.jsx(r,{children:"GetElement"}),", and"," ",`
`,e.jsx(r,{children:"GetArrayLength"}),`. This guide shows how to use them in a standalone shared
library that is built outside the ShardScript repository.`]})}),`
`,e.jsx(s,{children:"Prerequisites"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(a,{children:e.jsxs(t.p,{children:["A built ShardScript runtime shared library and the headers in"," ",`
`,e.jsx(r,{children:"ShardScript/include"}),"."]})}),e.jsx(a,{children:e.jsx(t.p,{children:"A C++20 toolchain and CMake 3.20 or later."})}),e.jsx(a,{children:e.jsxs(t.p,{children:["Basic familiarity with ",e.jsx(r,{children:"SHARDLIB_GETMETADATA"})," and"," ",`
`,e.jsx(r,{children:"SHARDLIB_ENTRYPOINT"}),"."]})})]}),`
`,e.jsx(s,{children:"Goal"}),`
`,e.jsx(n,{children:e.jsxs(t.p,{children:["Build a native shared library called ",e.jsx(r,{children:"array_helpers"}),` that exposes three static
helpers on the `,e.jsx(r,{children:"arrayhelpers.ArrayHelpers"}),` class: one that allocates and fills
an `,e.jsx(r,{children:"int[]"}),", one that sums the elements of an ",e.jsx(r,{children:"int[]"}),`, and
one that returns a reversed copy of an `,e.jsx(r,{children:"int[]"}),"."]})}),`
`,e.jsx(s,{children:"Step-by-Step Instructions"}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"1. Understand the array API."})}),`
`,e.jsx(n,{children:e.jsxs(t.p,{children:["The garbage collector creates arrays through ",e.jsx(r,{children:"context.Collector.AllocateArray"}),`.
Once allocated, elements are read or written with `,e.jsx(r,{children:"GetElement"})," and"," ",`
`,e.jsx(r,{children:"SetElement"}),`, both of which accept the current frame so generic array types can
be resolved. `,e.jsx(r,{children:"GetArrayLength"})," returns the number of elements as a scalar count."]})}),`
`,e.jsx(o,{headers:["Operation","C++ call","Purpose"],rows:[["Allocate","context.Collector.AllocateArray(TYPE_INT, length)","Creates a new array of the given element type and length."],["Write","arr->SetElement(index, value, context.Frame)","Stores a boxed value at the specified index."],["Read","arr->GetElement(index, context.Frame)","Returns the boxed value at the specified index."],["Length","arr->GetArrayLength()","Returns the number of elements as std::size_t."]]}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"2. Create the library source file."})}),`
`,e.jsx(n,{children:e.jsxs(t.p,{children:["Make a new directory for the project and add ",e.jsx(r,{children:"array_helpers.cpp"}),`. This file is a
normal C++ translation unit; the resulting shared library exports the two required C-linkage symbols
through the `,e.jsx(r,{children:"SHARDLIB_GETMETADATA"})," and ",e.jsx(r,{children:"SHARDLIB_ENTRYPOINT"})," ",`
macros.`]})}),`
`,e.jsx(c,{code:`#include <ShardScript.hpp>

using namespace shard;

// Allocates a new int[] and fills it with start, start+1, ..., start+count-1.
ObjectInstance* ArrayHelpers_FillRange(const CallState& context)
{
  std::int64_t start = context.Args[0]->AsInteger();
  std::int64_t count = context.Args[1]->AsInteger();

  // Reject negative sizes instead of silently underflowing.
  if (count < 0)
  {
      return context.Collector.AllocateArray(TYPE_INT, 0);
  }

  std::size_t length = static_cast<std::size_t>(count);
  ObjectInstance* arr = context.Collector.AllocateArray(TYPE_INT, length);

  for (std::size_t i = 0; i < length; i++)
  {
      std::int64_t value = start + static_cast<std::int64_t>(i);
      arr->SetElement(i, context.Collector.FromValue(value), context.Frame);
  }

  return arr;
}

// Sums every element of the incoming int[] using GetElement.
ObjectInstance* ArrayHelpers_Sum(const CallState& context)
{
  ObjectInstance* arr = context.Args[0];

  // Treat null as an empty array so the caller gets a defined result.
  if (arr == nullptr || arr == GarbageCollector::NullInstance)
  {
      return context.Collector.FromValue(0);
  }

  std::int64_t sum = 0;
  std::size_t length = arr->GetArrayLength();

  for (std::size_t i = 0; i < length; i++)
  {
      ObjectInstance* element = arr->GetElement(i, context.Frame);
      if (element != nullptr)
      {
          sum += element->AsInteger();
      }
  }

  return context.Collector.FromValue(sum);
}

// Returns a new int[] containing the elements of the source array in reverse order.
ObjectInstance* ArrayHelpers_Reverse(const CallState& context)
{
  ObjectInstance* source = context.Args[0];

  if (source == nullptr || source == GarbageCollector::NullInstance)
  {
      return context.Collector.AllocateArray(TYPE_INT, 0);
  }

  std::size_t length = source->GetArrayLength();
  ObjectInstance* result = context.Collector.AllocateArray(TYPE_INT, length);

  for (std::size_t i = 0; i < length; i++)
  {
      std::size_t sourceIndex = length - i - 1;
      ObjectInstance* value = source->GetElement(sourceIndex, context.Frame);
      result->SetElement(i, value, context.Frame);
  }

  return result;
}

SHARDLIB_GETMETADATA
{
  lib.Name        = L"shard.arrayhelpers";
  lib.Description = L"Array manipulation helpers";
  lib.Version     = L"1.0.0";
}

SHARDLIB_ENTRYPOINT
{
  SymbolFactory factory(context.GetSemanticModel().Table.get());
  TypeSymbol* intArrayType = factory.Array(TYPE_INT);

  SymbolBuilder<NamespaceSymbol> arrayHelpers(context, L"arrayhelpers");

  arrayHelpers.AddClass(L"ArrayHelpers", ACS_PUBLIC, LINK_STATIC, [intArrayType](SymbolBuilder<ClassSymbol> type)
  {
      type.AddMethod(L"FillRange", intArrayType, LINK_STATIC, ACS_PUBLIC)
          .AddParameter(L"start", TYPE_INT)
          .AddParameter(L"count", TYPE_INT)
          .SetCallback(&ArrayHelpers_FillRange);

      type.AddMethod(L"Sum", TYPE_INT, LINK_STATIC, ACS_PUBLIC)
          .AddParameter(L"values", intArrayType)
          .SetCallback(&ArrayHelpers_Sum);

      type.AddMethod(L"Reverse", intArrayType, LINK_STATIC, ACS_PUBLIC)
          .AddParameter(L"values", intArrayType)
          .SetCallback(&ArrayHelpers_Reverse);
  });
}`,language:"cpp",filename:"array_helpers.cpp"}),`
`,e.jsx(d,{tone:"blue",title:"Why pass context.Frame to GetElement and SetElement",children:e.jsxs(t.p,{children:["The frame carries generic type arguments. Even for a concrete ",e.jsx(r,{children:"int[]"}),` the runtime
uses the frame to validate the array shape, so always pass `,e.jsx(r,{children:"context.Frame"}),` unless
the underlying API explicitly defaults it.`]})}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"3. Add a standalone CMake build script."})}),`
`,e.jsx(n,{children:e.jsxs(t.p,{children:[`Because a native library is just a shared library with the two exported symbols, you can build it with a
normal CMake target. The example below locates the ShardScript runtime, adds the include directory, and
links the library. Adjust `,e.jsx(r,{children:"SHARDSCRIPT_ROOT"}),` to point at your ShardScript checkout
or install prefix.`]})}),`
`,e.jsx(c,{code:`cmake_minimum_required(VERSION 3.20)
project(ArrayHelpers CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

set(SHARDSCRIPT_ROOT "\${CMAKE_CURRENT_SOURCE_DIR}/../ShardScript"
  CACHE PATH "Root of the ShardScript repository or install prefix")

find_library(SHARDSCRIPT_LIB
  NAMES ShardScript libShardScript
  PATHS "\${SHARDSCRIPT_ROOT}/build/bin" "\${SHARDSCRIPT_ROOT}/lib"
  NO_DEFAULT_PATH
  REQUIRED
)

add_library(array_helpers SHARED array_helpers.cpp)

set_target_properties(array_helpers PROPERTIES
  WINDOWS_EXPORT_ALL_SYMBOLS ON
)

target_include_directories(array_helpers PRIVATE "\${SHARDSCRIPT_ROOT}/ShardScript/include")
target_link_libraries(array_helpers PRIVATE \${SHARDSCRIPT_LIB})`,language:"cmake",filename:"CMakeLists.txt"}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"4. Build the shared library."})}),`
`,e.jsx(c,{code:`cmake -S . -B build -G Ninja -DCMAKE_BUILD_TYPE=Release
cmake --build build --parallel`,language:"bash"}),`
`,e.jsx(n,{children:e.jsx(t.p,{children:"The build emits a shared library next to the build tree:"})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(a,{children:e.jsxs(t.p,{children:["On Windows: ",e.jsx(r,{children:"build/array_helpers.dll"})]})}),e.jsx(a,{children:e.jsxs(t.p,{children:["On Linux: ",e.jsx(r,{children:"build/libarray_helpers.so"})]})}),e.jsx(a,{children:e.jsxs(t.p,{children:["On macOS: ",e.jsx(r,{children:"build/libarray_helpers.dylib"})]})})]}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"5. Write a ShardScript program that consumes the library."})}),`
`,e.jsx(n,{children:e.jsxs(t.p,{children:["Create ",e.jsx(r,{children:"app.shard"}),` in the same directory. Import the namespace, call each helper,
and print the results.`]})}),`
`,e.jsx(c,{code:`using stdio;
using arrayhelpers;

namespace demo;

public static func PrintArray(label: string, values: int[]) -> void
{
  print(label + ": [");

  for (i: int = 0; i < values.Length; i = i + 1)
  {
      if (i > 0)
      {
          print(", ");
      }

      print(values[i]);
  }

  println("]");
}

public static func Main() -> void
{
  int[] numbers = ArrayHelpers.FillRange(1, 5);
  int total = ArrayHelpers.Sum(numbers);
  int[] reversed = ArrayHelpers.Reverse(numbers);

  PrintArray("Numbers", numbers);
  println("Sum: " + total);
  PrintArray("Reversed", reversed);
}`,language:"csharp",filename:"app.shard"}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"6. Run the program with the new library."})}),`
`,e.jsx(n,{children:e.jsxs(t.p,{children:["Pass the compiled shared library to the interpreter with the ",e.jsx(r,{children:"-l"})," flag."]})}),`
`,e.jsx(c,{code:`# Windows
shard app.shard -l build/array_helpers.dll

# Linux
shard app.shard -l build/libarray_helpers.so

# macOS
shard app.shard -l build/libarray_helpers.dylib`,language:"bash"}),`
`,e.jsx(s,{children:"Verification"}),`
`,e.jsx(n,{children:e.jsx(t.p,{children:"The program should print the filled array, its sum, and the reversed copy."})}),`
`,e.jsx(n,{children:e.jsx(r,{children:"Numbers: [1, 2, 3, 4, 5]"})}),`
`,e.jsx(n,{children:e.jsx(r,{children:"Sum: 15"})}),`
`,e.jsx(n,{children:e.jsx(r,{children:"Reversed: [5, 4, 3, 2, 1]"})}),`
`,e.jsx(d,{tone:"green",title:"Success criteria",children:e.jsxs(t.p,{children:[`If all three lines appear, the native callbacks correctly allocated the array, wrote each element, read
elements with `,e.jsx(r,{children:"GetElement"}),", and returned the new arrays to ShardScript."]})}),`
`,e.jsx(s,{children:"Troubleshooting"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(a,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Index out of range."})," ",`
`,e.jsx(r,{children:"SetElement"})," and ",e.jsx(r,{children:"GetElement"}),` do not grow the array. Always
allocate the target length with `,e.jsx(r,{children:"AllocateArray"})," first, or guard the index with"," ",`
`,e.jsx(r,{children:"GetArrayLength"}),"."]})}),e.jsx(a,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Null pointer in callback."})," Arguments can be"," ",`
`,e.jsx(r,{children:"GarbageCollector::NullInstance"})," when the caller passes ",e.jsx(r,{children:"null"}),`.
Guard reference arguments before dereferencing them.`]})}),e.jsx(a,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Generic array type mismatch."}),` For arrays of a generic type
parameter, register the parameter type with `,e.jsx(r,{children:"factory.Array(typeParam)"})," and use"," ",`
`,e.jsx(r,{children:"context.Frame->TypeArguments"}),` at runtime to resolve the concrete element type before
allocating.`]})}),e.jsx(a,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Library fails to load."}),` Confirm the shared library exports
`,e.jsx(r,{children:"ShardLib_GetMetadata"})," and ",e.jsx(r,{children:"ShardLib_EntryPoint"}),`. On Windows,
either set `,e.jsx(r,{children:"WINDOWS_EXPORT_ALL_SYMBOLS ON"}),` or mark the two macro blocks with explicit
dllexport attributes.`]})})]}),`
`,e.jsx(s,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(a,{children:e.jsxs(t.p,{children:[e.jsx(r,{children:"library-building/reading-arguments"})," — reading arguments."]})}),e.jsx(a,{children:e.jsxs(t.p,{children:[e.jsx(r,{children:"library-building/returning-values"})," — returning values."]})}),e.jsx(a,{children:e.jsxs(t.p,{children:[e.jsx(r,{children:"library-building/example-generic-collections"})," — collection implementation example."]})}),e.jsx(a,{children:e.jsxs(t.p,{children:[e.jsx(r,{children:"library-building/generic-types-and-type-parameters"})," — generic array types."]})})]})]})}function p(l={}){const{wrapper:t}=l.components||{};return t?e.jsx(t,{...l,children:e.jsx(h,{...l})}):h(l)}function i(l,t){throw new Error("Expected component `"+l+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
