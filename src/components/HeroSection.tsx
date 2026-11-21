"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowDown,
  AudioLines,
  CirclePlay,
  Cpu,
  Headphones,
  Pause,
  Play,
  Radio,
  Sparkles,
  Waves,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { useApp } from "@/context/AppContext";

const FerrofluidOrb = dynamic(
  () => import("./three/FerrofluidOrb"),
  {
    ssr: false,
    loading: () => (
      <div className="flex size-full items-center justify-center">
        <div className="relative grid size-20 place-items-center">
          <motion.div
            className="absolute inset-0 rounded-full border border-primary/30"
            animate={{
              rotate: 360,
              scale: [0.9, 1.06, 0.9],
            }}
            transition={{
              rotate: {
                duration: 2.4,
                repeat: Infinity,
                ease: "linear",
              },
              scale: {
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />

          <motion.div
            className="absolute inset-2 rounded-full border-2 border-transparent border-r-primary border-t-secondary"
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 1.25,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <AudioLines className="size-7 text-primary" />
        </div>
      </div>
    ),
  },
);

type AudioMode = "raw" | "ai";
type PresetKey = "podcast" | "meeting" | "studio" | "gaming";

interface PresetItem {
  key: PresetKey;
  name: string;
  description: string;
  icon: LucideIcon;
}

const SPECTRUM_BAR_COUNT = 28;

const presetIcons: Record<PresetKey, LucideIcon> = {
  podcast: Headphones,
  meeting: Waves,
  studio: Radio,
  gaming: Zap,
};

function isPresetKey(value: string): value is PresetKey {
  return (
    value === "podcast" ||
    value === "meeting" ||
    value === "studio" ||
    value === "gaming"
  );
}

export default function HeroSection() {
  const {
    language,
    theme,
    t,
  } = useApp();

  const [mode, setMode] = useState<AudioMode>("ai");
  const [preset, setPreset] =
    useState<PresetKey>("podcast");
  const [isPlaying, setIsPlaying] = useState(true);

  const isRtl = language === "ar";
  const isRaw = mode === "raw";

  const presets = useMemo<PresetItem[]>(() => {
    return t.hero.presets
      .filter((item) => isPresetKey(item.id))
      .map((item) => {
        const key = item.id as PresetKey;

        return {
          key,
          name: item.name,
          description: item.description,
          icon: presetIcons[key],
        };
      });
  }, [t.hero.presets]);

  const spectrumBars = useMemo(
    () =>
      Array.from(
        {
          length: SPECTRUM_BAR_COUNT,
        },
        (_, index) => {
          const center =
            1 -
            Math.abs(
              index - (SPECTRUM_BAR_COUNT - 1) / 2,
            ) /
              (SPECTRUM_BAR_COUNT / 2);

          const harmonic =
            Math.sin(index * 0.82) * 0.17 +
            Math.cos(index * 0.37) * 0.12;

          return {
            id: index,
            aiHeight: Math.max(
              18,
              Math.min(
                91,
                28 + center * 48 + harmonic * 100,
              ),
            ),
            rawHeight:
              25 +
              ((index * 47 + index * index * 13) % 70),
            duration:
              0.58 + ((index * 17) % 35) / 100,
            delay: -((index * 11) % 40) / 100,
          };
        },
      ),
    [],
  );

  const selectedPreset =
    presets.find((item) => item.key === preset) ??
    presets[0];

  const scrollToPlayground = () => {
    document
      .querySelector<HTMLElement>("#playground")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
  };

  const togglePlayback = () => {
    setIsPlaying((current) => !current);
  };

  const statusText = isRaw
    ? t.hero.rawTelemetry
    : t.hero.aiTelemetry;

  const peakText = isRaw
    ? "+3.2 dB"
    : "-0.4 dB";

  return (
    <section
      id="hero"
      className="relative isolate min-h-screen overflow-hidden bg-surface pt-28 sm:pt-32 lg:pt-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20"
      >
        <div className="absolute start-[7%] top-[12%] size-80 rounded-full bg-primary/10 blur-[110px]" />
        <div className="absolute end-[4%] top-[18%] size-96 rounded-full bg-secondary/10 blur-[130px]" />
        <div className="absolute bottom-[-10%] start-[38%] size-96 rounded-full bg-tertiary/8 blur-[150px]" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035] dark:opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(var(--on-surface) 1px, transparent 1px), linear-gradient(90deg, var(--on-surface) 1px, transparent 1px)",
          backgroundSize: "54px 54px",
          maskImage:
            "linear-gradient(to bottom, black, transparent 85%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black, transparent 85%)",
        }}
      />

      <div className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl items-center gap-14 px-5 pb-20 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10 lg:px-10 xl:gap-16">
        <div
          className={[
            "relative z-10",
            isRtl
              ? "text-right lg:order-2"
              : "text-left",
          ].join(" ")}
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={[
              "mb-6 inline-flex items-center gap-2",
              "rounded-full border border-primary/25",
              "bg-primary/8 px-3 py-2",
              "shadow-[0_0_32px_rgba(99,102,241,0.12)]",
              "backdrop-blur-xl",
            ].join(" ")}
          >
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-tertiary opacity-70" />

              <span className="relative inline-flex size-2.5 rounded-full bg-tertiary shadow-[0_0_12px_var(--tertiary)]" />
            </span>

            <span className="text-xs font-semibold text-on-surface">
              {t.hero.badge}
            </span>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 22,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.08,
              duration: 0.72,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h1 className="max-w-3xl font-display text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-on-surface sm:text-6xl lg:text-[4.6rem] xl:text-[5.25rem]">
              <span className="block">
                {t.hero.titleLine1}
              </span>

              <span className="mt-2 block bg-linear-to-r from-primary via-primary-container to-secondary bg-clip-text text-transparent">
                {t.hero.titleHighlight}
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.16,
              duration: 0.68,
            }}
            className="mt-6 max-w-2xl text-base leading-8 text-on-surface-variant sm:text-lg"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.24,
              duration: 0.68,
            }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <motion.button
              type="button"
              whileHover={{
                y: -2,
                scale: 1.015,
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={scrollToPlayground}
              className={[
                "group relative inline-flex min-h-13",
                "items-center justify-center gap-2",
                "overflow-hidden rounded-2xl",
                "bg-primary px-6",
                "text-sm font-semibold text-[#0a0e17]",
                "shadow-[0_0_38px_rgba(99,102,241,0.3)]",
              ].join(" ")}
            >
              <span className="absolute inset-0 -translate-x-[120%] bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />

              <Sparkles className="relative size-4.5" />

              <span className="relative">
                {t.hero.ctaPrimary}
              </span>

              <ArrowDown className="relative size-4 transition-transform group-hover:translate-y-0.5" />
            </motion.button>

            <motion.button
              type="button"
              whileHover={{
                y: -2,
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={togglePlayback}
              className={[
                "inline-flex min-h-13 items-center",
                "justify-center gap-2.5",
                "rounded-2xl border border-border-subtle",
                "bg-surface-container/70 px-6",
                "text-sm font-semibold text-on-surface",
                "backdrop-blur-xl transition-colors",
                "hover:bg-surface-high",
              ].join(" ")}
            >
              {isPlaying ? (
                <Pause className="size-4.5 text-secondary" />
              ) : (
                <CirclePlay className="size-4.5 text-secondary" />
              )}

              {t.hero.ctaSecondary}
            </motion.button>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.32,
              duration: 0.68,
            }}
            className="mt-8 grid max-w-2xl grid-cols-1 gap-2.5 sm:grid-cols-3"
          >
            {t.hero.stats.map((stat, index) => {
              const StatIcon =
                index === 0
                  ? Activity
                  : index === 1
                    ? Cpu
                    : Radio;

              return (
                <div
                  key={`${stat.label}-${index}`}
                  className={[
                    "group rounded-2xl border",
                    "border-border-subtle",
                    "bg-surface-low/75 p-3.5",
                    "backdrop-blur-xl transition-colors",
                    "hover:bg-surface-container",
                  ].join(" ")}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <StatIcon className="size-4 text-secondary" />

                    <span className="size-1.5 rounded-full bg-tertiary shadow-[0_0_8px_var(--tertiary)]" />
                  </div>

                  <p
                    dir="auto"
                    className="font-mono text-sm font-semibold text-on-surface"
                  >
                    {stat.value}
                  </p>

                  <p className="mt-1 text-[10px] text-on-surface-variant">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>

        <motion.div
          id="playground"
          initial={{
            opacity: 0,
            y: 30,
            rotateY: isRtl ? -5 : 5,
          }}
          animate={{
            opacity: 1,
            y: 0,
            rotateY: 0,
          }}
          transition={{
            delay: 0.15,
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={[
            "perspective-1000 relative scroll-mt-28",
            isRtl ? "lg:order-1" : "",
          ].join(" ")}
        >
          <div className="pointer-events-none absolute -inset-5 -z-10 rounded-[3rem] bg-linear-to-br from-primary/20 via-transparent to-secondary/20 blur-3xl" />

          <motion.div
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={[
              "preserve-3d overflow-hidden",
              "rounded-4xl border border-border-subtle",
              "bg-surface-low/90",
              "shadow-[0_32px_100px_rgba(0,0,0,0.24)]",
              "backdrop-blur-2xl",
            ].join(" ")}
          >
            <div
              className={[
                "flex flex-col gap-3",
                "border-b border-border-subtle",
                "px-4 py-3.5",
                "sm:flex-row sm:items-center",
                "sm:justify-between sm:px-5",
              ].join(" ")}
            >
              <div className="flex items-center gap-2">
                <span className="relative flex size-2 shrink-0">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-tertiary opacity-60" />

                  <span className="relative inline-flex size-2 rounded-full bg-tertiary" />
                </span>

                <p className="text-xs font-semibold text-on-surface">
                  {t.hero.resonatorStatus}
                </p>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-on-surface-variant">
                <Cpu className="size-3.5 shrink-0 text-secondary" />
                {t.hero.audioQuality}
              </div>
            </div>

            <div className="relative h-85 overflow-hidden bg-[radial-gradient(circle_at_center,var(--surface-high)_0%,var(--surface-lowest)_72%)] sm:h-95">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-35"
                style={{
                  backgroundImage:
                    "linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                  maskImage:
                    "radial-gradient(circle at center, black, transparent 72%)",
                  WebkitMaskImage:
                    "radial-gradient(circle at center, black, transparent 72%)",
                }}
              />

              <FerrofluidOrb
                mode={mode}
                preset={preset}
                isPlaying={isPlaying}
                theme={theme}
              />

              <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-border-subtle bg-surface-lowest/72 p-3 shadow-xl backdrop-blur-xl sm:inset-x-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <motion.span
                      animate={{
                        boxShadow: isPlaying
                          ? [
                              "0 0 0 rgba(0,0,0,0)",
                              isRaw
                                ? "0 0 18px rgba(239,68,68,0.8)"
                                : "0 0 18px rgba(76,215,246,0.8)",
                              "0 0 0 rgba(0,0,0,0)",
                            ]
                          : "0 0 0 rgba(0,0,0,0)",
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                      }}
                      className={[
                        "grid size-9 shrink-0",
                        "place-items-center rounded-xl",
                        isRaw
                          ? "bg-red-500/15 text-red-500"
                          : "bg-secondary/15 text-secondary",
                      ].join(" ")}
                    >
                      <AudioLines className="size-4" />
                    </motion.span>

                    <div className="min-w-0">
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={`${language}-${mode}`}
                          initial={{
                            opacity: 0,
                            y: 4,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          exit={{
                            opacity: 0,
                            y: -4,
                          }}
                          className="line-clamp-1 text-xs font-semibold text-on-surface sm:text-sm"
                        >
                          {statusText}
                        </motion.p>
                      </AnimatePresence>

                      <p
                        dir="ltr"
                        className={[
                          "mt-0.5 font-mono text-[9px]",
                          isRaw
                            ? "text-red-500"
                            : "text-tertiary",
                        ].join(" ")}
                      >
                        PEAK {peakText}
                      </p>
                    </div>
                  </div>

                  <motion.button
                    type="button"
                    whileHover={{
                      scale: 1.05,
                    }}
                    whileTap={{
                      scale: 0.92,
                    }}
                    onClick={togglePlayback}
                    aria-label={
                      isPlaying
                        ? "Pause audio visualizer"
                        : "Play audio visualizer"
                    }
                    className={[
                      "grid size-10 shrink-0",
                      "place-items-center rounded-xl",
                      "bg-primary text-[#0a0e17]",
                      "shadow-[0_0_20px_rgba(99,102,241,0.28)]",
                    ].join(" ")}
                  >
                    {isPlaying ? (
                      <Pause className="size-4" />
                    ) : (
                      <Play className="size-4 fill-current" />
                    )}
                  </motion.button>
                </div>
              </div>
            </div>

            <div className="space-y-5 p-4 sm:p-5">
              <div
                className={[
                  "grid grid-cols-2 gap-2",
                  "rounded-2xl border border-border-subtle",
                  "bg-surface-lowest/60 p-1.5",
                ].join(" ")}
                aria-label="Audio comparison mode"
              >
                <button
                  type="button"
                  onClick={() => setMode("raw")}
                  aria-pressed={mode === "raw"}
                  className={[
                    "relative flex min-h-12 items-center",
                    "justify-center rounded-xl px-3 py-2.5",
                    "text-center text-xs font-semibold",
                    "transition-colors sm:text-sm",
                    mode === "raw"
                      ? "text-white"
                      : "text-on-surface-variant hover:text-on-surface",
                  ].join(" ")}
                >
                  {mode === "raw" && (
                    <motion.span
                      layoutId="audio-mode-indicator"
                      className="absolute inset-0 rounded-xl bg-linear-to-r from-red-500 to-orange-500 shadow-[0_0_20px_rgba(239,68,68,0.25)]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}

                  <span className="relative">
                    {t.hero.rawModeLabel}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setMode("ai")}
                  aria-pressed={mode === "ai"}
                  className={[
                    "relative flex min-h-12 items-center",
                    "justify-center rounded-xl px-3 py-2.5",
                    "text-center text-xs font-semibold",
                    "transition-colors sm:text-sm",
                    mode === "ai"
                      ? "text-[#0a0e17]"
                      : "text-on-surface-variant hover:text-on-surface",
                  ].join(" ")}
                >
                  {mode === "ai" && (
                    <motion.span
                      layoutId="audio-mode-indicator"
                      className="absolute inset-0 rounded-xl bg-secondary shadow-[0_0_20px_rgba(76,215,246,0.25)]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}

                  <span className="relative font-semibold">
                    {t.hero.aiModeLabel}
                  </span>
                </button>
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold text-on-surface-variant">
                    {t.hero.presetsLabel}
                  </p>

                  <p className="max-w-48 truncate text-xs font-semibold text-tertiary">
                    {selectedPreset?.name}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {presets.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      preset === item.key;

                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() =>
                          setPreset(item.key)
                        }
                        aria-pressed={isActive}
                        title={item.description}
                        className={[
                          "flex min-h-12 items-center gap-2",
                          "rounded-xl border px-3 py-2.5",
                          "text-start text-xs font-semibold",
                          "transition-all",
                          isActive
                            ? "border-secondary/50 bg-secondary text-[#0a0e17] shadow-[0_0_18px_rgba(76,215,246,0.18)]"
                            : "border-border-subtle bg-surface-container/50 text-on-surface-variant hover:bg-surface-high hover:text-on-surface",
                        ].join(" ")}
                      >
                        <Icon className="size-3.5 shrink-0" />

                        <span className="min-w-0 truncate">
                          {item.name}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {selectedPreset && (
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={`${language}-${selectedPreset.key}`}
                      initial={{
                        opacity: 0,
                        y: 4,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -4,
                      }}
                      className="mt-3 text-xs leading-5 text-on-surface-variant"
                    >
                      {selectedPreset.description}
                    </motion.p>
                  </AnimatePresence>
                )}
              </div>

              <div className="rounded-2xl border border-border-subtle bg-surface-lowest/55 p-3.5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <Activity className="size-3.5 shrink-0 text-secondary" />

                    <p className="truncate text-[10px] font-semibold text-on-surface-variant">
                      {t.hero.audioQuality}
                    </p>
                  </div>

                  <span
                    className={[
                      "size-2 shrink-0 rounded-full",
                      isPlaying
                        ? "animate-pulse bg-tertiary shadow-[0_0_8px_var(--tertiary)]"
                        : "bg-surface-highest",
                    ].join(" ")}
                  />
                </div>

                <div
                  className="flex h-20 items-end gap-1"
                  aria-label="Animated frequency spectrum"
                >
                  {spectrumBars.map((bar) => {
                    const targetHeight = isRaw
                      ? bar.rawHeight
                      : bar.aiHeight;

                    return (
                      <motion.span
                        key={bar.id}
                        initial={false}
                        animate={{
                          height: isPlaying
                            ? [
                                `${Math.max(
                                  10,
                                  targetHeight * 0.45,
                                )}%`,
                                `${targetHeight}%`,
                                `${Math.max(
                                  14,
                                  targetHeight * 0.62,
                                )}%`,
                              ]
                            : "12%",
                          opacity: isPlaying
                            ? [0.58, 1, 0.72]
                            : 0.35,
                        }}
                        transition={
                          isPlaying
                            ? {
                                duration: isRaw
                                  ? bar.duration * 0.7
                                  : bar.duration * 1.35,
                                repeat: Infinity,
                                repeatType: "mirror",
                                ease: isRaw
                                  ? "easeIn"
                                  : "easeInOut",
                                delay: bar.delay,
                              }
                            : {
                                duration: 0.35,
                              }
                        }
                        className={[
                          "min-w-0 flex-1 rounded-t-full",
                          isRaw
                            ? bar.id % 3 === 0
                              ? "bg-orange-500"
                              : "bg-red-500"
                            : bar.id % 3 === 0
                              ? "bg-primary"
                              : "bg-secondary",
                        ].join(" ")}
                        style={{
                          boxShadow: isPlaying
                            ? isRaw
                              ? "0 0 8px rgba(239,68,68,0.35)"
                              : "0 0 8px rgba(76,215,246,0.3)"
                            : "none",
                        }}
                      />
                    );
                  })}
                </div>

                <div
                  dir="ltr"
                  className="mt-2 flex justify-between font-mono text-[8px] text-on-surface-variant"
                >
                  <span>20 Hz</span>
                  <span>250 Hz</span>
                  <span>1 kHz</span>
                  <span>8 kHz</span>
                  <span>20 kHz</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}