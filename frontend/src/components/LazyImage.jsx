import React, { useState } from "react";

const LazyImage = ({
  src,
  alt = "",
  className = "",
  imgClassName = "",
  style = {},
  placeholderClassName = "",
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      {!isLoaded && !hasError && (
        <div
          className={`absolute inset-0 bg-[linear-gradient(110deg,#f0f4f9_8%,#e2e8f0_18%,#f0f4f9_33%)] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite_linear] ${placeholderClassName}`}
        />
      )}
      {hasError ? (
        <div className="w-full h-full flex items-center justify-center bg-[#edf2f7] text-[#a0aec0] text-[11px] p-2 text-center">
          Image unavailable
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover block transition-opacity duration-300 ease-out ${
            isLoaded ? "opacity-100" : "opacity-0"
          } ${imgClassName}`}
          {...props}
        />
      )}
    </div>
  );
};

export default LazyImage;
