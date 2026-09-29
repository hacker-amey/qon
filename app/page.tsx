"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { VideoPlayer916 } from "@/components/player/VideoPlayer916";
import { PipelineVisualizer } from "@/components/pipeline/PipelineVisualizer";
import { HookBattleCard } from "@/components/studio/HookBattleCard";
import { ScriptEditor } from "@/components/studio/ScriptEditor";
import { SceneTimeline } from "@/components/studio/SceneTimeline";
import { QualityControlCard } from "@/components/quality/QualityControlCard";
import { PublishModal } from "@/components/publish/PublishModal";
import {
  ContentGenome,
  DurationOption,
  LanguageOption,
  Project,
  PublishedPost,
  ScriptStructure,
  ToneOption,
  VisualStyleOption,
} from "@/types/pipeline";
import { PipelineOrchestrator } from "@/lib/pipeline/orchestrator";
import { SAMPLE_PROJECT_DREAMS } from "@/lib/demo/sampleData";
import {
  Sparkles,
  Zap,
  Play,
  RotateCw,
  Radio,
  Sliders,
  CheckCircle2,
  Cpu,
  Clock,
  Globe,
  Palette,
  Film,
  Dna,
  ArrowRight,
} from "lucide-react";

export default function StudioPage() {
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState<DurationOption>(30);
  const [tone, setTone] = useState<ToneOption>("curious");
  const [language, setLanguage] = useState<LanguageOption>("English");
  const [visualStyle, setVisualStyle] = useState<VisualStyleOption>("cinematic");

  const [project, setProject] = useState<Project | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeStageId, setActiveStageId] = useState<string>("idea");
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [showGenomeDrawer, setShowGenomeDrawer] = useState(false);

  const orchestrator = new PipelineOrchestrator();

  const samplePresets = [
    {
      title: "Why do humans dream?",
      desc: "Hero Neuroscience Sample",
      duration: 30 as DurationOption,
      tone: "curious" as ToneOption,
      style: "cinematic" as VisualStyleOption,
    },
    {
      title: "The Quantum Computing Paradox",
      desc: "Deep Tech & Computing",
      duration: 30 as DurationOption,
      tone: "cinematic" as ToneOption,
      style: "futuristic" as VisualStyleOption,
    },
    {
      title: "How Black Holes Warp Time",
      desc: "Cosmology & Relativity",
      duration: 30 as DurationOption,
      tone: "cinematic" as ToneOption,
      style: "cinematic" as VisualStyleOption,
    },
  ];

  // Instant Load for Judges
  const handleLoadInstantDemo = () => {
    setProject(SAMPLE_PROJECT_DREAMS);
    setTopic(SAMPLE_PROJECT_DREAMS.topic);
    setDuration(SAMPLE_PROJECT_DREAMS.contentGenome.duration);
    setTone(SAMPLE_PROJECT_DREAMS.contentGenome.tone);
    setLanguage(SAMPLE_PROJECT_DREAMS.contentGenome.language);
    setVisualStyle(SAMPLE_PROJECT_DREAMS.contentGenome.visualStyle);
  };

  // Run the full autonomous pipeline with live updates
  const handleGenerate = async (targetTopic = topic) => {
    const promptToUse = targetTopic.trim() || "Why do humans dream?";
    setIsGenerating(true);
    setProject(null);

    try {
      const generatedProject = await orchestrator.executeFullPipeline(
        promptToUse,
        {
          duration,
          tone,
          language,
          visualStyle,
        },
        (stageId, status, progress, message, preview) => {
          setActiveStageId(stageId);
        }
      );
      setProject(generatedProject);
    } finally {
      setIsGenerating(false);
    }
  };

  // Scene-level regeneration
  const handleRegenerateScene = async (sceneId: string, customPrompt?: string) => {
    if (!project) return;
    const updated = await orchestrator.regenerateSingleScene(project, sceneId, customPrompt);
    setProject(updated);
  };

  // Hook selection
  const handleSelectHook = (hookId: string) => {
    if (!project) return;
    const updatedHooks = project.hooks.map((h) => ({
      ...h,
      selected: h.id === hookId,
    }));
    const chosen = project.hooks.find((h) => h.id === hookId);
    setProject({
      ...project,
      hooks: updatedHooks,
      selectedHookId: hookId,
      script: {
        ...project.script,
        hook: {
          ...project.script.hook,
          text: chosen ? chosen.text : project.script.hook.text,
        },
      },
    });
  };

  const handleUpdateScript = (updatedScript: ScriptStructure) => {
    if (!project) return;
    setProject({
      ...project,
      script: updatedScript,
    });
  };

  const handlePublishComplete = (published: PublishedPost) => {
    if (!project) return;
    setProject({
      ...project,
      publishedPost: published,
      status: "published",
    });
  };

  return (
    <div className="min-h-screen bg-[#05060A] text-[#F8FAFC] flex flex-col bg-cyber-grid bg-radial-glow selection:bg-purple-500 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-10">
        {/* HERO HEADER */}
        {!project && !isGenerating && (
          <section className="text-center pt-8 pb-4 flex flex-col items-center">
            {/* Top pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-mono mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
              <span>Built for Qoneqt ? CTRL FREAK Challenge</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="text-slate-400">Autonomous Content Production</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-3xl leading-[1.1]">
              Your idea. <br />
              <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                Our AI production studio.
              </span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              Transform any topic, prompt, idea or trend into a publish-ready Qoneqt video through an autonomous 10-stage production pipeline.
            </p>

            {/* Quick Demo Pill Bar for Judges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <span className="text-xs font-mono text-slate-400 mr-1">
                Judge Fast-Track:
              </span>
              <button
                onClick={handleLoadInstantDemo}
                className="px-3.5 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-200 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:scale-105"
              >
                <Zap className="w-3.5 h-3.5 text-cyan-400 fill-current" />
                <span>Instant Load: "Why do humans dream?"</span>
              </button>
            </div>
          </section>
        )}

        {/* INPUT STUDIO CONFIGURATION CARD */}
        {!project && !isGenerating && (
          <section className="w-full max-w-4xl mx-auto glass-panel-glow rounded-3xl p-6 sm:p-8 border border-purple-500/30 shadow-[0_0_50px_rgba(139,92,246,0.2)]">
            {/* Input area */}
            <div className="flex flex-col gap-3">
              <label className="text-xs font-mono font-bold text-slate-300 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  DESCRIBE WHAT YOU WANT TO CREATE...
                </span>
                <span className="text-slate-400 font-normal">
                  Prompt, Topic, or Trend
                </span>
              </label>

              <div className="relative">
                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Why do humans dream?"
                  rows={3}
                  className="w-full bg-[#080B12]/90 border border-purple-500/30 rounded-2xl p-4 text-white text-base sm:text-lg focus:outline-none focus:border-cyan-400 placeholder:text-slate-600 shadow-inner font-sans leading-relaxed"
                />

                {/* Preset Chips */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {samplePresets.map((preset) => (
                    <button
                      key={preset.title}
                      type="button"
                      onClick={() => {
                        setTopic(preset.title);
                        setDuration(preset.duration);
                        setTone(preset.tone);
                        setVisualStyle(preset.style);
                      }}
                      className="px-3 py-1 rounded-lg bg-white/5 hover:bg-purple-600/20 text-slate-300 hover:text-cyan-300 text-xs font-medium border border-white/10 hover:border-purple-500/40 transition-all flex items-center gap-1.5"
                    >
                      <span>? {preset.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Controls Bar: Duration, Tone, Language, Visual Style */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
              {/* Duration */}
              <div>
                <label className="block text-[11px] font-mono font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-purple-400" />
                  DURATION
                </label>
                <div className="grid grid-cols-3 gap-1 bg-[#080B12] p-1 rounded-xl border border-white/10">
                  {([15, 30, 60] as DurationOption[]).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDuration(d)}
                      className={`py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                        duration === d
                          ? "bg-purple-600 text-white shadow-sm"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {d}s
                    </button>
                  ))}
                </div>
              </div>

              {/* Tone */}
              <div>
                <label className="block text-[11px] font-mono font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                  TONE
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value as ToneOption)}
                  className="w-full bg-[#080B12] border border-white/10 rounded-xl p-2 text-xs font-medium text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="cinematic">Cinematic</option>
                  <option value="educational">Educational</option>
                  <option value="curious">Curious</option>
                  <option value="inspirational">Inspirational</option>
                  <option value="news">News</option>
                  <option value="funny">Funny</option>
                </select>
              </div>

              {/* Language */}
              <div>
                <label className="block text-[11px] font-mono font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-indigo-400" />
                  LANGUAGE
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as LanguageOption)}
                  className="w-full bg-[#080B12] border border-white/10 rounded-xl p-2 text-xs font-medium text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Hinglish">Hinglish</option>
                </select>
              </div>

              {/* Visual Style */}
              <div>
                <label className="block text-[11px] font-mono font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-emerald-400" />
                  VISUAL STYLE
                </label>
                <select
                  value={visualStyle}
                  onChange={(e) => setVisualStyle(e.target.value as VisualStyleOption)}
                  className="w-full bg-[#080B12] border border-white/10 rounded-xl p-2 text-xs font-medium text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="cinematic">Cinematic</option>
                  <option value="futuristic">Futuristic</option>
                  <option value="3d">3D</option>
                  <option value="documentary">Documentary</option>
                  <option value="minimal">Minimal</option>
                </select>
              </div>
            </div>

            {/* Main CTA */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>Deterministic Remotion / Web Composition Engine Ready</span>
              </div>

              <button
                type="button"
                onClick={() => handleGenerate(topic || "Why do humans dream?")}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-display text-base font-extrabold tracking-wide flex items-center justify-center gap-2.5 shadow-[0_0_35px_rgba(139,92,246,0.6)] transition-all hover:scale-105 active:scale-95 group"
              >
                <Zap className="w-5 h-5 fill-current text-cyan-200 group-hover:rotate-12 transition-transform" />
                <span>? GENERATE VIDEO</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </section>
        )}

        {/* LIVE GENERATION STATUS OR ACTIVE PRODUCTION DASHBOARD */}
        {isGenerating && (
          <section className="w-full flex flex-col items-center py-12">
            <div className="w-full max-w-3xl glass-panel-glow rounded-3xl p-8 border border-purple-500/40 text-center flex flex-col items-center shadow-[0_0_60px_rgba(139,92,246,0.3)]">
              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 p-0.5 mb-6 shadow-[0_0_30px_rgba(139,92,246,0.8)]">
                <div className="w-full h-full bg-[#05060A] rounded-[14px] flex items-center justify-center">
                  <Sparkles className="w-9 h-9 text-cyan-400 animate-spin" />
                </div>
              </div>

              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-1">
                Autonomous Pipeline in Motion
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-2">
                Producing: "{topic || "Why do humans dream?"}"
              </h2>
              <p className="text-xs text-slate-300 max-w-md mb-6">
                Orchestrating Creative Director, Script Engine, Scene Planner, Multimodal Visuals, Voice Synthesis, and AI Quality Control...
              </p>

              <div className="w-full max-w-md bg-slate-900 rounded-full h-2 overflow-hidden border border-white/10 mb-3">
                <div className="h-full bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-400 w-full animate-pulse" />
              </div>
              <span className="text-[11px] font-mono text-purple-300">
                Active Stage: {activeStageId.toUpperCase()} ? Syncing Timecodes...
              </span>
            </div>
          </section>
        )}

        {/* FINISHED PROJECT DASHBOARD */}
        {project && !isGenerating && (
          <div className="flex flex-col gap-10">
            {/* Top Project Banner & Summary */}
            <section className="glass-panel-glow rounded-2xl p-6 border border-purple-500/30 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    READY TO PUBLISH
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    ID: {project.id}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Duration: {project.contentGenome.duration}s
                  </span>
                  <span className="text-xs text-purple-300 font-mono bg-purple-500/10 px-2 py-0.5 rounded">
                    {project.contentGenome.tone.toUpperCase()}
                  </span>
                  <span className="text-xs text-cyan-300 font-mono bg-cyan-500/10 px-2 py-0.5 rounded">
                    {project.contentGenome.visualStyle.toUpperCase()}
                  </span>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                  {project.title}
                </h2>
                <p className="text-xs text-slate-300 font-medium max-w-2xl">
                  "{project.script.hook.text}"
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center flex-wrap gap-3">
                <button
                  onClick={() => setShowGenomeDrawer(!showGenomeDrawer)}
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-white/10 transition-colors"
                >
                  <Dna className="w-4 h-4 text-purple-400" />
                  <span>Content Genome</span>
                </button>

                <button
                  onClick={() => handleGenerate(project.topic)}
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-white/10 transition-colors"
                >
                  <RotateCw className="w-4 h-4" />
                  <span>Regenerate All</span>
                </button>

                <button
                  onClick={() => setIsPublishModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-display text-xs font-extrabold flex items-center gap-2 shadow-[0_0_25px_rgba(139,92,246,0.6)] transition-all hover:scale-105 active:scale-95"
                >
                  <Radio className="w-4 h-4 fill-current" />
                  <span>PUBLISH TO QONEQT</span>
                </button>
              </div>
            </section>

            {/* Content Genome Drawer / Inspector */}
            {showGenomeDrawer && (
              <section className="glass-panel rounded-2xl p-6 border border-purple-500/20 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-2">
                    <Dna className="w-4 h-4 text-purple-400" />
                    <h4 className="font-display font-bold text-white text-sm">
                      Content Genome Structured Metadata
                    </h4>
                  </div>
                  <span className="text-[11px] font-mono text-cyan-400">
                    Proprietary CreatorX Content Model
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
                  <div className="p-3 bg-[#080B12] rounded-xl border border-white/5">
                    <span className="text-slate-500 block text-[10px]">TOPIC</span>
                    <strong className="text-white text-xs">{project.contentGenome.topic}</strong>
                  </div>
                  <div className="p-3 bg-[#080B12] rounded-xl border border-white/5">
                    <span className="text-slate-500 block text-[10px]">TONE / PACING</span>
                    <strong className="text-cyan-300 text-xs">{project.contentGenome.tone} ? {project.contentGenome.pacing}</strong>
                  </div>
                  <div className="p-3 bg-[#080B12] rounded-xl border border-white/5">
                    <span className="text-slate-500 block text-[10px]">HOOK TYPE</span>
                    <strong className="text-purple-300 text-xs">{project.contentGenome.hookType}</strong>
                  </div>
                  <div className="p-3 bg-[#080B12] rounded-xl border border-white/5">
                    <span className="text-slate-500 block text-[10px]">TARGET CTA</span>
                    <strong className="text-emerald-300 text-xs">{project.contentGenome.cta}</strong>
                  </div>
                </div>
              </section>
            )}

            {/* MAIN TWO-COLUMN WORKBENCH: PLAYER ON LEFT, ORCHESTRATION ON RIGHT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: 9:16 Video Player & Content Summary */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <VideoPlayer916
                  scenes={project.scenes}
                  durationSec={project.contentGenome.duration}
                  title={project.title}
                />

                {/* Content Summary Card */}
                <div className="w-full max-w-[420px] mx-auto glass-panel rounded-2xl p-5 border border-purple-500/20 text-xs">
                  <h4 className="font-display font-bold text-white text-sm mb-3 flex items-center justify-between">
                    <span>Content Summary</span>
                    <span className="text-emerald-400 font-mono text-xs">
                      Score: {project.qualityReport.overallScore}/100
                    </span>
                  </h4>
                  <div className="flex flex-col gap-2 font-mono text-slate-300">
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-slate-500">Format:</span>
                      <span className="text-white">9:16 Vertical (1080?1920)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-slate-500">Duration:</span>
                      <span className="text-cyan-400">00:{project.contentGenome.duration}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-slate-500">Language / Voice:</span>
                      <span className="text-purple-300">{project.contentGenome.language} ({project.contentGenome.voiceStyle})</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-slate-500">Visual Aesthetic:</span>
                      <span className="text-white">{project.contentGenome.visualStyle}</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-slate-500">Publish Target:</span>
                      <span className="text-emerald-400 font-bold">Qoneqt Global Feed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Stages, Hook Battle, Script, Scenes, Quality */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                {/* Pipeline visualizer */}
                <PipelineVisualizer stages={project.stages} />

                {/* Hook Battle */}
                <HookBattleCard
                  hooks={project.hooks}
                  selectedHookId={project.selectedHookId}
                  onSelectHook={handleSelectHook}
                />

                {/* Script Engine */}
                <ScriptEditor
                  script={project.script}
                  durationSec={project.contentGenome.duration}
                  onUpdateScript={handleUpdateScript}
                />

                {/* Visual Scene Planner */}
                <SceneTimeline
                  scenes={project.scenes}
                  onRegenerateScene={handleRegenerateScene}
                />

                {/* AI Quality Control */}
                <QualityControlCard
                  report={project.qualityReport}
                  onRegenerateScene={(sceneId) => handleRegenerateScene(sceneId)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Publish Modal */}
        {project && (
          <PublishModal
            project={project}
            isOpen={isPublishModalOpen}
            onClose={() => setIsPublishModalOpen(false)}
            onPublishComplete={handlePublishComplete}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
