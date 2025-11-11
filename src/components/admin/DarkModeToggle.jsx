import React, { useState, useEffect } from 'react';
import './styles.css';
import './DMToggle.css';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedPreference = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (storedPreference === "dark" || (!storedPreference && prefersDark)) {
      document.body.classList.add("dark-mode");
      setIsDarkMode(true);
    } else {
      document.body.classList.remove("dark-mode");
      setIsDarkMode(false);
    }
  }, []);

  const handleToggle = () => {
    if (!isDarkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    }
  };

  return (
    <div className="dark-mode-switch-group" onClick={handleToggle}>
      <img
        src="/img/dark-mode.svg"
        alt="Dark mode"
        className={`moon-icon ${isDarkMode ? "dark" : "light"}`}
      />
    </div>
  );
};

export default DarkModeToggle;



