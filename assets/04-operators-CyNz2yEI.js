import{j as e}from"./index-hFDFiLgA.js";function h(o){const r={p:"p",...o.components},{Bullet:s,Callout:c,CodeBlock:a,DocsTable:d,H2:t,InlineCode:n,Prose:i}=r;return s||l("Bullet"),c||l("Callout"),a||l("CodeBlock"),d||l("DocsTable"),t||l("H2"),n||l("InlineCode"),i||l("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:"Summary"}),`
`,e.jsx(i,{children:e.jsxs(r.p,{children:[`ShardScript provides built-in operators for arithmetic, bitwise, logical, comparison,
assignment, and exponentiation. The compiler resolves expressions according to a fixed
precedence table and falls back to user-defined `,e.jsx(n,{children:"operator"}),` methods
when the left-hand type does not support an operator natively.`]})}),`
`,e.jsx(t,{children:"Syntax"}),`
`,e.jsx(i,{children:e.jsx(r.p,{children:`Operators are written infix, prefix, or postfix depending on the operator. The following
table groups every operator by purpose.`})}),`
`,e.jsx(d,{headers:["Category","Operators","Description"],rows:[["Arithmetic",e.jsx(n,{children:"+ - * / % ^"}),"Add, subtract, multiply, divide, modulo, exponentiate"],["Bitwise",e.jsx(n,{children:"& | << >>"}),"AND, OR, left shift, right shift on integral types"],["Logical",e.jsx(n,{children:"! & | and or not"}),"NOT, AND, OR on bool values"],["Comparison",e.jsx(n,{children:"== != < > <= >="}),"Equality and ordering"],["Assignment",e.jsx(n,{children:"= += -= *= /= %= ^= &= |="}),"Simple and compound assignment"]]}),`
`,e.jsx(i,{children:e.jsxs(r.p,{children:[`The precedence table below is taken directly from the parser. Higher numbers bind tighter.
Range (`,e.jsx(n,{children:".."}),", ",e.jsx(n,{children:"..&"}),`), null-coalescing
(`,e.jsx(n,{children:"??"}),"), and the conditional operator (",e.jsx(n,{children:"? :"}),`)
are shown for context even though they are covered on other pages.`]})}),`
`,e.jsx(d,{headers:["Precedence","Operators","Notes"],rows:[["11",e.jsx(n,{children:"++ -- ! +x -x await"}),"Postfix/prefix increment, decrement, unary plus/minus, logical NOT"],["10",e.jsx(n,{children:"^"}),"Exponentiation (not bitwise XOR)"],["9",e.jsx(n,{children:"* / %"}),"Multiplication, division, modulo"],["8",e.jsx(n,{children:"+ -"}),"Addition and subtraction; + also concatenates strings"],["7",e.jsx(n,{children:"<< >> .. ..&"}),"Bit shifts and range operators"],["6",e.jsx(n,{children:"< <= > >="}),"Ordering comparisons"],["5",e.jsx(n,{children:"== != is as"}),"Equality and type tests"],["4",e.jsx(n,{children:"& and &&"}),"Bitwise AND or logical AND"],["3",e.jsx(n,{children:"| or ||"}),"Bitwise OR or logical OR"],["2",e.jsx(n,{children:"?? ? :"}),"Null-coalescing and conditional"],["1",e.jsx(n,{children:"= += -= *= /= %= ^= &= |="}),"Assignment and compound assignment"]]}),`
`,e.jsx(t,{children:"Parameters / Arguments"}),`
`,e.jsx(i,{children:e.jsx(r.p,{children:`Binary operators take a left and a right operand. Unary operators take a single operand.
The compiler checks the operand types during semantic analysis.`})}),`
`,e.jsx(d,{headers:["Operator","Left Operand","Right Operand","Type Rules"],rows:[[e.jsx(n,{children:"+"}),"numeric or string","numeric or string","If either side is string, concatenates; if either side is double, result is double; otherwise int."],[e.jsx(n,{children:"- *"}),"numeric","numeric","double if any operand is double, otherwise int."],[e.jsx(n,{children:"/"}),"numeric","numeric","double if any operand is double; otherwise int division truncates toward zero."],[e.jsx(n,{children:"%"}),"numeric","numeric","int remainder for int operands; std::fmod for double operands."],[e.jsx(n,{children:"^"}),"numeric","numeric","Raises left to the power of right using std::pow; int result truncates."],[e.jsx(n,{children:"& |"}),"bool or integral","bool or integral","bool operands yield logical AND/OR; integral operands yield bitwise AND/OR."],[e.jsx(n,{children:"<< >>"}),"integral","integral","Shifts the left operand by the right operand."],[e.jsx(n,{children:"== !="}),"primitive, string, or reference","primitive, string, or reference","Compares value for primitives/strings; reference identity for reference types."],[e.jsx(n,{children:"< <= > >="}),"numeric, string, or bool","numeric, string, or bool","Ordering comparison; both operands must be the same comparable kind."],[e.jsx(n,{children:"="}),"lvalue","expression","Right-hand type must be assignable to the left-hand type."]]}),`
`,e.jsx(i,{children:"The unary operators take a single operand:"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"!value"})," / ",e.jsx(n,{children:"not value"})," — operand must be"," ",`
`,e.jsx(n,{children:"bool"}),"; returns ",e.jsx(n,{children:"bool"}),"."]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"+value"})," / ",e.jsx(n,{children:"-value"})," — operand must be numeric;"," ",`
`,e.jsx(n,{children:"-"})," negates, ",e.jsx(n,{children:"+"})," is a no-op for sign clarity."]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"++value"})," / ",e.jsx(n,{children:"--value"})," / ",e.jsx(n,{children:"value++"})," ",`
/ `,e.jsx(n,{children:"value--"})," — operand must be a numeric lvalue; mutates the variable."]})})]}),`
`,e.jsx(t,{children:"Returns"}),`
`,e.jsx(d,{headers:["Operator","Return Type"],rows:[[e.jsx(n,{children:"+ - * / %"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"int"})," if both operands are integral; otherwise ",e.jsx(n,{children:"double"}),". ",e.jsx(n,{children:"+"})," returns ",e.jsx(n,{children:"string"})," when either operand is ",e.jsx(n,{children:"string"}),"."]})],[e.jsx(n,{children:"^"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"double"})," if either operand is ",e.jsx(n,{children:"double"}),"; otherwise ",e.jsx(n,{children:"int"})," (truncated)."]})],[e.jsx(n,{children:"& |"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"bool"})," for bool operands; ",e.jsx(n,{children:"int"})," for integral operands."]})],[e.jsx(n,{children:"<< >>"}),"int."],[e.jsx(n,{children:"== != < <= > >="}),"bool."],[e.jsx(n,{children:"= += -= *= /= %= ^= &= |="}),"The type of the left-hand lvalue."]]}),`
`,e.jsx(t,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Compile-time type mismatch"})," — Adding a"," ",`
`,e.jsx(n,{children:"string"})," to a ",e.jsx(n,{children:"bool"}),", shifting a"," ",`
`,e.jsx(n,{children:"double"}),`, or applying a numeric operator to a non-numeric type fails
semantic analysis.`]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Operator not defined"}),` — Applying an operator to a
user-defined type that has no matching `,e.jsx(n,{children:"operator"}),` overload produces a
compile error.`]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Invalid assignment target"})," — The left side of"," ",`
`,e.jsx(n,{children:"="})," must be a variable, field, property, or indexer expression."]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"DivideByZeroException"}),` — Integer, character, byte,
native-pointer, and enum division or modulo with a zero divisor throws`," ",`
`,e.jsx(n,{children:"DivideByZeroException"}),`. Floating-point division by zero does not throw;
it follows IEEE-754 rules and may produce infinity.`]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Null operand"}),` — Performing a primitive operation on
a `,e.jsx(n,{children:"null"})," reference throws at runtime."]})})]}),`
`,e.jsx(t,{children:"Remarks"}),`
`,e.jsx(i,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Integer versus double division."})," When both operands of ",e.jsx(n,{children:"/"})," ",`
are `,e.jsx(n,{children:"int"}),", ",e.jsx(n,{children:"char"}),", ",e.jsx(n,{children:"byte"}),", or"," ",`
`,e.jsx(n,{children:"nint"}),", the result is an ",e.jsx(n,{children:"int"}),` and the fractional part
is discarded. The truncation follows C++ integer division semantics (toward zero). If either
operand is a `,e.jsx(n,{children:"double"}),`, the operation is performed in floating point and the
full result is kept.`]})}),`
`,e.jsx(i,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Bitwise and logical sharing."})," ",e.jsx(n,{children:"&"})," and"," ",`
`,e.jsx(n,{children:"|"})," serve double duty: with ",e.jsx(n,{children:"bool"}),` operands they act as
logical AND/OR, and with integral operands they act as bitwise AND/OR. The keyword forms`," ",`
`,e.jsx(n,{children:"and"}),", ",e.jsx(n,{children:"or"}),", and ",e.jsx(n,{children:"not"}),` produce the
same tokens as `,e.jsx(n,{children:"&"}),", ",e.jsx(n,{children:"|"}),", and ",e.jsx(n,{children:"!"}),`.
ShardScript does not have separate short-circuiting `,e.jsx(n,{children:"&&"})," /"," ",`
`,e.jsx(n,{children:"||"})," operators; even when you type ",e.jsx(n,{children:"&&"})," or"," ",`
`,e.jsx(n,{children:"||"}),", both operands are always evaluated."]})}),`
`,e.jsx(i,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Exponentiation."})," ",e.jsx(n,{children:"^"}),` raises the left operand to the right
operand. It is `,e.jsx("em",{children:"not"})," bitwise XOR. The VM uses ",e.jsx(n,{children:"std::pow"}),` internally.
When both operands are integral, the floating-point result is truncated to `,e.jsx(n,{children:"int64"}),`,
so negative bases with fractional exponents produce implementation-defined values.`]})}),`
`,e.jsx(i,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"String concatenation."})," When either operand of ",e.jsx(n,{children:"+"})," is a"," ",`
`,e.jsx(n,{children:"string"}),`, the other operand is converted to a string and the two are
concatenated. This is a convenience for small, ad-hoc output; prefer`," ",`
`,e.jsx(n,{children:"strings.Format"})," for templates."]})}),`
`,e.jsx(i,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Operator overloading."}),` You can define operators on your own classes and structs
by declaring a static `,e.jsx(n,{children:"operator"}),` method whose parameter types match the
operands. Resolution is based on the left-hand type and requires an exact parameter-type match.
Binary overloads take two parameters; unary overloads take one.`]})}),`
`,e.jsx(c,{tone:"blue",children:e.jsxs(r.p,{children:["Overloadable operators include ",e.jsx(n,{children:"+ - * / % ^"}),","," ",`
`,e.jsx(n,{children:"& | << >>"}),", ",e.jsx(n,{children:"== != < <= > >="}),`,
and the unary operators `,e.jsx(n,{children:"! ++ --"}),". Conversion-style operators use"," ",`
`,e.jsx(n,{children:"operator as"})," and member access uses ",e.jsx(n,{children:"operator ."}),"."]})}),`
`,e.jsx(i,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Increment and decrement."})," Prefix form (",e.jsx(n,{children:"++x"}),","," ",`
`,e.jsx(n,{children:"--x"}),`) mutates the variable and yields the new value. Postfix form
(`,e.jsx(n,{children:"x++"}),", ",e.jsx(n,{children:"x--"}),`) yields the original value and then
mutates the variable. The operand must be a numeric lvalue.`]})}),`
`,e.jsx(i,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Evaluation order."}),` Operands are evaluated left to right. Use parentheses to make
precedence explicit and to avoid subtle ordering bugs with mixed arithmetic and comparison
operators.`]})}),`
`,e.jsx(c,{tone:"amber",title:"Compound assignment status",children:e.jsxs(r.p,{children:["Compound assignment operators (",e.jsx(n,{children:"+= -= *= /= %= ^= &= |="}),`) are recognized by
the lexer and parser, but the current VM emission lowers them as a plain assignment of the
right-hand side. Until this is fixed, expand them manually — for example, write`," ",`
`,e.jsx(n,{children:"x = x + 1"})," instead of ",e.jsx(n,{children:"x += 1"}),"."]})}),`
`,e.jsx(t,{children:"Examples"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Arithmetic and integer-vs-double division."})}),`
`,e.jsx(a,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  a: int = 7;
  b: int = 2;

  println(a + b);          // 9
  println(a - b);          // 5
  println(a * b);          // 14
  println(a / b);          // 3  (integer division truncates toward zero)
  println(a % b);          // 1
  println(2 ^ 10);         // 1024

  // A double operand forces floating-point division.
  println(7.0 / 2);        // 3.5

  // Negation with unary minus.
  println(-a);             // -7
}`,language:"csharp",filename:"arithmetic.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Bitwise and logical operators."})}),`
`,e.jsx(a,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  // Bitwise on integers.
  println(12 & 10);        // 8   (1100 & 1010)
  println(12 | 10);        // 14  (1100 | 1010)
  println(1 << 4);         // 16
  println(256 >> 2);       // 64

  // Logical on booleans.
  a: bool = true;
  b: bool = false;

  println(!a);             // false
  println(a and b);        // false
  println(a or b);         // true

  // Both sides are always evaluated: no short-circuit.
  // Guarding against side effects requires an explicit if statement.
  if (a)
  {
      println("a is true");
  }
}`,language:"csharp",filename:"bitwise_logical.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Comparisons and string equality."})}),`
`,e.jsx(a,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  x: int = 5;
  y: int = 10;

  println(x < y);          // true
  println(x == y);         // false
  println(x >= 5);         // true

  // String comparison uses value equality.
  left: string  = "shard";
  right: string = "shard";
  println(left == right);  // true

  // Reference types compare by identity unless an operator is overloaded.
  a: object = new object();
  b: object = a;
  println(a == b);         // true
}`,language:"csharp",filename:"comparison.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Assignment and compound assignment."})}),`
`,e.jsx(a,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  count: int = 10;

  // Simple assignment.
  count = 20;
  println(count);          // 20

  // Compound assignment syntax is recognized, but the VM currently emits
  // only a plain assignment. Use explicit expansion for correct behavior.
  count = count + 5;
  println(count);          // 25

  count = count * 2;
  println(count);          // 50

  // Bitwise compound assignment is also written the same way.
  flags: int = 1;
  flags = flags | 4;       // set the third bit
  println(flags);          // 5
}`,language:"csharp",filename:"assignment.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Operator overloading."})}),`
`,e.jsx(a,{code:`using stdio;

namespace demo;

public class Vector2
{
  public X: double;
  public Y: double;

  public init(x: double, y: double)
  {
      this.X = x;
      this.Y = y;
  }

  // Overload + so two Vector2 values add component-wise.
  public static operator +(a: Vector2, b: Vector2) -> Vector2
  {
      return new Vector2(a.X + b.X, a.Y + b.Y);
  }
}

public static func Main() -> void
{
  v1: Vector2 = new Vector2(1.0, 2.0);
  v2: Vector2 = new Vector2(3.0, 4.0);
  sum: Vector2 = v1 + v2;

  println(sum.X);          // 4.0
  println(sum.Y);          // 6.0
}`,language:"csharp",filename:"operator_overload.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Precedence, parentheses, and edge cases."})}),`
`,e.jsx(a,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  // Without parentheses, multiplication binds tighter than addition.
  println(2 + 3 * 4);      // 14, not 20

  // Use parentheses to make intent explicit.
  println((2 + 3) * 4);    // 20

  // Comparison has lower precedence than arithmetic.
  result: bool = 1 + 2 < 4;
  println(result);         // true

  // Power binds tighter than multiplication.
  println(2 * 3 ^ 2);      // 18 (3^2 == 9, then *2)

  // Integer division truncates toward zero for negatives too.
  println(-7 / 2);         // -3

  // Modulo follows the dividend's sign in this implementation.
  println(-7 % 3);         // -1

  // Integer division by zero throws DivideByZeroException.
  // println(1 / 0);          // throws
}`,language:"csharp",filename:"precedence.shard"}),`
`,e.jsx(t,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"Primitive Types"})," — the types that operands may have."]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"Operator Overloading"})," — defining custom operators on classes and structs."]})}),e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"switch Expressions"})," — using ",e.jsx(n,{children:"is"})," and ",e.jsx(n,{children:"as"})," ",`
for type tests.`]})})]}),`
`,e.jsx(t,{children:"Source"}),`
`,e.jsx(i,{children:e.jsxs(r.p,{children:["Operator resolution and primitive math execution are implemented in"," ",`
`,e.jsx(n,{children:"ShardScript/src/runtime/VirtualMachine.cpp"})," and"," ",`
`,e.jsx(n,{children:"ShardScript/src/runtime/PrimitiveMathModule.cpp"}),"."]})})]})}function x(o={}){const{wrapper:r}=o.components||{};return r?e.jsx(r,{...o,children:e.jsx(h,{...o})}):h(o)}function l(o,r){throw new Error("Expected component `"+o+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
