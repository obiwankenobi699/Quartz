---
---


### **2. Forward Propagation**

Once the data enters the network, the **forward propagation** process begins. Each neuron in the next layer multiplies the input values by their corresponding **weights**, adds a **bias**, and then sends the result through an **activation function**. This process continues from one layer to the next, propagating information forward until the final output layer is reached. The output at this stage is the model’s current prediction based on its existing weights.


### **4. Output Layer**

The **output layer** produces the final result of the network after all transformations. The type of output depends on the problem:

* For **regression**, the output might be a single continuous value.
* For **classification**, it often uses **Softmax** (for multi-class) or **Sigmoid** (for binary) activation to convert the network’s outputs into probabilities.
  This layer’s output is compared with the true label to determine how correct the network’s prediction is.

### **. Backpropagation Uses the Loss**

* Once the loss is computed, **backpropagation** starts.
* Backpropagation calculates the **gradient of the loss** with respect to each weight in the network:
$$
  [
  \frac{\partial L}{\partial w_{ij}}
  ]
$$
* These gradients tell the network **how much each weight contributed to the error**.
* Gradients are computed **layer by layer, starting from the output layer and moving backward**.


### **6. Backpropagation**

After the loss is calculated, the **backpropagation algorithm** begins. It works backward through the network, starting from the output layer and moving toward the input layer. Using **the chain rule of calculus**, it computes **gradients** — the partial derivatives of the loss with respect to every weight and bias. These gradients tell the network how much each weight contributed to the total error. In simple terms, backpropagation finds *who is responsible for how much of the error*.


### **8. Iteration and Learning**

The entire cycle — forward propagation, loss calculation, backpropagation, and gradient descent — happens repeatedly for many **epochs** (iterations over the dataset). With each cycle, the network’s weights are refined, the loss becomes smaller, and predictions become more accurate. This iterative improvement is what we call **training** the neural network.


### **Forward Pass Formulas**

1. **Hidden layer weighted sum:**
$$
   [
   z_j = \sum_i w_{ji} x_i + b_j
   ]
$$

2. **Hidden layer activation:**
$$
   [
   a_j = f(z_j)
   ]
$$

3. **Output layer weighted sum:**
$$
   [
   z_k = \sum_j w_{kj} a_j + b_k
   ]
$$

4. **Output activation (prediction):**
$$
   [
   y_k = f_{\text{out}}(z_k)
   ]
$$

5. **Loss (error) function:**
$$
   [
   L = \frac{1}{2} \sum_k (y_k - t_k)^2
   ]
$$


### **Gradient Descent Weight Update**

$$
[
w_{new} = w_{old} - \eta \cdot \frac{\partial L}{\partial w}
]
$$

* ( \eta ) = learning rate
* Update applies to **all weights**: input → hidden, hidden → output
* Biases are updated similarly:
$$
  [
  b_{new} = b_{old} - \eta \cdot \delta
  ]
$$


