---
---


> **Subject:** DL
> **Topic Type:** Concept / Process / Architecture / Example  
> **Related Topics:** 


## Structure of CNN

A typical CNN has the following structure:

```
Input Image → Convolution Layer → Activation Layer → Pooling Layer → 
              [Repeat Convolution + Pooling several times] → Flatten → 
              Fully Connected Layer → Output Layer
```

Each part has a distinct role in extracting and processing information.


## Convolution Layer

The **convolution layer** is the heart of CNN. It applies a **filter or kernel** (a small matrix of weights) that slides across the image and computes **dot products** between the kernel and the local region of the input. This process is called **convolution**.

Mathematical formula:  
$$
[  
y_{i,j}^{(k)} = \sum_m \sum_n X_{i+m, j+n} \cdot K_{m,n}^{(k)} + b_k  
]  
$$
Where  
( X ) = input pixel region,  
( K ) = kernel/filter,  
( b_k ) = bias,  
$$
( y_{i,j}^{(k)} ) = value in the output feature map.
$$


## Activation Layer (Non-linearity)

After convolution, the results go through an **activation function** to introduce **non-linearity**.  
This allows the network to learn complex relationships that are not just straight lines.

The most common activation is **ReLU (Rectified Linear Unit)**:  
$$
[  
f(x) = \max(0, x)  
]  
$$
It replaces all negative values with zero while keeping positive values unchanged.  
This makes the network faster and avoids vanishing gradients.


## Flatten Layer

After multiple convolution and pooling layers, the output is still a 3D array of features.  
The **flatten layer** converts this 3D feature map into a **1D vector**, which is required for the fully connected layers.  
It’s like unrolling all pixel values into a long column.


## Output Layer

The output layer provides the **final prediction**.  
For classification tasks, the **Softmax function** is used:  
$$
[  
P(y=i|x) = \frac{e^{z_i}}{\sum_j e^{z_j}}  
]  
$$
This converts raw outputs into probabilities across all classes.


**Step 2: Apply ReLU**  
Replace negative values with 0.


**Step 4: Flatten**  
Convert the 2×2 feature map into a 1×4 vector.


## ASCII Diagram of Convolution and Pooling

```
Input Image (6x6)
────────────────────────────
| 1 2 3 0 1 2 |
| 0 1 2 3 1 0 |
| 2 1 0 1 2 3 |
| 1 0 2 3 1 0 |
| 0 1 2 0 1 2 |
| 2 3 0 1 2 1 |

Kernel (3x3)
────────────────────────────
| 1 0 1 |
| 0 1 0 |
| 1 0 1 |

→ Convolution Operation →
Feature Map (4x4)
────────────────────────────
| 7 6 8 5 |
| 5 7 6 6 |
| 8 9 7 5 |
| 6 7 6 8 |

→ ReLU Activation →
| 7 6 8 5 |
| 5 7 6 6 |
| 8 9 7 5 |
| 6 7 6 8 |

→ Max Pooling (2x2) →
| 7 8 |
| 9 8 |

→ Flatten →
[7, 8, 9, 8]

→ Fully Connected →
→ Output Layer →
"Cat" with 0.92 probability
```

## Numerical

We’ll use your same example (6×6 input, 3×3 kernel, stride = 1, no padding).


## Step 2: Kernel (3×3)

```
1 0 1
0 1 0
1 0 1
```


### (A) Kernel on top-left corner (row=0, col=0)

Image patch:

```
1 2 3
0 1 2
2 1 0
```

Element-wise multiplication with kernel:

```
(1*1) + (2*0) + (3*1)
(0*0) + (1*1) + (2*0)
(2*1) + (1*0) + (0*1)
```

Sum = 1 + 0 + 3 + 0 + 1 + 0 + 2 + 0 + 0 = **7**

→ Feature map[0][0] = 7


## Step 4: Full Feature Map (Result after sliding across all positions)

After convolving the kernel across all valid (4×4) positions in the 6×6 image, we get:

```
7 6 8 5
5 7 6 6
8 9 7 5
6 7 6 8
```

[1 2 3] 0 1 2
[0 1 2] 3 1 0
[2 1 0] 1 2 3
  ^^^
  Kernel covers this region first → sum = 7
```

When we slide right one column:

```
1 [2 3 0] 1 2
0 [1 2 3] 1 0
2 [1 0 1] 2 3
      ↑
   new sum computed
```

→ Each new position gives **one number** in the **feature map**.


## Step 7: Apply ReLU (Rectified Linear Unit)

All negative values → 0
Here all are positive, so no change:

```
7 6 8 5
5 7 6 6
8 9 7 5
6 7 6 8
```


## Step 9: Flatten

Flatten this 2×2 matrix → vector:

```
[7, 8, 9, 8]
```


## Full Process (ASCII Diagram)

```
Input (6x6) → [Convolution 3x3] → Feature Map (4x4)
               ↓
               ReLU
               ↓
               Max Pooling (2x2)
               ↓
               Flatten → [7, 8, 9, 8]
               ↓
               Fully Connected (Dense)
               ↓
               Softmax Output
               ↓
               Prediction: "Cat" (0.92)
```

