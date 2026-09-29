"use client";

import React, { useState } from "react";
import { Scene } from "@/types/pipeline";
import {
  Film,
  Camera,
  RotateCw,
  Eye,
  Sliders,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

interface SceneTimelineProps {
  scenes: Scene[];
  activeSceneIndex?: number;
  onSelectScene?: (index: number) => void;
  onRegenerateScene: (sceneId: string, customPrompt?: string) => Promise<void>;
}

export function SceneTimeline({
  scenes,
  activeSceneIndex = 0,
  onSelectScene,
  onRegenerateScene,
}: SceneTimelineProps) {
  const [selectedSceneForEdit, setSelectedSceneForEdit] = useState<Scene | null>(null);
  const [customPrompt, setCustomPrompt] = useState("");
  const [isRegeneratingId, setIsRegeneratingId] = useState<string | null>(null);

  const handleTriggerRegenerate = async (sceneId: string, prompt?: string) => {
    setIsRegeneratingId(sceneId);
    try {
      await onRegenerateScene(sceneId, prompt);
    } finally {
      setIsRegeneratingId(null);
      setSelectedSceneForEdit(null);
    }
  };

  return (
    <div className="w-full glass-panel rounded-2xl p-6 border border-purple-500/20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-cyan-400 font-mono font-semibold uppercase">
              Stage 05 ? Scene Planner
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 font-mono">
              4 Directed Cinematic Beats
            </span>
          </div>
          <h3 className="font-display text-xl font-bold text-white mt-1 flex items-center gap-2">
            <Film className="w-5 h-5 text-cyan-400" />
            Visual Timeline & Scene Director
          </h3>
        </div>

        <p className="text-xs text-slate-400 font-mono self-start sm:self-center">
          Click any scene to inspect or regenerate individual visual assets
        </p>
      </div>

      {/* Timeline Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {scenes.map((scene, idx) => {
          const isActive = idx === activeSceneIndex;
          const isRegenerating = isRegeneratingId === scene.id;

          return (
            <div
              key={scene.id}
              onClick={() => onSelectScene && onSelectScene(idx)}
              className={`group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                isActive
                  ? "ring-2 ring-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)] bg-purple-950/30"
                  : "border border-white/10 hover:border-purple-500/40 bg-[#080B12]/90"
              }`}
            >
              {/* Media Thumbnail */}
              <div className="relative aspect-[9/10] w-full overflow-hidden bg-black/60">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={scene.mediaUrl}
                  alt={scene.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080B12] via-transparent to-black/60" />

                {/* Scene badge */}
                <div className="absolute top-2 left-2 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-black/80 text-white border border-white/20 backdrop-blur-md">
                    0{scene.sceneNumber}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-600/80 text-white backdrop-blur-md">
                    {scene.purpose}
                  </span>
                </div>

                {/* Duration marker */}
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-mono bg-black/80 text-slate-300 border border-white/10 backdrop-blur-md">
                  {scene.startSec}s - {scene.endSec}s
                </div>

                {/* Camera direction */}
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] text-cyan-300 font-mono bg-black/80 backdrop-blur-md px-2 py-1 rounded border border-cyan-500/20">
                  <span className="flex items-center gap-1 truncate">
                    <Camera className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span className="truncate">{scene.camera}</span>
                  </span>
                  <span className="text-[10px] text-slate-400 shrink-0">
                    {scene.durationSec}s
                  </span>
                </div>

                {/* Loading indicator during single-scene regeneration */}
                {isRegenerating && (
                  <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-3 text-center z-10">
                    <span className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mb-2" />
                    <span className="text-xs font-mono text-cyan-300 font-semibold">
                      Regenerating Scene 0{scene.sceneNumber}...
                    </span>
                  </div>
                )}
              </div>

              {/* Scene Content Details */}
              <div className="p-3.5 flex flex-col flex-1 justify-between gap-3">
                <div>
                  <h4 className="text-sm font-semibold text-white truncate">
                    {scene.title}
                  </h4>
                  <p className="text-xs text-slate-300 line-clamp-2 mt-1">
                    "{scene.captionText}"
                  </p>
                </div>

                {/* Actions on Scene */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSceneForEdit(scene);
                      setCustomPrompt(scene.visualPrompt);
                    }}
                    className="text-[11px] font-medium text-slate-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                  >
                    <Sliders className="w-3 h-3" />
                    <span>Direct</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTriggerRegenerate(scene.id);
                    }}
                    disabled={isRegenerating}
                    className="px-2.5 py-1 rounded text-[11px] font-semibold bg-purple-600/30 hover:bg-purple-600/60 text-purple-200 border border-purple-500/30 flex items-center gap-1 transition-all disabled:opacity-50"
                    title="Regenerate this specific scene visual"
                  >
                    <RotateCw className="w-3 h-3" />
                    <span>Reroll Scene</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for In-depth Scene Prompt Directing */}
      {selectedSceneForEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg glass-panel-glow rounded-2xl p-6 border border-cyan-500/40 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                <h3 className="font-display text-lg font-bold text-white">
                  Direct Scene 0{selectedSceneForEdit.sceneNumber}: {selectedSceneForEdit.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedSceneForEdit(null)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ?
              </button>
            </div>

            <div className="flex flex-col gap-4 text-xs">
              <div>
                <label className="block text-slate-400 font-mono mb-1">
                  Narration & Caption Sync
                </label>
                <div className="p-3 bg-[#080B12] rounded-lg border border-white/10 text-slate-200 font-medium">
                  "{selectedSceneForEdit.voiceNarration}"
                </div>
              </div>

              <div>
                <label className="block text-cyan-400 font-mono mb-1">
                  Camera Motion Direction
                </label>
                <div className="p-2.5 bg-[#080B12] rounded-lg border border-cyan-500/30 text-cyan-200 font-mono">
                  {selectedSceneForEdit.camera} ? 9:16 Vertical Framing
                </div>
              </div>

              <div>
                <label className="block text-purple-300 font-mono mb-1">
                  Multimodal Visual Prompt
                </label>
                <textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  rows={4}
                  className="w-full bg-[#080B12] border border-purple-500/40 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-cyan-400 leading-relaxed font-sans"
                  placeholder="Describe exact visual, lighting, style and composition..."
                />
              </div>

              <div className="flex items-center justify-end gap-3 mt-2">
                <button
                  onClick={() => setSelectedSceneForEdit(null)}
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() =>
                    handleTriggerRegenerate(selectedSceneForEdit.id, customPrompt)
                  }
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-semibold flex items-center gap-2 shadow-lg"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Regenerate Scene Asset</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
