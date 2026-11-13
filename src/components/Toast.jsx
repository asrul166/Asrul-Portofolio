import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { onToast } from "../lib/toast";

// Dipasang sekali di App; tampil setiap kali toast("...") dipanggil.
export default function Toaster() {
  const [item, setItem] = useState(null);

  useEffect(() => onToast((message) => setItem({ message, id: Date.now() })), []);

  useEffect(() => {
    if (!item) return;
    const t = setTimeout(() => setItem(null), 2200);
    return () => clearTimeout(t);
  }, [item]);

  return createPortal(
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[80] flex justify-center px-4"
    >
      <AnimatePresence>
        {item && (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 24, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: -1 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ type: "spring", stiffness: 400, damping: 24 }}
            className="inline-flex items-center gap-2 rounded-md border-2 border-fg bg-sticker-green px-4 py-2 font-mono text-xs font-bold text-fg shadow-[4px_4px_0_var(--color-fg)]"
          >
            <Check size={14} /> {item.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>,
    document.body
  );
}
