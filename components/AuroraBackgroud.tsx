"use client";

import {motion, useMotionValue, useSpring,} from "framer-motion";

import { useEffect, useState } from "react";

export default function AuroraBackground() {
    const [mounted, setMounted] = useState(false);
    const mouseX = useMotionValue(-500);
    const mouseY = useMotionValue(-500);

const springConfig = {
  stiffness: 100,
  damping: 30,
};

const smoothX = useSpring(mouseX, springConfig);
const smoothY = useSpring(mouseY, springConfig);

        useEffect(() => {
          setMounted(true);
        }, []);
        useEffect(() => {
  function handleMouseMove(e: MouseEvent) {
    mouseX.set(e.clientX - 250);
    mouseY.set(e.clientY - 250);
  }

  window.addEventListener("mousemove", handleMouseMove);

  return () => {
    window.removeEventListener(
      "mousemove",
      handleMouseMove
    );
  };
}, [mouseX, mouseY]);
        useEffect(() => {
  function handleMouseMove(e: MouseEvent) {
    mouseX.set(e.clientX - 200);
    mouseY.set(e.clientY - 200);
  }

  window.addEventListener("mousemove", handleMouseMove);

  return () => {
    window.removeEventListener(
      "mousemove",
      handleMouseMove
    );
  };
}, [mouseX, mouseY]);
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">

      <motion.div
        animate={{
          x: [0, 250, -200, 0],
          y: [0, -150, 150, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut",
        }}
        className="absolute left-[-300px] top-[-250px] h-[900px] w-[900px] rounded-full bg-cyan-400/60 blur-[280px]"
      />

      <motion.div
        animate={{
          x: [0, -250, 200, 0],
          y: [0, 150, -150, 0],
          scale: [1.2, 1, 1.2],
        }}      
        transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut",
        }}
        className="absolute right-[-300px] bottom-[-250px] h-[900px] w-[900px] rounded-full bg-purple-500/60 blur-[280px]"
      />
      {mounted &&
        Array.from({ length: 35 }).map((_, i) => (
  <motion.div
    key={i}
    className="absolute h-1 w-1 rounded-full bg-white"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
    animate={{
      y: [0, -60, 0],
      opacity: [0.2, 1, 0.2],
      scale: [1, 1.8, 1],
    }}
    transition={{
      duration: 4 + Math.random() * 8,
      repeat: Infinity,
      delay: Math.random() * 5,
      ease: "easeInOut",
    }}
  />
))}
<motion.div
  style={{
    x: smoothX,
    y: smoothY,
  }}
  className="absolute h-[400px] w-[400px] rounded-full bg-cyan-400/10 blur-[140px]"
/>
<motion.div
  style={{
    x: smoothX,
    y: smoothY,
  }}
  className="absolute h-[500px] w-[500px] rounded-full bg-cyan-400/10 blur-[180px]"
/>

    </div>
  );
}