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
      'Built for embedding from the ground up. A lightweight runtime, a simple extern "C" API, and C++ native-authoring headers ship today. SDKs for C#, Rust, Node.js, C++, and Go are in development. Hosts control shard loading, symbol injection, and callbacks.',
  },
  {
    number: '03',
    title: 'Statically Typed',
    description:
      'Strict static typing with automatic inference via :=. class is a reference type, struct is a value type, and string is a reference type. Type errors are caught at compile time, before anything runs on the VM.',
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
              syntax with functional and object-oriented programming. It compiles to bytecode for a
              virtual machine and is designed to embed into host applications.
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
                desc: 'Source compiles to portable bytecode executed by a stack-based virtual machine. Controlled execution without a JIT.',
              },
              {
                title: 'Embeddable Engine',
                desc: 'A C++ core with a clean extern "C" API and C++ native-authoring headers today. SDKs for C#, Rust, Node.js, C++, and Go are in development. The host controls namespaces, classes, structs, and functions through symbol injection and callbacks.',
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

    </div>
  )
}
