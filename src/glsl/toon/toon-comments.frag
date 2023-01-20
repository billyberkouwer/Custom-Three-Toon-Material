#define TOON

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;

#include <common>
// #include <packing>
// #include <dithering_pars_fragment>
// #include <color_pars_fragment>
#include <uv_pars_fragment>
// #include <uv2_pars_fragment>
#include <map_pars_fragment>
// #include <alphamap_pars_fragment>
// #include <alphatest_pars_fragment>
// #include <aomap_pars_fragment>
// #include <lightmap_pars_fragment>
// #include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
// #include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
// #include <shadowmap_pars_fragment>
// #include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
// #include <logdepthbuf_pars_fragment>
// #include <clipping_planes_pars_fragment>

varying vec3 vViewDir;

void main() {
	// #include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	
    vec3 totalEmissiveRadiance = emissive;
	
    // #include <logdepthbuf_fragment>
	#include <map_fragment>
	// #include <color_fragment>
	// #include <alphamap_fragment>
	// #include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
    // vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
    // mapN.xy *= normalScale;
    // normal = normalize( vTBN * mapN );

	// #include <emissivemap_fragment>
	
    // accumulation
	#include <lights_toon_fragment>
    // ToonMaterial material;
    // material.diffuseColor = diffuseColor.rgb;

	#include <lights_fragment_begin>
    // https://github.com/mrdoob/three.js/blob/master/src/renderers/shaders/ShaderChunk/lights_fragment_begin.glsl.js

	// #include <lights_fragment_maps>
	#include <lights_fragment_end>
    // RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
	
    // modulation
	// #include <aomap_fragment>

    float NdotL = dot(vNormal, directionalLights[0].direction);
    float rimDot = 1.0 - dot(vViewDir, vNormal);
    float rimAmount = 0.4;

    float rimThreshold = 0.;
    float rimIntensity = rimDot * pow(NdotL, rimThreshold);
    rimIntensity = smoothstep(rimAmount - 0.01, rimAmount + 0.01, rimIntensity);

    vec3 rim = vec3(rimIntensity * diffuseColor.rgb * 1.5);
	
    vec3 outgoingLight = (reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance - rim);
	// uColor * (ambientLightColor + light + specular - rim)


    #include <output_fragment>
    // #ifdef OPAQUE
    //     diffuseColor.a = 1.0;
    // #endif
    // https://github.com/mrdoob/three.js/pull/22425
    // #ifdef USE_TRANSMISSION
    //     diffuseColor.a *= material.transmissionAlpha + 0.1;
    // #endif
    // gl_FragColor = vec4( outgoingLight, diffuseColor.a ); <- this does something


	#include <tonemapping_fragment>
    // #if defined( TONE_MAPPING )
    //     gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
    // #endif

	#include <encodings_fragment>
    // gl_FragColor = linearToOutputTexel( gl_FragColor );



	// #include <fog_fragment>
	// #include <premultiplied_alpha_fragment>
	// #include <dithering_fragment>
}