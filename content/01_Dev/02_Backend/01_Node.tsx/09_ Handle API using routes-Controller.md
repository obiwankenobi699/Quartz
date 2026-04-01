---
---
> **Subject:** {{Subject}}  
> **Topic Type:** Concept / Process / Architecture / Example  
> **Related Topics:** 


## 1 app.ts — Main Express Setup

```tsx
import express from "express";
export const app = express();
app.use(express.json());

// Import routes
import userRouter from "./routes/user.routes.ts";
app.use('/api', userRouter);

```

### ✅ What’s happening:

- `express()` → creates the Express app instance.
- `app.use(express.json())` → allows parsing of JSON request bodies (required for POST requests).
- `userRouter` → imported from `routes/user.routes.ts`.
- `app.use('/api', userRouter)` → mounts all routes from `userRouter` under the `/api` prefix.

### 💡 Why we used `app.use('/api', userRouter)`

This makes your route modular and organized.

Without prefix:

→ You would have to define every route (like `/api/v1/user/joke`) directly in `app.ts`.

With prefix `/api`:

→ You can just define subpaths (`/joke`, `/user`, etc.) inside `user.routes.ts`, and all of them will be automatically accessible under `/api/...`.

Example:

If inside `user.routes.ts` you define `/joke`,

then full URL becomes → **`http://localhost:3000/api/joke`**

This keeps your `app.ts` clean and scalable.


## 3 user.routes.ts — Router Layer

```tsx
import { Router } from "express";
import joke from "../controllers/user.controller.ts";

const router = Router();
router.route('/joke').post(joke);

export default router;

```

### ✅ What’s happening:

- `Router()` → creates a mini Express app for user-specific routes.
- `router.route('/joke').post(joke)` → defines a POST route `/api/joke`.
- The handler function `joke` is imported from the controller.

### 💡 Why we did it:

- **Keeps routes modular** — each feature (user, auth, products, etc.) can have its own route file.
- Easier to maintain large codebases.
- Avoids putting all route logic in `app.ts`.


## 🧠 Full Flow Summary

| Layer | File | Responsibility | Example |
| --- | --- | --- | --- |
| **App (Entry)** | `app.ts` | Starts the server, mounts routes | `/api` prefix added |
| **Router (Paths)** | `routes/user.routes.ts` | Defines endpoints (like `/joke`) | `/api/joke` |
| **Controller (Logic)** | `controllers/user.controller.ts` | Handles actual business logic | Send jokes array |
| **Utility (Helper)** | `utils/asyncHandler.ts` | Handles async errors cleanly | Avoid try-catch |

