'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { particleVertexShader, particleFragmentShader } from '@/lib/shaders'

interface ParticleFieldProps {
  count?: number
  position?: [number, number, number]
  color?: string
  radius?: number
}

export function ParticleField({
  count = 2000,
  position = [0, 0, 0] as [number, number, number],
  color = '#00f0ff',
  radius = 20,
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null)

  const { positions, sizes, alphas } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const alphas = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const r = Math.random() * radius + 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)

      sizes[i] = Math.random() * 3 + 0.5
      alphas[i] = Math.random() * 0.8 + 0.2
    }

    return { positions, sizes, alphas }
  }, [count, radius])

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: particleVertexShader,
        fragmentShader: particleFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Color(color) },
          uPixelRatio: { value: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1 },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [color]
  )

  useFrame(({ clock }) => {
    material.uniforms.uTime.value = clock.elapsedTime
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.elapsedTime * 0.02
    }
  })

  return (
    <points ref={pointsRef} position={position} material={material}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aSize"
          args={[sizes, 1]}
        />
        <bufferAttribute
          attach="attributes-aAlpha"
          args={[alphas, 1]}
        />
      </bufferGeometry>
    </points>
  )
}
