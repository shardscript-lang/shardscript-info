import{j as e}from"./index-DLc5xCYN.js";function c(t){const n={p:"p",...t.components},{Bullet:i,CodeBlock:d,H2:l,InlineCode:r,Prose:s}=n;return i||a("Bullet"),d||a("CodeBlock"),l||a("H2"),r||a("InlineCode"),s||a("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(l,{children:"Prerequisites"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsx(n.p,{children:"A C++20 toolchain: MSVC on Windows or GCC/Clang on Linux."})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx(r,{children:"CMake"})," 3.31.6 or later and a compatible generator such as Ninja or Make."]})}),e.jsx(i,{children:e.jsx(n.p,{children:"Git, to clone the ShardScript repository and its third-party dependencies."})}),e.jsx(i,{children:e.jsx(n.p,{children:"Enough disk space for the compiler, VM, standard shards, and optional third-party shards."})})]}),`
`,e.jsx(l,{children:"Goal"}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:["Build the ",e.jsx(r,{children:"shard"}),` interpreter and every standard shard from the ShardScript
repository source. After the build you will have a working interpreter executable and a`," ",`
`,e.jsx(r,{children:"system/"})," directory containing the standard shard DLLs."]})}),`
`,e.jsx(l,{children:"Step-by-Step Instructions"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"1. Clone the repository."})}),`
`,e.jsx(d,{code:`git clone https://github.com/Rikitav/ShardScript.git
cd ShardScript`,language:"bash",filename:"clone.sh"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"2. Configure the build."})}),`
`,e.jsx(s,{children:e.jsx(n.p,{children:`ShardScript is written in C++20 and built with CMake. The repository is set up for MSVC and Ninja on
Windows, and for GCC/Clang with Ninja or Unix Makefiles on Linux.`})}),`
`,e.jsx(d,{code:`# Windows (MSVC + Ninja, Release)
cmake -S . -B build -G Ninja -DCMAKE_BUILD_TYPE=Release

# Linux (Ninja, Release)
cmake -S . -B build -G Ninja -DCMAKE_BUILD_TYPE=Release

# Linux (Unix Makefiles, Release)
cmake -S . -B build -DCMAKE_BUILD_TYPE=Release`,language:"bash",filename:"configure.sh"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"3. Build the interpreter and standard shards."})}),`
`,e.jsx(d,{code:"cmake --build build --parallel",language:"bash",filename:"build.sh"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"4. Verify the output layout."})}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:["After a successful build, the output directory contains the interpreter next to a"," ",`
`,e.jsx(r,{children:"system/"}),` folder with the standard shard DLLs. This is exactly the layout the
interpreter expects at startup.`]})}),`
`,e.jsx(d,{code:`build/
|-- bin/
|   |-- shard            (shard.exe on Windows)
|   -- system/
|       |-- stdio.dll
|       |-- collections.dll
|       |-- math.dll
|       -- ...`,language:"text",filename:"build-layout.txt"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"5. Run a quick smoke test."})}),`
`,e.jsx(d,{code:`# On Windows
.\build\binshard --help

# On Linux
./build/bin/shard --help`,language:"bash",filename:"smoke-test.sh"}),`
`,e.jsx(l,{children:"Verification"}),`
`,e.jsx(s,{children:e.jsx(n.p,{children:"The build succeeded if:"})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx(r,{children:"build/bin/shard"})," (or ",e.jsx(r,{children:"build/bin/shard.exe"}),") exists."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx(r,{children:"build/bin/system"})," contains the standard shard libraries."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx(r,{children:"shard --help"})," prints the command-line help."]})})]}),`
`,e.jsx(l,{children:"Troubleshooting"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Cannot find C++20 compiler."}),` Make sure MSVC, GCC, or Clang
is installed and visible on your PATH. On Windows, run from a "Developer Command Prompt" or use`," ",`
`,e.jsx(r,{children:"vcvarsall.bat"}),"."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Ninja is not found."}),` Install Ninja, or configure with the
default generator for your platform by omitting `,e.jsx(r,{children:"-G Ninja"}),"."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Missing third-party dependencies."}),` Some optional shards
(for example, raylib or SQLite) download or expect prebuilt static libraries. On MinGW these are skipped
automatically; on MSVC verify that any required prebuilt artifacts are present.`]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Runtime cannot find standard shards."}),` Run the interpreter
from the `,e.jsx(r,{children:"build/bin"})," directory, or ensure the working directory contains a"," ",`
`,e.jsx(r,{children:"system/"})," folder with the shard DLLs."]})})]}),`
`,e.jsx(l,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx(r,{children:"Installation"})," — installing prebuilt ShardScript binaries."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx(r,{children:"Hello World"})," — writing and running your first ShardScript program."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx(r,{children:"Runtime Architecture"})," — how the interpreter, compiler, and VM fit together."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx(r,{children:"Compiler Pipeline"})," — the stages that turn source into bytecode."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx(r,{children:"Virtual Machine Internals"})," — how the compiled bytecode is executed."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx(r,{children:"Event Loop and libuv"})," — how the runtime schedules asynchronous work."]})})]})]})}function h(t={}){const{wrapper:n}=t.components||{};return n?e.jsx(n,{...t,children:e.jsx(c,{...t})}):c(t)}function a(t,n){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};
