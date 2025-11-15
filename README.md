# fluesternde-berg-geist 🏔️🌲

A beautiful, animated theme switcher for React applications with TypeScript, Tailwind CSS, Framer Motion, and Lucide Icons.

## Features

- 🎨 Five stunning themes:
  - **Light** - Classic light theme
  - **Dark** - Modern dark theme
  - **Magical Berg** 🏔️ - Inspired by Zell am See, Austria (azure lakes, snow peaks, alpine meadows)
  - **Schwartz Wald** 🌲 - Inspired by Black Forest, Germany (deep greens, dark woods, autumn gold)
  - **System** - Follows system preference
- ✨ Smooth animations with Framer Motion
- 🎯 Lucide React icons
- 💾 Persistent theme selection (localStorage)
- 🎯 TypeScript support
- 🎭 Multiple variants (default, compact, dropdown, grid)
- 🪶 Lightweight and easy to use
- 🎨 Fully customizable with Tailwind CSS and CSS variables
- 🔧 **Radix UI compatible** - Works seamlessly with Radix UI themes

## Installation
```bash
pnpm add fluesternde-berg-geist framer-motion lucide-react
```

Note: `framer-motion` and `lucide-react` are peer dependencies and must be installed separately.

## Usage

### 1. Wrap your app with ThemeProvider
```tsx
import { ThemeProvider } from 'fluesternde-berg-geist';
import 'fluesternde-berg-geist/styles.css';

function App() {
  return (
    <ThemeProvider>
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

### 2. Using with Radix UI

The theme switcher now integrates seamlessly with Radix UI:

```tsx
import { ThemeProvider as FluesterndeThemeProvider } from 'fluesternde-berg-geist';
import { Theme as RadixTheme } from '@radix-ui/themes';
import 'fluesternde-berg-geist/styles.css';
import '@radix-ui/themes/styles.css';

function App() {
  return (
    <FluesterndeThemeProvider>
      <RadixTheme accentColor="brown" grayColor="olive">
        {/* Your app content */}
      </RadixTheme>
    </FluesterndeThemeProvider>
  );
}
```

### 3. Add the ThemeSwitcher component
```tsx
import { ThemeSwitcher } from 'fluesternde-berg-geist';

function Header() {
  return (
    <header>
      <ThemeSwitcher />
    </header>
  );
}
```

### 4. Use the theme in your components
```tsx
import { useTheme } from 'fluesternde-berg-geist';

function MyComponent() {
  const { theme, effectiveTheme, setTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>Effective theme: {effectiveTheme}</p>
      <button onClick={() => setTheme('magical-berg')}>
        Set Magical Berg Theme
      </button>
    </div>
  );
}
```

## Custom Themes

### Magical Berg 🏔️
Inspired by Zell am See, Austria - featuring azure mountain lakes, snow-capped peaks, and alpine meadows at sunset. **Optimized for warm color schemes like browns and beiges.**

```tsx
<button onClick={() => setTheme('magical-berg')}>
  Magical Berg
</button>
```

### Schwartz Wald 🌲
Inspired by the Black Forest, Germany - featuring deep forest greens, dark woods, moss, and autumn gold. **Perfect for creating a cozy, earthy atmosphere.**

```tsx
<button onClick={() => setTheme('schwartz-wald')}>
  Schwartz Wald
</button>
```

## Using Theme Colors in Your App

Custom theme colors are available as CSS custom properties and automatically applied to Radix UI components:

```tsx
// In your Tailwind classes
<div className="bg-[var(--theme-background)] text-[var(--theme-foreground)]">
  <button className="bg-[var(--theme-primary)] text-white">
    Primary Button
  </button>
</div>

// Radix UI components automatically pick up theme colors
<Card>
  <Text>This text will use theme colors!</Text>
</Card>
```

Available CSS variables:
- `--theme-background`
- `--theme-foreground`
- `--theme-primary`
- `--theme-secondary`
- `--theme-accent`
- `--theme-muted`
- `--theme-border`
- `--theme-card`

## Configuration

### ThemeProvider Options
```tsx
<ThemeProvider
  config={{
    defaultTheme: 'system', // 'light' | 'dark' | 'magical-berg' | 'schwartz-wald' | 'system'
    storageKey: 'my-app-theme', // localStorage key
    enableTransitions: true // enable/disable transition animations
  }}
>
  {/* Your app */}
</ThemeProvider>
```

### ThemeSwitcher Variants

#### Default (Horizontal Tabs)
```tsx
<ThemeSwitcher variant="default" showLabels={true} iconSize={18} />
```

#### Compact (Single Button Toggle)
```tsx
<ThemeSwitcher variant="compact" iconSize={24} />
```

#### Dropdown (Select Menu)
```tsx
<ThemeSwitcher variant="dropdown" showLabels={true} />
```

#### Grid (2x2 Grid Layout)
```tsx
<ThemeSwitcher variant="grid" showLabels={true} />
```

## Tailwind CSS Setup

Make sure your `tailwind.config.js` includes the dark mode class strategy:
```js
module.exports = {
  darkMode: 'class',
  content: [
    // ... your content paths
  ],
  // ... rest of your config
}
```

## Radix UI Integration

The theme switcher automatically overrides Radix UI's accent colors for the custom themes:

- **Magical Berg**: Blue tones that complement warm brown/beige UIs
- **Schwartz Wald**: Forest green tones with excellent readability in dark mode

Radix UI components that are automatically styled:
- Cards (`rt-Card`)
- Text inputs (`rt-TextField-Input`)
- Badges (`rt-Badge`)
- Separators (`rt-Separator`)
- Text & Headings (`rt-Text`, `rt-Heading`)

## API

### ThemeProvider

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | Your app components |
| `config` | `ThemeConfig` | `{}` | Configuration options |

### ThemeSwitcher

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS classes |
| `variant` | `'default' \| 'compact' \| 'dropdown' \| 'grid'` | `'default'` | Switcher style |
| `showLabels` | `boolean` | `true` | Show text labels |
| `iconSize` | `number` | `18` | Icon size in pixels |

### useTheme Hook

Returns an object with:

| Property | Type | Description |
|----------|------|-------------|
| `theme` | `Theme` | Current theme setting |
| `effectiveTheme` | `'light' \| 'dark' \| 'magical-berg' \| 'schwartz-wald'` | Actual theme applied |
| `setTheme` | `(theme: Theme) => void` | Function to change theme |

## Theme Color Reference

### Magical Berg (Zell am See)
Optimized for brown/beige color schemes:
- Background: `#e8f0f8` - Soft sky blue
- Foreground: `#1a365d` - Deep mountain blue
- Primary: `#2b6cb0` - Lake blue
- Secondary: `#d2e8f5` - Pale sky
- Accent: `#5a8fc4` - Mountain blue
- Card: `#f8fbfd` - Nearly white with blue tint

### Schwartz Wald (Black Forest)
Perfect for cozy, earthy atmospheres:
- Background: `#1a1f1a` - Deep forest night
- Foreground: `#e8f5e9` - Morning mist
- Primary: `#5d7a5d` - Forest green
- Secondary: `#3d4a3d` - Mossy stone
- Accent: `#c17817` - Autumn gold
- Card: `#243324` - Dark bark

## License

MIT

## Author

Hariharan Selvaraj
