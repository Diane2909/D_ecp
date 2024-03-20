import React from "react";

function Chat() {
  return (
    <div className="bg-[#11012f] flex flex-col">
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 w-[888px] h-[438px] p-1 rounded-lg mb-4">
        <div className="flex bg-[#020011] p-3 rounded-lg w-[880px] h-[430px] justify-center ">

          <div className="bg-gradient-to-r from-pink-600 to-purple-600 w-full h-[48px] p-1 rounded-lg mb-4">
            <div className="flex bg-[#020011] rounded-lg w-full h-[40px] justify-center items-center">
                <input type="text" className="w-full text-white bg-[#020011] p-2 rounded-lg"/>
                <button className="p-5 bg-gradient-to-r from-pink-600 to-purple-600 w-[100px] h-[40px] flex items-center justify-center text-white rounded-lg">Send</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Chat;
