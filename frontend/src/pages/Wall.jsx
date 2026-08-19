import React, { useState, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchEchoes, saveEchoes, deleteAllEchoes, fetchWallSnapshot } from "../services/echoesApi";
import { getStoredUser } from "../services/authApi";

const PIN_COLORS = ["#7ba3d9", "#8b9fd9", "#ff8c69", "#d98bb8", "#7bc9a3", "#ffd166", "#ef6b6b"];

const Wall = ({ isNew = false }) => {
  const location = useLocation();
  const { id: wallId } = useParams();
  const isNewWall = isNew || location.pathname.startsWith("/wall/new");
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [formData, setFormData] = useState({ text: "", url: "", color: "" });
  const [uploadedFile, setUploadedFile] = useState(null);
  const [dragging, setDragging] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const draggingMetaRef = useRef(null);
  const elRef = useRef(null);
  const canvasRef = useRef(null);
  const [saved, setSaved] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [wallTitle, setWallTitle] = useState("");
  const [lastSavedTitle, setLastSavedTitle] = useState("");
  const [exporting, setExporting] = useState(false);
  const html2CanvasLoader = useRef(null);

  const openModal = (type) => {
    setModalType(type);
    const defaultColor = type === "note" ? "#fff9c4" : "#ffffff";
    setFormData({ text: "", url: "", color: defaultColor });
    setUploadedFile(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({ text: "", url: "", color: "" });
    setUploadedFile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalType === "image" && !formData.url && !uploadedFile) return;
    if ((modalType === "note" || modalType === "thought") && !formData.text) return;

    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    const top = Math.floor(40 + Math.random() * 400);
    const left = Math.floor(40 + Math.random() * 600);
    
    if (modalType === "image" && uploadedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newItem = {
          id,
          type: modalType,
          top: `${top}px`,
          left: `${left}px`,
          src: event.target.result
        };
        setItems((s) => [...s, newItem]);
        setSaved(false);
        closeModal();
      };
      reader.readAsDataURL(uploadedFile);
    } else {
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
    }
  };

  const removeItem = (id) => {
    setItems((s) => s.filter((i) => i.id !== id));
    setSaved(false);
  };

  const clearAll = async () => {
    if (!window.confirm("Clear all items from the wall?")) {
      return;
    }

    setItems([]);
    setSaved(false);
    setSaving(true);
    setError("");

    try {
      const user = getStoredUser();
      await deleteAllEchoes({ userId: user?.id });
      setSaved(true);
    } catch (err) {
      console.error(err);
      setError("Could not clear the wall. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const getRandomPinColor = React.useCallback(() => {
    return PIN_COLORS[Math.floor(Math.random() * PIN_COLORS.length)] || PIN_COLORS[0];
  }, []);

  const saveWall = async () => {
    const user = getStoredUser();
    const titleToSave = (wallTitle || "").trim();
    setSaving(true);
    setError("");
    try {
      const cleanedItems = items
        .filter((it) => it && it.type)
        .map((it) => ({
          ...it,
          id: it.id || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
        }));
      const persistedSnapshot = await saveEchoes(cleanedItems, {
        wallId: wallId && !isNewWall ? wallId : undefined,
        user,
        title: titleToSave,
      });
      setItems(persistedSnapshot?.items || []);

      const serverTitle = persistedSnapshot?.title;
      const finalTitle = serverTitle && serverTitle.trim() ? serverTitle : titleToSave;
      setWallTitle(finalTitle || "");
      setLastSavedTitle((finalTitle || "").trim());
      setSaved(true);
    } catch (err) {
      console.error(err);
      setError(err?.message || "Saving failed. Please try again.");
      setSaved(false);
    } finally {
      setSaving(false);
    }
  };

  const loadWall = React.useCallback(async () => {
    const user = getStoredUser();
    setLoading(true);
    setError("");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    try {
      let existing;
      let snapshotMeta;
      if (wallId && !isNewWall) {
        const snapshot = await fetchWallSnapshot(wallId, { signal: controller.signal, userId: user?.id });
        existing = snapshot.items || [];
        snapshotMeta = snapshot;
      } else {
        const latest = await fetchEchoes({ signal: controller.signal, userId: user?.id });
        existing = latest?.items || latest || [];
        snapshotMeta = latest;
      }
      const normalized = Array.isArray(existing)
        ? existing
            .filter((it) => it && it.type)
            .map((it) => ({
              ...it,
              id: it.id || it._id || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
            }))
        : [];
      setItems(normalized);
      if (snapshotMeta?.title !== undefined) {
        const loadedTitle = snapshotMeta.title || "";
        setWallTitle(loadedTitle);
        setLastSavedTitle((loadedTitle || "").trim());
      }
      setSaved(true);
    } catch (err) {
      console.error(err);
      const message = err?.name === "AbortError" ? "Request timed out. Please try again." : "Unable to load your wall right now.";
      setError(message);
      setSaved(false);
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  }, [isNewWall, wallId]);

  React.useEffect(() => {
    if (isNewWall) {
      setItems([]);
      setSaved(false);
      setLoading(false);
      return;
    }

    loadWall();
  }, [isNewWall, wallId, loadWall]);

  React.useEffect(() => {
    const trimmed = (wallTitle || "").trim();
    if (trimmed !== (lastSavedTitle || "")) {
      setSaved(false);
    }
  }, [wallTitle, lastSavedTitle]);

  const zoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 2));
  };

  const zoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.5));
  };

  const resetZoom = () => {
    setZoom(1);
  };

  const loadHtml2Canvas = async () => {
    if (window.html2canvas) return window.html2canvas;
    if (html2CanvasLoader.current) return html2CanvasLoader.current;

    html2CanvasLoader.current = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js";
      script.onload = () => resolve(window.html2canvas);
      script.onerror = reject;
      document.body.appendChild(script);
    });

    return html2CanvasLoader.current;
  };

  const downloadBoardImage = async () => {
    if (!canvasRef.current) return;
    try {
      setExporting(true);
      const html2canvas = await loadHtml2Canvas();
      const canvas = await html2canvas(canvasRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        logging: false,
      });

      canvas.toBlob((blob) => {
        if (!blob) {
          setExporting(false);
          return;
        }
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `echoes-wall-${new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-")}.png`;
        link.click();
        URL.revokeObjectURL(url);
        setExporting(false);
      }, "image/png");
    } catch (err) {
      console.error("Board download failed", err);
      setError("Could not save the board right now. Please try again.");
      setExporting(false);
    }
  };

  const getEventCoords = (e) => {
    if (e.touches && e.touches[0]) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  };

  const handleMouseDown = (e, id) => {
    if (e.target.tagName === 'BUTTON') return;
    e.preventDefault();
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const coords = getEventCoords(e);
    const offset = { x: coords.x - rect.left, y: coords.y - rect.top };
    setDragOffset(offset);
    const computed = window.getComputedStyle(el);
    const origLeft = parseFloat(computed.left) || 0;
    const origTop = parseFloat(computed.top) || 0;
    draggingMetaRef.current = { id, origLeft, origTop, newLeft: origLeft, newTop: origTop };
    elRef.current = el;
    el.style.zIndex = 2000;
    el.style.transition = 'none';
    el.style.userSelect = 'none';
    document.body.style.userSelect = 'none';
    setDragging(id);
  };

  const handleMouseMove = (e) => {
    if (!dragging || !draggingMetaRef.current) return;
    const el = elRef.current;
    if (!el) return;
    
    const canvas = document.querySelector('.canvas-area');
    if (!canvas) return;
    const canvasRect = canvas.getBoundingClientRect();
    const coords = getEventCoords(e);
    const newLeft = Math.max(0, coords.x - canvasRect.left - dragOffset.x);
    const newTop = Math.max(0, coords.y - canvasRect.top - dragOffset.y);

    el.style.left = `${newLeft}px`;
    el.style.top = `${newTop}px`;
    
    draggingMetaRef.current = { ...draggingMetaRef.current, newLeft, newTop };
  };

  const handleMouseUp = () => {
    if (!dragging) return;
    const meta = draggingMetaRef.current;
    const el = elRef.current;
    if (meta && el) {
      const { newLeft, newTop } = meta;
      el.style.transition = '';
      el.style.zIndex = '';
      el.style.userSelect = '';
      document.body.style.userSelect = '';

      setItems(prev => prev.map(item => item.id === meta.id ? { ...item, left: `${newLeft}px`, top: `${newTop}px` } : item));
      setSaved(false);
    }

    draggingMetaRef.current = null;
    elRef.current = null;
    setDragging(null);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setUploadedFile(file);
      setFormData({ ...formData, url: "" });
    }
  };

  return (
    <div className="h-screen w-screen p-1 md:p-2 lg:p-4 box-border font-sans bg-[linear-gradient(to_bottom_right,#e8f6ff_0%,#f5fbff_50%,#ffffff_100%)] flex flex-col overflow-hidden">
      {/* Floating Action Buttons */}
      <div className="fixed right-1 md:right-5 top-1/2 -translate-y-1/2 flex flex-col gap-1 md:gap-2.5 z-[100] md:z-[100] z-[200]">
        <button 
          className="p-1.5 md:p-2.5 rounded-[12px] border border-[#66bb6a] bg-[#66bb6a] text-white cursor-pointer font-medium text-[9px] md:text-[12px] shadow-[0_4px_12px_rgba(102,187,106,0.3)] transition-all duration-200 ease flex flex-col items-center gap-0.5 md:gap-1.5 min-w-[44px] min-h-[44px] md:min-w-[60px] md:min-h-0 hover:bg-[#57a85b] hover:shadow-[0_6px_16px_rgba(102,187,106,0.4)] hover:-translate-x-1 hover:scale-105" 
          onClick={saveWall} 
          title="Save Wall"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 md:w-[18px] md:h-[18px]">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
            <polyline points="17 21 17 13 7 13 7 21"/>
            <polyline points="7 3 7 8 15 8"/>
          </svg>
          <span>Save</span>
        </button>
        <button 
          className="p-1.5 md:p-2.5 rounded-[12px] border border-[#e0e0e0] bg-white text-[#4a5568] cursor-pointer font-medium text-[9px] md:text-[12px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-200 ease flex flex-col items-center gap-0.5 md:gap-1.5 min-w-[44px] min-h-[44px] md:min-w-[60px] md:min-h-0 hover:border-[#7b8cd9] hover:bg-[#f8f9ff] hover:shadow-[0_6px_16px_rgba(0,0,0,0.15)] hover:-translate-x-1 hover:scale-105" 
          onClick={() => openModal("note")} 
          title="Add Note"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 md:w-[18px] md:h-[18px]">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
          <span>Note</span>
        </button>
        <button 
          className="p-1.5 md:p-2.5 rounded-[12px] border border-[#e0e0e0] bg-white text-[#4a5568] cursor-pointer font-medium text-[9px] md:text-[12px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-200 ease flex flex-col items-center gap-0.5 md:gap-1.5 min-w-[44px] min-h-[44px] md:min-w-[60px] md:min-h-0 hover:border-[#7b8cd9] hover:bg-[#f8f9ff] hover:shadow-[0_6px_16px_rgba(0,0,0,0.15)] hover:-translate-x-1 hover:scale-105" 
          onClick={() => openModal("image")} 
          title="Add Image"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 md:w-[18px] md:h-[18px]">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
          <span>Image</span>
        </button>
        <button 
          className="p-1.5 md:p-2.5 rounded-[12px] border border-[#e0e0e0] bg-white text-[#4a5568] cursor-pointer font-medium text-[9px] md:text-[12px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-200 ease flex flex-col items-center gap-0.5 md:gap-1.5 min-w-[44px] min-h-[44px] md:min-w-[60px] md:min-h-0 hover:border-[#7b8cd9] hover:bg-[#f8f9ff] hover:shadow-[0_6px_16px_rgba(0,0,0,0.15)] hover:-translate-x-1 hover:scale-105" 
          onClick={() => openModal("thought")} 
          title="Add Thought"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 md:w-[18px] md:h-[18px]">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <span>Thought</span>
        </button>
        <button 
          className="p-1.5 md:p-2.5 rounded-[12px] border border-[#ef6b6b] bg-white text-[#ef6b6b] cursor-pointer font-medium text-[9px] md:text-[12px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-200 ease flex flex-col items-center gap-0.5 md:gap-1.5 min-w-[44px] min-h-[44px] md:min-w-[60px] md:min-h-0 hover:border-[#ef6b6b] hover:bg-[#fff5f5] hover:shadow-[0_6px_16px_rgba(239,107,107,0.3)] hover:-translate-x-1 hover:scale-105" 
          onClick={clearAll} 
          title="Clear All"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 md:w-[18px] md:h-[18px]">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
          <span>Clear</span>
        </button>
      </div>

      <div className="flex justify-between items-center mb-1 md:mb-0 p-2 md:p-0">
        <div className="flex items-center gap-1.5 md:gap-3 flex-wrap md:flex-nowrap">
          <h2 className="text-[20px] md:text-[32px] font-bold font-dancing bg-[linear-gradient(135deg,#5a67d8_0%,#7b8cd9_100%)] bg-clip-text text-transparent">Create Your Wall</h2>
          <input
            className="min-w-[140px] md:min-w-[220px] p-[8px_10px] md:p-[10px_12px] rounded-[10px] border border-[rgba(123,140,217,0.35)] bg-white/90 text-[12px] md:text-[14px] font-semibold text-[#2d3748] outline-none shadow-[0_4px_12px_rgba(123,140,217,0.12)] focus:border-[rgba(123,140,217,0.5)] focus:shadow-[0_0_0_3px_rgba(123,140,217,0.1)] transition-all"
            value={wallTitle}
            onChange={(e) => setWallTitle(e.target.value)}
            placeholder="Name your wall"
          />
          {saving ? (
            <div className="p-[6px_10px] md:p-[8px_16px] rounded-[12px] bg-[rgba(255,152,0,0.1)] text-[#ff9800] text-[10px] md:text-[12px] font-semibold flex items-center gap-1.5">
              <span>●</span>
              Saving...
            </div>
          ) : saved ? (
            <div className="p-[6px_10px] md:p-[8px_16px] rounded-[12px] bg-[rgba(102,187,106,0.1)] text-[#66bb6a] text-[10px] md:text-[12px] font-semibold flex items-center gap-1.5">
              <span>✓</span>
              Saved
            </div>
          ) : (
            <div className="p-[6px_10px] md:p-[8px_16px] rounded-[12px] bg-[rgba(255,152,0,0.1)] text-[#ff9800] text-[10px] md:text-[12px] font-semibold flex items-center gap-1.5">
              <span>●</span>
              Unsaved changes
            </div>
          )}
          {loading && (
            <div className="p-[6px_10px] md:p-[8px_16px] rounded-[12px] bg-[rgba(255,152,0,0.1)] text-[#ff9800] text-[10px] md:text-[12px] font-semibold flex items-center gap-1.5">
              <span>●</span>
              Loading...
            </div>
          )}
        </div>
        {error && <div className="p-[6px_10px] md:p-[8px_12px] rounded-[12px] bg-[rgba(239,107,107,0.12)] text-[#d14343] text-[11px] md:text-[12px] font-semibold">{error}</div>}
      </div>

      <div className="relative flex-1 bg-[#f4f7fc] bg-[linear-gradient(rgba(123,140,217,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(123,140,217,0.25)_1px,transparent_1px)] bg-[size:24px_24px] rounded-[12px] md:rounded-[16px] overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.08)] border border-[rgba(123,140,217,0.15)] m-1 md:m-0 h-[calc(100vh-100px)] md:h-auto">
        <div
          ref={canvasRef}
          className="canvas-area relative w-full h-full bg-transparent overflow-hidden p-2 md:p-0 touch-none md:touch-auto"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
        >
          <div style={{transform: `scale(${zoom})`, transformOrigin: "top left", transition: "transform 0.2s ease", width: "100%", height: "100%", position: "relative"}}>
            {loading ? (
              <div className="p-4 text-[#4a5568] font-semibold">Loading your wall...</div>
            ) : (
              items.map((it) => {
              if (it.type === "note") {
                return (
                  <div 
                    key={it.id} 
                    className="group absolute p-[10px_12px_32px_12px] md:p-[14px_16px_40px_16px] rounded-[2px] shadow-[0_6px_18px_rgba(0,0,0,0.1),0_2px_6px_rgba(0,0,0,0.06)] text-[11px] md:text-[13px] leading-[1.6] font-kalam cursor-move transition-all duration-300 ease-in w-[120px] md:w-[180px] min-w-[120px] md:min-w-0 border-none touch-none md:touch-auto hover:-translate-y-1 hover:!rotate-0 hover:z-50" 
                    style={{background: it.color || "linear-gradient(135deg, #fff9c4 0%, #ffeb8f 100%)", top: it.top, left: it.left, transform: `rotate(${Math.random() * 10 - 5}deg)`}} 
                    onMouseDown={(e) => handleMouseDown(e, it.id)}
                    onTouchStart={(e) => handleMouseDown(e, it.id)}
                  >
                    <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_-2px_-2px_3px_rgba(0,0,0,0.1),inset_2px_2px_3px_rgba(255,255,255,0.4)] z-10" style={{background: getRandomPinColor()}}>
                      <div className="absolute w-[2px] h-[6px] bg-[linear-gradient(to_bottom,#999,#666)] left-1/2 top-[14px] -translate-x-1/2 shadow-[1px_1px_2px_rgba(0,0,0,0.3)]"></div>
                    </div>
                    <div className="mb-2.5 font-medium break-words">{it.text}</div>
                    <button className="opacity-100 md:opacity-0 md:group-hover:opacity-100 pointer-events-auto md:pointer-events-none md:group-hover:pointer-events-auto transition-opacity duration-200 ease absolute left-1/2 -translate-x-1/2 bottom-2 p-[4px_10px] text-[11px] rounded-[6px] border-none bg-[rgba(239,107,107,0.9)] text-white cursor-pointer font-semibold" onClick={() => removeItem(it.id)}>
                      Delete
                    </button>
                  </div>
                );
              }

              if (it.type === "thought") {
                return (
                  <div 
                    key={it.id} 
                    className="group absolute p-[12px_16px] md:p-[16px_20px] rounded-[50px] shadow-[0_6px_20px_rgba(0,0,0,0.08)] text-[11px] md:text-[13px] leading-[1.5] font-sans cursor-move transition-all duration-300 ease max-w-[140px] md:max-w-[220px] border-[2px] border-[rgba(0,0,0,0.08)] touch-none md:touch-auto hover:scale-105 hover:z-50" 
                    style={{background: it.color || "#ffffff", top: it.top, left: it.left}} 
                    onMouseDown={(e) => handleMouseDown(e, it.id)}
                    onTouchStart={(e) => handleMouseDown(e, it.id)}
                  >
                    <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_-2px_-2px_3px_rgba(0,0,0,0.1),inset_2px_2px_3px_rgba(255,255,255,0.4)] z-10" style={{background: getRandomPinColor()}}>
                      <div className="absolute w-[2px] h-[6px] bg-[linear-gradient(to_bottom,#999,#666)] left-1/2 top-[14px] -translate-x-1/2 shadow-[1px_1px_2px_rgba(0,0,0,0.3)]"></div>
                    </div>
                    <div className="mb-2.5 font-medium text-[#2d3748] break-words">{it.text}</div>
                    <button className="opacity-100 md:opacity-0 md:group-hover:opacity-100 pointer-events-auto md:pointer-events-none md:group-hover:pointer-events-auto transition-opacity duration-200 ease p-[4px_10px] text-[11px] rounded-[6px] border-none bg-[rgba(239,107,107,0.9)] text-white cursor-pointer font-semibold" onClick={() => removeItem(it.id)}>
                      Delete
                    </button>
                  </div>
                );
              }

              if (it.type === "image") {
                return (
                  <div 
                    key={it.id} 
                    className="group absolute bg-white p-[10px_10px_32px_10px] md:p-[12px_12px_36px_12px] shadow-[0_8px_24px_rgba(0,0,0,0.12),0_4px_8px_rgba(0,0,0,0.08)] rounded-[2px] cursor-move transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] touch-none md:touch-auto hover:-translate-y-1 hover:!rotate-0 hover:z-[100] hover:shadow-[0_16px_40px_rgba(0,0,0,0.18)]" 
                    style={{top: it.top, left: it.left, transform: `rotate(${Math.random() * 10 - 5}deg)`}} 
                    onMouseDown={(e) => handleMouseDown(e, it.id)}
                    onTouchStart={(e) => handleMouseDown(e, it.id)}
                  >
                    <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_-2px_-2px_3px_rgba(0,0,0,0.1),inset_2px_2px_3px_rgba(255,255,255,0.4)] z-10" style={{background: getRandomPinColor()}}>
                      <div className="absolute w-[2px] h-[6px] bg-[linear-gradient(to_bottom,#999,#666)] left-1/2 top-[14px] -translate-x-1/2 shadow-[1px_1px_2px_rgba(0,0,0,0.3)]"></div>
                    </div>
                    <img src={it.src} alt="memory" className="w-[100px] h-[90px] md:w-[160px] md:h-[140px] object-cover block rounded-[2px]" />
                    <button className="opacity-100 md:opacity-0 md:group-hover:opacity-100 pointer-events-auto md:pointer-events-none md:group-hover:pointer-events-auto transition-opacity duration-200 ease absolute bottom-2 left-1/2 -translate-x-1/2 p-[4px_12px] text-[11px] rounded-[6px] border-none bg-[rgba(239,107,107,0.9)] text-white cursor-pointer font-semibold" onClick={() => removeItem(it.id)}>
                      Delete
                    </button>
                  </div>
                );
              }

              return null;
            })
            )}
          </div>
        </div>
        
        {/* Zoom Controls - Fixed Position */}
        <div className="fixed flex bg-white/95 backdrop-blur-[10px] rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.1)] z-[200] pointer-events-auto select-none bottom-[70px] md:bottom-5 left-2 md:left-5 gap-1 md:gap-2 p-1.5 md:p-2" data-html2canvas-ignore="true">
          <button className="w-9 h-9 md:w-8 md:h-8 min-w-[36px] md:min-w-[32px] rounded-[8px] border border-[rgba(123,140,217,0.3)] bg-white text-[#7b8cd9] cursor-pointer text-[18px] md:text-[16px] font-semibold flex items-center justify-center transition-all duration-200 ease hover:bg-[#7b8cd9] hover:text-white hover:scale-110" onClick={zoomOut} title="Zoom Out">
            −
          </button>
          <div className="px-1.5 md:px-2 text-[11px] md:text-[13px] font-semibold text-[#4a5568] flex items-center">{Math.round(zoom * 100)}%</div>
          <button className="w-9 h-9 md:w-8 md:h-8 min-w-[36px] md:min-w-[32px] rounded-[8px] border border-[rgba(123,140,217,0.3)] bg-white text-[#7b8cd9] cursor-pointer text-[18px] md:text-[16px] font-semibold flex items-center justify-center transition-all duration-200 ease hover:bg-[#7b8cd9] hover:text-white hover:scale-110" onClick={resetZoom} title="Reset Zoom">
            ⟲
          </button>
          <button className="w-9 h-9 md:w-8 md:h-8 min-w-[36px] md:min-w-[32px] rounded-[8px] border border-[rgba(123,140,217,0.3)] bg-white text-[#7b8cd9] cursor-pointer text-[18px] md:text-[16px] font-semibold flex items-center justify-center transition-all duration-200 ease hover:bg-[#7b8cd9] hover:text-white hover:scale-110" onClick={zoomIn} title="Zoom In">
            +
          </button>
        </div>

        <button
          className={`fixed bg-[linear-gradient(135deg,#ffffff_0%,#f4f6ff_100%)] backdrop-blur-[12px] rounded-[14px] shadow-[0_10px_30px_rgba(90,103,216,0.18),0_2px_8px_rgba(0,0,0,0.06)] flex items-center font-bold text-[#4752c4] border border-[rgba(90,103,216,0.15)] z-[200] transition-all duration-200 ease pointer-events-auto select-none bottom-2 right-2 left-2 md:left-auto md:right-[18px] md:bottom-[18px] p-[10px_12px] md:p-[11px_16px] gap-[9px] text-[11px] md:text-[13px] justify-center md:justify-start ${exporting ? 'opacity-60 cursor-not-allowed shadow-none transform-none' : 'cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(123,140,217,0.3)]'}`}
          onClick={downloadBoardImage}
          disabled={exporting}
          data-html2canvas-ignore="true"
          title="Save board to your device"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 md:w-[18px] md:h-[18px]">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
            <circle cx="12" cy="13" r="4"></circle>
          </svg>
          <span className="text-[11px] md:text-[13px] font-bold text-[#4752c4]">{exporting ? "Saving..." : "Board Camera"}</span>
        </button>
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-[4px] flex items-center justify-center z-[1000]" onClick={closeModal}>
          <div className="bg-white/95 backdrop-blur-[20px] rounded-[16px] md:rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.3)] min-w-[90vw] md:min-w-[400px] max-w-[90vw] md:max-w-[500px] p-5 md:p-8 m-4 md:m-0" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-[20px] md:text-[24px] font-bold mb-4 md:mb-6 text-[#2d3748] font-sans">
              {modalType === "note" && "Add a New Note"}
              {modalType === "image" && "Add a New Image"}
              {modalType === "thought" && "Add a New Thought"}
            </h3>
            <form onSubmit={handleSubmit}>
              {modalType === "image" ? (
                <>
                  <div className="mb-5">
                    <label className="block mb-2 text-[14px] font-semibold text-[#4a5568]">Upload Image</label>
                    <label htmlFor="file-upload" className="w-full p-3 rounded-[10px] border-2 border-dashed border-[rgba(123,140,217,0.3)] bg-[rgba(123,140,217,0.05)] text-[#7b8cd9] cursor-pointer font-semibold text-[14px] transition-all duration-300 ease flex items-center justify-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="17 8 12 3 7 8"/>
                        <line x1="12" y1="3" x2="12" y2="15"/>
                      </svg>
                      Choose Image from Device
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    {uploadedFile && (
                      <div className="mt-3 p-3 rounded-[10px] bg-[rgba(102,187,106,0.1)] text-[#66bb6a] text-[13px] font-semibold flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        {uploadedFile.name}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3 my-4 text-[#a0aec0] text-[13px] font-medium">
                    <div className="flex-1 h-px bg-[rgba(123,140,217,0.2)]"></div>
                    <span>OR</span>
                    <div className="flex-1 h-px bg-[rgba(123,140,217,0.2)]"></div>
                  </div>
                  <div className="mb-5">
                    <label className="block mb-2 text-[14px] font-semibold text-[#4a5568]">Image URL</label>
                    <input
                      type="url"
                      className="w-full p-3 rounded-[10px] border border-[rgba(123,140,217,0.2)] text-[14px] font-inherit outline-none bg-white/80 text-[#2d3748] transition-all duration-300 ease box-border focus:border-[rgba(123,140,217,0.5)] focus:shadow-[0_0_0_3px_rgba(123,140,217,0.1)]"
                      value={formData.url}
                      onChange={(e) => {
                        setFormData({ ...formData, url: e.target.value });
                        setUploadedFile(null);
                      }}
                      placeholder="https://example.com/image.jpg"
                      disabled={!!uploadedFile}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-5">
                    <label className="block mb-2 text-[14px] font-semibold text-[#4a5568]">
                      {modalType === "note" ? "Note Content" : "Thought Content"}
                    </label>
                    <textarea
                      className="w-full p-3 rounded-[10px] border border-[rgba(123,140,217,0.2)] text-[14px] font-inherit resize-y min-h-[100px] outline-none bg-white/80 text-[#2d3748] transition-all duration-300 ease box-border focus:border-[rgba(123,140,217,0.5)] focus:shadow-[0_0_0_3px_rgba(123,140,217,0.1)]"
                      value={formData.text}
                      onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                      placeholder={modalType === "note" ? "Write your note here..." : "Share your thought..."}
                      required
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block mb-2 text-[14px] font-semibold text-[#4a5568]">Background Color</label>
                    <input
                      type="color"
                      className="w-full h-[50px] p-1 rounded-[10px] border-none cursor-pointer outline-none transition-all duration-300 ease box-border"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    />
                  </div>
                </>
              )}
              <div className="flex gap-3 mt-6">
                <button type="button" className="flex-1 p-3 rounded-[10px] border border-[rgba(123,140,217,0.3)] bg-transparent text-[#7b8cd9] cursor-pointer font-semibold text-[15px] transition-all duration-300 ease hover:bg-[#f4f6ff] hover:border-[#7b8cd9]" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="flex-1 p-3 rounded-[10px] border-none bg-[linear-gradient(135deg,#7b8cd9_0%,#9eadeb_100%)] text-white cursor-pointer font-semibold text-[15px] shadow-[0_4px_16px_rgba(123,140,217,0.25)] transition-all duration-300 ease hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(123,140,217,0.35)]">
                  Add to Wall
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wall;
