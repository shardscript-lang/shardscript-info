import { useEffect } from 'react'
import ParticleNetwork from '../components/ParticleNetwork'
import ScrollReveal from '../components/ScrollReveal'

const pillars = [
  {
    number: '01',
    title: 'C-Style, Refined',
    description:
      'ShardScript takes the best of C-style languages — a familiar syntax of curly braces, arrow types, and semicolons — and enriches it with modern features: type inference, lambdas, defer, extension methods, and async/await. It compiles to bytecode for a virtual machine.',
  },
  {
    number: '02',
    title: 'Embed with Confidence',
    description:
      'Built for embedding from the ground up. A lightweight runtime, a simple C API for the host application, a controlled GC, and sandboxing. Embed a scripting engine into a game, editor, server, or IoT device — ShardScript adapts.',
  },
  {
    number: '03',
    title: 'Statically Typed',
    description:
      'Strict static typing with automatic inference via :=. class is a reference type, struct is a value type, and string is a reference type. Type errors are caught at compile time, before anything runs on the VM.',
  },
]

const timelineItems = [
  {
    date: '2023 Q1',
    title: 'Project Inception',
    description: 'First version of the compiler and parser. C-style syntax, primitive types, and the bytecode VM.',
    category: 'past',
  },
  {
    date: '2023 Q3',
    title: 'Type System',
    description: 'class, struct, interfaces, generics, and type inference via :=. Strict static typing.',
    category: 'past',
  },
  {
    date: '2024 Q1',
    title: 'Functional Features',
    description: 'Lambdas, delegates, closures, extension methods, and ranges with .. and ..&.',
    category: 'past',
  },
  {
    date: '2024 Q2',
    title: 'Embed API',
    description: 'The extern "C" API — an execution sandbox, symbol injection, and host callbacks.',
    category: 'past',
  },
  {
    date: '2026 Q4',
    title: 'IPrintable & Operator Overloading',
    description: 'The IPrintable contract for string conversion, plus operator overloads for custom types.',
    category: 'past',
  },
  {
    date: '2024 Q4',
    title: 'Basic Framework Collection',
    description: 'Sharding — the modular DLL system: stdio, collections, math, networking, and more.',
    category: 'past',
  },
  {
    date: '2026 Q2',
    title: 'Open Source',
    description: 'Public release of ShardScript.',
    category: 'past',
  },
  {
    date: '2026 Q1',
    title: 'Exceptions & Enums',
    description: 'Exception machinery — throw, try/catch over the IThrowable contract. Plain enums and flag enums with HasFlag().',
    category: 'past',
  },
  {
    date: '2026 Q2',
    title: 'foreach, IEnumerable',
    description: 'Iteration over IEnumerable<T>/IEnumerator<T>.',
    category: 'past',
  },
  {
    date: '2026 Q3',
    title: 'Async',
    description: 'async/await with compiler-generated state machines.',
    category: 'past',
  },
  {
    date: '2026 Q4',
    title: 'Yield Iterators',
    description: 'Lazy sequences through yield return, yield break, and yield range — generators without upfront allocation.',
    category: 'upcoming',
  },
  {
    date: '2027 Q1',
    title: 'LINQ & Build System',
    description: 'A shard.linq module — Where, Select, OrderBy, GroupBy — and a script-driven build system via build.shard.',
    category: 'upcoming',
  },
  {
    date: '2027 Q2',
    title: 'Package Manager',
    description: 'A NuGet-style tool to manage dependencies, shards, and versions, built on the SemVer resolver.',
    category: 'upcoming',
  },
  {
    date: '2027 Q3',
    title: 'Shell & REPL',
    description: 'Interactive mode with persistent state and a shard.shell module — process spawning and piping, a Bash/PowerShell alternative.',
    category: 'upcoming',
  },
]

export default function About() {
  useEffect(() => {
    document.title = 'About — ShardScript'
  }, [])

  return (
    <div className="bg-shard-dark">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <ParticleNetwork />

        <div className="relative z-10 text-center px-6 max-w-[680px] mx-auto">
          <ScrollReveal>
            <p className="text-xs font-medium tracking-[0.05em] uppercase text-gold mb-6">
              ABOUT THE LANGUAGE
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="font-space text-4xl md:text-5xl lg:text-[56px] font-bold text-text-primary leading-[1.1] tracking-tight">
              Compiled. Embeddable. C-Style.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mt-6 text-base text-text-secondary leading-relaxed">
              ShardScript is a statically typed programming language that combines a familiar C-style
              syntax with the power of functional and object-oriented programming. It compiles to bytecode
              for a virtual machine and embeds through a clean extern &quot;C&quot; API — with a sandbox,
              symbol injection, and callbacks.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 md:py-[120px] px-6">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <p className="text-xs font-medium tracking-[0.05em] uppercase text-gold mb-4">
              PHILOSOPHY
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-space text-3xl md:text-[40px] font-bold text-text-primary leading-[1.2] tracking-tight mb-12">
              Three Pillars
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, i) => (
              <ScrollReveal key={pillar.number} delay={0.1 * (i + 1)}>
                <div className="bg-shard-card border border-[#4A2020] rounded-card p-8 md:p-10 shadow-card h-full border-l-4 border-l-burgundy">
                  <span className="font-space text-5xl md:text-6xl font-bold text-burgundy opacity-30 block mb-4">
                    {pillar.number}
                  </span>
                  <h3 className="font-space text-xl md:text-2xl font-semibold text-text-primary leading-[1.3] mb-4">
                    {pillar.title}
                  </h3>
                  <p className="text-base text-text-secondary leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes ShardScript Different */}
      <section className="py-20 md:py-[120px] px-6 bg-shard-card">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <p className="text-xs font-medium tracking-[0.05em] uppercase text-gold mb-4">
              HIGHLIGHTS
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-space text-3xl md:text-[40px] font-bold text-text-primary leading-[1.2] tracking-tight mb-12">
              What Sets ShardScript Apart
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Bytecode Compilation',
                desc: 'Source compiles to bytecode for a virtual machine — no JIT, no on-the-fly interpretation. Portability, controlled execution, and no lazy binding.',
              },
              {
                title: 'Embeddable Engine',
                desc: 'A C++ core with a clean extern "C" API and bindings for C, C#, and Rust. The host builds a sandbox with its own namespaces, classes, structs, and functions through symbol injection and callbacks.',
              },
              {
                title: 'Refined C-Style',
                desc: 'Curly braces, semicolons, and arrow types — everything C/C++/C#/Java developers already know. Plus type inference, lambdas, defer, extension methods, and async/await.',
              },
              {
                title: 'Functional + OOP',
                desc: 'Classes (reference type) and structs (value type), interfaces, generics, delegates, lambdas, closures, and extension methods — all working together.',
              },
              {
                title: 'Sharding Over a Standard Library',
                desc: 'The Basic Framework Collection — a set of DLL shards (stdio, collections, math, networking, …). The host controls which shards a script may use, loaded via auto-discovery, the -l flag, or the API.',
              },
              {
                title: 'defer for Resources',
                desc: 'Like Go, but C-style. Defer resource cleanup until scope exit. LIFO execution guarantees the right order, and it cooperates with IDisposable.',
              },
              {
                title: 'Namespaces as Modules',
                desc: 'Every file (compilation unit) declares a namespace. All symbols are private by default — public exports them beyond the file. Import with using.',
              },
              {
                title: 'Extension Methods',
                desc: 'Any static method can extend any type — just take the type as its first argument. a.Add(b) instead of Add(a, b).',
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={0.1 * (i + 1)}>
                <div className="bg-shard-dark border border-[#4A2020] rounded-card p-8 shadow-card h-full">
                  <h4 className="font-space text-lg font-semibold text-text-primary mb-3">
                    {item.title}
                  </h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 md:py-[120px] px-6">
        <div className="max-w-[800px] mx-auto">
          <ScrollReveal>
            <p className="text-xs font-medium tracking-[0.05em] uppercase text-gold mb-4">
              PAST & FUTURE
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-space text-3xl md:text-[40px] font-bold text-text-primary leading-[1.2] tracking-tight mb-16">
              Roadmap
            </h2>
          </ScrollReveal>

          <div className="relative">
            <div
              className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
              style={{
                background:
                  'linear-gradient(to bottom, #5B8C3E 0%, #9B2D30 50%, #D4A017 100%)',
              }}
            />

            {timelineItems.map((item, i) => (
              <ScrollReveal key={`${item.date}-${item.title}`} delay={0.05 * i}>
                <div
                  className={`relative flex items-start mb-10 last:mb-0 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div
                    className={`absolute left-4 md:left-1/2 w-4 h-4 rounded-full border-[3px] -translate-x-1/2 z-10 mt-1.5 ${
                      item.category === 'past'
                        ? 'bg-shard-dark border-burgundy'
                        : 'bg-shard-dark border-gold'
                    }`}
                  />

                  <div
                    className={`pl-12 md:pl-0 md:w-[calc(50%-40px)] ${
                      i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                    }`}
                  >
                    <span
                      className={`text-xs font-medium tracking-[0.05em] uppercase ${
                        item.category === 'past' ? 'text-burgundy-light' : 'text-gold'
                      }`}
                    >
                      {item.date}
                    </span>
                    <h4 className="font-space text-lg font-semibold text-text-primary mt-1 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="hidden md:block md:w-[calc(50%-40px)]" />
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Legend */}
          <ScrollReveal delay={0.3}>
            <div className="mt-12 flex items-center justify-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full border-[2px] border-burgundy" />
                <span className="text-xs text-text-muted">Shipped</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full border-[2px] border-gold" />
                <span className="text-xs text-text-muted">Planned</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
