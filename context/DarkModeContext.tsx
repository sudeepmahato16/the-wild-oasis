"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { SkeletonTheme } from "react-loading-skeleton";

const DarkModeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

export const DarkModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedValue = localStorage.getItem("theme");
    if (storedValue) {
      setIsDarkMode(JSON.parse(storedValue));
    } else {
      setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("theme", JSON.stringify(isDarkMode));
    }

  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev: boolean) => !prev);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
         <SkeletonTheme
        baseColor={!isDarkMode ? "#efefef" : "#18212f"}
        highlightColor={!isDarkMode ? "#f3f4f6" : "#1f2937"}
      >
      {children}
      </SkeletonTheme>
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("DarkModeContext was used outside of DarkModeProvider");
  return context;
};
