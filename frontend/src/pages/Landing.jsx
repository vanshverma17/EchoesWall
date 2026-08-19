import React from "react";
import { Link } from "react-router-dom";
import { pingAuth, getStoredUser } from "../services/authApi";

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

  const [status, setStatus] = React.useState("Checking backend...");
  const [userName, setUserName] = React.useState("");

  React.useEffect(() => {
    const user = getStoredUser();
    if (user?.name || user?.email) {
      setUserName(user.name || user.email);
    }

    pingAuth()
      .then(() => setStatus("Backend connected"))
      .catch(() => setStatus("Backend unavailable"));
  }, []);

  return (
    <div className="min-h-screen max-h-screen w-screen max-w-[100vw] flex items-center justify-center bg-[linear-gradient(135deg,#e8eef7_0%,#dfe7f2_50%,#f0f4f9_100%)] p-5 md:p-10 relative overflow-hidden box-border">
      {polaroidPhotos.map((photo, index) => (
        <div 
          key={index} 
          className="absolute w-[150px] md:w-[220px] bg-white p-2 pb-8 md:p-3 md:pb-12 rounded shadow-[0_4px_12px_rgba(0,0,0,0.15),0_8px_24px_rgba(0,0,0,0.1)] z-10 transition-all duration-300 ease-out cursor-pointer hover:z-50 hover:!rotate-0 hover:scale-105 hover:shadow-[0_8px_24px_rgba(0,0,0,0.25),0_12px_36px_rgba(0,0,0,0.15)]"
          style={{ 
            top: photo.top, left: photo.left, right: photo.right, bottom: photo.bottom,
            transform: `rotate(${photo.rotate}deg)`,
            animation: `floatIn 1s ease-out ${photo.delay}s both, float 6s ease-in-out infinite ${photo.delay}s`,
            '--rotation': `${photo.rotate}deg`
          }}
        >
          <div 
            className="absolute -top-2 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_-2px_-2px_4px_rgba(0,0,0,0.1),inset_2px_2px_4px_rgba(255,255,255,0.4)] z-20"
            style={{ background: photo.pinColor }}
          >
            <div className="absolute w-[2px] h-2 bg-[linear-gradient(to_bottom,#999,#666)] left-1/2 top-4 -translate-x-1/2 shadow-[1px_1px_2px_rgba(0,0,0,0.3)]"></div>
          </div>
          <img src={photo.img} alt="" className="w-full h-[130px] md:h-[200px] object-cover block bg-[#f0f0f0]" />
        </div>
      ))}

      <div className="relative w-[420px] max-w-[95vw] md:max-w-[90vw] bg-white pt-10 px-[30px] pb-10 md:pt-[60px] md:px-[50px] md:pb-[50px] shadow-[0_8px_30px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.08)] rounded-[20px] text-center z-40 animate-[scaleIn_0.8s_cubic-bezier(0.34,1.56,0.64,1)_0.5s_both]">
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-[22px] h-[22px] bg-[#7bc9a3] rounded-full shadow-[0_2px_5px_rgba(0,0,0,0.2),inset_-2px_-2px_4px_rgba(0,0,0,0.1),inset_2px_2px_4px_rgba(255,255,255,0.4)] z-50">
          <div className="absolute w-[2px] h-2 bg-[linear-gradient(to_bottom,#999,#666)] left-1/2 top-[18px] -translate-x-1/2 shadow-[1px_1px_2px_rgba(0,0,0,0.3)]"></div>
        </div>
        <h1 className="font-dancing text-[48px] md:text-[72px] text-[#7b8cd9] mb-4 font-bold">Echoes</h1>
        <p className="text-[16px] md:text-[18px] text-[#8b94a8] mb-4 leading-relaxed">
          A quiet place to<br />pin moments that matter.
        </p>
        <div className="text-[13px] text-[#4a5568] mb-5 font-semibold">
          {status}
          {userName ? ` • Hello, ${userName.split(" ")[0]}` : ""}
        </div>
        <Link 
          to="/signin" 
          className="inline-block py-[14px] px-10 md:py-4 md:px-[60px] text-[15px] md:text-[16px] font-semibold rounded-full no-underline bg-[#7b8cd9] text-white shadow-[0_4px_12px_rgba(123,140,217,0.3)] transition-all duration-300 ease-in-out border-none cursor-pointer hover:bg-[#6a7bc5] hover:-translate-y-0.5 hover:scale-105 hover:shadow-[0_6px_20px_rgba(123,140,217,0.4)]"
        >
          Get Started
        </Link>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 text-center z-40 animate-[fadeIn_1s_ease-out_1.5s_both]">
        <div className="flex justify-center gap-4 md:gap-5 mb-3">
          {[
            { href: "https://github.com", d: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" },
            { href: "https://twitter.com", d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
            { href: "https://instagram.com", d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
            { href: "https://linkedin.com", d: "M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" }
          ].map((social, i) => (
            <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="w-[36px] h-[36px] md:w-[40px] md:h-[40px] rounded-full bg-white/90 flex items-center justify-center no-underline text-[#7b8cd9] text-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out hover:-translate-y-[3px] hover:scale-110 hover:!bg-[#7b8cd9] hover:!text-white hover:shadow-[0_4px_12px_rgba(123,140,217,0.3)]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d={social.d} />
              </svg>
            </a>
          ))}
        </div>
        <p className="text-[13px] text-[#8b94a8] font-medium">
          © 2026 Echoes. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Landing;