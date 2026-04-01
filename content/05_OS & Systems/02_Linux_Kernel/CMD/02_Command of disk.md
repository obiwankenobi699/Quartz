---
---

# 🚢 LINUX STORAGE MASTER CHEATSHEET 🚢
*Quick reference for disk management, filesystems, and boot configuration*


## 💾 SPACE ANALYSIS

```bash
# Directory Size
du -sh /path/*                 # Size of each item in directory
du -h --max-depth=1 / | sort -hr | head -20  # Top 20 largest dirs
ncdu /                         # Interactive disk usage (best!)

# Filesystem Space
df -h                          # All filesystems
df -h /                        # Root filesystem only
df -i                          # Inode (file count) usage

# Find Large Files
find / -type f -size +1G 2>/dev/null         # Files > 1GB
find /home -type f -size +500M -exec ls -lh {} \;
```


## 📂 FILESYSTEM OPERATIONS

```bash
# Create Filesystems
sudo mkfs.ext4 /dev/sda2       # Ext4
sudo mkfs.btrfs /dev/sda3      # Btrfs
sudo mkfs.xfs /dev/sda4        # XFS
sudo mkfs.fat -F32 /dev/sda1   # FAT32 (for /boot)

# Check Filesystem Type
lsblk -f
df -T
file -sL /dev/sda2

# Filesystem Check/Repair (UNMOUNT FIRST!)
sudo e2fsck -f /dev/sda2       # Ext4
sudo xfs_repair /dev/sda4      # XFS
sudo btrfs check /dev/sda3     # Btrfs

# Resize Filesystems
sudo resize2fs /dev/sda2       # Ext4 (after partition resize)
sudo xfs_growfs /mnt           # XFS (while MOUNTED)
sudo btrfs filesystem resize max /mnt  # Btrfs
```


## 💧 SWAP MANAGEMENT

```bash
# Check Swap
swapon --show                  # Current swap devices
free -h                        # RAM + swap usage

# Create Swap File (8GB example)
sudo dd if=/dev/zero of=/swapfile bs=1G count=8
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap defaults 0 0' | sudo tee -a /etc/fstab

# Create Swap Partition
sudo mkswap /dev/sda3
sudo swapon /dev/sda3
# Add to /etc/fstab: /dev/sda3 none swap defaults 0 0

# Tune Swappiness (0-100, lower = less swap)
sudo sysctl vm.swappiness=10
echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf

# Remove Swap
sudo swapoff /swapfile
sudo rm /swapfile
# Remove line from /etc/fstab
```


## 🗺️ PARTITION TABLE CONVERSION

```bash
# Convert MBR to GPT (⚠️ BACKUP FIRST!)
sudo gdisk /dev/sda
  r      # Recovery menu
  g      # Convert to GPT
  w      # Write changes

# OR using sgdisk:
sudo sgdisk -g /dev/sda

# After conversion, reinstall bootloader:
sudo grub-install --target=x86_64-efi --efi-directory=/boot/efi \
  --bootloader-id=GRUB /dev/sda
```


## 📊 FILESYSTEM COMPARISON

| Filesystem | Max File | Max FS   | Snapshots | Compression | Best For        |
|------------|----------|----------|-----------|-------------|-----------------|
| **ext4**   | 16 TB    | 1 EB     | ✗         | ✗           | General purpose |
| **btrfs**  | 16 EB    | 16 EB    | ✓         | ✓           | Modern desktop  |
| **xfs**    | 8 EB     | 8 EB     | ✗         | ✗           | Large files     |
| **f2fs**   | 3.94 TB  | 16 TB    | ✗         | ✗           | Flash/SSD       |
| **zfs**    | 16 EB    | 256 ZB   | ✓         | ✓           | Servers/NAS     |


## ⚠️ GOLDEN RULES

1. **ALWAYS BACKUP BEFORE RESIZING/CONVERTING**
2. Unmount filesystems before checking/repairing
3. Know your partition table type (MBR vs GPT)
4. Use LVM for easy resizing
5. Swap file > swap partition (easier to resize)
6. Read `man` pages when unsure: `man lsblk`


**Created with ⚓ by the SS Arch Linux**
*Last updated: January 2026*
