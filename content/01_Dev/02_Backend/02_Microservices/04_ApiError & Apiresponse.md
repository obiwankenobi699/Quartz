---
---


> **Subject:** {{Subject}}  
> **Topic Type:** Concept / Process / Architecture / Example  
> **Related Topics:** 


## 🧩 Step 2 — Update `asyncHandler` to Work With It

📁 `src/utils/asyncHandler.js`

```jsx
const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    next(err); // pass to global error middleware
  }
};

export default asyncHandler;

```


## 🧩 Step 4 — Use in Controllers

```jsx
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

```


## ✅ Advantages

- Clean controller code (no try/catch)
- Standardized JSON error format
- Reusable error class for any module
- Works with async/await + Express flow

