---
---
# ROTATED SORTED ARRAY - BINARY SEARCH

## Professional Quick Reference Guide


# 1. Core Concepts {#core-concepts}

## What is Pivot?

**Pivot** = Index of smallest element = Number of rotations = Split point

```java
Original: [1,2,3,4,5,6,7]
Rotated:  [4,5,6,7,1,2,3]
           
Pivot index = 4
Minimum = 1
Rotations = 4
```

## Array Structure

```java
[4,5,6,7 | 1,2,3]
 Larger  | Smaller
          ↑ pivot
```

**Key Property:** Both halves are sorted ascending.


# 3. Handling Duplicates {#duplicates}

## Problem with Duplicates

```
Array: [3,3,3,3,1,3,3]

When nums[mid] == nums[end]:
  → Cannot determine which half pivot is in
  → Binary search loses direction
```

## Solution: Safe Shrinking

```java
int findPivot(int[] nums) {
    int start = 0, end = nums.length - 1;

    while (start < end) {
        int mid = start + (end - start) / 2;

        if (nums[mid] > nums[end]) {
            start = mid + 1;
        }
        else if (nums[mid] < nums[end]) {
            end = mid;
        }
        else {
            end--;  // Skip duplicate safely
        }
    }

    return start;
}
```

**Time Complexity:** O(n) worst case, O(log n) average

**Why `end--` works:** Reducing end by 1 does not remove pivot from search space, only shrinks uncertainty.


# 5. Approach Comparison {#comparison}

## Method Overview

|Approach|Use Case|Handles Duplicates?|Time Complexity|Use For|
|---|---|---|---|---|
|**Normal Binary Search**|Fully sorted array|N/A|O(log n)|Standard search|
|**Pivot-First + 2 Searches**|Rotated, distinct elements|Partial (unstable)|O(log n)|Find min, rotation count|
|**Single-Pass Modified**|Rotated (any)|Yes|O(log n) avg, O(n) worst|Search target|
|**Pivot-Finding Only**|Need minimum/count|Needs fix|O(log n) avg|Find minimum|

## Why Single-Pass Works Better

**Pivot-First Approach:**

- Assumes clean split
- Fails when duplicates blur boundaries
- Commits early to structure

**Single-Pass Approach:**

- Re-evaluates sorted half every iteration
- Does not commit early
- Dynamically adapts to duplicates
- Passes all test cases


## Sort without Single pass , Using Pivot



```java
class Solution {

    public boolean search(int[] nums, int target) {

        int p = searchMin(nums);

        // Search left half
        if (bs(nums, 0, p - 1, target)) return true;

        // Search right half
        return bs(nums, p, nums.length - 1, target);
    }

    public int searchMin(int[] nums) {

        int start = 0;
        int end = nums.length - 1;

        while (start < end) {

            int mid = start + (end - start) / 2;

            if (nums[mid] > nums[end]) {
                start = mid + 1;
            }
            else if (nums[mid] < nums[end]) {
                end = mid;
            }
            else {
                end--;   // duplicate handling
            }
        }

        return start;
    }

    public boolean bs(int[] nums, int start, int end, int target) {

        while (start <= end) {

            int mid = start + (end - start) / 2;

            if (nums[mid] == target)
                return true;

            if (nums[mid] < target)
                start = mid + 1;
            else
                end = mid - 1;
        }

        return false;
    }
}
```


![[04_DSA/03_Searching/Binary/Visual/Binarysearch.excalidraw.md#^frame=lqfOPTILBBzZ8J2QnYtKm|700]]





|Approach|When To Use|Handles Duplicates?|Time Complexity|Solves Which Type of Questions|
|---|---|---|---|---|
|**Normal Binary Search**|Fully sorted array|❌ Not needed|O(log n)|Standard search problems|
|**Pivot-First + 2 Binary Searches**|Rotated array with **distinct elements**|⚠ Partial (unstable)|O(log n)|Find minimum, rotation count, search target|
|**Single-Pass Modified Binary Search**|Rotated array (distinct or duplicates)|✅ Yes|O(log n) avg, O(n) worst|Search target in rotated array|
|**Pivot-Finding Only**|Need minimum / rotation count|⚠ Needs duplicate fix|O(log n) avg|Find minimum element|


