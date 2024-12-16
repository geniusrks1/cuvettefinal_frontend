import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <h2>Home</h2>
      <p>Welcome to the Home Page!</p>
      <button  onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;