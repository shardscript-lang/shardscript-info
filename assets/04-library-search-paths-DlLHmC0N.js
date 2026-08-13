import{j as e}from"./index-DkFwvLJL.js";function o(i){const s={p:"p",...i.components},{Bullet:t,Callout:h,CodeBlock:a,H2:d,InlineCode:n,Prose:r}=s;return t||l("Bullet"),h||l("Callout"),a||l("CodeBlock"),d||l("H2"),n||l("InlineCode"),r||l("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(d,{children:"Prerequisites"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(t,{children:e.jsx(s.p,{children:"A working ShardScript installation."})}),e.jsx(t,{children:e.jsx(s.p,{children:"One or more shard DLLs you want to load, either standard shards or your own libraries."})}),e.jsx(t,{children:e.jsxs(s.p,{children:["Familiarity with the ",e.jsx(n,{children:"shard"})," CLI."]})})]}),`
`,e.jsx(d,{children:"Goal"}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:[`Understand how the ShardScript interpreter discovers shard libraries at startup and how to control that
discovery with the `,e.jsx(n,{children:"system/"})," directory, the ",e.jsx(n,{children:"-l"}),` flag, and
the `,e.jsx(n,{children:"%SHARDSCRIPT%"})," environment variable."]})}),`
`,e.jsx(d,{children:"Step-by-Step Instructions"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"1. Use the standard shard layout."})}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:["Today the interpreter resolves standard shards by looking for a ",e.jsx(n,{children:"system/"}),` folder
next to its own executable (`,e.jsx(n,{children:"ExecutableDirectory() / system"}),`). Because the build
emits the shard DLLs straight into `,e.jsx(n,{children:"bin/system"}),`, a freshly built tree is already
laid out correctly.`]})}),`
`,e.jsx(a,{code:`# Current (implemented): shards live in a system/ folder beside the executable
<install>/
|-- shard              (shard.exe on Windows)
\`-- system/            <- auto-discovered at startup
  |-- stdio.dll
  |-- collections.dll
  |-- math.dll
  \`-- ...`,language:"text",filename:"layout-current.txt"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"2. Load extra shards with -l."})}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:["Pass additional library paths or glob patterns with the ",e.jsx(n,{children:"-l"})," flag."]})}),`
`,e.jsx(a,{code:`shard app.shard -l path/to/mylib.dll
shard app.shard -l "libs/*.dll"`,language:"bash",filename:"load-extra.sh"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"3. Skip standard shards for a sandbox."})}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:["Use ",e.jsx(n,{children:"--no-std"})," to prevent auto-loading the ",e.jsx(n,{children:"system/"})," ",`
directory, then add only the shards you trust with `,e.jsx(n,{children:"-l"}),"."]})}),`
`,e.jsx(a,{code:"shard app.shard --no-std -l mylib.dll",language:"bash",filename:"sandbox.sh"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"4. Understand the intended %SHARDSCRIPT% layout."})}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:["The intended design introduces a ",e.jsx(n,{children:"%SHARDSCRIPT%"}),` environment variable pointing at
an install root, with standard shards living under `,e.jsx(n,{children:"%SHARDSCRIPT%/system_libs"}),`.
Both the interpreter and Geode will consult this root, giving every tool on the machine one canonical
place to find the executable and its libraries.`]})}),`
`,e.jsx(a,{code:`# Intended layout (planned -- not yet read by the interpreter)
%SHARDSCRIPT%/
|-- shard.exe
\`-- system_libs/
  |-- stdio.dll
  |-- collections.dll
  |-- math.dll
  \`-- ...`,language:"text",filename:"layout-planned.txt"}),`
`,e.jsx(h,{tone:"amber",title:"Intended direction, not yet active",children:e.jsxs(s.p,{children:["The interpreter does not currently read ",e.jsx(n,{children:"%SHARDSCRIPT%"})," or"," ",`
`,e.jsx(n,{children:"system_libs"})," — the ",e.jsx(n,{children:"system/"}),`-beside-the-executable mechanism
above is what ships today. The environment-variable layout is the intended direction and will be
implemented in a future release.`]})}),`
`,e.jsx(d,{children:"Verification"}),`
`,e.jsx(r,{children:e.jsx(s.p,{children:"The search path is configured correctly if:"})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(t,{children:e.jsxs(s.p,{children:["Running ",e.jsx(n,{children:"shard app.shard"})," loads the standard shards without explicit"," ",`
`,e.jsx(n,{children:"-l"})," flags."]})}),e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx(n,{children:"shard app.shard -l mylib.dll"}),` makes the library's namespaces available through
`,e.jsx(n,{children:"using"}),"."]})})]}),`
`,e.jsx(d,{children:"Troubleshooting"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Standard shards are missing."})," Verify that a"," ",`
`,e.jsx(n,{children:"system/"})," folder exists next to the ",e.jsx(n,{children:"shard"}),` executable and
contains the DLLs or shared objects.`]})}),e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Custom shard not found."})," Check the path passed to"," ",`
`,e.jsx(n,{children:"-l"})," and confirm the DLL exports ",e.jsx(n,{children:"ShardLib_GetMetadata"})," and"," ",`
`,e.jsx(n,{children:"ShardLib_EntryPoint"}),"."]})})]}),`
`,e.jsx(d,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx(n,{children:"The shard CLI"})," — command-line flags including ",e.jsx(n,{children:"-l"})," and"," ",`
`,e.jsx(n,{children:"--no-std"}),"."]})}),e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx(n,{children:"Project Configuration"})," — organizing source files and build scripts."]})}),e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx(n,{children:"Native Library Overview"})," — building the shard DLLs that the interpreter loads."]})})]})]})}function x(i={}){const{wrapper:s}=i.components||{};return s?e.jsx(s,{...i,children:e.jsx(o,{...i})}):o(i)}function l(i,s){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
