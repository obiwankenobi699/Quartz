---
---
## Binary Search — What Do `start` and `end` Really Represent?

This is a foundational concept. If you understand this properly, binary search becomes easy in every variation.


# 2. In Standard Binary Search (Exact Match)

We maintain:

start≤endstart \leq end

Loop condition:

while (start ≤ end)\textbf{while (start ≤ end)}

Interpretation:

- If `arr[mid] < target`  
    → All elements left of mid are useless  
    → Move `start = mid + 1`
    
- If `arr[mid] > target`  
    → All elements right of mid are useless  
    → Move `end = mid - 1`
    

So:

start=first possible index where answer may existstart = \text{first possible index where answer may exist} end=last possible index where answer may existend = \text{last possible index where answer may exist}


# 4. Visual Interpretation

![[04_DSA/03_Searching/Binary/Visual/Binarysearch.excalidraw.md#^frame=MK9ZelrYfVKH20rHxrER0|700]]



