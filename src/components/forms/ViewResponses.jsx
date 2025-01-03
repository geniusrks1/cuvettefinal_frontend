import React, { useEffect, useState } from "react";
import { getFormResponses } from "../../utils/api";
import styles from "./Forms.module.css";

const ViewResponses = ({ formId }) => {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchResponses = async () => {
      const data = await getFormResponses(formId);
      setResponses(data);
    };
    fetchResponses();
  }, [formId]);

  return (
    <div className={styles.responses}>
      <h3>Form Responses</h3>
      {responses.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Response</th>
            </tr>
          </thead>
          <tbody>
            {responses.map((response, index) => (
              <tr key={index}>
                <td>{response.name}</td>
                <td>{response.email}</td>
                <td>{response.data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No responses yet.</p>
      )}
    </div>
  );
};

export default ViewResponses;
