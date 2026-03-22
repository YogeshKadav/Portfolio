'use client'
/**
 * Professional portrait display
 * — Circular photo with warm vignette
 * — Thin gold frame ring
 * — Subtle ambient glow & slow float
 * — Mouse parallax (very gentle)
 */

import { useRef, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

/* ── Portrait shader ──────────────────────────────────────────── */
const PORTRAIT_VERT = /* glsl */`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const PORTRAIT_FRAG = /* glsl */`
  uniform sampler2D uTexture;
  uniform float     uTime;
  varying vec2      vUv;

  void main() {
    vec4 col = texture2D(uTexture, vUv);

    /* ── Warm cinematic grade ─────────────────────── */
    // Slight desaturate + warm push
    float lum = dot(col.rgb, vec3(0.299, 0.587, 0.114));
    vec3  warm = mix(col.rgb, vec3(lum * 1.04, lum * 0.96, lum * 0.80), 0.12);
    // Subtle contrast
    warm = clamp((warm - 0.5) * 1.06 + 0.5, 0.0, 1.0);

    /* ── Circular crop with smooth falloff ─────────── */
    vec2  c    = vUv - 0.5;
    float dist = length(c);
    // Hard circle edge
    float circle = 1.0 - smoothstep(0.445, 0.500, dist);
    // Inner vignette — darker edges
    float vign = 1.0 - smoothstep(0.28, 0.48, dist) * 0.45;

    float alpha = col.a * circle;

    gl_FragColor = vec4(warm * vign, alpha);
  }
`

/* ── Portrait plane ───────────────────────────────────────────── */
function Portrait({ texture }: { texture: THREE.Texture }) {
  const matRef   = useRef<THREE.ShaderMaterial>(null)
  const uniforms = useMemo(() => ({
    uTexture: { value: texture },
    uTime:    { value: 0 },
  }), [texture])

  useFrame(({ clock }) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = clock.elapsedTime
  })

  return (
    <mesh>
      {/* Square plane — shader crops it to circle */}
      <planeGeometry args={[2.8, 2.8]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={PORTRAIT_VERT}
        fragmentShader={PORTRAIT_FRAG}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  )
}

/* ── Gold frame rings ─────────────────────────────────────────── */
function FrameRings() {
  const outer = useRef<THREE.Mesh>(null)
  const inner = useRef<THREE.Mesh>(null)
  const dot   = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (outer.current) outer.current.rotation.z =  t * 0.10
    if (inner.current) inner.current.rotation.z = -t * 0.06
    // Pulse glow on outer ring
    if (outer.current) {
      const m = outer.current.material as THREE.MeshStandardMaterial
      m.emissiveIntensity = 1.4 + Math.sin(t * 1.2) * 0.4
    }
    if (dot.current) {
      const dm = dot.current.material as THREE.MeshStandardMaterial
      dm.emissiveIntensity = 1.8 + Math.sin(t * 2.0) * 0.6
    }
  })

  return (
    <group>
      {/* Main gold frame */}
      <mesh ref={outer}>
        <torusGeometry args={[1.44, 0.018, 12, 160]} />
        <meshStandardMaterial
          color="#c8a96e" emissive="#c8a96e"
          emissiveIntensity={1.4} metalness={0.8} roughness={0.25}
          transparent opacity={0.90}
        />
      </mesh>

      {/* Inner hairline ring */}
      <mesh ref={inner}>
        <torusGeometry args={[1.35, 0.006, 8, 160]} />
        <meshStandardMaterial
          color="#e8d0a0" emissive="#e8d0a0"
          emissiveIntensity={0.8}
          transparent opacity={0.55}
        />
      </mesh>

      {/* Outer accent ring */}
      <mesh>
        <torusGeometry args={[1.55, 0.005, 8, 160]} />
        <meshStandardMaterial
          color="#7a6642" emissive="#7a6642"
          emissiveIntensity={0.6}
          transparent opacity={0.35}
        />
      </mesh>

      {/* 4 ornamental dots at cardinal points */}
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
        <mesh
          key={i}
          ref={i === 0 ? dot : undefined}
          position={[Math.cos(angle) * 1.44, Math.sin(angle) * 1.44, 0.01]}
        >
          <sphereGeometry args={[0.028, 8, 8]} />
          <meshStandardMaterial
            color="#e8d0a0" emissive="#c8a96e"
            emissiveIntensity={1.8} metalness={0.9}
          />
        </mesh>
      ))}
    </group>
  )
}

/* ── Ambient background glow (behind photo) ──────────────────── */
function AmbientGlow() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const m = meshRef.current.material as THREE.MeshStandardMaterial
      m.emissiveIntensity = 0.08 + Math.sin(clock.elapsedTime * 0.7) * 0.04
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -0.05]}>
      <circleGeometry args={[1.48, 64]} />
      <meshStandardMaterial
        color="#1a1408" emissive="#c8a96e"
        emissiveIntensity={0.08}
        transparent opacity={0.90}
      />
    </mesh>
  )
}

/* ── Full scene ───────────────────────────────────────────────── */
function PortraitScene() {
  const texture  = useTexture('/assets/images/profile.jpg')
  const rootRef  = useRef<THREE.Group>(null)
  const mouse    = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x =  (e.clientX / window.innerWidth)  * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(({ clock }) => {
    if (!rootRef.current) return
    // Gentle float
    rootRef.current.position.y = Math.sin(clock.elapsedTime * 0.45) * 0.07
    // Very subtle mouse tilt
    rootRef.current.rotation.y = THREE.MathUtils.lerp(rootRef.current.rotation.y, mouse.current.x * 0.08, 0.03)
    rootRef.current.rotation.x = THREE.MathUtils.lerp(rootRef.current.rotation.x, -mouse.current.y * 0.05, 0.03)
  })

  return (
    <group ref={rootRef}>
      <AmbientGlow />
      <Portrait texture={texture} />
      <FrameRings />

      {/* Warm key light from upper-left */}
      <pointLight position={[-2.5,  2.5, 4]} color="#e8d0a0" intensity={3.0} distance={10} />
      {/* Soft fill from right */}
      <pointLight position={[ 2.5, -1.0, 3]} color="#c8a96e" intensity={1.5} distance={8}  />
      {/* Subtle rim */}
      <pointLight position={[ 0,    0,  -2]} color="#3a2a10" intensity={0.3} distance={5}  />
    </group>
  )
}

/* ── Exported component ───────────────────────────────────────── */
export default function MechAvatar3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 48, near: 0.1, far: 30 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.20,
      }}
      dpr={[1, 1.5]}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.22} />

      <Suspense fallback={null}>
        <PortraitScene />
      </Suspense>
    </Canvas>
  )
}
