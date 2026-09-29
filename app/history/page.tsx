"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { INITIAL_PROJECT_HISTORY } from "@/lib/demo/sampleData";
import { Project } from "@/types/pipeline";
import {
  History,
  Play,
  RotateCw,
  Copy,
  ExternalLink,
  Clock,
  Sparkles,
  ShieldCheck,
  Radio,
} from "lucide-react";
import Link from "next/link";

export default function HistoryPage() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECT_HISTORY);

  const handleDuplicate = (project: Project) => {
    const duplicated: Project = {
      ...project,
      id: "proj_dup_" + Math.random().toString(36).substring(2, 7),
      title: `${project.title} (Copy)`,
      createdAt: "Just now",
    };
    setProjects([duplicated, ...projects]);
  };

  return (
    <div className="min-h-screen bg-[#05060A] text-[#F8FAFC] flex flex-col bg-cyber-grid bg-radial-glow">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">
                Production Archive
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">
                {projects.length} Saved Projects
              </span>
            </div>
            <h1 className="font-display text-3xl font-bold text-white mt-1">
              Project History & Rerolls
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Browse previously generated Qoneqt video pipelines, inspect quality audit logs, and trigger single-click rerolls.
            </p>
          </div>

          <Link
            href="/"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white text-xs font-semibold flex items-center gap-2 shadow-lg self-start"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Produce New Video</span>
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="glass-panel group rounded-3xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_0_30px_rgba(139,92,246,0.25)]"
            >
              {/* Media Thumbnail Header */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/60">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={proj.scenes[0]?.mediaUrl}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080B12] via-transparent to-black/60" />

                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 backdrop-blur-md">
                    ? READY
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/80 text-cyan-300 border border-white/10 backdrop-blur-md">
                    00:{proj.contentGenome.duration}
                  </span>
                </div>

                <div className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950/80 text-purple-300 border border-purple-500/30 backdrop-blur-md">
                  QA {proj.qualityReport.overallScore}/100
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-xs text-white font-medium truncate drop-shadow">
                  "{proj.script.hook.text}"
                </div>
              </div>

              {/* Body Content */}
              <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                    <span className="text-purple-400 font-semibold">{proj.contentGenome.tone.toUpperCase()}</span>
                    <span>{proj.createdAt.split("T")[0] || proj.createdAt}</span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-2 mt-1.5 leading-relaxed">
                    {proj.script.body.text}
                  </p>
                </div>

                {/* Metrics Pill */}
                <div className="grid grid-cols-3 gap-2 p-2 bg-[#080B12] rounded-xl border border-white/5 text-center font-mono text-[11px]">
                  <div>
                    <span className="text-slate-500 block text-[9px]">HOOK</span>
                    <strong className="text-cyan-400">{proj.qualityReport.hookScore}%</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[9px]">SCENES</span>
                    <strong className="text-white">{proj.scenes.length} Acts</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[9px]">SYNC</span>
                    <strong className="text-emerald-400">{proj.qualityReport.audioSyncScore}%</strong>
                  </div>
                </div>

                {/* Actions Row */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                  <Link
                    href={`/?id=${proj.id}`}
                    className="flex-1 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600/60 text-purple-200 text-xs font-semibold flex items-center justify-center gap-1.5 border border-purple-500/30 transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Studio Preview</span>
                  </Link>

                  <button
                    onClick={() => handleDuplicate(proj)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors"
                    title="Duplicate project"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
