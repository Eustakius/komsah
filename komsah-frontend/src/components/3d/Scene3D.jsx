import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Environment, Sparkles } from '@react-three/drei';

function CyberPlant() {
    return (
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
            <group scale={1.2}>
                {/* Central Glowing Core */}
                <mesh>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshStandardMaterial
                        color="#4ade80"
                        emissive="#22c55e"
                        emissiveIntensity={2}
                        roughness={0.2}
                        metalness={0.8}
                        wireframe
                    />
                </mesh>

                {/* Orbiting Rings */}
                <mesh rotation={[Math.PI / 3, 0, 0]}>
                    <torusGeometry args={[1.8, 0.02, 16, 100]} />
                    <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
                </mesh>
                <mesh rotation={[-Math.PI / 3, 0, 0]}>
                    <torusGeometry args={[2.2, 0.02, 16, 100]} />
                    <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
                </mesh>

                {/* Floating DNA Particles */}
                <Sparkles count={50} scale={4} size={4} speed={0.4} opacity={0.5} color="#4ade80" />
            </group>
        </Float>
    );
}

export default function Scene3D() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#4ade80" />
            <CyberPlant />
            <Environment preset="city" />
        </>
    );
}
