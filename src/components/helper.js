export const isEmailRegistered = (email) => {
    const users = JSON.parse(localStorage.getItem('userDetails')) || [];
      return users.some(user => user?.email === email);
  };
  
export const saveUserDetails = (fullName, email, password) => {
    const existingUsers = JSON.parse(localStorage.getItem('userDetails')) || [];
  
    const newUser = {
      fullName,
      email,
      password
    };
  
    existingUsers.push(newUser);
    localStorage.setItem('activeEmail', email);
    localStorage.setItem('userDetails', JSON.stringify(existingUsers));
  };
  

export const validateUserLogin = (email, password) => {
    const users = JSON.parse(localStorage.getItem('userDetails')) || [];
  
    const user = users.find((user) => user.email === email);

    if (user && user.password === password) {
        localStorage.setItem('activeEmail', email);
      return { success: true, message: 'Login successful' };
    } else if (!user) {
      return { success: false, message: 'Email not found' };
    } else {
      return { success: false, message: 'Incorrect password' };
    }
  };
  
