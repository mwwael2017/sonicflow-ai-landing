"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  Activity,
  AudioLines,
  Box as BoxIcon,
  Cpu,
  Gauge,
  Layers3,
  Radio,
  ShieldCheck,
  Sparkles,
  Waves,
  type LucideIcon,
} from "lucide-react";

import TiltCard3D from "@/components/TiltCard3D";
import { useApp } from "@/context/AppContext";
import type { Feature3DType } from "@/components/three/Feature3DScenes";

const Feature3DVisual = dynamic(
  () =>
    import("@/components/three/Feature3DScenes").then(
      (module) => module.Feature3DVisual,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex size-full items-center justify-center">
        <div className="relative grid size-16 place-items-center">
          <motion.span
            className="absolute inset-0 rounded-full border border-primary/25"
            animate={{
              rotate: 360,
              scale: [0.9, 1.06, 0.9],
            }}
            transition={{
              rotate: {
                duration: 2.2,
                repeat: Infinity,
                ease: "linear",
              },
              scale: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />

          <motion.span
            className="absolute inset-2 rounded-full border-2 border-transparent border-r-secondary border-t-primary"
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 1.15,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <AudioLines className="size-5 text-primary" />
        </div>
      </div>
    ),
  },
);

interface FeatureCardConfig {
  id:
    | "noise-shield"
    | "parametric-eq"
    | "spatial-matrix"
    | "kernel-dsp";

  tag: string;
  title: string;
  description: string;
  metricLabel: string;
  metricValue: string;

  type: Feature3DType;
  icon: LucideIcon;
  telemetryIcon: LucideIcon;

  className: string;
  visualClassName: string;
  accent: "primary" | "secondary" | "tertiary";

  frequencyTags?: Array<{
    value: string;
    detail: string;
    className: string;
  }>;
}

interface FeatureCardProps extends FeatureCardConfig {
  theme: "dark" | "light";
  isRtl: boolean;
  index: number;
}

export default function FeaturesBento() {
  const {
    t,
    theme,
    language,
  } = useApp();

  const isRtl = language === "ar";

  const cards: FeatureCardConfig[] = [
    {
      id: "noise-shield",
      tag: t.features.cards.noiseShield.tag,
      title: t.features.cards.noiseShield.title,
      description:
        t.features.cards.noiseShield.description,
      metricLabel:
        t.features.cards.noiseShield.metricLabel,
      metricValue:
        t.features.cards.noiseShield.metricValue,

      type: "shield",
      icon: ShieldCheck,
      telemetryIcon: Gauge,

      className: "md:col-span-7",
      visualClassName: "h-70 sm:h-80",
      accent: "secondary",
    },

    {
      id: "parametric-eq",
      tag: t.features.cards.parametricEq.tag,
      title: t.features.cards.parametricEq.title,
      description:
        t.features.cards.parametricEq.description,
      metricLabel:
        t.features.cards.parametricEq.metricLabel,
      metricValue:
        t.features.cards.parametricEq.metricValue,

      type: "eq",
      icon: Waves,
      telemetryIcon: Activity,

      className: "md:col-span-5",
      visualClassName: "h-70 sm:h-80",
      accent: "primary",

      frequencyTags: [
        {
          value: "100 Hz",
          detail: "+2 dB",
          className: "start-4 top-5",
        },
        {
          value: "2.4 kHz",
          detail: "Air",
          className: "end-4 top-18",
        },
      ],
    },

    {
      id: "spatial-matrix",
      tag: t.features.cards.spatialMatrix.tag,
      title: t.features.cards.spatialMatrix.title,
      description:
        t.features.cards.spatialMatrix.description,
      metricLabel:
        t.features.cards.spatialMatrix.metricLabel,
      metricValue:
        t.features.cards.spatialMatrix.metricValue,

      type: "matrix",
      icon: Layers3,
      telemetryIcon: BoxIcon,

      className: "md:col-span-5",
      visualClassName: "h-70 sm:h-80",
      accent: "tertiary",
    },

    {
      id: "kernel-dsp",
      tag: t.features.cards.kernelDsp.tag,
      title: t.features.cards.kernelDsp.title,
      description:
        t.features.cards.kernelDsp.description,
      metricLabel:
        t.features.cards.kernelDsp.metricLabel,
      metricValue:
        t.features.cards.kernelDsp.metricValue,

      type: "chip",
      icon: Cpu,
      telemetryIcon: Radio,

      className: "md:col-span-7",
      visualClassName: "h-70 sm:h-80",
      accent: "primary",
    },
  ];

  return (
    <section
      id="features"
      className="relative scroll-mt-24 overflow-hidden bg-surface py-24 sm:py-28 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute start-[-8%] top-[12%] size-96 rounded-full bg-primary/8 blur-[130px]" />

        <div className="absolute end-[-8%] top-[45%] size-96 rounded-full bg-secondary/8 blur-[140px]" />

        <div className="absolute bottom-[-12%] start-[38%] size-80 rounded-full bg-tertiary/6 blur-[120px]" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(var(--on-surface) 1px, transparent 1px), linear-gradient(90deg, var(--on-surface) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 24,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.45,
          }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={[
            "mx-auto mb-14 max-w-3xl",
            isRtl
              ? "text-right lg:me-0"
              : "text-left lg:ms-0",
          ].join(" ")}
        >
          <div
            className={[
              "mb-5 inline-flex items-center gap-2",
              "rounded-full border border-primary/25",
              "bg-primary/8 px-3 py-2",
              isRtl ? "flex-row-reverse" : "",
            ].join(" ")}
          >
            <Sparkles className="size-3.5 text-primary" />

            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-primary sm:text-xs">
              {t.features.badge}
            </span>
          </div>

          <h2 className="font-display text-4xl font-semibold leading-tight tracking-[-0.045em] text-on-surface sm:text-5xl lg:text-6xl">
            {t.features.title}
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-8 text-on-surface-variant sm:text-lg">
            {t.features.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {cards.map((card, index) => (
            <FeatureCard
              key={card.id}
              {...card}
              theme={theme}
              isRtl={isRtl}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  id,
  tag,
  title,
  description,
  metricLabel,
  metricValue,
  type,
  icon: Icon,
  telemetryIcon: TelemetryIcon,
  className,
  visualClassName,
  accent,
  frequencyTags,
  theme,
  isRtl,
  index,
}: FeatureCardProps) {
  const iconClasses = getAccentClasses(accent);
  const activeBarClass = getBarClass(accent);

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 28,
        scale: 0.985,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.62,
        delay: index * 0.075,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      <TiltCard3D
        className="group h-full"
        intensity={6}
      >
        <div
          className={[
            "relative flex h-full min-h-145 flex-col",
            "overflow-hidden rounded-4xl border",
            "border-border-subtle",
            "bg-surface-container/72",
            "shadow-[0_25px_80px_rgba(0,0,0,0.12)]",
            "backdrop-blur-xl",
            "transition-colors duration-300",
            "group-hover:border-primary/25",
          ].join(" ")}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-linear-to-b from-primary/7 to-transparent"
          />

          <div
            className={[
              "relative z-10 flex items-start",
              "justify-between gap-4",
              "p-5 pb-0 sm:p-6 sm:pb-0",
              isRtl
                ? "flex-row-reverse text-right"
                : "",
            ].join(" ")}
            style={{
              transform: "translateZ(34px)",
            }}
          >
            <div
              className={[
                "flex min-w-0 items-start gap-3.5",
                isRtl
                  ? "flex-row-reverse text-right"
                  : "text-left",
              ].join(" ")}
            >
              <span
                className={[
                  "grid size-11 shrink-0",
                  "place-items-center rounded-2xl",
                  "border shadow-[0_0_24px_rgba(99,102,241,0.1)]",
                  iconClasses,
                ].join(" ")}
              >
                <Icon className="size-5" />
              </span>

              <div className="min-w-0">
                <div
                  className={[
                    "mb-2 flex items-center gap-2",
                    isRtl ? "flex-row-reverse" : "",
                  ].join(" ")}
                >
                  <span className="size-1.5 shrink-0 rounded-full bg-tertiary shadow-[0_0_8px_var(--tertiary)]" />

                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-tertiary">
                    {tag}
                  </p>
                </div>

                <h3 className="font-display text-xl font-semibold tracking-[-0.025em] text-on-surface sm:text-2xl">
                  {title}
                </h3>

                <p className="mt-2 max-w-lg text-sm leading-6 text-on-surface-variant">
                  {description}
                </p>
              </div>
            </div>

            <span
              dir="auto"
              className="hidden shrink-0 rounded-full border border-tertiary/20 bg-tertiary/8 px-3 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-tertiary sm:block"
            >
              {metricValue}
            </span>
          </div>

          <div
            className={[
              "relative mx-3 mt-4 overflow-hidden",
              "rounded-3xl border",
              "border-border-subtle",
              "bg-[radial-gradient(circle_at_center,var(--surface-high)_0%,var(--surface-lowest)_75%)]",
              visualClassName,
            ].join(" ")}
            style={{
              transform: "translateZ(22px)",
            }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)",
                backgroundSize: "30px 30px",
                maskImage:
                  "radial-gradient(circle at center, black, transparent 76%)",
                WebkitMaskImage:
                  "radial-gradient(circle at center, black, transparent 76%)",
              }}
            />

            <Feature3DVisual
              type={type}
              theme={theme}
            />

            {frequencyTags?.map((frequencyTag) => (
              <FrequencyTag
                key={`${id}-${frequencyTag.value}`}
                value={frequencyTag.value}
                detail={frequencyTag.detail}
                className={frequencyTag.className}
              />
            ))}

            <div
              className={[
                "pointer-events-none absolute start-3 top-3 z-20",
                "flex items-center gap-2",
                "rounded-xl border border-border-subtle",
                "bg-(--surface-lowest)/65",
                "px-2.5 py-1.5 backdrop-blur-md",
                isRtl ? "flex-row-reverse" : "",
              ].join(" ")}
            >
              <span className="size-1.5 animate-pulse rounded-full bg-tertiary shadow-[0_0_8px_var(--tertiary)]" />

              <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.13em] text-on-surface-variant">
                {tag}
              </span>
            </div>
          </div>

          <div
            className="relative z-10 mt-auto p-3 pt-3"
            style={{
              transform: "translateZ(28px)",
            }}
          >
            <div
              className={[
                "flex min-h-14 items-center",
                "justify-between gap-3",
                "rounded-2xl border",
                "border-border-subtle",
                "bg-(--surface-lowest)/65",
                "px-4 py-3 backdrop-blur-xl",
                isRtl ? "flex-row-reverse" : "",
              ].join(" ")}
            >
              <div
                className={[
                  "flex min-w-0 items-center gap-2.5",
                  isRtl ? "flex-row-reverse" : "",
                ].join(" ")}
              >
                <TelemetryIcon className="size-4 shrink-0 text-secondary" />

                <div
                  className={[
                    "min-w-0",
                    isRtl ? "text-right" : "",
                  ].join(" ")}
                >
                  <p className="truncate font-mono text-[8px] uppercase tracking-[0.1em] text-on-surface-variant sm:text-[9px]">
                    {metricLabel}
                  </p>

                  <p
                    dir="auto"
                    className="mt-0.5 truncate font-mono text-[10px] font-semibold text-on-surface sm:text-xs"
                  >
                    {metricValue}
                  </p>
                </div>
              </div>

              <div
                className={[
                  "flex shrink-0 items-end gap-0.5",
                  isRtl ? "flex-row-reverse" : "",
                ].join(" ")}
                aria-hidden="true"
              >
                {[5, 9, 13, 8, 15, 11].map(
                  (height, barIndex) => (
                    <motion.span
                      key={`${id}-meter-${barIndex}`}
                      animate={{
                        height: [
                          height,
                          Math.max(4, height * 0.55),
                          height,
                        ],
                      }}
                      transition={{
                        duration:
                          0.7 + barIndex * 0.08,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                      }}
                      className={[
                        "w-0.75 rounded-full",
                        activeBarClass,
                      ].join(" ")}
                      style={{
                        height,
                      }}
                    />
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </TiltCard3D>
    </motion.article>
  );
}

interface FrequencyTagProps {
  className: string;
  value: string;
  detail: string;
}

function FrequencyTag({
  className,
  value,
  detail,
}: FrequencyTagProps) {
  return (
    <motion.div
      animate={{
        y: [0, -5, 0],
      }}
      transition={{
        duration: 2.6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={[
        "pointer-events-none absolute z-20",
        "rounded-xl border border-border-subtle",
        "bg-(--surface-lowest)/70 px-2.5 py-2",
        "shadow-lg backdrop-blur-md",
        className,
      ].join(" ")}
    >
      <p
        dir="ltr"
        className="font-mono text-[9px] font-semibold text-on-surface"
      >
        {value}
      </p>

      <p
        dir="ltr"
        className="mt-0.5 font-mono text-[8px] uppercase tracking-widest text-secondary"
      >
        {detail}
      </p>
    </motion.div>
  );
}

function getAccentClasses(
  accent: FeatureCardConfig["accent"],
): string {
  if (accent === "secondary") {
    return [
      "border-secondary/20",
      "bg-secondary/10",
      "text-secondary",
    ].join(" ");
  }

  if (accent === "tertiary") {
    return [
      "border-tertiary/20",
      "bg-tertiary/10",
      "text-tertiary",
    ].join(" ");
  }

  return [
    "border-primary/20",
    "bg-primary/10",
    "text-primary",
  ].join(" ");
}

function getBarClass(
  accent: FeatureCardConfig["accent"],
): string {
  if (accent === "secondary") {
    return "bg-secondary";
  }

  if (accent === "tertiary") {
    return "bg-tertiary";
  }

  return "bg-primary";
}