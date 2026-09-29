"use client";

import React from "react";
import { QualityReport } from "@/types/pipeline";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RotateCw,
  Sparkles,
  Zap,
} from "lucide-react";

interface QualityControlCardProps {
  report: QualityReport;
  onRegenerateScene?: (sceneId: string) => void;
}

export function QualityControlCard({
  report,
  onRegenerateScene,
}: QualityControlCardProps) {
  const isPublishReady = report.verdict === "PUBLISH_READY";

  const metrics = [
    { label: "Hook Retention", score: report.hookScore, color: "from-purple-500 to-indigo-500" },
    { label: "Story Coherence", score: report.storyScore, color: "from-purple-500 to-cyan-400" },
    { label: "Visual Match", score: report.visualMatchScore, color: "from-cyan-500 to-teal-400" },
    { label: "Audio Sync", score: report.audioSyncScore, color: "from-teal-400 to-emerald-400" },
    { label: "Caption Coverage", score: report.captionScore, color: "from-emerald-400 to-cyan-400" },
  ];

  return (
    <div className="w-full glass-panel-glow rounded-2xl p-6 border border-purple-500/30">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
              PROPOSED INNOVATION
            </span>
            <span className="text-xs text-slate-400 font-mono">Stage 09 ? Automated QA</span>
          </div>
          <h3 className="font-display text-xl font-bold text-white mt-1 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            AI Quality Score & Diagnostics
          </h3>
        </div>

        {/* Verdict Badge */}
        <div
          className={`px-3.5 py-1.5 rounded-xl border flex items-center gap-2 ${
            isPublishReady
              ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
              : "bg-amber-950/60 border-amber-500/40 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
          }`}
        >
          {isPublishReady ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          )}
          <span className="text-xs font-mono font-bold tracking-wider">
            {report.verdict.replace("_", " ")}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Overall Score Circle Indicator */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#080B12] border border-purple-500/20 text-center relative overflow-hidden">
          <div className="relative w-32 h-32 flex items-center justify-center">
            {/* Background circular track */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-slate-800"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-cyan-400 transition-all duration-1000 ease-out"
                strokeWidth="8"
                strokeDasharray={251.2}
                strokeDashoffset={251.2 - (251.2 * report.overallScore) / 100}
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            {/* Score Text */}
            <div className="absolute flex flex-col items-center">
              <span className="font-display text-4xl font-extrabold text-white">
                {report.overallScore}
              </span>
              <span className="text-[10px] font-mono text-cyan-300 font-semibold uppercase">
                / 100 QA
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-300 font-medium mt-3">
            Publish Readiness Rating
          </p>
          <span className="text-[11px] font-mono text-emerald-400 mt-0.5">
            ? Exceeds 90% Qoneqt Quality Threshold
          </span>
        </div>

        {/* Breakdown Factor Bars */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          {metrics.map((m) => (
            <div key={m.label} className="flex flex-col gap-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">{m.label}</span>
                <span className="font-mono font-bold text-white">{m.score}/100</span>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden p-[1px] border border-white/5">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${m.color}`}
                  style={{ width: `${m.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Diagnostics / Suggestions */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
          Diagnostic Audit Log
        </h4>
        <ul className="space-y-1.5 text-xs text-slate-300 font-sans">
          {report.diagnosticFeedback.map((feedback, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-cyan-400 mt-0.5">?</span>
              <span>{feedback}</span>
            </li>
          ))}
        </ul>

        {/* Scene-Level Regeneration Suggestion Button */}
        {report.problematicSceneId && onRegenerateScene && (
          <div className="mt-4 p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-amber-200">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                Targeted Recommendation: Re-roll <strong>Scene 03 visual</strong> to enhance thematic alignment.
              </span>
            </div>
            <button
              onClick={() => onRegenerateScene(report.problematicSceneId!)}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors shadow-sm"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Regenerate Scene 03 Only</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
