"use client";

import { useRef, useState } from "react";
import {
  UploadCloud,
  ImageIcon,
  Sparkles,
} from "lucide-react";

type UploadBoxProps = {
  setGeneratedPrompt: React.Dispatch<
    React.SetStateAction<string>
  >;
};

export default function UploadBox({
  setGeneratedPrompt,
}: UploadBoxProps) {

  const [image, setImage] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const [loading, setLoading] = useState(false);

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
    "🧠 Understanding your image...",
    "🎨 Detecting art style...",
    "📷 Finding camera settings...",
    "✨ Crafting professional prompt...",
  ];

  const [loadingText, setLoadingText] =
    useState("");

  function getPromptTemplate(mode: string) {

    switch (mode) {

      case "ChatGPT":
        return `
Generate a ChatGPT Images optimized prompt.

Describe every visual detail naturally.

Return only the prompt.
`;

      case "Midjourney":
        return `
Generate a Midjourney V7 prompt.

Include cinematic lighting,
masterpiece,
ultra detailed,
photorealistic.

End with:

--ar 3:2
--stylize 300
--v 7

Return only the prompt.
`;

      case "Flux":
        return `
Generate a Flux optimized prompt.

Focus on realism,
lighting,
camera,
materials,
textures.

Return only the prompt.
`;

      case "SDXL":
        return `
Generate a Stable Diffusion XL prompt.

Include quality tags.

Return only the prompt.
`;

      case "Imagen":
        return `
Generate a Google Imagen optimized prompt.

Return only the prompt.
`;

      default:
        return `
Analyze this image carefully.

Generate a universal AI image prompt.

Include:

Subject

Composition

Lighting

Camera Angle

Lens

Colors

Background

Mood

Style

Return only the prompt.
`;
    }
  }

  async function generatePrompt() {

    if (!imageBase64) {

      alert("Please upload an image first!");

      return;

    }

    let step = 0;

    setLoading(true);

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

      setGeneratedPrompt(data.text);

      clearInterval(interval);

    } catch (err) {

      clearInterval(interval);

      console.error(err);

      alert(
        "Failed to generate prompt"
      );

    } finally {

      setLoading(false);

      setLoadingText("");

    }
  }
  function handleFile(file:File) {
    setImage(URL.createObjectURL(file));

    const reader =  new FileReader();

    reader.onloadend = ()=>{
      setImageBase64(reader.result as string)
    };

    reader.readAsDataURL(file);
  }
    return (
    <section className="mt-20 flex justify-center px-6">
      <div className="w-full max-w-3xl rounded-3xl border border-purple-500/30 bg-white/5 p-10 shadow-2xl shadow-purple-900/20 backdrop-blur-xl">

        <div className="flex flex-col items-center">

          {/* Title */}
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-purple-500 bg-purple-500/10">
            <UploadCloud
              size={38}
              className="text-purple-400"
            />
          </div>

          <h2 className="mt-6 text-4xl font-bold text-white">
            Upload Your Image
          </h2>

          <p className="mt-3 max-w-xl text-center text-gray-400">
            Upload any image and let PromptForge recreate it into a
            professional AI prompt.
          </p>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
           onChange={(e)=>{
            const file=e.target.files?.[0];

            if(!file) return;

            handleFile(file);
           }

           }
          />

          {/* Upload Area */}
          <div
            onClick={() =>
              fileInputRef.current?.click()
            }
            className={`mt-8 flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 transition-all duration-300 ${
  dragActive
    ? "border-cyan-400 bg-cyan-500/10 scale-[1.02]"
    : "border-purple-500/40 bg-white/5 hover:bg-white/10"
}`}
            onDragOver={(e) => {
  e.preventDefault();
  setDragActive(true);
}}

onDragLeave={(e) => {
  e.preventDefault();
  setDragActive(false);
}}

onDrop={(e) => {
  e.preventDefault();

  setDragActive(false);

  const file = e.dataTransfer.files?.[0];

  if (!file) return;

  handleFile(file);
}}
          >

            {!image ? (
              <>

                <UploadCloud
                  size={60}
                  className="mb-5 text-purple-400"
                />

                <h3 className="text-2xl font-semibold text-white">
                  Drag & Drop Image
                </h3>

                <p className="mt-2 text-gray-400">
                  or Click to Upload
                </p>

                <p className="mt-5 text-sm text-gray-500">
                  PNG • JPG • JPEG • WEBP
                </p>

              </>
            ) : (
              <>

                <img
                  src={image}
                  alt="Preview"
                  className="w-80 rounded-2xl border border-purple-500 shadow-xl"
                />

                <div className="mt-5 flex items-center gap-2 text-green-400">

                  <ImageIcon size={18} />

                  Image Ready

                </div>

              </>
            )}

          </div>

          {/* Prompt Modes */}
          <div className="mt-10 w-full">

            <h3 className="mb-4 text-left text-lg font-semibold text-white">
              ✨ Optimize For
            </h3>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">

              {promptModes.map((mode) => (

                <button
                  key={mode}
                  type="button"
                  onClick={() =>
                    setSelectedMode(mode)
                  }
                  className={`rounded-xl border px-4 py-3 font-medium transition-all duration-300 ${
                    selectedMode === mode
                      ? "border-purple-500 bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-600/30"
                      : "border-gray-700 bg-white/5 text-gray-300 hover:border-purple-500 hover:bg-white/10"
                  }`}
                >
                  {mode}
                </button>

              ))}

            </div>

          </div>

          {/* Generate Button */}
          <button
            onClick={generatePrompt}
            disabled={loading}
            className="mt-10 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 py-4 text-lg font-bold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
          >

            {loading ? (
              <>
                <Sparkles
                  className="animate-spin"
                  size={22}
                />

                {loadingText}
              </>
            ) : (
              <>
                🚀 Generate Prompt
              </>
            )}

          </button>

        </div>

      </div>
    </section>
  );
}