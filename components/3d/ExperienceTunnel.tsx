'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, Sphere, Line } from '@react-three/drei'
import * as THREE from 'three'
import { tunnelVertexShader, tunnelFragmentShader } from '@/lib/shaders'
import { PORTFOLIO_DATA } from '@/lib/data'

interface ExperienceNodeProps {
  experience: (typeof PORTFOLIO_DATA.experience)[0]
  position: [number, number, number]
}

function ExperienceNode({ experience, position }: ExperienceNodeProps) {
  const sphereRef = useRef<THREE.Mesh>(null)
  const pulseRef = useRef<number>(0)

  useFrame(({ clock }) => {
    pulseRef.current = clock.elapsedTime
    if (sphereRef.current) {
      const mat = sphereRef.current.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = 1.5 + Math.sin(clock.elapsedTime * 2) * 0.7
    }
  })

  return (
    <group position={position}>
      {/* Node sphere */}
      <Sphere ref={sphereRef} args={[0.35, 32, 32]}>
        <meshStandardMaterial
          color={experience.color}
          emissive={experience.color}
          emissiveIntensity={2}
          transparent
          opacity={0.9}
        />
      </Sphere>

      {/* Outer pulse ring */}
      <mesh>
        <torusGeometry args={[0.55, 0.02, 8, 32]} />
        <meshStandardMaterial
          color={experience.color}
          emissive={experience.color}
          emissiveIntensity={1.5}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Point light at node */}
      <pointLight color={experience.color} intensity={2} distance={5} />

      {/* HTML label */}
      <Html
        position={[1.2, 0.2, 0]}
        distanceFactor={8}
        style={{ pointerEvents: 'none' }}
      >
        <div
          style={{
            background: 'rgba(5, 5, 5, 0.92)',
            border: `1px solid ${experience.color}`,
            borderRadius: '4px',
            padding: '12px 16px',
            width: '240px',
            fontFamily: 'Share Tech Mono, monospace',
            boxShadow: `0 0 15px ${experience.color}44`,
          }}
        >
          {/* Company */}
          <div
            style={{
              color: experience.color,
              fontSize: '12px',
              fontWeight: 'bold',
              textShadow: `0 0 5px ${experience.color}`,
              marginBottom: '2px',
            }}
          >
            {experience.company}
          </div>

          {/* Role */}
          <div style={{ color: '#e0e0e0', fontSize: '10px', marginBottom: '2px' }}>
            {experience.role}
          </div>

          {/* Period */}
          <div
            style={{ color: '#888', fontSize: '9px', marginBottom: '8px' }}
          >
            {experience.period}
            {experience.current && (
              <span
                style={{
                  marginLeft: '6px',
                  color: '#00f0ff',
                  fontSize: '8px',
                  padding: '1px 5px',
                  border: '1px solid #00f0ff',
                }}
              >
                CURRENT
              </span>
            )}
          </div>

          {/* Bullets */}
          <div style={{ borderTop: `1px solid ${experience.color}33`, paddingTop: '6px' }}>
            {experience.bullets.slice(0, 3).map((b, i) => (
              <div key={i} style={{ color: '#aaa', fontSize: '9px', marginBottom: '3px', display: 'flex', gap: '4px' }}>
                <span style={{ color: experience.color }}>›</span>
                <span>{b}</span>
              </div>
            ))}
          </div>

          {/* Tech tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', marginTop: '8px' }}>
            {experience.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                style={{
                  fontSize: '8px',
                  padding: '1px 5px',
                  border: `1px solid ${experience.color}55`,
                  color: experience.color,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Html>
    </group>
  )
}

interface ExperienceTunnelProps {
  scrollOffset?: number
}

export function ExperienceTunnel({ scrollOffset = 0 }: ExperienceTunnelProps) {
  const tunnelRef = useRef<THREE.Mesh>(null)

  const tunnelMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: tunnelVertexShader,
        fragmentShader: tunnelFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Color('#00f0ff') },
        },
        transparent: true,
        side: THREE.BackSide,
        depthWrite: false,
      }),
    []
  )

  // Particle stream inside tunnel
  const { particlePositions } = useMemo(() => {
    const count = 300
    const particlePositions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * 1.5 + 0.2
      particlePositions[i * 3] = Math.cos(angle) * radius
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 10
      particlePositions[i * 3 + 2] = Math.sin(angle) * radius
    }
    return { particlePositions }
  }, [])

  useFrame(({ clock }) => {
    tunnelMaterial.uniforms.uTime.value = clock.elapsedTime
  })

  // Node Y positions along tunnel
  const nodeYPositions: [number, number, number][] = [
    [-2, 2.5, 0],
    [2, 0, 0],
    [-2, -2.5, 0],
  ]

  return (
    <group>
      {/* Tunnel cylinder */}
      <mesh ref={tunnelRef} rotation={[0, 0, 0]} material={tunnelMaterial}>
        <cylinderGeometry args={[3, 3, 12, 32, 8, true]} />
      </mesh>

      {/* Neon lines along tunnel */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const angle = (i / 8) * Math.PI * 2
        const x = Math.cos(angle) * 2.9
        const z = Math.sin(angle) * 2.9
        return (
          <Line
            key={i}
            points={[
              [x, -6, z],
              [x, 6, z],
            ]}
            color={i % 2 === 0 ? '#00f0ff' : '#8a2be2'}
            lineWidth={0.5}
            transparent
            opacity={0.3}
          />
        )
      })}

      {/* Circular rings inside tunnel */}
      {[-4, -2, 0, 2, 4].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.8, 3, 32]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#00f0ff' : '#8a2be2'}
            emissive={i % 2 === 0 ? '#00f0ff' : '#8a2be2'}
            emissiveIntensity={1}
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}

      {/* Particle stream */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00f0ff"
          size={0.04}
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Experience nodes */}
      {PORTFOLIO_DATA.experience.map((exp, i) => (
        <ExperienceNode
          key={exp.id}
          experience={exp}
          position={nodeYPositions[i]}
        />
      ))}

      {/* Ambient lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 6, 0]} color="#00f0ff" intensity={1} distance={10} />
      <pointLight position={[0, -6, 0]} color="#8a2be2" intensity={1} distance={10} />
    </group>
  )
}
