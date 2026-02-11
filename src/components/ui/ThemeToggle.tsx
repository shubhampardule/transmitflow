'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  ThemeAnimationType,
  useModeAnimation,
} from 'react-theme-switch-animation';
import { Button } from '@/components/ui/button';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { ref, toggleSwitchTheme, isDarkMode } = useModeAnimation({
    animationType: ThemeAnimationType.CIRCLE,
    isDarkMode: theme === 'dark',
    onDarkModeChange: (nextIsDark) => setTheme(nextIsDark ? 'dark' : 'light'),
  });

  return (
    <Button
      variant="ghost"
      size="icon"
      ref={ref}
      onClick={toggleSwitchTheme}
      className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-white/10 hover:bg-white/20 dark:bg-black/10 dark:hover:bg-black/20 border border-white/20 dark:border-black/20 transition-all duration-300 ease-in-out"
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <Moon className="h-3.5 w-3.5 md:h-4 md:w-4 text-white transition-all duration-300 ease-in-out" />
      ) : (
        <Sun className="h-3.5 w-3.5 md:h-4 md:w-4 text-black/70 transition-all duration-300 ease-in-out" />
      )}
    </Button>
  );
}
