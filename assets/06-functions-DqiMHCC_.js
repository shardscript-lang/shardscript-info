import{j as e}from"./index-DkFwvLJL.js";function h(a){const t={p:"p",...a.components},{Bullet:r,Callout:d,CodeBlock:c,DocsTable:o,H2:s,InlineCode:n,Prose:i}=t;return r||l("Bullet"),d||l("Callout"),c||l("CodeBlock"),o||l("DocsTable"),s||l("H2"),n||l("InlineCode"),i||l("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(s,{children:"Summary"}),`
`,e.jsx(i,{children:e.jsxs(t.p,{children:["A ",e.jsx("strong",{children:"function"})," in ShardScript is a named, reusable block of code declared with the ",e.jsx(n,{children:"func"})," keyword. Functions receive typed parameters, optionally return a value, and are invoked by writing the function name followed by a parenthesized argument list."]})}),`
`,e.jsx(s,{children:"Syntax"}),`
`,e.jsx(i,{children:e.jsxs(t.p,{children:["A function declaration consists of optional modifiers, the ",e.jsx(n,{children:"func"})," keyword, an identifier, an optional generic parameter list, a parenthesized parameter list, a return type, and a braced body."]})}),`
`,e.jsx(c,{code:`[access] [static] func Name<T>(parameters) -> ReturnType
{
  // body
}`,language:"csharp",filename:"function_syntax.shard"}),`
`,e.jsx(i,{children:e.jsx(t.p,{children:"A function is called by writing its name followed by a parenthesized argument list. Generic arguments are supplied inside angle brackets when they cannot be inferred."})}),`
`,e.jsx(c,{code:`// Call a function with explicit arguments.
result: int = Add(2, 3);

// Call a generic function with an explicit type argument.
swapped: int[] = Swap<int>(1, 2);

// Call a static function through its declaring type.
id: int = IdGenerator.Generate();`,language:"csharp",filename:"function_call_syntax.shard"}),`
`,e.jsx(o,{headers:["Element","Required","Description"],rows:[[e.jsx(e.Fragment,{children:e.jsx(n,{children:"access"})}),"Optional",e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"public"})," or ",e.jsx(n,{children:"private"}),". The default is ",e.jsx(n,{children:"private"}),"."]})],[e.jsx(e.Fragment,{children:e.jsx(n,{children:"static"})}),"Optional","Belongs to the enclosing type or namespace rather than an instance."],[e.jsx(e.Fragment,{children:e.jsx(n,{children:"Name"})}),"Yes","The identifier used to invoke the function."],[e.jsx(e.Fragment,{children:e.jsx(n,{children:"<T>"})}),"Optional","Generic type parameters, comma-separated, for polymorphic functions."],[e.jsx(e.Fragment,{children:e.jsx(n,{children:"(parameters)"})}),"Yes","Typed, comma-separated parameters. Empty parentheses mean no parameters."],[e.jsx(e.Fragment,{children:e.jsx(n,{children:"-> ReturnType"})}),"Yes","The type the function returns. Use <InlineCode>void</InlineCode> when there is no value."],[e.jsx(e.Fragment,{children:e.jsx(n,{children:"{ body }"})}),"Yes","A braced statement block containing the function logic."]]}),`
`,e.jsx(s,{children:"Parameters / Arguments"}),`
`,e.jsx(i,{children:e.jsxs(t.p,{children:["Parameters are declared positionally with explicit type annotations. Arguments at the call site are matched by position and checked for type compatibility. The first parameter of an instance method is an implicit ",e.jsx(n,{children:"this"})," reference, but ordinary top-level and static functions have no implicit receiver."]})}),`
`,e.jsx(o,{headers:["Form","Example","Meaning"],rows:[["Single typed parameter",e.jsx(n,{children:"name: string"}),"A parameter called name of type string."],["Multiple parameters",e.jsx(n,{children:"a: int, b: int"}),"Two independent parameters."],["No parameters",e.jsx(n,{children:"()"}),"Empty parameter list."],["Generic parameters",e.jsx(n,{children:"func Swap<T>(a: T, b: T)"}),"Type parameter T is bound at the call site."]]}),`
`,e.jsx(s,{children:"Returns"}),`
`,e.jsx(o,{headers:["Return Type","Meaning"],rows:[[e.jsx(n,{children:"void"}),"The function performs work but returns no value."],[e.jsx(n,{children:"int"}),"Returns a 64-bit signed integer."],[e.jsx(n,{children:"double"}),"Returns a 64-bit IEEE 754 floating-point value."],[e.jsx(n,{children:"bool"}),"Returns a Boolean value."],[e.jsx(n,{children:"string"}),"Returns an immutable Unicode string."],[e.jsx(n,{children:"T"}),"Returns a value of generic type T."]]}),`
`,e.jsx(s,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Missing return type"})," — Every function except constructors (",e.jsx(n,{children:"init"}),") must specify ",e.jsx(n,{children:"-> ReturnType"}),"."]})}),e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Return type mismatch"})," — Returning an ",e.jsx(n,{children:"int"})," from a function declared ",e.jsx(n,{children:"-> string"})," fails semantic analysis."]})}),e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Unreachable end of non-void function"})," — If a non-void function can complete without a ",e.jsx(n,{children:"return"})," statement, the compiler reports an error."]})}),e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Argument count mismatch"})," — Calling a function with too many or too few arguments is a compile-time error."]})}),e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Argument type mismatch"})," — An argument that is not assignable to the corresponding parameter type is rejected at compile time."]})}),e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Ambiguous overload"})," — Two functions in the same scope with the same name and identical parameter lists produce a duplicate-symbol error."]})})]}),`
`,e.jsx(s,{children:"Remarks"}),`
`,e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Functions versus methods."})," This page describes the core syntax shared by every callable named block. A function declared at namespace scope is a top-level function; a function declared inside a class, struct, or interface is a method. Methods are covered in the Object-Oriented Programming section because they interact with instances, access modifiers, and inheritance semantics."]})}),`
`,e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Static versus instance."})," A function marked ",e.jsx(n,{children:"static"})," has no implicit ",e.jsx(n,{children:"this"})," parameter and is invoked through its declaring type or namespace. An instance method omits ",e.jsx(n,{children:"static"})," and receives the receiver object as the first evaluation-stack slot."]})}),`
`,e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Overloading."})," Multiple functions may share the same name as long as their parameter lists differ in arity or type. Return type alone does not distinguish overloads. Overload resolution is performed at compile time and prefers exact type matches."]})}),`
`,e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Generic functions."})," A function can declare its own type parameters independent of any enclosing type. Type arguments may be supplied explicitly at the call site (",e.jsx(n,{children:"Swap<int>(a, b)"}),") or, in many cases, inferred from the argument types."]})}),`
`,e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Call dispatch."})," The compiler resolves a function call to a specific method symbol at compile time. Static and top-level calls emit ",e.jsx(n,{children:"CALLSTATICMETHODSYMBOL"}),"; instance calls emit ",e.jsx(n,{children:"CALLMETHODSYMBOL"}),". The VM pushes the arguments in declaration order, executes the method body, and leaves the return value on the caller's evaluation stack."]})}),`
`,e.jsx(d,{tone:"blue",children:e.jsx(t.p,{children:"Functions are not the same as delegates. A function declaration introduces a method symbol; a delegate is a separate callable value type. To store a function in a variable, pass it as an argument, or return it from another function, use a delegate. See the Delegates and Lambda Expressions articles for details."})}),`
`,e.jsx(s,{children:"Examples"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Basic function declaration and call."})}),`
`,e.jsx(c,{code:`using stdio;

namespace demo;

static func Add(a: int, b: int) -> int
{
  return a + b;
}

public static func Main() -> void
{
  sum: int = Add(2, 3);
  println(sum);   // 5
}`,language:"csharp",filename:"function_basic.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Function overloading."})}),`
`,e.jsx(c,{code:`using stdio;

namespace demo;

static func Print(value: int) -> void
{
  println("int: " + value);
}

static func Print(value: string) -> void
{
  println("string: " + value);
}

public static func Main() -> void
{
  Print(42);        // int: 42
  Print("hello");   // string: hello
}`,language:"csharp",filename:"function_overload.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Generic function."})}),`
`,e.jsx(c,{code:`using stdio;

namespace demo;

static func Swap<T>(a: T, b: T) -> T[]
{
  pair: T[] = new T[2];
  pair[0] = b;
  pair[1] = a;
  return pair;
}

public static func Main() -> void
{
  swapped: int[] = Swap<int>(1, 2);
  println(swapped[0]);   // 2
  println(swapped[1]);   // 1
}`,language:"csharp",filename:"function_generic.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Static function with type-level state."})}),`
`,e.jsx(c,{code:`using stdio;

namespace demo;

public class IdGenerator
{
  private static NextId: int;

  public static func Generate() -> int
  {
      id: int = IdGenerator.NextId;
      IdGenerator.NextId = IdGenerator.NextId + 1;
      return id;
  }
}

public static func Main() -> void
{
  println(IdGenerator.Generate());   // 0
  println(IdGenerator.Generate());   // 1
  println(IdGenerator.Generate());   // 2
}`,language:"csharp",filename:"function_static_state.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Common mistakes."})}),`
`,e.jsx(c,{code:`using stdio;

namespace demo;

static func Greet(name: string) -> void
{
  println("hello, " + name);
}

public static func Main() -> void
{
  // CORRECT: argument type and count match the declaration.
  Greet("world");

  // INCORRECT: these would fail at compile time.
  // Greet();            // ERROR: missing argument
  // Greet(123);         // ERROR: int is not assignable to string
  // Greet("a", "b");    // ERROR: too many arguments
}`,language:"csharp",filename:"function_mistakes.shard"}),`
`,e.jsx(s,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"Methods"})," — instance methods, access modifiers, and object-oriented callable members."]})}),e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"Delegates"})," — named and inline callable value types."]})}),e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"Lambda Expressions"})," — anonymous functions and delegate values."]})}),e.jsx(r,{children:e.jsxs(t.p,{children:[e.jsx(n,{children:"Constructors and Initialization"})," — special ",e.jsx(n,{children:"init"})," methods for object creation."]})})]}),`
`,e.jsx(s,{children:"Source"}),`
`,e.jsx(i,{children:e.jsxs(t.p,{children:["Function declarations are parsed into ",e.jsx(n,{children:"MethodDeclarationSyntax"})," nodes in ",e.jsx(n,{children:"ShardScript/ShardScript/src/parsing/SourceParser.cpp"}),". The syntax node definition is in ",e.jsx(n,{children:"ShardScript/ShardScript/include/shard/parsing/nodes/MemberDeclarations/MethodDeclarationSyntax.hpp"}),"."]})})]})}function m(a={}){const{wrapper:t}=a.components||{};return t?e.jsx(t,{...a,children:e.jsx(h,{...a})}):h(a)}function l(a,t){throw new Error("Expected component `"+a+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default};
