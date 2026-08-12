import{j as e}from"./index-hFDFiLgA.js";function h(a){const r={p:"p",...a.components},{Bullet:s,Callout:o,CodeBlock:i,DocsTable:d,H2:l,InlineCode:t,Prose:n}=r;return s||c("Bullet"),o||c("Callout"),i||c("CodeBlock"),d||c("DocsTable"),l||c("H2"),t||c("InlineCode"),n||c("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:e.jsxs(r.p,{children:["Every native callback receives its inputs through ",e.jsx(t,{children:"context.Args"}),", a"," ",`
`,e.jsx(t,{children:"std::span<ObjectInstance*>"}),`. For static members the first element is the first
real argument; for instance members the first element is `,e.jsx(t,{children:"this"}),`. This guide shows how
to extract primitive values, guard reference arguments against `,e.jsx(t,{children:"nullptr"}),`, and use the
convenience helper for simple parameter lists.`]})}),`
`,e.jsx(l,{children:"Prerequisites"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsx(r.p,{children:"A working C++20 toolchain and a way to build a shared library (CMake, MSBuild, or another build system)."})}),e.jsx(s,{children:e.jsxs(r.p,{children:["The ShardScript runtime headers, normally located in ",e.jsx(t,{children:"ShardScript/include"}),`, and the
ShardScript runtime shared library to link against.`]})}),e.jsx(s,{children:e.jsxs(r.p,{children:["Familiarity with ",e.jsx(t,{children:"SHARDLIB_GETMETADATA"}),","," ",`
`,e.jsx(t,{children:"SHARDLIB_ENTRYPOINT"}),", and the ",e.jsx(t,{children:"SymbolBuilder"})," registration API."]})})]}),`
`,e.jsx(l,{children:"Goal"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:["Read incoming ",e.jsx(t,{children:"ObjectInstance*"}),` arguments inside a native callback as strongly typed C++
values. Cover every primitive reader — `,e.jsx(t,{children:"AsInteger"}),", ",e.jsx(t,{children:"AsDouble"}),","," ",`
`,e.jsx(t,{children:"AsBoolean"}),", ",e.jsx(t,{children:"AsCharacter"}),", ",e.jsx(t,{children:"AsByte"}),","," ",`
`,e.jsx(t,{children:"AsString"}),", and ",e.jsx(t,{children:"AsNint"})," — plus null checks and the"," ",`
`,e.jsx(t,{children:"GetArgs<T...>"})," helper."]})}),`
`,e.jsx(l,{children:"Step-by-Step Instructions"}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"1. Remember the argument layout."})}),`
`,e.jsx(n,{children:e.jsx(r.p,{children:"A native callback has the same signature regardless of whether the method is static or instance:"})}),`
`,e.jsx(i,{code:"shard::ObjectInstance* Callback(const shard::CallState& context);",language:"cpp"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:["The ",e.jsx(t,{children:"context.Args"}),` span contains the arguments exactly as they were passed from
ShardScript. For static methods, `,e.jsx(t,{children:"Args[0]"}),` is the first real argument. For instance
methods, `,e.jsx(t,{children:"Args[0]"})," is ",e.jsx(t,{children:"this"})," and the real parameters start at"," ",`
`,e.jsx(t,{children:"Args[1]"}),"."]})}),`
`,e.jsx(o,{tone:"blue",children:e.jsxs(r.p,{children:["Register a method with ",e.jsx(t,{children:"LINK_STATIC"})," when it has no implicit"," ",`
`,e.jsx(t,{children:"this"}),", and with ",e.jsx(t,{children:"LINK_INSTANCE"}),` when it is called on an object.
A mismatch will shift every argument index and usually corrupt the value types you read.`]})}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"2. Read primitive arguments."})}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx(t,{children:"ObjectInstance"}),` provides typed readers for every ShardScript primitive. Use the
appropriate reader for the declared parameter type.`]})}),`
`,e.jsx(i,{code:`std::int64_t integerValue   = context.Args[0]->AsInteger();
double       doubleValue    = context.Args[0]->AsDouble();
bool         booleanValue   = context.Args[0]->AsBoolean();
wchar_t      characterValue = context.Args[0]->AsCharacter();
std::uint8_t byteValue      = context.Args[0]->AsByte();
const wchar_t* stringValue  = context.Args[0]->AsString();
void*        nativePointer  = context.Args[0]->AsNint();`,language:"cpp"}),`
`,e.jsx(d,{headers:["Reader","C++ return type","ShardScript type"],rows:[[e.jsx(t,{children:"AsInteger()"}),e.jsx(t,{children:"std::int64_t"}),e.jsx(t,{children:"int"})],[e.jsx(t,{children:"AsDouble()"}),e.jsx(t,{children:"double"}),e.jsx(t,{children:"double"})],[e.jsx(t,{children:"AsBoolean()"}),e.jsx(t,{children:"bool"}),e.jsx(t,{children:"bool"})],[e.jsx(t,{children:"AsCharacter()"}),e.jsx(t,{children:"wchar_t"}),e.jsx(t,{children:"char"})],[e.jsx(t,{children:"AsByte()"}),e.jsx(t,{children:"std::uint8_t"}),e.jsx(t,{children:"byte"})],[e.jsx(t,{children:"AsString()"}),e.jsx(t,{children:"const wchar_t*"}),e.jsx(t,{children:"string"})],[e.jsx(t,{children:"AsNint()"}),e.jsx(t,{children:"void*"}),e.jsx(t,{children:"nint"})]]}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"3. Guard reference arguments against null."})}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:["String, object, and array arguments can be ",e.jsx(t,{children:"nullptr"})," or the singleton"," ",`
`,e.jsx(t,{children:"GarbageCollector::NullInstance"}),`. Always test before dereferencing them. For strings,
return an empty managed string or throw a runtime error instead of crashing inside`," ",`
`,e.jsx(t,{children:"AsString()"}),"."]})}),`
`,e.jsx(i,{code:`ObjectInstance* arg = context.Args[0];

if (arg == nullptr || arg == GarbageCollector::NullInstance)
{
  // Return a safe default instead of dereferencing a null reference argument.
  return context.Collector.FromValue(std::wstring());
}

const wchar_t* text = arg->AsString();`,language:"cpp"}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"4. Read strings safely."})}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx(t,{children:"AsString()"})," returns a pointer into a GC-managed instance. Copy the contents into a"," ",`
`,e.jsx(t,{children:"std::wstring"}),` if you need to keep the text after the callback returns or pass it to
code that may trigger garbage collection.`]})}),`
`,e.jsx(i,{code:`ObjectInstance* arg = context.Args[0];

if (arg == nullptr || arg == GarbageCollector::NullInstance)
{
  return context.Collector.FromValue(std::wstring());
}

std::wstring text = arg->AsString();

// Transform the local copy; the original GC-owned buffer stays borrowed.
std::transform(text.begin(), text.end(), text.begin(), ::towupper);

return context.Collector.FromValue(text);`,language:"cpp"}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"5. Read native pointer arguments."})}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:["Use ",e.jsx(t,{children:"AsNint()"})," for opaque native pointers stored in a ",e.jsx(t,{children:"nint"})," ",`
field or parameter. Because the value is a raw pointer, it is especially important to validate it before
use.`]})}),`
`,e.jsx(i,{code:`ObjectInstance* arg = context.Args[0];

if (arg == nullptr || arg == GarbageCollector::NullInstance)
{
  return context.Collector.FromValue(static_cast<std::int64_t>(0));
}

void* nativePointer = arg->AsNint();

if (nativePointer == nullptr)
{
  return context.Collector.FromValue(static_cast<std::int64_t>(0));
}

std::int64_t address = reinterpret_cast<std::int64_t>(nativePointer);
return context.Collector.FromValue(address);`,language:"cpp"}),`
`,e.jsx(n,{children:e.jsxs("strong",{children:["6. Use the ",e.jsx(t,{children:"GetArgs<T...>"})," helper for multiple primitives."]})}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:["For simple static methods whose arguments are all primitives, the ",e.jsx(t,{children:"GetArgs<T...>"}),`
helper unpacks `,e.jsx(t,{children:"context.Args"})," in order. It is used extensively in libraries such as"," ",`
`,e.jsx(t,{children:"system/math.shard.cpp"}),"."]})}),`
`,e.jsx(i,{code:`// Read one primitive argument.
auto [value] = GetArgs<double>(context);

// Read two primitive arguments.
auto [a, b] = GetArgs<double, double>(context);

// Read mixed primitive arguments.
auto [base, exponent] = GetArgs<double, int>(context);

// Read self instance with mixed primitive arguments.
auto [self, base, exponent] = GetArgs<ObjectInstance*, double, int>(context);

double result = std::pow(base, static_cast<double>(exponent));
return context.Collector.FromValue(result);`,language:"cpp"}),`
`,e.jsx(o,{tone:"blue",children:e.jsxs(r.p,{children:["Structured bindings require the ",e.jsx(t,{children:"auto"}),` placeholder in C++. The actual types come from
the explicit template arguments to `,e.jsx(t,{children:"GetArgs"}),`, so the types are still fixed at compile
time.`]})}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"7. Put the pieces together in a single library."})}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[`The following library registers a static class with several methods. Each method demonstrates one reading
pattern: primitives, null-safe strings, native pointers, and the `,e.jsx(t,{children:"GetArgs"})," helper."]})}),`
`,e.jsx(i,{code:`#include <ShardScript.hpp>

#include <algorithm>
#include <cmath>
#include <cstdint>
#include <string>

using namespace shard;

static ObjectInstance* ReadPrimitives(const CallState& context)
{
  // Args[0] is the first real argument because the method is LINK_STATIC.
  std::int64_t integerValue   = context.Args[0]->AsInteger();
  double       doubleValue    = context.Args[1]->AsDouble();
  bool         booleanValue   = context.Args[2]->AsBoolean();
  wchar_t      characterValue = context.Args[3]->AsCharacter();
  std::uint8_t byteValue      = context.Args[4]->AsByte();

  double result = static_cast<double>(integerValue) + doubleValue;

  if (booleanValue)
  {
      result = result + static_cast<double>(characterValue) + static_cast<double>(byteValue);
  }

  return context.Collector.FromValue(result);
}

static ObjectInstance* SafeStringLength(const CallState& context)
{
  ObjectInstance* arg = context.Args[0];

  if (arg == nullptr || arg == GarbageCollector::NullInstance)
  {
      // Return 0 for a null string instead of dereferencing it.
      return context.Collector.FromValue(static_cast<std::int64_t>(0));
  }

  std::wstring text = arg->AsString();
  std::int64_t length = static_cast<std::int64_t>(text.length());

  return context.Collector.FromValue(length);
}

static ObjectInstance* PointerAddress(const CallState& context)
{
  ObjectInstance* arg = context.Args[0];

  if (arg == nullptr || arg == GarbageCollector::NullInstance)
  {
      return context.Collector.FromValue(static_cast<std::int64_t>(0));
  }

  void* pointer = arg->AsNint();

  if (pointer == nullptr)
  {
      return context.Collector.FromValue(static_cast<std::int64_t>(0));
  }

  std::int64_t address = reinterpret_cast<std::int64_t>(pointer);
  return context.Collector.FromValue(address);
}

static ObjectInstance* Power(const CallState& context)
{
  auto [base, exponent] = GetArgs<double, int>(context);

  double result = std::pow(base, static_cast<double>(exponent));
  return context.Collector.FromValue(result);
}

SHARDLIB_GETMETADATA
{
  lib.Name        = L"shard.argdemo";
  lib.Description = L"Argument reading demonstrations";
  lib.Version     = L"1.0.0";
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> argDemo(context, L"argdemo");

  argDemo.AddClass(L"ArgDemo", ACS_PUBLIC, LINK_STATIC, [](SymbolBuilder<ClassSymbol> type)
  {
      type.AddMethod(L"ReadPrimitives", TYPE_DOUBLE, LINK_STATIC, ACS_PUBLIC)
          .AddParameter(L"i", TYPE_INT)
          .AddParameter(L"d", TYPE_DOUBLE)
          .AddParameter(L"b", TYPE_BOOL)
          .AddParameter(L"c", TYPE_CHAR)
          .AddParameter(L"y", TYPE_BYTE)
          .SetCallback(&ReadPrimitives);

      type.AddMethod(L"SafeStringLength", TYPE_INT, LINK_STATIC, ACS_PUBLIC)
          .AddParameter(L"s", TYPE_STRING)
          .SetCallback(&SafeStringLength);

      type.AddMethod(L"PointerAddress", TYPE_INT, LINK_STATIC, ACS_PUBLIC)
          .AddParameter(L"p", TYPE_NINT)
          .SetCallback(&PointerAddress);

      type.AddMethod(L"Power", TYPE_DOUBLE, LINK_STATIC, ACS_PUBLIC)
          .AddParameter(L"base", TYPE_DOUBLE)
          .AddParameter(L"exponent", TYPE_INT)
          .SetCallback(&Power);
  });
}`,language:"cpp",filename:"argdemo.cpp"}),`
`,e.jsx(l,{children:"Verification"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:["Build the shared library from the source file above and load it with the ",e.jsx(t,{children:"-l"}),` flag.
The runtime loads any shared library that exports `,e.jsx(t,{children:"ShardLib_GetMetadata"})," and"," ",`
`,e.jsx(t,{children:"ShardLib_EntryPoint"}),", whether the library lives inside"," ",`
`,e.jsx(t,{children:"ShardScript.Framework"})," or in its own directory."]})}),`
`,e.jsx(i,{code:`using stdio;
using argdemo;

namespace demo;

public static func Main() -> void
{
  double combined = ArgDemo.ReadPrimitives(10, 2.5, true, 'A', 5);
  println("combined: " + combined);

  int stringLength = ArgDemo.SafeStringLength("ShardScript");
  println("length: " + stringLength);

  int nullLength = ArgDemo.SafeStringLength(null);
  println("null length: " + nullLength);

  nint ptr = cinterop.Alloc(64);
  int address = ArgDemo.PointerAddress(ptr);
  println("address non-zero: " + (address != 0));

  double powerResult = ArgDemo.Power(2.0, 8);
  println("power: " + powerResult);
}`,language:"csharp",filename:"app.shard"}),`
`,e.jsx(o,{tone:"blue",children:e.jsxs(r.p,{children:["The ",e.jsx(t,{children:"cinterop.Alloc"})," call above assumes the ",e.jsx(t,{children:"shard.cinterop"})," ",`
library is loaded. If it is not available in your environment, replace the pointer assignment with`," ",`
`,e.jsx(t,{children:"nint ptr = 0"})," and verify that ",e.jsx(t,{children:"PointerAddress"})," returns 0."]})}),`
`,e.jsx(n,{children:e.jsx(r.p,{children:"Run the program with the path to your built shared library:"})}),`
`,e.jsx(i,{code:`# Windows
shard app.shard -l build/argdemo.dll

# Linux
shard app.shard -l build/libargdemo.so

# macOS
shard app.shard -l build/libargdemo.dylib`,language:"bash"}),`
`,e.jsx(n,{children:e.jsx(r.p,{children:"Expected output:"})}),`
`,e.jsx(i,{code:`combined: 82.5
length: 11
null length: 0
address non-zero: true
power: 256`,language:"text"}),`
`,e.jsx(l,{children:"Troubleshooting"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsxs("strong",{className:"text-text-primary",children:[e.jsx(t,{children:"AsString()"})," crashes."]}),` The argument
was probably `,e.jsx(t,{children:"null"}),". Always check for ",e.jsx(t,{children:"nullptr"})," and"," ",`
`,e.jsx(t,{children:"GarbageCollector::NullInstance"})," before calling ",e.jsx(t,{children:"AsString()"}),"."]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Primitive values look corrupted."})," Verify the method's"," ",`
`,e.jsx(t,{children:"SymbolLinking"}),". For instance methods, ",e.jsx(t,{children:"Args[0]"})," is"," ",`
`,e.jsx(t,{children:"this"}),"; for static methods, ",e.jsx(t,{children:"Args[0]"}),` is the first real
argument. A mismatch shifts every index.`]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsxs("strong",{className:"text-text-primary",children:[e.jsx(t,{children:"GetArgs"})," throws or returns garbage."]}),`
Ensure the number and order of template arguments exactly match the registered parameter list. Mismatched
types cause the readers to interpret the wrong object layout.`]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"String data disappears after a GC call."})," ",`
`,e.jsx(t,{children:"AsString()"})," returns a borrowed pointer into a managed object. Copy it into a"," ",`
`,e.jsx(t,{children:"std::wstring"})," if you keep it past the next allocation or collection point."]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsxs("strong",{className:"text-text-primary",children:[e.jsx(t,{children:"AsNint()"})," returns an unexpected address."]}),`
Confirm the ShardScript side passed the pointer through a `,e.jsx(t,{children:"nint"}),` parameter, not an
object reference. Native pointers are not subject to GC tracking, so type mismatches are not caught at
runtime.`]})})]}),`
`,e.jsx(l,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx(t,{children:"library-building/returning-values"})," — returning values to ShardScript."]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx(t,{children:"library-building/working-with-objects"})," — working with object arguments."]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx(t,{children:"library-building/native-callback-helpers"})," — helper functions for common conversions."]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx(t,{children:"library-building/headers-quick-reference"})," — header locations."]})})]})]})}function u(a={}){const{wrapper:r}=a.components||{};return r?e.jsx(r,{...a,children:e.jsx(h,{...a})}):h(a)}function c(a,r){throw new Error("Expected component `"+a+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};
