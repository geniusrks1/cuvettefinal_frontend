import React, { useState } from "react";
import { createForm } from "../../utils/api";
import styles from "./Forms.module.css";

const CreateForm = ({ folderId, onFormCreated }) => {
  const [formName, setFormName] = useState("");
  const [background, setBackground] = useState("default");

  const handleCreateForm = async () => {
    if (!formName) {
      alert("Form name is required");
      return;
    }

    const newForm = await createForm(folderId, {
      name: formName,
      background,
    });
    onFormCreated(newForm);
    setFormName("");
    setBackground("default");
  };

  return (
    <div className={styles.createForm}>
      <h3>Create New Form</h3>
      <input
        type="text"
        placeholder="Form Name"
        value={formName}
        onChange={(e) => setFormName(e.target.value)}
        required
      />
      <select value={background} onChange={(e) => setBackground(e.target.value)}>
        <option value="default">Default</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      <button onClick={handleCreateForm}>Create Form</button>
    </div>
  );
};

export default CreateForm;
