"use client";

import { Plane, useTexture } from "@react-three/drei";
import { Texture } from "three";
import { Model } from "../model/model";

export const Content = ({
  color,
  texture,
  model,
}: {
  color: string;
  texture: Texture | null;
  model: string;
}) => {
  const backgroundTexture = useTexture("/model/landscape.png");

  return (
    <>
      {/* The Model */}
      <Model color={color} texture={texture} path={model} />

      {/* Distant Background */}
      <mesh position={[0, 0, -100]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial map={backgroundTexture} />
      </mesh>

      {/* Floor */}
      <Plane
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -50, -50]}
        args={[100, 100]}
      >
        <meshStandardMaterial color="gray" />
      </Plane>
    </>
  );
};
