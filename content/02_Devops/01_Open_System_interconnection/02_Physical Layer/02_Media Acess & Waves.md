---
---
## Table of Contents

1. [Transmission Media](https://claude.ai/chat/1f251fa6-0735-438d-8a0e-209f2c147346#1-transmission-media)
2. [Signal Transmission and Encoding](https://claude.ai/chat/1f251fa6-0735-438d-8a0e-209f2c147346#2-signal-transmission-and-encoding)
3. [Multiplexing Techniques](https://claude.ai/chat/1f251fa6-0735-438d-8a0e-209f2c147346#3-multiplexing-techniques)
4. [Cables, Ports & Electronics](https://claude.ai/chat/1f251fa6-0735-438d-8a0e-209f2c147346#4-cables-ports--electronics)
5. [Complete System Integration](https://claude.ai/chat/1f251fa6-0735-438d-8a0e-209f2c147346#5-complete-system-integration)


## 1.1 Guided Transmission Media (Wired)

### A) Twisted Pair Cable

```
┌─────────────────────────────────────────────────────────┐
│            TWISTED PAIR CABLE STRUCTURE                 │
│                                                         │
│    Outer Jacket (PVC Protection)                       │
│    ┌────────────────────────────────────────────┐     │
│    │  ╔════════════════════════════════════╗    │     │
│    │  ║  Twisted Pairs (4 pairs = 8 wires)║    │     │
│    │  ║                                    ║    │     │
│    │  ║   Orange  ╱╲╱╲╱╲╱╲  White-Orange  ║    │     │
│    │  ║           ╲╱╲╱╲╱╲╱                 ║    │     │
│    │  ║                                    ║    │     │
│    │  ║   Green   ╱╲╱╲╱╲╱╲  White-Green   ║    │     │
│    │  ║           ╲╱╲╱╲╱╲╱                 ║    │     │
│    │  ║                                    ║    │     │
│    │  ║   Blue    ╱╲╱╲╱╲╱╲  White-Blue    ║    │     │
│    │  ║           ╲╱╲╱╲╱╲╱                 ║    │     │
│    │  ║                                    ║    │     │
│    │  ║   Brown   ╱╲╱╲╱╲╱╲  White-Brown   ║    │     │
│    │  ║           ╲╱╲╱╲╱╲╱                 ║    │     │
│    │  ╚════════════════════════════════════╝    │     │
│    └────────────────────────────────────────────┘     │
│                                                         │
│  Why Twisted? To reduce electromagnetic interference   │
│  and crosstalk between pairs                           │
│                                                         │
│  Wire Gauge: 22-24 AWG (American Wire Gauge)          │
│  • 24 AWG = 0.5mm diameter                            │
│  • Solid core: Better for permanent installations      │
│  • Stranded: More flexible, for patch cables          │
└─────────────────────────────────────────────────────────┘
```

**Types:**

**1. UTP (Unshielded Twisted Pair)**

```
  No Shielding - More Susceptible to EMI
  ┌─────────────────────┐
  │  ╱╲╱╲╱╲  ╱╲╱╲╱╲   │
  │  ╲╱╲╱╲╱  ╲╱╲╱╲╱   │
  │  ╱╲╱╲╱╲  ╱╲╱╲╱╲   │
  │  ╲╱╲╱╲╱  ╲╱╲╱╲╱   │
  └─────────────────────┘
  
  Advantages:
  ✅ Cheaper cost
  ✅ More flexible
  ✅ Easier to install
  
  Disadvantages:
  ❌ Susceptible to EMI
  ❌ Higher crosstalk
  ❌ Shorter distances
```

**2. STP (Shielded Twisted Pair)**

```
  Metal Foil/Braid Shielding
  ┌─────────────────────┐
  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ ← Shield Layer
  │ ▓ ╱╲╱╲  ╱╲╱╲ ▓    │
  │ ▓ ╲╱╲╱  ╲╱╲╱ ▓    │
  │ ▓ ╱╲╱╲  ╱╲╱╲ ▓    │
  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
  └─────────────────────┘
  
  Advantages:
  ✅ Better EMI protection
  ✅ Lower crosstalk
  ✅ More secure
  
  Disadvantages:
  ❌ More expensive
  ❌ Less flexible
  ❌ Requires proper grounding
```

**Category Ratings (CAT Cables):**

```
┌──────┬────────────┬──────────────┬─────────────┬──────────────────┐
│ Cat  │ Frequency  │ Max Speed    │ Max Distance│ Applications     │
├──────┼────────────┼──────────────┼─────────────┼──────────────────┤
│ Cat3 │ 16 MHz     │ 10 Mbps      │ 100m        │ Phone/10BASE-T   │
│ Cat5 │ 100 MHz    │ 100 Mbps     │ 100m        │ Fast Ethernet    │
│ Cat5e│ 100 MHz    │ 1 Gbps       │ 100m        │ Gigabit Ethernet │
│ Cat6 │ 250 MHz    │ 1 Gbps       │ 100m        │ Gigabit Ethernet │
│      │            │ 10 Gbps      │ 55m         │ 10G Ethernet     │
│ Cat6a│ 500 MHz    │ 10 Gbps      │ 100m        │ 10G Ethernet     │
│ Cat7 │ 600 MHz    │ 10 Gbps      │ 100m        │ Data Centers     │
│ Cat8 │ 2000 MHz   │ 25-40 Gbps   │ 30m         │ Data Centers     │
└──────┴────────────┴──────────────┴─────────────┴──────────────────┘
```

**Understanding Frequency vs Bandwidth:**

```
╔═══════════════════════════════════════════════════════════╗
║      FREQUENCY vs BANDWIDTH EXPLANATION                   ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║ FREQUENCY (MHz):                                          ║
║ • How fast the signal can oscillate/change                ║
║ • Higher frequency = more rapid signal transitions        ║
║ • Measured in Hertz (cycles per second)                   ║
║ • Example: Cat6 @ 250 MHz = 250 million transitions/sec  ║
║                                                           ║
║ BANDWIDTH (Mbps/Gbps):                                    ║
║ • Amount of data that can be transmitted                  ║
║ • Depends on: frequency, encoding, cable quality          ║
║ • Measured in bits per second                             ║
║ • Example: Cat6 supports 1 Gbps (or 10 Gbps at 55m)      ║
║                                                           ║
║ RELATIONSHIP:                                             ║
║ Higher Category → Higher Frequency → Higher Bandwidth     ║
║                                                           ║
║ Cat5e:  100 MHz  →  1 Gbps                               ║
║ Cat6:   250 MHz  →  10 Gbps (short distance)             ║
║ Cat6a:  500 MHz  →  10 Gbps (full 100m)                  ║
║ Cat8:   2000 MHz →  40 Gbps                              ║
╚═══════════════════════════════════════════════════════════╝
```

**RJ-45 Connector Pin Configuration:**

```
    ┌─────────────────────┐
    │  8  7  6  5  4  3  2  1    Looking at connector
    │  │  │  │  │  │  │  │  │    (clip facing down)
    └──┴──┴──┴──┴──┴──┴──┴──┘

T568B Standard (Most Common):
┌────┬──────────────┬──────────────────────────────┐
│Pin │ Wire Color   │ Function (100BASE-TX)        │
├────┼──────────────┼──────────────────────────────┤
│ 1  │ White-Orange │ TX+ (Transmit Positive)      │
│ 2  │ Orange       │ TX- (Transmit Negative)      │
│ 3  │ White-Green  │ RX+ (Receive Positive)       │
│ 4  │ Blue         │ Not used (100BASE-TX)        │
│ 5  │ White-Blue   │ Not used (100BASE-TX)        │
│ 6  │ Green        │ RX- (Receive Negative)       │
│ 7  │ White-Brown  │ Not used (100BASE-TX)        │
│ 8  │ Brown        │ Not used (100BASE-TX)        │
└────┴──────────────┴──────────────────────────────┘

NOTE: For Gigabit Ethernet (1000BASE-T), ALL 8 pins are used
      for bidirectional transmission.
```

**How Twisted Pairs Maintain Signal Integrity:**

```
┌──────────────────────────────────────────────────────────┐
│  DIFFERENTIAL SIGNALING & NOISE CANCELLATION             │
│                                                          │
│  1. Twisting reduces crosstalk:                          │
│     Each twist ensures equal exposure to interference    │
│                                                          │
│     Pair 1 (Orange):  ╱╲╱╲╱╲╱╲╱╲╱╲╱╲  (3.5 twists/inch)│
│     Pair 2 (Green):   ╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲ (4 twists/inch)  │
│     Pair 3 (Blue):    ╱╲╱╲╱╲╱╲╱╲ (3 twists/inch)        │
│     Pair 4 (Brown):   ╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲ (4.5 twists/in)│
│                                                          │
│     Different twist rates prevent constructive           │
│     interference between pairs                           │
│                                                          │
│  2. Differential signaling uses pairs (TX+/TX-, RX+/RX-)│
│                                                          │
│     TX+ wire: ────▲────▲────▲────▲────▲──►             │
│                    ╲    ╲    ╲    ╲    ╲                │
│                     ╲    ╲    ╲    ╲    ╲               │
│                      ╲    ╲    ╲    ╲    ╲              │
│     TX- wire: ────────▼────▼────▼────▼────▼──►         │
│                                                          │
│  3. Noise cancellation:                                  │
│     • Receiver calculates: Signal = TX+ minus TX-       │
│     • External noise affects both wires equally         │
│     • Noise cancels out in subtraction!                 │
│                                                          │
│     Clean Signal = (TX+ + Noise) - (TX- + Noise)        │
│                  = TX+ - TX-                            │
│                                                          │
│  4. NOT frequency-based like wireless:                   │
│     • Uses baseband signaling (direct electrical pulses)│
│     • Manchester/MLT-3 encoding for transitions         │
│     • No carrier wave modulation                        │
└──────────────────────────────────────────────────────────┘
```


### C) Fiber Optic Cable

```
╔═══════════════════════════════════════════════════════════╗
║           FIBER OPTIC CABLE STRUCTURE                     ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║  Outer Jacket (PVC/Polyethylene)                          ║
║  ┌────────────────────────────────────────────────┐     ║
║  │ Kevlar Strength Member (Aramid fibers)         │     ║
║  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   │     ║
║  │   Buffer Coating (Protective layer)            │     ║
║  │   ┌──────────────────────────────────────┐     │     ║
║  │   │ Cladding (Lower refractive index)   │     │     ║
║  │   │ n = 1.46                             │     │     ║
║  │   │ ╔════════════════════════════════╗  │     │     ║
║  │   │ ║ Core (Higher refractive index)║  │     │     ║
║  │   │ ║ n = 1.48                       ║  │     │     ║
║  │   │ ║    ─ ─ ─ → Light Ray → ─ ─ ─ ║  │     │     ║
║  │   │ ║    (Total Internal Reflection)║  │     │     ║
║  │   │ ╚════════════════════════════════╝  │     │     ║
║  │   └──────────────────────────────────────┘     │     ║
║  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   │     ║
║  └────────────────────────────────────────────────┘     ║
╚═══════════════════════════════════════════════════════════╝
```

**Light Propagation - Total Internal Reflection (TIR):**

```
┌──────────────────────────────────────────────────────┐
│  TOTAL INTERNAL REFLECTION PRINCIPLE                 │
│                                                      │
│  Core (n = 1.48, Higher refractive index)           │
│  ══════════════════════════════════════             │
│  ║   ╲   ↓   ╱       ║   Light bounces              │
│  ║    ╲  ↓  ╱        ║   at core-cladding           │
│  ║     ╲ ↓ ╱         ║   boundary                   │
│  ║      ╲↓╱          ║                              │
│  ║       ↓           ║   Angle > Critical Angle     │
│  ══════════════════════════════════════             │
│  Cladding (n = 1.46, Lower refractive index)        │
│                                                      │
│  Critical Angle θc = arcsin(n₂/n₁)                  │
│                   = arcsin(1.46/1.48)               │
│                   ≈ 80.6°                           │
│                                                      │
│  If incident angle > 80.6°, light reflects 100%     │
│  If incident angle < 80.6°, light refracts out      │
└──────────────────────────────────────────────────────┘
```

**Types of Fiber Optic:**

**1. Single-Mode Fiber (SMF)**

```
╔═══════════════════════════════════════════════════╗
║  SINGLE-MODE FIBER (SMF)                          ║
╠═══════════════════════════════════════════════════╣
║                                                   ║
║  Core Diameter: 8-10 μm (very thin)              ║
║  ════════════════════════                        ║
║  ║    ────────→         ║  Single light path     ║
║  ════════════════════════  (One mode)            ║
║                                                   ║
║  Characteristics:                                 ║
║  • Long distances (40+ km without repeaters)     ║
║  • Very high bandwidth (Unlimited practically)    ║
║  • Laser light source (1310nm, 1550nm)           ║
║  • More expensive equipment                       ║
║  • No modal dispersion                            ║
║  • Lower attenuation (0.2-0.4 dB/km)             ║
║                                                   ║
║  Applications:                                    ║
║  • Long-haul telecommunications                   ║
║  • Backbone networks                              ║
║  • Undersea cables                                ║
║  • Metropolitan Area Networks (MANs)              ║
╚═══════════════════════════════════════════════════╝
```

**2. Multi-Mode Fiber (MMF)**

```
╔═══════════════════════════════════════════════════╗
║  MULTI-MODE FIBER (MMF)                           ║
╠═══════════════════════════════════════════════════╣
║                                                   ║
║  Core Diameter: 50-62.5 μm (thicker)             ║
║  ════════════════════════                        ║
║  ║   ╲  ↓  ╱           ║  Multiple light paths   ║
║  ║    ╲ ↓ ╱            ║  (Multiple modes)       ║
║  ║     ╲↓╱             ║                         ║
║  ════════════════════════                        ║
║                                                   ║
║  Characteristics:                                 ║
║  • Shorter distances (2 km maximum)              ║
║  • Lower bandwidth than SMF                       ║
║  • LED light source (850nm, 1300nm)              ║
║  • Lower cost equipment                           ║
║  • Modal dispersion occurs                        ║
║  • Higher attenuation (3 dB/km)                  ║
║                                                   ║
║  Modal Dispersion Problem:                        ║
║  Different light paths take different times       ║
║  to arrive → signal spreading → limit distance   ║
║                                                   ║
║  Applications:                                    ║
║  • Local Area Networks (LANs)                    ║
║  • Building-to-building connections              ║
║  • Data centers (short runs)                     ║
╚═══════════════════════════════════════════════════╝
```

**Fiber Optic Advantages:**

- ✅ Extremely high bandwidth (Terabits per second capable)
- ✅ Very long distances (100+ km without repeaters)
- ✅ Completely immune to EMI (uses light, not electricity)
- ✅ Highly secure (difficult to tap without detection)
- ✅ Lightweight and small diameter
- ✅ No electrical hazard
- ✅ Low signal attenuation

**Fiber Optic Disadvantages:**

- ❌ Expensive equipment and installation
- ❌ Fragile (glass fibers can break)
- ❌ Requires specialized skills for installation
- ❌ Difficult to splice and terminate
- ❌ Cannot carry electrical power (unlike copper)
- ❌ More complex maintenance

**Wavelengths and Windows:**

```
┌────────┬────────────┬─────────────┬──────────────────────┐
│ Window │ Wavelength │ Attenuation │ Primary Use          │
├────────┼────────────┼─────────────┼──────────────────────┤
│  1st   │ 850 nm     │ 3.0 dB/km   │ MMF, LAN             │
│  2nd   │ 1310 nm    │ 0.4 dB/km   │ SMF, Metro networks  │
│  3rd   │ 1550 nm    │ 0.2 dB/km   │ SMF, Long-haul       │
└────────┴────────────┴─────────────┴──────────────────────┘

Lower attenuation = Can go longer distances
1550nm window is preferred for undersea cables
```


### B) Microwaves

```
Frequency Range: 1 GHz - 300 GHz
Wavelength: 30 cm - 1 mm

    Antenna 1                               Antenna 2
    ┌──────┐                                 ┌──────┐
    │  │   │                                 │   │  │
    │  │)) │ ═══════════════════════════► │ ((│  │
    │  │   │    Directional Beam             │   │  │
    └──────┘                                 └──────┘
    
    Line-of-Sight Required
    Highly directional transmission

Characteristics:
┌────────────────────────────────────────────────────┐
│ • Requires line-of-sight between antennas          │
│ • Highly directional (focused beam)                │
│ • Cannot penetrate most obstacles                  │
│ • Affected by weather (rain fade)                  │
│ • High bandwidth capability                        │
│ • Point-to-point communication                     │
└────────────────────────────────────────────────────┘

Types:

1. TERRESTRIAL MICROWAVE (2-40 GHz)
   ┌───────────────────────────────────────────┐
   │ • Point-to-point communication            │
   │ • Relay towers every 25-50 km             │
   │ • Cell phone towers                       │
   │ • Building-to-building links              │
   │ • Typical range: 1-50 km per hop          │
   └───────────────────────────────────────────┘

2. SATELLITE MICROWAVE (1-40 GHz)
   Satellite Orbits:
   
   ┌─────────────────────────────────────────┐
   │  GEO (Geostationary Earth Orbit)        │
   │  • Altitude: 35,786 km                  │
   │  • Latency: 240ms (round trip)          │
   │  • Coverage: 1/3 of Earth               │
   │  • Examples: DirecTV, satellite internet│
   └─────────────────────────────────────────┘
   
   ┌─────────────────────────────────────────┐
   │  MEO (Medium Earth Orbit)               │
   │  • Altitude: 2,000-35,786 km            │
   │  • Latency: 50-150ms                    │
   │  • Examples: GPS, Galileo               │
   └─────────────────────────────────────────┘
   
   ┌─────────────────────────────────────────┐
   │  LEO (Low Earth Orbit)                  │
   │  • Altitude: 160-2,000 km               │
   │  • Latency: 20-40ms                     │
   │  • Examples: Starlink, OneWeb, Iridium  │
   │  • Requires constellation of satellites │
   └─────────────────────────────────────────┘

Applications:
• Cellular networks (4G, 5G)
• Satellite TV and internet
• GPS navigation
• Wireless backhaul
• Point-to-point links
```


## 1.3 Four Critical Factors for Transmission Media Selection

```
╔═══════════════════════════════════════════════════════════╗
║  FOUR FACTORS FOR CHOOSING TRANSMISSION MEDIA             ║
╠═══════════════════════════════════════════════════════════╣
║  1. Bandwidth (Data Capacity)                             ║
║  2. Radiation (Signal Leakage/Security)                   ║
║  3. Noise Absorption (Interference Susceptibility)        ║
║  4. Attenuation (Signal Loss Over Distance)               ║
╚═══════════════════════════════════════════════════════════╝
```

### Factor 1: Bandwidth (Data Capacity)

```
┌──────────────────────────────────────────────────────────┐
│  BANDWIDTH = Amount of data that can be transmitted      │
│                                                          │
│   Low Bandwidth                      High Bandwidth     │
│        │                                   │            │
│   ┌────▼────┐                         ┌────▼────┐      │
│   │ Twisted │                         │  Fiber  │      │
│   │  Pair   │ ◄──── Comparison ────► │  Optic  │      │
│   └─────────┘                         └─────────┘      │
│   100 Mbps -                          100 Gbps+        │
│   1 Gbps                                               │
└──────────────────────────────────────────────────────────┘

Bandwidth Comparison Table:
┌──────────────┬──────────────────┬───────────────────────┐
│   Medium     │   Bandwidth      │  Best For             │
├──────────────┼──────────────────┼───────────────────────┤
│ UTP Cat5e    │ 100 MHz (1Gbps)  │ Desktop connectivity  │
│ UTP Cat6     │ 250 MHz (10Gbps*)│ Office networks       │
│ UTP Cat6a    │ 500 MHz (10Gbps) │ Data centers          │
│ UTP Cat8     │ 2000 MHz (40Gbps)│ Server rooms          │
│ Coaxial RG-6 │ 1-2 GHz          │ Cable Internet/TV     │
│ Fiber SMF    │ Unlimited*       │ Backbone, WAN, Metro  │
│ Fiber MMF    │ Very High        │ Campus networks, LAN  │
│ WiFi 5 (ac)  │ 3.5 Gbps         │ Wireless LAN          │
│ WiFi 6 (ax)  │ 9.6 Gbps         │ High-density wireless │
│ 5G           │ 20 Gbps          │ Mobile networks       │
└──────────────┴──────────────────┴───────────────────────┘
* Practically limited by equipment, not cable
```


### Factor 3: Noise Absorption (Interference Susceptibility)

```
┌──────────────────────────────────────────────────────────┐
│  NOISE = Unwanted signals that corrupt data              │
│                                                          │
│   High Noise Absorption           Low Noise Absorption  │
│   (More Interference)             (Less Interference)   │
│        │                                   │            │
│   ┌────▼────┐                         ┌────▼────┐      │
│   │   UTP   │                         │  Fiber  │      │
│   │  Cable  │ ◄──── Comparison ────► │  Optic  │      │
│   └─────────┘                         └─────────┘      │
└──────────────────────────────────────────────────────────┘

Sources of Noise:
╔════════════════════════════════════════════════════╗
║ 1. ELECTROMAGNETIC INTERFERENCE (EMI)              ║
║    • From power lines, motors, transformers        ║
║    • Fluorescent lights, microwaves                ║
║    • Heavy machinery                               ║
║                                                    ║
║ 2. RADIO FREQUENCY INTERFERENCE (RFI)             ║
║    • From wireless devices, cell towers            ║
║    • AM/FM radio transmitters                      ║
║    • Other RF equipment                            ║
║                                                    ║
║ 3. CROSSTALK                                      ║
║    • Signal bleeding between adjacent wires        ║
║    • Common in poorly twisted cables               ║
║    • Worse at higher frequencies                   ║
║                                                    ║
║ 4. THERMAL NOISE (Johnson Noise)                  ║
║    • Random electron movement due to heat          ║
║    • Present in all conductors                     ║
║    • Increases with temperature                    ║
║                                                    ║
║ 5. IMPULSE NOISE                                  ║
║    • Sudden spikes (lightning, switching)          ║
║    • Can cause data corruption                     ║
╚════════════════════════════════════════════════════╝

Noise Susceptibility Table:
┌──────────────┬──────────────┬───────────────────────┐
│   Medium     │  Noise Level │  Environment Needed   │
├──────────────┼──────────────┼───────────────────────┤
│ UTP          │ High         │ Office (low EMI)      │
│ STP          │ Medium       │ Industrial areas      │
│ Coaxial      │ Low          │ Any environment       │
│ Fiber Optic  │ Immune       │ High EMI areas        │
│              │              │ (Best for factories)  │
│ Wireless     │ Very High    │ Clear spectrum needed │
└──────────────┴──────────────┴───────────────────────┘

Why Fiber is Immune to EMI:

Electrical Cable:              Fiber Optic Cable:
                              
    ╱╲  EMI                         EMI
   ╱  ╲  │                           │
  ╱    ╲ ▼                           ▼
 ────────────── ← Interferes    ═════════════
 Electrical                     Light signal
 Signal                         (Not affected by
                                electromagnetic
 ❌ Corrupted                   fields)
 Data                           
                                ✅ Clean Signal
```


### Comprehensive Comparison Matrix

```
┌──────────┬───────────┬───────────┬──────────┬────────────┬──────────┐
│  Medium  │ Bandwidth │ Radiation │  Noise   │Attenuation │  Score   │
│          │(Higher=✓) │(Lower=✓)  │(Lower=✓) │ (Lower=✓)  │          │
├──────────┼───────────┼───────────┼──────────┼────────────┼──────────┤
│ UTP      │    ⭐⭐    │    ⭐⭐    │   ⭐⭐    │    ⭐⭐     │   8/20   │
│ STP      │    ⭐⭐⭐  │   ⭐⭐⭐   │   ⭐⭐⭐   │    ⭐⭐     │   11/20  │
│ Coaxial  │   ⭐⭐⭐   │   ⭐⭐⭐⭐  │   ⭐⭐⭐⭐  │   ⭐⭐⭐    │   14/20  │
│ Fiber    │  ⭐⭐⭐⭐⭐ │  ⭐⭐⭐⭐⭐ │  ⭐⭐⭐⭐⭐ │  ⭐⭐⭐⭐⭐  │   20/20  │
│ Wireless │   ⭐⭐⭐   │    ⭐     │   ⭐     │    ⭐      │   6/20   │
└──────────┴───────────┴───────────┴──────────┴────────────┴──────────┘

Summary:
┌────────────────────────────────────────────────────────┐
│ Best Overall Performance: Fiber Optic Cable            │
│ Best Cost/Performance: Cat6a UTP                       │
│ Best Flexibility/Mobility: Wireless                    │
│ Best for Long Distance: Single-Mode Fiber              │
│ Best for Short Distance & Cost: Cat5e/Cat6 UTP         │
└────────────────────────────────────────────────────────┘
```


## 2.2 Line Coding Schemes

**Line Coding** converts digital data (bits) into digital signals (electrical pulses) for transmission.

```mermaid
flowchart TB
    A[Line Coding Methods] --> B[Unipolar]
    A --> C[Polar]
    A --> D[Bipolar]

    %% Polar (Most Common)
    C --> C1[NRZ-L: Non-Return to Zero Level]
    C --> C2[NRZ-I: Non-Return to Zero Inverted]
    C --> C3[RZ: Return to Zero]
    C --> C4[Manchester: Used in Ethernet]
    C --> C5[Differential Manchester]

    %% Bipolar
    D --> D1[AMI: Alternate Mark Inversion]
    D --> D2[Pseudoternary]
```


### A) Unipolar Encoding (Simple, Rarely Used)

```
╔═══════════════════════════════════════════════════════════╗
║              UNIPOLAR ENCODING                            ║
║              Bit Sequence: 01001110                       ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║ Data Bits:  0   1   0   0   1   1   1   0               ║
║             │   │   │   │   │   │   │   │               ║
║        +V   │   ┌───┐   │   ┌───┬───┬───┐   │           ║
║  Voltage    │   │   │   │   │   │   │   │   │           ║
║          0V ┴───┘   └───┴───┘   │   │   │   └───        ║
║             │   │   │   │   │   │   │   │   │           ║
║          Time ───────────────────────────────►           ║
║                                                           ║
║  Encoding Rule:                                           ║
║  • Bit 0 = 0 volts (no signal)                           ║
║  • Bit 1 = +V volts (positive voltage)                   ║
║                                                           ║
║  Advantages:                                              ║
║  ✅ Simple to implement                                   ║
║  ✅ Requires only one voltage level                       ║
║                                                           ║
║  Disadvantages:                                           ║
║  ❌ DC component (average voltage ≠ 0)                   ║
║  ❌ No synchronization for long runs of 0s               ║
║  ❌ No error detection capability                         ║
║  ❌ Baseline wander issues                                ║
║                                                           ║
║  Usage: Rarely used (obsolete)                            ║
╚═══════════════════════════════════════════════════════════╝
```


### C) Non-Return to Zero - Inverted (NRZ-I)

```
╔═══════════════════════════════════════════════════════════╗
║       NRZ-I (NON-RETURN TO ZERO - INVERTED)               ║
║              Bit Sequence: 01001110                       ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║ Data Bits:  0   1   0   0   1   1   1   0               ║
║             │   │   │   │   │   │   │   │               ║
║        +V   ┌───┐   │   │   └───┐   └───┐   │           ║
║  Voltage    │   │   │   │   │   │   │   │   │           ║
║        -V   │   └───┴───┴───┘   └───┘   └───┴───        ║
║             │   ▲   ▲   ▲   ▲   ▲   ▲   ▲   ▲           ║
║          Time ───│───│───│───│───│───│───│───►           ║
║                 No  Yes No  No  Yes Yes Yes No           ║
║              Transition on 1, No transition on 0         ║
║                                                           ║
║  Encoding Rule:                                           ║
║  • Bit 1 = Transition (invert signal level)              ║
║  • Bit 0 = No transition (maintain signal level)         ║
║  • Start: Assume signal begins at +V                     ║
║                                                           ║
║  Step-by-step for 01001110:                              ║
║  Bit 0: No transition → stays +V                         ║
║  Bit 1: Transition → inverts to -V                       ║
║  Bit 0: No transition → stays -V                         ║
║  Bit 0: No transition → stays -V                         ║
║  Bit 1: Transition → inverts to +V                       ║
║  Bit 1: Transition → inverts to -V                       ║
║  Bit 1: Transition → inverts to +V                       ║
║  Bit 0: No transition → stays +V                         ║
║                                                           ║
║  Advantages:                                              ║
║  ✅ Better synchronization than NRZ-L                     ║
║  ✅ String of 1s provides clock sync                      ║
║  ✅ Polarity independent (can reverse +/-V)              ║
║                                                           ║
║  Disadvantages:                                           ║
║  ❌ Long runs of 0s still problematic                     ║
║  ❌ No sync on consecutive 0s                             ║
║                                                           ║
║  Usage: USB, SATA, some magnetic storage                  ║
╚═══════════════════════════════════════════════════════════╝
```


### E) Differential Manchester Encoding

```
╔═══════════════════════════════════════════════════════════╗
║         DIFFERENTIAL MANCHESTER ENCODING                  ║
║              Bit Sequence: 01001110                       ║
║              (Used in Token Ring)                         ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║ Data Bits:  0     1     0     0     1     1     1     0  ║
║             │     │     │     │     │     │     │     │  ║
║        +V   ┤  ╱──┤──╲╱─┤  ╱──┤  ╱──┤──╲╱─┤──╲╱─┤──╲╱─┤  ╱──┤  ║
║  Voltage    │ ╱   │    │ ╱   │ ╱   │    │    │    │ ╱   │  ║
║        -V   │╱    │    │╱    │╱    │    │    │    │╱    │  ║
║             │     │     │     │     │     │     │     │  ║
║             ├─────┼─────┼─────┼─────┼─────┼─────┼─────┤  ║
║             ▲     ▲     ▲     ▲     │     │     │     ▲  ║
║          Start  No    Start Start  No    No    No   Start║
║          Trans  Start Trans Trans  Start Start Start Trans║
║                                                           ║
║  Encoding Rule:                                           ║
║  • ALWAYS transition at bit center (for clocking)        ║
║  • Bit 0 = Transition at START of bit period             ║
║  • Bit 1 = NO transition at START of bit period          ║
║                                                           ║
║  Two types of transitions:                                ║
║  1. Start-of-bit transition (data dependent)             ║
║  2. Mid-bit transition (always present)                  ║
║                                                           ║
║  Detailed Breakdown for 01001110:                         ║
║                                                           ║
║  Bit 0: Transition at start + transition at middle       ║
║        │▁▔│▔▁│  (0 = start transition)                  ║
║                                                           ║
║  Bit 1: NO transition at start, transition at middle     ║
║        │▔▔│▁▁│  (1 = no start transition)               ║
║                                                           ║
║  Bit 0: Transition at start + transition at middle       ║
║        │▁▔│▔▁│  (0 = start transition)                  ║
║                                                           ║
║  Bit 0: Transition at start + transition at middle       ║
║        │▁▔│▔▁│  (0 = start transition)                  ║
║                                                           ║
║  Bit 1: NO transition at start, transition at middle     ║
║        │▔▔│▁▁│  (1 = no start transition)               ║
║                                                           ║
║  Bit 1: NO transition at start, transition at middle     ║
║        │▔▔│▁▁│  (1 = no start transition)               ║
║                                                           ║
║  Bit 1: NO transition at start, transition at middle     ║
║        │▔▔│▁▁│  (1 = no start transition)               ║
║                                                           ║
║  Bit 0: Transition at start + transition at middle       ║
║        │▁▔│▔▁│  (0 = start transition)                  ║
║                                                           ║
║  Advantages:                                              ║
║  ✅ Self-clocking (like Manchester)                       ║
║  ✅ Better noise immunity                                 ║
║  ✅ Polarity independent (immune to wire reversal)       ║
║  ✅ More robust than Manchester                           ║
║                                                           ║
║  Disadvantages:                                           ║
║  ❌ Requires double bandwidth                             ║
║  ❌ More complex to decode                                ║
║                                                           ║
║  Usage:                                                   ║
║  • Token Ring networks (IEEE 802.5)                      ║
║  • Some industrial control systems                        ║
╚═══════════════════════════════════════════════════════════╝
```


### G) Alternate Mark Inversion (AMI) - Bipolar

```
╔═══════════════════════════════════════════════════════════╗
║        AMI (ALTERNATE MARK INVERSION) - BIPOLAR           ║
║              Bit Sequence: 01001110                       ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║ Data Bits:  0     1     0     0     1     1     1     0  ║
║             │     │     │     │     │     │     │     │  ║
║        +V   │     ┌─┐   │     │     │     ┌─┐   │     │  ║
║  Voltage    │     │ │   │     │     │     │ │   │     │  ║
║          0V ┴─────┘ └───┴─────┴─────┐ ┌───┘ └───┐ ┌───┴─ ║
║             │     │     │     │     │ │   │     │ │   │  ║
║        -V   │     │     │     │     └─┘   │     └─┘   │  ║
║             │     │     │     │     │     │     │     │  ║
║          Time ───────────────────────────────────────────►  ║
║             │     ▲     │     │     ▼     ▲     ▼     │  ║
║             │    +V     │     │    -V    +V    -V     │  ║
║                                                           ║
║  Encoding Rule:                                           ║
║  • Bit 0 = Always 0V (no pulse)                          ║
║  • Bit 1 = Alternates between +V and -V                  ║
║  • "Mark" = 1, "Space" = 0                               ║
║  • Each successive 1 has OPPOSITE polarity               ║
║                                                           ║
║  Detailed Breakdown for 01001110:                         ║
║                                                           ║
║  Bit 0: │  0V  │  No pulse                               ║
║  Bit 1: │  +V  │  First 1, use +V                        ║
║  Bit 0: │  0V  │  No pulse                               ║
║  Bit 0: │  0V  │  No pulse                               ║
║  Bit 1: │  -V  │  Second 1, alternate to -V              ║
║  Bit 1: │  +V  │  Third 1, alternate to +V               ║
║  Bit 1: │  -V  │  Fourth 1, alternate to -V              ║
║  Bit 0: │  0V  │  No pulse                               ║
║                                                           ║
║  Advantages:                                              ║
║  ✅ No DC component (equal +V and -V)                    ║
║  ✅ Error detection: two consecutive same-polarity 1s    ║
║  ✅ Simple implementation                                 ║
║  ✅ Good for long-distance transmission                   ║
║                                                           ║
║  Disadvantages:                                           ║
║  ❌ Long strings of 0s lose synchronization              ║
║  ❌ Requires three voltage levels                         ║
║                                                           ║
║  Usage:                                                   ║
║  • T1/E1 carrier systems                                 ║
║  • ISDN                                                   ║
╚═══════════════════════════════════════════════════════════╝
```


### I) MLT-3 (Multi-Level Transmit)

```
╔═══════════════════════════════════════════════════════════╗
║         MLT-3 (MULTI-LEVEL TRANSMIT - 3 LEVELS)           ║
║              Bit Sequence: 01001110                       ║
║              (Used in Fast Ethernet & Gigabit Ethernet)   ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║ Data Bits:  0     1     0     0     1     1     1     0  ║
║             │     │     │     │     │     │     │     │  ║
║        +V   │     ╱╲    │     │     ╱╲    │     ╱╲    │  ║
║  Voltage    │    ╱  ╲   │     │    ╱  ╲   │    ╱  ╲   │  ║
║          0V ┴───╱    ╲──┴─────┴───╱    ╲──┴───╱    ╲──┴─ ║
║             │  ╱      ╲ │     │  ╱      ╲ │  ╱      ╲ │  ║
║        -V   │ ╱        ╲│     │ ╱        ╲│ ╱        ╲│  ║
║             │           │     │           │           │  ║
║          Time ───────────────────────────────────────────►  ║
║             │    ▲  ▲   │     │   ▲  ▲   │   ▲  ▲   │  ║
║                                                           ║
║  Encoding Rule (Cycle: 0→+V→0→-V→0):                     ║
║  • Bit 0 = No change in signal level                     ║
║  • Bit 1 = Move to NEXT level in sequence                ║
║  • Levels cycle: 0V → +V → 0V → -V → 0V → ...           ║
║                                                           ║
║  Detailed Breakdown for 01001110:                         ║
║  Start at 0V                                              ║
║                                                           ║
║  Bit 0: No transition, stay at 0V                        ║
║  Bit 1: Transition to next level → +V                    ║
║  Bit 0: No transition, stay at +V                        ║
║  Bit 0: No transition, stay at +V                        ║
║  Bit 1: Transition to next level → 0V (going down)      ║
║  Bit 1: Transition to next level → -V                    ║
║  Bit 1: Transition to next level → 0V (going up)        ║
║  Bit 0: No transition, stay at 0V                        ║
║                                                           ║
║  Level Progression:                                       ║
║  0V → 0V → +V → +V → +V → 0V → -V → 0V → 0V             ║
║   0    1    0    0    1    1    1    0                   ║
║                                                           ║
║  Advantages:                                              ║
║  ✅ Lower frequency spectrum (less EMI radiation)        ║
║  ✅ One-third the bandwidth of Manchester                ║
║  ✅ Reduces crosstalk in cables                          ║
║  ✅ FCC emissions compliance                              ║
║                                                           ║
║  Disadvantages:                                           ║
║  ❌ More complex circuitry                                ║
║  ❌ Long runs of 0s lose sync (solved with 4B/5B)       ║
║                                                           ║
║  Usage:                                                   ║
║  • 100BASE-TX (with 4B/5B encoding first)                ║
║  • FDDI                                                   ║
║                                                           ║
║  Complete 100BASE-TX Encoding:                            ║
║  Data → 4B/5B → Scramble → MLT-3 → UTP Cable             ║
╚═══════════════════════════════════════════════════════════╝
```


### B) Frequency Shift Keying (FSK)

```
╔═══════════════════════════════════════════════════════════╗
║     FREQUENCY SHIFT KEYING (FSK)                          ║
║              Bit Sequence: 01001110                       ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║ Data Bits:  0     1     0     0     1     1     1     0  ║
║             │     │     │     │     │     │     │     │  ║
║             │∿∿∿∿∿∿∿∿∿∿│∿∿∿∿∿│∿∿∿∿∿│∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿│∿∿∿∿∿│  ║
║  High freq  │           │     │     │                 │     │  ║
║  (bit=1)    │           │     │     │                 │     │  ║
║             ∿           ∿     ∿     ∿                 ∿     ∿  ║
║   Low freq  ∿           ∿     ∿     ∿                 ∿     ∿  ║
║  (bit=0)    ∿           ∿     ∿     ∿                 ∿     ∿  ║
║          Time ───────────────────────────────────────────►  ║
║                                                           ║
║  f₀ = low frequency (e.g., 1200 Hz) for bit 0            ║
║  f₁ = high frequency (e.g., 2200 Hz) for bit 1           ║
║                                                           ║
║  Encoding Rule:                                           ║
║  • Bit 0 = Lower frequency carrier (f₀)                  ║
║  • Bit 1 = Higher frequency carrier (f₁)                 ║
║  • Amplitude remains constant                             ║
║                                                           ║
║  Advantages:                                              ║
║  ✅ More noise resistant than ASK                         ║
║  ✅ Constant amplitude easier to detect                   ║
║  ✅ Good for telephone lines                              ║
║                                                           ║
║  Disadvantages:                                           ║
║  ❌ Requires more bandwidth than ASK                      ║
║  ❌ More complex demodulation                             ║
║                                                           ║
║  Usage:                                                   ║
║  • Older modems (300-1200 baud)                          ║
║  • Caller ID signaling                                    ║
║  • Ham radio                                              ║
╚═══════════════════════════════════════════════════════════╝
```


### D) Quadrature Amplitude Modulation (QAM)

```
╔═══════════════════════════════════════════════════════════╗
║  QAM (QUADRATURE AMPLITUDE MODULATION)                    ║
║  Combines BOTH Amplitude and Phase modulation             ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║  QAM-16 Constellation Diagram (16 possible states):       ║
║                                                           ║
║         Amplitude                                         ║
║            ▲                                              ║
║            │                                              ║
║      3A    │   •       •       •       •                 ║
║            │                                              ║
║      2A    │   •       •       •       •                 ║
║            │                                              ║
║       A    │   •       •       •       •                 ║
║            │                                              ║
║            │   •       •       •       •                 ║
║            ├───────────────────────────────► Phase       ║
║           0°     45°     90°    135°   180°              ║
║                                                           ║
║  Each dot represents a unique combination of:             ║
║  • Amplitude (vertical position)                          ║
║  • Phase (horizontal position)                            ║
║                                                           ║
║  QAM-16: 16 states = 4 bits per symbol (2⁴ = 16)        ║
║  QAM-64: 64 states = 6 bits per symbol (2⁶ = 64)        ║
║  QAM-256: 256 states = 8 bits per symbol (2⁸ = 256)     ║
║                                                           ║
║  Advantages:                                              ║
║  ✅ Very high data rates                                  ║
║  ✅ Efficient use of bandwidth                            ║
║  ✅ Multiple bits per symbol                              ║
║                                                           ║
║  Disadvantages:                                           ║
║  ❌ Susceptible to noise (many states close together)    ║
║  ❌ Requires high signal-to-noise ratio                   ║
║  ❌ Complex implementation                                ║
║                                                           ║
║  Usage:                                                   ║
║  • Cable modems (DOCSIS)                                 ║
║  • DSL (ADSL, VDSL)                                      ║
║  • WiFi 6 (802.11ax) - up to 1024-QAM                    ║
║  • Digital TV (DVB, ATSC)                                ║
║  • LTE/5G (up to 256-QAM)                                ║
╚═══════════════════════════════════════════════════════════╝
```


# 3. Multiplexing Techniques {#3-multiplexing-techniques}

**Multiplexing** allows multiple signals to share a single communication medium efficiently.

```
╔═══════════════════════════════════════════════════════════╗
║                  MULTIPLEXING (MUX)                       ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║  Multiple Input Signals → Single Medium → Multiple Output║
║                                                           ║
║   Signal 1 ─┐                              ┌─ Signal 1  ║
║   Signal 2 ─┤                              ├─ Signal 2  ║
║   Signal 3 ─┼─► MUX ─► Medium ─► DEMUX ─►├─ Signal 3  ║
║   Signal 4 ─┤                              ├─ Signal 4  ║
║   Signal 5 ─┘                              └─ Signal 5  ║
║                                                           ║
║  Benefits:                                                ║
║  • Efficient use of expensive transmission medium        ║
║  • Reduces number of physical links needed               ║
║  • Cost-effective for long-distance communication        ║
╚═══════════════════════════════════════════════════════════╝
```

## 3.1 Frequency Division Multiplexing (FDM)

```
┌────────────────────────────────────────────────────────┐
│         FREQUENCY DIVISION MULTIPLEXING (FDM)          │
│         (Analog Technique)                             │
│                                                        │
│  Frequency                                             │
│    ▲                                                   │
│    │   ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐       │
│    │   │Signal│  │Signal│  │Signal│  │Signal│       │
│    │   │  1   │  │  2   │  │  3   │  │  4   │       │
│    │   │ f1-f2│  │ f3-f4│  │ f5-f6│  │ f7-f8│       │
│    │   └──────┘  └──────┘  └──────┘  └──────┘       │
│    │      ▲         ▲         ▲         ▲            │
│    │   Guard     Guard     Guard     Guard           │
│    │   Band      Band      Band      Band            │
│    └────────────────────────────────────────► Time    │
│                                                        │
│  Each signal occupies different frequency band         │
│  Guard bands prevent interference between channels     │
│                                                        │
│  Example: Cable TV                                     │
│   ┌───┐ gap ┌───┐ gap ┌───┐ gap ┌───┐               │
│   │Ch2│     │Ch3│     │Ch4│     │Ch5│               │
│   │54-│     │60-│     │66-│     │76-│               │
│   │60 │     │66 │     │72 │     │82 │               │
│   │MHz│     │MHz│     │MHz│     │MHz│               │
│   └───┘     └───┘     └───┘     └───┘               │
└────────────────────────────────────────────────────────┘

Applications:
┌──────────────────────────────────────────────────┐
│ • Cable TV (each channel = different frequency)  │
│ • FM Radio Broadcasting (88-108 MHz)            │
│ • First-generation analog cellular (AMPS)        │
│ • Analog telephone trunk lines                   │
│ • Traditional radio broadcasting                 │
└──────────────────────────────────────────────────┘

Advantages:
✅ All channels transmitted simultaneously
✅ No processing delay
✅ Works well for analog signals

Disadvantages:
❌ Wastes bandwidth with guard bands
❌ All channels must be active
❌ Requires analog circuitry
```


## 3.3 Wavelength Division Multiplexing (WDM)

```
┌────────────────────────────────────────────────────────┐
│    WAVELENGTH DIVISION MULTIPLEXING (WDM)              │
│        (Optical Fiber Networks)                        │
│                                                        │
│                  ┌─────────────┐                       │
│  λ1 (1310nm) ───┤             ├─── λ1                 │
│  λ2 (1330nm) ───┤   OPTICAL   ├─── λ2                 │
│  λ3 (1350nm) ───┤   PRISM     ├─── λ3                 │
│  λ4 (1370nm) ───┤   (MUX)     ├─── λ4                 │
│                  └──────┬──────┘                       │
│                         │                              │
│                   Single Fiber                         │
│                   (Carries multiple                    │
│                    wavelengths/colors)                 │
│                         │                              │
│                  ┌──────┴──────┐                       │
│            ┌────┤   OPTICAL   ├────┐                  │
│            │    │   PRISM     │    │                  │
│            │    │  (DEMUX)    │    │                  │
│            ▼    └─────────────┘    ▼                  │
│          λ1, λ2, λ3, λ4...                            │
└────────────────────────────────────────────────────────┘

How It Works:
┌────────────────────────────────────────────────────┐
│ 1. Each input uses different wavelength of light   │
│    (λ = lambda, represents different colors)       │
│                                                    │
│ 2. Optical multiplexer (prism) combines all        │
│    wavelengths onto single fiber                   │
│                                                    │
│ 3. All wavelengths travel simultaneously           │
│    without interfering (different colors)          │
│                                                    │
│ 4. Optical demultiplexer separates wavelengths     │
│    at receiving end                                │
└────────────────────────────────────────────────────┘

Visual Representation:
     Laser 1 (Red - 1310nm)      ─┐
     Laser 2 (Orange - 1330nm)   ─┤
     Laser 3 (Yellow - 1350nm)   ─┼─► Prism ═══► Fiber
     Laser 4 (Green - 1370nm)    ─┤          (Rainbow)
     Laser 5 (Blue - 1390nm)     ─┘

Types of WDM:

1. CWDM (Coarse Wavelength Division Multiplexing)
   ┌──────────────────────────────────────┐
   │ • 8-18 channels                      │
   │ • 20nm spacing between wavelengths   │
   │ • Less expensive                     │
   │ • Shorter distances (60-80 km)       │
   │ • Typical: 1270-1610 nm range        │
   └──────────────────────────────────────┘

2. DWDM (Dense Wavelength Division Multiplexing)
   ┌──────────────────────────────────────┐
   │ • 40-160+ channels                   │
   │ • 0.8nm (or 100 GHz) spacing         │
   │ • Very expensive                     │
   │ • Long distances (100+ km)           │
   │ • Can reach 160 channels = 16 Tbps!  │
   │ • Typical: 1530-1565 nm (C-band)     │
   └──────────────────────────────────────┘

Capacity Example:
┌─────────────────────────────────────────────┐
│ 80 channels × 100 Gbps per channel          │
│ = 8 Terabits per second on single fiber!   │
│                                             │
│ Compare to:                                 │
│ • Cat6: 10 Gbps                            │
│ • Single wavelength fiber: 100 Gbps        │
│ • WDM fiber: 8000 Gbps (8 Tbps)            │
└─────────────────────────────────────────────┘

Applications:
• Long-haul telecommunications
• Submarine cables
• Metropolitan area networks
• Data center interconnects
• Backbone networks
```


# 4. Cables, Ports & Electronics {#4-cables-ports--electronics}

## 4.1 Detailed UTP Cable Structure

```
╔═══════════════════════════════════════════════════════════╗
║              UTP CABLE DETAILED ANATOMY                   ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║  PVC Outer Jacket (Protection from physical damage)       ║
║  ┌───────────────────────────────────────────────────┐   ║
║  │                                                   │   ║
║  │  Rip Cord (for easy jacket removal)              │   ║
║  │  ─────────────────────────────────────────        │   ║
║  │                                                   │   ║
║  │  Pair 1: Orange/White-Orange (Transmit+/-)       │   ║
║  │  ╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲  (3.5 twists/inch)  │   ║
║  │  ╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱                      │   ║
║  │                                                   │   ║
║  │  Pair 2: Green/White-Green (Receive+/-)          │   ║
║  │  ╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲  (4 twists/inch)        │   ║
║  │  ╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱                          │   ║
║  │                                                   │   ║
║  │  Pair 3: Blue/White-Blue (PoE/Gigabit)           │   ║
║  │  ╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲  (3 twists/inch)            │   ║
║  │  ╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱                              │   ║
║  │                                                   │   ║
║  │  Pair 4: Brown/White-Brown (PoE/Gigabit)         │   ║
║  │  ╱╲╱╲╱╲╱╲╱╲╱╲╱╲  (4.5 twists/inch)            │   ║
║  │  ╲╱╲╱╲╱╲╱╲╱╲╱╲╱                                │   ║
║  │                                                   │   ║
║  │  Cat6 Addition: Central plastic separator         │   ║
║  │  (keeps pairs physically separated)               │   ║
║  └───────────────────────────────────────────────────┘   ║
║                                                           ║
║  Why different twist rates?                                ║
║  • Minimizes crosstalk between pairs                      ║
║  • Prevents constructive interference                     ║
║  • Each pair has unique electrical characteristic         ║
╚═══════════════════════════════════════════════════════════╝
```


## 4.3 Common Network Ports and Connectors

```
╔═══════════════════════════════════════════════════════════╗
║                   NETWORK CONNECTORS                      ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║ 1. RJ-45 (8P8C - 8 Position 8 Contact)                   ║
║    ┌───────────────┐                                     ║
║    │8 7 6 5 4 3 2 1│  Most common for Ethernet           ║
║    └───────────────┘                                     ║
║    • Cat5e/Cat6/Cat6a cables                             ║
║    • Gigabit Ethernet                                     ║
║    • PoE (Power over Ethernet)                           ║
║                                                           ║
║ 2. RJ-11 (6P4C - 6 Position 4 Contact)                   ║
║    ┌─────────┐                                           ║
║    │6 5 4 3 2 1│  Telephone/DSL                          ║
║    └─────────┘                                           ║
║    • Telephone lines                                      ║
║    • DSL modems                                           ║
║    • Smaller than RJ-45                                   ║
║                                                           ║
║ 3. Fiber Optic Connectors                                ║
║                                                           ║
║    SC (Subscriber Connector):                             ║
║    ┌─┐ ┌─┐                                               ║
║    │○│ │○│  Square shape, push-pull                     ║
║    └─┘ └─┘  Common in telecom                            ║
║                                                           ║
║    LC (Lucent Connector):                                 ║
║    ┌┐┌┐                                                  ║
║    ││││  Small, similar to RJ-45 size                    ║
║    └┘└┘  Used in SFP/SFP+ modules                        ║
║                                                           ║
║    ST (Straight Tip):                                     ║
║    ╔═╗                                                    ║
║    ║○║  Bayonet twist-lock mechanism                     ║
║    ╚═╝  Older standard, still used                        ║
║                                                           ║
║    MTP/MPO (Multi-fiber Push On):                        ║
║    ┌────────┐                                            ║
║    │12-fiber│  12 or 24 fibers in one connector         ║
║    └────────┘  Used in data centers                      ║
║                                                           ║
║ 4. SFP/SFP+ (Small Form-factor Pluggable)                ║
║    ┌──────────────┐                                      ║
║    │ ┌──────────┐ │  Hot-swappable transceiver           ║
║    │ │Fiber/    │ │                                      ║
║    │ │Copper    │ │  • SFP: 1 Gbps                       ║
║    │ └──────────┘ │  • SFP+: 10 Gbps                     ║
║    └──────────────┘  • SFP28: 25 Gbps                    ║
║                                                           ║
║ 5. QSFP (Quad SFP)                                       ║
║    ┌──────────────────┐                                  ║
║    │ ┌──────────────┐ │  4× the bandwidth                ║
║    │ │   Quad SFP   │ │                                  ║
║    │ └──────────────┘ │  • QSFP+: 40 Gbps                ║
║    └──────────────────┘  • QSFP28: 100 Gbps              ║
║                          • QSFP56: 200 Gbps              ║
╚═══════════════════════════════════════════════════════════╝
```


# 5. Complete System Integration {#5-complete-system-integration}

## 5.1 End-to-End Data Flow Example

### User Requests www.example.com

```
╔═══════════════════════════════════════════════════════════════════╗
║         COMPLETE NETWORK TRANSACTION                              ║
║         Following OSI Model Layers                                ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║ ┌─────────────────────────────────────────────────────────────┐  ║
║ │ LAYER 7: APPLICATION (HTTP)                                  │  ║
║ ├─────────────────────────────────────────────────────────────┤  ║
║ │ User types: www.example.com in browser                       │  ║
║ │ Browser generates HTTP GET request:                          │  ║
║ │                                                              │  ║
║ │   GET / HTTP/1.1                                            │  ║
║ │   Host: www.example.com                                      │  ║
║ │   User-Agent: Mozilla/5.0...                                │  ║
║ │   Accept: text/html                                          │  ║
║ └─────────────────────────────────────────────────────────────┘  ║
║                          ↓                                        ║
║ ┌─────────────────────────────────────────────────────────────┐  ║
║ │ LAYER 4: TRANSPORT (TCP)                                     │  ║
║ ├─────────────────────────────────────────────────────────────┤  ║
║ │ TCP Header Added:                                            │  ║
║ │ • Source Port: 49152 (ephemeral)                            │  ║
║ │ • Destination Port: 80 (HTTP)                                │  ║
║ │ • Sequence Number: 1000                                      │  ║
║ │ • Acknowledgment: 0                                          │  ║
║ │ • Flags: SYN (3-way handshake starts)                       │  ║
║ │ • Window Size: 65535                                         │  ║
║ │ • Checksum: 0xAB12                                           │  ║
║ │                                                              │  ║
║ │ Segment = [TCP Header] + [HTTP Request]                     │  ║
║ └─────────────────────────────────────────────────────────────┘  ║
║                          ↓                                        ║
║ ┌─────────────────────────────────────────────────────────────┐  ║
║ │ LAYER 3: NETWORK (IP)                                        │  ║
║ ├─────────────────────────────────────────────────────────────┤  ║
║ │ IP Header Added:                                             │  ║
║ │ • Version: 4 (IPv4)                                          │  ║
║ │ • Source IP: 192.168.1.100                                   │  ║
║ │ • Destination IP: 93.184.216.34                             │  ║
║ │ • TTL: 64 hops                                               │  ║
║ │ • Protocol: 6 (TCP)                                          │  ║
║ │ • Header Checksum: 0x1234                                    │  ║
║ │                                                              │  ║
║ │ Router consulted for next hop                                │  ║
║ │ Packet = [IP Header] + [TCP Segment] + [Data]               │  ║
║ └─────────────────────────────────────────────────────────────┘  ║
║                          ↓                                        ║
║ ┌─────────────────────────────────────────────────────────────┐  ║
║ │ LAYER 2: DATA LINK (Ethernet)                                │  ║
║ ├─────────────────────────────────────────────────────────────┤  ║
║ │ Ethernet Frame Created:                                      │  ║
║ │                                                              │  ║
║ │ ┌──────────┬──────────┬──────┬─────────┬─────┬─────────┐   │  ║
║ │ │Preamble  │Dest MAC  │Source│EtherType│ IP  │   FCS   │   │  ║
║ │ │ 7 bytes  │ 6 bytes  │ MAC  │ 2 bytes │Packet│ 4 bytes │   │  ║
║ │ │          │          │6 bytes│         │     │         │   │  ║
║ │ └──────────┴──────────┴──────┴─────────┴─────┴─────────┘   │  ║
║ │                                                              │  ║
║ │ • Dest MAC: AA:BB:CC:DD:EE:FF (default gateway/router)      │  ║
║ │ • Source MAC: 11:22:33:44:55:66 (PC's NIC)                  │  ║
║ │ • EtherType: 0x0800 (IPv4)                                   │  ║
║ │ • FCS: CRC-32 checksum for error detection                  │  ║
║ │                                                              │  ║
║ │ Switch examines MAC, forwards to correct port                │  ║
║ └─────────────────────────────────────────────────────────────┘  ║
║                          ↓                                        ║
║ ┌─────────────────────────────────────────────────────────────┐  ║
║ │ LAYER 1: PHYSICAL                                            │  ║
║ ├─────────────────────────────────────────────────────────────┤  ║
║ │ Encoding: Manchester (Ethernet 10BASE-T)                     │  ║
║ │       or MLT-3 (Fast Ethernet 100BASE-TX)                    │  ║
║ │ Medium: Cat6 UTP cable                                       │  ║
║ │ Speed: 1 Gbps (1000BASE-T)                                   │  ║
║ │                                                              │  ║
║ │ Frame converted to bit stream:                               │  ║
║ │ 10101100010011110110...                                      │  ║
║ │                                                              │  ║
║ │ Electrical signals on wire pairs:                            │  ║
║ │ TX+: ▀▄▀▄▀▀▄▄▀▄▀▀▄▄▀▄▀▄▀▄▀▄                                │  ║
║ │ TX-: ▄▀▄▀▄▄▀▀▄▀▄▄▀▀▄▀▄▀▄▀▄▀ (inverted)                      │  ║
║ └─────────────────────────────────────────────────────────────┘  ║
║                                                                   ║
║ ══════════════════════════════════════════════════════════════║
║                      PHYSICAL PATH                                ║
║ ══════════════════════════════════════════════════════════════║
║                                                                   ║
║  [PC] ──Cat6 100m──► [Switch] ──Fiber 2km──► [Router]            ║
║   NIC     Port 12        Port 24               WAN                ║
║                                                                   ║
║  Switch Operation:                                                 ║
║  1. Receives frame on Port 12                                     ║
║  2. Checks destination MAC in CAM table                           ║
║  3. Finds MAC on Port 24 (uplink to router)                       ║
║  4. Forwards frame to Port 24                                     ║
║  5. Full-duplex, no collisions                                    ║
║                                                                   ║
║  Router Operation:                                                 ║
║  1. Receives frame, strips Ethernet header                        ║
║  2. Examines IP destination: 93.184.216.34                       ║
║  3. Checks routing table                                          ║
║  4. Determines next hop (ISP gateway)                             ║
║  5. Decrements TTL (64 → 63)                                      ║
║  6. Recalculates IP checksum                                      ║
║  7. Creates new Ethernet frame for ISP link                       ║
║  8. Forwards packet                                               ║
║                                                                   ║
║  Internet Path (Simplified):                                       ║
║  [Router] → [ISP Edge] → [Core Router] →                         ║
║  → [Backbone] → [Peering Point] →                                ║
║  → [example.com Network] → [Load Balancer] →                     ║
║  → [Web Server]                                                   ║
║                                                                   ║
║ ══════════════════════════════════════════════════════════════║
║                     RESPONSE PATH                                 ║
║ ══════════════════════════════════════════════════════════════║
║                                                                   ║
║  Web server sends HTML page back:                                 ║
║  • Application Layer: HTTP 200 OK + HTML content                 ║
║  • Transport Layer: TCP with ACK                                  ║
║  • Network Layer: IP (src=93.184.216.34, dst=192.168.1.100)     ║
║  • Data Link Layer: Ethernet frames                               ║
║  • Physical Layer: Signals on fiber/copper                        ║
║                                                                   ║
║  Same process in REVERSE through all routers and switches         ║
║  until page displays in browser!                                  ║
╚═══════════════════════════════════════════════════════════════════╝
```


## SUMMARY: Complete Technology Stack

```
┌────────────────────────────────────────────────────────────┐
│                 NETWORKING TECHNOLOGY STACK                │
├────────────────────────────────────────────────────────────┤
│                                                            │
│ TRANSMISSION MEDIA                                         │
│ • Copper: UTP (Cat5e-Cat8), STP, Coaxial                  │
│ • Fiber: Single-mode, Multi-mode                          │
│ • Wireless: Radio, Microwave, Infrared                    │
│                                                            │
│ SIGNAL ENCODING                                            │
│ • Line Coding: NRZ, Manchester, MLT-3, 4B/5B              │
│ • Modulation: ASK, FSK, PSK, QAM                          │
│                                                            │
│ MULTIPLEXING                                               │
│ • FDM: Frequency division (analog)                        │
│ • TDM: Time division (digital)                            │
│ • WDM: Wavelength division (optical)                      │
│ • CDMA: Code division (spread spectrum)                   │
│                                                            │
│ PHYSICAL CONNECTIVITY                                      │
│ • RJ-45, RJ-11 connectors                                 │
│ • Fiber: SC, LC, ST, MTP                                  │
│ • Transceivers: SFP, SFP+, QSFP                           │
│                                                            │
│ NETWORK DEVICES                                            │
│ • Layer 1: Hub, Repeater                                  │
│ • Layer 2: Switch, Bridge                                 │
│ • Layer 3: Router, Layer 3 Switch                         │
│ • Security: Firewall                                       │
└────────────────────────────────────────────────────────────┘
```


**Document Created:** Complete Computer Networking Notes **Focus Areas:** Transmission Media, Signal Encoding, Multiplexing, Physical Layer **Level:** Comprehensive with practical examples
