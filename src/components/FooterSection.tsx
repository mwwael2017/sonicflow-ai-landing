"use client";

import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  AtSign,
  AudioWaveform,
  Check,
  Code2,
  Languages,
  Mail,
  MessageCircle,
  Moon,
  Play,
  Send,
  ShieldCheck,
  Sparkles,
  Sun,
  type LucideIcon,
} from "lucide-react";

import { useApp } from "@/context/AppContext";
import type { Language } from "@/lib/translations";

type SubscriptionState =
  | "idle"
  | "submitting"
  | "success";

interface FooterMessages {
  emailError: string;
  subscribing: string;
  privacyNote: string;
  themeToggleLight: string;
  themeToggleDark: string;
  newsletterAriaLabel: string;
  emailAriaLabel: string;
  subscribeAriaLabel: string;
  socialLinksLabel: string;
  backToTopLabel: string;
  legalLinksLabel: string;
}

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  name: string;
  href: string;
  icon: LucideIcon;
  hoverClassName: string;
}

const footerMessages: Record<Language, FooterMessages> = {
  en: {
    emailError: "Enter a valid email address.",
    subscribing: "Subscribing...",
    privacyNote:
      "Encrypted • Zero spam • Unsubscribe anytime",
    themeToggleLight: "Switch to light mode",
    themeToggleDark: "Switch to dark mode",
    newsletterAriaLabel:
      "SonicFlow intelligence feed",
    emailAriaLabel: "Email address",
    subscribeAriaLabel:
      "Subscribe to the intelligence feed",
    socialLinksLabel: "SonicFlow social channels",
    backToTopLabel: "Back to the top of the page",
    legalLinksLabel: "Legal links",
  },

  ar: {
    emailError: "أدخل عنوان بريد إلكتروني صحيحًا.",
    subscribing: "جارٍ الاشتراك...",
    privacyNote:
      "تشفير كامل • دون رسائل مزعجة • إلغاء الاشتراك في أي وقت",
    themeToggleLight: "التبديل إلى الوضع الفاتح",
    themeToggleDark: "التبديل إلى الوضع الداكن",
    newsletterAriaLabel: "النشرة الذكية من SonicFlow",
    emailAriaLabel: "عنوان البريد الإلكتروني",
    subscribeAriaLabel: "الاشتراك في النشرة الذكية",
    socialLinksLabel: "حسابات SonicFlow الاجتماعية",
    backToTopLabel: "العودة إلى أعلى الصفحة",
    legalLinksLabel: "الروابط القانونية",
  },

  fr: {
    emailError:
      "Saisissez une adresse électronique valide.",
    subscribing: "Inscription en cours...",
    privacyNote:
      "Chiffré • Aucun courrier indésirable • Désabonnement à tout moment",
    themeToggleLight: "Passer au thème clair",
    themeToggleDark: "Passer au thème sombre",
    newsletterAriaLabel:
      "Fil d’intelligence SonicFlow",
    emailAriaLabel: "Adresse électronique",
    subscribeAriaLabel:
      "S’abonner au fil d’intelligence",
    socialLinksLabel: "Réseaux sociaux de SonicFlow",
    backToTopLabel: "Revenir en haut de la page",
    legalLinksLabel: "Liens juridiques",
  },

  du: {
    emailError: "Voer een geldig e-mailadres in.",
    subscribing: "Bezig met abonneren...",
    privacyNote:
      "Versleuteld • Geen spam • Altijd uitschrijven",
    themeToggleLight:
      "Overschakelen naar lichte modus",
    themeToggleDark:
      "Overschakelen naar donkere modus",
    newsletterAriaLabel:
      "SonicFlow intelligentienieuws",
    emailAriaLabel: "E-mailadres",
    subscribeAriaLabel:
      "Abonneren op het intelligentienieuws",
    socialLinksLabel:
      "Sociale kanalen van SonicFlow",
    backToTopLabel: "Terug naar boven",
    legalLinksLabel: "Juridische koppelingen",
  },

  it: {
    emailError:
      "Inserisci un indirizzo di posta elettronica valido.",
    subscribing: "Iscrizione in corso...",
    privacyNote:
      "Crittografato • Niente posta indesiderata • Disiscrizione immediata",
    themeToggleLight: "Passa al tema chiaro",
    themeToggleDark: "Passa al tema scuro",
    newsletterAriaLabel:
      "Notiziario intelligente SonicFlow",
    emailAriaLabel:
      "Indirizzo di posta elettronica",
    subscribeAriaLabel:
      "Iscriviti al notiziario intelligente",
    socialLinksLabel: "Canali social di SonicFlow",
    backToTopLabel:
      "Torna all’inizio della pagina",
    legalLinksLabel: "Collegamenti legali",
  },
};

const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    href: "https://github.com",
    icon: Code2,
    hoverClassName:
      "hover:border-on-surface/25 hover:bg-on-surface hover:text-surface-lowest hover:shadow-[0_0_24px_rgba(148,163,184,0.22)]",
  },
  {
    name: "Twitter / X",
    href: "https://x.com",
    icon: AtSign,
    hoverClassName:
      "hover:border-secondary/35 hover:bg-secondary hover:text-[#0a0e17] hover:shadow-[0_0_24px_rgba(76,215,246,0.28)]",
  },
  {
    name: "Discord",
    href: "https://discord.com",
    icon: MessageCircle,
    hoverClassName:
      "hover:border-primary/35 hover:bg-primary hover:text-[#0a0e17] hover:shadow-[0_0_24px_rgba(128,131,255,0.28)]",
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: Play,
    hoverClassName:
      "hover:border-red-500/35 hover:bg-red-500 hover:text-white hover:shadow-[0_0_24px_rgba(239,68,68,0.28)]",
  },
];

export default function FooterSection() {
  const {
    t,
    language,
    theme,
    toggleTheme,
    setIsTrialModalOpen,
  } = useApp();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [subscriptionState, setSubscriptionState] =
    useState<SubscriptionState>("idle");

  const isRtl = language === "ar";
  const messages = footerMessages[language];

  const handleNewsletterSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (subscriptionState === "submitting") {
      return;
    }

    const normalizedEmail = email.trim();

    const isValidEmail =
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(
        normalizedEmail,
      );

    if (!isValidEmail) {
      setEmailError(messages.emailError);
      return;
    }

    setEmailError("");
    setSubscriptionState("submitting");

    window.setTimeout(() => {
      setSubscriptionState("success");
    }, 700);
  };

  const handleEmailChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setEmail(event.target.value);

    if (emailError) {
      setEmailError("");
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const themeToggleLabel =
    theme === "dark"
      ? messages.themeToggleLight
      : messages.themeToggleDark;

  return (
    <footer
      className={[
        "relative z-10",
        "border-t border-(--surface-high)/60",
        "bg-(--surface-lowest)",
        "text-on-surface",
      ].join(" ")}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/35 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 pb-8 pt-20 lg:px-12">
        <PreFooterCallout
          badge={t.ctaBanner.badge}
          title={t.ctaBanner.title}
          subtitle={t.ctaBanner.subtitle}
          button={t.ctaBanner.button}
          isRtl={isRtl}
          onOpenTrial={() =>
            setIsTrialModalOpen(true)
          }
        />

        <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 xl:gap-10">
          <BrandColumn
            description={t.footer.description}
            operationalStatus={
              t.footer.statusOperational
            }
            isRtl={isRtl}
            backToTopLabel={messages.backToTopLabel}
            socialLinksLabel={
              messages.socialLinksLabel
            }
            onBackToTop={handleBackToTop}
          />

          <div className="md:col-span-2 lg:col-span-5">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6 lg:gap-5 xl:gap-8">
              <FooterLinksColumn
                title={t.footer.productTitle}
                links={t.footer.productLinks}
                isRtl={isRtl}
              />

              <FooterLinksColumn
                title={t.footer.solutionsTitle}
                links={t.footer.solutionsLinks}
                isRtl={isRtl}
              />

              <FooterLinksColumn
                title={t.footer.resourcesTitle}
                links={t.footer.resourcesLinks}
                isRtl={isRtl}
              />
            </div>
          </div>

          <NewsletterColumn
            title={t.footer.newsletterTitle}
            subtitle={t.footer.newsletterSubtitle}
            emailPlaceholder={
              t.footer.emailPlaceholder
            }
            subscribeButton={t.footer.subscribeBtn}
            successMessage={
              t.footer.subscribedSuccess
            }
            privacyNote={messages.privacyNote}
            subscribingMessage={messages.subscribing}
            newsletterAriaLabel={
              messages.newsletterAriaLabel
            }
            emailAriaLabel={messages.emailAriaLabel}
            subscribeAriaLabel={
              messages.subscribeAriaLabel
            }
            email={email}
            emailError={emailError}
            subscriptionState={subscriptionState}
            isRtl={isRtl}
            onEmailChange={handleEmailChange}
            onSubmit={handleNewsletterSubmit}
          />
        </div>

        <div
          className={[
            "flex flex-col gap-5",
            "border-t border-(--surface-high)/40 pt-7",
            "md:flex-row md:items-center md:justify-between",
            isRtl ? "text-right" : "",
          ].join(" ")}
        >
          <p className="text-xs leading-6 text-on-surface-variant">
            {t.footer.copyright}
          </p>

          <div
            className={[
              "flex flex-col gap-4",
              "sm:flex-row sm:items-center",
              isRtl ? "sm:flex-row-reverse" : "",
            ].join(" ")}
          >
            <nav
              aria-label={messages.legalLinksLabel}
            >
              <ul
                className={[
                  "flex flex-wrap items-center gap-x-5 gap-y-2",
                  isRtl ? "flex-row-reverse" : "",
                ].join(" ")}
              >
                <li>
                  <LegalLink
                    href="#privacy"
                    label={t.footer.privacy}
                  />
                </li>

                <li>
                  <LegalLink
                    href="#terms"
                    label={t.footer.terms}
                  />
                </li>

                <li>
                  <LegalLink
                    href="#security"
                    label={t.footer.security}
                  />
                </li>
              </ul>
            </nav>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={themeToggleLabel}
              title={themeToggleLabel}
              className={[
                "group inline-flex min-h-10 items-center",
                "justify-center gap-2.5 self-start",
                "whitespace-nowrap rounded-full",
                "border border-border-subtle",
                "bg-surface-container/80 px-4",
                "text-on-surface-variant",
                "shadow-sm backdrop-blur-xl",
                "transition-all duration-200",
                "hover:border-primary/30",
                "hover:bg-surface-high",
                "hover:text-on-surface",
                "sm:self-auto",
                isRtl ? "flex-row-reverse" : "",
              ].join(" ")}
            >
              <span className="grid size-6 place-items-center rounded-full bg-primary/12 text-primary transition-transform group-hover:rotate-12">
                {theme === "dark" ? (
                  <Moon className="size-3.5" />
                ) : (
                  <Sun className="size-3.5" />
                )}
              </span>

              <Languages className="size-3.5 text-secondary" />

              <span
                dir="ltr"
                className="font-mono text-[10px] font-semibold"
              >
                {language.toUpperCase()} •{" "}
                {theme.toUpperCase()}
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

interface PreFooterCalloutProps {
  badge: string;
  title: string;
  subtitle: string;
  button: string;
  isRtl: boolean;
  onOpenTrial: () => void;
}

function PreFooterCallout({
  badge,
  title,
  subtitle,
  button,
  isRtl,
  onOpenTrial,
}: PreFooterCalloutProps) {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 28,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.3,
      }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={[
        "relative isolate overflow-hidden",
        "rounded-[2.25rem] border border-primary/25",
        "bg-linear-to-br",
        "from-primary/16 via-surface-container to-secondary/12",
        "px-6 py-10",
        "shadow-[0_28px_90px_rgba(0,0,0,0.16)]",
        "sm:px-10 sm:py-12 lg:px-14 lg:py-14",
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -end-24 -top-28 -z-10 size-96 rounded-full bg-secondary/18 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -start-20 -z-10 size-96 rounded-full bg-primary/18 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-linear-to-r from-transparent via-white/35 to-transparent"
      />

      <div
        className={[
          "relative flex flex-col gap-8",
          "lg:flex-row lg:items-center lg:justify-between",
          isRtl
            ? "text-right lg:flex-row-reverse"
            : "",
        ].join(" ")}
      >
        <div className="max-w-3xl">
          <div
            className={[
              "mb-5 inline-flex items-center gap-2",
              "rounded-full border border-tertiary/25",
              "bg-tertiary/10 px-3 py-2",
              isRtl ? "flex-row-reverse" : "",
            ].join(" ")}
          >
            <Sparkles className="size-3.5 shrink-0 text-tertiary" />

            <span className="text-xs font-semibold text-tertiary">
              {badge}
            </span>
          </div>

          <h2 className="font-display text-3xl font-semibold leading-tight tracking-[-0.04em] text-on-surface sm:text-4xl lg:text-5xl">
            {title}
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-8 text-on-surface-variant">
            {subtitle}
          </p>
        </div>

        <motion.button
          type="button"
          whileHover={{
            y: -3,
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.97,
          }}
          onClick={onOpenTrial}
          className={[
            "inline-flex min-h-14 shrink-0",
            "items-center justify-center gap-2.5",
            "self-start whitespace-nowrap",
            "rounded-2xl bg-primary px-7",
            "text-sm font-semibold text-[#0a0e17]",
            "shadow-[0_0_38px_rgba(99,102,241,0.3)]",
            "lg:self-auto",
            isRtl ? "flex-row-reverse" : "",
          ].join(" ")}
        >
          <Sparkles className="size-4" />

          <span>{button}</span>

          <ArrowUpRight
            className={[
              "size-4",
              isRtl ? "-scale-x-100" : "",
            ].join(" ")}
          />
        </motion.button>
      </div>
    </motion.section>
  );
}

interface BrandColumnProps {
  description: string;
  operationalStatus: string;
  isRtl: boolean;
  backToTopLabel: string;
  socialLinksLabel: string;
  onBackToTop: () => void;
}

function BrandColumn({
  description,
  operationalStatus,
  isRtl,
  backToTopLabel,
  socialLinksLabel,
  onBackToTop,
}: BrandColumnProps) {
  return (
    <div
      className={[
        "md:col-span-2 lg:col-span-4",
        isRtl ? "text-right" : "",
      ].join(" ")}
    >
      <button
        type="button"
        onClick={onBackToTop}
        aria-label={backToTopLabel}
        className={[
          "group inline-flex items-center gap-3",
          isRtl ? "flex-row-reverse" : "",
        ].join(" ")}
      >
        <motion.span
          whileHover={{
            rotate: -8,
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          className={[
            "grid size-11 shrink-0 place-items-center",
            "rounded-2xl bg-linear-to-br",
            "from-primary via-primary-container to-secondary",
            "text-[#0a0e17]",
            "shadow-[0_0_28px_rgba(99,102,241,0.28)]",
          ].join(" ")}
        >
          <AudioWaveform className="size-5" />
        </motion.span>

        <span
          dir="ltr"
          className="whitespace-nowrap font-display text-xl font-semibold tracking-[-0.03em] text-on-surface"
        >
          SonicFlow
          <span className="text-primary">.AI</span>
        </span>
      </button>

      <p className="mt-5 max-w-md text-sm leading-7 text-on-surface-variant">
        {description}
      </p>

      <div className="mt-6">
        <div
          className={[
            "inline-flex max-w-full items-center gap-3",
            "whitespace-nowrap rounded-full",
            "border border-tertiary/20",
            "bg-tertiary/8 px-4 py-2.5",
            "shadow-[0_0_24px_rgba(78,222,163,0.06)]",
            isRtl ? "flex-row-reverse" : "",
          ].join(" ")}
        >
          <span className="relative flex size-2.5 shrink-0">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-tertiary opacity-55" />

            <span className="relative inline-flex size-2.5 rounded-full bg-tertiary shadow-[0_0_10px_var(--tertiary)]" />
          </span>

          <span className="overflow-hidden text-ellipsis text-xs font-semibold text-tertiary">
            {operationalStatus}
          </span>
        </div>
      </div>

      <nav
        aria-label={socialLinksLabel}
        className="mt-6"
      >
        <ul
          className={[
            "flex items-center gap-3",
            isRtl
              ? "flex-row-reverse justify-end"
              : "",
          ].join(" ")}
        >
          {socialLinks.map((socialLink) => {
            const Icon = socialLink.icon;

            return (
              <li key={socialLink.name}>
                <a
                  href={socialLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={socialLink.name}
                  title={socialLink.name}
                  className={[
                    "grid size-10 place-items-center",
                    "rounded-full border border-border-subtle",
                    "bg-surface-container/75",
                    "text-on-surface-variant",
                    "shadow-sm backdrop-blur-xl",
                    "transition-all duration-200",
                    "hover:-translate-y-1",
                    socialLink.hoverClassName,
                  ].join(" ")}
                >
                  <Icon className="size-4.5" />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

interface FooterLinksColumnProps {
  title: string;
  links: FooterLink[];
  isRtl: boolean;
}

function FooterLinksColumn({
  title,
  links,
  isRtl,
}: FooterLinksColumnProps) {
  const handleLinkClick = (
    event: ReactMouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href.startsWith("#")) {
      return;
    }

    const target =
      document.querySelector<HTMLElement>(href);

    if (!target) {
      event.preventDefault();
      return;
    }

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <nav
      aria-label={title}
      className={[
        "min-w-0",
        isRtl ? "text-right" : "",
      ].join(" ")}
    >
      <h3 className="whitespace-nowrap text-xs font-bold text-on-surface">
        {title}
      </h3>

      <ul className="mt-5 space-y-3.5">
        {links.map((link) => (
          <li
            key={`${title}-${link.label}`}
            className="min-w-0"
          >
            <a
              href={link.href}
              onClick={(event) =>
                handleLinkClick(event, link.href)
              }
              className={[
                "group inline-flex max-w-full",
                "items-center gap-1.5",
                "whitespace-nowrap text-sm",
                "text-on-surface-variant",
                "transition-colors",
                "hover:text-primary",
                isRtl ? "flex-row-reverse" : "",
              ].join(" ")}
            >
              <span>{link.label}</span>

              <ArrowUpRight
                aria-hidden="true"
                className={[
                  "size-3 shrink-0 opacity-0",
                  "transition-all duration-200",
                  "group-hover:translate-x-0.5",
                  "group-hover:opacity-100",
                  isRtl
                    ? "-scale-x-100 group-hover:-translate-x-0.5"
                    : "",
                ].join(" ")}
              />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

interface NewsletterColumnProps {
  title: string;
  subtitle: string;
  emailPlaceholder: string;
  subscribeButton: string;
  successMessage: string;
  privacyNote: string;
  subscribingMessage: string;
  newsletterAriaLabel: string;
  emailAriaLabel: string;
  subscribeAriaLabel: string;
  email: string;
  emailError: string;
  subscriptionState: SubscriptionState;
  isRtl: boolean;
  onEmailChange: (
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
  onSubmit: (
    event: FormEvent<HTMLFormElement>,
  ) => void;
}

function NewsletterColumn({
  title,
  subtitle,
  emailPlaceholder,
  subscribeButton,
  successMessage,
  privacyNote,
  subscribingMessage,
  newsletterAriaLabel,
  emailAriaLabel,
  subscribeAriaLabel,
  email,
  emailError,
  subscriptionState,
  isRtl,
  onEmailChange,
  onSubmit,
}: NewsletterColumnProps) {
  return (
    <div
      className={[
        "md:col-span-2 lg:col-span-3",
        isRtl ? "text-right" : "",
      ].join(" ")}
    >
      <div
        className={[
          "flex items-center gap-2.5",
          isRtl ? "flex-row-reverse" : "",
        ].join(" ")}
      >
        <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
          <Mail className="size-4" />
        </span>

        <h3 className="text-xs font-bold text-on-surface">
          {title}
        </h3>
      </div>

      <p className="mt-4 text-sm leading-6 text-on-surface-variant">
        {subtitle}
      </p>

      <AnimatePresence mode="wait">
        {subscriptionState === "success" ? (
          <motion.div
            key="newsletter-success"
            initial={{
              opacity: 0,
              scale: 0.96,
              y: 6,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
            }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 26,
            }}
            role="status"
            className={[
              "mt-5 flex min-h-13 items-center gap-3",
              "rounded-2xl border border-tertiary/25",
              "bg-tertiary/10 px-4",
              "text-sm font-semibold text-tertiary",
              isRtl ? "flex-row-reverse" : "",
            ].join(" ")}
          >
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-tertiary text-[#0a0e17]">
              <Check className="size-4" />
            </span>

            <span>{successMessage}</span>
          </motion.div>
        ) : (
          <motion.form
            key="newsletter-form"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onSubmit={onSubmit}
            noValidate
            aria-label={newsletterAriaLabel}
            className="mt-5"
          >
            <div className="flex items-stretch gap-2">
              <div className="relative min-w-0 flex-1">
                <Mail
                  aria-hidden="true"
                  className={[
                    "pointer-events-none absolute top-1/2",
                    "size-4 -translate-y-1/2",
                    "text-on-surface-variant",
                    isRtl ? "right-4" : "left-4",
                  ].join(" ")}
                />

                <input
                  type="email"
                  value={email}
                  onChange={onEmailChange}
                  placeholder={emailPlaceholder}
                  aria-label={emailAriaLabel}
                  aria-invalid={Boolean(emailError)}
                  aria-describedby={
                    emailError
                      ? "footer-email-error"
                      : "footer-email-privacy"
                  }
                  autoComplete="email"
                  disabled={
                    subscriptionState === "submitting"
                  }
                  className={[
                    "h-13 w-full rounded-2xl",
                    "border bg-surface-container/80",
                    "text-sm text-on-surface",
                    "outline-none transition-all",
                    "placeholder:text-on-surface-variant/55",
                    "focus:border-primary",
                    "disabled:cursor-wait",
                    "disabled:opacity-70",
                    emailError
                      ? "border-red-500"
                      : "border-border-subtle",
                    isRtl
                      ? "pr-11 pl-4 text-right"
                      : "pl-11 pr-4 text-left",
                  ].join(" ")}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={
                  subscriptionState === "submitting"
                    ? undefined
                    : {
                        scale: 1.03,
                      }
                }
                whileTap={
                  subscriptionState === "submitting"
                    ? undefined
                    : {
                        scale: 0.96,
                      }
                }
                disabled={
                  subscriptionState === "submitting"
                }
                aria-label={subscribeAriaLabel}
                title={subscribeButton}
                className={[
                  "grid size-13 shrink-0",
                  "place-items-center rounded-2xl",
                  "bg-secondary text-[#0a0e17]",
                  "shadow-[0_0_24px_rgba(76,215,246,0.2)]",
                  "transition-opacity",
                  "disabled:cursor-wait",
                  "disabled:opacity-65",
                ].join(" ")}
              >
                {subscriptionState === "submitting" ? (
                  <motion.span
                    className="size-4 rounded-full border-2 border-[#0a0e17]/25 border-t-[#0a0e17]"
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 0.7,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                ) : (
                  <Send
                    className={[
                      "size-4.5",
                      isRtl ? "-scale-x-100" : "",
                    ].join(" ")}
                  />
                )}
              </motion.button>
            </div>

            <AnimatePresence>
              {emailError && (
                <motion.p
                  id="footer-email-error"
                  role="alert"
                  initial={{
                    opacity: 0,
                    y: -4,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -4,
                  }}
                  className="mt-2 text-xs text-red-500"
                >
                  {emailError}
                </motion.p>
              )}
            </AnimatePresence>

            <div
              id="footer-email-privacy"
              className={[
                "mt-3 flex items-center gap-2",
                "text-on-surface-variant",
                isRtl ? "flex-row-reverse" : "",
              ].join(" ")}
            >
              <ShieldCheck className="size-3.5 shrink-0 text-tertiary" />

              <p className="text-[11px] leading-5">
                {subscriptionState === "submitting"
                  ? subscribingMessage
                  : privacyNote}
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

interface LegalLinkProps {
  href: string;
  label: string;
}

function LegalLink({
  href,
  label,
}: LegalLinkProps) {
  const handleClick = (
    event: ReactMouseEvent<HTMLAnchorElement>,
  ) => {
    const target =
      document.querySelector<HTMLElement>(href);

    if (!target) {
      event.preventDefault();
      return;
    }

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="whitespace-nowrap text-xs text-on-surface-variant transition-colors hover:text-on-surface"
    >
      {label}
    </a>
  );
}