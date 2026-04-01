---
---
Comprehensive Notes with Explanation


### Example

```text
letters = ['c','f','j']
target  = 'c'
Output  = 'f'
```

Circular order:

```text
c → f → j → c → f → ...
```


# 3. Binary Search Logic

## Rule

```text
If letters[mid] <= target → move right
If letters[mid] >  target → move left
```

Why?

Because we want the first element strictly greater than target.


# 5. Step-by-Step Explanation

## Step 1 — Initialize Boundaries

```text
start = 0
end   = letters.length - 1
```

This defines the search space.


## Step 3 — Find Middle Safely

```java
int mid = start + (end - start) / 2;
```

Prevents integer overflow.


### Case 2: letters[mid] > target

```java
end = mid - 1;
```

Why?

Because:

- This might be a valid answer
    
- But we check left side for a smaller valid one
    


# 6. Circular Handling

```java
return letters[start % letters.length];
```

Why modulo?

Case:

```text
letters = ['c','f','j']
target  = 'z'
```

Binary search ends with:

```text
start = 3
```

Index 3 is out of bounds.

But:

3mod  3=03 \mod 3 = 0

So:

```text
letters[0] = 'c'
```

Correct circular behavior.


# 8. Visual Trace Example

Input:

```text
letters = ['c','f','j']
target  = 'c'
```

Initial:

```text
start=0, end=2
```

Pass 1:

```text
mid=1
letters[1]='f' > 'c'
end=0
```

Pass 2:

```text
mid=0
letters[0]='c' <= 'c'
start=1
```

Loop ends:

```text
start=1, end=0
```

Return:

```text
letters[1] = 'f'
```


### Target equal to largest

```text
letters=['c','f','j'], target='j'
```

Result: 'c' (circular)


# 10. Complexity

Time Complexity:

O(log⁡n)O(\log n)

Space Complexity:

O(1)O(1)


# 12. Related Problems

- 35 — Search Insert Position (Ceiling Index)
    
- 704 — Binary Search
    
- 34 — First and Last Position
    
- 540 — Single Element in Sorted Array
    

