import{j as e}from"./index-DLc5xCYN.js";function h(t){const r={code:"code",p:"p",...t.components},{Bullet:l,Callout:c,CodeBlock:o,DocsTable:d,H2:i,InlineCode:n,Prose:s}=r;return l||a("Bullet"),c||a("Callout"),o||a("CodeBlock"),d||a("DocsTable"),i||a("H2"),n||a("InlineCode"),s||a("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(i,{children:"Summary"}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:["The ",e.jsx(n,{children:"shard.stdio"})," library exposes the ",e.jsx(n,{children:"stdio"}),` namespace for
console input and output. It provides text printing, line reading, cursor control, single-key input, and
structured object dumping. Every member is `,e.jsx(n,{children:"static"}),`; there is no instance of a
console class.`]})}),`
`,e.jsx(i,{children:"Syntax"}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:["Import the namespace with ",e.jsx(n,{children:"using stdio;"}),` and call the helpers directly by name.
All methods are registered with `,e.jsx(n,{children:"LINK_STATIC"})," on the ",e.jsx(n,{children:"stdio"})," ",`
namespace.`]})}),`
`,e.jsx(o,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  println("hello");

  name: string = input();
  println("hello, " + name);
}`,language:"csharp",filename:"stdio_intro.shard"}),`
`,e.jsx(i,{children:"Parameters / Arguments"}),`
`,e.jsx(d,{headers:["Method","Parameters","Returns","Description"],rows:[[e.jsx(r.code,{children:"print(message)"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"message"}),": any printable value"]}),"void","Writes the string representation of a value to stdout without a trailing newline."],[e.jsx(r.code,{children:"println(message)"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"message"}),": any printable value"]}),"void","Writes the string representation of a value followed by a newline."],[e.jsx(r.code,{children:"println(enumerable)"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"enumerable"}),": ",e.jsx(n,{children:"IEnumerable<T>"})]}),"void","Writes the elements of an enumerable between brackets, separated by commas."],[e.jsx(r.code,{children:"input()"}),e.jsx(e.Fragment,{children:"(no parameters)"}),"string","Reads a single line from stdin and returns it without the trailing newline."],[e.jsx(r.code,{children:"input(prompt)"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"prompt"}),": string"]}),"string","Writes the prompt to stdout, then reads and returns a single line from stdin."],[e.jsx(r.code,{children:"clear()"}),e.jsx(e.Fragment,{children:"(no parameters)"}),"void","Sends VT100 erase-screen and home-cursor escape codes to the terminal."],[e.jsx(r.code,{children:"setCursor(x, y)"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"x"}),": int, ",e.jsx(n,{children:"y"}),": int"]}),"void","Moves the cursor to the zero-based column <InlineCode>x</InlineCode> and row <InlineCode>y</InlineCode> using VT100 escape codes."],[e.jsx(r.code,{children:"setCursorVisible(visible)"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"visible"}),": bool"]}),"void","Shows or hides the text cursor with VT100 escape codes."],[e.jsx(r.code,{children:"readKey()"}),e.jsx(e.Fragment,{children:"(no parameters)"}),"string","Reads a single character from stdin without waiting for Enter and returns it as a one-character string."],[e.jsx(r.code,{children:"Dump(obj)"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"obj"}),": T"]}),"void","Writes a structured, colorized dump of any value to stdout."],[e.jsx(r.code,{children:"Dump(obj, maxDepth, colorized)"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"obj"}),": T, ",e.jsx(n,{children:"maxDepth"}),": int, ",e.jsx(n,{children:"colorized"}),": bool"]}),"void","Writes a structured dump with configurable recursion depth and color output."]]}),`
`,e.jsx(i,{children:"Returns"}),`
`,e.jsx(d,{headers:["Member","Return Type","Notes"],rows:[[e.jsx(r.code,{children:"print"}),"void","No value; output is written directly to native stdout."],[e.jsx(r.code,{children:"println"}),"void","No value; output ends with a newline."],[e.jsx(r.code,{children:"input"}),"string","The line read from stdin, without the trailing newline. Empty string when stdin is at end-of-file."],[e.jsx(r.code,{children:"clear"}),"void","No value; clears the visible terminal buffer."],[e.jsx(r.code,{children:"setCursor"}),"void","No value; coordinates are zero-based."],[e.jsx(r.code,{children:"setCursorVisible"}),"void","No value; visible cursor may not be supported on every terminal."],[e.jsx(r.code,{children:"readKey"}),"string","Single-character string; empty on immediate EOF."],[e.jsx(r.code,{children:"Dump"}),"void","No value; structured representation is written to native stdout."]]}),`
`,e.jsx(i,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(l,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"IEnumerable required for enumerable println"})," —"," ",`
`,e.jsx(n,{children:"println(enumerable)"})," throws when the argument does not implement"," ",`
`,e.jsx(n,{children:"IEnumerable<T>"}),"."]})}),e.jsx(l,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Enumerator contract failure"})," —"," ",`
`,e.jsx(n,{children:"println(enumerable)"})," throws when the enumerator returned by"," ",`
`,e.jsx(n,{children:"GetEnumerator"})," lacks ",e.jsx(n,{children:"MoveNext"})," or"," ",`
`,e.jsx(n,{children:"Current"}),"."]})}),e.jsx(l,{children:e.jsxs(r.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"VT100 support required"})," —"," ",`
`,e.jsx(n,{children:"clear"}),", ",e.jsx(n,{children:"setCursor"}),", and"," ",`
`,e.jsx(n,{children:"setCursorVisible"}),` emit ANSI escape sequences. Terminals that do not interpret
VT100 codes display raw escape characters instead of changing the cursor or screen.`]})})]}),`
`,e.jsx(i,{children:"Remarks"}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Static namespace methods."})," Every helper is attached directly to the"," ",`
`,e.jsx(n,{children:"stdio"})," namespace with ",e.jsx(n,{children:"LINK_STATIC"}),`. There is no console
object to construct; calls compile to `,e.jsx(n,{children:"CALLSTATICMETHODSYMBOL"}),` and resolve at
compile time.`]})}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Output channel."})," The stdio helpers write through native"," ",`
`,e.jsx(n,{children:"std::wcout"}),`. On Windows the library attempts to enable VT100 processing during
startup so that color and cursor escape codes work in modern consoles. Output is not returned as a
ShardScript string and cannot be captured by assigning the result of `,e.jsx(n,{children:"println"}),"."]})}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Prompt input."})," The ",e.jsx(n,{children:"input(prompt: string)"}),` overload writes the
prompt to `,e.jsx(n,{children:"std::wcout"})," without a trailing newline, then reads a line from"," ",`
`,e.jsx(n,{children:"std::wcin"}),". It is equivalent to calling ",e.jsx(n,{children:"print(prompt)"})," ",`
followed by `,e.jsx(n,{children:"input()"}),", but avoids the separate statement."]})}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Dump output format."})," ",e.jsx(n,{children:"Dump"}),` renders primitives, arrays, enums, and
objects. Null values print as `,e.jsx(n,{children:"null"}),", booleans as ",e.jsx(n,{children:"true"}),` or
`,e.jsx(n,{children:"false"}),`, integers/doubles as numbers, chars inside single quotes, and strings
inside double quotes with escaped control characters. Arrays render as comma-separated lists inside
square brackets. Objects render as indented `,e.jsx(n,{children:"{ key: value }"}),` blocks that include
public properties first, then fields. Compiler-generated backing fields are omitted.`]})}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Depth and circularity protection."}),` The default dump stops at a depth of 3. Deeper objects
are summarized as `,e.jsx(n,{children:"[object TypeName]"}),`. If the object graph contains a cycle, the
dumper prints `,e.jsx(n,{children:"[Circular]"}),` instead of recursing into the repeated object. These
guards prevent infinite output and stack overflow when dumping arbitrary object graphs.`]})}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Colorization."})," The default ",e.jsx(n,{children:"Dump(value)"}),` overload uses ANSI colors:
magenta for null and booleans, green for strings and characters, yellow for numbers, cyan for object
keys, and gray for type annotations and truncation markers. Pass `,e.jsx(n,{children:"false"}),` as the
third argument to disable colors, or call the overload with explicit `,e.jsx(n,{children:"maxDepth"}),` and
`,e.jsx(n,{children:"colorized"})," parameters."]})}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:[e.jsx("strong",{children:"Properties take precedence over fields."}),` When dumping an object, the dumper first
iterates declared properties with public getters, then iterates fields that have not already been printed
as a property. This avoids duplicate output for auto-implemented properties that store their value in a
compiler-generated backing field.`]})}),`
`,e.jsx(i,{children:"Examples"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Basic printing and reading."})}),`
`,e.jsx(o,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  print("Enter your name: ");
  name: string = input();
  println("Hello, " + name + "!");
}`,language:"csharp",filename:"stdio_basic.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Reading with a prompt."})}),`
`,e.jsx(o,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  // The prompt is written to stdout before reading the line.
  name: string = input("Enter your name: ");
  println("Hello, " + name + "!");
}`,language:"csharp",filename:"stdio_input_prompt.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Dumping primitives and objects."})}),`
`,e.jsx(o,{code:`using stdio;

namespace demo;

public class Point
{
  public X: int;
  public Y: int;

  public init(x: int, y: int)
  {
      this.X = x;
      this.Y = y;
  }
}

public class Person
{
  public Name: string;
  public Age: int;
  public Location: Point;

  public init(name: string, age: int)
  {
      this.Name = name;
      this.Age = age;
      this.Location = new Point(10, 20);
  }
}

public static func Main() -> void
{
  person: Person = new Person("Alice", 30);

  println("=== default Dump ===");
  Dump(person);

  println("=== Dump with depth=1, no colors ===");
  Dump(person, 1, false);

  println("=== Dump primitives ===");
  Dump(null);
  Dump(true);
  Dump(42);
  Dump(3.14);
  Dump('A');
  Dump("hello world");
}`,language:"csharp",filename:"stdio_dump.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Dumping arrays and limiting recursion."})}),`
`,e.jsx(o,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  values: int[] = [1, 2, 3];
  Dump(values);

  // Limit how deeply nested objects are expanded.
  nested: int[][] = [[1, 2], [3, 4]];
  Dump(nested, 1, false);
}`,language:"csharp",filename:"stdio_dump_array.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Terminal cursor and screen control."})}),`
`,e.jsx(o,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  // Hide the cursor while drawing.
  setCursorVisible(false);

  // Clear the screen and move to the top-left cell.
  clear();
  setCursor(0, 0);
  println("drawn at the top-left corner");

  // Show the cursor again before exiting.
  setCursorVisible(true);
}`,language:"csharp",filename:"stdio_cursor.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Reading a single key press."})}),`
`,e.jsx(o,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  println("Press any key...");
  key: string = readKey();
  println("You pressed: " + key);
}`,language:"csharp",filename:"stdio_readkey.shard"}),`
`,e.jsx(c,{tone:"blue",children:e.jsxs(r.p,{children:["Use ",e.jsx(n,{children:"Dump"}),` for debugging and interactive inspection only. It writes directly to
native stdout, performs reflection over every field and property, and can produce large output for deep
object graphs. Do not leave `,e.jsx(n,{children:"Dump"})," calls in production hot paths."]})}),`
`,e.jsx(i,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(l,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"Developer Tools"})," — runtime introspection helpers such as"," ",`
`,e.jsx(n,{children:"typeof"})," and ",e.jsx(n,{children:"sizeof"}),"."]})}),e.jsx(l,{children:e.jsxs(r.p,{children:[e.jsx(n,{children:"Console I/O"})," — this article; the ",e.jsx(n,{children:"stdio"})," namespace reference."]})})]}),`
`,e.jsx(i,{children:"Source"}),`
`,e.jsx(s,{children:e.jsxs(r.p,{children:["The console I/O implementation ships as part of ",e.jsx(n,{children:"ShardScript.Framework"}),`. The native
binding for `,e.jsx(n,{children:"print"}),", ",e.jsx(n,{children:"println"}),", ",e.jsx(n,{children:"input"}),`,
`,e.jsx(n,{children:"readKey"}),", ",e.jsx(n,{children:"Dump"}),", and related helpers is in"," ",`
`,e.jsx(n,{children:"ShardScript.Framework/system/constream.shard.cpp"}),"."]})})]})}function u(t={}){const{wrapper:r}=t.components||{};return r?e.jsx(r,{...t,children:e.jsx(h,{...t})}):h(t)}function a(t,r){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};
