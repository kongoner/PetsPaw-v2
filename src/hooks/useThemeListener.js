import { useEffect, useState } from 'react';

/**
 * Custom hook to detect if the current theme is dark.
 * Watches for changes to the 'data-theme' attribute on <body>.
 */
export default function useThemeListener() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      setIsDarkMode(document.body.getAttribute('data-theme') === 'dark');
    };

    updateTheme(); // Initial check on mount

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect(); // Cleanup on unmount
  }, []);

  return isDarkMode;
}