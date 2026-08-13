import{j as e}from"./index-DkFwvLJL.js";function h(i){const r={p:"p",...i.components},{Bullet:s,Callout:d,CodeBlock:a,DocsTable:o,H2:l,InlineCode:t,Prose:n}=r;return s||c("Bullet"),d||c("Callout"),a||c("CodeBlock"),o||c("DocsTable"),l||c("H2"),t||c("InlineCode"),n||c("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(l,{children:"Summary"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:["The ",e.jsx(t,{children:"PropertySymbol"}),` builder registers a ShardScript property on a class, struct, or
interface from inside a native C++ library. A property exposes one or two accessor methods — a getter, a
setter, or both — and may optionally be backed by a compiler-managed field. Registration is fluent: call
`,e.jsx(t,{children:"AddProperty"})," on a type builder, then chain ",e.jsx(t,{children:"AddGetter"}),","," ",`
`,e.jsx(t,{children:"AddSetter"}),", and ",e.jsx(t,{children:"SetCallback"})," to bind native callbacks."]})}),`
`,e.jsx(l,{children:"Syntax"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:["Properties are created from a ",e.jsx(t,{children:"SymbolBuilder<ClassSymbol>"}),","," ",`
`,e.jsx(t,{children:"SymbolBuilder<StructSymbol>"}),", or"," ",`
`,e.jsx(t,{children:"SymbolBuilder<InterfaceSymbol>"}),"."]})}),`
`,e.jsx(a,{code:`// Register a read-only static property.
type.AddProperty(L"Pi", TYPE_DOUBLE, LINK_STATIC, ACS_PUBLIC)
  .AddGetter()
  .SetCallback(&get_pi);

// Register a read-write instance property.
type.AddProperty(L"Length", TYPE_INT, LINK_INSTANCE, ACS_PUBLIC)
  .AddGetter().SetCallback(&get_length)
  .AddSetter().SetCallback(&set_length);

// Register a property with an auto-backing field.
FieldSymbol* backing = type.AddProperty(L"Name", TYPE_STRING, LINK_INSTANCE, ACS_PUBLIC)
  .AddBackingField(ACS_PRIVATE)
  .AddGetter().SetCallback(&get_name)
  .AddSetter().SetCallback(&set_name)
  .Get();`,language:"cpp"}),`
`,e.jsx(l,{children:"Parameters / Arguments"}),`
`,e.jsx(o,{headers:["Parameter","Type","Description"],rows:[[e.jsx(t,{children:"name"}),e.jsx(t,{children:"const wchar_t*"}),'Required. The ShardScript identifier of the property, for example L"Length".'],[e.jsx(t,{children:"type"}),e.jsx(t,{children:"TypeSymbol*"}),"Required. The property type. Use built-in constants such as TYPE_INT, TYPE_DOUBLE, TYPE_STRING, TYPE_BOOL, or a TypeSymbol*."],[e.jsx(t,{children:"linking"}),e.jsx(t,{children:"SymbolLinking"}),"Required. LINK_STATIC for a type-level property; LINK_INSTANCE for an instance property."],[e.jsx(t,{children:"accessibility"}),e.jsx(t,{children:"SymbolAccesibility"}),"Required. ACS_PUBLIC or ACS_PRIVATE. Controls which ShardScript code can access the property."]]}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"Accessor builder methods"})}),`
`,e.jsx(o,{headers:["Method","Description"],rows:[[e.jsx(t,{children:"AddGetter()"}),"Adds a getter accessor to the property. The callback must return a value of the property type."],[e.jsx(t,{children:"AddSetter()"}),"Adds a setter accessor to the property. The callback receives the new value as its last argument and returns nullptr."],[e.jsx(t,{children:"AddBackingField(accessibility)"}),"Creates a compiler-managed field that backs the property. Returns a FieldSymbol* that can be cached for runtime read/write."],[e.jsx(t,{children:"SetCallback(callback)"}),"Binds a native callback to the most recently added accessor (getter or setter)."]]}),`
`,e.jsx(l,{children:"Returns"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx(t,{children:"AddProperty"})," returns a ",e.jsx(t,{children:"PropertySymbol&"}),` (wrapped by the
fluent `,e.jsx(t,{children:"SymbolBuilder<PropertySymbol>"}),`) so you can chain accessor registration.
`,e.jsx(t,{children:"AddBackingField"})," returns ",e.jsx(t,{children:"FieldSymbol*"}),", which exposes"," ",`
`,e.jsx(t,{children:"SlotIndex"})," for runtime field access. ",e.jsx(t,{children:"SetCallback"}),` returns a
reference to the accessor builder so additional parameters may be chained, although property accessors
typically take no explicit parameters beyond the implicit `,e.jsx(t,{children:"this"})," and setter value."]})}),`
`,e.jsx(l,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Accessor callback never invoked"})," — Forgetting"," ",`
`,e.jsx(t,{children:".SetCallback(...)"})," after ",e.jsx(t,{children:"AddGetter"})," or"," ",`
`,e.jsx(t,{children:"AddSetter"}),` registers the accessor without a native target. Reading or writing the
property resolves but no code runs.`]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Static property accessed through an instance"}),` — A property
registered with `,e.jsx(t,{children:"LINK_STATIC"}),` must be read or written through the type name, for
example `,e.jsx(t,{children:"Type.Property"}),". Instance access produces a semantic error."]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Instance property accessed through the type"}),` — A property
registered with `,e.jsx(t,{children:"LINK_INSTANCE"}),` must be accessed through an object reference, for
example `,e.jsx(t,{children:"obj.Property"}),". Type-level access produces a semantic error."]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Setter argument misalignment"}),` — For an instance setter,
`,e.jsx(t,{children:"context.Args[0]"})," is ",e.jsx(t,{children:"this"})," and"," ",`
`,e.jsx(t,{children:"context.Args[1]"})," is the new value. For a static setter,"," ",`
`,e.jsx(t,{children:"context.Args[0]"}),` is the new value. Reading at the wrong index causes incorrect values
or a crash.`]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Return type mismatch"}),` — A getter callback must return an
`,e.jsx(t,{children:"ObjectInstance*"}),` whose runtime type matches the registered property type. Returning
a differently typed value may corrupt the managed heap or cause a cast failure.`]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Backing field accessed before registration"})," — The"," ",`
`,e.jsx(t,{children:"FieldSymbol*"})," returned by ",e.jsx(t,{children:"AddBackingField"}),` is valid only after
`,e.jsx(t,{children:"SHARDLIB_ENTRYPOINT"})," runs. Do not read ",e.jsx(t,{children:"SlotIndex"}),` during static
initialization.`]})})]}),`
`,e.jsx(l,{children:"Remarks"}),`
`,e.jsx(d,{tone:"blue",title:"Native library shape",children:e.jsxs(r.p,{children:["A ShardScript native library is any shared library (",e.jsx(t,{children:".dll"})," on Windows, ",e.jsx(t,{children:".so"})," on Linux, ",e.jsx(t,{children:".dylib"})," on macOS) that exports the two C-linkage symbols ",e.jsx(t,{children:"ShardLib_GetMetadata"})," and ",e.jsx(t,{children:"ShardLib_EntryPoint"}),". It can be built from one or many C++ source files, live inside ",e.jsx(t,{children:"ShardScript.Framework"})," or in a completely separate project, and links against the ShardScript runtime shared library using headers from ",e.jsx(t,{children:"ShardScript/include"}),". For the full registration contract, see ",e.jsx(t,{children:"native-library-overview.mdx"}),"."]})}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Getter callback contract."})," A getter callback receives the same"," ",`
`,e.jsx(t,{children:"shard::CallState"})," as a method. For an instance property,"," ",`
`,e.jsx(t,{children:"context.Args[0]"})," is ",e.jsx(t,{children:"this"}),`. For a static property, there is no
implicit `,e.jsx(t,{children:"this"})," and ",e.jsx(t,{children:"context.Args"}),` is empty. The callback must
return a GC-owned `,e.jsx(t,{children:"ObjectInstance*"})," produced by"," ",`
`,e.jsx(t,{children:"context.Collector.FromValue(...)"})," or a similar allocator."]})}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Setter callback contract."}),` A setter callback receives the new value as its last argument and
must return `,e.jsx(t,{children:"nullptr"}),` (the property expression evaluates to void). For an instance
property, `,e.jsx(t,{children:"context.Args[0]"})," is ",e.jsx(t,{children:"this"})," and"," ",`
`,e.jsx(t,{children:"context.Args[1]"})," is the value. For a static property,"," ",`
`,e.jsx(t,{children:"context.Args[0]"})," is the value."]})}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Auto-backing fields."})," Call ",e.jsx(t,{children:"AddBackingField(accessibility)"}),` to create a
compiler-managed field for the property. Store the returned `,e.jsx(t,{children:"FieldSymbol*"})," and use"," ",`
`,e.jsx(t,{children:"instance->SetField(backingField->SlotIndex, value)"})," and"," ",`
`,e.jsx(t,{children:"instance->GetField(backingField->SlotIndex)"}),` in the getter and setter callbacks. The
field's accessibility controls whether ShardScript code can read it directly; in most cases it should be
`,e.jsx(t,{children:"ACS_PRIVATE"})," so callers are forced through the property accessors."]})}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Static properties for constants."}),` A read-only static property is the preferred way to expose
library constants from a native library. It is safer than a public static field because there is no setter, and
it matches the pattern used by libraries such as `,e.jsx(t,{children:"shard.math"}),"."]})}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Properties on interfaces."}),` Interfaces can declare properties so that implementing types must
provide matching accessors. Interface property registration uses the same `,e.jsx(t,{children:"AddProperty"}),`
call, but without `,e.jsx(t,{children:"SetCallback"}),`; the accessor bodies are supplied by the implementing
class or struct.`]})}),`
`,e.jsx(d,{tone:"blue",children:e.jsxs(r.p,{children:["Prefer ",e.jsx(t,{children:"AddBackingField"}),` when the property simply stores and returns a value. Use
explicit getter/setter callbacks when the read or write involves computation, validation, or a side effect such
as updating a native handle.`]})}),`
`,e.jsx(l,{children:"Examples"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Read-only static property."}),` This is the most common way to expose a constant from a native
library. There is no setter and no instance state.`]})}),`
`,e.jsx(a,{code:`static ObjectInstance* get_pi(const CallState& context)
{
  // No arguments for a static getter; simply return the constant value.
  return context.Collector.FromValue(3.14159);
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> math(context, L"math");

  math.AddClass(L"Math", ACS_PUBLIC, LINK_STATIC, [](SymbolBuilder<ClassSymbol> mathClass)
  {
      mathClass.AddProperty(L"Pi", TYPE_DOUBLE, LINK_STATIC, ACS_PUBLIC)
          .AddGetter()
          .SetCallback(&get_pi);
  });
}`,language:"cpp",filename:"math.shard.cpp"}),`
`,e.jsx(n,{children:e.jsx(r.p,{children:"ShardScript usage:"})}),`
`,e.jsx(a,{code:`using stdio;
using math;

namespace demo;

public static func Main() -> void
{
  radius: double = 2.0;
  circumference: double = 2.0 * Math.Pi * radius;
  println(circumference);   // 12.56636
}`,language:"csharp"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Read-write instance property with explicit callbacks."}),` The getter computes a value from a
private native handle; the setter validates the input before storing it.`]})}),`
`,e.jsx(a,{code:`static FieldSymbol* g_bufferHandle = nullptr;

static ObjectInstance* get_capacity(const CallState& context)
{
  ObjectInstance* self = context.Args[0];
  ObjectInstance* handleObj = self->GetField(g_bufferHandle->SlotIndex);
  std::int64_t handle = handleObj->AsInteger();

  // Capacity is derived from the opaque native handle value in this example.
  std::int64_t capacity = handle * 1024;

  return context.Collector.FromValue(capacity);
}

static ObjectInstance* set_capacity(const CallState& context)
{
  ObjectInstance* self = context.Args[0];
  std::int64_t newCapacity = context.Args[1]->AsInteger();

  if (newCapacity < 0)
  {
      // Negative capacity is not meaningful for this type.
      newCapacity = 0;
  }

  // Convert the managed capacity back into the opaque handle representation.
  std::int64_t handle = newCapacity / 1024;
  self->SetField(g_bufferHandle->SlotIndex, context.Collector.FromValue(handle));

  return nullptr;
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> buffers(context, L"buffers");

  buffers.AddClass(L"Buffer", ACS_PUBLIC, LINK_INSTANCE, [](SymbolBuilder<ClassSymbol> buffer)
  {
      g_bufferHandle = buffer.AddField(L"_handle", TYPE_INT, LINK_INSTANCE, ACS_PRIVATE);

      buffer.AddProperty(L"Capacity", TYPE_INT, LINK_INSTANCE, ACS_PUBLIC)
          .AddGetter().SetCallback(&get_capacity)
          .AddSetter().SetCallback(&set_capacity);
  });
}`,language:"cpp",filename:"buffers.shard.cpp"}),`
`,e.jsx(n,{children:e.jsx(r.p,{children:"ShardScript usage:"})}),`
`,e.jsx(a,{code:`using stdio;
using buffers;

namespace demo;

public static func Main() -> void
{
  b: Buffer = new Buffer();
  b.Capacity = 4096;
  println(b.Capacity);   // 4096
}`,language:"csharp"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Property with an auto-backing field."}),` The compiler allocates the storage. The native callbacks
read and write the backing field slot directly.`]})}),`
`,e.jsx(a,{code:`static FieldSymbol* g_nameField = nullptr;

static ObjectInstance* get_name(const CallState& context)
{
  ObjectInstance* self = context.Args[0];
  ObjectInstance* name = self->GetField(g_nameField->SlotIndex);

  if (name == nullptr || name == GarbageCollector::NullInstance)
  {
      // Return an empty string when no value has been set.
      return context.Collector.FromValue(std::wstring());
  }

  return name;
}

static ObjectInstance* set_name(const CallState& context)
{
  ObjectInstance* self = context.Args[0];
  ObjectInstance* newName = context.Args[1];

  if (newName == nullptr || newName == GarbageCollector::NullInstance)
  {
      // Treat null assignment as an empty string for this property.
      self->SetField(g_nameField->SlotIndex, context.Collector.FromValue(std::wstring()));
  }
  else
  {
      self->SetField(g_nameField->SlotIndex, newName);
  }

  return nullptr;
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> config(context, L"config");

  config.AddClass(L"Settings", ACS_PUBLIC, LINK_INSTANCE, [](SymbolBuilder<ClassSymbol> settings)
  {
      SymbolBuilder<PropertySymbol> nameProp = settings.AddProperty(L"Name", TYPE_STRING, LINK_INSTANCE, ACS_PUBLIC);

      g_nameField = nameProp.AddBackingField(ACS_PRIVATE);
      nameProp.AddGetter().SetCallback(&get_name);
      nameProp.AddSetter().SetCallback(&set_name);
  });
}`,language:"cpp",filename:"config.shard.cpp"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Read-write static property."}),` Static properties can also have both a getter and a setter. They
are useful for module-level settings that do not belong to any instance.`]})}),`
`,e.jsx(a,{code:`static std::int64_t g_logLevel = 0;

static ObjectInstance* get_loglevel(const CallState& context)
{
  return context.Collector.FromValue(g_logLevel);
}

static ObjectInstance* set_loglevel(const CallState& context)
{
  std::int64_t level = context.Args[0]->AsInteger();

  if (level < 0)
  {
      level = 0;
  }
  else if (level > 3)
  {
      level = 3;
  }

  g_logLevel = level;
  return nullptr;
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> logging(context, L"logging");

  logging.AddClass(L"Log", ACS_PUBLIC, LINK_STATIC, [](SymbolBuilder<ClassSymbol> logClass)
  {
      logClass.AddProperty(L"Level", TYPE_INT, LINK_STATIC, ACS_PUBLIC)
          .AddGetter().SetCallback(&get_loglevel)
          .AddSetter().SetCallback(&set_loglevel);
  });
}`,language:"cpp",filename:"logging.shard.cpp"}),`
`,e.jsx(n,{children:e.jsx(r.p,{children:"ShardScript usage:"})}),`
`,e.jsx(a,{code:`using stdio;
using logging;

namespace demo;

public static func Main() -> void
{
  Log.Level = 2;
  println(Log.Level);   // 2

  Log.Level = 10;
  println(Log.Level);   // 3, clamped by the setter
}`,language:"csharp"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Common mistake: reading the wrong argument in an instance setter."}),` Remember that instance
accessors always receive `,e.jsx(t,{children:"this"})," as ",e.jsx(t,{children:"context.Args[0]"}),"."]})}),`
`,e.jsx(a,{code:`buffer.AddProperty(L"Capacity", TYPE_INT, LINK_INSTANCE, ACS_PUBLIC)
  .AddSetter()
  .SetCallback([](const CallState& context)
  {
      // CORRECT: this is Args[0], the new value is Args[1].
      ObjectInstance* self = context.Args[0];
      std::int64_t value = context.Args[1]->AsInteger();

      // WRONG: this would read this as the new value.
      // std::int64_t value = context.Args[0]->AsInteger();

      self->SetField(g_bufferHandle->SlotIndex, context.Collector.FromValue(value));
      return nullptr;
  });`,language:"cpp"}),`
`,e.jsx(l,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx(t,{children:"library-building/class-symbol-builder"})," — registering classes."]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx(t,{children:"library-building/working-with-fields"})," — reading and writing fields in accessors."]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx(t,{children:"library-building/reading-arguments"})," — argument indexing for instance accessors."]})})]}),`
`,e.jsx(l,{children:"Source"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:["The native side of this API is implemented in ",e.jsx(t,{children:"shard/semantic/SymbolBuilder.hpp"}),`.
View the source on GitHub: `,e.jsx(t,{children:"https://github.com/Rikitav/ShardScript/blob/main/ShardScript/include/shard/semantic/SymbolBuilder.hpp"}),"."]})})]})}function x(i={}){const{wrapper:r}=i.components||{};return r?e.jsx(r,{...i,children:e.jsx(h,{...i})}):h(i)}function c(i,r){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
