import{j as e}from"./index-BQw6jbtc.js";function d(r){const n={p:"p",...r.components},{Bullet:i,CodeBlock:c,DocsTable:l,H2:o,InlineCode:t,Prose:s}=n;return i||a("Bullet"),c||a("CodeBlock"),l||a("DocsTable"),o||a("H2"),t||a("InlineCode"),s||a("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(o,{children:"Summary"}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:["The ShardScript compiler transforms source text into a ready-to-run ",e.jsx(t,{children:"ApplicationDomain"}),`
through a fixed sequence of stages: lexing, parsing, semantic analysis, async lowering, layout, and
bytecode emission. Every compile-time error is reported before the program ever reaches the virtual
machine.`]})}),`
`,e.jsx(o,{children:"What problem it solves"}),`
`,e.jsx(s,{children:e.jsx(n.p,{children:`A scripting language must balance fast iteration with early error detection. By compiling source ahead of
execution, ShardScript catches lexical, syntactic, and type errors before the host runs the program, while
still keeping the compiler lightweight enough to embed inside an application.`})}),`
`,e.jsx(o,{children:"How it works"}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:["The ",e.jsx(t,{children:"CompilationContext"})," owns each stage and threads a"," ",`
`,e.jsx(t,{children:"SemanticModel"}),` — the resolved symbol and type information — through them. The final
product is an `,e.jsx(t,{children:"ApplicationDomain"}),": a ready-to-run bundle handed to the host."]})}),`
`,e.jsx(c,{code:`Source text
 |
 v
1. Lexer            -- tokens
2. Parser           -- AST  (SyntaxTree)
3. Semantic model   -- symbols, scopes, bound types   <-- all errors caught here
4. Async lowering   -- async methods become state machines
5. Layout           -- field/slot offsets assigned
6. Emission         -- per-method bytecode + string pool
 |
 v
ApplicationDomain  =  Program image  +  VirtualMachine  +  EventLoop  +  GarbageCollector
 |
 v
7. VM::Run()        -- executes the entry point`,language:"text",filename:"pipeline.txt"}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Lexer."})," The ",e.jsx(t,{children:"LexicalAnalyzer"}),` turns source text into a stream of tokens
in a `,e.jsx(t,{children:"LexicalBuffer"}),`, recognising hexadecimal, binary, and decimal prefixes, backtick
digit separators, and SI-style size suffixes.`]})}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Parser."})," The ",e.jsx(t,{children:"SourceParser"}),` is a hand-written recursive-descent parser
that consumes the token stream and builds a `,e.jsx(t,{children:"SyntaxTree"})," of"," ",`
`,e.jsx(t,{children:"CompilationUnit"}),` nodes — at this stage purely syntactic structure, with no meaning
yet attached.`]})}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Semantic model."})," The semantic analyzer (",e.jsx(t,{children:"Semanter.Analyze"}),`) walks the
syntax tree in four ordered passes:`]})}),`
`,e.jsx(l,{headers:["Pass","Component","Responsibility"],rows:[["1. Declarations","DeclarationCollector","Register every declared type, method, field, and parameter into the SymbolTable."],["2. Type binding","TypeBinder","Resolve type references (generics, base interfaces) to TypeSymbols."],["3. Expression binding","ExpressionBinder","Bind each expression to its symbol and type; resolve overloads and member access."],["4. Validation","SemanticValidator","Enforce the type rules and emit compile-time diagnostics."]]}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Async lowering."})," Before bytecode is emitted, ",e.jsx(t,{children:"async"}),` methods are
rewritten into compiler-generated state machines so that `,e.jsx(t,{children:"await"}),` can suspend and
resume without threads.`]})}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Layout and emission."})," ",e.jsx(t,{children:"LayoutGenerator"}),` assigns concrete offsets, and
the emitter produces a flat `,e.jsx(t,{children:"ExecutableByteCode"}),` stream plus a shared string pool.
The result is wrapped into a `,e.jsx(t,{children:"ProgramVirtualImage"}),` together with a fresh VM, event
loop, and garbage collector.`]})}),`
`,e.jsx(o,{children:"Key ideas"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Errors are caught before execution."}),` Lexical, syntax, and
type errors are all reported before stage 7 begins.`]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"The semantic model is the source of truth."}),` All later stages
read symbol and type information from the model rather than re-resolving names.`]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Async is lowered, not interpreted."}),` State machines are
generated once at compile time, making suspension and resumption efficient at runtime.`]})})]}),`
`,e.jsx(o,{children:"When to use / When not to use"}),`
`,e.jsx(l,{headers:["Use","Avoid"],rows:[[e.jsx(e.Fragment,{children:"Study the pipeline when debugging compilation errors or embedding the compiler."}),e.jsx(e.Fragment,{children:"Do not rely on undocumented stage ordering in external tools; the pipeline may evolve."})]]}),`
`,e.jsx(o,{children:"Related articles"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"Bytecode and OpCodes"})," — the output of the emission stage."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"Virtual Machine Internals"})," — how the compiled image is executed."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"Event Loop and libuv"})," — how async work is scheduled after compilation."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"Runtime Architecture"})," — the high-level view of compiler, VM, and event loop."]})})]})]})}function x(r={}){const{wrapper:n}=r.components||{};return n?e.jsx(n,{...r,children:e.jsx(d,{...r})}):d(r)}function a(r,n){throw new Error("Expected component `"+r+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
