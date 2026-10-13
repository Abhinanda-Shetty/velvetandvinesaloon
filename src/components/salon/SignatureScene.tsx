import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/** Procedural sculptural bloom: layered lacquered petals around a gold core. */
function Bloom() {
  const group = useRef<THREE.Group>(null);
  const petalGeo = useMemo(() => {
    const g = new THREE.SphereGeometry(1, 48, 32);
    g.scale(0.42, 1.25, 0.12);
    g.translate(0, 1.15, 0);
    return g;
  }, []);
  const layers = [
    { count: 7, tilt: 1.05, scale: 1.0, color: "#3a1424" },
    { count: 6, tilt: 0.7, scale: 0.82, color: "#552538" },
    { count: 5, tilt: 0.38, scale: 0.62, color: "#6e2f45" },
  ];

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const dt = Math.min(delta, 0.05);
    g.rotation.y += dt * 0.12;
    const tx = state.pointer.y * 0.18 + 0.35;
    const tz = -state.pointer.x * 0.18;
    g.rotation.x += (tx - g.rotation.x) * (1 - Math.exp(-2 * dt));
    g.rotation.z += (tz - g.rotation.z) * (1 - Math.exp(-2 * dt));
  });

  return (
    <group ref={group} rotation={[0.35, 0, 0]}>
      {layers.map((layer, li) =>
        Array.from({ length: layer.count }).map((_, i) => {
          const a = (i / layer.count) * Math.PI * 2 + li * 0.45;
          return (
            <group key={`${li}-${i}`} rotation={[0, a, 0]}>
              <mesh geometry={petalGeo} rotation={[layer.tilt, 0, 0]} scale={layer.scale}>
                <meshPhysicalMaterial color={layer.color} roughness={0.28} metalness={0.15} clearcoat={1} clearcoatRoughness={0.15} sheen={1} sheenColor="#c6a875" sheenRoughness={0.5} />
              </mesh>
            </group>
          );
        }),
      )}
      <mesh>
        <icosahedronGeometry args={[0.32, 4]} />
        <meshStandardMaterial color="#c6a875" metalness={1} roughness={0.22} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.9, 0.012, 16, 160]} />
        <meshStandardMaterial color="#c6a875" metalness={1} roughness={0.3} />
      </mesh>
    </group>
  );
}

export default function SignatureScene() {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0.4, 6], fov: 38 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 5, 4]} intensity={2.2} color="#f2ebdd" />
      <pointLight position={[-4, -2, 2]} intensity={12} color="#9eaa94" />
      <Environment resolution={128}>
        <Lightformer intensity={2.2} position={[0, 5, 0]} scale={[10, 10, 1]} rotation-x={Math.PI / 2} />
        <Lightformer intensity={1.4} color="#c6a875" position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[20, 1.2, 1]} />
        <Lightformer intensity={0.8} color="#552538" position={[5, 0, 2]} rotation-y={-Math.PI / 2} scale={[10, 4, 1]} />
      </Environment>
      <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.6}>
        <Bloom />
      </Float>
    </Canvas>
  );
}
