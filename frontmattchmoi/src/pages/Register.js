import { Link } from 'react-router-dom';

function Register() {
    return (
      <div className='flex'>
        <img src="./home.PNG" className='w-[440px]'/>
        <div className='flex flex-col bg-[#11012f] w-full items-center justify-center'>
          <h1 className="text-4xl text-bold text-white"> REGISTER</h1>
          <span className="text-xs text-pink-500 mb-6"> Ready to find love ?</span>
          <form className="flex flex-col">
            <div className="bg-gradient-to-r from-pink-600 to-purple-600 w-[388px] p-1 rounded-full mb-4">
            <div className="flex bg-[#020011] p-3 rounded-full w-[380px] justify-center space-x-8 text-white divide-x-[3px] divide-white">
                <label>Name</label>
                <input type="text" className="bg-[#020011]"/>
            </div>
            </div>
            <div className="bg-gradient-to-r from-pink-600 to-purple-600 w-[388px] p-1 rounded-full mb-4">
            <div className="flex bg-[#020011] p-3 rounded-full w-[380px] justify-center space-x-8 text-white divide-x-[3px] divide-white">
                <label>E-mail</label>
                <input type="email" className="bg-[#020011]"/>
            </div>
            </div>
            <div className="bg-gradient-to-r from-pink-600 to-purple-600 w-[388px] p-1 rounded-full mb-4">
            <div className="flex bg-[#020011] p-3 rounded-full w-[380px] justify-center space-x-4 text-white divide-x-[3px] divide-white">
                <label>Password</label>
                <input type="password" className="bg-[#020011]"/>
            </div>
            </div>
            <div className="flex justify-between items-center">
            <Link to="/">
            <span className="text-sm text-white hover:text-pink-500 p-4">retour</span>
            </Link>
            <Link to="/interest">
            <button className='rounded-full p-3 text-white bg-gradient-to-r from-pink-600 to-purple-600 w-[150px]'>Submit</button>
            </Link>
            </div>
          </form>
        </div>     
      </div>
    );
  }
  
  export default Register;