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

    // Apply theme colors as CSS custom properties
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--theme-${key}`, value);
    });

    // Apply to Radix UI accent colors for better integration
    if (themeName === "magical-berg") {
      // Light blue theme colors for Magical Berg
      root.style.setProperty("--accent-1", "#f0f4f8");
      root.style.setProperty("--accent-2", "#e8f0f8");
      root.style.setProperty("--accent-3", "#d9e6f2");
      root.style.setProperty("--accent-4", "#c5d9ec");
      root.style.setProperty("--accent-5", "#b0cce5");
      root.style.setProperty("--accent-6", "#9abfde");
      root.style.setProperty("--accent-7", "#7ea8d1");
      root.style.setProperty("--accent-8", "#5a8fc4");
      root.style.setProperty("--accent-9", "#2b6cb0");
      root.style.setProperty("--accent-10", "#2660a0");
      root.style.setProperty("--accent-11", "#1a365d");
      root.style.setProperty("--accent-12", "#0f2540");
    } else if (themeName === "schwartz-wald") {
      // Dark green theme colors for Schwartz Wald
      root.style.setProperty("--accent-1", "#1a1f1a");
      root.style.setProperty("--accent-2", "#1f241f");
      root.style.setProperty("--accent-3", "#243324");
      root.style.setProperty("--accent-4", "#2d3d2d");
      root.style.setProperty("--accent-5", "#3d4a3d");
      root.style.setProperty("--accent-6", "#4a5d4a");
      root.style.setProperty("--accent-7", "#5d7a5d");
      root.style.setProperty("--accent-8", "#7a9c7a");
      root.style.setProperty("--accent-9", "#2d5016");
      root.style.setProperty("--accent-10", "#3d6a1f");
      root.style.setProperty("--accent-11", "#e8f5e9");
      root.style.setProperty("--accent-12", "#f5faf5");
    }
  };

  const removeThemeColors = () => {
    const root = document.documentElement;

    // Remove theme variables
    const themeProps = [
      "background",
      "foreground",
      "primary",
      "secondary",
      "accent",
      "muted",
      "border",
      "card",
    ];
    themeProps.forEach((prop) => root.style.removeProperty(`--theme-${prop}`));

    // Reset Radix UI colors to default
    for (let i = 1; i <= 12; i++) {
      root.style.removeProperty(`--accent-${i}`);
    }
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
    root.classList.remove("dark", "magical-berg", "schwartz-wald", "light");

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
      root.classList.add("light");
      removeThemeColors();
    }

    // Re-enable transitions
    if (finalConfig.enableTransitions) {
      requestAnimationFrame(() => {
        root.classList.remove("transitioning-theme");
      });
    }
  }, [theme, finalConfig.enableTransitions]);

  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const systemTheme = getSystemTheme();
      setEffectiveTheme(systemTheme);
      const root = document.documentElement;
      root.classList.remove("dark", "magical-berg", "schwartz-wald", "light");
      if (systemTheme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.add("light");
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
