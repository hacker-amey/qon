"use client";

import React from "react";
import { PipelineStageId, PipelineStageState, StageStatus } from "@/types/pipeline";
import {
  Lightbulb,
  BrainCircuit,
  Sparkles,
  FileText,
  Film,
  Image as ImageIcon,
  Mic,
  Video,
  ShieldCheck,
  CheckCircle,
  Clock,
  Check,
  AlertCircle,
  RotateCw,
} from "lucide-react";

interface PipelineVisualizerProps {
  stages: PipelineStageState[];
  currentStageId?: PipelineStageId;
  totalElapsedMs?: number;
}

export function PipelineVisualizer({
  stages,
  currentStageId,
  totalElapsedMs = 9800,
}: PipelineVisualizerProps) {
  const getStageIcon = (id: PipelineStageId) => {
    switch (id) {
      case "idea":
        return Lightbulb;
      case "understand":
        return BrainCircuit;
      case "hook":
        return Sparkles;
      case "script":
        return FileText;
      case "scene_plan":
        return Film;
      case "visuals":
        return ImageIcon;
      case "voice":
        return Mic;
      case "edit":
        return Video;
      case "quality_check":
        return ShieldCheck;
      case "ready":
        return CheckCircle;
      default:
        return Sparkles;
    }
  };

  const getStatusBadge = (status: StageStatus) => {
    switch (status) {
      case "completed":
        return (
          <span className="flex items-center gap-1 text-[10px] font-mono font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
            <Check className="w-2.5 h-2.5" />
            COMPLETED
          </span>
        );
      case "processing":
        return (
          <span className="flex items-center gap-1 text-[10px] font-mono font-semibold text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded-full border border-cyan-400/50 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            PROCESSING
          </span>
        );
      case "regenerating":
        return (
          <span className="flex items-center gap-1 text-[10px] font-mono font-semibold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-500/30">
            <RotateCw className="w-2.5 h-2.5 animate-spin" />
            REGENERATING
          </span>
        );
      case "failed":
        return (
          <span className="flex items-center gap-1 text-[10px] font-mono font-semibold text-red-400 bg-red-950/60 px-2 py-0.5 rounded-full border border-red-500/30">
            <AlertCircle className="w-2.5 h-2.5" />
            FAILED
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-mono font-medium text-slate-500 bg-slate-900/60 px-2 py-0.5 rounded-full border border-white/5">
            QUEUED
          </span>
        );
    }
  };

  return (
    <div className="w-full glass-panel-glow rounded-2xl p-6 border border-purple-500/30">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              Live Orchestration Graph
            </span>
          </div>
          <h2 className="font-display text-2xl font-bold text-white mt-1">
            Autonomous Production Pipeline
          </h2>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 border border-white/10">
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            <span>Cycle Time: <strong className="text-white font-bold">{(totalElapsedMs / 1000).toFixed(1)}s</strong></span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Multi-Agent Sync: <strong className="text-cyan-400 font-bold">10 Stages</strong></span>
          </div>
        </div>
      </div>

      {/* Pipeline Grid Graph */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {stages.map((st, idx) => {
          const Icon = getStageIcon(st.id);
          const isProcessing = st.status === "processing";
          const isCompleted = st.status === "completed";

          return (
            <div
              key={st.id}
              className={`relative rounded-xl p-3.5 transition-all duration-300 flex flex-col justify-between ${
                isProcessing
                  ? "bg-purple-950/70 border-2 border-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.35)] scale-[1.02]"
                  : isCompleted
                  ? "bg-[#090D1A] border border-purple-500/25"
                  : "bg-[#060810]/60 border border-white/5 opacity-60"
              }`}
            >
              {/* Connector line on larger screens */}
              {idx < stages.length - 1 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-0.5 bg-gradient-to-r from-purple-500/50 to-transparent z-10" />
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      isProcessing
                        ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/50"
                        : isCompleted
                        ? "bg-purple-600/30 text-purple-300 border border-purple-500/40"
                        : "bg-white/5 text-slate-500"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  {getStatusBadge(st.status)}
                </div>

                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  Stage 0{idx + 1}
                </div>
                <h4 className="text-xs font-bold text-white mt-0.5 truncate">
                  {st.label}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-snug">
                  {st.description}
                </p>
              </div>

              {/* Progress and preview */}
              <div className="mt-3 pt-2 border-t border-white/5 flex flex-col gap-1.5">
                {st.previewSnippet && (
                  <div className="text-[10px] font-mono text-cyan-300 truncate bg-black/50 px-1.5 py-0.5 rounded border border-white/5">
                    {st.previewSnippet}
                  </div>
                )}

                <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 rounded-full ${
                      isProcessing
                        ? "bg-gradient-to-r from-purple-500 to-cyan-400"
                        : isCompleted
                        ? "bg-emerald-500"
                        : "bg-slate-800"
                    }`}
                    style={{ width: `${st.progress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
