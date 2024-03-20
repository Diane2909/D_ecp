import React, { useEffect, useState } from "react";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { IonIcon } from '@ionic/react';
import { heart } from 'ionicons/icons';

function Setting() {
  const [userInfo, setUserInfo] = useState({
    hereTo: "",
    wantToMeet: "",
    ageRange: "",
    location: "",
  });

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
        console.log("user profile :", userProfile);
        setUserInfo(userProfile);
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
      
      const { _id, role, password, ...updatedUserInfo } = userInfo;
      const userId = userInfo._id;
      console.log("userID :", userId);

      const requestBody = {
        ...updatedUserInfo,
      };
  
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

  return (
    <div className="flex">
      <div className="flex flex-col bg-[#11012f] w-full items-center justify-center">
        <h1 className="text-4xl text-bold text-white">SETTING OPTIONS</h1>
        <span className="text-xs text-pink-500 mb-6">
          Set your preferences to find the best matches for you
        </span>
        <form>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-pink-500 text-xs ml-7">Here to</label>
              <div className="bg-gradient-to-r from-pink-600 to-purple-600 w-[338px] p-1 rounded-full mb-4">
                <div className="flex bg-[#020011] p-4 rounded-full w-[330px] ">
                  <select
                    name="hereTo"
                    className="bg-[#020011] w-full h-full text-white"
                    value={userInfo.hereTo}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, hereTo: e.target.value })
                    }
                  >
                    <option value="FRIENDS">Make Friends</option>
                    <option value="LOVE">Make Love</option>
                    <option value="BOTH">Both</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="text-pink-500 text-xs ml-7">Want To Meet</label>
              <div className="bg-gradient-to-r from-pink-600 to-purple-600 w-[338px] p-1 rounded-full mb-4">
                <div className="flex bg-[#020011] p-4 rounded-full w-[330px] ">
                  <select
                    name="wantToMeet"
                    className="bg-[#020011] w-full h-full text-white"
                    value={userInfo.wantToMeet}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, wantToMeet: e.target.value })
                    }
                  >
                    <option value="WOMEN">Women</option>
                    <option value="MEN">Men</option>
                    <option value="BOTH">Both</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="text-pink-500 text-xs ml-7">Age Range</label>
              <div className="bg-gradient-to-r from-pink-600 to-purple-600 w-[338px] p-1 rounded-full mb-4">
                <div className="flex bg-[#020011] p-4 rounded-full w-[330px] ">
                  <select
                    name="ageRange"
                    className="bg-[#020011] w-full h-full text-white"
                    value={userInfo.ageRange}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, ageRange: e.target.value })
                    }
                  >
                    <option value="18-25">18-25</option>
                    <option value="20-35">20-35</option>
                    <option value="30-55">30-55</option>
                    <option value="40-60">40-60</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="text-pink-500 text-xs ml-7">Location</label>
              <div className="bg-gradient-to-r from-pink-600 to-purple-600 w-[338px] p-1 rounded-full mb-4">
                <div className="flex bg-[#020011] p-4 rounded-full w-[330px] ">
                  <input
                    type="text"
                    placeholder="Location"
                    className="bg-[#020011] w-full h-full text-white"
                    value={userInfo.location}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, location: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center w-full gap-6 mt-6">            
              <button
              onClick={handleUpdateProfile}
                className="rounded-full p-3 text-white bg-gradient-to-r from-pink-600 to-purple-600 w-[150px]"
                type="button"
              >
                Update
              </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Setting;
