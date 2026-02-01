import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authApi";

const Signin = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const styles = {
    page: {
      minHeight: "100vh",
      minWidth: "100vw",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #e8eef7 0%, #dfe7f2 50%, #f0f4f9 100%)",
      padding: "40px",
      boxSizing: "border-box",
      fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      color: "#3b3f4a",
      position: "relative",
      overflow: "hidden",
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
    polaroidPin: (color) => ({
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
    polaroidPinNeedle: {
      position: "absolute",
      width: "2px",
      height: "8px",
      background: "linear-gradient(to bottom, #999, #666)",
      left: "50%",
      top: "16px",
      transform: "translateX(-50%)",
      boxShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
    },
    cardWrap: {
      width: 400,
      maxWidth: "90vw",
      background: "#fafbfc",
      borderRadius: 12,
      padding: "48px 40px 40px 40px",
      boxShadow: isHovered 
        ? "-6px 8px 20px rgba(0, 0, 0, 0.15), -12px 16px 40px rgba(0, 0, 0, 0.1)"
        : "-4px 6px 16px rgba(0, 0, 0, 0.12), -8px 12px 32px rgba(0, 0, 0, 0.08)",
      position: "relative",
      zIndex: 2,
      opacity: isLoaded ? 1 : 0,
      transform: isLoaded 
        ? (isHovered ? "rotate(-1.5deg) translateY(-4px)" : "rotate(-1.5deg)")
        : "rotate(-1.5deg) scale(0.95)",
      transformOrigin: "center top",
      transition: "all 0.3s ease-out, opacity 0.8s ease-out",
      border: "1px solid rgba(220, 230, 245, 0.4)",
    },
    pin: {
      position: "absolute",
      top: "-16px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "28px",
      height: "28px",
      zIndex: 10,
    },
    pinHead: {
      position: "absolute",
      width: "28px",
      height: "28px",
      background: "radial-gradient(circle at 35% 35%, #b8d4f0, #8db8e8 50%, #6a9fd9 100%)",
      borderRadius: "50%",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2), inset -2px -2px 4px rgba(0, 0, 0, 0.1), inset 2px 2px 4px rgba(255, 255, 255, 0.5)",
    },
    pinNeedle: {
      position: "absolute",
      width: "2px",
      height: "12px",
      background: "linear-gradient(to bottom, #a5b8cc 0%, #7a8fa3 100%)",
      left: "13px",
      top: "24px",
      boxShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
      borderRadius: "0 0 1px 1px",
    },
    pinShadow: {
      position: "absolute",
      width: "24px",
      height: "8px",
      background: "radial-gradient(ellipse, rgba(0, 0, 0, 0.15) 0%, transparent 70%)",
      left: "50%",
      top: "8px",
      transform: "translateX(-50%)",
      borderRadius: "50%",
      zIndex: 1,
    },
    heading: {
      textAlign: "center",
      marginBottom: 8,
      marginTop: 0,
      fontSize: 28,
      fontWeight: 600,
      color: "#4a505d",
      letterSpacing: "-0.5px",
    },
    sub: {
      textAlign: "center",
      fontSize: 14,
      color: "#9ba3b0",
      marginBottom: 32,
      fontWeight: 400,
    },
    field: {
      display: "flex",
      flexDirection: "column",
      marginBottom: 20,
    },
    label: {
      fontSize: 13,
      fontWeight: 500,
      color: "#6b7280",
      marginBottom: 8,
      display: "flex",
      alignItems: "center",
      gap: 6,
    },
    icon: {
      fontSize: "14px",
      opacity: 0.6,
    },
    input: {
      width: "100%",
      height: 44,
      padding: "12px 16px",
      borderRadius: 8,
      border: "1.5px solid #dde3eb",
      outline: "none",
      fontSize: 14,
      color: "#3b3f4a",
      backgroundColor: "#ffffff",
      boxSizing: "border-box",
      transition: "all 0.2s ease",
      fontFamily: "inherit",
    },
    forgotLink: {
      fontSize: 12,
      color: "#7b8cd9",
      textDecoration: "none",
      fontWeight: 500,
      marginTop: 8,
      display: "inline-block",
      transition: "color 0.2s ease",
    },
    button: {
      width: "100%",
      height: 46,
      background: "#7b8cd9",
      color: "#fff",
      border: "none",
      borderRadius: 10,
      fontSize: 15,
      fontWeight: 600,
      cursor: "pointer",
      marginTop: 24,
      letterSpacing: "0.2px",
      transition: "all 0.2s ease",
      boxShadow: "0 2px 8px rgba(123, 140, 217, 0.25)",
      fontFamily: "inherit",
    },
    footer: {
      marginTop: 24,
      textAlign: "center",
      fontSize: 13,
      color: "#9ba3b0",
    },
    createLink: {
      color: "#7b8cd9",
      textDecoration: "none",
      fontWeight: 500,
      marginLeft: 4,
    },
    status: {
      marginTop: 12,
      fontSize: 13,
      fontWeight: 600,
      color: "#4a5568",
    },
    error: {
      color: "#d14343",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);
    try {
      await login({ email, password });
      setStatus("Connected! Redirecting...");
      setTimeout(() => navigate("/overview"), 400);
    } catch (err) {
      setStatus(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        input:focus {
          border-color: #7b8cd9 !important;
        }
        button:hover {
          background: #6a7bc5 !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(123, 140, 217, 0.35) !important;
        }
        button:active {
          transform: translateY(0);
        }
        a:hover {
          color: #6a7bc5 !important;
        }
      `}</style>
      <div style={styles.page}>
        {polaroidPhotos.map((photo, index) => (
          <div key={index} style={styles.polaroid(photo)}>
            <div style={styles.polaroidPin(photo.pinColor)}>
              <div style={styles.polaroidPinNeedle}></div>
            </div>
            <img src={photo.img} alt="" style={styles.polaroidImage} />
          </div>
        ))}
        
        <div 
          style={styles.cardWrap} 
          aria-labelledby="signin-heading"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div style={styles.pinShadow}></div>
          <div style={styles.pin}>
            <div style={styles.pinHead}></div>
            <div style={styles.pinNeedle}></div>
          </div>
          
          <h2 id="signin-heading" style={styles.heading}>Sign In</h2>
          <div style={styles.sub}>Enter your information below</div>

          <form aria-label="Sign in form" onSubmit={handleSubmit}>
            <div style={styles.field}>
              <label style={styles.label} htmlFor="email">
                <span style={styles.icon}>✉</span> Email
              </label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="Enter your email" 
                style={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label} htmlFor="password">
                <span style={styles.icon}>🔒</span> Password
              </label>
              <input 
                id="password" 
                name="password" 
                type="password" 
                placeholder="Enter your password" 
                style={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <a href="#" style={styles.forgotLink}>Forgot password?</a>
            </div>

            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? "Connecting..." : "Sign In"}
            </button>
            {status && (
              <div style={{ ...styles.status, ...(status.toLowerCase().includes("fail") || status.toLowerCase().includes("invalid") ? styles.error : {}) }}>
                {status}
              </div>
            )}
          </form>

          <div style={styles.footer}>
            New here?
            <Link to="/signup" style={styles.createLink}>Create an account</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
