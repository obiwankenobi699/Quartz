---
---


# 1. Type Systems: Static vs Dynamic Typing {#1-type-systems}

## 1.1 Static Typing (Compile-Time Type Checking)

**Definition:** In statically-typed languages, variable types are known and checked at compile time. Once a variable is declared with a type, it cannot change.

**Characteristics:**

- Type must be declared explicitly or inferred at compile time
- Type checking happens before program execution
- Type errors caught during compilation
- Variables cannot change type after declaration
- Type information available during development

**Examples of Statically-Typed Languages:**

- Java
- C
- C++
- C#
- Go
- Rust
- TypeScript
- Swift
- Kotlin

**Code Example (Java):**

```java
// Static typing - type declared at compile time
int age = 25;              // age is integer type
String name = "Mukul";     // name is String type
double salary = 50000.50;  // salary is double type

// This will cause COMPILE-TIME ERROR
age = "Twenty Five";  // ERROR: cannot assign String to int
name = 123;           // ERROR: cannot assign int to String

// Type is fixed and enforced
age = 30;             // OK - still integer
name = "John";        // OK - still String
```

**Advantages of Static Typing:**

- Errors caught early (at compile time)
- Better performance (no runtime type checking)
- Better IDE support (autocomplete, refactoring)
- Self-documenting code (types visible)
- Easier to maintain large codebases
- Compiler optimizations possible

**Disadvantages of Static Typing:**

- More verbose code (type declarations)
- Less flexibility
- Longer development time initially
- Learning curve for complex type systems


## 1.3 Static vs Dynamic Typing Comparison

```
Comparison Table

┌────────────────────┬─────────────────────┬─────────────────────┐
│ Feature            │ Static Typing       │ Dynamic Typing      │
├────────────────────┼─────────────────────┼─────────────────────┤
│ Type Declaration   │ Required/Inferred   │ Not required        │
│                    │ at compile time     │                     │
├────────────────────┼─────────────────────┼─────────────────────┤
│ Type Checking      │ Compile time        │ Runtime             │
├────────────────────┼─────────────────────┼─────────────────────┤
│ Type Changes       │ Not allowed         │ Allowed             │
├────────────────────┼─────────────────────┼─────────────────────┤
│ Error Detection    │ Early (compilation) │ Late (execution)    │
├────────────────────┼─────────────────────┼─────────────────────┤
│ Performance        │ Generally faster    │ Generally slower    │
├────────────────────┼─────────────────────┼─────────────────────┤
│ Code Verbosity     │ More verbose        │ Less verbose        │
├────────────────────┼─────────────────────┼─────────────────────┤
│ Flexibility        │ Less flexible       │ More flexible       │
├────────────────────┼─────────────────────┼─────────────────────┤
│ IDE Support        │ Excellent           │ Limited             │
├────────────────────┼─────────────────────┼─────────────────────┤
│ Large Projects     │ Better suited       │ Challenging         │
├────────────────────┼─────────────────────┼─────────────────────┤
│ Learning Curve     │ Steeper             │ Easier              │
└────────────────────┴─────────────────────┴─────────────────────┘
```


## 2.2 Runtime

**Definition:** Runtime is the phase when the compiled program is actually executing. This is when the program performs its intended operations.

**What Happens at Runtime:**

- Program instructions are executed
- Memory is allocated dynamically
- User input is processed
- Calculations are performed
- Exceptions may occur
- Program interacts with system resources

**Runtime Errors:**

- Division by zero
- Null pointer exceptions
- Array index out of bounds
- Stack overflow
- Out of memory
- File not found
- Network errors

```
Runtime Execution Flow

Program Start        Execution              Program End
     │                   │                      │
     │                   │                      │
     ▼                   ▼                      ▼
┌─────────┐         ┌─────────┐          ┌─────────┐
│ Load    │         │ Execute │          │ Clean   │
│ Program │────────►│ Instruc-│─────────►│ Up and  │
│ Into    │         │ tions   │          │ Exit    │
│ Memory  │         │ One by  │          │         │
└─────────┘         │ One     │          └─────────┘
                    └─────────┘
                         │
                    ┌────▼────┐
                    │Runtime  │
                    │Errors?  │
                    └────┬────┐
                         │
                    If error occurs:
                    Exception thrown
                    Program may crash
```

**Example (Java):**

```java
// Runtime error examples
public class RuntimeExample {
    public static void main(String[] args) {
        
        // Division by zero - runtime error
        int a = 10;
        int b = 0;
        int result = a / b;  // ArithmeticException at RUNTIME
        
        // Null pointer - runtime error
        String text = null;
        int length = text.length();  // NullPointerException at RUNTIME
        
        // Array index out of bounds - runtime error
        int[] numbers = {1, 2, 3};
        int value = numbers[5];  // ArrayIndexOutOfBoundsException at RUNTIME
        
        // These compile successfully but fail during execution
    }
}
```


# 3. Memory Management: Stack and Heap {#3-memory-management}

## 3.1 Program Memory Organization

When a program runs, the operating system allocates memory in different regions:

```
Memory Layout of a Program

High Memory Address
┌────────────────────────┐
│   STACK                │  ← Grows downward
│   - Local variables    │
│   - Function calls     │
│   - Parameters         │
│   - Return addresses   │
├────────────────────────┤
│                        │
│   Free Space           │
│                        │
├────────────────────────┤
│   HEAP                 │  ← Grows upward
│   - Dynamic allocation │
│   - Objects            │
│   - Arrays             │
├────────────────────────┤
│   BSS Segment          │
│   (Uninitialized data) │
├────────────────────────┤
│   Data Segment         │
│   (Initialized data)   │
├────────────────────────┤
│   Text/Code Segment    │
│   (Program instructions)│
└────────────────────────┘
Low Memory Address
```


## 3.3 Heap Memory

**Definition:** Heap is a region of memory used for dynamic memory allocation. Objects are created on the heap and can be accessed from anywhere in the program.

**Characteristics:**

- Dynamic size (can grow as needed)
- Slower access than stack (requires pointer dereferencing)
- Manually managed in some languages (C, C++)
- Garbage collected in others (Java, Python, C#)
- Larger than stack
- Stores objects and arrays
- Shared among all threads
- Fragmentation can occur

**What is Stored on Heap:**

- Objects (class instances)
- Arrays
- Dynamically allocated data
- Strings (in Java)
- Collections (ArrayList, HashMap, etc.)

**Heap Memory Visualization:**

```
Heap Memory Structure

┌─────────────────────────────────────────┐
│  HEAP (Growing Upward)                  │
├─────────────────────────────────────────┤
│                                         │
│  Object 1: Person                       │
│  ┌─────────────────────┐                │
│  │ name: "Mukul"       │  ← Memory address: 0x1234
│  │ age: 25             │                │
│  │ height: 5.8         │                │
│  └─────────────────────┘                │
│                                         │
│  Object 2: Person                       │
│  ┌─────────────────────┐                │
│  │ name: "John"        │  ← Memory address: 0x5678
│  │ age: 30             │                │
│  │ height: 6.0         │                │
│  └─────────────────────┘                │
│                                         │
│  Array: int[]                           │
│  ┌─────────────────────┐                │
│  │ [10, 20, 30, 40]    │  ← Memory address: 0x9ABC
│  └─────────────────────┘                │
│                                         │
│  String: "Hello World"                  │
│  ┌─────────────────────┐                │
│  │ "Hello World"       │  ← Memory address: 0xDEF0
│  └─────────────────────┘                │
│                                         │
└─────────────────────────────────────────┘
```

**Code Example (Java):**

```java
public class HeapExample {
    public static void main(String[] args) {
        // Objects created on HEAP
        Person person1 = new Person("Mukul", 25);  
        // person1 reference variable: STACK
        // Person object: HEAP
        
        Person person2 = new Person("John", 30);
        // person2 reference variable: STACK
        // Person object: HEAP
        
        // Array created on HEAP
        int[] numbers = new int[5];
        // numbers reference variable: STACK
        // Array [0,0,0,0,0]: HEAP
        
        // String created on HEAP
        String message = new String("Hello");
        // message reference variable: STACK
        // String object: HEAP
        
    } // Objects remain on heap until garbage collected
}

class Person {
    String name;  // Stored on heap (part of object)
    int age;      // Stored on heap (part of object)
    
    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```

**Garbage Collection:**

```
When objects are no longer referenced, they become eligible for garbage collection

BEFORE:                          AFTER GC:
Stack:         Heap:              Stack:         Heap:
┌────────┐    ┌───────────┐      ┌────────┐    ┌───────────┐
│person1 │───►│Person obj1│      │person1 │───►│Person obj1│
└────────┘    └───────────┘      └────────┘    └───────────┘
┌────────┐    ┌───────────┐      ┌────────┐    
│person2 │───►│Person obj2│      │person2 │───► null
└────────┘    └───────────┘      └────────┘    

person2 = null;                   obj2 garbage collected
                                  Memory freed automatically
```


# 4. Data Types {#4-data-types}

## 4.1 Overview of Data Types

Data types define what kind of value a variable can hold and what operations can be performed on it.

```
Data Type Hierarchy

                    Data Types
                        │
        ┌───────────────┴───────────────┐
        │                               │
    Primitive                      Non-Primitive
    (Basic Types)                  (Reference Types)
        │                               │
   ┌────┴────┐                     ┌────┴────┐
   │         │                     │         │
Numeric   Non-Numeric          Classes   Arrays
   │         │                     │         │
┌──┴──┐   ┌─┴─┐              Interfaces  Strings
│     │   │   │                  │
Integer Float  Boolean      Enumerations
│     │    │   Char
byte  float  
short double
int
long
```


## 4.3 Non-Primitive (Reference) Data Types

**Definition:** Non-primitive types are created by the programmer and are not defined by the language. They are called reference types because they refer to objects.

### Common Non-Primitive Types:

**1. Classes**

```java
// User-defined class
class Person {
    String name;
    int age;
    
    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

// Usage
Person person = new Person("Mukul", 25);
// 'person' is reference variable (stack)
// Person object is on heap
```

**2. Strings**

```java
// String is a class (non-primitive)
String name = "Mukul";           // String literal
String message = new String("Hello"); // String object

// Strings are immutable in Java
name = name + " Kumar";  // Creates new String object
```

**3. Arrays**

```java
// Array of primitives
int[] numbers = {10, 20, 30, 40};
// numbers reference on stack
// array [10,20,30,40] on heap

// Array of objects
Person[] people = new Person[3];
people[0] = new Person("Mukul", 25);
people[1] = new Person("John", 30);
// people reference on stack
// array and Person objects on heap
```

**4. Interfaces**

```java
interface Drawable {
    void draw();
}

class Circle implements Drawable {
    public void draw() {
        System.out.println("Drawing circle");
    }
}
```

**5. Enumerations**

```java
enum Day {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY
}

Day today = Day.MONDAY;
```


# 5. Operators and Precedence {#5-operators}

## 5.1 Types of Operators

### Arithmetic Operators

```java
int a = 10, b = 3;

// Basic arithmetic
int sum = a + b;        // Addition: 13
int diff = a - b;       // Subtraction: 7
int product = a * b;    // Multiplication: 30
int quotient = a / b;   // Division: 3 (integer division)
int remainder = a % b;  // Modulus: 1

// Special cases
double result = 10.0 / 3;  // 3.333... (floating-point division)
int result2 = 10 / 3;      // 3 (integer division, no decimals)
```

### Assignment Operators

```java
int x = 10;      // Simple assignment

// Compound assignment
x += 5;   // x = x + 5  → 15
x -= 3;   // x = x - 3  → 12
x *= 2;   // x = x * 2  → 24
x /= 4;   // x = x / 4  → 6
x %= 4;   // x = x % 4  → 2
```

### Comparison (Relational) Operators

```java
int a = 10, b = 20;

boolean result1 = a == b;  // Equal to: false
boolean result2 = a != b;  // Not equal to: true
boolean result3 = a > b;   // Greater than: false
boolean result4 = a < b;   // Less than: true
boolean result5 = a >= 10; // Greater than or equal: true
boolean result6 = b <= 20; // Less than or equal: true
```

### Logical Operators

```java
boolean x = true, y = false;

// Logical AND (both must be true)
boolean result1 = x && y;  // false

// Logical OR (at least one must be true)
boolean result2 = x || y;  // true

// Logical NOT (inverts boolean)
boolean result3 = !x;      // false
boolean result4 = !y;      // true

// Short-circuit evaluation
boolean result5 = false && (10/0 > 0);  // false (doesn't evaluate second part)
```

### Unary Operators

```java
int a = 10;

// Increment/Decrement
int b = ++a;  // Pre-increment: a becomes 11, then b = 11
int c = a++;  // Post-increment: c = 11, then a becomes 12
int d = --a;  // Pre-decrement: a becomes 11, then d = 11
int e = a--;  // Post-decrement: e = 11, then a becomes 10

// Unary plus and minus
int positive = +10;   // Positive value
int negative = -10;   // Negative value

// Logical complement
boolean flag = true;
boolean opposite = !flag;  // false
```

### Bitwise Operators

```java
int a = 5;   // Binary: 0101
int b = 3;   // Binary: 0011

int result1 = a & b;   // AND: 0001 (1)
int result2 = a | b;   // OR: 0111 (7)
int result3 = a ^ b;   // XOR: 0110 (6)
int result4 = ~a;      // NOT: ...11111010 (-6)
int result5 = a << 1;  // Left shift: 1010 (10)
int result6 = a >> 1;  // Right shift: 0010 (2)
```

### Ternary Operator

```java
// Syntax: condition ? value_if_true : value_if_false

int age = 20;
String status = (age >= 18) ? "Adult" : "Minor";
// Result: "Adult"

int max = (a > b) ? a : b;  // Gets maximum of two numbers
```


## 5.3 Associativity: Left to Right vs Right to Left

**Definition:** Associativity determines the order of evaluation when operators have the same precedence.

### Left-to-Right Associativity (Most Operators)

```java
// Arithmetic operators: Left to Right
int result1 = 10 - 5 - 2;
// Evaluation: (10 - 5) - 2 = 5 - 2 = 3

int result2 = 20 / 4 / 2;
// Evaluation: (20 / 4) / 2 = 5 / 2 = 2

int result3 = 100 % 30 % 4;
// Evaluation: (100 % 30) % 4 = 10 % 4 = 2

// Multiplication and division: Left to Right
int result4 = 10 * 2 / 5;
// Evaluation: (10 * 2) / 5 = 20 / 5 = 4
```

### Right-to-Left Associativity (Special Cases)

**1. Assignment Operators**

```java
// Assignment: Right to Left
int a, b, c;
a = b = c = 10;
// Evaluation: a = (b = (c = 10))
// First: c = 10
// Then: b = 10
// Finally: a = 10

int x, y, z;
x = y = z = 5 + 3;
// Evaluation: x = (y = (z = (5 + 3)))
// First: 5 + 3 = 8
// Then: z = 8
// Then: y = 8
// Finally: x = 8
```

**2. Unary Operators**

```java
// Unary operators: Right to Left
int a = 10;
int result = -++a;
// Evaluation: -(++a)
// First: ++a (a becomes 11)
// Then: -11
// Result: -11

boolean flag = true;
boolean result2 = !!flag;
// Evaluation: !(!flag)
// First: !flag = false
// Then: !false = true
// Result: true
```

**3. POWER OPERATOR (Exponentiation) - Right to Left**

```java
// Note: Java doesn't have built-in power operator
// But languages like Python do: **

// Python example (Right to Left):
# result = 2 ** 3 ** 2
# Evaluation: 2 ** (3 ** 2)
# First: 3 ** 2 = 9
# Then: 2 ** 9 = 512
# Result: 512

// In Java, use Math.pow()
double result = Math.pow(2, Math.pow(3, 2));
// Same logic: 2^(3^2) = 2^9 = 512
```

**4. Ternary Operator**

```java
// Ternary: Right to Left
int a = 10, b = 20, c = 30;
int max = a > b ? a : b > c ? b : c;
// Evaluation: a > b ? a : (b > c ? b : c)
// First: b > c ? b : c → false ? 20 : 30 → 30
// Then: a > b ? a : 30 → false ? 10 : 30 → 30
// Result: 30
```


# 6. Primitive vs Non-Primitive: Deep Dive {#6-primitive-vs-non-primitive}

## 6.1 Memory Storage Difference

```
Memory Layout Comparison

PRIMITIVE TYPES (Value stored directly):

Stack:
┌────────────────────┐
│ int age = 25       │  ← Value 25 stored directly
├────────────────────┤
│ double price = 99.5│  ← Value 99.5 stored directly
├────────────────────┤
│ char grade = 'A'   │  ← Value 'A' stored directly
├────────────────────┤
│ boolean flag = true│  ← Value true stored directly
└────────────────────┘

NON-PRIMITIVE TYPES (Reference stored):

Stack:                     Heap:
┌────────────────────┐    ┌──────────────────────┐
│ Person p1          │───►│ Person object        │
│ (reference: 0x1234)│    │ name: "Mukul"        │
├────────────────────┤    │ age: 25              │
│ String name        │─┐  └──────────────────────┘
│ (reference: 0x5678)│ │
├────────────────────┤ │  ┌──────────────────────┐
│ int[] arr          │─┼─►│ String object        │
│ (reference: 0x9ABC)│ │  │ "Mukul"              │
└────────────────────┘ │  └──────────────────────┘
                       │
                       │  ┌──────────────────────┐
                       └─►│ Array object         │
                          │ [10, 20, 30, 40, 50] │
                          └──────────────────────┘
```


## 6.3 Null Values

```java
// Primitives CANNOT be null
int age = null;        // COMPILE ERROR!
boolean flag = null;   // COMPILE ERROR!

// Non-primitives CAN be null
String name = null;    // OK - no object assigned
Person person = null;  // OK - no object assigned
int[] numbers = null;  // OK - no array assigned

// Null Pointer Exception
String text = null;
int length = text.length();  // NullPointerException at runtime!
```


# 7. Call by Value vs Call by Reference {#7-parameter-passing}

## 7.1 Important: Java is ALWAYS Call by Value

**Key Concept:** Java ALWAYS passes arguments by value, but the behavior differs between primitives and objects because of what "value" means.

- For primitives: The actual value is copied
- For objects: The reference value (memory address) is copied


## 7.3 Call by Value (Objects) - The Confusion

**Reality:** Java passes the reference BY VALUE. The reference is copied, but both copies point to the SAME object.

```java
public class CallByValueObjectExample {
    public static void main(String[] args) {
        Person person = new Person("Mukul", 25);
        System.out.println("Before: " + person.name);  // Mukul
        
        modifyObject(person);
        
        System.out.println("After: " + person.name);   // John (changed!)
    }
    
    static void modifyObject(Person p) {
        p.name = "John";  // Modifies the same object
        System.out.println("Inside method: " + p.name);  // John
    }
}

class Person {
    String name;
    int age;
    
    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```

```
Memory Visualization:

BEFORE method call:
Stack:                     Heap:
┌────────────┐            ┌──────────────┐
│ person:    │───────────►│ Person       │
│ 0x1234     │            │ name: "Mukul"│
└────────────┘            │ age: 25      │
                          └──────────────┘

DURING method call (Reference copied):
Stack:                     Heap:
main():                    ┌──────────────┐
┌────────────┐        ┌──►│ Person       │
│ person:    │────────┘   │ name: "Mukul"│
│ 0x1234     │            │ age: 25      │
└────────────┘            └──────────────┘
                              ▲
modifyObject():               │
┌────────────┐                │
│ p: 0x1234  │────────────────┘
└────────────┘
Both references point to SAME object!

INSIDE method (p.name = "John"):
Stack:                     Heap:
main():                    ┌──────────────┐
┌────────────┐        ┌──►│ Person       │
│ person:    │────────┘   │ name: "John" │ ← Object modified
│ 0x1234     │            │ age: 25      │
└────────────┘            └──────────────┘
                              ▲
modifyObject():               │
┌────────────┐                │
│ p: 0x1234  │────────────────┘
└────────────┘

AFTER method returns:
Stack:                     Heap:
┌────────────┐            ┌──────────────┐
│ person:    │───────────►│ Person       │
│ 0x1234     │            │ name: "John" │ ← Change persists!
└────────────┘            │ age: 25      │
                          └──────────────┘
```


# 8. Understanding References with Real-World Examples {#8-reference-examples}

## 8.1 The Name-Person Analogy

### Scenario: Multiple Names for Same Person

```java
public class ReferenceExample {
    public static void main(String[] args) {
        // Create a Person object
        Person mukul = new Person("Mukul Kumar", 25);
        
        // Another reference to the SAME person
        Person son = mukul;
        
        // mukul and son both refer to the SAME Person object
        System.out.println("Via mukul: " + mukul.name);  // Mukul Kumar
        System.out.println("Via son: " + son.name);      // Mukul Kumar
        
        // Change through 'son' reference
        son.name = "Mukul Kumar Singh";
        
        // Change visible through BOTH references
        System.out.println("Via mukul: " + mukul.name);  // Mukul Kumar Singh
        System.out.println("Via son: " + son.name);      // Mukul Kumar Singh
        
        // Why? Because both point to SAME object
        System.out.println(mukul == son);  // true (same reference)
    }
}

class Person {
    String name;
    int age;
    
    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```

```
Memory Visualization: name = mukul, son = mukul

Stack:                          Heap:
┌─────────────┐                ┌────────────────────────┐
│ mukul:      │───────────────►│ Person object          │
│ 0x1234      │                │ ├─ name: "Mukul Kumar" │
├─────────────┤           ┌───►│ └─ age: 25             │
│ son:        │───────────┘    └────────────────────────┘
│ 0x1234      │
└─────────────┘
Both references point to SAME Person object!

Real-world analogy:
┌────────────────────────────────────────────────────┐
│ "mukul" = Reference variable (like a nickname)     │
│ "son" = Another reference variable (another name)  │
│ Person object = The actual person (Mukul Kumar)    │
│                                                    │
│ Just like one person can have multiple names:      │
│ - Legal name: Mukul Kumar                         │
│ - Nickname: mukul                                  │
│ - Relation: son                                    │
│                                                    │
│ All names refer to the SAME person!               │
└────────────────────────────────────────────────────┘
```

**Important Points:**

- `mukul` and `son` are reference variables (names/labels)
- They both store the same memory address (0x1234)
- There is only ONE Person object in memory
- Changes through any reference affect the same object
- The Person object exists independently of the references


### Example 2: Primitive Assignment (a = 10, b = a)

```java
public class PrimitiveAssignment2 {
    public static void main(String[] args) {
        // a assigned first
        int a = 10;
        
        // b gets COPY of a's value
        int b = a;
        
        System.out.println("a = " + a);  // 10
        System.out.println("b = " + b);  // 10
        
        // Change a
        a = 20;
        
        System.out.println("After a = 20:");
        System.out.println("a = " + a);  // 20
        System.out.println("b = " + b);  // 10 (still unchanged)
        
        // Change b
        b = 30;
        
        System.out.println("After b = 30:");
        System.out.println("a = " + a);  // 20 (unchanged)
        System.out.println("b = " + b);  // 30
    }
}
```

```
Memory Visualization:

STATE 1 (a = 10):
Stack:
┌────────────┐
│ a: 10      │
└────────────┘

STATE 2 (b = a):
Stack:
┌────────────┐
│ a: 10      │
├────────────┤
│ b: 10      │  ← COPY of a's value
└────────────┘

b receives a copy of the value
Not a reference to a!

STATE 3 (a = 20):
Stack:
┌────────────┐
│ a: 20      │  ← Changed
├────────────┤
│ b: 10      │  ← Independent, unchanged
└────────────┘

STATE 4 (b = 30):
Stack:
┌────────────┐
│ a: 20      │  ← Unchanged
├────────────┤
│ b: 30      │  ← Changed independently
└────────────┘

Key Point: For primitives, assignment ALWAYS copies the value
a and b are completely independent after assignment
```


### Example 4: Creating Truly Independent Objects

```java
public class IndependentObjects {
    public static void main(String[] args) {
        // Create FIRST Person object
        Person a = new Person("Mukul", 25);
        
        // Create SECOND Person object (independent)
        Person b = new Person("Mukul", 25);  // Same data, different object
        
        System.out.println("a.name = " + a.name);  // Mukul
        System.out.println("b.name = " + b.name);  // Mukul
        
        // Change through b
        b.name = "John";
        
        System.out.println("After b.name = 'John':");
        System.out.println("a.name = " + a.name);  // Mukul (unchanged!)
        System.out.println("b.name = " + b.name);  // John
        
        // Why? Because a and b point to DIFFERENT objects
        System.out.println("a == b: " + (a == b));  // false
        System.out.println("a.equals(b): " + (a.name.equals(b.name)));  // false
    }
}
```

```
Memory Visualization:

STATE 1 (Person a = new Person("Mukul", 25)):
Stack:                     Heap:
┌────────────┐            ┌──────────────┐
│ a: 0x1234  │───────────►│ Person       │ Object A
└────────────┘            │ name: "Mukul"│
                          │ age: 25      │
                          └──────────────┘

STATE 2 (Person b = new Person("Mukul", 25)):
Stack:                     Heap:
┌────────────┐            ┌──────────────┐
│ a: 0x1234  │───────────►│ Person       │ Object A
├────────────┤            │ name: "Mukul"│
│ b: 0x5678  │───────┐    │ age: 25      │
└────────────┘       │    └──────────────┘
                     │
                     │    ┌──────────────┐
                     └───►│ Person       │ Object B
                          │ name: "Mukul"│
                          │ age: 25      │
                          └──────────────┘

TWO separate objects with same data

STATE 3 (b.name = "John"):
Stack:                     Heap:
┌────────────┐            ┌──────────────┐
│ a: 0x1234  │───────────►│ Person       │ Object A
├────────────┤            │ name: "Mukul"│ ← Unchanged
│ b: 0x5678  │───────┐    │ age: 25      │
└────────────┘       │    └──────────────┘
                     │
                     │    ┌──────────────┐
                     └───►│ Person       │ Object B
                          │ name: "John" │ ← Changed
                          │ age: 25      │
                          └──────────────┘

Key Point: new keyword creates NEW object
a and b point to DIFFERENT objects
Changes to one do NOT affect the other
```


## Conclusion

**Key Programming Fundamentals Learned:**

1. **Type Systems:**
    
    - Static typing: Type fixed at compile time
    - Dynamic typing: Type determined at runtime
2. **Compile Time vs Runtime:**
    
    - Compile time: Code translation, type checking
    - Runtime: Actual execution, dynamic operations
3. **Memory Management:**
    
    - Stack: Fast, automatic, local variables, primitives
    - Heap: Slower, managed, objects, arrays
4. **Data Types:**
    
    - Primitives: Store values directly (int, double, boolean, char)
    - Non-primitives: Store references (String, Arrays, Objects)
5. **Operators:**
    
    - Most operators: Left-to-right associativity
    - Special cases: Assignment, unary, power: Right-to-left
    - Precedence determines evaluation order
6. **Parameter Passing:**
    
    - Java is ALWAYS call by value
    - Primitives: Value copied
    - Objects: Reference copied (both point to same object)
7. **References:**
    
    - Multiple references can point to same object
    - Changing object through any reference affects all
    - Assignment creates alias for objects, copy for primitives

