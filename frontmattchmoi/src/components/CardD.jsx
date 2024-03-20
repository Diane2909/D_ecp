import React from "react";

function Card({user}) {
  return (
    <div className="bg-[#1b1142] w-[300px] h-[370px] flex flex-col rounded-xl border-4 border-white relative">
      <img
        src={user.profileImageUrl || "/image.png"}
        className="object-cover w-[300px] h-[362px] rounded-lg"
        alt="user"
      />
      <div className="absolute bottom-0 left-0 p-4">
        <h1 className="text-white text-xl font-bold">{user.name}</h1>
        <div className="text-white flex justify-center items-center space-x-2">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <span>{user.gender}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
