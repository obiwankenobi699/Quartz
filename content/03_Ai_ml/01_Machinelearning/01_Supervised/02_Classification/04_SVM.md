---
---
# SUPPORT VECTOR MACHINE (SVM): Complete Guide


# 1. INTRODUCTION TO SVM

## 1.1 What is SVM?

```
┌────────────────────────────────────────────────────────┐
│        SUPPORT VECTOR MACHINE (SVM)                    │
├────────────────────────────────────────────────────────┤
│                                                        │
│  Definition: A supervised machine learning algorithm   │
│              used for classification and regression    │
│                                                        │
│  Goal: Find the optimal hyperplane that separates     │
│        data into different classes with maximum       │
│        margin                                          │
│                                                        │
│  Key Idea: Maximize the distance (margin) between     │
│            the decision boundary and nearest points   │
│            from each class                            │
│                                                        │
└────────────────────────────────────────────────────────┘
```


## 1.3 Key Components

```
┌────────────────────────────────────────────────────────┐
│         SVM KEY COMPONENTS                             │
├────────────────────────────────────────────────────────┤
│                                                        │
│  1. HYPERPLANE                                         │
│     └─ Decision boundary separating classes           │
│                                                        │
│  2. SUPPORT VECTORS                                    │
│     └─ Data points closest to hyperplane              │
│     └─ Define the margin                              │
│                                                        │
│  3. MARGIN                                             │
│     └─ Distance between hyperplane and support vectors│
│     └─ Goal: Maximize this distance                   │
│                                                        │
│  4. KERNEL FUNCTION                                    │
│     └─ Maps data to higher dimensions                 │
│     └─ Enables non-linear classification              │
│                                                        │
└────────────────────────────────────────────────────────┘
```


## 2.2 SVM Objective

### Mathematical Goal:

```
┌────────────────────────────────────────────────────────┐
│         SVM OPTIMIZATION PROBLEM                       │
├────────────────────────────────────────────────────────┤
│                                                        │
│  Maximize: Margin width                                │
│                                                        │
│  Subject to: All points correctly classified           │
│                                                        │
│  Formula:                                              │
│  Minimize: ½ ||w||²                                    │
│                                                        │
│  Constraint: yᵢ(w·xᵢ + b) ≥ 1                         │
│                                                        │
│  Where:                                                │
│  ├─ w = weight vector (perpendicular to hyperplane)   │
│  ├─ b = bias term                                     │
│  ├─ xᵢ = data point                                   │
│  └─ yᵢ = class label (+1 or -1)                       │
│                                                        │
└────────────────────────────────────────────────────────┘
```


# 3. TYPES OF SVM

## 3.1 Classification

```
                    TYPES OF SVM
                         |
        ┌────────────────┴────────────────┐
        |                                 |
   LINEAR SVM                      NON-LINEAR SVM
        |                                 |
  Data linearly                     Data not linearly
  separable                         separable
        |                                 |
  Use linear                        Use kernel trick
  hyperplane                        to transform data
```


## 3.3 NON-LINEAR SVM

### Definition:

```
┌────────────────────────────────────────────────────────┐
│           NON-LINEAR SVM                               │
├────────────────────────────────────────────────────────┤
│                                                        │
│  Used when: Data is NOT linearly separable            │
│                                                        │
│  Strategy: Use kernel trick to map data to higher     │
│            dimensional space where it becomes         │
│            linearly separable                         │
│                                                        │
│  Key Insight: Don't explicitly transform data,        │
│               use kernel function to compute          │
│               inner products in higher dimensions     │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### Visual Example:

```
ORIGINAL SPACE (Not Linearly Separable):

        y
        ↑
        |        ○
        |    ●       ●
        |  ○   ●   ●   ○
        |    ●       ●
        |        ○
        └─────────────────→ x

Cannot draw a straight line to separate classes!


AFTER KERNEL TRANSFORMATION (Linearly Separable):

        z (new dimension)
        ↑
        |    ○   ○   ○
        |
        |─────────────────  ← Now linearly separable!
        |
        |  ●   ●   ●   ●
        └─────────────────→ x

Now we can separate with a hyperplane!
```


## 4.2 How Kernel Trick Works

### Traditional Approach (Expensive):

```
Step 1: Transform data explicitly
        x = [x₁, x₂]
        ↓
        φ(x) = [x₁², √2·x₁·x₂, x₂²]  ← Expensive!
        
Step 2: Compute dot product
        φ(x) · φ(x')
        ↓
        Result
```

### Kernel Trick (Efficient):

```
Step 1: Apply kernel function directly
        K(x, x') = (x · x')²
        ↓
        Compute in original space ← Fast!
        
Step 2: Get same result
        ↓
        Result (same as traditional approach)
```


## 4.4 Mathematical Example

### Polynomial Kernel Example:

```
Given two 2D points:
x = [x₁, x₂]
x' = [x'₁, x'₂]

EXPLICIT TRANSFORMATION (Slow):
─────────────────────────────────
Step 1: Transform
φ(x) = [x₁², √2·x₁·x₂, x₂²]
φ(x') = [x'₁², √2·x'₁·x'₂, x'₂²]

Step 2: Compute dot product
φ(x) · φ(x') = x₁²·x'₁² + 2·x₁·x₂·x'₁·x'₂ + x₂²·x'₂²
             = (x₁·x'₁ + x₂·x'₂)²

Operations: 9 multiplications + transformations


KERNEL TRICK (Fast):
────────────────────
K(x, x') = (x · x')²
         = (x₁·x'₁ + x₂·x'₂)²

Operations: 3 multiplications only!

Same result, much faster! ✓
```


## 5.2 LINEAR KERNEL

### Definition:

```
┌────────────────────────────────────────────────────────┐
│              LINEAR KERNEL                             │
├────────────────────────────────────────────────────────┤
│                                                        │
│  Formula: K(x, x') = x · x'                           │
│                                                        │
│  Description: Simple dot product                       │
│                                                        │
│  Use when: Data is linearly separable                 │
│                                                        │
│  Advantages:                                           │
│  ├─ Fastest computation                               │
│  ├─ No parameters to tune                             │
│  └─ Good for high-dimensional data                    │
│                                                        │
│  Disadvantages:                                        │
│  └─ Cannot handle non-linear patterns                 │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### Example:

```
x = [2, 3]
x' = [4, 1]

K(x, x') = x · x'
         = (2)(4) + (3)(1)
         = 8 + 3
         = 11
```

### Visual:

```
        y
        ↑
        |  ● ● ●
        |    ● ●
        |
        |──────────  ← Linear decision boundary
        |
        |  ○ ○
        |    ○ ○ ○
        └─────────────→ x

Works well when data is already linearly separable
```


## 5.4 RBF/GAUSSIAN KERNEL

### Definition:

```
┌────────────────────────────────────────────────────────┐
│         RBF (RADIAL BASIS FUNCTION) KERNEL             │
│         Also called GAUSSIAN KERNEL                    │
├────────────────────────────────────────────────────────┤
│                                                        │
│  Formula: K(x, x') = exp(-γ ||x - x'||²)             │
│                                                        │
│  Where:                                                │
│  ├─ γ (gamma) = kernel coefficient (1/2σ²)           │
│  ├─ ||x - x'|| = Euclidean distance                  │
│  └─ exp = exponential function                        │
│                                                        │
│  Alternative form:                                     │
│  K(x, x') = exp(-||x - x'||² / 2σ²)                  │
│                                                        │
│  Parameter:                                            │
│  └─ γ controls "reach" of influence                   │
│     - Large γ = close points matter (tight boundary)  │
│     - Small γ = far points matter (smooth boundary)   │
│                                                        │
│  Use when: Complex non-linear patterns               │
│                                                        │
│  Special property: Maps to INFINITE dimensions!       │
│                                                        │
└────────────────────────────────────────────────────────┘
```


## 5.6 RBF Kernel Example

### Calculation:

```
Given:
x = [1, 2]
x' = [4, 6]
γ = 0.5

Step 1: Compute squared Euclidean distance
||x - x'||² = (1-4)² + (2-6)²
            = (-3)² + (-4)²
            = 9 + 16
            = 25

Step 2: Apply gamma
-γ ||x - x'||² = -0.5 × 25 = -12.5

Step 3: Apply exponential
K(x, x') = exp(-12.5)
         = 0.0000037
         ≈ 0 (very dissimilar)

If points were close:
x = [1, 2]
x' = [1.1, 2.1]
||x - x'||² = 0.02
K(x, x') = exp(-0.5 × 0.02) = 0.99
         ≈ 1 (very similar)
```


## 5.8 Kernel Comparison Table

|Kernel|Formula|Parameters|Best For|Computational Cost|
|---|---|---|---|---|
|**Linear**|x · x'|None|Linear patterns, High-dim data|Low|
|**Polynomial**|(x · x' + c)^d|d, c|Polynomial relationships|Medium|
|**RBF/Gaussian**|exp(-γ\|x-x'\|²)|γ|Complex non-linear patterns|High|


## 6.2 Scalability Issues

### The Problem:

```
┌────────────────────────────────────────────────────────┐
│         SVM SCALABILITY ISSUES                         │
├────────────────────────────────────────────────────────┤
│                                                        │
│  Problem 1: TRAINING TIME                              │
│  └─ Complexity: O(n² × d) to O(n³ × d)                │
│     where n = samples, d = dimensions                  │
│                                                        │
│  Problem 2: MEMORY USAGE                               │
│  └─ Kernel matrix: n × n                              │
│     For n=10,000: 100 million entries!                │
│                                                        │
│  Problem 3: PREDICTION TIME                            │
│  └─ Must compute kernel with all support vectors      │
│     If 1000 support vectors → 1000 kernel evaluations │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### Visual Representation:

```
TRAINING TIME GROWTH:

    Time
     ↑
     |                        ╱
     |                     ╱
     |                  ╱
     |              ╱
     |          ╱
     |      ╱
     |  ╱
     └───────────────────────→ Number of samples
     
    Quadratic or cubic growth!


MEMORY USAGE:

For n samples:
Kernel Matrix = n × n

    n=100    → 10,000 entries       ✓ Manageable
    n=1,000  → 1,000,000 entries    ⚠ Large
    n=10,000 → 100,000,000 entries  ✗ Too large!
```

