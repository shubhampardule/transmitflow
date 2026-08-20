'use client';

import { useCallback, useRef } from 'react';
import { flushSync } from 'react-dom';

interface UseThemeSwitchAnimationOptions {
  /** Current theme state, used to decide which state we're switching to. */
  isDarkMode: boolean;
  /** Called with the new dark-mode state once it should be applied. */
  onToggle: (nextIsDark: boolean) => void;
  /** Animation duration in ms. */
  duration?: number;
}

/**
 * Drives a circular reveal animation for a theme toggle using the View
 * Transitions API. The circle's origin is measured from the toggle button
 * itself at the moment of the click (not on mount, not cached), so the
 * animation always starts from the exact center of the button — regardless
 * of viewport size, header layout, or where the button happens to sit on
 * the page.
 */
export function useThemeSwitchAnimation({
  isDarkMode,
  onToggle,
  duration = 500,
}: UseThemeSwitchAnimationOptions) {
  const ref = useRef<HTMLButtonElement>(null);

  const toggleSwitchTheme = useCallback(() => {
    const button = ref.current;
    const nextIsDark = !isDarkMode;
    const startViewTransition = document.startViewTransition?.bind(document);
    const prefersReducedMotion = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)'
    )?.matches;

    // No button to measure, no browser support, or user prefers no motion:
    // just flip the theme instantly.
    if (!button || !startViewTransition || prefersReducedMotion) {
      onToggle(nextIsDark);
      return;
    }

    // Measure the button's exact on-screen position right now, at click
    // time. This is the key fix: never rely on a position captured on
    // mount or computed relative to anything other than the viewport the
    // user is currently looking at.
    const { top, left, width, height } = button.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;

    // Distance from the button's center to the furthest viewport corner,
    // so the circle always grows large enough to cover the whole screen
    // on any screen size.
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = startViewTransition(() => {
      flushSync(() => {
        onToggle(nextIsDark);
      });
    });

    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration,
            easing: 'ease-in-out',
            pseudoElement: '::view-transition-new(root)',
          }
        );
      })
      .catch(() => {
        // Transition was interrupted/skipped by the browser; the theme
        // state was already flipped above, so there's nothing else to do.
      });
  }, [isDarkMode, onToggle, duration]);

  return { ref, toggleSwitchTheme };
}
