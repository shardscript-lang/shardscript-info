import{j as e}from"./index-BugjY_CW.js";function h(t){const s={code:"code",em:"em",p:"p",...t.components},{Bullet:a,Callout:l,CodeBlock:o,DocsTable:c,H2:i,InlineCode:n,Prose:r}=s;return a||d("Bullet"),l||d("Callout"),o||d("CodeBlock"),c||d("DocsTable"),i||d("H2"),n||d("InlineCode"),r||d("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(i,{children:"Summary"}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx(n,{children:"JsonNode"}),` is the mutable DOM (Document Object Model) representation of a
JSON value in `,e.jsx(n,{children:"shard.json"}),`. It lets you parse arbitrary JSON text,
inspect its structure, navigate objects and arrays by key or index, mutate values in-place,
and write the result back to a JSON string without declaring a typed model.`]})}),`
`,e.jsx(i,{children:"Syntax"}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:["All ",e.jsx(n,{children:"JsonNode"})," members live in the ",e.jsx(n,{children:"json"}),` namespace.
The class is a regular reference type; instances wrap a native `,e.jsx(n,{children:"JsonDom"})," ",`
tree stored in the private `,e.jsx(n,{children:"_handle"})," field."]})}),`
`,e.jsx(o,{code:`using stdio;
using json;

namespace demo;

public static func Main() -> void
{
  // Parse a JSON text into a DOM tree.
  root: JsonNode = JsonNode.Parse("{"name":"Ada","tags":["math","compute"]}");

  // Navigate and extract values.
  name: string = root.Get("name").AsString();
  firstTag: string = root.Get("tags").At(0).AsString();

  // Mutate the DOM and serialize it back to text.
  root.Set("age", JsonNode.Parse("36"));
  println(root.ToString());
}`,language:"csharp",filename:"jsonnode_overview.shard"}),`
`,e.jsx(i,{children:"Parameters / Arguments"}),`
`,e.jsx(c,{headers:["Member","Parameters","Description"],rows:[[e.jsx(s.code,{children:"Parse(text)"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"text"}),": ",e.jsx(n,{children:"string"})]}),"Parses a JSON text and returns the root JsonNode."],[e.jsx(s.code,{children:"Get(key)"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"key"}),": ",e.jsx(n,{children:"string"})]}),"Returns the child node at the given object key."],[e.jsx(s.code,{children:"node.key"}),e.jsxs(e.Fragment,{children:[e.jsx(s.em,{children:"key"}),": identifier"]}),'Access-operator shortcut for Get("key"); returns the child node or null.'],[e.jsx(s.code,{children:"Set(key, value)"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"key"}),": ",e.jsx(n,{children:"string"}),", ",e.jsx(n,{children:"value"}),": ",e.jsx(n,{children:"JsonNode"})]}),"Sets or overwrites a key on an object node."],[e.jsx(s.code,{children:"Contains(key)"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"key"}),": ",e.jsx(n,{children:"string"})]}),"True if the node is an object and contains the key."],[e.jsx(s.code,{children:"At(index)"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"index"}),": ",e.jsx(n,{children:"int"})]}),"Returns the array element at the zero-based index."],[e.jsx(s.code,{children:"Add(value)"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"value"}),": ",e.jsx(n,{children:"JsonNode"})]}),"Appends a value to an array node."]]}),`
`,e.jsx(i,{children:"Returns"}),`
`,e.jsx(c,{headers:["Member","Return Type","Return Value"],rows:[[e.jsx(s.code,{children:"Parse(text)"}),"JsonNode","The root node of the parsed JSON document."],[e.jsx(s.code,{children:"Kind"}),"JsonNodeKind","One of: Null, Boolean, Number, String, Array, Object."],[e.jsx(s.code,{children:"IsNull"}),"bool","True if the node is null or missing."],[e.jsx(s.code,{children:"IsObject"}),"bool","True if the node is a JSON object."],[e.jsx(s.code,{children:"IsArray"}),"bool","True if the node is a JSON array."],[e.jsx(s.code,{children:"AsInt()"}),"int","Integer value; non-number types return 0."],[e.jsx(s.code,{children:"AsDouble()"}),"double","Floating-point value; non-number types return 0.0."],[e.jsx(s.code,{children:"AsBool()"}),"bool","Boolean value; numbers test != 0, others return false."],[e.jsx(s.code,{children:"AsString()"}),"string","String value, or the JSON text for non-string nodes."],[e.jsx(s.code,{children:"Get(key)"}),"JsonNode","Child node, or null if missing or not an object."],[e.jsx(s.code,{children:"node.key"}),"JsonNode",'Same as Get("key"); returns null if the member is missing or the receiver is not an object.'],[e.jsx(s.code,{children:"node as int"}),"int","Casts the node to int using the same rules as AsInt()."],[e.jsx(s.code,{children:"node as double"}),"double","Casts the node to double using the same rules as AsDouble()."],[e.jsx(s.code,{children:"node as bool"}),"bool","Casts the node to bool using the same rules as AsBool()."],[e.jsx(s.code,{children:"node as string"}),"string","Casts the node to string using the same rules as AsString()."],[e.jsx(s.code,{children:"node as byte"}),"byte","Casts the numeric node to byte; non-numbers return 0."],[e.jsx(s.code,{children:"Set(key, value)"}),"void","No return value."],[e.jsx(s.code,{children:"Contains(key)"}),"bool","True if the object contains the key."],[e.jsx(s.code,{children:"Keys()"}),"string[]","All object keys, or an empty array for non-objects."],[e.jsx(s.code,{children:"Length()"}),"int","Array element count, or 0 for non-arrays."],[e.jsx(s.code,{children:"At(index)"}),"JsonNode","Array element, or null if out of bounds or not an array."],[e.jsx(s.code,{children:"Add(value)"}),"void","No return value."],[e.jsx(s.code,{children:"ToString()"}),"string","The node serialized back to compact JSON text."]]}),`
`,e.jsx(i,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(a,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Invalid JSON"})," —"," ",`
`,e.jsx(n,{children:"JsonNode.Parse"}),` throws a runtime error if the input is malformed,
contains trailing characters, has unterminated strings, or uses invalid escape sequences.`]})}),e.jsx(a,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Set on null node"})," — Calling"," ",`
`,e.jsx(n,{children:"Set"})," on a null/missing node throws because there is no DOM tree to mutate."]})}),e.jsx(a,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Add on null node"})," — Calling"," ",`
`,e.jsx(n,{children:"Add"})," on a null/missing node throws for the same reason."]})}),e.jsx(a,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Nesting depth exceeded"}),` — Both parsing and
serialization enforce a maximum depth of 512 levels to prevent stack overflow on deeply
nested or cyclic structures.`]})}),e.jsx(a,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Non-finite number"})," — Serializing a"," ",`
`,e.jsx(n,{children:"double"}),` that is NaN or infinity throws because these values have no
valid JSON representation.`]})})]}),`
`,e.jsx(i,{children:"Remarks"}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Type inspection."}),` Always inspect a node's kind before assuming its shape.
`,e.jsx(n,{children:"Kind"})," returns a ",e.jsx(n,{children:"JsonNodeKind"}),` value, while the
convenience predicates `,e.jsx(n,{children:"IsNull"}),", ",e.jsx(n,{children:"IsObject"}),", and"," ",`
`,e.jsx(n,{children:"IsArray"}),` cover the most common checks. A missing key or out-of-bounds
access returns the VM's `,e.jsx(n,{children:"null"})," instance, so"," ",`
`,e.jsx(n,{children:'node.Get("missing").IsNull'})," is true."]})}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Coercive extraction."})," The ",e.jsx(n,{children:"As*"}),` methods are forgiving:
they return zero-like defaults for mismatched kinds rather than throwing. This makes them useful
for loosely-structured data, but it also means typos in keys silently produce 0 or empty strings.
Use `,e.jsx(n,{children:"Contains"})," or ",e.jsx(n,{children:"Kind"}),` when you need to distinguish
between missing, null, and present-but-zero values.`]})}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Object navigation and mutation."})," ",e.jsx(n,{children:"Get"}),` performs a linear
scan over object members, so lookups are `,e.jsx(n,{children:"O(n)"}),` in the number of keys.
`,e.jsx(n,{children:"Set"}),` overwrites an existing key or appends a new one. If the receiver is
not an object, `,e.jsx(n,{children:"Set"}),` silently converts it into one by replacing its kind.
This lets you turn a parsed scalar into a container, but it discards the old value.`]})}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Array navigation and mutation."})," ",e.jsx(n,{children:"At"}),` checks the bounds and
returns null for invalid indices or non-array receivers. `,e.jsx(n,{children:"Add"}),` appends to
the end; like `,e.jsx(n,{children:"Set"}),`, it converts a non-array receiver into an array.
`,e.jsx(n,{children:"Length()"})," reports the element count for arrays and 0 for everything else."]})}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Stringify behavior."})," ",e.jsx(n,{children:"ToString()"}),` emits compact JSON with
no extra whitespace. Numbers are written with the shortest round-trip-safe representation.
Strings are escaped according to the JSON spec, including Unicode surrogate pairs and control
characters. Because `,e.jsx(n,{children:"JsonNode"})," implements ",e.jsx(n,{children:"IPrintable"}),`,
you can pass a node directly to `,e.jsx(n,{children:"println"}),"."]})}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Shared native DOM."})," ",e.jsx(n,{children:"JsonNode"})," and"," ",`
`,e.jsx(n,{children:"JsonSerializer"})," share the same internal ",e.jsx(n,{children:"JsonDom"})," ",`
tree. `,e.jsx(n,{children:"JsonNode.Parse"}),` builds the tree with the same recursive-descent
parser used by typed deserialization, and `,e.jsx(n,{children:"ToString()"}),` uses the same
writer as `,e.jsx(n,{children:"JsonSerializer.Serialize"}),"."]})}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Lifetime."})," The C++ ",e.jsx(n,{children:"JsonDom"})," nodes are allocated with"," ",`
`,e.jsx(n,{children:"new"}),` and are never freed; there is no destructor. Each parsed or mutated
node lives for the lifetime of the process. This is acceptable for configuration files and
bounded API payloads, but avoid creating large numbers of intermediate nodes in long-running
loops or stream processors.`]})}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Access operator."})," ",e.jsx(n,{children:"JsonNode"}),` overloads the delimiter operator
so object members can be read with dot syntax: `,e.jsx(n,{children:"node.Name"})," is equivalent to"," ",`
`,e.jsx(n,{children:'node.Get("Name")'}),`. The identifier after the dot is passed as the key name.
If the receiver is not an object or the key is missing, the expression returns a null node. This
works for any identifier that is a valid ShardScript token, including identifiers that would
otherwise collide with method names.`]})}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Cast operators."})," ",e.jsx(n,{children:"JsonNode"})," provides static"," ",`
`,e.jsx(n,{children:"as"})," overloads for ",e.jsx(n,{children:"int"}),","," ",`
`,e.jsx(n,{children:"double"}),", ",e.jsx(n,{children:"bool"}),", ",e.jsx(n,{children:"string"}),", and"," ",`
`,e.jsx(n,{children:"byte"}),". ",e.jsx(n,{children:"node as int"})," behaves like"," ",`
`,e.jsx(n,{children:"node.AsInt()"}),"; the other casts mirror their corresponding"," ",`
`,e.jsx(n,{children:"As*"}),` methods. These casts are convenient when extracting scalar values from
a dotted path, but they are forgiving and return zero-like defaults for mismatched or missing
values.`]})}),`
`,e.jsx(l,{tone:"amber",title:"Planned features",children:e.jsxs(s.p,{children:[`The current API provides the core DOM operations used in the test suite. Additional helpers such
as `,e.jsx(n,{children:"Remove(key)"}),", ",e.jsx(n,{children:"RemoveAt(index)"}),`, value-typed
constructors (for example `,e.jsx(n,{children:"JsonNode.FromInt"}),`), deep cloning, and formatted
(pretty-printed) output are planned but not yet implemented. Use `,e.jsx(n,{children:"Parse"})," ",`
to construct primitive nodes today.`]})}),`
`,e.jsx(i,{children:"Examples"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Parsing and inspecting a mixed document."})}),`
`,e.jsx(o,{code:`using stdio;
using json;

namespace demo;

public static func Main() -> void
{
  text: string = "{"a":[1,2,3],"b":"hi","c":null,"d":true,"e":-2.5e1}";
  root: JsonNode = JsonNode.Parse(text);

  println(root.Kind);                     // Object
  println(root.Get("b").AsString());      // hi
  println(root.Get("a").Length());        // 3
  println(root.Get("a").At(2).AsInt());   // 3
  println(root.Get("c").IsNull);          // true
  println(root.Get("d").AsBool());        // true
  println(root.Get("e").AsDouble());      // -25.0
  println(root.Contains("a"));            // true
  println(root.Contains("z"));            // false
}`,language:"csharp",filename:"jsonnode_inspect.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Iterating over object keys and array elements."})}),`
`,e.jsx(o,{code:`using stdio;
using json;

namespace demo;

public static func Main() -> void
{
  root: JsonNode = JsonNode.Parse("{"x":10,"y":20,"z":30}");
  keys: string[] = root.Keys();

  foreach (key in keys)
  {
      value: int = root.Get(key).AsInt();
      println(key + " = " + value);
  }

  items: JsonNode = JsonNode.Parse("[{"name":"a"},{"name":"b"}]");
  count: int = items.Length();

  for (i := 0; i < count; i = i + 1)
  {
      item: JsonNode = items.At(i);
      println(item.Get("name").AsString());
  }
}`,language:"csharp",filename:"jsonnode_iterate.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Mutating and building JSON documents."})}),`
`,e.jsx(o,{code:`using stdio;
using json;

namespace demo;

public static func Main() -> void
{
  mut: JsonNode = JsonNode.Parse("{"x":1}");

  // Add a new key with a parsed value node.
  mut.Set("y", JsonNode.Parse(""added""));

  // Convert the existing number at "x" into an object containing "nested".
  mut.Get("x").Set("nested", JsonNode.Parse("42"));

  // Build a fresh array and attach it.
  scores: JsonNode = JsonNode.Parse("[]");
  scores.Add(JsonNode.Parse("95"));
  scores.Add(JsonNode.Parse("87"));
  mut.Set("scores", scores);

  println(mut.ToString());
  // Output: {"x":{"nested":42},"y":"added","scores":[95,87]}
}`,language:"csharp",filename:"jsonnode_mutate.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Defensive access and common mistakes."})}),`
`,e.jsx(o,{code:`using stdio;
using json;

namespace demo;

public static func Main() -> void
{
  root: JsonNode = JsonNode.Parse("{"value":0,"missing":null}");

  // Mistake: AsInt returns 0 both for the literal 0 and for missing keys.
  zero: int = root.Get("value").AsInt();
  alsoZero: int = root.Get("doesNotExist").AsInt();
  println(zero);        // 0
  println(alsoZero);    // 0

  // Correct: check existence and kind before extraction.
  target: JsonNode = root.Get("value");
  if (!target.IsNull && target.Kind == JsonNodeKind.Number)
  {
      println("value is present: " + target.AsInt());
  }

  // Check for null vs missing with IsNull.
  if (root.Get("missing").IsNull)
  {
      println("missing is null or absent");
  }

  // Array bounds return null nodes, not errors.
  arr: JsonNode = JsonNode.Parse("[10,20]");
  bad: JsonNode = arr.At(99);
  println(bad.IsNull);      // true
}`,language:"csharp",filename:"jsonnode_defensive.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Dot-access and cast shortcuts."})}),`
`,e.jsx(o,{code:`using stdio;
using json;

namespace demo;

public static func Main() -> void
{
  node: JsonNode = JsonNode.Parse("{"Name":"Ada","Age":36,"Height":1.68,"Active":true,"Missing":null}");

  // Dot access returns a JsonNode for the named member.
  println(node.Name as string);      // Ada
  println(node.Age as int);          // 36
  println(node.Height as double);    // 1.68
  println(node.Active as bool);      // true

  // Missing members produce a null node rather than throwing.
  println(node.Missing.IsNull);      // true
  println(node.Missing as int);      // 0

  // Array elements still use At(index).
  arr: JsonNode = JsonNode.Parse("[10,20,30]");
  println(arr.At(1).AsInt());        // 20

  // Byte casts are also supported.
  println(node.Age as byte);         // 36
}`,language:"csharp",filename:"jsonnode_access_cast.shard"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Round-tripping with typed serialization."})}),`
`,e.jsx(o,{code:`using stdio;
using json;

namespace demo;

public class Person
{
  public Name: string;
  public Age: int;
}

public static func Main() -> void
{
  raw: string = "{"Name":"Grace","Age":28}";

  // Use JsonNode for structural validation, then deserialize the inner object.
  root: JsonNode = JsonNode.Parse(raw);

  if (root.Contains("Name") && root.Contains("Age"))
  {
      person: Person = JsonSerializer.Deserialize<Person>(root.ToString());
      println(person.Name + " is " + person.Age);
  }
  else
  {
      println("schema mismatch");
  }
}`,language:"csharp",filename:"jsonnode_hybrid.shard"}),`
`,e.jsx(l,{tone:"blue",children:e.jsxs(s.p,{children:[e.jsx(n,{children:"AsString()"}),` on a non-string node returns the JSON text of that node, not
an empty string. For example, `,e.jsx(n,{children:'JsonNode.Parse("42").AsString()'}),` returns
the string `,e.jsx(n,{children:'"42"'})," and"," ",`
`,e.jsx(n,{children:'JsonNode.Parse("[1,2]").AsString()'}),` returns the string
`,e.jsx(n,{children:'"[1,2]"'}),". Use ",e.jsx(n,{children:"Kind"}),` first if you need
to distinguish strings from other types.`]})})]})}function x(t={}){const{wrapper:s}=t.components||{};return s?e.jsx(s,{...t,children:e.jsx(h,{...t})}):h(t)}function d(t,s){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
