---
---

> **Subject:** {{Subject}}  
> **Topic Type:** Concept / Process / Architecture / Example  
> **Related Topics:** 


### 1. **Definition**

An MDP is defined by a 5-tuple:
$$
[
(S, A, P, R, \gamma)
]
$$
where:

* **S (States):** All possible situations the agent can be in.
  Example: In a grid world, each cell position is a state.

* **A (Actions):** All possible moves the agent can take.
  Example: Up, down, left, right.

* **P (Transition Probability):**
  ( P(s'|s, a) ) = probability of moving to next state ( s' ) given current state ( s ) and action ( a ).
  This defines the *dynamics* of the environment.

* **R (Reward Function):**
  ( R(s, a) ) = immediate reward received after taking action ( a ) in state ( s ).
  This drives the learning goal.

* **γ (Discount Factor):**
  ( 0 \le \gamma \le 1 ) — determines how much the agent values future rewards.
  If γ = 0, only immediate rewards matter; if γ = 1, long-term rewards matter more.


### 3. **Policy (π)**

A **policy** is the agent’s behavior:
$$
[
\pi(a|s) = P(a_t = a | s_t = s)
]
$$
It defines how the agent chooses actions in each state.

The goal is to find the **optimal policy** ( \pi^* ) that maximizes the expected total discounted reward:
$$
[
\pi^* = \arg\max_\pi \mathbb{E}\left[\sum_{t=0}^\infty \gamma^t R(s_t, a_t)\right]
]

$$

### 5. **Learning in RL**

Reinforcement learning algorithms **learn the MDP model** or directly learn the **optimal value functions/policy** via interaction:

* **Exploration:** Try new actions to discover better rewards.
* **Exploitation:** Choose actions that already seem best.
* **Experience:** Agent collects state–action–reward–next-state tuples to learn from.

Methods include:

* **Value Iteration / Policy Iteration** (Dynamic Programming)
* **Q-Learning**, **SARSA**
* **Deep Q-Networks (DQN)**
* **Policy Gradient methods**










