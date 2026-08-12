import{j as e}from"./index-hFDFiLgA.js";function m(l){const n={p:"p",...l.components},{Bullet:i,Callout:o,CodeBlock:s,DocsTable:c,H2:a,InlineCode:r,Prose:t}=n;return i||d("Bullet"),o||d("Callout"),s||d("CodeBlock"),c||d("DocsTable"),a||d("H2"),r||d("InlineCode"),t||d("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(a,{children:"Summary"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx(r,{children:"SymbolBuilder<InterfaceSymbol>"}),` registers an interface contract into the
ShardScript semantic model inside `,e.jsx(r,{children:"SHARDLIB_ENTRYPOINT"}),`. An interface declares
a set of abstract methods, properties, indexers, type parameters, and base interfaces that classes
and structs must satisfy. The runtime resolves calls through an interface reference to the matching
implementation on the concrete type.`]})}),`
`,e.jsx(a,{children:"Syntax"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:["Obtain an interface builder from a ",e.jsx(r,{children:"NamespaceSymbol"}),` builder, then add members
and base interfaces with the fluent `,e.jsx(r,{children:"SymbolBuilder<InterfaceSymbol>"})," API."]})}),`
`,e.jsx(s,{code:`#include <ShardScript.hpp>

using namespace shard;

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> demo(context, L"demo");

  SymbolBuilder<InterfaceSymbol> printable = demo.AddInterface(L"IPrintable", ACS_PUBLIC);

  SymbolBuilder<MethodSymbol> printMethod = printable.AddMethod(L"Print", TYPE_VOID, LINK_INSTANCE, ACS_PUBLIC);
  printMethod.AddParameter(L"message", TYPE_STRING);

  SymbolBuilder<PropertySymbol> labelProp = printable.AddProperty(L"Label", TYPE_STRING, LINK_INSTANCE, ACS_PUBLIC);
  labelProp.AddGetter();

  SymbolBuilder<IndexatorSymbol> indexer = printable.AddIndexer(TYPE_STRING, LINK_INSTANCE, ACS_PUBLIC);
  indexer.AddParameter(L"key", TYPE_STRING);
  indexer.AddGetter();

  TypeParameterSymbol* t = printable.AddTypeParameter(L"T");

  printable.Implements(otherInterface);
  printable.DeclareGlobal();
}`,language:"cpp",filename:"interface_registration.cpp"}),`
`,e.jsx(c,{headers:["Method","Parameters","Returns","Description"],rows:[[e.jsx(r,{children:"AddInterface"}),e.jsxs(e.Fragment,{children:[e.jsx(r,{children:"name"}),", ",e.jsx(r,{children:"access = ACS_PUBLIC"})]}),e.jsx(r,{children:"SymbolBuilder<InterfaceSymbol>"}),"Creates a new interface symbol under the namespace and returns a builder for it."],[e.jsx(r,{children:"AddMethod"}),e.jsxs(e.Fragment,{children:[e.jsx(r,{children:"name"}),", ",e.jsx(r,{children:"returnType"}),", ",e.jsx(r,{children:"linking"}),", ",e.jsx(r,{children:"access = ACS_PUBLIC"})]}),e.jsx(r,{children:"SymbolBuilder<MethodSymbol>"}),"Declares an abstract method on the interface. Use <InlineCode>LINK_INSTANCE</InlineCode> because interface methods operate on an instance."],[e.jsx(r,{children:"AddProperty"}),e.jsxs(e.Fragment,{children:[e.jsx(r,{children:"name"}),", ",e.jsx(r,{children:"type"}),", ",e.jsx(r,{children:"linking"}),", ",e.jsx(r,{children:"access = ACS_PUBLIC"})]}),e.jsx(r,{children:"SymbolBuilder<PropertySymbol>"}),"Declares a property contract. Call <InlineCode>AddGetter</InlineCode> and/or <InlineCode>AddSetter</InlineCode> to define required accessors."],[e.jsx(r,{children:"AddIndexer"}),e.jsxs(e.Fragment,{children:[e.jsx(r,{children:"returnType"}),", ",e.jsx(r,{children:"linking"}),", ",e.jsx(r,{children:"access = ACS_PUBLIC"})]}),e.jsx(r,{children:"SymbolBuilder<IndexatorSymbol>"}),"Declares an indexer contract. Add one or more index parameters and required accessors."],[e.jsx(r,{children:"AddTypeParameter"}),e.jsx(e.Fragment,{children:e.jsx(r,{children:"name"})}),e.jsx(r,{children:"SymbolBuilder<TypeParameterSymbol>"}),"Declares a generic type parameter for the interface. The returned builder converts to <InlineCode>TypeParameterSymbol*</InlineCode> for use in signatures."],[e.jsx(r,{children:"Implements"}),e.jsx(e.Fragment,{children:e.jsx(r,{children:"baseInterface"})}),e.jsx(r,{children:"SymbolBuilder<InterfaceSymbol>&"}),"Adds a base interface. Accepts <InlineCode>InterfaceSymbol*</InlineCode> or a constructed <InlineCode>GenericTypeSymbol*</InlineCode>."],[e.jsx(r,{children:"DeclareGlobal"}),"None",e.jsx(r,{children:"SymbolBuilder<InterfaceSymbol>&"}),"Makes the interface resolvable without a full namespace qualifier, such as <InlineCode>IDisposable</InlineCode>."]]}),`
`,e.jsx(a,{children:"Parameters / Arguments"}),`
`,e.jsx(c,{headers:["Parameter","Type","Description"],rows:[[e.jsx(r,{children:"name"}),e.jsx(r,{children:"const std::wstring&"}),"A wide-character identifier. Conventionally prefix interface names with <InlineCode>I</InlineCode>. Applies to the interface, method, property, indexer, and type parameter."],[e.jsx(r,{children:"returnType / type"}),e.jsx(r,{children:"TypeSymbol*"}),"A <InlineCode>TypeSymbol*</InlineCode> such as <InlineCode>TYPE_VOID</InlineCode>, <InlineCode>TYPE_STRING</InlineCode>, or a type parameter. Applies to methods, properties, and indexers."],[e.jsx(r,{children:"linking"}),e.jsx(r,{children:"SymbolLinking"}),"Use <InlineCode>LINK_INSTANCE</InlineCode> for interface members because they describe per-instance contracts. Applies to methods, properties, and indexers."],[e.jsx(r,{children:"access"}),e.jsx(r,{children:"SymbolAccesibility"}),"Defaults to <InlineCode>ACS_PUBLIC</InlineCode>. Interface members must be public to be implemented by external code. Applies to the interface, method, property, and indexer."],[e.jsx(r,{children:"baseInterface"}),e.jsxs(e.Fragment,{children:[e.jsx(r,{children:"InterfaceSymbol*"})," or ",e.jsx(r,{children:"GenericTypeSymbol*"})]}),"The parent interface symbol. Store it with <InlineCode>.Get()</InlineCode> or a global static pointer if other types need to inherit from it."]]}),`
`,e.jsx(a,{children:"Returns"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx(r,{children:"AddInterface"}),", ",e.jsx(r,{children:"AddMethod"}),", ",e.jsx(r,{children:"AddProperty"}),`,
`," ",e.jsx(r,{children:"AddIndexer"}),", and ",e.jsx(r,{children:"AddTypeParameter"})," return"," ",`
`,e.jsx(r,{children:"SymbolBuilder"})," instances. Call ",e.jsx(r,{children:".Get()"}),` on any builder
to retrieve the underlying symbol pointer. Accessor builders (`,e.jsx(r,{children:"AddGetter"}),","," ",`
`,e.jsx(r,{children:"AddSetter"}),") return ",e.jsx(r,{children:"SymbolBuilder<AccessorSymbol>"}),`.
`,e.jsx(r,{children:"Implements"})," and ",e.jsx(r,{children:"DeclareGlobal"}),` return the interface
builder reference so calls can be chained.`]})}),`
`,e.jsx(a,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Static member on an interface"}),` — Interface members
describe instance contracts. Registering a method, property, or indexer with`," ",`
`,e.jsx(r,{children:"LINK_STATIC"})," produces a semantic error."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Missing implementation"})," — A class or struct that calls"," ",`
`,e.jsx(r,{children:"Implements"}),` must expose a matching public member for every abstract method,
property, and indexer declared by the interface and its base interfaces.`]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Signature mismatch"}),` — The implementing member must match
the interface member by name, parameter count, parameter types, and return type.`]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Invalid base interface"})," —"," ",`
`,e.jsx(r,{children:"Implements"}),` on an interface accepts only other interface symbols. Classes and
structs cannot be used as base interfaces.`]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Type parameter used before declaration"}),` — Declare type
parameters with `,e.jsx(r,{children:"AddTypeParameter"})," before using them in member signatures."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Callback registered on an interface member"}),` — Interfaces
declare contracts, not implementations. Do not call `,e.jsx(r,{children:"SetCallback"}),` on interface
methods, getters, or setters.`]})})]}),`
`,e.jsx(a,{children:"Remarks"}),`
`,e.jsx(o,{tone:"blue",title:"Native library shape",children:e.jsxs(n.p,{children:["A ShardScript native library is any shared library (",e.jsx(r,{children:".dll"})," on Windows, ",e.jsx(r,{children:".so"})," on Linux, ",e.jsx(r,{children:".dylib"})," on macOS) that exports the two C-linkage symbols ",e.jsx(r,{children:"ShardLib_GetMetadata"})," and ",e.jsx(r,{children:"ShardLib_EntryPoint"}),". It can be built from one or many C++ source files, live inside ",e.jsx(r,{children:"ShardScript.Framework"})," or in a completely separate project, and links against the ShardScript runtime shared library using headers from ",e.jsx(r,{children:"ShardScript/include"}),". For the full registration contract, see ",e.jsx(r,{children:"native-library-overview.mdx"}),"."]})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Abstract contracts."}),` Interface members have no implementation in the native library.
Declare methods, properties, and indexers without setting a callback. The runtime records them as
abstract requirements and matches them against members on implementing classes and structs. In the
framework source you will sometimes see `,e.jsx(r,{children:"method.Get()->IsAbstract = true"}),`,
which explicitly marks the method as abstract, but a callback is never attached.`]})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Instance linking."})," Every interface member uses"," ",`
`,e.jsx(r,{children:"LINK_INSTANCE"}),`. When the VM dispatches a call through an interface reference,
it passes the instance pointer as `,e.jsx(r,{children:"context.Args[0]"})," to the implementing callback."]})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Generic interfaces."}),` Declare type parameters before any member that references them.
At runtime, generic interface calls use `,e.jsx(r,{children:"context.Frame->TypeArguments"}),` in the
same order as the `,e.jsx(r,{children:"AddTypeParameter"}),` calls. Classes that implement a generic
interface must satisfy the constructed signature, such as`," ",`
`,e.jsx(r,{children:"IComparable<int>"}),"."]})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Interface inheritance."}),` A derived interface inherits every requirement from its base
interfaces. A class that implements the derived interface must therefore implement the entire chain.
Use `,e.jsx(r,{children:"DeclareGlobal"}),` sparingly, only for interfaces that are expected to be
referenced without their namespace, such as widely-used contracts like `,e.jsx(r,{children:"IDisposable"}),"."]})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Cross-library references."}),` If one native library needs to implement an interface from
another library, look up the interface symbol lazily inside an `,e.jsx(r,{children:"EnsureSymbols"}),`
helper rather than caching a pointer during static initialization. Load order between libraries is not
guaranteed until the loader resolves declared dependencies.`]})}),`
`,e.jsx(a,{children:"Examples"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Register an interface and implement it from a native class."})," This example declares"," ",`
`,e.jsx(r,{children:"IPrintable"})," with a method and a read-only property, then registers a"," ",`
`,e.jsx(r,{children:"Document"})," class that provides concrete implementations."]})}),`
`,e.jsx(s,{code:`static InterfaceSymbol* g_IPrintable = nullptr;
static FieldSymbol* g_DocumentLabelField = nullptr;

static ObjectInstance* document_Print(const CallState& context)
{
  ObjectInstance* self = context.Args[0];
  ObjectInstance* label = self->GetField(g_DocumentLabelField->SlotIndex);

  if (label == nullptr || label == GarbageCollector::NullInstance)
  {
      return nullptr;
  }

  const wchar_t* text = label->AsString();
  // A real library would forward text to stdio.println; omitted for clarity.
  return nullptr;
}

static ObjectInstance* document_Label_get(const CallState& context)
{
  ObjectInstance* self = context.Args[0];
  return self->GetField(g_DocumentLabelField->SlotIndex);
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> demo(context, L"demo");

  SymbolBuilder<InterfaceSymbol> printable = demo.AddInterface(L"IPrintable", ACS_PUBLIC);
  g_IPrintable = printable.Get();

  SymbolBuilder<MethodSymbol> printMethod = printable.AddMethod(L"Print", TYPE_VOID, LINK_INSTANCE, ACS_PUBLIC);
  printMethod.AddParameter(L"message", TYPE_STRING);

  SymbolBuilder<PropertySymbol> labelProp = printable.AddProperty(L"Label", TYPE_STRING, LINK_INSTANCE, ACS_PUBLIC);
  labelProp.AddGetter();

  printable.DeclareGlobal();

  demo.AddClass(L"Document", ACS_PUBLIC, LINK_INSTANCE, [](SymbolBuilder<ClassSymbol> document)
  {
      document.Implements(g_IPrintable);

      g_DocumentLabelField = document.AddField(L"_label", TYPE_STRING, LINK_INSTANCE, ACS_PRIVATE);

      SymbolBuilder<ConstructorSymbol> init = document.AddInit();
      init.AddParameter(L"label", TYPE_STRING)
          .SetCallback([](const CallState& context)
          {
              ObjectInstance* self = context.Args[0];
              ObjectInstance* label = context.Args[1];
              self->SetField(g_DocumentLabelField->SlotIndex, label);
              return self;
          });

      document.AddMethod(L"Print", TYPE_VOID, LINK_INSTANCE, ACS_PUBLIC)
          .SetCallback(&document_Print);

      SymbolBuilder<PropertySymbol> docLabel = document.AddProperty(L"Label", TYPE_STRING, LINK_INSTANCE, ACS_PUBLIC);
      docLabel.AddGetter().SetCallback(&document_Label_get);
  });
}`,language:"cpp",filename:"printable_interface.cpp"}),`
`,e.jsx(t,{children:"ShardScript usage of the registered interface:"}),`
`,e.jsx(s,{code:`using stdio;
using demo;

namespace app;

public class Document : IPrintable
{
  private _label: string;

  public init(label: string)
  {
      this._label = label;
  }

  public Label: string
  {
      get { return this._label; }
  }

  public func Print(message: string) -> void
  {
      println(message + " from " + this._label);
  }
}

public static func Main() -> void
{
  doc: IPrintable = new Document("archive");
  doc.Print("hello");   // hello from archive
}`,language:"csharp",filename:"printable_usage.shard"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Register a generic interface."})," This declares ",e.jsx(r,{children:"IComparable<T>"})," ",`
and uses the type parameter as the parameter type for `,e.jsx(r,{children:"CompareTo"}),"."]})}),`
`,e.jsx(s,{code:`SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> demo(context, L"demo");

  SymbolBuilder<InterfaceSymbol> comparable = demo.AddInterface(L"IComparable", ACS_PUBLIC);
  TypeParameterSymbol* t = comparable.AddTypeParameter(L"T");

  SymbolBuilder<MethodSymbol> compare = comparable.AddMethod(L"CompareTo", TYPE_INT, LINK_INSTANCE, ACS_PUBLIC);
  compare.AddParameter(L"other", t);

  comparable.DeclareGlobal();
}`,language:"cpp",filename:"icomparable_interface.cpp"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Register an interface with an indexer and inheritance."})," ",`
`,e.jsx(r,{children:"IIndexable"})," extends ",e.jsx(r,{children:"INamed"})," and adds a string indexer."]})}),`
`,e.jsx(s,{code:`static InterfaceSymbol* g_INamed = nullptr;

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> demo(context, L"demo");

  SymbolBuilder<InterfaceSymbol> named = demo.AddInterface(L"INamed", ACS_PUBLIC);
  named.AddProperty(L"Name", TYPE_STRING, LINK_INSTANCE, ACS_PUBLIC).AddGetter();
  g_INamed = named.Get();

  SymbolBuilder<InterfaceSymbol> indexable = demo.AddInterface(L"IIndexable", ACS_PUBLIC);
  indexable.Implements(g_INamed);

  SymbolBuilder<IndexatorSymbol> indexer = indexable.AddIndexer(TYPE_STRING, LINK_INSTANCE, ACS_PUBLIC);
  indexer.AddParameter(L"key", TYPE_STRING);
  indexer.AddGetter();

  indexable.DeclareGlobal();
}`,language:"cpp",filename:"indexable_interface.cpp"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Build the native library."}),` A library that registers interfaces is compiled as a normal
shared-library target. It links against the ShardScript runtime and includes`," ",`
`,e.jsx(r,{children:"ShardScript/include"}),"."]})}),`
`,e.jsx(s,{code:`file(GLOB MY_LIB_SOURCES CONFIGURE_DEPENDS "*.cpp")

foreach(SOURCE_FILE IN LISTS MY_LIB_SOURCES)
  get_filename_component(TARGET_NAME "\${SOURCE_FILE}" NAME_WLE)
  add_library("\${TARGET_NAME}" SHARED "\${SOURCE_FILE}")

  target_include_directories("\${TARGET_NAME}" PRIVATE
      "\${CMAKE_CURRENT_SOURCE_DIR}/../ShardScript/include")

  target_link_libraries("\${TARGET_NAME}" PRIVATE ShardScript)
endforeach()`,language:"cmake",filename:"CMakeLists.txt"}),`
`,e.jsx(a,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx(r,{children:"library-building/class-symbol-builder"})," — implementing interfaces on classes."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx(r,{children:"library-building/method-symbol-builder"})," — registering interface methods."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx(r,{children:"library-building/headers-quick-reference"})," — required headers."]})})]}),`
`,e.jsx(a,{children:"Source"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:["The native side of this API is implemented in ",e.jsx(r,{children:"shard/semantic/SymbolBuilder.hpp"}),`.
View the source on GitHub: `,e.jsx(r,{children:"https://github.com/Rikitav/ShardScript/blob/main/ShardScript/include/shard/semantic/SymbolBuilder.hpp"}),"."]})})]})}function p(l={}){const{wrapper:n}=l.components||{};return n?e.jsx(n,{...l,children:e.jsx(m,{...l})}):m(l)}function d(l,n){throw new Error("Expected component `"+l+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
