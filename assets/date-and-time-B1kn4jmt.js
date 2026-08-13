import{j as e}from"./index-BQw6jbtc.js";function l(a){const s={p:"p",...a.components},{Bullet:o,CodeBlock:c,DocsTable:t,H2:i,InlineCode:n,Prose:r}=s;return o||d("Bullet"),c||d("CodeBlock"),t||d("DocsTable"),i||d("H2"),n||d("InlineCode"),r||d("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(i,{children:"Summary"}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:["The ",e.jsx(n,{children:"shard.time"})," library provides two value types in the ",e.jsx(n,{children:"time"})," ",`
namespace: `,e.jsx(n,{children:"TimeSpan"})," for representing a duration, and"," ",`
`,e.jsx(n,{children:"DateTime"}),` for representing an instant in time. Both are implemented as native structs,
store their data as 64-bit tick counts, and expose factory methods, properties, arithmetic operators, and
formatting helpers.`]})}),`
`,e.jsx(i,{children:"Syntax"}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:["Reference the ",e.jsx(n,{children:"time"})," namespace with a ",e.jsx(n,{children:"using"}),` directive. The
library is loaded automatically when a `,e.jsx(n,{children:"using time;"}),` directive is present, or it can
be passed to the interpreter with the `,e.jsx(n,{children:"-l"})," flag when running standalone scripts."]})}),`
`,e.jsx(c,{code:`using stdio;
using time;

namespace demo;

public static func Main() -> void
{
  span: TimeSpan = TimeSpan.FromSeconds(90.0);
  println(span.TotalMinutes);

  now: DateTime = DateTime.Now;
  println(now.ToString("yyyy-MM-dd HH:mm:ss"));
}`,language:"csharp",filename:"time_intro.shard"}),`
`,e.jsx(i,{children:"Parameters / Arguments"}),`
`,e.jsx(i,{children:"Enum DateTimeKind"}),`
`,e.jsx(t,{headers:["Value","Numeric value","Meaning"],rows:[[e.jsx(n,{children:"DateTimeKind.Utc"}),"0","The DateTime expresses a UTC instant."],[e.jsx(n,{children:"DateTimeKind.Local"}),"1","The DateTime expresses a local-time instant."],[e.jsx(n,{children:"DateTimeKind.Unspecified"}),"2","The DateTime expresses an unspecified kind."]]}),`
`,e.jsx(i,{children:"Struct TimeSpan"}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx(n,{children:"TimeSpan"}),` stores a signed number of 100-nanosecond ticks. Positive and negative
durations are supported.`]})}),`
`,e.jsx(i,{children:"TimeSpan static factory methods"}),`
`,e.jsx(t,{headers:["Method","Parameter","Returns","Description"],rows:[[e.jsx(n,{children:"FromTicks(ticks)"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"ticks"}),": int"]}),"TimeSpan","Creates a TimeSpan from a raw tick count."],[e.jsx(n,{children:"FromMilliseconds(value)"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"value"}),": double"]}),"TimeSpan","Creates a TimeSpan from a number of milliseconds."],[e.jsx(n,{children:"FromSeconds(value)"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"value"}),": double"]}),"TimeSpan","Creates a TimeSpan from a number of seconds."],[e.jsx(n,{children:"FromMinutes(value)"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"value"}),": double"]}),"TimeSpan","Creates a TimeSpan from a number of minutes."],[e.jsx(n,{children:"FromHours(value)"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"value"}),": double"]}),"TimeSpan","Creates a TimeSpan from a number of hours."],[e.jsx(n,{children:"FromDays(value)"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"value"}),": double"]}),"TimeSpan","Creates a TimeSpan from a number of days."]]}),`
`,e.jsx(i,{children:"TimeSpan properties"}),`
`,e.jsx(t,{headers:["Property","Type","Description"],rows:[[e.jsx(n,{children:"Ticks"}),"int","The complete signed tick count."],[e.jsx(n,{children:"TotalMilliseconds"}),"double","Duration expressed in milliseconds, including fractional part."],[e.jsx(n,{children:"TotalSeconds"}),"double","Duration expressed in seconds, including fractional part."],[e.jsx(n,{children:"TotalMinutes"}),"double","Duration expressed in minutes, including fractional part."],[e.jsx(n,{children:"TotalHours"}),"double","Duration expressed in hours, including fractional part."],[e.jsx(n,{children:"TotalDays"}),"double","Duration expressed in days, including fractional part."],[e.jsx(n,{children:"Days"}),"int","Whole days component of the duration, including the sign."],[e.jsx(n,{children:"Hours"}),"int","Whole hours component. For negative durations the remainder can be negative."],[e.jsx(n,{children:"Minutes"}),"int","Whole minutes component. For negative durations the remainder can be negative."],[e.jsx(n,{children:"Seconds"}),"int","Whole seconds component. For negative durations the remainder can be negative."],[e.jsx(n,{children:"Milliseconds"}),"int","Whole milliseconds component. For negative durations the remainder can be negative."]]}),`
`,e.jsx(i,{children:"TimeSpan methods"}),`
`,e.jsx(t,{headers:["Method","Parameters","Returns","Description"],rows:[[e.jsx(n,{children:"Add(other)"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"other"}),": TimeSpan"]}),"TimeSpan","Returns the sum of this span and another span."],[e.jsx(n,{children:"Subtract(other)"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"other"}),": TimeSpan"]}),"TimeSpan","Returns the difference between this span and another span."],[e.jsx(n,{children:"Negate()"}),"none","TimeSpan","Returns a new TimeSpan with the opposite sign."],[e.jsx(n,{children:"Duration()"}),"none","TimeSpan","Returns the absolute value of this span."],[e.jsx(n,{children:"ToString()"}),"none","string",'Returns a culture-invariant string such as "1.02:03:04.005" or "02:03:04".']]}),`
`,e.jsx(i,{children:"TimeSpan operators"}),`
`,e.jsx(t,{headers:["Operator","Signature","Description"],rows:[[e.jsx(n,{children:"a + b"}),"TimeSpan + TimeSpan","Adds two spans."],[e.jsx(n,{children:"a - b"}),"TimeSpan - TimeSpan","Subtracts two spans."],[e.jsx(n,{children:"a * factor"}),"TimeSpan * double","Multiplies the span by a scalar."],[e.jsx(n,{children:"factor * a"}),"double * TimeSpan","Multiplies the span by a scalar."],[e.jsx(n,{children:"a / divisor"}),"TimeSpan / double","Divides the span by a scalar."],[e.jsx(n,{children:"a / b"}),"TimeSpan / TimeSpan","Returns the ratio of two spans as a double."],[e.jsx(n,{children:"-a"}),"-TimeSpan","Negates the span."],[e.jsx(n,{children:"a == b"}),"TimeSpan == TimeSpan","Returns true if the spans have the same tick count."],[e.jsx(n,{children:"a != b"}),"TimeSpan != TimeSpan","Returns true if the spans differ in tick count."],[e.jsx(n,{children:"a < b"}),"TimeSpan &lt; TimeSpan","Tick-count less-than comparison."],[e.jsx(n,{children:"a > b"}),"TimeSpan &gt; TimeSpan","Tick-count greater-than comparison."],[e.jsx(n,{children:"a <= b"}),"TimeSpan &lt;= TimeSpan","Tick-count less-than-or-equal comparison."],[e.jsx(n,{children:"a >= b"}),"TimeSpan &gt;= TimeSpan","Tick-count greater-than-or-equal comparison."]]}),`
`,e.jsx(i,{children:"Struct DateTime"}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx(n,{children:"DateTime"})," stores an instant as a 64-bit tick count together with a"," ",`
`,e.jsx(n,{children:"DateTimeKind"}),`. One tick is 100 nanoseconds. The epoch for Unix conversions is
1970-01-01 00:00:00 UTC.`]})}),`
`,e.jsx(i,{children:"DateTime static factory members"}),`
`,e.jsx(t,{headers:["Member","Parameters","Returns","Description"],rows:[[e.jsx(n,{children:"Now"}),"none","DateTime","Static property that returns the current local time."],[e.jsx(n,{children:"UtcNow"}),"none","DateTime","Static property that returns the current UTC time."],[e.jsx(n,{children:"FromUnixTimeSeconds(seconds)"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"seconds"}),": int"]}),"DateTime","Creates a UTC DateTime from a Unix seconds timestamp."],[e.jsx(n,{children:"FromUnixTimeMilliseconds(milliseconds)"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"milliseconds"}),": int"]}),"DateTime","Creates a UTC DateTime from a Unix milliseconds timestamp."]]}),`
`,e.jsx(i,{children:"DateTime properties"}),`
`,e.jsx(t,{headers:["Property","Type","Description"],rows:[[e.jsx(n,{children:"Ticks"}),"int","The complete tick count."],[e.jsx(n,{children:"UnixTimestamp"}),"int","The number of whole seconds since the Unix epoch."],[e.jsx(n,{children:"UnixTimestampMilliseconds"}),"int","The number of whole milliseconds since the Unix epoch."],[e.jsx(n,{children:"Kind"}),"DateTimeKind","The kind of the DateTime: Utc, Local, or Unspecified."],[e.jsx(n,{children:"Year"}),"int","The calendar year component."],[e.jsx(n,{children:"Month"}),"int","The month component, 1-12."],[e.jsx(n,{children:"Day"}),"int","The day-of-month component, 1-31."],[e.jsx(n,{children:"DayOfWeek"}),"int","The day of week, 0-6, where 0 is Sunday."],[e.jsx(n,{children:"Hour"}),"int","The hour component, 0-23."],[e.jsx(n,{children:"Minute"}),"int","The minute component, 0-59."],[e.jsx(n,{children:"Second"}),"int","The second component, 0-59."],[e.jsx(n,{children:"Millisecond"}),"int","The millisecond component, 0-999."],[e.jsx(n,{children:"Date"}),"DateTime","A new DateTime set to midnight of the same calendar day."]]}),`
`,e.jsx(i,{children:"DateTime methods"}),`
`,e.jsx(t,{headers:["Method","Parameters","Returns","Description"],rows:[[e.jsx(n,{children:"Add(span)"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"span"}),": TimeSpan"]}),"DateTime","Returns a new DateTime offset by the supplied span."],[e.jsx(n,{children:"AddMilliseconds(value)"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"value"}),": double"]}),"DateTime","Returns a new DateTime offset by a number of milliseconds."],[e.jsx(n,{children:"AddSeconds(value)"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"value"}),": double"]}),"DateTime","Returns a new DateTime offset by a number of seconds."],[e.jsx(n,{children:"AddMinutes(value)"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"value"}),": double"]}),"DateTime","Returns a new DateTime offset by a number of minutes."],[e.jsx(n,{children:"AddHours(value)"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"value"}),": double"]}),"DateTime","Returns a new DateTime offset by a number of hours."],[e.jsx(n,{children:"AddDays(value)"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"value"}),": double"]}),"DateTime","Returns a new DateTime offset by a number of days."],[e.jsx(n,{children:"ToUniversalTime()"}),"none","DateTime","Converts this DateTime to UTC, preserving the instant."],[e.jsx(n,{children:"ToLocalTime()"}),"none","DateTime","Converts this DateTime to local time, preserving the instant."],[e.jsx(n,{children:"ToString()"}),"none","string",'Returns a culture-invariant "yyyy-MM-dd HH:mm:ss" string.'],[e.jsx(n,{children:"ToString(format)"}),e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"format"}),": string"]}),"string","Returns a string formatted with custom tokens."]]}),`
`,e.jsx(i,{children:"DateTime operators"}),`
`,e.jsx(t,{headers:["Operator","Signature","Description"],rows:[[e.jsx(n,{children:"dt + span"}),"DateTime + TimeSpan","Returns a DateTime advanced by the span."],[e.jsx(n,{children:"dt - span"}),"DateTime - TimeSpan","Returns a DateTime moved back by the span."],[e.jsx(n,{children:"a - b"}),"DateTime - DateTime","Returns the TimeSpan between two DateTime values."],[e.jsx(n,{children:"a == b"}),"DateTime == DateTime","Returns true if the tick counts are equal."],[e.jsx(n,{children:"a != b"}),"DateTime != DateTime","Returns true if the tick counts differ."],[e.jsx(n,{children:"a < b"}),"DateTime &lt; DateTime","Tick-count less-than comparison."],[e.jsx(n,{children:"a > b"}),"DateTime &gt; DateTime","Tick-count greater-than comparison."],[e.jsx(n,{children:"a <= b"}),"DateTime &lt;= DateTime","Tick-count less-than-or-equal comparison."],[e.jsx(n,{children:"a >= b"}),"DateTime &gt;= DateTime","Tick-count greater-than-or-equal comparison."]]}),`
`,e.jsx(i,{children:"Returns"}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:["Factory methods and operators return new ",e.jsx(n,{children:"TimeSpan"})," or"," ",`
`,e.jsx(n,{children:"DateTime"}),` value-type instances. Properties return the corresponding primitive or
enum value. Methods that perform arithmetic return a new instance and do not mutate the receiver.`]})}),`
`,e.jsx(i,{children:"Exceptions / Errors"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(o,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Division by zero."})," Dividing a"," ",`
`,e.jsx(n,{children:"TimeSpan"})," by ",e.jsx(n,{children:"0.0"}),` or dividing two spans where the divisor
is zero throws a runtime exception.`]})}),e.jsx(o,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Invalid Unix timestamp."}),` Very large positive or negative
Unix timestamps can produce a `,e.jsx(n,{children:"DateTime"}),` outside the range supported by the
platform `,e.jsx(n,{children:"time_t"})," conversion."]})}),e.jsx(o,{children:e.jsxs(s.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Local-time ambiguity."})," ",`
`,e.jsx(n,{children:"ToLocalTime"})," and ",e.jsx(n,{children:"ToUniversalTime"}),` rely on the host
platform's local-time zone database. On hosts without valid zone data, the conversion may return the
original ticks unchanged.`]})})]}),`
`,e.jsx(i,{children:"Remarks"}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:[e.jsx(n,{children:"TimeSpan"})," and ",e.jsx(n,{children:"DateTime"}),` are registered as native structs, not
classes, so they are value types inside ShardScript. Assignment and parameter passing copy the underlying
tick fields rather than sharing a reference. Both types are immutable: every mutating-looking operation such
as `,e.jsx(n,{children:"Add"})," or ",e.jsx(n,{children:"Negate"})," returns a new instance."]})}),`
`,e.jsx(r,{children:e.jsx(s.p,{children:`The internal representation uses the same tick scale as .NET: 1 tick = 100 nanoseconds, 10 000 ticks = 1
millisecond, and 10 000 000 ticks = 1 second. This makes conversions to and from Unix timestamps
straightforward and avoids floating-point drift for whole-second values.`})}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:["The custom format string for ",e.jsx(n,{children:"DateTime.ToString(format)"}),` supports the following
tokens. All other characters are copied to the output literally.`]})}),`
`,e.jsx(t,{headers:["Token","Output"],rows:[[e.jsx(n,{children:"yyyy"}),"Four-digit year."],[e.jsx(n,{children:"MM"}),"Two-digit month, 01-12."],[e.jsx(n,{children:"dd"}),"Two-digit day, 01-31."],[e.jsx(n,{children:"HH"}),"Two-digit 24-hour, 00-23."],[e.jsx(n,{children:"mm"}),"Two-digit minute, 00-59."],[e.jsx(n,{children:"ss"}),"Two-digit second, 00-59."],[e.jsx(n,{children:"fff"}),"Three-digit millisecond, 000-999."]]}),`
`,e.jsx(i,{children:"Examples"}),`
`,e.jsx(r,{children:e.jsx(s.p,{children:"Create durations, perform arithmetic, and format the current local time."})}),`
`,e.jsx(c,{code:`using stdio;
using time;

namespace demo;

public static func Main() -> void
{
  span: TimeSpan = TimeSpan.FromSeconds(90.0);
  println("TotalSeconds = " + span.TotalSeconds);
  println("Minutes = " + span.Minutes);
  println("Seconds = " + span.Seconds);

  a: TimeSpan = TimeSpan.FromMinutes(10.0);
  b: TimeSpan = TimeSpan.FromMinutes(5.0);
  println("10min + 5min = " + (a + b).TotalMinutes + " min");

  scaled: TimeSpan = a * 2.0;
  println("10min * 2 = " + scaled.TotalMinutes + " min");

  now: DateTime = DateTime.Now;
  println("Now: " + now.ToString("yyyy-MM-dd HH:mm:ss"));

  tomorrow: DateTime = now + TimeSpan.FromDays(1.0);
  println("Tomorrow day: " + tomorrow.Day);

  utc: DateTime = now.ToUniversalTime();
  println("UTC year: " + utc.Year);
}`,language:"csharp",filename:"time_demo.shard"}),`
`,e.jsx(i,{children:"Category Summary"}),`
`,e.jsx(t,{headers:["Feature","Members"],rows:[["TimeSpan factories","FromTicks, FromMilliseconds, FromSeconds, FromMinutes, FromHours, FromDays"],["TimeSpan properties","Ticks, TotalMilliseconds, TotalSeconds, TotalMinutes, TotalHours, TotalDays, Days, Hours, Minutes, Seconds, Milliseconds"],["TimeSpan methods","Add, Subtract, Negate, Duration, ToString"],["TimeSpan operators","+, -, *, /, unary -, ==, !=, <, >, <=, >="],["DateTime factories","Now, UtcNow, FromUnixTimeSeconds, FromUnixTimeMilliseconds"],["DateTime properties","Ticks, UnixTimestamp, UnixTimestampMilliseconds, Kind, Year, Month, Day, DayOfWeek, Hour, Minute, Second, Millisecond, Date"],["DateTime methods","Add, AddMilliseconds, AddSeconds, AddMinutes, AddHours, AddDays, ToUniversalTime, ToLocalTime, ToString"],["DateTime operators","+ TimeSpan, - TimeSpan, - DateTime, ==, !=, <, >, <=, >="],["Enum","DateTimeKind"]]}),`
`,e.jsx(i,{children:"See also"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(o,{children:e.jsxs(s.p,{children:[e.jsx(n,{children:"library-building/struct-symbol-builder"})," — how native structs such as"," ",`
`,e.jsx(n,{children:"TimeSpan"})," and ",e.jsx(n,{children:"DateTime"})," are registered."]})}),e.jsx(o,{children:e.jsxs(s.p,{children:[e.jsx(n,{children:"library-building/enum-symbol-builder"})," — how the"," ",`
`,e.jsx(n,{children:"DateTimeKind"})," enum is registered."]})}),e.jsx(o,{children:e.jsxs(s.p,{children:[e.jsx(n,{children:"library-building/operator-symbol-builder"}),` — how operator overloads are bound to
native callbacks.`]})})]}),`
`,e.jsx(i,{children:"Source"}),`
`,e.jsx(r,{children:e.jsxs(s.p,{children:["The native implementation of ",e.jsx(n,{children:"shard.time"})," is in"," ",`
`,e.jsx(n,{children:"ShardScript.Framework/system/time.shard.cpp"}),". View the source on GitHub:"," ",`
`,e.jsx(n,{children:"https://github.com/Rikitav/ShardScript/blob/main/ShardScript.Framework/system/time.shard.cpp"}),"."]})})]})}function h(a={}){const{wrapper:s}=a.components||{};return s?e.jsx(s,{...a,children:e.jsx(l,{...a})}):l(a)}function d(a,s){throw new Error("Expected component `"+a+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};
