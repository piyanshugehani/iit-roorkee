import React from "react";
import { ArrowRight, Sparkles, Film } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function HeroContent() {
  return (
    <motion.div
      className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <div className="flex">
        <div className="relative flex items-center gap-x-4 rounded-full px-4 py-1 text-sm leading-6 text-gray-300 ring-1 ring-gray-800/50 hover:ring-gray-700">
          <span className="font-semibold text-indigo-400">New</span>
          <span className="h-4 w-px bg-gray-700" aria-hidden="true" />
          <a href="#features" className="flex items-center gap-x-1">
            Smart sync technology
            <Sparkles className="h-4 w-4 text-indigo-400 animate-pulse" />
          </a>
        </div>
      </div>
      
      <h1 className="mt-10 max-w-lg text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 sm:text-6xl">
        Perfect subtitle sync, every time
      </h1>
      
      <p className="mt-6 text-lg leading-8 text-gray-300">
        Say goodbye to out-of-sync subtitles. Our intelligent tool helps you synchronize subtitles with your videos in seconds, not hours.
      </p>
      
      <div className="mt-10 flex items-center gap-x-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/app"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-8 py-3 text-white shadow-lg transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <Film className="h-5 w-5" />
            Get started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
        
        <motion.a
          href="#features"
          className="group text-sm font-semibold leading-6 text-white"
          whileHover={{ x: 5 }}
        >
          Learn more{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1">
            →
          </span>
        </motion.a>
      </div>
    </motion.div>
  );
}