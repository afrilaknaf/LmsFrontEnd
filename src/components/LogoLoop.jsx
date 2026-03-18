import React, { useRef, useState, useEffect } from "react";

export default function LogoLoop({
  logos = [],          // safe fallback to prevent undefined.map error
  speed = 120,
  gap = 40,
  logoHeight = 50,
  pauseOnHover = true,
  scaleOnHover = true,
  fadeOut = true,
  className = "",
}) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [animationDuration, setAnimationDuration] = useState(0);

  // Calculate duration based on width + speed
  useEffect(() => {
    if (containerRef.current && contentRef.current) {
      const containerWidth = containerRef.current.scrollWidth;
      setAnimationDuration(containerWidth / speed);
    }
  }, [logos, speed, gap]);

  if (!logos || logos.length === 0) {
    return (
      <div className="text-center text-gray-400">
        No logos provided.
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden whitespace-nowrap relative ${className}`}
      style={{
        maskImage: fadeOut
          ? "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)"
          : "none",
      }}
    >
      <div
        ref={contentRef}
        className="flex"
        style={{
          animation: `scrollLoop ${animationDuration}s linear infinite`,
        }}
      >
        {[...logos, ...logos].map((logo, index) => (
          <img
            key={index}
            src={logo.src}
            alt={logo.alt || "Logo"}
            loading="lazy"
            style={{ height: logoHeight, marginRight: gap }}
            className={`transition-all
              ${scaleOnHover ? "hover:scale-110" : ""}
            `}
          />
        ))}
      </div>

      {/* Hover pause effect */}
      {pauseOnHover && (
        <style>{`
          div:hover > div {
            animation-play-state: paused !important;
          }
        `}</style>
      )}

      {/* infinite loop keyframes */}
      <style>{`
        @keyframes scrollLoop {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
