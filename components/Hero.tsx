import { motion } from "framer-motion";

export default function Hero() {
  const container = {hidden: {},show: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const item = {hidden: {opacity: 0,y: 40,},show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};
  return (
    <section className="relative z-10 overflow-hidden px-6 py-28 text-center">

      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-purple-600/20 blur-[180px]" />
      <div className="absolute right-10 top-20 h-72 w-72 rounded-full bg-blue-600/10 blur-[150px]" />
      <div className="absolute left-10 bottom-10 h-72 w-72 rounded-full bg-pink-500/10 blur-[150px]" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black" />

      <motion.div variants={container}
          initial="hidden"
         animate="show"
         className="relative z-10 mx-auto max-w-6xl"
        >

        {/* Badge */}
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="relative z-10 mx-auto max-w-6xl"
>
          <motion.div
  variants={item}
  className="inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-5 py-2 text-sm font-medium text-purple-300 backdrop-blur-xl"
>
  ✨ Powered by Gemini AI • Supports 6 Models
</motion.div>
        </motion.div>

        {/* Heading */}
        <motion.h1 variants={item} className="mt-8 font-black leading-tight text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          Turn Any Image Into
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            Professional AI Prompts
          </span>
        </motion.h1>

        {/* Description */}
        <motion.h1 variants={item} className="mx-auto mt-8 max-w-3xl text-base sm:text-lg leading-8 text-gray-400 md:text-xl">
          Upload any image and instantly generate production-ready prompts
          for Midjourney, Flux, Stable Diffusion, Imagen and other AI models.
        </motion.h1>

        {/* Buttons */}
        <motion.h1 variants={item} className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">

          <button className="rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-purple-600/30 transition duration-300 hover:scale-105 active:scale-95">
            🚀 Generate Prompt
          </button>

        </motion.h1>

        {/* Stats */}
        <motion.h1 variants={item} className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <h3 className="text-4xl font-bold text-purple-400">6</h3>
            <p className="mt-2 text-gray-400">AI Models</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <h3 className="text-4xl font-bold text-blue-400">Cloud</h3>
            <p className="mt-2 text-gray-400">Storage</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <h3 className="text-4xl font-bold text-pink-400">100%</h3>
            <p className="mt-2 text-gray-400">Free Beta</p>
          </div>

        </motion.h1>

      </motion.div>
    </section>
  );
}