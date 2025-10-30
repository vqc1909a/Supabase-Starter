# Dark Mode Setup with Tailwind CSS and next-themes

A simple guide to implement dark mode in Next.js using Tailwind CSS and the `next-themes` package.

## 📋 What You'll Learn

- How to configure Tailwind CSS for dark mode
- How to use the `next-themes` package
- How to create a theme switcher
- Best practices for dark mode implementation

## 🚀 Quick Setup

### 1. Install next-themes

```bash
npm install next-themes
# or
pnpm add next-themes
# or
yarn add next-themes
```

### 2. Configure Tailwind CSS

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"], // Enable class-based dark mode
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Your theme extensions here
    },
  },
  plugins: [],
} satisfies Config;
```

### 3. Add ThemeProvider to Layout

```tsx
// app/layout.tsx
import { ThemeProvider } from "next-themes";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

## ⚙️ ThemeProvider Configuration

### Required Props

```tsx
<ThemeProvider
  attribute="class"              // How to toggle theme (adds 'dark' class to html)
  defaultTheme="dark"           // Default theme on first visit
  enableSystem                  // Allow system preference detection
  disableTransitionOnChange     // Prevent flicker during theme change
>
```

### Available Options

| Prop | Type | Description |
|------|------|-------------|
| `attribute` | `string` | HTML attribute to use (`"class"` or `"data-theme"`) |
| `defaultTheme` | `string` | Default theme (`"light"`, `"dark"`, `"system"`) |
| `enableSystem` | `boolean` | Enable system preference detection |
| `disableTransitionOnChange` | `boolean` | Disable CSS transitions during theme change |
| `themes` | `string[]` | Available themes (default: `["light", "dark"]`) |

## 🌙 Using Dark Mode Classes

### Basic Usage

```tsx
// Background and text colors
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  <h1>This text adapts to the theme</h1>
</div>

// Buttons with hover states
<button className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white">
  Click me
</button>

// Borders and shadows
<div className="border border-gray-200 dark:border-gray-700 shadow-md dark:shadow-lg">
  Card content
</div>
```

### Common Patterns

```tsx
// Navigation
<nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
  <div className="text-gray-900 dark:text-gray-100">
    Navigation content
  </div>
</nav>

// Cards
<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg border border-gray-200 dark:border-gray-700">
  <div className="p-6 text-gray-900 dark:text-gray-100">
    Card content
  </div>
</div>

// Inputs
<input className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-md px-3 py-2" />
```

## 🔄 Creating a Theme Switcher

### Simple Theme Toggle

```tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
    >
      {theme === "dark" ? "🌞" : "🌙"}
    </button>
  );
}
```

### Advanced Theme Switcher

```tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center space-x-1 rounded-md bg-gray-200 dark:bg-gray-700 p-1">
      <button
        onClick={() => setTheme("light")}
        className={`px-3 py-1 rounded text-sm ${
          theme === "light" 
            ? "bg-white dark:bg-gray-800 shadow-sm" 
            : "hover:bg-gray-300 dark:hover:bg-gray-600"
        }`}
      >
        ☀️ Light
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`px-3 py-1 rounded text-sm ${
          theme === "dark" 
            ? "bg-white dark:bg-gray-800 shadow-sm" 
            : "hover:bg-gray-300 dark:hover:bg-gray-600"
        }`}
      >
        🌙 Dark
      </button>
      <button
        onClick={() => setTheme("system")}
        className={`px-3 py-1 rounded text-sm ${
          theme === "system" 
            ? "bg-white dark:bg-gray-800 shadow-sm" 
            : "hover:bg-gray-300 dark:hover:bg-gray-600"
        }`}
      >
        💻 System
      </button>
    </div>
  );
}
```

## 💡 Important Notes

### Prevent Hydration Mismatch

Always use the `mounted` state pattern to prevent hydration errors:

```tsx
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) {
  return null; // Return null on server-side
}
```

### suppressHydrationWarning

Add this to your HTML and body tags to prevent warnings:

```tsx
<html lang="en" suppressHydrationWarning>
  <body suppressHydrationWarning>
```

### CSS Variables (Advanced)

For more maintainable themes, use CSS variables:

```css
/* globals.css */
:root {
  --background: 255 255 255;
  --foreground: 0 0 0;
}

.dark {
  --background: 0 0 0;
  --foreground: 255 255 255;
}
```

```tsx
// Use in Tailwind config
colors: {
  background: "rgb(var(--background))",
  foreground: "rgb(var(--foreground))",
}
```

## 🎯 Best Practices

1. **Always provide dark variants** for your components
2. **Test in both themes** during development
3. **Use semantic color names** when possible
4. **Consider accessibility** - ensure good contrast in both themes
5. **Provide theme persistence** using localStorage (next-themes handles this)

## 🔍 How It Works

1. **Tailwind CSS** provides `dark:` prefixed utilities
2. **next-themes** manages the theme state and applies the `dark` class to `<html>`
3. **When `dark` class is present**, `dark:` utilities become active
4. **Theme preference is saved** in localStorage automatically

This setup gives you a complete, production-ready dark mode implementation! 🌙✨

## ⚙️ Dark Mode Strategies

### 1. Class Strategy (Recommended)

```typescript
darkMode: ["class"];
```

**How it works:**

- Add `dark` class to `<html>` element to enable dark mode
- Gives you full control over when dark mode is active
- Perfect for manual theme switching

**Usage:**

```html
<!-- Light mode -->
<html>
	<div className="bg-white dark:bg-black">Content</div>
</html>

<!-- Dark mode -->
<html className="dark">
	<div className="bg-white dark:bg-black">Content</div>
	<!-- bg-black applies -->
</html>
```

### 2. Media Strategy

```typescript
darkMode: "media";
```

**How it works:**

- Uses CSS `@media (prefers-color-scheme: dark)`
- Automatically follows system preference
- No manual control

**Usage:**

```tsx
// Automatically switches based on system preference
<div className="bg-white dark:bg-black">System-controlled theming</div>
```

### 3. Custom Selector Strategy

```typescript
darkMode: ["selector", "[data-theme='dark']"];
```

**How it works:**

- Uses custom attribute/selector
- Gives you flexibility in naming

**Usage:**

```html
<!-- Light mode -->
<html data-theme="light">
	<!-- Dark mode -->
	<html data-theme="dark"></html>
</html>
```

## 🎨 CSS Variables Approach

### Advanced Setup with CSS Variables

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
	:root {
		/* Light mode colors */
		--background: 255 255 255;
		--foreground: 0 0 0;
		--primary: 59 130 246;
		--secondary: 156 163 175;
		--accent: 34 197 94;
		--destructive: 239 68 68;
		--border: 229 231 235;
		--input: 229 231 235;
		--ring: 59 130 246;
		--radius: 0.5rem;
	}

	.dark {
		/* Dark mode colors */
		--background: 0 0 0;
		--foreground: 255 255 255;
		--primary: 96 165 250;
		--secondary: 75 85 99;
		--accent: 74 222 128;
		--destructive: 248 113 113;
		--border: 55 65 81;
		--input: 55 65 81;
		--ring: 96 165 250;
	}
}
```

### Tailwind Config for CSS Variables

```typescript
// tailwind.config.ts
export default {
	darkMode: ["class"],
	theme: {
		extend: {
			colors: {
				background: "rgb(var(--background))",
				foreground: "rgb(var(--foreground))",
				primary: {
					DEFAULT: "rgb(var(--primary))",
					foreground: "rgb(var(--foreground))",
				},
				secondary: {
					DEFAULT: "rgb(var(--secondary))",
					foreground: "rgb(var(--foreground))",
				},
				accent: {
					DEFAULT: "rgb(var(--accent))",
					foreground: "rgb(var(--foreground))",
				},
				destructive: {
					DEFAULT: "rgb(var(--destructive))",
					foreground: "rgb(var(--foreground))",
				},
				border: "rgb(var(--border))",
				input: "rgb(var(--input))",
				ring: "rgb(var(--ring))",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
		},
	},
} satisfies Config;
```

### Using CSS Variables

```tsx
// Semantic color usage - automatically switches with theme
<div className="bg-background text-foreground border border-border">
	<button className="bg-primary text-primary-foreground">Primary Button</button>
	<button className="bg-secondary text-secondary-foreground">
		Secondary Button
	</button>
</div>
```

## 🔄 Theme Switching Components

### 1. Simple Theme Toggle

```tsx
"use client";

import {useState, useEffect} from "react";

export function SimpleThemeToggle() {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		// Check localStorage and system preference
		const savedTheme = localStorage.getItem("theme");
		const systemDark = window.matchMedia(
			"(prefers-color-scheme: dark)"
		).matches;

		setIsDark(savedTheme === "dark" || (!savedTheme && systemDark));
	}, []);

	useEffect(() => {
		// Apply theme to document
		if (isDark) {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	}, [isDark]);

	return (
		<button
			onClick={() => setIsDark(!isDark)}
			className="p-2 rounded-md border border-border bg-background hover:bg-secondary"
		>
			{isDark ? "☀️" : "🌙"}
		</button>
	);
}
```

### 2. Advanced Theme Provider

```tsx
"use client";

import {createContext, useContext, useEffect, useState} from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderContext = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderContext | undefined>(
	undefined
);

export function ThemeProvider({
	children,
	defaultTheme = "system",
}: {
	children: React.ReactNode;
	defaultTheme?: Theme;
}) {
	const [theme, setTheme] = useState<Theme>(defaultTheme);

	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove("light", "dark");

		if (theme === "system") {
			const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
				.matches
				? "dark"
				: "light";
			root.classList.add(systemTheme);
		} else {
			root.classList.add(theme);
		}
	}, [theme]);

	return (
		<ThemeProviderContext.Provider value={{theme, setTheme}}>
			{children}
		</ThemeProviderContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeProviderContext);
	if (context === undefined)
		throw new Error("useTheme must be used within a ThemeProvider");
	return context;
}
```

### 3. Theme Switcher Component

```tsx
"use client";

import {useTheme} from "./theme-provider";

export function ThemeSwitcher() {
	const {theme, setTheme} = useTheme();

	return (
		<div className="flex items-center space-x-2">
			<button
				onClick={() => setTheme("light")}
				className={`p-2 rounded ${
					theme === "light"
						? "bg-primary text-primary-foreground"
						: "bg-secondary"
				}`}
			>
				☀️
			</button>
			<button
				onClick={() => setTheme("dark")}
				className={`p-2 rounded ${
					theme === "dark"
						? "bg-primary text-primary-foreground"
						: "bg-secondary"
				}`}
			>
				🌙
			</button>
			<button
				onClick={() => setTheme("system")}
				className={`p-2 rounded ${
					theme === "system"
						? "bg-primary text-primary-foreground"
						: "bg-secondary"
				}`}
			>
				💻
			</button>
		</div>
	);
}
```

## 📚 Best Practices

### 1. Color Naming Conventions

```css
/* ✅ Good - Semantic naming */
--background: 255 255 255;
--foreground: 0 0 0;
--primary: 59 130 246;
--muted: 156 163 175;

/* ❌ Avoid - Literal color names */
--white: 255 255 255;
--black: 0 0 0;
--blue: 59 130 246;
```

### 2. Consistent Dark Mode Classes

```tsx
// ✅ Good - Consistent pattern
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  <button className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700">
    Button
  </button>
</div>

// ❌ Inconsistent - Missing dark variants
<div className="bg-white text-gray-900">
  <button className="bg-blue-500 hover:bg-blue-600">
    Button
  </button>
</div>
```

### 3. Prevent Flash of Incorrect Theme

```tsx
// app/layout.tsx
export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
					}}
				/>
			</head>
			<body suppressHydrationWarning>
				<ThemeProvider defaultTheme="system" enableSystem>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
```

## 🎯 Common Patterns

### 1. Card Components

```tsx
function Card({children}: {children: React.ReactNode}) {
	return (
		<div className="rounded-lg border border-border bg-card text-card-foreground shadow-sm">
			{children}
		</div>
	);
}
```

### 2. Input Components

```tsx
function Input({...props}: React.InputHTMLAttributes<HTMLInputElement>) {
	return (
		<input
			className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
			{...props}
		/>
	);
}
```

### 3. Navigation

```tsx
function Navigation() {
	return (
		<nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-14 items-center">
				<div className="mr-4 flex">
					<a className="mr-6 flex items-center space-x-2" href="/">
						<span className="font-bold text-foreground">Brand</span>
					</a>
				</div>
				<div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
					<nav className="flex items-center">
						<ThemeSwitcher />
					</nav>
				</div>
			</div>
		</nav>
	);
}
```

## 🔧 Troubleshooting

### Issue: Flash of Wrong Theme

**Problem:** Page shows light theme briefly before switching to dark
**Solution:** Add theme detection script to `<head>`

### Issue: Dark Classes Not Working

**Problem:** `dark:` classes are ignored
**Solution:** Check `darkMode` configuration in `tailwind.config.ts`

### Issue: CSS Variables Not Updating

**Problem:** Colors don't change with theme
**Solution:** Ensure CSS variables are defined for both `:root` and `.dark`

### Issue: System Theme Not Detected

**Problem:** System preference not respected
**Solution:** Add `window.matchMedia('(prefers-color-scheme: dark)')` detection

## 📦 Using with Next.js and next-themes

For a more robust solution, consider using the `next-themes` library:

```bash
npm install next-themes
```

```tsx
// app/providers.tsx
"use client";

import {ThemeProvider} from "next-themes";

export function Providers({children}: {children: React.ReactNode}) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			{children}
		</ThemeProvider>
	);
}
```

This provides additional features like:

- Better SSR support
- Smooth transitions
- System preference detection
- Local storage persistence

---

_This guide covers the essential aspects of implementing dark mode in Tailwind CSS. Choose the approach that best fits your project's needs._
