import React, { useState, useRef } from "react";

const Wall = () => {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [formData, setFormData] = useState({ text: "", url: "", color: "" });
  const [dragging, setDragging] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const draggingMetaRef = useRef(null);
  const elRef = useRef(null);
  const rafRef = useRef(null);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const [saved, setSaved] = useState(true);

  const openModal = (type) => {
    setModalType(type);
    const defaultColor = type === "note" ? "#fff9c4" : "#ffffff";
    setFormData({ text: "", url: "", color: defaultColor });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({ text: "", url: "", color: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalType === "image" && !formData.url) return;
    if ((modalType === "note" || modalType === "thought") && !formData.text) return;

    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    const top = Math.floor(40 + Math.random() * 400);
    const left = Math.floor(40 + Math.random() * 600);
    
    const newItem = {
      id,
      type: modalType,
      top: `${top}px`,
      left: `${left}px`,
      ...(modalType === "image" ? { src: formData.url } : { text: formData.text, color: formData.color })
    };
    
    setItems((s) => [...s, newItem]);
    setSaved(false);
    closeModal();
  };

  const removeItem = (id) => {
    setItems((s) => s.filter((i) => i.id !== id));
    setSaved(false);
  };
  
  const clearAll = () => {
    if (window.confirm("Clear all items from the wall?")) {
      setItems([]);
      setSaved(false);
    }
  };

  const pinColors = ["#7ba3d9", "#8b9fd9", "#ff8c69", "#d98bb8", "#7bc9a3", "#ffd166", "#ef6b6b"];
  const getRandomPinColor = () => pinColors[Math.floor(Math.random() * pinColors.length)];

  const saveWall = () => {
    localStorage.setItem('echoesWall', JSON.stringify(items));
    setSaved(true);
    alert('Wall saved successfully!');
  };

  const loadWall = () => {
    const saved = localStorage.getItem('echoesWall');
    if (saved) {
      setItems(JSON.parse(saved));
      setSaved(true);
    }
  };

  React.useEffect(() => {
    loadWall();
  }, []);

  const handleMouseDown = (e, id) => {
    if (e.target.tagName === 'BUTTON') return;
    e.preventDefault();
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const offset = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    setDragOffset(offset);
    const computed = window.getComputedStyle(el);
    const origLeft = parseFloat(computed.left) || 0;
    const origTop = parseFloat(computed.top) || 0;
    draggingMetaRef.current = { id, origLeft, origTop };
    elRef.current = el;
    el.style.zIndex = 2000;
    el.style.willChange = 'transform';
    setDragging(id);
  };

  const applyTransform = (deltaX, deltaY) => {
    const el = elRef.current;
    if (!el) return;
    el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  };

  const handleMouseMove = (e) => {
    if (!dragging || !draggingMetaRef.current) return;
    const canvas = document.querySelector('.canvas-area');
    if (!canvas) return;
    const canvasRect = canvas.getBoundingClientRect();
    const newLeft = e.clientX - canvasRect.left - dragOffset.x;
    const newTop = e.clientY - canvasRect.top - dragOffset.y;

    const { origLeft, origTop } = draggingMetaRef.current;
    const deltaX = Math.max(0, newLeft) - origLeft;
    const deltaY = Math.max(0, newTop) - origTop;

    lastPosRef.current = { newLeft: Math.max(0, newLeft), newTop: Math.max(0, newTop), deltaX, deltaY };

    if (!rafRef.current) {
      rafRef.current = window.requestAnimationFrame(() => {
        const { deltaX, deltaY } = lastPosRef.current;
        applyTransform(deltaX, deltaY);
        rafRef.current = null;
      });
    }
  };

  const handleMouseUp = () => {
    if (!dragging) return;
    const meta = draggingMetaRef.current;
    const el = elRef.current;
    if (meta && el) {
      const { newLeft, newTop } = lastPosRef.current;
      el.style.transform = '';
      el.style.left = `${newLeft}px`;
      el.style.top = `${newTop}px`;
      el.style.zIndex = '';

      setItems(prev => prev.map(item => item.id === meta.id ? { ...item, left: `${newLeft}px`, top: `${newTop}px` } : item));
    }

    if (rafRef.current) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    draggingMetaRef.current = null;
    elRef.current = null;
    lastPosRef.current = { x: 0, y: 0 };
    setDragging(null);
    setSaved(false);
  };

  const styles = {
    page: {
      minHeight: "100vh",
      width: "100vw",
      padding: "16px",
      boxSizing: "border-box",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      background: "linear-gradient(to bottom right, #e8f6ff 0%, #f5fbff 50%, #ffffff 100%)",
      display: "flex",
      flexDirection: "column",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "16px",
    },
    title: {
      fontSize: "32px",
      fontWeight: 700,
      fontFamily: "'Dancing Script', cursive",
      background: "linear-gradient(135deg, #5a67d8 0%, #7b8cd9 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    floatingPanel: {
      position: "fixed",
      right: "20px",
      top: "50%",
      transform: "translateY(-50%)",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      zIndex: 100,
    },
    noteBtn: {
      padding: "10px",
      borderRadius: "12px",
      border: "1px solid #e0e0e0",
      background: "#ffffff",
      color: "#4a5568",
      cursor: "pointer",
      fontWeight: 500,
      fontSize: "12px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      transition: "all 0.2s ease",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "6px",
      minWidth: "60px",
    },
    imageBtn: {
      padding: "10px",
      borderRadius: "12px",
      border: "1px solid #e0e0e0",
      background: "#ffffff",
      color: "#4a5568",
      cursor: "pointer",
      fontWeight: 500,
      fontSize: "12px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      transition: "all 0.2s ease",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "6px",
      minWidth: "60px",
    },
    thoughtBtn: {
      padding: "10px",
      borderRadius: "12px",
      border: "1px solid #e0e0e0",
      background: "#ffffff",
      color: "#4a5568",
      cursor: "pointer",
      fontWeight: 500,
      fontSize: "12px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      transition: "all 0.2s ease",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "6px",
      minWidth: "60px",
    },
    saveBtn: {
      padding: "10px",
      borderRadius: "12px",
      border: "1px solid #66bb6a",
      background: "#66bb6a",
      color: "#ffffff",
      cursor: "pointer",
      fontWeight: 500,
      fontSize: "12px",
      boxShadow: "0 4px 12px rgba(102, 187, 106, 0.3)",
      transition: "all 0.2s ease",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "6px",
      minWidth: "60px",
    },
    clearBtn: {
      padding: "10px",
      borderRadius: "12px",
      border: "1px solid #ef6b6b",
      background: "#ffffff",
      color: "#ef6b6b",
      cursor: "pointer",
      fontWeight: 500,
      fontSize: "12px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      transition: "all 0.2s ease",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "6px",
      minWidth: "60px",
    },
    savedIndicator: {
      padding: "8px 16px",
      borderRadius: "12px",
      background: "rgba(102, 187, 106, 0.1)",
      color: "#66bb6a",
      fontSize: "12px",
      fontWeight: 600,
      display: "flex",
      alignItems: "center",
      gap: "6px",
    },
    unsavedIndicator: {
      padding: "8px 16px",
      borderRadius: "12px",
      background: "rgba(255, 152, 0, 0.1)",
      color: "#ff9800",
      fontSize: "12px",
      fontWeight: 600,
      display: "flex",
      alignItems: "center",
      gap: "6px",
    },
    canvasWrap: {
      flex: 1,
      position: "relative",
      borderRadius: "20px",
      overflow: "auto",
      boxShadow: "0 6px 24px rgba(123, 140, 217, 0.1)",
    },
    canvas: {
      minHeight: "720px",
      minWidth: "100%",
      position: "relative",
      backgroundImage:
        "linear-gradient(#dff0ff 1px, transparent 1px), linear-gradient(90deg, #dff0ff 1px, transparent 1px)",
      backgroundSize: "30px 30px",
      backgroundColor: "#fafcff",
      borderRadius: "20px",
    },
    polaroid: {
      position: "absolute",
      background: "#ffffff",
      padding: "12px 12px 36px 12px",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08)",
      borderRadius: "2px",
      cursor: "move",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    pin: {
      position: "absolute",
      top: "-8px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "16px",
      height: "16px",
      borderRadius: "50%",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2), inset -2px -2px 3px rgba(0, 0, 0, 0.1), inset 2px 2px 3px rgba(255, 255, 255, 0.4)",
      zIndex: 10,
    },
    pinNeedle: {
      position: "absolute",
      width: "2px",
      height: "6px",
      background: "linear-gradient(to bottom, #999, #666)",
      left: "50%",
      top: "14px",
      transform: "translateX(-50%)",
      boxShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
    },
    polaroidImg: {
      width: "160px",
      height: "140px",
      objectFit: "cover",
      display: "block",
      borderRadius: "2px",
    },
    deleteBtn: {
      position: "absolute",
      bottom: "8px",
      left: "50%",
      transform: "translateX(-50%)",
      padding: "4px 12px",
      fontSize: "11px",
      borderRadius: "6px",
      border: "none",
      background: "rgba(239, 107, 107, 0.9)",
      color: "white",
      cursor: "pointer",
      fontWeight: 600,
    },
    stickyNote: {
      position: "absolute",
      padding: "14px 16px",
      borderRadius: "2px",
      boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.06)",
      fontSize: "13px",
      lineHeight: "1.6",
      fontFamily: "'Kalam', cursive",
      cursor: "move",
      transition: "all 0.3s ease",
      width: "180px",
      background: "linear-gradient(135deg, #fff9c4 0%, #ffeb8f 100%)",
      border: "none",
    },
    stickyText: {
      marginBottom: "10px",
      fontWeight: 500,
      wordWrap: "break-word",
    },
    cloud: {
      position: "absolute",
      padding: "16px 20px",
      borderRadius: "50px",
      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.08)",
      fontSize: "13px",
      lineHeight: "1.5",
      fontFamily: "'Inter', sans-serif",
      cursor: "move",
      transition: "all 0.3s ease",
      maxWidth: "220px",
      background: "#ffffff",
      border: "2px solid rgba(0, 0, 0, 0.08)",
    },
    cloudText: {
      marginBottom: "10px",
      fontWeight: 500,
      color: "#2d3748",
      wordWrap: "break-word",
    },
    smallDeleteBtn: {
      padding: "4px 10px",
      fontSize: "11px",
      borderRadius: "6px",
      border: "none",
      background: "rgba(239, 107, 107, 0.9)",
      color: "white",
      cursor: "pointer",
      fontWeight: 600,
    },
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0, 0, 0, 0.5)",
      backdropFilter: "blur(4px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    },
    modal: {
      background: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(20px)",
      borderRadius: "20px",
      padding: "32px",
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
      minWidth: "400px",
      maxWidth: "500px",
    },
    modalTitle: {
      fontSize: "24px",
      fontWeight: 700,
      marginBottom: "24px",
      color: "#2d3748",
      fontFamily: "'Inter', sans-serif",
    },
    formGroup: {
      marginBottom: "20px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontSize: "14px",
      fontWeight: 600,
      color: "#4a5568",
    },
    input: {
      width: "100%",
      padding: "12px",
      borderRadius: "10px",
      border: "1px solid rgba(123, 140, 217, 0.2)",
      fontSize: "14px",
      fontFamily: "inherit",
      outline: "none",
      background: "rgba(255, 255, 255, 0.8)",
      color: "#2d3748",
      transition: "all 0.3s ease",
      boxSizing: "border-box",
    },
    colorPicker: {
      width: "100%",
      height: "50px",
      padding: "4px",
      borderRadius: "10px",
      border: "none",
      cursor: "pointer",
      outline: "none",
      transition: "all 0.3s ease",
      boxSizing: "border-box",
    },
    textarea: {
      width: "100%",
      padding: "12px",
      borderRadius: "10px",
      border: "1px solid rgba(123, 140, 217, 0.2)",
      fontSize: "14px",
      fontFamily: "inherit",
      resize: "vertical",
      minHeight: "100px",
      outline: "none",
      background: "rgba(255, 255, 255, 0.8)",
      color: "#2d3748",
      transition: "all 0.3s ease",
      boxSizing: "border-box",
    },
    modalButtons: {
      display: "flex",
      gap: "12px",
      marginTop: "24px",
    },
    submitBtn: {
      flex: 1,
      padding: "12px",
      borderRadius: "10px",
      border: "none",
      background: "linear-gradient(135deg, #7b8cd9 0%, #9eadeb 100%)",
      color: "white",
      cursor: "pointer",
      fontWeight: 600,
      fontSize: "15px",
      boxShadow: "0 4px 16px rgba(123, 140, 217, 0.25)",
      transition: "all 0.3s ease",
    },
    cancelBtn: {
      flex: 1,
      padding: "12px",
      borderRadius: "10px",
      border: "1px solid rgba(123, 140, 217, 0.3)",
      background: "transparent",
      color: "#7b8cd9",
      cursor: "pointer",
      fontWeight: 600,
      fontSize: "15px",
      transition: "all 0.3s ease",
    },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Kalam:wght@400&family=Inter:wght@400;500;600;700&display=swap');
        
        .note-btn:hover,
        .image-btn:hover,
        .thought-btn:hover {
          border-color: #7b8cd9 !important;
          background: #f8f9ff !important;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15) !important;
          transform: translateX(-4px) scale(1.05) !important;
        }
        
        .save-btn:hover {
          background: #57a85b !important;
          box-shadow: 0 6px 16px rgba(102, 187, 106, 0.4) !important;
          transform: translateX(-4px) scale(1.05) !important;
        }
        
        .clear-btn:hover {
          border-color: #ef6b6b !important;
          background: #fff5f5 !important;
          box-shadow: 0 6px 16px rgba(239, 107, 107, 0.3) !important;
          transform: translateX(-4px) scale(1.05) !important;
        }
        
        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(123, 140, 217, 0.35) !important;
        }
        
        .polaroid:hover {
          transform: translateY(-4px) rotate(0deg) !important;
          z-index: 100;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.18) !important;
        }
        
        .sticky-note:hover {
          transform: translateY(-4px) rotate(0deg) !important;
          z-index: 50;
        }
        
        .cloud:hover {
          transform: scale(1.05) !important;
          z-index: 50;
        }
        
        input:focus, textarea:focus {
          border-color: rgba(123, 140, 217, 0.5) !important;
          box-shadow: 0 0 0 3px rgba(123, 140, 217, 0.1) !important;
        }
      `}</style>
      
      <div style={styles.page}>
        {/* Floating Action Buttons */}
        <div style={styles.floatingPanel}>
          <button className="save-btn" style={styles.saveBtn} onClick={saveWall} title="Save Wall">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
              <polyline points="17 21 17 13 7 13 7 21"/>
              <polyline points="7 3 7 8 15 8"/>
            </svg>
            <span>Save</span>
          </button>
          <button className="note-btn" style={styles.noteBtn} onClick={() => openModal("note")} title="Add Note">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            <span>Note</span>
          </button>
          <button className="image-btn" style={styles.imageBtn} onClick={() => openModal("image")} title="Add Image">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <span>Image</span>
          </button>
          <button className="thought-btn" style={styles.thoughtBtn} onClick={() => openModal("thought")} title="Add Thought">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <span>Thought</span>
          </button>
          <button className="clear-btn" style={styles.clearBtn} onClick={clearAll} title="Clear All">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
            <span>Clear</span>
          </button>
        </div>

        <div style={styles.header}>
          <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
            <h2 style={styles.title}>Create Your Wall</h2>
            {saved ? (
              <div style={styles.savedIndicator}>
                <span>✓</span>
                Saved
              </div>
            ) : (
              <div style={styles.unsavedIndicator}>
                <span>●</span>
                Unsaved changes
              </div>
            )}
          </div>
        </div>

        <div style={styles.canvasWrap}>
          <div className="canvas-area" style={styles.canvas} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
            {items.map((it) => {
              if (it.type === "note") {
                return (
                  <div key={it.id} className="sticky-note" style={{...styles.stickyNote, background: it.color || "linear-gradient(135deg, #fff9c4 0%, #ffeb8f 100%)", top: it.top, left: it.left, transform: `rotate(${Math.random() * 10 - 5}deg)`}} onMouseDown={(e) => handleMouseDown(e, it.id)}>
                    <div style={{...styles.pin, background: getRandomPinColor()}}>
                      <div style={styles.pinNeedle}></div>
                    </div>
                    <div style={styles.stickyText}>{it.text}</div>
                    <button style={styles.smallDeleteBtn} onClick={() => removeItem(it.id)}>
                      Delete
                    </button>
                  </div>
                );
              }

              if (it.type === "thought") {
                return (
                  <div key={it.id} className="cloud" style={{...styles.cloud, background: it.color || "#ffffff", top: it.top, left: it.left}} onMouseDown={(e) => handleMouseDown(e, it.id)}>
                    <div style={{...styles.pin, background: getRandomPinColor()}}>
                      <div style={styles.pinNeedle}></div>
                    </div>
                    <div style={styles.cloudText}>{it.text}</div>
                    <button style={styles.smallDeleteBtn} onClick={() => removeItem(it.id)}>
                      Delete
                    </button>
                  </div>
                );
              }

              if (it.type === "image") {
                return (
                  <div key={it.id} className="polaroid" style={{...styles.polaroid, top: it.top, left: it.left, transform: `rotate(${Math.random() * 10 - 5}deg)`}} onMouseDown={(e) => handleMouseDown(e, it.id)}>
                    <div style={{...styles.pin, background: getRandomPinColor()}}>
                      <div style={styles.pinNeedle}></div>
                    </div>
                    <img src={it.src} alt="memory" style={styles.polaroidImg} />
                    <button style={styles.deleteBtn} onClick={() => removeItem(it.id)}>
                      Delete
                    </button>
                  </div>
                );
              }

              return null;
            })}
          </div>
        </div>

        {/* Modal Overlay */}
        {showModal && (
          <div style={styles.overlay} onClick={closeModal}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
              <h3 style={styles.modalTitle}>
                {modalType === "note" && "Add a New Note"}
                {modalType === "image" && "Add a New Image"}
                {modalType === "thought" && "Add a New Thought"}
              </h3>
              <form onSubmit={handleSubmit}>
                {modalType === "image" ? (
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Image URL</label>
                    <input
                      type="url"
                      style={styles.input}
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                  </div>
                ) : (
                  <>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>
                        {modalType === "note" ? "Note Content" : "Thought Content"}
                      </label>
                      <textarea
                        style={styles.textarea}
                        value={formData.text}
                        onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                        placeholder={modalType === "note" ? "Write your note here..." : "Share your thought..."}
                        required
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Background Color</label>
                      <input
                        type="color"
                        style={styles.colorPicker}
                        value={formData.color}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      />
                    </div>
                  </>
                )}
                <div style={styles.modalButtons}>
                  <button type="button" style={styles.cancelBtn} onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="submit" style={styles.submitBtn}>
                    Add to Wall
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Wall;
