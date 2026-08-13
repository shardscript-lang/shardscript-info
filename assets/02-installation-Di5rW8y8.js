import{j as e}from"./index-DkFwvLJL.js";function c(a){const r={p:"p",...a.components},{Bullet:n,Callout:d,CodeBlock:o,H2:i,InlineCode:s,Prose:t}=r;return n||l("Bullet"),d||l("Callout"),o||l("CodeBlock"),i||l("H2"),s||l("InlineCode"),t||l("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:e.jsxs(r.p,{children:["Getting ShardScript running is a three-piece affair: the ",e.jsx(s,{children:"shard"}),` interpreter
(which includes the compiler, the virtual machine, and the event loop), the`," ",`
`,e.jsx("strong",{children:"Standard Shards Collection"}),` of dynamic libraries, and — for dependency management —
the `,e.jsx(s,{children:"geode"}),` package manager (in development). This guide walks through
installing the interpreter and shards, configuring library paths, and wiring editors to the language
server.`]})}),`
`,e.jsx(i,{children:"Install from a Release"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:["Prebuilt binaries are published for Windows and Linux on the"," ",`
`,e.jsx("a",{href:"https://github.com/Rikitav/ShardScript/releases/tag/0.5.2",className:"underline",children:"0.5.2 release"})," ",`
page. The installer scripts below download the matching archive, extract it into a system-wide directory,
and set up the `,e.jsx(s,{children:"SHARDSCRIPT"})," environment variable."]})}),`
`,e.jsx("h3",{className:"font-space text-lg font-semibold text-text-primary mb-3 mt-6",children:"Windows"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:["The PowerShell installer extracts the Windows archive into"," ",`
`,e.jsx(s,{children:"%ProgramFiles%\\ShardScript"})," and creates the"," ",`
`,e.jsx(s,{children:"%SHARDSCRIPT%"})," environment variable."]})}),`
`,e.jsx(o,{code:`# Option A: one-liner (run in an elevated PowerShell window)
irm https://shardscript-lang.github.io/shardscript-info/install-shardscript.ps1 | iex

# Option B: download the script first so you can inspect it
Invoke-WebRequest -Uri "https://shardscript-lang.github.io/shardscript-info/install-shardscript.ps1" -OutFile "install-shardscript.ps1"
.install-shardscript.ps1

# Optional: also add the install directory to your machine PATH
.install-shardscript.ps1 -AddToPath

# One-liner with PATH registration
& ([scriptblock]::Create((irm https://shardscript-lang.github.io/shardscript-info/install-shardscript.ps1))) -AddToPath`,language:"powershell",filename:"install-windows.ps1"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:["After the script finishes, open a new terminal. The interpreter will be located at"," ",`
`,e.jsx(s,{children:"%ProgramFiles%\\ShardScript\\shard.exe"})," and the standard shards will be in the"," ",`
`,e.jsx(s,{children:"system"})," folder beside it."]})}),`
`,e.jsx("h3",{className:"font-space text-lg font-semibold text-text-primary mb-3 mt-6",children:"Linux"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:["The Bash installer extracts the Linux archive into ",e.jsx(s,{children:"/opt/shardscript"}),", symlinks"," ",`
`,e.jsx(s,{children:"shard"})," into ",e.jsx(s,{children:"/usr/local/bin"}),` so it is on the default PATH,
and writes `,e.jsx(s,{children:"SHARDSCRIPT"})," to ",e.jsx(s,{children:"/etc/profile.d/shardscript.sh"})," ",`
for all users.`]})}),`
`,e.jsx(o,{code:`# Option A: one-liner (run as root or with sudo)
curl -fsSL https://shardscript-lang.github.io/shardscript-info/install-shardscript.sh | sudo bash

# Option B: download the script first so you can inspect it
curl -fsSL https://shardscript-lang.github.io/shardscript-info/install-shardscript.sh -o install-shardscript.sh
sudo bash install-shardscript.sh`,language:"bash",filename:"install-linux.sh"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:["After the script finishes, open a new terminal or run"," ",`
`,e.jsx(s,{children:"source /etc/profile.d/shardscript.sh"}),". The interpreter will be located at"," ",`
`,e.jsx(s,{children:"/opt/shardscript/shard"}),", the standard shards will be in"," ",`
`,e.jsx(s,{children:"/opt/shardscript/system"}),", and the ",e.jsx(s,{children:"shard"}),` command will be
available from any prompt.`]})}),`
`,e.jsx(d,{tone:"blue",title:"What the scripts do",children:e.jsxs(r.p,{children:[`Both installers require root/Administrator privileges because they write to system directories. They
download `,e.jsx(s,{children:"shardscript-0.5.2-windows.zip"})," or"," ",`
`,e.jsx(s,{children:"shardscript-0.5.2-linux.tar.gz"})," from the"," ",`
`,e.jsx("a",{href:"https://github.com/Rikitav/ShardScript/releases/tag/0.5.2",className:"underline",children:"0.5.2 release"}),`,
extract the archive, set `,e.jsx(s,{children:"SHARDSCRIPT"})," to the install root, and make the"," ",`
`,e.jsx(s,{children:"shard"}),` command available. The Windows script optionally appends the install root to
machine `,e.jsx(s,{children:"PATH"}),"; the Linux script creates a symlink in"," ",`
`,e.jsx(s,{children:"/usr/local/bin"})," instead."]})}),`
`,e.jsx(i,{children:"The shard Command Line"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:["The ",e.jsx(s,{children:"shard"})," binary is the friendly front-end for the"," ",`
`,e.jsx(s,{children:"ShardScript.Interpreter"}),`. After installation you can run scripts, start the REPL, or
decompile bytecode. See `,e.jsx(s,{children:"The shard CLI"}),` in the Build Your Project section for the full
command reference.`]})}),`
`,e.jsx(i,{children:"The Standard Shards Collection"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:["ShardScript has no monolithic standard library. Instead the ",e.jsx("strong",{children:"Standard Shards Collection"})," ",`
ships each subsystem as its own DLL — a `,e.jsx("em",{children:"shard"}),`. At startup the interpreter auto-loads every
shard from its `,e.jsx(s,{children:"system/"})," directory, so a script can simply"," ",`
`,e.jsx(s,{children:"using"})," the ones it needs. The collection currently includes:"]})}),`
`,e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"bg-[#252538] border border-[#3A3A50] rounded-card p-4",children:[e.jsx("code",{className:"text-sm font-jetbrains text-[#7A8AB5]",children:"stdio"}),e.jsx("p",{className:"text-sm text-text-secondary mt-1",children:"Console I/O: print, println, input, cursor control"})]}),e.jsxs("div",{className:"bg-[#252538] border border-[#3A3A50] rounded-card p-4",children:[e.jsx("code",{className:"text-sm font-jetbrains text-[#7A8AB5]",children:"collections"}),e.jsx("p",{className:"text-sm text-text-secondary mt-1",children:"List<T>, Dictionary<K,V>, Stack<T>, Queue<T>"})]}),e.jsxs("div",{className:"bg-[#252538] border border-[#3A3A50] rounded-card p-4",children:[e.jsx("code",{className:"text-sm font-jetbrains text-[#7A8AB5]",children:"strings"}),e.jsx("p",{className:"text-sm text-text-secondary mt-1",children:"String manipulation and formatting"})]}),e.jsxs("div",{className:"bg-[#252538] border border-[#3A3A50] rounded-card p-4",children:[e.jsx("code",{className:"text-sm font-jetbrains text-[#7A8AB5]",children:"math"}),e.jsx("p",{className:"text-sm text-text-secondary mt-1",children:"Math functions; math.random for RNG"})]}),e.jsxs("div",{className:"bg-[#252538] border border-[#3A3A50] rounded-card p-4",children:[e.jsx("code",{className:"text-sm font-jetbrains text-[#7A8AB5]",children:"json"}),e.jsx("p",{className:"text-sm text-text-secondary mt-1",children:"JSON parsing and serialization"})]}),e.jsxs("div",{className:"bg-[#252538] border border-[#3A3A50] rounded-card p-4",children:[e.jsx("code",{className:"text-sm font-jetbrains text-[#7A8AB5]",children:"http"}),e.jsx("p",{className:"text-sm text-text-secondary mt-1",children:"HTTP client and server"})]}),e.jsxs("div",{className:"bg-[#252538] border border-[#3A3A50] rounded-card p-4",children:[e.jsx("code",{className:"text-sm font-jetbrains text-[#7A8AB5]",children:"socket"}),e.jsx("p",{className:"text-sm text-text-secondary mt-1",children:"TCP socket operations"})]}),e.jsxs("div",{className:"bg-[#252538] border border-[#3A3A50] rounded-card p-4",children:[e.jsx("code",{className:"text-sm font-jetbrains text-[#7A8AB5]",children:"async"}),e.jsx("p",{className:"text-sm text-text-secondary mt-1",children:"Task, TaskCompletionSource, cancellation"})]}),e.jsxs("div",{className:"bg-[#252538] border border-[#3A3A50] rounded-card p-4",children:[e.jsx("code",{className:"text-sm font-jetbrains text-[#7A8AB5]",children:"streams"}),e.jsx("p",{className:"text-sm text-text-secondary mt-1",children:"Stream-based I/O"})]}),e.jsxs("div",{className:"bg-[#252538] border border-[#3A3A50] rounded-card p-4",children:[e.jsx("code",{className:"text-sm font-jetbrains text-[#7A8AB5]",children:"filesystem"}),e.jsx("p",{className:"text-sm text-text-secondary mt-1",children:"File, directory, and path operations"})]}),e.jsxs("div",{className:"bg-[#252538] border border-[#3A3A50] rounded-card p-4",children:[e.jsx("code",{className:"text-sm font-jetbrains text-[#7A8AB5]",children:"environment"}),e.jsx("p",{className:"text-sm text-text-secondary mt-1",children:"Environment variable access"})]}),e.jsxs("div",{className:"bg-[#252538] border border-[#3A3A50] rounded-card p-4",children:[e.jsx("code",{className:"text-sm font-jetbrains text-[#7A8AB5]",children:"interop"}),e.jsx("p",{className:"text-sm text-text-secondary mt-1",children:"Native library calls and marshalling (cinterop.dll)"})]}),e.jsxs("div",{className:"bg-[#252538] border border-[#3A3A50] rounded-card p-4",children:[e.jsx("code",{className:"text-sm font-jetbrains text-[#7A8AB5]",children:"debug"}),e.jsx("p",{className:"text-sm text-text-secondary mt-1",children:"typeof, sizeof, PrintGcInfo"})]}),e.jsxs("div",{className:"bg-[#252538] border border-[#3A3A50] rounded-card p-4",children:[e.jsx("code",{className:"text-sm font-jetbrains text-[#7A8AB5]",children:"reflection"}),e.jsx("p",{className:"text-sm text-text-secondary mt-1",children:"Type, method, and field inspection"})]}),e.jsxs("div",{className:"bg-[#252538] border border-[#3A3A50] rounded-card p-4",children:[e.jsx("code",{className:"text-sm font-jetbrains text-[#7A8AB5]",children:"subprocess"}),e.jsx("p",{className:"text-sm text-text-secondary mt-1",children:"Spawn and manage child processes"})]})]}),`
`,e.jsx(d,{tone:"green",title:"Scope control",children:e.jsxs(r.p,{children:["Pass ",e.jsx(s,{children:"--no-std"})," to skip auto-loading the ",e.jsx(s,{children:"system/"})," ",`
directory entirely, then add only the shards you trust with `,e.jsx(s,{children:"-l"}),`. Combined with
the symbol-injection model, this lets the host control exactly which APIs a script can reach.`]})}),`
`,e.jsx(i,{children:"Optional Third-Party Shards"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:["The framework repository also builds several optional shards in"," ",`
`,e.jsx(s,{children:"third_party/"}),`. These are not loaded by default and must be referenced explicitly
with `,e.jsx(s,{children:"-l"})," or copied into the host's shard search path."]})}),`
`,e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"bg-[#252538] border border-[#3A3A50] rounded-card p-4",children:[e.jsx("code",{className:"text-sm font-jetbrains text-[#7A8AB5]",children:"raylib"}),e.jsx("p",{className:"text-sm text-text-secondary mt-1",children:"2D/3D graphics, windowing, input, audio (optional third-party shard)"})]}),e.jsxs("div",{className:"bg-[#252538] border border-[#3A3A50] rounded-card p-4",children:[e.jsx("code",{className:"text-sm font-jetbrains text-[#7A8AB5]",children:"Database"}),e.jsx("p",{className:"text-sm text-text-secondary mt-1",children:"SQLite3 connection and command execution (optional third-party shard)"})]}),e.jsxs("div",{className:"bg-[#252538] border border-[#3A3A50] rounded-card p-4",children:[e.jsx("code",{className:"text-sm font-jetbrains text-[#7A8AB5]",children:"terminality"}),e.jsx("p",{className:"text-sm text-text-secondary mt-1",children:"Terminal UI host and controls (optional third-party shard)"})]})]}),`
`,e.jsx(i,{children:"Library Paths and Package Management"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:["After installation the standard shards live in a ",e.jsx(s,{children:"system/"}),` folder next to the
interpreter. For details on how the interpreter discovers libraries, how to load extra shards, and the
planned `,e.jsx(s,{children:"%SHARDSCRIPT%"})," layout, see ",e.jsx(s,{children:"Library Search Paths"}),"."]})}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:["Dependency management is handled by ",e.jsx(s,{children:"geode"}),", the planned package manager. See"," ",`
`,e.jsx(s,{children:"Package Management with Geode"})," for setup instructions and the planned CLI verbs."]})}),`
`,e.jsx(i,{children:"Editor Integration"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:["ShardScript includes a Language Server (the ",e.jsx(s,{children:"lsp"})," binary, built from"," ",`
`,e.jsx(s,{children:"ShardScript.LspServer"}),`) that speaks the Language Server Protocol over stdio.
Editors connect to it like any other LSP server.`]})}),`
`,e.jsx(d,{tone:"amber",title:"In development and Win32-only",children:e.jsx(r.p,{children:`The language server builds and runs on Windows today. Linux/Unix support is not yet implemented, and
the server is still rough — expect missing diagnostics and incomplete completions.`})}),`
`,e.jsx(d,{tone:"blue",title:"No first-party extensions yet",children:e.jsxs(r.p,{children:["There are no packaged Zed, VS Code, or Neovim extensions published today. Each editor is wired to the"," ",`
`,e.jsx(s,{children:"lsp"}),` binary manually as a generic LSP server; some editors may also need a small
file-type association for `,e.jsx(s,{children:".shard"})," files."]})}),`
`,e.jsx("h3",{className:"font-space text-lg font-semibold text-text-primary mb-3 mt-6",children:"Neovim"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:["With ",e.jsx(s,{children:"nvim-lspconfig"}),", register a custom server pointing at the binary:"]})}),`
`,e.jsx(o,{code:`-- Neovim: register the ShardScript language server via lspconfig
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
`,e.jsx(t,{children:e.jsxs(r.p,{children:[`VS Code needs a client extension to launch an arbitrary server; use a generic LSP-client extension (or
a tiny generated extension) configured to spawn `,e.jsx(s,{children:"lsp"})," for"," ",`
`,e.jsx(s,{children:".shard"})," files. In Zed, register the binary under the"," ",`
`,e.jsx(s,{children:"lsp"}),` key in your settings and associate it with the ShardScript language. In both
cases the server itself is the same `,e.jsx(s,{children:"lsp"})," binary — only the hosting glue differs."]})}),`
`,e.jsx(d,{tone:"green",title:"You are set up",children:e.jsxs(r.p,{children:["With ",e.jsx(s,{children:"shard"})," installed, the standard shards in ",e.jsx(s,{children:"system/"}),`,
and your editor wired to the language server, you have the core toolchain. Geode and additional SDKs are
in development. Head to `,e.jsx(s,{children:"Hello World"})," to run your first program."]})}),`
`,e.jsx(i,{children:"Troubleshooting"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsxs(n,{children:[e.jsx("strong",{className:"text-text-primary",children:e.jsxs(r.p,{children:[e.jsx(s,{children:"shard"})," is not recognized after installation."]})})," ",e.jsxs(r.p,{children:[`On Windows make sure the install directory is on your machine PATH, or restart your terminal after the
installer finishes. On Linux run `,e.jsx(s,{children:"source /etc/profile.d/shardscript.sh"}),` or open a
new shell.`]})]}),e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Standard shards are missing."})," Verify that a"," ",`
`,e.jsx(s,{children:"system/"})," folder exists next to the ",e.jsx(s,{children:"shard"}),` executable and
contains the DLLs or shared objects.`]})}),e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Linux installer fails."}),` The Bash installer must run as root
or with `,e.jsx(s,{children:"sudo"})," because it writes to ",e.jsx(s,{children:"/opt"}),` and creates a
symlink in `,e.jsx(s,{children:"/usr/local/bin"}),"."]})}),e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Language server does not start."})," The ",e.jsx(s,{children:"lsp"})," ",`
binary is separate from the interpreter. Make sure it is built and that the editor configuration points to
its absolute path.`]})})]}),`
`,e.jsx(i,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx(s,{children:"Hello World"})," — write and run your first ShardScript program."]})}),e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx(s,{children:"Building from Source"})," — compile the interpreter and standard shards yourself."]})}),e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx(s,{children:"Runtime Architecture"})," — how the compiler, VM, and event loop work together."]})}),e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx(s,{children:"The shard CLI"})," — command-line reference for the interpreter."]})}),e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx(s,{children:"Project Configuration"})," — organizing source files and compiler options."]})}),e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx(s,{children:"Library Search Paths"})," — how the interpreter discovers shards at startup."]})}),e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx(s,{children:"Package Management with Geode"})," — resolving and publishing shard packages."]})})]})]})}function x(a={}){const{wrapper:r}=a.components||{};return r?e.jsx(r,{...a,children:e.jsx(c,{...a})}):c(a)}function l(a,r){throw new Error("Expected component `"+a+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
