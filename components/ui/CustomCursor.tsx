"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // 모든 요소의 기본 커서 숨김
    const style = document.createElement("style");
    style.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(style);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // 클릭 가능한 요소 위에 있는지 확인
      const target = e.target as HTMLElement;
      const clickable =
        target.closest("a") ||
        target.closest("button") ||
        target.tagName.toLowerCase() === "input" ||
        target.tagName.toLowerCase() === "textarea" ||
        target.getAttribute("role") === "button" ||
        target.getAttribute("role") === "link";
      
      setIsHovering(!!clickable);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[99999] hidden lg:block"
      style={{
        originX: 0,
        originY: 0,
      }}
      animate={{
        x: mousePos.x, // SVG 좌상단 팁을 마우스 실제 위치에 맞춤
        y: mousePos.y,
        scale: isHovering ? 1.15 : 1.0,
      }}
      transition={{
        type: "spring",
        stiffness: 2000,
        damping: 40,
        mass: 0.1,
      }}
    >
      <svg
        width="22"
        height="28"
        viewBox="0 0 16 24"
        fill="var(--accent)"
        stroke="white"
        strokeWidth="1.2"
        style={{
          opacity: isHovering ? 0.9 : 1,
          filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.3))" // 가독성을 위한 그림자
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M0 0 L0 16 L4.5 12 L9 20 L11 19 L6.5 11 L12 11 Z" 
          strokeLinejoin="round" 
        />
      </svg>
    </motion.div>
  );
}
