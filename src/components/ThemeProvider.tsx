import React, { createContext, useEffect, useState } from "react";
import type { Theme, ThemeConfig, ThemeContextType } from "@/types";
import { magicalBergTheme, schwartzWaldTheme } from "@/themes";

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

interface ThemeProviderProps {
  children: React.ReactNode;
  config?: ThemeConfig;
}

const defaultConfig: Required<ThemeConfig> = {
  defaultTheme: "system",
  storageKey: "fluesternde-berg-geist-theme",
  enableTransitions: true,
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  config,
}) => {
  const finalConfig = { ...defaultConfig, ...config };

  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return finalConfig.defaultTheme;

    const stored = localStorage.getItem(finalConfig.storageKey);
    return (stored as Theme) || finalConfig.defaultTheme;
  });

  const [effectiveTheme, setEffectiveTheme] = useState<
    "light" | "dark" | "magical-berg" | "schwartz-wald"
  >("light");

  const getSystemTheme = (): "light" | "dark" => {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const applyThemeColors = (themeName: "magical-berg" | "schwartz-wald") => {
    const root = document.documentElement;
    const colors =
      themeName === "magical-berg" ? magicalBergTheme : schwartzWaldTheme;

    root.style.setProperty("--theme-background", colors.background);
    root.style.setProperty("--theme-foreground", colors.foreground);
    root.style.setProperty("--theme-primary", colors.primary);
    root.style.setProperty("--theme-secondary", colors.secondary);
    root.style.setProperty("--theme-accent", colors.accent);
    root.style.setProperty("--theme-muted", colors.muted);
    root.style.setProperty("--theme-border", colors.border);
    root.style.setProperty("--theme-card", colors.card);
  };

  const removeThemeColors = () => {
    const root = document.documentElement;
    root.style.removeProperty("--theme-background");
    root.style.removeProperty("--theme-foreground");
    root.style.removeProperty("--theme-primary");
    root.style.removeProperty("--theme-secondary");
    root.style.removeProperty("--theme-accent");
    root.style.removeProperty("--theme-muted");
    root.style.removeProperty("--theme-border");
    root.style.removeProperty("--theme-card");
  };

  useEffect(() => {
    const root = document.documentElement;

    // Disable transitions temporarily if configured
    if (finalConfig.enableTransitions) {
      root.classList.add("transitioning-theme");
    }

    let newEffectiveTheme: "light" | "dark" | "magical-berg" | "schwartz-wald";

    if (theme === "system") {
      newEffectiveTheme = getSystemTheme();
    } else {
      newEffectiveTheme = theme as
        | "light"
        | "dark"
        | "magical-berg"
        | "schwartz-wald";
    }

    setEffectiveTheme(newEffectiveTheme);

    // Remove all theme classes first
    root.classList.remove("dark", "magical-berg", "schwartz-wald");

    // Apply appropriate theme
    if (newEffectiveTheme === "dark") {
      root.classList.add("dark");
      removeThemeColors();
    } else if (newEffectiveTheme === "magical-berg") {
      root.classList.add("magical-berg");
      applyThemeColors("magical-berg");
    } else if (newEffectiveTheme === "schwartz-wald") {
      root.classList.add("schwartz-wald");
      applyThemeColors("schwartz-wald");
    } else {
      removeThemeColors();
    }

    // Re-enable transitions
    if (finalConfig.enableTransitions) {
      setTimeout(() => {
        root.classList.remove("transitioning-theme");
      }, 0);
    }
  }, [theme, finalConfig.enableTransitions]);

  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const systemTheme = getSystemTheme();
      setEffectiveTheme(systemTheme);
      const root = document.documentElement;
      root.classList.remove("dark", "magical-berg", "schwartz-wald");
      if (systemTheme === "dark") {
        root.classList.add("dark");
      }
      removeThemeColors();
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(finalConfig.storageKey, newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, effectiveTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
