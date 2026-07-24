import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'

interface ShardProps {
  count?: number
}

function Shards({ count = 40 }: ShardProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  const dummy = useMemo(() => new THREE.Object3D(), [])

  // Generate random positions, scales, and rotations
  const shardData = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
      ] as [number, number, number],
      scale: 0.3 + Math.random() * 0.5,
      rotationSpeed: [
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
      ] as [number, number, number],
      initialRotation: [
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
      ] as [number, number, number],
    }))
  }, [count])

  // Mouse tracking
  useMemo(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return

    const time = state.clock.getElapsedTime()

    // Rotate entire group slowly + mouse influence
    const targetRotY = mouseRef.current.x * 0.15
    const targetRotX = mouseRef.current.y * 0.1
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.05
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.05
    groupRef.current.rotation.y += 0.001

    // Update individual shards
    shardData.forEach((shard, i) => {
      dummy.position.set(...shard.position)
      dummy.scale.setScalar(shard.scale)
      dummy.rotation.set(
        shard.initialRotation[0] + time * shard.rotationSpeed[0] * 60,
        shard.initialRotation[1] + time * shard.rotationSpeed[1] * 60,
        shard.initialRotation[2] + time * shard.rotationSpeed[2] * 60
      )
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })

    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <icosahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color="#9B2D30"
          transmission={0.92}
          thickness={1.5}
          roughness={0.05}
          metalness={0.15}
          ior={1.9}

          clearcoat={1}
          clearcoatRoughness={0.1}
          transparent
          opacity={0.85}
        />
      </instancedMesh>
    </group>
  )
}

export default function ShardField() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        orthographic
        camera={{ position: [30, 30, 30], zoom: 30, near: 0.1, far: 1000 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={1.2} />
        <pointLight position={[20, 20, 20]} intensity={3} color="#FFF5EE" />
        <pointLight position={[-20, -20, -20]} intensity={1.5} color="#C45C5F" />
        <pointLight position={[0, -15, 10]} intensity={1} color="#D4A017" />
        <Shards count={35} />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
