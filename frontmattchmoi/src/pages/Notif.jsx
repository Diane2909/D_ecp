import {notificationsOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react'; 

export default function Notif() {
  return (
    <div className="flex justify-center items-center">
      <div className=" bg-[#020011] w-[700px] h-[440px] flex flex-col rounded-lg justify-center items-center border-4 border-pink-500">
        <h1 className="text-white text-xl text-bold" >NOTIFICATION</h1>
        <span className="text-xs text-pink-500">
          Check out notifications & say goodbye
        </span>
        <div className="flex mt-3">          
          <div className="bg-gradient-to-b from-[#1b1142] to-[#020011] rounded-lg w-[550px] h-[350px] p-3">
          <h2 className="mb-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white p-3 w-[80px] items-center flex justify-center rounded-full">Notif</h2>
            <div className="space-y-2">
            <div className="flex items-center shadow-xl rounded-full p-3">
          <div className="rounded-full mr-2 bg-gradient-to-r from-[#020011] to-violet-950 text-white w-[50px] h-[50px] items-center justify-center flex text-lg">
          <IonIcon icon={notificationsOutline} />
            </div>
            <div className='flex'>
          <p className="text-white mr-1"><span className='text-pink-500'>Matthieu</span>, on t'invite à regarder dans le tiroir du bureau</p>
          </div>
          </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
