---
---


## ⚖️ **Entropy**

**Entropy** is a key concept in information theory. It measures the **amount of uncertainty or impurity** in a dataset.

If a dataset has **pure classes** (all examples belong to one category), its entropy is **zero** — meaning there’s **no uncertainty**.
If the dataset is **mixed equally** (half one class, half another), entropy is **maximum**, meaning **high uncertainty**.
The mathematical formula for entropy is:
$$

H(S)=−
i=1
C
∑

	

p
i
	

log
2
	

(p
i
	

)
$$


Where:

- S → Entropy of dataset
- C -> No of Class 
- pi → Probability of class 
- log2(pi) → Logarithm base 2 (because information is measured in bits)

**Example:**  
If a dataset has 10 samples — 6 positive and 4 negative:

$$
H(S)=−[0.6log2(0.6)+0.4log2(0.4)]=0.971
$$


So, the entropy is 0.971 bits, indicating moderate uncertainty.




## 🌳 **Relation Between All Concepts**

| Concept                | Meaning                                             | Formula                        | Used In                         |    |   |           |                                 |
| ---------------------- | --------------------------------------------------- | ------------------------------ | ------------------------------- | -- | - | --------- | ------------------------------- |
| **Information Theory** | Framework for measuring uncertainty and information | —                              | Basis for ML splitting criteria |    |   |           |                                 |
| **Entropy**            | Measures impurity or uncertainty in dataset         | (H(S) = -\sum p_i \log_2(p_i)) | Decision Tree nodes             |    |   |           |                                 |
| **Information Gain**   | Reduction in entropy after splitting                | (IG(S,A) = H(S) - \sum \frac{  | S_v                             | }{ | S | } H(S_v)) | Feature selection for splitting |

