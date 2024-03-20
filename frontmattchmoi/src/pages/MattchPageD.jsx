import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardMattch from '../components/CardMattch';
import ModalChat from '../components/ModalChat';

export default function MatchPage() {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [matches, setMatches] = useState(undefined);
  const [error, setError] = useState('');
  const [chatting, setChatting] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.user) {
      setUserId(user.user._id);
      setToken(localStorage.getItem('accessToken'));
    }
  }, []);

  useEffect(() => {
    const fetchMatches = async () => {
      if (userId && token) {
        try {
          const apiUrl = `http://localhost:8000/matches/${userId}`;
          const response = await axios.get(apiUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setMatches(response.data);
          console.log(response.data)
        } catch (error) {
          setError('Failed to fetch matches. Please try again later.');
        }
      }
    };

    fetchMatches();
  }, [userId, token]);


  const handleOpenChat = () => {
    setChatting(true);
  };

  if (matches === undefined) {
    return <p className='text-white'>Loading...</p>;
  }

  return (
    <div className="flex justify-center items-center">
      <div className="bg-[#020011] w-[600px] h-[440px] flex flex-col rounded-lg justify-center items-center border-4 border-pink-500">
        <h1 className="text-white text-xl text-bold">DATING MATCHES</h1>
        <span className="text-xs text-pink-500">Check out lists of matches & keep enjoying</span>
        {error && <div className="text-red-500">{error}</div>}
        <div className="flex mt-3">
          <div className="bg-gradient-to-b from-[#1b1142] to-[#020011] rounded-lg w-[450px] h-[350px] p-3">
            <h2 className="mb-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white p-3 w-[80px] items-center flex justify-center rounded-full">Match</h2>
            <div className="overflow-y-auto h-[300px] space-y-2">
              {matches.map(match => (
                <CardMattch key={match._id} match={match} currentUserId={userId} onOpenChat={handleOpenChat} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {chatting && <ModalChat setChatting={setChatting} userId={userId} />}
    </div>
  );
}
