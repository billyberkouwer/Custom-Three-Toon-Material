import begin_vertex from './chunks/begin_vertex.glsl'
import beginnormal_vertex from './chunks/beginnormal_vertex.glsl'
import clipping_planes_pars_vertex from './chunks/clipping_planes_pars_vertex.glsl'
import clipping_planes_vertex from './chunks/clipping_planes_vertex.glsl'
import color_pars_vertex from './chunks/color_pars_vertex.glsl'
import color_vertex from './chunks/color_vertex.glsl'
import common from './chunks/common.glsl'
import defaultnormal_vertex from './chunks/defaultnormal_vertex.glsl'
import displacementmap_pars_vertex from './chunks/displacementmap_pars_vertex.glsl'
import displacementmap_vertex from './chunks/displacementmap_vertex.glsl'
import fog_pars_vertex from './chunks/fog_pars_vertex.glsl'
import logdepthbuf_pars_vertex from './chunks/logdepthbuf_pars_vertex.glsl'
import logdepthbuf_vertex from './chunks/logdepthbuf_vertex.glsl'
import morphcolor_vertex from './chunks/morphcolor_vertex.glsl'
import morphnormal_vertex from './chunks/morphnormal_vertex.glsl'
import morphtarget_pars_vertex from './chunks/morphtarget_pars_vertex.glsl'
import morphtarget_vertex from './chunks/morphtarget_vertex.glsl'
import normal_pars_vertex from './chunks/normal_pars_vertex.glsl'
import normal_vertex from './chunks/normal_vertex.glsl'
import project_vertex from './chunks/project_vertex.glsl'
import shadowmap_pars_vertex from './chunks/shadowmap_pars_vertex.glsl'
import skinbase_vertex from './chunks/skinbase_vertex.glsl'
import skinning_pars_vertex from './chunks/skinning_pars_vertex.glsl'
import skinning_vertex from './chunks/skinning_vertex.glsl'
import skinnormal_vertex from './chunks/skinnormal_vertex.glsl'
import uv_pars_vertex from './chunks/uv_pars_vertex.glsl'
import uv_vertex from './chunks/uv_vertex.glsl'
import uv2_pars_vertex from './chunks/uv2_pars_vertex.glsl'
import uv2_vertex from './chunks/uv2_vertex.glsl'

const vertexShader = /* glsl */ `
#define TOON

varying vec3 vViewPosition;

${common}
${uv_pars_vertex}

${uv2_pars_vertex} // added
${displacementmap_pars_vertex} // added
${color_pars_vertex} // added
${fog_pars_vertex} // added

${normal_pars_vertex}
${morphtarget_pars_vertex}
${skinning_pars_vertex}
${shadowmap_pars_vertex}

${logdepthbuf_pars_vertex} // added

${clipping_planes_pars_vertex}

varying vec3 vViewDir;
varying vec2 v_uv;

void main() {
	${uv_vertex}
	v_uv = uv;
	${uv2_vertex} // added

	// ${color_vertex}
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

	// ${morphcolor_vertex}
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

	${beginnormal_vertex}

	${morphnormal_vertex}
	${skinbase_vertex}
	${skinnormal_vertex}

	${defaultnormal_vertex}
	${normal_vertex}
	${begin_vertex}

	${morphtarget_vertex}
	${skinning_vertex}

	${displacementmap_vertex} // added

	${project_vertex}

	${logdepthbuf_vertex} // added
	${clipping_planes_vertex} // added 

	// vViewPosition = -mvPosition.xyz;

    // vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(-mvPosition.xyz);

	// ${clipping_planes_vertex} // removed
      
    gl_Position = projectionMatrix * mvPosition;
}
`

export default vertexShader
