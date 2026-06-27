"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const trailRef = useRef<{ x: number; y: number }[]>([]);
  const pos      = useRef({ x: 0, y: 0 });
  const ring     = useRef({ x: 0, y: 0 });
  const raf      = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onEnter = () => {
      if (dotRef.current)  dotRef.current.style.transform  = "translate(-50%,-50%) scale(2.5)";
      if (ringRef.current) ringRef.current.style.transform = "translate(-50%,-50%) scale(1.8)";
    };
    const onLeave = () => {
      if (dotRef.current)  dotRef.current.style.transform  = "translate(-50%,-50%) scale(1)";
      if (ringRef.current) ringRef.current.style.transform = "translate(-50%,-50%) scale(1)";
    };

    document.addEventListener("mousemove", onMove);
    document.querySelectorAll("a,button,[data-hover]").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.left = pos.current.x + "px";
        dotRef.current.style.top  = pos.current.y + "px";
      }
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + "px";
        ringRef.current.style.top  = ring.current.y + "px";
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf.current);
      document.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed z-[9999] pointer-events-none hidden md:block"
        style={{
          width: 10, height: 10,
          borderRadius: "50%",
          background: "#FF6500",
          boxShadow: "0 0 10px #FF6500, 0 0 30px rgba(255,101,0,0.5)",
          transform: "translate(-50%,-50%)",
          transition: "transform 0.15s ease",
          top: 0, left: 0,
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed z-[9998] pointer-events-none hidden md:block"
        style={{
          width: 36, height: 36,
          borderRadius: "50%",
          border: "1.5px solid rgba(255,101,0,0.6)",
          transform: "translate(-50%,-50%)",
          transition: "transform 0.3s ease",
          top: 0, left: 0,
        }}
      />
    </>
  );
}
