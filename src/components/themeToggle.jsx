import React, { useState, useEffect } from 'react';
import { FiSun } from 'react-icons/fi';
import { HiOutlineMoon } from "react-icons/hi2";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    JSON.parse(localStorage.getItem('isDarkMode')) || false
  );
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('isDarkMode', JSON.stringify(newMode));
    document.body.classList.toggle('dark-mode', newMode);
  };

  useEffect(() => {
    const savedTheme = JSON.parse(localStorage.getItem('isDarkMode')) || false;
    document.body.classList.toggle('dark-mode', savedTheme);
  }, []);

  return (
    <div className="toggle-container" onClick={() => toggleDarkMode()}>
      <div className="toggle-button" style={{ display: 'flex', cursor: 'pointer' }}>
        {!isDarkMode ? (
          <div key="moon">
            <HiOutlineMoon size={25} color='black' />
          </div>
        ) : (
          <div key="sun">
            <FiSun size={25} color='white' />
          </div>
        )}
      </div>
    </div>
  );
};

export default ThemeToggle;