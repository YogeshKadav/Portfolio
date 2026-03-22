'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Home',       section: 'hero',       index: 0 },
  { label: 'About',      section: 'about',      index: 1 },
  { label: 'Projects',   section: 'projects',   index: 2 },
  { label: 'Skills',     section: 'skills',     index: 3 },
  { label: 'Experience', section: 'experience', index: 4 },
  { label: 'Contact',    section: 'contact',    index: 5 },
]

export default function NavBar({ activeSection = 0 }: { activeSection?: number }) {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (index: number) => {
    const total = document.documentElement.scrollHeight - window.innerHeight
    window.scrollTo({ top: (index / 6) * total, behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: '0 clamp(20px, 6vw, 80px)',
        background: scrolled ? 'rgba(10, 9, 6, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(200,169,110,0.12)' : 'none',
        transition: 'background 0.35s, border-color 0.35s',
        height: '64px',
        display: 'flex', alignItems: 'center',
      }}
    >
      <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <motion.div whileHover={{ scale: 1.04 }} style={{ cursor: 'pointer' }} onClick={() => scrollTo(0)}>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', fontWeight: 700, color: '#c8a96e', lineHeight: 1 }}>
            YK
          </div>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: '#7a6642', letterSpacing: '0.18em', marginTop: '2px' }}>
            Backend Engineer
          </div>
        </motion.div>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }} className="hidden-mobile">
          {NAV_LINKS.map(link => (
            <motion.button
              key={link.section}
              onClick={() => scrollTo(link.index)}
              whileHover={{ y: -1 }}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0',
                fontFamily: 'Lato, sans-serif', fontSize: '13px', fontWeight: 400,
                letterSpacing: '0.06em',
                color: activeSection === link.index ? '#c8a96e' : '#a09078',
                position: 'relative',
                transition: 'color 0.2s',
              }}
            >
              {link.label}
              {activeSection === link.index && (
                <motion.div
                  layoutId="nav-underline"
                  style={{
                    position: 'absolute', bottom: -2, left: 0, right: 0, height: '1px',
                    background: 'linear-gradient(90deg, transparent, #c8a96e, transparent)',
                  }}
                />
              )}
            </motion.button>
          ))}
        </div>


        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', display: 'none' }}
          className="show-mobile"
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              style={{ width: '22px', height: '1.5px', background: '#c8a96e', marginBottom: i < 2 ? '5px' : 0 }}
              animate={
                menuOpen
                  ? i === 1 ? { opacity: 0 } : i === 0 ? { rotate: 45, y: 6.5 } : { rotate: -45, y: -6.5 }
                  : { rotate: 0, y: 0, opacity: 1 }
              }
            />
          ))}
        </button>
      </div>

      {/* Mobile dropdown */}
      <motion.div
        initial={false}
        animate={{ height: menuOpen ? 'auto' : 0, opacity: menuOpen ? 1 : 0 }}
        style={{
          overflow: 'hidden',
          position: 'absolute', top: '64px', left: 0, right: 0,
          background: 'rgba(10,9,6,0.97)',
          borderBottom: '1px solid rgba(200,169,110,0.1)',
        }}
      >
        <div style={{ padding: '16px clamp(20px,6vw,80px)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {NAV_LINKS.map(link => (
            <button
              key={link.section}
              onClick={() => scrollTo(link.index)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                fontFamily: 'Lato, sans-serif', fontSize: '14px',
                color: activeSection === link.index ? '#c8a96e' : '#a09078',
                padding: '4px 0',
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: block !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </motion.nav>
  )
}
