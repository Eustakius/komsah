import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Stars, Sky, useScroll } from '@react-three/drei';
import * as THREE from 'three';
import SoilParticleField from './backgrounds/SoilParticleField';
import ArcaneStyledLeaves from './backgrounds/ArcaneStyledLeaves';
import ArcanePlant from './ArcanePlant';

// OPTIMIZED: Main Agricultural Scene
export default function AgriScene3D() {
    const { viewport } = useThree();
    const scroll = useScroll();

    // Calculate health level
    const healthLevel = scroll ? Math.min(scroll.offset * 2, 1) : 0.5;

    return (
        <>
            {/* Sky */}
            <Sky
                distance={450000}
                sunPosition={[100, 20, 100]}
                inclination={0.6}
                azimuth={0.25}
                rayleigh={0.6}
                turbidity={8}
                mieCoefficient={0.005}
                mieDirectionalG={0.8}
            />

            {/* OPTIMIZED: Simplified Lighting (fewer lights) */}
            <ambientLight intensity={0.4} color="#fff5e1" />

            {/* Single directional light */}
            <directionalLight
                position={[10, 10, 5]}
                intensity={1.2}
                color="#ffb74d"
                castShadow
                shadow-mapSize-width={1024} // Reduced shadow resolution
                shadow-mapSize-height={1024}
            />

            {/* Single accent light */}
            <pointLight position={[-5, 5, -5]} intensity={0.4} color="#81d4fa" />

            {/* OPTIMIZED: Fewer stars */}
            <Stars
                radius={100}
                depth={50}
                count={500} // Reduced from 1500
                factor={2}
                saturation={0.2}
                fade
                speed={0.3}
            />

            {/* OPTIMIZED: Reduced particle count */}
            <SoilParticleField count={50000} healthLevel={healthLevel} />

            {/* OPTIMIZED: Fewer leaves */}
            <ArcaneStyledLeaves count={50} />

            {/* OPTIMIZED: Fewer plants */}
            <ArcanePlant position={[-2, 0, -2]} />
            <ArcanePlant position={[0, 0, -2.5]} />
            <ArcanePlant position={[2, 0, -1]} />
            <ArcanePlant position={[-1, 0, 0.5]} />
            <ArcanePlant position={[1.5, 0, 0]} />

            {/* OPTIMIZED: Simplified ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} /> {/* Removed segments */}
                <meshStandardMaterial
                    color="#5d4037"
                    roughness={0.95}
                    metalness={0.05}
                />
            </mesh>

            {/* Fog */}
            <fog attach="fog" args={['#e8f5e9', 15, 60]} />
        </>
    );
}
