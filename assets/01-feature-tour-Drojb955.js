import{j as e}from"./index-DkFwvLJL.js";function d(a){const s={p:"p",...a.components},{Bullet:r,CodeBlock:t,H2:c,InlineCode:n,Prose:i}=s;return r||l("Bullet"),t||l("CodeBlock"),c||l("H2"),n||l("InlineCode"),i||l("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(c,{children:"Prerequisites"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsxs(s.p,{children:["A working ShardScript installation. Follow the ",e.jsx(n,{children:"Installation"}),` guide if you have
not installed the interpreter yet.`]})}),e.jsx(r,{children:e.jsxs(s.p,{children:["Completion of ",e.jsx(n,{children:"Hello World"}),", or familiarity with namespaces, the"," ",`
`,e.jsx(n,{children:"Main"})," entry point, and the ",e.jsx(n,{children:"shard"})," command."]})}),e.jsx(r,{children:e.jsx(s.p,{children:"A text editor and a terminal for running the examples."})})]}),`
`,e.jsx(c,{children:"Scenario"}),`
`,e.jsx(i,{children:e.jsx(s.p,{children:`You will write a single ShardScript program that touches most of the language in one place: classes,
interfaces, generics, arrays, switch expressions, deferred cleanup, and async/await. By the end you will
recognize the shape of everyday ShardScript code and know where to look for deeper coverage of each
feature.`})}),`
`,e.jsx(c,{children:"Step-by-Step Instructions"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"1. Create a new file."})}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:["Open your editor and create a file named ",e.jsx(n,{children:"tour.shard"})," in an empty directory."]})}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"2. Add the namespaces and a class with a constructor."})}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:["ShardScript uses namespaces to organize code. The ",e.jsx(n,{children:"stdio"}),` namespace provides console
output, and `,e.jsx(n,{children:"async"}),` provides task types. Declare a class with public fields and a
constructor.`]})}),`
`,e.jsx(t,{code:`using stdio;
using async;

namespace tour;

public class Widget
{
  public Id: int;
  public Label: string;

  public init(id: int, label: string)
  {
      this.Id = id;
      this.Label = label;
  }

  public func Describe() -> string
  {
      return "Widget " + this.Id + ": " + this.Label;
  }
}`,language:"csharp",filename:"tour.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"3. Add an interface and two implementations."})}),`
`,e.jsx(i,{children:e.jsx(s.p,{children:`Interfaces declare a contract. A class implements an interface by providing matching public members. The
virtual machine resolves the right implementation at runtime.`})}),`
`,e.jsx(t,{code:`public interface IShape
{
  func Area() -> double;
}

public class Rectangle : IShape
{
  public Width: double;
  public Height: double;

  public init(width: double, height: double)
  {
      this.Width = width;
      this.Height = height;
  }

  public func Area() -> double
  {
      return this.Width * this.Height;
  }
}

public class Circle : IShape
{
  public Radius: double;

  public init(radius: double)
  {
      this.Radius = radius;
  }

  public func Area() -> double
  {
      return 3.14159 * this.Radius * this.Radius;
  }
}`,language:"csharp",filename:"tour.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"4. Add a generic container."})}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:["Generic types use a placeholder type ",e.jsx(n,{children:"T"}),` that is filled in when the type is used.
The compiler creates a concrete layout for every instantiation.`]})}),`
`,e.jsx(t,{code:`public class Box<T>
{
  public Value: T;

  public func Set(v: T) -> void
  {
      this.Value = v;
  }

  public func Get() -> T
  {
      return this.Value;
  }
}`,language:"csharp",filename:"tour.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"5. Use arrays, ranges, and a switch expression."})}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:["Arrays are fixed-size and indexed from zero. Ranges such as ",e.jsx(n,{children:"1..5"})," produce"," ",`
`,e.jsx(n,{children:"int[]"})," values. The ",e.jsx(n,{children:"switch"}),` expression selects an arm by
matching the scrutinee against constant or type patterns.`]})}),`
`,e.jsx(t,{code:`public static func DescribeShape(shape: IShape) -> string
{
  return switch shape
  {
      is Rectangle r => "rectangle " + r.Width + "x" + r.Height,
      is Circle c    => "circle radius " + c.Radius,
      _              => "unknown shape",
  };
}

public static func SumAreas(shapes: IShape[]) -> double
{
  total: double = 0.0;

  foreach (shape in shapes)
  {
      total = total + shape.Area();
  }

  return total;
}`,language:"csharp",filename:"tour.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"6. Add deterministic cleanup with defer."})}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:["The ",e.jsx(n,{children:"defer"}),` statement schedules cleanup that runs when the enclosing scope exits.
A resource defer declares a variable whose type implements `,e.jsx(n,{children:"IDisposable"})," and calls"," ",`
`,e.jsx(n,{children:"Dispose()"})," automatically."]})}),`
`,e.jsx(t,{code:`public class TraceScope : IDisposable
{
  private name: string;

  public init(name: string)
  {
      this.name = name;
      println("enter " + this.name);
  }

  public func Dispose() -> void
  {
      println("exit " + this.name);
  }
}`,language:"csharp",filename:"tour.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"7. Add an async method."})}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:["Async methods return ",e.jsx(n,{children:"Task"})," or ",e.jsx(n,{children:"ValueTask<T>"}),`. They
compile into state machines that yield control at `,e.jsx(n,{children:"await"}),` and resume through the
event loop.`]})}),`
`,e.jsx(t,{code:`public static async func FetchLabelAsync(id: int) -> ValueTask<string>
{
  await Task.Delay(10);
  return "label-" + id;
}`,language:"csharp",filename:"tour.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"8. Wire everything together in Main."})}),`
`,e.jsx(i,{children:e.jsxs(s.p,{children:["The entry point is a public static method named ",e.jsx(n,{children:"Main"})," that returns"," ",`
`,e.jsx(n,{children:"void"}),". It creates objects, calls methods, and waits for async work to complete."]})}),`
`,e.jsx(t,{code:`public static func Main() -> void
{
  defer scope: TraceScope = new TraceScope("Main");

  widget: Widget = new Widget(1, "demo");
  println(widget.Describe());

  shapes: IShape[] = [new Rectangle(4.0, 5.0), new Circle(3.0)];
  println(DescribeShape(shapes[0]));
  println(DescribeShape(shapes[1]));
  println("total area: " + SumAreas(shapes));

  box: Box<int> = new Box<int>();
  box.Set(42);
  println("boxed: " + box.Get());

  range: int[] = 0..3;
  println("range length: " + range.Length);

  task: ValueTask<string> = FetchLabelAsync(7);
  ValueTask.Wait(task);
  println("fetched: " + task.Result);
}`,language:"csharp",filename:"tour.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"9. Run the program."})}),`
`,e.jsx(t,{code:"shard tour.shard",language:"bash",filename:"run.sh"}),`
`,e.jsx(c,{children:"Expected Output"}),`
`,e.jsx(i,{children:e.jsx(s.p,{children:`The exact output may vary slightly depending on the timing of the async delay, but you should see something
like the following.`})}),`
`,e.jsx(t,{code:`enter Main
Widget 1: demo
rectangle 4x5
circle radius 3
total area: 48.27431
boxed: 42
range length: 3
fetched: label-7
exit Main`,language:"bash",filename:"output.txt"}),`
`,e.jsx(c,{children:"What's next?"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(r,{children:e.jsxs(s.p,{children:["Read ",e.jsx(n,{children:"Type System"}),` for a deeper look at value and reference types, generics,
arrays, interfaces, and enums.`]})}),e.jsx(r,{children:e.jsxs(s.p,{children:["Work through the language fundamentals starting with ",e.jsx(n,{children:"Primitive Types"})," and"," ",`
`,e.jsx(n,{children:"Variables and Types"}),"."]})}),e.jsx(r,{children:e.jsxs(s.p,{children:["Learn more about object-oriented features in ",e.jsx(n,{children:"Classes"})," and"," ",`
`,e.jsx(n,{children:"Interfaces and Abstractions"}),"."]})}),e.jsx(r,{children:e.jsxs(s.p,{children:["Explore asynchronous programming in ",e.jsx(n,{children:"Async Functions"})," and"," ",`
`,e.jsx(n,{children:"Await and State Machines"}),"."]})}),e.jsx(r,{children:e.jsxs(s.p,{children:["Study resource cleanup in ",e.jsx(n,{children:"Deferred Execution"}),"."]})})]})]})}function o(a={}){const{wrapper:s}=a.components||{};return s?e.jsx(s,{...a,children:e.jsx(d,{...a})}):d(a)}function l(a,s){throw new Error("Expected component `"+a+"` to be defined: you likely forgot to import, pass, or provide it.")}export{o as default};
