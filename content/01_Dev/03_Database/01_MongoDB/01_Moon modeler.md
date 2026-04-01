---
---



> **Subject:** MongoDB
> **Topic Type:** Concept / Process / Architecture / Example  
> **Related Topics:** 

##  Why It’s Useful in MERN

When you work with MongoDB + Mongoose in the MERN stack, defining schemas manually can get messy as the app grows.

Example:

```jsx
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

```

In **Moon Modeler**, you do this **visually**:

- Draw a **User** collection box
- Add fields (`name`, `email`, `password`)
- Define **relationships** (like one-to-many with `Posts`)
- Export ready-to-use **Mongoose models** or **MongoDB JSON schemas**


##  Example Workflow for MERN

1. **Open Moon Modeler**
2. Create a **New MongoDB Project**
3. Add collections:
    - `User`
    - `Joke`
    - `Comment`
4. Set fields (types, required, unique, etc.)
5. Define relationships (e.g., `User → Joke` as 1:N)
6. Click **“Code Preview” → “Export Mongoose Schema”**
7. Paste the exported code into your `/models` folder in Node/Express.


##  Alternatives

If you want to explore others:

- **DrawSQL** → online ERD tool (no Mongoose export)
- **Hackolade** → professional NoSQL modeling (similar to Moon Modeler)
- **DbSchema** → cross-platform DB designer

