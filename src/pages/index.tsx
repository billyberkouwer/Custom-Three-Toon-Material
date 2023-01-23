import styles from '@/styles/Home.module.css'
import { Canvas} from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import {  useRef } from 'react'
import { PointLight, AmbientLight, DirectionalLight } from 'three'
import { MutableRefObject } from 'react'
import NewBeerFlowMesh from '@/meshes/NewBeerFlowMesh'

export default function Home() {
  const directionalLight = useRef() as MutableRefObject<DirectionalLight | null>;
  const ambientLight = useRef() as MutableRefObject<AmbientLight | null>
  
  return (
    <div className={styles.main} style={{backgroundColor: 'white'}}>
      <Canvas camera={{position: [-6, 1, -6]}}>
        {/* <directionalLight position={[-2,10,10]}/>
        <directionalLight position={[2,10,10]}/> */}
        <NewBeerFlowMesh />
        <Environment preset='apartment' background blur={0.1}/>
        <OrbitControls />
      </Canvas>
    </div>
  )
}
