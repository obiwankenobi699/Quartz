---
---
## 1. High-Level Linux Desktop Stack (Mental Model)

```graph
User
 │
 │ runs
 ▼
Applications (Firefox, Terminal, VSCode)
 │
 │ use
 ▼
UI Toolkits (GTK / Qt)
 │
 │ talk to
 ▼
Desktop Environment / Window Manager
 │   ├─ GNOME
 │   ├─ KDE Plasma
 │   └─ Hyprland (tiling WM)
 │
 │ implement
 ▼
Display Protocol
 │   ├─ Wayland
 │   └─ X11 (legacy)
 │
 │ runs on
 ▼
Linux Kernel
 │
 │ manages
 ▼
File System (ext4) + FHS
```

Key idea:

- **These are layers, not alternatives**
    
- Multiple layers exist together
    


## 3. Display Systems

### 3.1 Wayland

What it is:

- Display protocol
    
- Successor to X11
    

Responsibilities:

- Window rendering
    
- Input handling
    
- Security isolation
    

What it is NOT:

- Window manager
    
- Desktop environment
    


## 5. Window Managers (Tiling)

### 5.1 Hyprland

What it is:

- Wayland compositor
    
- Tiling window manager
    

What it does:

- Window placement
    
- Animations
    
- Input bindings
    

What it does NOT:

- Provide UI widgets
    
- Provide panels
    
- Provide launchers
    

Hyprland requires external tools.


### 6.2 Wofi

Application launcher (Wayland alternative to rofi).

Used for:

- Launching apps
    
- Running commands
    

```text
Super + D
 └─ wofi --show drun
```


## 7. UI Toolkits

### GTK

- Used by GNOME apps
    
- Used by Firefox
    
- Independent of GNOME
    

### Qt

- Used by KDE apps
    
- Independent of KDE
    

GTK and Qt apps can run on:

- GNOME
    
- KDE
    
- Hyprland
    


## 9. systemctl (Core DevOps Commands)

Purpose:

- Manage systemd services
    

### Common Commands

```bash
systemctl status nginx
systemctl start docker
systemctl stop docker
systemctl restart sshd
systemctl enable docker
systemctl disable docker
systemctl daemon-reload
```

### Service States

- active
    
- inactive
    
- failed
    
- enabled
    
- disabled
    


## 11. How Everything Links (Final Graph)

```graph
ext4
 │
 ▼
FHS
 │
 ▼
Linux Kernel
 │
 ▼
Wayland
 │
 ▼
Hyprland
 │
 ├─ hyprpaper (wallpaper)
 │
 ├─ waybar (status bar)
 │
 └─ wofi (launcher)
 │
 ▼
GTK / Qt
 │
 ▼
Applications
```


## 13. DevOps Relevance

Why DevOps cares:

- Headless servers still follow FHS
    
- systemctl manages services
    
- GUI stack knowledge helps debugging
    
- Wayland matters for modern Linux desktops
    
- Hyprland shows deep Linux understanding
    


## **1. User Coding Modules**

|Language/Tool|Location|
|---|---|
|Python (system-wide)|`/usr/lib/pythonX.Y/`, `/usr/local/lib/pythonX.Y/`|
|Python (user)|`~/.local/lib/pythonX.Y/site-packages/`|
|Python (venv)|`project/.venv/lib/pythonX.Y/site-packages/`|
|Node.js (global)|`/usr/lib/node_modules/`, `/usr/local/lib/node_modules/`|
|Node.js (local)|`project/node_modules/`|


## **3. System Programs & Executables**

|Location|Purpose|
|---|---|
|`/bin`|Essential user commands (`ls`, `cp`)|
|`/sbin`|System admin commands (`fdisk`, `ifconfig`)|
|`/usr/bin`|Most user programs (`python3`, `gcc`)|
|`/usr/sbin`|Admin programs (`sshd`, `apache2`)|
|`/usr/local/bin`|Manually installed programs|


## **5. Logs**

- `/var/log/` → system logs (e.g., `syslog`, `dmesg`, `auth.log`)
    


## **7. systemd & Service Management**

|Directory|Purpose|
|---|---|
|`/lib/systemd/system/`|Package-provided unit files (`*.service`)|
|`/etc/systemd/system/`|Custom/overridden services|
|`/etc/systemd/system/default.target`|Default boot target (GUI or CLI)|
|`/etc/systemd/system/multi-user.target.wants/`|Symlinks for multi-user services|
|`/etc/systemd/system/graphical.target.wants/`|Symlinks for GUI services|

**Key Points:**

- systemd manages boot, services, timers, and targets.
    
- Default target decides boot mode (`graphical.target` or `multi-user.target`).
    
- Admin customizations override package defaults.
    

```

/
├── bin/                  # Essential user commands
├── sbin/                 # System admin commands
├── lib/                  # Essential libraries
├── usr/
│   ├── bin/              # Most user programs
│   ├── sbin/             # Admin programs
│   ├── lib/              # Libraries for installed programs
│   └── local/
│       ├── bin/          # Manually installed programs
│       └── lib/          # Manually installed libraries
├── etc/                  # System configs
│   ├── systemd/
│   │   ├── system/       # Custom/overridden services
│   │   └── default.target  # Default boot target
│   └── ssh/              # Example config folder
├── var/
│   └── log/              # System logs
└── home/
    └── user/
        ├── Projects/     # Your code/projects
        ├── .local/lib/pythonX.Y/site-packages/  # User Python modules
        ├── .config/      # User configs
        └── .venv/        # Virtual environments for coding

```
.
