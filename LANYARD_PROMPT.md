# 🪪 React Three Fiber 랜야드 카드 구현 프롬프트

> 나중에 다른 프로젝트에서 이 랜야드 카드 효과를 구현할 때 아래 프롬프트를 AI에게 그대로 전달하세요.

---

## 📋 AI에게 전달할 프롬프트

```
React Three Fiber(r3f)로 물리 기반 인터랙티브 랜야드 카드(Lanyard Card) 컴포넌트를 구현해줘.

### 기술 스택
- @react-three/fiber (Canvas, useFrame, extend)
- @react-three/drei (useGLTF, useTexture, Environment, Lightformer)
- @react-three/rapier (Physics, RigidBody, BallCollider, CuboidCollider, useRopeJoint, useSphericalJoint)
- meshline (MeshLineGeometry, MeshLineMaterial)
- three.js

### 필요한 패키지 설치
npm install @react-three/fiber @react-three/drei @react-three/rapier three meshline

### 에셋 준비 (public 폴더에 배치)
- /lanyard/card.glb       → 카드 3D 모델 (GLB 파일, nodes: card/clip/clamp, materials: metal)
- /lanyard/lanyard.png    → 랜야드 끈 텍스처 (줄무늬 패턴)
- /my-photo.jpg           → 카드 앞면에 표시할 사진

### 구현 요구사항

#### 1. 물리 시뮬레이션
- Rapier 물리 엔진으로 줄 + 카드 연결 시뮬레이션
- 줄은 4개의 RigidBody 세그먼트로 구성 (fixed → j1 → j2 → j3 → card)
- useRopeJoint로 세그먼트 연결, useSphericalJoint로 카드 연결
- 카드를 마우스로 드래그해서 잡아당길 수 있어야 함
- 중력: [0, -40, 0], 카드 angularDamping/linearDamping: 4

#### 2. 랜야드 줄(Band) 렌더링
- MeshLineGeometry + MeshLineMaterial 사용
- CatmullRomCurve3로 부드러운 곡선 표현
- 줄 텍스처: repeat=[-4, 1], wrapS=wrapT=RepeatWrapping

#### 3. 카드 앞면 사진 표시 (핵심 트릭 - 아래 방법을 반드시 사용할 것)

카드 GLB 메쉬에 직접 텍스처를 입히면 다음 문제가 발생함:
  - flipY 설정에 따른 사진 반전 문제
  - side=DoubleSide 시 뒷면에 사진이 침범하는 문제
  - z-fighting으로 텍스처가 안 보이는 문제

✅ 해결된 최종 방법:
  1. 카드 본체(nodes.card.geometry)는 materials.metal 금속 재질 그대로 렌더링
  2. 별도의 PlaneGeometry를 카드 앞면 위에 배치하여 사진만 표시
  3. PlaneGeometry의 위치/크기는 nodes.card.geometry.boundingBox에서 자동 계산
  4. depthTest={false} + renderOrder={1}로 z-fighting 없이 무조건 앞에 렌더링
  5. 사진 비율(Cover 방식)은 repeat/offset으로 자동 맞춤

구체적인 코드:

```jsx
// 1. 사진 로드 (useTexture 사용 - window.Image() 방식은 CORS 문제 있음)
const myPhoto = useTexture('/my-photo.jpg');

// 2. 카드 지오메트리 BoundingBox로 실제 크기/위치 자동 계산
const [cardBox, setCardBox] = useState({ w: 0.63, h: 0.88, cx: 0, cy: 0, fz: 0.01 });
useEffect(() => {
  if (nodes?.card?.geometry) {
    nodes.card.geometry.computeBoundingBox();
    const bb = nodes.card.geometry.boundingBox;
    setCardBox({
      w: bb.max.x - bb.min.x,
      h: bb.max.y - bb.min.y,
      cx: (bb.max.x + bb.min.x) / 2,
      cy: (bb.max.y + bb.min.y) / 2,
      fz: bb.max.z + 0.005,  // 카드 앞면보다 살짝 앞에
    });
  }
}, [nodes]);

// 3. 사진 Cover 비율 맞춤 (repeat/offset)
useEffect(() => {
  if (!myPhoto?.image) return;
  const CARD_ASPECT = cardBox.w / cardBox.h;
  const imgAspect = myPhoto.image.width / myPhoto.image.height;
  myPhoto.wrapS = THREE.ClampToEdgeWrapping;
  myPhoto.wrapT = THREE.ClampToEdgeWrapping;
  if (imgAspect > CARD_ASPECT) {
    const rx = CARD_ASPECT / imgAspect;
    myPhoto.repeat.set(rx, 1);
    myPhoto.offset.set((1 - rx) / 2, 0);
  } else {
    const ry = imgAspect / CARD_ASPECT;
    myPhoto.repeat.set(1, ry);
    myPhoto.offset.set(0, (1 - ry) / 2);
  }
  myPhoto.needsUpdate = true;
}, [myPhoto, cardBox]);

// 4. JSX 렌더링
<>
  {/* 카드 본체: 금속 재질 */}
  <mesh geometry={nodes.card.geometry} material={materials.metal} />

  {/* 사진 평면: 카드 앞면에만 렌더링 */}
  <mesh position={[cardBox.cx, cardBox.cy, cardBox.fz]} renderOrder={1}>
    <planeGeometry args={[cardBox.w, cardBox.h]} />
    <meshBasicMaterial
      map={myPhoto}
      depthTest={false}   {/* z-fighting 방지 */}
      toneMapped={false}
    />
  </mesh>

  {/* 클립/클램프는 금속 재질 그대로 */}
  <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
  <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
</>
```

#### 4. 반응형 지원
- isMobile 상태로 window.innerWidth < 768 감지
- 모바일: dpr=1.5, timeStep=1/30, 곡선 포인트 16개
- 데스크탑: dpr=2, timeStep=1/60, 곡선 포인트 32개

#### 5. 조명 설정
- ambientLight intensity={Math.PI}
- Environment blur={0.75} + Lightformer 4개로 리얼한 반사 표현

### 컴포넌트 Props
- position: 카메라 위치 (기본값: [0, 0, 30])
- gravity: 중력 벡터 (기본값: [0, -40, 0])
- fov: 카메라 시야각 (기본값: 20)
- transparent: 배경 투명 여부 (기본값: true)
```

---

## ⚠️ 주의사항 (시행착오에서 얻은 교훈)

| 문제 | 잘못된 방법 | 올바른 방법 |
|------|------------|------------|
| 사진 반전 | `flipY=false/true` 계속 바꾸기 | `PlaneGeometry` 사용 시 반전 없음 |
| 뒷면 사진 침범 | `side={THREE.DoubleSide}` | 카드 본체와 사진 평면을 **별도 메쉬로 분리** |
| 한 메쉬에 재질 2개 | `<mesh><재질A/><재질B/></mesh>` | 마지막 재질이 덮어씀 → **메쉬를 2개로** 분리 |
| 사진이 안 보임 | `window.Image()` + `onload` | `useTexture()` 사용 (CORS 안전) |
| 사진이 카드 뒤에 묻힘 | z값 하드코딩 (`z=0.003`) | `BoundingBox.max.z + 0.005` + `depthTest={false}` |
| PlaneGeometry 크기 불일치 | 수동으로 크기 추정 | `geometry.computeBoundingBox()`로 **자동 계산** |

---

## 📁 최종 완성 소스코드 위치
`portfolio/components/sections/Lanyard.jsx`
