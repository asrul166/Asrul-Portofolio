import React from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowUpRight, Github, Instagram, Mail } from "lucide-react";
import { EMAIL, GITHUB, INSTAGRAM } from "../data/site";

const social =
  "grid h-10 w-10 place-items-center rounded-full border-2 border-cream text-cream outline-none transition-colors hover:bg-sticker-yellow hover:text-blk hover:border-sticker-yellow focus-visible:bg-sticker-yellow focus-visible:text-blk";

const headline = "LET'S BUILD";

export default function Footer() {
  return (
    <footer className="border-t-2 border-fg bg-blk text-cream">
      <div className="mx-auto max-w-5xl px-6 pt-16 pb-8">
        <p className="font-mono text-xs uppercase tracking-widest text-cream/60">$ echo "got an idea?"</p>

        <a href="#contact" aria-label="Let's build — go to contact" className="group mt-3 block outline-none">
          <span
            aria-hidden="true"
            className="flex flex-wrap font-display font-bold leading-none text-[clamp(3rem,13vw,9rem)]"
          >
            {headline.split("").map((ch, i) => (
              <motion.span
                key={i}
                className="inline-block whitespace-pre group-hover:text-sticker-yellow group-focus-visible:text-sticker-yellow"
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ type: "spring", stiffness: 300, damping: 18, delay: i * 0.04 }}
              >
                {ch}
              </motion.span>
            ))}
            <ArrowUpRight className="ml-2 h-[0.8em] w-[0.8em] self-center text-sticker-yellow transition-transform group-hover:translate-x-2 group-hover:-translate-y-2" />
          </span>
        </a>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            <a href={`mailto:${EMAIL}`} aria-label="Email" className={social}>
              <Mail size={16} />
            </a>
            <a href={GITHUB.url} target="_blank" rel="noreferrer" aria-label="GitHub" className={social}>
              <Github size={16} />
            </a>
            <a href={INSTAGRAM.url} target="_blank" rel="noreferrer" aria-label="Instagram" className={social}>
              <Instagram size={16} />
            </a>
          </div>

          <a
            href="#top"
            className="btn-press inline-flex items-center gap-2 rounded-md border-2 border-cream bg-cream px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide text-blk shadow-[3px_3px_0_#F7C948] transition-[translate] hover:-translate-y-0.5"
          >
            Back to top <ArrowUp size={14} />
          </a>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t-2 border-cream/20 pt-6 font-mono text-sm text-cream/70 sm:flex-row">
          <span>© {new Date().getFullYear()} Asrul</span>
          <span>built with React + Tailwind</span>
        </div>
      </div>
    </footer>
  );
}
