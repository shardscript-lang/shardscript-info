import{j as e}from"./index-IfqX08ny.js";function h(a){const t={code:"code",p:"p",...a.components},{Bullet:i,Callout:o,CodeBlock:r,DocsTable:d,H2:l,InlineCode:n,Prose:s}=t;return i||c("Bullet"),o||c("Callout"),r||c("CodeBlock"),d||c("DocsTable"),l||c("H2"),n||c("InlineCode"),s||c("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(l,{children:"Summary"}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:["A ",e.jsx(n,{children:"TypeShape"}),` is the runtime memory-layout descriptor that the compiler
generates for every class, struct, array, and closed generic type. It maps each instance field to
a numbered `,e.jsx(n,{children:"SlotIndex"})," at a fixed byte ",e.jsx(n,{children:"Offset"}),`,
turning field access into constant-time pointer arithmetic and giving every generic instantiation
a concrete, non-erased layout.`]})}),`
`,e.jsx(l,{children:"Syntax"}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"TypeShape"}),` is not constructed from ShardScript source. It is produced
automatically by the compiler's `,e.jsx(n,{children:"LayoutGenerator"}),` and cached by the
runtime's `,e.jsx(n,{children:"TypeShapeCache"}),`. The resulting descriptor has the following
public structure inside the VM:`]})}),`
`,e.jsx(r,{code:`class TypeShape
{
public:
  TypeSymbol* BaseType;                      // the type this shape describes
  std::vector<TypeSymbol*> GenericArguments; // concrete args for a closed generic
  std::size_t Size;                          // total inline size in bytes

  struct SlotInfo
  {
      std::size_t Offset;                    // byte offset inside the instance
      TypeShape* FieldShape;                 // layout descriptor of the field's type
  };

  std::vector<SlotInfo> Slots;               // one entry per instance field slot
};`,language:"cpp",filename:"typeshape.hpp"}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:["Each ",e.jsx(n,{children:"FieldSymbol"}),` carries the slot metadata that the compiler bakes into
bytecode:`]})}),`
`,e.jsx(d,{headers:["Symbol member","Type","Meaning"],rows:[[e.jsx(t.code,{children:"SlotIndex"}),"uint32","Sequential slot number used by LOADFIELD / STOREFIELD."],[e.jsx(t.code,{children:"MemoryBytesOffset"}),"size_t","Byte offset of the field inside the instance block."],[e.jsx(t.code,{children:"ReturnType"}),"TypeSymbol*","The declared type of the field."]]}),`
`,e.jsx(l,{children:"Parameters / Arguments"}),`
`,e.jsx(s,{children:e.jsx(t.p,{children:`The layout generator takes the semantic model and produces one shape for every type that has
instance fields. The shape is parameterised by:`})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"BaseType"})," — the ",e.jsx(n,{children:"TypeSymbol"}),`
`," ","being laid out. For ",e.jsx(n,{children:"Container<int>"}),` this is the generic
container type; for `,e.jsx(n,{children:"Point"})," it is the struct type itself."]})}),e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"GenericArguments"}),` — the concrete type arguments
`," ","that substitute the type parameters when the shape describes a closed generic instantiation."]})}),e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Fields"}),` — every non-static instance field declared
`," ",`on the type, in declaration order. Static fields live outside instance memory and do not
`," ","receive slots."]})}),e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Inlining mode"}),` — value types
`," ","(",e.jsx(n,{children:"ByValue"}),`) are embedded inline; reference types
`," ","(",e.jsx(n,{children:"ByReference"}),`) occupy a pointer-sized slot and point at a separate
`," ","heap object."]})})]}),`
`,e.jsx(l,{children:"Returns"}),`
`,e.jsx(d,{headers:["Shape output","Description"],rows:[[e.jsx(t.code,{children:"Size"}),"Total number of bytes required for one instance, including inline value-type fields and pointer slots."],[e.jsx(t.code,{children:"Slots[slot]"}),"A SlotInfo containing the byte offset and the field type shape."],[e.jsx(t.code,{children:"TypeShapeCache entry"}),"An interned shape keyed by (BaseType, GenericArguments)."]]}),`
`,e.jsx(l,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Recursive struct inlining"}),` — A struct that contains
`," ",`itself directly or transitively by value causes a compile-time error from
`," ",e.jsx(n,{children:"LayoutGenerator::FixObjectLayout"}),"."]})}),e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Slot index out of range"}),` — Calling
`," ",e.jsx(n,{children:"TypeShape::GetOffset(slot)"}),` or
`," ",e.jsx(n,{children:"GetFieldShape(slot)"}),` with a slot greater than or equal to
`," ",e.jsx(n,{children:"Slots.size()"})," throws ",e.jsx(n,{children:"std::out_of_range"}),"."]})}),e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Type not found"}),` —
`," ",e.jsx(n,{children:"Type.GetType(name)"}),` throws a runtime exception when no type with the
`," ","given name or full name exists in the symbol table."]})}),e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Null reflection target"}),` —
`," ",e.jsx(n,{children:"Type.Of(null)"}),` returns the null instance rather than a
`," ",e.jsx(n,{children:"Type"})," object."]})})]}),`
`,e.jsx(l,{children:"Remarks"}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Layout pass."})," After semantic analysis, ",e.jsx(n,{children:"LayoutGenerator::Generate"}),`
`," ",`walks every type in the symbol table. For each non-static instance field it assigns the next
`," ","available ",e.jsx(n,{children:"SlotIndex"}),` and records the current
`," ",e.jsx(n,{children:"MemoryBytesOffset"}),`. The running offset is advanced by the inline size
`," ","of the field type, which is itself laid out recursively before the containing type."]})}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Value types versus reference types."}),` A field whose type is a value type
`," ","(",e.jsx(n,{children:"int"}),", ",e.jsx(n,{children:"double"}),", ",e.jsx(n,{children:"bool"}),`,
`," ",e.jsx(n,{children:"char"}),", ",e.jsx(n,{children:"byte"}),`, or a
`," ",e.jsx(n,{children:"struct"}),`) is stored inline at its offset. A field whose type is a
`," ","reference type (",e.jsx(n,{children:"class"}),", ",e.jsx(n,{children:"string"}),`, array) stores
`," ","only an ",e.jsx(n,{children:"ObjectInstance*"}),` pointer at the offset; the actual object lives
`," ",`elsewhere on the GC heap. This distinction is recorded in the type symbol's
`," ",e.jsx(n,{children:"TypeInlining"})," flag."]})}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"ObjectInstance layout."}),` Every object is a small header plus a raw memory block of
`," ",e.jsx(n,{children:"TypeShape::Size"}),` bytes. The header keeps a pointer to the
`," ",e.jsx(n,{children:"TypeSymbol"}),", a pointer to the ",e.jsx(n,{children:"TypeShape"}),`, a
`," ","reference count, and VM bookkeeping flags. Field access is therefore:"]})}),`
`,e.jsx(r,{code:`// VM field read for a reference-type field.
// 'slot' is a compile-time constant taken from the FieldSymbol.
ObjectInstance* ObjectInstance::GetField(std::uint32_t slot)
{
  std::size_t offset = m_shape->GetOffset(slot);       // slot -> byte offset
  void* address = OffsetMemory(offset, sizeof(ObjectInstance*));
  return *static_cast<ObjectInstance**>(address);      // read the pointer
}`,language:"cpp",filename:"objectinstance_getfield.cpp"}),`
`,e.jsx(o,{tone:"blue",children:e.jsxs(t.p,{children:["No hash table is consulted on the hot path. Field access is ",e.jsx(n,{children:"O(1)"})," ",`
pointer arithmetic over contiguous memory. The only map is the `,e.jsx(n,{children:"TypeShapeCache"}),`,
`," ","which is consulted once per closed generic instantiation."]})}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Reified generics."}),` ShardScript generics are reified, not erased. Each closed
`," ","instantiation receives its own ",e.jsx(n,{children:"TypeShape"}),` keyed by
`," ","(",e.jsx(n,{children:"base type"}),", ",e.jsx(n,{children:"generic arguments"}),`). When
`," ",e.jsx(n,{children:"TypeShapeCache::BuildShape"}),` constructs the shape, it substitutes the
`," ",`type parameters into every field and recomputes offsets and total size. Two
`," ",e.jsx(n,{children:"Container<int>"}),` instances share one shape;
`," ",e.jsx(n,{children:"Container<int>"})," and ",e.jsx(n,{children:"Container<string>"}),`
`," ","have distinct shapes."]})}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Static fields."}),` Static fields are omitted from the instance shape. They are
`," ",`allocated once per type and accessed by symbol resolution rather than by slot index. A
`," ",e.jsx(n,{children:"TypeShape"})," describes only instance layout."]})}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Arrays."}),` Array shapes are a special case. The shape size is
`," ",e.jsx(n,{children:"Array header size + elementShape->Size * Length"}),`. The elements are
`," ",`stored inline after the array header, and element access uses the element shape to compute
`," ","offsets."]})}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Reflection integration."})," The ",e.jsx(n,{children:"shard.reflection"}),` library wraps
`," ","the same compiler symbols. ",e.jsx(n,{children:"Type.Of(instance)"}),` reads
`," ",e.jsx(n,{children:"instance->getInfo()"}),"; ",e.jsx(n,{children:"Type.GetFields()"}),` returns
`," ",e.jsx(n,{children:"FieldInfo"})," objects backed by the same ",e.jsx(n,{children:"FieldSymbol"}),`
`," ","records that carry the slot index and byte offset. The ",e.jsx(n,{children:"Type"}),` class itself
`," ","is a normal class with its own ",e.jsx(n,{children:"TypeShape"}),`, so reflection on a
`," ",e.jsx(n,{children:"Type"})," instance is laid out exactly like any other object."]})}),`
`,e.jsx(o,{tone:"amber",title:"Reflection status",children:e.jsxs(t.p,{children:[`Reflection is implemented but still experimental. FieldInfo and PropertyInfo expose name, type,
`," ",`and static-ness, but they do not yet surface the underlying slot index or byte offset to
`," ",`ShardScript code. Accessing fields by reflection is not supported; use normal field access
`," ","for production code."]})}),`
`,e.jsx(l,{children:"Examples"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Inspecting a type through reflection."})}),`
`,e.jsx(r,{code:`using stdio;
using collections;
using reflection;

namespace demo;

public class Counter
{
  public Name: string;
  public Count: int;

  public init(name: string)
  {
      this.Name = name;
      this.Count = 0;
  }
}

public static func Main() -> void
{
  c: Counter = new Counter("ticks");
  t: Type = Type.Of(c);

  println("type: " + t.FullName);
  println("is class: " + t.IsClass);
  println("is generic: " + t.IsGeneric);

  fields: FieldInfo[] = t.GetFields();
  println("fields: " + fields.Length);

  foreach (f: FieldInfo in fields)
  {
      println("  " + f.Name + " : " + f.FieldType.Name + " (static=" + f.IsStatic + ")");
  }
}`,language:"csharp",filename:"reflection_typeshape.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Generic instantiations have distinct shapes."})}),`
`,e.jsx(r,{code:`using stdio;
using collections;
using reflection;

namespace demo;

public static func Main() -> void
{
  ints: List<int> = new List<int>();
  strings: List<string> = new List<string>();

  typeInts: Type = Type.Of(ints);
  typeStrings: Type = Type.Of(strings);

  println(typeInts.FullName);              // the closed generic name
  println(typeStrings.FullName);
  println(typeInts.IsGeneric);             // true
  println(typeStrings.IsGeneric);          // true

  // The two closed instantiations are different runtime types.
  println(typeInts == typeStrings);        // false

  // Enumerating the fields shows the concrete substituted field types.
  println("List<int> fields:");
  foreach (f: FieldInfo in typeInts.GetFields())
  {
      println("  " + f.Name + " : " + f.FieldType.Name);
  }
}`,language:"csharp",filename:"generic_shapes.shard"}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Value types are embedded inline."})," The ",e.jsx(n,{children:"Point"}),` struct below
`," ","has two ",e.jsx(n,{children:"int"}),` fields. Its shape is 16 bytes with slot 0 at offset 0 and
`," ","slot 1 at offset 8."]})}),`
`,e.jsx(r,{code:`using stdio;

namespace demo;

public struct Point
{
  public X: int;
  public Y: int;
}

public static func Main() -> void
{
  p: Point = new Point();
  p.X = 3;
  p.Y = 4;

  println(p.X);   // 3
  println(p.Y);   // 4
}`,language:"csharp",filename:"struct_inline.shard"}),`
`,e.jsx(o,{tone:"blue",children:e.jsxs(t.p,{children:["Because ",e.jsx(n,{children:"Point"})," is a struct, a ",e.jsx(n,{children:"Point"}),` field inside
`," ",`another type is stored inline at its full 16-byte size. A class field, by contrast, stores
`," ","only a pointer."]})}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Common mistake: recursive struct inlining."}),` A struct cannot contain an instance of
`," ","itself by value. Use a reference type or a pointer-sized handle to break the cycle."]})}),`
`,e.jsx(r,{code:`using stdio;

namespace demo;

// ERROR: Recursive struct inlining.
// public struct Node
// {
//     public Value: int;
//     public Next: Node;     // infinite size
// }

// Correct: reference types store a pointer, breaking the cycle.
public class Node
{
  public Value: int;
  public Next: Node;
}

public static func Main() -> void
{
  first: Node = new Node();
  first.Value = 1;
  first.Next = new Node();
  first.Next.Value = 2;

  println(first.Value);       // 1
  println(first.Next.Value);  // 2
}`,language:"csharp",filename:"recursive_struct.shard"}),`
`,e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Common mistake: confusing static and instance fields."}),` Static fields are not part
`," ","of the instance shape and do not appear in ",e.jsx(n,{children:"GetFields()"}),` as instance
`," ","slots."]})}),`
`,e.jsx(r,{code:`using stdio;
using reflection;

namespace demo;

public class Settings
{
  public static Version: int = 1;
  public Name: string;
}

public static func Main() -> void
{
  s: Settings = new Settings();
  s.Name = "demo";

  println(Settings.Version);   // 1
  println(s.Name);             // demo

  // GetFields returns only instance fields; Version is static.
  fields: FieldInfo[] = Type.Of(s).GetFields();
  println("instance fields: " + fields.Length);   // 1
}`,language:"csharp",filename:"static_vs_instance.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Looking up a type by name."})}),`
`,e.jsx(r,{code:`using stdio;
using reflection;

namespace demo;

public static func Main() -> void
{
  intType: Type = Type.GetType("Integer");
  println("name: " + intType.Name);             // Integer
  println("primitive: " + intType.IsPrimitive); // true

  arrayType: Type = Type.GetType("Integer[]");
  println("array: " + arrayType.IsArray);       // true
  println("element: " + arrayType.GetElementType().Name);
}`,language:"csharp",filename:"type_by_name.shard"})]})}function y(a={}){const{wrapper:t}=a.components||{};return t?e.jsx(t,{...a,children:e.jsx(h,{...a})}):h(a)}function c(a,t){throw new Error("Expected component `"+a+"` to be defined: you likely forgot to import, pass, or provide it.")}export{y as default};
