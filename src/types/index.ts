export type Theme =
  | "light"
  | "dark"
  | "magical-berg"
  | "schwartz-wald"
  | "system";

export interface ThemeConfig {
  defaultTheme?: Theme;
  storageKey?: string;
  enableTransitions?: boolean;
}

export interface ThemeContextType {
  theme: Theme;
  effectiveTheme: "light" | "dark" | "magical-berg" | "schwartz-wald";
  setTheme: (theme: Theme) => void;
}

export interface ThemeColors {
  background: string;
  foreground: string;
  primary: string;
  secondary: string;
  accent: string;
  muted: string;
  border: string;
  card: string;
}
