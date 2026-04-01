---
---

# 🚢 **THE ULTIMATE LINUX STORAGE OCEAN VOYAGE** 🚢
*A Complete Maritime Guide to Disks, Filesystems, and Bootloaders*

```
                    🌊 WELCOME TO STORAGE SEAS 🌊
         
              ___     ___     ___
            _|:::|_ _|:::|_ _|:::|_    
         __/::::::\::::::\:::::::\    LINUX STORAGE MASTERY
        /   \:::::/     \/     \/      - Disk Commands
        |  S |:::|   H   |  I  |       - Partitioning
        |  T |:::|   D   |  P  |       - Filesystems  
        |  O |:::|   D   |  S  |       - Bootloaders
        |  R |:::|   !   |  !  |       - Swap Magic
        |  A |:::|       |     |       
        |  G |:::|_______|_____|       Captain: Claude
        |  E |::::::::::::::::/        Vessel: SS Arch Linux
         \__/::::::::::::::/          
            ~~~~~~~~~~~~~~~~~
```


## 📊 **MAP 2: SPACE USAGE COMMANDS**

```bash
┌─────────────────────────────────────────────────────────┐
│         💾 CARGO HOLD INSPECTION 💾                     │
└─────────────────────────────────────────────────────────┘

# 🌊 FILESYSTEM SPACE
df                       # Disk free (all filesystems)
df -h                    # Human readable (GB/MB)
df -h /                  # Just root filesystem
df -h /home              # Just /home
df -i                    # Inode usage (file count)
df -T                    # Show filesystem type

# 🗂️ DIRECTORY SPACE
du -sh /home/*           # Size of each dir in /home
du -sh /*                # Size of root level dirs
du -h --max-depth=1 /    # One level deep
du -ah /var | sort -hr | head -20  # Top 20 largest

# 🎯 INTERACTIVE SPACE EXPLORERS
ncdu /                   # NCurses Disk Usage (best!)
ncdu -x /                # Stay on one filesystem
baobab                   # GNOME Disk Usage Analyzer (GUI)

# 🔍 FILE HUNTERS
find / -type f -size +1G 2>/dev/null        # Files over 1GB
find /home -type f -size +500M -exec ls -lh {} \;
locate -S                # Database statistics

# 📈 REAL-TIME MONITORING
watch -n 5 'df -h'       # Update every 5 seconds
```

```
         ASCII DIAGRAM: DISK vs FILESYSTEM SPACE
         
    PHYSICAL DISK (500GB)
    ═══════════════════════════════════════════
    ║  /dev/sda                               ║
    ╠═══════════════════════════════════════════
    ║  Partition 1: /boot (1GB)               ║
    ║  ┌─────────────────────────────┐        ║
    ║  │ Used: 200MB │ Free: 800MB   │        ║
    ║  └─────────────────────────────┘        ║
    ╠═══════════════════════════════════════════
    ║  Partition 2: / (50GB)                  ║
    ║  ┌─────────────────────────────┐        ║
    ║  │█████████████░░░░░ 48GB/50GB │ ← FULL!║
    ║  └─────────────────────────────┘        ║
    ╠═══════════════════════════════════════════
    ║  Partition 3: /home (449GB)             ║
    ║  ┌─────────────────────────────┐        ║
    ║  │██░░░░░░░░░░░░░ 100GB/449GB  │        ║
    ║  └─────────────────────────────┘        ║
    ╚═══════════════════════════════════════════
```


## 🧊 **METHOD 2: LVM (Logical Volume Manager)**

```bash
┌─────────────────────────────────────────────────────────┐
│       🎛️  LVM COMMAND CENTER 🎛️                        │
└─────────────────────────────────────────────────────────┘

# 🔍 CHECK IF YOU'RE USING LVM
lsblk | grep lvm
lvs                      # List logical volumes
vgs                      # List volume groups
pvs                      # List physical volumes

# 📈 INCREASE SIZE (Easy!)
sudo lvextend -L +20G /dev/vg0/root    # Add 20GB
sudo lvextend -l +100%FREE /dev/vg0/root  # Use all free space
sudo resize2fs /dev/vg0/root           # Resize ext4 filesystem

# 📉 DECREASE SIZE (Harder - filesystem first!)
sudo resize2fs /dev/vg0/home 100G      # Shrink filesystem
sudo lvreduce -L 100G /dev/vg0/home    # Then LV

# 🎯 ONE-LINER (Extend + Resize)
sudo lvextend -r -L +20G /dev/vg0/root
```

```
         LVM ARCHITECTURE (3-Layer Cake)
         
    ┌──────────────────────────────────────┐
    │  LOGICAL VOLUMES (What you see)     │ ← /dev/vg0/root
    │  ┌────────┬────────┬──────────┐     │   /dev/vg0/home
    │  │  root  │  home  │   swap   │     │
    │  └────────┴────────┴──────────┘     │
    ├──────────────────────────────────────┤
    │  VOLUME GROUP (Pool of space)       │ ← vg0
    │  ════════════════════════════════    │
    ├──────────────────────────────────────┤
    │  PHYSICAL VOLUMES (Actual disks)    │ ← /dev/sda2
    │  [SSD] [HDD] [NVMe]                 │   /dev/sdb1
    └──────────────────────────────────────┘
    
    🔑 KEY: LVM lets you resize easily!
```


# 🚀 **PART 4: BOOTLOADERS (GRUB, SYSTEMD-BOOT, ETC)**

```bash
┌─────────────────────────────────────────────────────────┐
│        🎯 BOOTLOADER BATTLE STATION 🎯                  │
└─────────────────────────────────────────────────────────┘
```

## 🗺️ **Boot Process Map**

```
    THE BOOT VOYAGE (What happens when you press power)
    
    ⚡ POWER BUTTON PRESSED
         │
         ▼
    ┌────────────────────────┐
    │   FIRMWARE (BIOS/UEFI) │ ← Checks hardware
    └────────┬───────────────┘
             │ Reads boot device
             ▼
    ┌────────────────────────┐
    │   BOOTLOADER STAGE 1   │ ← MBR (446 bytes) or
    │   (MBR or EFI)         │   EFI partition
    └────────┬───────────────┘
             │ Loads main bootloader
             ▼
    ┌────────────────────────┐
    │   BOOTLOADER STAGE 2   │ ← GRUB/systemd-boot
    │   (GRUB menu)          │   Shows menu
    └────────┬───────────────┘
             │ User selects OS
             ▼
    ┌────────────────────────┐
    │   KERNEL (vmlinuz)     │ ← Linux kernel loads
    └────────┬───────────────┘
             │
             ▼
    ┌────────────────────────┐
    │   INITRAMFS (initrd)   │ ← Temporary root FS
    └────────┬───────────────┘
             │ Mounts real root
             ▼
    ┌────────────────────────┐
    │   INIT SYSTEM          │ ← systemd starts
    │   (systemd/OpenRC)     │
    └────────┬───────────────┘
             │
             ▼
    ┌────────────────────────┐
    │   LOGIN PROMPT         │ 🎉 YOU'RE IN!
    └────────────────────────┘
```

## ⚓ **Bootloader Comparison**

```bash
┌────────────────────────────────────────────────────────┐
│                 BOOTLOADER FLEET                       │
├────────────┬──────────┬────────────┬──────────────────┤
│ BOOTLOADER │ FIRMWARE │ COMPLEXITY │  BEST FOR        │
├────────────┼──────────┼────────────┼──────────────────┤
│ GRUB2      │ Both     │ High ★★★★☆│ Multi-boot, old  │
│            │ BIOS+UEFI│            │ hardware         │
├────────────┼──────────┼────────────┼──────────────────┤
│ systemd-   │ UEFI only│ Low  ★☆☆☆☆│ Simple, modern   │
│ boot       │          │            │ UEFI systems     │
├────────────┼──────────┼────────────┼──────────────────┤
│ rEFInd     │ UEFI only│ Med  ★★☆☆☆│ Mac, beautiful   │
│            │          │            │ GUI              │
├────────────┼──────────┼────────────┼──────────────────┤
│ SYSLINUX   │ BIOS     │ Low  ★★☆☆☆│ Legacy, USB boot │
├────────────┼──────────┼────────────┼──────────────────┤
│ LILO       │ BIOS     │ Low  ★☆☆☆☆│ Ancient (avoid!) │
└────────────┴──────────┴────────────┴──────────────────┘
```

## 🔧 **GRUB Commands**

```bash
# 📦 INSTALLATION
sudo grub-install /dev/sda              # BIOS
sudo grub-install --target=x86_64-efi \
  --efi-directory=/boot --bootloader-id=GRUB  # UEFI

# 🔄 UPDATE GRUB CONFIG
sudo grub-mkconfig -o /boot/grub/grub.cfg
sudo update-grub  # (on Debian/Ubuntu)

# 🎨 CONFIGURATION
sudo nano /etc/default/grub
  GRUB_TIMEOUT=5                 # Wait time
  GRUB_DEFAULT=0                 # Default entry
  GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"
  GRUB_GFXMODE=1920x1080        # Resolution

# 🔍 TROUBLESHOOTING
sudo grub-probe /boot              # Check boot partition
sudo grub-install --recheck /dev/sda  # Reinstall

# 🏴☠️ GRUB RESCUE MODE
grub rescue> ls                    # List partitions
grub rescue> set root=(hd0,2)     # Set root
grub rescue> insmod normal
grub rescue> normal
```

```
    GRUB DIRECTORY STRUCTURE
    
    /boot/
    ├── grub/
    │   ├── grub.cfg          ← Main config (auto-generated)
    │   ├── grubenv           ← Environment vars
    │   ├── fonts/            ← Display fonts
    │   ├── locale/           ← Translations
    │   └── themes/           ← Custom themes
    │       └── mytheme/
    │           ├── theme.txt
    │           └── background.png
    ├── vmlinuz-linux         ← Kernel
    └── initramfs-linux.img   ← Initial RAM disk
    
    /etc/default/grub         ← Edit this for settings!
```


# 🧭 **PART 6: MASTER BOOT RECORD (MBR) vs GPT**

```bash
┌─────────────────────────────────────────────────────────┐
│        🗺️  PARTITION TABLE CARTOGRAPHY 🗺️               │
└─────────────────────────────────────────────────────────┘
```

```
    THE GREAT PARTITION TABLE WAR
    
    📜 MBR (1983 - Legacy)         🆕 GPT (2000s - Modern)
    ═══════════════════════       ═══════════════════════
    
    ┌────────────────────┐        ┌────────────────────┐
    │ LIMITATIONS:       │        │ ADVANTAGES:        │
    │ • 2TB max disk     │        │ • Unlimited size   │
    │ • 4 primary parts  │        │ • 128 partitions   │
    │ • No redundancy    │        │ • Backup table     │
    │ • BIOS only        │        │ • CRC checks       │
    └────────────────────┘        │ • UEFI required    │
                                  └────────────────────┘
    
    MBR STRUCTURE:              GPT STRUCTURE:
    ┌──────────────┐           ┌──────────────────┐
    │ Bootloader   │ 446 bytes│ Protective MBR   │
    ├──────────────┤           ├──────────────────┤
    │ Part Table   │  64 bytes│ Primary GPT Hdr  │
    ├──────────────┤           ├──────────────────┤
    │ Boot Sig     │   2 bytes│ Partition Array  │
    └──────────────┘           ├──────────────────┤
         512 bytes             │ Partitions...    │
                               ├──────────────────┤
                               │ Backup GPT Hdr   │
                               └──────────────────┘
                                   (End of disk)
```

## 🔍 **Check & Convert**

```bash
# 🔎 CHECK PARTITION TABLE TYPE
sudo fdisk -l /dev/sda | grep "Disklabel type"
sudo parted /dev/sda print | grep "Partition Table"
lsblk -d -o NAME,PTTYPE

# 🔄 CONVERT MBR TO GPT (⚠️ BACKUP FIRST!)
# Method 1: gdisk (safe, no data loss)
sudo gdisk /dev/sda
  r      # Recovery menu
  g      # Convert to GPT
  w      # Write and exit

# Method 2: sgdisk
sudo sgdisk -g /dev/sda

# ⚠️ AFTER CONVERSION: Reinstall bootloader!
sudo grub-install --target=x86_64-efi --efi-directory=/boot/efi \
  --bootloader-id=GRUB /dev/sda
```

