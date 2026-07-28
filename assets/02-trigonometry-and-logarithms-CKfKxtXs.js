import{j as e}from"./index-7OQU3gOS.js";function c(s){const t={code:"code",p:"p",...s.components},{Callout:l,CodeBlock:o,DocsTable:d,H2:a,InlineCode:n,Prose:i}=t;return l||r("Callout"),o||r("CodeBlock"),d||r("DocsTable"),a||r("H2"),n||r("InlineCode"),i||r("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(i,{children:e.jsxs(t.p,{children:["All trigonometric and logarithmic functions are ",e.jsx("strong",{children:"direct native wrappers"})," ",`
over `,e.jsx(n,{children:"std::"})," functions from the C++ ",e.jsx(n,{children:"<cmath>"})," ",`
header. Angles are expressed in `,e.jsx("strong",{children:"radians"}),". Every function is a"," ",`
`,e.jsx(n,{children:"static"})," method on the ",e.jsx(n,{children:"Math"}),` class,
accepts `,e.jsx(n,{children:"double"})," arguments, and returns ",e.jsx(n,{children:"double"}),"."]})}),`
`,e.jsx(o,{code:`using stdio;
using math;

namespace demo;

public static func Main() -> void
{
  // Trigonometry — direct wrappers over std::sin, std::cos, std::tan.
  println(Math.Sin(0.0));           // 0.0
  println(Math.Cos(Math.PI));       // -1.0
  println(Math.Tan(Math.PI / 4));   // ~1.0

  // Inverse trigonometry.
  println(Math.Asin(0.0));          // 0.0
  println(Math.Acos(-1.0));         // PI
  println(Math.Atan(1.0));          // ~PI/4
  println(Math.Atan2(1.0, 1.0));    // ~PI/4

  // Logarithms and exponentiation.
  println(Math.Log(Math.E));        // 1.0   (natural log)
  println(Math.Log10(100.0));       // 2.0   (base-10 log)
  println(Math.Exp(1.0));           // E     (e^x)
  println(Math.Exp(2.0));           // ~7.389
}`,language:"csharp",filename:"math_trig_log.shard"}),`
`,e.jsx(a,{children:"Trigonometric Functions"}),`
`,e.jsx(i,{children:e.jsxs(t.p,{children:["The forward trig functions (",e.jsx(n,{children:"Sin"}),", ",e.jsx(n,{children:"Cos"}),","," ",`
`,e.jsx(n,{children:"Tan"}),`) map an angle in radians to a ratio. The inverse functions
(`,e.jsx(n,{children:"Asin"}),", ",e.jsx(n,{children:"Acos"}),", ",e.jsx(n,{children:"Atan"}),","," ",`
`,e.jsx(n,{children:"Atan2"}),") map a ratio back to an angle."]})}),`
`,e.jsx(d,{headers:["Method","Return","Description","C++ Backing"],rows:[[e.jsx(t.code,{children:"Sin(value)"}),"double","Sine of value (radians).","std::sin"],[e.jsx(t.code,{children:"Cos(value)"}),"double","Cosine of value (radians).","std::cos"],[e.jsx(t.code,{children:"Tan(value)"}),"double","Tangent of value (radians).","std::tan"],[e.jsx(t.code,{children:"Asin(value)"}),"double","Arc sine in [-PI/2, PI/2]; value in [-1, 1].","std::asin"],[e.jsx(t.code,{children:"Acos(value)"}),"double","Arc cosine in [0, PI]; value in [-1, 1].","std::acos"],[e.jsx(t.code,{children:"Atan(value)"}),"double","Arc tangent in [-PI/2, PI/2].","std::atan"],[e.jsx(t.code,{children:"Atan2(y, x)"}),"double","Arc tangent of y/x using signs to determine quadrant.","std::atan2"]]}),`
`,e.jsx(l,{tone:"blue",children:e.jsxs(t.p,{children:[e.jsx(n,{children:"Atan2(y, x)"}),` is the preferred way to compute an angle from
Cartesian coordinates. Unlike `,e.jsx(n,{children:"Atan(y / x)"}),`, it correctly handles
the quadrant using the signs of both arguments, and avoids division by zero when`," ",`
`,e.jsx(n,{children:"x = 0"}),"."]})}),`
`,e.jsx(a,{children:"Logarithms, Exponentiation & Roots"}),`
`,e.jsx(i,{children:e.jsx(t.p,{children:"The exponential and logarithmic family covers power, root, and log operations:"})}),`
`,e.jsx(d,{headers:["Method","Return","Description","C++ Backing"],rows:[[e.jsx(t.code,{children:"Pow(base, exponent)"}),"double","Raises base to exponent.","std::pow"],[e.jsx(t.code,{children:"Sqrt(value)"}),"double","Square root (value must be non-negative).","std::sqrt"],[e.jsx(t.code,{children:"Cbrt(value)"}),"double","Cube root.","std::cbrt"],[e.jsx(t.code,{children:"Exp(value)"}),"double","e^value (natural exponential).","std::exp"],[e.jsx(t.code,{children:"Log(value)"}),"double","Natural logarithm (base e); value must be positive.","std::log"],[e.jsx(t.code,{children:"Log10(value)"}),"double","Base-10 logarithm; value must be positive.","std::log10"]]}),`
`,e.jsx(a,{children:"Practical Usage"}),`
`,e.jsx(i,{children:e.jsxs(t.p,{children:[`Combining trigonometry with exponentiation covers most geometric and scientific workloads.
The example below computes an angle via `,e.jsx(n,{children:"Atan2"}),` and converts it to
degrees, then demonstrates `,e.jsx(n,{children:"Pow"}),", ",e.jsx(n,{children:"Sqrt"}),", and"," ",`
`,e.jsx(n,{children:"Cbrt"}),":"]})}),`
`,e.jsx(o,{code:`using stdio;
using math;

namespace demo;

public static func Main() -> void
{
  // Power and roots.
  println(Math.Pow(2.0, 10.0));     // 1024.0
  println(Math.Sqrt(25.0));         // 5.0
  println(Math.Cbrt(27.0));         // 3.0

  // Angle between two points using Atan2.
  x := 1.0;
  y := 1.0;
  radians := Math.Atan2(y, x);      // PI/4
  println(radians);

  // Convert to degrees for display.
  degrees := radians * 180.0 / Math.PI;
  println(degrees);                  // 45.0
}`,language:"csharp",filename:"math_trig_advanced.shard"}),`
`,e.jsx(a,{children:"Internal Mechanics"}),`
`,e.jsxs("div",{className:"space-y-5",children:[e.jsxs("div",{className:"bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-3",children:[e.jsx("span",{className:"inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold",children:"1"}),e.jsx("strong",{className:"text-text-primary text-sm",children:"One-to-One C++ Mapping"})]}),e.jsx(i,{children:e.jsxs(t.p,{children:["Each ShardScript method maps to exactly one ",e.jsx(n,{children:"std::"})," function:"," ",`
`,e.jsx(n,{children:"Math.Sin"})," → ",e.jsx(n,{children:"std::sin"}),","," ",`
`,e.jsx(n,{children:"Math.Log"})," → ",e.jsx(n,{children:"std::log"}),`, etc.
The native callback receives the argument via `,e.jsx(n,{children:"AsDouble()"}),`,
calls the C++ function, and wraps the result in an `,e.jsx(n,{children:"ObjectInstance"})," ",`
via `,e.jsx(n,{children:"FromValue"}),`. There is no range checking, no domain
validation — invalid inputs (e.g., negative value to `,e.jsx(n,{children:"Sqrt"}),`)
propagate the C++ `,e.jsx(n,{children:"NaN"})," or ",e.jsx(n,{children:"inf"}),` result
as a ShardScript `,e.jsx(n,{children:"double"}),"."]})})]}),e.jsxs("div",{className:"bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-3",children:[e.jsx("span",{className:"inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold",children:"2"}),e.jsx("strong",{className:"text-text-primary text-sm",children:"Radians, Not Degrees"})]}),e.jsx(i,{children:e.jsxs(t.p,{children:[`All trigonometric functions operate in radians. To convert degrees to radians,
multiply by `,e.jsx(n,{children:"Math.PI / 180.0"}),`. To convert radians to degrees,
multiply by `,e.jsx(n,{children:"180.0 / Math.PI"}),`. No degree-mode functions are
provided — this matches the C++ standard library convention.`]})})]}),e.jsxs("div",{className:"bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-3",children:[e.jsx("span",{className:"inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold",children:"3"}),e.jsx("strong",{className:"text-text-primary text-sm",children:"Zero-Overhead FFI"})]}),e.jsx(i,{children:e.jsxs(t.p,{children:["The call path is: ShardScript ",e.jsx(n,{children:"CALLSTATICMETHODSYMBOL"}),` → native
callback function pointer → `,e.jsx(n,{children:"std::sin"})," (or equivalent) →"," ",`
`,e.jsx(n,{children:"FromValue(result)"}),`. There is no bytecode, no VM interpretation,
no ShardScript-level wrapper. The overhead is one C++ function pointer indirection plus
the `,e.jsx(n,{children:"std::"})," call."]})})]})]})]})}function x(s={}){const{wrapper:t}=s.components||{};return t?e.jsx(t,{...s,children:e.jsx(c,{...s})}):c(s)}function r(s,t){throw new Error("Expected component `"+s+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
