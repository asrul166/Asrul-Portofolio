import React from "react";
import { ArrowRight } from "lucide-react";
import SectionTitle from "./SectionTitle";
import { RevealItem } from "./Reveal";

const projects = [
  {
    title: "ERPNext Study Case — CV. Bangunan Jaya Makmur",
    desc: "Full ERPNext/Frappe v16 setup on WSL for a fictional construction materials store. Accounting, HR, buying/selling, and CRM modules configured; project module in progress. Includes Bahasa Indonesia localization.",
    tags: ["Frappe v16", "ERPNext", "WSL"],
    status: "in-progress",
    image: "ERP.png",
    link: "",
  },
  {
    title: "E-Shopper",
    desc: "E-Shopper is a web-based e-commerce application that allows users to browse products, manage shopping carts, and enjoy a seamless online shopping experience.",
    tags: ["HTML", "CSS", "Javascript"],
    status: "done",
    image: "E-Shopper.png",
    link: "",
  },
  {
    title: "WeatherApp",
    desc: "A real-time weather application that provides current weather conditions worldwide using the OpenWeather API.",
    tags: ["Flutter", "Dart", "Firebase"],
    status: "done",
    image: "",
    link: "",
  },
  {
    title: "SolvexaERP Content Pipeline",
    desc: "Instagram content and Reels for SolvexaERP — including a local Whisper AI setup for subtitle generation, feeding into a CapCut editing workflow.",
    tags: ["CapCut", "Whisper AI", "Content", "Canva", "Adobe Photoshop", "Instagram"],
    status: "ongoing",
    image: "",
    link: "",
  },
  {
    title: "AutoComm",
    desc: "AutoComm is a commission management application that simplifies commission calculations, tracks sales performance, and generates printable reports for businesses.",
    tags: ["ReactJS", "Tailwind CSS", "NodeJS", "PostgreSQL", "TypeScript"],
    status: "done",
    image: "AutoCommm.png",
    link: "",
  },
  {
    title: "SiMKS",
    desc: "SiMKS is a web-based cooperation agreement management system that streamlines document management, monitors agreement statuses, and provides automated expiration reminders and reporting.",
    tags: ["ReactJS", "Tailwind CSS", "NodeJS", "Express", "PostgreSQL", "TypeScript"],
    status: "in-progress",
    image: "",
    link: "",
  },
];

const statusStyles = {
  done: "bg-sticker-green",
  "in-progress": "bg-sticker-yellow",
  ongoing: "bg-sticker-orange",
};

const coverTones = [
  "bg-sticker-blue",
  "bg-sticker-pink",
  "bg-sticker-green",
  "bg-sticker-yellow",
  "bg-sticker-orange",
];

function Cover({ image, title, tone }) {
  if (image) {
    return (
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    );
  }
  return (
    <div className={`flex h-full w-full items-center justify-center ${tone}`}>
      <span className="font-display text-5xl font-bold text-blk">
        {title.slice(0, 2).toUpperCase()}
      </span>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects">
      <SectionTitle cmd="$ ls ./work" tone="bg-sticker-pink">
        Work Log
      </SectionTitle>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <RevealItem key={p.title} index={i} className="h-full">
            <article
              className="flex h-full flex-col overflow-hidden rounded-xl border-2 border-blk bg-white shadow-[5px_5px_0_#111] transition-transform hover:-translate-y-1"
            >
              <div className="aspect-video overflow-hidden border-b-2 border-blk bg-cream">
                <Cover image={p.image} title={p.title} tone={coverTones[i % coverTones.length]} />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <span
                  className={`self-start rounded border-2 border-blk px-2 py-0.5 font-mono text-[11px] font-bold text-blk ${statusStyles[p.status]}`}
                >
                  {p.status}
                </span>

                <h3 className="mt-3 text-lg font-extrabold leading-snug text-blk">{p.title}</h3>

                <p className="mt-2 text-sm leading-relaxed text-[#4A463C] line-clamp-3">
                  {p.desc}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-blk/30 bg-cream px-1.5 py-0.5 font-mono text-[11px] text-[#4A463C]"
                    >
                      #{t.replace(/\s+/g, "").toLowerCase()}
                    </span>
                  ))}
                </div>

                {p.link && (
                  <div className="mt-auto pt-5">
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-press inline-flex items-center gap-2 rounded-md border-2 border-blk bg-blk px-4 py-2 text-sm font-bold text-cream shadow-[3px_3px_0_#F7C948] transition-transform hover:-translate-y-0.5"
                    >
                      Details <ArrowRight size={14} />
                    </a>
                  </div>
                )}
              </div>
            </article>
          </RevealItem>
        ))}
      </div>
    </section>
  );
}