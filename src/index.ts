import "@/styles/index.css";

export { ThemeProvider } from "@/components/ThemeProvider";
export { ThemeSwitcher } from "@/components/ThemeSwitcher";
export { useTheme } from "@/hooks/useTheme";
export { magicalBergTheme, schwartzWaldTheme } from "@/themes";
export type {
  Theme,
  ThemeConfig,
  ThemeContextType,
  ThemeColors,
} from "@/types";
