import{j as e}from"./index-BQw6jbtc.js";function h(l){const n={p:"p",...l.components},{Bullet:r,Callout:o,CodeBlock:a,DocsTable:d,H2:i,InlineCode:s,Prose:t}=n;return r||c("Bullet"),o||c("Callout"),a||c("CodeBlock"),d||c("DocsTable"),i||c("H2"),s||c("InlineCode"),t||c("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(i,{children:"Summary"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:["When a native C++ library registers symbols through ",e.jsx(s,{children:"SHARDLIB_ENTRYPOINT"}),`, every
namespace, type, field, method, property, indexer, and operator must declare an
`,e.jsx("strong",{children:"accessibility"})," level and a ",e.jsx("strong",{children:"linking"}),` mode. Accessibility controls
which ShardScript code can see the symbol, and linking controls whether the symbol is bound to a type
instance or to the type itself.`]})}),`
`,e.jsx(i,{children:"Syntax"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[`Accessibility and linking values are passed as positional arguments to the
`,e.jsx(s,{children:"SymbolBuilder"})," fluent registration API."]})}),`
`,e.jsx(a,{code:`// Namespace-level symbol.
ns.AddMethod(L"Helper", TYPE_VOID, LINK_STATIC, ACS_PUBLIC)
  .SetCallback(&helper);

// Type-level symbol.
ns.AddClass(L"Sensor", ACS_PUBLIC, LINK_INSTANCE, [](SymbolBuilder<ClassSymbol> sensor)
{
  sensor.AddField(L"_handle", TYPE_NINT, LINK_INSTANCE, ACS_PRIVATE);

  sensor.AddMethod(L"Read", TYPE_DOUBLE, LINK_INSTANCE)
      .SetCallback(&sensor_read);

  sensor.AddMethod(L"Calibrate", TYPE_VOID, LINK_STATIC)
      .SetCallback(&sensor_calibrate);
});`,language:"cpp"}),`
`,e.jsx(d,{headers:["Value","Kind","Meaning"],rows:[[e.jsx(s,{children:"ACS_PUBLIC"}),"Accessibility","Visible to any code that can reference the containing namespace."],[e.jsx(s,{children:"ACS_PRIVATE"}),"Accessibility","Visible only inside the declaring type."],[e.jsx(s,{children:"LINK_STATIC"}),"Linking","The member belongs to the type itself; no implicit <InlineCode>this</InlineCode> is passed."],[e.jsx(s,{children:"LINK_INSTANCE"}),"Linking","The member belongs to an instance; <InlineCode>this</InlineCode> is passed as the first argument."]]}),`
`,e.jsx(i,{children:"Parameters / Arguments"}),`
`,e.jsx(d,{headers:["Parameter","Applies to","Description"],rows:[[e.jsx(s,{children:"ACS_PUBLIC"}),"Namespace, class, struct, interface, enum, member","Use for every symbol that external ShardScript code is expected to call or instantiate."],[e.jsx(s,{children:"ACS_PRIVATE"}),"Field, method, property, indexer, operator","Use for implementation details such as backing fields, helper methods, and native handles that must not be touched by callers."],[e.jsx(s,{children:"LINK_STATIC"}),"Method, property, indexer, operator, constructor","Use when the member does not read or write per-instance state. Static constructors (<InlineCode>AddInit</InlineCode>) also use this value."],[e.jsx(s,{children:"LINK_INSTANCE"}),"Class, struct, field, method, property, indexer, operator","Use when the member operates on a specific instance. This is the required linking mode for instance fields and instance constructors."]]}),`
`,e.jsx(i,{children:"Returns"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[`Accessibility and linking values are not expressions and do not return a value. They are compile-time
registration flags that the semantic model stores on the resulting `,e.jsx(s,{children:"Symbol"}),`. At
runtime the VM uses them to decide whether a call is allowed and whether to pass an implicit`," ",`
`,e.jsx(s,{children:"this"})," argument."]})}),`
`,e.jsx(i,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Symbol not found at compile time"}),` — A member registered
with `,e.jsx(s,{children:"ACS_PRIVATE"}),` cannot be referenced from ShardScript code outside the declaring
type.`]})}),e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Static called on an instance, or instance called on a type"})," ",`
— A method registered with `,e.jsx(s,{children:"LINK_STATIC"})," must be invoked as"," ",`
`,e.jsx(s,{children:"Type.Method()"}),". A method registered with ",e.jsx(s,{children:"LINK_INSTANCE"})," ",`
must be invoked as `,e.jsx(s,{children:"instance.Method()"}),`. Mismatching the linking mode produces a
semantic error.`]})}),e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Instance member in a static type"}),` — A class registered
without instance linking on its members but called as an instance type, or a static class that declares
instance members, fails validation.`]})}),e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsxs("strong",{className:"text-text-primary",children:[e.jsx(s,{children:"this"})," argument misalignment"]}),` — For
an instance callback, `,e.jsx(s,{children:"context.Args[0]"})," is ",e.jsx(s,{children:"this"}),`. Treating
it as the first real parameter causes incorrect reads or a crash.`]})}),e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Callback never invoked"})," — Forgetting"," ",`
`,e.jsx(s,{children:".SetCallback(...)"}),` leaves the symbol registered but without a native target. The
call resolves but no code runs.`]})})]}),`
`,e.jsx(i,{children:"Remarks"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Accessibility boundaries."})," ",e.jsx(s,{children:"ACS_PUBLIC"}),` is the only value that makes
a symbol visible to code outside the declaring type. If you intend a type or member to be consumed by
ShardScript programs, mark it `,e.jsx(s,{children:"ACS_PUBLIC"}),`. Implementation helpers, backing fields,
and native handles should be marked `,e.jsx(s,{children:"ACS_PRIVATE"}),` so they cannot be referenced by
callers.`]})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Linking determines the call contract."})," ",e.jsx(s,{children:"LINK_INSTANCE"}),` means the
runtime will pass the instance pointer as `,e.jsx(s,{children:"context.Args[0]"}),`. Real parameters start at
index `,e.jsx(s,{children:"1"}),". ",e.jsx(s,{children:"LINK_STATIC"})," means there is no implicit"," ",`
`,e.jsx(s,{children:"this"}),"; the first real parameter is at index ",e.jsx(s,{children:"0"}),`. The same
callback signature is used for both modes, so the callback must read arguments at the correct offsets.`]})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Statics for utility types."})," A class that contains only static members, such as"," ",`
`,e.jsx(s,{children:"shard.math"}),`, is registered with static methods and no instance fields. Constants and
factory methods that do not depend on object state should also use `,e.jsx(s,{children:"LINK_STATIC"}),"."]})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Instance state and native handles."}),` Types that wrap OS resources, such as file streams or
sockets, store native handles in `,e.jsx(s,{children:"LINK_INSTANCE"})," fields with"," ",`
`,e.jsx(s,{children:"ACS_PRIVATE"})," accessibility. The callback then reads the handle from"," ",`
`,e.jsx(s,{children:"context.Args[0]"}),` and performs the operation without exposing the handle to
ShardScript callers.`]})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Constructors and initializers."})," ",e.jsx(s,{children:"AddInit"}),` is the registration method
for constructors. It is registered with `,e.jsx(s,{children:"LINK_STATIC"}),` because the runtime calls it to
initialize a freshly allocated instance; the callback receives the new instance as`," ",`
`,e.jsx(s,{children:"context.Args[0]"})," and must return that same instance."]})}),`
`,e.jsx(o,{tone:"blue",children:e.jsxs(n.p,{children:["Choose ",e.jsx(s,{children:"LINK_STATIC"})," for anything that does not need ",e.jsx(s,{children:"this"}),`,
and `,e.jsx(s,{children:"ACS_PUBLIC"}),` for anything that callers outside the library must see. The most
common native-library bug is a mismatch between the registered linking mode and the call site.`]})}),`
`,e.jsx(i,{children:"Examples"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Public static utility class."})," This pattern is common for libraries such as"," ",`
`,e.jsx(s,{children:"shard.math"}),": only static methods and static properties are exposed."]})}),`
`,e.jsx(a,{code:`SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> math(context, L"math");

  math.AddClass(L"Math", ACS_PUBLIC, LINK_STATIC, [](SymbolBuilder<ClassSymbol> mathClass)
  {
      mathClass.AddMethod(L"Abs", TYPE_INT, LINK_STATIC, ACS_PUBLIC)
          .AddParameter(L"value", TYPE_INT)
          .SetCallback([](const CallState& context)
          {
              std::int64_t value = context.Args[0]->AsInteger();

              if (value < 0)
              {
                  value = -value;
              }

              return context.Collector.FromValue(value);
          });
  });
}`,language:"cpp"}),`
`,e.jsx(t,{children:e.jsx(n.p,{children:"ShardScript usage:"})}),`
`,e.jsx(a,{code:`using stdio;
using math;

namespace demo;

public static func Main() -> void
{
  result: int = Math.Abs(-7);
  println(result);   // 7
}`,language:"csharp"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Public instance type with a private native handle."}),` The handle is stored in an instance
field; callers use instance methods.`]})}),`
`,e.jsx(a,{code:`static FieldSymbol* g_sensorHandle = nullptr;

static ObjectInstance* sensor_read(const CallState& context)
{
  ObjectInstance* self = context.Args[0];
  ObjectInstance* handleObj = self->GetField(g_sensorHandle->SlotIndex);
  std::int64_t handle = handleObj->AsInteger();

  // Read from the hardware represented by the opaque handle.
  double sample = static_cast<double>(handle) * 0.125;

  return context.Collector.FromValue(sample);
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> sensors(context, L"sensors");

  sensors.AddClass(L"Sensor", ACS_PUBLIC, LINK_INSTANCE, [](SymbolBuilder<ClassSymbol> sensor)
  {
      g_sensorHandle = sensor.AddField(L"_handle", TYPE_INT, LINK_INSTANCE, ACS_PRIVATE);

      sensor.AddInit()
          .AddParameter(L"id", TYPE_INT)
          .SetCallback([](const CallState& context)
          {
              ObjectInstance* self = context.Args[0];
              ObjectInstance* id = context.Args[1];
              self->SetField(g_sensorHandle->SlotIndex, id);
              return self;
          });

      sensor.AddMethod(L"Read", TYPE_DOUBLE, LINK_INSTANCE, ACS_PUBLIC)
          .SetCallback(&sensor_read);

      sensor.AddMethod(L"Count", TYPE_INT, LINK_STATIC, ACS_PUBLIC)
          .SetCallback([](const CallState& context)
          {
              // Static helper: no instance state is accessed.
              return context.Collector.FromValue(0);
          });
  });
}`,language:"cpp"}),`
`,e.jsx(t,{children:e.jsx(n.p,{children:"ShardScript usage:"})}),`
`,e.jsx(a,{code:`using stdio;
using sensors;

namespace demo;

public static func Main() -> void
{
  s: Sensor = new Sensor(1);
  sample: double = s.Read();
  println(sample);

  total: int = Sensor.Count();
  println(total);
}`,language:"csharp"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Private helper inside a type."}),` A private static method is visible only to other members of
the same type. Namespace-level helpers cannot be hidden from the rest of the library, so keep sensitive
implementation details inside a private type.`]})}),`
`,e.jsx(a,{code:`static ObjectInstance* ensure_buffer_size(const CallState& context)
{
  ObjectInstance* buffer = context.Args[0];
  std::int64_t required = context.Args[1]->AsInteger();
  std::size_t current = buffer->GetArrayLength();

  if (current < static_cast<std::size_t>(required))
  {
      ObjectInstance* replacement = context.Collector.AllocateArray(TYPE_BYTE, required);
      return replacement;
  }

  return buffer;
}

SHARDLIB_ENTRYPOINT
{
  SymbolFactory factory(context.GetSemanticModel().Table.get());
  SymbolBuilder<NamespaceSymbol> buffers(context, L"buffers");

  buffers.AddClass(L"BufferHelpers", ACS_PUBLIC, LINK_STATIC, [](SymbolBuilder<ClassSymbol> helpers)
  {
      ArrayTypeSymbol* byteArray = factory.Array(TYPE_BYTE);
      helpers.AddMethod(L"EnsureBufferSize", byteArray, LINK_STATIC, ACS_PRIVATE)
          .AddParameter(L"buffer", byteArray)
          .AddParameter(L"required", TYPE_INT)
          .SetCallback(&ensure_buffer_size);
  });
}`,language:"cpp"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Common mistake: instance callback reading the wrong argument index."})," Because"," ",`
`,e.jsx(s,{children:"context.Args[0]"})," is ",e.jsx(s,{children:"this"}),`, the first real parameter is at
index `,e.jsx(s,{children:"1"}),"."]})}),`
`,e.jsx(a,{code:`sensor.AddMethod(L"Move", TYPE_VOID, LINK_INSTANCE, ACS_PUBLIC)
  .AddParameter(L"distance", TYPE_DOUBLE)
  .SetCallback([](const CallState& context)
  {
      // CORRECT: this is Args[0], distance is Args[1].
      ObjectInstance* self = context.Args[0];
      double distance = context.Args[1]->AsDouble();

      // WRONG: this would read this as a double.
      // double distance = context.Args[0]->AsDouble();

      self->SetField(g_positionField->SlotIndex, context.Collector.FromValue(distance));
      return nullptr;
  });`,language:"cpp"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Common mistake: registering a static member with instance linking."}),` If a method does not
use `,e.jsx(s,{children:"this"}),", register it with ",e.jsx(s,{children:"LINK_STATIC"}),` and call it through
the type name.`]})}),`
`,e.jsx(a,{code:`using stdio;
using sensors;

namespace demo;

public static func Main() -> void
{
  // CORRECT: Count is static, so it is invoked on the type.
  total: int = Sensor.Count();
  println(total);

  // WRONG: Count is not an instance member.
  // s: Sensor = new Sensor(1);
  // total = s.Count();
}`,language:"csharp"}),`
`,e.jsx(i,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx(s,{children:"library-building/shardlib-entrypoint"})," — registering namespaces, types, and callbacks."]})}),e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx(s,{children:"library-building/method-symbol-builder"})," — registering methods and choosing a linking mode."]})}),e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx(s,{children:"library-building/reading-arguments"})," — reading arguments in native callbacks."]})}),e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx(s,{children:"library-building/headers-quick-reference"})," — header locations for runtime helpers."]})})]}),`
`,e.jsx(i,{children:"Source"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:["The native side of this API is implemented in ",e.jsx(s,{children:"shard/semantic/SymbolBuilder.hpp"}),`.
View the source on GitHub: `,e.jsx(s,{children:"https://github.com/Rikitav/ShardScript/blob/main/ShardScript/include/shard/semantic/SymbolBuilder.hpp"}),"."]})})]})}function x(l={}){const{wrapper:n}=l.components||{};return n?e.jsx(n,{...l,children:e.jsx(h,{...l})}):h(l)}function c(l,n){throw new Error("Expected component `"+l+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
