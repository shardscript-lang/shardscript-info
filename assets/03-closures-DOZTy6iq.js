import{j as e}from"./index-DkFwvLJL.js";function d(i){const t={p:"p",...i.components},{Bullet:s,Callout:l,CodeBlock:c,H2:r,InlineCode:n,Prose:a}=t;return s||o("Bullet"),l||o("Callout"),c||o("CodeBlock"),r||o("H2"),n||o("InlineCode"),a||o("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(a,{children:e.jsxs(t.p,{children:["A ",e.jsx("strong",{className:"text-text-primary",children:"closure"})," is a lambda expression together with the variables it references from its enclosing scope. In ShardScript, closures are the mechanism that lets a lambda remember the context in which it was created, so it can use that context later, even after the surrounding function has returned."]})}),`
`,e.jsx(l,{tone:"amber",title:"Implementation status",children:e.jsx(t.p,{children:"ShardScript currently implements lambdas as first-class delegates, and the parser and binder recognize references to outer variables. However, the runtime does not yet lower those references into heap-promoted capture objects. As a result, a lambda that captures a local variable may not behave correctly if the lambda outlives the stack frame that owns the variable. The semantics described on this page are the intended design; true heap-promoted closures are planned."})}),`
`,e.jsx(r,{children:"Introduction"}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:["In ShardScript, functions are values. A ",e.jsx(n,{children:"lambda"})," creates an anonymous function that can be stored in a variable, passed to another function, or returned from a method. When that lambda reads or writes a variable declared outside its own body, the combination of the lambda and the variables it uses is called a closure."]})}),`
`,e.jsx(a,{children:e.jsx(t.p,{children:"Closures are powerful because they let a small piece of code carry its own environment. A filter predicate can capture a threshold value, a factory function can capture configuration, and a callback can capture the state it needs to react to an event. But that power comes with lifetime responsibilities: the captured variables must remain valid for as long as the closure can be invoked."})}),`
`,e.jsx(r,{children:"What it is"}),`
`,e.jsx(a,{children:e.jsx(t.p,{children:"A closure has two parts:"})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"The function body"})," — the code inside the ",e.jsx(n,{children:"lambda"})," expression."]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"The captured environment"})," — the set of outer variables the lambda references."]})})]}),`
`,e.jsx(a,{children:e.jsx(t.p,{children:"When the compiler sees a lambda reference an outer variable, it is supposed to bind that variable into the lambda's environment. In the intended ShardScript design, captured locals are promoted from the stack to a small heap-allocated capture object (sometimes called a display class) so the lambda can safely use them after the enclosing scope exits."})}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:["Today, the binder resolves outer names through the scope chain, but the emitter emits ordinary ",e.jsx(n,{children:"LOAD_VARIABLE"})," / ",e.jsx(n,{children:"STORE_VARIABLE"})," instructions against the lambda's own frame slots. Until heap promotion is implemented, this means the lambda is reading from its own local-variable array, not from a shared capture object. Non-capturing lambdas and lambdas that only use their parameters are fully supported; capturing lambdas should be treated as a preview of the final design."]})}),`
`,e.jsx(r,{children:"When to use it"}),`
`,e.jsx(a,{children:e.jsx(t.p,{children:"Closures are the right tool when a function needs a small amount of surrounding state and you want to keep that state near the code that uses it."})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Callbacks and predicates"})," — pass a lambda to ",e.jsx(n,{children:"Where"}),", ",e.jsx(n,{children:"Select"}),", or any higher-order API and let it capture the comparison value."]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Factory functions"})," — return a lambda that is preconfigured with settings from the factory call."]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Event handlers"})," — capture the object or state the handler needs to update."]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Encapsulation"})," — hide mutable state behind a narrow functional interface."]})})]}),`
`,e.jsx(a,{children:e.jsx(t.p,{children:"Until capture is fully implemented, prefer passing the needed state as an explicit argument when the lambda must outlive its enclosing scope. This keeps the code correct today and makes the data flow obvious."})}),`
`,e.jsx(r,{children:"Remarks"}),`
`,e.jsx(r,{children:"Readonly capture semantics"}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:["The intended ShardScript capture model is ",e.jsx("strong",{className:"text-text-primary",children:"readonly by default"}),". When a lambda captures a local variable, it receives a read-only view of that variable's value at the point of capture. The lambda can read the captured variable, but it cannot reassign it."]})}),`
`,e.jsx(a,{children:e.jsx(t.p,{children:"This rule exists for two reasons. First, it prevents subtle bugs where a callback mutates a variable long after the surrounding code has finished executing. Second, it allows the compiler to share a single captured value across multiple closures without worrying about which one wrote last."})}),`
`,e.jsx(l,{tone:"amber",title:"Mutable capture is not yet implemented",children:e.jsxs(t.p,{children:["A syntax for mutable capture (for example, a ",e.jsx(n,{children:"capture mut"})," modifier or similar) has not been finalized. Until it is, treat every captured local as read-only inside the lambda body. Reassigning a captured local will either be rejected by a future compiler version or will require explicit mutable-capture syntax."]})}),`
`,e.jsx(r,{children:"Lifetime and heap promotion"}),`
`,e.jsx(a,{children:e.jsx(t.p,{children:"Local variables normally live on the call stack and disappear when their function returns. A closure that escapes that function needs the captured variables to live longer, so the compiler must promote them to the GC heap."})}),`
`,e.jsx(a,{children:e.jsx(t.p,{children:"In the planned implementation, the compiler will:"})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsx(t.p,{children:"Identify every local variable referenced inside a lambda but declared outside it."})}),e.jsx(s,{children:e.jsx(t.p,{children:"Create a compiler-generated capture class containing those variables as fields."})}),e.jsx(s,{children:e.jsx(t.p,{children:"Allocate an instance of that class on the GC heap."})}),e.jsx(s,{children:e.jsx(t.p,{children:"Rewrite the lambda's variable accesses to read from and write to the capture object."})}),e.jsx(s,{children:e.jsx(t.p,{children:"Store a reference to the capture object inside the delegate so the variables stay alive as long as the delegate does."})})]}),`
`,e.jsx(a,{children:e.jsx(t.p,{children:"Until this lowering is implemented, captured locals are not promoted to the heap. A lambda that escapes its creating scope will read from stack slots that no longer exist, which produces undefined behavior. Keep closures close to their captures."})}),`
`,e.jsx(r,{children:"Non-capturing versus capturing lambdas"}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:["A lambda that only uses its parameters and globals is a ",e.jsx("strong",{className:"text-text-primary",children:"non-capturing"})," lambda. It can be passed anywhere and invoked at any time because it has no dependency on the stack frame that created it. A ",e.jsx("strong",{className:"text-text-primary",children:"capturing"})," lambda references at least one local variable from an enclosing scope and is therefore tied to that scope's lifetime."]})}),`
`,e.jsx(a,{children:e.jsx(t.p,{children:"The safest pattern today is to keep the lambda's lifetime shorter than the lifetime of the variables it captures. Define the lambda, hand it to a local higher-order function, and consume the result before the enclosing scope returns."})}),`
`,e.jsx(r,{children:"Examples"}),`
`,e.jsx(a,{children:e.jsx("strong",{children:"Non-capturing lambda passed to a higher-order function."})}),`
`,e.jsx(c,{code:`using stdio;
using collections;

namespace demo;

public delegate IntFunc(a: int) -> int;

// A higher-order function that transforms each element.
static func ApplyEach(items: int[], transform: IntFunc) -> List<int>
{
  result: List<int> = new List<int>();

  foreach (item in items)
  {
      result.Add(transform(item));
  }

  return result;
}

public static func Main() -> void
{
  values: int[] = [1, 2, 3, 4];

  // This lambda does not capture any outer locals.
  doubled: List<int> = ApplyEach(values, lambda (n: int) -> int
  {
      return n * 2;
  });

  foreach (n in doubled)
  {
      println(n);
  }
}`,language:"csharp",filename:"non_capturing_lambda.shard"}),`
`,e.jsx(a,{children:e.jsx("strong",{children:"Returning a lambda from a function."})}),`
`,e.jsx(c,{code:`using stdio;

namespace demo;

public delegate IntFunc(a: int) -> int;

// Returns a lambda that captures 'factor'. Safe only after heap promotion is implemented.
static func MakeMultiplier(factor: int) -> IntFunc
{
  return lambda (n: int) -> int
  {
      return n * factor;
  };
}

public static func Main() -> void
{
  triple: IntFunc = MakeMultiplier(3);
  println(triple(5));   // 15
}`,language:"csharp",filename:"returning_lambda.shard"}),`
`,e.jsx(l,{tone:"amber",title:"This example relies on planned capture semantics",children:e.jsxs(t.p,{children:["The lambda above references ",e.jsx(n,{children:"factor"}),", a parameter of the enclosing method. In the intended design it captures ",e.jsx(n,{children:"factor"})," into a heap-allocated closure. Until heap promotion is implemented, this pattern may not behave correctly if the lambda outlives the ",e.jsx(n,{children:"MakeMultiplier"})," frame."]})}),`
`,e.jsx(a,{children:e.jsx("strong",{children:"Intended closure with a captured local."})}),`
`,e.jsx(c,{code:`using stdio;

namespace demo;

public delegate IntFunc(a: int) -> int;

public static func Main() -> void
{
  offset: int = 10;

  // Intended: 'offset' is captured into the closure.
  addOffset: IntFunc = lambda (a: int) -> int
  {
      return a + offset;
  };

  println(addOffset(5));   // intended result: 15
}`,language:"csharp",filename:"capture_local.shard"}),`
`,e.jsx(l,{tone:"amber",title:"Capture of local variables is planned",children:e.jsxs(t.p,{children:["The compiler recognizes the reference to ",e.jsx(n,{children:"offset"}),", but the runtime currently emits a direct variable load instead of a heap-promoted capture. Treat this as illustrative syntax for the final closure design."]})}),`
`,e.jsx(a,{children:e.jsx("strong",{children:"Readonly capture: reading a captured value."})}),`
`,e.jsx(c,{code:`using stdio;

namespace demo;

public delegate Predicate(x: int) -> bool;

static func CountWhere(items: int[], matches: Predicate) -> int
{
  count: int = 0;

  foreach (n in items)
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

  // Intended: the lambda captures 'threshold' as a read-only value.
  big: int = CountWhere(nums, lambda (n: int) -> bool
  {
      return n > threshold;
  });

  println(big);   // intended result: 2
}`,language:"csharp",filename:"readonly_capture.shard"}),`
`,e.jsx(l,{tone:"blue",title:"Captures are read-only",children:e.jsxs(t.p,{children:["The lambda reads ",e.jsx(n,{children:"threshold"})," but does not assign to it. That is the intended capture style. Reassigning a captured local inside the lambda is reserved for a future mutable-capture feature."]})}),`
`,e.jsx(a,{children:e.jsx("strong",{children:"Common mistake: letting a closure outlive its captures."})}),`
`,e.jsx(c,{code:`using stdio;

namespace demo;

public delegate VoidFunc() -> void;

// DANGEROUS: returns a lambda that references a local of CreateCallback.
static func CreateCallback() -> VoidFunc
{
  message: string = "hello";

  return lambda () -> void
  {
      println(message);
  };
}

public static func Main() -> void
{
  // Do not do this until heap-promoted closures are implemented.
  // callback := CreateCallback();
  // callback();

  // Safe alternative: keep the lambda inside the scope that owns 'message'.
  message: string = "hello";
  localCallback: VoidFunc = lambda () -> void
  {
      println(message);
  };

  localCallback();
}`,language:"csharp",filename:"closure_lifetime.shard"}),`
`,e.jsx(l,{tone:"amber",title:"Escaping closures require heap promotion",children:e.jsxs(t.p,{children:["A lambda returned from ",e.jsx(n,{children:"CreateCallback"})," would reference ",e.jsx(n,{children:"message"})," after ",e.jsx(n,{children:"CreateCallback"}),"'s stack frame is gone. That requires heap promotion, which is not yet implemented. Keep capturing closures local to the scope that owns their variables."]})}),`
`,e.jsx(a,{children:e.jsx("strong",{children:"Capturing loop variables."})}),`
`,e.jsx(c,{code:`using stdio;
using collections;

namespace demo;

public delegate VoidFunc() -> void;

public static func Main() -> void
{
  callbacks: List<VoidFunc> = new List<VoidFunc>();

  // Intended design: each lambda captures its own copy of the loop variable.
  foreach (i in 0..3)
  {
      current: int = i;

      callbacks.Add(lambda () -> void
      {
          println(current);
      });
  }

  // After heap promotion is implemented, this prints 0, 1, 2.
  foreach (callback in callbacks)
  {
      callback();
  }
}`,language:"csharp",filename:"capture_loop_variable.shard"}),`
`,e.jsx(l,{tone:"amber",title:"Per-iteration capture is planned",children:e.jsxs(t.p,{children:["The pattern of copying the loop variable into a fresh local (",e.jsx(n,{children:"current"}),") so each lambda captures its own value is the intended idiom. It is not yet safe to store those lambdas in a collection and invoke them after the loop scope exits."]})}),`
`,e.jsx(r,{children:"Related articles"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"Lambda Expressions"})," — anonymous functions and delegate values."]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"Delegates"})," — named and inline callable value types."]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"Functions"})," — core function declaration and call syntax."]})})]})]})}function u(i={}){const{wrapper:t}=i.components||{};return t?e.jsx(t,{...i,children:e.jsx(d,{...i})}):d(i)}function o(i,t){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};
