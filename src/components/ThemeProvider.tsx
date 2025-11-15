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

// Helper to convert hex to RGB values (without rgb() wrapper, as Radix UI expects)
const hexToRgb = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "0 0 0";
  return `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}`;
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

    // Apply to Radix UI color scales (using RGB format without rgb() wrapper)
    if (themeName === "magical-berg") {
      // Magical Berg - Blue mountain theme (light)
      // Accent scale (blues)
      root.style.setProperty("--accent-1", hexToRgb("#f0f4f8"));
      root.style.setProperty("--accent-2", hexToRgb("#e8f0f8"));
      root.style.setProperty("--accent-3", hexToRgb("#d9e6f2"));
      root.style.setProperty("--accent-4", hexToRgb("#c5d9ec"));
      root.style.setProperty("--accent-5", hexToRgb("#b0cce5"));
      root.style.setProperty("--accent-6", hexToRgb("#9abfde"));
      root.style.setProperty("--accent-7", hexToRgb("#7ea8d1"));
      root.style.setProperty("--accent-8", hexToRgb("#5a8fc4"));
      root.style.setProperty("--accent-9", hexToRgb("#2b6cb0"));
      root.style.setProperty("--accent-10", hexToRgb("#2660a0"));
      root.style.setProperty("--accent-11", hexToRgb("#1a365d"));
      root.style.setProperty("--accent-12", hexToRgb("#0f2540"));

      // Gray scale (warm neutrals)
      root.style.setProperty("--gray-1", hexToRgb("#f8f9fa"));
      root.style.setProperty("--gray-2", hexToRgb("#f1f3f5"));
      root.style.setProperty("--gray-3", hexToRgb("#e9ecef"));
      root.style.setProperty("--gray-4", hexToRgb("#dee2e6"));
      root.style.setProperty("--gray-5", hexToRgb("#cbd5e0"));
      root.style.setProperty("--gray-6", hexToRgb("#a0aec0"));
      root.style.setProperty("--gray-7", hexToRgb("#718096"));
      root.style.setProperty("--gray-8", hexToRgb("#4a5568"));
      root.style.setProperty("--gray-9", hexToRgb("#2d3748"));
      root.style.setProperty("--gray-10", hexToRgb("#1a202c"));
      root.style.setProperty("--gray-11", hexToRgb("#171923"));
      root.style.setProperty("--gray-12", hexToRgb("#0f1419"));
    } else if (themeName === "schwartz-wald") {
      // Schwartz Wald - Dark forest theme
      // Accent scale (forest greens)
      root.style.setProperty("--accent-1", hexToRgb("#1a1f1a"));
      root.style.setProperty("--accent-2", hexToRgb("#1f241f"));
      root.style.setProperty("--accent-3", hexToRgb("#243324"));
      root.style.setProperty("--accent-4", hexToRgb("#2d3d2d"));
      root.style.setProperty("--accent-5", hexToRgb("#3d4a3d"));
      root.style.setProperty("--accent-6", hexToRgb("#4a5d4a"));
      root.style.setProperty("--accent-7", hexToRgb("#5d7a5d"));
      root.style.setProperty("--accent-8", hexToRgb("#7a9c7a"));
      root.style.setProperty("--accent-9", hexToRgb("#2d5016"));
      root.style.setProperty("--accent-10", hexToRgb("#3d6a1f"));
      root.style.setProperty("--accent-11", hexToRgb("#e8f5e9"));
      root.style.setProperty("--accent-12", hexToRgb("#f5faf5"));

      // Gray scale (dark forest tones)
      root.style.setProperty("--gray-1", hexToRgb("#1a1f1a"));
      root.style.setProperty("--gray-2", hexToRgb("#1f241f"));
      root.style.setProperty("--gray-3", hexToRgb("#252a25"));
      root.style.setProperty("--gray-4", hexToRgb("#2d332d"));
      root.style.setProperty("--gray-5", hexToRgb("#3d4a3d"));
      root.style.setProperty("--gray-6", hexToRgb("#4a5d4a"));
      root.style.setProperty("--gray-7", hexToRgb("#5d7a5d"));
      root.style.setProperty("--gray-8", hexToRgb("#8b9d8b"));
      root.style.setProperty("--gray-9", hexToRgb("#c1d4c1"));
      root.style.setProperty("--gray-10", hexToRgb("#d4e5d4"));
      root.style.setProperty("--gray-11", hexToRgb("#e8f5e9"));
      root.style.setProperty("--gray-12", hexToRgb("#f5faf5"));
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

    // Remove Radix UI color scales
    for (let i = 1; i <= 12; i++) {
      root.style.removeProperty(`--accent-${i}`);
      root.style.removeProperty(`--gray-${i}`);
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
      // Use a small delay to ensure CSS variables are set before removing the class
      const timeoutId = setTimeout(() => {
        root.classList.remove("transitioning-theme");
      }, 50);
      return () => clearTimeout(timeoutId);
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
