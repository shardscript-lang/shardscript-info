import{j as e}from"./index-Cal9F7tC.js";function h(t){const s={code:"code",p:"p",...t.components},{Bullet:o,Callout:l,CodeBlock:d,DocsTable:a,H2:i,InlineCode:n,Prose:r}=s;return o||c("Bullet"),l||c("Callout"),d||c("CodeBlock"),a||c("DocsTable"),i||c("H2"),n||c("InlineCode"),r||c("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(i,{children:"Summary"}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:["The ",e.jsx(n,{children:"shard.subprocess"}),` library lets a ShardScript program spawn external
processes and interact with their `,e.jsx(n,{children:"stdin"}),","," ",`
`,e.jsx(n,{children:"stdout"}),", and ",e.jsx(n,{children:"stderr"}),` streams. This page covers the
I/O redirection API, blocking read helpers, write helpers, process lifetime management
(`,e.jsx(n,{children:"WaitForExit"}),", ",e.jsx(n,{children:"Kill"}),`), and deterministic cleanup
via `,e.jsx(n,{children:"IDisposable"})," and ",e.jsx(n,{children:"defer"}),"."]})}),`
`,e.jsx(i,{children:"Syntax"}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:["All I/O and lifecycle members belong to the ",e.jsx(n,{children:"Process"})," class in the"," ",`
`,e.jsx(n,{children:"process"}),` namespace. Configure redirection before launch by setting fields
on a `,e.jsx(n,{children:"ProcessStartInfo"})," instance and passing it to"," ",`
`,e.jsx(n,{children:"Process.Start"}),"."]})}),`
`,e.jsx(a,{headers:["Member","Signature","Description"],rows:[[e.jsx(s.code,{children:"Process.Start"}),e.jsx(n,{children:"public static func Start(fileName: string) -> Process"}),"Spawns a process without redirection."],[e.jsx(s.code,{children:"Process.Start"}),e.jsx(n,{children:"public static func Start(fileName: string, arguments: string) -> Process"}),"Spawns a process with a command-line argument string."],[e.jsx(s.code,{children:"Process.Start"}),e.jsx(n,{children:"public static func Start(startInfo: ProcessStartInfo) -> Process"}),"Spawns a process using a fully configured start-info object."],[e.jsx(s.code,{children:"ReadToEnd"}),e.jsx(n,{children:"public func ReadToEnd() -> string"}),"Reads the entire stdout pipe and returns it as a string."],[e.jsx(s.code,{children:"ReadErrorToEnd"}),e.jsx(n,{children:"public func ReadErrorToEnd() -> string"}),"Reads the entire stderr pipe and returns it as a string."],[e.jsx(s.code,{children:"Write"}),e.jsx(n,{children:"public func Write(text: string) -> void"}),"Writes text to the child process stdin pipe."],[e.jsx(s.code,{children:"WriteLine"}),e.jsx(n,{children:"public func WriteLine(text: string) -> void"}),"Writes text followed by a newline to the child stdin pipe."],[e.jsx(s.code,{children:"WaitForExit"}),e.jsx(n,{children:"public func WaitForExit() -> int"}),"Blocks until the child process terminates and returns its exit code."],[e.jsx(s.code,{children:"WaitForExit"}),e.jsx(n,{children:"public func WaitForExit(timeoutMilliseconds: int) -> bool"}),"Polls until the process exits or the timeout elapses."],[e.jsx(s.code,{children:"Kill"}),e.jsx(n,{children:"public func Kill() -> void"}),"Forcefully terminates the child process."],[e.jsx(s.code,{children:"Dispose"}),e.jsx(n,{children:"public func Dispose() -> void"}),"Releases the native process handle and closes all pipes."],[e.jsx(s.code,{children:"HasExited"}),e.jsx(n,{children:"public property HasExited: bool"}),"Returns true when the child process is no longer alive."],[e.jsx(s.code,{children:"ExitCode"}),e.jsx(n,{children:"public property ExitCode: int"}),"Returns the last recorded exit code."],[e.jsx(s.code,{children:"ProcessId"}),e.jsx(n,{children:"public property ProcessId: int"}),"Returns the OS process identifier."]]}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:["The ",e.jsx(n,{children:"ProcessStartInfo"})," fields that control I/O and lifetime behavior are:"]})}),`
`,e.jsx(a,{headers:["Field","Type","Default","Description"],rows:[[e.jsx(s.code,{children:"FileName"}),"string",e.jsx(n,{children:'""'}),"Executable or command to run. Required."],[e.jsx(s.code,{children:"Arguments"}),"string",e.jsx(n,{children:'""'}),"Command-line arguments passed to the executable."],[e.jsx(s.code,{children:"WorkingDirectory"}),"string",e.jsx(n,{children:'""'}),"Working directory for the child process."],[e.jsx(s.code,{children:"RedirectStandardOutput"}),"bool",e.jsx(n,{children:"false"}),"Create a pipe and capture stdout."],[e.jsx(s.code,{children:"RedirectStandardError"}),"bool",e.jsx(n,{children:"false"}),"Create a pipe and capture stderr."],[e.jsx(s.code,{children:"RedirectStandardInput"}),"bool",e.jsx(n,{children:"false"}),"Create a pipe and feed stdin."],[e.jsx(s.code,{children:"CreateNoWindow"}),"bool",e.jsx(n,{children:"false"}),"On Windows, hide the console window of the child."],[e.jsx(s.code,{children:"InheritEnvironment"}),"bool",e.jsx(n,{children:"true"}),"Inherit environment variables from the parent process."],[e.jsx(s.code,{children:"EnvironmentVariables"}),e.jsx(n,{children:"Dictionary<string, string>"}),"empty","Additional or replacement environment variables."],[e.jsx(s.code,{children:"UseShellExecute"}),"bool",e.jsx(n,{children:"false"}),"Not supported; setting this to true throws at start time."]]}),`
`,e.jsx(i,{children:"Parameters / Arguments"}),`
`,e.jsx(r,{children:e.jsx(s.p,{children:"The parameters for each I/O and lifecycle member are listed below."})}),`
`,e.jsx(a,{headers:["Member","Parameter","Type","Description"],rows:[[e.jsx(s.code,{children:"Process.Start"}),e.jsx(s.code,{children:"fileName"}),"string","Path or name of the executable. The runtime searches PATH when the name is not absolute."],[e.jsx(s.code,{children:"Process.Start"}),e.jsx(s.code,{children:"arguments"}),"string","Whitespace-separated argument string. Quotes preserve spaces; backslash escapes are applied by the underlying C runtime."],[e.jsx(s.code,{children:"Process.Start"}),e.jsx(s.code,{children:"startInfo"}),"ProcessStartInfo","Configuration object that selects redirection, working directory, environment, and window behavior."],[e.jsx(s.code,{children:"Write / WriteLine"}),e.jsx(s.code,{children:"text"}),"string","Text to send to the child stdin pipe. Converted to UTF-8 before writing."],[e.jsx(s.code,{children:"WaitForExit(timeout)"}),e.jsx(s.code,{children:"timeoutMilliseconds"}),"int","Maximum time to wait. A negative value waits indefinitely."]]}),`
`,e.jsx(i,{children:"Returns"}),`
`,e.jsx(a,{headers:["Member","Return Type","Meaning"],rows:[[e.jsx(s.code,{children:"ReadToEnd"}),"string","The complete stdout output decoded from UTF-8."],[e.jsx(s.code,{children:"ReadErrorToEnd"}),"string","The complete stderr output decoded from UTF-8."],[e.jsx(s.code,{children:"WaitForExit()"}),"int","The child process exit code recorded by the OS."],[e.jsx(s.code,{children:"WaitForExit(ms)"}),"bool","True if the process exited within the timeout; false if the timeout elapsed."],[e.jsx(s.code,{children:"HasExited"}),"bool","True when the native process handle reports the process is no longer alive."],[e.jsx(s.code,{children:"ExitCode"}),"int","The exit code recorded by the most recent WaitForExit call, or -1 after Kill."],[e.jsx(s.code,{children:"ProcessId"}),"int","The OS-specific process identifier assigned at launch."]]}),`
`,e.jsx(i,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(o,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Process start failure"})," —"," ",`
`,e.jsx(n,{children:"Process.Start"}),` throws when the executable cannot be found, permission is
denied, pipe creation fails, or the start-info object is invalid. The native error code is
surfaced as part of the exception message.`]})}),e.jsx(o,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"UseShellExecute not supported"})," — Setting"," ",`
`,e.jsx(n,{children:"ProcessStartInfo.UseShellExecute = true"})," causes"," ",`
`,e.jsx(n,{children:"Process.Start"})," to throw immediately."]})}),e.jsx(o,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Invalid process handle"})," — Calling"," ",`
`,e.jsx(n,{children:"WaitForExit"}),", ",e.jsx(n,{children:"Kill"}),","," ",`
`,e.jsx(n,{children:"ReadToEnd"}),", ",e.jsx(n,{children:"ReadErrorToEnd"}),", or"," ",`
`,e.jsx(n,{children:"Write"})," after the process has been disposed throws."]})}),e.jsx(o,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Stream not redirected"})," —"," ",`
`,e.jsx(n,{children:"ReadToEnd"}),", ",e.jsx(n,{children:"ReadErrorToEnd"}),", and"," ",`
`,e.jsx(n,{children:"Write"})," throw if the corresponding"," ",`
`,e.jsx(n,{children:"RedirectStandard*"})," flag was not set before the process was started."]})}),e.jsx(o,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Timeout does not kill"})," —"," ",`
`,e.jsx(n,{children:"WaitForExit(ms)"})," returns ",e.jsx(n,{children:"false"}),` on timeout and
leaves the process running. You must call `,e.jsx(n,{children:"Kill"}),` explicitly if you want
termination.`]})}),e.jsx(o,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Orphaned child on parent exit"}),` — If the parent
exits without calling `,e.jsx(n,{children:"Dispose"})," or ",e.jsx(n,{children:"Kill"}),`, the
child may continue running independently of the parent.`]})})]}),`
`,e.jsx(i,{children:"Remarks"}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Redirection is configured before launch."}),` The runtime creates OS pipes only when
the corresponding `,e.jsx(n,{children:"RedirectStandardOutput"}),","," ",`
`,e.jsx(n,{children:"RedirectStandardError"}),", or"," ",`
`,e.jsx(n,{children:"RedirectStandardInput"})," field is set to ",e.jsx(n,{children:"true"}),` on
the `,e.jsx(n,{children:"ProcessStartInfo"}),` object. Attempting to read or write a stream that
was not redirected produces a runtime error.`]})}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Blocking reads collect the entire stream."})," ",`
`,e.jsx(n,{children:"ReadToEnd"})," and ",e.jsx(n,{children:"ReadErrorToEnd"}),` read in 4096-byte
chunks until the pipe closes, then call `,e.jsx(n,{children:"WaitForExit"}),` internally to reap
the child and update `,e.jsx(n,{children:"ExitCode"}),`. Because these calls block the calling
thread until the child closes its end of the pipe, they are not suitable for interactive or
streaming scenarios where you need to read while the process is still running.`]})}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Writing to stdin."})," ",e.jsx(n,{children:"Write"}),` converts the supplied string to
UTF-8 and writes it through `,e.jsx(n,{children:"std::fwrite"}),", followed by an explicit"," ",`
`,e.jsx(n,{children:"std::fflush"}),". ",e.jsx(n,{children:"WriteLine"}),` performs the same write
and then appends a single `,e.jsx(n,{children:"\\n"}),` byte. If you need to signal end-of-input to
a child that reads until EOF, close the pipe by disposing the `,e.jsx(n,{children:"Process"})," ",`
instance or by letting the deferred disposal run.`]})}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Waiting and timeouts."})," The parameterless ",e.jsx(n,{children:"WaitForExit()"})," ",`
blocks until the child terminates and returns the OS exit code. The timed overload polls the
native `,e.jsx(n,{children:"subprocess_alive"}),` function in a loop with 10 ms sleeps. A
negative timeout is treated as an indefinite wait. On timeout the method returns`," ",`
`,e.jsx(n,{children:"false"})," and does ",e.jsx("em",{children:"not"})," terminate the child."]})}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Kill behavior."})," ",e.jsx(n,{children:"Kill"}),` calls the native terminate function
(`,e.jsx(n,{children:"TerminateProcess"})," on Windows, ",e.jsx(n,{children:"SIGTERM"}),` on POSIX),
sets `,e.jsx(n,{children:"ExitCode"})," to ",e.jsx(n,{children:"-1"}),`, and marks the process as
exited. Calling `,e.jsx(n,{children:"Kill"})," on an already-exited process is a no-op."]})}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"IDisposable and defer."})," ",e.jsx(n,{children:"Process"})," implements"," ",`
`,e.jsx(n,{children:"IDisposable"}),". The recommended pattern is to declare the variable with"," ",`
`,e.jsx(n,{children:"defer"}),": ",e.jsx(n,{children:"defer p: Process = Process.Start(...)"}),`.
This guarantees that `,e.jsx(n,{children:"Dispose"}),` runs when the variable goes out of scope,
whether by normal return, early return, or exception. `,e.jsx(n,{children:"Dispose"}),` calls the
native destroy function, closes all pipe handles, frees the underlying`," ",`
`,e.jsx(n,{children:"subprocess_s"})," structure, and nulls the handle field. Calling"," ",`
`,e.jsx(n,{children:"Dispose"})," multiple times is safe."]})}),`
`,e.jsx(l,{tone:"blue",children:e.jsxs(s.p,{children:[`The native subprocess layer always enables asynchronous I/O internally so that blocking reads
can drain the pipe reliably. You do not need to set any async flag manually; just enable the
specific `,e.jsx(n,{children:"RedirectStandard*"})," flags you need."]})}),`
`,e.jsx(i,{children:"Examples"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Capture stdout and stderr separately."})}),`
`,e.jsx(d,{code:`using stdio;
using process;

namespace demo;

public static func Main() -> void
{
  info: ProcessStartInfo = new ProcessStartInfo();
  info.FileName = "cmd.exe";
  info.Arguments = "/c echo stdout message & echo stderr message >&2";
  info.RedirectStandardOutput = true;
  info.RedirectStandardError = true;
  info.CreateNoWindow = true;

  defer p: Process = Process.Start(info);

  outText: string = p.ReadToEnd();
  errText: string = p.ReadErrorToEnd();

  println("stdout: " + outText);
  println("stderr: " + errText);
  println("exit code: " + p.ExitCode);
}`,language:"csharp",filename:"subprocess_capture.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Feed input to a child process."})}),`
`,e.jsx(d,{code:`using stdio;
using process;

namespace demo;

public static func Main() -> void
{
  info: ProcessStartInfo = new ProcessStartInfo();
  info.FileName = "cmd.exe";
  info.Arguments = "/c sort";
  info.RedirectStandardInput = true;
  info.RedirectStandardOutput = true;
  info.CreateNoWindow = true;

  defer p: Process = Process.Start(info);

  // Send three lines to the sort utility.
  p.WriteLine("cherry");
  p.WriteLine("apple");
  p.WriteLine("banana");

  // Closing stdin signals EOF; defer will dispose the process at scope exit.
  sorted: string = p.ReadToEnd();

  println("sorted output:");
  println(sorted);
  println("exit code: " + p.ExitCode);
}`,language:"csharp",filename:"subprocess_stdin.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Enforce a timeout and kill a long-running process."})}),`
`,e.jsx(d,{code:`using stdio;
using process;

namespace demo;

public static func Main() -> void
{
  // On Windows this command sleeps for about 5 seconds.
  defer p: Process = Process.Start("cmd.exe", "/c ping 127.0.0.1 -n 6 > nul");

  finished: bool = p.WaitForExit(250);
  if (!finished)
  {
      println("Timeout reached — terminating process.");
      p.Kill();
  }
  else
  {
      println("Process finished on time.");
  }

  println("Has exited: " + p.HasExited);
  println("Exit code: " + p.ExitCode);
}`,language:"csharp",filename:"subprocess_timeout.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Check exit status after capturing output."})}),`
`,e.jsx(d,{code:`using stdio;
using process;

namespace demo;

public static func Main() -> void
{
  info: ProcessStartInfo = new ProcessStartInfo();
  info.FileName = "cmd.exe";
  info.Arguments = "/c exit 42";
  info.RedirectStandardOutput = true;
  info.CreateNoWindow = true;

  defer p: Process = Process.Start(info);

  output: string = p.ReadToEnd();
  code: int = p.WaitForExit();

  if (code != 0)
  {
      println("Command failed with exit code " + code);
  }
  else
  {
      println("Command succeeded");
  }

  println("Captured output: '" + output + "'");
}`,language:"csharp",filename:"subprocess_exitcode.shard"}),`
`,e.jsx(l,{tone:"amber",title:"Common mistake: reading after dispose",children:e.jsxs(s.p,{children:["Do not call ",e.jsx(n,{children:"ReadToEnd"})," or ",e.jsx(n,{children:"Kill"}),` after the deferred
`,e.jsx(n,{children:"Process"}),` variable has gone out of scope. The handle is released on scope
exit, and subsequent member access throws. Keep all reads, writes, and waits inside the same
scope as the `,e.jsx(n,{children:"defer"})," declaration."]})}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Environment variables and working directory."})}),`
`,e.jsx(d,{code:`using stdio;
using process;
using collections;

namespace demo;

public static func Main() -> void
{
  info: ProcessStartInfo = new ProcessStartInfo();
  info.FileName = "cmd.exe";
  info.Arguments = "/c echo %MY_VAR%";
  info.RedirectStandardOutput = true;
  info.CreateNoWindow = true;

  // Replace inherited environment with a custom one.
  info.InheritEnvironment = false;
  info.EnvironmentVariables.Add("MY_VAR", "hello from shard");

  defer p: Process = Process.Start(info);

  output: string = p.ReadToEnd();
  println(output);
  println("PID: " + p.ProcessId);
}`,language:"csharp",filename:"subprocess_env.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Run a simple command without redirection."})}),`
`,e.jsx(d,{code:`using stdio;
using process;

namespace demo;

public static func Main() -> void
{
  // When no redirection is needed, use the two-argument overload.
  defer p: Process = Process.Start("cmd.exe", "/c echo hello");

  code: int = p.WaitForExit();
  println("Process exited with code " + code);
}`,language:"csharp",filename:"subprocess_simple.shard"})]})}function x(t={}){const{wrapper:s}=t.components||{};return s?e.jsx(s,{...t,children:e.jsx(h,{...t})}):h(t)}function c(t,s){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
