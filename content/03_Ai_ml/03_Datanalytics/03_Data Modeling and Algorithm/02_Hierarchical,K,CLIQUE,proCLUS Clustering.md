---
---


> **Subject:** {{Subject}}  
> **Topic Type:** Concept / Process / Architecture / Example  
> **Related Topics:** 

## **2. Hierarchical Clustering**

Hierarchical Clustering is a method of grouping data into a hierarchy or tree of clusters. Unlike K-Means, it does not require the number of clusters to be specified in advance. It creates a **dendrogram**, which visually represents how clusters are formed or divided at each level. There are two main approaches:

1. **Agglomerative (Bottom-Up):** Each data point starts as its own cluster, and pairs of clusters are merged step-by-step based on their similarity until only one cluster remains.
    
2. **Divisive (Top-Down):** All data points start in one large cluster, and the algorithm recursively splits it into smaller clusters.
    

The similarity between clusters is determined using **linkage criteria** such as single linkage (minimum distance), complete linkage (maximum distance), average linkage, or Ward’s method (minimizing variance). Hierarchical clustering is more interpretable and produces a hierarchy of clusters, but it can be computationally expensive for very large datasets.

![[Pasted image 20251113174851.png]]


## **4. CLIQUE (Clustering in Quest)**

**CLIQUE (Clustering In QUEst)** is a **grid-based subspace clustering algorithm** that identifies dense regions in subspaces of high-dimensional data. It automatically determines both the number of clusters and the relevant dimensions.

The algorithm divides each dimension into equal-sized intervals, forming a grid of units. Each unit (cell) is labeled as **dense** if the number of data points in it exceeds a user-defined threshold. CLIQUE then identifies clusters as contiguous regions of dense units across dimensions. It works bottom-up, starting from 1D subspaces and progressively combining them to form higher-dimensional clusters.

CLIQUE is scalable, interpretable, and can handle noise, but its performance depends on grid size and density threshold. It is particularly useful when clusters exist in specific subspaces of a high-dimensional dataset.


![[Pasted image 20251113180000.png]]




## **6. Comparison Summary**

|**Algorithm**|**Type**|**Handles High Dimensions**|**Shape of Clusters**|**Main Idea**|
|---|---|---|---|---|
|**K-Means**|Partition-based|No|Spherical|Minimizes sum of squared distances to centroids|
|**Hierarchical**|Hierarchy-based|No|Arbitrary|Builds tree-like hierarchy using linkage criteria|
|**CLIQUE**|Grid-based Subspace|Yes|Arbitrary|Finds dense regions in subspaces using grid partitioning|
|**ProCLUS**|Partition-based Subspace|Yes|Arbitrary|Projects data into subspaces to find compact clusters|


## **2. Frequent Pattern-Based Clustering**

Frequent Pattern-Based Clustering is a technique that uses **frequent itemset mining concepts** from association rule mining (like Apriori or FP-Growth) to discover clusters. Instead of relying purely on distance measures, this approach groups objects that share **common frequent patterns** or **co-occurring features**. Each cluster is represented by a set of frequent patterns that describe the cluster’s internal structure.  
The process involves two main steps — (1) finding frequent patterns among the dataset, and (2) using these patterns to assign or group data points into clusters. For example, in a transaction dataset, customers who frequently purchase similar items can be grouped together based on common item patterns. This method is highly effective in **categorical, transactional, or binary data**, where numerical distances are meaningless. It provides more **interpretable clusters** since the cluster representation directly shows which patterns are most characteristic of that group.

