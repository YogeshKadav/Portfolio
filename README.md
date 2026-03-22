# Yogesh Kadav — Portfolio

A production-ready  3D developer portfolio built with Next.js 14, React Three Fiber, and Framer Motion.

## Tech Stack

- **Next.js 14** (App Router)
- **React Three Fiber** — 3D rendering
- **@react-three/drei** — 3D helpers (Text, Html, ScrollControls, etc.)
- **@react-three/postprocessing** — Bloom, ChromaticAberration, Vignette
- **Three.js** — WebGL engine
- **Framer Motion** — UI animations
- **Tailwind CSS** — utility styles
- **TypeScript** — full type safety

---

## Installation

```bash
cd portfolio-3d
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Production Build

```bash
npm run build
npm start
```

---

## Project Structure

```
portfolio-3d/
├── app/
│   ├── globals.css         # Global styles,  theme, animations
│   ├── layout.tsx          # Root layout with fonts and metadata
│   └── page.tsx            # Main page with canvas + HTML overlay
├── components/
│   ├── 3d/
│   │   ├── CyberGrid.tsx           # Animated infinite perspective grid
│   │   ├── ParticleField.tsx       # Floating particle system
│   │   ├── HologramCard.tsx        # 3D hologram ID card
│   │   ├── FloatingText3D.tsx      # Glowing 3D text with float animation
│   │   ├── SkillsOrbital.tsx       # Orbital skill system (3 rings)
│   │   ├── ProjectCards3D.tsx      # Circular project card arrangement
│   │   ├── ExperienceTunnel.tsx    # Timeline tunnel with experience nodes
│   │   └── PostProcessingEffects  # Bloom, noise, vignette, aberration
│   ├── scenes/
│   │   ├── HeroScene.tsx           # Landing screen (y=0)
│   │   ├── AboutScene.tsx          # Glass cards (y=-20)
│   │   ├── ProjectsScene.tsx       # Project cards circle (y=-40)
│   │   ├── SkillsScene.tsx         # Orbital skills (y=-60)
│   │   ├── ExperienceScene.tsx     # Experience tunnel (y=-80)
│   │   └── ContactScene.tsx        # Contact terminal + globe (y=-100)
│   ├── ui/
│   │   ├── LoadingScreen.tsx       # Matrix-rain loading screen
│   │   ├── NavBar.tsx              # Fixed  navigation
│   │   └── ContactTerminal.tsx     # Hacker terminal contact form
│   └── MainCanvas.tsx              # Core: Canvas + ScrollControls + SceneManager
├── hooks/
│   ├── useMouseParallax.ts         # Smooth mouse position hook
│   └── useScrollProgress.ts        # Scroll progress 0-1 hook
├── lib/
│   ├── data.ts                     # All portfolio data (edit this to customize)
│   └── shaders.ts                  # GLSL shader strings
└── public/
    └── assets/
        └── images/
            └── profile.jpg         # <- Put your photo here
```

---

## Customization

### Personal Data
Edit `lib/data.ts` — all text, projects, experience, and contact info lives here.

### Profile Image
Place your photo at:
```
public/assets/images/profile.jpg
```
The hologram card on the hero scene will use it automatically once you wire up a texture loader in `HologramCard.tsx`.

### Colors
Edit CSS variables in `app/globals.css`:
```css
:root {
  --cyber-cyan: #00f0ff;
  --cyber-purple: #8a2be2;
  --cyber-pink: #ff00ff;
  --bg-dark: #050505;
}
```

### Adding Projects
In `lib/data.ts`, add to the `projects` array:
```typescript
{
  id: 7,
  title: 'Your Project',
  description: 'What it does',
  tech: ['C#', '.NET', 'Azure'],
  category: 'Backend',
  color: '#00f0ff',
}
```

### Post-processing Intensity
In `components/3d/PostProcessingEffects.tsx`, adjust:
- `intensity` on `<Bloom>` (default: 1.2)
- `darkness` on `<Vignette>` (default: 0.45)

---

## Vercel Deployment

1. Push repo to GitHub
2. Go to [vercel.com](https://vercel.com) and click **New Project**
3. Import your GitHub repository
4. Framework preset: **Next.js** (auto-detected)
5. Click **Deploy**

Vercel auto-deploys on every push to `main`.

### Environment Variables
No environment variables are required for the base portfolio.

If you wire up a real contact form (e.g., EmailJS, Resend, Nodemailer), add:
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
```

---

## Performance Notes

- The canvas uses `dpr={[1, 2]}` for sharp rendering on retina displays
- `powerPreference: 'high-performance'` requests the discrete GPU on dual-GPU systems
- PostProcessing bloom uses `mipmapBlur` for better performance
- Particles use custom GLSL shaders with `AdditiveBlending` — no overdraw cost
- All scenes are `<Suspense>`-wrapped for graceful fallback loading
- `dynamic(() => import('./MainCanvas'), { ssr: false })` prevents server-side Three.js errors

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome 90+ | Full |
| Firefox 88+ | Full |
| Safari 15+ | Full |
| Edge 90+ | Full |
| Mobile Chrome | Reduced particles |

---

## License

MIT — free to use and modify for your own portfolio.
