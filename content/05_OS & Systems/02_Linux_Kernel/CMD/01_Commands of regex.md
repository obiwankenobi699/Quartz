---
---
## FOUNDATIONAL CONCEPTS

### The Unix Philosophy
Linux commands follow the Unix philosophy: "Do one thing and do it well." Commands are designed to be composable, meaning they can be combined using pipes and redirection to create powerful workflows.

### Command Structure
```
command [options] [arguments]
```
- **Command**: The program to execute
- **Options**: Modify command behavior (usually prefixed with - or --)
- **Arguments**: What the command operates on (files, directories, text)

### Memory Aid: Command Categories
Think of Linux commands in functional groups:
- **Navigation**: Where am I? Where can I go? (cd, pwd, ls)
- **Manipulation**: Create, move, copy, delete (touch, mkdir, cp, mv, rm)
- **Inspection**: What's inside? (cat, less, head, tail)
- **Search**: Find what I need (find, grep, locate)
- **Control**: Manage running programs (ps, kill, top)
- **Network**: Connect to the world (ping, curl, wget)


## FILE VIEWING & CONTENT OPERATIONS

### Core Concept
Different tools for different viewing needs: quick peek (cat), paginated reading (less/more), partial viewing (head/tail), or live monitoring (tail -f).

**Mental Model**: Think of viewing commands as different reading speeds:
- **cat**: Speed reader (dump everything)
- **less/more**: Normal reader (page by page)
- **head/tail**: Skimmer (first/last parts only)
- **tail -f**: Live news ticker (real-time updates)

| Command | Full Form | Description | Example | When to Use | Memory Aid |
|---|---|---|---|---|---|
| `cat <file>` | Concatenate | Display entire file content | `cat file.txt` | Small files, quick view | Cat knocks everything off the table at once |
| `cat <file1> <file2>` | - | Combine and display multiple files | `cat file1.txt file2.txt` | Merge file contents | Concatenate = chain together |
| `tac <file>` | Cat reversed | Display file in reverse order | `tac file.txt` | View logs bottom-up | "tac" is "cat" backwards |
| `less <file>` | - | View file with pagination (forward/backward) | `less large_file.txt` | Large files, search capability | "Less is more" - better than more |
| `more <file>` | - | View file page by page (forward only) | `more file.txt` | Simple pagination | Shows "more" as you progress |
| `head <file>` | - | Show first 10 lines | `head file.txt` | Preview file beginning | Head = top of body |
| `head -n 20 <file>` | Number of lines | Show first N lines | `head -n 20 file.txt` | Custom preview size | -n = number |
| `tail <file>` | - | Show last 10 lines | `tail file.txt` | Check recent entries | Tail = end of body |
| `tail -n 20 <file>` | Number of lines | Show last N lines | `tail -n 20 file.txt` | Custom recent view | -n = number |
| `tail -f <file>` | Follow | Monitor file in real-time | `tail -f /var/log/syslog` | Watch log files live | Follow = track continuously |
| `tail -F <file>` | Follow + Retry | Follow even if file rotates | `tail -F app.log` | Production log monitoring | -F = robust follow |

### Text Analysis Commands

| Command | Description | Example | Use Case | Memory Aid |
|---|---|---|---|---|
| `wc -l <file>` | Count lines | `wc -l file.txt` | Get file length | wc = word count, -l = lines |
| `wc -w <file>` | Count words | `wc -w file.txt` | Analyze text size | -w = words |
| `wc -c <file>` | Count bytes | `wc -c file.txt` | File size in bytes | -c = characters/bytes |
| `wc <file>` | Show all counts | `wc file.txt` | Complete statistics | Shows lines, words, bytes |

**Professional Tip**: Use `less` for large files because it doesn't load the entire file into memory. Use `tail -f` for real-time log monitoring during troubleshooting.


## FILE & DIRECTORY OPERATIONS

### Core Concept: The Three Basic Operations
- **Copy (cp)**: Duplicate - original remains
- **Move (mv)**: Relocate or rename - original is gone
- **Remove (rm)**: Delete - permanent action

**Mental Model**: Think of physical objects:
- **Archive (tar)**: Packing items into a box (still takes same space)
- **Compress (gzip)**: Vacuum-sealing the box (reduces space)
- **tar.gz**: Packing into a box, then vacuum-sealing it

### Copy Operations

| Command | Description | Example | Critical Options | Memory Aid |
|---|---|---|---|---|
| `cp <source> <dest>` | Copy file | `cp file1.txt file2.txt` | Destination can be new name or directory | "Copy paste" |
| `cp -r <source> <dest>` | Copy directory recursively | `cp -r folder1 folder2` | -r = recursive (needed for directories) | "Recursive" = go into subfolders |
| `cp -i <source> <dest>` | Interactive copy (prompt before overwrite) | `cp -i file1.txt file2.txt` | -i = interactive (safe mode) | "i" = interactive confirmation |
| `cp -u <source> <dest>` | Copy only if source is newer | `cp -u file1.txt file2.txt` | -u = update | "u" = update only |
| `cp -v <source> <dest>` | Verbose output | `cp -v file1.txt file2.txt` | -v = verbose | "v" = visual confirmation |
| `cp -p <source> <dest>` | Preserve attributes (permissions, timestamps) | `cp -p file1.txt file2.txt` | -p = preserve | "p" = preserve metadata |

### Move/Rename Operations

| Command | Description | Example | Use Case | Memory Aid |
|---|---|---|---|---|
| `mv <source> <dest>` | Move or rename file | `mv old.txt new.txt` | Same directory = rename, different = move | "Move" does both |
| `mv <file> <directory>` | Move file to directory | `mv file.txt /tmp/` | Target must be directory | Move into container |
| `mv -i <source> <dest>` | Interactive move | `mv -i file1.txt file2.txt` | -i = prompt before overwrite | Safe move |
| `mv -u <source> <dest>` | Move only if source is newer | `mv -u file1.txt file2.txt` | -u = update | Update only |
| `mv -n <source> <dest>` | No overwrite | `mv -n file1.txt file2.txt` | -n = no clobber | "n" = never overwrite |

### Removal Operations

| Command | Description | Example | Danger Level | Memory Aid |
|---|---|---|---|---|
| `rm <file>` | Remove file | `rm file.txt` | Medium - file deleted | "Remove" |
| `rm -r <directory>` | Remove directory recursively | `rm -r folder` | High - directory tree deleted | "r" = recursive |
| `rm -rf <directory>` | Force remove without prompt | `rm -rf folder` | EXTREME - no confirmation | "rf" = recursive force (dangerous) |
| `rm -i <file>` | Interactive removal | `rm -i file.txt` | Low - asks confirmation | "i" = interactive (safe) |
| `rm -I <file1> <file2> <file3>` | Prompt once for 3+ files | `rm -I *.txt` | Medium - single prompt for bulk | "I" = intelligent prompt |
| `rmdir <directory>` | Remove empty directory only | `rmdir empty_folder` | Low - fails if not empty | Safe directory removal |

**Critical Interview Points**:
1. `rm` has no recycle bin - deletions are permanent
2. `rm -rf /` is catastrophic - deletes entire system
3. Always use `-i` flag when removing important data
4. `mv` is atomic within the same filesystem (safe for databases)
5. `cp` without `-p` loses original permissions and timestamps


## PERMISSIONS & OWNERSHIP

### Core Concept: The Linux Security Model

Every file has three permission levels and three permission types:

**Permission Levels** (Who):
- **u** (User/Owner): The file's owner
- **g** (Group): Users in the file's group
- **o** (Others): Everyone else
- **a** (All): Everyone (u+g+o)

**Permission Types** (What):
- **r** (Read): View file contents or list directory (value: 4)
- **w** (Write): Modify file or add/remove files in directory (value: 2)
- **x** (Execute): Run file as program or enter directory (value: 1)

**Mental Model**: Think of a house:
- **Owner**: Homeowner (full control)
- **Group**: Family members (shared access)
- **Others**: Visitors (limited access)

### Understanding Permission Notation

**Symbolic**: `rwxr-xr--` (9 characters)
- First 3: Owner permissions (rwx)
- Next 3: Group permissions (r-x)
- Last 3: Others permissions (r--)

**Numeric**: `754` (3 digits)
- First digit: Owner (7 = 4+2+1 = rwx)
- Second digit: Group (5 = 4+1 = r-x)
- Third digit: Others (4 = r--)

### Chmod - Change Permissions

**Two modes: Symbolic and Numeric**

#### Symbolic Mode

| Command | Description | Example | Explanation | Memory Aid |
|---|---|---|---|---|
| `chmod u+x <file>` | Add execute for user | `chmod u+x script.sh` | u=user, +=add, x=execute | Make script runnable |
| `chmod g+w <file>` | Add write for group | `chmod g+w file.txt` | g=group, +=add, w=write | Group can edit |
| `chmod o-r <file>` | Remove read for others | `chmod o-r private.txt` | o=others, -=remove, r=read | Hide from others |
| `chmod a+r <file>` | Add read for all | `chmod a+r public.txt` | a=all (ugo) | Everyone can read |
| `chmod u=rwx <file>` | Set user to rwx exactly | `chmod u=rwx script.sh` | = sets exactly | Precise control |
| `chmod go-rwx <file>` | Remove all from group & others | `chmod go-rwx secret.txt` | g+o combined | Private file |
| `chmod +x <file>` | Add execute for all | `chmod +x script.sh` | No target = all | Quick executable |

#### Numeric Mode

| Command | Numeric | Symbolic | Description | Common Use |
|---|---|---|---|---|
| `chmod 777 <file>` | 777 | rwxrwxrwx | Full access for everyone | Testing only (insecure) |
| `chmod 755 <file>` | 755 | rwxr-xr-x | Owner: all, Others: read+execute | Scripts, executables |
| `chmod 644 <file>` | 644 | rw-r--r-- | Owner: read+write, Others: read | Standard files |
| `chmod 600 <file>` | 600 | rw------- | Owner: read+write only | Private files (SSH keys) |
| `chmod 700 <file>` | 700 | rwx------ | Owner: all, Others: none | Private directories |
| `chmod 666 <file>` | 666 | rw-rw-rw- | All can read+write | Shared writable files |
| `chmod 400 <file>` | 400 | r-------- | Read-only for owner | Protected config files |

**Recursive Permission Change**:
```
chmod -R 755 <directory>  # Apply to directory and all contents
```

### Chown - Change Ownership

| Command | Description | Example | Use Case | Memory Aid |
|---|---|---|---|---|
| `chown <user> <file>` | Change owner | `chown john file.txt` | Transfer ownership | "Change owner" |
| `chown <user>:<group> <file>` | Change owner and group | `chown john:developers file.txt` | Full ownership change | user:group syntax |
| `chown :<group> <file>` | Change group only | `chown :developers file.txt` | Group reassignment | Shorthand for group |
| `chown -R <user> <directory>` | Recursive ownership change | `chown -R john folder/` | Change directory tree | -R = recursive |
| `chown --reference=<ref> <file>` | Match reference file ownership | `chown --reference=file1 file2` | Copy ownership | Reference template |

### Chgrp - Change Group

| Command | Description | Example | Use Case |
|---|---|---|---|
| `chgrp <group> <file>` | Change file group | `chgrp developers file.txt` | Group reassignment |
| `chgrp -R <group> <directory>` | Recursive group change | `chgrp -R staff folder/` | Change directory tree |

### Special Permissions

| Permission | Numeric | Symbol | Description | Example |
|---|---|---|---|---|
| **SUID** (Set User ID) | 4000 | s (user x position) | Execute as file owner | `chmod 4755 program` (runs as owner) |
| **SGID** (Set Group ID) | 2000 | s (group x position) | Execute as file group / New files inherit directory group | `chmod 2755 shared_dir` |
| **Sticky Bit** | 1000 | t (others x position) | Only owner can delete files (for directories) | `chmod 1777 /tmp` (public but protected) |

**Example**: `/tmp` directory typically has `1777` (sticky bit + full access)
- Everyone can create files
- Only file owner can delete their own files
- Prevents users from deleting others' files

### File Attribute Commands

| Command | Description | Example | Use Case |
|---|---|---|---|
| `umask` | Show default permission mask | `umask` | Check default settings |
| `umask 022` | Set default permission mask | `umask 022` | New files: 644, directories: 755 |
| `lsattr <file>` | List file attributes | `lsattr file.txt` | Check extended attributes |
| `chattr +i <file>` | Make file immutable (cannot be modified/deleted) | `chattr +i critical.conf` | Protect important files |
| `chattr -i <file>` | Remove immutable attribute | `chattr -i critical.conf` | Allow modifications |

**Professional Interview Points**:
1. **644** is standard for files (owner writes, all read)
2. **755** is standard for directories and executables (owner modifies, all execute/access)
3. **SUID on executables** allows normal users to run with elevated privileges (e.g., passwd command)
4. **Sticky bit on /tmp** prevents users from deleting others' temporary files
5. **Never use 777** in production - it's a security vulnerability
6. **SSH private keys must be 600** or 400 (owner-only access)
7. **umask 022** means new files get 644 (666-022) and directories get 755 (777-022)


## ENVIRONMENT & VARIABLES

### Core Concept: Shell Environment

The shell maintains variables that control its behavior and provide information. Two types exist:

**Types of Variables**:
- **Local Variables**: Exist only in current shell (not inherited by child processes)
- **Environment Variables**: Exported to child processes (inherited)

**Mental Model**: Think of variables as labels on containers:
- Local variables: Post-it notes visible only in your room
- Environment variables: Name tags that travel with you everywhere

### Variable Operations

| Command | Description | Example | Scope | Memory Aid |
|---|---|---|---|---|
| `VAR=value` | Create local variable | `NAME="John"` | Current shell only | Simple assignment |
| `export VAR=value` | Create environment variable | `export PATH="/usr/bin"` | Current + child shells | "Export" = send out |
| `export VAR` | Convert local to environment | `export NAME` | Promote existing variable | Export after creation |
| `echo $VAR` | Print variable value | `echo $PATH` | Read variable | "$" accesses value |
| `echo ${VAR}` | Print variable (explicit) | `echo ${PATH}` | Unambiguous reference | Braces for clarity |
| `unset VAR` | Delete variable | `unset NAME` | Remove completely | "Unset" = erase |
| `readonly VAR=value` | Create read-only variable | `readonly API_KEY="secret"` | Immutable | Cannot change |

### Viewing Environment

| Command | Description | Example | Output | Use Case |
|---|---|---|---|---|
| `env` | Show all environment variables | `env` | Full environment | List all exported vars |
| `printenv` | Display environment variables | `printenv` | Same as env | Alternative to env |
| `printenv VAR` | Display specific variable | `printenv PATH` | Single variable value | Check one variable |
| `set` | Show all variables (local + environment) | `set` | Complete variable list | Debug shell state |
| `declare -p` | Show all variables with attributes | `declare -p` | Detailed information | Advanced inspection |
| `echo $VARIABLE` | Print specific variable | `echo $HOME` | Variable value | Quick check |

### Important Environment Variables

| Variable | Purpose | Example Value | Usage |
|---|---|---|---|
| `$PATH` | Command search directories | `/usr/bin:/bin:/usr/local/bin` | Where shell finds commands |
| `$HOME` | User home directory | `/home/username` | User's personal space |
| `$USER` | Current username | `john` | Who is logged in |
| `$SHELL` | Current shell path | `/bin/bash` | Which shell is running |
| `$PWD` | Present working directory | `/home/john/projects` | Current location |
| `$OLDPWD` | Previous working directory | `/var/log` | Last directory visited |
| `$HOSTNAME` | System hostname | `server01` | Machine identifier |
| `$LANG` | Language/locale setting | `en_US.UTF-8` | Language preferences |
| `$TERM` | Terminal type | `xterm-256color` | Terminal capabilities |
| `$EDITOR` | Default text editor | `/usr/bin/vim` | Which editor to use |
| `$PS1` | Primary shell prompt | `[\u@\h \W]\# Comprehensive Linux Command Reference & Conceptual Guide


### File Attribute Commands

| Command | Description | Example | Use Case |
|---|---|---|---|
| `umask` | Show default permission mask | `umask` | Check default settings |
| `umask 022` | Set default permission mask | `umask 022` | New files: 644, directories: 755 |
| `lsattr <file>` | List file attributes | `lsattr file.txt` | Check extended attributes |
| `chattr +i <file>` | Make file immutable (cannot be modified/deleted) | `chattr +i critical.conf` | Protect important files |
| `chattr -i <file>` | Remove immutable attribute | `chattr -i critical.conf` | Allow modifications |

**Professional Interview Points**:
1. **644** is standard for files (owner writes, all read)
2. **755** is standard for directories and executables (owner modifies, all execute/access)
3. **SUID on executables** allows normal users to run with elevated privileges (e.g., passwd command)
4. **Sticky bit on /tmp** prevents users from deleting others' temporary files
5. **Never use 777** in production - it's a security vulnerability
6. **SSH private keys must be 600** or 400 (owner-only access)
7. **umask 022** means new files get 644 (666-022) and directories get 755 (777-022)


### PATH Management

```bash
# View PATH
echo $PATH

# Add directory to PATH (temporary)
export PATH="$PATH:/new/directory"

# Add to beginning of PATH (higher priority)
export PATH="/new/directory:$PATH"

# Make permanent (add to ~/.bashrc or ~/.bash_profile)
echo 'export PATH="$PATH:/new/directory"' >> ~/.bashrc
source ~/.bashrc
```

### Variable Substitution & Manipulation

| Syntax | Description | Example | Result |
|---|---|---|---|
| `${VAR:-default}` | Use default if VAR unset | `echo ${NAME:-"Guest"}` | "Guest" if NAME empty |
| `${VAR:=default}` | Set and use default if unset | `${PORT:=8080}` | Sets PORT to 8080 if unset |
| `${VAR:?error}` | Error if VAR unset | `${FILE:?"File required"}` | Exits with error message |
| `${VAR:+value}` | Use value if VAR is set | `${DEBUG:+"debug mode"}` | Returns "debug mode" if DEBUG exists |
| `${#VAR}` | Length of variable | `echo ${#PATH}` | Number of characters |
| `${VAR#pattern}` | Remove shortest match from start | `${PATH#/usr}` | Remove "/usr" prefix |
| `${VAR##pattern}` | Remove longest match from start | `${FILE##*/}` | Get filename from path |
| `${VAR%pattern}` | Remove shortest match from end | `${FILE%.txt}` | Remove ".txt" extension |
| `${VAR%%pattern}` | Remove longest match from end | `${PATH%%:*}` | Get first PATH entry |

**Professional Interview Points**:
1. Environment variables are inherited by child processes; local variables are not
2. `$?` returns 0 for success, non-zero for failure (critical for error checking)
3. `export` makes a variable available to subshells and scripts
4. Modifying PATH in terminal is temporary unless added to `.bashrc` or `.bash_profile`
5. Use `${VAR}` (with braces) when variable is adjacent to other text: `${FILE}name`
6. `env` shows only environment variables; `set` shows all variables including shell-specific ones
7. Shell variables must start with letter or underscore, can contain letters, digits, underscores

