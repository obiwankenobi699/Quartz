---
---


> **Subject:** {{Subject}}  
> **Topic Type:** Concept / Process / Architecture / Example  
> **Related Topics:** 


## 2. The RL Framework

Reinforcement Learning follows this loop, called the **agent–environment interaction cycle**:

1. **State (S):**
   The agent observes the current situation from the environment.
   Example: The position of a robot, or the current game board.

2. **Action (A):**
   The agent chooses an action based on its policy (strategy).
   Example: Move left, accelerate, or jump.

3. **Reward (R):**
   After performing the action, the environment gives a numerical feedback (reward or penalty).
   Example: +1 for success, –1 for collision.

4. **Next State (S’):**
   The environment transitions to a new state depending on the action.

5. **Repeat:**
   This process continues until the goal is achieved or the episode ends.

This forms a **Markov Decision Process (MDP)**.


## 4. Key Learning Mechanisms

### **a. Exploration**

* Trying **new or random actions** to discover unknown states and rewards.
* Example: The agent moves randomly in a maze to find the exit.
* It helps to **collect diverse experiences**.

### **b. Exploitation**

* Choosing the **best-known action** based on past experience.
* Example: Once it knows turning right gives a reward, it keeps turning right.

**Balance** between these two is crucial:

* Too much exploration → wasted time learning what you already know.
* Too much exploitation → agent may miss better strategies.

**ε-greedy policy** is the most common method:
$$
[
\text{With probability } \varepsilon: \text{explore randomly.}
]
$$
$$
[
\text{With probability } 1-\varepsilon: \text{exploit best-known action.}
]

$$

### **d. Experience**

The agent stores its experiences as tuples:
$$
[
(S_t, A_t, R_{t+1}, S_{t+1})
]
$$
This is called a **transition**.

Modern RL algorithms (like Deep Q-Learning) use an **Experience Replay Buffer**:

* Stores past transitions.
* Randomly samples them to train neural networks.
* This **breaks correlation** between consecutive samples and improves learning stability.


## 6. How It “Learns” Over Time

Every interaction updates the agent’s understanding of which actions are best:

**Example (Q-learning update rule):**
$$
[
Q(S_t, A_t) \leftarrow Q(S_t, A_t) + \alpha [R_{t+1} + \gamma \max_{a'} Q(S_{t+1}, a') - Q(S_t, A_t)]
]
$$

Where:

* ( Q(S, A) ) = value of taking action A in state S.
* ( \alpha ) = learning rate.
* ( \gamma ) = discount factor.

Gradually, Q-values converge so the agent learns the **optimal policy**.


Would you like me to add **a visual diagram (agent ↔ environment loop)** for this process? It’ll help you visualize exploration, exploitation, and experience better.

