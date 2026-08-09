import{j as e}from"./index-DIkNH1R5.js";function h(i){const r={code:"code",p:"p",...i.components},{Bullet:c,Callout:l,CodeBlock:a,DocsTable:d,H2:s,InlineCode:t,Prose:n}=r;return c||o("Bullet"),l||o("Callout"),a||o("CodeBlock"),d||o("DocsTable"),s||o("H2"),t||o("InlineCode"),n||o("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(s,{children:"Summary"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:["The ",e.jsx(t,{children:"filesystem"}),` namespace provides two directory abstractions:
`,e.jsx(t,{children:"Directory"}),`, a static utility class for existence checks and
creation by path, and `,e.jsx(t,{children:"DirectoryInfo"}),`, an instance-based wrapper
around a directory path that supports path composition and stateful existence checks.`]})}),`
`,e.jsx(s,{children:"Syntax"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:["All members live in the ",e.jsx(t,{children:"filesystem"})," namespace. Add"," ",`
`,e.jsx(t,{children:"using filesystem;"})," at the top of a ShardScript file."]})}),`
`,e.jsx(a,{code:`using stdio;
using filesystem;

namespace demo;

public static func Main() -> void
{
  // Static Directory API.
  exists: bool = Directory.Exists("D:/data");
  info: DirectoryInfo = Directory.Create("D:/data/temp");

  // DirectoryInfo instance API.
  println(info.FullName);
  println(info.Exists);

  // Path composition.
  sub: DirectoryInfo = info / "subfolder";
  file: FileInfo = info / "log.txt";
}`,language:"csharp",filename:"directory_overview.shard"}),`
`,e.jsx(s,{children:"Parameters / Arguments"}),`
`,e.jsxs(n,{children:["The static ",e.jsx(t,{children:"Directory"})," class accepts the following inputs:"]}),`
`,e.jsx(d,{headers:["Method","Parameter","Type","Description"],rows:[[e.jsx(r.code,{children:"Exists(path)"}),"path","string","The directory path to test."],[e.jsx(r.code,{children:"Create(path)"}),"path","string","The directory path to create. Missing parents are created automatically."],[e.jsx(r.code,{children:"Delete(path)"}),"path","string","The directory path to delete. The directory must be empty."]]}),`
`,e.jsxs(n,{children:["The ",e.jsx(t,{children:"DirectoryInfo"})," constructor and members accept the following inputs:"]}),`
`,e.jsx(d,{headers:["Member","Parameter","Type","Description"],rows:[[e.jsx(r.code,{children:"new DirectoryInfo(fullPath)"}),"fullPath","string","The absolute or relative directory path to wrap."],[e.jsx(r.code,{children:"DirectoryInfo / segment"}),"segment","string","A relative directory or file name to append."],[e.jsx(r.code,{children:"Create()"}),"—","—","Creates the directory on disk, including any missing parents."],[e.jsx(r.code,{children:"Delete()"}),"—","—","Deletes the directory and all of its contents recursively."]]}),`
`,e.jsx(l,{tone:"amber",title:"Planned but not implemented",children:e.jsxs(r.p,{children:[e.jsx(t,{children:"Directory.GetFiles(path)"}),","," ",`
`,e.jsx(t,{children:"Directory.GetDirectories(path)"}),", and"," ",`
`,e.jsx(t,{children:"Directory.GetCurrentDirectory()"}),` are planned for a future release.
They do not currently exist in the `,e.jsx(t,{children:"shard.io"}),` native implementation.
To enumerate content today, store known names in a `,e.jsx(t,{children:"string[]"}),` and
join them with the directory path manually.`]})}),`
`,e.jsx(s,{children:"Returns"}),`
`,e.jsx(d,{headers:["Member","Return Type","Description"],rows:[[e.jsx(r.code,{children:"Directory.Exists(path)"}),"bool","True if the path exists; false otherwise."],[e.jsx(r.code,{children:"Directory.Create(path)"}),"DirectoryInfo","A DirectoryInfo wrapping the newly created or existing directory."],[e.jsx(r.code,{children:"Directory.Delete(path)"}),"void","No return value."],[e.jsx(r.code,{children:"DirectoryInfo.FullName"}),"string","The full path used to construct the instance."],[e.jsx(r.code,{children:"DirectoryInfo.Name"}),"string","The last path component (the directory name)."],[e.jsx(r.code,{children:"DirectoryInfo.Exists"}),"bool","True if the path refers to an existing directory."],[e.jsx(r.code,{children:"DirectoryInfo.Create()"}),"void","No return value."],[e.jsx(r.code,{children:"DirectoryInfo.Delete()"}),"void","No return value."],[e.jsx(r.code,{children:"DirectoryInfo / string"}),"DirectoryInfo or FileInfo","A new instance with the joined path."]]}),`
`,e.jsx(s,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(c,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Create failure"})," —"," ",`
`,e.jsx(t,{children:"Directory.Create"})," and"," ",`
`,e.jsx(t,{children:"DirectoryInfo.Create"}),` throw a runtime exception if the directory
tree cannot be created (for example, because a file with the same name already exists or
because the caller lacks permission).`]})}),e.jsx(c,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Delete failure"})," —"," ",`
`,e.jsx(t,{children:"Directory.Delete(path)"}),` throws if the directory does not exist or
is not empty. `,e.jsx(t,{children:"DirectoryInfo.Delete()"}),` throws if the recursive
removal fails.`]})}),e.jsx(c,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Path does not exist"})," —"," ",`
`,e.jsx(t,{children:"DirectoryInfo.Exists"}),` simply returns false; it never throws for a
missing path.`]})}),e.jsx(c,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Invalid path composition"})," — The"," ",`
`,e.jsx(t,{children:"/"}),` operator creates a new path object without checking the disk.
Errors surface only when the resulting path is used with a method that touches the file
system.`]})})]}),`
`,e.jsx(s,{children:"Remarks"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Static versus instance design."})," ",e.jsx(t,{children:"Directory"}),` is a
static class (`,e.jsx(t,{children:"LINK_STATIC"}),`). It is never instantiated and every
method resolves at compile time to `,e.jsx(t,{children:"CALLSTATICMETHODSYMBOL"}),"."," ",`
`,e.jsx(t,{children:"DirectoryInfo"}),` is an instance class: it stores the wrapped path in
the `,e.jsx(t,{children:"FullName"}),` backing field and allocates a new object for every
path composition.`]})}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Native backing."})," The implementation in"," ",`
`,e.jsx(t,{children:"system/filesystem.shard.cpp"}),` delegates to the C++ standard library's
`,e.jsx(t,{children:"std::filesystem"})," facilities. ",e.jsx(t,{children:"Exists"})," calls"," ",`
`,e.jsx(t,{children:"fs::exists"}),", ",e.jsx(t,{children:"DirectoryInfo.Exists"})," calls"," ",`
`,e.jsx(t,{children:"fs::is_directory"}),", and creation uses"," ",`
`,e.jsx(t,{children:"fs::create_directories"})," (recursive mkdir-p semantics)."]})}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Path composition."})," ",e.jsx(t,{children:"DirectoryInfo / string"}),` is
overloaded. When the target type is `,e.jsx(t,{children:"DirectoryInfo"}),`, the segment is
appended as a subdirectory. When the target type is `,e.jsx(t,{children:"FileInfo"}),`, the
segment is treated as a file name and a `,e.jsx(t,{children:"FileInfo"}),` is produced. The
operator never touches the disk; it only manipulates the path string.`]})}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Delete semantics differ."})," ",e.jsx(t,{children:"Directory.Delete(path)"}),`
requires the directory to be empty and uses `,e.jsx(t,{children:"fs::remove"}),"."," ",`
`,e.jsx(t,{children:"DirectoryInfo.Delete()"})," removes the directory tree recursively via"," ",`
`,e.jsx(t,{children:"fs::remove_all"}),`. Choose the static method for a safe, empty-only
removal and the instance method when you intend to wipe nested contents.`]})}),`
`,e.jsx(l,{tone:"blue",children:e.jsxs(r.p,{children:["The native callback behind ",e.jsx(t,{children:"Directory.Create"}),` is named
`,e.jsx(t,{children:"shard_directory_CreateDirectory"}),`, but the public ShardScript member
is `,e.jsx(t,{children:"Create"}),". Use ",e.jsx(t,{children:"Directory.Create(path)"}),`, not
`,e.jsx(t,{children:"Directory.CreateDirectory(path)"}),"."]})}),`
`,e.jsx(s,{children:"Examples"}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"Creating and inspecting a directory."})}),`
`,e.jsx(a,{code:`using stdio;
using filesystem;

namespace demo;

public static func Main() -> void
{
  workDir: string = "D:/temp/shard_dir_demo";

  // Ensure a clean starting state.
  if (Directory.Exists(workDir))
  {
      Directory.Delete(workDir);
  }

  // Create the directory and inspect the returned DirectoryInfo.
  info: DirectoryInfo = Directory.Create(workDir);

  println(info.FullName);   // D:/temp/shard_dir_demo
  println(info.Name);       // shard_dir_demo
  println(info.Exists);     // true

  // Clean up.
  info.Delete();
  println(info.Exists);     // false
}`,language:"csharp",filename:"directory_create_inspect.shard"}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"Path composition with DirectoryInfo."})}),`
`,e.jsx(a,{code:`using stdio;
using filesystem;

namespace demo;

public static func Main() -> void
{
  root: DirectoryInfo = new DirectoryInfo("D:/app");

  // Compose a subdirectory path without touching the disk.
  configDir: DirectoryInfo = root / "config";
  println(configDir.FullName);   // D:/app/config

  // Compose a file path under the directory.
  settings: FileInfo = root / "config" / "settings.json";
  println(settings.FullName);    // D:/app/config/settings.json

  // Create the directory tree and write a file.
  configDir.Create();
  File.WriteAllText(settings.FullName, "{ }");

  // Clean up the entire tree.
  configDir.Delete();
}`,language:"csharp",filename:"directory_compose.shard"}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"Conditional creation and safe cleanup."})}),`
`,e.jsx(a,{code:`using stdio;
using filesystem;

namespace demo;

public static func EnsureWorkDirectory(path: string) -> DirectoryInfo
{
  // Create only when the path is absent.
  if (!Directory.Exists(path))
  {
      return Directory.Create(path);
  }

  return new DirectoryInfo(path);
}

public static func Main() -> void
{
  target: string = "D:/temp/shard_work";
  dir: DirectoryInfo = EnsureWorkDirectory(target);

  // The instance tracks the same path we just ensured.
  println(dir.Exists);       // true
  println(dir.FullName);     // D:/temp/shard_work

  // Safe cleanup: remove only if we actually created it in this run.
  if (dir.Exists)
  {
      dir.Delete();
  }
}`,language:"csharp",filename:"directory_conditional.shard"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Manual enumeration for planned APIs."})," Because"," ",`
`,e.jsx(t,{children:"Directory.GetFiles"})," and"," ",`
`,e.jsx(t,{children:"Directory.GetDirectories"}),` are not yet implemented, you can join
known names to a directory path by hand.`]})}),`
`,e.jsx(a,{code:`using stdio;
using filesystem;

namespace demo;

public static func Main() -> void
{
  baseDir: DirectoryInfo = Directory.Create("D:/temp/shard_logs");

  // Create a few files so we have something to list.
  File.WriteAllText((baseDir / "app.log").FullName, "app");
  File.WriteAllText((baseDir / "error.log").FullName, "error");

  // Stand-in for Directory.GetFiles: enumerate a known list.
  candidates: string[] = ["app.log", "error.log", "missing.log"];

  foreach (name in candidates)
  {
      file: FileInfo = baseDir / name;

      if (file.Exists)
      {
          println("found: " + file.FullName);
      }
  }

  // Clean up.
  baseDir.Delete();
}`,language:"csharp",filename:"directory_manual_enumerate.shard"}),`
`,e.jsx(l,{tone:"amber",title:"Common mistake: treating Exists as creation guarantee",children:e.jsxs(r.p,{children:[e.jsx(t,{children:"Directory.Exists"})," and ",e.jsx(t,{children:"DirectoryInfo.Exists"}),`
test the disk at the moment of the call. Between the check and a subsequent operation, the
directory can be deleted or created by another process. If atomicity matters, call`," ",`
`,e.jsx(t,{children:"Directory.Create"})," directly and handle the resulting exception."]})}),`
`,e.jsx(l,{tone:"amber",title:"Common mistake: Directory.Delete on a non-empty directory",children:e.jsxs(r.p,{children:[e.jsx(t,{children:"Directory.Delete(path)"}),` requires the directory to be empty. To
delete a tree recursively, use `,e.jsx(t,{children:"DirectoryInfo.Delete()"})," on a"," ",`
`,e.jsx(t,{children:"DirectoryInfo"})," instance."]})})]})}function x(i={}){const{wrapper:r}=i.components||{};return r?e.jsx(r,{...i,children:e.jsx(h,{...i})}):h(i)}function o(i,r){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
