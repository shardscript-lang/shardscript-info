import{j as e}from"./index-7OQU3gOS.js";function h(i){const t={code:"code",p:"p",...i.components},{Bullet:r,Callout:l,CodeBlock:c,DocsTable:d,H2:o,InlineCode:n,Prose:s}=t;return r||a("Bullet"),l||a("Callout"),c||a("CodeBlock"),d||a("DocsTable"),o||a("H2"),n||a("InlineCode"),s||a("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(o,{children:"Summary"}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:["The ",e.jsx(n,{children:"shard.socket"})," library exposes the ",e.jsx(n,{children:"Socket"})," and"," ",`
`,e.jsx(n,{children:"SocketStream"})," classes in the ",e.jsx(n,{children:"net"}),` namespace for IPv4 TCP
networking. `,e.jsx(n,{children:"Socket"}),` provides low-level connect, listen, accept, and string-oriented
send/receive operations, while `,e.jsx(n,{children:"SocketStream"})," wraps a connected socket in the"," ",`
`,e.jsx(n,{children:"io"})," stream interfaces for byte-oriented asynchronous I/O."]})}),`
`,e.jsx(o,{children:"Syntax"}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:["Import the namespace with ",e.jsx(n,{children:"using net;"}),". Both classes are reference types that implement"," ",`
`,e.jsx(n,{children:"IDisposable"})," and should be disposed after use."]})}),`
`,e.jsx(c,{code:`using stdio;
using net;

namespace demo;

public static func Main() -> void
{
  // Low-level string-oriented socket.
  client: Socket = new Socket();
  defer client.Dispose();

  // Byte-oriented stream wrapper.
  stream: SocketStream = new SocketStream(client);
  defer stream.Dispose();
}`,language:"csharp",filename:"socket_import.shard"}),`
`,e.jsx(d,{headers:["Class","Member","Signature"],rows:[[e.jsx(t.code,{children:"Socket"}),e.jsx(t.code,{children:"new Socket()"}),e.jsx(e.Fragment,{children:"Creates an IPv4 TCP socket handle."})],[e.jsx(t.code,{children:"Socket"}),e.jsx(t.code,{children:"Connect(ip, port)"}),e.jsx(e.Fragment,{children:e.jsx(t.code,{children:"func Connect(ip: string, port: int) -> bool"})})],[e.jsx(t.code,{children:"Socket"}),e.jsx(t.code,{children:"Send(data)"}),e.jsx(e.Fragment,{children:e.jsx(t.code,{children:"func Send(data: string) -> int"})})],[e.jsx(t.code,{children:"Socket"}),e.jsx(t.code,{children:"Bind(ip, port)"}),e.jsx(e.Fragment,{children:e.jsx(t.code,{children:"func Bind(ip: string, port: int) -> bool"})})],[e.jsx(t.code,{children:"Socket"}),e.jsx(t.code,{children:"Listen(backlog)"}),e.jsx(e.Fragment,{children:e.jsx(t.code,{children:"func Listen(backlog: int) -> bool"})})],[e.jsx(t.code,{children:"Socket"}),e.jsx(t.code,{children:"Accept()"}),e.jsx(e.Fragment,{children:e.jsx(t.code,{children:"func Accept() -> Socket"})})],[e.jsx(t.code,{children:"Socket"}),e.jsx(t.code,{children:"AcceptAsync()"}),e.jsx(e.Fragment,{children:e.jsx(t.code,{children:"func AcceptAsync() -> ValueTask<Socket>"})})],[e.jsx(t.code,{children:"Socket"}),e.jsx(t.code,{children:"Receive(bufferSize)"}),e.jsx(e.Fragment,{children:e.jsx(t.code,{children:"func Receive(bufferSize: int) -> string"})})],[e.jsx(t.code,{children:"Socket"}),e.jsx(t.code,{children:"Close()"}),e.jsx(e.Fragment,{children:e.jsx(t.code,{children:"func Close() -> void"})})],[e.jsx(t.code,{children:"Socket"}),e.jsx(t.code,{children:"Dispose()"}),e.jsx(e.Fragment,{children:e.jsx(t.code,{children:"func Dispose() -> void"})})],[e.jsx(t.code,{children:"SocketStream"}),e.jsx(t.code,{children:"new SocketStream()"}),e.jsx(e.Fragment,{children:"Creates a new socket and wraps it as a stream."})],[e.jsx(t.code,{children:"SocketStream"}),e.jsx(t.code,{children:"new SocketStream(socket)"}),e.jsx(e.Fragment,{children:e.jsx(t.code,{children:"new SocketStream(socket: Socket)"})})],[e.jsx(t.code,{children:"SocketStream"}),e.jsx(t.code,{children:"Connect(ip, port)"}),e.jsx(e.Fragment,{children:e.jsx(t.code,{children:"func Connect(ip: string, port: int) -> bool"})})],[e.jsx(t.code,{children:"SocketStream"}),e.jsx(t.code,{children:"Read(buffer, offset, count)"}),e.jsx(e.Fragment,{children:e.jsx(t.code,{children:"func Read(buffer: byte[], offset: int, count: int) -> int"})})],[e.jsx(t.code,{children:"SocketStream"}),e.jsx(t.code,{children:"ReadAsync(buffer, offset, count)"}),e.jsx(e.Fragment,{children:e.jsx(t.code,{children:"func ReadAsync(buffer: byte[], offset: int, count: int) -> ValueTask<int>"})})],[e.jsx(t.code,{children:"SocketStream"}),e.jsx(t.code,{children:"ReadAsync(buffer, offset, count, cancellationToken)"}),e.jsx(e.Fragment,{children:e.jsx(t.code,{children:"func ReadAsync(buffer: byte[], offset: int, count: int, cancellationToken: CancellationToken) -> ValueTask<int>"})})],[e.jsx(t.code,{children:"SocketStream"}),e.jsx(t.code,{children:"Write(buffer, offset, count)"}),e.jsx(e.Fragment,{children:e.jsx(t.code,{children:"func Write(buffer: byte[], offset: int, count: int) -> void"})})],[e.jsx(t.code,{children:"SocketStream"}),e.jsx(t.code,{children:"WriteAsync(buffer, offset, count)"}),e.jsx(e.Fragment,{children:e.jsx(t.code,{children:"func WriteAsync(buffer: byte[], offset: int, count: int) -> Task"})})],[e.jsx(t.code,{children:"SocketStream"}),e.jsx(t.code,{children:"WriteAsync(buffer, offset, count, cancellationToken)"}),e.jsx(e.Fragment,{children:e.jsx(t.code,{children:"func WriteAsync(buffer: byte[], offset: int, count: int, cancellationToken: CancellationToken) -> Task"})})],[e.jsx(t.code,{children:"SocketStream"}),e.jsx(t.code,{children:"Flush()"}),e.jsx(e.Fragment,{children:e.jsx(t.code,{children:"func Flush() -> void"})})],[e.jsx(t.code,{children:"SocketStream"}),e.jsx(t.code,{children:"FlushAsync()"}),e.jsx(e.Fragment,{children:e.jsx(t.code,{children:"func FlushAsync() -> Task"})})],[e.jsx(t.code,{children:"SocketStream"}),e.jsx(t.code,{children:"FlushAsync(cancellationToken)"}),e.jsx(e.Fragment,{children:e.jsx(t.code,{children:"func FlushAsync(cancellationToken: CancellationToken) -> Task"})})],[e.jsx(t.code,{children:"SocketStream"}),e.jsx(t.code,{children:"Close()"}),e.jsx(e.Fragment,{children:e.jsx(t.code,{children:"func Close() -> void"})})],[e.jsx(t.code,{children:"SocketStream"}),e.jsx(t.code,{children:"Dispose()"}),e.jsx(e.Fragment,{children:e.jsx(t.code,{children:"func Dispose() -> void"})})]]}),`
`,e.jsx(o,{children:"Parameters / Arguments"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Socket parameters"})}),`
`,e.jsx(d,{headers:["Parameter","Type","Description"],rows:[[e.jsx(n,{children:"ip"}),"string",'An IPv4 address in dotted-quad notation, such as "127.0.0.1". For Bind, an empty string or "0.0.0.0" binds all local interfaces.'],[e.jsx(n,{children:"port"}),"int","The TCP port number. Values outside the 0-65535 range are rejected by the underlying operating system."],[e.jsx(n,{children:"data"}),"string","The text payload to send. The implementation transmits the string as UTF-16 wide characters."],[e.jsx(n,{children:"bufferSize"}),"int","The maximum number of wide characters to receive. Must be greater than zero or Receive returns an empty string."],[e.jsx(n,{children:"backlog"}),"int","The maximum length of the pending connection queue. Passing -1 lets the platform choose a default."]]}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"SocketStream parameters"})}),`
`,e.jsx(d,{headers:["Parameter","Type","Description"],rows:[[e.jsx(n,{children:"socket"}),"Socket","An existing connected or accepted Socket whose handle is adopted by the stream."],[e.jsx(n,{children:"buffer"}),"byte[]","The byte array that receives or supplies data."],[e.jsx(n,{children:"offset"}),"int","The zero-based index in buffer where the operation begins. Must be non-negative."],[e.jsx(n,{children:"count"}),"int","The number of bytes to read or write. Must be non-negative and fit within the buffer bounds."],[e.jsx(n,{children:"cancellationToken"}),"CancellationToken","A token obtained from CancellationTokenSource. When canceled, the async operation faults with an Operation canceled error."]]}),`
`,e.jsx(o,{children:"Returns"}),`
`,e.jsx(d,{headers:["Member","Return Type","Description"],rows:[[e.jsx(n,{children:"Socket.Connect"}),"bool","true when the connection succeeds; false when the address is invalid or the connection is refused."],[e.jsx(n,{children:"Socket.Send"}),"int","The number of bytes transmitted, or -1 if the socket handle is invalid. The count is in bytes, not characters."],[e.jsx(n,{children:"Socket.Bind"}),"bool","true when the local endpoint is bound successfully."],[e.jsx(n,{children:"Socket.Listen"}),"bool","true when the socket enters the listening state."],[e.jsx(n,{children:"Socket.Accept"}),"Socket","A new Socket representing the accepted client connection."],[e.jsx(n,{children:"Socket.AcceptAsync"}),"ValueTask<Socket>","An awaitable Socket for the next incoming connection."],[e.jsx(n,{children:"Socket.Receive"}),"string","The received wide-character string, or an empty string if the socket is closed or no data is available."],[e.jsx(n,{children:"SocketStream.Connect"}),"bool","true when the connection succeeds; otherwise a runtime exception is thrown."],[e.jsx(n,{children:"SocketStream.Read"}),"int","The number of bytes copied into buffer. Zero indicates end-of-stream."],[e.jsx(n,{children:"SocketStream.ReadAsync"}),"ValueTask<int>","An awaitable byte count. Zero indicates end-of-stream."],[e.jsx(n,{children:"SocketStream.Write / WriteAsync"}),"void / Task","Completes after the requested bytes are sent or an error is reported."],[e.jsx(n,{children:"SocketStream.Flush / FlushAsync"}),"void / Task","No operation; TCP sends data immediately."],[e.jsx(n,{children:"Close / Dispose"}),"void","Releases the native socket handle. Subsequent operations fail or throw."]]}),`
`,e.jsx(o,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Namespace import required"})," — The"," ",`
`,e.jsx(n,{children:"net"})," namespace must be imported with ",e.jsx(n,{children:"using net;"}),` before
referencing `,e.jsx(n,{children:"Socket"})," or ",e.jsx(n,{children:"SocketStream"}),"."]})}),e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Socket creation failure"})," — Constructing"," ",`
`,e.jsx(n,{children:"new Socket()"})," or ",e.jsx(n,{children:"new SocketStream()"}),` throws a runtime exception
when the underlying `,e.jsx(n,{children:"socket(AF_INET, SOCK_STREAM, IPPROTO_TCP)"}),` call fails or the network
subsystem cannot be initialized.`]})}),e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Invalid server socket handle"})," —"," ",`
`,e.jsx(n,{children:"Socket.Accept()"})," and ",e.jsx(n,{children:"Socket.AcceptAsync()"}),` throw when called on a
socket that has not been bound and listened, or whose handle has already been closed.`]})}),e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Invalid IP address"})," —"," ",`
`,e.jsx(n,{children:"SocketStream.Connect"})," throws when ",e.jsx(n,{children:"ip"}),` cannot be parsed as an IPv4
address. `,e.jsx(n,{children:"Socket.Connect"})," returns ",e.jsx(n,{children:"false"})," instead."]})}),e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Receive on invalid socket"})," —"," ",`
`,e.jsx(n,{children:"Socket.Receive"}),` returns an empty string when the handle is invalid or when the peer has
closed the connection; it does not throw.`]})}),e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Read from a closed SocketStream"})," —"," ",`
`,e.jsx(n,{children:"SocketStream.Read"})," and ",e.jsx(n,{children:"ReadAsync"}),` throw when the stream has been
disposed or closed.`]})}),e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Negative offset or count"})," —"," ",`
`,e.jsx(n,{children:"SocketStream.Read"})," and ",e.jsx(n,{children:"SocketStream.Write"})," reject negative"," ",`
`,e.jsx(n,{children:"offset"})," or ",e.jsx(n,{children:"count"})," values."]})}),e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Socket send/receive failure"})," —"," ",`
`,e.jsx(n,{children:"SocketStream.Write"})," and ",e.jsx(n,{children:"SocketStream.Read"}),` throw when the underlying
native send or recv call reports an error.`]})}),e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Operation canceled"}),` — The cancellation-aware async overloads on
`,e.jsx(n,{children:"SocketStream"})," fault with an ",e.jsx(n,{children:"Operation canceled"}),` error when the
provided `,e.jsx(n,{children:"CancellationToken"})," is canceled before or during the operation."]})})]}),`
`,e.jsx(o,{children:"Remarks"}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"IPv4 TCP only."})," The current implementation creates sockets with"," ",`
`,e.jsx(n,{children:"AF_INET"}),", ",e.jsx(n,{children:"SOCK_STREAM"}),", and ",e.jsx(n,{children:"IPPROTO_TCP"}),`. IPv6
addresses, UDP datagrams, and Unix domain sockets are not supported by this library.`]})}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Wide-character string transport."})," ",e.jsx(n,{children:"Socket.Send"}),` transmits each character as a
platform wide character (UTF-16LE on Windows, typically 32-bit on Linux). The byte count returned by`," ",`
`,e.jsx(n,{children:"Send"})," is therefore ",e.jsx(n,{children:"data.Length * sizeof(wchar_t)"}),`, not the character
count. `,e.jsx(n,{children:"Receive"})," reads raw bytes and reconstructs a string from complete wide characters. Use"," ",`
`,e.jsx(n,{children:"SocketStream"})," when you need portable byte-oriented transport and control over encoding."]})}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Bind any local interface."})," For server sockets, pass ",e.jsx(n,{children:'"0.0.0.0"'}),` or an empty
string to `,e.jsx(n,{children:"Bind"})," to listen on all available IPv4 interfaces. A specific address such as"," ",`
`,e.jsx(n,{children:'"127.0.0.1"'})," restricts the listener to the loopback interface."]})}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Backlog behavior."})," ",e.jsx(n,{children:"Listen(backlog)"}),` forwards the backlog value directly to
the operating system. A negative value such as `,e.jsx(n,{children:"-1"}),` is accepted by the implementation and
resolved to a platform default, but the exact limit depends on the host OS.`]})}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"SocketStream is a thin stream adapter."})," ",e.jsx(n,{children:"SocketStream"})," implements"," ",`
`,e.jsx(n,{children:"io.IReadableStream"}),", ",e.jsx(n,{children:"io.IWritableStream"}),", and"," ",`
`,e.jsx(n,{children:"IDisposable"}),". It does not buffer, seek, or expose ",e.jsx(n,{children:"Position"})," or"," ",`
`,e.jsx(n,{children:"Length"}),". ",e.jsx(n,{children:"Flush"})," and ",e.jsx(n,{children:"FlushAsync"}),` are no-ops
because TCP sends data immediately.`]})}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Asynchronous operations run on the thread pool."})," ",`
`,e.jsx(n,{children:"Socket.AcceptAsync"})," and the ",e.jsx(n,{children:"SocketStream"}),` async methods schedule the
blocking native call on a background thread and resume the awaiting ShardScript task on completion. This keeps the
VM event loop responsive while waiting for network I/O.`]})}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"End-of-stream detection."})," ",e.jsx(n,{children:"SocketStream.Read"})," and"," ",`
`,e.jsx(n,{children:"ReadAsync"})," return ",e.jsx(n,{children:"0"}),` when the peer gracefully closes the connection.
A loop that reads until EOF must treat `,e.jsx(n,{children:"0"})," as termination, not as an error."]})}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Dispose is idempotent."})," Calling ",e.jsx(n,{children:"Close()"})," or"," ",`
`,e.jsx(n,{children:"Dispose()"})," more than once on a ",e.jsx(n,{children:"Socket"})," or"," ",`
`,e.jsx(n,{children:"SocketStream"}),` is safe. Both methods close the native handle and mark the object as closed.
Because both classes implement `,e.jsx(n,{children:"IDisposable"}),", the ",e.jsx(n,{children:"defer"}),` statement can
be used for deterministic cleanup.`]})}),`
`,e.jsx(l,{tone:"blue",children:e.jsxs(t.p,{children:["Prefer ",e.jsx(n,{children:"SocketStream"})," for new code. It interoperates with generic helpers written against"," ",`
`,e.jsx(n,{children:"io.IReadableStream"})," and ",e.jsx(n,{children:"io.IWritableStream"}),`, supports cancellation
tokens, and avoids the wide-character encoding quirks of the low-level `,e.jsx(n,{children:"Socket.Send"})," /"," ",`
`,e.jsx(n,{children:"Socket.Receive"})," API."]})}),`
`,e.jsx(l,{tone:"amber",title:"Not implemented",children:e.jsxs(t.p,{children:[`UDP sockets, IPv6, raw sockets, non-blocking polling, socket options (keep-alive, no-delay, receive buffer size),
and DNS hostname resolution are not exposed by `,e.jsx(n,{children:"shard.socket"}),`. Connect by IPv4 address or
resolve hostnames through a separate library before calling `,e.jsx(n,{children:"Connect"}),"."]})}),`
`,e.jsx(o,{children:"Examples"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Simple TCP client using the low-level Socket API."})}),`
`,e.jsx(c,{code:`using stdio;
using net;

namespace demo;

public static func Main() -> void
{
  client: Socket = new Socket();
  defer client.Dispose();

  if (!client.Connect("127.0.0.1", 6969))
  {
      println("Failed to connect to server");
      return;
  }

  sent: int = client.Send("Hello from ShardScript");
  println("Sent bytes: " + sent);
}`,language:"csharp",filename:"socket_client.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Simple TCP echo server using the low-level Socket API."})}),`
`,e.jsx(c,{code:`using stdio;
using net;

namespace demo;

public static func Main() -> void
{
  server: Socket = new Socket();
  defer server.Dispose();

  if (!server.Bind("127.0.0.1", 6969))
  {
      println("Failed to bind");
      return;
  }

  if (!server.Listen(-1))
  {
      println("Failed to listen");
      return;
  }

  println("Server listening on port 6969");

  while (true)
  {
      client: Socket = server.Accept();
      if (client == null)
      {
          continue;
      }

      defer client.Dispose();

      message: string = client.Receive(1024);
      println("Received: " + message);

      // Echo the same payload back to the client.
      client.Send(message);
  }
}`,language:"csharp",filename:"socket_server.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Byte-oriented echo server and client with SocketStream."})}),`
`,e.jsx(c,{code:`using stdio;
using async;
using net;
using io;

namespace demo;

public class Program
{
  public static async func RunServer(port: int, done: TaskCompletionSource<int>) -> Task
  {
      server: Socket = new Socket();
      defer server.Dispose();

      if (!server.Bind("127.0.0.1", port))
      {
          println("Failed to bind");
          throw new RuntimeException();
      }

      if (!server.Listen(1))
      {
          println("Failed to listen");
          throw new RuntimeException();
      }

      client: Socket = await server.AcceptAsync();
      defer client.Dispose();

      stream: SocketStream = new SocketStream(client);
      defer stream.Dispose();

      buffer: byte[] = [0 as byte; 64];
      read: int = await stream.ReadAsync(buffer, 0, buffer.Length);
      if (read == 0)
      {
          println("Client disconnected before sending data");
          throw new RuntimeException();
      }

      await stream.WriteAsync(buffer, 0, read);
      done.SetResult(0);
  }

  public static async func RunClient(port: int) -> Task
  {
      client: Socket = new Socket();
      defer client.Dispose();

      if (!client.Connect("127.0.0.1", port))
      {
          println("Failed to connect");
          throw new RuntimeException();
      }

      stream: SocketStream = new SocketStream(client);
      defer stream.Dispose();

      payload: byte[] = [72 as byte, 101 as byte, 108 as byte, 108 as byte, 111 as byte];
      await stream.WriteAsync(payload, 0, payload.Length);

      buffer: byte[] = [0 as byte; 64];
      read: int = await stream.ReadAsync(buffer, 0, buffer.Length);

      i: int = 0;
      while (i < read)
      {
          println(buffer[i]);
          i = i + 1;
      }
  }

  public static func Main() -> void
  {
      port: int = 17654;
      done: TaskCompletionSource<int> = new TaskCompletionSource<int>();

      serverTask: Task = RunServer(port, done);

      // Give the server time to start listening before connecting.
      Task.Wait(Task.Delay(50));

      clientTask: Task = RunClient(port);
      Task.Wait(clientTask);
      Task.Wait(serverTask);

      println("echo completed");
  }
}`,language:"csharp",filename:"socket_stream_echo.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Reading until end-of-stream with SocketStream."})}),`
`,e.jsx(c,{code:`using stdio;
using net;
using io;

namespace demo;

public static func ReadAll(stream: SocketStream) -> byte[]
{
  accumulator: MemoryStream = new MemoryStream();
  defer accumulator.Dispose();

  chunk: byte[] = [0 as byte; 256];

  while (true)
  {
      read: int = stream.Read(chunk, 0, chunk.Length);
      if (read == 0)
      {
          // The peer closed the connection; no more bytes will arrive.
          break;
      }

      accumulator.Write(chunk, 0, read);
  }

  return accumulator.ToArray();
}

public static func Main() -> void
{
  socket: Socket = new Socket();
  defer socket.Dispose();

  if (!socket.Connect("127.0.0.1", 8080))
  {
      println("Failed to connect");
      return;
  }

  stream: SocketStream = new SocketStream(socket);
  defer stream.Dispose();

  data: byte[] = ReadAll(stream);
  println("Received " + data.Length + " bytes");
}`,language:"csharp",filename:"socket_stream_read_all.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Cancellation-aware SocketStream read."})}),`
`,e.jsx(c,{code:`using stdio;
using async;
using net;

namespace demo;

public class Program
{
  public static async func RunCancellationDemo() -> Task
  {
      socket: Socket = new Socket();
      defer socket.Dispose();

      if (!socket.Connect("127.0.0.1", 8080))
      {
          println("Failed to connect");
          return;
      }

      stream: SocketStream = new SocketStream(socket);
      defer stream.Dispose();

      cts: CancellationTokenSource = new CancellationTokenSource();
      cts.CancelAfter(100);   // cancel after 100 milliseconds

      buffer: byte[] = [0 as byte; 256];

      try
      {
          read: int = await stream.ReadAsync(buffer, 0, buffer.Length, cts.Token);
          println("Read " + read + " bytes");
      }
      catch (ex: RuntimeException)
      {
          println("Read was canceled or failed: " + ex.message);
      }

      cts.Dispose();
  }

  public static func Main() -> void
  {
      task: Task = RunCancellationDemo();
      Task.Wait(task);
  }
}`,language:"csharp",filename:"socket_stream_cancellation.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Common mistake: assuming Receive returns null on disconnect."})}),`
`,e.jsx(c,{code:`using stdio;
using net;

namespace demo;

public static func Main() -> void
{
  socket: Socket = new Socket();
  defer socket.Dispose();

  if (!socket.Connect("127.0.0.1", 8080))
  {
      println("Failed to connect");
      return;
  }

  // WRONG: Socket.Receive never returns null.
  // if (socket.Receive(1024) == null) { ... }

  // CORRECT: test for the empty string.
  response: string = socket.Receive(1024);
  if (response == "")
  {
      println("Peer closed the connection or no data arrived");
  }
  else
  {
      println(response);
  }
}`,language:"csharp",filename:"socket_receive_mistake.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Common mistake: forgetting to dispose accepted clients."})}),`
`,e.jsx(c,{code:`using stdio;
using net;

namespace demo;

public static func Main() -> void
{
  server: Socket = new Socket();
  defer server.Dispose();

  if (!server.Bind("127.0.0.1", 6969) || !server.Listen(-1))
  {
      println("Server setup failed");
      return;
  }

  while (true)
  {
      client: Socket = server.Accept();

      // CORRECT: dispose each accepted client to release the native handle.
      defer client.Dispose();

      msg: string = client.Receive(1024);
      println(msg);
  }
}`,language:"csharp",filename:"socket_dispose_client.shard"})]})}function m(i={}){const{wrapper:t}=i.components||{};return t?e.jsx(t,{...i,children:e.jsx(h,{...i})}):h(i)}function a(i,t){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default};
