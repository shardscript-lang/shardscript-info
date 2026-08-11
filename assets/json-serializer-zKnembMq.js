import{j as e}from"./index-C1AvCmMi.js";function p(r){const n={p:"p",...r.components},{Bullet:t,Callout:d,CodeBlock:a,DocsTable:c,H2:l,InlineCode:i,Prose:s}=n;return t||o("Bullet"),d||o("Callout"),a||o("CodeBlock"),c||o("DocsTable"),l||o("H2"),i||o("InlineCode"),s||o("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(l,{children:"Summary"}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:["The ",e.jsx(i,{children:"shard.json"})," library exposes a static class"," ",`
`,e.jsx(i,{children:"JsonSerializer"})," in the ",e.jsx(i,{children:"json"}),` namespace. Its two
generic methods — `,e.jsx(i,{children:"Serialize<T>"})," and"," ",`
`,e.jsx(i,{children:"Deserialize<T>"}),` — convert between ShardScript objects and standard
JSON text by reflecting over public fields. The serializer emits compact, RFC 8259–compatible
output; the deserializer reconstructs a typed object graph from JSON keys and values.`]})}),`
`,e.jsx(l,{children:"Syntax"}),`
`,e.jsx(s,{children:e.jsx(n.p,{children:`Both methods are static and generic. The type argument names the concrete ShardScript type to
serialize from or deserialize into.`})}),`
`,e.jsx(a,{code:`using stdio;
using json;

namespace demo;

public static func Main() -> void
{
  // Serialize a primitive value to JSON text.
  text: string = JsonSerializer.Serialize<int>(42);
  println(text);   // 42

  // Deserialize the text back to the original type.
  value: int = JsonSerializer.Deserialize<int>(text);
  println(value);  // 42
}`,language:"csharp",filename:"json_serializer_syntax.shard"}),`
`,e.jsx(c,{headers:["Member","Signature","Access"],rows:[[e.jsx(i,{children:"Serialize<T>(value)"}),e.jsx(e.Fragment,{children:e.jsx(i,{children:"static func Serialize<T>(value: T) -> string"})}),"Static generic method. T is inferred from the argument or supplied explicitly."],[e.jsx(i,{children:"Deserialize<T>(text)"}),e.jsx(e.Fragment,{children:e.jsx(i,{children:"static func Deserialize<T>(text: string) -> T"})}),"Static generic method. T must be supplied explicitly."]]}),`
`,e.jsx(l,{children:"Parameters / Arguments"}),`
`,e.jsx(c,{headers:["Member","Parameters","Description"],rows:[[e.jsx(i,{children:"Serialize<T>(value)"}),e.jsxs(e.Fragment,{children:[e.jsx(i,{children:"value"})," — any value whose type is supported by the serializer."]}),"The object graph to encode. Null references, primitives, arrays, enums, and class/struct instances are accepted."],[e.jsx(i,{children:"Deserialize<T>(text)"}),e.jsxs(e.Fragment,{children:[e.jsx(i,{children:"text"})," — a valid JSON string."]}),"The JSON text to parse. The root kind must match T: objects for classes/structs, arrays for arrays, and scalars for primitives."]]}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:["The type parameter ",e.jsx(i,{children:"T"}),` must be a closed, concrete type. Open generic
parameters, interfaces, and delegate types are not valid serialization targets.`]})}),`
`,e.jsx(l,{children:"Returns"}),`
`,e.jsx(c,{headers:["Member","Return Type","Description"],rows:[[e.jsx(i,{children:"Serialize<T>(value)"}),"string","A compact JSON representation of the supplied value."],[e.jsx(i,{children:"Deserialize<T>(text)"}),"T","A new instance of T populated from the JSON text."]]}),`
`,e.jsx(l,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Missing type argument"})," —"," ",`
`,e.jsx(i,{children:"Deserialize<T>"}),` requires an explicit type argument. Omitting it
raises `,e.jsx(i,{children:'"JSON: Deserialize requires a type argument, e.g. Deserialize<Person>(...)"'}),"."]})}),e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Null text argument"})," — Passing"," ",`
`,e.jsx(i,{children:"null"})," to ",e.jsx(i,{children:"Deserialize<T>"})," raises"," ",`
`,e.jsx(i,{children:'"JSON: Deserialize text is null"'}),"."]})}),e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Malformed JSON"}),` — Missing quotes, trailing
commas, unterminated strings, or unexpected characters raise`," ",`
`,e.jsx(i,{children:"RuntimeException"})," with a message that includes the parse position."]})}),e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Root kind mismatch"}),` — Deserializing a JSON
number into a class, or a JSON object into an array, raises`," ",`
`,e.jsx(i,{children:'"JSON: expected object"'})," or"," ",`
`,e.jsx(i,{children:'"JSON: expected array"'}),"."]})}),e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Non-finite double"})," — Serializing"," ",`
`,e.jsx(i,{children:"double.PositiveInfinity"}),", ",e.jsx(i,{children:"double.NegativeInfinity"}),`,
or `,e.jsx(i,{children:"double.NaN"})," raises"," ",`
`,e.jsx(i,{children:'"JSON: cannot serialize non-finite number"'}),"."]})}),e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Nesting depth exceeded"}),` — Object graphs deeper
than 512 levels raise`," ",`
`,e.jsx(i,{children:'"JSON: nesting depth exceeded (possible cycle)"'}),`. This is a depth guard,
not a true cycle detector.`]})})]}),`
`,e.jsx(l,{children:"Remarks"}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Supported type mapping."}),` The serializer and deserializer recognize a fixed set of
ShardScript types and map them to JSON as follows:`]})}),`
`,e.jsx(c,{headers:["ShardScript Type","JSON Type","Notes"],rows:[["int","Number","Integer value, serialized without a decimal point."],["double","Number","Floating-point value, formatted for round-trip safety."],["bool","Boolean","Literal true or false."],["char","String","A single-character string."],["string","String","UTF-16 text; control characters and non-ASCII code points are escaped."],["enum","Number","Serialized as the underlying integer value of the enumerator."],["T[]","Array","Elements are encoded recursively; null elements become JSON null."],["class / struct","Object","Each public field becomes a key-value pair."],["null reference","null","Serialized as the JSON literal null."]]}),`
`,e.jsx(d,{tone:"blue",children:e.jsxs(n.p,{children:["Only ",e.jsx("strong",{className:"text-text-primary",children:"public fields"}),` are serialized. Private and
static fields are skipped. The deserializer also populates only public fields; properties,
methods, and constructors other than the parameterless allocator are not involved.`]})}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Serialization rules."})," ",e.jsx(i,{children:"Serialize<T>"}),` walks the object
graph recursively and emits one JSON value. Class and struct instances become JSON objects whose
keys match field names exactly. Arrays become JSON arrays in element order. Null references,
including array elements and object fields, become the JSON literal `,e.jsx(i,{children:"null"}),`.
Enum values are written as their integer backing value, not as a string name.`]})}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Deserialization rules."})," ",e.jsx(i,{children:"Deserialize<T>"}),` allocates a
new instance of `,e.jsx(i,{children:"T"}),` and fills its public fields by matching JSON keys to
field names. The matching is case-sensitive and exact.`]})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Missing keys."}),` Fields without a matching JSON key
keep their default values: `,e.jsx(i,{children:"0"})," for integers,"," ",`
`,e.jsx(i,{children:"0.0"})," for doubles, ",e.jsx(i,{children:"false"})," for bools,"," ",`
`,e.jsx(i,{children:'""'})," for strings, and ",e.jsx(i,{children:"null"})," for reference types."]})}),e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Extra keys."}),` JSON keys that do not match any field
on the target type are silently ignored.`]})}),e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Primitive coercion."}),` When deserializing into a
primitive or enum field, the JSON value is coerced: numbers are truncated or parsed, strings
that represent numbers are parsed, and booleans map to `,e.jsx(i,{children:"1"})," /"," ",`
`,e.jsx(i,{children:"0"}),". Unparseable strings yield the default value instead of throwing."]})}),e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Reference nulls."}),` A JSON null assigned to a
reference-type field leaves that field as `,e.jsx(i,{children:"null"}),`. Value-type fields are
not affected by JSON null.`]})})]}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Cycle and depth protection."}),` Serialization keeps a recursion counter that
increments for each nested object or array. If the depth exceeds 512, the serializer aborts with a
`,e.jsx(i,{children:"RuntimeException"}),`. Cyclic references therefore cause a depth error rather
than an infinite loop. There is no reference-identity deduplication: the same object referenced
from two places is encoded twice.`]})}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Number formatting."}),` Integers are written with no fractional component. Doubles are
written with the shortest round-trip format: trailing zeros are removed, but enough precision is
preserved so that parsing the text back yields the same `,e.jsx(i,{children:"double"}),` value.
Non-finite floating-point values cannot be represented in JSON and raise an exception.`]})}),`
`,e.jsx(d,{tone:"amber",title:"Formatting options not implemented",children:e.jsxs(n.p,{children:[e.jsx(i,{children:"JsonSerializer"}),` always produces compact JSON with no whitespace,
indentation, or line breaks. Pretty-printing, custom naming policies (such as camelCase), and
per-field ignore attributes are not currently exposed. Use `,e.jsx(i,{children:"JsonNode"}),` for
scenarios that require a formatted or custom-shaped document.`]})}),`
`,e.jsx(s,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Unsupported types."}),` Interfaces, delegates, and open generic types are not
serialized. Attempting to serialize a field of one of these types produces`," ",`
`,e.jsx(i,{children:"null"}),` in the output. Dictionaries and other collection objects are treated
as plain classes, so only their public fields are encoded; their elements are not enumerated.`]})}),`
`,e.jsx(l,{children:"Examples"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Serializing and deserializing a class graph."})}),`
`,e.jsx(a,{code:`using stdio;
using json;

namespace demo;

public enum Status
{
  Active,
  Inactive
}

public class Address
{
  public City: string;
  public Zip: string;
}

public class Person
{
  public Name: string;
  public Age: int;
  public Height: double;
  public IsMember: bool;
  public State: Status;
  public Tags: string[];
  public Home: Address;
}

public static func Main() -> void
{
  person: Person = new Person();
  person.Name = "Ada Lovelace";
  person.Age = 36;
  person.Height = 1.68;
  person.IsMember = true;
  person.State = Status.Active;
  person.Tags = ["math", "compute"];

  home: Address = new Address();
  home.City = "London";
  home.Zip = "SW1";
  person.Home = home;

  text: string = JsonSerializer.Serialize<Person>(person);
  println(text);
  // {"Name":"Ada Lovelace","Age":36,"Height":1.68,"IsMember":true,"State":0,"Tags":["math","compute"],"Home":{"City":"London","Zip":"SW1"}}

  copy: Person = JsonSerializer.Deserialize<Person>(text);
  println(copy.Name);        // Ada Lovelace
  println(copy.Age);         // 36
  println(copy.Height);      // 1.68
  println(copy.Home.City);   // London

  foreach (tag in copy.Tags)
  {
      println(tag);          // math, compute
  }
}`,language:"csharp",filename:"json_serializer_object.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Primitive types, arrays, and string escaping."})}),`
`,e.jsx(a,{code:`using stdio;
using json;

namespace demo;

public class Sample
{
  public Count: int;
  public Ratio: double;
  public Flag: bool;
  public Label: string;
  public Letter: char;
  public Values: int[];
}

public static func Main() -> void
{
  sample: Sample = new Sample();
  sample.Count = 42;
  sample.Ratio = 3.141592653589793;
  sample.Flag = false;
  sample.Label = "hello\\nworld";   // newline escape inside the string
  sample.Letter = 'A';
  sample.Values = [10, 20, 30];

  text: string = JsonSerializer.Serialize<Sample>(sample);
  println(text);
  // {"Count":42,"Ratio":3.141592653589793,"Flag":false,"Label":"hello\\nworld","Letter":"A","Values":[10,20,30]}

  back: Sample = JsonSerializer.Deserialize<Sample>(text);
  println(back.Count);   // 42
  println(back.Ratio);   // 3.141592653589793
  println(back.Letter);  // A
}`,language:"csharp",filename:"json_serializer_primitives.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Missing keys, extra keys, and default values."})}),`
`,e.jsx(a,{code:`using stdio;
using json;

namespace demo;

public class Config
{
  public Name: string;
  public Timeout: int;
  public Verbose: bool;
}

public static func Main() -> void
{
  // "Region" does not exist on Config and is ignored.
  // "Verbose" is missing, so it keeps its default value.
  text: string = "{"Name":"worker","Timeout":5000,"Region":"us-east"}";

  config: Config = JsonSerializer.Deserialize<Config>(text);
  println(config.Name);     // worker
  println(config.Timeout);  // 5000
  println(config.Verbose);  // false
}`,language:"csharp",filename:"json_serializer_defaults.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Null references and linked objects."})}),`
`,e.jsx(a,{code:`using stdio;
using json;

namespace demo;

public class Node
{
  public Label: string;
  public Next: Node;
}

public static func Main() -> void
{
  first: Node = new Node();
  first.Label = "first";
  first.Next = null;

  text: string = JsonSerializer.Serialize<Node>(first);
  println(text);   // {"Label":"first","Next":null}

  back: Node = JsonSerializer.Deserialize<Node>(text);
  if (back.Next == null)
  {
      println("Next is null");
  }
}`,language:"csharp",filename:"json_serializer_null.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Handling malformed JSON and root-kind mismatches."})}),`
`,e.jsx(a,{code:`using stdio;
using json;

namespace demo;

public class Point
{
  public X: int;
  public Y: int;
}

public static func Main() -> void
{
  // Keys must be quoted strings in JSON.
  badObject: string = "{X:1,Y:2}";

  try
  {
      point1: Point = JsonSerializer.Deserialize<Point>(badObject);
      println(point1.X);
  }
  catch (ex: RuntimeException)
  {
      println("parse failed: keys must be quoted");
  }

  // An array root cannot be deserialized into a class.
  badRoot: string = "[1,2]";

  try
  {
      point2: Point = JsonSerializer.Deserialize<Point>(badRoot);
      println(point2.X);
  }
  catch (ex: RuntimeException)
  {
      println("root kind mismatch: expected object");
  }
}`,language:"csharp",filename:"json_serializer_errors.shard"}),`
`,e.jsx(s,{children:e.jsx("strong",{children:"Common mistake: serializing private fields."})}),`
`,e.jsx(a,{code:`using stdio;
using json;

namespace demo;

public class Account
{
  // Public fields are visible to the serializer.
  public Owner: string;

  // Private fields are ignored, even if they are initialized.
  private Pin: int;

  public init(owner: string, pin: int)
  {
      this.Owner = owner;
      this.Pin = pin;
  }
}

public static func Main() -> void
{
  account: Account = new Account("alice", 1234);

  text: string = JsonSerializer.Serialize<Account>(account);
  println(text);   // {"Owner":"alice"}

  // If Pin must round-trip, expose it as a public field or serialize a separate DTO.
}`,language:"csharp",filename:"json_serializer_private.shard"})]})}function u(r={}){const{wrapper:n}=r.components||{};return n?e.jsx(n,{...r,children:e.jsx(p,{...r})}):p(r)}function o(r,n){throw new Error("Expected component `"+r+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};
