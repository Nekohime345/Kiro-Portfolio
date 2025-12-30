// src/declarations.d.ts
import { Object3DNode } from "@react-three/fiber";
import { ShaderMaterial } from "three";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      waterShaderMaterial: Object3DNode<ShaderMaterial, typeof ShaderMaterial> & {
        uTime?: number;
        uColorDeep?: string;
        uColorSurface?: string;
        uColorFoam?: string;
        uBigWavesElevation?: number;
        uBigWavesFrequency?: [number, number];
        uBigWavesSpeed?: number;
        uScale?: number;
        uDepthMap?: any;
        uResolution?: [number, number];
        uCameraNear?: number;
        uCameraFar?: number;
        uFoamThreshold?: number;
        transparent?: boolean;
        depthWrite?: boolean;
      };
      skyShaderMaterial: Object3DNode<ShaderMaterial, typeof ShaderMaterial> & {
        uColorBottom?: string;
        uColorTop?: string;
        uCloudColor?: string;
        uCloudShadow?: string;
        uTime?: number;
        uCloudScale?: number;
        uCloudDensity?: number;
        side?: any;
      };
    }
  }
}
