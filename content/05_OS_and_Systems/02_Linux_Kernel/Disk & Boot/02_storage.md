---
---

```

╔══════════════════════════════════════════════════════════════════════════════╗
║                 🌊 LINUX STORAGE VISUAL REFERENCE 🌊                         ║
║                         ASCII Maritime Edition                               ║
╚══════════════════════════════════════════════════════════════════════════════╝

┌──────────────────────────────────────────────────────────────────────────────┐
│                        🚢 THE BOOT VOYAGE 🚢                                 │
└──────────────────────────────────────────────────────────────────────────────┘

    1. POWER ON
       │
       ▼
    ┌──────────────────────┐
    │   FIRMWARE CHECK     │  ⚡ BIOS/UEFI initializes hardware
    │   ╔════════════╗     │     • POST (Power-On Self-Test)
    │   ║ BIOS/UEFI  ║     │     • Detects CPU, RAM, disks
    │   ╚════════════╝     │     • Finds boot device
    └──────────┬───────────┘
               │
               ▼
    ┌──────────────────────┐
    │  BOOT DEVICE FOUND   │  🔍 Reads first sector of disk
    │                      │
    │  MBR (Legacy):       │  GPT (Modern):
    │  ┌────────────────┐  │  ┌────────────────────┐
    │  │ 446B Bootcode  │  │  │ Protective MBR     │
    │  │  64B Part Tbl  │  │  │ GPT Header         │
    │  │   2B Signature │  │  │ 128 Partition Ents │
    │  └────────────────┘  │  └────────────────────┘
    └──────────┬───────────┘
               │
               ▼
    ┌──────────────────────┐
    │   GRUB STAGE 1       │  📍 Tiny bootloader in MBR/EFI partition
    │   ┌──────────────┐   │     Points to Stage 2 location
    │   │ core.img     │   │
    │   └──────────────┘   │
    └──────────┬───────────┘
               │
               ▼
    ┌──────────────────────┐
    │   GRUB STAGE 2       │  🎯 Full GRUB with menu
    │   ╔══════════════╗   │
    │   ║ GRUB Menu:   ║   │     ┌─────────────────┐
    │   ║  • Arch      ║   │     │ YOU ARE HERE!   │
    │   ║  • Windows   ║───┼────▶│ Choose your OS  │
    │   ║  • Recovery  ║   │     └─────────────────┘
    │   ╚══════════════╝   │
    └──────────┬───────────┘
               │ (User selects Arch Linux)
               ▼
    ┌──────────────────────┐
    │  LOAD KERNEL         │  🐧 Linux kernel starts
    │  ┌────────────────┐  │     • /boot/vmlinuz-linux
    │  │  vmlinuz       │  │     • Compressed kernel image
    │  └────────────────┘  │
    └──────────┬───────────┘
               │
               ▼
    ┌──────────────────────┐
    │  LOAD INITRAMFS      │  📦 Temporary root filesystem
    │  ┌────────────────┐  │     • /boot/initramfs-linux.img
    │  │  initramfs     │  │     • Contains essential drivers
    │  │  ┌──────────┐  │  │     • Mounts real root filesystem
    │  │  │ Drivers  │  │  │
    │  │  │ Scripts  │  │  │
    │  │  └──────────┘  │  │
    │  └────────────────┘  │
    └──────────┬───────────┘
               │
               ▼
    ┌──────────────────────┐
    │  MOUNT ROOT FS       │  🗂️  Real filesystem now accessible
    │  /dev/sda2 → /       │     • Switches from initramfs to disk
    │                      │     • Kernel now uses real /
    └──────────┬───────────┘
               │
               ▼
    ┌──────────────────────┐
    │  START SYSTEMD       │  ⚙️  Init system takes over
    │  ┌────────────────┐  │     • PID 1 (first process)
    │  │   systemd      │  │     • Starts all services
    │  │  ┌──────────┐  │  │     • Mounts other filesystems
    │  │  │Services  │  │  │     • Network, login, etc.
    │  │  └──────────┘  │  │
    │  └────────────────┘  │
    └──────────┬───────────┘
               │
               ▼
    ┌──────────────────────┐
    │  LOGIN PROMPT        │  🎉 System ready!
    │  ┌────────────────┐  │
    │  │ Welcome to    │  │
    │  │ Arch Linux!   │  │
    │  │               │  │
    │  │ login: _      │  │
    │  └────────────────┘  │
    └──────────────────────┘


┌──────────────────────────────────────────────────────────────────────────────┐
│                    💾 DISK ARCHITECTURE LAYERS 💾                            │
└──────────────────────────────────────────────────────────────────────────────┘

    LAYER 7: USER INTERFACE
    ═══════════════════════════════════════════════════════════════
    │  Files, directories, applications you see
    │  Example: /home/user/document.pdf
    ═══════════════════════════════════════════════════════════════
                            │
                            ▼
    LAYER 6: FILESYSTEM (ext4, btrfs, xfs)
    ═══════════════════════════════════════════════════════════════
    │  How data is organized and stored
    │  ┌──────────────────────────────────────────────┐
    │  │ Superblock │ Inodes │ Data Blocks │ Journal │
    │  └──────────────────────────────────────────────┘
    ═══════════════════════════════════════════════════════════════
                            │
                            ▼
    LAYER 5: LOGICAL VOLUMES (LVM - optional)
    ═══════════════════════════════════════════════════════════════
    │  Flexible, resizable storage pools
    │  ┌─────────┬─────────┬─────────┐
    │  │ LV:root │ LV:home │ LV:swap │  ← Logical Volumes
    │  └─────────┴─────────┴─────────┘
    │  ════════════════════════════════  ← Volume Group (vg0)
    ═══════════════════════════════════════════════════════════════
                            │
                            ▼
    LAYER 4: PARTITIONS
    ═══════════════════════════════════════════════════════════════
    │  Divided sections of physical disk
    │  ┌──────┬────────────────┬───────────────────────┐
    │  │ sda1 │     sda2       │        sda3           │
    │  │/boot │      /         │       /home           │
    │  │ 1GB  │     50GB       │       449GB           │
    │  └──────┴────────────────┴───────────────────────┘
    ═══════════════════════════════════════════════════════════════
                            │
                            ▼
    LAYER 3: PARTITION TABLE (MBR or GPT)
    ═══════════════════════════════════════════════════════════════
    │  Map of where partitions are located
    │
    │  MBR (Legacy):              GPT (Modern):
    │  ┌──────────────────┐       ┌──────────────────────┐
    │  │ Partition 1: ... │       │ Protective MBR       │
    │  │ Partition 2: ... │       │ Primary GPT Header   │
    │  │ Partition 3: ... │       │ Part Entry Array     │
    │  │ Partition 4: ... │       │ (128 partitions max) │
    │  └──────────────────┘       │ Backup GPT Header    │
    │  (Max 4 partitions)         └──────────────────────┘
    ═══════════════════════════════════════════════════════════════
                            │
                            ▼
    LAYER 2: BLOCK DEVICE
    ═══════════════════════════════════════════════════════════════
    │  Kernel's view of the disk
    │  /dev/sda, /dev/nvme0n1, /dev/mmcblk0
    ═══════════════════════════════════════════════════════════════
                            │
                            ▼
    LAYER 1: PHYSICAL DISK
    ═══════════════════════════════════════════════════════════════
    │  Actual hardware (HDD, SSD, NVMe)
    │  ┌───────────────────────────────────────────────┐
    │  │  [Spinning Platters]  or  [Flash Chips]       │
    │  │  512GB / 1TB / 2TB ...                        │
    │  └───────────────────────────────────────────────┘
    ═══════════════════════════════════════════════════════════════


┌──────────────────────────────────────────────────────────────────────────────┐
│                      🌊 MEMORY HIERARCHY 🌊                                  │
└──────────────────────────────────────────────────────────────────────────────┘

    ⚡ SPEED vs CAPACITY ⚡

    Fastest                                                          Slowest
    Smallest                                                         Largest
    │                                                                      │
    ▼                                                                      ▼

    ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
    │   CPU    │  │    L1    │  │    L2    │  │    L3    │  │   RAM    │
    │  Cache   │─▶│  Cache   │─▶│  Cache   │─▶│  Cache   │─▶│ (16GB)   │
    │   (KB)   │  │ (32 KB)  │  │ (256 KB) │  │  (8 MB)  │  │          │
    └──────────┘  └──────────┘  └──────────┘  └──────────┘  └────┬─────┘
                                                                   │
                                                                   │ When RAM fills...
                                                                   ▼
                                                             ┌──────────┐
                                                             │   SWAP   │
                                                             │ (on SSD) │
                                                             │  (8 GB)  │
                                                             └────┬─────┘
                                                                  │
                                                                  │ Permanent storage
                                                                  ▼
                                                            ┌──────────┐
                                                            │   DISK   │
                                                            │  (SSD/   │
                                                            │   HDD)   │
                                                            │ (512 GB) │
                                                            └──────────┘

    🔑 KEY CONCEPT:
    • CPU can only work with data in RAM
    • If RAM is full, kernel moves "cold" data to SWAP
    • SWAP is 10-30x slower than RAM (but faster than nothing!)
    • Hibernation = dump all RAM to SWAP, power off


┌──────────────────────────────────────────────────────────────────────────────┐
│                 📊 PARTITION SCHEMES COMPARISON 📊                           │
└──────────────────────────────────────────────────────────────────────────────┘

    ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
    ┃  SIMPLE LAYOUT (Desktop)                                              ┃
    ┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
    ┃  /dev/sda (512 GB)                                                    ┃
    ┃  ┌──────┬──────────────────┬──────────────────────────────────────┐  ┃
    ┃  │ sda1 │       sda2       │              sda3                    │  ┃
    ┃  │/boot │        /         │             /home                    │  ┃
    ┃  │ EFI  │      ext4        │             ext4                     │  ┃
    ┃  │ 1 GB │      50 GB       │            461 GB                    │  ┃
    ┃  └──────┴──────────────────┴──────────────────────────────────────┘  ┃
    ┃                                                                       ┃
    ┃  ✓ Simple, traditional                                                ┃
    ┃  ✗ Hard to resize                                                     ┃
    ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

    ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
    ┃  LVM LAYOUT (Flexible) - RECOMMENDED                                  ┃
    ┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
    ┃  /dev/sda (512 GB)                                                    ┃
    ┃  ┌──────┬───────────────────────────────────────────────────────┐    ┃
    ┃  │ sda1 │                    sda2                                │    ┃
    ┃  │/boot │              LVM Physical Volume                       │    ┃
    ┃  │ 1 GB │                   511 GB                               │    ┃
    ┃  └──────┴────────────────────┬──────────────────────────────────┘    ┃
    ┃                               │                                       ┃
    ┃                               ▼                                       ┃
    ┃                    Volume Group: vg0                                  ┃
    ┃         ┌─────────────────────────────────────────────┐               ┃
    ┃         │  ┌────────┬────────┬────────┬───────────┐  │               ┃
    ┃         │  │ LV:    │ LV:    │ LV:    │   FREE    │  │               ┃
    ┃         │  │ root   │ home   │ swap   │   SPACE   │  │               ┃
    ┃         │  │ 50 GB  │ 400 GB │ 8 GB   │   53 GB   │◀─┼─ Easy resize!┃
    ┃         │  │  ext4  │  ext4  │ swap   │           │  │               ┃
    ┃         │  └────────┴────────┴────────┴───────────┘  │               ┃
    ┃         └─────────────────────────────────────────────┘               ┃
    ┃                                                                       ┃
    ┃  ✓ Easy to resize (even while running!)                               ┃
    ┃  ✓ Snapshots possible                                                 ┃
    ┃  ✓ Can add more disks later                                           ┃
    ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


┌──────────────────────────────────────────────────────────────────────────────┐
│                   ⚔️  FILESYSTEM BATTLE ARENA ⚔️                            │
└──────────────────────────────────────────────────────────────────────────────┘

         EXT4                BTRFS               XFS                 F2FS
      (Veteran)           (Modern)           (Powerhouse)         (Flash)
    
    ┌──────────┐        ┌──────────┐        ┌──────────┐        ┌──────────┐
    │  ░░░░░░  │        │  ██████  │        │  ▓▓▓▓▓▓  │        │  ▒▒▒▒▒▒  │
    │  ░░██░░  │        │  ██░░██  │        │  ▓▓██▓▓  │        │  ▒▒██▒▒  │
    │  ░░██░░  │        │  ██████  │        │  ▓▓▓▓▓▓  │        │  ▒▒▒▒▒▒  │
    │  ░░  ░░  │        │  ██  ██  │        │  ▓▓  ▓▓  │        │  ▒▒  ▒▒  │
    └──────────┘        └──────────┘        └──────────┘        └──────────┘
    
    STRENGTHS:          STRENGTHS:          STRENGTHS:          STRENGTHS:
    • Battle-tested     • Snapshots         • Speed king        • SSD optimized
    • Stable as rock    • Compression       • Huge files        • Wear leveling
    • Universal         • Self-healing      • Enterprise        • Android phones
    
    WEAKNESSES:         WEAKNESSES:         WEAKNESSES:         WEAKNESSES:
    • No snapshots      • Still maturing    • Can't shrink      • Limited use
    • No compression    • More complex      • No compression    • Newer (risky)
    
    USE FOR:            USE FOR:            USE FOR:            USE FOR:
    • Root (/)          • Home (/home)      • Database servers  • SD cards
    • General purpose   • Desktop Linux     • Video editing     • eMMC storage
    • Servers           • Arch Linux        • Large media       • Embedded


┌──────────────────────────────────────────────────────────────────────────────┐
│                      🔐 BOOT SECURITY FLOW 🔐                                │
└──────────────────────────────────────────────────────────────────────────────┘

    LEGACY BOOT (BIOS + MBR)        vs        MODERN BOOT (UEFI + GPT)
    
    ┌─────────────────────┐                  ┌─────────────────────┐
    │      BIOS           │                  │       UEFI          │
    │  (Firmware ROM)     │                  │  (Firmware with UI) │
    └──────────┬──────────┘                  └──────────┬──────────┘
               │                                        │
               ▼                                        ▼
    ┌─────────────────────┐                  ┌─────────────────────┐
    │   Read MBR          │                  │  Read EFI Partition │
    │   (First 512 bytes) │                  │  (FAT32, 100MB-1GB) │
    └──────────┬──────────┘                  └──────────┬──────────┘
               │                                        │
               ▼                                        ▼
    ┌─────────────────────┐                  ┌─────────────────────┐
    │  GRUB Stage 1       │                  │  GRUB EFI Binary    │
    │  (446 bytes max!)   │                  │  (Full bootloader)  │
    └──────────┬──────────┘                  └──────────┬──────────┘
               │                                        │
               ▼                                        ▼
    ┌─────────────────────┐                  ┌─────────────────────┐
    │  GRUB Stage 2       │                  │    GRUB Menu        │
    │  (from /boot/grub)  │                  │   (Pretty GUI!)     │
    └──────────┬──────────┘                  └──────────┬──────────┘
               │                                        │
               └────────────────┬───────────────────────┘
                                │
                                ▼
                      ┌─────────────────────┐
                      │   Load Kernel       │
                      │   (vmlinuz)         │
                      └─────────────────────┘
    
    🔑 KEY DIFFERENCES:
    
    BIOS/MBR:                       UEFI/GPT:
    • Limited to 2TB disks          • Unlimited disk size
    • 4 primary partitions max      • 128 partitions
    • No Secure Boot                • Secure Boot support
    • 16-bit mode                   • 32/64-bit mode
    • Text UI only                  • Graphical UI
    • Bootloader size limited       • Full programs allowed


┌──────────────────────────────────────────────────────────────────────────────┐
│                       🎯 TROUBLESHOOTING MAP 🎯                              │
└──────────────────────────────────────────────────────────────────────────────┘

    PROBLEM: "Disk is full"
         │
         ├─▶ Check what's using space
         │   └─▶ ncdu /
         │   └─▶ du -sh /* | sort -hr
         │
         ├─▶ Clear cache
         │   └─▶ sudo pacman -Sc
         │   └─▶ sudo journalctl --vacuum-size=100M
         │
         └─▶ Resize partition
             └─▶ Boot live USB → gparted
             └─▶ OR use LVM: lvextend


    PROBLEM: "GRUB not showing up"
         │
         ├─▶ Wrong boot order in BIOS
         │   └─▶ Enter BIOS → Set disk as first boot device
         │
         ├─▶ GRUB not installed
         │   └─▶ Boot live USB
         │   └─▶ Mount root + boot
         │   └─▶ arch-chroot /mnt
         │   └─▶ grub-install /dev/sda
         │
         └─▶ Corrupted config
             └─▶ grub-mkconfig -o /boot/grub/grub.cfg


    PROBLEM: "Partition table corrupted"
         │
         ├─▶ Try testdisk
         │   └─▶ sudo testdisk /dev/sda
         │   └─▶ Analyze → Quick Search
         │
         └─▶ Restore from backup
             └─▶ If you made a backup with:
             └─▶ sudo sgdisk --backup=table.img /dev/sda
             └─▶ Restore: sgdisk --load-backup=table.img /dev/sda


    PROBLEM: "System won't boot after kernel update"
         │
         ├─▶ Boot from live USB
         │
         ├─▶ Mount filesystems
         │   └─▶ sudo mount /dev/sda2 /mnt
         │   └─▶ sudo mount /dev/sda1 /mnt/boot
         │
         ├─▶ Chroot into system
         │   └─▶ sudo arch-chroot /mnt
         │
         ├─▶ Reinstall kernel
         │   └─▶ pacman -S linux
         │
         └─▶ Regenerate initramfs
             └─▶ mkinitcpio -P


═══════════════════════════════════════════════════════════════════════════════
                            🎓 QUICK REFERENCE LEGEND
═══════════════════════════════════════════════════════════════════════════════

  SYMBOLS:
  ═══  Strong connection       ┌──┐  Container/Box
  ───  Weak connection         ├──┤  Junction
  │▼   Flow direction          └──┘  End cap
  ✓    Advantage               ✗    Disadvantage
  ⚡   Fast/Power              💾   Storage
  🔍   Information             ⚠️   Warning

  COMMON DEVICE NAMES:
  /dev/sda    - First SATA drive
  /dev/sdb    - Second SATA drive
  /dev/nvme0n1 - First NVMe drive
  /dev/mmcblk0 - SD card / eMMC
  /dev/sda1   - First partition on /dev/sda

  PARTITION NAMING:
  sda1, sda2  - SATA/SCSI partitions
  nvme0n1p1   - NVMe partitions (note the 'p')
  mmcblk0p1   - SD/eMMC partitions

═══════════════════════════════════════════════════════════════════════════════
                         ⚓ END OF VISUAL REFERENCE ⚓
                    Created by SS Arch Linux Maritime Division
═══════════════════════════════════════════════════════════════════════════════
```
