import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StepFour = ({ onComplete }) => {
  const navigate = useNavigate();

  const [hereTo, setHereTo] = useState("");
  const [wantToMeet, setWantToMeet] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [location, setLocation] = useState("");

  const handleWantToMeetChange = (value) => {
    setWantToMeet(value);
  };

  const handleRegister = async () => {
    if (!hereTo || !wantToMeet || !ageRange || !location) {
      toast.warning("Please fill in all fields", {
        position: "top-right",
      });
      return;
    }

    const userId = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))._id
      : null;
    const token = localStorage.getItem("accessToken");

    if (!userId || !token) {
      console.error("User ID or access token is missing");
      return;
    }

    try {
      const response = await axios.patch(
        `http://localhost:8000/auth/register-step-four/${userId}`,
        {
          hereTo,
          wantToMeet,
          ageRange,
          location,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Registration successful:", response.data);
      onComplete();
      navigate("/home/love");
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
        <h1 className="text-4xl font-bold text-white">FILTER OPTIONS</h1>
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
                    value={hereTo}
                    onChange={(e) => setHereTo(e.target.value)}
                  >
                    <option value="">Select</option>
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
                    value={wantToMeet}
                    onChange={(e) => handleWantToMeetChange(e.target.value)}
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
                    value={ageRange}
                    onChange={(e) => setAgeRange(e.target.value)}
                  >
                    <option value="">Select</option>
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
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

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

export default StepFour;
