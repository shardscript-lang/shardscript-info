import{j as e}from"./index-DIkNH1R5.js";function h(a){const t={p:"p",...a.components},{Bullet:i,Callout:d,CodeBlock:s,DocsTable:o,H2:l,InlineCode:n,Prose:r}=t;return i||c("Bullet"),d||c("Callout"),s||c("CodeBlock"),o||c("DocsTable"),l||c("H2"),n||c("InlineCode"),r||c("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(l,{children:"Summary"}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:["The ",e.jsx(n,{children:"SymbolBuilder<ConstructorSymbol>"}),` API registers constructors on a
`,e.jsx(n,{children:"ClassSymbol"})," or ",e.jsx(n,{children:"StructSymbol"}),`. Constructors are created
through `,e.jsx(n,{children:"AddInit()"}),`, configured with parameters and a native callback, and invoked by
the runtime when ShardScript code uses the `,e.jsx(n,{children:"new"}),` expression. The callback receives the
freshly allocated instance as `,e.jsx(n,{children:"context.Args[0]"}),`, initializes its state, and must return
that same instance.`]})}),`
`,e.jsx(l,{children:"Syntax"}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:["Constructors are registered from inside an ",e.jsx(n,{children:"AddClass"}),` or
`,e.jsx(n,{children:"AddStruct"})," registration block. ",e.jsx(n,{children:"AddInit()"}),` returns a
`,e.jsx(n,{children:"SymbolBuilder<ConstructorSymbol>"}),` that is chained with parameter and callback
configuration.`]})}),`
`,e.jsx(s,{code:"SymbolBuilder<ConstructorSymbol> AddInit(SymbolAccesibility access = SymbolAccesibility::Public);",language:"cpp"}),`
`,e.jsx(r,{children:e.jsx(t.p,{children:"The constructor builder supports the following fluent methods:"})}),`
`,e.jsx(s,{code:`SymbolBuilder<ConstructorSymbol>& AddParameter(
  const std::wstring& name,
  TypeSymbol* type);

SymbolBuilder<ConstructorSymbol>& SetCallback(
  MethodSymbolDelegate callback);

SymbolBuilder<TypeParameterSymbol> AddTypeParameter(
  const std::wstring& name);`,language:"cpp"}),`
`,e.jsx(r,{children:e.jsx(t.p,{children:"The native callback has the same signature as a method callback:"})}),`
`,e.jsx(s,{code:"shard::ObjectInstance* Callback(const shard::CallState& context);",language:"cpp"}),`
`,e.jsx(l,{children:"Parameters / Arguments"}),`
`,e.jsx(o,{headers:["Method","Parameters","Returns","Description"],rows:[[e.jsx(n,{children:"AddInit"}),e.jsx(e.Fragment,{children:e.jsx(n,{children:"access = SymbolAccesibility::Public"})}),e.jsx(n,{children:"SymbolBuilder<ConstructorSymbol>"}),"Optional accessibility. Defaults to public. Controls which ShardScript code can invoke the constructor."],[e.jsx(n,{children:"AddParameter"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"name"}),", ",e.jsx(n,{children:"type"})]}),e.jsx(n,{children:"SymbolBuilder<ConstructorSymbol>&"}),"The parameter name as it appears in ShardScript source and its <InlineCode>TypeSymbol*</InlineCode>."],[e.jsx(n,{children:"SetCallback"}),e.jsx(e.Fragment,{children:e.jsx(n,{children:"callback"})}),e.jsx(n,{children:"SymbolBuilder<ConstructorSymbol>&"}),"A <InlineCode>MethodSymbolDelegate</InlineCode> function pointer or lambda that the runtime invokes to initialize the instance."],[e.jsx(n,{children:"AddTypeParameter"}),e.jsx(e.Fragment,{children:e.jsx(n,{children:"name"})}),e.jsx(n,{children:"SymbolBuilder<TypeParameterSymbol>"}),"The name of a generic type parameter for a generic constructor."]]}),`
`,e.jsx(l,{children:"Returns"}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"AddInit"})," returns a ",e.jsx(n,{children:"SymbolBuilder<ConstructorSymbol>"}),`.
`,e.jsx(n,{children:"AddParameter"})," and ",e.jsx(n,{children:"SetCallback"}),` return a reference to the same
constructor builder so calls can be chained. `,e.jsx(n,{children:"AddTypeParameter"}),` returns a
`,e.jsx(n,{children:"SymbolBuilder<TypeParameterSymbol>"})," for the newly declared generic parameter."]})}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:["The native callback must return an ",e.jsx(n,{children:"ObjectInstance*"}),` that points to the initialized
instance. The runtime expects this to be the same pointer that was passed as
`,e.jsx(n,{children:"context.Args[0]"}),"."]})}),`
`,e.jsx(l,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Callback not registered"}),` — Forgetting to call
`,e.jsx(n,{children:".SetCallback(...)"}),` leaves the constructor registered but without a native target.
The `,e.jsx(n,{children:"new"})," expression resolves but no initialization code runs."]})}),e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Wrong instance returned"}),` — Returning a different
`,e.jsx(n,{children:"ObjectInstance*"})," than ",e.jsx(n,{children:"context.Args[0]"}),` breaks object identity
and can confuse the garbage collector or produce an uninitialized object at the call site.`]})}),e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Argument index misalignment"}),` —
`,e.jsx(n,{children:"context.Args[0]"}),` is the newly allocated instance. The first constructor parameter is
at `,e.jsx(n,{children:"context.Args[1]"}),". Reading from index ",e.jsx(n,{children:"0"}),` as a parameter
value reads the instance itself.`]})}),e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Ambiguous overloads"}),` — Multiple
`,e.jsx(n,{children:"AddInit"}),` overloads with identical parameter counts and types make constructor
resolution ambiguous. Overloads must be distinguishable by parameter count or parameter types.`]})}),e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Inaccessible constructor"}),` — A constructor registered with
`,e.jsx(n,{children:"ACS_PRIVATE"}),` cannot be invoked by ShardScript
code outside its visibility boundary.`]})}),e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Field slot used before registration"}),` — Reading or writing a
field in the constructor callback requires the field to have been registered first so that its
`,e.jsx(n,{children:"SlotIndex"})," is valid."]})})]}),`
`,e.jsx(l,{children:"Remarks"}),`
`,e.jsx(d,{tone:"blue",title:"Native library shape",children:e.jsxs(t.p,{children:["A ShardScript native library is any shared library (",e.jsx(n,{children:".dll"})," on Windows, ",e.jsx(n,{children:".so"})," on Linux, ",e.jsx(n,{children:".dylib"})," on macOS) that exports the two C-linkage symbols ",e.jsx(n,{children:"ShardLib_GetMetadata"})," and ",e.jsx(n,{children:"ShardLib_EntryPoint"}),". It can be built from one or many C++ source files, live inside ",e.jsx(n,{children:"ShardScript.Framework"})," or in a completely separate project, and links against the ShardScript runtime shared library using headers from ",e.jsx(n,{children:"ShardScript/include"}),". For the full registration contract, see ",e.jsx(n,{children:"native-library-overview.mdx"}),"."]})}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Constructor callbacks are instance initializers."}),` Unlike ordinary methods, a constructor is
not registered with an explicit `,e.jsx(n,{children:"SymbolLinking"}),` argument because
`,e.jsx(n,{children:"AddInit"}),` always describes an instance initializer. The runtime allocates storage for
the object before the callback runs and passes that instance as `,e.jsx(n,{children:"context.Args[0]"}),`. The
callback's only responsibility is to fill in fields, validate arguments, and return the same pointer.`]})}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Multiple overloads are supported."}),` You can register several
`,e.jsx(n,{children:"AddInit"})," chains on the same type. ShardScript resolves a ",e.jsx(n,{children:"new"}),`
call by matching the supplied argument count and types against the registered parameter lists.`]})}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Structs follow the same callback contract as classes."}),` Even though structs are value types,
the runtime still passes a freshly allocated instance to the constructor callback and expects the callback to
return it. The VM copies the value as needed after initialization.`]})}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Generic constructors."})," When ",e.jsx(n,{children:"AddTypeParameter"}),` is used, the concrete
type substitutions are available at runtime through `,e.jsx(n,{children:"context.Frame->TypeArguments"}),` in
the order in which the parameters were declared.`]})}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Field handles must be captured outside the entry point."}),` Store the
`,e.jsx(n,{children:"FieldSymbol*"})," returned by ",e.jsx(n,{children:"AddField"}),` in a static variable so it
can be used inside the constructor callback. The `,e.jsx(n,{children:"SlotIndex"}),` member is the stable
runtime offset used by `,e.jsx(n,{children:"ObjectInstance::GetField"}),` and
`,e.jsx(n,{children:"ObjectInstance::SetField"}),"."]})}),`
`,e.jsx(d,{tone:"blue",children:e.jsxs(t.p,{children:["Always return ",e.jsx(n,{children:"self"}),` from a constructor callback. Returning
`,e.jsx(n,{children:"nullptr"})," or a different object is undefined behavior for object construction."]})}),`
`,e.jsx(d,{tone:"amber",title:"AddInit is not a static type initializer",children:e.jsxs(t.p,{children:[e.jsx(n,{children:"AddInit"})," registers an instance constructor. It is invoked per ",e.jsx(n,{children:"new"}),`
expression. Static type initialization is handled separately by the runtime and is not configured through
`,e.jsx(n,{children:"ConstructorSymbol"}),"."]})}),`
`,e.jsx(l,{children:"Examples"}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Basic class constructor."}),` A single-parameter constructor stores its argument in a private
instance field.`]})}),`
`,e.jsx(s,{code:`static FieldSymbol* g_playerNameField = nullptr;

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> game(context, L"game");

  game.AddClass(L"Player", ACS_PUBLIC, LINK_INSTANCE, [](SymbolBuilder<ClassSymbol> player)
  {
      g_playerNameField = player.AddField(
          L"_name",
          TYPE_STRING,
          LINK_INSTANCE,
          ACS_PRIVATE);

      player.AddInit()
          .AddParameter(L"name", TYPE_STRING)
          .SetCallback([](const CallState& context)
          {
              ObjectInstance* self = context.Args[0];
              ObjectInstance* name = context.Args[1];
              self->SetField(g_playerNameField->SlotIndex, name);
              return self;
          });
  });
}`,language:"cpp",filename:"game.shard.cpp"}),`
`,e.jsx(r,{children:e.jsx(t.p,{children:"ShardScript usage:"})}),`
`,e.jsx(s,{code:`using stdio;
using game;

namespace demo;

public static func Main() -> void
{
  hero: Player = new Player("Aria");
  println(hero);
}`,language:"csharp"}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Multiple constructor overloads."}),` Two overloads differ by parameter count so ShardScript can
construct the object with or without an explicit identifier.`]})}),`
`,e.jsx(s,{code:`static FieldSymbol* g_deviceIdField = nullptr;
static FieldSymbol* g_deviceLabelField = nullptr;

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> devices(context, L"devices");

  devices.AddClass(L"Device", ACS_PUBLIC, LINK_INSTANCE, [](SymbolBuilder<ClassSymbol> device)
  {
      g_deviceIdField = device.AddField(
          L"_id",
          TYPE_INT,
          LINK_INSTANCE,
          ACS_PRIVATE);

      g_deviceLabelField = device.AddField(
          L"_label",
          TYPE_STRING,
          LINK_INSTANCE,
          ACS_PRIVATE);

      device.AddInit()
          .AddParameter(L"id", TYPE_INT)
          .SetCallback([](const CallState& context)
          {
              ObjectInstance* self = context.Args[0];
              ObjectInstance* id = context.Args[1];
              self->SetField(g_deviceIdField->SlotIndex, id);
              self->SetField(g_deviceLabelField->SlotIndex, context.Collector.FromValue(L""));
              return self;
          });

      device.AddInit()
          .AddParameter(L"id", TYPE_INT)
          .AddParameter(L"label", TYPE_STRING)
          .SetCallback([](const CallState& context)
          {
              ObjectInstance* self = context.Args[0];
              ObjectInstance* id = context.Args[1];
              ObjectInstance* label = context.Args[2];
              self->SetField(g_deviceIdField->SlotIndex, id);
              self->SetField(g_deviceLabelField->SlotIndex, label);
              return self;
          });
  });
}`,language:"cpp",filename:"devices.shard.cpp"}),`
`,e.jsx(r,{children:e.jsx(t.p,{children:"ShardScript usage:"})}),`
`,e.jsx(s,{code:`using stdio;
using devices;

namespace demo;

public static func Main() -> void
{
  a: Device = new Device(1);
  b: Device = new Device(2, "sensor");
}`,language:"csharp"}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Struct constructor."})," Value types use the same ",e.jsx(n,{children:"AddInit"}),` pattern and
return the allocated instance.`]})}),`
`,e.jsx(s,{code:`static FieldSymbol* g_pointXField = nullptr;
static FieldSymbol* g_pointYField = nullptr;

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> geometry(context, L"geometry");

  geometry.AddStruct(L"Point", ACS_PUBLIC, LINK_INSTANCE, [](SymbolBuilder<StructSymbol> point)
  {
      g_pointXField = point.AddField(
          L"X",
          TYPE_INT,
          LINK_INSTANCE,
          ACS_PUBLIC);

      g_pointYField = point.AddField(
          L"Y",
          TYPE_INT,
          LINK_INSTANCE,
          ACS_PUBLIC);

      point.AddInit()
          .AddParameter(L"x", TYPE_INT)
          .AddParameter(L"y", TYPE_INT)
          .SetCallback([](const CallState& context)
          {
              ObjectInstance* self = context.Args[0];
              ObjectInstance* x = context.Args[1];
              ObjectInstance* y = context.Args[2];
              self->SetField(g_pointXField->SlotIndex, x);
              self->SetField(g_pointYField->SlotIndex, y);
              return self;
          });
  });
}`,language:"cpp",filename:"geometry.shard.cpp"}),`
`,e.jsx(r,{children:e.jsx(t.p,{children:"ShardScript usage:"})}),`
`,e.jsx(s,{code:`using stdio;
using geometry;

namespace demo;

public static func Main() -> void
{
  origin: Point = new Point(0, 0);
  println(origin.X);
  println(origin.Y);
}`,language:"csharp"}),`
`,e.jsx(l,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"library-building/class-symbol-builder"})," — registering classes."]})}),e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"library-building/method-symbol-builder"})," — registering methods."]})}),e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"library-building/working-with-objects"})," — allocating and initializing objects in callbacks."]})})]}),`
`,e.jsx(l,{children:"Source"}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:["The native side of this API is implemented in ",e.jsx(n,{children:"shard/semantic/SymbolBuilder.hpp"}),`.
View the source on GitHub: `,e.jsx(n,{children:"https://github.com/Rikitav/ShardScript/blob/main/ShardScript/include/shard/semantic/SymbolBuilder.hpp"}),"."]})})]})}function u(a={}){const{wrapper:t}=a.components||{};return t?e.jsx(t,{...a,children:e.jsx(h,{...a})}):h(a)}function c(a,t){throw new Error("Expected component `"+a+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};
