import { EffectComposer, Bloom, Vignette, SMAA } from '@react-three/postprocessing';
import { BlendFunction, KernelSize } from 'postprocessing';

export default function ArcanePostProcessing({ enableBloom = true }) {
    return (
        <EffectComposer multisampling={0}> {/* Disable multisampling for performance */}
            {/* Simplified bloom */}
            {enableBloom && (
                <Bloom
                    intensity={0.8}
                    luminanceThreshold={0.2}
                    luminanceSmoothing={0.8}
                    height={300}
                    kernelSize={KernelSize.SMALL} // Smaller kernel for performance
                    blendFunction={BlendFunction.ADD}
                />
            )}

            {/* Vignette only (removed chromatic aberration for performance) */}
            <Vignette
                offset={0.2}
                darkness={0.5}
                eskil={false}
                blendFunction={BlendFunction.NORMAL}
            />

            {/* SMAA for anti-aliasing */}
            <SMAA />
        </EffectComposer>
    );
}
