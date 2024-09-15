import React, { useState } from 'react';
import Modal from './modal';
import Login from './Login';

const Navbar = ({ isLoggedIn, handleLoginLogout, setIsLoggedIn }) => {
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState('');

  const handleClickLogin = () => {
    setOpenModal(true);
  };
console.log(isLoggedIn, 'logg');

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <nav className='navbarContainer'>
      <input />
      <button>Search</button>
      {isLoggedIn ? (
        <button onClick={handleLoginLogout}>Logout</button>
      ) : (
        <button onClick={handleClickLogin}>Login</button>
      )}
      {openModal && (
        <Modal setOpenModal={setOpenModal} openModal={openModal} setIsLoggedIn={setIsLoggedIn}>
        </Modal>
      )}
    </nav>
  );
};

export default Navbar;