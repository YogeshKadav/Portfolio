'use client'
import { Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { ParticleField } from '@/components/3d/ParticleField'
import { PostProcessingEffects } from '@/components/3d/PostProcessingEffects'

/* Gentle mouse parallax — no pointer events needed */
function MouseParallax() {
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x =  (e.clientX / window.innerWidth)  * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(({ camera }) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.current.x * 0.30, 0.022)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.current.y * 0.18, 0.022)
  })

  return null
}

/* Slow-floating wireframe shapes — warm vintage gold/bronze tones */
function AmbientShapes() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = clock.elapsedTime * 0.03
  })

  return (
    <group ref={groupRef}>
      {/* Large torus — right */}
      <mesh position={[6, 0.5, -4]} rotation={[0.4, 0, 0.2]}>
        <torusGeometry args={[1.8, 0.022, 8, 80]} />
        <meshStandardMaterial color="#c8a96e" emissive="#c8a96e" emissiveIntensity={0.9} transparent opacity={0.22} />
      </mesh>

      {/* Dodecahedron wireframe — left */}
      <mesh position={[-7, -1, -5]} rotation={[0.3, 0.5, 0]}>
        <dodecahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial color="#8a7a5a" emissive="#8a7a5a" emissiveIntensity={0.7} wireframe transparent opacity={0.22} />
      </mesh>

      {/* Small floating cubes */}
      {([[-4, 3, -6], [5, -3, -7], [0, 4, -8]] as [number,number,number][]).map(([x,y,z], i) => (
        <mesh key={i} position={[x, y, z]} rotation={[i, i * 0.7, 0]}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial color="#c8a96e" emissive="#c8a96e" emissiveIntensity={0.6} wireframe transparent opacity={0.20} />
        </mesh>
      ))}

      {/* Second torus — upper left */}
      <mesh position={[-5, 2, -6]} rotation={[1.2, 0.3, 0.5]}>
        <torusGeometry args={[1.2, 0.018, 8, 60]} />
        <meshStandardMaterial color="#6b8fa8" emissive="#6b8fa8" emissiveIntensity={0.7} transparent opacity={0.18} />
      </mesh>
    </group>
  )
}

export default function MainCanvas() {
  return (
    <Canvas
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      camera={{ position: [0, 0, 10], fov: 70, near: 0.1, far: 100 }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
      dpr={[1, 1.5]}
      shadows={false}
    >
      {/* Warm near-black background */}
      <color attach="background" args={['#0a0906']} />

      <MouseParallax />

      <Suspense fallback={null}>
        {/* Warm gold particle field — near, very sparse */}
        <ParticleField count={120} position={[0, 0, -5]}  radius={14} color="#c8a96e" />
        {/* Steel-blue particle field — far, very sparse */}
        <ParticleField count={60}  position={[0, 0, -10]} radius={20} color="#4a6070" />

        {/* Floating wireframe shapes */}
        <AmbientShapes />
      </Suspense>

      {/* Scene lighting — warm key + cool fill */}
      <ambientLight intensity={0.08} />
      <pointLight position={[ 8,  6,  4]} color="#c8a96e" intensity={0.5} distance={30} />
      <pointLight position={[-8, -4, -6]} color="#4a6070" intensity={0.3} distance={25} />

      <Suspense fallback={null}>
        <PostProcessingEffects />
      </Suspense>
    </Canvas>
  )
}
