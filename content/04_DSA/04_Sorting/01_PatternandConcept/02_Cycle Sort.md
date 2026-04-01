---
---

1. Basic Idea
    

Cycle Sort is an in-place sorting algorithm that works by placing every element directly into its correct position using the concept of permutation cycles.

Instead of repeatedly swapping adjacent elements, it calculates the exact position where an element should go and moves it there.

It minimizes the number of swaps.


3. What Does “Cycle” Mean?
    

Suppose array:

4 3 2 1

Correct sorted array:

1 2 3 4

Look at positions:

4 should go to index 3  
1 should go to index 0  
2 should go to index 1  
3 should go to index 2

If you track movements:

4 → 1 → 4  
3 → 2 → 3

These movements form permutation cycles.

A cycle means:  
A group of elements that rotate among themselves to reach correct positions.


5. Why Is It Called Minimum Swap Algorithm?
    

Cycle sort performs at most (n - number_of_cycles) swaps.

Worst case swaps: O(n)

While most O(n²) algorithms do O(n²) swaps, cycle sort does very few swaps.


7. Time Complexity
    

Worst Case: O(n²)  
Best Case: O(n²)  
Space Complexity: O(1)  
Swaps: O(n)


9. Is It Stable?
    

No.

Cycle sort is not stable because equal elements may change relative order.


11. Interview-Level Understanding
    

If interviewer asks:

Why use Cycle Sort?

Answer:  
Because it minimizes the number of swaps and is useful when memory writes are expensive.

If interviewer asks:

Why is it O(n²) if swaps are O(n)?

Answer:  
Because finding the correct position requires scanning remaining elements each time.

If interviewer asks:

What mathematical idea is used?

Answer:  
Permutation cycles.


13. When Cycle Sort Is Commonly Asked
    

- Minimum swaps to sort an array
    
- Count swaps required
    
- Detect permutation cycles
    
- Problems like “minimum swaps to sort array”
    

