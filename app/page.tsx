"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import PromptGenerator from "@/components/PromptGenerator";
import UploadBox from "@/components/UploadBox";
import HistoryPanel from "@/components/HistoryPanel";
import PromptComparison from "@/components/PromptComparison";
import AuroraBackground from "@/components/AuroraBackgroud";
import { supabase } from "@/lib/supabase";
import FeedbackButton from "@/components/FeedbackButton";
import {Mail,House,Shield,Heart,} from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function Home() {

  const [generatedPrompt, setGeneratedPrompt] = useState<string>("");
  const [generatedPrompts, setGeneratedPrompts] = useState({
  Universal: "",
  ChatGPT: "",
  Midjourney: "",
  Flux: "",
  SDXL: "",
  Imagen: "",
});
const [history, setHistory] = useState<
{
  id: string;
  prompt: string;
  mode: string;
  createdAt: string;
  imageUrl: string;
  favorite?: boolean;
}[]
>([]);
  const [recommendedModel, setRecommendedModel] = useState("");
  const [recommendReason, setRecommendReason] = useState("");
  const [promptScore, setPromptScore] = useState(0);
  const [rating, setRating] = useState("");
  const [strengths, setStrengths] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

const deleteHistory = async (id: string) => {
  const { error } = await supabase
    .from("prompt_history")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    return;
  }

  setHistory((prev) => prev.filter((item) => item.id !== id));
};
const toggleFavorite = async (id: string) => {
  const current = history.find((item) => item.id === id);

  if (!current) return;

  const newValue = !current.favorite;

  const { error } = await supabase
    .from("prompt_history")
    .update({ favorite: newValue })
    .eq("id", id);

  if (error) {
    console.error(error);
    return;
  }

  setHistory((prev) =>
    prev.map((item) =>
      item.id === id
        ? { ...item, favorite: newValue }
        : item
    )
  );
};

  return (
    <main className="relative min-h-screen bg-black text-white">
      <AuroraBackground/>
      <Navbar />
      <Hero />
      <UploadBox
  setGeneratedPrompt={setGeneratedPrompt}
  setGeneratedPrompts={setGeneratedPrompts}
  setRecommendedModel={setRecommendedModel}
  setRecommendReason={setRecommendReason}
  setPromptScore={setPromptScore}
  setRating={setRating}
  setStrengths={setStrengths}
  setSuggestions={setSuggestions}
  history={history}
  setHistory={setHistory}
/>
      <PromptGenerator
  generatedPrompt={generatedPrompt}
  generatedPrompts={generatedPrompts}
  recommendedModel={recommendedModel}
  promptScore={promptScore}
  rating={rating}
  strengths={strengths}
  suggestions={suggestions}
/>
      <PromptComparison prompts={generatedPrompts}/>
      <HistoryPanel
  history={history}
  onSelect={setGeneratedPrompt}
  onDelete={deleteHistory}
  toggleFavorite={toggleFavorite}
/>
<FeedbackButton />
<footer className="relative mt-32 overflow-hidden bg-gradient-to-b from-transparent via-[#0b1220]/70 to-[#070b14]">



  {/* CTA Section */}
  <div className="mx-auto max-w-5xl px-6 py-10 text-center">

    <h2 className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-4xl font-extrabold text-transparent">
      Ready to create your next masterpiece?
    </h2>

    <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
      Turn any image into production-ready AI prompts for ChatGPT,
      Midjourney, Flux, SDXL and more.
    </p>

    <a
      href="#upload"
      className="mt-12 inline-flex items-center rounded-2xl
      bg-gradient-to-r from-cyan-500 to-purple-600
      px-8 py-4 font-semibold text-white
      shadow-lg shadow-cyan-500/20
      transition duration-300 hover:scale-105 hover:shadow-cyan-400/40"
    >
      🚀 Generate Prompt
    </a>

  </div>

  {/* Divider */}
  <div className="mx-auto my-8 h-px w-40 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />

  {/* Footer */}
  <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-10">

  <h2 className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-3xl font-black text-transparent">
    PromptForge
  </h2>

  <p className="text-gray-400">
    Craft Better Prompts.
  </p>

  {/* Contact */}
  <div className="flex flex-col items-center gap-3 text-sm text-gray-300">
    <a
  href="https://github.com/akimcodes/PromptForge"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2 text-gray-400 transition hover:text-cyan-400"
>
  <FaGithub size={16} />
  GitHub
</a>

    <a
      href="mailto:thepromptforge.ai@gmail.com"
      className="flex items-center gap-2 transition hover:text-cyan-400"
    >
      <Mail size={16} />
     thepromptforge.ai@gmail.com
    </a>

  </div>

  {/* Navigation */}
  <div className="flex flex-wrap items-center justify-center gap-8 text-sm">

    <a
      href="#"
      className="flex items-center gap-2 text-gray-400 transition hover:text-cyan-400"
    >
      <House size={16} />
      Home
    </a>

    <a
      href="#"
      className="flex items-center gap-2 text-gray-400 transition hover:text-cyan-400"
    >
      <Shield size={16} />
      Privacy
    </a>

  </div>

  {/* Developer */}
  <p className="flex items-center gap-2 text-sm text-gray-400">
    Built with
    <Heart
      size={16}
      className="fill-red-500 text-red-500"
    />
    by
    <span className="font-semibold text-cyan-400">
      PromptForge
    </span>
  </p>

  {/* Copyright */}
  <p className="border-t border-white/10 pt-5 text-xs text-gray-500">
    © 2026 PromptForge. All rights reserved.
  </p>

</div>
</footer>
    </main>
  );
}