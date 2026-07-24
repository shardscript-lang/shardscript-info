import { useState, useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Search, ChevronDown } from 'lucide-react'
import CodeBlock from '../components/CodeBlock'
import ScrollReveal from '../components/ScrollReveal'

interface DocGroup {
  title: string
  items: string[]
}

const syntaxGroups: DocGroup[] = [
  {
    title: 'INTRODUCTION & ARCHITECTURE',
    items: ['1.1 · ShardScript Philosophy', '1.2 · Runtime Architecture', '1.3 · Installation & Setup'],
  },
  {
    title: 'LANGUAGE FUNDAMENTALS',
    items: ['2.1 · Strict Typing & Variables', '2.2 · Operators & Math', '2.3 · Strings & Interpolation', '2.4 · Collections & Arrays'],
  },
  {
    title: 'CONTROL FLOW',
    items: ['3.1 · Conditionals', '3.2 · Loops', '3.3 · switch & Pattern Matching', '3.4 · Exceptions & Error Handling', '3.5 · Defered execution'],
  },
  {
    title: 'OBJECT-ORIENTED PROGRAMMING',
    items: ['4.1 · Classes, Fields and Properties', '4.2 · Interfaces and Abstractions', '4.3 · Extension Methods', '4.4 · Generic Types'],
  },
  {
    title: 'FUNCTIONAL PROGRAMMING',
    items: ['5.1 · Functions as First-Class Objects', '5.2 · Lambda Expressions & Closures'],
  },
  {
    title: 'RESOURCE MANAGEMENT AND LIFECYCLE',
    items: ['6.1 · Automatic Memory Management (GC)', '6.2 · Deterministic Disposal (IDisposable)'],
  },
  {
    title: 'ASYNCHRONOUS PROGRAMMING',
    items: ['7.1 · Cooperative Multitasking (libuv)', '7.2 · Async Functions & State Machines', '7.3 · Task & ValueTask Types', '7.4 · Cancellation (CancellationToken)'],
  },
  {
    title: 'INTERNALS',
    items: ['TypeShape & Slots', 'Async State Machine Lowering'],
  },
]

const stdlibGroups: DocGroup[] = [
  {
    title: 'SHARD.MATH',
    items: ['Basic Math', 'Trigonometry & Logarithms', 'Math Scenarios'],
  },
  {
    title: 'SHARD.ENVIRONMENT',
    items: ['Environment'],
  },
  {
    title: 'SHARD.DEBUG',
    items: ['Developer Tools', 'VM Inspection'],
  },
  {
    title: 'SHARD.COLLECTIONS',
    items: ['IEnumerable & IEnumerator', 'List<T>', 'Dictionary<K, V>', 'Queue<T> & Stack<T>', 'Collections Scenarios'],
  },
  {
    title: 'SHARD.JSON',
    items: ['JsonSerializer', 'JsonNode', 'JSON Scenarios'],
  },
  {
    title: 'SHARD.STREAMS',
    items: ['IStream, IReadableStream, IWritableStream', 'MemoryStream', 'StreamReader / StreamWriter', 'BinaryReader / BinaryWriter', 'Stream Scenarios'],
  },
  {
    title: 'SHARD.FILESYSTEM',
    items: ['File & Path', 'Directory & DirectoryInfo', 'Path Concatenation', 'FS Scenarios'],
  },
  {
    title: 'SHARD.SUBPROCESS',
    items: ['Process & ProcessStartInfo', 'I/O & Lifecycle', 'Subprocess Scenarios'],
  },
]

const pragmaticCode = `using stdio;

namespace examples;

// A named delegate type, reusable across the whole codebase.
public delegate GetIntegerDelegate(a: int) -> int;

public static func Main() -> void
{
    // Pragmatic: the same lambda can be bound to a named delegate type
    // or to a fabricated inline type — both are first-class.
    fromLambda: GetIntegerDelegate = lambda (a: int) -> int
    {
        return a + 10;
    };

    inline: delegate int(int) = lambda (a: int) -> int
    {
        return a + 10;
    };

    println(fromLambda(1));   // 11
    println(inline(2));       // 12
}`

const multiParadigmCode = `using stdio;
using async;

namespace examples;

// Object-oriented: a class encapsulates state and behavior.
public class Counter
{
    public Name: string;
    public Count: int;

    public init(name: string)
    {
        this.Name = name;
        this.Count = 0;
    }

    public func Step() -> void
    {
        this.Count = this.Count + 1;
        println(this.Name + " step " + this.Count);
    }
}

// Asynchronous: runs on the libuv event loop and yields cooperatively.
async func RunAsync(c: Counter) -> Task
{
    c.Step();
    await Task.Delay(500);
    c.Step();
}

public static func Main() -> void
{
    c := new Counter("A");
    task := RunAsync(c);
    task.Wait();
}`

const strictTypingCode = `using stdio;

namespace examples;

public static func Main() -> void
{
    // Every binding carries a type known at compile time.
    i: int    = 3;
    s: string = "world";
    b: bool   = true;

    // Each primitive implements IPrintable, so println never accepts an
    // open-ended 'any' — output is verified, not hoped for.
    println(i);
    println(s);
    println(b);
}`

const pipelineCode = `Source text
   |
   v
1. Lexer            -- tokens
2. Parser           -- AST  (SyntaxTree)
3. Semantic model   -- symbols, scopes, bound types   <-- all errors caught here
4. Async lowering   -- async methods become state machines
5. Layout           -- field/slot offsets assigned
6. Emission         -- per-method bytecode + string pool
   |
   v
ApplicationDomain  =  Program image  +  VirtualMachine  +  EventLoop  +  GarbageCollector
   |
   v
7. VM::Run()        -- executes the entry point`

const dispatchLoopCode = `while not end of bytecode stream:
    opcode <- decode next opcode (and its operands)
    switch (opcode) -> act on the current frame's eval stack`

const ifElseSourceCode = `using stdio;

namespace test;

public class Program
{
    public static func Main() -> void
    {
        if (false)
            println("if branch");
        else
            println("else branch");

        println("after");
    }
}`

const ifElseDisassemblyCode = `; ============================================================
;  DISASSEMBLY: test.Program.Main
; ============================================================
;  Access:      public static
;  Return:      Void
;  Parameters:  ()
;  Locals:      0
; ============================================================

; Offset    Opcode      Arguments
; --------  -----------  -----------------------------------------
SS_0000:   ldc.bool    false          ; push the condition
SS_0003:   jmpf        SS_003F        ; if false -> skip the then-branch
SS_000D:   ldstr       pool[0]        ; "if branch"
SS_0017:   call        stdio.println
SS_0021:   jmp         SS_003F        ; else-branch fallthrough
SS_002B:   ldstr       pool[10]       ; "else branch"
SS_0035:   call        stdio.println
SS_003F:   ldstr       pool[20]       ; "after"
SS_0049:   call        stdio.println`

const taskDelayCode = `// Native helper behind Task.Delay(ms)
uv_timer_t* timer = new uv_timer_t;
uv_timer_init(loop, timer);

uv_timer_start(timer, [](uv_timer_t* handle) {
    // ...complete the task, which resumes the suspended awaiter...
    // ...then close and free the timer handle...
}, milliseconds, 0);`

const eventLoopExampleCode = `using stdio;
using async;

namespace demo;

async func CounterA() -> Task
{
    println("A: 1");
    await Task.Delay(500);
    println("A: 2");
}

async func CounterB() -> Task
{
    println("B: 1");
    await Task.Delay(300);
    println("B: 2");
}

public func Main() -> void
{
    t1 := CounterA();
    t2 := CounterB();
    t1.Wait();          // pumps the loop until CounterA completes
    t2.Wait();
    println("done");
}`

const buildCode = `# Clone the compiler, VM, and framework
git clone https://github.com/Rikitav/ShardScript.git
cd ShardScript

# Configure (Ninja generator, MSVC, C++20)
cmake -S . -B build -G Ninja -DCMAKE_BUILD_TYPE=Release

# Build the interpreter and every standard shard
cmake --build build --parallel

# Result:
#   build/bin/shard            (shard.exe on Windows)
#   build/bin/system/*.dll     (the standard shards)`

const cliExamplesCode = `# Run a script (positional argument; globs allowed)
shard hello.shard

# Decompile the entry point to bytecode instead of running
shard -d hello.shard

# Start the interactive REPL
shard -i            # equivalents: --interactive, -r, --repl

# Load extra shards in addition to the standard set (globs supported)
shard app.shard -l path/to/mylib.dll
shard app.shard -l "libs/*.dll"

# Run with no standard shards at all (a clean sandbox)
shard app.shard --no-std`

const systemLayoutCurrentCode = `# Current (implemented): shards live in a system/ folder beside the executable
<install>/
|-- shard              (shard.exe on Windows)
\`-- system/            <- auto-discovered at startup
    |-- stdio.dll
    |-- collections.dll
    |-- math.dll
    \`-- ...`

const systemLayoutPlannedCode = `# Intended layout (planned -- not yet read by the interpreter)
%SHARDSCRIPT%/
|-- shard.exe
\`-- system_libs/
    |-- stdio.dll
    |-- collections.dll
    |-- math.dll
    \`-- ...`

const geodeEnvCode = `# geode.env -- a project manifest (TOML-like)
[project]
name = "my-app"
version = "1.0.0"
authors = []

[dependencies]
# shard.collections = "1.0.0"

[environment]
SHARDSCRIPT_ENV = "development"`

const geodeBuildCode = `# Build the Geode solution (.NET)
cd Geode
dotnet build

# In another terminal, start the package registry backend
# (defaults to http://localhost:5000)
cd src/Geode.Backend.Api
dotnet run`

const nvimLspCode = `-- Neovim: register the ShardScript language server via lspconfig
local configs = require('lspconfig.configs')
local util    = require('lspconfig.util')

configs.shardscript = {
  default_config = {
    cmd = { '/absolute/path/to/lsp' },
    filetypes = { 'shard' },
    root_dir = util.find_git_ancestor,
  },
}

require('lspconfig').shardscript.setup({})`

const primitivesCode = `using stdio;

namespace demo;

public static func Main() -> void
{
    i: int       = 42;
    pi: double   = 3.14;
    flag: bool   = true;
    letter: char = 'A';
    b: byte      = 255;
    name: string = "hello";

    println(i);
    println(pi);
    println(flag);
}`

const declarationFormsCode = `// Explicit type annotation:  name: Type = value
count: int    = 10;
name: string  = "world";

// Type inference:  name := value
x        := 10;      // int
greeting := "hi";    // string
ready    := true;    // bool

// The type is fixed once declared
x = 20;              // OK -- x is still int
// x = "no";          // ERROR -- string is not assignable to int`

const notAllowedCode = `int count = 10;   // ERROR: invalid syntax. Use 'name: type = value' or 'name := value'.
var x = 0;        // ERROR: invalid use of 'var'. Use 'name := value' or 'name: type = value'.`

const arithmeticCode = `using stdio;

namespace demo;

public static func Main() -> void
{
    println(7 + 2);     // 9
    println(7 - 2);     // 5
    println(7 * 2);     // 14
    println(7 / 2);     // 3    (integer division -- both operands are int)
    println(7.0 / 2);   // 3.5  (a double operand yields a double result)
    println(7 % 3);     // 1
    println(2 ^ 10);    // 1024 (^ is exponentiation, not XOR)

    n := 10;
    n += 5;             // 15
    n ^= 2;             // 225  (^= is power-assign: n = n ^ 2)
    println(n);
}`

const bitwiseCode = `using stdio;

namespace demo;

public static func Main() -> void
{
    println(12 & 10);   // 8    bitwise AND:  1100 & 1010 = 1000
    println(12 | 10);   // 14   bitwise OR:   1100 | 1010 = 1110
    println(1 << 4);    // 16   left shift
    println(256 >> 2);  // 64   right shift

    flags := 1;
    flags |= 4;         // set a bit with OR-assign
    println(flags);     // 5
}`

const logicalCode = `using stdio;

namespace demo;

public static func Main() -> void
{
    a := true;
    b := false;

    println(!a);        // false  logical NOT
    println(a & b);     // false  AND (both sides always evaluated)
    println(a | b);     // true   OR  (both sides always evaluated)

    // Keyword aliases -- "and", "or", "not" map to the same operators
    println(a and b);   // false
    println(a or b);    // true
    println(not a);     // false

    // There is no && or ||. & / and and | / or never short-circuit.
}`

const stringLiteralCode = `using stdio;

namespace demo;

public static func Main() -> void
{
    greeting := "hello";
    newline := "line one\\nline two"; // \\n is a newline escape
    quoted := "she said \\"hi\\"";     // \" embeds a quote
    backslash := "C:\\\\tools";        // \\\\ is a literal backslash

    letter := 'A';    // char literal (single quotes)

    println(greeting);
    println(newline);
    println(letter);
}`

const verbatimCode = `using stdio;

namespace demo;

public static func Main() -> void
{
    // Verbatim string: backslashes are literal, no escapes processed.
    path := @"C:\\Users\\name\\file.txt";

    println(path);   // C:\\Users\\name\\file.txt
}`

const concatCode = `using stdio;

namespace demo;

public static func Main() -> void
{
    name := "Shard";
    version := 1;

    // + concatenates and coerces adjacent primitives to strings
    println("name: " + name);         // name: Shard
    println("version: " + version);   // version: 1

    message := "v" + version + " " + name;
    println(message);                 // v1 Shard
}`

const formatCode = `using stdio;
using strings;

namespace demo;

public static func Main() -> void
{
    name := "Shard";
    count := 42;

    // Positional placeholders {0}, {1}, ... index the arguments
    line := strings.Format("{0} has {1} items", name, count);
    println(line);                    // Shard has 42 items

    // Literal braces are written {{ and }}
    println(strings.Format("{{0}} -> {0}", "x"));   // {0} -> x
}`

const interpolationPlannedCode = `// PLANNED -- not yet implemented. Today, use + or strings.Format.
using stdio;

namespace demo;

public static func Main() -> void
{
    name := "Shard";
    count := 42;

    // line := $"name: {name}, count: {count}";   // intended syntax
    line := "name: " + name + ", count: " + count;
    println(line);
}`

const arrayCode = `using stdio;

namespace demo;

public static func Main() -> void
{
    // Array literal -- the type is int[]
    nums: int[] = [10, 20, 30];

    println(nums.Length);   // 3
    println(nums[0]);       // 10

    nums[1] = 25;           // mutate an element by index
    println(nums[1]);       // 25

    // An empty array of a known element type
    empty: int[] = [];
}`

const listCode = `using stdio;
using collections;

namespace demo;

public static func Main() -> void
{
    list := new List<int>();
    list.Add(10);
    list.Add(20);
    list.Add(30);

    println(list.Length);   // 3   (List exposes Length, not Count)
    println(list[1]);       // 20  (indexer get)

    list[1] = 25;           // indexer set
    list.RemoveAt(0);       // drop the first element

    println(list.Length);   // 2
}`

const dictionaryCode = `using stdio;
using collections;

namespace demo;

public static func Main() -> void
{
    ages := new Dictionary<string, int>();
    ages.Add("alice", 30);
    ages.Add("bob", 25);

    println(ages.Count);            // 2
    println(ages["alice"]);         // 30  (indexer get)

    ages["bob"] = 26;               // indexer set
    println(ages.ContainsKey("bob"));   // true

    // foreach yields KeyValuePair<K, V> pairs
    foreach (pair in ages)
    {
        println(pair.Key + " = " + pair.Value);
    }
}`

const stackQueueCode = `using stdio;
using collections;

namespace demo;

public static func Main() -> void
{
    stack := new Stack<int>();
    stack.Push(1);
    stack.Push(2);
    println(stack.Pop());       // 2  (LIFO)

    queue := new Queue<int>();
    queue.Enqueue(1);
    queue.Enqueue(2);
    println(queue.Dequeue());   // 1  (FIFO)
}`

const foreachCode = `using stdio;

namespace demo;

public static func Main() -> void
{
    nums := [10, 20, 30];

    // foreach works over arrays, lists, dictionaries, and ranges
    foreach (n in nums)
    {
        println(n);
    }

    foreach (i in 1..3)
    {
        println(i);             // 1, 2
    }
}`

const ifStatementCode = `using stdio;

namespace demo;

public static func Main() -> void
{
    x := 3;

    // The condition is parenthesized; braces are optional for one statement
    if (x > 0)
        println("positive");
    else if (x < 0)
        println("negative");
    else
        println("zero");

    // A block body groups several statements
    if (x > 0)
    {
        print("yes; ");
        println("x is " + x);
    }
}`

const unlessCode = `using stdio;

namespace demo;

public static func Main() -> void
{
    done := false;

    // unless runs its body when the condition is FALSE
    unless (done)
        println("still working");

    // unless may chain an else, which runs when the condition is TRUE
    ready := true;
    unless (ready)
        println("not ready");
    else
        println("ready");
}`

const ifExpressionCode = `using stdio;

namespace demo;

public static func Main() -> void
{
    x := 5;

    // if as an expression -- parens around the condition are optional
    sign := if (x >= 0) 1 else -1;
    label := if x > 10 "big" else "small";

    println(sign);     // 1
    println(label);    // small
}`

const whileUntilCode = `using stdio;

namespace demo;

public static func Main() -> void
{
    n := 0;
    while (n < 3)
    {
        println(n);     // 0, 1, 2
        n += 1;
    }

    m := 3;
    // until loops while the condition is FALSE
    until (m == 0)
    {
        println(m);     // 3, 2, 1
        m -= 1;
    }
}`

const cStyleForCode = `using stdio;

namespace demo;

public static func Main() -> void
{
    // init; condition; step  (C-style)
    for (i := 0; i < 5; i++)
    {
        print(i);       // 01234
    }
    println("");

    // Descending needs an explicit step -- ranges only count upward
    for (i := 10; i > 0; i -= 2)
    {
        print(i);       // 108642
    }
    println("");
}`

const loopForeachCode = `using stdio;
using collections;

namespace demo;

public static func Main() -> void
{
    // foreach over a range (half-open .., inclusive ..&)
    foreach (i in 0..3)
    {
        println(i);     // 0, 1, 2
    }

    foreach (i in 0..&3)
    {
        println(i);     // 0, 1, 2, 3
    }

    // foreach over any IEnumerable<T> (arrays, lists, ...)
    nums := [10, 20, 30];
    foreach (n in nums)
    {
        println(n);
    }
}`

const breakContinueCode = `using stdio;

namespace demo;

public static func Main() -> void
{
    // break exits the loop; continue skips to the next iteration
    foreach (i in 0..10)
    {
        if (i == 5)
            break;          // stop at 5
        if (i % 2 == 0)
            continue;       // skip even numbers

        println(i);         // 1, 3
    }
}`

const switchExprCode = `using stdio;

namespace demo;

public static func Main() -> void
{
    n := 2;

    // switch is an expression: match a value against constant patterns
    label := switch n
    {
        0 => "zero",
        1 => "one",
        2 => "two",
        _ => "many",     // _ is the default arm
    };

    println(label);     // two
}`

const isAsCode = `using stdio;

namespace demo;

interface IShape
{
    func Area() -> double;
}

public class Circle : IShape
{
    public Radius: double;

    public init(r: double)
    {
        this.Radius = r;
    }

    public func Area() -> double
    {
        return 3.14 * this.Radius * this.Radius;
    }
}

public static func Describe(shape: IShape) -> void
{
    // 'is' tests compatibility (bool); 'as' casts safely (null if not)
    if (shape is Circle)
    {
        c := shape as Circle;
        println("circle, radius " + c.Radius);
    }
    else
    {
        println("not a circle");
    }
}

public static func Main() -> void
{
    Describe(new Circle(2.0));   // circle, radius 2
}`

const tryCatchCode = `using stdio;

namespace demo;

public class Program
{
    public static func Main() -> void
    {
        try
        {
            throw new RuntimeException();
        }
        catch (ex: RuntimeException)
        {
            println("caught");
        }
        println("done");
    }
}`

const catchVariantsCode = `using stdio;

namespace demo;

public class Program
{
    public static func Main() -> void
    {
        // Typed catch — catches only RuntimeException
        try
        {
            throw new RuntimeException();
        }
        catch (ex: RuntimeException)
        {
            println("typed catch");
        }

        // Interface catch — catches everything implementing IThrowable
        try
        {
            throw new RuntimeException();
        }
        catch (ex: IThrowable)
        {
            println("catches any throwable");
        }

        // Any catch — catches everything (defaults to any)
        try
        {
            throw new RuntimeException();
        }
        catch { ex }
        {
            println("catch-all");
        }
    }
}`

const rethrowCode = `using stdio;

namespace demo;

public static func Main() -> void
{
    try
    {
        try
        {
            throw new RuntimeException();
        }
        catch (ex: RuntimeException)
        {
            println("inner: logging before rethrow");
            throw;  // re-throws the same exception
        }
    }
    catch (ex: RuntimeException)
    {
        println("outer: caught the re-thrown exception");
    }
    println("done");
}`

const unwindCode = `using stdio;

namespace demo;

public static func C() -> void
{
    throw new RuntimeException();
}

public static func B() -> void
{
    defer println("B cleanup");
    C();
}

public static func A() -> void
{
    defer println("A cleanup");
    B();
}

public static func Main() -> void
{
    try
    {
        A();  // Stack: Main -> A -> B -> C
    }
    catch (ex: RuntimeException)
    {
        println("caught in Main");
    }
    // Output:
    //   B cleanup
    //   A cleanup
    //   caught in Main
}`

const asyncExceptionCode = `using stdio;
using async;

namespace demo;

public class Program
{
    public static async func FaultyDelay() -> Task
    {
        await Task.Delay(10);
        throw new RuntimeException();
    }

    public static async func CaughtAwait() -> Task
    {
        try
        {
            await FaultyDelay();
            println("after await");
        }
        catch (ex: RuntimeException)
        {
            println("caught inside async");
        }
    }

    public static func Main() -> void
    {
        Task.Wait(CaughtAwait());
        println("done");
    }
}`


const deferBasicCode = `using stdio;

namespace demo;

public class Resource : IDisposable
{
    public func Dispose() -> void
    {
        println("resource disposed");
    }
}

public static func Main() -> void
{
    defer r: Resource = new Resource();
    defer println("cleanup complete");
    println("doing work");
    // Output:
    //   doing work
    //   cleanup complete
    //   resource disposed
}`

const deferOrderCode = `using stdio;

namespace demo;

public static func Main() -> void
{
    defer println("outer");
    {
        defer println("inner-2");
        defer println("inner-1");
        println("inside block");
    }
    println("back in outer");
    // Output:
    //   inside block
    //   inner-1
    //   inner-2
    //   back in outer
    //   outer
}`

const deferLoopCode = `using stdio;

namespace demo;

public static func Main() -> void
{
    for (i in 0..3)
    {
        defer println("iteration " + i + " cleanup");
        println("iteration " + i + " start");
    }
    // Output:
    //   iteration 0 start
    //   iteration 0 cleanup
    //   iteration 1 start
    //   iteration 1 cleanup
    //   iteration 2 start
    //   iteration 2 cleanup
}`

const deferReturnCode = `using stdio;

namespace demo;

public static func EarlyReturn(flag: bool) -> void
{
    defer println("always executed");
    println("before check");
    if ((flag))
    {
        println("early return path");
        return;  // defer drains here
    }
    println("normal path");
    // defer drains here too
    // Output when flag = true:
    //   before check
    //   early return path
    //   always executed
}`

const deferWithExceptionCode = `using stdio;

namespace demo;

public static func Work() -> void
{
    defer println("cleanup on aisle 4");
    println("about to throw");
    throw new RuntimeException();
}

public static func Main() -> void
{
    try
    {
        defer println("outer cleanup");
        Work();
    }
    catch (ex: RuntimeException)
    {
        println("caught");
    }
    // Output:
    //   about to throw
    //   cleanup on aisle 4
    //   outer cleanup
    //   caught
}`

const deferAsyncCode = `using stdio;
using async;

namespace demo;

public class Program
{
    public static async func WorkAsync() -> Task
    {
        defer println("outer-1");
        defer println("outer-2");
        if ((true))
        {
            defer println("inner");
            println("in if");
        }
        println("before await");
        await Task.Delay(10);
        println("after await");
        // On return: inner, outer-2, outer-1 drain
    }

    public static func Main() -> void
    {
        Task.Wait(WorkAsync());
        println("done");
    }
}`


const classBasicCode = `using stdio;

namespace demo;

public class Counter
{
    public Name: string;
    public Count: int;

    public init(name: string)
    {
        this.Name = name;
        this.Count = 0;
    }

    public func Increment() -> void
    {
        this.Count = this.Count + 1;
        println(this.Name + ": " + this.Count);
    }
}

public static func Main() -> void
{
    c: Counter = new Counter("clicks");
    c.Increment();   // clicks: 1
    c.Increment();   // clicks: 2
}`

const accessModifierCode = `using stdio;

namespace demo;

public class Person
{
    public Name: string;      // accessible from anywhere
    private Age: int;         // accessible only within Person

    public init(name: string, age: int)
    {
        this.Name = name;
        this.Age = age;
    }

    public func Birthday() -> void
    {
        this.Age = this.Age + 1;   // OK: private field accessible here
    }
}

public static func Main() -> void
{
    p: Person = new Person("Alice", 30);
    println(p.Name);   // OK: public field
    // p.Age = 31;     // ERROR: Age is private
}`

const staticMembersCode = `using stdio;

namespace demo;

public class Config
{
    public static AppName: string = "MyApp";
    public static Version: double = 1.0;

    public static func PrintInfo() -> void
    {
        println(Config.AppName + " v" + Config.Version);
    }

    public InstanceId: int;

    public init(id: int)
    {
        this.InstanceId = id;
    }

    public func Describe() -> void
    {
        // Static fields accessed via type name or from instance methods
        println("Instance " + this.InstanceId + " of " + Config.AppName);
    }
}

public static func Main() -> void
{
    println(Config.AppName);    // MyApp
    Config.PrintInfo();         // MyApp v1
    obj: Config = new Config(42);
    obj.Describe();             // Instance 42 of MyApp
}`

const propertyCode = `using stdio;

namespace demo;

public class Rectangle
{
    private width: double;
    private height: double;

    public Width: double
    {
        get { return this.width; }
        set { this.width = value; }
    }

    public Height: double
    {
        get { return this.height; }
        set { this.height = value; }
    }

    // Read-only property: no setter.
    public Area: double
    {
        get { return this.width * this.height; }
    }

    public init(w: double, h: double)
    {
        this.width = w;
        this.height = h;
    }
}

public static func Main() -> void
{
    r: Rectangle = new Rectangle(5.0, 4.0);
    println(r.Area);        // 20
    println(r.Width);       // 5
    r.Width = 10.0;
    println(r.Area);        // 40
}`

const autoPropertyCode = `using stdio;

namespace demo;

public class Point
{
    // Auto-property: the compiler generates a private backing field
    // and simple get/set accessors that read/write it.
    public X: int { get; set; }

    // Read-only auto-property: only a getter; can be set in init.
    public Label: string { get; }

    public init(x: int, label: string)
    {
        this.X = x;
        this.Label = label;
    }
}

public static func Main() -> void
{
    p: Point = new Point(3, "origin");
    println(p.Label + ": " + p.X);   // origin: 3

    p.X = 7;
    println(p.Label + ": " + p.X);   // origin: 7
}`


const interfaceBasicCode = `using stdio;

namespace demo;

// Declare an interface contract.
public interface IShape
{
    func Area() -> double;
    Name: string { get; }
}

// Implement the contract.
public class Circle : IShape
{
    private radius: double;
    private label: string;

    public init(r: double, name: string)
    {
        this.radius = r;
        this.label = name;
    }

    public func Area() -> double
    {
        return 3.14159 * this.radius * this.radius;
    }

    public Name: string
    {
        get { return this.label; }
    }
}

public static func Main() -> void
{
    c: Circle = new Circle(5.0, "my circle");
    println(c.Name + " area: " + c.Area());  // my circle area: 78.53975
}`

const interfaceDispatchCode = `using stdio;

namespace demo;

public interface IGreeter
{
    Greet() -> string;
}

public class Human : IGreeter
{
    private name: string;
    public init(name: string) { this.name = name; }
    public func Greet() -> string { return "Hello, I'm " + this.name; }
}

public class Robot : IGreeter
{
    private id: int;
    public init(id: int) { this.id = id; }
    public func Greet() -> string { return "Beep-boop #" + this.id; }
}

// Polymorphic: accepts any IGreeter via virtual dispatch.
public static func Announce(g: IGreeter) -> void
{
    println(g.Greet());
}

public static func Main() -> void
{
    h: Human = new Human("Alice");
    r: Robot = new Robot(42);
    Announce(h);   // Hello, I'm Alice
    Announce(r);   // Beep-boop #42
}`

const interfaceMultiCode = `using stdio;

namespace demo;

public interface INameable
{
    Name: string { get; }
}

public interface ICountable
{
    Count() -> int;
}

// A class can implement multiple interfaces.
public class Tag : INameable, ICountable
{
    private label: string;
    private clicks: int;

    public init(label: string)
    {
        this.label = label;
        this.clicks = 0;
    }

    public func Click() -> void
    {
        this.clicks = this.clicks + 1;
    }

    // INameable
    public Name: string { get { return this.label; } }

    // ICountable
    public func Count() -> int { return this.clicks; }
}

public static func PrintName(x: INameable) -> void
{
    println(x.Name);
}

public static func PrintCount(x: ICountable) -> void
{
    println(x.Count());
}

public static func Main() -> void
{
    t: Tag = new Tag("red");
    t.Click();
    t.Click();
    PrintName(t);    // red
    PrintCount(t);    // 2
}`

const interfaceDisposableCode = `using stdio;

namespace demo;

public class FileHandle : IDisposable
{
    private path: string;
    private opened: bool;

    public init(path: string)
    {
        this.path = path;
        this.opened = true;
        println("opened " + path);
    }

    public func Dispose() -> void
    {
        if (this.opened)
        {
            this.opened = false;
            println("closed " + path);
        }
    }
}

public static func Main() -> void
{
    // defer triggers Dispose on scope exit
    defer handle: FileHandle = new FileHandle("data.txt");
    println("working...");
    // Output:
    //   opened data.txt
    //   working...
    //   closed data.txt
}`

const interfaceExtendCode = `using stdio;

namespace demo;

public interface IReadable
{
    Read() -> string;
}

// Interfaces can extend other interfaces.
public interface IReadWrite : IReadable
{
    Write(data: string) -> void;
}

public class Buffer : IReadWrite
{
    private data: string;

    public init() { this.data = ""; }

    public func Read() -> string { return this.data; }
    public func Write(data: string) -> void { this.data = data; }
}

public static func Main() -> void
{
    b: Buffer = new Buffer();
    // Typed as the derived interface
    rw: IReadWrite = b;
    rw.Write("hello");
    println(rw.Read());  // hello

    // Upcast to base interface
    r: IReadable = rw;
    println(r.Read());  // hello
}`


const extMethodBasicCode = `using stdio;

namespace demo;

// A top-level static function taking a 'this' argument first.
static func Double(x: int) -> int
{
    return x * 2;
}

static func Greet(name: string) -> string
{
    return "Hello, " + name;
}

public static func Main() -> void
{
    a: int = 5;
    println(a.Double());   // 10 — called as if Double were an instance method on int
    println("world".Greet());   // Hello, world
}`

const extMethodChainingCode = `using stdio;
using collections;

namespace demo;

public delegate Transform<T, U>(value: T) -> U;
public delegate Predicate<T>(value: T) -> bool;

// An extension method on IEnumerable<T> — the first parameter is the source.
public static func Select<T, U>(source: IEnumerable<T>, action: Transform<T, U>) -> IEnumerable<U>
{
    temp := new List<U>();
    foreach (item in source)
        temp.Add(action(item));

    return temp;
}

public static func Where<T>(source: IEnumerable<T>, pred: Predicate<T>) -> IEnumerable<T>
{
    temp := new List<T>();
    foreach (item in source)
    {
        if (pred(item))
            temp.Add(item);
    }
    return temp;
}

public static func Main() -> void
{
    data := [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    result := data
        .Select(lambda (a: int) -> int { return a * 2; })
        .Where(lambda (a: int) -> bool { return a > 10; });

    // data → Select (double each) → Where (filter > 10) → result
    println(result);   // [12, 14, 16, 18, 20]
}`

const extMethodGenericCode = `using stdio;

namespace demo;

// Generic extension: works on any type.
public static func Identity<T>(x: T) -> T
{
    return x;
}

public static func Duplicate<T>(x: T) -> List<T>
{
    result := new List<T>();
    result.Add(x);
    result.Add(x);
    return result;
}

public static func Main() -> void
{
    a: int = 5;
    b := a.Identity<int>();    // 5
    println(b);

    c := a.Duplicate<int>();   // List<int> with [5, 5]
    println(c);

    // Chaining generics:
    d := "hello".Identity<string>();
    println(d);   // hello
}`


const genericClassCode = `using stdio;

namespace demo;

// A generic class parameterized by T.
public class Container<T>
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
}

public static func Main() -> void
{
    // int version — T becomes int
    c: Container<int> = new Container<int>();
    c.Set(42);
    println(c.Get());   // 42

    // string version — T becomes string
    d: Container<string> = new Container<string>();
    d.Set("hello");
    println(d.Get());   // hello
}`

const genericMultiParamCode = `using stdio;

namespace demo;

// Two type parameters.
public class Pair<K, V>
{
    public Key: K;
    public Value: V;
}

public static func Main() -> void
{
    p: Pair<int, string> = new Pair<int, string>();
    p.Key = 1;
    p.Value = "one";
    println(p.Key);       // 1
    println(p.Value);     // one
}`

const genericNestedCode = `using stdio;

namespace demo;

public class Container<T>
{
    public Value: T;
}

public static func Main() -> void
{
    // T = Container<int> — nested generic type.
    outer: Container<Container<int>> = new Container<Container<int>>();
    inner: Container<int> = new Container<int>();
    inner.Value = 99;
    outer.Value = inner;
    println(outer.Value.Value);   // 99
}`

const genericMethodCode = `using stdio;

namespace demo;

// A generic method on a non-generic class.
public class Factory
{
    public static func Make<T>(v: T) -> Container<T>
    {
        c: Container<T> = new Container<T>();
        c.Value = v;
        return c;
    }
}

public class Container<T>
{
    public Value: T;
}

public static func Main() -> void
{
    // Explicit type argument.
    c1: Container<int> = Factory.Make<int>(42);
    println(c1.Value);   // 42

    // Type inference — compiler deduces T = int from argument 42.
    c2 := Factory.Make(42);
    println(c2.Value);   // 42

    // Inference with string.
    c3 := Factory.Make("hi");
    println(c3.Value);   // hi
}`

const genericInterfaceCode = `using stdio;
using collections;

namespace demo;

public static func First<T>(source: IEnumerable<T>) -> T
{
    foreach (item in source)
        return item;

    return null;
}

public static func Main() -> void
{
    test := [1..10];
    x := First<int>(test);
    println(x);   // 1
}`


export default function Docs() {
  const location = useLocation()
  const navigate = useNavigate()

  // Parse URL hash to determine initial mode and active item.
  const getInitialState = () => {
    const hash = location.hash
    const match = hash.match(/^#\/docs\/(syntax|stdlib)\/(.+)$/)
    if (match) {
      const mode = match[1] as 'syntax' | 'stdlib'
      const item = decodeURIComponent(match[2])
      return { mode, item }
    }
    return { mode: 'syntax' as const, item: '1.1 · ShardScript Philosophy' }
  }

  const initialState = getInitialState()
  const [docMode, setDocMode] = useState<'syntax' | 'stdlib'>(initialState.mode)
  const docGroups = docMode === 'syntax' ? syntaxGroups : stdlibGroups
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['INTRODUCTION & ARCHITECTURE', 'LANGUAGE FUNDAMENTALS', 'CONTROL FLOW', 'OBJECT-ORIENTED PROGRAMMING', 'FUNCTIONAL PROGRAMMING', 'INTERNALS'])
  const [activeItem, setActiveItem] = useState(initialState.item)
  const [searchQuery, setSearchQuery] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Update URL hash when activeItem or docMode changes.
  useEffect(() => {
    const hash = `#/docs/${docMode}/${encodeURIComponent(activeItem)}`
    if (location.hash !== hash) {
      navigate(hash, { replace: true })
    }
  }, [activeItem, docMode])

  useEffect(() => {
    document.title = 'Documentation — ShardScript'
    window.scrollTo(0, 0)
  }, [activeItem])

  const toggleGroup = (title: string) => {
    setExpandedGroups((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    )
  }

  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return docGroups
    const query = searchQuery.toLowerCase()
    return docGroups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => item.toLowerCase().includes(query)),
      }))
      .filter((group) => group.items.length > 0)
  }, [searchQuery, docGroups])

  const getBreadcrumbs = () => {
    const allGroups = docMode === 'syntax' ? syntaxGroups : stdlibGroups
    const sector = docMode === 'syntax' ? 'Syntax' : 'Standard Library'
    for (const group of allGroups) {
      if (group.items.includes(activeItem)) {
        return `Docs / ${sector} / ${group.title} / ${activeItem}`
      }
    }
    return `Docs / ${sector} / ${activeItem}`
  }

  const renderContent = () => {
    switch (activeItem) {
      case '1.1 · ShardScript Philosophy':
        return <PhilosophyContent />
      case '1.2 · Runtime Architecture':
        return <RuntimeArchitectureContent />
      case '1.3 · Installation & Setup':
        return <InstallationContent />
      case '2.1 · Strict Typing & Variables':
        return <StrictTypingContent />
      case '2.2 · Operators & Math':
        return <OperatorsContent />
      case '2.3 · Strings & Interpolation':
        return <StringsContent />
      case '2.4 · Collections & Arrays':
        return <CollectionsContent />
      case '3.1 · Conditionals':
        return <ConditionalsContent />
      case '3.2 · Loops':
        return <LoopsContent />
      case '3.3 · switch & Pattern Matching':
        return <SwitchContent />
      case '3.4 · Exceptions & Error Handling':
        return <ExceptionsContent />
      case '3.5 · Defered execution':
        return <DeferContent />
      case '4.1 · Classes, Fields and Properties':
        return <ClassesFieldsPropertiesContent />
      case '4.2 · Interfaces and Abstractions':
        return <InterfacesContent />
      case '4.3 · Extension Methods':
        return <ExtensionMethodsContent />
      case '4.4 · Generic Types':
        return <GenericTypesContent />
      case '6.1 · Automatic Memory Management (GC)':
        return <GCContent />
      case '6.2 · Deterministic Disposal (IDisposable)':
        return <IDisposableContent />
      case '7.1 · Cooperative Multitasking (libuv)':
        return <CooperativeMultitaskingContent />
      case '7.2 · Async Functions & State Machines':
        return <AsyncStateMachineContent />
      case '7.3 · Task & ValueTask Types':
        return <TaskValueTaskContent />
      case '7.4 · Cancellation (CancellationToken)':
        return <CancellationTokenContent />
      case 'TypeShape & Slots':
        return <TypeShapeContent />
      case 'Async State Machine Lowering':
        return <AsyncStateMachineInternalsContent />
      case '5.1 · Functions as First-Class Objects':
        return <FirstClassFunctionsContent />
      case '5.2 · Lambda Expressions & Closures':
        return <LambdasClosuresContent />
      case 'IEnumerable & IEnumerator':
        return <CollectionsContractsContent />
      case 'List<T>':
        return <CollectionsListContent />
      case 'Dictionary<K, V>':
        return <CollectionsDictContent />
      case 'Queue<T> & Stack<T>':
        return <CollectionsQueueStackContent />
      case 'Collections Scenarios':
        return <CollectionsScenariosContent />
      case 'JsonSerializer':
        return <JsonSerializerContent />
      case 'JsonNode':
        return <JsonNodeContent />
      case 'JSON Scenarios':
        return <JsonScenariosContent />
      case 'IStream, IReadableStream, IWritableStream':
        return <StreamInterfacesContent />
      case 'MemoryStream':
        return <MemoryStreamContent />
      case 'StreamReader / StreamWriter':
        return <StreamTextContent />
      case 'BinaryReader / BinaryWriter':
        return <StreamBinaryContent />
      case 'Stream Scenarios':
        return <StreamScenariosContent />
      case 'File & Path':
        return <FilesystemContent />
      case 'Directory & DirectoryInfo':
        return <DirectoryContent />
      case 'Path Concatenation':
        return <PathConcatContent />
      case 'FS Scenarios':
        return <FsScenariosContent />
      case 'Process & ProcessStartInfo':
        return <SubprocessContent />
      case 'I/O & Lifecycle':
        return <SubprocessIOLifecycleContent />
      case 'Subprocess Scenarios':
        return <SubprocessScenariosContent />
      case 'Developer Tools':
        return <DebugDevToolsContent />
      case 'VM Inspection':
        return <DebugVMInspectionContent />
      case 'Environment':
        return <EnvironmentContent />
      case 'Basic Math':
        return <MathContent />
      case 'Trigonometry & Logarithms':
        return <MathTrigContent />
      case 'Math Scenarios':
        return <MathScenariosContent />
      default:
        return <PlaceholderContent title={activeItem} />
    }
  }

  return (
    <div className="bg-[#1E1E2E] min-h-screen">
      <div className="lg:hidden fixed top-[72px] left-0 right-0 z-30 bg-[#252538] border-b border-[#3A3A50] px-6 py-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center gap-2 text-text-secondary font-inter text-sm"
        >
          <ChevronDown size={16} className={`transition-transform duration-200 ${sidebarOpen ? 'rotate-180' : ''}`} />
          {activeItem}
        </button>
      </div>

      <div className="flex pt-[72px]">
        <aside
          className={`fixed lg:sticky top-[72px] left-0 w-[320px] h-[calc(100vh-72px)] bg-[#252538] border-r border-[#3A3A50] overflow-y-auto z-20 transition-transform duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="p-0">
            <div className="flex gap-1 mb-5 bg-[#1E1E2E] m-4 rounded-card p-1 border border-[#3A3A50]">
              <button
                onClick={() => { setDocMode('syntax'); setActiveItem('1.1 · ShardScript Philosophy'); setExpandedGroups(['INTRODUCTION & ARCHITECTURE', 'LANGUAGE FUNDAMENTALS', 'CONTROL FLOW', 'OBJECT-ORIENTED PROGRAMMING', 'FUNCTIONAL PROGRAMMING', 'RESOURCE MANAGEMENT AND LIFECYCLE', 'ASYNCHRONOUS PROGRAMMING', 'INTERNALS']) }}
                className={`flex-1 py-2 text-xs font-medium font-inter rounded-md transition-all duration-200 ${
                  docMode === 'syntax'
                    ? 'bg-burgundy text-white shadow-md'
                    : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                Syntax
              </button>
              <button
                onClick={() => { setDocMode('stdlib'); setActiveItem('Basic Math'); setExpandedGroups(['SHARD.MATH', 'SHARD.ENVIRONMENT', 'SHARD.DEBUG', 'SHARD.COLLECTIONS', 'SHARD.JSON', 'SHARD.STREAMS', 'SHARD.SUBPROCESS', 'SHARD.FILESYSTEM']) }}
                className={`flex-1 py-2 text-xs font-medium font-inter rounded-md transition-all duration-200 ${
                  docMode === 'stdlib'
                    ? 'bg-burgundy text-white shadow-md'
                    : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                Std. Library
              </button>
            </div>
            <div className="relative mb-6 m-4">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#2D2D45] border border-[#3A3A50] rounded-input py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted font-inter focus:outline-none focus:border-burgundy focus:shadow-glowBurgundy transition-all duration-300"
              />
            </div>

            <div className="space-y-6">
              {filteredGroups.map((group) => (
                <div key={group.title}>
                  <button
                    onClick={() => toggleGroup(group.title)}
                    className="w-full flex items-center justify-between underline pl-2 pr-3 py-2 text-base font-semibold text-text-secondary hover:bg-[rgba(155,45,48,0.1)] hover:text-text-primary bg-[rgba(30,30,46,0.5)] transition-colors duration-200"
                  >
                    <span className="truncate">{group.title}</span>
                    <ChevronDown size={14} className={`ml-2 flex-shrink-0 transition-transform duration-200 ${expandedGroups.includes(group.title) ? 'rotate-180' : ''}`} />
                  </button>

                  {expandedGroups.includes(group.title) && (
                    <div className="mt-1">
                      {group.items.map((item, idx) => (
                        <button
                          key={item}
                          onClick={() => { setActiveItem(item); setSidebarOpen(false) }}
                          className={`w-full text-left pl-7 pr-5 py-2 text-sm font-inter rounded transition-all duration-200 ${
                            activeItem === item
                              ? 'bg-[rgba(100,110,160,0.15)] text-[#7A8AB5] border-l-[3px] border-l-burgundy'
                              : idx % 1 === 1
                                ? 'text-text-secondary hover:bg-[rgba(155,45,48,0.1)] hover:text-text-primary bg-[rgba(30,30,46,0.5)]'
                                : 'text-text-secondary hover:bg-[rgba(155,45,48,0.1)] hover:text-text-primary'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/60 z-10 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        <main className="flex-1 min-w-0 lg:ml-0">
          <div className="max-w-[800px] mx-auto px-6 md:px-16 py-12 lg:py-12 pt-[140px] lg:pt-12">
            <ScrollReveal>
              <p className="text-xs font-medium tracking-[0.05em] uppercase text-text-muted mb-4">{getBreadcrumbs()}</p>
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <h1 className="font-space text-4xl md:text-5xl font-bold text-text-primary leading-[1.1] tracking-tight mb-2">
                {activeItem}
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="text-xs font-medium tracking-[0.05em] uppercase text-text-muted mb-10">
                Updated: July 2026
              </p>
            </ScrollReveal>

            <div className="docs-content">{renderContent()}</div>
          </div>
        </main>

        <aside className="hidden xl:block w-[200px] sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto p-6">
          {(() => {
            const allGroups = docMode === 'syntax' ? syntaxGroups : stdlibGroups
            const group = allGroups.find((g) => g.items.includes(activeItem))
            return (
              <>
                <p className="text-xs font-medium tracking-[0.05em] uppercase text-text-muted mb-4">IN THIS SECTION</p>
                <div className="space-y-1">
                  {(group?.items ?? []).map((item) => (
                    <button
                      key={item}
                      onClick={() => setActiveItem(item)}
                      className={`block w-full text-left text-sm py-1 transition-colors duration-200 ${
                        activeItem === item ? 'text-[#7A8AB5] font-medium' : 'text-text-muted hover:text-text-secondary'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-[#3A3A50]">
                  <p className="text-xs font-medium tracking-[0.05em] uppercase text-text-muted mb-3">REFERENCE</p>
                  <a
                    href="https://github.com/Rikitav/ShardScript"
                    target="_blank"
                    rel="noreferrer"
                    className="block text-sm text-text-muted hover:text-text-secondary transition-colors duration-200"
                  >
                    Source &amp; examples ↗
                  </a>
                </div>
              </>
            )
          })()}
        </aside>
      </div>
    </div>
  )
}

/* ===== Reusable bits ===== */

function Callout({
  tone = 'amber',
  title,
  children,
}: {
  tone?: 'amber' | 'blue' | 'green'
  title?: string
  children: React.ReactNode
}) {
  const tones: Record<string, string> = {
    amber: 'border-l-[#C4852E] bg-[rgba(196,133,46,0.08)]',
    blue: 'border-l-[#3B82F6] bg-[rgba(59,130,246,0.08)]',
    green: 'border-l-[#5B8C3E] bg-[rgba(91,140,62,0.05)]',
  }
  return (
    <div className={`mb-4 border-l-4 ${tones[tone]} px-5 py-4 rounded-r-lg`}>
      <p className="text-sm text-text-secondary">
        {title && <strong className="text-text-primary">{title}: </strong>}
        {children}
      </p>
    </div>
  )
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="bg-[rgba(100,110,160,0.15)] text-[#7A8AB5] rounded px-2 py-0.5 font-jetbrains text-sm">
      {children}
    </code>
  )
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-space text-2xl font-semibold text-text-primary mb-4">{children}</h2>
  )
}

function Prose({ children }: { children: React.ReactNode }) {
  return <p className="text-base text-text-secondary leading-relaxed mb-4">{children}</p>
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="text-gold mt-1.5">&bull;</span>
      <span>{children}</span>
    </li>
  )
}

/* ===== GETTING STARTED ===== */

function PhilosophyContent() {
  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          ShardScript is an <strong className="text-text-primary">embeddable, compiled scripting
          language with strict static typing</strong>, implemented in C++20. It is designed to bring the
          safety and structure of a statically-compiled language into the role traditionally filled by
          dynamically-typed embeddable script engines. Three principles shape every part of the language:
          it is <strong className="text-text-primary">pragmatic</strong>, it is{' '}
          <strong className="text-text-primary">multi-paradigm</strong>, and it actively resists what we
          call <strong className="text-text-primary">dynamic chaos</strong>.
        </Prose>
      </ScrollReveal>

      {/* Pragmatic ------------------------------------------------------ */}
      <ScrollReveal delay={0.05}>
        <H2>Pragmatic by Design</H2>
        <Prose>
          ShardScript prioritizes developer convenience and readability over minimalism. Where a
          construct proves useful in day-to-day code, the language adopts it — even if that means
          offering more than one way to express the same intent.
        </Prose>
        <ul className="space-y-2 text-text-secondary">
          <Bullet>
            <strong className="text-text-primary">Loop vocabulary</strong> — <InlineCode>for</InlineCode>,{' '}
            <InlineCode>while</InlineCode>, <InlineCode>until</InlineCode> (inverse{' '}
            <InlineCode>while</InlineCode>), and <InlineCode>foreach</InlineCode> cover every iteration
            style without forcing a single idiom.
          </Bullet>
          <Bullet>
            <strong className="text-text-primary">Delegates and lambdas</strong> — both <em>named</em>{' '}
            delegate types and <em>fabricated</em> inline types (<InlineCode>delegate int(int)</InlineCode>)
            are first-class, so callbacks can be declared once and reused or written inline as needed.
          </Bullet>
          <Bullet>
            <strong className="text-text-primary">Extension methods</strong> — any static function whose
            first parameter is a type becomes callable as a member of that type, letting you grow existing
            types without inheritance.
          </Bullet>
          <Bullet>
            <strong className="text-text-primary">Deterministic cleanup</strong> — <InlineCode>defer</InlineCode>{' '}
            runs in LIFO order at scope exit, giving scripting convenience without relying solely on the
            garbage collector.
          </Bullet>
        </ul>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <CodeBlock code={pragmaticCode} language="csharp" filename="pragmatic.shard" />
      </ScrollReveal>

      {/* Multi-paradigm ------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Multi-Paradigm</H2>
        <Prose>
          ShardScript does not force a single programming style. It blends{' '}
          <strong className="text-text-primary">object-oriented</strong>,{' '}
          <strong className="text-text-primary">functional</strong>,{' '}
          <strong className="text-text-primary">procedural</strong>, and{' '}
          <strong className="text-text-primary">asynchronous</strong> programming into one coherent type
          system, so you can choose the paradigm that fits the problem.
        </Prose>
        <ul className="space-y-2 text-text-secondary">
          <Bullet>
            <strong className="text-text-primary">Object-oriented</strong> — classes, structures,
            interfaces, access modifiers (<InlineCode>public</InlineCode> / <InlineCode>private</InlineCode>{' '}
            / <InlineCode>protected</InlineCode> / <InlineCode>internal</InlineCode>), properties with{' '}
            <InlineCode>get</InlineCode>/<InlineCode>set</InlineCode>, indexers, constructors, static
            members, and operator overloading (including the dynamic <InlineCode>operator .</InlineCode>).
          </Bullet>
          <Bullet>
            <strong className="text-text-primary">Functional</strong> — first-class delegates, static
            lambda expressions, and method-to-delegate conversion.
          </Bullet>
          <Bullet>
            <strong className="text-text-primary">Procedural</strong> — top-level and member functions
            with explicit <InlineCode>{'func Name(args) -> ReturnType'}</InlineCode> signatures.
          </Bullet>
          <Bullet>
            <strong className="text-text-primary">Asynchronous</strong> — <InlineCode>async</InlineCode>{' '}
            functions returning <InlineCode>Task</InlineCode> / <InlineCode>ValueTask&lt;T&gt;</InlineCode>,{' '}
            <InlineCode>await</InlineCode>, and a non-blocking event loop built on{' '}
            <strong className="text-text-primary">libuv</strong>.
          </Bullet>
        </ul>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <CodeBlock code={multiParadigmCode} language="csharp" filename="multi_paradigm.shard" />
      </ScrollReveal>

      {/* Dynamic chaos avoidance --------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Dynamic Chaos Avoidance (Strict Static Typing)</H2>
        <Prose>
          Scripting languages are frequently dynamically typed, which trades early error detection for
          runtime flexibility. ShardScript rejects that trade-off. Its typing is{' '}
          <strong className="text-text-primary">static and strong</strong>: every variable, parameter, and
          return value carries a type known at compile time, and the compiler enforces it <em>before</em> a
          single instruction executes.
        </Prose>
        <Prose>
          The mechanism is a dedicated semantic-analysis front end that sits between the parser and the
          bytecode emitter. Source moves through declaration collection, symbol building, scope and name
          resolution, expression binding, and validation — each pass rejecting type mismatches, unresolved
          names, and invalid operations as{' '}
          <strong className="text-text-primary">compile-time diagnostics</strong> rather than runtime
          crashes.
        </Prose>
        <Prose>
          A telling example is the <InlineCode>IPrintable</InlineCode> contract. Rather than letting output
          functions accept an open-ended <InlineCode>any</InlineCode>, ShardScript requires values to
          implement <InlineCode>IPrintable</InlineCode> (all built-in primitives do). This is a deliberate
          design choice: the language reaches for an explicit, verifiable interface instead of an escape
          hatch.
        </Prose>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <CodeBlock code={strictTypingCode} language="csharp" filename="strict_typing.shard" />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <Prose>
          The result is a language that <em>feels</em> like a scripting language to write, but eliminates
          an entire category of bugs — mistyped assignments, unknown members, missing returns — before the
          program ever runs.
        </Prose>
      </ScrollReveal>

      {/* Positioning ---------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Positioning: An Embedded, General-Purpose Scripting Language</H2>
        <Prose>
          ShardScript is built to be <strong className="text-text-primary">hosted inside a larger
          application</strong>, not to stand alone as a systems language. It compiles to its own bytecode
          and executes on a custom stack-based virtual machine, which makes the runtime self-contained and
          portable.
        </Prose>
        <Prose>This embedding orientation is reflected in several design points:</Prose>
        <ul className="space-y-2 text-text-secondary">
          <Bullet>
            <strong className="text-text-primary">A compact native runtime</strong> — the lexer, parser,
            semantic analyzer, bytecode compiler, and stack VM are all part of a single C++ library that a
            host application links against.
          </Bullet>
          <Bullet>
            <strong className="text-text-primary"><InlineCode>extern</InlineCode> interop</strong> — native
            C++ functions can be exposed directly to script, so the host can hand precisely chosen
            capabilities to the scripting layer.
          </Bullet>
          <Bullet>
            <strong className="text-text-primary">Shards (loaded libraries)</strong> — the standard library
            is not monolithic. Each subsystem (<InlineCode>stdio</InlineCode>, <InlineCode>collections</InlineCode>,{' '}
            <InlineCode>math</InlineCode>, <InlineCode>strings</InlineCode>, <InlineCode>json</InlineCode>,{' '}
            <InlineCode>http</InlineCode>, <InlineCode>socket</InlineCode>, <InlineCode>async</InlineCode>, …)
            is compiled to its own DLL — a <em>shard</em> — and loaded at runtime. A host loads only the
            shards its scripts actually need.
          </Bullet>
          <Bullet>
            <strong className="text-text-primary">Bindings beyond C++</strong> — the same runtime is exposed
            through a <InlineCode>.NET</InlineCode> wrapper and a Language Server (<InlineCode>LspServer</InlineCode>),
            so ShardScript can be embedded in managed applications and editors alike.
          </Bullet>
        </ul>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <Callout tone="blue" title="In short">
          ShardScript is intended for <strong className="text-text-primary">general-purpose</strong> use:
          game logic, application plug-ins, configuration-as-code, tooling, and any domain where you want
          trusted user code to run inside your product. It gives that code the ergonomics of a scripting
          language and the safety guarantees of a compiled one.
        </Callout>
      </ScrollReveal>
    </div>
  )
}

function RuntimeArchitectureContent() {
  const semanticPasses: [string, string, string][] = [
    ['1. Declarations', 'DeclarationCollector', 'Register every declared type, method, field, and parameter into the SymbolTable.'],
    ['2. Type binding', 'TypeBinder', 'Resolve type references (generics, base interfaces) to TypeSymbols.'],
    ['3. Expression binding', 'ExpressionBinder', 'Bind each expression to its symbol and type; resolve overloads and member access.'],
    ['4. Validation', 'SemanticValidator', 'Enforce the type rules and emit compile-time diagnostics.'],
  ]

  const opcodeGroups: { name: string; items: string[] }[] = [
    { name: 'Constants & locals', items: ['LOADCONST_INTEGER64', 'LOADCONST_STRING', 'LOAD_VARIABLE', 'STORE_VARIABLE'] },
    { name: 'Stack control', items: ['POPSTACK', 'POPSTACK_N', 'CREATE_DUPLICATE', 'NOP', 'HALT'] },
    { name: 'Arithmetic', items: ['MATH_ADDITION', 'MATH_MULTIPLICATION', 'MATH_POWER', 'MATH_LEFTSHIFT'] },
    { name: 'Comparison & logic', items: ['COMPARE_EQUAL', 'COMPARE_LESS', 'LOGICAL_AND', 'LOGICAL_NOT'] },
    { name: 'Control flow', items: ['JUMP', 'JUMP_TRUE', 'JUMP_FALSE', 'RETURN', 'THROW'] },
    { name: 'Calls', items: ['CALLMETHODSYMBOL', 'CALLGENERICMETHOD', 'CALLDELEGATE', 'CALLINTERFACE'] },
    { name: 'Objects & fields', items: ['NEWOBJECT', 'NEWDELEGATE', 'LOADFIELD', 'STOREFIELD', 'LOADSTATICFIELD'] },
    { name: 'Arrays & ranges', items: ['NEWARRAY', 'LOADARRAYELEMENT', 'STOREARRAYELEMENT', 'CREATERANGE'] },
    { name: 'Types', items: ['ISINSTANCE', 'CAST', 'CASTINTERFACE', 'CASTPRIMITIVE'] },
    { name: 'Exceptions', items: ['ENTER_TRY', 'LEAVE_TRY', 'RETHROW', 'END_CATCH'] },
    { name: 'defer', items: ['DEFER', 'DEFER_BREAK', 'DEFER_DRAIN'] },
  ]

  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          ShardScript is a <strong className="text-text-primary">compiled</strong> scripting language: source
          text is never interpreted directly. It is transformed, ahead of execution, into a compact bytecode
          that runs on a custom stack-based virtual machine, with concurrency provided by a single-threaded
          event loop built on <strong className="text-text-primary">libuv</strong>. This section traces a
          program from source to running instruction and explains the three engines behind it: the{' '}
          <strong className="text-text-primary">compiler</strong>, the{' '}
          <strong className="text-text-primary">virtual machine</strong>, and the{' '}
          <strong className="text-text-primary">event loop</strong>.
        </Prose>
      </ScrollReveal>

      {/* Pipeline ------------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>The Pipeline at a Glance</H2>
        <Prose>
          Every ShardScript program passes through the same fixed sequence. The{' '}
          <InlineCode>CompilationContext</InlineCode> owns each stage and threads a{' '}
          <InlineCode>SemanticModel</InlineCode> — the resolved symbol and type information — through them.
          The final product is an <InlineCode>ApplicationDomain</InlineCode>: a ready-to-run bundle handed to
          the host.
        </Prose>
        <CodeBlock code={pipelineCode} language="text" filename="pipeline.txt" />
        <Prose>
          Stages 1–6 are the compiler; stage 7 is the runtime. Lexical, syntax, and{' '}
          <em>type</em> errors are all reported before stage 7 begins — a program that contains them never
          reaches the VM.
        </Prose>
      </ScrollReveal>

      {/* Compiler ------------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Lexing, Parsing, and the Semantic Model</H2>
        <Prose>
          The <strong className="text-text-primary">lexer</strong> (<InlineCode>LexicalAnalyzer</InlineCode>)
          turns source text into a stream of tokens in a <InlineCode>LexicalBuffer</InlineCode>, recognising
          the language&apos;s richer literal forms — hexadecimal, binary, and decimal prefixes (
          <InlineCode>0x</InlineCode>, <InlineCode>0b</InlineCode>, <InlineCode>0d</InlineCode>), backtick
          digit separators, and SI-style size suffixes. The{' '}
          <strong className="text-text-primary">parser</strong> (<InlineCode>SourceParser</InlineCode>) is a
          hand-written recursive-descent parser that consumes the token stream and builds a{' '}
          <InlineCode>SyntaxTree</InlineCode> of <InlineCode>CompilationUnit</InlineCode> nodes — at this
          stage purely syntactic structure, with no meaning yet attached.
        </Prose>
        <h3 className="font-space text-lg font-semibold text-text-primary mb-3 mt-6">The semantic model</h3>
        <Prose>
          The semantic analyzer (<InlineCode>Semanter.Analyze</InlineCode>) walks the syntax tree in four
          ordered passes, each building on the last:
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Pass</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Component</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Responsibility</th>
              </tr>
            </thead>
            <tbody>
              {semanticPasses.map(([pass, component, responsibility], i) => (
                <tr key={pass} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm text-text-primary">{pass}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{component}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{responsibility}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Prose>
          The output is a fully resolved semantic model: a <InlineCode>SymbolTable</InlineCode> of typed
          symbols, a scope tree, and the <InlineCode>TypeShapes</InlineCode> that describe each type&apos;s
          physical layout. Any type error, unknown name, or invalid operation becomes a compile-time
          diagnostic here and halts compilation.
        </Prose>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <H2>Async Lowering</H2>
        <Prose>
          Before bytecode is emitted, <InlineCode>async</InlineCode> methods are rewritten. Each is turned
          into a compiler-generated state machine so that <InlineCode>await</InlineCode> can suspend and
          resume without threads.
        </Prose>
        <Callout tone="blue" title="State machines">
          A dedicated pass (<InlineCode>AsyncStateMachineLowering</InlineCode>) hoists each async
          method&apos;s locals into fields on a generated class and rebuilds the body as a{' '}
          <InlineCode>MoveNext</InlineCode> method that switches on an integer <InlineCode>State</InlineCode>{' '}
          field. Each <InlineCode>await</InlineCode> becomes a state transition: record the current state,
          register a continuation, and return.
        </Callout>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <H2>Bytecode Emission and the Instruction Set</H2>
        <Prose>
          <InlineCode>LayoutGenerator</InlineCode> assigns concrete offsets — where each field lives in an
          instance, and which slot index each local occupies. The emitter (
          <InlineCode>AbstractEmiter</InlineCode>) then walks the syntax tree again and, for every method,
          emits a flat <InlineCode>ExecutableByteCode</InlineCode> stream plus a shared string pool. Async
          state machines get their <InlineCode>MoveNext</InlineCode> bodies emitted by the companion{' '}
          <InlineCode>AsyncEmissionPass</InlineCode>. The assembled <InlineCode>ProgramVirtualImage</InlineCode>{' '}
          — type shapes, per-method bytecode, and the string pool — is wrapped, together with a fresh{' '}
          <InlineCode>VirtualMachine</InlineCode>, <InlineCode>EventLoop</InlineCode>, and{' '}
          <InlineCode>GarbageCollector</InlineCode>, into the <InlineCode>ApplicationDomain</InlineCode>.
        </Prose>
        <Prose>
          Each opcode is a 16-bit <InlineCode>OpCode</InlineCode> followed by zero or more inline operands:
          an immediate literal, a local slot index, a jump offset, an index into the string pool, or a
          reference to a resolved symbol (a <InlineCode>TypeSymbol</InlineCode>,{' '}
          <InlineCode>MethodSymbol</InlineCode>, <InlineCode>FieldSymbol</InlineCode>, or{' '}
          <InlineCode>ConstructorSymbol</InlineCode>). The full set groups naturally:
        </Prose>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {opcodeGroups.map((group) => (
            <div key={group.name} className="bg-[#252538] border border-[#3A3A50] rounded-card p-4">
              <p className="text-sm font-medium text-text-primary mb-2">{group.name}</p>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((op) => (
                  <code key={op} className="text-xs font-jetbrains text-[#7A8AB5] bg-[rgba(100,110,160,0.15)] rounded px-1.5 py-0.5">
                    {op}
                  </code>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <H2>Bytecode in the Wild</H2>
        <Prose>
          The interpreter&apos;s <InlineCode>-d</InlineCode> (<InlineCode>--decompiled</InlineCode>) flag runs
          the disassembler (<InlineCode>ProgramDisassembler</InlineCode>) and prints each method&apos;s
          bytecode with friendly mnemonics. This tiny program:
        </Prose>
        <CodeBlock code={ifElseSourceCode} language="csharp" filename="if_else.shard" />
        <Prose>compiles to:</Prose>
        <CodeBlock code={ifElseDisassemblyCode} language="text" filename="disassembly.txt" />
        <Prose>
          Read it left to right: a boolean is pushed, <InlineCode>jmpf</InlineCode> conditionally skips to
          the merge point <InlineCode>SS_003F</InlineCode>, the chosen branch loads a string from the pool
          and calls <InlineCode>println</InlineCode>, and execution reconverges for the trailing statement.
          Every ShardScript construct ultimately lowers to sequences like this.
        </Prose>
      </ScrollReveal>

      {/* Virtual machine ----------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>The Stack Virtual Machine</H2>
        <Prose>
          Execution is performed by the <InlineCode>VirtualMachine</InlineCode>, a classic stack machine:
          arithmetic and calls consume their operands from the top of an evaluation stack and push their
          results back. Locals live in a separate, slot-indexed area, not on the operand stack.
        </Prose>
        <h3 className="font-space text-lg font-semibold text-text-primary mb-3 mt-6">The dispatch loop</h3>
        <Prose>
          Each method owns its bytecode stream. To run a method, the VM creates a decoder over that stream
          and loops:
        </Prose>
        <CodeBlock code={dispatchLoopCode} language="text" />
        <Prose>
          This fetch–decode–execute switch lives in the VM&apos;s <InlineCode>ProcessCode</InlineCode>{' '}
          routine — one large <InlineCode>switch</InlineCode> over the <InlineCode>OpCode</InlineCode> enum
          whose cases are the instruction groups above.
        </Prose>
        <h3 className="font-space text-lg font-semibold text-text-primary mb-3 mt-6">Frames and the evaluation stack</h3>
        <Prose>Every active method call gets a <InlineCode>CallStackFrame</InlineCode>. A frame holds:</Prose>
        <ul className="space-y-2 text-text-secondary">
          <Bullet><strong className="text-text-primary">Evaluation stack</strong> — a stack of <InlineCode>ObjectInstance*</InlineCode> values that opcodes push and pop.</Bullet>
          <Bullet><strong className="text-text-primary">Locals</strong> — a slot-indexed region using the offsets the emitter assigned.</Bullet>
          <Bullet><strong className="text-text-primary">Type arguments</strong> — in force for generic methods.</Bullet>
          <Bullet><strong className="text-text-primary">Exception-handler stack</strong> — recording protected (<InlineCode>try</InlineCode>) regions and their dispatch offsets.</Bullet>
          <Bullet><strong className="text-text-primary">Defer stack</strong> — the deferred expressions registered in this scope.</Bullet>
          <Bullet><strong className="text-text-primary">Pending-task counter</strong> — keeps the frame alive while async work it started is still outstanding.</Bullet>
        </ul>
        <Prose>
          Calls push a new frame and transfer arguments; <InlineCode>RETURN</InlineCode> pops it, leaving the
          return value (if any) on the caller&apos;s evaluation stack. Operator evaluation shows the
          discipline: a binary opcode pops two values, asks the built-in primitive math module for the
          result, and — only when the operands are user-defined types — falls back to invoking the type&apos;s
          overloaded operator method.
        </Prose>
        <h3 className="font-space text-lg font-semibold text-text-primary mb-3 mt-6">Garbage collection</h3>
        <Prose>
          Values are garbage-collected <InlineCode>ObjectInstance</InlineCode> objects. The collector is{' '}
          <strong className="text-text-primary">reference-counting with object tracking</strong>: every value
          carries a reference count the VM updates as it is stored in and removed from slots, fields, and
          stacks, and the instance is reclaimed when the count reaches zero. A small-integer cache covers the
          common values −5…256, and every allocation — objects, arrays, strings — flows through the
          collector, which is what makes hosting safe.
        </Prose>
      </ScrollReveal>

      {/* Event loop ----------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>The libuv Event Loop</H2>
        <Prose>
          Concurrency is cooperative and single-threaded. A single <InlineCode>EventLoop</InlineCode> — a
          thin wrapper around a libuv <InlineCode>uv_loop_t</InlineCode> — multiplexes all in-flight
          asynchronous work: timers, socket and HTTP I/O, and thread-pool offloads. No async operation
          spawns a dedicated OS thread per task; instead each registers a handle with the loop and a
          continuation to run on completion.
        </Prose>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <H2>Timers, I/O, and Task.Delay</H2>
        <Prose>
          <InlineCode>Task.Delay</InlineCode> is the canonical example. In the async shard it calls the
          native helper <InlineCode>AsyncScope::Delay</InlineCode>, which creates a libuv timer, arms it,
          and registers a completion callback:
        </Prose>
        <CodeBlock code={taskDelayCode} language="cpp" filename="task_delay.cpp" />
        <Prose>
          When the timer fires, the callback completes the task, which resumes the suspended async method.
        </Prose>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <H2>Suspending and Resuming</H2>
        <Prose>
          An async method does not block its caller; it <em>suspends</em> at each <InlineCode>await</InlineCode>{' '}
          and returns control to the loop. Two ways to make progress exist:
        </Prose>
        <ul className="space-y-2 text-text-secondary">
          <Bullet>
            <strong className="text-text-primary">Blocking wait</strong> — <InlineCode>Task.Wait</InlineCode>{' '}
            (the bridge from synchronous <InlineCode>Main</InlineCode>) pumps the loop until the awaited task
            completes, then reads its result. While the call blocks its caller, the loop underneath keeps
            draining timers and I/O.
          </Bullet>
          <Bullet>
            <strong className="text-text-primary">Fire-and-forget</strong> — calling an async method without
            awaiting starts it concurrently. The loop keeps it alive as long as needed, and{' '}
            <InlineCode>Run()</InlineCode> halts any remaining fire-and-forget tasks on shutdown.
          </Bullet>
        </ul>
        <Prose>
          Resumption mirrors suspension. When a libuv callback completes a pending operation, the runtime
          calls <InlineCode>ResumeContinuation</InlineCode>: it reads the continuation off the task, finds the
          state machine&apos;s <InlineCode>MoveNext</InlineCode> method, and invokes it — picking up exactly
          where the method suspended, with its hoisted locals intact. In-flight tasks are{' '}
          <strong className="text-text-primary">rooted</strong> so the collector cannot reclaim them while
          they are suspended.
        </Prose>
        <CodeBlock code={eventLoopExampleCode} language="csharp" filename="event_loop.shard" />
        <Callout tone="blue" title="Offloading CPU-bound work">
          Because everything shares one thread, long CPU-bound work would starve the loop.{' '}
          <InlineCode>RunOnThreadPool</InlineCode> runs heavy work on a background{' '}
          <InlineCode>std::thread</InlineCode> and marshals completion back through a libuv{' '}
          <InlineCode>uv_async_t</InlineCode>, so the resume happens on the single thread where VM state is
          safe to touch. This is the pattern native shards use for expensive operations.
        </Callout>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <Callout tone="green" title="Putting it together">
          A running program is the product of all three engines: the compiler guarantees that only
          well-typed code ever runs; the VM executes bytecode with reference-counted memory; and the libuv
          event loop layers non-blocking concurrency on top — small enough to embed anywhere, strict enough
          to catch mistakes early, and concurrent enough for real I/O-heavy workloads.
        </Callout>
      </ScrollReveal>
    </div>
  )
}

function InstallationContent() {
  const cliFlags: [string, string][] = [
    ['-h, --help', 'Show the help screen.'],
    ['-i, --interactive', 'Start the interactive REPL console. (Also -r, --repl.)'],
    ['-d, --decompiled', 'Decompile the entry point and print its bytecode instead of running.'],
    ['--no-std', 'Do not load the standard shards from the system directory. (Alias: --exclude-std.)'],
    ['-l, --library <pattern>', 'Load an extra shard DLL; glob patterns are supported.'],
    ['<file>', 'A source file to compile and run (positional). Globs are supported.'],
  ]

  const geodeCommands: [string, string][] = [
    ['geode init [name]', 'Create a new Geode project (writes geode.env) in the current directory.'],
    ['geode restore', 'Resolve dependencies from geode.env into the local cache and ./libs.'],
    ['geode fetch <pkg> [-v <ver>] [-g]', 'Download a package into the local (or --global) library directory.'],
    ['geode run [script]', 'Run a ShardScript file using Geode-managed library paths.'],
    ['geode pack <src> [-o] [-r] [-l]', 'Build a .shardpkg archive from a source directory.'],
    ['geode publish <pkg>', 'Publish a .shardpkg file to the Geode registry.'],
    ['geode auth register | login | logout', 'Manage credentials for the Geode registry.'],
  ]

  const standardShards: [string, string][] = [
    ['stdio', 'Console I/O: print, println, input'],
    ['collections', 'List<T>, Dictionary<K,V>, Stack<T>, Queue<T>'],
    ['strings', 'String manipulation and formatting'],
    ['math', 'Math functions; math.random for RNG'],
    ['json', 'JSON parsing and serialization'],
    ['http', 'HTTP client and server'],
    ['socket', 'TCP socket operations'],
    ['async', 'Task, TaskCompletionSource, cancellation'],
    ['streams', 'Stream-based I/O'],
    ['debug', 'typeof, sizeof, PrintGcInfo'],
    ['reflection', 'Type, method, and field inspection'],
    ['subprocess', 'Spawn and manage child processes'],
  ]

  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          Getting ShardScript running is a three-piece affair: the <InlineCode>shard</InlineCode>{' '}
          interpreter (which includes the compiler, the virtual machine, and the event loop), the{' '}
          <strong className="text-text-primary">Standard Shards Collection</strong> of dynamic libraries,
          and — for dependency management — the <InlineCode>geode</InlineCode> package manager. This section
          walks through building and using each, configuring library paths, and wiring editors to the
          language server.
        </Prose>
      </ScrollReveal>

      {/* Build ---------------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Building the Interpreter</H2>
        <Prose>
          ShardScript is written in C++20 and built with CMake (the repository is set up for MSVC and
          Ninja on Windows). A single build produces the <InlineCode>shard</InlineCode> executable together
          with every standard shard DLL.
        </Prose>
        <CodeBlock code={buildCode} language="bash" filename="build.sh" />
        <Prose>
          After the build, <InlineCode>shard</InlineCode> (or <InlineCode>shard.exe</InlineCode>) sits in
          the build output directory next to a <InlineCode>system/</InlineCode> folder containing the shard
          DLLs — which is exactly where the interpreter looks for them at startup.
        </Prose>
        <Callout tone="amber" title="Build from source">
          There are no prebuilt binaries, installers, or system package-manager recipes published yet.
          Build from source with the commands above. On Windows the repository also ships{' '}
          <InlineCode>build_release.bat</InlineCode> and <InlineCode>build_debug.bat</InlineCode> helper
          scripts.
        </Callout>
      </ScrollReveal>

      {/* CLI ------------------------------------------------------------ */}
      <ScrollReveal delay={0.05}>
        <H2>The shard Command Line</H2>
        <Prose>
          The <InlineCode>shard</InlineCode> binary is the friendly front-end for the{' '}
          <InlineCode>ShardScript.Interpreter</InlineCode>. It compiles one or more source files, loads the
          standard shards, and either runs the program, decompiles it, or drops into a REPL. Source and
          library arguments both accept glob patterns.
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Flag</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              {cliFlags.map(([flag, desc], i) => (
                <tr key={flag} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{flag}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CodeBlock code={cliExamplesCode} language="bash" filename="cli.sh" />
      </ScrollReveal>

      {/* Standard shards ------------------------------------------------ */}
      <ScrollReveal delay={0.05}>
        <H2>The Standard Shards Collection</H2>
        <Prose>
          ShardScript has no monolithic standard library. Instead the{' '}
          <strong className="text-text-primary">Standard Shards Collection</strong> ships each subsystem as
          its own DLL — a <em>shard</em>. At startup the interpreter auto-loads every shard from its{' '}
          <InlineCode>system/</InlineCode> directory, so a script can simply <InlineCode>using</InlineCode>{' '}
          the ones it needs. The collection currently includes:
        </Prose>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {standardShards.map(([name, desc]) => (
            <div key={name} className="bg-[#252538] border border-[#3A3A50] rounded-card p-4">
              <code className="text-sm font-jetbrains text-[#7A8AB5]">{name}</code>
              <p className="text-sm text-text-secondary mt-1">{desc}</p>
            </div>
          ))}
        </div>
        <Callout tone="green" title="Sandboxing">
          Pass <InlineCode>--no-std</InlineCode> to skip auto-loading the <InlineCode>system/</InlineCode>{' '}
          directory entirely, then add only the shards you trust with <InlineCode>-l</InlineCode>. Combined
          with the symbol-injection model, this gives a tightly scoped execution sandbox.
        </Callout>
      </ScrollReveal>

      {/* Paths ---------------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Library Paths and the system Directory</H2>
        <Prose>
          Today the interpreter resolves standard shards by looking for a <InlineCode>system/</InlineCode>{' '}
          folder next to its own executable (<InlineCode>ExecutableDirectory() / system</InlineCode>). Because
          the build emits the shard DLLs straight into <InlineCode>bin/system</InlineCode>, a freshly built
          tree is already laid out correctly — no path configuration required.
        </Prose>
        <CodeBlock code={systemLayoutCurrentCode} language="text" filename="layout-current.txt" />
        <h3 className="font-space text-lg font-semibold text-text-primary mb-3 mt-6">The intended %SHARDSCRIPT% layout</h3>
        <Prose>
          The planned design introduces a <InlineCode>%SHARDSCRIPT%</InlineCode> environment variable
          pointing at an install root, with standard shards living under{' '}
          <InlineCode>%SHARDSCRIPT%/system_libs</InlineCode>. Both the interpreter and Geode would consult
          this root, giving every tool on the machine one canonical place to find the executable and its
          libraries.
        </Prose>
        <CodeBlock code={systemLayoutPlannedCode} language="text" filename="layout-planned.txt" />
        <Callout tone="amber" title="Planned, not yet implemented">
          The interpreter does not currently read <InlineCode>%SHARDSCRIPT%</InlineCode> or{' '}
          <InlineCode>system_libs</InlineCode> — the <InlineCode>system/</InlineCode>-beside-the-executable
          mechanism above is what ships today. The environment-variable layout is the intended direction.
        </Callout>
      </ScrollReveal>

      {/* Geode ---------------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>The Geode Package Manager</H2>
        <Prose>
          <InlineCode>geode</InlineCode> is the package manager for ShardScript — a NuGet-style tool for
          resolving, fetching, and publishing shards. A project is described by a{' '}
          <InlineCode>geode.env</InlineCode> manifest; Geode resolves dependencies (with SemVer constraints),
          caches them under <InlineCode>~/.geode/cache</InlineCode>, and restores them into a local{' '}
          <InlineCode>./libs</InlineCode> directory for the interpreter to load.
        </Prose>
        <Prose>
          Geode is a .NET solution: build it, then run the backend registry and use the{' '}
          <InlineCode>geode</InlineCode> CLI.
        </Prose>
        <CodeBlock code={geodeBuildCode} language="bash" filename="geode-setup.sh" />
        <Prose>A project manifest (<InlineCode>geode.env</InlineCode>) looks like this:</Prose>
        <CodeBlock code={geodeEnvCode} language="toml" filename="geode.env" />
        <Prose>The CLI verbs:</Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Command</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              {geodeCommands.map(([cmd, desc], i) => (
                <tr key={cmd} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{cmd}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Prose>
          Packages are distributed as <InlineCode>.shardpkg</InlineCode> archives (<InlineCode>pack</InlineCode>{' '}
          builds one, <InlineCode>publish</InlineCode> uploads it) and may target a specific runtime
          identifier so platform-specific native shards resolve correctly.
        </Prose>
        <Callout tone="amber" title="Self-hosted registry">
          Geode&apos;s registry currently defaults to <InlineCode>http://localhost:5000</InlineCode> — you run
          the backend yourself. There is no public package index published yet, so for now Geode is most
          useful for managing shards across your own projects and machines.
        </Callout>
      </ScrollReveal>

      {/* Editors -------------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Editor Integration</H2>
        <Prose>
          ShardScript ships a Language Server (the <InlineCode>lsp</InlineCode> binary, built from{' '}
          <InlineCode>ShardScript.LspServer</InlineCode>) that speaks the Language Server Protocol over
          stdio. Editors connect to it like any other LSP server.
        </Prose>
        <Callout tone="blue" title="No first-party extensions yet">
          There are no packaged Zed, VS Code, or Neovim extensions published today. Each editor is wired to
          the <InlineCode>lsp</InlineCode> binary manually as a generic LSP server; some editors may also
          need a small file-type association for <InlineCode>.shard</InlineCode> files.
        </Callout>
        <h3 className="font-space text-lg font-semibold text-text-primary mb-3 mt-6">Neovim</h3>
        <Prose>
          With <InlineCode>nvim-lspconfig</InlineCode>, register a custom server pointing at the binary:
        </Prose>
        <CodeBlock code={nvimLspCode} language="lua" filename="init.lua" />
        <h3 className="font-space text-lg font-semibold text-text-primary mb-3 mt-6">VS Code and Zed</h3>
        <Prose>
          VS Code needs a client extension to launch an arbitrary server; use a generic LSP-client extension
          (or a tiny generated extension) configured to spawn <InlineCode>lsp</InlineCode> for{' '}
          <InlineCode>.shard</InlineCode> files. In Zed, register the binary under the{' '}
          <InlineCode>lsp</InlineCode> key in your settings and associate it with the ShardScript language.
          In both cases the server itself is the same <InlineCode>lsp</InlineCode> binary — only the hosting
          glue differs.
        </Prose>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <Callout tone="green" title="You are set up">
          With <InlineCode>shard</InlineCode> built, the standard shards in <InlineCode>system/</InlineCode>,
          <InlineCode>geode</InlineCode> managing dependencies, and your editor wired to the language server,
          you have the full toolchain. Head to the language reference to start writing code.
        </Callout>
      </ScrollReveal>
    </div>
  )
}

function StrictTypingContent() {
  const primitiveTypes: [string, string, string][] = [
    ['int', 'Value', '64-bit signed integer'],
    ['double', 'Value', '64-bit floating-point'],
    ['bool', 'Value', 'true or false'],
    ['char', 'Value', "a single UTF-16 character ('A')"],
    ['byte', 'Value', 'unsigned 8-bit integer'],
    ['nint', 'Value', 'pointer-sized native integer'],
    ['string', 'Reference', 'UTF-16 string'],
    ['void', '—', 'absence of a value (return types only)'],
  ]

  const declarationForms: [string, string][] = [
    ['name: Type = value', 'Explicit type; the compiler checks the value is assignable to Type.'],
    ['name := value', 'Type inferred from the value at compile time, then fixed.'],
    ['name = value', 'Reassignment of an already-declared variable (not a declaration).'],
    ['Type name = value', 'Rejected — C-style declarations are not valid.'],
    ['var name = value', 'Rejected — var is not allowed.'],
  ]

  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          ShardScript is <strong className="text-text-primary">statically and strongly typed</strong>: every
          binding has a type that is known at compile time and fixed for its entire lifetime. There are
          exactly two ways to introduce a variable — an{' '}
          <strong className="text-text-primary">explicit type annotation</strong> and{' '}
          <strong className="text-text-primary">type inference</strong>. Both are fully statically typed;
          inference is never dynamic. There is no <InlineCode>var</InlineCode> keyword and no C-style{' '}
          <InlineCode>Type name = value</InlineCode> syntax.
        </Prose>
      </ScrollReveal>

      {/* Primitives ----------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Primitive Types</H2>
        <Prose>
          The built-in primitives split into value types (copied on assignment) and one reference type (
          <InlineCode>string</InlineCode>). <InlineCode>void</InlineCode> is reserved for function return
          types and carries no value.
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Type</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Kind</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              {primitiveTypes.map(([type, kind, desc], i) => (
                <tr key={type} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{type}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{kind}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CodeBlock code={primitivesCode} language="csharp" filename="primitives.shard" />
      </ScrollReveal>

      {/* Declaration forms ---------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>The Two Declaration Forms</H2>
        <Prose>
          A variable is declared either with an explicit type or with the inference operator{' '}
          <InlineCode>:=</InlineCode> (read as &quot;is defined as&quot;). Notice that ShardScript is{' '}
          <strong className="text-text-primary">name-first</strong>: the name comes before the type.
        </Prose>
        <CodeBlock code={declarationFormsCode} language="csharp" filename="declarations.shard" />
        <div className="overflow-x-auto mt-2">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Form</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Meaning</th>
              </tr>
            </thead>
            <tbody>
              {declarationForms.map(([form, meaning], i) => (
                <tr key={form} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{form}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollReveal>

      {/* Explicit vs inference ----------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Explicit Type vs Inference</H2>
        <Prose>
          The two forms are interchangeable in their guarantees — both produce a fixed, compile-time type.
          The difference is only in who supplies the type.
        </Prose>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#252538] border border-[#3A3A50] rounded-card p-6">
            <h4 className="font-space text-lg font-semibold text-text-primary mb-2">name: Type = value</h4>
            <p className="text-sm text-text-secondary mb-3">
              You name the type yourself. The compiler then verifies the value is assignable to it.
            </p>
            <ul className="space-y-2 text-sm text-text-secondary">
              <Bullet>Be explicit and intentional about a binding&apos;s contract.</Bullet>
              <Bullet>Store a value under a base or interface type, e.g. <InlineCode>shape: IShape = new Circle()</InlineCode>.</Bullet>
              <Bullet>Pin a type when the initializer is broader than you want.</Bullet>
            </ul>
          </div>
          <div className="bg-[#252538] border border-[#3A3A50] rounded-card p-6">
            <h4 className="font-space text-lg font-semibold text-text-primary mb-2">name := value</h4>
            <p className="text-sm text-text-secondary mb-3">
              The compiler derives the type from the value. It is shorthand — the result is just as static
              and strongly typed.
            </p>
            <ul className="space-y-2 text-sm text-text-secondary">
              <Bullet>Prefer it for locals where the type is obvious from the right-hand side.</Bullet>
              <Bullet>The inferred type is <strong className="text-text-primary">permanent</strong>; a later assignment of another type is an error.</Bullet>
              <Bullet>Equivalent to writing the type out by hand.</Bullet>
            </ul>
          </div>
        </div>
        <Callout tone="blue" title="Inference is still static typing">
          <InlineCode>:=</InlineCode> does not weaken the type system. The compiler determines the type once,
          at the point of declaration, and that type is then immutable. There is no dynamism, no late
          binding, and no re-typing — <InlineCode>x := 10</InlineCode> is exactly as typed as{' '}
          <InlineCode>x: int = 10</InlineCode>.
        </Callout>
      </ScrollReveal>

      {/* Not allowed ---------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>What Is Not Allowed</H2>
        <Prose>
          Coming from C, C++, C#, or Rust, two habits will trip you up. ShardScript puts the{' '}
          <strong className="text-text-primary">name first</strong>, so the C-style{' '}
          <InlineCode>Type name = value</InlineCode> is a compile error — and there is no{' '}
          <InlineCode>var</InlineCode> escape hatch.
        </Prose>
        <CodeBlock code={notAllowedCode} language="csharp" filename="errors.shard" />
        <Callout tone="amber" title="Only two shapes compile">
          <InlineCode>name: Type = value;</InlineCode> and <InlineCode>name := value;</InlineCode> are the
          only valid local declarations. A local without an initializer is also invalid — give it a value, or
          declare it as a member field instead.
        </Callout>
      </ScrollReveal>
    </div>
  )
}

function OperatorsContent() {
  const arithmeticOps: [string, string][] = [
    ['+', 'Addition'],
    ['-', 'Subtraction'],
    ['*', 'Multiplication'],
    ['/', 'Division'],
    ['%', 'Modulo'],
    ['^', 'Exponentiation (power)'],
  ]

  const comparisonOps: [string, string][] = [
    ['==', 'Equal'],
    ['!=', 'Not equal'],
    ['<', 'Less than'],
    ['<=', 'Less than or equal'],
    ['>', 'Greater than'],
    ['>=', 'Greater than or equal'],
  ]

  const bitwiseOps: [string, string][] = [
    ['&', 'Bitwise AND'],
    ['|', 'Bitwise OR'],
    ['<<', 'Left shift'],
    ['>>', 'Right shift'],
  ]

  const logicalOps: [string, string][] = [
    ['!', 'not — Logical NOT'],
    ['&', 'and — AND (non-short-circuit)'],
    ['|', 'or — OR (non-short-circuit)'],
  ]

  const compoundOps: string[] = ['+=', '-=', '*=', '/=', '%=', '^=', '|=', '&=']

  const precedence: [string, string][] = [
    ['11 (highest)', '++ -- (postfix), await'],
    ['10', '^ (power)'],
    ['9', '* / %'],
    ['8', '+ -'],
    ['7', '<< >> .. ..&'],
    ['6', '< <= > >='],
    ['5', '== != is as'],
    ['4', '&  and'],
    ['3', '|  or'],
    ['2', '??'],
    ['1 (lowest)', '= += -= *= /= %= ^= |= &='],
  ]

  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          ShardScript provides the usual arithmetic, comparison, and bitwise operators, plus an
          exponentiation operator. They are resolved at runtime by the built-in primitive math module,
          which falls back to a type&apos;s user-defined overload when the operands are not primitives. Every
          operator has a fixed precedence.
        </Prose>
      </ScrollReveal>

      {/* Arithmetic ----------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Arithmetic Operators</H2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {arithmeticOps.map(([op, name]) => (
            <div key={op} className="bg-[#252538] border border-[#3A3A50] rounded-card px-3 py-3 text-center">
              <code className="block text-lg font-jetbrains text-[#7A8AB5]">{op}</code>
              <span className="text-xs text-text-secondary">{name}</span>
            </div>
          ))}
        </div>
        <CodeBlock code={arithmeticCode} language="csharp" filename="arithmetic.shard" />
        <Prose>
          Division of two <InlineCode>int</InlineCode> values is <strong className="text-text-primary">integer
          division</strong>; if either operand is a <InlineCode>double</InlineCode>, the result is a{' '}
          <InlineCode>double</InlineCode>. The compound forms mirror each binary arithmetic operator — note
          that <InlineCode>^=</InlineCode> is power-assign, not XOR-assign.
        </Prose>
        <div className="flex flex-wrap gap-2">
          {compoundOps.map((op) => (
            <code key={op} className="font-jetbrains text-sm text-[#7A8AB5] bg-[rgba(100,110,160,0.15)] rounded px-2 py-1">{op}</code>
          ))}
        </div>
      </ScrollReveal>

      {/* Comparison ----------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Comparison Operators</H2>
        <Prose>
          Each comparison pops two values, compares them, and pushes a <InlineCode>bool</InlineCode>. They
          work across the primitive numeric types and, for equality, across reference types (where{' '}
          <InlineCode>==</InlineCode> may resolve to an overloaded <InlineCode>EqualsOperator</InlineCode>).
        </Prose>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {comparisonOps.map(([op, name]) => (
            <div key={op} className="bg-[#252538] border border-[#3A3A50] rounded-card px-3 py-3 text-center">
              <code className="block text-lg font-jetbrains text-[#7A8AB5]">{op}</code>
              <span className="text-xs text-text-secondary">{name}</span>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Bitwise -------------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Bitwise Operators and Shifts</H2>
        <Prose>
          Bitwise operations apply to integer operands (<InlineCode>int</InlineCode>,{' '}
          <InlineCode>byte</InlineCode>, <InlineCode>nint</InlineCode>). <InlineCode>&</InlineCode> and{' '}
          <InlineCode>|</InlineCode> have compound-assign forms (<InlineCode>&=</InlineCode>,{' '}
          <InlineCode>|=</InlineCode>); shifts do not.
        </Prose>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {bitwiseOps.map(([op, name]) => (
            <div key={op} className="bg-[#252538] border border-[#3A3A50] rounded-card px-3 py-3 text-center">
              <code className="block text-lg font-jetbrains text-[#7A8AB5]">{op}</code>
              <span className="text-xs text-text-secondary">{name}</span>
            </div>
          ))}
        </div>
        <CodeBlock code={bitwiseCode} language="csharp" filename="bitwise.shard" />
      </ScrollReveal>

      {/* Logical -------------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Logical Operators</H2>
        <Prose>
          ShardScript offers both symbolic and keyword forms for boolean logic:{' '}
          <InlineCode>!</InlineCode> or <InlineCode>not</InlineCode> for negation,{' '}
          <InlineCode>&</InlineCode> or <InlineCode>and</InlineCode> for AND, and{' '}
          <InlineCode>|</InlineCode> or <InlineCode>or</InlineCode> for OR. The keywords are exact aliases —
          they produce the same tokens, so they share precedence and semantics with the symbols. Applied to{' '}
          <InlineCode>bool</InlineCode> operands they behave as logical combinators; on integers{' '}
          <InlineCode>&</InlineCode> and <InlineCode>|</InlineCode> are bitwise. They are{' '}
          <strong className="text-text-primary">not short-circuiting</strong> — both sides are always
          evaluated. There is no <InlineCode>&&</InlineCode> or <InlineCode>||</InlineCode>.
        </Prose>
        <div className="grid grid-cols-3 gap-3">
          {logicalOps.map(([op, name]) => (
            <div key={op + name} className="bg-[#252538] border border-[#3A3A50] rounded-card px-3 py-3 text-center">
              <code className="block text-lg font-jetbrains text-[#7A8AB5]">{op}</code>
              <span className="text-xs text-text-secondary">{name}</span>
            </div>
          ))}
        </div>
        <CodeBlock code={logicalCode} language="csharp" filename="logical.shard" />
      </ScrollReveal>

      {/* Precedence ----------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Operator Precedence</H2>
        <Prose>
          Higher levels bind tighter. When operands are not built-in primitives, the compiler looks up a
          matching overload on their type instead.
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Level</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Operators</th>
              </tr>
            </thead>
            <tbody>
              {precedence.map(([level, ops], i) => (
                <tr key={level} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{level}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-text-secondary">{ops}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <Callout tone="amber" title="Gotchas coming from C-family languages">
          <InlineCode>^</InlineCode> is <strong className="text-text-primary">exponentiation</strong>, not
          XOR — there is no XOR operator. <InlineCode>and</InlineCode>, <InlineCode>or</InlineCode>, and{' '}
          <InlineCode>not</InlineCode> are aliases for <InlineCode>&</InlineCode>, <InlineCode>|</InlineCode>,
          and <InlineCode>!</InlineCode> — <strong className="text-text-primary">not</strong> short-circuit
          operators. There is no <InlineCode>&amp;&amp;</InlineCode> or <InlineCode>||</InlineCode>, so both
          operands are always evaluated; restructure with <InlineCode>if</InlineCode> when you must avoid
          evaluating the right side. There is no bitwise NOT (<InlineCode>~</InlineCode>), and
          shift-assignment (<InlineCode>&lt;&lt;=</InlineCode>, <InlineCode>&gt;&gt;=</InlineCode>) is not
          supported.
        </Callout>
      </ScrollReveal>
    </div>
  )
}

function StringsContent() {
  const stringForms: [string, string][] = [
    ['"text"', 'Regular string. Recognizes the escapes \\\\, \\", and \\n.'],
    ['@"text"', 'Verbatim string. Backslashes are literal; no escapes are processed.'],
    ["'c'", 'A single UTF-16 character (the char type).'],
  ]

  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          <InlineCode>string</InlineCode> is a reference type holding a sequence of UTF-16 code units. There
          are three literal forms — regular, verbatim, and character — and strings are most often assembled
          with the <InlineCode>+</InlineCode> operator or the <InlineCode>strings.Format</InlineCode> helper.
          A dedicated interpolation syntax is planned but not yet implemented.
        </Prose>
      </ScrollReveal>

      {/* Literals ------------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>String Literals</H2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Form</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Meaning</th>
              </tr>
            </thead>
            <tbody>
              {stringForms.map(([form, meaning], i) => (
                <tr key={form} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{form}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CodeBlock code={stringLiteralCode} language="csharp" filename="literals.shard" />
        <Callout tone="amber" title="Only three escapes in regular strings">
          A regular <InlineCode>"..."</InlineCode> string recognizes just <InlineCode>\\\\</InlineCode>{' '}
          (backslash), <InlineCode>\\"</InlineCode> (quote), and <InlineCode>\\n</InlineCode> (newline). For
          backslash-heavy text such as Windows paths or regex, reach for a verbatim{' '}
          <InlineCode>@"..."</InlineCode> string instead.
        </Callout>
      </ScrollReveal>

      {/* Verbatim ------------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Verbatim Strings</H2>
        <Prose>
          Prefix a string with <InlineCode>@</InlineCode> and every character — including backslashes — is
          taken literally. No escapes are processed, which makes verbatim strings ideal for file paths and
          patterns.
        </Prose>
        <CodeBlock code={verbatimCode} language="csharp" filename="verbatim.shard" />
      </ScrollReveal>

      {/* Concatenation -------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Concatenation</H2>
        <Prose>
          The <InlineCode>+</InlineCode> operator concatenates strings and coerces adjacent primitives, so
          you can mix text and numbers without an explicit conversion. This is the everyday way to build
          strings today.
        </Prose>
        <CodeBlock code={concatCode} language="csharp" filename="concat.shard" />
      </ScrollReveal>

      {/* Format --------------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Formatting with strings.Format</H2>
        <Prose>
          For anything more involved than simple concatenation, the <InlineCode>strings</InlineCode> shard
          provides <InlineCode>strings.Format</InlineCode>. It takes a format string with{' '}
          <strong className="text-text-primary">positional</strong> placeholders —{' '}
          <InlineCode>{'{0}'}</InlineCode>, <InlineCode>{'{1}'}</InlineCode>, and so on — indexed against the
          arguments that follow. Write literal braces as <InlineCode>{'{{'}</InlineCode> and{' '}
          <InlineCode>{'}}'}</InlineCode>.
        </Prose>
        <CodeBlock code={formatCode} language="csharp" filename="format.shard" />
      </ScrollReveal>

      {/* Encoding ------------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Encoding: UTF-16</H2>
        <Prose>
          ShardScript strings are <strong className="text-text-primary">UTF-16</strong> internally. The
          runtime stores them as a <InlineCode>std::wstring</InlineCode> of 16-bit code units, and a{' '}
          <InlineCode>char</InlineCode> is a single UTF-16 code unit. Source files are decoded to UTF-16 at
          lex time, so a <InlineCode>"..."</InlineCode> or <InlineCode>'...'</InlineCode> literal may contain
          any character representable in that encoding.
        </Prose>
      </ScrollReveal>

      {/* Interpolation (planned) --------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>String Interpolation (Planned)</H2>
        <Prose>
          The intended design adds C#-style interpolated strings: prefix a string with{' '}
          <InlineCode>$</InlineCode> and embed expressions in braces, e.g.{' '}
          <InlineCode>{'$"Value: {x}"'}</InlineCode>. The compiler would expand each hole into the equivalent
          concatenation or <InlineCode>strings.Format</InlineCode> call.
        </Prose>
        <CodeBlock code={interpolationPlannedCode} language="csharp" filename="interpolation.planned.shard" />
        <Callout tone="amber" title="Planned, not yet implemented">
          The lexer does not yet recognize a <InlineCode>$</InlineCode>-string, so{' '}
          <InlineCode>{'$"..."'}</InlineCode> is a compile error today. Until it lands, build strings with{' '}
          <InlineCode>+</InlineCode> or <InlineCode>strings.Format</InlineCode>.
        </Callout>
      </ScrollReveal>
    </div>
  )
}

function CollectionsContent() {
  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          ShardScript has fixed-size arrays built into the language and a set of collection types —{' '}
          <InlineCode>List&lt;T&gt;</InlineCode>, <InlineCode>Dictionary&lt;K,V&gt;</InlineCode>,{' '}
          <InlineCode>Stack&lt;T&gt;</InlineCode>, and <InlineCode>Queue&lt;T&gt;</InlineCode> — in the{' '}
          <InlineCode>collections</InlineCode> shard. Arrays use a literal syntax; the collection types are
          constructed with <InlineCode>new</InlineCode>. All of them are iterable with{' '}
          <InlineCode>foreach</InlineCode>.
        </Prose>
      </ScrollReveal>

      {/* Arrays --------------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Arrays</H2>
        <Prose>
          An array is a fixed-size, indexed sequence written as a comma-separated list in square brackets.
          Its type is <InlineCode>T[]</InlineCode>. Elements are read and written with the{' '}
          <InlineCode>[]</InlineCode> indexer, and the length is exposed as{' '}
          <InlineCode>.Length</InlineCode>.
        </Prose>
        <CodeBlock code={arrayCode} language="csharp" filename="arrays.shard" />
        <ul className="space-y-2 text-text-secondary">
          <Bullet><InlineCode>T[]</InlineCode> — the array type; e.g. <InlineCode>int[]</InlineCode>, <InlineCode>byte[]</InlineCode>.</Bullet>
          <Bullet><InlineCode>[a, b, c]</InlineCode> — an array literal. <InlineCode>[]</InlineCode> is an empty array.</Bullet>
          <Bullet><InlineCode>arr[i]</InlineCode> / <InlineCode>arr[i] = v</InlineCode> — index get and set.</Bullet>
          <Bullet><InlineCode>arr.Length</InlineCode> — the number of elements.</Bullet>
        </ul>
        <Callout tone="amber" title="Ranges are not arrays">
          A bracket holding a single range — <InlineCode>{'[1..5]'}</InlineCode> — is the range value itself,
          not an array of numbers. Use it directly in a <InlineCode>for-in</InlineCode> or{' '}
          <InlineCode>foreach</InlineCode>.
        </Callout>
      </ScrollReveal>

      {/* Lists ---------------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Lists</H2>
        <Prose>
          <InlineCode>List&lt;T&gt;</InlineCode> is a dynamically-sized, indexable sequence. Construct one
          with <InlineCode>new</InlineCode> and grow it with <InlineCode>Add</InlineCode>. Note that List
          exposes its size as <InlineCode>Length</InlineCode>, not <InlineCode>Count</InlineCode>.
        </Prose>
        <CodeBlock code={listCode} language="csharp" filename="lists.shard" />
        <ul className="space-y-2 text-text-secondary">
          <Bullet><InlineCode>.Length</InlineCode> — the number of items.</Bullet>
          <Bullet><InlineCode>[i]</InlineCode> — indexer get and set.</Bullet>
          <Bullet><InlineCode>.Add(item)</InlineCode>, <InlineCode>.ElementAt(i)</InlineCode>, <InlineCode>.RemoveAt(i)</InlineCode>, <InlineCode>.Clear()</InlineCode>.</Bullet>
        </ul>
      </ScrollReveal>

      {/* Dictionaries --------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Dictionaries</H2>
        <Prose>
          <InlineCode>Dictionary&lt;K,V&gt;</InlineCode> maps keys to values. Add pairs with{' '}
          <InlineCode>Add</InlineCode> or the indexer, look them up with the indexer, and iterate with{' '}
          <InlineCode>foreach</InlineCode>, which yields <InlineCode>KeyValuePair&lt;K,V&gt;</InlineCode>{' '}
          structs exposing <InlineCode>.Key</InlineCode> and <InlineCode>.Value</InlineCode>.
        </Prose>
        <CodeBlock code={dictionaryCode} language="csharp" filename="dictionaries.shard" />
        <ul className="space-y-2 text-text-secondary">
          <Bullet><InlineCode>.Count</InlineCode> — the number of pairs (dictionaries use Count).</Bullet>
          <Bullet><InlineCode>[key]</InlineCode> — indexer get and set.</Bullet>
          <Bullet><InlineCode>.Add(k, v)</InlineCode>, <InlineCode>.Remove(k)</InlineCode>, <InlineCode>.ContainsKey(k)</InlineCode>, <InlineCode>.Clear()</InlineCode>.</Bullet>
          <Bullet><InlineCode>.Keys</InlineCode> and <InlineCode>.Values</InlineCode> — the key and value arrays.</Bullet>
        </ul>
      </ScrollReveal>

      {/* Stacks & Queues ------------------------------------------------ */}
      <ScrollReveal delay={0.05}>
        <H2>Stacks and Queues</H2>
        <Prose>
          <InlineCode>Stack&lt;T&gt;</InlineCode> is last-in, first-out; <InlineCode>Queue&lt;T&gt;</InlineCode>{' '}
          is first-in, first-out. Both expose <InlineCode>.Count</InlineCode> and a{' '}
          <InlineCode>.Peek()</InlineCode> that reads without removing.
        </Prose>
        <CodeBlock code={stackQueueCode} language="csharp" filename="stacks_queues.shard" />
        <ul className="space-y-2 text-text-secondary">
          <Bullet><strong className="text-text-primary">Stack</strong> — <InlineCode>.Push(x)</InlineCode>, <InlineCode>.Pop()</InlineCode>, <InlineCode>.Peek()</InlineCode>, <InlineCode>.Count</InlineCode>.</Bullet>
          <Bullet><strong className="text-text-primary">Queue</strong> — <InlineCode>.Enqueue(x)</InlineCode>, <InlineCode>.Dequeue()</InlineCode>, <InlineCode>.Peek()</InlineCode>, <InlineCode>.Count</InlineCode>.</Bullet>
        </ul>
      </ScrollReveal>

      {/* foreach -------------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Iterating with foreach</H2>
        <Prose>
          <InlineCode>foreach</InlineCode> consumes any <InlineCode>IEnumerable&lt;T&gt;</InlineCode>, so the
          same loop shape works over arrays, lists, dictionaries, queues, stacks, and ranges alike.
        </Prose>
        <CodeBlock code={foreachCode} language="csharp" filename="foreach.shard" />
      </ScrollReveal>
    </div>
  )
}

function ConditionalsContent() {
  const conditionalForms: [string, string][] = [
    ['if (cond) stmt', 'Run stmt when cond is true (statement form).'],
    ['if / else if / else', 'Chain branches; braces optional for a single statement.'],
    ['unless (cond) stmt', 'Run stmt when cond is false — the inverse of if.'],
    ['value := if cond a else b', 'if used as an expression (no ternary needed).'],
  ]

  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          ShardScript branches with <InlineCode>if</InlineCode> and its inverted sibling{' '}
          <InlineCode>unless</InlineCode>. The condition sits in parentheses and the body is either a brace
          block or a single statement. <InlineCode>if</InlineCode> also works as an expression, so there is
          no separate ternary operator.
        </Prose>
      </ScrollReveal>

      {/* if / else if / else ------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>if / else if / else</H2>
        <Prose>
          An <InlineCode>if</InlineCode> tests a parenthesized condition. Chain additional branches with{' '}
          <InlineCode>else if</InlineCode>, and finish with a plain <InlineCode>else</InlineCode>. Braces are
          optional when a body is a single statement, but a body can never be an empty{' '}
          <InlineCode>;</InlineCode> — use <InlineCode>{'{ }'}</InlineCode> for a deliberate no-op.
        </Prose>
        <CodeBlock code={ifStatementCode} language="csharp" filename="if_statement.shard" />
      </ScrollReveal>

      {/* unless --------------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>unless</H2>
        <Prose>
          <InlineCode>unless</InlineCode> is sugar for <InlineCode>if</InlineCode> with a negated condition:
          its body runs when the condition is <strong className="text-text-primary">false</strong>. It accepts
          the same shape as <InlineCode>if</InlineCode>, including an <InlineCode>else</InlineCode> — which,
          because the sense is inverted, runs when the condition is <em>true</em>.
        </Prose>
        <CodeBlock code={unlessCode} language="csharp" filename="unless.shard" />
        <Callout tone="blue" title="Reads like English">
          <InlineCode>unless</InlineCode> exists for guard clauses that read naturally:{' '}
          <InlineCode>unless (done) work();</InlineCode> instead of{' '}
          <InlineCode>if (!done) work();</InlineCode>. Reach for it when it makes the intent clearer.
        </Callout>
      </ScrollReveal>

      {/* if as expression ---------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>if as an Expression</H2>
        <Prose>
          Used in expression position, <InlineCode>if</InlineCode> yields a value:{' '}
          <InlineCode>if cond thenExpr else elseExpr</InlineCode>. Parentheses around the condition are
          optional — they are just grouping. This replaces the C-style ternary.
        </Prose>
        <CodeBlock code={ifExpressionCode} language="csharp" filename="if_expression.shard" />
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Form</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Meaning</th>
              </tr>
            </thead>
            <tbody>
              {conditionalForms.map(([form, meaning], i) => (
                <tr key={form} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{form}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Callout tone="amber" title="No ternary, and unless is statement-only">
          There is no C-style <InlineCode>cond ? a : b</InlineCode> — use an <InlineCode>if</InlineCode>{' '}
          expression. And only <InlineCode>if</InlineCode> works as an expression;{' '}
          <InlineCode>unless</InlineCode> is a statement form only.
        </Callout>
      </ScrollReveal>
    </div>
  )
}

function LoopsContent() {
  const loopForms: [string, string][] = [
    ['while (cond) { }', 'Loop while cond is true.'],
    ['until (cond) { }', 'Loop while cond is false (inverse while).'],
    ['for (init; cond; step) { }', 'C-style counted loop.'],
    ['foreach (x in coll) { }', 'Iterate each element of an IEnumerable<T>.'],
  ]

  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          ShardScript has four loops: <InlineCode>while</InlineCode> and its inverse{' '}
          <InlineCode>until</InlineCode>, a C-style <InlineCode>for</InlineCode>, and{' '}
          <InlineCode>foreach</InlineCode> (plus the equivalent <InlineCode>for ... in</InlineCode>) for
          iterating ranges and collections. Conditions sit in parentheses and bodies may be a brace block or
          a single statement.
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Form</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Runs while…</th>
              </tr>
            </thead>
            <tbody>
              {loopForms.map(([form, meaning], i) => (
                <tr key={form} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{form}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollReveal>

      {/* while / until -------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>while and until</H2>
        <Prose>
          <InlineCode>while</InlineCode> repeats its body as long as the condition is true.{' '}
          <InlineCode>until</InlineCode> is the inverse — it repeats while the condition is{' '}
          <strong className="text-text-primary">false</strong>, which reads naturally for poll-style loops.
        </Prose>
        <CodeBlock code={whileUntilCode} language="csharp" filename="while_until.shard" />
      </ScrollReveal>

      {/* C-style for ---------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>C-style for</H2>
        <Prose>
          The classic three-part <InlineCode>for (init; cond; step)</InlineCode> is available for counted
          loops. Because ranges only count upward, this is also the form to reach for when you need a custom
          step or a descending sequence.
        </Prose>
        <CodeBlock code={cStyleForCode} language="csharp" filename="c_style_for.shard" />
      </ScrollReveal>

      {/* for-in / foreach ----------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Iterating with for-in and foreach</H2>
        <Prose>
          <InlineCode>foreach</InlineCode> iterates each element of any <InlineCode>IEnumerable&lt;T&gt;</InlineCode>{' '}
          — a range, an array, a list, and so on. The equivalent <InlineCode>for x in e</InlineCode> form
          works the same way. Parentheses around the clause are optional. Ranges use{' '}
          <InlineCode>..</InlineCode> (half-open) and <InlineCode>..&</InlineCode> (inclusive).
        </Prose>
        <CodeBlock code={loopForeachCode} language="csharp" filename="loops_foreach.shard" />
      </ScrollReveal>

      {/* break / continue ----------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>break and continue</H2>
        <Prose>
          Inside any loop body, <InlineCode>break</InlineCode> exits the loop immediately and{' '}
          <InlineCode>continue</InlineCode> skips to the next iteration. Both are statement forms that apply
          to the enclosing loop.
        </Prose>
        <CodeBlock code={breakContinueCode} language="csharp" filename="break_continue.shard" />
        <Callout tone="amber" title="No do/while, and ranges count up">
          There is no <InlineCode>do {'{ }'} while ()</InlineCode> loop. Ranges (<InlineCode>..</InlineCode>{' '}
          / <InlineCode>..&</InlineCode>) only count upward and take no <InlineCode>step</InlineCode> clause —
          for a non-unit step or a countdown, use a C-style <InlineCode>for</InlineCode>.
        </Callout>
      </ScrollReveal>
    </div>
  )
}

function SwitchContent() {
  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          ShardScript&apos;s pattern-matching toolkit is built around the <InlineCode>switch</InlineCode>{' '}
          expression — which matches a value against a set of constant patterns — and the{' '}
          <InlineCode>is</InlineCode> / <InlineCode>as</InlineCode> operators for testing and casting types at
          runtime.
        </Prose>
      </ScrollReveal>

      {/* switch expression --------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>switch Expressions</H2>
        <Prose>
          A <InlineCode>switch</InlineCode> is an <strong className="text-text-primary">expression</strong>:
          it evaluates a scrutinee, then yields the value of the first arm whose pattern equals it. Each arm
          is <InlineCode>pattern =&gt; result</InlineCode>, arms are separated by commas, and{' '}
          <InlineCode>_</InlineCode> is the default (catch-all) arm.
        </Prose>
        <CodeBlock code={switchExprCode} language="csharp" filename="switch.shard" />
        <Callout tone="blue" title="How arms match">
          Patterns are compared to the scrutinee by equality, so they are constants — numbers, strings,
          enum members. There is no fall-through and no C-style <InlineCode>case</InlineCode>/{' '}
          <InlineCode>break</InlineCode>: one arm runs, and its value is the switch&apos;s result. A trailing
          comma after the last arm is allowed but not required.
        </Callout>
      </ScrollReveal>

      {/* is / as -------------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Type Tests: is and as</H2>
        <Prose>
          <InlineCode>is</InlineCode> checks whether a value is compatible with a type and yields a{' '}
          <InlineCode>bool</InlineCode>. <InlineCode>as</InlineCode> is a <strong className="text-text-primary">safe
          cast</strong>: it returns the value typed as the target type when compatible, or{' '}
          <InlineCode>null</InlineCode> otherwise. Together they handle the &quot;is this one of these?&quot;
          branching that a constant-only <InlineCode>switch</InlineCode> can&apos;t.
        </Prose>
        <CodeBlock code={isAsCode} language="csharp" filename="is_as.shard" />
        <Callout tone="amber" title="Notes">
          <InlineCode>as</InlineCode> never throws on a mismatch — it returns <InlineCode>null</InlineCode>,
          so check the result before using it. Both <InlineCode>is</InlineCode> and{' '}
          <InlineCode>as</InlineCode> work against classes, structs, and interfaces, and{' '}
          <InlineCode>as</InlineCode> can even be overloaded on your own types with{' '}
          <InlineCode>operator as</InlineCode>.
        </Callout>
      </ScrollReveal>
    </div>
  )
}

function ExceptionsContent() {
  const catchForms: [string, string][] = [
    ['catch (ex: RuntimeException)', 'Catches only RuntimeException instances.'],
    ['catch (ex: IThrowable)', 'Catches any type implementing IThrowable.'],
    ['catch { ex }', 'Catch-all — defaults to any type. The identifier is optional.'],
    ['throw;', 'Bare rethrow — valid only inside a catch block.'],
  ]

  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          ShardScript handles errors through structured exception handling built on the{' '}
          <InlineCode>IThrowable</InlineCode> interface. The runtime uses a frame-based interruption
          mechanism to unwind the call stack deterministically, executing pending <InlineCode>defer</InlineCode>{' '}
          blocks before transferring control to the nearest matching <InlineCode>catch</InlineCode> handler.
          There is no <InlineCode>finally</InlineCode> clause — use <InlineCode>defer</InlineCode> for cleanup.
        </Prose>
      </ScrollReveal>

      {/* IThrowable ----------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>IThrowable and RuntimeException</H2>
        <Prose>
          All exception types must implement <InlineCode>IThrowable</InlineCode>, a standard-library interface
          with two read-only properties:
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Property</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Type</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[#1E1E2E]">
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">message</td>
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">string</td>
                <td className="px-4 py-3 text-sm text-text-secondary">A human-readable description of the error.</td>
              </tr>
              <tr className="bg-[#252538]">
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">stack_trace</td>
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">string</td>
                <td className="px-4 py-3 text-sm text-text-secondary">A snapshot of the call stack captured at the throw point.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Prose>
          The built-in <InlineCode>RuntimeException</InlineCode> class implements{' '}
          <InlineCode>IThrowable</InlineCode> and covers most error scenarios. Its constructor
          captures the call stack and stores it in <InlineCode>stack_trace</InlineCode> automatically.
        </Prose>
      </ScrollReveal>

      {/* try / catch ---------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>try / catch</H2>
        <Prose>
          A <InlineCode>try</InlineCode> block defines a protected region. One or more{' '}
          <InlineCode>catch</InlineCode> clauses follow, evaluated in declaration order. The catch
          variable is a local scoped to the handler body; its type defaults to{' '}
          <InlineCode>any</InlineCode> when omitted.
        </Prose>
        <CodeBlock code={tryCatchCode} language="csharp" filename="try_catch.shard" />
        <Callout tone="amber" title="No finally">
          ShardScript does not have a <InlineCode>finally</InlineCode> clause. Use{' '}
          <InlineCode>defer</InlineCode> (see §3.3 Defer Statements) for deterministic cleanup.
          The <InlineCode>defer</InlineCode> mechanism integrates directly with exception dispatch
          — deferred expressions are drained before a catch handler runs or before the exception
          propagates to the caller.
        </Callout>
      </ScrollReveal>

      {/* Catch variants ------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Catch Variants</H2>
        <Prose>
          Catch clauses support typed filtering, interface-based matching, and catch-all forms:
        </Prose>
        <CodeBlock code={catchVariantsCode} language="csharp" filename="catch_variants.shard" />
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Form</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Behavior</th>
              </tr>
            </thead>
            <tbody>
              {catchForms.map(([form, meaning], i) => (
                <tr key={form} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{form}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Callout tone="blue" title="Type filtering at runtime">
          At compile time, each catch type (except <InlineCode>any</InlineCode>) is validated to implement{' '}
          <InlineCode>IThrowable</InlineCode>. At runtime, the VM dispatches by testing the exception
          object with <InlineCode>is</InlineCode>-compatibility against each catch type in declaration order.
          If no typed clause matches, a fallback re-throw is emitted after the last handler.
        </Callout>
      </ScrollReveal>

      {/* throw / rethrow ------------------------------------------------ */}
      <ScrollReveal delay={0.05}>
        <H2>throw and Rethrow</H2>
        <Prose>
          The <InlineCode>throw</InlineCode> statement raises an exception and immediately interrupts
          the current method. The compiler emits the <InlineCode>THROW</InlineCode> opcode, which pops the
          exception object from the evaluation stack and sets the frame's interruption reason to{' '}
          <InlineCode>ExceptionRaised</InlineCode>. Inside a <InlineCode>catch</InlineCode> block, a bare{' '}
          <InlineCode>throw;</InlineCode> re-throws the currently handled exception via the{' '}
          <InlineCode>RETHROW</InlineCode> opcode. Rethrowing outside a catch block is a runtime error.
        </Prose>
        <CodeBlock code={rethrowCode} language="csharp" filename="rethrow.shard" />
        <Callout tone="amber" title="Rethrow restrictions">
          A bare <InlineCode>throw;</InlineCode> reads the frame's{' '}
          <InlineCode>CurrentException</InlineCode> and re-raises it. It is only valid inside a{' '}
          <InlineCode>catch</InlineCode> handler — attempting it elsewhere raises a runtime error.
        </Callout>
      </ScrollReveal>

      {/* Call Stack Unwinding ------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Call Stack Unwinding</H2>
        <Prose>
          When an exception is raised, the VM's main execution loop detects the interruption at the
          next instruction boundary and begins unwinding. The process for each frame:
        </Prose>
        <Bullet><strong className="text-text-primary">Preserve locals.</strong> The evaluation stack is drained down to the fixed local-variable
          slots. Temporary values above this boundary are destroyed; locals remain accessible to catch handlers
          and defer blocks.</Bullet>
        <Bullet><strong className="text-text-primary">Walk exception handlers (LIFO).</strong> Each{' '}
          <InlineCode>ENTER_TRY</InlineCode> opcode pushed a handler record onto the frame's handler stack.
          Handlers are popped in reverse order — innermost try block first.</Bullet>
        <Bullet><strong className="text-text-primary">Drain defers.</strong> For each handler, pending{' '}
          <InlineCode>defer</InlineCode> expressions registered after that handler was installed are executed.
          This guarantees resources acquired inside the try block are released before the catch runs.</Bullet>
        <Bullet><strong className="text-text-primary">Dispatch to catch.</strong> When a matching handler
          is found, execution jumps to its bytecode offset. The exception is pushed onto the evaluation stack
          and the interruption is cleared.</Bullet>
        <Bullet><strong className="text-text-primary">Propagate upward.</strong> If no handler remains, all
          defers drain, the interruption is restored to <InlineCode>ExceptionRaised</InlineCode>, and control
          returns to the calling frame — where the process repeats.</Bullet>
        <Prose>
          If the exception reaches the entry-point frame uncaught, the VM captures it as{' '}
          <InlineCode>UnhandledException</InlineCode> along with its <InlineCode>message</InlineCode> and{' '}
          <InlineCode>stack_trace</InlineCode>. The host is responsible for inspecting this state after{' '}
          <InlineCode>Execute</InlineCode> returns.
        </Prose>
        <CodeBlock code={unwindCode} language="csharp" filename="unwind.shard" />
        <Callout tone="blue" title="Defer order during unwind">
          In the example above, the exception originates in <InlineCode>C</InlineCode>, propagates through{' '}
          <InlineCode>B</InlineCode> (which drains its <InlineCode>defer</InlineCode>), then through{' '}
          <InlineCode>A</InlineCode> (which drains its <InlineCode>defer</InlineCode>), and is finally caught
          by <InlineCode>Main</InlineCode>. Defers execute innermost-first during unwinding.
        </Callout>
      </ScrollReveal>

      {/* Async exceptions ----------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Async Exception Propagation</H2>
        <Prose>
          Exceptions thrown inside <InlineCode>async</InlineCode> functions behave identically to synchronous
          ones. If a <InlineCode>Task</InlineCode> or <InlineCode>ValueTask</InlineCode> faults, awaiting it
          re-throws the stored exception in the caller's context. A <InlineCode>try</InlineCode>/{' '}
          <InlineCode>catch</InlineCode> inside an async method works without any special syntax:
        </Prose>
        <CodeBlock code={asyncExceptionCode} language="csharp" filename="async_exception.shard" />
        <Callout tone="amber" title="Native interop exceptions">
          When a C++ exception (<InlineCode>std::exception</InlineCode>) escapes from a native external
          method, the VM wraps it in a <InlineCode>RuntimeException</InlineCode> instance. The C++{' '}
          <InlineCode>what()</InlineCode> message becomes the <InlineCode>message</InlineCode> property,
          and a full ShardScript stack trace is captured automatically. This wrapped exception then
          participates in normal ShardScript unwinding.
        </Callout>
      </ScrollReveal>

      {/* Opcode reference ----------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Exception Opcodes</H2>
        <Prose>
          The following bytecode operations implement the exception machinery at the VM level:
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Opcode</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['THROW', 'Pops exception from stack; sets ExceptionRaised interruption.'],
                ['RETHROW', 'Re-raises CurrentException; valid only inside a catch handler.'],
                ['ENTER_TRY <offset>', 'Pushes a handler record with catch dispatch offset and current defer baseline.'],
                ['LEAVE_TRY', 'Pops the innermost handler (normal exit from try block).'],
                ['END_CATCH', 'Marks end of a catch handler; releases CurrentException.'],
                ['LOAD_CURRENT_EXCEPTION', "Pushes the frame's current exception onto the eval stack."],
                ['STORE_CURRENT_EXCEPTION', 'Restores current exception after resuming from await inside catch.'],
              ].map(([opcode, desc], i) => (
                <tr key={opcode} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{opcode}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollReveal>
    </div>
  )
}


function DeferContent() {
  const deferMechanics: [string, string][] = [
    ['DEFER <target>', 'Pushes the bytecode offset of the deferred expression body onto DeferStack. Control never reaches it — a preceding JUMP skips over.'],
    ['DEFER_DRAIN <N>', 'Pops up to N targets from DeferStack (LIFO) and executes each via a sub-interpreter loop until DEFER_BREAK. Emitted at scope exit, return, break, and continue.'],
    ['DEFER_BREAK', 'Signals the end of one deferred expression. Only valid inside an active DEFER_DRAIN; the drain loop detects it and advances to the next defer.'],
  ]

  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          ShardScript uses <InlineCode>defer</InlineCode> for deterministic resource cleanup.
          A deferred statement is <strong className="text-text-primary">not executed where it is written</strong> — instead,
          its bytecode address is pushed onto a per-frame <strong className="text-text-primary">DeferStack</strong>, and it
          runs later when the enclosing scope is exited, whether that exit is normal (end of block), early
          (return, break, continue), or exceptional (exception unwinding). The mechanism guarantees 100%
          execution without any per-defer heap allocation or runtime bookkeeping overhead.
        </Prose>
      </ScrollReveal>

      {/* Basic defer ------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Basic Usage</H2>
        <Prose>
          A <InlineCode>defer</InlineCode> statement registers an expression or a resource-disposal
          statement that runs when the current scope ends. Multiple defers in the same scope execute
          in <strong className="text-text-primary">LIFO order</strong> (last registered, first executed —
          like a stack). Resources declared with <InlineCode>defer name: Type = value;</InlineCode> are
          automatically disposed via <InlineCode>IDisposable.Dispose()</InlineCode> at scope exit.
        </Prose>
        <CodeBlock code={deferBasicCode} language="csharp" filename="defer_basic.shard" />
        <Callout tone="blue" title="Two forms of defer">
          <strong className="text-text-primary">Statement defer:</strong>{' '}
          <InlineCode>defer println("done");</InlineCode> — defers a single expression or statement.
          <br />
          <strong className="text-text-primary">Resource defer:</strong>{' '}
          <InlineCode>defer r: Resource = new Resource();</InlineCode> — declares a variable and
          automatically calls <InlineCode>r.Dispose()</InlineCode> at scope exit. The variable is
          still usable within the scope like any other local.
        </Callout>
      </ScrollReveal>

      {/* LIFO and nesting --------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Execution Order and Nesting</H2>
        <Prose>
          Defers execute in strict <strong className="text-text-primary">LIFO</strong> order. When a
          block ends, all defers registered inside that block are drained before the outer scope's defers.
          This guarantees that inner resources are released before outer ones:
        </Prose>
        <CodeBlock code={deferOrderCode} language="csharp" filename="defer_order.shard" />
        <Callout tone="amber" title="Scope boundaries">
          Each brace block <InlineCode>{'{ ... }'}</InlineCode> forms a defer scope. When control leaves
          a block — through normal flow, <InlineCode>return</InlineCode>, <InlineCode>break</InlineCode>,
          or <InlineCode>continue</InlineCode> — only the defers in that block and any inner blocks are
          drained. Defers in outer blocks remain pending until their own scope exits.
        </Callout>
      </ScrollReveal>

      {/* Defer in loops ----------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Defer in Loops</H2>
        <Prose>
          A <InlineCode>defer</InlineCode> inside a loop body drains at the <em>end of each iteration</em>,
          not when the loop finishes. This makes it ideal for per-iteration cleanup:
        </Prose>
        <CodeBlock code={deferLoopCode} language="csharp" filename="defer_loop.shard" />
        <Callout tone="amber" title="break and continue">
          <InlineCode>break</InlineCode> and <InlineCode>continue</InlineCode> drain defers from the
          current iteration (and nested blocks) up to the loop scope before jumping. This ensures cleanup
          even on early exit from an iteration.
        </Callout>
      </ScrollReveal>

      {/* Defer and return --------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Defer and return</H2>
        <Prose>
          A <InlineCode>return</InlineCode> statement drains <em>all</em> pending defers in all scopes
          before the frame actually returns. This holds for every return point in a function — defers
          execute whether a function returns early or falls through to the end:
        </Prose>
        <CodeBlock code={deferReturnCode} language="csharp" filename="defer_return.shard" />
        <Callout tone="blue" title="No cleanup duplication">
          The compiler emits one <InlineCode>DEFER_DRAIN</InlineCode> per scope, not per return
          statement. The drain target for each scope is simply the number of defers registered at that
          point. There is no code duplication, and no runtime branch to decide which defers to run.
        </Callout>
      </ScrollReveal>

      {/* Defer and exceptions ----------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Defer During Exception Unwinding</H2>
        <Prose>
          This is the core guarantee: deferred statements execute <strong className="text-text-primary">even when
          an exception is thrown</strong>. The VM's exception dispatch machinery integrates directly with the
          DeferStack.
        </Prose>
        <CodeBlock code={deferWithExceptionCode} language="csharp" filename="defer_exception.shard" />
        <Prose>
          Here is what happens step by step:
        </Prose>
        <Bullet>
          <strong className="text-text-primary">Each try scope records a defer baseline.</strong> When{' '}
          <InlineCode>ENTER_TRY</InlineCode> executes, it pushes an exception handler record that
          captures the current <InlineCode>DeferStack.size()</InlineCode> — the baseline.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">Defers registered inside try are above the baseline.</strong>{' '}
          Any <InlineCode>DEFER</InlineCode> executed after <InlineCode>ENTER_TRY</InlineCode> pushes
          onto the stack, above the recorded baseline.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">Exception dispatch drains to baseline.</strong> When the VM
          unwinds into a catch handler, it calls <InlineCode>DrainDefersTo(baseline)</InlineCode>, which
          pops and executes all defers above the baseline — exactly those registered since the try block
          was entered.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">Unhandled: everything drains.</strong> If no handler
          matches, <InlineCode>DrainDefersTo(0)</InlineCode> drains every pending defer in the frame
          before the exception propagates to the caller.
        </Bullet>
        <Prose>
          This design means the compiler never emits <InlineCode>DEFER_DRAIN</InlineCode> alongside{' '}
          <InlineCode>THROW</InlineCode>. The VM's unwinding path is the <em>only</em> code that drains
          defers during exception propagation — a single implementation that handles every throw site
          uniformly.
        </Prose>
        <Callout tone="amber" title="Defer in a throw expression">
          If a deferred expression itself throws, the drain loop catches the interruption, stops
          draining, and re-enters the exception handler dispatch. The remaining defers are preserved
          on the DeferStack and will be drained when the new exception is handled.
        </Callout>
      </ScrollReveal>

      {/* Defer in async functions ------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Defer in Async Functions</H2>
        <Prose>
          Defers work identically in async functions, but the implementation must account for the
          state machine: after an <InlineCode>await</InlineCode>, the frame is torn down and later
          resumed. The async emission pass re-emits all active <InlineCode>DEFER</InlineCode> instructions
          on every resume path so the DeferStack is rebuilt to the correct state before execution continues:
        </Prose>
        <CodeBlock code={deferAsyncCode} language="csharp" filename="defer_async.shard" />
        <Callout tone="blue" title="Resume path reconstruction">
          On resume, the compiler computes the set of active defers by walking the AST from the await
          expression upward through parent blocks (via <InlineCode>CollectDefersUpward</InlineCode>). It
          re-emits the <InlineCode>DEFER</InlineCode> instructions outermost-first so that nested scopes
          drain their defers before outer scopes — exactly matching the synchronous semantics.
        </Callout>
      </ScrollReveal>

      {/* Zero-overhead design ----------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Zero-Overhead Design</H2>
        <Prose>
          The defer mechanism adds no runtime overhead in the common (non-deferred-execution) path:
        </Prose>
        <Bullet>
          <strong className="text-text-primary">Registration is a single pointer push.</strong>{' '}
          <InlineCode>DEFER</InlineCode> reads a bytecode offset and appends it to a{' '}
          <InlineCode>std::vector&lt;std::size_t&gt;</InlineCode> on the call frame. No heap allocation,
          no reference counting, no GC interaction.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">The expression body is never reached in normal flow.</strong>{' '}
          A <InlineCode>JUMP</InlineCode> instruction immediately after <InlineCode>DEFER</InlineCode>{' '}
          skips over the deferred expression. The body is dead code during normal execution — the CPU
          never fetches or decodes it until a drain occurs.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">Drain uses a sub-interpreter loop.</strong>{' '}
          <InlineCode>ExecuteDeferExpression</InlineCode> saves the decoder position, jumps to the
          deferred expression, processes opcodes until <InlineCode>DEFER_BREAK</InlineCode>, then
          restores the position. This reuses the existing bytecode decoder and opcode dispatch — no
          separate interpreter or JIT compilation needed.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">Exception path has no redundant work.</strong>{' '}
          Exceptions never emit <InlineCode>DEFER_DRAIN</InlineCode>. The VM's unwinding path is the
          sole code that drains defers during exceptional exit. There is no try/catch wrapper, no
          finally-block translation, and no duplicated cleanup logic.
        </Bullet>
        <Prose>
          A function with zero <InlineCode>defer</InlineCode> statements pays absolutely nothing for
          the mechanism. A function with defers pays one <InlineCode>std::vector.push_back</InlineCode>{' '}
          per defer at declaration time, plus the cost of the deferred expression itself — once, at scope
          exit. There is no indirection table, no guard-page dance, and no SEH or C++ exception
          overhead involved.
        </Prose>
      </ScrollReveal>

      {/* Opcode reference --------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Defer Opcodes</H2>
        <Prose>
          Three bytecode operations implement the defer machinery. All operate on the frame's{' '}
          <InlineCode>DeferStack</InlineCode>, a simple <InlineCode>std::vector&lt;std::size_t&gt;</InlineCode>:
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Opcode</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Stack Effect</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              {deferMechanics.map(([opcode, desc], i) => (
                <tr key={opcode} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{opcode}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">
                    {opcode.startsWith('DEFER <') ? 'DeferStack +1' :
                     opcode.startsWith('DEFER_DRAIN') ? 'DeferStack -N' : '—'}
                  </td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollReveal>

      {/* Frame structure reference ------------------------------------ */}
      <ScrollReveal delay={0.05}>
        <H2>Frame Integration</H2>
        <Prose>
          Each <InlineCode>CallStackFrame</InlineCode> carries two fields dedicated to defer execution:
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Field</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Type</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Purpose</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['DeferStack', 'vector<size_t>', 'Stores bytecode offsets of registered deferred expressions. Pushed by DEFER, consumed by DEFER_DRAIN and DrainDefersTo.'],
                ['DeferDrainDepth', 'size_t', 'Nesting counter incremented at each DEFER_DRAIN entry and decremented on exit. DEFER_BREAK verifies it is non-zero to ensure it only fires inside a drain loop.'],
              ].map(([field, type, purpose], i) => (
                <tr key={field} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{field}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{type}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Prose>
          The <InlineCode>ExceptionHandlerFrame</InlineCode> record pushed by <InlineCode>ENTER_TRY</InlineCode>{' '}
          also stores a <InlineCode>DeferStackBase</InlineCode> — a snapshot of <InlineCode>DeferStack.size()</InlineCode>{' '}
          at the moment the try block was entered. This is the baseline used by{' '}
          <InlineCode>DrainDefersTo</InlineCode> during exception dispatch.
        </Prose>
      </ScrollReveal>
    </div>
  )
}


function ClassesFieldsPropertiesContent() {
  const modifierTable: [string, string, string][] = [
    ['public', 'Member is accessible from anywhere.', 'Fields, properties, methods, constructors, nested types'],
    ['private', 'Member is accessible only within its declaring type (default).', 'Fields, properties, methods, constructors, nested types'],
    ['static', 'Member belongs to the type itself, not instances.', 'Fields, properties, methods'],
  ]

  const opcodeTable: [string, string][] = [
    ['NEWOBJECT', 'Allocates an instance via GC, invokes the constructor. Pushes the new object onto the eval stack.'],
    ['LOADFIELD / STOREFIELD', 'Read/write an instance field by slot index. Fast indexed access — no hash lookup.'],
    ['LOADSTATICFIELD / STORESTATICFIELD', 'Read/write a static field via the GC static store.'],
    ['CALLMETHODSYMBOL', 'Invokes a method; if instance, slot 0 is the this reference. Property getters/setters are methods.'],
  ]

  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          Classes in ShardScript are reference types that package <strong className="text-text-primary">fields</strong>{' '}
          (data), <strong className="text-text-primary">properties</strong> (controlled access to data), and{' '}
          <strong className="text-text-primary">methods</strong> (behaviour). Every class is allocated on the
          garbage-collected heap and accessed through references. This section covers class declarations,
          constructors (<InlineCode>init</InlineCode>), fields, properties (including auto-properties), and
          the access modifier system (<InlineCode>public</InlineCode>,{' '}
          <InlineCode>private</InlineCode>, <InlineCode>static</InlineCode>).
        </Prose>
      </ScrollReveal>

      {/* Class declaration --------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Class Declaration and Constructors</H2>
        <Prose>
          A class is declared with the <InlineCode>class</InlineCode> keyword. The constructor is named{' '}
          <InlineCode>init</InlineCode> and can accept parameters. Within instance members,{' '}
          <InlineCode>this</InlineCode> refers to the current instance — it is always the first argument
          (slot 0) on the evaluation stack for instance methods. Instantiation uses the{' '}
          <InlineCode>new</InlineCode> operator, which causes the VM to emit{' '}
          <InlineCode>NEWOBJECT</InlineCode>, allocate the object via the garbage collector, zero-initialize
          all field slots from the type shape, and invoke the matching constructor.
        </Prose>
        <CodeBlock code={classBasicCode} language="csharp" filename="class_basic.shard" />
        <Callout tone="blue" title="init is the constructor">
          ShardScript uses <InlineCode>init</InlineCode> instead of a class-named constructor. Multiple{' '}
          <InlineCode>init</InlineCode> overloads are supported — overload resolution matches argument types
          at compile time. If no <InlineCode>init</InlineCode> is declared, a parameterless default
          constructor is implicitly available.
        </Callout>
      </ScrollReveal>

      {/* Access modifiers ---------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Access Modifiers</H2>
        <Prose>
          ShardScript has a minimal modifier system designed for clarity. The default accessibility is{' '}
          <InlineCode>private</InlineCode>. Modifiers are placed before the member declaration:
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Modifier</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Meaning</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Applies to</th>
              </tr>
            </thead>
            <tbody>
              {modifierTable.map(([mod, meaning, applies], i) => (
                <tr key={mod} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{mod}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{meaning}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{applies}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CodeBlock code={accessModifierCode} language="csharp" filename="access_modifiers.shard" />
        <Callout tone="amber" title="No protected or internal">
          ShardScript currently supports only <InlineCode>public</InlineCode> and{' '}
          <InlineCode>private</InlineCode>. There is no <InlineCode>protected</InlineCode>,{' '}
          <InlineCode>internal</InlineCode>, or <InlineCode>file</InlineCode> visibility — the model
          intentionally keeps the access control surface small.
        </Callout>
      </ScrollReveal>

      {/* Static members ------------------------------------------------ */}
      <ScrollReveal delay={0.05}>
        <H2>Static Members</H2>
        <Prose>
          The <InlineCode>static</InlineCode> modifier marks a field, property, or method as belonging to
          the <em>type itself</em> rather than to any one instance. Static fields are stored in a global
          static store managed by the garbage collector and accessed via{' '}
          <InlineCode>LOADSTATICFIELD</InlineCode> / <InlineCode>STORESTATICFIELD</InlineCode> opcodes.
          Static methods do not receive a <InlineCode>this</InlineCode> argument — slot 0 is the first
          declared parameter.
        </Prose>
        <CodeBlock code={staticMembersCode} language="csharp" filename="static_members.shard" />
        <Callout tone="blue" title="Static access syntax">
          Static members are accessed through the type name: <InlineCode>ClassName.Member</InlineCode>.
          Inside instance methods, you can also access static members via{' '}
          <InlineCode>this</InlineCode>, but the canonical form uses the class name.
        </Callout>
      </ScrollReveal>

      {/* Properties ---------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Properties</H2>
        <Prose>
          Properties provide controlled access to data through <InlineCode>get</InlineCode> and{' '}
          <InlineCode>set</InlineCode> accessors. At the symbol level, a{' '}
          <InlineCode>PropertySymbol</InlineCode> holds a reference to an optional backing{' '}
          <InlineCode>FieldSymbol</InlineCode> and up to two <InlineCode>AccessorSymbol</InlineCode>{' '}
          instances (one for get, one for set). Accessors are compiled as methods — a property read emits a
          call to the getter, a property write emits a call to the setter with the assigned value passed as
          an implicit parameter named <InlineCode>value</InlineCode>.
        </Prose>
        <CodeBlock code={propertyCode} language="csharp" filename="properties.shard" />
        <Bullet>
          <strong className="text-text-primary">Getter:</strong> must return the property type. Inside the
          body, use <InlineCode>return</InlineCode>. For simple auto-properties, the compiler generates{' '}
          <InlineCode>return this._field;</InlineCode> automatically.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">Setter:</strong> the incoming value is available via the{' '}
          <InlineCode>value</InlineCode> keyword. The compiler generates storage to the backing field. If
          omitted, the property is read-only.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">Backing field:</strong> when both <InlineCode>get</InlineCode>{' '}
          and <InlineCode>set</InlineCode> have simple bodies that read/write a compiler-generated field, the
          compiler allocates a <InlineCode>FieldSymbol</InlineCode> with an auto-assigned{' '}
          <InlineCode>SlotIndex</InlineCode>. Custom get/set bodies that do not reference a single backing
          field do not generate one — the property is computed.
        </Bullet>
      </ScrollReveal>

      {/* Auto-properties ----------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Auto-Properties</H2>
        <Prose>
          When a property declaration uses the shorthand <InlineCode>{'{ get; set; }'}</InlineCode> syntax
          without explicit bodies, the compiler automatically creates a private backing field and simple
          accessor methods that store to and load from it. This is the most common property form:
        </Prose>
        <CodeBlock code={autoPropertyCode} language="csharp" filename="auto_properties.shard" />
        <Callout tone="blue" title="Read-only auto-properties">
          An auto-property with only a getter (<InlineCode>{'{ get; }'}</InlineCode>) can still be set in
          the constructor. The backing field is writable within <InlineCode>init</InlineCode> because the
          compiler emits a direct <InlineCode>STOREFIELD</InlineCode> for the backing field slot rather than
          going through the (non-existent) setter.
        </Callout>
      </ScrollReveal>

      {/* Internal mechanics -------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Internal Mechanics</H2>
        <Prose>
          Understanding the underlying representation helps when debugging or interoperating with native code:
        </Prose>
        <Bullet>
          <strong className="text-text-primary">Field layout.</strong> Each field is assigned a{' '}
          <InlineCode>SlotIndex</InlineCode> (a <InlineCode>uint32_t</InlineCode>) and a{' '}
          <InlineCode>MemoryBytesOffset</InlineCode> computed during type layout. The slot index is used by{' '}
          <InlineCode>LOADFIELD</InlineCode> / <InlineCode>STOREFIELD</InlineCode> for O(1) field access
          via the instance's internal slot array. The byte offset is used by value types (structs) for
          inline memory addressing.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">Instance methods and this.</strong> When the VM invokes an
          instance method, the receiver object is passed as argument 0 on the new frame's evaluation stack.
          The method body accesses it by loading variable slot 0. This is the{' '}
          <InlineCode>this</InlineCode> reference. Static methods skip this — their first parameter
          occupies slot 0.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">Constructor execution.</strong>{' '}
          <InlineCode>NEWOBJECT</InlineCode> first calls <InlineCode>AllocateInstance</InlineCode> to obtain
          a zeroed object from the GC (with all field slots initialized to <InlineCode>null</InlineCode>).
          It then pushes arguments and invokes the constructor via the normal method dispatch path. The
          constructor body runs <InlineCode>STOREFIELD</InlineCode> instructions to populate the slots.
          After the constructor returns, the fully-initialized object sits on the calling frame's eval stack.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">Property accessors as methods.</strong> Property getters and
          setters are <InlineCode>AccessorSymbol</InlineCode> instances, which extend{' '}
          <InlineCode>MethodSymbol</InlineCode>. A property read like <InlineCode>obj.Width</InlineCode>{' '}
          compiles to <InlineCode>CALLMETHODSYMBOL(get_Width)</InlineCode>. A write like{' '}
          <InlineCode>obj.Width = 10</InlineCode> compiles to push <InlineCode>obj</InlineCode>, push{' '}
          <InlineCode>10</InlineCode>, then <InlineCode>CALLMETHODSYMBOL(set_Width)</InlineCode>. The
          property syntax is pure sugar — the runtime sees ordinary method calls.
        </Bullet>
      </ScrollReveal>

      {/* Opcode reference --------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Object-Model Opcodes</H2>
        <Prose>
          The following bytecode operations implement classes at the VM level:
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Opcode</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Effect</th>
              </tr>
            </thead>
            <tbody>
              {opcodeTable.map(([op, desc], i) => (
                <tr key={op} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{op}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollReveal>
    </div>
  )
}


function InterfacesContent() {
  const builtinInterfaceRows: [string, string][] = [
    ['IThrowable', 'message and stack_trace properties; base of all exception types.'],
    ['IDisposable', 'Dispose() method; called by defer for resource cleanup.'],
    ['IPrintable', 'ToString() method; used by println for user-defined type formatting.'],
    ['IEnumerable<T>', 'GetEnumerator() method; enables foreach iteration.'],
    ['IEnumerator<T>', 'MoveNext() and Current; drives manual enumeration.'],
  ]

  const dispatchRows: [string, string][] = [
    ['Compile time', 'The compiler checks that the interface method name, parameter types, and return type match (with return-type covariance). If no match is found, a diagnostic error is emitted.'],
    ['Runtime', 'CALLINTERFACE reads the concrete type from the top of the eval stack, looks up the interface method in InterfaceMethodMap (a hash map), and invokes the resolved implementation. If no implementation is found, a runtime error is thrown.'],
  ]

  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          Interfaces in ShardScript define <strong className="text-text-primary">contracts</strong>{' '}
          that classes and structs can implement. An interface declares method signatures, property
          signatures, and indexer signatures — all members are implicitly abstract (marked{' '}
          <InlineCode>IsAbstract = true</InlineCode>). A class that claims to implement an interface
          must supply concrete definitions for every member, validated at compile time by{' '}
          <InlineCode>SemanticValidator::ValidateInterfaceImplementation</InlineCode>. Interface
          method calls use <strong className="text-text-primary">virtual dispatch</strong> via the{' '}
          <InlineCode>CALLINTERFACE</InlineCode> opcode — the concrete implementation is resolved at
          runtime from the receiver's type.
        </Prose>
      </ScrollReveal>

      {/* Basic interface ---------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Declaring and Implementing Interfaces</H2>
        <Prose>
          An interface is declared with the <InlineCode>interface</InlineCode> keyword. Classes use
          the colon syntax (<InlineCode>:</InlineCode>) to list implemented interfaces. At the symbol
          level, <InlineCode>InterfaceSymbol</InlineCode> extends <InlineCode>TypeSymbol</InlineCode> —
          it carries the same <InlineCode>Methods</InlineCode>, <InlineCode>Properties</InlineCode>,
          and <InlineCode>Indexators</InlineCode> vectors as a class, but its members are marked abstract
          and carry no executable bytecode.
        </Prose>
        <CodeBlock code={interfaceBasicCode} language="csharp" filename="interface_basic.shard" />
        <Callout tone="blue" title="Interface methods are always public">
          Interface members have no access modifiers — they define the public surface of the contract.
          The implementing class must declare matching members as <InlineCode>public</InlineCode>.
        </Callout>
      </ScrollReveal>

      {/* Polymorphic dispatch ----------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Polymorphic Dispatch</H2>
        <Prose>
          Variables typed as an interface can hold any instance of a class that implements it. When a
          method is called through the interface, the compiler emits <InlineCode>CALLINTERFACE</InlineCode>{' '}
          instead of the usual <InlineCode>CALLMETHODSYMBOL</InlineCode>. The detection is simple: if the
          callee's parent symbol is an <InlineCode>InterfaceDeclaration</InlineCode>, the call is virtual.
        </Prose>
        <CodeBlock code={interfaceDispatchCode} language="csharp" filename="interface_dispatch.shard" />
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Phase</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">What happens</th>
              </tr>
            </thead>
            <tbody>
              {dispatchRows.map(([phase, desc], i) => (
                <tr key={phase} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{phase}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollReveal>

      {/* Multiple interfaces ------------------------------------------ */}
      <ScrollReveal delay={0.05}>
        <H2>Multiple Interface Implementation</H2>
        <Prose>
          A class can implement any number of interfaces. Each interface adds its members to the
          validation set — the semantic validator iterates all declared interfaces, collecting them
          transitively via <InlineCode>CollectAllInterfaces</InlineCode>, and checks that every
          required method and property has a matching implementation:
        </Prose>
        <CodeBlock code={interfaceMultiCode} language="csharp" filename="interface_multi.shard" />
        <Callout tone="amber" title="Diamond problem">
          If two interfaces declare a method with the same signature, a single class method can
          satisfy both — the <InlineCode>InterfaceMethodMap</InlineCode> simply maps both interface
          methods to the same concrete implementation. There is no ambiguity at the call site since
          the VM always resolves through the concrete type.
        </Callout>
      </ScrollReveal>

      {/* Interface inheritance --------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Interface Inheritance</H2>
        <Prose>
          Interfaces can extend other interfaces using the same colon syntax. The derived interface
          inherits all member declarations from its bases. At the symbol level, this is exactly the
          same mechanism as class interface implementation — the interface's{' '}
          <InlineCode>Interfaces</InlineCode> vector contains references to base interfaces, and{' '}
          <InlineCode>FindInterfaceImplementation</InlineCode> walks this chain recursively.
        </Prose>
        <CodeBlock code={interfaceExtendCode} language="csharp" filename="interface_extend.shard" />
        <Callout tone="blue" title="No diamond ambiguity for interfaces">
          Interface inheritance forms a DAG — a derived interface can list multiple bases, and
          the transitive collection (<InlineCode>GetAllInterfaces</InlineCode>) deduplicates via
          a visited set. Each unique interface method is validated exactly once against the
          implementing class.
        </Callout>
      </ScrollReveal>

      {/* IDisposable -------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>IDisposable and Deterministic Cleanup</H2>
        <Prose>
          <InlineCode>IDisposable</InlineCode> is the standard-library interface for resource
          cleanup. It declares a single method, <InlineCode>Dispose()</InlineCode>. The{' '}
          <InlineCode>defer</InlineCode> statement with a resource declaration{' '}
          (<InlineCode>defer r: Type = expr;</InlineCode>) detects that the variable's type
          implements <InlineCode>IDisposable</InlineCode> and automatically emits a call to{' '}
          <InlineCode>Dispose()</InlineCode> at scope exit.
        </Prose>
        <CodeBlock code={interfaceDisposableCode} language="csharp" filename="idisposable.shard" />
        <Bullet>
          <strong className="text-text-primary">Detection at compile time.</strong> When the parser
          encounters <InlineCode>defer r: FileHandle = ...</InlineCode>, it checks if the type
          is assignable to <InlineCode>IDisposable</InlineCode>. If so, it sets{' '}
          <InlineCode>IsResourceDefer = true</InlineCode> on the <InlineCode>DeferStatementSyntax</InlineCode>{' '}
          node and stores a reference to the <InlineCode>Dispose</InlineCode> method.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">Execution.</strong> During DEFER drain, if the defer
          is a resource defer, the VM loads the variable by its slot index and calls{' '}
          <InlineCode>Dispose()</InlineCode> via standard method dispatch (which goes through{' '}
          <InlineCode>CALLINTERFACE</InlineCode> if Dispose is called through the interface).
        </Bullet>
      </ScrollReveal>

      {/* Built-in interfaces ------------------------------------------ */}
      <ScrollReveal delay={0.05}>
        <H2>Standard Library Interfaces</H2>
        <Prose>
          ShardScript ships with several built-in interfaces that form the backbone of the
          standard library:
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Interface</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Members</th>
              </tr>
            </thead>
            <tbody>
              {builtinInterfaceRows.map(([iface, members], i) => (
                <tr key={iface} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{iface}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{members}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Prose>
          These are created via the C++ <InlineCode>SymbolBuilder</InlineCode> API during static
          initialization in <InlineCode>ResolveInterfaces</InlineCode> and{' '}
          <InlineCode>ResolveGlobalComponents</InlineCode>. They reside in a process-wide global
          symbol table so their pointers remain valid across all compilation contexts.
        </Prose>
      </ScrollReveal>

      {/* Internal mechanics ------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Internal Mechanics</H2>
        <Bullet>
          <strong className="text-text-primary">InterfaceMethodMap.</strong> Each{' '}
          <InlineCode>TypeSymbol</InlineCode> carries an{' '}
          <InlineCode>unordered_map&lt;MethodSymbol*, MethodSymbol*&gt; InterfaceMethodMap</InlineCode>{' '}
          mapping each abstract interface method (or accessor) to its concrete implementation on
          the type. This map is populated by{' '}
          <InlineCode>ValidateInterfaceImplementationInternal</InlineCode> during semantic
          validation — it iterates every interface method, finds the matching class method by
          name + signature, and records the mapping.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">CALLINTERFACE resolution.</strong> At runtime,{' '}
          <InlineCode>CALLINTERFACE</InlineCode> peeks at the receiver (the top of the eval stack),
          reads its concrete <InlineCode>TypeSymbol*</InlineCode> via{' '}
          <InlineCode>getInfo()</InlineCode>, and calls{' '}
          <InlineCode>FindInterfaceImplementation(interfaceMethod)</InlineCode>. This first checks
          the <InlineCode>InterfaceMethodMap</InlineCode> hash map (O(1)) and then falls back to
          walking the type's <InlineCode>Interfaces</InlineCode> vector if the interface was
          inherited transitively. Once the concrete method is found, the VM invokes it via the
          standard <InlineCode>InvokeMethod</InlineCode> path.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">is/as checks.</strong> The <InlineCode>ISINSTANCE</InlineCode>{' '}
          opcode tests interface compatibility by calling{' '}
          <InlineCode>SemanticModel::IsAssignableTo(target, source)</InlineCode>. For interfaces,
          this walks the source type's interface list and their transitive bases. The{' '}
          <InlineCode>as</InlineCode> operator uses the same mechanism — a successful check
          returns the value typed as the interface; a failure returns <InlineCode>null</InlineCode>.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">Return-type covariance.</strong> The matching
          function <InlineCode>IsInterfaceImplementationMatching</InlineCode> allows the
          implementation to return a more derived type than the interface declares. For example,
          an interface method returning <InlineCode>IShape</InlineCode> can be implemented by a
          method returning <InlineCode>Circle</InlineCode>. This is checked via{' '}
          <InlineCode>IsAssignableTo(interfaceReturnType, implementationReturnType)</InlineCode>.
        </Bullet>
      </ScrollReveal>
    </div>
  )
}


function ExtensionMethodsContent() {
  const resolutionSteps: [string, string][] = [
    ['1. Type-scoped lookup', 'The binder searches the receiver type for a matching instance or static method. If found, it is used directly.'],
    ['2. Global static method lookup', 'Every top-level static method in the compilation is checked. The receiver type is prepended as the first argument for matching. If a match is found, the call is marked as an extension method invocation.'],
    ['3. Local-scope fallback', 'Methods declared in the current scope (closures, local functions) are also checked for extension compatibility. Delegate variables are checked last.'],
  ]

  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          Extension methods let you call a static function as if it were an instance method on its
          first parameter type. This is <strong className="text-text-primary">pure syntactic sugar</strong>{' '}
          — there is no runtime dispatch difference between a regular static call and an extension
          call. The receiver expression becomes the first argument on the evaluation stack, and the
          compiler emits the identical <InlineCode>CALLMETHODSYMBOL</InlineCode> opcode. The feature
          costs nothing at runtime and enables fluent <strong className="text-text-primary">method
          chaining</strong> on any type.
        </Prose>
      </ScrollReveal>

      {/* Basic usage -------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Basic Usage</H2>
        <Prose>
          Any top-level <InlineCode>static</InlineCode> function can be used as an extension method
          on its first parameter type. The receiver is written before the dot; additional arguments
          follow in parentheses:
        </Prose>
        <CodeBlock code={extMethodBasicCode} language="csharp" filename="ext_basic.shard" />
        <Callout tone="blue" title="Any static function qualifies">
          There is no special <InlineCode>this</InlineCode> keyword, no attribute, and no module
          import needed. Every <InlineCode>static</InlineCode> function whose first parameter type
          is compatible with the receiver is automatically a candidate. This is checked at the
          semantic binding level by <InlineCode>IsExtensionMethodCandidate</InlineCode>.
        </Callout>
      </ScrollReveal>

      {/* Method chaining ---------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Method Chaining</H2>
        <Prose>
          Because extension methods evaluate left-to-right on the same receiver expression, they
          compose naturally into pipelines. Each call returns a value that becomes the receiver for
          the next dot:
        </Prose>
        <CodeBlock code={extMethodChainingCode} language="csharp" filename="ext_chaining.shard" />
        <Prose>
          The chained call <InlineCode>data.Select(...).Where(...)</InlineCode> breaks down as:
        </Prose>
        <Bullet>
          <strong className="text-text-primary">Evaluate</strong>{' '}
          <InlineCode>data</InlineCode> — pushes the array <InlineCode>[1..10]</InlineCode>.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">Push lambda 1</strong> — the{' '}
          <InlineCode>lambda (a: int) -&gt; int</InlineCode> is pushed as the second argument.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">Call Select</strong> — pops receiver + lambda, invokes{' '}
          <InlineCode>Select(source, action)</InlineCode>, pushes the resulting{' '}
          <InlineCode>List&lt;int&gt;</InlineCode>.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">Push lambda 2</strong> — the filter predicate.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">Call Where</strong> — pops the list result + predicate, invokes{' '}
          <InlineCode>Where(source, pred)</InlineCode>, pushes the final filtered list.
        </Bullet>
        <Callout tone="amber" title="Chaining works across any types">
          Extension chaining is not limited to <InlineCode>IEnumerable</InlineCode> — any static method
          whose return type is compatible with another extension method's first parameter will chain.
          The compiler has no special knowledge of "fluent APIs"; it simply resolves each dot expression
          in sequence.
        </Callout>
      </ScrollReveal>

      {/* Generic extensions ------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Generic Extension Methods</H2>
        <Prose>
          Extension methods can be generic. The type arguments can be specified explicitly or
          inferred from the receiver. This is the same generic resolution used by all static
          methods:
        </Prose>
        <CodeBlock code={extMethodGenericCode} language="csharp" filename="ext_generic.shard" />
        <Callout tone="blue" title="Type inference">
          When the receiver type provides enough information to satisfy a generic parameter, you
          can omit the explicit type arguments: <InlineCode>a.Identity()</InlineCode> instead of{' '}
          <InlineCode>a.Identity&lt;int&gt;()</InlineCode>. The compiler infers{' '}
          <InlineCode>T</InlineCode> from the receiver's concrete type.
        </Callout>
      </ScrollReveal>

      {/* Resolution algorithm --------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Resolution Algorithm</H2>
        <Prose>
          When the binder encounters a call expression like <InlineCode>receiver.Method(args)</InlineCode>,
          it performs a three-phase lookup:
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Phase</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              {resolutionSteps.map(([phase, desc], i) => (
                <tr key={phase} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{phase}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Prose>
          The key function is <InlineCode>IsExtensionMethodCandidate</InlineCode>, which validates that:
        </Prose>
        <Bullet>The method has <InlineCode>LINK_STATIC</InlineCode> linking.</Bullet>
        <Bullet>The method has at least one parameter.</Bullet>
        <Bullet>The receiver type is assignable to the first parameter type (checked via{' '}
          <InlineCode>SemanticModel::IsAssignableTo</InlineCode>).</Bullet>
        <Bullet>The total parameter count equals the supplied argument count plus one (the receiver).</Bullet>
        <Prose>
          During extension method lookup, the binder prepends the receiver type to the explicit
          argument types and matches against the static method's parameter list. If a match is found,
          the invocation is flagged with <InlineCode>IsExtensionMethodInvocation = true</InlineCode>.
          This flag does not alter code generation — it exists only to suppress the "cannot call
          static method on instance" error.
        </Prose>
      </ScrollReveal>

      {/* Internal mechanics ------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Internal Mechanics: Zero-Cost Abstraction</H2>
        <Prose>
          Extension methods are <strong className="text-text-primary">fully resolved at compile time</strong>.
          Here is what happens step by step when <InlineCode>a.Double()</InlineCode> is compiled:
        </Prose>
        <Bullet>
          <strong className="text-text-primary">Semantic binding.</strong> The binder sees{' '}
          <InlineCode>a.Double()</InlineCode> with receiver type <InlineCode>int</InlineCode>. It searches{' '}
          <InlineCode>int</InlineCode>'s methods — no match. It then searches all top-level static
          methods. <InlineCode>Double(x: int)</InlineCode> matches with the receiver prepended.{' '}
          <InlineCode>IsExtensionMethodInvocation</InlineCode> is set to <InlineCode>true</InlineCode>.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">Bytecode emission.</strong> The emitter treats this as a
          normal invocation. The arguments list (empty — no extra args) is visited first. Then the
          receiver expression <InlineCode>a</InlineCode> is visited and pushed onto the evaluation
          stack. Then <InlineCode>CALLMETHODSYMBOL(Double)</InlineCode> is emitted.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">Runtime.</strong> The VM pops the receiver from the
          calling frame's eval stack and copies it to the new frame's stack as parameter 0. The
          method body runs exactly as if <InlineCode>Double(a)</InlineCode> had been written.
          There is no vtable lookup, no delegate allocation, and no additional indirection.
        </Bullet>
        <Prose>
          The evaluation stack layout for <InlineCode>data.Select(lambda).Where(pred)</InlineCode>:
        </Prose>
        <Prose>
          <strong className="text-text-primary">First call — Select:</strong>
        </Prose>
        <Bullet>Explicit args pushed in reverse: <InlineCode>lambda</InlineCode> goes onto the stack.</Bullet>
        <Bullet>Receiver: <InlineCode>data</InlineCode> (the <InlineCode>int[]</InlineCode>) is pushed on top.</Bullet>
        <Bullet>
          <InlineCode>CALLMETHODSYMBOL(Select)</InlineCode> pops <InlineCode>data</InlineCode> as{' '}
          <InlineCode>source</InlineCode>, pops <InlineCode>lambda</InlineCode> as{' '}
          <InlineCode>action</InlineCode>. The result (<InlineCode>List&lt;int&gt;</InlineCode>) is
          pushed back.
        </Bullet>
        <Prose>
          <strong className="text-text-primary">Second call — Where:</strong>
        </Prose>
        <Bullet>Explicit args pushed in reverse: <InlineCode>pred</InlineCode> goes onto the stack.</Bullet>
        <Bullet>Receiver: the <InlineCode>List&lt;int&gt;</InlineCode> from Select is already on the stack.</Bullet>
        <Bullet>
          <InlineCode>CALLMETHODSYMBOL(Where)</InlineCode> pops the list as{' '}
          <InlineCode>source</InlineCode>, pops <InlineCode>pred</InlineCode> as the predicate
          argument. The final filtered list is pushed.
        </Bullet>
        <Callout tone="amber" title="No hidden allocations">
          An extension method call produces the <em>exact same bytecode</em> as writing the
          equivalent static call. There is no boxing of the receiver, no wrapper object, and
          no temporary List or closure allocated to bridge the syntax. The dot notation is
          erased entirely by the compiler.
        </Callout>
      </ScrollReveal>

      {/* Comparison table -------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Extension Methods vs. Instance Methods vs. Static Calls</H2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary"></th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Instance Method</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Extension Method</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Static Call</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Syntax', 'obj.Method(args)', 'obj.ExtMethod(args)', 'Type.Method(obj, args)'],
                ['Defined on', 'The receiver type or its base', 'Anywhere (top-level static)', 'Anywhere (top-level or type static)'],
                ['Opcode emitted', 'CALLMETHODSYMBOL', 'CALLMETHODSYMBOL', 'CALLMETHODSYMBOL'],
                ['Dispatch', 'Direct (known at compile time)', 'Direct (known at compile time)', 'Direct (known at compile time)'],
                ['Can be chained', 'Yes', 'Yes', 'No (nested calls)'],
              ].map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-semibold text-text-primary whitespace-nowrap">{row[0]}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{row[1]}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{row[2]}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Prose>
          All three forms produce the same opcode. The difference is purely in how the binder
          resolves the method symbol and how the source code reads.
        </Prose>
      </ScrollReveal>
    </div>
  )
}


function GenericTypesContent() {
  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          Generic types let you write code that works with <strong className="text-text-primary">any type</strong>{' '}
          while keeping full compile-time type safety. A type parameter (<InlineCode>T</InlineCode>) is a
          placeholder replaced by a concrete type at the point of use. When you write{' '}
          <InlineCode>new Container&lt;int&gt;()</InlineCode>, the compiler and runtime together create a
          specialised layout where every occurrence of <InlineCode>T</InlineCode> in fields, method
          signatures, and return types is resolved to <InlineCode>int</InlineCode>. This is not erasure and
          not templating — it is <strong className="text-text-primary">reified generics</strong> with a
          single copy of the bytecode and a type-shape that substitutes type parameters at runtime.
        </Prose>
      </ScrollReveal>

      {/* Generic Classes ---------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Generic Classes</H2>
        <Prose>
          A class is made generic by listing type parameters in angle brackets after its name. Within the
          class body, type parameters can appear anywhere a type is expected: as field types, method return
          types, constructor parameters, or local variable types.
        </Prose>
        <CodeBlock code={genericClassCode} language="csharp" filename="generic_class.shard" />
        <Prose>
          The symbol-level representation: <InlineCode>Container</InlineCode> is a{' '}
          <InlineCode>ClassSymbol</InlineCode> with one <InlineCode>TypeParameterSymbol</InlineCode> named{' '}
          <InlineCode>T</InlineCode>. When you reference <InlineCode>Container&lt;int&gt;</InlineCode>, the
          compiler creates a <InlineCode>GenericTypeSymbol</InlineCode> that wraps the underlying class
          and maps <InlineCode>T → int</InlineCode> via an internal{' '}
          <InlineCode>_typeParametersMap</InlineCode>. Subsequent member lookups on the generic symbol
          substitute concrete types through this map, so <InlineCode>Get()</InlineCode> correctly reports
          its return type as <InlineCode>int</InlineCode> rather than <InlineCode>T</InlineCode>.
        </Prose>
        <Bullet>
          <strong className="text-text-primary">Field layout.</strong> A{' '}
          <InlineCode>FieldSymbol</InlineCode> whose type is a type parameter is given a slot in the type
          shape as usual, but the shape's <InlineCode>GenericArguments</InlineCode> vector records the
          concrete substitution. When the GC allocates an instance via{' '}
          <InlineCode>AllocateGeneric(baseType, genericArgs)</InlineCode>, it creates a{' '}
          <InlineCode>TypeShape</InlineCode> specialised for those arguments. The shape is cached in the{' '}
          <InlineCode>TypeShapeCache</InlineCode> — two instances of{' '}
          <InlineCode>Container&lt;int&gt;</InlineCode> share the same shape.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">Instantiation.</strong>{' '}
          <InlineCode>new Container&lt;int&gt;()</InlineCode> compiles to{' '}
          <InlineCode>NEWOBJECT</InlineCode> with the <InlineCode>GenericTypeSymbol</InlineCode> as the
          type argument. The VM calls <InlineCode>SemanticModel::TryResolveGenericArguments</InlineCode> to
          extract the base type (<InlineCode>Container</InlineCode>) and the concrete arguments vector, then
          allocates through <InlineCode>AllocateGeneric</InlineCode>.
        </Bullet>
      </ScrollReveal>

      {/* Multiple type parameters ------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Multiple Type Parameters</H2>
        <Prose>
          A class (or method) can declare any number of type parameters, separated by commas. Each receives
          its own <InlineCode>TypeParameterSymbol</InlineCode> and a unique index in the type parameter list:
        </Prose>
        <CodeBlock code={genericMultiParamCode} language="csharp" filename="generic_multi.shard" />
        <Callout tone="blue" title="Convention">
          Single-letter uppercase names (<InlineCode>T</InlineCode>, <InlineCode>K</InlineCode>,{' '}
          <InlineCode>V</InlineCode>) are conventional but not enforced. Multi-letter names like{' '}
          <InlineCode>TResult</InlineCode> are also valid.
        </Callout>
      </ScrollReveal>

      {/* Nested generics --------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Nested Generic Types</H2>
        <Prose>
          Type arguments can themselves be generic instantiations. The type system handles arbitrary nesting:
        </Prose>
        <CodeBlock code={genericNestedCode} language="csharp" filename="generic_nested.shard" />
        <Prose>
          The outer <InlineCode>GenericTypeSymbol</InlineCode> maps <InlineCode>T → Container&lt;int&gt;</InlineCode>,
          which is itself a <InlineCode>GenericTypeSymbol</InlineCode> mapping <InlineCode>T → int</InlineCode>.
          Field access chains through both levels transparently —{' '}
          <InlineCode>outer.Value.Value</InlineCode> resolves <InlineCode>T</InlineCode> at each step.
        </Prose>
      </ScrollReveal>

      {/* Generic Methods ---------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Generic Methods</H2>
        <Prose>
          Methods can declare their own type parameters independently of the enclosing type. A generic method
          on a non-generic class, a generic method on a generic class with a separate type parameter, and a
          top-level generic static function are all supported. Type arguments can be supplied explicitly or
          <strong className="text-text-primary">inferred</strong> from the method's argument types:
        </Prose>
        <CodeBlock code={genericMethodCode} language="csharp" filename="generic_method.shard" />
        <Bullet>
          <strong className="text-text-primary">Explicit type arguments.</strong>{' '}
          <InlineCode>Factory.Make&lt;int&gt;(42)</InlineCode> tells the compiler to substitute{' '}
          <InlineCode>T = int</InlineCode>. The compiler emits{' '}
          <InlineCode>LOAD_TYPEARGUMENT</InlineCode> with the concrete type and then{' '}
          <InlineCode>CALLGENERICMETHOD</InlineCode>.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">Type inference.</strong>{' '}
          <InlineCode>Factory.Make(42)</InlineCode> — the compiler sees the argument{' '}
          <InlineCode>42</InlineCode> has type <InlineCode>int</InlineCode>, matches it to{' '}
          <InlineCode>v: T</InlineCode>, and infers <InlineCode>T = int</InlineCode>. The same{' '}
          <InlineCode>LOAD_TYPEARGUMENT + CALLGENERICMETHOD</InlineCode> sequence is emitted — inference is
          purely a compile-time convenience.
        </Bullet>
        <Callout tone="amber" title="Instance-level vs method-level">
          A method's own type parameters shadow the enclosing class's type parameters. In{' '}
          <InlineCode>class Container&lt;T&gt;</InlineCode> with method{' '}
          <InlineCode>func As&lt;U&gt;() → Container&lt;U&gt;</InlineCode>,{' '}
          <InlineCode>T</InlineCode> is resolved from the class instantiation and{' '}
          <InlineCode>U</InlineCode> is resolved from the method call site. Both levels of
          type parameters coexist and are independently tracked.
        </Callout>
      </ScrollReveal>

      {/* Generics + Interfaces ---------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Generic Interfaces and Constraints</H2>
        <Prose>
          Generic types work seamlessly with interfaces. A generic parameter can appear in interface
          declarations and implementations. The built-in <InlineCode>IEnumerable&lt;T&gt;</InlineCode> is
          the canonical example — arrays, lists, and ranges all implement it, enabling a single generic
          function to operate over any enumerable source:
        </Prose>
        <CodeBlock code={genericInterfaceCode} language="csharp" filename="generic_interface.shard" />
        <Prose>
          At runtime, the <InlineCode>IEnumerable&lt;T&gt;</InlineCode> on an array is represented by a{' '}
          <InlineCode>GenericTypeSymbol</InlineCode> wrapping <InlineCode>IEnumerable</InlineCode> with the
          substitution <InlineCode>T → int</InlineCode>. The <InlineCode>foreach</InlineCode> loop calls{' '}
          <InlineCode>GetEnumerator()</InlineCode> through interface dispatch (<InlineCode>CALLINTERFACE</InlineCode>),
          which resolves to the array's concrete enumerator. Type parameters ensure that the return type of{' '}
          <InlineCode>First&lt;int&gt;</InlineCode> is <InlineCode>int</InlineCode>, not{' '}
          <InlineCode>object</InlineCode> — you get full type safety without casts.
        </Prose>
      </ScrollReveal>

      {/* Internal mechanics ------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Internal Mechanics: Reified Generics</H2>
        <Prose>
          ShardScript's generics are <strong className="text-text-primary">reified</strong>: the concrete
          type arguments are available at runtime through the <InlineCode>TypeShape</InlineCode>. Here is
          the key machinery:
        </Prose>
        <Bullet>
          <strong className="text-text-primary">GenericTypeSymbol</strong> is a concrete subclass of{' '}
          <InlineCode>TypeSymbol</InlineCode> that wraps an <InlineCode>UnderlayingType</InlineCode>{' '}
          (the uninstantiated class) and an internal{' '}
          <InlineCode>unordered_map&lt;TypeParameterSymbol*, TypeSymbol*&gt;</InlineCode>. When you
          write <InlineCode>Container&lt;int&gt;</InlineCode>, the symbol factory lazily creates a{' '}
          <InlineCode>GenericTypeSymbol</InlineCode> with <InlineCode>T → int</InlineCode>. If the same
          instantiation is requested again, the existing symbol is reused.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">TypeShape and allocation.</strong> At allocation time,
          the VM calls <InlineCode>TryResolveGenericArguments</InlineCode> to extract the base type and
          the concrete argument vector. The GC's <InlineCode>AllocateGeneric</InlineCode> creates a{' '}
          <InlineCode>TypeShape</InlineCode> parameterised by the concrete arguments. The shape's slot
          layout mirrors the underlying class layout — field offsets are computed once and cached per
          instantiation in <InlineCode>TypeShapeCache</InlineCode>. Subsequent allocations of the same
          instantiation reuse the cached shape.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">Runtime type argument flow.</strong> The VM carries a{' '}
          <InlineCode>PendingTypeArguments</InlineCode> vector. Before a generic method call, the compiler
          emits one <InlineCode>LOAD_TYPEARGUMENT(index, TypeSymbol*)</InlineCode> per type parameter.
          When the VM pushes a new call frame via <InlineCode>PushFrame</InlineCode>, it moves{' '}
          <InlineCode>PendingTypeArguments</InlineCode> into the frame's{' '}
          <InlineCode>TypeArguments</InlineCode> field. Within the callee, any bytecode instruction that
          needs to resolve a type parameter (field access, method return, cast) calls{' '}
          <InlineCode>frame-&gt;ResolveType(param)</InlineCode>, which looks up the parameter's index in
          the frame's <InlineCode>TypeArguments</InlineCode> vector.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">Substitution at member lookups.</strong> When accessing a
          member on a generic type (e.g., <InlineCode>c.Get()</InlineCode> where <InlineCode>c</InlineCode>{' '}
          is <InlineCode>Container&lt;int&gt;</InlineCode>), the binder resolves the method through{' '}
          <InlineCode>GenericTypeSymbol::FindMethod</InlineCode>. This override substitutes each
          parameter's type through the map before comparing signatures, so the resolved method reports
          <InlineCode>return int</InlineCode> rather than <InlineCode>return T</InlineCode>. The
          compiler then emits the correct opcode knowing the concrete types.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">Code sharing.</strong> There is only <em>one</em> copy of
          the bytecode for <InlineCode>Container&lt;T&gt;.Set</InlineCode>, regardless of how many
          instantiations exist. The bytecode operates on slots and opcodes that are type-parameter-agnostic.
          Type safety is enforced at compile time; at runtime, the eval stack holds{' '}
          <InlineCode>ObjectInstance*</InlineCode> values whose concrete types are known through their
          shapes. Generic fields are accessed via slot index just like non-generic fields — the type
          parameter substitution only affects which concrete <InlineCode>TypeSymbol*</InlineCode> the slot
          reports, not the slot's offset or access mechanism.
        </Bullet>
      </ScrollReveal>
    </div>
  )
}


const typeShapeLayoutCode = `struct Point { X: int; Y: int; }      (a value type)

At compile time, LayoutGenerator assigns each field a slot and a byte offset:

  TypeShape for Point
  ------------------------------
    Size  = 16 bytes
    Slots:
      [0]  Offset = 0    FieldShape = int     ->  X
      [1]  Offset = 8    FieldShape = int     ->  Y

An instance is one 16-byte block of raw memory:

  byte   0........8........16
         [ X = 3 ][ Y = 4 ]

  reading point.X  ==  read 8 bytes at offset 0
  reading point.Y  ==  read 8 bytes at offset 8

No field names and no dictionary are consulted at runtime.`

const getFieldSnippetCode = `// Reading a field. 'slot' is a compile-time constant carried by
// LOADFIELD / STOREFIELD (taken from the FieldSymbol). (Safety checks omitted.)
ObjectInstance* ObjectInstance::GetField(std::uint32_t slot)
{
    std::size_t offset = m_shape->GetOffset(slot);      // slot -> byte offset
    void* addr = OffsetMemory(offset, sizeof(ObjectInstance*));
    return *static_cast<ObjectInstance**>(addr);        // read raw memory
}`

const genericShapeCode = `TypeShapeCache:  (base type, generic arguments)  ->  TypeShape   (interned)

  Container<int>        key: (Container, {int})       built once, then reused
  Container<string>     key: (Container, {string})    a distinct shape

Building Container<int>:
  1. substitute T -> int in every field  (SubstituteTypeParameter)
  2. recompute each field's offset/size with int's inline size
  3. the total Size is concrete; value-type fields sit inline (no boxing)

Two Container<int> instances share one TypeShape.
Container<int> and Container<string> are two different shapes.`

function TypeShapeContent() {
  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          Every ShardScript value occupies a flat block of raw memory. Its layout is not discovered at
          runtime by field name — it is fixed at compile time as a list of numbered slots, each at a known
          byte offset. This is the same idea as a C <InlineCode>struct</InlineCode>: the compiler decides
          where every field lives, and field access becomes a direct memory read at a constant offset. There
          are no hash tables on the hot path.
        </Prose>
      </ScrollReveal>

      {/* Assignment 1: slots, no hash tables --------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>From Field Names to Slots</H2>
        <Prose>
          Once the semantic model is complete, the{' '}
          <strong className="text-text-primary">LayoutGenerator</strong> walks every type and lays out its
          fields. Each field receives a sequential <InlineCode>SlotIndex</InlineCode> and a byte offset, and
          the type&apos;s total <InlineCode>Size</InlineCode> is the running sum of its fields&apos; inline
          sizes. The slot index is stored on the <InlineCode>FieldSymbol</InlineCode> and baked into the
          bytecode — <InlineCode>LOADFIELD</InlineCode> and <InlineCode>STOREFIELD</InlineCode> carry that
          field, and from it the VM reads the slot.
        </Prose>
        <CodeBlock code={typeShapeLayoutCode} language="text" filename="layout.txt" />
        <Prose>
          The resulting layout lives in a <InlineCode>TypeShape</InlineCode>: a small record holding the
          base type, the total <InlineCode>Size</InlineCode>, and a flat <InlineCode>Slots</InlineCode>{' '}
          array — one entry per field, pairing a byte <InlineCode>Offset</InlineCode> with the field&apos;s
          own <InlineCode>FieldShape</InlineCode>. Reading a field is then pure pointer arithmetic:
        </Prose>
        <CodeBlock code={getFieldSnippetCode} language="cpp" filename="getfield.cpp" />
        <Callout tone="blue" title="Like a C struct">
          Field access is <InlineCode>O(1)</InlineCode> and cache-friendly: contiguous memory, fixed offsets,
          no per-access hashing. The cost of &quot;find this field&quot; was paid once, at compile time. The
          only hash map in the picture — the <InlineCode>TypeShapeCache</InlineCode> — is consulted when a
          shape is first built, not on every read or write.
        </Callout>
      </ScrollReveal>

      {/* ObjectInstance ------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>The ObjectInstance: a Raw Memory Block</H2>
        <Prose>
          An <InlineCode>ObjectInstance</InlineCode> is little more than a pointer to its{' '}
          <InlineCode>TypeSymbol</InlineCode>, a pointer to its <InlineCode>TypeShape</InlineCode>, a block
          of raw memory (<InlineCode>m_rawMemoryPtr</InlineCode> of <InlineCode>Size</InlineCode> bytes), and
          a reference count. How a field is stored at its offset depends on its kind:
        </Prose>
        <ul className="space-y-2 text-text-secondary">
          <Bullet><strong className="text-text-primary">Value-type fields</strong> — <InlineCode>int</InlineCode>, <InlineCode>double</InlineCode>, <InlineCode>bool</InlineCode>, <InlineCode>char</InlineCode>, <InlineCode>byte</InlineCode>, <InlineCode>struct</InlineCode> — live inline in the block at their offset.</Bullet>
          <Bullet><strong className="text-text-primary">Reference-type fields</strong> — <InlineCode>class</InlineCode>, <InlineCode>string</InlineCode>, arrays — hold an <InlineCode>ObjectInstance*</InlineCode> pointer at the offset.</Bullet>
        </ul>
        <Prose>
          <InlineCode>GetField</InlineCode> checks the field&apos;s shape and either returns that pointer or
          reads the inline value. Either way it is a single, offset-addressed memory access.
        </Prose>
      </ScrollReveal>

      {/* Assignment 2: generics via TypeShape -------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>How Generics Become Real Layouts</H2>
        <Prose>
          ShardScript generics are <strong className="text-text-primary">reified</strong>, not erased. Each
          closed instantiation — <InlineCode>Container&lt;int&gt;</InlineCode>,{' '}
          <InlineCode>Container&lt;string&gt;</InlineCode>,{' '}
          <InlineCode>Dictionary&lt;string,int&gt;</InlineCode> — is its own concrete type with its own memory
          layout. The <InlineCode>TypeShapeCache</InlineCode> holds one{' '}
          <InlineCode>TypeShape</InlineCode> per <InlineCode>(base type, generic arguments)</InlineCode> pair,
          building and interning a shape the first time a given instantiation is needed.
        </Prose>
        <CodeBlock code={genericShapeCode} language="text" filename="generics.txt" />
        <Prose>
          Building a generic shape substitutes the type parameters into every field: a field of type{' '}
          <InlineCode>T</InlineCode> in <InlineCode>Container&lt;T&gt;</InlineCode> becomes{' '}
          <InlineCode>int</InlineCode> in <InlineCode>Container&lt;int&gt;</InlineCode>, with{' '}
          <InlineCode>int</InlineCode>&apos;s inline size and shape. The generator then recomputes offsets
          and the total <InlineCode>Size</InlineCode> for that instantiation, exactly as it would for a
          non-generic type. Because the layout is concrete, a generic field of value type is stored inline at
          its real size — no boxing, no type erasure.
        </Prose>
        <Callout tone="blue" title="Reified, not erased">
          Unlike Java&apos;s erased generics — where <InlineCode>List&lt;int&gt;</InlineCode> and{' '}
          <InlineCode>List&lt;string&gt;</InlineCode> share one layout and elements are boxed objects — each
          ShardScript instantiation gets a distinct shape with real byte offsets. The cost is one shape per
          instantiation; the payoff is the same flat, offset-addressed field access as non-generic types.
        </Callout>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <Callout tone="green" title="Why it is fast">
          Fixed offsets turn field access into <InlineCode>O(1)</InlineCode> pointer arithmetic over
          contiguous, cache-friendly memory. Generic dispatch reduces to a shape lookup that is amortized to
          first use. The VM spends its hash maps at compile time and at first instantiation — never in the
          field-access hot path.
        </Callout>
      </ScrollReveal>
    </div>
  )
}

const firstClassDelegatesCode = `using stdio;

namespace demo;

// A named delegate type: the type of "int -> int" functions
public delegate IntFunc(a: int) -> int;

// Delegates may be generic
public delegate Transform<T, U>(value: T) -> U;

public static func Main() -> void
{
    // A delegate variable holding a lambda
    inc: IntFunc = lambda (a: int) -> int { return a + 1; };

    // The same signature spelled inline (a fabricated delegate type)
    dbl: delegate int(int) = lambda (a: int) -> int { return a * 2; };

    println(inc(41));   // 42
    println(dbl(21));   // 42
}`

const firstClassLambdasCode = `using stdio;

namespace demo;

public delegate IntFunc(a: int) -> int;

static func Triple(x: int) -> int { return x * 3; }

public static func Main() -> void
{
    // Explicit return type with ->
    f: IntFunc = lambda (a: int) -> int { return a + 10; };

    // Inferred return with =>
    g: IntFunc = lambda (a: int) => { return a + 100; };

    // A named method bound directly to a delegate
    h: IntFunc = Triple;

    println(f(1));    // 11
    println(g(1));    // 101
    println(h(5));    // 15
}`

const firstClassHigherOrderCode = `using stdio;

namespace demo;

public delegate IntFunc(a: int) -> int;

// A function that TAKES a function as an argument
static func Apply(f: IntFunc, x: int) -> int
{
    return f(x);
}

// A function that RETURNS a function
static func Choose(op: int) -> IntFunc
{
    if (op == 0)
        return lambda (a: int) -> int { return a + 1; };
    return lambda (a: int) -> int { return a - 1; };
}

public static func Main() -> void
{
    // Pass a lambda where a delegate is expected
    println(Apply(lambda (a: int) -> int { return a * a; }, 5));   // 25

    // Receive a function back, then call it
    step := Choose(0);
    println(step(10));   // 11
}`

const firstClassClosuresCode = `using stdio;

namespace demo;

public delegate IntFunc(a: int) -> int;

public static func Main() -> void
{
    offset := 10;

    // A lambda referencing a variable from its enclosing scope
    addOffset: IntFunc = lambda (a: int) -> int
    {
        return a + offset;
    };

    println(addOffset(5));   // 15
}`


/* ===== INTERNALS: ASYNC STATE MACHINE LOWERING ===== */

function AsyncStateMachineInternalsContent() {
  const passes = [
    ['1', 'Prepare', 'AsyncHoistingPass', 'Rewrites the body so nested awaits become top-level statements.'],
    ['2', 'Prepare', 'AsyncAnalysisPass', 'Scans for await sites; builds state-machine class, fields, and MoveNext symbol.'],
    ['3', 'Emit', 'AsyncEmissionPass', 'Emits bytecode for the factory, MoveNext, and state-machine constructor.'],
  ]
  const smFields = [
    ['_state', 'int', 'Current segment index (0 = entry, 1 = after first await, etc.). MoveNext dispatches on this value.'],
    ['_task', 'Task or ValueTask<T>', 'The task returned to the caller. It is completed (or faulted) when the async method finishes.'],
    ['_outerThis', 'Enclosing class', 'For instance async methods — a copy of this, since the original frame is gone after suspension.'],
    ['_awaiterN', 'Awaiter type', 'One field per await site. Stores the awaiter instance across the suspension, so GetResult() can be called on resume.'],
    ['<p>name', 'Parameter type', 'Lifted parameter — one per method parameter. The factory copies argument values into these fields.'],
    ['<l>name', 'Variable type', 'Lifted local variable — one per variable declared in the async method body.'],
    ['_currentException', 'RuntimeException', 'Present only when an await is inside a catch clause. Preserves the exception being handled so it can be restored on resume.'],
  ]

  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          When the compiler encounters an <InlineCode>async func</InlineCode>, it does not emit
          the method body directly. Instead, it performs a <strong className="text-text-primary">full lowering
          transformation</strong>: the original method is replaced by a <strong className="text-text-primary">factory</strong>,
          a compiler-generated <strong className="text-text-primary">state-machine class</strong> is emitted,
          and the method body is split across <strong className="text-text-primary">N + 1 segments</strong>{' '}
          (one per <InlineCode>await</InlineCode> site, plus the entry segment).
        </Prose>
      </ScrollReveal>

      {/* Lowering Pipeline */}
      <ScrollReveal delay={0.05}>
        <H2>The Three-Pass Lowering Pipeline</H2>
        <Prose>
          This transformation is orchestrated by the <InlineCode>AsyncStateMachineLowering</InlineCode> class
          as a linear three-pass pipeline:
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Pass</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Phase</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Class</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Responsibility</th>
              </tr>
            </thead>
            <tbody>
              {passes.map(([num, phase, cls, resp], i) => (
                <tr key={num} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{num}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{phase}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{cls}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{resp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Prose>
          Passes 1 and 2 run during <InlineCode>Prepare</InlineCode> (before layout generation), so the
          generated fields receive correct slot indices. Pass 3 runs during <InlineCode>Emit</InlineCode>{' '}
          (after layout), when field slots are known and bytecode offsets can be patched.
        </Prose>
      </ScrollReveal>

      {/* State-Machine Class */}
      <ScrollReveal delay={0.05}>
        <H2>The State-Machine Class</H2>
        <Prose>
          For each async method, the compiler generates a class with the name pattern{' '}
          <InlineCode>&lt;MethodName&gt;k__AsyncStateMachine_N</InlineCode> that implements{' '}
          <InlineCode>IAsyncState</InlineCode>. The class carries all the state that must survive across{' '}
          <InlineCode>await</InlineCode> suspension points:
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Field</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Type</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Purpose</th>
              </tr>
            </thead>
            <tbody>
              {smFields.map(([name, type, purpose], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{type}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Prose>
          The state machine also contains an <InlineCode>init</InlineCode> constructor (empty body — just{' '}
          <InlineCode>RETURN</InlineCode>) and a <InlineCode>MoveNext</InlineCode> method that implements{' '}
          <InlineCode>IAsyncState.MoveNext</InlineCode>.
        </Prose>
      </ScrollReveal>

      {/* Factory Method */}
      <ScrollReveal delay={0.05}>
        <H2>The Factory Method</H2>
        <Prose>
          The original async method’s bytecode is replaced entirely by a factory. The factory:
        </Prose>
        <Bullet><strong className="text-text-primary">1. Creates the state machine.</strong> Emits <InlineCode>NEWOBJECT</InlineCode> for the generated state-machine class.</Bullet>
        <Bullet><strong className="text-text-primary">2. Saves outer this.</strong> For instance methods, copies the original <InlineCode>this</InlineCode> (slot 0) into <InlineCode>_outerThis</InlineCode>.</Bullet>
        <Bullet><strong className="text-text-primary">3. Copies parameters.</strong> For each lifted parameter, loads the argument from the original slot and stores it into the corresponding <InlineCode>&lt;p&gt;name</InlineCode> field.</Bullet>
        <Bullet><strong className="text-text-primary">4. Creates the task.</strong> Instantiates a new <InlineCode>Task</InlineCode> or <InlineCode>ValueTask&lt;T&gt;</InlineCode> and stores it in <InlineCode>_task</InlineCode>.</Bullet>
        <Bullet><strong className="text-text-primary">5. Roots the task.</strong> Calls <InlineCode>InternalRoot</InlineCode> to increment the task’s reference count and register it in the event loop’s rooted-tasks list.</Bullet>
        <Bullet><strong className="text-text-primary">6. Kicks off MoveNext.</strong> Calls <InlineCode>stateMachine.MoveNext()</InlineCode> synchronously — this runs segment 0, which executes up to the first <InlineCode>await</InlineCode>.</Bullet>
        <Bullet><strong className="text-text-primary">7. Returns the task.</strong> Loads <InlineCode>_task</InlineCode> from the state machine and returns it to the caller.</Bullet>
      </ScrollReveal>

      {/* MoveNext */}
      <ScrollReveal delay={0.05}>
        <H2>MoveNext: The Segment Dispatch</H2>
        <Prose><strong className="text-text-primary">Top-level exception guard.</strong> The entire body is wrapped in an <InlineCode>ENTER_TRY</InlineCode> with a catch-all handler that calls <InlineCode>SetException</InlineCode> on the task.</Prose>
        <Prose><strong className="text-text-primary">State dispatch.</strong> For each state 0..N, the code loads <InlineCode>_state</InlineCode>, compares it to the state index, and jumps to the corresponding segment.</Prose>
        <Prose><strong className="text-text-primary">Segments 0..N.</strong> Each segment:</Prose>
        <Bullet><strong className="text-text-primary">Restores lifted state.</strong> Copies each lifted parameter and local from its state-machine field into its MoveNext local-variable slot.</Bullet>
        <Bullet><strong className="text-text-primary">Re-establishes context (segment &gt; 0 only).</strong> Re-enters try regions and re-registers defers that were active at the await site. Calls <InlineCode>GetResult()</InlineCode> on the previous segment’s awaiter. If resuming inside a catch clause, restores the captured exception from <InlineCode>_currentException</InlineCode>.</Bullet>
        <Bullet><strong className="text-text-primary">Executes user code.</strong> Runs statements from the current resume point until the next <InlineCode>await</InlineCode> or the end of the method.</Bullet>
      </ScrollReveal>

      {/* Await Suspension */}
      <ScrollReveal delay={0.05}>
        <H2>Await Suspension: The Bytecode Sequence</H2>
        <Prose>
          When the emitter encounters an <InlineCode>await</InlineCode> expression, it emits a{' '}
          <strong className="text-text-primary">fixed sequence</strong> of instructions:
        </Prose>
        <Bullet><strong className="text-text-primary">1. Evaluate.</strong> The awaited expression is evaluated, producing the awaitable on the evaluation stack.</Bullet>
        <Bullet><strong className="text-text-primary">2. GetAwaiter.</strong> The awaitable’s <InlineCode>GetAwaiter()</InlineCode> is called (unless the awaitable is a self-awaiter). The awaiter is stored in a temporary local.</Bullet>
        <Bullet><strong className="text-text-primary">3. Store in field.</strong> The awaiter is copied into <InlineCode>this._awaiterN</InlineCode> to keep it alive across the suspension.</Bullet>
        <Bullet><strong className="text-text-primary">4. Fast-path check.</strong> If <InlineCode>_awaiterN.IsCompleted</InlineCode> returns true, the code jumps directly to the next segment, bypassing the suspension logic entirely.</Bullet>
        <Bullet><strong className="text-text-primary">5. Preserve catch context.</strong> If inside a catch clause, the current exception is loaded via <InlineCode>LOAD_CURRENT_EXCEPTION</InlineCode> and stored in <InlineCode>_currentException</InlineCode>.</Bullet>
        <Bullet><strong className="text-text-primary">6. Set state.</strong> <InlineCode>_state = awaitIndex + 1</InlineCode> records which segment to resume at.</Bullet>
        <Bullet><strong className="text-text-primary">7. Register continuation.</strong> <InlineCode>_awaiterN.OnCompleted(this)</InlineCode> registers the state machine itself as the callback — when the async operation completes, the event loop will call <InlineCode>this.MoveNext()</InlineCode>.</Bullet>
        <Bullet><strong className="text-text-primary">8. Return.</strong> <InlineCode>RETURN</InlineCode> exits the MoveNext frame, unwinding the VM call stack back to the event loop.</Bullet>
        <Callout tone="blue">
          There is no <InlineCode>AWAIT</InlineCode> opcode in the ShardScript VM. The entire await
          protocol is expressed in terms of ordinary opcodes — <InlineCode>CALLMETHODSYMBOL</InlineCode>,{' '}
          <InlineCode>STOREFIELD</InlineCode>, <InlineCode>LOADFIELD</InlineCode>, conditional jumps, and{' '}
          <InlineCode>RETURN</InlineCode>. The VM does not need to understand async/await at all.
        </Callout>
      </ScrollReveal>

      {/* Task Completion */}
      <ScrollReveal delay={0.05}>
        <H2>Task Completion</H2>
        <Bullet><strong className="text-text-primary">Complete the task.</strong> For <InlineCode>Task</InlineCode>, calls <InlineCode>task.Complete()</InlineCode>. For <InlineCode>ValueTask&lt;T&gt;</InlineCode>, calls <InlineCode>task.SetResult(default(T))</InlineCode>.</Bullet>
        <Bullet><strong className="text-text-primary">IsReturnAwait.</strong> If the last statement is <InlineCode>return await expr;</InlineCode>, the await site is marked <InlineCode>IsReturnAwait = true</InlineCode>. On resume, the awaiter’s result is used via <InlineCode>SetResult</InlineCode> rather than <InlineCode>SetResult(default)</InlineCode>.</Bullet>
        <Bullet><strong className="text-text-primary">Exception guard.</strong> The top-level <InlineCode>ENTER_TRY</InlineCode> catch handler calls <InlineCode>task.SetException(exception)</InlineCode>, transitioning the task to <InlineCode>FAULTED</InlineCode> and resuming continuations.</Bullet>
      </ScrollReveal>

      {/* Lifting */}
      <ScrollReveal delay={0.05}>
        <H2>Lifting Parameters and Locals</H2>
        <Prose>
          Local variables and parameters live on the evaluation stack, but the stack frame is destroyed
          when the method suspends at an <InlineCode>await</InlineCode>. The solution is{' '}
          <strong className="text-text-primary">lifting</strong> — each variable that must survive across
          a suspension is promoted to a field on the state-machine class:
        </Prose>
        <Bullet><strong className="text-text-primary">Parameters:</strong> Field <InlineCode>&lt;p&gt;name</InlineCode> + local slot in MoveNext. Factory copies argument → field. Segment entry copies field → local.</Bullet>
        <Bullet><strong className="text-text-primary">Locals:</strong> Field <InlineCode>&lt;l&gt;name</InlineCode>. Original <InlineCode>SlotIndex</InlineCode> redirected to MoveNext slot. Segment entry: field → local. Segment exit (at await): local → field via <InlineCode>SaveLiftedParametersAndLocals</InlineCode>.</Bullet>
        <Bullet><strong className="text-text-primary">Enumerators:</strong> For <InlineCode>foreach</InlineCode>/<InlineCode>for..in</InlineCode> with awaits, field <InlineCode>&lt;e&gt;N</InlineCode> holds the enumerator across suspensions.</Bullet>
        <Callout tone="blue">
          The <InlineCode>ParameterSlotRemapper</InlineCode> RAII helper temporarily redirects parameter
          slot indices to their MoveNext equivalents during bytecode emission, ensuring all{' '}
          <InlineCode>LOADVARIABLE</InlineCode> / <InlineCode>STOREVARIABLE</InlineCode> instructions target
          the correct slots.
        </Callout>
      </ScrollReveal>

      {/* Loops */}
      <ScrollReveal delay={0.05}>
        <H2>Loops and Control Flow Across Awaits</H2>
        <Prose>
          After hoisting, an <InlineCode>await</InlineCode> inside a loop body becomes a top-level
          statement, and the loop itself becomes the <InlineCode>NextStatement</InlineCode> of the
          await site. On resume, execution jumps to the loop epilogue (increment and condition
          check) or directly to the body, depending on the loop type.
        </Prose>
        <Prose>
          <InlineCode>break</InlineCode> and <InlineCode>continue</InlineCode> patch bytecode jumps
          at emission time to target the appropriate exit or re-entry point within the loop’s
          segment structure.
        </Prose>
      </ScrollReveal>

      {/* End-to-End Flow */}
      <ScrollReveal delay={0.05}>
        <H2>End-to-End Lowering Flow</H2>
        <Bullet><strong className="text-text-primary">1. Detection.</strong> <InlineCode>MethodSymbol::IsAsync</InlineCode> is set during semantic analysis when the parser encounters the <InlineCode>async</InlineCode> keyword.</Bullet>
        <Bullet><strong className="text-text-primary">2. Hoisting (Pass 1).</strong> <InlineCode>AsyncHoistingPass</InlineCode> rewrites nested awaits into top-level variable statements, preserving evaluation order.</Bullet>
        <Bullet><strong className="text-text-primary">3. Analysis (Pass 2).</strong> <InlineCode>AsyncAnalysisPass</InlineCode> scans for await sites, builds the state-machine <InlineCode>ClassSymbol</InlineCode>, creates fields for lifted parameters/locals/awaiters, and registers <InlineCode>MoveNext</InlineCode> and the constructor.</Bullet>
        <Bullet><strong className="text-text-primary">4. Layout.</strong> Standard layout generation assigns <InlineCode>SlotIndex</InlineCode> values to every field.</Bullet>
        <Bullet><strong className="text-text-primary">5. Emission (Pass 3).</strong> <InlineCode>AsyncEmissionPass::Run</InlineCode> generates three bytecode bodies: constructor, factory, and <InlineCode>MoveNext</InlineCode>.</Bullet>
        <Bullet><strong className="text-text-primary">6. Runtime.</strong> Factory creates state machine → MoveNext segment 0 → await suspends via <InlineCode>OnCompleted</InlineCode> → event loop resumes via <InlineCode>MoveNext</InlineCode> for next segment.</Bullet>
      </ScrollReveal>
    </div>
  )
}

function FirstClassFunctionsContent() {
  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          In ShardScript, functions are <strong className="text-text-primary">values</strong>. A function
          can be stored in a variable, passed as an argument, returned from another function, and created on
          the fly without a name. The type of a function value is a{' '}
          <strong className="text-text-primary">delegate</strong>; an anonymous function value is a{' '}
          <strong className="text-text-primary">lambda</strong>.
        </Prose>
      </ScrollReveal>

      {/* Delegate types ----------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Delegate Types</H2>
        <Prose>
          A delegate names a callable signature. Declare one with{' '}
          <InlineCode>delegate Name(params) -&gt; ReturnType;</InlineCode>, or spell the signature inline as
          a <em>fabricated</em> type <InlineCode>delegate ReturnType(ArgT, ...)</InlineCode> wherever a type
          is expected. Delegates may themselves be generic.
        </Prose>
        <CodeBlock code={firstClassDelegatesCode} language="csharp" filename="delegates.shard" />
      </ScrollReveal>

      {/* Lambdas ------------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Lambdas</H2>
        <Prose>
          A <InlineCode>lambda</InlineCode> is an anonymous function value. It takes a parameter list and
          either an explicit return type (<InlineCode>-&gt; ReturnType</InlineCode>) or the inference arrow (
          <InlineCode>=&gt;</InlineCode>), followed by a block body. A named method can also be bound straight
          to a delegate — no wrapper needed.
        </Prose>
        <CodeBlock code={firstClassLambdasCode} language="csharp" filename="lambdas.shard" />
        <Callout tone="amber" title="The lambda keyword is required">
          A bare <InlineCode>(x) =&gt; ...</InlineCode> does not parse — the <InlineCode>lambda</InlineCode>{' '}
          keyword is mandatory. Prefix it with <InlineCode>async</InlineCode> for an asynchronous closure
          that can <InlineCode>await</InlineCode>.
        </Callout>
      </ScrollReveal>

      {/* Higher-order -------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Higher-Order Functions</H2>
        <Prose>
          Because functions are values, a function can accept a delegate parameter and call it, or return a
          delegate to its caller. This is the shape of <InlineCode>map</InlineCode>/<InlineCode>filter</InlineCode>-style
          APIs and callbacks.
        </Prose>
        <CodeBlock code={firstClassHigherOrderCode} language="csharp" filename="higher_order.shard" />
      </ScrollReveal>

      {/* Closures ------------------------------------------------------ */}
      <ScrollReveal delay={0.05}>
        <H2>Closures</H2>
        <Prose>
          A lambda can reference variables from its enclosing scope, capturing them into a closure. The
          captured names behave as part of the lambda&apos;s environment when it runs.
        </Prose>
        <CodeBlock code={firstClassClosuresCode} language="csharp" filename="closures.shard" />
      </ScrollReveal>
    </div>
  )
}

const lambdaSyntaxCode = `using stdio;

namespace demo;

public delegate BinOp(a: int, b: int) -> int;
public delegate Action(msg: string) -> void;

public static func Main() -> void
{
    // lambda (params) -> Type { body }
    add: BinOp = lambda (a: int, b: int) -> int
    {
        return a + b;
    };

    // No parameters
    fortyTwo: delegate int() = lambda () -> int
    {
        return 42;
    };

    println(add(2, 3));    // 5
    println(fortyTwo());   // 42
}`

const asyncLambdaCode = `using stdio;
using async;

namespace demo;

public static func Main() -> void
{
    // An async lambda can await. It MUST declare an explicit return type
    // (Task or ValueTask<T>) -- the => inferred form is not allowed.
    f := async lambda () -> Task
    {
        println("before");
        await Task.Delay(100);
        println("after");
    };

    task := f();
    task.Wait();
}`

const lambdaCaptureCode = `using stdio;

namespace demo;

public delegate IntFunc(a: int) -> int;

public static func Main() -> void
{
    factor := 10;

    // The lambda references 'factor' from the enclosing scope -- a closure
    scale: IntFunc = lambda (a: int) -> int
    {
        return a * factor;
    };

    println(scale(5));    // 50
}`

const lambdaCallbackCode = `using stdio;

namespace demo;

public delegate Predicate(x: int) -> bool;

// A higher-order function that calls back into a caller-supplied lambda
static func CountWhere(items: int[], matches: Predicate) -> int
{
    count := 0;
    foreach (n in items)
    {
        if (matches(n))
            count += 1;
    }
    return count;
}

public static func Main() -> void
{
    threshold := 5;

    // The lambda captures 'threshold' and is handed in as a callback
    nums := [1, 6, 3, 9, 4];
    big := nums.CountWhere(lambda (n: int) -> bool { return n > threshold; });

    println(big);    // 2
}`

const disposableBasicCode = `using stdio;

namespace demo;

public class Resource : IDisposable
{
    public func Dispose() -> void
    {
        println("Resource.Dispose() called");
    }
}

public static func Main() -> void
{
    // 'defer r: Resource = ...' auto-calls r.Dispose() at end of scope
    defer r: Resource = new Resource();
    println("using resource");
    // Output:
    //   using resource
    //   Resource.Dispose() called
}`

const disposableFileCode = `using stdio;
using filesystem;

namespace demo;

public static func Main() -> void
{
    path := "example.txt";
    defer fs: FileStream = new FileStream(path, FileMode.CreateNew, FileAccess.Write);
    fs.Write("Hello, ShardScript!");
    fs.Flush();
    // Dispose() is called automatically here, flushing and closing the handle.
    println("file written and disposed");
}`

const disposableAsyncCode = `using stdio;
using async;

namespace demo;

public class Connection : IDisposable
{
    public func Dispose() -> void
    {
        println("connection closed");
    }
}

public class Program
{
    public static async func WorkAsync() -> Task
    {
        defer conn: Connection = new Connection();
        println("before await");
        await Task.Delay(10);
        println("after await");
        // Dispose is called here, even after the await suspension.
    }

    public static func Main() -> void
    {
        Task.Wait(WorkAsync());
        println("done");
    }
}`

const disposableMultiCode = `using stdio;

namespace demo;

public class Logger : IDisposable
{
    public func Dispose() -> void { println("logger disposed"); }
}

public class Database : IDisposable
{
    public func Dispose() -> void { println("database disposed"); }
}

public static func Main() -> void
{
    defer db: Database = new Database();
    defer log: Logger = new Logger();
    println("working...");
    // Output:
    //   working...
    //   logger disposed    (LIFO order)
    //   database disposed
}`

const taskBasicCode = `using stdio;
using async;

namespace demo;

public class Program
{
    public static async func DoWork() -> Task
    {
        println("work started");
        await Task.Delay(50);
        println("work done");
    }

    public static func Main() -> void
    {
        // Instance Wait()
        task := DoWork();
        task.Wait();
        println("main done");

        // Static Wait()
        Task.Wait(DoWork());
        println("second done");
    }
}`

const taskDelayApiCode = `using stdio;
using async;

namespace demo;

public class Program
{
    public static func Main() -> void
    {
        // Start three concurrent timers.
        t1 := Task.Delay(100);
        t2 := Task.Delay(200);
        t3 := Task.Delay(50);

        t1.Wait();
        t2.Wait();
        t3.Wait();

        println("all delays done");
    }
}`

const taskShootCode = `using stdio;
using async;

namespace demo;

public class Program
{
    public static async func Background() -> Task
    {
        println("background start");
        await Task.Delay(100);
        println("background end");
    }

    public static func Main() -> void
    {
        // Fire-and-forget: the task runs independently.
        Task.Shoot(Background());
        println("main end");
        // The background task may still be running at exit.
    }
}`

const valueTaskBasicCode = `using stdio;
using async;

namespace demo;

public class Program
{
    public static async func GetNumber() -> ValueTask<int>
    {
        await Task.Delay(10);
        return 42;
    }

    public static func Main() -> void
    {
        task := GetNumber();
        ValueTask.Wait(task);
        result := task.Result;
        println(result);  // 42
    }
}`

const valueTaskFromResultCode = `using stdio;
using async;

namespace demo;

public class Program
{
    public static func Main() -> void
    {
        // Synchronously completed ValueTask — no allocation, no event-loop wait.
        task := ValueTask.FromResult<int>(99);
        println(task.IsCompleted);   // true
        println(task.Result);        // 99

        // Can still be awaited, but the await resolves synchronously.
        task.Wait();                 // returns immediately
    }
}`

const asyncSyntaxCode = `using stdio;
using async;

namespace demo;

public class Program
{
    // 'async' + return type 'Task' or 'ValueTask<T>' are the only requirements.
    public static async func DelayedHello() -> Task
    {
        println("before delay");
        await Task.Delay(100);
        println("after delay");
    }

    public static func Main() -> void
    {
        Task.Wait(DelayedHello());
        println("done");
    }
}`

const asyncValueTaskCode = `using stdio;
using async;

namespace demo;

public class Program
{
    // ValueTask<T> for async methods that produce a value.
    public static async func GetNumberAsync() -> ValueTask<int>
    {
        await Task.Delay(10);
        return 42;
    }

    public static func Main() -> void
    {
        task := GetNumberAsync();
        ValueTask.Wait(task);
        result := task.Result + 1;
        println(result);  // 43
    }
}`

const asyncTryCatchCode = `using stdio;
using async;

namespace demo;

public class Program
{
    public static async func FaultyDelay() -> Task
    {
        await Task.Delay(10);
        throw new RuntimeException();
    }

    public static async func CaughtAwait() -> Task
    {
        try
        {
            await FaultyDelay();
            println("after await");  // never reached
        }
        catch (ex: RuntimeException)
        {
            println("caught inside async");
        }
    }

    public static func Main() -> void
    {
        Task.Wait(CaughtAwait());
        println("done");
    }
}`

const asyncLoopCode = `using stdio;
using async;

namespace demo;

public class Program
{
    public static async func DoItAsync() -> Task
    {
        for (i := 0; i < 3; i = i + 1)
        {
            println(i);
            await Task.Delay(100);
        }
        println("done");
    }

    public static func Main() -> void
    {
        Task.Wait(DoItAsync());
    }
}`

const eventLoopBasicCode = `using stdio;
using async;

namespace demo;

async func SayHello() -> Task
{
    println("Hello before delay");
    await Task.Delay(50);
    println("Hello after delay");
}

public static func Main() -> void
{
    task := SayHello();
    Task.Wait(task);
    println("done");
}`

const eventLoopCooperativeCode = `using stdio;
using async;

async func CounterA() -> Task
{
    println("A: 1");
    await Task.Delay(500);
    println("A: 2");
    await Task.Delay(500);
    println("A: 3");
}

async func CounterB() -> Task
{
    println("B: 1");
    await Task.Delay(800);
    println("B: 2");
    await Task.Delay(800);
    println("B: 3");
}

async func CounterC() -> Task
{
    println("C: 1");
    await Task.Delay(300);
    println("C: 2");
    await Task.Delay(300);
    println("C: 3");
}

public static func Main() -> void
{
    t1 := CounterA();
    t2 := CounterB();
    t3 := CounterC();

    t1.Wait();
    t2.Wait();
    t3.Wait();

    println("All counters finished");
}`

const eventLoopNativeCode = `using stdio;
using async;

namespace demo;

public static func Main() -> void
{
    // Start three concurrent timers — all three are pending in libuv simultaneously.
    t1 := Task.Delay(100);
    t2 := Task.Delay(200);
    t3 := Task.Delay(50);

    // Task.Wait() pumps the event loop cooperatively.
    // t3 completes first (50 ms), then t1 (100 ms), then t2 (200 ms).
    t1.Wait();
    t2.Wait();
    t3.Wait();

    println("all delays completed");
}`

const cancellationTokenBasicCode = `using stdio;
using async;

namespace demo;

public class Program
{
    public static func Main() -> void
    {
        cts := new CancellationTokenSource();
        token := cts.Token;

        println(token.IsCancellationRequested);  // false
        println(token.CanBeCanceled);            // true

        cts.Cancel();

        println(token.IsCancellationRequested);  // true
    }
}`

const cancellationTokenPollCode = `using stdio;
using async;

namespace demo;

public class Program
{
    public static async func PollUntilCanceled(token: CancellationToken) -> Task
    {
        iterations := 0;
        while (!token.IsCancellationRequested)
        {
            iterations = iterations + 1;
            println("poll " + iterations);
            await Task.Delay(50);
        }

        println("canceled after " + iterations);
    }

    public static func Main() -> void
    {
        cts := new CancellationTokenSource();
        task := PollUntilCanceled(cts.Token);

        Task.Delay(150).Wait();
        cts.Cancel();
        Task.Wait(task);

        println("done");
    }
}`

const cancellationTokenFileCode = `using stdio;
using async;
using filesystem;

namespace demo;

public class Program
{
    public static async func Run() -> Task
    {
        path := "D:/temp/cancel_demo.bin";
        if (File.Exists(path))
            File.Delete(path);

        fs := new FileStream(path, FileMode.CreateNew, FileAccess.Write);
        data: byte[] = [10 as byte, 20 as byte, 30 as byte];
        fs.Write(data, 0, 3);
        fs.Dispose();

        cts := new CancellationTokenSource();
        token := cts.Token;

        // Cancel before the async operation.
        cts.Cancel();

        fsRead := new FileStream(path, FileMode.Open, FileAccess.Read);
        buffer: byte[] = [0 as byte, 0 as byte, 0 as byte];

        try
        {
            await fsRead.ReadAsync(buffer, 0, 3, token);
            println("Expected cancellation exception");
        }
        catch (ex: RuntimeException)
        {
            println("canceled read threw: " + ex.message);
        }

        fsRead.Dispose();
        println("file stream cancellation ok");
    }

    public static func Main() -> void
    {
        Task.Wait(Run());
    }
}`

const cancellationTokenMultiCode = `using stdio;
using async;

namespace demo;

public class Program
{
    public static async func Work(token1: CancellationToken, token2: CancellationToken) -> Task
    {
        while (!token1.IsCancellationRequested && !token2.IsCancellationRequested)
        {
            println("working...");
            await Task.Delay(40);
        }

        if (token1.IsCancellationRequested)
            println("stopped by token1");
        else
            println("stopped by token2");
    }

    public static func Main() -> void
    {
        cts1 := new CancellationTokenSource();
        cts2 := new CancellationTokenSource();

        task := Work(cts1.Token, cts2.Token);

        Task.Delay(100).Wait();
        cts1.Cancel();
        Task.Wait(task);

        println("done");
    }
}`

const gcBasicCode = `using stdio;

namespace demo;

public class Widget
{
    public name: string;
}

public static func Main() -> void
{
    // Allocated on the GC heap, ref count = 0 initially.
    w := new Widget();
    w.name = "gear";

    println(w.name); // "gear"

    // When 'w' goes out of scope, its reference count drops to 0
    // and the GC reclaims the Widget instance.
}`

const gcRefCountCode = `using stdio;

namespace demo;

public class Node
{
    public value: int;
    public next: Node;
}

public static func Main() -> void
{
    a := new Node();
    a.value = 1;

    b := new Node();
    b.value = 2;

    // Field assignment increments ref count; old value decremented.
    a.next = b;      // b ref count = 1
    b.next = a;      // a ref count = 1

    // At end of scope:
    //   b.next dec-refs a (a -> 0) → a collected, a.next dec-refs b (b -> 0) → b collected
    // Cyclic references are handled by recursive termination.
}`

const gcCacheCode = `using stdio;

namespace demo;

public static func Main() -> void
{
    // Small integers (-5 to 256) are cached as singletons —
    // no allocation occurs; the same instance is always returned.
    a: int = 42;
    b: int = 42;
    // a and b reference the same cached ObjectInstance.

    // Boolean singletons
    t: bool = true;
    f: bool = false;

    // null is a single static singleton (NullInstance)
    nothing: Widget = null;

    println(a);    // 42
}`

const gcNullCode = `using stdio;

namespace demo;

public class Box
{
    public content: string;
}

public static func Main() -> void
{
    // Default-initialized reference fields hold null (NullInstance).
    b := new Box();
    println(b.content);  // "" (string null = empty)

    // null is not collected and never has reference counting applied.
    b.content = null;

    // Assignment of a real value increments reference count;
    // assignment of null decrements the old value.
    b.content = "payload";
    b.content = null;     // "payload" string ref count drops to 0 → collected
}`

function LambdasClosuresContent() {
  const lambdaForms: [string, string][] = [
    ['lambda (params) -> Type { body }', 'Explicit return type.'],
    ['async lambda (params) -> Task { body }', 'Asynchronous closure; explicit return type required.'],
  ]

  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          A <InlineCode>lambda</InlineCode> is an anonymous function value. Every lambda starts with the{' '}
          <InlineCode>lambda</InlineCode> keyword, takes a parenthesized parameter list, and is followed by
          either an explicit return type (<InlineCode>-&gt; Type</InlineCode>) or the inference arrow (
          <InlineCode>=&gt;</InlineCode>), then a brace body. Because a lambda is defined inside a scope, it
          can reach the variables around it — a <strong className="text-text-primary">closure</strong>.
        </Prose>
      </ScrollReveal>

      {/* Syntax --------------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Lambda Syntax</H2>
        <Prose>
          The parameter list is a typed, comma-separated list just like a method&apos;s. A lambda with no
          parameters uses empty parentheses, <InlineCode>()</InlineCode>.
        </Prose>
        <CodeBlock code={lambdaSyntaxCode} language="csharp" filename="lambda_syntax.shard" />
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Form</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Meaning</th>
              </tr>
            </thead>
            <tbody>
              {lambdaForms.map(([form, meaning], i) => (
                <tr key={form} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{form}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Callout tone="amber" title="The lambda keyword is required">
          A bare <InlineCode>(x) =&gt; ...</InlineCode> does not parse — the word <InlineCode>lambda</InlineCode>{' '}
          must introduce the expression. The body is always a brace block; there is no single-expression
          shorthand.
        </Callout>
      </ScrollReveal>

      {/* Async lambdas -------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Async Lambdas</H2>
        <Prose>
          Prefix <InlineCode>async</InlineCode> to obtain a closure that can <InlineCode>await</InlineCode>.
          An async lambda must declare an explicit return type — <InlineCode>Task</InlineCode> or{' '}
          <InlineCode>ValueTask&lt;T&gt;</InlineCode> — so the <InlineCode>=&gt;</InlineCode> inferred form is
          not allowed for async lambdas.
        </Prose>
        <CodeBlock code={asyncLambdaCode} language="csharp" filename="async_lambda.shard" />
      </ScrollReveal>

      {/* Closures ------------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Capturing Variables</H2>
        <Prose>
          A lambda&apos;s scope nests inside the scope where it is written, so it can reference the variables
          around it. Those outer names become part of the lambda&apos;s environment — this is a closure. The
          captured variables are read from the enclosing scope when the lambda runs.
        </Prose>
        <CodeBlock code={lambdaCaptureCode} language="csharp" filename="capture.shard" />
      </ScrollReveal>

      {/* Callbacks ------------------------------------------------------ */}
      <ScrollReveal delay={0.05}>
        <H2>Closures as Callbacks</H2>
        <Prose>
          The idiomatic use of a closure is a callback: hand a lambda to a higher-order function, and let it
          capture whatever state it needs from the call site. The lambda is consumed within the same routine
          that created it, so its captured variables are live for as long as they are needed.
        </Prose>
        <CodeBlock code={lambdaCallbackCode} language="csharp" filename="callback.shard" />
        <Callout tone="blue" title="Keep closures close to their captures">
          A closure works with the variables of the scope that created it. The standard, safe pattern is the
          one above — define a lambda, capture what you need, and use it (often as a callback) within the same
          routine. Avoid letting a capturing closure outlive the routine that owns its variables.
        </Callout>
      </ScrollReveal>
    </div>
  )
}

/* ===== RESOURCE MANAGEMENT: IDISPOSABLE ===== */

function IDisposableContent() {
  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          ShardScript provides <strong className="text-text-primary">deterministic resource disposal</strong> through
          the <InlineCode>IDisposable</InlineCode> interface. Combined with the <InlineCode>defer</InlineCode>{' '}
          statement's resource form, it guarantees that cleanup code runs at a predictable point — the end of the
          enclosing scope — regardless of how that scope is exited (normal return, early return, or exception
          propagation). This is the ShardScript equivalent of C#'s <InlineCode>using</InlineCode> statement or
          C++'s RAII pattern.
        </Prose>
        <Prose>
          The mechanism is built on two parts:
        </Prose>
        <Bullet>
          <strong className="text-text-primary">The <InlineCode>IDisposable</InlineCode> interface</strong> — a
          standard-library contract with a single method, <InlineCode>Dispose()</InlineCode>, that releases
          resources held by the object (file handles, sockets, native memory, etc.).
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">The resource-defer form</strong> — the syntax{' '}
          <InlineCode>defer variable: Type = expression;</InlineCode> declares a variable, initializes it,
          and registers a deferred call to <InlineCode>Dispose()</InlineCode> on that variable. The compiler
          validates at compile time that the variable's type implements <InlineCode>IDisposable</InlineCode>.
        </Bullet>
      </ScrollReveal>

      {/* IDisposable interface -------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>The IDisposable Interface</H2>
        <Prose>
          <InlineCode>IDisposable</InlineCode> is defined in the standard library as an interface with a single
          parameterless method:
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Member</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Signature</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[#1E1E2E]">
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">Dispose</td>
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">func Dispose() -&gt; void</td>
                <td className="px-4 py-3 text-sm text-text-secondary">Releases all resources held by the instance. Called exactly once by the defer mechanism.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Prose>
          Any class or struct that holds native resources, I/O handles, or other non-memory assets should
          implement <InlineCode>IDisposable</InlineCode>. The standard library itself uses it pervasively:
          <InlineCode>FileStream</InlineCode>, <InlineCode>SocketStream</InlineCode>,{' '}
          <InlineCode>MemoryStream</InlineCode>, and <InlineCode>Socket</InlineCode> all implement the interface.
        </Prose>
        <CodeBlock code={disposableBasicCode} language="csharp" filename="disposable_basic.shard" />
      </ScrollReveal>

      {/* defer resource form ---------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>The Resource-Defer Form</H2>
        <Prose>
          The resource-defer form combines variable declaration with automatic disposal:
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Syntax</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[#1E1E2E]">
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">defer name: Type = expr;</td>
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">defer fs: FileStream = new FileStream(path, ...);</td>
              </tr>
              <tr className="bg-[#252538]">
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">defer name := expr;</td>
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">defer conn := new Connection();</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Prose>
          At compile time, the binder resolves the variable's type and checks that it is assignable to{' '}
          <InlineCode>IDisposable</InlineCode>. If the check fails, a compile-time error is emitted:{' '}
          <em>"Type declared in defer statement must implement IDisposable"</em>. The binder locates the{' '}
          <InlineCode>Dispose()</InlineCode> implementation via{' '}
          <InlineCode>FindInterfaceImplementation</InlineCode> and stores it in the defer AST node as{' '}
          <InlineCode>DisposeMethod</InlineCode>. The node is marked <InlineCode>IsResourceDefer = true</InlineCode>,
          which triggers the specialized code path during bytecode emission.
        </Prose>
        <CodeBlock code={disposableFileCode} language="csharp" filename="disposable_file.shard" />
        <Callout tone="blue" title="Compile-time safety">
          Unlike dynamic languages where forgetting to call <InlineCode>Close()</InlineCode> is a silent bug,
          ShardScript's resource-defer form is enforced at <strong className="text-text-primary">compile time</strong>.
          If the variable type does not implement <InlineCode>IDisposable</InlineCode>, the program will not compile.
        </Callout>
      </ScrollReveal>

      {/* Execution order (LIFO) ------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Execution Order (LIFO)</H2>
        <Prose>
          Resource defers follow the same LIFO (last-in, first-out) order as regular defers. When multiple
          resources are declared with <InlineCode>defer</InlineCode>, they are disposed in reverse order
          — the most recently acquired resource is released first. This mirrors the natural nesting
          pattern: inner resources depend on outer resources, so inner resources must be cleaned up before
          the outer ones.
        </Prose>
        <CodeBlock code={disposableMultiCode} language="csharp" filename="disposable_multi.shard" />
        <Callout tone="green" title="Scope-level ordering">
          Within a single scope, defers execute in reverse declaration order. Across nested scopes, defers
          from the inner scope drain first, then the outer scope's defers. This is identical to the
          behavior described in \u00a73.5 (Defer).
        </Callout>
      </ScrollReveal>

      {/* Resource defer in async functions ------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Resource Defer in Async Functions</H2>
        <Prose>
          Resource defers work identically in <InlineCode>async</InlineCode> functions. The async state
          machine preserves the defer registration across <InlineCode>await</InlineCode> suspension
          points. When the async method completes (normally or via exception), the state machine drains
          all pending defers, calling <InlineCode>Dispose()</InlineCode> on each resource variable.
        </Prose>
        <Prose>
          During async bytecode emission, the <InlineCode>AsyncEmissionPass</InlineCode> handles resource
          defers identically to regular defers: the defer expression body is emitted into the{' '}
          <InlineCode>MoveNext</InlineCode> method, with <InlineCode>LOADVARIABLE</InlineCode> targeting the
          resource variable followed by a direct <InlineCode>CALLMETHODSYMBOL</InlineCode> to the resolved{' '}
          <InlineCode>Dispose()</InlineCode> implementation. The defer registration is re-emitted on every
          resume path, ensuring the resource is disposed regardless of which await point the method was
          suspended at.
        </Prose>
        <CodeBlock code={disposableAsyncCode} language="csharp" filename="disposable_async.shard" />
        <Callout tone="amber" title="Defer before await">
          When a resource variable is declared before <InlineCode>await</InlineCode>, the defer is
          registered immediately. If an exception is thrown before the first await, or if the async
          method is cancelled, the defers that were registered on entry still execute —{' '}
          <InlineCode>Dispose()</InlineCode> is called for each resource that was successfully acquired.
        </Callout>
      </ScrollReveal>

      {/* Bytecode emission ------------------------------------------ */}
      <ScrollReveal delay={0.05}>
        <H2>Bytecode Emission</H2>
        <Prose>
          The resource-defer form compiles to the same bytecode pattern as a regular defer expression,
          but the expression body is a hardcoded sequence rather than a user-provided statement:
        </Prose>
        <Bullet>
          <strong className="text-text-primary">DEFER &lt;offset&gt;</strong> — pushes the defer target
          address onto the frame's defer stack, with the bytecode offset pointing to the dispose call.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">JUMP &lt;skip&gt;</strong> — jumps over the dispose
          body during normal forward execution (it is only executed when defers are drained).
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">LOADVARIABLE slot</strong> — loads the resource variable
          onto the evaluation stack so it becomes the <InlineCode>this</InlineCode> argument for the
          method call.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">CALLMETHODSYMBOL</strong> — invokes the resolved{' '}
          <InlineCode>Dispose()</InlineCode> implementation directly. This is an ordinary method call —
          there is no interface dispatch overhead for a compile-time-resolved concrete implementation.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">DEFER_BREAK</strong> — marks the end of the defer
          expression; execution returns to the defer-drain loop.
        </Bullet>
        <Prose>
          For synchronous methods this is emitted by <InlineCode>AbstractEmiter::EmitDefer</InlineCode>.
          For async methods, <InlineCode>AsyncEmissionPass</InlineCode> emits the identical pattern
          into the <InlineCode>MoveNext</InlineCode> method body.
        </Prose>
        <Callout tone="blue" title="Zero overhead">
          Because the <InlineCode>Dispose()</InlineCode> implementation is resolved at compile time
          and stored directly in the defer node, the resource-defer form compiles to a direct method
          call — no interface dispatch, no virtual table lookup. This is a zero-cost abstraction
          relative to manually calling <InlineCode>Dispose()</InlineCode> at the end of the scope.
        </Callout>
      </ScrollReveal>

      {/* Runtime behavior ------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Runtime Behavior</H2>
        <Prose>
          Resource defers are drained via the same <InlineCode>DrainDefersTo</InlineCode> function used
          for regular defers. The runtime does not distinguish between a resource-defer and an
          expression-defer — both are just bytecode targets in the defer stack. The differentiation
          happened at compile time, when the emitter chose to emit <InlineCode>Dispose()</InlineCode>{' '}
          call bytes rather than arbitrary user code.
        </Prose>
        <Prose>
          Draining occurs at three points:
        </Prose>
        <Bullet>
          <strong className="text-text-primary">Normal scope exit.</strong> When the instruction pointer
          reaches a <InlineCode>DEFER_DRAIN</InlineCode> opcode (emitted at block boundaries and before
          return), all defers registered since scope entry are executed.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">Early return.</strong> Before the <InlineCode>RETURN</InlineCode>{' '}
          opcode executes, <InlineCode>DrainDefersTo(frame, 0)</InlineCode> empties the entire defer
          stack for the current frame.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">Exception unwinding.</strong> During{' '}
          <InlineCode>HandleExceptionInFrame</InlineCode>, defers are drained to each catch handler's
          baseline, then to zero if the exception propagates upward. Resource defers are guaranteed to
          execute regardless of how far the exception travels.
        </Bullet>
        <Callout tone="amber" title="Double-dispose">
          The runtime calls <InlineCode>Dispose()</InlineCode> exactly once per resource-defer
          registration. However, if user code also calls <InlineCode>Dispose()</InlineCode> manually on
          the same instance, the <InlineCode>Dispose()</InlineCode> method will be invoked twice. It is
          the implementor's responsibility to make <InlineCode>Dispose()</InlineCode> idempotent when
          required — typically by setting a flag on the first call and checking it on subsequent calls.
        </Callout>
      </ScrollReveal>

      {/* Standard library adopters ---------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Standard Library Adopters</H2>
        <Prose>
          The following standard-library types implement <InlineCode>IDisposable</InlineCode>:
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Type</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Namespace</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">What Dispose() releases</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[#1E1E2E]">
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">FileStream</td>
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">filesystem</td>
                <td className="px-4 py-3 text-sm text-text-secondary">Closes the underlying OS file handle.</td>
              </tr>
              <tr className="bg-[#252538]">
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">SocketStream</td>
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">net</td>
                <td className="px-4 py-3 text-sm text-text-secondary">Disassociates from the socket (does not close the socket itself).</td>
              </tr>
              <tr className="bg-[#1E1E2E]">
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">MemoryStream</td>
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">io</td>
                <td className="px-4 py-3 text-sm text-text-secondary">Releases the internal byte buffer.</td>
              </tr>
              <tr className="bg-[#252538]">
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">Socket</td>
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">net</td>
                <td className="px-4 py-3 text-sm text-text-secondary">Closes the OS socket descriptor.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Prose>
          Any user-defined type can implement <InlineCode>IDisposable</InlineCode> to participate in the
          resource-defer mechanism. The contract is minimal — a single <InlineCode>Dispose()</InlineCode>{' '}
          method with no parameters and no return value.
        </Prose>
      </ScrollReveal>
    </div>
  )
}

/* ===== ASYNCHRONOUS PROGRAMMING: TASK & VALUETASK ===== */

function TaskValueTaskContent() {
  const taskFields: [string, string, string][] = [
    ['_state', 'int', 'Task lifecycle state: 0 = PENDING, 1 = COMPLETED, 2 = FAULTED.'],
    ['_continuation', 'IAsyncState', 'The state-machine callback (MoveNext) to invoke when the task completes. Set by OnCompleted().'],
    ['_exception', 'IThrowable', 'The captured exception when the task is FAULTED. Set by SetException().'],
  ]

  const valueTaskFields: [string, string, string][] = [
    ['_state', 'int', 'Task lifecycle state: 0 = PENDING, 1 = COMPLETED, 2 = FAULTED.'],
    ['_result', 'T', 'The result value when the task is COMPLETED. Set by SetResult().'],
    ['_continuation', 'IAsyncState', 'The state-machine callback (MoveNext) to invoke when the task completes. Set by OnCompleted().'],
    ['_exception', 'IThrowable', 'The captured exception when the task is FAULTED. Set by SetException().'],
  ]

  const taskMethods: [string, string, string][] = [
    ['MoveNext()', 'IAsyncState', 'Resumes the continuation stored in _continuation. Called by the event loop when the task completes.'],
    ['IsCompleted : bool', 'IAwaiter', 'Returns true if _state != PENDING. Used by the await fast-path to detect synchronous completion.'],
    ['GetAwaiter() : IAwaiter', 'IAwaitable', 'Returns this (self-awaiter). Task implements IAwaiter directly.'],
    ['GetResult() : any', 'IAwaiter', 'If FAULTED, re-throws the stored exception. Otherwise returns null (non-generic Task has no result).'],
    ['OnCompleted(continuation)', 'IAwaiter', 'Stores continuation in _continuation. If already completed/faulted, resumes immediately.'],
    ['Complete()', 'Internal', 'Sets _state = COMPLETED, releases FrameOwner, resumes continuation, and unroots the task.'],
    ['SetException(exception)', 'Internal', 'Sets _state = FAULTED, stores exception, releases FrameOwner, resumes continuation, and unroots.'],
  ]

  const staticMethods: [string, string, string][] = [
    ['Wait(task)', 'void', 'Cooperatively blocks the calling thread by running the event loop until the task is no longer PENDING. If FAULTED, re-throws the exception.'],
    ['Delay(ms)', 'Task', 'Creates a Task that completes after the given milliseconds via a libuv timer. Returns immediately.'],
    ['Shoot(task)', 'void', 'Marks the task as fire-and-forget — releases its FrameOwner so the caller is not blocked. The task still runs to completion.'],
    ['InternalRoot(task)', 'void', 'Increments the reference count and registers the task in the event loop rooted-tasks list. Called by the factory.'],
  ]

  const valueTaskMethods: [string, string, string][] = [
    ['Result : T', 'N/A', 'Read-only property returning the stored result. Call only after Wait() or when IsCompleted is true.'],
    ['SetResult(value)', 'Internal', 'Sets _state = COMPLETED, stores value in _result, releases FrameOwner, resumes continuation, and unroots.'],
    ['FromResult(value)', 'ValueTask<T>', 'Static factory returning an already-completed ValueTask<T> with the given value. No allocation, no event-loop wait.'],
  ]

  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          ShardScript provides two task types for async programming:{' '}
          <InlineCode>Task</InlineCode> for void-returning async operations, and{' '}
          <InlineCode>ValueTask&lt;T&gt;</InlineCode> for operations that produce a value. Both implement
          the same three interfaces — <InlineCode>IAsyncState</InlineCode>, <InlineCode>IAwaitable</InlineCode>,{' '}
          and <InlineCode>IAwaiter</InlineCode> — which means they can be awaited, waited on, and used
          as continuations in the event loop infrastructure.
        </Prose>
        <Prose>
          The key distinction: <InlineCode>Task</InlineCode> has no result field (it signals completion
          or failure), while <InlineCode>ValueTask&lt;T&gt;</InlineCode> carries a typed result. Both share
          the same lifecycle —{' '}
          <InlineCode>PENDING</InlineCode> → <InlineCode>COMPLETED</InlineCode> or{' '}
          <InlineCode>PENDING</InlineCode> → <InlineCode>FAULTED</InlineCode> — managed through the{' '}
          <InlineCode>_state</InlineCode> field with <InlineCode>AsyncState</InlineCode> enum values.
        </Prose>
        <Callout tone="green" title="Self-aWaiters">
          Both <InlineCode>Task</InlineCode> and <InlineCode>ValueTask&lt;T&gt;</InlineCode> are self-awaiters:{' '}
          <InlineCode>GetAwaiter()</InlineCode> returns <InlineCode>this</InlineCode>. There is no separate
          awaiter object. This avoids an allocation on every await.
        </Callout>
      </ScrollReveal>

      {/* Task --------------------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Task</H2>
        <Prose>
          <InlineCode>Task</InlineCode> is a class in the <InlineCode>async</InlineCode> namespace. It is
          the return type for async methods that perform work but produce no value. It implements three
          interfaces:
        </Prose>
        <Bullet>
          <strong className="text-text-primary">IAsyncState</strong> — provides <InlineCode>MoveNext()</InlineCode>,
          which resumes the continuation stored in <InlineCode>_continuation</InlineCode>. The event loop
          calls this when a pending I/O or timer operation completes.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">IAwaitable</strong> — provides <InlineCode>GetAwaiter()</InlineCode>,
          which returns <InlineCode>this</InlineCode> (self-awaiter). This is the entry point the compiler
          uses when emitting <InlineCode>await</InlineCode> bytecode.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">IAwaiter</strong> — provides the await pattern:
          <InlineCode>IsCompleted</InlineCode> for the fast-path check,{' '}
          <InlineCode>OnCompleted(continuation)</InlineCode> to register the callback, and{' '}
          <InlineCode>GetResult()</InlineCode> to propagate exceptions after completion.
        </Bullet>
      </ScrollReveal>

      {/* Task Fields -------------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Task Fields</H2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Field</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Type</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Purpose</th>
              </tr>
            </thead>
            <tbody>
              {taskFields.map(([name, type, desc], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{type}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollReveal>

      {/* Task Instance Methods --------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Task Instance Methods</H2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Method</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Interface</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              {taskMethods.map(([name, iface, desc], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{iface}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CodeBlock code={taskBasicCode} language="csharp" filename="task_basic.shard" />
      </ScrollReveal>

      {/* Task Static Members ----------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Task Static Members</H2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Method</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Return</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              {staticMethods.map(([name, ret, desc], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{ret}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CodeBlock code={taskDelayApiCode} language="csharp" filename="task_delay.shard" />
      </ScrollReveal>

      {/* Task.Shoot() - Fire and Forget ----------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Task.Shoot() — Fire and Forget</H2>
        <Prose>
          <InlineCode>Task.Shoot(task)</InlineCode> marks a task as <strong className="text-text-primary">fire-and-forget</strong>.
          It sets <InlineCode>task.IsFireAndForget = true</InlineCode> and calls{' '}
          <InlineCode>ReleaseFrameOwner()</InlineCode>, breaking the link between the task and the
          calling frame. The task continues to execute independently — it is kept alive by the
          event loop's rooted-tasks list while pending — but the caller does not wait for it.
        </Prose>
        <Prose>
          Fire-and-forget tasks are suitable for logging, telemetry, cache warming, and other
          background work where the caller does not need the result and can tolerate the task
          running past the program's nominal end. At shutdown,{' '}
          <InlineCode>VirtualMachine::HaltFireAndForgetTasks()</InlineCode> iterates all heap
          instances with <InlineCode>IsFireAndForget = true</InlineCode> and terminates them
          cleanly before the VM is destroyed.
        </Prose>
        <CodeBlock code={taskShootCode} language="csharp" filename="task_shoot.shard" />
        <Callout tone="amber" title="Shoot does not cancel">
          <InlineCode>Shoot()</InlineCode> only releases the caller's hold on the task. It does
          not cancel the task or prevent it from completing. If the program's <InlineCode>Main</InlineCode>{' '}
          exits before the task completes, the VM's <InlineCode>Run()</InlineCode> method calls{' '}
          <InlineCode>HaltFireAndForgetTasks()</InlineCode> to ensure all fire-and-forget tasks
          are terminated.
        </Callout>
      </ScrollReveal>

      {/* Task.Wait() Internals --------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Task.Wait() Internals</H2>
        <Prose>
          <InlineCode>Wait()</InlineCode> is available both as an instance method and a static method
          (the global <InlineCode>Wait(task)</InlineCode> function delegates to the same C++ callback).
          Internally, <InlineCode>shard_async_Task_Wait</InlineCode>:
        </Prose>
        <Bullet>
          <strong className="text-text-primary">Polls the state.</strong> Reads <InlineCode>_state</InlineCode>{' '}
          via <InlineCode>GetTaskState</InlineCode>. If <InlineCode>PENDING</InlineCode>, enters a{' '}
          <InlineCode>while</InlineCode> loop.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">Pumps the event loop.</strong> Each iteration calls{' '}
          <InlineCode>loop.RunOnce()</InlineCode> (<InlineCode>UV_RUN_ONCE</InlineCode>), which processes
          one batch of libuv events. Any continuations that fire during this call execute synchronously
          on the same thread.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">Detects fault.</strong> When the state is no longer{' '}
          <InlineCode>PENDING</InlineCode>, it checks for <InlineCode>FAULTED</InlineCode>. If faulted,
          it reads <InlineCode>_exception</InlineCode>, increments its reference, and sets the calling
          frame's interruption to <InlineCode>ExceptionRaised</InlineCode> — causing the exception to
          propagate as if it were thrown directly in the caller.
        </Bullet>
        <Callout tone="blue" title="Instance vs Static">
          <InlineCode>task.Wait()</InlineCode> (instance) and <InlineCode>Task.Wait(task)</InlineCode>{' '}
          (static) both call the same C++ function. There is also a global <InlineCode>Wait(task)</InlineCode>{' '}
          function available without namespace qualification. All three are equivalent.
        </Callout>
      </ScrollReveal>

      {/* ValueTask<T> ------------------------------------------------------ */}
      <ScrollReveal delay={0.05}>
        <H2>ValueTask&lt;T&gt;</H2>
        <Prose>
          <InlineCode>ValueTask&lt;T&gt;</InlineCode> is a generic class in the{' '}
          <InlineCode>async</InlineCode> namespace with a single type parameter <InlineCode>T</InlineCode>.
          It extends the <InlineCode>Task</InlineCode> pattern with a typed result value. It implements
          the same three interfaces and follows the same lifecycle, but adds a <InlineCode>_result</InlineCode>{' '}
          field and a <InlineCode>Result</InlineCode> property to expose the typed result.
        </Prose>
      </ScrollReveal>

      {/* ValueTask Fields -------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>ValueTask&lt;T&gt; Fields</H2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Field</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Type</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Purpose</th>
              </tr>
            </thead>
            <tbody>
              {valueTaskFields.map(([name, type, desc], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{type}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollReveal>

      {/* ValueTask Methods ------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>ValueTask&lt;T&gt; Methods</H2>
        <Prose>
          <InlineCode>ValueTask&lt;T&gt;</InlineCode> shares <InlineCode>MoveNext()</InlineCode>,{' '}
          <InlineCode>IsCompleted</InlineCode>, <InlineCode>OnCompleted()</InlineCode>,{' '}
          <InlineCode>GetResult()</InlineCode>, and <InlineCode>Wait()</InlineCode> with{' '}
          <InlineCode>Task</InlineCode> — they follow the same pattern but read/write the
          ValueTask-specific field symbols. The following methods are unique to{' '}
          <InlineCode>ValueTask&lt;T&gt;</InlineCode>:
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Method</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Kind</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              {valueTaskMethods.map(([name, kind, desc], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{kind}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CodeBlock code={valueTaskBasicCode} language="csharp" filename="valuetask_basic.shard" />
      </ScrollReveal>

      {/* ValueTask.FromResult() -------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>ValueTask.FromResult() — Synchronous Completion</H2>
        <Prose>
          <InlineCode>ValueTask.FromResult&lt;T&gt;(value)</InlineCode> is a static factory that returns
          an already-completed <InlineCode>ValueTask&lt;T&gt;</InlineCode>. The returned task has{' '}
          <InlineCode>_state = COMPLETED</InlineCode> and <InlineCode>_result = value</InlineCode>. Since
          the task is never <InlineCode>PENDING</InlineCode>, awaiting it hits the{' '}
          <InlineCode>IsCompleted</InlineCode> fast-path and resolves synchronously — no allocation
          for an awaiter, no event-loop pumping.
        </Prose>
        <Prose>
          Internally, <InlineCode>shard_async_ValueTask_FromResult</InlineCode> calls the templated{' '}
          <InlineCode>CompletedValueTask</InlineCode> helper from <InlineCode>NativeAsync.inl</InlineCode>,
          which allocates a <InlineCode>ValueTask&lt;T&gt;</InlineCode> instance, writes the value, and
          marks it completed.
        </Prose>
        <CodeBlock code={valueTaskFromResultCode} language="csharp" filename="valuetask_fromresult.shard" />
        <Callout tone="green" title="Synchronous fast path">
          When <InlineCode>ValueTask.FromResult</InlineCode> is used as an argument to an{' '}
          <InlineCode>await</InlineCode> expression, the compiler's await suspension sequence detects{' '}
          <InlineCode>IsCompleted == true</InlineCode> and jumps directly to the resume segment —
          bypassing <InlineCode>OnCompleted</InlineCode>, <InlineCode>_state</InlineCode> update, and{' '}
          <InlineCode>RETURN</InlineCode> entirely. This is the zero-overhead path for cached or
          pre-computed results.
        </Callout>
      </ScrollReveal>

      {/* Comparison Table -------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Task vs ValueTask&lt;T&gt;</H2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Feature</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Task</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">ValueTask&lt;T&gt;</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[#1E1E2E]">
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">Type parameters</td>
                <td className="px-4 py-3 text-sm text-text-secondary">None</td>
                <td className="px-4 py-3 text-sm text-text-secondary">One: <InlineCode>T</InlineCode></td>
              </tr>
              <tr className="bg-[#252538]">
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">Result value</td>
                <td className="px-4 py-3 text-sm text-text-secondary">None (void)</td>
                <td className="px-4 py-3 text-sm text-text-secondary">Typed: <InlineCode>T</InlineCode></td>
              </tr>
              <tr className="bg-[#1E1E2E]">
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">Fields</td>
                <td className="px-4 py-3 text-sm text-text-secondary">_state, _continuation, _exception</td>
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">_state, _result, _continuation, _exception</td>
              </tr>
              <tr className="bg-[#252538]">
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">Completion</td>
                <td className="px-4 py-3 text-sm text-text-secondary"><InlineCode>Complete()</InlineCode> (no argument)</td>
                <td className="px-4 py-3 text-sm text-text-secondary"><InlineCode>SetResult(value)</InlineCode> (stores typed value)</td>
              </tr>
              <tr className="bg-[#1E1E2E]">
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">Result access</td>
                <td className="px-4 py-3 text-sm text-text-secondary"><InlineCode>GetResult()</InlineCode> (exception propagation only)</td>
                <td className="px-4 py-3 text-sm text-text-secondary"><InlineCode>Result</InlineCode> property + <InlineCode>GetResult()</InlineCode></td>
              </tr>
              <tr className="bg-[#252538]">
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">Synchronous completion</td>
                <td className="px-4 py-3 text-sm text-text-secondary">N/A</td>
                <td className="px-4 py-3 text-sm text-text-secondary"><InlineCode>FromResult(value)</InlineCode> static factory</td>
              </tr>
              <tr className="bg-[#1E1E2E]">
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">Fire-and-forget</td>
                <td className="px-4 py-3 text-sm text-text-secondary"><InlineCode>Task.Shoot(task)</InlineCode></td>
                <td className="px-4 py-3 text-sm text-text-secondary"><InlineCode>Task.Shoot&lt;T&gt;(task)</InlineCode></td>
              </tr>
            </tbody>
          </table>
        </div>
      </ScrollReveal>

      {/* Lifecycle --------------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Lifecycle and Rooting</H2>
        <Prose>
          Both task types follow the same lifecycle managed by the event loop's rooting mechanism:
        </Prose>
        <Bullet>
          <strong className="text-text-primary">Creation.</strong> The async method factory creates the
          task object (<InlineCode>new Task()</InlineCode> or <InlineCode>new ValueTask&lt;T&gt;()</InlineCode>)
          and calls <InlineCode>InternalRoot()</InlineCode>, which sets <InlineCode>IsTaskLike = true</InlineCode>{' '}
          and calls <InlineCode>EventLoop::RootTask(task)</InlineCode>. This increments the reference
          count and adds the task to the loop's <InlineCode>m_rootedTasks</InlineCode> vector. The task
          now survives even if no script-level variable references it.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">Pending phase.</strong> The task is in{' '}
          <InlineCode>PENDING</InlineCode> state. It holds a <InlineCode>FrameOwner</InlineCode>{' '}
          shared pointer to the creating frame, keeping the async stack alive. The continuation
          field is null until <InlineCode>OnCompleted()</InlineCode> is called.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">Completion.</strong> <InlineCode>Complete()</InlineCode>{' '}
          or <InlineCode>SetResult()</InlineCode> transitions the state to{' '}
          <InlineCode>COMPLETED</InlineCode>, calls <InlineCode>ReleaseFrameOwner()</InlineCode>, and
          invokes <InlineCode>ResumeContinuation</InlineCode>. <InlineCode>UnrootTask()</InlineCode>{' '}
          releases the event-loop reference. If the task is fire-and-forget, the frame owner was
          already released by <InlineCode>Shoot()</InlineCode>.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">Fault.</strong> <InlineCode>SetException()</InlineCode>{' '}
          transitions to <InlineCode>FAULTED</InlineCode>, stores the exception, and follows the
          same unrooting path. When <InlineCode>Wait()</InlineCode> or <InlineCode>GetResult()</InlineCode>{' '}
          encounters a <InlineCode>FAULTED</InlineCode> task, it re-throws the stored exception
          by raising <InlineCode>ExceptionRaised</InlineCode> on the calling frame.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">Garbage collection.</strong> After <InlineCode>UnrootTask</InlineCode>{' '}
          decrements the reference count, the task is eligible for collection. The GC processes
          it like any other <InlineCode>ObjectInstance</InlineCode> — cascading through reference-typed
          fields (<InlineCode>_exception</InlineCode>, <InlineCode>_continuation</InlineCode>,{' '}
          <InlineCode>_result</InlineCode> for ValueTask) and freeing the raw memory.
        </Bullet>
      </ScrollReveal>

      {/* Awaiter Interface Conformance ------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Awaiter Interface Conformance</H2>
        <Prose>
          Both task types conform to the <InlineCode>IAwaiter</InlineCode> interface. The three methods
          that form the await contract are implemented as native external callbacks:
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">IAwaiter method</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Task callback</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">ValueTask callback</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[#1E1E2E]">
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">IsCompleted</td>
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">shard_async_Task_IsCompleted_get</td>
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">shard_async_ValueTask_IsCompleted_get</td>
              </tr>
              <tr className="bg-[#252538]">
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">OnCompleted</td>
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">shard_async_Task_OnCompleted</td>
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">shard_async_ValueTask_OnCompleted</td>
              </tr>
              <tr className="bg-[#1E1E2E]">
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">GetResult</td>
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">shard_async_Task_GetResult</td>
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">shard_async_ValueTask_GetResult</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Prose>
          <InlineCode>OnCompleted</InlineCode> has a special property: if the task is already completed
          or faulted when <InlineCode>OnCompleted</InlineCode> is called (the continuation arrived after
          the task finished), it immediately resumes the continuation rather than storing it. This
          handles the race between completion and continuation registration in the event loop.
        </Prose>
      </ScrollReveal>
    </div>
  )
}

/* ===== ASYNCHRONOUS PROGRAMMING: CANCELLATION ===== */

function CancellationTokenContent() {
  const fields = [
    ['_source', 'CancellationTokenSource', 'Back-reference to the issuing source (null if default).'],
  ]
  const props = [
    ['IsCancellationRequested', 'bool', 'Returns true after the source has signaled cancellation.'],
    ['CanBeCanceled', 'bool', 'Returns true if the token is linked to a valid source.'],
  ]
  const sourceMethods = [
    ['Cancel()', 'void', 'Signals cancellation; all linked tokens immediately report IsCancellationRequested = true.'],
  ]
  const sourceProps = [
    ['Token', 'CancellationToken', 'Returns the token managed by this source. Created during construction.'],
  ]

  return (
    <div className="space-y-10">
      {/* Overview */}
      <ScrollReveal>
        <Prose>
          ShardScript provides a <strong>cooperative cancellation model</strong> centered on two
          types in the <InlineCode>async</InlineCode> namespace: <InlineCode>CancellationTokenSource</InlineCode>{' '}
          (the signaling side) and <InlineCode>CancellationToken</InlineCode> (the listening side).
          Cancellation is purely cooperative — the token must be polled; no thread or fiber is
          forcibly aborted. The model is designed to integrate seamlessly with the event loop
          and async state machines.
        </Prose>
      </ScrollReveal>

      {/* CancellationTokenSource */}
      <ScrollReveal delay={0.05}>
        <H2>CancellationTokenSource</H2>
        <Prose>
          The <InlineCode>CancellationTokenSource</InlineCode> is the active side of the pair.
          Construction creates a linked <InlineCode>CancellationToken</InlineCode> (accessible via{' '}
          <InlineCode>.Token</InlineCode>). Calling <InlineCode>Cancel()</InlineCode> sets an internal{' '}
          <InlineCode>_canceled</InlineCode> flag (<InlineCode>int</InlineCode>, 0→1), which all linked
          tokens observe.
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Member</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Return</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              {sourceMethods.map(([name, ret, desc], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{ret}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
              {sourceProps.map(([name, ret, desc], i) => (
                <tr key={name} className={(i + sourceMethods.length) % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{ret}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CodeBlock code={cancellationTokenBasicCode} language="csharp" filename="cancellation_basic.shard" />
      </ScrollReveal>

      {/* CancellationToken */}
      <ScrollReveal delay={0.05}>
        <H2>CancellationToken</H2>
        <Prose>
          The <InlineCode>CancellationToken</InlineCode> is a lightweight value-type (in the
          ShardScript sense — a class instance under the hood) that holds a back-reference to
          its issuing <InlineCode>CancellationTokenSource</InlineCode>. Multiple tokens can
          reference the same source; a single <InlineCode>Cancel()</InlineCode> call propagates
          to all of them.
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Field</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Type</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              {fields.map(([name, type, desc], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{type}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Property</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Return</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              {props.map(([name, ret, desc], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{ret}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollReveal>

      {/* Cooperative Polling */}
      <ScrollReveal delay={0.05}>
        <H2>Cooperative Polling in Async Loops</H2>
        <Prose>
          The primary usage pattern is a polling loop inside an <InlineCode>async func</InlineCode>.
          The token's <InlineCode>IsCancellationRequested</InlineCode> property is checked on each
          iteration. When the source signals cancellation, the loop exits and the method returns
          cleanly.
        </Prose>
        <CodeBlock code={cancellationTokenPollCode} language="csharp" filename="cancellation_poll.shard" />
        <Callout tone="blue">
          The polling check is extremely cheap: reading <InlineCode>IsCancellationRequested</InlineCode>{' '}
          traverses <InlineCode>token → _source → _canceled</InlineCode> — three pointer dereferences
          and one integer comparison. There is no lock, no allocation, and no system call on the
          polling path.
        </Callout>
      </ScrollReveal>

      {/* I/O Integration */}
      <ScrollReveal delay={0.05}>
        <H2>I/O Integration</H2>
        <Prose>
          All async I/O methods in the standard library (<InlineCode>FileStream.ReadAsync</InlineCode>,{' '}
          <InlineCode>SocketStream.ReadAsync</InlineCode>, <InlineCode>MemoryStream.ReadAsync</InlineCode>,
          etc.) accept an optional <InlineCode>CancellationToken</InlineCode> parameter. The
          cancellation is checked at <strong>three points</strong> during each operation:
        </Prose>
        <div className="space-y-5">
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">1</span>
              <strong className="text-text-primary text-sm">Fast-Path (Before Dispatch)</strong>
            </div>
            <Prose>
            Before the async operation is dispatched to the thread pool or libuv, the token is
            checked. If cancellation has already been signaled, the method returns a{' '}
            <InlineCode>FAULTED</InlineCode> task immediately — no I/O is initiated. This is a
            zero-cost bail-out.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">2</span>
              <strong className="text-text-primary text-sm">Inside the Worker Callback</strong>
            </div>
            <Prose>
            The token is checked again inside the thread-pool callback, before the actual I/O
            work is performed. If the token was cancelled between dispatch and execution, the
            callback sets a <InlineCode>Canceled</InlineCode> flag on the shared state and skips
            the I/O entirely.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">3</span>
              <strong className="text-text-primary text-sm">In the Completion Callback</strong>
            </div>
            <Prose>
            After the thread-pool or libuv callback completes, the completion handler checks the
            token one final time before calling <InlineCode>Complete()</InlineCode> on the task.
            If cancellation was signaled at any point, <InlineCode>async.Fail("Operation canceled.")</InlineCode>{' '}
            is called instead, which sets the task to <InlineCode>FAULTED</InlineCode> with a{' '}
            <InlineCode>RuntimeException</InlineCode>.
            </Prose>
          </div>
        </div>
        <CodeBlock code={cancellationTokenFileCode} language="csharp" filename="cancellation_file.shard" />
      </ScrollReveal>

      {/* Multiple Tokens */}
      <ScrollReveal delay={0.05}>
        <H2>Multiple Cancellation Sources</H2>
        <Prose>
          An async method can accept multiple tokens from different sources. The method polls
          all of them in its loop condition. The first source to signal cancellation wins; the
          method can inspect which token fired to differentiate the shutdown path.
        </Prose>
        <CodeBlock code={cancellationTokenMultiCode} language="csharp" filename="cancellation_multi.shard" />
      </ScrollReveal>

      {/* Internal Mechanics */}
      <ScrollReveal delay={0.05}>
        <H2>Internal Mechanics</H2>
        <div className="space-y-5">
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">1</span>
              <strong className="text-text-primary text-sm">Source → Token Linkage</strong>
            </div>
            <Prose>
            During <InlineCode>CancellationTokenSource</InlineCode> construction (<InlineCode>Init</InlineCode>),
            the source allocates a new <InlineCode>CancellationToken</InlineCode> instance via{' '}
            <InlineCode>AllocateInstance</InlineCode> and cross-links them: the token's{' '}
            <InlineCode>_source</InlineCode> field points to the source, and the source's{' '}
            <InlineCode>_token</InlineCode> field points to the token. The source's{' '}
            <InlineCode>_canceled</InlineCode> field is initialized to <InlineCode>0</InlineCode> (false).
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">2</span>
              <strong className="text-text-primary text-sm">Cancel() Execution</strong>
            </div>
            <Prose>
            <InlineCode>Cancel()</InlineCode> writes <InlineCode>1</InlineCode> into the{' '}
            <InlineCode>_canceled</InlineCode> field via <InlineCode>SetField</InlineCode>. No
            callbacks, no event notifications — just a single integer write. All tokens linked
            to this source immediately see the change because they read the same field via{' '}
            <InlineCode>GetField → AsInteger</InlineCode>.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">3</span>
              <strong className="text-text-primary text-sm">IsCancellationRequested Resolution</strong>
            </div>
            <Prose>
            The property getter performs three defensive checks: (1) the <InlineCode>_source</InlineCode>
            reference is non-null and not <InlineCode>NullInstance</InlineCode>, (2) the source's
            type equals <InlineCode>CancellationTokenSource</InlineCode> (type-safety guard), and
            (3) the <InlineCode>_canceled</InlineCode> value is non-null and non-zero. If any
            check fails, the result is <InlineCode>false</InlineCode> — a default (unlinked) token
            can never be cancelled.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">4</span>
              <strong className="text-text-primary text-sm">FaultedTask Creation</strong>
            </div>
            <Prose>
            When I/O operations detect cancellation, they call <InlineCode>FaultedTask(context, "Operation canceled.")</InlineCode>.
            This allocates a <InlineCode>Task</InlineCode> or <InlineCode>ValueTask&lt;int&gt;</InlineCode>,
            sets its state to <InlineCode>FAULTED</InlineCode>, and stores a{' '}
            <InlineCode>RuntimeException</InlineCode> with the message{' '}
            <InlineCode>"Operation canceled."</InlineCode> in the task's{' '}
            <InlineCode>_exception</InlineCode> field. When the caller{' '}
            <InlineCode>await</InlineCode>s this task, the await machinery detects{' '}
            <InlineCode>FAULTED</InlineCode> and re-throws the exception.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">5</span>
              <strong className="text-text-primary text-sm">Cooperative Model (No uv_cancel)</strong>
            </div>
            <Prose>
            ShardScript does <strong>not</strong> call <InlineCode>uv_cancel</InlineCode> on libuv
            handles. The cancellation model is fully cooperative and works at the ShardScript
            application level, not the OS handle level. When a libuv-backed operation (e.g., a
            socket read) is already in-flight and the token fires, the operation completes
            naturally, but the completion handler sees the cancellation flag and fails the task.
            This design avoids the complexity and platform-dependent behavior of{' '}
            <InlineCode>uv_cancel</InlineCode> while remaining compatible with all I/O backends.
            </Prose>
          </div>
        </div>
      </ScrollReveal>

      {/* Summary */}
      <ScrollReveal delay={0.05}>
        <H2>Summary</H2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Mechanism</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Role</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['CancellationTokenSource', 'Active side — signals cancellation via Cancel().'],
                ['CancellationToken', 'Passive side — polled via IsCancellationRequested.'],
                ['Cooperative polling', 'Async loops check the token on each iteration.'],
                ['I/O fast-path', 'Methods return FAULTED task if token is already cancelled.'],
                ['Worker callback', 'I/O operations skip work if cancelled mid-dispatch.'],
                ['Completion callback', 'async.Fail() sets task to FAULTED if cancelled.'],
                ['No uv_cancel', 'Purely cooperative model — no OS-handle preemption.'],
              ].map(([mech, role], i) => (
                <tr key={mech} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{mech}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollReveal>
    </div>
  )
}

/* ===== ASYNCHRONOUS PROGRAMMING: STATE MACHINES ===== */

function AsyncStateMachineContent() {
  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          The <InlineCode>async</InlineCode> keyword transforms an ordinary method into an{' '}
          <strong className="text-text-primary">asynchronous method</strong> — one that can suspend
          its execution via <InlineCode>await</InlineCode> and resume later when the awaited operation
          completes. Under the hood, the compiler performs a lowering transformation into a state
          machine, but from the developer's perspective, async functions behave like normal methods
          with the addition of suspension points.
        </Prose>
        <Prose>
          Async methods must return either <InlineCode>Task</InlineCode> (for void-returning async work)
          or <InlineCode>ValueTask&lt;T&gt;</InlineCode> (for value-returning async work). The return
          type determines how callers interact with the result: <InlineCode>Task.Wait()</InlineCode> for
          void operations, or <InlineCode>.Result</InlineCode> for value-producing ones.
        </Prose>
      </ScrollReveal>

      {/* Basic syntax */}
      <ScrollReveal delay={0.05}>
        <H2>Basic Syntax</H2>
        <Prose>
          The <InlineCode>async</InlineCode> keyword is placed before <InlineCode>func</InlineCode>.
          Inside the body, <InlineCode>await</InlineCode> suspends execution until the awaited operation
          finishes. While suspended, the thread is returned to the event loop and can service other tasks.
        </Prose>
        <CodeBlock code={asyncSyntaxCode} language="csharp" filename="async_basic.shard" />
        <Callout tone="blue">
          An async method without any <InlineCode>await</InlineCode> runs synchronously but still
          returns a <InlineCode>Task</InlineCode> or <InlineCode>ValueTask&lt;T&gt;</InlineCode>.
          The compiler emits a warning if <InlineCode>async</InlineCode> is used without awaits.
        </Callout>
      </ScrollReveal>

      {/* await expressions */}
      <ScrollReveal delay={0.05}>
        <H2>await Expressions</H2>
        <Prose>
          The <InlineCode>await</InlineCode> operator works on any expression that implements the{' '}
          <InlineCode>IAwaitable</InlineCode> interface — the standard library types{' '}
          <InlineCode>Task</InlineCode> and <InlineCode>ValueTask&lt;T&gt;</InlineCode> both satisfy
          this contract. When the awaited expression has already completed (e.g., a cached{' '}
          <InlineCode>ValueTask</InlineCode>), the <InlineCode>await</InlineCode> executes without
          suspension — this is the <strong className="text-text-primary">fast path</strong>.
        </Prose>
        <Prose>
          An <InlineCode>await</InlineCode> expression evaluates to the result value of the task: for{' '}
          <InlineCode>Task</InlineCode> it evaluates to nothing (void); for{' '}
          <InlineCode>ValueTask&lt;T&gt;</InlineCode> it evaluates to <InlineCode>T</InlineCode>.
        </Prose>
      </ScrollReveal>

      {/* ValueTask<T> */}
      <ScrollReveal delay={0.05}>
        <H2>ValueTask&lt;T&gt; — Returning Values</H2>
        <Prose>
          <InlineCode>ValueTask&lt;T&gt;</InlineCode> is the typed variant for async methods that produce
          a result. The syntax is identical to <InlineCode>Task</InlineCode> except the return type
          includes the value type parameter, and a <InlineCode>return</InlineCode> statement provides
          the result value.
        </Prose>
        <CodeBlock code={asyncValueTaskCode} language="csharp" filename="async_valuetask.shard" />
        <Prose>
          On the caller side, the result is accessed via the <InlineCode>.Result</InlineCode> property
          after <InlineCode>Wait()</InlineCode> returns. If the task faulted, accessing{' '}
          <InlineCode>.Result</InlineCode> re-throws the stored exception.
        </Prose>
      </ScrollReveal>

      {/* Error handling */}
      <ScrollReveal delay={0.05}>
        <H2>Error Handling in Async Methods</H2>
        <Prose>
          Async methods support the full exception-handling model (see §3.4). A{' '}
          <InlineCode>try</InlineCode>/<InlineCode>catch</InlineCode> block can wrap{' '}
          <InlineCode>await</InlineCode> expressions, and exceptions thrown inside the awaited task
          are re-thrown at the suspension point when execution resumes.
        </Prose>
        <CodeBlock code={asyncTryCatchCode} language="csharp" filename="async_try_catch.shard" />
        <Prose>
          Unhandled exceptions inside an async method are captured and stored in the task, which
          transitions to <InlineCode>FAULTED</InlineCode>. The exception is then re-thrown when the
          caller <InlineCode>Wait</InlineCode>s on the task or accesses <InlineCode>.Result</InlineCode>.
        </Prose>
      </ScrollReveal>

      {/* Loops */}
      <ScrollReveal delay={0.05}>
        <H2>Loops with await</H2>
        <Prose>
          All loop constructs (<InlineCode>for</InlineCode>, <InlineCode>while</InlineCode>,{' '}
          <InlineCode>foreach</InlineCode>, <InlineCode>for..in</InlineCode>, <InlineCode>until</InlineCode>)
          work seamlessly with <InlineCode>await</InlineCode>. The loop resumes at the correct point
          after each suspension.
        </Prose>
        <CodeBlock code={asyncLoopCode} language="csharp" filename="async_loop.shard" />
      </ScrollReveal>

      {/* Compiler lowering summary */}
      <ScrollReveal delay={0.05}>
        <H2>Under the Hood</H2>
        <Prose>
          When the compiler encounters an <InlineCode>async func</InlineCode>, it performs a{' '}
          <strong className="text-text-primary">state-machine lowering</strong>: the method body is
          replaced by a factory that creates a compiler-generated class, and execution is split across
          segments at each <InlineCode>await</InlineCode> site. All local variables and parameters that
          must survive across suspensions are <strong className="text-text-primary">lifted</strong> into
          fields on the state-machine class.
        </Prose>
        <Prose>
          For a detailed walkthrough of the three-pass lowering pipeline, the state-machine class layout,
          the await suspension bytecode sequence, and the complete emit-time mechanics, see{' '}
          <strong className="text-text-primary">INTERNALS → Async State Machine Lowering</strong>.
        </Prose>
      </ScrollReveal>
    </div>
  )
}

/* ===== ASYNCHRONOUS PROGRAMMING: EVENT LOOP ===== */

function CooperativeMultitaskingContent() {
  const uvModes: [string, string][] = [
    ['UV_RUN_DEFAULT', 'Runs the event loop until there are no more active handles or requests. This is the mode used by Task.Wait().'],
    ['UV_RUN_ONCE', 'Polls for I/O once. If no callbacks are ready, blocks until one is. Used by Task.Wait() polling loop to process one event per iteration.'],
    ['UV_RUN_NOWAIT', 'Polls for I/O but does not block if no callbacks are ready. Used internally for non-blocking checks.'],
  ]

  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          ShardScript's asynchronous model is built on{' '}
          <strong className="text-text-primary">cooperative multitasking</strong> backed by{' '}
          <strong className="text-text-primary">libuv</strong> — the same cross-platform I/O library that
          powers Node.js. The core abstraction is the <InlineCode>EventLoop</InlineCode>, which owns a{' '}
          <InlineCode>uv_loop_t</InlineCode> and provides the engine for all timers, I/O operations,
          and async continuations.
        </Prose>
        <Prose>
          In this model, there is exactly <em>one</em> thread running ShardScript code at any time.
          Tasks never preempt each other — they yield control by returning from their bytecode loop
          at <InlineCode>await</InlineCode> points. The event loop then picks up pending I/O events
          or timer completions and resumes the appropriate continuation. This eliminates the need for
          locks, atomics, or data-race protection in user code.
        </Prose>
      </ScrollReveal>

      {/* Architecture ----------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Architecture</H2>
        <Prose>
          The <InlineCode>ApplicationDomain</InlineCode> owns a single <InlineCode>EventLoop</InlineCode>{' '}
          instance, shared by the <InlineCode>GarbageCollector</InlineCode> and{' '}
          <InlineCode>VirtualMachine</InlineCode> within that domain:
        </Prose>
        <Bullet>
          <strong className="text-text-primary">EventLoop</strong> — wraps a <InlineCode>uv_loop_t</InlineCode>.
          Provides <InlineCode>Run()</InlineCode>, <InlineCode>RunOnce()</InlineCode>, and{' '}
          <InlineCode>Stop()</InlineCode>. Manages a list of <InlineCode>m_rootedTasks</InlineCode> —
          strong references that keep pending Task objects alive while they are suspended in libuv.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">VirtualMachine</strong> — executes ShardScript bytecode
          synchronously. When it encounters an <InlineCode>await</InlineCode>, the current frame exits
          its bytecode loop, returning control to the caller. The async operation registers a libuv
          callback; when the callback fires, the continuation is invoked on the same thread.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">GarbageCollector</strong> — manages object lifetimes.
          The <InlineCode>ObjectRef</InlineCode> RAII wrapper and <InlineCode>RootTask</InlineCode>/{' '}
          <InlineCode>UnrootTask</InlineCode> ensure that task state machines are not collected while
          libuv holds a reference to them.
        </Bullet>
        <Callout tone="blue" title="Single domain, single loop">
          Each <InlineCode>ApplicationDomain</InlineCode> creates exactly one{' '}
          <InlineCode>EventLoop</InlineCode>. All VMs created in that domain share the same loop.
          This naturally serializes all async completions onto a single thread, preserving the
          cooperative model even when multiple VMs are in play.
        </Callout>
      </ScrollReveal>

      {/* The Execution Model ---------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>The Execution Model</H2>
        <Prose>
          Execution flows through three layers:
        </Prose>
        <Prose>
          <strong className="text-text-primary">1. Synchronous entry.</strong> When{' '}
          <InlineCode>VirtualMachine::Run()</InlineCode> is called, it pushes a frame for the entry
          point (<InlineCode>Main</InlineCode>) and calls <InlineCode>InvokeMethodInternal</InlineCode>.
          For bytecode methods, this enters an infinite loop that reads opcodes via{' '}
          <InlineCode>ByteCodeDecoder</InlineCode> and dispatches them through{' '}
          <InlineCode>ProcessCode</InlineCode>. The loop exits when it hits EOF (method returns),
          an exception is raised, or an <InlineCode>await</InlineCode> suspends the method.
        </Prose>
        <Prose>
          <strong className="text-text-primary">2. Await suspension.</strong> When the bytecode
          reaches an <InlineCode>await</InlineCode> expression, the compiler has lowered this into
          a sequence that:
        </Prose>
        <Bullet>
          Saves all local variables into fields on the state-machine object (a compiler-generated class).
        </Bullet>
        <Bullet>
          Registers a continuation callback with the awaitable (a <InlineCode>Task</InlineCode> or{' '}
          <InlineCode>ValueTask</InlineCode>). From the native side, this translates to a libuv
          callback stored in the task's <InlineCode>ContinuationField</InlineCode>.
        </Bullet>
        <Bullet>
          Returns from the bytecode loop — the frame is popped, and control returns to the caller
          (which is typically <InlineCode>Task.Wait()</InlineCode> or another async method).
        </Bullet>
        <Prose>
          <strong className="text-text-primary">3. Event-loop pumping.</strong> The caller — usually{' '}
          <InlineCode>Task.Wait()</InlineCode> — enters a polling loop:
        </Prose>
        <CodeBlock code={`// Pseudocode of Task.Wait() internals
while (GetTaskState(task) == AsyncState::PENDING)
    eventLoop.RunOnce();    // pump one libuv event

if (task state == FAULTED)
    rethrow the stored exception;`} language="cpp" filename="wait_pseudocode.cpp" />
        <Prose>
          Each call to <InlineCode>RunOnce()</InlineCode> delegates to libuv's{' '}
          <InlineCode>uv_run(UV_RUN_ONCE)</InlineCode>. This polls for I/O, fires expired timers,
          and invokes pending callbacks on the <em>same thread</em>. When a timer callback fires,
          it calls <InlineCode>ResumeContinuation</InlineCode>, which creates a synthetic VM frame
          and re-enters the async method's bytecode loop at the saved resume point.
        </Prose>
      </ScrollReveal>

      {/* Task.Wait() and the Cooperative Pump ----------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Task.Wait() — The Cooperative Pump</H2>
        <Prose>
          <InlineCode>Task.Wait()</InlineCode> is the bridge between synchronous code and the async
          world. It takes a <InlineCode>Task</InlineCode> and blocks the calling thread cooperatively
          — not by spinning or sleeping, but by running the event loop:
        </Prose>
        <CodeBlock code={eventLoopBasicCode} language="csharp" filename="event_loop_basic.shard" />
        <Prose>
          Inside the library, <InlineCode>shard_async_Task_Wait</InlineCode> does:
        </Prose>
        <Bullet>
          Reads the task's <InlineCode>StateField</InlineCode>. If <InlineCode>PENDING</InlineCode>,
          enters a <InlineCode>while</InlineCode> loop calling <InlineCode>loop.RunOnce()</InlineCode>.
        </Bullet>
        <Bullet>
          Each <InlineCode>RunOnce()</InlineCode> invocation processes one batch of libuv events —
          timers that expired, I/O completions, or other callbacks. Any continuations that fire
          during this call execute synchronously on the same thread before <InlineCode>RunOnce()</InlineCode>{' '}
          returns.
        </Bullet>
        <Bullet>
          When the task's state transitions to <InlineCode>COMPLETED</InlineCode> or{' '}
          <InlineCode>FAULTED</InlineCode>, the loop exits. On fault, the stored exception is
          re-thrown into the calling frame.
        </Bullet>
        <Callout tone="green" title="Cooperative, not preemptive">
          While <InlineCode>Task.Wait()</InlineCode> appears blocking from the caller's perspective,
          it is actively servicing the event loop. Other pending async operations — timers, I/O,
          even other tasks — continue to make progress during the wait. This is the essence of
          cooperative multitasking: the thread is never truly idle while there is work to do.
        </Callout>
      </ScrollReveal>

      {/* Concurrent tasks ------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Concurrent Task Execution</H2>
        <Prose>
          Because task state machines are suspended at <InlineCode>await</InlineCode> points and
          resumed by libuv callbacks, multiple tasks can be in-flight simultaneously — all
          interleaved on a single thread. Each task yields at every <InlineCode>await</InlineCode>,
          and the event loop picks the next ready continuation:
        </Prose>
        <CodeBlock code={eventLoopCooperativeCode} language="csharp" filename="event_loop_counters.shard" />
        <Prose>
          In this example, three counters start simultaneously. Each <InlineCode>await</InlineCode>{' '}
          suspends the current state machine, registers a timer with libuv, and returns to the caller.
          Each call to <InlineCode>Task.Wait()</InlineCode> pumps the event loop, processing timers
          for all three tasks. The output interleaves the counter messages in timer order rather than
          in sequential order.
        </Prose>
        <Callout tone="amber" title="Sequential Wait">
          Note that <InlineCode>t1.Wait()</InlineCode> blocks the calling{' '}
          <InlineCode>Main()</InlineCode> until <InlineCode>t1</InlineCode> completes. However,
          while waiting, the event loop is also servicing timers for <InlineCode>t2</InlineCode> and{' '}
          <InlineCode>t3</InlineCode>. By the time <InlineCode>t1.Wait()</InlineCode> returns,
          <InlineCode>t2</InlineCode> and <InlineCode>t3</InlineCode> may already be partially or
          fully complete — even though their <InlineCode>Wait()</InlineCode> calls haven't been
          reached yet.
        </Callout>
      </ScrollReveal>

      {/* Native async operations and libuv -------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Native Async Operations and libuv</H2>
        <Prose>
          Every async primitive in ShardScript is ultimately backed by a libuv handle or request.
          The <InlineCode>NativeAsync.hpp</InlineCode> API provides a C++ abstraction layer:
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">API</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Purpose</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">libuv backend</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[#1E1E2E]">
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">DoAsync(work)</td>
                <td className="px-4 py-3 text-sm text-text-secondary">Start an operation that eventually completes a Task.</td>
                <td className="px-4 py-3 text-sm text-text-secondary">Generic; uses libuv handles inside work lambda.</td>
              </tr>
              <tr className="bg-[#252538]">
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">async.Delay(ms, cb)</td>
                <td className="px-4 py-3 text-sm text-text-secondary">Schedule a callback after a delay.</td>
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">uv_timer_t</td>
              </tr>
              <tr className="bg-[#1E1E2E]">
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">async.RunOnThreadPool(work, cb)</td>
                <td className="px-4 py-3 text-sm text-text-secondary">Run blocking work on a worker thread; callback on loop thread.</td>
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">uv_work_t (thread pool)</td>
              </tr>
              <tr className="bg-[#252538]">
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">async.Await(awaitable, cb)</td>
                <td className="px-4 py-3 text-sm text-text-secondary">Chain a native callback onto a ShardScript awaitable.</td>
                <td className="px-4 py-3 text-sm text-text-secondary">Stores callback in task's continuation field.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Prose>
          All libuv callbacks execute on the <strong className="text-text-primary">same thread</strong>{' '}
          as the ShardScript code that started the operation. The callback receives access to a{' '}
          <InlineCode>VirtualMachine</InlineCode> and can call{' '}
          <InlineCode>ResumeContinuation</InlineCode> to re-enter the ShardScript bytecode loop
          at the saved resume point.
        </Prose>
        <CodeBlock code={eventLoopNativeCode} language="csharp" filename="event_loop_native.shard" />
      </ScrollReveal>

      {/* Rooting and lifetime --------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Task Rooting and Lifetime</H2>
        <Prose>
          When a <InlineCode>Task</InlineCode> is created (e.g., by calling an{' '}
          <InlineCode>async func</InlineCode>), it is initially kept alive by the caller's stack
          frame. However, once the async method suspends at an <InlineCode>await</InlineCode>, the
          task may outlive the stack frame that created it — especially if no one calls{' '}
          <InlineCode>Wait()</InlineCode> immediately. To prevent premature garbage collection:
        </Prose>
        <Bullet>
          <strong className="text-text-primary">RootTask().</strong> When an async operation registers
          a libuv callback, it calls <InlineCode>EventLoop::RootTask(task)</InlineCode>, which
          increments the task's reference count and adds it to the <InlineCode>m_rootedTasks</InlineCode>{' '}
          vector. This guarantees the task stays alive while libuv holds a pointer to it.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">UnrootTask().</strong> When the task completes or
          faults, <InlineCode>UnrootTask(task)</InlineCode> removes it from the rooted list and
          decrements the reference count. If no other references exist, the GC collects the task
          immediately.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">FrameOwner.</strong> Each task instance holds a{' '}
          <InlineCode>FrameOwner</InlineCode> shared pointer to the call stack frame that awaited it.
          This keeps the caller's frame alive across suspension, preventing the caller's local
          variables from being collected while the async operation is pending.
        </Bullet>
        <Callout tone="amber" title="Fire-and-forget with Shoot()">
          <InlineCode>Task.Shoot(task)</InlineCode> marks the task as fire-and-forget and releases
          its <InlineCode>FrameOwner</InlineCode>. The task still runs to completion (it is rooted
          while (pending), but the caller is not blocked. At shutdown,) {' '}
          <InlineCode>HaltFireAndForgetTasks</InlineCode> ensures all fire-and-forget tasks are
          properly terminated before the VM is destroyed.
        </Callout>
      </ScrollReveal>

      {/* libuv modes ------------------------------------------------ */}
      <ScrollReveal delay={0.05}>
        <H2>libuv Run Modes</H2>
        <Prose>
          The <InlineCode>EventLoop</InlineCode> exposes three run modes, each mapping to a libuv
          run mode:
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Method</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">libuv mode</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Behavior</th>
              </tr>
            </thead>
            <tbody>
              {uvModes.map(([mode, desc], i) => (
                <tr key={mode} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{mode}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Prose>
          <InlineCode>Run()</InlineCode> (<InlineCode>UV_RUN_DEFAULT</InlineCode>) runs until the loop
          has no more active handles — it is typically used in standalone ShardScript hosts that run
          an event loop as the application's main loop. <InlineCode>RunOnce()</InlineCode>{' '}
          (<InlineCode>UV_RUN_ONCE</InlineCode>) is the building block for cooperative pumping in{' '}
          <InlineCode>Task.Wait()</InlineCode>.
        </Prose>
      </ScrollReveal>

      {/* Conventions ------------------------------------------------ */}
      <ScrollReveal delay={0.05}>
        <H2>Conventions and Best Practices</H2>
        <Bullet>
          <strong className="text-text-primary">Always Wait() or await.</strong> Starting a task
          and never waiting for it is a bug unless <InlineCode>Task.Shoot()</InlineCode> is used
          explicitly. Unwaited tasks may not complete before the program exits.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">Don't block the event loop.</strong> Long-running
          synchronous work (CPU-bound loops, blocking system calls) starves the event loop. Use{' '}
          <InlineCode>RunOnThreadPool</InlineCode> to offload CPU-heavy work, or split work across
          multiple <InlineCode>await Task.Delay(0)</InlineCode> yield points.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">No shared-state races.</strong> Because all code
          runs on a single thread, there are no data races between concurrent tasks. However,
          interleaving can still cause logical races — read a value, await, then find the value
          changed by another task that ran during the await.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">Use defer for cleanup in async methods.</strong>{' '}
          Resource-defers work across await points. The compiler re-emits defer registrations on
          every resume path, so resources acquired before an await are properly disposed even if
          the method is cancelled or faults after the await.
        </Bullet>
      </ScrollReveal>
    </div>
  )
}

/* ===== RESOURCE MANAGEMENT: GC ===== */

const mathBasicCode = `using stdio;
using math;

namespace demo;

public static func Main() -> void
{
    // Static constants on the Math class.
    println(Math.PI);   // 3.141592653589793
    println(Math.E);    // 2.718281828459045

    // Basic arithmetic via built-in operators.
    a: int = 5;
    b: int = 3;
    println(a + b);     // 8
    println(a - b);     // 2
    println(a * b);     // 15
    println(a / b);     // 1  (integer division)
    println(a % b);     // 2  (modulo)
}`

const mathRoundingCode = `using stdio;
using math;

namespace demo;

public static func Main() -> void
{
    x: double = 3.7;
    y: double = -3.7;

    println(Math.Ceil(x));    // 4.0
    println(Math.Floor(x));   // 3.0
    println(Math.Round(x));   // 4.0

    println(Math.Ceil(y));    // -3.0
    println(Math.Floor(y));   // -4.0
    println(Math.Round(y));   // -4.0
}`

const mathAbsMinMaxCode = `using stdio;
using math;

namespace demo;

public static func Main() -> void
{
    println(Math.Abs(-42));        // 42.0
    println(Math.Abs(42));         // 42.0

    println(Math.Min(10, 20));     // 10.0
    println(Math.Max(10, 20));     // 20.0

    println(Math.Min(-5.5, -3.2));  // -5.5
    println(Math.Max(-5.5, -3.2));  // -3.2
}`

const mathTrigCode = `using stdio;
using math;

namespace demo;

public static func Main() -> void
{
    // Trigonometry — direct wrappers over std::sin, std::cos, std::tan.
    println(Math.Sin(0.0));           // 0.0
    println(Math.Cos(Math.PI));       // -1.0
    println(Math.Tan(Math.PI / 4));   // ~1.0

    // Inverse trigonometry.
    println(Math.Asin(0.0));          // 0.0
    println(Math.Acos(-1.0));         // PI
    println(Math.Atan(1.0));          // ~PI/4
    println(Math.Atan2(1.0, 1.0));    // ~PI/4

    // Logarithms and exponentiation.
    println(Math.Log(Math.E));        // 1.0   (natural log)
    println(Math.Log10(100.0));       // 2.0   (base-10 log)
    println(Math.Exp(1.0));           // E     (e^x)
    println(Math.Exp(2.0));           // ~7.389
}`

const mathTrigAdvancedCode = `using stdio;
using math;

namespace demo;

public static func Main() -> void
{
    // Power and roots.
    println(Math.Pow(2.0, 10.0));     // 1024.0
    println(Math.Sqrt(25.0));         // 5.0
    println(Math.Cbrt(27.0));         // 3.0

    // Angle between two points using Atan2.
    x := 1.0;
    y := 1.0;
    radians := Math.Atan2(y, x);      // PI/4
    println(radians);

    // Convert to degrees for display.
    degrees := radians * 180.0 / Math.PI;
    println(degrees);                  // 45.0
}`

const mathTrigScenariosCode = `using stdio;
using math;

namespace demo;

// Distance between two 2D points.
public static func Distance2D(x1: double, y1: double, x2: double, y2: double) -> double
{
    dx := x2 - x1;
    dy := y2 - y1;
    return Math.Sqrt(dx * dx + dy * dy);
}

// Angle from point A to point B (radians).
public static func AngleTo(x1: double, y1: double, x2: double, y2: double) -> double
{
    return Math.Atan2(y2 - y1, x2 - x1);
}

// Smooth oscillation for game logic — sine wave between -1 and 1.
public static func Oscillate(time: double, frequency: double) -> double
{
    return Math.Sin(time * frequency * 2.0 * Math.PI);
}

// Exponential decay — e.g. cooldown remaining after 'elapsed' seconds.
public static func Decay(initial: double, rate: double, elapsed: double) -> double
{
    return initial * Math.Exp(-rate * elapsed);
}

public static func Main() -> void
{
    // Geometry: distance and angle between (0,0) and (3,4).
    dist := Distance2D(0.0, 0.0, 3.0, 4.0);
    angle := AngleTo(0.0, 0.0, 3.0, 4.0);
    println(dist);                             // 5.0
    println(angle);                            // ~0.927 rad (~53.13°)

    // Game logic: oscillating value over time.
    t := 0.25;  // quarter-second
    wave := Oscillate(t, 2.0);  // 2 Hz
    println(wave);                             // 0.0 (sin(pi) = 0)

    // Cooldown: 100 hp decaying at 3.0/sec after 0.5 seconds.
    remaining := Decay(100.0, 3.0, 0.5);
    println(remaining);                        // ~22.31
}`

const environmentCode = `using stdio;
using environment;

namespace demo;

public static func Main() -> void
{
    // Access environment variables via the [] operator.
    println(Environment["PROCESSOR_ARCHITECTURE"]);
    println(Environment["COMPUTERNAME"]);
    println(Environment["USERNAME"]);

    // Non-existent variable returns an empty string.
    missing := Environment["NONEXISTENT_VAR"];
    println(missing);  // ""

    // Explicit getter method.
    path := Environment.GetVariable("PATH");
    println(path);

    // Set a variable for the current process.
    Environment.SetVariable("MY_APP_MODE", "debug");
    println(Environment["MY_APP_MODE"]);  // "debug"
}`

const environmentScenariosCode = `using stdio;
using environment;

namespace demo;

// pattern: load secrets from env, never hard-code them.
public static func ConnectToDatabase() -> void
{
    dbUrl := Environment["DATABASE_URL"];
    if (dbUrl == "")
    {
        println("FATAL: DATABASE_URL not set");
        return;
    }

    println("connecting to database...");
    // ... db.connect(dbUrl);
}

// pattern: read config, apply defaults for missing keys.
public static func LoadConfig() -> void
{
    host := Environment["APP_HOST"];
    if (host == "")
        host = "127.0.0.1";

    portStr := Environment["APP_PORT"];
    if (portStr == "")
        portStr = "8080";

    println("listening on " + host + ":" + portStr);
}

// pattern: feature flags via env.
public static func IsFeatureEnabled(name: string) -> bool
{
    return Environment[name] == "1";
}

public static func Main() -> void
{
    Environment.SetVariable("APP_HOST", "0.0.0.0");
    Environment.SetVariable("APP_PORT", "3000");
    Environment.SetVariable("FEATURE_ANALYTICS", "1");
    Environment.SetVariable("DATABASE_URL", "<connection-string>");

    LoadConfig();
    ConnectToDatabase();

    if (IsFeatureEnabled("FEATURE_ANALYTICS"))
        println("analytics enabled");
    else
        println("analytics disabled");
}`

const debugDevToolsCode = `using stdio;
using debug;

namespace demo;

public class Point
{
    public x: double;
    public y: double;
}

public static func Main() -> void
{
    p := new Point();
    p.x = 10.0;
    p.y = 20.0;

    // typeof returns the runtime type name as a string.
    println(typeof(p));   // "<class Point>"

    // sizeof returns the memory footprint in bytes.
    println(sizeof(p));   // e.g. 16 (2 fields by 8 bytes)
}`

const debugVMInspectionCode = `using stdio;
using debug;

namespace demo;

public static func Main() -> void
{
    // Print stack frame local variables to stdout.
    // Shows PTR, TYPE, REFS for every local in the current frame.
    PrintStackFrameInfo();

    // Dump GC heap to stdout — PTR, TYPE, REFS for every
    // live ObjectInstance, plus a total count.
    PrintGcInfo();
}`

const collectionsContractsCode = `using stdio;
using collections;

namespace demo;

public static func Main() -> void
{
    // List<T> implements IEnumerable<T>.
    list: List<int> = new List<int>();
    list.Add(5);
    list.Add(6);

    // Assign to the interface type.
    enumerable: IEnumerable<int> = list;

    // foreach lowers to GetEnumerator() + MoveNext() + Current.
    foreach (n in enumerable)
    {
        print(n);
        print(" ");
    }
    println("");  // "5 6"
}`

const collectionsManualEnumCode = `using stdio;
using collections;

namespace demo;

public static func Main() -> void
{
    list: List<int> = new List<int>();
    list.Add(7);
    list.Add(8);
    list.Add(9);

    // Manual iteration via IEnumerator<T>.
    e: IEnumerator<int> = list.GetEnumerator();
    while (e.MoveNext())
    {
        println(e.Current);
    }
    // Output: 7, 8, 9 (one per line)
}`

const collectionsArrayEnumCode = `using stdio;
using collections;

namespace demo;

public static func First<T>(source: IEnumerable<T>) -> T
{
    foreach (item in source)
    {
        return item;
    }
    return 0;
}

public static func Main() -> void
{
    // Arrays implicitly implement IEnumerable<T>.
    test := [1..10];
    e: IEnumerable<int> = test;

    // Generic function works with any IEnumerable<T> source.
    x := First<int>(test);
    println(x);  // 1
}`

const collectionsListCode = `using stdio;
using collections;

namespace demo;

public static func Main() -> void
{
    // Create an empty list.
    list: List<int> = new List<int>();

    // Add elements.
    list.Add(10);
    list.Add(20);
    list.Add(30);

    println(list.Length);     // 3

    // Access by index (bounds-checked).
    println(list[0]);         // 10
    list[1] = 99;
    println(list[1]);         // 99

    // Iterate via foreach.
    foreach (n in list)
    {
        print(n);
        print(" ");
    }
    println("");              // "10 99 30"

    // Remove at index.
    list.RemoveAt(1);
    println(list.Length);     // 2
    println(list[0]);         // 10
    println(list[1]);         // 30
}`

const collectionsListClearCode = `using stdio;
using collections;

namespace demo;

public static func Main() -> void
{
    list: List<string> = new List<string>(4);
    list.Add("alpha");
    list.Add("beta");
    list.Add("gamma");

    println(list.Length);     // 3

    // Clear replaces the internal array with a zero-length one.
    list.Clear();
    println(list.Length);     // 0
}`

const collectionsDictCode = `using stdio;
using collections;

namespace demo;

public static func Main() -> void
{
    dict := new Dictionary<int, string>();

    // Add key-value pairs.
    dict.Add(1, "one");
    dict.Add(2, "two");
    dict.Add(3, "three");

    println(dict.Count);        // 3

    // Read by key (throws if key not found).
    println(dict[1]);           // "one"

    // Write by key (inserts or overwrites).
    dict[2] = "TWO";
    println(dict[2]);           // "TWO"

    // Check for existence.
    println(dict.ContainsKey(3));   // true
    println(dict.ContainsKey(99));  // false

    // Remove a key.
    dict.Remove(2);
    println(dict.Count);        // 2

    // Iterate key-value pairs.
    foreach (pair in dict)
    {
        println(pair.Key);
        println(pair.Value);
    }
}`

const collectionsQueueCode = `using stdio;
using collections;

namespace demo;

public static func Main() -> void
{
    q := new Queue<int>();

    q.Enqueue(10);
    q.Enqueue(20);
    q.Enqueue(30);

    println(q.Count);       // 3
    println(q.Peek());      // 10 (front, not removed)
    println(q.Dequeue());   // 10
    println(q.Dequeue());   // 20
    println(q.Count);       // 1

    q.Enqueue(40);
    println(q.Contains(40));   // true
    println(q.Contains(99));   // false

    while (q.Count > 0)
        println(q.Dequeue());  // 30, 40
}`

const collectionsStackCode = `using stdio;
using collections;

namespace demo;

public static func Main() -> void
{
    s := new Stack<int>();

    s.Push(10);
    s.Push(20);
    s.Push(30);

    println(s.Count);       // 3
    println(s.Peek());      // 30 (top, not removed)
    println(s.Pop());       // 30
    println(s.Pop());       // 20
    println(s.Count);       // 1

    s.Push(40);
    println(s.Contains(40));   // true
    println(s.Contains(99));   // false

    while (s.Count > 0)
        println(s.Pop());      // 40, 10
}`

const collectionsScenariosCode = `using stdio;
using collections;

namespace demo;

// --- List scenario: accumulating results dynamically ---
public static func CollectEvenNumbers(limit: int) -> List<int>
{
    result := new List<int>();
    for (i := 1; i <= limit; i = i + 1)
    {
        if (i % 2 == 0)
            result.Add(i);
    }
    return result;
}

// --- Dictionary scenario: frequency counter ---
public static func WordFrequency(words: List<string>) -> Dictionary<string, int>
{
    freq := new Dictionary<string, int>();
    foreach (word in words)
    {
        if (freq.ContainsKey(word))
            freq[word] = freq[word] + 1;
        else
            freq.Add(word, 1);
    }
    return freq;
}

// --- Queue scenario: breadth-first traversal stub ---
public static func ProcessQueue(q: Queue<int>) -> void
{
    while (q.Count > 0)
    {
        current := q.Dequeue();
        println("processing " + current);
    }
}

// --- Stack scenario: undo stack ---
public static func Main() -> void
{
    // List: accumulate results.
    evens := CollectEvenNumbers(10);
    println("evens: " + evens);  // [2, 4, 6, 8, 10]

    // Dictionary: frequency count.
    words: List<string> = new List<string>();
    words.Add("apple"); words.Add("banana"); words.Add("apple");
    freq := WordFrequency(words);
    println(freq["apple"]);   // 2
    println(freq["banana"]);  // 1

    // Queue: process items in arrival order.
    q: Queue<int> = new Queue<int>();
    q.Enqueue(100); q.Enqueue(200); q.Enqueue(300);
    ProcessQueue(q);

    // Stack: implement undo.
    undo: Stack<string> = new Stack<string>();
    undo.Push("idle");
    undo.Push("walk");
    undo.Push("jump");
    println("pop undo: " + undo.Pop());  // "jump"
    println("pop undo: " + undo.Pop());  // "walk"
    println("top: " + undo.Peek());       // "idle"
}`

const jsonSerializerCode = `using stdio;
using json;

namespace demo;

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
    public Active: bool;
    public Tags: string[];
    public Home: Address;
}

public static func Main() -> void
{
    p: Person = new Person();
    p.Name = "Ada Lovelace";
    p.Age = 36;
    p.Height = 1.68;
    p.Active = true;
    p.Tags = ["math", "compute"];

    home: Address = new Address();
    home.City = "London";
    home.Zip = "SW1";
    p.Home = home;

    // Serialize: object -> JSON string.
    text: string = JsonSerializer.Serialize<Person>(p);
    println(text);

    // Deserialize: JSON string -> new object of type T.
    q: Person = JsonSerializer.Deserialize<Person>(text);
    println(q.Name);      // "Ada Lovelace"
    println(q.Age);       // 36
    println(q.Home.City); // "London"
}`

const jsonNodeCode = `using stdio;
using json;

namespace demo;

public static func Main() -> void
{
    // Parse a JSON string into a DOM tree.
    node: JsonNode = JsonNode.Parse(
        "{\\"a\\":[1,2,3],\\"b\\":\\"hi\\",\\"c\\":null,\\"d\\":true,\\"e\\":-2.5e1}");

    // Inspect the kind.
    println(node.Kind());             // "object"

    // Access object members by key -> returns another JsonNode.
    println(node.Get("b").AsString());   // "hi"
    println(node.Get("a").Length());     // 3
    println(node.Get("a").At(2).AsInt()); // 3

    // Check for null.
    println(node.Get("c").IsNull());    // true

    // Boolean and double extraction.
    println(node.Get("d").AsBool());    // true
    println(node.Get("e").AsDouble());  // -25.0

    // Key existence check.
    println(node.Contains("a"));        // true
    println(node.Contains("z"));        // false

    // Mutate the DOM.
    mut: JsonNode = JsonNode.Parse("{\\"x\\":1}");
    mut.Set("y", JsonNode.Parse("\\"added\\""));
    mut.Get("x").Set("nested", JsonNode.Parse("42"));
    println(mut);  // {"x":{"nested":42},"y":"added"}
}`

const jsonScenariosCode = `using stdio;
using json;

namespace demo;

// --- Scenario 1: load and validate a config file ---
public class AppConfig
{
    public Port: int;
    public Host: string;
    public Debug: bool;
}

public static func LoadConfig(path: string) -> AppConfig
{
    // In a real app, read the file into a string first.
    raw := "{\\"Port\\": 3000, \\"Host\\": \\"0.0.0.0\\", \\"Debug\\": true}";

    // Deserialize into the known config shape.
    cfg: AppConfig = JsonSerializer.Deserialize<AppConfig>(raw);
    return cfg;
}

// --- Scenario 2: inspect an API response without a fixed schema ---
public static func InspectApiResponse(raw: string) -> void
{
    root: JsonNode = JsonNode.Parse(raw);

    // Check if top-level is what we expect.
    if (!root.IsObject())
    {
        println("unexpected response format");
        return;
    }

    // Dynamically discover what fields are present.
    keys: string[] = root.Keys();
    foreach (key in keys)
    {
        println("field: " + key);
    }

    // Read a known field safely.
    if (root.Contains("status"))
        println("status = " + root.Get("status").AsString());
    else
        println("no status field");

    // Drill into nested structure.
    if (root.Contains("data") && root.Get("data").IsArray())
    {
        data: JsonNode = root.Get("data");
        println("data.Length = " + data.Length());
        if (data.Length() > 0)
            println("data[0] = " + data.At(0));
    }
}

public static func Main() -> void
{
    // Config parsing.
    cfg := LoadConfig("app.json");
    println(cfg.Port);   // 3000
    println(cfg.Host);   // "0.0.0.0"
    println(cfg.Debug);  // true

    // API response inspection.
    apiResponse := "{\\"status\\": \\"ok\\", \\"data\\": [{\\"id\\": 1}, {\\"id\\": 2}], \\"count\\": 2}";
    InspectApiResponse(apiResponse);
}`

const streamInterfacesCode = `using stdio;
using io;
using async;

namespace demo;

public static async func ReadFromStream(source: IReadableStream) -> Task
{
    buffer: byte[] = [0 as byte; 256];
    totalRead: int = 0;
    while (true)
    {
        bytesRead: int = await source.ReadAsync(buffer, 0, 256);
        if (bytesRead <= 0)
            break;
        totalRead = totalRead + bytesRead;
    }
    println("read " + totalRead + " bytes total");
}

public static async func WriteToStream(target: IWritableStream, data: byte[]) -> Task
{
    await target.WriteAsync(data, 0, data.Length);
    await target.FlushAsync();
}

public static func Main() -> void
{
    // IStream = the base interface extending IDisposable.
    // Any stream can be cleaned up via IDisposable.
    ms := new MemoryStream();
    s: IStream = ms;
    s.Dispose();

    // IReadableStream extends IStream with reading methods.
    // Accepts any readable stream — MemoryStream, FileStream, SocketStream.
    ms2 := new MemoryStream();
    ms2.Write([1 as byte, 2 as byte, 3 as byte], 0, 3);
    readable: IReadableStream = ms2;
    buf: byte[] = [0 as byte; 3];
    n: int = readable.Read(buf, 0, 3);
    println(n);  // 3
    println(buf[0]);  // 1

    // IWritableStream extends IStream with writing methods.
    writable: IWritableStream = ms2;
    writable.Flush();
    writable.Dispose();
}`

const memoryStreamCode = `using stdio;
using io;

namespace demo;

public static func Main() -> void
{
    // Create an empty writable MemoryStream.
    ms := new MemoryStream();

    // Write bytes — capacity auto-grows.
    ms.Write([10 as byte, 20 as byte, 30 as byte], 0, 3);
    println(ms.Length);    // 3
    println(ms.Position);  // 3

    // Seek back to the beginning.
    ms.Seek(0, SeekOrigin.Begin);
    println(ms.Position);  // 0

    // Read bytes back.
    buf: byte[] = [0 as byte, 0 as byte, 0 as byte];
    read: int = ms.Read(buf, 0, 3);
    println(read);         // 3
    println(buf[0]);       // 10
    println(buf[1]);       // 20
    println(buf[2]);       // 30

    // Extract the entire buffer as a byte[].
    copy: byte[] = ms.ToArray();
    println(copy.Length);  // 3

    // Create a read-only stream from an existing buffer.
    data: byte[] = [1 as byte, 2 as byte, 3 as byte, 4 as byte];
    ms2 := new MemoryStream(data);
    println(ms2.Length);   // 4
    println(ms2.CanWrite); // false

    // Close / dispose.
    ms.Close();
    ms2.Dispose();
}`

const streamReaderWriterCode = `using stdio;
using io;

namespace demo;

public static func Main() -> void
{
    ms := new MemoryStream();

    // Write text lines.
    writer := new StreamWriter(ms);
    writer.WriteLine("hello");
    writer.WriteLine("world");
    writer.Flush();

    // Read them back.
    ms.Position = 0;
    reader := new StreamReader(ms);
    line1 := reader.ReadLine();
    line2 := reader.ReadLine();
    eof := reader.ReadLine();

    println(line1);  // "hello"
    println(line2);  // "world"
    println(eof);    // ""  (EOF returns empty string)

    reader.Dispose();
    writer.Dispose();
}`

const streamBinaryCode = `using stdio;
using io;

namespace demo;

public static func Main() -> void
{
    ms := new MemoryStream();

    // Write typed values in binary format.
    bw := new BinaryWriter(ms);
    bw.Write(true);
    bw.Write(42 as byte);
    bw.WriteInt32(12345);
    bw.Write(9876543210);
    bw.Write(3.14159);
    bw.Write("shard");
    payload: byte[] = [10 as byte, 20 as byte, 30 as byte];
    bw.Write(payload);
    bw.Flush();

    // Read them back in the exact same order.
    ms.Position = 0;
    br := new BinaryReader(ms);
    println(br.ReadBoolean());  // true
    println(br.ReadByte());     // 42
    println(br.ReadInt32());    // 12345
    println(br.ReadInt64());    // 9876543210
    d := br.ReadDouble();
    println(d);                 // ~3.14159
    println(br.ReadString());   // "shard"
    bytes: byte[] = br.ReadBytes(3);
    println(bytes[0]);          // 10
    println(bytes[1]);          // 20
    println(bytes[2]);          // 30

    br.Dispose();
    bw.Dispose();
}`

const streamScenariosCode = `using stdio;
using io;
using async;

namespace demo;

// Read a large file line-by-line without loading it into memory.
public static async func CountLines(path: string) -> Task
{
    fs := new FileStream(path, FileMode.Open, FileAccess.Read);
    defer fs.Dispose();

    reader := new StreamReader(fs);
    defer reader.Dispose();

    count := 0;
    while (true)
    {
        line := reader.ReadLine();
        if (line == "")
            break;
        count = count + 1;
    }

    println("total lines: " + count);
}

// Stream binary records from a socket without buffering them all.
public static async func ProcessRecords(stream: IReadableStream) -> Task
{
    br := new BinaryReader(stream);
    defer br.Dispose();

    processed := 0;
    while (true)
    {
        id := br.ReadInt32();
        value := br.ReadDouble();
        processed = processed + 1;
        println("record " + id + " = " + value);
    }
}

// Compose a pipeline: MemoryStream -> write -> read -> transform.
public static func TransformInPlace(data: byte[]) -> byte[]
{
    input := new MemoryStream(data);
    defer input.Dispose();

    output := new MemoryStream();
    defer output.Dispose();

    // Read from input, transform, write to output.
    buf: byte[] = [0 as byte; 64];
    while (true)
    {
        read: int = input.Read(buf, 0, 64);
        if (read <= 0)
            break;

        for (i := 0; i < read; i = i + 1)
            buf[i] = (buf[i] + 1) as byte;

        output.Write(buf, 0, read);
    }

    return output.ToArray();
}

public static func Main() -> void
{
    original: byte[] = [1 as byte, 2 as byte, 3 as byte];
    transformed: byte[] = TransformInPlace(original);
    println(transformed[0]);  // 2
    println(transformed[1]);  // 3
    println(transformed[2]);  // 4
}`

const filesystemCode = `using stdio;
using filesystem;

namespace demo;

public static func Main() -> void
{
    path := "D:/temp/shard_demo.txt";

    // Write text to a file (overwrites if exists).
    File.WriteAllText(path, "hello\\nworld");

    // Read it back.
    content := File.ReadAllText(path);
    println(content);  // "hello\\nworld"

    // Check existence and delete.
    println(File.Exists(path));  // true
    File.Delete(path);
    println(File.Exists(path));  // false

    // Path utilities.
    p := "C:/Users/gutii/docs/readme.txt";
    println(Path.GetFileName(p));                 // "readme.txt"
    println(Path.GetExtension(p));                // ".txt"
    println(Path.GetFileNameWithoutExtension(p)); // "readme"
    println(Path.GetDirectoryName(p));            // "C:/Users/gutii/docs"
    println(Path.HasExtension(p));                // true
    println(Path.DirectorySeparatorChar);         // "\\" (Windows) or "/" (Linux)

    // Join path segments.
    joined := Path.Join(["C:/", "Users", "gutii", "file.txt"]);
    println(joined);  // "C:/Users/gutii/file.txt"
}`

const filesystemAsyncCode = `using stdio;
using filesystem;
using async;

namespace demo;

public static async func Run() -> Task
{
    path := "D:/temp/shard_async.txt";

    // Async write.
    await File.WriteAllTextAsync(path, "async content");

    // Async read.
    content := await File.ReadAllTextAsync(path);
    println(content);  // "async content"

    File.Delete(path);
}

public static func Main() -> void
{
    Task.Wait(Run());
}`

const directoryCode = `using stdio;
using filesystem;

namespace demo;

public static func Main() -> void
{
    // Static Directory class — check/create/delete by path.
    path := "D:/temp/shard_dir_demo";

    Directory.Delete(path);
    println(Directory.Exists(path));  // false

    info: DirectoryInfo = Directory.Create(path);
    println(Directory.Exists(path));  // true
    println(info.Name);               // "shard_dir_demo"
    println(info.Exists);             // true

    // Navigate: create FileInfo with DirectoryInfo and a file name.
    file: FileInfo = new FileInfo(info, "readme.txt");
    println(file.FullName); // "D:/temp/shard_dir_demo/readme.txt"

    // Both types also support combining with strings.
    sub: DirectoryInfo = info / "subfolder";
    println(sub.FullName); // "D:/temp/shard_dir_demo/subfolder"

    // Create the subfolder.
    sub.Create();

    // Delete the directory tree.
    info.Delete();
    println(info.Exists);             // false
}`

const pathConcatCode = `using stdio;
using filesystem;

namespace demo;

public static func Main() -> void
{
    // string / string — pure path join, returns string.
    // Formats two string into new path, using platform-specific separator.
    base := "D:/projects";
    full := base / "src" / "main.shard";
    println(full);  // "D:/projects/src/main.shard"

    // DirectoryInfo / string — returns new DirectoryInfo.
    // Constructs a DirectoryInfo from a parent DirectoryInfo and a subdirectory name.
    root: DirectoryInfo = new DirectoryInfo("D:/data");
    sub: DirectoryInfo = root / "logs";
    println(sub.FullName);  // "D:/data/logs"

    // DirectoryInfo / FileInfo — returns FileInfo.
    // Replaces FileInfo's containing directory
    logFile: FileInfo = sub / "app.log";
    println(logFile.FullName);  // "D:/data/logs/app.log"

    // Chain multiple segments.
    deep: string = root / "users" / "gutii" / "config.json";
    println(deep);  // "D:/data/users/gutii/config.json"

    // Also works with Path.Join as an explicit alternative.
    joined: string = Path.Join(["D:/data", "users", "gutii", "config.json"]);
    println(joined);  // "D:/data/users/gutii/config.json"
}`

const fsScenariosCode = `using stdio;
using filesystem;
using io;
using async;

namespace demo;

// Scenario 1: Ensure a log directory exists, then write a timestamped file.
public static func WriteLog(dirName: string, message: string) -> void
{
    logDir: DirectoryInfo = Directory.Create(dirName);
    timestamp := "2026-07-23";

    logFile: FileInfo = logDir / ("log_" + timestamp + ".txt");
    File.WriteAllText(logFile.FullName, message + "\n");
    println("wrote: " + logFile.FullName);
}

// Scenario 2: Read and aggregate all .txt files in a directory.
public static func SummarizeDir(dirName: string) -> void
{
    info: DirectoryInfo = new DirectoryInfo(dirName);
    if (!info.Exists)
    {
        println("no such directory: " + dirName);
        return;
    }

    files: string[] = ["a.txt", "b.txt"];
    total := 0;
    foreach (name in files)
    {
        path := info / name;
        content := File.ReadAllText(path.FullName);
        total = total + content;
    }

    println("total chars in " + dirName + ": " + total);
}

// Scenario 3: Build a cross-platform path using / operator.
public static func BuildPath() -> void
{
    base: DirectoryInfo = new DirectoryInfo("C:/app");
    config: FileInfo = base / "config" / "settings.json";
    println(config.FullName);  // "C:/app/config/settings.json"
}

public static func Main() -> void
{
    WriteLog("D:/temp/logs", "server started");
    BuildPath();
}`

const subprocessCode = `using stdio;
using process;

namespace demo;

public static func Main() -> void
{
    // Quick start: fileName + arguments.
    defer p: Process = Process.Start("cmd.exe", "/c echo hello from subprocess");

    output: string = p.ReadToEnd();
    println(output);  // "hello from subprocess\r\n"

    code: int = p.WaitForExit();
    println("Exit code: " + code);
    println("Has exited: " + p.HasExited);

    // Start via ProcessStartInfo for full control.
    info: ProcessStartInfo = new ProcessStartInfo();
    info.FileName = "cmd.exe";
    info.Arguments = "/c echo info-based start";
    info.CreateNoWindow = true;

    defer p2: Process = Process.Start(info);
    println(p2.ReadToEnd());
    println("Info exit: " + p2.WaitForExit());
}`

const subprocessIOCode = `using stdio;
using process;

namespace demo;

public static func Main() -> void
{
    // Capture both stdout and stderr separately.
    info: ProcessStartInfo = new ProcessStartInfo();
    info.FileName = "cmd.exe";
    info.Arguments = "/c echo stdout message & echo stderr message >&2";
    info.RedirectStandardOutput = true;
    info.RedirectStandardError = true;

    defer p: Process = Process.Start(info);

    out: string = p.ReadToEnd();
    err: string = p.ReadErrorToEnd();

    println("stdout: " + out);
    println("stderr: " + err);
    println("exit code: " + p.ExitCode);
}`

const subprocessTimeoutCode = `using stdio;
using process;

namespace demo;

public static func Main() -> void
{
    // Start a process that takes time.
    defer p: Process = Process.Start("cmd.exe", "/c ping 127.0.0.1 -n 3 > nul");

    finished: bool = p.WaitForExit(100);
    println("Finished within 100ms: " + finished);

    if (!finished)
    {
        println("Still running — killing now");
        p.Kill();
    }

    println("HasExited: " + p.HasExited);
}`

const subprocessScenariosCode = `using stdio;
using process;

namespace demo;

// Scenario 1: invoke a compiler and capture both stdout and stderr.
public static func InvokeCompiler(source: string) -> void
{
    info: ProcessStartInfo = new ProcessStartInfo();
    info.FileName = "gcc";
    info.Arguments = "-Wall -o output " + source;
    info.RedirectStandardOutput = true;
    info.RedirectStandardError = true;

    defer p: Process = Process.Start(info);

    out: string = p.ReadToEnd();
    err: string = p.ReadErrorToEnd();

    if err != ""
        println("compile errors:\n" + err);
    else
        println("compile ok");

    println("exit: " + p.ExitCode);
}

// Scenario 2: call an external script/utility and check exit code.
public static func RunLinter(target: string) -> void
{
    defer p: Process = Process.Start("lint.exe", "--check " + target);

    output: string = p.ReadToEnd();
    code: int = p.WaitForExit();

    if code == 0
        println("lint passed");
    else
        println("lint failed (" + code + "): " + output);
}

// Scenario 3: pipe data through an external filter.
public static func ExternalSort(input: string) -> string
{
    info: ProcessStartInfo = new ProcessStartInfo();
    info.FileName = "sort.exe";
    info.RedirectStandardInput = true;
    info.RedirectStandardOutput = true;

    defer p: Process = Process.Start(info);

    p.Write(input);
    p.WriteLine("");  // ensure the stream is flushed with a newline

    result: string = p.ReadToEnd();
    return result;
}

public static func Main() -> void
{
    InvokeCompiler("main.shard");
    RunLinter("src/");
    sorted: string = ExternalSort("gamma\nalpha\nbeta");
    println(sorted);
}`

function GCContent() {
  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          ShardScript uses <strong className="text-text-primary">automatic reference counting</strong> as
          its memory management strategy. Every <InlineCode>ObjectInstance</InlineCode> carries a reference
          counter. When the counter reaches zero, the instance is immediately collected — there is no
          background GC thread, no stop-the-world pauses, and no non-deterministic finalization.
        </Prose>
        <Prose>
          The GC operates on three layers:
        </Prose>
        <Bullet>
          <strong className="text-text-primary">Allocation layer</strong> — <InlineCode>AllocateInstance</InlineCode>,{' '}
          <InlineCode>AllocateGeneric</InlineCode>, and <InlineCode>AllocateArray</InlineCode> create new
          instances on the heap with reference count 0. The instance receives a contiguous raw-memory block
          sized by its <InlineCode>TypeShape</InlineCode>. For reference types (classes, strings, arrays),
          the memory holds inline value-type fields plus pointer slots for reference-type fields.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">Reference-tracking layer</strong> —{' '}
          <InlineCode>IncrementReference</InlineCode> / <InlineCode>DecrementReference</InlineCode> update
          the counter. Singletons and <InlineCode>NullInstance</InlineCode> skip counting entirely. Counters
          are adjusted at three points: argument passing into method calls (increment), field/element
          assignment (new value incremented, old value decremented), and stack frame cleanup on return
          (each remaining stack slot decremented).
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">Collection layer</strong> —{' '}
          <InlineCode>DestroyInstance</InlineCode> decrements the reference count and, if it reaches zero,
          calls <InlineCode>CollectInstance</InlineCode>. Collection removes the instance from the{' '}
          <InlineCode>InstancesHeap</InlineCode> vector and invokes <InlineCode>TerminateInstance</InlineCode>,
          which recursively decrements every reference-type field and array element, frees the raw memory
          (for non-transient instances), and deletes the C++ object.
        </Bullet>
      </ScrollReveal>

      {/* Allocation ------------------------------------------------ */}
      <ScrollReveal delay={0.05}>
        <H2>Object Allocation</H2>
        <Prose>
          The <InlineCode>new</InlineCode> keyword triggers <InlineCode>AllocateInstance</InlineCode> via
          the <InlineCode>NEWOBJECT</InlineCode> opcode. The VM looks up or creates a{' '}
          <InlineCode>TypeShape</InlineCode> (cached in <InlineCode>TypeShapeCache</InlineCode>), allocates a
          contiguous memory block with <InlineCode>malloc</InlineCode>, zero-initializes it, wraps it in an{' '}
          <InlineCode>ObjectInstance</InlineCode>, and registers it in the <InlineCode>InstancesHeap</InlineCode>.
          The constructor (<InlineCode>init</InlineCode>) then runs to initialize fields.
        </Prose>
        <CodeBlock code={gcBasicCode} language="csharp" filename="gc_basic.shard" />
      </ScrollReveal>

      {/* Reference Counting ---------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Reference Counting</H2>
        <Prose>
          Each <InlineCode>ObjectInstance</InlineCode> stores a 64-bit reference counter. The counter starts
          at 0 after allocation and is adjusted at every ownership change:
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Operation</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Trigger</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Effect</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[#1E1E2E]">
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">+1</td>
                <td className="px-4 py-3 text-sm text-text-secondary">Argument pushed onto callee frame</td>
                <td className="px-4 py-3 text-sm text-text-secondary">Callee holds a live reference during execution.</td>
              </tr>
              <tr className="bg-[#252538]">
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">+1</td>
                <td className="px-4 py-3 text-sm text-text-secondary">Field / array element assignment (<InlineCode>SetField</InlineCode>, <InlineCode>SetElement</InlineCode>)</td>
                <td className="px-4 py-3 text-sm text-text-secondary">New value gains a reference.</td>
              </tr>
              <tr className="bg-[#1E1E2E]">
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">+1</td>
                <td className="px-4 py-3 text-sm text-text-secondary">Exception pushed or re-thrown</td>
                <td className="px-4 py-3 text-sm text-text-secondary">Exception object stays alive during unwinding.</td>
              </tr>
              <tr className="bg-[#252538]">
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">-1</td>
                <td className="px-4 py-3 text-sm text-text-secondary">Old value replaced in field/element</td>
                <td className="px-4 py-3 text-sm text-text-secondary">Old value's reference is released.</td>
              </tr>
              <tr className="bg-[#1E1E2E]">
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">-1</td>
                <td className="px-4 py-3 text-sm text-text-secondary">Frame return — locals drained via <InlineCode>DestroyInstance</InlineCode></td>
                <td className="px-4 py-3 text-sm text-text-secondary">Each local is released; if ref count hits 0, instance is collected.</td>
              </tr>
              <tr className="bg-[#252538]">
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">-1</td>
                <td className="px-4 py-3 text-sm text-text-secondary"><InlineCode>POPSTACK</InlineCode> opcode</td>
                <td className="px-4 py-3 text-sm text-text-secondary">Temporary expression results released immediately.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <CodeBlock code={gcRefCountCode} language="csharp" filename="gc_refcount.shard" />
        <Callout tone="blue" title="Cyclic references">
          Reference counting alone cannot detect cycles. However, <InlineCode>TerminateInstance</InlineCode>{' '}
          handles cycles by walking all reference-typed fields recursively and calling{' '}
          <InlineCode>DestroyInstance</InlineCode> on each, which decrements and cascades. This means cycles
          between user objects within the same allocation graph are broken during termination, as long as
          one node in the cycle becomes unreachable from the stack or static roots.
        </Callout>
      </ScrollReveal>

      {/* Instance Caching & Singletons ----------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Instance Caching and Singletons</H2>
        <Prose>
          The GC pre-allocates caches for commonly-used values to avoid repeated allocation. Cached instances
          have <InlineCode>IsSingleton = true</InlineCode> and skip reference-counting entirely — they are
          immortal and never collected.
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Cache</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Size</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Range</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Mechanism</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[#1E1E2E]">
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">SmallInts</td>
                <td className="px-4 py-3 text-sm text-text-secondary">261 instances</td>
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">-5 to 255</td>
                <td className="px-4 py-3 text-sm text-text-secondary">Static array created once per process. <InlineCode>FromValue(int64_t)</InlineCode> returns a cached instance when the value is in range.</td>
              </tr>
              <tr className="bg-[#252538]">
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">bool</td>
                <td className="px-4 py-3 text-sm text-text-secondary">2 singletons</td>
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">true / false</td>
                <td className="px-4 py-3 text-sm text-text-secondary">Lazily allocated on first <InlineCode>FromValue(bool)</InlineCode> call. Both are singletons.</td>
              </tr>
              <tr className="bg-[#1E1E2E]">
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">NullInstance</td>
                <td className="px-4 py-3 text-sm text-text-secondary">1 singleton</td>
                <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">null</td>
                <td className="px-4 py-3 text-sm text-text-secondary">Global static allocated at program start. Returned by all <InlineCode>GetField</InlineCode> / <InlineCode>GetElement</InlineCode> when a pointer slot is nullptr.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <CodeBlock code={gcCacheCode} language="csharp" filename="gc_cache.shard" />
        <Callout tone="green" title="Performance note">
          Integer arithmetic in hot loops benefits significantly from the small-int cache. Code like{' '}
          <InlineCode>for (i := 0; i &lt; 1000; i++)</InlineCode> never allocates new integer instances —
          all <InlineCode>i</InlineCode> values below 256 are served from the pre-allocated cache.
        </Callout>
      </ScrollReveal>

      {/* null and NullInstance ------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>null and NullInstance</H2>
        <Prose>
          <InlineCode>null</InlineCode> is represented by a single process-wide singleton —{' '}
          <InlineCode>NullInstance</InlineCode>. It is never collected, never reference-counted, and is
          returned automatically by <InlineCode>GetField</InlineCode> and <InlineCode>GetElement</InlineCode>{' '}
          when a reference slot contains a null pointer. Assigning null to a field replaces the old value
          without incrementing any reference.
        </Prose>
        <CodeBlock code={gcNullCode} language="csharp" filename="gc_null.shard" />
      </ScrollReveal>

      {/* Termination & Transient Instances ------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Termination and Transient Instances</H2>
        <Prose>
          <InlineCode>TerminateInstance</InlineCode> performs the actual cleanup of a collected instance:
        </Prose>
        <Bullet>
          <strong className="text-text-primary">Cascade to fields.</strong> For every reference-type field,
          <InlineCode>DestroyInstance</InlineCode> is called recursively on the field's value. This handles
          nested object graphs and breaks cycles within the reachable sub-graph.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">Cascade to array elements.</strong> For array instances, each
          element is visited and its reference is decremented.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">Free raw memory.</strong> For non-transient instances, the
          raw memory block (allocated via <InlineCode>malloc</InlineCode>) is freed. Strings free their
          backing wide-character buffer first. Transient instances — those wrapping memory they don't own
          (e.g. value-type boxed temporaries returned by <InlineCode>GetField</InlineCode>) — skip this step.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">Delete C++ object.</strong> The <InlineCode>ObjectInstance</InlineCode>{' '}
          itself is <InlineCode>delete</InlineCode>-d.
        </Bullet>
        <Callout tone="amber" title="Terminated flag">
          Each instance has a <InlineCode>Terminated</InlineCode> flag. Before termination, it is set to true,
          preventing double-free in cycles where field chains might re-visit an already collected instance.
        </Callout>
      </ScrollReveal>

      {/* Async lifetime -------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>Async Task Lifetime</H2>
        <Prose>
          Objects implementing the task pattern (<InlineCode>Task</InlineCode>, <InlineCode>ValueTask</InlineCode>)
          have <InlineCode>IsTaskLike = true</InlineCode>. While pending, they hold a{' '}
          <InlineCode>FrameOwner</InlineCode> shared pointer to the call stack frame that created them.
          This keeps the frame alive across await suspension points and prevents the task's owned instances
          from being collected prematurely.
        </Prose>
        <Prose>
          When a task completes, <InlineCode>ReleaseFrameOwner</InlineCode> decrements the frame's{' '}
          <InlineCode>PendingTaskCount</InlineCode>. When no pending tasks remain on the frame, the frame
          is eligible for cleanup. The <InlineCode>ObjectRef</InlineCode> RAII wrapper is used internally
          by the async infrastructure to increment/decrement reference counts across async boundaries.
        </Prose>
      </ScrollReveal>

      {/* Heap structure -------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <H2>InstancesHeap</H2>
        <Prose>
          All live <InlineCode>ObjectInstance</InlineCode> objects are stored in the{' '}
          <InlineCode>InstancesHeap</InlineCode> — a <InlineCode>std::vector&lt;std::unique_ptr&lt;ObjectInstance&gt;&gt;</InlineCode>.
          When an instance is collected (<InlineCode>Heap.erase</InlineCode>), the unique_ptr releases
          ownership (via <InlineCode>release()</InlineCode>) after the instance has already been terminated.
          The vector provides constant-time push-back and O(n) erase-by-pointer. At shutdown,{' '}
          <InlineCode>GarbageCollector::Terminate</InlineCode> snapshots the heap, terminates every
          instance (static fields first, then regular instances), and clears the heap.
        </Prose>
        <Callout tone="blue" title="No compaction">
          Removing an instance from the vector leaves a hole — the vector does not compact. Since collection
          is immediate (ref count reaches 0) and heap growth is linear with allocation, the empty slots
          represent memory that has already been freed. A future optimization may introduce a free-list
          allocator to reuse <InlineCode>ObjectInstance</InlineCode> slots.
        </Callout>
      </ScrollReveal>
    </div>
  )
}

/* ===== STANDARD LIBRARY: MATH ===== */

/* ===== STANDARD LIBRARY: ENVIRONMENT ===== */

/* ===== STANDARD LIBRARY: DEBUG — DEVELOPER TOOLS ===== */

/* ===== STANDARD LIBRARY: COLLECTIONS — CONTRACTS ===== */

/* ===== STANDARD LIBRARY: COLLECTIONS — LIST<T> ===== */

/* ===== STANDARD LIBRARY: COLLECTIONS — DICTIONARY<K, V> ===== */

/* ===== STANDARD LIBRARY: COLLECTIONS — QUEUE<T> & STACK<T> ===== */

function CollectionsQueueStackContent() {
  const queueMembers = [
    ['init()', '\u2014', 'Allocates an empty queue.'],
    ['Count', 'int (property)', 'Number of elements currently in the queue.'],
    ['Enqueue(item)', 'void', 'Adds item to the back of the queue. May trigger a resize.'],
    ['Dequeue()', 'T', 'Removes and returns the front element. Throws if empty.'],
    ['Peek()', 'T', 'Returns the front element without removing it. Throws if empty.'],
    ['Contains(item)', 'bool', 'Returns true if item is found anywhere in the queue (linear scan).'],
    ['Clear()', 'void', 'Discards the internal array and resets head, tail, and size to zero.'],
    ['GetEnumerator()', 'QueueEnumerator<T>', 'Returns an enumerator that yields elements in FIFO order.'],
  ]
  const stackMembers = [
    ['init()', '\u2014', 'Allocates an empty stack.'],
    ['Count', 'int (property)', 'Number of elements currently on the stack.'],
    ['Push(item)', 'void', 'Pushes item onto the top of the stack. May trigger a resize.'],
    ['Pop()', 'T', 'Removes and returns the top element. Throws if empty.'],
    ['Peek()', 'T', 'Returns the top element without removing it. Throws if empty.'],
    ['Contains(item)', 'bool', 'Returns true if item is found anywhere in the stack (linear scan, top-to-bottom).'],
    ['Clear()', 'void', 'Discards the internal array and resets size to zero.'],
    ['GetEnumerator()', 'StackEnumerator<T>', 'Returns an enumerator that yields elements in LIFO order (top to bottom).'],
  ]

  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          <InlineCode>Queue&lt;T&gt;</InlineCode> and <InlineCode>Stack&lt;T&gt;</InlineCode> are{' '}
          <strong className="text-text-primary">array-backed</strong> collections implementing
          FIFO and LIFO semantics, respectively. Both grow dynamically (doubling from an initial
          capacity of 4) and provide <InlineCode>Push</InlineCode>/<InlineCode>Pop</InlineCode> or{' '}
          <InlineCode>Enqueue</InlineCode>/<InlineCode>Dequeue</InlineCode> as their primary
          operations, plus non-destructive <InlineCode>Peek</InlineCode>, linear-search{' '}
          <InlineCode>Contains</InlineCode>, and full enumeration via{' '}
          <InlineCode>IEnumerable&lt;T&gt;</InlineCode>.
        </Prose>
      </ScrollReveal>

      {/* Queue<T> */}
      <ScrollReveal delay={0.05}>
        <H2>Queue&lt;T&gt;</H2>
        <Prose>
          A <strong className="text-text-primary">circular buffer</strong> backed by a single
          array. The <InlineCode>_head</InlineCode> and <InlineCode>_tail</InlineCode> indices
          wrap around via modulo, avoiding element shifts on dequeue. When the array fills,
          it is reallocated at double capacity and elements are linearized (head reset to 0).
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Member</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Return</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              {queueMembers.map(([name, ret, desc], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{ret}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Callout tone="blue">
          The enumerator walks logical order (FIFO) by reading <InlineCode>array[(head + i) % capacity]</InlineCode>{' '}
          for <InlineCode>i = 0..Count-1</InlineCode>. This correctly handles the wrap-around case
          where physical indices are non-contiguous after a series of enqueue-dequeue cycles.
        </Callout>
        <CodeBlock code={collectionsQueueCode} language="csharp" filename="queue.shard" />
      </ScrollReveal>

      {/* Stack<T> */}
      <ScrollReveal delay={0.05}>
        <H2>Stack&lt;T&gt;</H2>
        <Prose>
          A <strong className="text-text-primary">contiguous-layout stack</strong> backed by a
          single array. The <InlineCode>_size</InlineCode> field doubles as the insertion index
          — <InlineCode>Push</InlineCode> writes at <InlineCode>array[size]</InlineCode> and
          increments; <InlineCode>Pop</InlineCode> reads from <InlineCode>array[size - 1]</InlineCode>{' '}
          and decrements. Growth doubles capacity and copies elements linearly.
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Member</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Return</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              {stackMembers.map(([name, ret, desc], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{ret}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Callout tone="blue">
          The enumerator walks in <strong className="text-text-primary">LIFO order</strong>{' '}
          (top to bottom). <InlineCode>Contains</InlineCode> also scans top-to-bottom via{' '}
          <InlineCode>for (i = size - 1; i &gt;= 0; --i)</InlineCode>, finding the most recently
          pushed match first — a minor optimization over scanning from the bottom.
        </Callout>
        <CodeBlock code={collectionsStackCode} language="csharp" filename="stack.shard" />
      </ScrollReveal>

      {/* Internal Mechanics */}
      <ScrollReveal delay={0.05}>
        <H2>Internal Mechanics</H2>
        <div className="space-y-5">
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">1</span>
              <strong className="text-text-primary text-sm">Circular Buffer (Queue)</strong>
            </div>
            <Prose>
              The queue stores 4 fields: <InlineCode>_array</InlineCode>, <InlineCode>_head</InlineCode>,{' '}
              <InlineCode>_tail</InlineCode>, <InlineCode>_size</InlineCode>. <InlineCode>Enqueue</InlineCode>{' '}
              writes at <InlineCode>array[tail]</InlineCode> and advances{' '}
              <InlineCode>tail = (tail + 1) % capacity</InlineCode>. <InlineCode>Dequeue</InlineCode>{' '}
              reads from <InlineCode>array[head]</InlineCode> and advances{' '}
              <InlineCode>head = (head + 1) % capacity</InlineCode>. Both are O(1) amortized
              (O(n) on resize). On resize, elements are linearized:{' '}
              <InlineCode>newArray[i] = oldArray[(head + i) % oldCapacity]</InlineCode>.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">2</span>
              <strong className="text-text-primary text-sm">Contiguous Top (Stack)</strong>
            </div>
            <Prose>
              The stack stores 2 fields: <InlineCode>_array</InlineCode> and <InlineCode>_size</InlineCode>.
              <InlineCode>Push</InlineCode> writes at <InlineCode>array[size]</InlineCode> and increments
              size. <InlineCode>Pop</InlineCode> reads <InlineCode>array[size - 1]</InlineCode> and
              decrements. The popped element stays in the array until overwritten by a future{' '}
              <InlineCode>Push</InlineCode> — there is no explicit memory clearing. On resize,
              elements are copied linearly because the stack is always contiguous from index 0.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">3</span>
              <strong className="text-text-primary text-sm">Shared Growth Strategy</strong>
            </div>
            <Prose>
              Both collections grow from initial capacity 4, doubling each time.{' '}
              <InlineCode>Enqueue</InlineCode> and <InlineCode>Push</InlineCode> both call their
              respective <InlineCode>_EnsureCapacity</InlineCode> helpers which check{' '}
              <InlineCode>size &gt;= capacity</InlineCode>. The resize allocates a new array via{' '}
              <InlineCode>AllocateArray</InlineCode>, copies existing elements, replaces the
              field, and drops the old array's reference count.
            </Prose>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}

function CollectionsDictContent() {
  const members = [
    ['init()', '\u2014', 'Allocates an empty dictionary (initial capacity of 4 slots).'],
    ['Count', 'int (property)', 'Returns the number of key-value pairs currently stored.'],
    ['[key]', 'V (indexer)', 'Gets or sets the value for a key. Getter throws if key not found; setter inserts or overwrites.'],
    ['Add(key, value)', 'void', 'Inserts a new key-value pair. Throws if the key already exists.'],
    ['ContainsKey(key)', 'bool', 'Returns true if the key exists, false otherwise. Does not throw.'],
    ['Remove(key)', 'bool', 'Removes the key if found; returns true on success, false if key was not present.'],
    ['Clear()', 'void', 'Removes all entries. Replaces internal arrays with zero-length ones.'],
    ['Keys', 'K[] (property)', 'Returns a new array containing all active keys in the dictionary.'],
    ['Values', 'V[] (property)', 'Returns a new array containing all active values in the dictionary.'],
    ['GetEnumerator()', 'DictionaryEnumerator<K,V>', 'Returns an enumerator that yields KeyValuePair<K,V> on each step. Implements IEnumerable<T>.'],
  ]

  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          <InlineCode>Dictionary&lt;K, V&gt;</InlineCode> is an{' '}
          <strong className="text-text-primary">open-addressing hash table</strong> with linear
          probing and tombstone support. It stores key-value pairs in four parallel internal
          arrays (<InlineCode>_keys</InlineCode>, <InlineCode>_values</InlineCode>,{' '}
          <InlineCode>_hashes</InlineCode>, <InlineCode>_states</InlineCode>) and supports
          insertion, lookup, deletion, and iteration via{' '}
          <InlineCode>IEnumerable&lt;KeyValuePair&lt;K,V&gt;&gt;</InlineCode>.
        </Prose>
        <CodeBlock code={collectionsDictCode} language="csharp" filename="dictionary_basic.shard" />
      </ScrollReveal>

      {/* API Reference */}
      <ScrollReveal delay={0.05}>
        <H2>API Reference</H2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Member</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Return</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              {members.map(([name, ret, desc], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{ret}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Callout tone="blue">
          The indexer <InlineCode>dict[key]</InlineCode> has asymmetric behavior: the getter throws
          on missing keys, while the setter inserts silently. For non-throwing reads, use{' '}
          <InlineCode>ContainsKey</InlineCode> to guard the access. For bulk-safe insertion, prefer{' '}
          <InlineCode>Add</InlineCode> (which throws on duplicates) over the setter.
        </Callout>
      </ScrollReveal>

      {/* Internal Mechanics */}
      <ScrollReveal delay={0.05}>
        <H2>Internal Mechanics</H2>
        <div className="space-y-5">
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">1</span>
              <strong className="text-text-primary text-sm">Open Addressing with Tombstones</strong>
            </div>
            <Prose>
              The hash table uses <strong className="text-text-primary">linear probing</strong> for
              collision resolution. Each slot's state is an integer: <InlineCode>0</InlineCode> = empty,{' '}
              <InlineCode>1</InlineCode> = occupied, <InlineCode>-1</InlineCode> = deleted (tombstone).
              When looking up a key, the probing sequence skips tombstones but can reclaim them for new
              insertions. The tombstone mechanism avoids the "clustering around deleted slots" problem
              that would otherwise break probing chains.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">2</span>
              <strong className="text-text-primary text-sm">Growth at 75% Load Factor</strong>
            </div>
            <Prose>
              The load factor threshold is <InlineCode>count + 1 &gt; (capacity * 3) / 4</InlineCode>{' '}
              — growth triggers when the next insertion would push occupancy beyond 75%.
              When triggered, the table doubles in capacity (starting from an initial size of 4)
              and all existing entries are rehashed into the new arrays via{' '}
              <InlineCode>dictionary_Resize</InlineCode>. Each resize allocates four new arrays
              and copies active (state = 1) entries, skipping tombstones.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">3</span>
              <strong className="text-text-primary text-sm">Hash and Equality via Runtime Dispatchers</strong>
            </div>
            <Prose>
              Key hashing uses <InlineCode>GetObjectHash(key)</InlineCode> — a runtime
              function that dispatches to the appropriate hash implementation based on the key's
              type. Key comparison uses <InlineCode>ObjectsEqual(a, b)</InlineCode> which resolves
              equality through the type system. Both are called inside{' '}
              <InlineCode>dictionary_FindSlot</InlineCode>, which performs the linear probe
              across hash-matching slots.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">4</span>
              <strong className="text-text-primary text-sm">Enumeration via KeyValuePair</strong>
            </div>
            <Prose>
              <InlineCode>GetEnumerator</InlineCode> returns a <InlineCode>DictionaryEnumerator&lt;K,V&gt;</InlineCode>{' '}
              that iterates over active slots. The <InlineCode>Current</InlineCode> getter allocates a
              new <InlineCode>KeyValuePair&lt;K,V&gt;</InlineCode> on each access, populated from the
              <InlineCode>_keys</InlineCode> and <InlineCode>_values</InlineCode> arrays at the current
              index. The <InlineCode>MoveNext</InlineCode> method skips empty and tombstone slots,
              advancing to the next occupied entry.
            </Prose>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}

function CollectionsListContent() {
  const members = [
    ['init()', '—', 'Allocates an empty list (internal array of length 0).'],
    ['init(capacity)', '—', 'Allocates a list with the given initial capacity (array pre-allocated).'],
    ['Length', 'int (property)', 'Returns the number of elements currently in the list.'],
    ['[index]', 'T (indexer)', 'Read or write the element at index. Throws if index is out of bounds.'],
    ['Add(item)', 'void', 'Appends item to the end. Allocates a new internal array of size Length+1 and copies all existing elements.'],
    ['ElementAt(index)', 'T', 'Returns the element at index. Throws if index is out of bounds.'],
    ['RemoveAt(index)', 'void', 'Removes the element at index. Allocates a new array of size Length-1, copying elements before and after the removed index.'],
    ['Clear()', 'void', 'Replaces the internal array with a new zero-length array, effectively removing all elements.'],
    ['GetEnumerator()', 'ListEnumerator<T>', 'Returns an enumerator positioned before the first element. Implements IEnumerable<T>.'],
  ]

  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          <InlineCode>List&lt;T&gt;</InlineCode> is an <strong className="text-text-primary">array-backed
          dynamic list</strong> — the primary linear collection in{' '}
          <InlineCode>shard.collections</InlineCode>. It stores elements in a contiguous internal
          array (<InlineCode>T[]</InlineCode>) and supports indexed access, append, remove-at,
          and iteration via <InlineCode>IEnumerable&lt;T&gt;</InlineCode>.
        </Prose>
        <CodeBlock code={collectionsListCode} language="csharp" filename="list_basic.shard" />
      </ScrollReveal>

      {/* API Reference */}
      <ScrollReveal delay={0.05}>
        <H2>API Reference</H2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Member</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Return</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              {members.map(([name, ret, desc], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{ret}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Callout tone="amber">
          <InlineCode>Add</InlineCode> and <InlineCode>RemoveAt</InlineCode> each allocate a{' '}
          <strong className="text-text-primary">new array</strong> and copy all surviving elements.
          For frequent insertions or removals in hot loops, consider pre-allocating with the
          capacity constructor or using a different data structure.
        </Callout>
      </ScrollReveal>

      {/* Clear */}
      <ScrollReveal delay={0.05}>
        <H2>Clear</H2>
        <Prose>
          <InlineCode>Clear()</InlineCode> discards the internal array and replaces it with a
          zero-length array. The old array's reference count drops, and if no other references
          exist, the GC collects it. This is an O(1) operation — no element-by-element cleanup
          is performed.
        </Prose>
        <CodeBlock code={collectionsListClearCode} language="csharp" filename="list_clear.shard" />
      </ScrollReveal>

      {/* Internal Mechanics */}
      <ScrollReveal delay={0.05}>
        <H2>Internal Mechanics</H2>
        <div className="space-y-5">
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">1</span>
              <strong className="text-text-primary text-sm">Array-Backed Storage</strong>
            </div>
            <Prose>
              The internal field <InlineCode>_array</InlineCode> holds a <InlineCode>T[]</InlineCode>{' '}
              allocated via <InlineCode>AllocateArray(concreteT, size)</InlineCode>. The concrete
              type <InlineCode>T</InlineCode> is resolved from <InlineCode>context.Frame-&gt;TypeArguments[0]</InlineCode>{' '}
              at each call boundary. <InlineCode>Length</InlineCode> reads{' '}
              <InlineCode>arrayType-&gt;Length</InlineCode> directly from the array's type descriptor.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">2</span>
              <strong className="text-text-primary text-sm">Copy-on-Mutation Semantics</strong>
            </div>
            <Prose>
              <InlineCode>Add</InlineCode> allocates a new array of size <InlineCode>currentSize + 1</InlineCode>,
              copies all existing elements via a <InlineCode>for</InlineCode> loop over{' '}
              <InlineCode>GetElement</InlineCode> / <InlineCode>SetElement</InlineCode>, and writes
              the new item at the end. <InlineCode>RemoveAt</InlineCode> similarly allocates a new
              array of size <InlineCode>currentSize - 1</InlineCode> and copies elements in two
              passes (before and after the removed index). The old array is replaced via{' '}
              <InlineCode>SetField</InlineCode> and its reference count drops.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">3</span>
              <strong className="text-text-primary text-sm">Bounds-Checked Access</strong>
            </div>
            <Prose>
              The indexer (<InlineCode>list[index]</InlineCode>) and <InlineCode>ElementAt</InlineCode>{' '}
              both validate that <InlineCode>0 &lt;= index &lt; Length</InlineCode> and throw{' '}
              <InlineCode>std::runtime_error</InlineCode> (wrapped as a ShardScript{' '}
              <InlineCode>RuntimeException</InlineCode>) on out-of-bounds access. The check is
              performed at the C++ level before calling <InlineCode>GetElement</InlineCode>.
            </Prose>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}

/* ===== STANDARD LIBRARY: COLLECTIONS — USAGE SCENARIOS ===== */

function CollectionsScenariosContent() {
  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          Every collection type shines in a specific domain. This section demonstrates
          real-world patterns for <InlineCode>List&lt;T&gt;</InlineCode>,{' '}
          <InlineCode>Dictionary&lt;K,V&gt;</InlineCode>, <InlineCode>Queue&lt;T&gt;</InlineCode>,
          and <InlineCode>Stack&lt;T&gt;</InlineCode>.
        </Prose>
        <CodeBlock code={collectionsScenariosCode} language="csharp" filename="collections_scenarios.shard" />
      </ScrollReveal>

      {/* List<T> */}
      <ScrollReveal delay={0.05}>
        <H2>List&lt;T&gt; — Dynamic Accumulation</H2>
        <div className="space-y-5">
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">1</span>
              <strong className="text-text-primary text-sm">Filter-and-Collect Pipelines</strong>
            </div>
            <Prose>
              Use <InlineCode>List&lt;T&gt;</InlineCode> when you don’t know the result size
              ahead of time. Start with an empty list, call <InlineCode>Add</InlineCode> for each
              matching element in a loop, and return the list. Combined with{' '}
              <InlineCode>IEnumerable&lt;T&gt;</InlineCode>, the result can be consumed by{' '}
              <InlineCode>foreach</InlineCode> or extension methods like <InlineCode>Select</InlineCode>.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">2</span>
              <strong className="text-text-primary text-sm">Buffer for Extension Methods</strong>
            </div>
            <Prose>
              <InlineCode>Select</InlineCode>, <InlineCode>Where</InlineCode>, and custom LINQ-style
              extensions typically build a <InlineCode>List&lt;T&gt;</InlineCode> internally and return
              it as <InlineCode>IEnumerable&lt;T&gt;</InlineCode>. This is the standard pattern for
              materializing a lazy sequence into a concrete collection.
            </Prose>
          </div>
        </div>
      </ScrollReveal>

      {/* Dictionary<K,V> */}
      <ScrollReveal delay={0.05}>
        <H2>Dictionary&lt;K, V&gt; — Keyed Lookup</H2>
        <div className="space-y-5">
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">3</span>
              <strong className="text-text-primary text-sm">Frequency Counting</strong>
            </div>
            <Prose>
              The canonical dictionary pattern: iterate a source sequence, check{' '}
              <InlineCode>ContainsKey</InlineCode>, and either increment the existing value or insert
              1. Because the setter <InlineCode>dict[key] = val</InlineCode> inserts on missing keys,
              you can shorten this to <InlineCode>dict[key] = ContainsKey(key) ? dict[key] + 1 : 1</InlineCode>.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">4</span>
              <strong className="text-text-primary text-sm">Caching / Memoization</strong>
            </div>
            <Prose>
              Store computed results keyed by input parameters. Before computing, check{' '}
              <InlineCode>ContainsKey</InlineCode>; if found, return the cached value immediately.
              This trades memory for CPU and is especially effective for recursive algorithms
              (Fibonacci, dynamic programming) and repeated database queries.
            </Prose>
          </div>
        </div>
      </ScrollReveal>

      {/* Queue<T> */}
      <ScrollReveal delay={0.05}>
        <H2>Queue&lt;T&gt; — First-In-First-Out</H2>
        <div className="space-y-5">
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">5</span>
              <strong className="text-text-primary text-sm">Work Queues / Message Dispatch</strong>
            </div>
            <Prose>
              Producers call <InlineCode>Enqueue</InlineCode> to submit work items; a consumer loop
              calls <InlineCode>Dequeue</InlineCode> to process them in arrival order. This is the
              foundation of job schedulers, network message queues, and event processing pipelines.
              Check <InlineCode>Count &gt; 0</InlineCode> to drain the queue without throwing.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">6</span>
              <strong className="text-text-primary text-sm">Breadth-First Traversal</strong>
            </div>
            <Prose>
              BFS over a tree or graph uses a queue: enqueue the root, then loop — dequeue a
              node, process it, and enqueue all its children. The queue guarantees level-order
              visitation. Combined with a <InlineCode>Dictionary</InlineCode> for visited-tracking,
              this handles arbitrary graphs without infinite loops.
            </Prose>
          </div>
        </div>
      </ScrollReveal>

      {/* Stack<T> */}
      <ScrollReveal delay={0.05}>
        <H2>Stack&lt;T&gt; — Last-In-First-Out</H2>
        <div className="space-y-5">
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">7</span>
              <strong className="text-text-primary text-sm">Undo / History</strong>
            </div>
            <Prose>
              Push each action onto the stack as it is performed. Undo calls <InlineCode>Pop</InlineCode>{' '}
              to retrieve and reverse the most recent action. For redo support, maintain a second
              stack: when an action is undone, push it onto the redo stack. This two-stack pattern
              is the standard undo/redo architecture used in text editors, drawing tools, and state
              machines.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">8</span>
              <strong className="text-text-primary text-sm">Depth-First Traversal</strong>
            </div>
            <Prose>
              DFS over a tree or graph uses a stack: push the root, then loop — pop a node,
              process it, and push all its children. The stack guarantees depth-first order (last
              pushed child is visited first). For iterative tree walkers or pathfinding, this
              avoids recursion limits while maintaining the same traversal semantics.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">9</span>
              <strong className="text-text-primary text-sm">Expression Evaluation</strong>
            </div>
            <Prose>
              Postfix (RPN) expression evaluators use a stack of operands: push numbers, and when
              an operator is encountered, pop the required operands, compute the result, and push
              it back. After processing all tokens, the stack contains a single value — the
              result. This pattern also applies to bracket matching (push open brackets, pop on
              close) and syntax validation.
            </Prose>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}

/* ===== STANDARD LIBRARY: JSON — SERIALIZATION ===== */

/* ===== STANDARD LIBRARY: JSON — DOM MODEL (JsonNode) ===== */

function JsonNodeContent() {
  const inspection = [
    ['Kind()', 'string', 'Returns the JSON type as a string: "null", "bool", "number", "string", "array", "object".'],
    ['IsNull()', 'bool', 'True if the node is null or missing.'],
    ['IsObject()', 'bool', 'True if the node is a JSON object.'],
    ['IsArray()', 'bool', 'True if the node is a JSON array.'],
  ]
  const extraction = [
    ['AsInt()', 'int', 'Returns the integer value. Non-number types return 0.'],
    ['AsDouble()', 'double', 'Returns the floating-point value. Non-number types return 0.0.'],
    ['AsBool()', 'bool', 'Returns the boolean value. Number types test != 0. Other types return false.'],
    ['AsString()', 'string', 'Returns the string value. For non-string types, returns the JSON representation.'],
  ]
  const navigation = [
    ['Get(key)', 'JsonNode', 'Returns the child node at key. Returns null if the node is not an object or key is missing.'],
    ['Set(key, value)', 'void', 'Sets the key to a new JsonNode value. If the node is not an object, it becomes one. Existing keys are overwritten.'],
    ['Contains(key)', 'bool', 'True if the node is an object and contains the given key.'],
    ['Keys()', 'string[]', 'Returns a new array of all keys in the object. Empty array for non-objects.'],
  ]
  const arrayOps = [
    ['Length()', 'int', 'Returns the number of elements if the node is an array; 0 otherwise.'],
    ['At(index)', 'JsonNode', 'Returns the element at index. Returns null for out-of-bounds or non-array nodes.'],
    ['Add(value)', 'void', 'Appends a JsonNode to the array. If the node is not an array, it becomes one.'],
  ]

  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          <InlineCode>JsonNode</InlineCode> is the <strong className="text-text-primary">DOM (Document
          Object Model)</strong> representation of a JSON value. Unlike{' '}
          <InlineCode>JsonSerializer</InlineCode> which maps JSON to typed ShardScript objects,
          <InlineCode>JsonNode</InlineCode> lets you <strong className="text-text-primary">inspect,
          navigate, and mutate</strong> arbitrary JSON without knowing its structure at compile time.
          Each node wraps an internal C++ <InlineCode>JsonDom</InlineCode> pointer stored via the{' '}
          <InlineCode>_handle</InlineCode> field (a reinterpret-cast of the native pointer to{' '}
          <InlineCode>int</InlineCode>).
        </Prose>
        <CodeBlock code={jsonNodeCode} language="csharp" filename="json_node.shard" />
      </ScrollReveal>

      {/* Type Inspection */}
      <ScrollReveal delay={0.05}>
        <H2>Type Inspection</H2>
        <Prose>
          Query the kind of a node before extracting its value:
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Method</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Return</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              {inspection.map(([name, ret, desc], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{ret}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollReveal>

      {/* Value Extraction */}
      <ScrollReveal delay={0.05}>
        <H2>Value Extraction</H2>
        <Prose>
          Extract typed values from a node. Non-matching types return zero-like defaults
          (0, 0.0, false, empty string) rather than throwing:
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Method</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Return</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              {extraction.map(([name, ret, desc], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{ret}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Callout tone="blue">
          <InlineCode>AsString()</InlineCode> has special behavior for non-string types: it
          serializes the entire node to its JSON text representation via{' '}
          <InlineCode>WriteDom</InlineCode>. This means <InlineCode>AsString()</InlineCode> on a
          number node returns <InlineCode>"42"</InlineCode>; on an array node it returns{' '}
          <InlineCode>"[1,2,3]"</InlineCode>.
        </Callout>
      </ScrollReveal>

      {/* Object Navigation */}
      <ScrollReveal delay={0.05}>
        <H2>Object Navigation &amp; Mutation</H2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Method</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Return</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              {navigation.map(([name, ret, desc], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{ret}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Callout tone="amber">
          <InlineCode>Set</InlineCode> on a non-object node <strong className="text-text-primary">converts
          it to an object</strong> by overwriting <InlineCode>dom-&gt;kind</InlineCode>. Similarly,{' '}
          <InlineCode>Add</InlineCode> converts non-array nodes to arrays. This is a design choice
          for ergonomic mutation — a parsed number or string can become a container in-place.
        </Callout>
      </ScrollReveal>

      {/* Array Operations */}
      <ScrollReveal delay={0.05}>
        <H2>Array Operations</H2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Method</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Return</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              {arrayOps.map(([name, ret, desc], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{ret}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollReveal>

      {/* Internal Mechanics */}
      <ScrollReveal delay={0.05}>
        <H2>Internal Mechanics</H2>
        <div className="space-y-5">
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">1</span>
              <strong className="text-text-primary text-sm">Handle-Based Pointer Wrapping</strong>
            </div>
            <Prose>
              Each <InlineCode>JsonNode</InlineCode> instance stores a single field{' '}
              <InlineCode>_handle: int</InlineCode> which is a reinterpret-cast of the C++{' '}
              <InlineCode>JsonDom*</InlineCode> pointer to <InlineCode>int64_t</InlineCode>.
              <InlineCode>WrapDom</InlineCode> allocates a <InlineCode>JsonNode</InlineCode> and
              stores the pointer via <InlineCode>SetField(_handle, FromValue(ptr))</InlineCode>.
              <InlineCode>UnwrapDom</InlineCode> reads <InlineCode>_handle</InlineCode> and casts
              back to <InlineCode>JsonDom*</InlineCode>. This avoids any external registry or hash
              map — each wrapper is a self-contained handle.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">2</span>
              <strong className="text-text-primary text-sm">Shared Native Dom Tree</strong>
            </div>
            <Prose>
              <InlineCode>JsonNode</InlineCode> and <InlineCode>JsonSerializer</InlineCode> share
              the same internal <InlineCode>JsonDom</InlineCode> tree representation. The parser
              (<InlineCode>JsonParser</InlineCode>) produces a <InlineCode>JsonDom*</InlineCode>
              which can be consumed by <InlineCode>DecodeValue</InlineCode> (typed deserialization)
              or <InlineCode>WrapDom</InlineCode> (untyped DOM). Similarly,{' '}
              <InlineCode>ToString()</InlineCode> on a <InlineCode>JsonNode</InlineCode> calls{' '}
              <InlineCode>WriteDom</InlineCode> — the same serializer used by{' '}
              <InlineCode>JsonSerializer.Serialize</InlineCode>.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">3</span>
              <strong className="text-text-primary text-sm">No Garbage Collection of Dom Nodes</strong>
            </div>
            <Prose>
              The C++ <InlineCode>JsonDom</InlineCode> tree is allocated with <InlineCode>new</InlineCode>{' '}
              and is <strong className="text-text-primary">never freed</strong> — there is no
              destructor. Each parsed or mutated <InlineCode>JsonNode</InlineCode> corresponds to a
              subtree of <InlineCode>JsonDom</InlineCode> nodes that live for the lifetime of the
              process. This is acceptable for configuration loading, API response inspection, and
              other bounded JSON workloads, but is not suitable for unbounded stream processing or
              long-running DOM mutations that produce large numbers of intermediate nodes.
            </Prose>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}

/* ===== STANDARD LIBRARY: JSON — USAGE SCENARIOS ===== */

function JsonScenariosContent() {
  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          <InlineCode>shard.json</InlineCode> addresses two complementary needs: typed
          serialization for known structures (<InlineCode>JsonSerializer</InlineCode>) and
          untyped exploration for unknown or loosely-structured data (<InlineCode>JsonNode</InlineCode>).
          This section demonstrates both patterns in realistic scenarios.
        </Prose>
        <CodeBlock code={jsonScenariosCode} language="csharp" filename="json_scenarios.shard" />
      </ScrollReveal>

      {/* Config Files */}
      <ScrollReveal delay={0.05}>
        <H2>Configuration File Parsing</H2>
        <div className="space-y-5">
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">1</span>
              <strong className="text-text-primary text-sm">Strongly-Typed Config via JsonSerializer</strong>
            </div>
            <Prose>
              Define a <InlineCode>class</InlineCode> or <InlineCode>struct</InlineCode> that mirrors
              the expected JSON schema, then call{' '}
              <InlineCode>JsonSerializer.Deserialize&lt;YourConfig&gt;(text)</InlineCode>. The result
              is a fully-typed ShardScript object with compile-time field access. Missing keys in the
              JSON keep the field’s default value (0, empty string, false), which acts as a
              natural default-injection mechanism.
            </Prose>
            <p className="mt-3 text-text-secondary leading-relaxed">
              <strong className="text-text-primary">Versioning.</strong> When the config schema
              evolves, add new fields to the class — old config files without the new keys
              will deserialize with the default values. Removed fields simply become ignored extra
              keys in the JSON. This means config files are forward-compatible without migration
              scripts.
            </p>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">2</span>
              <strong className="text-text-primary text-sm">Validation at Parse Time</strong>
            </div>
            <Prose>
              If the config file contains a type mismatch (e.g. a string where an <InlineCode>int</InlineCode>{' '}
              was expected), <InlineCode>Deserialize</InlineCode> throws a{' '}
              <InlineCode>RuntimeException</InlineCode>. Wrap the call in{' '}
              <InlineCode>try</InlineCode>/<InlineCode>catch</InlineCode> to provide a user-friendly
              error message pointing to the offending field. This is especially useful for CLI
              tools and daemons that load a user-editable config.
            </Prose>
          </div>
        </div>
      </ScrollReveal>

      {/* API Responses */}
      <ScrollReveal delay={0.05}>
        <H2>API Response Parsing Without a Fixed Schema</H2>
        <div className="space-y-5">
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">3</span>
              <strong className="text-text-primary text-sm">Dynamic Inspection via JsonNode</strong>
            </div>
            <Prose>
              When integrating with a third-party API whose response format may vary between
              endpoints, between versions, or based on runtime conditions, use{' '}
              <InlineCode>JsonNode.Parse</InlineCode> instead of a typed deserialization. This
              gives you a DOM tree you can walk with <InlineCode>Get</InlineCode>,{' '}
              <InlineCode>Contains</InlineCode>, <InlineCode>Keys</InlineCode>, and the inspection
              methods (<InlineCode>IsArray</InlineCode>, <InlineCode>IsObject</InlineCode>,
              <InlineCode>IsNull</InlineCode>).
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">4</span>
              <strong className="text-text-primary text-sm">Defensive Field Discovery</strong>
            </div>
            <Prose>
              Before accessing a field, check <InlineCode>Contains(key)</InlineCode> to avoid null
              dereferences. Use <InlineCode>Keys()</InlineCode> to enumerate all available fields
              and log or validate them. For arrays, iterate with{' '}
              <InlineCode>At(index)</InlineCode> and check <InlineCode>Length()</InlineCode> first.
              This pattern is the JSON equivalent of duck-typing — your code adapts to whatever
              shape the response has.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">5</span>
              <strong className="text-text-primary text-sm">Hybrid Approach</strong>
            </div>
            <Prose>
              Use <InlineCode>JsonNode</InlineCode> for the top-level inspection (validate structure,
              extract a <InlineCode>"data"</InlineCode> or <InlineCode>"payload"</InlineCode> field
              as a string), then pass that extracted string to{' '}
              <InlineCode>JsonSerializer.Deserialize&lt;T&gt;</InlineCode> for the known inner
              structure. This combines the flexibility of DOM inspection with the type safety of
              model binding: <InlineCode>JsonSerializer.Deserialize&lt;Item&gt;(root.Get("data").AsString())</InlineCode>.
            </Prose>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}

/* ===== STANDARD LIBRARY: STREAMS — INTERFACES ===== */

/* ===== STANDARD LIBRARY: STREAMS — MEMORYSTREAM ===== */

/* ===== STANDARD LIBRARY: STREAMS — STREAMREADER / STREAMWRITER ===== */

function StreamTextContent() {
  const readerMethods = [
    ['Read()', 'int', 'Reads a single UTF-8 codepoint. Returns the Unicode code point (0–0x10FFFF), or -1 at EOF.'],
    ['ReadLine()', 'string', 'Reads characters until \\n or EOF. The returned string does not include the newline. Returns "" at EOF.'],
    ['ReadToEnd()', 'string', 'Reads all remaining bytes and decodes them as UTF-8 into a single string.'],
    ['Close() / Dispose()', 'void', 'Disposes the underlying stream and marks the reader as disposed.'],
  ]
  const writerMethods = [
    ['Write(value)', 'void', 'Writes the string as UTF-8 bytes to the underlying stream.'],
    ['WriteLine(value)', 'void', 'Writes the string as UTF-8 bytes followed by a \\n newline.'],
    ['Flush()', 'void', 'Flushes the underlying stream.'],
    ['Close() / Dispose()', 'void', 'Flushes and disposes the underlying stream, then marks the writer as disposed.'],
  ]

  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          <InlineCode>StreamReader</InlineCode> and <InlineCode>StreamWriter</InlineCode> are{' '}
          <strong className="text-text-primary">text-oriented wrappers</strong> around an{' '}
          <InlineCode>IReadableStream</InlineCode> / <InlineCode>IWritableStream</InlineCode>.
          They handle UTF-8 encoding/decoding and provide line-oriented and whole-stream text
          operations. Both implement <InlineCode>IDisposable</InlineCode> — disposing the
          wrapper also disposes the underlying stream.
        </Prose>
        <CodeBlock code={streamReaderWriterCode} language="csharp" filename="stream_reader_writer.shard" />
      </ScrollReveal>

      {/* StreamReader */}
      <ScrollReveal delay={0.05}>
        <H2>StreamReader</H2>
        <Prose>
          Wraps an <InlineCode>IReadableStream</InlineCode> and provides UTF-8 text decoding
          on top of raw byte reads. The internal buffer is a single 1-byte array reused via{' '}
          <InlineCode>ObjectRef</InlineCode> to avoid per-character allocations.
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Method</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Return</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              {readerMethods.map(([name, ret, desc], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{ret}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Callout tone="blue">
          <InlineCode>Read()</InlineCode> decodes a full UTF-8 codepoint (1–4 bytes) using
          the standard bit-pattern detection: 0xxxxxxx (1 byte), 110xxxxx (2 bytes), 1110xxxx
          (3 bytes), 11110xxx (4 bytes). Invalid sequences throw{' '}
          <InlineCode>RuntimeException("Invalid UTF-8 sequence.")</InlineCode>.
        </Callout>
      </ScrollReveal>

      {/* StreamWriter */}
      <ScrollReveal delay={0.05}>
        <H2>StreamWriter</H2>
        <Prose>
          Wraps an <InlineCode>IWritableStream</InlineCode> and encodes ShardScript strings
          to UTF-8 before writing raw bytes. <InlineCode>WriteLine</InlineCode> appends a{' '}
          <InlineCode>\n</InlineCode> after the encoded string.
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Method</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Return</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              {writerMethods.map(([name, ret, desc], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{ret}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollReveal>

      {/* Internal Mechanics */}
      <ScrollReveal delay={0.05}>
        <H2>Internal Mechanics</H2>
        <div className="space-y-5">
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">1</span>
              <strong className="text-text-primary text-sm">UTF-8 Byte-by-Byte Decoding</strong>
            </div>
            <Prose>
              <InlineCode>ReadLine</InlineCode> reads one byte at a time via{' '}
              <InlineCode>StreamReadRaw</InlineCode> into a reusable 1-byte <InlineCode>ObjectRef</InlineCode>{' '}
              buffer, accumulating bytes until it hits <InlineCode>\n</InlineCode> or EOF.
              The accumulated bytes are then converted from UTF-8 to a wide string via{' '}
              <InlineCode>Utf8ToWide</InlineCode>. <InlineCode>ReadToEnd</InlineCode> uses
              a 256-byte chunk buffer to reduce the number of stream read calls.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">2</span>
              <strong className="text-text-primary text-sm">Dispose Cascades to Underlying Stream</strong>
            </div>
            <Prose>
              Both <InlineCode>Close</InlineCode> and <InlineCode>Dispose</InlineCode> call{' '}
              <InlineCode>StreamDisposeRaw</InlineCode> on the wrapped stream, then set{' '}
              <InlineCode>_disposed = true</InlineCode>. All methods call{' '}
              <InlineCode>EnsureReaderNotDisposed</InlineCode> /{' '}
              <InlineCode>EnsureWriterNotDisposed</InlineCode> as their first action, throwing
              a descriptive <InlineCode>RuntimeException</InlineCode> if the wrapper has been
              disposed.
            </Prose>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}

/* ===== STANDARD LIBRARY: STREAMS — BINARYREADER / BINARYWRITER ===== */

function StreamBinaryContent() {
  const readerMethods = [
    ['ReadBoolean()', 'bool', 'Reads 1 byte; true if non-zero, false if zero.'],
    ['ReadByte()', 'byte', 'Reads 1 byte.'],
    ['ReadInt32()', 'int', 'Reads 4 bytes in little-endian order and returns as int.'],
    ['ReadInt64()', 'int', 'Reads 8 bytes in little-endian order and returns as int.'],
    ['ReadDouble()', 'double', 'Reads 8 bytes in little-endian IEEE 754 double-precision format.'],
    ['ReadString()', 'string', 'Reads a length-prefixed UTF-8 string: 4-byte Int32 length, then that many bytes of UTF-8.'],
    ['ReadBytes(count)', 'byte[]', 'Reads exactly count bytes. Throws if EOF is reached before count bytes.'],
    ['Close() / Dispose()', 'void', 'Disposes the underlying stream and marks the reader as disposed.'],
  ]
  const writerMethods = [
    ['Write(bool)', 'void', 'Writes 1 byte: 1 for true, 0 for false.'],
    ['Write(byte)', 'void', 'Writes 1 byte.'],
    ['Write(int)', 'void', 'Writes 8 bytes (Int64) in little-endian. Use WriteInt32 for 4 bytes.'],
    ['WriteInt32(int)', 'void', 'Writes 4 bytes in little-endian.'],
    ['WriteInt64(int)', 'void', 'Writes 8 bytes in little-endian.'],
    ['Write(double)', 'void', 'Writes 8 bytes in little-endian IEEE 754 double-precision.'],
    ['Write(string)', 'void', 'Writes a length-prefixed UTF-8 string: 4-byte Int32 length, then UTF-8 bytes.'],
    ['Write(byte[])', 'void', 'Writes the raw bytes of the array.'],
    ['Flush()', 'void', 'Flushes the underlying stream.'],
    ['Close() / Dispose()', 'void', 'Flushes and disposes the underlying stream, then marks the writer as disposed.'],
  ]

  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          <InlineCode>BinaryReader</InlineCode> and <InlineCode>BinaryWriter</InlineCode> are{' '}
          <strong className="text-text-primary">typed binary I/O wrappers</strong> around an{' '}
          <InlineCode>IReadableStream</InlineCode> / <InlineCode>IWritableStream</InlineCode>.
          They encode and decode ShardScript primitive types in a fixed binary format: integers
          are little-endian, doubles are IEEE 754, strings are length-prefixed UTF-8. Both
          implement <InlineCode>IDisposable</InlineCode>.
        </Prose>
        <CodeBlock code={streamBinaryCode} language="csharp" filename="binary_reader_writer.shard" />
      </ScrollReveal>

      {/* BinaryReader */}
      <ScrollReveal delay={0.05}>
        <H2>BinaryReader</H2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Method</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Return</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              {readerMethods.map(([name, ret, desc], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{ret}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Callout tone="amber">
          <InlineCode>ReadBytes(count)</InlineCode> and <InlineCode>ReadString</InlineCode> are{' '}
          <strong className="text-text-primary">exact-count reads</strong> — they throw if the
          stream does not have enough bytes remaining. Check the stream's available data before
          calling these methods, or wrap in <InlineCode>try</InlineCode>/<InlineCode>catch</InlineCode>.
        </Callout>
      </ScrollReveal>

      {/* BinaryWriter */}
      <ScrollReveal delay={0.05}>
        <H2>BinaryWriter</H2>
        <Prose>
          Note the overloaded <InlineCode>Write</InlineCode> methods: the type of the argument
          determines which encoding is used. <InlineCode>Write(42)</InlineCode> writes an Int64
          (8 bytes); <InlineCode>WriteInt32(42)</InlineCode> writes an Int32 (4 bytes). Choose
          the appropriate method based on the expected reader on the other side.
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Method</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Return</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              {writerMethods.map(([name, ret, desc], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{ret}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollReveal>

      {/* Internal Mechanics */}
      <ScrollReveal delay={0.05}>
        <H2>Internal Mechanics</H2>
        <div className="space-y-5">
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">1</span>
              <strong className="text-text-primary text-sm">Little-Endian Serialization</strong>
            </div>
            <Prose>
              All multi-byte integer and floating-point types are serialized in{' '}
              <strong className="text-text-primary">little-endian</strong> byte order. The raw
              helper functions (<InlineCode>WriteInt32Raw</InlineCode>,{' '}
              <InlineCode>ReadInt32Raw</InlineCode>, etc.) write/read <InlineCode>std::int32_t</InlineCode>{' '}
              via <InlineCode>reinterpret_cast</InlineCode> to <InlineCode>uint8_t*</InlineCode> and
              write <InlineCode>sizeof(T)</InlineCode> bytes directly. This is zero-copy at the
              C++ level — no bit manipulation, no byte swapping.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">2</span>
              <strong className="text-text-primary text-sm">Length-Prefixed Strings</strong>
            </div>
            <Prose>
              <InlineCode>WriteString</InlineCode> encodes the ShardScript wide string to UTF-8,
              writes a 4-byte Int32 length prefix, then writes the UTF-8 bytes.{' '}
              <InlineCode>ReadString</InlineCode> reads the 4-byte length, then reads exactly
              that many bytes, then converts from UTF-8 back to a wide string. An empty string
              is stored as 4 zero bytes (length = 0).
            </Prose>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}

/* ===== STANDARD LIBRARY: STREAMS — USAGE SCENARIOS ===== */

function StreamScenariosContent() {
  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          The stream interfaces and their concrete implementations enable a{' '}
          <strong className="text-text-primary">streaming data model</strong>: process data
          in chunks as it arrives, without holding the entire payload in memory. This section
          demonstrates patterns for large-file line processing, binary record streaming over
          sockets, and in-memory pipeline composition.
        </Prose>
        <CodeBlock code={streamScenariosCode} language="csharp" filename="stream_scenarios.shard" />
      </ScrollReveal>

      {/* Streaming patterns */}
      <ScrollReveal delay={0.05}>
        <H2>Streaming Patterns</H2>
        <div className="space-y-5">
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">1</span>
              <strong className="text-text-primary text-sm">Chunked Reading from Disk</strong>
            </div>
            <Prose>
              <InlineCode>FileStream</InlineCode> + <InlineCode>StreamReader</InlineCode> lets
              you process a multi-gigabyte file <strong className="text-text-primary">line by
              line</strong>. The reader reads one byte at a time from the stream, accumulating
              until a newline. Only the current line is held in memory — the rest of the file
              stays on disk. This is the standard pattern for log analysis, CSV parsing, and
              data import pipelines where loading the entire file into a <InlineCode>string</InlineCode>{' '}
              would exhaust memory.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">2</span>
              <strong className="text-text-primary text-sm">Binary Record Streaming over Network</strong>
            </div>
            <Prose>
              <InlineCode>SocketStream</InlineCode> + <InlineCode>BinaryReader</InlineCode> enables
              protocol-level binary parsing without intermediate buffers. Read{' '}
              <InlineCode>Int32</InlineCode> for record IDs, <InlineCode>Double</InlineCode> for
              sensor values, <InlineCode>ReadBytes</InlineCode> for payloads — each call reads
              exactly the required number of bytes from the socket. The OS TCP buffer handles
              the streaming; your ShardScript code processes one record at a time.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">3</span>
              <strong className="text-text-primary text-sm">In-Memory Pipeline Composition</strong>
            </div>
            <Prose>
              Chain two <InlineCode>MemoryStream</InlineCode> instances: read from one, transform
              the data, write to the other. The 64-byte chunk buffer limits per-iteration memory
              usage regardless of the source stream's total size. This pattern composes cleanly
              — you can replace the <InlineCode>MemoryStream</InlineCode> with a{' '}
              <InlineCode>FileStream</InlineCode> or <InlineCode>SocketStream</InlineCode> and
              the transformation logic stays identical because it operates through the interface
              abstraction.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">4</span>
              <strong className="text-text-primary text-sm">Interface Polymorphism = Backend Independence</strong>
            </div>
            <Prose>
              Because <InlineCode>StreamReader</InlineCode> accepts <InlineCode>IReadableStream</InlineCode>{' '}
              and <InlineCode>BinaryReader</InlineCode> accepts <InlineCode>IReadableStream</InlineCode>,
              the same parsing logic works identically for <InlineCode>FileStream</InlineCode>,{' '}
              <InlineCode>SocketStream</InlineCode>, or <InlineCode>MemoryStream</InlineCode>.
              Write your data-processing functions against the interfaces, and the callers decide
              the backend. This is the core value of the three-tier interface hierarchy.
            </Prose>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}

/* ===== STANDARD LIBRARY: FILESYSTEM — FILE & PATH ===== */

/* ===== STANDARD LIBRARY: FILESYSTEM — DIRECTORY & DIRECTORYINFO ===== */

function DirectoryContent() {
  const dirStatic = [
    ['Exists(path)', 'bool', 'Returns true if the directory exists on disk.'],
    ['Create(path)', 'DirectoryInfo', 'Creates the directory (and any missing parents). Returns a DirectoryInfo for it. No-op if already exists.'],
    ['Delete(path)', 'void', 'Deletes the directory. Throws if not empty or does not exist.'],
  ]
  const dirInfoMembers = [
    ['init(fullPath)', 'Constructs a DirectoryInfo from an absolute or relative path.'],
    ['FullName', 'string (property)', 'Returns the full path used to construct this DirectoryInfo.'],
    ['Name', 'string (property)', 'Returns the directory name (last component of the path).'],
    ['Exists', 'bool (property)', 'Checks whether the directory exists on disk via fs::is_directory().'],
    ['Create()', 'void', 'Creates the directory on disk (including parent directories). No-op if already exists.'],
    ['Delete()', 'void', 'Deletes the directory and all its contents recursively via fs::remove_all().'],
    ['/ string', 'DirectoryInfo', 'Combines this directory path with a relative path segment, returning a new DirectoryInfo.'],
    ['/ FileInfo', 'FileInfo', 'Combines this directory path with a FileInfo, returning a FileInfo with the joined path.'],
  ]

  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          The <InlineCode>shard.filesystem</InlineCode> library provides two directory abstractions:{' '}
          <InlineCode>Directory</InlineCode> (a <strong className="text-text-primary">static utility
          class</strong>) and <InlineCode>DirectoryInfo</InlineCode> (an{' '}
          <strong className="text-text-primary">instance-based wrapper</strong> around a directory
          path). <InlineCode>Directory</InlineCode> is the quick "check/create/delete by path" API;
          <InlineCode>DirectoryInfo</InlineCode> carries the path as state and supports the{' '}
          <InlineCode>/</InlineCode> operator for path composition.
        </Prose>
        <CodeBlock code={directoryCode} language="csharp" filename="directory_basic.shard" />
      </ScrollReveal>

      {/* Directory */}
      <ScrollReveal delay={0.05}>
        <H2>Class Directory</H2>
        <Prose>
          All methods are <InlineCode>static</InlineCode>. <InlineCode>Create</InlineCode> returns
          a <InlineCode>DirectoryInfo</InlineCode> for the newly created (or existing) directory,
          enabling further operations.
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Method</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Return</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              {dirStatic.map(([name, ret, desc], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{ret}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollReveal>

      {/* DirectoryInfo */}
      <ScrollReveal delay={0.05}>
        <H2>Class DirectoryInfo</H2>
        <Prose>
          An instance wraps a single path stored in the <InlineCode>FullName</InlineCode> backing
          field. The <InlineCode>/</InlineCode> operator creates new instances without touching the
          disk — it is a pure path manipulation. Both <InlineCode>DirectoryInfo / string</InlineCode>{' '}
          and <InlineCode>DirectoryInfo / FileInfo</InlineCode> are supported.
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Member</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Return</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              {dirInfoMembers.map((row, i) => (
                <tr key={row[0]} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{row[0]}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{row.length > 2 ? row[1] : '\u2014'}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{row.length > 2 ? row[2] : row[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollReveal>

      {/* Internal Mechanics */}
      <ScrollReveal delay={0.05}>
        <H2>Internal Mechanics</H2>
        <div className="space-y-5">
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">1</span>
              <strong className="text-text-primary text-sm">Thin Wrappers Around std::filesystem</strong>
            </div>
            <Prose>
              <InlineCode>Exists</InlineCode> calls <InlineCode>fs::exists(path)</InlineCode> for{' '}
              <InlineCode>Directory</InlineCode> and <InlineCode>fs::is_directory(path)</InlineCode>{' '}
              for <InlineCode>DirectoryInfo</InlineCode>. <InlineCode>Create</InlineCode> uses{' '}
              <InlineCode>fs::create_directories</InlineCode> (recursive mkdir -p).{' '}
              <InlineCode>Delete</InlineCode> uses <InlineCode>fs::remove</InlineCode> for{' '}
              <InlineCode>Directory</InlineCode> (single directory, must be empty) and{' '}
              <InlineCode>fs::remove_all</InlineCode> for <InlineCode>DirectoryInfo</InlineCode>{' '}
              (recursive, deletes contents).
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">2</span>
              <strong className="text-text-primary text-sm">Path Composition via / Operator</strong>
            </div>
            <Prose>
              The <InlineCode>/</InlineCode> operator is overloaded on <InlineCode>DirectoryInfo</InlineCode>{' '}
              as <InlineCode>TokenType::DivOperator</InlineCode>. It takes the stored{' '}
              <InlineCode>FullName</InlineCode>, joins the right operand (string or FileInfo), and
              allocates a new <InlineCode>DirectoryInfo</InlineCode> or <InlineCode>FileInfo</InlineCode>{' '}
              with the result. This operator never touches the disk — it is a pure path manipulation.
              The internal <InlineCode>pathJoin</InlineCode> helper uses platform-aware separator logic.
            </Prose>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}

/* ===== STANDARD LIBRARY: FILESYSTEM — PATH CONCATENATION ===== */

/* ===== STANDARD LIBRARY: FILESYSTEM — USAGE SCENARIOS ===== */

/* ===== STANDARD LIBRARY: SUBPROCESS — PROCESS & PROCESSSTARTINFO ===== */

/* ===== STANDARD LIBRARY: SUBPROCESS — I/O & LIFECYCLE ===== */

function SubprocessIOLifecycleContent() {
  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          This section covers the three pillars of process interaction:{' '}
          <strong className="text-text-primary">I/O redirection</strong> (stdout, stderr, stdin),{' '}
          <strong className="text-text-primary">lifecycle control</strong> (WaitForExit, Kill), and{' '}
          <strong className="text-text-primary">resource cleanup</strong> (IDisposable + defer).
        </Prose>
      </ScrollReveal>

      {/* I/O Redirection */}
      <ScrollReveal delay={0.05}>
        <H2>I/O Redirection</H2>
        <Prose>
          By default, process I/O is not captured. To read stdout or stderr, set the corresponding{' '}
          <InlineCode>RedirectStandard*</InlineCode> flag to <InlineCode>true</InlineCode> on the{' '}
          <InlineCode>ProcessStartInfo</InlineCode> before launching. This causes the subprocess
          library to create OS pipes and redirect the child's file descriptors.
        </Prose>
        <div className="space-y-5 mt-5">
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">1</span>
              <strong className="text-text-primary text-sm">Reading stdout: ReadToEnd()</strong>
            </div>
            <Prose>
              Requires <InlineCode>RedirectStandardOutput = true</InlineCode>. Reads the stdout
              pipe in 4096-byte chunks via <InlineCode>subprocess_read_stdout</InlineCode> until
              the pipe is closed (child exits). After the read loop, calls{' '}
              <InlineCode>subprocess_join</InlineCode> to collect the exit code. The result is
              converted from UTF-8 to a ShardScript <InlineCode>string</InlineCode>. This is a{' '}
              <strong className="text-text-primary">blocking</strong> call.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">2</span>
              <strong className="text-text-primary text-sm">Reading stderr: ReadErrorToEnd()</strong>
            </div>
            <Prose>
              Requires <InlineCode>RedirectStandardError = true</InlineCode>. Identical mechanics
              to <InlineCode>ReadToEnd</InlineCode> but reads from the stderr pipe via{' '}
              <InlineCode>subprocess_read_stderr</InlineCode>. Both can be called on the same
              process — they read from independent pipes. Typical pattern: call{' '}
              <InlineCode>ReadToEnd</InlineCode> for the expected output first, then{' '}
              <InlineCode>ReadErrorToEnd</InlineCode> for diagnostic messages.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">3</span>
              <strong className="text-text-primary text-sm">Writing stdin: Write() / WriteLine()</strong>
            </div>
            <Prose>
              Requires <InlineCode>RedirectStandardInput = true</InlineCode>. Converts the
              ShardScript string to UTF-8 and writes it to the child's stdin pipe via{' '}
              <InlineCode>std::fwrite</InlineCode> followed by <InlineCode>std::fflush</InlineCode>.
              <InlineCode>WriteLine</InlineCode> calls <InlineCode>Write</InlineCode> then appends{' '}
              <InlineCode>\n</InlineCode>. This is typically used to feed input to interactive
              CLI tools or pipe data between processes.
            </Prose>
          </div>
        </div>
        <CodeBlock code={subprocessIOCode} language="csharp" filename="subprocess_io.shard" />
      </ScrollReveal>

      {/* WaitForExit & Kill */}
      <ScrollReveal delay={0.05}>
        <H2>WaitForExit &amp; Kill</H2>
        <div className="space-y-5">
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">4</span>
              <strong className="text-text-primary text-sm">WaitForExit() — Indefinite Block</strong>
            </div>
            <Prose>
              Calls <InlineCode>subprocess_join</InlineCode> which blocks the calling thread until
              the child process terminates. Returns the integer exit code. Stores the code in the{' '}
              <InlineCode>_exitCode</InlineCode> field so <InlineCode>ExitCode</InlineCode> property
              returns the correct value after the call. Throws if the process handle is invalid.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">5</span>
              <strong className="text-text-primary text-sm">WaitForExit(ms) — Timed Poll</strong>
            </div>
            <Prose>
              Polls <InlineCode>subprocess_alive</InlineCode> in a loop with 10ms sleep intervals
              until either the process exits or the deadline is reached. Returns <InlineCode>true</InlineCode>{' '}
              if the process exited within the timeout, <InlineCode>false</InlineCode> if it timed out.
              On timeout, the process is <strong className="text-text-primary">not killed</strong> —
              it continues running. Pass a negative timeout to fall through to the indefinite variant.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">6</span>
              <strong className="text-text-primary text-sm">Kill() — Forceful Termination</strong>
            </div>
            <Prose>
              Calls <InlineCode>subprocess_terminate</InlineCode> which sends{' '}
              <InlineCode>TerminateProcess</InlineCode> (Windows) or <InlineCode>SIGTERM</InlineCode>{' '}
              (Linux). Sets <InlineCode>_exitCode</InlineCode> to -1 to indicate forced termination.
              Throws if the handle is invalid. After <InlineCode>Kill</InlineCode>,{' '}
              <InlineCode>HasExited</InlineCode> returns true on the next poll.
            </Prose>
          </div>
        </div>
        <CodeBlock code={subprocessTimeoutCode} language="csharp" filename="subprocess_timeout.shard" />
      </ScrollReveal>

      {/* IDisposable */}
      <ScrollReveal delay={0.05}>
        <H2>IDisposable &amp; Defer</H2>
        <div className="space-y-5">
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">7</span>
              <strong className="text-text-primary text-sm">Dispose() Implementation</strong>
            </div>
            <Prose>
              <InlineCode>Process</InlineCode> implements <InlineCode>IDisposable</InlineCode> via{' '}
              <InlineCode>.Implements(TRAIT_DISPOSABLE)</InlineCode>. The <InlineCode>Dispose</InlineCode>{' '}
              method is registered as <InlineCode>IsImplementationOf(TRAIT_DISPOSABLE_Dispose)</InlineCode>.
              Internally it calls <InlineCode>subprocess_destroy</InlineCode> which terminates the
              process (if running) and closes all pipe handles, then <InlineCode>delete proc</InlineCode>{' '}
              to free the C++ <InlineCode>subprocess_s*</InlineCode>, and resets the{' '}
              <InlineCode>_handle</InlineCode> field to null via <InlineCode>SetProcessHandle(nullptr)</InlineCode>.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">8</span>
              <strong className="text-text-primary text-sm">Recommended Pattern: defer + Process</strong>
            </div>
            <Prose>
              Always use <InlineCode>defer p: Process = Process.Start(...)</InlineCode> instead
              of storing the Process in a plain variable. This ensures <InlineCode>Dispose</InlineCode>{' '}
              is called when the variable goes out of scope — whether by normal return, early
              return, or exception. Without <InlineCode>defer</InlineCode>, a thrown exception
              after <InlineCode>Start</InlineCode> but before <InlineCode>Dispose</InlineCode>{' '}
              would leak the process handle and leave the child process running as an orphan.
            </Prose>
          </div>
        </div>
        <Callout tone="amber">
          Calling <InlineCode>Dispose</InlineCode> multiple times is safe: the second call sees{' '}
          <InlineCode>_handle == nullptr</InlineCode> and returns immediately without error.
          Similarly, <InlineCode>Kill</InlineCode> after the process has already exited is a no-op
          — <InlineCode>subprocess_terminate</InlineCode> returns an error code that is ignored.
        </Callout>
      </ScrollReveal>
    </div>
  )
}

/* ===== STANDARD LIBRARY: SUBPROCESS — USAGE SCENARIOS ===== */

function SubprocessScenariosContent() {
  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          The subprocess library is designed for <strong className="text-text-primary">build
          scripts and tool orchestration</strong>: invoke compilers, linters, formatters, and
          external utilities, then capture and react to their output. Every scenario follows
          the same pattern — configure a <InlineCode>ProcessStartInfo</InlineCode>, call{' '}
          <InlineCode>Process.Start</InlineCode>, read the output, check the exit code, and let{' '}
          <InlineCode>defer</InlineCode> handle cleanup.
        </Prose>
        <CodeBlock code={subprocessScenariosCode} language="csharp" filename="subprocess_scenarios.shard" />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <H2>Common Patterns</H2>
        <div className="space-y-5">
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">1</span>
              <strong className="text-text-primary text-sm">Invoke Compiler / Build Tool</strong>
            </div>
            <Prose>
              Redirect both stdout and stderr. After <InlineCode>Start</InlineCode>, call{' '}
              <InlineCode>ReadToEnd</InlineCode> first (compiler output on success), then{' '}
              <InlineCode>ReadErrorToEnd</InlineCode> (warnings and errors). Check{' '}
              <InlineCode>ExitCode</InlineCode> — 0 means success, non-zero means failure.
              This pattern works for <InlineCode>gcc</InlineCode>, <InlineCode>clang</InlineCode>,{' '}
              <InlineCode>javac</InlineCode>, <InlineCode>dotnet build</InlineCode>, or any
              compiler that communicates via exit codes and stderr.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">2</span>
              <strong className="text-text-primary text-sm">Run Linter / Code Quality Tool</strong>
            </div>
            <Prose>
              Pass the target directory or file as <InlineCode>Arguments</InlineCode>. Use{' '}
              <InlineCode>WaitForExit</InlineCode> to block until the tool finishes, then check
              the exit code. For tools that produce output on stdout (violations, reports), call{' '}
              <InlineCode>ReadToEnd</InlineCode> before <InlineCode>WaitForExit</InlineCode>{' '}
              (or read first, wait second — both work because both block on the same pipe).
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">3</span>
              <strong className="text-text-primary text-sm">Pipe Data Through External Filter</strong>
            </div>
            <Prose>
              Enable both <InlineCode>RedirectStandardInput</InlineCode> and{' '}
              <InlineCode>RedirectStandardOutput</InlineCode>. After <InlineCode>Start</InlineCode>,
              write the input data via <InlineCode>Write</InlineCode> / <InlineCode>WriteLine</InlineCode>,
              then call <InlineCode>ReadToEnd</InlineCode> to capture the filtered output. This
              pattern is useful for <InlineCode>sort</InlineCode>, <InlineCode>grep</InlineCode>,{' '}
              <InlineCode>sed</InlineCode>, <InlineCode>awk</InlineCode>, and other Unix-style
              filter utilities. Remember to <InlineCode>WriteLine("")</InlineCode> or flush after
              the last write to signal EOF.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">4</span>
              <strong className="text-text-primary text-sm">Timeout + Kill for Safety</strong>
            </div>
            <Prose>
              For tools that might hang (stalled compilers, network-dependent utilities), use{' '}
              <InlineCode>WaitForExit(timeoutMs)</InlineCode> with a reasonable timeout. If it
              returns <InlineCode>false</InlineCode>, call <InlineCode>Kill</InlineCode> and log
              a warning. Combined with <InlineCode>defer</InlineCode>, even a killed process
              gets its handles freed when the variable goes out of scope. The timeout loop polls
              at 10ms intervals, so the maximum latency is 10ms + sleep overhead.
            </Prose>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}

function SubprocessContent() {
  const startInfoFields = [
    ['FileName', 'string', 'REQUIRED. Path to the executable. Must be set before calling Process.Start().'],
    ['Arguments', 'string', 'Command-line arguments passed to the process. Optional.'],
    ['WorkingDirectory', 'string', 'Working directory for the process. If empty, inherits from the parent.'],
    ['RedirectStandardOutput', 'bool', 'If true, Process.ReadToEnd() can read stdout. Default: false.'],
    ['RedirectStandardError', 'bool', 'If true, Process.ReadErrorToEnd() can read stderr. Default: false.'],
    ['RedirectStandardInput', 'bool', 'If true, Process.Write()/WriteLine() can send data to stdin. Default: false.'],
    ['UseShellExecute', 'bool', 'NOT SUPPORTED. Setting to true throws an error at start time.'],
    ['CreateNoWindow', 'bool', 'If true, prevents a console window from appearing (Windows only).'],
    ['InheritEnvironment', 'bool', 'If true (default), the child inherits the parent process environment.'],
    ['EnvironmentVariables', 'Dictionary<string,string>', 'Custom environment variables. Merged with inherited env if InheritEnvironment is true.'],
  ]
  const processMethods = [
    ['Start(fileName)', 'Process', 'Starts the executable with no arguments. Returns a Process instance.'],
    ['Start(fileName, arguments)', 'Process', 'Starts the executable with the given argument string.'],
    ['Start(startInfo)', 'Process', 'Starts the process configured by a ProcessStartInfo instance. Throws if FileName is empty.'],
  ]
  const processMembers = [
    ['HasExited', 'bool (property)', 'True if the process has terminated.'],
    ['ExitCode', 'int (property)', 'The exit code of the process. Valid only after HasExited is true.'],
    ['ProcessId', 'int (property)', 'OS-assigned process identifier.'],
    ['WaitForExit()', 'int', 'Blocks until the process exits. Returns the exit code.'],
    ['WaitForExit(ms)', 'bool', 'Waits up to ms milliseconds. Returns true if the process exited within the timeout; false if it timed out.'],
    ['Kill()', 'void', 'Forcefully terminates the process.'],
    ['ReadToEnd()', 'string', 'Reads all of stdout (requires RedirectStandardOutput = true). Blocks until the process exits.'],
    ['ReadErrorToEnd()', 'string', 'Reads all of stderr (requires RedirectStandardError = true). Blocks until the process exits.'],
    ['Write(text)', 'void', 'Writes text to stdin (requires RedirectStandardInput = true).'],
    ['WriteLine(text)', 'void', 'Writes text + newline to stdin (requires RedirectStandardInput = true).'],
    ['Dispose()', 'void', 'Kills the process if still running, closes handles, frees resources. Implements IDisposable.'],
  ]

  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          The <InlineCode>shard.subprocess</InlineCode> library (namespace <InlineCode>process</InlineCode>)
          enables <strong className="text-text-primary">spawning and controlling external processes</strong>{' '}
          from ShardScript. It provides two classes: <InlineCode>ProcessStartInfo</InlineCode> (a
          configuration bag for process launch parameters) and <InlineCode>Process</InlineCode> (the
          running process handle with I/O and lifecycle control). The library is backed by the{' '}
          <InlineCode>subprocess.h</InlineCode> C library for cross-platform process management.
        </Prose>
        <CodeBlock code={subprocessCode} language="csharp" filename="subprocess_basic.shard" />
      </ScrollReveal>

      {/* ProcessStartInfo */}
      <ScrollReveal delay={0.05}>
        <H2>ProcessStartInfo</H2>
        <Prose>
          A plain data class with public fields. Construct with <InlineCode>new ProcessStartInfo()</InlineCode>,
          set fields, then pass to <InlineCode>Process.Start(info)</InlineCode>. The constructor
          initializes <InlineCode>InheritEnvironment = true</InlineCode> and allocates an empty{' '}
          <InlineCode>Dictionary&lt;string,string&gt;</InlineCode> for <InlineCode>EnvironmentVariables</InlineCode>.
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Field</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Type</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              {startInfoFields.map(([name, type, desc], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{type}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Callout tone="amber">
          <InlineCode>UseShellExecute</InlineCode> is <strong className="text-text-primary">not supported</strong>.
          Setting it to <InlineCode>true</InlineCode> causes <InlineCode>Process.Start</InlineCode> to
          throw a <InlineCode>RuntimeException</InlineCode>. All processes are created directly via the
          OS process-creation API, not through a shell.
        </Callout>
      </ScrollReveal>

      {/* Process */}
      <ScrollReveal delay={0.05}>
        <H2>Class Process</H2>
        <Prose>
          Three static <InlineCode>Start</InlineCode> overloads create a new process and return a{' '}
          <InlineCode>Process</InlineCode> instance:
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Overload</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Return</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              {processMethods.map(([name, ret, desc], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{ret}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollReveal>

      {/* Instance Members */}
      <ScrollReveal delay={0.05}>
        <H2>Instance Members</H2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Member</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Return</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              {processMembers.map(([name, ret, desc], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{ret}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Callout tone="blue">
          <InlineCode>Process</InlineCode> implements <InlineCode>IDisposable</InlineCode>. Use{' '}
          <InlineCode>defer p: Process = Process.Start(...)</InlineCode> to ensure the process is
          killed and handles are freed when the variable goes out of scope, even if an exception
          occurs. <InlineCode>Dispose</InlineCode> calls <InlineCode>Kill</InlineCode> if the
          process is still running, then calls <InlineCode>subprocess_destroy</InlineCode>.
        </Callout>
      </ScrollReveal>

      {/* Internal Mechanics */}
      <ScrollReveal delay={0.05}>
        <H2>Internal Mechanics</H2>
        <div className="space-y-5">
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">1</span>
              <strong className="text-text-primary text-sm">subprocess.h Backend</strong>
            </div>
            <Prose>
              The library is built on the <InlineCode>subprocess.h</InlineCode> single-header C
              library. Each <InlineCode>Process</InlineCode> instance stores a{' '}
              <InlineCode>subprocess_s*</InlineCode> pointer in the <InlineCode>_handle</InlineCode>{' '}
              field (a NInt). On Windows, this uses <InlineCode>CreateProcessW</InlineCode> with
              pipes for redirected I/O. On Linux, it uses <InlineCode>fork</InlineCode> +{' '}
              <InlineCode>execvp</InlineCode> with <InlineCode>pipe</InlineCode> /{' '}
              <InlineCode>dup2</InlineCode> for redirection. The handle is opaque to ShardScript.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">2</span>
              <strong className="text-text-primary text-sm">Blocking Read Semantics</strong>
            </div>
            <Prose>
              <InlineCode>ReadToEnd</InlineCode> and <InlineCode>ReadErrorToEnd</InlineCode> are{' '}
              <strong className="text-text-primary">blocking calls</strong>. They read the pipe in
              4096-byte chunks via <InlineCode>subprocess_read_stdout</InlineCode> /{' '}
              <InlineCode>subprocess_read_stderr</InlineCode> until the pipe is closed, then call{' '}
              <InlineCode>subprocess_join</InlineCode> to ensure the process has terminated. This
              means calling <InlineCode>ReadToEnd</InlineCode> on a long-running process will
              block the ShardScript VM thread until the process exits. For non-blocking I/O, use
              the event loop (future API).
            </Prose>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}

function FsScenariosContent() {
  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          The filesystem classes compose naturally: <InlineCode>Directory</InlineCode> for
          existence checks and creation, <InlineCode>DirectoryInfo</InlineCode> for path
          navigation via <InlineCode>/</InlineCode>, <InlineCode>File</InlineCode> for reading
          and writing content. This section demonstrates realistic combinations.
        </Prose>
        <CodeBlock code={fsScenariosCode} language="csharp" filename="filesystem_scenarios.shard" />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <H2>Common Patterns</H2>
        <div className="space-y-5">
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">1</span>
              <strong className="text-text-primary text-sm">Ensure-then-Write</strong>
            </div>
            <Prose>
              Use <InlineCode>Directory.Create</InlineCode> to guarantee a directory exists, then
              use the returned <InlineCode>DirectoryInfo</InlineCode> with <InlineCode>/</InlineCode>{' '}
              to build the target file path. <InlineCode>File.WriteAllText</InlineCode> handles
              creation and overwriting. This pattern is the standard "log to file" or "save output"
              idiom.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">2</span>
              <strong className="text-text-primary text-sm">Directory Enumeration</strong>
            </div>
            <Prose>
              While <InlineCode>DirectoryInfo</InlineCode> does not natively enumerate directory
              contents, you can combine it with <InlineCode>File</InlineCode> operations: collect
              file names externally (e.g. from a known list, a database, or a separate index),
              then join them with <InlineCode>DirectoryInfo / name</InlineCode> to produce full
              <InlineCode>FileInfo</InlineCode> paths. Each resulting file can be read independently
              without loading the entire directory into memory.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">3</span>
              <strong className="text-text-primary text-sm">Cross-Platform Path Construction</strong>
            </div>
            <Prose>
              Use <InlineCode>/</InlineCode> and <InlineCode>Path.Join</InlineCode> instead of
              string concatenation with literal separators. The operator and helper both call the
              same internal <InlineCode>pathJoin</InlineCode> which inserts the platform-appropriate
              directory separator. This makes path-building code portable across Windows and Linux
              without conditional logic.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">4</span>
              <strong className="text-text-primary text-sm">Full Pipeline</strong>
            </div>
            <Prose>
              The complete flow: <InlineCode>Directory.Create</InlineCode> →{' '}
              <InlineCode>DirectoryInfo / name</InlineCode> →{' '}
              <InlineCode>File.WriteAllText</InlineCode> for output, and{' '}
              <InlineCode>DirectoryInfo / name</InlineCode> →{' '}
              <InlineCode>File.ReadAllText</InlineCode> or <InlineCode>FileStream</InlineCode> for
              input. For large files, swap <InlineCode>File.ReadAllText</InlineCode> for a{' '}
              <InlineCode>FileStream</InlineCode> + <InlineCode>StreamReader</InlineCode>{' '}
              combination to process data chunk-by-chunk (see Stream Scenarios in §shard.streams).
            </Prose>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}

function PathConcatContent() {
  const overloads = [
    ['string / string', 'string', 'Joins two path segments with the platform directory separator. Pure string manipulation — no disk I/O.'],
    ['DirectoryInfo / string', 'DirectoryInfo', 'Returns a new DirectoryInfo with the joined path. Does not check disk existence.'],
    ['DirectoryInfo / FileInfo', 'FileInfo', 'Returns a new FileInfo with the joined path. Takes only the file name from FileInfo. Does not check disk existence.'],
  ]

  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          ShardScript overloads the <strong className="text-text-primary">division operator</strong>{' '}
          (<InlineCode>/</InlineCode>) for path concatenation. This is not a dedicated path operator —
          it reuses <InlineCode>TokenType::DivOperator</InlineCode> with the semantics of "append a
          path segment." The result always uses the platform's native directory separator.
        </Prose>
        <Prose>
          Three overloads are registered: <InlineCode>string / string</InlineCode> (pure string join),{' '}
          <InlineCode>DirectoryInfo / string</InlineCode> (returns new DirectoryInfo), and{' '}
          <InlineCode>DirectoryInfo / FileInfo</InlineCode> (returns new FileInfo). All three are{' '}
          <strong className="text-text-primary">pure path manipulations</strong> — they never
          touch the disk, never validate that the path exists, and never normalize separators in the
          already-joined result. Use <InlineCode>Path.Join</InlineCode> if you prefer an explicit
          method call over operator syntax.
        </Prose>
        <CodeBlock code={pathConcatCode} language="csharp" filename="path_concat.shard" />
      </ScrollReveal>

      {/* Operator Overloads */}
      <ScrollReveal delay={0.05}>
        <H2>Operator Overloads</H2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Overload</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Return</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Semantics</th>
              </tr>
            </thead>
            <tbody>
              {overloads.map(([name, ret, sem], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{ret}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{sem}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollReveal>

      {/* Chaining */}
      <ScrollReveal delay={0.05}>
        <H2>Chaining</H2>
        <Prose>
          The operator associates left-to-right, so <InlineCode>a / b / c</InlineCode> is parsed as{' '}
          <InlineCode>(a / b) / c</InlineCode>. For <InlineCode>string / string / string</InlineCode>,
          each step returns a new string, so chaining produces the fully-joined path. For{' '}
          <InlineCode>DirectoryInfo / string / string</InlineCode>, the first step returns a{' '}
          <InlineCode>DirectoryInfo</InlineCode>, and the second step uses the{' '}
          <InlineCode>DirectoryInfo / string</InlineCode> overload. This makes it natural to
          drill down into nested subdirectories or build file paths incrementally.
        </Prose>
      </ScrollReveal>

      {/* vs Path.Join */}
      <ScrollReveal delay={0.05}>
        <H2>Comparison: / Operator vs Path.Join</H2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Aspect</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">/ Operator</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Path.Join</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Syntax', 'a / b / c', 'Path.Join(["a", "b", "c"])'],
                ['Arity', 'Binary (chainable)', 'Variadic (array of segments)'],
                ['Return type', 'Depends on left operand type', 'Always string'],
                ['Type-aware', 'Yes — returns DirectoryInfo', 'No — always string'],
                ['Backing helper', 'pathJoin (internal)', 'pathJoin (same helper)'],
              ].map(([aspect, op, join], i) => (
                <tr key={aspect} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{aspect}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{op}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{join}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Prose>
          Both call the same internal <InlineCode>pathJoin</InlineCode> helper. The operator is
          syntactic sugar for the common case of appending a single segment;{' '}
          <InlineCode>Path.Join</InlineCode> is the explicit bulk API. Use the operator for
          readability in typical navigation code; use <InlineCode>Path.Join</InlineCode> when
          the segments come from a runtime-collected array.
        </Prose>
      </ScrollReveal>
    </div>
  )
}

function FilesystemContent() {
  const fileMethods = [
    ['ReadAllText(fileName)', 'string', 'Reads the entire file as a UTF-8 string. Throws if the file cannot be opened.'],
    ['ReadAllTextAsync(fileName)', 'ValueTask<string>', 'Asynchronously reads the entire file using libuv fs operations. Uses 4 KB chunks internally.'],
    ['WriteAllText(fileName, content)', 'void', 'Creates or overwrites the file with the given string content.'],
    ['WriteAllTextAsync(fileName, content)', 'Task', 'Asynchronously writes content to the file using libuv fs operations.'],
    ['AppendAllText(fileName, content)', 'void', 'Appends content to the end of the file. Creates the file if it does not exist.'],
    ['Exists(fileName)', 'bool', 'Returns true if the file exists on disk.'],
    ['Delete(fileName)', 'void', 'Deletes the file. No error if the file does not exist.'],
    ['Copy(source, dest)', 'void', 'Copies a file from source to dest. Throws if source does not exist.'],
    ['Move(source, dest)', 'void', 'Moves/renames a file from source to dest.'],
  ]
  const pathMethods = [
    ['GetExtension(path)', 'string', 'Returns the file extension including the dot (e.g. ".txt"). Returns empty if none.'],
    ['GetFileName(path)', 'string', 'Returns the file name with extension (e.g. "readme.txt").'],
    ['GetFileNameWithoutExtension(path)', 'string', 'Returns the file name without extension (e.g. "readme").'],
    ['GetDirectoryName(path)', 'string', 'Returns the parent directory path.'],
    ['HasExtension(path)', 'bool', 'Returns true if the path has a file extension.'],
    ['ChangeExtension(path, ext)', 'string', 'Returns a new path with the extension replaced. The "." prefix is added automatically if missing.'],
    ['GetFullPath(path)', 'string', 'Returns the absolute path. Resolves relative paths against the current working directory.'],
    ['Join(paths[])', 'string', 'Joins path segments using the platform directory separator.'],
  ]
  const pathProps = [
    ['DirectorySeparatorChar', 'string', 'Platform directory separator: "\\" on Windows, "/" on Linux.'],
    ['AltDirectorySeparatorChar', 'string', 'Alternate separator: "/" on Windows, "\\" on Linux.'],
    ['PathSeparator', 'string', 'Path list separator: ";" on Windows, ":" on Linux (for PATH-like variables).'],
  ]

  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          The <InlineCode>shard.filesystem</InlineCode> library (namespace <InlineCode>filesystem</InlineCode>)
          provides two <strong className="text-text-primary">static classes</strong>:{' '}
          <InlineCode>File</InlineCode> for file-level operations (read, write, delete, copy, move)
          and <InlineCode>Path</InlineCode> for path manipulation (split, join, extract components).
          Both are backed by C++ filesystem operations — synchronous methods use{' '}
          <InlineCode>std::fstream</InlineCode> / <InlineCode>std::filesystem</InlineCode>, while
          async methods use <InlineCode>libuv</InlineCode> fs operations for non-blocking I/O.
        </Prose>
        <CodeBlock code={filesystemCode} language="csharp" filename="filesystem_basic.shard" />
      </ScrollReveal>

      {/* File */}
      <ScrollReveal delay={0.05}>
        <H2>Class File</H2>
        <Prose>
          All methods are <InlineCode>static</InlineCode>. The <InlineCode>File</InlineCode> class
          is never instantiated — call methods directly as <InlineCode>File.ReadAllText(...)</InlineCode>.
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Method</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Return</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              {fileMethods.map(([name, ret, desc], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{ret}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollReveal>

      {/* Async */}
      <ScrollReveal delay={0.05}>
        <H2>Asynchronous File I/O</H2>
        <Prose>
          <InlineCode>ReadAllTextAsync</InlineCode> and <InlineCode>WriteAllTextAsync</InlineCode>{' '}
          use <strong className="text-text-primary">libuv fs operations</strong> ({' '}
          <InlineCode>uv_fs_open</InlineCode>, <InlineCode>uv_fs_read</InlineCode>,{' '}
          <InlineCode>uv_fs_write</InlineCode>, <InlineCode>uv_fs_close</InlineCode>) to perform
          non-blocking file I/O. ReadAllTextAsync reads in 4 KB chunks, accumulating results.
          Both methods return <InlineCode>Task</InlineCode> / <InlineCode>ValueTask&lt;string&gt;</InlineCode>
          and integrate with the event loop — the calling task suspends at <InlineCode>await</InlineCode>{' '}
          and resumes when the libuv callback fires.
        </Prose>
        <CodeBlock code={filesystemAsyncCode} language="csharp" filename="filesystem_async.shard" />
      </ScrollReveal>

      {/* Path */}
      <ScrollReveal delay={0.05}>
        <H2>Class Path</H2>
        <Prose>
          All methods are <InlineCode>static</InlineCode>. Path operations never touch the disk —
          they are purely string manipulations backed by <InlineCode>std::filesystem::path</InlineCode>.
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Method</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Return</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              {pathMethods.map(([name, ret, desc], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{ret}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollReveal>

      {/* Path Properties */}
      <ScrollReveal delay={0.05}>
        <H2>Path Separator Properties</H2>
        <Prose>
          Platform-specific separator characters are exposed as static read-only properties:
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Property</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Return</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              {pathProps.map(([name, ret, desc], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{ret}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollReveal>

      {/* Internal Mechanics */}
      <ScrollReveal delay={0.05}>
        <H2>Internal Mechanics</H2>
        <div className="space-y-5">
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">1</span>
              <strong className="text-text-primary text-sm">Dual Backend: std::fstream + libuv</strong>
            </div>
            <Prose>
              Synchronous <InlineCode>File</InlineCode> methods use C++ standard I/O:{' '}
              <InlineCode>std::wifstream</InlineCode> / <InlineCode>std::wofstream</InlineCode>{' '}
              for text files, <InlineCode>std::filesystem</InlineCode> for Exists/Delete/Copy/Move.
              Async methods use libuv fs operations (<InlineCode>uv_fs_open</InlineCode> /{' '}
              <InlineCode>uv_fs_read</InlineCode> / <InlineCode>uv_fs_close</InlineCode>) with
              callback-based state machines that allocate a heap-allocated state struct freed
              after the final callback. The sync path blocks the VM thread; the async path
              suspends the task and registers a libuv callback that resumes it.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">2</span>
              <strong className="text-text-primary text-sm">Path via std::filesystem::path</strong>
            </div>
            <Prose>
              All <InlineCode>Path</InlineCode> methods are thin wrappers around{' '}
              <InlineCode>std::filesystem::path</InlineCode> — they construct a path object from
              the input string and call the corresponding C++17 method:{' '}
              <InlineCode>.extension()</InlineCode>, <InlineCode>.filename()</InlineCode>,{' '}
              <InlineCode>.stem()</InlineCode>, <InlineCode>.parent_path()</InlineCode>,{' '}
              <InlineCode>.has_extension()</InlineCode>, <InlineCode>.replace_extension()</InlineCode>,{' '}
              <InlineCode>fs::absolute()</InlineCode>. The result wide string is wrapped in an{' '}
              <InlineCode>ObjectInstance</InlineCode> via <InlineCode>FromValue</InlineCode>.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">3</span>
              <strong className="text-text-primary text-sm">Domain-Relative Paths</strong>
            </div>
            <Prose>
              <InlineCode>GetFullPath</InlineCode> resolves relative paths against the{' '}
              <strong className="text-text-primary">application domain’s working directory</strong>,
              not the ShardScript script’s location. This means paths are relative to the process’s
              CWD at launch time. Use <InlineCode>GetFullPath</InlineCode> to normalize user-supplied
              paths before passing them to other <InlineCode>File</InlineCode> methods.
            </Prose>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}

function MemoryStreamContent() {
  const members = [
    ['init()', 'Creates an empty, writable stream (capacity 0, grows on write).'],
    ['init(buffer: byte[])', 'Creates a read-only stream backed by the given byte array. Position = 0, Length = buffer.Length.'],
    ['init(capacity: int)', 'Creates an empty, writable stream with a pre-allocated buffer of the given capacity.'],
    ['Read(buffer, offset, count)', 'int', 'Reads up to count bytes from the current position. Returns bytes actually read (0 at end).'],
    ['ReadAsync(buffer, offset, count)', 'ValueTask<int>', 'Async read — delegates to synchronous Read under the hood.'],
    ['ReadAsync(buffer, offset, count, token)', 'ValueTask<int>', 'Async read with cancellation support.'],
    ['Write(buffer, offset, count)', 'void', 'Writes count bytes at the current position. Auto-grows capacity; advances Position.'],
    ['WriteAsync(buffer, offset, count)', 'Task', 'Async write — delegates to synchronous Write under the hood.'],
    ['WriteAsync(buffer, offset, count, token)', 'Task', 'Async write with cancellation support.'],
    ['Flush() / FlushAsync()', 'void / Task', 'No-ops — MemoryStream has no underlying device to flush.'],
    ['Seek(offset, origin)', 'int', 'Moves Position. origin: SeekOrigin.Begin (0), .Current (1), .End (2). Returns new position.'],
    ['ToArray()', 'byte[]', 'Returns a new byte[] containing the stream contents from index 0 to Length-1.'],
    ['GetBuffer()', 'byte[]', 'Returns the internal buffer directly (no copy). Use with caution — mutations affect the stream.'],
    ['Close() / Dispose()', 'void', 'Marks the stream as closed. Further reads/writes throw.'],
    ['Position', 'int (property)', 'Current read/write cursor. Get/Set allowed; set validates bounds.'],
    ['Length', 'int (property)', 'Logical length of the stream. Can be set (truncates or zero-extends); get returns current length.'],
    ['Capacity', 'int (property)', 'Allocated buffer size. Grows automatically on writes; can be set to pre-allocate or shrink.'],
    ['CanWrite', 'bool (property)', 'True if created with init() or init(capacity); false if created from an existing buffer.'],
  ]

  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          <InlineCode>MemoryStream</InlineCode> is a <strong className="text-text-primary">byte-array-backed
          in-memory stream</strong> implementing both <InlineCode>IReadableStream</InlineCode> and{' '}
          <InlineCode>IWritableStream</InlineCode>. It is the simplest concrete stream type — no OS handles,
          no I/O threads, no native buffers. All data lives in a ShardScript <InlineCode>byte[]</InlineCode>.
          Capacity grows automatically on writes (doubling strategy: <InlineCode>max(required, capacity * 2)</InlineCode>).
        </Prose>
        <CodeBlock code={memoryStreamCode} language="csharp" filename="memory_stream.shard" />
      </ScrollReveal>

      {/* API Reference */}
      <ScrollReveal delay={0.05}>
        <H2>API Reference</H2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Member</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Return</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              {members.map((row, i) => (
                <tr key={row[0]} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{row[0]}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{row.length > 2 ? row[1] : '\u2014'}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{row.length > 2 ? row[2] : row[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Callout tone="blue">
          <InlineCode>ReadAsync</InlineCode> and <InlineCode>WriteAsync</InlineCode> are{' '}
          <strong className="text-text-primary">not truly asynchronous</strong> for MemoryStream —
          they delegate to the synchronous <InlineCode>Read</InlineCode> / <InlineCode>Write</InlineCode>{' '}
          internally and return a completed task. They exist for interface conformance so MemoryStream
          can be substituted anywhere <InlineCode>IReadableStream</InlineCode> /{' '}
          <InlineCode>IWritableStream</InlineCode> is expected.
        </Callout>
      </ScrollReveal>

      {/* Internal Mechanics */}
      <ScrollReveal delay={0.05}>
        <H2>Internal Mechanics</H2>
        <div className="space-y-5">
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">1</span>
              <strong className="text-text-primary text-sm">Six-Field Internal State</strong>
            </div>
            <Prose>
              The stream stores: <InlineCode>_buffer</InlineCode> (<InlineCode>byte[]</InlineCode>, the raw data),{' '}
              <InlineCode>_position</InlineCode> (<InlineCode>int</InlineCode>, current cursor),{' '}
              <InlineCode>_length</InlineCode> (<InlineCode>int</InlineCode>, logical data length),{' '}
              <InlineCode>_capacity</InlineCode> (<InlineCode>int</InlineCode>, allocated buffer size),{' '}
              <InlineCode>_writable</InlineCode> (<InlineCode>bool</InlineCode>, set false for buffer-backed streams),{' '}
              <InlineCode>_isOpen</InlineCode> (<InlineCode>bool</InlineCode>, set false on Close/Dispose).
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">2</span>
              <strong className="text-text-primary text-sm">Capacity Growth (Doubling)</strong>
            </div>
            <Prose>
              <InlineCode>EnsureCapacity(instance, required)</InlineCode> triggers when a write
              would exceed the current capacity. The new capacity is{' '}
              <InlineCode>max(required, capacity * 2)</InlineCode>. A new <InlineCode>byte[]</InlineCode>{' '}
              is allocated, existing data is copied element-by-element via{' '}
              <InlineCode>GetElement</InlineCode> / <InlineCode>SetElement</InlineCode>, and the
              <InlineCode>_buffer</InlineCode> field is replaced. The old array's reference count
              drops and the GC collects it if no other references exist.
            </Prose>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}

function StreamInterfacesContent() {
  const istream = [
    ['Dispose()', 'void', 'Closes the stream and releases all resources. Inherited from IDisposable.'],
  ]
  const readable = [
    ['Read(buffer, offset, count)', 'int', 'Reads up to count bytes into buffer starting at offset. Returns the number of bytes actually read (0 = end of stream).'],
    ['ReadAsync(buffer, offset, count)', 'ValueTask<int>', 'Asynchronously reads up to count bytes into buffer. Returns a ValueTask<int> with the number of bytes read.'],
    ['ReadAsync(buffer, offset, count, token)', 'ValueTask<int>', 'Same as ReadAsync, with cancellation support via CancellationToken.'],
  ]
  const writable = [
    ['Write(buffer, offset, count)', 'void', 'Writes count bytes from buffer starting at offset to the stream.'],
    ['WriteAsync(buffer, offset, count)', 'Task', 'Asynchronously writes count bytes from buffer to the stream.'],
    ['WriteAsync(buffer, offset, count, token)', 'Task', 'Same as WriteAsync, with cancellation support via CancellationToken.'],
    ['Flush()', 'void', 'Forces any buffered data to be written to the underlying device.'],
    ['FlushAsync()', 'Task', 'Asynchronously flushes buffered data to the underlying device.'],
    ['FlushAsync(token)', 'Task', 'Same as FlushAsync, with cancellation support via CancellationToken.'],
  ]

  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          The <InlineCode>shard.streams</InlineCode> library (namespace <InlineCode>io</InlineCode>)
          defines a <strong className="text-text-primary">three-tier interface hierarchy</strong> for
          byte-oriented streams. All concrete stream types (<InlineCode>MemoryStream</InlineCode>,{' '}
          <InlineCode>FileStream</InlineCode>, <InlineCode>SocketStream</InlineCode>) implement
          these interfaces, enabling polymorphic code that works with any stream regardless of its
          underlying backend.
        </Prose>
        <CodeBlock code={streamInterfacesCode} language="csharp" filename="stream_interfaces.shard" />
      </ScrollReveal>

      {/* Hierarchy */}
      <ScrollReveal delay={0.05}>
        <H2>Interface Hierarchy</H2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Interface</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Extends</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Role</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['IStream', 'IDisposable', 'Base stream interface. Guarantees deterministic cleanup via Dispose().'],
                ['IReadableStream', 'IStream', 'Adds synchronous and asynchronous read methods.'],
                ['IWritableStream', 'IStream', 'Adds synchronous and asynchronous write + flush methods.'],
              ].map(([name, ext, role], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{ext}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Callout tone="blue">
          Both <InlineCode>ReadAsync</InlineCode> and <InlineCode>WriteAsync</InlineCode> have two
          overloads: one without cancellation (3 parameters) and one with a{' '}
          <InlineCode>CancellationToken</InlineCode> (4 parameters). The cancellation-aware overload
          performs a fast-path check before dispatching I/O — if the token is already cancelled,
          the method returns a <InlineCode>FAULTED</InlineCode> task immediately without initiating
          any I/O (see §7.4 for details on the cancellation mechanism).
        </Callout>
      </ScrollReveal>

      {/* IStream */}
      <ScrollReveal delay={0.05}>
        <H2>IStream</H2>
        <Prose>
          The base of the stream hierarchy. It extends <InlineCode>IDisposable</InlineCode>, ensuring
          every stream can be used with <InlineCode>defer disposable := ...</InlineCode> and cleaned
          up deterministically. It carries a single abstract method:
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Member</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Return</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              {istream.map(([name, ret, desc], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{ret}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollReveal>

      {/* IReadableStream */}
      <ScrollReveal delay={0.05}>
        <H2>IReadableStream</H2>
        <Prose>
          Extends <InlineCode>IStream</InlineCode> with read capabilities:
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Member</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Return</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              {readable.map(([name, ret, desc], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{ret}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollReveal>

      {/* IWritableStream */}
      <ScrollReveal delay={0.05}>
        <H2>IWritableStream</H2>
        <Prose>
          Extends <InlineCode>IStream</InlineCode> with write and flush capabilities:
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Member</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Return</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              {writable.map(([name, ret, desc], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{ret}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollReveal>

      {/* Internal Mechanics */}
      <ScrollReveal delay={0.05}>
        <H2>Internal Mechanics</H2>
        <div className="space-y-5">
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">1</span>
              <strong className="text-text-primary text-sm">Abstract Interface Methods</strong>
            </div>
            <Prose>
              All methods on the three interfaces are declared <InlineCode>IsAbstract = true</InlineCode>
              — they have no default implementation. Concrete stream types register their
              conformance via <InlineCode>class.Implements(g_IReadableStream)</InlineCode> and
              provide callbacks for each method. The compiler emits{' '}
              <InlineCode>CALLINTERFACE</InlineCode> for interface-typed calls, which is resolved
              at runtime through the <InlineCode>InterfaceMethodMap</InlineCode>.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">2</span>
              <strong className="text-text-primary text-sm">Namespace: io</strong>
            </div>
            <Prose>
              Unlike most ShardScript standard libraries (namespace matches library name), the stream
              interfaces are in the <InlineCode>io</InlineCode> namespace — a shorthand for
              "input/output". Import with <InlineCode>using io;</InlineCode>. The library file is{' '}
              <InlineCode>streams.shard.cpp</InlineCode> and its metadata name is{' '}
              <InlineCode>shard.streams</InlineCode>.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">3</span>
              <strong className="text-text-primary text-sm">Concrete Implementations</strong>
            </div>
            <Prose>
              Three concrete types implement these interfaces:{' '}
              <InlineCode>MemoryStream</InlineCode> (shard.streams, in-memory byte buffer),{' '}
              <InlineCode>FileStream</InlineCode> (shard.filesystem, disk-backed), and{' '}
              <InlineCode>SocketStream</InlineCode> (shard.socket, network socket). Each implements
              both <InlineCode>IReadableStream</InlineCode> and <InlineCode>IWritableStream</InlineCode>,
              so a single instance can be assigned to either interface type depending on whether the
              caller needs read, write, or both.
            </Prose>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}

function JsonSerializerContent() {
  const methods = [
    ['Serialize<T>(value)', 'string', 'Serializes value into a JSON string. Walks the object graph recursively, encoding fields by name. Depth is capped at 512 to detect cycles.'],
    ['Deserialize<T>(text)', 'T', 'Parses a JSON string and constructs a new instance of T. Fields are matched by name; missing fields keep their default values. Extra JSON keys are ignored.'],
  ]

  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          The <InlineCode>shard.json</InlineCode> library provides a{' '}
          <strong className="text-text-primary">static class</strong>{' '}
          <InlineCode>JsonSerializer</InlineCode> in the <InlineCode>json</InlineCode> namespace
          with two generic methods: <InlineCode>Serialize&lt;T&gt;</InlineCode> (object to string)
          and <InlineCode>Deserialize&lt;T&gt;</InlineCode> (string to object). The serialization
          format is standard JSON — no custom type annotations, no binary encoding.
        </Prose>
        <CodeBlock code={jsonSerializerCode} language="csharp" filename="json_serializer.shard" />
      </ScrollReveal>

      {/* API Reference */}
      <ScrollReveal delay={0.05}>
        <H2>API Reference</H2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Method</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Return</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              {methods.map(([name, ret, desc], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{ret}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollReveal>

      {/* Type Mapping */}
      <ScrollReveal delay={0.05}>
        <H2>Type Mapping</H2>
        <Prose>
          <InlineCode>Serialize</InlineCode> maps ShardScript types to JSON types using a
          straightforward conversion:
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">ShardScript Type</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">JSON Type</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Notes</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['int', 'Number', 'Integer value, no decimal point.'],
                ['double', 'Number', 'Floating-point value.'],
                ['bool', 'Boolean', 'true or false.'],
                ['string', 'String', 'Double-quoted, escape sequences applied.'],
                ['enum', 'Number', 'Serialized as its underlying integer value.'],
                ['T[]', 'Array', 'Elements serialized recursively.'],
                ['class / struct', 'Object', 'Each public field becomes a JSON key-value pair.'],
                ['null', 'null', 'Literal null.'],
              ].map(([shard, json, notes], i) => (
                <tr key={shard} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{shard}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{json}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Callout tone="blue">
          Only <strong className="text-text-primary">public fields</strong> are serialized. Private
          fields (the default access level in ShardScript) are silently skipped. Nested objects and
          arrays are encoded recursively up to a maximum depth of 512 — exceeding this throws a
          <InlineCode>RuntimeException</InlineCode> with message{' '}
          <InlineCode>"JSON: nesting depth exceeded (possible cycle)"</InlineCode>.
        </Callout>
      </ScrollReveal>

      {/* Deserialize Behavior */}
      <ScrollReveal delay={0.05}>
        <H2>Deserialization Semantics</H2>
        <Prose>
          <InlineCode>Deserialize&lt;T&gt;</InlineCode> creates a new instance of <InlineCode>T</InlineCode>{' '}
          via <InlineCode>AllocateInstance</InlineCode> or <InlineCode>AllocateGeneric</InlineCode>,
          then populates its fields by matching JSON keys to field names. The matching is{' '}
          <strong className="text-text-primary">case-sensitive</strong> and{' '}
          <strong className="text-text-primary">exact</strong> — JSON key <InlineCode>"name"</InlineCode>{' '}
          maps to field <InlineCode>name</InlineCode>.
        </Prose>
        <Bullet>
          <strong className="text-text-primary">Missing keys.</strong> Fields without a corresponding
          JSON key retain their default values (zero for numbers, empty string, false, null).
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">Extra keys.</strong> JSON keys that do not match any
          field on the target type are silently ignored.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">Type mismatches.</strong> If a JSON value cannot be
          converted to the target field type (e.g. a string where an int is expected), a{' '}
          <InlineCode>RuntimeException</InlineCode> is thrown.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">Nested objects.</strong> Fields of class/struct type
          are deserialized recursively — a new instance of the field's type is allocated and
          populated from the nested JSON object.
        </Bullet>
      </ScrollReveal>

      {/* Internal Mechanics */}
      <ScrollReveal delay={0.05}>
        <H2>Internal Mechanics</H2>
        <div className="space-y-5">
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">1</span>
              <strong className="text-text-primary text-sm">Two-Pass Architecture</strong>
            </div>
            <Prose>
              <strong className="text-text-primary">Serialize:</strong>{' '}
              <InlineCode>EncodeValue</InlineCode> recursively walks the ShardScript object graph
              and builds a C++ <InlineCode>JsonDom</InlineCode> tree (a union of Null, Boolean,
              Number, String, Array, and Object nodes). Then <InlineCode>WriteDom</InlineCode>
              performs a recursive traversal of the Dom tree to emit the JSON string. This
              separation means the encoding logic is independent of the output formatting.
            </Prose>
            <p className="mt-3 text-text-secondary leading-relaxed">
              <strong className="text-text-primary">Deserialize:</strong> A hand-written
              recursive-descent <InlineCode>JsonParser</InlineCode> tokenizes the input string
              character-by-character and builds a <InlineCode>JsonDom</InlineCode> tree. Then{' '}
              <InlineCode>DecodeValue</InlineCode> walks the Dom tree and allocates ShardScript
              objects, matching JSON keys to <InlineCode>FieldSymbol</InlineCode> names on the
              target type.
            </p>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">2</span>
              <strong className="text-text-primary text-sm">Cycle Protection</strong>
            </div>
            <Prose>
              <InlineCode>EncodeValue</InlineCode> carries a <InlineCode>depth</InlineCode> counter
              incremented on each recursive call. At <InlineCode>depth &gt; 512</InlineCode>, it
              throws <InlineCode>"JSON: nesting depth exceeded (possible cycle)"</InlineCode>.
              This is a depth guard, not a true cycle detector — it catches runaway recursion
              from deeply nested or accidentally cyclic structures but does not detect a cycle at
              depth 3 before reaching the limit.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">3</span>
              <strong className="text-text-primary text-sm">No External Dependencies</strong>
            </div>
            <Prose>
              The JSON library is self-contained — it does not link against any third-party
              JSON parser. The recursive-descent parser, Dom tree, and serialization logic are
              all implemented in the single <InlineCode>json.shard.cpp</InlineCode> file
              (~1800 lines). There is no dependency on nlohmann/json, RapidJSON, or any other
              C++ JSON library.
            </Prose>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}

function CollectionsContractsContent() {
  const enumerableMembers = [
    ['GetEnumerator()', 'IEnumerator<T>', 'Returns an enumerator positioned before the first element. Called implicitly by foreach.'],
  ]
  const enumeratorMembers = [
    ['MoveNext()', 'bool', 'Advances the enumerator to the next element. Returns false when the sequence is exhausted.'],
    ['Current', 'T', 'Gets the element at the current position. Valid only after a successful MoveNext() call.'],
  ]

  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          The <InlineCode>shard.collections</InlineCode> library provides two generic interfaces
          that form the <strong className="text-text-primary">iteration contract</strong> for all
          collection types: <InlineCode>IEnumerable&lt;T&gt;</InlineCode> (the source) and{' '}
          <InlineCode>IEnumerator&lt;T&gt;</InlineCode> (the cursor). These interfaces power the{' '}
          <InlineCode>foreach</InlineCode> statement, extension methods like{' '}
          <InlineCode>Select</InlineCode> / <InlineCode>Where</InlineCode> / <InlineCode>First</InlineCode>,
          and enable writing generic algorithms that work with any collection type.
        </Prose>
        <CodeBlock code={collectionsContractsCode} language="csharp" filename="collections_contracts.shard" />
      </ScrollReveal>

      {/* IEnumerable<T> */}
      <ScrollReveal delay={0.05}>
        <H2>IEnumerable&lt;T&gt;</H2>
        <Prose>
          <InlineCode>IEnumerable&lt;T&gt;</InlineCode> is a generic interface with a single method.
          It represents a <strong className="text-text-primary">readable sequence</strong> of elements
          of type <InlineCode>T</InlineCode>. All standard collections implement it, and arrays are
          implicitly assignable to it.
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Member</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Return</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              {enumerableMembers.map(([name, ret, desc], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{ret}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Callout tone="blue">
          Arrays are <strong className="text-text-primary">implicitly assignable</strong> to{' '}
          <InlineCode>IEnumerable&lt;T&gt;</InlineCode>. The compiler recognizes the{' '}
          <InlineCode>ArrayTypeSymbol</InlineCode> and resolves it as compatible during interface
          assignment checking in <InlineCode>IsAssignableTo</InlineCode>. No boxing or wrapping occurs.
        </Callout>
        <CodeBlock code={collectionsArrayEnumCode} language="csharp" filename="collections_array_ienum.shard" />
      </ScrollReveal>

      {/* IEnumerator<T> */}
      <ScrollReveal delay={0.05}>
        <H2>IEnumerator&lt;T&gt;</H2>
        <Prose>
          <InlineCode>IEnumerator&lt;T&gt;</InlineCode> is the <strong className="text-text-primary">cursor</strong>{' '}
          that walks through a sequence. It is obtained by calling <InlineCode>GetEnumerator()</InlineCode>{' '}
          on an <InlineCode>IEnumerable&lt;T&gt;</InlineCode> and provides two members:
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Member</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Return</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              {enumeratorMembers.map(([name, ret, desc], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{ret}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Prose>
          The typical usage pattern is a <InlineCode>while</InlineCode> loop. The{' '}
          <InlineCode>foreach</InlineCode> statement compiles to exactly this pattern, plus
          automatic disposal of the enumerator when the loop exits.
        </Prose>
        <CodeBlock code={collectionsManualEnumCode} language="csharp" filename="collections_manual_enum.shard" />
      </ScrollReveal>

      {/* foreach lowering */}
      <ScrollReveal delay={0.05}>
        <H2>foreach Lowering</H2>
        <Prose>
          The ShardScript compiler lowers a <InlineCode>foreach</InlineCode> loop into the
          equivalent manual iteration pattern at the syntax-tree level:
        </Prose>
        <Bullet>
          <strong className="text-text-primary">1. GetEnumerator.</strong> The source expression's{' '}
          <InlineCode>GetEnumerator()</InlineCode> is called, producing an{' '}
          <InlineCode>IEnumerator&lt;T&gt;</InlineCode>.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">2. Loop condition.</strong>{' '}
          <InlineCode>while (enumerator.MoveNext())</InlineCode> — each iteration advances the cursor.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">3. Access current.</strong> The loop variable is assigned
          the value of <InlineCode>enumerator.Current</InlineCode> at the top of each iteration body.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">4. Dispose.</strong> When the loop exits (normally, via{' '}
          <InlineCode>break</InlineCode>, or via exception), the enumerator is disposed. If the enumerator
          implements <InlineCode>IDisposable</InlineCode>, the compiler emits a{' '}
          <InlineCode>defer enumerator.Dispose()</InlineCode>.
        </Bullet>
        <Prose>
          This lowering means you can replace any <InlineCode>foreach</InlineCode> with the equivalent{' '}
          <InlineCode>while</InlineCode> loop and get identical behavior. The only difference is that{' '}
          <InlineCode>foreach</InlineCode> handles disposal automatically.
        </Prose>
      </ScrollReveal>

      {/* Internal Mechanics */}
      <ScrollReveal delay={0.05}>
        <H2>Internal Mechanics</H2>
        <div className="space-y-5">
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">1</span>
              <strong className="text-text-primary text-sm">Standard Type System Interfaces</strong>
            </div>
            <Prose>
              <InlineCode>IEnumerable&lt;T&gt;</InlineCode> and <InlineCode>IEnumerator&lt;T&gt;</InlineCode>{' '}
              are defined as <InlineCode>InterfaceSymbol</InlineCode> instances in{' '}
              <InlineCode>SymbolTable::StandardTypes</InlineCode> — they are part of the compiler's
              built-in type system, not user-defined interfaces. This allows the compiler to recognize
              them during semantic analysis without loading any library. Collection types register their
              conformance via <InlineCode>class.Implements(factory.GenericType(TRAIT_ENUMERABLE, ...))</InlineCode>.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">2</span>
              <strong className="text-text-primary text-sm">Interface Method Dispatch</strong>
            </div>
            <Prose>
              When calling <InlineCode>GetEnumerator()</InlineCode> through an{' '}
              <InlineCode>IEnumerable&lt;T&gt;</InlineCode>-typed variable, the compiler emits{' '}
              <InlineCode>CALLINTERFACE</InlineCode> which resolves the concrete implementation at
              runtime via the <InlineCode>InterfaceMethodMap</InlineCode>. Each concrete collection
              type registers its enumerator type in the map during declaration. The standard type
              system constructs type-parameter mappings that link{' '}
              <InlineCode>IEnumerable&lt;T&gt;::T</InlineCode> to the concrete collection's{' '}
              <InlineCode>T</InlineCode>.
            </Prose>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}

function DebugDevToolsContent() {
  const funcs = [
    ['typeof(instance)', 'string', 'Returns the runtime type name of the instance. Throws if instance is null.', 'instance->getInfo()->Name'],
    ['sizeof(instance)', 'int', 'Returns the memory size in bytes of the instance, including header + field slots.', 'instance->getInfo()->MemoryBytesSize'],
  ]

  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          The <InlineCode>shard.debug</InlineCode> library provides free-standing static functions
          in the <InlineCode>debug</InlineCode> namespace for runtime introspection. These are{' '}
          <strong className="text-text-primary">not methods on a class</strong> — they are
          top-level <InlineCode>static</InlineCode> functions callable directly as{' '}
          <InlineCode>typeof(x)</InlineCode>, <InlineCode>sizeof(x)</InlineCode>, etc.
        </Prose>
        <CodeBlock code={debugDevToolsCode} language="csharp" filename="debug_devtools.shard" />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <H2>API Reference</H2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Function</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Return</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Implementation</th>
              </tr>
            </thead>
            <tbody>
              {funcs.map(([name, ret, desc, impl], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{ret}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#5A6A8A]">{impl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Callout tone="amber">
          Both functions require a <strong className="text-text-primary">non-null</strong> argument.
          Passing <InlineCode>null</InlineCode> throws a <InlineCode>RuntimeException</InlineCode>{' '}
          with message <InlineCode>"cannot get type of null instance"</InlineCode> or{' '}
          <InlineCode>"cannot get size of null instance"</InlineCode>.
        </Callout>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <H2>typeof: Runtime Type Identification</H2>
        <Prose>
          <InlineCode>typeof</InlineCode> returns the <strong className="text-text-primary">ShardScript-level
          type name</strong> as a string — the same name used in <InlineCode>class</InlineCode>{' '}
          declarations. For generic instances, it returns the generic type name without type parameters.
          The value comes from <InlineCode>instance-&gt;getInfo()-&gt;Name</InlineCode>, which is the{' '}
          <InlineCode>ClassSymbol</InlineCode> or <InlineCode>GenericTypeSymbol</InlineCode> name
          stored in the instance's type-info pointer.
        </Prose>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <H2>sizeof: Memory Footprint</H2>
        <Prose>
          <InlineCode>sizeof</InlineCode> returns the <strong className="text-text-primary">total memory
          size</strong> of the instance in bytes, as defined by the <InlineCode>TypeShape</InlineCode>{' '}
          computed during layout generation. This includes:
        </Prose>
        <Bullet>
          The object header (<InlineCode>ObjectInstance</InlineCode> base, reference counter, type-info pointer).
        </Bullet>
        <Bullet>
          All field slots — both value-type fields (inlined) and reference-type fields (pointer slots).
        </Bullet>
        <Bullet>
          Array element storage for array instances.
        </Bullet>
        <Prose>
          The underlying call is <InlineCode>instance-&gt;getInfo()-&gt;MemoryBytesSize</InlineCode>, which
          returns the <InlineCode>MemoryBytesSize</InlineCode> field of the{' '}
          <InlineCode>TypeShape</InlineCode> — a compile-time constant for each type.
        </Prose>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <H2>Internal Mechanics</H2>
        <div className="space-y-5">
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">1</span>
              <strong className="text-text-primary text-sm">Top-Level Static Functions</strong>
            </div>
            <Prose>
              <InlineCode>typeof</InlineCode> and <InlineCode>sizeof</InlineCode> are registered
              directly on the <InlineCode>debug</InlineCode> namespace — not on a class. The
              registration uses <InlineCode>debug.AddMethod(L"typeof", ...)</InlineCode> without a
              parent class. They accept <InlineCode>TYPE_ANY</InlineCode>, meaning any ShardScript
              value can be passed. The null check happens at the C++ level before accessing the
              instance's type info.
            </Prose>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}

/* ===== STANDARD LIBRARY: DEBUG — VM INSPECTION ===== */

function DebugVMInspectionContent() {
  const funcs = [
    ['PrintStackFrameInfo()', 'void', 'Dumps all local variables in the calling frame to stdout. Shows PTR, TYPE, and REFS for each local.', 'Iterates frame->EvalStack[0..localsCount].'],
    ['PrintGcInfo()', 'void', 'Dumps every live ObjectInstance on the GC heap to stdout. Shows PTR, TYPE, REFS, and total count.', 'Iterates Collector.Heap vector.'],
  ]

  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          The <InlineCode>shard.debug</InlineCode> library provides two functions for{' '}
          <strong className="text-text-primary">manual VM inspection</strong> at runtime. Both
          write directly to <InlineCode>stdout</InlineCode> via C++ <InlineCode>std::wcout</InlineCode>{' '}
          — they do not return strings or integrate with ShardScript's I/O layer.
        </Prose>
        <CodeBlock code={debugVMInspectionCode} language="csharp" filename="debug_vm_inspection.shard" />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <H2>API Reference</H2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Function</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Return</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Implementation</th>
              </tr>
            </thead>
            <tbody>
              {funcs.map(([name, ret, desc, impl], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{ret}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#5A6A8A]">{impl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Callout tone="blue">
          Both functions output to <InlineCode>stdout</InlineCode>, not <InlineCode>stderr</InlineCode>.
          Their output is <strong className="text-text-primary">not captured</strong> by the
          ShardScript I/O subsystem — it bypasses <InlineCode>println</InlineCode> and appears
          directly in the process's standard output stream. This means it survives even if the
          ShardScript runtime is in a broken state.
        </Callout>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <H2>PrintStackFrameInfo: Local Variable Dump</H2>
        <Prose>
          <InlineCode>PrintStackFrameInfo</InlineCode> walks the{' '}
          <strong className="text-text-primary">caller's evaluation stack</strong>{' '}
          (<InlineCode>context.Runtimer.CurrentFrame()-&gt;PreviousFrame</InlineCode>) and prints every
          local variable slot. For each local it outputs:
        </Prose>
        <Bullet>
          <strong className="text-text-primary">PTR</strong> — the raw memory address of the{' '}
          <InlineCode>ObjectInstance</InlineCode>.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">TYPE</strong> — the runtime type name via{' '}
          <InlineCode>getInfo()-&gt;Name</InlineCode>.
        </Bullet>
        <Bullet>
          <strong className="text-text-primary">REFS</strong> — the current reference count via{' '}
          <InlineCode>getReferencesCounter()</InlineCode>.
        </Bullet>
        <Prose>
          The iteration count is capped by <InlineCode>context.Method-&gt;GetEvalStackLocalsCount()</InlineCode>,
          which returns the number of fixed local-variable slots in the frame. Temporary values
          above this boundary are not printed.
        </Prose>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <H2>PrintGcInfo: Full Heap Dump</H2>
        <Prose>
          <InlineCode>PrintGcInfo</InlineCode> iterates the entire{' '}
          <strong className="text-text-primary">GC heap</strong> — the{' '}
          <InlineCode>Collector.Heap</InlineCode> vector which holds every live{' '}
          <InlineCode>ObjectInstance</InlineCode>. For each entry it prints the same triplet
          (PTR, TYPE, REFS) plus a total instance count at the end.
        </Prose>
        <Prose>
          This is the programmatic equivalent of a GC snapshot. Use it to detect memory leaks
          (unexpectedly high instance counts for a given type), dangling references (objects
          that should have been collected but still have non-zero ref counts), and type
          distribution in long-running processes.
        </Prose>
        <Callout tone="amber">
          <InlineCode>PrintGcInfo</InlineCode> reads the heap vector without synchronization.
          Calling it while the GC is actively collecting (e.g. inside a <InlineCode>defer</InlineCode>{' '}
          during unwinding) may produce inconsistent output. Use it at well-defined checkpoints,
          not in hot paths.
        </Callout>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <H2>Internal Mechanics</H2>
        <div className="space-y-5">
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">1</span>
              <strong className="text-text-primary text-sm">Direct C++ stdout Bypass</strong>
            </div>
            <Prose>
              Both functions use C++ <InlineCode>std::wcout</InlineCode> directly — they do not
              allocate ShardScript strings, do not call <InlineCode>println</InlineCode>, and do not
              interact with the VM's I/O opcodes. This is intentional: if the VM is in a corrupted
              or suspended state, these functions still produce output as long as the C++ runtime
              and standard library are intact.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">2</span>
              <strong className="text-text-primary text-sm">No Manual GC Trigger</strong>
            </div>
            <Prose>
              <InlineCode>PrintGcInfo</InlineCode> inspects the heap but does <strong className="text-text-primary">not</strong>{' '}
              trigger garbage collection. The reference-counting GC runs automatically when a counter
              reaches zero; there is currently no exposed API to force a collection cycle. To
              observe a cleaned heap, ensure all references to the objects of interest have gone
              out of scope before calling <InlineCode>PrintGcInfo</InlineCode>.
            </Prose>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}

function EnvironmentContent() {
  const members = [
    ['[name]', 'string', 'Returns the value of the environment variable name, or empty string if not found.', 'Delimiter operator overload — Environment["VAR"].'],
    ['GetVariable(name)', 'string', 'Returns the value of the environment variable name, or empty string if not found.', 'Explicit getter — semantically identical to the [] operator.'],
    ['SetVariable(name, value)', 'void', 'Sets the environment variable name to value for the current process. Does not persist globally.', 'Calls _wputenv_s (Windows) or setenv (Linux).'],
  ]

  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          The <InlineCode>shard.environment</InlineCode> library provides a{' '}
          <strong className="text-text-primary">static class</strong>{' '}
          <InlineCode>Environment</InlineCode> in the <InlineCode>environment</InlineCode> namespace
          for reading and writing operating-system environment variables. The primary access pattern
          is the <strong className="text-text-primary">delimiter operator</strong>{' '}
          <InlineCode>["VAR_NAME"]</InlineCode> — an operator overload on the static class, not a
          collection indexer.
        </Prose>
        <CodeBlock code={environmentCode} language="csharp" filename="environment.shard" />
      </ScrollReveal>

      {/* API Reference */}
      <ScrollReveal delay={0.05}>
        <H2>API Reference</H2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Member</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Return</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Implementation</th>
              </tr>
            </thead>
            <tbody>
              {members.map(([name, ret, desc, impl], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{ret}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#5A6A8A]">{impl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Callout tone="blue">
          Missing variables return an empty string — not <InlineCode>null</InlineCode> and not an
          error. Check <InlineCode>result == ""</InlineCode> to detect absence. This matches the
          C++ <InlineCode>std::getenv</InlineCode> / <InlineCode>_wgetenv</InlineCode> convention
          where a null pointer is converted to an empty string.
        </Callout>
      </ScrollReveal>

      {/* Platform Differences and Limitations */}
      <ScrollReveal delay={0.05}>
        <H2>Platform Differences &amp; Limitations</H2>
        <Prose>
          Environment variable behavior is <strong className="text-text-primary">inherently OS-dependent</strong>.
          The <InlineCode>shard.environment</InlineCode> library provides a uniform API, but the
          underlying mechanisms differ significantly:
        </Prose>
        <div className="space-y-5 mt-5">
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">1</span>
              <strong className="text-text-primary text-sm">Windows — Registry vs. Process Block</strong>
            </div>
            <Prose>
              On Windows, each process receives a <strong className="text-text-primary">copy</strong> of
              the environment block at launch time — inherited from the parent process, which in turn
              merges system-wide and user-specific registry keys (<InlineCode>HKLM\System\...\Environment</InlineCode>{' '}
              and <InlineCode>HKCU\Environment</InlineCode>). Reading via{' '}
              <InlineCode>_wgetenv</InlineCode> queries only the process block. Writing via{' '}
              <InlineCode>_wputenv_s</InlineCode> modifies the process block only —{' '}
              <strong className="text-text-primary">it does not touch the registry</strong>. To
              persist changes globally, the library contains an internal{' '}
              <InlineCode>SetGlobalEnv_Windows</InlineCode> helper that writes directly to{' '}
              <InlineCode>HKCU\Environment</InlineCode> and broadcasts{' '}
              <InlineCode>WM_SETTINGCHANGE</InlineCode>, but this function is{' '}
              <strong className="text-text-primary">not exposed</strong> to ShardScript.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">2</span>
              <strong className="text-text-primary text-sm">Linux — Per-Process, No Global Persistence</strong>
            </div>
            <Prose>
              On Linux, environment variables exist only in the process’s memory space. Reading
              uses <InlineCode>std::getenv</InlineCode>, writing uses{' '}
              <InlineCode>setenv</InlineCode>. There is <strong className="text-text-primary">no
              system-wide registry</strong> — persistence across sessions requires writing to shell
              configuration files (<InlineCode>~/.profile</InlineCode>,{' '}
              <InlineCode>~/.bashrc</InlineCode>), which is{' '}
              <strong className="text-text-primary">not automated</strong> by the library. The
              internal <InlineCode>SetGlobalEnv_Linux</InlineCode> stub exists but its
              implementation is commented out.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">3</span>
              <strong className="text-text-primary text-sm">Cross-Platform Portability Constraints</strong>
            </div>
            <Prose>
              <strong className="text-text-primary">Variable naming.</strong> Windows environment
              variables are case-insensitive (<InlineCode>path</InlineCode> = <InlineCode>PATH</InlineCode>);
              Linux variables are case-sensitive. To write portable ShardScript code, always use
              the canonical casing for cross-platform variables (<InlineCode>PATH</InlineCode>,{' '}
              <InlineCode>HOME</InlineCode>, <InlineCode>TEMP</InlineCode>).
            </Prose>
            <p className="mt-3 text-text-secondary leading-relaxed">
              <strong className="text-text-primary">Path separator.</strong> Windows uses{' '}
              <InlineCode>;</InlineCode> to separate entries in <InlineCode>PATH</InlineCode>;
              Linux uses <InlineCode>:</InlineCode>. When parsing <InlineCode>PATH</InlineCode>,
              check the platform or split on both delimiters.
            </p>
            <p className="mt-3 text-text-secondary leading-relaxed">
              <strong className="text-text-primary">Variable scope.</strong> On both platforms,{' '}
              <InlineCode>SetVariable</InlineCode> affects only the calling process and its future
              children. It does not modify the parent shell or other running processes. There is
              no mechanism to broadcast environment changes to other processes.
            </p>
            <p className="mt-3 text-text-secondary leading-relaxed">
              <strong className="text-text-primary">System directories.</strong> The library does
              not expose OS version detection, special-folder resolution (<InlineCode>Program Files</InlineCode>,{' '}
              <InlineCode>/usr/local</InlineCode>), or system-path enumeration. These are outside the
              scope of <InlineCode>shard.environment</InlineCode> and would require separate
              platform-specific libraries.
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* Internal Mechanics */}
      <ScrollReveal delay={0.05}>
        <H2>Internal Mechanics</H2>
        <div className="space-y-5">
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">1</span>
              <strong className="text-text-primary text-sm">Operator Overload on a Static Class</strong>
            </div>
            <Prose>
              <InlineCode>Environment["KEY"]</InlineCode> is not a collection indexer — it is a{' '}
              <strong className="text-text-primary">delimiter operator overload</strong>{' '}
              (<InlineCode>TokenType::Delimeter</InlineCode>) registered on the static class.
              The compiler emits <InlineCode>CALLLSTATICOPERATOR</InlineCode> with the string
              literal as the argument. At runtime, the callback receives the key via{' '}
              <InlineCode>context.Args[0]-&gt;AsString()</InlineCode> and passes it to{' '}
              <InlineCode>_wgetenv</InlineCode> (Windows) or <InlineCode>std::getenv</InlineCode>{' '}
              (Linux).
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">2</span>
              <strong className="text-text-primary text-sm">Platform-Agnostic Wrappers</strong>
            </div>
            <Prose>
              The internal helpers <InlineCode>getEnvVar</InlineCode> and{' '}
              <InlineCode>setEnvVar</InlineCode> abstract the platform difference:{' '}
              <InlineCode>_wgetenv</InlineCode> / <InlineCode>_wputenv_s</InlineCode> on Windows,
              <InlineCode>std::getenv</InlineCode> / <InlineCode>setenv</InlineCode> on Linux.
              Wide-character strings (<InlineCode>wchar_t*</InlineCode>) are used throughout,
              with ShardScript strings converted via <InlineCode>AsString()</InlineCode>.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">3</span>
              <strong className="text-text-primary text-sm">Process-Local by Default</strong>
            </div>
            <Prose>
              <InlineCode>SetVariable</InlineCode> modifies the environment for the{' '}
              <strong className="text-text-primary">current process only</strong>. Changes are
              visible to child processes spawned after the call but do not persist in the system
              registry or shell profile. The internal <InlineCode>setGlobalEnvVar</InlineCode>{' '}
              function (which writes to the Windows registry or <InlineCode>~/.profile</InlineCode>){' '}
              is compiled into the library but <strong className="text-text-primary">not exposed</strong>{' '}
              to ShardScript — it exists as a C++-only utility for potential future API surface.
            </Prose>
          </div>
        </div>
      </ScrollReveal>

      {/* Usage Scenarios */}
      <ScrollReveal delay={0.05}>
        <H2>Usage Scenarios: Secrets &amp; Configuration</H2>
        <Prose>
          Environment variables are the standard mechanism for injecting runtime configuration
          without touching source code. This is especially important for{' '}
          <strong className="text-text-primary">secrets</strong> (API keys, database passwords,
          tokens) that must never appear in version control.
        </Prose>
        <CodeBlock code={environmentScenariosCode} language="csharp" filename="environment_scenarios.shard" />
        <div className="space-y-5 mt-5">
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">1</span>
              <strong className="text-text-primary text-sm">Secrets — Never in Source Code</strong>
            </div>
            <Prose>
              Hard-coding credentials in source files leaks them into version control history
              and makes rotation difficult. Instead, read secrets from environment variables
              at startup. The deployment pipeline (Docker, CI/CD, systemd) injects them into
              the process environment before launch. If a required secret is missing, fail
              fast with a clear diagnostic message — do not silently use an empty string.
            </Prose>
            <p className="mt-3 text-text-secondary leading-relaxed">
              <strong className="text-text-primary">Sanitize logs.</strong> Never print raw
              environment values that may contain credentials. Use the variable’s presence
              as a boolean check but log only redacted placeholders in production.
            </p>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">2</span>
              <strong className="text-text-primary text-sm">Configuration with Sensible Defaults</strong>
            </div>
            <Prose>
              For non-secret configuration (hosts, ports, feature flags), use the pattern{' '}
              <InlineCode>val := Environment["KEY"]; if val == "" then val = "default"</InlineCode>.
              This lets operators override values in production while developers get working
              defaults with zero setup. The empty-string return from missing variables makes
              this pattern natural in ShardScript.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">3</span>
              <strong className="text-text-primary text-sm">Feature Flags</strong>
            </div>
            <Prose>
              Use environment variables as runtime feature toggles:{' '}
              <InlineCode>Environment["FEATURE_NAME"] == "1"</InlineCode>. This enables
              dark launches, A/B testing, and emergency kill switches without redeploying
              code. The <InlineCode>SetVariable</InlineCode> method lets test code enable
              flags programmatically before exercising the feature path.
            </Prose>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}

function MathContent() {
  const constants = [
    ['PI', 'double', '3.141592653589793...', 'Ratio of a circle\'s circumference to its diameter.'],
    ['E', 'double', '2.718281828459045...', 'Euler\'s number — base of the natural logarithm.'],
  ]
  const roundingFuncs = [
    ['Ceil(value)', 'double', 'Rounds up to the nearest integer.', 'std::ceil'],
    ['Floor(value)', 'double', 'Rounds down to the nearest integer.', 'std::floor'],
    ['Round(value)', 'double', 'Rounds to the nearest integer (halfway cases away from zero).', 'std::round'],
  ]
  const basicFuncs = [
    ['Abs(value)', 'double', 'Absolute value — makes negative numbers positive.', 'std::abs'],
    ['Min(a, b)', 'double', 'Returns the smaller of two numbers.', 'std::fmin'],
    ['Max(a, b)', 'double', 'Returns the larger of two numbers.', 'std::fmax'],
  ]

  return (
    <div className="space-y-10">
      {/* Overview */}
      <ScrollReveal>
        <Prose>
          The <InlineCode>shard.math</InlineCode> library provides a <strong className="text-text-primary">static class</strong>{' '}
          <InlineCode>Math</InlineCode> in the <InlineCode>math</InlineCode> namespace. All members are{' '}
          <InlineCode>static</InlineCode> — no instance of <InlineCode>Math</InlineCode> is ever created.
          Every function is a thin native wrapper over the C++ standard library (<InlineCode>&lt;cmath&gt;</InlineCode>),
          operating on <InlineCode>double</InlineCode> values throughout.
        </Prose>
        <CodeBlock code={mathBasicCode} language="csharp" filename="math_basic.shard" />
      </ScrollReveal>

      {/* Constants */}
      <ScrollReveal delay={0.05}>
        <H2>Constants</H2>
        <Prose>
          Two mathematical constants are available as <strong className="text-text-primary">static read-only properties</strong>:
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Property</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Type</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Approximate Value</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              {constants.map(([name, type, val, desc], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{type}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{val}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Prose>
          Both constants are implemented as native getter callbacks that return pre-computed C++{' '}
          <InlineCode>double</InlineCode> literals. There is no allocation, no lookup — each access
          is equivalent to a single native function call that pushes a 64-bit float onto the
          evaluation stack.
        </Prose>
      </ScrollReveal>

      {/* Rounding Functions */}
      <ScrollReveal delay={0.05}>
        <H2>Rounding Functions</H2>
        <Prose>
          Three rounding modes cover all common use cases:
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Method</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Return</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">C++ Backing</th>
              </tr>
            </thead>
            <tbody>
              {roundingFuncs.map(([name, ret, desc, cpp], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{ret}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#5A6A8A]">{cpp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CodeBlock code={mathRoundingCode} language="csharp" filename="math_rounding.shard" />
        <Callout tone="blue">
          <InlineCode>Ceil</InlineCode> always rounds toward positive infinity.{' '}
          <InlineCode>Floor</InlineCode> always rounds toward negative infinity.{' '}
          <InlineCode>Round</InlineCode> follows IEEE 754 round-half-away-from-zero semantics.
        </Callout>
      </ScrollReveal>

      {/* Absolute Value, Min, Max */}
      <ScrollReveal delay={0.05}>
        <H2>Absolute Value, Min & Max</H2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Method</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Return</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">C++ Backing</th>
              </tr>
            </thead>
            <tbody>
              {basicFuncs.map(([name, ret, desc, cpp], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{ret}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#5A6A8A]">{cpp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CodeBlock code={mathAbsMinMaxCode} language="csharp" filename="math_abs_minmax.shard" />
      </ScrollReveal>

      {/* Operator-Based Arithmetic */}
      <ScrollReveal delay={0.05}>
        <H2>Operator-Based Arithmetic</H2>
        <Prose>
          Basic arithmetic uses ShardScript's built-in operators rather than static methods.
          These are not part of the <InlineCode>shard.math</InlineCode> library per se, but form
          the foundation of all numeric computation:
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Operator</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Semantics</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">For int</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">For double</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['+', 'Addition', 'Integer sum', 'Floating-point sum'],
                ['-', 'Subtraction', 'Integer difference', 'Floating-point difference'],
                ['*', 'Multiplication', 'Integer product', 'Floating-point product'],
                ['/', 'Division', 'Integer division (truncates toward zero)', 'Floating-point division'],
                ['%', 'Modulo', 'Remainder (sign follows dividend)', 'Not directly applicable (use fmod via Math)'],
              ].map(([op, sem, int, dbl], i) => (
                <tr key={op} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{op}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{sem}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{int}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{dbl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Prose>
          Integer division truncates toward zero. For floating-point remainder, use{' '}
          <InlineCode>Math.Fmod</InlineCode> (not yet exposed in the <InlineCode>Math</InlineCode> class,
          but the underlying C++ <InlineCode>std::fmod</InlineCode> is available in the runtime).
        </Prose>
      </ScrollReveal>

      {/* Internal Mechanics */}
      <ScrollReveal delay={0.05}>
        <H2>Internal Mechanics</H2>
        <div className="space-y-5">
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">1</span>
              <strong className="text-text-primary text-sm">Static Class, No Instances</strong>
            </div>
            <Prose>
              <InlineCode>Math</InlineCode> is declared with <InlineCode>LINK_STATIC</InlineCode> —
              the class itself is never instantiated. All methods are <InlineCode>static</InlineCode>
              and receive no <InlineCode>this</InlineCode> pointer. Calls compile to{' '}
              <InlineCode>CALLSTATICMETHODSYMBOL</InlineCode> with the symbol resolved at compile time.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">2</span>
              <strong className="text-text-primary text-sm">Native Callbacks (No Bytecode)</strong>
            </div>
            <Prose>
              Every method is backed by a native C++ callback (<InlineCode>SetCallback</InlineCode>).
              There is no ShardScript bytecode for math functions — the VM dispatches directly to the
              native function, which calls the corresponding <InlineCode>std::</InlineCode> function
              from <InlineCode>&lt;cmath&gt;</InlineCode>. This is a zero-overhead FFI: one
              indirect call from VM to native, one <InlineCode>std::</InlineCode> call, and the
              result is wrapped in an <InlineCode>ObjectInstance</InlineCode> via{' '}
              <InlineCode>FromValue</InlineCode>.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">3</span>
              <strong className="text-text-primary text-sm">Double Throughout</strong>
            </div>
            <Prose>
              All math functions accept and return <InlineCode>double</InlineCode>. Integer arguments
              are implicitly converted to <InlineCode>double</InlineCode> at the call boundary via{' '}
              <InlineCode>AsDouble()</InlineCode>. Results are always new <InlineCode>double</InlineCode>{' '}
              instances on the GC heap — the small-int cache does not apply to floating-point values.
            </Prose>
          </div>
        </div>
      </ScrollReveal>

      {/* Summary */}
      <ScrollReveal delay={0.05}>
        <H2>Category Summary: Basic Math</H2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Feature</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Members</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Constants', 'PI, E'],
                ['Rounding', 'Ceil, Floor, Round'],
                ['Absolute value', 'Abs'],
                ['Min / Max', 'Min, Max'],
                ['Arithmetic (operators)', '+, -, *, /, %'],
              ].map(([cat, members], i) => (
                <tr key={cat} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{cat}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{members}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollReveal>
    </div>
  )
}

/* ===== STANDARD LIBRARY: MATH — TRIGONOMETRY & LOGARITHMS ===== */

function MathTrigContent() {
  const trigFuncs = [
    ['Sin(value)', 'double', 'Sine of value (radians).', 'std::sin'],
    ['Cos(value)', 'double', 'Cosine of value (radians).', 'std::cos'],
    ['Tan(value)', 'double', 'Tangent of value (radians).', 'std::tan'],
    ['Asin(value)', 'double', 'Arc sine in [-PI/2, PI/2]; value in [-1, 1].', 'std::asin'],
    ['Acos(value)', 'double', 'Arc cosine in [0, PI]; value in [-1, 1].', 'std::acos'],
    ['Atan(value)', 'double', 'Arc tangent in [-PI/2, PI/2].', 'std::atan'],
    ['Atan2(y, x)', 'double', 'Arc tangent of y/x using signs to determine quadrant.', 'std::atan2'],
  ]
  const logExpFuncs = [
    ['Pow(base, exponent)', 'double', 'Raises base to exponent.', 'std::pow'],
    ['Sqrt(value)', 'double', 'Square root (value must be non-negative).', 'std::sqrt'],
    ['Cbrt(value)', 'double', 'Cube root.', 'std::cbrt'],
    ['Exp(value)', 'double', 'e^value (natural exponential).', 'std::exp'],
    ['Log(value)', 'double', 'Natural logarithm (base e); value must be positive.', 'std::log'],
    ['Log10(value)', 'double', 'Base-10 logarithm; value must be positive.', 'std::log10'],
  ]

  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          All trigonometric and logarithmic functions are <strong className="text-text-primary">direct native wrappers</strong>{' '}
          over <InlineCode>std::</InlineCode> functions from the C++ <InlineCode>&lt;cmath&gt;</InlineCode>{' '}
          header. Angles are expressed in <strong className="text-text-primary">radians</strong>. Every
          function is a <InlineCode>static</InlineCode> method on the <InlineCode>Math</InlineCode> class,
          accepts <InlineCode>double</InlineCode> arguments, and returns <InlineCode>double</InlineCode>.
        </Prose>
        <CodeBlock code={mathTrigCode} language="csharp" filename="math_trig_log.shard" />
      </ScrollReveal>

      {/* Trigonometry */}
      <ScrollReveal delay={0.05}>
        <H2>Trigonometric Functions</H2>
        <Prose>
          The forward trig functions (<InlineCode>Sin</InlineCode>, <InlineCode>Cos</InlineCode>,{' '}
          <InlineCode>Tan</InlineCode>) map an angle in radians to a ratio. The inverse functions
          (<InlineCode>Asin</InlineCode>, <InlineCode>Acos</InlineCode>, <InlineCode>Atan</InlineCode>,{' '}
          <InlineCode>Atan2</InlineCode>) map a ratio back to an angle.
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Method</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Return</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">C++ Backing</th>
              </tr>
            </thead>
            <tbody>
              {trigFuncs.map(([name, ret, desc, cpp], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{ret}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#5A6A8A]">{cpp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Callout tone="blue">
          <InlineCode>Atan2(y, x)</InlineCode> is the preferred way to compute an angle from
          Cartesian coordinates. Unlike <InlineCode>Atan(y / x)</InlineCode>, it correctly handles
          the quadrant using the signs of both arguments, and avoids division by zero when{' '}
          <InlineCode>x = 0</InlineCode>.
        </Callout>
      </ScrollReveal>

      {/* Logarithms and Exponentiation */}
      <ScrollReveal delay={0.05}>
        <H2>Logarithms, Exponentiation & Roots</H2>
        <Prose>
          The exponential and logarithmic family covers power, root, and log operations:
        </Prose>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-[#3A3A50] rounded-card overflow-hidden">
            <thead>
              <tr className="bg-[#2D2D45]">
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Method</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Return</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">Description</th>
                <th className="text-left px-4 py-3 text-xs font-medium tracking-wide uppercase text-text-primary">C++ Backing</th>
              </tr>
            </thead>
            <tbody>
              {logExpFuncs.map(([name, ret, desc, cpp], i) => (
                <tr key={name} className={i % 2 === 0 ? 'bg-[#1E1E2E]' : 'bg-[#252538]'}>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5] whitespace-nowrap">{name}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#7A8AB5]">{ret}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{desc}</td>
                  <td className="px-4 py-3 text-sm font-jetbrains text-[#5A6A8A]">{cpp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollReveal>

      {/* Practical example */}
      <ScrollReveal delay={0.05}>
        <H2>Practical Usage</H2>
        <Prose>
          Combining trigonometry with exponentiation covers most geometric and scientific workloads.
          The example below computes an angle via <InlineCode>Atan2</InlineCode> and converts it to
          degrees, then demonstrates <InlineCode>Pow</InlineCode>, <InlineCode>Sqrt</InlineCode>, and{' '}
          <InlineCode>Cbrt</InlineCode>:
        </Prose>
        <CodeBlock code={mathTrigAdvancedCode} language="csharp" filename="math_trig_advanced.shard" />
      </ScrollReveal>

      {/* Internal Mechanics */}
      <ScrollReveal delay={0.05}>
        <H2>Internal Mechanics</H2>
        <div className="space-y-5">
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">1</span>
              <strong className="text-text-primary text-sm">One-to-One C++ Mapping</strong>
            </div>
            <Prose>
              Each ShardScript method maps to exactly one <InlineCode>std::</InlineCode> function:
              <InlineCode>Math.Sin</InlineCode> → <InlineCode>std::sin</InlineCode>,{' '}
              <InlineCode>Math.Log</InlineCode> → <InlineCode>std::log</InlineCode>, etc.
              The native callback receives the argument via <InlineCode>AsDouble()</InlineCode>,
              calls the C++ function, and wraps the result in an <InlineCode>ObjectInstance</InlineCode>{' '}
              via <InlineCode>FromValue</InlineCode>. There is no range checking, no domain
              validation — invalid inputs (e.g., negative value to <InlineCode>Sqrt</InlineCode>)
              propagate the C++ <InlineCode>NaN</InlineCode> or <InlineCode>inf</InlineCode> result
              as a ShardScript <InlineCode>double</InlineCode>.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">2</span>
              <strong className="text-text-primary text-sm">Radians, Not Degrees</strong>
            </div>
            <Prose>
              All trigonometric functions operate in radians. To convert degrees to radians,
              multiply by <InlineCode>Math.PI / 180.0</InlineCode>. To convert radians to degrees,
              multiply by <InlineCode>180.0 / Math.PI</InlineCode>. No degree-mode functions are
              provided — this matches the C++ standard library convention.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">3</span>
              <strong className="text-text-primary text-sm">Zero-Overhead FFI</strong>
            </div>
            <Prose>
              The call path is: ShardScript <InlineCode>CALLSTATICMETHODSYMBOL</InlineCode> → native
              callback function pointer → <InlineCode>std::sin</InlineCode> (or equivalent) →
              <InlineCode>FromValue(result)</InlineCode>. There is no bytecode, no VM interpretation,
              no ShardScript-level wrapper. The overhead is one C++ function pointer indirection plus
              the <InlineCode>std::</InlineCode> call.
            </Prose>
          </div>
        </div>
      </ScrollReveal>


    </div>
  )
}

/* ===== STANDARD LIBRARY: MATH — USAGE SCENARIOS ===== */

function MathScenariosContent() {
  return (
    <div className="space-y-10">
      <ScrollReveal>
        <Prose>
          The following patterns demonstrate real-world use of <InlineCode>shard.math</InlineCode>{' '}
          functions in game logic and geometry calculations. Each pattern is a reusable building
          block you can adapt to your own project.
        </Prose>
        <CodeBlock code={mathTrigScenariosCode} language="csharp" filename="math_scenarios.shard" />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <H2>Game Logic Patterns</H2>
        <div className="space-y-5">
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">1</span>
              <strong className="text-text-primary text-sm">Oscillation</strong>
            </div>
            <Prose>
              <InlineCode>Math.Sin(time * frequency * 2.0 * Math.PI)</InlineCode> produces a
              smooth periodic wave between -1 and 1. Use it for health-bar pulsing, day/night
              cycle intensity, camera shake amplitude, weapon bob offset. Scale and offset the
              output to fit your range: <InlineCode>center + amplitude * wave</InlineCode>.
              Swap to <InlineCode>Math.Cos</InlineCode> for a quarter-phase offset.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">2</span>
              <strong className="text-text-primary text-sm">Exponential Cooldowns & Decay</strong>
            </div>
            <Prose>
              <InlineCode>Math.Exp(-rate * elapsed)</InlineCode> decays from 1.0 toward 0.0 with
              a half-life of <InlineCode>ln(2) / rate</InlineCode>. Multiply by the initial
              value for ability cooldown remaining, shield decay, damage falloff over distance,
              or loot-drop probability decay. For growth (e.g. compound interest), use{' '}
              <InlineCode>Math.Exp(rate * elapsed)</InlineCode>.
            </Prose>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <H2>Geometry Patterns</H2>
        <div className="space-y-5">
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">3</span>
              <strong className="text-text-primary text-sm">Distance Between Two Points</strong>
            </div>
            <Prose>
              <InlineCode>Math.Sqrt(dx * dx + dy * dy)</InlineCode> computes the Euclidean
              distance. Use for collision detection (distance less than sum of radii), proximity
              triggers, spatial queries, and AI aggro range checks. For 3D, add{' '}
              <InlineCode>dz * dz</InlineCode> under the root.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">4</span>
              <strong className="text-text-primary text-sm">Angle to Target</strong>
            </div>
            <Prose>
              <InlineCode>Math.Atan2(dy, dx)</InlineCode> returns the angle in radians from one
              point toward another. Unlike <InlineCode>Atan(dy/dx)</InlineCode>, it correctly
              handles all quadrants and the <InlineCode>dx = 0</InlineCode> case. Use for
              homing projectiles, AI facing direction, turret rotation, and minimap arrow
              indicators. Convert to degrees via{' '}
              <InlineCode>radians * 180.0 / Math.PI</InlineCode> for UI display.
            </Prose>
          </div>
          <div className="bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold">5</span>
              <strong className="text-text-primary text-sm">Polar to Cartesian Conversion</strong>
            </div>
            <Prose>
              Given an angle <InlineCode>a</InlineCode> (radians) and radius <InlineCode>r</InlineCode>:
              <InlineCode>x = r * Math.Cos(a); y = r * Math.Sin(a)</InlineCode>. This converts
              a direction-and-distance pair into an offset vector. Use for spawning projectiles at
              the edge of a blast radius, positioning UI elements in a circle, orbital camera
              movement, or circular formation positioning for AI units.
            </Prose>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}

function PlaceholderContent({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="space-y-6">
      <ScrollReveal>
        {subtitle && (
          <p className="text-xs font-medium tracking-[0.05em] uppercase text-text-muted mb-3">{subtitle}</p>
        )}
        <Prose>
          This section of the documentation is a work in progress. Detailed information about{' '}
          <strong className="text-text-primary">{title}</strong> will appear here soon.
        </Prose>
      </ScrollReveal>
      <ScrollReveal delay={0.05}>
        <Callout tone="amber" title="Note">
          We are actively expanding the documentation.
        </Callout>
      </ScrollReveal>
    </div>
  )
}
