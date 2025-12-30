import React, { useRef, useMemo, useState  } from "react";
import * as THREE from "three";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, shaderMaterial, Center, Cloud, useDepthBuffer, useCursor  } from "@react-three/drei";
import { EffectComposer, Outline } from "@react-three/postprocessing";

// ------------------------------------------------------------------
// 1. DEFINE THE VORONOI WATER MATERIAL
// ------------------------------------------------------------------
const WaterShaderMaterial = shaderMaterial(
  // Uniforms
  {
    uTime: 0,
    uColorDeep: new THREE.Color("#0088cc"),    // Blue
    uColorSurface: new THREE.Color("#ffffff"), // White lines
    uColorFoam: new THREE.Color("#ffffff"),    // Foam Color
    uBigWavesElevation: 0.1,
    uBigWavesFrequency: new THREE.Vector2(4, 1.5),
    uBigWavesSpeed: 0.75,
    uScale: 12.0, 
    // Depth/Foam Uniforms
    uDepthMap: null,
    uResolution: new THREE.Vector2(),
    uCameraNear: 0.1,
    uCameraFar: 1000,
    uFoamThreshold: 1.0, // Thickness of the foam line
  },
  // -------------------------
  // VERTEX SHADER
  // -------------------------
  `
    uniform float uTime;
    uniform float uBigWavesElevation;
    uniform vec2 uBigWavesFrequency;
    uniform float uBigWavesSpeed;

    varying float vElevation;
    varying vec2 vUv;
    varying vec4 vScreenPosition; // Pass screen position for depth lookup

    void main() {
      vUv = uv; 
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);

      // Simple wave movement
      float elevation = sin(modelPosition.x * uBigWavesFrequency.x + uTime * uBigWavesSpeed) *
                        sin(modelPosition.z * uBigWavesFrequency.y + uTime * uBigWavesSpeed) *
                        uBigWavesElevation;

      modelPosition.y += elevation;
      vElevation = elevation;

      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;
      
      gl_Position = projectedPosition;
      
      // Store screen position for fragment shader depth calculation
      vScreenPosition = projectedPosition;
    }
  `,
  // -------------------------
  // FRAGMENT SHADER
  // -------------------------
  `
    #include <packing>

    uniform float uTime;
    uniform vec3 uColorDeep;
    uniform vec3 uColorSurface;
    uniform vec3 uColorFoam;
    uniform float uScale;
    
    // Depth Uniforms
    uniform sampler2D uDepthMap;
    uniform vec2 uResolution;
    uniform float uCameraNear;
    uniform float uCameraFar;
    uniform float uFoamThreshold;

    varying vec2 vUv;
    varying float vElevation;
    varying vec4 vScreenPosition;

    // --- Helper: Read Linear Depth ---
    float getLinearDepth(float fragCoordZ) {
        float viewZ = perspectiveDepthToViewZ(fragCoordZ, uCameraNear, uCameraFar);
        return viewZToOrthographicDepth(viewZ, uCameraNear, uCameraFar);
    }

    // --- Voronoi Function ---
    vec2 random2(vec2 p) {
        return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
    }

    void main() {
        // 1. VORONOI PATTERN
        vec2 st = vUv * uScale;
        vec2 i_st = floor(st);
        vec2 f_st = fract(st);

        float m_dist = 1.0; 

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

        // TIGHTER SPOTS: Changed power from 5.0 to 20.0 to make lines thinner/sharper
        vec3 waterColor = mix(uColorDeep, uColorSurface, pow(m_dist, 20.0)); 

        // 2. DEPTH FOAM / RIPPLE INTERSECTION
        // Calculate screen coordinates (0 to 1)
        vec2 screenUV = vScreenPosition.xy / vScreenPosition.w * 0.5 + 0.5;

        // Sample depth from buffer (Geometry depth)
        float depthSample = texture2D(uDepthMap, screenUV).x;
        float sceneDepth = getLinearDepth(depthSample);
        
        // Calculate current fragment depth (Water depth)
        float currentDepth = getLinearDepth(gl_FragCoord.z);

        // Difference between water and object behind it
        float depthDiff = sceneDepth - currentDepth;
        
        // Convert to world-ish scale logic (approximate)
        // Adjust 0.005 / 0.0 to change foam thickness
        float foamIntensity = smoothstep(0.01, 0.0, depthDiff);

        // Fix artifacts where depthDiff is negative (sky/foreground)
        if(depthDiff < 0.0) foamIntensity = 0.0;

        // Mix foam on top of Voronoi
        vec3 finalColor = mix(waterColor, uColorFoam, foamIntensity);

        gl_FragColor = vec4(finalColor, 0.9);
        #include <colorspace_fragment>
    }
  `
);

extend({ WaterShaderMaterial });

// ------------------------------------------------------------------
// 4. DEFINE THE ANIME/TOON SKY MATERIAL
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
  // Vertex Shader
  `
    varying vec3 vWorldPosition;
    void main() {
      vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
      vWorldPosition = worldPosition.xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
  `,
  // Fragment Shader
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
  const skyRef = useRef();

  useFrame((state, delta) => {
    if (skyRef.current) {
      skyRef.current.uTime += delta;
    }
  });

  return (
    <mesh>
      <sphereGeometry args={[500, 32, 32]} />
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
// 2. WATER COMPONENT (UPDATED)
// ------------------------------------------------------------------
function Water() {
  const materialRef = useRef();
  const { size, camera } = useThree();
  
  // 1. Generate Depth Buffer (renders scene to texture)
  const depthBuffer = useDepthBuffer({ size: 1024, frames: Infinity });

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uTime += delta;
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[1000, 1000, 1000, 1000]} />
      {/* 2. Pass depth buffer and camera info to shader */}
      {/* 3. depthWrite={false} prevents water from writing to depth buffer, fixing self-intersection */}
      <waterShaderMaterial 
        ref={materialRef} 
        transparent 
        depthWrite={false}
        uScale={400.0}       // REDUCED from 1000 to 400 for "less" spots
        uColorDeep="#00AAFF" 
        uColorSurface="#00FFff" 
        uColorFoam="#ffffff"
        uDepthMap={depthBuffer}
        uResolution={[size.width, size.height]}
        uCameraNear={camera.near}
        uCameraFar={camera.far}
      />
    </mesh>
  );
}

// ------------------------------------------------------------------
// 3. ISLAND & SCENE
// ------------------------------------------------------------------
function Island() {
  const { scene } = useGLTF("/assets/models/island-model/Portfolio_island_final.glb");
  const [hovered, setHover] = useState(null);
  
  // List of names you want to highlight
  const targetNames = [
    "House", 
    "Lighthouse", 
    "SailorBoat", 
    "SignalTower", 
    "Boat", 
    "Boat", 
    "Shack", // shack
    "Dock"  // dock
  ];

  // Change cursor to pointer when hovering a target
  useCursor(!!hovered);

  return (
    <>
      <Center disableY>
        <primitive 
          object={scene} 
          scale={1} 
          onPointerOver={(e) => {
            e.stopPropagation();
            // 1. Get the mesh that was hit
            const hitObject = e.object;
            
            // 2. Check if the mesh name OR its parent's name is in our list
            // (Handling cases where the name belongs to a Group parent)
            if (targetNames.includes(hitObject.name)) {
              setHover(hitObject);
            } else if (hitObject.parent && targetNames.includes(hitObject.parent.name)) {
              setHover(hitObject.parent); // Select the whole group if the parent is the named target
            } else {
              setHover(null);
            }
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            setHover(null);
          }}
        />
      </Center>

      {/* 4. Post-processing Outline Effect */}
      {/* multisampling={8} smooths jagged edges */}
      {/* autoClear={false} ensures it renders on top of the scene */}
      <EffectComposer autoClear={false} multisampling={8}>
        <Outline
          selection={hovered ? [hovered] : []} // The object(s) to outline
          visibleEdgeColor="white" // Color when not obstructed
          hiddenEdgeColor="white"  // Color when behind other objects
          blur
          edgeStrength={10}        // Intensity of the glow/outline
          width={1000}             // Resolution scale (optional)
        />
      </EffectComposer>
    </>
  );
}

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 3, 6], fov: 60 }}>
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
  );
}
