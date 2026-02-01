import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  const polaroidPhotos = [
    { img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300", top: "8%", left: "5%", rotate: -8, pinColor: "#7ba3d9", delay: 0 },
    { img: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=300", top: "12%", left: "25%", rotate: 5, pinColor: "#8b9fd9", delay: 0.1 },
    { img: "https://images.unsplash.com/photo-1514539079130-25950c84af65?w=300", top: "5%", right: "20%", rotate: -6, pinColor: "#ff8c69", delay: 0.2 },
    { img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=300", top: "8%", right: "5%", rotate: 8, pinColor: "#d98bb8", delay: 0.3 },
    { img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=300", top: "45%", left: "3%", rotate: 12, pinColor: "#7bc9a3", delay: 0.4 },
    { img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=300", bottom: "12%", left: "8%", rotate: -5, pinColor: "#8b9fd9", delay: 0.5 },
    { img: "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=300", bottom: "25%", left: "20%", rotate: 8, pinColor: "#7ba3d9", delay: 0.6 },
    { img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300", top: "52%", right: "15%", rotate: -10, pinColor: "#ff8c69", delay: 0.7 },
    { img: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300", bottom: "18%", right: "8%", rotate: 6, pinColor: "#7bc9a3", delay: 0.8 },
    { img: "https://images.unsplash.com/photo-1542327897-d73f4005b533?w=300", bottom: "5%", right: "25%", rotate: -12, pinColor: "#d98bb8", delay: 0.9 },
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
      animation: `floatIn 1s ease-out ${photo.delay}s both, float 6s ease-in-out infinite ${photo.delay}s`,
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      cursor: "pointer",
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
      animation: "scaleIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s both",
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
    footer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      padding: "20px",
      textAlign: "center",
      zIndex: 10,
      animation: "fadeIn 1s ease-out 1.5s both",
    },
    socialLinks: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      marginBottom: "12px",
    },
    socialIcon: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      background: "rgba(255, 255, 255, 0.9)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textDecoration: "none",
      color: "#7b8cd9",
      fontSize: "20px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      transition: "all 0.3s ease",
    },
    copyright: {
      fontSize: "13px",
      color: "#8b94a8",
      fontWeight: 500,
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
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes floatIn {
          from { opacity: 0; transform: translateY(-20px) rotate(0deg); }
          to { opacity: 1; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(var(--rotation)); }
          50% { transform: translateY(-10px) rotate(var(--rotation)); }
        }
        
        .get-started-btn:hover {
          background: #6a7bc5 !important;
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 6px 20px rgba(123, 140, 217, 0.4) !important;
        }
        
        .social-icon:hover {
          transform: translateY(-3px) scale(1.1);
          background: #7b8cd9 !important;
          color: white !important;
          box-shadow: 0 4px 12px rgba(123, 140, 217, 0.3);
        }
        
        .polaroid-hover:hover {
          transform: rotate(0deg) scale(1.05) !important;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25), 0 12px 36px rgba(0, 0, 0, 0.15) !important;
          z-index: 5 !important;
        }
      `}</style>
      <div style={styles.page}>
        {polaroidPhotos.map((photo, index) => (
          <div key={index} className="polaroid-hover" style={{...styles.polaroid(photo), '--rotation': `${photo.rotate}deg`}}>
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

        <div style={styles.footer}>
          <div style={styles.socialLinks}>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon" style={styles.socialIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon" style={styles.socialIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" style={styles.socialIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon" style={styles.socialIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
              </svg>
            </a>
          </div>
          <p style={styles.copyright}>
            © 2026 Echoes. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Landing;