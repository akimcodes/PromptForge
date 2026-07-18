"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

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
      initial={{ y: -80 }}
      animate={{
        y: 0,
        backdropFilter: scrolled ? "blur(18px)" : "blur(0px)",
      }}
      transition={{
        duration: 0.5,
      }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-black/40 shadow-lg shadow-black/20 backdrop-blur-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8">

        {/* Logo */}
        <div className="flex items-center gap-3">
  <Image
    src="/logo.png"
    alt="PromptForge"
    width={42}
    height={42}
  />

  <h1 className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-3xl font-black text-transparent">
    PromptForge
  </h1>
</div>

        {/* Desktop Navigation */}

        {/* Right Side */}
        <div className="flex items-center gap-4">

          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="rounded-xl border border-cyan-400/40 bg-white/5 px-5 py-2 font-medium text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-cyan-400 hover:bg-cyan-500/20 active:scale-95">
                Sign In
              </button>
            </SignInButton>
          </Show>

          <Show when= "signed-in">
            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    "h-10 w-10 ring-2 ring-cyan-400/30",
                },
              }}
            />
          </Show>

        </div>

      </div>
    </motion.nav>
  );
}