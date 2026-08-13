import{j as e}from"./index-BQw6jbtc.js";function h(r){const t={code:"code",em:"em",p:"p",...r.components},{Bullet:a,Callout:d,CodeBlock:o,DocsTable:l,H2:i,InlineCode:n,Prose:s}=t;return a||c("Bullet"),d||c("Callout"),o||c("CodeBlock"),l||c("DocsTable"),i||c("H2"),n||c("InlineCode"),s||c("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(i,{children:"Summary"}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:["The ",e.jsx(n,{children:"shard.debug"}),` library exposes four top-level static functions in the
`,e.jsx(n,{children:"debug"}),` namespace for runtime introspection and diagnostic output:
`,e.jsx(n,{children:"typeof"}),", ",e.jsx(n,{children:"sizeof"}),", ",e.jsx(n,{children:"PrintStackFrameInfo"}),`,
and `,e.jsx(n,{children:"PrintGcInfo"}),`. They are native callbacks, not instance methods, and are
intended for debugging and profiling rather than production logic.`]})}),`
`,e.jsx(i,{children:"Syntax"}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:["Every member is registered with ",e.jsx(n,{children:"LINK_STATIC"}),` directly on the
`,e.jsx(n,{children:"debug"})," namespace. After ",e.jsx(n,{children:"using debug;"}),` the functions
are called by name; otherwise they can be qualified as `,e.jsx(n,{children:"debug.typeof(x)"}),`,
`,e.jsx(n,{children:"debug.sizeof(x)"}),", and so on."]})}),`
`,e.jsx(o,{code:`using stdio;
using debug;

namespace demo;

public static func Main() -> void
{
  // Direct call after importing the namespace.
  println(typeof(42));

  // Fully-qualified call.
  println(debug.sizeof(42));
}`,language:"csharp",filename:"debug_syntax.shard"}),`
`,e.jsx(l,{headers:["Function","Signature"],rows:[[e.jsx(t.code,{children:"typeof"}),e.jsx(e.Fragment,{children:e.jsx(n,{children:"typeof(instance: any) -> string"})})],[e.jsx(t.code,{children:"sizeof"}),e.jsx(e.Fragment,{children:e.jsx(n,{children:"sizeof(instance: any) -> int"})})],[e.jsx(t.code,{children:"PrintGcInfo"}),e.jsx(e.Fragment,{children:e.jsx(n,{children:"PrintGcInfo() -> void"})})],[e.jsx(t.code,{children:"PrintStackFrameInfo"}),e.jsx(e.Fragment,{children:e.jsx(n,{children:"PrintStackFrameInfo() -> void"})})]]}),`
`,e.jsx(i,{children:"Parameters / Arguments"}),`
`,e.jsx(l,{headers:["Function","Parameter","Type","Description"],rows:[[e.jsx(t.code,{children:"typeof"}),e.jsx(t.code,{children:"instance"}),e.jsx(t.code,{children:"any"}),"The value whose runtime type name is requested."],[e.jsx(t.code,{children:"sizeof"}),e.jsx(t.code,{children:"instance"}),e.jsx(t.code,{children:"any"}),"The value whose payload size is requested."],[e.jsx(t.code,{children:"PrintGcInfo"}),e.jsx(t.em,{children:"none"}),e.jsx(t.em,{children:"none"}),"Takes no arguments."],[e.jsx(t.code,{children:"PrintStackFrameInfo"}),e.jsx(t.em,{children:"none"}),e.jsx(t.em,{children:"none"}),"Takes no arguments."]]}),`
`,e.jsx(i,{children:"Returns"}),`
`,e.jsx(l,{headers:["Function","Return Type","Description"],rows:[[e.jsx(t.code,{children:"typeof"}),e.jsx(t.code,{children:"string"}),"The instance's runtime type name as stored in its type-info pointer."],[e.jsx(t.code,{children:"sizeof"}),e.jsx(t.code,{children:"int"}),"The instance's payload size in bytes from the TypeShape / TypeSymbol."],[e.jsx(t.code,{children:"PrintGcInfo"}),e.jsx(t.code,{children:"void"}),"Writes a dump of every live ObjectInstance to native stdout."],[e.jsx(t.code,{children:"PrintStackFrameInfo"}),e.jsx(t.code,{children:"void"}),"Writes a dump of locals from the calling stack frame to native stdout."]]}),`
`,e.jsx(d,{tone:"amber",title:"sizeof registration inconsistency",children:e.jsxs(t.p,{children:["The native registration for ",e.jsx(n,{children:"sizeof"})," currently declares a"," ",`
`,e.jsx(n,{children:"string"}),` return type, but the implementation returns a 64-bit integer. The
documented signature reflects the intended behavior.`]})}),`
`,e.jsx(i,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(a,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Null argument to typeof"})," — Passing"," ",`
`,e.jsx(n,{children:"null"})," throws a ",e.jsx(n,{children:"RuntimeException"})," with the message"," ",`
`,e.jsx(n,{children:'"cannot get type of null instance"'}),"."]})}),e.jsx(a,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Null argument to sizeof"})," — Passing"," ",`
`,e.jsx(n,{children:"null"})," throws a ",e.jsx(n,{children:"RuntimeException"})," with the message"," ",`
`,e.jsx(n,{children:'"cannot get size of null instance"'}),"."]})}),e.jsx(a,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Output channel mismatch"})," —"," ",`
`,e.jsx(n,{children:"PrintGcInfo"})," and ",e.jsx(n,{children:"PrintStackFrameInfo"}),` write through
native `,e.jsx(n,{children:"std::wcout"}),", not through the ",e.jsx(n,{children:"stdio"}),` library.
Their output appears on the process stdout, but it is not returned as a string and cannot be
captured with `,e.jsx(n,{children:"println"}),"."]})})]}),`
`,e.jsx(i,{children:"Remarks"}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Top-level static functions."}),` Unlike most standard-library APIs that live on a class
such as `,e.jsx(n,{children:"Math"})," or ",e.jsx(n,{children:"Environment"}),`, the debug helpers are
attached directly to the `,e.jsx(n,{children:"debug"})," namespace via"," ",`
`,e.jsx(n,{children:"debug.AddMethod(...)"}),". They accept ",e.jsx(n,{children:"TYPE_ANY"}),`, so any
ShardScript value can be passed to `,e.jsx(n,{children:"typeof"})," and ",e.jsx(n,{children:"sizeof"}),"."]})}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"typeof returns the symbol name, not the full name."})," The function reads"," ",`
`,e.jsx(n,{children:"instance->getInfo()->Name"}),`. For user-defined classes this is the
identifier from the `,e.jsx(n,{children:"class"}),` declaration, not the namespace-qualified full
name. For generic instances it returns the underlying type name without type arguments; for example,
a `,e.jsx(n,{children:"List<int>"})," reports ",e.jsx(n,{children:"List"}),`. For primitives the
internal symbol names are returned:`]})}),`
`,e.jsx(l,{headers:["ShardScript type","typeof result"],rows:[[e.jsx(t.code,{children:"bool"}),e.jsx(t.code,{children:"Boolean"})],[e.jsx(t.code,{children:"int"}),e.jsx(t.code,{children:"Integer"})],[e.jsx(t.code,{children:"double"}),e.jsx(t.code,{children:"Double"})],[e.jsx(t.code,{children:"char"}),e.jsx(t.code,{children:"Char"})],[e.jsx(t.code,{children:"byte"}),e.jsx(t.code,{children:"Byte"})],[e.jsx(t.code,{children:"string"}),e.jsx(t.code,{children:"String"})],[e.jsx(t.code,{children:"T[]"}),e.jsx(t.code,{children:"Array"})]]}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"sizeof reports the type payload, not the total GC allocation."}),` The value comes from
`,e.jsx(n,{children:"instance->getInfo()->MemoryBytesSize"}),`, which is the size recorded by the
layout pass. For classes this includes every field slot. For arrays it includes the length field plus
all element slots. It does `,e.jsx("em",{children:"not"})," include the fixed ",e.jsx(n,{children:"ObjectInstance"}),` header
that the GC attaches to every heap object, nor does it include external allocations such as the
character buffer owned by a `,e.jsx(n,{children:"String"}),"."]})}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"PrintGcInfo walks the entire GC heap."})," It iterates"," ",`
`,e.jsx(n,{children:"Collector.Heap"}),` and prints the raw pointer, type name, and reference counter for
every live object, followed by the total count. The dump includes compiler-generated objects such as
async state-machine instances and delegate closures, not just values created by user code.`]})}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"PrintStackFrameInfo is intended to dump caller locals."}),` The implementation reads the
previous stack frame and iterates over its evaluation-stack locals. Because the helper derives the
local count from its own `,e.jsx(n,{children:"MethodSymbol"}),` rather than the caller's, it currently
reports zero locals in most real-world cases.`]})}),`
`,e.jsx(d,{tone:"amber",title:"PrintStackFrameInfo limitation",children:e.jsxs(t.p,{children:["In the current ",e.jsx(n,{children:"shard.debug"})," build, ",e.jsx(n,{children:"PrintStackFrameInfo"})," ",`
prints a header and then reports `,e.jsx(n,{children:"Total count : 0"}),`. It does not yet list the
caller's local variables. Use it only as a placeholder; for detailed inspection, prefer`," ",`
`,e.jsx(n,{children:"PrintGcInfo"})," or the VM disassembler."]})}),`
`,e.jsx(i,{children:"Examples"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"typeof and sizeof on primitives and a user-defined class."})}),`
`,e.jsx(o,{code:`using stdio;
using debug;

namespace demo;

public class Point
{
  public X: double;
  public Y: double;
}

public static func Main() -> void
{
  i: int = 42;
  d: double = 3.14;
  s: string = "shard";
  b: bool = true;

  p: Point = new Point();
  p.X = 1.0;
  p.Y = 2.0;

  // typeof returns the runtime type name stored in the instance type info.
  println(typeof(i));   // Integer
  println(typeof(d));   // Double
  println(typeof(s));   // String
  println(typeof(b));   // Boolean
  println(typeof(p));   // Point

  // sizeof returns the payload size recorded in the type shape.
  println(sizeof(i));   // 8
  println(sizeof(d));   // 8
  println(sizeof(s));   // 16  (length field + data pointer)
  println(sizeof(b));   // 1
  println(sizeof(p));   // 16  (two double fields)
}`,language:"csharp",filename:"debug_type_and_size.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"typeof and sizeof on arrays and generic collections."})}),`
`,e.jsx(o,{code:`using stdio;
using debug;
using collections;

namespace demo;

public static func Main() -> void
{
  nums: int[] = [10, 20, 30];
  list: List<int> = new List<int>();
  list.Add(100);

  // Arrays report the element container type, not the element type.
  println(typeof(nums));   // Array

  // Generic instances report the underlying type name without type arguments.
  println(typeof(list));   // List

  // sizeof for an array includes the length field plus every element slot.
  println(sizeof(nums));   // 32 on 64-bit platforms (8 + 3 * 8)

  // sizeof for a List measures the class payload, not the managed array behind it.
  println(sizeof(list));   // implementation-defined
}`,language:"csharp",filename:"debug_collections.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Dumping the GC heap with PrintGcInfo."})}),`
`,e.jsx(o,{code:`using stdio;
using debug;

namespace demo;

public static func Main() -> void
{
  // Allocate a few objects so the heap dump is non-empty.
  a: string = "first";
  b: string = "second";
  c: object = new object();

  // Dump every live ObjectInstance to native stdout.
  PrintGcInfo();

  println("done");
}`,language:"csharp",filename:"debug_gc_info.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Handling null safely and avoiding common mistakes."})}),`
`,e.jsx(o,{code:`using stdio;
using debug;

namespace demo;

public static func Main() -> void
{
  o: object = null;

  // typeof(null) and sizeof(null) throw before returning.
  // Guard against null when the value is not guaranteed to exist.
  if (o != null)
  {
      println(typeof(o));
      println(sizeof(o));
  }
  else
  {
      println("value is null; skipping introspection");
  }

  // Do not use sizeof() to measure the total GC heap or a string's character data.
  // It reports only the type payload stored in the type shape.
}`,language:"csharp",filename:"debug_null_safety.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"PrintStackFrameInfo and its current behavior."})}),`
`,e.jsx(o,{code:`using stdio;
using debug;

namespace demo;

public static func Main() -> void
{
  name: string = "shard";
  count: int = 7;

  // Currently reports zero locals because the helper uses its own local count.
  PrintStackFrameInfo();

  // Keep the locals alive so they are not optimized away.
  println(name);
  println(count);
}`,language:"csharp",filename:"debug_stack_frame.shard"}),`
`,e.jsx(d,{tone:"blue",children:e.jsxs(t.p,{children:["Use ",e.jsx(n,{children:"typeof"})," and ",e.jsx(n,{children:"sizeof"}),` for quick runtime assertions and
diagnostics. Keep `,e.jsx(n,{children:"PrintGcInfo"}),` calls out of hot paths: it acquires the heap
vector and prints one line per live object, which is `,e.jsx(n,{children:"O(n)"}),` in the number of
allocated objects.`]})}),`
`,e.jsx(i,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(a,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"VM Inspection"})," — disassembling bytecode and dumping runtime frames."]})}),e.jsx(a,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"Type Introspection"})," — runtime type inspection complementary to ",e.jsx(n,{children:"typeof"}),"."]})})]}),`
`,e.jsx(i,{children:"Source"}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:["The ",e.jsx(n,{children:"shard.debug"})," implementation ships as part of"," ",`
`,e.jsx(n,{children:"ShardScript.Framework"}),". The native binding for ",e.jsx(n,{children:"typeof"}),","," ",`
`,e.jsx(n,{children:"sizeof"}),", ",e.jsx(n,{children:"PrintGcInfo"}),", and"," ",`
`,e.jsx(n,{children:"PrintStackFrameInfo"})," is in"," ",`
`,e.jsx(n,{children:"ShardScript.Framework/system/debug.shard.cpp"}),"."]})})]})}function u(r={}){const{wrapper:t}=r.components||{};return t?e.jsx(t,{...r,children:e.jsx(h,{...r})}):h(r)}function c(r,t){throw new Error("Expected component `"+r+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};
