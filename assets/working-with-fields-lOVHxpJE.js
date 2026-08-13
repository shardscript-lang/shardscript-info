import{j as e}from"./index-BQw6jbtc.js";function o(i){const n={p:"p",...i.components},{Bullet:r,Callout:c,CodeBlock:l,H2:a,InlineCode:t,Prose:s}=n;return r||d("Bullet"),c||d("Callout"),l||d("CodeBlock"),a||d("H2"),t||d("InlineCode"),s||d("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(a,{children:"Prerequisites"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsxs(n.p,{children:["A C++ shared library that exports ",e.jsx(t,{children:"ShardLib_GetMetadata"})," and"," ",`
`,e.jsx(t,{children:"ShardLib_EntryPoint"}),`. The library may contain one source file or many, and it may
live inside `,e.jsx(t,{children:"ShardScript.Framework"})," or in a completely separate project."]})}),e.jsx(r,{children:e.jsxs(n.p,{children:["The ShardScript runtime headers available on the include path, typically"," ",`
`,e.jsx(t,{children:"ShardScript/include"}),"."]})}),e.jsx(r,{children:e.jsxs(n.p,{children:["A linked ShardScript runtime shared library so the binary can resolve symbols such as"," ",`
`,e.jsx(t,{children:"ObjectInstance"}),", ",e.jsx(t,{children:"GarbageCollector"}),", and"," ",`
`,e.jsx(t,{children:"SymbolBuilder"}),"."]})}),e.jsx(r,{children:e.jsxs(n.p,{children:["Familiarity with the callback contract from ",e.jsx(t,{children:"library-building/accessibility-and-linking"})," ",`
or `,e.jsx(t,{children:"library-building/shardlib-entrypoint"}),"."]})})]}),`
`,e.jsx(a,{children:"Goal"}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[`Register fields on ShardScript types from native C++ code, then read and write them inside callbacks. This
guide covers instance fields, static fields, private native handles, and the backing fields used by properties.
By the end you will know how to use `,e.jsx(t,{children:"FieldSymbol->SlotIndex"}),` as the stable runtime key
for object storage.`]})}),`
`,e.jsx(a,{children:"Step-by-Step Instructions"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"1. Keep a global pointer to every FieldSymbol you register."})}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"AddField"})," returns a ",e.jsx(t,{children:"FieldSymbol*"}),`. Store that pointer in a
file-scope static variable. The field object carries a `,e.jsx(t,{children:"SlotIndex"}),`, which is the stable
offset the runtime uses when it allocates instances of the containing type. The actual numeric value is assigned
by the semantic model, so your code must read it from the symbol at runtime rather than hard-coding an index.`]})}),`
`,e.jsx(l,{code:`#include <ShardScript.hpp>

using namespace shard;

// Pointers are filled in inside SHARDLIB_ENTRYPOINT and read by callbacks.
static FieldSymbol* g_sensor_idField     = nullptr;
static FieldSymbol* g_sensor_handleField = nullptr;
static FieldSymbol* g_sensor_nextIdField = nullptr;`,language:"cpp"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"2. Register instance fields, static fields, and private handles."})}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:["Pass a ",e.jsx(t,{children:"SymbolLinking"})," value and an accessibility value to"," ",`
`,e.jsx(t,{children:"AddField"}),". ",e.jsx(t,{children:"LINK_INSTANCE"}),` stores the field per object;
`,e.jsx(t,{children:"LINK_STATIC"}),` stores it once per type. Mark implementation-only storage such as native
handles with `,e.jsx(t,{children:"ACS_PRIVATE"})," so ShardScript callers cannot access them directly."]})}),`
`,e.jsx(l,{code:`SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> devices(context, L"devices");

  devices.AddClass(L"Sensor", ACS_PUBLIC, LINK_INSTANCE, [](SymbolBuilder<ClassSymbol> sensor)
  {
      // Per-instance state.
      g_sensor_idField = sensor.AddField(L"_id", TYPE_INT, LINK_INSTANCE, ACS_PRIVATE);

      // Per-instance native handle. ACS_PRIVATE keeps it out of ShardScript code.
      g_sensor_handleField = sensor.AddField(L"_handle", TYPE_NINT, LINK_INSTANCE, ACS_PRIVATE);

      // Shared state: one value for the whole type.
      g_sensor_nextIdField = sensor.AddField(L"_nextId", TYPE_INT, LINK_STATIC, ACS_PRIVATE);

      sensor.AddInit()
          .SetCallback([](const CallState& context)
          {
              ObjectInstance* self = context.Args[0];

              // Read and increment the static counter.
              std::int64_t nextId = context.Collector.GetStaticField(g_sensor_nextIdField)->AsInteger();
              context.Collector.SetStaticField(g_sensor_nextIdField, context.Collector.FromValue(nextId + 1));

              // Assign the instance id and a synthetic native handle.
              self->SetField(g_sensor_idField->SlotIndex, context.Collector.FromValue(nextId));
              self->SetField(g_sensor_handleField->SlotIndex, context.Collector.FromNint(nullptr, true));

              return self;
          });

      sensor.AddMethod(L"Read", TYPE_DOUBLE, LINK_INSTANCE, ACS_PUBLIC)
          .SetCallback([](const CallState& context)
          {
              ObjectInstance* self = context.Args[0];
              ObjectInstance* handleObj = self->GetField(g_sensor_handleField->SlotIndex);

              // In a real library the handle would be cast back to a device pointer.
              std::int64_t handle = handleObj->AsInteger();
              double sample = static_cast<double>(handle + self->GetField(g_sensor_idField->SlotIndex)->AsInteger());

              return context.Collector.FromValue(sample);
          });
  });
}`,language:"cpp"}),`
`,e.jsx(c,{tone:"blue",title:"Why keep the FieldSymbol*",children:e.jsxs(n.p,{children:["The semantic model may reorder fields or insert hidden slots for value-type layout."," ",`
`,e.jsx(t,{children:"FieldSymbol->SlotIndex"}),` is the only supported way to know where a field lives at
runtime. Hard-coding slot numbers will break when the type changes.`]})}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"3. Read and write instance fields."})}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:["Inside an instance callback, ",e.jsx(t,{children:"context.Args[0]"})," is ",e.jsx(t,{children:"this"}),`. Use
`,e.jsx(t,{children:"ObjectInstance::GetField(std::uint32_t)"})," and"," ",`
`,e.jsx(t,{children:"SetField(std::uint32_t, ObjectInstance*)"})," with the field's"," ",`
`,e.jsx(t,{children:"SlotIndex"}),". Values passed to ",e.jsx(t,{children:"SetField"}),` must be GC-owned
instances produced by `,e.jsx(t,{children:"context.Collector"}),"."]})}),`
`,e.jsx(l,{code:`static ObjectInstance* sensor_reset(const CallState& context)
{
  ObjectInstance* self = context.Args[0];

  // Read the current id; we keep it but reset the synthetic handle.
  std::int64_t id = self->GetField(g_sensor_idField->SlotIndex)->AsInteger();

  // Write a new boxed int back into the instance slot.
  self->SetField(g_sensor_idField->SlotIndex, context.Collector.FromValue(id));
  self->SetField(g_sensor_handleField->SlotIndex, context.Collector.FromNint(nullptr, true));

  return nullptr;
}`,language:"cpp"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"4. Read and write static fields."})}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:["Static fields are owned by the ",e.jsx(t,{children:"GarbageCollector"}),`, not by any instance. Read them with
`,e.jsx(t,{children:"context.Collector.GetStaticField(FieldSymbol*)"})," and write them with"," ",`
`,e.jsx(t,{children:"context.Collector.SetStaticField(FieldSymbol*, ObjectInstance*)"}),`. Because static fields
are shared across the application domain, guard writes carefully and prefer immutable configuration values when
possible.`]})}),`
`,e.jsx(l,{code:`static ObjectInstance* sensor_resetCounter(const CallState& context)
{
  // Static method: no 'this', Args[0] is the first real parameter.
  std::int64_t value = context.Args[0]->AsInteger();

  context.Collector.SetStaticField(g_sensor_nextIdField, context.Collector.FromValue(value));

  return nullptr;
}

// Registration inside SHARDLIB_ENTRYPOINT:
// sensor.AddMethod(L"ResetCounter", TYPE_VOID, LINK_STATIC, ACS_PUBLIC)
//     .AddParameter(L"value", TYPE_INT)
//     .SetCallback(&sensor_resetCounter);`,language:"cpp"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"5. Store private native handles."})}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:["A private ",e.jsx(t,{children:"TYPE_NINT"}),` field is the standard pattern for wrapping OS resources, third-party
library objects, or any pointer that ShardScript code should not see. Register it with`," ",`
`,e.jsx(t,{children:"ACS_PRIVATE"})," and ",e.jsx(t,{children:"LINK_INSTANCE"}),`, then read it inside methods that
operate on the resource.`]})}),`
`,e.jsx(l,{code:`// Forward declaration of a callback defined elsewhere.
ObjectInstance* sensor_open(const CallState& context);

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> devices(context, L"devices");

  devices.AddClass(L"Sensor", ACS_PUBLIC, LINK_INSTANCE, [](SymbolBuilder<ClassSymbol> sensor)
  {
      g_sensor_handleField = sensor.AddField(L"_handle", TYPE_NINT, LINK_INSTANCE, ACS_PRIVATE);

      sensor.AddMethod(L"Open", TYPE_VOID, LINK_INSTANCE, ACS_PUBLIC)
          .SetCallback(&sensor_open);
  });
}

static ObjectInstance* sensor_open(const CallState& context)
{
  ObjectInstance* self = context.Args[0];

  // In a real implementation this would be a real device pointer.
  void* nativeHandle = reinterpret_cast<void*>(0x1234);

  // isTransient = true: the GC must not try to free this pointer.
  self->SetField(g_sensor_handleField->SlotIndex, context.Collector.FromNint(nativeHandle, true));

  return nullptr;
}`,language:"cpp"}),`
`,e.jsx(c,{tone:"amber",title:"Handle lifetime",children:e.jsxs(n.p,{children:["Set ",e.jsx(t,{children:"isTransient = true"}),` when the memory behind the handle is owned by the OS or by a
third-party library. Set `,e.jsx(t,{children:"isTransient = false"}),` only when your native library allocated the
memory and will free it explicitly, and you want the GC to participate in that cleanup.`]})}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"6. Add backing fields for properties."})}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:["Properties registered with ",e.jsx(t,{children:"AddProperty"})," can use a hidden field for storage. Call"," ",`
`,e.jsx(t,{children:"AddBackingField()"})," on the property builder and keep the returned"," ",`
`,e.jsx(t,{children:"FieldSymbol*"}),`. The getter and setter callbacks then read and write that field just like
any other instance field.`]})}),`
`,e.jsx(l,{code:`static FieldSymbol* g_sensor_statusBacking = nullptr;

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> devices(context, L"devices");

  devices.AddClass(L"Sensor", ACS_PUBLIC, LINK_INSTANCE, [](SymbolBuilder<ClassSymbol> sensor)
  {
      SymbolBuilder<PropertySymbol> statusProp = sensor.AddProperty(L"Status", TYPE_STRING, LINK_INSTANCE, ACS_PUBLIC);
      g_sensor_statusBacking = statusProp.AddBackingField().Get();

      statusProp.AddGetter()
          .SetCallback([](const CallState& context)
          {
              ObjectInstance* self = context.Args[0];
              ObjectInstance* status = self->GetField(g_sensor_statusBacking->SlotIndex);

              if (status == nullptr || status == GarbageCollector::NullInstance)
              {
                  return context.Collector.FromValue(std::wstring(L"unknown"));
              }

              return status;
          })
          .AddSetter()
          .SetCallback([](const CallState& context)
          {
              ObjectInstance* self = context.Args[0];
              ObjectInstance* value = context.Args[1];

              // The setter validates the value before storing it.
              if (value == nullptr || value == GarbageCollector::NullInstance)
              {
                  self->SetField(g_sensor_statusBacking->SlotIndex, context.Collector.FromValue(std::wstring(L"unknown")));
              }
              else
              {
                  self->SetField(g_sensor_statusBacking->SlotIndex, value);
              }

              return nullptr;
          });
  });
}`,language:"cpp"}),`
`,e.jsx(c,{tone:"blue",title:"NullInstance is a valid object",children:e.jsxs(n.p,{children:["ShardScript ",e.jsx(t,{children:"null"})," is represented by ",e.jsx(t,{children:"GarbageCollector::NullInstance"}),`,
not by a C++ `,e.jsx(t,{children:"nullptr"}),". Always check for both before dereferencing a reference-typed field."]})}),`
`,e.jsx(a,{children:"Verification"}),`
`,e.jsx(s,{children:e.jsx(n.p,{children:`Build the shared library and load it from a ShardScript program. The program below creates two sensors, reads their
ids, and exercises the property setter and getter.`})}),`
`,e.jsx(l,{code:`using stdio;
using devices;

namespace demo;

public static func Main() -> void
{
  a: Sensor = new Sensor();
  b: Sensor = new Sensor();

  // Each instance receives a unique id from the static _nextId field.
  println(a.Read());
  println(b.Read());

  // Static method that resets the shared counter.
  Sensor.ResetCounter(100);

  c: Sensor = new Sensor();
  println(c.Read());

  // Property backed by a private field.
  a.Status = "active";
  println(a.Status);
}`,language:"csharp",filename:"app.shard"}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:["Expected output when the synthetic handle is ",e.jsx(t,{children:"0x1234"})," and the counter starts at"," ",`
`,e.jsx(t,{children:"0"}),":"]})}),`
`,e.jsx(l,{code:`4660
4661
4684
active`,language:"text"}),`
`,e.jsx(a,{children:"Troubleshooting"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Crash when reading a field"}),` — Verify you are using the field
symbol returned by `,e.jsx(t,{children:"AddField"}),`, not a stale pointer from a previous registration. The
`,e.jsx(t,{children:"SlotIndex"})," is valid only for the type on which the field was registered."]})}),e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Static field value is shared across instances unexpectedly"})," ",`
— That is the intended behavior. Move the data to an instance field if each object needs its own copy.`]})}),e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Instance callback reads the wrong value"})," — Remember that"," ",`
`,e.jsx(t,{children:"context.Args[0]"})," is ",e.jsx(t,{children:"this"}),` for instance members. The first real
parameter is at index `,e.jsx(t,{children:"1"}),"."]})}),e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Native handle is collected or freed by the GC"}),` — Pass the
correct `,e.jsx(t,{children:"isTransient"})," flag to ",e.jsx(t,{children:"Collector.FromNint"}),`. Most external
handles should be marked transient.`]})}),e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Property getter returns null"}),` — A backing field starts out as
`,e.jsx(t,{children:"GarbageCollector::NullInstance"}),`. Provide a default value in the getter or initialize the
field in the constructor.`]})}),e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Static field write throws at runtime"})," —"," ",`
`,e.jsx(t,{children:"SetStaticField"})," rejects ",e.jsx(t,{children:"nullptr"}),". Use"," ",`
`,e.jsx(t,{children:"GarbageCollector::NullInstance"})," or a boxed value instead."]})})]}),`
`,e.jsx(a,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"library-building/working-with-objects"})," — working with object instances."]})}),e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"library-building/reading-arguments"})," — reading arguments."]})}),e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"library-building/returning-values"})," — returning values."]})}),e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"library-building/native-handles-and-object-lifetime"})," — native handle lifetime."]})})]})]})}function x(i={}){const{wrapper:n}=i.components||{};return n?e.jsx(n,{...i,children:e.jsx(o,{...i})}):o(i)}function d(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
