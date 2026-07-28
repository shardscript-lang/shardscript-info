import{j as e}from"./index-7OQU3gOS.js";function h(t){const s={code:"code",p:"p",...t.components},{Bullet:c,Callout:d,CodeBlock:r,DocsTable:l,H2:o,InlineCode:n,Prose:i}=s;return c||a("Bullet"),d||a("Callout"),r||a("CodeBlock"),l||a("DocsTable"),o||a("H2"),n||a("InlineCode"),i||a("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(o,{children:"Summary"}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:["The ",e.jsx(n,{children:"shard.subprocess"})," library (namespace ",e.jsx(n,{children:"process"}),`)
provides the `,e.jsx(n,{children:"Process"})," and ",e.jsx(n,{children:"ProcessStartInfo"}),` classes
for spawning and controlling external operating-system processes from ShardScript.
`,e.jsx(n,{children:"ProcessStartInfo"}),` collects launch parameters such as the executable path,
arguments, and working directory, while `,e.jsx(n,{children:"Process.Start"}),` creates the child
process and returns a handle you can wait on, inspect, and dispose.`]})}),`
`,e.jsx(o,{children:"Syntax"}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[`The declarations below show the public surface of the two classes. You do not write these
definitions yourself; import the library with `,e.jsx(n,{children:"using process;"}),"."]})}),`
`,e.jsx(r,{code:`namespace process;

public class ProcessStartInfo
{
  public FileName: string;
  public Arguments: string;
  public WorkingDirectory: string;
  public RedirectStandardOutput: bool;
  public RedirectStandardError: bool;
  public RedirectStandardInput: bool;
  public UseShellExecute: bool;
  public CreateNoWindow: bool;
  public InheritEnvironment: bool;
  public EnvironmentVariables: Dictionary<string, string>;
}

public class Process
{
  public static func Start(fileName: string) -> Process;
  public static func Start(fileName: string, arguments: string) -> Process;
  public static func Start(startInfo: ProcessStartInfo) -> Process;

  public HasExited: bool { get; }
  public ExitCode: int { get; }
  public ProcessId: int { get; }

  public func WaitForExit() -> int;
  public func WaitForExit(timeoutMilliseconds: int) -> bool;
  public func Kill() -> void;
  public func Dispose() -> void;
}`,language:"csharp",filename:"process_surface.shard"}),`
`,e.jsx(o,{children:"Parameters / Arguments"}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx(n,{children:"ProcessStartInfo"}),` is a plain mutable data class. Its constructor sets
`,e.jsx(n,{children:"InheritEnvironment"})," to ",e.jsx(n,{children:"true"}),` and allocates an empty
`,e.jsx(n,{children:"Dictionary<string, string>"})," for environment variables."]})}),`
`,e.jsx(l,{headers:["Field","Type","Default","Description"],rows:[[e.jsx(s.code,{children:"FileName"}),"string","empty","Required. Path to the executable. A bare name is resolved against PATH when possible."],[e.jsx(s.code,{children:"Arguments"}),"string","empty","Command-line arguments passed as a single string. Split on whitespace, respecting single and double quotes."],[e.jsx(s.code,{children:"WorkingDirectory"}),"string","empty","Working directory for the child process. If empty, the child inherits the parent working directory."],[e.jsx(s.code,{children:"RedirectStandardOutput"}),"bool","false","Must be true to read stdout via Process.ReadToEnd()."],[e.jsx(s.code,{children:"RedirectStandardError"}),"bool","false","Must be true to read stderr via Process.ReadErrorToEnd()."],[e.jsx(s.code,{children:"RedirectStandardInput"}),"bool","false","Must be true to write to stdin via Process.Write() or Process.WriteLine()."],[e.jsx(s.code,{children:"UseShellExecute"}),"bool","false","Not supported. Setting this to true causes Process.Start to throw a RuntimeException."],[e.jsx(s.code,{children:"CreateNoWindow"}),"bool","false","If true, prevents a console window from appearing on Windows. No effect on Linux."],[e.jsx(s.code,{children:"InheritEnvironment"}),"bool","true","If true, the child inherits the parent environment variables."],[e.jsx(s.code,{children:"EnvironmentVariables"}),"Dictionary<string, string>","empty","Custom environment variables. Used only when InheritEnvironment is false; they replace the inherited environment."]]}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx(n,{children:"Process.Start"}),` has three static overloads. The two-string overloads are
convenience wrappers; the `,e.jsx(n,{children:"ProcessStartInfo"}),` overload exposes the full
configuration surface.`]})}),`
`,e.jsx(l,{headers:["Overload","Parameter","Type","Description"],rows:[[e.jsx(s.code,{children:"Start(fileName)"}),"fileName","string","The executable to launch."],[e.jsx(s.code,{children:"Start(fileName, arguments)"}),"fileName","string","The executable to launch."],[e.jsx(s.code,{children:"Start(fileName, arguments)"}),"arguments","string","Arguments passed to the executable."],[e.jsx(s.code,{children:"Start(startInfo)"}),"startInfo","ProcessStartInfo","A fully populated ProcessStartInfo instance. FileName must be non-empty."]]}),`
`,e.jsx(o,{children:"Returns"}),`
`,e.jsx(l,{headers:["Member","Return Type","Description"],rows:[[e.jsx(s.code,{children:"Process.Start(...)"}),"Process","A handle to the newly created child process."],[e.jsx(s.code,{children:"WaitForExit()"}),"int","Blocks until the process exits, then returns its exit code."],[e.jsx(s.code,{children:"WaitForExit(timeoutMilliseconds)"}),"bool","true if the process exited within the timeout; false if the deadline passed."],[e.jsx(s.code,{children:"HasExited"}),"bool","true when the child process is no longer running."],[e.jsx(s.code,{children:"ExitCode"}),"int","The last cached exit code. Updated by WaitForExit and ReadToEnd; -1 after Kill."],[e.jsx(s.code,{children:"ProcessId"}),"int","An OS identifier. On Windows this is the process handle value; on Linux it is the child PID."],[e.jsx(s.code,{children:"Kill()"}),"void","Forcefully terminates the process."],[e.jsx(s.code,{children:"Dispose()"}),"void","Terminates the process if it is still running and releases all OS handles."]]}),`
`,e.jsx(o,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(c,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Missing file name"})," — Calling"," ",`
`,e.jsx(n,{children:"Process.Start(startInfo)"})," when"," ",`
`,e.jsx(n,{children:"startInfo.FileName"})," is empty throws a"," ",`
`,e.jsx(n,{children:"RuntimeException"}),"."]})}),e.jsx(c,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"UseShellExecute not supported"})," — Setting"," ",`
`,e.jsx(n,{children:"UseShellExecute = true"})," causes"," ",`
`,e.jsx(n,{children:"Process.Start"})," to throw a ",e.jsx(n,{children:"RuntimeException"}),`. All
processes are created directly through the OS process-creation API.`]})}),e.jsx(c,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Process creation failure"}),` — If the executable cannot
be found or the OS rejects the launch, `,e.jsx(n,{children:"Process.Start"})," throws a"," ",`
`,e.jsx(n,{children:"RuntimeException"}),"."]})}),e.jsx(c,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Invalid handle"})," — Calling"," ",`
`,e.jsx(n,{children:"WaitForExit"}),", ",e.jsx(n,{children:"Kill"}),", ",e.jsx(n,{children:"ReadToEnd"}),`,
or `,e.jsx(n,{children:"Write"})," after the process has been disposed throws a"," ",`
`,e.jsx(n,{children:"RuntimeException"}),"."]})}),e.jsx(c,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Stream not redirected"})," — Calling"," ",`
`,e.jsx(n,{children:"ReadToEnd"}),", ",e.jsx(n,{children:"ReadErrorToEnd"}),", or"," ",`
`,e.jsx(n,{children:"Write"})," when the matching ",e.jsx(n,{children:"RedirectStandard*"}),` flag is
false throws a `,e.jsx(n,{children:"RuntimeException"}),"."]})}),e.jsx(c,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Stale ExitCode"})," — Reading ",e.jsx(n,{children:"ExitCode"})," ",`
before the process exits does not throw, but it returns the cached placeholder value (usually 0, or
-1 after `,e.jsx(n,{children:"Kill"}),")."]})})]}),`
`,e.jsx(o,{children:"Remarks"}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Argument splitting."})," The ",e.jsx(n,{children:"Arguments"}),` string is split into
argv entries on whitespace, but text inside single or double quotes is preserved as one argument.
For example, `,e.jsx(n,{children:'Arguments = "a "b c" d"'}),` produces three argv entries:
`,e.jsx(n,{children:"a"}),", ",e.jsx(n,{children:"b c"}),", and ",e.jsx(n,{children:"d"}),"."]})}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Environment variables."})," By default ",e.jsx(n,{children:"InheritEnvironment"}),` is
`,e.jsx(n,{children:"true"})," and the child receives the parent environment. Entries in"," ",`
`,e.jsx(n,{children:"EnvironmentVariables"})," are honored only when"," ",`
`,e.jsx(n,{children:"InheritEnvironment"})," is ",e.jsx(n,{children:"false"}),`, in which case they
replace the inherited environment entirely. If you need both inherited and custom variables, set
`,e.jsx(n,{children:"InheritEnvironment = false"}),` and copy the required parent values into the
dictionary yourself.`]})}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Resource cleanup."})," ",e.jsx(n,{children:"Process"})," implements"," ",`
`,e.jsx(n,{children:"IDisposable"}),". Always use"," ",`
`,e.jsx(n,{children:"defer p: Process = Process.Start(...)"})," so that"," ",`
`,e.jsx(n,{children:"Dispose"}),` runs when the variable goes out of scope, even if an exception is
thrown. `,e.jsx(n,{children:"Dispose"}),` terminates a still-running process and closes all OS
handles. Calling `,e.jsx(n,{children:"Dispose"})," more than once is safe."]})}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Waiting and exit codes."})," The parameterless ",e.jsx(n,{children:"WaitForExit()"})," ",`
blocks the calling thread until the child terminates and returns its exit code. The timed overload
polls `,e.jsx(n,{children:"subprocess_alive"})," every 10 milliseconds; it returns"," ",`
`,e.jsx(n,{children:"false"})," on timeout and ",e.jsx("strong",{children:"does not kill"}),` the child. Pass a
negative timeout to fall back to indefinite waiting. `,e.jsx(n,{children:"ExitCode"}),` is updated by
`,e.jsx(n,{children:"WaitForExit"})," and by the blocking read methods; calling"," ",`
`,e.jsx(n,{children:"Kill"})," sets ",e.jsx(n,{children:"ExitCode"})," to -1."]})}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Cross-platform implementation."})," The library is backed by the"," ",`
`,e.jsx(n,{children:"subprocess.h"})," single-header C library. On Windows it calls"," ",`
`,e.jsx(n,{children:"CreateProcessW"}),"; on Linux it uses ",e.jsx(n,{children:"posix_spawnp"})," or"," ",`
`,e.jsx(n,{children:"fork"})," + ",e.jsx(n,{children:"execvp"}),". The examples below use"," ",`
`,e.jsx(n,{children:"cmd.exe"}),", which is Windows-specific; on Linux replace them with"," ",`
`,e.jsx(n,{children:'sh -c "..."'}),"."]})}),`
`,e.jsx(d,{tone:"amber",children:e.jsxs(s.p,{children:[e.jsx(n,{children:"UseShellExecute"}),` is intentionally unsupported. There is no plan to add shell
execution through the standard `,e.jsx(n,{children:"Process"}),` API. If you need shell features such
as redirection or piping, launch `,e.jsx(n,{children:"sh"})," / ",e.jsx(n,{children:"cmd.exe"})," ",`
explicitly with the appropriate `,e.jsx(n,{children:"Arguments"}),"."]})}),`
`,e.jsx(o,{children:"Examples"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Basic spawn with the two-string overload."})}),`
`,e.jsx(r,{code:`using stdio;
using process;

namespace demo;

public static func Main() -> void
{
  // Launch a command and wait for it to finish.
  defer p: Process = Process.Start("cmd.exe", "/c exit 42");

  code: int = p.WaitForExit();

  println("Has exited: " + p.HasExited);
  println("Exit code: " + code);
}`,language:"csharp",filename:"process_basic.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Configuring a launch with ProcessStartInfo."})}),`
`,e.jsx(r,{code:`using stdio;
using process;

namespace demo;

public static func Main() -> void
{
  info: ProcessStartInfo = new ProcessStartInfo();
  info.FileName = "cmd.exe";
  info.Arguments = "/c cd";
  info.WorkingDirectory = "C:\\";
  info.CreateNoWindow = true;
  info.RedirectStandardOutput = true;

  defer p: Process = Process.Start(info);

  output: string = p.ReadToEnd();
  println(output);
  println("Exit code: " + p.WaitForExit());
}`,language:"csharp",filename:"process_startinfo.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Timed wait and forced termination."})}),`
`,e.jsx(r,{code:`using stdio;
using process;

namespace demo;

public static func Main() -> void
{
  // Start a process that takes longer than the timeout.
  defer p: Process = Process.Start("cmd.exe", "/c ping 127.0.0.1 -n 3 > nul");

  finished: bool = p.WaitForExit(100);

  if (!finished)
  {
      println("Process did not finish in time; killing it.");
      p.Kill();
  }
  else
  {
      println("Process finished. Exit code: " + p.ExitCode);
  }
}`,language:"csharp",filename:"process_timeout.shard"}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Custom environment variables."})," Remember to set"," ",`
`,e.jsx(n,{children:"InheritEnvironment = false"}),", otherwise the custom dictionary is ignored."]})}),`
`,e.jsx(r,{code:`using stdio;
using process;
using collections;

namespace demo;

public static func Main() -> void
{
  info: ProcessStartInfo = new ProcessStartInfo();
  info.FileName = "cmd.exe";
  info.Arguments = "/c echo %MY_VAR%";
  info.InheritEnvironment = false;
  info.RedirectStandardOutput = true;
  info.EnvironmentVariables.Add("MY_VAR", "hello from shard");

  defer p: Process = Process.Start(info);

  output: string = p.ReadToEnd();
  println(output);
  println("Exit code: " + p.WaitForExit());
}`,language:"csharp",filename:"process_environment.shard"}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"ExitCode caching and a common mistake."})," Reading ",e.jsx(n,{children:"ExitCode"})," ",`
before the process has exited returns the cached placeholder, not the real exit code.`]})}),`
`,e.jsx(r,{code:`using stdio;
using process;

namespace demo;

public static func Main() -> void
{
  defer p: Process = Process.Start("cmd.exe", "/c exit 7");

  // The process has not exited yet, so ExitCode is still the placeholder.
  println("Before wait: " + p.ExitCode);

  code: int = p.WaitForExit();

  println("After wait:  " + code);
  println("Has exited:  " + p.HasExited);
}`,language:"csharp",filename:"process_exitcode.shard"}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Argument quoting."})," Use double quotes to pass an argument that contains spaces."]})}),`
`,e.jsx(r,{code:`using stdio;
using process;

namespace demo;

public static func Main() -> void
{
  info: ProcessStartInfo = new ProcessStartInfo();
  info.FileName = "cmd.exe";
  info.Arguments = "/c echo "hello world"";
  info.RedirectStandardOutput = true;

  defer p: Process = Process.Start(info);

  println(p.ReadToEnd());
  println("Exit code: " + p.WaitForExit());
}`,language:"csharp",filename:"process_quoting.shard"})]})}function p(t={}){const{wrapper:s}=t.components||{};return s?e.jsx(s,{...t,children:e.jsx(h,{...t})}):h(t)}function a(t,s){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
