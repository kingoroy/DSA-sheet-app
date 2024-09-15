import React, { useState } from 'react';
import isEmailRegistered from './helper';
import { MdOutlineEmail } from "react-icons/md";

const LoginOrSignup = ({onSubmit}) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

  const validationInputs = () => {
    let valid = true;

    if (!email) {
      setEmailError('Email is required');
      valid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
      valid = false;
    } else {
      setEmailError('');
    }
    return valid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validationInputs()) {
      onSubmit(email);
    }    
  };

  const handleChange =(event) => {
    setEmail(event.target.value);
    validationInputs();
  };

  return (
      <form onSubmit={handleSubmit}  className="loginOrSignupContainer">
        <div className='inputWrapper'>
          <label htmlFor="email" className='inputLabel'><MdOutlineEmail /></label>
          <input
            id="email"
            className='inputField'
            value={email}
            onChange={(e) => handleChange(e)}
            placeholder="demo@gmail.com"
          />
          {emailError && <span className="errorMsg">{emailError}</span>}
        </div>
        <button type="submit" className='submitBtn'>Submit</button>
      </form>
  );
};

export default LoginOrSignup;