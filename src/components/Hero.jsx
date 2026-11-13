import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Github } from "lucide-react";
import Typed from "./Typed";
import Magnetic from "./Magnetic";
import usePointerFine from "../hooks/usePointerFine";
import { EMAIL, GITHUB } from "../data/site";
import { copyEmail } from "../lib/toast";

const clock = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Makassar",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

// jam Makassar (WITA), berdetak tiap detik
function LocalTime() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return <span className="tabular-nums text-fg">{clock.format(now)} WITA</span>;
}

const chipLink =
  "inline-flex items-center gap-2 rounded-full border-2 border-fg bg-chip px-3 py-1 outline-none transition-[translate,box-shadow,background-color] hover:-translate-y-0.5 hover:bg-sticker-yellow hover:text-blk hover:shadow-[2px_2px_0_var(--color-fg)] focus-visible:bg-sticker-yellow focus-visible:text-blk";

const bootLines = [
  { k: "role", v: "Informatics Engineering student" },
  { k: "focus", v: "Web · Mobile · ERP" },
  { k: "base", v: "Makassar, Indonesia" },
  { k: "status", v: "open to freelance web projects", accent: true },
];

const stickers = [
  { t: "Web Development", c: "bg-sticker-blue", r: "-rotate-3" },
  { t: "Mobile", c: "bg-sticker-green", r: "rotate-2" },
  { t: "ERPNext / Frappe", c: "bg-sticker-yellow", r: "-rotate-1" },
  { t: "Makassar, ID", c: "bg-sticker-pink", r: "rotate-3" },
];

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.15 },
  transition: { duration: 0.6, ease: "easeOut", delay },
});

export default function Hero() {
  const canDrag = usePointerFine();

  return (
    <section id="top" className="relative text-fg">
      <div className="mx-auto max-w-6xl px-6 pt-28 pb-16 grid gap-10 md:grid-cols-[1fr_1.25fr_1fr] items-center">
        
        {/* kiri: status.log (ditambah float-y dan animationDelay) */}
        <motion.div {...rise(0.1)} className="w-full max-w-sm mx-auto md:mx-0 md:justify-self-end">
          <div 
            className="float-y md:-rotate-2 overflow-hidden rounded-xl border-2 border-fg bg-surface shadow-[6px_6px_0_var(--color-fg)]"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="flex items-center gap-1.5 border-b-2 border-fg bg-sticker-yellow px-4 py-2">
              <span className="w-2.5 h-2.5 rounded-full border-2 border-blk bg-cream" />
              <span className="w-2.5 h-2.5 rounded-full border-2 border-blk bg-cream" />
              <span className="w-2.5 h-2.5 rounded-full border-2 border-blk bg-cream" />
              <span className="ml-2 font-mono text-xs font-bold">status.log</span>
            </div>
            <div className="p-4 font-mono text-xs space-y-2">
              {bootLines.map((line) => (
                <div key={line.k} className="flex gap-3">
                  <span className="shrink-0 text-muted">{line.k}</span>
                  <span className={line.accent ? "font-bold text-ok" : "text-fg"}>
                    {line.accent && (
                      <span className="relative mr-2 inline-flex h-2 w-2 align-middle">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
                      </span>
                    )}
                    {line.v}
                  </span>
                </div>
              ))}
              <div className="flex gap-3">
                <span className="shrink-0 text-muted">time</span>
                <LocalTime />
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 font-mono text-xs">
            <button type="button" onClick={copyEmail} title="Copy email" className={`${chipLink} cursor-pointer`}>
              <Mail size={13} /> {EMAIL}
            </button>
            <a href={GITHUB.url} target="_blank" rel="noreferrer" className={chipLink}>
              <Github size={13} /> {GITHUB.label}
            </a>
          </div>
        </motion.div>

        {/* tengah: judul */}
        <motion.div {...rise(0)} className="order-first md:order-none text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            <Typed text="$ whoami · by asrul" />
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {stickers.map((s, i) => (
              // pembungkus yang di-drag; animasi melayang tetap di span dalam
              <motion.span
                key={s.t}
                drag={canDrag}
                dragSnapToOrigin
                dragElastic={0.6}
                whileDrag={{ scale: 1.2, zIndex: 30 }}
                className={`relative inline-block ${canDrag ? "cursor-grab active:cursor-grabbing" : ""}`}
              >
                <span
                  style={{ animationDelay: `${-i * 0.9}s` }}
                  className={`${s.c} ${s.r} float-y wiggle inline-block select-none rounded-md border-2 border-fg px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wide shadow-[2px_2px_0_var(--color-fg)]`}
                >
                  {s.t}
                </span>
              </motion.span>
            ))}
          </div>

          <h1
            aria-label="ASRUL"
            className="mt-5 inline-flex rounded-md border-2 border-fg bg-chip px-5 py-1 font-name text-6xl md:text-7xl font-extrabold tracking-tight shadow-[6px_6px_0_var(--color-fg)]"
          >
            {"ASRUL".split("").map((ch, i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                className="inline-block"
                initial={{ y: 30, opacity: 0, rotate: -8 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 14, delay: 0.3 + i * 0.07 }}
                whileHover={{ 
                  y: -6, 
                  rotate: 4, 
                  // Reset delay ke 0 khusus saat hover supaya langsung loncat!
                  transition: { delay: 0, type: "spring", stiffness: 400, damping: 10 } 
                }}
              >
                {ch}
              </motion.span>
            ))}
          </h1>

          <h2 className="mt-6 text-2xl md:text-3xl font-extrabold leading-tight">
            From ideas to interfaces{" "}
            <span className="inline-block h-6 w-6 rounded-full border-2 border-fg bg-sticker-green align-middle" />{" "}
            from code to solutions{" "}
            <span className="inline-block h-6 w-6 rounded-full border-2 border-fg bg-sticker-pink align-middle" />
          </h2>

          <p className="mt-4 font-hand text-2xl leading-snug text-soft">
            Web apps, Mobile apps, and ERP systems. I learn by building them,
            one small working piece at a time.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Magnetic>
              <a
                href="#contact"
                className="btn-press inline-flex items-center gap-2 rounded-md border-2 border-fg bg-fg px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-bg shadow-[3px_3px_0_#F7C948] transition-transform hover:-translate-y-0.5"
              >
                Contact me <ArrowUpRight size={16} />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#projects"
                className="btn-press inline-flex items-center rounded-md border-2 border-fg bg-chip px-5 py-2.5 text-sm font-bold uppercase tracking-wide shadow-[3px_3px_0_var(--color-fg)] transition-transform hover:-translate-y-0.5"
              >
                View the log
              </a>
            </Magnetic>
          </div>
        </motion.div>

        {/* kanan: Spotify (ditambah float-y dan animationDelay) */}
        <motion.div {...rise(0.2)} className="w-full max-w-sm mx-auto md:mx-0 md:justify-self-start">
          <div 
            className="float-y md:rotate-2"
            style={{ animationDelay: "1.2s" }}
          >
            <span className="relative z-10 -mb-[2px] ml-4 inline-block rounded-t-md border-2 border-b-0 border-fg bg-sticker-green px-3 py-1 font-mono text-xs font-bold">
              $ daily_rotation
            </span>
            <div className="rounded-xl border-2 border-fg bg-surface p-2 shadow-[6px_6px_0_var(--color-fg)]">
              <iframe
                title="Spotify playlist"
                src="https://open.spotify.com/embed/playlist/2YKi8NMIafU4bElDX8zVt7?theme=0"
                width="100%"
                height="352"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="block rounded-lg"
              />
            </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}