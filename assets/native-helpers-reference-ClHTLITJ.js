import{j as e}from"./index-BJYykHK7.js";function d(i){const t={p:"p",...i.components},{Bullet:s,CodeBlock:o,DocsTable:a,H2:l,InlineCode:n,Prose:r}=t;return s||c("Bullet"),o||c("CodeBlock"),a||c("DocsTable"),l||c("H2"),n||c("InlineCode"),r||c("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(l,{children:"Summary"}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:["The helpers declared in ",e.jsx(n,{children:"<shard/runtime/NativeHelpers.hpp>"}),` reduce the
boilerplate required to construct ShardScript objects, invoke methods, and read or write fields and
properties from inside native C++ callbacks. They are inline header-only wrappers around the runtime
allocation and invocation APIs, so including the header is sufficient; no additional link dependency is
required.`]})}),`
`,e.jsx(l,{children:"Syntax"}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:[`Include the header and call the helpers from within a native callback. All helpers live in the
`,e.jsx(n,{children:"shard"})," namespace and accept the same ",e.jsx(n,{children:"CallState"}),` that the
surrounding callback receives.`]})}),`
`,e.jsx(o,{code:`#include <shard/runtime/NativeHelpers.hpp>

ObjectInstance* NewObject(
  const CallState& context,
  TypeSymbol* type);
  
ObjectInstance* NewObject(
  const CallState& context,
  TypeSymbol* type,
  ConstructorSymbol* ctor,
  std::initializer_list<ObjectInstance*> args = {});

ObjectInstance* NewObject(
  const CallState& context,
  ClassSymbol* cls,
  const std::vector<TypeSymbol*>& typeArgs,
  std::initializer_list<ObjectInstance*> args = {});

ObjectInstance* CallMethod(
  const CallState& context,
  MethodSymbol* method,
  std::initializer_list<ObjectInstance*> args = {});

ObjectInstance* CallMethod(
  const CallState& context,
  MethodSymbol* method,
  ObjectInstance* receiver,
  std::initializer_list<ObjectInstance*> args = {});

ObjectInstance* GetField(
  ObjectInstance* obj,
  FieldSymbol* field);
  
void SetField(
  ObjectInstance* obj,
  FieldSymbol* field,
  ObjectInstance* value);

ObjectInstance* GetProperty(
  const CallState& context,
  ObjectInstance* obj,
  PropertySymbol* prop);
  
void SetProperty(
  const CallState& context,
  ObjectInstance* obj,
  PropertySymbol* prop,
  ObjectInstance* value);`,language:"cpp",filename:"NativeHelpers.hpp"}),`
`,e.jsx(l,{children:"Parameters / Arguments"}),`
`,e.jsx(a,{headers:["Helper","Parameters","Description"],rows:[[e.jsx(n,{children:"NewObject"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"context"}),", ",e.jsx(n,{children:"type"})]}),"Allocates and constructs an instance of <InlineCode>type</InlineCode> using its parameterless constructor."],[e.jsx(n,{children:"NewObject"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"context"}),", ",e.jsx(n,{children:"type"}),", ",e.jsx(n,{children:"ctor"}),", ",e.jsx(n,{children:"args"})]}),"Allocates and constructs an instance of <InlineCode>type</InlineCode> using the supplied constructor and arguments."],[e.jsx(n,{children:"NewObject"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"context"}),", ",e.jsx(n,{children:"cls"}),", ",e.jsx(n,{children:"typeArgs"}),", ",e.jsx(n,{children:"args"})]}),"Allocates a constructed generic instance of <InlineCode>cls</InlineCode> with the given type arguments and invokes the constructor whose arity matches <InlineCode>args.size()</InlineCode>."],[e.jsx(n,{children:"CallMethod"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"context"}),", ",e.jsx(n,{children:"method"}),", ",e.jsx(n,{children:"args"})]}),"Invokes a static method with the supplied arguments."],[e.jsx(n,{children:"CallMethod"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"context"}),", ",e.jsx(n,{children:"method"}),", ",e.jsx(n,{children:"receiver"}),", ",e.jsx(n,{children:"args"})]}),"Invokes an instance method on <InlineCode>receiver</InlineCode> with the supplied arguments."],[e.jsx(n,{children:"GetField"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"obj"}),", ",e.jsx(n,{children:"field"})]}),"Returns the value stored in <InlineCode>field</InlineCode>."],[e.jsx(n,{children:"SetField"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"obj"}),", ",e.jsx(n,{children:"field"}),", ",e.jsx(n,{children:"value"})]}),"Stores <InlineCode>value</InlineCode> in <InlineCode>field</InlineCode>."],[e.jsx(n,{children:"GetProperty"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"context"}),", ",e.jsx(n,{children:"obj"}),", ",e.jsx(n,{children:"prop"})]}),"Invokes the getter of <InlineCode>prop</InlineCode> and returns its value."],[e.jsx(n,{children:"SetProperty"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"context"}),", ",e.jsx(n,{children:"obj"}),", ",e.jsx(n,{children:"prop"}),", ",e.jsx(n,{children:"value"})]}),"Invokes the setter of <InlineCode>prop</InlineCode> with <InlineCode>value</InlineCode>."]]}),`
`,e.jsx(l,{children:"Returns"}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"NewObject"})," and both ",e.jsx(n,{children:"CallMethod"}),` overloads return a
`,e.jsx(n,{children:"shard::ObjectInstance*"}),". ",e.jsx(n,{children:"GetField"})," and"," ",`
`,e.jsx(n,{children:"GetProperty"}),` return the current field or property value as a borrowed reference.
`,e.jsx(n,{children:"SetField"})," and ",e.jsx(n,{children:"SetProperty"})," return ",e.jsx(n,{children:"void"}),"."]})}),`
`,e.jsx(l,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Null type, constructor, method, field, or property."})," ",`
Every helper validates its symbol pointer and throws `,e.jsx(n,{children:"std::runtime_error"}),` if a
required symbol is `,e.jsx(n,{children:"nullptr"}),"."]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Missing parameterless constructor."})," ",`
`,e.jsx(n,{children:"NewObject(context, type)"})," throws if the type has no parameterless constructor."]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"No matching generic constructor."})," The generic"," ",`
`,e.jsx(n,{children:"NewObject"})," overload throws if no constructor in ",e.jsx(n,{children:"cls"}),` has a
parameter count equal to `,e.jsx(n,{children:"args.size()"}),"."]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Missing accessor."})," ",`
`,e.jsx(n,{children:"GetProperty"})," throws if the property has no getter;"," ",`
`,e.jsx(n,{children:"SetProperty"})," throws if it has no setter."]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Constructor exception."}),` If the invoked constructor throws,
`,e.jsx(n,{children:"NewObject"}),` decrements the temporary owning reference before rethrowing so the
partially constructed instance is not leaked.`]})})]}),`
`,e.jsx(l,{children:"Remarks"}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"NewObject"}),` returns an object with an owning reference: the reference count is 1 when
the helper returns. This keeps the object alive while the callback is still constructing it. If you do not
store the object in a field, return it to the caller, or otherwise transfer ownership to the garbage
collector, call `,e.jsx(n,{children:"DecrementReference()"})," before returning to avoid a leak."]})}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"CallMethod"}),` builds the argument vector for you. For instance methods it prepends the
receiver so the underlying delegate receives `,e.jsx(n,{children:"context.Args[0]"})," as"," ",`
`,e.jsx(n,{children:"this"}),". For static methods the argument vector contains exactly the values you pass."]})}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"GetField"})," and ",e.jsx(n,{children:"SetField"}),` read and write through the
`,e.jsx(n,{children:"FieldSymbol"})," pointer returned by ",e.jsx(n,{children:"AddField"}),`. Use the symbol
rather than a hard-coded slot offset so registration-order changes do not break field access.`]})}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"GetProperty"})," and ",e.jsx(n,{children:"SetProperty"}),` invoke the property accessors
through the registered getter and setter callbacks. They are convenience wrappers around`," ",`
`,e.jsx(n,{children:"CallMethod"}),"; the same borrowing and return-value rules apply."]})}),`
`,e.jsx(l,{children:"Examples"}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:[`The following callback constructs a managed object, invokes an instance method, reads a field, and sets a
property. The captured symbols are stored during `,e.jsx(n,{children:"SHARDLIB_ENTRYPOINT"}),"."]})}),`
`,e.jsx(o,{code:`#include <shard/runtime/NativeHelpers.hpp>

static ClassSymbol* g_sensorClass = nullptr;
static MethodSymbol* g_sensorReadMethod = nullptr;
static FieldSymbol* g_sensorIdField = nullptr;
static PropertySymbol* g_sensorValueProp = nullptr;

static ObjectInstance* CreateAndConfigureSensor(const CallState& context)
{
  // Allocate and construct Sensor() with an owning reference.
  ObjectInstance* sensor = NewObject(context, g_sensorClass);

  // Invoke instance method Sensor.Read().
  ObjectInstance* rawValue = CallMethod(context, g_sensorReadMethod, sensor);

  // Read the Id field directly.
  ObjectInstance* id = GetField(sensor, g_sensorIdField);

  // Write the Value property through its setter.
  SetProperty(context, sensor, g_sensorValueProp, rawValue);

  // Decrement the owning reference; the returned sensor keeps the caller's borrow alive.
  sensor->DecrementReference();
  return sensor;
}`,language:"cpp",filename:"sensor_demo.cpp"}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:["The generic overload is useful when a callback must manufacture a constructed generic type such as"," ",`
`,e.jsx(n,{children:"Cell<int>"}),"."]})}),`
`,e.jsx(o,{code:`static ObjectInstance* MakeIntCell(const CallState& context)
{
  ObjectInstance* cell = NewObject(context, g_cellClass, { TYPE_INT });

  // cell now holds an owning reference. Store a value before returning it.
  SetField(cell, g_cellValueField, context.Collector.FromValue(42));
  return cell;
}`,language:"cpp",filename:"generic_demo.cpp"}),`
`,e.jsx(l,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"library-building/native-callback-helpers"})," — the"," ",`
`,e.jsx(n,{children:"GetArgs<T...>"})," helper for reading primitive arguments."]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"library-building/working-with-objects"}),` — allocating and manipulating objects from
native code.`]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"library-building/working-with-fields"})," — reading and writing fields."]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"library-building/class-symbol-builder"}),` — registering classes, fields, methods, and
properties.`]})})]}),`
`,e.jsx(l,{children:"Source"}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:["The native side of this API is implemented in ",e.jsx(n,{children:"shard/runtime/NativeHelpers.hpp"}),`.
View the source on GitHub:`," ",`
`,e.jsx(n,{children:"https://github.com/Rikitav/ShardScript/blob/main/ShardScript/include/shard/runtime/NativeHelpers.hpp"}),"."]})})]})}function j(i={}){const{wrapper:t}=i.components||{};return t?e.jsx(t,{...i,children:e.jsx(d,{...i})}):d(i)}function c(i,t){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{j as default};
