"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

import { useState } from "react";
import { Model } from "./model/model";
import { Texture, TextureLoader } from "three";
import { Button } from "./ui/button";

const LogoScene = () => {
  const [color, setColor] = useState("red"); // Default color
  const [texture, setTexture] = useState<Texture | null>(null); // Initially no texture
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
        style={{ height: "100vh", width: "100vw" }}
        camera={{ position: [0, 0, 5], fov: 50 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 0, 5]} />
        <OrbitControls />

        <Model color={color} texture={texture} path={currentModel} />

        <Environment preset="sunset" />
      </Canvas>
    </>
  );
};

export default LogoScene;
