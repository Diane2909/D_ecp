import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from '../axios.config';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../Authcontext';
 
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:8000/auth/login', {
        username,
        password,
      });
      if (response?.data && response.data.user.accessToken) {
        localStorage.setItem('accessToken', response.data.user.accessToken);
        const decodedToken = jwtDecode(response.data.user.accessToken);
        login(response.data.user);
        if (decodedToken.role === 'admin') {
          navigate('/home/my-admin');
        } else {
          navigate('/home/love');
        }
      } else {
        console.error('Login error: Response data or accessToken is undefined');
      }
    } catch (error) {
      console.error(`Error with Login Response ${error}`);
    }
  };
 
  return (
    <div className='flex'>
      <div className='flex flex-col bg-[#11012f] w-full items-center justify-center'>
        <h1 className='text-4xl text-bold text-white'>LOGIN</h1>
        <span className='text-xs text-pink-500 mb-6'>Welcome back lover!</span>
        <form className='flex flex-col' 
              onSubmit={handleLogin}
              >
          <div className='bg-gradient-to-r from-pink-600 to-purple-600 w-[388px] p-1 rounded-full mb-4'>
            <div className='flex bg-[#020011] p-3 rounded-full w-[380px] justify-center space-x-8 text-white divide-x-[3px] divide-white'>
              <label>Username</label>
              <input type='text' className='bg-[#020011]' onChange={(e) => setUsername(e.target.value)} />
            </div>
          </div>
          <div className='bg-gradient-to-r from-pink-600 to-purple-600 w-[388px] p-1 rounded-full mb-4'>
            <div className='flex bg-[#020011] p-3 rounded-full w-[380px] justify-center space-x-4 text-white divide-x-[3px] divide-white'>
              <label>Password</label>
              <input type='password' className='bg-[#020011]' onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
          <div className='flex justify-between items-center'>
            <Link to='/'>
              <span className='text-sm text-white hover:text-pink-500 p-4'>retour</span>
            </Link>
            <button
              className='rounded-full p-3 text-white bg-gradient-to-r from-pink-600 to-purple-600 w-[150px]'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
 
export default Login;