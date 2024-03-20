import React, { useState } from 'react';

const Interest = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
};

    return (
        <div className='flex'>
        <img src="./home.PNG" className='w-[440px]'/>
        <div className='flex flex-col bg-[#11012f] w-full items-center justify-center'>
          <h1 className="text-4xl text-bold text-white">Likes, Interest</h1>
          <span className="text-xs text-pink-500 mb-6">Share your likes & passion with others</span>
        <form className="flex flex-col grid-cols-4">
        <label className={`p-4 w-[155px] rounded-full ${isChecked ? 'bg-[#020011] text-white border-pink-500 border' : 'bg-[#1b1142] text-violet-500'}`}>
            <input type="checkbox" value="photography" className="hidden appearance-none" onChange={handleCheckboxChange} checked={isChecked} />
            <div className='flex items-center'>
                <span className='text-xl mr-2'><ion-icon name="camera-outline"></ion-icon></span>
                <span className="flex-1">Photography</span>
            </div>
        </label>
        <label className={`p-4 w-[155px] rounded-full ${isChecked ? 'bg-[#020011] text-white border-pink-500 border' : 'bg-[#1b1142] text-violet-500'}`}>
            <input type="checkbox" value="cooking" className="hidden appearance-none" onChange={handleCheckboxChange} checked={isChecked} />
            <div className='flex items-center'>
                <span className='text-xl mr-2'><ion-icon name="camera-outline"></ion-icon></span>
                <span className="flex-1">Cooking</span>
            </div>
        </label>
        <label className={`p-4 w-[155px] rounded-full ${isChecked ? 'bg-[#020011] text-white border-pink-500 border' : 'bg-[#1b1142] text-violet-500'}`}>
            <input type="checkbox" value="video game" className="hidden appearance-none" onChange={handleCheckboxChange} checked={isChecked} />
            <div className='flex items-center'>
                <span className='text-xl mr-2'><ion-icon name="camera-outline"></ion-icon></span>
                <span className="flex-1">Video Game</span>
            </div>
        </label>
        <label className={`p-4 w-[155px] rounded-full ${isChecked ? 'bg-[#020011] text-white border-pink-500 border' : 'bg-[#1b1142] text-violet-500'}`}>
            <input type="checkbox" value="music" className="hidden appearance-none" onChange={handleCheckboxChange} checked={isChecked} />
            <div className='flex items-center'>
                <span className='text-xl mr-2'><ion-icon name="camera-outline"></ion-icon></span>
                <span className="flex-1">Music</span>
            </div>
        </label>
        <label className={`p-4 w-[155px] rounded-full ${isChecked ? 'bg-[#020011] text-white border-pink-500 border' : 'bg-[#1b1142] text-violet-500'}`}>
            <input type="checkbox" value="traveling" className="hidden appearance-none" onChange={handleCheckboxChange} checked={isChecked} />
            <div className='flex items-center'>
                <span className='text-xl mr-2'><ion-icon name="camera-outline"></ion-icon></span>
                <span className="flex-1">Traveling</span>
            </div>
        </label>
        <label className={`p-4 w-[155px] rounded-full ${isChecked ? 'bg-[#020011] text-white border-pink-500 border' : 'bg-[#1b1142] text-violet-500'}`}>
            <input type="checkbox" value="cooking" className="hidden appearance-none" onChange={handleCheckboxChange} checked={isChecked} />
            <div className='flex items-center'>
                <span className='text-xl mr-2'><ion-icon name="camera-outline"></ion-icon></span>
                <span className="flex-1">Cooking</span>
            </div>
        </label>
        </form>
        </div>     
      </div>
    );
  }
  
  export default Interest;