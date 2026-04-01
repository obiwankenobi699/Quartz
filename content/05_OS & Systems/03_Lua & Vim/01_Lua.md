---
---


## Data Types, Variables, Scopes & Everything


## Introduction to Lua

**Lua** is a lightweight, embeddable scripting language known for:

- Simple syntax
- Fast execution
- Easy C integration
- Used in: Game development (Roblox, WoW), embedded systems, scripting

```
LUA PHILOSOPHY:
───────────────
Keep it Simple, Small, and Fast
• Minimalist design
• Everything is a table
• Dynamic typing
• Garbage collected
```


## Variables

### Local vs Global Variables

```lua
-- GLOBAL VARIABLE (no 'local' keyword)
global_var = "I'm global"

-- LOCAL VARIABLE (with 'local' keyword)
local local_var = "I'm local"

-- Best practice: ALWAYS use 'local' unless you need global
```

### Variable Declaration Examples:

```lua
-- Example 1: Local variables
do
    local x = 10
    local y = 20
    local sum = x + y
    print(sum)  -- Output: 30
end
-- x, y, sum are not accessible here

-- Example 2: Multiple assignment
local a, b, c = 1, 2, 3
print(a, b, c)  -- Output: 1  2  3

-- Unequal assignments
local x, y = 1  -- x=1, y=nil
local p, q, r = 1, 2, 3, 4  -- p=1, q=2, r=3, 4 is discarded

-- Swapping variables
local m, n = 10, 20
m, n = n, m  -- Swap
print(m, n)  -- Output: 20  10
```

### Variable Scope Rules:

```lua
-- RULE 1: Local variables shadow outer variables
local x = "outer"

do
    local x = "inner"
    print(x)  -- Output: inner
end

print(x)  -- Output: outer


-- RULE 2: Variables persist in their block
local function example()
    local count = 0
    
    for i = 1, 5 do
        count = count + 1
        -- 'i' is local to the for loop
        -- 'count' is local to the function
    end
    
    -- 'i' is not accessible here
    print(count)  -- Output: 5
end

example()
-- 'count' is not accessible here
```

```
VARIABLE SCOPE VISUALIZATION:
──────────────────────────────

Global Scope:
┌─────────────────────────────────────┐
│ global_var = "accessible everywhere"│
│                                     │
│  Function Scope:                    │
│  ┌───────────────────────────────┐  │
│  │ local func_var = "in function"│  │
│  │                               │  │
│  │  Block Scope:                 │  │
│  │  ┌─────────────────────────┐  │  │
│  │  │ local block_var = "in  │  │  │
│  │  │ block only"             │  │  │
│  │  └─────────────────────────┘  │  │
│  │  block_var not accessible     │  │
│  └───────────────────────────────┘  │
│  func_var not accessible            │
└─────────────────────────────────────┘

Access Rules:
→ Inner can access outer
← Outer cannot access inner
```


## Functions

### Function Basics

```lua
-- Method 1: Standard function declaration
function greet(name)
    return "Hello, " .. name
end

-- Method 2: Function as value (anonymous function)
local greet2 = function(name)
    return "Hello, " .. name
end

-- Method 3: Arrow-like syntax (Lua 5.4+)
local greet3 = function(name) return "Hello, " .. name end

-- Calling functions
print(greet("Alice"))  -- Output: Hello, Alice
print(greet2("Bob"))   -- Output: Hello, Bob
```

### Multiple Return Values

```lua
-- Functions can return multiple values
local function get_coordinates()
    return 10, 20, 30  -- Returns x, y, z
end

local x, y, z = get_coordinates()
print(x, y, z)  -- Output: 10  20  30

-- Capture fewer values
local x, y = get_coordinates()
print(x, y)  -- Output: 10  20

-- Ignore with _
local x, _, z = get_coordinates()
print(x, z)  -- Output: 10  30
```

### Variable Arguments (Varargs)

```lua
-- ... represents variable arguments

local function sum(...)
    local args = {...}  -- Pack into table
    local total = 0
    
    for i, v in ipairs(args) do
        total = total + v
    end
    
    return total
end

print(sum(1, 2, 3))        -- Output: 6
print(sum(10, 20, 30, 40)) -- Output: 100

-- Access varargs directly
local function print_all(...)
    for i = 1, select("#", ...) do
        local arg = select(i, ...)
        print(i, arg)
    end
end

print_all("a", "b", "c")
-- Output:
-- 1  a
-- 2  b
-- 3  c
```

### Closures

```lua
-- Closure: Function that captures outer variables

local function create_counter()
    local count = 0  -- Enclosed variable
    
    return function()
        count = count + 1
        return count
    end
end

local counter1 = create_counter()
local counter2 = create_counter()

print(counter1())  -- Output: 1
print(counter1())  -- Output: 2
print(counter1())  -- Output: 3

print(counter2())  -- Output: 1 (separate counter!)
print(counter2())  -- Output: 2
```

```
CLOSURE VISUALIZATION:
──────────────────────

create_counter() called twice:

Counter 1:
┌────────────────────────┐
│ Closure Environment    │
│ ┌────────────────────┐ │
│ │ count = 3          │ │ ← Private state
│ └────────────────────┘ │
│                        │
│ function()             │
│   count = count + 1    │
│   return count         │
│ end                    │
└────────────────────────┘

Counter 2:
┌────────────────────────┐
│ Closure Environment    │
│ ┌────────────────────┐ │
│ │ count = 2          │ │ ← Separate state!
│ └────────────────────┘ │
│                        │
│ function()             │
│   count = count + 1    │
│   return count         │
│ end                    │
└────────────────────────┘
```

### First-Class Functions

```lua
-- Functions are values: can be passed, returned, stored

-- Pass function as argument
local function execute(func, value)
    return func(value)
end

local function double(x)
    return x * 2
end

print(execute(double, 5))  -- Output: 10

-- Return function
local function create_multiplier(factor)
    return function(x)
        return x * factor
    end
end

local times_three = create_multiplier(3)
local times_five = create_multiplier(5)

print(times_three(10))  -- Output: 30
print(times_five(10))   -- Output: 50

-- Store in table
local operations = {
    add = function(a, b) return a + b end,
    sub = function(a, b) return a - b end,
    mul = function(a, b) return a * b end
}

print(operations.add(5, 3))  -- Output: 8
```


## Metatables & OOP

Metatables allow you to change the behavior of tables.

### Basic Metatable

```lua
-- Create a table
local t = {value = 10}

-- Create a metatable
local mt = {
    __add = function(t1, t2)
        return t1.value + t2.value
    end,
    
    __tostring = function(t)
        return "MyTable: " .. t.value
    end
}

-- Set metatable
setmetatable(t, mt)

-- Now we can use operators
local t2 = {value = 20}
setmetatable(t2, mt)

print(t + t2)  -- Output: 30 (uses __add)
print(t)       -- Output: MyTable: 10 (uses __tostring)
```

### Metamethods

```lua
-- Common metamethods:

local mt = {
    __add = function(a, b) end,      -- a + b
    __sub = function(a, b) end,      -- a - b
    __mul = function(a, b) end,      -- a * b
    __div = function(a, b) end,      -- a / b
    __mod = function(a, b) end,      -- a % b
    __pow = function(a, b) end,      -- a ^ b
    __unm = function(a) end,         -- -a
    __concat = function(a, b) end,   -- a .. b
    __eq = function(a, b) end,       -- a == b
    __lt = function(a, b) end,       -- a < b
    __le = function(a, b) end,       -- a <= b
    __index = function(t, k) end,    -- t[k] when k doesn't exist
    __newindex = function(t, k, v) end,  -- t[k] = v
    __call = function(t, ...) end,   -- t(...)
    __tostring = function(t) end,    -- tostring(t)
    __len = function(t) end,         -- #t
}
```

### OOP with Metatables

```lua
-- Simple class implementation

-- Define class
local Person = {}
Person.__index = Person  -- Make Person the metatable

-- Constructor
function Person:new(name, age)
    local instance = setmetatable({}, Person)
    instance.name = name
    instance.age = age
    return instance
end

-- Methods
function Person:greet()
    print("Hello, I'm " .. self.name)
end

function Person:birthday()
    self.age = self.age + 1
    print(self.name .. " is now " .. self.age)
end

-- Create instances
local alice = Person:new("Alice", 30)
local bob = Person:new("Bob", 25)

alice:greet()     -- Output: Hello, I'm Alice
bob:greet()       -- Output: Hello, I'm Bob
alice:birthday()  -- Output: Alice is now 31
```

```
OOP STRUCTURE:
──────────────

Person (Class Table)
┌────────────────────────────┐
│ __index = Person           │
│ new = function() ... end   │
│ greet = function() ... end │
│ birthday = function() ...  │
└────────────────────────────┘
        ↑                ↑
        │                │
    metatable        metatable
        │                │
┌───────┴──────┐  ┌──────┴───────┐
│ alice        │  │ bob          │
│ name="Alice" │  │ name="Bob"   │
│ age=30       │  │ age=25       │
└──────────────┘  └──────────────┘

When alice:greet() is called:
1. Look for 'greet' in alice → Not found
2. Check metatable (__index = Person)
3. Look for 'greet' in Person → Found!
4. Call Person.greet(alice)
```

### Inheritance

```lua
-- Base class
local Animal = {}
Animal.__index = Animal

function Animal:new(name)
    local instance = setmetatable({}, Animal)
    instance.name = name
    return instance
end

function Animal:speak()
    print(self.name .. " makes a sound")
end

-- Derived class
local Dog = setmetatable({}, {__index = Animal})
Dog.__index = Dog

function Dog:new(name, breed)
    local instance = setmetatable(Animal.new(self, name), Dog)
    instance.breed = breed
    return instance
end

function Dog:speak()  -- Override
    print(self.name .. " barks!")
end

function Dog:fetch()  -- New method
    print(self.name .. " fetches the ball")
end

-- Usage
local animal = Animal:new("Generic")
local dog = Dog:new("Rex", "Labrador")

animal:speak()  -- Output: Generic makes a sound
dog:speak()     -- Output: Rex barks! (overridden)
dog:fetch()     -- Output: Rex fetches the ball
```

```
INHERITANCE STRUCTURE:
──────────────────────

        Animal (Base)
        ┌─────────────────┐
        │ __index = Animal│
        │ new()           │
        │ speak()         │
        └─────────────────┘
                ↑
                │ inherits (__index)
                │
        Dog (Derived)
        ┌─────────────────┐
        │ __index = Dog   │
        │ new()           │
        │ speak() ← override
        │ fetch() ← new   │
        └─────────────────┘
                ↑
                │ metatable
                │
        ┌───────┴─────────┐
        │ dog instance    │
        │ name = "Rex"    │
        │ breed = "Lab"   │
        └─────────────────┘

Method lookup:
1. Look in instance → Not found
2. Look in Dog → speak() found, use it
3. If not in Dog → Look in Animal
```


## Advanced Scope Examples

### Example 1: Closure Counter

```lua
local function create_counter()
    local count = 0  -- Captured by closure
    
    local function increment()
        count = count + 1
        return count
    end
    
    local function decrement()
        count = count - 1
        return count
    end
    
    local function get()
        return count
    end
    
    local function reset()
        count = 0
    end
    
    return {
        inc = increment,
        dec = decrement,
        get = get,
        reset = reset
    }
end

local counter = create_counter()

print(counter.inc())    -- Output: 1
print(counter.inc())    -- Output: 2
print(counter.dec())    -- Output: 1
print(counter.get())    -- Output: 1
counter.reset()
print(counter.get())    -- Output: 0
```

### Example 2: Private Variables (Encapsulation)

```lua
local function BankAccount(initial_balance)
    -- Private variables
    local balance = initial_balance or 0
    local transaction_history = {}
    
    -- Private function
    local function add_transaction(type, amount)
        table.insert(transaction_history, {
            type = type,
            amount = amount,
            timestamp = os.time()
        })
    end
    
    -- Public interface
    local account = {}
    
    function account.deposit(amount)
        if amount <= 0 then
            return false, "Amount must be positive"
        end
        balance = balance + amount
        add_transaction("deposit", amount)
        return true
    end
    
    function account.withdraw(amount)
        if amount <= 0 then
            return false, "Amount must be positive"
        end
        if amount > balance then
            return false, "Insufficient funds"
        end
        balance = balance - amount
        add_transaction("withdrawal", amount)
        return true
    end
    
    function account.get_balance()
        return balance
    end
    
    function account.get_history()
        -- Return copy, not original
        local copy = {}
        for i, t in ipairs(transaction_history) do
            copy[i] = {
                type = t.type,
                amount = t.amount,
                timestamp = t.timestamp
            }
        end
        return copy
    end
    
    return account
end

-- Usage
local my_account = BankAccount(1000)

my_account.deposit(500)
print(my_account.get_balance())  -- Output: 1500

my_account.withdraw(200)
print(my_account.get_balance())  -- Output: 1300

-- Can't access private variables
print(my_account.balance)  -- Output: nil (private!)

-- Get transaction history
local history = my_account.get_history()
for _, t in ipairs(history) do
    print(t.type, t.amount)
end
-- Output:
-- deposit    500
-- withdrawal 200
```

```
ENCAPSULATION:
──────────────

BankAccount Closure:
┌─────────────────────────────────┐
│ Private Scope:                  │
│ ┌─────────────────────────────┐ │
│ │ balance = 1300              │ │ ← Not accessible
│ │ transaction_history = {...} │ │ ← Not accessible
│ │ add_transaction() {...}     │ │ ← Not accessible
│ └─────────────────────────────┘ │
│                                 │
│ Public Interface (account):     │
│ ┌─────────────────────────────┐ │
│ │ deposit() {...}             │ │ ← Accessible
│ │ withdraw() {...}            │ │ ← Accessible
│ │ get_balance() {...}         │ │ ← Accessible
│ │ get_history() {...}         │ │ ← Accessible
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
        ↓ return account
┌─────────────────────────────────┐
│ my_account (reference)          │
│ • Can call public methods       │
│ • Cannot access private data    │
└─────────────────────────────────┘
```

### Example 3: Module Pattern with Private State

```lua
-- config.lua
local M = {}

-- Private state
local settings = {
    debug_mode = false,
    max_connections = 100,
    timeout = 30
}

-- Private validation
local function validate_number(value, min, max)
    return type(value) == "number" and value >= min and value <= max
end

-- Public getters
function M.get(key)
    return settings[key]
end

function M.get_all()
    -- Return copy
    local copy = {}
    for k, v in pairs(settings) do
        copy[k] = v
    end
    return copy
end

-- Public setters with validation
function M.set_debug_mode(enabled)
    if type(enabled) ~= "boolean" then
        error("debug_mode must be boolean")
    end
    settings.debug_mode = enabled
end

function M.set_max_connections(num)
    if not validate_number(num, 1, 1000) then
        error("max_connections must be between 1 and 1000")
    end
    settings.max_connections = num
end

function M.set_timeout(seconds)
    if not validate_number(seconds, 1, 300) then
        error("timeout must be between 1 and 300 seconds")
    end
    settings.timeout = seconds
end

return M
```

```lua
-- main.lua
local config = require("config")

-- Get settings
print(config.get("debug_mode"))  -- Output: false

-- Set settings (with validation)
config.set_debug_mode(true)
config.set_max_connections(200)

-- Can't access private settings directly
print(config.settings)  -- Output: nil (private!)

-- Get all settings
local all = config.get_all()
for k, v in pairs(all) do
    print(k, v)
end
```


## Common Patterns & Idioms

### Pattern 1: Default Values

```lua
-- Set default if value is nil
function greet(name)
    name = name or "Guest"
    print("Hello, " .. name)
end

greet()          -- Output: Hello, Guest
greet("Alice")   -- Output: Hello, Alice
```

### Pattern 2: Ternary Operator (Simulation)

```lua
-- Lua doesn't have ternary, but you can simulate it
local age = 20
local status = (age >= 18) and "Adult" or "Minor"
print(status)  -- Output: Adult

-- Be careful with false!
local value = false
local result = value and "yes" or "no"
print(result)  -- Output: no (because false is falsy)
```

### Pattern 3: Guard Clauses

```lua
function divide(a, b)
    if b == 0 then
        return nil, "Cannot divide by zero"
    end
    return a / b
end

local result, err = divide(10, 0)
if not result then
    print("Error:", err)
else
    print("Result:", result)
end
```

### Pattern 4: Factory Pattern

```lua
local function create_animal(type)
    local animals = {
        dog = function() return {sound = "Woof!"} end,
        cat = function() return {sound = "Meow!"} end,
        cow = function() return {sound = "Moo!"} end
    }
    
    local factory = animals[type]
    if not factory then
        error("Unknown animal type: " .. type)
    end
    
    return factory()
end

local dog = create_animal("dog")
print(dog.sound)  -- Output: Woof!
```

### Pattern 5: Iterator Pattern

```lua
-- Custom iterator
local function range(from, to, step)
    step = step or 1
    local i = from - step
    
    return function()
        i = i + step
        if i <= to then
            return i
        end
    end
end

-- Usage
for num in range(1, 10, 2) do
    print(num)
end
-- Output: 1 3 5 7 9
```


## Complete Example: Todo List Application

```lua
-- todo.lua - Complete application demonstrating all concepts

local TodoList = {}
TodoList.__index = TodoList

-- Constructor
function TodoList.new()
    local self = setmetatable({}, TodoList)
    self.tasks = {}
    self.next_id = 1
    return self
end

-- Add task
function TodoList:add(description)
    if not description or description == "" then
        return nil, "Description cannot be empty"
    end
    
    local task = {
        id = self.next_id,
        description = description,
        completed = false,
        created_at = os.time()
    }
    
    self.tasks[self.next_id] = task
    self.next_id = self.next_id + 1
    
    return task.id
end

-- Complete task
function TodoList:complete(id)
    local task = self.tasks[id]
    if not task then
        return false, "Task not found"
    end
    
    task.completed = true
    task.completed_at = os.time()
    return true
end

-- Delete task
function TodoList:delete(id)
    if not self.tasks[id] then
        return false, "Task not found"
    end
    
    self.tasks[id] = nil
    return true
end

-- Get all tasks
function TodoList:get_all()
    local all = {}
    for id, task in pairs(self.tasks) do
        table.insert(all, task)
    end
    return all
end

-- Get pending tasks
function TodoList:get_pending()
    local pending = {}
    for id, task in pairs(self.tasks) do
        if not task.completed then
            table.insert(pending, task)
        end
    end
    return pending
end

-- Get completed tasks
function TodoList:get_completed()
    local completed = {}
    for id, task in pairs(self.tasks) do
        if task.completed then
            table.insert(completed, task)
        end
    end
    return completed
end

-- Display tasks
function TodoList:display()
    print("\n=== TODO LIST ===")
    
    local all = self:get_all()
    if #all == 0 then
        print("No tasks")
        return
    end
    
    for _, task in ipairs(all) do
        local status = task.completed and "[✓]" or "[ ]"
        print(string.format("%s %d. %s", status, task.id, task.description))
    end
    
    print(string.format("\nTotal: %d | Pending: %d | Completed: %d",
        #all, #self:get_pending(), #self:get_completed()))
end

-- Main program
local function main()
    local todos = TodoList.new()
    
    -- Add tasks
    todos:add("Learn Lua basics")
    todos:add("Understand scopes")
    todos:add("Build a project")
    
    -- Display
    todos:display()
    
    -- Complete a task
    todos:complete(1)
    
    -- Display again
    todos:display()
    
    -- Add more
    todos:add("Master metatables")
    
    -- Delete a task
    todos:delete(2)
    
    -- Final display
    todos:display()
end

-- Run
main()
```

**Output:**

```
=== TODO LIST ===
[ ] 1. Learn Lua basics
[ ] 2. Understand scopes
[ ] 3. Build a project

Total: 3 | Pending: 3 | Completed: 0

=== TODO LIST ===
[✓] 1. Learn Lua basics
[ ] 2. Understand scopes
[ ] 3. Build a project

Total: 3 | Pending: 2 | Completed: 1

=== TODO LIST ===
[✓] 1. Learn Lua basics
[ ] 3. Build a project
[ ] 4. Master metatables

Total: 3 | Pending: 2 | Completed: 1
```

