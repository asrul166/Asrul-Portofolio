import React from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import usePointerFine from "../hooks/usePointerFine";

const spring = { stiffness: 250, damping: 15, mass: 0.4 };

// Bungkus tombol supaya "tertarik" ke arah kursor (hanya untuk mouse).
export default function Magnetic({ children, strength = 0.3, className = "" }) {
  const fine = usePointerFine();
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  const move = (e) => {
    if (!fine || reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const leave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      style={{ x: sx, y: sy }}
      onPointerMove={move}
      onPointerLeave={leave}
    >
      {children}
    </motion.span>
  );
}
