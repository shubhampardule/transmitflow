'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown } from 'lucide-react';

export default function FloatingScrollButton() {
  const [scrollButtonState, setScrollButtonState] = useState<'top' | 'bottom'>('top');
  const [showButton, setShowButton] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Check if there are enough files to show the button
  useEffect(() => {
    const checkForFiles = () => {
      const transferCard = document.querySelector('[data-transfer-card]');
      const fileElements = document.querySelectorAll('[data-transfer-card] [data-file-item]');
      setShowButton(transferCard !== null && fileElements.length > 3);
    };

    // Check initially and on DOM changes
    checkForFiles();
    const observer = new MutationObserver(checkForFiles);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  // Auto-hide after 3 seconds and show on user interaction
  useEffect(() => {
    let hideTimer: NodeJS.Timeout;

    const hideButton = () => {
      hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    };

    const showButtonOnActivity = () => {
      clearTimeout(hideTimer);
      setIsVisible(true);
      hideButton(); // Start new timer
    };

    // Start initial timer
    hideButton();

    // Listen for user activity
    const events = ['scroll', 'mousemove', 'touchstart', 'touchmove', 'wheel'];
    events.forEach(event => {
      window.addEventListener(event, showButtonOnActivity, { passive: true });
    });

    return () => {
      clearTimeout(hideTimer);
      events.forEach(event => {
        window.removeEventListener(event, showButtonOnActivity);
      });
    };
  }, []);

  const handleScrollButtonClick = () => {
    if (scrollButtonState === 'top') {
      // Scroll to very top of the page
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setScrollButtonState('bottom');
    } else {
      // Scroll to bottom of the page
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      setScrollButtonState('top');
    }
  };

  const getScrollButtonIcon = () => {
    switch (scrollButtonState) {
      case 'top':
        return <ChevronUp className="h-4 w-4" />;
      case 'bottom':
        return <ChevronDown className="h-4 w-4" />;
    }
  };

  if (!showButton) {
    return null;
  }

  return (
    <div 
      className={`fixed bottom-6 right-6 z-[9999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <Button
        onClick={handleScrollButtonClick}
        size="sm"
        className="rounded-full w-12 h-12 p-0 shadow-2xl backdrop-blur-md border-2 transition-all duration-300 hover:scale-110"
        variant="secondary"
        title={scrollButtonState === 'top' ? 'Scroll to top' : 'Scroll to bottom'}
      >
        {getScrollButtonIcon()}
      </Button>
    </div>
  );
}
