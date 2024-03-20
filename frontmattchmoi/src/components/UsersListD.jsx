import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { personOutline, trashOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react'; 

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:8000/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Error fetching users. Please try again later.');
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`http://localhost:8000/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedUsers = users.filter((user) => user._id !== id);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user._id} className="flex items-center mb-3">
            <div className="rounded-full mr-2 bg-gradient-to-r from-[#020011] to-violet-950 text-white w-[40px] h-[40px] items-center justify-center flex">
            <IonIcon icon={personOutline} />
            </div>
            <span className="text-white">{user.email}</span>
            <button className="text-lg text-pink-500 ml-4" onClick={() => handleDeleteUser(user._id)}>
            <IonIcon icon={trashOutline} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
