import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px 40px",
      background: "rgba(255, 255, 255, 0.2)",
      backdropFilter: "blur(30px) saturate(200%) brightness(110%)",
      WebkitBackdropFilter: "blur(30px) saturate(200%) brightness(110%)",
      boxShadow: "0 1px 8px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(123, 140, 217, 0.08)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.6)",
      position: "sticky",
      top: 0,
      zIndex: 100,
    },
    logo: {
      fontFamily: "'Dancing Script', cursive",
      fontSize: "28px",
      color: "#7b8cd9",
      fontWeight: 700,
      textDecoration: "none",
      transition: "all 0.3s ease",
    },
    navLinks: {
      display: "flex",
      gap: "24px",
      alignItems: "center",
    },
    navLink: {
      fontSize: "14px",
      fontWeight: 500,
      color: "#4a5568",
      textDecoration: "none",
      transition: "color 0.3s ease",
    },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
        
        .navbar-logo:hover {
          color: #6a7bc5;
          transform: scale(1.05);
        }
        
        .nav-link:hover {
          color: #7b8cd9;
        }
      `}</style>
      <nav style={styles.navbar}>
        <Link to="/" className="navbar-logo" style={styles.logo}>
          Echoes
        </Link>
        <div style={styles.navLinks}>
          <Link to="/overview" className="nav-link" style={styles.navLink}>
            Overview
          </Link>
          <Link to="/wall" className="nav-link" style={styles.navLink}>
            Wall
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
