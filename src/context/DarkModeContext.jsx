import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const clickDarkMode = () => {
    setDarkMode(!darkMode);
    updateDarkMode(!darkMode);
  };

  useEffect(() => {
    // axios
    //   .get("/mode")
    //   .then((res) => {
    //     const isDarkMode = res.data.type === "dark";
    //     setDarkMode(isDarkMode);
    //     updateDarkMode(isDarkMode);
    //   })
    //   .catch((err) => console.log(err));
  }, []);

  return (
    <DarkModeContext.Provider value={{ darkMode, clickDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

const updateDarkMode = (darkMode) => {
  if (darkMode) {
    document.documentElement.classList.add("dark");
    // axios
    //   .patch("/mode", { type: "dark" })
    //   .then(() => {})
    //   .catch((err) => console.log(err));
  } else {
    document.documentElement.classList.remove("dark");
    // axios
    //   .patch("/mode", { type: "light" })
    //   .then(() => {})
    //   .catch((err) => console.log(err));
  }
};

export const useDarkMode = () => useContext(DarkModeContext);
