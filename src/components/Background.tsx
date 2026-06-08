import { motion } from "motion/react";
import { Sun, Star, Cloud } from "lucide-react";

export const Background = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10 bg-[#A3E4FF]">
      {/* Sun - themed as emoji style in top right */}
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-8 right-8 w-20 h-20 bg-[#FFD93D] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,217,61,0.5)] text-4xl z-0"
      >
        ☀️
      </motion.div>

      {/* Floating Clouds - simple and white like the design */}
      <motion.div
        animate={{ x: [-20, 20, -20] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-24 h-12 bg-white opacity-80 rounded-full shadow-sm"
      />
      
      <motion.div
        animate={{ x: [20, -20, 20] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-24 right-20 w-20 h-10 bg-white opacity-60 rounded-full shadow-sm"
      />

      <motion.div
        animate={{ x: [-10, 10, -10] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-64 left-4 w-16 h-8 bg-white opacity-40 rounded-full shadow-sm"
      />

      {/* Background Decor - soft white blobs for depth */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};
