import React from "react";
import { Subtitles } from "lucide-react";
import { motion } from "framer-motion";

export function HeroIcon() {
  return (
    <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
      <motion.div
        className="relative mx-auto w-[24rem] max-w-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <motion.div
          className="absolute -top-4 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30"
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 40, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-8 -right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30"
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 20, -40, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
            delay: 1
          }}
        />
        <motion.div
          className="absolute top-20 right-10 w-56 h-56 bg-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30"
          animate={{
            x: [0, 20, -30, 0],
            y: [0, -40, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
            delay: 2
          }}
        />
        
        <div className="relative">
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Subtitles className="mx-auto h-64 w-64 text-indigo-400 opacity-80 drop-shadow-xl" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}