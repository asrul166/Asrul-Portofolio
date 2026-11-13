import React from "react";
import { Play } from "lucide-react";

// Mockup dari div untuk proyek yang belum punya screenshot.
function PhoneMock() {
  return (
    <div className="flex h-full items-end justify-center px-4 pt-4">
      <div className="h-full w-24 rounded-t-2xl border-2 border-b-0 border-blk bg-white p-2">
        <div className="mx-auto h-1.5 w-8 rounded-full bg-blk" />
        <div className="mx-auto mt-3 h-9 w-9 rounded-full border-2 border-blk bg-sticker-yellow" />
        <div className="mx-auto mt-2 h-2 w-12 rounded-sm bg-blk" />
        <div className="mx-auto mt-1 h-1.5 w-8 rounded-sm bg-blk/30" />
        <div className="mt-3 grid grid-cols-3 gap-1">
          <div className="h-6 rounded-sm border-2 border-blk bg-sticker-blue" />
          <div className="h-6 rounded-sm border-2 border-blk bg-sticker-pink" />
          <div className="h-6 rounded-sm border-2 border-blk bg-sticker-green" />
        </div>
      </div>
    </div>
  );
}

function DashboardMock() {
  return (
    <div className="flex h-full gap-2 p-3">
      <div className="w-1/5 space-y-1.5 rounded-md border-2 border-blk bg-white p-1.5">
        <div className="h-2 rounded-sm bg-blk" />
        <div className="h-1.5 rounded-sm bg-blk/30" />
        <div className="h-1.5 rounded-sm bg-blk/30" />
        <div className="h-1.5 w-2/3 rounded-sm bg-blk/30" />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="grid grid-cols-3 gap-2">
          <div className="h-8 rounded-md border-2 border-blk bg-sticker-yellow" />
          <div className="h-8 rounded-md border-2 border-blk bg-sticker-green" />
          <div className="h-8 rounded-md border-2 border-blk bg-sticker-pink" />
        </div>
        <div className="flex-1 space-y-1.5 rounded-md border-2 border-blk bg-white p-2">
          <div className="h-1.5 w-1/3 rounded-sm bg-blk" />
          <div className="h-1.5 rounded-sm bg-blk/25" />
          <div className="h-1.5 rounded-sm bg-blk/25" />
          <div className="h-1.5 w-4/5 rounded-sm bg-blk/25" />
          <div className="h-1.5 w-3/5 rounded-sm bg-blk/25" />
        </div>
      </div>
    </div>
  );
}

function ReelsMock() {
  const tiles = [
    { c: "bg-sticker-yellow", r: "-rotate-6" },
    { c: "bg-white", r: "rotate-0" },
    { c: "bg-sticker-blue", r: "rotate-6" },
  ];
  return (
    <div className="flex h-full items-center justify-center gap-3 p-3">
      {tiles.map((t, i) => (
        <div
          key={i}
          className={`${t.c} ${t.r} grid h-[82%] max-h-44 aspect-[9/16] place-items-center rounded-lg border-2 border-blk shadow-[3px_3px_0_#111]`}
        >
          <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-blk bg-cream">
            <Play size={12} fill="#111" />
          </span>
        </div>
      ))}
    </div>
  );
}

const mocks = { Mobile: PhoneMock, Content: ReelsMock };

// Cover bergaya jendela browser: bar judul + screenshot / mockup.
export default function ProjectCover({ project, tone }) {
  const Mock = mocks[project.category] || DashboardMock;

  return (
    <div className="flex h-full w-full flex-col bg-chip">
      <div className="flex shrink-0 items-center gap-1.5 border-b-2 border-fg bg-chip px-3 py-1.5">
        <span className="h-2 w-2 rounded-full border-2 border-fg bg-sticker-pink" />
        <span className="h-2 w-2 rounded-full border-2 border-fg bg-sticker-yellow" />
        <span className="h-2 w-2 rounded-full border-2 border-fg bg-sticker-green" />
        <span className="ml-2 truncate font-mono text-[10px] font-bold text-soft">
          ~/work/{project.id}
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            role="img"
            aria-label={`${project.title} illustration`}
            className={`h-full w-full ${tone}`}
          >
            <Mock />
          </div>
        )}
      </div>
    </div>
  );
}
