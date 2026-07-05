export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center mt-32">
      <h1 className="text-6xl font-bold text-purple-500">
        PromptForge
      </h1>

      <p className="mt-4 text-xl text-gray-300">
        Helping creators create better with AI.
      </p>

      <button className="mt-8 px-8 py-3 bg-purple-600 rounded-lg hover:bg-purple-700">
        Get Started
      </button>
    </section>
  );
}