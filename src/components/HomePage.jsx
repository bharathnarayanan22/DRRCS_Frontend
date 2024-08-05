import React from "react";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <h1 style={{fontSize: "280%", marginBottom: "20px", color:"black"}}>
          <TypeAnimation
            sequence={[
              "Disaster Relief Resource Coordination System",
              2000,
              "Coordinating Resources for Disaster Relief",
              2000,
              "Disaster Relief Resource Coordination System",
              2000,
            ]}
            speed={100}
            repeat={Infinity}
            className="type-animation"
          />
        </h1>
        <p>
          Streamline disaster relief efforts by matching resources and
          volunteers with those in need. Get real-time updates, track resources,
          and coordinate volunteers effectively.
        </p>
        <Link to="/register" className={styles.registerButton}>
          Join the Relief Effort
        </Link>
      </div>
      <div className={styles.rightSide}>
        <img src="/src/assets/2.jpg" alt="Disaster Relief" />
      </div>
    </div>
  );
};

export default HomePage;
