#define TOON

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;

#include <common>
#include <packing>

#include <dithering_pars_fragment> // added
#include <color_pars_fragment> // added

#include <uv_pars_fragment>

#include <uv2_pars_fragment> // added

#include <map_pars_fragment>

#include <alphamap_pars_fragment> // added
#include <alphatest_pars_fragment> // added
#include <aomap_pars_fragment> // added
#include <lightmap_pars_fragment> // added
#include <emissivemap_pars_fragment> // added

#include <gradientmap_pars_fragment>

#include <fog_pars_fragment> // added

#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>

#include <bumpmap_pars_fragment> // added

#include <normalmap_pars_fragment>

#include <logdepthbuf_pars_fragment> // added

#include <shadowmask_pars_fragment>
#include <clipping_planes_pars_fragment>

varying vec3 vViewDir;

void main() {
    #include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	
    vec3 totalEmissiveRadiance = emissive;
	
	#include <map_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	
    // accumulation
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_end>
	
    // shadow map
    DirectionalLightShadow directionalLight2 = directionalLightShadows[0];
    float shadow = getShadow(
        directionalShadowMap[0],
        directionalLight2.shadowMapSize,
        directionalLight2.shadowBias,
        directionalLight2.shadowRadius,
        vDirectionalShadowCoord[0]
    );

    // directional light
    float NdotL = dot(vNormal, directionalLights[0].direction);
    float lightIntensity = smoothstep(0.0, 0.01, (NdotL * (shadow)) / 0.1);

    // applies light shade
    vec3 lightColor = vec3(0.7, 0.6, 0.45);
    vec3 light = lightColor * lightIntensity * 0.1;

    // applies outline
    float rimDot = 1.0 - dot(vViewDir, normalize(vNormal));
    float rimAmount = 0.4;
    float rimThreshold = 0.2;
    float rimIntensity = rimDot * pow(NdotL, rimThreshold); //rimThreshold
    rimIntensity = smoothstep(rimAmount - 0.001, rimAmount + 0.001, rimIntensity);

    vec3 rim = vec3(rimIntensity * diffuseColor.rgb * 1.5);
	
    vec3 outgoingLight = (reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance + light - rim);

    #include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}