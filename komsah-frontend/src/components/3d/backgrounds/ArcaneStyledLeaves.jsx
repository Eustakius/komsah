import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// OPTIMIZED: Using InstancedMesh for better performance
export default function ArcaneStyledLeaves({ count = 50 }) {
    const meshRef = useRef();
    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Leaf data
    const leafData = useMemo(() => {
        return Array.from({ length: count }, () => ({
            x: (Math.random() - 0.5) * 40,
            y: Math.random() * 20,
            z: (Math.random() - 0.5) * 40,
            rotX: Math.random() * Math.PI,
            rotY: Math.random() * Math.PI,
            rotZ: Math.random() * Math.PI,
            scale: 0.3 + Math.random() * 0.3,
            fallSpeed: 0.3 + Math.random() * 0.3,
            swaySpeed: 0.3 + Math.random() * 0.5,
            rotSpeed: (Math.random() - 0.5) * 1.5,
        }));
    }, [count]);

    // Simplified leaf geometry
    const leafGeometry = useMemo(() => {
        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.bezierCurveTo(0.5, 0.3, 0.8, 0.8, 0.6, 1.5);
        shape.bezierCurveTo(0.4, 1.8, 0.2, 1.8, 0, 1.6);
        shape.bezierCurveTo(-0.2, 1.8, -0.4, 1.8, -0.6, 1.5);
        shape.bezierCurveTo(-0.8, 0.8, -0.5, 0.3, 0, 0);

        return new THREE.ExtrudeGeometry(shape, {
            depth: 0.02,
            bevelEnabled: false, // Disable bevel for performance
        });
    }, []);

    // Simplified material (no custom shader for performance)
    const leafMaterial = useMemo(() => {
        return new THREE.MeshStandardMaterial({
            color: '#558b2f',
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.9,
            roughness: 0.8,
        });
    }, []);

    // Animate leaves
    useFrame((state, delta) => {
        if (!meshRef.current) return;

        const time = state.clock.getElapsedTime();

        leafData.forEach((leaf, i) => {
            // Update position
            leaf.y -= delta * leaf.fallSpeed;

            // Simple sway
            const swayX = Math.sin(time * leaf.swaySpeed) * 0.3;
            const swayZ = Math.cos(time * leaf.swaySpeed) * 0.3;

            // Rotation
            leaf.rotX += leaf.rotSpeed * delta;
            leaf.rotZ += leaf.rotSpeed * delta * 0.5;

            // Reset if too low
            if (leaf.y < -10) {
                leaf.y = 15 + Math.random() * 5;
            }

            // Update instance matrix
            dummy.position.set(leaf.x + swayX, leaf.y, leaf.z + swayZ);
            dummy.rotation.set(leaf.rotX, leaf.rotY, leaf.rotZ);
            dummy.scale.setScalar(leaf.scale);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh
            ref={meshRef}
            args={[leafGeometry, leafMaterial, count]}
            frustumCulled={true}
        />
    );
}
