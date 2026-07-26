import{j as e}from"./index-JSRqoYtX.js";function l(o){const n={code:"code",p:"p",...o.components},{Callout:s,CodeBlock:i,DocsTable:d,H2:a,InlineCode:t,Prose:c}=n;return s||r("Callout"),i||r("CodeBlock"),d||r("DocsTable"),a||r("H2"),t||r("InlineCode"),c||r("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(c,{children:e.jsxs(n.p,{children:["The ",e.jsx(t,{children:"math.random"})," shard adds a static ",e.jsx(t,{children:"Random"}),` class
to the `,e.jsx(t,{children:"math"})," namespace. It wraps a Mersenne Twister engine seeded from"," ",`
`,e.jsx(t,{children:"std::random_device"}),` and provides overloads for both integer and floating-point
ranges.`]})}),`
`,e.jsx(i,{code:`using stdio;
using math;

namespace demo;

public static func Main() -> void
{
  println(Random.Integer(1, 6));      // roll a die
  println(Random.Double());           // 0.0 .. 1.0
  println(Random.Propably(50.0));     // coin flip
}`,language:"csharp",filename:"random_basic.shard"}),`
`,e.jsx(a,{children:"API Reference"}),`
`,e.jsx(d,{headers:["Member","Return","Description"],rows:[[e.jsx(n.code,{children:"Integer()"}),"int","Returns a random 64-bit integer across the full signed range."],[e.jsx(n.code,{children:"Integer(top)"}),"int","Returns a random integer in [0, top)."],[e.jsx(n.code,{children:"Integer(bottom, top)"}),"int","Returns a random integer in [bottom, top]."],[e.jsx(n.code,{children:"Double()"}),"double","Returns a random double in [0.0, 1.0)."],[e.jsx(n.code,{children:"Double(top)"}),"double","Returns a random double in [0.0, top)."],[e.jsx(n.code,{children:"Double(bottom, top)"}),"double","Returns a random double in [bottom, top)."],[e.jsx(n.code,{children:"Propably(chance)"}),"bool","Returns true with the given percentage chance (0..100)."]]}),`
`,e.jsx(s,{tone:"blue",children:e.jsxs(n.p,{children:["Every call creates a fresh ",e.jsx(t,{children:"std::mt19937"}),` generator. For reproducible
sequences (e.g., deterministic game seeds), a seedable API is not yet exposed.`]})})]})}function u(o={}){const{wrapper:n}=o.components||{};return n?e.jsx(n,{...o,children:e.jsx(l,{...o})}):l(o)}function r(o,n){throw new Error("Expected component `"+o+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};
