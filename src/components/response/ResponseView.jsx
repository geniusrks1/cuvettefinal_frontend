import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import styles from "./ResponseView.module.css";

const ResponseView = () => {
  const data = [
    { name: "Completed", value: 33 },
    { name: "Remaining", value: 67 },
  ];

  return (
    <div className={styles.container}>
      {/* Navbar */}
      <header className={styles.navbar}>
        <div>
          <button className={styles.navButton}>Flow</button>
          <button className={`${styles.navButton} ${styles.active}`}>Response</button>
        </div>
        <div className={styles.navActions}>
          <label className={styles.themeSwitch}>
            <span>Light</span>
            <input type="checkbox" />
            <span className={styles.slider}></span>
            <span>Dark</span>
          </label>
          <button className={styles.shareButton}>Share</button>
          <button className={styles.saveButton}>Save</button>
        </div>
      </header>

      {/* Stats and Table */}
      <div className={styles.stats}>
        <div className={styles.statBox}>
          <h3>Views</h3>
          <p>6</p>
        </div>
        <div className={styles.statBox}>
          <h3>Starts</h3>
          <p>100</p>
        </div>
      </div>

      <div className={styles.responseTable}>
        <table>
          <thead>
            <tr>
              <th>Submitted at</th>
              <th>Button</th>
              <th>Email</th>
              <th>Text</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Jul 17, 03:23 PM</td>
              <td>Hi!</td>
              <td>abc@g.com</td>
              <td>alpha</td>
              <td>5</td>
            </tr>
            <tr>
              <td>Jul 17, 02:48 PM</td>
              <td>Hi!</td>
              <td>def@g.com</td>
              <td>beta</td>
              <td>3</td>
            </tr>
            <tr>
              <td>Jul 14, 04:25 PM</td>
              <td>Hi!</td>
              <td>ghi@g.com</td>
              <td>gamma</td>
              <td>4</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Completion Chart */}
      <div className={styles.completionChart}>
        <PieChart width={150} height={150}>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={60}
            fill="#8884d8"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index === 0 ? "#4caf50" : "#d3d3d3"} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        <div className={styles.completionText}>
          <h3>Completed</h3>
          <p>33</p>
          <p>Completion rate: 33%</p>
        </div>
      </div>
    </div>
  );
};

export default ResponseView;
