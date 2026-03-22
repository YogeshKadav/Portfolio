'use client'
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

interface FloatingText3DProps {
  text: string
  position?: [number, number, number]
  fontSize?: number
  color?: string
  emissive?: boolean
  glitch?: boolean
  floatSpeed?: number
  floatAmplitude?: number
  maxWidth?: number
  anchorX?: 'left' | 'center' | 'right'
}

export function FloatingText3D({
  text,
  position = [0, 0, 0] as [number, number, number],
  fontSize = 0.3,
  color = '#00f0ff',
  emissive = true,
  glitch = false,
  floatSpeed = 1,
  floatAmplitude = 0.05,
  maxWidth = 10,
  anchorX = 'left',
}: FloatingText3DProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const baseY = position[1]
  const baseX = position[0]
  const glitchTimeRef = useRef(0)

  useFrame(({ clock }) => {
    if (!meshRef.current) return

    const t = clock.elapsedTime

    // Float animation
    meshRef.current.position.y = baseY + Math.sin(t * floatSpeed) * floatAmplitude

    // Glitch effect
    if (glitch) {
      glitchTimeRef.current += 0.016
      if (glitchTimeRef.current > Math.random() * 3 + 1) {
        glitchTimeRef.current = 0
        meshRef.current.position.x = baseX + (Math.random() - 0.5) * 0.04
      } else {
        meshRef.current.position.x = baseX
      }
    }
  })

  return (
    <Text
      ref={meshRef}
      position={position}
      fontSize={fontSize}
      color={color}
      anchorX={anchorX}
      anchorY="middle"
      maxWidth={maxWidth}
      outlineWidth={emissive ? 0.004 : 0}
      outlineColor={color}
      fillOpacity={1}
    >
      {text}
    </Text>
  )
}
