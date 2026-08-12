import{j as e}from"./index-DbX8E4-q.js";function h(l){const t={p:"p",...l.components},{Bullet:i,Callout:d,CodeBlock:a,DocsTable:o,H2:c,InlineCode:n,Prose:r}=t;return i||s("Bullet"),d||s("Callout"),a||s("CodeBlock"),o||s("DocsTable"),c||s("H2"),n||s("InlineCode"),r||s("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(r,{children:e.jsxs(t.p,{children:[`This tutorial builds a complete native library that wraps a small C++ class inside a
ShardScript type. You will allocate the C++ object from native code, store its pointer in a
private `,e.jsx(n,{children:"nint"}),` field, expose methods and a property, implement
`,e.jsx(n,{children:"IDisposable"}),", and use ",e.jsx(n,{children:"ObjectRef"}),` to keep the
wrapper alive across an async boundary.`]})}),`
`,e.jsx(c,{children:"Prerequisites"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsx(t.p,{children:"A C++20 toolchain and CMake 3.20 or later."})}),e.jsx(i,{children:e.jsxs(t.p,{children:["A built ShardScript runtime shared library and the headers in"," ",`
`,e.jsx(n,{children:"ShardScript/include"}),"."]})}),e.jsx(i,{children:e.jsxs(t.p,{children:["The ",e.jsx(n,{children:"shard"}),` interpreter available on your PATH or next to your build
output.`]})}),e.jsx(i,{children:e.jsxs(t.p,{children:["Familiarity with the callback contract described in"," ",`
`,e.jsx(n,{children:"library-building/native-library-overview"}),"."]})})]}),`
`,e.jsx(c,{children:"Scenario"}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:["You have a C++ class named ",e.jsx(n,{children:"CounterEngine"}),` that holds an integer value and
can increment or reset it. You want to expose it to ShardScript as `,e.jsx(n,{children:"nativecounter.Counter"}),`
so managed code can create instances, read the current value, increment synchronously or after a
delay, and deterministically release the native heap allocation through`," ",`
`,e.jsx(n,{children:"IDisposable"}),"."]})}),`
`,e.jsx(c,{children:"Step-by-Step Instructions"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"1. Create the project directory."})}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:["Make a new directory outside the ShardScript repository. This tutorial uses"," ",`
`,e.jsx(n,{children:"my-native-wrapper/"})," next to the ShardScript checkout."]})}),`
`,e.jsx(a,{code:`mkdir my-native-wrapper
cd my-native-wrapper`,language:"bash"}),`
`,e.jsx(o,{headers:["Path","Purpose"],rows:[["my-native-wrapper/CMakeLists.txt","Build script for the shared library."],["my-native-wrapper/counter.h","Header for the C++ class being wrapped."],["my-native-wrapper/counter.cpp","Implementation of the C++ class."],["my-native-wrapper/library.cpp","ShardScript metadata, symbol registration, and callbacks."],["my-native-wrapper/app.shard","ShardScript program that exercises the wrapper."]]}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"2. Write the C++ class to wrap."})}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:["Create ",e.jsx(n,{children:"counter.h"})," and ",e.jsx(n,{children:"counter.cpp"}),`. The class is
plain C++ with no ShardScript dependencies; the wrapper will own its lifetime.`]})}),`
`,e.jsx(a,{code:`#pragma once

#include <cstdint>

class CounterEngine
{
public:
  explicit CounterEngine(std::int64_t initialValue);

  void Increment();
  void Reset();
  std::int64_t GetValue() const;

private:
  std::int64_t _value;
};`,language:"cpp",filename:"counter.h"}),`
`,e.jsx(a,{code:`#include "counter.h"

CounterEngine::CounterEngine(std::int64_t initialValue)
  : _value(initialValue)
{
}

void CounterEngine::Increment()
{
  _value = _value + 1;
}

void CounterEngine::Reset()
{
  _value = 0;
}

std::int64_t CounterEngine::GetValue() const
{
  return _value;
}`,language:"cpp",filename:"counter.cpp"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"3. Register the library and the wrapper type."})}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:["Create ",e.jsx(n,{children:"library.cpp"}),`. Include the ShardScript authoring headers, the async
helper, and your class header. Use `,e.jsx(n,{children:"SHARDLIB_GETMETADATA"}),` to identify the
library and `,e.jsx(n,{children:"SHARDLIB_ENTRYPOINT"}),` to register the namespace, class, field,
methods, property, and the async method.`]})}),`
`,e.jsx(a,{code:`#include <ShardScript.hpp>
#include <shard/runtime/MethodCallState.hpp>
#include <shard/runtime/NativeAsync.hpp>
#include <shard/runtime/ObjectInstance.hpp>
#include <shard/semantic/SymbolBuilder.hpp>
#include <shard/semantic/SymbolFactory.hpp>

#include "counter.h"

#include <cstdint>
#include <memory>

using namespace shard;

static FieldSymbol* s_handleField = nullptr;

static CounterEngine* GetCounterEngine(ObjectInstance* self)
{
  ObjectInstance* handleObj = self->GetField(s_handleField->SlotIndex);

  if (handleObj == nullptr || handleObj == GarbageCollector::NullInstance)
  {
      return nullptr;
  }

  return reinterpret_cast<CounterEngine*>(handleObj->AsNint());
}

static ObjectInstance* Counter_IncrementAfterDelay(const CallState& context) noexcept
{
  ObjectInstance* self = context.Args[0];
  std::int64_t milliseconds = context.Args[1]->AsInteger();

  CounterEngine* engine = GetCounterEngine(self);
  if (engine == nullptr)
  {
      return shard::FaultedTask(context, L"Counter has already been disposed.");
  }

  struct AsyncState
  {
      ObjectRef InstanceRef;
      CounterEngine* Engine = nullptr;
      std::int64_t Milliseconds = 0;
  };

  std::shared_ptr<AsyncState> state = std::make_shared<AsyncState>();
  state->InstanceRef = ObjectRef(self);
  state->Engine = engine;
  state->Milliseconds = milliseconds;

  return shard::DoValueTask<std::int64_t>(context, [state](shard::AsyncValueScope<std::int64_t> async) mutable
  {
      async.Delay(static_cast<std::uint32_t>(state->Milliseconds), [async, state]() mutable
      {
          state->Engine->Increment();
          async.Complete(state->Engine->GetValue());
      });
  });
}

SHARDLIB_GETMETADATA
{
  lib.Name        = L"shard.nativecounter";
  lib.Description = L"Tutorial wrapper around a C++ CounterEngine class";
  lib.Version     = L"1.0.0";
}

SHARDLIB_ENTRYPOINT
{
  SymbolFactory factory(context.GetSemanticModel().Table.get());
  GenericTypeSymbol* valueTaskOfInt = factory.GenericType(CLASS_VALUETASK, { { L"T", TYPE_INT } });

  SymbolBuilder<NamespaceSymbol> ns(context, L"nativecounter");

  ns.AddClass(L"Counter", ACS_PUBLIC, LINK_INSTANCE, [valueTaskOfInt](SymbolBuilder<ClassSymbol> cls)
  {
      cls.Implements(TRAIT_DISPOSABLE);

      s_handleField = cls.AddField(L"_handle", TYPE_NINT, LINK_INSTANCE, ACS_PRIVATE);

      cls.AddInit()
          .AddParameter(L"initialValue", TYPE_INT)
          .SetCallback([](const CallState& context)
          {
              ObjectInstance* self = context.Args[0];
              std::int64_t initialValue = context.Args[1]->AsInteger();

              CounterEngine* engine = new CounterEngine(initialValue);
              self->SetField(s_handleField->SlotIndex, context.Collector.FromNint(engine, false));

              return self;
          });

      cls.AddMethod(L"Increment", TYPE_VOID, LINK_INSTANCE)
          .SetCallback([](const CallState& context)
          {
              ObjectInstance* self = context.Args[0];
              CounterEngine* engine = GetCounterEngine(self);

              if (engine != nullptr)
              {
                  engine->Increment();
              }

              return nullptr;
          });

      cls.AddMethod(L"Reset", TYPE_VOID, LINK_INSTANCE)
          .SetCallback([](const CallState& context)
          {
              ObjectInstance* self = context.Args[0];
              CounterEngine* engine = GetCounterEngine(self);

              if (engine != nullptr)
              {
                  engine->Reset();
              }

              return nullptr;
          });

      cls.AddProperty(L"Value", TYPE_INT, LINK_INSTANCE, ACS_PUBLIC)
          .AddGetter()
          .SetCallback([](const CallState& context)
          {
              ObjectInstance* self = context.Args[0];
              CounterEngine* engine = GetCounterEngine(self);

              if (engine == nullptr)
              {
                  return context.Collector.FromValue(0);
              }

              return context.Collector.FromValue(engine->GetValue());
          });

      cls.AddMethod(L"Dispose", TYPE_VOID, LINK_INSTANCE)
          .SetCallback([](const CallState& context)
          {
              ObjectInstance* self = context.Args[0];
              ObjectInstance* handleObj = self->GetField(s_handleField->SlotIndex);

              if (handleObj == nullptr || handleObj == GarbageCollector::NullInstance)
              {
                  return nullptr;
              }

              CounterEngine* engine = reinterpret_cast<CounterEngine*>(handleObj->AsNint());
              if (engine != nullptr)
              {
                  delete engine;
                  self->SetField(s_handleField->SlotIndex, context.Collector.FromNint(nullptr, true));
              }

              return nullptr;
          })
          .IsImplementationOf(TRAIT_DISPOSABLE_Dispose);

      cls.AddMethod(L"IncrementAfterDelay", valueTaskOfInt, LINK_INSTANCE)
          .AddParameter(L"milliseconds", TYPE_INT)
          .SetCallback(&Counter_IncrementAfterDelay);
  });
}`,language:"cpp",filename:"library.cpp"}),`
`,e.jsx(d,{tone:"blue",title:"Why ObjectRef is needed",children:e.jsxs(t.p,{children:[`The asynchronous callback runs later on the event-loop thread, after the synchronous method has
returned. Without `,e.jsx(n,{children:"ObjectRef"}),", the managed ",e.jsx(n,{children:"Counter"}),`
instance could be collected before the delay fires. `,e.jsx(n,{children:"ObjectRef"}),` pins the
object until the shared state is destroyed.`]})}),`
`,e.jsx(d,{tone:"amber",title:"Production lifetime note",children:e.jsx(t.p,{children:`This example reads the native handle once before starting the async work and keeps that raw
pointer in the shared state. In production code you should also synchronize disposal with pending
async operations, for example by reference-counting the native object or by checking a disposal
flag under a lock inside the delayed callback.`})}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"4. Add the CMake build script."})}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:[`The target is a normal shared library. Point it at the ShardScript include directory and link the
ShardScript runtime library. Adjust `,e.jsx(n,{children:"SHARDSCRIPT_ROOT"}),` to match your
checkout or install prefix.`]})}),`
`,e.jsx(a,{code:`cmake_minimum_required(VERSION 3.20)
project(NativeCounter CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

set(SHARDSCRIPT_ROOT "\${CMAKE_CURRENT_SOURCE_DIR}/../ShardScript"
  CACHE PATH "Root of the ShardScript repository or install prefix")

find_library(SHARDSCRIPT_LIB
  NAMES ShardScript libShardScript
  PATHS
      "\${SHARDSCRIPT_ROOT}/build/bin"
      "\${SHARDSCRIPT_ROOT}/build/bin/Release"
      "\${SHARDSCRIPT_ROOT}/lib"
  NO_DEFAULT_PATH
  REQUIRED
)

add_library(native_counter SHARED
  counter.cpp
  library.cpp
)

set_target_properties(native_counter PROPERTIES
  WINDOWS_EXPORT_ALL_SYMBOLS ON
)

target_include_directories(native_counter PRIVATE "\${SHARDSCRIPT_ROOT}/ShardScript/include")
target_link_libraries(native_counter PRIVATE \${SHARDSCRIPT_LIB})`,language:"cmake",filename:"CMakeLists.txt"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"5. Build the shared library."})}),`
`,e.jsx(a,{code:`cmake -S . -B build -G Ninja -DCMAKE_BUILD_TYPE=Release
cmake --build build --parallel`,language:"bash"}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:["The build emits a platform-specific shared library in ",e.jsx(n,{children:"build/"}),":"]})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsxs(t.p,{children:["Windows: ",e.jsx(n,{children:"build/native_counter.dll"})]})}),e.jsx(i,{children:e.jsxs(t.p,{children:["Linux: ",e.jsx(n,{children:"build/libnative_counter.so"})]})}),e.jsx(i,{children:e.jsxs(t.p,{children:["macOS: ",e.jsx(n,{children:"build/libnative_counter.dylib"})]})})]}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"6. Write a ShardScript program that uses the wrapper."})}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:["Create ",e.jsx(n,{children:"app.shard"}),". Use a resource ",e.jsx(n,{children:"defer"}),` to ensure
`,e.jsx(n,{children:"Dispose()"}),` runs when the variable goes out of scope, even if an exception
is thrown.`]})}),`
`,e.jsx(a,{code:`using stdio;
using async;
using nativecounter;

namespace demo;

public static func Main() -> void
{
  defer counter: Counter = new Counter(5);

  println("initial: " + counter.Value);

  counter.Increment();
  counter.Increment();
  println("after increments: " + counter.Value);

  counter.Reset();
  println("after reset: " + counter.Value);

  delayed: ValueTask<int> = counter.IncrementAfterDelay(50);
  ValueTask.Wait(delayed);
  println("after delayed increment: " + delayed.Result);

  println("final value: " + counter.Value);
}`,language:"csharp",filename:"app.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"7. Run the program."})}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:["Load the library with the ",e.jsx(n,{children:"-l"}),` flag and pass the path to the shared library
you just built.`]})}),`
`,e.jsx(a,{code:`# Windows
shard app.shard -l build/native_counter.dll

# Linux
shard app.shard -l build/libnative_counter.so

# macOS
shard app.shard -l build/libnative_counter.dylib`,language:"bash"}),`
`,e.jsx(c,{children:"Expected Output"}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:[`The program creates the counter, exercises synchronous methods, awaits one delayed increment, and
prints the values in order. The resource defer guarantees `,e.jsx(n,{children:"Dispose()"}),` runs
at scope exit, releasing the native `,e.jsx(n,{children:"CounterEngine"})," allocation."]})}),`
`,e.jsx(a,{code:`initial: 5
after increments: 7
after reset: 0
after delayed increment: 1
final value: 1`,language:"text"}),`
`,e.jsx(d,{tone:"green",title:"Success criteria",children:e.jsxs(t.p,{children:[`If you see the sequence above, the library compiled, the runtime resolved the two exported
symbols, the `,e.jsx(n,{children:"_handle"}),` field stored the native pointer, and the async
callback kept the wrapper alive long enough to complete.`]})}),`
`,e.jsx(c,{children:"What's next?"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsxs(t.p,{children:["Add a setter to the ",e.jsx(n,{children:"Value"})," property by calling"," ",`
`,e.jsx(n,{children:"AddSetter()"})," on the property symbol."]})}),e.jsx(i,{children:e.jsx(t.p,{children:`Replace the raw pointer with a reference-counted native object so disposal is safe while async
callbacks are pending.`})}),e.jsx(i,{children:e.jsxs(t.p,{children:["Add cancellation support by accepting a ",e.jsx(n,{children:"CancellationToken"})," in"," ",`
`,e.jsx(n,{children:"IncrementAfterDelay"})," and checking it inside the delayed callback."]})}),e.jsx(i,{children:e.jsxs(t.p,{children:["Study ",e.jsx(n,{children:"system/socket.shard.cpp"})," and"," ",`
`,e.jsx(n,{children:"system/filesystem.shard.cpp"})," for larger examples of"," ",`
`,e.jsx(n,{children:"ObjectRef"}),", async I/O, and cross-library symbol lookups."]})}),e.jsx(i,{children:e.jsxs(t.p,{children:["Review ",e.jsx(n,{children:"library-building/native-handles-and-object-lifetime"}),` for the full
lifetime model behind wrappers.`]})}),e.jsx(i,{children:e.jsxs(t.p,{children:["See ",e.jsx(n,{children:"library-building/async-await-native"})," for more async patterns."]})})]})]})}function p(l={}){const{wrapper:t}=l.components||{};return t?e.jsx(t,{...l,children:e.jsx(h,{...l})}):h(l)}function s(l,t){throw new Error("Expected component `"+l+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
