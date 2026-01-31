import React from "react";

const Overview = () => {
  const styles = {
    page: {
      minHeight: "100vh",
      maxHeight: "100vh",
      width: "100vw",
      maxWidth: "100vw",
      background: "linear-gradient(135deg, #e8eef7 0%, #dfe7f2 50%, #f0f4f9 100%)",
      fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      color: "#3b3f4a",
      position: "relative",
      overflow: "hidden",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "32px 48px",
    },
    logo: {
      fontFamily: "'Dancing Script', cursive",
      fontSize: "48px",
      color: "#7b8cd9",
      fontWeight: 700,
      margin: 0,
    },
    avatar: {
      width: "48px",
      height: "48px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #7b8cd9 0%, #8d9eeb 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "24px",
      color: "#ffffff",
      boxShadow: "0 2px 8px rgba(123, 140, 217, 0.3)",
    },
    content: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 40px 80px 40px",
    },
    heading: {
      fontSize: "42px",
      fontWeight: 600,
      color: "#4a505d",
      marginBottom: "12px",
      textAlign: "center",
    },
    subheading: {
      fontSize: "16px",
      color: "#8b94a8",
      marginBottom: "40px",
      textAlign: "center",
    },
    addButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "14px 32px",
      fontSize: "16px",
      fontWeight: 600,
      borderRadius: "50px",
      background: "#7b8cd9",
      color: "#ffffff",
      border: "none",
      cursor: "pointer",
      boxShadow: "0 4px 12px rgba(123, 140, 217, 0.3)",
      transition: "all 0.3s ease",
      marginBottom: "60px",
    },
    cardsContainer: {
      display: "flex",
      gap: "24px",
      justifyContent: "center",
      flexWrap: "wrap",
      maxWidth: "800px",
    },
    card: {
      width: "280px",
      background: "#ffffff",
      borderRadius: "16px",
      padding: "40px 32px",
      textAlign: "center",
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)",
      transition: "all 0.3s ease",
    },
    iconContainer: {
      width: "64px",
      height: "64px",
      margin: "0 auto 20px auto",
      borderRadius: "16px",
      background: "linear-gradient(135deg, #e8eef7 0%, #dfe7f2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "32px",
    },
    cardTitle: {
      fontSize: "20px",
      fontWeight: 600,
      color: "#4a505d",
      marginBottom: "8px",
    },
    cardSubtitle: {
      fontSize: "14px",
      color: "#9ba3b0",
    },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
        
        button:hover {
          background: #6a7bc5 !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(123, 140, 217, 0.4) !important;
        }
        
        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.08) !important;
        }
      `}</style>
      <div style={styles.page}>
        <div style={styles.header}>
          <h1 style={styles.logo}>Echoes</h1>
          <div style={styles.avatar}>👤</div>
        </div>

        <div style={styles.content}>
          <h2 style={styles.heading}>Your space is ready.</h2>
          <p style={styles.subheading}>Begin pinning your memories and musings.</p>
          
          <button style={styles.addButton}>
            <span>+</span> Add Wall
          </button>

          <div style={styles.cardsContainer}>
            <div className="card" style={styles.card}>
              <div style={styles.iconContainer}>📌</div>
              <div style={styles.cardTitle}>0 Total Pins</div>
            </div>
            
            <div className="card" style={styles.card}>
              <div style={styles.iconContainer}>📁</div>
              <div style={styles.cardTitle}>No walls yet</div>
              <div style={styles.cardSubtitle}>Create your first wall.</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
