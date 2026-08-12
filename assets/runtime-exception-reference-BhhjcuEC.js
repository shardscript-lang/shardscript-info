import{j as e}from"./index-Dw_NxEHJ.js";function h(i){const t={p:"p",...i.components},{Bullet:r,CodeBlock:a,DocsTable:l,H2:c,InlineCode:n,Prose:s}=t;return r||o("Bullet"),a||o("CodeBlock"),l||o("DocsTable"),c||o("H2"),n||o("InlineCode"),s||o("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(c,{children:"Summary"}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"shard::runtime_exception"}),` is the native C++ exception type that the ShardScript
virtual machine maps to a managed `,e.jsx(n,{children:"IThrowable"}),` instance. Native libraries throw it
to surface typed, catchable errors without manually allocating managed objects.`]})}),`
`,e.jsx(c,{children:"Syntax"}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:["Include ",e.jsx(n,{children:"<shard/runtime/RuntimeException.hpp>"}),` and construct the exception in a
native callback.`]})}),`
`,e.jsx(a,{code:`#include <shard/runtime/RuntimeException.hpp>

// Throw a generic RuntimeException.
throw shard::runtime_exception(L"Something went wrong");

// Throw a library-specific exception type.
throw shard::runtime_exception(L"Connection refused", g_NetworkExceptionType);`,language:"cpp",filename:"runtime_exception_usage.cpp"}),`
`,e.jsx(s,{children:e.jsx(t.p,{children:"Class declaration:"})}),`
`,e.jsx(a,{code:`namespace shard
{
  class runtime_exception : public std::exception
  {
  public:
      runtime_exception(
          std::wstring message,
          TypeSymbol* exceptionType = nullptr) noexcept;

      runtime_exception(
          const wchar_t* message,
          TypeSymbol* exceptionType = nullptr) noexcept;

      const std::wstring& message() const noexcept;
      const std::wstring& stack_trace() const noexcept;
      void set_stack_trace(const std::wstring& trace) noexcept;
      TypeSymbol* exception_type() const noexcept;
      const char* what() const noexcept override;
  };
}`,language:"cpp",filename:"RuntimeException.hpp"}),`
`,e.jsx(c,{children:"Parameters / Arguments"}),`
`,e.jsx(l,{headers:["Parameter","Type","Description"],rows:[[e.jsx(n,{children:"message"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"std::wstring"})," or ",e.jsx(n,{children:"const wchar_t*"})]}),e.jsxs(e.Fragment,{children:["Wide-string message exposed through the managed ",e.jsx(n,{children:"IThrowable.message"})," property."]})],[e.jsx(n,{children:"exceptionType"}),e.jsx(n,{children:"TypeSymbol*"}),e.jsxs(e.Fragment,{children:["Optional managed exception class that implements ",e.jsx(n,{children:"IThrowable"}),". When ",e.jsx(n,{children:"nullptr"}),", the VM uses the built-in ",e.jsx(n,{children:"RuntimeException"})," type."]})]]}),`
`,e.jsx(c,{children:"Returns"}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[`The exception object itself carries no managed return value. When the VM catches the C++ exception, it
returns a managed `,e.jsx(n,{children:"ObjectInstance*"})," representing the constructed exception."]})}),`
`,e.jsx(c,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Type is not a class."})," If ",e.jsx(n,{children:"exceptionType"})," ",`
is not a `,e.jsx(n,{children:"ClassSymbol"}),", the VM throws a C++ error while mapping the exception."]})}),e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Missing parameterless constructor."}),` The managed exception
type must declare a parameterless constructor (via `,e.jsx(n,{children:".AddInit()"}),` in native
registration). Without one, mapping fails.`]})}),e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Missing IThrowable implementation."}),` The type must implement
`,e.jsx(n,{children:"IThrowable"})," and expose backed ",e.jsx(n,{children:"message"})," and"," ",`
`,e.jsx(n,{children:"stack_trace"})," properties."]})})]}),`
`,e.jsx(c,{children:"Remarks"}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"VM mapping flow."})," When a C++ exception escapes a native callback, the VM calls"," ",`
`,e.jsx(n,{children:"VirtualMachine::CreateRuntimeException(const std::exception&)"}),`. That function
`,e.jsx(n,{children:"dynamic_cast"}),"s to ",e.jsx(n,{children:"shard::runtime_exception"}),`. If the cast
succeeds, the VM extracts the stored `,e.jsx(n,{children:"TypeSymbol*"}),`, message, and stack trace and
routes to the typed factory `,e.jsx(n,{children:"CreateRuntimeException(TypeSymbol*, message, stackTrace)"}),"."]})}),`
`,e.jsx(s,{children:e.jsx(t.p,{children:"The typed factory performs the following steps:"})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsxs(t.p,{children:["Resolves the ",e.jsx(n,{children:"TypeSymbol*"})," to a ",e.jsx(n,{children:"ClassSymbol*"}),"."]})}),e.jsx(r,{children:e.jsx(t.p,{children:"Finds a parameterless constructor and allocates a managed instance through the garbage collector."})}),e.jsx(r,{children:e.jsx(t.p,{children:"Zero-initializes all field slots and runs the constructor."})}),e.jsx(r,{children:e.jsxs(t.p,{children:["Resolves the backing fields for ",e.jsx(n,{children:"IThrowable.getMessage()"})," and"," ",`
`,e.jsx(n,{children:"IThrowable.getStackTrace()"})," by walking the class"," ",`
`,e.jsx(n,{children:"InterfaceMethodMap"}),"."]})}),e.jsx(r,{children:e.jsx(t.p,{children:"Writes the message and stack trace into the backing fields."})})]}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Fallback behavior."})," If ",e.jsx(n,{children:"exceptionType"})," is ",e.jsx(n,{children:"nullptr"}),`,
or if the type cannot be resolved, the VM instantiates the built-in`," ",`
`,e.jsx(n,{children:"RuntimeException"})," class. This keeps existing code that throws plain"," ",`
`,e.jsx(n,{children:"std::runtime_error"})," working unchanged."]})}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Stack trace capture."}),` The VM sets the native stack trace on the exception object before
creating the managed instance. The captured trace contains the managed-method full names currently on the
VM call stack. If the native library sets a stack trace manually before throwing, that value is preserved.`]})}),`
`,e.jsx(c,{children:"Examples"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Throw a generic RuntimeException from native code."})}),`
`,e.jsx(a,{code:`#include <ShardScript.hpp>

static ObjectInstance* divide(const CallState& context)
{
  auto [left, right] = GetArgs<std::int64_t, std::int64_t>(context);
  if (right == 0)
  {
      throw shard::runtime_exception(L"Division by zero");
  }

  return context.Collector.FromValue(left / right);
}`,language:"cpp",filename:"generic_throw.cpp"}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:["The ShardScript caller catches it as the built-in ",e.jsx(n,{children:"RuntimeException"}),"."]})}),`
`,e.jsx(a,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  try
  {
      math.Divide(10, 0);
  }
  catch (ex: RuntimeException)
  {
      println(ex.message);
  }
}`,language:"csharp",filename:"generic_throw.shard"}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Throw a custom exception type."}),` For the full registration of the exception class, see the
how-to article linked below.`]})}),`
`,e.jsx(a,{code:`static ObjectInstance* connect(const CallState& context)
{
  std::wstring host = std::wstring(context.Args[0]->AsString());
  if (host.empty())
  {
      throw shard::runtime_exception(
          L"Host name cannot be empty",
          g_NetworkExceptionType);
  }

  return context.Collector.FromValue(true);
}`,language:"cpp",filename:"typed_throw.cpp"}),`
`,e.jsx(c,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"library-building/throwing-typed-exceptions"}),` — How-To guide for registering and
throwing library-specific exception types.`]})}),e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"syntax/exceptions"})," — Language reference for"," ",`
`,e.jsx(n,{children:"try"}),"/",e.jsx(n,{children:"catch"}),"/",e.jsx(n,{children:"throw"})," and the"," ",`
`,e.jsx(n,{children:"IThrowable"})," contract."]})})]}),`
`,e.jsx(c,{children:"Source"}),`
`,e.jsx(s,{children:e.jsx(n,{children:"ShardScript/include/shard/runtime/RuntimeException.hpp"})})]})}function x(i={}){const{wrapper:t}=i.components||{};return t?e.jsx(t,{...i,children:e.jsx(h,{...i})}):h(i)}function o(i,t){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
