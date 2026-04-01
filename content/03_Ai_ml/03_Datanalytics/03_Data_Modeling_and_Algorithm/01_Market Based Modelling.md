---
---


> **Subject:** {{Subject}}  
> **Topic Type:** Concept / Process / Architecture / Example  
> **Related Topics:** 


## **2. Support, Confidence, and Lift**

These are three important measures used in market-based modelling to evaluate association rules.  
**Support** indicates how frequently an item or itemset appears in the dataset. It helps in identifying popular combinations.  
**Confidence** shows the strength of an implication rule, representing how often items in Y appear in transactions that contain X (for rule X → Y). It measures the reliability of the inference made.  
**Lift** measures how much more likely Y is to be bought when X is bought compared to its normal purchase rate. A lift greater than 1 means a positive correlation between X and Y, while a lift equal to 1 means they are independent. These metrics help in filtering useful and strong rules.


## **4. Downward Closure Property**

The downward closure property, also called the anti-monotone property, states that if an itemset is infrequent, then all its supersets are also infrequent. Conversely, if an itemset is frequent, all its subsets are also frequent. This property allows the Apriori algorithm to prune the search space effectively. It helps avoid unnecessary computation by skipping candidate itemsets that cannot possibly be frequent, based on smaller infrequent subsets.


## **6. Flajolet–Martin Algorithm**

The Flajolet–Martin (FM) algorithm is a probabilistic algorithm used for estimating the number of distinct elements (cardinality) in a data stream. It is especially useful for large-scale, continuous data where counting distinct items directly is impossible due to memory constraints. The main idea is to hash each incoming element to a bitstring and record the position of the first ‘1’ bit (trailing zeros count). The maximum number of trailing zeros observed gives an estimate of the number of distinct elements because the probability of seeing k trailing zeros is 1/2^(k+1).


## **8. Example of Flajolet–Martin Algorithm**

Suppose three hash functions produce hash values with trailing zeros counts as 3, 4, and 2 for different subsets of data.  
Then, individual estimates are 2³ = 8, 2⁴ = 16, and 2² = 4.  
The average estimate = (8 + 16 + 4) / 3 = 9.33.  
The corrected estimate is n̂ = 9.33 / 0.77351 ≈ 12.06.  
Hence, approximately 12 distinct elements exist in the stream. This method efficiently approximates large-scale distinct counts in real time using minimal memory.

