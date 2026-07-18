"use client";

import { Copy } from "lucide-react";
import { motion } from "framer-motion";

type PromptComparisonProps = {
  prompts: {
    Universal: string;
    ChatGPT: string;
    Midjourney: string;
    Flux: string;
    SDXL: string;
    Imagen: string;
  };
};

export default function PromptComparison({
  prompts,
}: PromptComparisonProps) {

  const models = Object.entries(prompts);

  async function copyPrompt(text: string) {
    if (!text) return;
    await navigator.clipboard.writeText(text);
  }

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
  className="group w-full max-w-6xl rounded-3xl border border-white/10 bg-white/[0.04] p-8 transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_60px_rgba(34,211,238,0.18)]"
>

        <h2 className="text-3xl font-bold text-white">
          🚀 Multi-Model Prompt Comparison
        </h2>

        <p className="mt-2 text-gray-400">
          Compare prompts optimized for different AI models.
        </p>

        <div className="mt-8 grid gap-6">

          {models.map(([model, prompt]) => (

            <div
              key={model}
              className="rounded-2xl border border-white/10 bg-black/30 p-6"
            >

              <div className="flex items-center justify-between">

                <h3 className="text-xl font-bold text-cyan-300">
                  {model}
                </h3>

                <button
                  onClick={() => copyPrompt(prompt)}
                  className="flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-500"
                >
                  <Copy size={16} />
                  Copy
                </button>

              </div>

              <div className="mt-5 rounded-xl bg-black/40 p-4">

                {prompt ? (

                  <pre className="whitespace-pre-wrap text-gray-300">
                    {prompt}
                  </pre>

                ) : (

                  <p className="text-gray-500">
                    Prompt not generated yet.
                  </p>

                )}

              </div>

            </div>

          ))}

        </div>

      </motion.div>

    </motion.section>
  );
}