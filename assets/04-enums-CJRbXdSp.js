import{j as e}from"./index-DFYo8cca.js";function u(r){const n={code:"code",p:"p",...r.components},{Bullet:l,Callout:d,CodeBlock:o,DocsTable:c,H2:t,InlineCode:s,Prose:i}=n;return l||a("Bullet"),d||a("Callout"),o||a("CodeBlock"),c||a("DocsTable"),t||a("H2"),s||a("InlineCode"),i||a("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(t,{children:"Summary"}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:["A ",e.jsx("strong",{children:"ShardScript enum"}),` is a value type that defines a set of named integral
constants. Enums implement `,e.jsx(s,{children:"IPrintable"}),`, support equality comparison,
and can be declared as `,e.jsx(s,{children:": flags"})," for bitwise flag composition."]})}),`
`,e.jsx(t,{children:"Syntax"}),`
`,e.jsx(c,{headers:["Construct","Syntax","Description"],rows:[["Basic enum",e.jsxs(n.code,{children:["public enum Name ",(A,B,C)]}),"Declares an enum with sequential values starting at 0."],["Explicit values",e.jsxs(n.code,{children:["public enum Name ",(A=1,B=5,C)]}),"Each field names a constant int64 value. Missing values continue from the previous field."],["Flags enum",e.jsxs(n.code,{children:["public enum Name : flags ",(A,B,C)]}),"Fields are auto-assigned powers of two (1 &lt;&lt; i) and cannot have explicit initializers."],["Field access",e.jsx(n.code,{children:"Name.Field"}),"Refers to an enum constant."],["Bitwise context",e.jsx(n.code,{children:"Read | Write"}),"Inside a bitwise expression, enum fields can be referenced without the type prefix."]]}),`
`,e.jsx(t,{children:"Parameters / Arguments"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(l,{children:e.jsxs(n.p,{children:[e.jsx(s,{children:"Name"})," — the identifier of the enum type. Enum members are accessed with"," ",`
`,e.jsx(s,{children:"Name.Field"}),"."]})}),e.jsx(l,{children:e.jsxs(n.p,{children:[e.jsx(s,{children:"Field"}),` — an enum constant name. In a bitwise expression whose expected type
is the enum, the field name can be written alone.`]})}),e.jsx(l,{children:e.jsxs(n.p,{children:[e.jsx(s,{children:"value"}),` — an integer literal or constant expression used as an explicit
initializer for a non-flags enum field.`]})})]}),`
`,e.jsx(t,{children:"Returns"}),`
`,e.jsx(c,{headers:["Expression","Return Type","Value"],rows:[[e.jsx(n.code,{children:"Name.Field"}),"Name","The enum value whose underlying integer is the field value."],[e.jsx(n.code,{children:"a == b"}),"bool","True if both enum values have the same underlying integer."],[e.jsx(n.code,{children:"a != b"}),"bool","True if the underlying integers differ."],[e.jsx(n.code,{children:"a | b"}),"Name","Bitwise OR of the underlying values, returned as the enum type."],[e.jsx(n.code,{children:"a & b"}),"Name","Bitwise AND of the underlying values, returned as the enum type."],[e.jsx(n.code,{children:"a.HasFlag(b)"}),"bool","True if all bits set in <InlineCode>b</InlineCode> are also set in <InlineCode>a</InlineCode>."],[e.jsx(n.code,{children:"a.ToString()"}),"string",'The field name for regular enums; a "|"-separated list of flag names for flags enums.']]}),`
`,e.jsx(t,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(l,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Compile error — flags enum initializer:"})," ",`
`,e.jsxs(s,{children:["public enum Flags : flags ",A=1]}),` is rejected. Flags fields are
always assigned `,e.jsx(s,{children:"1 << i"})," automatically."]})}),e.jsx(l,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Compile error — type mismatch in comparison:"})," ",`
Comparing two enum values of different types is not allowed.`]})}),e.jsx(l,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Compile error — invalid bitwise operand:"})," ",`
`,e.jsx(s,{children:"&"})," and ",e.jsx(s,{children:"|"}),` on enum values require both operands
to be the same enum type.`]})})]}),`
`,e.jsx(t,{children:"Remarks"}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Underlying values."}),` Every enum stores a 64-bit signed integer. Without an explicit
initializer, the first field is `,e.jsx(s,{children:"0"}),` and each subsequent field is one greater
than the previous. After an explicit initializer, the sequence continues incrementing from that
value. For flags enums the sequence is replaced by powers of two.`]})}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Flags enums."})," Declaring an enum with ",e.jsx(s,{children:": flags"}),` tells the
compiler to auto-assign values `,e.jsx(s,{children:"1 << i"})," and tells"," ",`
`,e.jsx(s,{children:"ToString()"}),` to format combinations as a pipe-separated list of matching
field names. Use `,e.jsx(s,{children:"|"})," to combine flags, ",e.jsx(s,{children:"&"}),` to mask
flags, and `,e.jsx(s,{children:"HasFlag"})," to test for a flag."]})}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Bitwise shorthand."}),` When the left-hand side of a bitwise expression is an enum
value, the compiler treats bare field identifiers on the right as members of that enum. For
example, `,e.jsx(s,{children:"Permissions.Read | Write"})," resolves ",e.jsx(s,{children:"Write"})," ",`
to `,e.jsx(s,{children:"Permissions.Write"}),"."]})}),`
`,e.jsx(i,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Printing and string conversion."})," Enums implement ",e.jsx(s,{children:"IPrintable"}),`,
so they can be passed directly to `,e.jsx(s,{children:"print"})," or ",e.jsx(s,{children:"println"}),`.
Calling `,e.jsx(s,{children:"ToString()"}),` returns the same textual representation. If no named
field matches the value, the underlying integer is returned as a string.`]})}),`
`,e.jsx(d,{tone:"blue",children:e.jsxs(n.p,{children:["Ordering comparisons (",e.jsx(s,{children:"<"}),", ",e.jsx(s,{children:">"}),","," ",`
`,e.jsx(s,{children:"<="}),", ",e.jsx(s,{children:">="}),`) are not supported for enum values.
Compare the underlying integer values explicitly if you need ordering.`]})}),`
`,e.jsx(t,{children:"Examples"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Basic enum declaration and comparison"})}),`
`,e.jsx(o,{code:`using stdio;

namespace demo;

public enum Color
{
  Red,
  Green,
  Blue
}

public static func Main() -> void
{
  color: Color = Color.Red;

  println(color);              // Red
  println(Color.Blue);         // Blue
  println(color == Color.Red); // true
  println(color != Color.Green); // true
}`,language:"csharp",filename:"enum_basic.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Explicit initializers"})}),`
`,e.jsx(o,{code:`using stdio;

namespace demo;

public enum HttpStatus
{
  Ok = 200,
  NotFound = 404,
  Error = 500
}

public static func Main() -> void
{
  status: HttpStatus = HttpStatus.NotFound;
  println(status.ToString());  // NotFound
}`,language:"csharp",filename:"enum_explicit.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Flags enum"})}),`
`,e.jsx(o,{code:`using stdio;

namespace demo;

public enum Permissions : flags
{
  None,
  Read,
  Write,
  Execute
}

public static func Main() -> void
{
  access: Permissions = Permissions.Read | Permissions.Write;

  println(access);                          // Read | Write
  println(access.HasFlag(Permissions.Read));   // true
  println(access.HasFlag(Permissions.Execute)); // false

  // Bitwise shorthand: Write is resolved as Permissions.Write.
  combined: Permissions = Permissions.Read | Write | Execute;
  println(combined);                        // Read | Write | Execute
}`,language:"csharp",filename:"enum_flags.shard"})]})}function m(r={}){const{wrapper:n}=r.components||{};return n?e.jsx(n,{...r,children:e.jsx(u,{...r})}):u(r)}function a(r,n){throw new Error("Expected component `"+r+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default};
