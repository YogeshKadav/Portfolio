'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingScreenProps {
  onComplete: () => void
}

const STATUS_LINES = [
  'Preparing portfolio…',
  'Loading projects & experience…',
  'Initialising 3D scene…',
  'Almost ready…',
]

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const [progress,   setProgress]   = useState(0)
  const [statusText, setStatusText] = useState('')
  const [phase,      setPhase]      = useState(0)
  const [visible,    setVisible]    = useState(true)

  /* Floating-particle canvas background */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight

    const particles = Array.from({ length: 60 }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      r:  Math.random() * 1.2 + 0.3,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      a:  Math.random() * 0.5 + 0.15,
    }))

    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200,169,110,${p.a})`
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    draw()

    const onResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])

  /* Progress + typing */
  useEffect(() => {
    let cur  = 0
    let curPhase = 0
    let typingTO: ReturnType<typeof setTimeout>

    const typeText = (text: string) => {
      let i = 0
      setStatusText('')
      const tick = () => {
        if (i < text.length) {
          setStatusText(text.slice(0, i + 1))
          i++
          typingTO = setTimeout(tick, 35)
        }
      }
      tick()
    }

    const interval = setInterval(() => {
      cur += Math.random() * 2.8 + 0.8
      if (cur >= 100) {
        cur = 100
        clearInterval(interval)
        setTimeout(() => { setVisible(false); setTimeout(onComplete, 700) }, 500)
      }
      setProgress(Math.min(cur, 100))

      const newPhase = Math.min(Math.floor((cur / 100) * STATUS_LINES.length), STATUS_LINES.length - 1)
      if (newPhase !== curPhase) {
        curPhase = newPhase
        setPhase(newPhase)
        typeText(STATUS_LINES[newPhase])
      }
    }, 55)

    typeText(STATUS_LINES[0])
    return () => { clearInterval(interval); clearTimeout(typingTO) }
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0, y: '-6%' }}
          transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: '#0a0906',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Particle canvas */}
          <canvas ref={canvasRef} suppressHydrationWarning style={{ position: 'absolute', inset: 0, opacity: 0.45 }} />

          {/* Radial dark centre overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(10,9,6,0.55) 0%, rgba(10,9,6,0.96) 100%)',
          }} />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px', width: '100%', maxWidth: '480px', padding: '0 32px' }}>

            {/* Decorative top line */}
            <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, transparent, rgba(200,169,110,0.6))' }} />

            {/* Name */}
            <div style={{ textAlign: 'center' }}>
              <motion.h1
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(36px, 8vw, 58px)',
                  fontWeight: 700, color: '#ede8dc',
                  letterSpacing: '0.06em', lineHeight: 1.1, margin: 0,
                }}
              >
                Yogesh Kadav
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
                style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '11px', color: '#7a6642',
                  letterSpacing: '0.22em', marginTop: '10px',
                }}
              >
                FULL STACK .NET DEVELOPER
              </motion.p>
            </div>

            {/* Thin gold rule */}
            <div style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg, transparent, #c8a96e, transparent)' }} />

            {/* Status lines */}
            <div style={{ width: '100%' }}>
              {STATUS_LINES.slice(0, phase + 1).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}
                  style={{
                    fontFamily: 'DM Mono, monospace', fontSize: '11px',
                    color: i === phase ? '#c8a96e' : '#3a3020',
                    marginBottom: '6px', letterSpacing: '0.04em',
                  }}
                >
                  {i === phase ? statusText : line}
                  {i === phase && <span className="cursor" />}
                </motion.div>
              ))}
            </div>

            {/* Progress bar */}
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#3a3020', letterSpacing: '0.1em' }}>Loading</span>
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#c8a96e' }}>{Math.floor(progress)}%</span>
              </div>
              <div style={{ width: '100%', height: '1px', background: 'rgba(200,169,110,0.12)', position: 'relative' }}>
                <motion.div
                  style={{
                    height: '100%', width: `${progress}%`,
                    background: 'linear-gradient(90deg, #7a6642, #c8a96e, #e8d0a0)',
                  }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>

            {/* Bottom decorative line */}
            <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, rgba(200,169,110,0.4), transparent)' }} />
          </div>

          {/* Corner ornaments */}
          {[
            { top: '28px',    left: '28px',   borderTop: '1px solid', borderLeft:  '1px solid', width: '28px', height: '28px' },
            { top: '28px',    right: '28px',  borderTop: '1px solid', borderRight: '1px solid', width: '28px', height: '28px' },
            { bottom: '28px', left: '28px',   borderBottom: '1px solid', borderLeft:  '1px solid', width: '28px', height: '28px' },
            { bottom: '28px', right: '28px',  borderBottom: '1px solid', borderRight: '1px solid', width: '28px', height: '28px' },
          ].map((s, i) => (
            <div key={i} style={{ position: 'absolute', borderColor: 'rgba(200,169,110,0.35)', ...s }} />
          ))}

          <div style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', fontFamily: 'DM Mono, monospace', fontSize: '9px', color: '#3a3020', letterSpacing: '0.2em' }}>
            PUNE · INDIA
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
