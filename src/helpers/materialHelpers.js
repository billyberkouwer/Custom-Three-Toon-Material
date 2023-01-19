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

function generateMaterials() {
    // // environment map
    // var path = "textures/cube/SwedishRoyalCastle/";
    // var format = '.jpg';
    // var urls = [
    //     path + 'px' + format, path + 'nx' + format,
    //     path + 'py' + format, path + 'ny' + format,
    //     path + 'pz' + format, path + 'nz' + format
    // ];
    // var cubeTextureLoader = new THREE.CubeTextureLoader();
    // var reflectionCube = cubeTextureLoader.load( urls );
    // var refractionCube = cubeTextureLoader.load( urls );
    // refractionCube.mapping = THREE.CubeRefractionMapping;
    // // toons
    var toonMaterial1 = createShaderMaterial( ToonShader1, light, ambientLight );
    var toonMaterial2 = createShaderMaterial( ToonShader2, light, ambientLight );
    var hatchingMaterial = createShaderMaterial( ToonShaderHatching, light, ambientLight );
    var dottedMaterial = createShaderMaterial( ToonShaderDotted, light, ambientLight );
    var texture = new THREE.TextureLoader().load( "textures/uv_grid_opengl.jpg" );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    var materials = {
        "chrome": {
            m: new THREE.MeshLambertMaterial( { color: 0xffffff, envMap: reflectionCube } ),
            h: 0, s: 0, l: 1
        },
        "liquid": {
            m: new THREE.MeshLambertMaterial( { color: 0xffffff, envMap: refractionCube, refractionRatio: 0.85 } ),
            h: 0, s: 0, l: 1
        },
        "shiny": {
            m: new THREE.MeshStandardMaterial( { color: 0x550000, envMap: reflectionCube, roughness: 0.1, metalness: 1.0 } ),
            h: 0, s: 0.8, l: 0.2
        },
        "matte": {
            m: new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x111111, shininess: 1 } ),
            h: 0, s: 0, l: 1
        },
        "flat": {
            m: new THREE.MeshLambertMaterial( { color: 0x000000, flatShading: true } ),
            h: 0, s: 0, l: 1
        },
        "textured": {
            m: new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x111111, shininess: 1, map: texture } ),
            h: 0, s: 0, l: 1
        },
        "colors": {
            m: new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff, shininess: 2, vertexColors: THREE.VertexColors } ),
            h: 0, s: 0, l: 1
        },
        "multiColors": {
            m: new THREE.MeshPhongMaterial( { shininess: 2, vertexColors: THREE.VertexColors } ),
            h: 0, s: 0, l: 1
        },
        "plastic": {
            m: new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x888888, shininess: 250 } ),
            h: 0.6, s: 0.8, l: 0.1
        },
        "toon1": {
            m: toonMaterial1,
            h: 0.2, s: 1, l: 0.75
        },
        "toon2": {
            m: toonMaterial2,
            h: 0.4, s: 1, l: 0.75
        },
        "hatching": {
            m: hatchingMaterial,
            h: 0.2, s: 1, l: 0.9
        },
        "dotted": {
            m: dottedMaterial,
            h: 0.2, s: 1, l: 0.9
        }
    };
    return materials;
}