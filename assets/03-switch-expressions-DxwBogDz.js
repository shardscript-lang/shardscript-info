import{j as e}from"./index-DLc5xCYN.js";function d(c){const s={p:"p",...c.components},{Bullet:i,Callout:l,CodeBlock:a,DocsTable:h,H2:r,InlineCode:n,Prose:t}=s;return i||o("Bullet"),l||o("Callout"),a||o("CodeBlock"),h||o("DocsTable"),r||o("H2"),n||o("InlineCode"),t||o("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(r,{children:"Summary"}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:["A ",e.jsx(n,{children:"switch"})," expression evaluates a single ",e.jsx("em",{children:"scrutinee"})," ",`
expression and selects the first arm whose pattern matches. Patterns can be constant values
(integer, string, boolean, enum), type tests (`,e.jsx(n,{children:"is Type"}),`), or type tests
that bind a variable (`,e.jsx(n,{children:"is Type varName"}),"). The discard pattern"," ",`
`,e.jsx(n,{children:"_"})," acts as a catch-all default arm. Unlike an imperative"," ",`
`,e.jsx(n,{children:"switch"}),` statement, every arm produces a value and the whole expression
evaluates to the chosen arm's value.`]})}),`
`,e.jsx(r,{children:"Syntax"}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:["Write ",e.jsx(n,{children:"switch"}),` followed by the scrutinee, then a brace-delimited list
of arms. Each arm contains a pattern, the fat arrow `,e.jsx(n,{children:"=>"}),`, and an
expression. Arms are separated by commas; the trailing comma after the last arm is optional.`]})}),`
`,e.jsx(a,{code:`switchValue = switch scrutinee
{
  constantPattern  => expression1,
  is Type          => expression2,
  is Type varName  => expression3,
  _                => defaultExpression,
};`,language:"csharp",filename:"switch_expression_syntax.shard"}),`
`,e.jsx(r,{children:"Parameters / Arguments"}),`
`,e.jsx(h,{headers:["Part","Required","Description"],rows:[["scrutinee","Yes","The expression whose value is matched. It is evaluated exactly once."],["constant pattern","Yes, if no type pattern","A constant expression compared against the scrutinee using equality. The first matching arm wins."],["is Type","Yes, if no type pattern","A type pattern that matches when the scrutinee is an instance of Type or a derived type."],["is Type varName","Yes, if no type pattern","A type pattern that matches the same way and binds the casted instance to varName in the arm expression."],["arm expression","Yes","The expression that provides the value of the switch expression when its arm is selected."],["_","No","The discard pattern. It matches any value and is conventionally written as the last arm."]]}),`
`,e.jsx(r,{children:"Returns"}),`
`,e.jsx(t,{children:e.jsx(s.p,{children:`The switch expression returns the value of the expression from the selected arm. The type of
the switch expression is taken from the first arm, so every arm should produce the same type
for predictable results.`})}),`
`,e.jsx(r,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Missing braces or arrow"})," — Omitting"," ",`
`,e.jsx(n,{children:"{"}),", ",e.jsx(n,{children:"=>"}),", or"," ",`
`,e.jsx(n,{children:"}"})," after an arm pattern produces a parser error."]})}),e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"No matching arm without default"}),` — If the
scrutinee does not match any pattern and there is no `,e.jsx(n,{children:"_"}),` arm, the
result is undefined.`]})}),e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Mismatched arm expression types"}),` — The
current semantic binder does not reject arms with different expression types. The first
arm's type becomes the switch expression type, so mixed types can silently produce
unexpected behavior.`]})}),e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Pattern type mismatch"}),` — Constant patterns are
not required to match the scrutinee type, but comparing unrelated types (for example,`," ",`
`,e.jsx(n,{children:"string"})," against ",e.jsx(n,{children:"int"}),`) typically fails at
runtime.`]})}),e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Type pattern on non-instance scrutinee"}),` — A
type pattern such as `,e.jsx(n,{children:"is Cat"})," matches ",e.jsx(n,{children:"null"}),` as
a non-matching case and continues to the next arm. It does not throw.`]})}),e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Binding variable shadows an outer name"}),` — The
binder rejects an `,e.jsx(n,{children:"is Type varName"})," arm when ",e.jsx(n,{children:"varName"})," ",`
conflicts with an existing local or parameter in the enclosing scope.`]})})]}),`
`,e.jsx(r,{children:"Remarks"}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Expression, not statement."}),` A switch expression always yields a value, so it
can appear anywhere an expression is expected: on the right-hand side of an assignment, as a
function argument, in a return statement, or nested inside another switch expression.`]})}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Sequential matching."}),` Arms are tested in source order and the first matching
arm is selected. There is no implicit fallthrough; once an arm is selected, its expression is
evaluated and the switch expression is complete.`]})}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Constant patterns."}),` Constant patterns are literal or named values such as
integer literals, string literals, boolean literals, or enum member accesses. They are compared
against the scrutinee using equality. The parser accepts arbitrary expressions in a pattern
position, but only constant patterns are guaranteed to behave as a true match.`]})}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Type patterns."})," A type pattern ",e.jsx(n,{children:"is Type"}),` uses the runtime
type information of the scrutinee. It matches when the scrutinee is an instance of the named
type or a type derived from it. Interfaces are supported, so `,e.jsx(n,{children:"is IDisposable"})," ",`
matches any instance whose type implements the interface. A type pattern does not match`," ",`
`,e.jsx(n,{children:"null"}),"; it simply fails and lets a later arm attempt to match."]})}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Binding variables."})," In ",e.jsx(n,{children:"is Type varName"}),`, the binder
introduces a new local variable `,e.jsx(n,{children:"varName"})," whose type is ",e.jsx(n,{children:"Type"})," ",`
inside the corresponding arm expression. The variable holds the scrutinee cast to that type, so
members available on `,e.jsx(n,{children:"Type"}),` can be accessed without an additional cast.
The variable exists only for the arm it is declared in; it is not visible after the switch
expression.`]})}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Pattern arm ordering."}),` Constant-pattern arms and type-pattern arms can be mixed
in the same switch expression. Arms are still tested in source order, and the first matching arm
wins. Place more specific type patterns before less specific ones; for example, put`," ",`
`,e.jsx(n,{children:"is Cat"})," before ",e.jsx(n,{children:"is Animal"})," when both could match."]})}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Default arm placement."})," The discard pattern ",e.jsx(n,{children:"_"}),` can be
placed anywhere in the arm list, but conventionally it is written last so the preceding arms
can match first. If `,e.jsx(n,{children:"_"}),` appears before other arms, those arms are
unreachable.`]})}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Single evaluation."}),` The scrutinee is evaluated exactly once. Store it in a
local variable first if evaluating it has side effects that you do not want to repeat.`]})}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Type of the switch expression."}),` The binder currently uses the type of the
first arm as the switch expression type. It does not verify that later arms produce the same
type, so keep all arm expressions homogeneous to avoid subtle type errors.`]})}),`
`,e.jsx(l,{tone:"blue",title:"switch statements are also available",children:e.jsxs(s.p,{children:["The imperative ",e.jsx(n,{children:"switch"})," statement with ",e.jsx(n,{children:"case"})," and"," ",`
`,e.jsx(n,{children:"default"})," blocks is now implemented. See the"," ",`
`,e.jsx(n,{children:"syntax/switch-statements"}),` reference for statement-oriented pattern
matching.`]})}),`
`,e.jsx(r,{children:"Examples"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Matching an integer code."})}),`
`,e.jsx(a,{code:`using stdio;

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
`,e.jsx(a,{code:`using stdio;

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
`,e.jsx(a,{code:`using stdio;

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
`,e.jsx(a,{code:`using stdio;

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
`,e.jsx(a,{code:`using stdio;

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
`,e.jsx(t,{children:e.jsx("strong",{children:"Type patterns and variable bindings."})}),`
`,e.jsx(a,{code:`using stdio;

namespace demo;

public interface Animal
{
  func Name() -> string;
}

public class Cat : Animal
{
  public func Name() -> string
  {
      return "cat";
  }

  public func Meow() -> string
  {
      return "meow";
  }
}

public class Dog : Animal
{
  public func Name() -> string
  {
      return "dog";
  }

  public func Bark() -> string
  {
      return "woof";
  }
}

public static func MakeSound(a: Animal) -> string
{
  return switch a
  {
      is Cat c => c.Meow(),
      is Dog d => d.Bark(),
      is Animal => "some animal",
      _ => "unknown",
  };
}

public static func Main() -> void
{
  cat: Animal = new Cat();
  dog: Animal = new Dog();

  println(MakeSound(cat));   // meow
  println(MakeSound(dog));   // woof
  println(MakeSound(null));  // unknown
}`,language:"csharp",filename:"switch_is_patterns.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Common mistakes and edge cases."})}),`
`,e.jsx(a,{code:`using stdio;

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
}`,language:"csharp",filename:"switch_edge_cases.shard"}),`
`,e.jsx(r,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx(n,{children:"Interfaces and Abstractions"})," — using interfaces with type patterns."]})}),e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx(n,{children:"Classes"})," — declaring the class hierarchies matched by type patterns."]})}),e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx(n,{children:"Enums"})," — using enum members as constant switch patterns."]})})]}),`
`,e.jsx(r,{children:"Source"}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:["Switch expressions are parsed in ",e.jsx(n,{children:"ShardScript/src/parsing/SourceParser.cpp"}),`,
bound in `,e.jsx(n,{children:"ShardScript/src/semantic/ExpressionBinder.cpp"}),", and emitted in"," ",`
`,e.jsx(n,{children:"ShardScript/src/compilation/AbstractEmiter.cpp"}),`. The type-pattern syntax
node is declared in `,e.jsx(n,{children:"ShardScript/include/shard/parsing/nodes/Expressions/IsPatternSyntax.hpp"}),"."]})})]})}function m(c={}){const{wrapper:s}=c.components||{};return s?e.jsx(s,{...c,children:e.jsx(d,{...c})}):d(c)}function o(c,s){throw new Error("Expected component `"+c+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default};
