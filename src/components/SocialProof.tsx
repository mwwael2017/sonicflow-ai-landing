"use client";

import { motion } from "framer-motion";
import {
  AudioLines,
  CircleDot,
  FileAudio,
  Headphones,
  RadioTower,
  Waves,
  type LucideIcon,
} from "lucide-react";

import { useApp } from "@/context/AppContext";

interface Brand {
  id: string;
  name: string;
  icon: LucideIcon;
  iconHoverClass: string;
  glowHoverClass: string;
}

const brands: Brand[] = [
  {
    id: "spotify",
    name: "Spotify Studios",
    icon: CircleDot,
    iconHoverClass: "group-hover:text-[#1ed760]",
    glowHoverClass: "group-hover:bg-[#1ed760]/10",
  },
  {
    id: "discord",
    name: "Discord Voice",
    icon: RadioTower,
    iconHoverClass: "group-hover:text-[#5865f2]",
    glowHoverClass: "group-hover:bg-[#5865f2]/10",
  },
  {
    id: "twitch",
    name: "Twitch Live",
    icon: Waves,
    iconHoverClass: "group-hover:text-[#9146ff]",
    glowHoverClass: "group-hover:bg-[#9146ff]/10",
  },
  {
    id: "rode",
    name: "Røde Labs",
    icon: Headphones,
    iconHoverClass: "group-hover:text-primary",
    glowHoverClass: "group-hover:bg-primary/10",
  },
  {
    id: "ableton",
    name: "Ableton Live",
    icon: AudioLines,
    iconHoverClass: "group-hover:text-secondary",
    glowHoverClass: "group-hover:bg-secondary/10",
  },
  {
    id: "descript",
    name: "Descript",
    icon: FileAudio,
    iconHoverClass: "group-hover:text-tertiary",
    glowHoverClass: "group-hover:bg-tertiary/10",
  },
];

export default function SocialProof() {
  const { t, language } = useApp();

  const isRtl = language === "ar";

  return (
    <section
      aria-labelledby="social-proof-title"
      className={[
        "relative overflow-hidden",
        "border-y border-(--surface-high)/40",
        "bg-surface-lowest/60 py-8",
        "backdrop-blur-md",
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-secondary/5"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent, var(--border-subtle), transparent)",
          backgroundSize: "320px 100%",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 12,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.5,
          }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-7 flex justify-center"
        >
          <div
            className={[
              "flex items-center gap-3",
              isRtl ? "flex-row-reverse" : "",
            ].join(" ")}
          >
            <span className="h-px w-8 bg-linear-to-r from-transparent to-primary sm:w-14" />

            <p
              id="social-proof-title"
              className="text-center font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-primary sm:text-xs"
            >
              {t.socialProof.title}
            </p>

            <span className="h-px w-8 bg-linear-to-r from-secondary to-transparent sm:w-14" />
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
          {brands.map((brand, index) => {
            const Icon = brand.icon;

            return (
              <motion.div
                key={brand.id}
                initial={{
                  opacity: 0,
                  y: 14,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.4,
                }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.055,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -3,
                  scale: 1.015,
                }}
                className={[
                  "group relative flex min-h-16",
                  "items-center justify-center gap-2.5",
                  "overflow-hidden rounded-2xl border",
                  "border-border-subtle",
                  "bg-surface-container/45 px-3",
                  "text-on-surface-variant grayscale",
                  "transition-all duration-300",
                  "hover:border-border-strong",
                  "hover:bg-surface-container",
                  "hover:text-on-surface",
                  "hover:grayscale-0",
                  isRtl ? "flex-row-reverse" : "",
                ].join(" ")}
              >
                <span
                  aria-hidden="true"
                  className={[
                    "absolute inset-0 opacity-0",
                    "transition-opacity duration-300",
                    "group-hover:opacity-100",
                    brand.glowHoverClass,
                  ].join(" ")}
                />

                <span
                  aria-hidden="true"
                  className={[
                    "absolute inset-x-0 bottom-0 h-px",
                    "scale-x-0",
                    "bg-linear-to-r",
                    "from-transparent via-primary to-transparent",
                    "transition-transform duration-300",
                    "group-hover:scale-x-100",
                  ].join(" ")}
                />

                <Icon
                  aria-hidden="true"
                  className={[
                    "relative size-4.5 shrink-0",
                    "transition-colors duration-300",
                    brand.iconHoverClass,
                  ].join(" ")}
                />

                <span
                  dir="auto"
                  className="relative whitespace-nowrap text-[11px] font-semibold sm:text-xs"
                >
                  {brand.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}