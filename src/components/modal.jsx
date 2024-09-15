import React, { useEffect, useRef, useState } from 'react';
import LoginOrSignup from './LoginOrSignup';
import Signup from './Signup';
import Login from './Login';
import {isEmailRegistered} from './helper';
import { IoCloseCircleOutline } from "react-icons/io5";

const Modal = ({setOpenModal, openModal, setIsLoggedIn}) => {
  const [step, setStep] = useState('loginOrSignup');
    const [email, setEmail] = useState('');

  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
     setOpenModal(false);
    }
  };
  const onClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!openModal) return null;

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    zIndex: 999,
  };

  const handleEmailSubmit = (email) => {
    isEmailRegistered(email) ? setStep('login') : setStep('signup');
    setEmail(email);
  };

  return (
    <div style={{width: '100vw'}}>
    <div style={overlayStyle}></div>
    <div className='modalContainer' ref={modalRef}>
      <div className='closeBtn'>
        <IoCloseCircleOutline className='closeIcon' onClick={onClose} />
      </div>
      <div className='modalTitle'>
        <p>Welcome you to</p>
        <p className='NavigateToYourNext'>NavigateToYourNext</p>
      </div>
      <div className='pageName'>
        <div/>
        <p>login or signup</p>
        <div/>
      </div>
    {step === 'loginOrSignup' && <LoginOrSignup onSubmit={handleEmailSubmit} />}
      {step === 'login' && <Login email={email} onClose={onClose} setIsLoggedIn={setIsLoggedIn}/>}
      {step === 'signup' && <Signup email={email} onClose={onClose} setIsLoggedIn={setIsLoggedIn} setOpenModal={setOpenModal}/>}
    </div>
    </div>
  );
};

export default Modal;