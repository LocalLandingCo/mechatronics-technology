
# Mechatronics Technology — Industrial-Precision Website Redesign

## Design System

**Color Palette** (Industrial-Precision B2B):
- **Primary**: Deep Navy (#0A1628) — authority, trust, aerospace-grade feel
- **Accent**: Electric Cyan (#00D4FF) — high-tech sensor/measurement vibe
- **Secondary Accent**: Amber (#FF8C00) — warning/CTA energy, industrial signaling
- **Surface**: Dark Gunmetal (#111827) with subtle noise texture
- **Text**: White/Light Gray on dark backgrounds
- **Grid lines**: Faint cyan at ~5% opacity

**Fonts**: Rajdhani (headings) + Barlow (body) via Google Fonts

**Textures & Effects**: CSS noise overlay on backgrounds, subtle dot-grid pattern, gradient mesh glows behind key sections

---

## Page Structure (Single-Page with Smooth Scroll)

### 1. Navbar
- Sticky, transparent → solid on scroll with backdrop blur
- Logo: "MECHATRONICS TECHNOLOGY" in Rajdhani bold
- Links: Home, About, Products, Markets, Contact
- Glowing cyan underline on active/hover
- CTA button: "Get a Quote" with amber glow

### 2. Hero Section
- Asymmetric layout: left text block, right animated orbital rings (CSS) with glowing sensor dots
- Headline: "Precision Sensing & Measurement Solutions"
- Sub: "India's trusted distributor for industrial sensors, load cells, and measurement instruments"
- Floating stat cards with scroll-triggered count-up animations:
  - "7+ Market Sectors Served"
  - "Global Principals Represented"
  - "Kolhapur, Maharashtra 🇮🇳"
- CTA buttons: "Explore Products" + "Contact Us"

### 3. About Section
- Split layout with animated technical diagram (CSS orbital/circuit-style animation)
- Content from real site: Founded by technologists, wholesale-distributor/trader of sensing products
- Key differentiators: Quality, Customer Service, Timely Delivery, Custom Solutions
- Scroll-triggered fade-in reveals

### 4. Products Section (3 Cards)
- **Torque Sensors** — Precision torque measurement for automotive & R&D
- **Load Cells / Force Sensors** — Industrial-grade load measurement solutions
- **Inclinometer / Tilt Sensors** — Accurate tilt & angle measurement
- Plus a mention of **Protective Packaging Labels**
- Cards with hover glow effect, subtle grid background, cyan accent borders

### 5. Markets Section (7 Sectors)
- Icon grid with scroll-triggered staggered reveals
- Sectors: Defense, Automotive, R&D, Industrial Automation, Consumer Electronics, Educational Institutes, Engineering
- Each with an icon and brief description
- Hexagonal or card-based layout with glowing hover states

### 6. Contact Section
- Form: Name, Email, Phone, Message + Submit button
- Right side: Company info card with phone (+91 82378 13940), location (Kolhapur, Maharashtra), email
- Gradient mesh glow background

### 7. Footer
- Brand name + tagline
- Quick nav links
- Contact info
- Copyright: © 2024 Mechatronics Technology. All rights reserved.

## Motion & Animations
- Scroll-triggered section reveals (fade-up with stagger)
- Spinning orbital rings in hero (pure CSS)
- Glowing pulsing dots on hero diagram
- Stat counter animations on scroll into view
- Hover effects: scale, glow, underline transitions
