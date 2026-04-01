---
---

> **Subject:** {{Subject}}  
> **Topic Type:** Concept / Process / Architecture / Example  
> **Related Topics:** 

### 2. Relationship with Markov Decision Process (MDP)

An **MDP** consists of a set of states, actions, rewards, and transition probabilities. It assumes that the next state depends **only on the current state and action**, not on the history — this is called the **Markov property**. Q-learning operates within this framework but removes the need to know the transition probabilities ( P(s'|s,a) ). Instead of modeling the full MDP dynamics, Q-learning directly learns the **value of taking each action in each state**, known as the **Q-value**, by repeated interaction with the environment. Therefore, Q-learning can be seen as a **practical implementation of MDP concepts** when the environment’s model is unknown.


### 4. Why It Is Called “Q” and Not “P”

The letter **“Q”** in Q-learning stands for **“Quality”** of an action — it measures the quality of taking a certain action in a particular state. On the other hand, **“P”** is often used to represent **probability** in mathematics and MDPs (for example, ( P(s'|s,a) ), the probability of moving to a new state). Since Q-learning focuses on **value estimation** rather than **probabilistic transitions**, the term “Q” is used to emphasize that it quantifies the quality of action decisions rather than modeling probabilities.


### 6. How Q-Learning Works (Learning Process)

Q-learning learns through **interaction**, **experience**, and **feedback**:

1. The agent starts in an initial state.
2. It chooses an action (using ε-greedy policy).
3. The environment returns a **reward** and a **new state**.
4. The agent updates its Q-value for that state-action pair using the Bellman update rule.
5. This process repeats for many episodes until the Q-values converge to optimal values.
$$
   Once training is complete, the agent can follow the **optimal policy** ( \pi^*(s) = \arg\max_a Q(s,a) ) to make decisions that yield the highest expected rewards.
$$


### 8. Relation Between Reinforcement Learning and Q-Learning

Reinforcement Learning (RL) is the **broader paradigm** that deals with how agents learn optimal behavior through rewards and penalties. Q-learning is one of the **specific algorithms** within RL that implements this concept using the Q-function. In other words, **Q-learning is a practical realization of RL**, particularly suited for problems modeled as **Markov Decision Processes** where the agent learns the optimal policy without needing the full model of the environment.


