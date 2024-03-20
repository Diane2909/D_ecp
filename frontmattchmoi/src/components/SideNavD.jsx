import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  person,
  heartHalfOutline,
  settingsOutline,
  logOutOutline,
} from "ionicons/icons";
import { IonIcon } from "@ionic/react";

export default function SideNav() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userStorage = localStorage.getItem("user");
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken && userStorage) {
          const userData = JSON.parse(userStorage);

          const response = await axios.get(
            "http://localhost:8000/auth/checkAuth",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
              withCredentials: true,
            }
          );

          setIsLoggedIn(response.data);
          console.log(userData.user.role);

          if (userData.user.role) {
            setUserRole(userData.user.role);
          }
        }
      } catch (error) {
        console.error(
          "Erreur lors de la vérification de l'authentification",
          error
        );
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8000/auth/logout", {
        withCredentials: true,
      });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      setUserRole("");
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la déconnexion", error);
    }
  };

  return (
    <nav className="flex flex-col">
      {isLoggedIn && userRole === "admin" && (
        <Link
          to="/home/my-admin"
          className="text-white p-5 bg-gradient-to-r from-pink-600 to-purple-600 w-[230px] rounded-full mt-4 space-x-3 items-center flex justify-center"
        >
          <IonIcon icon={person} />
          <button>MY ADMIN</button>
        </Link>
      )}
      {(isLoggedIn || userRole === "user" || userRole === "admin") && (
        <Link
          to="/home/profil-user"
          className="text-white p-5 bg-gradient-to-r from-pink-600 to-purple-600 w-[230px] rounded-full mt-4 mb-8 space-x-3 items-center flex justify-center"
        >
          <IonIcon icon={person} />
          <button>MON PROFIL</button>
        </Link>
      )}

      <Link
        to="/home/mattch"
        className="flex items-center justify-center space-x-3 bg-[#1b1142] border border-[#1b1142] text-violet-500 w-[230px] p-8 rounded-tr-xl hover:bg-[#020011] hover:text-white hover:border-pink-500 hover:border"
      >
        <IonIcon icon={heartHalfOutline} />
        <button className="">MATTCH</button>
      </Link>
      <Link
        to="/home/setting"
        className="flex items-center justify-center space-x-3 bg-[#1b1142] border border-[#1b1142] text-violet-500 w-[230px] p-8 hover:bg-[#020011] hover:text-white hover:border-pink-500 hover:border"
      >
        <IonIcon icon={settingsOutline} />
        <button className="">SETTING</button>
      </Link>
      {isLoggedIn && (
        <div className="flex items-center justify-center space-x-3 bg-[#1b1142] border border-[#1b1142] text-violet-500 w-[230px] p-8 rounded-br-xl hover:bg-[#020011] hover:text-white hover:border-pink-500 hover:border">
          <IonIcon icon={logOutOutline} />
          <button onClick={handleLogout}>LOGOUT</button>
        </div>
      )}
    </nav>
  );
}