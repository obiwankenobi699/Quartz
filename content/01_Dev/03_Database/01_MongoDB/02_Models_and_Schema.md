---
---


> **Subject:** MongoDB
> **Topic Type:** Concept / Process / Architecture / Example  
> **Related Topics:** 

## 🧩 2 Importing Mongoose

```jsx
import mongoose from 'mongoose';

```

This imports the **Mongoose** library so you can define schemas and connect to MongoDB.


## 🧩 4 What is `mongoose.model(name, schema)`?

`mongoose.model()` compiles your **schema** into a **Model** —
which is a **class** that gives you methods to interact with the database.

### Example:

```jsx
const Joke = mongoose.model('Joke', jokeSchema);

```

✅ **Explanation:**

- `'Joke'` → The **singular name** of your MongoDB collection.
(Mongoose automatically pluralizes it → **"jokes"** collection)
- `jokeSchema` → The structure (rules) we defined above

Now you can use `Joke` to:

- **Create** a new joke
- **Find** jokes
- **Update** jokes
- **Delete** jokes


## 🧩 6 Summary Notes for Revision

| Concept | Description | Example |
| --- | --- | --- |
| **Schema** | Blueprint for collection’s structure | `mongoose.Schema({ title: String })` |
| **Model** | Compiled schema that interacts with DB | `mongoose.model('Joke', jokeSchema)` |
| **Instance** | Actual document created from a model | `new Joke({ title: '...' })` |
| **Save()** | Stores the instance in the DB | `newJoke.save()` |



## 🧩 2 Example: Full Schema with Properties

```jsx
import mongoose from 'mongoose';

const jokeSchema = new mongoose.Schema({
  title: {
    type: String,         // field data type
    required: true,       // must be provided
    unique: true,         // no two jokes can have the same title
    trim: true,           // removes spaces from start & end
    minlength: 3,         // minimum characters allowed
    maxlength: 100        // maximum characters allowed
  },
  joke: {
    type: String,
    required: [true, 'Joke text is required'], // custom error message
  },
  author: {
    type: String,
    default: 'Anonymous', // default value if not provided
  },
  category: {
    type: String,
    enum: ['Dad', 'Dark', 'Programming', 'Puns'], // restrict values
  },
  likes: {
    type: Number,
    default: 0,
    min: 0, // cannot be negative
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true, // cannot be changed later
  },
});

```

✅ Then compile it into a model:

```jsx
const Joke = mongoose.model('Joke', jokeSchema);
export default Joke;

```


## 🧩 4 Example of a Validation Error

If someone tries to insert:

```jsx
const badJoke = new Joke({
  title: 'Hi',
  joke: ''
});

await badJoke.save();

```

Mongoose will throw:

```
ValidationError: Joke validation failed:
title: Path `title` (`Hi`) is shorter than the minimum allowed length (3).
joke: Path `joke` is required.

```



