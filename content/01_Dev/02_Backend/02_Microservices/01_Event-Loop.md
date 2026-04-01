---
---


> **Subject:** {{Subject}}  
> **Topic Type:** Concept / Process / Architecture / Example  
> **Related Topics:** 


## Example Code

```javascript
console.log("1.Script Start");

setTimeout(() => {
    console.log("2.Settimeout macrotask");
}, 10000);

setInterval(() => {
    console.log("4.SetInterval");
}, 10000);

Promise.resolve().then(() => {
    console.log("3.Promise microtask");
});
```


# Execution Timeline for the Code

```
Time = 0 ms
Macrotask Queue:
  setInterval callback
  setTimeout callback

Execution Order:
  4.SetInterval
  2.Settimeout macrotask

Next intervals:
  4.SetInterval
  4.SetInterval
  ...
```

Below is your **final combined Obsidian-ready note**, now including the **heavy CPU task inside your exact function**.  
The explanation includes: event loop, microtasks, macrotasks, async, blocking behavior, ASCII diagrams, and complete theory paragraphs.


# Example with Heavy CPU Task Injection

```javascript
function heavyTask() {
    console.log("Blocking CPU-heavy task started");

    let s = 0;
    for (let i = 0; i < 1e10; i++) {   // intense CPU loop
        s += i;
    }

    console.log("Blocking CPU-heavy task finished");
    return s;
}

console.log("1.Script Start");

setTimeout(() => {
    console.log("2.Settimeout macrotask");
}, 10000);

setInterval(() => {
    console.log("4.SetInterval");
}, 10000);

Promise.resolve().then(() => {
    console.log("3.Promise microtask");
});

async function example() {
    console.log("5.Async start"); 
    await null;                     
    console.log("6.Async microtask");
}

example();

// CPU HEAVY TASK BLOCKS EVERYTHING BELOW
heavyTask();

console.log("7.Script End");
```


# Why This Happens

When heavyTask() runs, it occupies the call stack with a long-running loop. Because JavaScript has only one main thread, the event loop cannot proceed to microtasks or macrotasks until heavyTask completes. Promises pause, async/await pauses, and timers do not fire until the CPU is free again.

| heavyTask() – long loop – CPU fully consumed            |

# Event Loop Architecture (ASCII)

```
             ┌────────────────────┐
             │    Call Stack      │
             └────────────────────┘
                       │
                       ▼
             ┌────────────────────┐
             │  Microtask Queue   │
             │ Promise, await     │
             └────────────────────┘
                       │
                       ▼
             ┌────────────────────┐
             │  Macrotask Queue   │
             │ setTimeout, I/O    │
             └────────────────────┘
                       │
                       ▼
             ┌────────────────────┐
             │     Event Loop     │
             └────────────────────┘
```

With heavyTask:

```
Call Stack (Blocked)
event loop cannot proceed
```

