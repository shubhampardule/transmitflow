'use client';

import { Moon, Sun } from 'lucide-react';
import { useCallback } from 'react';
import { useThemeSwitchAnimation } from '@/components/hooks/useThemeSwitchAnimation';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ui/ThemeProvider';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  const handleToggle = useCallback(
    (nextIsDark: boolean) => setTheme(nextIsDark ? 'dark' : 'light'),
    [setTheme]
  );

  const { ref, toggleSwitchTheme } = useThemeSwitchAnimation({
    isDarkMode,
    onToggle: handleToggle,
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
