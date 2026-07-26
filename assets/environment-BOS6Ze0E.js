import{j as e}from"./index-JSRqoYtX.js";function h(t){const i={em:"em",p:"p",...t.components},{Bullet:l,Callout:d,CodeBlock:r,DocsTable:c,H2:a,InlineCode:n,Prose:s}=i;return l||o("Bullet"),d||o("Callout"),r||o("CodeBlock"),c||o("DocsTable"),a||o("H2"),n||o("InlineCode"),s||o("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(a,{children:"Summary"}),`
`,e.jsx(s,{children:e.jsxs(i.p,{children:["The ",e.jsx(n,{children:"shard.environment"})," library exposes a static ",e.jsx(n,{children:"Environment"})," ",`
class in the `,e.jsx(n,{children:"environment"}),` namespace for reading and writing the current process's
operating-system environment variables. Reads return an empty string when a variable is absent, and writes
affect only the calling process and any child processes launched afterward.`]})}),`
`,e.jsx(a,{children:"Syntax"}),`
`,e.jsx(s,{children:e.jsx(i.p,{children:"Access is provided through a static delimiter operator and two explicit static methods:"})}),`
`,e.jsx(c,{headers:["Member","Signature","Access"],rows:[[e.jsx(n,{children:"Environment.NAME"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"Environment."}),e.jsx(i.em,{children:"name"})," ",e.jsx(n,{children:":"})," ",e.jsx(n,{children:"string"})]}),"Static delimiter operator; name is an identifier passed as a string."],[e.jsx(n,{children:"GetVariable(name)"}),e.jsx(e.Fragment,{children:e.jsx(n,{children:"static func GetVariable(name: string) -> string"})}),"Explicit static method for variable names known only at runtime."],[e.jsx(n,{children:"SetVariable(name, value)"}),e.jsx(e.Fragment,{children:e.jsx(n,{children:"static func SetVariable(name: string, value: string) -> void"})}),"Explicit static method."]]}),`
`,e.jsx(a,{children:"Parameters / Arguments"}),`
`,e.jsx(c,{headers:["Parameter","Type","Description"],rows:[[e.jsx(n,{children:"name"}),"string","The environment variable name. On Windows the lookup is case-insensitive; on Linux it is case-sensitive."],[e.jsx(n,{children:"value"}),"string","The value to assign. An empty string clears the variable on Windows and sets it to an empty value on Linux."]]}),`
`,e.jsx(a,{children:"Returns"}),`
`,e.jsx(c,{headers:["Member","Return Type","Description"],rows:[[e.jsx(n,{children:"Environment.NAME"}),"string","The variable value, or an empty string if the variable does not exist."],[e.jsx(n,{children:"GetVariable(name)"}),"string","The variable value, or an empty string if the variable does not exist."],[e.jsx(n,{children:"SetVariable(name, value)"}),"void","No value is returned."]]}),`
`,e.jsx(a,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(l,{children:e.jsxs(i.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Compile-time name resolution"})," — The"," ",`
`,e.jsx(n,{children:"environment"})," namespace must be imported with"," ",`
`,e.jsx(n,{children:"using environment;"})," before ",e.jsx(n,{children:"Environment"})," can be referenced."]})}),e.jsx(l,{children:e.jsxs(i.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Argument type mismatch"})," — Both ",e.jsx(n,{children:"name"})," ",`
and `,e.jsx(n,{children:"value"})," must be ",e.jsx(n,{children:"string"}),`. Passing other primitive types
or reference types fails semantic analysis.`]})}),e.jsx(l,{children:e.jsxs(i.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Missing variable is not an error"}),` — Reading a non-existent
variable returns `,e.jsx(n,{children:'""'}),". It does not throw and does not return"," ",`
`,e.jsx(n,{children:"null"}),"."]})})]}),`
`,e.jsx(a,{children:"Remarks"}),`
`,e.jsx(s,{children:e.jsxs(i.p,{children:[e.jsx("strong",{children:"Process-local mutations."})," ",e.jsx(n,{children:"SetVariable"}),` updates the environment block
of the current process. The change is visible to child processes started after the call, but it does not modify
the parent shell, system registry, or any other running process. There is no mechanism to broadcast environment
changes to existing processes.`]})}),`
`,e.jsx(s,{children:e.jsxs(i.p,{children:[e.jsx("strong",{children:"Platform differences."}),` On Windows, environment variable names are case-insensitive and the
implementation uses the wide-character APIs `,e.jsx(n,{children:"_wgetenv"})," and"," ",`
`,e.jsx(n,{children:"_wputenv_s"}),". On Linux, names are case-sensitive and the implementation uses"," ",`
`,e.jsx(n,{children:"std::getenv"})," and ",e.jsx(n,{children:"setenv"}),`. Always use canonical casing for
cross-platform variables such as `,e.jsx(n,{children:"PATH"}),", ",e.jsx(n,{children:"HOME"}),", and"," ",`
`,e.jsx(n,{children:"TEMP"}),"."]})}),`
`,e.jsx(s,{children:e.jsxs(i.p,{children:[e.jsx("strong",{children:"Delimiter operator."})," ",e.jsx(n,{children:"Environment.NAME"}),` is not a field access; it is a
static delimiter-operator overload that passes the identifier `,e.jsx(n,{children:"NAME"}),` as a string argument.
To read a variable whose name is stored in another string, call `,e.jsx(n,{children:"GetVariable(varName)"}),"."]})}),`
`,e.jsx(d,{tone:"blue",children:e.jsxs(i.p,{children:["Missing variables return an empty string. Test for absence with ",e.jsx(n,{children:'value == ""'}),`, not with a
null check.`]})}),`
`,e.jsx(d,{tone:"amber",title:"Not implemented",children:e.jsxs(i.p,{children:[e.jsx(n,{children:"ExpandEnvironmentVariables"})," and .NET-style names such as"," ",`
`,e.jsx(n,{children:"GetEnvironmentVariable"})," / ",e.jsx(n,{children:"SetEnvironmentVariable"}),` are not exposed
by `,e.jsx(n,{children:"shard.environment"}),". Expand variable references manually with"," ",`
`,e.jsx(n,{children:"strings.Replace"})," or read each variable separately."]})}),`
`,e.jsx(a,{children:"Examples"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Basic read via the delimiter operator and explicit methods."})}),`
`,e.jsx(r,{code:`using stdio;
using environment;

namespace demo;

public static func Main() -> void
{
  // Delimiter operator: the identifier is passed as the variable name.
  user: string = Environment.USERNAME;
  println(user);

  // Explicit method form is identical in behavior for literal names.
  path: string = Environment.GetVariable("PATH");
  println(path);

  home: string = Environment.GetVariable("HOME");
  println(home);
}`,language:"csharp",filename:"environment_basic.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Writing a value and reading it back."})}),`
`,e.jsx(r,{code:`using stdio;
using environment;

namespace demo;

public static func Main() -> void
{
  Environment.SetVariable("SHARD_DEMO", "hello from shard");

  value: string = Environment.SHARD_DEMO;
  println(value);   // hello from shard

  // Clean up so the change does not leak to child processes.
  Environment.SetVariable("SHARD_DEMO", "");
}`,language:"csharp",filename:"environment_write.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Supplying a default when a variable is missing."})}),`
`,e.jsx(r,{code:`using stdio;
using environment;

namespace demo;

public static func Main() -> void
{
  port: string = Environment.PORT;

  if (port == "")
  {
      // No override was supplied; use the production-safe default.
      port = "8080";
  }

  println(port);
}`,language:"csharp",filename:"environment_default.shard"}),`
`,e.jsx(s,{children:e.jsxs("strong",{children:["Reading a dynamic name with ",e.jsx(n,{children:"GetVariable"}),"."]})}),`
`,e.jsx(r,{code:`using stdio;
using environment;

namespace demo;

public static func Main() -> void
{
  // The name is chosen at runtime, so the delimiter operator cannot be used.
  suffix: string = "STAGE";
  fullName: string = "APP_" + suffix;

  stage: string = Environment.GetVariable(fullName);
  if (stage == "")
  {
      stage = "development";
  }

  println(stage);
}`,language:"csharp",filename:"environment_dynamic.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Platform case-sensitivity and cross-portable keys."})}),`
`,e.jsx(r,{code:`using stdio;
using environment;

namespace demo;

public static func Main() -> void
{
  // On Windows these three resolve to the same variable.
  // On Linux they are distinct variables.
  a: string = Environment.PATH;
  b: string = Environment.Path;
  c: string = Environment.path;

  println(a);
  println(b);
  println(c);

  // Prefer canonical casing for code that runs on both platforms.
  home: string = Environment.HOME;
  temp: string = Environment.TEMP;
  println(home);
  println(temp);
}`,language:"csharp",filename:"environment_case.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Configuration and secrets pattern."})}),`
`,e.jsx(r,{code:`using stdio;
using environment;

namespace demo;

public static func Main() -> void
{
  // Required secret: fail fast when it is missing.
  apiKey: string = Environment.API_KEY;
  if (apiKey == "")
  {
      println("ERROR: API_KEY is not set");
      return;
  }

  // Optional configuration: use a default when absent.
  timeoutMs: string = Environment.TIMEOUT_MS;
  if (timeoutMs == "")
  {
      timeoutMs = "5000";
  }

  // Feature flag: treat any non-empty value as enabled.
  verbose: bool = Environment.VERBOSE != "";

  // Never log the secret value itself.
  println("API_KEY is configured");
  println("timeout: " + timeoutMs);
  println("verbose: " + verbose);
}`,language:"csharp",filename:"environment_config.shard"}),`
`,e.jsx(s,{children:e.jsxs("strong",{children:["Common mistake: expecting ",e.jsx(n,{children:"null"})," for a missing variable."]})}),`
`,e.jsx(r,{code:`using stdio;
using environment;

namespace demo;

public static func Main() -> void
{
  // WRONG: Environment never returns null.
  // if (Environment.MISSING == null) { ... }

  // CORRECT: test for the empty string.
  value: string = Environment.MISSING;
  if (value == "")
  {
      println("MISSING is not set");
  }
}`,language:"csharp",filename:"environment_missing.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Common mistake: expecting changes to persist outside the process."})}),`
`,e.jsx(r,{code:`using stdio;
using environment;

namespace demo;

public static func Main() -> void
{
  // This affects only the current process and future children.
  Environment.SetVariable("SHARD_TEMP", "/tmp/shard");

  // It does NOT modify the parent shell, the Windows registry, or ~/.profile.
  // Launch a child process after this point to see the new value.
  println(Environment.SHARD_TEMP);
}`,language:"csharp",filename:"environment_scope.shard"})]})}function p(t={}){const{wrapper:i}=t.components||{};return i?e.jsx(i,{...t,children:e.jsx(h,{...t})}):h(t)}function o(t,i){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
