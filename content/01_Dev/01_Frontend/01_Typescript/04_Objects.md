---
---
# TypeScript Objects Complete Guide

**From Basics to Advanced Object Typing**


## What is an Object

### Object Basics

```
┌─────────────────────────────────────────────────┐
│           OBJECT STRUCTURE                      │
├─────────────────────────────────────────────────┤
│                                                 │
│  Object = Collection of key-value pairs         │
│                                                 │
│  {                                              │
│    key1: value1,    ← Property                  │
│    key2: value2,    ← Property                  │
│    key3: value3     ← Property                  │
│  }                                              │
│                                                 │
│  Key (Property name) : Value (Any type)         │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Simple Object

```typescript
// JavaScript object
const person = {
    name: "mukul",
    age: 21,
    isStudent: true
};

// Access properties
console.log(person.name);      // mukul
console.log(person["age"]);    // 21
```

### Memory Representation

```
Stack (Reference)          Heap (Actual Data)
─────────────────          ──────────────────
person: 0x1234    ───────> {
                             name: "mukul",
                             age: 21,
                             isStudent: true
                           }

Objects stored in heap memory
Variables hold reference (address)
```


## Property Inference

### Automatic Type Inference

```typescript
// TypeScript infers type from value
const user = {
    name: 'mukul',    // Inferred: string
    age: 21,          // Inferred: number
    active: true      // Inferred: boolean
};

// Hover over 'user' in IDE:
// const user: {
//     name: string;
//     age: number;
//     active: boolean;
// }
```

### Inference Flow

```
Declaration                    Inference
───────────                    ─────────
const obj = {
    x: 5           ──────────> x: number
    y: 'hello'     ──────────> y: string
    z: true        ──────────> z: boolean
}

TypeScript analyzes values and assigns types
```

### When Inference Works

```typescript
// Good inference
const point = { x: 10, y: 20 };
// Type: { x: number; y: number }

// Good inference
const config = {
    debug: true,
    port: 3000,
    host: 'localhost'
};
// Type: { debug: boolean; port: number; host: string }

// No inference (needs annotation)
let data;  // Type: any
data = { name: 'mukul' };
```

### Explicit vs Inferred

```typescript
// Inferred (simple)
const product = {
    name: 'Laptop',
    price: 50000
};

// Explicit (complex or reusable)
type Product = {
    name: string;
    price: number;
    category?: string;
};

const product2: Product = {
    name: 'Laptop',
    price: 50000
};
```


## Optional & Readonly Properties

### Optional Properties (?)

```typescript
type Chai = {
    name: string;
    ishot?: boolean;    // Optional
    price: number;
};

// Valid: ishot not provided
const chai1: Chai = {
    name: 'masala',
    price: 30
};

// Also valid: ishot provided
const chai2: Chai = {
    name: 'ginger',
    ishot: true,
    price: 25
};
```

**Syntax:**

```
property?: type

Means: property can be present OR undefined
```

### Readonly Properties

```typescript
type Chai = {
    name: string;
    readonly price: "23";  // Literal + readonly
};

const masala: Chai = {
    name: 'masala',
    price: "23"
};

// Error: Cannot modify readonly
// masala.price = "30";

// Can modify non-readonly
masala.name = 'sweet';  // ✓
```

**Readonly behavior:**

```
┌─────────────────────────────────────────────────┐
│         READONLY PROPERTY                       │
├─────────────────────────────────────────────────┤
│                                                 │
│  Declaration:  Can set value                    │
│  const obj = { readonly x: 10 };  ✓             │
│                                                 │
│  After creation:  Cannot modify                 │
│  obj.x = 20;  ✗  Error                          │
│                                                 │
│  TypeScript enforces at compile time only       │
│  JavaScript has no readonly at runtime          │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Combining Optional & Readonly

```typescript
type Config = {
    readonly apiKey: string;     // Required + immutable
    port?: number;               // Optional + mutable
    readonly debug?: boolean;    // Optional + immutable
};

const config: Config = {
    apiKey: 'abc123',
    debug: true
};

// config.apiKey = 'xyz';  // Error: readonly
config.port = 3000;        // OK: optional but mutable
// config.debug = false;   // Error: readonly
```


## Array of Objects

### Basic Array of Objects

```typescript
// Type for single object
type Tea = {
    name: string;
    price: number;
};

// Array of objects (Method 1)
const teas: Tea[] = [
    { name: 'masala', price: 30 },
    { name: 'ginger', price: 25 },
    { name: 'green', price: 20 }
];

// Array of objects (Method 2)
const teas2: Array<Tea> = [
    { name: 'masala', price: 30 }
];
```

### Inline Type in Array

```typescript
// Define type inline
const users: { name: string; age: number }[] = [
    { name: 'mukul', age: 21 },
    { name: 'ravi', age: 25 }
];
```

### Operations on Object Arrays

```typescript
type Product = {
    id: number;
    name: string;
    price: number;
};

const products: Product[] = [
    { id: 1, name: 'Laptop', price: 50000 },
    { id: 2, name: 'Phone', price: 30000 },
    { id: 3, name: 'Tablet', price: 20000 }
];

// Map
const names = products.map(p => p.name);
// string[]

// Filter
const expensive = products.filter(p => p.price > 25000);
// Product[]

// Find
const laptop = products.find(p => p.id === 1);
// Product | undefined

// Reduce
const total = products.reduce((sum, p) => sum + p.price, 0);
// number
```

### Nested Objects in Array

```typescript
type Order = {
    id: number;
    user: {
        name: string;
        email: string;
    };
    items: {
        name: string;
        quantity: number;
    }[];
};

const orders: Order[] = [
    {
        id: 1,
        user: {
            name: 'mukul',
            email: 'mukul@example.com'
        },
        items: [
            { name: 'Laptop', quantity: 1 },
            { name: 'Mouse', quantity: 2 }
        ]
    }
];

// Access nested properties
console.log(orders[0].user.name);
console.log(orders[0].items[0].quantity);
```


## Cheat Sheet

### Object Type Syntax

```typescript
// Inline type
let obj: { name: string; age: number } = { name: 'x', age: 1 };

// Type alias
type User = { name: string; age: number };
let user: User = { name: 'x', age: 1 };

// Interface
interface User { name: string; age: number }
let user: User = { name: 'x', age: 1 };

// Optional property
type User = { name: string; age?: number };

// Readonly property
type User = { readonly id: number; name: string };

// Method in object
type User = { name: string; greet(): string };
type User = { name: string; greet: () => string };
```

### Array of Objects

```typescript
// Method 1
type Item = { id: number; name: string };
const items: Item[] = [{ id: 1, name: 'x' }];

// Method 2
const items: Array<Item> = [{ id: 1, name: 'x' }];

// Inline
const items: { id: number; name: string }[] = [];
```

### Utility Types Quick Reference

```typescript
type User = { name: string; age: number; email: string };

// All optional
Partial<User>
// { name?: string; age?: number; email?: string }

// All required
Required<Partial<User>>
// { name: string; age: number; email: string }

// Pick specific
Pick<User, 'name' | 'email'>
// { name: string; email: string }

// Omit specific
Omit<User, 'email'>
// { name: string; age: number }

// All readonly
Readonly<User>
// { readonly name: string; readonly age: number; readonly email: string }
```

### Common Patterns

```typescript
// Object as dictionary
type Dictionary = { [key: string]: number };
const scores: Dictionary = { math: 90, english: 85 };

// Record utility
type Scores = Record<string, number>;
const scores: Scores = { math: 90, english: 85 };

// Index signature with specific keys
type Config = {
    apiKey: string;
    [key: string]: string | number;
};

// Nested objects
type User = {
    profile: {
        name: string;
        avatar: string;
    };
    settings: {
        theme: 'light' | 'dark';
        notifications: boolean;
    };
};
```

