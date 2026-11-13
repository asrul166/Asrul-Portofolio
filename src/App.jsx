import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/about";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Reveal from "./components/Reveal";
import Marquee from "./components/Marquee";
import ScrollProgress from "./components/ScrollProgress";
import Toaster from "./components/Toast";
import CommandPalette from "./components/CommandPalette";

const wrap = "mx-auto max-w-5xl px-6";
const stackWords = ["Frappe", "Tailwind CSS", "Node.js", "PostgreSQL", "TypeScript", "Firebase", "Dart"];

export default function App() {
  const [palette, setPalette] = useState(false);

  // Ctrl+K / ⌘K membuka-tutup command palette
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((open) => !open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen overflow-x-clip text-fg selection:bg-sticker-yellow">
        <ScrollProgress />
        <Navbar onOpenPalette={() => setPalette(true)} />
        <Hero />
        <Marquee />
        <main className="pt-12 pb-24 space-y-28">
          <div className={wrap}>
            <About />
          </div>
          <div className={wrap}>
            <Reveal>
              <Projects />
            </Reveal>
          </div>
          <Marquee words={stackWords} tone="yellow" reverse tilt />
          <div className={wrap}>
            <Reveal variant="pop">
              <Skills />
            </Reveal>
          </div>
          <div className={wrap}>
            <Contact />
          </div>
        </main>
        <Footer />
        <Toaster />
        {createPortal(
          <AnimatePresence>
            {palette && <CommandPalette key="palette" onClose={() => setPalette(false)} />}
          </AnimatePresence>,
          document.body
        )}
      </div>
    </MotionConfig>
  );
}
