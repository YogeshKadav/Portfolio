'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Html, Sphere, Line } from '@react-three/drei'
import * as THREE from 'three'
import { ParticleField } from '@/components/3d/ParticleField'
import ContactTerminal from '@/components/ui/ContactTerminal'
import { PORTFOLIO_DATA } from '@/lib/data'

function HolographicGlobe() {
  const groupRef = useRef<THREE.Group>(null)
  const sphere1Ref = useRef<THREE.Mesh>(null)
  const sphere2Ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15
    }
    if (sphere1Ref.current) {
      sphere1Ref.current.rotation.y = t * 0.3
      sphere1Ref.current.rotation.z = t * 0.1
    }
    if (sphere2Ref.current) {
      sphere2Ref.current.rotation.x = t * 0.2
      sphere2Ref.current.rotation.z = -t * 0.15
    }
  })

  // Wireframe lat/lon lines
  const linePoints: [number, number, number][][] = []

  // Latitude circles
  for (let lat = -60; lat <= 60; lat += 30) {
    const pts: [number, number, number][] = []
    const r = 3.8
    const y = r * Math.sin((lat * Math.PI) / 180)
    const rLat = r * Math.cos((lat * Math.PI) / 180)
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2
      pts.push([rLat * Math.cos(angle), y, rLat * Math.sin(angle)])
    }
    linePoints.push(pts)
  }

  // Longitude lines
  for (let lon = 0; lon < 360; lon += 45) {
    const pts: [number, number, number][] = []
    const r = 3.8
    for (let i = 0; i <= 32; i++) {
      const lat = -90 + (i / 32) * 180
      const y = r * Math.sin((lat * Math.PI) / 180)
      const rLat = r * Math.cos((lat * Math.PI) / 180)
      pts.push([rLat * Math.cos((lon * Math.PI) / 180), y, rLat * Math.sin((lon * Math.PI) / 180)])
    }
    linePoints.push(pts)
  }

  return (
    <group ref={groupRef}>
      {/* Globe wireframe */}
      {linePoints.map((pts, i) => (
        <Line
          key={i}
          points={pts}
          color={i % 2 === 0 ? '#00f0ff' : '#8a2be2'}
          lineWidth={0.5}
          transparent
          opacity={0.15}
        />
      ))}

      {/* Orbital rings */}
      <mesh ref={sphere1Ref}>
        <torusGeometry args={[4.2, 0.02, 8, 128]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={1.5} transparent opacity={0.5} />
      </mesh>

      <mesh ref={sphere2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[4.5, 0.015, 8, 128]} />
        <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={1} transparent opacity={0.4} />
      </mesh>

      {/* Center glow */}
      <Sphere args={[0.4, 32, 32]}>
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={3} transparent opacity={0.8} />
      </Sphere>

      {/* Location dots */}
      {[
        { lat: 18.5, lon: 73.8, label: 'PUNE', color: '#00f0ff' },
      ].map((loc) => {
        const r = 3.85
        const phi = (90 - loc.lat) * (Math.PI / 180)
        const theta = (loc.lon + 180) * (Math.PI / 180)
        const x = r * Math.sin(phi) * Math.cos(theta)
        const y = r * Math.cos(phi)
        const z = r * Math.sin(phi) * Math.sin(theta)
        return (
          <group key={loc.label} position={[x, y, z]}>
            <Sphere args={[0.08, 16, 16]}>
              <meshStandardMaterial color={loc.color} emissive={loc.color} emissiveIntensity={4} />
            </Sphere>
          </group>
        )
      })}

      <pointLight color="#00f0ff" intensity={1} distance={10} />
    </group>
  )
}

interface ContactSceneProps {
  scrollOffset?: number
}

export function ContactScene({ scrollOffset = 0 }: ContactSceneProps) {
  return (
    <group position={[0, -100, 0]}>
      {/* Background */}
      <ParticleField count={400} position={[0, 0, -12]} radius={16} color="#00f0ff" />
      <ParticleField count={200} position={[0, 0, -8]} radius={10} color="#ff00ff" />

      {/* Section header */}
      <Text
        position={[0, 7.5, 0]}
        fontSize={0.55}
        color="#00f0ff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#00f0ff"
      >
        CONTACT
      </Text>

      <Text
        position={[0, 6.8, 0]}
        fontSize={0.15}
        color="#888888"
        anchorX="center"
        anchorY="middle"
      >
        Let&apos;s build something amazing together
      </Text>

      {/* Holographic globe (left side) */}
      <group position={[-5.5, 0, -3]}>
        <HolographicGlobe />
      </group>

      {/* Contact terminal (center/right) */}
      <Html
        position={[3, 0, 0]}
        center
        distanceFactor={7}
        style={{ width: '500px', pointerEvents: 'auto' }}
        transform
      >
        <ContactTerminal />
      </Html>

      {/* Social floating icons */}
      <group position={[-5.5, -5.5, -2]}>
        {[
          { label: 'EMAIL', value: PORTFOLIO_DATA.contact.email, color: '#00f0ff', y: 0 },
          { label: 'LINKEDIN', value: 'linkedin.com', color: '#8a2be2', y: -0.8 },
        ].map((social) => (
          <group key={social.label} position={[0, social.y, 0]}>
            <mesh>
              <boxGeometry args={[3.8, 0.45, 0.03]} />
              <meshStandardMaterial
                color={social.color}
                emissive={social.color}
                emissiveIntensity={0.1}
                transparent
                opacity={0.08}
              />
            </mesh>
            <Text
              position={[-1.7, 0, 0.04]}
              fontSize={0.12}
              color={social.color}
              anchorX="left"
              anchorY="middle"
            >
              {'> '}
              {social.label}:
            </Text>
            <Text
              position={[0.2, 0, 0.04]}
              fontSize={0.1}
              color="#aaaaaa"
              anchorX="left"
              anchorY="middle"
            >
              {social.value}
            </Text>
          </group>
        ))}
      </group>

      {/* Bottom credits */}
      <Text
        position={[0, -7, 0]}
        fontSize={0.11}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        Built with Next.js · React Three Fiber · Three.js · Framer Motion
      </Text>

      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} color="#00f0ff" intensity={1.5} distance={20} />
      <pointLight position={[-5, 0, 5]} color="#ff00ff" intensity={0.8} distance={15} />
    </group>
  )
}
