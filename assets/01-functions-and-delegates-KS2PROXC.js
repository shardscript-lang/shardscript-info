import{j as e}from"./index-DFYo8cca.js";function h(r){const n={code:"code",p:"p",...r.components},{Bullet:l,Callout:o,CodeBlock:d,DocsTable:c,H2:s,InlineCode:t,Prose:a}=n;return l||i("Bullet"),o||i("Callout"),d||i("CodeBlock"),c||i("DocsTable"),s||i("H2"),t||i("InlineCode"),a||i("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(s,{children:"Summary"}),`
`,e.jsx(a,{children:e.jsxs(n.p,{children:["In ShardScript, functions are ",e.jsx("strong",{children:"first-class values"}),`: a method or lambda can be stored in a
variable, passed as an argument, returned from another function, and invoked later through a
delegate type. A `,e.jsx(t,{children:"delegate"}),` is a named or inline function type that describes the
parameter and return signature of a callable value.`]})}),`
`,e.jsx(s,{children:"Syntax"}),`
`,e.jsx(a,{children:e.jsx(n.p,{children:"There are two ways to express a delegate type and two ways to create a function value."})}),`
`,e.jsx(c,{headers:["Form","Syntax","Usage"],rows:[["Named delegate declaration",e.jsx(n.code,{children:"public delegate Name(params) -> ReturnType;"}),"Defines a reusable, named callable type."],["Inline delegate type",e.jsx(n.code,{children:"delegate ReturnType(ParamType, ...)"}),"A fabricated type written directly where a type is needed."],["Lambda expression (explicit return)",e.jsx(n.code,{children:"lambda (params) -> Type { body }"}),"Anonymous function with an explicit return type."],["Lambda expression (inferred return)",e.jsx(n.code,{children:"lambda (params) => { body }"}),"Anonymous function whose return type is inferred from the body."],["Method-to-delegate conversion",e.jsx(n.code,{children:"dlg: DelegateType = MethodName;"}),"Binds an existing named method to a delegate variable."]]}),`
`,e.jsx(a,{children:e.jsxs(n.p,{children:[`A named delegate is declared at namespace or type scope just like a class. An inline delegate type
is written wherever a type appears: variable declarations, parameters, fields, and return types. The
inline form lists only parameter `,e.jsx("em",{children:"types"}),", not parameter names."]})}),`
`,e.jsx(s,{children:"Parameters / Arguments"}),`
`,e.jsx(c,{headers:["Element","Required","Description"],rows:[["Return type","Yes","The type the delegate evaluates to when invoked. Use <InlineCode>void</InlineCode> for actions."],["Parameter list","Yes","A parenthesized, comma-separated list of typed parameters. Empty parentheses mean no parameters."],["Generic type parameters","Optional","Named delegates may declare generic parameters, e.g. <InlineCode>delegate Transform&lt;T, U&gt;(value: T) -&gt; U;</InlineCode>."],["Access modifier","Optional","Named delegates support access modifiers such as <InlineCode>public</InlineCode> and <InlineCode>internal</InlineCode>."]]}),`
`,e.jsx(a,{children:e.jsxs(n.p,{children:[`When a named method is bound to a delegate, every parameter type and the return type must match
exactly. The parameter `,e.jsx("em",{children:"names"}),` in the delegate declaration are not part of the signature for
matching purposes, but they serve as documentation.`]})}),`
`,e.jsx(s,{children:"Returns"}),`
`,e.jsx(c,{headers:["Construct","Result"],rows:[["Delegate declaration","Defines a new callable type; it does not produce a runtime value."],["Lambda expression","Evaluates to a delegate value that captures the anonymous method."],["Method group conversion","Evaluates to a delegate value that targets the named method."],["Delegate invocation","Evaluates to the return type declared by the delegate."]]}),`
`,e.jsx(s,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(l,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Signature mismatch"}),` — Assigning a lambda or method to a
delegate whose parameter or return types differ produces a compile-time error.`]})}),e.jsx(l,{children:e.jsxs(n.p,{children:[e.jsxs("strong",{className:"text-text-primary",children:["Missing ",e.jsx(t,{children:"lambda"})," keyword"]}),` — A bare
expression such as `,e.jsx(t,{children:"(x) => x + 1"})," does not parse; the"," ",`
`,e.jsx(t,{children:"lambda"})," keyword is mandatory."]})}),e.jsx(l,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Async lambda without explicit return type"})," — An"," ",`
`,e.jsx(t,{children:"async lambda"})," must declare an explicit return type such as"," ",`
`,e.jsx(t,{children:"Task"})," or ",e.jsx(t,{children:"ValueTask<T>"}),"; the"," ",`
`,e.jsx(t,{children:"=>"})," inferred form is not allowed."]})}),e.jsx(l,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Null invocation"}),` — Calling a delegate variable whose value
is `,e.jsx(t,{children:"null"})," throws a runtime null-reference exception."]})}),e.jsx(l,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Argument count mismatch"}),` — Invoking a delegate with too many
or too few arguments fails at compile time.`]})})]}),`
`,e.jsx(s,{children:"Remarks"}),`
`,e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Named versus inline delegate types."}),` A named delegate is useful when the same signature
appears in many places or when you want a self-documenting type name. An inline delegate type is
convenient for one-off callbacks and local variables. Both are functionally equivalent: a value of
type `,e.jsx(t,{children:"GetIntegerDelegate"})," can be assigned to a variable of type"," ",`
`,e.jsx(t,{children:"delegate int(int)"}),` only if the signatures match, and the compiler treats both
as instances of the same underlying delegate machinery.`]})}),`
`,e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"First-class functions."}),` Because delegates are values, you can pass them into methods,
return them from methods, store them in fields, and place them in collections. The VM represents a
delegate as a small object that holds a reference to the target method and, for instance methods, a
receiver object. Static methods and lambdas produce delegates with no receiver.`]})}),`
`,e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Method group conversion."}),` When a method name appears in a context that expects a delegate
type, the compiler creates a delegate that wraps the method directly. No explicit lambda wrapper is
required. The conversion works for both static and instance methods, provided the signature matches.`]})}),`
`,e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Invocation syntax."})," A delegate variable is invoked with ordinary call syntax:"," ",`
`,e.jsx(t,{children:"myDelegate(arg1, arg2)"}),`. The compiler rewrites the call to invoke the delegate's
underlying `,e.jsx(t,{children:"Invoke"})," method, which the runtime dispatches through the"," ",`
`,e.jsx(t,{children:"CALLDELEGATE"})," opcode."]})}),`
`,e.jsx(o,{tone:"blue",children:e.jsxs(n.p,{children:["ShardScript delegates currently hold a ",e.jsx("strong",{children:"single target"}),". Combining delegates with"," ",`
`,e.jsx(t,{children:"+"})," or ",e.jsx(t,{children:"+="}),` to create multicast delegates is not supported.
If you need to call several handlers in sequence, iterate over a collection of delegates or invoke
them explicitly.`]})}),`
`,e.jsx(o,{tone:"amber",title:"Async lambdas need an explicit return type",children:e.jsxs(n.p,{children:["Prefix a lambda with ",e.jsx(t,{children:"async"})," to create a closure that can ",e.jsx(t,{children:"await"}),`.
Because the async state machine must know the result type up front, you must write`," ",`
`,e.jsx(t,{children:"async lambda (params) -> Task { ... }"})," or"," ",`
`,e.jsx(t,{children:"async lambda (params) -> ValueTask<T> { ... }"}),". The inferred"," ",`
`,e.jsx(t,{children:"=>"})," form is rejected for async lambdas."]})}),`
`,e.jsx(s,{children:"Examples"}),`
`,e.jsx(a,{children:e.jsx("strong",{children:"Named delegate, lambda, and method conversion."})}),`
`,e.jsx(d,{code:`using stdio;

namespace demo;

// A named delegate type, reusable across the codebase.
public delegate IntFunc(a: int) -> int;

static func Triple(x: int) -> int
{
  return x * 3;
}

public static func Main() -> void
{
  // Bind a lambda to the named delegate type.
  inc: IntFunc = lambda (a: int) -> int
  {
      return a + 1;
  };

  // Bind a named method directly -- no wrapper lambda needed.
  mult: IntFunc = Triple;

  println(inc(5));       // 6
  println(mult(4));      // 12
}`,language:"csharp",filename:"named_delegate.shard"}),`
`,e.jsx(a,{children:e.jsx("strong",{children:"Inline fabricated delegate type."})}),`
`,e.jsx(d,{code:`using stdio;

namespace demo;

static func Add(a: int, b: int) -> int
{
  return a + b;
}

public static func Main() -> void
{
  // An inline delegate type lists only parameter types, no names.
  op: delegate int(int, int) = Add;

  // A lambda also fits the inline type as long as signatures match.
  scale: delegate int(int) = lambda (x: int) -> int
  {
      return x * 10;
  };

  println(op(2, 3));      // 5
  println(scale(7));      // 70
}`,language:"csharp",filename:"inline_delegate.shard"}),`
`,e.jsx(a,{children:e.jsx("strong",{children:"Higher-order functions: passing and returning delegates."})}),`
`,e.jsx(d,{code:`using stdio;

namespace demo;

public delegate IntFunc(a: int) -> int;

// A function that takes a delegate argument.
static func Apply(f: IntFunc, x: int) -> int
{
  return f(x);
}

// A function that returns a delegate.
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
  // Pass a lambda directly where a delegate is expected.
  result: int = Apply(lambda (a: int) -> int { return a * a; }, 5);
  println(result);        // 25

  step: IntFunc = Choose(0);
  println(step(10));      // 11
}`,language:"csharp",filename:"higher_order.shard"}),`
`,e.jsx(a,{children:e.jsx("strong",{children:"Generic delegates."})}),`
`,e.jsx(d,{code:`using stdio;

namespace demo;

public delegate Transform<T, U>(value: T) -> U;

static func Make<T, U>(action: Transform<T, U>) -> Transform<T, U>
{
  return action;
}

public static func Main() -> void
{
  f: Transform<int, int> = Make<int, int>(lambda (a: int) -> int
  {
      return a + 10;
  });

  println(f(5));      // 15
}`,language:"csharp",filename:"generic_delegate.shard"}),`
`,e.jsx(a,{children:e.jsx("strong",{children:"Edge cases and common mistakes."})}),`
`,e.jsx(d,{code:`using stdio;

namespace demo;

public delegate Predicate(x: int) -> bool;

static func CountWhere(items: int[], matches: Predicate) -> int
{
  count: int = 0;

  foreach (n: int in items)
  {
      if (matches(n))
      {
          count = count + 1;
      }
  }

  return count;
}

public static func Main() -> void
{
  threshold: int = 5;
  nums: int[] = [1, 6, 3, 9, 4];

  // A lambda captures 'threshold' from the enclosing scope.
  big: int = CountWhere(nums, lambda (n: int) -> bool
  {
      return n > threshold;
  });

  println(big);       // 2

  // Empty parameter list: both parentheses are required.
  greeter: delegate string() = lambda () -> string
  {
      return "hello";
  };

  println(greeter());     // hello
}`,language:"csharp",filename:"delegate_edge_cases.shard"}),`
`,e.jsx(o,{tone:"amber",title:"Mismatched signatures are caught early",children:e.jsxs(n.p,{children:[`The compiler checks delegate compatibility at the assignment site. For example, assigning a
`,e.jsx(t,{children:"lambda (a: int) -> string"})," to a ",e.jsx(t,{children:"delegate int(int)"}),`
fails with a type error before the program ever runs.`]})})]})}function p(r={}){const{wrapper:n}=r.components||{};return n?e.jsx(n,{...r,children:e.jsx(h,{...r})}):h(r)}function i(r,n){throw new Error("Expected component `"+r+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
