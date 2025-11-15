import React, { createContext, useEffect, useState } from "react";
import type { Theme, ThemeConfig, ThemeContextType } from "@/types";

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

// Helper to convert hex to RGB values (Radix UI format: "R G B")
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

  useEffect(() => {
    const root = document.documentElement;

    let newEffectiveTheme: "light" | "dark" | "magical-berg" | "schwartz-wald";

    if (theme === "system") {
      newEffectiveTheme = getSystemTheme();
    } else {
      newEffectiveTheme = theme;
    }

    setEffectiveTheme(newEffectiveTheme);

    // Remove all theme classes
    root.classList.remove("dark", "magical-berg", "schwartz-wald", "light");

    // Add the new theme class
    root.classList.add(newEffectiveTheme);

    // Apply Radix UI colors based on theme
    if (newEffectiveTheme === "magical-berg") {
      // Light blue mountain theme - using softer, warmer blues that work with brown UI
      root.style.setProperty("--accent-1", hexToRgb("#f0f7ff"));
      root.style.setProperty("--accent-2", hexToRgb("#e0f0ff"));
      root.style.setProperty("--accent-3", hexToRgb("#c7e3ff"));
      root.style.setProperty("--accent-4", hexToRgb("#a5d4ff"));
      root.style.setProperty("--accent-5", hexToRgb("#80c2ff"));
      root.style.setProperty("--accent-6", hexToRgb("#5aadff"));
      root.style.setProperty("--accent-7", hexToRgb("#3894e6"));
      root.style.setProperty("--accent-8", hexToRgb("#1e78cc"));
      root.style.setProperty("--accent-9", hexToRgb("#0d5ca6"));
      root.style.setProperty("--accent-10", hexToRgb("#0a4d8a"));
      root.style.setProperty("--accent-11", hexToRgb("#073d6e"));
      root.style.setProperty("--accent-12", hexToRgb("#042d52"));

      root.style.setProperty("--gray-1", hexToRgb("#fcfcfc"));
      root.style.setProperty("--gray-2", hexToRgb("#f8f9fa"));
      root.style.setProperty("--gray-3", hexToRgb("#f1f3f5"));
      root.style.setProperty("--gray-4", hexToRgb("#e9ecef"));
      root.style.setProperty("--gray-5", hexToRgb("#dee2e6"));
      root.style.setProperty("--gray-6", hexToRgb("#cbd5e0"));
      root.style.setProperty("--gray-7", hexToRgb("#a0aec0"));
      root.style.setProperty("--gray-8", hexToRgb("#718096"));
      root.style.setProperty("--gray-9", hexToRgb("#4a5568"));
      root.style.setProperty("--gray-10", hexToRgb("#2d3748"));
      root.style.setProperty("--gray-11", hexToRgb("#1a202c"));
      root.style.setProperty("--gray-12", hexToRgb("#171923"));

      // Set theme CSS variables for custom use
      root.style.setProperty("--theme-background", "#e8f0f8");
      root.style.setProperty("--theme-foreground", "#1a365d");
      root.style.setProperty("--theme-primary", "#2b6cb0");
      root.style.setProperty("--theme-card", "#f8fbfd");
    } else if (newEffectiveTheme === "schwartz-wald") {
      // Dark forest theme - deep greens
      root.style.setProperty("--accent-1", hexToRgb("#0e1410"));
      root.style.setProperty("--accent-2", hexToRgb("#121917"));
      root.style.setProperty("--accent-3", hexToRgb("#1a2520"));
      root.style.setProperty("--accent-4", hexToRgb("#22322a"));
      root.style.setProperty("--accent-5", hexToRgb("#2d4034"));
      root.style.setProperty("--accent-6", hexToRgb("#3b5040"));
      root.style.setProperty("--accent-7", hexToRgb("#4d6650"));
      root.style.setProperty("--accent-8", hexToRgb("#668066"));
      root.style.setProperty("--accent-9", hexToRgb("#2d5016"));
      root.style.setProperty("--accent-10", hexToRgb("#3d6a1f"));
      root.style.setProperty("--accent-11", hexToRgb("#c1e5c1"));
      root.style.setProperty("--accent-12", hexToRgb("#e8f5e9"));

      root.style.setProperty("--gray-1", hexToRgb("#0e100e"));
      root.style.setProperty("--gray-2", hexToRgb("#141714"));
      root.style.setProperty("--gray-3", hexToRgb("#1a1f1a"));
      root.style.setProperty("--gray-4", hexToRgb("#212821"));
      root.style.setProperty("--gray-5", hexToRgb("#2a332a"));
      root.style.setProperty("--gray-6", hexToRgb("#364036"));
      root.style.setProperty("--gray-7", hexToRgb("#475447"));
      root.style.setProperty("--gray-8", hexToRgb("#5d705d"));
      root.style.setProperty("--gray-9", hexToRgb("#8b9d8b"));
      root.style.setProperty("--gray-10", hexToRgb("#a3b5a3"));
      root.style.setProperty("--gray-11", hexToRgb("#c1d4c1"));
      root.style.setProperty("--gray-12", hexToRgb("#e8f5e9"));

      // Set theme CSS variables for custom use
      root.style.setProperty("--theme-background", "#1a1f1a");
      root.style.setProperty("--theme-foreground", "#e8f5e9");
      root.style.setProperty("--theme-primary", "#5d7a5d");
      root.style.setProperty("--theme-card", "#243324");
    } else {
      // Remove custom theme variables for light/dark/system
      const props = ["background", "foreground", "primary", "card"];
      props.forEach((prop) => root.style.removeProperty(`--theme-${prop}`));

      // Remove Radix overrides for light/dark themes
      for (let i = 1; i <= 12; i++) {
        root.style.removeProperty(`--accent-${i}`);
        root.style.removeProperty(`--gray-${i}`);
      }
    }
  }, [theme]);

  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const systemTheme = getSystemTheme();
      setEffectiveTheme(systemTheme);
      const root = document.documentElement;
      root.classList.remove("dark", "light");
      root.classList.add(systemTheme);
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
