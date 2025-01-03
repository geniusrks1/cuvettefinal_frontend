import React from 'react';
import styles from './LandingPage.module.css';
import { useNavigate } from 'react-router-dom';

// Navbar Component
const Navbar = () => {
  const navigate=useNavigate();
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
      <img src="./images/landingPage/Link.png" alt="logo" className={styles.logo} />
      </div>
      <div className={styles.navLinks}>
        <button className={styles.signIn} onClick={()=>navigate('login')}>Sign In</button>
        <button className={styles.createAccount} onClick={()=>navigate('login')} >Create a FormBot</button>
      </div>
    </nav>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerSection}>
      <div className={styles.logo}>
      <img src="./images/landingPage/Link.png" alt="logo" className={styles.logo} />
      </div>
        <p>Made with ❤️ by Cuvette</p>
      </div>
      <div className={styles.footerSection}>
        <p>Product</p>
        <ul>
          <li>Scratch UI</li>
          <li>Documentation</li>
          <li>Roadmap</li>
          <li>Pricing</li>
        </ul>
      </div>
      <div className={styles.footerSection}>
        <p>Community</p>
        <ul>
          <li>Discord</li>
          <li>GitHub</li>
          <li>LinkedIn</li>
        </ul>
      </div>
      <div className={styles.footerSection}>
        <p>Company</p>
        <ul>
          <li>About</li>
          <li>Contact</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
    </footer>
  );
};

// Main Content Component
const MainContent = () => {
  return (
    <main className={styles.main}>
        <div className={styles.flowContainer}>
          <img src="./images/landingPage/Container1.png" alt="Flow Editor" className={styles.flowImage} />
        </div>
    
    </main>
  );
};

// Landing Page Component
const LandingPage = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <MainContent />
      <Footer />
    </div>
  );
};

export default LandingPage;
