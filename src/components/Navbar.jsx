import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const links = [
  { href: "#top", id: "top", label: "Home" },
  { href: "#about", id: "about", label: "About" },
  { href: "#projects", id: "projects", label: "Log" },
  { href: "#skills", id: "skills", label: "Stack" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("top");

  useEffect(() => {
    const ids = ["top", "about", "projects", "skills", "contact"];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const pill = "rounded-full border-2 px-4 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors";

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.1 }}
      className="fixed top-4 inset-x-0 z-40 px-4 pointer-events-none"
    >
      <div className="mx-auto max-w-6xl flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">
        <a
          href="#top"
          aria-label="Home"
          className="pointer-events-auto justify-self-start grid place-items-center w-10 h-10 rounded-full border-2 border-blk bg-sticker-orange font-display font-bold text-blk shadow-[2px_2px_0_#111]"
        >
          A
        </a>

        <nav className="pointer-events-auto hidden md:flex items-center gap-1 rounded-full border-2 border-blk bg-cream p-1 shadow-[3px_3px_0_#111]">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`relative ${pill} border-transparent text-blk ${
                active === l.id ? "" : "hover:bg-black/5"
              }`}
            >
              {active === l.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute -inset-0.5 rounded-full border-2 border-blk bg-sticker-yellow"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{l.label}</span>
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className={`pointer-events-auto hidden md:inline-flex items-center gap-1.5 justify-self-end ${pill} border-blk text-blk shadow-[3px_3px_0_#111] ${
            active === "contact" ? "bg-sticker-yellow" : "bg-cream"
          }`}
        >
          Contact <ArrowUpRight size={14} />
        </a>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="pointer-events-auto md:hidden grid place-items-center w-10 h-10 rounded-full border-2 border-blk bg-cream text-blk shadow-[2px_2px_0_#111]"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <nav className="pointer-events-auto md:hidden mx-auto mt-3 max-w-6xl flex flex-col rounded-xl border-2 border-blk bg-cream p-2 shadow-[4px_4px_0_#111]">
          {[...links, { href: "#contact", id: "contact", label: "Contact" }].map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`rounded-lg px-3 py-2 text-sm font-bold uppercase tracking-wide text-blk ${
                active === l.id ? "bg-sticker-yellow" : ""
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </motion.header>
  );
}