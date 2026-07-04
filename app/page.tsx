export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-purple-500">
        PromptForge
      </h1>

      <p className="mt-6 text-xl text-gray-300">
        Helping creators create better with AI.
      </p>

      <button className="mt-10 rounded-xl bg-purple-600 px-6 py-3 text-lg font-semibold hover:bg-purple-700 transition">
        Get Started
      </button>
    </main>
  );
}