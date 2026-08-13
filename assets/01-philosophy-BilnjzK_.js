import{j as e}from"./index-B-x28vAk.js";function d(s){const n={p:"p",...s.components},{Bullet:t,Callout:o,DocsTable:l,H2:a,InlineCode:r,Prose:i}=n;return t||c("Bullet"),o||c("Callout"),l||c("DocsTable"),a||c("H2"),r||c("InlineCode"),i||c("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(a,{children:"Summary"}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:["ShardScript is an ",e.jsx("strong",{children:"embeddable, compiled scripting language with strict static typing"}),`,
implemented in C++20. It is designed to occupy the middle ground between lightweight dynamically-typed
embeddable languages and heavyweight statically-typed application languages: it offers the ease of
embedding and rapid iteration of a script engine while catching type, name, and contract errors at
compile time.`]})}),`
`,e.jsx(a,{children:"What problem it solves"}),`
`,e.jsx(i,{children:e.jsx(n.p,{children:`Applications that need user-facing scripting usually choose between two extremes. On one side are
dynamically-typed languages such as Lua or Python: they are easy to embed, have rich ecosystems, and
allow writers to iterate quickly. On the other side are statically-typed languages such as C# or full
C++ plugins: they catch errors early and scale well, but they are heavier to host, slower to compile,
and harder to sandbox.`})}),`
`,e.jsx(i,{children:e.jsx(n.p,{children:"ShardScript targets the gap between those extremes. It is meant for hosts that want:"})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Compile-time confidence in script code"}),` — typos, missing
members, and type mismatches are reported before the script ever runs.`]})}),e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"A small runtime footprint"}),` — a custom stack-based virtual
machine and a compact bytecode format, not a full language runtime or JIT compiler.`]})}),e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Direct C++ interoperability"}),` — native libraries are
ordinary shared libraries (DLL / SO / dylib) that export two well-known entry points, so hosts and
third-party authors can extend the language without modifying the compiler.`]})}),e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Familiar syntax"}),` — a C-style grammar with classes,
generics, delegates, lambdas, and async/await, lowering the barrier for developers who already know
C#, C++, Java, or TypeScript.`]})})]}),`
`,e.jsx(a,{children:"Key ideas"}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Compiled, not interpreted."}),` ShardScript pays the compilation cost once, ahead of time,
rather than repeatedly during execution. The result is faster startup of hot paths, earlier error
detection, and the option to validate scripts during a build step rather than in production.`]})}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Strict static typing."}),` Every variable, parameter, field, and return type has a compile-time
type. Generics, interfaces, classes, structs, and enums are first-class, and overload resolution happens
at compile time. The language does not fall back to dynamic dispatch to resolve member access.`]})}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Embeddable by design."}),` The runtime is a library, not a standalone process. A host
initializes a `,e.jsx(r,{children:"CompilationContext"}),", compiles source into an"," ",`
`,e.jsx(r,{children:"ApplicationDomain"}),", and calls ",e.jsx(r,{children:"VM::Run()"}),` on the entry
point. Native libraries are loaded as shared objects at runtime and register their symbols through the
same API the standard library uses.`]})}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Pragmatic, not purist."}),` ShardScript allows multiple ways to solve common problems when
each way carries a real ergonomic benefit. `,e.jsx(r,{children:"defer"}),` gives deterministic cleanup at
scope exit, while `,e.jsx(r,{children:"IDisposable"}),` lets authors attach custom cleanup logic to the
same mechanism. Properties, indexers, operator overloading, and extension methods are all available when
they make an API clearer.`]})}),`
`,e.jsx(o,{tone:"blue",title:"Example",children:e.jsxs(n.p,{children:[e.jsx(r,{children:"defer"})," releases resources on scope exit, while ",e.jsx(r,{children:"IDisposable"})," ",`
lets you hook custom cleanup logic into that same mechanism.`]})}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"First-class native interop."}),` Script code can call into C++ through native libraries, and
native code can invoke script methods, read fields, and allocate script objects. This makes ShardScript
suitable as an extension language for C++ applications where tight integration with existing C++ data
structures and algorithms matters.`]})}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Cooperative concurrency."}),` Asynchronous methods compile into state machines that yield
control back to the event loop on `,e.jsx(r,{children:"await"}),`. There are no OS threads created by the
language; concurrency is single-threaded and cooperative, simplifying memory safety and avoiding data
races in script code.`]})}),`
`,e.jsx(a,{children:"When to use / When not to use"}),`
`,e.jsx(l,{headers:["Use ShardScript when","Consider alternatives when"],rows:[[e.jsx(e.Fragment,{children:"You need a script engine inside a C++ application and want compile-time safety for user-written code."}),e.jsx(e.Fragment,{children:"You need a read-eval-print loop (REPL), rapid runtime introspection, or duck typing. ShardScript is compiled and statically typed."})],[e.jsx(e.Fragment,{children:"You want to ship pre-validated scripts and catch errors during a build or mod-publishing step."}),e.jsx(e.Fragment,{children:"You need a mature package ecosystem, IDE tooling, or language-specific hiring market. ShardScript is a younger, focused language."})],[e.jsx(e.Fragment,{children:"Your project benefits from C-style syntax, classes, generics, async/await, and native library extensions."}),e.jsx(e.Fragment,{children:"You need direct memory layout control, manual memory management, or zero-overhead abstractions. Use C or C++ directly."})],[e.jsxs(e.Fragment,{children:["You want deterministic cleanup patterns such as ",e.jsx(r,{children:"defer"})," and ",e.jsx(r,{children:"IDisposable"})," alongside automatic garbage collection."]}),e.jsx(e.Fragment,{children:"You need multi-threaded parallelism in script code. ShardScript concurrency is cooperative and single-threaded."})]]}),`
`,e.jsx(a,{children:"Related articles"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx(r,{children:"Runtime Architecture"})," — how source becomes bytecode and how the VM executes it."]})}),e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx(r,{children:"Installation"})," — installing the ShardScript interpreter."]})}),e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx(r,{children:"Hello World"})," — writing and running your first program."]})}),e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx(r,{children:"Building from Source"})," — compiling the interpreter and standard shards."]})}),e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx(r,{children:"Native Library Overview"})," — extending ShardScript with C++ shared libraries."]})}),e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx(r,{children:"Classes"})," — object-oriented features in ShardScript."]})}),e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx(r,{children:"Functions and Delegates"})," — functional programming constructs."]})}),e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx(r,{children:"Feature Tour"}),` — a hands-on overview of classes, generics, async, switch,
defer, and native interop.`]})}),e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx(r,{children:"Type System"}),` — value types, reference types, generics, interfaces, and nullable
references.`]})}),e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx(r,{children:"The shard CLI"})," — the command-line interface for running ShardScript programs."]})}),e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx(r,{children:"Project Configuration"})," — organizing source files and build scripts."]})}),e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx(r,{children:"Compiler Pipeline"})," — how source becomes bytecode."]})}),e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx(r,{children:"Virtual Machine Internals"})," — how the VM executes compiled programs."]})})]})]})}function p(s={}){const{wrapper:n}=s.components||{};return n?e.jsx(n,{...s,children:e.jsx(d,{...s})}):d(s)}function c(s,n){throw new Error("Expected component `"+s+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
