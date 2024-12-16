import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./css/Register.module.css"

const Register = () => {
  const [formData, setFormData] = useState({ email:"", phoneNumber:"",name: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL +"/api/v1/users/register", formData);
      navigate("/");
    } catch (err) {
        const serverError = err.response?.data?.message || "";
      
      // Map specific backend errors to user-friendly messages
      const userFriendlyError = mapErrorMessage(serverError);
      setError(userFriendlyError || "Registration failed. Please try again.");
    }
  };


  const mapErrorMessage = (serverError) => {
    if (serverError.includes("duplicate key error") && serverError.includes("phoneNumber")) {
      return "Phone number already exists.";
    }
    if (serverError.includes("duplicate key error") && serverError.includes("email")) {
      return "Email already exists.";
    }
    return serverError;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading} >Register</h2>
      <form onSubmit={handleSubmit}>
         <input
          className={styles.inputField}
          type="text"
          name="name"
          placeholder="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
          <input
          className={styles.inputField}
          type="text"
          name="email"
          placeholder="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
          <input
          className={styles.inputField}
          type="tel"
          name="phoneNumber"
          placeholder="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
         <input
          className={styles.inputField}
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className={styles.btn}>Register</button>
      </form>
      {error && <p style={{ color: "red" }} className={styles.errorText}>{error}</p>}
    </div>
  );
};

export default Register;