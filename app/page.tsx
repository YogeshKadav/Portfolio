'use client'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import NavBar from '@/components/ui/NavBar'
import LoadingScreen from '@/components/ui/LoadingScreen'
import {
  HeroSection,
  AboutSection,
  ProjectsSection,
  SkillsSection,
  ExperienceSection,
  ContactSection,
} from '@/components/ui/Sections'

// 3D canvas: never SSR
const MainCanvas = dynamic(() => import('@/components/MainCanvas'), {
  ssr: false,
  loading: () => null,
})

const SECTION_IDS = ['hero', 'about', 'projects', 'skills', 'experience', 'contact']

export default function HomePage() {
  const [loading, setLoading]             = useState(true)
  const [activeSection, setActiveSection] = useState(0)

  // Intersection Observer to highlight active nav link
  useEffect(() => {
    if (loading) return
    const observers: IntersectionObserver[] = []

    SECTION_IDS.forEach((id, idx) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(idx) },
        { threshold: 0.4 },
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [loading])

  return (
    <>
      {/* ── Loading screen ─────────────────────────── */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* ── Ambient 3D background (fixed, behind everything) */}
      {!loading && <MainCanvas />}

      {/* ── Fixed navbar ───────────────────────────── */}
      {!loading && <NavBar activeSection={activeSection} />}

      {/* ── Scrollable content ─────────────────────── */}
      {!loading && (
        <main style={{ position: 'relative', zIndex: 10 }}>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <ExperienceSection />
          <ContactSection />
        </main>
      )}

      {/* ── Hero scroll cue ────────────────────────── */}
      {!loading && activeSection === 0 && (
        <div style={{
          position: 'fixed', bottom: '2rem', left: '50%',
          transform: 'translateX(-50%)', zIndex: 50,
          pointerEvents: 'none',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
        }}>
          <span style={{
            fontSize: '9px', color: '#7a6642', letterSpacing: '0.28em',
            fontFamily: 'DM Mono, monospace',
          }}>scroll</span>
          <div style={{
            width: '1px', height: '44px',
            background: 'linear-gradient(to bottom, #c8a96e, transparent)',
            animation: 'cue 2s ease-in-out infinite',
          }} />
        </div>
      )}

      <style>{`
        @keyframes cue {
          0%,100% { opacity:1; transform:scaleY(1); }
          50%      { opacity:0.3; transform:scaleY(0.5); }
        }
        /* Ensure anchor links account for fixed navbar height */
        html { scroll-padding-top: 64px; }
      `}</style>
    </>
  )
}
