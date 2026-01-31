import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  const polaroidPhotos = [
    { img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300", top: "8%", left: "5%", rotate: -8, pinColor: "#7ba3d9" },
    { img: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=300", top: "12%", left: "25%", rotate: 5, pinColor: "#8b9fd9" },
    { img: "https://images.unsplash.com/photo-1514539079130-25950c84af65?w=300", top: "5%", right: "20%", rotate: -6, pinColor: "#ff8c69" },
    { img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=300", top: "8%", right: "5%", rotate: 8, pinColor: "#d98bb8" },
    { img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=300", top: "45%", left: "3%", rotate: 12, pinColor: "#7bc9a3" },
    { img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=300", bottom: "12%", left: "8%", rotate: -5, pinColor: "#8b9fd9" },
    { img: "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=300", bottom: "25%", left: "20%", rotate: 8, pinColor: "#7ba3d9" },
    { img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300", top: "52%", right: "15%", rotate: -10, pinColor: "#ff8c69" },
    { img: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300", bottom: "18%", right: "8%", rotate: 6, pinColor: "#7bc9a3" },
    { img: "https://images.unsplash.com/photo-1542327897-d73f4005b533?w=300", bottom: "5%", right: "25%", rotate: -12, pinColor: "#d98bb8" },
  ];

  const styles = {
    page: {
      minHeight: "100vh",
      maxHeight: "100vh",
      width: "100vw",
      maxWidth: "100vw",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #e8eef7 0%, #dfe7f2 50%, #f0f4f9 100%)",
      fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      padding: "40px",
      position: "relative",
      overflow: "hidden",
      boxSizing: "border-box",
    },
    polaroid: (photo) => ({
      position: "absolute",
      top: photo.top,
      left: photo.left,
      right: photo.right,
      bottom: photo.bottom,
      width: "180px",
      background: "#ffffff",
      padding: "12px 12px 40px 12px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15), 0 8px 24px rgba(0, 0, 0, 0.1)",
      transform: `rotate(${photo.rotate}deg)`,
      borderRadius: "4px",
      zIndex: 1,
    }),
    polaroidImage: {
      width: "100%",
      height: "160px",
      objectFit: "cover",
      display: "block",
      backgroundColor: "#f0f0f0",
    },
    pin: (color) => ({
      position: "absolute",
      top: "-8px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "20px",
      height: "20px",
      background: color,
      borderRadius: "50%",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2), inset -2px -2px 4px rgba(0, 0, 0, 0.1), inset 2px 2px 4px rgba(255, 255, 255, 0.4)",
      zIndex: 2,
    }),
    pinNeedle: {
      position: "absolute",
      width: "2px",
      height: "8px",
      background: "linear-gradient(to bottom, #999, #666)",
      left: "50%",
      top: "16px",
      transform: "translateX(-50%)",
      boxShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
    },
    centerCard: {
      position: "relative",
      width: "420px",
      maxWidth: "90vw",
      background: "#ffffff",
      padding: "60px 50px 50px 50px",
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.08)",
      borderRadius: "20px",
      textAlign: "center",
      zIndex: 10,
      animation: "fadeIn 1s ease-out",
    },
    logo: {
      fontFamily: "'Dancing Script', cursive",
      fontSize: "72px",
      color: "#7b8cd9",
      marginBottom: "16px",
      fontWeight: 700,
    },
    tagline: {
      fontSize: "18px",
      color: "#8b94a8",
      marginBottom: "40px",
      lineHeight: 1.6,
    },
    button: {
      display: "inline-block",
      padding: "16px 60px",
      fontSize: "16px",
      fontWeight: 600,
      borderRadius: "50px",
      textDecoration: "none",
      background: "#7b8cd9",
      color: "#ffffff",
      boxShadow: "0 4px 12px rgba(123, 140, 217, 0.3)",
      transition: "all 0.3s ease",
      border: "none",
      cursor: "pointer",
    },
    centerPin: {
      position: "absolute",
      top: "-10px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "22px",
      height: "22px",
      background: "#7bc9a3",
      borderRadius: "50%",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2), inset -2px -2px 4px rgba(0, 0, 0, 0.1), inset 2px 2px 4px rgba(255, 255, 255, 0.4)",
      zIndex: 11,
    },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .get-started-btn:hover {
          background: #6a7bc5 !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(123, 140, 217, 0.4) !important;
        }
      `}</style>
      <div style={styles.page}>
        {polaroidPhotos.map((photo, index) => (
          <div key={index} style={styles.polaroid(photo)}>
            <div style={styles.pin(photo.pinColor)}>
              <div style={styles.pinNeedle}></div>
            </div>
            <img src={photo.img} alt="" style={styles.polaroidImage} />
          </div>
        ))}
        
        <div style={styles.centerCard}>
          <div style={styles.centerPin}>
            <div style={styles.pinNeedle}></div>
          </div>
          <h1 style={styles.logo}>Echoes</h1>
          <p style={styles.tagline}>
            A quiet place to<br />pin moments that matter.
          </p>
          <Link to="/signin" className="get-started-btn" style={styles.button}>
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
};

export default Landing;