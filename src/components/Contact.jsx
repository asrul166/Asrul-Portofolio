import React, { useState } from "react";
import { Mail, Instagram, Github } from "lucide-react";
import SectionTitle from "./SectionTitle";

const field =
  "w-full rounded-lg border-2 border-blk bg-white px-4 py-2.5 text-blk placeholder:text-[#8A8472] shadow-[3px_3px_0_#111] outline-none transition focus:bg-[#FFFBEA] focus:shadow-[3px_3px_0_#F7C948]";

const linkCard =
  "flex items-center gap-3 rounded-lg border-2 border-blk bg-white p-4 shadow-[3px_3px_0_#111] transition-transform hover:-translate-y-0.5";

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
    window.location.href = `mailto:hello@asrul.dev?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact">
      <SectionTitle cmd="$ ./contact --send" tone="bg-sticker-orange">
        Get in Touch
      </SectionTitle>

      <div className="grid md:grid-cols-5 gap-8">
        <form onSubmit={handleSubmit} className="md:col-span-3 space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            type="text"
            placeholder="Name"
            required
            className={field}
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
            required
            className={field}
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows="4"
            placeholder="What are you looking to build?"
            required
            className={field}
          />
          <button
            type="submit"
            className="btn-press rounded-md border-2 border-blk bg-blk px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-cream shadow-[3px_3px_0_#F7C948] transition-transform hover:-translate-y-0.5"
          >
            Send message
          </button>
        </form>

        <div className="md:col-span-2 space-y-4">
          <a href="mailto:asrulsaid16@gmail.com" className={linkCard}>
            <span className="grid h-9 w-9 place-items-center rounded-md border-2 border-blk bg-sticker-yellow">
              <Mail size={16} />
            </span>
            <span className="text-sm font-semibold text-blk">asrulsaid16@gmail.com</span>
          </a>
          <a
            href="https://github.com/asrul166"
            target="_blank"
            rel="noreferrer"
            className={linkCard}
          >
            <span className="grid h-9 w-9 place-items-center rounded-md border-2 border-blk bg-sticker-blue">
              <Github size={16} />
            </span>
            <span className="text-sm font-semibold text-blk">github.com/asrul166</span>
          </a>
          <a
            href="https://instagram.com/asrlsaid"
            target="_blank"
            rel="noreferrer"
            className={linkCard}
          >
            <span className="grid h-9 w-9 place-items-center rounded-md border-2 border-blk bg-sticker-pink">
              <Instagram size={16} />
            </span>
            <span className="text-sm font-semibold text-blk">@asrlsaid</span>
          </a>
        </div>
      </div>
    </section>
  );
}