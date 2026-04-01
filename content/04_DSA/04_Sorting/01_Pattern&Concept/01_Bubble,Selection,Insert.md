---
---
Below are **Bubble Sort, Selection Sort, and Insertion Sort** — all implemented using **swap method**, with short theory and patterns.


# SELECTION SORT

Basic Idea  
Select the smallest element from the unsorted portion and place it at correct position.

Pattern Observed

- Find minimum
    
- Swap once per outer loop
    
- Left side becomes sorted
    

Time Complexity  
Best: O(n²)  
Average: O(n²)  
Worst: O(n²)  
Space: O(1)  
Stable: No

Code (Using Swap)

```java
import java.util.Arrays;

public class Main {

    static void swap(int[] arr, int a, int b) {
        int temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp;
    }

    static void selectionSort(int[] arr) {
        for (int i = 0; i < arr.length - 1; i++) {
            int minIndex = i;

            for (int j = i + 1; j < arr.length; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }

            swap(arr, i, minIndex);
        }
    }

    public static void main(String[] args) {
        int[] arr = {45, 56, 23, 98, 67};
        selectionSort(arr);
        System.out.println(Arrays.toString(arr));
    }
}
```



![[04_DSA/04_Sorting/visual/BSI.excelidraw.md#^frame=rpS2D6w2_nm4nHsMhZGId|700]]


Clear Pattern Comparison

Bubble Sort  
Largest element moves right  
Adjacent comparisons

Selection Sort  
Smallest element moves left  
Single swap per pass

Insertion Sort  
Element moves left gradually  
Sorted part grows from left


