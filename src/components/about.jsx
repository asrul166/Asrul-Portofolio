import React from "react";
import { motion } from "framer-motion";
import { RevealItem } from "./Reveal";

const PHOTO_BASE = "/profile1.svg";
const PHOTO_ALT = "/profile2.svg";
const ALT_SCALE = 1.04; 
const ALT_Y = "1%";     
const PHOTO_RATIO = "7 / 6"; 

const education = [
  { org: "Universitas Dipa Makassar", title: "Informatics Engineering", period: "2024 – Present", logo: "Undipa.png" },
  { org: "SMAN 4 Bantaeng", title: "Ilmu Pengetahuan Alam", period: "2021 – 2024", logo: "SMAN4.png" },
];

const experience = [
  { org: "SolvexaERP", title: "Technical & Social Media", period: "2026 – Present", logo: "/Solvexa.png" },
  { org: "Google Developer Group on Campus Universitas Hasanuddin", title: "Member", period: "2024 – 2025", logo: "/google-developers.svg" },
  { org: "Google Developer Group on Campus Universitas Hasanuddin", title: "Member", period: "2025 – 2026", logo: "/google-developers.svg" },
  { org: "BBLSDM Komdigi Makassar", title: "Magang", period: " Sep 2026 – Jan 2027", logo: "/Komdigi.png" },
];

function Item({ org, title, period, logo, chip }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border-2 border-blk bg-white p-5 shadow-[4px_4px_0_#111]">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 border-blk bg-white">
        {logo ? (
          <img src={logo} alt={org} loading="lazy" className="h-full w-full object-contain p-2" />
        ) : (
          <span className="font-display text-xl font-bold text-blk">{org[0]}</span>
        )}
      </div>
      <div className="min-w-0">
        <h4 className="text-base md:text-lg font-bold leading-snug text-blk">{org}</h4>
        <p className="text-sm text-[#4A463C]">{title}</p>
        <span
          className={`mt-2 inline-block rounded border-2 border-blk px-2 py-0.5 font-mono text-[11px] font-bold text-blk ${chip}`}
        >
          {period.trim()}
        </span>
      </div>
    </div>
  );
}

const fade =
  "linear-gradient(to bottom, #000 0%, #000 50%, rgba(0,0,0,0.85) 62%, rgba(0,0,0,0.55) 76%, rgba(0,0,0,0.25) 88%, transparent 100%)";

function BlinkPhoto({ base, alt }) {
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <div
      className="blink-photo relative mx-auto w-80 max-w-full md:w-[120%] md:-mx-[10%] md:max-w-none"
      onPointerMove={move}
      style={{ aspectRatio: PHOTO_RATIO, WebkitMaskImage: fade, maskImage: fade }}
    >
      <img
        src={base}
        alt="Asrul"
        loading="lazy"
        className="base absolute inset-0 w-full h-full object-cover object-bottom"
      />
      <div className="alt absolute inset-0 pointer-events-none">
        <img
          src={alt}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="w-full h-full object-cover object-bottom"
          style={{
            transform: `translateY(${ALT_Y}) scale(${ALT_SCALE})`,
            transformOrigin: "50% 100%",
          }}
        />
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about">
      <span className="inline-block -rotate-1 rounded-md border-2 border-blk bg-sticker-green px-2.5 py-1 font-mono text-xs font-bold text-blk shadow-[2px_2px_0_#111]">
        $ cat about.md
      </span>

      <motion.div
        className="mt-6 grid md:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)_minmax(0,0.9fr)] gap-8 items-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative z-10">
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-none text-blk">
            <span 
              className="float-y inline-block -rotate-2 rounded-md border-2 border-blk bg-sticker-yellow px-3 py-1 shadow-[3px_3px_0_#111]"
              style={{ animationDelay: "0.2s" }}
            >
              Hi, I'm
            </span>
            <br />
            <span 
              className="float-y mt-3 inline-block"
              style={{ animationDelay: "0.7s" }}
            >
              Asrul
            </span>
          </h2>
          <a
            href="#contact"
            className="btn-press mt-6 inline-block rounded-md border-2 border-blk bg-blk px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-cream shadow-[3px_3px_0_#F7C948] transition-transform hover:-translate-y-0.5"
          >
            Get in touch
          </a>
        </div>

        <BlinkPhoto base={PHOTO_BASE} alt={PHOTO_ALT} />

        <div className="relative z-10">
          <p className="font-hand text-2xl leading-snug text-[#3A372F]">
            Informatics Engineering student building web apps, Android apps,
            and ERP systems, one small working project at a time.
          </p>
          <a
            href="#projects"
            className="btn-press mt-6 inline-block rounded-md border-2 border-blk bg-cream px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-blk shadow-[3px_3px_0_#111] transition-transform hover:-translate-y-0.5"
          >
            View Projects
          </a>
        </div>
      </motion.div>

      <motion.div
        className="mt-16 grid md:grid-cols-2 gap-10"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h3 className="mb-5 inline-block rounded-md border-2 border-blk bg-sticker-blue px-3 py-1 font-display text-xl font-bold text-blk shadow-[3px_3px_0_#111]">
            Education
          </h3>
          <div className="space-y-4">
            {education.map((e, i) => (
              <RevealItem key={`${e.org}-${e.period}`} index={i}>
                <Item chip="bg-sticker-blue" {...e} />
              </RevealItem>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-5 inline-block rounded-md border-2 border-blk bg-sticker-yellow px-3 py-1 font-display text-xl font-bold text-blk shadow-[3px_3px_0_#111]">
            Experience
          </h3>
          <div className="space-y-4">
            {experience.map((e, i) => (
              <RevealItem key={`${e.org}-${e.period}`} index={i}>
                <Item chip="bg-sticker-yellow" {...e} />
              </RevealItem>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}