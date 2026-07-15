"use client";

import { useState, useEffect } from "react";
import { Copy, Check, Download, Pencil, Wand2 } from "lucide-react";
import { motion } from "framer-motion";

type PromptGeneratorProps = {
  generatedPrompt: string;

  generatedPrompts: {
    Universal: string;
    ChatGPT: string;
    Midjourney: string;
    Flux: string;
    SDXL: string;
    Imagen: string;
  };

  recommendedModel: string;
  promptScore:number;
  rating: string;
  strengths:string[];
  suggestions: string[];
};

export default function PromptGenerator({
  generatedPrompt,
  generatedPrompts,
  recommendedModel,
  promptScore,
  rating,
  strengths,
  suggestions,
}: PromptGeneratorProps) {
  const [copied, setCopied] = useState(false);

  const recommendedPrompt =
    generatedPrompts?.[
      recommendedModel as keyof typeof generatedPrompts
    ] || generatedPrompts?.Universal || "";
    const styles = ["Cinematic","Photorealistic","Anime","Ghibli","Fantasy","Cyberpunk",];

    const scoreColor =
  promptScore >= 90
    ? "text-green-400"
    : promptScore >= 70
    ? "text-yellow-400"
    : "text-red-400";

  const [editing, setEditing] = useState(false);

  const [editedPrompt, setEditedPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [improving, setImproving] = useState(false)
  const [improvingText, setImprovingText]=useState("")
  const improvingSteps = [
  "🧠 Understanding your prompt...",
  "✨ Improving wording...",
  "🎨 Applying selected style...",
  "📸 Enhancing quality...",
  "🚀 Finalizing prompt...",
];

  useEffect(() => {
    setEditedPrompt(recommendedPrompt);
  }, [recommendedPrompt]);

  async function copyPrompt() {
    if (!editedPrompt) return;

    await navigator.clipboard.writeText(editedPrompt);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  function downloadPrompt() {
    if (!editedPrompt) return;

    const blob = new Blob([editedPrompt], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "promptforge-prompt.txt";

    a.click();

    URL.revokeObjectURL(url);
  }
  async function improvePrompt() {
    console.log("Prompt being sent:", editedPrompt);
    console.log("Selected Style:", selectedStyle);
  if (!editedPrompt) return;
  setImproving(true);
  
    let step = 0;

    setImproving(true);

    setImprovingText(improvingSteps[0]);

    const interval = setInterval(() => {

      step++;

      if (step < improvingSteps.length) {
        setImprovingText(improvingSteps[step]);
      }

    }, 1200);

  try {
    const res = await fetch("/api/improve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      prompt: editedPrompt,
      style: selectedStyle,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error);
    }

    setEditedPrompt(data.prompt);

  } catch (error) {
    console.error(error);
    alert("Failed to improve prompt");
  }finally {

  clearInterval(interval);

  setImproving(false);

  setImprovingText("");

}
}

  return (
    <motion.section
  initial={{ opacity: 0, y: 80 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.8 }}
  className="mt-20 mb-20 flex justify-center px-6"
>
      <div className="w-full max-w-5xl rounded-3xl border border-purple-500/30 bg-white/5 p-8 shadow-2xl shadow-purple-900/20 backdrop-blur-xl">
      <div className="mb-8">

  <h3 className="mb-4 text-lg font-semibold text-white">
    🎨 Prompt Style
  </h3>

  <div className="flex flex-wrap gap-3">

    {styles.map((style) => (

      <button
        key={style}
        onClick={() => setSelectedStyle(style)}
        className={`rounded-xl border px-4 py-2 transition ${
          selectedStyle === style
            ? "border-cyan-500 bg-cyan-500 text-white"
            : "border-white/20 bg-white/5 text-gray-300 hover:bg-white/10"
        }`}
      >
        {style}
      </button>

    ))}

  </div>

</div>

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          <div>

            <h2 className="text-3xl font-bold text-white flex items-center gap-2">
              🏆 Recommended Prompt
            </h2>

            <p className="mt-2 text-cyan-400 font-semibold">
              Best for: {recommendedModel}
            </p>

            <p className="mt-2 text-gray-400">
              PromptForge AI selected the best prompt for your workflow.
            </p>

          </div>

          <div className="flex gap-3">

            <button
              onClick={() => setEditing(!editing)}
              disabled={!recommendedPrompt}
              className="flex items-center gap-2 rounded-xl border border-yellow-500 bg-yellow-500/10 px-5 py-3 text-white hover:bg-yellow-600 disabled:opacity-40"
            >
              <Pencil size={18} />
              {editing ? "Cancel" : "Edit"}
            </button>

            <button
              onClick={copyPrompt}
              disabled={!recommendedPrompt}
              className="flex items-center gap-2 rounded-xl border border-purple-500 bg-purple-500/10 px-5 py-3 text-white hover:bg-purple-600 disabled:opacity-40"
            >
              {copied ? (
                <>
                  <Check size={18} />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={18} />
                  Copy
                </>
              )}
            </button>

            <button
              onClick={downloadPrompt}
              disabled={!recommendedPrompt}
              className="flex items-center gap-2 rounded-xl border border-blue-500 bg-blue-500/10 px-5 py-3 text-white hover:bg-blue-600 disabled:opacity-40"
            >
              <Download size={18} />
              Download
            </button>
            <button
             onClick={improvePrompt}
             disabled={!recommendedPrompt || improving}
             className="flex items-center gap-2 rounded-xl border border-pink-500 bg-pink-500/10 px-5 py-3 text-white transition hover:bg-pink-600 disabled:opacity-40"
            >
              <Wand2
                size={18}
                className={improving ? "animate-spin" : ""}
              />

             {improving ? improvingText : " Improve"}
            </button>          

          </div>

        </div>

        <div className="mt-8 min-h-[320px] max-h-[500px] overflow-y-auto rounded-2xl border border-white/10 bg-black/40 p-6">

        <div className="mb-8 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-6">

        <h3 className="text-2xl font-bold text-white">
          🏆 AI Prompt Quality
        </h3>

        <p className={`mt-3 text-5xl font-bold ${scoreColor}`}>
          {promptScore}/100
        </p>

        <p className="mt-2 text-xl text-cyan-300">
          {rating}
        </p>

        <div className="mt-6">

          <h4 className="font-semibold text-green-400">
            ✅ Strengths
          </h4>

          <ul className="mt-2 space-y-2">     
            {strengths.map((item) => (
              <li key={item}>
                ✔ {item}
              </li>
            ))}
          </ul>

        </div>

        <div className="mt-6">

          <h4 className="font-semibold text-yellow-400">
            💡 Suggestions
          </h4>

          <ul className="mt-2 space-y-2">
            {suggestions.map((item) => (
              <li key={item}>
                • {item}
              </li>
            ))}
          </ul>
          
        </div>

      </div>

          {recommendedPrompt ? (

            editing ? (

              <textarea
                value={editedPrompt}
                onChange={(e) =>{
                  console.log(editing);
                 setEditedPrompt(e.target.value)}}
                className="w-full min-h-[320px] rounded-xl border border-purple-500/30 bg-slate-900 p-4 font-mono text-[15px] leading-8 text-white outline-none resize-none"
              />

            ) : (

              <pre className="whitespace-pre-wrap font-mono text-[15px] leading-8 text-gray-300">
                {editedPrompt}
              </pre>

            )

          ) : (

            <div className="flex h-[250px] flex-col items-center justify-center text-center">

              <div className="mb-4 text-5xl">
                ✨
              </div>

              <h3 className="text-xl font-semibold text-white">
                No Prompt Generated Yet
              </h3>

              <p className="mt-3 max-w-md text-gray-500">
                Upload an image above, choose an optimization mode,
                and PromptForge will generate a professional AI prompt
                for you instantly.
              </p>

            </div>

          )}

        </div>

      </div>
    </motion.section>
  );
}