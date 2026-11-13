import React from "react";

export default function SectionTitle({ cmd, tone = "bg-sticker-green", children }) {
  return (
    <div className="mb-8">
      <span
        className={`inline-block -rotate-1 rounded-md border-2 border-fg px-2.5 py-1 font-mono text-xs font-bold text-fg shadow-[2px_2px_0_var(--color-fg)] ${tone}`}
      >
        {cmd}
      </span>
      <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold text-fg">
        {children}
      </h2>
    </div>
);
}