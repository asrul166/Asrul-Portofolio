import React from "react";
import { motion } from "framer-motion";

// gaya masuk yang bisa dipilih per section
const from = {
  up: { opacity: 0, y: 32 },
  left: { opacity: 0, x: -48 },
  right: { opacity: 0, x: 48 },
  pop: { opacity: 0, scale: 0.92 },
  tilt: { opacity: 0, y: 32, rotate: -2 },
};

const shown = { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 };

export default function Reveal({ children, delay = 0, variant = "up", className = "" }) {
  return (
    <motion.div
      className={className}
      initial={from[variant] || from.up}
      whileInView={shown}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

// untuk kartu satu per satu: jeda mengikuti kolomnya (0, 0.1, 0.2 detik)
export function RevealItem({ children, index = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: (index % 3) * 0.1 }}
    >
      {children}
    </motion.div>
  );
}
