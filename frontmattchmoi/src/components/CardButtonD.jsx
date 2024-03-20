import React, { useEffect, useState } from "react";
import Card from "./CardD";
import CardInfo from "./CardInfoD";
import axios from "axios";
import "./Card.css";

function CardUser() {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCardInfo, setShowCardInfo] = useState(false);
  const [currentUserInfo, setCurrentUserInfo] = useState(null);
  const [animationClass, setAnimationClass] = useState("");

  const handleInfoClick = () => {
    setShowCardInfo((prevShowCardInfo) => !prevShowCardInfo);
  };

  const handleLikeClick = async () => {
  const userStorage = localStorage.getItem("user");
  const userData = JSON.parse(userStorage);
  console.log(userData);
  const fromUserId = userData.user._id;
  console.log("data user", fromUserId);
  const nextIndex = currentIndex + 1;
  const toUserId = users[nextIndex]._id;
  console.log("to user:", toUserId);

  try {
    await axios.post(
      "http://localhost:8000/likes",
      { fromUserId, toUserId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    setCurrentIndex((prevIndex) =>
      prevIndex + 1 < users.length ? prevIndex + 1 : prevIndex
    );
    setCurrentUserInfo(users[nextIndex]);
  } catch (error) {
    console.error("Error liking user:", error);
  }
};
  const handleDislikeClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 < users.length ? prevIndex + 1 : prevIndex
    );
    setCurrentUserInfo(users[currentIndex + 1]);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get("http://localhost:8000/users", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUsers(response.data);
        console.log(response.data);
        setCurrentUserInfo(response.data[0]);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleAnimation = (direction) => {
    if (showCardInfo === true) {
      return;
    }
    setAnimationClass(direction === "left" ? "slide-left" : "slide-right");
    setTimeout(() => setAnimationClass(""), 200);
  };

  return (
    <div className="flex space-x-12">
      {users.length > 0 && (
        <div
          key={currentUserInfo._id}
          className={`flex flex-col bg-[#11012f] ${animationClass}`}
        >
          <Card user={currentUserInfo} />
          <div className="flex space-x-4 items-center bg-[#11012f]">
            <button
              onClick={() => {
                handleLikeClick();
                handleAnimation("left");
              }}
            >
              <img
                src="/like3.png"
                className="h-[90px] hover:scale-125"
                alt="like"
              />
            </button>
            <button onClick={handleInfoClick}>
              <img
                src="/like6.png"
                className="h-[90px] hover:scale-125"
                alt="info"
              />
            </button>
            <button
              onClick={() => {
                handleDislikeClick();
                handleAnimation("right");
              }}
            >
              <img
                src="/like5.png"
                className="h-[90px] hover:scale-125"
                alt="dislike"
              />
            </button>
          </div>
        </div>
      )}
      {showCardInfo && <CardInfo userInfo={currentUserInfo} />}
    </div>
  );
}

export default CardUser;
