import{j as e}from"./index-DLc5xCYN.js";function a(t){const n={p:"p",...t.components},{Bullet:i,Callout:o,CodeBlock:d,H2:c,InlineCode:s,Prose:r}=n;return i||l("Bullet"),o||l("Callout"),d||l("CodeBlock"),c||l("H2"),s||l("InlineCode"),r||l("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(c,{children:"Prerequisites"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsx(n.p,{children:"The .NET SDK, to build the Geode solution."})}),e.jsx(i,{children:e.jsx(n.p,{children:"A clone of the ShardScript repository, which contains the Geode solution."})}),e.jsx(i,{children:e.jsxs(n.p,{children:["Familiarity with the ",e.jsx(s,{children:"shard"})," CLI and library search paths."]})})]}),`
`,e.jsx(o,{tone:"amber",title:"In development",children:e.jsx(n.p,{children:`Geode is the planned package manager for ShardScript. It is under active development and is not yet
available for general use. The design described here is the target shape, not the shipping
implementation.`})}),`
`,e.jsx(c,{children:"Goal"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:["Set up a Geode-managed project, declare dependencies, restore them into a local ",e.jsx(s,{children:"./libs"}),`
directory, and run a ShardScript program using the resolved library paths.`]})}),`
`,e.jsx(c,{children:"Step-by-Step Instructions"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"1. Build the Geode tooling."})}),`
`,e.jsx(d,{code:`cd Geode
dotnet build`,language:"bash",filename:"build-geode.sh"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"2. Start the package registry backend."})}),`
`,e.jsx(d,{code:`cd src/Geode.Backend.Api
dotnet run`,language:"bash",filename:"run-registry.sh"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:["The registry defaults to ",e.jsx(s,{children:"http://localhost:5000"}),"."]})}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"3. Initialize a project manifest."})}),`
`,e.jsx(d,{code:"geode init my-app",language:"bash",filename:"geode-init.sh"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:["This creates a ",e.jsx(s,{children:"geode.env"})," file in the current directory."]})}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"4. Declare dependencies."})}),`
`,e.jsx(d,{code:`# geode.env -- a project manifest (TOML-like)
[project]
name = "my-app"
version = "1.0.0"
authors = []

[dependencies]
# shard.collections = "1.0.0"

[environment]
SHARDSCRIPT_ENV = "development"`,language:"toml",filename:"geode.env"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"5. Restore dependencies."})}),`
`,e.jsx(d,{code:"geode restore",language:"bash",filename:"geode-restore.sh"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx(s,{children:"restore"})," resolves dependencies from ",e.jsx(s,{children:"geode.env"}),`, caches them
under `,e.jsx(s,{children:"~/.geode/cache"}),", and copies them into ",e.jsx(s,{children:"./libs"}),` for the
interpreter.`]})}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"6. Run the project."})}),`
`,e.jsx(d,{code:"geode run src/main.shard",language:"bash",filename:"geode-run.sh"}),`
`,e.jsx(c,{children:"Verification"}),`
`,e.jsx(r,{children:e.jsx(n.p,{children:"The setup is correct if:"})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx(s,{children:"geode restore"})," populates ",e.jsx(s,{children:"./libs"}),` with the requested shard
DLLs.`]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx(s,{children:"geode run"})," starts the program and the dependencies are available through"," ",`
`,e.jsx(s,{children:"using"})," declarations."]})})]}),`
`,e.jsx(c,{children:"Troubleshooting"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Registry unreachable."})," Make sure the backend is running on"," ",`
`,e.jsx(s,{children:"http://localhost:5000"})," or set the registry URL explicitly."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Dependency not found."}),` Check the package name and version
constraint in `,e.jsx(s,{children:"geode.env"}),"."]})})]}),`
`,e.jsx(c,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx(s,{children:"The shard CLI"})," — running ShardScript programs directly."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx(s,{children:"Library Search Paths"})," — how the interpreter finds restored shard DLLs."]})})]})]})}function x(t={}){const{wrapper:n}=t.components||{};return n?e.jsx(n,{...t,children:e.jsx(a,{...t})}):a(t)}function l(t,n){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
