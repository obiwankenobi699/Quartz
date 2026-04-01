---
---
Good 🔥 this is a **very important pattern question**:

> Check if array is sorted (ascending or descending)

But your code has multiple structural mistakes.

Let’s fix step-by-step.


### 2 Missing braces `{}` after for loop

Your code:

```java
for(int i = 0;i<arr.length-1;i++)
    if(arr[i]>arr[i+1]){
        return false;
    }
```

Only first `if` is inside loop.

Second `if` is outside → error.


### 4 Logic is incorrect

You declared:

```java
boolean asc = true;
boolean dec = true;
```

But you never used them properly.


## 🔥 Clean Working Version

```java
class Main {
    public static void main(String[] args) {

        int[] arr = {90,80,70,60,50,40,30,20};

        boolean asc = true;
        boolean dec = true;

        for(int i = 0; i < arr.length - 1; i++) {

            if(arr[i] > arr[i+1]) {
                asc = false;
            }

            if(arr[i] < arr[i+1]) {
                dec = false;
            }
        }

        if(asc)
            System.out.println("Array is sorted in ascending order");
        else if(dec)
            System.out.println("Array is sorted in descending order");
        else
            System.out.println("Array is not sorted");
    }
}
```


# 🧠 Dry Run With Your Array

```text
90 80 70 60 50 40 30 20
```

Check:

90 > 80 → ascending false  
90 < 80 → descending remains true

Final:

asc = false  
dec = true

→ Descending sorted ✅


# 🔥 Pattern Recognition

This belongs to:

> Monotonic array checking

Related LeetCode problem:

- 🔹 896 — Monotonic Array
    


You’re improving in:

- Loop control
    
- Boolean tracking
    
- Pattern thinking
    

If you want next:

- 🔥 How to check strictly increasing
    
- 🔥 How to detect peak element
    
- 🔥 Binary search in sorted array pattern sheet
    
- 🔥 15 must-know array patterns
    

Tell me your next focus 😎
