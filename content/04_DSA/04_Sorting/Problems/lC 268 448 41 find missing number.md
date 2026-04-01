---
---
- Missing Number → range **0 to n**
    
- Find Duplicates → range **1 to n**



> [!NOTE]
> we can solve this using 2 methods 
> cycle sort and XOR 
> 
> in Cycle sort if 
> 0 to n take 
> currect as arr[i]; because 
> 
> 0 value at 0 index, 1 value at 1 index
> 1 to n take
> currect as arr[i] -1;
> 1 value at 0
> 



CORE IDEA (Cyclic Sort Pattern)

Since numbers are from 0 to n:

- Every number should be at index = value
    
- Example:  
    nums[0] = 0  
    nums[1] = 1  
    nums[2] = 2
    

So we:

1. Place every number at its correct index.
    
2. Then scan for mismatch.
    
3. If no mismatch → missing number is n.
    


# STEP-BY-STEP LOGIC EXPLANATION

1. Cyclic Placement
    

```java
int currect = nums[i];
if(currect < nums.length && nums[i] != nums[currect])
```

Important part:  
`currect < nums.length`

Why?

Because n has no index in array of size n.

If nums[i] == n:  
We must NOT try:  
nums[n] → that causes ArrayIndexOutOfBounds.

So we only place numbers 0 to n-1.

> [!NOTE]
> nums = [2,0]
> 
> At i = 0:
> 
> currect = nums[0] = 2
> 
> Now if you do:
> 
> nums[currect] → nums[2]
> 
> But index 2 does not exist.
> 
> ArrayIndexOutOfBoundsException.
> 
> Crash.
> 
> That is why we check:
> 
> currect < nums.length

> [!NOTE]
> 0-n element
> 0-n index
> 
> if one element missing
> 0-n element
> 0-n-1 index
> 



3. Why Final Return Is nums.length
    

Case 1:  
Mismatch found → return index.

Case 2:  
Everything matches → missing number must be n.

Example:  
Input: [0,1]

After sort:  
[0,1]

All match → missing = 2 → which is nums.length.


# COMMON MISTAKES YOU MADE

1. Returning -1
    

Earlier you wrote:

```java
return -1;
```

Wrong because problem guarantees exactly one missing number.

If no mismatch found → missing is n.

Correct return:

```java
return nums.length;
```


3. Not Checking currect < nums.length
    

Earlier version:

```java
if(nums[i] != nums[currect])
```

This causes crash when nums[i] == n.

Correct version:

```java
if(currect < nums.length && nums[i] != nums[currect])
```


PATTERN RECOGNITION FOR FUTURE QUESTIONS

Use Cyclic Sort when:

- Numbers are in range 0 to n
    
- Numbers are in range 1 to n
    
- Missing number problems
    
- Duplicate number problems
    
- First missing positive problems
    
