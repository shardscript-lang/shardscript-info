import{j as e}from"./index-BQw6jbtc.js";function d(r){const s={p:"p",...r.components},{Bullet:n,CodeBlock:o,DocsTable:l,H2:a,InlineCode:t,Prose:i}=s;return n||c("Bullet"),o||c("CodeBlock"),l||c("DocsTable"),a||c("H2"),t||c("InlineCode"),i||c("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(a,{children:"Summary"}),`
`,e.jsx(i,{children:e.jsx(s.p,{children:`The ShardScript virtual machine is a custom stack-based interpreter that executes the bytecode produced by
the compiler. It manages evaluation stacks, local slots, call frames, exception handlers, deferred
expressions, and reference-counted object lifetimes.`})}),`
`,e.jsx(a,{children:"What problem it solves"}),`
`,e.jsx(i,{children:e.jsx(s.p,{children:`A compiled language needs a compact, embeddable runtime. Rather than depending on a large external runtime
or JIT compiler, ShardScript ships a small stack VM that hosts can initialize, run, and tear down within
their own process.`})}),`
`,e.jsx(a,{children:"How it works"}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:["Execution is performed by the ",e.jsx(t,{children:"VirtualMachine"}),`, a classic stack machine: arithmetic
and calls consume their operands from the top of an evaluation stack and push their results back. Locals
live in a separate, slot-indexed area, not on the operand stack.`]})}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:["The dispatch loop lives in the VM's ",e.jsx(t,{children:"ProcessCode"})," routine — one large"," ",`
`,e.jsx(t,{children:"switch"})," over the ",e.jsx(t,{children:"OpCode"}),` enum whose cases are the instruction
groups.`]})}),`
`,e.jsx(o,{code:`while not end of bytecode stream:
  opcode <- decode next opcode (and its operands)
  switch (opcode) -> act on the current frame's eval stack`,language:"text",filename:"dispatch.txt"}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:["Every active method call gets a ",e.jsx(t,{children:"CallStackFrame"}),". A frame holds:"]})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsxs(n,{children:[e.jsx("strong",{className:"text-text-primary",children:"Evaluation stack"})," — a stack of ",e.jsx(t,{children:"ObjectInstance*"})," values that opcodes push and pop."]}),e.jsxs(n,{children:[e.jsx("strong",{className:"text-text-primary",children:"Locals"})," — a slot-indexed region using the offsets the emitter assigned."]}),e.jsxs(n,{children:[e.jsx("strong",{className:"text-text-primary",children:"Type arguments"})," — in force for generic methods."]}),e.jsxs(n,{children:[e.jsx("strong",{className:"text-text-primary",children:"Exception-handler stack"})," — recording protected (",e.jsx(t,{children:"try"}),") regions and their dispatch offsets."]}),e.jsxs(n,{children:[e.jsx("strong",{className:"text-text-primary",children:"Defer stack"})," — the deferred expressions registered in this scope."]}),e.jsxs(n,{children:[e.jsx("strong",{className:"text-text-primary",children:"Pending-task counter"})," — keeps the frame alive while async work it started is still outstanding."]})]}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:["Calls push a new frame and transfer arguments; ",e.jsx(t,{children:"RETURN"}),` pops it, leaving the return
value (if any) on the caller's evaluation stack.`]})}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Garbage collection."})," Values are garbage-collected ",e.jsx(t,{children:"ObjectInstance"})," ",`
objects. The collector is reference-counting with object tracking: every value carries a reference count the
VM updates as it is stored in and removed from slots, fields, and stacks, and the instance is reclaimed when
the count reaches zero.`]})}),`
`,e.jsx(a,{children:"Key ideas"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Stack discipline."}),` Operand consumption and result pushing
are strictly defined for every opcode.`]})}),e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Reference counting."}),` Most objects are reclaimed immediately
when their last reference disappears.`]})}),e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Frame isolation."}),` Each call gets its own locals and
evaluation stack, preventing cross-call corruption.`]})})]}),`
`,e.jsx(a,{children:"When to use / When not to use"}),`
`,e.jsx(l,{headers:["Use","Avoid"],rows:[[e.jsx(e.Fragment,{children:"Read this article when embedding the VM or debugging runtime behavior."}),e.jsx(e.Fragment,{children:"Do not implement performance-critical algorithms by hand-tuning bytecode; write native libraries instead."})]]}),`
`,e.jsx(a,{children:"Related articles"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx(t,{children:"Compiler Pipeline"})," — how the VM's input is produced."]})}),e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx(t,{children:"Bytecode and OpCodes"})," — the instruction set executed by the VM."]})}),e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx(t,{children:"Event Loop and libuv"})," — how async work is scheduled around the VM."]})})]})]})}function x(r={}){const{wrapper:s}=r.components||{};return s?e.jsx(s,{...r,children:e.jsx(d,{...r})}):d(r)}function c(r,s){throw new Error("Expected component `"+r+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
