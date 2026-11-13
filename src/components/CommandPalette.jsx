import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AtSign, Copy, CornerDownLeft, FolderOpen, Github, Home, Layers, Send, SunMoon, User } from "lucide-react";
import { GITHUB, INSTAGRAM } from "../data/site";
import { copyEmail } from "../lib/toast";
import { toggleTheme } from "../lib/theme";

const go = (id) => () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
const visit = (url) => () => window.open(url, "_blank", "noopener,noreferrer");

// Tambah perintah baru di sini. `keys` = kata kunci tambahan untuk pencarian.
const commands = [
  { id: "home", label: "cd ~/home", hint: "Back to top", keys: "top start", icon: Home, run: go("top") },
  { id: "about", label: "cat about.md", hint: "About, education, experience", keys: "bio", icon: User, run: go("about") },
  { id: "projects", label: "ls ./work", hint: "Work log", keys: "projects portfolio log", icon: FolderOpen, run: go("projects") },
  { id: "skills", label: "cat stack.json", hint: "Stack & tools", keys: "skills tech", icon: Layers, run: go("skills") },
  { id: "contact", label: "./contact --send", hint: "Get in touch", keys: "message hire", icon: Send, run: go("contact") },
  { id: "theme", label: "theme --toggle", hint: "Dark / light mode", keys: "dark light mode night", icon: SunMoon, run: toggleTheme },
  { id: "email", label: "copy email", hint: "Copy address to clipboard", keys: "mail gmail", icon: Copy, run: copyEmail },
  { id: "github", label: "open github", hint: GITHUB.label, keys: "code repo", icon: Github, run: visit(GITHUB.url) },
  { id: "instagram", label: "open instagram", hint: INSTAGRAM.label, keys: "ig social", icon: AtSign, run: visit(INSTAGRAM.url) },
];

export default function CommandPalette({ onClose }) {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const input = useRef(null);
  const list = useRef(null);

  const q = query.trim().toLowerCase();
  const results = q
    ? commands.filter((c) => `${c.label} ${c.hint} ${c.keys}`.toLowerCase().includes(q))
    : commands;
  const selected = Math.min(index, Math.max(results.length - 1, 0));

  // fokus ke input saat dibuka, kembalikan fokus saat ditutup
  useEffect(() => {
    const before = document.activeElement;
    input.current?.focus();
    return () => before?.focus?.({ preventScroll: true });
  }, []);

  useEffect(() => {
    list.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  const run = (cmd) => {
    onClose();
    cmd.run();
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex(results.length ? (selected + 1) % results.length : 0);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex(results.length ? (selected - 1 + results.length) % results.length : 0);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[selected]) run(results[selected]);
    } else if (e.key === "Tab") {
      e.preventDefault(); // fokus tetap di kolom input
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[14vh]">
      <motion.div
        className="absolute inset-0 bg-black/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        onClick={onClose}
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        initial={{ opacity: 0, y: -16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 420, damping: 30 }}
        className="relative w-full max-w-lg overflow-hidden rounded-xl border-2 border-fg bg-surface shadow-[8px_8px_0_var(--color-fg)]"
      >
        <div className="flex items-center gap-1.5 border-b-2 border-fg bg-sticker-yellow px-4 py-2">
          <span className="h-2.5 w-2.5 rounded-full border-2 border-blk bg-cream" />
          <span className="h-2.5 w-2.5 rounded-full border-2 border-blk bg-cream" />
          <span className="h-2.5 w-2.5 rounded-full border-2 border-blk bg-cream" />
          <span className="ml-2 font-mono text-xs font-bold">asrul@portfolio: ~</span>
        </div>

        <label className="flex items-center gap-3 border-b-2 border-fg px-4 py-3 font-mono text-sm">
          <span aria-hidden="true" className="font-bold text-ok">$</span>
          <input
            ref={input}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIndex(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="type a command…"
            aria-label="Search commands"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={results[selected] ? `palette-${results[selected].id}` : undefined}
            autoComplete="off"
            spellCheck="false"
            className="w-full bg-transparent text-fg outline-none placeholder:text-muted"
          />
        </label>

        <ul ref={list} id="palette-list" role="listbox" aria-label="Commands" className="max-h-72 overflow-y-auto p-2">
          {results.map((c, i) => {
            const on = i === selected;
            return (
              <li
                key={c.id}
                id={`palette-${c.id}`}
                role="option"
                aria-selected={on}
                onPointerMove={() => setIndex(i)}
                onClick={() => run(c)}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 px-3 py-2 font-mono text-sm ${
                  on ? "border-fg bg-sticker-yellow" : "border-transparent text-fg"
                }`}
              >
                <c.icon size={15} className="shrink-0" />
                <span className="font-bold">{c.label}</span>
                <span className="ml-auto truncate pl-3 text-xs opacity-60">{c.hint}</span>
                {on && <CornerDownLeft size={13} className="shrink-0" />}
              </li>
            );
          })}
          {results.length === 0 && (
            <li className="px-3 py-6 text-center font-mono text-sm text-muted">
              command not found: {query.trim()}
            </li>
          )}
        </ul>

        <div className="flex flex-wrap gap-x-4 gap-y-1 border-t-2 border-fg bg-chip px-4 py-2 font-mono text-[11px] text-muted">
          <span>↑↓ navigate</span>
          <span>↵ run</span>
          <span>esc close</span>
        </div>
      </motion.div>
    </div>
  );
}
