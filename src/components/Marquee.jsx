import React from "react";

// Ubah kata-katanya di sini
const words = ["Web Development", "Android", "ERPNext", "React", "Flutter", "Open to freelance"];
const colors = ["bg-sticker-yellow", "bg-sticker-green", "bg-sticker-pink", "bg-sticker-blue", "bg-sticker-orange"];

function Row() {
  return (
    <div className="flex shrink-0 items-center">
      {words.map((w, i) => (
        <span key={w} className="flex items-center">
          <span className="px-6 font-display text-2xl md:text-3xl font-bold uppercase tracking-wide">
            {w}
          </span>
          <span className={`h-4 w-4 rotate-45 border-2 border-cream ${colors[i % colors.length]}`} />
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div
      aria-hidden="true"
      className="marquee overflow-hidden border-y-2 border-blk bg-blk text-cream"
    >
      <div className="marquee-track py-3">
        <Row />
        <Row />
      </div>
    </div>
  );
}