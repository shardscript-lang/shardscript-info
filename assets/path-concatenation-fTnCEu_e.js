import{j as e}from"./index-7OQU3gOS.js";function d(i){const r={p:"p",...i.components},{Bullet:a,Callout:h,CodeBlock:l,DocsTable:c,H2:s,InlineCode:n,Prose:t}=r;return a||o("Bullet"),h||o("Callout"),l||o("CodeBlock"),c||o("DocsTable"),s||o("H2"),n||o("InlineCode"),t||o("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(s,{children:"Summary"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:["The ",e.jsx(n,{children:"shard.io"})," library provides ",e.jsx("strong",{children:"pure, allocation-only"}),` path
joining for the `,e.jsx(n,{children:"filesystem"}),` namespace. Paths can be concatenated with the
overloaded division operator `,e.jsx(n,{children:"/"})," or with the explicit static method"," ",`
`,e.jsx(n,{children:"Path.Join"}),`. Every overload delegates to the same native helper, which uses
the host platform's directory separator and never touches the disk.`]})}),`
`,e.jsx(s,{children:"Syntax"}),`
`,e.jsx(t,{children:e.jsx(r.p,{children:"Three operator forms and one static method are available. All produce platform-normalized paths."})}),`
`,e.jsx(c,{headers:["Form","Signature","Return Type"],rows:[["Operator",e.jsx(n,{children:"string / string"}),"string"],["Operator",e.jsx(n,{children:"DirectoryInfo / string"}),"DirectoryInfo"],["Operator",e.jsx(n,{children:"DirectoryInfo / FileInfo"}),"FileInfo"],["Static method",e.jsx(n,{children:"Path.Join(paths: string[])"}),"string"]]}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:["Platform separators are also exposed as read-only static properties on the ",e.jsx(n,{children:"Path"})," ",`
class:`]})}),`
`,e.jsx(c,{headers:["Property","Type","Value"],rows:[[e.jsx(n,{children:"Path.DirectorySeparatorChar"}),"string",e.jsxs(e.Fragment,{children:[e.jsx(n,{children:'"\\\\"'})," on Windows, ",e.jsx(n,{children:'"/"'})," on Linux"]})],[e.jsx(n,{children:"Path.AltDirectorySeparatorChar"}),"string",e.jsxs(e.Fragment,{children:[e.jsx(n,{children:'"/"'})," on Windows, ",e.jsx(n,{children:'"\\\\"'})," on Linux"]})],[e.jsx(n,{children:"Path.PathSeparator"}),"string",e.jsxs(e.Fragment,{children:[e.jsx(n,{children:'";"'})," on Windows, ",e.jsx(n,{children:'":"'})," on Linux"]})]]}),`
`,e.jsx(s,{children:"Parameters / Arguments"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"left"})," — For the string overload, any string path segment. For the"," ",`
`,e.jsx(n,{children:"DirectoryInfo"})," overloads, a ",e.jsx(n,{children:"DirectoryInfo"})," ",`
instance whose `,e.jsx(n,{children:"FullName"})," becomes the left side of the join."]})}),e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"right"})," — For ",e.jsx(n,{children:"string / string"})," and"," ",`
`,e.jsx(n,{children:"DirectoryInfo / string"}),", the next path segment as a string. For"," ",`
`,e.jsx(n,{children:"DirectoryInfo / FileInfo"}),", a ",e.jsx(n,{children:"FileInfo"})," ",`
instance whose file name is appended to the directory.`]})}),e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"paths"})," — A ShardScript string array passed to"," ",`
`,e.jsx(n,{children:"Path.Join"}),`. The first element is the base path; every subsequent element
is appended in order.`]})})]}),`
`,e.jsx(s,{children:"Returns"}),`
`,e.jsx(c,{headers:["Form","Return Value"],rows:[[e.jsx(n,{children:"string / string"}),"A new string containing the joined path."],[e.jsx(n,{children:"DirectoryInfo / string"}),"A new DirectoryInfo whose FullName is the joined path."],[e.jsx(n,{children:"DirectoryInfo / FileInfo"}),"A new FileInfo whose FullName combines the directory with the file name."],[e.jsx(n,{children:"Path.Join(paths)"}),"A string containing all array elements joined in order."]]}),`
`,e.jsx(s,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Compile-time type mismatch"})," — The"," ",`
`,e.jsx(n,{children:"/"}),` operator only accepts the parameter combinations listed above.
Passing a `,e.jsx(n,{children:"FileInfo"}),` on the left or a non-string, non-FileInfo value
on the right fails semantic analysis.`]})}),e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Empty join"})," — Calling"," ",`
`,e.jsx(n,{children:"Path.Join"})," with an empty array returns an empty string."]})}),e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Invalid path characters"}),` — The join itself does not
validate characters. The resulting string may later fail when used with disk methods such as`," ",`
`,e.jsx(n,{children:"File.ReadAllText"}),"."]})})]}),`
`,e.jsx(s,{children:"Remarks"}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Pure string manipulation."})," Every join is implemented by constructing a temporary"," ",`
`,e.jsx(n,{children:"std::filesystem::path"})," in the native runtime and applying"," ",`
`,e.jsx(n,{children:"operator/="}),`. No file system calls are made, no existence checks are
performed, and the original operands are never modified.`]})}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Platform separator normalization."}),` The native helper always uses the platform's
preferred separator. On Windows the result contains backslashes; on Linux it contains forward
slashes. Input strings may contain either separator — the C++17 path append operation normalizes
the result, but it does not collapse redundant separators or resolve `,e.jsx(n,{children:"."})," ",`
and `,e.jsx(n,{children:".."})," segments. Use ",e.jsx(n,{children:"Path.GetFullPath"}),` when you
need canonicalization.`]})}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Left-associative chaining."})," The ",e.jsx(n,{children:"/"}),` operator chains
left-to-right, so `,e.jsx(n,{children:"a / b / c"})," is parsed as"," ",`
`,e.jsx(n,{children:"(a / b) / c"}),". When the leftmost operand is a"," ",`
`,e.jsx(n,{children:"DirectoryInfo"}),", each subsequent ",e.jsx(n,{children:"/ string"}),` step
returns another `,e.jsx(n,{children:"DirectoryInfo"}),` until the final segment. To end the chain
with a file, use either the `,e.jsx(n,{children:"DirectoryInfo / FileInfo"})," overload or the"," ",`
`,e.jsx(n,{children:"FileInfo"})," constructor."]})}),`
`,e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Path.Join versus the / operator."}),` Both call the same native helper. Use the
operator for readable, fixed-segment navigation. Use `,e.jsx(n,{children:"Path.Join"}),` when the
segments are collected at runtime in a string array, or when you want a single function call for
an arbitrary number of segments.`]})}),`
`,e.jsx(h,{tone:"blue",children:e.jsxs(r.p,{children:["The ",e.jsx(n,{children:"Path"})," class is declared ",e.jsx(n,{children:"LINK_STATIC"}),`. It is never
instantiated; call `,e.jsx(n,{children:"Path.Join(...)"}),` and access separator properties directly
on the class.`]})}),`
`,e.jsx(h,{tone:"amber",title:"DirectoryInfo / FileInfo registration",children:e.jsxs(r.p,{children:["The native runtime registers a ",e.jsx(n,{children:"DirectoryInfo / FileInfo"}),` operator that is
intended to relocate a file into a directory, keeping only the file name. In the current
registration this overload overlaps with `,e.jsx(n,{children:"DirectoryInfo / string"}),`, so for
portable code prefer constructing the file explicitly with`," ",`
`,e.jsx(n,{children:"new FileInfo(directory, fileName)"}),"."]})}),`
`,e.jsx(s,{children:"Examples"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Basic string concatenation with /."})}),`
`,e.jsx(l,{code:`using stdio;
using filesystem;

namespace demo;

public static func Main() -> void
{
  // The / operator joins segments using the platform separator.
  base: string = "D:/projects";
  full: string = base / "src" / "main.shard";
  println(full);
}`,language:"csharp",filename:"path_concat_string.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Building paths from DirectoryInfo."})}),`
`,e.jsx(l,{code:`using stdio;
using filesystem;

namespace demo;

public static func Main() -> void
{
  // DirectoryInfo / string returns a new DirectoryInfo.
  root: DirectoryInfo = new DirectoryInfo("D:/data");
  sub: DirectoryInfo = root / "logs";
  println(sub.FullName);

  // Chain several directory segments, then create a FileInfo explicitly.
  deep: DirectoryInfo = root / "users" / "gutii";
  config: FileInfo = new FileInfo(deep, "config.json");
  println(config.FullName);
}`,language:"csharp",filename:"path_concat_directoryinfo.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Multi-segment joining with Path.Join."})}),`
`,e.jsx(l,{code:`using stdio;
using filesystem;

namespace demo;

public static func Main() -> void
{
  // Path.Join accepts a string array and joins every element in order.
  segments: string[] = ["D:/data", "users", "gutii", "config.json"];
  joined: string = Path.Join(segments);
  println(joined);

  // An empty array yields an empty string.
  empty: string[] = [];
  println(Path.Join(empty));
}`,language:"csharp",filename:"path_join_array.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Platform separators and cross-platform code."})}),`
`,e.jsx(l,{code:`using stdio;
using filesystem;

namespace demo;

public static func Main() -> void
{
  // Inspect the separators at runtime instead of hard-coding them.
  sep: string = Path.DirectorySeparatorChar;
  alt: string = Path.AltDirectorySeparatorChar;
  listSep: string = Path.PathSeparator;

  println("directory separator: " + sep);
  println("alternate separator: " + alt);
  println("path list separator: " + listSep);

  // Build a path that adapts to the current platform.
  root: string = "data";
  leaf: string = "output.log";
  combined: string = root / leaf;
  println(combined);
}`,language:"csharp",filename:"path_separators.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Edge cases and common mistakes."})}),`
`,e.jsx(l,{code:`using stdio;
using filesystem;

namespace demo;

public static func Main() -> void
{
  // Trailing separators in the left operand are absorbed by the join.
  a: string = "D:/data/";
  b: string = "logs";
  println(a / b);

  // Leading separators in the right operand are preserved.
  c: string = "/absolute";
  d: string = "file.txt";
  println(c / d);

  // Path.Join does not normalize ".." or "."; GetFullPath does.
  messy: string = "D:/data/../config.json";
  println(Path.GetFullPath(messy));

  // Joining an empty string as a segment is allowed and produces a valid path.
  parts: string[] = ["D:/data", "", "file.txt"];
  println(Path.Join(parts));
}`,language:"csharp",filename:"path_edge_cases.shard"}),`
`,e.jsx(s,{children:"Operator Summary"}),`
`,e.jsx(c,{headers:["Overload","Return Type","Use Case"],rows:[[e.jsx(n,{children:"string / string"}),"string","Join two arbitrary path segments."],[e.jsx(n,{children:"DirectoryInfo / string"}),"DirectoryInfo","Descend into a subdirectory."],[e.jsx(n,{children:"new FileInfo(DirectoryInfo, string)"}),"FileInfo","Create a file path under a directory."],[e.jsx(n,{children:"Path.Join(string[])"}),"string","Join a runtime-collected list of segments."]]})]})}function x(i={}){const{wrapper:r}=i.components||{};return r?e.jsx(r,{...i,children:e.jsx(d,{...i})}):d(i)}function o(i,r){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
