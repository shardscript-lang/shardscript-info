import{j as e}from"./index-BQw6jbtc.js";function h(s){const a={p:"p",...s.components},{Bullet:n,Callout:o,CodeBlock:d,DocsTable:c,H2:l,InlineCode:t,Prose:r}=a;return n||i("Bullet"),o||i("Callout"),d||i("CodeBlock"),c||i("DocsTable"),l||i("H2"),t||i("InlineCode"),r||i("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(l,{children:"Summary"}),`
`,e.jsx(r,{children:e.jsxs(a.p,{children:["The ",e.jsx(t,{children:"shard.math"}),` native library registers a single static class,
`,e.jsx(t,{children:"math.Math"}),`, that exposes read-only mathematical constants as properties and
wraps standard C math functions as static methods. It is the smallest framework library and the
recommended starting point for learning how to author a stateless native shard.
`,e.jsx(t,{children:"shard.math"})," is a shared library built from ",e.jsx(t,{children:"system/math.shard.cpp"}),`.
It exports `,e.jsx(t,{children:"ShardLib_GetMetadata"})," and ",e.jsx(t,{children:"ShardLib_EntryPoint"}),`,
registers the `,e.jsx(t,{children:"math"})," namespace, and adds a static ",e.jsx(t,{children:"Math"}),` class
containing the constants `,e.jsx(t,{children:"PI"})," and ",e.jsx(t,{children:"E"}),` plus methods such as
`,e.jsx(t,{children:"Sin"}),", ",e.jsx(t,{children:"Pow"}),", and ",e.jsx(t,{children:"Sqrt"}),`. Every member
uses static linking, so ShardScript code calls them through the type name rather than through an instance.`]})}),`
`,e.jsx(l,{children:"Syntax"}),`
`,e.jsx(r,{children:e.jsxs(a.p,{children:[`A native math library is a normal shared library that defines the two required entry points and registers
symbols inside `,e.jsx(t,{children:"SHARDLIB_ENTRYPOINT"}),". The static class pattern looks like this:"]})}),`
`,e.jsx(d,{code:`SHARDLIB_GETMETADATA
{
  lib.Name        = L"shard.math";
  lib.Description = L"High-performance native math library wrappers";
  lib.Version     = L"1.0.0";
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> mathNamespace(context, L"math");

  mathNamespace.AddClass(L"Math", ACS_PUBLIC, LINK_STATIC, [](SymbolBuilder<ClassSymbol> math)
  {
      math.AddProperty(L"PI", TYPE_DOUBLE, LINK_STATIC, ACS_PUBLIC)
          .AddGetter().SetCallback([](const CallState& context)
          {
              return context.Collector.FromValue(3.14159265358979323846);
          });

      math.AddMethod(L"Sin", TYPE_DOUBLE, LINK_STATIC, ACS_PUBLIC)
          .AddParameter(L"value", TYPE_DOUBLE)
          .SetCallback([](const CallState& context)
          {
              auto [value] = GetArgs<double>(context);
              return context.Collector.FromValue(std::sin(value));
          });
  });
}`,language:"cpp"}),`
`,e.jsx(l,{children:"Parameters / Arguments"}),`
`,e.jsx(c,{headers:["Method","Parameters","Returns","Description"],rows:[[e.jsx(t,{children:"AddClass"}),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:'L"Math"'}),", ",e.jsx(t,{children:"ACS_PUBLIC"}),", ",e.jsx(t,{children:"LINK_STATIC"})]}),e.jsx(t,{children:"ClassSymbol*"}),"Registers the static ShardScript-visible class name."],[e.jsx(t,{children:"AddProperty"}),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:'L"PI" / L"E"'}),", ",e.jsx(t,{children:"TYPE_DOUBLE"}),", ",e.jsx(t,{children:"LINK_STATIC"}),", ",e.jsx(t,{children:"ACS_PUBLIC"})]}),e.jsx(t,{children:"SymbolBuilder<PropertySymbol>&"}),"Registers a read-only constant property."],[e.jsx(t,{children:"AddMethod"}),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:'L"Sin" etc.'}),", ",e.jsx(t,{children:"TYPE_DOUBLE"}),", ",e.jsx(t,{children:"LINK_STATIC"}),", ",e.jsx(t,{children:"ACS_PUBLIC"})]}),e.jsx(t,{children:"SymbolBuilder<MethodSymbol>&"}),"Registers a static method called as Math.Name(...)."],[e.jsx(t,{children:"AddParameter"}),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:'L"value" / L"a" / L"b" etc.'}),", ",e.jsx(t,{children:"TYPE_DOUBLE"})]}),e.jsx(t,{children:"SymbolBuilder<MethodSymbol>&"}),"Adds a parameter used for overload resolution."],[e.jsx(t,{children:"GetArgs<T...>"}),e.jsx(e.Fragment,{children:e.jsx(t,{children:"T..."})}),e.jsx(t,{children:"std::tuple<T...>"}),"Reads context.Args into C++ primitive types in registration order."]]}),`
`,e.jsx(l,{children:"Returns"}),`
`,e.jsx(c,{headers:["Member / Call","Return type","Description"],rows:[[e.jsx(t,{children:"Math.PI"}),e.jsx(t,{children:"double"}),"The constant pi."],[e.jsx(t,{children:"Math.E"}),e.jsx(t,{children:"double"}),"The constant e."],[e.jsx(t,{children:"Math.Sin(value)"}),e.jsx(t,{children:"double"}),"std::sin(value)."],[e.jsx(t,{children:"Math.Cos(value)"}),e.jsx(t,{children:"double"}),"std::cos(value)."],[e.jsx(t,{children:"Math.Tan(value)"}),e.jsx(t,{children:"double"}),"std::tan(value)."],[e.jsx(t,{children:"Math.Asin(value)"}),e.jsx(t,{children:"double"}),"std::asin(value)."],[e.jsx(t,{children:"Math.Acos(value)"}),e.jsx(t,{children:"double"}),"std::acos(value)."],[e.jsx(t,{children:"Math.Atan(value)"}),e.jsx(t,{children:"double"}),"std::atan(value)."],[e.jsx(t,{children:"Math.Atan2(y, x)"}),e.jsx(t,{children:"double"}),"std::atan2(y, x)."],[e.jsx(t,{children:"Math.Pow(base, exponent)"}),e.jsx(t,{children:"double"}),"std::pow(base, exponent)."],[e.jsx(t,{children:"Math.Sqrt(value)"}),e.jsx(t,{children:"double"}),"std::sqrt(value)."],[e.jsx(t,{children:"Math.Cbrt(value)"}),e.jsx(t,{children:"double"}),"std::cbrt(value)."],[e.jsx(t,{children:"Math.Exp(value)"}),e.jsx(t,{children:"double"}),"std::exp(value)."],[e.jsx(t,{children:"Math.Log(value)"}),e.jsx(t,{children:"double"}),"std::log(value)."],[e.jsx(t,{children:"Math.Log10(value)"}),e.jsx(t,{children:"double"}),"std::log10(value)."],[e.jsx(t,{children:"Math.Abs(value)"}),e.jsx(t,{children:"double"}),"std::abs(value)."],[e.jsx(t,{children:"Math.Ceil(value)"}),e.jsx(t,{children:"double"}),"std::ceil(value)."],[e.jsx(t,{children:"Math.Floor(value)"}),e.jsx(t,{children:"double"}),"std::floor(value)."],[e.jsx(t,{children:"Math.Round(value)"}),e.jsx(t,{children:"double"}),"std::round(value)."],[e.jsx(t,{children:"Math.Min(a, b)"}),e.jsx(t,{children:"double"}),"std::fmin(a, b)."],[e.jsx(t,{children:"Math.Max(a, b)"}),e.jsx(t,{children:"double"}),"std::fmax(a, b)."]]}),`
`,e.jsx(l,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(n,{children:e.jsxs(a.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Domain error from the C runtime"}),` — Methods such as
`,e.jsx(t,{children:"Math.Sqrt"})," call ",e.jsx(t,{children:"std::sqrt"}),` directly. Passing a negative
value produces a NaN result rather than a ShardScript exception.`]})}),e.jsx(n,{children:e.jsxs(a.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Argument count mismatch"}),` — Calling
`,e.jsx(t,{children:"Math.Pow(2.0)"}),` with one argument fails semantic overload resolution because the
method is registered with two `,e.jsx(t,{children:"TYPE_DOUBLE"})," parameters."]})}),e.jsx(n,{children:e.jsxs(a.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Type mismatch"})," — Passing an ",e.jsx(t,{children:"int"}),` to
`,e.jsx(t,{children:"Math.Sin"}),` is rejected at compile time unless an implicit conversion to
`,e.jsx(t,{children:"double"})," exists."]})}),e.jsx(n,{children:e.jsxs(a.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Static member called on an instance"}),` — Because
`,e.jsx(t,{children:"Math"})," is registered with ",e.jsx(t,{children:"LINK_STATIC"}),`, constructing an
instance with `,e.jsx(t,{children:"new Math()"})," is invalid."]})}),e.jsx(n,{children:e.jsxs(a.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Missing callback"}),` — Forgetting
`,e.jsx(t,{children:".SetCallback(...)"}),` on a property getter or method registers the symbol but never
runs native code when invoked.`]})})]}),`
`,e.jsx(l,{children:"Remarks"}),`
`,e.jsx(o,{tone:"blue",title:"Native library shape",children:e.jsxs(a.p,{children:["A ShardScript native library is any shared library (",e.jsx(t,{children:".dll"})," on Windows, ",e.jsx(t,{children:".so"})," on Linux, ",e.jsx(t,{children:".dylib"})," on macOS) that exports the two C-linkage symbols ",e.jsx(t,{children:"ShardLib_GetMetadata"})," and ",e.jsx(t,{children:"ShardLib_EntryPoint"}),". It can be built from one or many C++ source files, live inside ",e.jsx(t,{children:"ShardScript.Framework"})," or in a completely separate project, and links against the ShardScript runtime shared library using headers from ",e.jsx(t,{children:"ShardScript/include"}),". For the full registration contract, see ",e.jsx(t,{children:"native-library-overview.mdx"}),"."]})}),`
`,e.jsx(r,{children:e.jsxs(a.p,{children:[e.jsx("strong",{children:"Static class registration."}),` The class itself is registered with
`,e.jsx(t,{children:"LINK_STATIC"}),`. This tells the semantic model that the type has no instance layout and
that every member is reached through the type name. Static classes are the right shape for stateless utility
libraries such as math, constants, or pure functions.`]})}),`
`,e.jsx(r,{children:e.jsxs(a.p,{children:[e.jsx("strong",{children:"Read-only constants as properties."})," ",e.jsx(t,{children:"PI"})," and ",e.jsx(t,{children:"E"}),`
are registered with `,e.jsx(t,{children:"AddProperty"}),` and a getter callback, not as fields. Properties with
only a getter are read-only from ShardScript and prevent callers from mutating the constant.`]})}),`
`,e.jsx(r,{children:e.jsxs(a.p,{children:[e.jsx("strong",{children:"The GetArgs helper."})," The ",e.jsx(t,{children:"GetArgs<T...>"}),` convenience helper reads
`,e.jsx(t,{children:"context.Args"}),` from index zero in order and converts each argument to the requested C++
primitive type. For a static method, index zero is the first real parameter; for an instance method it would
be `,e.jsx(t,{children:"this"}),"."]})}),`
`,e.jsx(o,{tone:"amber",title:"Structured bindings and implicit typing",children:e.jsxs(a.p,{children:["The ",e.jsx(t,{children:"auto [value] = GetArgs<T>(context);"})," syntax uses C++ structured bindings, which require ",e.jsx(t,{children:"auto"}),". This is an intentional exception to the explicit-typing rule used elsewhere in native library code."]})}),`
`,e.jsx(r,{children:e.jsxs(a.p,{children:[e.jsx("strong",{children:"Returning values."}),` Every callback boxes its result through
`,e.jsx(t,{children:"context.Collector.FromValue(...)"}),`. The collector owns the returned object, so the
callback does not free it. Properties and methods that produce `,e.jsx(t,{children:"void"}),` return
`,e.jsx(t,{children:"nullptr"}),"."]})}),`
`,e.jsx(o,{tone:"blue",children:e.jsxs(a.p,{children:[`Keep utility libraries stateless. If you find yourself adding instance fields to a math class, consider
whether the feature belongs in a separate type with `,e.jsx(t,{children:"LINK_INSTANCE"})," instead."]})}),`
`,e.jsx(l,{children:"Examples"}),`
`,e.jsx(r,{children:e.jsxs(a.p,{children:[e.jsx("strong",{children:"Complete library source."}),` This is the framework implementation of
`,e.jsx(t,{children:"system/math.shard.cpp"}),"."]})}),`
`,e.jsx(d,{code:`#include <ShardScript.hpp>
#include <cmath>

using namespace shard;

SHARDLIB_GETMETADATA
{
  lib.Name = L"shard.math";
  lib.Description = L"High-performance native math library wrappers";
  lib.Version = L"1.0.0";
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> mathNamespace(context, L"math");

  mathNamespace.AddClass(L"Math", ACS_PUBLIC, LINK_STATIC, [](SymbolBuilder<ClassSymbol> math)
  {
      math.AddProperty(L"PI", TYPE_DOUBLE, LINK_STATIC, ACS_PUBLIC)
          .AddGetter().SetCallback([](const CallState& context)
          {
              return context.Collector.FromValue(3.14159265358979323846);
          });

      math.AddProperty(L"E", TYPE_DOUBLE, LINK_STATIC, ACS_PUBLIC)
          .AddGetter().SetCallback([](const CallState& context)
          {
              return context.Collector.FromValue(2.71828182845904523536);
          });

      math.AddMethod(L"Sin", TYPE_DOUBLE, LINK_STATIC, ACS_PUBLIC)
          .AddParameter(L"value", TYPE_DOUBLE)
          .SetCallback([](const CallState& context)
          {
              auto [value] = GetArgs<double>(context);
              return context.Collector.FromValue(std::sin(value));
          });

      math.AddMethod(L"Cos", TYPE_DOUBLE, LINK_STATIC, ACS_PUBLIC)
          .AddParameter(L"value", TYPE_DOUBLE)
          .SetCallback([](const CallState& context)
          {
              auto [value] = GetArgs<double>(context);
              return context.Collector.FromValue(std::cos(value));
          });

      math.AddMethod(L"Tan", TYPE_DOUBLE, LINK_STATIC, ACS_PUBLIC)
          .AddParameter(L"value", TYPE_DOUBLE)
          .SetCallback([](const CallState& context)
          {
              auto [value] = GetArgs<double>(context);
              return context.Collector.FromValue(std::tan(value));
          });

      math.AddMethod(L"Asin", TYPE_DOUBLE, LINK_STATIC, ACS_PUBLIC)
          .AddParameter(L"value", TYPE_DOUBLE)
          .SetCallback([](const CallState& context)
          {
              auto [value] = GetArgs<double>(context);
              return context.Collector.FromValue(std::asin(value));
          });

      math.AddMethod(L"Acos", TYPE_DOUBLE, LINK_STATIC, ACS_PUBLIC)
          .AddParameter(L"value", TYPE_DOUBLE)
          .SetCallback([](const CallState& context)
          {
              auto [value] = GetArgs<double>(context);
              return context.Collector.FromValue(std::acos(value));
          });

      math.AddMethod(L"Atan", TYPE_DOUBLE, LINK_STATIC, ACS_PUBLIC)
          .AddParameter(L"value", TYPE_DOUBLE)
          .SetCallback([](const CallState& context)
          {
              auto [value] = GetArgs<double>(context);
              return context.Collector.FromValue(std::atan(value));
          });

      math.AddMethod(L"Atan2", TYPE_DOUBLE, LINK_STATIC, ACS_PUBLIC)
          .AddParameter(L"y", TYPE_DOUBLE)
          .AddParameter(L"x", TYPE_DOUBLE)
          .SetCallback([](const CallState& context)
          {
              auto [y, x] = GetArgs<double, double>(context);
              return context.Collector.FromValue(std::atan2(y, x));
          });

      math.AddMethod(L"Pow", TYPE_DOUBLE, LINK_STATIC, ACS_PUBLIC)
          .AddParameter(L"base", TYPE_DOUBLE)
          .AddParameter(L"exponent", TYPE_DOUBLE)
          .SetCallback([](const CallState& context)
          {
              auto [base, exponent] = GetArgs<double, double>(context);
              return context.Collector.FromValue(std::pow(base, exponent));
          });

      math.AddMethod(L"Sqrt", TYPE_DOUBLE, LINK_STATIC, ACS_PUBLIC)
          .AddParameter(L"value", TYPE_DOUBLE)
          .SetCallback([](const CallState& context)
          {
              auto [value] = GetArgs<double>(context);
              return context.Collector.FromValue(std::sqrt(value));
          });

      math.AddMethod(L"Cbrt", TYPE_DOUBLE, LINK_STATIC, ACS_PUBLIC)
          .AddParameter(L"value", TYPE_DOUBLE)
          .SetCallback([](const CallState& context)
          {
              auto [value] = GetArgs<double>(context);
              return context.Collector.FromValue(std::cbrt(value));
          });

      math.AddMethod(L"Exp", TYPE_DOUBLE, LINK_STATIC, ACS_PUBLIC)
          .AddParameter(L"value", TYPE_DOUBLE)
          .SetCallback([](const CallState& context)
          {
              auto [value] = GetArgs<double>(context);
              return context.Collector.FromValue(std::exp(value));
          });

      math.AddMethod(L"Log", TYPE_DOUBLE, LINK_STATIC, ACS_PUBLIC)
          .AddParameter(L"value", TYPE_DOUBLE)
          .SetCallback([](const CallState& context)
          {
              auto [value] = GetArgs<double>(context);
              return context.Collector.FromValue(std::log(value));
          });

      math.AddMethod(L"Log10", TYPE_DOUBLE, LINK_STATIC, ACS_PUBLIC)
          .AddParameter(L"value", TYPE_DOUBLE)
          .SetCallback([](const CallState& context)
          {
              auto [value] = GetArgs<double>(context);
              return context.Collector.FromValue(std::log10(value));
          });

      math.AddMethod(L"Abs", TYPE_DOUBLE, LINK_STATIC, ACS_PUBLIC)
          .AddParameter(L"value", TYPE_DOUBLE)
          .SetCallback([](const CallState& context)
          {
              auto [value] = GetArgs<double>(context);
              return context.Collector.FromValue(std::abs(value));
          });

      math.AddMethod(L"Ceil", TYPE_DOUBLE, LINK_STATIC, ACS_PUBLIC)
          .AddParameter(L"value", TYPE_DOUBLE)
          .SetCallback([](const CallState& context)
          {
              auto [value] = GetArgs<double>(context);
              return context.Collector.FromValue(std::ceil(value));
          });

      math.AddMethod(L"Floor", TYPE_DOUBLE, LINK_STATIC, ACS_PUBLIC)
          .AddParameter(L"value", TYPE_DOUBLE)
          .SetCallback([](const CallState& context)
          {
              auto [value] = GetArgs<double>(context);
              return context.Collector.FromValue(std::floor(value));
          });

      math.AddMethod(L"Round", TYPE_DOUBLE, LINK_STATIC, ACS_PUBLIC)
          .AddParameter(L"value", TYPE_DOUBLE)
          .SetCallback([](const CallState& context)
          {
              auto [value] = GetArgs<double>(context);
              return context.Collector.FromValue(std::round(value));
          });

      math.AddMethod(L"Min", TYPE_DOUBLE, LINK_STATIC, ACS_PUBLIC)
          .AddParameter(L"a", TYPE_DOUBLE)
          .AddParameter(L"b", TYPE_DOUBLE)
          .SetCallback([](const CallState& context)
          {
              auto [a, b] = GetArgs<double, double>(context);
              return context.Collector.FromValue(std::fmin(a, b));
          });

      math.AddMethod(L"Max", TYPE_DOUBLE, LINK_STATIC, ACS_PUBLIC)
          .AddParameter(L"a", TYPE_DOUBLE)
          .AddParameter(L"b", TYPE_DOUBLE)
          .SetCallback([](const CallState& context)
          {
              auto [a, b] = GetArgs<double, double>(context);
              return context.Collector.FromValue(std::fmax(a, b));
          });
  });
}`,language:"cpp",filename:"math.shard.cpp"}),`
`,e.jsx(r,{children:e.jsxs(a.p,{children:[e.jsx("strong",{children:"Build it as a standalone shared library."}),` The file can be compiled outside the framework tree
with a normal CMake shared-library target.`]})}),`
`,e.jsx(d,{code:`cmake_minimum_required(VERSION 3.20)
project(shard.math CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Path to the ShardScript checkout or installation prefix.
set(SHARDSCRIPT_ROOT "\${CMAKE_CURRENT_SOURCE_DIR}/../ShardScript"
  CACHE PATH "Root of the ShardScript repository or install prefix")

find_library(SHARDSCRIPT_LIB
  NAMES ShardScript libShardScript
  PATHS "\${SHARDSCRIPT_ROOT}/build/bin" "\${SHARDSCRIPT_ROOT}/lib"
  NO_DEFAULT_PATH
  REQUIRED
)

add_library(math SHARED math.shard.cpp)

set_target_properties(math PROPERTIES
  WINDOWS_EXPORT_ALL_SYMBOLS ON
)

target_include_directories(math PRIVATE "\${SHARDSCRIPT_ROOT}/ShardScript/include")
target_link_libraries(math PRIVATE \${SHARDSCRIPT_LIB})`,language:"cmake",filename:"CMakeLists.txt"}),`
`,e.jsx(d,{code:`cmake -S . -B build -G Ninja -DCMAKE_BUILD_TYPE=Release
cmake --build build --parallel`,language:"bash"}),`
`,e.jsx(r,{children:e.jsxs(a.p,{children:[e.jsx("strong",{children:"ShardScript usage."})," Import the ",e.jsx(t,{children:"math"}),` namespace and call
`,e.jsx(t,{children:"Math"})," members through the type name."]})}),`
`,e.jsx(d,{code:`using stdio;
using math;

namespace demo;

public static func Main() -> void
{
  radius: double = 5.0;
  area: double = Math.PI * Math.Pow(radius, 2.0);
  println("Area: " + area);

  hypotenuse: double = Math.Sqrt(Math.Pow(3.0, 2.0) + Math.Pow(4.0, 2.0));
  println("Hypotenuse: " + hypotenuse);

  smaller: double = Math.Min(10.0, 3.0);
  println("Min: " + smaller);
}`,language:"csharp",filename:"app.shard"}),`
`,e.jsx(r,{children:e.jsx(a.p,{children:"Run the program and load the shared library by path."})}),`
`,e.jsx(d,{code:`# Windows
shard app.shard -l build/math.dll

# Linux
shard app.shard -l build/libmath.so

# macOS
shard app.shard -l build/libmath.dylib`,language:"bash"}),`
`,e.jsx(o,{tone:"green",title:"Expected output",children:e.jsx(a.p,{children:`The program prints the calculated area, hypotenuse, and minimum value. Because the library is stateless, the
order of calls does not matter and repeated calls produce the same result for the same inputs.`})}),`
`,e.jsx(l,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(n,{children:e.jsxs(a.p,{children:[e.jsx(t,{children:"library-building/your-first-shard-cpp-library"})," — tutorial for building a first native library."]})}),e.jsx(n,{children:e.jsxs(a.p,{children:[e.jsx(t,{children:"library-building/native-callback-helpers"})," — helper functions for common argument and return patterns."]})}),e.jsx(n,{children:e.jsxs(a.p,{children:[e.jsx(t,{children:"library-building/design-best-practices"})," — design guidelines for native libraries."]})})]}),`
`,e.jsx(l,{children:"Source"}),`
`,e.jsx(r,{children:e.jsxs(a.p,{children:["The example implementation lives in ",e.jsx(t,{children:"ShardScript.Framework/system/math.shard.cpp"}),`.
View the source on GitHub: `,e.jsx(t,{children:"https://github.com/Rikitav/ShardScript/blob/main/ShardScript.Framework/system/math.shard.cpp"}),"."]})})]})}function x(s={}){const{wrapper:a}=s.components||{};return a?e.jsx(a,{...s,children:e.jsx(h,{...s})}):h(s)}function i(s,a){throw new Error("Expected component `"+s+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
