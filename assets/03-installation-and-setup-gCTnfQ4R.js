import{j as e}from"./index-DbYfS1MK.js";function c(i){const s={p:"p",...i.components},{Callout:n,CodeBlock:a,DocsTable:l,H2:d,InlineCode:t,Prose:r}=s;return n||o("Callout"),a||o("CodeBlock"),l||o("DocsTable"),d||o("H2"),t||o("InlineCode"),r||o("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(r,{children:e.jsxs(s.p,{children:["Getting ShardScript running is a three-piece affair: the ",e.jsx(t,{children:"shard"}),` interpreter
(which includes the compiler, the virtual machine, and the event loop), the`," ",`
`,e.jsx("strong",{children:"Standard Shards Collection"}),` of dynamic libraries, and — for dependency management —
the `,e.jsx(t,{children:"geode"}),` package manager (in development). This section walks through
building and using the interpreter and shards, configuring library paths, and wiring editors to the
language server.`]})}),`
`,e.jsx(d,{children:"Building the Interpreter"}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:[`ShardScript is written in C++20 and built with CMake (the repository is set up for MSVC and Ninja on
Windows). A single build produces the `,e.jsx(t,{children:"shard"}),` executable together with every
standard shard DLL.`]})}),`
`,e.jsx(a,{code:`# Clone the compiler, VM, and framework
git clone https://github.com/Rikitav/ShardScript.git
cd ShardScript

# Configure (Ninja generator, MSVC, C++20)
cmake -S . -B build -G Ninja -DCMAKE_BUILD_TYPE=Release

# Build the interpreter and every standard shard
cmake --build build --parallel

# Result:
#   build/bin/shard            (shard.exe on Windows)
#   build/bin/system/*.dll     (the standard shards)`,language:"bash",filename:"build.sh"}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:["After the build, ",e.jsx(t,{children:"shard"})," (or ",e.jsx(t,{children:"shard.exe"}),`) sits in the
build output directory next to a `,e.jsx(t,{children:"system/"}),` folder containing the shard DLLs —
which is exactly where the interpreter looks for them at startup.`]})}),`
`,e.jsx(n,{tone:"amber",title:"Build from source",children:e.jsxs(s.p,{children:[`There are no prebuilt binaries, installers, or system package-manager recipes published yet. Build
from source with the commands above. On Windows the repository also ships`," ",`
`,e.jsx(t,{children:"build_release.bat"})," and ",e.jsx(t,{children:"build_debug.bat"})," helper scripts."]})}),`
`,e.jsx(d,{children:"The shard Command Line"}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:["The ",e.jsx(t,{children:"shard"})," binary is the friendly front-end for the"," ",`
`,e.jsx(t,{children:"ShardScript.Interpreter"}),`. It compiles one or more source files, loads the
standard shards, and either runs the program, decompiles it, or drops into a REPL. Source and library
arguments both accept glob patterns.`]})}),`
`,e.jsx(l,{headers:["Flag","Description"],rows:[["-h, --help","Show the help screen."],["-i, --interactive","Start the interactive REPL console. (Also -r, --repl.)"],["-d, --decompiled","Decompile the entry point and print its bytecode instead of running."],["--no-std","Do not load the standard shards from the system directory. (Alias: --exclude-std.)"],["-l, --library <pattern>","Load an extra shard DLL; glob patterns are supported."],["<file>","A source file to compile and run (positional). Globs are supported."]]}),`
`,e.jsx(a,{code:`# Run a script (positional argument; globs allowed)
shard hello.shard

# Decompile the entry point to bytecode instead of running
shard -d hello.shard

# Start the interactive REPL
shard -i            # equivalents: --interactive, -r, --repl

# Load extra shards in addition to the standard set (globs supported)
shard app.shard -l path/to/mylib.dll
shard app.shard -l "libs/*.dll"

# Run with no standard shards at all (a clean sandbox)
shard app.shard --no-std`,language:"bash",filename:"cli.sh"}),`
`,e.jsx(d,{children:"The Standard Shards Collection"}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:["ShardScript has no monolithic standard library. Instead the ",e.jsx("strong",{children:"Standard Shards Collection"})," ",`
ships each subsystem as its own DLL — a `,e.jsx("em",{children:"shard"}),`. At startup the interpreter auto-loads every
shard from its `,e.jsx(t,{children:"system/"})," directory, so a script can simply"," ",`
`,e.jsx(t,{children:"using"})," the ones it needs. The collection currently includes:"]})}),`
`,e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"bg-[#252538] border border-[#3A3A50] rounded-card p-4",children:[e.jsx("code",{className:"text-sm font-jetbrains text-[#7A8AB5]",children:"stdio"}),e.jsx("p",{className:"text-sm text-text-secondary mt-1",children:"Console I/O: print, println, input, cursor control"})]}),e.jsxs("div",{className:"bg-[#252538] border border-[#3A3A50] rounded-card p-4",children:[e.jsx("code",{className:"text-sm font-jetbrains text-[#7A8AB5]",children:"collections"}),e.jsx("p",{className:"text-sm text-text-secondary mt-1",children:"List<T>, Dictionary<K,V>, Stack<T>, Queue<T>"})]}),e.jsxs("div",{className:"bg-[#252538] border border-[#3A3A50] rounded-card p-4",children:[e.jsx("code",{className:"text-sm font-jetbrains text-[#7A8AB5]",children:"strings"}),e.jsx("p",{className:"text-sm text-text-secondary mt-1",children:"String manipulation and formatting"})]}),e.jsxs("div",{className:"bg-[#252538] border border-[#3A3A50] rounded-card p-4",children:[e.jsx("code",{className:"text-sm font-jetbrains text-[#7A8AB5]",children:"math"}),e.jsx("p",{className:"text-sm text-text-secondary mt-1",children:"Math functions; math.random for RNG"})]}),e.jsxs("div",{className:"bg-[#252538] border border-[#3A3A50] rounded-card p-4",children:[e.jsx("code",{className:"text-sm font-jetbrains text-[#7A8AB5]",children:"json"}),e.jsx("p",{className:"text-sm text-text-secondary mt-1",children:"JSON parsing and serialization"})]}),e.jsxs("div",{className:"bg-[#252538] border border-[#3A3A50] rounded-card p-4",children:[e.jsx("code",{className:"text-sm font-jetbrains text-[#7A8AB5]",children:"http"}),e.jsx("p",{className:"text-sm text-text-secondary mt-1",children:"HTTP client and server"})]}),e.jsxs("div",{className:"bg-[#252538] border border-[#3A3A50] rounded-card p-4",children:[e.jsx("code",{className:"text-sm font-jetbrains text-[#7A8AB5]",children:"socket"}),e.jsx("p",{className:"text-sm text-text-secondary mt-1",children:"TCP socket operations"})]}),e.jsxs("div",{className:"bg-[#252538] border border-[#3A3A50] rounded-card p-4",children:[e.jsx("code",{className:"text-sm font-jetbrains text-[#7A8AB5]",children:"async"}),e.jsx("p",{className:"text-sm text-text-secondary mt-1",children:"Task, TaskCompletionSource, cancellation"})]}),e.jsxs("div",{className:"bg-[#252538] border border-[#3A3A50] rounded-card p-4",children:[e.jsx("code",{className:"text-sm font-jetbrains text-[#7A8AB5]",children:"streams"}),e.jsx("p",{className:"text-sm text-text-secondary mt-1",children:"Stream-based I/O"})]}),e.jsxs("div",{className:"bg-[#252538] border border-[#3A3A50] rounded-card p-4",children:[e.jsx("code",{className:"text-sm font-jetbrains text-[#7A8AB5]",children:"filesystem"}),e.jsx("p",{className:"text-sm text-text-secondary mt-1",children:"File, directory, and path operations"})]}),e.jsxs("div",{className:"bg-[#252538] border border-[#3A3A50] rounded-card p-4",children:[e.jsx("code",{className:"text-sm font-jetbrains text-[#7A8AB5]",children:"environment"}),e.jsx("p",{className:"text-sm text-text-secondary mt-1",children:"Environment variable access"})]}),e.jsxs("div",{className:"bg-[#252538] border border-[#3A3A50] rounded-card p-4",children:[e.jsx("code",{className:"text-sm font-jetbrains text-[#7A8AB5]",children:"interop"}),e.jsx("p",{className:"text-sm text-text-secondary mt-1",children:"Native library calls and marshalling (cinterop.dll)"})]}),e.jsxs("div",{className:"bg-[#252538] border border-[#3A3A50] rounded-card p-4",children:[e.jsx("code",{className:"text-sm font-jetbrains text-[#7A8AB5]",children:"debug"}),e.jsx("p",{className:"text-sm text-text-secondary mt-1",children:"typeof, sizeof, PrintGcInfo"})]}),e.jsxs("div",{className:"bg-[#252538] border border-[#3A3A50] rounded-card p-4",children:[e.jsx("code",{className:"text-sm font-jetbrains text-[#7A8AB5]",children:"reflection"}),e.jsx("p",{className:"text-sm text-text-secondary mt-1",children:"Type, method, and field inspection"})]}),e.jsxs("div",{className:"bg-[#252538] border border-[#3A3A50] rounded-card p-4",children:[e.jsx("code",{className:"text-sm font-jetbrains text-[#7A8AB5]",children:"subprocess"}),e.jsx("p",{className:"text-sm text-text-secondary mt-1",children:"Spawn and manage child processes"})]})]}),`
`,e.jsx(n,{tone:"green",title:"Scope control",children:e.jsxs(s.p,{children:["Pass ",e.jsx(t,{children:"--no-std"})," to skip auto-loading the ",e.jsx(t,{children:"system/"})," ",`
directory entirely, then add only the shards you trust with `,e.jsx(t,{children:"-l"}),`. Combined with
the symbol-injection model, this lets the host control exactly which APIs a script can reach.`]})}),`
`,e.jsx(d,{children:"Optional Third-Party Shards"}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:["The framework repository also builds several optional shards in"," ",`
`,e.jsx(t,{children:"third_party/"}),`. These are not loaded by default and must be referenced explicitly
with `,e.jsx(t,{children:"-l"})," or copied into the host's shard search path."]})}),`
`,e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"bg-[#252538] border border-[#3A3A50] rounded-card p-4",children:[e.jsx("code",{className:"text-sm font-jetbrains text-[#7A8AB5]",children:"raylib"}),e.jsx("p",{className:"text-sm text-text-secondary mt-1",children:"2D/3D graphics, windowing, input, audio (optional third-party shard)"})]}),e.jsxs("div",{className:"bg-[#252538] border border-[#3A3A50] rounded-card p-4",children:[e.jsx("code",{className:"text-sm font-jetbrains text-[#7A8AB5]",children:"Database"}),e.jsx("p",{className:"text-sm text-text-secondary mt-1",children:"SQLite3 connection and command execution (optional third-party shard)"})]}),e.jsxs("div",{className:"bg-[#252538] border border-[#3A3A50] rounded-card p-4",children:[e.jsx("code",{className:"text-sm font-jetbrains text-[#7A8AB5]",children:"terminality"}),e.jsx("p",{className:"text-sm text-text-secondary mt-1",children:"Terminal UI host and controls (optional third-party shard)"})]})]}),`
`,e.jsx(d,{children:"Library Paths and the system Directory"}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:["Today the interpreter resolves standard shards by looking for a ",e.jsx(t,{children:"system/"}),` folder
next to its own executable (`,e.jsx(t,{children:"ExecutableDirectory() / system"}),`). Because the build
emits the shard DLLs straight into `,e.jsx(t,{children:"bin/system"}),`, a freshly built tree is already
laid out correctly — no path configuration required.`]})}),`
`,e.jsx(a,{code:`# Current (implemented): shards live in a system/ folder beside the executable
<install>/
|-- shard              (shard.exe on Windows)
\`-- system/            <- auto-discovered at startup
  |-- stdio.dll
  |-- collections.dll
  |-- math.dll
  \`-- ...`,language:"text",filename:"layout-current.txt"}),`
`,e.jsx("h3",{className:"font-space text-lg font-semibold text-text-primary mb-3 mt-6",children:"The intended %SHARDSCRIPT% layout"}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:["The intended design introduces a ",e.jsx(t,{children:"%SHARDSCRIPT%"}),` environment variable pointing at
an install root, with standard shards living under `,e.jsx(t,{children:"%SHARDSCRIPT%/system_libs"}),`.
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
`,e.jsx(n,{tone:"amber",title:"Intended direction, not yet active",children:e.jsxs(s.p,{children:["The interpreter does not currently read ",e.jsx(t,{children:"%SHARDSCRIPT%"})," or"," ",`
`,e.jsx(t,{children:"system_libs"})," — the ",e.jsx(t,{children:"system/"}),`-beside-the-executable mechanism
above is what ships today. The environment-variable layout is the intended direction and will be
implemented in a future release.`]})}),`
`,e.jsx(d,{children:"The Geode Package Manager"}),`
`,e.jsx(n,{tone:"amber",title:"In development",children:e.jsx(s.p,{children:`Geode is the planned package manager for ShardScript. It is under active development and is not yet
available for general use. The design described here is the target shape, not the shipping
implementation.`})}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx(t,{children:"geode"}),` is intended to be a NuGet-style tool for resolving, fetching, and
publishing shards. A project will be described by a `,e.jsx(t,{children:"geode.env"}),` manifest; Geode
will resolve dependencies (with SemVer constraints), cache them under`," ",`
`,e.jsx(t,{children:"~/.geode/cache"}),", and restore them into a local ",e.jsx(t,{children:"./libs"})," ",`
directory for the interpreter to load.`]})}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:["Geode is being built as a .NET solution: build it, then run the backend registry and use the"," ",`
`,e.jsx(t,{children:"geode"})," CLI."]})}),`
`,e.jsx(a,{code:`# Build the Geode solution (.NET)
cd Geode
dotnet build

# In another terminal, start the package registry backend
# (defaults to http://localhost:5000)
cd src/Geode.Backend.Api
dotnet run`,language:"bash",filename:"geode-setup.sh"}),`
`,e.jsxs(r,{children:["A project manifest (",e.jsx(t,{children:"geode.env"}),") is planned to look like this:"]}),`
`,e.jsx(a,{code:`# geode.env -- a project manifest (TOML-like)
[project]
name = "my-app"
version = "1.0.0"
authors = []

[dependencies]
# shard.collections = "1.0.0"

[environment]
SHARDSCRIPT_ENV = "development"`,language:"toml",filename:"geode.env"}),`
`,e.jsx(r,{children:"The planned CLI verbs:"}),`
`,e.jsx(l,{headers:["Command","Description"],rows:[["geode init [name]","Create a new Geode project (writes geode.env) in the current directory."],["geode restore","Resolve dependencies from geode.env into the local cache and ./libs."],["geode fetch <pkg> [-v <ver>] [-g]","Download a package into the local (or --global) library directory."],["geode run [script]","Run a ShardScript file using Geode-managed library paths."],["geode pack <src> [-o] [-r] [-l]","Build a .shardpkg archive from a source directory."],["geode publish <pkg>","Publish a .shardpkg file to the Geode registry."],["geode auth register | login | logout","Manage credentials for the Geode registry."]]}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:["Packages will be distributed as ",e.jsx(t,{children:".shardpkg"}),` archives (
`,e.jsx(t,{children:"pack"})," builds one, ",e.jsx(t,{children:"publish"}),` uploads it) and may target a
specific runtime identifier so platform-specific native shards resolve correctly.`]})}),`
`,e.jsx(n,{tone:"amber",title:"Self-hosted registry",children:e.jsxs(s.p,{children:["Geode's registry is planned to default to ",e.jsx(t,{children:"http://localhost:5000"}),` — you run
the backend yourself. There is no public package index yet; Geode will first be useful for managing
shards across your own projects and machines.`]})}),`
`,e.jsx(d,{children:"Editor Integration"}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:["ShardScript includes a Language Server (the ",e.jsx(t,{children:"lsp"})," binary, built from"," ",`
`,e.jsx(t,{children:"ShardScript.LspServer"}),`) that speaks the Language Server Protocol over stdio.
Editors connect to it like any other LSP server.`]})}),`
`,e.jsx(n,{tone:"amber",title:"In development and Win32-only",children:e.jsx(s.p,{children:`The language server builds and runs on Windows today. Linux/Unix support is not yet implemented, and
the server is still rough — expect missing diagnostics and incomplete completions.`})}),`
`,e.jsx(n,{tone:"blue",title:"No first-party extensions yet",children:e.jsxs(s.p,{children:["There are no packaged Zed, VS Code, or Neovim extensions published today. Each editor is wired to the"," ",`
`,e.jsx(t,{children:"lsp"}),` binary manually as a generic LSP server; some editors may also need a small
file-type association for `,e.jsx(t,{children:".shard"})," files."]})}),`
`,e.jsx("h3",{className:"font-space text-lg font-semibold text-text-primary mb-3 mt-6",children:"Neovim"}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:["With ",e.jsx(t,{children:"nvim-lspconfig"}),", register a custom server pointing at the binary:"]})}),`
`,e.jsx(a,{code:`-- Neovim: register the ShardScript language server via lspconfig
local configs = require('lspconfig.configs')
local util    = require('lspconfig.util')

configs.shardscript = {
default_config = {
  cmd = { '/absolute/path/to/lsp' },
  filetypes = { 'shard' },
  root_dir = util.find_git_ancestor,
},
}

require('lspconfig').shardscript.setup({})`,language:"lua",filename:"init.lua"}),`
`,e.jsx("h3",{className:"font-space text-lg font-semibold text-text-primary mb-3 mt-6",children:"VS Code and Zed"}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:[`VS Code needs a client extension to launch an arbitrary server; use a generic LSP-client extension (or
a tiny generated extension) configured to spawn `,e.jsx(t,{children:"lsp"})," for"," ",`
`,e.jsx(t,{children:".shard"})," files. In Zed, register the binary under the"," ",`
`,e.jsx(t,{children:"lsp"}),` key in your settings and associate it with the ShardScript language. In both
cases the server itself is the same `,e.jsx(t,{children:"lsp"})," binary — only the hosting glue differs."]})}),`
`,e.jsx(n,{tone:"green",title:"You are set up",children:e.jsxs(s.p,{children:["With ",e.jsx(t,{children:"shard"})," built, the standard shards in ",e.jsx(t,{children:"system/"}),`, and
your editor wired to the language server, you have the core toolchain. Geode and additional SDKs are in
development. Head to the language reference to start writing code.`]})})]})}function x(i={}){const{wrapper:s}=i.components||{};return s?e.jsx(s,{...i,children:e.jsx(c,{...i})}):c(i)}function o(i,s){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
