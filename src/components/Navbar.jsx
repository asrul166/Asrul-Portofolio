import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, ArrowUpRight, Moon, Sun, Terminal } from "lucide-react";
import { toggleTheme, useTheme } from "../lib/theme";

const links = [
  { href: "#top", id: "top", label: "Home" },
  { href: "#about", id: "about", label: "About" },
  { href: "#projects", id: "projects", label: "Log" },
  { href: "#skills", id: "skills", label: "Stack" },
];

const pill = "rounded-full border-2 px-4 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors";
const round =
  "pointer-events-auto grid h-10 w-10 place-items-center rounded-full border-2 border-fg bg-chip text-fg shadow-[2px_2px_0_var(--color-fg)] outline-none transition-colors hover:bg-sticker-yellow hover:text-blk focus-visible:bg-sticker-yellow focus-visible:text-blk";

export default function Navbar({ onOpenPalette }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("top");
  const theme = useTheme();

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
          className="pointer-events-auto justify-self-start grid place-items-center w-10 h-10 rounded-full border-2 border-fg bg-sticker-orange font-display font-bold shadow-[2px_2px_0_var(--color-fg)]"
        >
          A
        </a>

        <nav className="pointer-events-auto hidden md:flex items-center gap-1 rounded-full border-2 border-fg bg-chip p-1 shadow-[3px_3px_0_var(--color-fg)]">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`relative ${pill} border-transparent ${
                active === l.id ? "text-blk" : "text-fg hover:bg-fg/5"
              }`}
            >
              {active === l.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute -inset-0.5 rounded-full border-2 border-fg bg-sticker-yellow"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{l.label}</span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 justify-self-end">
          <button
            type="button"
            onClick={onOpenPalette}
            aria-label="Open command palette"
            title="Command palette (Ctrl+K)"
            className={`pointer-events-auto hidden lg:inline-flex items-center gap-1.5 ${pill} border-fg bg-chip text-fg shadow-[3px_3px_0_var(--color-fg)] outline-none hover:bg-sticker-yellow hover:text-blk focus-visible:bg-sticker-yellow focus-visible:text-blk`}
          >
            <Terminal size={14} />
            <span className="font-mono normal-case">Ctrl K</span>
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Light mode" : "Dark mode"}
            className={round}
          >
            <motion.span
              key={theme}
              initial={{ rotate: -90, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 16 }}
              className="grid place-items-center"
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </motion.span>
          </button>

          <a
            href="#contact"
            className={`pointer-events-auto hidden md:inline-flex items-center gap-1.5 ${pill} border-fg text-fg shadow-[3px_3px_0_var(--color-fg)] ${
              active === "contact" ? "bg-sticker-yellow" : "bg-chip"
            }`}
          >
            Contact <ArrowUpRight size={14} />
          </a>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className={`${round} md:hidden`}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="pointer-events-auto md:hidden mx-auto mt-3 max-w-6xl flex flex-col rounded-xl border-2 border-fg bg-chip p-2 shadow-[4px_4px_0_var(--color-fg)]">
          {[...links, { href: "#contact", id: "contact", label: "Contact" }].map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`rounded-lg px-3 py-2 text-sm font-bold uppercase tracking-wide text-fg ${
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
