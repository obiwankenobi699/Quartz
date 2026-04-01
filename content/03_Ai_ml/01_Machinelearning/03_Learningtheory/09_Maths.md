---
---
Regression Formula


## 2. Forward Propagation (Layer-wise)

For layer (l):

### Weighted Sum

$$
[  
Z^{[l]} = W^{[l]} A^{[l-1]} + b^{[l]}  
]
$$

### Activation

$$
[  
A^{[l]} = f^{[l]}(Z^{[l]})  
]
$$

Final prediction:  
$$
[  
\hat{y} = A^{[L]}  
]
$$


## 4. Backpropagation (Gradient Computation)

Goal:  
$$
[  
\frac{\partial L}{\partial w_{ij}}  
]

$$
### Error Term for Output Layer (with Sigmoid + MSE)

$$
[  
\delta^{[L]} = ( \hat{y} - y ) \cdot f'(Z^{[L]})  
]
$$

### Error Term for Hidden Layers

For hidden layer (l):

$$
[  
\delta^{[l]} = f'(Z^{[l]}) \cdot \left( W^{[l+1]T} \delta^{[l+1]} \right)  
]
$$


## 6. Gradient Descent Update Rules

### Weight Update

$$
[  
W^{[l]}_{\text{new}} =  
W^{[l]}_{\text{old}} - \alpha \cdot \frac{\partial L}{\partial W^{[l]}}  
]
$$

### Bias Update

$$
[  
b^{[l]}_{\text{new}} =  
b^{[l]}_{\text{old}} - \alpha \cdot \frac{\partial L}{\partial b^{[l]}}  
]
$$

