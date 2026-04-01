---
---

## Activation Functions

Activation functions introduce non-linearity into neural networks so they can learn complex mappings. Below are common and widely used activation functions, grouped from simple to more advanced:

**Binary Step:** A threshold function that outputs 0 or 1 depending on whether the input is below or above a threshold. It is simple but non-differentiable at the threshold and has zero derivative elsewhere, so it is unusable with gradient-based learning.

**Linear:** A identity function that returns the input unchanged. Useful only for output layers in regression tasks because a network composed solely of linear activations is equivalent to a single linear transformation and cannot learn non-linear patterns.

**Sigmoid (Logistic):** Maps inputs to (0, 1) via 1 / (1 + e^-x). It is smooth and useful for binary-output layers but suffers from vanishing gradients for large magnitude inputs and is not zero-centered.

**Tanh (Hyperbolic Tangent):** Maps inputs to (-1, 1) and is zero-centered, often converging faster than sigmoid. It still suffers from the vanishing gradient problem for deep networks.

**ReLU (Rectified Linear Unit):** f(x) = max(0, x). It is computationally cheap, sparsifies activations, and mitigates vanishing gradients for positive inputs. ReLU can suffer from "dying ReLU" where neurons output zero for all inputs and stop learning.

**Leaky ReLU:** Similar to ReLU but allows a small, non-zero slope (e.g., 0.01x) for negative inputs. This reduces the dying ReLU issue while remaining simple to compute.

**PReLU (Parametric ReLU):** Like Leaky ReLU but the negative slope is a learned parameter per neuron, allowing the network to adapt the leakiness.

**ELU (Exponential Linear Unit):** Smooth for negative values, defined as x if x > 0 else α*(exp(x)-1). ELU tends to converge faster and produce mean activations closer to zero, which can speed up learning.

**SELU (Scaled ELU):** A scaled variant of ELU that, under certain conditions (specific initialization and architecture), leads to self-normalizing networks where activations maintain zero mean and unit variance.

**Softplus:** A smooth approximation of ReLU given by log(1 + e^x). It is differentiable everywhere and avoids hard zeroing but is more computationally expensive.

**GELU (Gaussian Error Linear Unit):** Uses a smooth gating mechanism approximating x * Φ(x) (Φ is Gaussian CDF). Popular in modern architectures (e.g., Transformers) for good empirical performance.

**Swish:** f(x) = x * sigmoid(βx) where β is a parameter (often 1). Swish is smooth and non-monotonic, showing improvements in some deep models.

**Softmax:** A multi-dimensional activation used in output layers for multi-class classification. It converts a vector of logits into a probability distribution that sums to 1 by exponentiating and normalizing.

When choosing an activation, consider model depth, task type (classification vs regression), the need for zero-centered outputs, and computational cost.


## Delta Rule

The Delta Rule (also called the Least Mean Squares rule in some contexts) is a specific gradient-descent learning rule for single-layer networks or linear units. It updates each weight proportionally to the error (target minus output), the input, and the learning rate. The rule aims to minimize mean squared error and is straightforward to derive by differentiating the loss with respect to each weight. The Delta Rule forms the conceptual basis for learning via gradient descent but is limited to shallow networks and linear units.


## Vanishing and Exploding Gradients

During backpropagation, gradients can shrink (vanish) or grow (explode) exponentially across many layers depending on weight initialization and activation choices. **Vanishing gradients** make earlier layers learn very slowly; this is common with sigmoid/tanh activations and deep architectures. **Exploding gradients** cause unstable updates and numerical overflow. Remedies include using ReLU-like activations, careful weight initialization (e.g., Xavier/Glorot, He initialization), batch normalization, gradient clipping, and architectures that enable gradient flow (residual connections).


## How These Pieces Fit Together

Activation functions define non-linear transforms between layers; gradient-descent algorithms and optimizers compute parameter updates from gradients produced by backpropagation; the delta rule is the simple single-layer precursor to backpropagation; modern optimizers (Adam, RMSProp, SGD+momentum) adapt update magnitudes and directions to improve convergence. Proper choice of activations, optimizers, initialization, and regularization is critical to successful training of neural networks.

