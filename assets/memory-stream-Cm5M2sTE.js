import{j as e}from"./index-DbX8E4-q.js";function h(i){const n={p:"p",...i.components},{Bullet:s,Callout:d,CodeBlock:o,DocsTable:l,H2:a,InlineCode:t,Prose:r}=n;return s||c("Bullet"),d||c("Callout"),o||c("CodeBlock"),l||c("DocsTable"),a||c("H2"),t||c("InlineCode"),r||c("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(a,{children:"Summary"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"MemoryStream"})," is a byte-array-backed in-memory stream that implements"," ",`
`,e.jsx(t,{children:"IReadableStream"}),", ",e.jsx(t,{children:"IWritableStream"}),", and"," ",`
`,e.jsx(t,{children:"IDisposable"}),". All data lives in a ShardScript ",e.jsx(t,{children:"byte[]"})," ",`
managed by the stream itself. It can be created empty, with a pre-allocated capacity, or from an
existing byte array (which produces a read-only view). Capacity grows automatically on writes,
and the full contents can be extracted as a new array via `,e.jsx(t,{children:"ToArray"}),"."]})}),`
`,e.jsx(a,{children:"Syntax"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"MemoryStream"})," is declared in the ",e.jsx(t,{children:"io"}),` namespace.
Use one of the three constructors to create an instance.`]})}),`
`,e.jsx(l,{headers:["Constructor","Parameters","Description"],rows:[["init()","—","Creates an empty, writable stream. Capacity is 0 until the first write."],["init(buffer: byte[])","buffer: byte[]","Creates a read-only stream backed by the supplied buffer. Position is 0, Length and Capacity equal buffer.Length."],["init(capacity: int)","capacity: int","Creates an empty, writable stream with a pre-allocated internal buffer of the given size."]]}),`
`,e.jsx(l,{headers:["Method","Parameters","Returns","Description"],rows:[["Read(buffer: byte[], offset: int, count: int)","buffer, offset, count","int","Reads up to count bytes from the current Position into buffer[offset..]. Returns the number of bytes actually read (0 at EOF)."],["ReadAsync(buffer: byte[], offset: int, count: int)","buffer, offset, count","ValueTask<int>","Synchronous wrapper that returns a completed ValueTask<int> for interface conformance."],["ReadAsync(buffer: byte[], offset: int, count: int, cancellationToken: CancellationToken)","buffer, offset, count, cancellationToken","ValueTask<int>","Checks cancellation first; if canceled, returns a faulted ValueTask<int>. Otherwise delegates to Read."],["Write(buffer: byte[], offset: int, count: int)","buffer, offset, count","void","Writes count bytes from buffer[offset..] at the current Position. Grows Capacity if needed, advances Position, and extends Length."],["WriteAsync(buffer: byte[], offset: int, count: int)","buffer, offset, count","Task","Synchronous wrapper that returns a completed Task for interface conformance."],["WriteAsync(buffer: byte[], offset: int, count: int, cancellationToken: CancellationToken)","buffer, offset, count, cancellationToken","Task","Checks cancellation first; if canceled, returns a faulted Task. Otherwise delegates to Write."],["Flush()","—","void","No-op — MemoryStream has no underlying device to flush."],["FlushAsync()","—","Task","No-op that returns a completed Task for interface conformance."],["FlushAsync(cancellationToken: CancellationToken)","cancellationToken","Task","Checks cancellation first; if canceled, returns a faulted Task. Otherwise no-op."],["Seek(offset: int, origin: SeekOrigin)","offset, origin","int","Moves Position relative to Begin (0), Current (1), or End (2). Returns the new Position."],["SetLength(value: int)","value: int","void","Sets the logical Length. Truncates or zero-extends the buffer and clamps Position if needed."],["ToArray()","—","byte[]","Returns a new byte[] containing the stream contents from index 0 to Length - 1."],["GetBuffer()","—","byte[]","Returns the internal buffer directly. Mutations through the returned array affect the stream."],["Close()","—","void","Marks the stream as closed."],["Dispose()","—","void","Inherited from IDisposable. Same behavior as Close()."]]}),`
`,e.jsx(l,{headers:["Property","Type","Access","Description"],rows:[["Position","int","get; set","Current read/write cursor. The setter rejects negative values but does not enforce an upper bound."],["Length","int","get; set","Logical number of bytes in the stream. The setter truncates or zero-extends and clamps Position if necessary."],["Capacity","int","get; set","Allocated buffer size. Grows automatically on writes; the setter can pre-allocate or shrink (but not below Length)."]]}),`
`,e.jsx(a,{children:"Parameters / Arguments"}),`
`,e.jsx(l,{headers:["Member","Parameter","Type","Description"],rows:[["init(buffer)","buffer","byte[]","The byte array to expose as a read-only stream."],["init(capacity)","capacity","int","Initial internal buffer size. Must be non-negative."],["Read / ReadAsync","buffer","byte[]","Destination array that receives the bytes."],["Read / ReadAsync","offset","int","Starting index in buffer where bytes are written."],["Read / ReadAsync","count","int","Maximum number of bytes to read."],["ReadAsync (overload)","cancellationToken","CancellationToken","Token that can mark the operation as canceled."],["Write / WriteAsync","buffer","byte[]","Source array containing the bytes to write."],["Write / WriteAsync","offset","int","Starting index in buffer where the source bytes begin."],["Write / WriteAsync","count","int","Number of bytes to copy from buffer."],["WriteAsync (overload)","cancellationToken","CancellationToken","Token that can mark the operation as canceled."],["FlushAsync (overload)","cancellationToken","CancellationToken","Token that can mark the operation as canceled."],["Seek","offset","int","Byte offset to apply relative to origin."],["Seek","origin","SeekOrigin","Begin, Current, or End."],["SetLength","value","int","New logical length. Must be non-negative."],["Position (setter)","value","int","New cursor position. Must be non-negative."],["Length (setter)","value","int","New logical length. Must be non-negative."],["Capacity (setter)","value","int","New buffer size. Must be >= Length."]]}),`
`,e.jsx(a,{children:"Returns"}),`
`,e.jsx(l,{headers:["Member","Return Type","Meaning"],rows:[["Read","int","Number of bytes actually copied into the destination buffer."],["ReadAsync","ValueTask<int>","Completed task wrapping the Read result, or a faulted task if canceled."],["Write / WriteAsync","void / Task","No value; the operation mutates the stream."],["Flush / FlushAsync","void / Task","No value."],["Seek","int","The absolute Position after the seek."],["SetLength","void","No value."],["ToArray","byte[]","A copy of the stream contents from 0 to Length - 1."],["GetBuffer","byte[]","The live internal buffer (not a copy)."],["Close / Dispose","void","No value."],["Position (getter)","int","Current cursor."],["Length (getter)","int","Logical number of bytes."],["Capacity (getter)","int","Currently allocated buffer size."]]}),`
`,e.jsx(a,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Closed stream"}),` — Any read, write, seek, length
change, capacity change, `,e.jsx(t,{children:"ToArray"}),", or ",e.jsx(t,{children:"GetBuffer"})," ",`
after `,e.jsx(t,{children:"Close"}),"/",e.jsx(t,{children:"Dispose"})," throws."]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Write to read-only stream"})," — Calling"," ",`
`,e.jsx(t,{children:"Write"}),", ",e.jsx(t,{children:"WriteAsync"}),","," ",`
`,e.jsx(t,{children:"SetLength"}),", or setting ",e.jsx(t,{children:"Capacity"}),` on a stream
created with `,e.jsx(t,{children:"new MemoryStream(buffer)"})," throws."]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Negative arguments"})," — Negative"," ",`
`,e.jsx(t,{children:"offset"}),", ",e.jsx(t,{children:"count"}),", ",e.jsx(t,{children:"capacity"}),","," ",`
`,e.jsx(t,{children:"Position"}),", ",e.jsx(t,{children:"Length"}),", or"," ",`
`,e.jsx(t,{children:"Capacity"})," values throw."]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Invalid seek origin"})," — Passing a"," ",`
`,e.jsx(t,{children:"SeekOrigin"})," other than ",e.jsx(t,{children:"Begin"}),","," ",`
`,e.jsx(t,{children:"Current"}),", or ",e.jsx(t,{children:"End"})," throws."]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Seek before start"}),` — A seek that results in a
negative Position throws.`]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Capacity too small"})," — Setting"," ",`
`,e.jsx(t,{children:"Capacity"})," to a value less than the current ",e.jsx(t,{children:"Length"})," ",`
throws.`]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Canceled async operation"}),` — The cancellation-token
overloads of `,e.jsx(t,{children:"ReadAsync"}),", ",e.jsx(t,{children:"WriteAsync"}),", and"," ",`
`,e.jsx(t,{children:"FlushAsync"}),` return a faulted task with an operation-canceled exception
when the token is already canceled.`]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Destination buffer too small for read"})," —"," ",`
`,e.jsx(t,{children:"Read"})," throws when ",e.jsx(t,{children:"buffer.Length"})," is less than"," ",`
`,e.jsx(t,{children:"offset + count"}),"."]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Source buffer too small for write"})," —"," ",`
`,e.jsx(t,{children:"Write"})," throws when the source ",e.jsx(t,{children:"buffer.Length"}),` is less
than `,e.jsx(t,{children:"offset + count"}),"."]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Internal buffer too small"}),` — This is a defensive
error that should not occur in normal use. It indicates that the internal buffer was not grown
sufficiently before the read or write loop began.`]})})]}),`
`,e.jsx(a,{children:"Remarks"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Interface hierarchy."})," ",e.jsx(t,{children:"MemoryStream"})," implements"," ",`
`,e.jsx(t,{children:"io.IReadableStream"}),", ",e.jsx(t,{children:"io.IWritableStream"}),", and"," ",`
`,e.jsx(t,{children:"IDisposable"}),". This lets you pass a ",e.jsx(t,{children:"MemoryStream"}),` to
any API that consumes the interfaces, such as `,e.jsx(t,{children:"StreamReader"}),","," ",`
`,e.jsx(t,{children:"StreamWriter"}),", ",e.jsx(t,{children:"BinaryReader"}),", or"," ",`
`,e.jsx(t,{children:"BinaryWriter"}),"."]})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Capacity growth."})," When a write would exceed the current buffer, the runtime calls"," ",`
`,e.jsx(t,{children:"EnsureCapacity"}),". The new size is"," ",`
`,e.jsx(t,{children:"max(required, capacity * 2)"}),", with a floor of 256 bytes. A new"," ",`
`,e.jsx(t,{children:"byte[]"}),` is allocated, the existing contents are copied element by element,
and the internal `,e.jsx(t,{children:"_buffer"}),` field is replaced. The old array becomes eligible
for garbage collection when no other references remain.`]})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Read-only construction."})," ",e.jsx(t,{children:"new MemoryStream(buffer)"}),` wraps the
array without copying it. The stream starts at Position 0, Length equals`," ",`
`,e.jsx(t,{children:"buffer.Length"}),`, and the internal writable flag is false. Reading advances
Position normally, but writes are rejected. Closing or disposing the stream does not free the
caller's original array.`]})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Position versus Length."})," ",e.jsx(t,{children:"Position"}),` can be set to any
non-negative value, including values larger than `,e.jsx(t,{children:"Length"}),". A subsequent"," ",`
`,e.jsx(t,{children:"Write"})," at such a position will grow ",e.jsx(t,{children:"Length"})," to"," ",`
`,e.jsx(t,{children:"Position + count"}),`. The gap between the old Length and the new write offset
is filled with zeros because fresh buffers are zero-initialized.`]})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"GetBuffer versus ToArray."})," ",e.jsx(t,{children:"GetBuffer"}),` returns the live
internal buffer, which may be larger than `,e.jsx(t,{children:"Length"}),`. Mutating it changes the
stream's data directly. `,e.jsx(t,{children:"ToArray"})," always allocates a new array of exactly"," ",`
`,e.jsx(t,{children:"Length"})," bytes and copies the logical contents."]})}),`
`,e.jsx(d,{tone:"blue",children:e.jsxs(n.p,{children:["The async methods are not truly asynchronous for ",e.jsx(t,{children:"MemoryStream"}),`. They exist
so the class can satisfy `,e.jsx(t,{children:"IReadableStream"})," and"," ",`
`,e.jsx(t,{children:"IWritableStream"})," contracts; under the hood they call the synchronous"," ",`
`,e.jsx(t,{children:"Read"}),", ",e.jsx(t,{children:"Write"}),", or ",e.jsx(t,{children:"Flush"}),` and
return a completed task.`]})}),`
`,e.jsx(d,{tone:"amber",title:"CanWrite not exposed",children:e.jsxs(n.p,{children:[e.jsx(t,{children:"MemoryStream"}),` tracks writability internally, but it does not currently
expose a public `,e.jsx(t,{children:"CanWrite"}),` property. Determine writability from the
constructor used: streams created with `,e.jsx(t,{children:"init()"})," or"," ",`
`,e.jsx(t,{children:"init(capacity: int)"})," are writable; streams created with"," ",`
`,e.jsx(t,{children:"init(buffer: byte[])"})," are read-only."]})}),`
`,e.jsx(a,{children:"Examples"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Basic write, read back, and snapshot."})}),`
`,e.jsx(o,{code:`using stdio;
using io;

namespace demo;

public static func Main() -> void
{
  ms: MemoryStream = new MemoryStream();
  defer ms.Dispose();

  payload: byte[] = [72 as byte, 101 as byte, 108 as byte, 108 as byte, 111 as byte];
  ms.Write(payload, 0, payload.Length);

  println(ms.Length);     // 5
  println(ms.Position);   // 5

  ms.Position = 0;
  buffer: byte[] = [0 as byte; 5];
  read: int = ms.Read(buffer, 0, buffer.Length);

  println(read);          // 5
  println(buffer[0]);     // 72

  snapshot: byte[] = ms.ToArray();
  println(snapshot.Length); // 5
}`,language:"csharp",filename:"memory_stream_basic.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Creating a read-only stream from an existing byte array."})}),`
`,e.jsx(o,{code:`using stdio;
using io;

namespace demo;

public static func Main() -> void
{
  data: byte[] = [10 as byte, 20 as byte, 30 as byte, 40 as byte];
  ms: MemoryStream = new MemoryStream(data);
  defer ms.Dispose();

  println(ms.Length);    // 4
  println(ms.Capacity);  // 4

  buffer: byte[] = [0 as byte; 4];
  read: int = ms.Read(buffer, 0, buffer.Length);
  println(read);         // 4
  println(buffer[2]);    // 30

  // The following would throw because the stream is read-only:
  // ms.Write([1 as byte], 0, 1);
}`,language:"csharp",filename:"memory_stream_readonly.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Capacity growth and explicit pre-allocation."})}),`
`,e.jsx(o,{code:`using stdio;
using io;

namespace demo;

public static func Main() -> void
{
  ms: MemoryStream = new MemoryStream();
  defer ms.Dispose();

  println(ms.Capacity);  // 0

  ms.Write([1 as byte], 0, 1);
  println(ms.Capacity);  // 256 (minimum growth floor)

  chunk: byte[] = [0 as byte; 300];
  ms.Write(chunk, 0, chunk.Length);
  println(ms.Capacity);  // 512 (doubled from 256 to satisfy required 301)
  println(ms.Length);    // 301

  // Pre-allocate room for a known payload size.
  ms.Capacity = 1024;
  println(ms.Capacity);  // 1024
  println(ms.Length);    // still 301
}`,language:"csharp",filename:"memory_stream_capacity.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Seek, overwrite, and resize with SetLength."})}),`
`,e.jsx(o,{code:`using stdio;
using io;

namespace demo;

public static func Main() -> void
{
  ms: MemoryStream = new MemoryStream();
  defer ms.Dispose();

  ms.Write([10 as byte, 20 as byte, 30 as byte, 40 as byte], 0, 4);

  newPos: int = ms.Seek(1, SeekOrigin.Begin);
  println(newPos);       // 1

  ms.Write([99 as byte], 0, 1);

  ms.Position = 0;
  buffer: byte[] = [0 as byte; 4];
  ms.Read(buffer, 0, buffer.Length);

  println(buffer[0]);    // 10
  println(buffer[1]);    // 99
  println(buffer[2]);    // 30
  println(buffer[3]);    // 40

  ms.SetLength(2);
  println(ms.Length);    // 2

  ms.SetLength(6);
  println(ms.Length);    // 6 (zero-extended)
}`,language:"csharp",filename:"memory_stream_seek.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Direct buffer access with GetBuffer."})}),`
`,e.jsx(o,{code:`using stdio;
using io;

namespace demo;

public static func Main() -> void
{
  ms: MemoryStream = new MemoryStream();
  defer ms.Dispose();

  ms.Write([1 as byte, 2 as byte], 0, 2);

  // GetBuffer returns the internal array, not a copy.
  shared: byte[] = ms.GetBuffer();
  shared[0] = 99 as byte;

  ms.Position = 0;
  buffer: byte[] = [0 as byte; 2];
  ms.Read(buffer, 0, buffer.Length);

  println(buffer[0]);    // 99
  println(buffer[1]);    // 2
}`,language:"csharp",filename:"memory_stream_buffer.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Async interface conformance."})}),`
`,e.jsx(o,{code:`using stdio;
using io;
using async;

namespace demo;

public static async func Run() -> Task
{
  ms: MemoryStream = new MemoryStream();
  defer ms.Dispose();

  data: byte[] = [65 as byte, 66 as byte, 67 as byte];
  await ms.WriteAsync(data, 0, data.Length);

  ms.Position = 0;
  buffer: byte[] = [0 as byte; 3];
  read: int = await ms.ReadAsync(buffer, 0, buffer.Length);

  println(read);         // 3
  println(buffer[0]);    // 65
}

public static func Main() -> void
{
  task: Task = Run();
  Task.Wait(task);
}`,language:"csharp",filename:"memory_stream_async.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Common mistakes to avoid."})}),`
`,e.jsx(o,{code:`using stdio;
using io;

namespace demo;

public static func Main() -> void
{
  // Mistake 1: Forgetting that new MemoryStream(buffer) is read-only.
  data: byte[] = [1 as byte, 2 as byte];
  ro: MemoryStream = new MemoryStream(data);
  defer ro.Dispose();
  // ro.Write([3 as byte], 0, 1); // throws: cannot write to non-writable stream

  // Mistake 2: Accessing the stream after Dispose.
  ms: MemoryStream = new MemoryStream();
  ms.Dispose();
  // ms.Length; // throws: cannot access a closed stream

  // Mistake 3: Setting Capacity below Length.
  ms2: MemoryStream = new MemoryStream();
  defer ms2.Dispose();
  ms2.Write([1 as byte, 2 as byte, 3 as byte], 0, 3);
  // ms2.Capacity = 1; // throws: capacity cannot be less than length

  // Mistake 4: Passing an invalid SeekOrigin value.
  ms3: MemoryStream = new MemoryStream();
  defer ms3.Dispose();
  ms3.Write([1 as byte, 2 as byte], 0, 2);
  // ms3.Seek(0, 99 as SeekOrigin); // throws: invalid seek origin

  // Mistake 5: Passing a destination buffer that is smaller than offset + count.
  ms4: MemoryStream = new MemoryStream();
  defer ms4.Dispose();
  ms4.Write([1 as byte, 2 as byte, 3 as byte], 0, 3);
  ms4.Position = 0;
  // small: byte[] = [0 as byte; 2];
  // ms4.Read(small, 0, 3); // throws: destination buffer is too small
}`,language:"csharp",filename:"memory_stream_mistakes.shard"}),`
`,e.jsx(a,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"Stream Interfaces"})," — ",e.jsx(t,{children:"IReadableStream"}),","," ",`
`,e.jsx(t,{children:"IWritableStream"}),", and ",e.jsx(t,{children:"IDisposable"})," contracts."]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"BinaryReader & BinaryWriter"})," — typed reading and writing over streams."]})}),e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"StreamReader & StreamWriter"})," — text-oriented stream helpers."]})})]}),`
`,e.jsx(a,{children:"Source"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:["The ",e.jsx(t,{children:"MemoryStream"})," implementation ships as part of"," ",`
`,e.jsx(t,{children:"ShardScript.Framework"}),". The native binding is in"," ",`
`,e.jsx(t,{children:"ShardScript.Framework/system/streams.shard.cpp"}),"."]})})]})}function m(i={}){const{wrapper:n}=i.components||{};return n?e.jsx(n,{...i,children:e.jsx(h,{...i})}):h(i)}function c(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default};
