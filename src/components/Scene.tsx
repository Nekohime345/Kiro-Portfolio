import React, { useRef, useMemo, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, shaderMaterial, Center, useCursor } from "@react-three/drei";
import { EffectComposer, Outline } from "@react-three/postprocessing";
import Overlay from "./Overlay"; 
// ------------------------------------------------------------------
// 1. DEFINE THE VORONOI WATER MATERIAL (NO FOAM)
// ------------------------------------------------------------------
const WaterShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorDeep: new THREE.Color("#0088cc"),
    uColorSurface: new THREE.Color("#ffffff"),
    uBigWavesElevation: 0.1,
    uBigWavesFrequency: new THREE.Vector2(4, 1.5),
    uBigWavesSpeed: 0.75,
    uScale: 12.0, 
  },
  // VERTEX SHADER (Unchanged)
  `
    uniform float uTime;
    uniform float uBigWavesElevation;
    uniform vec2 uBigWavesFrequency;
    uniform float uBigWavesSpeed;
    varying float vElevation;
    varying vec2 vUv;
    
    void main() {
      vUv = uv; 
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      float elevation = sin(modelPosition.x * uBigWavesFrequency.x + uTime * uBigWavesSpeed) *
                        sin(modelPosition.z * uBigWavesFrequency.y + uTime * uBigWavesSpeed) *
                        uBigWavesElevation;
      modelPosition.y += elevation;
      vElevation = elevation;
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;
      gl_Position = projectedPosition;
    }
  `,
  // FRAGMENT SHADER (Foam Logic Removed)
  `
    uniform float uTime;
    uniform vec3 uColorDeep;
    uniform vec3 uColorSurface;
    uniform float uScale;
    varying vec2 vUv;
    varying float vElevation;

    vec2 random2(vec2 p) {
        return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
    }

    void main() {
        vec2 st = vUv * uScale;
        vec2 i_st = floor(st);
        vec2 f_st = fract(st);
        float m_dist = 1.0; 
        
        // Voronoi Loop
        for (int y= -1; y <= 1; y++) {
            for (int x= -1; x <= 1; x++) {
                vec2 neighbor = vec2(float(x),float(y));
                vec2 point = random2(i_st + neighbor);
                point = 0.5 + 0.5 * sin(uTime * 1.5 + 6.2831 * point);
                vec2 diff = neighbor + point - f_st;
                float dist = length(diff);
                m_dist = min(m_dist, dist);
            }
        }
        
        // Mix colors based on voronoi pattern
        vec3 waterColor = mix(uColorDeep, uColorSurface, pow(m_dist, 20.0)); 
        
        // Output final color (No foam mixing)
        gl_FragColor = vec4(waterColor, 0.9);
        #include <colorspace_fragment>
    }
  `
);
extend({ WaterShaderMaterial });

// ------------------------------------------------------------------
// 4. DEFINE THE ANIME/TOON SKY MATERIAL (Unchanged)
// ------------------------------------------------------------------
const SkyShaderMaterial = shaderMaterial(
  {
    uColorBottom: new THREE.Color("#dbeafe"),
    uColorTop: new THREE.Color("#00aaff"),
    uCloudColor: new THREE.Color("#ffffff"),
    uCloudShadow: new THREE.Color("#c8dbe5"),
    uTime: 0,
    uCloudScale: 1.2, 
    uCloudDensity: 0.55,
  },
  `
    varying vec3 vWorldPosition;
    void main() {
      vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
      vWorldPosition = worldPosition.xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
  `,
  `
    uniform vec3 uColorBottom;
    uniform vec3 uColorTop;
    uniform vec3 uCloudColor;
    uniform vec3 uCloudShadow;
    uniform float uTime;
    uniform float uCloudScale;
    uniform float uCloudDensity;
    varying vec3 vWorldPosition;
    vec3 hash33(vec3 p3) {
        p3 = fract(p3 * vec3(.1031, .1030, .0973));
        p3 += dot(p3, p3.yxz + 33.33);
        return fract((p3.xxy + p3.yxx) * p3.zyx);
    }
    float voronoi(vec3 x) {
        vec3 n = floor(x);
        vec3 f = fract(x);
        vec2 res = vec2(100.0);
        for(int k=-1; k<=1; k++) {
            for(int j=-1; j<=1; j++) {
                for(int i=-1; i<=1; i++) {
                    vec3 b = vec3(float(i), float(j), float(k));
                    vec3 r = vec3(b) - f + hash33(n + b);
                    float d = dot(r, r);
                    if(d < res.x) {
                        res = vec2(d, res.x);
                    }
                }
            }
        }
        return 1.0 - sqrt(res.x);
    }
    void main() {
        vec3 normalizedPos = normalize(vWorldPosition);
        float h = normalizedPos.y;
        vec3 skyColor = mix(uColorBottom, uColorTop, max(h, 0.0));
        vec3 cloudPos = vWorldPosition * uCloudScale * 0.05 + vec3(uTime * 0.1, 0.0, 0.0);
        float noiseVal = voronoi(cloudPos);
        float detail = voronoi(cloudPos * 3.0 + vec3(2.0));
        noiseVal = mix(noiseVal, detail, 0.3);
        float cloudCoverage = smoothstep(uCloudDensity, uCloudDensity + 0.05, noiseVal);
        float internalShading = smoothstep(uCloudDensity, uCloudDensity + 0.2, noiseVal);
        vec3 cloudBaseColor = mix(uCloudShadow, uCloudColor, internalShading);
        vec3 finalColor = mix(skyColor, cloudBaseColor, cloudCoverage);
        float horizonFade = smoothstep(0.0, 0.1, h);
        finalColor = mix(uColorBottom, finalColor, horizonFade);
        gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);
extend({ SkyShaderMaterial });

function Sky() {
  const skyRef = useRef<any>(null);

  useFrame((_, delta) => {
    if (skyRef.current) {
      skyRef.current.uTime += delta;
    }
  });

  return (
    <mesh>
      <sphereGeometry args={[500, 32, 32]} />
      {/* @ts-ignore */}
      <skyShaderMaterial 
        ref={skyRef} 
        side={THREE.BackSide} 
        uCloudScale={0.1} 
        uCloudDensity={0.4} 
        uCloudColor="#ffffff"
        uCloudShadow="#ffffff" 
      />
    </mesh>
  );
}

// ------------------------------------------------------------------
// 2. WATER COMPONENT (Optimized)
// ------------------------------------------------------------------
function Water() {
  const materialRef = useRef<any>(null);
  
  // REMOVED: useDepthBuffer (Major performance gain!)
  // const depthBuffer = useDepthBuffer({ size: 256, frames: Infinity });

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uTime += delta;
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      {/* Reduced Segments */}
      <planeGeometry args={[1000, 1000, 256, 256]} /> 
      {/* @ts-ignore */}
      <waterShaderMaterial 
        ref={materialRef} 
        transparent 
        depthWrite={false}
        uScale={400.0}
        uColorDeep="#00AAFF" 
        uColorSurface="#00FFff" 
        // REMOVED: uColorFoam, uDepthMap, uCameraNear, etc.
      />
    </mesh>
  );
}

// ------------------------------------------------------------------
// 3. ISLAND & SCENE
// ------------------------------------------------------------------
function Island() {
  const { scene } = useGLTF("/assets/models/island-model/Portfolio_island_final.glb");
  const [hovered, setHover] = useState<THREE.Object3D | null>(null);
  
  const targetNames = ["House", "Lighthouse", "SailorBoat", "SignalTower", "Boat", "Shack", "Dock"];
  useCursor(!!hovered);

  const selection = useMemo(() => (hovered ? [hovered] : []), [hovered]);

  return (
    <>
      <Center disableY>
        <primitive 
          object={scene} 
          scale={1} 
          onPointerOver={(e: any) => {
            e.stopPropagation();
            const hitObject = e.object;
            if (targetNames.includes(hitObject.name)) {
              setHover(hitObject);
            } else if (hitObject.parent && targetNames.includes(hitObject.parent.name)) {
              setHover(hitObject.parent);
            } else {
              setHover(null);
            }
          }}
          onPointerOut={(e: any) => {
            e.stopPropagation();
            setHover(null);
          }}
        />
      </Center>

      <EffectComposer autoClear={false} multisampling={0}>
        <Outline
          selection={selection}
          visibleEdgeColor={0xffffff} 
          hiddenEdgeColor={0xffffff} 
          blur
          edgeStrength={10}
        />
      </EffectComposer>
    </>
  );
}
export default function Scene() {
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      
      {/* 2. Add the Overlay here */}
      <Overlay />
      
      <Canvas 
        dpr={[1, 1.5]} 
        gl={{ antialias: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 3, 6], fov: 60 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        
        <Water />
        <Sky />
        <Island />
        
        <OrbitControls 
          enableDamping 
          maxPolarAngle={Math.PI / 2 - 0.1}
          enablePan={false} 
          minDistance={3}
          maxDistance={8}
        />
      </Canvas>
    </div>
  );
}
