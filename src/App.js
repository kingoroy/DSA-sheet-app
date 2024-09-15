import React, { useState, useEffect } from 'react';
import Navbar from "./components/Navbar";
import DsaSheetPage from "./pages/DsaSheetPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const registeredUsers = JSON.parse(localStorage.getItem('userDetails')) || [];
    const activeEmail = localStorage.getItem('activeEmail');

    if (activeEmail && registeredUsers.some(user => user.email === activeEmail)) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      localStorage.removeItem('activeEmail');
      setIsLoggedIn(false);
    }
  };

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn }handleLoginLogout={handleLoginLogout} />
      <DsaSheetPage />
    </div>
  );
}

export default App;