import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Animated Plant Component
function Plant({ position }) {
    const meshRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        // Gentle swaying motion
        meshRef.current.rotation.z = Math.sin(time * 0.5) * 0.1;
        meshRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.05;
    });

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <group ref={meshRef} position={position}>
                {/* Stem */}
                <mesh position={[0, -0.3, 0]}>
                    <cylinderGeometry args={[0.02, 0.03, 0.6, 8]} />
                    <meshStandardMaterial color="#2d5016" />
                </mesh>

                {/* Leaves */}
                {[0, 1, 2].map((i) => (
                    <mesh key={i} position={[0, -0.1 + i * 0.15, 0]} rotation={[0, (i * Math.PI) / 3, Math.PI / 4]}>
                        <sphereGeometry args={[0.15, 8, 8]} />
                        <meshStandardMaterial color="#16a34a" roughness={0.7} />
                    </mesh>
                ))}

                {/* Flower/Top */}
                <mesh position={[0, 0.4, 0]}>
                    <Sphere args={[0.12, 16, 16]}>
                        <MeshDistortMaterial
                            color="#fbbf24"
                            speed={2}
                            distort={0.3}
                            radius={1}
                        />
                    </Sphere>
                </mesh>
            </group>
        </Float>
    );
}

// Floating Particles (Seeds/Pollen)
function Particles() {
    const count = 50;
    const particlesRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        particlesRef.current.rotation.y = time * 0.05;
    });

    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial size={0.05} color="#16a34a" transparent opacity={0.6} />
        </points>
    );
}

// Main Agricultural Scene
export default function AgriScene3D() {
    return (
        <>
            {/* Warm Natural Lighting */}
            <ambientLight intensity={0.6} color="#fff5e1" />
            <directionalLight position={[5, 5, 5]} intensity={0.8} color="#fbbf24" castShadow />
            <pointLight position={[-5, 3, -5]} intensity={0.4} color="#0ea5e9" />

            {/* Background Stars (subtle) */}
            <Stars radius={100} depth={50} count={1000} factor={2} saturation={0} fade speed={0.5} />

            {/* Plants */}
            <Plant position={[-1.5, 0, 0]} />
            <Plant position={[0, 0, -1]} />
            <Plant position={[1.5, 0, 0.5]} />

            {/* Floating Particles */}
            <Particles />

            {/* Ground Plane */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]} receiveShadow>
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color="#92400e" roughness={0.9} />
            </mesh>
        </>
    );
}
