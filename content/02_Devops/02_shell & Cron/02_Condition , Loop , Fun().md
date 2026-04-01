---
---

## Table of Contents

1. [Conditional Statements](https://claude.ai/chat/607261bc-c435-4531-ba14-e695a595220c#conditional-statements)
2. [Loops: For & While](https://claude.ai/chat/607261bc-c435-4531-ba14-e695a595220c#loops-for--while)
3. [Functions](https://claude.ai/chat/607261bc-c435-4531-ba14-e695a595220c#functions)
4. [Complete Examples](https://claude.ai/chat/607261bc-c435-4531-ba14-e695a595220c#complete-examples)


## Loops: For & While

### For Loop (C-style)

**Basic syntax:**

```bash
for (( initialization; condition; increment )); do
    # commands
done
```

**Simple example:**

```bash
#!/bin/bash

Z

# Output:
# Number: 1
# Number: 2
# Number: 3
# Number: 4
# Number: 5
```

### For Loop: Create Directories

**Your handwritten code (translated):**

```bash
#!/bin/bash
# 1 = folder name prefix
# 2 = start range
# 3 = end range

for (( num=2; num<=3; num++ )); do
    mkdir "$1num"
done
```

**Corrected version:**

```bash
cat > for_loop.sh << 'EOF'
#!/bin/bash
# Arguments:
# $1 = prefix (folder name)
# $2 = start number
# $3 = end number

for (( num=$2; num<=$3; num++ )); do
    mkdir "${1}num${num}"
done
EOF

chmod +x for_loop.sh
```

**Key corrections explained:**

```
Issue 1: Variable expansion
Wrong:  for (( num=2; num<=3; num++ ))
Right:  for (( num=$2; num<=$3; num++ ))

Why: Should use script arguments $2 and $3
     Makes it flexible for any range


Issue 3: Folder naming

## Functions

### Basic Function Syntax

```bash
# Method 1: function keyword
function name() {
    # commands
}

# Method 2: Without function keyword (preferred)
name() {
    # commands
}
```

### Function Arguments

Functions use same argument variables as scripts:

|Variable|Meaning|
|---|---|
|`$1`|First argument|
|`$2`|Second argument|
|`$#`|Argument count|
|`$@`|All arguments|

### Simple Function Example

```bash
#!/bin/bash

# Define function
greet() {
    echo "Hello, $1!"
}

# Call function
greet "Mukul"
greet "World"

# Output:
# Hello, Mukul!
# Hello, World!
```

### Function with Return Value

**Your add_number function:**

```bash
#!/bin/bash

read -p "First num: " one
read -p "Second num: " two

add_number() {
    sum=$(( $1 + $2 ))
    echo "$sum"           # Output to capture
    return $sum           # Exit status (0-255 only)
}

ans=$(add_number $one $two)
echo "$ans"
```

**Important: return vs echo**

```bash
# return: Sets exit status ($?)
# - Only accepts 0-255
# - Used for success/failure
# - NOT for returning values

# echo: Prints to stdout
# - Can output any value
# - Captured with $()
# - Used for returning data
```

**Corrected version:**

```bash
#!/bin/bash

read -p "First num: " one
read -p "Second num: " two

add_number() {
    local sum=$(( $1 + $2 ))
    echo "$sum"
}

# Capture output
result=$(add_number $one $two)
echo "Sum is: $result"

# Check exit status
add_number $one $two > /dev/null
if [[ $? -eq 0 ]]; then
    echo "Function succeeded"
fi
```

### Function Best Practices

**Use local variables:**

```bash
calculate() {
    local num1=$1
    local num2=$2
    local result=$(( num1 + num2 ))
    echo $result
}
```

**Return success/failure:**

```bash
check_file() {
    if [[ -f $1 ]]; then
        echo "File exists"
        return 0  # Success
    else
        echo "File not found"
        return 1  # Failure
    fi
}

check_file "data.txt"
if [[ $? -eq 0 ]]; then
    echo "Check passed"
fi
```

### Complete Calculator Function

```bash
#!/bin/bash

calculator() {
    local num1=$1
    local op=$2
    local num2=$3
    local result
    
    case $op in
        +) result=$(( num1 + num2 )) ;;
        -) result=$(( num1 - num2 )) ;;
        \*) result=$(( num1 * num2 )) ;;
        /) result=$(( num1 / num2 )) ;;
        %) result=$(( num1 % num2 )) ;;
        *)
            echo "Error: Invalid operator"
            return 1
            ;;
    esac
    
    echo $result
    return 0
}

# Usage
read -p "Enter first number: " n1
read -p "Enter operator (+,-,*,/,%): " op
read -p "Enter second number: " n2

answer=$(calculator $n1 $op $n2)
echo "Result: $answer"
```


## Quick Reference

### Conditional Flow

```bash
if [[ condition ]]; then
    # commands
elif [[ condition ]]; then
    # commands
else
    # commands
fi
```

### For Loop

```bash
for (( i=start; i<=end; i++ )); do
    # commands
done

for item in "${array[@]}"; do
    # commands
done
```

### While Loop

```bash
while [[ condition ]]; do
    # commands
done
```

### Function

```bash
function_name() {
    local var=$1
    echo "result"
    return 0
}

result=$(function_name arg)
```

