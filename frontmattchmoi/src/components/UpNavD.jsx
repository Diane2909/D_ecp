import { Link } from 'react-router-dom';
import { heart, chatbubble, notifications } from 'ionicons/icons';
import { IonIcon } from '@ionic/react'; 

export default function UpNav() {

  return (
    
    <nav className="flex flex-col w-full">
        <div className='flex justify-between'>
        <Link to="/home/love" className="flex p-4">
          <img src="/log1.png" className="h-[45px] " alt="logo"/>
          <img src="/log2.png" className="h-[45px] hover:scale-110 animate-pulse " alt="logo"/>
        </Link>
        <div className='text-violet-500 text-3xl flex p-6 space-x-12 mr-6 '>
        <Link to="/home/love">
        <button className='hover:text-white hover:scale-125'>
        <IonIcon icon={heart} />
        </button>
        </Link>
        <Link to="/home/chat">
        <button className='hover:text-white hover:scale-125'>
        <IonIcon icon={chatbubble} />
        </button>
        </Link>
        <Link to="/home/notification">
            <button className='hover:text-white hover:scale-125 relative'>
              <IonIcon icon={notifications} />
              <span className="absolute -top-1 -right-1 block h-2 w-2">
                <span className="absolute block h-2 w-2 rounded-full bg-white opacity-75 animate-ping"></span>
                <span className="absolute block h-2 w-2 rounded-full bg-white"></span>
              </span>
            </button>
          </Link>
        </div>
        </div>
    </nav>
  );
}