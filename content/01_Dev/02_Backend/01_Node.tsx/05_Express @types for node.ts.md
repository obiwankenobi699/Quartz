---
---

# 🚀 05_Express for node.ts

> **Framework / Library:** Express.js  
> **Language:** {{Language}}  
> **Category:** {{Category}}  
> **Level:** Beginner / Intermediate / Advanced


## 1 Folder structure

Assume your project looks like this:

```
Backend_Node.js/
│
├─ src/
│   ├─ server.ts
│
├─ views/
│   └─ index.ejs
│
├─ .env
├─ package.json
├─ tsconfig.json

```


## 3 tsconfig.json (TypeScript config)

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",                // Modern JS version
    "module": "ESNext",                // For ESM modules
    "moduleResolution": "node",        // Resolve node_modules correctly
    "esModuleInterop": true,           // Allows `import express from "express"`
    "forceConsistentCasingInFileNames": true,
    "strict": true,                     // Type-checking enabled
    "skipLibCheck": true                // Skip checking node_modules types
  },
  "include": ["src/**/*"]
}

```


## 5 server.ts file explained

```tsx
import express from "express";                 // Web framework
import path from "path";                       // Node module for file paths
import { fileURLToPath } from "url";          // Convert URL to file path (ESM)
import dotenv from "dotenv";                   // Load .env

dotenv.config();                               // Reads .env and sets process.env

// Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();                          // Create express app

// Set EJS as template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views")); // Path to views folder

// Define route
app.get("/", (req, res) => {
  res.render("index");                          // Render index.ejs
});

// Get PORT from environment variable
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

```

**Key points:**

1. `dotenv.config()` → Loads `.env` variables like `PORT`
2. `fileURLToPath(import.meta.url)` → Needed in ES modules because `__dirname` doesn’t exist by default
3. `app.set("view engine", "ejs")` → Tells Express to render `.ejs` templates
4. `process.env.PORT || 3000` → Fallback if PORT not defined in `.env`


## 7 Install everything for TypeScript

Full command list:

```bash
npm install express ejs dotenv
npm install --save-dev typescript @types/node @types/express ts-node nodemon

```

Optional: If you use **ESLint**, you can add:

```bash
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

```


If you want, I can **write the final fully working `server.ts` + `tsconfig.json` + `.env` + package.json scripts** so you can copy-paste and it just works.

Do you want me to do that?
