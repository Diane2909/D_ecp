import React, { useState, useEffect } from "react";
import axios from "axios";
import CardInfoProfil from "../components/CardInfoProfilD";
import { toast } from 'react-toastify';
import { IonIcon } from '@ionic/react';
import { add, heart, person, trashOutline } from 'ionicons/icons';

function ProfilUser() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    name: "",
    description: "",
    password: "",
    age: "",
    gender: "",
  });

  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          console.log("error user identifier");
          return;
        }

        const response = await axios.get("http://localhost:8000/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userProfile = response.data;
        userProfile.password = "";
        console.log("user profile :", userProfile);
        setUserInfo(userProfile);
        setImageUrl(userProfile.profileImageUrl);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem("accessToken");
  
      if (!token) {
        console.log("error user identifier");
        return;
      }
  
      const { _id, role, password: newPassword, ...updatedUserInfo } = userInfo;
      const userId = userInfo._id;
      console.log("userID :", userId);
  
      const requestBody = {
        ...updatedUserInfo,
      };

      if (userInfo.password != "") {
        requestBody.password = userInfo.password;
      }
      console.log('request', requestBody);
      await axios.patch(`http://localhost:8000/users/${userId}`, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Profile updated successfully", {
        icon: <IonIcon icon={heart} />,
      });
      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  
  const handleImageUpload = async (event) => {
    const imageFile = event.target.files[0];
    const formData = new FormData();
    formData.append('file', imageFile);
  
    const userDataString = localStorage.getItem("user");
    console.log("Contenu du localStorage (user):", userDataString);
  
    if (!userDataString) {
      console.error("Aucune donnée utilisateur trouvée dans le localStorage");
      return;
    }
  
    const userData = JSON.parse(userDataString);
    console.log("Données utilisateur:", userData);
  
    const userId = userData.user._id;
    console.log("ID de l'utilisateur:", userId);
  
    if (!userId) {
      console.error("ID de l'utilisateur non trouvé dans les données utilisateur");
      return;
    }
  
    try {
      const response = await axios.post(
        `http://localhost:8000/users/upload-profile-image/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      let imageUrl;
      if (response.data) {
        imageUrl = response.data;
      } else if (response.data && response.data.imageUrl) {
        imageUrl = response.data.imageUrl;
      } else {
        console.error("L'URL de l'image n'a pas été renvoyée dans la réponse.");
        return;
      }
      setImageUrl(imageUrl);
      console.log('Image uploaded successfully:', imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }    
  };
  
  
  

  
  
  

  return (
    <div className="flex">
      <div className="flex flex-col bg-[#11012f] w-full items-center justify-center">
        <h1 className="text-4xl text-bold text-white">UPDATE PROFILE</h1>
        <span className="text-xs text-pink-500 mb-4">
          Personalise your profile as you feel
        </span>
        <form className="flex flex-col items-center">
          <div className="relative flex w-[92px] mb-6">
            <div className="flex items-stretch space-x-2">
                <div>
                    
              <div className="image-preview">
                
              </div>
            {imageUrl && (
            <div className="flex mr-2 bg-[#1b1142] p-3 justify-center space-x-8 w-[80px] h-[80px] items-center border-4 border-white relative">
              <img src={imageUrl} alt="Profile" className="object-cover" />
            </div>
            )}
            <div className="absolute -top-3 -right-1 flex bg-gradient-to-r from-pink-600 to-purple-600 p-3 rounded-full justify-center space-x-8 w-[32px] h-[32px] items-center justify-center border-4 border-[#11012f] ">
              <button className="text-sm text-white">
              <IonIcon icon={trashOutline} />
              </button>
            </div>
            <div className="absolute -bottom-3 -right-1 flex bg-gradient-to-r from-pink-600 to-purple-600 p-3 rounded-full justify-center space-x-8 w-[32px] h-[32px] items-center justify-center border-4 border-[#11012f] ">
              <label htmlFor="image-upload" className="text-sm text-white cursor-pointer">
              <IonIcon icon={add} />
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
            </div>
            </div>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="flex flex-col items-center">
              <div className="bg-gradient-to-r from-pink-600 to-purple-600 w-[288px] p-1 rounded-full mb-4">
                <div className="flex bg-[#020011] p-4 rounded-full w-[280px] text-white">
                  <input
                    placeholder="Email"
                    type="email"
                    className="bg-[#020011] w-full h-full text-white"
                    value={userInfo.email}
                    readOnly
                  />
                </div>
              </div>
              <div className="bg-gradient-to-r from-pink-600 to-purple-600 w-[288px] p-1 rounded-full mb-4">
                <div className="flex bg-[#020011] p-4 rounded-full w-[280px] text-white">
                  <input
                    placeholder="Name"
                    type="text"
                    className="bg-[#020011] w-full h-full text-white"
                    value={userInfo.name}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, name: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="bg-gradient-to-r from-pink-600 to-purple-600 w-[288px] p-1 rounded-full mb-4">
                <div className="flex bg-[#020011] p-4 rounded-full w-[280px] text-white">
                  <input
                    placeholder="Description"
                    type="text"
                    className="bg-[#020011] w-full h-full text-white"
                    value={userInfo.description}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, description: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-gradient-to-r from-pink-600 to-purple-600 w-[288px] p-1 rounded-full mb-4">
                <div className="flex bg-[#020011] p-4 rounded-full w-[280px] text-white">
                  <input
                    placeholder="Password"
                    type="password"
                    className="bg-[#020011] w-full h-full text-white"
                    value={userInfo.password}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, password: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="bg-gradient-to-r from-pink-600 to-purple-600 w-[288px] p-1 rounded-full mb-4">
                <div className="flex bg-[#020011] p-4 rounded-full w-[280px] text-white">
                  <input
                    placeholder="Age"
                    type="number"
                    className="bg-[#020011] w-full h-full text-white"
                    value={userInfo.age}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, age: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="bg-gradient-to-r from-pink-600 to-purple-600 w-[288px] p-1 rounded-full mb-4">
                <div className="flex bg-[#020011] p-4 rounded-full w-[280px] ">
                  <select
                    name="gender"
                    className="bg-[#020011] w-full h-full text-white"
                    value={userInfo.gender}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, gender: e.target.value })
                    }
                  >
                    <option value="" aria-placeholder="Gender" disabled>
                      Gender
                    </option>
                    <option value="WOMEN">Women</option>
                    <option value="MEN">Men</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={handleUpdateProfile}
              className="rounded-full p-3 text-white bg-gradient-to-r from-pink-600 to-purple-600 w-[150px]"
              type="button"
            >
              Update
            </button>
          </div>
        </form>
        {/* {imageUrl && <img src={imageUrl} alt="" />} */}
      </div>
        <CardInfoProfil imageUrl={imageUrl} userInfo={userInfo} />
    </div>
  );
}

export default ProfilUser;
