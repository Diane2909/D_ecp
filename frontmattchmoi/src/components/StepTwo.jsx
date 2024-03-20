import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { camera, person } from "ionicons/icons";
import { IonIcon } from '@ionic/react'; 

const StepTwo = ({ onNext }) => {
  const [picture, setPicture] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const handleAgeChange = (e) => {
    const newAge = parseInt(e.target.value, 10);
    if (newAge >= 18 && newAge <= 100) {
      setAge(newAge);
    } else {
      console.error('L\'âge doit être compris entre 18 et 100 ans.');
    }
  };
  const handleRegister = async () => {

    if (!name || !description || !age || !gender) {
      toast.warning('Please fill in all fields', {
        position: "top-right"
      });
      return;
    }
    
    const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))._id : null;
    const token = localStorage.getItem('accessToken');
    console.log('User ID:', userId);
    console.log('Token:', token);
    console.log(age);
    if (age < 18 || age > 100) {
      console.error('L\'âge fourni est invalide.');
      return;
    }

    if (!userId || !token) {
      console.error("User ID or access token is missing");
      return;
    }

    try {
      const response = await axios.patch(`http://localhost:8000/auth/register-step-two/${userId}`, {
        name,
        description,
        age: parseInt(age),
        gender,
      }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Registration successful:", response.data);
      onNext();
    } catch (error) {
      console.error(
        "Registration error:",
        error.response ? error.response.data : error
      );
    }
  };

 return (
    <div className="flex">
      <div className="flex flex-col bg-[#11012f] w-full items-center justify-center">
        <h1 className="text-4xl font-bold text-white">PROFILE DETAILS</h1>
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-[#020011] w-full h-full text-white"
                required
              />
            </div>
          </div>

          <div className="bg-gradient-to-r from-pink-600 to-purple-600 w-[388px] p-1 rounded-full mb-4">
            <div className="flex bg-[#020011] p-4 rounded-full w-[380px] text-white">
              <input
                placeholder="Description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-[#020011] w-full h-full text-white"
                required
              />
            </div>
          </div>

          <div className="bg-gradient-to-r from-pink-600 to-purple-600 w-[388px] p-1 rounded-full mb-4">
            <div className="flex bg-[#020011] p-4 rounded-full w-[380px] text-white">
              <input
                placeholder="Age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="bg-[#020011] w-full h-full text-white"
                required
                min="18"
                max="100"
              />
            </div>
          </div>

          <div className="flex mb-4">
            <div className="flex">
              <label className="text-white mr-4 bg-gradient-to-r from-pink-600 to-purple-600 p-4 rounded-full flex items-center justify-center w-[100px]">
                <input
                  type="radio"
                  name="gender"
                  value="MEN"
                  checked={gender === 'MEN'}
                  onChange={() => setGender('MEN')}
                />
                Men
              </label>
              <label className="text-white bg-gradient-to-r from-pink-600 to-purple-600 p-4 rounded-full flex items-center justify-center w-[100px]">
                <input
                  type="radio"
                  name="gender"
                  value="WOMEN"
                  checked={gender === 'WOMEN'}
                  onChange={() => setGender('WOMEN')}
                />
                Women
              </label>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              className="rounded-full p-3 text-white bg-gradient-to-r from-pink-600 to-purple-600 w-[150px]"
              type="button"
              onClick={handleRegister}
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StepTwo;
