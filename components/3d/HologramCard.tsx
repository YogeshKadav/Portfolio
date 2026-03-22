'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { hologramVertexShader, hologramFragmentShader } from '@/lib/shaders'

interface HologramCardProps {
  position?: [number, number, number]
  name?: string
  title?: string
}

export function HologramCard({
  position = [2, 0, 0] as [number, number, number],
  name = 'YOGESH KADAV',
  title = 'Full Stack .NET Developer',
}: HologramCardProps) {
  const groupRef = useRef<THREE.Group>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const baseY = position[1]

  const hologramMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: hologramVertexShader,
        fragmentShader: hologramFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Color('#00f0ff') },
          uOpacity: { value: 0.85 },
        },
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  )

  useFrame(({ clock }) => {
    hologramMaterial.uniforms.uTime.value = clock.elapsedTime
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.5) * 0.25
      groupRef.current.position.y = baseY + Math.sin(clock.elapsedTime * 0.8) * 0.12
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = clock.elapsedTime * 0.5
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -clock.elapsedTime * 0.3
      ring2Ref.current.rotation.x = clock.elapsedTime * 0.2
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Main hologram card body */}
      <RoundedBox
        args={[2.5, 3.5, 0.05]}
        radius={0.05}
        material={hologramMaterial}
      />

      {/* Outer glow ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.8, 0.02, 8, 64]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={3}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Inner orbital ring */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.4, 0.015, 8, 64]} />
        <meshStandardMaterial
          color="#8a2be2"
          emissive="#8a2be2"
          emissiveIntensity={2}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Avatar circle */}
      <mesh position={[0, 0.3, 0.06]}>
        <circleGeometry args={[0.7, 32]} />
        <meshStandardMaterial
          color="#0a0a2a"
          emissive="#00f0ff"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Avatar border ring */}
      <mesh position={[0, 0.3, 0.07]}>
        <ringGeometry args={[0.68, 0.72, 64]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={2}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* YK initials */}
      <Text
        position={[0, 0.3, 0.12]}
        fontSize={0.38}
        color="#00f0ff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.005}
        outlineColor="#00f0ff"
      >
        YK
      </Text>

      {/* Name text */}
      <Text
        position={[0, -0.55, 0.08]}
        fontSize={0.17}
        color="#00f0ff"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.2}
        outlineWidth={0.003}
        outlineColor="#00f0ff"
      >
        {name}
      </Text>

      {/* Title */}
      <Text
        position={[0, -0.85, 0.08]}
        fontSize={0.1}
        color="#8a2be2"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.2}
      >
        {title}
      </Text>

      {/* Decorative lines */}
      <mesh position={[0, -0.68, 0.08]}>
        <planeGeometry args={[1.8, 0.005]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={2}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Point light for card glow */}
      <pointLight color="#00f0ff" intensity={2} distance={4} />
    </group>
  )
}
