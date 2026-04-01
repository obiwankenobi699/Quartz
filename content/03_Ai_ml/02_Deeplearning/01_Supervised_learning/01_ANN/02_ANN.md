---
---

### **Layers in ANN**

ANNs are structured into **three main types of layers**, each serving a specific purpose:

1. **Input Layer:**
   This is the first layer where the data enters the network. Each neuron in this layer represents one feature of the input dataset (for example, pixel values in an image or attributes in a dataset). It doesn’t perform computations—just forwards data to the next layer.

2. **Hidden Layers:**
   These are the intermediate layers where computation occurs. Each hidden layer neuron multiplies its input by weights, adds a bias, and applies an **activation function** (such as ReLU, Sigmoid, or Tanh). The number of hidden layers and neurons in each can vary depending on the problem’s complexity. Deeper networks can learn more abstract features.

3. **Output Layer:**
   The final layer produces the result of the ANN. For a classification task, it might use a **Softmax** activation function to produce class probabilities. For regression tasks, it could produce a single continuous value.


### **Perceptron**

A **Perceptron** is the simplest type of artificial neuron and forms the foundation of more complex neural networks. It was introduced by **Frank Rosenblatt** in 1958.

The perceptron takes multiple inputs, assigns weights to them, sums them, adds a **bias**, and then applies an **activation function** to produce an output. It is primarily used for **binary classification** problems (e.g., classifying inputs into 0 or 1).

Mathematically,
$$
[
y = f(w_1x_1 + w_2x_2 + ... + w_nx_n + b)
]
$$
where:

* $(x_1, x_2, ..., x_n)$ are input features,
* $(w_1, w_2, ..., w_n)$ are weights,
* $(b)$ is the bias, and
* $(f)$ is the activation function (e.g., step function).

If the weighted sum is above a certain threshold, the output is 1; otherwise, it’s 0.

