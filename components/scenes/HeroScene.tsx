'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import { CyberGrid } from '@/components/3d/CyberGrid'
import { ParticleField } from '@/components/3d/ParticleField'
import { HologramCard } from '@/components/3d/HologramCard'

export function HeroScene() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ mouse }) => {
    if (!groupRef.current) return
    // Subtle mouse parallax — cheap, no traverse
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouse.x * 0.04,
      0.02,
    )
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -mouse.y * 0.02,
      0.02,
    )
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Cyber grid floor */}
      <CyberGrid position={[0, -3.5, -5]} size={100} />

      {/* Background particle field — keep count low for performance */}
      <ParticleField count={800} position={[0, 0, -8]} radius={18} color="#00f0ff" />
      <ParticleField count={300} position={[0, 0, -5]} radius={12} color="#8a2be2" />

      {/* Hologram ID card */}
      <HologramCard position={[3.2, 0, 0]} />

      {/* Main title: YOGESH KADAV */}
      <Text
        position={[-2, 1.3, 0]}
        fontSize={0.52}
        color="#00f0ff"
        anchorX="left"
        anchorY="middle"
        maxWidth={6}
        outlineWidth={0.01}
        outlineColor="#00f0ff"
      >
        YOGESH KADAV
      </Text>

      {/* Subtitle */}
      <Text
        position={[-2, 0.65, 0]}
        fontSize={0.22}
        color="#8a2be2"
        anchorX="left"
        anchorY="middle"
        maxWidth={6}
      >
        Full Stack .NET Developer
      </Text>

      {/* Role tags */}
      <Text
        position={[-2, 0.2, 0]}
        fontSize={0.15}
        color="#ff00ff"
        anchorX="left"
        anchorY="middle"
        maxWidth={6}
      >
        Cloud · Azure · Docker · C# · APIs
      </Text>

      {/* Experience badge */}
      <Text
        position={[-2, -0.2, 0]}
        fontSize={0.13}
        color="#888888"
        anchorX="left"
        anchorY="middle"
        maxWidth={6}
      >
        4+ Years · Pune, India
      </Text>

      {/* Decorative separator */}
      <mesh position={[-2 + 2.5, -0.45, 0]}>
        <planeGeometry args={[5.5, 0.003]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={2}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Tech stack pills */}
      {['C#', '.NET Core', 'ASP.NET', 'Azure', 'Docker'].map((tech, i) => (
        <group key={tech} position={[-2 + i * 1.1, -0.8, 0]}>
          <mesh>
            <boxGeometry args={[0.95, 0.28, 0.02]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#00f0ff' : '#8a2be2'}
              emissive={i % 2 === 0 ? '#00f0ff' : '#8a2be2'}
              emissiveIntensity={0.3}
              transparent
              opacity={0.15}
            />
          </mesh>
          <Text
            position={[0, 0, 0.02]}
            fontSize={0.1}
            color={i % 2 === 0 ? '#00f0ff' : '#8a2be2'}
            anchorX="center"
            anchorY="middle"
          >
            {tech}
          </Text>
        </group>
      ))}

      {/* Ambient + directional lights */}
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} color="#00f0ff" intensity={1.5} distance={20} />
      <pointLight position={[-5, 2, -5]} color="#8a2be2" intensity={0.8} distance={15} />
      <pointLight position={[0, -3, 5]} color="#ff00ff" intensity={0.3} distance={10} />
    </group>
  )
}
