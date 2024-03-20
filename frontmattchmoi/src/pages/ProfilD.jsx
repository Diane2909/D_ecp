import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { person, camera } from 'ionicons/icons';
import { IonIcon } from '@ionic/react'; 

function Profil() {
  //   const [username, setName] = useState('');
  //   const [email, setEmail] = useState('');
  //   const [password, setPassword] = useState('');
  //   const [isRegistered, setIsRegistered] = useState(false);
  //   const navigate = useNavigate();

  //   const handleRegister = async () => {
  //     try {
  //       const response = await axios.post('http://localhost:8000/auth/register', {
  //         username,
  //         email,
  //         password,
  //       });

  //       console.log('Registration successful:', response.data);
  //       setIsRegistered(true);
  //     } catch (error) {
  //       console.error('Registration error:', error);
  //     }
  //   };

  //   if (isRegistered) {
  //     navigate('/interest');
  //   }

  return (
    <div className="flex">
      <div className="flex flex-col bg-[#11012f] w-full items-center justify-center">
        <h1 className="text-4xl text-bold text-white">PROFILE DETAILS</h1>
        <span className="text-xs text-pink-500 mb-4">
          Fill up the following details
        </span>
        <form className="flex flex-col items-center">
          <div className="relative flex w-[92px] mb-6">
            <div className="flex bg-[#1b1142] p-3 rounded-full justify-center space-x-8 w-[92px] h-[92px] items-center border-4 border-white relative">
              <span className="text-4xl text-violet-500">
              <IonIcon icon={person} />
              </span>
            </div>
            <div className="absolute -bottom-3 right-0 flex bg-gradient-to-r from-pink-600 to-purple-600 p-3 rounded-full justify-center space-x-8 w-[42px] h-[42px] items-center justify-center border-4 border-[#11012f] ">
              <button className="text-lg text-white">
              <IonIcon icon={camera} />
              </button>
            </div>
          </div>
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 w-[388px] p-1 rounded-full mb-4">
            <div className="flex bg-[#020011] p-4 rounded-full w-[380px] text-white">
              <input
                placeholder="Name"
                type="text"
                className="bg-[#020011] w-full h-full text-white"
              />
            </div>
          </div>
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 w-[388px] p-1 rounded-full mb-4">
            <div className="flex bg-[#020011] p-4 rounded-full w-[380px] text-white">
              <input
                placeholder="Description"
                type="text"
                className="bg-[#020011] w-full h-full text-white"
              />
            </div>
          </div>
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 w-[388px] p-1 rounded-full mb-4">
            <div className="flex bg-[#020011] p-4 rounded-full w-[380px] text-white">
              <input
                placeholder="Age"
                type="number"
                className="bg-[#020011] w-full h-full text-white"
              />
            </div>
          </div>
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 w-[388px] p-1 rounded-full mb-4">
            <div className="flex bg-[#020011] p-4 rounded-full w-[380px] ">
              <select name="gender" className="bg-[#020011] w-full h-full text-white">
                <option value="" aria-placeholder="Gender" disabled>Gender</option>
                <option value="women">Women</option>
                <option value="men">Men</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <Link to="/interest">
              <button
                className="rounded-full p-3 text-white bg-gradient-to-r from-pink-600 to-purple-600 w-[150px]"
                type="button"
              >
                Continue
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profil;
