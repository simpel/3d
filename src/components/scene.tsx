"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

import { EffectComposer, DepthOfField } from "@react-three/postprocessing";
import { useState } from "react";
import { Logo } from "./logo/logo";
import { Texture, TextureLoader } from "three";
import { Button } from "./ui/button";
import { log } from "three/webgpu";

const LogoScene = () => {
  const [color, setColor] = useState("red"); // Default color
  const [texture, setTexture] = useState<Texture | null>(null); // Initially no texture

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

        {/* Pass setFocusDistance to Logo to dynamically adjust focus */}
        <Logo color={color} texture={texture} />

        <Environment preset="sunset" />
      </Canvas>
    </>
  );
};

export default LogoScene;
