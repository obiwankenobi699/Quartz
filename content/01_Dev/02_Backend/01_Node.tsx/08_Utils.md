---
---
> **Subject:** 
> **Topic Type:** Concept / Process / Architecture / Example  
> **Related Topics:** 


## 🧩 Problem: Repeating `try/catch` in async routes

### ❌ Old way (messy)

```jsx
app.get("/users", async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    next(err); // must manually pass errors
  }
});

```

You’ll end up writing this in *every* route.


### 🧱 Code Example

```jsx
// utils/asyncHandler.js

import type { Request,Response,NextFunction } from "express"
const asyncHandler = (fn:(req:Request,res:Response,next:NextFunction)=> Promise<any>) =>{

return (req:Request,res:Response,next:NextFunction)=>{

Promise.resolve(fn(req,res,next)).catch(next);
	}

 }
export default asyncHandler;
```


### 📘 Why it works

- The `asyncHandler` returns a **new function** that Express can call.
- If your async route throws an error or rejects a Promise, `.catch(next)` ensures the error goes to your error-handling middleware instead of crashing the app.


### 🧩 Example with Error Middleware

```jsx
// app.js
import express from "express";
import { asyncHandler } from "./utils/asyncHandler.js";

const app = express();

app.get("/", asyncHandler(async (req, res) => {
  throw new Error("🔥 Something broke");
}));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

app.listen(3000, () => console.log("✅ Server running"));

```


Here’s the **correct and polished version** of your async handler wrapper:


### 🧠 Explanation

| Line | Meaning |
| --- | --- |
| `const asyncHandler = (fn) =>` | Takes a function (your route/controller). |
| `async (req, res, next)` | Returns an async middleware. |
| `await fn(req, res, next)` | Executes your route code. |
| `catch (err)` | Catches any thrown or rejected errors. |
| `res.status(500).json(...)` | Sends error as a JSON response (so app doesn’t crash). |


### ⚙️ Pro Tip — Combine With Global Error Handler

Instead of sending the error here, you can also **forward it to your error middleware**:

```jsx
const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    next(err); // pass error to global handler
  }
};

```

Then define this once:
