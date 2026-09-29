"use client";

import React, { useState } from "react";
import { ScriptStructure } from "@/types/pipeline";
import {
  FileText,
  Clock,
  Sparkles,
  Minimize2,
  Maximize2,
  RotateCcw,
  Check,
  Edit3,
} from "lucide-react";

interface ScriptEditorProps {
  script: ScriptStructure;
  durationSec?: number;
  onUpdateScript: (updatedScript: ScriptStructure) => void;
  onRegenerateScript?: () => void;
}

export function ScriptEditor({
  script,
  durationSec = 30,
  onUpdateScript,
  onRegenerateScript,
}: ScriptEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedScript, setEditedScript] = useState<ScriptStructure>(script);

  const wordCount = script.fullScript.trim().split(/\s+/).length;
  const estimatedSeconds = Math.round((wordCount / 140) * 60);

  const handleSave = () => {
    onUpdateScript(editedScript);
    setIsEditing(false);
  };

  const handleShorten = () => {
    const shortened: ScriptStructure = {
      ...script,
      body: {
        ...script.body,
        text: script.body.text
          .split(".")
          .slice(0, 2)
          .join(".") + ".",
      },
    };
    shortened.fullScript = `${shortened.hook.text} ${shortened.body.text} ${shortened.payoff.text} ${shortened.cta.text}`;
    setEditedScript(shortened);
    onUpdateScript(shortened);
  };

  const handleExpand = () => {
    const expanded: ScriptStructure = {
      ...script,
      body: {
        ...script.body,
        text:
          script.body.text +
          " Furthermore, real-time observational data suggests this effect multiplies under deeper analysis.",
      },
    };
    expanded.fullScript = `${expanded.hook.text} ${expanded.body.text} ${expanded.payoff.text} ${expanded.cta.text}`;
    setEditedScript(expanded);
    onUpdateScript(expanded);
  };

  return (
    <div className="w-full glass-panel rounded-2xl p-6 border border-purple-500/20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-purple-400 font-mono font-semibold uppercase">
              Stage 04 ? Script Engine
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-purple-500/10 text-cyan-300 font-mono">
              4-Act Social Structure
            </span>
          </div>
          <h3 className="font-display text-xl font-bold text-white mt-1 flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-400" />
            Structured Production Script
          </h3>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center flex-wrap gap-2">
          <button
            onClick={handleShorten}
            className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium flex items-center gap-1 border border-white/10 transition-colors"
            title="Trim script for faster pacing"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            <span>Shorten</span>
          </button>
          <button
            onClick={handleExpand}
            className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium flex items-center gap-1 border border-white/10 transition-colors"
            title="Add cinematic depth"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Expand</span>
          </button>
          {onRegenerateScript && (
            <button
              onClick={onRegenerateScript}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium flex items-center gap-1 border border-white/10 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Regenerate</span>
            </button>
          )}
          <button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            {isEditing ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Save Edits</span>
              </>
            ) : (
              <>
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Script</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Script Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        {/* Act 1: Hook */}
        <div className="rounded-xl bg-[#080B12] p-4 border border-purple-500/20 relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              1. Hook
            </span>
            <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">
              {script.hook.timing} ({script.hook.durationSec}s)
            </span>
          </div>
          {isEditing ? (
            <textarea
              value={editedScript.hook.text}
              onChange={(e) =>
                setEditedScript({
                  ...editedScript,
                  hook: { ...editedScript.hook, text: e.target.value },
                })
              }
              rows={3}
              className="w-full bg-black/40 border border-purple-500/30 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
          ) : (
            <p className="text-sm font-medium text-slate-200 leading-relaxed">
              "{script.hook.text}"
            </p>
          )}
        </div>

        {/* Act 2: Body */}
        <div className="rounded-xl bg-[#080B12] p-4 border border-purple-500/20 relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              2. Body (Insight)
            </span>
            <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">
              {script.body.timing} ({script.body.durationSec}s)
            </span>
          </div>
          {isEditing ? (
            <textarea
              value={editedScript.body.text}
              onChange={(e) =>
                setEditedScript({
                  ...editedScript,
                  body: { ...editedScript.body, text: e.target.value },
                })
              }
              rows={3}
              className="w-full bg-black/40 border border-purple-500/30 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
          ) : (
            <p className="text-sm font-medium text-slate-200 leading-relaxed">
              "{script.body.text}"
            </p>
          )}
        </div>

        {/* Act 3: Payoff */}
        <div className="rounded-xl bg-[#080B12] p-4 border border-purple-500/20 relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              3. Payoff
            </span>
            <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">
              {script.payoff.timing} ({script.payoff.durationSec}s)
            </span>
          </div>
          {isEditing ? (
            <textarea
              value={editedScript.payoff.text}
              onChange={(e) =>
                setEditedScript({
                  ...editedScript,
                  payoff: { ...editedScript.payoff, text: e.target.value },
                })
              }
              rows={3}
              className="w-full bg-black/40 border border-purple-500/30 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
          ) : (
            <p className="text-sm font-medium text-slate-200 leading-relaxed">
              "{script.payoff.text}"
            </p>
          )}
        </div>

        {/* Act 4: CTA */}
        <div className="rounded-xl bg-[#080B12] p-4 border border-purple-500/20 relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              4. Call To Action
            </span>
            <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">
              {script.cta.timing} ({script.cta.durationSec}s)
            </span>
          </div>
          {isEditing ? (
            <textarea
              value={editedScript.cta.text}
              onChange={(e) =>
                setEditedScript({
                  ...editedScript,
                  cta: { ...editedScript.cta, text: e.target.value },
                })
              }
              rows={3}
              className="w-full bg-black/40 border border-purple-500/30 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
          ) : (
            <p className="text-sm font-medium text-slate-200 leading-relaxed">
              "{script.cta.text}"
            </p>
          )}
        </div>
      </div>

      {/* Footer teleprompter stats */}
      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
        <div className="flex items-center gap-4">
          <span>Words: <strong className="text-white">{wordCount}</strong></span>
          <span>Target Cadence: <strong className="text-cyan-400">140 WPM</strong></span>
          <span>Estimated Audio: <strong className="text-purple-300">{estimatedSeconds}s</strong></span>
        </div>
        <div className="flex items-center gap-1 text-slate-400">
          <Clock className="w-3.5 h-3.5 text-purple-400" />
          <span>Sync Target: {durationSec}s</span>
        </div>
      </div>
    </div>
  );
}
