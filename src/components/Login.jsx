import React, { useState } from 'react';
import { validateUserLogin } from './helper';
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from 'react-toastify';

const Login = ({ email, onClose, setIsLoggedIn }) => {
  const [password, setPassword] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validatePassword = (password) => {
    if (!password) {
      setPasswordErr('Password is required');
      return false;
    } else {
      setPasswordErr('');
      return true;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isPasswordValid = validatePassword(password);

    if (isPasswordValid) {
      const result = validateUserLogin(email, password);
      console.log(result);

      if (result.success) {
        setIsLoggedIn(true);
        toast.success(`you are successfully logged in`,  {
          position: "top-center", 
          autoClose: 2000
      })
        setTimeout(() => {
          onClose();
        }, 600);
      } else {
       toast.error(result?.message);
      }
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    validatePassword(value);
  };

  return (
    <div className="loginOrSignupContainer">
      <form onSubmit={handleSubmit}>
        <div className='inputWrapper'>
          <label htmlFor="email" className='inputLabel'><MdOutlineEmail /></label>
          <input
            type="email"
            id="email"
            value={email}
            className='inputField'
            required
            disabled
          />
        </div>
        <div className='inputWrapper'>
          <label htmlFor="password" className='inputLabel'><RiLockPasswordLine /></label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder='Enter Your Password'
            required
            className='inputField'
          />
          <span className='passwordToggle' onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
          {passwordErr && <span className="errorMsg">{passwordErr}</span>}
        </div>
        <button type="submit" className='submitBtn'>Login</button>
      </form>
    </div>
  );
};

export default Login;