"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  CircuitBoard,
  HelpCircle,
  Sparkles,
} from "lucide-react";

import { useApp } from "@/context/AppContext";

export default function FaqSection() {
  const { t, language } = useApp();

  const [openIndex, setOpenIndex] = useState<number>(0);

  const isRtl = language === "ar";

  const toggleItem = (index: number) => {
    setOpenIndex((currentIndex) =>
      currentIndex === index ? -1 : index,
    );
  };

  return (
    <section
      id="faq"
      className="relative scroll-mt-24 overflow-hidden bg-surface py-24 sm:py-28 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute inset-e-[-12%] top-[10%] size-112 rounded-full bg-primary/7 blur-[150px]" />

        <div className="absolute inset-s-[-12%] bottom-[5%] size-112 rounded-full bg-secondary/7 blur-[150px]" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--on-surface) 1px, transparent 1px), linear-gradient(90deg, var(--on-surface) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-5 sm:px-8 lg:px-10">
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
          className="mx-auto max-w-3xl text-center"
        >
          <div
            className={[
              "mb-5 inline-flex items-center gap-2",
              "rounded-full border border-secondary/25",
              "bg-secondary/8 px-3 py-2",
              isRtl ? "flex-row-reverse" : "",
            ].join(" ")}
          >
            <CircuitBoard className="size-3.5 text-secondary" />

            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-secondary sm:text-xs">
              {t.nav.faq}
            </span>
          </div>

          <h2 className="font-display text-4xl font-semibold leading-tight tracking-[-0.045em] text-on-surface sm:text-5xl lg:text-6xl">
            {t.faq.title}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-on-surface-variant sm:text-lg">
            {t.faq.subtitle}
          </p>
        </motion.div>

        <div className="mt-14 space-y-3">
          {t.faq.items.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const triggerId = `faq-trigger-${index}`;

            return (
              <motion.article
                key={item.question}
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
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={[
                  "overflow-hidden rounded-3xl border",
                  "bg-surface-container/72",
                  "backdrop-blur-xl",
                  "transition-colors",
                  isOpen
                    ? "border-primary/30 shadow-[0_18px_60px_rgba(0,0,0,0.1)]"
                    : "border-border-subtle hover:border-border-strong",
                ].join(" ")}
              >
                <h3>
                  <button
                    id={triggerId}
                    type="button"
                    onClick={() => toggleItem(index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className={[
                      "flex w-full items-center",
                      "justify-between gap-5",
                      "p-5 sm:p-6",
                      isRtl
                        ? "flex-row-reverse text-right"
                        : "text-left",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "flex min-w-0 items-center gap-4",
                        isRtl ? "flex-row-reverse" : "",
                      ].join(" ")}
                    >
                      <motion.span
                        animate={{
                          backgroundColor: isOpen
                            ? "var(--primary)"
                            : "var(--surface-high)",
                          color: isOpen
                            ? "var(--on-primary)"
                            : "var(--primary)",
                        }}
                        transition={{
                          duration: 0.2,
                        }}
                        className="grid size-10 shrink-0 place-items-center rounded-2xl"
                      >
                        {isOpen ? (
                          <Sparkles className="size-4" />
                        ) : (
                          <HelpCircle className="size-4" />
                        )}
                      </motion.span>

                      <span className="font-display text-base font-semibold leading-6 text-on-surface sm:text-lg">
                        {item.question}
                      </span>
                    </span>

                    <motion.span
                      animate={{
                        rotate: isOpen ? 180 : 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 320,
                        damping: 26,
                      }}
                      className={[
                        "grid size-9 shrink-0",
                        "place-items-center rounded-xl",
                        "border border-border-subtle",
                        "bg-surface-low",
                        "text-on-surface-variant",
                      ].join(" ")}
                    >
                      <ChevronDown className="size-4" />
                    </motion.span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={triggerId}
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        height: {
                          duration: 0.34,
                          ease: [0.22, 1, 0.36, 1],
                        },
                        opacity: {
                          duration: 0.22,
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <div
                        className={[
                          "border-t border-border-subtle",
                          "px-5 py-5 sm:px-6",
                          isRtl
                            ? "text-right sm:pe-20"
                            : "text-left sm:ps-20",
                        ].join(" ")}
                      >
                        <p className="text-sm leading-7 text-on-surface-variant sm:text-base">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}