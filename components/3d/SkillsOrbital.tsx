'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Sphere, Line } from '@react-three/drei'
import * as THREE from 'three'
import { PORTFOLIO_DATA } from '@/lib/data'

interface SkillNodeProps {
  skill: string
  angle: number
  radius: number
  color: string
  ringTilt: number
  ringRotationRef: React.MutableRefObject<number>
  yOffset: number
}

function SkillNode({
  skill,
  angle,
  radius,
  color,
  ringTilt,
  ringRotationRef,
  yOffset,
}: SkillNodeProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!groupRef.current) return
    const currentAngle = angle + ringRotationRef.current
    const x = Math.cos(currentAngle) * radius
    const zBase = Math.sin(currentAngle) * radius
    const y = zBase * Math.sin(ringTilt * Math.PI / 180) + yOffset
    const z = zBase * Math.cos(ringTilt * Math.PI / 180)
    groupRef.current.position.set(x, y, z)
    groupRef.current.lookAt(0, y, 0)
  })

  return (
    <group ref={groupRef}>
      <Sphere args={[0.12, 16, 16]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.5}
          transparent
          opacity={0.9}
        />
      </Sphere>
      <Text
        position={[0, 0.25, 0]}
        fontSize={0.12}
        color={color}
        anchorX="center"
        anchorY="bottom"
        maxWidth={1.5}
        outlineWidth={0.003}
        outlineColor={color}
      >
        {skill}
      </Text>
    </group>
  )
}

interface OrbitalRingProps {
  skills: string[]
  radius: number
  color: string
  tiltDegrees: number
  rotationSpeed: number
  yOffset: number
}

function OrbitalRing({
  skills,
  radius,
  color,
  tiltDegrees,
  rotationSpeed,
  yOffset,
}: OrbitalRingProps) {
  const rotationRef = useRef(0)
  const ringMeshRef = useRef<THREE.Mesh>(null)

  const ringPoints = useMemo(() => {
    const pts: [number, number, number][] = []
    const segments = 64
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      const x = Math.cos(angle) * radius
      const zBase = Math.sin(angle) * radius
      const y = zBase * Math.sin((tiltDegrees * Math.PI) / 180) + yOffset
      const z = zBase * Math.cos((tiltDegrees * Math.PI) / 180)
      pts.push([x, y, z])
    }
    return pts
  }, [radius, tiltDegrees, yOffset])

  useFrame(({ clock }) => {
    rotationRef.current = clock.elapsedTime * rotationSpeed
  })

  return (
    <group>
      {/* Ring line */}
      <Line
        points={ringPoints}
        color={color}
        lineWidth={0.5}
        transparent
        opacity={0.3}
      />

      {/* Skill nodes */}
      {skills.map((skill, i) => (
        <SkillNode
          key={skill}
          skill={skill}
          angle={(i / skills.length) * Math.PI * 2}
          radius={radius}
          color={color}
          ringTilt={tiltDegrees}
          ringRotationRef={rotationRef}
          yOffset={yOffset}
        />
      ))}
    </group>
  )
}

export function SkillsOrbital() {
  const centerPulseRef = useRef<THREE.Mesh>(null)
  const outerGlowRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (centerPulseRef.current) {
      const mat = centerPulseRef.current.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = 1.5 + Math.sin(t * 2) * 0.8
    }
    if (outerGlowRef.current) {
      const scale = 1 + Math.sin(t * 1.5) * 0.08
      outerGlowRef.current.scale.setScalar(scale)
    }
  })

  return (
    <group>
      {/* Center sphere */}
      <Sphere ref={centerPulseRef} args={[0.5, 32, 32]}>
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={2}
          transparent
          opacity={0.9}
        />
      </Sphere>

      {/* Outer glow sphere */}
      <Sphere ref={outerGlowRef} args={[0.7, 32, 32]}>
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={0.3}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Center label */}
      <Text
        position={[0, 0, 0.55]}
        fontSize={0.14}
        color="#00f0ff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.003}
        outlineColor="#00f0ff"
      >
        YOGESH
      </Text>

      {/* Center point light */}
      <pointLight color="#00f0ff" intensity={3} distance={6} />

      {/* Ring 1: Languages (inner, horizontal) */}
      <OrbitalRing
        skills={PORTFOLIO_DATA.skills.languages}
        radius={2.2}
        color="#00f0ff"
        tiltDegrees={0}
        rotationSpeed={0.3}
        yOffset={0}
      />

      {/* Ring 2: Frameworks (middle, tilted 30°) */}
      <OrbitalRing
        skills={PORTFOLIO_DATA.skills.frameworks}
        radius={3.5}
        color="#8a2be2"
        tiltDegrees={30}
        rotationSpeed={0.2}
        yOffset={0}
      />

      {/* Ring 3: Cloud & Tools (outer, tilted 60°) */}
      <OrbitalRing
        skills={[...PORTFOLIO_DATA.skills.cloud, ...PORTFOLIO_DATA.skills.microsoft365.slice(0, 2)]}
        radius={4.8}
        color="#ff00ff"
        tiltDegrees={60}
        rotationSpeed={0.15}
        yOffset={0}
      />

      {/* Ambient light for scene */}
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} color="#8a2be2" intensity={1} distance={15} />
      <pointLight position={[-5, -5, -5]} color="#ff00ff" intensity={0.5} distance={15} />
    </group>
  )
}
