import{j as e}from"./index-DbX8E4-q.js";function h(r){const t={p:"p",strong:"strong",...r.components},{Bullet:s,Callout:l,CodeBlock:a,DocsTable:d,H2:o,InlineCode:i,Prose:n}=t;return s||c("Bullet"),l||c("Callout"),a||c("CodeBlock"),d||c("DocsTable"),o||c("H2"),i||c("InlineCode"),n||c("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(o,{children:"Summary"}),`
`,e.jsx(n,{children:e.jsxs(t.p,{children:["Extension methods let you call a top-level ",e.jsx(i,{children:"static"}),` function as if it were an
instance method on its first parameter type. The receiver becomes the first argument, and the
compiler emits the same bytecode as a normal static call — there is no runtime dispatch overhead.`]})}),`
`,e.jsx(o,{children:"Syntax"}),`
`,e.jsx(n,{children:e.jsx(t.p,{children:`An extension method is declared exactly like any other static function. The receiver type is the
type of the first parameter. It is invoked with dot syntax on an expression of that type.`})}),`
`,e.jsx(a,{code:`// Declaration: a static function whose first parameter is the receiver.
public static func Name(receiver: ReceiverType, arg: ArgType) -> ReturnType
{
  // body
}

// Invocation: the receiver is written before the dot.
receiverExpression.Name(otherArg)`,language:"csharp",filename:"extension_syntax.shard"}),`
`,e.jsx(n,{children:e.jsxs(t.p,{children:["There is no special keyword, attribute, or ",e.jsx(i,{children:"this"}),` parameter modifier. Any
static function whose first parameter is compatible with the receiver expression is an extension
candidate.`]})}),`
`,e.jsx(o,{children:"Parameters / Arguments"}),`
`,e.jsx(d,{headers:["Part","Description"],rows:[[e.jsxs(e.Fragment,{children:[e.jsx(t.strong,{children:"Receiver"})," (first parameter)"]}),"The expression on the left-hand side of the dot. Its type must be assignable to the first parameter type."],[e.jsx(e.Fragment,{children:e.jsx(t.strong,{children:"Explicit arguments"})}),"The arguments supplied inside the parentheses, matching the remaining parameters in order."],[e.jsxs(e.Fragment,{children:[e.jsx(t.strong,{children:"Type arguments"})," (optional)"]}),"For generic extension methods, explicit type arguments may be supplied between the method name and the argument list."]]}),`
`,e.jsx(n,{children:e.jsxs(t.p,{children:["Resolution follows this order when the binder sees ",e.jsx(i,{children:"receiver.Method(args)"}),":"]})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"1. Type-scoped lookup"}),` — The binder searches the
receiver type for an instance or static method with the requested name and argument count. If a
match is found, it is used directly.`]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"2. Global static method lookup"}),` — Every top-level
static method in the compilation is checked. The receiver type is prepended as the first
argument, and the binder looks for a parameter-type match. If one is found, the call is marked
as an extension method invocation.`]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"3. Local-scope fallback"}),` — Methods declared in the
current scope (local functions, closures) are checked for extension compatibility. Delegate
variables are checked last.`]})})]}),`
`,e.jsx(n,{children:e.jsx(t.p,{children:"A static function qualifies as an extension candidate only when all of the following hold:"})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(t.p,{children:["It is declared with ",e.jsx(i,{children:"static"})," linkage (the compiler uses"," ",`
`,e.jsx(i,{children:"LINK_STATIC"})," internally)."]})}),e.jsx(s,{children:"It has at least one parameter."}),e.jsx(s,{children:"The receiver type is assignable to the first parameter type."}),e.jsx(s,{children:e.jsx(t.p,{children:"The remaining parameters match the supplied explicit argument count and types."})})]}),`
`,e.jsx(o,{children:"Returns"}),`
`,e.jsx(n,{children:e.jsx(t.p,{children:`An extension method returns whatever its declared return type specifies. The dot invocation
expression has that same type, so it can be used anywhere a value of that type is expected:
assigned, passed as an argument, awaited, or used as the receiver for another extension call.`})}),`
`,e.jsx(o,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"No matching method"}),` — If no instance method,
static method, or extension candidate matches the name and argument list, semantic analysis
reports an unresolved method error.`]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Static method called on instance reference"}),` —
When a static method exists but does not accept the receiver as its first parameter, writing`," ",`
`,e.jsx(i,{children:"receiver.Method()"}),` fails unless the method qualifies as an extension
candidate.`]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Ambiguous overload"}),` — If more than one extension
method could accept the receiver and arguments, the binder may report an ambiguity error
depending on the current overload-resolution rules.`]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Type mismatch in explicit arguments"}),` — Arguments
after the receiver must be assignable to the corresponding parameters, just as in a normal
static call.`]})}),e.jsx(s,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Generic type inference failure"}),` — If the compiler
cannot infer a generic extension's type arguments from the receiver and explicit arguments, you
must supply them explicitly.`]})})]}),`
`,e.jsx(o,{children:"Remarks"}),`
`,e.jsx(n,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Static class requirement."})," Only top-level functions declared with"," ",`
`,e.jsx(i,{children:"static"}),` linkage can become extension methods. Instance methods are already
callable with dot syntax and do not participate in extension lookup. The requirement is enforced
by `,e.jsx(i,{children:"IsExtensionMethodCandidate"}),`, which rejects any method whose linking is
not `,e.jsx(i,{children:"LINK_STATIC"}),"."]})}),`
`,e.jsx(n,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Zero-cost abstraction."}),` Extension methods are fully resolved at compile time. The
compiler sets `,e.jsx(i,{children:"IsExtensionMethodInvocation = true"}),` only to suppress the
"cannot call static method on instance reference" diagnostic; it does not change code generation.
The receiver expression is evaluated and pushed onto the evaluation stack, followed by the
explicit arguments, and the emitter emits `,e.jsx(i,{children:"CALLMETHODSYMBOL"}),` exactly as it
would for a static call. At runtime the VM copies the receiver into parameter slot 0 and executes
the method body. There is no vtable lookup, no delegate allocation, and no wrapper object.`]})}),`
`,e.jsx(n,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Resolution is not transitive across namespaces."}),` Extension methods are found by
searching the compilation's top-level static methods and the current scope. The feature does not
require a `,e.jsx(i,{children:"using"}),` directive to bring extension methods into scope — if the
static function is visible to the binder, it is a candidate. This is different from some other
languages that restrict extension lookup by import.`]})}),`
`,e.jsx(n,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Instance methods win."}),` If the receiver type already declares a matching instance
method, that method is chosen before any extension method is considered. Extension methods cannot
override, hide, or shadow instance members.`]})}),`
`,e.jsx(n,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Nullable and reference receivers."})," A ",e.jsx(i,{children:"null"}),` reference can be
used as the receiver if the first parameter type allows it, because the receiver is simply passed
as the first argument. Inside the extension method you must guard against `,e.jsx(i,{children:"null"})," ",`
if the logic dereferences the receiver.`]})}),`
`,e.jsx(l,{tone:"blue",children:e.jsx(t.p,{children:`Extension chaining is not limited to collections. Any static method whose return type is
compatible with another extension method's first parameter can be chained. The compiler has no
special knowledge of "fluent APIs"; it resolves each dot expression left-to-right in sequence.`})}),`
`,e.jsx(l,{tone:"amber",title:"Planned refinements",children:e.jsx(t.p,{children:`Today extension methods are discovered automatically from all visible top-level static functions.
There is no way to mark a function as "not an extension" other than making it non-static or giving
it a first parameter type that no caller would use as a receiver. A future version may introduce a
dedicated modifier or attribute to opt in or out explicitly.`})}),`
`,e.jsx(o,{children:"Examples"}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"Basic extension on a primitive type."})}),`
`,e.jsx(a,{code:`using stdio;

namespace demo;

// A static function whose first parameter is int.
// Any int expression can call it with dot syntax.
public static func Double(x: int) -> int
{
  return x * 2;
}

public static func Greet(name: string) -> string
{
  return "Hello, " + name;
}

public static func Main() -> void
{
  a: int = 5;
  println(a.Double());          // 10

  message: string = "world";
  println(message.Greet());     // Hello, world
}`,language:"csharp",filename:"ext_basic.shard"}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"Extension method with additional arguments."})}),`
`,e.jsx(a,{code:`using stdio;

namespace demo;

// The receiver is 'value'; 'times' is a normal argument.
public static func Repeat(value: string, times: int) -> string
{
  result: string = "";
  i: int = 0;

  while (i < times)
  {
      result = result + value;
      i = i + 1;
  }

  return result;
}

// The receiver is 'value'; 'min' and 'max' are normal arguments.
public static func Clamp(value: int, min: int, max: int) -> int
{
  if (value < min)
  {
      return min;
  }

  if (value > max)
  {
      return max;
  }

  return value;
}

public static func Main() -> void
{
  println("ha".Repeat(3));            // hahaha
  println((-5).Clamp(0, 10));         // 0
  println(7.Clamp(0, 10));            // 7
  println(15.Clamp(0, 10));           // 10
}`,language:"csharp",filename:"ext_arguments.shard"}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"Chaining extension methods."})}),`
`,e.jsx(a,{code:`using stdio;
using collections;

namespace demo;

public delegate Transform<T, U>(value: T) -> U;
public delegate Predicate<T>(value: T) -> bool;

// An extension on IEnumerable<T> that projects each element.
public static func Select<T, U>(source: IEnumerable<T>, action: Transform<T, U>) -> IEnumerable<U>
{
  temp: List<U> = new List<U>();

  foreach (item in source)
  {
      temp.Add(action(item));
  }

  return temp;
}

// An extension on IEnumerable<T> that filters elements.
public static func Where<T>(source: IEnumerable<T>, pred: Predicate<T>) -> IEnumerable<T>
{
  temp: List<T> = new List<T>();

  foreach (item in source)
  {
      if (pred(item))
      {
          temp.Add(item);
      }
  }

  return temp;
}

public static func Main() -> void
{
  data: int[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // The array is the receiver for Select; the list returned by Select is
  // the receiver for Where. Each dot resolves independently.
  result: IEnumerable<int> = data
      .Select(lambda (a: int) -> int { return a * 2; })
      .Where(lambda (a: int) -> bool { return a > 10; });

  println(result);   // [12, 14, 16, 18, 20]
}`,language:"csharp",filename:"ext_chaining.shard"}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"Generic extension methods."})}),`
`,e.jsx(a,{code:`using stdio;
using collections;

namespace demo;

// Works on any type because T is inferred from the receiver.
public static func Identity<T>(x: T) -> T
{
  return x;
}

// Returns a list containing two copies of the receiver.
public static func Duplicate<T>(x: T) -> List<T>
{
  result: List<T> = new List<T>();
  result.Add(x);
  result.Add(x);
  return result;
}

public static func Main() -> void
{
  a: int = 5;

  // Explicit type argument.
  b: int = a.Identity<int>();
  println(b);                      // 5

  // Inferred from the receiver.
  c: List<int> = a.Duplicate();
  println(c);                      // [5, 5]

  // Generic extension on a reference type.
  text: string = "hello";
  d: string = text.Identity<string>();
  println(d);                      // hello
}`,language:"csharp",filename:"ext_generic.shard"}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"Instance methods take precedence."})}),`
`,e.jsx(a,{code:`using stdio;

namespace demo;

public class Greeter
{
  public Name: string;

  public init(name: string)
  {
      this.Name = name;
  }

  // This instance method is chosen before any extension with the same name.
  public func Greet() -> string
  {
      return "instance says hello to " + this.Name;
  }
}

// This extension has the same signature, but it is never used on Greeter.
public static func Greet(g: Greeter) -> string
{
  return "extension says hello to " + g.Name;
}

public static func Main() -> void
{
  g: Greeter = new Greeter("world");
  println(g.Greet());   // instance says hello to world
}`,language:"csharp",filename:"ext_precedence.shard"}),`
`,e.jsx(n,{children:e.jsx("strong",{children:"Common mistake: calling a non-extension static method on an instance."})}),`
`,e.jsx(a,{code:`using stdio;

namespace demo;

// This static method takes only a normal argument; it is not an extension
// for int because the first parameter is string, not int.
public static func Describe(x: int, label: string) -> string
{
  return label + ": " + x;
}

public static func Main() -> void
{
  a: int = 42;

  // CORRECT: call as a static function with both arguments.
  println(Describe(a, "value"));

  // INCORRECT: the receiver is int, but the first parameter is also int
  // and there is one explicit argument, so this would actually compile.
  // The example below shows a case that fails:
}

// This static method has no int-compatible first parameter, so calling it
// on an int value would be an error.
public static func FormatPath(path: string) -> string
{
  return "path: " + path;
}

// The following would fail at compile time:
// a.FormatPath();   // ERROR: cannot call static method 'FormatPath' on instance reference`,language:"csharp",filename:"ext_mistake.shard"}),`
`,e.jsx(l,{tone:"amber",title:"Watch out for accidental receivers",children:e.jsxs(t.p,{children:["Because every visible static function is a candidate, a method named ",e.jsx(i,{children:"Process"})," ",`
whose first parameter happens to match your variable type can be invoked accidentally. Keep
extension names descriptive and avoid overly generic names that could collide with future static
functions.`]})})]})}function u(r={}){const{wrapper:t}=r.components||{};return t?e.jsx(t,{...r,children:e.jsx(h,{...r})}):h(r)}function c(r,t){throw new Error("Expected component `"+r+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};
