import{j as e}from"./index-BugjY_CW.js";function u(r){const n={code:"code",p:"p",...r.components},{Bullet:i,Callout:d,CodeBlock:o,DocsTable:l,H2:c,InlineCode:t,Prose:s}=n;return i||a("Bullet"),d||a("Callout"),o||a("CodeBlock"),l||a("DocsTable"),c||a("H2"),t||a("InlineCode"),s||a("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(c,{children:"Summary"}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx(t,{children:"Queue<T>"})," and ",e.jsx(t,{children:"Stack<T>"}),` are generic
reference types in the `,e.jsx(t,{children:"shard.collections"}),` library.
`,e.jsx(t,{children:"Queue<T>"}),` stores elements in first-in, first-out (FIFO) order;
`,e.jsx(t,{children:"Stack<T>"}),` stores elements in last-in, first-out (LIFO) order.
Both support insertion, removal, inspection, counting, membership testing, and
`,e.jsx(t,{children:"foreach"})," enumeration by implementing ",e.jsx(t,{children:"IEnumerable<T>"}),"."]})}),`
`,e.jsx(c,{children:"Syntax"}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:["Both types are declared with a single type parameter ",e.jsx(t,{children:"T"}),` and are
instantiated through the parameterless constructor.`]})}),`
`,e.jsx(o,{code:`using stdio;
using collections;

namespace demo;

public static func Main() -> void
{
  // FIFO queue for pending work items.
  queue: Queue<int> = new Queue<int>();

  // LIFO stack for undo history.
  stack: Stack<string> = new Stack<string>();

  println(queue.Count);   // 0
  println(stack.Count);   // 0
}`,language:"csharp",filename:"queue_stack_syntax.shard"}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:["The public surface of ",e.jsx(t,{children:"Queue<T>"})," is:"]})}),`
`,e.jsx(l,{headers:["Member","Parameters","Returns","Description"],rows:[[e.jsx(n.code,{children:"new Queue<T>()"}),"—",e.jsx(n.code,{children:"Queue<T>"}),"Creates an empty queue with zero initial capacity."],[e.jsx(n.code,{children:"Count"}),"—",e.jsx(n.code,{children:"int"}),"Number of elements currently stored."],[e.jsx(n.code,{children:"Enqueue(item: T)"}),e.jsx(n.code,{children:"item: T"}),e.jsx(n.code,{children:"void"}),"Adds the item to the tail of the queue."],[e.jsx(n.code,{children:"Dequeue()"}),"—",e.jsx(n.code,{children:"T"}),"Removes and returns the item at the head of the queue."],[e.jsx(n.code,{children:"Peek()"}),"—",e.jsx(n.code,{children:"T"}),"Returns the item at the head without removing it."],[e.jsx(n.code,{children:"Clear()"}),"—",e.jsx(n.code,{children:"void"}),"Removes every element and releases the backing storage."],[e.jsx(n.code,{children:"Contains(item: T)"}),e.jsx(n.code,{children:"item: T"}),e.jsx(n.code,{children:"bool"}),"Searches head-to-tail for an equal element."],[e.jsx(n.code,{children:"GetEnumerator()"}),"—",e.jsx(n.code,{children:"IEnumerator<T>"}),"Returns an enumerator used by foreach."]]}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:["The public surface of ",e.jsx(t,{children:"Stack<T>"})," is:"]})}),`
`,e.jsx(l,{headers:["Member","Parameters","Returns","Description"],rows:[[e.jsx(n.code,{children:"new Stack<T>()"}),"—",e.jsx(n.code,{children:"Stack<T>"}),"Creates an empty stack with zero initial capacity."],[e.jsx(n.code,{children:"Count"}),"—",e.jsx(n.code,{children:"int"}),"Number of elements currently stored."],[e.jsx(n.code,{children:"Push(item: T)"}),e.jsx(n.code,{children:"item: T"}),e.jsx(n.code,{children:"void"}),"Adds the item to the top of the stack."],[e.jsx(n.code,{children:"Pop()"}),"—",e.jsx(n.code,{children:"T"}),"Removes and returns the item at the top of the stack."],[e.jsx(n.code,{children:"Peek()"}),"—",e.jsx(n.code,{children:"T"}),"Returns the top item without removing it."],[e.jsx(n.code,{children:"Clear()"}),"—",e.jsx(n.code,{children:"void"}),"Removes every element and releases the backing storage."],[e.jsx(n.code,{children:"Contains(item: T)"}),e.jsx(n.code,{children:"item: T"}),e.jsx(n.code,{children:"bool"}),"Searches top-to-bottom for an equal element."],[e.jsx(n.code,{children:"GetEnumerator()"}),"—",e.jsx(n.code,{children:"IEnumerator<T>"}),"Returns an enumerator used by foreach."]]}),`
`,e.jsx(c,{children:"Parameters / Arguments"}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[`Methods that accept arguments expect a value whose type matches the collection's type argument
`,e.jsx(t,{children:"T"}),". Passing an incompatible type is caught at compile time."]})}),`
`,e.jsx(l,{headers:["Method","Parameter","Type","Description"],rows:[[e.jsx(n.code,{children:"Queue.Enqueue(item)"}),e.jsx(n.code,{children:"item"}),e.jsx(n.code,{children:"T"}),"Value to store at the tail."],[e.jsx(n.code,{children:"Queue.Contains(item)"}),e.jsx(n.code,{children:"item"}),e.jsx(n.code,{children:"T"}),"Value to compare against each element."],[e.jsx(n.code,{children:"Stack.Push(item)"}),e.jsx(n.code,{children:"item"}),e.jsx(n.code,{children:"T"}),"Value to store at the top."],[e.jsx(n.code,{children:"Stack.Contains(item)"}),e.jsx(n.code,{children:"item"}),e.jsx(n.code,{children:"T"}),"Value to compare against each element."]]}),`
`,e.jsx(c,{children:"Returns"}),`
`,e.jsx(l,{headers:["Member","Return Type","Description"],rows:[[e.jsx(n.code,{children:"Queue.Count"})/e.jsx(n.code,{children:"Stack.Count"}),e.jsx(n.code,{children:"int"}),"Current number of stored elements."],[e.jsx(n.code,{children:"Queue.Dequeue()"}),e.jsx(n.code,{children:"T"}),"The oldest element, which is removed."],[e.jsx(n.code,{children:"Queue.Peek()"}),e.jsx(n.code,{children:"T"}),"The oldest element, which remains in the queue."],[e.jsx(n.code,{children:"Stack.Pop()"}),e.jsx(n.code,{children:"T"}),"The most recently pushed element, which is removed."],[e.jsx(n.code,{children:"Stack.Peek()"}),e.jsx(n.code,{children:"T"}),"The most recently pushed element, which remains on the stack."],[e.jsx(n.code,{children:"Queue.Contains(item)"})/e.jsx(n.code,{children:"Stack.Contains(item)"}),e.jsx(n.code,{children:"bool"}),"True when an equal element is found."]]}),`
`,e.jsx(c,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Empty queue"})," — Calling"," ",`
`,e.jsx(t,{children:"Queue.Dequeue()"})," or ",e.jsx(t,{children:"Queue.Peek()"})," when"," ",`
`,e.jsx(t,{children:"Count == 0"}),' throws a runtime exception with the message "queue is empty".']})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Empty stack"})," — Calling"," ",`
`,e.jsx(t,{children:"Stack.Pop()"})," or ",e.jsx(t,{children:"Stack.Peek()"})," when"," ",`
`,e.jsx(t,{children:"Count == 0"}),' throws a runtime exception with the message "stack is empty".']})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Type mismatch"}),` — Pushing, enqueuing, or searching with a
value that is not assignable to `,e.jsx(t,{children:"T"})," fails during semantic analysis."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Null reference"})," — Calling an instance method on a"," ",`
`,e.jsx(t,{children:"null"})," collection reference throws at runtime."]})})]}),`
`,e.jsx(c,{children:"Remarks"}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Storage and growth."}),` Both collections are backed by a resizable array.
The initial capacity is zero; the first insertion allocates capacity `,e.jsx(t,{children:"4"}),`,
and the array doubles each time it becomes full. The queue implementation compacts the array
and resets `,e.jsx(t,{children:"_head"})," to ",e.jsx(t,{children:"0"}),` during growth so that
enqueue stays amortized `,e.jsx(t,{children:"O(1)"}),`. Removing elements does not shrink the
array; call `,e.jsx(t,{children:"Clear()"})," to release storage."]})}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsxs("strong",{children:["Equality in ",e.jsx(t,{children:"Contains"}),"."]}),` The collection walks its elements
and compares each against the supplied value. Primitives, characters, booleans, and strings are
compared by value. For all other reference types, equality is reference identity: two distinct
object instances are never equal even if their fields match.`]})}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Enumeration order."}),` A queue enumerates from head to tail, matching the order in
which elements would be dequeued. A stack enumerates from top to bottom, matching the order in
which elements would be popped. Both use lightweight value-type enumerators
(`,e.jsx(t,{children:"QueueEnumerator<T>"})," and ",e.jsx(t,{children:"StackEnumerator<T>"}),`)
that read from the live source collection. Modifying the collection during enumeration is not
supported and may skip, repeat, or unexpectedly terminate elements.`]})}),`
`,e.jsx(d,{tone:"blue",children:e.jsxs(n.p,{children:[e.jsx(t,{children:"Count"})," is a read-only property, not a method. Access it with"," ",`
`,e.jsx(t,{children:"queue.Count"})," and ",e.jsx(t,{children:"stack.Count"}),` — no parentheses are
needed.`]})}),`
`,e.jsx(d,{tone:"amber",children:e.jsxs(n.p,{children:["Only the parameterless constructor is available. There is no capacity constructor, no"," ",`
`,e.jsx(t,{children:"TrimExcess"}),", and no ",e.jsx(t,{children:"TryDequeue"})," /"," ",`
`,e.jsx(t,{children:"TryPop"})," helper in the current release."]})}),`
`,e.jsx(c,{children:"Examples"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Basic FIFO queue."})}),`
`,e.jsx(o,{code:`using stdio;
using collections;

namespace demo;

public static func Main() -> void
{
  queue: Queue<int> = new Queue<int>();

  queue.Enqueue(10);
  queue.Enqueue(20);
  queue.Enqueue(30);

  println(queue.Count);      // 3
  println(queue.Peek());     // 10

  while (queue.Count > 0)
  {
      println(queue.Dequeue()); // 10, 20, 30
  }

  println(queue.Count);      // 0
}`,language:"csharp",filename:"queue_basic.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Basic LIFO stack."})}),`
`,e.jsx(o,{code:`using stdio;
using collections;

namespace demo;

public static func Main() -> void
{
  stack: Stack<int> = new Stack<int>();

  stack.Push(10);
  stack.Push(20);
  stack.Push(30);

  println(stack.Count);      // 3
  println(stack.Peek());     // 30

  while (stack.Count > 0)
  {
      println(stack.Pop());  // 30, 20, 10
  }

  println(stack.Count);      // 0
}`,language:"csharp",filename:"stack_basic.shard"}),`
`,e.jsx(s,{children:e.jsxs("strong",{children:["Membership testing with ",e.jsx(t,{children:"Contains"}),"."]})}),`
`,e.jsx(o,{code:`using stdio;
using collections;

namespace demo;

public static func Main() -> void
{
  stack: Stack<string> = new Stack<string>();
  stack.Push("shard");
  stack.Push("script");
  stack.Push("vm");

  println(stack.Contains("script")); // true
  println(stack.Contains("csharp")); // false

  queue: Queue<int> = new Queue<int>();
  queue.Enqueue(5);
  queue.Enqueue(7);
  queue.Enqueue(9);

  println(queue.Contains(7));  // true
  println(queue.Contains(8));  // false
}`,language:"csharp",filename:"queue_stack_contains.shard"}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Enumeration order."}),` A queue yields elements in enqueue order; a stack yields
elements from the top down.`]})}),`
`,e.jsx(o,{code:`using stdio;
using collections;

namespace demo;

public static func Main() -> void
{
  queue: Queue<char> = new Queue<char>();
  queue.Enqueue('A');
  queue.Enqueue('B');
  queue.Enqueue('C');

  print("queue: ");
  foreach (ch in queue)
  {
      print(ch);   // ABC
  }
  println("");

  stack: Stack<char> = new Stack<char>();
  stack.Push('A');
  stack.Push('B');
  stack.Push('C');

  print("stack: ");
  foreach (ch in stack)
  {
      print(ch);   // CBA
  }
  println("");
}`,language:"csharp",filename:"queue_stack_enumeration.shard"}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Edge case: empty collection operations."})," Always check ",e.jsx(t,{children:"Count"})," ",`
before calling `,e.jsx(t,{children:"Pop"}),", ",e.jsx(t,{children:"Dequeue"}),", or"," ",`
`,e.jsx(t,{children:"Peek"}),", or handle the resulting runtime exception."]})}),`
`,e.jsx(o,{code:`using stdio;
using collections;

namespace demo;

public static func Main() -> void
{
  queue: Queue<int> = new Queue<int>();

  // Safe: guard before removing.
  if (queue.Count > 0)
  {
      println(queue.Dequeue());
  }
  else
  {
      println("queue is empty — skipping dequeue");
  }

  // Alternative: catch the runtime exception.
  try
  {
      queue.Dequeue();
  }
  catch (ex: RuntimeException)
  {
      println("caught dequeue on empty queue");
  }

  queue.Enqueue(42);
  queue.Clear();
  println(queue.Count); // 0
}`,language:"csharp",filename:"queue_stack_empty.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Common mistakes."})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsxs("strong",{className:"text-text-primary",children:["Using ",e.jsx(t,{children:"Length"})," instead of"," ",`
`,e.jsx(t,{children:"Count"}),"."]})," Queues and stacks expose ",e.jsx(t,{children:"Count"}),`;
`,e.jsx(t,{children:"Length"})," belongs to arrays and ",e.jsx(t,{children:"List<T>"}),"."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Assuming a stack enumerates in insertion order."})," ",`
`,e.jsx(t,{children:"foreach"})," on a ",e.jsx(t,{children:"Stack<T>"}),` walks from the top
down, which is the same order as repeated `,e.jsx(t,{children:"Pop()"})," calls."]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Modifying while enumerating."}),` Do not push, pop,
enqueue, or dequeue inside the body of a `,e.jsx(t,{children:"foreach"}),` over the same
collection.`]})}),e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsxs("strong",{className:"text-text-primary",children:["Calling ",e.jsx(t,{children:"Dequeue"})," or"," ",`
`,e.jsx(t,{children:"Pop"})," without checking ",e.jsx(t,{children:"Count"}),"."]}),` On an
empty collection this throws a runtime exception.`]})})]})]})}function x(r={}){const{wrapper:n}=r.components||{};return n?e.jsx(n,{...r,children:e.jsx(u,{...r})}):u(r)}function a(r,n){throw new Error("Expected component `"+r+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
