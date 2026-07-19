"use client";

import { useRef, useState, useEffect } from "react";
import {
  UploadCloud,
  ImageIcon,
  Sparkles,
} from "lucide-react";
import {motion} from "framer-motion";
import { supabase } from "@/lib/supabase";
import{ useUser } from "@clerk/nextjs"

type HistoryItem = {
  id: string;
  prompt: string;
  mode: string;
  createdAt: string;
  imageUrl: string;
  favorite?: boolean;
};

type UploadBoxProps = {
  setGeneratedPrompt: React.Dispatch<
    React.SetStateAction<string>
  >;
  setGeneratedPrompts: React.Dispatch<
  React.SetStateAction<{
    Universal: string;
    ChatGPT: string;
    Midjourney: string;
    Flux: string;
    SDXL: string;
    Imagen: string;
  }>
>;
    setRecommendedModel: React.Dispatch<
    React.SetStateAction<string>
  >;
    setRecommendReason: React.Dispatch<
    React.SetStateAction<string>
  >;

  history: HistoryItem[];

  setHistory: React.Dispatch<
    React.SetStateAction<HistoryItem[]>
  >;
  setPromptScore: React.Dispatch<React.SetStateAction<number>>;

  setRating: React.Dispatch<React.SetStateAction<string>>;

  setStrengths: React.Dispatch<React.SetStateAction<string[]>>;

  setSuggestions: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function UploadBox({
  setGeneratedPrompt,
  setGeneratedPrompts,
  setRecommendedModel,
  setRecommendReason,
  history,
  setHistory,
  setPromptScore,
  setRating,
  setStrengths,
  setSuggestions,
}: UploadBoxProps) {
  const { user } = useUser();

  useEffect(() => {
  async function loadHistory() {
    if (!user) return;

    const { data, error } = await supabase
      .from("prompt_history")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    const historyData =
      data?.map((item, index) => ({
        id: item.id,
        prompt: item.improved_prompt,
        mode: item.model,
        createdAt: new Date(item.created_at).toLocaleString(),
        imageUrl: item.image_url,
        favorite: item.favorite,
      })) || [];

    setHistory(historyData);
  }

  loadHistory();
}, [user, setHistory]);

  const [image, setImage] =
    useState<string | null>(null);

  const [imageBase64, setImageBase64] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [loadingText, setLoadingText] =
    useState("");
  
  const [progress, setProgress] = useState(0);

  const [dragActive, setDragActive] =
    useState(false);

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const promptModes = [
    "Universal",
    "ChatGPT",
    "Midjourney",
    "Flux",
    "SDXL",
    "Imagen",
  ];

  const [selectedMode, setSelectedMode] =
    useState("Universal");

  const loadingSteps = [
    "🧠 Understanding image...",
    "🎨 Detecting style...",
    "📷 Reading composition...",
    "✨ Writing professional prompt...",
  ];

  const modelInfo = {
    Universal: {
      title: "Universal AI Prompt",
      desc: "Works with almost every AI image model including ChatGPT, Gemini, Claude, Midjourney, Flux and more.",
      color: "from-cyan-500 to-blue-600",
    },

    ChatGPT: {
      title: "ChatGPT Images",
      desc: "Optimized for ChatGPT Images with natural detailed descriptions.",
      color: "from-green-500 to-emerald-600",
    },

    Midjourney: {
      title: "Midjourney V7",
      desc: "Produces cinematic prompts with artistic lighting and stylization.",
      color: "from-fuchsia-500 to-pink-600",
    },

    Flux: {
      title: "Flux",
      desc: "Best for photorealistic outputs with realistic textures and lighting.",
      color: "from-orange-500 to-red-600",
    },

    SDXL: {
      title: "Stable Diffusion XL",
      desc: "Optimized prompt structure for SDXL image generation.",
      color: "from-violet-500 to-indigo-600",
    },

    Imagen: {
      title: "Google Imagen",
      desc: "Clean prompt structure for Google's Imagen model.",
      color: "from-yellow-500 to-orange-500",
    },
  };
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  function getPromptTemplate(mode: string) {

    switch (mode) {

      case "ChatGPT":
        return "Generate a ChatGPT Images optimized prompt. Return only the prompt.";

      case "Midjourney":
        return "Generate a Midjourney V7 prompt. Include cinematic lighting, masterpiece, ultra detailed, photorealistic. Return only the prompt.";

      case "Flux":
        return "Generate a Flux optimized prompt focused on realism, textures, lighting and camera.";

      case "SDXL":
        return "Generate a Stable Diffusion XL optimized prompt.";

      case "Imagen":
        return "Generate a Google Imagen optimized prompt.";

      default:
        return "Analyze the image carefully and generate a universal AI image prompt describing subject, composition, lighting, camera angle, colors, style and mood. Return only the prompt.";
    }
  }

  function handleFile(file: File) {
    setSelectedFile(file);

    setImage(URL.createObjectURL(file));

    const reader = new FileReader();

    reader.onloadend = () => {

      setImageBase64(
        reader.result as string
      );

    };

    reader.readAsDataURL(file);

  }
  async function generatePrompt() {

    if (!imageBase64) {

      alert("Please upload an image first!");

      return;

    }

    let step = 0;

    setLoading(true);
    setProgress(0);

    const timer = setInterval(() => {
      setProgress((prev) => {
       if (prev >= 90) return prev;
        return prev + 5;
      });
    }, 250);

    setLoadingText(loadingSteps[0]);

    const interval = setInterval(() => {

      step++;

      if (step < loadingSteps.length) {

        setLoadingText(
          loadingSteps[step]
        );

      }

    }, 1200);

    try {
      if (!selectedFile) {
  alert("Please upload an image first!");
  return;
}

const fileName = `${user?.id}/${Date.now()}-${selectedFile.name}`;

const formData = new FormData();
formData.append("file", selectedFile);

const uploadRes = await fetch("/api/upload", {
  method: "POST",
  body: formData,
});

const uploadData = await uploadRes.json();

if (!uploadRes.ok) {
  throw new Error(uploadData.error);
}

const imageUrl = uploadData.url;

console.log("Image URL:", imageUrl);

      const res = await fetch(
        "/api/generate",
        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json",

          },

          body: JSON.stringify({

            image: imageBase64,

            prompt:
              getPromptTemplate(
                selectedMode
              ),

          }),

        }
      );

      const data =
        await res.json();

      if (!res.ok) {

        throw new Error(
          data.error
        );

      }

      setGeneratedPrompts(data.prompts);
      setRecommendedModel("ChatGPT");
      setRecommendReason(data.reason);
      setPromptScore(data.analysis.score);
      setRating(data.analysis.rating);
      setStrengths(data.analysis.strengths);
      setSuggestions(data.analysis.suggestions);

// Purane PromptGenerator ke liye
setGeneratedPrompt(
  data.prompts[selectedMode]
);

if (user) {
  const { data: insertedData, error } = await supabase
    .from("prompt_history")
    .insert({    
      user_id: user.id,
      image_url: imageUrl,
    
      original_prompt: getPromptTemplate(selectedMode),
      improved_prompt: data.prompts[selectedMode],
      model: selectedMode,
    
      universal_prompt: data.prompts.Universal,
      chatgpt_prompt: data.prompts.ChatGPT,
      midjourney_prompt: data.prompts.Midjourney,
      flux_prompt: data.prompts.Flux,
      sdxl_prompt: data.prompts.SDXL,
      imagen_prompt: data.prompts.Imagen,
    
      favorite: false,
    })
    .select()
    .single();

  if (error) {
    console.error("Supabase Error:", error);
  } else if (insertedData) {
    const newHistory = {
      id: insertedData.id,
      prompt: insertedData.improved_prompt,
      mode: insertedData.model,
      createdAt: new Date(insertedData.created_at).toLocaleString(),
      imageUrl: insertedData.image_url,
      favorite: false,
    };

    setHistory((prev) => [newHistory, ...prev].slice(0, 10));
  }
}
      clearInterval(interval);

    } catch (err) {

      clearInterval(interval);

      console.error(err);

      alert("Failed to generate prompt");

    } finally {

      setProgress(100);

      clearInterval(timer);

      setLoading(false);

      setLoadingText("");

    }

  }

  return (

    <motion.section 
    id="upload"
    initial={{opacity: 0,y: 80,}}
  whileInView={{opacity: 1, y: 0,}}
  viewport={{once: true,amount: 0.2,}}
  transition={{ duration: 0.8,}}
  className="mt-20 flex justify-center px-6 scroll-smooth"
>

     <motion.div whileHover={{y: -8, scale: 1.01,}}
  transition={{ duration: 0.25,}}
  className="group relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8 lg:p-10 backdrop-blur-xl shadow-2xl shadow-black/20 transition-all duration-500 hover:-translate-y-1 hover:border-cyan-400/40"
>
  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
  <div className="absolute -left-32 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
</div>

        <div className="flex flex-col items-center">
        <div className="mt-8 w-full">

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {

                const file = e.target.files?.[0];

                if (!file) return;

                handleFile(file);

              }}
            />

            <div

              onClick={() =>
                fileInputRef.current?.click()
              }

              onDragOver={(e) => {

                e.preventDefault();

                setDragActive(true);

              }}

              onDragLeave={(e) => {

                e.preventDefault();

                const rect =
                  e.currentTarget.getBoundingClientRect();

                const x = e.clientX;

                const y = e.clientY;

                if (
                  x <= rect.left ||
                  x >= rect.right ||
                  y <= rect.top ||
                  y >= rect.bottom
                ) {

                  setDragActive(false);

                }

              }}

              onDrop={(e) => {

                e.preventDefault();

                setDragActive(false);

                const file =
                  e.dataTransfer.files?.[0];

                if (!file) return;

                handleFile(file);

              }}

              className={`relative overflow-hidden flex min-h-[280px] sm:min-h-[320px] lg:min-h-[340px] w-full cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed transition-all duration-300 ${
                dragActive
                  ? "scale-[1.02] border-cyan-400 bg-cyan-500/10"
                  : "border-purple-500/40 bg-white/5 hover:bg-white/10"
              }`}
            >

              {dragActive && (

                <div className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-md">

                  <div className="relative mb-6">

                    <div className="absolute inset-0 animate-ping rounded-full bg-cyan-400/20"></div>

                    <UploadCloud
                      size={90}
                      className="relative animate-bounce text-cyan-300 drop-shadow-[0_0_25px_rgba(34,211,238,0.9)]"
                    />

                  </div>

                  <h2 className="bg-gradient-to-r from-cyan-300 via-white to-cyan-300 bg-clip-text text-4xl font-extrabold text-transparent">
                    Drop Image Here
                  </h2>

                  <p className="mt-3 text-lg text-cyan-100">
                    Release to upload instantly 🚀
                  </p>

                </div>

              )}

              {!image ? (

                <>

                  <UploadCloud
                    size={64}
                    className="mb-6 text-purple-400 transition-transform duration-300 group-hover:scale-110"
                  />

                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    Drag & Drop Image
                  </h2>

                  <p className="mt-3 text-gray-400">
                    or Click to Browse
                  </p>

                  <p className="mt-8 text-sm text-gray-500">
                    PNG • JPG • JPEG • WEBP
                  </p>

                </>

              ) : (

                <>

                  <img
                    src={image}
                    alt="Preview"
                    className="w-full max-w-sm rounded-2xl border border-purple-500/50 shadow-2xl"
                  />

                  <div className="mt-5 flex items-center gap-2 text-green-400">

                    <ImageIcon size={18} />

                    Image Ready

                  </div>

                </>

              )}



            </div>
            <div className="mb-10 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 bg-cyan-500/5 p-6">

  <div className="flex items-center gap-3">

    <div className="text-2xl sm:text-3xl">
      🧠
    </div>

    <div>

      <h3 className="text-xl font-bold text-white">
        AI Output
      </h3>

      <p className="mt-1 text-gray-400">
        PromptForge automatically generates optimized prompts
        for every supported AI model. No manual selection required.
      </p>

    </div>

  </div>

  <div className="mt-6 flex flex-wrap gap-3">

    {[
      "Universal",
      "ChatGPT",
      "Midjourney",
      "Flux",
      "SDXL",
      "Imagen",
    ].map((model) => (

      <div
        key={model}
        className="rounded-full border border-cyan-500/20 bg-black/30 px-4 py-2 text-sm text-cyan-300"
      >
        ✅ {model}
      </div>

    ))}

  </div>

</div>

            {/* Generate Button */}

            <button
              onClick={generatePrompt}
              disabled={loading}
              className="mt-10 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 py-4 text-lg font-bold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 hover:shadow-[0_0_40px_rgba(34,211,238,0.35)] active:scale-95 transition-all duration-300 shadow-xl shadow-cyan-500/20 hover:shadow-cyan-400/40"
            >

              {loading ? (
                <>
                  <Sparkles
                    className="animate-spin"
                    size={22}
                  />

                  {loadingText}
                  <div className="mt-3 w-64">
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 transition-all duration-300"
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                 </div>

                 <p className="mt-2 text-center text-xs text-gray-400">
                   {progress}%
                 </p>
                </div>                
                </>
              ) : (
                <>
                  🚀 Generate Prompt
                </>
              )}

            </button>

          </div>

        </div>

      </motion.div>

    </motion.section>

  );

}