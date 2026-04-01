---
---

## Root Node, Branches, and Leaf Nodes

The **root node** is the topmost node in a decision tree and represents the entire dataset before any splitting occurs. It is the starting point of the decision-making process. From this root node, the algorithm identifies the best feature to split the data and creates **branches**. Each branch represents a possible outcome or decision based on a specific condition of a feature. The process continues until we reach a **leaf node**, which represents the final output or decision — such as a class label (“Spam” or “Not Spam”) or a numerical prediction. The path from the root to any leaf represents one complete decision rule in the model.

The Value Which  Is Having The Highest Gain Is Consider As rood node [[02_Information Theory#^e1aa4e]]


## ASCII Diagram of the Decision Tree Process

```
                         ┌──────────────────────────┐
                         │        Root Node         │
                         │  (Choose Best Feature)   │
                         └────────────┬─────────────┘
                                      │
              ┌───────────────────────┼────────────────────────┐
              │                                                │
     ┌────────▼────────┐                                ┌──────▼──────┐
     │   Split 1       │                                │   Split 2   │
     │  (Feature A=0)  │                                │ (Feature A=1)│
     └──────┬──────────┘                                └──────┬───────┘
            │                                                       │
     ┌──────▼───────┐                                         ┌──────▼───────┐
     │ Decision Node│                                         │Decision Node │
     │ (Feature B)  │                                         │(Feature C)   │
     └──────┬────────┘                                         └──────┬──────┘
            │                                                       │
     ┌──────▼──────┐                                         ┌──────▼──────┐
     │ Leaf Node   │                                         │ Leaf Node   │
     │  (Class=Yes)│                                         │ (Class=No)  │
     └──────────────┘                                         └─────────────┘
```

This diagram represents how the dataset is split recursively, forming branches and nodes, until final outcomes are achieved at the leaves.

