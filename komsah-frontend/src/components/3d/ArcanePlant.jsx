import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// OPTIMIZED: Simplified material (MeshToonMaterial for cel-shading without custom shader)
function RealisticLeaf3D({ position, rotation, scale }) {
    const leafShape = new THREE.Shape();
    leafShape.moveTo(0, 0);
    leafShape.bezierCurveTo(0.3, 0.2, 0.5, 0.5, 0.4, 0.8);
    leafShape.bezierCurveTo(0.2, 0.9, 0.1, 0.9, 0, 0.85);
    leafShape.bezierCurveTo(-0.1, 0.9, -0.2, 0.9, -0.4, 0.8);
    leafShape.bezierCurveTo(-0.5, 0.5, -0.3, 0.2, 0, 0);

    const leafGeometry = useMemo(() => new THREE.ExtrudeGeometry(leafShape, {
        depth: 0.02,
        bevelEnabled: false, // Disable for performance
    }), []);

    return (
        <mesh position={position} rotation={rotation} scale={scale} geometry={leafGeometry}>
            <meshToonMaterial color="#558b2f" side={THREE.DoubleSide} />
        </mesh>
    );
}

// OPTIMIZED: Reduced plant complexity
export default function ArcanePlant({ position }) {
    const groupRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        // Simplified animation
        groupRef.current.rotation.z = Math.sin(time * 0.5) * 0.05;
    });

    return (
        <Float speed={1} rotationIntensity={0.05} floatIntensity={0.2}>
            <group ref={groupRef} position={position}>
                {/* Main Stem */}
                <mesh position={[0, 0.5, 0]}>
                    <cylinderGeometry args={[0.03, 0.05, 1, 6]} />
                    <meshToonMaterial color="#5d4037" />
                </mesh>

                {/* Reduced number of leaves for performance */}
                <RealisticLeaf3D position={[0.2, 0.85, 0]} rotation={[0, 0, Math.PI / 4]} scale={0.7} />
                <RealisticLeaf3D position={[-0.2, 0.75, 0]} rotation={[0, 0, -Math.PI / 4]} scale={0.6} />
                <RealisticLeaf3D position={[0, 1.0, 0]} rotation={[0, 0, 0]} scale={0.8} />

                {/* Flower */}
                <mesh position={[0, 1.15, 0]}>
                    <sphereGeometry args={[0.08, 8, 8]} />
                    <meshToonMaterial color="#ffb74d" emissive="#ffb74d" emissiveIntensity={0.3} />
                </mesh>
            </group>
        </Float>
    );
}
