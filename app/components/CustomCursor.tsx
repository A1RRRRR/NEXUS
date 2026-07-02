"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animId = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top  = `${e.clientY}px`;
      }

      // Check if hovering interactive element
      const target = e.target as Element;
      const isInteractive = target.closest('a, button, [role="button"], input, select, textarea, [data-cursor="pointer"]');
      setHovering(!!isInteractive);
    };

    const onDown = () => setClicking(true);
    const onUp   = () => setClicking(false);

    // Animate ring with lag
    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top  = `${ringPos.current.y}px`;
      }
      animId.current = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener("mousemove",  onMove);
    window.addEventListener("mousedown",  onDown);
    window.addEventListener("mouseup",    onUp);

    return () => {
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mousedown",  onDown);
      window.removeEventListener("mouseup",    onUp);
      if (animId.current) cancelAnimationFrame(animId.current);
    };
  }, []);

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          width:  clicking ? "6px"  : "8px",
          height: clicking ? "6px"  : "8px",
          background: hovering ? "#8b5cf6" : "#00d4ff",
          boxShadow: hovering
            ? "0 0 12px #8b5cf6, 0 0 24px rgba(139,92,246,0.5)"
            : "0 0 12px #00d4ff, 0 0 24px rgba(0,212,255,0.5)",
          transition: "width 0.15s, height 0.15s, background 0.2s, box-shadow 0.2s",
        }}
      />
      {/* Trailing ring */}
      <div
        ref={ringRef}
        className="cursor-dot"
        style={{
          width:  hovering ? "44px" : "32px",
          height: hovering ? "44px" : "32px",
          background: "transparent",
          border: `1.5px solid ${hovering ? "rgba(139,92,246,0.5)" : "rgba(0,212,255,0.35)"}`,
          transition: "width 0.2s, height 0.2s, border-color 0.2s",
        }}
      />
    </>
  );
}
