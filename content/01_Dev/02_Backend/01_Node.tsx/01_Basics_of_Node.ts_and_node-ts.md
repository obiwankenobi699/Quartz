---
---

## 🧩 1. Overview

> **Node.ts** means using **TypeScript** with **Node.js**.
> It allows backend JavaScript development with **type safety**, **ESNext features**, and better **scalability**.

**Node.js** runs JavaScript on the server.
**TypeScript** adds a compiler layer that:

* Checks types before running.
* Converts `.ts` → `.js` using `tsconfig.json`.


### 🧱 2 Install TypeScript

```bash
npm install -g typescript
```

Or as a dev dependency in your project:

```bash
npm install --save-dev typescript
```


## 🔍 3. tsconfig.json (Full Setup)

A typical **ES2020 Node TypeScript configuration** looks like this:

```json
{
  "compilerOptions": {
    "target": "ES2020",                  
    "module": "ESNext",                 
    "moduleResolution": "node",         
    "rootDir": "src",                   
    "outDir": "dist",                   
    "strict": true,                     
    "esModuleInterop": true,            
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```


## 🧩 5. Folder Structure Example

```
my-ts-app/
│
├─ src/
│   ├─ index.ts
│
├─ dist/
│   └─ index.js
│
├─ tsconfig.json
├─ package.json
```


###  Watch Mode (auto compile on save)

```bash
npx tsc --watch
```


##  7. Example `index.ts`

```ts
const greet = (name: string): void => {
  console.log(`Hello, ${name}!`);
};

greet("Mukul");
```


##  9. ES2020 Features Used in TypeScript

| Feature            | Description                      | Example               |
| ------------------ | -------------------------------- | --------------------- |
| `async/await`      | Handle async code easily         | `await fetch()`       |
| Optional chaining  | Safely access nested objects     | `user?.profile?.name` |
| Nullish coalescing | Default value for null/undefined | `let x = val ?? 10;`  |
| BigInt             | Handles large integers           | `123n`                |
| Dynamic import     | Import modules on demand         | `import('./file.js')` |


## 11. Summary

✅ `Node.ts` = Node.js with TypeScript
✅ `tsconfig.json` = Blueprint for compiling TypeScript
✅ `ES2020` = Enables modern JS features
✅ `npx tsc --init` = Creates tsconfig easily
✅ `ts-node` = Runs TypeScript without compiling
✅ `strict` mode = Best practice for reliable code

