import React from "react";
import { useNavigate } from 'react-router-dom';
import { fetchEchoes, deleteWallSnapshot } from "../services/echoesApi";
import { getStoredUser } from "../services/authApi";

const formatTimeAgo = (dateString) => {
  if (!dateString) return "Just now";
  const date = new Date(dateString);
  const diffSeconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (Number.isNaN(diffSeconds) || diffSeconds < 0) return "Just now";
  if (diffSeconds < 60) return `${diffSeconds}s ago`;
  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks < 4) return `${diffWeeks}w ago`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths}mo ago`;
  const diffYears = Math.floor(diffDays / 365);
  return `${diffYears}y ago`;
};

const Overview = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = React.useState("Friend");
  const [echoCount, setEchoCount] = React.useState(0);
  const [echoLoading, setEchoLoading] = React.useState(true);
  const [echoError, setEchoError] = React.useState("");
  const [recentEchoes, setRecentEchoes] = React.useState([]);
  const [recentLoading, setRecentLoading] = React.useState(true);
  const [recentError, setRecentError] = React.useState("");
  const [showAllRecent, setShowAllRecent] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [deletingId, setDeletingId] = React.useState("");
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
      borderRadius: "50%",
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
    welcomeSubtitle: {
      marginTop: "4px",
      fontSize: "16px",
      fontWeight: 600,
      color: "#4a5568",
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
      gridTemplateColumns: "1fr 400px",
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
      width: "80%",
    },
    board: {
      background: "linear-gradient(to bottom, #fafbff 0%, #f0f3f9 100%)",
      borderRadius: "14px",
      height: "100%",
      width: "100%",
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
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "20px",
      fontWeight: 300,
      width: "40px",
      height: "37px",
      minWidth: "40px",
      minHeight: "37px",
      padding: 0,
      boxShadow: "0 4px 16px rgba(123, 140, 217, 0.25)",
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    sidebarCard: {
      width: "calc(100% + 200px)",
      marginLeft: "-200px",
      background: "rgba(255, 255, 255, 0.8)",
      backdropFilter: "blur(20px)",
      borderRadius: "16px",
      padding: "18px",
      boxShadow: "0 3px 16px rgba(123, 140, 217, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04)",
      border: "none",
      display: "flex",
      flexDirection: "column",
    },
    recentItemsContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
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
      alignItems: "center",
      gap: "12px",
      padding: "10px",
      borderRadius: "14px",
      background: "linear-gradient(135deg, rgba(123, 140, 217, 0.08) 0%, rgba(255, 255, 255, 0.9) 100%)",
      boxShadow: "0 4px 14px rgba(0, 0, 0, 0.06)",
      border: "1px solid rgba(123, 140, 217, 0.15)",
      transition: "all 0.2s ease",
      justifyContent: "space-between",
    },
    recentThumb: {
      width: "64px",
      height: "64px",
      borderRadius: "12px",
      objectFit: "cover",
      background: "#e2e8f0",
      border: "1px solid rgba(123, 140, 217, 0.1)",
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 700,
      color: "#4a5568",
    },
    recentText: {
      display: "flex",
      flexDirection: "column",
      gap: "4px",
    },
    recentMeta: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      flex: 1,
      minWidth: 0,
    },
    recentTitle: {
      fontWeight: 700,
      color: "#2d3748",
      fontSize: "14px",
    },
    recentTime: {
      fontSize: "12px",
      color: "#718096",
      fontWeight: 500,
    },
    recentEmpty: {
      padding: "12px",
      borderRadius: "12px",
      background: "rgba(123, 140, 217, 0.08)",
      color: "#4a5568",
      fontWeight: 600,
      textAlign: "center",
    },
    recentActions: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginLeft: "12px",
      flexShrink: 0,
    },
    actionBtn: {
      border: "1px solid rgba(123, 140, 217, 0.2)",
      background: "#ffffff",
      color: "#4a5568",
      padding: "6px 12px",
      borderRadius: "10px",
      fontWeight: 700,
      fontSize: "12px",
      cursor: "pointer",
      transition: "all 0.2s ease",
      minWidth: "70px",
    },
    editAction: {
      background: "rgba(123, 140, 217, 0.12)",
      color: "#5a67d8",
      border: "1px solid rgba(123, 140, 217, 0.25)",
    },
    deleteAction: {
      background: "rgba(239, 68, 68, 0.08)",
      color: "#c53030",
      border: "1px solid rgba(239, 68, 68, 0.25)",
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
    searchBar: {
      width: "100%",
      padding: "10px 16px",
      borderRadius: "10px",
      border: "1px solid rgba(123, 140, 217, 0.2)",
      fontSize: "13px",
      fontFamily: "inherit",
      outline: "none",
      background: "rgba(255, 255, 255, 0.8)",
      color: "#2d3748",
      transition: "all 0.3s ease",
      boxSizing: "border-box",
    },
    searchContainer: {
      display: "flex",
      gap: "10px",
      alignItems: "center",
      width: "calc(100% + 200px)",
      marginLeft: "-200px",
    },
  };

  React.useEffect(() => {
    const user = getStoredUser();
    if (user) {
      const name = user.name || user.email || "Friend";
      setFirstName(name.split(" ")[0] || name);
    }
  }, []);

  React.useEffect(() => {
    const loadEchoes = async () => {
      setEchoLoading(true);
      setEchoError("");
      setRecentLoading(true);
      setRecentError("");
      try {
        const snapshots = await fetchEchoes({ history: true });
        setEchoCount(snapshots.length);
        setRecentEchoes(
          [...snapshots].sort(
            (a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0)
          )
        );
        setRecentError("");
      } catch {
        setEchoError("Couldn't load echoes right now");
        setRecentError("Couldn't load recent echoes");
      } finally {
        setEchoLoading(false);
        setRecentLoading(false);
      }
    };

    loadEchoes();
  }, []);

  React.useEffect(() => {
    setShowAllRecent(false);
  }, [searchTerm]);

  const handleDeleteSnapshot = React.useCallback(
    async (snapshotId) => {
      if (!snapshotId) return;
      const confirmed = window.confirm("Delete this wall? This cannot be undone.");
      if (!confirmed) return;
      setDeletingId(snapshotId);
      try {
        await deleteWallSnapshot(snapshotId);
        setRecentEchoes((prev) => prev.filter((snap) => (snap.id || snap._id) !== snapshotId));
      } catch (err) {
        window.alert("Couldn't delete this wall. Please try again.");
      } finally {
        setDeletingId("");
      }
    },
    []
  );

  const filteredRecentEchoes = React.useMemo(() => {
    const list = Array.isArray(recentEchoes) ? [...recentEchoes] : [];
    const query = searchTerm.trim().toLowerCase();
    if (!query) return list;

    return list.filter((snapshot) => {
      const textBlob = Array.isArray(snapshot.items)
        ? snapshot.items.map((it) => it.text || "").join(" ")
        : "";
      return textBlob.toLowerCase().includes(query);
    });
  }, [recentEchoes, searchTerm]);

  const visibleRecentEchoes = React.useMemo(() => {
    return showAllRecent ? filteredRecentEchoes : filteredRecentEchoes.slice(0, 5);
  }, [filteredRecentEchoes, showAllRecent]);

  const recentListStyle = React.useMemo(() => {
    if (!showAllRecent) return styles.recentItemsContainer;
    return {
      ...styles.recentItemsContainer,
      maxHeight: "440px",
      minHeight: "260px",
      overflowY: "auto",
      paddingRight: "4px",
    };
  }, [showAllRecent, styles.recentItemsContainer]);

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
        
        .search-bar:focus {
          border-color: rgba(123, 140, 217, 0.5) !important;
          box-shadow: 0 0 0 3px rgba(123, 140, 217, 0.1) !important;
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
            <div>
              <h2 style={styles.welcomeText}>Welcome back, {firstName}!</h2>
              <div style={styles.welcomeSubtitle}>
                {echoLoading
                  ? "Loading your echoes..."
                  : echoError
                  ? echoError
                  : `You have ${echoCount} saved echoes`}
              </div>
            </div>
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
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                  <circle cx="12" cy="13" r="4"></circle>
                </svg>
                <span style={styles.cameraText}>Board Camera</span>
              </div>

              {/* Edit Button */}
              <button className="edit-btn" style={styles.editButton}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                Edit Board
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div style={styles.sidebar}>
            {/* Search Bar with New Memory Button */}
            <div style={styles.searchContainer}>
              <button style={styles.newMemoryTall} onClick={() => navigate('/wall/new')} aria-label="Create New Memory">
                +
              </button>
              <input
                type="text"
                className="search-bar"
                style={styles.searchBar}
                placeholder="Search memories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Recent Section */}
            <div style={styles.sidebarCard}>
              <div style={styles.sidebarHeader}>
                <div style={styles.sidebarTitle}>Recent</div>
                <button className="icon-btn" style={{...styles.iconButton, fontSize: "16px", width: "32px", height: "32px"}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="1.5"></circle>
                    <circle cx="12" cy="6" r="1.5"></circle>
                    <circle cx="12" cy="18" r="1.5"></circle>
                  </svg>
                </button>
              </div>

              <div style={recentListStyle}>
                {recentLoading ? (
                  <div style={styles.recentEmpty}>Loading recent echoes...</div>
                ) : recentError ? (
                  <div style={styles.recentEmpty}>{recentError}</div>
                ) : visibleRecentEchoes.length === 0 ? (
                  <div style={styles.recentEmpty}>
                    {searchTerm.trim()
                      ? "No matches found for your search."
                      : "No echoes yet. Create your first memory!"}
                  </div>
                ) : (
                  visibleRecentEchoes.map((snapshot) => {
                    const snapshotId = snapshot.id || snapshot._id;
                    const firstText = snapshot.items?.find((it) => it.text)?.text || "Saved wall";
                    const titleText = `${firstText.slice(0, 60)}${firstText.length > 60 ? "…" : ""}`;
                    const timeLabel = formatTimeAgo(snapshot.updatedAt || snapshot.createdAt);
                    const thumbInitial = titleText.trim().charAt(0).toUpperCase() || "W";
                    const countLabel = `${snapshot.items?.length || 0} items`;
                    return (
                      <div key={snapshotId || snapshot.updatedAt || snapshot.createdAt || titleText} className="recent-item" style={styles.recentItem}>
                        <div style={styles.recentMeta}>
                          <div style={{...styles.recentThumb, display: "flex", alignItems: "center", justifyContent: "center"}}>
                            {thumbInitial}
                          </div>
                          <div style={styles.recentText}>
                            <div style={styles.recentTitle}>{titleText || "Saved wall"}</div>
                            <div style={styles.recentTime}>{timeLabel} • {countLabel}</div>
                          </div>
                        </div>
                        <div style={styles.recentActions}>
                          <button
                            style={{...styles.actionBtn, ...styles.editAction}}
                            onClick={() => navigate(`/wall/${snapshotId}`)}
                            disabled={!snapshotId}
                          >
                            Edit
                          </button>
                          <button
                            style={{
                              ...styles.actionBtn,
                              ...styles.deleteAction,
                              ...(deletingId === snapshotId ? { opacity: 0.6, cursor: "not-allowed" } : {}),
                            }}
                            onClick={() => handleDeleteSnapshot(snapshotId)}
                            disabled={deletingId === snapshotId}
                          >
                            {deletingId === snapshotId ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {filteredRecentEchoes.length > 5 && !recentLoading && !recentError && (
                <div style={styles.viewAll}>
                  <a
                    href="#"
                    className="view-all-link"
                    style={styles.viewAllLink}
                    onClick={(e) => {
                      e.preventDefault();
                      setShowAllRecent((prev) => !prev);
                    }}
                  >
                    {showAllRecent ? "Show Less" : "View All"}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
