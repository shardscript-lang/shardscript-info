import{j as e}from"./index-BQw6jbtc.js";function h(r){const t={code:"code",p:"p",...r.components},{Bullet:c,Callout:d,CodeBlock:o,DocsTable:l,H2:i,InlineCode:n,Prose:s}=t;return c||a("Bullet"),d||a("Callout"),o||a("CodeBlock"),l||a("DocsTable"),i||a("H2"),n||a("InlineCode"),s||a("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(s,{children:e.jsxs(t.p,{children:["The ",e.jsx(n,{children:"shard.math"})," library provides a ",e.jsx("strong",{children:"static class"})," ",`
`,e.jsx(n,{children:"Math"})," in the ",e.jsx(n,{children:"math"})," namespace. All members are"," ",`
`,e.jsx(n,{children:"static"})," — no instance of ",e.jsx(n,{children:"Math"}),` is ever created.
Every function is a thin native wrapper over the C++ standard library (`,e.jsx(n,{children:"<cmath>"}),`),
operating on `,e.jsx(n,{children:"double"})," values throughout."]})}),`
`,e.jsx(o,{code:`using stdio;
using math;

namespace demo;

public static func Main() -> void
{
  // Static constants on the Math class.
  println(Math.PI);   // 3.141592653589793
  println(Math.E);    // 2.718281828459045

  // Basic arithmetic via built-in operators.
  a: int = 5;
  b: int = 3;
  println(a + b);     // 8
  println(a - b);     // 2
  println(a * b);     // 15
  println(a / b);     // 1  (integer division)
  println(a % b);     // 2  (modulo)
}`,language:"csharp",filename:"math_basic.shard"}),`
`,e.jsx(i,{children:"Constants"}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:["Two mathematical constants are available as ",e.jsx("strong",{children:"static read-only properties"}),":"]})}),`
`,e.jsx(l,{headers:["Property","Type","Approximate Value","Description"],rows:[[e.jsx(t.code,{children:"PI"}),"double","3.141592653589793...","Ratio of a circle's circumference to its diameter."],[e.jsx(t.code,{children:"E"}),"double","2.718281828459045...","Euler's number — base of the natural logarithm."]]}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:["Both constants are implemented as native getter callbacks that return pre-computed C++"," ",`
`,e.jsx(n,{children:"double"}),` literals. There is no allocation, no lookup — each access
is equivalent to a single native function call that pushes a 64-bit float onto the
evaluation stack.`]})}),`
`,e.jsx(i,{children:"Rounding Functions"}),`
`,e.jsx(s,{children:"Three rounding modes cover all common use cases:"}),`
`,e.jsx(l,{headers:["Method","Return","Description","C++ Backing"],rows:[[e.jsx(t.code,{children:"Ceil(value)"}),"double","Rounds up to the nearest integer.","std::ceil"],[e.jsx(t.code,{children:"Floor(value)"}),"double","Rounds down to the nearest integer.","std::floor"],[e.jsx(t.code,{children:"Round(value)"}),"double","Rounds to the nearest integer (halfway cases away from zero).","std::round"]]}),`
`,e.jsx(o,{code:`using stdio;
using math;

namespace demo;

public static func Main() -> void
{
  x: double = 3.7;
  y: double = -3.7;

  println(Math.Ceil(x));    // 4.0
  println(Math.Floor(x));   // 3.0
  println(Math.Round(x));   // 4.0

  println(Math.Ceil(y));    // -3.0
  println(Math.Floor(y));   // -4.0
  println(Math.Round(y));   // -4.0
}`,language:"csharp",filename:"math_rounding.shard"}),`
`,e.jsx(d,{tone:"blue",children:e.jsxs(t.p,{children:[e.jsx(n,{children:"Ceil"})," always rounds toward positive infinity."," ",`
`,e.jsx(n,{children:"Floor"})," always rounds toward negative infinity."," ",`
`,e.jsx(n,{children:"Round"})," follows IEEE 754 round-half-away-from-zero semantics."]})}),`
`,e.jsx(i,{children:"Absolute Value, Min & Max"}),`
`,e.jsx(l,{headers:["Method","Return","Description","C++ Backing"],rows:[[e.jsx(t.code,{children:"Abs(value)"}),"double","Absolute value — makes negative numbers positive.","std::abs"],[e.jsx(t.code,{children:"Min(a, b)"}),"double","Returns the smaller of two numbers.","std::fmin"],[e.jsx(t.code,{children:"Max(a, b)"}),"double","Returns the larger of two numbers.","std::fmax"]]}),`
`,e.jsx(o,{code:`using stdio;
using math;

namespace demo;

public static func Main() -> void
{
  println(Math.Abs(-42));        // 42.0
  println(Math.Abs(42));         // 42.0

  println(Math.Min(10, 20));     // 10.0
  println(Math.Max(10, 20));     // 20.0

  println(Math.Min(-5.5, -3.2));  // -5.5
  println(Math.Max(-5.5, -3.2));  // -3.2
}`,language:"csharp",filename:"math_abs_minmax.shard"}),`
`,e.jsx(i,{children:"Operator-Based Arithmetic"}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[`Basic arithmetic uses ShardScript's built-in operators rather than static methods.
These are not part of the `,e.jsx(n,{children:"shard.math"}),` library per se, but form
the foundation of all numeric computation:`]})}),`
`,e.jsx(l,{headers:["Operator","Semantics","For int","For double"],rows:[[e.jsx(t.code,{children:"+"}),"Addition","Integer sum","Floating-point sum"],[e.jsx(t.code,{children:"-"}),"Subtraction","Integer difference","Floating-point difference"],[e.jsx(t.code,{children:"*"}),"Multiplication","Integer product","Floating-point product"],[e.jsx(t.code,{children:"/"}),"Division","Integer division (truncates toward zero)","Floating-point division"],[e.jsx(t.code,{children:"%"}),"Modulo","Remainder (sign follows dividend)","Not directly applicable (use fmod via Math)"]]}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:["Integer division truncates toward zero. For floating-point remainder, use"," ",`
`,e.jsx(n,{children:"Math.Fmod"})," (not yet exposed in the ",e.jsx(n,{children:"Math"}),` class,
but the underlying C++ `,e.jsx(n,{children:"std::fmod"})," is available in the runtime)."]})}),`
`,e.jsx(i,{children:"Internal Mechanics"}),`
`,e.jsxs("div",{className:"space-y-5",children:[e.jsxs("div",{className:"bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-3",children:[e.jsx("span",{className:"inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold",children:"1"}),e.jsx("strong",{className:"text-text-primary text-sm",children:"Static Class, No Instances"})]}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"Math"})," is declared with ",e.jsx(n,{children:"LINK_STATIC"}),` —
the class itself is never instantiated. All methods are `,e.jsx(n,{children:"static"}),`
and receive no `,e.jsx(n,{children:"this"})," pointer. Calls compile to"," ",`
`,e.jsx(n,{children:"CALLSTATICMETHODSYMBOL"})," with the symbol resolved at compile time."]})})]}),e.jsxs("div",{className:"bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-3",children:[e.jsx("span",{className:"inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold",children:"2"}),e.jsx("strong",{className:"text-text-primary text-sm",children:"Native Callbacks (No Bytecode)"})]}),e.jsx(s,{children:e.jsxs(t.p,{children:["Every method is backed by a native C++ callback (",e.jsx(n,{children:"SetCallback"}),`).
There is no ShardScript bytecode for math functions — the VM dispatches directly to the
native function, which calls the corresponding `,e.jsx(n,{children:"std::"}),` function
from `,e.jsx(n,{children:"<cmath>"}),". The result is wrapped in an"," ",`
`,e.jsx(n,{children:"ObjectInstance"})," via ",e.jsx(n,{children:"FromValue"}),"."]})})]}),e.jsxs("div",{className:"bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-3",children:[e.jsx("span",{className:"inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold",children:"3"}),e.jsx("strong",{className:"text-text-primary text-sm",children:"Double Throughout"})]}),e.jsx(s,{children:e.jsxs(t.p,{children:["All math functions accept and return ",e.jsx(n,{children:"double"}),`. Integer arguments
are implicitly converted to `,e.jsx(n,{children:"double"})," at the call boundary via"," ",`
`,e.jsx(n,{children:"AsDouble()"}),". Results are always new ",e.jsx(n,{children:"double"})," ",`
instances on the GC heap — the small-int cache does not apply to floating-point values.`]})})]})]}),`
`,e.jsx(i,{children:"Category Summary: Basic Math"}),`
`,e.jsx(l,{headers:["Feature","Members"],rows:[["Constants","PI, E"],["Rounding","Ceil, Floor, Round"],["Absolute value","Abs"],["Min / Max","Min, Max"],["Arithmetic (operators)","+, -, *, /, %"]]}),`
`,e.jsx(i,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(c,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"Trigonometry & Logarithms"})," — advanced ",e.jsx(n,{children:"Math"})," functions."]})}),e.jsx(c,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"Random Number Generation"})," — the ",e.jsx(n,{children:"Random"})," static class."]})})]}),`
`,e.jsx(i,{children:"Source"}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:["The ",e.jsx(n,{children:"shard.math"})," implementation ships as part of"," ",`
`,e.jsx(n,{children:"ShardScript.Framework"}),". The native binding for ",e.jsx(n,{children:"Math.PI"}),","," ",`
`,e.jsx(n,{children:"Math.E"}),", ",e.jsx(n,{children:"Math.Abs"}),", ",e.jsx(n,{children:"Math.Min"}),","," ",`
`,e.jsx(n,{children:"Math.Max"}),", and the rounding functions is in"," ",`
`,e.jsx(n,{children:"ShardScript.Framework/system/math.shard.cpp"}),"."]})})]})}function u(r={}){const{wrapper:t}=r.components||{};return t?e.jsx(t,{...r,children:e.jsx(h,{...r})}):h(r)}function a(r,t){throw new Error("Expected component `"+r+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};
