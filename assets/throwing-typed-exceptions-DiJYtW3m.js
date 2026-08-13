import{j as e}from"./index-DLc5xCYN.js";function d(c){const n={p:"p",...c.components},{Bullet:r,CodeBlock:i,H2:a,InlineCode:t,Prose:s}=n;return r||l("Bullet"),i||l("CodeBlock"),a||l("H2"),t||l("InlineCode"),s||l("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(a,{children:"Prerequisites"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsx(n.p,{children:"A C++20 toolchain and a built ShardScript runtime shared library."})}),e.jsx(r,{children:e.jsxs(n.p,{children:["The ShardScript headers in ",e.jsx(t,{children:"ShardScript/include"})," on your include path."]})}),e.jsx(r,{children:e.jsxs(n.p,{children:["Familiarity with ",e.jsx(t,{children:"SHARDLIB_ENTRYPOINT"}),","," ",`
`,e.jsx(t,{children:"SymbolBuilder"}),", and the native callback contract."]})}),e.jsx(r,{children:e.jsxs(n.p,{children:["Understanding of the ",e.jsx(t,{children:"IThrowable"})," interface and ShardScript"," ",`
`,e.jsx(t,{children:"try"}),"/",e.jsx(t,{children:"catch"})," semantics."]})})]}),`
`,e.jsx(a,{children:"Goal"}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[`Register a custom exception class inside a native library and throw it from C++ so that ShardScript code
can catch a specific type instead of the generic `,e.jsx(t,{children:"RuntimeException"}),"."]})}),`
`,e.jsx(a,{children:"Step-by-Step Instructions"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"1. Include the runtime exception header."})}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:["Add ",e.jsx(t,{children:"<shard/runtime/RuntimeException.hpp>"}),` alongside the usual ShardScript
umbrella header.`]})}),`
`,e.jsx(i,{code:`#include <ShardScript.hpp>
#include <shard/runtime/RuntimeException.hpp>

#include <string>

using namespace shard;`,language:"cpp",filename:"mylib.shard.cpp"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"2. Declare globals for the symbol table and backing fields."})}),`
`,e.jsx(s,{children:e.jsx(n.p,{children:"The accessor callbacks need to read the backing fields at runtime. Store them as file-scoped globals."})}),`
`,e.jsx(i,{code:`static SymbolTable* g_symbolTable = nullptr;
static FieldSymbol* g_messageField = nullptr;
static FieldSymbol* g_stackTraceField = nullptr;
static TypeSymbol* g_myExceptionType = nullptr;`,language:"cpp",filename:"mylib.shard.cpp"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"3. Implement the exception class in the library entry point."})}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:["Register a class that implements ",e.jsx(t,{children:"IThrowable"}),", exposes ",e.jsx(t,{children:"message"}),`
and `,e.jsx(t,{children:"stack_trace"})," properties, and caches their backing fields."]})}),`
`,e.jsx(i,{code:`static ObjectInstance* my_exception_get_message(const CallState& context)
{
  return context.Args[0]->GetField(g_messageField);
}

static ObjectInstance* my_exception_get_stack_trace(const CallState& context)
{
  return context.Args[0]->GetField(g_stackTraceField);
}

SHARDLIB_ENTRYPOINT
{
  g_symbolTable = context.GetSemanticModel().Table.get();

  SymbolBuilder<NamespaceSymbol> ns(context, L"mylib");

  ns.AddClass(L"MyException", ACS_PUBLIC, LINK_INSTANCE, [](SymbolBuilder<ClassSymbol> exceptionClass)
  {
      exceptionClass
          .Implements(TRAIT_THROWABLE)
          .AddInit();

      SymbolBuilder<PropertySymbol> messageProp = exceptionClass.AddProperty(
          L"message", TYPE_STRING, LINK_INSTANCE, ACS_PUBLIC);
      g_messageField = messageProp.AddBackingField().Get();
      messageProp.AddGetter()
          .IsImplementationOf(TRAIT_THROWABLE_getMessage)
          .SetCallback(&my_exception_get_message);

      SymbolBuilder<PropertySymbol> stackTraceProp = exceptionClass.AddProperty(
          L"stack_trace", TYPE_STRING, LINK_INSTANCE, ACS_PUBLIC);
      g_stackTraceField = stackTraceProp.AddBackingField().Get();
      stackTraceProp.AddGetter()
          .IsImplementationOf(TRAIT_THROWABLE_getStackTrace)
          .SetCallback(&my_exception_get_stack_trace);

      g_myExceptionType = exceptionClass.Get();
  });

  // Register the rest of the library here.
}`,language:"cpp",filename:"mylib.shard.cpp"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"4. Add a helper that throws the typed exception."})}),`
`,e.jsx(s,{children:e.jsx(n.p,{children:"A small helper keeps throw sites readable and consistent."})}),`
`,e.jsx(i,{code:`static void ThrowMyException(const std::wstring& message)
{
  if (g_myExceptionType == nullptr)
  {
      throw std::runtime_error("MyException type was not registered");
  }

  throw shard::runtime_exception(message, g_myExceptionType);
}`,language:"cpp",filename:"mylib.shard.cpp"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"5. Throw from a native callback."})}),`
`,e.jsx(i,{code:`static ObjectInstance* mylib_DoWork(const CallState& context)
{
  auto [value] = GetArgs<std::int64_t>(context);
  if (value < 0)
  {
      ThrowMyException(L"DoWork does not accept negative values");
  }

  return context.Collector.FromValue(value * 2);
}`,language:"cpp",filename:"mylib.shard.cpp"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"6. Catch the specific type in ShardScript."})}),`
`,e.jsx(i,{code:`using stdio;
using mylib;

namespace demo;

public static func Main() -> void
{
  try
  {
      MyWorker.DoWork(-5);
  }
  catch (ex: MyException)
  {
      println("caught MyException: " + ex.message);
      println("stack trace:");
      println(ex.stack_trace);
  }
  catch (ex: RuntimeException)
  {
      println("caught generic RuntimeException");
  }
}`,language:"csharp",filename:"demo.shard"}),`
`,e.jsx(a,{children:"Verification"}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[`Build the library and run the ShardScript program. You should see the typed catch clause execute and the
`,e.jsx(t,{children:"stack_trace"})," property should contain the managed call stack at the throw site."]})}),`
`,e.jsx(i,{code:`caught MyException: DoWork does not accept negative values
stack trace:
demo.Main
demo.Program.Main`,language:"plaintext",filename:"expected-output.txt"}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:["If you comment out the ",e.jsx(t,{children:"catch (ex: MyException)"})," clause, the fallback"," ",`
`,e.jsx(t,{children:"RuntimeException"}),` handler should run, proving that the custom type still satisfies
the `,e.jsx(t,{children:"IThrowable"})," contract."]})}),`
`,e.jsx(a,{children:"Troubleshooting"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Custom type is not caught."}),` Verify that the class
implements `,e.jsx(t,{children:"IThrowable"})," and that both property getters are marked with"," ",`
`,e.jsx(t,{children:".IsImplementationOf(TRAIT_THROWABLE_getMessage)"})," and"," ",`
`,e.jsx(t,{children:".IsImplementationOf(TRAIT_THROWABLE_getStackTrace)"})," respectively."]})}),e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Null backing field."})," Make sure"," ",`
`,e.jsx(t,{children:".AddBackingField()"}),` is called before the getter is registered. The field pointer
is needed by the VM when it writes the message and stack trace.`]})}),e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"VM error during mapping."}),` The exception class must have a
parameterless constructor. In native registration, add `,e.jsx(t,{children:".AddInit()"}),` to the class
builder.`]})}),e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Stack trace is empty."})," The VM populates"," ",`
`,e.jsx(t,{children:"stack_trace"})," only for ",e.jsx(t,{children:"IThrowable"}),` instances. Ensure the
type implements the interface and that the `,e.jsx(t,{children:"stack_trace"}),` property is backed by a
field.`]})})]}),`
`,e.jsx(a,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"library-building/runtime-exception-reference"})," — API reference for"," ",`
`,e.jsx(t,{children:"shard::runtime_exception"}),"."]})}),e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"syntax/exceptions"})," — Language reference for exception handling in ShardScript."]})}),e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"library-working-with-objects"}),` — How to read and write managed object fields from
native callbacks.`]})})]})]})}function h(c={}){const{wrapper:n}=c.components||{};return n?e.jsx(n,{...c,children:e.jsx(d,{...c})}):d(c)}function l(c,n){throw new Error("Expected component `"+c+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};
