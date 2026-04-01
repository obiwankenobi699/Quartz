---
---

# **Data Serialization and Deserialization**

## **1. What is Serialization?**

**Serialization** is the process of converting an in-memory data structure into a format that can be:

- stored (file, database)
    
- transmitted (network request)
    
- cached
    
- logged
    
- queued
    

### Common serialization formats:

- **JSON**
    
- **YAML**
    
- **XML**
    
- **Protocol Buffers**
    
- **MessagePack**
    
- **Avro**
    

### Example (JavaScript → JSON)

```js
const user = { name: "Mukul", age: 22 };
const json = JSON.stringify(user);
```

Result (serialized):

```json
{"name":"Mukul","age":22}
```


# **3. Why Do We Use Serialization?**

### Data transfer

APIs send/receive data in JSON because it is lightweight and universal.

### Persistent storage

Saving app config or user data into files:

- `.json`
    
- `.yaml`
    
- `.toml`
    

### Microservices

Services serialize data to send through:

- HTTP
    
- gRPC (proto)
    
- Message queues (Kafka/RabbitMQ)
    

### Caching

Tools like Redis store serialized data.

### Containers / Workflows

YAML is used for:

- Docker Compose
    
- Kubernetes
    
- GitHub Actions
    


# **5. Serialization vs. Encoding**

**Encoding** = converting text between formats (UTF-8, Base64).  
**Serialization** = converting objects into storable formats.

Example:  
Base64 is NOT serialization, it is encoding.


# **7. Summary**

|Concept|Meaning|
|---|---|
|Serialization|Object → string/file/transmittable format|
|Deserialization|String/file → object|
|Formats|JSON, YAML, XML, ProtoBuf, Avro|
|Used in|APIs, storage, microservices, CI/CD, caching|


## **2. Strings & Quoting**

YAML auto-detects strings, but when something looks like a number with letters (e.g. `3.4v`), you must quote it.

Example:

```yaml
version: "3.4v"
```


## **4. Block Scalars (Multiline Strings)**

Using `|` allows multi-line values:

```yaml
chai_type_two: |
  black_tea
  whole_milk
  34
```

This keeps line breaks exactly as written.


## **6. Lists of Objects**

Each item can itself be an object (mapping):

Incorrect YAML tried to mix mapping + list. Correct form:

```yaml
variety_chai:
  - v: Traditional
    ingredients:
      - masala
      - ginger
      - cardimon
  
  - v: Modern
    ingredients:
      - chocolate
      - honey
      - green
```

Each list item here contains:

- a key `v`
    
- an object `ingredients` which itself contains a list
    


# **Final Clean YAML From Your Code**

```yaml
version: "3.4v"
chai_type: masala chai
temperature: hot
brewing_time: 5

chai_recepy:
  base: black_tea
  milk: whole_milk

chai_type_two: |
  black_tea
  whole_milk
  34

features:
  - good
  - healthy
  - tasty

variety_chai:
  - v: Traditional
    ingredients:
      - masala
      - ginger
      - cardimon
  
  - v: Modern
    ingredients:
      - chocolate
      - honey
      - green
```


# ✔ YAML Pointers = **Anchors (&) and Aliases (*)**

### Example

```yaml
base_chai: &chai_base
  tea: black_tea
  milk: whole_milk
  sugar: medium

masala_chai:
  <<: *chai_base
  spice: masala

ginger_chai:
  <<: *chai_base
  spice: ginger
```


# ✔ Visual Model (Pointer-like behavior)

```
&chai_base  ----------------------+
                                   |
                                   v
masala_chai receives the same structure
ginger_chai receives the same structure
```

Both `masala_chai` and `ginger_chai` now share the same base configuration.


# ✔ Another Simple Pointer Example

```yaml
defaults: &def
  port: 8080
  host: localhost

dev:
  settings: *def

prod:
  settings:
    <<: *def
    port: 80
```


If you want, I can also make:

- a complete **YAML cheatsheet** including pointers, lists, maps
    
- examples for Kubernetes, GitHub Actions, Ansible
    
- deeply nested structures with anchors
    

Just say the word!

YAML has **type tags**, written with **!!**, that explicitly tell the parser what data type something should be.

Here are the three you asked about: **!!str**, **!!int**, **!!set** — with examples and explanation.


# ✔ **2. !!int** — Force value to be an integer

Even if the value is quoted or looks like a string, it becomes an integer.

### Example

```yaml
age: !!int "25"
hex: !!int "0xFF"      # YAML can convert hex → int
binary: !!int "0b1010" # → 10
```

### Use when:

- You want strict typing.
    
- You want to ensure something stays numeric.
    


# ✔ Combined Example (for your notes)

```yaml
config:
  port: !!int "8080"
  env: !!str production
  unique_items: !!set
    alpha: null
    beta: null
    gamma: null
```


