import{j as e}from"./index-DLc5xCYN.js";function d(s){const n={p:"p",...s.components},{Bullet:i,CodeBlock:l,H2:a,InlineCode:r,Prose:t}=n;return i||o("Bullet"),l||o("CodeBlock"),a||o("H2"),r||o("InlineCode"),t||o("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(a,{children:"Prerequisites"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsxs(n.p,{children:["A working ShardScript installation. Follow the ",e.jsx(r,{children:"Installation"}),` guide if you have
not installed the interpreter yet.`]})}),e.jsx(i,{children:e.jsxs(n.p,{children:["A text editor. Any editor that edits plain text works; syntax highlighting for ",e.jsx(r,{children:".shard"})," ",`
files is optional.`]})}),e.jsx(i,{children:e.jsxs(n.p,{children:["A terminal where you can run the ",e.jsx(r,{children:"shard"})," command."]})})]}),`
`,e.jsx(a,{children:"Scenario"}),`
`,e.jsx(t,{children:e.jsx(n.p,{children:`You will create a minimal ShardScript program, compile and run it, and then extend it to read a name from
the console and print a personalized greeting. By the end you will know how to structure a source file,
import a namespace, declare an entry point, and run the interpreter.`})}),`
`,e.jsx(a,{children:"Step-by-Step Instructions"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"1. Create a new file."})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:["Open your editor and create a file named ",e.jsx(r,{children:"hello.shard"})," in an empty directory."]})}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"2. Add the program structure."})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:["Every ShardScript file lives in a namespace. The entry point is a public static method named"," ",`
`,e.jsx(r,{children:"Main"})," that returns ",e.jsx(r,{children:"void"}),`. To write to the console, import
the `,e.jsx(r,{children:"stdio"})," namespace."]})}),`
`,e.jsx(l,{code:`using stdio;

namespace hello;

public static func Main() -> void
{
  println("Hello, World!");
}`,language:"csharp",filename:"hello.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"3. Run the program."})}),`
`,e.jsx(t,{children:e.jsx(n.p,{children:`Open a terminal in the same directory and run the interpreter with the source file as a positional
argument.`})}),`
`,e.jsx(l,{code:"shard hello.shard",language:"bash",filename:"run.sh"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"4. Read input and personalize the greeting."})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:["Change the program to ask for a name and print a greeting that uses the entered value. The"," ",`
`,e.jsx(r,{children:"input"})," function reads one line from the console."]})}),`
`,e.jsx(l,{code:`using stdio;

namespace hello;

public static func Main() -> void
{
  name: string = input("Enter your name: ");
  println("Hello, " + name + "!");
}`,language:"csharp",filename:"hello.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"5. Run the extended program."})}),`
`,e.jsx(l,{code:"shard hello.shard",language:"bash",filename:"run.sh"}),`
`,e.jsx(a,{children:"Expected Output"}),`
`,e.jsx(t,{children:e.jsx(n.p,{children:"For the first version you should see:"})}),`
`,e.jsx(l,{code:"Hello, World!",language:"bash",filename:"output.txt"}),`
`,e.jsx(t,{children:e.jsx(n.p,{children:"For the personalized version, type a name when prompted:"})}),`
`,e.jsx(l,{code:`Enter your name: shard
Hello, shard!`,language:"bash",filename:"output.txt"}),`
`,e.jsx(a,{children:"What's next?"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsxs(n.p,{children:["Learn the language fundamentals in ",e.jsx(r,{children:"Variables and Types"}),"."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:["Explore the standard library starting with ",e.jsx(r,{children:"Console I/O"}),"."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:["Read ",e.jsx(r,{children:"Runtime Architecture"})," to understand how your source becomes bytecode."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:["If you want to compile the interpreter itself, follow ",e.jsx(r,{children:"Building from Source"}),"."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:["See the language at a glance in ",e.jsx(r,{children:"Feature Tour"})," and ",e.jsx(r,{children:"Type System"}),"."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:["Learn how to organize and run projects in ",e.jsx(r,{children:"Project Configuration"})," and"," ",`
`,e.jsx(r,{children:"The shard CLI"}),"."]})})]})]})}function c(s={}){const{wrapper:n}=s.components||{};return n?e.jsx(n,{...s,children:e.jsx(d,{...s})}):d(s)}function o(s,n){throw new Error("Expected component `"+s+"` to be defined: you likely forgot to import, pass, or provide it.")}export{c as default};
