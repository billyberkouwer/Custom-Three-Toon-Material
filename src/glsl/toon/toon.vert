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

	#include <color_vertex>
	#include <morphcolor_vertex>

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
