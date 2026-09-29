"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { INITIAL_ASSETS } from "@/lib/demo/sampleData";
import { AssetRecord } from "@/types/pipeline";
import {
  FolderKanban,
  Image as ImageIcon,
  Video,
  Mic,
  Music,
  FileText,
  Film,
  Download,
  ExternalLink,
  Eye,
  Filter,
} from "lucide-react";

export default function AssetsPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedAsset, setSelectedAsset] = useState<AssetRecord | null>(null);

  const tabs = [
    { id: "all", label: "All Assets", icon: FolderKanban },
    { id: "image", label: "Generated Images", icon: ImageIcon },
    { id: "video", label: "Generated Videos", icon: Video },
    { id: "audio", label: "Voiceovers & Music", icon: Mic },
    { id: "script", label: "Scripts", icon: FileText },
    { id: "final_video", label: "Final 9:16 Cuts", icon: Film },
  ];

  const filteredAssets = INITIAL_ASSETS.filter((ast) => {
    if (activeTab === "all") return true;
    if (activeTab === "audio") return ast.type === "audio";
    return ast.type === activeTab;
  });

  return (
    <div className="min-h-screen bg-[#05060A] text-[#F8FAFC] flex flex-col bg-cyber-grid bg-radial-glow">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
                Media Repository
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">
                {INITIAL_ASSETS.length} Artifacts
              </span>
            </div>
            <h1 className="font-display text-3xl font-bold text-white mt-1">
              Asset Library
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Deterministic media cache, synthesized voice tracks, scripts, and rendered vertical social videos.
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)] border border-cyan-400/50"
                    : "bg-[#080B12] text-slate-400 hover:text-white border border-white/10 hover:border-purple-500/30"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Asset Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              onClick={() => setSelectedAsset(asset)}
              className="glass-panel group rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:shadow-[0_0_25px_rgba(139,92,246,0.2)]"
            >
              {/* Media Preview or Icon Header */}
              {asset.type === "image" || asset.type === "final_video" ? (
                <div className="relative aspect-[9/10] w-full overflow-hidden bg-black/60">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset.url}
                    alt={asset.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080B12] via-transparent to-black/50" />
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-black/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                    {asset.format}
                  </span>
                </div>
              ) : (
                <div className="relative aspect-[9/10] w-full bg-[#080B12] flex flex-col items-center justify-center p-6 border-b border-white/5">
                  <div className="w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center mb-3">
                    {asset.type === "audio" ? (
                      <Mic className="w-8 h-8 text-cyan-400" />
                    ) : (
                      <FileText className="w-8 h-8 text-purple-400" />
                    )}
                  </div>
                  <span className="text-xs font-mono text-purple-300 font-semibold">
                    {asset.format}
                  </span>
                </div>
              )}

              {/* Details */}
              <div className="p-4 flex flex-col justify-between flex-1 gap-3">
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                    <span>{asset.type.toUpperCase()}</span>
                    {asset.sceneNumber && (
                      <span className="text-cyan-400">Scene 0{asset.sceneNumber}</span>
                    )}
                  </div>
                  <h3 className="text-xs font-bold text-white line-clamp-2 leading-snug">
                    {asset.title}
                  </h3>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-mono">
                    {asset.sizeBytes ? `${(asset.sizeBytes / 1000000).toFixed(1)} MB` : "JSON"}
                  </span>
                  <button className="text-purple-400 hover:text-cyan-300 font-semibold flex items-center gap-1 transition-colors">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Preview Modal */}
        {selectedAsset && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="w-full max-w-lg glass-panel-glow rounded-3xl p-6 border border-purple-500/40 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <h3 className="font-display text-base font-bold text-white truncate max-w-xs">
                  {selectedAsset.title}
                </h3>
                <button
                  onClick={() => setSelectedAsset(null)}
                  className="text-slate-400 hover:text-white"
                >
                  ?
                </button>
              </div>

              {selectedAsset.type === "image" && (
                <div className="rounded-xl overflow-hidden aspect-[9/14] max-h-96 w-full mx-auto mb-4 bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedAsset.url}
                    alt={selectedAsset.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="flex flex-col gap-2 text-xs font-mono text-slate-300 bg-[#080B12] p-4 rounded-xl border border-white/5 mb-4">
                <div className="flex justify-between">
                  <span className="text-slate-500">Asset ID:</span>
                  <span className="text-white">{selectedAsset.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Format:</span>
                  <span className="text-cyan-300">{selectedAsset.format}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tags:</span>
                  <span className="text-purple-300">{selectedAsset.tags.join(", ")}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedAsset(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium"
                >
                  Close
                </button>
                <a
                  href={selectedAsset.url}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Raw Asset</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
