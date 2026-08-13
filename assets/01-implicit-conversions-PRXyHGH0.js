import{j as e}from"./index-DLc5xCYN.js";function h(a){const t={p:"p",...a.components},{Bullet:r,Callout:c,CodeBlock:l,DocsTable:d,H2:s,InlineCode:n,Prose:i}=t;return r||o("Bullet"),c||o("Callout"),l||o("CodeBlock"),d||o("DocsTable"),s||o("H2"),n||o("InlineCode"),i||o("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(s,{children:"Summary"}),`
`,e.jsx(i,{children:e.jsxs(t.p,{children:[`ShardScript performs only a small set of implicit conversions. Most type changes — including
numeric widening, reference downcasts, and primitive reinterpretation — require an explicit
`,e.jsx(n,{children:"as"}),` cast. The compiler does allow implicit conversions in specific contexts:
literal typing, string concatenation, arithmetic operator promotion, array-to-interface
implementation, and a few special cases such as `,e.jsx(n,{children:"char"})," mixed with"," ",`
`,e.jsx(n,{children:"string"}),"."]})}),`
`,e.jsx(s,{children:"Syntax"}),`
`,e.jsx(i,{children:e.jsx(t.p,{children:`There is no special syntax for an implicit conversion; the compiler applies one automatically when
the source expression is assignable to the target type under the rules below.`})}),`
`,e.jsx(d,{headers:["Context","Source","Target","Result"],rows:[["Literal assignment","integer literal",e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"byte"})," or ",e.jsx(n,{children:"nint"})]}),"Literal is bound to the target type if the value fits."],["String concatenation","any primitive or reference",e.jsx(e.Fragment,{children:e.jsx(n,{children:"string"})}),"Non-string operand is converted to its string representation."],["Arithmetic operator","numeric value","wider numeric type","If either operand is double, the other is promoted to double; byte stays byte only when both operands are byte."],["Array type","any array",e.jsx(e.Fragment,{children:e.jsx(n,{children:"IEnumerable<T>"})}),"Every array type implicitly implements IEnumerable<T> with the same element type."],["Null reference",e.jsx(n,{children:"null"}),"any reference type","The null reference is assignable to any class, interface, array, or string variable."]]}),`
`,e.jsx(s,{children:"Parameters / Arguments"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Literal context."}),` When an integer literal appears
where the expected type is `,e.jsx(n,{children:"byte"})," or ",e.jsx(n,{children:"nint"}),`, the
compiler binds the literal to that type instead of `,e.jsx(n,{children:"int"}),`. The value must
still fit the target range.`]})}),e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"String concatenation."})," The"," ",`
`,e.jsx(n,{children:"+"}),` operator converts the non-string operand to a string when one side is
a `,e.jsx(n,{children:"string"}),". Both operands are evaluated."]})}),e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Arithmetic promotion."}),` Mixed numeric operands are
promoted according to operator rules: `,e.jsx(n,{children:"double"})," wins over"," ",`
`,e.jsx(n,{children:"int"})," and ",e.jsx(n,{children:"nint"}),"; ",e.jsx(n,{children:"int"}),` mixed
with `,e.jsx(n,{children:"nint"})," yields ",e.jsx(n,{children:"int"}),"; two"," ",`
`,e.jsx(n,{children:"byte"})," values stay ",e.jsx(n,{children:"byte"}),"."]})}),e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Reference compatibility."}),` A value of a derived
class is implicitly convertible to any base class or implemented interface. Interfaces are not
implicitly convertible to derived classes; that requires a cast.`]})})]}),`
`,e.jsx(s,{children:"Returns"}),`
`,e.jsx(i,{children:e.jsx(t.p,{children:`An implicit conversion produces a value of the target type without changing the source expression's
syntax. The conversion happens during semantic analysis or at the operator boundary; no explicit
cast operator is emitted.`})}),`
`,e.jsx(s,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Type mismatch in assignment"}),` — Assigning an
`,e.jsx(n,{children:"int"})," to a ",e.jsx(n,{children:"double"}),", a ",e.jsx(n,{children:"byte"})," ",`
to an `,e.jsx(n,{children:"int"}),`, or any other disallowed widening without a cast is a
compile-time error.`]})}),e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Literal out of range"}),` — A literal bound by
contextual typing must still fit the target type. `,e.jsx(n,{children:"b: byte = 256;"}),` fails
because 256 is outside the byte range.`]})}),e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Argument type mismatch"}),` — Function arguments do
not implicitly widen or narrow. The caller must supply the exact parameter type or use an
explicit cast.`]})}),e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"No implicit bool conversion"}),` — Numeric or
reference values are not implicitly convertible to `,e.jsx(n,{children:"bool"}),`. Conditions must
be explicit boolean expressions.`]})})]}),`
`,e.jsx(s,{children:"Remarks"}),`
`,e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Assignment is strict."}),` ShardScript deliberately avoids C-style numeric widening on
assignment. This keeps code explicit and prevents accidental loss of precision. If you need a
wider or narrower numeric type, write `,e.jsx(n,{children:"value as TargetType"}),"."]})}),`
`,e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Operator promotion is not assignment widening."}),` The promotion that happens for
arithmetic operators is a property of the operator, not the assignment. The result of the operator
still must match the type of the variable it is assigned to.`]})}),`
`,e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Contextual typing does not flow through arrays."}),` Array element contexts do not
currently propagate expected types, so a byte array literal usually requires explicit casts such
as `,e.jsx(n,{children:"[1 as byte, 2 as byte]"}),"."]})}),`
`,e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"String conversion is not universal."})," Only the ",e.jsx(n,{children:"+"}),` operator
automatically converts non-string operands to strings. Function parameters typed as`," ",`
`,e.jsx(n,{children:"string"})," do not accept integers implicitly."]})}),`
`,e.jsx(c,{tone:"blue",children:e.jsx(t.p,{children:`Prefer explicit casts when the intent is to change type. Implicit conversions are reserved for
cases where the target type is unambiguous and the conversion is lossless or expected by the
language, such as string concatenation or array enumeration.`})}),`
`,e.jsx(s,{children:"Examples"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Contextual literal typing."})}),`
`,e.jsx(l,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  // The literal is bound to byte/nint because the variable type says so.
  small: byte = 255;
  handle: nint = 0;

  println(small);          // 255
  println(handle);         // 0

  // Out-of-range literals are rejected even with contextual typing.
  // b: byte = 256;          // ERROR: literal out of range
}`,language:"csharp",filename:"contextual_typing.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"String concatenation promotion."})}),`
`,e.jsx(l,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  count: int = 42;

  // The int is implicitly converted to string by the + operator.
  message: string = "count: " + count;
  println(message);        // count: 42

  // This only works with +; a string parameter does not accept int.
  // PrintOnlyString(count); // ERROR: int is not assignable to string
}`,language:"csharp",filename:"string_concat.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Arithmetic operator promotion."})}),`
`,e.jsx(l,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  a: int = 7;
  b: double = 2.0;

  // a is promoted to double; result is double.
  result: double = a / b;
  println(result);         // 3.5

  // int division stays int; assignment to double would fail without a cast.
  truncated: int = 7 / 2;
  println(truncated);      // 3
}`,language:"csharp",filename:"arithmetic_promotion.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Reference upcasting."})}),`
`,e.jsx(l,{code:`using stdio;

namespace demo;

public class Animal
{
}

public class Dog : Animal
{
}

public static func Main() -> void
{
  dog: Dog = new Dog();

  // Implicit upcast to base class.
  animal: Animal = dog;
  println(animal != null); // true

  // Downcast requires an explicit cast.
  back: Dog = animal as Dog;
  println(back != null);   // true
}`,language:"csharp",filename:"reference_upcast.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Common mistake: expecting implicit numeric widening."})}),`
`,e.jsx(l,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  i: int = 10;

  // Invalid and commented out:
  // d: double = i;          // ERROR: int is not assignable to double
  // b: byte = 5;
  // j: int = b;             // ERROR: byte is not assignable to int

  // Correct: explicit cast.
  d: double = i as double;
  println(d);              // 10.0
}`,language:"csharp",filename:"no_widening.shard"}),`
`,e.jsx(s,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"primitive-types"})," — the scalar types involved in conversion rules."]})}),e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"operators"})," — operator promotion rules for mixed numeric operands."]})}),e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"type-inference"})," — how the compiler resolves local variable types."]})})]}),`
`,e.jsx(s,{children:"Source"}),`
`,e.jsx(i,{children:e.jsxs(t.p,{children:[`Conversion checks and operator promotion are implemented in the semantic binder and VM primitive
math module: `,e.jsx(n,{children:"ShardScript/src/compiler/SemanticAnalyzer.cpp"})," and"," ",`
`,e.jsx(n,{children:"ShardScript/src/runtime/PrimitiveMathModule.cpp"}),"."]})})]})}function x(a={}){const{wrapper:t}=a.components||{};return t?e.jsx(t,{...a,children:e.jsx(h,{...a})}):h(a)}function o(a,t){throw new Error("Expected component `"+a+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
