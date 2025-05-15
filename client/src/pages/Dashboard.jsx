import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/layout/Header';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="bg-yellow-200 py-2 px-4 mb-6">
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome Admin Panel</h2>
          <p>Hello, {user?.username}! You are now logged in to the Employee Management System.</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;