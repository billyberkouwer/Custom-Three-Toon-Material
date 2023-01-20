#define TOON

varying vec3 vViewPosition;

#include <common>
#include <uv_pars_vertex>

#include <uv2_pars_vertex> // added
#include <displacementmap_pars_vertex> // added
#include <color_pars_vertex> // added
#include <fog_pars_vertex> // added

#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>

#include <logdepthbuf_pars_vertex> // added

#include <clipping_planes_pars_vertex>

varying vec3 vViewDir;
varying vec2 v_uv;

void main() {
	#include <uv_vertex>
	v_uv = uv;
	#include <uv2_vertex> // added

	// #include <color_vertex>
	#if defined( USE_COLOR_ALPHA )
		vColor = vec4( 1.0 );
	#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
		vColor = vec3( 1.0 );
	#endif
	#ifdef USE_COLOR
		vColor *= color;
	#endif
	#ifdef USE_INSTANCING_COLOR
		vColor.xyz *= instanceColor.xyz;
	#endif

	// #include <morphcolor_vertex>
	#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
		// morphTargetBaseInfluence is set based on BufferGeometry.morphTargetsRelative value:
		// When morphTargetsRelative is false, this is set to 1 - sum(influences); this results in normal = sum((target - base) * influence)
		// When morphTargetsRelative is true, this is set to 1; as a result, all morph targets are simply added to the base after weighting
		vColor *= morphTargetBaseInfluence;
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			#if defined( USE_COLOR_ALPHA )
				if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
			#elif defined( USE_COLOR )
				if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
			#endif
		}
	#endif

	#include <beginnormal_vertex>

	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>

	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>

	#include <morphtarget_vertex>
	#include <skinning_vertex>

	#include <displacementmap_vertex> // added

	#include <project_vertex>

	#include <logdepthbuf_vertex> // added
	#include <clipping_planes_vertex> // added


	// vViewPosition = - mvPosition.xyz;
    
    // vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(-mvPosition.xyz);

	// #include <clipping_planes_vertex> // removed

    gl_Position = projectionMatrix * mvPosition;
}
