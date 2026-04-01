---
---

> **Subject:** Mongo
> **Topic Type:** Concept / Process / Architecture / Example  
> **Related Topics:** 


## 🧩 2 Reference Fields in Mongoose

To “link” one document to another, we use the field:

```jsx
ref: 'ModelName'

```

and store the **ObjectId** of the related document.

Example:

```jsx
author: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User'
}

```

✅ Here:

- `ObjectId` = unique ID of the related document
- `ref: 'User'` = name of the model it refers to (must match `mongoose.model('User')`)


## 🧩 4 Inserting Referenced Documents

Example:

```jsx
const user = await User.create({ name: 'Mukul', email: 'mukul@example.com' });

const joke = await Joke.create({
  title: 'Broken Pencil',
  joke: 'It’s pointless.',
  author: user._id, // reference to Mukul
});

```

In MongoDB, your `jokes` collection will look like:

```json
{
  "_id": "66e...",
  "title": "Broken Pencil",
  "joke": "It’s pointless.",
  "author": "66d..."
}

```

Here `"66d..."` is the user’s `_id` (reference).


##  6 Types of Relationships in MongoDB / Mongoose

| Relationship | Description | Example |
| --- | --- | --- |
| **One-to-One (1:1)** | One user has one profile | `User → Profile` |
| **One-to-Many (1:N)** | One user can post many jokes | `User → Jokes` |
| **Many-to-Many (N:N)** | Many users can like many jokes | `User ↔ Joke` |


## 🧩 8 TL;DR Revision Notes

| Term | Meaning | Example |
| --- | --- | --- |
| **ObjectId** | Unique ID MongoDB gives each document | `mongoose.Schema.Types.ObjectId` |
| **ref** | References another model name | `{ ref: 'User' }` |
| **populate()** | Fetches full document instead of just ID | `.populate('author')` |
| **1:1** | One-to-one | User → Profile |
| **1:N** | One-to-many | User → Jokes |
| **N:N** | Many-to-many | Users ↔ Jokes |

