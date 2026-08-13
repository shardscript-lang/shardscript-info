import{j as e}from"./index-B-x28vAk.js";function d(r){const n={code:"code",p:"p",...r.components},{Callout:c,CodeBlock:a,DocsTable:l,H2:s,InlineCode:i,Prose:t}=n;return c||o("Callout"),a||o("CodeBlock"),l||o("DocsTable"),s||o("H2"),i||o("InlineCode"),t||o("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:e.jsxs(n.p,{children:["ShardScript provides a small set of built-in primitive types. Value types (",e.jsx(i,{children:"int"}),","," ",`
`,e.jsx(i,{children:"double"}),", ",e.jsx(i,{children:"bool"}),", ",e.jsx(i,{children:"char"}),","," ",`
`,e.jsx(i,{children:"byte"}),", and ",e.jsx(i,{children:"nint"}),") are copied on assignment, while"," ",`
`,e.jsx(i,{children:"string"})," is a reference type and ",e.jsx(i,{children:"void"})," marks the absence of a return value."]})}),`
`,e.jsx(s,{children:"Summary"}),`
`,e.jsx(t,{children:e.jsx(n.p,{children:`Primitive types are the atomic units of the ShardScript type system. Each has a fixed literal syntax, a defined
runtime size, and a default zero-initialized value. The compiler resolves every primitive at compile time and emits
bytecode that operates directly on the value or reference, with no dynamic boxing except where interop or conversion
explicitly requires it.`})}),`
`,e.jsx(s,{children:"Syntax"}),`
`,e.jsx(t,{children:e.jsx(n.p,{children:"Use the keyword as a type annotation, or use a literal directly in an expression."})}),`
`,e.jsx(l,{headers:["Type","Literal syntax","Annotation example"],rows:[[e.jsx(n.code,{children:"int"}),"42, -7, 1`000`000, 0xA1, 0b1010, 2MB",e.jsx(n.code,{children:"count: int = 42;"})],[e.jsx(n.code,{children:"double"}),"3.14, -0.5, 1.0e3",e.jsx(n.code,{children:"pi: double = 3.14159;"})],[e.jsx(n.code,{children:"bool"}),"true or false",e.jsx(n.code,{children:"flag: bool = true;"})],[e.jsx(n.code,{children:"char"}),"'A', '\\n', '\\t'",e.jsx(n.code,{children:"letter: char = 'A';"})],[e.jsx(n.code,{children:"byte"}),"0 through 255 (contextually typed)",e.jsx(n.code,{children:"channel: byte = 255;"})],[e.jsx(n.code,{children:"nint"}),"0 or pointer value (contextually typed)",e.jsx(n.code,{children:"handle: nint = 0;"})],[e.jsx(n.code,{children:"string"}),'"hello", "line\\nline", @"C:\\tools"',e.jsx(n.code,{children:'name: string = "ShardScript";'})],[e.jsx(n.code,{children:"void"}),"No literal; used only as a return type.",e.jsx(n.code,{children:"func Reset() -> void"})]]}),`
`,e.jsx(s,{children:"Parameters / Arguments"}),`
`,e.jsx(t,{children:e.jsx(n.p,{children:`Each primitive accepts a specific domain of values. Assigning or casting a value outside that domain produces a
compile-time or runtime error.`})}),`
`,e.jsx(l,{headers:["Type","Accepted values","Notes"],rows:[[e.jsx(n.code,{children:"int"}),"64-bit signed integer: -9 223 372 036 854 775 808 to 9 223 372 036 854 775 807","Literals may use base prefixes and volume suffixes."],[e.jsx(n.code,{children:"double"}),"64-bit IEEE 754 floating-point value","Cannot use base prefixes or volume suffixes."],[e.jsx(n.code,{children:"bool"}),"Only true or false","No implicit conversion from numeric values."],[e.jsx(n.code,{children:"char"}),"Single Unicode code unit (platform wchar_t)","Must be exactly one character or escape."],[e.jsx(n.code,{children:"byte"}),"Unsigned 8-bit integer: 0 to 255","Requires contextual type or explicit cast."],[e.jsx(n.code,{children:"nint"}),"Pointer-sized signed integer","Size matches sizeof(void*) on the target platform."],[e.jsx(n.code,{children:"string"}),"Immutable sequence of UTF-16 code units",'May be null; empty string is "".'],[e.jsx(n.code,{children:"void"}),"No value","Cannot be used for variables, parameters, or fields."]]}),`
`,e.jsx(s,{children:"Returns"}),`
`,e.jsx(t,{children:e.jsx(n.p,{children:"Operations on primitives evaluate to a value of a specific type. Default values are zero-initialized memory."})}),`
`,e.jsx(l,{headers:["Type","Default value","Common operation result types"],rows:[[e.jsx(n.code,{children:"int"}),e.jsx(n.code,{children:"0"}),"int, promoted to double if mixed with double"],[e.jsx(n.code,{children:"double"}),e.jsx(n.code,{children:"0.0"}),"double"],[e.jsx(n.code,{children:"bool"}),e.jsx(n.code,{children:"false"}),"bool"],[e.jsx(n.code,{children:"char"}),e.jsx(n.code,{children:"'\\0'"}),"char for increment/decrement; string for concatenation"],[e.jsx(n.code,{children:"byte"}),e.jsx(n.code,{children:"0"}),"byte"],[e.jsx(n.code,{children:"nint"}),"null pointer (0)","int for arithmetic involving int"],[e.jsx(n.code,{children:"string"}),e.jsx(n.code,{children:"null"}),"string"],[e.jsx(n.code,{children:"void"}),"—","—"]]}),`
`,e.jsx(s,{children:"Exceptions / Errors"}),`
`,e.jsx(l,{headers:["Error","Cause","Example"],rows:[[e.jsx(n.code,{children:"Type mismatch in assignment"}),"Assigning an incompatible type without a cast.",e.jsx(n.code,{children:'i: int = "42";'})],[e.jsx(n.code,{children:"Invalid characters in number"}),"Digits that do not match the declared base prefix.",e.jsx(n.code,{children:"0xG1"})],[e.jsx(n.code,{children:"Number out of range"}),"Literal exceeds int64 range after applying a volume suffix.",e.jsx(n.code,{children:"9EB"})],[e.jsx(n.code,{children:"Division by zero"}),"Divisor evaluates to zero at runtime.",e.jsx(n.code,{children:"x / 0"})],[e.jsx(n.code,{children:"Modulo by zero"}),"Modulus evaluates to zero at runtime.",e.jsx(n.code,{children:"x % 0"})],[e.jsx(n.code,{children:"Cannot cast from Type A to Type B"}),"Cast between incompatible scalar types or reference types.",e.jsx(n.code,{children:'"hi" as int'})],[e.jsx(n.code,{children:"Empty Char literal"}),"A char literal contains no character.",e.jsx(n.code,{children:"ch: char = '';"})],[e.jsx(n.code,{children:"Invalid Char literal length"}),"More than one character between single quotes.",e.jsx(n.code,{children:"ch: char = 'AB';"})]]}),`
`,e.jsx(s,{children:"Remarks"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Value types and reference types."})," ",e.jsx(i,{children:"int"}),", ",e.jsx(i,{children:"double"}),","," ",`
`,e.jsx(i,{children:"bool"}),", ",e.jsx(i,{children:"char"}),", ",e.jsx(i,{children:"byte"}),", and"," ",`
`,e.jsx(i,{children:"nint"})," are value types implemented as ",e.jsx(i,{children:"StructSymbol"}),` nodes. They are stored
inline in objects, arrays, and locals, and assignment copies the bits. `,e.jsx(i,{children:"string"}),` is implemented as
a `,e.jsx(i,{children:"ClassSymbol"})," and is heap-allocated; assignment copies the reference. ",e.jsx(i,{children:"void"}),`
is also a struct with zero size and is only legal as a return type.`]})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Memory layout."}),` The runtime stores each primitive in a contiguous memory block managed by the garbage
collector. Sizes follow the C++ backing type:`]})}),`
`,e.jsx(l,{headers:["Type","Backing storage","Size (typical 64-bit host)"],rows:[[e.jsx(n.code,{children:"bool"}),e.jsx(n.code,{children:"bool"}),"1 byte"],[e.jsx(n.code,{children:"byte"}),e.jsx(n.code,{children:"std::uint8_t"}),"1 byte"],[e.jsx(n.code,{children:"char"}),e.jsx(n.code,{children:"wchar_t"}),"2 bytes on Windows, 4 bytes on most Unix hosts"],[e.jsx(n.code,{children:"int"}),e.jsx(n.code,{children:"std::int64_t"}),"8 bytes"],[e.jsx(n.code,{children:"double"}),e.jsx(n.code,{children:"double"}),"8 bytes"],[e.jsx(n.code,{children:"nint"}),e.jsx(n.code,{children:"void*"}),"8 bytes on 64-bit hosts, 4 bytes on 32-bit hosts"],[e.jsx(n.code,{children:"string"}),"std::int64_t length + wchar_t* data","16 bytes"],[e.jsx(n.code,{children:"void"}),"—","0 bytes"]]}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Numeric literal parsing."})," Integer literals are ",e.jsx(i,{children:"int"}),` by default. They may include a
base prefix (`,e.jsx(i,{children:"0x"})," hexadecimal, ",e.jsx(i,{children:"0b"})," binary, ",e.jsx(i,{children:"0d"}),` decimal)
and digit separators (`,e.jsx(i,{children:"`"}),"). They may also end with a binary volume suffix:"," ",`
`,e.jsx(i,{children:"KB"}),", ",e.jsx(i,{children:"MB"}),", ",e.jsx(i,{children:"GB"}),", ",e.jsx(i,{children:"TB"}),", or"," ",`
`,e.jsx(i,{children:"PB"}),". Floating-point literals are always ",e.jsx(i,{children:"double"}),` and may not use base prefixes
or volume suffixes.`]})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Contextual literal typing."})," When an integer literal appears in a position whose expected type is"," ",`
`,e.jsx(i,{children:"byte"})," or ",e.jsx(i,{children:"nint"}),", the compiler binds the literal to that type instead of"," ",`
`,e.jsx(i,{children:"int"}),". This lets you write ",e.jsx(i,{children:"b: byte = 255;"})," or"," ",`
`,e.jsx(i,{children:"h: nint = 0;"}),` without an explicit cast. Array element contexts do not currently propagate this
expectation, so byte arrays usually require casts such as `,e.jsx(i,{children:"[1 as byte, 2 as byte]"}),"."]})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Conversion rules."}),` ShardScript does not perform implicit numeric conversions on assignment or argument
passing. You must use the explicit cast operator `,e.jsx(i,{children:"as"}),` to convert between scalar primitives. The
built-in cast `,e.jsx(i,{children:"value as TargetType"})," is supported between any pair of"," ",`
`,e.jsx(i,{children:"bool"}),", ",e.jsx(i,{children:"int"}),", ",e.jsx(i,{children:"double"}),", ",e.jsx(i,{children:"char"}),","," ",`
`,e.jsx(i,{children:"byte"}),", and ",e.jsx(i,{children:"nint"}),`. Reference types may be cast up or down their inheritance
chain and to or from interfaces.`]})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Operator promotion."}),` Although assignment requires exact type matching, arithmetic operators promote mixed
numeric operands. If either operand is `,e.jsx(i,{children:"double"}),", the result is ",e.jsx(i,{children:"double"}),`.
Otherwise, if both operands are `,e.jsx(i,{children:"int"})," or ",e.jsx(i,{children:"nint"}),", the result is"," ",`
`,e.jsx(i,{children:"int"}),". ",e.jsx(i,{children:"byte"})," arithmetic is defined only between two"," ",`
`,e.jsx(i,{children:"byte"})," values and yields ",e.jsx(i,{children:"byte"}),". Adding a ",e.jsx(i,{children:"char"}),` to an
integer or string produces a `,e.jsx(i,{children:"string"}),"."]})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Boolean and bitwise operators."})," The operators ",e.jsx(i,{children:"&"}),","," ",`
`,e.jsx(i,{children:"|"}),", and ",e.jsx(i,{children:"!"}),` operate on booleans. The same symbols also perform bitwise
operations on integral types. There is no short-circuiting `,e.jsx(i,{children:"&&"})," or"," ",`
`,e.jsx(i,{children:"||"}),"; keyword aliases ",e.jsx(i,{children:"and"}),", ",e.jsx(i,{children:"or"}),", and"," ",`
`,e.jsx(i,{children:"not"})," map to the same operators and always evaluate both sides."]})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Printability."})," Every primitive implements ",e.jsx(i,{children:"IPrintable"})," and therefore has a"," ",`
`,e.jsx(i,{children:"ToString()"})," method. ",e.jsx(i,{children:"println"}),` accepts any printable value without requiring
an open-ended `,e.jsx(i,{children:"any"})," parameter. Boolean ",e.jsx(i,{children:"true"})," prints as ",e.jsx(i,{children:"true"}),`
and `,e.jsx(i,{children:"false"})," as ",e.jsx(i,{children:"false"}),". ",e.jsx(i,{children:"byte"}),` prints as its decimal
numeric value, not as a character.`]})}),`
`,e.jsx(c,{tone:"amber",children:e.jsxs(n.p,{children:["String interpolation with ",e.jsx(i,{children:'$"..."'})," is planned but not yet implemented. Today, concatenate with"," ",`
`,e.jsx(i,{children:"+"})," or use ",e.jsx(i,{children:"strings.Format"})," from the standard library."]})}),`
`,e.jsx(s,{children:"Examples"}),`
`,e.jsx(t,{children:e.jsx(n.p,{children:"The following program declares every primitive with an explicit type and prints each one."})}),`
`,e.jsx(a,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  // Each primitive declared with an explicit annotation.
  count: int       = 42;
  pi: double       = 3.14159;
  flag: bool       = true;
  letter: char     = 'A';
  channel: byte    = 255;
  handle: nint     = 0;
  name: string     = "ShardScript";

  println(count);
  println(pi);
  println(flag);
  println(letter);
  println(channel);
  println(name);
}`,language:"csharp",filename:"primitives_intro.shard"}),`
`,e.jsx(t,{children:e.jsx(n.p,{children:"Integer literals support several convenient formats."})}),`
`,e.jsx(a,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  // Decimal, separated, hex, binary, and volume suffixes.
  plain: int      = 42;
  separated: int  = 1\`000\`000;
  hex: int        = 0xA1;
  binary: int     = 0b1010;
  megabytes: int  = 2MB;

  println(plain);        // 42
  println(separated);    // 1000000
  println(hex);          // 161
  println(binary);       // 10
  println(megabytes);    // 2097152
}`,language:"csharp",filename:"numeric_literals.shard"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:["Contextual typing lets small literals bind to ",e.jsx(i,{children:"byte"})," and ",e.jsx(i,{children:"nint"}),` without a
cast, but mixed arithmetic requires care.`]})}),`
`,e.jsx(a,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  // Contextual typing: the literal is bound as byte/nint because the target type says so.
  a: byte = 10;
  b: byte = 5;
  handle: nint = 0;

  // byte arithmetic is defined only between two byte operands.
  sum: byte = a + b;
  println(sum);          // 15

  // nint mixed with int evaluates to int.
  n: nint = 42;
  mixed: int = n + 1;
  println(mixed);        // 43

  // To mix byte with int, cast explicitly.
  wider: int = a as int + 100;
  println(wider);        // 110
}`,language:"csharp",filename:"byte_and_nint.shard"}),`
`,e.jsx(t,{children:e.jsx(n.p,{children:"Character and string literals, including escape sequences and verbatim strings."})}),`
`,e.jsx(a,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  // Regular string with escape sequences.
  line: string = "line one\\nline two";
  quoted: string = "she said \\"hi\\"";

  // Verbatim string: backslashes are literal.
  path: string = @"C:\\Users\\name\\file.txt";

  // Character literals use single quotes.
  newline: char = '\\n';
  tab: char = '\\t';
  backslash: char = '\\\\';

  println(line);
  println(quoted);
  println(path);
  println(newline == '\\n');
  println(tab == '\\t');
  println(backslash == '\\\\');
}`,language:"csharp",filename:"strings_and_chars.shard"}),`
`,e.jsx(t,{children:e.jsx(n.p,{children:"Explicit casts convert between scalar primitives. Casts truncate or reinterpret as needed."})}),`
`,e.jsx(a,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  // Casting between numeric types.
  whole: int = 9;
  fraction: double = whole as double;
  println(fraction);     // 9.0

  truncated: int = 9.7 as int;
  println(truncated);    // 9

  // bool cast from int follows the rule: zero is false, everything else is true.
  truthy: bool = 42 as bool;
  falsy: bool = 0 as bool;
  println(truthy);       // true
  println(falsy);        // false

  // char and int are interchangeable through casts.
  code: int = 'A' as int;
  letter: char = 65 as char;
  println(code);         // 65
  println(letter);       // A
}`,language:"csharp",filename:"casts.shard"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:["Common mistakes to avoid: implicit numeric widening, assigning a string to a number, and treating"," ",`
`,e.jsx(i,{children:"byte"})," as interchangeable with ",e.jsx(i,{children:"int"}),"."]})}),`
`,e.jsx(a,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  // Valid: explicit cast is required.
  d: double = 5 as double;
  println(d);            // 5.0

  // Valid: byte + byte stays byte.
  a: byte = 10;
  b: byte = 20;
  println(a + b);        // 30

  // Invalid and commented out:
  // i: int = a;               // ERROR: cannot assign byte to int implicitly
  // x: int = "42";            // ERROR: string is not assignable to int
  // y: double = 5;            // ERROR: int is not assignable to double
  // z: bool = 1;              // ERROR: int is not assignable to bool

  println("done");
}`,language:"csharp",filename:"common_mistakes.shard"})]})}function x(r={}){const{wrapper:n}=r.components||{};return n?e.jsx(n,{...r,children:e.jsx(d,{...r})}):d(r)}function o(r,n){throw new Error("Expected component `"+r+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
