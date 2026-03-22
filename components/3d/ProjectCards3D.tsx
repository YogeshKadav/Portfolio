'use client'
import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Html } from '@react-three/drei'
import * as THREE from 'three'
import { Project } from '@/lib/data'

interface ProjectCardProps {
  project: Project
  index: number
  total: number
  radius?: number
}

function ProjectCard({ project, index, total, radius = 5.5 }: ProjectCardProps) {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  const baseAngle = (index / total) * Math.PI * 2
  const baseX = Math.cos(baseAngle) * radius
  const baseZ = Math.sin(baseAngle) * radius

  // Canvas texture for card face
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 680

    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    // Background
    ctx.fillStyle = '#0a0a1a'
    ctx.fillRect(0, 0, 512, 680)

    // Top color bar
    ctx.fillStyle = project.color
    ctx.globalAlpha = 0.8
    ctx.fillRect(0, 0, 512, 6)
    ctx.globalAlpha = 1

    // Border glow effect
    ctx.strokeStyle = project.color
    ctx.lineWidth = 2
    ctx.globalAlpha = 0.6
    ctx.strokeRect(1, 1, 510, 678)
    ctx.globalAlpha = 1

    // Category badge
    ctx.fillStyle = project.color + '33'
    ctx.fillRect(24, 28, 120, 28)
    ctx.strokeStyle = project.color
    ctx.lineWidth = 1
    ctx.strokeRect(24, 28, 120, 28)
    ctx.fillStyle = project.color
    ctx.font = 'bold 16px "Share Tech Mono", monospace'
    ctx.fillText(project.category.toUpperCase(), 36, 48)

    // Title
    ctx.fillStyle = '#e0e0e0'
    ctx.font = 'bold 28px "Orbitron", sans-serif'
    const titleLines = wrapText(ctx, project.title, 460, 28)
    titleLines.forEach((line, i) => {
      ctx.fillText(line, 24, 110 + i * 36)
    })

    // Divider
    ctx.strokeStyle = project.color
    ctx.lineWidth = 1
    ctx.globalAlpha = 0.4
    ctx.beginPath()
    ctx.moveTo(24, 190)
    ctx.lineTo(488, 190)
    ctx.stroke()
    ctx.globalAlpha = 1

    // Description
    ctx.fillStyle = '#aaaaaa'
    ctx.font = '18px "Share Tech Mono", monospace'
    const descLines = wrapText(ctx, project.description, 464, 18)
    descLines.slice(0, 4).forEach((line, i) => {
      ctx.fillText(line, 24, 220 + i * 26)
    })

    // Tech tags
    let tagX = 24
    let tagY = 560
    ctx.font = '14px "Share Tech Mono", monospace'
    project.tech.forEach((t) => {
      const tw = ctx.measureText(t).width + 20
      if (tagX + tw > 488) {
        tagX = 24
        tagY += 32
      }
      ctx.fillStyle = project.color + '22'
      ctx.fillRect(tagX, tagY, tw, 24)
      ctx.strokeStyle = project.color
      ctx.lineWidth = 1
      ctx.globalAlpha = 0.5
      ctx.strokeRect(tagX, tagY, tw, 24)
      ctx.globalAlpha = 1
      ctx.fillStyle = project.color
      ctx.fillText(t, tagX + 10, tagY + 17)
      tagX += tw + 8
    })

    const tex = new THREE.CanvasTexture(canvas)
    return tex
  }, [project])

  const edgesMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: hovered ? project.color : project.color,
        transparent: true,
        opacity: hovered ? 1 : 0.4,
      }),
    [hovered, project.color]
  )

  useFrame(({ clock, camera }) => {
    if (!groupRef.current) return
    const t = clock.elapsedTime
    const floatY = Math.sin(t * 0.8 + index * 1.2) * 0.1
    const targetScale = hovered ? 1.15 : 1
    const currentScale = groupRef.current.scale.x
    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(currentScale, targetScale, 0.08)
    )
    groupRef.current.position.set(baseX, floatY, baseZ)
    groupRef.current.lookAt(camera.position.x, groupRef.current.position.y, camera.position.z)
  })

  return (
    <group ref={groupRef} position={[baseX, 0, baseZ]}>
      {/* Card mesh */}
      <mesh
        ref={meshRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
      >
        <boxGeometry args={[2.8, 3.8, 0.08]} />
        <meshPhysicalMaterial
          map={texture}
          emissive={new THREE.Color(project.color)}
          emissiveIntensity={hovered ? 0.15 : 0.05}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Neon edge glow */}
      {hovered && (
        <pointLight
          color={project.color}
          intensity={3}
          distance={3}
        />
      )}

      {/* Hover detail overlay */}
      {clicked && (
        <Html
          position={[0, 0, 0.15]}
          center
          style={{ pointerEvents: 'auto' }}
          distanceFactor={6}
        >
          <div
            style={{
              background: 'rgba(5, 5, 5, 0.97)',
              border: `1px solid ${project.color}`,
              borderRadius: '4px',
              padding: '16px',
              width: '220px',
              fontFamily: 'Share Tech Mono, monospace',
              color: '#e0e0e0',
              boxShadow: `0 0 20px ${project.color}66`,
            }}
          >
            <div
              style={{
                color: project.color,
                fontSize: '11px',
                fontWeight: 'bold',
                marginBottom: '8px',
              }}
            >
              {project.title}
            </div>
            <div style={{ fontSize: '10px', color: '#888', marginBottom: '10px', lineHeight: 1.5 }}>
              {project.description}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {project.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: '9px',
                    padding: '2px 6px',
                    border: `1px solid ${project.color}66`,
                    color: project.color,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            <button
              onClick={() => setClicked(false)}
              style={{
                marginTop: '10px',
                background: 'transparent',
                border: `1px solid ${project.color}`,
                color: project.color,
                fontSize: '9px',
                padding: '4px 10px',
                cursor: 'pointer',
                fontFamily: 'Share Tech Mono, monospace',
                width: '100%',
              }}
            >
              CLOSE
            </button>
          </div>
        </Html>
      )}
    </group>
  )
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, _size: number): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let current = ''

  for (const word of words) {
    const test = current ? `${current} ${word}` : word
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current)
      current = word
    } else {
      current = test
    }
  }
  if (current) lines.push(current)
  return lines
}

interface ProjectCards3DProps {
  projects: Project[]
}

export function ProjectCards3D({ projects }: ProjectCards3DProps) {
  return (
    <group>
      {projects.map((project, i) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={i}
          total={projects.length}
          radius={5.5}
        />
      ))}
      {/* Center light */}
      <pointLight color="#00f0ff" intensity={2} distance={12} />
    </group>
  )
}
