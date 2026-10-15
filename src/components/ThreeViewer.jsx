import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";

function Bottle({ palette }) {
  return (
    <group>
      {/* body */}
      <mesh position={[0, -0.4, 0]}>
        <boxGeometry args={[1.1, 1.6, 0.7]} />
        <meshPhysicalMaterial
          color={palette.glass}
          transmission={0.65}
          thickness={1.2}
          roughness={0.15}
          metalness={0.05}
          ior={1.45}
          clearcoat={1}
        />
      </mesh>
      {/* liquid */}
      <mesh position={[0, -0.55, 0]}>
        <boxGeometry args={[0.98, 1.15, 0.58]} />
        <meshPhysicalMaterial
          color={palette.liquid}
          transmission={0.4}
          roughness={0.3}
          thickness={0.8}
        />
      </mesh>
      {/* neck */}
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.35, 32]} />
        <meshStandardMaterial color={palette.glass} metalness={0.1} roughness={0.2} />
      </mesh>
      {/* cap */}
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.32, 0.32, 0.35, 32]} />
        <meshStandardMaterial
          color={palette.cap}
          metalness={0.9}
          roughness={0.15}
          envMapIntensity={1.2}
        />
      </mesh>
      {/* cap top */}
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.1, 32]} />
        <meshStandardMaterial color={palette.cap} metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

export default function ThreeViewer({ palette }) {
  return (
    <div className="three-wrap">
      <Canvas camera={{ position: [0, 0.4, 3.2], fov: 40 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 4, 3]} intensity={1.2} />
          <directionalLight position={[-3, 2, -2]} intensity={0.5} />
          <Bottle palette={palette} />
          <ContactShadows position={[0, -1.35, 0]} opacity={0.5} blur={2.4} far={4} />
          <Environment preset="studio" />
          <OrbitControls
            enablePan={false}
            minDistance={2.2}
            maxDistance={6}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 1.8}
            autoRotate
            autoRotateSpeed={1.2}
          />
        </Suspense>
      </Canvas>
      <p className="three-hint">Drag to rotate · scroll to zoom</p>
    </div>
  );
}