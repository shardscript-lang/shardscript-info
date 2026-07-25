import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Code2, Puzzle, Zap, Shield } from 'lucide-react'
import ShardField from '../components/ShardField'
import CodeBlock from '../components/CodeBlock'
import ScrollReveal from '../components/ScrollReveal'

const codeExample = `using stdio;
using collections;

namespace hello_world;

public static func Main() -> void
{
    // Type inference
    items := new List<string>();
    items.Add("Shard");
    items.Add("Script");

    // Iteration over IEnumerable<T>
    foreach (item in items)
    {
        println("Processing: " + item);
    }

    // Ranges with defer
    for (i in 0..3)
    {
        defer println("Completed: " + i);
        println("Step: " + i);
    }
}`

const features = [
  {
    icon: Code2,
    title: 'Refined C-Style',
    description:
      'A familiar C-style syntax with modern refinements — type inference, lambdas, delegates, and an expressive type system. Source compiles to bytecode and runs on a virtual machine.',
  },
  {
    icon: Puzzle,
    title: 'Embeddable by Design',
    description:
      'Use ShardScript as a scripting engine inside your own application. A clean extern "C" API and C++ native-authoring headers ship today; SDKs for C#, Rust, Node.js, C++, and Go are in development. Symbol injection and host callbacks are supported.',
  },
  {
    icon: Zap,
    title: 'Functional + OOP',
    description:
      'Classes and structs, interfaces, generics, delegates, lambdas, and extension methods for expressive code. defer for resources, properties for data, namespaces as modules.',
  },
  {
    icon: Shield,
    title: 'Statically Typed',
    description:
      'Strict static typing with inference via :=. Type errors are caught at compile time. class is a reference type, struct is a value type, and string is a reference type.',
  },
]

const upcomingFeatures = [
  {
    title: 'Yield Iterators',
    desc: 'Lazy sequences through yield return, yield break, and yield range — generators backed by compiler-generated state machines.',
  },
  {
    title: 'switch Expression',
    desc: 'Expression-form switch with constant-pattern arms — the parser skeleton is in place and the feature is in active development.',
  },
  {
    title: 'LINQ-style Queries',
    desc: 'A shard.linq module — Where, Select, OrderBy, GroupBy, ToList — built on extension methods and IEnumerable<T>.',
  },
  {
    title: 'Package Manager (Geode)',
    desc: 'A NuGet-style tool to manage shards, dependencies, and versions — built on the engine’s existing SemVer resolver. Currently in development.',
  },
  {
    title: 'Scripting SDKs',
    desc: 'Host SDKs for C#, Rust, Node.js, C++, and Go so ShardScript can be dropped into applications written in those languages.',
  },
  {
    title: 'Attribute Enforcement',
    desc: 'Attributes ([deprecated], custom metadata) are on the roadmap; syntax parsing exists but no semantic handling or enforcement yet.',
  },
  {
    title: 'Shell & REPL',
    desc: 'Interactive mode ships today with shard -i; a shard.shell module for process spawning, piping, and filesystem navigation is planned.',
  },
  {
    title: 'Generic Constraints',
    desc: 'where T : ... clauses for generic types and methods, complementing the generics already in the language.',
  },
  {
    title: 'Record Enums',
    desc: 'Enums with immutable associated data — the : struct(...) form — alongside the plain and flag enums shipped today.',
  },
]

export default function Home() {
  useEffect(() => {
    document.title = 'ShardScript — an embeddable scripting language'
  }, [])

  return (
    <div className="bg-shard-dark">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ShardField />

        <div className="relative z-10 text-center px-6 max-w-[720px] mx-auto">
          <ScrollReveal>
            <p className="text-xs font-medium tracking-[0.05em] uppercase text-gold mb-6">
              EMBEDDABLE SCRIPTING LANGUAGE
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="font-space text-4xl md:text-5xl lg:text-[58px] font-bold text-text-primary leading-[1.1] tracking-tight">
              C-Style. Functional. Embedded.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mt-6 text-base text-text-secondary leading-relaxed max-w-[580px] mx-auto">
              ShardScript is a statically typed programming language with a refined C-style syntax. It
              compiles to bytecode for a virtual machine and is designed to embed into host applications.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/shardscript-info/docs"
                className="px-8 py-3.5 rounded-button bg-burgundy text-text-primary font-space text-sm font-semibold uppercase tracking-widest transition-all duration-300 hover:bg-burgundy-dark hover:shadow-glowBurgundy hover:-translate-y-0.5"
              >
                Get Started
              </Link>
              <Link
                to="/shardscript-info/about"
                className="px-8 py-3.5 rounded-button border border-border-light text-text-primary font-space text-sm font-semibold uppercase tracking-widest transition-all duration-300 hover:border-gold hover:text-gold hover:bg-[rgba(212,160,23,0.05)]"
              >
                About
              </Link>
            </div>
          </ScrollReveal>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="w-px h-10 bg-text-muted" style={{ animation: 'pulseScroll 2s infinite' }} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-[120px] px-6">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <p className="text-xs font-medium tracking-[0.05em] uppercase text-gold mb-4">
              FEATURES
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-space text-3xl md:text-[40px] font-bold text-text-primary leading-[1.2] tracking-tight mb-12">
              Built for Embedding
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, i) => (
              <ScrollReveal key={feature.title} delay={0.1 * (i + 1)}>
                <div className="bg-shard-card border border-[#4A2020] rounded-card p-8 shadow-card transition-all duration-500 hover:border-border-light hover:-translate-y-1 hover:shadow-elevated h-full">
                  <div className="w-16 h-16 rounded-full border border-border-light flex items-center justify-center mb-6">
                    <feature.icon size={32} className="text-gold" />
                  </div>
                  <h4 className="font-space text-xl font-semibold text-text-primary mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Code Section */}
      <section className="py-20 md:py-[120px] px-6" style={{ background: '#1A0A0A' }}>
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <p className="text-xs font-medium tracking-[0.05em] uppercase text-gold mb-4">
              SEE IT IN ACTION
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-space text-3xl md:text-[40px] font-bold text-text-primary leading-[1.2] tracking-tight mb-12">
              C-Style, Evolved
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <ScrollReveal delay={0.2}>
              <CodeBlock code={codeExample} language="csharp" filename="hello_world.ss" />
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="lg:pl-4">
                <h3 className="font-space text-2xl md:text-[28px] font-semibold text-text-primary leading-[1.3] mb-4">
                  Familiar syntax, modern power
                </h3>
                <p className="text-base text-text-secondary leading-relaxed mb-4">
                  ShardScript keeps the familiar C-style syntax — curly braces, semicolons, and arrows for
                  return types — and layers in the power of functional and object-oriented programming.
                </p>
                <p className="text-base text-text-secondary leading-relaxed mb-4">
                  Compilation to bytecode for a virtual machine brings portability and controlled
                  execution. Static typing catches errors before a script runs — and inference via{' '}
                  <code className="bg-[rgba(155,45,48,0.15)] text-burgundy-light rounded px-2 py-0.5 font-jetbrains text-sm">:=</code>{' '}
                  does not weaken that safety.
                </p>
                <p className="text-base text-text-secondary leading-relaxed mb-6">
                  Extension methods let you extend any type — just declare a static method that takes the
                  type as its first argument. And defer releases resources on scope exit, in LIFO order.
                </p>

                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-1.5 rounded-pill text-xs font-medium tracking-wide uppercase bg-[rgba(91,140,62,0.15)] text-[#5B8C3E]">
                    Bytecode VM
                  </span>
                  <span className="px-4 py-1.5 rounded-pill text-xs font-medium tracking-wide uppercase bg-[rgba(155,45,48,0.15)] text-burgundy-light">
                    Static Typing
                  </span>
                  <span className="px-4 py-1.5 rounded-pill text-xs font-medium tracking-wide uppercase bg-[rgba(212,160,23,0.1)] text-gold">
                    extern &quot;C&quot; API
                  </span>
                  <span className="px-4 py-1.5 rounded-pill text-xs font-medium tracking-wide uppercase bg-[rgba(91,140,62,0.15)] text-[#5B8C3E]">
                    Sandbox
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Upcoming Features Section */}
      <section className="py-20 md:py-[120px] px-6 bg-shard-card">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <p className="text-xs font-medium tracking-[0.05em] uppercase text-gold mb-4">
              ROADMAP
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-space text-3xl md:text-[40px] font-bold text-text-primary leading-[1.2] tracking-tight mb-4">
              On the Roadmap
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className="text-base text-text-secondary leading-relaxed max-w-[640px] mb-12">
              ShardScript is under active development. Here is what is planned for the next releases.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingFeatures.map((f, i) => (
              <ScrollReveal key={f.title} delay={0.05 * (i + 1)}>
                <div className="bg-shard-dark border border-[#4A2020] rounded-card p-6 shadow-card h-full transition-all duration-500 hover:border-border-light hover:-translate-y-1">
                  <div className="w-2 h-2 rounded-full bg-gold mb-4" />
                  <h4 className="font-space text-base font-semibold text-text-primary mb-2">
                    {f.title}
                  </h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.4}>
            <div className="mt-12 text-center">
              <Link
                to="/shardscript-info/about"
                className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors duration-200 font-space text-sm font-semibold uppercase tracking-widest"
              >
                Full roadmap
                <span className="text-lg">&rarr;</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative overflow-hidden bg-shard-dark">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(107,26,28,0.3) 0%, transparent 70%)',
          }}
        />
        <div className="relative z-10 max-w-[600px] mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-space text-3xl md:text-[40px] font-bold text-text-primary leading-[1.2] tracking-tight">
              Embed ShardScript in your application
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="mt-4 text-base text-text-secondary leading-relaxed max-w-[500px] mx-auto">
              A clean extern &quot;C&quot; API and C++ native-authoring headers ship today. SDKs for C#,
              Rust, Node.js, C++, and Go are in development. Symbol injection and callbacks back to the
              host are supported.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <Link
              to="/shardscript-info/docs"
              className="inline-block mt-8 px-10 py-4 rounded-button bg-burgundy text-text-primary font-space text-base font-semibold uppercase tracking-widest transition-all duration-300 hover:bg-burgundy-dark hover:shadow-glowBurgundy hover:-translate-y-0.5"
            >
              Documentation
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
