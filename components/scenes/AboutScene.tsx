'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { PORTFOLIO_DATA } from '@/lib/data'
import { ParticleField } from '@/components/3d/ParticleField'

interface AboutCardProps {
  position: [number, number, number]
  rotation: [number, number, number]
  color: string
  children: React.ReactNode
  floatOffset: number
}

function AboutCard({ position, rotation, color, children, floatOffset }: AboutCardProps) {
  const groupRef = useRef<THREE.Group>(null)
  const baseY = position[1]

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.position.y = baseY + Math.sin(clock.elapsedTime * 0.6 + floatOffset) * 0.1
  })

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Glass card back */}
      <RoundedBox args={[4, 3.2, 0.08]} radius={0.05}>
        <meshPhysicalMaterial
          color="#0a0a1a"
          transparent
          opacity={0.75}
          roughness={0.1}
          metalness={0.2}
          transmission={0.2}
        />
      </RoundedBox>

      {/* Neon border frame */}
      <mesh>
        <boxGeometry args={[4.05, 3.25, 0.02]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1}
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>

      {/* Top accent bar */}
      <mesh position={[0, 1.55, 0.06]}>
        <planeGeometry args={[4, 0.04]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={3}
        />
      </mesh>

      {/* Point light */}
      <pointLight color={color} intensity={1} distance={4} />

      {/* HTML content */}
      <Html
        position={[0, 0, 0.1]}
        center
        distanceFactor={5}
        style={{ pointerEvents: 'none' }}
        transform
      >
        <div
          style={{
            width: '320px',
            fontFamily: 'Share Tech Mono, monospace',
            padding: '12px',
            color: '#e0e0e0',
          }}
        >
          {children}
        </div>
      </Html>
    </group>
  )
}

interface AboutSceneProps {
  scrollOffset?: number
}

export function AboutScene({ scrollOffset = 0 }: AboutSceneProps) {
  return (
    <group position={[0, -20, 0]}>
      {/* Background particles */}
      <ParticleField count={300} position={[0, 0, -10]} radius={15} color="#8a2be2" />

      {/* Card 1: Summary */}
      <AboutCard
        position={[-4.5, 0, 0]}
        rotation={[0, 0.15, 0]}
        color="#00f0ff"
        floatOffset={0}
      >
        <div style={{ color: '#00f0ff', fontSize: '11px', fontWeight: 'bold', marginBottom: '8px', letterSpacing: '2px' }}>
          // ABOUT ME
        </div>
        <div style={{ fontSize: '10px', lineHeight: 1.7, color: '#cccccc' }}>
          {PORTFOLIO_DATA.summary}
        </div>
      </AboutCard>

      {/* Card 2: Education */}
      <AboutCard
        position={[0, 0.5, -1]}
        rotation={[0, 0, 0]}
        color="#8a2be2"
        floatOffset={1.5}
      >
        <div style={{ color: '#8a2be2', fontSize: '11px', fontWeight: 'bold', marginBottom: '10px', letterSpacing: '2px' }}>
          // EDUCATION
        </div>
        <div style={{ marginBottom: '10px' }}>
          <div style={{ color: '#e0e0e0', fontSize: '13px', fontWeight: 'bold' }}>
            {PORTFOLIO_DATA.education.degree}
          </div>
          <div style={{ color: '#8a2be2', fontSize: '10px', marginTop: '4px' }}>
            {PORTFOLIO_DATA.education.institution}
          </div>
          <div style={{ color: '#888', fontSize: '9px', marginTop: '2px' }}>
            {PORTFOLIO_DATA.education.location} · {PORTFOLIO_DATA.education.year}
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(138,43,226,0.3)', paddingTop: '10px', marginTop: '10px' }}>
          <div style={{ color: '#8a2be2', fontSize: '10px', marginBottom: '6px' }}>// LOCATION</div>
          <div style={{ color: '#e0e0e0', fontSize: '11px' }}>
            {PORTFOLIO_DATA.contact.location}
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(138,43,226,0.3)', paddingTop: '10px', marginTop: '10px' }}>
          <div style={{ color: '#8a2be2', fontSize: '10px', marginBottom: '6px' }}>// CONTACT</div>
          <div style={{ color: '#e0e0e0', fontSize: '10px' }}>{PORTFOLIO_DATA.contact.email}</div>
        </div>
      </AboutCard>

      {/* Card 3: Stats */}
      <AboutCard
        position={[4.5, 0, 0]}
        rotation={[0, -0.15, 0]}
        color="#ff00ff"
        floatOffset={3}
      >
        <div style={{ color: '#ff00ff', fontSize: '11px', fontWeight: 'bold', marginBottom: '12px', letterSpacing: '2px' }}>
          // QUICK STATS
        </div>

        {[
          { value: '4+', label: 'Years Experience', color: '#00f0ff' },
          { value: '3', label: 'Companies', color: '#8a2be2' },
          { value: '15+', label: 'Technologies', color: '#ff00ff' },
          { value: '100%', label: 'Commitment', color: '#00f0ff' },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 0',
              borderBottom: '1px solid rgba(255,0,255,0.15)',
            }}
          >
            <div style={{ color: '#aaa', fontSize: '10px' }}>{stat.label}</div>
            <div style={{ color: stat.color, fontSize: '18px', fontWeight: 'bold', textShadow: `0 0 5px ${stat.color}` }}>
              {stat.value}
            </div>
          </div>
        ))}

        <div style={{ marginTop: '14px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {['Backend', 'APIs', 'Cloud', 'Azure', 'DevOps'].map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '9px',
                padding: '2px 8px',
                border: '1px solid rgba(255,0,255,0.4)',
                color: '#ff00ff',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </AboutCard>

      {/* Section title */}
      <group position={[0, 2.5, 0]}>
        <mesh position={[0, 0, -0.5]}>
          <planeGeometry args={[8, 0.5]} />
          <meshStandardMaterial color="#0a0a1a" transparent opacity={0.6} />
        </mesh>
      </group>

      <ambientLight intensity={0.2} />
      <pointLight position={[0, 5, 5]} color="#8a2be2" intensity={1} distance={20} />
    </group>
  )
}
