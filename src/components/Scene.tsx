import { type RefObject, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, OrbitControls, Stats, useAnimations, useGLTF, useHelper } from "@react-three/drei";
import * as THREE from "three";
import Overlay from "./Overlay";

type CameraReadout = {
  position: THREE.Vector3;
  rotation: THREE.Euler;
};

type ReflectionPanel = {
  intensity: number;
  color: string;
  position: [number, number, number];
  scale: [number, number, number];
};

const reflectionPanels: ReflectionPanel[] = [
  { intensity: 0.4, color: "#ffffff", position: [0, 0, 16], scale: [8, 8, 1] },
  { intensity: 0.4, color: "#fff2c2", position: [-10, 0, 10], scale: [7, 9, 1] },
  { intensity: 0.4, color: "#ffffff", position: [-7, 5, 12], scale: [7, 9, 1] },
  { intensity: 0.4, color: "#ffd66b", position: [0, 7, 14], scale: [7, 9, 1] },
  { intensity: 0.4, color: "#ffffff", position: [7, 5, 12], scale: [7, 9, 1] },
  { intensity: 0.4, color: "#fff2c2", position: [10, 0, 10], scale: [7, 9, 1] },
  { intensity: 0.4, color: "#ffd66b", position: [-7, -5, 11], scale: [7, 8, 1] },
  { intensity: 0.4, color: "#ffffff", position: [0, -7, 13], scale: [7, 8, 1] },
  { intensity: 0.4, color: "#ffd66b", position: [7, -5, 11], scale: [7, 8, 1] },
  ...Array.from({ length: 24 }, (_, index): ReflectionPanel => {
    const angle = (index / 24) * Math.PI * 2;
    return {
      intensity: 0.4,
      color: index % 3 === 0 ? "#ffd66b" : "#fff2c2",
      position: [Math.sin(angle) * 25, 0, Math.cos(angle) * 25],
      scale: [8, 12, 1],
    };
  }),
];

// Every logo mesh uses the same finish, so share one material across the model.
const goldLogoMaterial = new THREE.MeshStandardMaterial({
  color: "#d4af37",
  metalness: 1,
  roughness: 0,
});

function LightformerGuide({ panel, target, logoRef }: {
  panel: ReflectionPanel;
  target: [number, number, number];
  logoRef: RefObject<THREE.Group | null>;
}) {
  const guideRef = useRef<THREE.Group>(null);
  const worldTarget = useMemo(() => new THREE.Vector3(), []);
  const logoPosition = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    if (!guideRef.current || !logoRef.current) return;
    logoRef.current.getWorldPosition(logoPosition);
    worldTarget.set(target[0], target[1], target[2]).add(logoPosition);
    guideRef.current.lookAt(worldTarget);
  });

  return (
    <group ref={guideRef} position={panel.position} scale={panel.scale}>
      <mesh>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          color={panel.color}
          transparent
          opacity={0.16}
          side={THREE.DoubleSide}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          color={panel.color}
          wireframe
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function LightformerGuides({ visible, target, logoRef }: {
  visible: boolean;
  target: [number, number, number];
  logoRef: RefObject<THREE.Group | null>;
}) {
  const guideRigRef = useRef<THREE.Group>(null);
  const logoPosition = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    if (!guideRigRef.current || !logoRef.current) return;
    logoRef.current.getWorldPosition(logoPosition);
    guideRigRef.current.position.copy(logoPosition);
  });

  if (!visible) return null;

  return (
    <group ref={guideRigRef}>
      {reflectionPanels.map((panel, index) => (
        <LightformerGuide key={index} panel={panel} target={target} logoRef={logoRef} />
      ))}
    </group>
  );
}

function LogoEnvironment({ enabled, showGuides, logoRef, isSmallScreen }: {
  enabled: boolean;
  showGuides: boolean;
  logoRef: RefObject<THREE.Group | null>;
  isSmallScreen: boolean;
}) {
  const { scene } = useGLTF("/assets/models/KBLogo/KBLOGO.glb");
  const target = useMemo<[number, number, number]>(() => {
    scene.updateMatrixWorld(true);
    const center = new THREE.Box3().setFromObject(scene).getCenter(new THREE.Vector3());
    center.applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    return [center.x, center.y, center.z];
  }, [scene]);

  return (
    <>
      {enabled && <Environment resolution={isSmallScreen ? 128 : 256} background={false}>
        {(isSmallScreen ? reflectionPanels.slice(0, 9) : reflectionPanels).map((panel, index) => (
          <Lightformer key={index} form="rect" target={target} {...panel} />
        ))}
      </Environment>}
      <LightformerGuides visible={showGuides} target={target} logoRef={logoRef} />
    </>
  );
}

function PointLightGuide({ lightRef }: { lightRef: RefObject<THREE.PointLight | null> }) {
  // Drei's useHelper type predates React 19's nullable RefObject.current type.
  useHelper(lightRef as unknown as RefObject<THREE.Object3D>, THREE.PointLightHelper, 1);
  return null;
}

function SpotLightGuide({ lightRef, color }: {
  lightRef: RefObject<THREE.SpotLight | null>;
  color: string;
}) {
  // Drei's useHelper type predates React 19's nullable RefObject.current type.
  useHelper(lightRef as unknown as RefObject<THREE.Object3D>, THREE.SpotLightHelper, color);
  return null;
}

function StudioLights({ enabled, showHelpers, logoRef, isSmallScreen }: {
  enabled: boolean;
  showHelpers: boolean;
  logoRef: RefObject<THREE.Group | null>;
  isSmallScreen: boolean;
}) {
  const keyLight = useRef<THREE.PointLight>(null);
  const fillLight = useRef<THREE.SpotLight>(null);
  const backLight = useRef<THREE.SpotLight>(null);
  const lightRigRef = useRef<THREE.Group>(null);
  const logoPosition = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    const target = logoRef.current;
    if (!target) return;
    if (fillLight.current) fillLight.current.target = target;
    if (backLight.current) backLight.current.target = target;
  }, [logoRef, isSmallScreen]);

  useFrame(() => {
    if (!lightRigRef.current || !logoRef.current) return;
    logoRef.current.getWorldPosition(logoPosition);
    lightRigRef.current.position.copy(logoPosition);
  });

  return (
    <group ref={lightRigRef}>
      <pointLight ref={keyLight} position={[-7, 8, 10]} color="#fff1d6" intensity={enabled ? 1000 : 0} decay={2} />
      {!isSmallScreen && <>
        <spotLight ref={fillLight} position={[8, 2, 8]} color="#c7ddff" intensity={enabled ? 45 : 0} angle={Math.PI / 3} penumbra={0.8} decay={2} />
        <spotLight ref={backLight} position={[0, 7, -9]} color="#ffd36b" intensity={enabled ? 130 : 0} angle={Math.PI / 3} penumbra={0.7} decay={2} />
      </>}
      {showHelpers && <>
        <PointLightGuide lightRef={keyLight} />
        {!isSmallScreen && <SpotLightGuide lightRef={fillLight} color="#c7ddff" />}
        {!isSmallScreen && <SpotLightGuide lightRef={backLight} color="#ffd36b" />}
      </>}
    </group>
  );
}

function CameraPositionReadout({ onUpdate }: { onUpdate: (readout: CameraReadout) => void }) {
  const { camera } = useThree();

  useEffect(() => {
    const update = () => {
      onUpdate({
        position: camera.position.clone(),
        rotation: camera.rotation.clone(),
      });
    };

    update();
    const intervalId = window.setInterval(update, 250);
    return () => window.clearInterval(intervalId);
  }, [camera, onUpdate]);

  return null;
}

function CameraIntro({ onComplete }: { onComplete: () => void }) {
  const { camera } = useThree();
  const elapsed = useRef(0);
  const finished = useRef(false);
  const duration = 10.1;
  
  useFrame((_, delta) => {
    if (finished.current) return;

    elapsed.current = Math.min(elapsed.current + delta, duration);
    const progress = elapsed.current / duration;
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    camera.position.set(0, 0, 25 * easedProgress);

    if (progress > 0) camera.lookAt(0, 0, 0);

    if (progress >= 1) {
      finished.current = true;
      onComplete();
    }
  });

  return null;
}

function KBLogo({ logoRef, onPositioned }: {
  logoRef: RefObject<THREE.Group | null>;
  onPositioned: () => void;
}) {
  const { scene, animations } = useGLTF("/assets/models/KBLogo/KBLOGO.glb");
  const { actions, mixer } = useAnimations(animations, scene);
  const { size } = useThree();
  const [animationFinished, setAnimationFinished] = useState(false);
  const [moveStarted, setMoveStarted] = useState(false);
  const moveElapsed = useRef(0);
  const hasNotifiedPosition = useRef(false);
  const spinDelaySeconds = 4;
  const moveDuration = 1.6;
  useFrame((_, delta) => {
    const logo = logoRef.current;
    if (!logo) return;

    if (animationFinished) logo.rotation.y += delta * 0.5;
    if (!moveStarted) return;

    moveElapsed.current = Math.min(moveElapsed.current + delta, moveDuration);
    const progress = moveElapsed.current / moveDuration;
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const isSmallScreen = size.width <= 768;
    const targetX = isSmallScreen ? 0 : 15;
    const targetY = isSmallScreen ? -2.5 : 0;
    const targetScale = isSmallScreen ? 0.52 : 0.78;

    logo.position.set(targetX * easedProgress, targetY * easedProgress, 0);
    logo.scale.setScalar(1 + (targetScale - 1) * easedProgress);

    if (progress >= 1 && !hasNotifiedPosition.current) {
      hasNotifiedPosition.current = true;
      onPositioned();
    }
  });

  useEffect(() => {
    scene.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;
      object.material = goldLogoMaterial;
    });
  }, [scene]);

  useEffect(() => {
    const animationActions = Object.values(actions).filter(
      (action): action is THREE.AnimationAction => action !== null && action !== undefined,
    );

    if (animationActions.length === 0) {
      const timeoutId = window.setTimeout(() => {
        setAnimationFinished(true);
        setMoveStarted(true);
      }, spinDelaySeconds * 1000);
      return () => window.clearTimeout(timeoutId);
    }

    setAnimationFinished(false);
    const finishedActions = new Set<THREE.AnimationAction>();
    let spinDelayTimeout: number | undefined;
    const onFinished = (event: { action: THREE.AnimationAction }) => {
      finishedActions.add(event.action);
      if (finishedActions.size === animationActions.length) {
        spinDelayTimeout = window.setTimeout(() => {
          setAnimationFinished(true);
          setMoveStarted(true);
        }, spinDelaySeconds * 1000);
      }
    };

    mixer.addEventListener("finished", onFinished);
    animationActions.forEach((action) => {
      action.reset();
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
      action.play();
    });

    return () => {
      mixer.removeEventListener("finished", onFinished);
      if (spinDelayTimeout !== undefined) window.clearTimeout(spinDelayTimeout);
      animationActions.forEach((action) => action.stop());
    };
  }, [actions, mixer, spinDelaySeconds]);

  return (
    <group ref={logoRef}>
      <group rotation={[Math.PI / 2, 0, 0]}>
        <primitive object={scene} position={[0, 0, 0]} />
      </group>
    </group>
  );
}

export default function Scene() {
  const logoRef = useRef<THREE.Group>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);
  const [lightformersEnabled, setLightformersEnabled] = useState(true);
  const [studioLightsEnabled, setStudioLightsEnabled] = useState(true);
  const [showLightformerGuides, setShowLightformerGuides] = useState(false);
  const [showStudioLightHelpers, setShowStudioLightHelpers] = useState(false);
  const [cameraIntroFinished, setCameraIntroFinished] = useState(false);
  const [navigationVisible, setNavigationVisible] = useState(false);
  const [showPerformanceStats, setShowPerformanceStats] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(() => window.innerWidth <= 768);
  const [cameraReadout, setCameraReadout] = useState<CameraReadout>({
    position: new THREE.Vector3(0, 0, 0),
    rotation: new THREE.Euler(0, 0, 0),
  });
  const rotationDegrees = {
    x: THREE.MathUtils.radToDeg(cameraReadout.rotation.x),
    y: THREE.MathUtils.radToDeg(cameraReadout.rotation.y),
    z: THREE.MathUtils.radToDeg(cameraReadout.rotation.z),
  };
  const format = (value: number) => value.toFixed(2);

  useEffect(() => {
    const updateScreenSize = () => setIsSmallScreen(window.innerWidth <= 768);
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  return (
    <div className="scene-shell" style={{ position: "relative", background: "#000" }}>
      <Canvas
        dpr={isSmallScreen ? 1 : [1, 1.5]}
        gl={{ antialias: false, alpha: false, stencil: false, preserveDrawingBuffer: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 0], rotation: [0, 0, 0], fov: 60, near: 0.1, far: 100 }}
      >
        <LogoEnvironment enabled={lightformersEnabled} showGuides={showLightformerGuides} logoRef={logoRef} isSmallScreen={isSmallScreen} />
        <StudioLights enabled={studioLightsEnabled} showHelpers={showStudioLightHelpers} logoRef={logoRef} isSmallScreen={isSmallScreen} />
        <KBLogo logoRef={logoRef} onPositioned={() => setNavigationVisible(true)} />
        <CameraIntro onComplete={() => setCameraIntroFinished(true)} />
        {!isSmallScreen && <CameraPositionReadout onUpdate={setCameraReadout} />}
        {showPerformanceStats && !isSmallScreen && <Stats parent={statsContainerRef as unknown as RefObject<HTMLElement>} />}
        {cameraIntroFinished && (
          <OrbitControls
            enableDamping
            maxPolarAngle={Math.PI / 2 - 0}
            enablePan={false}
            minDistance={0}
            maxDistance={100}
          />
        )}
      </Canvas>

      <Overlay navigationVisible={navigationVisible} />

      {showPerformanceStats && !isSmallScreen && (
        <div
          ref={statsContainerRef}
          style={{ position: "absolute", left: 16, bottom: 80, zIndex: 20, pointerEvents: "auto" }}
        />
      )}

      {!isSmallScreen && <>
      <div
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          padding: "12px 16px",
          borderRadius: 8,
          color: "#f8fafc",
          background: "rgba(0, 0, 0, 0.72)",
          font: "13px/1.6 monospace",
          pointerEvents: "none",
        }}
      >
        <div>Camera position</div>
        <div>
          x: {format(cameraReadout.position.x)} &nbsp; y: {format(cameraReadout.position.y)} &nbsp; z: {format(cameraReadout.position.z)}
        </div>
        <div style={{ marginTop: 6 }}>Camera rotation (degrees)</div>
        <div>
          x: {format(rotationDegrees.x)} &nbsp; y: {format(rotationDegrees.y)} &nbsp; z: {format(rotationDegrees.z)}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          padding: "10px 12px",
          borderRadius: 8,
          color: "#f8fafc",
          background: "rgba(0, 0, 0, 0.72)",
          font: "13px/1.6 monospace",
        }}
      >
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            checked={lightformersEnabled}
            onChange={(event) => setLightformersEnabled(event.target.checked)}
          />
          Enable lightformers
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
          <input
            type="checkbox"
            checked={studioLightsEnabled}
            onChange={(event) => setStudioLightsEnabled(event.target.checked)}
          />
          Enable key / fill / back lights
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
          <input
            type="checkbox"
            checked={showLightformerGuides}
            onChange={(event) => setShowLightformerGuides(event.target.checked)}
          />
          Show lightformer guides
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
          <input
            type="checkbox"
            checked={showStudioLightHelpers}
            onChange={(event) => setShowStudioLightHelpers(event.target.checked)}
          />
          Show key / fill / backlight helpers
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
          <input
            type="checkbox"
            checked={showPerformanceStats}
            onChange={(event) => setShowPerformanceStats(event.target.checked)}
          />
          Show performance stats
        </label>
      </div>
      </>}


    </div>
  );
}
