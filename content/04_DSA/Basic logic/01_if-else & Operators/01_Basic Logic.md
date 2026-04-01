---
---
4# BEGINNER DSA NOTES - JAVA

## Complete Guide: Logic, Intuition, and Problem Solving


# 1. Fundamental Operators: Division (/) and Modulus (%) {#operators}

## 1.1 Division Operator (/)

**Purpose:** Divides one number by another and returns the quotient (whole part).

**Key Characteristics:**

- Integer division truncates decimal part
- Used to remove digits, scale down numbers, or find quotients

**Common Use Cases:**

### A) Removing Last Digit from Number

```java
int number = 2345;
int withoutLastDigit = number / 10;  // Result: 234

// Explanation:
// 2345 / 10 = 234.5 → truncated to 234
```

**Intuition:** Dividing by 10 shifts digits one place to the right, effectively removing the last digit.

### B) Counting Digits in Number

```java
int number = 12345;
int digitCount = 0;

while (number > 0) {
    number = number / 10;  // Remove last digit
    digitCount++;
}

System.out.println("Total digits: " + digitCount);  // 5
```

**Intuition:** Each division by 10 removes one digit. Count iterations until number becomes 0.

### C) Finding Quotient

```java
int dividend = 17;
int divisor = 5;
int quotient = dividend / divisor;  // 3

// 17 / 5 = 3 (remainder ignored)
```


## 1.3 Combined Usage: / and %

**Most Common Pattern:** Extracting and processing all digits of a number.

```java
int number = 2345;

while (number > 0) {
    int lastDigit = number % 10;   // Extract last digit
    System.out.println(lastDigit);  // Process it
    number = number / 10;           // Remove last digit
}

// Output: 5, 4, 3, 2 (digits in reverse order)
```

**Flow Diagram:**

```
number = 2345

Iteration 1:
  lastDigit = 2345 % 10 = 5
  number = 2345 / 10 = 234

Iteration 2:
  lastDigit = 234 % 10 = 4
  number = 234 / 10 = 23

Iteration 3:
  lastDigit = 23 % 10 = 3
  number = 23 / 10 = 2

Iteration 4:
  lastDigit = 2 % 10 = 2
  number = 2 / 10 = 0

Loop ends (number = 0)
```

**Quick Reference:**

|Operation|Purpose|Example|
|---|---|---|
|`num % 10`|Get last digit|2345 % 10 = 5|
|`num / 10`|Remove last digit|2345 / 10 = 234|
|`num % 2`|Check even/odd|7 % 2 = 1 (odd)|
|`num % n`|Check divisibility|15 % 5 = 0 (divisible)|


## 2.2 Digit Extraction Pattern

**Concept:** Process individual digits of a number using % and /.

**Template:**

```java
int number = 2345;

while (number > 0) {
    int digit = number % 10;   // Extract
    // Process digit here
    number = number / 10;      // Move to next digit
}
```

**Intuition:**

- Extract digits from right to left
- Use % 10 to get last digit
- Use / 10 to remove last digit
- Continue until number becomes 0

**Common Applications:**

```java
// Sum of digits
int num = 2345;
int sum = 0;
while (num > 0) {
    sum += num % 10;
    num /= 10;
}
// Result: 2 + 3 + 4 + 5 = 14

// Count digits
int num = 2345;
int count = 0;
while (num > 0) {
    count++;
    num /= 10;
}
// Result: 4 digits

// Reverse number
int num = 2345;
int reversed = 0;
while (num > 0) {
    int digit = num % 10;
    reversed = reversed * 10 + digit;
    num /= 10;
}
// Result: 5432
```


## 2.4 Frequency Counting Pattern

**Concept:** Count occurrences of elements or conditions.

**Template:**

```java
int[] arr = {1, 2, 2, 3, 3, 3, 4};

// Count specific element
int target = 3;
int count = 0;
for (int num : arr) {
    if (num == target) {
        count++;
    }
}
```

**Advanced: Using Array as Frequency Table**

```java
// Count frequency of digits 0-9
int number = 112233;
int[] freq = new int[10];  // Index represents digit

while (number > 0) {
    int digit = number % 10;
    freq[digit]++;
    number /= 10;
}

// freq[1] = 2, freq[2] = 2, freq[3] = 2
```


## 3.2 Find Maximum Value in Array

**Problem:** Find the largest element in an array.

**Logic:**

- Assume first element is maximum
- Compare each element with current maximum
- Update maximum if larger element found

**Java Solution:**

```java
public class FindMax {
    public static int findMaximum(int[] arr) {
        // Handle edge case
        if (arr == null || arr.length == 0) {
            throw new IllegalArgumentException("Array is empty");
        }
        
        int max = arr[0];  // Assume first element is max
        
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];  // Update max
            }
        }
        
        return max;
    }
    
    public static void main(String[] args) {
        int[] numbers = {45, 12, 78, 23, 90, 34};
        int maximum = findMaximum(numbers);
        System.out.println("Maximum: " + maximum);  // 90
    }
}
```

**Intuition:**

```
arr = [45, 12, 78, 23, 90, 34]

Start: max = 45
Check 12: 12 < 45, no change
Check 78: 78 > 45, max = 78
Check 23: 23 < 78, no change
Check 90: 90 > 78, max = 90
Check 34: 34 < 90, no change

Final: max = 90
```

**Time Complexity:** O(n) **Space Complexity:** O(1)


## 3.4 Sum of Two Largest Numbers in Array

**Problem:** Find the two largest numbers and return their sum.

**Logic:**

- Track two variables: largest and second largest
- Iterate through array once
- Update both variables appropriately

**Java Solution:**

```java
public class TwoLargestSum {
    public static int sumOfTwoLargest(int[] arr) {
        if (arr == null || arr.length < 2) {
            throw new IllegalArgumentException("Array must have at least 2 elements");
        }
        
        // Initialize first and second largest
        int first = Integer.MIN_VALUE;
        int second = Integer.MIN_VALUE;
        
        for (int num : arr) {
            if (num > first) {
                // New largest found
                second = first;  // Old first becomes second
                first = num;     // New first
            } else if (num > second && num != first) {
                // New second largest found
                second = num;
            }
        }
        
        return first + second;
    }
    
    public static void main(String[] args) {
        int[] numbers = {45, 12, 78, 23, 90, 34};
        int sum = sumOfTwoLargest(numbers);
        System.out.println("Sum of two largest: " + sum);  // 90 + 78 = 168
    }
}
```

**Step-by-Step Intuition:**

```
arr = [45, 12, 78, 23, 90, 34]

Initialize: first = -∞, second = -∞

Check 45: 45 > -∞
  → second = -∞, first = 45

Check 12: 12 < 45 but 12 > -∞
  → second = 12, first = 45

Check 78: 78 > 45
  → second = 45, first = 78

Check 23: 23 < 78 but 23 < 45
  → no change

Check 90: 90 > 78
  → second = 78, first = 90

Check 34: 34 < 90 but 34 < 78
  → no change

Final: first = 90, second = 78
Sum = 90 + 78 = 168
```

**Time Complexity:** O(n) **Space Complexity:** O(1)


## 3.7 Sum of Digits

**Problem:** Calculate the sum of all digits in a number.

**Logic:**

- Extract each digit using % 10
- Add to sum
- Remove digit using / 10

**Java Solution:**

```java
public class SumOfDigits {
    public static int sumDigits(int num) {
        int sum = 0;
        
        while (num > 0) {
            sum += num % 10;  // Add last digit
            num /= 10;        // Remove last digit
        }
        
        return sum;
    }
    
    public static void main(String[] args) {
        int number = 2345;
        int result = sumDigits(number);
        System.out.println("Sum of digits: " + result);  // 2+3+4+5 = 14
    }
}
```

**Time Complexity:** O(log n) **Space Complexity:** O(1)


## 3.9 Prime Number Check

**Problem:** Determine if a number has only two divisors (1 and itself).

**Logic:**

- Check divisibility from 2 to √n
- If any number divides evenly, not prime
- Optimization: Only check up to square root

**Java Solution:**

```java
public class PrimeCheck {
    public static boolean isPrime(int num) {
        // Handle edge cases
        if (num <= 1) return false;
        if (num == 2) return true;
        if (num % 2 == 0) return false;
        
        // Check odd divisors up to √n
        for (int i = 3; i <= Math.sqrt(num); i += 2) {
            if (num % i == 0) {
                return false;  // Found divisor, not prime
            }
        }
        
        return true;  // No divisors found, prime
    }
    
    public static void main(String[] args) {
        System.out.println(isPrime(7));   // true
        System.out.println(isPrime(15));  // false (divisible by 3 and 5)
        System.out.println(isPrime(29));  // true
    }
}
```

**Why √n?**

```
If n = 36:
Divisors: 1, 2, 3, 4, 6, 9, 12, 18, 36

Notice: After √36 = 6, divisors are pairs:
  1 × 36
  2 × 18
  3 × 12
  4 × 9
  6 × 6  ← √36

After 6, we only find complements of divisors we already found.
So checking up to √n is sufficient.
```

**Time Complexity:** O(√n) **Space Complexity:** O(1)


## 3.11 Fibonacci Series

**Problem:** Generate Fibonacci sequence where each number is sum of previous two.

**Logic:**

- F(0) = 0, F(1) = 1
- F(n) = F(n-1) + F(n-2)

**Java Solution (Iterative):**

```java
public class Fibonacci {
    public static void printFibonacci(int n) {
        if (n <= 0) return;
        
        int a = 0, b = 1;
        
        System.out.print(a + " ");  // Print F(0)
        
        if (n == 1) return;
        
        System.out.print(b + " ");  // Print F(1)
        
        for (int i = 2; i < n; i++) {
            int next = a + b;
            System.out.print(next + " ");
            a = b;
            b = next;
        }
    }
    
    public static void main(String[] args) {
        printFibonacci(10);  // 0 1 1 2 3 5 8 13 21 34
    }
}
```

**Java Solution (Recursive):**

```java
public class FibonacciRecursive {
    public static int fibonacci(int n) {
        // Base cases
        if (n == 0) return 0;
        if (n == 1) return 1;
        
        // Recursive case
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    public static void main(String[] args) {
        for (int i = 0; i < 10; i++) {
            System.out.print(fibonacci(i) + " ");
        }
        // Output: 0 1 1 2 3 5 8 13 21 34
    }
}
```

**Sequence Explanation:**

```
F(0) = 0
F(1) = 1
F(2) = F(1) + F(0) = 1 + 0 = 1
F(3) = F(2) + F(1) = 1 + 1 = 2
F(4) = F(3) + F(2) = 2 + 1 = 3
F(5) = F(4) + F(3) = 3 + 2 = 5
F(6) = F(5) + F(4) = 5 + 3 = 8
...
```

**Time Complexity:**

- Iterative: O(n)
- Recursive: O(2^n) - very slow!

**Space Complexity:**

- Iterative: O(1)
- Recursive: O(n) - call stack


# 4. Array Manipulation Basics {#arrays}

## 4.1 Reverse an Array

**Problem:** Reverse elements in-place using two pointers.

**Logic:**

- Use two pointers: start and end
- Swap elements
- Move pointers towards center

**Java Solution:**

```java
public class ReverseArray {
    public static void reverse(int[] arr) {
        int left = 0;
        int right = arr.length - 1;
        
        while (left < right) {
            // Swap elements
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            
            // Move pointers
            left++;
            right--;
        }
    }
    
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3, 4, 5};
        
        System.out.println("Original: " + java.util.Arrays.toString(numbers));
        reverse(numbers);
        System.out.println("Reversed: " + java.util.Arrays.toString(numbers));
        // Output: [5, 4, 3, 2, 1]
    }
}
```

**Visualization:**

```
Initial: [1, 2, 3, 4, 5]
         ↑           ↑
       left        right

Step 1: Swap 1 and 5
        [5, 2, 3, 4, 1]
            ↑     ↑
          left   right

Step 2: Swap 2 and 4
        [5, 4, 3, 2, 1]
               ↑
           left=right (stop)
```

**Time Complexity:** O(n) **Space Complexity:** O(1)


## 4.5 Find Second Largest Element

**Problem:** Find the second largest element in array.

**Logic:**

- Track largest and second largest
- Update both as you traverse

**Java Solution:**

```java
public class SecondLargest {
    public static int findSecondLargest(int[] arr) {
        if (arr.length < 2) {
            throw new IllegalArgumentException("Array must have at least 2 elements");
        }
        
        int first = Integer.MIN_VALUE;
        int second = Integer.MIN_VALUE;
        
        for (int num : arr) {
            if (num > first) {
                second = first;
                first = num;
            } else if (num > second && num != first) {
                second = num;
            }
        }
        
        if (second == Integer.MIN_VALUE) {
            throw new IllegalArgumentException("No second largest element");
        }
        
        return second;
    }
    
    public static void main(String[] args) {
        int[] numbers = {45, 12, 78, 23, 90, 34};
        System.out.println("Second largest: " + findSecondLargest(numbers));  // 78
    }
}
```

**Time Complexity:** O(n) **Space Complexity:** O(1)


## 5.2 Swap Two Numbers

**Method 1: Using Temporary Variable**

```java
public class SwapWithTemp {
    public static void swap(int a, int b) {
        System.out.println("Before: a=" + a + ", b=" + b);
        
        int temp = a;
        a = b;
        b = temp;
        
        System.out.println("After: a=" + a + ", b=" + b);
    }
    
    public static void main(String[] args) {
        swap(10, 20);
        // Before: a=10, b=20
        // After: a=20, b=10
    }
}
```

**Method 2: Without Temporary Variable (Arithmetic)**

```java
public class SwapWithoutTemp {
    public static void swap(int a, int b) {
        System.out.println("Before: a=" + a + ", b=" + b);
        
        a = a + b;  // a = 10 + 20 = 30
        b = a - b;  // b = 30 - 20 = 10
        a = a - b;  // a = 30 - 10 = 20
        
        System.out.println("After: a=" + a + ", b=" + b);
    }
    
    public static void main(String[] args) {
        swap(10, 20);
    }
}
```

**Method 3: Using XOR (Bitwise)**

```java
public class SwapXOR {
    public static void swap(int a, int b) {
        System.out.println("Before: a=" + a + ", b=" + b);
        
        a = a ^ b;  // XOR
        b = a ^ b;
        a = a ^ b;
        
        System.out.println("After: a=" + a + ", b=" + b);
    }
    
    public static void main(String[] args) {
        swap(10, 20);
    }
}
```


## 5.4 Find Sum of Even and Odd Digits Separately

**Java Solution:**

```java
public class SumEvenOddDigits {
    public static void sumEvenOddDigits(int num) {
        int evenSum = 0;
        int oddSum = 0;
        
        while (num > 0) {
            int digit = num % 10;
            
            if (digit % 2 == 0) {
                evenSum += digit;
            } else {
                oddSum += digit;
            }
            
            num /= 10;
        }
        
        System.out.println("Sum of even digits: " + evenSum);
        System.out.println("Sum of odd digits: " + oddSum);
    }
    
    public static void main(String[] args) {
        sumEvenOddDigits(12345);
        // Sum of even digits: 6 (2+4)
        // Sum of odd digits: 9 (1+3+5)
    }
}
```


## 6.2 Find Missing Number in Array (1 to n)

**Problem:** Array contains numbers 1 to n with one missing. Find it.

**Logic:** Sum of 1 to n = n×(n+1)/2. Subtract array sum from this.

**Java Solution:**

```java
public class MissingNumber {
    public static int findMissing(int[] arr) {
        int n = arr.length + 1;  // Total numbers including missing
        int expectedSum = n * (n + 1) / 2;
        
        int actualSum = 0;
        for (int num : arr) {
            actualSum += num;
        }
        
        return expectedSum - actualSum;
    }
    
    public static void main(String[] args) {
        int[] numbers = {1, 2, 4, 5, 6};  // 3 is missing
        System.out.println("Missing number: " + findMissing(numbers));  // 3
    }
}
```

**Example:**

```
Array: [1, 2, 4, 5, 6]
n = 6 (since one is missing)

Expected sum = 6×7/2 = 21
Actual sum = 1+2+4+5+6 = 18

Missing = 21 - 18 = 3
```

**Time Complexity:** O(n) **Space Complexity:** O(1)


## 6.4 Move Zeros to End

**Problem:** Move all zeros to end of array while maintaining order of non-zeros.

**Java Solution:**

```java
public class MoveZeros {
    public static void moveZerosToEnd(int[] arr) {
        int nonZeroIndex = 0;
        
        // Move all non-zeros to front
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] != 0) {
                arr[nonZeroIndex] = arr[i];
                nonZeroIndex++;
            }
        }
        
        // Fill remaining with zeros
        while (nonZeroIndex < arr.length) {
            arr[nonZeroIndex] = 0;
            nonZeroIndex++;
        }
    }
    
    public static void main(String[] args) {
        int[] numbers = {1, 0, 2, 0, 3, 0, 4};
        
        System.out.println("Before: " + java.util.Arrays.toString(numbers));
        moveZerosToEnd(numbers);
        System.out.println("After: " + java.util.Arrays.toString(numbers));
        // Before: [1, 0, 2, 0, 3, 0, 4]
        // After: [1, 2, 3, 4, 0, 0, 0]
    }
}
```

**Time Complexity:** O(n) **Space Complexity:** O(1)


## 6.6 Rotate Array by K Positions

**Problem:** Rotate array elements to right by k positions.

**Java Solution:**

```java
public class RotateArray {
    public static void rotate(int[] arr, int k) {
        int n = arr.length;
        k = k % n;  // Handle k > n
        
        // Reverse entire array
        reverse(arr, 0, n - 1);
        
        // Reverse first k elements
        reverse(arr, 0, k - 1);
        
        // Reverse remaining elements
        reverse(arr, k, n - 1);
    }
    
    private static void reverse(int[] arr, int start, int end) {
        while (start < end) {
            int temp = arr[start];
            arr[start] = arr[end];
            arr[end] = temp;
            start++;
            end--;
        }
    }
    
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3, 4, 5};
        
        System.out.println("Before: " + java.util.Arrays.toString(numbers));
        rotate(numbers, 2);
        System.out.println("After rotating by 2: " + java.util.Arrays.toString(numbers));
        // Before: [1, 2, 3, 4, 5]
        // After: [4, 5, 1, 2, 3]
    }
}
```

**Example: Rotate [1,2,3,4,5] by 2**

```
Step 1: Reverse entire array
  [1,2,3,4,5] → [5,4,3,2,1]

Step 2: Reverse first k=2 elements
  [5,4,3,2,1] → [4,5,3,2,1]

Step 3: Reverse remaining elements
  [4,5,3,2,1] → [4,5,1,2,3]
```

**Time Complexity:** O(n) **Space Complexity:** O(1)



## Common Mistakes to Avoid

1. **Array Index Out of Bounds**

```java
// Wrong
for (int i = 0; i <= arr.length; i++)  // <= causes error

// Correct
for (int i = 0; i < arr.length; i++)
```

2. **Integer Overflow**

```java
// Wrong for large numbers
int factorial = 1;

// Better
long factorial = 1L;
```

3. **Not Handling Edge Cases**

```java
// Always check:
if (arr == null || arr.length == 0) {
    // Handle empty array
}
```

4. **Off-by-One Errors**

```java
// Common in loops
while (num > 0)  // Correct
while (num >= 0) // May cause infinite loop with 0
```

5. **Not Initializing Variables**

```java
int sum;  // Not initialized
sum += 10; // Error!

// Correct
int sum = 0;
sum += 10;
```

