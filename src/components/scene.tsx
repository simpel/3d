"use client";

import { Button } from "./ui/button";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  Plane,
  useTexture,
} from "@react-three/drei";

import { useState } from "react";
import { Texture, TextureLoader } from "three";
import { Content } from "./content/content";

export const BaseScene = () => {
  const [color, setColor] = useState("red");
  const [texture, setTexture] = useState<Texture | null>(null);
  const [currentModel, setCurrentModel] = useState<string>("/model/logo.glb");

  const handleApplyTexture = () => {
    const loader = new TextureLoader();
    loader.load("/model/texture1.png", (loadedTexture) => {
      setTexture(loadedTexture);
    });
  };

  const onClickColor = (color: string) => {
    setColor(color);
    setTexture(null);
  };

  return (
    <>
      <div className="absolute flex gap-4 z-50 p-4">
        <Button
          variant={"outline"}
          onClick={() => setCurrentModel("/model/logo.glb")}
        >
          Use Logo
        </Button>

        <Button
          variant={"outline"}
          onClick={() => setCurrentModel("/model/splash.glb")}
        >
          Splash
        </Button>

        <Button className="bg-red-500" onClick={() => onClickColor("red")}>
          Red
        </Button>
        <Button className="bg-green-500" onClick={() => onClickColor("green")}>
          Green
        </Button>
        <Button className="bg-blue-500" onClick={() => onClickColor("blue")}>
          Blue
        </Button>
        <Button onClick={handleApplyTexture}>Apply Texture</Button>
      </div>

      <Canvas
        shadows
        style={{ height: "100vh", width: "100vw" }}
        camera={{ position: [0, 0, 5], fov: 50 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight castShadow position={[0, 5, 5]} />
        <OrbitControls />

        <Content color={color} texture={texture} model={currentModel} />

        <Environment preset="sunset" />
      </Canvas>
    </>
  );
};
