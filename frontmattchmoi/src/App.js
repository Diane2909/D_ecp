import { Outlet } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="flex">
      <img src="./home.PNG" className="w-[440px]" />
      <div className="flex flex-col bg-[#11012f] w-full items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
