'use client'
import { Text } from '@react-three/drei'
import { ExperienceTunnel } from '@/components/3d/ExperienceTunnel'
import { ParticleField } from '@/components/3d/ParticleField'

interface ExperienceSceneProps {
  scrollOffset?: number
}

export function ExperienceScene({ scrollOffset = 0 }: ExperienceSceneProps) {
  return (
    <group position={[0, -80, 0]}>
      {/* Background */}
      <ParticleField count={200} position={[0, 0, -14]} radius={18} color="#8a2be2" />

      {/* Section header */}
      <Text
        position={[0, 8, 0]}
        fontSize={0.55}
        color="#8a2be2"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#8a2be2"
      >
        EXPERIENCE
      </Text>

      <Text
        position={[0, 7.3, 0]}
        fontSize={0.15}
        color="#888888"
        anchorX="center"
        anchorY="middle"
      >
        4+ Years · 3 Companies · Enterprise Software
      </Text>

      {/* Decorative line */}
      <mesh position={[0, 6.9, 0]}>
        <planeGeometry args={[8, 0.004]} />
        <meshStandardMaterial color="#8a2be2" emissive="#8a2be2" emissiveIntensity={2} transparent opacity={0.4} />
      </mesh>

      {/* Experience tunnel */}
      <ExperienceTunnel scrollOffset={scrollOffset} />

      {/* Timeline axis label */}
      <Text
        position={[0, -7.5, 0]}
        fontSize={0.12}
        color="#4a4a6a"
        anchorX="center"
        anchorY="middle"
      >
        Dec 2021 ──────────────────────── Present
      </Text>

      <ambientLight intensity={0.15} />
      <pointLight position={[0, 8, 5]} color="#8a2be2" intensity={1} distance={25} />
    </group>
  )
}
