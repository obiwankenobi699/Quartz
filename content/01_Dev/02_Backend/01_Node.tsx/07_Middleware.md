---
---
> **Subject:** Node.js
> **Topic Type:** Concept / Process / Architecture / Example  
> **Related Topics:** 


## ⚙️ What is Middleware?

> Middleware are functions that sit between the client request 🧍♂️ and the server response 🖥️ in an Express app.
> 

They can:

- Inspect, modify, or reject the request.
- Add or remove data.
- Handle authentication, parsing, logging, etc.


## 🧱 **Middleware in Express**

Express uses middleware functions in a **stack-like flow**:

```jsx
app.use(middleware1);
app.use(middleware2);
app.get('/', handler);

```

Each middleware can:

- Process `req` (request) and `res` (response)
- Call `next()` → to move to the next middleware
- Or send a response directly (ending the cycle)


## 🌐 **CORS (Cross-Origin Resource Sharing)**

### 🧩 What it does:

CORS allows or restricts requests from **other domains** (e.g., your frontend and backend are separate).

### ⚙️ Install:

```bash
npm install cors

```

### 🧠 Use:

```jsx
import cors from "cors";
app.use(cors({
  origin: "http://localhost:5173", // allowed frontend
  credentials: true,               // allows cookies/auth headers
}));

```

### 📘 Features:

| Option | Description |
| --- | --- |
| `origin` | Allow specific domain(s) |
| `methods` | Allowed HTTP methods (`GET,POST,PUT,DELETE`) |
| `credentials` | Allow cookies or auth headers |
| `allowedHeaders` | Specify allowed request headers |


## 📑 **express.urlencoded()**

### 🧩 What it does:

Parses **form data** (from HTML forms) — e.g., `application/x-www-form-urlencoded`.

```jsx
app.use(express.urlencoded({ extended: true }));

```

### ⚙️ Options:

| Option | Description |
| --- | --- |
| `extended: true` | Uses the `qs` library → allows nested objects `{ user: { name: "Mukul" }}` |
| `extended: false` | Uses `querystring` library → simple key-value parsing |


## 🍪 **cookie-parser**

### 🧩 What it does:

Parses cookies from client requests → adds them to `req.cookies`.

```bash
npm install cookie-parser

```

```jsx
import cookieParser from "cookie-parser";
app.use(cookieParser());

```

### 💡 Example:

```jsx
app.get("/read-cookie", (req, res) => {
  console.log(req.cookies); // { token: 'abc123' }
  res.send("Cookie read");
});

```


## 🧭 **Overall Request-Response Flow**

```
      ┌────────────┐
      │  Client 🧑  │
      └──────┬─────┘
             │  HTTP Request
             ▼
┌──────────────────────────────────────────────┐
│              Express Middleware Stack        │
│----------------------------------------------│
│ cors() → express.json() → express.urlencoded()│
│ cookie-parser() → static() → route handler    │
└──────────────────────────────────────────────┘
             │
             ▼
     ┌────────────┐
     │  Route     │
     │  app.get() │
     │  app.post()│
     └──────┬─────┘
             │
             ▼
     ┌────────────┐
     │  Response  │
     │  (res.send)│
     └────────────┘

```


## 🧩 Example Setup

```jsx
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

// ROUTES
app.get("/", (req, res) => res.send("GET route hit ✅"));
app.post("/data", (req, res) => res.json(req.body));

export { app };

```

