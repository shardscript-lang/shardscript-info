import{j as e}from"./index-hFDFiLgA.js";function h(i){const n={p:"p",...i.components},{Bullet:s,Callout:c,CodeBlock:a,DocsTable:d,H2:l,InlineCode:t,Prose:r}=n;return s||o("Bullet"),c||o("Callout"),a||o("CodeBlock"),d||o("DocsTable"),l||o("H2"),t||o("InlineCode"),r||o("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(l,{children:"Summary"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[`This article catalogs the most frequent failures that occur when authoring a ShardScript native C++
library and the concrete code changes that fix them. The symptoms apply regardless of whether the library
is built inside `,e.jsx(t,{children:"ShardScript.Framework"})," or as a standalone project."]})}),`
`,e.jsx(l,{children:"Syntax"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[`Native callbacks share a single signature. Every problem in this article manifests inside a callback
registered through `,e.jsx(t,{children:".SetCallback(...)"}),`, inside the entry point that registers
the symbol, or in the way the runtime sees the registered type.`]})}),`
`,e.jsx(a,{code:"shard::ObjectInstance* Callback(const shard::CallState& context);",language:"cpp"}),`
`,e.jsx(d,{headers:["Problem","Usual location","One-line fix"],rows:[["Callback is never called.","Registration (SHARDLIB_ENTRYPOINT)","Call .SetCallback(...) and match LINK_STATIC / LINK_INSTANCE to the call site."],["Generic type arguments are wrong.","Callback body","Read context.Frame->TypeArguments and allocate with AllocateGeneric."],["AsString() crashes.","Callback body","Guard against nullptr and GarbageCollector::NullInstance."],["Native pointer is freed by the GC.","Callback return","Pass isTransient = true to Collector.FromNint for external handles."],["Cross-library type lookups are null.","Static state / callback body","Use lazy EnsureSymbols helpers called from the callback."],["Async callback runs after collection.","Async continuation","Pin the instance with ObjectRef before capturing it."],["Overload resolution fails.","Registration","Differ by parameter count and types; use TYPE_ANY explicitly."],["Returning a struct behaves unexpectedly.","Callback body","Allocate an instance with AllocateInstance and return it."],["getInfo() returns the generic definition.","Callback body / reflection","Read concrete arguments from instance->getShape()->GenericArguments."]]}),`
`,e.jsx(l,{children:"Parameters / Arguments"}),`
`,e.jsx(r,{children:e.jsx(n.p,{children:'The "parameters" of each failure are the registration choices and runtime values that trigger it.'})}),`
`,e.jsx(d,{headers:["Failure input","What it looks like in code","Why it fails"],rows:[[e.jsx(t,{children:".SetCallback omitted"}),'method.AddParameter(L"x", TYPE_INT);',"The symbol resolves but has no native target."],[e.jsx(t,{children:"LINK_STATIC registered"}),e.jsx(t,{children:"obj.Method() called"}),"The VM does not pass this, so argument indices shift."],[e.jsx(t,{children:"LINK_INSTANCE registered"}),e.jsx(t,{children:"Type.Method() called"}),"The VM expects this but the call site does not provide it."],["Raw generic class used at runtime",e.jsx(t,{children:"AllocateInstance(rawClass)"}),"The instance has no concrete type substitutions."],[e.jsx(t,{children:"nullptr passed to AsString()"}),e.jsx(t,{children:"context.Args[0]->AsString()"}),"Null instances do not have a string payload."],["External handle boxed as managed pointer",e.jsx(t,{children:"FromNint(handle, false)"}),"The GC eventually calls the library destructor on foreign memory."],["Cross-library symbol cached globally",e.jsx(t,{children:"static TypeSymbol* t = FindTypeByName(...);"}),"Load order is not guaranteed; the other library may not be registered yet."],["Instance captured by raw pointer in async work",e.jsx(t,{children:"state->Instance = instance;"}),"The GC cannot see the captured pointer and may collect the object."],["Overloads differ only by name","Two methods named Add with different bodies","Resolution uses name + count + types."],[e.jsx(t,{children:"getInfo() on a generic instance"}),e.jsx(t,{children:"instance->getInfo()"}),"getInfo returns the raw definition; constructed type data lives elsewhere."]]}),`
`,e.jsx(l,{children:"Returns"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:["A correctly written native callback returns a GC-owned ",e.jsx(t,{children:"ObjectInstance*"}),", or"," ",`
`,e.jsx(t,{children:"nullptr"})," for ",e.jsx(t,{children:"void"}),` methods. The fixes in this article do
not change the return type; they change how the return value is produced or how the arguments that feed
it are validated.`]})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(n.p,{children:["Primitive results are boxed through ",e.jsx(t,{children:"context.Collector.FromValue(...)"}),"."]})}),e.jsx(s,{children:e.jsxs(n.p,{children:["Opaque native pointers are boxed through"," ",`
`,e.jsx(t,{children:"context.Collector.FromNint(ptr, isTransient)"}),"."]})}),e.jsx(s,{children:e.jsxs(n.p,{children:["Generic instances are allocated through"," ",`
`,e.jsx(t,{children:"context.Collector.AllocateGeneric(rawClass, { concreteT })"}),"."]})}),e.jsx(s,{children:e.jsxs(n.p,{children:["Struct values are allocated through"," ",`
`,e.jsx(t,{children:"context.Collector.AllocateInstance(structClass)"})," and returned by pointer."]})})]}),`
`,e.jsx(l,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Symbol resolves but callback never runs"})," — Forgetting"," ",`
`,e.jsx(t,{children:".SetCallback(...)"}),", or registering with ",e.jsx(t,{children:"LINK_STATIC"})," ",`
and calling the member on an instance (or vice versa), leaves the method without an executable target.`]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Wrong generic type at runtime"}),` — Reading type arguments
from the wrong frame level, allocating the raw generic definition, or indexing`," ",`
`,e.jsx(t,{children:"TypeArguments"}),` in the wrong order produces a type mismatch or a crash when the
VM uses the concrete substitution.`]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Access violation in AsString"})," — Calling"," ",`
`,e.jsx(t,{children:"AsString()"})," on ",e.jsx(t,{children:"nullptr"})," or"," ",`
`,e.jsx(t,{children:"GarbageCollector::NullInstance"})," dereferences a null or sentinel payload."]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Double-free or use-after-free of native memory"}),` — Passing
an external handle to `,e.jsx(t,{children:"FromNint(ptr, false)"}),` tells the GC it owns the memory. The
library destructor is later invoked on memory that was never allocated by the library.`]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Null cross-library TypeSymbol*"}),` — Caching a pointer during
static initialization or even inside `,e.jsx(t,{children:"SHARDLIB_ENTRYPOINT"}),` can happen before the
depended-on library has registered its symbols.`]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Async callback accesses collected object"}),` — Capturing a
raw `,e.jsx(t,{children:"ObjectInstance*"}),` in a thread-pool or libuv continuation allows the GC to
reclaim the object before the continuation runs.`]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Ambiguous overload resolution"}),` — ShardScript resolves
overloads by name, parameter count, and parameter types. Two overloads with the same name and identical
signatures, or overloads that differ only by return type, cannot be distinguished.`]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Struct returned as null or unboxed incorrectly"}),` — Structs
are value types. Returning a raw pointer to stack memory or forgetting to allocate an instance produces
undefined behavior; the VM expects a managed instance it can copy.`]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Reflection sees the generic definition, not the constructed type"})," ",`
— `,e.jsx(t,{children:"instance->getInfo()"})," always returns the raw ",e.jsx(t,{children:"ClassSymbol"}),`.
The concrete substitutions are stored on the instance shape.`]})})]}),`
`,e.jsx(l,{children:"Remarks"}),`
`,e.jsx(c,{tone:"blue",title:"Native library shape",children:e.jsxs(n.p,{children:["A ShardScript native library is any shared library (",e.jsx(t,{children:".dll"})," on Windows, ",e.jsx(t,{children:".so"})," on Linux, ",e.jsx(t,{children:".dylib"})," on macOS) that exports the two C-linkage symbols ",e.jsx(t,{children:"ShardLib_GetMetadata"})," and ",e.jsx(t,{children:"ShardLib_EntryPoint"}),". It can be built from one or many C++ source files, live inside ",e.jsx(t,{children:"ShardScript.Framework"})," or in a completely separate project, and links against the ShardScript runtime shared library using headers from ",e.jsx(t,{children:"ShardScript/include"}),". For the full registration contract, see ",e.jsx(t,{children:"native-library-overview.mdx"}),"."]})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Argument ownership."}),` Arguments passed to a callback are borrowed. Do not delete or free
them. Return values must be owned by the garbage collector so the VM can track them. Any object that
escapes the synchronous callback boundary, such as an instance captured by an async continuation, must be
pinned with `,e.jsx(t,{children:"ObjectRef"})," until the asynchronous work completes."]})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Generic argument frames."})," For generic classes, ",e.jsx(t,{children:"context.Frame->TypeArguments"}),`
contains the concrete substitutions in the same order as the `,e.jsx(t,{children:"AddTypeParameter"}),` calls.
For generic methods, the type arguments are also in the method frame, but the frame that supplies them may
differ from the class frame. Always allocate constructed generic instances with`," ",`
`,e.jsx(t,{children:"AllocateGeneric(rawClass, { concreteT })"})," rather than"," ",`
`,e.jsx(t,{children:"AllocateInstance(rawClass)"}),"."]})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Cross-library symbol lifetime."}),` The loader enforces dependency order before your entry
point runs, but it does not guarantee that another library's symbols are reachable from your static
initializers. Perform cross-library lookups lazily inside `,e.jsx(t,{children:"EnsureSymbols(SymbolTable*)"}),`
helpers and call those helpers from the callback body. This pattern avoids both null-pointer crashes and
brittle static initialization order.`]})}),`
`,e.jsx(c,{tone:"blue",children:e.jsxs(n.p,{children:[`If a problem is not listed here, check the registration contract first: does the shared library export
both `,e.jsx(t,{children:"ShardLib_GetMetadata"})," and ",e.jsx(t,{children:"ShardLib_EntryPoint"}),`, are
the headers from `,e.jsx(t,{children:"ShardScript/include"}),` on the include path, and does the binary link
against the ShardScript runtime shared library?`]})}),`
`,e.jsx(l,{children:"Examples"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"1. Callback is never called."})," The most common cause is forgetting"," ",`
`,e.jsx(t,{children:".SetCallback(...)"})," or mismatching the linking mode."]})}),`
`,e.jsx(a,{code:`SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> demo(context, L"demo");

  demo.AddClass(L"Counter", ACS_PUBLIC, LINK_STATIC, [](SymbolBuilder<ClassSymbol> counter)
  {
      // CORRECT: SetCallback is called and LINK_STATIC matches Type.Method() usage.
      counter.AddMethod(L"Next", TYPE_INT, LINK_STATIC, ACS_PUBLIC)
             .SetCallback([](const CallState& context)
             {
                 static std::int64_t value = 0;
                 value = value + 1;
                 return context.Collector.FromValue(value);
             });

      // WRONG: missing .SetCallback(...). The symbol resolves but nothing runs.
      counter.AddMethod(L"Broken", TYPE_INT, LINK_STATIC, ACS_PUBLIC);

      // WRONG for a static call site: LINK_INSTANCE would require an instance.
      // counter.AddMethod(L"Next", TYPE_INT, LINK_INSTANCE, ACS_PUBLIC)
      //        .SetCallback(...);
  });
}`,language:"cpp"}),`
`,e.jsx(r,{children:e.jsx(n.p,{children:"ShardScript usage:"})}),`
`,e.jsx(a,{code:`using stdio;
using demo;

namespace program;

public static func Main() -> void
{
  value: int = Counter.Next();
  println(value);   // 1
}`,language:"csharp"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"2. Generic type arguments are wrong at runtime."}),` Read type arguments from the frame and
allocate the constructed generic.`]})}),`
`,e.jsx(a,{code:`static ClassSymbol* g_boxClass = nullptr;
static TypeParameterSymbol* g_boxT = nullptr;
static FieldSymbol* g_valueField = nullptr;

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> demo(context, L"demo");

  g_boxClass = demo.AddClass(L"Box", ACS_PUBLIC, LINK_INSTANCE, [](SymbolBuilder<ClassSymbol> box)
  {
      g_boxT = box.AddTypeParameter(L"T").Get();
      g_valueField = box.AddField(L"_value", g_boxT, LINK_INSTANCE, ACS_PRIVATE);

      box.AddInit()
         .AddParameter(L"value", g_boxT)
         .SetCallback([](const CallState& context)
         {
             ObjectInstance* self = context.Args[0];
             ObjectInstance* value = context.Args[1];

             // Store the value in a field typed as the type parameter.
             self->SetField(g_valueField->SlotIndex, value);
             return self;
         });
  });
}

static ObjectInstance* make_box(const CallState& context)
{
  // The concrete substitution for T is the first type argument on the current frame.
  TypeSymbol* concreteT = context.Frame->TypeArguments[0];

  // Allocate the constructed generic, not the raw definition.
  ObjectInstance* box = context.Collector.AllocateGeneric(g_boxClass, { concreteT });

  // The constructor parameter expects an instance of the concrete type.
  ObjectInstance* initial = context.Collector.FromValue(42);
  box->SetField(g_valueField->SlotIndex, initial);

  return box;
}`,language:"cpp"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"3. AsString() crashes on a null argument."}),` Always guard reference arguments before
dereferencing them.`]})}),`
`,e.jsx(a,{code:`static ObjectInstance* safe_concat(const CallState& context)
{
  ObjectInstance* left = context.Args[0];
  ObjectInstance* right = context.Args[1];

  if (left == nullptr || left == GarbageCollector::NullInstance)
  {
      return context.Collector.FromValue(std::wstring());
  }

  if (right == nullptr || right == GarbageCollector::NullInstance)
  {
      return context.Collector.FromValue(std::wstring(left->AsString()));
  }

  std::wstring result = std::wstring(left->AsString()) + std::wstring(right->AsString());
  return context.Collector.FromValue(result);
}`,language:"cpp"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"4. Native pointer is freed by the GC."}),` Mark external handles as transient so the GC does
not call the library destructor on them.`]})}),`
`,e.jsx(a,{code:`static ObjectInstance* wrap_handle(const CallState& context)
{
  // This handle points to memory owned by the OS or a third-party library.
  void* osHandle = OpenNativeResource();

  // isTransient = true: the GC will not try to free this pointer.
  return context.Collector.FromNint(osHandle, true);
}`,language:"cpp"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"5. Cross-library type lookups are null."}),` Use a lazy lookup helper that runs inside the
callback.`]})}),`
`,e.jsx(a,{code:`static TypeSymbol* g_listType = nullptr;

static void EnsureSymbols(SymbolTable* table)
{
  if (g_listType != nullptr)
  {
      return;
  }

  // Lazy lookup avoids brittle static initialization order between libraries.
  g_listType = SemanticModel::FindTypeByName(table, L"collections.List");
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> demo(context, L"demo");

  demo.AddMethod(L"UseList", TYPE_VOID, LINK_STATIC, ACS_PUBLIC)
      .SetCallback([](const CallState& context)
      {
          EnsureSymbols(context.GetSemanticModel().Table.get());

          // g_listType is now valid, or the lookup failed and can be reported.
          return nullptr;
      });
}`,language:"cpp"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"6. Async callback runs after the object was collected."})," Pin the object with"," ",`
`,e.jsx(t,{children:"ObjectRef"})," before the continuation captures it."]})}),`
`,e.jsx(a,{code:`#include <shard/runtime/NativeAsync.hpp>

struct DelayedState
{
  ObjectRef InstanceRef;
};

static ObjectInstance* delayed_read(const CallState& context) noexcept
{
  ObjectInstance* instance = context.Args[0];

  return shard::DoAsync(context, [instance](shard::AsyncScope async)
  {
      std::shared_ptr<DelayedState> state = std::make_shared<DelayedState>();

      // Pin the instance so it survives until the async continuation finishes.
      state->InstanceRef = ObjectRef(instance);

      async.Delay(100, [state, async]() mutable
      {
          // Safe to use state->InstanceRef.Get() here because the pin is still alive.
          async.Complete();
      });
  });
}`,language:"cpp"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"7. Method overload resolution fails."}),` Overloads must differ by parameter count and
parameter types.`]})}),`
`,e.jsx(a,{code:`SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> demo(context, L"demo");

  demo.AddClass(L"Writer", ACS_PUBLIC, LINK_STATIC, [](SymbolBuilder<ClassSymbol> writer)
  {
      // Overload 1: one integer argument.
      writer.AddMethod(L"Write", TYPE_VOID, LINK_STATIC, ACS_PUBLIC)
            .AddParameter(L"value", TYPE_INT)
            .SetCallback(&write_int);

      // Overload 2: one string argument.
      writer.AddMethod(L"Write", TYPE_VOID, LINK_STATIC, ACS_PUBLIC)
            .AddParameter(L"value", TYPE_STRING)
            .SetCallback(&write_string);

      // Overload 3: two arguments.
      writer.AddMethod(L"Write", TYPE_VOID, LINK_STATIC, ACS_PUBLIC)
            .AddParameter(L"key", TYPE_STRING)
            .AddParameter(L"value", TYPE_ANY)
            .SetCallback(&write_key_value);
  });
}`,language:"cpp"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"8. Returning a struct by value."})," Allocate a managed instance and let the VM copy the value."]})}),`
`,e.jsx(a,{code:`static ClassSymbol* g_pointClass = nullptr;
static FieldSymbol* g_xField = nullptr;
static FieldSymbol* g_yField = nullptr;

static ObjectInstance* make_point(const CallState& context)
{
  ObjectInstance* point = context.Collector.AllocateInstance(g_pointClass);

  // Structs are value types; the returned instance is copied by the VM as needed.
  point->SetField(g_xField->SlotIndex, context.Collector.FromValue(context.Args[0]->AsDouble()));
  point->SetField(g_yField->SlotIndex, context.Collector.FromValue(context.Args[1]->AsDouble()));

  return point;
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> demo(context, L"demo");

  g_pointClass = demo.AddStruct(L"Point", ACS_PUBLIC, LINK_INSTANCE, [](SymbolBuilder<StructSymbol> point)
  {
      g_xField = point.AddField(L"X", TYPE_DOUBLE, LINK_INSTANCE, ACS_PUBLIC);
      g_yField = point.AddField(L"Y", TYPE_DOUBLE, LINK_INSTANCE, ACS_PUBLIC);

      point.AddMethod(L"Create", TYPE_ANY, LINK_STATIC, ACS_PUBLIC)
           .AddParameter(L"x", TYPE_DOUBLE)
           .AddParameter(L"y", TYPE_DOUBLE)
           .SetCallback(&make_point);
  });
}`,language:"cpp"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"9. getInfo() returns the generic definition, not the constructed type."}),` Inspect the
instance shape for concrete type arguments.`]})}),`
`,e.jsx(a,{code:`static ObjectInstance* describe_box(const CallState& context)
{
  ObjectInstance* instance = context.Args[0];

  // getInfo() always returns the raw ClassSymbol definition.
  ClassSymbol* definition = static_cast<ClassSymbol*>(instance->getInfo());

  TypeSymbol* concreteT = nullptr;

  // The constructed type arguments live on the instance shape.
  if (instance->getShape() != nullptr && !instance->getShape()->GenericArguments.empty())
  {
      concreteT = instance->getShape()->GenericArguments[0];
  }

  // Use concreteT for type-specific logic...
  return context.Collector.FromValue(std::wstring(definition->Name));
}`,language:"cpp"}),`
`,e.jsx(l,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"library-building/design-best-practices"})," — design best practices."]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"library-building/garbage-collection-rules"})," — GC and lifetime rules."]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"library-building/working-with-objects"})," — common object manipulation mistakes."]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"library-building/headers-quick-reference"})," — header locations."]})})]}),`
`,e.jsx(l,{children:"Source"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:["Framework system libraries live in ",e.jsx(t,{children:"ShardScript.Framework/system/"}),`.
Browse the directory on GitHub: `,e.jsx(t,{children:"https://github.com/Rikitav/ShardScript/blob/main/ShardScript.Framework/system/"}),"."]})})]})}function x(i={}){const{wrapper:n}=i.components||{};return n?e.jsx(n,{...i,children:e.jsx(h,{...i})}):h(i)}function o(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
