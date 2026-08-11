import{j as e}from"./index-C1AvCmMi.js";function h(t){const n={code:"code",p:"p",...t.components},{Bullet:i,Callout:l,CodeBlock:a,DocsTable:o,H2:c,InlineCode:s,Prose:r}=n;return i||d("Bullet"),l||d("Callout"),a||d("CodeBlock"),o||d("DocsTable"),c||d("H2"),s||d("InlineCode"),r||d("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(c,{children:"Summary"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:["The ",e.jsx(s,{children:"shard.streams"})," library (namespace ",e.jsx(s,{children:"io"}),`) defines a
three-tier interface hierarchy — `,e.jsx(s,{children:"IStream"}),", ",e.jsx(s,{children:"IReadableStream"}),`,
and `,e.jsx(s,{children:"IWritableStream"}),` — that every byte-oriented stream implementation must
satisfy. These contracts let you write polymorphic I/O code that works with `,e.jsx(s,{children:"MemoryStream"}),`,
`,e.jsx(s,{children:"FileStream"}),", ",e.jsx(s,{children:"SocketStream"}),`, or any future backend without
depending on a concrete type.`]})}),`
`,e.jsx(c,{children:"Syntax"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:["All stream interfaces live in the ",e.jsx(s,{children:"io"}),` namespace. Concrete stream types are
declared in their own libraries, but they implement the same `,e.jsx(s,{children:"io"})," interfaces:"]})}),`
`,e.jsx(a,{code:`using io;

namespace demo;

public static func Main() -> void
{
  // A MemoryStream can be viewed through every abstraction.
  ms := new MemoryStream();

  base: IStream = ms;
  reader: IReadableStream = ms;
  writer: IWritableStream = ms;

  // Cleanup is always expressed through the base interface.
  base.Dispose();
}`,language:"csharp",filename:"stream_abstractions.shard"}),`
`,e.jsx(o,{headers:["Interface","Extends","Role"],rows:[[e.jsx(n.code,{children:"IStream"}),e.jsx(n.code,{children:"IDisposable"}),"Base contract. Guarantees deterministic cleanup via Dispose()."],[e.jsx(n.code,{children:"IReadableStream"}),e.jsx(n.code,{children:"IStream"}),"Adds synchronous and asynchronous byte read operations."],[e.jsx(n.code,{children:"IWritableStream"}),e.jsx(n.code,{children:"IStream"}),"Adds synchronous and asynchronous byte write and flush operations."]]}),`
`,e.jsx(c,{children:"Parameters / Arguments"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"IStream"}),` is the root contract. It contributes the single member inherited from
`,e.jsx(s,{children:"IDisposable"}),":"]})}),`
`,e.jsx(o,{headers:["Member","Parameters","Description"],rows:[[e.jsx(n.code,{children:"Dispose()"}),"none","Closes the stream and releases native resources."]]}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"IReadableStream"}),` adds byte-oriented read methods. Every overload copies up to
`,e.jsx(s,{children:"count"})," bytes from the stream into ",e.jsx(s,{children:"buffer"}),` starting at
`,e.jsx(s,{children:"offset"}),":"]})}),`
`,e.jsx(o,{headers:["Member","Parameters","Description"],rows:[[e.jsx(n.code,{children:"Read(buffer, offset, count)"}),e.jsxs(e.Fragment,{children:[e.jsx(n.code,{children:"buffer"}),": byte[], ",e.jsx(n.code,{children:"offset"}),": int, ",e.jsx(n.code,{children:"count"}),": int"]}),"Reads up to count bytes synchronously."],[e.jsx(n.code,{children:"ReadAsync(buffer, offset, count)"}),e.jsxs(e.Fragment,{children:[e.jsx(n.code,{children:"buffer"}),": byte[], ",e.jsx(n.code,{children:"offset"}),": int, ",e.jsx(n.code,{children:"count"}),": int"]}),"Asynchronously reads up to count bytes."],[e.jsx(n.code,{children:"ReadAsync(buffer, offset, count, cancellationToken)"}),e.jsxs(e.Fragment,{children:[e.jsx(n.code,{children:"buffer"}),": byte[], ",e.jsx(n.code,{children:"offset"}),": int, ",e.jsx(n.code,{children:"count"}),": int, ",e.jsx(n.code,{children:"cancellationToken"}),": CancellationToken"]}),"Asynchronous read with cancellation support."]]}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"IWritableStream"})," adds byte-oriented write and flush methods:"]})}),`
`,e.jsx(o,{headers:["Member","Parameters","Description"],rows:[[e.jsx(n.code,{children:"Write(buffer, offset, count)"}),e.jsxs(e.Fragment,{children:[e.jsx(n.code,{children:"buffer"}),": byte[], ",e.jsx(n.code,{children:"offset"}),": int, ",e.jsx(n.code,{children:"count"}),": int"]}),"Writes count bytes from buffer to the stream."],[e.jsx(n.code,{children:"WriteAsync(buffer, offset, count)"}),e.jsxs(e.Fragment,{children:[e.jsx(n.code,{children:"buffer"}),": byte[], ",e.jsx(n.code,{children:"offset"}),": int, ",e.jsx(n.code,{children:"count"}),": int"]}),"Asynchronously writes count bytes."],[e.jsx(n.code,{children:"WriteAsync(buffer, offset, count, cancellationToken)"}),e.jsxs(e.Fragment,{children:[e.jsx(n.code,{children:"buffer"}),": byte[], ",e.jsx(n.code,{children:"offset"}),": int, ",e.jsx(n.code,{children:"count"}),": int, ",e.jsx(n.code,{children:"cancellationToken"}),": CancellationToken"]}),"Asynchronous write with cancellation support."],[e.jsx(n.code,{children:"Flush()"}),"none","Forces any buffered data to the underlying device."],[e.jsx(n.code,{children:"FlushAsync()"}),"none","Asynchronously flushes buffered data."],[e.jsx(n.code,{children:"FlushAsync(cancellationToken)"}),e.jsxs(e.Fragment,{children:[e.jsx(n.code,{children:"cancellationToken"}),": CancellationToken"]}),"Asynchronous flush with cancellation support."]]}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"SeekOrigin"})," is an enum in the ",e.jsx(s,{children:"io"}),` namespace. It is used by
seekable concrete streams such as `,e.jsx(s,{children:"MemoryStream"})," and ",e.jsx(s,{children:"FileStream"}),":"]})}),`
`,e.jsx(o,{headers:["Value","Underlying int","Meaning"],rows:[[e.jsx(n.code,{children:"SeekOrigin.Begin"}),"0","Offset is relative to the start of the stream."],[e.jsx(n.code,{children:"SeekOrigin.Current"}),"1","Offset is relative to the current position."],[e.jsx(n.code,{children:"SeekOrigin.End"}),"2","Offset is relative to the end of the stream."]]}),`
`,e.jsx(c,{children:"Returns"}),`
`,e.jsx(o,{headers:["Member","Return Type","Meaning"],rows:[[e.jsx(n.code,{children:"Read(buffer, offset, count)"}),e.jsx(n.code,{children:"int"}),"Number of bytes actually read. Zero means end-of-stream."],[e.jsx(n.code,{children:"ReadAsync(...)"}),e.jsx(n.code,{children:"ValueTask<int>"}),"Awaitable number of bytes read."],[e.jsx(n.code,{children:"Write(buffer, offset, count)"}),e.jsx(n.code,{children:"void"}),"Writes exactly count bytes or throws."],[e.jsx(n.code,{children:"WriteAsync(...)"}),e.jsx(n.code,{children:"Task"}),"Awaitable completion of the write operation."],[e.jsx(n.code,{children:"Flush() / FlushAsync(...)"}),e.jsx(n.code,{children:"void"})/e.jsx(n.code,{children:"Task"}),"Ensures buffered data reaches the backing store."],[e.jsx(n.code,{children:"Dispose()"}),e.jsx(n.code,{children:"void"}),"Releases the stream and underlying resources."],[e.jsx(n.code,{children:"Seek(offset, origin)"}),e.jsx(n.code,{children:"int"}),"The new position after seeking."]]}),`
`,e.jsx(c,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Cannot access a closed stream"}),` — Calling
`,e.jsx(s,{children:"Read"}),", ",e.jsx(s,{children:"Write"}),", or ",e.jsx(s,{children:"Seek"}),` after
`,e.jsx(s,{children:"Dispose()"})," or ",e.jsx(s,{children:"Close()"})," throws a runtime exception."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Offset and count must be non-negative"}),` — Both
`,e.jsx(s,{children:"Read"})," and ",e.jsx(s,{children:"Write"})," reject negative offsets or counts."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Buffer bounds violation"})," — If ",e.jsx(s,{children:"offset + count"})," ",`
exceeds `,e.jsx(s,{children:"buffer.Length"}),", the operation throws rather than silently corrupt memory."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Cannot write to a non-writable stream"}),` — A stream created from
a read-only byte array (for example, `,e.jsx(s,{children:"new MemoryStream(buffer)"}),") rejects writes."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Cannot seek before the beginning"})," — ",e.jsx(s,{children:"Seek"})," ",`
throws when the resulting position is negative.`]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Invalid seek origin"})," — Passing a value other than"," ",`
`,e.jsx(s,{children:"Begin"}),", ",e.jsx(s,{children:"Current"}),", or ",e.jsx(s,{children:"End"})," throws."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Operation canceled"}),` — The cancellation-aware async overloads return
a faulted task when the `,e.jsx(s,{children:"CancellationToken"})," is already canceled."]})})]}),`
`,e.jsx(c,{children:"Remarks"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Position and Length are not interface members."}),` The contracts above intentionally say
nothing about random access. `,e.jsx(s,{children:"Position"}),", ",e.jsx(s,{children:"Length"}),`, and
`,e.jsx(s,{children:"Seek"})," are provided by seekable concrete types such as"," ",`
`,e.jsx(s,{children:"MemoryStream"})," and ",e.jsx(s,{children:"FileStream"}),`. Network-backed streams such as
`,e.jsx(s,{children:"SocketStream"}),` do not support seeking; code that needs random access should accept the
concrete type or test capabilities before calling `,e.jsx(s,{children:"Seek"}),"."]})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Read returns zero at end-of-stream."})," A ",e.jsx(s,{children:"Read"}),` call may return fewer
bytes than requested even before EOF (for example, when reading from a socket with a partial packet). The only
reliable EOF signal is a return value of `,e.jsx(s,{children:"0"}),`. Loops that need an exact byte count should
call `,e.jsx(s,{children:"Read"})," repeatedly until the buffer is filled or EOF is reached."]})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Write is all-or-nothing for MemoryStream."}),` In-memory writes always copy the full requested
count, growing the internal buffer as needed. Device-backed streams may buffer internally; call`," ",`
`,e.jsx(s,{children:"Flush"})," or dispose the stream to ensure data is persisted."]})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Dispose is idempotent."})," Calling ",e.jsx(s,{children:"Dispose()"}),` more than once is safe.
Disposing a stream through an `,e.jsx(s,{children:"IStream"}),`-typed reference also satisfies any wrapper such as
`,e.jsx(s,{children:"StreamReader"})," or ",e.jsx(s,{children:"BinaryReader"})," that holds the same instance."]})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Async overloads are thin wrappers for in-memory streams."})," ",`
`,e.jsx(s,{children:"MemoryStream.ReadAsync"})," and ",e.jsx(s,{children:"WriteAsync"}),` complete synchronously
on the caller's thread and return an already-completed `,e.jsx(s,{children:"ValueTask"})," or"," ",`
`,e.jsx(s,{children:"Task"}),`. Device-backed streams (file, socket) schedule real asynchronous I/O on the libuv
event loop and resume the awaiter when the operation completes.`]})}),`
`,e.jsx(l,{tone:"blue",children:e.jsxs(n.p,{children:["Prefer interface-typed parameters when writing reusable helpers. A function that accepts"," ",`
`,e.jsx(s,{children:"IReadableStream"}),` works equally well with files, memory buffers, and sockets without
introducing coupling to any specific library.`]})}),`
`,e.jsx(l,{tone:"amber",title:"SocketStream is not seekable",children:e.jsxs(n.p,{children:[e.jsx(s,{children:"SocketStream"})," implements ",e.jsx(s,{children:"IReadableStream"})," and"," ",`
`,e.jsx(s,{children:"IWritableStream"}),", but it has no ",e.jsx(s,{children:"Position"}),","," ",`
`,e.jsx(s,{children:"Length"}),", or ",e.jsx(s,{children:"Seek"}),` members. Do not write generic code that assumes
every stream is seekable.`]})}),`
`,e.jsx(c,{children:"Examples"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Assigning a concrete stream to each abstraction."})}),`
`,e.jsx(a,{code:`using stdio;
using io;

namespace demo;

public static func Main() -> void
{
  // MemoryStream implements all three interfaces plus IDisposable.
  ms := new MemoryStream();

  disposable: IDisposable = ms;
  base: IStream = ms;
  reader: IReadableStream = ms;
  writer: IWritableStream = ms;

  // Write through the writable interface.
  payload: byte[] = [65 as byte, 66 as byte, 67 as byte];
  writer.Write(payload, 0, 3);

  // Dispose through the base interface closes the stream.
  base.Dispose();

  println("assigned and disposed ok");
}`,language:"csharp",filename:"stream_assignments.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Reading until end-of-stream with a reusable helper."})}),`
`,e.jsx(a,{code:`using stdio;
using io;

namespace demo;

// A helper that works for any readable stream, not just MemoryStream.
public static func ReadAll(source: IReadableStream) -> byte[]
{
  accumulator := new MemoryStream();
  chunk: byte[] = [0 as byte; 256];

  while (true)
  {
      read: int = source.Read(chunk, 0, 256);
      if (read == 0)
      {
          // EOF reached; no more bytes available.
          break;
      }

      accumulator.Write(chunk, 0, read);
  }

  return accumulator.ToArray();
}

public static func Main() -> void
{
  ms := new MemoryStream();
  ms.Write([72 as byte, 101 as byte, 108 as byte, 108 as byte, 111 as byte], 0, 5);

  // Rewind to the beginning before reading.
  ms.Position = 0;

  all: byte[] = ReadAll(ms);
  println(all.Length);   // 5

  ms.Dispose();
}`,language:"csharp",filename:"stream_read_all.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Seeking with SeekOrigin."})}),`
`,e.jsx(a,{code:`using stdio;
using io;

namespace demo;

public static func Main() -> void
{
  ms := new MemoryStream();
  ms.Write([10 as byte, 20 as byte, 30 as byte, 40 as byte], 0, 4);

  // Seek from the beginning to index 2.
  ms.Seek(2, SeekOrigin.Begin);
  println(ms.Position);   // 2

  // Overwrite the byte at index 2.
  ms.Write([99 as byte], 0, 1);

  // Seek two bytes backward from the current position.
  ms.Seek(-2, SeekOrigin.Current);
  println(ms.Position);   // 1

  // Seek one byte backward from the end.
  ms.Seek(-1, SeekOrigin.End);
  println(ms.Position);   // 3

  ms.Dispose();
}`,language:"csharp",filename:"stream_seek.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Asynchronous read and write."})}),`
`,e.jsx(a,{code:`using stdio;
using io;
using async;

namespace demo;

public static async func CopyAsync(source: IReadableStream, target: IWritableStream) -> Task
{
  buffer: byte[] = [0 as byte; 1024];

  while (true)
  {
      read: int = await source.ReadAsync(buffer, 0, 1024);
      if (read == 0)
      {
          // End of input; flush any remaining buffered output.
          break;
      }

      await target.WriteAsync(buffer, 0, read);
  }

  await target.FlushAsync();
}

public static func Main() -> void
{
  src := new MemoryStream();
  src.Write([1 as byte, 2 as byte, 3 as byte], 0, 3);
  src.Position = 0;

  dst := new MemoryStream();

  task := CopyAsync(src, dst);
  Task.Wait(task);

  dst.Position = 0;
  result: byte[] = [0 as byte; 3];
  dst.Read(result, 0, 3);
  println(result[0]);   // 1
  println(result[1]);   // 2
  println(result[2]);   // 3

  src.Dispose();
  dst.Dispose();
}`,language:"csharp",filename:"stream_async_copy.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Cancellation-aware async operation."})}),`
`,e.jsx(a,{code:`using stdio;
using io;
using async;

namespace demo;

public static async func ReadWithTimeout(source: IReadableStream, buffer: byte[]) -> Task
{
  cts := new CancellationTokenSource();
  cts.CancelAfter(10);   // cancel after 10 milliseconds

  try
  {
      // The cancellation-aware overload checks the token before scheduling I/O.
      read: int = await source.ReadAsync(buffer, 0, buffer.Length, cts.Token);
      println("read " + read + " bytes");
  }
  catch (ex: RuntimeException)
  {
      println("canceled or failed: " + ex.Message);
  }

  cts.Dispose();
}

public static func Main() -> void
{
  ms := new MemoryStream();
  ms.Write([1 as byte, 2 as byte, 3 as byte], 0, 3);
  ms.Position = 0;

  buffer: byte[] = [0 as byte; 256];
  Task.Wait(ReadWithTimeout(ms, buffer));

  ms.Dispose();
}`,language:"csharp",filename:"stream_cancellation.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Common mistake: reading without checking the returned count."})}),`
`,e.jsx(a,{code:`using stdio;
using io;

namespace demo;

public static func Main() -> void
{
  ms := new MemoryStream();
  ms.Write([65 as byte, 66 as byte], 0, 2);
  ms.Position = 0;

  buffer: byte[] = [0 as byte; 10];

  // WRONG: assumes Read fills the entire buffer.
  // ms.Read(buffer, 0, 10);
  // println(buffer[2]);   // undefined content

  // CORRECT: use the returned count.
  read: int = ms.Read(buffer, 0, 10);
  println(read);   // 2

  i: int = 0;
  while (i < read)
  {
      println(buffer[i]);
      i = i + 1;
  }

  ms.Dispose();
}`,language:"csharp",filename:"stream_read_count.shard"})]})}function u(t={}){const{wrapper:n}=t.components||{};return n?e.jsx(n,{...t,children:e.jsx(h,{...t})}):h(t)}function d(t,n){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};
