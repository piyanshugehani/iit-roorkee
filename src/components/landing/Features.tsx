import React from "react";
import { motion } from "framer-motion";
import { Clock, Upload, Download, Wand2 } from "lucide-react";

const features = [
  {
    name: "Easy Upload",
    description: "Drag and drop your video and subtitle files, or simply click to upload.",
    icon: Upload,
  },
  {
    name: "Real-time Preview",
    description: "See your subtitle adjustments in real-time as you make them.",
    icon: Clock,
  },
  {
    name: "Smart Sync",
    description: "Intelligent algorithms help detect and suggest the perfect sync timing.",
    icon: Wand2,
  },
  {
    name: "Quick Export",
    description: "Download your perfectly synchronized subtitles with one click.",
    icon: Download,
  },
];

export function Features() {
  return (
    <div id="features" className="bg-gradient-to-br from-gray-900 via-gray-800 to-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2 className="text-base font-semibold leading-7 text-indigo-400">Sync Faster</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need to sync subtitles
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Our tool makes subtitle synchronization effortless with powerful features designed for both casual users and professionals.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          className="mx-auto mt-16 max-w-2xl grid grid-cols-1 gap-x-8 gap-y-16 sm:mt-20 lg:mt-24 lg:max-w-none lg:grid-cols-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              className="flex flex-col p-6 rounded-xl bg-gray-800/60 hover:bg-gray-800/80 shadow-lg transition duration-300"
              whileHover={{ scale: 1.05 }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
            >
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                <feature.icon className="h-6 w-6 flex-none text-indigo-400" aria-hidden="true" />
                {feature.name}
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-400">
                <p className="flex-auto">{feature.description}</p>
              </dd>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
