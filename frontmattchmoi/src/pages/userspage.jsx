import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchMatches = async () => {
      if (!userId || !token) return;

      try {
        const response = await axios.get(`http://localhost:8000/users/${userId}/matches`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs correspondants:', error);
      }
    };

    fetchMatches();
  }, [userId, token]);

  return (
    <div>
      <h1>Utilisateurs correspondants</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {users.map((user) => (
          <div key={user._id} style={{ width: '300px', border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
            <h2>{user.username}</h2>
            <p>Intérêt: {user.interest}</p>
            <p>Cherche: {user.lookingFor}</p>
            {}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
