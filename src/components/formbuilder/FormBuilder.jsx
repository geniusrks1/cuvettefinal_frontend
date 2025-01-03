import React, { useState } from "react";
import styles from "./FormBuilder.module.css";

const FormBuilder = () => {
  const [formElements, setFormElements] = useState([]);
  const [theme, setTheme] = useState("dark");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newField, setNewField] = useState({ title: "", placeholder: "", type: "", mediaType: "" });

  const addElement = () => {
    if (!newField.title || !newField.type) {
      alert("Title and Input Type are required.");
      return;
    }

    const newElement = {
      id: Date.now(),
      ...newField,
    };

    setFormElements([...formElements, newElement]);
    setNewField({ title: "", placeholder: "", type: "", mediaType: "" });
    setIsModalOpen(false);
  };

  const deleteElement = (id) => {
    setFormElements(formElements.filter((el) => el.id !== id));
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className={`${styles.container} ${theme === "dark" ? styles.dark : styles.light}`}>
      {/* Navbar */}
      <header className={styles.navbar}>
        <input
          className={styles.formNameInput}
          type="text"
          placeholder="Enter Form Name"
        />
        <div className={styles.navActions}>
          <button className={styles.toggleTheme} onClick={toggleTheme}>
            {theme === "dark" ? "Light" : "Dark"}
          </button>
          <button className={styles.shareButton}>Share</button>
          <button className={styles.saveButton}>Save</button>
        </div>
      </header>

      {/* Main Content */}
      <div className={styles.builder}>
        <aside className={styles.sidebar}>
          <h3>Bubbles</h3>
          <button>Image</button>
          <button>Video</button>
          <button>GIF</button>

          <h3>Inputs</h3>
          <button>Text Input</button>
          <button>Email Input</button>
          <button>Number Input</button>
          <button>Phone</button>
          <button>Date</button>
          <button>Rating</button>
          <button>Button</button>
        </aside>

        <div className={styles.formPreview}>
          <button
            className={styles.startButton}
            onClick={() => setIsModalOpen(true)}
          >
            Start
          </button>
          {isModalOpen && (
            <div className={styles.modal}>
              <div className={styles.modalContent}>
                <h2>Add Field</h2>
                <label>
                  Title:
                  <input
                    type="text"
                    value={newField.title}
                    onChange={(e) =>
                      setNewField({ ...newField, title: e.target.value })
                    }
                  />
                </label>
                <label>
                  Placeholder:
                  <input
                    type="text"
                    value={newField.placeholder}
                    onChange={(e) =>
                      setNewField({ ...newField, placeholder: e.target.value })
                    }
                  />
                </label>
                <label>
                  Type:
                  <select
                    value={newField.type}
                    onChange={(e) =>
                      setNewField({ ...newField, type: e.target.value })
                    }
                  >
                    <option value="">Select Type</option>
                    <option value="Text">Text Input</option>
                    <option value="Email">Email Input</option>
                    <option value="Number">Number Input</option>
                    <option value="Phone">Phone</option>
                    <option value="Date">Date</option>
                    <option value="Rating">Rating</option>
                    <option value="Button">Button</option>
                  </select>
                </label>
                <label>
                  Media Type (Optional):
                  <select
                    value={newField.mediaType}
                    onChange={(e) =>
                      setNewField({ ...newField, mediaType: e.target.value })
                    }
                  >
                    <option value="">Select Media Type (Optional)</option>
                    <option value="Image">Image</option>
                    <option value="GIF">GIF</option>
                    <option value="Video">Video</option>
                  </select>
                </label>
                <div className={styles.modalActions}>
                  <button onClick={addElement}>Add</button>
                  <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                </div>
              </div>
            </div>
          )}
          {formElements.map((el) => (
            <div key={el.id} className={styles.formElement}>
              <span>{el.title} ({el.type}) {el.mediaType && ` - ${el.mediaType}`}</span>
              <button
                className={styles.deleteButton}
                onClick={() => deleteElement(el.id)}
              >
                &#x2715;
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
