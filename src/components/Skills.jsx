import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import SectionTitle from "./SectionTitle";
import usePointerFine from "../hooks/usePointerFine";

const groups = [
  { label: "Languages", tone: "bg-sticker-green", items: ["Java", "Python", "JavaScript", "HTML/CSS"] },
  {
    label: "Frameworks",
    tone: "bg-sticker-orange",
    items: ["React", "Next.js", "Node.js", "Express", "NestJS", "Tailwind CSS", "Flutter / Dart"],
  },
  { label: "Platforms", tone: "bg-sticker-blue", items: ["ERPNext / Frappe", "Android Studio"] },
  { label: "Tooling", tone: "bg-sticker-yellow", items: ["Git", "WSL", "n8n"] },
];

// selang-seling antar grup supaya warnanya tercampur di papan
const longest = Math.max(...groups.map((g) => g.items.length));
const stickers = Array.from({ length: longest }).flatMap((_, row) =>
  groups
    .filter((g) => g.items[row])
    .map((g) => ({ name: g.items[row], group: g.label, tone: g.tone }))
);

const tilts = [-5, 3, -2, 6, -4, 2, 5, -3];

export default function Skills() {
  const board = useRef(null);
  const [focus, setFocus] = useState(null);
  const [round, setRound] = useState(0);
  const canDrag = usePointerFine();

  return (
    <section id="skills">
      <SectionTitle cmd="$ cat stack.json" tone="bg-sticker-blue">
        Stack
      </SectionTitle>

      <div className="mb-5 flex flex-wrap items-center gap-2">
        {groups.map((g) => {
          const on = focus === g.label;
          return (
            <button
              key={g.label}
              type="button"
              aria-pressed={on}
              onClick={() => setFocus(on ? null : g.label)}
              className={`btn-press rounded-md border-2 border-fg px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wide text-fg outline-none transition-[translate,box-shadow,opacity] focus-visible:ring-2 focus-visible:ring-fg ${g.tone} ${
                on ? "translate-x-[2px] translate-y-[2px]" : "shadow-[2px_2px_0_var(--color-fg)]"
              } ${focus && !on ? "opacity-50" : ""}`}
            >
              {g.label}
            </button>
          );
        })}

        {canDrag && (
          <button
            type="button"
            onClick={() => setRound(round + 1)}
            className="btn-press ml-auto inline-flex items-center gap-1.5 rounded-md border-2 border-fg bg-chip px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wide text-fg shadow-[2px_2px_0_var(--color-fg)] outline-none focus-visible:ring-2 focus-visible:ring-fg"
          >
            <RotateCcw size={12} /> tidy up
          </button>
        )}
      </div>

      <div
        ref={board}
        className="relative overflow-hidden rounded-xl border-2 border-fg bg-surface shadow-[5px_5px_0_var(--color-fg)]"
        style={{
          backgroundImage:
            "linear-gradient(color-mix(in srgb, var(--color-fg) 7%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--color-fg) 7%, transparent) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      >
        <ul
          key={round}
          className="flex min-h-72 flex-wrap content-center items-center justify-center gap-x-5 gap-y-6 px-6 py-12 md:px-12"
        >
          {stickers.map((s, i) => {
            const dim = focus && focus !== s.group;
            return (
              <motion.li
                key={s.name}
                drag={canDrag}
                dragConstraints={board}
                dragElastic={0.2}
                dragTransition={{ bounceStiffness: 300, bounceDamping: 18 }}
                initial={{ scale: 0, rotate: tilts[i % tilts.length] - 25 }}
                whileInView={{
                  scale: 1,
                  rotate: tilts[i % tilts.length],
                  transition: { type: "spring", stiffness: 320, damping: 16, delay: i * 0.04 },
                }}
                viewport={{ once: true, amount: 0.6 }}
                animate={{ opacity: dim ? 0.25 : 1 }}
                whileHover={{ scale: 1.08, rotate: 0 }}
                whileDrag={{ scale: 1.15, rotate: 0, zIndex: 20 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 320, damping: 16 }}
                className={`${s.tone} ${
                  canDrag ? "cursor-grab active:cursor-grabbing" : ""
                } select-none rounded-lg border-2 border-fg px-4 py-2 text-sm font-bold text-fg shadow-[3px_3px_0_var(--color-fg)] md:text-base`}
              >
                {s.name}
                <span className="sr-only"> ({s.group})</span>
              </motion.li>
            );
          })}
        </ul>

        <p className="pointer-events-none absolute bottom-2 right-4 font-hand text-xl text-muted">
          {canDrag ? "drag & toss the stickers ↗" : "tap a label to highlight"}
        </p>
      </div>
    </section>
  );
}
