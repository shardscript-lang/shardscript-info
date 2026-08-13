import{j as e}from"./index-DkFwvLJL.js";function l(i){const n={p:"p",...i.components},{Bullet:t,DocsTable:o,H2:r,InlineCode:s,Prose:a}=n;return t||c("Bullet"),o||c("DocsTable"),r||c("H2"),s||c("InlineCode"),a||c("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(r,{children:"Summary"}),`
`,e.jsx(a,{children:e.jsx(n.p,{children:`ShardScript is intentionally conservative about the features it includes. Several capabilities that are
common in other languages were considered and rejected because they conflict with the language's core
goals: strict static typing, a small embeddable runtime, predictable memory behavior, and single-threaded
cooperative concurrency.`})}),`
`,e.jsx(r,{children:"What problem it solves"}),`
`,e.jsx(a,{children:e.jsx(n.p,{children:`Every rejected feature is a trade-off. Explaining why something is absent helps readers understand the
boundaries of the language and avoids repeated proposals for capabilities that are incompatible with its
design.`})}),`
`,e.jsx(r,{children:"How the decision process works"}),`
`,e.jsx(a,{children:e.jsx(n.p,{children:`A feature is rejected when it violates one or more of the non-negotiable design constraints: compile-time
type safety, embeddability, deterministic cleanup, or single-threaded cooperative execution. Rejected
ideas are not revisited unless the underlying constraint changes.`})}),`
`,e.jsx(r,{children:"Key ideas"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"No implicit or duck typing."}),` Every variable, parameter,
field, and return type has an explicit compile-time type. Dynamic dispatch and duck typing make static
error detection impossible, so they are out of scope.`]})}),e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"No just-in-time (JIT) compilation."}),` ShardScript compiles
to bytecode ahead of time and executes it on a stack-based VM. A JIT would increase runtime size,
complicate embedding, and introduce platform-specific code generation that the project avoids.`]})}),e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"No multi-threading in script code."}),` Concurrency is
provided by a single-threaded libuv event loop and async/await. OS threads in scripts would introduce
data races and require complex synchronization inside the VM.`]})}),e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"No unsafe pointers or manual memory layout."}),` Script code
cannot dereference raw pointers or control object layout. Native code handles those concerns through the
C++ interop contract.`]})}),e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"No preprocessor or textual macros."}),` Code generation is
not part of the language surface. The compiler operates on a parsed syntax tree, and metaprogramming is
provided through generics rather than macro expansion.`]})}),e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"No runtime code emission or reflection emit."}),` The compiler
produces a fixed bytecode image at build time. Scripts cannot generate new types or methods while
running.`]})}),e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"No multiple inheritance."}),` A class may implement multiple
interfaces but can inherit from at most one base class. Multiple inheritance of implementation adds
layout and dispatch complexity that interfaces already solve.`]})})]}),`
`,e.jsx(r,{children:"What is included instead"}),`
`,e.jsx(a,{children:e.jsx(n.p,{children:"Each rejected idea has a deliberate replacement within the language:"})}),`
`,e.jsx(o,{headers:["Rejected idea","ShardScript alternative"],rows:[[e.jsx(e.Fragment,{children:"Duck typing / dynamic dispatch"}),e.jsx(e.Fragment,{children:"Interfaces, generics, and compile-time overload resolution"})],[e.jsx(e.Fragment,{children:"JIT compilation"}),e.jsx(e.Fragment,{children:"Ahead-of-time bytecode + stack VM"})],[e.jsx(e.Fragment,{children:"Multi-threaded scripts"}),e.jsx(e.Fragment,{children:"Cooperative async/await over a libuv event loop"})],[e.jsx(e.Fragment,{children:"Unsafe pointers"}),e.jsxs(e.Fragment,{children:["Reference-counted objects, ",e.jsx(s,{children:"nint"})," for opaque handles, and C++ native libraries"]})],[e.jsx(e.Fragment,{children:"Textual macros"}),e.jsx(e.Fragment,{children:"Generics and the symbol-builder API for native-library code generation"})],[e.jsx(e.Fragment,{children:"Reflection emit"}),e.jsx(e.Fragment,{children:"Runtime type introspection and compile-time symbol registration"})],[e.jsx(e.Fragment,{children:"Multiple inheritance"}),e.jsx(e.Fragment,{children:"Single inheritance + multiple interfaces"})]]}),`
`,e.jsx(r,{children:"When to use / When not to use"}),`
`,e.jsx(a,{children:e.jsx(n.p,{children:`These rejections are not temporary. If your project requires JIT compilation, multi-threaded script code,
unsafe memory access, or runtime code generation, ShardScript is the wrong tool. If you need strict typing,
a small runtime, and deterministic cleanup, the omissions are features, not gaps.`})}),`
`,e.jsx(r,{children:"Related articles"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx(s,{children:"Design Goals"})," — the principles that motivate these rejections."]})}),e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx(s,{children:"Comparison with Other Languages"}),` — how ShardScript differs from languages that
include some of these features.`]})}),e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx(s,{children:"Runtime Architecture"}),` — why the VM and event loop make certain features
impractical.`]})}),e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx(s,{children:"Garbage Collection"})," — the memory model that replaces manual management."]})})]})]})}function h(i={}){const{wrapper:n}=i.components||{};return n?e.jsx(n,{...i,children:e.jsx(l,{...i})}):l(i)}function c(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};
