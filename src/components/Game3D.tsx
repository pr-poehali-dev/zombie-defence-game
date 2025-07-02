import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky, Environment } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";

// Building Component
const Building = ({ position, height, width, depth, color }: any) => {
  return (
    <mesh position={position}>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

// Ground Component
const Ground = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial color="#2a2a2a" />
    </mesh>
  );
};

// Street Component
const Street = ({ position, rotation, length }: any) => {
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={[length, 0.1, 8]} />
      <meshStandardMaterial color="#1a1a1a" />
    </mesh>
  );
};

// Player Character (Simple Capsule)
const Player = () => {
  const playerRef = useRef<THREE.Mesh>(null);

  return (
    <group position={[0, 1, 0]}>
      {/* Body */}
      <mesh ref={playerRef} position={[0, 0, 0]}>
        <capsuleGeometry args={[0.5, 1.5]} />
        <meshStandardMaterial color="#4a90e2" />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.3]} />
        <meshStandardMaterial color="#f4c2a1" />
      </mesh>
    </group>
  );
};

// Zombie Component
const Zombie = ({ position }: any) => {
  return (
    <group position={position}>
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <capsuleGeometry args={[0.5, 1.5]} />
        <meshStandardMaterial color="#2d4a2d" />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.3]} />
        <meshStandardMaterial color="#3a5a3a" />
      </mesh>
      {/* Eyes (red glow) */}
      <mesh position={[-0.1, 1.3, 0.25]}>
        <sphereGeometry args={[0.05]} />
        <meshBasicMaterial color="#ff0000" />
      </mesh>
      <mesh position={[0.1, 1.3, 0.25]}>
        <sphereGeometry args={[0.05]} />
        <meshBasicMaterial color="#ff0000" />
      </mesh>
    </group>
  );
};

// City Scene Component
const CityScene = ({ isNight }: { isNight: boolean }) => {
  return (
    <>
      {/* Ground */}
      <Ground />

      {/* Buildings */}
      <Building
        position={[-20, 5, -20]}
        height={10}
        width={8}
        depth={8}
        color="#4a4a4a"
      />
      <Building
        position={[-10, 8, -25]}
        height={16}
        width={6}
        depth={10}
        color="#5a5a5a"
      />
      <Building
        position={[15, 6, -30]}
        height={12}
        width={10}
        depth={8}
        color="#3a3a3a"
      />
      <Building
        position={[25, 4, -15]}
        height={8}
        width={7}
        depth={7}
        color="#6a6a6a"
      />
      <Building
        position={[-30, 7, 10]}
        height={14}
        width={9}
        depth={6}
        color="#4a4a4a"
      />
      <Building
        position={[20, 9, 20]}
        height={18}
        width={8}
        depth={12}
        color="#5a5a5a"
      />
      <Building
        position={[-15, 3, 25]}
        height={6}
        width={6}
        depth={8}
        color="#3a3a3a"
      />
      <Building
        position={[0, 12, -40]}
        height={24}
        width={12}
        depth={12}
        color="#2a2a2a"
      />

      {/* Streets */}
      <Street position={[0, 0, 0]} rotation={[0, 0, 0]} length={100} />
      <Street
        position={[0, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        length={100}
      />
      <Street position={[20, 0, 0]} rotation={[0, 0, 0]} length={60} />
      <Street position={[-20, 0, 0]} rotation={[0, 0, 0]} length={60} />

      {/* Player */}
      <Player />

      {/* Zombies */}
      <Zombie position={[10, 1, 5]} />
      <Zombie position={[-8, 1, -10]} />
      <Zombie position={[15, 1, -5]} />
      <Zombie position={[-12, 1, 8]} />
      <Zombie position={[5, 1, -15]} />

      {/* Lighting */}
      <ambientLight intensity={isNight ? 0.1 : 0.4} />
      <directionalLight
        position={[50, 50, 25]}
        intensity={isNight ? 0.3 : 1}
        color={isNight ? "#4444ff" : "#ffffff"}
        castShadow
      />

      {/* Street Lights for night */}
      {isNight && (
        <>
          <pointLight
            position={[10, 8, 10]}
            intensity={2}
            color="#ffaa00"
            distance={20}
          />
          <pointLight
            position={[-10, 8, -10]}
            intensity={2}
            color="#ffaa00"
            distance={20}
          />
          <pointLight
            position={[25, 8, 0]}
            intensity={2}
            color="#ffaa00"
            distance={20}
          />
          <pointLight
            position={[-25, 8, 0]}
            intensity={2}
            color="#ffaa00"
            distance={20}
          />
        </>
      )}

      {/* Sky */}
      <Sky
        distance={450000}
        sunPosition={isNight ? [0, -1, 0] : [100, 20, 100]}
        inclination={isNight ? 0.8 : 0.49}
        azimuth={0.25}
      />
    </>
  );
};

interface Game3DProps {
  isNight: boolean;
}

const Game3D = ({ isNight }: Game3DProps) => {
  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{
          position: [0, 5, 10],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
        shadows
      >
        <Suspense fallback={null}>
          <CityScene isNight={isNight} />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={3}
            maxDistance={50}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2}
          />
          <Environment preset={isNight ? "night" : "city"} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Game3D;
