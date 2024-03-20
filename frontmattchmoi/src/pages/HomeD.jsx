import { Link, Navigate, Outlet } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import SideNav from '../components/SideNavD';
import UpNav from '../components/UpNavD';

function Home() {
  
  return (
    <div className='bg-[#11012f] w-full flex flex-col'>
      <UpNav/>
      <div className='flex'>
      <SideNav/>
      <div className='flex w-full justify-center items-center'>
      <Outlet/>
      </div>
      </div>
    </div>
  );
}

export default Home;