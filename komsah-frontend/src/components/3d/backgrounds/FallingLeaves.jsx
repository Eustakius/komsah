import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';

const noise3D = createNoise3D();

function Leaf({ position, rotation, scale, delay }) {
    const meshRef = useRef();
    const timeRef = useRef(delay);
    const fallSpeed = useRef(0.5 + Math.random() * 0.5);
    const swayAmplitude = useRef(0.5 + Math.random() * 1);
    const rotationSpeed = useRef((Math.random() - 0.5) * 2);

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        timeRef.current += delta;
        const time = timeRef.current;

        // Falling motion
        meshRef.current.position.y -= delta * fallSpeed.current;

        // Wind sway (using noise for organic movement)
        const windX = noise3D(time * 0.5, 0, 0) * swayAmplitude.current;
        const windZ = noise3D(0, time * 0.5, 0) * swayAmplitude.current;
        meshRef.current.position.x += windX * delta;
        meshRef.current.position.z += windZ * delta;

        // Rotation (tumbling)
        meshRef.current.rotation.x += rotationSpeed.current * delta;
        meshRef.current.rotation.z += rotationSpeed.current * delta * 0.5;

        // Reset when leaf falls too low
        if (meshRef.current.position.y < -10) {
            meshRef.current.position.y = 15 + Math.random() * 5;
            meshRef.current.position.x = position[0];
            meshRef.current.position.z = position[2];
        }

        // Decomposition effect (color change as it falls)
        const decompositionLevel = Math.max(0, (15 - meshRef.current.position.y) / 25);
        const leafColor = new THREE.Color().lerpColors(
            new THREE.Color('#558b2f'), // Fresh green
            new THREE.Color('#6d4c41'), // Decomposed brown
            decompositionLevel
        );
        meshRef.current.material.color = leafColor;
        meshRef.current.material.opacity = 1 - decompositionLevel * 0.5;
    });

    return (
        <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
            {/* Simple leaf shape */}
            <planeGeometry args={[0.3, 0.5]} />
            <meshStandardMaterial
                color="#558b2f"
                side={THREE.DoubleSide}
                transparent
                opacity={0.9}
                roughness={0.8}
            />
        </mesh>
    );
}

export default function FallingLeaves({ count = 100 }) {
    const leaves = useMemo(() => {
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            position: [
                (Math.random() - 0.5) * 40,
                Math.random() * 20,
                (Math.random() - 0.5) * 40,
            ],
            rotation: [
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI,
            ],
            scale: 0.5 + Math.random() * 0.5,
            delay: Math.random() * 10,
        }));
    }, [count]);

    return (
        <group>
            {leaves.map((leaf) => (
                <Leaf key={leaf.id} {...leaf} />
            ))}
        </group>
    );
}
