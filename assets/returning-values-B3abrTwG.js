import{j as e}from"./index-BJYykHK7.js";function d(a){const n={p:"p",...a.components},{Bullet:l,Callout:o,CodeBlock:s,H2:i,InlineCode:t,Prose:r}=n;return l||c("Bullet"),o||c("Callout"),s||c("CodeBlock"),i||c("H2"),t||c("InlineCode"),r||c("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(r,{children:e.jsxs(n.p,{children:["Every native C++ callback registered through ",e.jsx(t,{children:"SHARDLIB_ENTRYPOINT"}),` has the same
return type: `,e.jsx(t,{children:"shard::ObjectInstance*"}),`. The value you return is not the raw C++ value
you computed; it must be a GC-owned ShardScript object produced through the`," ",`
`,e.jsx(t,{children:"context.Collector"}),` helpers. This guide shows how to return primitives, strings,
opaque native pointers, new class or struct instances, arrays, and void from a native library.`]})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:["A ShardScript native library is any shared library (",e.jsx(t,{children:".dll"}),","," ",`
`,e.jsx(t,{children:".so"}),", or ",e.jsx(t,{children:".dylib"}),`) that exports the two C-linkage symbols
`,e.jsx(t,{children:"ShardLib_GetMetadata"})," and ",e.jsx(t,{children:"ShardLib_EntryPoint"}),`. It can be
built from one source file or many, live inside `,e.jsx(t,{children:"ShardScript.Framework"}),` or in a
completely separate project, and use whatever build system you prefer. It only needs to link against the
ShardScript runtime shared library and include headers from `,e.jsx(t,{children:"ShardScript/include"}),"."]})}),`
`,e.jsx(i,{children:"Prerequisites"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(l,{children:e.jsxs(n.p,{children:["A built ShardScript runtime shared library and the headers in"," ",`
`,e.jsx(t,{children:"ShardScript/include"}),"."]})}),e.jsx(l,{children:e.jsxs(n.p,{children:["A native library project that already exports ",e.jsx(t,{children:"ShardLib_GetMetadata"})," and"," ",`
`,e.jsx(t,{children:"ShardLib_EntryPoint"}),"."]})}),e.jsx(l,{children:e.jsxs(n.p,{children:["Basic familiarity with registering namespaces and methods through"," ",`
`,e.jsx(t,{children:"SymbolBuilder<T>"}),"."]})})]}),`
`,e.jsx(i,{children:"Goal"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:["Implement native callbacks that return every common ShardScript value category: value types via"," ",`
`,e.jsx(t,{children:"Collector.FromValue"}),", opaque pointers via ",e.jsx(t,{children:"Collector.FromNint"}),`,
objects via `,e.jsx(t,{children:"Collector.AllocateInstance"}),", arrays via"," ",`
`,e.jsx(t,{children:"Collector.AllocateArray"}),", and void by returning ",e.jsx(t,{children:"nullptr"}),"."]})}),`
`,e.jsx(i,{children:"Step-by-Step Instructions"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"1. Return primitives and strings with FromValue."})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"Collector.FromValue"}),` boxes C++ scalars into GC-managed ShardScript objects. The
overloads accept `,e.jsx(t,{children:"std::int64_t"}),", ",e.jsx(t,{children:"double"}),","," ",`
`,e.jsx(t,{children:"bool"}),", ",e.jsx(t,{children:"wchar_t"}),", ",e.jsx(t,{children:"std::uint8_t"}),`,
`,e.jsx(t,{children:"const wchar_t*"}),", and ",e.jsx(t,{children:"std::wstring"}),"."]})}),`
`,e.jsx(s,{code:`static ObjectInstance* DoubleValue(const CallState& context)
{
  std::int64_t value = context.Args[0]->AsInteger();
  return context.Collector.FromValue(value * 2);
}

static ObjectInstance* Greet(const CallState& context)
{
  ObjectInstance* arg = context.Args[0];
  if (arg == nullptr || arg == GarbageCollector::NullInstance)
  {
      // Defensive fallback so AsString is never called on a null reference.
      return context.Collector.FromValue(std::wstring(L"nobody"));
  }

  std::wstring name = arg->AsString();
  return context.Collector.FromValue(name + L" from native");
}`,language:"cpp"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"2. Return opaque native pointers with FromNint."})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:["Use ",e.jsx(t,{children:"Collector.FromNint(void* pointer, bool isTransient)"}),` to store a native pointer
in a ShardScript `,e.jsx(t,{children:"nint"}),". Set ",e.jsx(t,{children:"isTransient"})," to"," ",`
`,e.jsx(t,{children:"true"}),` when the memory is owned by external code (for example, an OS handle or a
static variable) and must never be freed by the GC.`]})}),`
`,e.jsx(s,{code:`static int s_counter = 0;

static ObjectInstance* GetNativeCounter(const CallState& context)
{
  void* pointer = reinterpret_cast<void*>(&s_counter);

  // true because the static variable is not owned by the ShardScript GC.
  return context.Collector.FromNint(pointer, true);
}`,language:"cpp"}),`
`,e.jsx(o,{tone:"blue",children:e.jsxs(n.p,{children:["Only pass ",e.jsx(t,{children:"false"})," for ",e.jsx(t,{children:"isTransient"}),` when the pointer points to
memory the GC should eventually free. Most handles and borrowed references must be marked transient.`]})}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"3. Return new instances with AllocateInstance."})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:["Allocate a class or struct instance by passing its registered ",e.jsx(t,{children:"ClassSymbol*"})," to"," ",`
`,e.jsx(t,{children:"Collector.AllocateInstance"}),`. The returned object is already GC-owned; fill its
fields and return the same pointer.`]})}),`
`,e.jsx(s,{code:`static ObjectInstance* MakeWidget(const CallState& context)
{
  ObjectInstance* widget = context.Collector.AllocateInstance(g_widgetClass);
  widget->SetField(g_valueField->SlotIndex, context.Collector.FromValue(42));
  return widget;
}`,language:"cpp"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"4. Return arrays with AllocateArray."})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"Collector.AllocateArray(TYPE_INT, length)"}),` creates a one-dimensional ShardScript
array. Use `,e.jsx(t,{children:"SetElement"})," to populate it, passing ",e.jsx(t,{children:"context.Frame"}),`
so the runtime can resolve generic type information when needed.`]})}),`
`,e.jsx(s,{code:`static ObjectInstance* MakeIntArray(const CallState& context)
{
  std::int64_t count = context.Args[0]->AsInteger();
  if (count < 0)
  {
      throw std::runtime_error("count must be non-negative");
  }

  std::size_t length = static_cast<std::size_t>(count);
  ObjectInstance* arr = context.Collector.AllocateArray(TYPE_INT, length);

  for (std::size_t i = 0; i < length; i++)
  {
      arr->SetElement(
          i,
          context.Collector.FromValue(static_cast<std::int64_t>(i)),
          context.Frame);
  }

  return arr;
}`,language:"cpp"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"5. Return void with nullptr."})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:["A method registered with return type ",e.jsx(t,{children:"TYPE_VOID"})," must return"," ",`
`,e.jsx(t,{children:"nullptr"}),". The runtime treats ",e.jsx(t,{children:"nullptr"}),` as the absence of a
value, not as a null reference.`]})}),`
`,e.jsx(s,{code:`static ObjectInstance* LogMessage(const CallState& context)
{
  ObjectInstance* arg = context.Args[0];
  if (arg != nullptr && arg != GarbageCollector::NullInstance)
  {
      const wchar_t* text = arg->AsString();
      // Forward text to the host logger here.
  }

  return nullptr;
}`,language:"cpp"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"6. Observe the GC ownership rules."})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(l,{children:e.jsxs(n.p,{children:["Arguments in ",e.jsx(t,{children:"context.Args"})," are borrowed. Never call ",e.jsx(t,{children:"delete"}),`
, `,e.jsx(t,{children:"free"}),", or ",e.jsx(t,{children:"Collector.Release"})," on them."]})}),e.jsx(l,{children:e.jsxs(n.p,{children:["Values produced by ",e.jsx(t,{children:"FromValue"}),", ",e.jsx(t,{children:"FromNint"}),","," ",`
`,e.jsx(t,{children:"AllocateInstance"}),", and ",e.jsx(t,{children:"AllocateArray"}),` are owned by the GC
and are safe to return.`]})}),e.jsx(l,{children:e.jsx(n.p,{children:`Do not return pointers to stack-local C++ variables. The GC will eventually access the object and crash
or corrupt memory.`})})]}),`
`,e.jsx(i,{children:"Verification"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[`The following complete source file combines every return style shown above. Register the class, fields,
array type, and methods in `,e.jsx(t,{children:"SHARDLIB_ENTRYPOINT"}),`, then build the shared library
and load it with the `,e.jsx(t,{children:"-l"})," interpreter flag."]})}),`
`,e.jsx(s,{code:`#include <ShardScript.hpp>
#include <shard/semantic/SymbolBuilder.hpp>
#include <shard/semantic/SymbolFactory.hpp>
#include <shard/runtime/ObjectInstance.hpp>
#include <shard/runtime/MethodCallState.hpp>
#include <stdexcept>

using namespace shard;

static ClassSymbol* g_widgetClass = nullptr;
static FieldSymbol* g_valueField = nullptr;
static TypeSymbol* g_intArrayType = nullptr;
static int s_counter = 0;

static ObjectInstance* DoubleValue(const CallState& context)
{
  std::int64_t value = context.Args[0]->AsInteger();
  return context.Collector.FromValue(value * 2);
}

static ObjectInstance* Greet(const CallState& context)
{
  ObjectInstance* arg = context.Args[0];
  if (arg == nullptr || arg == GarbageCollector::NullInstance)
  {
      return context.Collector.FromValue(std::wstring(L"nobody"));
  }

  std::wstring name = arg->AsString();
  return context.Collector.FromValue(name + L" from native");
}

static ObjectInstance* GetNativeCounter(const CallState& context)
{
  void* pointer = reinterpret_cast<void*>(&s_counter);
  return context.Collector.FromNint(pointer, true);
}

static ObjectInstance* MakeWidget(const CallState& context)
{
  ObjectInstance* widget = context.Collector.AllocateInstance(g_widgetClass);
  widget->SetField(g_valueField->SlotIndex, context.Collector.FromValue(42));
  return widget;
}

static ObjectInstance* MakeIntArray(const CallState& context)
{
  std::int64_t count = context.Args[0]->AsInteger();
  if (count < 0)
  {
      throw std::runtime_error("count must be non-negative");
  }

  std::size_t length = static_cast<std::size_t>(count);
  ObjectInstance* arr = context.Collector.AllocateArray(TYPE_INT, length);

  for (std::size_t i = 0; i < length; i++)
  {
      arr->SetElement(
          i,
          context.Collector.FromValue(static_cast<std::int64_t>(i)),
          context.Frame);
  }

  return arr;
}

static ObjectInstance* LogMessage(const CallState& context)
{
  ObjectInstance* arg = context.Args[0];
  if (arg != nullptr && arg != GarbageCollector::NullInstance)
  {
      const wchar_t* text = arg->AsString();
      // Forward text to the host logger here.
  }

  return nullptr;
}

SHARDLIB_GETMETADATA
{
  lib.Name        = L"shard.returning";
  lib.Description = L"Demonstrates native callback return values.";
  lib.Version     = L"1.0.0";
}

SHARDLIB_ENTRYPOINT
{
  SymbolFactory factory(context.GetSemanticModel().Table.get());
  g_intArrayType = factory.Array(TYPE_INT);

  SymbolBuilder<NamespaceSymbol> returning(context, L"returning");

  g_widgetClass = returning.AddClass(L"Widget", ACS_PUBLIC, LINK_INSTANCE, [](SymbolBuilder<ClassSymbol> cls)
  {
      g_valueField = cls.AddField(L"Value", TYPE_INT, LINK_INSTANCE, ACS_PUBLIC);
  }).Get();

  returning.AddMethod(L"Double", TYPE_INT, LINK_STATIC, ACS_PUBLIC)
      .AddParameter(L"value", TYPE_INT)
      .SetCallback(&DoubleValue);

  returning.AddMethod(L"Greet", TYPE_STRING, LINK_STATIC, ACS_PUBLIC)
      .AddParameter(L"name", TYPE_STRING)
      .SetCallback(&Greet);

  returning.AddMethod(L"GetNativeCounter", TYPE_NINT, LINK_STATIC, ACS_PUBLIC)
      .SetCallback(&GetNativeCounter);

  returning.AddMethod(L"MakeWidget", g_widgetClass, LINK_STATIC, ACS_PUBLIC)
      .SetCallback(&MakeWidget);

  returning.AddMethod(L"MakeIntArray", g_intArrayType, LINK_STATIC, ACS_PUBLIC)
      .AddParameter(L"count", TYPE_INT)
      .SetCallback(&MakeIntArray);

  returning.AddMethod(L"LogMessage", TYPE_VOID, LINK_STATIC, ACS_PUBLIC)
      .AddParameter(L"message", TYPE_STRING)
      .SetCallback(&LogMessage);
}`,language:"cpp",filename:"returning-values.cpp"}),`
`,e.jsx(r,{children:e.jsx(n.p,{children:"Consume the library from ShardScript:"})}),`
`,e.jsx(s,{code:`using stdio;
using returning;

namespace demo;

public static func Main() -> void
{
  println(returning.Double(21));

  string greeting = returning.Greet("shard");
  println(greeting);

  nint counter = returning.GetNativeCounter();
  println(counter);

  returning.Widget widget = returning.MakeWidget();
  println(widget.Value);

  int[] numbers = returning.MakeIntArray(5);
  println(numbers.Length);

  returning.LogMessage("done");
}`,language:"csharp",filename:"app.shard"}),`
`,e.jsx(r,{children:e.jsx(n.p,{children:"Build and run the library:"})}),`
`,e.jsx(s,{code:`# Configure and build the shared library.
cmake -S . -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build --target returning-values

# Run the ShardScript program with the library.
# On Windows:
shard app.shard -l build/bin/returning-values.dll

# On Linux:
shard app.shard -l build/bin/libreturning-values.so

# On macOS:
shard app.shard -l build/bin/libreturning-values.dylib`,language:"bash"}),`
`,e.jsx(r,{children:e.jsx(n.p,{children:"Expected output:"})}),`
`,e.jsx(s,{code:`42
shard from native
0x7ff...   // the actual pointer value of s_counter
42
5`,language:"bash",filename:"expected output"}),`
`,e.jsx(i,{children:"Troubleshooting"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(l,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Crash after returning a local variable."}),` Never return a
pointer to a stack-local C++ object. Always create ShardScript objects through the collector.`]})}),e.jsx(l,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Native pointer is freed by the GC."})," Pass"," ",`
`,e.jsx(t,{children:"true"})," for the ",e.jsx(t,{children:"isTransient"})," argument of"," ",`
`,e.jsx(t,{children:"FromNint"})," unless the collector owns the underlying memory."]})}),e.jsx(l,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Array elements appear null."})," Use"," ",`
`,e.jsx(t,{children:"SetElement(index, boxedValue, context.Frame)"}),`; raw C++ values are not implicitly
boxed when assigned to array slots.`]})}),e.jsx(l,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Method return type mismatch."}),` The symbol registered with
`,e.jsx(t,{children:"AddMethod"})," must match the object you return. Returning ",e.jsx(t,{children:"nullptr"}),`
is valid for methods declared with `,e.jsx(t,{children:"TYPE_VOID"}),`. For methods that return a reference
type, `,e.jsx(t,{children:"nullptr"})," is mapped to the managed ",e.jsx(t,{children:"null"}),` instance.
Returning `,e.jsx(t,{children:"nullptr"})," for a value-type return is an error."]})}),e.jsx(l,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Null reference in callback."}),` Always guard argument pointers
against `,e.jsx(t,{children:"nullptr"})," and ",e.jsx(t,{children:"GarbageCollector::NullInstance"}),` before
calling `,e.jsx(t,{children:"AsString()"})," or dereferencing them."]})})]}),`
`,e.jsx(i,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(l,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"library-building/reading-arguments"})," — reading arguments from ShardScript."]})}),e.jsx(l,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"library-building/working-with-objects"})," — allocating and returning objects."]})}),e.jsx(l,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"library-building/native-callback-helpers"})," — helper functions for boxing values."]})}),e.jsx(l,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"library-building/garbage-collection-rules"})," — object lifetime and GC rules."]})})]})]})}function u(a={}){const{wrapper:n}=a.components||{};return n?e.jsx(n,{...a,children:e.jsx(d,{...a})}):d(a)}function c(a,n){throw new Error("Expected component `"+a+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};
