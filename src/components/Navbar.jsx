import React, { useState } from 'react';
import Modal from './modal';
import Login from './Login';
import ThemeToggle from './themeToggle';

const Navbar = ({ isLoggedIn, handleLoginLogout, setIsLoggedIn, openModal, setOpenModal }) => {
  const [email, setEmail] = useState('');

  const handleClickLogin = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
    <nav className='navbarContainer'>
      {/* <input />
      <button>Search</button> */}
      <div className='logoContainer'>
        NyN
        </div>
        <ThemeToggle />
      {isLoggedIn ? (
        <button onClick={handleLoginLogout} className='loginBtn'>Logout</button>
      ) : (
        <button onClick={handleClickLogin} className='loginBtn'>Login</button>
      )}
    </nav>
      {openModal && (
        <Modal setOpenModal={setOpenModal} openModal={openModal} setIsLoggedIn={setIsLoggedIn}>
        </Modal>
      )}
    </>
  );
};

export default Navbar;