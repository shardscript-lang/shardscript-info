import{j as e}from"./index-BugjY_CW.js";function h(i){const n={code:"code",p:"p",...i.components},{Bullet:o,Callout:l,CodeBlock:a,DocsTable:c,H2:s,InlineCode:r,Prose:t}=n;return o||d("Bullet"),l||d("Callout"),a||d("CodeBlock"),c||d("DocsTable"),s||d("H2"),r||d("InlineCode"),t||d("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(s,{children:"Summary"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx(r,{children:"BinaryReader"})," and ",e.jsx(r,{children:"BinaryWriter"}),` are typed binary
I/O adapters from the `,e.jsx(r,{children:"shard.streams"}),` library. They read and write
ShardScript primitives from an `,e.jsx(r,{children:"IReadableStream"}),` or
`,e.jsx(r,{children:"IWritableStream"})," using a fixed, little-endian wire format."]})}),`
`,e.jsx(s,{children:"Syntax"}),`
`,e.jsx(t,{children:"Construct a reader or writer around an existing stream:"}),`
`,e.jsx(a,{code:`using io;
using stdio;

namespace demo;

public static func Main() -> void
{
  ms: MemoryStream = new MemoryStream();

  // Wrap the writable stream in a writer.
  writer: BinaryWriter = new BinaryWriter(ms);
  writer.Write(42);
  writer.Flush();

  // Rewind, then wrap the readable stream in a reader.
  ms.Position = 0;
  reader: BinaryReader = new BinaryReader(ms);
  println(reader.ReadInt64());   // 42

  // Both wrappers implement IDisposable and close the underlying stream.
  reader.Dispose();
}`,language:"csharp",filename:"binary_intro.shard"}),`
`,e.jsx(s,{children:"Parameters / Arguments"}),`
`,e.jsx(t,{children:"The constructors take a single stream argument. The stream is stored by reference, not copied."}),`
`,e.jsx(c,{headers:["Constructor","Parameter","Type","Description"],rows:[[e.jsx(n.code,{children:"BinaryReader"}),"stream","IReadableStream","The stream from which bytes are read."],[e.jsx(n.code,{children:"BinaryWriter"}),"stream","IWritableStream","The stream to which bytes are written."]]}),`
`,e.jsx(s,{children:"Returns"}),`
`,e.jsxs(t,{children:["Reader methods return typed values decoded from the stream. Writer methods return ",e.jsx(r,{children:"void"}),"."]}),`
`,e.jsx(c,{headers:["Member","Return Type","Description"],rows:[[e.jsx(n.code,{children:"BinaryReader.ReadBoolean()"}),"bool","1 byte; true if non-zero, false if zero."],[e.jsx(n.code,{children:"BinaryReader.ReadByte()"}),"byte","1 byte."],[e.jsx(n.code,{children:"BinaryReader.ReadInt32()"}),"int","4 bytes, little-endian, sign-extended to int64."],[e.jsx(n.code,{children:"BinaryReader.ReadInt64()"}),"int","8 bytes, little-endian."],[e.jsx(n.code,{children:"BinaryReader.ReadDouble()"}),"double","8 bytes, little-endian IEEE 754."],[e.jsx(n.code,{children:"BinaryReader.ReadString()"}),"string","4-byte Int32 length prefix, then UTF-8 bytes."],[e.jsx(n.code,{children:"BinaryReader.ReadBytes(count)"}),"byte[]","Exactly count bytes."],[e.jsx(n.code,{children:"BinaryWriter.Write(...)"}),"void","Overloaded for bool, byte, int, double, string, and byte[]."],[e.jsx(n.code,{children:"BinaryWriter.WriteInt32(value)"}),"void","Writes an int as 4 bytes."],[e.jsx(n.code,{children:"BinaryWriter.WriteInt64(value)"}),"void","Writes an int as 8 bytes."],[e.jsx(n.code,{children:"BinaryWriter.Flush()"}),"void","Flushes the underlying stream."],[e.jsx(n.code,{children:"Close() / Dispose()"}),"void","Flushes the writer, disposes the underlying stream, and marks the wrapper disposed."]]}),`
`,e.jsx(s,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(o,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Unexpected end of stream"})," —"," ",`
`,e.jsx(r,{children:"ReadBytes"}),", ",e.jsx(r,{children:"ReadString"}),`, and every numeric read
throw when fewer bytes than required are available.`]})}),e.jsx(o,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Negative count"})," —"," ",`
`,e.jsx(r,{children:"ReadBytes(count)"})," throws if ",e.jsx(r,{children:"count"})," is negative."]})}),e.jsx(o,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Invalid string length"})," —"," ",`
`,e.jsx(r,{children:"ReadString"})," throws if the 4-byte length prefix is negative."]})}),e.jsx(o,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Object disposed"}),` — Any operation on a reader or
writer after `,e.jsx(r,{children:"Close"})," or ",e.jsx(r,{children:"Dispose"})," throws."]})}),e.jsx(o,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Underlying stream closed"}),` — If the wrapped stream
is closed independently, subsequent reads or writes fail.`]})})]}),`
`,e.jsx(s,{children:"Remarks"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Little-endian wire format."}),` Multi-byte integers and doubles are always written
least-significant byte first. This matches the native helper functions`," ",`
`,e.jsx(r,{children:"WriteInt32Raw"}),", ",e.jsx(r,{children:"WriteInt64Raw"}),", and"," ",`
`,e.jsx(r,{children:"WriteDoubleRaw"})," in the C++ runtime, which copy ",e.jsx(r,{children:"sizeof(T)"})," ",`
bytes directly through `,e.jsx(r,{children:"reinterpret_cast"}),". No byte swapping is performed."]})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Integer width is important."})," ",e.jsx(r,{children:"BinaryWriter.Write(int)"}),` writes
8 bytes because ShardScript `,e.jsx(r,{children:"int"}),` is internally a 64-bit integer. To produce
a 4-byte field for compatibility with external formats, call `,e.jsx(r,{children:"WriteInt32"}),`.
The corresponding reader `,e.jsx(r,{children:"ReadInt32"}),` reads 4 bytes and sign-extends the value
to `,e.jsx(r,{children:"int64"}),"."]})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Length-prefixed strings."})," ",e.jsx(r,{children:"WriteString"}),` converts the wide
string to UTF-8, writes a 4-byte Int32 byte count, then writes the UTF-8 payload. An empty string
is stored as four zero bytes. `,e.jsx(r,{children:"ReadString"}),` reads the count, then reads exactly
that many bytes, so a malformed or truncated stream throws before any string is returned.`]})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Wrapper lifetime."})," Both classes implement ",e.jsx(r,{children:"IDisposable"}),`.
Disposing a reader or writer disposes the underlying stream as well. Because the wrapper only holds
a reference, rewinding the underlying `,e.jsx(r,{children:"MemoryStream.Position"}),` before creating
a new reader is the standard pattern for in-memory round-trips.`]})}),`
`,e.jsx(l,{tone:"blue",children:e.jsxs(n.p,{children:["BinaryReader and BinaryWriter operate only through the ",e.jsx(r,{children:"IReadableStream"})," and"," ",`
`,e.jsx(r,{children:"IWritableStream"}),` interfaces. Any stream that implements those interfaces,
including `,e.jsx(r,{children:"MemoryStream"}),", ",e.jsx(r,{children:"FileStream"}),", or"," ",`
`,e.jsx(r,{children:"SocketStream"}),", can be wrapped identically."]})}),`
`,e.jsx(s,{children:"Examples"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Round-trip all supported primitive types."})}),`
`,e.jsx(a,{code:`using io;
using stdio;

namespace demo;

public static func Main() -> void
{
  ms: MemoryStream = new MemoryStream();

  // Write a mixed sequence of typed values.
  writer: BinaryWriter = new BinaryWriter(ms);
  writer.Write(true);
  writer.Write(42 as byte);
  writer.WriteInt32(12345);
  writer.Write(9876543210);
  writer.Write(3.14159);
  writer.Write("shard");

  payload: byte[] = [10 as byte, 20 as byte, 30 as byte];
  writer.Write(payload);
  writer.Flush();

  // Rewind and read the values back in the exact same order.
  ms.Position = 0;
  reader: BinaryReader = new BinaryReader(ms);

  println(reader.ReadBoolean());          // true
  println(reader.ReadByte());             // 42
  println(reader.ReadInt32());            // 12345
  println(reader.ReadInt64());            // 9876543210
  println(reader.ReadDouble());           // 3.14159
  println(reader.ReadString());           // shard

  readBack: byte[] = reader.ReadBytes(3);
  println(readBack[0]);                   // 10
  println(readBack[1]);                   // 20
  println(readBack[2]);                   // 30

  reader.Dispose();
}`,language:"csharp",filename:"binary_roundtrip.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Int32 versus Int64 width."})}),`
`,e.jsx(a,{code:`using io;
using stdio;

namespace demo;

public static func Main() -> void
{
  ms: MemoryStream = new MemoryStream();
  writer: BinaryWriter = new BinaryWriter(ms);

  // WriteInt32 produces 4 bytes; Write(Int64) produces 8 bytes.
  writer.WriteInt32(255);
  writer.Write(255);
  writer.Flush();

  ms.Position = 0;
  println(ms.Length);   // 12

  reader: BinaryReader = new BinaryReader(ms);
  println(reader.ReadInt32());   // 255 (read from 4 bytes)
  println(reader.ReadInt64());   // 255 (read from 8 bytes)

  reader.Dispose();
}`,language:"csharp",filename:"binary_width.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Seek, read partial data, and detect EOF."})}),`
`,e.jsx(a,{code:`using io;
using stdio;

namespace demo;

public static func Main() -> void
{
  ms: MemoryStream = new MemoryStream();
  writer: BinaryWriter = new BinaryWriter(ms);

  writer.WriteInt32(100);
  writer.WriteInt32(200);
  writer.WriteInt32(300);
  writer.Flush();

  // Jump to the second integer (4 bytes in) and read only that value.
  ms.Position = 4;
  reader: BinaryReader = new BinaryReader(ms);
  println(reader.ReadInt32());   // 200

  // Read the final value.
  println(reader.ReadInt32());   // 300

  reader.Dispose();
}`,language:"csharp",filename:"binary_seek.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Handle truncated streams safely."})}),`
`,e.jsx(a,{code:`using io;
using stdio;

namespace demo;

public static func Main() -> void
{
  ms: MemoryStream = new MemoryStream();
  writer: BinaryWriter = new BinaryWriter(ms);
  writer.WriteInt32(42);
  writer.Flush();

  // Truncate the stream by one byte so the read cannot complete.
  ms.Length = 3;
  ms.Position = 0;

  reader: BinaryReader = new BinaryReader(ms);
  try
  {
      println(reader.ReadInt32());
  }
  catch (ex: RuntimeException)
  {
      println("caught: not enough bytes for Int32");
  }

  reader.Dispose();
}`,language:"csharp",filename:"binary_eof.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Common mistake: mixing Write and WriteInt32 on the same stream."})}),`
`,e.jsx(a,{code:`using io;
using stdio;

namespace demo;

public static func Main() -> void
{
  ms: MemoryStream = new MemoryStream();
  writer: BinaryWriter = new BinaryWriter(ms);

  // Mistake: writing an int with Write() stores 8 bytes, not 4.
  writer.Write(42);
  writer.Flush();

  ms.Position = 0;
  reader: BinaryReader = new BinaryReader(ms);

  // Reading with ReadInt32() consumes only the first 4 bytes and returns 42,
  // but 4 unread bytes remain in the stream.
  println(reader.ReadInt32());   // 42
  println(ms.Length);            // 8 -- four trailing bytes were skipped

  reader.Dispose();
}`,language:"csharp",filename:"binary_mistake.shard"}),`
`,e.jsx(l,{tone:"amber",children:e.jsxs(n.p,{children:["Always pair the writer width with the matching reader width. Use ",e.jsx(r,{children:"WriteInt32"})," ",`
when the consumer expects `,e.jsx(r,{children:"ReadInt32"}),"; use ",e.jsx(r,{children:"Write(int)"})," ",`
only when the consumer expects `,e.jsx(r,{children:"ReadInt64"}),"."]})})]})}function y(i={}){const{wrapper:n}=i.components||{};return n?e.jsx(n,{...i,children:e.jsx(h,{...i})}):h(i)}function d(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{y as default};
