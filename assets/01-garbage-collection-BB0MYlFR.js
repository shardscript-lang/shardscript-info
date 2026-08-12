import{j as e}from"./index-hFDFiLgA.js";function h(a){const s={p:"p",...a.components},{Bullet:r,Callout:o,CodeBlock:i,DocsTable:d,H2:c,InlineCode:n,Prose:t}=s;return r||l("Bullet"),o||l("Callout"),i||l("CodeBlock"),d||l("DocsTable"),c||l("H2"),n||l("InlineCode"),t||l("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(c,{children:"Introduction"}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[`ShardScript is a hosted, embedded language: every value — integers, strings,
arrays, and class instances — is represented internally as an`," ",`
`,e.jsx(n,{children:"ObjectInstance"}),` that lives on the virtual machine's
heap. The runtime does not require you to allocate or free this memory by hand.
Instead, it uses `,e.jsx("strong",{children:"automatic reference counting"}),` with object
tracking to reclaim instances as soon as they become unreachable.`]})}),`
`,e.jsx(t,{children:e.jsx(s.p,{children:`There is no background collector thread, no stop-the-world pause, and no
non-deterministic finalization queue. When the last reference to an object
disappears, the instance is collected immediately. This makes memory behavior
predictable, which is important when ShardScript is embedded inside games,
real-time tools, or hosts that cannot tolerate arbitrary GC pauses.`})}),`
`,e.jsx(c,{children:"What it is"}),`
`,e.jsx(t,{children:e.jsx(s.p,{children:"The ShardScript garbage collector is three cooperating layers:"})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Allocation layer"})," —"," ",`
`,e.jsx(n,{children:"AllocateInstance"}),", ",e.jsx(n,{children:"AllocateGeneric"}),", and"," ",`
`,e.jsx(n,{children:"AllocateArray"}),` create new objects on the GC heap. Each
object starts with a reference count of `,e.jsx(n,{children:"0"}),` and is registered
in the `,e.jsx(n,{children:"InstancesHeap"}),"."]})}),e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Reference-tracking layer"})," —"," ",`
`,e.jsx(n,{children:"IncrementReference"})," and"," ",`
`,e.jsx(n,{children:"DecrementReference"}),` update a 64-bit counter stored in
every `,e.jsx(n,{children:"ObjectInstance"}),". Singletons and the global"," ",`
`,e.jsx(n,{children:"NullInstance"})," skip counting entirely."]})}),e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Collection layer"})," —"," ",`
`,e.jsx(n,{children:"DestroyInstance"}),` decrements the counter and, when it
reaches zero, removes the object from the heap and calls`," ",`
`,e.jsx(n,{children:"TerminateInstance"}),`. Termination recursively releases
every reference-typed field and array element, then frees the raw memory block.`]})})]}),`
`,e.jsx(t,{children:e.jsx(s.p,{children:"The runtime adjusts reference counts at well-defined moments:"})}),`
`,e.jsx(d,{headers:["Operation","Trigger","Effect"],rows:[["+1","Argument pushed onto a callee frame","The callee holds a live reference for the duration of the call."],["+1","Field or array element assignment","The newly stored value gains an owner."],["+1","Exception raised, re-thrown, or caught","The exception object stays alive during unwinding."],["-1","Old value replaced in field or element","The previous value loses an owner."],["-1","Frame return or POPSTACK opcode","Temporary results and locals are released."]]}),`
`,e.jsx(c,{children:"When to use it"}),`
`,e.jsx(t,{children:e.jsx(s.p,{children:`Automatic memory management is always active; you do not opt in or out. You
rely on it whenever you create objects, arrays, closures, or async tasks.
Because collection is deterministic, you can use it for short-lived scratch
objects in tight loops, large intermediate buffers, and long-lived service
objects held in static fields.`})}),`
`,e.jsx(t,{children:e.jsx(s.p,{children:"The design is most valuable when:"})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Predictable timing matters"}),` —
frame budgets, audio threads, or transaction handlers cannot afford
generational collection pauses.`]})}),e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Hosting safety matters"}),` —
every value is an `,e.jsx(n,{children:"ObjectInstance"}),`, so native host
code never holds dangling script pointers.`]})}),e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Simplicity matters"}),` — there
is no separate managed/unmanaged heap distinction for ordinary script code.`]})})]}),`
`,e.jsx(c,{children:"Remarks"}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Small-integer cache."}),` The runtime pre-allocates 261 cached
integer objects covering the inclusive range `,e.jsx(n,{children:"-5"})," to"," ",`
`,e.jsx(n,{children:"255"}),`. Whenever a literal or arithmetic result falls in
that range, the existing singleton is reused instead of allocating a new
`,e.jsx(n,{children:"int"}),`. This makes small loops and arithmetic nearly
allocation-free. Values outside the cache, such as `,e.jsx(n,{children:"1000"}),`,
are fresh heap allocations and are reference-counted normally.`]})}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Boolean and null singletons."})," ",e.jsx(n,{children:"true"})," and"," ",`
`,e.jsx(n,{children:"false"}),` are lazily allocated once per process and marked
as singletons. `,e.jsx(n,{children:"null"})," is represented by a single global"," ",`
`,e.jsx(n,{children:"NullInstance"}),`. None of these participate in reference
counting, so they are never collected.`]})}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Collection roots."}),` An object stays alive as long as a path of
references reaches it from a root. The primary roots are:`]})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Static fields"}),` — stored in
the `,e.jsx(n,{children:"GarbageCollector"}),` itself and released only at
process shutdown.`]})}),e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Evaluation stack slots"}),` —
local variables, temporaries, and expression results held in the current call
frame.`]})}),e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Async frame owners"}),` — pending
`,e.jsx(n,{children:"Task"})," and ",e.jsx(n,{children:"ValueTask"}),` objects
keep their originating frame alive across await suspension points.`]})})]}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Cyclic references."}),` Pure reference counting cannot collect a
cycle whose members only point to one another. ShardScript handles this during
termination: when one object in a cycle becomes unreachable,`," ",`
`,e.jsx(n,{children:"TerminateInstance"}),` walks every reference-typed field and
array element, recursively decrementing and cascading. As long as the cycle is
detached from all roots, the entire graph is reclaimed.`]})}),`
`,e.jsx(o,{tone:"blue",children:e.jsx(s.p,{children:`Cycles are safe in ShardScript, but only because termination is recursive. A
self-referencing object that is still reachable from a static field or a local
variable will not be collected until that root is released.`})}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Transient instances."}),` Some runtime helpers wrap memory they do
not own, such as value-type fields boxed for reflection-style access. These are
marked transient; termination skips freeing their raw memory because the memory
belongs to another object. Ordinary script objects are never transient.`]})}),`
`,e.jsx(t,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"InstancesHeap."}),` Every allocated object lives in a vector of
smart pointers. Collection removes the pointer from the vector and then
terminates the object. The vector is not compacted; freed slots remain as empty
entries until reused. At shutdown, `,e.jsx(n,{children:"GarbageCollector::Terminate"})," ",`
snapshots the heap and releases every remaining instance, starting with static
fields.`]})}),`
`,e.jsx(o,{tone:"amber",title:"User-defined finalizers are not implemented",children:e.jsxs(s.p,{children:[`The runtime cleans up fields, arrays, and raw memory automatically, but it does
not currently invoke script-level destructors or finalizers. If you need
deterministic release of unmanaged resources such as file handles or sockets,
use `,e.jsx(n,{children:"defer"})," or explicit disposal through"," ",`
`,e.jsx(n,{children:"IDisposable"})," instead of waiting for collection."]})}),`
`,e.jsx(c,{children:"Examples"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Basic allocation and scope-based cleanup."})}),`
`,e.jsx(i,{code:`using stdio;

namespace demo;

public class Widget
{
  public Name: string;
}

public static func Main() -> void
{
  // The new Widget is allocated on the GC heap with reference count 0.
  w: Widget = new Widget();
  w.Name = "gear";

  println(w.Name); // gear

  // When 'w' goes out of scope at the end of Main, the reference count drops
  // to 0 and the Widget instance is collected immediately.
}`,language:"csharp",filename:"gc_basic.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Reference counting through field assignment."})}),`
`,e.jsx(i,{code:`using stdio;

namespace demo;

public class Node
{
  public Value: int;
  public Next: Node;
}

public static func Main() -> void
{
  // Two independent allocations, each with reference count 0.
  a: Node = new Node();
  a.Value = 1;

  b: Node = new Node();
  b.Value = 2;

  // Field assignment increments the new value's reference count.
  a.Next = b;  // b now has one reference.
  b.Next = a;  // a now has one reference.

  // At end of scope:
  // 1. b.Next decrements a -> 0, so a is collected.
  // 2. a.Next decrements b -> 0, so b is collected.
  // The cycle is broken during recursive termination.
}`,language:"csharp",filename:"gc_refcount_cycle.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Small-int cache and singletons."})}),`
`,e.jsx(i,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  // Values from -5 to 255 are served from the pre-allocated cache.
  a: int = 42;
  b: int = 42;

  // Both variables point to the same cached ObjectInstance.
  println(a); // 42
  println(b); // 42

  // The loop variable is cached for every value up to 255; no allocation.
  for (i: int = 0; i < 10; i = i + 1)
  {
      println(i);
  }

  // Values outside the cache are ordinary heap objects.
  big: int = 1000;
  println(big); // 1000

  // Boolean and null are also singletons.
  t: bool = true;
  f: bool = false;
  nothing: Widget = null;

  println(t);       // true
  println(f);       // false
  println(nothing); // (empty/null)
}`,language:"csharp",filename:"gc_cache.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Collection roots: locals versus static fields."})}),`
`,e.jsx(i,{code:`using stdio;

namespace demo;

public class Buffer
{
  public Data: int[];
}

public static class Globals
{
  public static Shared: Buffer;
}

public static func MakeBuffer(size: int) -> Buffer
{
  // The returned Buffer is kept alive by the caller's assignment.
  b: Buffer = new Buffer();
  b.Data = new int[size];
  return b;
}

public static func Main() -> void
{
  // 'local' is a root only while Main is executing.
  local: Buffer = MakeBuffer(4);
  local.Data[0] = 10;
  println(local.Data[0]); // 10

  // 'Globals.Shared' is a static-field root and survives until shutdown.
  Globals.Shared = MakeBuffer(8);
  Globals.Shared.Data[0] = 20;
  println(Globals.Shared.Data[0]); // 20

  // At end of Main, 'local' is released. 'Globals.Shared' remains alive.
}`,language:"csharp",filename:"gc_roots.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"null and NullInstance."})}),`
`,e.jsx(i,{code:`using stdio;

namespace demo;

public class Box
{
  public Content: string;
}

public static func Main() -> void
{
  // Default-initialized reference fields hold null.
  b: Box = new Box();
  println(b.Content); // (empty)

  // Assigning a real value increments its reference count.
  b.Content = "payload";
  println(b.Content); // payload

  // Assigning null decrements the old value's reference count; "payload" is
  // collected because no other reference exists.
  b.Content = null;
  println(b.Content); // (empty)
}`,language:"csharp",filename:"gc_null.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Arrays and element references."})}),`
`,e.jsx(i,{code:`using stdio;

namespace demo;

public class Label
{
  public Text: string;
}

public static func Main() -> void
{
  // An array of reference types; elements start as null.
  labels: Label[] = new Label[3];

  first: Label = new Label();
  first.Text = "first";

  // Storing in the array increments the object's reference count.
  labels[0] = first;
  labels[1] = first; // The same Label now has two references.

  // Overwriting an element decrements the previous value.
  labels[1] = null;  // first drops from 2 to 1.

  // The array itself is released when it goes out of scope, which in turn
  // releases all remaining elements.
  println(labels[0].Text); // first
}`,language:"csharp",filename:"gc_arrays.shard"})]})}function p(a={}){const{wrapper:s}=a.components||{};return s?e.jsx(s,{...a,children:e.jsx(h,{...a})}):h(a)}function l(a,s){throw new Error("Expected component `"+a+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
