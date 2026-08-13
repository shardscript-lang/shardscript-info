# ShardScript Documentation Restructure Proposal

Based on the C3 documentation at `C:\Users\gutii\Desktop\c3-web-main\docs`.

## What the C3 docs do well

The C3 site uses a clear, progressive-information architecture:

1. **Home** — landing page with download CTA, feature grid, and code examples.
2. **Docs** — a single hierarchical sidebar grouped by learner intent:
   - *Introduction* — one-page pitch.
   - *Getting Started* — install, hello world, build from source, project setup.
   - *Language Overview* — examples + type system, placed early so readers see the whole shape before drilling into syntax.
   - *C to C3* — migration guide for the target audience.
   - *Language Fundamentals* — smallest building blocks (types, variables, functions, statements, expressions, modules, naming, comments).
   - *Language Common* — everyday features (arrays, strings, enums, structs, memory, optionals, contracts, defer, attributes, aliases).
   - *Generic Programming* — generics, macros, compile-time, reflection, interfaces, operator overloading.
   - *Build Your Project* — CLI and project config, separated from installation.
   - *Language Rules* — implicit conversions, precedence, undefined behaviour.
   - *Misc Advanced* — asm, builtins, debugging, library packaging.
   - *Implementation Details* — grammar, specification.
   - *FAQ / Get Involved / Thank You* — community and policy pages.
3. **Standard Library** — top-level item, separate from the language manual.
4. **Blog** — release notes and longer-form articles.

Key takeaways:

- **Order matters:** pitch → install → hello world → examples/overview → fundamentals → common features → generics → build/rules/advanced → implementation.
- **Audience segmentation:** a "C to C3" migration track is explicit.
- **Build/project tooling is its own section**, not mixed with getting started.
- **Standard library is separate** from language reference.
- **Reference-only topics** (grammar, spec, precedence, undefined behaviour) are grouped at the end.
- **FAQ absorbs edge-case and policy pages** so they do not clutter the main learning path.

---

## Current ShardScript docs structure

```
getting-started/
  01-philosophy.md
  02-installation.md
  03-hello-world.md
  04-building-from-source.md
  05-runtime-architecture.md

syntax/
  fundamentals/
    01-variables-and-types.md
    02-type-inference.md
    03-primitive-types.md
    04-operators.md
    05-strings-and-interpolation.md
    06-arrays.md
    07-lists-and-dictionaries.md
  control-flow/
    01-conditionals.md
    02-loops.md
    03-switch-expressions.md
    04-exceptions.md
    05-deferred-execution.md
  object-oriented/
    01-classes.md
    02-fields-and-properties.md
    03-methods.md
    04-constructors.md
    05-interfaces.md
    06-extension-methods.md
    07-generics.md
    08-operator-overloading.md
  functional/
    01-functions-and-delegates.md
    02-lambda-expressions.md
    03-closures.md
  async/
    01-cooperative-multitasking.md
    02-async-functions.md
    03-await-and-state-machines.md
    04-task-and-valuetask.md
    05-cancellation-tokens.md
  resource-management/
    01-garbage-collection.md
    02-idisposable.md

stdlib/
  stdio/
  math/
  collections/
  debug/
  environment/
  filesystem/
  json/
  streams/
  subprocess/
  async/
  interop/
  http/
  socket/
  reflection/
  time

library-building/
  (many articles)
```

### Problems with the current structure

1. **No explicit "Language Overview" track.** Readers go from Hello World straight into Variables and Types without seeing a feature tour or the type system at a glance.
2. **Functions and Delegates are under "Functional Programming"**, but methods are under OOP. This splits a single topic (functions) across two sections.
3. **`defer` and `IDisposable` are under "Resource Management"**, but `defer` is a core control-flow feature and is introduced far from loops/conditionals.
4. **stdlib is mixed with syntax/library-building at the same top level**, making the sidebar feel like three unrelated sites.
5. **No "Build Your Project" section.** CLI, project config, and package management live inside Installation or are absent.
6. **No migration guide.** ShardScript is C-like; a "C#/C++ to ShardScript" page would help.
7. **No FAQ.** Edge-case articles and policy-like content have no natural home.
8. **Library-building articles are numerous and mixed-depth.** Overview/setup/examples are not clearly separated from deep symbol-builder reference.

---

## Proposed new structure

The proposal keeps the Diátaxis classification (Tutorial / How-To / Concept / Reference) but reorganizes the sidebar so a learner can move top-to-bottom without context-switching.

### Top-level split

```
Home
Docs
  ├─ Getting Started
  ├─ Language Overview
  ├─ From C# / C++
  ├─ Language Fundamentals
  ├─ Common Language Features
  ├─ Object-Oriented Programming
  ├─ Asynchronous Programming
  ├─ Standard Library
  ├─ Build Your Project
  ├─ Native Library Development
  ├─ Language Rules
  ├─ Advanced Topics
  ├─ Implementation Details
  └─ FAQ
```

### Detailed proposal

#### 1. Getting Started
Audience: first-time users.

| # | Article | Type | Notes |
|---|---------|------|-------|
| 1 | Introduction / Philosophy | Concept | Keep the expanded philosophy article as the entry point. |
| 2 | Installation | How-To | Keep the split installation guide. |
| 3 | Hello World | Tutorial | Keep the new hello-world tutorial. |
| 4 | Building from Source | How-To | Keep the new build-from-source guide. |
| 5 | Runtime Architecture | Concept | Keep, but cross-link heavily from fundamentals. |

#### 2. Language Overview
Audience: readers deciding whether to invest time.

| # | Article | Type | Notes |
|---|---------|------|-------|
| 1 | Feature Tour / Examples | Reference/Tutorial | A single page showing small snippets of classes, generics, async, switch expressions, defer, etc. |
| 2 | Type System | Concept | Value vs reference types, generics, arrays, interfaces, enums, nullable references. |

*New section — not present today.*

#### 3. From C# / C++
Audience: developers migrating from similar languages.

| # | Article | Type | Notes |
|---|---------|------|-------|
| 1 | For C# Developers | How-To/Concept | Namespaces, classes, generics, async/await, properties, exceptions. |
| 2 | For C++ Developers | How-To/Concept | Headers vs namespaces, RAII vs GC/defer, pointers vs references, extern. |

*New section — not present today.*

#### 4. Language Fundamentals
Audience: learning the language bottom-up.

| # | Article | Type | Notes |
|---|---------|------|-------|
| 1 | Basic Types and Values | Reference | Merge primitive-types + variables-and-types basics. |
| 2 | Variables and Type Inference | Reference | Keep variables-and-types + type-inference. |
| 3 | Operators and Precedence | Reference | Merge operators + precedence rules. |
| 4 | Strings and Interpolation | Reference | Keep. |
| 5 | Comments and Documentation | Reference | New short page. |
| 6 | Functions | Reference | Move the core function syntax out of "Functional Programming". |
| 7 | Conditionals | Reference | Keep. |
| 8 | Loops | Reference | Keep. |
| 9 | Arrays | Reference | Keep fundamentals article; link to stdlib collections. |

#### 5. Common Language Features
Audience: writing everyday ShardScript code.

| # | Article | Type | Notes |
|---|---------|------|-------|
| 1 | Enums | Reference | Move from syntax/fundamentals or object-oriented. |
| 2 | Structs and Classes | Reference | Distinguish value vs reference types, when to use each. |
| 3 | Fields and Properties | Reference | Keep. |
| 4 | Methods | Reference | Keep. |
| 5 | Constructors and Initialization | Reference | Keep. |
| 6 | Interfaces and Abstractions | Reference | Keep. |
| 7 | Extension Methods | Reference | Keep. |
| 8 | Generics | Reference | Keep. |
| 9 | Operator Overloading | Reference | Keep. |
| 10 | Defer and IDisposable | Reference/How-To | Move defer from control-flow and IDisposable from resource-management into one practical page. |
| 11 | Exceptions and Error Handling | Reference | Keep. |
| 12 | switch Expressions | Reference | Keep, including type patterns. |

#### 6. Functional Programming
Audience: delegates, lambdas, closures.

| # | Article | Type | Notes |
|---|---------|------|-------|
| 1 | Delegates | Reference | Split from the current combined article. |
| 2 | Lambda Expressions | Reference | Keep. |
| 3 | Closures | Reference | Keep. |

#### 7. Asynchronous Programming
Audience: async code.

| # | Article | Type | Notes |
|---|---------|------|-------|
| 1 | Cooperative Multitasking | Concept | Keep. |
| 2 | async Functions | Reference | Keep. |
| 3 | Await and State Machines | Concept | Keep. |
| 4 | Task and ValueTask | Reference | Keep. |
| 5 | Cancellation Tokens | Reference | Keep. |

#### 8. Resource Management
Audience: memory and cleanup.

| # | Article | Type | Notes |
|---|---------|------|-------|
| 1 | Garbage Collection | Concept | Keep. |
| 2 | Object Lifetime and Handles | Concept | Move from library-building if it is language-level. |

#### 9. Standard Library
Audience: using shipped shards.

Group by shard, but flatten the top-level list so it reads like a library index:

| Group | Articles |
|-------|----------|
| Core I/O | Console I/O, Stream Interfaces, MemoryStream, BinaryReader/Writer, StreamReader/Writer |
| Collections | List, Dictionary, Queue and Stack, IEnumerable/IEnumerator |
| Math | Basic Math, Trigonometry/Logarithms, Random |
| Text & Data | Strings (if any), JSON Node, JSON Serializer |
| Files & Processes | File & Path, Path Concatenation, Directory/DirectoryInfo, Process/ProcessStartInfo, Subprocess I/O |
| Networking | HTTP Client, HTTP Server, TCP Sockets |
| Async | TaskCompletionSource, Cancellation Token/Source |
| Runtime | Environment, Developer Tools, VM Inspection, Reflection/Type Introspection, Date & Time |
| Interop | Native Interop |

*Each article should follow the same Reference template (Summary → Syntax → Parameters → Returns → Exceptions → Remarks → Examples → See also → Source).* Most already do; the remaining should be aligned.

#### 10. Build Your Project
Audience: running and shipping ShardScript code.

| # | Article | Type | Notes |
|---|---------|------|-------|
| 1 | The shard CLI | Reference | Extract CLI tables from Installation into a dedicated reference. |
| 2 | Project Configuration | How-To | New page for project files / compiler options. |
| 3 | Package Management with Geode | How-To/Concept | Extract Geode content from Installation; expand when Geode ships. |
| 4 | Library Search Paths | How-To | Extract from Installation. |

*New section — mostly not present today.*

#### 11. Native Library Development
Audience: extending ShardScript from C++.

| # | Article | Type | Notes |
|---|---------|------|-------|
| 1 | Native Library Overview | Concept | Keep. |
| 2 | Build Setup | How-To | Keep. |
| 3 | The Native Callback Contract | Concept | Keep. |
| 4 | Symbol Builders (Reference) | Reference | Merge or keep class/struct/method/property/enum/etc. builder articles under one Reference group. |
| 5 | Working with Objects | How-To | Keep. |
| 6 | Working with Arrays | How-To | Keep. |
| 7 | Working with Fields | How-To | Keep. |
| 8 | Returning Values | How-To | Keep. |
| 9 | Reading Arguments | How-To | Keep. |
| 10 | Native Callback Helpers | Reference | Keep. |
| 11 | Async Helpers | Reference | Keep. |
| 12 | Native Handles and Object Lifetime | How-To/Concept | Keep. |
| 13 | Generic Types and Type Parameters | How-To | Keep. |
| 14 | Inter-library Dependencies | How-To | Keep. |
| 15 | Reflection-style Lookups | How-To | Keep. |
| 16 | Design Best Practices | Concept | Keep. |
| 17 | Troubleshooting | How-To | Keep. |
| 18 | Example: Math Library | Tutorial | Keep. |
| 19 | Example: Generic Collections | Tutorial | Keep. |
| 20 | Example: HTTP Client/Server | Tutorial | Keep. |
| 21 | Example: Native Handle Wrapper | Tutorial | Keep. |
| 22 | Example: Async I/O | Tutorial | Keep. |

This section is large. Consider splitting into:
- *Native Library Development / Tutorials*
- *Native Library Development / How-To Guides*
- *Native Library Development / Reference*

#### 12. Language Rules
Audience: precise reference.

| # | Article | Type | Notes |
|---|---------|------|-------|
| 1 | Implicit Conversions | Reference | New. |
| 2 | Operator Precedence | Reference | Move from operators/fundamentals. |
| 3 | Runtime Exceptions | Reference | Catalog DivideByZeroException, Array index out of range, null instance access, etc. |
| 4 | Undefined Behaviour | Reference/Concept | New, if any. |

#### 13. Advanced Topics
Audience: power users.

| # | Article | Type | Notes |
|---|---------|------|-------|
| 1 | Native Interop Deep Dive | Reference | If not already covered in stdlib. |
| 2 | Custom Attributes / Metadata | Reference | Future content. |
| 3 | Debugging and Diagnostics | How-To | Keep VM Inspection / Developer Tools content, but project-focused. |

#### 14. Implementation Details
Audience: contributors and embedders.

| # | Article | Type | Notes |
|---|---------|------|-------|
| 1 | Compiler Pipeline | Concept | Expand from Runtime Architecture. |
| 2 | Bytecode and OpCodes | Reference | New. |
| 3 | Virtual Machine Internals | Concept | Expand from Runtime Architecture. |
| 4 | Event Loop and libuv | Concept | Expand from Runtime Architecture. |
| 5 | Grammar | Reference | Future. |
| 6 | Specification | Reference | Future. |

#### 15. FAQ
Audience: anyone with edge questions.

| # | Article | Type | Notes |
|---|---------|------|-------|
| 1 | FAQ Index | Reference | New. |
| 2 | Comparison with Other Languages | Concept | New. |
| 3 | Rejected Ideas | Concept | New. |
| 4 | Roadmap | Concept | New. |
| 5 | Design Goals | Concept | Could absorb content from Philosophy. |

#### 16. Get Involved / Community
Audience: contributors.

*New section.*

---

## Immediate concrete actions

The following changes give the biggest improvement for the least effort:

1. **Add a "Language Overview" section** with a Feature Tour and Type System article.
2. **Create a "Build Your Project" section** and move the CLI tables, Geode content, and library-path content out of Installation.
3. **Move `defer` and `IDisposable` into "Common Language Features"** as a single practical article.
4. **Split Functions/Delegates/Lambdas/Closures logically:** core function syntax → Fundamentals; delegates/lambdas/closures → Functional Programming.
5. **Align every Standard Library article** to the Reference template (Summary → Syntax → Parameters → Returns → Exceptions → Remarks → Examples → See also → Source).
6. **Group Native Library Development articles** into Tutorials / How-To / Reference sub-sections.
7. **Add a Runtime Exceptions reference page** that catalogs the new VM error messages.
8. **Add FAQ and migration pages** when content exists.

---

## Suggested new file layout (partial)

```
src/docs/
├── index.mdx                              # landing page (future)
├── getting-started/
│   ├── 01-introduction.mdx                # (renamed from philosophy)
│   ├── 02-installation.mdx
│   ├── 03-hello-world.mdx
│   ├── 04-building-from-source.mdx
│   └── 05-runtime-architecture.mdx
├── language-overview/
│   ├── 01-feature-tour.mdx                # NEW
│   └── 02-type-system.mdx                 # NEW
├── from-other-languages/
│   ├── 01-for-csharp-developers.mdx       # NEW
│   └── 02-for-cpp-developers.mdx          # NEW
├── language-fundamentals/
│   ├── 01-basic-types-and-values.mdx      # (merge primitive-types + variables)
│   ├── 02-variables-and-type-inference.mdx
│   ├── 03-operators-and-precedence.mdx    # (merge)
│   ├── 04-strings-and-interpolation.mdx
│   ├── 05-comments.mdx                    # NEW
│   ├── 06-functions.mdx                   # (move core syntax here)
│   ├── 07-conditionals.mdx
│   ├── 08-loops.mdx
│   └── 09-arrays.mdx
├── common-language-features/
│   ├── 01-enums.mdx
│   ├── 02-structs-and-classes.mdx         # NEW / merge
│   ├── 03-fields-and-properties.mdx
│   ├── 04-methods.mdx
│   ├── 05-constructors.mdx
│   ├── 06-interfaces.mdx
│   ├── 07-extension-methods.mdx
│   ├── 08-generics.mdx
│   ├── 09-operator-overloading.mdx
│   ├── 10-defer-and-idisposable.mdx      # (merge)
│   ├── 11-exceptions.mdx
│   └── 12-switch-expressions.mdx
├── functional-programming/
│   ├── 01-delegates.mdx
│   ├── 02-lambda-expressions.mdx
│   └── 03-closures.mdx
├── asynchronous-programming/
│   ├── 01-cooperative-multitasking.mdx
│   ├── 02-async-functions.mdx
│   ├── 03-await-and-state-machines.mdx
│   ├── 04-task-and-valuetask.mdx
│   └── 05-cancellation-tokens.mdx
├── resource-management/
│   ├── 01-garbage-collection.mdx
│   └── 02-object-lifetime.mdx
├── standard-library/
│   └── (grouped by shard as above)
├── build-your-project/
│   ├── 01-the-shard-cli.mdx               # NEW (extract from Installation)
│   ├── 02-project-configuration.mdx       # NEW
│   ├── 03-package-management.mdx          # NEW (extract from Installation)
│   └── 04-library-search-paths.mdx        # NEW (extract from Installation)
├── native-library-development/
│   ├── tutorials/
│   ├── how-to/
│   └── reference/
├── language-rules/
│   ├── 01-implicit-conversions.mdx        # NEW
│   ├── 02-operator-precedence.mdx         # (move)
│   ├── 03-runtime-exceptions.mdx          # NEW
│   └── 04-undefined-behaviour.mdx         # NEW
├── advanced-topics/
│   └── 01-debugging-and-diagnostics.mdx
├── implementation-details/
│   ├── 01-compiler-pipeline.mdx           # NEW
│   ├── 02-bytecode.mdx                    # NEW
│   ├── 03-virtual-machine.mdx             # NEW
│   └── 04-event-loop.mdx                  # NEW
├── faq/
│   ├── 01-index.mdx                       # NEW
│   ├── 02-comparison.mdx                  # NEW
│   ├── 03-rejected-ideas.mdx              # NEW
│   ├── 04-roadmap.mdx                     # NEW
│   └── 05-design-goals.mdx                # NEW
└── community/
    └── 01-get-involved.mdx                # NEW
```

---

## Notes on Diátaxis alignment

Every page should declare its type in front matter and follow the matching template:

- **Tutorials** (Hello World, example libraries) → Prerequisites → Scenario → Steps → Expected Output → What’s next?
- **How-To Guides** (Installation, Build from Source, native library tasks) → Prerequisites → Goal → Steps → Verification → Troubleshooting → See also.
- **Concept pages** (Philosophy, Runtime Architecture, GC) → Summary → Problem → How it works → Key ideas → When to use/not use → Related articles.
- **Reference pages** (stdlib, language rules, symbol builders) → Summary → Syntax → Parameters → Returns → Exceptions → Remarks → Examples → See also → Source.

The C3 docs implicitly follow a similar rhythm; making the Diátaxis type explicit in ShardScript front matter is already done and should be preserved.
