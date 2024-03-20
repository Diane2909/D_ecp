import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { musicalNotesOutline, filmOutline, cameraOutline, restaurantOutline, gameControllerOutline, airplaneOutline, pricetagOutline, colorPaletteOutline, waterOutline, wineOutline, barbellOutline, pawOutline } from "ionicons/icons";
import { IonIcon } from '@ionic/react'; 

const StepThree = ({ onNext }) => {
  const allInterests = [
    { value: "Musique", icon: musicalNotesOutline, label: "Musique" },
    { value: "Cinéma", icon: filmOutline, label: "Cinéma" },
    { value: "Photography", icon: cameraOutline, label: "Photography" },
    { value: "Cooking", icon: restaurantOutline, label: "Cooking" },
    { value: "VideoGame", icon: gameControllerOutline, label: "VideoGame" },
    { value: "Traveling", icon: airplaneOutline, label: "Traveling" },
    { value: "Shopping", icon: pricetagOutline, label: "Shopping" },
    { value: "ArtCraft", icon: colorPaletteOutline, label: "ArtCraft" },
    { value: "Swimming", icon: waterOutline, label: "Swimming" },
    { value: "Drinking", icon: wineOutline, label: "Drinking" },
    { value: "Fitness", icon: barbellOutline, label: "Fitness" },
    { value: "Animal", icon: pawOutline, label: "Animal" }
  ];

  const [selectedInterests, setSelectedInterests] = useState([]);

  const handleInterestChange = (interest) => {
    setSelectedInterests((prevInterests) => {
      if (prevInterests.includes(interest)) {
        return prevInterests.filter((selected) => selected !== interest);
      } else {
        return [...prevInterests, interest];
      }
    });
  };

  const handleRegister = async () => {
    
    if (selectedInterests.length === 0) {
      toast.warning('Please select at least one interest', {
        position: "top-right"
      });
      return;
    }

    const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))._id : null;
    const token = localStorage.getItem('accessToken');
    
    if (!userId || !token) {
      console.error('User ID or access token is missing');
      return;
    }
  
    try {
      const response = await axios.patch(`http://localhost:8000/auth/register-step-three/${userId}`, {
        interests: selectedInterests,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log('Registration successful:', response.data);
      onNext();
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error);
    }
  };

  return (
    <div className="flex">
      <div className="flex flex-col bg-[#11012f] w-full items-center justify-center">
        <h1 className="text-4xl font-bold text-white">Likes, Interest</h1>
        <span className="text-xs text-pink-500 mb-6">
          Share your likes & passion with others
        </span>
        <form className="grid grid-cols-4 gap-4">
          {allInterests.map(({ value, icon, label }) => (
            <label
              key={value}
              className={`p-4 rounded-full ${
                selectedInterests.includes(value)
                  ? "bg-[#020011] text-white border-pink-500 border"
                  : "bg-[#1b1142] text-violet-500 border-[#1b1142] border"
              }`}
            >
              <input
                type="checkbox"
                value={value}
                className="hidden appearance-none"
                onChange={() => handleInterestChange(value)}
                checked={selectedInterests.includes(value)}
              />
              <div className="flex items-center justify-center text-center">
                <span className="text-xl mr-2">
                <IonIcon icon={icon} />
                </span>
                <span className="flex-1 ">{label}</span>
              </div>
            </label>
          ))}
          <div className="flex justify-center items-center w-full mt-6">
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

export default StepThree;
