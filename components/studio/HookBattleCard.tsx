"use client";

import React from "react";
import { HookOption } from "@/types/pipeline";
import { Trophy, Sparkles, CheckCircle2, RotateCw } from "lucide-react";

interface HookBattleCardProps {
  hooks: HookOption[];
  selectedHookId: string;
  onSelectHook: (hookId: string) => void;
  onRegenerateHooks?: () => void;
}

export function HookBattleCard({
  hooks,
  selectedHookId,
  onSelectHook,
  onRegenerateHooks,
}: HookBattleCardProps) {
  return (
    <div className="w-full glass-panel-glow rounded-2xl p-6 border border-purple-500/30">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
              PROPOSED INNOVATION
            </span>
            <span className="text-xs text-slate-400 font-mono">Stage 03 ? AI Creative Director</span>
          </div>
          <h3 className="font-display text-xl font-bold text-white mt-1 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            Hook Battle
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            The AI Creative Director pitted 3 competing narrative angles against viral retention benchmarks.
          </p>
        </div>

        {onRegenerateHooks && (
          <button
            onClick={onRegenerateHooks}
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium flex items-center gap-1.5 border border-white/10 transition-colors self-start"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Reroll Hooks</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {hooks.map((hook, idx) => {
          const isSelected = hook.id === selectedHookId;
          const isHighest = idx === 0 || hook.curiosity >= 95;

          return (
            <div
              key={hook.id}
              onClick={() => onSelectHook(hook.id)}
              className={`relative cursor-pointer rounded-xl p-4 transition-all duration-300 flex flex-col justify-between ${
                isSelected
                  ? "bg-purple-950/50 border-2 border-purple-500 shadow-[0_0_25px_rgba(139,92,246,0.3)] scale-[1.02]"
                  : "bg-[#080B12]/80 border border-white/10 hover:border-purple-500/40 hover:bg-[#0D1020]/90"
              }`}
            >
              {isHighest && (
                <div className="absolute -top-3 left-4 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-purple-600 text-white text-[10px] font-bold flex items-center gap-1 shadow-md">
                  <Trophy className="w-3 h-3" />
                  <span>CREATIVE DIRECTOR PICK</span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mt-1 mb-2">
                  <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider">
                    {hook.title}
                  </span>
                  <div className="flex items-center gap-1">
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
                    )}
                  </div>
                </div>

                <blockquote className="text-sm font-semibold text-white mb-3 leading-snug">
                  "{hook.text}"
                </blockquote>

                <p className="text-[11px] text-slate-400 italic mb-4">
                  {hook.rationale}
                </p>
              </div>

              {/* Metrics */}
              <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                <div>
                  <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                    <span>Curiosity Gap</span>
                    <span className="font-mono text-cyan-400 font-bold">{hook.curiosity}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
                      style={{ width: `${hook.curiosity}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                    <span>Clarity</span>
                    <span className="font-mono text-purple-300 font-bold">{hook.clarity}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: `${hook.clarity}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                    <span>Engagement Potential</span>
                    <span className="font-mono text-emerald-400 font-bold">{hook.engagement}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${hook.engagement}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
