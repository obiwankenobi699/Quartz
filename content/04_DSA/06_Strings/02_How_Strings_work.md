---
---


# 1. println() Method Overloading {#println}

## Theory

When you call `println()`, Java has **multiple versions** of this method. It selects the correct one based on **parameter type**.

## Small Example

```java
System.out.println(56);        // Calls println(int)
System.out.println("Hello");   // Calls println(String)
System.out.println(true);      // Calls println(boolean)

Person p = new Person();
System.out.println(p);         // Calls println(Object)
```

**Key Point:** Parameter type determines which println() executes.

## Available println() Methods

```java
println(int)      → for numbers
println(String)   → for text
println(boolean)  → for true/false
println(char)     → for single character
println(Object)   → for any object (calls toString())
```

## null Handling

```java
System.out.println(null);  // Output: "null"
// No NullPointerException, safely prints "null" string
```


# 3. toString() Override for Pretty Printing {#tostring}

## Theory

To get **readable output** instead of hash code, we **override toString()** method.

**Flow:**

```
println(Object)
    ↓
calls Object.toString()
    ↓
If overridden → Your custom string
If not → ClassName@hashCode
```

## Small Example: Without Override

```java
class Student {
    String name;
    int id;
    
    Student(String name, int id) {
        this.name = name;
        this.id = id;
    }
    // No toString() override
}

Student s = new Student("John", 101);
System.out.println(s);
// Output: Student@15db9742  ← Not helpful!
```

## Small Example: With Override

```java
class Student {
    String name;
    int id;
    
    Student(String name, int id) {
        this.name = name;
        this.id = id;
    }
    
    @Override
    public String toString() {
        return "Student{name='" + name + "', id=" + id + "}";
    }
}

Student s = new Student("John", 101);
System.out.println(s);
// Output: Student{name='John', id=101}  ← Readable!
```

## How It Works

```
System.out.println(student)
        ↓
println(Object obj)
        ↓
obj.toString()  ← Calls YOUR overridden version
        ↓
Returns: "Student{name='John', id=101}"
        ↓
Prints to terminal
```

**Key Point:** Your custom toString() **overrides** default implementation, giving meaningful output.


# 5. String Immutability {#immutability}

## Theory

**Strings are immutable** = Once created, they **cannot be changed**.

Concatenation creates a **new object**, doesn't modify the existing one.

## Small Example

```java
String s1 = "Hello";
String s2 = s1 + " World";

// What happens:
// 1. "Hello" object created
// 2. "Hello World" NEW object created
// 3. s2 points to new object
// 4. Original "Hello" unchanged

System.out.println(s1);  // "Hello" (unchanged)
System.out.println(s2);  // "Hello World" (new object)
```

## Memory Visualization

```
After: String s2 = s1 + " World";

Stack:              Heap:
┌──────────┐       ┌──────────────┐
│ s1: 0x100│──────►│ "Hello"      │ 0x100
├──────────┤       ├──────────────┤
│ s2: 0x200│──────►│ "Hello World"│ 0x200
└──────────┘       └──────────────┘

Two separate objects in memory!
```

## New Object Creation

```java
String s = "Hello";
s = s + " World";

// Step-by-step:
// 1. Create "Hello" object
// 2. Concatenate: creates NEW "Hello World" object
// 3. s reference updates to new object
// 4. Original "Hello" may be garbage collected
```

## Problem in Loops

```java
// Bad: Creates 1000 objects!
String result = "";
for (int i = 0; i < 1000; i++) {
    result = result + i;  // New object each iteration
}

// Good: Use StringBuilder (modifies same object)
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 1000; i++) {
    sb.append(i);
}
String result = sb.toString();
```


## Key Takeaways

1. **println() overloading:** Java picks method based on parameter type
    
2. **Hash code:** Default object representation = `ClassName@hashCode`
    
3. **toString() override:** Makes object printing readable and meaningful
    
4. **String concatenation:** Only operator overloading allowed in Java
    
5. **Automatic toString() call:** Happens when object concatenated with String
    
6. **String immutability:** Concatenation creates new objects, doesn't modify existing
    
7. **Character arithmetic:** `'A' + 1` = `66` (ASCII), but `"A" + 1` = `"A1"` (concat)
    


## END OF STRING NOTES

so in java to learn string lets take a example of println() when we give println(56) a int it print a string in terminal there are multiple println() functions so which println will take taht argument so it depends onn parameter if our parameter is number our println having number argument will activate so our parameter can be an object or a int or a string or a null so for null there is a check null pointer exception and if we print object what we get a gibrish alphanumeric which is a hash code its the string representation of object so to pretty print we have to override println() have its on too string as i told you early that println() print in string in terminal so it also using tostring so to print our object we have to pretty print by giving a object specific tostring() unlike println() using default toString() if you noticed we are giving a fuction to pretty print inside println so here our explicit giving function override println() ok but there is a Q why string representation of a object is an hash ? in java concatination works very differently as operator overloading is not allow in java accepy strings if we add string with any complex object it convert to object (char)('a'+1) after concat formation of new object take place

make notes out of it
