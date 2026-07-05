"use client";
type PromptGeneratorProps = {generatedPrompt: string;};

export default function PromptGenerator({generatedPrompt,}: PromptGeneratorProps) {
  return (
    <section className="flex justify-center mt-10">
      <div className="w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center">
          AI Generated Prompt
        </h2>

        <div className="border-2 border-purple-500 rounded-xl p-6 min-h-[250px] bg-black text-gray-300">
          {generatedPrompt || "Your AI generated prompt will appear here..."}
        </div>
      </div>
    </section>
  );
}