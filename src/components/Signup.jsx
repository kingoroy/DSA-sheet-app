import React, { useState } from 'react';
import { saveUserDetails } from './helper';
import { MdOutlineEmail } from "react-icons/md";
import { HiOutlineUser } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from 'react-toastify';

const Signup = ({ email, setIsLoggedIn, setOpenModal }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    createPassword: '',
    confirmPassword: '',
  });

  const [formErr, setFormErr] = useState({
    fullNameError: '',
    createPasswordError: '',
    confirmPasswordError: '',
  });

  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateFullName = (name) => {
    if (!name) {
      setFormErr(prevState => ({ ...prevState, fullNameError: 'Full Name is required' }));
      return false;
    } else {
      setFormErr(prevState => ({ ...prevState, fullNameError: '' }));
      return true;
    }
  };

  const validateCreatePassword = (password) => {
    if (!password) {
      setFormErr(prevState => ({ ...prevState, createPasswordError: 'Password is required' }));
      return false;
    } else if (password.length < 6) {
      setFormErr(prevState => ({ ...prevState, createPasswordError: 'Password must be at least 6 characters' }));
      return false;
    } else {
      setFormErr(prevState => ({ ...prevState, createPasswordError: '' }));
      return true;
    }
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) {
      setFormErr(prevState => ({ ...prevState, confirmPasswordError: 'Confirm Password is required' }));
      return false;
    } else if (password !== confirmPassword) {
      setFormErr(prevState => ({ ...prevState, confirmPasswordError: 'Passwords do not match' }));
      return false;
    } else {
      setFormErr(prevState => ({ ...prevState, confirmPasswordError: '' }));
      return true;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isFullNameValid = validateFullName(formData.fullName);
    const isCreatePasswordValid = validateCreatePassword(formData.createPassword);
    const isConfirmPasswordValid = validateConfirmPassword(formData.createPassword, formData.confirmPassword);

    if (isFullNameValid && isCreatePasswordValid && isConfirmPasswordValid) {
      saveUserDetails(formData.fullName, email, formData.createPassword);
      setIsLoggedIn(true);
      setTimeout(() => { 
        setOpenModal(false); 
      }, 1000);
      toast.success(`welcome ${formData?.fullName}, you are successfully logged in`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));

    // Validate fields while typing
    if (name === 'fullName') validateFullName(value);
    if (name === 'createPassword') validateCreatePassword(value);
    if (name === 'confirmPassword') validateConfirmPassword(formData.createPassword, value);
  };

  return (
    <div className="loginOrSignupContainer">
      <form onSubmit={handleSubmit}>
        <div className='inputWrapper'>
          <label htmlFor="fullName" className='inputLabel'><HiOutlineUser /></label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            placeholder="Full Name"
            className='inputField'
            onChange={handleChange}
            required
          />
          {formErr.fullNameError && <span className="errorMsg">{formErr.fullNameError}</span>}
        </div>
        <div className='inputWrapper'>
          <label htmlFor="email" className='inputLabel'><MdOutlineEmail /></label>
          <input
            id="email"
            className='inputField'
            value={email}
            required
            disabled
          />
        </div>
        <div className='inputWrapper'>
          <label htmlFor="createPassword" className='inputLabel'><RiLockPasswordLine /></label>
          <input
            type={showCreatePassword ? "text" : "password"}
            id="createPassword"
            name="createPassword"
            className='inputField'
            placeholder='Create Password'
            value={formData.createPassword}
            onChange={handleChange}
            required
          />
          <span className='passwordToggle' onClick={() => setShowCreatePassword(!showCreatePassword)}>
            {showCreatePassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
          {formErr.createPasswordError && <span className="errorMsg">{formErr.createPasswordError}</span>}
        </div>
        <div className='inputWrapper'>
          <label htmlFor="confirmPassword" className='inputLabel'><RiLockPasswordLine /></label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            className='inputField'
            placeholder='Confirm Password'
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <span className='passwordToggle' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
          {formErr.confirmPasswordError && <span className="errorMsg">{formErr.confirmPasswordError}</span>}
        </div>
        <button type="submit" className='submitBtn'>Create Account</button>
      </form>
    </div>
  );
};

export default Signup;