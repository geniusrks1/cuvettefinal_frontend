import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [folders, setFolders] = useState([]);
  const [forms, setForms] = useState([]);
  const [folderName, setFolderName] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [isFolderModalOpen, setFolderModalOpen] = useState(false);
  const [isFormModalOpen, setFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null); 
  const [deleteType, setDeleteType] = useState(""); 
  const [errorMessage, setErrorMessage] = useState(null);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserName();
    fetchFoldersAndForms();
  }, []);

  const fetchUserName = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("You need to be logged in.");
        return;
      }

      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserName(response.data.name);
    } catch (error) {
      setErrorMessage("Failed to fetch user data. Please check your login status.");
    }
  };

  const fetchFoldersAndForms = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("You need to be logged in.");
        return;
      }

      const [foldersResponse, formsResponse] = await Promise.all([
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/folders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/forms`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      setFolders(foldersResponse.data);
      setForms(formsResponse.data);
    } catch (error) {
      setErrorMessage("Failed to fetch data.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleCreateFolder = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("You need to be logged in.");
        return;
      }
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/folders/`,
        { name: folderName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFolders([...folders, response.data]);
      setFolderName("");
      setFolderModalOpen(false);
    } catch (error) {
      setErrorMessage("Failed to create folder.");
    }
  };

  const handleCreateForm = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("You need to be logged in.");
        return;
      }

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/forms/`, {
        title: "New Form"},{
        
          headers: {
            Authorization: `Bearer ${token}`,
          },
        
      });
      setForms([...forms, response.data]);
      setFormModalOpen(false);
    } catch (error) {
      setErrorMessage("Failed to create form.");
    }
  };

  const openDeleteModal = (item, type) => {
    setDeleteItem(item);
    setDeleteType(type);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("You need to be logged in.");
        return;
      }
  
      if (deleteType === "folder") {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/folders/${deleteItem._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFolders(folders.filter((folder) => folder._id !== deleteItem._id));
      } else if (deleteType === "form") {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/forms/${deleteItem._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setForms(forms.filter((form) => form._id !== deleteItem._id));
      }
      setDeleteModalOpen(false);
      setDeleteItem(null);
      setDeleteType("");
    } catch (error) {
      setErrorMessage("Failed to delete item.");
    }
  };
  

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setDeleteItem(null);
    setDeleteType("");
  };

  return (
    <div className={darkMode ? styles.dark : styles.light}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.userMenu}>
          <span>{userName ? `${userName}'s workspace` : "Loading..."}</span>
          <div className={styles.dropdown}>
            <button onClick={() => navigate("/settings")}>Settings</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>

        <div className={styles.toggleContainer}>
          <span>Light</span>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <span className={styles.slider}></span>
          </label>
          <span>Dark</span>
        </div>
        <button className={styles.shareButton}>Share</button>
      </nav>

      {/* Main Section */}
      <div className={styles.dashboard}>
        <div className={styles.actions}>
          <button onClick={() => setFolderModalOpen(true)} className={styles.folderb}>Create a Folder</button>
          <button onClick={() => setFormModalOpen(true)} className={styles.formb}>Create a Formbot</button>
        </div>

        {/* Folder and Form Modals */}
        {isFolderModalOpen && (
          <div className={styles.modal}>
            <h3>Create a Folder</h3>
            <input
              type="text"
              placeholder="Folder Name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
            <button onClick={handleCreateFolder}>Create</button>
            <button onClick={() => setFolderModalOpen(false)}>Cancel</button>
          </div>
        )}

        {isFormModalOpen && (
          <div className={styles.modal}>
            <h3>Create a Formbot</h3>
            <button onClick={handleCreateForm}>Create</button>
            <button onClick={() => setFormModalOpen(false)}>Cancel</button>
          </div>
        )}

        {/* Delete Modal */}
        {isDeleteModalOpen && (
          <div className={styles.modal}>
            <h3>
              {deleteType === "folder"
                ? "Are you sure you want to delete this folder?"
                : "Are you sure you want to delete this form?"}
            </h3>
            <button onClick={handleConfirmDelete}>Confirm</button>
            <button onClick={handleCancelDelete}>Cancel</button>
          </div>
        )}

        {/* Display Folders and Forms */}
        <div className={styles.foldersForms}>
          {folders.map((folder) => (
            <div key={folder.id} className={styles.folder}>
              <span>{folder.name}</span>
              <button onClick={() => openDeleteModal(folder, "folder")}>Delete</button>
            </div>
          ))}

          {forms.map((form) => (
            <div key={form.id} className={styles.form}>
            <Link to={`/workspace/${form._id}`}>
            <span>{form.title}</span></Link>  
              <button onClick={() => openDeleteModal(form, "form")}>Delete</button>
            </div>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && <div className={styles.error}>{errorMessage}</div>}
    </div>
  );
};

export default Dashboard;
