const uv2_pars_fragment = /* glsl */ `
#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )

	varying vec2 vUv2;

#endif
`

export default uv2_pars_fragment
