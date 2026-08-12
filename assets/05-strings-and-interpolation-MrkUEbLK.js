import{j as e}from"./index-Dw_NxEHJ.js";function h(a){const t={p:"p",...a.components},{Bullet:l,Callout:c,CodeBlock:i,DocsTable:d,H2:s,InlineCode:n,Prose:r}=t;return l||o("Bullet"),c||o("Callout"),i||o("CodeBlock"),d||o("DocsTable"),s||o("H2"),n||o("InlineCode"),r||o("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(r,{children:e.jsxs(t.p,{children:["ShardScript distinguishes between ",e.jsx(n,{children:"string"})," and"," ",`
`,e.jsx(n,{children:"char"}),": a ",e.jsx(n,{children:"string"}),` is a reference type that owns a
sequence of characters, while a `,e.jsx(n,{children:"char"}),` is a single 16-bit Unicode character.
Text can be built from literals, concatenated with `,e.jsx(n,{children:"+"}),", composed with"," ",`
`,e.jsx(n,{children:"strings.Format"}),", or written verbatim with ",e.jsx(n,{children:'@"..."'}),`.
Interpolated string expressions are planned but not yet implemented.`]})}),`
`,e.jsx(s,{children:"Introduction"}),`
`,e.jsx(r,{children:e.jsx(t.p,{children:"Almost every program needs to represent text. ShardScript provides two built-in text primitives:"})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(l,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"string"}),` — a reference type that stores a read-only
sequence of characters.`]})}),e.jsx(l,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"char"}),` — a value type that stores exactly one
character.`]})})]}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:[`String literals are written in double quotes, character literals in single quotes, and verbatim
strings are prefixed with `,e.jsx(n,{children:"@"}),` to disable escape processing. Because strings
are immutable, every operation that appears to change a string returns a new instance and leaves
the original untouched.`]})}),`
`,e.jsx(s,{children:"What it is"}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:["A ",e.jsx(n,{children:"string"}),` literal is a sequence of characters enclosed in double quotes.
A `,e.jsx(n,{children:"char"}),` literal is a single character enclosed in single quotes. Both are
stored as UTF-16 character data in the runtime, and string literals are interned into the compiled
program's string pool.`]})}),`
`,e.jsx(s,{children:"String literals"}),`
`,e.jsx(i,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  // A string literal is a sequence of characters in double quotes.
  greeting: string = "hello";

  // An empty string is a valid literal.
  empty: string = "";

  println(greeting);
  println(empty.Length());
}`,language:"csharp",filename:"string_literals.shard"}),`
`,e.jsx(s,{children:"Character literals"}),`
`,e.jsx(i,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  // A char literal holds exactly one character.
  letter: char = 'A';
  digit: char = '7';
  space: char = ' ';

  println(letter);
  println(digit);
  println(space);
}`,language:"csharp",filename:"char_literals.shard"}),`
`,e.jsx(s,{children:"Escape sequences"}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:[`Escape sequences let you insert characters that are hard to type literally. The lexer recognizes
different escapes in `,e.jsx(n,{children:"string"})," and ",e.jsx(n,{children:"char"})," literals."]})}),`
`,e.jsx(d,{headers:["Escape","Character",'In string "..."',"In char '...'"],rows:[["\\\\","Backslash","Yes","Yes"],['\\"',"Double quote","Yes","No"],["\\'","Single quote","No","Yes"],["\\n","Newline (LF)","Yes","Yes"],["\\t","Horizontal tab","No","Yes"],["\\r","Carriage return","No","Yes"],["\\0","Null","No","Yes"]]}),`
`,e.jsx(i,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  // Escapes that work in both string and char literals.
  newline: string = "line one
line two";
  backslash: string = "C:\\\\tools";
  quoted: string = "she said \\"hi\\"";

  // Escapes that are only valid in char literals.
  tab: char = '\\t';
  quote: char = '\\'';
  nullChar: char = '\\0';

  println(newline);
  println(backslash);
  println(quoted);
  println(tab);
  println(quote);
  println(nullChar);
}`,language:"csharp",filename:"escape_sequences.shard"}),`
`,e.jsx(c,{tone:"blue",children:e.jsxs(t.p,{children:["Only ",e.jsx(n,{children:"\\"}),", ",e.jsx(n,{children:'\\"'}),", and ",e.jsx(n,{children:"\\n"}),` are
processed inside double-quoted strings. If you need tabs or other control characters in a string,
concatenate a `,e.jsx(n,{children:"char"})," literal or use a verbatim string."]})}),`
`,e.jsx(s,{children:"Verbatim strings"}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:["Prefix a string literal with ",e.jsx(n,{children:"@"}),` to create a verbatim string. Backslashes
and quotes are treated as literal characters, so verbatim strings are ideal for file paths,
regular expressions, and JSON fragments.`]})}),`
`,e.jsx(i,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  // Backslashes are preserved exactly in a verbatim string.
  path: string = @"C:\\Users\\name\\file.txt";

  // Quotes must still be doubled to embed a literal quote.
  sentence: string = @"she said ""hi""";

  println(path);
  println(sentence);
}`,language:"csharp",filename:"verbatim_strings.shard"}),`
`,e.jsx(s,{children:"Concatenation with +"}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:["The ",e.jsx(n,{children:"+"}),` operator concatenates strings. ShardScript also defines mixed
overloads so a string can be concatenated with `,e.jsx(n,{children:"int"}),","," ",`
`,e.jsx(n,{children:"bool"}),", or ",e.jsx(n,{children:"char"}),` operands, which are converted to
their string representations automatically.`]})}),`
`,e.jsx(i,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  name: string = "Shard";
  version: int = 1;
  ready: bool = true;
  sep: char = '-';

  // String + string.
  println("Hello, " + name);

  // String + int converts the integer to text.
  println("version: " + version);

  // String + bool converts the boolean to "true" or "false".
  println("ready: " + ready);

  // Char + string and char * int are also supported.
  println(sep + "start");
  println(sep * 5);

  // Chained concatenation builds the final string left-to-right.
  label: string = "v" + version + sep + name;
  println(label);
}`,language:"csharp",filename:"concatenation.shard"}),`
`,e.jsx(s,{children:"strings.Format placeholders"}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:["For formatted output, use the static method ",e.jsx(n,{children:"strings.Format"})," from the"," ",`
`,e.jsx(n,{children:"strings"})," shard. It replaces numbered placeholders"," ",`
`,e.jsx(n,{children:"{0}"}),", ",e.jsx(n,{children:"{1}"}),`, and so on with the
corresponding argument. Use doubled braces to write literal `,e.jsx(n,{children:"{"})," or"," ",`
`,e.jsx(n,{children:"}"})," characters."]})}),`
`,e.jsx(i,{code:`using stdio;
using strings;

namespace demo;

public static func Main() -> void
{
  name: string = "Shard";
  count: int = 42;
  ratio: double = 0.95;

  // Positional placeholders index the argument array.
  line: string = strings.Format("{0} has {1} items at {2}%", [name, count, ratio]);
  println(line);

  // Arguments may be reused in any order.
  println(strings.Format("{1}, {0}, {1}", [name, count]));

  // Double the braces to emit them literally.
  println(strings.Format("{{0}} -> {0}", ["x"]));
}`,language:"csharp",filename:"strings_format.shard"}),`
`,e.jsx(s,{children:"Planned interpolation syntax"}),`
`,e.jsx(c,{tone:"amber",children:e.jsxs(t.p,{children:["A C#-style interpolated string syntax such as"," ",`
`,e.jsx(n,{children:'$"name: {name}, count: {count}"'}),` is planned but not yet implemented.
Today, use `,e.jsx(n,{children:"+"})," concatenation or ",e.jsx(n,{children:"strings.Format"}),` to
compose dynamic text.`]})}),`
`,e.jsx(i,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  name: string = "Shard";
  count: int = 42;

  // Intended future syntax (not yet available):
  // line := $"name: {name}, count: {count}";

  // Current equivalent using concatenation.
  line: string = "name: " + name + ", count: " + count;
  println(line);
}`,language:"csharp",filename:"interpolation_planned.shard"}),`
`,e.jsx(s,{children:"String mutability"}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:[`ShardScript strings are immutable. You can reassign a variable to point to a different string, but
you cannot change the characters of an existing instance. Every mutating-looking method, such as
`,e.jsx(n,{children:"ToUpper"})," or ",e.jsx(n,{children:"Replace"}),`, returns a new string and
leaves the original unchanged.`]})}),`
`,e.jsx(i,{code:`using stdio;
using strings;

namespace demo;

public static func Main() -> void
{
  original: string = "hello";

  // Replace returns a new string; original is unchanged.
  modified: string = original.Replace("l", "L");
  println(original);   // hello
  println(modified);   // heLLo

  // Reassignment replaces the reference, it does not mutate the instance.
  original = "world";
  println(original);   // world
}`,language:"csharp",filename:"string_mutability.shard"}),`
`,e.jsx(s,{children:"When to use it"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(l,{children:e.jsxs(t.p,{children:["Use ",e.jsx(n,{children:"string"}),` for any text value: messages, names, serialized data, or
file content.`]})}),e.jsx(l,{children:e.jsxs(t.p,{children:["Use ",e.jsx(n,{children:"char"}),` when you are working with a single character, such as a
delimiter, a punctuation mark, or a control character.`]})}),e.jsx(l,{children:e.jsxs(t.p,{children:["Use a verbatim string ",e.jsx(n,{children:'@"..."'}),` when the text contains many backslashes
and escape processing would be noisy or incorrect.`]})}),e.jsx(l,{children:e.jsxs(t.p,{children:["Use ",e.jsx(n,{children:"strings.Format"}),` for templates, localized messages, or any situation
where the same text structure is reused with different values.`]})}),e.jsx(l,{children:e.jsxs(t.p,{children:["Use ",e.jsx(n,{children:"+"}),` for small, ad-hoc concatenations where a template would be
overkill.`]})})]}),`
`,e.jsx(s,{children:"Remarks"}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:["The runtime stores each ",e.jsx(n,{children:"string"})," as a ",e.jsx(n,{children:"std::wstring"})," ",`
buffer, so every character is UTF-16. String literals are emitted into the compiled image's string
pool and loaded with the `,e.jsx(n,{children:"ldstr"})," opcode. Concatenation with"," ",`
`,e.jsx(n,{children:"+"}),` allocates a new buffer and copies both operands; for many pieces, prefer
building a `,e.jsx(n,{children:"string[]"})," and calling ",e.jsx(n,{children:"strings.Join"})," or"," ",`
`,e.jsx(n,{children:"strings.Concat"})," to reduce intermediate allocations."]})}),`
`,e.jsx(r,{children:e.jsxs(t.p,{children:["The ",e.jsx(n,{children:"strings.Format"})," implementation scans the format string for"," ",`
`,e.jsx(n,{children:"{N}"}),` patterns and replaces them with the string representation of the
argument at index `,e.jsx(n,{children:"N"}),". Doubled braces ",e.jsx(n,{children:"{{"})," and"," ",`
`,e.jsx(n,{children:"}}"}),` are emitted as single literal braces. If a placeholder index is out of
range, the runtime throws an error.`]})}),`
`,e.jsx(r,{children:e.jsx(t.p,{children:`Because strings are immutable, they are safe to share across threads and async continuations. The
garbage collector reclaims unreachable string instances; there is no string-builder type yet, so
repeated concatenation in a hot loop allocates a new string on every iteration.`})}),`
`,e.jsx(s,{children:"Examples"}),`
`,e.jsx(r,{children:e.jsx(t.p,{children:`The following example demonstrates escape handling, mixed-type concatenation, and formatting in a
single program.`})}),`
`,e.jsx(i,{code:`using stdio;
using strings;

namespace demo;

public static func Main() -> void
{
  user: string = "Ada";
  score: int = 1200;
  bonus: double = 1.5;

  // Build a message with concatenation.
  summary: string = "Player " + user + " scored " + score + " points.";
  println(summary);

  // Build the same message with a template.
  summary = strings.Format("Player {0} scored {1} points (bonus {2}x).", [user, score, bonus]);
  println(summary);

  // Embed control characters using char literals.
  tab: char = '\\t';
  report: string = "Name" + tab + "Score";
  println(report);
}`,language:"csharp",filename:"strings_combined.shard"}),`
`,e.jsx(r,{children:e.jsx(t.p,{children:"Common mistakes to avoid:"})}),`
`,e.jsx(i,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  // CORRECT: double quotes for strings, single quotes for chars.
  text: string = "hello";
  letter: char = 'h';

  // INCORRECT: single quotes around more than one character.
  // word: string = 'hello';   // ERROR: a char literal must contain one character.

  // INCORRECT: trying to mutate a string by index.
  // text[0] = 'H';            // ERROR: strings do not support index assignment.

  // CORRECT: create a new string instead.
  text = "H" + text.Substring(1);
  println(text);
}`,language:"csharp",filename:"strings_common_mistakes.shard"})]})}function u(a={}){const{wrapper:t}=a.components||{};return t?e.jsx(t,{...a,children:e.jsx(h,{...a})}):h(a)}function o(a,t){throw new Error("Expected component `"+a+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};
