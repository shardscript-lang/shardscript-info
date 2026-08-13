import{j as e}from"./index-DLc5xCYN.js";function d(t){const s={p:"p",...t.components},{Bullet:n,CodeBlock:c,H2:l,InlineCode:r,Prose:i}=s;return n||a("Bullet"),c||a("CodeBlock"),l||a("H2"),r||a("InlineCode"),i||a("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(l,{children:"Prerequisites"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(n,{children:e.jsxs(s.p,{children:["A working ShardScript installation. Follow the ",e.jsx(r,{children:"Installation"}),` guide if you have
not installed the interpreter yet.`]})}),e.jsx(n,{children:e.jsxs(s.p,{children:["A directory containing one or more ",e.jsx(r,{children:".shard"})," source files."]})}),e.jsx(n,{children:e.jsxs(s.p,{children:["Familiarity with the ",e.jsx(r,{children:"shard"})," CLI."]})})]}),`
`,e.jsx(l,{children:"Goal"}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[`Organize a ShardScript project so that source files, shard libraries, and build output are separated,
and create a reproducible invocation of the `,e.jsx(r,{children:"shard"})," compiler for your project."]})}),`
`,e.jsx(l,{children:"Step-by-Step Instructions"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"1. Create a project directory layout."})}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:["A simple project keeps source files under ",e.jsx(r,{children:"src/"}),", local shard libraries under"," ",`
`,e.jsx(r,{children:"libs/"}),", and build scripts at the root."]})}),`
`,e.jsx(c,{code:`my-project/
|-- src/
|   |-- main.shard
|   -- utils.shard
|-- libs/
|   -- (optional local .dll shards)
|-- build.sh
-- run.sh`,language:"text",filename:"layout.txt"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"2. Write a build or run script."})}),`
`,e.jsx(i,{children:e.jsx(s.p,{children:`Because the interpreter compiles source on every run, a project is usually driven by a small shell or
batch script that captures the correct flags and globs.`})}),`
`,e.jsx(c,{code:`#!/bin/bash
# run.sh — build and run the project
set -e

shard src/*.shard "$@"`,language:"bash",filename:"run.sh"}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:["If the project depends on local shards, add the ",e.jsx(r,{children:"-l"})," flag to the script."]})}),`
`,e.jsx(c,{code:`#!/bin/bash
# run.sh — build and run the project with local shards
set -e

shard src/*.shard -l "libs/*.dll" "$@"`,language:"bash",filename:"run-with-libs.sh"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"3. Ensure the entry point is discoverable."})}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:["Exactly one source file should declare a public static ",e.jsx(r,{children:"Main"}),` method with no
parameters and a `,e.jsx(r,{children:"void"})," return type. Place it in ",e.jsx(r,{children:"src/main.shard"})," ",`
or another clearly named file so the project is easy to understand.`]})}),`
`,e.jsx(c,{code:`using stdio;

namespace myproject;

public static func Main() -> void
{
  println("running");
}`,language:"csharp",filename:"src/main.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"4. Keep the project runnable from a clean terminal."})}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[`The script should work without requiring a specific working directory. Relative paths inside the script are
resolved from the directory where the script is invoked, so running `,e.jsx(r,{children:"./run.sh"}),` from
the project root is the standard workflow.`]})}),`
`,e.jsx(l,{children:"Verification"}),`
`,e.jsx(i,{children:e.jsx(s.p,{children:"The configuration is correct if:"})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx(r,{children:"./run.sh"})," compiles all source files and starts the program."]})}),e.jsx(n,{children:e.jsxs(s.p,{children:["Adding a new ",e.jsx(r,{children:".shard"})," file under ",e.jsx(r,{children:"src/"}),` is picked up
automatically by the glob.`]})}),e.jsx(n,{children:e.jsx(s.p,{children:"The program runs the same way on a fresh clone after installing the interpreter."})})]}),`
`,e.jsx(l,{children:"Troubleshooting"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Glob does not expand."}),` The interpreter only expands
single-directory globs such as `,e.jsx(r,{children:"src/*.shard"}),". Recursive globs like"," ",`
`,e.jsx(r,{children:"src/**/*.shard"}),` must be expanded by the shell, or you must list each directory
explicitly.`]})}),e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Entry point not found."})," Make sure ",e.jsx(r,{children:"Main"}),`
is `,e.jsx(r,{children:"public"}),", ",e.jsx(r,{children:"static"}),", takes no parameters, and returns"," ",`
`,e.jsx(r,{children:"void"}),"."]})}),e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Missing standard shards."})," Verify that the ",e.jsx(r,{children:"shard"}),`
executable has a `,e.jsx(r,{children:"system/"}),` directory beside it. The interpreter does not consult
the `,e.jsx(r,{children:"SHARDSCRIPT"})," environment variable for the standard shard path."]})})]}),`
`,e.jsx(l,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx(r,{children:"The shard CLI"})," — the full command-line reference."]})}),e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx(r,{children:"Package Management with Geode"})," — managing external dependencies."]})}),e.jsx(n,{children:e.jsxs(s.p,{children:[e.jsx(r,{children:"Library Search Paths"})," — how the interpreter resolves shard DLLs."]})})]})]})}function o(t={}){const{wrapper:s}=t.components||{};return s?e.jsx(s,{...t,children:e.jsx(d,{...t})}):d(t)}function a(t,s){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{o as default};
