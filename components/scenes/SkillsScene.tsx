'use client'
import { Text } from '@react-three/drei'
import { SkillsOrbital } from '@/components/3d/SkillsOrbital'
import { ParticleField } from '@/components/3d/ParticleField'
import { CyberGrid } from '@/components/3d/CyberGrid'

interface SkillsSceneProps {
  scrollOffset?: number
}

export function SkillsScene({ scrollOffset = 0 }: SkillsSceneProps) {
  return (
    <group position={[0, -60, 0]}>
      {/* Background */}
      <ParticleField count={250} position={[0, 0, -12]} radius={16} color="#00f0ff" />
      <CyberGrid position={[0, -6, -5]} size={50} />

      {/* Section header */}
      <Text
        position={[0, 6.5, 0]}
        fontSize={0.55}
        color="#00f0ff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#00f0ff"
      >
        SKILLS MATRIX
      </Text>

      <Text
        position={[0, 5.8, 0]}
        fontSize={0.15}
        color="#888888"
        anchorX="center"
        anchorY="middle"
      >
        Technologies · Frameworks · Tools · Cloud
      </Text>

      {/* Legend */}
      <group position={[-7, 0, 0]}>
        {[
          { color: '#00f0ff', label: 'LANGUAGES', ring: 'Inner Ring' },
          { color: '#8a2be2', label: 'FRAMEWORKS', ring: 'Middle Ring' },
          { color: '#ff00ff', label: 'CLOUD & TOOLS', ring: 'Outer Ring' },
        ].map((item, i) => (
          <group key={item.label} position={[0, i * -0.7, 0]}>
            <mesh>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial
                color={item.color}
                emissive={item.color}
                emissiveIntensity={2}
              />
            </mesh>
            <Text
              position={[0.25, 0, 0]}
              fontSize={0.13}
              color={item.color}
              anchorX="left"
              anchorY="middle"
            >
              {item.label}
            </Text>
            <Text
              position={[0.25, -0.18, 0]}
              fontSize={0.1}
              color="#4a4a6a"
              anchorX="left"
              anchorY="middle"
            >
              {item.ring}
            </Text>
          </group>
        ))}
      </group>

      {/* The orbital system */}
      <SkillsOrbital />

      <ambientLight intensity={0.15} />
    </group>
  )
}
