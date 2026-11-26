import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, X } from "lucide-react";
import ProjectCover from "./ProjectCover";
import { statusStyles } from "../data/projects";

const chip = "rounded border-2 border-fg px-2 py-0.5 font-mono text-[11px] font-bold text-fg";
const action =
  "btn-press inline-flex items-center gap-2 rounded-md border-2 border-fg px-4 py-2 text-sm font-bold transition-[translate] hover:-translate-y-0.5";

const heading = "mt-6 font-mono text-[11px] font-bold uppercase tracking-widest text-muted";

// `teks` di antara backtick jadi <code>
const withCode = (text) =>
  text.split("`").map((part, i) =>
    i % 2 ? (
      <code key={i} className="rounded bg-chip px-1 font-mono text-[0.9em] text-fg">
        {part}
      </code>
    ) : (
      part
    )
  );

function DetailList({ title, items }) {
  if (!items?.length) return null;

  return (
    <>
      <p className={heading}>{title}</p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-soft marker:text-fg">
        {items.map((item) => (
          <li key={item}>{withCode(item)}</li>
        ))}
      </ul>
    </>
  );
}

export default function ProjectModal({ project, tone, onClose }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    // kunci scroll halaman, tanpa membuat layout bergeser karena scrollbar hilang
    const { body, documentElement } = document;
    const scrollbar = window.innerWidth - documentElement.clientWidth;
    const prev = { overflow: body.style.overflow, paddingRight: body.style.paddingRight };
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      // fokus tetap di dalam modal
      const items = panelRef.current?.querySelectorAll("a[href], button:not([disabled])");
      if (!items?.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      body.style.overflow = prev.overflow;
      body.style.paddingRight = prev.paddingRight;
    };
  }, [onClose]);

  const meta = [project.year, project.role].filter(Boolean);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div
        className="absolute inset-0 bg-black/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      />

      <motion.div
        ref={panelRef}
        layoutId={`project-${project.id}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
        style={{ borderRadius: 12 }}
        className="relative flex max-h-[calc(100dvh-2rem)] w-full max-w-2xl flex-col overflow-hidden border-2 border-fg bg-surface shadow-[8px_8px_0_var(--color-fg)]"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="btn-press absolute right-3 top-10 z-10 grid h-9 w-9 place-items-center rounded-full border-2 border-fg bg-sticker-yellow text-fg shadow-[2px_2px_0_var(--color-fg)] outline-none focus-visible:ring-4 focus-visible:ring-sticker-blue"
        >
          <X size={16} />
        </button>

        <div className="overflow-y-auto">
          <motion.div
            layoutId={`cover-${project.id}`}
            className="border-b-2 border-fg"
          >
            <ProjectCover project={project} tone={tone} />
          </motion.div>

          <motion.div
            className="p-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className={`${chip} ${statusStyles[project.status]}`}>{project.status}</span>
              <span className={`${chip} bg-chip`}>{project.category}</span>
              {meta.map((m) => (
                <span key={m} className="font-mono text-[11px] text-soft">
                  {m}
                </span>
              ))}
            </div>

            <h3
              id="project-modal-title"
              className="mt-4 font-display text-2xl md:text-3xl font-bold leading-tight text-fg"
            >
              {project.title}
            </h3>

            <p className="mt-3 leading-relaxed text-soft">{project.longDesc || project.desc}</p>

            <DetailList title="$ cat fitur-utama.txt" items={project.features} />
            <DetailList title="$ cat sorotan-teknis.txt" items={project.highlights} />

            <p className={heading}>$ cat stack.txt</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-md border-2 border-fg bg-chip px-2.5 py-1 text-sm font-semibold text-fg"
                >
                  {t}
                </span>
              ))}
            </div>

            {(project.link || project.repo) && (
              <div className="mt-7 flex flex-wrap gap-3">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className={`${action} bg-fg text-bg shadow-[3px_3px_0_#F7C948]`}
                  >
                    Visit <ArrowUpRight size={14} />
                  </a>
                )}
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    className={`${action} bg-chip text-fg shadow-[3px_3px_0_var(--color-fg)]`}
                  >
                    <Github size={14} /> Source
                  </a>
                )}
              </div>
            )}

            {project.credit && <p className="mt-6 text-xs text-muted">{project.credit}</p>}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
