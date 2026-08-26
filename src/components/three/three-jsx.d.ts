// Type declarations for React Three Fiber JSX elements
import "react";
import { Object3D } from "three";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      points: React.ThreeElements<"points">;
      pointsMaterial: React.ThreeElements<"pointsMaterial">;
      color: React.ThreeElements<"color">;
      fog: React.ThreeElements<"fog">;
      ambientLight: React.ThreeElements<"ambientLight">;
      directionalLight: React.ThreeElements<"directionalLight">;
      pointLight: React.ThreeElements<"pointLight">;
    }
  }
}

declare module "@react-three/fiber" {
  interface ThreeElements {
    points: JSX.IntrinsicElements["points"];
    pointsMaterial: JSX.IntrinsicElements["pointsMaterial"];
  }
}