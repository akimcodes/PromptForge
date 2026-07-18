"use client";
import { Copy, RotateCcw, Trash2, Star } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
async function copyPrompt(text: string) {
  await navigator.clipboard.writeText(text);
  alert("✅ Prompt copied!");
}

type HistoryItem = {
  id: string;
  prompt: string;
  mode: string;
  createdAt: string;
  imageUrl: string;
  favorite?: boolean;
};

type HistoryPanelProps = {
  history: HistoryItem[];
  onSelect: (prompt: string) => void;
  onDelete: (id: string) => void;
  toggleFavorite: (id: string)=> void;
};

export default function HistoryPanel({
  history,
  onSelect,
  onDelete,
  toggleFavorite,
}: HistoryPanelProps) {
    const totalPrompts = history.length;

    const favoriteModel =
      history.length > 0
        ? Object.entries(
            history.reduce((acc, item) => {
              acc[item.mode] = (acc[item.mode] || 0) + 1;
              return acc;
            }, {} as Record<string, number>)
          ).sort((a, b) => b[1] - a[1])[0][0]
        : "None";

    const lastGenerated =
      history.length > 0
        ? history[0].createdAt
        : "No prompts yet";
        const [search, setSearch] = useState("");

        const [filter, setFilter] = useState("All");

        const filteredHistory = history.filter((item) => {
          const matchSearch =item.prompt
              .toLowerCase()
              .includes(search.toLowerCase());

          const matchFilter =
            filter === "All" ||
            item.mode === filter;

          return matchSearch && matchFilter;
        });         
  return (
    <motion.section
  initial={{ opacity: 0, y: 80 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.8 }}
  className="mt-20 mb-20 flex justify-center px-6"
>
      <motion.div
  whileHover={{
    y: -6,
    scale: 1.01,
  }}
  transition={{
    duration: 0.25,
  }}
  className="w-full max-w-5xl rounded-3xl border  border-white/10 bg-white/[0.04] backdrop-blur-xl p-8"
>

        <h2 className="text-3xl font-bold text-white mb-6">
          📜 Prompt History
        </h2>
        <div className="mb-8 grid gap-4 md:grid-cols-3">

        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">
          <p className="text-sm text-gray-400">Total Prompts</p>
          <h3 className="mt-2 text-3xl font-bold text-cyan-300">
        {totalPrompts}
        </h3>
        </div>

        <div className="rounded-2xl border border-purple-500/20 bg-purple-500/10 p-5">
            <p className="text-sm text-gray-400">Favorite Model</p>
            <h3 className="mt-2 text-2xl font-bold text-purple-300">
            {favoriteModel}
            </h3>
        </div>

        <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5">
         <p className="text-sm text-gray-400">Last Generated</p>
            <h3 className="mt-2 text-sm font-semibold text-green-300">
            {lastGenerated}
            </h3>
        </div>

        </div>
        <div className="mb-8 flex flex-col gap-4 md:flex-row">

        <input
          type="text"
          placeholder="🔍 Search prompts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-400"
         />

         <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
         >
           <option>All</option>
           <option>Universal</option>
           <option>ChatGPT</option>
           <option>Midjourney</option>
           <option>Flux</option>
           <option>SDXL</option>
           <option>Imagen</option>
         </select>

        </div>      

        {history.length === 0 ? (

                <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/5">

                <div className="mb-4 text-6xl">
      🕘
                </div>

                <h3 className="text-2xl font-bold text-white">
                  No Prompt History
                </h3>

                <p className="mt-3 max-w-md text-center text-gray-400">
                  Generate your first AI prompt and it will automatically
                  appear here for quick reuse.
                </p>

            </div>

            ) : (
          <div className="space-y-4">
            {filteredHistory.map((item) => (
                 <div
                   key={item.id}
                   className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-400 hover:bg-white/10"
                 >
                   <div className="flex items-center justify-between">

                     <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-sm text-cyan-300">
                       {item.mode}
                     </span>

                     <span className="text-xs text-gray-500">
                       {item.createdAt}
                     </span>

                   </div>
                   {item.imageUrl && (
                    <img
                     src={item.imageUrl}
                      alt="Uploaded"
                      className="mb-4 aspect-video w-full rounded-xl object-cover"
                   />
                  )}

                   <p className="mt-4 line-clamp-4 text-gray-300">
                     {item.prompt}
                   </p>

                   <div className="mt-5 flex gap-3">

                    <button
                      onClick={() => onSelect(item.prompt)}
                       className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:scale-105 hover:bg-purple-700"
                     >
                      <RotateCcw size={16} />
                      Reuse
                    </button>

                    <button
                      onClick={(e) => {e.stopPropagation();copyPrompt(item.prompt);}}
                      className="flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-2 text-sm font-medium text-white transition hover:scale-105 hover:bg-cyan-700"
                    >
                      <Copy size={16} />
                      Copy
                    </button>
                    <button onClick={() => toggleFavorite(item.id)}
                      className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-white transition hover:scale-105 ${
                        item.favorite
                          ? "bg-yellow-500 hover:bg-yellow-600"
                          : "bg-gray-700 hover:bg-gray-600"
                      }`}
                    >
                      <Star
                        size={16}
                        fill={item.favorite ? "currentColor" : "none"}
                      />
                      {item.favorite ? "Favorited" : "Favorite"}
                    </button>

                    <button
                      onClick={(e) => {e.stopPropagation();onDelete(item.id);}}
                      className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:scale-105 hover:bg-red-700"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>

                    </div>

                </div>
                ))}
          </div>
        )}
      </motion.div>
    </motion.section>
  );
}