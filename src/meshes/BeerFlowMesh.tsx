import { ToonShaderMaterial } from '@/glsl/toon/ToonShaderMaterial';
import { ToonShaderHatching } from '@/glsl/ToonShader';
import { useAnimations, useGLTF } from '@react-three/drei';
import { Object3DNode, useFrame, useThree } from '@react-three/fiber';
import { MutableRefObject, useEffect, useRef } from 'react';
import { ShaderMaterial, Mesh, Material, AnimationMixer, AnimationClip, MeshToonMaterial, MeshBasicMaterial, MeshLambertMaterial } from 'three';


export default function BeerFlowMesh() {
    const ref = useRef() as MutableRefObject<Mesh | null>
    const { nodes, animations } = useGLTF('/beer-tube-shape-key.gltf');
    const { actions } = useAnimations(animations, ref)
    // const { scene } = useThree()

    

    useEffect(() => {
        if (nodes) {
            nodes.Cylinder.material = new ToonShaderMaterial({color: 'yellow'});
            nodes.Cylinder.material.onBeforeCompile = function (shader) {
            }
            actions['Ket.001ActionAction'].play()
            nodes.Cylinder.material.needsUpdate = true;
            console.log(nodes.Cylinder.material)
            console.log(new MeshBasicMaterial)
            console.log(nodes)
            console.log(animations)
            console.log(actions)
        }
    }, [nodes, animations, actions])

    let time = 0;

    useFrame(() => {
        if (nodes.Cylinder.material.type === 'ShaderMaterial') {
        }
    })

    // useFrame((state, delta) => {
    //     let mesh: Mesh | undefined;

    //     gltf.scene.traverse((obj) => {
    //         if (obj.type === 'Mesh') {
    //             mesh = obj as Mesh;
    //         }
    //     });

    //     if ((mesh?.material as ShaderMaterial).uniforms?.uTime) {
    //         console.log('tick')
    //         time += 1 * delta;
    //         (mesh?.material as ShaderMaterial).uniforms.uTime.value = time;
    //     }
    // })

    return (
        <primitive object={nodes.Cylinder} ref={ref} />
    )
}