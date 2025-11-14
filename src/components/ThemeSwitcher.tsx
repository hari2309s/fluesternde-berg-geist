import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  Monitor,
  Mountain,
  Trees,
  type LucideIcon,
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import type { Theme } from "@/types";

interface ThemeSwitcherProps {
  className?: string;
  variant?: "default" | "compact" | "dropdown" | "grid";
  showLabels?: boolean;
  iconSize?: number;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  className = "",
  variant = "default",
  showLabels = true,
  iconSize = 18,
}) => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes: { value: Theme; label: string; Icon: LucideIcon }[] = [
    { value: "light", label: "Light", Icon: Sun },
    { value: "dark", label: "Dark", Icon: Moon },
    { value: "magical-berg", label: "Magical Berg", Icon: Mountain },
    { value: "schwartz-wald", label: "Schwartz Wald", Icon: Trees },
    { value: "system", label: "System", Icon: Monitor },
  ];

  if (variant === "compact") {
    const currentIndex = themes.findIndex((t) => t.value === theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    const CurrentIcon = themes[currentIndex].Icon;

    return (
      <motion.button
        onClick={() => setTheme(nextTheme.value)}
        className={`relative p-3 rounded-lg bg-gray-200 dark:bg-gray-800 magical-berg:bg-[var(--theme-card)] schwartz-wald:bg-[var(--theme-card)] hover:bg-gray-300 dark:hover:bg-gray-700 magical-berg:hover:bg-opacity-80 schwartz-wald:hover:bg-opacity-80 transition-colors ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Switch to ${nextTheme.label} theme`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 180, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CurrentIcon
              size={24}
              className="text-gray-900 dark:text-gray-100 magical-berg:text-[var(--theme-foreground)] schwartz-wald:text-[var(--theme-foreground)]"
            />
          </motion.div>
        </AnimatePresence>
      </motion.button>
    );
  }

  if (variant === "dropdown") {
    const currentTheme = themes.find((t) => t.value === theme);
    const CurrentIcon = currentTheme?.Icon || Monitor;

    return (
      <div className={`relative inline-block ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 magical-berg:bg-[var(--theme-card)] schwartz-wald:bg-[var(--theme-card)] text-gray-900 dark:text-gray-100 magical-berg:text-[var(--theme-foreground)] schwartz-wald:text-[var(--theme-foreground)] hover:bg-gray-300 dark:hover:bg-gray-700 magical-berg:hover:bg-opacity-80 schwartz-wald:hover:bg-opacity-80 transition-colors"
          aria-label="Select theme"
          aria-expanded={isOpen}
        >
          <CurrentIcon size={iconSize} />
          {showLabels && <span>{currentTheme?.label}</span>}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-gray-800 magical-berg:bg-[var(--theme-card)] schwartz-wald:bg-[var(--theme-card)] shadow-lg border border-gray-200 dark:border-gray-700 magical-berg:border-[var(--theme-border)] schwartz-wald:border-[var(--theme-border)] overflow-hidden z-50"
            >
              {themes.map((t) => {
                const ThemeIcon = t.Icon;
                return (
                  <button
                    key={t.value}
                    onClick={() => {
                      setTheme(t.value);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      theme === t.value
                        ? "bg-gray-100 dark:bg-gray-700 magical-berg:bg-[var(--theme-muted)] schwartz-wald:bg-[var(--theme-muted)] text-gray-900 dark:text-gray-100 magical-berg:text-[var(--theme-foreground)] schwartz-wald:text-[var(--theme-foreground)]"
                        : "hover:bg-gray-50 dark:hover:bg-gray-750 magical-berg:hover:bg-opacity-50 schwartz-wald:hover:bg-opacity-50 text-gray-700 dark:text-gray-300 magical-berg:text-[var(--theme-foreground)] schwartz-wald:text-[var(--theme-foreground)]"
                    }`}
                  >
                    <ThemeIcon size={iconSize} />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  if (variant === "grid") {
    return (
      <div
        className={`grid grid-cols-2 gap-2 p-2 rounded-lg bg-gray-200 dark:bg-gray-800 magical-berg:bg-[var(--theme-card)] schwartz-wald:bg-[var(--theme-card)] ${className}`}
      >
        {themes.map((t) => {
          const ThemeIcon = t.Icon;
          return (
            <motion.button
              key={t.value}
              onClick={() => setTheme(t.value)}
              className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                theme === t.value
                  ? "text-gray-900 dark:text-gray-100 magical-berg:text-[var(--theme-foreground)] schwartz-wald:text-[var(--theme-foreground)]"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 magical-berg:text-[var(--theme-muted)] magical-berg:hover:text-[var(--theme-foreground)] schwartz-wald:text-[var(--theme-muted)] schwartz-wald:hover:text-[var(--theme-foreground)]"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Set ${t.label} theme`}
              aria-pressed={theme === t.value}
            >
              {theme === t.value && (
                <motion.div
                  layoutId="activeThemeGrid"
                  className="absolute inset-0 bg-white dark:bg-gray-700 magical-berg:bg-[var(--theme-primary)] magical-berg:bg-opacity-20 schwartz-wald:bg-[var(--theme-primary)] schwartz-wald:bg-opacity-20 rounded-md"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex flex-col items-center gap-1">
                <ThemeIcon size={iconSize} />
                {showLabels && <span className="text-xs">{t.label}</span>}
              </span>
            </motion.button>
          );
        })}
      </div>
    );
  }

  // Default variant - horizontal tabs
  return (
    <div
      className={`inline-flex gap-2 p-1 rounded-lg bg-gray-200 dark:bg-gray-800 magical-berg:bg-[var(--theme-card)] schwartz-wald:bg-[var(--theme-card)] ${className}`}
    >
      {themes.map((t) => {
        const ThemeIcon = t.Icon;
        return (
          <motion.button
            key={t.value}
            onClick={() => setTheme(t.value)}
            className={`relative px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              theme === t.value
                ? "text-gray-900 dark:text-gray-100 magical-berg:text-[var(--theme-foreground)] schwartz-wald:text-[var(--theme-foreground)]"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 magical-berg:text-[var(--theme-muted)] magical-berg:hover:text-[var(--theme-foreground)] schwartz-wald:text-[var(--theme-muted)] schwartz-wald:hover:text-[var(--theme-foreground)]"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Set ${t.label} theme`}
            aria-pressed={theme === t.value}
          >
            {theme === t.value && (
              <motion.div
                layoutId="activeTheme"
                className="absolute inset-0 bg-white dark:bg-gray-700 magical-berg:bg-[var(--theme-primary)] magical-berg:bg-opacity-20 schwartz-wald:bg-[var(--theme-primary)] schwartz-wald:bg-opacity-20 rounded-md"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <ThemeIcon size={iconSize} />
              {showLabels && <span>{t.label}</span>}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
};
