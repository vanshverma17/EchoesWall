import React from "react";

const PageLoader = ({ message = "Loading echoes..." }) => {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-[linear-gradient(135deg,#e8eef7_0%,#dfe7f2_50%,#f0f4f9_100%)] p-6 fixed inset-0 z-[9999]">
      <div className="relative flex flex-col items-center">
        {/* Decorative Pin */}
        <div className="relative w-7 h-7 mb-4 animate-bounce">
          <div className="w-7 h-7 bg-[radial-gradient(circle_at_35%_35%,#9eadeb,#7b8cd9_50%,#5a67d8_100%)] rounded-full shadow-[0_4px_10px_rgba(123,140,217,0.4),inset_-2px_-2px_4px_rgba(0,0,0,0.15),inset_2px_2px_4px_rgba(255,255,255,0.6)]"></div>
          <div className="absolute w-[2px] h-3 bg-[linear-gradient(to_bottom,#a5b8cc_0%,#7a8fa3_100%)] left-[13px] top-6 shadow-[1px_1px_2px_rgba(0,0,0,0.3)] rounded-[0_0_1px_1px]"></div>
        </div>

        {/* Title */}
        <h1 className="font-dancing text-[42px] md:text-[50px] text-[#7b8cd9] font-bold tracking-tight mb-2 select-none">
          Echoes
        </h1>

        {/* Pulsing Text */}
        <p className="text-[14px] md:text-[15px] font-medium text-[#8b94a8] tracking-wide animate-pulse">
          {message}
        </p>

        {/* Loading Bar */}
        <div className="w-36 h-1 bg-[rgba(123,140,217,0.15)] rounded-full mt-4 overflow-hidden">
          <div className="h-full w-full bg-[linear-gradient(90deg,transparent,#7b8cd9,#9eadeb,transparent)] rounded-full animate-[shimmer_1.4s_infinite_linear]"></div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
