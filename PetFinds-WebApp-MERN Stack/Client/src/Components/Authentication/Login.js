import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../../App.css'
import Home from "../Home/Home"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', {
        email,
        password,
      });

      // Save the token to localStorage (or context/state)
      localStorage.setItem('token', response.data.token);

      // Redirect to the home page or dashboard
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
        <div className='login-body'>
        <div className='login-container'>
     <h2 className='login-title'>Login to Pawfinds</h2>
     {error && <p>{error}</p>}
     <form onSubmit={handleSubmit}>
         <input
           type="email"
           value={email}
           placeholder='Email'
           onChange={(e) => setEmail(e.target.value)}
           required
         />
         <input
           type="password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
           required
           placeholder='Password'
         />
       <button type="submit">Login</button>
     </form>
     <p>
       Don't have an account? <Link to="/signup">Sign up</Link>
     </p>
   </div>
   </div>
   
  );
};



export default Login;
