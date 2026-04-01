---
---
Perfect 🔥 this is how you think like a DSA learner.

We’ll cover everything step-by-step:

1. ✅ 2nd Largest
    
2. ✅ 3rd Largest
    
3. 🔁 With duplicates
    
4. 📈 If array already sorted
    
5. 🔎 Binary search usage
    
6. 🧠 General pattern (linear + sorted)
    
7. 📚 LeetCode question numbers
    


# 🔥 1 Find 2nd Largest (Distinct)

### Pattern:

```java
int first = Integer.MIN_VALUE;
int second = Integer.MIN_VALUE;

for(int num : arr){

    if(num > first){
        second = first;
        first = num;
    }
    else if(num > second && num != first){
        second = num;
    }
}
```

Time → O(n)  
Space → O(1)


# 🧠 Example

```text
[10, 5, 8, 20, 15]
```

Final:

```
first = 20
second = 15
third = 10
```


# 🧠 PART 2 — General Kth Largest Pattern

Instead of writing first, second, third manually:

### Use Min Heap (Best scalable solution)

```java
PriorityQueue<Integer> pq = new PriorityQueue<>();

for(int num : arr){
    pq.add(num);

    if(pq.size() > k){
        pq.poll();
    }
}

return pq.peek();
```

Time → O(n log k)  
Used in interviews.


## 🔥 Case 1: Sorted Ascending

Largest → last index  
Second largest → last - 1  
Third largest → last - 2

But careful with duplicates:

```java
int count = 1;
int prev = arr[n-1];

for(int i = n-2; i >= 0; i--){
    if(arr[i] != prev){
        count++;
        prev = arr[i];
    }

    if(count == k){
        return arr[i];
    }
}
```

Time → O(n)


# 🧠 GENERAL PATTERN SUMMARY


## 🟢 Sorted Array

|Problem|Approach|
|---|---|
|kth largest|Index from end|
|distinct kth largest|Reverse scan|
|search element|Binary search|


### 🔥 Must Solve

|Q No|Problem|
|---|---|
|215|Kth Largest Element in an Array|
|414|Third Maximum Number|
|347|Top K Frequent Elements|
|169|Majority Element|
|53|Maximum Subarray|
|162|Find Peak Element|
|35|Search Insert Position|
|34|Find First and Last Position|
|704|Binary Search|
|153|Find Minimum in Rotated Sorted Array|


# 📊 Complexity Comparison

|Method|Time|Space|
|---|---|---|
|Sort|O(n log n)|O(1)|
|Linear scan|O(n)|O(1)|
|Heap|O(n log k)|O(k)|
|Quickselect|O(n) avg|O(1)|


You’re now entering intermediate DSA level.

If you want next:

- 🔥 Full Quickselect explanation
    
- 🔥 Sliding window pattern sheet
    
- 🔥 Binary search master template
    
- 🔥 20-question roadmap to master arrays
    

Tell me your target 😎
