import{j as e}from"./index-BugjY_CW.js";function h(a){const t={p:"p",...a.components},{Bullet:r,Callout:o,CodeBlock:l,DocsTable:d,H2:i,InlineCode:n,Prose:s}=t;return r||c("Bullet"),o||c("Callout"),l||c("CodeBlock"),d||c("DocsTable"),i||c("H2"),n||c("InlineCode"),s||c("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(i,{children:"Summary"}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:["Every native C++ callback registered through ",e.jsx(n,{children:"SHARDLIB_ENTRYPOINT"}),` shares the same
signature: it receives a `,e.jsx(n,{children:"const shard::CallState&"})," and returns a"," ",`
`,e.jsx(n,{children:"shard::ObjectInstance*"}),`. The runtime uses this contract to pass borrowed arguments
into native code and to take ownership of the returned value. Understanding the contract is the minimum
requirement for writing any native method, property, indexer, operator, or constructor.`]})}),`
`,e.jsx(i,{children:"What problem it solves"}),`
`,e.jsx(s,{children:e.jsx(t.p,{children:`Native libraries sit between unmanaged C++ and the ShardScript virtual machine. The VM needs a stable,
type-erased way to hand arguments to C++ and to receive a value back. The callback contract solves three
problems at once:`})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Argument passing."}),` ShardScript objects, primitives, and
references are all represented as `,e.jsx(n,{children:"ObjectInstance*"}),` pointers. The contract gives the
callback a span of those pointers in the same order as the registered parameters.`]})}),e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Memory safety."}),` Arguments are borrowed from the caller. The
callback must read them, but it must never delete them. Returned values are produced through the garbage
collector so the VM owns them.`]})}),e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Uniform dispatch."}),` Static methods, instance methods,
properties, indexers, operators, and constructors all use the same callback signature. The only difference
is whether `,e.jsx(n,{children:"context.Args[0]"})," is ",e.jsx(n,{children:"this"}),` or the first real
argument.`]})})]}),`
`,e.jsx(i,{children:"How it works"}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[`The callback signature is fixed. A function pointer, a lambda, or any callable that matches this signature can
be passed to `,e.jsx(n,{children:".SetCallback(...)"}),"."]})}),`
`,e.jsx(l,{code:"shard::ObjectInstance* Callback(const shard::CallState& context);",language:"cpp"}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:["The ",e.jsx(n,{children:"CallState"}),` structure carries everything the callback needs to interact with the
runtime:`]})}),`
`,e.jsx(d,{headers:["Member","Type","Meaning"],rows:[[e.jsx(n,{children:"context.Domain"}),e.jsx(n,{children:"ApplicationDomain*"}),"Application domain that owns the current call."],[e.jsx(n,{children:"context.Program"}),e.jsx(n,{children:"ProgramImage*"}),"Compiled program image being executed."],[e.jsx(n,{children:"context.Runtimer"}),e.jsx(n,{children:"VirtualMachine*"}),"The executing virtual machine."],[e.jsx(n,{children:"context.Collector"}),e.jsx(n,{children:"GarbageCollector&"}),"Allocates and boxes return values."],[e.jsx(n,{children:"context.Frame"}),e.jsx(n,{children:"CallStackFrame*"}),"Current stack frame; holds generic type arguments."],[e.jsx(n,{children:"context.Method"}),e.jsx(n,{children:"MethodSymbol*"}),"Symbol of the method being invoked."],[e.jsx(n,{children:"context.Args"}),e.jsx(n,{children:"std::span<ObjectInstance*>"}),"Borrowed argument pointers."]]}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Argument indexing depends on linking."})," For instance members,"," ",`
`,e.jsx(n,{children:"context.Args[0]"})," is ",e.jsx(n,{children:"this"})," and real parameters begin at index"," ",`
`,e.jsx(n,{children:"1"}),". For static members, there is no implicit ",e.jsx(n,{children:"this"}),`; the first
real parameter is at index `,e.jsx(n,{children:"0"}),"."]})}),`
`,e.jsx(l,{code:`// Static method: first real argument is Args[0].
ns.AddMethod(L"Double", TYPE_INT, LINK_STATIC, ACS_PUBLIC)
  .AddParameter(L"value", TYPE_INT)
  .SetCallback([](const CallState& context)
  {
      std::int64_t value = context.Args[0]->AsInteger();
      return context.Collector.FromValue(value * 2);
  });

// Instance method: this is Args[0], first real argument is Args[1].
cls.AddMethod(L"Add", TYPE_INT, LINK_INSTANCE, ACS_PUBLIC)
  .AddParameter(L"other", TYPE_INT)
  .SetCallback([](const CallState& context)
  {
      ObjectInstance* self = context.Args[0];
      std::int64_t current = self->GetField(g_valueField->SlotIndex)->AsInteger();
      std::int64_t other = context.Args[1]->AsInteger();
      return context.Collector.FromValue(current + other);
  });`,language:"cpp"}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Reading arguments."})," Primitive values are extracted through helper methods on"," ",`
`,e.jsx(n,{children:"ObjectInstance"}),". Always guard reference-typed arguments against"," ",`
`,e.jsx(n,{children:"nullptr"})," or ",e.jsx(n,{children:"GarbageCollector::NullInstance"}),` before
dereferencing them.`]})}),`
`,e.jsx(l,{code:`std::int64_t   i = context.Args[0]->AsInteger();
double         d = context.Args[0]->AsDouble();
bool           b = context.Args[0]->AsBoolean();
wchar_t        c = context.Args[0]->AsCharacter();
std::uint8_t   y = context.Args[0]->AsByte();
const wchar_t* s = context.Args[0]->AsString();
void*          p = context.Args[0]->AsNint();

// Defensive check for a nullable string.
ObjectInstance* name = context.Args[1];
if (name == nullptr || name == GarbageCollector::NullInstance)
{
  return context.Collector.FromValue(std::wstring());
}

const wchar_t* nameText = name->AsString();`,language:"cpp"}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Returning values."})," The callback returns a single ",e.jsx(n,{children:"ObjectInstance*"}),`. Use
the garbage collector to box primitives, allocate objects, or represent `,e.jsx(n,{children:"void"})," with"," ",`
`,e.jsx(n,{children:"nullptr"}),". The returned object is owned by the VM; the callback must not free it."]})}),`
`,e.jsx(l,{code:`return context.Collector.FromValue(42);                 // int
return context.Collector.FromValue(3.14);               // double
return context.Collector.FromValue(true);               // bool
return context.Collector.FromValue(L"hello");           // string
return context.Collector.FromValue(std::wstring(...));  // string
return context.Collector.FromNint(ptr, isTransient);    // nint
return context.Collector.AllocateInstance(myClass);     // new class instance
return context.Collector.AllocateArray(TYPE_INT, 10);   // new int[]
return nullptr;                                         // void return`,language:"cpp"}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Native pointer ownership."})," ",e.jsx(n,{children:"FromNint"}),` stores an unmanaged pointer as a
ShardScript `,e.jsx(n,{children:"nint"}),". Pass ",e.jsx(n,{children:"true"})," for ",e.jsx(n,{children:"isTransient"})," ",`
when the memory is owned by something outside the GC, such as an OS handle. Pass `,e.jsx(n,{children:"false"})," ",`
when the GC should eventually free the underlying memory.`]})}),`
`,e.jsx(l,{code:`// External OS handle: GC must not free it.
return context.Collector.FromNint(reinterpret_cast<void*>(fileHandle), true);

// Library-owned allocation: GC may free it when the object dies.
return context.Collector.FromNint(myLibraryBuffer, false);`,language:"cpp"}),`
`,e.jsx(i,{children:"Key ideas"}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Arguments are borrowed."})," Every pointer in ",e.jsx(n,{children:"context.Args"}),` belongs to the
caller or to the garbage collector. Read from it, but never call `,e.jsx(n,{children:"delete"}),","," ",`
`,e.jsx(n,{children:"free"}),", or any destructor on an argument instance."]})}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Return values must be GC-owned."}),` The only safe return paths are through the collector helpers
or `,e.jsx(n,{children:"nullptr"})," for ",e.jsx(n,{children:"void"}),`. Returning a pointer to a local variable,
a stack buffer, or a borrowed argument is undefined behavior.`]})}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Strings need special care."})," ",e.jsx(n,{children:"AsString()"}),` returns a pointer into a
GC-managed instance. If you need to keep the string after the callback returns, copy it into a`," ",`
`,e.jsx(n,{children:"std::wstring"}),"."]})}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Instance methods shift the argument span."})," Because ",e.jsx(n,{children:"this"}),` is inserted at
index `,e.jsx(n,{children:"0"}),`, it is easy to read a real parameter from the wrong offset. Match the
registered `,e.jsx(n,{children:"LINK_INSTANCE"})," mode with index ",e.jsx(n,{children:"1"})," and above."]})}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Convenience helper for static methods."})," For simple static callbacks,"," ",`
`,e.jsx(n,{children:"GetArgs<T...>"})," in ",e.jsx(n,{children:"<shard/runtime/NativeHelpers.hpp>"})," ",`
reads primitive arguments in order and reduces boilerplate.`]})}),`
`,e.jsx(l,{code:`static ObjectInstance* hypotenuse(const CallState& context)
{
  double a = 0.0;
  double b = 0.0;

  std::tie(a, b) = GetArgs<double, double>(context);

  double result = std::sqrt((a * a) + (b * b));
  return context.Collector.FromValue(result);
}`,language:"cpp"}),`
`,e.jsx(o,{tone:"blue",children:e.jsxs(t.p,{children:["Use ",e.jsx(n,{children:"GetArgs"}),` only when every argument is a primitive value in registration order. For
reference types, nullable values, or instance methods, read `,e.jsx(n,{children:"context.Args"}),` explicitly so
you can validate and borrow correctly.`]})}),`
`,e.jsx(i,{children:"When to use"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsx(t.p,{children:"You are implementing a native method, property getter or setter, indexer, operator, or constructor."})}),e.jsx(r,{children:e.jsx(t.p,{children:"You need to translate between ShardScript objects and C++ primitives, strings, or native handles."})}),e.jsx(r,{children:e.jsx(t.p,{children:"You need to allocate a new object or array and hand ownership back to the VM."})})]}),`
`,e.jsx(i,{children:"When not to use"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsxs(t.p,{children:["The logic is pure ShardScript. Ordinary ",e.jsx(n,{children:".shard"}),` source files already have the correct
argument and return semantics and do not need manual borrowing.`]})}),e.jsx(r,{children:e.jsxs(t.p,{children:["You want to hold onto an argument past the callback without pinning it. For async callbacks, use"," ",`
`,e.jsx(n,{children:"ObjectRef"})," to keep the object alive."]})}),e.jsx(r,{children:e.jsxs(t.p,{children:[`You need to return a transient stack value or a raw pointer to local storage. These require collector
allocation or transient `,e.jsx(n,{children:"nint"})," boxing instead."]})})]}),`
`,e.jsx(i,{children:"Related articles"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"library-building/shardlib-entrypoint"})," — how"," ",`
`,e.jsx(n,{children:"SHARDLIB_GETMETADATA"})," and ",e.jsx(n,{children:"SHARDLIB_ENTRYPOINT"}),` expose a native
library to the runtime.`]})}),e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"library-building/accessibility-and-linking"})," — how"," ",`
`,e.jsx(n,{children:"LINK_STATIC"})," and ",e.jsx(n,{children:"LINK_INSTANCE"})," determine argument indexing."]})}),e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"library-building/headers-quick-reference"})," — which headers provide"," ",`
`,e.jsx(n,{children:"CallState"}),", ",e.jsx(n,{children:"ObjectInstance"}),", and the collector helpers."]})}),e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"library-building/native-helpers-reference"}),` — convenience helpers for constructing
objects, invoking methods, and reading or writing fields and properties from native callbacks.`]})}),e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"syntax/resource-management/01-garbage-collection"}),` — the ShardScript GC model that
makes borrowed arguments and collector-owned returns safe.`]})}),e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"syntax/resource-management/02-idisposable"}),` — patterns for native types that wrap
unmanaged handles.`]})})]})]})}function u(a={}){const{wrapper:t}=a.components||{};return t?e.jsx(t,{...a,children:e.jsx(h,{...a})}):h(a)}function c(a,t){throw new Error("Expected component `"+a+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};
