

import React, { useState } from 'react';
import axios from 'axios';
import styles from './Setting.module.css';
import { useNavigate } from "react-router-dom"; 
const Setting = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    oldPassword: '',
    newPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
    const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {

        const token = localStorage.getItem("token");
        if (!token) {
          setErrorMessage("You need to be logged in.");
          return;
        }

      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/`,
        {
          name: formData.name,
          email: formData.email,
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        },{
        headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login"); 
  };

  return (
    <div className={styles.settingsContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Settings</h2>

        <div className={styles.inputGroup}>
        <label className={styles.input}>
          <img src='./images/auth/profile.png'  alt='profile'  className={styles.icon}/>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
             
          </label>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.input}>
          <img src='./images/auth/lock.png'  alt='lock'  className={styles.icon}/>
            <input
              type="email"
              name="email"
              placeholder="Update Email"
              value={formData.email}
              onChange={handleChange}
            />
            <img src='./images/auth/view.png'  alt='view'  className={styles.icon}/>
          </label>
        </div>

        <div className={styles.inputGroup}>
        <label className={styles.input}>
            <img src='./images/auth/lock.png'  alt='lock'  className={styles.icon}/>
            <input
              type="password"
              name="oldPassword"
              placeholder="Old Password"
              value={formData.oldPassword}
              onChange={handleChange}
            />
            <img src='./images/auth/view.png'  alt='view'  className={styles.icon}/>
          </label>
        </div>

        <div className={styles.inputGroup}>
        <label className={styles.input}>
          <img src='./images/auth/lock.png'  alt='lock'  className={styles.icon}/>
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
            />
            <img src='./images/auth/view.png'  alt='view'  className={styles.icon}/>
          </label>
        </div>

        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}

        <button type="submit" className={styles.updateButton}>Update</button>
      </form>

      <button  onClick={handleLogout} className={styles.logoutButton}>
      <img src='./images/auth/Logout.png'  alt='Logout'  className={styles.icon}/>
        Log out</button>
    </div>
  );
};

export default Setting;
