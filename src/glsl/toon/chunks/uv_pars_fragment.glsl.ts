const uv_pars_fragment = /* glsl */ `
#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )

	varying vec2 vUv;

#endif
`

export default uv_pars_fragment
