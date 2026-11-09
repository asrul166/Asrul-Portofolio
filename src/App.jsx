import React from "react";
import { MotionConfig } from "framer-motion";
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

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen text-blk selection:bg-sticker-yellow">
        <ScrollProgress />
        <Navbar />
        <Hero />
        <Marquee />
        <main className="mx-auto max-w-5xl px-6 pt-12 pb-24 space-y-28">
          <About />
          <Reveal><Projects /></Reveal>
          <Reveal><Skills /></Reveal>
          <Reveal><Contact /></Reveal>
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}