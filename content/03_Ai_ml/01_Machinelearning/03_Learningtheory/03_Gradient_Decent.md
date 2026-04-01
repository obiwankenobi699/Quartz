---
---


> **Subject:** {{Subject}}  
> **Topic Type:** Concept / Process / Architecture / Example  
> **Related Topics:** 


### **Concept Behind Gradient Descent**

Imagine the loss function as a **curve** (a hill or valley) representing the model’s error for different weight values.

- The **x-axis** represents the weight parameters.
    
- The **y-axis** represents the loss (error).
    

The aim is to find the weight values where the loss is **minimum** — the bottom of the valley.

Gradient Descent does this by:

1. Calculating the **gradient** (slope) of the loss function with respect to each weight.
    
2. Moving the weights slightly in the **opposite direction** of the gradient (since gradient points toward the direction of maximum increase).
    
3. Repeating this process until the loss value converges to a minimum.
    


### **Learning Rate (η)**

The **learning rate** is a small constant that controls how big the steps are during optimization:

- If **η is too large**, the model might overshoot the minimum and fail to converge.
    
- If **η is too small**, convergence becomes very slow.
    
- A good learning rate ensures smooth and stable convergence.
    


### **Example Intuition**

Suppose you’re standing on a hill in thick fog and want to reach the lowest point (the valley).

- You can’t see far ahead, but you can **feel the slope** beneath your feet.
    
- You take a small step downhill (opposite direction of slope).
    
- You repeat this again and again — each time adjusting your direction slightly.  
    Eventually, you reach the bottom of the hill.  
    That’s exactly how **Gradient Descent** works — finding the “lowest error” by taking small steps guided by the gradient.
    


### **Summary**

- **Goal:** Minimize the loss function by updating weights in the opposite direction of the gradient.
    
$$
- **Formula:** ( w_{\text{new}} = w_{\text{old}} - \eta \times \frac{dL}{dw} )
$$
    
- **Learning Rate:** Controls step size.
    
- **Types:** Batch, Stochastic, and Mini-Batch.
    
- **Variants:** Momentum, RMSProp, Adam.
    

