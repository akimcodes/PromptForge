"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import {
  Show,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

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
    backdropFilter: scrolled ? "blur(18px)" : "blur(0px)",
  }}
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    scrolled
      ? "bg-black/40 backdrop-blur-2xl border-b border-white/10 shadow-lg"
      : "bg-transparent"
  }`}
>
  <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

    <h1 className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-3xl font-black text-transparent">
      PromptForge
    </h1>

    <div className="hidden gap-8 text-gray-300 md:flex">
      <a href="#">Features</a>
      <a href="#">Pricing</a>
      <a href="#">About</a>
    </div>

    <div className="flex items-center gap-4">

      <Show when="signed-out">
  <SignInButton mode="modal">
    <button className="rounded-xl border border-cyan-400/40 px-5 py-2 text-white transition hover:bg-cyan-500/20">
      Sign In
    </button>
  </SignInButton>
</Show>

<Show when="signed-in">
  <UserButton />
</Show>

    </div>

  </div>
</motion.nav>
  );
}