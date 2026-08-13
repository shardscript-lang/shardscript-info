import{j as e}from"./index-DkFwvLJL.js";function h(o){const n={code:"code",p:"p",...o.components},{Bullet:d,Callout:a,CodeBlock:c,DocsTable:l,H2:s,InlineCode:r,Prose:i}=n;return d||t("Bullet"),a||t("Callout"),c||t("CodeBlock"),l||t("DocsTable"),s||t("H2"),r||t("InlineCode"),i||t("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(i,{children:e.jsxs(n.p,{children:["The ",e.jsx(r,{children:"math.random"})," shard adds a static ",e.jsx(r,{children:"Random"}),` class
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
`,e.jsx(l,{headers:["Member","Return","Description"],rows:[[e.jsx(n.code,{children:"Integer()"}),"int","Returns a random 64-bit integer across the full signed range."],[e.jsx(n.code,{children:"Integer(top)"}),"int","Returns a random integer in [0, top)."],[e.jsx(n.code,{children:"Integer(bottom, top)"}),"int","Returns a random integer in [bottom, top]."],[e.jsx(n.code,{children:"Double()"}),"double","Returns a random double in [0.0, 1.0)."],[e.jsx(n.code,{children:"Double(top)"}),"double","Returns a random double in [0.0, top)."],[e.jsx(n.code,{children:"Double(bottom, top)"}),"double","Returns a random double in [bottom, top)."],[e.jsx(n.code,{children:"Propably(chance)"}),"bool","Returns true with the given percentage chance (0..100)."]]}),`
`,e.jsx(a,{tone:"blue",children:e.jsxs(n.p,{children:["Every call creates a fresh ",e.jsx(r,{children:"std::mt19937"}),` generator. For reproducible
sequences (e.g., deterministic game seeds), a seedable API is not yet exposed.`]})}),`
`,e.jsx(s,{children:"See also"}),`
`,e.jsx("ul",{className:"space-y-2 text-text-secondary",children:e.jsx(d,{children:e.jsxs(n.p,{children:[e.jsx(r,{children:"Basic Math"})," — constants and arithmetic helpers on the ",e.jsx(r,{children:"Math"})," class."]})})}),`
`,e.jsx(s,{children:"Source"}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:["The ",e.jsx(r,{children:"math.random"})," shard ships as part of"," ",`
`,e.jsx(r,{children:"ShardScript.Framework"}),". The native binding for the static ",e.jsx(r,{children:"Random"})," ",`
class is in `,e.jsx(r,{children:"ShardScript.Framework/system/math.random.shard.cpp"}),"."]})})]})}function p(o={}){const{wrapper:n}=o.components||{};return n?e.jsx(n,{...o,children:e.jsx(h,{...o})}):h(o)}function t(o,n){throw new Error("Expected component `"+o+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
