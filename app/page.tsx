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
<footer className="mt-24 border-t border-white/10 py-10 text-center">
  <h2 className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-2xl font-bold text-transparent">
    PromptForge
  </h2>

  <p className="mt-3 text-gray-400">
    Craft Better Prompts.
  </p>

  <p className="mt-6 text-sm text-gray-500">
    © 2026 PromptForge. All rights reserved.
  </p>
</footer>
    </main>
  );
}