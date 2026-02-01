import React from "react";
import { useNavigate } from 'react-router-dom';

const Overview = () => {
  const navigate = useNavigate();
  const styles = {
    page: {
      minHeight: "100vh",
      width: "100%",
      maxWidth: "100vw",
      background: "linear-gradient(to bottom right, #e8eef9 0%, #f5f7fb 50%, #ffffff 100%)",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      color: "#2d3748",
      padding: "12px 16px",
      boxSizing: "border-box",
      overflow: "hidden",
      overflowY: "auto",
    },
    topBar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "8px",
      gap: "12px",
    },
    topBarRight: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    iconButton: {
      width: "38px",
      height: "38px",
      borderRadius: "10px",
      background: "rgba(255, 255, 255, 0.7)",
      backdropFilter: "blur(10px)",
      border: "none",
      cursor: "pointer",
      fontSize: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#7b8cd9",
      transition: "all 0.3s ease",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)",
    },
    avatar: {
      width: "38px",
      height: "38px",
      borderRadius: "10px",
      background: "linear-gradient(135deg, #7b8cd9 0%, #9eadeb 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "18px",
      color: "#ffffff",
      boxShadow: "0 4px 12px rgba(123, 140, 217, 0.25)",
      border: "none",
    },
    welcomeSection: {
      display: "flex",
      alignItems: "center",
    },
    rightSection: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      alignItems: "flex-end",
    },
    welcomeText: {
      fontSize: "52px",
      fontWeight: 700,
      fontFamily: "'Dancing Script', cursive",
      background: "linear-gradient(135deg, #5a67d8 0%, #7b8cd9 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      letterSpacing: "-0.5px",
      WebkitTextStroke: "1px #5a67d8",
    },
    newMemoryBtn: {
      padding: "10px 24px",
      fontSize: "14px",
      fontWeight: 600,
      borderRadius: "10px",
      background: "linear-gradient(135deg, #7b8cd9 0%, #9eadeb 100%)",
      color: "#ffffff",
      border: "none",
      cursor: "pointer",
      boxShadow: "0 4px 16px rgba(123, 140, 217, 0.25)",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      transition: "all 0.3s ease",
    },
    mainContent: {
      display: "grid",
      gridTemplateColumns: "1fr 320px",
      gap: "20px",
      alignItems: "stretch",
      height: "calc(100vh - 140px)",
    },
    boardContainer: {
      background: "rgba(255, 255, 255, 0.7)",
      backdropFilter: "blur(20px)",
      borderRadius: "20px",
      padding: "24px",
      boxShadow: "0 6px 24px rgba(123, 140, 217, 0.1), 0 2px 6px rgba(0, 0, 0, 0.04)",
      position: "relative",
      border: "none",
    },
    board: {
      background: "linear-gradient(to bottom, #fafbff 0%, #f0f3f9 100%)",
      borderRadius: "14px",
      height: "100%",
      position: "relative",
      overflow: "hidden",
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1), 0 8px 32px rgba(123, 140, 217, 0.15), inset 0 2px 8px rgba(123, 140, 217, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.8)",
    },
    polaroid: {
      position: "absolute",
      background: "#ffffff",
      padding: "8px 8px 32px 8px",
      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.06)",
      borderRadius: "2px",
      cursor: "pointer",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    polaroidImg: {
      width: "130px",
      height: "110px",
      objectFit: "cover",
      display: "block",
      borderRadius: "2px",
    },
    stickyNote: {
      position: "absolute",
      padding: "10px 12px",
      borderRadius: "2px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04)",
      fontSize: "12px",
      lineHeight: "1.5",
      fontFamily: "'Kalam', cursive",
      cursor: "pointer",
      transition: "all 0.3s ease",
      border: "none",
    },
    pin: {
      position: "absolute",
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      boxShadow: "0 3px 8px rgba(0, 0, 0, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.4)",
    },
    camera: {
      position: "absolute",
      bottom: "20px",
      left: "20px",
      background: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(10px)",
      padding: "8px 14px",
      borderRadius: "10px",
      boxShadow: "0 3px 12px rgba(0, 0, 0, 0.06)",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "16px",
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    cameraText: {
      fontSize: "13px",
      fontWeight: 500,
      color: "#5a67d8",
    },
    editButton: {
      position: "absolute",
      bottom: "18px",
      left: "50%",
      transform: "translateX(-50%)",
      background: "#ffffff",
      color: "#7b8cd9",
      padding: "8px 20px",
      borderRadius: "10px",
      border: "none",
      cursor: "pointer",
      boxShadow: "0 4px 16px rgba(123, 140, 217, 0.12), 0 2px 4px rgba(0, 0, 0, 0.04)",
      fontSize: "13px",
      fontWeight: 600,
      display: "flex",
      alignItems: "center",
      gap: "6px",
      transition: "all 0.3s ease",
    },
    sidebar: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    newMemoryTall: {
      background: "linear-gradient(135deg, #7b8cd9 0%, #9eadeb 100%)",
      color: "#fff",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "15px",
      fontWeight: 600,
      padding: "12px 24px",
      boxShadow: "0 4px 16px rgba(123, 140, 217, 0.25)",
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    sidebarCard: {
      background: "rgba(255, 255, 255, 0.8)",
      backdropFilter: "blur(20px)",
      borderRadius: "16px",
      padding: "18px",
      boxShadow: "0 3px 16px rgba(123, 140, 217, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04)",
      border: "none",
    },
    sidebarHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "14px",
    },
    sidebarTitle: {
      fontSize: "17px",
      fontWeight: 700,
      color: "#2d3748",
      letterSpacing: "-0.3px",
    },
    recentItem: {
      display: "flex",
      gap: "12px",
      padding: "8px",
      borderRadius: "10px",
      marginBottom: "6px",
      transition: "all 0.2s ease",
      cursor: "pointer",
    },
    recentThumb: {
      width: "52px",
      height: "52px",
      borderRadius: "10px",
      objectFit: "cover",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
    },
    recentText: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    recentTitle: {
      fontSize: "13.5px",
      fontWeight: 600,
      color: "#2d3748",
      marginBottom: "4px",
      lineHeight: "1.4",
    },
    recentTime: {
      fontSize: "12px",
      color: "#a0aec0",
      fontWeight: 500,
    },
    viewAll: {
      textAlign: "center",
      marginTop: "8px",
    },
    viewAllLink: {
      color: "#7b8cd9",
      fontSize: "13px",
      textDecoration: "none",
      fontWeight: 600,
      padding: "8px 16px",
      borderRadius: "8px",
      display: "inline-block",
      transition: "all 0.2s ease",
    },
    textarea: {
      width: "100%",
      minHeight: "80px",
      padding: "10px",
      borderRadius: "10px",
      border: "1px solid rgba(123, 140, 217, 0.1)",
      fontSize: "13px",
      fontFamily: "inherit",
      resize: "vertical",
      outline: "none",
      marginBottom: "10px",
      background: "rgba(255, 255, 255, 0.5)",
      transition: "all 0.3s ease",
      color: "#2d3748",
      lineHeight: "1.6",
    },
    writeBtn: {
      width: "100%",
      padding: "10px",
      borderRadius: "10px",
      background: "linear-gradient(135deg, #7b8cd9 0%, #9eadeb 100%)",
      color: "#ffffff",
      border: "none",
      cursor: "pointer",
      fontSize: "13px",
      fontWeight: 600,
      boxShadow: "0 3px 10px rgba(123, 140, 217, 0.2)",
      transition: "all 0.3s ease",
    },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Kalam:wght@400&family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(123, 140, 217, 0.35) !important;
        }
        
        .icon-btn:hover {
          background: rgba(123, 140, 217, 0.12) !important;
          transform: translateY(-1px);
        }
        
        .polaroid:hover {
          transform: translateY(-8px) rotate(0deg) scale(1.05) !important;
          z-index: 100;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.18), 0 4px 12px rgba(0, 0, 0, 0.12) !important;
        }
        
        .sticky-note:hover {
          transform: translateY(-4px) rotate(0deg) !important;
          z-index: 50;
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1) !important;
        }
        
        .camera-icon:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12) !important;
        }
        
        .edit-btn:hover {
          background: linear-gradient(135deg, #7b8cd9 0%, #9eadeb 100%) !important;
          color: white !important;
          transform: translateX(-50%) translateY(-2px) !important;
        }
        
        .recent-item:hover {
          background: rgba(123, 140, 217, 0.06);
          transform: translateX(4px);
        }
        
        .view-all-link:hover {
          background: rgba(123, 140, 217, 0.08);
        }
        
        textarea:focus {
          border-color: rgba(123, 140, 217, 0.35) !important;
          box-shadow: 0 0 0 3px rgba(123, 140, 217, 0.08) !important;
        }
        
        .write-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(123, 140, 217, 0.35) !important;
        }
        
        ::placeholder {
          color: #a0aec0;
        }
        
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(123, 140, 217, 0.05);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(123, 140, 217, 0.3);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(123, 140, 217, 0.5);
        }
      `}</style>
      <div style={styles.page}>
        {/* Top Bar */}
        <div style={styles.topBar}>
          {/* Welcome Section */}
          <div style={styles.welcomeSection}>
            <h2 style={styles.welcomeText}>Welcome back, Alex!</h2>
          </div>
          
          <div style={styles.rightSection}>
            <div style={styles.avatar}>👤</div>
          </div>
        </div>

        {/* Main Content */}
        <div style={styles.mainContent}>
          {/* Board */}
          <div style={styles.boardContainer}>
            <div style={styles.board}>
              {/* Polaroid Photos */}
              <div className="polaroid" style={{...styles.polaroid, top: "35px", left: "45px", transform: "rotate(-7deg)"}}>
                <img src="https://images.unsplash.com/photo-1502933691298-84fc14542831?w=400&q=80" alt="Palm trees" style={styles.polaroidImg} />
              </div>
              
              <div className="polaroid" style={{...styles.polaroid, top: "55px", left: "210px", transform: "rotate(5deg)"}}>
                <img src="https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=400&q=80" alt="Sunset" style={styles.polaroidImg} />
              </div>
              
              <div className="polaroid" style={{...styles.polaroid, top: "45px", left: "370px", transform: "rotate(-4deg)"}}>
                <img src="https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?w=400&q=80" alt="Las Vegas" style={styles.polaroidImg} />
              </div>
              
              <div className="polaroid" style={{...styles.polaroid, top: "230px", left: "55px", transform: "rotate(6deg)"}}>
                <img src="https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&q=80" alt="Palm trees" style={styles.polaroidImg} />
              </div>
              
              <div className="polaroid" style={{...styles.polaroid, top: "270px", left: "210px", transform: "rotate(-6deg)"}}>
                <img src="https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&q=80" alt="Beach sunset" style={styles.polaroidImg} />
              </div>
              
              <div className="polaroid" style={{...styles.polaroid, top: "210px", left: "480px", transform: "rotate(7deg)"}}>
                <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80" alt="Pizza" style={styles.polaroidImg} />
              </div>
              
              <div className="polaroid" style={{...styles.polaroid, top: "330px", left: "360px", transform: "rotate(-5deg)"}}>
                <img src="https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&q=80" alt="Beer and pizza" style={styles.polaroidImg} />
              </div>
              
              <div className="polaroid" style={{...styles.polaroid, top: "375px", left: "510px", transform: "rotate(8deg)"}}>
                <img src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&q=80" alt="Restaurant" style={styles.polaroidImg} />
              </div>

              {/* Sticky Notes */}
              <div className="sticky-note" style={{...styles.stickyNote, top: "230px", left: "22px", background: "linear-gradient(135deg, #fff9c4 0%, #ffeb8f 100%)", width: "115px", transform: "rotate(-6deg)"}}>
                <div style={{marginBottom: "6px", fontWeight: "700", fontSize: "13px"}}>Today's goals</div>
                <div style={{fontSize: "11.5px"}}>✓ Pin new memories</div>
                <div style={{fontSize: "11.5px"}}>✓ Organize the board</div>
                <div style={{fontSize: "11.5px"}}>✓ Have fun</div>
              </div>
              
              <div className="sticky-note" style={{...styles.stickyNote, top: "395px", left: "20px", background: "linear-gradient(135deg, #e1bee7 0%, #d8a8e0 100%)", width: "105px", transform: "rotate(-5deg)", fontSize: "11px"}}>
                Remember to relax and enjoy the little moments.
              </div>
              
              <div className="sticky-note" style={{...styles.stickyNote, top: "375px", left: "295px", background: "linear-gradient(135deg, #fff9c4 0%, #ffeb8f 100%)", width: "95px", transform: "rotate(6deg)"}}>
                Book our next trip!
              </div>
              
              <div className="sticky-note" style={{...styles.stickyNote, top: "165px", left: "530px", background: "linear-gradient(135deg, #e3f2fd 0%, #c8e4fc 100%)", width: "125px", transform: "rotate(-4deg)", borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%"}}>
                Feeling so grateful for our Vegas trip!
              </div>
              
              <div className="sticky-note" style={{...styles.stickyNote, bottom: "110px", right: "45px", background: "linear-gradient(135deg, #c8e6c9 0%, #aed9af 100%)", width: "105px", transform: "rotate(5deg)"}}>
                Where should we go next?
              </div>

              {/* Pins */}
              <div style={{...styles.pin, top: "24px", left: "115px", background: "#5c6bc0"}}></div>
              <div style={{...styles.pin, top: "44px", left: "295px", background: "#ef5350"}}></div>
              <div style={{...styles.pin, top: "34px", left: "455px", background: "#ffa726"}}></div>
              <div style={{...styles.pin, top: "214px", left: "125px", background: "#66bb6a"}}></div>
              <div style={{...styles.pin, top: "254px", left: "295px", background: "#ab47bc"}}></div>
              <div style={{...styles.pin, top: "194px", left: "560px", background: "#26c6da"}}></div>
              <div style={{...styles.pin, top: "314px", left: "440px", background: "#5c6bc0"}}></div>
              <div style={{...styles.pin, top: "354px", left: "590px", background: "#66bb6a"}}></div>

              {/* Camera */}
              <div className="camera-icon" style={styles.camera}>
                <span>📷</span>
                <span style={styles.cameraText}>Board Camera</span>
              </div>

              {/* Edit Button */}
              <button className="edit-btn" style={styles.editButton}>
                ✏️ Edit Board
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div style={styles.sidebar}>
            {/* Tall New Memory button matching board height */}
            <button style={styles.newMemoryTall} onClick={() => navigate('/wall')} aria-label="Create New Memory">
              + New Memory
            </button>

            {/* Recent Section */}
            <div style={styles.sidebarCard}>
              <div style={styles.sidebarHeader}>
                <div style={styles.sidebarTitle}>Recent</div>
                <button className="icon-btn" style={{...styles.iconButton, fontSize: "16px", width: "32px", height: "32px"}}>⋯</button>
              </div>

              <div className="recent-item" style={styles.recentItem}>
                <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&q=80" alt="Pizza" style={styles.recentThumb} />
                <div style={styles.recentText}>
                  <div style={styles.recentTitle}>Yummy pizza night! 🙏🍕</div>
                  <div style={styles.recentTime}>2h ago</div>
                </div>
              </div>

              <div className="recent-item" style={styles.recentItem}>
                <img src="https://images.unsplash.com/photo-1502933691298-84fc14542831?w=100&q=80" alt="Vegas" style={styles.recentThumb} />
                <div style={styles.recentText}>
                  <div style={styles.recentTitle}>Fun night in Vegas! 🎊</div>
                  <div style={styles.recentTime}>1d ago</div>
                </div>
              </div>

              <div className="recent-item" style={styles.recentItem}>
                <img src="https://images.unsplash.com/photo-1519046904884-53103b34b206?w=100&q=80" alt="Beach" style={styles.recentThumb} />
                <div style={styles.recentText}>
                  <div style={styles.recentTitle}>Beautiful beach sunset</div>
                  <div style={styles.recentTime}>3d ago</div>
                </div>
              </div>

              <div style={styles.viewAll}>
                <a href="#" className="view-all-link" style={styles.viewAllLink}>View All</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
