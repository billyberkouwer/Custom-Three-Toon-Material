import styles from '@/styles/Home.module.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useEffect, useState, useRef } from 'react'
import { ShaderMaterial, PointLight, AmbientLight, Mesh } from 'three'
import { MutableRefObject } from 'react'
import { UniformsUtils } from 'three/src/renderers/shaders/UniformsUtils.js'
import { createShaderMaterial } from "@/helpers/materialHelpers"
import { ToonShaderHatching } from '@/glsl/ToonShader'


export default function Home() {
  const [toonMaterial, setToonMaterial] = useState({
    uniforms: {},
    fragmentShader: '',
    vertexShader: '',
  })

  const pointLight = useRef() as MutableRefObject<PointLight | null>;
  const ambientLight = useRef() as MutableRefObject<AmbientLight | null>
  const mesh = useRef() as MutableRefObject<Mesh | null>

  useEffect(() => {
    setToonMaterial(ToonShaderHatching)
  }, [])

  return (
    <div className={styles.main}>
      <Canvas>
        <pointLight ref={el => pointLight.current = el} position={[2, 2, 0]} intensity={0.5}/>
        <ambientLight ref={el => ambientLight.current = el} intensity={0.1}/>
        <mesh ref={el => mesh.current = el} position={[-1, 0, -0.5]}>
          <sphereGeometry args={[1,32,16]} />
          <shaderMaterial uniforms={toonMaterial.uniforms} fragmentShader={toonMaterial.fragmentShader} vertexShader={toonMaterial.vertexShader} />
        </mesh>
        <mesh position={[1, 0, 0.5]}>
          <cylinderGeometry args={[1, 1, 1, 32,16]} />
          <shaderMaterial uniforms={toonMaterial.uniforms} fragmentShader={toonMaterial.fragmentShader} vertexShader={toonMaterial.vertexShader} />
        </mesh>
        <OrbitControls />
      </Canvas>
    </div>
  )
}
