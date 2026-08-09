import{j as e}from"./index-DIkNH1R5.js";function h(o){const s={p:"p",...o.components},{Bullet:r,Callout:d,CodeBlock:t,DocsTable:c,H2:l,InlineCode:n,Prose:i}=s;return r||a("Bullet"),d||a("Callout"),t||a("CodeBlock"),c||a("DocsTable"),l||a("H2"),n||a("InlineCode"),i||a("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(l,{children:"Summary"}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[`ShardScript conditional statements branch execution based on a boolean condition.
The language provides `,e.jsx(n,{children:"if"}),", ",e.jsx(n,{children:"else if"}),`,
`,e.jsx(n,{children:"else"}),", and ",e.jsx(n,{children:"unless"}),` statement forms,
plus an expression-oriented `,e.jsx(n,{children:"if"})," form for value selection."]})}),`
`,e.jsx(l,{children:"Syntax"}),`
`,e.jsx(i,{children:"Statement form — condition must be parenthesized:"}),`
`,e.jsx(t,{code:`if (condition)
  statement;

if (condition)
{
  statement;
  statement;
}

if (condition)
  statement;
else if (condition)
  statement;
else
  statement;

unless (condition)
  statement;

unless (condition)
  statement;
else
  statement;`,language:"csharp",filename:"conditionals_syntax.shard"}),`
`,e.jsx(i,{children:"Expression form — parentheses around the condition are optional:"}),`
`,e.jsx(t,{code:`value := if (condition) thenExpression else elseExpression;
value := if condition thenExpression else elseExpression;`,language:"csharp",filename:"if_expression_syntax.shard"}),`
`,e.jsx(l,{children:"Parameters / Arguments"}),`
`,e.jsx(c,{headers:["Element","Required","Type","Description"],rows:[[e.jsx(n,{children:"condition"}),"yes","bool","The boolean expression that selects which branch runs."],[e.jsx(n,{children:"statement"}),"yes (per branch)","statement or block","The body executed when the clause matches."],[e.jsx(n,{children:"thenExpression"}),"yes (expression form)","expression","Value produced when the condition is true."],[e.jsx(n,{children:"elseExpression"}),"yes (expression form)","expression","Value produced when the condition is false."]]}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Clause behavior:"})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx(n,{children:"if"})," runs its body when the condition evaluates to ",e.jsx(n,{children:"true"}),"."]})}),e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx(n,{children:"unless"})," runs its body when the condition evaluates to ",e.jsx(n,{children:"false"}),"."]})}),e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx(n,{children:"else if"})," and ",e.jsx(n,{children:"else unless"}),` are evaluated in order
only when every preceding clause failed to match.`]})}),e.jsx(r,{children:e.jsxs(s.p,{children:["A trailing ",e.jsx(n,{children:"else"})," runs only when no previous clause matched."]})})]}),`
`,e.jsx(l,{children:"Returns"}),`
`,e.jsx(c,{headers:["Form","Returns"],rows:[["Statement form","Nothing. Control flow continues after the conditional."],["Expression form","The value of the selected branch expression. Both branches must produce compatible types."]]}),`
`,e.jsx(l,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Non-boolean condition"})," — The condition of"," ",`
`,e.jsx(n,{children:"if"})," and ",e.jsx(n,{children:"unless"})," must be ",e.jsx(n,{children:"bool"}),`.
Passing an `,e.jsx(n,{children:"int"}),", ",e.jsx(n,{children:"string"}),`, or other type fails
semantic analysis with a type-mismatch error.`]})}),e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Missing parentheses (statement form)"})," — Writing"," ",`
`,e.jsx(n,{children:"if true"})," instead of ",e.jsx(n,{children:"if (true)"}),` in a statement
produces a parser error; the statement form requires parentheses.`]})}),e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Empty body"}),` — A bare semicolon after the condition
(`,e.jsx(n,{children:"if (true);"}),") is rejected. Use an empty block ",e.jsx(n,{})," ",`
if a no-op branch is intentional.`]})}),e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Dangling else"})," — Each ",e.jsx(n,{children:"else"})," ",`
binds to the nearest preceding `,e.jsx(n,{children:"if"})," or ",e.jsx(n,{children:"unless"}),` in
the same block. Use explicit braces to override the default binding.`]})}),e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Type mismatch (expression form)"}),` — The then and else
branches of an `,e.jsx(n,{children:"if"})," expression must yield the same type."]})})]}),`
`,e.jsx(l,{children:"Remarks"}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Statement bodies."}),` A conditional clause accepts either a single statement or a
braced block. ShardScript does not require braces for a single statement, but braces are mandatory
for more than one statement. The documentation style used in this project recommends explicit
braces in all production code for clarity and to reduce dangling-else mistakes.`]})}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Unless semantics."})," ",e.jsx(n,{children:"unless (condition)"})," is equivalent to"," ",`
`,e.jsx(n,{children:"if (!condition)"}),`. The keyword form reads naturally for guard clauses and
early-exit checks. An `,e.jsx(n,{children:"else"})," after ",e.jsx(n,{children:"unless"}),` runs when
the condition is `,e.jsx(n,{children:"true"}),"."]})}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Chaining clauses."})," After ",e.jsx(n,{children:"else"}),` the parser accepts another
`,e.jsx(n,{children:"if"}),", another ",e.jsx(n,{children:"unless"}),`, or a final block. This allows
mixed chains such as `,e.jsx(n,{children:"if ... else unless ... else"}),"."]})}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Boolean-only conditions."}),` There is no truthy/falsy coercion. Numeric zero, empty
strings, and `,e.jsx(n,{children:"null"})," references do ",e.jsx("em",{children:"not"}),` act as false. The condition
must be an expression that the compiler resolves to `,e.jsx(n,{children:"bool"}),"."]})}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"VM lowering."})," A statement conditional compiles to a ",e.jsx(n,{children:"jmpf"})," ",`
(jump-if-false) for `,e.jsx(n,{children:"if"})," or ",e.jsx(n,{children:"jmpt"}),` (jump-if-true) for
`,e.jsx(n,{children:"unless"}),", followed by unconditional ",e.jsx(n,{children:"jmp"}),` instructions
that skip the remaining clauses once a branch is taken. The condition value is popped from the
evaluation stack before the branch body executes.`]})}),`
`,e.jsx(d,{tone:"amber",title:"Expression form status",children:e.jsxs(s.p,{children:["The parser and semantic binder recognize ",e.jsx(n,{children:"if"}),` as an expression, but the
synchronous bytecode emitter does not yet implement it. Until that work is complete, use the
ternary conditional operator (`,e.jsx(n,{children:"condition ? thenValue : elseValue"}),`) for
value selection in synchronous code, or fall back to an `,e.jsx(n,{children:"if"}),` statement with
a pre-declared variable.`]})}),`
`,e.jsx(l,{children:"Examples"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Basic if/else if/else chain."})}),`
`,e.jsx(t,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  score: int = 85;

  if (score >= 90)
  {
      println("A");
  }
  else if (score >= 80)
  {
      println("B");
  }
  else if (score >= 70)
  {
      println("C");
  }
  else
  {
      println("F");
  }
}`,language:"csharp",filename:"grade_conditionals.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"unless for inverted logic."})}),`
`,e.jsx(t,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  ready: bool = false;

  unless (ready)
  {
      println("still loading");
  }
  else
  {
      println("ready");
  }
}`,language:"csharp",filename:"unless_inverted.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Single-statement bodies."})}),`
`,e.jsx(t,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  value: int = 7;

  if (value > 0)
      println("positive");
  else if (value < 0)
      println("negative");
  else
      println("zero");
}`,language:"csharp",filename:"single_statement.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Boolean-only condition enforcement."})}),`
`,e.jsx(t,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  count: int = 5;

  // Correct: the comparison produces bool.
  if (count > 0)
  {
      println("has items");
  }

  // Incorrect and will not compile:
  // if (count) { println("has items"); }
  // Error: condition must be boolean, got 'int'
}`,language:"csharp",filename:"boolean_condition.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Value selection with the ternary operator."})}),`
`,e.jsx(t,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  value: int = -4;

  // Ternary ? : is fully emitted and works today.
  sign: int = value >= 0 ? 1 : -1;
  label: string = value > 10 ? "big" : "small";

  println(sign);    // -1
  println(label);   // small
}`,language:"csharp",filename:"ternary_value_selection.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Equivalent logic without the expression form."})}),`
`,e.jsx(t,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  value: int = 7;
  sign: int = 0;

  // Use a statement and a pre-declared variable when the expression
  // form is unavailable or when both branches are too large for a
  // single expression.
  if (value >= 0)
  {
      sign = 1;
  }
  else
  {
      sign = -1;
  }

  println(sign);    // 1
}`,language:"csharp",filename:"statement_equivalent.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Nested conditionals and explicit braces."})}),`
`,e.jsx(t,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  a: bool = true;
  b: bool = false;

  if (a)
  {
      if (b)
      {
          println("a and b");
      }
      else
      {
          println("a only");
      }
  }
  else
  {
      println("neither");
  }
}`,language:"csharp",filename:"nested_conditionals.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Mixed else-if / else-unless chain."})}),`
`,e.jsx(t,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  mode: string = "silent";
  enabled: bool = true;

  if (mode == "verbose")
  {
      println("full output");
  }
  else unless (enabled)
  {
      println("disabled");
  }
  else
  {
      println("normal");
  }
}`,language:"csharp",filename:"mixed_chain.shard"})]})}function u(o={}){const{wrapper:s}=o.components||{};return s?e.jsx(s,{...o,children:e.jsx(h,{...o})}):h(o)}function a(o,s){throw new Error("Expected component `"+o+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};
