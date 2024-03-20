import React from 'react';
import { useAuth } from '../Authcontext';
import UsersList from '../components/UsersListD';

const AdminDashboard = () => {
  const { user } = useAuth();
  
  if (user && user.user.role === 'admin') {
    console.log("Bienvenue, admin !");
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {user ? (
        <>
          <p>Welcome, {user.user.username}!</p>
          {user.user.role === 'admin' && (
            <div>
              
              <p>Admin functionalities go here...</p>
              
              <UsersList />
            </div>
          )}
        </>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
