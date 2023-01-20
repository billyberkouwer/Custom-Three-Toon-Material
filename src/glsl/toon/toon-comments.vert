#define TOON

varying vec3 vViewPosition;

#include <common>
#include <uv_pars_vertex>
// #include <uv2_pars_vertex>/
// #include <displacementmap_pars_vertex>
// #include <color_pars_vertex>
// #include <fog_pars_vertex>
#include <normal_pars_vertex>
// #include <morphtarget_pars_vertex>
// #include <skinning_pars_vertex>
// #include <shadowmap_pars_vertex>
// #include <logdepthbuf_pars_vertex>
// #include <clipping_planes_pars_vertex>

varying vec3 vViewDir;

void main() {
	#include <uv_vertex>
    // vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
    
	// #include <uv2_vertex>
	// #include <color_vertex>
	// #include <morphcolor_vertex>

	// #include <beginnormal_vertex>
    vec3 objectNormal = vec3( normal );
    #ifdef USE_TANGENT
        vec3 objectTangent = vec3( tangent.xyz );
    #endif

	// #include <morphnormal_vertex>
	// #include <skinbase_vertex>
	// #include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	// #include <normal_vertex>
    #ifndef FLAT_SHADED // normal is computed with derivatives when FLAT_SHADED
        vNormal = normalize( transformedNormal );
        #ifdef USE_TANGENT
            vTangent = normalize( transformedTangent );
            vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
        #endif
    #endif

	#include <begin_vertex>
    // vec3 transformed = vec3( position );

	// #include <morphtarget_vertex>
	// #include <skinning_vertex>
	// #include <displacementmap_vertex>

    

	// #include <project_vertex>
    vec4 mvPosition = vec4( transformed, 1.0 );
    mvPosition = modelViewMatrix * mvPosition;
    
    
    vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(-mvPosition.xyz);
    
    
    gl_Position = projectionMatrix * mvPosition;

	// #include <logdepthbuf_vertex>
	// #include <clipping_planes_vertex>

	// vViewPosition = - mvPosition.xyz;
	
    // #include <worldpos_vertex>
	// #include <shadowmap_vertex>
	// #include <fog_vertex>
}