# SONICFLOW AI — Interactive 3D SaaS Landing Page

A modern, 3D-immersive SaaS landing page for **SonicFlow AI** — a real-time AI voice enhancement and spatial audio processing platform. Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Three.js (React Three Fiber)**, and **Framer Motion**, featuring interactive WebGL 3D models, 5-language support with automatic `RTL`/`LTR` switching, and a dual Dark/Light theme engine.

🔗 **Live Demo:** [https://sonicflow-ai-landing.vercel.app](https://sonicflow-ai-landing.vercel.app)

---

## ✨ Key Features

### 🌐 Interactive 3D & Spatial UI (Three.js + Framer Motion)
- **3D Reactive Ferrofluid Sound Orb:** Real-time WebGL resonator built with `@react-three/fiber` and `@react-three/drei` that responds to user drag controls and dynamically shifts geometry, distortion, and shaders when toggling between **Raw Mic (Noisy)** and **SonicFlow 3D Clear** modes.
- **3D Bento Grid Architecture:** Four interactive feature cards wrapped in physics-based **3D Perspective Tilt** containers, each housing a custom interactive Three.js 3D visual (*Neural Noise Shield, Parametric 3D EQ, Spatial Stem Matrix, and Sub-6ms Kernel DSP Chip*).

### 🌍 5-Language i18n Engine & Automatic RTL/LTR
- Full localization across **5 languages**: **English (`EN`)**, **Arabic (`AR`)**, **French (`FR`)**, **Dutch (`DU`)**, and **Italian (`IT`)**.
- Seamless layout mirroring (`RTL` for Arabic, `LTR` for European languages) with adaptive Arabic typography (`IBM Plex Sans Arabic`) and `localStorage` persistence.

### 🎨 Dual Theme System (Dark & Light Modes)
- Semantic CSS variable architecture switching smoothly between a deep space obsidian **Dark Mode** and a crisp glassmorphic **Light Mode**, dynamically adapting 3D lighting, materials, and UI surfaces.

### ⚡ Interactive SaaS Conversion Flows
- **Live A/B Audio Playground:** Interactive audio mode switcher, 4 DSP studio presets, and an animated 28-band frequency spectrum visualizer.
- **Dynamic Pricing Section:** Monthly/Yearly billing toggle (`Save 25%`) with an elevated 3D centerpiece card for the **Pro Creator** tier.
- **Technical FAQ Accordion & Instant Trial Modal:** Smooth animated FAQ drawer and a simulated Free Trial License Generator modal (`SF3D-PRO-2026-XXXX`).

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router), React, TypeScript
- **Styling:** Tailwind CSS, Semantic CSS Variables
- **3D Graphics & Motion:** Three.js, React Three Fiber, Drei, Framer Motion
- **Icons & Typography:** Lucide React, Space Grotesk, Geist, JetBrains Mono, IBM Plex Sans Arabic
- **Deployment:** GitHub + Vercel

---

## 🚀 Getting Started Locally

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/mwwael2017/sonicflow-ai-landing.git](https://github.com/mwwael2017/sonicflow-ai-landing.git)
   cd sonicflow-ai-landing
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.
