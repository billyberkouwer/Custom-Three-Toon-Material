import {
    Color,
    Vector3
} from 'three';
// @ts-ignore
import VertexShader from './ToonShader.vert';
// @ts-ignore
import FragmentShader from './ToonShader.frag';

export const ToonShaderHatching = {

    uniforms: {

        'uDirLightPos': { value: new Vector3(0, 2, 0) },
        'uDirLightColor': { value: new Color(0xffffff) },
        'uTime' : { value: 0 },
        'uIntensity': { value: 0.15 },

        'uAmbientLightColor': { value: new Color(0x050505) },

        'uBaseColor': { value: new Color(0xF4D45F) },
        'uLineColor1': { value: new Color(0xf0ce4f) },
        'uLineColor2': { value: new Color(0xf0ce4f) },
        'uLineColor3': { value: new Color(0xf0ce4f) },
        'uLineColor4': { value: new Color(0xdbb832) },
        'uLineColor5': { value: new Color(0xffeead) },
        'uLineColor6': { value: new Color(0xf0ce4f) },

    },

    vertexShader: VertexShader,

    fragmentShader: FragmentShader

};