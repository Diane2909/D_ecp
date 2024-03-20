import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IonIcon } from "@ionic/react";
import { heartOutline, trashOutline } from 'ionicons/icons';
import "@ionic/react/css/core.css";

const MattchList = () => {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const userData = JSON.parse(localStorage.getItem('user'));
        setUserRole(userData?.user.role);
        const response = await axios.get('http://localhost:8000/matches/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const matchesWithUsernames = await Promise.all(response.data.map(async (match) => {
            const user1 = await fetchUsername(match.user1);
            const user2 = await fetchUsername(match.user2);
            return {
              ...match,
              user1: user1,
              user2: user2
            };
          }));
  
          setMatches(matchesWithUsernames);
          console.log('matches with usernames', matchesWithUsernames);

      } catch (error) {
        console.error('Error fetching matches:', error);
        setError('Error fetching matches. Please try again later.');
      }
    };

    fetchMatches();
  }, []);

  const fetchUsername = async (userId) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`http://localhost:8000/users/${userId}`);
      return response.data.username;
    } catch (error) {
      console.error('Error fetching username:', error);
      return 'Unknown';
    }
  };

  const handleDeleteMatches = async (id) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`http://localhost:8000/matches/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedMatches = matches.filter((match) => match._id !== id);
      setMatches(updatedMatches);
    } catch (error) {
      console.error('Error deleting match:', error);
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {matches.map((match) => (
          <li key={match._id} className="flex items-center mb-3">
            <div className="rounded-full mr-2 bg-gradient-to-r from-[#020011] to-violet-950 text-white w-[40px] h-[40px] items-center justify-center flex">
              <IonIcon icon={heartOutline} />
            </div>
            <span className="text-white mr-1">{match.user1}</span>
            <span className="text-pink-500 mr-1">match with</span>
            <span className="text-white mr-1">{match.user2}</span>
            {(userRole === 'admin') && (
              <button className="text-lg text-pink-500 ml-4" onClick={() => handleDeleteMatches(match._id)}>
                <IonIcon icon={trashOutline} />
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MattchList;
