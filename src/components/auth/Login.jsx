import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginScreen.module.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginScreen = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/login`,
        {
          email: formData.email,
          password: formData.password,
        }
      );

      const { message } = response.data;
      localStorage.setItem("token", response.data.data.token);

      toast.success(message || "Login successful!");

     
      setTimeout(() => navigate("/dashboard"), 1000); 
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Invalid credentials. Please try again.";

      // Show error toast
      toast.error(errorMessage);
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
        <h2 className={styles.heading}>Log In</h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
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
              required
            />
          </div>

          <button type="submit" className={styles.loginButton} disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className={styles.orText}>OR</p>
        <button className={styles.googleButton}>
          <img src="https://img.icons8.com/color/48/google-logo.png" alt="Google" />
          Sign In with Google
        </button>

        <p className={styles.registerText}>
          Don't have an account? <span onClick={() => navigate("/register")}>Register now</span>
        </p>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default LoginScreen;
