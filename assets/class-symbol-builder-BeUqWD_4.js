import{j as e}from"./index-C1AvCmMi.js";function h(i){const n={p:"p",...i.components},{Bullet:s,Callout:c,CodeBlock:a,DocsTable:o,H2:l,InlineCode:t,Prose:r}=n;return s||d("Bullet"),c||d("Callout"),a||d("CodeBlock"),o||d("DocsTable"),l||d("H2"),t||d("InlineCode"),r||d("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(l,{children:"Summary"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"SymbolBuilder<ClassSymbol>"}),` is the fluent registration API for adding a
managed class to the ShardScript semantic model. It is used inside`," ",`
`,e.jsx(t,{children:"SHARDLIB_ENTRYPOINT"}),` to declare fields, constructors, methods, properties,
indexers, operators, type parameters, and implemented interfaces, and to bind each callable member to
a native C++ callback.`]})}),`
`,e.jsx(l,{children:"Syntax"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:["A class is created from a ",e.jsx(t,{children:"NamespaceSymbol"}),` builder. The registration lambda
receives a `,e.jsx(t,{children:"SymbolBuilder<ClassSymbol>"}),` by value and returns nothing;
all configuration is performed through fluent method calls.`]})}),`
`,e.jsx(a,{code:`ns.AddClass(L"ClassName", ACS_PUBLIC, LINK_INSTANCE, [](SymbolBuilder<ClassSymbol> cls)
{
  cls.AddField(L"_field", TYPE_INT, LINK_INSTANCE, ACS_PRIVATE);

  cls.AddInit()
      .AddParameter(L"value", TYPE_INT)
      .SetCallback(&constructor_callback);

  cls.AddMethod(L"Method", TYPE_VOID, LINK_INSTANCE, ACS_PUBLIC)
      .AddParameter(L"arg", TYPE_STRING)
      .SetCallback(&method_callback);
});`,language:"cpp"}),`
`,e.jsx(l,{children:"Parameters / Arguments"}),`
`,e.jsx(o,{headers:["Parameter","Type / Values","Description"],rows:[[e.jsx(t,{children:"name"}),"Wide string (<InlineCode>const wchar_t*</InlineCode>)","The ShardScript-visible name of the class."],[e.jsx(t,{children:"accessibility"}),"ACS_PUBLIC or ACS_PRIVATE","Visibility of the class itself."],[e.jsx(t,{children:"linking"}),"LINK_INSTANCE or LINK_STATIC","LINK_INSTANCE for instance classes; LINK_STATIC for classes that contain only static members."],[e.jsx(t,{children:"configure"}),"<InlineCode>void(SymbolBuilder&lt;ClassSymbol&gt;)</InlineCode>","Lambda that registers fields, members, and interfaces."]]}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:["The following methods are available on the ",e.jsx(t,{children:"SymbolBuilder<ClassSymbol>"}),":"]})}),`
`,e.jsx(o,{headers:["Method","Typical parameters","Returns","Description"],rows:[[e.jsx(t,{children:"AddField"}),"name, type, linking, accessibility","FieldSymbol*","Adds an instance or static field."],[e.jsx(t,{children:"AddMethod"}),"name, returnType, linking, accessibility","SymbolBuilder&lt;MethodSymbol&gt;","Adds a method; chain AddParameter and SetCallback."],[e.jsx(t,{children:"AddInit"}),"none","SymbolBuilder&lt;ConstructorSymbol&gt;","Adds a constructor (initializer). Use LINK_STATIC and return self."],[e.jsx(t,{children:"AddProperty"}),"name, type, linking, accessibility","SymbolBuilder&lt;PropertySymbol&gt;","Adds a property; chain AddGetter/AddSetter and SetCallback."],[e.jsx(t,{children:"AddIndexer"}),"elementType, linking, accessibility","SymbolBuilder&lt;IndexatorSymbol&gt;","Adds an indexer; chain AddParameter, AddGetter, AddSetter."],[e.jsx(t,{children:"AddOperator"}),"tokenType, returnType, linking","SymbolBuilder&lt;OperatorSymbol&gt;","Adds an operator overload."],[e.jsx(t,{children:"AddCastOperator"}),"returnType, linking","SymbolBuilder&lt;OperatorSymbol&gt;","Adds an explicit or implicit cast operator."],[e.jsx(t,{children:"AddTypeParameter"}),"name","SymbolBuilder&lt;TypeParameterSymbol&gt;","Adds a generic type parameter; call .Get() for the symbol pointer."],[e.jsx(t,{children:"Implements"}),"interfaceSymbol or trait constant","void","Declares that the class implements an interface."],[e.jsx(t,{children:"DeclareGlobal"}),"none","void","Declares the class in the global namespace."],[e.jsx(t,{children:"SetFullName"}),"fullName","void","Overrides the fully qualified symbol name."]]}),`
`,e.jsx(l,{children:"Returns"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"AddClass"})," returns a pointer to the registered ",e.jsx(t,{children:"ClassSymbol"}),`.
`,e.jsx(t,{children:"AddField"})," returns a ",e.jsx(t,{children:"FieldSymbol*"})," whose"," ",`
`,e.jsx(t,{children:"SlotIndex"}),` is used at runtime to read and write instance state. The remaining
builder methods return a chained builder reference so that parameters, callbacks, getters, and setters
can be added in a single expression.`]})}),`
`,e.jsx(l,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Callback is never invoked"})," — Forgetting"," ",`
`,e.jsx(t,{children:".SetCallback(...)"}),` on a method, property getter/setter, indexer, operator, or
constructor leaves the symbol registered but with no native target.`]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Instance callback reads the wrong argument"})," — For"," ",`
`,e.jsx(t,{children:"LINK_INSTANCE"})," members, ",e.jsx(t,{children:"context.Args[0]"})," is"," ",`
`,e.jsx(t,{children:"this"}),". Real parameters start at index ",e.jsx(t,{children:"1"}),"."]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Constructor does not return self"})," — An"," ",`
`,e.jsx(t,{children:"AddInit"})," callback receives the freshly allocated instance as"," ",`
`,e.jsx(t,{children:"context.Args[0]"})," and must return that same pointer."]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Static member called on an instance"}),` — A member registered
with `,e.jsx(t,{children:"LINK_STATIC"})," must be invoked through the type name, not an instance."]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Property has no getter or setter"}),` — A property must declare
at least one accessor with `,e.jsx(t,{children:"AddGetter"})," or ",e.jsx(t,{children:"AddSetter"}),` and
attach a callback to it.`]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Operator token is unsupported"})," — Not every"," ",`
`,e.jsx(t,{children:"shard::TokenType"}),` can be used as an operator overload. Use common arithmetic,
comparison, and delimiter tokens such as `,e.jsx(t,{children:"AddOperator"}),", ",e.jsx(t,{children:"SubOperator"}),`,
`,e.jsx(t,{children:"EqualsOperator"}),", or ",e.jsx(t,{children:"Delimeter"}),"."]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Generic type argument is missing"}),` — Generic classes must
declare type parameters with `,e.jsx(t,{children:"AddTypeParameter"}),` in the same order they are read
from `,e.jsx(t,{children:"context.Frame->TypeArguments"})," at runtime."]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Interface is not visible"})," — The interface symbol passed to"," ",`
`,e.jsx(t,{children:"Implements"}),` must be public and must be registered before the class that implements
it.`]})})]}),`
`,e.jsx(l,{children:"Remarks"}),`
`,e.jsx(c,{tone:"blue",title:"Native library shape",children:e.jsxs(n.p,{children:["A ShardScript native library is any shared library (",e.jsx(t,{children:".dll"})," on Windows, ",e.jsx(t,{children:".so"})," on Linux, ",e.jsx(t,{children:".dylib"})," on macOS) that exports the two C-linkage symbols ",e.jsx(t,{children:"ShardLib_GetMetadata"})," and ",e.jsx(t,{children:"ShardLib_EntryPoint"}),". It can be built from one or many C++ source files, live inside ",e.jsx(t,{children:"ShardScript.Framework"})," or in a completely separate project, and links against the ShardScript runtime shared library using headers from ",e.jsx(t,{children:"ShardScript/include"}),". For the full registration contract, see ",e.jsx(t,{children:"native-library-overview.mdx"}),"."]})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Registration is compile-time."})," All ",e.jsx(t,{children:"SymbolBuilder"}),` calls run inside
the `,e.jsx(t,{children:"SHARDLIB_ENTRYPOINT"}),` callback while the runtime is building the semantic model.
They describe the public surface of the library; the actual behavior is provided by C++ callbacks attached
with `,e.jsx(t,{children:".SetCallback(...)"}),"."]})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Linking determines the call contract."})," ",e.jsx(t,{children:"LINK_INSTANCE"}),` members receive
the instance pointer as `,e.jsx(t,{children:"context.Args[0]"}),". ",e.jsx(t,{children:"LINK_STATIC"})," ",`
members receive the first real argument at index `,e.jsx(t,{children:"0"}),". Constructors registered with"," ",`
`,e.jsx(t,{children:"AddInit"})," use ",e.jsx(t,{children:"LINK_STATIC"}),` because the runtime allocates the
instance before calling the callback, then passes it as `,e.jsx(t,{children:"context.Args[0]"}),"."]})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Field slot indices."})," Store the ",e.jsx(t,{children:"FieldSymbol*"})," returned by"," ",`
`,e.jsx(t,{children:"AddField"}),". Its ",e.jsx(t,{children:"SlotIndex"}),` is the stable runtime offset used
with `,e.jsx(t,{children:"ObjectInstance::GetField"})," and ",e.jsx(t,{children:"SetField"}),`. Do not assume
a fixed numeric index.`]})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Properties and indexers."}),` Properties expose named values; indexers expose bracket access.
Both support separate getter and setter callbacks. For an auto-backing property, call`," ",`
`,e.jsx(t,{children:"AddBackingField()"})," and use the returned ",e.jsx(t,{children:"FieldSymbol*"}),` inside
the getter and setter.`]})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Generic classes."}),` Declare type parameters in the order they appear in ShardScript source.
Use the returned `,e.jsx(t,{children:"TypeParameterSymbol*"}),` as the type for fields, parameters, and
return values. At runtime, resolve the concrete substitution from`," ",`
`,e.jsx(t,{children:"context.Frame->TypeArguments"}),". When allocating a generic instance, use"," ",`
`,e.jsx(t,{children:"context.Collector.AllocateGeneric(rawClass, { concreteT })"}),", not"," ",`
`,e.jsx(t,{children:"AllocateInstance"}),"."]})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Interfaces."})," Register the interface first, capture its symbol pointer, then pass it to"," ",`
`,e.jsx(t,{children:"Implements"}),". For framework interfaces such as ",e.jsx(t,{children:"IDisposable"}),`,
use the predefined trait constant, for example `,e.jsx(t,{children:"TRAIT_DISPOSABLE"}),"."]})}),`
`,e.jsx(c,{tone:"blue",children:e.jsx(n.p,{children:`Keep field symbols in static pointers so callbacks can read and write instance state. Every other member
can usually be registered and chained without storing intermediate builders.`})}),`
`,e.jsx(c,{tone:"amber",title:"Inheritance is not yet implemented",children:e.jsxs(n.p,{children:["While ",e.jsx(t,{children:"Implements"}),` works for interfaces, class inheritance and method overriding are
not fully implemented. Model shared behavior through interfaces or composition for now.`]})}),`
`,e.jsx(l,{children:"Examples"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Instance class with a field, constructor, and method."}),` This pattern is the starting point
for most native types: store per-instance state in a private field and expose public methods that operate
on `,e.jsx(t,{children:"this"}),"."]})}),`
`,e.jsx(a,{code:`// Person.shard.cpp
#include <ShardScript.hpp>

using namespace shard;

static FieldSymbol* g_nameField = nullptr;

static ObjectInstance* person_greet(const CallState& context)
{
  ObjectInstance* self = context.Args[0];
  ObjectInstance* nameObj = self->GetField(g_nameField->SlotIndex);
  const wchar_t* name = nameObj->AsString();

  std::wstring message = L"Hello, ";
  message += name;

  return context.Collector.FromValue(message);
}

SHARDLIB_GETMETADATA
{
  lib.Name        = L"shard.people";
  lib.Description = L"Person class example";
  lib.Version     = L"1.0.0";
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> ns(context, L"people");

  ns.AddClass(L"Person", ACS_PUBLIC, LINK_INSTANCE, [](SymbolBuilder<ClassSymbol> person)
  {
      g_nameField = person.AddField(L"_name", TYPE_STRING, LINK_INSTANCE, ACS_PRIVATE);

      person.AddInit()
          .AddParameter(L"name", TYPE_STRING)
          .SetCallback([](const CallState& context)
          {
              ObjectInstance* self = context.Args[0];
              ObjectInstance* name = context.Args[1];
              self->SetField(g_nameField->SlotIndex, name);
              return self;
          });

      person.AddMethod(L"Greet", TYPE_STRING, LINK_INSTANCE, ACS_PUBLIC)
          .SetCallback(&person_greet);
  });
}`,language:"cpp",filename:"Person.shard.cpp"}),`
`,e.jsx(r,{children:"ShardScript usage:"}),`
`,e.jsx(a,{code:`using stdio;
using people;

namespace demo;

public static func Main() -> void
{
  p: Person = new Person("World");
  println(p.Greet());   // Hello, World
}`,language:"csharp",filename:"app.shard"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Properties and indexers."})," A property exposes ",e.jsx(t,{children:"Count"}),` as a read-only
value, while an indexer provides bracket access to the underlying byte array.`]})}),`
`,e.jsx(a,{code:`// Buffer.shard.cpp
#include <ShardScript.hpp>

using namespace shard;

static FieldSymbol* g_bufferData = nullptr;

static ObjectInstance* buffer_get_count(const CallState& context)
{
  ObjectInstance* self = context.Args[0];
  ObjectInstance* data = self->GetField(g_bufferData->SlotIndex);
  std::int64_t count = static_cast<std::int64_t>(data->GetArrayLength());
  return context.Collector.FromValue(count);
}

SHARDLIB_GETMETADATA
{
  lib.Name        = L"shard.buffers";
  lib.Description = L"Buffer with property and indexer";
  lib.Version     = L"1.0.0";
}

SHARDLIB_ENTRYPOINT
{
  SymbolFactory factory(context.GetSemanticModel().Table.get());
  SymbolBuilder<NamespaceSymbol> ns(context, L"buffers");

  ns.AddClass(L"Buffer", ACS_PUBLIC, LINK_INSTANCE, [](SymbolBuilder<ClassSymbol> buffer)
  {
      ArrayTypeSymbol* byteArray = factory.Array(TYPE_BYTE);
      g_bufferData = buffer.AddField(L"_data", byteArray, LINK_INSTANCE, ACS_PRIVATE);

      buffer.AddInit()
          .AddParameter(L"capacity", TYPE_INT)
          .SetCallback([](const CallState& context)
          {
              ObjectInstance* self = context.Args[0];
              std::int64_t capacity = context.Args[1]->AsInteger();
              ObjectInstance* data = context.Collector.AllocateArray(TYPE_BYTE, static_cast<std::size_t>(capacity));
              self->SetField(g_bufferData->SlotIndex, data);
              return self;
          });

      buffer.AddProperty(L"Count", TYPE_INT, LINK_INSTANCE, ACS_PUBLIC)
          .AddGetter()
          .SetCallback(&buffer_get_count);

      buffer.AddIndexer(TYPE_BYTE, LINK_INSTANCE)
          .AddParameter(L"index", TYPE_INT)
          .AddGetter().SetCallback([](const CallState& context)
          {
              ObjectInstance* self = context.Args[0];
              std::int64_t index = context.Args[1]->AsInteger();
              ObjectInstance* data = self->GetField(g_bufferData->SlotIndex);
              return data->GetElement(static_cast<std::size_t>(index), context.Frame);
          })
          .AddSetter().SetCallback([](const CallState& context)
          {
              ObjectInstance* self = context.Args[0];
              std::int64_t index = context.Args[1]->AsInteger();
              ObjectInstance* value = context.Args[2];
              ObjectInstance* data = self->GetField(g_bufferData->SlotIndex);
              data->SetElement(static_cast<std::size_t>(index), value, context.Frame);
              return nullptr;
          });
  });
}`,language:"cpp",filename:"Buffer.shard.cpp"}),`
`,e.jsx(r,{children:"ShardScript usage:"}),`
`,e.jsx(a,{code:`using stdio;
using buffers;

namespace demo;

public static func Main() -> void
{
  b: Buffer = new Buffer(4);
  b[0] = 42;
  println(b[0]);     // 42
  println(b.Count);  // 4
}`,language:"csharp",filename:"app.shard"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Operator overloads."}),` Operators are registered with a token type, a return type, and a
linking mode. The callback receives the operands in `,e.jsx(t,{children:"context.Args"}),"."]})}),`
`,e.jsx(a,{code:`// Counter.shard.cpp
#include <ShardScript.hpp>

using namespace shard;

static ObjectInstance* counter_add(const CallState& context)
{
  std::int64_t left  = context.Args[0]->AsInteger();
  std::int64_t right = context.Args[1]->AsInteger();
  return context.Collector.FromValue(left + right);
}

static ObjectInstance* counter_equals(const CallState& context)
{
  std::int64_t left  = context.Args[0]->AsInteger();
  std::int64_t right = context.Args[1]->AsInteger();
  return context.Collector.FromValue(left == right);
}

SHARDLIB_GETMETADATA
{
  lib.Name        = L"shard.counters";
  lib.Description = L"Counter with operator overloads";
  lib.Version     = L"1.0.0";
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> ns(context, L"counters");

  ns.AddClass(L"Counter", ACS_PUBLIC, LINK_STATIC, [](SymbolBuilder<ClassSymbol> counter)
  {
      counter.AddOperator(shard::TokenType::AddOperator, TYPE_INT, LINK_STATIC)
          .AddParameter(L"a", TYPE_INT)
          .AddParameter(L"b", TYPE_INT)
          .SetCallback(&counter_add);

      counter.AddOperator(shard::TokenType::EqualsOperator, TYPE_BOOL, LINK_STATIC)
          .AddParameter(L"a", TYPE_INT)
          .AddParameter(L"b", TYPE_INT)
          .SetCallback(&counter_equals);
  });
}`,language:"cpp",filename:"Counter.shard.cpp"}),`
`,e.jsx(r,{children:"ShardScript usage:"}),`
`,e.jsx(a,{code:`using stdio;
using counters;

namespace demo;

public static func Main() -> void
{
  println(Counter + (3, 4));        // 7
  println(Counter == (3, 3));       // true
}`,language:"csharp",filename:"app.shard"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Generic class and interface implementation."}),` The class declares a type parameter, uses it
for a field and a method return type, and implements a namespace-level interface.`]})}),`
`,e.jsx(a,{code:`// Box.shard.cpp
#include <ShardScript.hpp>

using namespace shard;

static TypeParameterSymbol* g_box_T = nullptr;
static FieldSymbol*         g_box_value = nullptr;

static ObjectInstance* box_get_value(const CallState& context)
{
  ObjectInstance* self = context.Args[0];
  return self->GetField(g_box_value->SlotIndex);
}

SHARDLIB_GETMETADATA
{
  lib.Name        = L"shard.boxes";
  lib.Description = L"Generic Box<T> example";
  lib.Version     = L"1.0.0";
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> ns(context, L"boxes");

  InterfaceSymbol* boxable = ns.AddInterface(L"IBoxable", ACS_PUBLIC, [](SymbolBuilder<InterfaceSymbol> iface)
  {
      iface.AddMethod(L"GetValue", TYPE_ANY, LINK_INSTANCE);
  });

  ns.AddClass(L"Box", ACS_PUBLIC, LINK_INSTANCE, [](SymbolBuilder<ClassSymbol> box)
  {
      g_box_T = box.AddTypeParameter(L"T").Get();
      g_box_value = box.AddField(L"_value", g_box_T, LINK_INSTANCE, ACS_PRIVATE);

      box.Implements(boxable);

      box.AddInit()
          .AddParameter(L"value", g_box_T)
          .SetCallback([](const CallState& context)
          {
              ObjectInstance* self = context.Args[0];
              ObjectInstance* value = context.Args[1];
              self->SetField(g_box_value->SlotIndex, value);
              return self;
          });

      box.AddMethod(L"GetValue", g_box_T, LINK_INSTANCE, ACS_PUBLIC)
          .SetCallback(&box_get_value);
  });
}`,language:"cpp",filename:"Box.shard.cpp"}),`
`,e.jsx(r,{children:"ShardScript usage:"}),`
`,e.jsx(a,{code:`using stdio;
using boxes;

namespace demo;

public static func Main() -> void
{
  b: Box<int> = new Box<int>(42);
  println(b.GetValue());   // 42
}`,language:"csharp",filename:"app.shard"}),`
`,e.jsx(l,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"library-building/namespace-symbol-builder"})," — registering namespaces."]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"library-building/method-symbol-builder"})," — registering methods on a class."]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"library-building/property-symbol-builder"})," — registering properties."]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"library-building/generic-types-and-type-parameters"})," — generic class registration."]})})]}),`
`,e.jsx(l,{children:"Source"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:["The native side of this API is implemented in ",e.jsx(t,{children:"shard/semantic/SymbolBuilder.hpp"}),`.
View the source on GitHub: `,e.jsx(t,{children:"https://github.com/Rikitav/ShardScript/blob/main/ShardScript/include/shard/semantic/SymbolBuilder.hpp"}),"."]})})]})}function m(i={}){const{wrapper:n}=i.components||{};return n?e.jsx(n,{...i,children:e.jsx(h,{...i})}):h(i)}function d(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default};
