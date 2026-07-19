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
  <div className="mx-auto max-w-5xl px-6 py-16 text-center">

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
  <div className="mx-auto my-16 h-px w-40 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />

  {/* Footer */}
  <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-12">

    <h2 className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-3xl font-black text-transparent">
      PromptForge
    </h2>

    <p className="text-gray-400">
      Craft Better Prompts.
    </p>

    <p className="text-center text-sm text-gray-500">
      {/*Powered by <span className="text-cyan-400">Google Gemini AI</span>*/}
      <br />
      Built with ❤️ by <span className="text-cyan-400">Akim</span>
    </p>

    <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400">

      <a
        href="#"
        className="transition hover:text-cyan-400"
      >
        Home
      </a>

      <a
        href="#"
        className="transition hover:text-cyan-400"
      >
        Privacy
      </a>

      <a
        href="mailto:akim.codes@email.com"
        className="transition hover:text-cyan-400"
      >
        Contact
      </a>

    </div>

    <p className="text-xs text-gray-600">
      © 2026 PromptForge. All rights reserved.
    </p>

  </div>

</footer>
    </main>
  );
}