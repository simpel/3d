import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import {
  Group,
  Mesh,
  MeshStandardMaterial,
  Texture,
  Box3,
  Vector3,
} from "three";

export const Model = ({
  color,
  texture,
  path = "/model/logo.glb",
}: {
  color: string;
  texture: Texture | null;
  path: string;
}) => {
  const { scene } = useGLTF(path); // Load the model
  const logoRef = useRef<Group>(null); // Reference to the model

  // Handle model switch and centering
  useEffect(() => {
    if (scene && logoRef.current) {
      logoRef.current.clear(); // Clear previous model's children if switching

      // Add new model's scene to the logoRef
      logoRef.current.add(scene);

      // Traverse and apply color/texture to the new model
      scene.traverse((mesh) => {
        if ((mesh as unknown as Mesh).isMesh) {
          if (texture) {
            (mesh as unknown as Mesh).material = new MeshStandardMaterial({
              map: texture,
            });
          } else {
            (mesh as unknown as Mesh).material = new MeshStandardMaterial({
              color: color,
            });
          }
        }
      });
    }
  }, [color, texture, path, scene]);

  // Rotate the model slowly on each frame
  useFrame(() => {
    if (logoRef.current) {
      logoRef.current.rotation.y += 0.001;
      logoRef.current.rotation.x += 0.0001;
    }
  });

  return <group ref={logoRef} />;
};
