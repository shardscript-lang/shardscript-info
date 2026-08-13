import{j as e}from"./index-B-x28vAk.js";function c(t){const r={p:"p",...t.components},{Bullet:i,CodeBlock:d,DocsTable:l,H2:n,InlineCode:s,Prose:a}=r;return i||o("Bullet"),d||o("CodeBlock"),l||o("DocsTable"),n||o("H2"),s||o("InlineCode"),a||o("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"Summary"}),`
`,e.jsx(a,{children:e.jsxs(r.p,{children:["The ",e.jsx(s,{children:"shard"}),` command-line tool compiles one or more ShardScript source files,
loads standard and user-provided shards, and runs the program, decompiles it, or starts an interactive
REPL session.`]})}),`
`,e.jsx(n,{children:"Syntax"}),`
`,e.jsx(d,{code:`shard [options] <source-files...>
shard
shard -i
shard --interactive
shard -d <source-files...>
shard --decompiled <source-files...>`,language:"bash",filename:"cli-syntax.sh"}),`
`,e.jsx(n,{children:"Parameters / Arguments"}),`
`,e.jsx(l,{headers:["Flag","Description"],rows:[["-h, --help","Show the help screen."],["-i, --interactive, -r, --repl","Start the interactive REPL console."],["-d, --decompiled","Decompile the entry point and print its bytecode instead of running."],["--no-std, --exclude-std","Do not load the standard shards from the system directory."],["-l, --library <pattern>","Load an extra shard DLL; glob patterns are supported."],["<file>","A source file to compile and run (positional). Globs are supported."]]}),`
`,e.jsx(n,{children:"Returns"}),`
`,e.jsx(a,{children:e.jsxs(r.p,{children:["By default the command returns the exit status of the compiled program. With"," ",`
`,e.jsx(s,{children:"-d"}),` it prints disassembled bytecode to stdout and exits with status 0 on success.
When no source files and no action flags are supplied, or when `,e.jsx(s,{children:"-i"}),` is given, it
runs an interactive loop until EOF or an explicit exit.`]})}),`
`,e.jsx(n,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Compilation errors."}),` Lexical, syntax, or semantic errors are
printed to stderr and the program does not run.`]})}),e.jsx(i,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Missing entry point."}),` A program must contain a public static
method named `,e.jsx(s,{children:"Main"})," unless running in REPL mode."]})}),e.jsx(i,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Shard load failure."})," A library passed with"," ",`
`,e.jsx(s,{children:"-l"})," that cannot be found or lacks the required exports aborts startup."]})})]}),`
`,e.jsx(n,{children:"Remarks"}),`
`,e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Source globs."})," Positional source arguments accept single-directory glob patterns such as"," ",`
`,e.jsx(s,{children:"shard src/*.shard"}),". Recursive globs like"," ",`
`,e.jsx(s,{children:"src/**/*.shard"}),` must be expanded by the shell; the interpreter does not traverse
subdirectories itself.`]})}),`
`,e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Standard shard auto-loading."})," Unless ",e.jsx(s,{children:"--no-std"}),` is passed, the
interpreter loads every shard DLL from the `,e.jsx(s,{children:"system/"}),` directory beside the
executable. This is how namespaces such as `,e.jsx(s,{children:"stdio"}),", ",e.jsx(s,{children:"collections"}),`,
and `,e.jsx(s,{children:"async"})," become available without explicit ",e.jsx(s,{children:"-l"})," flags."]})}),`
`,e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"REPL mode."}),` The interactive console evaluates statements one at a time. If you start the
interpreter without source files and without `,e.jsx(s,{children:"-d"})," or ",e.jsx(s,{children:"-h"}),`,
the REPL starts automatically. It is useful for quick experiments, but keep in mind that ShardScript is a
compiled language: even the REPL compiles each input before executing it.`]})}),`
`,e.jsx(n,{children:"Examples"}),`
`,e.jsx(d,{code:`# Run a script (positional argument; globs allowed)
shard hello.shard

# Decompile the entry point to bytecode instead of running
shard -d hello.shard

# Start the interactive REPL explicitly
shard -i

# Start the REPL implicitly when no action or source file is given
shard

# Load extra shards in addition to the standard set (globs supported)
shard app.shard -l path/to/mylib.dll
shard app.shard -l "libs/*.dll"

# Run with no standard shards at all (a clean sandbox)
shard app.shard --no-std`,language:"bash",filename:"cli-examples.sh"}),`
`,e.jsx(n,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsxs(r.p,{children:[e.jsx(s,{children:"Project Configuration"}),` — organizing source files and compiler options for real
projects.`]})}),e.jsx(i,{children:e.jsxs(r.p,{children:[e.jsx(s,{children:"Library Search Paths"})," — how the interpreter finds shard DLLs."]})}),e.jsx(i,{children:e.jsxs(r.p,{children:[e.jsx(s,{children:"Installation"})," — installing the ",e.jsx(s,{children:"shard"}),` interpreter and
standard shards.`]})})]}),`
`,e.jsx(n,{children:"Source"}),`
`,e.jsx(a,{children:e.jsxs(r.p,{children:["The ",e.jsx(s,{children:"shard"}),` front-end is implemented in the ShardScript interpreter project. See the
ShardScript repository for the command-line parsing and startup code.`]})})]})}function p(t={}){const{wrapper:r}=t.components||{};return r?e.jsx(r,{...t,children:e.jsx(c,{...t})}):c(t)}function o(t,r){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
