import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getStoredUser, clearStoredUser } from "../services/authApi";

const Navbar = () => {
  const navigate = useNavigate();
  const user = getStoredUser();
  const initials = user?.name?.slice(0, 1)?.toUpperCase() || user?.email?.slice(0, 1)?.toUpperCase() || "👤";
  const [showDropdown, setShowDropdown] = React.useState(false);
  const dropdownRef = React.useRef(null);

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
        
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
      <nav className="flex justify-between items-center px-4 py-1.5 md:px-10 md:py-2 bg-[#eff2f5] backdrop-blur-[30px] saturate-[200%] brightness-[110%] shadow-[0_1px_8px_rgba(0,0,0,0.04),0_4px_16px_rgba(123,140,217,0.08)] border-b border-[rgba(255,255,255,0.6)] sticky top-0 z-[100]">
        <Link to="/overview" className="font-['Dancing_Script',cursive] text-[22px] md:text-[28px] text-[#7b8cd9] font-bold no-underline transition-all duration-300 ease hover:text-[#6a7bc5] hover:scale-105">
          Echoes
        </Link>
        <div className="flex gap-3 md:gap-6 items-center">
          <Link to="/overview" className="text-[12px] md:text-[14px] font-medium text-[#4a5568] no-underline transition-colors duration-300 ease hover:text-[#7b8cd9]">
            Overview
          </Link>
          <Link to="/wall" className="text-[12px] md:text-[14px] font-medium text-[#4a5568] no-underline transition-colors duration-300 ease hover:text-[#7b8cd9]">
            Wall
          </Link>
          <div className="relative flex items-center gap-2.5 cursor-pointer" onClick={() => user && setShowDropdown(!showDropdown)} ref={dropdownRef}>
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[linear-gradient(135deg,#7b8cd9_0%,#9eadeb_100%)] flex items-center justify-center text-[14px] md:text-[16px] text-white shadow-[0_4px_12px_rgba(123,140,217,0.25)] border-none cursor-pointer transition-all duration-300 ease hover:-translate-y-[2px] hover:scale-105 hover:shadow-[0_6px_16px_rgba(123,140,217,0.35)]" title={user?.email || "User"}>
              {initials}
            </div>
            {user && (
              <>
                <span className="hidden md:inline text-[13px] font-semibold text-[#4a5568]">{user.name || user.email}</span>
                <svg className="hidden md:inline transition-transform duration-200 ease" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4a5568" strokeWidth="2" style={{ transform: showDropdown ? "rotate(180deg)" : "rotate(0deg)" }}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
                
                {showDropdown && (
                  <div className="absolute top-[calc(100%+8px)] right-0 bg-white rounded-xl shadow-[0_8px_24px_rgba(123,140,217,0.15),0_2px_8px_rgba(0,0,0,0.08)] border border-[rgba(123,140,217,0.1)] min-w-[200px] overflow-hidden z-[1000] animate-slideDown" onClick={(e) => e.stopPropagation()}>
                    <div className="p-[12px_16px] border-b border-[rgba(123,140,217,0.1)] bg-[rgba(123,140,217,0.03)]">
                      <div className="text-[14px] font-bold text-[#2d3748] mb-0.5">{user.name || "User"}</div>
                      <div className="text-[12px] text-[#718096]">{user.email}</div>
                    </div>
                    <button className="p-[12px_16px] flex items-center gap-2.5 cursor-pointer border-none bg-transparent w-full text-left text-[14px] font-medium text-[#4a5568] transition-all duration-200 ease hover:bg-[rgba(123,140,217,0.08)] hover:text-[#7b8cd9]" onClick={handleLogout}>
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
