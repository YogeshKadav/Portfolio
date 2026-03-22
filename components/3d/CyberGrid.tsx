'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { gridVertexShader, gridFragmentShader } from '@/lib/shaders'

interface CyberGridProps {
  position?: [number, number, number]
  size?: number
}

export function CyberGrid({
  position = [0, -2, 0] as [number, number, number],
  size = 80,
}: CyberGridProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: gridVertexShader,
        fragmentShader: gridFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Color('#00f0ff') },
        },
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    []
  )

  useFrame(({ clock }) => {
    material.uniforms.uTime.value = clock.elapsedTime
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={[-Math.PI / 2, 0, 0]}
      material={material}
    >
      <planeGeometry args={[size, size, 40, 40]} />
    </mesh>
  )
}
