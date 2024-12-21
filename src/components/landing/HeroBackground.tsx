import React from "react";
import { motion } from "framer-motion";

export function HeroBackground() {
  return (
    <motion.div
      className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-indigo-700 via-purple-800 to-gray-900 opacity-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    />
  );
}