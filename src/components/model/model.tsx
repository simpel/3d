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
  const { scene } = useGLTF(path);
  const logoRef = useRef<Group>(null);

  useEffect(() => {
    if (scene && logoRef.current) {
      logoRef.current.clear();
      logoRef.current.add(scene);

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

      const box = new Box3().setFromObject(scene);
      const center = new Vector3();
      box.getCenter(center);
      scene.position.sub(center);
    }
  }, [color, texture, path, scene]);

  useFrame(() => {
    if (logoRef.current) {
      logoRef.current.rotation.y += 0.001;
      logoRef.current.rotation.x += 0.0001;
    }
  });

  return <group ref={logoRef} />;
};
