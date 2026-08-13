import{j as e}from"./index-DLc5xCYN.js";function h(a){const r={p:"p",...a.components},{Bullet:t,Callout:l,CodeBlock:c,DocsTable:d,H2:i,InlineCode:n,Prose:s}=r;return t||o("Bullet"),l||o("Callout"),c||o("CodeBlock"),d||o("DocsTable"),i||o("H2"),n||o("InlineCode"),s||o("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(i,{children:"Summary"}),`
`,e.jsx(s,{children:e.jsx(r.p,{children:`ShardScript resolves expressions according to a fixed precedence table. Operators with higher
precedence bind tighter than operators with lower precedence. When operators share the same
precedence, they associate left-to-right except for exponentiation, which associates
right-to-left. Parentheses override precedence entirely.`})}),`
`,e.jsx(i,{children:"Syntax"}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:[`The precedence table below is taken directly from the parser. Higher numbers bind tighter. Range
operators (`,e.jsx(n,{children:".."}),", ",e.jsx(n,{children:"..&"}),`), null-coalescing
(`,e.jsx(n,{children:"??"}),"), and the conditional operator (",e.jsx(n,{children:"? :"}),`) are shown
for completeness even though they are documented in detail on other pages.`]})}),`
`,e.jsx(d,{headers:["Precedence","Operators","Associativity","Notes"],rows:[["11",e.jsx(n,{children:"++ -- ! +x -x await"}),"left-to-right","Postfix/prefix increment, decrement, unary plus/minus, logical NOT"],["10",e.jsx(n,{children:"^"}),"right-to-left","Exponentiation (not bitwise XOR)"],["9",e.jsx(n,{children:"* / %"}),"left-to-right","Multiplication, division, modulo"],["8",e.jsx(n,{children:"+ -"}),"left-to-right","Addition and subtraction; + also concatenates strings"],["7",e.jsx(n,{children:"<< >> .. ..&"}),"left-to-right","Bit shifts and range operators"],["6",e.jsx(n,{children:"< <= > >="}),"left-to-right","Ordering comparisons"],["5",e.jsx(n,{children:"== != is as"}),"left-to-right","Equality and type tests"],["4",e.jsx(n,{children:"& and &&"}),"left-to-right","Bitwise AND or logical AND"],["3",e.jsx(n,{children:"| or ||"}),"left-to-right","Bitwise OR or logical OR"],["2",e.jsx(n,{children:"?? ? :"}),"right-to-left","Null-coalescing and conditional"],["1",e.jsx(n,{children:"= += -= *= /= %= ^= &= |="}),"right-to-left","Assignment and compound assignment"]]}),`
`,e.jsx(i,{children:"Parameters / Arguments"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Operand count."}),` Unary operators take one operand.
Binary operators take a left and a right operand. Assignment operators require a modifiable
lvalue on the left.`]})}),e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Operand evaluation."}),` Operands are evaluated
left-to-right regardless of operator precedence. Precedence only determines how the results are
combined.`]})}),e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Parentheses."}),` Any expression may be wrapped in
parentheses to force a specific grouping. Parenthesized subexpressions are evaluated before the
surrounding expression uses their value.`]})})]}),`
`,e.jsx(i,{children:"Returns"}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:[`Precedence rules determine the shape of the expression tree, not the final value. The result type
of an expression depends on the operators involved and is documented on the`," ",`
`,e.jsx(n,{children:"operators"})," reference page."]})}),`
`,e.jsx(i,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Invalid assignment target"}),` — The left side of an
assignment operator must be a variable, field, property, or indexer expression.`]})}),e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Operator not defined"}),` — Applying an operator to a
user-defined type that has no matching `,e.jsx(n,{children:"operator"}),` overload produces a
compile error, regardless of precedence.`]})}),e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Runtime errors from grouped subexpressions"}),` —
Precedence may change which subexpression runs first, but each subexpression is still subject to
its own runtime errors such as division by zero.`]})})]}),`
`,e.jsx(i,{children:"Remarks"}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Exponentiation associativity."})," ",e.jsx(n,{children:"^"}),` is the only arithmetic
operator that associates right-to-left. `,e.jsx(n,{children:"2 ^ 3 ^ 2"})," is parsed as"," ",`
`,e.jsx(n,{children:"2 ^ (3 ^ 2)"}),", which equals 512, not 64."]})}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Bitwise and logical sharing."})," ",e.jsx(n,{children:"&"})," and"," ",`
`,e.jsx(n,{children:"|"})," serve double duty: with ",e.jsx(n,{children:"bool"}),` operands they act
as logical AND/OR, and with integral operands they act as bitwise AND/OR. The keyword forms`," ",`
`,e.jsx(n,{children:"and"}),", ",e.jsx(n,{children:"or"}),", and ",e.jsx(n,{children:"not"}),` produce
the same tokens as `,e.jsx(n,{children:"&"}),", ",e.jsx(n,{children:"|"}),", and"," ",`
`,e.jsx(n,{children:"!"}),"."]})}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"No short-circuiting logical operators."}),` ShardScript does not have separate
short-circuiting `,e.jsx(n,{children:"&&"})," / ",e.jsx(n,{children:"||"}),` operators; even
when you type `,e.jsx(n,{children:"&&"})," or ",e.jsx(n,{children:"||"}),`, both operands are
always evaluated. Do not rely on the right-hand side being skipped.`]})}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Compound assignment status."})," Compound assignment operators (",e.jsx(n,{children:`+= -= *= /=
%= ^= &= |=`}),`) are recognized by the lexer and parser, but the current VM emission
lowers them as a plain assignment of the right-hand side. Until this is fixed, expand them manually
— for example, write `,e.jsx(n,{children:"x = x + 1"})," instead of ",e.jsx(n,{children:"x += 1"}),"."]})}),`
`,e.jsx(l,{tone:"blue",children:e.jsx(r.p,{children:`Use parentheses whenever the precedence is not immediately obvious. Parentheses are cheap and make
intent explicit; they do not affect generated-code quality.`})}),`
`,e.jsx(i,{children:"Examples"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Arithmetic precedence without parentheses."})}),`
`,e.jsx(c,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  // Multiplication binds tighter than addition.
  println(2 + 3 * 4);      // 14, not 20

  // Exponentiation binds tighter than multiplication.
  println(2 * 3 ^ 2);      // 18 (3^2 == 9, then *2)

  // Exponentiation is right-associative.
  println(2 ^ 3 ^ 2);      // 512 (3^2 == 9, then 2^9)
}`,language:"csharp",filename:"arithmetic_precedence.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Using parentheses to override precedence."})}),`
`,e.jsx(c,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  // Parentheses force the addition first.
  println((2 + 3) * 4);    // 20

  // Parentheses make the exponentiation explicit.
  println((2 ^ 3) ^ 2);    // 64 (2^3 == 8, then 8^2)
}`,language:"csharp",filename:"parentheses.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Comparison and arithmetic precedence."})}),`
`,e.jsx(c,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  // Comparison has lower precedence than arithmetic.
  result: bool = 1 + 2 < 4;
  println(result);         // true

  // The following is parsed as (a + b) == c, which is false.
  a: int = 1;
  b: int = 2;
  c: int = 4;
  println(a + b == c);     // false
}`,language:"csharp",filename:"comparison_precedence.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Logical and bitwise operators share precedence levels."})}),`
`,e.jsx(c,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  // Bitwise AND binds tighter than OR.
  println(12 | 10 & 8);    // 12 (10 & 8 == 8, then 12 | 8)

  // Both operands are evaluated: side effects always run.
  x: int = 0;
  a: bool = true;
  b: bool = false;

  if (a and b)
  {
      x = 1;
  }

  println(x);              // 0 because b is false
}`,language:"csharp",filename:"logical_precedence.shard"}),`
`,e.jsx(i,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"operators"})," — full operator semantics, type rules, and return types."]})}),e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"implicit-conversions"}),` — how operands are promoted before operators are
applied.`]})}),e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"operator-overloading"})," — defining custom operators on classes and structs."]})})]}),`
`,e.jsx(i,{children:"Source"}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:[`Operator precedence is encoded in the recursive-descent expression parser. The relevant grammar
lives in `,e.jsx(n,{children:"ShardScript/src/compiler/Parser.cpp"}),"."]})})]})}function x(a={}){const{wrapper:r}=a.components||{};return r?e.jsx(r,{...a,children:e.jsx(h,{...a})}):h(a)}function o(a,r){throw new Error("Expected component `"+a+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
