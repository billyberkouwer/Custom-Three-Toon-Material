import {
  Color,
  MeshToonMaterialParameters,
  NormalMapTypes,
  ShaderMaterial,
  TangentSpaceNormalMap,
  Texture,
  UniformsLib,
  Vector2,
  WebGLRenderTarget,
} from 'three'

import toonFragmentShader from './toon.frag.glsl'
import toonVertexShader from './toon.vert.glsl'
// import toonFragmentShader from './toon.frag'
// import toonVertexShader from './toon.vert'

export class ToonShaderMaterial extends ShaderMaterial {
  defines: { [key: string]: any }
  color?: Color
  gradientMap: Texture | null
  map: Texture | null
  lightMap: Texture | null
  lightMapIntensity: number
  aoMap: Texture | null
  aoMapIntensity: number
  emissive: Color
  emissiveIntensity: number
  emissiveMap: Texture | null
  bumpMap: Texture | null
  bumpScale: number

  normalMap2: Texture | null | WebGLRenderTarget
  depthMap: Texture | null | WebGLRenderTarget

  normalMap: Texture | null
  normalMapType: NormalMapTypes
  normalScale: Vector2
  displacementMap: Texture | null
  displacementScale: number
  displacementBias: number
  alphaMap: Texture | null
  wireframe: boolean
  wireframeLinewidth: number
  wireframeLinecap: string
  wireframeLinejoin: string
  fog: boolean
  isMeshToonMaterial: boolean

  constructor(
    parameters: MeshToonMaterialParameters & {
      normalMap2?: Texture | null | undefined | WebGLRenderTarget
      depthMap?: Texture | null | undefined | WebGLRenderTarget
    },
  ) {
    super()

    this.isMeshToonMaterial = true
    this.defines = { TOON: '', USE_SHADOWMAP: '' }
    this.color = new Color(0xffffff)
    this.map = null
    this.gradientMap = null
    this.lightMap = null
    this.lightMapIntensity = 1.0
    this.aoMap = null
    this.aoMapIntensity = 1.0
    this.emissive = new Color(0x000000)
    this.emissiveIntensity = 1.0
    this.emissiveMap = null
    this.bumpMap = null
    this.bumpScale = 1

    this.normalMap2 = null
    this.depthMap = null

    this.normalMap = null
    this.normalMapType = TangentSpaceNormalMap
    this.normalScale = new Vector2(1, 1)
    this.displacementMap = null
    this.displacementScale = 1
    this.displacementBias = 0
    this.alphaMap = null
    this.wireframe = false
    this.wireframeLinewidth = 1
    this.wireframeLinecap = 'round'
    this.wireframeLinejoin = 'round'
    this.fog = true

    this.clipping = true

    this.uniforms = {
      ...UniformsLib.common,
      ...UniformsLib.aomap,
      ...UniformsLib.lightmap,
      ...UniformsLib.emissivemap,
      ...UniformsLib.bumpmap,
      ...UniformsLib.normalmap,
      ...UniformsLib.displacementmap,
      ...UniformsLib.gradientmap,
      ...UniformsLib.fog,
      ...UniformsLib.lights,
      emissive: { value: /*@__PURE__*/ new Color(0x000000) },
    }

    this.fragmentShader = toonFragmentShader
    this.vertexShader = toonVertexShader

    this.setValues(parameters)

    // Applies custom uniforms

    this.uniforms.color = { value: parameters.color ?? this.color }
    this.uniforms.map = { value: parameters.map ?? this.map }
    this.uniforms.gradientMap = { value: parameters.gradientMap ?? this.gradientMap }
    this.uniforms.lightMap = { value: parameters.lightMap ?? this.lightMap }
    this.uniforms.lightMapIntensity = { value: parameters.lightMapIntensity ?? this.lightMapIntensity }
    this.uniforms.aoMap = { value: parameters.aoMap ?? this.aoMap }
    this.uniforms.aoMapIntensity = { value: parameters.aoMapIntensity ?? this.aoMapIntensity }
    this.uniforms.emissive = { value: parameters.emissive ?? this.emissive }
    this.uniforms.emissiveIntensity = { value: parameters.emissiveIntensity ?? this.emissiveIntensity }
    this.uniforms.emissiveMap = { value: parameters.emissiveMap ?? this.emissiveMap }
    this.uniforms.bumpMap = { value: parameters.bumpMap ?? this.bumpMap }
    this.uniforms.bumpScale = { value: parameters.bumpScale ?? this.bumpScale }

    this.uniforms.normalMap2 = { value: parameters.normalMap2 ?? this.normalMap2 }
    this.uniforms.depthMap = { value: parameters.depthMap ?? this.depthMap }

    this.uniforms.normalMap = { value: parameters.normalMap ?? this.normalMap }
    this.uniforms.normalMapType = { value: parameters.normalMapType ?? this.normalMapType }
    this.uniforms.normalScale = { value: parameters.normalScale ?? this.normalScale }
    this.uniforms.displacementMap = { value: parameters.displacementMap ?? this.displacementMap }
    this.uniforms.displacementScale = { value: parameters.displacementScale ?? this.displacementScale }
    this.uniforms.displacementBias = { value: parameters.displacementBias ?? this.displacementBias }
    this.uniforms.alphaMap = { value: parameters.alphaMap ?? this.alphaMap }
    this.uniforms.wireframe = { value: parameters.wireframe ?? this.wireframe }
    this.uniforms.wireframeLinewidth = { value: parameters.wireframeLinewidth ?? this.wireframeLinewidth }
    this.uniforms.wireframeLinecap = { value: parameters.wireframeLinecap ?? this.wireframeLinecap }
    this.uniforms.wireframeLinejoin = { value: parameters.wireframeLinejoin ?? this.wireframeLinejoin }
    this.uniforms.fog = { value: parameters.fog ?? this.fog }
    this.uniforms.spotShadowMatrix = { value: undefined }
  }

  copy(source: ToonShaderMaterial) {
    super.copy(source)

    source.color && this.color?.copy(source.color)
    this.fragmentShader = source.fragmentShader
    this.vertexShader = source.vertexShader
    this.map = source.map
    this.gradientMap = source.gradientMap
    this.lightMap = source.lightMap
    this.lightMapIntensity = source.lightMapIntensity
    this.aoMap = source.aoMap
    this.aoMapIntensity = source.aoMapIntensity
    this.emissive.copy(source.emissive)
    this.emissiveMap = source.emissiveMap
    this.emissiveIntensity = source.emissiveIntensity
    this.bumpMap = source.bumpMap
    this.bumpScale = source.bumpScale

    this.normalMap2 = source.normalMap2
    this.depthMap = source.depthMap

    this.normalMap = source.normalMap
    this.normalMapType = source.normalMapType
    this.normalScale.copy(source.normalScale)
    this.displacementMap = source.displacementMap
    this.displacementScale = source.displacementScale
    this.displacementBias = source.displacementBias
    this.alphaMap = source.alphaMap
    this.wireframe = source.wireframe
    this.wireframeLinewidth = source.wireframeLinewidth
    this.wireframeLinecap = source.wireframeLinecap
    this.wireframeLinejoin = source.wireframeLinejoin
    this.fog = source.fog

    return this
  }
}
