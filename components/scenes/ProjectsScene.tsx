'use client'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import { ProjectCards3D } from '@/components/3d/ProjectCards3D'
import { ParticleField } from '@/components/3d/ParticleField'
import { CyberGrid } from '@/components/3d/CyberGrid'
import { PORTFOLIO_DATA } from '@/lib/data'

interface ProjectsSceneProps {
  scrollOffset?: number
}

export function ProjectsScene({ scrollOffset = 0 }: ProjectsSceneProps) {
  return (
    <group position={[0, -40, 0]}>
      {/* Background */}
      <ParticleField count={300} position={[0, 0, -10]} radius={18} color="#ff00ff" />
      <CyberGrid position={[0, -5, -5]} size={60} />

      {/* Section header */}
      <Text
        position={[0, 4, 0]}
        fontSize={0.55}
        color="#ff00ff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#ff00ff"
      >
        PROJECTS
      </Text>

      <Text
        position={[0, 3.3, 0]}
        fontSize={0.16}
        color="#888888"
        anchorX="center"
        anchorY="middle"
      >
        Selected work · Hover to explore · Click for details
      </Text>

      {/* Horizontal decorative line */}
      <mesh position={[0, 2.9, 0]}>
        <planeGeometry args={[8, 0.004]} />
        <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={2} transparent opacity={0.4} />
      </mesh>

      {/* 3D project cards */}
      <ProjectCards3D projects={PORTFOLIO_DATA.projects} />

      {/* Center bottom label */}
      <Text
        position={[0, -5, 0]}
        fontSize={0.12}
        color="#4a4a6a"
        anchorX="center"
        anchorY="middle"
      >
        6 PROJECTS · SCROLL TO CONTINUE
      </Text>

      <ambientLight intensity={0.2} />
      <pointLight position={[0, 5, 5]} color="#ff00ff" intensity={1.5} distance={20} />
      <pointLight position={[0, -5, -5]} color="#8a2be2" intensity={0.8} distance={15} />
    </group>
  )
}
