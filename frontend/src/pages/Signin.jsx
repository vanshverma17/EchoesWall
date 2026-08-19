import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, setStoredUser } from "../services/authApi";
import LazyImage from "../components/LazyImage";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);
    try {
      const trimmed = email.trim();
      const user = await login({ email: trimmed, identifier: trimmed, password });
      setStoredUser(user);
      setStatus("Connected! Redirecting...");
      setTimeout(() => navigate("/overview"), 400);
    } catch (err) {
      setStatus(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen min-w-[100vw] flex items-center justify-center bg-[linear-gradient(135deg,#e8eef7_0%,#dfe7f2_50%,#f0f4f9_100%)] p-5 md:p-10 box-border font-sans text-[#3b3f4a] relative overflow-hidden">
      {polaroidPhotos.map((photo, index) => (
        <div key={index} className="absolute w-[120px] md:w-[180px] bg-white p-[8px_8px_28px_8px] md:p-[12px_12px_40px_12px] shadow-[0_4px_12px_rgba(0,0,0,0.15),0_8px_24px_rgba(0,0,0,0.1)] rounded-[4px] z-[1]" style={{ top: photo.top, left: photo.left, right: photo.right, bottom: photo.bottom, transform: `rotate(${photo.rotate}deg)` }}>
          <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 w-5 h-5 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_-2px_-2px_4px_rgba(0,0,0,0.1),inset_2px_2px_4px_rgba(255,255,255,0.4)] z-[2]" style={{ background: photo.pinColor }}>
            <div className="absolute w-[2px] h-2 bg-[linear-gradient(to_bottom,#999,#666)] left-1/2 top-4 -translate-x-1/2 shadow-[1px_1px_2px_rgba(0,0,0,0.3)]"></div>
          </div>
          <LazyImage src={photo.img} alt="" className="w-full h-[100px] md:h-[160px] rounded-[2px]" />
        </div>
      ))}
      
      <div
        className={`w-[400px] max-w-[95vw] md:max-w-[90vw] bg-[#fafbfc] rounded-[12px] p-[36px_28px] md:p-[48px_40px_40px_40px] relative z-[2] transition-all duration-[800ms] ease-out border border-[rgba(220,230,245,0.4)] ${isLoaded ? 'opacity-100' : 'opacity-0 scale-95'} ${isHovered && isLoaded ? '-translate-y-1 shadow-[-6px_8px_20px_rgba(0,0,0,0.15),-12px_16px_40px_rgba(0,0,0,0.1)] rotate-[-1.5deg]' : 'shadow-[-4px_6px_16px_rgba(0,0,0,0.12),-8px_12px_32px_rgba(0,0,0,0.08)] rotate-[-1.5deg]'}`} 
        aria-labelledby="signin-heading"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ transformOrigin: "center top" }}
      >
        <div className="absolute w-6 h-2 bg-[radial-gradient(ellipse,rgba(0,0,0,0.15)_0%,transparent_70%)] left-1/2 top-2 -translate-x-1/2 rounded-full z-[1]"></div>
        <div className="absolute top-[-16px] left-1/2 -translate-x-1/2 w-7 h-7 z-10">
          <div className="absolute w-7 h-7 bg-[radial-gradient(circle_at_35%_35%,#b8d4f0,#8db8e8_50%,#6a9fd9_100%)] rounded-full shadow-[0_2px_6px_rgba(0,0,0,0.2),inset_-2px_-2px_4px_rgba(0,0,0,0.1),inset_2px_2px_4px_rgba(255,255,255,0.5)]"></div>
          <div className="absolute w-[2px] h-3 bg-[linear-gradient(to_bottom,#a5b8cc_0%,#7a8fa3_100%)] left-[13px] top-6 shadow-[1px_1px_2px_rgba(0,0,0,0.3)] rounded-[0_0_1px_1px]"></div>
        </div>
        
        <h2 id="signin-heading" className="text-center mb-2 mt-0 text-[28px] md:text-[28px] font-semibold text-[#4a505d] tracking-[-0.5px]">Sign In</h2>
        <div className="text-center text-[14px] text-[#9ba3b0] mb-8 font-normal">Enter your information below</div>

        <form aria-label="Sign in form" onSubmit={handleSubmit}>
          <div className="flex flex-col mb-5">
            <label className="text-[13px] font-medium text-[#6b7280] mb-2 flex items-center gap-1.5" htmlFor="email">
              <span className="text-[14px] opacity-60">✉</span> Email or User ID
            </label>
            <input 
              id="email" 
              name="email" 
              type="text" 
              placeholder="Enter your email or User ID" 
              className="w-full h-11 p-[10px_12px] md:p-[12px_16px] rounded-lg border-[1.5px] border-[#dde3eb] outline-none text-[14px] text-[#3b3f4a] bg-white box-border transition-all duration-200 ease font-inherit focus:border-[#7b8cd9]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col mb-5">
            <label className="text-[13px] font-medium text-[#6b7280] mb-2 flex items-center gap-1.5" htmlFor="password">
              <span className="text-[14px] opacity-60">🔒</span> Password
            </label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              placeholder="Enter your password" 
              className="w-full h-11 p-[10px_12px] md:p-[12px_16px] rounded-lg border-[1.5px] border-[#dde3eb] outline-none text-[14px] text-[#3b3f4a] bg-white box-border transition-all duration-200 ease font-inherit focus:border-[#7b8cd9]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <a href="#" className="text-[12px] text-[#7b8cd9] no-underline font-medium mt-2 inline-block transition-colors duration-200 ease hover:text-[#6a7bc5]">Forgot password?</a>
          </div>

          <button type="submit" className="w-full h-[46px] bg-[#7b8cd9] text-white border-none rounded-[10px] text-[15px] font-semibold cursor-pointer mt-6 tracking-[0.2px] transition-all duration-200 ease shadow-[0_2px_8px_rgba(123,140,217,0.25)] font-inherit p-3 md:p-0 hover:bg-[#6a7bc5] hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(123,140,217,0.35)] active:translate-y-0" disabled={loading}>
            {loading ? "Connecting..." : "Sign In"}
          </button>
          {status && (
            <div className={`mt-3 text-[13px] font-semibold text-[#4a5568] ${(status.toLowerCase().includes("fail") || status.toLowerCase().includes("invalid") ? "text-[#d14343]" : "")}`}>
              {status}
            </div>
          )}
        </form>

        <div className="mt-6 text-center text-[13px] text-[#9ba3b0]">
          New here?
          <Link to="/signup" className="text-[#7b8cd9] no-underline font-medium ml-1 hover:text-[#6a7bc5]">Create an account</Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
