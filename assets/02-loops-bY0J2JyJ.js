import{j as e}from"./index-OPpZgTHq.js";function h(t){const i={p:"p",span:"span",...t.components},{Bullet:s,Callout:c,CodeBlock:l,DocsTable:d,H2:o,InlineCode:n,Prose:r}=i;return s||a("Bullet"),c||a("Callout"),l||a("CodeBlock"),d||a("DocsTable"),o||a("H2"),n||a("InlineCode"),r||a("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(o,{children:"Summary"}),`
`,e.jsx(r,{children:e.jsxs(i.p,{children:[`ShardScript provides imperative looping constructs for repeating a block of
code while a condition holds, scanning a sequence, or counting with a
C-style initializer/condition/step header. The language supports`," ",`
`,e.jsx(n,{children:"while"}),", ",e.jsx(n,{children:"until"}),", C-style"," ",`
`,e.jsx(n,{children:"for"}),", ",e.jsx(n,{children:"foreach"}),`, integer range
expressions, and the `,e.jsx(n,{children:"break"})," /"," ",`
`,e.jsx(n,{children:"continue"})," jump statements."]})}),`
`,e.jsx(o,{children:"Syntax"}),`
`,e.jsx(r,{children:e.jsx(i.p,{children:`Every loop body is a statement block enclosed in braces. Conditions are
written inside parentheses.`})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsx(n,{children:"while (condition) { body }"})}),e.jsx(s,{children:e.jsx(n,{children:"until (condition) { body }"})}),e.jsx(s,{children:e.jsx(n,{children:"for (initializer; condition; step) { body }"})}),e.jsx(s,{children:e.jsx(n,{children:"foreach (identifier in enumerable) { body }"})}),e.jsx(s,{children:e.jsxs(i.p,{children:["Half-open range: ",e.jsx(n,{children:"lower..upper"})]})}),e.jsx(s,{children:e.jsxs(i.p,{children:["Inclusive range: ",e.jsx(n,{children:"lower..&upper"})]})}),e.jsx(s,{children:e.jsxs(i.p,{children:[e.jsx(n,{children:"break;"})," and ",e.jsx(n,{children:"continue;"})]})})]}),`
`,e.jsx(r,{children:e.jsxs(i.p,{children:["The condition for ",e.jsx(n,{children:"while"})," and"," ",`
`,e.jsx(n,{children:"until"})," must evaluate to ",e.jsx(n,{children:"bool"}),`.
The C-style `,e.jsx(n,{children:"for"}),` header contains three statements
separated by semicolons: an initializer that runs once, a condition checked
before every iteration, and a step expression run after the body. A`," ",`
`,e.jsx(n,{children:"foreach"}),` loop declares an iteration variable that is
scoped to the body and binds successive elements from any`," ",`
`,e.jsx(n,{children:"IEnumerable<T>"})," source."]})}),`
`,e.jsx(o,{children:"Parameters / Arguments"}),`
`,e.jsx(d,{headers:["Construct","Input","Constraints"],rows:[[e.jsx(n,{children:"while"}),"condition expression","Must evaluate to bool."],[e.jsx(n,{children:"until"}),"condition expression","Must evaluate to bool; body runs while condition is false."],[e.jsxs(i.span,{children:[e.jsx(n,{children:"for"})," initializer"]}),"variable declaration or expression statement","Keyword statements are not allowed here."],[e.jsxs(i.span,{children:[e.jsx(n,{children:"for"})," condition"]}),"expression","Must evaluate to bool."],[e.jsxs(i.span,{children:[e.jsx(n,{children:"for"})," step"]}),"expression statement","Keyword statements are not allowed here."],[e.jsxs(i.span,{children:[e.jsx(n,{children:"foreach"})," identifier"]}),"new local variable name","Scoped to the loop body."],[e.jsxs(i.span,{children:[e.jsx(n,{children:"foreach"})," enumerable"]}),"expression","Must implement IEnumerable<T>."],[e.jsx(n,{children:".."})/e.jsx(n,{children:"..&"}),"lower and upper bounds","Both bounds must be int."]]}),`
`,e.jsx(r,{children:e.jsxs(i.p,{children:["Range expressions are first-class expressions that produce an"," ",`
`,e.jsx(n,{children:"int[]"}),`. They can be assigned to a variable, passed to a
function, or used directly inside `,e.jsx(n,{children:"foreach"}),"."]})}),`
`,e.jsx(o,{children:"Returns"}),`
`,e.jsx(r,{children:e.jsxs(i.p,{children:[`Loop statements do not produce a value. A range expression evaluates to an
array of integers (`,e.jsx(n,{children:"int[]"}),"). ",e.jsx(n,{children:"break"})," ",`
and `,e.jsx(n,{children:"continue"}),` are control-flow statements and also
produce no value.`]})}),`
`,e.jsx(o,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(i.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Non-bool condition"})," —"," ",`
`,e.jsx(n,{children:"while"}),", ",e.jsx(n,{children:"until"}),", and C-style"," ",`
`,e.jsx(n,{children:"for"})," conditions must be boolean expressions."]})}),e.jsx(s,{children:e.jsxs(i.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Invalid range bounds"}),` — Both
sides of `,e.jsx(n,{children:".."})," and ",e.jsx(n,{children:"..&"}),` must
be `,e.jsx(n,{children:"int"}),"."]})}),e.jsx(s,{children:e.jsxs(i.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"foreach source not enumerable"})," —"," ",`
`,e.jsx(n,{children:"foreach"})," requires a type that implements"," ",`
`,e.jsx(n,{children:"IEnumerable<T>"}),`. Plain object references or
unrelated types are rejected at compile time.`]})}),e.jsx(s,{children:e.jsxs(i.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"break / continue outside a loop"})," —"," ",`
Both statements must appear lexically inside a loop body.`]})}),e.jsx(s,{children:e.jsxs(i.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Keyword statement in for header"})," —"," ",`
`,e.jsx(n,{children:"if"}),", ",e.jsx(n,{children:"while"}),","," ",`
`,e.jsx(n,{children:"foreach"}),`, and similar keyword statements cannot be
used as the initializer or step of a C-style `,e.jsx(n,{children:"for"}),"."]})}),e.jsx(s,{children:e.jsxs(i.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Division / modulo by zero"}),` — Any
arithmetic in a loop condition or step that divides or modulos by zero throws
at runtime.`]})})]}),`
`,e.jsx(o,{children:"Remarks"}),`
`,e.jsx(r,{children:e.jsxs(i.p,{children:[e.jsx("strong",{children:"Range semantics."})," A range expression allocates a new"," ",`
`,e.jsx(n,{children:"int[]"}),` containing every integer between the bounds.
`,e.jsx(n,{children:"lower..upper"})," is half-open: it includes"," ",`
`,e.jsx(n,{children:"lower"})," and excludes ",e.jsx(n,{children:"upper"}),`.
`,e.jsx(n,{children:"lower..&upper"}),` is inclusive and also includes the
upper bound. If `,e.jsx(n,{children:"upper"})," is smaller than"," ",`
`,e.jsx(n,{children:"lower"}),`, the array counts downward. Equal bounds yield an
empty array for the half-open operator and a single-element array for the
inclusive operator.`]})}),`
`,e.jsx(r,{children:e.jsxs(i.p,{children:[e.jsx("strong",{children:"foreach implementation."})," The compiler lowers"," ",`
`,e.jsx(n,{children:"foreach"})," to an enumerator pattern: it calls"," ",`
`,e.jsx(n,{children:"GetEnumerator()"}),", then repeatedly calls"," ",`
`,e.jsx(n,{children:"MoveNext()"})," and reads ",e.jsx(n,{children:"Current"})," ",`
until the enumerator reports no more items. This works for arrays, lists,
dictionaries, and any user-defined type that implements`," ",`
`,e.jsx(n,{children:"IEnumerable<T>"}),"."]})}),`
`,e.jsx(c,{tone:"blue",children:e.jsxs(i.p,{children:["Arrays are also ",e.jsx(n,{children:"IEnumerable<T>"}),", so"," ",`
`,e.jsx(n,{children:"foreach"}),` accepts both ranges and array literals
directly.`]})}),`
`,e.jsx(r,{children:e.jsxs(i.p,{children:[e.jsx("strong",{children:"Legacy for-in syntax."})," ShardScript still recognizes"," ",`
`,e.jsx(n,{children:"for (x in ...)"}),` as an older alias, but the compiler
restricts it to array sources. New code should prefer`," ",`
`,e.jsx(n,{children:"foreach"}),` because it accepts any enumerable source and
matches the standard library pattern.`]})}),`
`,e.jsx(r,{children:e.jsxs(i.p,{children:[e.jsx("strong",{children:"break, continue, and defer."})," ",`
`,e.jsx(n,{children:"break"}),` exits the innermost enclosing loop and runs any
deferred statements owned by scopes that are being left.`," ",`
`,e.jsx(n,{children:"continue"}),` jumps to the end of the current loop body,
which is `,e.jsx("em",{children:"before"})," the step expression in a C-style"," ",`
`,e.jsx(n,{children:"for"}),`. Deferred statements inside the loop body are not
executed by `,e.jsx(n,{children:"continue"}),`; if cleanup is required, use an
explicit guard or restructure the loop.`]})}),`
`,e.jsx(r,{children:e.jsxs(i.p,{children:[e.jsx("strong",{children:"Infinite loops."})," A ",e.jsx(n,{children:"while (true)"}),` loop
with no `,e.jsx(n,{children:"break"}),", ",e.jsx(n,{children:"return"}),`, or
throwing path will run forever. The VM does not currently detect or abort such
loops.`]})}),`
`,e.jsx(c,{tone:"amber",title:"Compound assignment in loop steps",children:e.jsxs(i.p,{children:["Compound assignment operators such as ",e.jsx(n,{children:"+="})," and"," ",`
`,e.jsx(n,{children:"-="}),` are parsed but currently lowered as plain
assignments by the VM. Until that is fixed, write the step explicitly — for
example, `,e.jsx(n,{children:"i = i + 1"})," instead of"," ",`
`,e.jsx(n,{children:"i += 1"}),"."]})}),`
`,e.jsx(o,{children:"Examples"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"while and until."})}),`
`,e.jsx(l,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  counter: int = 0;

  // Run while the condition is true.
  while (counter < 3)
  {
      println(counter);            // 0, 1, 2
      counter = counter + 1;
  }

  // until runs while its condition is false.
  countdown: int = 3;
  until (countdown == 0)
  {
      println(countdown);          // 3, 2, 1
      countdown = countdown - 1;
  }
}`,language:"csharp",filename:"while_until.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"C-style for with ascending and descending steps."})}),`
`,e.jsx(l,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  // initializer; condition; step
  for (i: int = 0; i < 5; i = i + 1)
  {
      print(i);
      print(" ");
  }
  println("");                     // 0 1 2 3 4

  // Descending step must be written explicitly; there is no automatic stride.
  for (i: int = 10; i > 0; i = i - 2)
  {
      print(i);
      print(" ");
  }
  println("");                     // 10 8 6 4 2
}`,language:"csharp",filename:"cstyle_for.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Half-open, inclusive, and reverse ranges."})}),`
`,e.jsx(l,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  // 0..3 is half-open: includes 0, 1, 2.
  half: int[] = 0..3;
  println(half.Length);            // 3

  // 0..&3 is inclusive: includes 0, 1, 2, 3.
  full: int[] = 0..&3;
  println(full.Length);            // 4

  // Reverse range counts down.
  down: int[] = 3..0;
  foreach (n in down)
  {
      println(n);                  // 3, 2, 1
  }

  // Edge cases with equal bounds.
  println((5..5).Length);          // 0
  println((5..&5).Length);         // 1
}`,language:"csharp",filename:"ranges.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"foreach over arrays, ranges, and collections."})}),`
`,e.jsx(l,{code:`using stdio;
using collections;

namespace demo;

public static func Main() -> void
{
  // Array literal.
  nums: int[] = [10, 20, 30];
  foreach (n in nums)
  {
      println(n);
  }

  // Range expression.
  foreach (i in 1..5)
  {
      print(i);
      print(" ");
  }
  println("");                     // 1 2 3 4

  // List<T> implements IEnumerable<T>.
  list: List<int> = new List<int>();
  list.Add(100);
  list.Add(200);
  foreach (value in list)
  {
      println(value);
  }
}`,language:"csharp",filename:"foreach.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"break and continue."})}),`
`,e.jsx(l,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  foreach (i in 0..10)
  {
      if (i == 5)
      {
          break;                   // exit the loop entirely
      }

      if (i % 2 == 0)
      {
          continue;                // skip to the next iteration
      }

      println(i);                  // 1, 3
  }
}`,language:"csharp",filename:"break_continue.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Nested loops and early exit."})}),`
`,e.jsx(l,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  // Find the first pair whose product is divisible by 7.
  found: bool = false;

  foreach (a in 2..6)
  {
      foreach (b in 2..6)
      {
          product: int = a * b;
          if (product % 7 == 0)
          {
              println("a=" + a + " b=" + b + " product=" + product);
              found = true;
              break;               // exits only the inner foreach
          }
      }

      if (found)
      {
          break;                   // exits the outer foreach
      }
  }
}`,language:"csharp",filename:"nested_loops.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Common mistakes to avoid."})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(i.p,{children:["Writing ",e.jsx(n,{children:"i += 1"})," in a C-style"," ",`
`,e.jsx(n,{children:"for"}),` step currently behaves like a plain assignment.
Use `,e.jsx(n,{children:"i = i + 1"}),"."]})}),e.jsx(s,{children:e.jsxs(i.p,{children:["Using ",e.jsx(n,{children:"break"})," or ",e.jsx(n,{children:"continue"}),`
outside any loop is a compile-time error.`]})}),e.jsx(s,{children:e.jsxs(i.p,{children:[e.jsx(n,{children:"foreach"}),` variables are read-only in the sense that
rebinding the iteration variable inside the body does not affect the source
collection; it only shadows the loop variable.`]})}),e.jsx(s,{children:e.jsxs(i.p,{children:[`Ranges allocate a temporary array. For very large sequences, consider a
C-style `,e.jsx(n,{children:"for"})," loop to avoid the allocation."]})})]})]})}function p(t={}){const{wrapper:i}=t.components||{};return i?e.jsx(i,{...t,children:e.jsx(h,{...t})}):h(t)}function a(t,i){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
