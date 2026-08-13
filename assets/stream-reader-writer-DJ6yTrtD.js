import{j as e}from"./index-DLc5xCYN.js";function h(a){const r={code:"code",em:"em",p:"p",...a.components},{Bullet:t,Callout:l,CodeBlock:o,DocsTable:c,H2:i,InlineCode:n,Prose:s}=r;return t||d("Bullet"),l||d("Callout"),o||d("CodeBlock"),c||d("DocsTable"),i||d("H2"),n||d("InlineCode"),s||d("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(i,{children:"Summary"}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"StreamReader"})," and ",e.jsx(n,{children:"StreamWriter"}),` are text-oriented
adapters in the `,e.jsx(n,{children:"io"})," namespace. They decode UTF-8 from an"," ",`
`,e.jsx(n,{children:"IReadableStream"})," and encode UTF-8 to an ",e.jsx(n,{children:"IWritableStream"}),`,
exposing line-based and whole-stream text operations. Both implement `,e.jsx(n,{children:"IDisposable"}),`;
disposing the wrapper also disposes the underlying stream.`]})}),`
`,e.jsx(i,{children:"Syntax"}),`
`,e.jsx(s,{children:e.jsx(r.p,{children:`Both classes are instantiated with a single constructor argument. The wrapper stores the stream
reference internally and tracks its own disposed state.`})}),`
`,e.jsx(c,{headers:["Constructor","Description"],rows:[[e.jsx(r.code,{children:"new StreamReader(stream: IReadableStream)"}),"Creates a reader that decodes UTF-8 text from the supplied stream."],[e.jsx(r.code,{children:"new StreamWriter(stream: IWritableStream)"}),"Creates a writer that encodes UTF-8 text to the supplied stream."]]}),`
`,e.jsx(c,{headers:["StreamReader Member","Signature"],rows:[[e.jsx(r.code,{children:"ReadLine()"}),e.jsx(r.code,{children:"func ReadLine() -> string"})],[e.jsx(r.code,{children:"ReadToEnd()"}),e.jsx(r.code,{children:"func ReadToEnd() -> string"})],[e.jsx(r.code,{children:"Read()"}),e.jsx(r.code,{children:"func Read() -> int"})],[e.jsx(r.code,{children:"Close()"}),e.jsx(r.code,{children:"func Close() -> void"})],[e.jsx(r.code,{children:"Dispose()"}),e.jsx(r.code,{children:"func Dispose() -> void"})]]}),`
`,e.jsx(c,{headers:["StreamWriter Member","Signature"],rows:[[e.jsx(r.code,{children:"Write(value)"}),e.jsx(r.code,{children:"func Write(value: string) -> void"})],[e.jsx(r.code,{children:"WriteLine(value)"}),e.jsx(r.code,{children:"func WriteLine(value: string) -> void"})],[e.jsx(r.code,{children:"Flush()"}),e.jsx(r.code,{children:"func Flush() -> void"})],[e.jsx(r.code,{children:"Close()"}),e.jsx(r.code,{children:"func Close() -> void"})],[e.jsx(r.code,{children:"Dispose()"}),e.jsx(r.code,{children:"func Dispose() -> void"})]]}),`
`,e.jsx(i,{children:"Parameters / Arguments"}),`
`,e.jsx(c,{headers:["Member","Parameters","Description"],rows:[[e.jsx(r.code,{children:"StreamReader.ReadLine()"}),e.jsx(r.em,{children:"none"}),"Reads bytes until a newline (0x0A) or EOF is reached."],[e.jsx(r.code,{children:"StreamReader.ReadToEnd()"}),e.jsx(r.em,{children:"none"}),"Reads all remaining bytes and decodes them as UTF-8."],[e.jsx(r.code,{children:"StreamReader.Read()"}),e.jsx(r.em,{children:"none"}),"Reads one complete UTF-8 codepoint and returns its Unicode scalar value."],[e.jsx(r.code,{children:"StreamWriter.Write(value)"}),e.jsx(r.code,{children:"value: string"}),"Encodes the string as UTF-8 and writes it to the stream."],[e.jsx(r.code,{children:"StreamWriter.WriteLine(value)"}),e.jsx(r.code,{children:"value: string"}),"Writes the string followed by a single newline (0x0A)."],[e.jsx(r.code,{children:"StreamWriter.Flush()"}),e.jsx(r.em,{children:"none"}),"Flushes the underlying stream if it supports flushing."],[e.jsx(r.code,{children:"Close / Dispose"}),e.jsx(r.em,{children:"none"}),"Flushes, disposes the underlying stream, and marks the wrapper as disposed."]]}),`
`,e.jsx(i,{children:"Returns"}),`
`,e.jsx(c,{headers:["Member","Return Type","Meaning"],rows:[[e.jsx(r.code,{children:"StreamReader.ReadLine()"}),e.jsx(r.code,{children:"string"}),"The line content without the trailing newline; empty string at EOF."],[e.jsx(r.code,{children:"StreamReader.ReadToEnd()"}),e.jsx(r.code,{children:"string"}),"All remaining decoded text; empty string if the reader is already at EOF."],[e.jsx(r.code,{children:"StreamReader.Read()"}),e.jsx(r.code,{children:"int"}),"The Unicode scalar value (0–0x10FFFF), or -1 at EOF."],[e.jsx(r.code,{children:"StreamWriter.Write(value)"}),e.jsx(r.code,{children:"void"}),"Nothing. The bytes are forwarded to the underlying stream."],[e.jsx(r.code,{children:"StreamWriter.WriteLine(value)"}),e.jsx(r.code,{children:"void"}),"Nothing. Appends a newline byte after the encoded string."],[e.jsx(r.code,{children:"StreamWriter.Flush()"}),e.jsx(r.code,{children:"void"}),"Nothing. Delegates to the wrapped stream."],[e.jsx(r.code,{children:"Close / Dispose"}),e.jsx(r.code,{children:"void"}),"Nothing."]]}),`
`,e.jsx(i,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"RuntimeException — Invalid UTF-8 sequence"})," ",`
`,e.jsx(n,{children:"StreamReader.Read()"}),` throws when the leading byte or its continuation
bytes do not form a valid UTF-8 codepoint.`]})}),e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"RuntimeException — Cannot access a disposed StreamReader"})," ",`
Any call after `,e.jsx(n,{children:"Close()"})," or ",e.jsx(n,{children:"Dispose()"})," fails."]})}),e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"RuntimeException — Cannot access a disposed StreamWriter"})," ",`
Any call after `,e.jsx(n,{children:"Close()"})," or ",e.jsx(n,{children:"Dispose()"})," fails."]})}),e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"RuntimeException — Stream does not support Read / Write"})," ",`
Thrown by the underlying byte stream if the wrapped object does not implement the expected
interface method.`]})}),e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"RuntimeException — Cannot access a closed stream"})," ",`
Operations on a closed underlying stream (for example, a disposed `,e.jsx(n,{children:"MemoryStream"}),`)
fail before the reader or writer can buffer data.`]})})]}),`
`,e.jsx(i,{children:"Remarks"}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"UTF-8 only."}),` The current implementation hard-codes UTF-8. There is no constructor
overload for selecting `,e.jsx(n,{children:"Encoding.ASCII"}),", ",e.jsx(n,{children:"Encoding.UTF8"}),`,
or other encodings. Strings are converted through the runtime's wide-character/UTF-8 helpers before
being written or after being read.`]})}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Newline handling."})," ",e.jsx(n,{children:"WriteLine"})," always appends a single"," ",`
`,e.jsx(n,{children:"\\n"})," byte (0x0A), regardless of platform. ",e.jsx(n,{children:"ReadLine"})," ",`
stops at the first `,e.jsx(n,{children:"\\n"}),` it encounters and does not include it in the result.
If a source uses `,e.jsx(n,{children:"\\r\\n"}),` line endings, the carriage return remains at the end
of the returned string unless you trim it yourself.`]})}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"EOF conventions."})," ",e.jsx(n,{children:"ReadLine"}),` returns an empty string at EOF.
Because an empty string is also a valid line value, the standard idiom is to call it repeatedly
until the returned length is zero. `,e.jsx(n,{children:"Read()"})," returns -1 at EOF, and"," ",`
`,e.jsx(n,{children:"ReadToEnd()"})," returns an empty string when no bytes remain."]})}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Dispose cascades."})," ",e.jsx(n,{children:"Close()"})," and"," ",`
`,e.jsx(n,{children:"Dispose()"}),` are aliases for the same implementation on both classes. They
flush the writer, call `,e.jsx(n,{children:"Dispose()"}),` on the underlying stream, and then set
the wrapper's internal disposed flag. After disposal, both the wrapper and the wrapped stream are
unusable.`]})}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Buffering."})," ",e.jsx(n,{children:"StreamWriter"}),` does not maintain a separate
character buffer; it encodes each string and forwards the bytes immediately.`," ",`
`,e.jsx(n,{children:"StreamReader.Read()"}),` allocates a temporary four-byte array to decode a
complete codepoint. `,e.jsx(n,{children:"ReadLine"})," and ",e.jsx(n,{children:"ReadToEnd"}),` accumulate
bytes in native vectors and perform a single UTF-8 to wide-string conversion at the end.`]})}),`
`,e.jsx(l,{tone:"amber",title:"Async wrappers not implemented",children:e.jsxs(r.p,{children:[e.jsx(n,{children:"StreamReader"})," and ",e.jsx(n,{children:"StreamWriter"}),` do not expose async
members such as `,e.jsx(n,{children:"ReadLineAsync"})," or ",e.jsx(n,{children:"WriteLineAsync"}),`.
If you need async I/O, use the `,e.jsx(n,{children:"ReadAsync"})," / ",e.jsx(n,{children:"WriteAsync"})," ",`
methods on the underlying stream directly, or run the synchronous reader/writer methods inside an
async method.`]})}),`
`,e.jsx(i,{children:"Examples"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Line-oriented read and write over MemoryStream."})}),`
`,e.jsx(o,{code:`using stdio;
using io;

namespace demo;

public static func Main() -> void
{
  ms: MemoryStream = new MemoryStream();

  writer: StreamWriter = new StreamWriter(ms);
  writer.WriteLine("hello");
  writer.WriteLine("world");
  writer.Flush();

  // Rewind before reading; writing leaves the position at the end.
  ms.Position = 0;

  reader: StreamReader = new StreamReader(ms);
  line1: string = reader.ReadLine();
  line2: string = reader.ReadLine();
  eof: string = reader.ReadLine();

  println(line1);   // hello
  println(line2);   // world
  println(eof);     // ""  (empty string means EOF)

  reader.Dispose();
  writer.Dispose();
}`,language:"csharp",filename:"stream_reader_writer_lines.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Reading the entire remaining content with ReadToEnd."})}),`
`,e.jsx(o,{code:`using stdio;
using io;

namespace demo;

public static func Main() -> void
{
  ms: MemoryStream = new MemoryStream();

  writer: StreamWriter = new StreamWriter(ms);
  writer.Write("alpha");
  writer.WriteLine(" beta");
  writer.Flush();

  ms.Position = 0;

  reader: StreamReader = new StreamReader(ms);
  all: string = reader.ReadToEnd();

  println(all);   // alpha beta


  reader.Dispose();
  writer.Dispose();
}`,language:"csharp",filename:"stream_reader_writer_to_end.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Reading individual Unicode codepoints."})}),`
`,e.jsx(o,{code:`using stdio;
using io;

namespace demo;

public static func Main() -> void
{
  ms: MemoryStream = new MemoryStream();

  writer: StreamWriter = new StreamWriter(ms);
  writer.Write("AΩ🔥");
  writer.Flush();

  ms.Position = 0;

  reader: StreamReader = new StreamReader(ms);

  cp1: int = reader.Read();   // 'A'  -> 65
  cp2: int = reader.Read();   // 'Ω'  -> 937
  cp3: int = reader.Read();   // '🔥' -> 128293
  cp4: int = reader.Read();   // EOF  -> -1

  println(cp1);
  println(cp2);
  println(cp3);
  println(cp4);

  reader.Dispose();
  writer.Dispose();
}`,language:"csharp",filename:"stream_reader_codepoints.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Counting lines in a file."})}),`
`,e.jsx(o,{code:`using stdio;
using io;
using filesystem;
using async;

namespace demo;

public static async func CountLines(path: string) -> Task
{
  fs: FileStream = new FileStream(path, FileMode.Open, FileAccess.Read);
  defer fs.Dispose();

  reader: StreamReader = new StreamReader(fs);
  defer reader.Dispose();

  count: int = 0;
  while (true)
  {
      line: string = reader.ReadLine();
      if (line == "")
      {
          break;
      }

      count = count + 1;
  }

  println("total lines: " + count);
}

public static func Main() -> void
{
  task: Task = CountLines("D:/temp/shard_input.txt");
  Task.Wait(task);
}`,language:"csharp",filename:"stream_reader_file_lines.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Common mistakes and edge cases."})}),`
`,e.jsx(o,{code:`using stdio;
using io;

namespace demo;

public static func Main() -> void
{
  // Mistake 1: Forgetting to rewind the MemoryStream before reading.
  ms: MemoryStream = new MemoryStream();
  writer: StreamWriter = new StreamWriter(ms);
  writer.WriteLine("data");
  writer.Flush();

  // ms.Position is still at the end; ReadLine returns "" immediately.
  readerAtEnd: StreamReader = new StreamReader(ms);
  empty: string = readerAtEnd.ReadLine();
  println("at end: '" + empty + "'");   // at end: ''
  readerAtEnd.Dispose();

  // Correct: rewind first.
  ms.Position = 0;
  reader: StreamReader = new StreamReader(ms);
  line: string = reader.ReadLine();
  println("rewound: '" + line + "'");   // rewound: 'data'
  reader.Dispose();

  // Mistake 2: Using a reader after disposing it.
  ms2: MemoryStream = new MemoryStream();
  reader2: StreamReader = new StreamReader(ms2);
  reader2.Dispose();

  // This would throw: Cannot access a disposed StreamReader.
  // reader2.ReadLine();

  // Mistake 3: Expecting ReadLine to strip \\r from \\r\\n files.
  ms3: MemoryStream = new MemoryStream();
  writer3: StreamWriter = new StreamWriter(ms3);
  writer3.Write("windows\\r\\n");   // simulate a CRLF source
  writer3.Flush();
  ms3.Position = 0;

  reader3: StreamReader = new StreamReader(ms3);
  crlfLine: string = reader3.ReadLine();
  println("last char code: " + crlfLine[crlfLine.Length - 1]);   // 13 ('\\r')
  reader3.Dispose();

  writer.Dispose();
  writer3.Dispose();
}`,language:"csharp",filename:"stream_reader_writer_edge_cases.shard"}),`
`,e.jsx(i,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"Stream Interfaces"})," — ",e.jsx(n,{children:"IReadableStream"}),","," ",`
`,e.jsx(n,{children:"IWritableStream"}),", and ",e.jsx(n,{children:"IDisposable"})," contracts."]})}),e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"BinaryReader & BinaryWriter"})," — typed reading and writing over streams."]})}),e.jsx(t,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"MemoryStream"})," — in-memory byte buffer for reader/writer examples."]})})]}),`
`,e.jsx(i,{children:"Source"}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:["The ",e.jsx(n,{children:"StreamReader"})," and ",e.jsx(n,{children:"StreamWriter"})," implementation ships as part of"," ",`
`,e.jsx(n,{children:"ShardScript.Framework"}),". The native binding is in"," ",`
`,e.jsx(n,{children:"ShardScript.Framework/system/streams.shard.cpp"}),"."]})})]})}function x(a={}){const{wrapper:r}=a.components||{};return r?e.jsx(r,{...a,children:e.jsx(h,{...a})}):h(a)}function d(a,r){throw new Error("Expected component `"+a+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
