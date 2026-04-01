---
---

> **Subject:** Mongo
> **Topic Type:** Concept / Process / Architecture / Example  
> **Related Topics:** 


### **1. Importing Required Modules**

```jsx
import mongoose from "mongoose";
import { DB_NAME } from "../constants.ts";

```

- `mongoose`: ODM (Object Data Modeling) library for MongoDB — simplifies data interaction.
- `DB_NAME`: a constant variable imported from another file (e.g., `"myDatabase"`).


### **3. Success Log Message**

```jsx
console.log(`✅ MongoDB connected! Host: ${connectionInstance.connection.host}`);

```

- Prints a confirmation message once MongoDB connects successfully.
- `connectionInstance.connection.host` shows the connected cluster host (useful for debugging).


### **5. Exporting Function**

```jsx
export default connectDB;

```

- Makes the `connectDB` function reusable in other files (like `index.ts` or `server.ts`).


### **1. Import Dependencies**

```jsx
import connectDB from "./db/db.ts";
import dotenv from "dotenv";
import { app } from "./app.ts";

```

- `dotenv`: loads environment variables from `.env` file.
- `app`: Express app imported from another module.


### **3. Start Server After DB Connection**

```jsx
connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on <http://localhost$>{process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('DB cant handshake with server');
  });

```

- **`.then()`**: runs only after MongoDB successfully connects.
    - Starts Express server on the given `PORT`.
- **`.catch()`**: if DB connection fails, prints an error message (doesn’t start server).

