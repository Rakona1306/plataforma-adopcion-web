"use client";

import { motion } from "motion/react";
import { FaFacebookF } from "react-icons/fa";

const FACEBOOK_URL = "https://www.facebook.com/pawsadopt";

export default function SocialLinks() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex justify-center"
    >
      <motion.a
        href={FACEBOOK_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Síguenos en Facebook"
        whileHover={{
          scale: 1.05,
          y: -2,
        }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center w-full py-3 px-2 rounded-xl border border-slate-200 bg-white text-blue-600 transition-colors duration-200 hover:border-blue-600 hover:bg-slate-50"
      >
        <FaFacebookF className="text-2xl" />
      </motion.a>
    </motion.div>
  );
}
