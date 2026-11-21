"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  getHtmlLanguageCode,
  getLanguageDirection,
  getTranslation,
  isLanguage,
  type Language,
  type TextDirection,
  type TranslationDictionary,
} from "@/lib/translations";

export type Theme = "dark" | "light";

interface AppContextValue {
  language: Language;
  direction: TextDirection;
  setLanguage: (language: Language) => void;

  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;

  isTrialModalOpen: boolean;
  setIsTrialModalOpen: (isOpen: boolean) => void;
  openTrialModal: () => void;
  closeTrialModal: () => void;

  isHydrated: boolean;
  t: TranslationDictionary;
}

interface AppProviderProps {
  children: ReactNode;
}

const LANGUAGE_STORAGE_KEY = "sonicflow-language";
const THEME_STORAGE_KEY = "sonicflow-theme";

const DEFAULT_LANGUAGE: Language = "en";
const DEFAULT_THEME: Theme = "dark";

const AppContext = createContext<AppContextValue | undefined>(
  undefined,
);

function isTheme(value: unknown): value is Theme {
  return value === "dark" || value === "light";
}

function safelyReadStorage(
  key: string,
): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safelyWriteStorage(
  key: string,
  value: string,
): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /*
     * Storage can be unavailable in private browsing,
     * restricted embedded views, or hardened environments.
     * The in-memory application state continues to work.
     */
  }
}

function applyThemeToDocument(theme: Theme): void {
  const root = document.documentElement;
  const isDark = theme === "dark";

  root.classList.toggle("dark", isDark);
  root.classList.toggle("light", !isDark);

  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}

function applyLanguageToDocument(
  language: Language,
): void {
  const root = document.documentElement;
  const direction = getLanguageDirection(language);
  const htmlLanguage = getHtmlLanguageCode(language);
  const isArabic = language === "ar";

  root.lang = htmlLanguage;
  root.dir = direction;

  root.dataset.language = language;
  root.dataset.direction = direction;

  /*
   * These classes give the document a stable hook for
   * language-specific global styling.
   *
   * globals.css already applies the Arabic font through:
   * html[dir="rtl"] body { font-family: ... }
   */
  root.classList.toggle("language-ar", isArabic);
  root.classList.toggle("font-arabic", isArabic);

  root.classList.toggle(
    "language-ltr",
    direction === "ltr",
  );

  root.classList.toggle(
    "language-rtl",
    direction === "rtl",
  );
}

export function AppProvider({
  children,
}: AppProviderProps) {
  /*
   * Stable server and first-client-render defaults are essential.
   *
   * Reading localStorage inside useState would produce different
   * server and client markup and could trigger a hydration mismatch.
   * Preferences are restored after hydration inside useEffect.
   */
  const [language, setLanguageState] =
    useState<Language>(DEFAULT_LANGUAGE);

  const [theme, setThemeState] =
    useState<Theme>(DEFAULT_THEME);

  const [isTrialModalOpen, setIsTrialModalOpen] =
    useState(false);

  const [isHydrated, setIsHydrated] = useState(false);

  /*
   * Restore persisted preferences only after the component mounts.
   * The server and initial client render therefore remain identical.
   */
  useEffect(() => {
    const persistedLanguage = safelyReadStorage(
      LANGUAGE_STORAGE_KEY,
    );

    const persistedTheme = safelyReadStorage(
      THEME_STORAGE_KEY,
    );

    const nextLanguage = isLanguage(persistedLanguage)
      ? persistedLanguage
      : DEFAULT_LANGUAGE;

    const nextTheme = isTheme(persistedTheme)
      ? persistedTheme
      : DEFAULT_THEME;

    /*
     * Apply document attributes before updating React state.
     * This keeps direction, typography, and theme synchronized
     * during the first post-hydration update.
     */
    applyLanguageToDocument(nextLanguage);
    applyThemeToDocument(nextTheme);

    setLanguageState(nextLanguage);
    setThemeState(nextTheme);
    setIsHydrated(true);
  }, []);

  /*
   * Keep the root element synchronized whenever the language changes.
   * Persistence only begins after hydration so defaults are not written
   * over existing preferences before they have been restored.
   */
  useEffect(() => {
    applyLanguageToDocument(language);

    if (!isHydrated) {
      return;
    }

    safelyWriteStorage(
      LANGUAGE_STORAGE_KEY,
      language,
    );
  }, [language, isHydrated]);

  /*
   * Keep the dark class and browser color scheme synchronized.
   */
  useEffect(() => {
    applyThemeToDocument(theme);

    if (!isHydrated) {
      return;
    }

    safelyWriteStorage(
      THEME_STORAGE_KEY,
      theme,
    );
  }, [theme, isHydrated]);

  const setLanguage = useCallback(
    (nextLanguage: Language) => {
      setLanguageState(nextLanguage);
    },
    [],
  );

  const setTheme = useCallback(
    (nextTheme: Theme) => {
      setThemeState(nextTheme);
    },
    [],
  );

  const toggleTheme = useCallback(() => {
    setThemeState((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark",
    );
  }, []);

  const openTrialModal = useCallback(() => {
    setIsTrialModalOpen(true);
  }, []);

  const closeTrialModal = useCallback(() => {
    setIsTrialModalOpen(false);
  }, []);

  const direction = useMemo<TextDirection>(
    () => getLanguageDirection(language),
    [language],
  );

  const t = useMemo<TranslationDictionary>(
    () => getTranslation(language),
    [language],
  );

  const contextValue = useMemo<AppContextValue>(
    () => ({
      language,
      direction,
      setLanguage,

      theme,
      setTheme,
      toggleTheme,

      isTrialModalOpen,
      setIsTrialModalOpen,
      openTrialModal,
      closeTrialModal,

      isHydrated,
      t,
    }),
    [
      language,
      direction,
      setLanguage,
      theme,
      setTheme,
      toggleTheme,
      isTrialModalOpen,
      openTrialModal,
      closeTrialModal,
      isHydrated,
      t,
    ],
  );

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextValue {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error(
      "useApp must be used inside an AppProvider.",
    );
  }

  return context;
}