import { Link } from "react-router-dom";
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StepOne = ({ onNext }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {

    console.log('Button clicked');
    try {
      if (password.length < 6) {
        toast.warning('Password must be at least 6 characters long', {
          position: "top-right"
        });
        return;
      }
      
        const response = await axios.post('http://localhost:8000/auth/register', {

        username,
        email,
        password,
      });
  
      console.log('Registration successful:', response.data);
      if (response.data.accessToken && response.data.user) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        console.log('Access Token:', response.data.accessToken);
        console.log('User:', response.data.user);
        console.log('User ID:', response.data.user._id);
        console.log('Username:', response.data.user.username);

        onNext({ username, email, password });
      } else {
        console.error('Registration error: Missing accessToken or user data');
      } 
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error);
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message ===
          'Un utilisateur avec cet email ou nom d’utilisateur existe déjà.'
      ) {
        toast.warning('Username or Email already exist', {
          position: "top-right"
        });
      }
    }
  };

  return (
    <div className='flex'>
      <div className='flex flex-col bg-[#11012f] w-full items-center justify-center'>
        <h1 className='text-4xl text-bold text-white'>REGISTER</h1>
        <span className='text-xs text-pink-500 mb-6'>Ready to find love?</span>
        <form className='flex flex-col'>
          <div className='bg-gradient-to-r from-pink-600 to-purple-600 w-[388px] p-1 rounded-full mb-4'>
            <div className='flex bg-[#020011] p-3 rounded-full w-[380px] justify-center space-x-8 text-white divide-x-[3px] divide-white'>
              <label>Username</label>
              <input
                type='text'
                className='bg-[#020011]'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>
          <div className='bg-gradient-to-r from-pink-600 to-purple-600 w-[388px] p-1 rounded-full mb-4'>
            <div className='flex bg-[#020011] p-3 rounded-full w-[380px] justify-center space-x-8 text-white divide-x-[3px] divide-white'>
              <label>E-mail</label>
              <input
                type='email'
                className='bg-[#020011]'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className='bg-gradient-to-r from-pink-600 to-purple-600 w-[388px] p-1 rounded-full mb-4'>
            <div className='flex bg-[#020011] p-3 rounded-full w-[380px] justify-center space-x-4 text-white divide-x-[3px] divide-white'>
              <label>Password</label>
              <input
                type='password'
                className='bg-[#020011]'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className='flex justify-between items-center'>
            <Link to='/'>
              <span className='text-sm text-white hover:text-pink-500 p-4'>retour</span>
            </Link>
            <button
              onClick={handleRegister}
              className='rounded-full p-3 text-white bg-gradient-to-r from-pink-600 to-purple-600 w-[150px]'
              type='button'
            >
              Continue
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default StepOne;
