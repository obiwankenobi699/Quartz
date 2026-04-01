---
---


### **Mathematical Formula**

Let’s define the variables first:
[^1]
* $( \Delta w_i )$: change in weight for input ( i )
* $( \eta )$: learning rate (a small constant)
* $( (t - y) )$: error term, where

  * $( t )$ = target (true output)
  * ( y ) = predicted output
* $( x_i )$: input value for weight ( w_i )

Then the **Delta Rule** is written as:
$$
[
\Delta w_i = \eta (t - y) x_i
]

$$
And the **weight update** becomes:
$$
[
w_i^{\text{new}} = w_i^{\text{old}} + \eta (t - y) x_i
]

$$

### **Connection to Gradient Descent**

The Delta Rule is a **special case of gradient descent** applied to a single-layer perceptron with a continuous activation function (like linear or sigmoid).
It minimizes the **Mean Squared Error (MSE)** loss function:
$$
[
E = \frac{1}{2}(t - y)^2
]
$$
The derivative of (E) with respect to the weight (w_i) gives:
$$
[
\frac{\partial E}{\partial w_i} = -(t - y)x_i
]
$$
Substituting this in the gradient descent formula:
$$
[
w_i^{\text{new}} = w_i^{\text{old}} - \eta \frac{\partial E}{\partial w_i}
]
$$
yields exactly the **Delta Rule**.


### **Difference Between Perceptron Rule and Delta Rule**

| Feature           | **Perceptron Learning Rule** | **Delta Rule**                        |
| ----------------- | ---------------------------- | ------------------------------------- |
| Activation        | Step (binary)                | Linear or continuous (e.g., Sigmoid)  |
| Error Calculation | Based on misclassification   | Based on numerical difference (t − y) |
| Works For         | Linearly separable data      | Linear and near-linear data           |
| Training Method   | Discrete weight updates      | Gradient-based weight updates         |
| Basis             | Heuristic                    | Derived from Gradient Descent         |


### **Summary**

* **Delta Rule:** A weight update rule based on gradient descent.
$$
* **Formula:** ( \Delta w_i = \eta (t - y) x_i )
$$
* **Goal:** Minimize Mean Squared Error.
* **Use:** Trains single-layer networks like Adaline(Single layered NN used for regression and classification).
* **Limitation:** Doesn’t work for multi-layer nonlinear networks.

