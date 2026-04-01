---
---


> **Subject:** {{Subject}}  
> **Topic Type:** Concept / Process / Architecture / Example  
> **Related Topics:** 


## 🧩 1. Without Dynamic Query (Static Limit)

Here you just tell the backend to give 2 jokes by default.

### 🔹 Frontend (React)

```tsx
useEffect(() => {
  async function getJokes() {
    const response = await axios.get('/api/jokes'); // no query
    setJokes(response.data);
  }
  getJokes();
}, []);

```

### 🔹 Backend (Express)

```jsx
app.get('/api/jokes', (req, res) => {
  const jokes = [
    { id: 1, title: "Broken Pencil", joke: "Why did the pencil go to the principal's office? It broke the rules." },
    { id: 2, title: "Math Book", joke: "Why was the math book sad? It had too many problems." },
    { id: 3, title: "Skeleton", joke: "Why don’t skeletons fight each other? They don’t have the guts." },
  ];

  res.json(jokes.slice(0, 2)); // ✅ only first 2 jokes
});

```

✅ Always returns 2 jokes.

