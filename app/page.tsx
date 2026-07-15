"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import PromptGenerator from "@/components/PromptGenerator";
import UploadBox from "@/components/UploadBox";
import HistoryPanel from "@/components/HistoryPanel";
import PromptComparison from "@/components/PromptComparison";
import AuroraBackground from "@/components/AuroraBackgroud";

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
    id: number;
    prompt: string;
    mode: string;
    createdAt: string;
    favorite?:boolean
  }[]
  >([]);
  const [recommendedModel, setRecommendedModel] = useState("");
  const [recommendReason, setRecommendReason] = useState("");
  const [promptScore, setPromptScore] = useState(0);
  const [rating, setRating] = useState("");
  const [strengths, setStrengths] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(()=>{
    const saved = localStorage.getItem("prompt-history");
    if(saved){
      setHistory(JSON.parse(saved));
    }
  },[]);
  useEffect(()=> {
    localStorage.setItem(
      "prompt-history",JSON.stringify(history)
    );
  },[history]);

  function deleteHistory(id: number) {
  setHistory((prev) => prev.filter((item) => item.id !== id));
  }
  const toggleFavorite = (id: number) => {
  setHistory((prev) =>
    prev.map((item) =>
      item.id === id
        ? {
            ...item,
            favorite: !item.favorite,
          }
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
    </main>
  );
}