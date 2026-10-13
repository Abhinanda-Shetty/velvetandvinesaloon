import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/** Salon shears: two pivoting forged blades with finger rings. */
function Shears({ metal, gold }: { metal: string; gold: string }) {
  const group = useRef<THREE.Group>(null);
  const left = useRef<THREE.Group>(null);
  const right = useRef<THREE.Group>(null);
  const previousScroll = useRef(0);
  const scrollEnergy = useRef(0);
  const blade = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.11, -0.1);
    shape.lineTo(0.14, 0.1);
    shape.quadraticCurveTo(0.2, 1.8, 0, 2.55);
    shape.quadraticCurveTo(-0.12, 1.2, -0.11, -0.1);
    return new THREE.ExtrudeGeometry(shape, { depth: 0.055, bevelEnabled: true, bevelSize: 0.025, bevelThickness: 0.025, bevelSegments: 3, steps: 1 });
  }, []);
  useEffect(() => () => blade.dispose(), [blade]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const dt = Math.min(delta, 0.05);
    const distance = Math.abs(window.scrollY - previousScroll.current);
    previousScroll.current = window.scrollY;
    scrollEnergy.current = Math.max(Math.min(distance / 60, 1), scrollEnergy.current * Math.exp(-5 * dt));
    const opening = 0.12 + scrollEnergy.current * 0.32 + Math.sin(state.clock.elapsedTime * 1.2) * 0.035;
    const blend = 1 - Math.exp(-7 * dt);
    if (left.current) left.current.rotation.z += (opening - left.current.rotation.z) * blend;
    if (right.current) right.current.rotation.z += (-opening - right.current.rotation.z) * blend;
    g.rotation.y += (state.pointer.x * 0.18 - g.rotation.y) * blend;
    g.rotation.x += (state.pointer.y * 0.1 - g.rotation.x) * blend;
    g.rotation.z = 0;
    g.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.08;
  });

  return (
    <group ref={group}>
      {[0, 1].map((side) => (
        <group key={side} ref={side === 0 ? left : right} position={[0, 0, side * 0.09]}>
          <mesh geometry={blade}>
            <meshPhysicalMaterial color={metal} metalness={0.95} roughness={0.2} clearcoat={1} />
          </mesh>
          <mesh position={[0, -0.62, 0]}>
            <boxGeometry args={[0.11, 1.2, 0.1]} />
            <meshStandardMaterial color={gold} metalness={0.85} roughness={0.25} />
          </mesh>
          <mesh position={[0, -1.45, 0]} scale={[0.8, 1, 1]}>
            <torusGeometry args={[0.38, 0.075, 20, 64]} />
            <meshStandardMaterial color={gold} metalness={0.9} roughness={0.22} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 0, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.13, 32]} />
        <meshStandardMaterial color={gold} metalness={1} roughness={0.2} />
      </mesh>
    </group>
  );
}

export default function SignatureScene() {
  const [palette, setPalette] = useState<{ metal: string; gold: string }>();
  useEffect(() => {
    const css = getComputedStyle(document.documentElement);
    setPalette({ metal: css.getPropertyValue("--tool-metal").trim(), gold: css.getPropertyValue("--tool-gold").trim() });
  }, []);
  if (!palette) return null;
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0.4, 8], fov: 38 }} gl={{ antialias: true, alpha: true }} eventSource={document.body} eventPrefix="client">
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 5, 4]} intensity={3} />
      <pointLight position={[-4, -2, 2]} intensity={15} color={palette.gold} />
      <Environment resolution={128}>
        <Lightformer intensity={2.2} position={[0, 5, 0]} scale={[10, 10, 1]} rotation-x={Math.PI / 2} />
        <Lightformer intensity={1.4} color={palette.gold} position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[20, 1.2, 1]} />
        <Lightformer intensity={2} position={[5, 0, 2]} rotation-y={-Math.PI / 2} scale={[10, 4, 1]} />
      </Environment>
      <Shears metal={palette.metal} gold={palette.gold} />
    </Canvas>
  );
}
