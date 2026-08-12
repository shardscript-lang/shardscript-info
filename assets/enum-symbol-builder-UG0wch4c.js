import{j as e}from"./index-BJYykHK7.js";function h(r){const s={p:"p",...r.components},{Bullet:l,Callout:c,CodeBlock:d,DocsTable:o,H2:i,InlineCode:n,Prose:t}=s;return l||a("Bullet"),c||a("Callout"),d||a("CodeBlock"),o||a("DocsTable"),i||a("H2"),n||a("InlineCode"),t||a("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(i,{children:"Summary"}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:["The ",e.jsx(n,{children:"SymbolBuilder<EnumSymbol>"}),` API registers enum types into the ShardScript
semantic model from a native C++ library. It supports both plain enums and flag enums through
`,e.jsx(n,{children:"AddEnum"}),", ",e.jsx(n,{children:"AddValue"}),", and ",e.jsx(n,{children:"SetFlags"}),"."]})}),`
`,e.jsx(i,{children:"Syntax"}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:["Enums are created from a ",e.jsx(n,{children:"SymbolBuilder<NamespaceSymbol>"}),`. The returned enum
builder exposes two chainable registration methods.`]})}),`
`,e.jsx(d,{code:`SymbolBuilder<EnumSymbol> SymbolBuilder<NamespaceSymbol>::AddEnum(
  const std::wstring& name,
  bool isFlags = false,
  SymbolAccesibility access = SymbolAccesibility::Public);

SymbolBuilder<EnumSymbol>& SymbolBuilder<EnumSymbol>::SetFlags(bool value = true);

SymbolBuilder<EnumSymbol>& SymbolBuilder<EnumSymbol>::AddValue(
  const std::wstring& name,
  std::int64_t value);`,language:"cpp"}),`
`,e.jsx(i,{children:"Parameters / Arguments"}),`
`,e.jsx(o,{headers:["Parameter","Type","Description"],rows:[[e.jsx(n,{children:"name"}),e.jsx(n,{children:"std::wstring"}),"The ShardScript identifier for the enum. It is resolved under the containing namespace, so the full name becomes Namespace.Name."],[e.jsx(n,{children:"isFlags"}),e.jsx(n,{children:"bool"}),"When true, the enum is treated as a flags enum. This enables bitwise operators and the HasFlag instance method. Defaults to false."],[e.jsx(n,{children:"access"}),e.jsx(n,{children:"SymbolAccesibility"}),"Visibility of the enum type. Use ACS_PUBLIC for public APIs. Defaults to SymbolAccesibility::Public."],[e.jsx(n,{children:"AddValue name"}),e.jsx(n,{children:"std::wstring"}),"The identifier of the enum value. It is declared as a member of the enum and accessed as EnumName.Value."],[e.jsx(n,{children:"AddValue value"}),e.jsx(n,{children:"std::int64_t"}),"The underlying integer value stored for the member. Use explicit values for flags enums to avoid accidental collisions."]]}),`
`,e.jsx(i,{children:"Returns"}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx(n,{children:"AddEnum"})," returns a ",e.jsx(n,{children:"SymbolBuilder<EnumSymbol>"}),` by value
that owns the newly created `,e.jsx(n,{children:"EnumSymbol"}),". ",e.jsx(n,{children:"SetFlags"}),` and
`,e.jsx(n,{children:"AddValue"}),` return a reference to the same builder so calls can be chained. The
builder also converts implicitly to `,e.jsx(n,{children:"EnumSymbol*"}),`, which is useful when passing the
enum as a parameter type to methods.`]})}),`
`,e.jsx(i,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(l,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Duplicate member name"})," — Calling"," ",`
`,e.jsx(n,{children:"AddValue"}),` with a name that already exists on the enum produces a semantic
duplicate-declaration error.`]})}),e.jsx(l,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Conflicting flag values"}),` — For flags enums, values that
overlap unintentionally cause surprising `,e.jsx(n,{children:"HasFlag"}),` results. Each flag should be a
distinct power of two, and the zero value should represent the empty combination.`]})}),e.jsx(l,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Name collision in the namespace"}),` — The enum name must not
conflict with another type or namespace member already declared in the same scope.`]})}),e.jsx(l,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Accessibility mismatch"})," — An enum registered with"," ",`
`,e.jsx(n,{children:"ACS_PRIVATE"}),` cannot be referenced from
ShardScript code outside its visibility boundary, even though the native registration succeeds.`]})})]}),`
`,e.jsx(i,{children:"Remarks"}),`
`,e.jsx(c,{tone:"blue",title:"Native library shape",children:e.jsxs(s.p,{children:["A ShardScript native library is any shared library (",e.jsx(n,{children:".dll"})," on Windows, ",e.jsx(n,{children:".so"})," on Linux, ",e.jsx(n,{children:".dylib"})," on macOS) that exports the two C-linkage symbols ",e.jsx(n,{children:"ShardLib_GetMetadata"})," and ",e.jsx(n,{children:"ShardLib_EntryPoint"}),". It can be built from one or many C++ source files, live inside ",e.jsx(n,{children:"ShardScript.Framework"})," or in a completely separate project, and links against the ShardScript runtime shared library using headers from ",e.jsx(n,{children:"ShardScript/include"}),". For the full registration contract, see ",e.jsx(n,{children:"native-library-overview.mdx"}),"."]})}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Storage and representation."})," An ",e.jsx(n,{children:"EnumSymbol"}),` is a value type backed
by a single `,e.jsx(n,{children:"std::int64_t"}),`. Its memory layout is fixed, so it is passed and returned
by value just like other primitive value types. In a native callback you read an enum argument with`," ",`
`,e.jsx(n,{children:"AsInteger()"})," and return an enum value with"," ",`
`,e.jsx(n,{children:"context.Collector.FromValue(value)"}),"."]})}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Flag semantics."})," Setting ",e.jsx(n,{children:"IsFlags"}),` to true only changes how the
runtime presents the enum. The ShardScript compiler and runtime inject bitwise`," ",`
`,e.jsx(n,{children:"|"}),", ",e.jsx(n,{children:"&"}),", equality, and"," ",`
`,e.jsx(n,{children:"HasFlag"}),` helpers for every enum, but flag enums are expected to use power-of-two
values so combinations compose correctly. Always include a `,e.jsx(n,{children:"None"})," or"," ",`
`,e.jsx(n,{children:"Zero"})," member with value ",e.jsx(n,{children:"0"})," for the empty combination."]})}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Member generation."})," Each ",e.jsx(n,{children:"AddValue"})," call creates a"," ",`
`,e.jsx(n,{children:"FieldSymbol"}),` attached to the enum. You do not need to register operators or methods
yourself; the runtime binds `,e.jsx(n,{children:"ToString"})," through ",e.jsx(n,{children:"IPrintable"}),`,
equality, bitwise operators, and `,e.jsx(n,{children:"HasFlag"})," automatically when the enum is finalized."]})}),`
`,e.jsx(c,{tone:"blue",children:e.jsxs(s.p,{children:[`Keep flags values as explicit powers of two. Do not rely on auto-increment for flag enums; sequential
values such as `,e.jsx(n,{children:"1"}),", ",e.jsx(n,{children:"2"}),", ",e.jsx(n,{children:"3"})," make"," ",`
`,e.jsx(n,{children:"HasFlag"})," return true for combinations that were never intended."]})}),`
`,e.jsx(i,{children:"Examples"}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Register a plain enum and a flags enum."})," This native library defines a"," ",`
`,e.jsx(n,{children:"net"})," namespace containing a status-code enum and a file-access flags enum."]})}),`
`,e.jsx(d,{code:`#include <ShardScript.hpp>

using namespace shard;

SHARDLIB_GETMETADATA
{
  lib.Name        = L"shard.net";
  lib.Description = L"Network and file-access enums";
  lib.Version     = L"1.0.0";
}

static ObjectInstance* open_file(const CallState& context)
{
  std::int64_t flagsValue = context.Args[0]->AsInteger();

  // Reject unknown flag bits for this example.
  std::int64_t knownBits = 1 | 2 | 4 | 8;
  if ((flagsValue & ~knownBits) != 0)
  {
      throw std::runtime_error("Unknown file flag bits");
  }

  // The real implementation would map the flags to OS open() flags here.
  return context.Collector.FromValue(0);
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> net(context, L"net");

  SymbolBuilder<EnumSymbol> httpStatus = net.AddEnum(L"HttpStatus", false, ACS_PUBLIC);
  httpStatus
      .AddValue(L"Continue", 100)
      .AddValue(L"Ok", 200)
      .AddValue(L"NotFound", 404)
      .AddValue(L"ServerError", 500);

  SymbolBuilder<EnumSymbol> fileFlags = net.AddEnum(L"FileFlags", true, ACS_PUBLIC);
  fileFlags
      .SetFlags(true)
      .AddValue(L"None", 0)
      .AddValue(L"Read", 1)
      .AddValue(L"Write", 2)
      .AddValue(L"Execute", 4)
      .AddValue(L"Shared", 8);

  net.AddMethod(L"Open", TYPE_INT, LINK_STATIC, ACS_PUBLIC)
      .AddParameter(L"flags", fileFlags.Get())
      .SetCallback(&open_file);
}`,language:"cpp",filename:"net.shard.cpp"}),`
`,e.jsx(t,{children:e.jsx(s.p,{children:"ShardScript usage:"})}),`
`,e.jsx(d,{code:`using stdio;
using net;

namespace demo;

public static func Main() -> void
{
  status: HttpStatus = HttpStatus.Ok;
  println(status);

  flags: FileFlags = FileFlags.Read | FileFlags.Write;

  if (flags.HasFlag(FileFlags.Read))
  {
      println("read requested");
  }

  if (flags.HasFlag(FileFlags.Execute))
  {
      println("execute requested");
  }

  handle: int = net.Open(flags);
  println(handle);
}`,language:"csharp",filename:"app.shard"}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Reading an enum argument in a callback."}),` The enum is stored as an integer, so the callback
can inspect it directly before forwarding to native code.`]})}),`
`,e.jsx(d,{code:`static ObjectInstance* describe_status(const CallState& context)
{
  std::int64_t status = context.Args[0]->AsInteger();

  if (status == 200)
  {
      return context.Collector.FromValue(L"OK");
  }

  if (status == 404)
  {
      return context.Collector.FromValue(L"Not Found");
  }

  return context.Collector.FromValue(L"Other");
}`,language:"cpp"}),`
`,e.jsx(i,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(l,{children:e.jsxs(s.p,{children:[e.jsx(n,{children:"library-building/class-symbol-builder"})," — registering classes that consume enums."]})}),e.jsx(l,{children:e.jsxs(s.p,{children:[e.jsx(n,{children:"library-building/reading-arguments"})," — reading enum values as integers in callbacks."]})}),e.jsx(l,{children:e.jsxs(s.p,{children:[e.jsx(n,{children:"library-building/headers-quick-reference"})," — header locations."]})})]}),`
`,e.jsx(i,{children:"Source"}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:["The native side of this API is implemented in ",e.jsx(n,{children:"shard/semantic/SymbolBuilder.hpp"}),`.
View the source on GitHub: `,e.jsx(n,{children:"https://github.com/Rikitav/ShardScript/blob/main/ShardScript/include/shard/semantic/SymbolBuilder.hpp"}),"."]})})]})}function m(r={}){const{wrapper:s}=r.components||{};return s?e.jsx(s,{...r,children:e.jsx(h,{...r})}):h(r)}function a(r,s){throw new Error("Expected component `"+r+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default};
