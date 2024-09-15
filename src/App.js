import React, { useState, useEffect } from 'react';
import Navbar from "./components/Navbar";
import DsaSheetPage from "./pages/DsaSheetPage";
import { toast } from 'react-toastify';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const registeredUsers = JSON.parse(localStorage.getItem('userDetails')) || [];
  const activeEmail = localStorage.getItem('activeEmail');

  useEffect(() => {
    if (activeEmail && registeredUsers.some(user => user.email === activeEmail)) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      localStorage.removeItem('activeEmail');
      toast.success(`Logout is Successfully.`,  {
        position: "top-center", 
        autoClose: 2000
    });
      setIsLoggedIn(false);
    }
  };

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn }handleLoginLogout={handleLoginLogout} openModal={openModal} setOpenModal={setOpenModal}/>
      <DsaSheetPage isLoggedIn={isLoggedIn} activeEmail={activeEmail} registeredUsers={registeredUsers} setOpenModal={setOpenModal} />
    </div>
  );
}

export default App;