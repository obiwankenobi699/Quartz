---
---


> **Subject:** {{Subject}}  
> **Topic Type:** Concept / Process / Architecture / Example  
> **Related Topics:** 

## **2. The Main Idea**

Backpropagation aims to **minimize the error (loss)** between predicted output ((y)) and actual target ((t)).  
It uses **Gradient Descent** to adjust weights in the direction that reduces the loss function.

Mathematically, we minimize:  
$$
[  
E = \frac{1}{2} \sum (t - y)^2  
]  
$$
where (E) is the total error.

The weights are updated using:  
$$
[  
w_{ij}^{\text{new}} = w_{ij}^{\text{old}} - \eta \frac{\partial E}{\partial w_{ij}}  
]  
$$
Here,

$$
- ( \eta ) = learning rate,
$$
    
$$
- ( \frac{\partial E}{\partial w_{ij}} ) = derivative of error with respect to weight (gradient).
$$
    


### **Step 2: Compute Error at Output Layer**

Compare the predicted output with the actual target using a loss function:  
$$
[  
E = \frac{1}{2} (t - y)^2  
]
$$

This measures how far the network’s output is from the true label.


### **Step 4: Update Weights and Biases**

Once we have the error terms (δ), we update each weight:  
$$
[  
\Delta w_{ij} = \eta \cdot \delta_j \cdot y_i  
]  
$$
and update the weight:  
$$
[  
w_{ij}^{\text{new}} = w_{ij}^{\text{old}} + \Delta w_{ij}  
]  
$$
Bias is updated similarly:  
$$
[  
b_j^{\text{new}} = b_j^{\text{old}} + \eta \cdot \delta_j  
]
$$


## **4. Example (Simple Intuition)**

Imagine a network with:

- 2 input neurons
    
- 2 hidden neurons
    
- 1 output neuron
    

During training:

1. Input passes forward → produces prediction 0.8
    
2. Actual target = 1 → error = (1 - 0.8) = 0.2
    
3. This error flows backward → small weight corrections are made in hidden and input layers.
    
4. After many iterations, output becomes 0.99 (close to target).
    


## **6. Key Points**

- **Forward pass:** Compute outputs.
    
- **Backward pass:** Compute gradients using chain rule.
    
- **Weight update:** Apply gradient descent.
    
- **Goal:** Reduce overall loss.
    


## **8. Limitations**

- Can get stuck in **local minima**.
    
- Suffers from **vanishing or exploding gradients** (especially with deep networks and sigmoid/tanh).
    
- Requires differentiable activation functions.
    
- Sensitive to learning rate choice.
    


## **10. Real-World Use Cases**

- Image recognition and classification (CNNs use backprop).
    
- Speech recognition systems.
    
- Natural Language Processing (NLP).
    
- Medical image diagnosis.
    
- Game-playing agents and reinforcement learning models.
    

