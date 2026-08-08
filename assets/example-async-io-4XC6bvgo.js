import{j as e}from"./index-BugjY_CW.js";function h(i){const r={p:"p",...i.components},{Bullet:n,Callout:o,CodeBlock:l,DocsTable:c,H2:s,InlineCode:t,Prose:a}=r;return n||d("Bullet"),o||d("Callout"),l||d("CodeBlock"),c||d("DocsTable"),s||d("H2"),t||d("InlineCode"),a||d("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(s,{children:"Summary"}),`
`,e.jsx(a,{children:e.jsxs(r.p,{children:["The ",e.jsx(t,{children:"shard.streams"})," and ",e.jsx(t,{children:"shard.filesystem"}),` native libraries,
implemented in `,e.jsx(t,{children:"system/streams.shard.cpp"})," and"," ",`
`,e.jsx(t,{children:"system/filesystem.shard.cpp"}),`, are the reference implementation for I/O APIs in
ShardScript. They demonstrate how to expose stream interfaces, implement `,e.jsx(t,{children:"MemoryStream"})," ",`
over a managed byte array, wrap a native `,e.jsx(t,{children:"std::fstream*"})," handle in"," ",`
`,e.jsx(t,{children:"FileStream"}),", and integrate cancellation tokens with async operations. The"," ",`
`,e.jsx(t,{children:"streams.shard.cpp"})," library registers the ",e.jsx(t,{children:"io"}),` namespace with the
`,e.jsx(t,{children:"IStream"}),", ",e.jsx(t,{children:"IReadableStream"}),", and"," ",`
`,e.jsx(t,{children:"IWritableStream"})," interfaces, a concrete ",e.jsx(t,{children:"MemoryStream"}),` class, and
helper types such as `,e.jsx(t,{children:"StreamReader"}),", ",e.jsx(t,{children:"StreamWriter"}),","," ",`
`,e.jsx(t,{children:"BinaryReader"}),", and ",e.jsx(t,{children:"BinaryWriter"}),". The"," ",`
`,e.jsx(t,{children:"filesystem.shard.cpp"})," library registers the ",e.jsx(t,{children:"filesystem"}),` namespace
with file and directory APIs, plus a `,e.jsx(t,{children:"FileStream"}),` implementation that stores a native C++
stream pointer as `,e.jsx(t,{children:"nint"}),` and performs asynchronous reads and writes through the runtime
event loop.`]})}),`
`,e.jsx(s,{children:"Syntax"}),`
`,e.jsx(a,{children:e.jsxs(r.p,{children:["Every native library is a normal shared library that exports two C-linkage symbols. The"," ",`
`,e.jsx(t,{children:"SHARDLIB_GETMETADATA"})," and ",e.jsx(t,{children:"SHARDLIB_ENTRYPOINT"}),` macros produce
those exports and receive the runtime registration context. A library can consist of one source file or many,
can live inside `,e.jsx(t,{children:"ShardScript.Framework"}),` or in a separate project, and links against the
ShardScript runtime shared library using headers from `,e.jsx(t,{children:"ShardScript/include"}),"."]})}),`
`,e.jsx(l,{code:`#include <ShardScript.hpp>

using namespace shard;

SHARDLIB_GETMETADATA
{
  lib.Name = L"shard.mylibrary";
  lib.Description = L"Description of the library";
  lib.Version = L"1.0.0";

  static const shard::ShardLibDependencyInfo deps[] =
  {
      { L"shard.streams", L"0.1.0" }
  };

  lib.Dependencies = deps;
  lib.DependenciesLength = sizeof(deps) / sizeof(deps[0]);
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> ns(context, L"mynamespace");

  SymbolBuilder<InterfaceSymbol> iface = ns.AddInterface(L"IMyStream");
  iface.Implements(TRAIT_DISPOSABLE);

  SymbolBuilder<MethodSymbol> readMethod = iface.AddMethod(L"Read", TYPE_INT, LINK_INSTANCE);
  readMethod.Get()->IsAbstract = true;
  readMethod
      .AddParameter(L"buffer", TYPE_BYTE.Array())
      .AddParameter(L"offset", TYPE_INT)
      .AddParameter(L"count", TYPE_INT);
}`,language:"cpp",filename:"mylibrary.shard.cpp"}),`
`,e.jsx(s,{children:"Parameters / Arguments"}),`
`,e.jsx(a,{children:e.jsx(r.p,{children:"The stream and file APIs accept the same categories of arguments across both libraries."})}),`
`,e.jsx(c,{headers:["Parameter","Type","Description"],rows:[[e.jsx(t,{children:"buffer"}),e.jsx(t,{children:"byte[]"}),"Destination or source array for raw byte data."],[e.jsx(t,{children:"offset"}),e.jsx(t,{children:"int"}),"Zero-based index into <InlineCode>buffer</InlineCode> where the operation starts."],[e.jsx(t,{children:"count"}),e.jsx(t,{children:"int"}),"Number of bytes to read or write."],[e.jsx(t,{children:"origin"}),e.jsx(t,{children:"io.SeekOrigin"}),"Origin for a seek operation: Begin, Current, or End."],[e.jsx(t,{children:"cancellationToken"}),e.jsx(t,{children:"async.CancellationToken"}),"Optional token that can mark the operation as canceled."],[e.jsx(t,{children:"path"}),e.jsx(t,{children:"string"}),"File or directory path passed to filesystem APIs."],[e.jsx(t,{children:"mode"}),e.jsx(t,{children:"filesystem.FileMode"}),"File creation and open behavior."],[e.jsx(t,{children:"access"}),e.jsx(t,{children:"filesystem.FileAccess"}),"Read, write, or read-write access."]]}),`
`,e.jsx(s,{children:"Returns"}),`
`,e.jsx(a,{children:e.jsx(r.p,{children:"Return values follow the .NET-style stream contract so ShardScript code can consume them predictably."})}),`
`,e.jsx(c,{headers:["Member / Call","Return type","Description"],rows:[[e.jsx(t,{children:"Stream.Read"}),e.jsx(t,{children:"int"}),"Number of bytes copied into <InlineCode>buffer</InlineCode>. Zero means end of stream."],[e.jsx(t,{children:"Stream.ReadAsync"}),e.jsx(t,{children:"async.ValueTask<int>"}),"Asynchronous version of <InlineCode>Read</InlineCode>."],[e.jsx(t,{children:"Stream.Write"}),e.jsx(t,{children:"void"}),"Writes bytes and advances the position."],[e.jsx(t,{children:"Stream.WriteAsync"}),e.jsx(t,{children:"async.Task"}),"Asynchronous version of <InlineCode>Write</InlineCode>."],[e.jsx(t,{children:"Stream.FlushAsync"}),e.jsx(t,{children:"async.Task"}),"Asynchronous flush."],[e.jsx(t,{children:"Stream.Seek"}),e.jsx(t,{children:"int"}),"New position after seeking."],[e.jsx(t,{children:"File.ReadAllText"}),e.jsx(t,{children:"string"}),"Full contents of a text file."],[e.jsx(t,{children:"File.ReadAllTextAsync"}),e.jsx(t,{children:"async.ValueTask<string>"}),"Asynchronous text-file read."]]}),`
`,e.jsx(s,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Closed stream access"})," — methods throw"," ",`
`,e.jsx(t,{children:"std::runtime_error"})," when the underlying stream is closed or disposed."]})}),e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Invalid native handle"})," — operations on a ",e.jsx(t,{children:"FileStream"})," ",`
with a null or freed `,e.jsx(t,{children:"std::fstream*"})," handle raise a runtime error."]})}),e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Negative offsets or counts"}),` — argument validation rejects negative
values for `,e.jsx(t,{children:"offset"}),", ",e.jsx(t,{children:"count"}),", ",e.jsx(t,{children:"capacity"}),", or"," ",`
`,e.jsx(t,{children:"length"}),"."]})}),e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Cancellation"}),` — when a cancellation token is already flagged before the
operation starts, the returned task is faulted with an `,e.jsx(t,{children:"Operation canceled"})," exception."]})}),e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"File-system failures"}),` — missing files, permission errors, and copy/move
failures are surfaced as runtime errors.`]})})]}),`
`,e.jsx(s,{children:"Remarks"}),`
`,e.jsx(o,{tone:"blue",title:"Native library shape",children:e.jsxs(r.p,{children:["A ShardScript native library is any shared library (",e.jsx(t,{children:".dll"})," on Windows, ",e.jsx(t,{children:".so"})," on Linux, ",e.jsx(t,{children:".dylib"})," on macOS) that exports the two C-linkage symbols ",e.jsx(t,{children:"ShardLib_GetMetadata"})," and ",e.jsx(t,{children:"ShardLib_EntryPoint"}),". It can be built from one or many C++ source files, live inside ",e.jsx(t,{children:"ShardScript.Framework"})," or in a completely separate project, and links against the ShardScript runtime shared library using headers from ",e.jsx(t,{children:"ShardScript/include"}),". For the full registration contract, see ",e.jsx(t,{children:"native-library-overview.mdx"}),"."]})}),`
`,e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Interface-based design."}),` The stream library defines capability through interfaces rather than a
single base class. `,e.jsx(t,{children:"IStream"})," extends ",e.jsx(t,{children:"IDisposable"})," and declares"," ",`
`,e.jsx(t,{children:"Dispose()"}),". ",e.jsx(t,{children:"IReadableStream"})," adds ",e.jsx(t,{children:"Read"})," and"," ",`
`,e.jsx(t,{children:"ReadAsync"}),". ",e.jsx(t,{children:"IWritableStream"})," adds ",e.jsx(t,{children:"Write"}),","," ",`
`,e.jsx(t,{children:"WriteAsync"}),", ",e.jsx(t,{children:"Flush"}),", and ",e.jsx(t,{children:"FlushAsync"}),`. Both
overloads of each async method are registered: one without a cancellation token and one with a token. Concrete types
such as `,e.jsx(t,{children:"MemoryStream"})," and ",e.jsx(t,{children:"FileStream"}),` implement the interfaces they
support.`]})}),`
`,e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"MemoryStream buffer layout."})," ",e.jsx(t,{children:"MemoryStream"})," stores its data in a private"," ",`
`,e.jsx(t,{children:"byte[]"})," field and tracks ",e.jsx(t,{children:"_position"}),", ",e.jsx(t,{children:"_length"}),`,
and `,e.jsx(t,{children:"_capacity"}),` as separate integer fields. The implementation mirrors a typical managed
stream: reads are bounded by length, writes grow the buffer when capacity is exceeded, and a buffer created from an
external array is marked non-writable.`]})}),`
`,e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Native handles."})," ",e.jsx(t,{children:"FileStream"})," keeps a ",e.jsx(t,{children:"std::fstream*"})," ",`
in a private `,e.jsx(t,{children:"nint"})," field. The pointer is allocated with ",e.jsx(t,{children:"new"}),` when the
file opens and deleted when the stream is closed or disposed. Because the GC does not manage the C++ object, the
handle is stored with `,e.jsx(t,{children:"Collector.FromNint(file, false)"}),` so the runtime knows the library owns
the lifetime.`]})}),`
`,e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Async helpers."})," The stream library uses ",e.jsx(t,{children:"shard::DoAsync"})," and"," ",`
`,e.jsx(t,{children:"shard::DoValueTask<T>"})," to produce ",e.jsx(t,{children:"async.Task"})," and"," ",`
`,e.jsx(t,{children:"async.ValueTask<T>"})," instances. ",e.jsx(t,{children:"MemoryStream"}),` operations are
synchronous in nature, so its async callbacks perform the work immediately and return a completed value task. The
filesystem library moves blocking file work to the thread pool with `,e.jsx(t,{children:"RunOnThreadPool"}),` and
completes the task back on the event-loop thread.`]})}),`
`,e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Cancellation token inspection."}),` Cancellation is cooperative. Before starting work, callbacks inspect
the token by reading `,e.jsx(t,{children:"_source._canceled"})," from the ",e.jsx(t,{children:"CancellationToken"}),`
instance. If cancellation is requested, the callback returns a faulted task rather than beginning the operation. For
operations that run on the thread pool, cancellation is checked both before dispatch and again on the event-loop
callback before completion.`]})}),`
`,e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Cross-library symbol lookups."})," ",e.jsx(t,{children:"filesystem.shard.cpp"}),` depends on types defined
in `,e.jsx(t,{children:"streams.shard.cpp"})," such as ",e.jsx(t,{children:"io.IReadableStream"}),`. It looks up those
symbols lazily inside an `,e.jsx(t,{children:"EnsureStreamSymbols"}),` helper instead of caching pointers during static
initialization, because load order between libraries is not guaranteed.`]})}),`
`,e.jsx(s,{children:"Examples"}),`
`,e.jsx(a,{children:e.jsx(r.p,{children:`The following snippets are adapted from the framework sources. They show the registration patterns and callback
implementation details that bring the stream and file APIs together.`})}),`
`,e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Declare a dependency."})," ",e.jsx(t,{children:"filesystem.shard.cpp"})," declares"," ",`
`,e.jsx(t,{children:"shard.streams"})," so the loader guarantees it is available before the entry point runs."]})}),`
`,e.jsx(l,{code:`SHARDLIB_GETMETADATA
{
  lib.Name = L"shard.io";
  lib.Description = L"Native implementation of filesystem methods";
  lib.Version = L"0.2.0";

  static const shard::ShardLibDependencyInfo deps[] =
  {
      { L"shard.streams", L"0.1.0" }
  };

  lib.Dependencies = deps;
  lib.DependenciesLength = sizeof(deps) / sizeof(deps[0]);
}`,language:"cpp",filename:"filesystem.shard.cpp"}),`
`,e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Register stream interfaces."})," Interfaces are declared abstract, marked as implementing"," ",`
`,e.jsx(t,{children:"IDisposable"}),", and exposed globally so other libraries can implement them."]})}),`
`,e.jsx(l,{code:`SymbolFactory factory(context.GetSemanticModel().Table.get());
TypeSymbol* byteArrayType = factory.Array(TYPE_BYTE);

GenericTypeSymbol* valueTaskOfInt = factory.GenericType(
  CLASS_VALUETASK,
  { { L"T", TYPE_INT } });

SymbolBuilder<NamespaceSymbol> ioNamespace(context, L"io");

SymbolBuilder<InterfaceSymbol> streamInterface = ioNamespace.AddInterface(L"IStream");
streamInterface.Implements(TRAIT_DISPOSABLE);

SymbolBuilder<MethodSymbol> disposeMethod = streamInterface.AddMethod(L"Dispose", TYPE_VOID, LINK_INSTANCE);
disposeMethod.Get()->IsAbstract = true;
streamInterface.DeclareGlobal();

SymbolBuilder<InterfaceSymbol> readableInterface = ioNamespace.AddInterface(L"IReadableStream");
readableInterface.Implements(g_IStream);

SymbolBuilder<MethodSymbol> readMethod = readableInterface.AddMethod(L"Read", TYPE_INT, LINK_INSTANCE);
readMethod.Get()->IsAbstract = true;
readMethod
  .AddParameter(L"buffer", byteArrayType)
  .AddParameter(L"offset", TYPE_INT)
  .AddParameter(L"count", TYPE_INT);

SymbolBuilder<MethodSymbol> readAsyncMethod = readableInterface.AddMethod(L"ReadAsync", valueTaskOfInt, LINK_INSTANCE);
readAsyncMethod.Get()->IsAbstract = true;
readAsyncMethod
  .AddParameter(L"buffer", byteArrayType)
  .AddParameter(L"offset", TYPE_INT)
  .AddParameter(L"count", TYPE_INT);

readableInterface.DeclareGlobal();`,language:"cpp",filename:"streams.shard.cpp"}),`
`,e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Register MemoryStream."}),` The class implements both readable and writable interfaces, exposes multiple
constructors, and registers both cancellation-aware and cancellation-free async overloads.`]})}),`
`,e.jsx(l,{code:`SymbolBuilder<ClassSymbol> memoryStreamClass = ioNamespace.AddClass(L"MemoryStream");
g_MemoryStream = memoryStreamClass;
memoryStreamClass.Implements(g_IReadableStream);
memoryStreamClass.Implements(g_IWritableStream);
memoryStreamClass.Implements(TRAIT_DISPOSABLE);

g_MemoryStream_Buffer = memoryStreamClass
  .AddField(L"_buffer", byteArrayType, LINK_INSTANCE, ACS_PRIVATE);

g_MemoryStream_Position = memoryStreamClass
  .AddField(L"_position", TYPE_INT, LINK_INSTANCE, ACS_PRIVATE);

g_MemoryStream_Length = memoryStreamClass
  .AddField(L"_length", TYPE_INT, LINK_INSTANCE, ACS_PRIVATE);

g_MemoryStream_Capacity = memoryStreamClass
  .AddField(L"_capacity", TYPE_INT, LINK_INSTANCE, ACS_PRIVATE);

g_MemoryStream_Writable = memoryStreamClass
  .AddField(L"_writable", TYPE_BOOL, LINK_INSTANCE, ACS_PRIVATE);

g_MemoryStream_IsOpen = memoryStreamClass
  .AddField(L"_isOpen", TYPE_BOOL, LINK_INSTANCE, ACS_PRIVATE);

memoryStreamClass.AddInit()
  .SetCallback(&shard_memoryStream_InitDefault);

memoryStreamClass.AddInit()
  .AddParameter(L"buffer", byteArrayType)
  .SetCallback(&shard_memoryStream_InitWithBuffer);

memoryStreamClass.AddMethod(L"Read", TYPE_INT, LINK_INSTANCE)
  .AddParameter(L"buffer", byteArrayType)
  .AddParameter(L"offset", TYPE_INT)
  .AddParameter(L"count", TYPE_INT)
  .SetCallback(&shard_memoryStream_Read);

memoryStreamClass.AddMethod(L"ReadAsync", valueTaskOfInt, LINK_INSTANCE)
  .AddParameter(L"buffer", byteArrayType)
  .AddParameter(L"offset", TYPE_INT)
  .AddParameter(L"count", TYPE_INT)
  .AddParameter(L"cancellationToken", g_CancellationToken)
  .SetCallback(&shard_memoryStream_ReadAsync_Cancel);

memoryStreamClass.AddMethod(L"WriteAsync", CLASS_TASK, LINK_INSTANCE)
  .AddParameter(L"buffer", byteArrayType)
  .AddParameter(L"offset", TYPE_INT)
  .AddParameter(L"count", TYPE_INT)
  .AddParameter(L"cancellationToken", g_CancellationToken)
  .SetCallback(&shard_memoryStream_WriteAsync_Cancel);

memoryStreamClass.DeclareGlobal();`,language:"cpp",filename:"streams.shard.cpp"}),`
`,e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Wrap and release a native handle."})," A ",e.jsx(t,{children:"FileStream"})," opens a"," ",`
`,e.jsx(t,{children:"std::fstream"}),", stores the pointer in a managed ",e.jsx(t,{children:"nint"}),` field, and
deletes it on close.`]})}),`
`,e.jsx(l,{code:`static std::fstream* GetFileHandle(ObjectInstance* instance)
{
  ObjectInstance* handle = instance->GetField(g_FileStream_Handle->SlotIndex);
  if (handle == nullptr || handle == GarbageCollector::NullInstance)
      return nullptr;

  return static_cast<std::fstream*>(handle->AsNint());
}

static void CloseFileHandle(ObjectInstance* instance, GarbageCollector& gc)
{
  ObjectInstance* handle = instance->GetField(g_FileStream_Handle->SlotIndex);
  if (handle != nullptr && handle != GarbageCollector::NullInstance)
  {
      void* ptr = handle->AsNint();
      if (ptr != nullptr)
          delete static_cast<std::fstream*>(ptr);
  }

  instance->SetField(g_FileStream_Handle->SlotIndex, gc.FromNint(nullptr, false));
  instance->SetField(g_FileStream_IsOpen->SlotIndex, gc.FromValue(false));
  instance->SetField(g_FileStream_CanRead->SlotIndex, gc.FromValue(false));
  instance->SetField(g_FileStream_CanWrite->SlotIndex, gc.FromValue(false));
}`,language:"cpp",filename:"filesystem.shard.cpp"}),`
`,e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Implement an async read with cancellation."})," The callback pins the instance and buffer with"," ",`
`,e.jsx(t,{children:"ObjectRef"}),`, performs blocking work on the thread pool, then completes or faults the value
task on the event-loop thread.`]})}),`
`,e.jsx(l,{code:`static ObjectInstance* shard_fileStream_ReadAsync_Impl(const CallState& context, ObjectInstance* token)
{
  if (IsStreamCancellationRequested(token))
  {
      ObjectInstance* task = context.Collector.AllocateGeneric(
          CLASS_VALUETASK,
          std::vector<TypeSymbol*>{ TYPE_INT });

      task->IsTaskLike = true;
      SetTaskState(task, CLASS_VALUETASK_StateField, AsyncState::FAULTED, context.Collector);
      task->SetField(
          CLASS_VALUETASK_ExceptionField->SlotIndex,
          shard::CreateRuntimeException(context.Collector, L"Operation canceled."));
      return task;
  }

  ObjectInstance* instance = context.Args[0];
  ObjectInstance* buffer = context.Args[1];
  std::int64_t offset = context.Args[2]->AsInteger();
  std::int64_t count = context.Args[3]->AsInteger();

  struct State
  {
      ObjectRef InstanceRef;
      ObjectRef BufferRef;
      ObjectInstance* Token = nullptr;
      std::int64_t Offset = 0;
      std::int64_t Count = 0;
      std::int64_t Result = 0;
      bool Canceled = false;
  };

  std::shared_ptr<State> state = std::make_shared<State>();
  state->InstanceRef = ObjectRef(instance);
  state->BufferRef = ObjectRef(buffer);
  state->Token = token;
  state->Offset = offset;
  state->Count = count;

  return shard::DoValueTask<std::int64_t>(context, [state](shard::AsyncValueScope<std::int64_t> async)
  {
      shard::GarbageCollector* collector = &async.Collector();

      async.RunOnThreadPool(
          [state, collector]()
          {
              if (IsStreamCancellationRequested(state->Token))
              {
                  state->Canceled = true;
                  return;
              }

              std::fstream* file = GetFileHandle(state->InstanceRef.Instance);
              if (file == nullptr)
              {
                  state->Canceled = true;
                  return;
              }

              std::vector<char> temp(static_cast<std::size_t>(state->Count));
              file->read(temp.data(), static_cast<std::streamsize>(state->Count));
              state->Result = static_cast<std::int64_t>(file->gcount());

              for (std::int64_t i = 0; i < state->Result; ++i)
              {
                  state->BufferRef.Instance->SetElement(
                      static_cast<std::size_t>(state->Offset + i),
                      collector->FromValue(static_cast<std::uint8_t>(temp[static_cast<std::size_t>(i)])));
              }
          },
          [stateScope = async.ShareState(), state]() mutable
          {
              shard::AsyncValueScope<std::int64_t> async(stateScope);

              if (state->Canceled || IsStreamCancellationRequested(state->Token))
              {
                  async.Fail(L"Operation canceled.");
                  return;
              }

              async.Complete(state->Result);
          });
  });
}`,language:"cpp",filename:"filesystem.shard.cpp"}),`
`,e.jsx(a,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Consume the APIs from ShardScript."}),` The same stream abstractions work whether the backing store is
memory or a file on disk.`]})}),`
`,e.jsx(l,{code:`using stdio;
using io;
using filesystem;

namespace demo;

public static async func Main() -> void
{
  // Write and read back from memory.
  using (stream: MemoryStream = new MemoryStream())
  {
      writer: StreamWriter = new StreamWriter(stream);
      writer.WriteLine("hello");
      writer.Flush();

      stream.Position = 0;
      reader: StreamReader = new StreamReader(stream);
      text: string = reader.ReadToEnd();
      println(text);
  }

  // Copy a file asynchronously.
  source: string = "input.txt";
  dest: string = "output.txt";
  await File.WriteAllTextAsync(source, "async content");
  content: string = await File.ReadAllTextAsync(source);
  println(content);
}`,language:"csharp",filename:"app.shard"}),`
`,e.jsx(s,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx(t,{children:"library-building/async-await-native"})," — async/await in native libraries."]})}),e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx(t,{children:"library-building/async-helpers-reference"})," — async helper reference."]})}),e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx(t,{children:"library-building/example-generic-collections"})," — another framework library example."]})})]}),`
`,e.jsx(s,{children:"Source"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx(t,{children:"ShardScript.Framework/system/streams.shard.cpp"}),": ",e.jsx(t,{children:"https://github.com/Rikitav/ShardScript/blob/main/ShardScript.Framework/system/streams.shard.cpp"})]})}),e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx(t,{children:"ShardScript.Framework/system/filesystem.shard.cpp"}),": ",e.jsx(t,{children:"https://github.com/Rikitav/ShardScript/blob/main/ShardScript.Framework/system/filesystem.shard.cpp"})]})})]})]})}function p(i={}){const{wrapper:r}=i.components||{};return r?e.jsx(r,{...i,children:e.jsx(h,{...i})}):h(i)}function d(i,r){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
