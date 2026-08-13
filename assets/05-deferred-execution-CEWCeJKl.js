import{j as e}from"./index-B-x28vAk.js";function h(i){const r={p:"p",...i.components},{Bullet:o,Callout:c,CodeBlock:s,DocsTable:l,H2:a,InlineCode:n,Prose:t}=r;return o||d("Bullet"),c||d("Callout"),s||d("CodeBlock"),l||d("DocsTable"),a||d("H2"),n||d("InlineCode"),t||d("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(c,{tone:"blue",title:"Content moved",children:e.jsxs(t,{children:[e.jsxs(r.p,{children:["This article has been merged into"," "]}),e.jsx("a",{href:"/shardscript-info/docs/common-language-features/defer-and-idisposable",className:"underline",children:e.jsx(r.p,{children:"Defer and IDisposable"})}),e.jsx(r.p,{children:". Visit the merged page for the latest guidance on both defer and deterministic disposal."})]})}),`
`,e.jsx(a,{children:"Summary"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:["The ",e.jsx(n,{children:"defer"}),` statement schedules a deferred action that runs when control
leaves the enclosing scope. The compiler maintains a per-call-frame `,e.jsx("strong",{children:"defer stack"}),`;
defers are registered first-in, last-out and drain at scope exit, `,e.jsx(n,{children:"return"}),`,
`,e.jsx(n,{children:"break"}),", and during exception unwinding."]})}),`
`,e.jsx(a,{children:"Syntax"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:["A defer statement begins with the ",e.jsx(n,{children:"defer"}),` keyword followed by any statement.
The most common forms are an expression statement or a variable declaration of an`," ",`
`,e.jsx(n,{children:"IDisposable"})," resource."]})}),`
`,e.jsx(s,{code:`// Expression defer: evaluate the expression when the scope exits.
defer <expression>;

// Resource defer: declare a variable and call Dispose when the scope exits.
defer <identifier>: <type> = <expression>;`,language:"csharp",filename:"defer_syntax.shard"}),`
`,e.jsx(a,{children:"Parameters / Arguments"}),`
`,e.jsx(l,{headers:["Form","Argument","Description"],rows:[[e.jsx(n,{children:"defer expr;"}),"expr","Any expression statement evaluated at scope exit."],[e.jsx(n,{children:"defer v: T = expr;"}),"v: T = expr","A variable declaration where T implements IDisposable; Dispose() is called at scope exit."]]}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:["The deferred statement is captured at the point ",e.jsx(n,{children:"defer"}),` is written, not at
the point it runs. For resource defers, the initializer executes immediately so the object exists,
but its `,e.jsx(n,{children:"Dispose"})," method is delayed until scope exit."]})}),`
`,e.jsx(a,{children:"Returns"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:["A ",e.jsx(n,{children:"defer"}),` statement itself has no value and returns no result. If the
deferred expression is a function call, that function's return value is evaluated and discarded
unless it is assigned inside the deferred statement.`]})}),`
`,e.jsx(a,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(o,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Empty defer"})," — ",e.jsx(n,{children:"defer;"})," ",`
with no statement is a parse error: "defer statement cannot be empty".`]})}),e.jsx(o,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Defer outside a block"}),` — The emitter reports an
error if `,e.jsx(n,{children:"defer"}),` is not inside a statements block, because there is no
scope boundary to drain it.`]})}),e.jsx(o,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Non-disposable resource defer"}),` — A variable
declaration in `,e.jsx(n,{children:"defer"})," requires the type to implement"," ",`
`,e.jsx(n,{children:"IDisposable"}),"; otherwise semantic analysis fails."]})}),e.jsx(o,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Missing Dispose implementation"}),` — The type must
provide an implementation for `,e.jsx(n,{children:"IDisposable.Dispose()"}),"."]})}),e.jsx(o,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Exception inside a defer"}),` — If a deferred
expression throws, the exception propagates normally. Any defers that have not yet run are still
drained during unwinding.`]})})]}),`
`,e.jsx(a,{children:"Remarks"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Defer stack and LIFO order."})," Every call frame owns a defer stack. Each"," ",`
`,e.jsx(n,{children:"defer"})," statement emits a ",e.jsx(n,{children:"DEFER"}),` opcode that pushes
the bytecode offset of the deferred expression onto that stack. When the scope exits, the runtime
emits `,e.jsx(n,{children:"DEFER_DRAIN"}),` with the number of defers to run; the VM pops them from
the back and executes them last-in, first-out.`]})}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Scope boundaries."}),` A scope is a block delimited by braces. The compiler drains the
defers registered in that block when execution reaches the closing brace. Nested blocks drain
their own defers first; outer blocks drain afterward.`]})}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Interaction with return."}),` The return expression is evaluated before defers run,
then `,e.jsx(n,{children:"DEFER_DRAIN"}),` clears every defer in the method, and finally the frame
returns. This guarantees cleanup runs before the caller receives the result.`]})}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Interaction with break."})," ",e.jsx(n,{children:"break"}),` drains defers from the
innermost scope up to and including the enclosing loop scope, then jumps to the loop end. Defers
declared outside the loop remain scheduled.`]})}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Interaction with exceptions."}),` When an exception is thrown, the VM does not emit a
compile-time `,e.jsx(n,{children:"DEFER_DRAIN"}),`. Instead, exception dispatch records the defer
stack size at each `,e.jsx(n,{children:"try"}),` boundary and drains only the defers registered
since that boundary before entering the matching `,e.jsx(n,{children:"catch"}),`. If no handler is
found in the frame, all remaining defers run before the exception propagates to the caller.`]})}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Async methods."})," Async state-machine lowering re-registers active defers at every"," ",`
`,e.jsx(n,{children:"await"}),` resume point so that cleanup still executes correctly across
suspension boundaries. Resource defers emit the variable declaration into the`," ",`
`,e.jsx(n,{children:"MoveNext"})," method and schedule ",e.jsx(n,{children:"Dispose"}),` exactly as
in synchronous code.`]})}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"VM opcodes."})," Three opcodes implement deferred execution:"]})}),`
`,e.jsx(l,{headers:["Opcode","Description"],rows:[[e.jsx(n,{children:"DEFER"}),"Pushes the bytecode offset of a deferred expression onto the frame defer stack."],[e.jsx(n,{children:"DEFER_BREAK"}),"Returns from a deferred expression back to the DEFER_DRAIN loop."],[e.jsx(n,{children:"DEFER_DRAIN"}),"Pops the top N deferred offsets and executes them LIFO."]]}),`
`,e.jsx(c,{tone:"amber",title:"Deferred expressions and control flow",children:e.jsxs(r.p,{children:["You cannot ",e.jsx(n,{children:"return"})," or ",e.jsx(n,{children:"break"}),` out of a deferred
expression in a meaningful way; the deferred code is emitted as a standalone fragment that ends
with `,e.jsx(n,{children:"DEFER_BREAK"}),`. Keep deferred statements simple and free of explicit
exit statements.`]})}),`
`,e.jsx(a,{children:"Examples"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Basic expression defer."})}),`
`,e.jsx(s,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  println("starting work");

  defer println("cleanup after work");

  println("doing work");
}`,language:"csharp",filename:"defer_basic.shard"}),`
`,e.jsx(t,{children:e.jsx(r.p,{children:"Expected output:"})}),`
`,e.jsx(s,{code:`starting work
doing work
cleanup after work`,language:"plaintext",filename:"output.txt"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Resource defer with IDisposable."})}),`
`,e.jsx(s,{code:`using stdio;

namespace demo;

public class Resource : IDisposable
{
  public func Dispose() -> void
  {
      println("Resource disposed");
  }
}

public static func Main() -> void
{
  defer resource: Resource = new Resource();

  println("using resource");
}`,language:"csharp",filename:"defer_resource.shard"}),`
`,e.jsx(t,{children:e.jsx(r.p,{children:"Expected output:"})}),`
`,e.jsx(s,{code:`using resource
Resource disposed`,language:"plaintext",filename:"output.txt"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Nested scopes and LIFO order."})}),`
`,e.jsx(s,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  defer println("outer defer");

  println("enter outer");

  {
      defer println("inner-2");
      defer println("inner-1");

      println("inside inner");
  }

  println("back in outer");
}`,language:"csharp",filename:"defer_nested.shard"}),`
`,e.jsx(t,{children:e.jsx(r.p,{children:"Expected output:"})}),`
`,e.jsx(s,{code:`enter outer
inside inner
inner-1
inner-2
back in outer
outer defer`,language:"plaintext",filename:"output.txt"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Defer inside a loop."})}),`
`,e.jsx(s,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  for (i in 0..3)
  {
      defer println("cleanup iteration " + i);
      println("start iteration " + i);
  }
}`,language:"csharp",filename:"defer_loop.shard"}),`
`,e.jsx(t,{children:e.jsx(r.p,{children:"Expected output:"})}),`
`,e.jsx(s,{code:`start iteration 0
cleanup iteration 0
start iteration 1
cleanup iteration 1
start iteration 2
cleanup iteration 2`,language:"plaintext",filename:"output.txt"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Defer with early return."})}),`
`,e.jsx(s,{code:`using stdio;

namespace demo;

public static func MaybeReturn(takeEarlyPath: bool) -> void
{
  defer println("always cleanup");

  println("before check");

  if (takeEarlyPath)
  {
      println("early return");
      return;
  }

  println("normal path");
}

public static func Main() -> void
{
  MaybeReturn(true);
  println("---");
  MaybeReturn(false);
}`,language:"csharp",filename:"defer_return.shard"}),`
`,e.jsx(t,{children:e.jsx(r.p,{children:"Expected output:"})}),`
`,e.jsx(s,{code:`before check
early return
always cleanup
---
before check
normal path
always cleanup`,language:"plaintext",filename:"output.txt"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Defer during exception unwinding."})}),`
`,e.jsx(s,{code:`using stdio;

namespace demo;

public static func Inner() -> void
{
  defer println("inner cleanup");
  println("inner throwing");
  throw new RuntimeException();
}

public static func Outer() -> void
{
  defer println("outer cleanup");
  Inner();
}

public static func Main() -> void
{
  try
  {
      Outer();
  }
  catch (ex: RuntimeException)
  {
      println("caught");
  }
}`,language:"csharp",filename:"defer_exception.shard"}),`
`,e.jsx(t,{children:e.jsx(r.p,{children:"Expected output:"})}),`
`,e.jsx(s,{code:`inner throwing
inner cleanup
outer cleanup
caught`,language:"plaintext",filename:"output.txt"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Defer with break."})}),`
`,e.jsx(s,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  for (i in 0..10)
  {
      defer println("defer for " + i);
      println("iteration " + i);

      if (i == 2)
      {
          println("breaking");
          break;
      }
  }

  println("after loop");
}`,language:"csharp",filename:"defer_break.shard"}),`
`,e.jsx(t,{children:e.jsx(r.p,{children:"Expected output:"})}),`
`,e.jsx(s,{code:`iteration 0
defer for 0
iteration 1
defer for 1
iteration 2
breaking
defer for 2
after loop`,language:"plaintext",filename:"output.txt"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Common mistake: depending on mutated state inside a defer."})}),`
`,e.jsx(s,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  i: int = 0;

  defer println("deferred i = " + i);

  i = 42;
  println("before exit, i = " + i);
}`,language:"csharp",filename:"defer_state.shard"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:["Expected output. The deferred expression reads ",e.jsx(n,{children:"i"}),` when it executes, after
the assignment:`]})}),`
`,e.jsx(s,{code:`before exit, i = 42
deferred i = 42`,language:"plaintext",filename:"output.txt"}),`
`,e.jsx(c,{tone:"blue",children:e.jsxs(r.p,{children:[`This behavior is useful for cleanup that needs final values, but it can be surprising if you
expected the value at the point `,e.jsx(n,{children:"defer"}),` was written. Capture values into
local variables before deferring if you need snapshot semantics.`]})})]})}function x(i={}){const{wrapper:r}=i.components||{};return r?e.jsx(r,{...i,children:e.jsx(h,{...i})}):h(i)}function d(i,r){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
