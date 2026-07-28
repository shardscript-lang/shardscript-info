import{j as e}from"./index-DREHvARB.js";function l(n){const t={p:"p",...n.components},{Callout:r,H2:a,InlineCode:o,Prose:s}=t;return r||i("Callout"),a||i("H2"),o||i("InlineCode"),s||i("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(s,{children:e.jsxs(t.p,{children:["ShardScript is an ",e.jsx("strong",{children:"embeddable, compiled scripting language with strict static typing"}),`,
implemented in C++20. It is designed to bring the safety and structure of a statically-compiled language
into the role traditionally filled by dynamically-typed embeddable script engines.`]})}),`
`,e.jsx(a,{children:"Pragmatic by Design"}),`
`,e.jsx(s,{children:e.jsx(t.p,{children:`ShardScript prioritizes developer convenience and readability. Where a construct proves useful in
day-to-day code, the language adopts it — even if that means offering more than one way to express the
same intent.`})}),`
`,e.jsx(r,{tone:"blue",title:"Example",children:e.jsxs(t.p,{children:[e.jsx(o,{children:"defer"})," releases resources on scope exit, while ",e.jsx(o,{children:"IDisposable"})," ",`
lets you hook custom cleanup logic into that same mechanism.`]})})]})}function d(n={}){const{wrapper:t}=n.components||{};return t?e.jsx(t,{...n,children:e.jsx(l,{...n})}):l(n)}function i(n,t){throw new Error("Expected component `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}export{d as default};
