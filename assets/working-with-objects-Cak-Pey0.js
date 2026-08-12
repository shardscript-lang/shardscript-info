import{j as e}from"./index-BJYykHK7.js";function h(c){const n={p:"p",...c.components},{Bullet:r,Callout:d,CodeBlock:s,DocsTable:o,H2:a,InlineCode:t,Prose:l}=n;return r||i("Bullet"),d||i("Callout"),s||i("CodeBlock"),o||i("DocsTable"),a||i("H2"),t||i("InlineCode"),l||i("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(l,{children:e.jsxs(n.p,{children:[`This how-to explains how to allocate, inspect, and mutate ShardScript objects from inside native C++
callbacks. You will register a concrete class with instance fields, read and write those fields through
`,e.jsx(t,{children:"ObjectInstance::GetField"})," and ",e.jsx(t,{children:"SetField"}),`, allocate
constructed generic instances with `,e.jsx(t,{children:"AllocateGeneric"}),", use"," ",`
`,e.jsx(t,{children:"getInfo"})," and ",e.jsx(t,{children:"getShape"}),` to recover runtime type
information, and use the convenience helpers in`," ",`
`,e.jsx(t,{children:"<shard/runtime/NativeHelpers.hpp>"}),` for construction, method calls, field
access, and property access.`]})}),`
`,e.jsx(a,{children:"Prerequisites"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsx(n.p,{children:"A C++20 toolchain and a project that links the ShardScript runtime shared library."})}),e.jsx(r,{children:e.jsxs(n.p,{children:["The ShardScript headers on your include path, especially"," ",`
`,e.jsx(t,{children:"ShardScript.hpp"}),", ",e.jsx(t,{children:"shard/runtime/ObjectInstance.hpp"}),","," ",`
`,e.jsx(t,{children:"shard/runtime/NativeHelpers.hpp"}),", and"," ",`
`,e.jsx(t,{children:"shard/semantic/SymbolFactory.hpp"}),"."]})}),e.jsx(r,{children:e.jsxs(n.p,{children:["Familiarity with the two exported symbols, ",e.jsx(t,{children:"SHARDLIB_GETMETADATA"})," and"," ",`
`,e.jsx(t,{children:"SHARDLIB_ENTRYPOINT"}),", and the ",e.jsx(t,{children:"SymbolBuilder"}),` fluent
registration API.`]})}),e.jsx(r,{children:e.jsx(n.p,{children:"Basic understanding of ShardScript generic syntax from the caller side."})})]}),`
`,e.jsx(a,{children:"Goal"}),`
`,e.jsx(l,{children:e.jsxs(n.p,{children:["Build a small native library called ",e.jsx(t,{children:"shard.objectsdemo"})," that exposes:"]})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsxs(n.p,{children:["A ",e.jsx(t,{children:"Counter"}),` class with an integer field and an instance method that
increments it.`]})}),e.jsx(r,{children:e.jsxs(n.p,{children:["A ",e.jsx(t,{children:"Cell<T>"}),` generic class with a single field and methods to set and
get the value.`]})}),e.jsx(r,{children:e.jsx(n.p,{children:"A helper that prints the concrete type arguments of a generic instance by inspecting its shape."})})]}),`
`,e.jsx(a,{children:"Step-by-Step Instructions"}),`
`,e.jsx(l,{children:e.jsx("strong",{children:"1. Create the library source file."})}),`
`,e.jsx(l,{children:e.jsxs(n.p,{children:["A native library is any shared library that exports ",e.jsx(t,{children:"ShardLib_GetMetadata"})," and"," ",`
`,e.jsx(t,{children:"ShardLib_EntryPoint"}),`. It can be built from one source file or many, inside the
framework tree or in a separate project. Create a single C++ source file for this demo.`]})}),`
`,e.jsx(s,{code:`#include <ShardScript.hpp>
#include <shard/runtime/ObjectInstance.hpp>
#include <shard/runtime/MethodCallState.hpp>
#include <shard/runtime/NativeHelpers.hpp>
#include <shard/semantic/SymbolBuilder.hpp>
#include <shard/semantic/SymbolFactory.hpp>

using namespace shard;`,language:"cpp",filename:"objects_demo.shard.cpp"}),`
`,e.jsx(l,{children:e.jsx("strong",{children:"2. Capture the symbols you will need at runtime."})}),`
`,e.jsx(l,{children:e.jsxs(n.p,{children:["Field access uses the ",e.jsx(t,{children:"SlotIndex"})," that ",e.jsx(t,{children:"AddField"}),`
assigns at registration time. Generic allocation needs the raw class definition and its type parameter.
Store these as static pointers so the callbacks can reach them later.`]})}),`
`,e.jsx(s,{code:`// Concrete type symbols.
static ClassSymbol* counterClass = nullptr;
static MethodSymbol* counterIncrementMethod = nullptr;
static FieldSymbol* counter_valueField = nullptr;

// Generic Cell<T> symbols.
static ClassSymbol* cellClass_raw = nullptr;
static TypeParameterSymbol* cell_T = nullptr;
static FieldSymbol* cell_valueField = nullptr;`,language:"cpp",filename:"objects_demo.shard.cpp"}),`
`,e.jsx(l,{children:e.jsxs("strong",{children:["3. Register the ",e.jsx(t,{children:"Counter"})," class and its methods."]})}),`
`,e.jsx(l,{children:e.jsxs(n.p,{children:["Use ",e.jsx(t,{children:"LINK_INSTANCE"}),` for the class so ShardScript can create instances of it.
The constructor callback receives the newly allocated instance as `,e.jsx(t,{children:"context.Args[0]"})," ",`
and must return that same instance.`]})}),`
`,e.jsx(s,{code:`static ObjectInstance* Counter_Init(const CallState& context)
{
  ObjectInstance* self = context.Args[0];
  self->SetField(counter_valueField->SlotIndex, context.Collector.FromValue(0));
  return self;
}

static ObjectInstance* Counter_Increment(const CallState& context)
{
  ObjectInstance* self = context.Args[0];

  std::int64_t current = self->GetField(counter_valueField->SlotIndex)->AsInteger();
  std::int64_t next = current + 1;

  self->SetField(counter_valueField->SlotIndex, context.Collector.FromValue(next));
  return nullptr;
}

static ObjectInstance* Counter_GetValue(const CallState& context)
{
  ObjectInstance* self = context.Args[0];
  ObjectInstance* value = self->GetField(counter_valueField->SlotIndex);
  return value;
}`,language:"cpp",filename:"objects_demo.shard.cpp"}),`
`,e.jsx(s,{code:`static void RegisterCounter(SymbolBuilder<NamespaceSymbol>& ns)
{
  ns.AddClass(L"Counter", ACS_PUBLIC, LINK_INSTANCE, [](SymbolBuilder<ClassSymbol> cls)
  {
      counterClass = cls.Get();
      counter_valueField = cls.AddField(L"_value", TYPE_INT, LINK_INSTANCE, ACS_PRIVATE).Get();

      cls.AddInit()
          .SetCallback(&Counter_Init);

      counterIncrementMethod = cls.AddMethod(L"Increment", TYPE_VOID, LINK_INSTANCE)
          .SetCallback(&Counter_Increment)
          .Get();

      cls.AddMethod(L"GetValue", TYPE_INT, LINK_INSTANCE)
          .SetCallback(&Counter_GetValue);
  });
}`,language:"cpp",filename:"objects_demo.shard.cpp"}),`
`,e.jsx(d,{tone:"blue",title:"Why capture FieldSymbol*",children:e.jsxs(n.p,{children:[`The runtime assigns each field a stable slot number, but the exact number depends on registration order
and base types. Always store the returned `,e.jsx(t,{children:"FieldSymbol*"})," and use"," ",`
`,e.jsx(t,{children:"SlotIndex"})," rather than hard-coding an integer offset."]})}),`
`,e.jsx(l,{children:e.jsxs("strong",{children:["4. Register the generic ",e.jsx(t,{children:"Cell<T>"})," class."]})}),`
`,e.jsx(l,{children:e.jsxs(n.p,{children:["A generic class needs a type parameter before its fields or method parameters can reference it. Use"," ",`
`,e.jsx(t,{children:"AddTypeParameter"})," to introduce ",e.jsx(t,{children:"T"}),", then use"," ",`
`,e.jsx(t,{children:"SymbolFactory"})," to build array or generic field types when necessary."]})}),`
`,e.jsx(s,{code:`static ObjectInstance* Cell_Init(const CallState& context)
{
  ObjectInstance* self = context.Args[0];

  // The concrete substitution for T is the first type argument on the current frame.
  TypeSymbol* concreteT = context.Frame->TypeArguments[0];

  // For a reference type T, default-initialize the field to null.
  self->SetField(cell_valueField->SlotIndex, GarbageCollector::NullInstance);
  return self;
}

static ObjectInstance* Cell_SetValue(const CallState& context)
{
  ObjectInstance* self = context.Args[0];
  ObjectInstance* value = context.Args[1];
  self->SetField(cell_valueField->SlotIndex, value);
  return nullptr;
}

static ObjectInstance* Cell_GetValue(const CallState& context)
{
  ObjectInstance* self = context.Args[0];
  return self->GetField(cell_valueField->SlotIndex);
}`,language:"cpp",filename:"objects_demo.shard.cpp"}),`
`,e.jsx(s,{code:`static void RegisterCell(SymbolBuilder<NamespaceSymbol>& ns)
{
  ns.AddClass(L"Cell", ACS_PUBLIC, LINK_INSTANCE, [](SymbolBuilder<ClassSymbol> cls)
  {
      cellClass_raw = cls.Get();
      cell_T = cls.AddTypeParameter(L"T").Get();
      cell_valueField = cls.AddField(L"_value", cell_T, LINK_INSTANCE, ACS_PRIVATE).Get();

      cls.AddInit()
          .SetCallback(&Cell_Init);

      cls.AddMethod(L"SetValue", TYPE_VOID, LINK_INSTANCE)
          .AddParameter(L"value", cell_T)
          .SetCallback(&Cell_SetValue);

      cls.AddMethod(L"GetValue", cell_T, LINK_INSTANCE)
          .SetCallback(&Cell_GetValue);
  });
}`,language:"cpp",filename:"objects_demo.shard.cpp"}),`
`,e.jsx(l,{children:e.jsx("strong",{children:"5. Allocate a constructed generic instance from another callback."})}),`
`,e.jsx(l,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"GarbageCollector::AllocateGeneric"}),` creates an instance of the raw generic
definition with concrete type arguments substituted. Use it when you need to manufacture a generic object
inside native code rather than returning it from a constructor.`]})}),`
`,e.jsx(s,{code:`static ObjectInstance* MakeIntCell(const CallState& context)
{
  // Allocate Cell<int> directly.
  ObjectInstance* cell = context.Collector.AllocateGeneric(cellClass_raw, { TYPE_INT });

  // Initialize the backing field so the object is in a valid state.
  cell->SetField(cell_valueField->SlotIndex, context.Collector.FromValue(42));
  return cell;
}`,language:"cpp",filename:"objects_demo.shard.cpp"}),`
`,e.jsx(d,{tone:"amber",title:"AllocateGeneric vs AllocateInstance",children:e.jsxs(n.p,{children:["Always use ",e.jsx(t,{children:"AllocateGeneric"})," for generic classes."," ",`
`,e.jsx(t,{children:"AllocateInstance"}),` creates an instance of the raw definition without substituting
type arguments, which leaves the object with an incorrect shape and breaks field layout for value-type
type arguments.`]})}),`
`,e.jsx(l,{children:e.jsxs("strong",{children:["6. Inspect runtime type information with ",e.jsx(t,{children:"getInfo"})," and"," ",`
`,e.jsx(t,{children:"getShape"}),"."]})}),`
`,e.jsx(l,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"getInfo"}),` returns the generic class definition symbol. The concrete type arguments
live on `,e.jsx(t,{children:"getShape()->GenericArguments"}),`. Use this when a callback receives a generic
object and must reason about the actual substitution.`]})}),`
`,e.jsx(s,{code:`static ObjectInstance* InspectCell(const CallState& context)
{
  ObjectInstance* cell = context.Args[0];

  ClassSymbol* definition = cell->getInfo();
  TypeSymbol* concreteT = nullptr;

  if (cell->getShape() != nullptr && !cell->getShape()->GenericArguments.empty())
  {
      concreteT = cell->getShape()->GenericArguments[0];
  }

  std::wstring message = L"definition=" + definition->Name;
  if (concreteT != nullptr)
  {
      message += L", T=" + concreteT->Name;
  }

  return context.Collector.FromValue(message);
}`,language:"cpp",filename:"objects_demo.shard.cpp"}),`
`,e.jsx(l,{children:e.jsx("strong",{children:"7. Wire everything together in the entry point."})}),`
`,e.jsx(s,{code:`SHARDLIB_GETMETADATA
{
  lib.Name        = L"shard.objectsdemo";
  lib.Description = L"ObjectInstance, fields, and generic allocation demo";
  lib.Version     = L"1.0.0";
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> ns(context, L"objectsdemo");

  RegisterCounter(ns);
  RegisterCell(ns);

  SymbolFactory factory(context.GetSemanticModel().Table.get());

  ns.AddMethod(L"MakeIntCell", TYPE_ANY, LINK_STATIC, ACS_PUBLIC)
      .SetCallback(&MakeIntCell);

  ns.AddMethod(L"InspectCell", TYPE_STRING, LINK_STATIC, ACS_PUBLIC)
      .AddParameter(L"cell", factory.GenericType(cellClass_raw, { { L"T", cell_T } }))
      .SetCallback(&InspectCell);
}`,language:"cpp",filename:"objects_demo.shard.cpp"}),`
`,e.jsx(d,{tone:"blue",title:"Registering generic method parameters",children:e.jsxs(n.p,{children:["Use ",e.jsx(t,{children:"SymbolFactory::GenericType"}),` to describe an open generic parameter type such
as `,e.jsx(t,{children:"Cell<T>"}),` at registration time. Pass the raw class and a list of its type
parameters in the same order as `,e.jsx(t,{children:"AddTypeParameter"}),"."]})}),`
`,e.jsx(l,{children:e.jsx("strong",{children:"8. Build the shared library."})}),`
`,e.jsx(l,{children:e.jsxs(n.p,{children:["Link against the ShardScript runtime shared library and include ",e.jsx(t,{children:"ShardScript/include"}),`.
The exact command depends on your build system; a minimal CMake target looks like this.`]})}),`
`,e.jsx(s,{code:`add_library(objects_demo SHARED objects_demo.shard.cpp)

target_include_directories(objects_demo PRIVATE "\${SHARDSCRIPT_ROOT}/ShardScript/include")
target_link_libraries(objects_demo PRIVATE ShardScript)`,language:"cmake",filename:"CMakeLists.txt"}),`
`,e.jsx(a,{children:"Convenience helpers from NativeHelpers.hpp"}),`
`,e.jsx(l,{children:e.jsxs(n.p,{children:["The helpers in ",e.jsx(t,{children:"<shard/runtime/NativeHelpers.hpp>"}),` wrap the low-level object
API so callbacks can construct instances, invoke methods, and read or write fields and properties without
manually managing argument arrays or reference counts. They are ordinary inline functions, so including the
header is enough; no extra library link is required.`]})}),`
`,e.jsx(o,{headers:["Helper","Purpose"],rows:[[e.jsx(t,{children:"NewObject"}),"Allocates an instance and invokes a constructor, returning an owning reference."],[e.jsx(t,{children:"CallMethod"}),"Invokes a static or instance method with an initializer list of arguments."],[e.jsx(t,{children:"GetField"}),"Reads a field value through its FieldSymbol."],[e.jsx(t,{children:"SetField"}),"Writes a field value through its FieldSymbol."],[e.jsx(t,{children:"GetProperty"}),"Invokes a property getter."],[e.jsx(t,{children:"SetProperty"}),"Invokes a property setter."]]}),`
`,e.jsx(l,{children:e.jsxs(n.p,{children:["For example, the following callback manufactures a ",e.jsx(t,{children:"Counter"}),`, increments it twice
through its instance method, and returns the final value object. The helper handles the argument vector,
the `,e.jsx(t,{children:"this"})," pointer, and reference counting during the constructor call."]})}),`
`,e.jsx(s,{code:`#include <shard/runtime/NativeHelpers.hpp>

static ObjectInstance* ManufactureAndIncrement(const CallState& context)
{
  // Allocate and construct Counter with the parameterless constructor.
  ObjectInstance* counter = NewObject(context, counterClass);

  // Invoke Counter.Increment() twice via the registered method symbol.
  CallMethod(context, counterIncrementMethod, counter);
  CallMethod(context, counterIncrementMethod, counter);

  // Return the value field directly; the caller receives a borrowed reference.
  return GetField(counter, counter_valueField);
}`,language:"cpp",filename:"objects_demo.shard.cpp"}),`
`,e.jsx(d,{tone:"blue",title:"Reference counting with NewObject",children:e.jsxs(n.p,{children:[e.jsx(t,{children:"NewObject"}),` returns an object whose reference count is already 1. If you do not
store it in a field, return it, or hand it to the garbage collector before the callback exits, decrement
the reference with `,e.jsx(t,{children:"DecrementReference()"})," to avoid leaking the instance."]})}),`
`,e.jsx(a,{children:"Verification"}),`
`,e.jsx(l,{children:e.jsxs(n.p,{children:["Run the following ShardScript program against the compiled shared library. It creates a"," ",`
`,e.jsx(t,{children:"Counter"}),", increments it, constructs a ",e.jsx(t,{children:"Cell<int>"}),`,
and calls the native helpers.`]})}),`
`,e.jsx(s,{code:`using stdio;
using objectsdemo;

namespace demo;

public static func Main() -> void
{
  Counter counter = new Counter();
  counter.Increment();
  counter.Increment();
  println("Counter: " + counter.GetValue());

  Cell<int> cell = new Cell<int>();
  cell.SetValue(99);
  println("Cell value: " + cell.GetValue());

  Cell<int> manufactured = MakeIntCell();
  println("Manufactured: " + manufactured.GetValue());

  println("Inspection: " + InspectCell(manufactured));
}`,language:"csharp",filename:"demo.shard"}),`
`,e.jsx(l,{children:e.jsxs(n.p,{children:["Load the library with the ",e.jsx(t,{children:"-l"})," flag and run the program:"]})}),`
`,e.jsx(s,{code:`# Windows
shard demo.shard -l objects_demo.dll

# Linux
shard demo.shard -l libobjects_demo.so

# macOS
shard demo.shard -l libobjects_demo.dylib`,language:"bash"}),`
`,e.jsx(l,{children:e.jsx(n.p,{children:"Expected output:"})}),`
`,e.jsx(s,{code:`Counter: 2
Cell value: 99
Manufactured: 42
Inspection: definition=Cell, T=int`,language:"text"}),`
`,e.jsx(a,{children:"Troubleshooting"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Field reads return stale or garbage values."})," Verify that you stored the"," ",`
`,e.jsx(t,{children:"FieldSymbol*"})," returned by ",e.jsx(t,{children:"AddField"})," and that you use"," ",`
`,e.jsx(t,{children:"field->SlotIndex"})," for both ",e.jsx(t,{children:"GetField"})," and"," ",`
`,e.jsx(t,{children:"SetField"}),"."]})}),e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Generic instance behaves as if its type arguments are missing."}),` Make sure you allocated
it with `,e.jsx(t,{children:"AllocateGeneric(rawClass, { concreteT })"}),", not"," ",`
`,e.jsx(t,{children:"AllocateInstance(rawClass)"}),"."]})}),e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsxs("strong",{children:[e.jsx(t,{children:"getInfo()"}),` returns the raw definition instead of the constructed
type.`]})," This is expected. For concrete type arguments read"," ",`
`,e.jsx(t,{children:"instance->getShape()->GenericArguments"})," instead."]})}),e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Null reference when reading a field."}),` Initialize fields in the constructor or
immediately after `,e.jsx(t,{children:"AllocateGeneric"}),`. Reference-typed fields default to null if
left untouched.`]})}),e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Callback receives the wrong generic type argument."})," Read"," ",`
`,e.jsx(t,{children:"context.Frame->TypeArguments"})," in the same order as the"," ",`
`,e.jsx(t,{children:"AddTypeParameter"})," calls. The first added parameter is at index 0."]})})]}),`
`,e.jsx(a,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"library-building/working-with-fields"})," — working with fields."]})}),e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"library-building/reading-arguments"})," — reading arguments."]})}),e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"library-building/returning-values"})," — returning values."]})}),e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"library-building/garbage-collection-rules"})," — GC and lifetime rules."]})})]})]})}function p(c={}){const{wrapper:n}=c.components||{};return n?e.jsx(n,{...c,children:e.jsx(h,{...c})}):h(c)}function i(c,n){throw new Error("Expected component `"+c+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
