import React from "react";
import SectionTitle from "./SectionTitle";
import { RevealItem } from "./Reveal";

const groups = [
  { label: "Languages", items: ["Java", "Python", "JavaScript", "HTML/CSS"] },
  { label: "Platforms", items: ["ERPNext / Frappe", "Android Studio", "Firebase"] },
  { label: "Data & AI", items: ["Google Colab", "SPSS", "ANN modeling"] },
  { label: "Tooling", items: ["Git", "WSL", "n8n", "CapCut"] },
];

const tones = ["bg-sticker-green", "bg-sticker-blue", "bg-sticker-pink", "bg-sticker-yellow"];

export default function Skills() {
  return (
    <section id="skills">
      <SectionTitle cmd="$ cat stack.json" tone="bg-sticker-blue">
        Stack
      </SectionTitle>

      <div className="grid sm:grid-cols-2 gap-6">
        {groups.map((g, i) => (
          <RevealItem key={g.label} index={i} className="h-full">
            <div className="h-full rounded-xl border-2 border-blk bg-white p-5 shadow-[4px_4px_0_#111]">
              <span
                className={`inline-block rounded border-2 border-blk px-2 py-0.5 font-mono text-[11px] font-bold tracking-wide text-blk ${tones[i % tones.length]}`}
              >
                {g.label.toUpperCase()}
              </span>
              <div className="mt-4 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border-2 border-blk bg-cream px-3 py-1.5 text-sm font-semibold text-blk"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </RevealItem>
        ))}
      </div>
    </section>
  );
}