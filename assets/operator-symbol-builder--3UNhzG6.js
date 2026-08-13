import{j as e}from"./index-BQw6jbtc.js";function h(a){const r={p:"p",...a.components},{Bullet:n,Callout:d,CodeBlock:i,DocsTable:c,H2:l,InlineCode:t,Prose:s}=r;return n||o("Bullet"),d||o("Callout"),i||o("CodeBlock"),c||o("DocsTable"),l||o("H2"),t||o("InlineCode"),s||o("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(l,{children:"Summary"}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:["The ",e.jsx(t,{children:"OperatorSymbol"}),` builder registers custom operator and cast behavior for a
`,e.jsx(t,{children:"ClassSymbol"})," or ",e.jsx(t,{children:"StructSymbol"}),". Inside"," ",`
`,e.jsx(t,{children:"SHARDLIB_ENTRYPOINT"})," you call ",e.jsx(t,{children:"AddOperator"}),` to bind a
ShardScript operator token—such as `,e.jsx(t,{children:"+"}),", ",e.jsx(t,{children:"-"}),", or"," ",`
`,e.jsx(t,{children:"=="}),"—to a native C++ callback, or ",e.jsx(t,{children:"AddCastOperator"}),` to
implement the `,e.jsx(t,{children:"as"}),` cast. The runtime invokes the callback whenever ShardScript code
applies that operator to values of the registered type.`]})}),`
`,e.jsx(l,{children:"Syntax"}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:["Operator symbols are created from a ",e.jsx(t,{children:"SymbolBuilder<ClassSymbol>"})," or"," ",`
`,e.jsx(t,{children:"SymbolBuilder<StructSymbol>"}),". The returned"," ",`
`,e.jsx(t,{children:"SymbolBuilder<OperatorSymbol>"}),` is then configured with parameters and a
callback.`]})}),`
`,e.jsx(i,{code:`SymbolBuilder<OperatorSymbol> AddOperator(
  TokenType opToken,
  TypeSymbol* returnType,
  SymbolLinking linking,
  SymbolAccesibility access = SymbolAccesibility::Public);

SymbolBuilder<OperatorSymbol> AddCastOperator(
  TypeSymbol* targetType,
  SymbolLinking linking = LINK_STATIC,
  SymbolAccesibility access = SymbolAccesibility::Public);

SymbolBuilder<OperatorSymbol>& AddParameter(
  const std::wstring& name,
  TypeSymbol* type);

SymbolBuilder<OperatorSymbol>& SetCallback(
  MethodSymbolDelegate callback);`,language:"cpp"}),`
`,e.jsx(s,{children:e.jsx(r.p,{children:"A typical registration chain looks like this:"})}),`
`,e.jsx(i,{code:`type.AddOperator(shard::TokenType::AddOperator, myType, LINK_STATIC)
  .AddParameter(L"left", myType)
  .AddParameter(L"right", myType)
  .SetCallback(&my_add_callback);

type.AddCastOperator(TYPE_STRING, LINK_STATIC)
  .AddParameter(L"value", myType)
  .SetCallback(&my_cast_callback);`,language:"cpp"}),`
`,e.jsx(l,{children:"Parameters / Arguments"}),`
`,e.jsx(c,{headers:["Parameter","Type","Description"],rows:[[e.jsx(t,{children:"opToken"}),e.jsx(t,{children:"shard::TokenType"}),"The operator token to overload, such as TokenType::AddOperator or TokenType::EqualsOperator."],[e.jsx(t,{children:"returnType"}),e.jsx(t,{children:"TypeSymbol*"}),"The type the operator expression evaluates to."],[e.jsx(t,{children:"targetType"}),e.jsx(t,{children:"TypeSymbol*"}),"For AddCastOperator, the destination type of the as cast."],[e.jsx(t,{children:"linking"}),e.jsx(t,{children:"SymbolLinking"}),"LINK_STATIC for static operators; LINK_INSTANCE when context.Args[0] is this."],[e.jsx(t,{children:"access"}),e.jsx(t,{children:"SymbolAccesibility"}),"Visibility of the operator. Defaults to ACS_PUBLIC."]]}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"OperatorSymbol chain methods"})}),`
`,e.jsx(c,{headers:["Method","Description"],rows:[[e.jsx(t,{children:"AddParameter(name, type)"}),"Adds one operand parameter. The order must match the operand order in ShardScript source."],[e.jsx(t,{children:"SetCallback(callback)"}),"Attaches the native callback that implements the operator. Required for the operator to run."]]}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Common operator token constants"})}),`
`,e.jsx(c,{headers:["ShardScript operator","TokenType constant"],rows:[[e.jsx(t,{children:"+"}),e.jsx(t,{children:"TokenType::AddOperator"})],[e.jsx(t,{children:"-"}),e.jsx(t,{children:"TokenType::SubOperator"})],[e.jsx(t,{children:"*"}),e.jsx(t,{children:"TokenType::MultOperator"})],[e.jsx(t,{children:"/"}),e.jsx(t,{children:"TokenType::DivOperator"})],[e.jsx(t,{children:"%"}),e.jsx(t,{children:"TokenType::ModOperator"})],[e.jsx(t,{children:"=="}),e.jsx(t,{children:"TokenType::EqualsOperator"})],[e.jsx(t,{children:"!="}),e.jsx(t,{children:"TokenType::NotEqualsOperator"})],[e.jsx(t,{children:"<"}),e.jsx(t,{children:"TokenType::LessOperator"})],[e.jsx(t,{children:">"}),e.jsx(t,{children:"TokenType::GreaterOperator"})],[e.jsx(t,{children:"."}),e.jsx(t,{children:"TokenType::Delimeter"})],[e.jsx(t,{children:"as"}),e.jsx(t,{children:"TokenType::AsOperator"})]]}),`
`,e.jsx(l,{children:"Returns"}),`
`,e.jsx(c,{headers:["Call","Return type","Description"],rows:[[e.jsx(t,{children:"AddOperator"}),e.jsx(t,{children:"SymbolBuilder<OperatorSymbol>"}),"A builder for the new operator symbol."],[e.jsx(t,{children:"AddCastOperator"}),e.jsx(t,{children:"SymbolBuilder<OperatorSymbol>"}),"A builder for an as cast operator symbol."],[e.jsx(t,{children:"AddParameter"}),e.jsx(t,{children:"SymbolBuilder<OperatorSymbol>&"}),"The same builder, for fluent chaining."],[e.jsx(t,{children:"SetCallback"}),e.jsx(t,{children:"SymbolBuilder<OperatorSymbol>&"}),"The same builder, for fluent chaining."],[e.jsx(t,{children:"callback"}),e.jsx(t,{children:"shard::ObjectInstance*"}),"The native callback must return the boxed operator result."]]}),`
`,e.jsx(l,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Missing callback"})," — An operator registered without"," ",`
`,e.jsx(t,{children:"SetCallback(...)"}),` resolves at compile time but has no native implementation. The
call runs but does nothing useful and may return null.`]})}),e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Parameter count mismatch"})," — The number of"," ",`
`,e.jsx(t,{children:"AddParameter"}),` calls must match the arity of the ShardScript operator. Binary
operators need two parameters; cast operators need one source parameter.`]})}),e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Linking mismatch"})," — For ",e.jsx(t,{children:"LINK_INSTANCE"})," ",`
operators, `,e.jsx(t,{children:"context.Args[0]"}),` is the left-hand instance and the first real operand is
at `,e.jsx(t,{children:"context.Args[1]"}),". Reading the wrong index produces wrong results or a crash."]})}),e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Return type mismatch"}),` — The operator's registered return
type must match what the callback actually returns. Returning a string when the operator is declared to
return `,e.jsx(t,{children:"int"})," causes a runtime type error."]})}),e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Ambiguous overload"}),` — Two operators with the same token and
the same operand types produce a semantic overload-resolution error.`]})}),e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Private operator called externally"}),` — Operators registered
with `,e.jsx(t,{children:"ACS_PRIVATE"}),` cannot be invoked from
ShardScript code outside the visibility boundary.`]})})]}),`
`,e.jsx(l,{children:"Remarks"}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Static versus instance operators."})," A static operator has no implicit"," ",`
`,e.jsx(t,{children:"this"}),`; both operands are passed as real arguments. An instance operator binds to the
type of the left-hand operand, so `,e.jsx(t,{children:"context.Args[0]"}),` is the left-hand instance and the
right-hand operand follows. Most binary operators are registered as static because the compiler can resolve
them from either operand's type; instance linking is useful when the operator logically mutates or reads
instance state.`]})}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Cast operators."})," ",e.jsx(t,{children:"AddCastOperator(targetType)"}),` is a convenience that
creates an operator using `,e.jsx(t,{children:"TokenType::AsOperator"}),` with the given return type. The
callback receives the source value as `,e.jsx(t,{children:"context.Args[0]"}),` and must return a value of the
target type. You can also call `,e.jsx(t,{children:"AddOperator(TokenType::AsOperator, targetType, ...)"}),`
directly.`]})}),`
`,e.jsx(d,{tone:"blue",title:"Native library shape",children:e.jsxs(r.p,{children:["A ShardScript native library is any shared library (",e.jsx(t,{children:".dll"})," on Windows, ",e.jsx(t,{children:".so"})," on Linux, ",e.jsx(t,{children:".dylib"})," on macOS) that exports the two C-linkage symbols ",e.jsx(t,{children:"ShardLib_GetMetadata"})," and ",e.jsx(t,{children:"ShardLib_EntryPoint"}),". It can be built from one or many C++ source files, live inside ",e.jsx(t,{children:"ShardScript.Framework"})," or in a completely separate project, and links against the ShardScript runtime shared library using headers from ",e.jsx(t,{children:"ShardScript/include"}),". For the full registration contract, see ",e.jsx(t,{children:"native-library-overview.mdx"}),"."]})}),`
`,e.jsx(d,{tone:"blue",children:e.jsxs(r.p,{children:["Match operand order exactly. The compiler maps ",e.jsx(t,{children:"left + right"}),` to the parameter list in
the order you registered it. Swapping `,e.jsx(t,{children:'AddParameter(L"left", ...)'})," and"," ",`
`,e.jsx(t,{children:'AddParameter(L"right", ...)'})," changes the semantic meaning of the operator."]})}),`
`,e.jsx(d,{tone:"amber",title:"Delimeter overloads are for dynamic member access",children:e.jsxs(r.p,{children:["Overloading ",e.jsx(t,{children:"TokenType::Delimeter"}),` lets a static type intercept dot access, such as
reading environment variables by name. Ordinary field and property access does not require a delimeter
operator.`]})}),`
`,e.jsx(l,{children:"Examples"}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Vector2 operators and cast."})," The following library registers a ",e.jsx(t,{children:"Vector2"})," ",`
type with addition, subtraction, equality, and a cast to `,e.jsx(t,{children:"string"}),`. The subtraction
operator uses instance linking so `,e.jsx(t,{children:"context.Args[0]"})," is the left-hand vector."]})}),`
`,e.jsx(i,{code:`#include <ShardScript.hpp>

using namespace shard;

static ClassSymbol* g_vectorClass = nullptr;
static FieldSymbol* g_xField = nullptr;
static FieldSymbol* g_yField = nullptr;

static ObjectInstance* vector_add(const CallState& context)
{
  ObjectInstance* left = context.Args[0];
  ObjectInstance* right = context.Args[1];

  double x1 = left->GetField(g_xField->SlotIndex)->AsDouble();
  double y1 = left->GetField(g_yField->SlotIndex)->AsDouble();
  double x2 = right->GetField(g_xField->SlotIndex)->AsDouble();
  double y2 = right->GetField(g_yField->SlotIndex)->AsDouble();

  ObjectInstance* result = context.Collector.AllocateInstance(g_vectorClass);
  result->SetField(g_xField->SlotIndex, context.Collector.FromValue(x1 + x2));
  result->SetField(g_yField->SlotIndex, context.Collector.FromValue(y1 + y2));
  return result;
}

static ObjectInstance* vector_subtract(const CallState& context)
{
  // LINK_INSTANCE: this is Args[0], the right operand is Args[1].
  ObjectInstance* self = context.Args[0];
  ObjectInstance* other = context.Args[1];

  double x1 = self->GetField(g_xField->SlotIndex)->AsDouble();
  double y1 = self->GetField(g_yField->SlotIndex)->AsDouble();
  double x2 = other->GetField(g_xField->SlotIndex)->AsDouble();
  double y2 = other->GetField(g_yField->SlotIndex)->AsDouble();

  ObjectInstance* result = context.Collector.AllocateInstance(g_vectorClass);
  result->SetField(g_xField->SlotIndex, context.Collector.FromValue(x1 - x2));
  result->SetField(g_yField->SlotIndex, context.Collector.FromValue(y1 - y2));
  return result;
}

static ObjectInstance* vector_equals(const CallState& context)
{
  ObjectInstance* left = context.Args[0];
  ObjectInstance* right = context.Args[1];

  double x1 = left->GetField(g_xField->SlotIndex)->AsDouble();
  double y1 = left->GetField(g_yField->SlotIndex)->AsDouble();
  double x2 = right->GetField(g_xField->SlotIndex)->AsDouble();
  double y2 = right->GetField(g_yField->SlotIndex)->AsDouble();

  bool equal = (x1 == x2) && (y1 == y2);
  return context.Collector.FromValue(equal);
}

static ObjectInstance* vector_to_string(const CallState& context)
{
  ObjectInstance* value = context.Args[0];

  double x = value->GetField(g_xField->SlotIndex)->AsDouble();
  double y = value->GetField(g_yField->SlotIndex)->AsDouble();

  std::wstring text = L"(" + std::to_wstring(x) + L", " + std::to_wstring(y) + L")";
  return context.Collector.FromValue(text);
}

SHARDLIB_ENTRYPOINT
{
  SymbolBuilder<NamespaceSymbol> math(context, L"math");

  SymbolBuilder<ClassSymbol> vectorClass = math.AddClass(L"Vector2", ACS_PUBLIC, LINK_INSTANCE);
  g_vectorClass = vectorClass.Get();

  g_xField = vectorClass.AddField(L"X", TYPE_DOUBLE, LINK_INSTANCE, ACS_PUBLIC);
  g_yField = vectorClass.AddField(L"Y", TYPE_DOUBLE, LINK_INSTANCE, ACS_PUBLIC);

  vectorClass.AddInit()
      .AddParameter(L"x", TYPE_DOUBLE)
      .AddParameter(L"y", TYPE_DOUBLE)
      .SetCallback([](const CallState& context)
      {
          ObjectInstance* self = context.Args[0];
          self->SetField(g_xField->SlotIndex, context.Args[1]);
          self->SetField(g_yField->SlotIndex, context.Args[2]);
          return self;
      });

  vectorClass.AddOperator(shard::TokenType::AddOperator, g_vectorClass, LINK_STATIC)
      .AddParameter(L"left", g_vectorClass)
      .AddParameter(L"right", g_vectorClass)
      .SetCallback(&vector_add);

  vectorClass.AddOperator(shard::TokenType::SubOperator, g_vectorClass, LINK_INSTANCE)
      .AddParameter(L"other", g_vectorClass)
      .SetCallback(&vector_subtract);

  vectorClass.AddOperator(shard::TokenType::EqualsOperator, TYPE_BOOL, LINK_STATIC)
      .AddParameter(L"left", g_vectorClass)
      .AddParameter(L"right", g_vectorClass)
      .SetCallback(&vector_equals);

  vectorClass.AddCastOperator(TYPE_STRING, LINK_STATIC)
      .AddParameter(L"value", g_vectorClass)
      .SetCallback(&vector_to_string);
}`,language:"cpp",filename:"math.shard.cpp"}),`
`,e.jsx(s,{children:e.jsx(r.p,{children:"ShardScript usage:"})}),`
`,e.jsx(i,{code:`using stdio;
using math;

namespace demo;

public static func Main() -> void
{
  a: Vector2 = new Vector2(1.0, 2.0);
  b: Vector2 = new Vector2(3.0, 4.0);

  c: Vector2 = a + b;
  d: Vector2 = a - b;

  text: string = c as string;
  println(text);

  if (c == d)
  {
      println("equal");
  }
  else
  {
      println("different");
  }
}`,language:"csharp"}),`
`,e.jsx(l,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx(t,{children:"library-building/class-symbol-builder"})," — registering the operand type."]})}),e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx(t,{children:"library-building/method-symbol-builder"})," — registering named methods."]})}),e.jsx(n,{children:e.jsxs(r.p,{children:[e.jsx(t,{children:"library-building/working-with-objects"})," — allocating objects in operator callbacks."]})})]}),`
`,e.jsx(l,{children:"Source"}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:["The native side of this API is implemented in ",e.jsx(t,{children:"shard/semantic/SymbolBuilder.hpp"}),`.
View the source on GitHub: `,e.jsx(t,{children:"https://github.com/Rikitav/ShardScript/blob/main/ShardScript/include/shard/semantic/SymbolBuilder.hpp"}),"."]})})]})}function p(a={}){const{wrapper:r}=a.components||{};return r?e.jsx(r,{...a,children:e.jsx(h,{...a})}):h(a)}function o(a,r){throw new Error("Expected component `"+a+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
