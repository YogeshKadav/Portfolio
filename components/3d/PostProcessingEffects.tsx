'use client'
import { EffectComposer, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

/**
 * Minimal post-processing for the vintage theme.
 * Bloom is intentionally removed — it caused particles to bleed
 * into content as giant glowing blobs.
 * Only a subtle vignette for depth.
 */
export function PostProcessingEffects() {
  return (
    <EffectComposer>
      <Vignette
        darkness={0.55}
        offset={0.28}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  )
}
