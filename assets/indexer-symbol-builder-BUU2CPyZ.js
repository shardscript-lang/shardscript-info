import{j as e}from"./index-C1AvCmMi.js";function x(i){const r={p:"p",...i.components},{Bullet:l,Callout:c,CodeBlock:d,DocsTable:o,H2:s,InlineCode:t,Prose:n}=r;return l||a("Bullet"),c||a("Callout"),d||a("CodeBlock"),o||a("DocsTable"),s||a("H2"),t||a("InlineCode"),n||a("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(s,{children:"Summary"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:["The ",e.jsx(t,{children:"IndexatorSymbol"}),` builder registers an indexer member on a ShardScript
class, struct, or interface. Indexers let ShardScript code access instances with bracket syntax,
such as `,e.jsx(t,{children:"buffer[index]"})," or ",e.jsx(t,{children:"grid[row, col]"}),`. The
fluent API defines the indexer parameters, getter, setter, and an optional backing field.`]})}),`
`,e.jsx(s,{children:"Syntax"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:["An indexer is created from a ",e.jsx(t,{children:"ClassSymbol"}),","," ",`
`,e.jsx(t,{children:"StructSymbol"}),", or ",e.jsx(t,{children:"InterfaceSymbol"})," builder."]})}),`
`,e.jsx(d,{code:`SymbolBuilder<IndexatorSymbol> indexer = cls.AddIndexer(returnType, linking, accessibility);

indexer.AddParameter(name, type);
indexer.AddGetter().SetCallback(&getterCallback);
indexer.AddSetter().SetCallback(&setterCallback);

FieldSymbol* backingField = indexer.AddBackingField().Get();`,language:"cpp"}),`
`,e.jsx(s,{children:"Parameters / Arguments"}),`
`,e.jsx(o,{headers:["Method","Parameters","Returns","Description"],rows:[[e.jsx(t,{children:"AddIndexer"}),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:"returnType"}),", ",e.jsx(t,{children:"linking"}),", ",e.jsx(t,{children:"accessibility = ACS_PUBLIC"})]}),e.jsx(t,{children:"SymbolBuilder<IndexatorSymbol>"}),"Creates an indexer that returns returnType. Use LINK_INSTANCE when context.Args[0] is this."],[e.jsx(t,{children:"AddParameter"}),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:"name"}),", ",e.jsx(t,{children:"type"})]}),e.jsx(t,{children:"SymbolBuilder<IndexatorSymbol>&"}),"Adds an index parameter visible to ShardScript as indexer[key]."],[e.jsx(t,{children:"AddGetter"}),e.jsx(e.Fragment,{children:e.jsx(t,{children:"accessibility = ACS_PUBLIC"})}),e.jsx(t,{children:"SymbolBuilder<AccessorSymbol>"}),"Adds a getter accessor for read access."],[e.jsx(t,{children:"AddSetter"}),e.jsx(e.Fragment,{children:e.jsx(t,{children:"accessibility = ACS_PUBLIC"})}),e.jsx(t,{children:"SymbolBuilder<AccessorSymbol>"}),"Adds a setter accessor for write access."],[e.jsx(t,{children:"AddBackingField"}),e.jsx(e.Fragment,{children:e.jsx(t,{children:"accessibility = ACS_PUBLIC"})}),e.jsx(t,{children:"FieldSymbol*"}),"Creates a compiler-generated field of the indexer return type and returns the field symbol."]]}),`
`,e.jsx(s,{children:"Returns"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:["The getter callback returns an ",e.jsx(t,{children:"ObjectInstance*"}),` that matches the indexer
return type. Use `,e.jsx(t,{children:"context.Collector.FromValue"})," to box primitives,"," ",`
`,e.jsx(t,{children:"context.Collector.AllocateArray"}),` for arrays, or return an existing object
reference. The setter callback returns `,e.jsx(t,{children:"nullptr"}),` because assignment
expressions evaluate to void.`]})}),`
`,e.jsx(s,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(l,{children:e.jsxs(r.p,{children:["Throwing ",e.jsx(t,{children:"std::runtime_error"}),` from a getter or setter is converted into a
ShardScript runtime exception. Use it for out-of-bounds access, missing keys, or invalid
arguments.`]})}),e.jsx(l,{children:e.jsxs(r.p,{children:["Calling ",e.jsx(t,{children:"AsString()"}),", ",e.jsx(t,{children:"AsInteger()"}),`, or any
argument accessor on `,e.jsx(t,{children:"nullptr"})," or"," ",`
`,e.jsx(t,{children:"GarbageCollector::NullInstance"}),` crashes the host. Guard reference
arguments first.`]})}),e.jsx(l,{children:e.jsx(r.p,{children:`Registering an indexer without a getter makes reads fail at compile time; registering without a
setter makes assignment fail at compile time.`})}),e.jsx(l,{children:e.jsxs(r.p,{children:["A mismatch between the registered ",e.jsx(t,{children:"SymbolLinking"}),` and the call site
prevents overload resolution from finding the indexer.`]})})]}),`
`,e.jsx(s,{children:"Remarks"}),`
`,e.jsx(c,{tone:"blue",title:"Native library shape",children:e.jsxs(r.p,{children:["A ShardScript native library is any shared library (",e.jsx(t,{children:".dll"})," on Windows, ",e.jsx(t,{children:".so"})," on Linux, ",e.jsx(t,{children:".dylib"})," on macOS) that exports the two C-linkage symbols ",e.jsx(t,{children:"ShardLib_GetMetadata"})," and ",e.jsx(t,{children:"ShardLib_EntryPoint"}),". It can be built from one or many C++ source files, live inside ",e.jsx(t,{children:"ShardScript.Framework"})," or in a completely separate project, and links against the ShardScript runtime shared library using headers from ",e.jsx(t,{children:"ShardScript/include"}),". For the full registration contract, see ",e.jsx(t,{children:"native-library-overview.mdx"}),"."]})}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Argument layout."})," For an instance indexer, ",e.jsx(t,{children:"context.Args[0]"})," ",`
is `,e.jsx(t,{children:"this"}),", ",e.jsx(t,{children:"context.Args[1]"}),` is the first bracket
parameter, and the value being assigned is the last argument for setters. For a static indexer,
the first real parameter is `,e.jsx(t,{children:"context.Args[0]"}),` and the assigned value is the
last argument.`]})}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Getter and setter symmetry."}),` An indexer may expose a getter only, a setter only,
or both. The parameter list declared on the indexer is shared by both accessors. Call`," ",`
`,e.jsx(t,{children:"AddParameter"}),` before registering callbacks so the accessors receive the
correct argument layout.`]})}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Backing fields."})," ",`
`,e.jsx(t,{children:"indexer.AddBackingField().Get()"}),` creates a private field whose type equals
the indexer return type. This is convenient for simple scalar storage, but most collection-style
indexers store data in a manually declared array or dictionary field using`," ",`
`,e.jsx(t,{children:"cls.AddField"}),". Store the returned ",e.jsx(t,{children:"FieldSymbol*"}),` and
use `,e.jsx(t,{children:"SlotIndex"})," at runtime to read or write the field."]})}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Indexers on interfaces."})," Interfaces can declare indexers with"," ",`
`,e.jsx(t,{children:"AddIndexer"}),", ",e.jsx(t,{children:"AddParameter"}),","," ",`
`,e.jsx(t,{children:"AddGetter"}),", and ",e.jsx(t,{children:"AddSetter"}),`. Implementing classes
must register an indexer with a matching signature and parameter count.`]})}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Generic indexers."}),` The indexer return type and parameter types can be generic type
parameters declared with `,e.jsx(t,{children:"AddTypeParameter"}),`. At runtime, resolve concrete
types through `,e.jsx(t,{children:"context.Frame->TypeArguments"}),` in the same order as the
parameters were declared.`]})}),`
`,e.jsx(s,{children:"Examples"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Example 1: single-parameter instance indexer."})," A ",e.jsx(t,{children:"Buffer"})," ",`
class wraps a fixed-size integer array and exposes it through`," ",`
`,e.jsx(t,{children:"buffer[index]"}),"."]})}),`
`,e.jsx(d,{code:`#include <ShardScript.hpp>

using namespace shard;

static FieldSymbol* buffer_itemsField = nullptr;

static ObjectInstance* buffer_get_Item(const CallState& context)
{
  ObjectInstance* self = context.Args[0];
  std::int64_t index = context.Args[1]->AsInteger();

  ObjectInstance* items = self->GetField(buffer_itemsField->SlotIndex);

  if (index < 0 || static_cast<std::size_t>(index) >= items->GetArrayLength())
  {
      throw std::runtime_error("index is out of bounds");
  }

  return items->GetElement(static_cast<std::size_t>(index));
}

static ObjectInstance* buffer_set_Item(const CallState& context)
{
  ObjectInstance* self = context.Args[0];
  std::int64_t index = context.Args[1]->AsInteger();
  ObjectInstance* value = context.Args[2];

  ObjectInstance* items = self->GetField(buffer_itemsField->SlotIndex);

  if (index < 0 || static_cast<std::size_t>(index) >= items->GetArrayLength())
  {
      throw std::runtime_error("index is out of bounds");
  }

  items->SetElement(static_cast<std::size_t>(index), value);
  return nullptr;
}

static ObjectInstance* buffer_Init(const CallState& context)
{
  ObjectInstance* self = context.Args[0];
  std::int64_t capacity = context.Args[1]->AsInteger();

  ObjectInstance* items = context.Collector.AllocateArray(TYPE_INT, static_cast<std::size_t>(capacity));
  self->SetField(buffer_itemsField->SlotIndex, items);

  return self;
}

SHARDLIB_GETMETADATA
{
  lib.Name = L"shard.samples";
  lib.Description = L"Indexer examples";
  lib.Version = L"1.0.0";
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> samples(context, L"samples");

  samples.AddClass(L"Buffer", ACS_PUBLIC, LINK_INSTANCE, [](SymbolBuilder<ClassSymbol> cls)
  {
      SymbolFactory factory = cls.GetFactory();
      buffer_itemsField = cls.AddField(L"_items", factory.Array(TYPE_INT), LINK_INSTANCE, ACS_PRIVATE).Get();

      cls.AddInit()
          .AddParameter(L"capacity", TYPE_INT)
          .SetCallback(&buffer_Init);

      SymbolBuilder<IndexatorSymbol> indexer = cls.AddIndexer(TYPE_INT, LINK_INSTANCE, ACS_PUBLIC);
      indexer.AddParameter(L"index", TYPE_INT);
      indexer.AddGetter().SetCallback(&buffer_get_Item);
      indexer.AddSetter().SetCallback(&buffer_set_Item);
  });
}`,language:"cpp",filename:"indexer-samples.shard.cpp"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:["ShardScript program that uses the ",e.jsx(t,{children:"Buffer"})," indexer."]})}),`
`,e.jsx(d,{code:`using stdio;
using samples;

namespace demo;

public static func Main() -> void
{
  buffer := new Buffer(4);

  buffer[0] = 10;
  buffer[1] = 20;

  println(buffer[0]);
  println(buffer[1]);
}`,language:"csharp",filename:"demo.shard"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Example 2: multi-parameter indexer."})," A ",e.jsx(t,{children:"Grid"}),` class stores a
flat array and exposes two-dimensional access through `,e.jsx(t,{children:"grid[row, col]"}),"."]})}),`
`,e.jsx(d,{code:`static FieldSymbol* grid_cellsField = nullptr;
static FieldSymbol* grid_columnsField = nullptr;

static ObjectInstance* grid_get_Item(const CallState& context)
{
  ObjectInstance* self = context.Args[0];
  std::int64_t row = context.Args[1]->AsInteger();
  std::int64_t col = context.Args[2]->AsInteger();

  ObjectInstance* cells = self->GetField(grid_cellsField->SlotIndex);
  std::int64_t columns = self->GetField(grid_columnsField->SlotIndex)->AsInteger();

  if (row < 0 || col < 0 || col >= columns)
  {
      throw std::runtime_error("index is out of bounds");
  }

  std::size_t flatIndex = static_cast<std::size_t>(row * columns + col);
  if (flatIndex >= cells->GetArrayLength())
  {
      throw std::runtime_error("index is out of bounds");
  }

  return cells->GetElement(flatIndex);
}

static ObjectInstance* grid_set_Item(const CallState& context)
{
  ObjectInstance* self = context.Args[0];
  std::int64_t row = context.Args[1]->AsInteger();
  std::int64_t col = context.Args[2]->AsInteger();
  ObjectInstance* value = context.Args[3];

  ObjectInstance* cells = self->GetField(grid_cellsField->SlotIndex);
  std::int64_t columns = self->GetField(grid_columnsField->SlotIndex)->AsInteger();

  if (row < 0 || col < 0 || col >= columns)
  {
      throw std::runtime_error("index is out of bounds");
  }

  std::size_t flatIndex = static_cast<std::size_t>(row * columns + col);
  if (flatIndex >= cells->GetArrayLength())
  {
      throw std::runtime_error("index is out of bounds");
  }

  cells->SetElement(flatIndex, value);
  return nullptr;
}

static ObjectInstance* grid_Init(const CallState& context)
{
  ObjectInstance* self = context.Args[0];
  std::int64_t rows = context.Args[1]->AsInteger();
  std::int64_t columns = context.Args[2]->AsInteger();

  std::size_t cellCount = static_cast<std::size_t>(rows * columns);
  ObjectInstance* cells = context.Collector.AllocateArray(TYPE_INT, cellCount);

  self->SetField(grid_cellsField->SlotIndex, cells);
  self->SetField(grid_columnsField->SlotIndex, context.Collector.FromValue(columns));

  return self;
}`,language:"cpp",filename:"grid-callbacks.cpp"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:["Register the ",e.jsx(t,{children:"Grid"})," class and its two-parameter indexer."]})}),`
`,e.jsx(d,{code:`samples.AddClass(L"Grid", ACS_PUBLIC, LINK_INSTANCE, [](SymbolBuilder<ClassSymbol> cls)
{
  SymbolFactory factory = cls.GetFactory();

  grid_cellsField = cls.AddField(L"_cells", factory.Array(TYPE_INT), LINK_INSTANCE, ACS_PRIVATE).Get();
  grid_columnsField = cls.AddField(L"_columns", TYPE_INT, LINK_INSTANCE, ACS_PRIVATE).Get();

  cls.AddInit()
      .AddParameter(L"rows", TYPE_INT)
      .AddParameter(L"columns", TYPE_INT)
      .SetCallback(&grid_Init);

  SymbolBuilder<IndexatorSymbol> indexer = cls.AddIndexer(TYPE_INT, LINK_INSTANCE, ACS_PUBLIC);
  indexer.AddParameter(L"row", TYPE_INT);
  indexer.AddParameter(L"column", TYPE_INT);
  indexer.AddGetter().SetCallback(&grid_get_Item);
  indexer.AddSetter().SetCallback(&grid_set_Item);
});`,language:"cpp"}),`
`,e.jsx(n,{children:e.jsx(r.p,{children:"ShardScript program that reads and writes the grid."})}),`
`,e.jsx(d,{code:`using stdio;
using samples;

namespace demo;

public static func Main() -> void
{
  grid := new Grid(3, 3);

  grid[1, 2] = 99;
  println(grid[1, 2]);
}`,language:"csharp",filename:"grid-demo.shard"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Example 3: backing field."}),` A simple read-only scalar indexer that stores its default
value in a compiler-generated backing field.`]})}),`
`,e.jsx(d,{code:`static ObjectInstance* scalarIndexer_get(const CallState& context)
{
  ObjectInstance* self = context.Args[0];
  std::int64_t key = context.Args[1]->AsInteger();

  // In a real implementation the key would select a real storage cell.
  // This example returns the backing field regardless of the key.
  ObjectInstance* value = self->GetField(scalar_backingField->SlotIndex);
  return value;
}

static ObjectInstance* scalarIndexer_set(const CallState& context)
{
  ObjectInstance* self = context.Args[0];
  ObjectInstance* value = context.Args[2];

  self->SetField(scalar_backingField->SlotIndex, value);
  return nullptr;
}

samples.AddClass(L"ScalarStore", ACS_PUBLIC, LINK_INSTANCE, [](SymbolBuilder<ClassSymbol> cls)
{
  SymbolBuilder<IndexatorSymbol> indexer = cls.AddIndexer(TYPE_INT, LINK_INSTANCE, ACS_PUBLIC);
  indexer.AddParameter(L"key", TYPE_INT);

  scalar_backingField = indexer.AddBackingField().Get();

  indexer.AddGetter().SetCallback(&scalarIndexer_get);
  indexer.AddSetter().SetCallback(&scalarIndexer_set);
});`,language:"cpp"}),`
`,e.jsx(c,{tone:"amber",title:"Backing field vs manual field",children:e.jsxs(r.p,{children:[e.jsx(t,{children:"AddBackingField"}),` creates a single field of the indexer return type. For
collection-style indexers that store many values, declare a manual array or dictionary field with`," ",`
`,e.jsx(t,{children:"cls.AddField"})," instead, as shown in the ",e.jsx(t,{children:"Buffer"})," and"," ",`
`,e.jsx(t,{children:"Grid"})," examples."]})}),`
`,e.jsx(s,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(l,{children:e.jsxs(r.p,{children:[e.jsx(t,{children:"library-building/property-symbol-builder"})," — property registration."]})}),e.jsx(l,{children:e.jsxs(r.p,{children:[e.jsx(t,{children:"library-building/method-symbol-builder"})," — method registration."]})}),e.jsx(l,{children:e.jsxs(r.p,{children:[e.jsx(t,{children:"library-building/class-symbol-builder"})," — class registration."]})})]}),`
`,e.jsx(s,{children:"Source"}),`
`,e.jsx(n,{children:e.jsxs(r.p,{children:["The native side of this API is implemented in ",e.jsx(t,{children:"shard/semantic/SymbolBuilder.hpp"}),`.
View the source on GitHub: `,e.jsx(t,{children:"https://github.com/Rikitav/ShardScript/blob/main/ShardScript/include/shard/semantic/SymbolBuilder.hpp"}),"."]})})]})}function m(i={}){const{wrapper:r}=i.components||{};return r?e.jsx(r,{...i,children:e.jsx(x,{...i})}):x(i)}function a(i,r){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default};
