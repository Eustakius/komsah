import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SoilParticleField({ count = 50000, healthLevel = 0.5 }) {
    const pointsRef = useRef();
    const timeRef = useRef(0);

    // Generate particle positions (OPTIMIZED: reduced count)
    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Spread particles in a large volume
            positions[i3] = (Math.random() - 0.5) * 50;
            positions[i3 + 1] = (Math.random() - 0.5) * 30;
            positions[i3 + 2] = (Math.random() - 0.5) * 50;

            // Size variation
            sizes[i] = Math.random() * 0.5 + 0.1;

            // Initial color
            colors[i3] = 0.3;
            colors[i3 + 1] = 0.2;
            colors[i3 + 2] = 0.15;
        }

        return { positions, colors, sizes };
    }, [count]);

    // OPTIMIZED: Simplified shader (less GPU load)
    const shaderMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                healthLevel: { value: healthLevel },
                colorUnhealthy: { value: new THREE.Color('#3e2723') },
                colorHealthy: { value: new THREE.Color('#aed581') },
            },
            vertexShader: `
                attribute float size;
                varying vec3 vColor;
                uniform float time;
                uniform float healthLevel;
                uniform vec3 colorUnhealthy;
                uniform vec3 colorHealthy;

                void main() {
                    vColor = mix(colorUnhealthy, colorHealthy, healthLevel);

                    // Simplified movement (less computation)
                    vec3 pos = position;
                    pos.y += sin(pos.x * 0.1 + time) * healthLevel;

                    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                    gl_PointSize = size * (200.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                
                void main() {
                    // Simple circular particle
                    vec2 center = gl_PointCoord - vec2(0.5);
                    float dist = length(center);
                    if (dist > 0.5) discard;

                    float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
                    gl_FragColor = vec4(vColor, alpha * 0.6);
                }
            `,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });
    }, [healthLevel]);

    // OPTIMIZED: Reduced animation frequency
    useFrame((state, delta) => {
        if (!pointsRef.current) return;

        timeRef.current += delta * 0.2; // Slower animation
        shaderMaterial.uniforms.time.value = timeRef.current;
        shaderMaterial.uniforms.healthLevel.value = healthLevel;

        // Minimal rotation
        pointsRef.current.rotation.y += delta * 0.01;
    });

    return (
        <points ref={pointsRef} frustumCulled={true}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={particles.positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-size"
                    count={count}
                    array={particles.sizes}
                    itemSize={1}
                />
            </bufferGeometry>
            <primitive object={shaderMaterial} attach="material" />
        </points>
    );
}
