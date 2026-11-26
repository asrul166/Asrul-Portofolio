import React, { useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionTitle from "./SectionTitle";
import ProjectCover from "./ProjectCover";
import ProjectModal from "./ProjectModal";
import { projects, categories, statusStyles, coverTones } from "../data/projects";

const toneOf = (p) => coverTones[projects.indexOf(p) % coverTones.length];

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState(null);
  const trigger = useRef(null);

  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const count = (c) => (c === "All" ? projects.length : projects.filter((p) => p.category === c).length);

  const open = (p, e) => {
    trigger.current = e.currentTarget;
    setActive(p);
  };

  const close = useCallback(() => {
    setActive(null);
    trigger.current?.focus({ preventScroll: true });
  }, []);

  return (
    <section id="projects">
      <SectionTitle cmd="$ ls ./work" tone="bg-sticker-pink">
        Work Log
      </SectionTitle>

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1 rounded-2xl border-2 border-fg bg-chip p-1 shadow-[3px_3px_0_var(--color-fg)]">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className={`relative rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide outline-none focus-visible:ring-2 focus-visible:ring-fg ${
                filter === c ? "text-blk" : "text-fg hover:bg-fg/5"
              }`}
            >
              {filter === c && (
                <motion.span
                  layoutId="project-filter-pill"
                  className="absolute inset-0 rounded-full border-2 border-fg bg-sticker-pink"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">
                {c} <span className="font-mono text-[10px] opacity-60">{count(c)}</span>
              </span>
            </button>
          ))}
        </div>

        <p className="font-hand text-xl text-soft">psst — click a card to open it</p>
      </div>

      <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((p) => {
            const tone = toneOf(p);

            return (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <motion.article
                  layoutId={`project-${p.id}`}
                  style={{ borderRadius: 12 }}
                  className="group relative flex h-full flex-col overflow-hidden border-2 border-fg bg-surface shadow-[5px_5px_0_var(--color-fg)] transition-[translate,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[8px_8px_0_var(--color-fg)] focus-within:-translate-y-1 focus-within:shadow-[8px_8px_0_var(--color-fg)]"
                >
                  <motion.div
                    layoutId={`cover-${p.id}`}
                    className="shrink-0 border-b-2 border-fg"
                  >
                    <ProjectCover project={p} tone={tone} />
                  </motion.div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded border-2 border-fg px-2 py-0.5 font-mono text-[11px] font-bold text-fg ${statusStyles[p.status]}`}
                      >
                        {p.status}
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-wide text-muted">
                        {p.category}
                      </span>
                    </div>

                    <h3 className="mt-3 text-lg font-extrabold leading-snug text-fg">{p.title}</h3>

                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-soft">
                      {p.desc}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.tags.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="rounded border border-fg/30 bg-chip px-1.5 py-0.5 font-mono text-[11px] text-soft"
                        >
                          #{t.replace(/\s+/g, "").toLowerCase()}
                        </span>
                      ))}
                      {p.tags.length > 4 && (
                        <span className="px-1 py-0.5 font-mono text-[11px] text-muted">
                          +{p.tags.length - 4}
                        </span>
                      )}
                    </div>

                    <span className="mt-auto inline-flex items-center gap-1 pt-5 font-mono text-xs font-bold text-fg">
                      <span className="underline decoration-2 underline-offset-4 decoration-sticker-pink">
                        view details
                      </span>
                      <ArrowUpRight
                        size={14}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </div>

                  {/* seluruh kartu bisa diklik / di-Enter */}
                  <button
                    type="button"
                    onClick={(e) => open(p, e)}
                    aria-haspopup="dialog"
                    aria-label={`Open details: ${p.title}`}
                    className="absolute inset-0 z-10 cursor-pointer rounded-[10px] outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-sticker-blue"
                  />
                </motion.article>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {createPortal(
        <AnimatePresence>
          {active && (
            <ProjectModal key={active.id} project={active} tone={toneOf(active)} onClose={close} />
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
