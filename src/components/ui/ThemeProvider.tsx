'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const STORAGE_KEY = 'theme';

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

/**
 * Minimal light/dark theme provider (no system-preference detection needed
 * here since the toggle is always manual). Avoids next-themes' inline
 * `<script>` mount pattern, which React 19.1 dev builds flag with a
 * "script tag while rendering" console warning. The actual pre-hydration
 * flash prevention is handled by the beforeInteractive script in
 * `src/app/layout.tsx`, which Next.js injects outside of normal React
 * hydration.
 */
export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');

  // Pick up whatever the inline init script already applied to <html>,
  // so React state matches the DOM without causing a second flash.
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setThemeState(isDark ? 'dark' : 'light');
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage may be unavailable (e.g. private mode); theme just
      // won't persist across reloads in that case.
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
