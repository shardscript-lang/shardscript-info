import{j as e}from"./index-DbX8E4-q.js";function h(a){const s={code:"code",p:"p",...a.components},{Bullet:o,Callout:d,CodeBlock:t,DocsTable:c,H2:i,InlineCode:n,Prose:r}=s;return o||l("Bullet"),d||l("Callout"),t||l("CodeBlock"),c||l("DocsTable"),i||l("H2"),n||l("InlineCode"),r||l("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(i,{children:"Summary"}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:["The ",e.jsx(n,{children:"shard.debug"})," namespace and the companion"," ",`
`,e.jsx(n,{children:"ProgramDisassembler"}),` C++ class provide two complementary ways to inspect a
ShardScript program: the `,e.jsx(n,{children:"-d"})," (",e.jsx(n,{children:"--decompiled"}),`) CLI flag
prints the compiled bytecode of every source-defined method, while the`," ",`
`,e.jsx(n,{children:"Debug"}),` static class exposes runtime heap and stack snapshots from inside
running ShardScript code.`]})}),`
`,e.jsx(i,{children:"Syntax"}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Command-line disassembly."})," Pass ",e.jsx(n,{children:"-d"})," or"," ",`
`,e.jsx(n,{children:"--decompiled"})," instead of running the program:"]})}),`
`,e.jsx(t,{code:`shard -d hello.shard
shard --decompiled hello.shard`,language:"text",filename:"cli.txt"}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"C++ host integration."})," Include ",e.jsx(n,{children:"<shard/compilation/ProgramDisassembler.hpp>"})," ",`
and call either overload:`]})}),`
`,e.jsx(t,{code:`shard::ProgramDisassembler disassembler;

// Disassemble the whole program image starting at its entry point.
disassembler.Disassemble(std::wcout, programVirtualImage);

// Disassemble a single method symbol.
disassembler.Disassemble(std::wcout, methodSymbol);`,language:"cpp",filename:"host_disassembler.cpp"}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Runtime inspection from ShardScript."})," Call the static members on the"," ",`
`,e.jsx(n,{children:"Debug"})," class after importing ",e.jsx(n,{children:"debug"}),":"]})}),`
`,e.jsx(t,{code:`using stdio;
using debug;

namespace demo;

public static func Main() -> void
{
  PrintStackFrameInfo();
  PrintGcInfo();
}`,language:"csharp",filename:"runtime_inspection.shard"}),`
`,e.jsx(i,{children:"Parameters / Arguments"}),`
`,e.jsx(c,{headers:["Member","Parameter","Type","Description"],rows:[[e.jsx(s.code,{children:"shard -d <file>"}),e.jsx(s.code,{children:"file"}),"string (path)","A ShardScript source file or glob pattern to compile and disassemble."],[e.jsx(s.code,{children:"ProgramDisassembler::Disassemble"}),e.jsx(s.code,{children:"out"}),"std::wostream&amp;","Output stream. ANSI colors are emitted only when the stream is std::wcout."],[e.jsx(s.code,{children:"ProgramDisassembler::Disassemble"}),e.jsx(s.code,{children:"program"}),"ProgramVirtualImage&amp;","Compiled program image whose EntryPoint will be disassembled."],[e.jsx(s.code,{children:"ProgramDisassembler::Disassemble"}),e.jsx(s.code,{children:"method"}),"MethodSymbol*","Specific method symbol to disassemble."],[e.jsx(s.code,{children:"Debug.PrintStackFrameInfo"}),"(none)","-","Dumps local variables from the caller frame."],[e.jsx(s.code,{children:"Debug.PrintGcInfo"}),"(none)","-","Dumps every live object on the GC heap."]]}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:["The CLI flag accepts the same positional-file and library options as a normal run."," ",`
`,e.jsx(n,{children:"-d"})," implicitly sets ",e.jsx(n,{children:"RunProgram = false"}),`, so the
entry point is never executed.`]})}),`
`,e.jsx(i,{children:"Returns"}),`
`,e.jsx(c,{headers:["Member","Return Value"],rows:[[e.jsx(s.code,{children:"shard -d"}),"Text disassembly written to stdout. Exit code 0 on success, 1 on compilation error."],[e.jsx(s.code,{children:"ProgramDisassembler::Disassemble"}),"None. Formatted text is written to the supplied wostream."],[e.jsx(s.code,{children:"Debug.PrintStackFrameInfo"}),"void."],[e.jsx(s.code,{children:"Debug.PrintGcInfo"}),"void."]]}),`
`,e.jsx(i,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(o,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Compilation failure"})," —"," ",`
`,e.jsx(n,{children:"-d"}),` still runs the full compiler pipeline. Lexical, syntactic, or
semantic errors are reported before any bytecode is printed.`]})}),e.jsx(o,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Missing entry point"})," — When calling"," ",`
`,e.jsx(n,{children:"Disassemble(std::wostream&, ProgramVirtualImage&)"})," on an image with no"," ",`
`,e.jsx(n,{children:"EntryPoint"}),", the disassembler writes"," ",`
`,e.jsx(n,{children:"; Error: No EntryPoint found in ProgramVirtualImage."})]})}),e.jsx(o,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"External or empty methods"}),` — Native/external methods
and methods with no bytecode emit a comment instead of an instruction stream.`]})}),e.jsx(o,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"GC concurrency hazard"})," —"," ",`
`,e.jsx(n,{children:"PrintGcInfo"}),` reads the heap vector without synchronization. Calling it
during GC activity can produce inconsistent output.`]})})]}),`
`,e.jsx(i,{children:"Remarks"}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsxs("strong",{children:["What ",e.jsx(n,{children:"-d"})," actually prints."]}),` The interpreter's decompile mode
compiles every source file, then iterates over all `,e.jsx(n,{children:"MethodSymbol"}),` entries in
the semantic model. Only methods whose `,e.jsx(n,{children:"HandleType"})," is"," ",`
`,e.jsx(n,{children:"Body"}),` and whose declaring compilation unit originated from a source file are
printed. Compiler-generated async state-machine methods (named`," ",`
`,e.jsx(n,{children:"k__AsyncStateMachine_..."}),`) are also included even though they have no
source node.`]})}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Method header format."})," Each method begins with a framed header:"]})}),`
`,e.jsx(t,{code:`; ============================================================
;  DISASSEMBLY: demo.Program.Main
; ============================================================
;  Handle:     body
;  Access:     public static
;  Return:     Void
;  Parameters: ()
;  Declared:   demo.Program
;  Locals:     0
;  Variables:  0
; ============================================================`,language:"text",filename:"method_header.txt"}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Instruction format."})," Each line contains a 16-bit hex offset prefixed with"," ",`
`,e.jsx(n,{children:"SS_"}),", a right-aligned mnemonic, and operands:"]})}),`
`,e.jsx(t,{code:`SS_0000:   ldc.bool    false
SS_0003:   jmpf        SS_003F
SS_000D:   ldstr       pool[0]
SS_0017:   call        stdio.println`,language:"text",filename:"instruction_lines.txt"}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Color output."})," The disassembler detects whether the output stream is"," ",`
`,e.jsx(n,{children:"std::wcout"}),`. If so, it emits ANSI color codes for offsets (gray), mnemonics
(cyan), and operands (yellow). Redirecting to a file disables colors automatically.`]})}),`
`,e.jsx(d,{tone:"blue",children:e.jsxs(s.p,{children:["The CLI prints ",e.jsx("strong",{children:"all"}),` source-defined methods, not just the entry point. This is useful
for inspecting compiler-generated async state machines, lambda bodies, and helper methods.`]})}),`
`,e.jsx(i,{children:"Bytecode Opcode Reference"}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:[`The following table lists every opcode the disassembler currently recognizes. Any opcode not yet
handled is printed as `,e.jsx(n,{children:"unknown 0xHHHH"}),"."]})}),`
`,e.jsx(c,{headers:["Opcode","Stack Effect","Operands","Description"],rows:[[e.jsx(s.code,{children:"nop"}),"No change","-","No operation."],[e.jsx(s.code,{children:"halt"}),"-","int32 exitCode","Stops the VM immediately."],[e.jsx(s.code,{children:"pop"}),"Pops 1","-","Discards the top of the evaluation stack."],[e.jsx(s.code,{children:"pop.n"}),"Pops N","uint8 count","Discards N values from the stack."],[e.jsx(s.code,{children:"ldnull"}),"Pushes 1","-","Pushes a null object reference."],[e.jsx(s.code,{children:"ret"}),"Pops frame","-","Returns from the current method."],[e.jsx(s.code,{children:"ldc.bool"}),"Pushes 1","bool value","Loads a boolean constant."],[e.jsx(s.code,{children:"ldc.i8"}),"Pushes 1","int64 value","Loads a 64-bit integer constant."],[e.jsx(s.code,{children:"ldc.r8"}),"Pushes 1","double value","Loads a 64-bit floating-point constant."],[e.jsx(s.code,{children:"ldc.char"}),"Pushes 1","char value","Loads a UTF-16 character constant."],[e.jsx(s.code,{children:"ldstr"}),"Pushes 1","pool[index]","Loads a string from the string pool."],[e.jsx(s.code,{children:"ldloc"}),"Pushes 1","uint16 slot","Loads a local variable by slot."],[e.jsx(s.code,{children:"stloc"}),"Pops 1","uint16 slot","Stores the stack top into a local variable slot."],[e.jsx(s.code,{children:"ldfld"}),"Pops 1, pushes 1","uint32 slot","Loads an instance field by layout slot."],[e.jsx(s.code,{children:"stfld"}),"Pops 2","uint32 slot","Stores a value into an instance field."],[e.jsx(s.code,{children:"ldsfld"}),"Pushes 1","FieldSymbol*","Loads a static field."],[e.jsx(s.code,{children:"stsfld"}),"Pops 1","FieldSymbol*","Stores into a static field."],[e.jsx(s.code,{children:"ldenum"}),"Pushes 1","FieldSymbol*","Loads an enum field value."],[e.jsx(s.code,{children:"dup"}),"Pushes 1","-","Duplicates the top stack value."],[e.jsx(s.code,{children:"add"}),"Pops 2, pushes 1","-","Addition."],[e.jsx(s.code,{children:"sub"}),"Pops 2, pushes 1","-","Subtraction."],[e.jsx(s.code,{children:"mul"}),"Pops 2, pushes 1","-","Multiplication."],[e.jsx(s.code,{children:"div"}),"Pops 2, pushes 1","-","Division."],[e.jsx(s.code,{children:"mod"}),"Pops 2, pushes 1","-","Modulo."],[e.jsx(s.code,{children:"pow"}),"Pops 2, pushes 1","-","Exponentiation."],[e.jsx(s.code,{children:"neg"}),"Pops 1, pushes 1","-","Unary negation."],[e.jsx(s.code,{children:"pos"}),"Pops 1, pushes 1","-","Unary plus (no-op)."],[e.jsx(s.code,{children:"shl"}),"Pops 2, pushes 1","-","Bitwise left shift."],[e.jsx(s.code,{children:"shr"}),"Pops 2, pushes 1","-","Bitwise right shift."],[e.jsx(s.code,{children:"cmp_eq"}),"Pops 2, pushes 1","-","Equality comparison."],[e.jsx(s.code,{children:"cmp_neq"}),"Pops 2, pushes 1","-","Inequality comparison."],[e.jsx(s.code,{children:"cmp_l"}),"Pops 2, pushes 1","-","Less-than comparison."],[e.jsx(s.code,{children:"cmp_le"}),"Pops 2, pushes 1","-","Less-than-or-equal comparison."],[e.jsx(s.code,{children:"cmp_gt"}),"Pops 2, pushes 1","-","Greater-than comparison."],[e.jsx(s.code,{children:"cmp_ge"}),"Pops 2, pushes 1","-","Greater-than-or-equal comparison."],[e.jsx(s.code,{children:"not"}),"Pops 1, pushes 1","-","Logical/bitwise NOT."],[e.jsx(s.code,{children:"and"}),"Pops 2, pushes 1","-","Logical/bitwise AND."],[e.jsx(s.code,{children:"or"}),"Pops 2, pushes 1","-","Logical/bitwise OR."],[e.jsx(s.code,{children:"ldelem"}),"Pops 2, pushes 1","-","Loads an array element."],[e.jsx(s.code,{children:"stelem"}),"Pops 3","-","Stores a value into an array element."],[e.jsx(s.code,{children:"ldlen"}),"Pops 1, pushes 1","-","Loads an array length."],[e.jsx(s.code,{children:"newobj"}),"Pops args, pushes 1","TypeSymbol*, ConstructorSymbol*","Creates a new object instance."],[e.jsx(s.code,{children:"newdelegate"}),"Pushes 1","DelegateTypeSymbol*","Creates a new delegate instance."],[e.jsx(s.code,{children:"newarr"}),"Pops 1, pushes 1","ArrayTypeSymbol*","Creates a fixed-type array."],[e.jsx(s.code,{children:"newdynarr"}),"Pops 1, pushes 1","TypeSymbol*","Creates a dynamic array."],[e.jsx(s.code,{children:"newrange"}),"Pops 2, pushes 1","TypeSymbol*","Creates a range-backed array."],[e.jsx(s.code,{children:"call"}),"Pops args, pushes 0/1","MethodSymbol*","Calls a method."],[e.jsx(s.code,{children:"callgeneric"}),"Pops args, pushes 0/1","MethodSymbol*","Calls a generic method."],[e.jsx(s.code,{children:"calldelegate"}),"Pops args, pushes 0/1","-","Invokes a delegate."],[e.jsx(s.code,{children:"callinterface"}),"Pops args, pushes 0/1","MethodSymbol*","Calls an interface method."],[e.jsx(s.code,{children:"ldtypearg"}),"No stack change","uint16 index, TypeSymbol*","Loads a generic type argument."],[e.jsx(s.code,{children:"isinst"}),"Pops 1, pushes 1","TypeSymbol*","Type compatibility test."],[e.jsx(s.code,{children:"castinterface"}),"Pops 1, pushes 1","TypeSymbol*","Interface cast."],[e.jsx(s.code,{children:"jmp"}),"-","SS_XXXX target","Unconditional jump."],[e.jsx(s.code,{children:"jmpf"}),"Pops 1","SS_XXXX target","Jump if stack top is false."],[e.jsx(s.code,{children:"jmpt"}),"Pops 1","SS_XXXX target","Jump if stack top is true."],[e.jsx(s.code,{children:"throw"}),"Pops 1","-","Throws an exception."],[e.jsx(s.code,{children:"enter_try"}),"-","SS_XXXX handler","Marks the start of a try block."],[e.jsx(s.code,{children:"leave_try"}),"-","-","Marks the end of a try block."],[e.jsx(s.code,{children:"rethrow"}),"-","-","Re-throws the current exception."],[e.jsx(s.code,{children:"end_catch"}),"-","-","Ends a catch handler."],[e.jsx(s.code,{children:"load_current_exception"}),"Pushes 1","-","Pushes the exception being handled."],[e.jsx(s.code,{children:"store_current_exception"}),"Pops 1","-","Stores the current exception."],[e.jsx(s.code,{children:"defer"}),"-","SS_XXXX target","Registers a deferred expression."],[e.jsx(s.code,{children:"defer_break"}),"-","-","Returns from a deferred expression."],[e.jsx(s.code,{children:"defer_drain"}),"-","size_t count","Drains N registered defers."]]}),`
`,e.jsx(d,{tone:"amber",title:"Unrecognized opcodes",children:e.jsxs(s.p,{children:["The disassembler source does not yet contain cases for ",e.jsx(n,{children:"CAST"})," and"," ",`
`,e.jsx(n,{children:"CASTPRIMITIVE"}),". If the compiler emits them, they appear as"," ",`
`,e.jsx(n,{children:"unknown 0xHHHH"})," rather than a friendly mnemonic."]})}),`
`,e.jsx(i,{children:"Examples"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Disassembling a simple conditional."})}),`
`,e.jsx(t,{code:`using stdio;

namespace test;

public class Program
{
  public static func Main() -> void
  {
      if (false)
      {
          println("if branch");
      }
      else
      {
          println("else branch");
      }

      println("after");
  }
}`,language:"csharp",filename:"if_else.shard"}),`
`,e.jsxs(r,{children:["Run ",e.jsx(n,{children:"shard -d if_else.shard"})," to produce:"]}),`
`,e.jsx(t,{code:`; ============================================================
;  DISASSEMBLY: test.Program.Main
; ============================================================
;  Access:      public static
;  Return:      Void
;  Parameters:  ()
;  Locals:      0
;  Variables:   0
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
SS_0049:   call        stdio.println`,language:"text",filename:"if_else_disassembly.txt"}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:["Notice how the compiler emits a forward ",e.jsx(n,{children:"jmpf"}),` to skip the then-branch, an
unconditional `,e.jsx(n,{children:"jmp"}),` to skip the else-branch after the then-branch runs, and
string-pool indices for each literal.`]})}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Local variables and stack slots."})}),`
`,e.jsx(t,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  a: int = 10;
  b: int = 20;
  sum: int = a + b;

  println(sum);
}`,language:"csharp",filename:"locals.shard"}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:[`The disassembly reveals the fixed local slots assigned by the layout pass. Here the compiler stored
`,e.jsx(n,{children:"a"}),", ",e.jsx(n,{children:"b"}),", and ",e.jsx(n,{children:"sum"}),` in slots 0,
1, and 2:`]})}),`
`,e.jsx(t,{code:`SS_0000:   ldc.i8      10
SS_0009:   stloc       0
SS_0012:   ldc.i8      20
SS_001B:   stloc       1
SS_0024:   ldloc       0
SS_002D:   ldloc       1
SS_0036:   add
SS_0037:   stloc       2
SS_0040:   ldloc       2
SS_0049:   call        stdio.println`,language:"text",filename:"locals_disassembly.txt"}),`
`,e.jsx(r,{children:e.jsx("strong",{children:"Loops and backward jumps."})}),`
`,e.jsx(t,{code:`using stdio;

namespace demo;

public static func Main() -> void
{
  i: int = 0;

  while (i < 3)
  {
      println(i);
      i = i + 1;
  }
}`,language:"csharp",filename:"loop.shard"}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:["The condition is re-evaluated through a backward jump. Watch how the offset decreases from"," ",`
`,e.jsx(n,{children:"SS_0040"})," back to ",e.jsx(n,{children:"SS_0000"}),":"]})}),`
`,e.jsx(t,{code:`SS_0000:   ldc.i8      0
SS_0009:   stloc       0
SS_0012:   ldloc       0
SS_001B:   ldc.i8      3
SS_0024:   cmp_l
SS_0025:   jmpf        SS_004C
SS_002E:   ldloc       0
SS_0037:   call        stdio.println
SS_0041:   ldloc       0
SS_004A:   ldc.i8      1
SS_0053:   add
SS_0054:   stloc       0
SS_005D:   jmp         SS_0012`,language:"text",filename:"loop_disassembly.txt"}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Runtime frame inspection."})," Use ",e.jsx(n,{children:"Debug.PrintStackFrameInfo"})," ",`
to see the current frame's locals from inside ShardScript:`]})}),`
`,e.jsx(t,{code:`using stdio;
using debug;

namespace demo;

public static func Inspect(a: int, b: string) -> void
{
  local: bool = true;

  // Dump the caller frame before doing anything else.
  PrintStackFrameInfo();

  println("done");
}

public static func Main() -> void
{
  Inspect(42, "shard");
}`,language:"csharp",filename:"frame_inspection.shard"}),`
`,e.jsx(r,{children:e.jsx(s.p,{children:`The output includes one line per local slot showing the object pointer, runtime type name, and
current reference count. The exact pointer values vary between runs.`})}),`
`,e.jsx(t,{code:`[Frame Info] Locals count: 3
PTR: 0x...  TYPE: int    REFS: 1   ; argument 'a'
PTR: 0x...  TYPE: string REFS: 1   ; argument 'b'
PTR: 0x...  TYPE: bool   REFS: 1   ; local 'local'`,language:"text",filename:"frame_output.txt"}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Runtime heap inspection."})," Use ",e.jsx(n,{children:"Debug.PrintGcInfo"}),` to take a
snapshot of every live object:`]})}),`
`,e.jsx(t,{code:`using stdio;
using debug;

namespace demo;

public static func Main() -> void
{
  // Create some objects and capture a heap snapshot.
  nums: int[] = [1, 2, 3];
  msg: string = "hello";

  PrintGcInfo();

  println(msg);
  println(nums.Length);
}`,language:"csharp",filename:"heap_inspection.shard"}),`
`,e.jsx(i,{children:"Common Mistakes"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(o,{children:e.jsxs(s.p,{children:[e.jsxs("strong",{className:"text-text-primary",children:["Expecting ",e.jsx(n,{children:"-d"})," to run the program."]})," ",`
The flag compiles and prints bytecode only. Side effects in `,e.jsx(n,{children:"Main"}),` do not
execute.`]})}),e.jsx(o,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Reading absolute offsets as stable identifiers."})," ",`
Offsets change whenever the source, compiler version, or standard-library headers change. Do not
hard-code them in tooling.`]})}),e.jsx(o,{children:e.jsxs(s.p,{children:[e.jsxs("strong",{className:"text-text-primary",children:["Trusting ",e.jsx(n,{children:"unknown"})," operands."]})," ",`
An `,e.jsx(n,{children:"unknown"}),` opcode means the disassembler does not know how many bytes to
decode, so the rest of the method may be misaligned.`]})}),e.jsx(o,{children:e.jsxs(s.p,{children:[e.jsxs("strong",{className:"text-text-primary",children:["Calling ",e.jsx(n,{children:"PrintGcInfo"})," in hot paths."]})," ",`
It walks the entire heap and writes to stdout. Use it as a diagnostic checkpoint, not in tight
loops.`]})})]}),`
`,e.jsx(i,{children:"Internal Mechanics"}),`
`,e.jsxs("div",{className:"space-y-5",children:[e.jsxs("div",{className:"bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-3",children:[e.jsx("span",{className:"inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold",children:"1"}),e.jsx("strong",{className:"text-text-primary text-sm",children:"CLI to Disassembler Pipeline"})]}),e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx(n,{children:"ShardUtilities::ParseArguments"})," sets"," ",`
`,e.jsx(n,{children:"ShowDecompile = true"})," and ",e.jsx(n,{children:"RunProgram = false"}),`.
After `,e.jsx(n,{children:"compiler.Compile()"}),` succeeds, the interpreter iterates the symbol
table, skips external/native methods, and calls`," ",`
`,e.jsx(n,{children:"ProgramDisassembler::Disassemble(std::wcout, method)"})," for each body."]})})]}),e.jsxs("div",{className:"bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-3",children:[e.jsx("span",{className:"inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold",children:"2"}),e.jsx("strong",{className:"text-text-primary text-sm",children:"ByteCodeDecoder"})]}),e.jsx(r,{children:e.jsxs(s.p,{children:["The disassembler builds a ",e.jsx(n,{children:"ByteCodeDecoder"})," over the method's"," ",`
`,e.jsx(n,{children:"ExecutableByteCode"}),` vector and advances one opcode at a time. Each opcode
case absorbs its specific operands (integers, symbol pointers, jump targets, string-pool
indices) so the next iteration starts on the next instruction boundary.`]})})]}),e.jsxs("div",{className:"bg-[#1A1A2E] border border-[#3A3A50] rounded-card p-5",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-3",children:[e.jsx("span",{className:"inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-blue text-white text-xs font-jetbrains font-semibold",children:"3"}),e.jsx("strong",{className:"text-text-primary text-sm",children:"External Methods Have No Bytecode"})]}),e.jsx(r,{children:e.jsxs(s.p,{children:["Methods backed by a native C++ callback (such as most of ",e.jsx(n,{children:"shard.math"}),`)
have `,e.jsx(n,{children:"HandleType::External"}),`. The disassembler prints their function
pointer and returns instead of decoding instructions.`]})})]})]}),`
`,e.jsx(i,{children:"Category Summary"}),`
`,e.jsx(c,{headers:["Feature","Members / Entry Points"],rows:[["CLI disassembly","shard -d <file>, shard --decompiled <file>"],["C++ disassembler","shard::ProgramDisassembler::Disassemble"],["Runtime frame dump","debug.Debug.PrintStackFrameInfo"],["Runtime heap dump","debug.Debug.PrintGcInfo"]]})]})}function m(a={}){const{wrapper:s}=a.components||{};return s?e.jsx(s,{...a,children:e.jsx(h,{...a})}):h(a)}function l(a,s){throw new Error("Expected component `"+a+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default};
