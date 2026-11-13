import React, { useState } from "react";
import { Mail, Instagram, Github, Copy, ArrowUpRight } from "lucide-react";
import SectionTitle from "./SectionTitle";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";
import { EMAIL, GITHUB, INSTAGRAM } from "../data/site";
import { copyEmail } from "../lib/toast";

const field =
  "w-full rounded-lg border-2 border-fg bg-surface px-4 py-2.5 text-fg placeholder:text-muted shadow-[3px_3px_0_var(--color-fg)] outline-none transition focus:shadow-[3px_3px_0_#F7C948]";

const linkCard =
  "group flex w-full items-center gap-3 rounded-lg border-2 border-fg bg-surface p-4 text-left shadow-[3px_3px_0_var(--color-fg)] outline-none transition-[translate,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_var(--color-fg)] focus-visible:ring-4 focus-visible:ring-sticker-blue";

const iconBox = "grid h-9 w-9 shrink-0 place-items-center rounded-md border-2 border-fg transition-transform group-hover:-rotate-6";
const hint = "ml-auto text-muted transition-colors group-hover:text-fg";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || "website visitor"}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name} (${form.email})`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact">
      <Reveal variant="tilt">
        <SectionTitle cmd="$ ./contact --send" tone="bg-sticker-orange">
          Get in Touch
        </SectionTitle>
      </Reveal>

      <div className="grid md:grid-cols-5 gap-8">
        <Reveal variant="left" className="md:col-span-3">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              placeholder="Name"
              aria-label="Name"
              autoComplete="name"
              required
              className={field}
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="Email"
              aria-label="Email"
              autoComplete="email"
              required
              className={field}
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="4"
              placeholder="What are you looking to build?"
              aria-label="Message"
              required
              className={field}
            />
            <Magnetic>
              <button
                type="submit"
                className="btn-press rounded-md border-2 border-fg bg-fg px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-bg shadow-[3px_3px_0_#F7C948] transition-[translate] hover:-translate-y-0.5"
              >
                Send message
              </button>
            </Magnetic>
          </form>
        </Reveal>

        <Reveal variant="right" delay={0.1} className="md:col-span-2 space-y-4">
          <button type="button" onClick={copyEmail} className={linkCard}>
            <span className={`${iconBox} bg-sticker-yellow`}>
              <Mail size={16} />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-fg">{EMAIL}</span>
              <span className="block font-mono text-[11px] text-muted">click to copy</span>
            </span>
            <Copy size={15} className={hint} />
          </button>
          <a href={GITHUB.url} target="_blank" rel="noreferrer" className={linkCard}>
            <span className={`${iconBox} bg-sticker-blue`}>
              <Github size={16} />
            </span>
            <span className="text-sm font-semibold text-fg">{GITHUB.label}</span>
            <ArrowUpRight size={15} className={hint} />
          </a>
          <a href={INSTAGRAM.url} target="_blank" rel="noreferrer" className={linkCard}>
            <span className={`${iconBox} bg-sticker-pink`}>
              <Instagram size={16} />
            </span>
            <span className="text-sm font-semibold text-fg">{INSTAGRAM.label}</span>
            <ArrowUpRight size={15} className={hint} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
