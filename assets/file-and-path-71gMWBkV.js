import{j as e}from"./index-DkFwvLJL.js";function h(l){const n={code:"code",p:"p",...l.components},{Bullet:r,Callout:c,CodeBlock:a,DocsTable:d,H2:s,InlineCode:t,Prose:i}=n;return r||o("Bullet"),c||o("Callout"),a||o("CodeBlock"),d||o("DocsTable"),s||o("H2"),t||o("InlineCode"),i||o("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(s,{children:"Summary"}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:["The ",e.jsx(t,{children:"shard.filesystem"})," namespace exposes two static utility classes:"," ",`
`,e.jsx(t,{children:"File"})," for reading, writing, and manipulating files on disk, and"," ",`
`,e.jsx(t,{children:"Path"}),` for parsing and composing file-system paths without touching the disk.
All members are `,e.jsx(t,{children:"static"}),"; neither class is ever instantiated."]})}),`
`,e.jsx(s,{children:"Syntax"}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:["Both classes are declared with ",e.jsx(t,{children:"LINK_STATIC"})," and live inside the"," ",`
`,e.jsx(t,{children:"filesystem"})," namespace. Reference them through a ",e.jsx(t,{children:"using filesystem;"})," ",`
directive.`]})}),`
`,e.jsx(a,{code:`using stdio;
using filesystem;

namespace demo;

public static func Main() -> void
{
  // File operations work directly on path strings.
  File.WriteAllText("demo.txt", "hello, shard");

  // Path operations are pure string transformations.
  name: string = Path.GetFileName("demo.txt");
  println(name);
}`,language:"csharp",filename:"file_and_path_intro.shard"}),`
`,e.jsx(s,{children:"Parameters / Arguments"}),`
`,e.jsx(s,{children:"Class File"}),`
`,e.jsx(d,{headers:["Method","Parameters","Returns","Description"],rows:[[e.jsx(n.code,{children:"ReadAllText(fileName)"}),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:"fileName"}),": string"]}),"string","Opens the file and returns its entire contents as a string."],[e.jsx(n.code,{children:"WriteAllText(fileName, content)"}),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:"fileName"}),": string, ",e.jsx(t,{children:"content"}),": string"]}),"void","Creates a new file or overwrites an existing one with the supplied text."],[e.jsx(n.code,{children:"Exists(fileName)"}),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:"fileName"}),": string"]}),"bool","Returns true if the path refers to an existing file-system entry."],[e.jsx(n.code,{children:"Delete(fileName)"}),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:"fileName"}),": string"]}),"void","Deletes the file if it exists; does nothing if it does not."],[e.jsx(n.code,{children:"Copy(sourceFileName, destFileName)"}),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:"sourceFileName"}),": string, ",e.jsx(t,{children:"destFileName"}),": string"]}),"void","Copies source to destination, overwriting an existing destination file."],[e.jsx(n.code,{children:"Move(sourceFileName, destFileName)"}),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:"sourceFileName"}),": string, ",e.jsx(t,{children:"destFileName"}),": string"]}),"void","Moves or renames a regular file from source to destination."]]}),`
`,e.jsx(s,{children:"Class Path"}),`
`,e.jsx(d,{headers:["Method","Parameters","Returns","Description"],rows:[[e.jsx(n.code,{children:"Join(paths)"}),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:"paths"}),": string[]"]}),"string","Joins path segments using the platform directory separator."],[e.jsx(n.code,{children:"GetDirectoryName(path)"}),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:"path"}),": string"]}),"string","Returns the parent directory of the supplied path, or empty if none."],[e.jsx(n.code,{children:"GetFileName(path)"}),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:"path"}),": string"]}),"string","Returns the final path component including the extension."],[e.jsx(n.code,{children:"GetExtension(path)"}),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:"path"}),": string"]}),"string","Returns the file extension including the leading dot, or empty if none."],[e.jsx(n.code,{children:"GetFileNameWithoutExtension(path)"}),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:"path"}),": string"]}),"string","Returns the final component with the extension removed."],[e.jsx(n.code,{children:"HasExtension(path)"}),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:"path"}),": string"]}),"bool","Returns true if the final component contains a dot."],[e.jsx(n.code,{children:"ChangeExtension(path, extension)"}),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:"path"}),": string, ",e.jsx(t,{children:"extension"}),": string"]}),"string","Returns a new path with the extension replaced; adds a leading dot if needed."],[e.jsx(n.code,{children:"GetFullPath(path)"}),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:"path"}),": string"]}),"string","Returns the absolute path resolved against the process working directory."],[e.jsx(n.code,{children:"GetTempPath()"}),e.jsx(e.Fragment,{children:"(no parameters)"}),"string","Returns the path of the system temporary directory."],[e.jsx(n.code,{children:"CreateTempFile()"}),e.jsx(e.Fragment,{children:"(no parameters)"}),"string","Creates an empty uniquely-named file in the temp directory and returns its full path."]]}),`
`,e.jsx(s,{children:"Path Separator Properties"}),`
`,e.jsx(d,{headers:["Property","Type","Description"],rows:[[e.jsx(n.code,{children:"DirectorySeparatorChar"}),"string",'Primary separator: "\\" on Windows, "/" on Linux.'],[e.jsx(n.code,{children:"AltDirectorySeparatorChar"}),"string",'Alternate separator: "/" on Windows, "\\" on Linux.'],[e.jsx(n.code,{children:"PathSeparator"}),"string",'List separator for PATH-style variables: ";" on Windows, ":" on Linux.']]}),`
`,e.jsx(s,{children:"Returns"}),`
`,e.jsx(d,{headers:["Member","Return Type","Notes"],rows:[[e.jsx(n.code,{children:"File.ReadAllText"}),"string","Content of the file as a wide-character string."],[e.jsx(n.code,{children:"File.WriteAllText"}),"void","No value; the file is created or overwritten."],[e.jsx(n.code,{children:"File.Exists"}),"bool","True for any existing file-system entry, including directories."],[e.jsx(n.code,{children:"File.Delete"}),"void","Silent when the file is already absent."],[e.jsx(n.code,{children:"File.Copy"}),"void","No value; destination is overwritten if it already exists."],[e.jsx(n.code,{children:"File.Move"}),"void","No value; source ceases to exist after a successful call."],[e.jsx(n.code,{children:"Path.Join"}),"string","Joined path with platform-native separators."],[e.jsx(n.code,{children:"Path.GetDirectoryName"}),"string","Parent path string; empty for a bare file name."],[e.jsx(n.code,{children:"Path.GetFileName"}),"string",'Last component, e.g. "readme.txt".'],[e.jsx(n.code,{children:"Path.GetExtension"}),"string",'Extension with dot, e.g. ".txt"; empty when none.'],[e.jsx(n.code,{children:"Path.GetTempPath"}),"string","Absolute path to the system temporary directory."],[e.jsx(n.code,{children:"Path.CreateTempFile"}),"string","Full path of a newly created, empty temporary file."]]}),`
`,e.jsx(s,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Failed to open text file"})," —"," ",`
`,e.jsx(t,{children:"ReadAllText"})," or ",e.jsx(t,{children:"WriteAllText"}),` throws when the file
cannot be opened because of missing permissions, a locked handle, or a non-existent parent directory.`]})}),e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"File writing failed"})," —"," ",`
`,e.jsx(t,{children:"WriteAllText"})," throws when the stream reports a failure after writing."]})}),e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Failed to delete file"})," —"," ",`
`,e.jsx(t,{children:"File.Delete"})," throws when the path exists but cannot be removed."]})}),e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Failed to copy file"})," —"," ",`
`,e.jsx(t,{children:"File.Copy"})," throws when the source cannot be read or the destination cannot be written."]})}),e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Source file does not exist or is not a regular file"})," —"," ",`
`,e.jsx(t,{children:"File.Move"})," rejects missing sources or directory sources."]})}),e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Destination path cannot be an existing directory"})," —"," ",`
`,e.jsx(t,{children:"File.Move"})," refuses to overwrite an existing directory with a file."]})}),e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Failed to resolve absolute path"})," —"," ",`
`,e.jsx(t,{children:"Path.GetFullPath"})," throws when the runtime cannot normalize the input."]})}),e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Failed to create temp file"})," —"," ",`
`,e.jsx(t,{children:"Path.CreateTempFile"})," throws when the runtime cannot open the chosen name for writing, usually because of exhausted disk space or missing permissions."]})})]}),`
`,e.jsx(s,{children:"Remarks"}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Static classes, no instances."})," Both ",e.jsx(t,{children:"File"})," and"," ",`
`,e.jsx(t,{children:"Path"})," are static. Calls compile to ",e.jsx(t,{children:"CALLSTATICMETHODSYMBOL"})," ",`
and resolve at compile time. There is no `,e.jsx(t,{children:"new File()"})," or"," ",`
`,e.jsx(t,{children:"new Path()"}),"."]})}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Text encoding."})," Synchronous ",e.jsx(t,{children:"File"})," methods use"," ",`
`,e.jsx(t,{children:"std::wifstream"})," and ",e.jsx(t,{children:"std::wofstream"}),`. The runtime reads
and writes wide-character strings, so ShardScript `,e.jsx(t,{children:"string"}),` values round-trip
without additional encoding conversions on Windows. The async counterparts use UTF-8 internally via libuv.`]})}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Exists checks any entry."})," ",e.jsx(t,{children:"File.Exists"})," wraps"," ",`
`,e.jsx(t,{children:"std::filesystem::exists"}),", which returns ",e.jsx(t,{children:"true"}),` for both
files and directories. To distinguish a file from a directory, use `,e.jsx(t,{children:"Directory.Exists"})," ",`
or inspect a `,e.jsx(t,{children:"FileInfo"})," instance."]})}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Copy always overwrites."})," The underlying call passes"," ",`
`,e.jsx(t,{children:"fs::copy_options::overwrite_existing"}),`, so an existing destination file is
silently replaced. There is currently no overload that preserves an existing destination.`]})}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Move semantics."})," ",e.jsx(t,{children:"File.Move"}),` first validates the source as a
regular file and the destination as a non-directory, then calls `,e.jsx(t,{children:"fs::rename"}),`.
On most platforms this is an atomic metadata operation within the same volume; across volumes the
behavior depends on the C++ standard library implementation.`]})}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Path helpers are pure string operations."})," ",e.jsx(t,{children:"Path"}),` methods construct
a `,e.jsx(t,{children:"std::filesystem::path"}),`, call the matching C++17 accessor, and return the result
as a string. No method verifies that the path exists, is reachable, or is syntactically valid for the
current platform beyond what `,e.jsx(t,{children:"std::filesystem::path"})," accepts."]})}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Domain-relative resolution."})," ",e.jsx(t,{children:"Path.GetFullPath"}),` resolves relative
paths against the application domain's current working directory at the time of execution, not against
the script file location.`]})}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Temporary directory resolution."})," ",e.jsx(t,{children:"Path.GetTempPath"})," wraps"," ",`
`,e.jsx(t,{children:"std::filesystem::temp_directory_path"}),` and returns the platform temp folder as a
wide string. The result always ends with a directory separator appropriate for the current operating system.`]})}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Temporary file creation."})," ",e.jsx(t,{children:"Path.CreateTempFile"}),` generates a name
using the prefix `,e.jsx(t,{children:"shard_"}),` followed by 16 random alphanumeric characters and the
extension `,e.jsx(t,{children:".tmp"}),`. It retries until it finds a name that does not already exist, then
opens that file for writing to reserve it. The method only guarantees uniqueness at the moment of creation;
callers are responsible for deleting the file when it is no longer needed.`]})}),`
`,e.jsx(c,{tone:"amber",title:"Path.Combine is not implemented",children:e.jsxs(n.p,{children:["The ",e.jsx(t,{children:"Path"})," class currently provides ",e.jsx(t,{children:"Join(paths: string[])"}),`,
not a `,e.jsx(t,{children:"Combine"})," overload. Use ",e.jsx(t,{children:"Path.Join"}),` with an array
literal, or use the `,e.jsx(t,{children:"/"})," operator on strings for two-segment joins."]})}),`
`,e.jsx(s,{children:"Examples"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Basic read, write, existence, and cleanup."})}),`
`,e.jsx(a,{code:`using stdio;
using filesystem;

namespace demo;

public static func Main() -> void
{
  path: string = "D:/temp/shard_demo.txt";

  // Overwrite the file with new content.
  File.WriteAllText(path, "hello\\nworld");

  // Read the entire file back into memory.
  content: string = File.ReadAllText(path);
  println(content);

  // Verify the file is still on disk.
  found: bool = File.Exists(path);
  println(found);

  // Remove the file.
  File.Delete(path);
  println(File.Exists(path));
}`,language:"csharp",filename:"file_basic.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Copying and moving files safely."})}),`
`,e.jsx(a,{code:`using stdio;
using filesystem;

namespace demo;

public static func Main() -> void
{
  source: string = "D:/temp/original.txt";
  copy: string   = "D:/temp/original_copy.txt";
  moved: string  = "D:/temp/renamed.txt";

  File.WriteAllText(source, "copy me");

  // Copy overwrites an existing destination file.
  File.Copy(source, copy);
  println(File.Exists(copy));

  // Move renames the source file.
  File.Move(copy, moved);
  println(File.Exists(moved));
  println(File.Exists(copy));

  // Clean up both files.
  File.Delete(source);
  File.Delete(moved);
}`,language:"csharp",filename:"file_copy_move.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Extracting path components."})}),`
`,e.jsx(a,{code:`using stdio;
using filesystem;

namespace demo;

public static func Main() -> void
{
  full: string = "C:/Users/gutii/docs/readme.txt";

  dir: string      = Path.GetDirectoryName(full);
  file: string     = Path.GetFileName(full);
  ext: string      = Path.GetExtension(full);
  stem: string     = Path.GetFileNameWithoutExtension(full);
  hasExt: bool     = Path.HasExtension(full);

  println(dir);      // C:/Users/gutii/docs
  println(file);     // readme.txt
  println(ext);      // .txt
  println(stem);     // readme
  println(hasExt);   // true
}`,language:"csharp",filename:"path_components.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Joining segments and replacing extensions."})}),`
`,e.jsx(a,{code:`using stdio;
using filesystem;

namespace demo;

public static func Main() -> void
{
  // Join takes a string array and uses the platform separator.
  segments: string[] = ["C:/", "Users", "gutii", "file.txt"];
  joined: string = Path.Join(segments);
  println(joined);

  // ChangeExtension adds a leading dot automatically.
  log: string = Path.ChangeExtension("app.log", "txt");
  println(log);

  // An empty extension removes the existing one.
  bare: string = Path.ChangeExtension("app.log", "");
  println(bare);

  // Resolve a relative path against the current working directory.
  absolute: string = Path.GetFullPath("data/input.txt");
  println(absolute);
}`,language:"csharp",filename:"path_join.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Creating and cleaning up temporary files."})}),`
`,e.jsx(a,{code:`using stdio;
using filesystem;

namespace demo;

public static func Main() -> void
{
  // Discover the system temp directory.
  tmpDir: string = Path.GetTempPath();
  println("Temp path: " + tmpDir);

  // Reserve a uniquely-named empty file in that directory.
  tmpFile: string = Path.CreateTempFile();
  println("Temp file: " + tmpFile);

  // Use the file like any other path.
  File.WriteAllText(tmpFile, "hello temp");
  content: string = File.ReadAllText(tmpFile);
  println("Read back: " + content);

  // Delete the file when it is no longer needed.
  File.Delete(tmpFile);
  println("Deleted: " + (File.Exists(tmpFile) == false));
}`,language:"csharp",filename:"filesystem_temp.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Defensive file-writing with existence checks."})}),`
`,e.jsx(a,{code:`using stdio;
using filesystem;

namespace demo;

public static func Main() -> void
{
  target: string = "D:/temp/report.txt";

  // Avoid overwriting an existing report.
  if (File.Exists(target))
  {
      println("report already exists");
  }
  else
  {
      File.WriteAllText(target, "daily report");
      println("report created");
  }

  // Append a new line without reading the whole file.
  File.AppendAllText(target, "\\nmore data");

  // Verify the append worked.
  println(File.ReadAllText(target));

  File.Delete(target);
}`,language:"csharp",filename:"file_defensive.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Edge cases in path parsing."})}),`
`,e.jsx(a,{code:`using stdio;
using filesystem;

namespace demo;

public static func Main() -> void
{
  // A bare file name has no parent directory.
  println(Path.GetDirectoryName("readme.txt"));   // (empty)

  // A trailing separator is preserved by the parser.
  println(Path.GetDirectoryName("C:/data/"));     // C:/

  // Dots are part of the extension only on the final component.
  println(Path.GetExtension("C:/archive.tar.gz")); // .gz

  // Multiple leading dots count as a single extension.
  println(Path.GetFileNameWithoutExtension("backup..old.txt")); // backup..old

  // Paths with no dot return an empty extension.
  println(Path.GetExtension("Makefile"));         // (empty)
  println(Path.HasExtension("Makefile"));         // false
}`,language:"csharp",filename:"path_edge_cases.shard"}),`
`,e.jsx(c,{tone:"blue",children:e.jsxs(n.p,{children:["For large files or streaming access, use ",e.jsx(t,{children:"FileStream"})," instead of"," ",`
`,e.jsx(t,{children:"File.ReadAllText"})," / ",e.jsx(t,{children:"File.WriteAllText"}),`. The all-text
helpers load the entire file into memory, which is convenient for configuration or log headers but
unsuitable for multi-gigabyte data.`]})}),`
`,e.jsx(s,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"Directory"})," and ",e.jsx(t,{children:"DirectoryInfo"})," — list, create, and inspect directories."]})}),e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"FileStream"})," — stream-oriented file access for large or binary data."]})}),e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"Path.GetFullPath"})," — resolve relative paths against the working directory."]})})]}),`
`,e.jsx(s,{children:"Source"}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:["The filesystem implementation ships as part of ",e.jsx(t,{children:"ShardScript.Framework"}),`. The native
binding for `,e.jsx(t,{children:"File"}),", ",e.jsx(t,{children:"Path"}),", and related types is in"," ",`
`,e.jsx(t,{children:"ShardScript.Framework/system/filesystem.shard.cpp"}),"."]})})]})}function p(l={}){const{wrapper:n}=l.components||{};return n?e.jsx(n,{...l,children:e.jsx(h,{...l})}):h(l)}function o(l,n){throw new Error("Expected component `"+l+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
