"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Box,
  Float,
  Icosahedron,
  Octahedron,
  OrbitControls,
  Sparkles,
  Sphere,
  Torus,
} from "@react-three/drei";
import * as THREE from "three";

export type Feature3DType = "shield" | "eq" | "matrix" | "chip";
export type Feature3DTheme = "dark" | "light";

export interface Feature3DVisualProps {
  type: Feature3DType;
  theme: Feature3DTheme;
}

interface SceneProps {
  theme: Feature3DTheme;
}

function ShieldScene({ theme }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);

  const isDark = theme === "dark";

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
      groupRef.current.rotation.x =
        Math.sin(time * 0.5) * 0.08;
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.42;
    }

    if (innerRingRef.current) {
      innerRingRef.current.rotation.z -= delta * 0.55;
    }
  });

  return (
    <group ref={groupRef}>
      <Float
        speed={1.4}
        rotationIntensity={0.25}
        floatIntensity={0.45}
      >
        <Icosahedron args={[1.45, 2]}>
          <meshStandardMaterial
            color={isDark ? "#4cd7f6" : "#0284c7"}
            emissive={isDark ? "#4cd7f6" : "#0284c7"}
            emissiveIntensity={isDark ? 0.7 : 0.35}
            metalness={0.75}
            roughness={0.25}
            wireframe
            transparent
            opacity={0.34}
          />
        </Icosahedron>

        <Sphere args={[0.62, 32, 32]}>
          <meshStandardMaterial
            color={isDark ? "#6366f1" : "#4f46e5"}
            emissive={isDark ? "#6366f1" : "#4f46e5"}
            emissiveIntensity={isDark ? 1.35 : 0.65}
            metalness={0.94}
            roughness={0.12}
          />
        </Sphere>

        <Sphere args={[0.75, 24, 24]}>
          <meshBasicMaterial
            color={isDark ? "#c0c1ff" : "#6366f1"}
            transparent
            opacity={0.09}
          />
        </Sphere>
      </Float>

      <Torus
        ref={outerRingRef}
        args={[1.75, 0.025, 14, 96]}
        rotation={[Math.PI / 2.7, 0.3, 0]}
      >
        <meshStandardMaterial
          color={isDark ? "#4cd7f6" : "#0284c7"}
          emissive={isDark ? "#4cd7f6" : "#0284c7"}
          emissiveIntensity={2}
          toneMapped={false}
        />
      </Torus>

      <Torus
        ref={innerRingRef}
        args={[1.18, 0.018, 14, 96]}
        rotation={[1, -0.5, 0.4]}
      >
        <meshStandardMaterial
          color={isDark ? "#4edea3" : "#059669"}
          emissive={isDark ? "#4edea3" : "#059669"}
          emissiveIntensity={1.8}
          toneMapped={false}
        />
      </Torus>

      <Sparkles
        count={36}
        scale={[3.8, 3.4, 3.2]}
        size={1.6}
        speed={0.55}
        noise={0.7}
        color={isDark ? "#67e8f9" : "#0284c7"}
      />
    </group>
  );
}

function EqualizerScene({ theme }: SceneProps) {
  const barsRef = useRef<Array<THREE.Mesh | null>>([]);
  const groupRef = useRef<THREE.Group>(null);

  const isDark = theme === "dark";

  const bars = useMemo(
    () =>
      Array.from({ length: 16 }, (_, index) => {
        const angle = (index / 16) * Math.PI * 2;
        const radius = 1.05;

        return {
          index,
          position: [
            Math.cos(angle) * radius,
            0,
            Math.sin(angle) * radius,
          ] as [number, number, number],
          rotation: [0, -angle, 0] as [
            number,
            number,
            number,
          ],
          phase: index * 0.52,
        };
      }),
    [],
  );

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.22;
    }

    bars.forEach((bar) => {
      const mesh = barsRef.current[bar.index];

      if (!mesh) {
        return;
      }

      const harmonic =
        0.75 +
        Math.sin(time * 2.4 + bar.phase) * 0.34 +
        Math.sin(time * 1.1 + bar.phase * 0.5) * 0.15;

      const height = Math.max(0.34, harmonic);

      mesh.scale.y = THREE.MathUtils.lerp(
        mesh.scale.y,
        height,
        0.12,
      );

      mesh.position.y = (height - 1) * 0.28;
    });
  });

  return (
    <group ref={groupRef} rotation={[0.3, 0, -0.16]}>
      {bars.map((bar) => (
        <Box
          key={bar.index}
          ref={(mesh) => {
            barsRef.current[bar.index] = mesh;
          }}
          args={[0.2, 1.15, 0.2]}
          position={bar.position}
          rotation={bar.rotation}
        >
          <meshStandardMaterial
            color={
              bar.index % 2 === 0
                ? isDark
                  ? "#4cd7f6"
                  : "#0284c7"
                : isDark
                  ? "#8083ff"
                  : "#4f46e5"
            }
            emissive={
              bar.index % 2 === 0
                ? isDark
                  ? "#4cd7f6"
                  : "#0284c7"
                : isDark
                  ? "#6366f1"
                  : "#4f46e5"
            }
            emissiveIntensity={isDark ? 0.65 : 0.22}
            metalness={0.92}
            roughness={0.16}
          />
        </Box>
      ))}

      <Torus args={[1.45, 0.018, 12, 96]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial
          color={isDark ? "#4cd7f6" : "#0284c7"}
          transparent
          opacity={0.48}
        />
      </Torus>

      <Sphere args={[0.28, 24, 24]}>
        <meshStandardMaterial
          color={isDark ? "#c0c1ff" : "#4f46e5"}
          emissive={isDark ? "#8083ff" : "#4f46e5"}
          emissiveIntensity={0.7}
          metalness={0.9}
          roughness={0.12}
        />
      </Sphere>
    </group>
  );
}

function MatrixScene({ theme }: SceneProps) {
  const outerRef = useRef<THREE.Mesh>(null);
  const middleRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  const isDark = theme === "dark";

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (outerRef.current) {
      outerRef.current.rotation.x += delta * 0.14;
      outerRef.current.rotation.y += delta * 0.2;
    }

    if (middleRef.current) {
      middleRef.current.rotation.x -= delta * 0.2;
      middleRef.current.rotation.z += delta * 0.23;
    }

    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.34;
      innerRef.current.position.y =
        Math.sin(time * 1.4) * 0.08;
    }
  });

  return (
    <Float
      speed={1.3}
      rotationIntensity={0.15}
      floatIntensity={0.35}
    >
      <Box ref={outerRef} args={[2.25, 2.25, 2.25]}>
        <meshStandardMaterial
          color={isDark ? "#4cd7f6" : "#0284c7"}
          emissive={isDark ? "#4cd7f6" : "#0284c7"}
          emissiveIntensity={0.45}
          wireframe
          transparent
          opacity={0.38}
        />
      </Box>

      <Box ref={middleRef} args={[1.55, 1.55, 1.55]}>
        <meshStandardMaterial
          color={isDark ? "#8083ff" : "#6366f1"}
          emissive={isDark ? "#6366f1" : "#4f46e5"}
          emissiveIntensity={0.42}
          metalness={0.82}
          roughness={0.22}
          transparent
          opacity={0.26}
        />
      </Box>

      <Box ref={innerRef} args={[0.82, 0.82, 0.82]}>
        <meshStandardMaterial
          color={isDark ? "#4edea3" : "#059669"}
          emissive={isDark ? "#4edea3" : "#059669"}
          emissiveIntensity={isDark ? 0.9 : 0.38}
          metalness={0.96}
          roughness={0.1}
          transparent
          opacity={0.82}
        />
      </Box>

      <Sparkles
        count={30}
        scale={[3.5, 3.5, 3.5]}
        size={1.4}
        speed={0.42}
        color={isDark ? "#c0c1ff" : "#4f46e5"}
      />
    </Float>
  );
}

function ChipScene({ theme }: SceneProps) {
  const chipRef = useRef<THREE.Group>(null);
  const firstRingRef = useRef<THREE.Mesh>(null);
  const secondRingRef = useRef<THREE.Mesh>(null);

  const isDark = theme === "dark";

  const pins = useMemo(
    () =>
      Array.from({ length: 8 }, (_, index) => {
        const isHorizontal = index < 4;
        const offset = ((index % 4) - 1.5) * 0.42;

        return {
          id: index,
          position: isHorizontal
            ? ([offset, 0, index % 2 === 0 ? 0.92 : -0.92] as [
                number,
                number,
                number,
              ])
            : ([
                index % 2 === 0 ? 0.92 : -0.92,
                0,
                offset,
              ] as [number, number, number]),
          size: isHorizontal
            ? ([0.16, 0.08, 0.5] as [
                number,
                number,
                number,
              ])
            : ([0.5, 0.08, 0.16] as [
                number,
                number,
                number,
              ]),
        };
      }),
    [],
  );

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (chipRef.current) {
      chipRef.current.rotation.y += delta * 0.18;
      chipRef.current.position.y =
        Math.sin(time * 1.2) * 0.08;
    }

    if (firstRingRef.current) {
      firstRingRef.current.rotation.z += delta * 0.54;
    }

    if (secondRingRef.current) {
      secondRingRef.current.rotation.z -= delta * 0.42;
    }
  });

  return (
    <group ref={chipRef} rotation={[0.32, 0.45, 0]}>
      <Box args={[1.65, 0.24, 1.65]} position={[0, -0.45, 0]}>
        <meshStandardMaterial
          color={isDark ? "#181b25" : "#cbd5e1"}
          metalness={0.85}
          roughness={0.28}
        />
      </Box>

      <Box args={[1.3, 0.12, 1.3]} position={[0, -0.27, 0]}>
        <meshStandardMaterial
          color={isDark ? "#31353f" : "#e2e8f0"}
          metalness={0.82}
          roughness={0.18}
        />
      </Box>

      {pins.map((pin) => (
        <Box
          key={pin.id}
          args={pin.size}
          position={pin.position}
        >
          <meshStandardMaterial
            color={isDark ? "#4cd7f6" : "#0284c7"}
            emissive={isDark ? "#4cd7f6" : "#0284c7"}
            emissiveIntensity={isDark ? 0.55 : 0.18}
            metalness={0.95}
            roughness={0.12}
          />
        </Box>
      ))}

      <Octahedron
        args={[0.66, 1]}
        position={[0, 0.35, 0]}
      >
        <meshStandardMaterial
          color={isDark ? "#8083ff" : "#4f46e5"}
          emissive={isDark ? "#6366f1" : "#4f46e5"}
          emissiveIntensity={isDark ? 1.15 : 0.45}
          metalness={0.96}
          roughness={0.1}
        />
      </Octahedron>

      <Torus
        ref={firstRingRef}
        args={[1.25, 0.025, 14, 96]}
        position={[0, 0.25, 0]}
        rotation={[Math.PI / 2.5, 0, 0.2]}
      >
        <meshStandardMaterial
          color={isDark ? "#4cd7f6" : "#0284c7"}
          emissive={isDark ? "#4cd7f6" : "#0284c7"}
          emissiveIntensity={2}
          toneMapped={false}
        />
      </Torus>

      <Torus
        ref={secondRingRef}
        args={[1.48, 0.018, 14, 96]}
        position={[0, 0.25, 0]}
        rotation={[0.7, 0.55, -0.4]}
      >
        <meshStandardMaterial
          color={isDark ? "#4edea3" : "#059669"}
          emissive={isDark ? "#4edea3" : "#059669"}
          emissiveIntensity={1.8}
          toneMapped={false}
        />
      </Torus>
    </group>
  );
}

function Scene({
  type,
  theme,
}: Feature3DVisualProps) {
  return (
    <>
      <ambientLight intensity={theme === "dark" ? 0.8 : 1.35} />

      <directionalLight
        position={[4, 5, 4]}
        intensity={theme === "dark" ? 2.5 : 2}
        color={theme === "dark" ? "#c0c1ff" : "#ffffff"}
      />

      <pointLight
        position={[-3, 1, 3]}
        intensity={theme === "dark" ? 16 : 8}
        distance={7}
        decay={2}
        color={theme === "dark" ? "#4cd7f6" : "#0284c7"}
      />

      <pointLight
        position={[3, -2, 2]}
        intensity={theme === "dark" ? 13 : 6}
        distance={6}
        decay={2}
        color={theme === "dark" ? "#8083ff" : "#4f46e5"}
      />

      {type === "shield" && <ShieldScene theme={theme} />}
      {type === "eq" && <EqualizerScene theme={theme} />}
      {type === "matrix" && <MatrixScene theme={theme} />}
      {type === "chip" && <ChipScene theme={theme} />}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.55}
        autoRotate
        autoRotateSpeed={1.8}
        minPolarAngle={Math.PI / 3.3}
        maxPolarAngle={Math.PI / 1.65}
      />
    </>
  );
}

export function Feature3DVisual({
  type,
  theme,
}: Feature3DVisualProps) {
  return (
    <div className="size-full">
      <Canvas
        dpr={[1, 1.5]}
        camera={{
          position: [0, 0, 4.2],
          fov: 45,
          near: 0.1,
          far: 50,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure =
            theme === "dark" ? 1.08 : 0.9;
        }}
        style={{
          background: "transparent",
          touchAction: "pan-y",
        }}
      >
        <Scene type={type} theme={theme} />
      </Canvas>
    </div>
  );
}