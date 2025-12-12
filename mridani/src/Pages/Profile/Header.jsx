import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserDetails } from '../../Service/API/auth';

const Header = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserDetails();
        setUsername(data.username);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUsername('');
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("username");
    setUsername('');
    navigate("/");  // ✅ Redirect to home
  };

  return (
    <div className=" px-6 py-4 flex justify-between items-center">
      <h1 className="text-3xl font-semibold text-gray-800">
        {username ? `Hi, ${username} 👋` : "Welcome 👋"}
      </h1>
      {username && (
        <button
          onClick={handleLogout}
          className="bg-gray-100 text-black px-4 py-2 rounded-full text-sm hover:bg-red-100"
        >
          Log out
        </button>
      )}
    </div>
  );
};

export default Header;
