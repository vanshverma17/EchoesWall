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
  const [pendingDelete, setPendingDelete] = React.useState(null);
<<<<<<< HEAD
=======
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
      gridTemplateColumns: "65% 35%",
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
      width: "100%",
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

    sidebar: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      width: "100%",
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
      width: "100%",
      marginLeft: 0,
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
      width: "100%",
      marginLeft: 0,
    },
    modalOverlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.35)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 999,
      padding: "16px",
    },
    confirmCard: {
      background: "#ffffff",
      borderRadius: "14px",
      padding: "20px",
      maxWidth: "360px",
      width: "100%",
      boxShadow: "0 12px 32px rgba(0,0,0,0.18)",
      border: "1px solid rgba(123, 140, 217, 0.25)",
    },
    confirmTitle: {
      fontSize: "18px",
      fontWeight: 700,
      color: "#1a202c",
      marginBottom: "8px",
    },
    confirmText: {
      fontSize: "14px",
      color: "#4a5568",
      marginBottom: "16px",
      lineHeight: 1.5,
    },
    confirmActions: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "10px",
    },
    confirmCancel: {
      padding: "8px 14px",
      borderRadius: "10px",
      border: "1px solid rgba(123, 140, 217, 0.25)",
      background: "#f7fafc",
      color: "#2d3748",
      cursor: "pointer",
      fontWeight: 700,
      fontSize: "13px",
    },
    confirmDelete: {
      padding: "8px 14px",
      borderRadius: "10px",
      border: "1px solid rgba(239, 68, 68, 0.25)",
      background: "#fef2f2",
      color: "#c53030",
      cursor: "pointer",
      fontWeight: 700,
      fontSize: "13px",
    },
  };
>>>>>>> 6c2bab318ecfb1082042758c3c2d4e66b2d8d697

  React.useEffect(() => {
    const user = getStoredUser();
    if (user) {
      const name = user.name || user.email || "Friend";
      setFirstName(name.split(" ")[0] || name);
    }
  }, []);

  React.useEffect(() => {
    const loadEchoes = async () => {
      const user = getStoredUser();
      setEchoLoading(true);
      setEchoError("");
      setRecentLoading(true);
      setRecentError("");
      try {
        const snapshots = await fetchEchoes({ history: true, userId: user?.id });
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

  const requestDelete = React.useCallback((snapshotId, titleText) => {
    if (!snapshotId) return;
    setPendingDelete({ id: snapshotId, title: titleText || "this wall" });
  }, []);

  const handleDeleteSnapshot = React.useCallback(async () => {
    const snapshotId = pendingDelete?.id;
    if (!snapshotId) return;
    setDeletingId(snapshotId);
    try {
      const user = getStoredUser();
      await deleteWallSnapshot(snapshotId, { userId: user?.id });
      setRecentEchoes((prev) => prev.filter((snap) => (snap.id || snap._id) !== snapshotId));
      setEchoCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error(err);
      setRecentError("Couldn't delete this wall. Please try again.");
    } finally {
      setDeletingId("");
      setPendingDelete(null);
    }
  }, [pendingDelete]);

  const filteredRecentEchoes = React.useMemo(() => {
    const list = Array.isArray(recentEchoes) ? [...recentEchoes] : [];
    const query = searchTerm.trim().toLowerCase();
    if (!query) return list;

    return list.filter((snapshot) => {
      const textBlob = Array.isArray(snapshot.items)
        ? snapshot.items.map((it) => it.text || "").join(" ")
        : "";
      const title = snapshot.title || "";
      return (title.toLowerCase().includes(query) || textBlob.toLowerCase().includes(query));
    });
  }, [recentEchoes, searchTerm]);

  const visibleRecentEchoes = React.useMemo(() => {
    return showAllRecent ? filteredRecentEchoes : filteredRecentEchoes.slice(0, 5);
  }, [filteredRecentEchoes, showAllRecent]);

  return (
<<<<<<< HEAD
    <div className="min-h-screen w-full max-w-[100vw] bg-[linear-gradient(to_bottom_right,#dfe6f2_0%,#eef1f6_50%,#f8faff_100%)] text-[#2d3748] p-3 md:p-4 overflow-hidden overflow-y-auto box-border font-sans">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 md:mb-2 gap-3 md:gap-3">
        {/* Welcome Section */}
        <div className="flex items-center">
          <div>
            <h2 className="text-[32px] md:text-[52px] font-bold font-dancing bg-[linear-gradient(135deg,#5a67d8_0%,#7b8cd9_100%)] bg-clip-text text-transparent tracking-tight [-webkit-text-stroke:1px_#5a67d8] leading-[1.2]">Welcome back, {firstName}!</h2>
            <div className="mt-1 text-[14px] md:text-[16px] font-semibold text-[#4a5568]">
              {echoLoading
                ? "Loading your echoes..."
                : echoError
                ? echoError
                : `You have ${echoCount} saved echoes`}
=======
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
        
        @media (max-width: 768px) {
          .overview-page {
            padding: 8px 12px !important;
            overflow-x: hidden !important;
          }
          
          .overview-top-bar {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
            margin-bottom: 12px !important;
          }
          
          .welcome-text {
            font-size: 32px !important;
          }
          
          .welcome-subtitle {
            font-size: 14px !important;
          }
          
          .new-memory-btn {
            padding: 8px 18px !important;
            font-size: 13px !important;
          }
          
          .main-content-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            height: auto !important;
          }
          
          .board-container {
            padding: 16px !important;
            height: 400px !important;
          }
          
          .board-inner {
            height: 100% !important;
          }
          
          .polaroid {
            width: 100px !important;
            padding: 6px 6px 24px 6px !important;
          }
          
          .polaroid img {
            width: 88px !important;
            height: 80px !important;
          }
          
          .sticky-note {
            padding: 8px 10px !important;
            font-size: 10px !important;
            max-width: 90px !important;
          }
          
          .sidebar-section {
            width: 100% !important;
          }
          
          .sidebar-card {
            padding: 14px !important;
          }
          
          .recent-item {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 10px !important;
          }
          
          .recent-meta {
            width: 100% !important;
          }
          
          .recent-actions {
            width: 100% !important;
            margin-left: 0 !important;
            justify-content: flex-end !important;
          }
          
          .search-container {
            flex-direction: row !important;
          }
          

        }
      `}</style>
      <div className="overview-page" style={styles.page}>
        {/* Top Bar */}
        <div className="overview-top-bar" style={styles.topBar}>
          {/* Welcome Section */}
          <div style={styles.welcomeSection}>
            <div>
              <h2 className="welcome-text" style={styles.welcomeText}>Welcome back, {firstName}!</h2>
              <div className="welcome-subtitle" style={styles.welcomeSubtitle}>
                {echoLoading
                  ? "Loading your echoes..."
                  : echoError
                  ? echoError
                  : `You have ${echoCount} saved echoes`}
              </div>
>>>>>>> 6c2bab318ecfb1082042758c3c2d4e66b2d8d697
            </div>
          </div>
        </div>
      </div>

<<<<<<< HEAD
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-[65%_35%] gap-4 md:gap-5 items-stretch h-auto md:h-[calc(100vh-140px)]">
        {/* Board */}
        <div className="bg-white/70 backdrop-blur-[20px] rounded-[20px] p-4 md:p-6 shadow-[0_6px_24px_rgba(123,140,217,0.1),0_2px_6px_rgba(0,0,0,0.04)] relative border border-[rgba(123,140,217,0.25)] w-full h-[400px] md:h-auto">
          <div className="bg-[linear-gradient(to_bottom,#f4f6fb_0%,#e8edf5_100%)] rounded-[14px] h-full w-full relative overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.1),0_8px_32px_rgba(123,140,217,0.15),inset_0_2px_8px_rgba(123,140,217,0.05)] border border-[rgba(123,140,217,0.3)]">
            {/* Polaroid Photos */}
            <div className="absolute bg-white p-1.5 pb-6 md:p-2 md:pb-8 shadow-[0_6px_20px_rgba(0,0,0,0.1),0_2px_6px_rgba(0,0,0,0.06)] rounded-[2px] cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-2 hover:!rotate-0 hover:scale-105 hover:z-50 hover:shadow-[0_16px_40px_rgba(0,0,0,0.18),0_4px_12px_rgba(0,0,0,0.12)] w-[100px] md:w-[130px]" style={{top: "35px", left: "45px", transform: "rotate(-7deg)"}}>
              <img src="https://images.unsplash.com/photo-1502933691298-84fc14542831?w=400&q=80" alt="Palm trees" className="w-[88px] h-[80px] md:w-[130px] md:h-[110px] object-cover block rounded-[2px]" />
=======
        {/* Main Content */}
        <div className="main-content-grid" style={styles.mainContent}>
          {/* Board */}
          <div className="board-container" style={styles.boardContainer}>
            <div className="board-inner" style={styles.board}>
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


>>>>>>> 6c2bab318ecfb1082042758c3c2d4e66b2d8d697
            </div>
            
            <div className="absolute bg-white p-1.5 pb-6 md:p-2 md:pb-8 shadow-[0_6px_20px_rgba(0,0,0,0.1),0_2px_6px_rgba(0,0,0,0.06)] rounded-[2px] cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-2 hover:!rotate-0 hover:scale-105 hover:z-50 hover:shadow-[0_16px_40px_rgba(0,0,0,0.18),0_4px_12px_rgba(0,0,0,0.12)] w-[100px] md:w-[130px]" style={{top: "55px", left: "210px", transform: "rotate(5deg)"}}>
              <img src="https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=400&q=80" alt="Sunset" className="w-[88px] h-[80px] md:w-[130px] md:h-[110px] object-cover block rounded-[2px]" />
            </div>
            
            <div className="absolute bg-white p-1.5 pb-6 md:p-2 md:pb-8 shadow-[0_6px_20px_rgba(0,0,0,0.1),0_2px_6px_rgba(0,0,0,0.06)] rounded-[2px] cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-2 hover:!rotate-0 hover:scale-105 hover:z-50 hover:shadow-[0_16px_40px_rgba(0,0,0,0.18),0_4px_12px_rgba(0,0,0,0.12)] w-[100px] md:w-[130px]" style={{top: "45px", left: "370px", transform: "rotate(-4deg)"}}>
              <img src="https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?w=400&q=80" alt="Las Vegas" className="w-[88px] h-[80px] md:w-[130px] md:h-[110px] object-cover block rounded-[2px]" />
            </div>
            
            <div className="absolute bg-white p-1.5 pb-6 md:p-2 md:pb-8 shadow-[0_6px_20px_rgba(0,0,0,0.1),0_2px_6px_rgba(0,0,0,0.06)] rounded-[2px] cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-2 hover:!rotate-0 hover:scale-105 hover:z-50 hover:shadow-[0_16px_40px_rgba(0,0,0,0.18),0_4px_12px_rgba(0,0,0,0.12)] w-[100px] md:w-[130px]" style={{top: "230px", left: "55px", transform: "rotate(6deg)"}}>
              <img src="https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&q=80" alt="Palm trees" className="w-[88px] h-[80px] md:w-[130px] md:h-[110px] object-cover block rounded-[2px]" />
            </div>
            
            <div className="absolute bg-white p-1.5 pb-6 md:p-2 md:pb-8 shadow-[0_6px_20px_rgba(0,0,0,0.1),0_2px_6px_rgba(0,0,0,0.06)] rounded-[2px] cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-2 hover:!rotate-0 hover:scale-105 hover:z-50 hover:shadow-[0_16px_40px_rgba(0,0,0,0.18),0_4px_12px_rgba(0,0,0,0.12)] w-[100px] md:w-[130px]" style={{top: "270px", left: "210px", transform: "rotate(-6deg)"}}>
              <img src="https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&q=80" alt="Beach sunset" className="w-[88px] h-[80px] md:w-[130px] md:h-[110px] object-cover block rounded-[2px]" />
            </div>
            
            <div className="absolute bg-white p-1.5 pb-6 md:p-2 md:pb-8 shadow-[0_6px_20px_rgba(0,0,0,0.1),0_2px_6px_rgba(0,0,0,0.06)] rounded-[2px] cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-2 hover:!rotate-0 hover:scale-105 hover:z-50 hover:shadow-[0_16px_40px_rgba(0,0,0,0.18),0_4px_12px_rgba(0,0,0,0.12)] w-[100px] md:w-[130px]" style={{top: "210px", left: "480px", transform: "rotate(7deg)"}}>
              <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80" alt="Pizza" className="w-[88px] h-[80px] md:w-[130px] md:h-[110px] object-cover block rounded-[2px]" />
            </div>
            
            <div className="absolute bg-white p-1.5 pb-6 md:p-2 md:pb-8 shadow-[0_6px_20px_rgba(0,0,0,0.1),0_2px_6px_rgba(0,0,0,0.06)] rounded-[2px] cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-2 hover:!rotate-0 hover:scale-105 hover:z-50 hover:shadow-[0_16px_40px_rgba(0,0,0,0.18),0_4px_12px_rgba(0,0,0,0.12)] w-[100px] md:w-[130px]" style={{top: "330px", left: "360px", transform: "rotate(-5deg)"}}>
              <img src="https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&q=80" alt="Beer and pizza" className="w-[88px] h-[80px] md:w-[130px] md:h-[110px] object-cover block rounded-[2px]" />
            </div>
            
            <div className="absolute bg-white p-1.5 pb-6 md:p-2 md:pb-8 shadow-[0_6px_20px_rgba(0,0,0,0.1),0_2px_6px_rgba(0,0,0,0.06)] rounded-[2px] cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-2 hover:!rotate-0 hover:scale-105 hover:z-50 hover:shadow-[0_16px_40px_rgba(0,0,0,0.18),0_4px_12px_rgba(0,0,0,0.12)] w-[100px] md:w-[130px]" style={{top: "375px", left: "510px", transform: "rotate(8deg)"}}>
              <img src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&q=80" alt="Restaurant" className="w-[88px] h-[80px] md:w-[130px] md:h-[110px] object-cover block rounded-[2px]" />
            </div>

            {/* Sticky Notes */}
            <div className="absolute p-2 md:p-[10px_12px] rounded-[2px] shadow-[0_4px_12px_rgba(0,0,0,0.08),0_1px_4px_rgba(0,0,0,0.04)] text-[10px] md:text-[12px] max-w-[90px] md:max-w-none leading-[1.5] font-kalam cursor-pointer transition-all duration-300 ease-in border-none hover:-translate-y-1 hover:!rotate-0 hover:z-40 hover:shadow-[0_12px_28px_rgba(0,0,0,0.15),0_4px_10px_rgba(0,0,0,0.1)]" style={{top: "230px", left: "22px", background: "linear-gradient(135deg, #fff9c4 0%, #ffeb8f 100%)", width: "115px", transform: "rotate(-6deg)"}}>
              <div className="mb-1.5 font-bold text-[13px]">Today's goals</div>
              <div className="text-[11.5px]">✓ Pin new memories</div>
              <div className="text-[11.5px]">✓ Organize the board</div>
              <div className="text-[11.5px]">✓ Have fun</div>
            </div>
            
            <div className="absolute p-2 md:p-[10px_12px] rounded-[2px] shadow-[0_4px_12px_rgba(0,0,0,0.08),0_1px_4px_rgba(0,0,0,0.04)] text-[10px] md:text-[11px] max-w-[90px] md:max-w-none leading-[1.5] font-kalam cursor-pointer transition-all duration-300 ease-in border-none hover:-translate-y-1 hover:!rotate-0 hover:z-40 hover:shadow-[0_12px_28px_rgba(0,0,0,0.15),0_4px_10px_rgba(0,0,0,0.1)]" style={{top: "395px", left: "20px", background: "linear-gradient(135deg, #e1bee7 0%, #d8a8e0 100%)", width: "105px", transform: "rotate(-5deg)"}}>
              Remember to relax and enjoy the little moments.
            </div>
            
            <div className="absolute p-2 md:p-[10px_12px] rounded-[2px] shadow-[0_4px_12px_rgba(0,0,0,0.08),0_1px_4px_rgba(0,0,0,0.04)] text-[10px] md:text-[12px] max-w-[90px] md:max-w-none leading-[1.5] font-kalam cursor-pointer transition-all duration-300 ease-in border-none hover:-translate-y-1 hover:!rotate-0 hover:z-40 hover:shadow-[0_12px_28px_rgba(0,0,0,0.15),0_4px_10px_rgba(0,0,0,0.1)]" style={{top: "375px", left: "295px", background: "linear-gradient(135deg, #fff9c4 0%, #ffeb8f 100%)", width: "95px", transform: "rotate(6deg)"}}>
              Book our next trip!
            </div>
            
            <div className="absolute p-2 md:p-[10px_12px] shadow-[0_4px_12px_rgba(0,0,0,0.08),0_1px_4px_rgba(0,0,0,0.04)] text-[10px] md:text-[12px] max-w-[90px] md:max-w-none leading-[1.5] font-kalam cursor-pointer transition-all duration-300 ease-in border-none hover:-translate-y-1 hover:!rotate-0 hover:z-40 hover:shadow-[0_12px_28px_rgba(0,0,0,0.15),0_4px_10px_rgba(0,0,0,0.1)]" style={{top: "165px", left: "530px", background: "linear-gradient(135deg, #e3f2fd 0%, #c8e4fc 100%)", width: "125px", transform: "rotate(-4deg)", borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%"}}>
              Feeling so grateful for our Vegas trip!
            </div>
            
            <div className="absolute p-2 md:p-[10px_12px] rounded-[2px] shadow-[0_4px_12px_rgba(0,0,0,0.08),0_1px_4px_rgba(0,0,0,0.04)] text-[10px] md:text-[12px] max-w-[90px] md:max-w-none leading-[1.5] font-kalam cursor-pointer transition-all duration-300 ease-in border-none hover:-translate-y-1 hover:!rotate-0 hover:z-40 hover:shadow-[0_12px_28px_rgba(0,0,0,0.15),0_4px_10px_rgba(0,0,0,0.1)]" style={{bottom: "110px", right: "45px", background: "linear-gradient(135deg, #c8e6c9 0%, #aed9af 100%)", width: "105px", transform: "rotate(5deg)"}}>
              Where should we go next?
            </div>

            {/* Pins */}
            <div className="absolute w-3 h-3 rounded-full shadow-[0_3px_8px_rgba(0,0,0,0.25),inset_0_1px_2px_rgba(255,255,255,0.4)]" style={{top: "24px", left: "115px", background: "#5c6bc0"}}></div>
            <div className="absolute w-3 h-3 rounded-full shadow-[0_3px_8px_rgba(0,0,0,0.25),inset_0_1px_2px_rgba(255,255,255,0.4)]" style={{top: "44px", left: "295px", background: "#ef5350"}}></div>
            <div className="absolute w-3 h-3 rounded-full shadow-[0_3px_8px_rgba(0,0,0,0.25),inset_0_1px_2px_rgba(255,255,255,0.4)]" style={{top: "34px", left: "455px", background: "#ffa726"}}></div>
            <div className="absolute w-3 h-3 rounded-full shadow-[0_3px_8px_rgba(0,0,0,0.25),inset_0_1px_2px_rgba(255,255,255,0.4)]" style={{top: "214px", left: "125px", background: "#66bb6a"}}></div>
            <div className="absolute w-3 h-3 rounded-full shadow-[0_3px_8px_rgba(0,0,0,0.25),inset_0_1px_2px_rgba(255,255,255,0.4)]" style={{top: "254px", left: "295px", background: "#ab47bc"}}></div>
            <div className="absolute w-3 h-3 rounded-full shadow-[0_3px_8px_rgba(0,0,0,0.25),inset_0_1px_2px_rgba(255,255,255,0.4)]" style={{top: "194px", left: "560px", background: "#26c6da"}}></div>
            <div className="absolute w-3 h-3 rounded-full shadow-[0_3px_8px_rgba(0,0,0,0.25),inset_0_1px_2px_rgba(255,255,255,0.4)]" style={{top: "314px", left: "440px", background: "#5c6bc0"}}></div>
            <div className="absolute w-3 h-3 rounded-full shadow-[0_3px_8px_rgba(0,0,0,0.25),inset_0_1px_2px_rgba(255,255,255,0.4)]" style={{top: "354px", left: "590px", background: "#66bb6a"}}></div>

            {/* Camera */}
            <div className="absolute bottom-3 md:bottom-5 left-3 md:left-5 bg-white/95 backdrop-blur-[10px] p-[6px_10px] md:p-[8px_14px] rounded-[10px] shadow-[0_3px_12px_rgba(0,0,0,0.06)] flex items-center gap-2 text-[10px] md:text-[16px] border-none cursor-pointer transition-all duration-300 ease-in hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] text-[#5a67d8]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px] md:w-[18px] md:h-[18px]">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                <circle cx="12" cy="13" r="4"></circle>
              </svg>
              <span className="text-[10px] md:text-[13px] font-medium text-[#5a67d8]">Board Camera</span>
            </div>

            {/* Edit Button */}
            <button className="absolute bottom-3 md:bottom-[18px] left-1/2 -translate-x-1/2 bg-white text-[#7b8cd9] p-[6px_16px] md:p-[8px_20px] rounded-[10px] border-none cursor-pointer shadow-[0_4px_16px_rgba(123,140,217,0.12),0_2px_4px_rgba(0,0,0,0.04)] text-[11px] md:text-[13px] font-semibold flex items-center gap-1.5 transition-all duration-300 ease-in hover:bg-[linear-gradient(135deg,#7b8cd9_0%,#9eadeb_100%)] hover:text-white hover:-translate-y-0.5" onClick={() => navigate('/wall/new')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              Edit Board
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-5 w-full">
          {/* Search Bar with New Memory Button */}
          <div className="flex flex-row md:flex-row gap-2.5 items-center w-full ml-0">
            <button className="bg-[linear-gradient(135deg,#7b8cd9_0%,#9eadeb_100%)] text-white rounded-[10px] flex items-center justify-center text-[20px] font-light w-10 h-[37px] min-w-[40px] min-h-[37px] p-0 shadow-[0_4px_16px_rgba(123,140,217,0.25)] border-none cursor-pointer transition-all duration-300 ease-in hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(123,140,217,0.35)]" onClick={() => navigate('/wall/new')} aria-label="Create New Memory">
              +
            </button>
            <input
              type="text"
              className="w-full p-[10px_16px] rounded-[10px] border border-[rgba(123,140,217,0.2)] text-[13px] font-inherit outline-none bg-white/80 text-[#2d3748] transition-all duration-300 ease-in box-border focus:border-[rgba(123,140,217,0.5)] focus:shadow-[0_0_0_3px_rgba(123,140,217,0.1)] placeholder-[#a0aec0]"
              placeholder="Search memories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Recent Section */}
          <div className="w-full ml-0 bg-white/80 backdrop-blur-[20px] rounded-[16px] p-[14px] md:p-[18px] shadow-[0_3px_16px_rgba(123,140,217,0.08),0_1px_3px_rgba(0,0,0,0.04)] border border-[rgba(123,140,217,0.25)] flex flex-col">
            <div className="flex justify-between items-center mb-[14px]">
              <div className="text-[17px] font-bold text-[#2d3748] tracking-[-0.3px]">Recent</div>
              <button className="w-8 h-8 rounded-[10px] bg-white/70 backdrop-blur-[10px] border-none cursor-pointer text-[16px] flex items-center justify-center text-[#7b8cd9] transition-all duration-300 ease-in shadow-[0_2px_6px_rgba(0,0,0,0.04)] hover:bg-[rgba(123,140,217,0.12)] hover:-translate-y-[1px]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="1.5"></circle>
                  <circle cx="12" cy="6" r="1.5"></circle>
                  <circle cx="12" cy="18" r="1.5"></circle>
                </svg>
              </button>
            </div>

            <div className={`flex flex-col gap-3 ${showAllRecent ? "max-h-[440px] min-h-[260px] overflow-y-auto pr-1" : ""}`}>
              {recentLoading ? (
                <div className="p-3 rounded-[12px] bg-[rgba(123,140,217,0.08)] text-[#4a5568] font-semibold text-center">Loading recent echoes...</div>
              ) : recentError ? (
                <div className="p-3 rounded-[12px] bg-[rgba(123,140,217,0.08)] text-[#4a5568] font-semibold text-center">{recentError}</div>
              ) : visibleRecentEchoes.length === 0 ? (
                <div className="p-3 rounded-[12px] bg-[rgba(123,140,217,0.08)] text-[#4a5568] font-semibold text-center">
                  {searchTerm.trim()
                    ? "No matches found for your search."
                    : "No echoes yet. Create your first memory!"}
                </div>
              ) : (
                visibleRecentEchoes.map((snapshot) => {
                  const snapshotId = snapshot.id || snapshot._id;
                  const baseTitle = snapshot.title?.trim?.() || "Saved wall";
                  const firstText = snapshot.items?.find((it) => it.text)?.text || baseTitle;
                  const titleText = `${baseTitle || firstText}`.trim() || "Saved wall";
                  const displayTitle = `${titleText.slice(0, 60)}${titleText.length > 60 ? "…" : ""}`;
                  const timeLabel = formatTimeAgo(snapshot.updatedAt || snapshot.createdAt);
                  const thumbInitial = displayTitle.trim().charAt(0).toUpperCase() || "W";
                  const countLabel = `${snapshot.items?.length || 0} items`;
                  return (
                    <div key={snapshotId || snapshot.updatedAt || snapshot.createdAt || titleText} className="flex flex-col md:flex-row items-start md:items-center gap-2.5 md:gap-3 p-2.5 rounded-[14px] bg-[linear-gradient(135deg,rgba(123,140,217,0.1)_0%,rgba(255,255,255,0.95)_100%)] shadow-[0_4px_14px_rgba(0,0,0,0.06)] border border-[rgba(123,140,217,0.35)] transition-all duration-200 ease-in justify-between hover:bg-[rgba(123,140,217,0.06)] hover:translate-x-1">
                      <div className="flex items-center gap-3 flex-1 min-w-0 w-full md:w-auto">
                        <div className="w-[64px] h-[64px] rounded-[12px] object-cover bg-[#e2e8f0] border border-[rgba(123,140,217,0.35)] shrink-0 flex items-center justify-center font-bold text-[#4a5568]">
                          {thumbInitial}
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="font-bold text-[#2d3748] text-[14px]">{displayTitle || "Saved wall"}</div>
                          <div className="text-[12px] text-[#718096] font-medium">{timeLabel} • {countLabel}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 w-full md:w-auto ml-0 md:ml-3 shrink-0 justify-end md:justify-start">
                        <button
                          className="border border-[rgba(123,140,217,0.25)] bg-[rgba(123,140,217,0.12)] text-[#5a67d8] p-[6px_12px] rounded-[10px] font-bold text-[12px] cursor-pointer transition-all duration-200 ease-in min-w-[70px] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(123,140,217,0.35)]"
                          onClick={() => navigate(`/wall/${snapshotId}`)}
                          disabled={!snapshotId}
                        >
                          Edit
                        </button>
                        <button
                          className={`border border-[rgba(239,68,68,0.25)] bg-[rgba(239,68,68,0.08)] text-[#c53030] p-[6px_12px] rounded-[10px] font-bold text-[12px] cursor-pointer transition-all duration-200 ease-in min-w-[70px] hover:-translate-y-0.5 ${deletingId === snapshotId ? 'opacity-60 cursor-not-allowed' : ''}`}
                          onClick={() => requestDelete(snapshotId, displayTitle)}
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
              <div className="text-center mt-2">
                <a
                  href="#"
                  className="text-[#7b8cd9] text-[13px] no-underline font-semibold p-[8px_16px] rounded-[8px] inline-block transition-all duration-200 ease-in hover:bg-[rgba(123,140,217,0.08)]"
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
      {pendingDelete && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.35)] flex items-center justify-center z-[999] p-4">
          <div className="bg-white rounded-[14px] p-5 max-w-[360px] w-full shadow-[0_12px_32px_rgba(0,0,0,0.18)] border border-[rgba(123,140,217,0.25)]">
            <div className="text-[18px] font-bold text-[#1a202c] mb-2">Delete this wall?</div>
            <div className="text-[14px] text-[#4a5568] mb-4 leading-[1.5]">
              This will permanently remove "{pendingDelete.title}". You cannot undo this action.
            </div>
            <div className="flex justify-end gap-2.5">
              <button className="p-[8px_14px] rounded-[10px] border border-[rgba(123,140,217,0.25)] bg-[#f7fafc] text-[#2d3748] cursor-pointer font-bold text-[13px] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(123,140,217,0.35)]" onClick={() => setPendingDelete(null)}>Cancel</button>
              <button
                className={`p-[8px_14px] rounded-[10px] border border-[rgba(239,68,68,0.25)] bg-[#fef2f2] text-[#c53030] cursor-pointer font-bold text-[13px] hover:-translate-y-0.5 ${deletingId === pendingDelete.id ? 'opacity-70 cursor-not-allowed' : ''}`}
                onClick={handleDeleteSnapshot}
                disabled={deletingId === pendingDelete.id}
              >
                {deletingId === pendingDelete.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;
