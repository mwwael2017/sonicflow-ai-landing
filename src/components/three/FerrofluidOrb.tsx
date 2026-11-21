"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  OrbitControls,
  Sparkles,
  Sphere,
  Torus,
} from "@react-three/drei";
import * as THREE from "three";

export interface FerrofluidOrbProps {
  mode: "raw" | "ai";
  preset: string;
  isPlaying: boolean;
  theme: "dark" | "light";
}

interface PresetProfile {
  scale: number;
  floatIntensity: number;
  rotationIntensity: number;
  ringSpeed: number;
  sparkleScale: number;
}

const PRESET_PROFILES: Record<string, PresetProfile> = {
  podcast: {
    scale: 1,
    floatIntensity: 0.75,
    rotationIntensity: 0.45,
    ringSpeed: 0.9,
    sparkleScale: 1,
  },
  meeting: {
    scale: 0.97,
    floatIntensity: 0.5,
    rotationIntensity: 0.32,
    ringSpeed: 0.7,
    sparkleScale: 0.82,
  },
  studio: {
    scale: 1.04,
    floatIntensity: 0.9,
    rotationIntensity: 0.55,
    ringSpeed: 1.05,
    sparkleScale: 1.18,
  },
  gaming: {
    scale: 1.07,
    floatIntensity: 1.15,
    rotationIntensity: 0.8,
    ringSpeed: 1.35,
    sparkleScale: 1.35,
  },
};

interface OrbSceneProps extends FerrofluidOrbProps {
  profile: PresetProfile;
}

function OrbScene({
  mode,
  isPlaying,
  theme,
  profile,
}: OrbSceneProps) {
  const coreGroupRef = useRef<THREE.Group>(null);
  const firstRingRef = useRef<THREE.Mesh>(null);
  const secondRingRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);

  const isRaw = mode === "raw";

  const colors = useMemo(() => {
    if (isRaw) {
      return {
        core: "#ef4444",
        secondary: "#f97316",
        emissive: "#dc2626",
        particle: "#fb923c",
        halo: "#f97316",
      };
    }

    if (theme === "dark") {
      return {
        core: "#6366f1",
        secondary: "#4cd7f6",
        emissive: "#4f46e5",
        particle: "#67e8f9",
        halo: "#818cf8",
      };
    }

    return {
      core: "#4f46e5",
      secondary: "#0284c7",
      emissive: "#4338ca",
      particle: "#0ea5e9",
      halo: "#6366f1",
    };
  }, [isRaw, theme]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const playbackMultiplier = isPlaying ? 1 : 0.28;
    const rawMultiplier = isRaw ? 2.35 : 1;

    if (coreGroupRef.current) {
      coreGroupRef.current.rotation.y +=
        delta *
        0.14 *
        playbackMultiplier *
        rawMultiplier *
        profile.rotationIntensity;

      coreGroupRef.current.rotation.x =
        Math.sin(time * (isRaw ? 1.7 : 0.55)) *
        0.07 *
        profile.rotationIntensity;

      const pulseFrequency = isRaw ? 5.8 : 1.8;
      const pulseStrength = isRaw ? 0.035 : 0.018;

      const pulse =
        1 +
        Math.sin(time * pulseFrequency) *
          pulseStrength *
          playbackMultiplier;

      coreGroupRef.current.scale.setScalar(
        pulse * profile.scale,
      );
    }

    if (firstRingRef.current) {
      firstRingRef.current.rotation.z +=
        delta *
        0.35 *
        profile.ringSpeed *
        playbackMultiplier *
        rawMultiplier;

      firstRingRef.current.rotation.y +=
        delta * 0.12 * profile.ringSpeed;
    }

    if (secondRingRef.current) {
      secondRingRef.current.rotation.z -=
        delta *
        0.28 *
        profile.ringSpeed *
        playbackMultiplier *
        rawMultiplier;

      secondRingRef.current.rotation.x -=
        delta * 0.1 * profile.ringSpeed;
    }

    if (haloRef.current) {
      haloRef.current.rotation.y -=
        delta * 0.08 * profile.ringSpeed;

      haloRef.current.scale.setScalar(
        1 + Math.sin(time * 1.4) * 0.025,
      );
    }
  });

  return (
    <>
      <ambientLight intensity={theme === "dark" ? 0.75 : 1.2} />

      <directionalLight
        position={[4, 4, 5]}
        intensity={isRaw ? 2.1 : 2.6}
        color={colors.secondary}
      />

      <pointLight
        position={[-3, -1, 3]}
        intensity={isRaw ? 18 : 22}
        distance={8}
        decay={2}
        color={colors.core}
      />

      <pointLight
        position={[3, 2, -2]}
        intensity={isRaw ? 12 : 18}
        distance={7}
        decay={2}
        color={colors.secondary}
      />

      <group ref={coreGroupRef}>
        <Float
          speed={isRaw ? 3.2 : 1.5}
          rotationIntensity={profile.rotationIntensity}
          floatIntensity={profile.floatIntensity}
          floatingRange={[-0.08, 0.08]}
        >
          <Sphere args={[1.35, 64, 64]}>
            <MeshDistortMaterial
              color={colors.core}
              emissive={colors.emissive}
              emissiveIntensity={
                isRaw
                  ? isPlaying
                    ? 0.72
                    : 0.38
                  : isPlaying
                    ? 0.5
                    : 0.25
              }
              metalness={isRaw ? 0.84 : 0.98}
              roughness={isRaw ? 0.28 : 0.12}
              distort={isRaw ? 0.62 : 0.28}
              speed={
                isRaw
                  ? isPlaying
                    ? 5
                    : 1.8
                  : isPlaying
                    ? 2.4
                    : 0.8
              }
              envMapIntensity={isRaw ? 1.2 : 1.8}
              clearcoat={1}
              clearcoatRoughness={isRaw ? 0.32 : 0.08}
            />
          </Sphere>

          {isRaw && (
            <Sphere args={[1.39, 48, 48]}>
              <meshStandardMaterial
                color={colors.secondary}
                emissive={colors.secondary}
                emissiveIntensity={0.45}
                metalness={0.7}
                roughness={0.3}
                wireframe
                transparent
                opacity={0.19}
              />
            </Sphere>
          )}
        </Float>
      </group>

      <Torus
        ref={firstRingRef}
        args={[1.92, 0.025, 24, 160]}
        rotation={[Math.PI / 2.8, 0.35, 0.2]}
      >
        <meshStandardMaterial
          color={colors.secondary}
          emissive={colors.secondary}
          emissiveIntensity={isPlaying ? 3.4 : 1.7}
          metalness={0.9}
          roughness={0.12}
          transparent
          opacity={0.88}
          toneMapped={false}
        />
      </Torus>

      <Torus
        ref={secondRingRef}
        args={[2.12, 0.018, 20, 160]}
        rotation={[1.1, -0.65, -0.35]}
      >
        <meshStandardMaterial
          color={colors.core}
          emissive={colors.core}
          emissiveIntensity={isPlaying ? 2.8 : 1.35}
          metalness={0.95}
          roughness={0.16}
          transparent
          opacity={0.72}
          toneMapped={false}
        />
      </Torus>

      <Torus
        ref={haloRef}
        args={[1.58, 0.012, 16, 128]}
        rotation={[-0.45, 0.85, 0.4]}
      >
        <meshBasicMaterial
          color={colors.halo}
          transparent
          opacity={isPlaying ? 0.55 : 0.24}
          toneMapped={false}
        />
      </Torus>

      <Sparkles
        count={
          Math.round(
            (isRaw ? 105 : 72) * profile.sparkleScale,
          )
        }
        scale={[5.2, 4.1, 4.2]}
        size={isRaw ? 2.8 : 2}
        speed={
          isPlaying
            ? isRaw
              ? 2.6
              : 0.9
            : 0.25
        }
        noise={isRaw ? 2.2 : 0.75}
        color={colors.particle}
        opacity={theme === "dark" ? 0.8 : 0.58}
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.06}
        rotateSpeed={0.65}
        autoRotate
        autoRotateSpeed={isRaw ? 3 : 1.2}
        minPolarAngle={Math.PI / 3.4}
        maxPolarAngle={Math.PI / 1.65}
      />
    </>
  );
}

export default function FerrofluidOrb({
  mode,
  preset,
  isPlaying,
  theme,
}: FerrofluidOrbProps) {
  const profile =
    PRESET_PROFILES[preset] ?? PRESET_PROFILES.podcast;

  return (
    <div className="size-full">
      <Canvas
        dpr={[1, 1.75]}
        camera={{
          position: [0, 0, 5.8],
          fov: 46,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = theme === "dark" ? 1.1 : 0.92;
        }}
        style={{
          background: "transparent",
          touchAction: "pan-y",
        }}
      >
        <OrbScene
          mode={mode}
          preset={preset}
          isPlaying={isPlaying}
          theme={theme}
          profile={profile}
        />
      </Canvas>
    </div>
  );
}