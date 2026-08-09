import{j as e}from"./index-DIkNH1R5.js";function h(l){const r={p:"p",...l.components},{Bullet:s,Callout:c,CodeBlock:d,DocsTable:o,H2:i,InlineCode:n,Prose:t}=r;return s||a("Bullet"),c||a("Callout"),d||a("CodeBlock"),o||a("DocsTable"),i||a("H2"),n||a("InlineCode"),t||a("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(i,{children:"Summary"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"GetArgs<T...>"})," is a variadic template helper declared in"," ",`
`,e.jsx(n,{children:"<shard/runtime/NativeHelpers.hpp>"}),` that unpacks the borrowed
arguments in a `,e.jsx(n,{children:"CallState"})," into a typed"," ",`
`,e.jsx(n,{children:"std::tuple<T...>"}),`. It checks the argument count, guards against
null pointers, and dispatches each element to the correct `,e.jsx(n,{children:"ObjectInstance"})," ",`
reader for the requested C++ type.`]})}),`
`,e.jsx(i,{children:"Syntax"}),`
`,e.jsx(d,{code:`#include <shard/runtime/NativeHelpers.hpp>

std::tuple<TArgs...> shard::GetArgs<TArgs...>(const shard::CallState& context);`,language:"cpp",filename:"NativeHelpers.hpp"}),`
`,e.jsx(i,{children:"Parameters / Arguments"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:["The ",e.jsx(n,{children:"context"}),` argument is the callback state passed to every native method.
The template parameters `,e.jsx(n,{children:"TArgs..."}),` must be a supported type combination and
must appear in the same order as the registered parameters.`]})}),`
`,e.jsx(o,{headers:["Template parameter","C++ type","ShardScript type","How it is read"],rows:[[e.jsx(n,{children:"bool"}),e.jsx(n,{children:"bool"}),e.jsx(n,{children:"bool"}),e.jsx(n,{children:"AsBoolean()"})],[e.jsx(n,{children:"std::int64_t"}),e.jsx(n,{children:"std::int64_t"}),e.jsx(n,{children:"int"}),e.jsx(n,{children:"AsInteger()"})],[e.jsx(n,{children:"double"}),e.jsx(n,{children:"double"}),e.jsx(n,{children:"double"}),e.jsx(n,{children:"AsDouble()"})],[e.jsx(n,{children:"wchar_t"}),e.jsx(n,{children:"wchar_t"}),e.jsx(n,{children:"char"}),e.jsx(n,{children:"AsCharacter()"})],[e.jsx(n,{children:"std::uint8_t"}),e.jsx(n,{children:"std::uint8_t"}),e.jsx(n,{children:"byte"}),e.jsx(n,{children:"AsByte()"})],[e.jsx(n,{children:"const wchar_t*"}),e.jsx(n,{children:"const wchar_t*"}),e.jsx(n,{children:"string"}),e.jsx(n,{children:"AsString()"})],[e.jsx(n,{children:"std::wstring"}),e.jsx(n,{children:"std::wstring"}),e.jsx(n,{children:"string"}),["Copies ",e.jsx(n,{children:"AsString()"})," into a new ",e.jsx(n,{children:"std::wstring"})]],[e.jsx(n,{children:"ObjectInstance*"}),e.jsx(n,{children:"shard::ObjectInstance*"}),"any reference type","Returns the argument pointer as-is"],[e.jsx(n,{children:"T*"}),"any native pointer type",e.jsx(n,{children:"nint"}),["Casts ",e.jsx(n,{children:"AsNint()"})," to ",e.jsx(n,{children:"T*"})]]]}),`
`,e.jsx(i,{children:"Returns"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:["Returns a ",e.jsx(n,{children:"std::tuple<TArgs...>"}),` whose elements are in the same order
as `,e.jsx(n,{children:"context.Args"})," and the template arguments. Extract the values with"," ",`
`,e.jsx(n,{children:"std::tie"})," or ",e.jsx(n,{children:"std::get"}),`. The returned values are
borrowed from the caller; they are not owned by the helper.`]})}),`
`,e.jsx(i,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(r.p,{children:["Throws ",e.jsx(n,{children:"std::runtime_error"}),` when the number of template arguments does not
match `,e.jsx(n,{children:"context.Args.size()"}),"."]})}),e.jsx(s,{children:e.jsxs(r.p,{children:["Throws ",e.jsx(n,{children:"std::runtime_error"})," when an argument index is out of range."]})}),e.jsx(s,{children:e.jsxs(r.p,{children:["Throws ",e.jsx(n,{children:"std::runtime_error"})," when an argument pointer is"," ",`
`,e.jsx(n,{children:"nullptr"}),"."]})}),e.jsx(s,{children:e.jsxs(r.p,{children:["Throws ",e.jsx(n,{children:"std::runtime_error"})," when a value-type argument resolves to"," ",`
`,e.jsx(n,{children:"GarbageCollector::NullInstance"}),". Only"," ",`
`,e.jsx(n,{children:"ObjectInstance*"})," and native pointer types allow null."]})})]}),`
`,e.jsx(i,{children:"Remarks"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"GetArgs"})," is a convenience wrapper around the manual readers on"," ",`
`,e.jsx(n,{children:"ObjectInstance"}),`. It does not change ownership: arguments remain borrowed from
the caller, and the returned tuple contains raw pointers or primitive copies.`]})}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:["Use ",e.jsx(n,{children:"GetArgs"}),` for simple static callbacks whose parameters are all primitive
values in registration order. For instance methods, do not use it for the real parameters, because`," ",`
`,e.jsx(n,{children:"context.Args[0]"})," is ",e.jsx(n,{children:"this"}),`. The template types would
shift by one position and read the wrong objects.`]})}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:["Do not use ",e.jsx(n,{children:"GetArgs"}),` for reference-typed arguments that may be null and need
special handling. A `,e.jsx(n,{children:"const wchar_t*"})," or ",e.jsx(n,{children:"std::wstring"})," ",`
argument throws if the script passes `,e.jsx(n,{children:"null"}),`. Read such arguments manually so
you can return a safe default or a meaningful error.`]})}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:["The ",e.jsx(n,{children:"std::wstring"}),` overload copies the string payload, so the copy is safe to
keep after the callback returns. The `,e.jsx(n,{children:"const wchar_t*"}),` overload returns a view
into GC-managed memory; do not store that pointer past the next allocation or collection point.`]})}),`
`,e.jsx(c,{tone:"blue",title:"Native library shape",children:e.jsxs(r.p,{children:["A ShardScript native library is any shared library (",e.jsx(n,{children:".dll"})," on Windows, ",e.jsx(n,{children:".so"})," on Linux, ",e.jsx(n,{children:".dylib"})," on macOS) that exports the two C-linkage symbols ",e.jsx(n,{children:"ShardLib_GetMetadata"})," and ",e.jsx(n,{children:"ShardLib_EntryPoint"}),". It can be built from one or many C++ source files, live inside ",e.jsx(n,{children:"ShardScript.Framework"})," or in a completely separate project, and links against the ShardScript runtime shared library using headers from ",e.jsx(n,{children:"ShardScript/include"}),". For the full registration contract, see ",e.jsx(n,{children:"native-library-overview.mdx"}),"."]})}),`
`,e.jsx(c,{tone:"blue",children:e.jsxs(r.p,{children:["Native pointer extraction casts ",e.jsx(n,{children:"AsNint()"}),` to the requested type. The
ShardScript side must actually pass a `,e.jsx(n,{children:"nint"}),` value; the helper does not
validate that the pointer belongs to the expected C++ type.`]})}),`
`,e.jsx(i,{children:"Examples"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:["Read two ",e.jsx(n,{children:"double"})," arguments for a static method."]})}),`
`,e.jsx(d,{code:`#include <ShardScript.hpp>
#include <shard/runtime/NativeHelpers.hpp>

#include <cmath>

using namespace shard;

static ObjectInstance* hypotenuse(const CallState& context)
{
  double a = 0.0;
  double b = 0.0;

  std::tie(a, b) = GetArgs<double, double>(context);

  double result = std::sqrt((a * a) + (b * b));
  return context.Collector.FromValue(result);
}

SHARDLIB_GETMETADATA
{
  lib.Name        = L"shard.mathdemo";
  lib.Description = L"GetArgs demonstration";
  lib.Version     = L"1.0.0";
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> ns(context, L"mathdemo");

  ns.AddClass(L"Math", ACS_PUBLIC, LINK_STATIC, [](SymbolBuilder<ClassSymbol> type)
  {
      type.AddMethod(L"Hypotenuse", TYPE_DOUBLE, LINK_STATIC, ACS_PUBLIC)
          .AddParameter(L"a", TYPE_DOUBLE)
          .AddParameter(L"b", TYPE_DOUBLE)
          .SetCallback(&hypotenuse);
  });
}`,language:"cpp",filename:"mathdemo.cpp"}),`
`,e.jsx(t,{children:e.jsx(r.p,{children:"Read mixed primitive types in the order they were registered."})}),`
`,e.jsx(d,{code:`static ObjectInstance* power(const CallState& context)
{
  double base = 0.0;
  std::int64_t exponent = 0;

  std::tie(base, exponent) = GetArgs<double, std::int64_t>(context);

  double result = std::pow(base, static_cast<double>(exponent));
  return context.Collector.FromValue(result);
}`,language:"cpp",filename:"mathdemo.cpp"}),`
`,e.jsx(t,{children:e.jsx(r.p,{children:"The following ShardScript program loads the library and calls the static methods."})}),`
`,e.jsx(d,{code:`using stdio;
using mathdemo;

namespace app;

public class Program
{
  public static func Main() -> void
  {
      double h = Math.Hypotenuse(3.0, 4.0);
      println("hypotenuse: " + h);

      double p = Math.Power(2.0, 8);
      println("power: " + p);
  }
}`,language:"csharp",filename:"app.shard"}),`
`,e.jsx(i,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"library-building/native-helpers-reference"})," — other helpers in"," ",`
`,e.jsx(n,{children:"<shard/runtime/NativeHelpers.hpp>"}),` for object construction, method calls,
fields, and properties.`]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"library-building/callback-contract-overview"})," — the native callback contract."]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"library-building/reading-arguments"})," — reading arguments."]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"library-building/returning-values"})," — returning values."]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"library-building/headers-quick-reference"})," — header locations."]})})]}),`
`,e.jsx(i,{children:"Source"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:["The native side of this API is implemented in ",e.jsx(n,{children:"shard/runtime/NativeHelpers.hpp"}),`.
View the source on GitHub: `,e.jsx(n,{children:"https://github.com/Rikitav/ShardScript/blob/main/ShardScript/include/shard/runtime/NativeHelpers.hpp"}),"."]})})]})}function x(l={}){const{wrapper:r}=l.components||{};return r?e.jsx(r,{...l,children:e.jsx(h,{...l})}):h(l)}function a(l,r){throw new Error("Expected component `"+l+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
