import alphamap_pars_fragment from './chunks/alphamap_pars_fragment.glsl'
import alphatest_pars_fragment from './chunks/alphatest_pars_fragment.glsl'
import aomap_pars_fragment from './chunks/aomap_pars_fragment.glsl'
import bsdfs from './chunks/bsdfs.glsl'
import bumpmap_pars_fragment from './chunks/bumpmap_pars_fragment.glsl'
import clipping_planes_fragment from './chunks/clipping_planes_fragment.glsl'
import clipping_planes_pars_fragment from './chunks/clipping_planes_pars_fragment.glsl'
import color_pars_fragment from './chunks/color_pars_fragment.glsl'
import common from './chunks/common.glsl'
import dithering_pars_fragment from './chunks/dithering_pars_fragment.glsl'
import emissivemap_pars_fragment from './chunks/emissivemap_pars_fragment.glsl'
import encodings_fragment from './chunks/encodings_fragment.glsl'
import fog_pars_fragment from './chunks/fog_pars_fragment.glsl'
import gradientmap_pars_fragment from './chunks/gradientmap_pars_fragment.glsl'
import lightmap_pars_fragment from './chunks/lightmap_pars_fragment.glsl'
import lights_fragment_begin from './chunks/lights_fragment_begin.glsl'
import lights_fragment_end from './chunks/lights_fragment_end.glsl'
import lights_pars_begin from './chunks/lights_pars_begin.glsl'
import lights_toon_fragment from './chunks/lights_toon_fragment.glsl'
import lights_toon_pars_fragment from './chunks/lights_toon_pars_fragment.glsl'
import logdepthbuf_pars_fragment from './chunks/logdepthbuf_pars_fragment.glsl'
import map_fragment from './chunks/map_fragment.glsl'
import map_pars_fragment from './chunks/map_pars_fragment.glsl'
import normal_fragment_begin from './chunks/normal_fragment_begin.glsl'
import normal_fragment_maps from './chunks/normal_fragment_maps.glsl'
import normal_pars_fragment from './chunks/normal_pars_fragment.glsl'
import normalmap_pars_fragment from './chunks/normalmap_pars_fragment.glsl'
import output_fragment from './chunks/output_fragment.glsl'
import packing from './chunks/packing.glsl'
import shadowmap_pars_fragment from './chunks/shadowmap_pars_fragment.glsl'
import shadowmask_pars_fragment from './chunks/shadowmask_pars_fragment.glsl'
import tonemapping_fragment from './chunks/tonemapping_fragment.glsl'
import uv_pars_fragment from './chunks/uv_pars_fragment.glsl'
import uv2_pars_fragment from './chunks/uv2_pars_fragment.glsl'

const fragmentShader = /* glsl */ `
#define TOON

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;

${common}
${packing}

${dithering_pars_fragment} // added
${color_pars_fragment} // added

${uv_pars_fragment}

${uv2_pars_fragment} // added

${map_pars_fragment}

${alphamap_pars_fragment} // added
${alphatest_pars_fragment} // added
${aomap_pars_fragment} // added
${lightmap_pars_fragment} // added
${emissivemap_pars_fragment} // added

${gradientmap_pars_fragment}

${fog_pars_fragment} // added

${bsdfs}
${lights_pars_begin}
${normal_pars_fragment}
${lights_toon_pars_fragment}
${shadowmap_pars_fragment}

${bumpmap_pars_fragment} // added

${normalmap_pars_fragment}

${logdepthbuf_pars_fragment} // added

${shadowmask_pars_fragment}
${clipping_planes_pars_fragment}

varying vec3 vViewDir;

void main() {
    ${clipping_planes_fragment}

	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	
    vec3 totalEmissiveRadiance = emissive;
	
	${map_fragment}
	${normal_fragment_begin}
	${normal_fragment_maps}
	
    // accumulation
	${lights_toon_fragment}
	${lights_fragment_begin}
	${lights_fragment_end}
	
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

    ${output_fragment}
	${tonemapping_fragment}
	${encodings_fragment}
}
`

export default fragmentShader
