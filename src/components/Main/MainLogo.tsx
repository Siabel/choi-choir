"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function MainLogo() {
  const [showR, setShowR] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowR((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="text-5xl md:text-7xl font-bold text-primary flex justify-center gap-1">
      <span>CHOI</span>
      <AnimatePresence>
        {showR && (
          <motion.span
            key="r"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
          >
            R
          </motion.span>
        )}
      </AnimatePresence>
    </h1>
  );
}