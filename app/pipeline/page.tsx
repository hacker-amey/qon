"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
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
  Cpu,
  Layers,
  ArrowRight,
  ShieldAlert,
  RotateCw,
  GitBranch,
} from "lucide-react";

export default function PipelinePage() {
  const [selectedStageIndex, setSelectedStageIndex] = useState(0);

  const stages = [
    {
      id: "idea",
      title: "1. Idea Ingestion",
      icon: Lightbulb,
      tagline: "Prompt, Topic, or Trend Normalization",
      description:
        "Accepts open-ended queries, scientific prompts, cultural trends, or creative thoughts. Normalizes intent and prepares contextual embeddings.",
      provider: "OpenAI GPT-4o / Gemini 2.0 / Demo Intent Parser",
      input: "Raw string: 'Why do humans dream?'",
      output: "Normalized Topic Entity & Metadata Vector",
      latency: "320ms",
      innovations: "Semantic gap detection & trend velocity matching",
    },
    {
      id: "understand",
      title: "2. Content Genome",
      icon: BrainCircuit,
      tagline: "Proprietary Structured Production DNA",
      description:
        "Transforms abstract topics into a deterministic Content Genome configuration object tracking audience, tone, duration, visual style, pacing, and target CTA.",
      provider: "CreatorX Content Genome Compiler",
      input: "Normalized Topic Entity",
      output: "Structured ContentGenome JSON (11 parameters)",
      latency: "450ms",
      innovations: "CreatorX Content Genome Standard",
    },
    {
      id: "hook",
      title: "3. AI Creative Director",
      icon: Sparkles,
      tagline: "Hook Battle: Curiosity, Clarity, & Engagement",
      description:
        "Simulates a competitive writer's room. Synthesizes 3 competing opening hooks, predicts 3-second social retention probability, and selects the optimal angle.",
      provider: "LLM Provider Abstraction + Viral Retention Heuristics",
      input: "Topic & Content Genome",
      output: "3 Scored Candidate Hooks with Winner Selection",
      latency: "820ms",
      innovations: "Hook Battle Retention Scoring System",
    },
    {
      id: "script",
      title: "4. Script Engine",
      icon: FileText,
      tagline: "4-Act Social Storytelling Architecture",
      description:
        "Generates a mathematically balanced script adhering to short-form virality rules: Hook (0-4s), Body (4-22s), Payoff (22-27s), and CTA (27-30s).",
      provider: "Script Optimization Engine",
      input: "Winning Hook & Content Genome",
      output: "Timecoded 4-Act Script with 140 WPM Cadence",
      latency: "1150ms",
      innovations: "Word-cadence synchronization against timecode constraints",
    },
    {
      id: "scene_plan",
      title: "5. Scene Planner",
      icon: Film,
      tagline: "Automated Camera Motion & Visual Framing",
      description:
        "Directs 4 cinematic beats on a timeline. Formats precise visual prompts, specifies camera dynamics (slow push-in, orbital rotate, macro sweep), and assigns voice narration.",
      provider: "Visual Scene Storyboarder",
      input: "4-Act Production Script",
      output: "4 Directed Scene Objects with 9:16 Framing Specifications",
      latency: "980ms",
      innovations: "Camera kinetic direction matching narrative intensity",
    },
    {
      id: "visuals",
      title: "6. Multimodal Generation",
      icon: ImageIcon,
      tagline: "High-Resolution Visual Synthesis Layer",
      description:
        "Routes scene prompts through multimodal image and video models. Incorporates fallback providers if rate limits or latency thresholds are breached.",
      provider: "Runware / Flux / Midjourney / Curated Demo Fallback",
      input: "Scene Visual Prompts & Style Tokens",
      output: "4 1080x1920 High-Contrast Visual Media Assets",
      latency: "2400ms",
      innovations: "Dynamic Fallback Asset Orchestration",
    },
    {
      id: "voice",
      title: "7. Voice Engine",
      icon: Mic,
      tagline: "Acoustic Speech Synthesis & Waveform Sync",
      description:
        "Generates high-clarity voiceover tracks, measures phoneme durations, synthesizes waveform visualizer data, and prepares ducking markers for background music.",
      provider: "ElevenLabs / OpenAI Audio / Web Audio Speech Synthesizer",
      input: "Full Narration Script & Voice Style",
      output: "WAV Audio Track & 48-Point Normalized Waveform Vector",
      latency: "1600ms",
      innovations: "Sub-frame acoustic synchronization & voice ducking curve",
    },
    {
      id: "edit",
      title: "8. Video Composition",
      icon: Video,
      tagline: "Deterministic 9:16 Vertical Composition",
      description:
        "Assembles visual media, Ken Burns continuous zoom motions, kinetic word-highlighted captions, crossfades, ambient soundtrack, and branded end card into 1080x1920 MP4.",
      provider: "Remotion + Canvas Compositor Engine",
      input: "Visual Assets, Voiceover, Captions, BGM, Brand Assets",
      output: "1080x1920 Master Social MP4 / WebM Cut",
      latency: "2800ms",
      innovations: "Deterministic sub-pixel kinetic typography rendering",
    },
    {
      id: "quality_check",
      title: "9. AI Quality Control",
      icon: ShieldCheck,
      tagline: "Multi-Factor QA & Scene-Level Diagnostics",
      description:
        "Audits the final production against 5 core criteria: Hook Retention, Story Coherence, Visual Relevance, Audio Sync, and Caption Accuracy. Flags issues for targeted repair.",
      provider: "CreatorX Quality Assessment Model",
      input: "Finished Composition & Storyboard Blueprint",
      output: "Multi-factor Score (0-100) & Targeted Regeneration Flag",
      latency: "750ms",
      innovations: "Targeted Scene-Level Regeneration without full re-roll",
    },
    {
      id: "ready",
      title: "10. Qoneqt Global Feed",
      icon: CheckCircle,
      tagline: "Distribution Gateway & CDN Sync",
      description:
        "Packages cryptographic feed metadata, SEO hashtags, video thumbnail, and feeds into the Qoneqt Global Discovery network.",
      provider: "Qoneqt Global Distribution Gateway",
      input: "Finished 9:16 Video & Publication Metadata",
      output: "Live Post on Qoneqt Global Feed",
      latency: "200ms",
      innovations: "1-Click Direct Feed Synchronization",
    },
  ];

  const currentStage = stages[selectedStageIndex];
  const CurrentIcon = currentStage.icon;

  return (
    <div className="min-h-screen bg-[#05060A] text-[#F8FAFC] flex flex-col bg-cyber-grid bg-radial-glow">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-10">
        {/* Header */}
        <section className="text-center max-w-3xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-mono mb-4">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Architecture & Orchestration Engine</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white">
            The Autonomous <br />
            <span className="bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">
              10-Stage Production Pipeline
            </span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            Qoneqt CreatorX is not a simple "prompt-to-video" generator. It is a full-stack, multi-agent media production engine orchestrating specialized AI systems from raw concept to global feed.
          </p>
        </section>

        {/* Stage Navigation Track */}
        <section className="glass-panel-glow rounded-2xl p-4 border border-purple-500/30 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[800px] gap-2">
            {stages.map((st, idx) => {
              const Icon = st.icon;
              const isSelected = idx === selectedStageIndex;
              return (
                <button
                  key={st.id}
                  onClick={() => setSelectedStageIndex(idx)}
                  className={`flex-1 flex flex-col items-center p-3 rounded-xl transition-all ${
                    isSelected
                      ? "bg-purple-600/30 border border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)] text-white scale-105"
                      : "bg-[#080B12]/80 border border-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-1.5 ${isSelected ? "text-cyan-400" : ""}`} />
                  <span className="text-[10px] font-mono uppercase tracking-wider">
                    0{idx + 1}
                  </span>
                  <span className="text-xs font-bold truncate max-w-[85px]">
                    {st.title.split(". ")[1]}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Selected Stage Deep-Dive */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Inspection Card */}
          <div className="lg:col-span-8 glass-panel-glow rounded-3xl p-6 sm:p-8 border border-purple-500/30">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 p-0.5 shadow-lg">
                  <div className="w-full h-full bg-[#05060A] rounded-[14px] flex items-center justify-center">
                    <CurrentIcon className="w-6 h-6 text-cyan-400" />
                  </div>
                </div>
                <div>
                  <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider">
                    Stage Specification 0{selectedStageIndex + 1} of 10
                  </span>
                  <h2 className="font-display text-2xl font-bold text-white">
                    {currentStage.title}
                  </h2>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
                Latency: ~{currentStage.latency}
              </span>
            </div>

            <div className="flex flex-col gap-6 text-sm">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1">
                  Functional Purpose
                </h4>
                <p className="text-slate-200 leading-relaxed font-normal">
                  {currentStage.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#080B12] border border-white/10">
                  <span className="text-[11px] font-mono text-slate-400 block mb-1">
                    INPUT PAYLOAD
                  </span>
                  <code className="text-xs text-purple-300 font-mono">
                    {currentStage.input}
                  </code>
                </div>

                <div className="p-4 rounded-xl bg-[#080B12] border border-white/10">
                  <span className="text-[11px] font-mono text-slate-400 block mb-1">
                    OUTPUT CONTRACT
                  </span>
                  <code className="text-xs text-cyan-300 font-mono">
                    {currentStage.output}
                  </code>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block">
                    PROVIDER ABSTRACTION
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {currentStage.provider}
                  </span>
                </div>
                <span className="text-xs font-mono text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-500/30">
                  Pluggable
                </span>
              </div>

              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30">
                <span className="text-[11px] font-mono text-cyan-400 block font-bold mb-1">
                  PROPOSED CREATORX INNOVATION
                </span>
                <p className="text-xs text-slate-300">
                  {currentStage.innovations}
                </p>
              </div>
            </div>
          </div>

          {/* Fault Tolerance & Reliability Architecture */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="glass-panel rounded-2xl p-6 border border-purple-500/20">
              <h3 className="font-display text-lg font-bold text-white mb-2 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                Resilience & Fallbacks
              </h3>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Section 15 of the specification mandates robust failure handling:
              </p>

              <div className="flex flex-col gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#080B12] border border-white/10">
                  <strong className="text-white block font-mono text-[11px]">
                    1. 3-Attempt Exponential Backoff
                  </strong>
                  <span className="text-slate-400 mt-0.5 block">
                    Transient API errors are retried with jitter before escalating.
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#080B12] border border-white/10">
                  <strong className="text-cyan-300 block font-mono text-[11px]">
                    2. Secondary Fallback Providers
                  </strong>
                  <span className="text-slate-400 mt-0.5 block">
                    If Gemini is rate limited, traffic fails over automatically to Llama-3 / Claude.
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#080B12] border border-white/10">
                  <strong className="text-purple-300 block font-mono text-[11px]">
                    3. Scene-Level Regeneration
                  </strong>
                  <span className="text-slate-400 mt-0.5 block">
                    A single failing visual scene re-rolls without discarding the other 3 scenes.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
