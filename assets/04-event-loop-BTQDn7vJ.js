import{j as e}from"./index-B-x28vAk.js";function d(a){const n={p:"p",...a.components},{Bullet:t,CodeBlock:l,DocsTable:c,H2:i,InlineCode:s,Prose:r}=n;return t||o("Bullet"),l||o("CodeBlock"),c||o("DocsTable"),i||o("H2"),s||o("InlineCode"),r||o("Prose"),e.jsxs(e.Fragment,{children:[e.jsx(i,{children:"Summary"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:["ShardScript concurrency is cooperative and single-threaded. A single ",e.jsx(s,{children:"EventLoop"}),` — a
thin wrapper around a libuv `,e.jsx(s,{children:"uv_loop_t"}),` — multiplexes all in-flight asynchronous work:
timers, socket and HTTP I/O, and thread-pool offloads.`]})}),`
`,e.jsx(i,{children:"What problem it solves"}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[`Multi-threaded parallelism is powerful but complicates memory safety and synchronization. ShardScript avoids
OS threads in script code by using a single event loop. Async methods suspend on `,e.jsx(s,{children:"await"}),`,
return control to the loop, and resume when their operation completes, all on the same thread where VM state
is safe.`]})}),`
`,e.jsx(i,{children:"How it works"}),`
`,e.jsx(r,{children:e.jsx(n.p,{children:`No async operation spawns a dedicated OS thread per task. Instead each registers a handle with the loop and
a continuation to run on completion.`})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Timers."})," ",e.jsx(s,{children:"Task.Delay"}),` is the canonical example. In the async shard it
calls the native helper `,e.jsx(s,{children:"AsyncScope::Delay"}),`, which creates a libuv timer, arms it, and
registers a completion callback.`]})}),`
`,e.jsx(l,{code:`// Native helper behind Task.Delay(ms)
uv_timer_t* timer = new uv_timer_t;
uv_timer_init(loop, timer);

uv_timer_start(timer, [](uv_timer_t* handle) {
  // ...complete the task, which resumes the suspended awaiter...
  // ...then close and free the timer handle...
}, milliseconds, 0);`,language:"cpp",filename:"task_delay.cpp"}),`
`,e.jsx(r,{children:e.jsx(n.p,{children:"When the timer fires, the callback completes the task, which resumes the suspended async method."})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Suspending and resuming."})," An async method does not block its caller; it suspends at each"," ",`
`,e.jsx(s,{children:"await"})," and returns control to the loop. Two ways to make progress exist:"]})}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Blocking wait"})," — ",e.jsx(s,{children:"Task.Wait"}),` pumps the
loop until the awaited task completes, then reads its result.`]})}),e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Fire-and-forget"}),` — calling an async method without awaiting
starts it concurrently. The loop keeps it alive as long as needed.`]})})]}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:["Resumption mirrors suspension. When a libuv callback completes a pending operation, the runtime calls"," ",`
`,e.jsx(s,{children:"ResumeContinuation"}),`: it reads the continuation off the task, finds the state
machine's `,e.jsx(s,{children:"MoveNext"}),` method, and invokes it. In-flight tasks are rooted so the
collector cannot reclaim them while they are suspended.`]})}),`
`,e.jsx(r,{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Offloading CPU-bound work."}),` Because everything shares one thread, long CPU-bound work would
starve the loop. `,e.jsx(s,{children:"RunOnThreadPool"})," runs heavy work on a background"," ",`
`,e.jsx(s,{children:"std::thread"})," and marshals completion back through a libuv"," ",`
`,e.jsx(s,{children:"uv_async_t"}),`, so the resume happens on the single thread where VM state is safe to
touch.`]})}),`
`,e.jsx(i,{children:"Key ideas"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"Single-threaded concurrency."}),` All script code runs on one
thread; the loop interleaves async operations.`]})}),e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"No data races in script code."}),` Because there is no shared
mutable state between OS threads, race conditions are avoided by design.`]})}),e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx("strong",{className:"text-text-primary",children:"libuv as the backbone."}),` Timers, sockets, and async handles
are all managed by libuv.`]})})]}),`
`,e.jsx(i,{children:"When to use / When not to use"}),`
`,e.jsx(c,{headers:["Use","Avoid"],rows:[[e.jsx(e.Fragment,{children:"Use async/await for I/O-bound and timer-based concurrency."}),e.jsx(e.Fragment,{children:"Do not use async/await for CPU-bound parallelism; offload heavy work to the thread pool or native libraries."})]]}),`
`,e.jsx(i,{children:"Related articles"}),`
`,e.jsxs("ul",{className:"space-y-2 text-text-secondary",children:[e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx(s,{children:"Compiler Pipeline"})," — how async methods are lowered into state machines."]})}),e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx(s,{children:"Virtual Machine Internals"}),` — how the VM executes the state machines resumed by the
loop.`]})}),e.jsx(t,{children:e.jsxs(n.p,{children:[e.jsx(s,{children:"Runtime Architecture"})," — the high-level integration of compiler, VM, and event loop."]})})]})]})}function p(a={}){const{wrapper:n}=a.components||{};return n?e.jsx(n,{...a,children:e.jsx(d,{...a})}):d(a)}function o(a,n){throw new Error("Expected component `"+a+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
