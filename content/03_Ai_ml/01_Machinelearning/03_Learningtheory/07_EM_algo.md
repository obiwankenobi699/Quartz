---
---

# **Expectation–Maximization (EM) Algorithm**

### **Introduction**

The **Expectation–Maximization (EM) Algorithm** is an iterative method used to estimate parameters of statistical models when the data contains **missing values**, **hidden (latent) variables**, or **incomplete information**. It is widely used in clustering (especially Gaussian Mixture Models), density estimation, and probabilistic modeling. EM alternates between estimating missing data and re-optimizing the model parameters until convergence.


# **Basic Idea**

EM algorithm repeatedly performs two steps until convergence:

1. **E-Step (Expectation Step):**  
    Estimate the expected value of the hidden variables using current parameter values.
    
2. **M-Step (Maximization Step):**  
    Update the model parameters by maximizing the expected log-likelihood computed in the E-step.
    

This process is repeated until the parameters stop changing significantly.


# **How EM Works Step-by-Step (Conceptually)**

1. **Initialize** model parameters randomly
    
2. **E-Step:**
    
    - Using the current model, estimate the probability of hidden variables
        
    - Assign soft responsibilities (soft clustering)
        
3. **M-Step:**
    
    - Recompute model parameters using these responsibilities
        
4. **Check Convergence:**
    
    - If parameters change very little → stop
        
    - Otherwise → repeat E and M steps
        


# **Advantages**

- Works even when data is incomplete or has hidden structure.
    
- Usually converges quickly.
    
- Extremely useful in unsupervised learning (e.g., clustering).
    


# **Applications**

- Gaussian Mixture Models (GMM)
    
- Soft clustering
    
- Missing data problems
    
- Hidden Markov Models (Baum–Welch algorithm)
    
- Medical imaging segmentation
    
- Speech recognition
    


# ✅ **EM Algorithm – Numerical Example (Gaussian Mixture Model)**

We have data points:

[  
X = {2, 4, 5, 7}  
]

Assume the data comes from **two Gaussian clusters**.  
We must estimate:

- Means: ( \mu_1, \mu_2 )
    
- Variances: ( \sigma_1^2, \sigma_2^2 ) (we will assume equal variance to simplify)
    
- Mixing weights: ( \pi_1, \pi_2 )
    


# ✔ Step 2: **E-Step — Compute Responsibilities**

For each data point (x_i), compute the probability that it belongs to cluster 1 or 2.

Formula (Gaussian density):

$$
[  
\gamma_{ik} = \frac{\pi_k \cdot N(x_i | \mu_k, \sigma^2)}  
{\sum_{j=1}^{2} \pi_j \cdot N(x_i | \mu_j, \sigma^2)}  
]
$$

We compute only the numerator because denominator is normalization.


### 🔹 For ( x = 4 )**

Cluster 1:  
$$
[  
N(4|3,1) = e^{-0.5} = 0.607  
]
$$

Cluster 2:  
$$
[  
N(4|8,1) = e^{-8} = 0.0003  
]
$$

Responsibilities:  
$$
[  
\gamma_{1}(4) = 0.995,\quad \gamma_{2}(4) = 0.005  
]
$$


### 🔹 For ( x = 7 )**

Cluster 1:  
[  
N(7|3,1) = e^{-8} = 0.0003  
]

Cluster 2:  
[  
N(7|8,1) = e^{-0.5} = 0.607  
]

Responsibilities:  
[  
\gamma_{1}(7) = 0.0005,\quad \gamma_{2}(7) = 0.9995  
]


### For cluster 1:

$$
[  
\sum \gamma_{i1} x_i =  
1\cdot2 +  
0.995\cdot4 +  
0.925\cdot5 +  
0.0005\cdot7  
]  
[  
= 2 + 3.98 + 4.625 + 0.0035 = 10.6085  
]

[  
\sum \gamma_{i1} = 1 + 0.995 + 0.925 + 0.0005 = 2.9205  
]

[  
\mu_1^{new} = \frac{10.6085}{2.9205} \approx 3.63  
]

$$

# ✔ Step 4: **Update Mixing Weights**

[  
\pi_k = \frac{1}{n} \sum_i \gamma_{ik}  
]

For cluster 1:

[  
\pi_1 = \frac{2.9205}{4} = 0.73  
]

For cluster 2:

[  
\pi_2 = \frac{1.0795}{4} = 0.27  
]


# ✔ Step 6: **Repeat E-step and M-step**

Continue until parameters stop changing (convergence).

