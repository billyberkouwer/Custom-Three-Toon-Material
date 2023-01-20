import styles from '@/styles/Home.module.css'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useEffect, useState, useRef } from 'react'
import { ShaderMaterial, PointLight, AmbientLight, Mesh } from 'three'
import { MutableRefObject } from 'react'
import { UniformsUtils } from 'three/src/renderers/shaders/UniformsUtils.js'
import { createShaderMaterial } from "@/helpers/materialHelpers"
import { ToonShaderHatching } from '@/glsl/ToonShader'
import SphereMesh from '@/meshes/SphereMesh'


export default function Home() {
  const [toonMaterial, setToonMaterial] = useState({
    uniforms: {},
    fragmentShader: '',
    vertexShader: '',
  })

  const pointLight = useRef() as MutableRefObject<PointLight | null>;
  const ambientLight = useRef() as MutableRefObject<AmbientLight | null>
  
  return (
    <div className={styles.main}>
      <Canvas>
        <pointLight ref={el => pointLight.current = el} position={[2, 2, 0]} intensity={0.5}/>
        <ambientLight ref={el => ambientLight.current = el} intensity={0.1}/>
          <SphereMesh />
        <mesh position={[1, 0, 0.5]} rotation={[Math.PI/2, 0, 0]} >
          <cylinderGeometry args={[1, 1, 100, 32, 320]} />
          <shaderMaterial uniforms={toonMaterial.uniforms} fragmentShader={toonMaterial.fragmentShader} vertexShader={toonMaterial.vertexShader} />
        </mesh>
        <OrbitControls />
      </Canvas>
    </div>
  )
}
