import{j as e}from"./index-BugjY_CW.js";function h(i){const t={p:"p",...i.components},{Bullet:s,Callout:c,CodeBlock:r,DocsTable:o,H2:l,InlineCode:n,Prose:a}=t;return s||d("Bullet"),c||d("Callout"),r||d("CodeBlock"),o||d("DocsTable"),l||d("H2"),n||d("InlineCode"),a||d("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(l,{children:"Summary"}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:["A ",e.jsx(n,{children:"lambda"}),` expression creates an anonymous function value
that can be stored in a variable, passed as an argument, or returned from another
function. The resulting value is a `,e.jsx(n,{children:"delegate"}),` whose parameter
and return types are either declared explicitly or inferred from the lambda body.`]})}),`
`,e.jsx(l,{children:"Syntax"}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:["Every lambda starts with the ",e.jsx(n,{children:"lambda"}),` keyword, followed by a
parenthesized parameter list and an arrow that chooses how the return type is determined.
The body is always a braced statement block.`]})}),`
`,e.jsx(o,{headers:["Form","Meaning"],rows:[[e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"lambda"})," ",e.jsx(n,{children:"(params)"})," ",e.jsx(n,{children:"->"})," ",e.jsx(n,{children:"ReturnType"})," ",e.jsx(n,{children:"{"})," body ",e.jsx(n,{children:"}"})]}),"Explicit return type."],[e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"lambda"})," ",e.jsx(n,{children:"(params)"})," ",e.jsx(n,{children:"=>"})," ",e.jsx(n,{children:"{"})," body ",e.jsx(n,{children:"}"})]}),"Inferred return type from the body's return statements."],[e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"async"})," ",e.jsx(n,{children:"lambda"})," ",e.jsx(n,{children:"(params)"})," ",e.jsx(n,{children:"->"})," ",e.jsx(n,{children:"Task"})," ",e.jsx(n,{children:"{"})," body ",e.jsx(n,{children:"}"})]}),"Asynchronous closure; explicit return type is required."]]}),`
`,e.jsx(a,{children:e.jsx(t.p,{children:`A parameter list is a comma-separated sequence of typed parameters in the same form
used by named methods. A lambda that takes no arguments uses empty parentheses.`})}),`
`,e.jsx(r,{code:`// One parameter with an explicit return type.
lambda (n: int) -> bool
{
  return n > 0;
}

// Two parameters.
lambda (a: int, b: int) -> int
{
  return a + b;
}

// No parameters.
lambda () -> string
{
  return "hello";
}`,language:"csharp",filename:"lambda_signature.shard"}),`
`,e.jsx(l,{children:"Parameters / Arguments"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Parameter list"}),` — Parenthesized and
comma-separated. Every parameter must be written as `,e.jsx(n,{children:"name: Type"}),"."]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"No parameters"}),` — Use empty parentheses
`,e.jsx(n,{children:"()"}),"."]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Return type"})," — With ",e.jsx(n,{children:"-> Type"})," ",`
the delegate uses that type. With `,e.jsx(n,{children:"=>"}),` the compiler infers the
return type from the first reachable `,e.jsx(n,{children:"return"})," statement."]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Body"}),` — Always a braced statement block.
Use `,e.jsx(n,{children:"return"})," to produce a value; a void delegate may omit it."]})})]}),`
`,e.jsx(l,{children:"Returns"}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:["A lambda expression evaluates to a ",e.jsx(n,{children:"delegate"}),` value. Its type is
determined by context:`]})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Named delegate"}),` — when assigned to a
user-declared delegate such as `,e.jsx(n,{children:"IntFunc"}),"."]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Fabricated delegate"}),` — when assigned to
an inline signature such as `,e.jsx(n,{children:"delegate int(int)"}),"."]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Anonymous delegate"}),` — when no target type
is available, the compiler constructs a delegate from the lambda's parameter and return
types.`]})})]}),`
`,e.jsx(l,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Missing lambda keyword"})," — A bare"," ",`
`,e.jsx(n,{children:"(x) => ..."})," expression does not parse. The word"," ",`
`,e.jsx(n,{children:"lambda"})," is required."]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Missing parameter type"}),` — Lambda parameters
must be explicitly typed with `,e.jsx(n,{children:"name: Type"}),"."]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Missing arrow or body"}),` — The parser expects
either `,e.jsx(n,{children:"-> Type"})," or ",e.jsx(n,{children:"=>"}),`, followed by
a braced body.`]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Async lambda without explicit return type"})," ",`
— `,e.jsx(n,{children:"async lambda"})," must declare ",e.jsx(n,{children:"Task"})," or"," ",`
`,e.jsx(n,{children:"ValueTask<T>"}),"; the ",e.jsx(n,{children:"=>"}),` form is not
allowed.`]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Return type mismatch"}),` — The type returned
by a `,e.jsx(n,{children:"return"}),` statement must match the explicit or inferred
delegate return type.`]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Delegate signature mismatch"}),` — A lambda
assigned to a delegate must have the same parameter count, parameter types, and return
type.`]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Null delegate invocation"}),` — Calling a
delegate variable that holds `,e.jsx(n,{children:"null"})," throws at runtime."]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Captured locals are not lifted"}),` — Referencing
a local variable from an enclosing scope parses and binds, but the current VM does not
capture it into the delegate object. The resulting behavior is undefined at runtime.`]})})]}),`
`,e.jsx(l,{children:"Remarks"}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Single-expression versus block bodies."}),` ShardScript lambdas currently
require a braced statement block. There is no shorthand such as`," ",`
`,e.jsx(n,{children:"lambda (x: int) -> int x + 1"}),`; even a one-line body must be
wrapped in `,e.jsx(n,{children:"{"})," ",e.jsx(n,{children:"}"}),"."]})}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Return-type inference."})," When ",e.jsx(n,{children:"=>"}),` is used, the
compiler inspects the body's `,e.jsx(n,{children:"return"}),` statements to determine the
delegate return type. If the body has no return statement, the return type is`," ",`
`,e.jsx(n,{children:"void"}),". All return statements in the same lambda must agree on type."]})}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Conversion to delegate types."}),` A lambda is compatible with any delegate
whose signature matches exactly. This works for named delegates declared with`," ",`
`,e.jsx(n,{children:"public delegate"}),", fabricated inline types such as"," ",`
`,e.jsx(n,{children:"delegate int(int)"}),", and constructed generic delegates such as"," ",`
`,e.jsx(n,{children:"Transform<int, int>"}),`. A named method with a matching signature
can also be assigned directly to a delegate variable without wrapping it in a lambda.`]})}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Capture rules and closures."}),` The compiler resolves identifiers in the
lambda body against the enclosing scope chain, so outer local variables are visible during
semantic analysis. However, the current runtime does not implement closures: captured
locals are not lifted into the delegate object or passed to the anonymous method. A lambda
that references an enclosing local may compile but will read from the wrong stack slot at
runtime. Until closures are implemented, pass state explicitly through parameters or rely
on static fields and constants.`]})}),`
`,e.jsx(c,{tone:"amber",title:"Closures are not fully implemented",children:e.jsx(t.p,{children:`Do not rely on a lambda capturing local variables from its enclosing method. The syntax
is accepted, but the VM has no closure object and the captured value is not available when
the delegate runs. Pass needed values as arguments, or capture static/global state instead.`})}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Asynchronous lambdas."})," Prefix the lambda with ",e.jsx(n,{children:"async"})," ",`
to use `,e.jsx(n,{children:"await"}),` inside the body. The return type must be declared
explicitly as `,e.jsx(n,{children:"Task"})," or ",e.jsx(n,{children:"ValueTask<T>"}),`.
Async lambdas are lowered into the same state-machine machinery as async named methods.`]})}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"VM representation."}),` A lambda compiles to a static anonymous method whose
handle type is `,e.jsx(n,{children:"Lambda"}),". At the call site the emitter produces a"," ",`
`,e.jsx(n,{children:"NEWDELEGATE"}),` instruction that creates a delegate instance pointing
to that method. Invoking the delegate emits `,e.jsx(n,{children:"CALLDELEGATE"}),`, which
dispatches to the stored target method.`]})}),`
`,e.jsx(l,{children:"Examples"}),`
`,e.jsx(a,{children:e.jsx("strong",{children:"Named and fabricated delegate types."})}),`
`,e.jsx(r,{code:`using stdio;

namespace demo;

// A reusable named delegate type.
public delegate IntFunc(a: int) -> int;

public static func Main() -> void
{
  // Bound to a named delegate.
  fromNamed: IntFunc = lambda (a: int) -> int
  {
      return a + 10;
  };

  // Bound to a fabricated inline delegate type.
  fromInline: delegate int(int) = lambda (a: int) -> int
  {
      return a + 10;
  };

  println(fromNamed(1));   // 11
  println(fromInline(2));  // 12
}`,language:"csharp",filename:"lambda_delegate_types.shard"}),`
`,e.jsx(a,{children:e.jsx("strong",{children:"Inferred return type with the => arrow."})}),`
`,e.jsx(r,{code:`using stdio;

namespace demo;

public delegate IntFunc(a: int) -> int;

public static func Main() -> void
{
  // The compiler infers 'int' from the return statement.
  adder: IntFunc = lambda (a: int) =>
  {
      return a + 100;
  };

  println(adder(5));   // 105
}`,language:"csharp",filename:"lambda_inferred.shard"}),`
`,e.jsx(a,{children:e.jsx("strong",{children:"Parameterless lambda."})}),`
`,e.jsx(r,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  answer: delegate int() = lambda () -> int
  {
      return 42;
  };

  println(answer());   // 42
}`,language:"csharp",filename:"lambda_parameterless.shard"}),`
`,e.jsx(a,{children:e.jsx("strong",{children:"Passing and returning lambdas."})}),`
`,e.jsx(r,{code:`using stdio;

namespace demo;

public delegate IntFunc(a: int) -> int;

static func Apply(f: IntFunc, x: int) -> int
{
  return f(x);
}

static func Choose(op: int) -> IntFunc
{
  if (op == 0)
  {
      return lambda (a: int) -> int
      {
          return a + 1;
      };
  }

  return lambda (a: int) -> int
  {
      return a - 1;
  };
}

public static func Main() -> void
{
  // Pass a lambda directly as an argument.
  square: IntFunc = lambda (a: int) -> int
  {
      return a * a;
  };
  println(Apply(square, 5));   // 25

  // Receive a function and call it.
  step: IntFunc = Choose(0);
  println(step(10));           // 11
}`,language:"csharp",filename:"lambda_higher_order.shard"}),`
`,e.jsx(a,{children:e.jsx("strong",{children:"Method-to-delegate conversion."})}),`
`,e.jsx(r,{code:`using stdio;

namespace demo;

public delegate IntFunc(a: int) -> int;

static func Triple(x: int) -> int
{
  return x * 3;
}

public static func Main() -> void
{
  // A named method with a matching signature converts directly.
  f: IntFunc = Triple;

  println(f(7));   // 21
}`,language:"csharp",filename:"lambda_method_group.shard"}),`
`,e.jsx(a,{children:e.jsx("strong",{children:"Lambda as a callback."})}),`
`,e.jsx(r,{code:`using stdio;

namespace demo;

public delegate Predicate(x: int) -> bool;

static func CountWhere(items: int[], matches: Predicate) -> int
{
  count: int = 0;
  for (i: int = 0; i < items.Length; i = i + 1)
  {
      if (matches(items[i]))
      {
          count = count + 1;
      }
  }
  return count;
}

public static func Main() -> void
{
  nums: int[] = [1, 6, 3, 9, 4];

  // The predicate is supplied inline; no capture is required here.
  big: int = CountWhere(nums, lambda (n: int) -> bool
  {
      return n > 5;
  });

  println(big);   // 2
}`,language:"csharp",filename:"lambda_callback.shard"}),`
`,e.jsx(a,{children:e.jsx("strong",{children:"Async lambda."})}),`
`,e.jsx(r,{code:`using stdio;
using async;

namespace demo;

public static func Main() -> void
{
  // Async lambdas must declare an explicit Task/ValueTask<T> return type.
  work: delegate Task() = async lambda () -> Task
  {
      println("before");
      await Task.Delay(100);
      println("after");
  };

  Task.Wait(work());
  println("done");
}`,language:"csharp",filename:"lambda_async.shard"}),`
`,e.jsx(a,{children:e.jsx("strong",{children:"Common mistake: capturing a local variable."})}),`
`,e.jsx(r,{code:`using stdio;

namespace demo;

public delegate IntFunc(a: int) -> int;

public static func Main() -> void
{
  factor: int = 10;

  // WARNING: this references an outer local variable. It compiles, but the VM
  // does not currently capture 'factor' into the delegate, so the result is
  // undefined at runtime.
  scale: IntFunc = lambda (a: int) -> int
  {
      return a * factor;
  };

  println(scale(5));
}`,language:"csharp",filename:"lambda_capture_unsupported.shard"}),`
`,e.jsx(c,{tone:"amber",children:e.jsx(t.p,{children:`Until variable capture is implemented, rewrite the lambda to accept the value as a
parameter or store the value in a static field that both scopes can access.`})})]})}function u(i={}){const{wrapper:t}=i.components||{};return t?e.jsx(t,{...i,children:e.jsx(h,{...i})}):h(i)}function d(i,t){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};
