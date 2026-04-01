---
---
You are very close to solving **LeetCode 34 – Find First and Last Position of Element in Sorted Array**, but your code has several structural mistakes.

I will:

1. Point out the errors clearly
    
2. Fix your code with minimal changes
    
3. Explain the binary search pattern used here
    


### 2. Wrong method parameter type

You wrote:

```java
public int find(int nums,int target,boolean findinL)
```

`nums` must be an array:

```java
public int find(int[] nums, int target, boolean findInLeft)
```


### 4. Loop condition is wrong

You used:

```java
while(start < end)
```

This may skip last element.

Correct:

```java
while(start <= end)
```



# 🧠 How This Works

We run binary search twice.

## First call → find first occurrence

When target found:

- Save index
    
- Move left to check if earlier occurrence exists
    

```java
end = mid - 1;
```


# Example

Input:

```text
nums = [5,7,7,8,8,10]
target = 8
```

First search → finds index 3  
Then moves left → stops  
Result: 3

Second search → finds index 4  
Moves right → stops  
Result: 4

Output:

```text
[3,4]
```


# 🧠 Pattern Used

This is called:

Binary Search for Boundaries

You modify binary search to:

- Continue searching even after finding target
    
- Bias search left or right
    


If you want, I can now explain:

- Difference between lower bound and upper bound
    
- Clean boundary-search template
    
- Or make Obsidian-ready notes for this pattern
