import{j as e}from"./index-DIkNH1R5.js";function h(s){const t={code:"code",p:"p",...s.components},{Bullet:i,Callout:r,CodeBlock:o,DocsTable:d,H2:c,InlineCode:n,Prose:a}=t;return i||l("Bullet"),r||l("Callout"),o||l("CodeBlock"),d||l("DocsTable"),c||l("H2"),n||l("InlineCode"),a||l("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(c,{children:"Summary"}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:["The ",e.jsx(n,{children:"async.CancellationToken"})," and"," ",`
`,e.jsx(n,{children:"async.CancellationTokenSource"}),` types provide a cooperative,
reference-based cancellation mechanism for asynchronous operations in ShardScript.
A `,e.jsx(n,{children:"CancellationTokenSource"}),` owns the cancellation state; every
token retrieved from its `,e.jsx(n,{children:"Token"}),` property observes the same state,
so calling `,e.jsx(n,{children:"Cancel()"}),` on the source immediately makes every
associated token report cancellation.`]})}),`
`,e.jsx(c,{children:"Syntax"}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:["Both types live in the ",e.jsx(n,{children:"async"}),` namespace. The implemented
surface is intentionally small: tokens expose read-only observables, and the source
exposes the single mutating operation `,e.jsx(n,{children:"Cancel()"}),"."]})}),`
`,e.jsx(d,{headers:["Type","Member","Signature","Description"],rows:[[e.jsx(t.code,{children:"CancellationTokenSource"}),e.jsx(t.code,{children:"init"}),e.jsx(t.code,{children:"new CancellationTokenSource()"}),"Creates a source in the non-canceled state and allocates its token."],[e.jsx(t.code,{children:"CancellationTokenSource"}),e.jsx(t.code,{children:"Cancel"}),e.jsx(t.code,{children:"func Cancel() -> void"}),"Sets the canceled flag on the source and every token derived from it."],[e.jsx(t.code,{children:"CancellationTokenSource"}),e.jsx(t.code,{children:"Token"}),e.jsx(t.code,{children:"property Token: CancellationToken"}),"Returns the token associated with this source."],[e.jsx(t.code,{children:"CancellationToken"}),e.jsx(t.code,{children:"IsCancellationRequested"}),e.jsx(t.code,{children:"property IsCancellationRequested: bool"}),"True when the owning source has been canceled."],[e.jsx(t.code,{children:"CancellationToken"}),e.jsx(t.code,{children:"CanBeCanceled"}),e.jsx(t.code,{children:"property CanBeCanceled: bool"}),"True when the token is associated with a source."]]}),`
`,e.jsx(r,{tone:"amber",title:"Planned API members",children:e.jsxs(t.p,{children:[e.jsx(n,{children:"CancellationToken.Register(callback)"}),","," ",`
`,e.jsx(n,{children:"CancellationToken.ThrowIfCancellationRequested()"}),`, timed
cancellation via `,e.jsx(n,{children:"CancellationTokenSource.CancelAfter(...)"}),`, and
linked token sources are planned but not yet implemented in the current runtime. Until
they land, poll `,e.jsx(n,{children:"IsCancellationRequested"}),` explicitly or throw
your own `,e.jsx(n,{children:"RuntimeException"})," when cancellation is detected."]})}),`
`,e.jsx(c,{children:"Parameters / Arguments"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsxs(i,{children:[e.jsx("strong",{className:"text-text-primary",children:e.jsx(n,{children:"new CancellationTokenSource()"})})," ",e.jsx(t.p,{children:`— Takes no arguments. The constructor allocates a new source object and the single
token instance that points back to it.`})]}),e.jsxs(i,{children:[e.jsx("strong",{className:"text-text-primary",children:e.jsx(n,{children:"source.Cancel()"})})," ",e.jsxs(t.p,{children:["— Takes no arguments. The cancellation flag is idempotent: calling"," ",`
`,e.jsx(n,{children:"Cancel()"})," on an already-canceled source leaves it canceled."]})]}),e.jsxs(i,{children:[e.jsx("strong",{className:"text-text-primary",children:e.jsx(n,{children:"source.Token"})})," ",e.jsx(t.p,{children:"— Takes no arguments. Always returns the same token object for a given source."})]}),e.jsxs(i,{children:[e.jsx("strong",{className:"text-text-primary",children:e.jsx(n,{children:"token.IsCancellationRequested"})})," ",e.jsxs(t.p,{children:["— Takes no arguments. Returns ",e.jsx(n,{children:"true"}),` if the source has been
canceled or if the token has no source; otherwise `,e.jsx(n,{children:"false"}),"."]})]}),e.jsxs(i,{children:[e.jsx("strong",{className:"text-text-primary",children:e.jsx(n,{children:"token.CanBeCanceled"})})," ",e.jsxs(t.p,{children:["— Takes no arguments. Returns ",e.jsx(n,{children:"true"}),` when the token is backed
by a source. Tokens obtained from `,e.jsx(n,{children:"CancellationTokenSource.Token"})," ",`
always return `,e.jsx(n,{children:"true"}),"."]})]})]}),`
`,e.jsx(c,{children:"Returns"}),`
`,e.jsx(d,{headers:["Member","Return Type","Value"],rows:[[e.jsx(t.code,{children:"CancellationTokenSource.Cancel()"}),"void","No value."],[e.jsx(t.code,{children:"CancellationTokenSource.Token"}),e.jsx(t.code,{children:"CancellationToken"}),"The token instance owned by the source."],[e.jsx(t.code,{children:"CancellationToken.IsCancellationRequested"}),e.jsx(t.code,{children:"bool"}),"True if the source has been canceled."],[e.jsx(t.code,{children:"CancellationToken.CanBeCanceled"}),e.jsx(t.code,{children:"bool"}),"True if the token is backed by a source."]]}),`
`,e.jsx(c,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Stream and socket cancellation"})," ",`
— Overloads of `,e.jsx(n,{children:"ReadAsync"}),", ",e.jsx(n,{children:"WriteAsync"}),`,
and `,e.jsx(n,{children:"FlushAsync"})," on ",e.jsx(n,{children:"MemoryStream"}),","," ",`
`,e.jsx(n,{children:"FileStream"}),", and ",e.jsx(n,{children:"SocketStream"}),` that
accept a `,e.jsx(n,{children:"CancellationToken"}),` return a faulted task whose
exception is a `,e.jsx(n,{children:"RuntimeException"}),` with the message
"Operation canceled." when the token is already canceled before the
operation starts.`]})}),e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"User-thrown cancellation"})," ",`
— Cooperative code typically checks `,e.jsx(n,{children:"IsCancellationRequested"})," ",`
and throws its own `,e.jsx(n,{children:"RuntimeException"}),`. The runtime does not
automatically inject an exception when a token becomes canceled.`]})})]}),`
`,e.jsx(c,{children:"Remarks"}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Cooperative cancellation only."}),` ShardScript cancellation is not
preemptive. An async method must poll its token at well-defined yield points; the
runtime will not interrupt running bytecode. This makes cancellation safe and
deterministic, but it also means long-running synchronous work inside an async method
can delay cancellation until it finishes.`]})}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Token propagation."})," A ",e.jsx(n,{children:"CancellationToken"}),` is a
reference to a `,e.jsx(n,{children:"CancellationTokenSource"}),`. Copying the token
variable, passing it as an argument, or retrieving `,e.jsx(n,{children:"source.Token"})," ",`
multiple times all yield references to the same underlying source. Cancelling the
source therefore affects every observer simultaneously.`]})}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"CanBeCanceled semantics."}),` The property checks whether the token has a
non-null source. Because the only way to obtain a token today is through`," ",`
`,e.jsx(n,{children:"CancellationTokenSource.Token"}),", every usable token returns"," ",`
`,e.jsx(n,{children:"true"}),`. If the source object is garbage-collected, the token
will report `,e.jsx(n,{children:"false"})," for both"," ",`
`,e.jsx(n,{children:"CanBeCanceled"})," and ",e.jsx(n,{children:"IsCancellationRequested"}),"."]})}),`
`,e.jsx(a,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Native I/O integration."}),` The libuv-backed stream and socket shards read
the cancellation flag before scheduling an async operation. If the token is already
canceled, they short-circuit and return a faulted task rather than starting the I/O.
Long-running operations that have already begun are not aborted mid-flight; the
cancellation is observed at the next await boundary.`]})}),`
`,e.jsx(r,{tone:"blue",children:e.jsxs(t.p,{children:["There is no ",e.jsx(n,{children:"Dispose"})," method on"," ",`
`,e.jsx(n,{children:"CancellationTokenSource"}),` today. Once canceled, a source remains
canceled for its lifetime. Reuse a single source for multiple operations only if you
intend to cancel all of them together; otherwise create a fresh source per operation.`]})}),`
`,e.jsx(c,{children:"Examples"}),`
`,e.jsx(a,{children:e.jsx("strong",{children:"Basic creation, properties, and cancellation."})}),`
`,e.jsx(o,{code:`using stdio;
using async;

namespace demo;

public static func Main() -> void
{
  cts: CancellationTokenSource = new CancellationTokenSource();
  token: CancellationToken = cts.Token;

  println(token.CanBeCanceled);          // true
  println(token.IsCancellationRequested); // false

  cts.Cancel();

  println(token.IsCancellationRequested); // true
}`,language:"csharp",filename:"cancellation_basic.shard"}),`
`,e.jsx(a,{children:e.jsx("strong",{children:"Propagation through multiple token references."})}),`
`,e.jsx(o,{code:`using stdio;
using async;

namespace demo;

public static func Main() -> void
{
  cts: CancellationTokenSource = new CancellationTokenSource();

  // Each retrieval returns the same underlying token.
  token1: CancellationToken = cts.Token;
  token2: CancellationToken = cts.Token;

  println(token1.IsCancellationRequested); // false
  println(token2.IsCancellationRequested); // false

  // Cancelling the source propagates to every observer.
  cts.Cancel();

  println(token1.IsCancellationRequested); // true
  println(token2.IsCancellationRequested); // true
}`,language:"csharp",filename:"cancellation_propagation.shard"}),`
`,e.jsx(a,{children:e.jsx("strong",{children:"Cooperative cancellation inside an async loop."})}),`
`,e.jsx(o,{code:`using stdio;
using async;

namespace demo;

public static async func PollUntilCanceled(token: CancellationToken) -> Task
{
  iterations: int = 0;

  // Poll the token each iteration so cancellation is observed promptly.
  while (!token.IsCancellationRequested)
  {
      iterations = iterations + 1;
      println("poll " + iterations);
      await Task.Delay(50);
  }

  println("canceled after " + iterations);
}

public static func Main() -> void
{
  cts: CancellationTokenSource = new CancellationTokenSource();
  work: Task = PollUntilCanceled(cts.Token);

  // Let the loop run for a moment, then request cancellation.
  Wait(Task.Delay(150));
  cts.Cancel();

  Task.Wait(work);
  println("done");
}`,language:"csharp",filename:"cancellation_polling.shard"}),`
`,e.jsx(a,{children:e.jsx("strong",{children:"Cancelling a stream read before it starts."})}),`
`,e.jsx(o,{code:`using stdio;
using async;
using filesystem;

namespace demo;

public static async func Run() -> Task
{
  path: string = "D:/temp/shard_cancel_demo.bin";

  if (File.Exists(path))
  {
      File.Delete(path);
  }

  // Set up a small file to read back.
  fsWrite: FileStream = new FileStream(path, FileMode.CreateNew, FileAccess.Write);
  input: byte[] = [10 as byte, 20 as byte, 30 as byte];
  fsWrite.Write(input, 0, 3);
  fsWrite.Dispose();

  // Cancel before scheduling the read.
  cts: CancellationTokenSource = new CancellationTokenSource();
  cts.Cancel();

  fsRead: FileStream = new FileStream(path, FileMode.Open, FileAccess.Read);
  buffer: byte[] = [0 as byte, 0 as byte, 0 as byte];

  try
  {
      await fsRead.ReadAsync(buffer, 0, 3, cts.Token);
      println("Expected cancellation exception");
      throw new RuntimeException();
  }
  catch (ex: RuntimeException)
  {
      println("canceled read threw: " + ex.message);
  }

  fsRead.Dispose();
}

public static func Main() -> void
{
  task: Task = Run();
  Task.Wait(task);
}`,language:"csharp",filename:"cancellation_stream.shard"}),`
`,e.jsx(a,{children:e.jsxs("strong",{children:["Manual ",e.jsx(n,{children:"ThrowIfCancellationRequested"})," equivalent."]})}),`
`,e.jsx(o,{code:`using stdio;
using async;

namespace demo;

// Helper that mimics the planned ThrowIfCancellationRequested member.
public static func ThrowIfCanceled(token: CancellationToken) -> void
{
  if (token.IsCancellationRequested)
  {
      throw new RuntimeException("The operation was canceled.");
  }
}

public static async func DoWork(token: CancellationToken) -> Task
{
  index: int = 0;

  while (index < 5)
  {
      // Fail fast if cancellation was requested before this chunk.
      ThrowIfCanceled(token);

      println("working " + index);
      await Task.Delay(30);

      index = index + 1;
  }
}

public static func Main() -> void
{
  cts: CancellationTokenSource = new CancellationTokenSource();
  work: Task = DoWork(cts.Token);

  Wait(Task.Delay(80));
  cts.Cancel();

  try
  {
      Task.Wait(work);
  }
  catch (ex: RuntimeException)
  {
      println("caught: " + ex.message);
  }
}`,language:"csharp",filename:"cancellation_throw_helper.shard"}),`
`,e.jsx(a,{children:e.jsx("strong",{children:"Common mistake: swallowing cancellation as a generic error."})}),`
`,e.jsx(o,{code:`using stdio;
using async;
using filesystem;

namespace demo;

public static async func Run(token: CancellationToken) -> Task
{
  path: string = "D:/temp/shard_cancel_demo.bin";

  if (File.Exists(path))
  {
      File.Delete(path);
  }

  fsWrite: FileStream = new FileStream(path, FileMode.CreateNew, FileAccess.Write);
  input: byte[] = [1 as byte, 2 as byte, 3 as byte];
  fsWrite.Write(input, 0, 3);
  fsWrite.Dispose();

  fsRead: FileStream = new FileStream(path, FileMode.Open, FileAccess.Read);
  buffer: byte[] = [0 as byte, 0 as byte, 0 as byte];

  try
  {
      await fsRead.ReadAsync(buffer, 0, 3, token);
  }
  catch (ex: RuntimeException)
  {
      // Distinguish cancellation from genuine failures by inspecting the message.
      if (ex.message == "Operation canceled.")
      {
          println("operation was canceled");
      }
      else
      {
          println("unexpected error: " + ex.message);
          throw;
      }
  }

  fsRead.Dispose();
}

public static func Main() -> void
{
  cts: CancellationTokenSource = new CancellationTokenSource();
  cts.Cancel();

  task: Task = Run(cts.Token);
  Task.Wait(task);
}`,language:"csharp",filename:"cancellation_distinguish.shard"})]})}function x(s={}){const{wrapper:t}=s.components||{};return t?e.jsx(t,{...s,children:e.jsx(h,{...s})}):h(s)}function l(s,t){throw new Error("Expected component `"+s+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
