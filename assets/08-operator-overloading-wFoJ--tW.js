import{j as e}from"./index-DbX8E4-q.js";function p(s){const n={em:"em",p:"p",...s.components},{Bullet:i,Callout:d,CodeBlock:a,DocsTable:l,H2:o,InlineCode:r,Prose:t}=n;return i||c("Bullet"),d||c("Callout"),a||c("CodeBlock"),l||c("DocsTable"),o||c("H2"),r||c("InlineCode"),t||c("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(o,{children:"Summary"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:["ShardScript lets a class or struct redefine the behavior of built-in operators by declaring"," ",`
`,e.jsx(r,{children:"operator"}),` members. Overloaded operators are resolved at compile time using
the static types of their operands, and they follow the same visibility and linking rules as
methods.`]})}),`
`,e.jsx(o,{children:"Syntax"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:["An operator member is declared inside a class or struct with the"," ",`
`,e.jsx(r,{children:"operator"}),` keyword, an operator token, a parameter list, an arrow return
type, and a body:`]})}),`
`,e.jsx(a,{code:`public class Vector2
{
  public x: int;
  public y: int;

  public init(x: int, y: int)
  {
      this.x = x;
      this.y = y;
  }

  public static operator +(a: Vector2, b: Vector2) -> Vector2
  {
      return new Vector2(a.x + b.x, a.y + b.y);
  }
}`,language:"csharp",filename:"operator_overload_syntax.shard"}),`
`,e.jsx(l,{headers:["Operator category","Declaration form","Parameter count"],rows:[["Binary arithmetic and bitwise",e.jsxs(e.Fragment,{children:[e.jsx(r,{children:"public static operator "}),e.jsx(n.em,{children:"op"}),e.jsx(r,{children:"(left: T, right: U) -> R"})]}),"2"],["Unary",e.jsxs(e.Fragment,{children:[e.jsx(r,{children:"public static operator "}),e.jsx(n.em,{children:"op"}),e.jsx(r,{children:"(operand: T) -> R"})]}),"1"],["Comparison",e.jsxs(e.Fragment,{children:[e.jsx(r,{children:"public static operator "}),e.jsx(n.em,{children:"op"}),e.jsx(r,{children:"(left: T, right: U) -> bool"})]}),"2"],["Conversion",e.jsx(e.Fragment,{children:e.jsx(r,{children:"public static operator as(source: T) -> U"})}),"1"],["Access (delimiter)",e.jsx(e.Fragment,{children:e.jsx(r,{children:"public operator .(name: string) -> R"})}),"1"]]}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Overloadable operators."}),` The compiler accepts the following operator tokens in an
operator declaration:`]})}),`
`,e.jsx(l,{headers:["Category","Operators"],rows:[["Arithmetic","+, -, *, /, %, **"],["Compound assignment","+=, -=, *=, /=, %=, **="],["Bitwise / shift","|, &, |=, &=, >>, <<"],["Comparison","==, !=, >, >=, <, <="],["Unary","++, --, !"],["Conversion","as"],["Access","."]]}),`
`,e.jsx(o,{children:"Parameters / Arguments"}),`
`,e.jsx(l,{headers:["Parameter","Type","Description"],rows:[[e.jsxs(e.Fragment,{children:[e.jsx(n.em,{children:"left"})," / ",e.jsx(n.em,{children:"operand"})," / ",e.jsx(n.em,{children:"source"})]}),"Any declared type","The first operand. For binary operators this is the left-hand side. For conversion operators it is the value being converted."],[e.jsx(e.Fragment,{children:e.jsx(n.em,{children:"right"})}),"Any declared type","The right-hand side of a binary operator."],[e.jsxs(e.Fragment,{children:[e.jsx(n.em,{children:"name"})," (access operator)"]}),"string","The identifier that appears after the dot in a member-access expression."]]}),`
`,e.jsx(o,{children:"Returns"}),`
`,e.jsx(l,{headers:["Operator","Return type convention","Description"],rows:[["Arithmetic / bitwise","User-defined","Typically the same type as the operands, but any type is allowed."],["Unary","User-defined","The result of applying the operator to the single operand."],["Comparison","bool","Comparison operators conventionally return bool, matching built-in comparisons."],["as","The target type","Returns a value of the type named in the cast expression."],[".","User-defined","The value produced by the access expression."]]}),`
`,e.jsx(o,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Must be declared inside a type"}),` — Operator overloads
can only appear as members of a class or struct. Namespace-level operator declarations are not
allowed.`]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Must be public"}),` — The compiler reports an error if
an operator overload is not declared `,e.jsx(r,{children:"public"}),"."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Most operators must be static"}),` — Arithmetic,
bitwise, comparison, unary, and conversion operators must use `,e.jsx(r,{children:"static"}),`. The
access operator `,e.jsx(r,{children:"."})," is the only operator that may be an instance member."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Cannot overload operators in static types"}),` — A
static class or struct cannot declare operator overloads, except for the access operator.`]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Wrong parameter count"}),` — Binary operators require
exactly two parameters; unary operators and `,e.jsx(r,{children:"as"}),` require exactly one. The
access operator requires exactly one `,e.jsx(r,{children:"string"})," parameter."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Must have a body"}),` — Abstract or extern operator
overloads are not supported.`]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Non-overloadable token"}),` — Using a token that is not
in the overloadable set, such as `,e.jsx(r,{children:"operator ="})," or"," ",`
`,e.jsx(r,{children:"operator &&"}),", fails during parsing."]})})]}),`
`,e.jsx(o,{children:"Remarks"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Resolution rules."}),` Operator overloads are selected using the compile-time types of
the operands. The compiler looks for an overload on the left-hand type whose parameter list matches
the operand types. If no match is found, it reports a semantic error rather than falling back to a
built-in operator.`]})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Static vs instance."})," All overloadable operators except ",e.jsx(r,{children:"."})," ",`
are static. This matches the design of most binary operators in ShardScript: the operands are passed
explicitly, and there is no implicit receiver. The access operator is instance because it is invoked
on a receiver expression such as `,e.jsx(r,{children:"obj.field"}),"."]})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Compound assignment."})," Overloading ",e.jsx(r,{children:"+="}),` does not automatically
provide `,e.jsx(r,{children:"+"}),`, and vice versa. Each compound-assignment operator is a separate
overload that is resolved independently.`]})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Conversion operator."})," ",e.jsx(r,{children:"operator as"}),` lets a type participate in
cast expressions. The return type of the operator is the type the compiler will treat the expression
as. Both narrowing and widening conversions can be expressed, but the operator is responsible for
producing a valid value of the target type.`]})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Access operator."})," ",e.jsx(r,{children:"operator ."}),` intercepts member access where
the member name is not a real declared field, property, or method. The identifier is passed as a
string, allowing dynamic dispatch based on the name. A type that declares this operator cannot also
declare public fields.`]})}),`
`,e.jsx(d,{tone:"blue",children:e.jsxs(n.p,{children:["Keep overloaded operators intuitive. Overloading ",e.jsx(r,{children:"+"}),` to mean something other
than addition-like combination, or overloading comparison operators inconsistently, makes code harder
to reason about.`]})}),`
`,e.jsx(d,{tone:"amber",title:"No short-circuiting logical operators",children:e.jsxs(n.p,{children:["The logical operators ",e.jsx(r,{children:"&&"})," and ",e.jsx(r,{children:"||"}),` are not
overloadable. The overloadable `,e.jsx(r,{children:"&"})," and ",e.jsx(r,{children:"|"}),` are
bitwise/combined operators and do not short-circuit.`]})}),`
`,e.jsx(o,{children:"Examples"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Binary arithmetic overload."})}),`
`,e.jsx(a,{code:`using stdio;

namespace demo;

public class Vector2
{
  public x: int;
  public y: int;

  public init(x: int, y: int)
  {
      this.x = x;
      this.y = y;
  }

  public static operator +(a: Vector2, b: Vector2) -> Vector2
  {
      return new Vector2(a.x + b.x, a.y + b.y);
  }

  public static operator -(a: Vector2, b: Vector2) -> Vector2
  {
      return new Vector2(a.x - b.x, a.y - b.y);
  }
}

public static func Main() -> void
{
  v1: Vector2 = new Vector2(1, 2);
  v2: Vector2 = new Vector2(3, 4);

  sum: Vector2 = v1 + v2;
  println(sum.x);   // 4
  println(sum.y);   // 6
}`,language:"csharp",filename:"operator_arithmetic.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Comparison overload."})}),`
`,e.jsx(a,{code:`using stdio;

namespace demo;

public class Box
{
  public value: int;

  public init(value: int)
  {
      this.value = value;
  }

  public static operator ==(a: Box, b: Box) -> bool
  {
      return a.value == b.value;
  }

  public static operator !=(a: Box, b: Box) -> bool
  {
      return a.value != b.value;
  }
}

public static func Main() -> void
{
  a: Box = new Box(5);
  b: Box = new Box(5);

  if (a == b)
  {
      println("equal");
  }
}`,language:"csharp",filename:"operator_comparison.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Unary overload."})}),`
`,e.jsx(a,{code:`using stdio;

namespace demo;

public class Vector2
{
  public x: int;
  public y: int;

  public init(x: int, y: int)
  {
      this.x = x;
      this.y = y;
  }

  public static operator !(v: Vector2) -> bool
  {
      return v.x == 0 && v.y == 0;
  }
}

public static func Main() -> void
{
  zero: Vector2 = new Vector2(0, 0);
  nonZero: Vector2 = new Vector2(1, 0);

  if (!zero)
  {
      println("zero vector");
  }

  if (!nonZero)
  {
      println("this will not print");
  }
}`,language:"csharp",filename:"operator_unary.shard"}),`
`,e.jsx(t,{children:e.jsxs("strong",{children:["Conversion with ",e.jsx(r,{children:"as"}),"."]})}),`
`,e.jsx(a,{code:`using stdio;

namespace demo;

public class Widget
{
  public name: string;

  public init(name: string)
  {
      this.name = name;
  }
}

public class Box
{
  public label: string;

  public init(label: string)
  {
      this.label = label;
  }

  public static operator as(w: Widget) -> Box
  {
      return new Box(w.name);
  }
}

public static func Main() -> void
{
  w: Widget = new Widget("main-widget");
  b: Box = w as Box;

  println(b.label);   // main-widget
}`,language:"csharp",filename:"operator_as.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Access operator for dynamic members."})}),`
`,e.jsx(a,{code:`using stdio;

namespace demo;

public class Dynamic
{
  public value: int;

  public init(value: int)
  {
      this.value = value;
  }

  public operator .(name: string) -> string
  {
      return name + ":" + this.value;
  }
}

public static func Main() -> void
{
  d: Dynamic = new Dynamic(42);
  println(d.foo);   // foo:42
  println(d.bar);   // bar:42
}`,language:"csharp",filename:"operator_access.shard"}),`
`,e.jsx(t,{children:e.jsxs("strong",{children:["Common mistake: omitting ",e.jsx(r,{children:"static"})," on a binary operator."]})}),`
`,e.jsx(a,{code:`using stdio;

namespace demo;

public class Box
{
  public value: int;

  public init(value: int)
  {
      this.value = value;
  }

  // WRONG: binary operators must be static.
  // public operator +(a: Box, b: Box) -> Box { ... }

  // CORRECT:
  public static operator +(a: Box, b: Box) -> Box
  {
      return new Box(a.value + b.value);
  }
}

public static func Main() -> void
{
  a: Box = new Box(1);
  b: Box = new Box(2);
  c: Box = a + b;

  println(c.value);   // 3
}`,language:"csharp",filename:"operator_static.shard"})]})}function x(s={}){const{wrapper:n}=s.components||{};return n?e.jsx(n,{...s,children:e.jsx(p,{...s})}):p(s)}function c(s,n){throw new Error("Expected component `"+s+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
