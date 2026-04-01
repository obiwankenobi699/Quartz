---
---





Sure — here’s a **TypeScript example** showing how to use **Promises** and **Axios** to fetch and print 5 random jokes from a Dad Jokes API.
It demonstrates how asynchronous operations (like API calls) work with Promises.


### 🧠 Explanation

1. **Promise Basics:**

   * A `Promise` in TypeScript represents a value that will be available **in the future** — either **resolved** (success) or **rejected** (error).
   * You can chain `.then()` for success and `.catch()` for error handling.

2. **`axios.get()`** returns a Promise.

   * When the API call succeeds → `.then()` runs with the response.
   * When it fails → `.catch()` runs with the error.

3. **`Promise.all()`** waits for all Promises in an array to finish — useful when calling an API multiple times.

4. **TypeScript Typing:**
[[10_Promise in Node.js and dns module]]
   * `Promise<string>` means the function returns a Promise that will eventually contain a string (the joke).
   * You could also use `async/await` syntax instead of `.then()` if you prefer.

