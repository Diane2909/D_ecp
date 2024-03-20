import { Link } from 'react-router-dom';

function Acc() {
  return (
      <div className='flex flex-col bg-[#11012f] w-full items-center justify-center'>
        <span className='text-pink-500 text-xl'>Online Datting App</span>
        <h1 className='text-bold text-white text-4xl mb-3'>FIND YOUR BEST MATTCH</h1>
        <Link to="/register">
      <button className='rounded-full p-3 text-white bg-gradient-to-r from-pink-600 to-purple-600 mb-5 w-[370px]'>REGISTER</button>
      </Link>
      <Link to="/login">
      <button className='rounded-full p-3 text-white bg-gradient-to-r from-pink-600 to-purple-600 w-[370px]'>LOGIN</button>
      </Link>
      </div>
   
  );
}

export default Acc;