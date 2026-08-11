import{j as e}from"./index-C1AvCmMi.js";function h(s){const t={p:"p",...s.components},{Bullet:o,Callout:c,CodeBlock:a,DocsTable:r,H2:l,InlineCode:n,Prose:i}=t;return o||d("Bullet"),c||d("Callout"),a||d("CodeBlock"),r||d("DocsTable"),l||d("H2"),n||d("InlineCode"),i||d("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(l,{children:"Summary"}),`
`,e.jsx(i,{children:e.jsxs(t.p,{children:["The ",e.jsx(n,{children:"shard.cinterop"})," standard library exposes the namespace"," ",`
`,e.jsx(n,{children:"interop"})," with three static classes —"," ",`
`,e.jsx(n,{children:"NativeLibrary"}),", ",e.jsx(n,{children:"Marshal"}),", and"," ",`
`,e.jsx(n,{children:"NativeCall"}),` — for loading shared native libraries, allocating
and reading or writing unmanaged memory, and invoking raw C function pointers from
ShardScript.`]})}),`
`,e.jsx(l,{children:"Syntax"}),`
`,e.jsx(i,{children:e.jsxs(t.p,{children:["Import the namespace with ",e.jsx(n,{children:"using interop;"}),`. All members are
static and are accessed through their declaring class:`]})}),`
`,e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"NativeLibrary"})," loads shared libraries and resolves exported symbols."]})}),`
`,e.jsx(r,{headers:["Member","Signature","Description"],rows:[[e.jsx(n,{children:"Load(path)"}),e.jsx(e.Fragment,{children:e.jsx(n,{children:"static func Load(path: string) -> nint"})}),"Loads a shared library (DLL on Windows, .so on Linux) and returns an opaque handle."],[e.jsx(n,{children:"GetFunction(handle, name)"}),e.jsx(e.Fragment,{children:e.jsx(n,{children:"static func GetFunction(handle: nint, name: string) -> nint"})}),"Returns the address of the named export, or zero if the symbol cannot be resolved."],[e.jsx(n,{children:"Free(handle)"}),e.jsx(e.Fragment,{children:e.jsx(n,{children:"static func Free(handle: nint) -> void"})}),"Decrements the reference count of the loaded library. Passing zero is safe."]]}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Marshal — memory management"})}),`
`,e.jsx(r,{headers:["Member","Signature","Description"],rows:[[e.jsx(n,{children:"Alloc(size)"}),e.jsx(e.Fragment,{children:e.jsx(n,{children:"static func Alloc(size: int) -> nint"})}),"Allocates zero-initialized native memory."],[e.jsx(n,{children:"Realloc(ptr, size)"}),e.jsx(e.Fragment,{children:e.jsx(n,{children:"static func Realloc(ptr: nint, size: int) -> nint"})}),"Resizes an existing native block."],[e.jsx(n,{children:"Free(ptr)"}),e.jsx(e.Fragment,{children:e.jsx(n,{children:"static func Free(ptr: nint) -> void"})}),"Releases memory allocated by Alloc, Realloc, StringToAnsi, or StringToUnicode."],[e.jsx(n,{children:"Copy(source, destination, length)"}),e.jsx(e.Fragment,{children:e.jsx(n,{children:"static func Copy(source: nint, destination: nint, length: int) -> void"})}),"Copies length bytes between native buffers. Regions may overlap."],[e.jsx(n,{children:"Fill(ptr, length, value)"}),e.jsx(e.Fragment,{children:e.jsx(n,{children:"static func Fill(ptr: nint, length: int, value: int) -> void"})}),"Sets length bytes to the low byte of value."]]}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Marshal — typed reads"})}),`
`,e.jsx(r,{headers:["Member","Signature","Description"],rows:[[e.jsx(n,{children:"ReadByte(ptr, offset)"}),e.jsx(e.Fragment,{children:e.jsx(n,{children:"static func ReadByte(ptr: nint, offset: int) -> int"})}),"Reads one unsigned byte."],[e.jsx(n,{children:"ReadInt16(ptr, offset)"}),e.jsx(e.Fragment,{children:e.jsx(n,{children:"static func ReadInt16(ptr: nint, offset: int) -> int"})}),"Reads one 16-bit signed integer."],[e.jsx(n,{children:"ReadInt32(ptr, offset)"}),e.jsx(e.Fragment,{children:e.jsx(n,{children:"static func ReadInt32(ptr: nint, offset: int) -> int"})}),"Reads one 32-bit signed integer."],[e.jsx(n,{children:"ReadInt64(ptr, offset)"}),e.jsx(e.Fragment,{children:e.jsx(n,{children:"static func ReadInt64(ptr: nint, offset: int) -> int"})}),"Reads one 64-bit signed integer."],[e.jsx(n,{children:"ReadIntPtr(ptr, offset)"}),e.jsx(e.Fragment,{children:e.jsx(n,{children:"static func ReadIntPtr(ptr: nint, offset: int) -> nint"})}),"Reads one pointer-sized integer."],[e.jsx(n,{children:"ReadFloat(ptr, offset)"}),e.jsx(e.Fragment,{children:e.jsx(n,{children:"static func ReadFloat(ptr: nint, offset: int) -> double"})}),"Reads one 32-bit IEEE-754 float."],[e.jsx(n,{children:"ReadDouble(ptr, offset)"}),e.jsx(e.Fragment,{children:e.jsx(n,{children:"static func ReadDouble(ptr: nint, offset: int) -> double"})}),"Reads one 64-bit IEEE-754 double."]]}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Marshal — typed writes"})}),`
`,e.jsx(r,{headers:["Member","Signature","Description"],rows:[[e.jsx(n,{children:"WriteByte(ptr, offset, value)"}),e.jsx(e.Fragment,{children:e.jsx(n,{children:"static func WriteByte(ptr: nint, offset: int, value: int) -> void"})}),"Writes one unsigned byte."],[e.jsx(n,{children:"WriteInt16(ptr, offset, value)"}),e.jsx(e.Fragment,{children:e.jsx(n,{children:"static func WriteInt16(ptr: nint, offset: int, value: int) -> void"})}),"Writes one 16-bit signed integer."],[e.jsx(n,{children:"WriteInt32(ptr, offset, value)"}),e.jsx(e.Fragment,{children:e.jsx(n,{children:"static func WriteInt32(ptr: nint, offset: int, value: int) -> void"})}),"Writes one 32-bit signed integer."],[e.jsx(n,{children:"WriteInt64(ptr, offset, value)"}),e.jsx(e.Fragment,{children:e.jsx(n,{children:"static func WriteInt64(ptr: nint, offset: int, value: int) -> void"})}),"Writes one 64-bit signed integer."],[e.jsx(n,{children:"WriteIntPtr(ptr, offset, value)"}),e.jsx(e.Fragment,{children:e.jsx(n,{children:"static func WriteIntPtr(ptr: nint, offset: int, value: nint) -> void"})}),"Writes one pointer-sized integer."],[e.jsx(n,{children:"WriteFloat(ptr, offset, value)"}),e.jsx(e.Fragment,{children:e.jsx(n,{children:"static func WriteFloat(ptr: nint, offset: int, value: double) -> void"})}),"Writes one 32-bit float."],[e.jsx(n,{children:"WriteDouble(ptr, offset, value)"}),e.jsx(e.Fragment,{children:e.jsx(n,{children:"static func WriteDouble(ptr: nint, offset: int, value: double) -> void"})}),"Writes one 64-bit double."]]}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Marshal — string marshalling"})}),`
`,e.jsx(r,{headers:["Member","Signature","Description"],rows:[[e.jsx(n,{children:"StringFromAnsi(ptr)"}),e.jsx(e.Fragment,{children:e.jsx(n,{children:"static func StringFromAnsi(ptr: nint) -> string"})}),"Converts a NUL-terminated ANSI byte buffer to a ShardScript string."],[e.jsx(n,{children:"StringFromUnicode(ptr)"}),e.jsx(e.Fragment,{children:e.jsx(n,{children:"static func StringFromUnicode(ptr: nint) -> string"})}),"Converts a NUL-terminated UTF-16 buffer to a ShardScript string."],[e.jsx(n,{children:"StringToAnsi(value)"}),e.jsx(e.Fragment,{children:e.jsx(n,{children:"static func StringToAnsi(value: string) -> nint"})}),"Encodes a string to a NUL-terminated ANSI buffer that the caller must free."],[e.jsx(n,{children:"StringToUnicode(value)"}),e.jsx(e.Fragment,{children:e.jsx(n,{children:"static func StringToUnicode(value: string) -> nint"})}),"Encodes a string to a NUL-terminated UTF-16 buffer that the caller must free."]]}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Marshal — pointer arithmetic and introspection"})}),`
`,e.jsx(r,{headers:["Member","Signature","Description"],rows:[[e.jsx(n,{children:"Add(ptr, offset)"}),e.jsx(e.Fragment,{children:e.jsx(n,{children:"static func Add(ptr: nint, offset: int) -> nint"})}),"Returns a new pointer offset by the given number of bytes."],[e.jsx(n,{children:"IntPtrSize"}),e.jsx(e.Fragment,{children:e.jsx(n,{children:"static prop IntPtrSize: int"})}),"Returns the size of a native pointer on the current platform (4 or 8)."]]}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"NativeCall — invoke raw C function pointers"})}),`
`,e.jsx(r,{headers:["Family","Return Type","Argument Types"],rows:[[e.jsx(n,{children:"Call(function, [a], [b], [c], [d])"}),e.jsx(n,{children:"int"}),"function: nint; a, b, c, d: any. Use when the C function returns a 32-bit integer."],[e.jsx(n,{children:"CallI64(function, [a], [b], [c], [d])"}),e.jsx(n,{children:"int"}),"function: nint; a, b, c, d: any. Use when the C function returns a 64-bit integer."],[e.jsx(n,{children:"CallN(function, [a], [b], [c], [d])"}),e.jsx(n,{children:"nint"}),"function: nint; a, b, c, d: any. Use when the C function returns a pointer."],[e.jsx(n,{children:"CallVoid(function, [a], [b], [c], [d])"}),e.jsx(n,{children:"void"}),"function: nint; a, b, c, d: any. Use when the C function returns void."],[e.jsx(n,{children:"CallDouble(function, [a], [b], [c], [d])"}),e.jsx(n,{children:"double"}),"function: nint; a, b, c, d: double. Use when the C function takes and returns double."]]}),`
`,e.jsx(l,{children:"Parameters / Arguments"}),`
`,e.jsx(r,{headers:["Parameter","Type","Description"],rows:[[e.jsx(n,{children:"path"}),e.jsx(n,{children:"string"}),"Platform-specific library path or name. On Windows this is passed to LoadLibraryW; on Linux it is narrowed for dlopen."],[e.jsx(n,{children:"handle"}),e.jsx(n,{children:"nint"}),"Opaque library handle returned by NativeLibrary.Load."],[e.jsx(n,{children:"name"}),e.jsx(n,{children:"string"}),"Export name to resolve. Non-ASCII characters are narrowed to bytes before lookup."],[e.jsx(n,{children:"ptr"}),e.jsx(n,{children:"nint"}),"A native memory address. May be zero only for methods that explicitly allow it."],[e.jsx(n,{children:"source"}),e.jsx(n,{children:"nint"}),"Source native address for Copy. Must be non-null when length is greater than zero."],[e.jsx(n,{children:"destination"}),e.jsx(n,{children:"nint"}),"Destination native address for Copy. Must be non-null when length is greater than zero."],[e.jsx(n,{children:"offset"}),e.jsx(n,{children:"int"}),"Byte offset from the base pointer. May be negative for Add."],[e.jsx(n,{children:"size"}),e.jsx(n,{children:"int"}),"Number of bytes to allocate or resize. Zero may return a non-null sentinel or null."],[e.jsx(n,{children:"length"}),e.jsx(n,{children:"int"}),"Number of bytes to copy, fill, read, or write. Must be non-negative."],[e.jsx(n,{children:"value"}),e.jsx(n,{children:"int"}),"Integer value to write. The low byte, 16 bits, 32 bits, or full 64 bits are stored as appropriate."],[e.jsx(n,{children:"function"}),e.jsx(n,{children:"nint"}),"Address of the C function to invoke. Must not be zero."],[e.jsx(n,{children:"a, b, c, d"}),e.jsx(n,{children:"any"}),"Arguments passed as raw 64-bit words. Integer and pointer values share the same inline layout and can be used interchangeably."]]}),`
`,e.jsx(l,{children:"Returns"}),`
`,e.jsx(r,{headers:["Member","Return Type","Description"],rows:[[e.jsx(n,{children:"Load(path)"}),e.jsx(n,{children:"nint"}),"An opaque library handle. Never returns zero on success."],[e.jsx(n,{children:"GetFunction(handle, name)"}),e.jsx(n,{children:"nint"}),"The exported function address, or zero if the export is absent."],[e.jsx(n,{children:"Free(handle)"}),e.jsx(n,{children:"void"}),"No value is returned."],[e.jsx(n,{children:"Alloc(size)"}),e.jsx(n,{children:"nint"}),"Address of the allocated block, or zero on allocation failure."],[e.jsx(n,{children:"Realloc(ptr, size)"}),e.jsx(n,{children:"nint"}),"Address of the resized block, which may differ from ptr."],[e.jsx(n,{children:"Free(ptr)"}),e.jsx(n,{children:"void"}),"No value is returned."],[e.jsx(n,{children:"Copy(...)"}),e.jsx(n,{children:"void"}),"No value is returned."],[e.jsx(n,{children:"Fill(...)"}),e.jsx(n,{children:"void"}),"No value is returned."],[e.jsx(n,{children:"ReadByte / ReadInt16 / ReadInt32 / ReadInt64"}),e.jsx(n,{children:"int"}),"The integer value read from memory."],[e.jsx(n,{children:"ReadIntPtr"}),e.jsx(n,{children:"nint"}),"The pointer-sized value read from memory."],[e.jsx(n,{children:"ReadFloat / ReadDouble"}),e.jsx(n,{children:"double"}),"The floating-point value read from memory."],[e.jsx(n,{children:"WriteByte / WriteInt16 / WriteInt32 / WriteInt64 / WriteIntPtr / WriteFloat / WriteDouble"}),e.jsx(n,{children:"void"}),"No value is returned."],[e.jsx(n,{children:"StringFromAnsi / StringFromUnicode"}),e.jsx(n,{children:"string"}),"A new managed string."],[e.jsx(n,{children:"StringToAnsi / StringToUnicode"}),e.jsx(n,{children:"nint"}),"A native buffer that the caller must later free."],[e.jsx(n,{children:"Add(ptr, offset)"}),e.jsx(n,{children:"nint"}),"The byte-offset pointer."],[e.jsx(n,{children:"IntPtrSize"}),e.jsx(n,{children:"int"}),"Size of a native pointer in bytes."],[e.jsx(n,{children:"Call / CallI64"}),e.jsx(n,{children:"int"}),"Integer return value from the C function."],[e.jsx(n,{children:"CallN"}),e.jsx(n,{children:"nint"}),"Pointer return value from the C function."],[e.jsx(n,{children:"CallVoid"}),e.jsx(n,{children:"void"}),"No value is returned."],[e.jsx(n,{children:"CallDouble"}),e.jsx(n,{children:"double"}),"Double return value from the C function."]]}),`
`,e.jsx(l,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(o,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Library load failure"})," —"," ",`
`,e.jsx(n,{children:"NativeLibrary.Load"}),` throws a runtime exception when the
operating system cannot load the library. The message includes the Windows error
code or the POSIX `,e.jsx(n,{children:"dlerror"})," text."]})}),e.jsx(o,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Null library handle"}),` — Passing zero
to `,e.jsx(n,{children:"NativeLibrary.GetFunction"})," throws a runtime exception."]})}),e.jsx(o,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Null function pointer"})," — Every"," ",`
`,e.jsx(n,{children:"NativeCall"}),` method throws a runtime exception when the
function address is zero.`]})}),e.jsx(o,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Null pointer access"}),` — Marshal read,
write, and string-conversion methods throw a runtime exception when the supplied
pointer is zero and the operation length is non-zero.`]})}),e.jsx(o,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Namespace import required"})," — The"," ",`
`,e.jsx(n,{children:"interop"})," namespace must be imported with"," ",`
`,e.jsx(n,{children:"using interop;"}),`. Without it the static classes are not
visible.`]})}),e.jsx(o,{children:e.jsxs(t.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Mismatched return family"}),` — Using the
wrong `,e.jsx(n,{children:"Call*"}),` overload for the C function signature produces
undefined behavior, including truncated pointer values or corrupted floating-point
results.`]})})]}),`
`,e.jsx(l,{children:"Remarks"}),`
`,e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Platform loaders."})," On Windows, ",e.jsx(n,{children:"NativeLibrary.Load"})," ",`
calls `,e.jsx(n,{children:"LoadLibraryW"}),` with the wide path you supply. On Linux it
calls `,e.jsx(n,{children:"dlopen"})," with ",e.jsx(n,{children:"RTLD_NOW | RTLD_LOCAL"})," ",`
after narrowing the path to a multibyte string. Library search order follows the
operating-system rules: the application directory, the PATH on Windows, and
LD_LIBRARY_PATH on Linux.`]})}),`
`,e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Symbol names."})," ",e.jsx(n,{children:"NativeLibrary.GetFunction"})," ",`
narrows the export name to ASCII bytes before calling`," ",`
`,e.jsx(n,{children:"GetProcAddress"})," or ",e.jsx(n,{children:"dlsym"}),`. Unicode
names outside the ASCII range may fail to resolve even when the export exists.`]})}),`
`,e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Memory ownership."})," Buffers returned by"," ",`
`,e.jsx(n,{children:"StringToAnsi"})," and ",e.jsx(n,{children:"StringToUnicode"}),` are
allocated with the C runtime allocator and must be released with`," ",`
`,e.jsx(n,{children:"Marshal.Free"}),`. Failing to free them leaks native memory. The
`,e.jsx(n,{children:"defer"}),` statement is the recommended way to pair allocation and
cleanup.`]})}),`
`,e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Typed reads and writes are unchecked."})," The"," ",`
`,e.jsx(n,{children:"Marshal.Read*"})," and ",e.jsx(n,{children:"Marshal.Write*"})," ",`
families perform a raw `,e.jsx(n,{children:"memcpy"}),` at the computed byte address.
They do not validate the allocation bounds, alignment, or type. Reading past the end
of an allocation produces undefined behavior.`]})}),`
`,e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"String encoding."})," ",e.jsx(n,{children:"StringToAnsi"})," and"," ",`
`,e.jsx(n,{children:"StringFromAnsi"}),` use the active ANSI code page on Windows
(`,e.jsx(n,{children:"CP_ACP"}),`) and the current locale multibyte encoding on Linux.
`,e.jsx(n,{children:"StringToUnicode"})," and"," ",`
`,e.jsx(n,{children:"StringFromUnicode"}),` use NUL-terminated UTF-16, matching the
Win32 `,e.jsx(n,{children:"LPCWSTR"})," layout."]})}),`
`,e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Calling convention and ABI."})," ",e.jsx(n,{children:"NativeCall"}),` relies
on the platform C ABI. The integer/pointer families pass every argument as a raw
64-bit word, which matches the integer and pointer register layout on common 64-bit
platforms. `,e.jsx(n,{children:"CallDouble"})," passes and returns"," ",`
`,e.jsx(n,{children:"double"}),` values through floating-point registers. There is no
support for selecting `,e.jsx(n,{children:"stdcall"}),", ",e.jsx(n,{children:"cdecl"}),`,
or other conventions, and no support for variadic functions.`]})}),`
`,e.jsx(i,{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"Pointer arithmetic."})," ",e.jsx(n,{children:"Marshal.Add"}),` interprets
the offset as bytes. Adding `,e.jsx(n,{children:"Marshal.IntPtrSize"}),` advances by one
pointer slot, and adding two advances by one UTF-16 code unit when iterating a Unicode
buffer.`]})}),`
`,e.jsx(c,{tone:"blue",children:e.jsxs(t.p,{children:["Always pair ",e.jsx(n,{children:"NativeLibrary.Load"})," with"," ",`
`,e.jsx(n,{children:"NativeLibrary.Free"}),` and pair every native string allocation
with `,e.jsx(n,{children:"Marshal.Free"}),". Use ",e.jsx(n,{children:"defer"}),` so
cleanup runs even when an exception is thrown.`]})}),`
`,e.jsx(c,{tone:"amber",title:"Not implemented",children:e.jsxs(t.p,{children:["The ",e.jsx(n,{children:"Marshal.Alloc(size)"}),` overload registered by the runtime
does not match its native callback, which expects two arguments. Do not rely on this
overload for native allocation. Allocate buffers through`," ",`
`,e.jsx(n,{children:"StringToAnsi"}),"/",e.jsx(n,{children:"StringToUnicode"}),` or host
bindings until a corrected overload is exposed. Struct, union, and array marshalling,
calling-convention selection, and variadic native calls are also not exposed.`]})}),`
`,e.jsx(l,{children:"Examples"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Loading a library and handling failure."})}),`
`,e.jsx(a,{code:`using stdio;
using interop;

namespace demo;

public static func Main() -> void
{
  try
  {
      lib: nint = NativeLibrary.Load("mylib.dll");
      defer NativeLibrary.Free(lib);

      println("library loaded successfully");
  }
  catch (ex: RuntimeException)
  {
      println("failed to load library: " + ex.Message);
  }
}`,language:"csharp",filename:"interop_load.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Resolving an export and guarding against a missing symbol."})}),`
`,e.jsx(a,{code:`using stdio;
using interop;

namespace demo;

public static func Main() -> void
{
  lib: nint = NativeLibrary.Load("user32.dll");
  defer NativeLibrary.Free(lib);

  messageBoxW: nint = NativeLibrary.GetFunction(lib, "MessageBoxW");
  if (messageBoxW == 0 as nint)
  {
      println("export not found");
      return;
  }

  println("resolved MessageBoxW at " + messageBoxW);
}`,language:"csharp",filename:"interop_resolve.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Calling MessageBoxW on Windows with UTF-16 string marshalling."})}),`
`,e.jsx(a,{code:`using stdio;
using interop;

namespace demo;

public static func Main() -> void
{
  user32: nint = NativeLibrary.Load("user32.dll");
  defer NativeLibrary.Free(user32);

  messageBoxW: nint = NativeLibrary.GetFunction(user32, "MessageBoxW");
  if (messageBoxW == 0 as nint)
  {
      println("MessageBoxW not found");
      return;
  }

  text: nint = Marshal.StringToUnicode("Hello from ShardScript!");
  defer Marshal.Free(text);

  caption: nint = Marshal.StringToUnicode("Native Interop");
  defer Marshal.Free(caption);

  // hWnd = 0, uType = 0 (MB_OK)
  result: int = NativeCall.Call(messageBoxW, 0, text, caption, 0);
  println("dialog result: " + result);
}`,language:"csharp",filename:"interop_messagebox.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Reading and writing typed values in a native ANSI buffer."})}),`
`,e.jsx(a,{code:`using stdio;
using interop;

namespace demo;

public static func Main() -> void
{
  ansi: nint = Marshal.StringToAnsi("hello");
  defer Marshal.Free(ansi);

  first: int = Marshal.ReadByte(ansi, 0);
  println("first byte: " + first);

  // Overwrite the first byte with an uppercase 'H' (ASCII 72).
  Marshal.WriteByte(ansi, 0, 72);

  back: string = Marshal.StringFromAnsi(ansi);
  println("modified string: " + back);
}`,language:"csharp",filename:"interop_typed_io.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Pointer arithmetic over a UTF-16 buffer."})}),`
`,e.jsx(a,{code:`using stdio;
using interop;

namespace demo;

public static func Main() -> void
{
  text: nint = Marshal.StringToUnicode("AB");
  defer Marshal.Free(text);

  a: int = Marshal.ReadInt16(text, 0);
  println("first code unit: " + a);

  // Advance by one UTF-16 code unit (2 bytes).
  next: nint = Marshal.Add(text, 2);
  b: int = Marshal.ReadInt16(next, 0);
  println("second code unit: " + b);

  println("pointer size on this platform: " + Marshal.IntPtrSize);
}`,language:"csharp",filename:"interop_pointer_math.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Invoking a native function that returns double."})}),`
`,e.jsx(a,{code:`using stdio;
using interop;

namespace demo;

public static func Main() -> void
{
  // This example assumes mylib.dll exports:
  //     double AddDoubles(double a, double b);
  lib: nint = NativeLibrary.Load("mylib.dll");
  defer NativeLibrary.Free(lib);

  addDoubles: nint = NativeLibrary.GetFunction(lib, "AddDoubles");
  if (addDoubles == 0 as nint)
  {
      println("AddDoubles not found");
      return;
  }

  sum: double = NativeCall.CallDouble(addDoubles, 1.5, 2.5);
  println("sum: " + sum);
}`,language:"csharp",filename:"interop_double.shard"}),`
`,e.jsx(i,{children:e.jsx("strong",{children:"Common mistake: using the wrong NativeCall return family."})}),`
`,e.jsx(a,{code:`using stdio;
using interop;

namespace demo;

public static func Main() -> void
{
  lib: nint = NativeLibrary.Load("mylib.dll");
  defer NativeLibrary.Free(lib);

  getHandle: nint = NativeLibrary.GetFunction(lib, "GetHandle");
  if (getHandle == 0 as nint)
  {
      println("GetHandle not found");
      return;
  }

  // WRONG: Call reads only a 32-bit return value and sign-extends it.
  // On a 64-bit platform this truncates a pointer.
  // truncated: int = NativeCall.Call(getHandle);

  // CORRECT: the C function returns a pointer, so use CallN.
  handle: nint = NativeCall.CallN(getHandle);
  println("handle: " + handle);
}`,language:"csharp",filename:"interop_wrong_family.shard"})]})}function u(s={}){const{wrapper:t}=s.components||{};return t?e.jsx(t,{...s,children:e.jsx(h,{...s})}):h(s)}function d(s,t){throw new Error("Expected component `"+s+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};
