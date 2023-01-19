import * as THREE from 'three'

export function createShaderMaterial( shader, light, ambientLight ) {
    var u = THREE.UniformsUtils.clone( shader.uniforms );
    var vs = shader.vertexShader;
    var fs = shader.fragmentShader;
    var material = new THREE.ShaderMaterial( { uniforms: u, vertexShader: vs, fragmentShader: fs } );
    material.uniforms[ "uDirLightPos" ].value = light.position;
    material.uniforms[ "uDirLightColor" ].value = light.color;
    material.uniforms[ "uAmbientLightColor" ].value = ambientLight.color;
    return material;
}