import{j as e}from"./index-C1AvCmMi.js";function h(l){const r={p:"p",...l.components},{Bullet:a,Callout:o,CodeBlock:n,DocsTable:c,H2:i,InlineCode:t,Prose:s}=r;return a||d("Bullet"),o||d("Callout"),n||d("CodeBlock"),c||d("DocsTable"),i||d("H2"),t||d("InlineCode"),s||d("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(i,{children:"Summary"}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:["The ",e.jsx(t,{children:"shard.http"})," library in"," ",`
`,e.jsx(t,{children:"ShardScript.Framework/system/http.shard.cpp"}),` implements a synchronous HTTP client,
a blocking HTTP server, and a response value type. `,e.jsx(t,{children:"HttpClient"})," wraps an"," ",`
`,e.jsx(t,{children:"httplib::Client"})," pointer stored as a transient ",e.jsx(t,{children:"nint"}),` and exposes
`,e.jsx(t,{children:"Get"})," and ",e.jsx(t,{children:"Post"})," methods that return an"," ",`
`,e.jsx(t,{children:"HttpResponse"}),". ",e.jsx(t,{children:"HttpServer"})," wraps an"," ",`
`,e.jsx(t,{children:"httplib::Server"}),` pointer and uses libuv to marshal incoming requests from worker threads
onto the owning `,e.jsx(t,{children:"ApplicationDomain"}),`'s event loop. The server route handler is registered as a
delegate of type `,e.jsx(t,{children:"ServerGetCallback(requestBody: string) -> string"}),"."]})}),`
`,e.jsx(i,{children:"Syntax"}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:["From ShardScript, consume the types through the ",e.jsx(t,{children:"net"})," namespace:"]})}),`
`,e.jsx(n,{code:`using stdio;
using net;

namespace demo;

public static func Main() -> void
{
  // Synchronous client bound to a base URL.
  defer client := new HttpClient("http://localhost:8080");
  response: HttpResponse = client.Get("/status");
  println("Client status: " + response.StatusCode);

  // Blocking server with a delegate route handler.
  defer server := new HttpServer();
  server.Get("/", lambda(requestBody: string) -> string
  {
      return "Hello from ShardScript";
  });

  println("Listening on http://127.0.0.1:8080");
  server.Listen("127.0.0.1", 8080);
}`,language:"csharp",filename:"http_demo.shard"}),`
`,e.jsx(c,{headers:["Method","Parameters","Returns","Description"],rows:[[e.jsx(t,{children:"new HttpClient(baseUrl)"}),e.jsx(e.Fragment,{children:e.jsx(t,{children:"baseUrl: string"})}),e.jsx(t,{children:"HttpClient"}),"Binds a client to the supplied base URL."],[e.jsx(t,{children:"HttpClient.Get(path)"}),e.jsx(e.Fragment,{children:e.jsx(t,{children:"path: string"})}),e.jsx(t,{children:"HttpResponse"}),"Performs a synchronous HTTP GET."],[e.jsx(t,{children:"HttpClient.Post(path, jsonPayload)"}),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:"path: string"}),", ",e.jsx(t,{children:"jsonPayload: string"})]}),e.jsx(t,{children:"HttpResponse"}),"Performs a synchronous HTTP POST with Content-Type application/json."],[e.jsx(t,{children:"new HttpServer()"}),"None",e.jsx(t,{children:"HttpServer"}),"Creates a new native HTTP server."],[e.jsx(t,{children:"HttpServer.Get(path, handler)"}),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:"path: string"}),", ",e.jsx(t,{children:"handler: ServerGetCallback"})]}),e.jsx(t,{children:"void"}),"Registers a GET route handler."],[e.jsx(t,{children:"HttpServer.Listen(host, port)"}),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:"host: string"}),", ",e.jsx(t,{children:"port: int"})]}),e.jsx(t,{children:"void"}),"Binds and blocks until the server is stopped."],[e.jsx(t,{children:"HttpResponse.StatusCode"}),"None",e.jsx(t,{children:"int"}),"HTTP status code from the server."],[e.jsx(t,{children:"HttpResponse.Body"}),"None",e.jsx(t,{children:"string"}),"Response payload as a string."]]}),`
`,e.jsx(s,{children:e.jsx(r.p,{children:"In C++, the library is registered as a normal shared library with the two required exports:"})}),`
`,e.jsx(n,{code:`#include <ShardScript.hpp>

#include <string>
#include <thread>
#include <mutex>
#include <condition_variable>
#include <deque>
#include <atomic>
#include <cstdint>

#include <uv.h>
#include "httplib.h"

using namespace shard;

SHARDLIB_GETMETADATA
{
  lib.Name        = L"shard.http";
  lib.Description = L"Native HTTP client and server";
  lib.Version     = L"1.0.0";
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> httpNamespace(context, L"net");

  // HttpResponse, HttpClient, and HttpServer are registered here.
}`,language:"cpp",filename:"http.shard.cpp"}),`
`,e.jsx(i,{children:"Parameters / Arguments"}),`
`,e.jsx(c,{headers:["Parameter","Type","Description"],rows:[[e.jsx(t,{children:"baseUrl"}),"string","Scheme, host, and optional port used by every request from the client."],[e.jsx(t,{children:"path"}),"string","Request path, relative to baseUrl for clients or absolute for server routes."],[e.jsx(t,{children:"jsonPayload"}),"string","Body sent with a POST request; the implementation sets Content-Type to application/json."],[e.jsx(t,{children:"handler"}),"ServerGetCallback","Delegate that receives the request body and returns the response body."],[e.jsx(t,{children:"host"}),"string",'Bind address such as "127.0.0.1" or "0.0.0.0".'],[e.jsx(t,{children:"port"}),"int","TCP port on which the server listens."]]}),`
`,e.jsx(i,{children:"Returns"}),`
`,e.jsx(c,{headers:["Member / Call","Return type","Description"],rows:[[e.jsx(t,{children:"new HttpClient(baseUrl)"}),e.jsx(t,{children:"HttpClient"}),"A client instance that implements IDisposable."],[e.jsx(t,{children:"HttpClient.Get(path)"}),e.jsx(t,{children:"HttpResponse"}),"The server response, including status code and body."],[e.jsx(t,{children:"HttpClient.Post(path, jsonPayload)"}),e.jsx(t,{children:"HttpResponse"}),"The server response, including status code and body."],[e.jsx(t,{children:"new HttpServer()"}),e.jsx(t,{children:"HttpServer"}),"A server instance that implements IDisposable."],[e.jsx(t,{children:"HttpServer.Get(path, handler)"}),e.jsx(t,{children:"void"}),"No value; the handler is registered for later invocation."],[e.jsx(t,{children:"HttpServer.Listen(host, port)"}),e.jsx(t,{children:"void"}),"Blocks until the server is stopped."],[e.jsx(t,{children:"ServerGetCallback"}),e.jsx(t,{children:"string"}),"The response body sent to the HTTP client."]]}),`
`,e.jsx(i,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Namespace import required"})," — The"," ",`
`,e.jsx(t,{children:"net"})," namespace must be imported with ",e.jsx(t,{children:"using net;"}),` before
any of the HTTP types are referenced.`]})}),e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Client disposed"})," — Calling"," ",`
`,e.jsx(t,{children:"Get"})," or ",e.jsx(t,{children:"Post"})," after ",e.jsx(t,{children:"Dispose()"})," ",`
throws `,e.jsx(t,{children:'"HttpClient: Client is disposed."'}),"."]})}),e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Server disposed"})," — Calling ",e.jsx(t,{children:"Get"})," or"," ",`
`,e.jsx(t,{children:"Listen"})," on a disposed server throws"," ",`
`,e.jsx(t,{children:'"HttpServer: Server is disposed."'}),"."]})}),e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Connection or request failure"}),` — Network errors, timeouts,
or invalid paths throw a runtime exception whose message comes from the underlying httplib client.`]})}),e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Handler returned null or threw"}),` — If a route handler
throws or returns `,e.jsx(t,{children:"null"}),", the server responds with HTTP 500 and the error text as"," ",`
`,e.jsx(t,{children:"text/plain; charset=utf-8"}),"."]})}),e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"HTTP-level errors are not exceptions"}),` — Status codes such
as 404 and 500 are returned normally in `,e.jsx(t,{children:"HttpResponse"}),"; inspect"," ",`
`,e.jsx(t,{children:"StatusCode"})," to distinguish outcomes."]})})]}),`
`,e.jsx(i,{children:"Remarks"}),`
`,e.jsx(o,{tone:"blue",title:"Native library shape",children:e.jsxs(r.p,{children:["A ShardScript native library is any shared library (",e.jsx(t,{children:".dll"})," on Windows, ",e.jsx(t,{children:".so"})," on Linux, ",e.jsx(t,{children:".dylib"})," on macOS) that exports the two C-linkage symbols ",e.jsx(t,{children:"ShardLib_GetMetadata"})," and ",e.jsx(t,{children:"ShardLib_EntryPoint"}),". It can be built from one or many C++ source files, live inside ",e.jsx(t,{children:"ShardScript.Framework"})," or in a completely separate project, and links against the ShardScript runtime shared library using headers from ",e.jsx(t,{children:"ShardScript/include"}),". For the full registration contract, see ",e.jsx(t,{children:"native-library-overview.mdx"}),"."]})}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"HttpResponse as a plain data object."}),` The response class stores its values in backing
fields and exposes them through read-only properties. This keeps the managed surface simple and avoids
custom getter logic.`]})}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"HttpClient stores a transient native pointer."})," The constructor allocates an"," ",`
`,e.jsx(t,{children:"httplib::Client"})," and stores it in an ",e.jsx(t,{children:"nint"})," field with"," ",`
`,e.jsx(t,{children:"isTransient = true"}),` so the garbage collector does not try to free the underlying
C++ object. `,e.jsx(t,{children:"Dispose"})," deletes the client and clears the field."]})}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Server route handlers are delegates."})," The entry point fabricates a delegate type with"," ",`
`,e.jsx(t,{children:"SymbolFactory::Delegate"})," and registers it as the second parameter of"," ",`
`,e.jsx(t,{children:"HttpServer.Get"}),". At runtime the handler object holds the method symbol in"," ",`
`,e.jsx(t,{children:"DelegateTarget"})," and the captured receiver, if any, on the delegate instance."]})}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Threading and event-loop marshalling."}),` The VM and garbage collector are not thread-safe,
so an incoming HTTP request must not run its ShardScript handler on httplib's worker thread. The server
context creates a libuv `,e.jsx(t,{children:"uv_async_t"}),` on the domain's event loop. When a request
arrives, the worker thread enqueues the request, calls `,e.jsx(t,{children:"uv_async_send"}),` to wake the
loop, and then waits on a condition variable. The async callback, which runs on the event-loop thread,
dequeues the work, invokes the delegate through the VM, fills in the response, and signals the worker
thread to continue.`]})}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Registering a route keeps the delegate alive."})," When"," ",`
`,e.jsx(t,{children:"HttpServer.Get"}),` is called, the handler delegate's reference count is incremented
and the pointer is stored in the context's `,e.jsx(t,{children:"Handlers"}),` vector. The context destructor
decrements the references so the GC can reclaim the handler after the server shuts down.`]})}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Listen pumps the event loop on the calling thread."})," ",`
`,e.jsx(t,{children:"HttpServer.Listen"}),` starts the native listener on a background thread and then runs
the domain event loop on the thread that called `,e.jsx(t,{children:"Listen"}),`. The call does not return
until the server is stopped, so the server must be shut down from another thread or from a handler.
`,e.jsx(t,{children:"Dispose"}),` stops the listener and the event loop, then releases the native server
context.`]})}),`
`,e.jsx(o,{tone:"blue",children:e.jsx(r.p,{children:`The request handler always executes on the domain event-loop thread, so it can safely allocate objects,
invoke other managed methods, and touch GC handles. The worker thread only performs the blocking network
I/O and the cross-thread wait.`})}),`
`,e.jsx(o,{tone:"amber",title:"Not implemented",children:e.jsx(r.p,{children:`This example only exposes GET routes, plain-text responses, and synchronous client methods. POST support
exists on the client but custom headers, other HTTP methods, query-string access, and async request methods
are not shown.`})}),`
`,e.jsx(i,{children:"Examples"}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Register the response type."}),` The response class stores its values in backing fields and
exposes them through read-only properties.`]})}),`
`,e.jsx(n,{code:`// --- class HttpResponse ---
SymbolBuilder<ClassSymbol> respClass = httpNamespace.AddClass(L"HttpResponse");
shard_HttpResponse = respClass;

SymbolBuilder<PropertySymbol> statusCodeProp = respClass.AddProperty(
  L"StatusCode", TYPE_INT, LINK_INSTANCE, ACS_PUBLIC);
shard_HttpResponse_StatusField = statusCodeProp.AddBackingField();

statusCodeProp.AddGetter()
  .SetCallback([](const CallState& context)
  {
      return context.Args[0]->GetField(shard_HttpResponse_StatusField->SlotIndex);
  });

SymbolBuilder<PropertySymbol> bodyProp = respClass.AddProperty(
  L"Body", TYPE_STRING, LINK_INSTANCE, ACS_PUBLIC);
shard_HttpResponse_BodyField = bodyProp.AddBackingField();

bodyProp.AddGetter()
  .SetCallback([](const CallState& context)
  {
      return context.Args[0]->GetField(shard_HttpResponse_BodyField->SlotIndex);
  });`,language:"cpp",filename:"http.shard.cpp"}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Register the client."})," The constructor allocates an ",e.jsx(t,{children:"httplib::Client"})," ",`
and stores it in a transient `,e.jsx(t,{children:"nint"})," field. ",e.jsx(t,{children:"Get"}),` performs a
synchronous request and forwards the result to the response constructor.`]})}),`
`,e.jsx(n,{code:`static ObjectInstance* shard_http_Client_Init(const CallState& context) noexcept(false)
{
  ObjectInstance* instance = context.Args[0];
  std::wstring wideBaseUrl = context.Args[1]->AsString();

  std::string u8BaseUrl = strings::WideToUtf8(wideBaseUrl);
  httplib::Client* client = new httplib::Client(u8BaseUrl);

  client->set_connection_timeout(std::chrono::seconds(5));
  client->set_read_timeout(std::chrono::seconds(5));

  instance->SetField(
      shard_HttpClient_ClientPtrField->SlotIndex,
      context.Collector.FromNint(client, true));

  return instance;
}

static ObjectInstance* shard_http_Client_Get(const CallState& context) noexcept(false)
{
  ObjectInstance* instance = context.Args[0];
  std::wstring widePath = context.Args[1]->AsString();

  httplib::Client* client = GetClientPtr(instance);
  if (client == nullptr)
  {
      throw std::runtime_error("HttpClient: Client is disposed.");
  }

  std::string u8Path = strings::WideToUtf8(widePath);
  httplib::Result res = client->Get(u8Path);
  if (res == nullptr)
  {
      throw std::runtime_error("HTTP Request Failed: " + httplib::to_string(res.error()));
  }

  ObjectInstance* responseInstance = context.Collector.AllocateInstance(shard_HttpResponse);
  ObjectInstance* statusVal = context.Collector.FromValue(static_cast<int64_t>(res->status));
  ObjectInstance* bodyVal = context.Collector.FromValue(strings::Utf8ToWide(res->body));

  // Forward to the response constructor to populate the backing fields.
  CallState initContext = context;
  ObjectInstance* newargs[] = { responseInstance, statusVal, bodyVal };
  initContext.Args = newargs;
  shard_http_Response_Init(initContext);

  return responseInstance;
}`,language:"cpp",filename:"http.shard.cpp"}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Register the server type."})," The entry point fabricates a delegate type and registers"," ",`
`,e.jsx(t,{children:"Get"})," and ",e.jsx(t,{children:"Listen"})," methods."]})}),`
`,e.jsx(n,{code:`SymbolBuilder<ClassSymbol> serverClass = httpNamespace.AddClass(L"HttpServer");
shard_HttpServer = serverClass.Implements(TRAIT_DISPOSABLE);

shard_HttpServer_ClientPtrField = serverClass
  .AddField(L"_nativeServer", TYPE_NINT, LINK_INSTANCE, ACS_PRIVATE);

serverClass.AddInit()
  .SetCallback(&shard_http_Server_Init);

SymbolFactory& factory = serverClass.GetFactory();
std::vector<ParameterSymbol*> params = { factory.Parameter(L"requestBody", TYPE_STRING) };
DelegateTypeSymbol* delegate = factory.Delegate(L"ServerGetCallback", TYPE_STRING, params);

serverClass.AddMethod(L"Get", TYPE_VOID, LINK_INSTANCE)
  .AddParameter(L"path", TYPE_STRING)
  .AddParameter(L"handler", delegate)
  .SetCallback(&shard_http_Server_Get);

serverClass.AddMethod(L"Listen", TYPE_VOID, LINK_INSTANCE)
  .AddParameter(L"host", TYPE_STRING)
  .AddParameter(L"port", TYPE_INT)
  .SetCallback(&shard_http_Server_Listen);

serverClass.AddMethod(L"Dispose", TYPE_VOID, LINK_INSTANCE, ACS_PUBLIC)
  .SetCallback(&shard_http_Server_Dispose)
  .IsImplementationOf(TRAIT_DISPOSABLE_Dispose);`,language:"cpp",filename:"http.shard.cpp"}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Server request context."}),` The request context queues incoming requests and synchronizes
between httplib's worker thread and the VM's event-loop thread.`]})}),`
`,e.jsx(n,{code:`struct HttpServerRequest
{
  ObjectInstance* Handler = nullptr;
  std::string RequestBody;
  httplib::Response* Response = nullptr;

  std::mutex Mutex;
  std::condition_variable CV;
  bool Done = false;
  bool ResponseWritten = false;

  bool Faulted = false;
  int StatusCode = 200;
  std::string ErrorMessage;
  std::string ResponseBody;
};

struct HttpServerContext
{
  ApplicationDomain* Domain = nullptr;
  httplib::Server* Server = nullptr;
  uv_async_t WakeHandle{};

  std::mutex Mutex;
  std::condition_variable CV;
  std::deque<std::shared_ptr<HttpServerRequest>> Pending;

  std::atomic<bool> Stopped{ false };
  std::thread ListenThread;

  std::vector<ObjectInstance*> Handlers;

  ~HttpServerContext()
  {
      for (ObjectInstance* handler : Handlers)
      {
          if (handler != nullptr && handler != GarbageCollector::NullInstance)
          {
              handler->DecrementReference();
          }
      }
  }
};

static void ProcessServerRequest(HttpServerContext* ctx, HttpServerRequest* request)
{
  VirtualMachine& vm = ctx->Domain->GetVirtualMachine();
  GarbageCollector& gc = ctx->Domain->GetGarbageCollector();

  ObjectInstance* bodyObj = gc.FromValue(strings::Utf8ToWide(request->RequestBody));

  MethodSymbol* handlerMethod = request->Handler->DelegateTarget;
  CallStackFrame* rootFrame = vm.PushFrame(handlerMethod);
  rootFrame->PushStack(request->Handler);

  ObjectInstance* responseBody = nullptr;
  try
  {
      ObjectInstance* handlerArgs[] = { bodyObj };
      responseBody = vm.InvokeMethod(handlerMethod, handlerArgs, 1);
  }
  catch (const std::exception& ex)
  {
      request->Faulted = true;
      request->ErrorMessage = ex.what();
  }

  vm.PopFrame();

  if (!request->Faulted && responseBody != nullptr)
  {
      request->ResponseBody = strings::WideToUtf8(responseBody->AsString());
      request->StatusCode = 200;
      gc.DestroyInstance(responseBody);
  }
  else if (!request->Faulted)
  {
      request->Faulted = true;
      request->ErrorMessage = "HTTP handler did not return a response body";
  }

  {
      std::lock_guard<std::mutex> lock(request->Mutex);
      request->Done = true;
      request->CV.notify_one();
  }
}

static void ServerWakeCallback(uv_async_t* handle)
{
  HttpServerContext* ctx = static_cast<HttpServerContext*>(handle->data);
  if (ctx == nullptr)
  {
      return;
  }

  std::deque<std::shared_ptr<HttpServerRequest>> requests;
  {
      std::lock_guard<std::mutex> lock(ctx->Mutex);
      requests = std::move(ctx->Pending);
  }

  for (std::shared_ptr<HttpServerRequest>& req : requests)
  {
      ProcessServerRequest(ctx, req.get());
  }
}`,language:"cpp",filename:"http.shard.cpp"}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Route handler callback."})," The ",e.jsx(t,{children:"Get"}),` callback pins the delegate,
registers the route with httplib, and waits for the event-loop thread to process the request.`]})}),`
`,e.jsx(n,{code:`static ObjectInstance* shard_http_Server_Get(const CallState& context) noexcept(false)
{
  ObjectInstance* instance = context.Args[0];
  ObjectInstance* widePathObj = context.Args[1];
  ObjectInstance* shardCallback = context.Args[2];

  HttpServerContext* ctx = GetServerContext(instance);
  if (ctx == nullptr || ctx->Server == nullptr)
  {
      throw std::runtime_error("HttpServer: Server is disposed.");
  }

  shardCallback->IncrementReference();
  ctx->Handlers.push_back(shardCallback);

  std::string path = strings::WideToUtf8(widePathObj->AsString());

  ctx->Server->Get(path, [ctx, shardCallback](const httplib::Request& req, httplib::Response& res)
  {
      std::shared_ptr<HttpServerRequest> request = std::make_shared<HttpServerRequest>();
      request->Handler = shardCallback;
      request->RequestBody = req.body;
      request->Response = &res;

      {
          std::lock_guard<std::mutex> lock(ctx->Mutex);
          ctx->Pending.push_back(request);
      }

      uv_async_send(&ctx->WakeHandle);

      std::unique_lock<std::mutex> lock(request->Mutex);
      request->CV.wait(lock, [request] { return request->Done; });

      if (request->Faulted)
      {
          res.status = 500;
          res.set_content(request->ErrorMessage, "text/plain; charset=utf-8");
      }
      else
      {
          res.status = request->StatusCode;
          res.set_content(request->ResponseBody, "text/plain; charset=utf-8");
      }

      request->ResponseWritten = true;
  });

  return nullptr;
}`,language:"cpp",filename:"http.shard.cpp"}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Listen callback."})," ",e.jsx(t,{children:"Listen"}),` starts the native listener on a
background thread and pumps the event loop on the calling thread until the server is stopped.`]})}),`
`,e.jsx(n,{code:`static ObjectInstance* shard_http_Server_Listen(const CallState& context) noexcept(false)
{
  ObjectInstance* instance = context.Args[0];
  ObjectInstance* hostObj = context.Args[1];
  ObjectInstance* portObj = context.Args[2];

  HttpServerContext* ctx = GetServerContext(instance);
  if (ctx == nullptr || ctx->Server == nullptr)
  {
      throw std::runtime_error("HttpServer: Server is disposed.");
  }

  std::string host = strings::WideToUtf8(hostObj->AsString());
  int64_t port = portObj->AsInteger();

  ctx->Stopped = false;
  ctx->ListenThread = std::thread([ctx, host, port]()
  {
      ctx->Server->listen(host, static_cast<int>(port));
  });

  // Pump the event loop on this thread; request handlers run here.
  ctx->Domain->GetEventLoop().Run();

  if (ctx->ListenThread.joinable())
  {
      ctx->ListenThread.join();
  }

  instance->SetField(
      shard_HttpServer_ClientPtrField->SlotIndex,
      GarbageCollector::NullInstance);

  uv_close(reinterpret_cast<uv_handle_t*>(&ctx->WakeHandle), [](uv_handle_t* handle)
  {
      HttpServerContext* ctx = static_cast<HttpServerContext*>(handle->data);
      if (ctx != nullptr)
      {
          delete ctx->Server;
          delete ctx;
      }
  });

  return nullptr;
}`,language:"cpp",filename:"http.shard.cpp"}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Building the library as a standalone shared library."}),` The example below is a normal CMake
shared-library target. It links the ShardScript runtime, includes headers from`," ",`
`,e.jsx(t,{children:"ShardScript/include"}),`, and links libuv for event-loop integration. httplib is
assumed to be available as a header-only dependency in `,e.jsx(t,{children:"third_party/"}),"."]})}),`
`,e.jsx(n,{code:`cmake_minimum_required(VERSION 3.20)
project(MyHttpShard CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

set(SHARDSCRIPT_ROOT "\${CMAKE_CURRENT_SOURCE_DIR}/../ShardScript"
  CACHE PATH "Root of the ShardScript repository or install prefix")

find_library(SHARDSCRIPT_LIB
  NAMES ShardScript libShardScript
  PATHS "\${SHARDSCRIPT_ROOT}/build/bin" "\${SHARDSCRIPT_ROOT}/lib"
  NO_DEFAULT_PATH
  REQUIRED
)

find_package(libuv CONFIG REQUIRED)

add_library(shard.http SHARED
  http.cpp
  http_client.cpp
  http_server.cpp
)

set_target_properties(shard.http PROPERTIES
  WINDOWS_EXPORT_ALL_SYMBOLS ON
)

target_include_directories(shard.http PRIVATE
  "\${SHARDSCRIPT_ROOT}/ShardScript/include"
  "\${CMAKE_CURRENT_SOURCE_DIR}/third_party"
)

target_link_libraries(shard.http PRIVATE
  \${SHARDSCRIPT_LIB}
  uv
)`,language:"cmake",filename:"CMakeLists.txt"}),`
`,e.jsx(s,{children:e.jsx(r.p,{children:"Configure and build the same way as any other CMake project:"})}),`
`,e.jsx(n,{code:`cmake -S . -B build -G Ninja -DCMAKE_BUILD_TYPE=Release
cmake --build build --parallel`,language:"bash"}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:["Load the resulting shared library with the ",e.jsx(t,{children:"-l"})," flag:"]})}),`
`,e.jsx(n,{code:`# Windows
shard app.shard -l build/shard.http.dll

# Linux
shard app.shard -l build/libshard.http.so

# macOS
shard app.shard -l build/libshard.http.dylib`,language:"bash"}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Smoke test: client and server together."}),` The following program starts a server in one
scope and, in a real deployment, a separate process or task would query it with`," ",`
`,e.jsx(t,{children:"HttpClient"}),". The two snippets show the expected consumption patterns."]})}),`
`,e.jsx(n,{code:`using stdio;
using net;

namespace demo;

public static func RunServer() -> void
{
  defer server := new HttpServer();

  server.Get("/echo", lambda(requestBody: string) -> string
  {
      if (requestBody == "")
      {
          return "(empty body)";
      }

      return "Echo: " + requestBody;
  });

  println("Server listening on http://127.0.0.1:8080");
  server.Listen("127.0.0.1", 8080);
}

public static func QueryServer() -> void
{
  defer client := new HttpClient("http://127.0.0.1:8080");

  response: HttpResponse = client.Get("/echo");
  println("Status: " + response.StatusCode);
  println(response.Body);
}`,language:"csharp",filename:"http_smoke_test.shard"}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Minimal standalone native library skeleton."}),` If you are building a brand-new HTTP library
rather than studying the framework file, the same registration pattern works in any project:`]})}),`
`,e.jsx(n,{code:`SHARDLIB_GETMETADATA
{
  lib.Name        = L"shard.http";
  lib.Description = L"Native HTTP client and server";
  lib.Version     = L"1.0.0";
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> httpNamespace(context, L"net");

  SymbolBuilder<ClassSymbol> clientClass = httpNamespace.AddClass(L"HttpClient");
  clientClass.Implements(TRAIT_DISPOSABLE);

  clientClass.AddField(L"_clientPtr", TYPE_NINT, LINK_INSTANCE, ACS_PRIVATE);

  clientClass.AddInit()
      .AddParameter(L"baseUrl", TYPE_STRING)
      .SetCallback(&shard_http_Client_Init);

  clientClass.AddMethod(L"Get", TYPE_STRING, LINK_INSTANCE)
      .AddParameter(L"path", TYPE_STRING)
      .SetCallback(&shard_http_Client_Get);

  // Register HttpResponse, HttpServer, and Dispose implementations the same way.
}`,language:"cpp",filename:"http.shard.cpp"}),`
`,e.jsx(i,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx(t,{children:"library-building/example-async-io"})," — async I/O patterns."]})}),e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx(t,{children:"library-building/example-native-handle-wrapper"})," — wrapping C++ handles with IDisposable."]})}),e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx(t,{children:"library-building/working-with-objects"})," — working with managed objects in callbacks."]})})]}),`
`,e.jsx(i,{children:"Source"}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:["The example implementation lives in ",e.jsx(t,{children:"ShardScript.Framework/system/http.shard.cpp"}),`.
View the source on GitHub: `,e.jsx(t,{children:"https://github.com/Rikitav/ShardScript/blob/main/ShardScript.Framework/system/http.shard.cpp"}),"."]})})]})}function u(l={}){const{wrapper:r}=l.components||{};return r?e.jsx(r,{...l,children:e.jsx(h,{...l})}):h(l)}function d(l,r){throw new Error("Expected component `"+l+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};
