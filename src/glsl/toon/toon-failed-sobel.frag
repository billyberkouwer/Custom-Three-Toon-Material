#define TOON

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;

#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <gradientmap_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <normalmap_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
#include <clipping_planes_pars_fragment>

uniform vec2 aspect;
uniform sampler2D depthMap;
uniform sampler2D normalMap2;

varying vec2 v_uv;
varying vec3 vViewDir;

const mat3 g0 = mat3(1.0, 2.0, 1.0, 0.0, 0.0, 0.0, -1.0, -2.0, -1.0);
const mat3 g1 = mat3(1.0, 0.0, -1.0, 2.0, 0.0, -2.0, 1.0, 0.0, -1.0);

mat3 G[2];

float sobel(mat3 I) {
    float cnv[2];
    float dp3;

    for (int i = 0; i < 2; ++i) {
        float dp3 = dot(G[i][0], I[0]) + dot(G[i][1], I[1]) + dot(G[i][2], I[2]);
        cnv[i] = dp3 * dp3;
    }
    
    return clamp(1.0 - (0.5 * sqrt(cnv[0] * cnv[0] + cnv[1] * cnv[1])), 0.0, 1.0);
}

float sobelNormal(sampler2D source) {
    mat3 I[3];
    vec3 sample2;

    vec2 texel = vec2(1.0 / aspect.x, 1.0 / aspect.y);
    
    for (float i = 0.0; i < 3.0; ++i) {
        for (float j = 0.0; j < 3.0; ++j) {
            sample2 = texture2D(source, v_uv + texel * vec2(i - 1.0, j - 1.0)).rgb;
            I[0][int(i)][int(j)] = sample2.r;
            I[1][int(i)][int(j)] = sample2.g;
            I[2][int(i)][int(j)] = sample2.b;
        }
    }
    
    return sobel(I[0]) * sobel(I[1]) * sobel(I[2]);
}

float sobelDepth(sampler2D source) {
    mat3 I;

    vec2 texel = vec2(1.0 / aspect.x, 1.0 / aspect.y);

    for (float i = 0.0; i < 3.0; ++i) {
        for (float j = 0.0; j < 3.0; ++j) {
            I[int(i)][int(j)] = texture2D(source, v_uv + texel * vec2(i - 1.0, j - 1.0)).r;
        }
    }

    return sobel(I);
}

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
    float rimDot = 1.0 - dot(vViewDir, vNormal);
    float rimAmount = 0.2;
    float rimThreshold = 0.4;
    float rimIntensity = rimDot * rimThreshold; //* pow(NdotL, rimThreshold);
    rimIntensity = smoothstep(rimAmount - 0.01, rimAmount + 0.01, rimIntensity);

    vec3 rim = vec3(rimIntensity * diffuseColor.rgb * 0.7);
    
	
    vec3 outgoingLight = (reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance + light - rim);
    outgoingLight = outgoingLight * sobelDepth(depthMap) * sobelNormal(normalMap2);

    #include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}