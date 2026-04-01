---
---
## Table of Contents

1. [Types vs Interfaces](https://claude.ai/chat/607261bc-c435-4531-ba14-e695a595220c#types-vs-interfaces)
2. [Type Annotation vs Inference](https://claude.ai/chat/607261bc-c435-4531-ba14-e695a595220c#type-annotation-vs-inference)
3. [Type Narrowing](https://claude.ai/chat/607261bc-c435-4531-ba14-e695a595220c#type-narrowing)
4. [Type Guards](https://claude.ai/chat/607261bc-c435-4531-ba14-e695a595220c#type-guards)
5. [Type Assertions](https://claude.ai/chat/607261bc-c435-4531-ba14-e695a595220c#type-assertions)
6. [Union Types](https://claude.ai/chat/607261bc-c435-4531-ba14-e695a595220c#union-types)
7. [any vs unknown](https://claude.ai/chat/607261bc-c435-4531-ba14-e695a595220c#any-vs-unknown)
8. [Discriminated Unions](https://claude.ai/chat/607261bc-c435-4531-ba14-e695a595220c#discriminated-unions)
9. [React Type Patterns](https://claude.ai/chat/607261bc-c435-4531-ba14-e695a595220c#react-type-patterns)
10. [Cheat Sheet](https://claude.ai/chat/607261bc-c435-4531-ba14-e695a595220c#cheat-sheet)


## Type Annotation vs Inference

### Visual Difference

```
┌─────────────────────────────────────────────────────┐
│      ANNOTATION vs INFERENCE                        │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Annotation (Explicit)                              │
│  ─────────────────────                              │
│  let naam: string = 'mukul';                        │
│           └──┬──┘                                   │
│              └── You tell TypeScript the type       │
│                                                     │
│  Inference (Automatic)                              │
│  ─────────────────────                              │
│  let naam = 'mukul';                                │
│             └──┬──┘                                 │
│                └── TypeScript figures out type      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Examples from Your Code

```typescript
// Inference (TypeScript guesses)
let naam = 'mukul';       // Inferred as: string
let nam = 1234;           // Inferred as: number
let nm = 'mukul123';      // Inferred as: string

// Annotation (You specify)
let naaam: string = 'mukul';
let age: number = 21;
let active: boolean = true;

// Complex type annotation
type Name = {
    naam: string;
    nam: any;
    nm: string | number;
};

let person: Name = {
    naam: 'mukul',
    nam: 123,
    nm: 'mukul123'
};
```

### When to Annotate

```
ALWAYS ANNOTATE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Function parameters
- Function return types
- When inference is wrong
- When type is complex

LET INFERENCE WORK:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Simple variable assignments
- Constants
- When type is obvious
```

```typescript
// Good: Annotation for functions
function greet(name: string): string {
    return `Hello ${name}`;
}

// Good: Inference for simple values
const count = 5;  // number
const message = 'hello';  // string

// Bad: Unnecessary annotation
const count: number = 5;  // Redundant

// Good: Annotation for unclear types
const data: User[] = [];  // Empty array needs type
```


## Type Guards

### Built-in Type Guards

```
┌─────────────────────────────────────────────────────┐
│         BUILT-IN TYPE GUARDS                        │
├─────────────────────────────────────────────────────┤
│                                                     │
│  typeof     - Primitive types                       │
│  instanceof - Class instances                       │
│  in         - Property existence                    │
│  Array.isArray() - Array check                      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**typeof:**

```typescript
function process(value: string | number) {
    if (typeof value === 'string') {
        return value.trim();
    }
    return value * 2;
}
```

**instanceof:**

```typescript
function handle(error: Error | string) {
    if (error instanceof Error) {
        console.log(error.message);
    } else {
        console.log(error);
    }
}
```

**in operator:**

```typescript
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
    if ('swim' in animal) {
        animal.swim();
    } else {
        animal.fly();
    }
}
```

### Custom Type Guards

```typescript
// User-defined type guard
function isString(value: unknown): value is string {
    return typeof value === 'string';
}

function process(value: unknown) {
    if (isString(value)) {
        // TypeScript knows value is string
        console.log(value.toUpperCase());
    }
}
```

**Pattern:**

```
function isType(value: unknown): value is TargetType {
    return /* check logic */;
}
         ↑                       ↑
         └── Type predicate      └── Return boolean
```

### Advanced Type Guards

```typescript
// Array type guard
function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every(item => typeof item === 'string');
}

// Object type guard
type User = { name: string; age: number };

function isUser(value: unknown): value is User {
    return (
        typeof value === 'object' &&
        value !== null &&
        'name' in value &&
        'age' in value &&
        typeof (value as User).name === 'string' &&
        typeof (value as User).age === 'number'
    );
}

// Usage
const data: unknown = JSON.parse('{"name":"mukul","age":21}');

if (isUser(data)) {
    // data is User here
    console.log(data.name.toUpperCase());
}
```


## Union Types

### Basic Unions

```typescript
// Simple union
let id: string | number;
id = 'abc123';  // OK
id = 123;       // OK
// id = true;   // Error

// Literal union
type Size = 'small' | 'medium' | 'large';
let size: Size = 'medium';

// Union with null/undefined
type Name = string | null | undefined;
let name: Name;
name = 'mukul';
name = null;
name = undefined;
```

### Working with Unions

```typescript
function process(value: string | number) {
    // Error: Property 'toUpperCase' does not exist on type 'number'
    // console.log(value.toUpperCase());
    
    // Must narrow first
    if (typeof value === 'string') {
        console.log(value.toUpperCase());
    } else {
        console.log(value * 2);
    }
}
```

### Union Arrays

```typescript
// Array of mixed types
let mixed: (string | number)[] = [1, 'two', 3, 'four'];

// Array OR string
let value: string[] | string;
value = 'hello';
value = ['hello', 'world'];
```


## Discriminated Unions

### Your Chai Example Explained

```typescript
type Masala = {
    type: 'masala';           // Discriminant (literal type)
    madeby: 'ravi' | 'vivaan';
};

type Sweet = {
    type: 'sweet';            // Discriminant (literal type)
    madeby: 'mukul' | 'kuki';
};

type Chai = Masala | Sweet;   // Union of types
```

**Structure:**

```
┌─────────────────────────────────────────────────────┐
│      DISCRIMINATED UNION PATTERN                    │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Common property (discriminant)                     │
│  with literal types                                 │
│         │                                           │
│         ↓                                           │
│  type: 'masala' | 'sweet'                           │
│         │                                           │
│         └── TypeScript uses this to narrow          │
│                                                     │
│  Benefits:                                          │
│  - Exhaustive checking                              │
│  - Type narrowing                                   │
│  - Safer than plain unions                          │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Working with Discriminated Unions

```typescript
function brew(order: Chai) {
    switch (order.type) {     // TypeScript narrows based on type
        case 'masala':
            // order is Masala here
            console.log(order.madeby);  // 'ravi' | 'vivaan'
            break;
        case 'sweet':
            // order is Sweet here
            console.log(order.madeby);  // 'mukul' | 'kuki'
            break;
        default:
            // Exhaustive check
            const _exhaustive: never = order;
            return _exhaustive;
    }
}
```

### Exhaustive Checking

```typescript
// If you add a new type but forget to handle it
type Masala = { type: 'masala'; madeby: string };
type Sweet = { type: 'sweet'; madeby: string };
type Kadak = { type: 'kadak'; madeby: string };  // New type

type Chai = Masala | Sweet | Kadak;

function brew(order: Chai) {
    switch (order.type) {
        case 'masala':
            console.log('masala');
            break;
        case 'sweet':
            console.log('sweet');
            break;
        // Forgot 'kadak' case
        default:
            const _exhaustive: never = order;  // ERROR: Type 'Kadak' not assignable to 'never'
            return _exhaustive;
    }
}
```

### Common Patterns

```typescript
// API Response
type Success = { status: 'success'; data: any };
type Error = { status: 'error'; message: string };
type Loading = { status: 'loading' };

type ApiState = Success | Error | Loading;

function handle(state: ApiState) {
    switch (state.status) {
        case 'success':
            console.log(state.data);
            break;
        case 'error':
            console.log(state.message);
            break;
        case 'loading':
            console.log('Loading...');
            break;
    }
}

// Redux Action
type AddTodo = { type: 'ADD_TODO'; payload: string };
type RemoveTodo = { type: 'REMOVE_TODO'; payload: number };
type ToggleTodo = { type: 'TOGGLE_TODO'; payload: number };

type Action = AddTodo | RemoveTodo | ToggleTodo;

function reducer(state: any, action: Action) {
    switch (action.type) {
        case 'ADD_TODO':
            return { ...state, todos: [...state.todos, action.payload] };
        case 'REMOVE_TODO':
            return { ...state, todos: state.todos.filter((_, i) => i !== action.payload) };
        case 'TOGGLE_TODO':
            return { ...state, todos: state.todos.map((t, i) => i === action.payload ? { ...t, done: !t.done } : t) };
    }
}
```


## Cheat Sheet

### Types Quick Reference

```
┌─────────────────────────────────────────────────────┐
│         TYPE DECLARATION SYNTAX                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Primitive                                          │
│  let x: string = 'hello';                           │
│  let y: number = 42;                                │
│  let z: boolean = true;                             │
│                                                     │
│  Array                                              │
│  let arr: string[] = ['a', 'b'];                    │
│  let arr2: Array<string> = ['a', 'b'];              │
│                                                     │
│  Object                                             │
│  type User = { name: string; age: number };         │
│  interface User { name: string; age: number }       │
│                                                     │
│  Union                                              │
│  let x: string | number;                            │
│  type Status = 'active' | 'inactive';               │
│                                                     │
│  Function                                           │
│  type Fn = (x: number) => string;                   │
│  let fn: (x: number) => string;                     │
│                                                     │
│  Tuple                                              │
│  let point: [number, number] = [10, 20];            │
│                                                     │
│  Optional                                           │
│  let x?: string;                                    │
│  type User = { name: string; age?: number };        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Type Guards Cheat Sheet

```
┌─────────────────────────────────────────────────────┐
│         TYPE GUARD PATTERNS                         │
├─────────────────────────────────────────────────────┤
│                                                     │
│  typeof                                             │
│  if (typeof x === 'string') { }                     │
│  if (typeof x === 'number') { }                     │
│                                                     │
│  instanceof                                         │
│  if (x instanceof Error) { }                        │
│  if (x instanceof Date) { }                         │
│                                                     │
│  in operator                                        │
│  if ('property' in obj) { }                         │
│                                                     │
│  Array check                                        │
│  if (Array.isArray(x)) { }                          │
│                                                     │
│  Custom guard                                       │
│  function isString(x: unknown): x is string {       │
│      return typeof x === 'string';                  │
│  }                                                  │
│                                                     │
│  Discriminated union                                │
│  if (obj.type === 'success') { }                    │
│                                                     │
│  Truthiness                                         │
│  if (x) { /* x is truthy */ }                       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Assertion Syntax

```
┌─────────────────────────────────────────────────────┐
│         TYPE ASSERTION SYNTAX                       │
├─────────────────────────────────────────────────────┤
│                                                     │
│  as keyword (preferred)                             │
│  let x = value as string;                           │
│  let len = (value as string).length;                │
│                                                     │
│  Angle brackets (avoid in JSX)                      │
│  let x = <string>value;                             │
│                                                     │
│  Non-null assertion                                 │
│  let x = value!;                                    │
│  value!.property;                                   │
│                                                     │
│  DOM assertions                                     │
│  const btn = document.querySelector('button') as HTMLButtonElement;│
│  const input = document.getElementById('x') as HTMLInputElement;  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### React Types Reference

```
┌─────────────────────────────────────────────────────┐
│         REACT TYPE PATTERNS                         │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Component Props                                    │
│  type Props = { name: string };                     │
│  function Comp({ name }: Props) { }                 │
│                                                     │
│  useState                                           │
│  const [x, setX] = useState<Type>(initial);         │
│                                                     │
│  Event Handlers                                     │
│  onChange: (e: ChangeEvent<HTMLInputElement>) => void│
│  onClick: (e: MouseEvent<HTMLButtonElement>) => void│
│  onSubmit: (e: FormEvent<HTMLFormElement>) => void │
│                                                     │
│  useReducer                                         │
│  type Action = { type: 'ADD' } | { type: 'REMOVE' };│
│  function reducer(state: State, action: Action) { } │
│                                                     │
│  Children                                           │
│  type Props = { children: React.ReactNode };        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Common Mistakes

```
AVOID:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
let x: any;                    // Defeats purpose of TS
value as any as TargetType;    // Double assertion
type Props = { onClick: Function }; // Too generic

DO INSTEAD:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
let x: unknown;                // Type-safe any
Use type guards                // Narrow properly
type Props = { onClick: () => void }; // Specific signature
```

