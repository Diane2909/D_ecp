import MattchList from "../components/MattchList";
import UsersList from "../components/UsersListD";

export default function MyAdmin() {
  return (
    <div className="flex justify-center items-center">
      <div className=" bg-[#020011] w-[850px] h-[440px] flex flex-col rounded-lg justify-center items-center border-4 border-pink-600">
        <h1 className="text-white text-xl text-bold" >MY ADMIN</h1>
        <span className="text-xs text-pink-500">
          Take control of the mattch
        </span>
        <div className="flex mt-3 space-x-2">

          <div className="bg-gradient-to-b from-[#1b1142] to-[#020011] rounded-lg w-[400px] h-[350px] p-3 overflow-y-auto scrollbar-none">
          <h2 className="mb-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white p-3 w-[80px] items-center flex justify-center rounded-full">Users</h2>
          <div className="flex items-center">
           <UsersList/>
          </div>
          </div>
          
          <div className="bg-gradient-to-b from-[#1b1142] to-[#020011] rounded-lg w-[400px] h-[350px] p-3 overflow-y-auto scrollbar-none">
          <h2 className="mb-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white p-3 w-[80px] items-center flex justify-center rounded-full">Mattch</h2>
          <div className="flex items-center">
          <MattchList/>
          </div>
          </div>

        </div>
      </div>
    </div>
  );
}
