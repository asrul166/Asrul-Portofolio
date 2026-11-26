import React, { Suspense, lazy, useState } from "react";
import { Mail, Instagram, Github, Copy, ArrowUpRight } from "lucide-react";
import SectionTitle from "./SectionTitle";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";
import { EMAIL, GITHUB, INSTAGRAM } from "../data/site";
import { copyEmail } from "../lib/toast";
import { button, card, field } from "./formStyles";

// Firebase baru diunduh saat tab Comments dibuka
const Comments = lazy(() => import("./Comments"));

const tabs = [
  { id: "contact", label: "Contact", tone: "bg-sticker-orange" },
  { id: "comments", label: "Comments", tone: "bg-sticker-green" },
];

const linkCard =
  "group flex w-full items-center gap-3 rounded-lg border-2 border-fg bg-surface p-4 text-left shadow-[3px_3px_0_var(--color-fg)] outline-none transition-[translate,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_var(--color-fg)] focus-visible:ring-4 focus-visible:ring-sticker-blue";

const iconBox = "grid h-9 w-9 shrink-0 place-items-center rounded-md border-2 border-fg transition-transform group-hover:-rotate-6";
const hint = "ml-auto text-muted transition-colors group-hover:text-fg";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const [tab, setTab] = useState("contact");
  const [opened, setOpened] = useState(false);

  function openTab(id) {
    setTab(id);
    if (id === "comments") setOpened(true);
  }

  function handleTabKey(e) {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    const next = tab === "contact" ? "comments" : "contact";
    openTab(next);
    document.getElementById(`tab-${next}`).focus();
  }

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

      <div role="tablist" aria-label="Contact or comments" onKeyDown={handleTabKey} className="mb-6 flex gap-3">
        {tabs.map((t) => {
          const on = tab === t.id;
          return (
            <button
              key={t.id}
              id={`tab-${t.id}`}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls={`panel-${t.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => openTab(t.id)}
              className={`btn-press rounded-md border-2 border-fg px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide text-fg outline-none transition-[translate,box-shadow] focus-visible:ring-2 focus-visible:ring-fg ${
                on ? `${t.tone} translate-x-[2px] translate-y-[2px]` : "bg-chip shadow-[3px_3px_0_var(--color-fg)]"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div
        id="panel-contact"
        role="tabpanel"
        aria-labelledby="tab-contact"
        hidden={tab !== "contact"}
      >
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
                <button type="submit" className={button}>
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
      </div>

      <div
        id="panel-comments"
        role="tabpanel"
        aria-labelledby="tab-comments"
        hidden={tab !== "comments"}
      >
        {opened && (
          <Suspense fallback={<p className={`${card} text-sm text-soft`}>Loading comments...</p>}>
            <Comments />
          </Suspense>
        )}
      </div>
    </section>
  );
}
