import { BaseScene } from "@/components/scene";
import { Canvas } from "@react-three/fiber";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <BaseScene />
    </main>
  );
}
