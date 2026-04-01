---
---

> **Subject:** {{Subject}}  
> **Topic Type:** Concept / Process / Architecture / Example  
> **Related Topics:** 

## **2. Sampling Data in a Stream**

**Sampling** is the process of selecting a small representative subset of data items from a continuous data stream.  
It enables efficient estimation of overall stream properties without processing every element.

Sampling is critical when:

- The data stream is too large to store.
    
- Quick approximate results are needed.
    
- The system operates under memory or time constraints.
    


### **2.2 Systematic Sampling**

In **Systematic Sampling**, elements are selected at **regular intervals** rather than randomly.  
After choosing a random starting point, every _kth_ element is included in the sample.

**Example:**  
Select every 100th data record from the stream after a random start.

**Advantages:**

- Simple and easy to implement.
    
- Works well when data is uniformly distributed.
    


### **2.4 Priority Sampling**

**Priority Sampling** assigns a **priority score** to each data item based on its importance or weight.  
Only elements with higher priority are kept in the sample.

**Example:**  
In financial transaction streams, large-value transactions may be given higher priority.

**Advantage:** Focuses resources on more significant data.


## **3. Filtering in Streams**

**Filtering** reduces the data volume by removing irrelevant or unnecessary data before processing.


### **3.2 Probabilistic Filtering**

Data is included or discarded based on a **probability function**.  
This is useful when the system must manage high data rates but can tolerate approximations.

**Example:**  
Include each data point with a probability _p_ (e.g., 0.2 means 20% of data is kept).


## **4. Counting Distinct Elements**

In stream processing, it’s often necessary to estimate the **number of distinct elements** (like unique users or IP addresses) without storing all of them.

### **4.1 Hashing Technique**

A **hash function** maps each element to a unique bit position.  
By observing which bits are set to 1, the system estimates the number of unique elements.

However, this method is memory-intensive for large data.


## **5. Estimating Moments**

Moments describe statistical properties of a distribution, such as **mean**, **variance**, and **skewness**.  
In streaming systems, we estimate these moments without storing all data.

### **5.1 AMS Algorithm (Alon–Matias–Szegedy)**

The **AMS Algorithm** estimates frequency moments (Fn) of a data stream using random sampling and hashing.

- **F₁** → Total count of elements.
    
- **F₂** → Sum of squares of frequencies (used to estimate variance).
    
- **F₀** → Number of distinct elements.
    

**Key Idea:**  
Use random variables and hash functions to approximate these values with small space and constant time per element.


## **7. Decaying Window**

A **Decaying Window** assigns **more weight to recent data** and less weight to older data.  
Instead of a hard cut-off, older events gradually lose influence over time.

**Example:**  
Recent user activities influence recommendations more than older ones.

**Mathematically:**  
Weight = exp(−λ * age), where λ controls decay rate.

**Use Case:** Real-time trend analysis, adaptive learning models.




