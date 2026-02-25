/* eslint-disable react/no-unknown-property */
'use client';
import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

// Use public paths to avoid bundler resolution issues with binary files
const cardGLB = '/lanyard/card.glb';
const lanyard = '/lanyard/lanyard.png';

import * as THREE from 'three';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

export default function Lanyard({ position = [0, 0, 30], gravity = [0, -40, 0], fov = 20, transparent = true }) {
    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="lanyard-wrapper">
            <Canvas
                camera={{ position: position, fov: fov }}
                dpr={[1, isMobile ? 1.5 : 2]}
                gl={{ alpha: transparent }}
                onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
            >
                <ambientLight intensity={Math.PI} />
                <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
                    <Band isMobile={isMobile} />
                </Physics>
                <Environment blur={0.75}>
                    <Lightformer
                        intensity={2}
                        color="white"
                        position={[0, -1, 5]}
                        rotation={[0, 0, Math.PI / 3]}
                        scale={[100, 0.1, 1]}
                    />
                    <Lightformer
                        intensity={3}
                        color="white"
                        position={[-1, -1, 1]}
                        rotation={[0, 0, Math.PI / 3]}
                        scale={[100, 0.1, 1]}
                    />
                    <Lightformer
                        intensity={3}
                        color="white"
                        position={[1, 1, 1]}
                        rotation={[0, 0, Math.PI / 3]}
                        scale={[100, 0.1, 1]}
                    />
                    <Lightformer
                        intensity={10}
                        color="white"
                        position={[-10, 0, 14]}
                        rotation={[0, Math.PI / 2, Math.PI / 3]}
                        scale={[100, 10, 1]}
                    />
                </Environment>
            </Canvas>
        </div>
    );
}
function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false }) {
    const band = useRef(),
        fixed = useRef(),
        j1 = useRef(),
        j2 = useRef(),
        j3 = useRef(),
        card = useRef();
    const vec = new THREE.Vector3(),
        ang = new THREE.Vector3(),
        rot = new THREE.Vector3(),
        dir = new THREE.Vector3();
    const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };
    const { nodes, materials } = useGLTF(cardGLB);
    const texture = useTexture(lanyard);
    // useTexture로 안정적으로 사진 로드
    const myPhoto = useTexture('/gaonsun.jpg');

    // 카드 지오메트리의 실제 크기/중심을 자동 계산
    const [cardBox, setCardBox] = useState({ w: 0.63, h: 0.88, cx: 0, cy: 0 });

    useEffect(() => {
        if (nodes?.card?.geometry) {
            nodes.card.geometry.computeBoundingBox();
            const bb = nodes.card.geometry.boundingBox;
            const box = {
                w: bb.max.x - bb.min.x,
                h: bb.max.y - bb.min.y,
                cx: (bb.max.x + bb.min.x) / 2,
                cy: (bb.max.y + bb.min.y) / 2,
                // 카드 앞면 z 위치 (BoundingBox 에 외츠 반영)
                fz: bb.max.z + 0.005,
            };
            console.log('[Lanyard] 카드 기준 크기:', box); // 필요시 제거
            setCardBox(box);
        }
    }, [nodes]);

    // 사진 텍스쳄 Cover 설정: PlaneGeometry 비율에 맞게 repeat/offset 조정
    useEffect(() => {
        if (!myPhoto?.image) return;
        const CARD_ASPECT = cardBox.w / cardBox.h;
        const imgAspect = myPhoto.image.width / myPhoto.image.height;

        // PlaneGeometry는 R두 UV가 정방향이므로 flipY 기본값(true) 유지
        myPhoto.wrapS = THREE.ClampToEdgeWrapping;
        myPhoto.wrapT = THREE.ClampToEdgeWrapping;

        if (imgAspect > CARD_ASPECT) {
            // 이미지가 더 넓음: 가로를 자름
            const rx = CARD_ASPECT / imgAspect;
            myPhoto.repeat.set(rx, 1);
            myPhoto.offset.set((1 - rx) / 2, 0);
        } else {
            // 이미지가 더 높음: 세로를 자름
            const ry = imgAspect / CARD_ASPECT;
            myPhoto.repeat.set(1, ry);
            myPhoto.offset.set(0, (1 - ry) / 2);
        }
        myPhoto.needsUpdate = true;
    }, [myPhoto, cardBox]);

    const [curve] = useState(
        () =>
            new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
    );
    const [dragged, drag] = useState(false);
    const [hovered, hover] = useState(false);

    useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
    useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
    useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
    useSphericalJoint(j3, card, [
        [0, 0, 0],
        [0, 1.5, 0]
    ]);

    useEffect(() => {
        if (hovered) {
            document.body.style.cursor = dragged ? 'grabbing' : 'grab';
            return () => void (document.body.style.cursor = 'auto');
        }
    }, [hovered, dragged]);

    useFrame((state, delta) => {
        if (dragged) {
            vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
            dir.copy(vec).sub(state.camera.position).normalize();
            vec.add(dir.multiplyScalar(state.camera.position.length()));
            [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
            card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
        }
        if (fixed.current) {
            [j1, j2].forEach(ref => {
                if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
                const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
                ref.current.lerped.lerp(
                    ref.current.translation(),
                    delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
                );
            });
            curve.points[0].copy(j3.current.translation());
            curve.points[1].copy(j2.current.lerped);
            curve.points[2].copy(j1.current.lerped);
            curve.points[3].copy(fixed.current.translation());
            band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
            ang.copy(card.current.angvel());
            rot.copy(card.current.rotation());
            card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
        }
    });

    curve.curveType = 'chordal';
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

    return (
        <>
            <group position={[0, 4, 0]}>
                <RigidBody ref={fixed} {...segmentProps} type="fixed" />
                <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
                    <CuboidCollider args={[1.4, 1.8, 0.01]} />
                    <group
                        scale={3.5}
                        position={[0, -1.8, -0.05]}
                        onPointerOver={() => hover(true)}
                        onPointerOut={() => hover(false)}
                        onPointerUp={e => (e.target.releasePointerCapture(e.pointerId), drag(false))}
                        onPointerDown={e => (
                            e.target.setPointerCapture(e.pointerId),
                            drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
                        )}
                    >
                        {/* 1. 카드 본체 (앞뒷면 금속 재질) */}
                        <mesh geometry={nodes.card.geometry} material={materials.metal} />

                        {/* 2. 카드 앞면 사진 평면
                             - fz: BoundingBox.max.z + offset으로 확실히 앞에 배치
                             - depthTest=false + renderOrder=1: z-fighting 없이 무조건 앞에 그려짐
                             - side 기본값(FrontSide)로 뒷면 침범 없음 */}
                        <mesh
                            position={[cardBox.cx, cardBox.cy, cardBox.fz ?? 0.01]}
                            renderOrder={1}
                        >
                            <planeGeometry args={[cardBox.w, cardBox.h]} />
                            <meshBasicMaterial
                                map={myPhoto}
                                depthTest={false}
                                toneMapped={false}
                            />
                        </mesh>
                        <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
                        <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
                    </group>
                </RigidBody>
            </group>
            <mesh ref={band}>
                <meshLineGeometry />
                <meshLineMaterial
                    color="white"
                    depthTest={false}
                    resolution={isMobile ? [1000, 2000] : [1000, 1000]}
                    useMap
                    map={texture}
                    repeat={[-4, 1]}
                    lineWidth={1}
                />
            </mesh>
        </>
    );
}
