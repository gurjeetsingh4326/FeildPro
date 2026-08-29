"use client";

import * as React from "react";

/** Live-tracks the `.dark` class on <html> (toggled by ThemeToggle) — for
    the rare case a component needs the theme in JS, not just CSS custom
    properties (e.g. picking between two different map tile URLs). Most
    components should keep using var(--token) instead, which the browser
    re-resolves on its own when the class changes. */
export function useIsDarkMode(): boolean {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    const root = document.documentElement;
    setIsDark(root.classList.contains("dark"));

    const observer = new MutationObserver(() => setIsDark(root.classList.contains("dark")));
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return isDark;
}
