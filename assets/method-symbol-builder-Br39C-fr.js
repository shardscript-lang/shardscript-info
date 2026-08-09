import{j as e}from"./index-BsFLGxt-.js";function h(i){const r={p:"p",...i.components},{Bullet:s,Callout:o,CodeBlock:l,DocsTable:d,H2:a,InlineCode:t,Prose:n}=r;return s||c("Bullet"),o||c("Callout"),l||c("CodeBlock"),d||c("DocsTable"),a||c("H2"),t||c("InlineCode"),n||c("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(a,{children:"Summary"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx(t,{children:"SymbolBuilder<MethodSymbol>"})," is returned by ",e.jsx(t,{children:"AddMethod"}),`.
It exposes a chainable interface for completing the method signature and binding it to C++ code. Every
native callback has the same signature, so the builder is the place where the ShardScript-facing contract
(name, return type, linking, accessibility, parameters, generics) is reconciled with the C++ callback that
runs at runtime.`]})}),`
`,e.jsx(a,{children:"Syntax"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:["Obtain the builder from a parent ",e.jsx(t,{children:"SymbolBuilder"}),`, then chain the configuration calls
in any order before finally calling `,e.jsx(t,{children:"SetCallback"}),":"]})}),`
`,e.jsx(l,{code:`#include <ShardScript.hpp>

using namespace shard;

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> ns(context, L"mylibrary");

  SymbolBuilder<MethodSymbol> method = ns.AddMethod(
      L"Compute",
      TYPE_INT,
      LINK_STATIC,
      ACS_PUBLIC);

  method.AddParameter(L"left", TYPE_INT)
        .AddParameter(L"right", TYPE_INT)
        .SetCallback([](const CallState& context)
        {
            std::int64_t left = context.Args[0]->AsInteger();
            std::int64_t right = context.Args[1]->AsInteger();
            return context.Collector.FromValue(left + right);
        });
}`,language:"cpp",filename:"mylibrary.cpp"}),`
`,e.jsx(d,{headers:["Method","Parameters","Returns","Description"],rows:[[e.jsx(t,{children:"AddMethod(name, returnType, linking, access)"}),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:"name"}),", ",e.jsx(t,{children:"returnType"}),", ",e.jsx(t,{children:"linking"}),", ",e.jsx(t,{children:"access"})]}),e.jsx(t,{children:"SymbolBuilder<MethodSymbol>"}),"Creates a namespace-level method."],[e.jsx(t,{children:"AddMethod(name, returnType, linking, access)"}),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:"name"}),", ",e.jsx(t,{children:"returnType"}),", ",e.jsx(t,{children:"linking"}),", ",e.jsx(t,{children:"access"})]}),e.jsx(t,{children:"SymbolBuilder<MethodSymbol>"}),"Creates a class method."],[e.jsx(t,{children:"AddMethod(name, returnType, linking, access)"}),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:"name"}),", ",e.jsx(t,{children:"returnType"}),", ",e.jsx(t,{children:"linking"}),", ",e.jsx(t,{children:"access"})]}),e.jsx(t,{children:"SymbolBuilder<MethodSymbol>"}),"Creates a struct method."],[e.jsx(t,{children:"AddMethod(name, returnType, linking, access)"}),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:"name"}),", ",e.jsx(t,{children:"returnType"}),", ",e.jsx(t,{children:"linking"}),", ",e.jsx(t,{children:"access"})]}),e.jsx(t,{children:"SymbolBuilder<MethodSymbol>"}),"Creates an interface method signature."]]}),`
`,e.jsx(a,{children:"Parameters / Arguments"}),`
`,e.jsx(d,{headers:["Method","Parameters","Returns","Description"],rows:[[e.jsx(t,{children:"AddParameter(name, type)"}),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:"name"}),", ",e.jsx(t,{children:"type"})]}),e.jsx(t,{children:"SymbolBuilder<MethodSymbol>&"}),"Appends a parameter to the method signature. Parameters are evaluated in the order they are added."],[e.jsx(t,{children:"SetCallback(callback)"}),e.jsx(e.Fragment,{children:e.jsx(t,{children:"callback"})}),e.jsx(t,{children:"SymbolBuilder<MethodSymbol>&"}),"Binds the method invocation to native C++ code."],[e.jsx(t,{children:"AddTypeParameter(name)"}),e.jsx(e.Fragment,{children:e.jsx(t,{children:"name"})}),e.jsx(t,{children:"SymbolBuilder<TypeParameterSymbol>"}),"Adds a generic type parameter to the method."],[e.jsx(t,{children:"IsImplementationOf(abstractMethod)"}),e.jsx(e.Fragment,{children:e.jsx(t,{children:"abstractMethod"})}),e.jsx(t,{children:"SymbolBuilder<MethodSymbol>&"}),"Marks this method as the concrete implementation of an interface or abstract method."],[e.jsx(t,{children:"DeclareGlobal()"}),"None",e.jsx(t,{children:"SymbolBuilder<MethodSymbol>&"}),"Registers the method so it can be invoked without a namespace prefix."]]}),`
`,e.jsx(a,{children:"Returns"}),`
`,e.jsx(d,{headers:["Call","Return type","Description"],rows:[[e.jsx(t,{children:"AddParameter"}),e.jsx(t,{children:"SymbolBuilder<MethodSymbol>&"}),"Returns the same method builder so calls can be chained."],[e.jsx(t,{children:"SetCallback"}),e.jsx(t,{children:"SymbolBuilder<MethodSymbol>&"}),"Returns the same method builder."],[e.jsx(t,{children:"IsImplementationOf"}),e.jsx(t,{children:"SymbolBuilder<MethodSymbol>&"}),"Returns the same method builder."],[e.jsx(t,{children:"DeclareGlobal"}),e.jsx(t,{children:"SymbolBuilder<MethodSymbol>&"}),"Returns the same method builder."],[e.jsx(t,{children:"AddTypeParameter"}),e.jsx(t,{children:"SymbolBuilder<TypeParameterSymbol>"}),"Returns a new builder for the type parameter. Call <InlineCode>.Get()</InlineCode> to retrieve the <InlineCode>TypeParameterSymbol*</InlineCode>."],[e.jsx(t,{children:".Get()"}),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:"MethodSymbol*"})," or ",e.jsx(t,{children:"TypeParameterSymbol*"})]}),"Retrieves the raw symbol pointer from the builder."]]}),`
`,e.jsx(a,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Parameter type mismatch at runtime"}),` — ShardScript resolves
overloads by name, parameter count, and parameter types. If the registered parameter list does not match
the call site, overload resolution fails.`]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Missing callback"})," — A method registered without"," ",`
`,e.jsx(t,{children:"SetCallback"})," resolves at compile time but does nothing when invoked."]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Instance callback reads the wrong argument"})," — For"," ",`
`,e.jsx(t,{children:"LINK_INSTANCE"})," methods, ",e.jsx(t,{children:"context.Args[0]"})," is"," ",`
`,e.jsx(t,{children:"this"}),". Treating it as the first real parameter reads instance state as a parameter."]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Type parameter index out of range"})," — Reading"," ",`
`,e.jsx(t,{children:"context.Frame->TypeArguments"}),` at an index that does not correspond to an
`,e.jsx(t,{children:"AddTypeParameter"})," call produces undefined behavior."]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Interface implementation mismatch"})," —"," ",`
`,e.jsx(t,{children:"IsImplementationOf"}),` requires matching name, return type, parameter count, and
parameter types. A mismatch may cause the interface to remain unimplemented.`]})})]}),`
`,e.jsx(a,{children:"Remarks"}),`
`,e.jsx(o,{tone:"blue",title:"Native library shape",children:e.jsxs(r.p,{children:["A ShardScript native library is any shared library (",e.jsx(t,{children:".dll"})," on Windows, ",e.jsx(t,{children:".so"})," on Linux, ",e.jsx(t,{children:".dylib"})," on macOS) that exports the two C-linkage symbols ",e.jsx(t,{children:"ShardLib_GetMetadata"})," and ",e.jsx(t,{children:"ShardLib_EntryPoint"}),". It can be built from one or many C++ source files, live inside ",e.jsx(t,{children:"ShardScript.Framework"})," or in a completely separate project, and links against the ShardScript runtime shared library using headers from ",e.jsx(t,{children:"ShardScript/include"}),". For the full registration contract, see ",e.jsx(t,{children:"native-library-overview.mdx"}),"."]})}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Callback contract."}),` Every native callback, whether for a static method, an instance method,
a property getter, or an operator, has the same C++ signature:`]})}),`
`,e.jsx(l,{code:"shard::ObjectInstance* Callback(const shard::CallState& context);",language:"cpp"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:["The ",e.jsx(t,{children:"context.Args"})," span contains ",e.jsx(t,{children:"ObjectInstance*"}),` pointers in
the order the parameters were registered. For `,e.jsx(t,{children:"LINK_INSTANCE"}),` methods, the first
element is the instance pointer. Read primitive values with helpers such as`," ",`
`,e.jsx(t,{children:"AsInteger()"}),", ",e.jsx(t,{children:"AsDouble()"}),", or ",e.jsx(t,{children:"AsString()"}),`,
and box return values through `,e.jsx(t,{children:"context.Collector.FromValue(...)"}),"."]})}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Method-level type parameters."})," A type parameter added with"," ",`
`,e.jsx(t,{children:"AddTypeParameter"}),` is scoped to the method. At runtime the concrete substitution is
available through `,e.jsx(t,{children:"context.Frame->TypeArguments"}),`, in the same order as the
`,e.jsx(t,{children:"AddTypeParameter"})," calls. Use the captured ",e.jsx(t,{children:"TypeParameterSymbol*"}),`
when registering parameter types or when constructing generic types through`," ",`
`,e.jsx(t,{children:"SymbolFactory"}),"."]})}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Interface implementations."}),` To implement an interface method, capture the interface method
symbol with `,e.jsx(t,{children:".Get()"})," when registering the interface, then pass that pointer to"," ",`
`,e.jsx(t,{children:"IsImplementationOf"}),` on the implementing class method. The parent class must also call
`,e.jsx(t,{children:"Implements(interfaceSymbol)"}),"."]})}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Global methods."})," Calling ",e.jsx(t,{children:"DeclareGlobal()"}),` on a namespace-level method
makes it callable without the namespace prefix. Use sparingly to avoid polluting the global namespace.`]})}),`
`,e.jsx(o,{tone:"blue",children:e.jsxs(r.p,{children:[`Keep cross-library symbol lookups lazy. If a callback uses types from another native library, look them up
inside an `,e.jsx(t,{children:"EnsureSymbols"}),` helper called from the callback rather than caching pointers
during static initialization.`]})}),`
`,e.jsx(a,{children:"Examples"}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"Namespace-level static method with multiple parameters."})}),`
`,e.jsx(l,{code:`static ObjectInstance* mylibrary_add(const CallState& context)
{
  std::int64_t left = context.Args[0]->AsInteger();
  std::int64_t right = context.Args[1]->AsInteger();
  std::int64_t sum = left + right;

  return context.Collector.FromValue(sum);
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> ns(context, L"mylibrary");

  ns.AddMethod(L"Add", TYPE_INT, LINK_STATIC, ACS_PUBLIC)
    .AddParameter(L"left", TYPE_INT)
    .AddParameter(L"right", TYPE_INT)
    .SetCallback(&mylibrary_add);
}`,language:"cpp",filename:"mylibrary.cpp"}),`
`,e.jsx(n,{children:e.jsx(r.p,{children:"ShardScript usage:"})}),`
`,e.jsx(l,{code:`using stdio;
using mylibrary;

namespace demo;

public static func Main() -> void
{
  result: int = mylibrary.Add(10, 32);
  println(result);   // 42
}`,language:"csharp",filename:"app.shard"}),`
`,e.jsx(n,{children:e.jsxs("strong",{children:["Instance method that reads ",e.jsx(t,{children:"this"}),"."]})}),`
`,e.jsx(l,{code:`static FieldSymbol* g_counter_value = nullptr;

static ObjectInstance* counter_increment(const CallState& context)
{
  ObjectInstance* self = context.Args[0];
  std::int64_t delta = context.Args[1]->AsInteger();

  ObjectInstance* currentObj = self->GetField(g_counter_value->SlotIndex);
  std::int64_t current = currentObj->AsInteger();
  std::int64_t next = current + delta;

  self->SetField(g_counter_value->SlotIndex, context.Collector.FromValue(next));

  return context.Collector.FromValue(next);
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> ns(context, L"counters");

  ns.AddClass(L"Counter", ACS_PUBLIC, LINK_INSTANCE, [](SymbolBuilder<ClassSymbol> cls)
  {
      g_counter_value = cls.AddField(L"_value", TYPE_INT, LINK_INSTANCE, ACS_PRIVATE);

      cls.AddInit()
         .SetCallback([](const CallState& context)
         {
             ObjectInstance* self = context.Args[0];
             self->SetField(g_counter_value->SlotIndex, context.Collector.FromValue(0));
             return self;
         });

      cls.AddMethod(L"Increment", TYPE_INT, LINK_INSTANCE, ACS_PUBLIC)
         .AddParameter(L"delta", TYPE_INT)
         .SetCallback(&counter_increment);
  });
}`,language:"cpp",filename:"counters.cpp"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Generic method with a type parameter."}),` The method-level type parameter is used both as a
parameter type and to allocate a correctly typed array.`]})}),`
`,e.jsx(l,{code:`static ObjectInstance* utils_toArray(const CallState& context)
{
  TypeSymbol* concreteT = context.Frame->TypeArguments[0];
  ObjectInstance* value = context.Args[0];

  ObjectInstance* arr = context.Collector.AllocateArray(concreteT, 1);
  arr->SetElement(0, value, context.Frame);

  return arr;
}

SHARDLIB_ENTRYPOINT
{
  SymbolFactory factory(context.GetSemanticModel().Table.get());
  SymbolBuilder<NamespaceSymbol> ns(context, L"utils");

  ArrayTypeSymbol* byteArray = factory.Array(TYPE_BYTE);
  SymbolBuilder<MethodSymbol> toArray = ns.AddMethod(
      L"ToArray", byteArray, LINK_STATIC, ACS_PUBLIC);

  TypeParameterSymbol* t = toArray.AddTypeParameter(L"T").Get();

  toArray.AddParameter(L"value", t)
         .SetCallback(&utils_toArray);
}`,language:"cpp",filename:"utils.cpp"}),`
`,e.jsx(n,{children:e.jsx(r.p,{children:"ShardScript usage:"})}),`
`,e.jsx(l,{code:`using stdio;
using utils;

namespace demo;

public static func Main() -> void
{
  arr: int[] = utils.ToArray<int>(7);
  println(arr[0]);   // 7
}`,language:"csharp",filename:"app.shard"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Implementing an interface method."}),` The interface method symbol is captured so the class
method can declare itself as the concrete implementation.`]})}),`
`,e.jsx(l,{code:`static ObjectInstance* console_log(const CallState& context)
{
  ObjectInstance* self = context.Args[0];
  const wchar_t* message = context.Args[1]->AsString();

  // Forward the message to the host console.
  wprintf(L"%ls\\n", message);

  return nullptr;
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> ns(context, L"logging");

  SymbolBuilder<InterfaceSymbol> iLogger = ns.AddInterface(L"ILogger", ACS_PUBLIC);
  MethodSymbol* logMethod = iLogger.AddMethod(L"Log", TYPE_VOID, LINK_INSTANCE, ACS_PUBLIC)
                                  .AddParameter(L"message", TYPE_STRING)
                                  .Get();
  iLogger.DeclareGlobal();

  ns.AddClass(L"ConsoleLogger", ACS_PUBLIC, LINK_INSTANCE, [&](SymbolBuilder<ClassSymbol> cls)
  {
      cls.Implements(iLogger.Get());

      cls.AddMethod(L"Log", TYPE_VOID, LINK_INSTANCE, ACS_PUBLIC)
         .AddParameter(L"message", TYPE_STRING)
         .IsImplementationOf(logMethod)
         .SetCallback(&console_log);
  });
}`,language:"cpp",filename:"logging.cpp"}),`
`,e.jsx(n,{children:e.jsx(r.p,{children:"ShardScript usage:"})}),`
`,e.jsx(l,{code:`using stdio;
using logging;

namespace demo;

public static func Main() -> void
{
  logger: ILogger = new ConsoleLogger();
  logger.Log("Hello from the native logger");
}`,language:"csharp",filename:"app.shard"}),`
`,e.jsx(a,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx(t,{children:"library-building/class-symbol-builder"})," — registering classes."]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx(t,{children:"library-building/accessibility-and-linking"})," — linking modes and accessibility."]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx(t,{children:"library-building/reading-arguments"})," — reading arguments in callbacks."]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx(t,{children:"library-building/returning-values"})," — returning values from callbacks."]})})]}),`
`,e.jsx(a,{children:"Source"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:["The native side of this API is implemented in ",e.jsx(t,{children:"shard/semantic/SymbolBuilder.hpp"}),`.
View the source on GitHub: `,e.jsx(t,{children:"https://github.com/Rikitav/ShardScript/blob/main/ShardScript/include/shard/semantic/SymbolBuilder.hpp"}),"."]})})]})}function x(i={}){const{wrapper:r}=i.components||{};return r?e.jsx(r,{...i,children:e.jsx(h,{...i})}):h(i)}function c(i,r){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
