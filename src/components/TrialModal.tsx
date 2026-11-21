"use client";

import {
  useEffect,
  useState,
  type FormEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Apple,
  Check,
  Clipboard,
  Download,
  Monitor,
  Music2,
  ShieldCheck,
  Sparkles,
  X,
  type LucideIcon,
} from "lucide-react";

import { useApp } from "@/context/AppContext";

type PlatformId = "mac" | "windows" | "plugin";
type ModalStep = "form" | "success";

interface Platform {
  id: PlatformId;
  name: string;
  detail: string;
  icon: LucideIcon;
}

const platforms: Platform[] = [
  {
    id: "mac",
    name: "macOS Apple Silicon",
    detail: "M1, M2, M3, and M4 native build",
    icon: Apple,
  },
  {
    id: "windows",
    name: "Windows 11 x64",
    detail: "Low-latency ASIO desktop engine",
    icon: Monitor,
  },
  {
    id: "plugin",
    name: "VST3 / AU DAW Plugin",
    detail: "Ableton, Logic Pro, FL Studio, and more",
    icon: Music2,
  },
];

function generateLicenseKey(): string {
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const randomValues = new Uint32Array(4);

  window.crypto.getRandomValues(randomValues);

  const suffix = Array.from(randomValues)
    .map((value) => characters[value % characters.length])
    .join("");

  return `SF3D-PRO-2026-${suffix}`;
}

export default function TrialModal() {
  const {
    isTrialModalOpen,
    setIsTrialModalOpen,
    language,
  } = useApp();

  const [selectedPlatform, setSelectedPlatform] =
    useState<PlatformId>("mac");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [step, setStep] = useState<ModalStep>("form");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [licenseKey, setLicenseKey] = useState("");

  const isRtl = language === "ar";

  useEffect(() => {
    if (!isTrialModalOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsTrialModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isTrialModalOpen, setIsTrialModalOpen]);

  useEffect(() => {
    if (!isTrialModalOpen) {
      return;
    }

    setStep("form");
    setEmailError("");
    setIsGenerating(false);
    setCopied(false);
    setLicenseKey("");
  }, [isTrialModalOpen]);

  const closeModal = () => {
    setIsTrialModalOpen(false);
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const normalizedEmail = email.trim();

    const isValidEmail =
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(
        normalizedEmail,
      );

    if (!isValidEmail) {
      setEmailError(
        "Enter a valid work or personal email.",
      );
      return;
    }

    setEmailError("");
    setIsGenerating(true);

    const generatedLicenseKey = generateLicenseKey();

    window.setTimeout(() => {
      setLicenseKey(generatedLicenseKey);
      setIsGenerating(false);
      setStep("success");
    }, 900);
  };

  const handleCopy = async () => {
    if (!licenseKey) {
      return;
    }

    try {
      await navigator.clipboard.writeText(licenseKey);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1600);
    } catch {
      setCopied(false);
    }
  };

  const handleDownload = () => {
    if (!licenseKey) {
      return;
    }

    const selected =
      platforms.find(
        (platform) => platform.id === selectedPlatform,
      ) ?? platforms[0];

    const demoContent = [
      "SonicFlow AI Demo Access",
      "",
      `Platform: ${selected.name}`,
      `Email: ${email.trim()}`,
      `License: ${licenseKey}`,
      "",
      "Portfolio demonstration only.",
      "No executable software is included.",
    ].join("\n");

    const blob = new Blob([demoContent], {
      type: "text/plain;charset=utf-8",
    });

    const objectUrl = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");

    downloadLink.href = objectUrl;
    downloadLink.download =
      `sonicflow-access-${selectedPlatform}.txt`;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();

    window.setTimeout(() => {
      URL.revokeObjectURL(objectUrl);
    }, 100);
  };

  return (
    <AnimatePresence>
      {isTrialModalOpen && (
        <motion.div
          className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto p-4 sm:p-6"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
        >
          <motion.button
            type="button"
            aria-label="Close trial modal"
            onClick={closeModal}
            className="absolute inset-0 bg-black/60 backdrop-blur-xl"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="trial-modal-title"
            initial={{
              opacity: 0,
              scale: 0.92,
              y: 24,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.94,
              y: 16,
            }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 26,
            }}
            className={[
              "relative z-10 w-full max-w-2xl overflow-hidden",
              "rounded-4xl border border-border-subtle",
              "bg-(--surface-lowest)/92",
              "shadow-[0_35px_120px_rgba(0,0,0,0.45)]",
              "backdrop-blur-2xl",
            ].join(" ")}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/12 via-transparent to-secondary/12"
            />

            <div className="relative p-5 sm:p-7">
              <div
                className={[
                  "flex items-start justify-between gap-5",
                  isRtl
                    ? "flex-row-reverse text-right"
                    : "",
                ].join(" ")}
              >
                <div>
                  <div
                    className={[
                      "mb-4 inline-flex items-center gap-2 rounded-full",
                      "border border-primary/25 bg-primary/10 px-3 py-2",
                      isRtl ? "flex-row-reverse" : "",
                    ].join(" ")}
                  >
                    <Sparkles className="size-3.5 text-primary" />

                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                      SonicFlow Instant Access
                    </span>
                  </div>

                  <h2
                    id="trial-modal-title"
                    className="font-display text-2xl font-semibold tracking-[-0.035em] text-on-surface sm:text-3xl"
                  >
                    {step === "form"
                      ? "Build your audio engine"
                      : "Your studio is ready"}
                  </h2>

                  <p className="mt-2 max-w-lg text-sm leading-6 text-on-surface-variant">
                    {step === "form"
                      ? "Choose a platform and generate your interactive SonicFlow AI demo access."
                      : "Your simulated license and platform package have been generated."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Close"
                  className="grid size-10 shrink-0 place-items-center rounded-xl border border-border-subtle bg-surface-low text-on-surface-variant transition-colors hover:bg-surface-high hover:text-on-surface"
                >
                  <X className="size-4.5" />
                </button>
              </div>

              <AnimatePresence mode="wait">
                {step === "form" ? (
                  <motion.form
                    key="trial-form"
                    onSubmit={handleSubmit}
                    initial={{
                      opacity: 0,
                      x: isRtl ? 12 : -12,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: isRtl ? -12 : 12,
                    }}
                    className="mt-7"
                    noValidate
                  >
                    <fieldset>
                      <legend
                        className={[
                          "mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-on-surface-variant",
                          isRtl ? "w-full text-right" : "",
                        ].join(" ")}
                      >
                        Select your platform
                      </legend>

                      <div className="grid gap-2.5">
                        {platforms.map((platform) => {
                          const Icon = platform.icon;
                          const isSelected =
                            platform.id === selectedPlatform;

                          return (
                            <button
                              key={platform.id}
                              type="button"
                              onClick={() => {
                                setSelectedPlatform(
                                  platform.id,
                                );
                              }}
                              aria-pressed={isSelected}
                              className={[
                                "flex items-center justify-between gap-4 rounded-2xl border p-4",
                                "transition-all",
                                isSelected
                                  ? "border-primary/45 bg-primary/10 shadow-[0_0_24px_rgba(99,102,241,0.1)]"
                                  : "border-border-subtle bg-surface-container/55 hover:bg-surface-high",
                                isRtl
                                  ? "flex-row-reverse text-right"
                                  : "",
                              ].join(" ")}
                            >
                              <span
                                className={[
                                  "flex items-center gap-3",
                                  isRtl
                                    ? "flex-row-reverse"
                                    : "",
                                ].join(" ")}
                              >
                                <span
                                  className={[
                                    "grid size-10 shrink-0 place-items-center rounded-xl",
                                    isSelected
                                      ? "bg-primary text-on-primary"
                                      : "bg-surface-high text-on-surface-variant",
                                  ].join(" ")}
                                >
                                  <Icon className="size-4.5" />
                                </span>

                                <span>
                                  <span className="block text-sm font-semibold text-on-surface">
                                    {platform.name}
                                  </span>

                                  <span className="mt-1 block text-xs text-on-surface-variant">
                                    {platform.detail}
                                  </span>
                                </span>
                              </span>

                              <span
                                className={[
                                  "grid size-5 shrink-0 place-items-center rounded-full border",
                                  isSelected
                                    ? "border-primary bg-primary text-on-primary"
                                    : "border-border-strong",
                                ].join(" ")}
                              >
                                {isSelected && (
                                  <Check className="size-3" />
                                )}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </fieldset>

                    <div className="mt-5">
                      <label
                        htmlFor="trial-email"
                        className={[
                          "mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-on-surface-variant",
                          isRtl ? "text-right" : "",
                        ].join(" ")}
                      >
                        Access email
                      </label>

                      <input
                        id="trial-email"
                        type="email"
                        value={email}
                        onChange={(event) => {
                          setEmail(event.target.value);
                          setEmailError("");
                        }}
                        placeholder="engineer@studio.com"
                        autoComplete="email"
                        aria-invalid={Boolean(emailError)}
                        aria-describedby={
                          emailError
                            ? "trial-email-error"
                            : undefined
                        }
                        className={[
                          "h-13 w-full rounded-2xl border",
                          "bg-surface-container/70 px-4",
                          "text-sm text-on-surface outline-none",
                          "placeholder:text-on-surface-variant/55",
                          "focus:border-primary",
                          emailError
                            ? "border-red-500"
                            : "border-border-subtle",
                          isRtl ? "text-right" : "",
                        ].join(" ")}
                      />

                      {emailError && (
                        <p
                          id="trial-email-error"
                          role="alert"
                          className={[
                            "mt-2 text-xs text-red-500",
                            isRtl ? "text-right" : "",
                          ].join(" ")}
                        >
                          {emailError}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isGenerating}
                      className="mt-6 flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-sm font-semibold text-on-primary shadow-[0_0_34px_rgba(99,102,241,0.3)] disabled:cursor-wait disabled:opacity-70"
                    >
                      {isGenerating ? (
                        <>
                          <motion.span
                            className="size-4 rounded-full border-2 border-on-primary/30 border-t-on-primary"
                            animate={{
                              rotate: 360,
                            }}
                            transition={{
                              duration: 0.7,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />

                          Generating secure access...
                        </>
                      ) : (
                        <>
                          <Sparkles className="size-4" />
                          Generate Instant Access
                        </>
                      )}
                    </button>

                    <p className="mt-3 text-center font-mono text-[9px] uppercase tracking-widest text-on-surface-variant">
                      Interactive portfolio demonstration • No
                      payment
                    </p>
                  </motion.form>
                ) : (
                  <motion.div
                    key="trial-success"
                    initial={{
                      opacity: 0,
                      x: isRtl ? -12 : 12,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    className="mt-8"
                  >
                    <div className="mx-auto grid size-20 place-items-center rounded-full border border-tertiary/25 bg-tertiary/10 text-tertiary shadow-[0_0_40px_rgba(78,222,163,0.18)]">
                      <ShieldCheck className="size-9" />
                    </div>

                    <p className="mt-5 text-center text-sm text-on-surface-variant">
                      Demo access generated for
                    </p>

                    <p className="mt-1 break-all text-center font-semibold text-on-surface">
                      {email.trim()}
                    </p>

                    <div className="mt-6 rounded-2xl border border-border-subtle bg-surface-container/70 p-4">
                      <p className="text-center font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-on-surface-variant">
                        Simulated License Key
                      </p>

                      <div
                        className={[
                          "mt-3 flex items-center gap-2",
                          isRtl ? "flex-row-reverse" : "",
                        ].join(" ")}
                      >
                        <code
                          dir="ltr"
                          className="min-w-0 flex-1 truncate rounded-xl bg-surface-low px-4 py-3 text-center font-mono text-sm font-bold tracking-[0.08em] text-primary"
                        >
                          {licenseKey}
                        </code>

                        <button
                          type="button"
                          onClick={handleCopy}
                          aria-label="Copy license key"
                          className="grid size-11 shrink-0 place-items-center rounded-xl border border-border-subtle bg-surface-high text-on-surface transition-colors hover:border-primary/30"
                        >
                          {copied ? (
                            <Check className="size-4 text-tertiary" />
                          ) : (
                            <Clipboard className="size-4" />
                          )}
                        </button>
                      </div>

                      <AnimatePresence>
                        {copied && (
                          <motion.p
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
                            }}
                            className="mt-2 text-center text-xs text-tertiary"
                          >
                            License key copied
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    <button
                      type="button"
                      onClick={handleDownload}
                      disabled={!licenseKey}
                      className="mt-5 flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-sm font-semibold text-on-primary shadow-[0_0_34px_rgba(99,102,241,0.3)] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Download className="size-4" />
                      Download Demo Access File
                    </button>

                    <button
                      type="button"
                      onClick={closeModal}
                      className="mt-3 flex min-h-12 w-full items-center justify-center rounded-2xl border border-border-subtle bg-surface-high px-6 text-sm font-semibold text-on-surface transition-colors hover:border-primary/30"
                    >
                      Continue exploring
                    </button>

                    <p className="mt-4 text-center text-[11px] leading-5 text-on-surface-variant">
                      This generates a text-based demo access file
                      only. It does not download executable
                      software.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}