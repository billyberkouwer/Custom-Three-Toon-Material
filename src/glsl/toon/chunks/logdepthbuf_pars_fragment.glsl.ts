const logdepthbuf_pars_fragment = /* glsl */ `
#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )

	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;

#endif
`

export default logdepthbuf_pars_fragment
