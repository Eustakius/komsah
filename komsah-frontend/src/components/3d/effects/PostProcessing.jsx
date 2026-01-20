import { EffectComposer, Bloom, DepthOfField, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

export default function PostProcessing({ enableBloom = true, enableDOF = false }) {
    return (
        <EffectComposer>
            {/* Bloom for glowing particles and highlights */}
            {enableBloom && (
                <Bloom
                    intensity={0.5}
                    luminanceThreshold={0.2}
                    luminanceSmoothing={0.9}
                    height={300}
                    blendFunction={BlendFunction.ADD}
                />
            )}

            {/* Depth of Field for focus effect */}
            {enableDOF && (
                <DepthOfField
                    focusDistance={0.01}
                    focalLength={0.05}
                    bokehScale={3}
                    height={480}
                />
            )}

            {/* Vignette for cinematic feel */}
            <Vignette
                offset={0.3}
                darkness={0.5}
                eskil={false}
                blendFunction={BlendFunction.NORMAL}
            />
        </EffectComposer>
    );
}
