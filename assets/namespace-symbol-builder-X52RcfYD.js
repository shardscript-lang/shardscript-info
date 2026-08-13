import{j as e}from"./index-DLc5xCYN.js";function o(a){const t={p:"p",...a.components},{Bullet:r,Callout:h,CodeBlock:l,DocsTable:d,H2:i,InlineCode:n,Prose:s}=t;return r||c("Bullet"),h||c("Callout"),l||c("CodeBlock"),d||c("DocsTable"),i||c("H2"),n||c("InlineCode"),s||c("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(i,{children:"Summary"}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:["The ",e.jsx(n,{children:"SymbolBuilder<NamespaceSymbol>"}),` specialization registers a ShardScript namespace
inside `,e.jsx(n,{children:"SHARDLIB_ENTRYPOINT"}),`. It creates the namespace itself, adds nested namespaces, and
attaches namespace-level methods. The builder is the starting point for most native libraries because every class,
struct, interface, and enum must live inside a namespace.`]})}),`
`,e.jsx(i,{children:"Syntax"}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:["Construct the builder from a ",e.jsx(n,{children:"shard::CompilationContext&"}),` and a wide-character namespace
name. The resulting object is used immediately; it is not stored for later.`]})}),`
`,e.jsx(l,{code:'SymbolBuilder<NamespaceSymbol> ns(context, L"mynamespace");',language:"cpp"}),`
`,e.jsx(d,{headers:["Method","Parameters","Returns","Description"],rows:[[e.jsx(n,{children:"AddClass"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:'L"Name"'}),", accessibility, linking, initializer lambda"]}),e.jsx(n,{children:"ClassSymbol*"}),"Registers a class inside the namespace and returns a builder for it. Only AddClass supports an initializer lambda overload."],[e.jsx(n,{children:"AddStruct"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:'L"Name"'}),", accessibility, linking, initializer lambda"]}),e.jsx(n,{children:"StructSymbol*"}),"Registers a struct inside the namespace and returns a builder for it."],[e.jsx(n,{children:"AddInterface"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:'L"Name"'}),", accessibility, initializer lambda"]}),e.jsx(n,{children:"InterfaceSymbol*"}),"Registers an interface inside the namespace and returns a builder for it."],[e.jsx(n,{children:"AddEnum"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:'L"Name"'}),", initializer lambda"]}),e.jsx(n,{children:"EnumSymbol*"}),"Registers an enum inside the namespace and returns a builder for it."],[e.jsx(n,{children:"AddNamespace"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:'L"inner"'}),", initializer lambda"]}),e.jsx(n,{children:"NamespaceSymbol*"}),"Registers a child namespace."],[e.jsx(n,{children:"AddMethod"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:'L"Name"'}),", return type, linking, accessibility"]}),e.jsx(n,{children:"MethodSymbolBuilder"}),"Registers a namespace-level method."]]}),`
`,e.jsx(i,{children:"Parameters / Arguments"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Constructor arguments"})}),`
`,e.jsx(d,{headers:["Parameter","Type","Description"],rows:[[e.jsx(n,{children:"context"}),e.jsx(n,{children:"shard::CompilationContext&"}),"The registration context passed to SHARDLIB_ENTRYPOINT."],[e.jsx(n,{children:"name"}),e.jsx(n,{children:"const wchar_t*"}),'The namespace name as a wide string literal, for example L"mynamespace".']]}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Common registration arguments"})}),`
`,e.jsx(d,{headers:["Parameter","Type","Description"],rows:[[e.jsx(n,{children:"accessibility"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"ACS_PUBLIC"}),", ",e.jsx(n,{children:"ACS_PRIVATE"})]}),"Visibility of the registered symbol to ShardScript callers."],[e.jsx(n,{children:"linking"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"LINK_STATIC"}),", ",e.jsx(n,{children:"LINK_INSTANCE"})]}),"Whether the member belongs to the type itself or to an instance."],[e.jsx(n,{children:"return type"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"TYPE_VOID"}),", ",e.jsx(n,{children:"TYPE_INT"}),", ",e.jsx(n,{children:"TYPE_DOUBLE"}),", ",e.jsx(n,{children:"TYPE_STRING"}),", ",e.jsx(n,{children:"TYPE_BOOL"}),", ..."]}),"The ShardScript return type of a method or property."],[e.jsx(n,{children:"initializer lambda"}),e.jsx(e.Fragment,{children:e.jsx(n,{children:"std::function<void(SymbolBuilder<T>)>"})}),"A callback that receives a nested builder for the new symbol."]]}),`
`,e.jsx(i,{children:"Returns"}),`
`,e.jsx(s,{children:e.jsx(t.p,{children:`The constructor does not return a value. The methods return pointers or builder objects that let you continue
registration:`})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"AddClass"}),", ",e.jsx(n,{children:"AddStruct"}),","," ",`
`,e.jsx(n,{children:"AddInterface"}),", ",e.jsx(n,{children:"AddEnum"}),", and"," ",`
`,e.jsx(n,{children:"AddNamespace"})," return a pointer to the newly created symbol."]})}),e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"AddMethod"})," returns a method builder that supports"," ",`
`,e.jsx(n,{children:".AddParameter(...)"})," and ",e.jsx(n,{children:".SetCallback(...)"}),"."]})})]}),`
`,e.jsx(i,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Duplicate namespace name"}),` — Registering a namespace whose name
already exists in the same compilation context may produce a semantic registration error or overwrite behavior
depending on the runtime version. Use a unique name for each library.`]})}),e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Invalid accessibility"}),` — Passing an accessibility value other than
the `,e.jsx(n,{children:"ACS_*"})," constants is a compile-time error in C++."]})}),e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Missing callback"})," — A namespace-level method created with"," ",`
`,e.jsx(n,{children:"AddMethod"})," that never calls ",e.jsx(n,{children:".SetCallback(...)"}),` resolves in
ShardScript but does nothing when invoked.`]})}),e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"C++ exception during registration"}),` — Throwing from inside the
initializer lambda or from `,e.jsx(n,{children:"SHARDLIB_ENTRYPOINT"})," aborts library load."]})})]}),`
`,e.jsx(i,{children:"Remarks"}),`
`,e.jsx(h,{tone:"blue",title:"Native library shape",children:e.jsxs(t.p,{children:["A ShardScript native library is any shared library (",e.jsx(n,{children:".dll"})," on Windows, ",e.jsx(n,{children:".so"})," on Linux, ",e.jsx(n,{children:".dylib"})," on macOS) that exports the two C-linkage symbols ",e.jsx(n,{children:"ShardLib_GetMetadata"})," and ",e.jsx(n,{children:"ShardLib_EntryPoint"}),". It can be built from one or many C++ source files, live inside ",e.jsx(n,{children:"ShardScript.Framework"})," or in a completely separate project, and links against the ShardScript runtime shared library using headers from ",e.jsx(n,{children:"ShardScript/include"}),". For the full registration contract, see ",e.jsx(n,{children:"native-library-overview.mdx"}),"."]})}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Every symbol lives in a namespace."}),` Even a library that exposes only one utility method should
create a namespace first. The namespace name becomes the top-level import name in ShardScript source code.`]})}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Namespaces can be nested."})," Call ",e.jsx(n,{children:"AddNamespace"}),` on an existing namespace
builder. Inside the lambda, the inner builder has the same API and can itself contain more namespaces, types, and
methods. The full name is formed by concatenating parent and child names with a dot.`]})}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Namespace-level methods are static."}),` They are called through the namespace name, not through an
instance, so they are registered with `,e.jsx(n,{children:"LINK_STATIC"}),". The first real argument is at index"," ",`
`,e.jsx(n,{children:"0"})," inside the callback."]})}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Registration order matters."}),` A namespace must be created before any type or method that belongs to
it is added. Types and methods cannot be moved between namespaces after registration.`]})}),`
`,e.jsx(h,{tone:"blue",children:e.jsx(t.p,{children:`Keep namespace names stable. Changing the namespace name in the C++ registration breaks every ShardScript import
statement that references the old name.`})}),`
`,e.jsx(i,{children:"Examples"}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Single namespace with a namespace-level method."}),` This is the smallest useful library surface:
one namespace and one static method.`]})}),`
`,e.jsx(l,{code:`#include <ShardScript.hpp>

using namespace shard;

static ObjectInstance* compute_area(const CallState& context)
{
  // A static namespace method: the first real argument is at index 0.
  std::int64_t width = context.Args[0]->AsInteger();
  std::int64_t height = context.Args[1]->AsInteger();
  std::int64_t area = width * height;

  return context.Collector.FromValue(area);
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> geometry(context, L"geometry");

  geometry.AddMethod(L"RectangleArea", TYPE_INT, LINK_STATIC, ACS_PUBLIC)
          .AddParameter(L"width", TYPE_INT)
          .AddParameter(L"height", TYPE_INT)
          .SetCallback(&compute_area);
}`,language:"cpp",filename:"geometry.shard.cpp"}),`
`,e.jsx(s,{children:"ShardScript usage:"}),`
`,e.jsx(l,{code:`using stdio;
using geometry;

namespace demo;

public static func Main() -> void
{
  area: int = geometry.RectangleArea(10, 20);
  println(area);   // 200
}`,language:"csharp"}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Nested namespaces."}),` The outer builder creates an inner namespace, and the inner builder registers
a type. The full name in ShardScript is `,e.jsx(n,{children:"graphics.shapes.Rectangle"}),"."]})}),`
`,e.jsx(l,{code:`#include <ShardScript.hpp>

using namespace shard;

static FieldSymbol* g_Rectangle_Width = nullptr;
static FieldSymbol* g_Rectangle_Height = nullptr;

static ObjectInstance* rectangle_area(const CallState& context)
{
  // Instance method: this is Args[0], width and height follow.
  ObjectInstance* self = context.Args[0];
  std::int64_t width = self->GetField(g_Rectangle_Width)->AsInteger();
  std::int64_t height = self->GetField(g_Rectangle_Height)->AsInteger();

  return context.Collector.FromValue(width * height);
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> graphics(context, L"graphics");

  graphics.AddNamespace(L"shapes", [](SymbolBuilder<NamespaceSymbol> shapes)
  {
      shapes.AddClass(L"Rectangle", ACS_PUBLIC, LINK_INSTANCE, [](SymbolBuilder<ClassSymbol> rectangle)
      {
          g_Rectangle_Width = rectangle.AddField(L"Width", TYPE_INT, LINK_INSTANCE, ACS_PUBLIC);
          g_Rectangle_Height = rectangle.AddField(L"Height", TYPE_INT, LINK_INSTANCE, ACS_PUBLIC);

          rectangle.AddMethod(L"Area", TYPE_INT, LINK_INSTANCE, ACS_PUBLIC)
                   .SetCallback(&rectangle_area);
      });
  });
}`,language:"cpp",filename:"graphics.shard.cpp"}),`
`,e.jsx(s,{children:"ShardScript usage:"}),`
`,e.jsx(l,{code:`using stdio;
using graphics.shapes;

namespace demo;

public static func Main() -> void
{
  r: Rectangle = new Rectangle();
  r.Width = 10;
  r.Height = 20;

  area: int = r.Area();
  println(area);   // 200
}`,language:"csharp"}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Namespace with multiple nested utilities."}),` A library can expose several namespaces from a single
entry point, each containing its own methods and types.`]})}),`
`,e.jsx(l,{code:`#include <ShardScript.hpp>

using namespace shard;

static ObjectInstance* convert_to_fahrenheit(const CallState& context)
{
  std::int64_t celsius = context.Args[0]->AsInteger();
  std::int64_t fahrenheit = (celsius * 9 / 5) + 32;

  return context.Collector.FromValue(fahrenheit);
}

static ObjectInstance* meters_to_centimeters(const CallState& context)
{
  std::int64_t meters = context.Args[0]->AsInteger();
  std::int64_t centimeters = meters * 100;

  return context.Collector.FromValue(centimeters);
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> converters(context, L"converters");

  converters.AddNamespace(L"temperature", [](SymbolBuilder<NamespaceSymbol> temperature)
  {
      temperature.AddMethod(L"CelsiusToFahrenheit", TYPE_INT, LINK_STATIC, ACS_PUBLIC)
                 .AddParameter(L"celsius", TYPE_INT)
                 .SetCallback(&convert_to_fahrenheit);
  });

  converters.AddNamespace(L"length", [](SymbolBuilder<NamespaceSymbol> length)
  {
      length.AddMethod(L"MetersToCentimeters", TYPE_INT, LINK_STATIC, ACS_PUBLIC)
            .AddParameter(L"meters", TYPE_INT)
            .SetCallback(&meters_to_centimeters);
  });
}`,language:"cpp",filename:"converters.shard.cpp"}),`
`,e.jsx(s,{children:"ShardScript usage:"}),`
`,e.jsx(l,{code:`using stdio;
using converters.temperature;
using converters.length;

namespace demo;

public static func Main() -> void
{
  temp: int = temperature.CelsiusToFahrenheit(100);
  len: int = length.MetersToCentimeters(3);

  println(temp);   // 212
  println(len);    // 300
}`,language:"csharp"}),`
`,e.jsx(i,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"library-building/class-symbol-builder"})," — registering classes inside a namespace."]})}),e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"library-building/shardlib-entrypoint"})," — the library entry point."]})}),e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"library-building/library-build-setup"})," — CMake build setup."]})})]}),`
`,e.jsx(i,{children:"Source"}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:["The native side of this API is implemented in ",e.jsx(n,{children:"shard/semantic/SymbolBuilder.hpp"}),`.
View the source on GitHub: `,e.jsx(n,{children:"https://github.com/Rikitav/ShardScript/blob/main/ShardScript/include/shard/semantic/SymbolBuilder.hpp"}),"."]})})]})}function p(a={}){const{wrapper:t}=a.components||{};return t?e.jsx(t,{...a,children:e.jsx(o,{...a})}):o(a)}function c(a,t){throw new Error("Expected component `"+a+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
