import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Register from "./pages/RegisterD";
import Login from "./pages/LoginD";
import MyAdmin from "./pages/MyAdminD";
import { AuthProvider } from "./Authcontext";
import App from "./App";
import Home from "./pages/HomeD";
import Interest from "./pages/InterestD";
import Profil from "./pages/ProfilD";
import Acc from "./pages/AccD";
import Filter from "./pages/FilterD";
import ProfilUser from "./pages/ProfilUserD";
import Setting from "./pages/SettingD";
import PageLove from "./pages/PageLoveD";
import Chat from "./pages/ChatD";
import MattchPage from "./pages/MattchPageD";
import { ToastContainer } from "react-toastify";
import { Slide } from "react-toastify";
import './toastStyles.css';
import Notif from "./pages/Notif";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/interest",
    element: <Interest/>
  },
  {
    path: "my-admin",
    element: (
      <div>
        <App />
      </div>
    ),
    children: [
      {
        path: "/",
        element: <Acc />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "/profil",
        element: <Profil />,
      },
      {
        path: "/interest",
        element: <Interest />,
      },
      {
        path: "/filter",
        element: <Filter />,
      },
    ],
  },

  {
    path: "home",
    element: (
      <div>
        <Home />
      </div>
    ),
    children: [
      {
        path: "love",
        element: <PageLove />,
      },
      {
        path: "profil-user",
        element: <ProfilUser />,
      },
      {
        path: "setting",
        element: <Setting />,
      },
      {
        path: "chat",
        element: <Chat />,
      },
      {
        path: "my-admin",
        element: <MyAdmin />,
      },
      {
        path: "mattch",
        element: <MattchPage />,
      },
      {
        path: "notification",
        element: <Notif />,
      },
    ],
  },
  // {
  //   path: "my-admin",
  //   element: (
  //     <div>
  //       <MyAdmin />
  //     </div>
  //   ),
  //   children: [
  //     {
  //       path: "users",
  //       element: <AdminUsers />,
  //     },
  //     {
  //       path: "dashboard",
  //       element: <AdminDashboard />,
  //     },
  //   ],
  // },
]);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
        transition={Slide}
        toastClassName="toast-success"
      />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
