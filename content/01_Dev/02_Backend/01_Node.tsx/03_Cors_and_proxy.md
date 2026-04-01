---
---


> **Subject:** {{Subject}}  
> **Topic Type:** Concept / Process / Architecture / Example  
> **Related Topics:** 


## **1 CORS (Cross-Origin Resource Sharing)**

**Definition:**

Browser security mechanism that **blocks requests from a different origin** (`protocol + domain + port`) than the webpage’s origin.

**Problem Example:**

- React frontend: `http://localhost:5173`
- Express backend: `http://localhost:5000`
- Fetching `http://localhost:5000/api/data` → blocked by browser → **CORS error**.

**How it works:**

- Simple requests: Browser sends request → backend must respond with `Access-Control-Allow-Origin`.
- Preflight requests (`POST`, `PUT`, custom headers): Browser sends `OPTIONS` first to check permission.

**Express solution:**

```jsx
const cors = require("cors");
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
}));

```

- `origin` → allowed frontend URL
- `credentials: true` → allow cookies/auth headers


## **3 Quick Revision Points**

- **CORS:** Browser prevents cross-origin requests. Fix via **backend headers** (`cors` middleware).
- **Proxy:** Dev server forwards requests to backend. Fix via **Vite proxy config**.
- **404 Error:** Often caused by **wrong URL or missing backend route**, not CORS itself.
- **Best Practice:**
    - Dev: Use **proxy** for convenience
    - Prod: Enable **CORS on backend** only for allowed frontend domains


## **Whitelisting**

**Definition:**

Whitelisting is the practice of **allowing only specific trusted origins, IPs, or domains** to access a resource, while **blocking all others**.

**In CORS context:**

- You don’t allow all websites to call your backend ().
- You only allow requests from **trusted frontend origins**.

**Example in Express:**

```jsx
const cors = require("cors");

const whitelist = ["http://localhost:5173", "https://myfrontend.com"];
const corsOptions = {
  origin: function(origin, callback){
    if(!origin || whitelist.indexOf(origin) !== -1){
      callback(null, true); // allow
    } else {
      callback(new Error("Not allowed by CORS")); // block
    }
  },
  credentials: true
};

app.use(cors(corsOptions));

```

✅ Explanation:

- Only requests from `localhost:5173` or `myfrontend.com` are allowed.
- Any other origin → blocked by CORS.


**Quick Revision Note:**

- **CORS** = browser security for cross-origin requests.
- **Proxy** = dev server forwards requests to avoid CORS.
- **Whitelisting** = allow only trusted origins to access your API.

