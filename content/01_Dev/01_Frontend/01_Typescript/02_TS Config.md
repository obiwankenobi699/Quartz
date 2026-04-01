---
---
# TypeScript Configuration Complete Guide

**Understanding tsconfig.json and Build Process**


## tsconfig.json Basics

### Creating tsconfig.json

```bash
# Initialize TypeScript project
npx tsc --init

# Creates tsconfig.json with default options
# File is heavily commented with explanations
```

### What's Inside

```
┌────────────────────────────────────────────────────────┐
│           tsconfig.json Structure                      │
├────────────────────────────────────────────────────────┤
│                                                        │
│  {                                                     │
│    "compilerOptions": {                                │
│      // Where TypeScript compiler options go           │
│      "target": "ES2022",      // Output JS version     │
│      "module": "commonjs",    // Module system         │
│      "outDir": "./dist",      // Output directory      │
│      "rootDir": "./src",      // Source directory      │
│      "strict": true,          // Type checking level   │
│      ...                                               │
│    },                                                  │
│                                                        │
│    "include": ["src/**/*"],   // Files to compile      │
│    "exclude": ["node_modules"] // Files to ignore      │
│  }                                                     │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### Default Generated Config

**When you run `npx tsc --init`:**

```json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

**Minimal options only. Many are commented out.**


## Output Files Explained

### Types of Files Generated

```
┌────────────────────────────────────────────────────────┐
│            TypeScript Output Files                     │
├────────────────────────────────────────────────────────┤
│                                                        │
│  1. .js (JavaScript)                                   │
│     ├── Executable code                                │
│     ├── Types removed                                  │
│     └── Run by Node.js                                 │
│                                                        │
│  2. .d.ts (Type Declarations)                          │
│     ├── Type information only                          │
│     ├── Used by TypeScript for type checking           │
│     ├── Published with npm packages                    │
│     └── No executable code                             │
│                                                        │
│  3. .js.map (Source Maps)                              │
│     ├── Maps generated JS to original TS               │
│     ├── Used for debugging                             │
│     ├── Allows stepping through TS in debugger         │
│     └── Optional (controlled by sourceMap option)      │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### Example Transformation

**Input: src/math.ts**

```typescript
export function add(a: number, b: number): number {
    return a + b;
}

export function subtract(a: number, b: number): number {
    return a - b;
}
```

**Output 1: dist/math.js**

```javascript
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = add;
exports.subtract = subtract;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}
```

**Output 2: dist/math.d.ts**

```typescript
export declare function add(a: number, b: number): number;
export declare function subtract(a: number, b: number): number;
```

**Output 3: dist/math.js.map**

```json
{
  "version": 3,
  "file": "math.js",
  "sourceRoot": "",
  "sources": ["../src/math.ts"],
  "names": [],
  "mappings": ";;AAAA,SAAgB,GAAG,CAAC,CAAS,EAAE,CAAS;IACpC,OAAO,CAAC,GAAG,CAAC,CAAC;AACjB,CAAC..."
}
```

### File Comparison

```
Source Code (math.ts)           782 bytes
├── TypeScript syntax
├── Type annotations
├── Comments
└── Formatted for readability

↓ [Compilation]

JavaScript (math.js)            1,243 bytes
├── CommonJS module wrapper
├── No type annotations
├── Comments removed (default)
└── Executable by Node.js

Declaration (math.d.ts)         124 bytes
├── Only type signatures
├── No implementation
└── Used by TypeScript only

Source Map (math.js.map)        348 bytes
├── Mapping information
├── Original source reference
└── Used by debuggers
```

### Configuration for Output Files

```json
{
  "compilerOptions": {
    "declaration": true,         // Generate .d.ts files
    "declarationMap": true,      // Generate .d.ts.map files
    "sourceMap": true,           // Generate .js.map files
    "removeComments": true       // Strip comments from .js
  }
}
```


## Node.js Compatibility

### Node.js and ECMAScript Versions

```
┌────────────────────────────────────────────────────────┐
│         Node.js Version → ES Target Mapping            │
├────────────────────────────────────────────────────────┤
│                                                        │
│  Node Version  │ ES Target  │ Key Features            │
│  ──────────────────────────────────────────────────    │
│                                                        │
│  Node 12       │ ES2019     │ Optional catch          │
│  (EOL)         │            │ Array.flat()            │
│                                                        │
│  Node 14       │ ES2020     │ Optional chaining       │
│  (EOL)         │            │ Nullish coalescing      │
│                │            │ BigInt                  │
│                                                        │
│  Node 16       │ ES2021     │ Logical assignment      │
│  (Maintenance) │            │ String.replaceAll()     │
│                                                        │
│  Node 18       │ ES2022     │ Top-level await         │
│  (LTS)         │            │ Class fields            │
│                │            │ Private methods         │
│                                                        │
│  Node 20       │ ES2023     │ Array.toSorted()        │
│  (Current LTS) │            │ Array.findLast()        │
│                                                        │
│  Node 21+      │ ESNext     │ Latest features         │
│  (Current)     │            │                         │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### Checking Your Node.js Version

```bash
# Check Node.js version
node --version
# Output: v20.10.0

# Check supported ES features
node -p "process.versions.v8"
# Output: 11.3.244.8-node.16
```

### Recommended Configuration

**For Node.js 18+ (LTS):**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "lib": ["ES2022"],
    "moduleResolution": "NodeNext"
  }
}
```

**For Node.js 16:**

```json
{
  "compilerOptions": {
    "target": "ES2021",
    "module": "commonjs",
    "lib": ["ES2021"]
  }
}
```

**For Node.js 14:**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"]
  }
}
```

### Installing Node Types

```bash
# Install Node.js type definitions
npm install --save-dev @types/node

# Now you can use Node.js APIs with types
```

**Usage in TypeScript:**

```typescript
import { readFile } from 'fs/promises';
import { EventEmitter } from 'events';

// TypeScript knows about Node.js APIs
const data = await readFile('file.txt', 'utf-8');
const emitter = new EventEmitter();
```

**tsconfig.json with Node types:**

```json
{
  "compilerOptions": {
    "types": ["node"]  // Include Node.js types
  }
}
```


## Configuration Options Deep Dive

### Your Provided Configuration Explained

```jsonc
{
  "compilerOptions": {
    // ────────────────────────────────────────────────────
    // FILE LAYOUT
    // ────────────────────────────────────────────────────
    
    "rootDir": "./src",
    /*
     * Source files location
     * All TypeScript files should be under src/
     * This is stripped from output paths
     */

    "outDir": "./dist",
    /*
     * Compiled JavaScript output location
     * Mirrors src/ structure in dist/
     * Created automatically on build
     */

    // ────────────────────────────────────────────────────
    // ENVIRONMENT SETTINGS
    // ────────────────────────────────────────────────────

    "module": "nodenext",
    /*
     * Module system to use
     * 
     * Options:
     * - commonjs: require/exports (Node.js traditional)
     * - esnext: import/export (ES Modules)
     * - nodenext: Auto-detect based on package.json "type"
     * 
     * Use "nodenext" for modern Node.js projects
     */

    "target": "esnext",
    /*
     * JavaScript version to emit
     * 
     * "esnext" = Latest ECMAScript features
     * Safe for Node.js 18+
     * 
     * Alternative: "ES2022" for Node.js 18
     */

    "lib": ["esnext"],
    /*
     * Type definitions to include
     * 
     * Provides types for:
     * - Array.prototype.at()
     * - String.prototype.replaceAll()
     * - Promise.any()
     * - And other ESNext features
     */

    "types": ["node"],
    /*
     * Include Node.js type definitions
     * 
     * Requires: npm install -D @types/node
     * 
     * Provides types for:
     * - fs, path, http, etc.
     * - process, Buffer, __dirname
     */

    // ────────────────────────────────────────────────────
    // OTHER OUTPUTS
    // ────────────────────────────────────────────────────

    "sourceMap": true,
    /*
     * Generate .js.map files
     * 
     * Benefits:
     * - Debug TypeScript in Node.js debugger
     * - Stack traces show TS line numbers
     * - Better error messages
     * 
     * File size: ~30% of .js file
     */

    "declaration": true,
    /*
     * Generate .d.ts files
     * 
     * Use cases:
     * - Publishing npm packages
     * - Other TS projects using your code
     * - Type-safe imports
     * 
     * Required for libraries
     */

    "declarationMap": true,
    /*
     * Generate .d.ts.map files
     * 
     * Benefits:
     * - Jump to .ts source from .d.ts
     * - Better IDE "Go to Definition"
     * 
     * Only useful if publishing source
     */

    // ────────────────────────────────────────────────────
    // STRICTER TYPE CHECKING
    // ────────────────────────────────────────────────────

    "noUncheckedIndexedAccess": true,
    /*
     * Array/object access returns T | undefined
     * 
     * Without:
     * const arr: number[] = [1, 2, 3];
     * const x = arr[10];  // Type: number
     * 
     * With:
     * const x = arr[10];  // Type: number | undefined
     * 
     * Prevents runtime errors from undefined access
     */

    "exactOptionalPropertyTypes": true,
    /*
     * Stricter optional property checking
     * 
     * interface Config {
     *   debug?: boolean;
     * }
     * 
     * Without: Can set to undefined explicitly
     * const config: Config = { debug: undefined };  // OK
     * 
     * With: Must omit or set to boolean
     * const config: Config = { debug: undefined };  // Error
     */

    // ────────────────────────────────────────────────────
    // STYLE OPTIONS (Commented - Optional)
    // ────────────────────────────────────────────────────

    // "noImplicitReturns": true,
    /*
     * All code paths must return
     * 
     * function test(x: number) {
     *   if (x > 0) {
     *     return "positive";
     *   }
     *   // Error: Not all paths return
     * }
     */

    // "noUnusedLocals": true,
    /*
     * Error on unused variables
     * 
     * function test() {
     *   const x = 5;  // Error: 'x' is declared but never used
     *   return 10;
     * }
     */

    // "noUnusedParameters": true,
    /*
     * Error on unused function parameters
     * 
     * function greet(name: string, age: number) {
     *   return `Hello ${name}`;
     *   // Error: 'age' is declared but never used
     * }
     */

    // ────────────────────────────────────────────────────
    // RECOMMENDED OPTIONS
    // ────────────────────────────────────────────────────

    "strict": true,
    /*
     * Enable all strict type checking options
     * 
     * Includes:
     * - strictNullChecks
     * - strictFunctionTypes
     * - strictBindCallApply
     * - strictPropertyInitialization
     * - noImplicitAny
     * - noImplicitThis
     * - alwaysStrict
     * 
     * Recommended for all projects
     */

    "jsx": "react-jsx",
    /*
     * JSX support for React
     * 
     * Only needed for React projects
     * Remove for Node.js backend
     */

    "verbatimModuleSyntax": true,
    /*
     * Strict import/export syntax
     * 
     * Forces explicit type imports:
     * import type { User } from './types';
     * 
     * Prevents accidental runtime imports of types
     */

    "isolatedModules": true,
    /*
     * Each file must be valid standalone
     * 
     * Required for:
     * - Babel
     * - esbuild
     * - swc
     * 
     * Prevents TypeScript-specific features
     * that don't work in other transpilers
     */

    "noUncheckedSideEffectImports": true,
    /*
     * Warn about imports with side effects
     * 
     * import './polyfill';  // Warning
     * 
     * Forces explicit declaration of intent
     */

    "moduleDetection": "force",
    /*
     * Treat all files as modules
     * 
     * Even without import/export,
     * files are treated as modules
     * 
     * Prevents global scope pollution
     */

    "skipLibCheck": true
    /*
     * Skip type checking of .d.ts files
     * 
     * Benefits:
     * - Faster compilation
     * - Ignore third-party library errors
     * 
     * Recommended: true (unless debugging lib types)
     */
  }
}
```

### Complete Example Setup

**Directory structure:**

```
my-node-api/
├── src/
│   ├── index.ts
│   ├── routes/
│   │   └── users.ts
│   └── utils/
│       └── db.ts
├── package.json
├── tsconfig.json
└── .gitignore
```

**tsconfig.json:**

```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    
    "module": "NodeNext",
    "target": "ES2022",
    "lib": ["ES2022"],
    "types": ["node"],
    
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,
    
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**package.json:**

```json
{
  "name": "my-node-api",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "tsx watch src/index.ts",
    "type-check": "tsc --noEmit"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "tsx": "^4.7.0",
    "typescript": "^5.3.0"
  }
}
```

**.gitignore:**

```
node_modules/
dist/
*.log
.env
```

**Build and run:**

```bash
# Install dependencies
npm install

# Development (no dist/ needed)
npm run dev

# Production build
npm run build

# Run production
npm start

# Type check only (no output)
npm run type-check
```


## Summary

**Key Concepts:**

1. **tsconfig.json controls compilation**
   - Where source files are (rootDir)
   - Where output goes (outDir)
   - What JS version to emit (target)
   - What module system to use (module)

2. **dist/ folder is auto-generated**
   - Created by `tsc` command
   - Mirrors src/ structure
   - Contains .js, .d.ts, .js.map files
   - Should be in .gitignore

3. **Choose target based on runtime**
   - Node.js 18+: ES2022
   - Node.js 16: ES2021
   - Modern browsers: ES2020
   - Legacy support: ES5

4. **Automate with scripts**
   - `npm run dev` for development
   - `npm run build` for production
   - Use tsx/ts-node for fast iteration
   - Watch mode for auto-rebuild

5. **Node.js compatibility**
   - Install @types/node
   - Match target to Node version
   - Use "nodenext" module for ESM support
