---
---


> **Subject:** {{Subject}}  
> **Topic Type:** Concept / Process / Architecture / Example  
> **Related Topics:** 
Excellent 🔥 — this is one of those topics that separates a **junior dev** from a **real backend engineer**.
Let’s break down **Mongoose hooks** and **middleware** clearly — what types exist, when they run, and how companies use them in production.


## ⚙️ Two Main Types of Middleware (Hooks)

| Type | Description | Example |
| --- | --- | --- |
| **Document Middleware** | Runs on *individual documents* — e.g. before/after saving, validating | `pre('save')`, `post('save')` |
| **Query Middleware** | Runs on *queries* — e.g. before/after `find`, `updateOne`, `deleteOne` | `pre('find')`, `post('find')` |


## 🔍 2. **Query Middleware**

These run on **query methods**, like:

- `find()`
- `findOne()`
- `updateOne()`
- `deleteOne()`
- `findOneAndUpdate()`

They **do not** have direct access to the document — instead, `this` refers to the **query object**.

### Common query hooks:

| Hook | Runs Before/After | Used For |
| --- | --- | --- |
| `pre('find')` | Before find query | Filter out soft-deleted docs |
| `pre('findOne')` | Before findOne query | Add default filters |
| `pre('updateOne')` | Before update | Modify update payload |
| `post('find')` | After find query | Log query results |
| `pre('findOneAndUpdate')` | Before update | Validate updates |

### Example:

```jsx
userSchema.pre('find', function(next) {
  this.where({ isDeleted: false }); // filter out soft-deleted users
  next();
});

```


## 🧩 4. **Model Middleware**

These hooks are attached to **static model methods** (like `insertMany`).

Example:

```jsx
userSchema.pre('insertMany', function(next, docs) {
  console.log('Inserting multiple users:', docs.length);
  next();
});

```


## 🚀 Real-World Use Cases (Used in Companies)

| Use Case | Type | Description |
| --- | --- | --- |
| 🔐 Password hashing | Document (`pre('save')`) | Automatically hash before save |
| 🧹 Cascade delete | Document (`pre('remove')`) | Delete related documents (e.g., user’s posts) |
| 🔍 Soft delete | Query (`pre('find')`) | Hide inactive or deleted records |
| 🧾 Audit logging | Post hooks | Record who changed what |
| 📊 Data consistency | Aggregate | Add global filters to pipelines |


## 🧠 Pro Tip:

You can register **global hooks** that apply to all models:

```jsx
mongoose.plugin(schema => {
  schema.pre('find', function(next) {
    this.where({ isDeleted: false });
    next();
  });
});

```


## 1 **Inbuilt Methods in Mongoose/MongoDB**

These are **predefined methods** that come with Mongoose models and documents.

### a) **Document Methods**

Run on individual document instances:

| Method | Description |
| --- | --- |
| `save()` | Saves the current document to DB |
| `validate()` | Validates schema rules before saving |
| `remove()` | Removes the document from DB |
| `update()` | Updates the document (deprecated: use `updateOne`) |
| `toObject()` | Converts document to plain JS object |
| `toJSON()` | Converts document to JSON (useful for APIs) |

**Example:**

```jsx
const user = new User({ name: 'Mukul', email: 'mukul@example.com' });
await user.save();          // inbuilt
await user.validate();      // inbuilt

```


## 2**Custom Methods in Mongoose**

^d916d9

These are **methods you define yourself** on:

### a) **Document Methods**

Run on a single document (instance method).

```jsx
// Define method
userSchema.methods.sayHello = function() {
  return `Hello, my name is ${this.name}`;
};

// Use method
const user = await User.findOne({ email: 'mukul@example.com' });
console.log(user.sayHello());  // Hello, my name is Mukul

```

✅ Use Cases:

- Password verification
- Formatting or transforming data
- Sending notifications


### c) **Virtuals**

Not exactly methods, but computed fields:

```jsx
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

const user = await User.findOne();
console.log(user.fullName); // John Doe

```


## 4 **Why Companies Use Custom Methods**

- Reusable business logic → reduces code duplication
- Cleaner controllers → move logic into models
- Adds abstraction → easy to maintain large apps
- Security → e.g., password comparison (`isPasswordCorrect`)

