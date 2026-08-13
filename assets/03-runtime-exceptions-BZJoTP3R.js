import{j as e}from"./index-DkFwvLJL.js";function h(a){const t={p:"p",...a.components},{Bullet:i,Callout:o,CodeBlock:l,DocsTable:d,H2:s,InlineCode:n,Prose:r}=t;return i||c("Bullet"),o||c("Callout"),l||c("CodeBlock"),d||c("DocsTable"),s||c("H2"),n||c("InlineCode"),r||c("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(s,{children:"Summary"}),`
`,e.jsx(r,{children:e.jsx(t.p,{children:`The ShardScript virtual machine raises runtime exceptions when a guarded operation cannot complete
safely. This page catalogs the most common runtime error messages produced by the language itself,
grouped by the operation that triggers them. Library-specific errors are documented on their
respective standard-library pages.`})}),`
`,e.jsx(s,{children:"Syntax"}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:["Runtime exceptions are ordinary ShardScript objects that implement"," ",`
`,e.jsx(n,{children:"IThrowable"}),". They can be caught with ",e.jsx(n,{children:"try"})," /"," ",`
`,e.jsx(n,{children:"catch"})," and inspected through the ",e.jsx(n,{children:"message"})," and"," ",`
`,e.jsx(n,{children:"stack_trace"})," properties."]})}),`
`,e.jsx(l,{code:`try
{
  // operation that may fail
}
catch (ex: RuntimeException)
{
  println(ex.message);
  println(ex.stack_trace);
}`,language:"csharp",filename:"catch_runtime_exception.shard"}),`
`,e.jsx(s,{children:"Parameters / Arguments"}),`
`,e.jsx(r,{children:e.jsx(t.p,{children:`Each entry in the catalog below lists the failing operation, the typical exception message, and the
type of the thrown object when a specific type is known.`})}),`
`,e.jsx(d,{headers:["Operation","Typical message","Thrown type"],rows:[["Integer division by zero","DivideByZeroException",e.jsx(n,{children:"RuntimeException"})],["Integer modulo by zero","DivideByZeroException",e.jsx(n,{children:"RuntimeException"})],["Array index out of bounds","Array index is out of range: index=... length=...",e.jsx(n,{children:"RuntimeException"})],["Indexer on null array","Cannot access indexer on null instance of type ...",e.jsx(n,{children:"RuntimeException"})],["Member access on null reference","Cannot access member on null instance of type ...",e.jsx(n,{children:"RuntimeException"})],["Method call on null reference","Cannot access member on null instance of type ...",e.jsx(n,{children:"RuntimeException"})],["Null delegate invocation","Delegate is null",e.jsx(n,{children:"RuntimeException"})],["Reflection on missing type","Type not found",e.jsx(n,{children:"RuntimeException"})],["Reflection on null instance","cannot get type of null instance",e.jsx(n,{children:"RuntimeException"})]]}),`
`,e.jsx(s,{children:"Returns"}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:[`A runtime exception does not return a value to its call site. Instead, the VM unwinds the managed
stack until it finds a matching `,e.jsx(n,{children:"catch"}),` clause or reaches the entry point.
If no handler exists, the VM prints the stack trace and terminates.`]})}),`
`,e.jsx(s,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"DivideByZeroException."}),` Integer, character, byte,
native-pointer, and enum division or modulo with a zero divisor throws`," ",`
`,e.jsx(n,{children:"DivideByZeroException"}),`. Floating-point division by zero does not throw; it
follows IEEE-754 rules and may produce infinity.`]})}),e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Array index out of range."}),` Reading or writing an
array element with an index outside `,e.jsx(n,{children:"0 .. Length - 1"}),` throws a message
such as `,e.jsx(n,{children:"Array index is out of range: index=... length=..."}),`. Negative
indices are treated as very large positive values because the index is cast to`," ",`
`,e.jsx(n,{children:"std::size_t"})," before the bounds check."]})}),e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Null indexer access."}),` Using the square-bracket
indexer on a `,e.jsx(n,{children:"null"})," array reference throws"," ",`
`,e.jsx(n,{children:"Cannot access indexer on null instance of type ..."}),"."]})}),e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Null member access."}),` Reading a field or property on
a `,e.jsx(n,{children:"null"})," reference throws"," ",`
`,e.jsx(n,{children:"Cannot access member on null instance of type ..."}),"."]})}),e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Null method call."})," Calling an instance method on a"," ",`
`,e.jsx(n,{children:"null"})," reference throws"," ",`
`,e.jsx(n,{children:"Cannot access member on null instance of type ..."}),"."]})}),e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Null delegate invocation."}),` Calling a delegate
variable that holds `,e.jsx(n,{children:"null"})," throws ",e.jsx(n,{children:"Delegate is null"}),"."]})}),e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Reflection failures."}),` Looking up a type by name that
is not loaded throws `,e.jsx(n,{children:"Type not found"}),". Inspecting the type of a"," ",`
`,e.jsx(n,{children:"null"})," instance throws"," ",`
`,e.jsx(n,{children:"cannot get type of null instance"}),"."]})}),e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Native extern returning null for a value type."}),` An
extern method declared to return a value type that returns `,e.jsx(n,{children:"nullptr"}),` from
native code throws `,e.jsx(n,{children:"extern method '...' returned nullptr for value type"}),`.
Reference-type extern methods that return `,e.jsx(n,{children:"nullptr"}),` are mapped to the
managed `,e.jsx(n,{children:"null"})," instance instead."]})})]}),`
`,e.jsx(s,{children:"Remarks"}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Stack unwinding."}),` When a runtime exception is thrown, the VM walks the call stack
from the throw site toward the entry point. Before entering each candidate`," ",`
`,e.jsx(n,{children:"catch"}),", it runs every ",e.jsx(n,{children:"defer"}),` registered in the
scopes being unwound, in last-in, first-out order.`]})}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Typed exceptions from native libraries."})," Native libraries can register their own"," ",`
`,e.jsx(n,{children:"IThrowable"})," classes and throw them through"," ",`
`,e.jsx(n,{children:"shard::runtime_exception"}),`. The VM catches the C++ exception and instantiates
the requested managed type instead of the built-in `,e.jsx(n,{children:"RuntimeException"}),"."]})}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Message stability."}),` The messages in this catalog are representative of the current
implementation. Minor wording changes may occur between releases, so production code should catch
by exception type or by `,e.jsx(n,{children:"RuntimeException"}),` rather than by exact message
string.`]})}),`
`,e.jsx(o,{tone:"amber",children:e.jsx(t.p,{children:`Not every runtime failure produces a catchable exception today. Some low-level VM faults still
terminate the process directly. Treat any error listed here as catchable, and treat unlisted
failures as requiring defensive coding.`})}),`
`,e.jsx(s,{children:"Examples"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Catching division by zero."})}),`
`,e.jsx(l,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  try
  {
      x: int = 1 / 0;
      println(x);
  }
  catch (ex: RuntimeException)
  {
      println("caught: " + ex.message);
  }
}`,language:"csharp",filename:"divide_by_zero.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Array bounds checking."})}),`
`,e.jsx(l,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  values: int[] = [10, 20, 30];

  try
  {
      println(values[3]);      // out of range
  }
  catch (ex: RuntimeException)
  {
      println("caught: " + ex.message);
  }

  try
  {
      empty: int[] = null;
      println(empty[0]);       // null indexer
  }
  catch (ex: RuntimeException)
  {
      println("caught: " + ex.message);
  }
}`,language:"csharp",filename:"array_bounds.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Null instance member and method access."})}),`
`,e.jsx(l,{code:`using stdio;

namespace demo;

public class Box
{
  public Value: int;

  public func GetValue() -> int
  {
      return this.Value;
  }
}

public static func Main() -> void
{
  box: Box = null;

  try
  {
      println(box.Value);
  }
  catch (ex: RuntimeException)
  {
      println("caught member access");
  }

  try
  {
      println(box.GetValue());
  }
  catch (ex: RuntimeException)
  {
      println("caught method call");
  }
}`,language:"csharp",filename:"null_access.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Null delegate invocation."})}),`
`,e.jsx(l,{code:`using stdio;

namespace demo;

public delegate Action() -> void;

public static func Main() -> void
{
  action: Action = null;

  try
  {
      action();
  }
  catch (ex: RuntimeException)
  {
      println("caught: " + ex.message);
  }
}`,language:"csharp",filename:"null_delegate.shard"}),`
`,e.jsx(s,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"exceptions"})," — language reference for try/catch/throw and IThrowable."]})}),e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"operators"})," — operator errors that can become runtime exceptions."]})}),e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"arrays"})," — bounds and null-access rules for arrays."]})}),e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"runtime-exception-reference"}),` — throwing typed exceptions from native
libraries.`]})})]}),`
`,e.jsx(s,{children:"Source"}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:["Runtime exception raising and stack unwinding are implemented in"," ",`
`,e.jsx(n,{children:"ShardScript/src/runtime/VirtualMachine.cpp"}),`. Native-to-managed exception
mapping lives in `,e.jsx(n,{children:"ShardScript/include/shard/runtime/RuntimeException.hpp"}),"."]})})]})}function p(a={}){const{wrapper:t}=a.components||{};return t?e.jsx(t,{...a,children:e.jsx(h,{...a})}):h(a)}function c(a,t){throw new Error("Expected component `"+a+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
