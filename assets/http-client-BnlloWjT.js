import{j as e}from"./index-DbX8E4-q.js";function h(r){const n={p:"p",...r.components},{Bullet:a,Callout:d,CodeBlock:i,DocsTable:l,H2:o,InlineCode:t,Prose:s}=n;return a||c("Bullet"),d||c("Callout"),i||c("CodeBlock"),l||c("DocsTable"),o||c("H2"),t||c("InlineCode"),s||c("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(o,{children:"Summary"}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:["The ",e.jsx(t,{children:"shard.http"})," library exposes the ",e.jsx(t,{children:"HttpClient"})," ",`
class in the `,e.jsx(t,{children:"net"}),` namespace for making synchronous HTTP requests against a
single base URL. It currently supports `,e.jsx(t,{children:"GET"})," and ",e.jsx(t,{children:"POST"})," ",`
operations and returns a structured `,e.jsx(t,{children:"HttpResponse"}),` containing the status code
and response body.`]})}),`
`,e.jsx(o,{children:"Syntax"}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:["Import the namespace and create a client bound to a base URL. The client implements"," ",`
`,e.jsx(t,{children:"IDisposable"}),", so it must be disposed when it is no longer needed:"]})}),`
`,e.jsx(i,{code:`using net;

namespace demo;

public static func Main() -> void
{
  // The client is bound to the base URL for the lifetime of the object.
  client := new HttpClient("http://localhost:8080");

  // Perform a GET request against a path relative to the base URL.
  response: HttpResponse = client.Get("/api/status");
  println(response.StatusCode);
  println(response.Body);

  // Release the native httplib client and its connection state.
  client.Dispose();
}`,language:"csharp",filename:"httpclient_basic.shard"}),`
`,e.jsx(l,{headers:["Member","Signature","Access"],rows:[[e.jsx(t,{children:"HttpClient"}),e.jsx(e.Fragment,{children:e.jsx(t,{children:"new HttpClient(baseUrl: string)"})}),"Public constructor; binds the client to the supplied base URL."],[e.jsx(t,{children:"Get(path)"}),e.jsx(e.Fragment,{children:e.jsx(t,{children:"func Get(path: string) -> HttpResponse"})}),"Instance method; performs an HTTP GET request."],[e.jsx(t,{children:"Post(path, jsonPayload)"}),e.jsx(e.Fragment,{children:e.jsx(t,{children:"func Post(path: string, jsonPayload: string) -> HttpResponse"})}),"Instance method; performs an HTTP POST request with JSON content."],[e.jsx(t,{children:"Dispose()"}),e.jsx(e.Fragment,{children:e.jsx(t,{children:"func Dispose() -> void"})}),"Instance method; releases the native client and connection resources."],[e.jsx(t,{children:"HttpResponse.StatusCode"}),e.jsx(e.Fragment,{children:e.jsx(t,{children:"property StatusCode: int"})}),"Read-only instance property; HTTP status code returned by the server."],[e.jsx(t,{children:"HttpResponse.Body"}),e.jsx(e.Fragment,{children:e.jsx(t,{children:"property Body: string"})}),"Read-only instance property; response payload as a string."]]}),`
`,e.jsx(o,{children:"Parameters / Arguments"}),`
`,e.jsx(l,{headers:["Parameter","Type","Description"],rows:[[e.jsx(t,{children:"baseUrl"}),"string",'The scheme, host, and optional port to which all requests are relative. Example values include "http://localhost:8080" and "https://api.example.com".'],[e.jsx(t,{children:"path"}),"string",'The request path, relative to baseUrl. May include a query string such as "/search?q=shard".'],[e.jsx(t,{children:"jsonPayload"}),"string",'The request body sent with a POST request. The implementation always sets the Content-Type header to "application/json".']]}),`
`,e.jsx(o,{children:"Returns"}),`
`,e.jsx(l,{headers:["Member","Return Type","Description"],rows:[[e.jsx(t,{children:"new HttpClient(baseUrl)"}),"HttpClient","A client instance bound to the supplied base URL."],[e.jsx(t,{children:"Get(path)"}),"HttpResponse","The server response, including status code and body."],[e.jsx(t,{children:"Post(path, jsonPayload)"}),"HttpResponse","The server response, including status code and body."],[e.jsx(t,{children:"Dispose()"}),"void","No value is returned."],[e.jsx(t,{children:"HttpResponse.StatusCode"}),"int","Numeric HTTP status code, such as 200, 404, or 500."],[e.jsx(t,{children:"HttpResponse.Body"}),"string","Response body decoded as a wide string. Binary payloads are represented as-is; non-text content may contain unprintable characters."]]}),`
`,e.jsx(o,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Namespace import required"})," — The"," ",`
`,e.jsx(t,{children:"net"})," namespace must be imported with ",e.jsx(t,{children:"using net;"})," ",`
before `,e.jsx(t,{children:"HttpClient"})," or ",e.jsx(t,{children:"HttpResponse"})," can be referenced."]})}),e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Argument type mismatch"}),` — The constructor and every
method expect `,e.jsx(t,{children:"string"}),` arguments. Passing other primitive types or reference
types fails semantic analysis.`]})}),e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Connection failure"}),` — If the underlying TCP connection
cannot be established, `,e.jsx(t,{children:"Get"})," and ",e.jsx(t,{children:"Post"}),` throw a runtime
exception with a message such as "HTTP Request Failed: Connection".`]})}),e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Request timeout"}),` — The client enforces a 5-second
connection timeout and a 5-second read timeout. Exceeding either throws a runtime exception.`]})}),e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Use after dispose"})," — Calling ",e.jsx(t,{children:"Get"}),`,
`,e.jsx(t,{children:"Post"}),", or reusing the client after ",e.jsx(t,{children:"Dispose()"}),` throws
"HttpClient: Client is disposed.".`]})}),e.jsx(a,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"HTTP-level errors are not exceptions"}),` — Status codes
such as 404 and 500 are returned normally in the `,e.jsx(t,{children:"HttpResponse"}),`; they do not
throw. Inspect `,e.jsx(t,{children:"StatusCode"})," to distinguish success from failure."]})})]}),`
`,e.jsx(o,{children:"Remarks"}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Base URL binding."})," The ",e.jsx(t,{children:"baseUrl"}),` passed to the constructor is
stored in the native httplib client and applies to every request. The `,e.jsx(t,{children:"path"})," ",`
argument is concatenated with the base URL, so it should begin with a forward slash and should not
repeat the host or scheme.`]})}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Synchronous execution."})," Both ",e.jsx(t,{children:"Get"})," and ",e.jsx(t,{children:"Post"})," ",`
block the calling thread until the request completes, fails, or times out. They are not async methods and
cannot be awaited. For concurrent requests, create one client per thread or run each request on its own
`,e.jsx(t,{children:"Task"})," and call ",e.jsx(t,{children:"Task.Wait"}),"."]})}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Timeouts are fixed."}),` The constructor sets a 5-second connection timeout and a 5-second
read timeout. These values are not configurable from ShardScript code. Hosts that require longer timeouts
must perform the request outside the VM or use a separate integration layer.`]})}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"POST content type."})," ",e.jsx(t,{children:"Post"}),` always sends the payload with the
header `,e.jsx(t,{children:"Content-Type: application/json"}),`. To send other content types, use the
generic request overloads in a host integration library.`]})}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Response body encoding."}),` The native response bytes are converted to a wide string using
a byte-to-wchar expansion. This works for UTF-8 and ASCII text. Binary content is preserved as a string
of code points, but manipulation of such content should be done through the byte-oriented stream APIs
instead of `,e.jsx(t,{children:"HttpResponse.Body"}),"."]})}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Resource cleanup."})," ",e.jsx(t,{children:"HttpClient"}),` wraps a native httplib client
pointer. Call `,e.jsx(t,{children:"Dispose()"}),` when the client is no longer needed to free the
connection pool and native resources. The `,e.jsx(t,{children:"defer"}),` statement can be used to
guarantee disposal at the end of the enclosing scope.`]})}),`
`,e.jsx(d,{tone:"blue",children:e.jsxs(n.p,{children:["Treat non-2xx status codes as application-level failures. Always inspect"," ",`
`,e.jsx(t,{children:"response.StatusCode"})," before parsing ",e.jsx(t,{children:"response.Body"}),"."]})}),`
`,e.jsx(d,{tone:"amber",title:"Not implemented",children:e.jsxs(n.p,{children:["The following HTTP features are not exposed by ",e.jsx(t,{children:"HttpClient"}),`: custom headers,
request methods other than GET and POST (such as PUT, DELETE, PATCH), query-string builders, form
encoding, multipart uploads, cookies, redirects, proxy configuration, and async request methods.`]})}),`
`,e.jsx(o,{children:"Examples"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Basic GET request with explicit disposal."})}),`
`,e.jsx(i,{code:`using stdio;
using net;

namespace demo;

public static func Main() -> void
{
  client := new HttpClient("http://httpbin.org");

  response: HttpResponse = client.Get("/get");
  println("Status: " + response.StatusCode);

  if (response.StatusCode == 200)
  {
      println(response.Body);
  }

  client.Dispose();
}`,language:"csharp",filename:"httpclient_get.shard"}),`
`,e.jsx(s,{children:e.jsxs("strong",{children:["Automatic disposal with ",e.jsx(t,{children:"defer"}),"."]})}),`
`,e.jsx(i,{code:`using stdio;
using net;

namespace demo;

public static func Main() -> void
{
  // The Dispose call is scheduled when this scope exits, even if an exception occurs.
  defer client := new HttpClient("http://localhost:8080");

  response: HttpResponse = client.Get("/health");
  println("Status: " + response.StatusCode);
  println("Body: " + response.Body);
}`,language:"csharp",filename:"httpclient_defer.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"POST request with a JSON payload."})}),`
`,e.jsx(i,{code:`using stdio;
using net;

namespace demo;

public static func Main() -> void
{
  defer client := new HttpClient("http://localhost:8080");

  payload: string = "{"name": "shard", "version": 1}";
  response: HttpResponse = client.Post("/api/records", payload);

  if (response.StatusCode >= 200 && response.StatusCode < 300)
  {
      println("Created: " + response.Body);
  }
  else
  {
      println("Server returned " + response.StatusCode);
      println(response.Body);
  }
}`,language:"csharp",filename:"httpclient_post.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Handling network failures gracefully."})}),`
`,e.jsx(i,{code:`using stdio;
using net;

namespace demo;

public static func Main() -> void
{
  defer client := new HttpClient("http://localhost:8080");

  try
  {
      response: HttpResponse = client.Get("/api/data");
      println("Status: " + response.StatusCode);
      println(response.Body);
  }
  catch (ex: RuntimeException)
  {
      // The base URL or path may be unreachable, or the request timed out.
      println("Request failed: " + ex.Message);
  }
}`,language:"csharp",filename:"httpclient_error.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Inspecting status codes before reading the body."})}),`
`,e.jsx(i,{code:`using stdio;
using net;

namespace demo;

public static func Main() -> void
{
  defer client := new HttpClient("http://localhost:8080");

  response: HttpResponse = client.Get("/missing-resource");

  if (response.StatusCode == 404)
  {
      println("Resource not found");
  }
  else if (response.StatusCode >= 500)
  {
      println("Server error: " + response.StatusCode);
  }
  else if (response.StatusCode == 200)
  {
      println("OK: " + response.Body);
  }
  else
  {
      println("Unexpected status: " + response.StatusCode);
  }
}`,language:"csharp",filename:"httpclient_status.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Common mistake: treating the client as a static singleton."})}),`
`,e.jsx(i,{code:`using stdio;
using net;

namespace demo;

// WRONG: a shared mutable client can outlive its intended scope and is
//        not thread-safe by default.
// static sharedClient: HttpClient = new HttpClient("http://localhost:8080");

public static func Main() -> void
{
  // CORRECT: create and dispose a client in the scope where it is used.
  defer client := new HttpClient("http://localhost:8080");

  response: HttpResponse = client.Get("/api/status");
  println(response.StatusCode);
}`,language:"csharp",filename:"httpclient_scope.shard"})]})}function u(r={}){const{wrapper:n}=r.components||{};return n?e.jsx(n,{...r,children:e.jsx(h,{...r})}):h(r)}function c(r,n){throw new Error("Expected component `"+r+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};
