import React from "react";

// Ubah kata-katanya di sini
const defaultWords = ["Web Development", "Android", "ERPNext", "React", "Flutter", "Open to freelance"];
const colors = ["bg-sticker-yellow", "bg-sticker-green", "bg-sticker-pink", "bg-sticker-blue", "bg-sticker-orange"];

const tones = {
  dark: { band: "bg-blk text-cream", gem: "border-cream" },
  yellow: { band: "bg-sticker-yellow text-blk", gem: "border-blk" },
  pink: { band: "bg-sticker-pink text-blk", gem: "border-blk" },
};

function Row({ words, gem }) {
  return (
    <div className="flex shrink-0 items-center">
      {words.map((w, i) => (
        <span key={w} className="flex items-center">
          <span className="px-6 font-display text-2xl md:text-3xl font-bold uppercase tracking-wide">
            {w}
          </span>
          <span className={`h-4 w-4 rotate-45 border-2 ${gem} ${colors[(i + 1) % colors.length]}`} />
        </span>
      ))}
    </div>
  );
}

// reverse: arah berlawanan · tilt: pita miring · tone: dark | yellow | pink
export default function Marquee({ words = defaultWords, reverse = false, tilt = false, tone = "dark" }) {
  const t = tones[tone] || tones.dark;

  return (
    <div aria-hidden="true" className={tilt ? "py-4" : ""}>
      <div
        className={`marquee overflow-hidden border-y-2 border-fg ${t.band} ${
          tilt ? "-ml-[2%] w-[104%] -rotate-1" : ""
        }`}
      >
        <div className={`marquee-track py-3 ${reverse ? "reverse" : ""}`}>
          <Row words={words} gem={t.gem} />
          <Row words={words} gem={t.gem} />
        </div>
      </div>
    </div>
  );
}
