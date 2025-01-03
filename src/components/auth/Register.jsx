import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginScreen.module.css";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { name, email, password, confirmPassword } = formData;
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email address.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      // Making the API call
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/register`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

     
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      const errorMessage =
      err.response?.data?.message || "Something went wrong. Please try again.";

    if (errorMessage.toLowerCase().includes("email already exists")) {
      setError("Email already exists. Please log in instead.");
    } else {
      setError(errorMessage);
    }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Background Elements */}
      <img src="./images/auth/tri.png" alt="Triangle" className={styles.triangle} />
      <img src="./images/auth/el1.png" alt="Ellipse" className={styles.ellipse1} />
      <img src="./images/auth/el2.png" alt="Ellipse" className={styles.ellipse2} />

      <img
        src="./images/auth/arrow_back.png"
        alt="Back"
        className={styles.backArrow}
        onClick={() => navigate(-1)}
      />

      <div className={styles.formContainer}>
        <h2 className={styles.heading}>Sign Up</h2>

        {/* Error Message */}
        {error && <p className={styles.error}>{error}</p>}

        {/* Form Fields */}
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Username</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your username"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="********"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className={styles.loginButton}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className={styles.orText}>OR</p>
        <button className={styles.googleButton}>
          <img src="https://img.icons8.com/color/48/google-logo.png" alt="Google" />
          Sign Up with Google
        </button>

        <p className={styles.registerText}>
          Already have an account? <Link to="/login">Login here</Link>.
        </p>
      </div>
    </div>
  );
};

export default Register;
