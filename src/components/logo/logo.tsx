import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Group, Mesh, MeshStandardMaterial, Texture } from "three";

export const Logo = ({
  color,
  texture,
}: {
  color: string;
  texture: Texture | null;
}) => {
  const { scene, nodes } = useGLTF("/model/logo.glb");
  const logoRef = useRef<Group>(null);

  // Apply color or texture dynamically
  useEffect(() => {
    console.log(color, texture);

    if (logoRef.current) {
      // Traverse through the scene to find all meshes and update their material
      logoRef.current.traverse((mesh) => {
        if ((mesh as Mesh).isMesh) {
          if (texture) {
            // If texture is applied, set it as the material's map
            (mesh as Mesh).material = new MeshStandardMaterial({
              map: texture,
            });
          } else {
            // Otherwise, apply the selected color
            (mesh as Mesh).material = new MeshStandardMaterial({
              color: color,
            });
          }
        }
      });
    }
  }, [color, texture]);

  // Rotate the model slowly on each frame
  useFrame(() => {
    if (logoRef.current) {
      logoRef.current.rotation.y += 0.001;
      logoRef.current.rotation.x += 0.0001;
    }
  });

  return <primitive object={scene} ref={logoRef} scale={2} />;
};
