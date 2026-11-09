import React from "react";

export default function Footer() {
  return (
    <footer className="border-t-2 border-blk bg-blk text-cream">
      <div className="mx-auto max-w-5xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-sm text-cream/70">
        <span>© {new Date().getFullYear()} Asrul</span>
        <span>built with React + Tailwind</span>
      </div>
    </footer>
  );
}