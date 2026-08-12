import{j as e}from"./index-Dw_NxEHJ.js";function h(s){const a={em:"em",p:"p",...s.components},{Bullet:c,Callout:r,CodeBlock:l,DocsTable:d,H2:o,InlineCode:n,Prose:t}=a;return c||i("Bullet"),r||i("Callout"),l||i("CodeBlock"),d||i("DocsTable"),o||i("H2"),n||i("InlineCode"),t||i("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(o,{children:"Summary"}),`
`,e.jsx(t,{children:e.jsxs(a.p,{children:["The ",e.jsx(n,{children:"shard.async"}),` library provides a cooperative cancellation model
built around two types in the `,e.jsx(n,{children:"async"})," namespace:"," ",`
`,e.jsx(n,{children:"CancellationTokenSource"}),", which signals cancellation, and"," ",`
`,e.jsx(n,{children:"CancellationToken"}),`, which observers poll to detect the signal.
Cancellation is voluntary — no thread, fiber, or async operation is forcibly aborted;
the consumer decides when and how often to check the token.`]})}),`
`,e.jsx(o,{children:"Syntax"}),`
`,e.jsx(t,{children:e.jsxs(a.p,{children:["Both types are declared as public classes in the ",e.jsx(n,{children:"async"}),` namespace.
A token is obtained from a source instance; the source is created with the normal
`,e.jsx(n,{children:"new"})," expression."]})}),`
`,e.jsx(l,{code:`using async;

// Create a source and retrieve its token.
cts: CancellationTokenSource = new CancellationTokenSource();
token: CancellationToken = cts.Token;

// Signal cancellation.
cts.Cancel();

// Query the token.
flag: bool = token.IsCancellationRequested;`,language:"csharp",filename:"cancellation_syntax.shard"}),`
`,e.jsx(t,{children:"The public surface of the two types is shown below."}),`
`,e.jsx(d,{headers:["Type","Member","Signature","Description"],rows:[[e.jsx(n,{children:"CancellationTokenSource"}),e.jsx(n,{children:"init()"}),e.jsx(n,{children:"new CancellationTokenSource()"}),"Creates a new source and a single linked token."],[e.jsx(n,{children:"CancellationTokenSource"}),e.jsx(n,{children:"Cancel()"}),e.jsx(n,{children:"Cancel() -> void"}),"Sets the internal cancellation flag; linked tokens observe the change."],[e.jsx(n,{children:"CancellationTokenSource"}),e.jsx(n,{children:"Token"}),e.jsx(n,{children:"Token: CancellationToken"}),"Returns the token managed by this source."],[e.jsx(n,{children:"CancellationToken"}),e.jsx(n,{children:"IsCancellationRequested"}),e.jsx(n,{children:"IsCancellationRequested: bool"}),"True after the linked source has called Cancel()."],[e.jsx(n,{children:"CancellationToken"}),e.jsx(n,{children:"CanBeCanceled"}),e.jsx(n,{children:"CanBeCanceled: bool"}),"True when the token is linked to a valid source."]]}),`
`,e.jsx(o,{children:"Parameters / Arguments"}),`
`,e.jsx(d,{headers:["Method","Parameter","Type","Description"],rows:[[e.jsx(n,{children:"CancellationTokenSource.init"}),e.jsx(a.em,{children:"none"}),e.jsx(a.em,{children:"none"}),"Takes no arguments."],[e.jsx(n,{children:"CancellationTokenSource.Cancel"}),e.jsx(a.em,{children:"none"}),e.jsx(a.em,{children:"none"}),"Takes no arguments."]]}),`
`,e.jsx(t,{children:e.jsxs(a.p,{children:[`The two token properties are parameterless getters. Async methods that accept cancellation
(such as `,e.jsx(n,{children:"FileStream.ReadAsync"}),") take a trailing"," ",`
`,e.jsx(n,{children:"CancellationToken"})," argument."]})}),`
`,e.jsx(o,{children:"Returns"}),`
`,e.jsx(d,{headers:["Member","Return Type","Value"],rows:[[e.jsx(n,{children:"CancellationTokenSource.Token"}),e.jsx(n,{children:"CancellationToken"}),"The token created during source construction."],[e.jsx(n,{children:"CancellationTokenSource.Cancel()"}),e.jsx(n,{children:"void"}),"Returns nothing."],[e.jsx(n,{children:"CancellationToken.IsCancellationRequested"}),e.jsx(n,{children:"bool"}),"True if cancellation has been signaled; otherwise false."],[e.jsx(n,{children:"CancellationToken.CanBeCanceled"}),e.jsx(n,{children:"bool"}),"True if the token references a source; false if the source field is null."]]}),`
`,e.jsx(o,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(c,{children:e.jsxs(a.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Null source reference"}),` — A token whose source
field is `,e.jsx(n,{children:"null"})," reports ",e.jsx(n,{children:"CanBeCanceled = false"})," ",`
and `,e.jsx(n,{children:"IsCancellationRequested = false"}),". It never throws on its own."]})}),e.jsx(c,{children:e.jsxs(a.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Operation canceled by I/O"}),` — Async I/O methods
such as `,e.jsx(n,{children:"FileStream.ReadAsync"})," throw"," ",`
`,e.jsx(n,{children:"RuntimeException"}),` (or a derived exception type) when the supplied token
is already canceled or becomes canceled during the operation.`]})}),e.jsx(c,{children:e.jsxs(a.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Double cancel"})," — Calling"," ",`
`,e.jsx(n,{children:"Cancel()"}),` more than once is safe; the internal flag is set to 1 and
subsequent calls are no-ops.`]})})]}),`
`,e.jsx(o,{children:"Remarks"}),`
`,e.jsx(t,{children:e.jsxs(a.p,{children:[e.jsx("strong",{children:"Cooperative design."}),` Cancellation in ShardScript is purely opt-in. The VM
does not preempt running bytecode, and no async state machine is unrolled automatically. A
long-running operation must poll `,e.jsx(n,{children:"IsCancellationRequested"}),` or rely on an
async primitive that performs the poll on its behalf.`]})}),`
`,e.jsx(t,{children:e.jsxs(a.p,{children:[e.jsx("strong",{children:"Source/token relationship."})," A ",e.jsx(n,{children:"CancellationTokenSource"}),`
owns an internal `,e.jsx(n,{children:"_canceled"})," flag (stored as an ",e.jsx(n,{children:"int"}),`,
0 or 1) and a `,e.jsx(n,{children:"_token"}),` field. During construction the source allocates the
token and stores a back-reference from the token to the source. Multiple calls to`," ",`
`,e.jsx(n,{children:"cts.Token"}),` return the same instance; multiple tokens can reference the
same source when the instance is shared by value.`]})}),`
`,e.jsx(t,{children:e.jsxs(a.p,{children:[e.jsx("strong",{children:"Polling cost."})," Reading ",e.jsx(n,{children:"IsCancellationRequested"}),` traverses
`,e.jsx(n,{children:"token → _source → _canceled"}),`, performs a type check on the
source, and compares the integer flag against zero. There is no lock, no allocation, and no
system call on the hot path.`]})}),`
`,e.jsx(t,{children:e.jsxs(a.p,{children:[e.jsx("strong",{children:"Integration with async I/O."}),` The standard streams check the token at operation
start and inside the worker callback. Passing an already-canceled token to`," ",`
`,e.jsx(n,{children:"ReadAsync"}),` causes the method to complete immediately with an exception
rather than performing I/O.`]})}),`
`,e.jsx(r,{tone:"amber",title:"Linked tokens and timeout APIs are not implemented",children:e.jsxs(a.p,{children:["There is currently no ",e.jsx(n,{children:"CancellationTokenSource.CreateLinkedTokenSource"}),`,
no `,e.jsx(n,{children:"CancellationToken.None"})," static field, and no"," ",`
`,e.jsx(n,{children:"CancelAfter(ms)"}),` method. To combine multiple cancellation sources,
poll each token manually or forward the single source that owns the token. To cancel after a
delay, start a `,e.jsx(n,{children:"Task.Delay"})," and call ",e.jsx(n,{children:"Cancel()"})," ",`
from its continuation.`]})}),`
`,e.jsx(o,{children:"Examples"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Creating a token and signaling cancellation."})}),`
`,e.jsx(l,{code:`using stdio;
using async;

namespace demo;

public class Program
{
  public static func Main() -> void
  {
      cts: CancellationTokenSource = new CancellationTokenSource();
      token: CancellationToken = cts.Token;

      // The token starts in the uncanceled state.
      println(token.IsCancellationRequested);  // false
      println(token.CanBeCanceled);            // true

      // Signal cancellation through the source.
      cts.Cancel();

      println(token.IsCancellationRequested);  // true
  }
}`,language:"csharp",filename:"cancellation_basic.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Cooperative polling inside an async loop."})}),`
`,e.jsx(l,{code:`using stdio;
using async;

namespace demo;

public class Program
{
  public static async func PollUntilCanceled(token: CancellationToken) -> Task
  {
      iterations: int = 0;

      while (!token.IsCancellationRequested)
      {
          iterations = iterations + 1;
          println("poll " + iterations);

          // Yield control back to the event loop.
          await Task.Delay(50);
      }

      println("canceled after " + iterations);
  }

  public static func Main() -> void
  {
      cts: CancellationTokenSource = new CancellationTokenSource();
      task: Task = PollUntilCanceled(cts.Token);

      // Let the loop run for a few iterations.
      Task.Wait(Task.Delay(150));

      // Signal cancellation and wait for graceful exit.
      cts.Cancel();
      Task.Wait(task);

      println("done");
  }
}`,language:"csharp",filename:"cancellation_poll.shard"}),`
`,e.jsx(r,{tone:"blue",children:e.jsx(a.p,{children:`The loop exits cleanly because it polls the token on every iteration. If the body performed a
blocking native call without checking the token, cancellation would not take effect until the
call returned.`})}),`
`,e.jsx(t,{children:e.jsxs(a.p,{children:[e.jsx("strong",{children:"Sharing one source across multiple tokens."}),` Because the same source instance is
shared, every token derived from it observes the same cancellation signal.`]})}),`
`,e.jsx(l,{code:`using stdio;
using async;

namespace demo;

public class Program
{
  public static func Main() -> void
  {
      cts: CancellationTokenSource = new CancellationTokenSource();
      token1: CancellationToken = cts.Token;
      token2: CancellationToken = cts.Token;

      println(token1.IsCancellationRequested);  // false
      println(token2.IsCancellationRequested);  // false

      // A single Cancel call affects every linked token.
      cts.Cancel();

      println(token1.IsCancellationRequested);  // true
      println(token2.IsCancellationRequested);  // true
  }
}`,language:"csharp",filename:"cancellation_shared.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Cancelling an async file read."})}),`
`,e.jsx(l,{code:`using stdio;
using async;
using filesystem;

namespace demo;

public class Program
{
  public static async func Run() -> Task
  {
      path: string = "D:/temp/cancel_demo.bin";

      if (File.Exists(path))
      {
          File.Delete(path);
      }

      // Write test content.
      fsWrite: FileStream = new FileStream(path, FileMode.CreateNew, FileAccess.Write);
      data: byte[] = [10 as byte, 20 as byte, 30 as byte];
      fsWrite.Write(data, 0, 3);
      fsWrite.Dispose();

      // Prepare an already-canceled token.
      cts: CancellationTokenSource = new CancellationTokenSource();
      token: CancellationToken = cts.Token;
      cts.Cancel();

      // The read should detect cancellation immediately.
      fsRead: FileStream = new FileStream(path, FileMode.Open, FileAccess.Read);
      buffer: byte[] = [0 as byte, 0 as byte, 0 as byte];

      try
      {
          await fsRead.ReadAsync(buffer, 0, 3, token);
          println("Expected cancellation exception");
      }
      catch (ex: RuntimeException)
      {
          println("canceled read threw: " + ex.message);
      }

      fsRead.Dispose();
      println("file stream cancellation ok");
  }

  public static func Main() -> void
  {
      Task.Wait(Run());
  }
}`,language:"csharp",filename:"cancellation_file.shard"}),`
`,e.jsx(t,{children:e.jsxs(a.p,{children:[e.jsx("strong",{children:"Handling multiple independent tokens manually."}),` When a method is driven by
several sources, poll each token separately because no automatic linking API exists yet.`]})}),`
`,e.jsx(l,{code:`using stdio;
using async;

namespace demo;

public class Program
{
  public static async func Work(token1: CancellationToken, token2: CancellationToken) -> Task
  {
      while (!token1.IsCancellationRequested && !token2.IsCancellationRequested)
      {
          println("working...");
          await Task.Delay(40);
      }

      if (token1.IsCancellationRequested)
      {
          println("stopped by token1");
      }
      else
      {
          println("stopped by token2");
      }
  }

  public static func Main() -> void
  {
      cts1: CancellationTokenSource = new CancellationTokenSource();
      cts2: CancellationTokenSource = new CancellationTokenSource();

      task: Task = Work(cts1.Token, cts2.Token);

      Task.Wait(Task.Delay(100));
      cts1.Cancel();
      Task.Wait(task);

      println("done");
  }
}`,language:"csharp",filename:"cancellation_multi.shard"}),`
`,e.jsx(t,{children:e.jsxs(a.p,{children:[e.jsx("strong",{children:"Common mistake: forgetting to poll."}),` A canceled token has no effect unless the
code reads it.`]})}),`
`,e.jsx(l,{code:`using stdio;
using async;

namespace demo;

public class Program
{
  public static async func IgnoresToken(token: CancellationToken) -> Task
  {
      iterations: int = 0;

      // BUG: the token is never checked, so Cancel() cannot stop the loop.
      while (iterations < 3)
      {
          iterations = iterations + 1;
          println("running " + iterations);
          await Task.Delay(50);
      }
  }

  public static func Main() -> void
  {
      cts: CancellationTokenSource = new CancellationTokenSource();
      task: Task = IgnoresToken(cts.Token);

      cts.Cancel();
      Task.Wait(task);

      println("done");
  }
}`,language:"csharp",filename:"cancellation_mistake.shard"}),`
`,e.jsx(r,{tone:"amber",children:e.jsxs(a.p,{children:["Cancellation is not preemptive. If an operation does not check"," ",`
`,e.jsx(n,{children:"IsCancellationRequested"}),", it continues until it finishes on its own."]})})]})}function k(s={}){const{wrapper:a}=s.components||{};return a?e.jsx(a,{...s,children:e.jsx(h,{...s})}):h(s)}function i(s,a){throw new Error("Expected component `"+s+"` to be defined: you likely forgot to import, pass, or provide it.")}export{k as default};
