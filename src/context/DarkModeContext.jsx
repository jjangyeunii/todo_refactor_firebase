import { createContext, useContext, useEffect, useState } from "react";
import useMode from "../hooks/useMode";

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const {
    updateMode,
    ModeQuery: { isLoading, data: mode },
  } = useMode();

  const [darkMode, setDarkMode] = useState(false);

  const clickDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      updateMode.mutate("dark");
    } else {
      document.documentElement.classList.remove("dark");
      updateMode.mutate("light");
    }
  };

  useEffect(() => {
    if (!isLoading) {
      const isDarkMode = mode && mode[0].type === "dark";
      setDarkMode(isDarkMode);
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [isLoading]);

  if (isLoading) {
    return <div>Mode Loading...</div>;
  }

  return (
    <DarkModeContext.Provider value={{ darkMode, clickDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => useContext(DarkModeContext);
