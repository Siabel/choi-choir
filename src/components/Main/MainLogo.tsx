"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const letters = ["C", "H", "O", "I", "R"];
const scales = [0.8, 0.9, 1, 1.1, 1.2];


export default function MainLogo() {
  const [cycleKey, setCycleKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCycleKey((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      key={cycleKey}
      className="flex space-x-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{
        duration: 5,
        times: [0, 0.2, 0.8, 1],
      }}
    >
      {letters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: scales[i] }}
          transition={{
            delay: i * 0.25,
            type: "spring",
            stiffness: 200,
            damping: 18,
            duration: 0.6,
          }}
          className="text-7xl font-extrabold text-primary"
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}