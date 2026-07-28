import{j as e}from"./index-DREHvARB.js";function d(r){const n={p:"p",...r.components},{Bullet:o,Callout:l,CodeBlock:i,DocsTable:h,H2:a,InlineCode:s,Prose:t}=n;return o||c("Bullet"),l||c("Callout"),i||c("CodeBlock"),h||c("DocsTable"),a||c("H2"),s||c("InlineCode"),t||c("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(a,{children:"Summary"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:["A ",e.jsx(s,{children:"switch"})," expression evaluates a single ",e.jsx("em",{children:"scrutinee"})," ",`
expression and selects the first arm whose constant pattern equals the scrutinee value.
The discard pattern `,e.jsx(s,{children:"_"}),` acts as a catch-all default arm.
Unlike an imperative `,e.jsx(s,{children:"switch"}),` statement, every arm produces a value
and the whole expression evaluates to the chosen arm's value.`]})}),`
`,e.jsx(a,{children:"Syntax"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:["Write ",e.jsx(s,{children:"switch"}),` followed by the scrutinee, then a brace-delimited list
of arms. Each arm contains a pattern, the fat arrow `,e.jsx(s,{children:"=>"}),`, and an
expression. Arms are separated by commas; the trailing comma after the last arm is optional.`]})}),`
`,e.jsx(i,{code:`switchValue = switch scrutinee
{
  pattern1 => expression1,
  pattern2 => expression2,
  _        => defaultExpression,
};`,language:"csharp",filename:"switch_expression_syntax.shard"}),`
`,e.jsx(a,{children:"Parameters / Arguments"}),`
`,e.jsx(h,{headers:["Part","Required","Description"],rows:[["scrutinee","Yes","The expression whose value is matched. It is evaluated exactly once."],["pattern","Yes","A constant expression compared against the scrutinee using equality. The first matching arm wins."],["arm expression","Yes","The expression that provides the value of the switch expression when its arm is selected."],["_","No","The discard pattern. It matches any value and is conventionally written as the last arm."]]}),`
`,e.jsx(a,{children:"Returns"}),`
`,e.jsx(t,{children:e.jsx(n.p,{children:`The switch expression returns the value of the expression from the selected arm. The type of
the switch expression is taken from the first arm, so every arm should produce the same type
for predictable results.`})}),`
`,e.jsx(a,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(o,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Missing braces or arrow"})," — Omitting"," ",`
`,e.jsx(s,{children:"{"}),", ",e.jsx(s,{children:"=>"}),", or"," ",`
`,e.jsx(s,{children:"}"})," after an arm pattern produces a parser error."]})}),e.jsx(o,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"No matching arm without default"}),` — If the
scrutinee does not match any pattern and there is no `,e.jsx(s,{children:"_"}),` arm, the
result is undefined.`]})}),e.jsx(o,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Mismatched arm expression types"}),` — The
current semantic binder does not reject arms with different expression types. The first
arm's type becomes the switch expression type, so mixed types can silently produce
unexpected behavior.`]})}),e.jsx(o,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Pattern type mismatch"}),` — Patterns are not
required to match the scrutinee type, but comparing unrelated types (for example,`," ",`
`,e.jsx(s,{children:"string"})," against ",e.jsx(s,{children:"int"}),`) typically fails at
runtime.`]})})]}),`
`,e.jsx(a,{children:"Remarks"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Expression, not statement."}),` A switch expression always yields a value, so it
can appear anywhere an expression is expected: on the right-hand side of an assignment, as a
function argument, in a return statement, or nested inside another switch expression.`]})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Sequential matching."}),` Arms are tested in source order and the first matching
arm is selected. There is no implicit fallthrough; once an arm is selected, its expression is
evaluated and the switch expression is complete.`]})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Constant patterns."}),` Patterns are intended to be constant expressions such as
integer literals, string literals, boolean literals, or enum member accesses. The parser
accepts arbitrary expressions, but only constant patterns are guaranteed to behave as a true
match.`]})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Default arm placement."})," The discard pattern ",e.jsx(s,{children:"_"}),` can be
placed anywhere in the arm list, but conventionally it is written last so the preceding arms
can match first. If `,e.jsx(s,{children:"_"}),` appears before other arms, those arms are
unreachable.`]})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Single evaluation."}),` The scrutinee is evaluated exactly once. Store it in a
local variable first if evaluating it has side effects that you do not want to repeat.`]})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Type of the switch expression."}),` The binder currently uses the type of the
first arm as the switch expression type. It does not verify that later arms produce the same
type, so keep all arm expressions homogeneous to avoid subtle type errors.`]})}),`
`,e.jsx(l,{tone:"amber",title:"switch statement status",children:e.jsxs(n.p,{children:["The imperative ",e.jsx(s,{children:"switch"})," statement (with ",e.jsx(s,{children:"case"})," ",`
labels, block bodies, and fallthrough control) is planned but not yet implemented. Today, use
the `,e.jsx(s,{children:"switch"}),` expression form shown on this page for constant pattern
matching.`]})}),`
`,e.jsx(a,{children:"Examples"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Matching an integer code."})}),`
`,e.jsx(i,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  day: int = 2;

  dayName: string = switch day
  {
      1 => "Monday",
      2 => "Tuesday",
      3 => "Wednesday",
      4 => "Thursday",
      5 => "Friday",
      _ => "Weekend",
  };

  println(dayName);   // Tuesday
}`,language:"csharp",filename:"switch_int.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Matching a string command."})}),`
`,e.jsx(i,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  command: string = "quit";

  response: string = switch command
  {
      "start" => "Starting engine",
      "stop"  => "Stopping engine",
      "quit"  => "Exiting application",
      _       => "Unknown command",
  };

  println(response);   // Exiting application
}`,language:"csharp",filename:"switch_string.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Matching a boolean flag."})}),`
`,e.jsx(i,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  enabled: bool = false;

  label: string = switch enabled
  {
      true  => "ON",
      false => "OFF",
      _     => "UNREACHABLE",   // keeps the expression total for bool
  };

  println(label);   // OFF
}`,language:"csharp",filename:"switch_bool.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Returning a switch expression from a function."})}),`
`,e.jsx(i,{code:`using stdio;

namespace demo;

public static func Grade(score: int) -> string
{
  return switch score
  {
      100 => "perfect",
      90  => "excellent",
      80  => "good",
      70  => "fair",
      60  => "pass",
      _   => "fail",
  };
}

public static func Main() -> void
{
  result: string = Grade(85);
  println(result);   // good
}`,language:"csharp",filename:"switch_return.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Nested switch expressions."})}),`
`,e.jsx(i,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  tier: int = 2;
  region: int = 1;

  label: string = switch tier
  {
      1 => "basic",
      2 => switch region
      {
          1 => "premium-east",
          2 => "premium-west",
          _ => "premium-unknown",
      },
      3 => "enterprise",
      _ => "free",
  };

  println(label);   // premium-east
}`,language:"csharp",filename:"switch_nested.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Common mistakes and edge cases."})}),`
`,e.jsx(i,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  n: int = 1;

  // The _ pattern is written first, so it catches every value and the
  // later 1 => "one" arm is never reached.
  result: string = switch n
  {
      _ => "default",
      1 => "one",
  };

  println(result);   // default

  // Without a _ default arm, a value that matches no pattern leaves the
  // switch expression with an undefined result.
  //
  // bad: string = switch n { 1 => "one", 2 => "two" };   // undefined for n == 3
}`,language:"csharp",filename:"switch_edge_cases.shard"})]})}function m(r={}){const{wrapper:n}=r.components||{};return n?e.jsx(n,{...r,children:e.jsx(d,{...r})}):d(r)}function c(r,n){throw new Error("Expected component `"+r+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default};
