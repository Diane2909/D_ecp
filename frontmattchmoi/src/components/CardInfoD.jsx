import React, { useEffect, useState } from "react";
import { IonIcon } from "@ionic/react";
import { location } from 'ionicons/icons';
import "@ionic/react/css/core.css";
import axios from "axios";

function CardInfo({userInfo}) {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:8000/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        const { data } = response;
        const profileImageUrl = data.profileImageUrl;
        setImageUrl(profileImageUrl);
        console.log(profileImageUrl);
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'URL de l\'image:', error);
      }
    };    
    fetchImageUrl();
  }, []);

  return (
    <div className="bg-[#1b1142] w-[300px] h-[440px] flex flex-col rounded-xl border-4 border-white relative">
      {imageUrl && (
        <div>
          <img src={userInfo.profileImageUrl} alt="Profile"  className="object-cover w-[300px] h-[230px] bg-top rounded-lg shadow-xl"/>
        </div>
      )}
      <div className="p-4">
      <div className="flex justify-between items-center justify-center">
      <h1 className="text-white text-2xl font-bold">{userInfo.name}</h1>
      <span className="text-white text-lg bg-gradient-to-r from-pink-600 to-purple-600 p-1 w-[40px] items-center justify-center flex rounded-xl">{userInfo.age}</span>
      </div>
        <div className="flex flex-col">
      <span className="text-pink-500 text-sm">{userInfo.gender}</span>
      <label className="text-sm text-violet-500">Description :</label>
      <p className="text-white text-sm">{userInfo.description}</p>
      <div className="flex flex-col">
      <label className="text-sm text-violet-500">Interest :</label>
      <div className="flex text-white text-sm space-x-1 opacity-65">
      <span>{userInfo.interests}</span>
      </div>
      </div>
      <div className="space-x-1 text-pink-500 text-sm">
      <IonIcon icon={location} />
      <span>{userInfo.location}</span>
      </div>
      </div>
      </div>
    </div>
  );
}

export default CardInfo;
