"use client";

import React, { useEffect, useState } from "react";
import { useModeAnimation } from "react-theme-switch-animation";
import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";

const ThemeToggleBtn = () => {
  const { ref, toggleSwitchTheme, isDarkMode } = useModeAnimation();
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  // Set dark mode as default on first mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const theme = localStorage.getItem("theme");
      const htmlEl = document.documentElement;

      if (!theme) {
        localStorage.setItem("theme", "dark");
        htmlEl.classList.add("dark");
      } else if (theme === "dark") {
        htmlEl.classList.add("dark");
      } else {
        htmlEl.classList.remove("dark");
      }

      const frameId = requestAnimationFrame(() => setHasMounted(true));

      return () => cancelAnimationFrame(frameId);
    }
  }, []);

  if (!hasMounted) return null;

  return (
    <Button
      className="cursor-pointer rounded-full"
      size="icon"
      variant="ghost"
      ref={ref}
      onClick={toggleSwitchTheme}
    >
      {isDarkMode ? <Sun /> : <Moon />}
    </Button>
  );
};

export default ThemeToggleBtn;
