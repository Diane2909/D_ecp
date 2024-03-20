import React, { useState, useEffect, useCallback } from 'react';
import axios from '../axios.config';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../Authcontext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const extractCodeFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    console.log('URL Params:', window.location.search);
    console.log('Extracted Code:', code); 
    return code;
  };


  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/auth/login', {
        username,
        password,
      });

      console.log('Complete Response:', response);
      if (response?.data && response.data.user.accessToken) {
        console.log('Login successful:', response.data);
        localStorage.setItem('accessToken', response.data.user.accessToken);
        const decodedToken = jwtDecode(response.data.user.accessToken);
        console.log('User:', decodedToken.role);
        login(response.data.user);

       
        if (decodedToken.role === 'admin') {
          setLoggedIn(true);

        } else if (decodedToken.role === 'user') {
          navigate('/');
        } else {
          console.error('Login error: Unknown role');
        }
      } else {
        console.error('Login error: Response data or accessToken is undefined');
      }
    } catch (error) {
      console.error(`Error with Login Response ${error}`);
    }
  };

  const handleSpotifyLogin = () => {
    const clientId = '9bd3070452764186997a71265f233917';
    const scopes = 'user-read-email user-read-private';
    const redirectUrl = 'http://localhost:8000/auth/login/spotify/callback';
    console.log(redirectUrl);

    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUrl}`;
    
    
    const waitForCode = () => new Promise(resolve => {
        const checkForCode = () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');
            if (code) {
                resolve(code);
            } else {
                setTimeout(checkForCode, 100);
            }
        };

        checkForCode();
    });

    
    window.location.href = authUrl;

    
    waitForCode().then(async code => {
        console.log('Code:', code);

        try {
            
            const response = await axios.post('http://localhost:8000/auth/login/spotify/callback', { code });
            const accessToken = response.data;
            console.log('AccessToken:', accessToken);

            
            localStorage.setItem('accessToken', accessToken);

            
            window.location.href = '/';

        } catch (error) {
            console.error('Error handling Spotify login:', error);
        }
    });
  };


  const handleSpotifyCallback = useCallback(async () => {
    const code = extractCodeFromUrl();
  
    if (code) {
      try {
        const response = await axios.get(`http://localhost:8000/auth/login/spotify/callback?code=${code}`);
        const accessToken = response.data.accessToken;
  
        
        localStorage.setItem('accessToken', accessToken);
  
        
      } catch (error) {
        console.error('Error handling Spotify callback:', error);
      }
    } else {
      console.error('Code is missing');
    }
  }, []); 

  useEffect(() => {
    handleSpotifyCallback();
  }, [handleSpotifyCallback]);

  if (loggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className='flex'>
      <img src="./home.PNG" className='w-[440px]'/>
      <div className='flex flex-col bg-[#11012f] w-full items-center justify-center'>
        <h1 className="text-4xl text-bold text-white">LOGIN</h1>
        <span className="text-xs text-pink-500 mb-6">Welcome back lover !</span>
        <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 w-[388px] p-1 rounded-full mb-4">
            <div className="flex bg-[#020011] p-3 rounded-full w-[380px] justify-center space-x-8 text-white divide-x-[3px] divide-white">
              <label>E-mail</label>
              <input 
                type="email" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-[#020011]"
              />
            </div>
          </div>
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 w-[388px] p-1 rounded-full mb-4">
            <div className="flex bg-[#020011] p-3 rounded-full w-[380px] justify-center space-x-4 text-white divide-x-[3px] divide-white">
              <label>Password</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#020011]"
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <Link to="/">
              <span className="text-sm text-white hover:text-pink-500 p-4">Retour</span>
            </Link>
            <button onClick={handleLogin} className='rounded-full p-3 text-white bg-gradient-to-r from-pink-600 to-purple-600 w-[150px]'>Submit</button>
          </div>
        </form>
        <button onClick={handleSpotifyLogin} className="bg-[#1DB954] rounded-lg p-2 text-white" type="submit">
          Login with Spotify
        </button>
      </div>     
    </div>
  );
};

export default Login;
