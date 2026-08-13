import{j as e}from"./index-BQw6jbtc.js";function h(t){const n={code:"code",p:"p",...t.components},{Bullet:a,Callout:d,CodeBlock:c,DocsTable:l,H2:s,InlineCode:r,Prose:i}=n;return a||o("Bullet"),d||o("Callout"),c||o("CodeBlock"),l||o("DocsTable"),s||o("H2"),r||o("InlineCode"),i||o("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(i,{children:e.jsxs(n.p,{children:["The ",e.jsx(r,{children:"math.random"})," shard adds a static ",e.jsx(r,{children:"Random"}),` class
to the `,e.jsx(r,{children:"math"})," namespace. It wraps a Mersenne Twister engine seeded from"," ",`
`,e.jsx(r,{children:"std::random_device"}),` and provides overloads for both integer and floating-point
ranges.`]})}),`
`,e.jsx(c,{code:`using stdio;
using math;

namespace demo;

public static func Main() -> void
{
  println(Random.Integer(1, 6));      // roll a die
  println(Random.Double());           // 0.0 .. 1.0
  println(Random.Propably(50.0));     // coin flip
}`,language:"csharp",filename:"random_basic.shard"}),`
`,e.jsx(s,{children:"API Reference"}),`
`,e.jsx(l,{headers:["Member","Return","Description"],rows:[[e.jsx(n.code,{children:"Integer()"}),"int","Returns a random 64-bit integer across the full signed range."],[e.jsx(n.code,{children:"Integer(top)"}),"int","Currently ignores top and returns a random integer in [0, INT_MAX]."],[e.jsx(n.code,{children:"Integer(bottom, top)"}),"int","Returns a random integer in [bottom, top]. Both bounds are cast to 32-bit int, so large 64-bit ranges are truncated."],[e.jsx(n.code,{children:"Double()"}),"double","Returns a random double in [0.0, 1.0)."],[e.jsx(n.code,{children:"Double(top)"}),"double","Returns a random double in [0.0, top)."],[e.jsx(n.code,{children:"Double(bottom, top)"}),"double","Returns a random double in [bottom, top)."],[e.jsx(n.code,{children:"Propably(chance)"}),"bool","Returns true with the given percentage chance (0..100)."]]}),`
`,e.jsx(d,{tone:"blue",children:e.jsxs(n.p,{children:["Every call creates a fresh ",e.jsx(r,{children:"std::mt19937"}),` generator. For reproducible
sequences (e.g., deterministic game seeds), a seedable API is not yet exposed.`]})}),`
`,e.jsx(s,{children:"See also"}),`
`,e.jsx("ul",{className:"space-y-2 text-text-secondary",children:e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx(r,{children:"Basic Math"})," — constants and arithmetic helpers on the ",e.jsx(r,{children:"Math"})," class."]})})}),`
`,e.jsx(s,{children:"Source"}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:["The ",e.jsx(r,{children:"math.random"})," shard ships as part of"," ",`
`,e.jsx(r,{children:"ShardScript.Framework"}),". The native binding for the static ",e.jsx(r,{children:"Random"})," ",`
class is in `,e.jsx(r,{children:"ShardScript.Framework/system/math.random.shard.cpp"}),"."]})})]})}function p(t={}){const{wrapper:n}=t.components||{};return n?e.jsx(n,{...t,children:e.jsx(h,{...t})}):h(t)}function o(t,n){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
