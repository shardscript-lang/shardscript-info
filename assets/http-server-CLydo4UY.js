import{j as e}from"./index-BugjY_CW.js";function c(i){const s={p:"p",...i.components},{Bullet:l,Callout:h,CodeBlock:n,DocsTable:d,H2:a,InlineCode:r,Prose:t}=s;return l||o("Bullet"),h||o("Callout"),n||o("CodeBlock"),d||o("DocsTable"),a||o("H2"),r||o("InlineCode"),t||o("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(a,{children:"Summary"}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:["The ",e.jsx(r,{children:"shard.http"})," library exposes the ",e.jsx(r,{children:"HttpServer"}),` class in
the `,e.jsx(r,{children:"net"}),` namespace for creating a native HTTP server. It registers route handlers
that receive the request body as a `,e.jsx(r,{children:"string"}),` and return the response body as a
`,e.jsx(r,{children:"string"}),", then blocks the calling thread while listening for incoming requests."]})}),`
`,e.jsx(a,{children:"Syntax"}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx(r,{children:"HttpServer"}),` is instantiated with a parameterless constructor. Routes are registered
with `,e.jsx(r,{children:"Get"}),", and the server is started with ",e.jsx(r,{children:"Listen"}),`.
`,e.jsx(r,{children:"Dispose"})," stops the listener and releases native resources."]})}),`
`,e.jsx(d,{headers:["Member","Signature","Access"],rows:[[e.jsx(r,{children:"new HttpServer()"}),e.jsx(e.Fragment,{children:e.jsx(r,{children:"public HttpServer()"})}),"Instance constructor. Creates a new native HTTP server."],[e.jsx(r,{children:"Get(path, handler)"}),e.jsx(e.Fragment,{children:e.jsx(r,{children:"public func Get(path: string, handler: ServerGetCallback) -> void"})}),"Instance method. Registers a handler for GET requests at the specified path."],[e.jsx(r,{children:"Listen(host, port)"}),e.jsx(e.Fragment,{children:e.jsx(r,{children:"public func Listen(host: string, port: int) -> void"})}),"Instance method. Binds to host and port, then blocks while processing requests."],[e.jsx(r,{children:"Dispose()"}),e.jsx(e.Fragment,{children:e.jsx(r,{children:"public func Dispose() -> void"})}),"Instance method. Implements IDisposable. Stops the server and frees native resources."]]}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:["The ",e.jsx(r,{children:"ServerGetCallback"})," delegate type has the following signature:"]})}),`
`,e.jsx(n,{code:"func ServerGetCallback(requestBody: string) -> string",language:"csharp",filename:"server_callback_signature.shard"}),`
`,e.jsx(a,{children:"Parameters / Arguments"}),`
`,e.jsx(d,{headers:["Parameter","Type","Description"],rows:[[e.jsx(r,{children:"path"}),"string",'The route path, for example "/" or "/api/status". The path is passed to the underlying httplib router.'],[e.jsx(r,{children:"handler"}),"ServerGetCallback","A delegate that receives the request body as a string and returns the response body as a string."],[e.jsx(r,{children:"host"}),"string",'The bind address, for example "127.0.0.1" or "0.0.0.0".'],[e.jsx(r,{children:"port"}),"int","The TCP port to listen on, for example 8080."],[e.jsx(r,{children:"requestBody"}),"string","The body of the incoming HTTP request. For GET requests this is typically empty."]]}),`
`,e.jsx(a,{children:"Returns"}),`
`,e.jsx(d,{headers:["Member","Return Type","Description"],rows:[[e.jsx(r,{children:"new HttpServer()"}),e.jsx(r,{children:"HttpServer"}),"A new server instance that implements IDisposable."],[e.jsx(r,{children:"Get(path, handler)"}),e.jsx(r,{children:"void"}),"No value is returned."],[e.jsx(r,{children:"Listen(host, port)"}),e.jsx(r,{children:"void"}),"Blocks until the server is stopped."],[e.jsx(r,{children:"Dispose()"}),e.jsx(r,{children:"void"}),"No value is returned."],[e.jsx(r,{children:"ServerGetCallback"}),e.jsx(r,{children:"string"}),"The response body to send to the client."]]}),`
`,e.jsx(a,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(l,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Server is disposed"})," — Calling"," ",`
`,e.jsx(r,{children:"Get"})," or ",e.jsx(r,{children:"Listen"}),` on a disposed server throws a runtime
exception with the message `,e.jsx(r,{children:'"HttpServer: Server is disposed."'})]})}),e.jsx(l,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Handler returned null or threw"}),` — If the callback throws an
unhandled exception, or if it returns `,e.jsx(r,{children:"null"}),`, the server responds with HTTP 500 and
the error message as `,e.jsx(r,{children:"text/plain; charset=utf-8"}),"."]})}),e.jsx(l,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Listen failed to bind"}),` — If the host or port is invalid, or
if the port is already in use, `,e.jsx(r,{children:"Listen"}),` throws a runtime exception from the
underlying native HTTP library.`]})}),e.jsx(l,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Namespace not imported"})," — The ",e.jsx(r,{children:"net"})," ",`
namespace must be imported with `,e.jsx(r,{children:"using net;"})," before"," ",`
`,e.jsx(r,{children:"HttpServer"})," can be referenced."]})})]}),`
`,e.jsx(a,{children:"Remarks"}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Single-method routing."})," The current ",e.jsx(r,{children:"HttpServer"}),` implementation
exposes only `,e.jsx(r,{children:"Get"}),`. POST, PUT, DELETE, and other HTTP methods are not registered by
this class. All registered handlers respond to GET requests and receive only the request body as a
`,e.jsx(r,{children:"string"}),`; headers, query strings, and the request method are not passed to the
callback.`]})}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Response content type."}),` The server always serves the handler return value with the content
type `,e.jsx(r,{children:"text/plain; charset=utf-8"}),` and HTTP status 200. There is no API to set custom
headers or status codes from ShardScript.`]})}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Blocking listen."})," ",e.jsx(r,{children:"Listen"}),` starts the native listener on a background
thread, then pumps the current `,e.jsx(r,{children:"ApplicationDomain"}),`'s libuv event loop on the calling
thread. The call does not return until the server is stopped, which means the server must be shut down from
another thread, signal handler, or by disposing the instance from a callback.`]})}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"VM thread affinity."}),` Incoming requests are accepted by httplib worker threads and then
marshaled onto the domain event loop so that route handlers run on the same VM thread as the rest of the
program. This avoids concurrency hazards inside the ShardScript runtime.`]})}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Disposal."})," ",e.jsx(r,{children:"HttpServer"})," implements"," ",`
`,e.jsx(r,{children:"IDisposable"}),". Call ",e.jsx(r,{children:"Dispose()"}),` to stop the listener, break the
blocking `,e.jsx(r,{children:"Listen"}),` call, and release the native server object and event-loop handle.
Disposing a server that has already been stopped is safe.`]})}),`
`,e.jsx(h,{tone:"blue",children:e.jsxs(s.p,{children:["Use ",e.jsx(r,{children:"defer server := new HttpServer();"})," or explicitly call"," ",`
`,e.jsx(r,{children:"server.Dispose()"}),` to ensure the native listener is torn down. A server left running
will keep the process alive.`]})}),`
`,e.jsx(h,{tone:"amber",title:"Not implemented",children:e.jsxs(s.p,{children:["POST, PUT, DELETE, PATCH, and HEAD route registration are not exposed by"," ",`
`,e.jsx(r,{children:"shard.http"}),`. Custom response headers, status codes, and query-string access are also
not implemented.`]})}),`
`,e.jsx(a,{children:"Examples"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Basic server with a single route."})}),`
`,e.jsx(n,{code:`using stdio;
using net;

namespace demo;

public static func Main() -> void
{
  server: HttpServer = new HttpServer();

  server.Get("/", lambda(requestBody: string) -> string
  {
      return "Hello, ShardScript!";
  });

  println("Listening on http://127.0.0.1:8080");
  server.Listen("127.0.0.1", 8080);

  server.Dispose();
}`,language:"csharp",filename:"httpserver_basic.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Echo endpoint that returns the request body."})}),`
`,e.jsx(n,{code:`using stdio;
using net;

namespace demo;

public static func Main() -> void
{
  server: HttpServer = new HttpServer();

  server.Get("/echo", lambda(requestBody: string) -> string
  {
      if (requestBody == "")
      {
          return "(empty body)";
      }

      return "You sent: " + requestBody;
  });

  server.Listen("127.0.0.1", 8080);
  server.Dispose();
}`,language:"csharp",filename:"httpserver_echo.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Using a named handler function instead of a lambda."})}),`
`,e.jsx(n,{code:`using stdio;
using net;

namespace demo;

public static func GreetHandler(requestBody: string) -> string
{
  if (requestBody == "")
  {
      return "Hello, stranger!";
  }

  return "Hello, " + requestBody + "!";
}

public static func Main() -> void
{
  server: HttpServer = new HttpServer();

  server.Get("/greet", GreetHandler);
  server.Get("/greet/default", GreetHandler);

  server.Listen("127.0.0.1", 8080);
  server.Dispose();
}`,language:"csharp",filename:"httpserver_named_handler.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Registering multiple routes."})}),`
`,e.jsx(n,{code:`using stdio;
using net;

namespace demo;

public static func Main() -> void
{
  server: HttpServer = new HttpServer();

  server.Get("/", lambda(requestBody: string) -> string
  {
      return "Home page";
  });

  server.Get("/status", lambda(requestBody: string) -> string
  {
      return "OK";
  });

  server.Get("/api/time", lambda(requestBody: string) -> string
  {
      // Returns a plain-text timestamp. Date formatting helpers would be used
      // here in a real program; this example keeps the response deterministic.
      return "current time (placeholder)";
  });

  println("Routes registered; starting server on port 6969");
  server.Listen("127.0.0.1", 6969);
  server.Dispose();
}`,language:"csharp",filename:"httpserver_routes.shard"}),`
`,e.jsx(t,{children:e.jsxs("strong",{children:["Using ",e.jsx(r,{children:"defer"})," for automatic disposal."]})}),`
`,e.jsx(n,{code:`using stdio;
using net;

namespace demo;

public static func Main() -> void
{
  defer server := new HttpServer();

  server.Get("/", lambda(requestBody: string) -> string
  {
      println("Received request: " + requestBody);
      return "Hello World";
  });

  println("Starting server on localhost:6969");
  server.Listen("localhost", 6969);
}`,language:"csharp",filename:"httpserver_defer.shard"}),`
`,e.jsx(t,{children:e.jsxs("strong",{children:["Smoke-testing the server with ",e.jsx(r,{children:"HttpClient"}),"."]})}),`
`,e.jsx(n,{code:`using stdio;
using net;

namespace demo;

public static func Main() -> void
{
  // Start the server in a background context or from another process.
  // This example assumes a server is already listening on port 8080.
  client: HttpClient = new HttpClient("http://127.0.0.1:8080");

  response: HttpResponse = client.Get("/");
  println("Status: " + response.StatusCode);
  println("Body: " + response.Body);

  client.Dispose();
}`,language:"csharp",filename:"httpserver_smoke_test.shard"}),`
`,e.jsx(t,{children:e.jsxs("strong",{children:["Common mistake: calling ",e.jsx(r,{children:"Listen"})," without a way to stop the server."]})}),`
`,e.jsx(n,{code:`using stdio;
using net;

namespace demo;

public static func Main() -> void
{
  server: HttpServer = new HttpServer();

  server.Get("/", lambda(requestBody: string) -> string
  {
      return "hello";
  });

  // WRONG: Listen blocks forever. There is no shutdown path.
  // server.Listen("127.0.0.1", 8080);

  // CORRECT: arrange for Dispose to be called later, for example from a
  // signal handler, another thread, or the defer statement shown above.
  server.Listen("127.0.0.1", 8080);
  server.Dispose();
}`,language:"csharp",filename:"httpserver_shutdown.shard"})]})}function u(i={}){const{wrapper:s}=i.components||{};return s?e.jsx(s,{...i,children:e.jsx(c,{...i})}):c(i)}function o(i,s){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};
