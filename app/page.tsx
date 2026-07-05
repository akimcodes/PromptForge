"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import PromptGenerator from "@/components/PromptGenerator";
import UploadBox from "@/components/UploadBox";

export default function Home() {

  const [generatedPrompt, setGeneratedPrompt] = useState<string>("");

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <UploadBox setGeneratedPrompt={setGeneratedPrompt} />
      <PromptGenerator generatedPrompt={generatedPrompt} />
    </main>
  );
}