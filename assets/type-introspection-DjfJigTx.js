import{j as e}from"./index-BugjY_CW.js";function p(i){const n={code:"code",p:"p",...i.components},{Bullet:o,Callout:d,CodeBlock:s,DocsTable:a,H2:l,InlineCode:r,Prose:t}=n;return o||c("Bullet"),d||c("Callout"),s||c("CodeBlock"),a||c("DocsTable"),l||c("H2"),r||c("InlineCode"),t||c("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(l,{children:"Summary"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:["The ",e.jsx(r,{children:"shard.reflection"})," library exposes a runtime ",e.jsx(r,{children:"Type"})," ",`
class in the `,e.jsx(r,{children:"reflection"}),` namespace for inspecting types, members, and
assignability relationships. It also provides `,e.jsx(r,{children:"MethodInfo"}),","," ",`
`,e.jsx(r,{children:"FieldInfo"}),", ",e.jsx(r,{children:"PropertyInfo"}),", and"," ",`
`,e.jsx(r,{children:"ParameterInfo"})," wrappers for enumerating the members of a type."]})}),`
`,e.jsx(l,{children:"Syntax"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:["All reflection types live in the ",e.jsx(r,{children:"reflection"}),` namespace. The entry point is
the static `,e.jsx(r,{children:"Type"})," class:"]})}),`
`,e.jsx(s,{code:`using stdio;
using reflection;

namespace demo;

public static func Main() -> void
{
  // Obtain a Type from an instance.
  value: int = 42;
  runtimeType: Type = Type.Of(value);

  // Obtain a Type by name.
  namedType: Type = Type.GetType("Integer");

  println(runtimeType.Name);
  println(namedType.Name);
}`,language:"csharp",filename:"type_basics.shard"}),`
`,e.jsx(a,{headers:["Type","Description"],rows:[[e.jsx(n.code,{children:"Type"}),"Runtime descriptor for a ShardScript type."],[e.jsx(n.code,{children:"MethodInfo"}),"Descriptor for a method or function declared on a type."],[e.jsx(n.code,{children:"FieldInfo"}),"Descriptor for a field declared on a type."],[e.jsx(n.code,{children:"PropertyInfo"}),"Descriptor for a property declared on a type."],[e.jsx(n.code,{children:"ParameterInfo"}),"Descriptor for a single parameter of a method."]]}),`
`,e.jsx(a,{headers:["Member","Signature","Description"],rows:[[e.jsx(n.code,{children:"Type.Of(instance)"}),e.jsx(e.Fragment,{children:e.jsx(n.code,{children:"static func Of(object: any) -> Type"})}),"Returns the runtime type of an object."],[e.jsx(n.code,{children:"Type.GetType(name)"}),e.jsx(e.Fragment,{children:e.jsx(n.code,{children:"static func GetType(name: string) -> Type"})}),"Looks up a type by simple name or fully-qualified name."],[e.jsx(n.code,{children:"Type.Name"}),e.jsx(e.Fragment,{children:e.jsx(n.code,{children:"property Name: string"})}),"Simple name of the type."],[e.jsx(n.code,{children:"Type.FullName"}),e.jsx(e.Fragment,{children:e.jsx(n.code,{children:"property FullName: string"})}),"Fully-qualified name including namespace."],[e.jsx(n.code,{children:"Type.Namespace"}),e.jsx(e.Fragment,{children:e.jsx(n.code,{children:"property Namespace: string"})}),"Namespace portion of the full name, or an empty string."],[e.jsx(n.code,{children:"Type.IsArray"}),e.jsx(e.Fragment,{children:e.jsx(n.code,{children:"property IsArray: bool"})}),"True when the type is an array type."],[e.jsx(n.code,{children:"Type.IsClass"}),e.jsx(e.Fragment,{children:e.jsx(n.code,{children:"property IsClass: bool"})}),"True when the type is a class."],[e.jsx(n.code,{children:"Type.IsStruct"}),e.jsx(e.Fragment,{children:e.jsx(n.code,{children:"property IsStruct: bool"})}),"True when the type is a struct."],[e.jsx(n.code,{children:"Type.IsInterface"}),e.jsx(e.Fragment,{children:e.jsx(n.code,{children:"property IsInterface: bool"})}),"True when the type is an interface."],[e.jsx(n.code,{children:"Type.IsEnum"}),e.jsx(e.Fragment,{children:e.jsx(n.code,{children:"property IsEnum: bool"})}),"True when the type is an enum."],[e.jsx(n.code,{children:"Type.IsGeneric"}),e.jsx(e.Fragment,{children:e.jsx(n.code,{children:"property IsGeneric: bool"})}),"True when the type is a constructed generic type."],[e.jsx(n.code,{children:"Type.IsPrimitive"}),e.jsx(e.Fragment,{children:e.jsx(n.code,{children:"property IsPrimitive: bool"})}),"True when the type is a primitive such as int, bool, or string."],[e.jsx(n.code,{children:"Type.GetElementType()"}),e.jsx(e.Fragment,{children:e.jsx(n.code,{children:"func GetElementType() -> Type"})}),"Returns the element type of an array, or null."],[e.jsx(n.code,{children:"Type.GetInterfaces()"}),e.jsx(e.Fragment,{children:e.jsx(n.code,{children:"func GetInterfaces() -> Type[]"})}),"Returns all interfaces implemented by the type."],[e.jsx(n.code,{children:"Type.IsAssignableFrom(other)"}),e.jsx(e.Fragment,{children:e.jsx(n.code,{children:"func IsAssignableFrom(other: Type) -> bool"})}),"True when the target type can be assigned from the other type."],[e.jsx(n.code,{children:"Type.GetMethods()"}),e.jsx(e.Fragment,{children:e.jsx(n.code,{children:"func GetMethods() -> MethodInfo[]"})}),"Returns all methods declared on the type."],[e.jsx(n.code,{children:"Type.GetFields()"}),e.jsx(e.Fragment,{children:e.jsx(n.code,{children:"func GetFields() -> FieldInfo[]"})}),"Returns all fields declared on the type."],[e.jsx(n.code,{children:"Type.GetProperties()"}),e.jsx(e.Fragment,{children:e.jsx(n.code,{children:"func GetProperties() -> PropertyInfo[]"})}),"Returns all properties declared on the type."]]}),`
`,e.jsx(a,{headers:["Member","Signature","Description"],rows:[[e.jsx(n.code,{children:"MethodInfo.Name"}),e.jsx(e.Fragment,{children:e.jsx(n.code,{children:"property Name: string"})}),"Name of the method."],[e.jsx(n.code,{children:"MethodInfo.ReturnType"}),e.jsx(e.Fragment,{children:e.jsx(n.code,{children:"property ReturnType: Type"})}),"Declared return type of the method."],[e.jsx(n.code,{children:"MethodInfo.IsStatic"}),e.jsx(e.Fragment,{children:e.jsx(n.code,{children:"property IsStatic: bool"})}),"True when the method is declared static."],[e.jsx(n.code,{children:"MethodInfo.GetParameters()"}),e.jsx(e.Fragment,{children:e.jsx(n.code,{children:"func GetParameters() -> ParameterInfo[]"})}),"Returns the parameters of the method in declaration order."],[e.jsx(n.code,{children:"FieldInfo.Name"}),e.jsx(e.Fragment,{children:e.jsx(n.code,{children:"property Name: string"})}),"Name of the field."],[e.jsx(n.code,{children:"FieldInfo.FieldType"}),e.jsx(e.Fragment,{children:e.jsx(n.code,{children:"property FieldType: Type"})}),"Declared type of the field."],[e.jsx(n.code,{children:"FieldInfo.IsStatic"}),e.jsx(e.Fragment,{children:e.jsx(n.code,{children:"property IsStatic: bool"})}),"True when the field is declared static."],[e.jsx(n.code,{children:"PropertyInfo.Name"}),e.jsx(e.Fragment,{children:e.jsx(n.code,{children:"property Name: string"})}),"Name of the property."],[e.jsx(n.code,{children:"PropertyInfo.PropertyType"}),e.jsx(e.Fragment,{children:e.jsx(n.code,{children:"property PropertyType: Type"})}),"Declared type of the property."],[e.jsx(n.code,{children:"PropertyInfo.IsStatic"}),e.jsx(e.Fragment,{children:e.jsx(n.code,{children:"property IsStatic: bool"})}),"True when the property is declared static."],[e.jsx(n.code,{children:"ParameterInfo.Name"}),e.jsx(e.Fragment,{children:e.jsx(n.code,{children:"property Name: string"})}),"Name of the parameter."],[e.jsx(n.code,{children:"ParameterInfo.ParameterType"}),e.jsx(e.Fragment,{children:e.jsx(n.code,{children:"property ParameterType: Type"})}),"Declared type of the parameter."]]}),`
`,e.jsx(l,{children:"Parameters / Arguments"}),`
`,e.jsx(a,{headers:["Parameter","Type","Description"],rows:[[e.jsx(n.code,{children:"object"}),"any","The instance whose runtime type is requested."],[e.jsx(n.code,{children:"name"}),"string",'The simple name or fully-qualified name of a type. Examples: "Integer", "collections.List", "IEnumerable".'],[e.jsx(n.code,{children:"other"}),"Type","The candidate source type in an assignability check."]]}),`
`,e.jsx(l,{children:"Returns"}),`
`,e.jsx(a,{headers:["Member","Return Type","Description"],rows:[[e.jsx(n.code,{children:"Type.Of(instance)"}),e.jsx(n.code,{children:"Type"}),"The runtime type of the instance, or null when the instance is null."],[e.jsx(n.code,{children:"Type.GetType(name)"}),e.jsx(n.code,{children:"Type"}),"The type whose name matches, or a runtime error when no match exists."],[e.jsx(n.code,{children:"Type.Name"}),e.jsx(n.code,{children:"string"}),'Simple type name such as "List" or "Integer".'],[e.jsx(n.code,{children:"Type.FullName"}),e.jsx(n.code,{children:"string"}),'Fully-qualified name such as "collections.List".'],[e.jsx(n.code,{children:"Type.Namespace"}),e.jsx(n.code,{children:"string"}),'Namespace such as "collections", or an empty string for global types.'],[e.jsx(n.code,{children:"Type.Is*"}),e.jsx(n.code,{children:"bool"}),"Classification flag for the represented type."],[e.jsx(n.code,{children:"Type.GetElementType()"}),e.jsx(n.code,{children:"Type"}),"Element type for arrays, otherwise null."],[e.jsx(n.code,{children:"Type.GetInterfaces()"}),e.jsx(n.code,{children:"Type[]"}),"Array of implemented interfaces. Empty when none."],[e.jsx(n.code,{children:"Type.IsAssignableFrom(other)"}),e.jsx(n.code,{children:"bool"}),"True when a value of the other type can be assigned to the represented type."],[e.jsx(n.code,{children:"Type.GetMethods()"}),e.jsx(n.code,{children:"MethodInfo[]"}),"Array of methods declared on the type."],[e.jsx(n.code,{children:"Type.GetFields()"}),e.jsx(n.code,{children:"FieldInfo[]"}),"Array of fields declared on the type."],[e.jsx(n.code,{children:"Type.GetProperties()"}),e.jsx(n.code,{children:"PropertyInfo[]"}),"Array of properties declared on the type."],[e.jsx(n.code,{children:"MethodInfo.GetParameters()"}),e.jsx(n.code,{children:"ParameterInfo[]"}),"Array of parameters for the method."]]}),`
`,e.jsx(l,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(o,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Compile-time namespace resolution"})," — The"," ",`
`,e.jsx(r,{children:"reflection"})," namespace must be imported with"," ",`
`,e.jsx(r,{children:"using reflection;"})," before ",e.jsx(r,{children:"Type"}),` or the member-info
types can be referenced.`]})}),e.jsx(o,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Type not found"})," — ",e.jsx(r,{children:"Type.GetType(name)"})," ",`
throws a runtime exception when the supplied name does not match any loaded type by simple or
fully-qualified name.`]})}),e.jsx(o,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Null instance introspection"})," —"," ",`
`,e.jsx(r,{children:"Type.Of(null)"})," returns ",e.jsx(r,{children:"null"}),`. It does not throw,
so the result must be checked before accessing members.`]})}),e.jsx(o,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Invalid element-type query"})," —"," ",`
`,e.jsx(r,{children:"Type.GetElementType()"})," returns ",e.jsx(r,{children:"null"}),` when the type
is not an array.`]})})]}),`
`,e.jsx(l,{children:"Remarks"}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Type lookup rules."})," ",e.jsx(r,{children:"Type.GetType"}),` accepts either a simple
name or a fully-qualified name. It first checks the built-in primitives
(`,e.jsx(r,{children:"Void"}),", ",e.jsx(r,{children:"Null"}),", ",e.jsx(r,{children:"Any"}),","," ",`
`,e.jsx(r,{children:"Boolean"}),", ",e.jsx(r,{children:"Integer"}),", ",e.jsx(r,{children:"Double"}),","," ",`
`,e.jsx(r,{children:"Char"}),", ",e.jsx(r,{children:"String"}),", ",e.jsx(r,{children:"Array"}),","," ",`
`,e.jsx(r,{children:"NativeInteger"}),") and standard library types such as"," ",`
`,e.jsx(r,{children:"RuntimeException"}),", ",e.jsx(r,{children:"IDisposable"}),", and"," ",`
`,e.jsx(r,{children:"IEnumerable"}),`. It then searches all user-defined types loaded in the current
symbol table. Names are matched case-sensitively.`]})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Assignability semantics."})," ",e.jsx(r,{children:"target.IsAssignableFrom(source)"})," ",`
follows the same rules as the compiler. It returns `,e.jsx(r,{children:"true"}),` when a value of the
source type can be used where the target type is expected, including inheritance, interface
implementation, and primitive widening.`]})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Generic types."})," When reflecting over a constructed generic instance such as"," ",`
`,e.jsx(r,{children:"List<int>"}),", the returned ",e.jsx(r,{children:"Type"})," reports"," ",`
`,e.jsx(r,{children:"IsGeneric = true"})," and its ",e.jsx(r,{children:"Name"}),` is the simple name of
the generic definition. Member enumeration methods such as `,e.jsx(r,{children:"GetMethods"}),","," ",`
`,e.jsx(r,{children:"GetFields"}),", and ",e.jsx(r,{children:"GetProperties"}),` operate on the
underlying generic definition, so the returned `,e.jsx(r,{children:"MethodInfo"}),","," ",`
`,e.jsx(r,{children:"FieldInfo"}),", and ",e.jsx(r,{children:"PropertyInfo"}),` objects describe the
members declared by `,e.jsx(r,{children:"List<T>"})," rather than a constructed specialization."]})}),`
`,e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Member visibility."}),` Reflection enumerates members declared on the type itself. It does
not currently walk the inheritance hierarchy or surface inherited members, and it does not filter by
access modifier. The set returned by `,e.jsx(r,{children:"GetMethods"}),` includes all methods known to
the compiler symbol table for that type definition.`]})}),`
`,e.jsx(d,{tone:"blue",children:e.jsxs(n.p,{children:["Prefer ",e.jsx(r,{children:"Type.Of(instance)"})," when you already have an object. Use"," ",`
`,e.jsx(r,{children:'Type.GetType("Full.Name")'}),` only when you need to resolve a type dynamically by
name.`]})}),`
`,e.jsx(d,{tone:"amber",title:"Not implemented",children:e.jsxs(n.p,{children:[e.jsx(r,{children:"shard.reflection"}),` does not currently expose constructors, events, base-type
traversal, generic type arguments, custom attributes, or dynamic invocation of methods and property
accessors. It is a read-only inspection API.`]})}),`
`,e.jsx(l,{children:"Examples"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Basic type inspection of a generic list."})}),`
`,e.jsx(s,{code:`using stdio;
using collections;
using reflection;

namespace demo;

public static func Main() -> void
{
  listOfInts: List<int> = new List<int>();
  listOfInts.Add(10);
  listOfInts.Add(20);

  listType: Type = Type.Of(listOfInts);

  println("Name      : " + listType.Name);
  println("FullName  : " + listType.FullName);
  println("Namespace : " + listType.Namespace);
  println("IsClass   : " + listType.IsClass);
  println("IsGeneric : " + listType.IsGeneric);
  println("IsArray   : " + listType.IsArray);
  println("IsPrimitive : " + listType.IsPrimitive);
}`,language:"csharp",filename:"type_list.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Array introspection and element types."})}),`
`,e.jsx(s,{code:`using stdio;
using reflection;

namespace demo;

public static func Main() -> void
{
  arrayOfInts: int[] = 1..3;

  arrayType: Type = Type.Of(arrayOfInts);

  println("Name    : " + arrayType.Name);
  println("IsArray : " + arrayType.IsArray);

  elementType: Type = arrayType.GetElementType();
  if (elementType != null)
  {
      println("Element : " + elementType.Name);
  }

  // Demonstrate the null fallback for non-array types.
  intType: Type = Type.GetType("Integer");
  nonElement: Type = intType.GetElementType();
  if (nonElement == null)
  {
      println("Integer has no element type");
  }
}`,language:"csharp",filename:"type_array.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Looking up types by name."})}),`
`,e.jsx(s,{code:`using stdio;
using reflection;

namespace demo;

public static func Main() -> void
{
  intType: Type = Type.GetType("Integer");
  println("int name        : " + intType.Name);
  println("int IsPrimitive : " + intType.IsPrimitive);

  listType: Type = Type.GetType("collections.List");
  println("list name       : " + listType.Name);
  println("list IsClass    : " + listType.IsClass);

  iEnumerableType: Type = Type.GetType("IEnumerable");
  println("IEnumerable name : " + iEnumerableType.Name);
  println("IsInterface      : " + iEnumerableType.IsInterface);
}`,language:"csharp",filename:"type_by_name.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Checking assignability and implemented interfaces."})}),`
`,e.jsx(s,{code:`using stdio;
using collections;
using reflection;

namespace demo;

public static func Main() -> void
{
  listOfInts: List<int> = new List<int>();
  arrayOfInts: int[] = 1..3;

  listType: Type = Type.Of(listOfInts);
  arrayType: Type = Type.Of(arrayOfInts);
  iEnumerableType: Type = Type.GetType("IEnumerable");

  println("IEnumerable <- int[]      : " + iEnumerableType.IsAssignableFrom(arrayType));
  println("IEnumerable <- List<int>  : " + iEnumerableType.IsAssignableFrom(listType));

  println("Interfaces of List<int>:");
  ifaces: Type[] = listType.GetInterfaces();
  foreach (iface in ifaces)
  {
      println("  " + iface.FullName);
  }
}`,language:"csharp",filename:"type_assignability.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Enumerating methods, fields, and properties."})}),`
`,e.jsx(s,{code:`using stdio;
using collections;
using reflection;

namespace demo;

public static func Main() -> void
{
  listOfInts: List<int> = new List<int>();
  listType: Type = Type.Of(listOfInts);

  println("Methods:");
  methods: MethodInfo[] = listType.GetMethods();
  foreach (m in methods)
  {
      println("  " + m.Name + " -> " + m.ReturnType.Name);
  }

  println("Fields:");
  fields: FieldInfo[] = listType.GetFields();
  foreach (f in fields)
  {
      println("  " + f.Name + " : " + f.FieldType.Name + " (static=" + f.IsStatic + ")");
  }

  println("Properties:");
  props: PropertyInfo[] = listType.GetProperties();
  foreach (p in props)
  {
      println("  " + p.Name + " : " + p.PropertyType.Name + " (static=" + p.IsStatic + ")");
  }
}`,language:"csharp",filename:"type_members.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Inspecting method parameters."})}),`
`,e.jsx(s,{code:`using stdio;
using collections;
using reflection;

namespace demo;

public static func Main() -> void
{
  listOfInts: List<int> = new List<int>();
  listType: Type = Type.Of(listOfInts);

  methods: MethodInfo[] = listType.GetMethods();
  foreach (m in methods)
  {
      if (m.Name == "Add")
      {
          println("Method: " + m.Name);
          println("ReturnType: " + m.ReturnType.Name);
          println("IsStatic: " + m.IsStatic);

          parameters: ParameterInfo[] = m.GetParameters();
          foreach (p in parameters)
          {
              println("  Parameter: " + p.Name + " : " + p.ParameterType.Name);
          }
      }
  }
}`,language:"csharp",filename:"type_parameters.shard"}),`
`,e.jsx(t,{children:e.jsx("strong",{children:"Handling null instances safely."})}),`
`,e.jsx(s,{code:`using stdio;
using reflection;

namespace demo;

public static func Main() -> void
{
  maybe: object = null;

  // Type.Of returns null when the instance is null.
  type: Type = Type.Of(maybe);
  if (type == null)
  {
      println("Cannot reflect a null instance");
      return;
  }

  println(type.Name);
}`,language:"csharp",filename:"type_null.shard"})]})}function y(i={}){const{wrapper:n}=i.components||{};return n?e.jsx(n,{...i,children:e.jsx(p,{...i})}):p(i)}function c(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{y as default};
