---
---
# Linux Networking Commands - Complete Reference

```
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║   ███╗   ██╗███████╗████████╗██╗    ██╗ ██████╗ ██████╗██╗  ██╗║
║   ████╗  ██║██╔════╝╚══██╔══╝██║    ██║██╔═══██╗██╔══██╗██║ ██╔╝║
║   ██╔██╗ ██║█████╗     ██║   ██║ █╗ ██║██║   ██║██████╔╝█████╔╝ ║
║   ██║╚██╗██║██╔══╝     ██║   ██║███╗██║██║   ██║██╔══██╗██╔═██╗ ║
║   ██║ ╚████║███████╗   ██║   ╚███╔███╔╝╚██████╔╝██║  ██║██║  ██╗║
║   ╚═╝  ╚═══╝╚══════╝   ╚═╝    ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝║
║                                                                ║
║              Linux Network Administration                     ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
```


## Network Interfaces

### Understanding Network Interface Naming

```ascii
┌────────────────────────────────────────────────────────────┐
│              LINUX NETWORK INTERFACE TYPES                 │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Traditional Naming (Legacy):                              │
│  ├─ eth0, eth1, eth2  → Ethernet interfaces                │
│  ├─ wlan0, wlan1      → Wireless interfaces                │
│  └─ lo                → Loopback interface                 │
│                                                            │
│  Predictable Network Interface Names (Modern):             │
│  ├─ eno1, eno2        → Onboard Ethernet                   │
│  ├─ ens1, ens33       → PCI Express slot Ethernet          │
│  ├─ enp2s0            → PCI Express (bus:slot)             │
│  ├─ wlp3s0, wlp40s0   → Wireless PCI Express               │
│  └─ docker0, br0      → Bridge interfaces                  │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### Network Interface Hierarchy

```mermaid
graph TB
    A[Network Interfaces] --> B[Physical Interfaces]
    A --> C[Virtual Interfaces]
    
    B --> D[Ethernet<br/>eno1, enp2s0]
    B --> E[Wireless<br/>wlp40s0, wlan0]
    
    C --> F[Loopback<br/>lo - 127.0.0.1]
    C --> G[Bridge<br/>docker0, br0]
    C --> H[VLAN<br/>eth0.100]
    C --> I[Tunnel<br/>tun0, tap0]
    
    style F fill:#2ecc71
    style G fill:#3498db
    style D fill:#e74c3c
    style E fill:#f39c12
```

### Common Network Interfaces Explained

#### lo - Loopback Interface

```
┌─────────────────────────────────────────────────────────────┐
│                    LOOPBACK INTERFACE                       │
│                         (lo)                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Purpose:                                                   │
│  - Virtual network interface for internal communication    │
│  - Always active, never fails                              │
│  - Used for local service testing                          │
│  - No physical hardware required                           │
│                                                             │
│  Default Configuration:                                     │
│  ┌───────────────────────────────────────────────────┐     │
│  │  Interface:  lo                                   │     │
│  │  IPv4:       127.0.0.1/8                          │     │
│  │  IPv6:       ::1/128                              │     │
│  │  State:      UP (always)                          │     │
│  │  MTU:        65536                                │     │
│  └───────────────────────────────────────────────────┘     │
│                                                             │
│  Common Uses:                                               │
│  - Testing network applications locally                    │
│  - Database connections (localhost)                        │
│  - Web servers (127.0.0.1:8080)                           │
│  - Inter-process communication                             │
│                                                             │
│  Example:                                                   │
│  $ ping 127.0.0.1                                          │
│  $ curl http://localhost:8080                              │
│  $ mysql -h 127.0.0.1 -u root -p                          │
│                                                             │
│  Key Facts:                                                 │
│  ✓ Packets never leave the host                            │
│  ✓ No encryption/security needed                           │
│  ✓ Very fast (no network overhead)                         │
│  ✓ Cannot be disabled                                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### eno1 / enp2s0 - Ethernet Interfaces

```
┌─────────────────────────────────────────────────────────────┐
│                   ETHERNET INTERFACES                       │
│                (eno1, enp2s0, ens33)                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Naming Convention:                                         │
│  ┌───────────────────────────────────────────────────┐     │
│  │  en  → Ethernet                                   │     │
│  │  o1  → Onboard device 1                           │     │
│  │  p2  → PCI Express bus 2                          │     │
│  │  s0  → Slot 0                                     │     │
│  └───────────────────────────────────────────────────┘     │
│                                                             │
│  Examples:                                                  │
│  eno1   → First onboard Ethernet                           │
│  enp2s0 → PCI Express bus 2, slot 0                        │
│  ens33  → PCI Express slot 33 (VMs)                        │
│                                                             │
│  Typical Configuration:                                     │
│  ┌───────────────────────────────────────────────────┐     │
│  │  Interface:  eno1                                 │     │
│  │  IP:         192.168.1.100/24                     │     │
│  │  Gateway:    192.168.1.1                          │     │
│  │  DNS:        8.8.8.8                              │     │
│  │  MAC:        00:1a:2b:3c:4d:5e                    │     │
│  │  Speed:      1000 Mb/s (Gigabit)                  │     │
│  │  Duplex:     Full                                 │     │
│  └───────────────────────────────────────────────────┘     │
│                                                             │
│  Common Commands:                                           │
│  $ ip addr show eno1                                       │
│  $ sudo ip link set eno1 up                                │
│  $ sudo ip link set eno1 down                              │
│  $ ethtool eno1              # Hardware details            │
│  $ ip -s link show eno1      # Statistics                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### wlp40s0 - Wireless Interface

```
┌─────────────────────────────────────────────────────────────┐
│                   WIRELESS INTERFACES                       │
│                  (wlp40s0, wlan0)                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Naming Convention:                                         │
│  ┌───────────────────────────────────────────────────┐     │
│  │  wl  → Wireless LAN                               │     │
│  │  p40 → PCI Express bus 40                         │     │
│  │  s0  → Slot 0                                     │     │
│  └───────────────────────────────────────────────────┘     │
│                                                             │
│  Configuration:                                             │
│  ┌───────────────────────────────────────────────────┐     │
│  │  Interface:  wlp40s0                              │     │
│  │  SSID:       HomeNetwork                          │     │
│  │  Mode:       Managed                              │     │
│  │  Frequency:  2.4 GHz / 5 GHz                      │     │
│  │  Channel:    6                                    │     │
│  │  Signal:     -45 dBm (Excellent)                  │     │
│  │  Security:   WPA2-PSK                             │     │
│  │  Speed:      300 Mb/s (802.11n)                   │     │
│  └───────────────────────────────────────────────────┘     │
│                                                             │
│  Common Commands:                                           │
│  $ iwconfig wlp40s0                # Wireless info          │
│  $ iw dev wlp40s0 link             # Connection status     │
│  $ iw dev wlp40s0 scan             # Scan networks         │
│  $ nmcli dev wifi list             # List WiFi networks    │
│  $ nmcli dev wifi connect "SSID" password "pass"          │
│                                                             │
│  Wireless Modes:                                            │
│  - Managed: Client mode (connect to AP)                   │
│  - Master: Access Point mode                               │
│  - Ad-Hoc: Peer-to-peer networking                         │
│  - Monitor: Packet sniffing mode                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### docker0 - Docker Bridge Interface

```
┌─────────────────────────────────────────────────────────────┐
│                   DOCKER BRIDGE INTERFACE                   │
│                        (docker0)                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Purpose:                                                   │
│  - Virtual Ethernet bridge for Docker containers           │
│  - Default network for containers                          │
│  - Provides NAT for container internet access              │
│  - Created automatically by Docker daemon                  │
│                                                             │
│  Default Configuration:                                     │
│  ┌───────────────────────────────────────────────────┐     │
│  │  Interface:  docker0                              │     │
│  │  IP:         172.17.0.1/16                        │     │
│  │  Type:       Bridge                               │     │
│  │  State:      UP (when Docker running)             │     │
│  │  MTU:        1500                                 │     │
│  └───────────────────────────────────────────────────┘     │
│                                                             │
│  How It Works:                                              │
│  ┌───────────────────────────────────────────────────┐     │
│  │                                                   │     │
│  │   Host Machine (172.17.0.1)                       │     │
│  │          │                                        │     │
│  │          │ docker0 bridge                         │     │
│  │          │                                        │     │
│  │    ┌─────┼─────┬─────────┬─────────┐             │     │
│  │    │           │         │         │             │     │
│  │  veth1      veth2      veth3     veth4           │     │
│  │    │           │         │         │             │     │
│  │ Container1 Container2 Container3 Container4      │     │
│  │ 172.17.0.2 172.17.0.3 172.17.0.4 172.17.0.5     │     │
│  │                                                   │     │
│  └───────────────────────────────────────────────────┘     │
│                                                             │
│  Common Commands:                                           │
│  $ ip addr show docker0                                    │
│  $ docker network ls                                       │
│  $ docker network inspect bridge                           │
│  $ sudo iptables -t nat -L -n  # NAT rules                │
│                                                             │
│  Key Features:                                              │
│  ✓ Automatic IP assignment via DHCP                        │
│  ✓ Internal DNS resolution                                 │
│  ✓ Port forwarding via iptables                            │
│  ✓ Container-to-container communication                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```


## Network Configuration

### ifconfig - Interface Configuration (Legacy)

```
┌─────────────────────────────────────────────────────────────┐
│                        IFCONFIG                             │
│              (Interface Configuration)                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Status: DEPRECATED - Use 'ip' command instead              │
│  Still widely used for legacy compatibility                │
│                                                             │
│  Basic Usage:                                               │
│  $ ifconfig                    # Show all interfaces        │
│  $ ifconfig -a                 # Include disabled interfaces│
│  $ ifconfig eth0               # Show specific interface    │
│                                                             │
│  Configuration:                                             │
│  $ sudo ifconfig eth0 up                                   │
│  $ sudo ifconfig eth0 down                                 │
│  $ sudo ifconfig eth0 192.168.1.100 netmask 255.255.255.0 │
│  $ sudo ifconfig eth0 mtu 1400                             │
│                                                             │
│  Output Example:                                            │
│  ┌───────────────────────────────────────────────────┐     │
│  │ eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  │     │
│  │       inet 192.168.1.100  netmask 255.255.255.0   │     │
│  │       inet6 fe80::a00:27ff:fe4e:66a1               │     │
│  │       ether 08:00:27:4e:66:a1  txqueuelen 1000    │     │
│  │       RX packets 1234  bytes 123456 (120.5 KiB)   │     │
│  │       TX packets 5678  bytes 567890 (554.5 KiB)   │     │
│  └───────────────────────────────────────────────────┘     │
│                                                             │
│  Key Fields:                                                │
│  - UP: Interface is active                                 │
│  - RUNNING: Interface is connected                         │
│  - BROADCAST: Supports broadcasting                        │
│  - MULTICAST: Supports multicasting                        │
│  - inet: IPv4 address                                      │
│  - ether: MAC address                                      │
│  - RX/TX: Received/Transmitted packets                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### ip - Modern Network Configuration

```
┌─────────────────────────────────────────────────────────────┐
│                        IP COMMAND                           │
│              (Modern ifconfig Replacement)                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Purpose:                                                   │
│  - Modern replacement for ifconfig, route, arp             │
│  - More powerful and flexible                              │
│  - Part of iproute2 package                                │
│  - Recommended for all new scripts                         │
│                                                             │
│  Show Information:                                          │
│  $ ip addr                      # Show all addresses        │
│  $ ip addr show dev eth0        # Specific interface       │
│  $ ip -4 addr                   # IPv4 only                │
│  $ ip -6 addr                   # IPv6 only                │
│  $ ip link show                 # Link layer info          │
│  $ ip -s link                   # With statistics          │
│  $ ip route show                # Routing table            │
│  $ ip neigh show                # ARP table (neighbors)    │
│                                                             │
│  Interface Management:                                      │
│  $ sudo ip link set eth0 up                                │
│  $ sudo ip link set eth0 down                              │
│  $ sudo ip link set eth0 mtu 1400                          │
│  $ sudo ip link set eth0 address 00:11:22:33:44:55        │
│                                                             │
│  Address Configuration:                                     │
│  $ sudo ip addr add 192.168.1.100/24 dev eth0             │
│  $ sudo ip addr del 192.168.1.100/24 dev eth0             │
│  $ sudo ip addr flush dev eth0      # Remove all addresses │
│                                                             │
│  Routing:                                                   │
│  $ sudo ip route add default via 192.168.1.1               │
│  $ sudo ip route add 10.0.0.0/8 via 192.168.1.254         │
│  $ sudo ip route del 10.0.0.0/8                            │
│  $ sudo ip route get 8.8.8.8        # Show route to IP     │
│                                                             │
│  Output Example (ip addr):                                  │
│  ┌───────────────────────────────────────────────────┐     │
│  │ 2: eth0: <BROADCAST,MULTICAST,UP> mtu 1500       │     │
│  │    link/ether 08:00:27:4e:66:a1 brd ff:ff:ff:ff  │     │
│  │    inet 192.168.1.100/24 brd 192.168.1.255        │     │
│  │         scope global dynamic eth0                 │     │
│  │    inet6 fe80::a00:27ff:fe4e:66a1/64              │     │
│  │         scope link                                │     │
│  └───────────────────────────────────────────────────┘     │
│                                                             │
│  ifconfig → ip Command Migration:                           │
│  ┌─────────────────────────┬──────────────────────────┐   │
│  │ ifconfig                │ ip                       │   │
│  ├─────────────────────────┼──────────────────────────┤   │
│  │ ifconfig -a             │ ip addr                  │   │
│  │ ifconfig eth0 up        │ ip link set eth0 up      │   │
│  │ ifconfig eth0 down      │ ip link set eth0 down    │   │
│  │ route -n                │ ip route                 │   │
│  │ arp -n                  │ ip neigh                 │   │
│  └─────────────────────────┴──────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### iwconfig - Wireless Configuration

```
┌─────────────────────────────────────────────────────────────┐
│                        IWCONFIG                             │
│              (Wireless Interface Configuration)             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Purpose:                                                   │
│  - Configure wireless network interfaces                   │
│  - View wireless connection details                        │
│  - Set WiFi parameters                                     │
│                                                             │
│  Basic Usage:                                               │
│  $ iwconfig                    # Show all wireless          │
│  $ iwconfig wlan0              # Specific interface         │
│                                                             │
│  Configuration:                                             │
│  $ sudo iwconfig wlan0 essid "MyNetwork"                   │
│  $ sudo iwconfig wlan0 key s:password                      │
│  $ sudo iwconfig wlan0 mode Managed                        │
│  $ sudo iwconfig wlan0 channel 6                           │
│  $ sudo iwconfig wlan0 txpower 20                          │
│                                                             │
│  Output Example:                                            │
│  ┌───────────────────────────────────────────────────┐     │
│  │ wlan0  IEEE 802.11  ESSID:"HomeNetwork"           │     │
│  │        Mode:Managed  Frequency:2.437 GHz          │     │
│  │        Access Point: AA:BB:CC:DD:EE:FF            │     │
│  │        Bit Rate=72.2 Mb/s   Tx-Power=20 dBm      │     │
│  │        Link Quality=70/70  Signal level=-40 dBm   │     │
│  │        Rx invalid nwid:0  invalid crypt:0         │     │
│  └───────────────────────────────────────────────────┘     │
│                                                             │
│  Signal Strength Guide:                                     │
│  -30 dBm: Excellent (max signal)                           │
│  -50 dBm: Very good                                        │
│  -60 dBm: Good                                             │
│  -70 dBm: Fair (minimum for reliable connection)           │
│  -80 dBm: Poor (barely usable)                             │
│  -90 dBm: Extremely poor (unusable)                        │
│                                                             │
│  Note: Modern systems prefer 'iw' command:                  │
│  $ iw dev wlan0 info                                       │
│  $ iw dev wlan0 scan                                       │
│  $ iw dev wlan0 link                                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```


## Network Monitoring

### netstat - Network Statistics (Legacy)

```
┌─────────────────────────────────────────────────────────────┐
│                        NETSTAT                              │
│              (Network Statistics)                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Status: DEPRECATED - Use 'ss' command instead              │
│  Still commonly used in many environments                  │
│                                                             │
│  Purpose:                                                   │
│  - Display network connections                             │
│  - Show routing tables                                     │
│  - Network interface statistics                            │
│  - Listening ports                                         │
│                                                             │
│  Common Commands:                                           │
│  $ netstat -a                  # All connections            │
│  $ netstat -t                  # TCP connections            │
│  $ netstat -u                  # UDP connections            │
│  $ netstat -l                  # Listening ports            │
│  $ netstat -tulpn              # TCP/UDP, listening, PID, numeric│
│  $ netstat -r                  # Routing table              │
│  $ netstat -i                  # Interface statistics       │
│  $ netstat -s                  # Protocol statistics        │
│                                                             │
│  Most Useful Combination:                                   │
│  $ sudo netstat -tulpn                                     │
│  ┌───────────────────────────────────────────────────┐     │
│  │ Proto  Local Address    Foreign Address  State    PID │  │
│  │ tcp    0.0.0.0:22        0.0.0.0:*       LISTEN   1234 │  │
│  │ tcp    0.0.0.0:80        0.0.0.0:*       LISTEN   5678 │  │
│  │ tcp    192.168.1.100:443 192.168.1.50   ESTABLISHED │   │
│  └───────────────────────────────────────────────────┘     │
│                                                             │
│  Connection States:                                         │
│  - LISTEN: Waiting for connection requests                 │
│  - ESTABLISHED: Active connection                          │
│  - TIME_WAIT: Waiting after close                          │
│  - CLOSE_WAIT: Waiting for connection termination          │
│  - SYN_SENT: Attempting connection                         │
│  - SYN_RECEIVED: Received connection request               │
│                                                             │
│  Options Explained:                                         │
│  -t → TCP connections                                      │
│  -u → UDP connections                                      │
│  -l → Listening sockets                                    │
│  -p → Show process ID/name                                 │
│  -n → Numeric addresses (no DNS resolution)                │
│  -a → All sockets                                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### ss - Socket Statistics (Modern)

```
┌─────────────────────────────────────────────────────────────┐
│                           SS                                │
│              (Socket Statistics - Modern netstat)           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Purpose:                                                   │
│  - Modern replacement for netstat                          │
│  - Faster and more efficient                               │
│  - More detailed information                               │
│  - Part of iproute2 package                                │
│                                                             │
│  Common Commands:                                           │
│  $ ss -a                       # All sockets                │
│  $ ss -t                       # TCP sockets                │
│  $ ss -u                       # UDP sockets                │
│  $ ss -l                       # Listening sockets          │
│  $ ss -tulpn                   # TCP/UDP, listening, process│
```
