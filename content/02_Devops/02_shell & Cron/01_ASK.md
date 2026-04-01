---
---
## Table of Contents

1. [Understanding OS Architecture](#understanding-os-architecture)
2. [Shell Types & Selection](#shell-types--selection)
3. [Shebang & Script Execution](#shebang--script-execution)
4. [Variables & User Input](#variables--user-input)
5. [Command Arguments](#command-arguments)
6. [System Files Reference](#system-files-reference)


## Shell Types & Selection

### Common Shell Types

| Shell | Binary Path | Description | Default On |
|-------|-------------|-------------|------------|
| **bash** | `/bin/bash` | Bourne Again Shell (most common) | Most Linux |
| **sh** | `/bin/sh` | Original Bourne Shell | Old Unix |
| **zsh** | `/bin/zsh` | Z Shell (modern, feature-rich) | macOS |
| **fish** | `/usr/bin/fish` | Friendly Interactive Shell | User install |
| **ksh** | `/bin/ksh` | Korn Shell | AIX, Solaris |
| **tcsh** | `/bin/tcsh` | Enhanced C Shell | BSD |
| **dash** | `/bin/dash` | Debian Almquist Shell (fast) | Debian/Ubuntu |

### Check Your Shell

```bash
# Current shell
echo $SHELL
# Output: /bin/bash

# Available shells
cat /etc/shells
# Output:
# /bin/sh
# /bin/bash
# /usr/bin/zsh
# /usr/bin/fish

# Change default shell
chsh -s /bin/zsh
```

### Shell Feature Comparison

| Feature | bash | zsh | fish | sh |
|---------|------|-----|------|-----|
| Tab completion | Basic | Advanced | Best | None |
| Syntax highlighting | No | Plugin | Built-in | No |
| Command history | Yes | Better | Best | Basic |
| Scripting | Standard | Compatible | Different | Basic |
| Speed | Medium | Medium | Slower | Fastest |
| Learning curve | Easy | Medium | Easy | Easy |


## Comments & Here Documents

### Single Line Comments

```bash
#!/bin/bash
# This is a comment
echo "Hello"  # Inline comment
```

### Block Comments

**Method 1: Multiple # lines**

```bash
#!/bin/bash
# This is a comment block
# Line 1
# Line 2
# Line 3
echo "After comments"
```

**Method 2: Here document redirect to null**

```bash
#!/bin/bash
<< 'COMMENT'
This is a block comment
Multiple lines
No execution
COMMENT

echo "Script continues"
```

**Method 3: Colon command**

```bash
#!/bin/bash
: '
This is also a block comment
Using colon operator
Multi-line
'
echo "Script continues"
```

### Here Documents (Heredoc)

**Basic heredoc:**

```bash
cat << EOF
Line 1
Line 2
Line 3
EOF
```

**Create file with heredoc:**

```bash
cat > filename.txt << 'EOF'
#!/bin/bash
echo "Hello-mukul"
echo "This is a script"
EOF
```

**Heredoc variations:**

```bash
# With variable expansion
cat << EOF
Username: $USER
Home: $HOME
EOF

# Without variable expansion (quoted delimiter)
cat << 'EOF'
Username: $USER
Home: $HOME
EOF

# Suppress leading tabs (<<-)
cat <<- EOF
	Line with tab
	Another tab
EOF

# Append to file
cat >> file.txt << EOF
New content
EOF
```


## Command Arguments

### Argument Variables

| Variable | Meaning | Example |
|----------|---------|---------|
| `$0` | Script name | `./myscript.sh` |
| `$1` | First argument | `arg1` |
| `$2` | Second argument | `arg2` |
| `$3` | Third argument | `arg3` |
| `$#` | Total argument count | `3` |
| `$@` | All args (separate) | `"arg1" "arg2" "arg3"` |
| `$*` | All args (single string) | `"arg1 arg2 arg3"` |
| `$?` | Last command exit status | `0` (success) |
| `$$` | Current process ID | `12345` |
| `$!` | Last background process ID | `12346` |

### Basic Argument Usage

```bash
#!/bin/bash

echo "Script name: $0"
echo "First argument: $1"
echo "Second argument: $2"
echo "Total arguments: $#"
echo "All arguments: $@"
```

**Run:**

```bash
chmod +x script.sh
./script.sh hello world
# Output:
# Script name: ./script.sh
# First argument: hello
# Second argument: world
# Total arguments: 2
# All arguments: hello world
```

### Complete Example with Arguments

```bash
#!/bin/bash

# Get command arguments
num1=$1
num2=$2

# If not provided, ask user
if [ -z "$num1" ]; then
    read -p "Enter first number: " num1
fi

if [ -z "$num2" ]; then
    read -p "Enter second number: " num2
fi

# Calculate
echo "Sum is $((num1 + num2))"
echo "Script: $0"
echo "Total args: $#"
echo "All args: $@"
```

**Usage:**

```bash
# With arguments
./script.sh 100 200
# Output:
# Sum is 300
# Script: ./script.sh
# Total args: 2
# All args: 100 200

# Without arguments (interactive)
./script.sh
# Prompts for input
```

### Difference: $@ vs $*

```bash
#!/bin/bash

echo "Using \$@:"
for arg in "$@"; do
    echo "- $arg"
done

echo ""
echo "Using \$*:"
for arg in "$*"; do
    echo "- $arg"
done
```

**Run:**

```bash
./script.sh "arg 1" "arg 2" "arg 3"

# Output with "$@" (separate):
# - arg 1
# - arg 2
# - arg 3

# Output with "$*" (single string):
# - arg 1 arg 2 arg 3
```

### Practical Argument Example

```bash
#!/bin/bash

# Check if username provided
if [ -z "$1" ]; then
    read -p "Enter username for new user: " name
else
    name=$1
fi

# Create user
sudo useradd -m $name

# Verify
echo "New user added: $name"
cat /etc/passwd | grep $name
```

**Usage:**

```bash
# Method 1: With argument
./create_user.sh johnsmith

# Method 2: Interactive
./create_user.sh
# Prompts: Enter username for new user:
```


## Quick Reference

### Script Template

```bash
#!/bin/bash
# Script: script_name.sh
# Description: What it does
# Author: Your Name
# Date: YYYY-MM-DD

# Exit on error
set -e

# Variables
VAR1="value"
VAR2="value"

# Functions
function main() {
    echo "Script starts"
    # Your code here
}

# Main execution
main
```

### Common Patterns

**Check if argument provided:**

```bash
if [ -z "$1" ]; then
    echo "Usage: $0 <argument>"
    exit 1
fi
```

**Loop through arguments:**

```bash
for arg in "$@"; do
    echo "Processing: $arg"
done
```

**Read file line by line:**

```bash
while IFS= read -r line; do
    echo "Line: $line"
done < file.txt
```

**Check if file exists:**

```bash
if [ -f "file.txt" ]; then
    echo "File exists"
fi
```

