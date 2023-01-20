const displacementmap_vertex = /* glsl */ `
#ifdef USE_DISPLACEMENTMAP

	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );

#endif
`

export default displacementmap_vertex
