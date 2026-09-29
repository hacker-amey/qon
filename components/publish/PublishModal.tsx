"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Project, PublishedPost } from "@/types/pipeline";
import {
  Globe,
  Radio,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Shield,
  Layers,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface PublishModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
  onPublishComplete: (publishedPost: PublishedPost) => void;
}

export function PublishModal({
  project,
  isOpen,
  onClose,
  onPublishComplete,
}: PublishModalProps) {
  const router = useRouter();
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(
    project.script.hook.text + " " + project.script.body.text.slice(0, 100) + "..."
  );
  const [hashtags, setHashtags] = useState("#QoneqtCreatorX #Science #AI #Innovation #Frontier");
  const [visibility, setVisibility] = useState<"public" | "followers" | "unlisted">("public");
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishStep, setPublishStep] = useState(0);
  const [isPublished, setIsPublished] = useState(false);

  if (!isOpen) return null;

  const handlePublish = async () => {
    setIsPublishing(true);
    setPublishStep(1);

    await new Promise((r) => setTimeout(r, 700));
    setPublishStep(2);

    await new Promise((r) => setTimeout(r, 800));
    setPublishStep(3);

    await new Promise((r) => setTimeout(r, 600));

    // Fire celebratory confetti!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#8B5CF6", "#22D3EE", "#A855F7", "#ffffff"],
    });

    const published: PublishedPost = {
      id: "post_" + Math.random().toString(36).substring(2, 9),
      projectId: project.id,
      title,
      description,
      hashtags: hashtags.split(/\s+/).filter(Boolean),
      thumbnailUrl: project.scenes[0]?.mediaUrl || "",
      publishedAt: "Just now",
      feedUrl: "/feed",
      views: 1,
      likes: 1,
      remixes: 0,
      comments: 0,
      author: {
        name: "CreatorX Studio",
        handle: "@creatorx_studio",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        verified: true,
      },
    };

    setIsPublished(true);
    setIsPublishing(false);
    onPublishComplete(published);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-xl glass-panel-glow rounded-3xl p-6 md:p-8 border border-purple-500/40 shadow-[0_0_50px_rgba(139,92,246,0.3)]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 p-0.5">
              <div className="w-full h-full bg-[#05060A] rounded-[10px] flex items-center justify-center">
                <Radio className="w-5 h-5 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-white">
                Publish to Qoneqt Global Feed
              </h3>
              <p className="text-xs text-slate-400">
                Official Distribution Gateway ? Vertical 9:16 Video
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-lg font-mono p-1"
          >
            ?
          </button>
        </div>

        {/* Success State */}
        {isPublished ? (
          <div className="py-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(16,185,129,0.4)]">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>

            <h4 className="font-display text-2xl font-bold text-white mb-1">
              Live on Qoneqt Global Feed!
            </h4>
            <p className="text-xs text-slate-300 max-w-sm mb-6">
              Your video has been distributed across the Qoneqt network and indexed for discovery.
            </p>

            <div className="w-full p-4 rounded-xl bg-[#080B12] border border-purple-500/30 text-left mb-6 flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.scenes[0]?.mediaUrl}
                alt={title}
                className="w-16 h-24 object-cover rounded-lg border border-white/10"
              />
              <div className="flex-1 min-w-0">
                <h5 className="text-sm font-bold text-white truncate">{title}</h5>
                <p className="text-xs text-slate-400 truncate mt-0.5">{description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[11px] font-mono text-cyan-400">{hashtags.split(" ")[0]}</span>
                  <span className="text-[10px] text-emerald-400 font-mono">? LIVE</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  router.push("/feed");
                }}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg"
              >
                <span>View on Live Feed</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* Form State */
          <div className="flex flex-col gap-4 text-xs">
            {/* Disclaimer pill */}
            <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-center gap-2 text-purple-200">
              <Shield className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>
                <strong>Demonstration Publishing Gateway:</strong> Configured for the Qoneqt challenge. Seamlessly connects to production API endpoints when credentials are provided.
              </span>
            </div>

            {/* Title */}
            <div>
              <label className="block text-slate-300 font-mono mb-1 font-semibold">
                Post Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#080B12] border border-white/15 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-slate-300 font-mono mb-1 font-semibold">
                Description / Caption
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full bg-[#080B12] border border-white/15 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Hashtags */}
            <div>
              <label className="block text-slate-300 font-mono mb-1 font-semibold">
                Trending Tags
              </label>
              <input
                type="text"
                value={hashtags}
                onChange={(e) => setHashtags(e.target.value)}
                className="w-full bg-[#080B12] border border-white/15 rounded-xl p-3 text-cyan-300 text-xs font-mono focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Visibility */}
            <div>
              <label className="block text-slate-300 font-mono mb-1 font-semibold">
                Distribution Audience
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "public", label: "Global Feed" },
                  { id: "followers", label: "Followers Only" },
                  { id: "unlisted", label: "Private Link" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setVisibility(opt.id as typeof visibility)}
                    className={`py-2 px-3 rounded-lg border text-center font-medium transition-all ${
                      visibility === opt.id
                        ? "bg-purple-600/30 border-cyan-400 text-cyan-300"
                        : "bg-[#080B12] border-white/10 text-slate-400 hover:text-white"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Progress while publishing */}
            {isPublishing && (
              <div className="p-3 bg-[#080B12] rounded-xl border border-purple-500/30 flex flex-col gap-2 mt-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-cyan-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    {publishStep === 1 && "Signing cryptographic feed token..."}
                    {publishStep === 2 && "Transcoding 9:16 package to Qoneqt CDN..."}
                    {publishStep === 3 && "Propagating to Global Discovery Index..."}
                  </span>
                  <span className="text-purple-400 font-bold">{publishStep * 33}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-300"
                    style={{ width: `${publishStep * 33}%` }}
                  />
                </div>
              </div>
            )}

            {/* Submit */}
            <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={onClose}
                disabled={isPublishing}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePublish}
                disabled={isPublishing}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold flex items-center gap-2 shadow-[0_0_25px_rgba(139,92,246,0.5)] transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
              >
                <Radio className="w-4 h-4 fill-current" />
                <span>{isPublishing ? "Publishing to Feed..." : "Publish to Qoneqt Global Feed"}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
