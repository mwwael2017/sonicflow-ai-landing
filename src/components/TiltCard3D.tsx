"use client";

import {
  useRef,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

interface TiltCard3DProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export default function TiltCard3D({
  children,
  className = "",
  intensity = 8,
}: TiltCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  const rawRotateX = useTransform(
    pointerY,
    [0, 1],
    [intensity, -intensity],
  );

  const rawRotateY = useTransform(
    pointerX,
    [0, 1],
    [-intensity, intensity],
  );

  const rotateX = useSpring(rawRotateX, {
    stiffness: 180,
    damping: 22,
    mass: 0.6,
  });

  const rotateY = useSpring(rawRotateY, {
    stiffness: 180,
    damping: 22,
    mass: 0.6,
  });

  const spotlightX = useTransform(pointerX, [0, 1], ["0%", "100%"]);
  const spotlightY = useTransform(pointerY, [0, 1], ["0%", "100%"]);

  const spotlightBackground = useMotionTemplate`
    radial-gradient(
      360px circle at ${spotlightX} ${spotlightY},
      color-mix(in srgb, var(--primary) 16%, transparent),
      color-mix(in srgb, var(--secondary) 8%, transparent) 35%,
      transparent 70%
    )
  `;

  const handlePointerMove = (
    event: ReactMouseEvent<HTMLDivElement>,
  ) => {
    const card = cardRef.current;

    if (!card) {
      return;
    }

    const bounds = card.getBoundingClientRect();

    const normalizedX = Math.min(
      1,
      Math.max(0, (event.clientX - bounds.left) / bounds.width),
    );

    const normalizedY = Math.min(
      1,
      Math.max(0, (event.clientY - bounds.top) / bounds.height),
    );

    pointerX.set(normalizedX);
    pointerY.set(normalizedY);
  };

  const resetTilt = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  return (
    <div className={`perspective-1000 ${className}`}>
      <motion.div
        ref={cardRef}
        onMouseMove={handlePointerMove}
        onMouseLeave={resetTilt}
        onBlur={resetTilt}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          transformPerspective: 1000,
        }}
        whileHover={{
          scale: 1.008,
          transition: {
            duration: 0.22,
          },
        }}
        className="relative size-full will-change-transform"
      >
        <motion.div
          aria-hidden="true"
          style={{
            background: spotlightBackground,
          }}
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        <div
          className="relative z-10 size-full"
          style={{
            transform: "translateZ(0)",
            transformStyle: "preserve-3d",
          }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}