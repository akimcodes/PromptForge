export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 py-28 text-center">

      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-purple-600/20 blur-[180px]" />
      <div className="absolute right-10 top-20 h-72 w-72 rounded-full bg-blue-600/10 blur-[150px]" />
      <div className="absolute left-10 bottom-10 h-72 w-72 rounded-full bg-pink-500/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/40 bg-purple-500/10 px-5 py-2 text-sm text-purple-300 backdrop-blur-md">
          🚀 AI Powered Prompt Generator
        </div>

        {/* Heading */}
        <h1 className="mt-8 text-5xl font-black leading-tight text-white md:text-7xl">
          Turn Any Image Into
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            Professional AI Prompts
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-400 md:text-xl">
          Upload any image and instantly generate production-ready prompts
          for Midjourney, Flux, Stable Diffusion, Imagen and other AI models.
        </p>

        {/* Buttons */}
        <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">

          <button className="rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-purple-600/30 transition duration-300 hover:scale-105">
            🚀 Generate Prompt
          </button>

          <button className="rounded-xl border border-gray-700 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-md transition duration-300 hover:border-purple-500 hover:bg-white/10">
            📖 Learn More
          </button>

        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <h3 className="text-4xl font-bold text-purple-400">10K+</h3>
            <p className="mt-2 text-gray-400">Images Processed</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <h3 className="text-4xl font-bold text-blue-400">5+</h3>
            <p className="mt-2 text-gray-400">AI Models Supported</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <h3 className="text-4xl font-bold text-pink-400">&lt;5s</h3>
            <p className="mt-2 text-gray-400">Average Generation Time</p>
          </div>

        </div>

      </div>
    </section>
  );
}