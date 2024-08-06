import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import axios from 'axios';
import './slide.css';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    isSignUp: false
  });

  const { name, email, password, role, isSignUp } = formData;

  const handleFormToggle = () => {
    setFormData({ ...formData, isSignUp: !isSignUp });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const apiUrl = isSignUp ? 'http://localhost:3000/users/register' : 'http://localhost:3000/users/login';
  //   const requestData = { name, email, password, role };

  //   try {
  //     const response = await axios.post(apiUrl, requestData);

  //     if (isSignUp) {
  //       console.log(response.data.message);
  //       setFormData({ ...formData, isSignUp: false });
  //     } else {
  //       const { token, userId } = response.data;
  //       localStorage.setItem('token', token);
  //       localStorage.setItem('userId', userId);
  //       navigate('/dashboard');
  //     }
  //   } catch (error) {
  //     console.error(`${isSignUp ? 'Signup' : 'Login'} failed:`, error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const apiUrl = isSignUp ? 'http://localhost:3000/users/register' : 'http://localhost:3000/users/login';
    const requestData = { name, email, password, role };
  
    try {
      const toastId = toast.loading("Entering");
      const response = await axios.post(apiUrl, requestData);
  
      if (isSignUp) {
        console.log(response.data.message);
        setFormData({ ...formData, isSignUp: false });
        toast.success("Signed Up Successfully", { id: toastId });
      } else {
        const { token, userId } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        toast.success("Logged In Successfully", { id: toastId });
        navigate('/dashboard');
      }
    } catch (error) {
      console.error(`${isSignUp ? 'Signup' : 'Login'} failed:`, error);
      if (isSignUp) {
        toast.error("Signup Failed");
      } else {
        toast.error("Login Failed");
      }
    }
  };

  return (
    <div className="body">
      <div className={`container ${isSignUp ? 'right-panel-active' : ''}`}>
        <div className="form-container sign-up-container">
          <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input type="text" placeholder="Name" name="name" value={name} onChange={handleChange} required />
            <input type="email" placeholder="Email" name="email" value={email} onChange={handleChange} required />
            <input type="password" placeholder="Password" name="password" value={password} onChange={handleChange} required />
            <select name="role" value={role} onChange={handleChange} required>
              <option value="">Select a role</option>
              <option value="donor">donor</option>
              <option value="volunteer">volunteer</option>
            </select>
            <button type="submit">Register</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input type="email" placeholder="Email" name="email" value={email} onChange={handleChange} required />
            <input type="password" placeholder="Password" name="password" value={password} onChange={handleChange} required />
            <button type="submit">Login</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h2>Already have an account?</h2>
              <p>Please login to access your profile.</p>
              <button className="ghost" onClick={handleFormToggle}>
                Login
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h2>Don't have an account?</h2>
              <p>Go ahead and create an account for yourself!</p>
              <button className="ghost" onClick={handleFormToggle}>
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
