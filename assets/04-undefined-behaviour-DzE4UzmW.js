import{j as e}from"./index-DLc5xCYN.js";function d(r){const n={p:"p",...r.components},{Bullet:t,DocsTable:c,H2:i,InlineCode:a,Prose:s}=n;return t||o("Bullet"),c||o("DocsTable"),i||o("H2"),a||o("InlineCode"),s||o("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(i,{children:"Summary"}),`
`,e.jsx(s,{children:e.jsx(n.p,{children:`Undefined behaviour in ShardScript is any program action for which the language and virtual machine
make no guarantee. Code that triggers undefined behaviour may crash, produce incorrect results,
behave differently between runs, or appear to work until surrounding code changes.`})}),`
`,e.jsx(i,{children:"What problem it solves"}),`
`,e.jsx(s,{children:e.jsx(n.p,{children:`Explicitly calling out undefined behaviour helps programmers distinguish between errors that are
guaranteed to throw a catchable exception and errors that the VM is allowed to handle arbitrarily.
It also documents the boundaries where the current implementation is incomplete or where native
interop hands responsibility back to the programmer.`})}),`
`,e.jsx(i,{children:"How it works"}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[`The ShardScript compiler and runtime validate many error conditions: type mismatches are caught at
compile time, array bounds and null dereferences are checked at runtime, and division by zero on
integers throws `,e.jsx(a,{children:"DivideByZeroException"}),`. Operations that fall outside the
validated set are undefined. The VM may still detect some of them, but programs must not rely on
any specific failure mode.`]})}),`
`,e.jsx(c,{headers:["Category","Example","Why it is undefined"],rows:[["Incomplete features","Capturing a local variable in a lambda that escapes its scope","The compiler parses the capture but the VM does not lift locals to the heap."],["Incomplete features","Using compound assignment operators such as +=","The parser accepts the syntax but the VM emits only a plain assignment."],["Switch expressions","A switch expression with no matching arm and no default","No handler is selected and no value is produced."],["Native interop","Reading past the end of a pinned native buffer","The VM cannot check bounds outside managed memory."],["Native interop","Passing a mismatched pointer width to a native call","The signature is trusted; incorrect sizes corrupt the call stack."],["Object lifetime","Returning a borrowed argument pointer after the call returns","The GC may move or collect the backing object."],["Reflection","Modifying internal VM state through undocumented APIs","Invariants assumed by the compiler and GC may be violated."]]}),`
`,e.jsx(i,{children:"Key ideas"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Undefined is not the same as unspecified."})," ",`
Unspecified behaviour is guaranteed to be safe but may vary between implementations. Undefined
behaviour carries no guarantee at all.`]})}),e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Current implementation details can mask bugs."})," ",`
A program with undefined behaviour may run correctly today and fail after a compiler or runtime
update.`]})}),e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Native boundaries are the highest risk."}),` Once
execution crosses into a native library, the VM can no longer enforce memory safety or type
safety. Native code must uphold the contracts documented in the native-library guides.`]})}),e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Defensive coding removes ambiguity."}),` Adding
default arms to switch expressions, checking pointers and lengths, and avoiding incomplete
features keeps behaviour defined.`]})})]}),`
`,e.jsx(i,{children:"When to use / When not to use"}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"When to accept undefined behaviour."}),` In rare performance-critical paths, a
programmer may intentionally rely on implementation-defined behaviour, but such code should be
isolated, documented, and covered by tests that run on the exact target runtime.`]})}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"When to avoid undefined behaviour."}),` Almost always. Production ShardScript code
should stay within the validated subset of the language. If a construct is marked as incomplete in
the documentation, use the recommended workaround until it is fully implemented.`]})}),`
`,e.jsx(i,{children:"Related articles"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx(a,{children:"runtime-exceptions"}),` — errors that are guaranteed to throw a catchable
exception.`]})}),e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx(a,{children:"lambda-expressions"})," — capture rules and current limitations."]})}),e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx(a,{children:"switch-expressions"})," — how to provide a default arm for full coverage."]})}),e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx(a,{children:"native-library-overview"})," — contracts native libraries must uphold."]})})]})]})}function h(r={}){const{wrapper:n}=r.components||{};return n?e.jsx(n,{...r,children:e.jsx(d,{...r})}):d(r)}function o(r,n){throw new Error("Expected component `"+r+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};
