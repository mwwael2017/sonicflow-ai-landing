"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AudioWaveform,
  Menu,
  Moon,
  Sparkles,
  Sun,
  X,
} from "lucide-react";

import { useApp } from "@/context/AppContext";
import {
  languages,
  languageLabels,
  type Language,
} from "@/lib/translations";

interface NavLink {
  href: string;
  label: string;
}

export default function Navbar() {
  const {
    language,
    setLanguage,
    theme,
    toggleTheme,
    setIsTrialModalOpen,
    t,
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  const isRtl = language === "ar";

  const navLinks: NavLink[] = [
    {
      href: "#features",
      label: t.nav.features,
    },
    {
      href: "#playground",
      label: t.nav.liveDemo,
    },
    {
      href: "#pricing",
      label: t.nav.pricing,
    },
    {
      href: "#faq",
      label: t.nav.faq,
    },
  ];

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const scrollToSection = (href: string) => {
    document
      .querySelector<HTMLElement>(href)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

    setIsMobileMenuOpen(false);
  };

  const handleLanguageChange = (
    nextLanguage: Language,
  ) => {
    setLanguage(nextLanguage);
    setIsMobileMenuOpen(false);
  };

  const handleStartFree = () => {
    setIsMobileMenuOpen(false);
    setIsTrialModalOpen(true);
  };

  const themeToggleLabel =
    theme === "dark"
      ? isRtl
        ? "التبديل إلى الوضع الفاتح"
        : "Switch to light mode"
      : isRtl
        ? "التبديل إلى الوضع الداكن"
        : "Switch to dark mode";

  const menuToggleLabel = isMobileMenuOpen
    ? isRtl
      ? "إغلاق قائمة التنقل"
      : "Close navigation menu"
    : isRtl
      ? "فتح قائمة التنقل"
      : "Open navigation menu";

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto max-w-7xl"
        >
          <nav
            aria-label={
              isRtl ? "التنقل الرئيسي" : "Main navigation"
            }
            className={[
              "flex h-16 items-center justify-between gap-4",
              "rounded-2xl border border-border-subtle",
              "bg-surface-lowest/80 px-3",
              "shadow-[0_18px_70px_rgba(0,0,0,0.16)]",
              "backdrop-blur-xl surface-transition",
              "sm:px-4",
            ].join(" ")}
          >
            <div className="flex min-w-0 shrink-0 items-center">
              <button
                type="button"
                onClick={() => scrollToSection("#hero")}
                className="group flex shrink-0 items-center gap-2.5 rounded-xl"
                aria-label={
                  isRtl
                    ? "العودة إلى بداية SonicFlow AI"
                    : "Go to SonicFlow AI home"
                }
              >
                <motion.span
                  whileHover={{
                    rotate: -8,
                    scale: 1.06,
                  }}
                  whileTap={{
                    scale: 0.94,
                  }}
                  className={[
                    "relative grid size-10 shrink-0 place-items-center",
                    "overflow-hidden rounded-xl",
                    "bg-linear-to-br from-primary via-primary-container to-secondary",
                    "shadow-[0_0_28px_rgba(99,102,241,0.38)]",
                  ].join(" ")}
                >
                  <span className="absolute inset-0 bg-white/10" />

                  <AudioWaveform
                    aria-hidden="true"
                    className="relative size-5 text-[#0a0e17]"
                    strokeWidth={2.3}
                  />

                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ["-150%", "150%"],
                    }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      repeatDelay: 1.5,
                      ease: "easeInOut",
                    }}
                  />
                </motion.span>

                <span
                  dir="ltr"
                  className="whitespace-nowrap font-display text-[15px] font-semibold tracking-[-0.03em] text-on-surface sm:text-base"
                >
                  SonicFlow
                  <span className="text-primary">.AI</span>
                </span>
              </button>
            </div>

            <div className="hidden min-w-0 flex-1 items-center justify-center gap-6 lg:flex">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() =>
                    scrollToSection(link.href)
                  }
                  className={[
                    "shrink-0 whitespace-nowrap rounded-xl",
                    "px-1 py-2 text-sm font-medium",
                    "text-on-surface-variant",
                    "transition-colors",
                    "hover:text-on-surface",
                  ].join(" ")}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="hidden shrink-0 items-center justify-end gap-2 lg:flex">
              <div
                className="flex items-center gap-1 rounded-xl border border-border-subtle bg-surface-low p-1"
                aria-label={
                  isRtl ? "اختيار اللغة" : "Language selection"
                }
              >
                {languages.map((languageCode) => {
                  const isActive =
                    languageCode === language;

                  return (
                    <button
                      key={languageCode}
                      type="button"
                      onClick={() =>
                        handleLanguageChange(languageCode)
                      }
                      aria-pressed={isActive}
                      className={[
                        "relative min-w-8 rounded-lg px-1.5 py-1.5",
                        "font-mono text-[10px] font-semibold",
                        "transition-colors",
                        isActive
                          ? "text-[#0a0e17]"
                          : "text-on-surface-variant hover:text-on-surface",
                      ].join(" ")}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="desktop-language-indicator"
                          className="absolute inset-0 rounded-lg bg-secondary"
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 32,
                          }}
                        />
                      )}

                      <span
                        dir="ltr"
                        className="relative font-semibold"
                      >
                        {languageLabels[languageCode]}
                      </span>
                    </button>
                  );
                })}
              </div>

              <motion.button
                type="button"
                whileHover={{
                  scale: 1.04,
                }}
                whileTap={{
                  scale: 0.94,
                }}
                onClick={toggleTheme}
                aria-label={themeToggleLabel}
                title={themeToggleLabel}
                className={[
                  "grid size-10 shrink-0 place-items-center",
                  "rounded-xl border border-border-subtle",
                  "bg-surface-low text-on-surface-variant",
                  "transition-colors",
                  "hover:bg-surface-high hover:text-on-surface",
                ].join(" ")}
              >
                <AnimatePresence
                  mode="wait"
                  initial={false}
                >
                  <motion.span
                    key={theme}
                    initial={{
                      opacity: 0,
                      rotate: -60,
                      scale: 0.6,
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      rotate: 60,
                      scale: 0.6,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                  >
                    {theme === "dark" ? (
                      <Sun className="size-4.5" />
                    ) : (
                      <Moon className="size-4.5" />
                    )}
                  </motion.span>
                </AnimatePresence>
              </motion.button>

              <motion.button
                type="button"
                whileHover={{
                  scale: 1.02,
                  y: -1,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={handleStartFree}
                className={[
                  "relative shrink-0 overflow-hidden",
                  "whitespace-nowrap rounded-xl",
                  "bg-primary px-4 py-2.5",
                  "text-sm font-semibold text-[#0a0e17]",
                  "shadow-[0_0_28px_rgba(99,102,241,0.3)]",
                ].join(" ")}
              >
                <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/25 to-transparent opacity-0 transition-opacity hover:opacity-100" />

                <span className="relative flex items-center gap-2">
                  <Sparkles className="size-4" />
                  {t.nav.startFree}
                </span>
              </motion.button>
            </div>

            <div className="flex shrink-0 items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={themeToggleLabel}
                className={[
                  "grid size-10 place-items-center",
                  "rounded-xl border border-border-subtle",
                  "bg-surface-low text-on-surface",
                ].join(" ")}
              >
                {theme === "dark" ? (
                  <Sun className="size-4.5" />
                ) : (
                  <Moon className="size-4.5" />
                )}
              </button>

              <button
                type="button"
                onClick={() =>
                  setIsMobileMenuOpen(
                    (current) => !current,
                  )
                }
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation"
                aria-label={menuToggleLabel}
                className={[
                  "grid size-10 place-items-center",
                  "rounded-xl border border-border-subtle",
                  "bg-surface-low text-on-surface",
                ].join(" ")}
              >
                <AnimatePresence
                  mode="wait"
                  initial={false}
                >
                  <motion.span
                    key={
                      isMobileMenuOpen ? "close" : "menu"
                    }
                    initial={{
                      opacity: 0,
                      rotate: -45,
                      scale: 0.7,
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      rotate: 45,
                      scale: 0.7,
                    }}
                    transition={{
                      duration: 0.16,
                    }}
                  >
                    {isMobileMenuOpen ? (
                      <X className="size-5" />
                    ) : (
                      <Menu className="size-5" />
                    )}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </nav>
        </motion.div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.button
              type="button"
              aria-label={
                isRtl
                  ? "إغلاق قائمة الهاتف"
                  : "Close mobile navigation"
              }
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="fixed inset-0 z-40 bg-black/45 backdrop-blur-sm lg:hidden"
            />

            <motion.div
              id="mobile-navigation"
              initial={{
                opacity: 0,
                y: -16,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -16,
                scale: 0.98,
              }}
              transition={{
                duration: 0.22,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={[
                "fixed inset-x-3 top-23 z-50",
                "rounded-3xl border border-border-subtle",
                "bg-surface-lowest/95 p-4",
                "shadow-2xl backdrop-blur-2xl",
                "sm:inset-x-5 lg:hidden",
              ].join(" ")}
            >
              <div className="grid gap-2">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.href}
                    type="button"
                    initial={{
                      opacity: 0,
                      x: isRtl ? 12 : -12,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: index * 0.045,
                    }}
                    onClick={() =>
                      scrollToSection(link.href)
                    }
                    className={[
                      "rounded-2xl border border-transparent",
                      "bg-surface-low px-4 py-3",
                      "text-start text-sm font-medium",
                      "text-on-surface transition-colors",
                      "hover:border-border-subtle",
                      "hover:bg-surface-high",
                    ].join(" ")}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>

              <div className="my-4 h-px bg-border-subtle" />

              <div>
                <p className="mb-2 text-start text-xs font-semibold text-on-surface-variant">
                  {isRtl ? "اللغة" : "Language"}
                </p>

                <div
                  className={[
                    "grid grid-cols-5 gap-1",
                    "rounded-2xl border border-border-subtle",
                    "bg-surface-low p-1.5",
                  ].join(" ")}
                >
                  {languages.map((languageCode) => {
                    const isActive =
                      languageCode === language;

                    return (
                      <button
                        key={languageCode}
                        type="button"
                        onClick={() =>
                          handleLanguageChange(languageCode)
                        }
                        aria-pressed={isActive}
                        className={[
                          "rounded-xl px-2 py-2",
                          "font-mono text-xs font-semibold",
                          "transition-colors",
                          isActive
                            ? "bg-secondary text-[#0a0e17]"
                            : "text-on-surface-variant hover:bg-surface-high hover:text-on-surface",
                        ].join(" ")}
                      >
                        <span dir="ltr">
                          {languageLabels[languageCode]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                onClick={handleStartFree}
                className={[
                  "mt-4 flex w-full items-center",
                  "justify-center gap-2 rounded-2xl",
                  "bg-primary px-5 py-3.5",
                  "text-sm font-semibold text-[#0a0e17]",
                  "shadow-[0_0_30px_rgba(99,102,241,0.28)]",
                ].join(" ")}
              >
                <Sparkles className="size-4" />
                {t.nav.startFree}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}