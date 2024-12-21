import React from "react";
import { ArrowRight, Sparkles, Film, Subtitles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HeroBackground } from "./HeroBackground";
import { HeroContent } from "./HeroContent";
import { HeroIcon } from "./HeroIcon";

export function Hero() {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-black">
      <HeroBackground />
      
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
        <HeroContent />
        <HeroIcon />
      </div>
    </div>
  );
}