'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Always default to light mode, but check for saved preference
    const savedTheme = localStorage.getItem('theme');
    
    // If user has a saved preference, use it; otherwise default to light
    const shouldBeDark = savedTheme === 'dark';
    
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
    
    // If no saved theme exists, save light mode as default
    if (!savedTheme) {
      localStorage.setItem('theme', 'light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    // Add transition class to html for smooth theme change
    document.documentElement.style.transition = 'all 0.5s ease-in-out';
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    
    // Remove transition after animation completes
    setTimeout(() => {
      document.documentElement.style.transition = '';
    }, 500);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-white/10 hover:bg-white/20 dark:bg-black/10 dark:hover:bg-black/20 border border-white/20 dark:border-black/20 transition-all duration-300 ease-in-out"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className="h-3.5 w-3.5 md:h-4 md:w-4 text-white transition-all duration-300 ease-in-out" />
      ) : (
        <Moon className="h-3.5 w-3.5 md:h-4 md:w-4 text-black/70 transition-all duration-300 ease-in-out" />
      )}
    </Button>
  );
}
