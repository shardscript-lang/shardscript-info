import{j as e}from"./index-B-x28vAk.js";function h(i){const r={p:"p",...i.components},{Bullet:s,Callout:a,CodeBlock:l,DocsTable:d,H2:c,InlineCode:t,Prose:n}=r;return s||o("Bullet"),a||o("Callout"),l||o("CodeBlock"),d||o("DocsTable"),c||o("H2"),t||o("InlineCode"),n||o("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(c,{children:"Summary"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:["The ",e.jsx(t,{children:"SymbolBuilder<StructSymbol>"})," specialization registers a ShardScript"," ",`
`,e.jsx("strong",{children:"value type"}),` into the compiler's semantic model. It exposes a fluent API for declaring
fields, constructors, methods, properties, indexers, operators, type parameters, and implemented interfaces
on a struct. Unlike classes, structs are allocated inline and copied by value, so callbacks that return or
mutate them must follow the value-type contract.`]})}),`
`,e.jsx(c,{children:"Syntax"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[`A struct is declared from a namespace builder with an accessibility level, a linking mode, and a registration
callback. Inside the callback you attach members through the `,e.jsx(t,{children:"SymbolBuilder<StructSymbol>"}),`
instance.`]})}),`
`,e.jsx(l,{code:`#include <ShardScript.hpp>

using namespace shard;

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> ns(context, L"geometry");
  SymbolBuilder<StructSymbol> st = ns.AddStruct(L"Vector2", ACS_PUBLIC, LINK_INSTANCE);
      st.AddField(L"X", TYPE_DOUBLE, LINK_INSTANCE, ACS_PUBLIC);
      st.AddField(L"Y", TYPE_DOUBLE, LINK_INSTANCE, ACS_PUBLIC);

      st.AddInit()
      .AddParameter(L"x", TYPE_DOUBLE)
      .AddParameter(L"y", TYPE_DOUBLE)
      .SetCallback([](const CallState& context)
      {
              ObjectInstance* self = context.Args[0];
              self->SetField(0, context.Args[1]);
              self->SetField(1, context.Args[2]);
              return self;
      });

      st.AddMethod(L"Length", TYPE_DOUBLE, LINK_INSTANCE, ACS_PUBLIC)
      .SetCallback([](const CallState& context)
      {
              ObjectInstance* self = context.Args[0];
              double x = self->GetField(0)->AsDouble();
              double y = self->GetField(1)->AsDouble();
              return context.Collector.FromValue(std::sqrt(x * x + y * y));
      });
  
}`,language:"cpp",filename:"geometry.shard.cpp"}),`
`,e.jsx(c,{children:"Parameters / Arguments"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:["All registration methods are called on the ",e.jsx(t,{children:"SymbolBuilder<StructSymbol>"}),` instance
passed to the `,e.jsx(t,{children:"AddStruct"}),` callback. Arguments use the same accessibility and linking
values as classes.`]})}),`
`,e.jsx(d,{headers:["Member","Arguments","Description"],rows:[[e.jsx(t,{children:"AddStruct"}),"name, accessibility, linking, callback","Registers a new struct symbol under the containing namespace."],[e.jsx(t,{children:"AddField"}),"name, type, linking, accessibility","Adds a field. Store the returned FieldSymbol pointer and read SlotIndex at runtime."],[e.jsx(t,{children:"AddMethod"}),"name, returnType, linking, accessibility","Adds a method. Chain AddParameter and SetCallback to complete the signature."],[e.jsx(t,{children:"AddInit"}),"none","Registers a constructor. Chain AddParameter and SetCallback. The callback receives the new instance as context.Args[0] and must return it."],[e.jsx(t,{children:"AddProperty"}),"name, type, linking, accessibility","Registers a property. Use AddGetter and AddSetter to attach callbacks."],[e.jsx(t,{children:"AddIndexer"}),"elementType, linking, accessibility","Registers an indexer. Use AddParameter for the index, then AddGetter and AddSetter."],[e.jsx(t,{children:"AddOperator"}),"tokenType, returnType, linking","Registers an operator overload such as AddOperator, SubOperator, or EqualsOperator."],[e.jsx(t,{children:"AddCastOperator"}),"targetType, linking","Registers an implicit or explicit cast operator."],[e.jsx(t,{children:"AddTypeParameter"}),"name","Adds a generic type parameter to the struct."],[e.jsx(t,{children:"Implements"}),"trait","Declares that the struct implements an interface such as TRAIT_DISPOSABLE."]]}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:["The accessibility values are ",e.jsx(t,{children:"ACS_PUBLIC"})," and ",e.jsx(t,{children:"ACS_PRIVATE"}),". The linking values are"," ",`
`,e.jsx(t,{children:"LINK_INSTANCE"})," for instance members and ",e.jsx(t,{children:"LINK_STATIC"}),` for static
members.`]})}),`
`,e.jsx(c,{children:"Returns"}),`
`,e.jsx(d,{headers:["Member / Call","Return type","Description"],rows:[[e.jsx(t,{children:"NamespaceSymbol::AddStruct"}),e.jsx(t,{children:"StructSymbol*"}),"Pointer to the registered type."],[e.jsx(t,{children:"StructSymbol::AddField"}),e.jsx(t,{children:"FieldSymbol*"}),"Read SlotIndex to access the field at runtime."],[e.jsx(t,{children:"StructSymbol::AddMethod"}),e.jsx(t,{children:"SymbolBuilder<MethodSymbol>"}),"Chain AddParameter and SetCallback."],[e.jsx(t,{children:"StructSymbol::AddInit"}),e.jsx(t,{children:"SymbolBuilder<ConstructorSymbol>"}),"The callback must return the instance it receives."],[e.jsx(t,{children:"StructSymbol::AddProperty"}),e.jsx(t,{children:"SymbolBuilder<PropertySymbol>"}),"Adds a property to the struct."],[e.jsx(t,{children:"StructSymbol::AddIndexer"}),e.jsx(t,{children:"SymbolBuilder<IndexatorSymbol>"}),"Adds an indexer to the struct."],[e.jsx(t,{children:"StructSymbol::AddOperator"}),e.jsx(t,{children:"SymbolBuilder<OperatorSymbol>"}),"Adds an operator overload to the struct."],[e.jsx(t,{children:"StructSymbol::AddCastOperator"}),e.jsx(t,{children:"SymbolBuilder<OperatorSymbol>"}),"Adds a cast operator to the struct."],[e.jsx(t,{children:"StructSymbol::AddTypeParameter"}),e.jsx(t,{children:"SymbolBuilder<TypeParameterSymbol>"}),"Call Get to obtain the TypeParameterSymbol pointer."]]}),`
`,e.jsx(c,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Struct used as a reference type"}),` — Structs are value types. A
callback that mutates a struct instance through `,e.jsx(t,{children:"context.Args[0]"}),` mutates only the
local copy. The caller's copy is unaffected unless the value is reassigned through a return value or an
explicit out or ref parameter.`]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Constructor does not return self"})," — The"," ",`
`,e.jsx(t,{children:"AddInit"})," callback receives the newly allocated instance as"," ",`
`,e.jsx(t,{children:"context.Args[0]"}),". Returning ",e.jsx(t,{children:"nullptr"}),` or a different object leaves
the new struct uninitialized.`]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Static/instance linking mismatch"})," — A method registered with"," ",`
`,e.jsx(t,{children:"LINK_INSTANCE"})," is called through a variable, while one registered with"," ",`
`,e.jsx(t,{children:"LINK_STATIC"}),` is called through the type name. Mismatching the mode produces a semantic
error or an unexpected `,e.jsx(t,{children:"this"})," argument."]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Field slot index is stale"})," — Always read"," ",`
`,e.jsx(t,{children:"FieldSymbol::SlotIndex"}),` after registration. Hard-coding slot indices breaks when fields
are reordered or when base types are introduced later.`]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Callback not registered"})," — Forgetting"," ",`
`,e.jsx(t,{children:".SetCallback(...)"}),` on a method, property getter, or operator leaves the symbol without a
native target. The call resolves but no code runs.`]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Private field accessed from ShardScript"})," — Fields marked"," ",`
`,e.jsx(t,{children:"ACS_PRIVATE"}),` are accessible only to callbacks registered in the same library. Exposing a
private field in a public API requires a public property or method wrapper.`]})})]}),`
`,e.jsx(c,{children:"Remarks"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Value-type semantics."}),` A struct is a value type. Variables of a struct type hold the data
directly rather than a reference to a heap object. Assigning one struct variable to another copies every field.
Passing a struct to a method passes a copy, so instance methods mutate only the copy that the VM pushes for the
call. Return the modified struct if the caller needs the updated value.`]})}),`
`,e.jsx(a,{tone:"blue",title:"Native library shape",children:e.jsxs(r.p,{children:["A ShardScript native library is any shared library (",e.jsx(t,{children:".dll"})," on Windows, ",e.jsx(t,{children:".so"})," on Linux, ",e.jsx(t,{children:".dylib"})," on macOS) that exports the two C-linkage symbols ",e.jsx(t,{children:"ShardLib_GetMetadata"})," and ",e.jsx(t,{children:"ShardLib_EntryPoint"}),". It can be built from one or many C++ source files, live inside ",e.jsx(t,{children:"ShardScript.Framework"})," or in a completely separate project, and links against the ShardScript runtime shared library using headers from ",e.jsx(t,{children:"ShardScript/include"}),". For the full registration contract, see ",e.jsx(t,{children:"native-library-overview.mdx"}),"."]})}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Struct versus class."})," Use ",e.jsx(t,{children:"SymbolBuilder<StructSymbol>"}),` for small,
immutable or copy-by-value data such as points, colors, ranges, and options. Use`," ",`
`,e.jsx(t,{children:"SymbolBuilder<ClassSymbol>"}),` for identity-bearing objects with lifetime semantics,
native handles, or inheritance requirements.`]})}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Constructors."})," Struct constructors are registered with ",e.jsx(t,{children:"AddInit"}),`, not with
a special constructor name. Multiple overloads are supported. The callback receives the freshly allocated instance
as `,e.jsx(t,{children:"context.Args[0]"}),"; constructor parameters start at"," ",`
`,e.jsx(t,{children:"context.Args[1]"}),". The callback must initialize the fields and return"," ",`
`,e.jsx(t,{children:"self"}),"."]})}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Fields and slot indices."})," Store the ",e.jsx(t,{children:"FieldSymbol*"})," returned by"," ",`
`,e.jsx(t,{children:"AddField"})," and use ",e.jsx(t,{children:"field->SlotIndex"}),` at runtime. The slot index is
stable for the lifetime of the loaded program, so caching it in a static pointer is safe once the entry point has
run. Do not compute slot indices manually.`]})}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Static members."})," A struct may declare static fields and static methods by passing"," ",`
`,e.jsx(t,{children:"LINK_STATIC"}),`. Static fields share storage across all uses of the type, and static methods
have no implicit `,e.jsx(t,{children:"this"}),` argument. Constants and factory methods are common static members on
structs.`]})}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Returning structs."})," To return a struct from a native callback, allocate it with"," ",`
`,e.jsx(t,{children:"context.Collector.AllocateInstance(structSymbol)"}),`, initialize the fields, and return the
instance. The VM copies the value as needed. Returning the instance is correct even for value types because the
collector allocates a temporary object that the VM then copies into the caller's value slot.`]})}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Operators and casts."})," Operator overloads use token types from"," ",`
`,e.jsx(t,{children:"shard::TokenType"}),`. Cast operators produce conversions between the struct and another type.
Instance operators receive `,e.jsx(t,{children:"this"})," as ",e.jsx(t,{children:"context.Args[0]"}),`; static
operators receive the first operand at `,e.jsx(t,{children:"context.Args[0]"}),"."]})}),`
`,e.jsx(a,{tone:"blue",children:e.jsx(r.p,{children:`Prefer structs for data that is small and copy-safe. If the type wraps a native handle, owns unmanaged memory, or
needs reference equality, register it as a class instead.`})}),`
`,e.jsx(c,{children:"Examples"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Basic struct with public fields."}),` This registers a two-dimensional vector with public instance
fields and no constructor.`]})}),`
`,e.jsx(l,{code:`static FieldSymbol* g_vector2X = nullptr;
static FieldSymbol* g_vector2Y = nullptr;

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> geometry(context, L"geometry");
  SymbolBuilder<StructSymbol> v2 = geometry.AddStruct(L"Vector2", ACS_PUBLIC, LINK_INSTANCE);
      g_vector2X = v2.AddField(L"X", TYPE_DOUBLE, LINK_INSTANCE, ACS_PUBLIC);
      g_vector2Y = v2.AddField(L"Y", TYPE_DOUBLE, LINK_INSTANCE, ACS_PUBLIC);
  
}`,language:"cpp",filename:"geometry.shard.cpp"}),`
`,e.jsx(n,{children:e.jsx(r.p,{children:"ShardScript usage:"})}),`
`,e.jsx(l,{code:`using stdio;
using geometry;

namespace demo;

public static func Main() -> void
{
  v: Vector2 = Vector2();
  v.X = 3.0;
  v.Y = 4.0;
  println(v.X + v.Y);   // 7.0
}`,language:"csharp"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Struct with a constructor and an instance method."}),` The constructor initializes the fields; the
instance method reads them through the `,e.jsx(t,{children:"this"})," argument."]})}),`
`,e.jsx(l,{code:`static FieldSymbol* g_vector2X = nullptr;
static FieldSymbol* g_vector2Y = nullptr;

static ObjectInstance* vector2_length(const CallState& context)
{
  ObjectInstance* self = context.Args[0];
  double x = self->GetField(g_vector2X->SlotIndex)->AsDouble();
  double y = self->GetField(g_vector2Y->SlotIndex)->AsDouble();

  return context.Collector.FromValue(std::sqrt(x * x + y * y));
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> geometry(context, L"geometry");
  SymbolBuilder<StructSymbol> v2 = geometry.AddStruct(L"Vector2", ACS_PUBLIC, LINK_INSTANCE);
      g_vector2X = v2.AddField(L"X", TYPE_DOUBLE, LINK_INSTANCE, ACS_PUBLIC);
      g_vector2Y = v2.AddField(L"Y", TYPE_DOUBLE, LINK_INSTANCE, ACS_PUBLIC);

      v2.AddInit()
      .AddParameter(L"x", TYPE_DOUBLE)
      .AddParameter(L"y", TYPE_DOUBLE)
      .SetCallback([](const CallState& context)
      {
              ObjectInstance* self = context.Args[0];
              self->SetField(g_vector2X->SlotIndex, context.Args[1]);
              self->SetField(g_vector2Y->SlotIndex, context.Args[2]);
              return self;
      });

      v2.AddMethod(L"Length", TYPE_DOUBLE, LINK_INSTANCE, ACS_PUBLIC)
      .SetCallback(&vector2_length);
  
}`,language:"cpp",filename:"geometry.shard.cpp"}),`
`,e.jsx(n,{children:e.jsx(r.p,{children:"ShardScript usage:"})}),`
`,e.jsx(l,{code:`using stdio;
using geometry;

namespace demo;

public static func Main() -> void
{
  v: Vector2 = new Vector2(3.0, 4.0);
  len: double = v.Length();
  println(len);   // 5.0
}`,language:"csharp"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Static factory method on a struct."}),` Static methods are called through the type name and have no
implicit `,e.jsx(t,{children:"this"})," argument."]})}),`
`,e.jsx(l,{code:`static StructSymbol* g_vector2Symbol = nullptr;
static FieldSymbol* g_vector2X = nullptr;
static FieldSymbol* g_vector2Y = nullptr;

static ObjectInstance* vector2_zero(const CallState& context)
{
  ObjectInstance* value = context.Collector.AllocateInstance(g_vector2Symbol);
  value->SetField(g_vector2X->SlotIndex, context.Collector.FromValue(0.0));
  value->SetField(g_vector2Y->SlotIndex, context.Collector.FromValue(0.0));
  return value;
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> geometry(context, L"geometry");
  g_vector2Symbol = geometry.AddStruct(L"Vector2", ACS_PUBLIC, LINK_INSTANCE);
      g_vector2X = g_vector2Symbol.AddField(L"X", TYPE_DOUBLE, LINK_INSTANCE, ACS_PUBLIC);
      g_vector2Y = g_vector2Symbol.AddField(L"Y", TYPE_DOUBLE, LINK_INSTANCE, ACS_PUBLIC);

      g_vector2Symbol.AddMethod(L"Zero", g_vector2Symbol, LINK_STATIC, ACS_PUBLIC)
      .SetCallback(&vector2_zero);
  
}`,language:"cpp",filename:"geometry.shard.cpp"}),`
`,e.jsx(n,{children:e.jsx(r.p,{children:"ShardScript usage:"})}),`
`,e.jsx(l,{code:`using stdio;
using geometry;

namespace demo;

public static func Main() -> void
{
  origin: Vector2 = Vector2.Zero();
  println(origin.X);   // 0.0
}`,language:"csharp"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Returning a struct by value from a method."}),` The callback allocates a new struct instance,
initializes it, and returns it. The VM copies the result into the caller's value slot.`]})}),`
`,e.jsx(l,{code:`static StructSymbol* g_vector2Symbol = nullptr;
static FieldSymbol* g_vector2X = nullptr;
static FieldSymbol* g_vector2Y = nullptr;

static ObjectInstance* vector2_add(const CallState& context)
{
  ObjectInstance* left = context.Args[0];
  ObjectInstance* right = context.Args[1];

  double x = left->GetField(g_vector2X->SlotIndex)->AsDouble()
       + right->GetField(g_vector2X->SlotIndex)->AsDouble();
  double y = left->GetField(g_vector2Y->SlotIndex)->AsDouble()
       + right->GetField(g_vector2Y->SlotIndex)->AsDouble();

  ObjectInstance* result = context.Collector.AllocateInstance(g_vector2Symbol);
  result->SetField(g_vector2X->SlotIndex, context.Collector.FromValue(x));
  result->SetField(g_vector2Y->SlotIndex, context.Collector.FromValue(y));
  return result;
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> geometry(context, L"geometry");
  g_vector2Symbol = geometry.AddStruct(L"Vector2", ACS_PUBLIC, LINK_INSTANCE);
      g_vector2X = g_vector2Symbol.AddField(L"X", TYPE_DOUBLE, LINK_INSTANCE, ACS_PUBLIC);
      g_vector2Y = g_vector2Symbol.AddField(L"Y", TYPE_DOUBLE, LINK_INSTANCE, ACS_PUBLIC);

      g_vector2Symbol.AddOperator(shard::TokenType::AddOperator, g_vector2Symbol, LINK_STATIC)
      .AddParameter(L"left", g_vector2Symbol)
      .AddParameter(L"right", g_vector2Symbol)
      .SetCallback(&vector2_add);
  
}`,language:"cpp",filename:"geometry.shard.cpp"}),`
`,e.jsx(n,{children:e.jsx(r.p,{children:"ShardScript usage:"})}),`
`,e.jsx(l,{code:`using stdio;
using geometry;

namespace demo;

public static func Main() -> void
{
  a: Vector2 = new Vector2(1.0, 2.0);
  b: Vector2 = new Vector2(3.0, 4.0);
  c: Vector2 = a + b;
  println(c.X);   // 4.0
  println(c.Y);   // 6.0
}`,language:"csharp"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Private backing field with a public property."}),` Native handles or cached values can be stored in
private fields and exposed through public properties.`]})}),`
`,e.jsx(l,{code:`static FieldSymbol* g_colorR = nullptr;
static FieldSymbol* g_colorG = nullptr;
static FieldSymbol* g_colorB = nullptr;
static FieldSymbol* g_colorPacked = nullptr;

static ObjectInstance* color_get_packed(const CallState& context)
{
  ObjectInstance* self = context.Args[0];

  std::int64_t r = self->GetField(g_colorR->SlotIndex)->AsInteger();
  std::int64_t g = self->GetField(g_colorG->SlotIndex)->AsInteger();
  std::int64_t b = self->GetField(g_colorB->SlotIndex)->AsInteger();
  std::int64_t packed = (r << 16) | (g << 8) | b;

  return context.Collector.FromValue(packed);
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> graphics(context, L"graphics");
  SymbolBuilder<StructSymbol> color = graphics.AddStruct(L"Color", ACS_PUBLIC, LINK_INSTANCE);
      g_colorR = color.AddField(L"R", TYPE_INT, LINK_INSTANCE, ACS_PUBLIC);
      g_colorG = color.AddField(L"G", TYPE_INT, LINK_INSTANCE, ACS_PUBLIC);
      g_colorB = color.AddField(L"B", TYPE_INT, LINK_INSTANCE, ACS_PUBLIC);
      g_colorPacked = color.AddField(L"_packed", TYPE_INT, LINK_INSTANCE, ACS_PRIVATE);

      color.AddProperty(L"Packed", TYPE_INT, LINK_INSTANCE, ACS_PUBLIC)
      .AddGetter()
      .SetCallback(&color_get_packed);
  
}`,language:"cpp",filename:"graphics.shard.cpp"}),`
`,e.jsx(n,{children:e.jsx(r.p,{children:"ShardScript usage:"})}),`
`,e.jsx(l,{code:`using stdio;
using graphics;

namespace demo;

public static func Main() -> void
{
  c: Color = Color();
  c.R = 255;
  c.G = 128;
  c.B = 64;
  println(c.Packed);   // 16744640
}`,language:"csharp"}),`
`,e.jsx(c,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx(t,{children:"library-building/class-symbol-builder"})," — class registration."]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx(t,{children:"library-building/property-symbol-builder"})," — property registration for struct members."]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx(t,{children:"library-building/working-with-fields"})," — reading and writing fields."]})})]}),`
`,e.jsx(c,{children:"Source"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:["The native side of this API is implemented in ",e.jsx(t,{children:"shard/semantic/SymbolBuilder.hpp"}),`.
View the source on GitHub: `,e.jsx(t,{children:"https://github.com/Rikitav/ShardScript/blob/main/ShardScript/include/shard/semantic/SymbolBuilder.hpp"}),"."]})})]})}function m(i={}){const{wrapper:r}=i.components||{};return r?e.jsx(r,{...i,children:e.jsx(h,{...i})}):h(i)}function o(i,r){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default};
