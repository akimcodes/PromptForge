import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
  function handleScroll() {
    setScrolled(window.scrollY > 40);
  }

  window.addEventListener("scroll", handleScroll);

  return () =>
    window.removeEventListener("scroll", handleScroll);
}, []);
  return (
    <motion.nav
  animate={{
    backdropFilter: scrolled
      ? "blur(18px)"
      : "blur(0px)",
  }}
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    scrolled
      ? "border-b border-white/10 bg-black/40 shadow-lg"
      : "bg-transparent"
  }`}
>
      <h1 className="text-2xl font-bold text-purple-500">
        PromptForge
      </h1>

      <div className="flex gap-8 text-gray-300">
        <a href="#">Features</a>
        <a href="#">Pricing</a>
        <a href="#">About</a>
      </div>
    </motion.nav>
  );
}