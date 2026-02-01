import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getStoredUser, clearStoredUser } from "../services/authApi";

const Navbar = () => {
  const navigate = useNavigate();
  const user = getStoredUser();
  const initials = user?.name?.slice(0, 1)?.toUpperCase() || user?.email?.slice(0, 1)?.toUpperCase() || "👤";
  const [showDropdown, setShowDropdown] = React.useState(false);
  const dropdownRef = React.useRef(null);

  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px 40px",
      background: "#eff2f5", 
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
    profile: {
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #7b8cd9 0%, #9eadeb 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "16px",
      color: "#ffffff",
      boxShadow: "0 4px 12px rgba(123, 140, 217, 0.25)",
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    userName: {
      fontSize: "13px",
      fontWeight: 600,
      color: "#4a5568",
    },
    userWrap: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      cursor: "pointer",
    },
    dropdown: {
      position: "absolute",
      top: "calc(100% + 8px)",
      right: "0",
      background: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 8px 24px rgba(123, 140, 217, 0.15), 0 2px 8px rgba(0, 0, 0, 0.08)",
      border: "1px solid rgba(123, 140, 217, 0.1)",
      minWidth: "200px",
      overflow: "hidden",
      zIndex: 1000,
    },
    dropdownHeader: {
      padding: "12px 16px",
      borderBottom: "1px solid rgba(123, 140, 217, 0.1)",
      background: "rgba(123, 140, 217, 0.03)",
    },
    dropdownUserName: {
      fontSize: "14px",
      fontWeight: 700,
      color: "#2d3748",
      marginBottom: "2px",
    },
    dropdownUserEmail: {
      fontSize: "12px",
      color: "#718096",
    },
    dropdownItem: {
      padding: "12px 16px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      cursor: "pointer",
      border: "none",
      background: "transparent",
      width: "100%",
      textAlign: "left",
      fontSize: "14px",
      fontWeight: 500,
      color: "#4a5568",
      transition: "all 0.2s ease",
    },
  };

  const handleLogout = () => {
    clearStoredUser();
    navigate("/signin");
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showDropdown]);

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
        
        .profile-avatar:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 6px 16px rgba(123, 140, 217, 0.35);
        }
        
        .dropdown-item:hover {
          background: rgba(123, 140, 217, 0.08);
          color: #7b8cd9;
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .dropdown-menu {
          animation: slideDown 0.2s ease-out;
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
          <div style={styles.userWrap} onClick={() => user && setShowDropdown(!showDropdown)} ref={dropdownRef}>
            <div className="profile-avatar" style={styles.profile} title={user?.email || "User"}>
              {initials}
            </div>
            {user && (
              <>
                <span style={styles.userName}>{user.name || user.email}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4a5568" strokeWidth="2" style={{ transition: "transform 0.2s ease", transform: showDropdown ? "rotate(180deg)" : "rotate(0deg)" }}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
                
                {showDropdown && (
                  <div className="dropdown-menu" style={styles.dropdown} onClick={(e) => e.stopPropagation()}>
                    <div style={styles.dropdownHeader}>
                      <div style={styles.dropdownUserName}>{user.name || "User"}</div>
                      <div style={styles.dropdownUserEmail}>{user.email}</div>
                    </div>
                    <button className="dropdown-item" style={styles.dropdownItem} onClick={handleLogout}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
