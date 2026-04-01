---
---


## Table of Contents

1. [Mountain Array - Find Peak](https://claude.ai/chat/1f251fa6-0735-438d-8a0e-209f2c147346#mountain-peak)
2. [Bitonic Array - Search Target](https://claude.ai/chat/1f251fa6-0735-438d-8a0e-209f2c147346#bitonic-search)
3. [Key Patterns](https://claude.ai/chat/1f251fa6-0735-438d-8a0e-209f2c147346#patterns)


## Key Observation

At any index `mid`:

```
If arr[mid] < arr[mid+1]:
  → In increasing slope
  → Peak is on the right
  → start = mid + 1

If arr[mid] > arr[mid+1]:
  → In decreasing slope
  → Peak is on left (including mid)
  → end = mid
```


# 2. Bitonic Array - Search Target {#bitonic-search}

## Problem Definition

**Bitonic Array:** Mountain array where we need to find a target value.

```
Array: [1, 3, 8, 12, 9, 5, 2]
                   ↑ peak
```


## Complete Solution

```java
class Solution {

    public int searchBitonic(int[] arr, int target) {
        int peak = findPeak(arr);

        // Search left (ascending)
        int left = binarySearch(arr, target, 0, peak, true);
        if (left != -1) return left;

        // Search right (descending)
        return binarySearch(arr, target, peak + 1, arr.length - 1, false);
    }

    private int findPeak(int[] arr) {
        int start = 0;
        int end = arr.length - 1;

        while (start < end) {
            int mid = start + (end - start) / 2;

            if (arr[mid] < arr[mid + 1]) {
                start = mid + 1;
            } else {
                end = mid;
            }
        }

        return start;
    }

    private int binarySearch(int[] arr, int target,
                             int start, int end,
                             boolean ascending) {

        while (start <= end) {
            int mid = start + (end - start) / 2;

            if (arr[mid] == target) return mid;

            if (ascending) {
                // Normal binary search
                if (arr[mid] < target)
                    start = mid + 1;
                else
                    end = mid - 1;
            } else {
                // Reverse binary search (descending)
                if (arr[mid] < target)
                    end = mid - 1;
                else
                    start = mid + 1;
            }
        }

        return -1;
    }
}
```


# 3. Key Patterns {#patterns}

## Pattern Recognition

**When you see:**

- Increasing then decreasing
- Single maximum
- Bitonic array
- Mountain array

**Think:**

```
Compare mid with mid+1
Shrink toward the slope direction
```

## Comparison Table

|Problem Type|Strategy|Time Complexity|
|---|---|---|
|**Find Peak**|Compare `arr[mid]` with `arr[mid+1]`|O(log n)|
|**Search in Bitonic**|1. Find peak<br>2. Binary search left<br>3. Binary search right|O(log n)|
|**Multiple Peaks**|Different algorithm (not covered here)|-|

## Template Summary

**Mountain Peak:**

```java
while (start < end) {
    mid = start + (end - start) / 2;
    if (arr[mid] < arr[mid+1])
        start = mid + 1;  // Go right
    else
        end = mid;        // Go left (include mid)
}
return start;
```

**Bitonic Search:**

```java
1. peak = findPeak(arr)
2. result = binarySearch(arr, target, 0, peak, ascending=true)
3. if not found: binarySearch(arr, target, peak+1, end, ascending=false)
```


## Quick Decision Guide

**Need to find peak only?**

- Use mountain peak algorithm
- Single pass, O(log n)

**Need to search for target?**

- Step 1: Find peak
- Step 2: Binary search left (ascending)
- Step 3: Binary search right (descending)
- Total: O(log n)

**Why not linear search?**

- Linear: O(n)
- Binary approach: O(log n)
- Maintains efficiency of binary search

![[04_DSA/03_Searching/Binary/Visual/Binarysearch.excalidraw.md#^frame=FaklgsjJAYqr23HKSuXcd|700]]
