import{j as e}from"./index-DLc5xCYN.js";function d(i){const s={p:"p",...i.components},{Bullet:r,CodeBlock:l,DocsTable:o,H2:a,InlineCode:n,Prose:t}=s;return r||c("Bullet"),l||c("CodeBlock"),o||c("DocsTable"),a||c("H2"),n||c("InlineCode"),t||c("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(a,{children:"Summary"}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:["A ",e.jsx(n,{children:"switch"}),` statement selects a statement block to execute by comparing a
scrutinee expression against a series of case patterns. Patterns may be constant values, type
patterns (`,e.jsx(n,{children:"is Type"}),`), or type patterns that bind a variable
(`,e.jsx(n,{children:"is Type varName"}),"). A ",e.jsx(n,{children:"default"}),` block runs when no
other pattern matches.`]})}),`
`,e.jsx(a,{children:"Syntax"}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:["Write ",e.jsx(n,{children:"switch"}),` followed by the parenthesized scrutinee, then a brace-delimited
list of clauses. Each clause starts with `,e.jsx(n,{children:"case"})," or ",e.jsx(n,{children:"default"}),`,
followed by a colon, then a statement block.`]})}),`
`,e.jsx(l,{code:`switch (scrutinee)
{
  case constantPattern:
  {
      // statements
      break;
  }

  case is Type:
  {
      // statements
      break;
  }

  case is Type varName:
  {
      // statements
      break;
  }

  default:
  {
      // statements
      break;
  }
}`,language:"csharp",filename:"switch_statement_syntax.shard"}),`
`,e.jsx(a,{children:"Parameters / Arguments"}),`
`,e.jsx(o,{headers:["Part","Required","Description"],rows:[["scrutinee","Yes","The expression whose value is matched. It is evaluated exactly once."],["constant pattern","Yes, per case","A constant expression compared against the scrutinee using equality. The first matching case runs."],["is Type","Yes, per case","A type pattern that matches when the scrutinee is an instance of Type or a derived type."],["is Type varName","Yes, per case","A type pattern that matches the same way and binds the casted instance to varName inside the case block."],["default","No","The catch-all clause. It runs when no case pattern matches."],["case body","Yes","A brace-delimited statement block executed when the case matches."]]}),`
`,e.jsx(a,{children:"Returns"}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:["The ",e.jsx(n,{children:"switch"}),` statement itself has no value. Execution continues with the
statement that follows the entire `,e.jsx(n,{children:"switch"}),` block after a matched case body
completes or after a `,e.jsx(n,{children:"break"})," statement."]})}),`
`,e.jsx(a,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Missing braces or colon"})," — Omitting"," ",`
`,e.jsx(n,{children:"{"}),", ",e.jsx(n,{children:"}"}),", or ",e.jsx(n,{children:":"})," ",`
after a case pattern produces a parser error.`]})}),e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"No matching case without default"}),` — If the
scrutinee does not match any pattern and there is no `,e.jsx(n,{children:"default"}),` clause,
the `,e.jsx(n,{children:"switch"})," statement does nothing."]})}),e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Type pattern on value type"}),` — A type pattern such
as `,e.jsx(n,{children:"is int"})," is rejected; type patterns work only with reference types."]})}),e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Binding variable shadows an outer name"}),` — The
binder rejects an `,e.jsx(n,{children:"is Type varName"})," case when ",e.jsx(n,{children:"varName"})," ",`
conflicts with an existing local or parameter in the enclosing scope.`]})}),e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"break outside switch or loop"})," — A"," ",`
`,e.jsx(n,{children:"break"})," statement is allowed inside a ",e.jsx(n,{children:"switch"})," ",`
case body or inside a loop, but not at top level.`]})})]}),`
`,e.jsx(a,{children:"Remarks"}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"No implicit fallthrough."}),` Each case body is independent. The compiler emits a
jump to the end of the `,e.jsx(n,{children:"switch"}),` after every case block, so control does not
flow from one case into the next. You can still write `,e.jsx(n,{children:"break"}),` explicitly to
exit early.`]})}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Sequential matching."}),` Cases are tested in source order and the first matching case
runs. Place the most specific type patterns before less specific ones; for example, put`," ",`
`,e.jsx(n,{children:"is Cat"})," before ",e.jsx(n,{children:"is Animal"})," when both could match."]})}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Single evaluation."}),` The scrutinee is evaluated once and stored in a temporary
compiler variable. Case patterns are compared against that stored value, so side effects in the
scrutinee expression do not repeat.`]})}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Constant patterns and custom equality."}),` Constant patterns are compared using
equality. For primitive types the compiler emits a direct comparison. For non-primitive value types
whose pattern type equals the scrutinee type, the compiler resolves a custom`," ",`
`,e.jsx(n,{children:"operator =="})," if one exists."]})}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Type patterns do not match null."})," An ",e.jsx(n,{children:"is Type"})," or"," ",`
`,e.jsx(n,{children:"is Type varName"})," pattern treats ",e.jsx(n,{children:"null"}),` as a
non-matching value and continues to the next case.`]})}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Scope of the binding variable."})," A variable introduced by"," ",`
`,e.jsx(n,{children:"is Type varName"}),` is scoped to its case body only. It is not visible in
other cases or after the `,e.jsx(n,{children:"switch"})," statement."]})}),`
`,e.jsx(a,{children:"Examples"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Matching an integer code."})}),`
`,e.jsx(l,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  day: int = 2;

  switch (day)
  {
      case 1:
      {
          println("Monday");
          break;
      }

      case 2:
      {
          println("Tuesday");
          break;
      }

      case 3:
      {
          println("Wednesday");
          break;
      }

      default:
      {
          println("Weekend");
          break;
      }
  }
}`,language:"csharp",filename:"switch_statement_int.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Matching with type patterns."})}),`
`,e.jsx(l,{code:`using stdio;

namespace demo;

public class Animal
{
  public func Speak() -> void
  {
      println("...");
  }
}

public class Dog : Animal
{
  public func Bark() -> void
  {
      println("woof");
  }
}

public class Cat : Animal
{
  public func Meow() -> void
  {
      println("meow");
  }
}

public static func MakeSound(animal: Animal) -> void
{
  switch (animal)
  {
      case is Dog dog:
      {
          dog.Bark();
          break;
      }

      case is Cat cat:
      {
          cat.Meow();
          break;
      }

      default:
      {
          animal.Speak();
          break;
      }
  }
}`,language:"csharp",filename:"switch_statement_is_pattern.shard"}),`
`,e.jsx(a,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx(n,{children:"syntax/switch-expressions"}),` — expression-oriented pattern matching that
returns a value.`]})}),e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx(n,{children:"syntax/conditionals"})," — ",e.jsx(n,{children:"if"})," and"," ",`
`,e.jsx(n,{children:"unless"})," statements for boolean branching."]})})]}),`
`,e.jsx(a,{children:"Source"}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:["Parsing and binding live in ",e.jsx(n,{children:"ShardScript/src/parsing/SourceParser.cpp"})," and"," ",`
`,e.jsx(n,{children:"ShardScript/src/semantic/ExpressionBinder.cpp"}),". Bytecode emission is in"," ",`
`,e.jsx(n,{children:"ShardScript/src/compilation/AbstractEmiter.cpp"}),"."]})})]})}function p(i={}){const{wrapper:s}=i.components||{};return s?e.jsx(s,{...i,children:e.jsx(d,{...i})}):d(i)}function c(i,s){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
