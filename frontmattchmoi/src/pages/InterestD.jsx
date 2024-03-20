import React, { useState } from "react";
import { Link } from "react-router-dom";

const Interest = () => {
  const [selectedInterests, setSelectedInterests] = useState([]);

  const handleCheckboxChange = (interest) => {
    setSelectedInterests((prevInterests) => {
      if (prevInterests.includes(interest)) {
        return prevInterests.filter((selected) => selected !== interest);
      } else {
        return [...prevInterests, interest];
      }
    });
  };

  const interestOptions = [
    { value: "photography", icon: "camera-outline", label: "Photography" },
    { value: "cooking", icon: "restaurant-outline", label: "Cooking" },
    {
      value: "videoGame",
      icon: "game-controller-outline",
      label: "Video Game",
    },
    { value: "music", icon: "musical-notes-outline", label: "Music" },
    { value: "traveling", icon: "airplane-outline", label: "Traveling" },
    { value: "shopping", icon: "pricetag-outline", label: "Shopping" },
    { value: "artCraft", icon: "color-palette-outline", label: "Art & Craft" },
    { value: "swimming", icon: "water-outline", label: "Swimming" },
    { value: "drinking", icon: "wine-outline", label: "Drinking" },
    { value: "extremeSport", icon: "bicycle-outline", label: "Extreme Sport" },
    { value: "fitness", icon: "barbell-outline", label: "Fitness" },
    { value: "animal", icon: "paw-outline", label: "Animal" },
  ];

  return (
    <div className="flex">
      <div className="flex flex-col bg-[#11012f] w-full items-center justify-center">
        <h1 className="text-4xl font-bold text-white">Likes, Interest</h1>
        <span className="text-xs text-pink-500 mb-6">
          Share your likes & passion with others
        </span>
        <form className="grid grid-cols-4 gap-4">
          {interestOptions.map(({ value, icon, label }) => (
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
                onChange={() => handleCheckboxChange(value)}
                checked={selectedInterests.includes(value)}
              />
              <div className="flex items-center">
                <span className="text-xl mr-2">
                  <ion-icon name={icon}></ion-icon>
                </span>
                <span className="flex-1">{label}</span>
              </div>
            </label>
          ))}
        </form>
        <div className="flex justify-center items-center w-full gap-6 mt-6">
          <Link to="/profil">
            <span className="text-sm text-white hover:text-pink-500 p-4">
              retour
            </span>
          </Link>
          <Link to="/filter">
            <button
              //   onClick={handleRegister}
              className="rounded-full p-3 text-white bg-gradient-to-r from-pink-600 to-purple-600 w-[150px]"
              type="button"
            >Continue
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Interest;
