---
---
# Wayland & Hyprland: Complete Technical Guide

## Table of Contents

1. [Understanding Display Servers](https://claude.ai/chat/9f17afd4-4015-4cbf-b605-e12dd3f24b0d#understanding-display-servers)
2. [Wayland Protocol](https://claude.ai/chat/9f17afd4-4015-4cbf-b605-e12dd3f24b0d#wayland-protocol)
3. [Hyprland Compositor](https://claude.ai/chat/9f17afd4-4015-4cbf-b605-e12dd3f24b0d#hyprland-compositor)
4. [Architecture Comparison](https://claude.ai/chat/9f17afd4-4015-4cbf-b605-e12dd3f24b0d#architecture-comparison)
5. [Configuration & Setup](https://claude.ai/chat/9f17afd4-4015-4cbf-b605-e12dd3f24b0d#configuration--setup)
6. [Workflow Integration](https://claude.ai/chat/9f17afd4-4015-4cbf-b605-e12dd3f24b0d#workflow-integration)


## Wayland Protocol

### What is Wayland?

Wayland is a **protocol specification**, not an implementation. Think of it as the rulebook that different compositors follow to communicate with applications.

```
┌─────────────────────────────────────────────────────────────┐
│           WAYLAND PROTOCOL ARCHITECTURE                     │
└─────────────────────────────────────────────────────────────┘

The Protocol (Specification)
═══════════════════════════
Defines how apps and compositors communicate:

    Client (Application)          Server (Compositor)
    ────────────────────          ──────────────────
         │                              │
         │  1. Create Surface           │
         ├─────────────────────────────>│
         │                              │
         │  2. Surface Created          │
         │<─────────────────────────────┤
         │                              │
         │  3. Attach Buffer (pixels)   │
         ├─────────────────────────────>│
         │                              │
         │  4. Commit (display frame)   │
         ├─────────────────────────────>│
         │                              │
         │  5. Frame Callback           │
         │<─────────────────────────────┤
         │                              │
         │  6. Input Event (keyboard)   │
         │<─────────────────────────────┤
         │                              │


Wayland Core Protocols
══════════════════════

wl_display     - Connection to compositor
wl_registry    - Global objects registry
wl_compositor  - Surface creation
wl_surface     - Window content area
wl_output      - Display information
wl_seat        - Input device group
wl_keyboard    - Keyboard input
wl_pointer     - Mouse/touchpad
wl_touch       - Touchscreen
wl_shm         - Shared memory buffers
```

### Wayland vs X11 Communication

```
X11 Communication Model
═══════════════════════

    ┌─────────────┐
    │ Application │
    └──────┬──────┘
           │ X11 Protocol (network-transparent)
           │ "Draw a line from (0,0) to (100,100)"
           ▼
    ┌─────────────┐
    │  X Server   │ ← Does the drawing
    └──────┬──────┘
           │
           ▼
    ┌─────────────┐
    │  Graphics   │
    └─────────────┘


Wayland Communication Model
═══════════════════════════

    ┌─────────────┐
    │ Application │ ← Does its own drawing
    └──────┬──────┘
           │ Wayland Protocol (local only)
           │ "Here's my rendered buffer"
           ▼
    ┌─────────────┐
    │ Compositor  │ ← Composites buffers
    └──────┬──────┘
           │
           ▼
    ┌─────────────┐
    │  Graphics   │
    └─────────────┘
```

### Popular Wayland Compositors

```
┌─────────────────────────────────────────────────────────────┐
│         WAYLAND COMPOSITOR ECOSYSTEM                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Compositor      │  Type        │  Desktop    │  Features   │
│  ────────────────┼──────────────┼─────────────┼────────────│
│  Hyprland        │  Tiling      │  Standalone │  Animations │
│                  │              │             │  Effects    │
│  ────────────────┼──────────────┼─────────────┼────────────│
│  Sway            │  Tiling      │  Standalone │  i3-like    │
│                  │              │             │  Minimal    │
│  ────────────────┼──────────────┼─────────────┼────────────│
│  KWin            │  Stacking    │  KDE Plasma │  Full DE    │
│                  │              │             │  Features   │
│  ────────────────┼──────────────┼─────────────┼────────────│
│  Mutter          │  Stacking    │  GNOME      │  Full DE    │
│                  │              │             │  Features   │
│  ────────────────┼──────────────┼─────────────┼────────────│
│  wlroots-based   │  Various     │  Custom     │  Flexible   │
│  (River, dwl)    │              │             │  Library    │
│                                                             │
└─────────────────────────────────────────────────────────────┘


        Application Compatibility
        
    ┌────────────────────────────┐
    │  Native Wayland Apps       │
    │  • Firefox (Wayland mode)  │
    │  • Kitty                   │
    │  • foot                    │
    │  • mpv                     │
    └────────────────────────────┘
                │
                │ Direct Wayland Protocol
                │
                ▼
    ┌────────────────────────────┐
    │  Wayland Compositor        │
    │  (Hyprland/Sway/etc)       │
    └──────────┬─────────────────┘
               │
               │ XWayland (X11 compatibility layer)
               │
               ▼
    ┌────────────────────────────┐
    │  Legacy X11 Apps           │
    │  • Discord                 │
    │  • Some Java apps          │
    │  • Older software          │
    └────────────────────────────┘
```


## Architecture Comparison

### X11 vs Wayland Stack

```
┌─────────────────────────────────────────────────────────────┐
│         COMPLETE ARCHITECTURE COMPARISON                    │
└─────────────────────────────────────────────────────────────┘

TRADITIONAL X11 STACK (Arch Linux Example)
═══════════════════════════════════════════

Layer 7: User Applications
┌────────────────────────────────────────────────────┐
│ Firefox │ Neovim │ Kitty │ Discord │ Spotify      │
└───────────────────────┬────────────────────────────┘
                        │ X11 Protocol (Xlib/XCB)
                        │
Layer 6: Window Manager & Compositor
┌───────────────────────┴────────────────────────────┐
│ i3-wm (tiling)     │     picom (compositing)       │
└───────────────────────┬────────────────────────────┘
                        │
Layer 5: X Display Server
┌───────────────────────┴────────────────────────────┐
│              Xorg Server (X.Org)                   │
│  • Event handling                                  │
│  • Window management coordination                  │
│  • Drawing primitives                              │
└───────────────────────┬────────────────────────────┘
                        │
Layer 4: Graphics Drivers
┌───────────────────────┴────────────────────────────┐
│  xf86-video-amdgpu  │  xf86-video-intel           │
└───────────────────────┬────────────────────────────┘
                        │
Layer 3: DRM/KMS (Direct Rendering Manager)
┌───────────────────────┴────────────────────────────┐
│           Linux Kernel Graphics Stack              │
└───────────────────────┬────────────────────────────┘
                        │
Layer 2: Hardware Abstraction
┌───────────────────────┴────────────────────────────┐
│  Mesa (OpenGL/Vulkan)  │  libdrm                   │
└───────────────────────┬────────────────────────────┘
                        │
Layer 1: Hardware
┌───────────────────────┴────────────────────────────┐
│         GPU (AMD/NVIDIA/Intel)                     │
└────────────────────────────────────────────────────┘


MODERN WAYLAND STACK (Arch + Hyprland)
═══════════════════════════════════════

Layer 5: User Applications
┌────────────────────────────────────────────────────┐
│ Firefox │ Neovim │ Kitty │ Waybar │ wofi          │
└───────────────────────┬────────────────────────────┘
                        │ Wayland Protocol
                        │
Layer 4: Wayland Compositor (All-in-One)
┌───────────────────────┴────────────────────────────┐
│              Hyprland Compositor                   │
│  ┌──────────────────────────────────────────────┐ │
│  │ Window Manager (tiling logic)               │ │
│  ├──────────────────────────────────────────────┤ │
│  │ Compositor (rendering, effects)              │ │
│  ├──────────────────────────────────────────────┤ │
│  │ Display Server (Wayland protocol)            │ │
│  ├──────────────────────────────────────────────┤ │
│  │ Input Manager (keyboard, mouse)              │ │
│  └──────────────────────────────────────────────┘ │
└───────────────────────┬────────────────────────────┘
                        │ Built on wlroots
                        │
Layer 3: wlroots Library
┌───────────────────────┴────────────────────────────┐
│  • Wayland protocol implementation                 │
│  • DRM/KMS interface                               │
│  • libinput integration                            │
│  • Renderer (OpenGL/Vulkan)                        │
└───────────────────────┬────────────────────────────┘
                        │
Layer 2: Kernel & Mesa
┌───────────────────────┴────────────────────────────┐
│  Linux Kernel DRM  │  Mesa (OpenGL/Vulkan)         │
└───────────────────────┬────────────────────────────┘
                        │
Layer 1: Hardware
┌───────────────────────┴────────────────────────────┐
│         GPU (AMD/NVIDIA/Intel)                     │
└────────────────────────────────────────────────────┘


LAYER REDUCTION VISUALIZATION
══════════════════════════════

X11 Stack:        Wayland Stack:
7 layers          5 layers
                  
┌──────┐          ┌──────┐
│ Apps │          │ Apps │
├──────┤          ├──────┤
│  WM  │          │      │
├──────┤          │Hypr- │ ← Combined
│ Comp │          │ land │
├──────┤          │      │
│ Xorg │          │      │
├──────┤          ├──────┤
│Driver│          │wlroot│
├──────┤          ├──────┤
│ DRM  │          │ DRM  │
├──────┤          ├──────┤
│ Mesa │          │ Mesa │
├──────┤          ├──────┤
│  GPU │          │  GPU │
└──────┘          └──────┘
```

### Performance Comparison

```
┌─────────────────────────────────────────────────────────────┐
│           PERFORMANCE METRICS                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Metric              │  X11 + i3    │  Hyprland (Wayland) │
│  ────────────────────┼──────────────┼──────────────────────│
│  Input Latency       │  ~15-30ms    │  ~8-15ms             │
│  Frame Latency       │  ~20-40ms    │  ~10-20ms            │
│  Screen Tearing      │  Yes (needs  │  No (sync by default)│
│                      │  compositor) │                      │
│  Security Isolation  │  Poor        │  Strong              │
│  HiDPI Support       │  Hacky       │  Native              │
│  Multi-monitor       │  Complex     │  Simpler             │
│  Memory Usage        │  ~50-100MB   │  ~40-80MB            │
│  CPU Usage (idle)    │  0.5-1%      │  0.3-0.8%            │
│                                                             │
└─────────────────────────────────────────────────────────────┘


Frame Rendering Path
════════════════════

X11 Workflow:
App → Xorg → Compositor → GPU  (3 steps)
 ↓     ↓        ↓
Buffer copies happen multiple times

Wayland Workflow:
App → Hyprland → GPU  (2 steps)
 ↓        ↓
Direct buffer sharing (zero-copy)
```

