---
---

### 1. Problem Overview

>Sometimes an array is sorted, but we do not know whether it is sorted in ascending or descending order.  
In such cases, we first determine the order of sorting, then apply binary search accordingly.

This technique is called **Order-Agnostic Binary Search**.


## 3. Step 2 – Apply Binary Search Based on Order

Binary search logic slightly changes depending on whether the array is ascending or descending.

### Standard Binary Search Loop

```java
while (start <= end) {
    int mid = start + (end - start) / 2;

    if (arr[mid] == target) {
        return mid;
    }

    // Adjust start or end here
}
```

Important: Always use  
`start + (end - start) / 2`  
to avoid integer overflow.


### If Array is Descending

The comparison reverses.

If `arr[mid] < target`, move left.  
If `arr[mid] > target`, move right.

```java
if (arr[mid] < target) {
    end = mid - 1;
} else {
    start = mid + 1;
}
```


## 6. Time and Space Complexity

Time Complexity: O(log n)  
Space Complexity: O(1)


## 8. When to Use Order-Agnostic Binary Search

Use this approach when:

- The array is sorted.
    
- The sorting order is not explicitly specified.
    
- You need to search efficiently in O(log n).
    


## 10. Key Takeaway

Binary search depends entirely on ordering.  
If the array order changes, the comparison logic must also change.

The overall structure remains the same; only the direction of movement differs.

This pattern forms the foundation for many advanced search problems.
