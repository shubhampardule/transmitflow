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
      className="h-8 w-8 md:h-9 md:w-9 rounded-md border border-border bg-transparent hover:bg-muted transition-colors duration-150 ease-out motion-reduce:transition-none"
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <Moon className="h-3.5 w-3.5 md:h-4 md:w-4 text-foreground transition-all duration-200 ease-out motion-reduce:transition-none" />
      ) : (
        <Sun className="h-3.5 w-3.5 md:h-4 md:w-4 text-foreground transition-all duration-200 ease-out motion-reduce:transition-none" />
      )}
    </Button>
  );
}
