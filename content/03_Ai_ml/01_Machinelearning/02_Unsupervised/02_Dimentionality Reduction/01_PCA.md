---
---
# Principal Component Analysis (PCA): Complete Deep Dive

## Table of Contents

1. [What is PCA?](https://claude.ai/chat/a9f210c4-2570-4485-90f1-6755fa8f7fa6#what-is-pca)
2. [The Mathematical Foundation](https://claude.ai/chat/a9f210c4-2570-4485-90f1-6755fa8f7fa6#mathematical-foundation)
3. [The Eigenvalue Problem](https://claude.ai/chat/a9f210c4-2570-4485-90f1-6755fa8f7fa6#eigenvalue-problem)
4. [PCA Algorithm Flow](https://claude.ai/chat/a9f210c4-2570-4485-90f1-6755fa8f7fa6#pca-flow)
5. [What Happens to Correlated Variables](https://claude.ai/chat/a9f210c4-2570-4485-90f1-6755fa8f7fa6#correlated-variables)
6. [Step-by-Step Example](https://claude.ai/chat/a9f210c4-2570-4485-90f1-6755fa8f7fa6#step-by-step-example)


## Mathematical Foundation

### Why Covariance Matrix?

The **covariance matrix** captures:

1. **Variance** of each variable (diagonal elements)
2. **Covariance** between variable pairs (off-diagonal elements)

```
Covariance Matrix (Σ):

        X₁      X₂      X₃
    ┌                       ┐
X₁  │ Var(X₁)  Cov(X₁,X₂)  Cov(X₁,X₃) │
X₂  │ Cov(X₂,X₁)  Var(X₂)  Cov(X₂,X₃) │
X₃  │ Cov(X₃,X₁) Cov(X₃,X₂)  Var(X₃)  │
    └                       ┘
```

**Why not just variance?**

- Variance only measures spread of individual variables
- **Covariance reveals relationships** between variables
- Correlated variables share information → PCA uses this to reduce dimensions


## PCA Algorithm Flow

```
                    START: Raw Data Matrix X (n×p)
                    n = samples, p = features
                              |
                              v
        ┌─────────────────────────────────────────┐
        │  STEP 1: Standardize Data               │
        │  (Mean=0, Variance=1 for each feature)  │
        │                                         │
        │  X_standardized = (X - μ) / σ           │
        └─────────────────────────────────────────┘
                              |
                              v
        ┌─────────────────────────────────────────┐
        │  STEP 2: Compute Covariance Matrix      │
        │                                         │
        │  Σ = (1/n) · X^T · X                    │
        │                                         │
        │  Captures variance & correlations       │
        └─────────────────────────────────────────┘
                              |
                              v
        ┌─────────────────────────────────────────┐
        │  STEP 3: Solve Eigenvalue Problem       │
        │                                         │
        │  Σ · v = λ · v                          │
        │                                         │
        │  Find: Eigenvalues (λ) &                │
        │        Eigenvectors (v)                 │
        └─────────────────────────────────────────┘
                              |
                              v
        ┌─────────────────────────────────────────┐
        │  STEP 4: Sort Components                │
        │                                         │
        │  Order eigenvalues: λ₁ > λ₂ > ... > λₚ  │
        │  Order eigenvectors accordingly         │
        └─────────────────────────────────────────┘
                              |
                              v
        ┌─────────────────────────────────────────┐
        │  STEP 5: Select k Components            │
        │                                         │
        │  Choose k where cumulative variance     │
        │  explained ≥ threshold (e.g., 95%)      │
        │                                         │
        │  Variance explained = λᵢ / Σλⱼ          │
        └─────────────────────────────────────────┘
                              |
                              v
        ┌─────────────────────────────────────────┐
        │  STEP 6: Project Data                   │
        │                                         │
        │  PC = X · V                             │
        │                                         │
        │  V = matrix of k eigenvectors           │
        │  PC = new data in PC space              │
        └─────────────────────────────────────────┘
                              |
                              v
                    RESULT: Principal Components
                    (n×k matrix, k < p)
```


## Step-by-Step Example

### Original Data (3 variables, highly correlated):

```
Sample   Height(cm)  Weight(kg)  Shoe_Size
  1         170         65          42
  2         180         75          44
  3         160         55          40
  4         175         70          43
```

### Step 1: Standardize

```
Sample   Height_std  Weight_std  Shoe_std
  1        -0.27       -0.27      -0.27
  2         1.34        1.34       1.34
  3        -1.61       -1.61      -1.61
  4         0.54        0.54       0.54
```

### Step 2: Covariance Matrix

```
              Height  Weight  Shoe
        ┌                         ┐
Height  │  1.00    0.98    0.99   │  ← Highly correlated!
Weight  │  0.98    1.00    0.97   │
Shoe    │  0.99    0.97    1.00   │
        └                         ┘
```

### Step 3: Solve Eigenvalue Problem

```
Eigenvalues (variance explained):
λ₁ = 2.95  → 98.3% of variance
λ₂ = 0.03  →  1.0% of variance
λ₃ = 0.02  →  0.7% of variance

Eigenvectors (component directions):
v₁ = [0.58, 0.58, 0.58]  ← PC1 direction
v₂ = [0.71, -0.71, 0.00] ← PC2 direction
v₃ = [0.41, 0.41, -0.82] ← PC3 direction
```

### Step 4: Interpretation

```
BEFORE:                      AFTER:
3 correlated variables  →    1 principal component
98.3% variance               (keeps 98.3% variance)

3D data                 →    1D data
                             (97% dimensionality reduction!)
```

### Visual Transformation:

```
Original 3D Space:          Principal Component Space:
(correlated)                (uncorrelated)

    Z                              PC₂
    |  / Y                          |
    | /                             |  .
    |/_____ X                       | . .
                                    |. . .
   All variables                    +────────── PC₁
   move together    →               
                                   PC₁ captures
                                   the shared pattern
```

