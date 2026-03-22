'use client'
import { useState, useEffect, useRef, useCallback } from 'react'

interface MousePosition {
  x: number
  y: number
}

export function useMouseParallax(strength: number = 1): MousePosition {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 })
  const targetRef = useRef<MousePosition>({ x: 0, y: 0 })
  const currentRef = useRef<MousePosition>({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t

  const animate = useCallback(() => {
    const dx = targetRef.current.x - currentRef.current.x
    const dy = targetRef.current.y - currentRef.current.y

    if (Math.abs(dx) > 0.0001 || Math.abs(dy) > 0.0001) {
      currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, 0.05)
      currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, 0.05)
      setPosition({ x: currentRef.current.x, y: currentRef.current.y })
    }

    rafRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 to 1
      targetRef.current.x = ((e.clientX / window.innerWidth) * 2 - 1) * strength
      targetRef.current.y = (-(e.clientY / window.innerHeight) * 2 + 1) * strength
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [animate, strength])

  return position
}
