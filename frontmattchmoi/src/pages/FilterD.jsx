import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

function Filter() {

  return (
    <div className="flex">
      <div className="flex flex-col bg-[#11012f] w-full items-center justify-center">
        <h1 className="text-4xl text-bold text-white">FILTER OPTIONS</h1>
        <span className="text-xs text-pink-500 mb-6">
        Set your preferences to find the best matches for you
        </span>
        <form >
        <div className="grid grid-cols-2 gap-4">          
          <div>
        <label className="text-pink-500 text-xs ml-7">Here to</label>
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 w-[338px] p-1 rounded-full mb-4">
            <div className="flex bg-[#020011] p-4 rounded-full w-[330px] ">
              <select name="hereTo" className="bg-[#020011] w-full h-full text-white">
                <option value="makeFriends">Make Friends</option>
                <option value="makeLove">Make Love</option>
                <option value="makeSex">Both</option>
              </select>
            </div>
          </div>
          </div>

          <div>
        <label className="text-pink-500 text-xs ml-7">Want To Meet</label>
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 w-[338px] p-1 rounded-full mb-4">
            <div className="flex bg-[#020011] p-4 rounded-full w-[330px] ">
              <select name="wantToMeet" className="bg-[#020011] w-full h-full text-white">
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="both">Both</option>
              </select>
            </div>
          </div>
          </div>

          <div>
        <label className="text-pink-500 text-xs ml-7">Age Range</label>
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 w-[338px] p-1 rounded-full mb-4">
            <div className="flex bg-[#020011] p-4 rounded-full w-[330px] ">
              <select name="ageRange" className="bg-[#020011] w-full h-full text-white">
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
              <input type="text" placeholder="Location" className="bg-[#020011] w-full h-full text-white"/>
            </div>
          </div>
          </div>
          </div>
          
          <div className="flex justify-center items-center w-full mt-6">
            
              <button
  
                className="rounded-full p-3 text-white bg-gradient-to-r from-pink-600 to-purple-600 w-[150px]"
                type="button"
              >
                Continue
              </button>
           
          </div>
        </form>
      </div>
    </div>
  );
}

export default Filter;
