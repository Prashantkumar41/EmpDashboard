import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import logoImg from '../../assets/image.png';


const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">

            <Link to="/dashboard" className="flex items-center">
              <img
                src={logoImg}
                alt="Logo"
                className="h-10 w-auto object-contain"
              />
            </Link>
            <nav className="ml-10 flex space-x-4">
              <Link to="/dashboard" className="px-3 py-2 text-gray-700 hover:text-gray-900">
                Home
              </Link>
              <Link to="/employees" className="px-3 py-2 text-gray-700 hover:text-gray-900">
                Employee List
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center">
            {user && (
              <>
                <span className="mr-4">{user.username}</span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 text-gray-700 hover:text-gray-900"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;