"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Rocket,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";

import TiltCard3D from "@/components/TiltCard3D";
import { useApp } from "@/context/AppContext";

type BillingCycle = "monthly" | "yearly";
type PricingTierKey = "starter" | "creator" | "studio";

interface PricingPlanConfig {
  key: PricingTierKey;
  icon: LucideIcon;
  popular: boolean;
  accent: "primary" | "secondary" | "tertiary";
}

const pricingPlans: PricingPlanConfig[] = [
  {
    key: "starter",
    icon: Rocket,
    popular: false,
    accent: "secondary",
  },
  {
    key: "creator",
    icon: Sparkles,
    popular: true,
    accent: "primary",
  },
  {
    key: "studio",
    icon: Users,
    popular: false,
    accent: "tertiary",
  },
];

export default function PricingSection() {
  const {
    t,
    language,
    setIsTrialModalOpen,
  } = useApp();

  const [billingCycle, setBillingCycle] =
    useState<BillingCycle>("yearly");

  const isRtl = language === "ar";

  return (
    <section
      id="pricing"
      className="relative scroll-mt-24 overflow-hidden bg-surface-low py-24 sm:py-28 lg:py-32"
    >
      <PricingBackground />

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
            amount: 0.4,
          }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto max-w-3xl text-center"
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
              {t.pricing.badge}
            </span>
          </div>

          <h2 className="font-display text-4xl font-semibold leading-tight tracking-[-0.045em] text-on-surface sm:text-5xl lg:text-6xl">
            {t.pricing.title}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-on-surface-variant sm:text-lg">
            {t.pricing.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 16,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.55,
            delay: 0.12,
          }}
          className={[
            "mx-auto mt-9 flex w-fit",
            "flex-col items-center gap-3",
            "sm:flex-row",
            isRtl ? "sm:flex-row-reverse" : "",
          ].join(" ")}
        >
          <div
            className={[
              "relative grid grid-cols-2",
              "rounded-2xl border border-border-subtle",
              "bg-(--surface-lowest)/70 p-1.5",
              "shadow-lg backdrop-blur-xl",
            ].join(" ")}
            aria-label={
              isRtl
                ? "اختيار دورة الفوترة"
                : "Billing cycle"
            }
          >
            <BillingButton
              value="monthly"
              label={t.pricing.monthly}
              activeCycle={billingCycle}
              onSelect={setBillingCycle}
            />

            <BillingButton
              value="yearly"
              label={t.pricing.yearly}
              activeCycle={billingCycle}
              onSelect={setBillingCycle}
            />
          </div>

          <motion.span
            animate={
              billingCycle === "yearly"
                ? {
                    scale: [1, 1.06, 1],
                  }
                : {
                    scale: 1,
                  }
            }
            transition={{
              duration: 0.35,
            }}
            className={[
              "rounded-full border border-tertiary/25",
              "bg-tertiary/10 px-3 py-1.5",
              "font-mono text-[10px] font-bold",
              "uppercase tracking-[0.12em]",
              "text-tertiary",
            ].join(" ")}
          >
            {t.pricing.saveBadge}
          </motion.span>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => {
            const translatedTier =
              t.pricing.tiers[plan.key];

            const Icon = plan.icon;

            const price =
              billingCycle === "monthly"
                ? translatedTier.priceMonthly
                : translatedTier.priceYearly;

            return (
              <motion.div
                key={plan.key}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.18,
                }}
                transition={{
                  duration: 0.62,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={[
                  "relative h-full",
                  plan.popular
                    ? "lg:-translate-y-4"
                    : "",
                ].join(" ")}
              >
                {plan.popular && (
                  <div
                    aria-hidden="true"
                    className={[
                      "pointer-events-none absolute -inset-1",
                      "rounded-[2.2rem]",
                      "bg-linear-to-br",
                      "from-primary via-secondary to-tertiary",
                      "opacity-40 blur-md",
                    ].join(" ")}
                  />
                )}

                <TiltCard3D
                  className="group h-full"
                  intensity={5}
                >
                  <div
                    className={[
                      "relative flex h-full min-h-155 flex-col",
                      "overflow-hidden rounded-4xl border",
                      "bg-surface-container/85 p-6",
                      "shadow-[0_28px_90px_rgba(0,0,0,0.14)]",
                      "backdrop-blur-2xl sm:p-7",
                      plan.popular
                        ? "border-primary/50"
                        : "border-border-subtle",
                    ].join(" ")}
                  >
                    <CardAmbientGlow
                      accent={plan.accent}
                    />

                    {plan.popular && (
                      <div className="absolute inset-x-0 top-0 z-20 flex justify-center">
                        <div
                          className={[
                            "rounded-b-2xl",
                            "bg-linear-to-r",
                            "from-primary to-secondary",
                            "px-5 py-2",
                            "font-mono text-[9px] font-bold",
                            "uppercase tracking-[0.12em]",
                            "text-white shadow-lg",
                          ].join(" ")}
                        >
                          {t.pricing.popularBadge}
                        </div>
                      </div>
                    )}

                    <div
                      className={[
                        "relative z-10 flex items-start",
                        "justify-between gap-4",
                        plan.popular ? "pt-7" : "",
                        isRtl
                          ? "flex-row-reverse text-right"
                          : "",
                      ].join(" ")}
                      style={{
                        transform: "translateZ(30px)",
                      }}
                    >
                      <div className="min-w-0">
                        <h3 className="font-display text-2xl font-semibold tracking-[-0.03em] text-on-surface">
                          {translatedTier.name}
                        </h3>

                        <p className="mt-2 min-h-12 text-sm leading-6 text-on-surface-variant">
                          {translatedTier.description}
                        </p>
                      </div>

                      <span
                        className={[
                          "grid size-12 shrink-0",
                          "place-items-center rounded-2xl",
                          getPlanIconClasses(
                            plan.accent,
                            plan.popular,
                          ),
                        ].join(" ")}
                      >
                        <Icon className="size-5" />
                      </span>
                    </div>

                    <div
                      className={[
                        "relative z-10 mt-8",
                        "flex items-end gap-2",
                        isRtl
                          ? "flex-row-reverse justify-end"
                          : "",
                      ].join(" ")}
                      style={{
                        transform: "translateZ(24px)",
                      }}
                    >
                      <motion.span
                        key={`${plan.key}-${billingCycle}`}
                        initial={{
                          opacity: 0,
                          y: 8,
                          scale: 0.96,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 320,
                          damping: 25,
                        }}
                        dir="ltr"
                        className="font-display text-5xl font-semibold tracking-[-0.05em] text-on-surface"
                      >
                        {price}
                      </motion.span>

                      <span className="pb-1.5 text-sm text-on-surface-variant">
                        {translatedTier.period}
                      </span>
                    </div>

                    <div
                      className={[
                        "relative z-10 mt-4",
                        "rounded-2xl border",
                        "border-border-subtle",
                        "bg-(--surface-lowest)/55",
                        "px-4 py-3 backdrop-blur-xl",
                      ].join(" ")}
                    >
                      <div
                        className={[
                          "flex items-center justify-between gap-3",
                          isRtl
                            ? "flex-row-reverse"
                            : "",
                        ].join(" ")}
                      >
                        <div
                          className={[
                            "flex items-center gap-2",
                            isRtl
                              ? "flex-row-reverse"
                              : "",
                          ].join(" ")}
                        >
                          <span
                            className={[
                              "size-2 rounded-full",
                              billingCycle === "yearly"
                                ? "bg-tertiary shadow-[0_0_8px_var(--tertiary)]"
                                : "bg-secondary shadow-[0_0_8px_var(--secondary)]",
                            ].join(" ")}
                          />

                          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-on-surface-variant">
                            {billingCycle === "yearly"
                              ? t.pricing.yearly
                              : t.pricing.monthly}
                          </span>
                        </div>

                        {billingCycle === "yearly" && (
                          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-tertiary">
                            {t.pricing.saveBadge}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="relative z-10 my-7 h-px bg-border-subtle" />

                    <ul className="relative z-10 flex-1 space-y-3.5">
                      {translatedTier.features.map(
                        (feature, featureIndex) => (
                          <motion.li
                            key={`${plan.key}-${feature}`}
                            initial={{
                              opacity: 0,
                              x: isRtl ? 8 : -8,
                            }}
                            whileInView={{
                              opacity: 1,
                              x: 0,
                            }}
                            viewport={{
                              once: true,
                            }}
                            transition={{
                              duration: 0.35,
                              delay:
                                index * 0.05 +
                                featureIndex * 0.035,
                            }}
                            className={[
                              "flex gap-3 text-sm",
                              "leading-6",
                              "text-on-surface-variant",
                              isRtl
                                ? "flex-row-reverse text-right"
                                : "",
                            ].join(" ")}
                          >
                            <span
                              className={[
                                "mt-0.5 grid size-5",
                                "shrink-0 place-items-center",
                                "rounded-full",
                                plan.popular
                                  ? "bg-primary/12 text-primary"
                                  : "bg-tertiary/12 text-tertiary",
                              ].join(" ")}
                            >
                              <Check className="size-3.5" />
                            </span>

                            <span>{feature}</span>
                          </motion.li>
                        ),
                      )}
                    </ul>

                    <motion.button
                      type="button"
                      whileHover={{
                        y: -2,
                        scale: 1.01,
                      }}
                      whileTap={{
                        scale: 0.97,
                      }}
                      onClick={() =>
                        setIsTrialModalOpen(true)
                      }
                      className={[
                        "relative z-10 mt-8 flex min-h-13",
                        "w-full items-center justify-center",
                        "gap-2 rounded-2xl px-5",
                        "text-sm font-semibold",
                        "transition-colors",
                        plan.popular
                          ? "bg-primary text-on-primary shadow-[0_0_34px_rgba(99,102,241,0.3)]"
                          : "border border-border-subtle bg-surface-high text-on-surface hover:border-primary/30 hover:bg-surface-highest",
                        isRtl
                          ? "flex-row-reverse"
                          : "",
                      ].join(" ")}
                    >
                      {plan.popular ? (
                        <Sparkles className="size-4" />
                      ) : (
                        <Icon className="size-4" />
                      )}

                      {translatedTier.cta}
                    </motion.button>
                  </div>
                </TiltCard3D>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface BillingButtonProps {
  value: BillingCycle;
  label: string;
  activeCycle: BillingCycle;
  onSelect: (cycle: BillingCycle) => void;
}

function BillingButton({
  value,
  label,
  activeCycle,
  onSelect,
}: BillingButtonProps) {
  const isActive = activeCycle === value;

  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      aria-pressed={isActive}
      className={[
        "relative min-w-28 rounded-xl",
        "px-4 py-2.5",
        "text-sm font-semibold",
        "transition-colors",
        isActive
          ? "text-on-primary"
          : "text-on-surface-variant hover:text-on-surface",
      ].join(" ")}
    >
      {isActive && (
        <motion.span
          layoutId="billing-indicator"
          className={[
            "absolute inset-0 rounded-xl",
            "bg-primary",
            "shadow-[0_0_24px_rgba(99,102,241,0.25)]",
          ].join(" ")}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 32,
          }}
        />
      )}

      <span className="relative">{label}</span>
    </button>
  );
}

interface CardAmbientGlowProps {
  accent: PricingPlanConfig["accent"];
}

function CardAmbientGlow({
  accent,
}: CardAmbientGlowProps) {
  const glowClass =
    accent === "secondary"
      ? "bg-secondary/10"
      : accent === "tertiary"
        ? "bg-tertiary/10"
        : "bg-primary/12";

  return (
    <>
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute",
          "-end-24 -top-24 size-64",
          "rounded-full blur-3xl",
          glowClass,
        ].join(" ")}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-linear-to-b from-white/3 to-transparent"
      />
    </>
  );
}

function getPlanIconClasses(
  accent: PricingPlanConfig["accent"],
  isPopular: boolean,
): string {
  if (isPopular) {
    return [
      "bg-primary text-on-primary",
      "shadow-[0_0_26px_rgba(99,102,241,0.3)]",
    ].join(" ");
  }

  if (accent === "secondary") {
    return [
      "border border-secondary/20",
      "bg-secondary/10",
      "text-secondary",
    ].join(" ");
  }

  if (accent === "tertiary") {
    return [
      "border border-tertiary/20",
      "bg-tertiary/10",
      "text-tertiary",
    ].join(" ");
  }

  return [
    "border border-primary/20",
    "bg-primary/10",
    "text-primary",
  ].join(" ");
}

function PricingBackground() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute start-[-10%] top-[10%] size-112 rounded-full bg-primary/8 blur-[145px]" />

        <div className="absolute end-[-8%] top-[30%] size-112 rounded-full bg-secondary/8 blur-[145px]" />

        <div className="absolute bottom-[-15%] start-[35%] size-96 rounded-full bg-tertiary/6 blur-[130px]" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--on-surface) 1px, transparent 1px), linear-gradient(90deg, var(--on-surface) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
        }}
      />
    </>
  );
}