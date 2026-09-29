"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { INITIAL_FEED_POSTS } from "@/lib/demo/sampleData";
import { PublishedPost } from "@/types/pipeline";
import {
  Radio,
  Heart,
  MessageCircle,
  Share2,
  Sparkles,
  Repeat,
  CheckCircle2,
  TrendingUp,
  Globe,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

export default function FeedPage() {
  const [posts, setPosts] = useState<PublishedPost[]>(INITIAL_FEED_POSTS);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const handleToggleLike = (postId: string) => {
    const isLiked = likedPosts.has(postId);
    const updatedLiked = new Set(likedPosts);
    if (isLiked) {
      updatedLiked.delete(postId);
    } else {
      updatedLiked.add(postId);
    }
    setLikedPosts(updatedLiked);

    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, likes: isLiked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#05060A] text-[#F8FAFC] flex flex-col bg-cyber-grid bg-radial-glow">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">
        {/* Feed Header */}
        <div className="glass-panel-glow rounded-3xl p-6 border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-[0_0_35px_rgba(139,92,246,0.2)]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 p-0.5">
              <div className="w-full h-full bg-[#05060A] rounded-[14px] flex items-center justify-center">
                <Radio className="w-6 h-6 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  Live Distribution Network
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Qoneqt Global Feed
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white text-xs font-semibold flex items-center gap-2 shadow-lg"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Publish New Story</span>
            </Link>
          </div>
        </div>

        {/* Feed Posts Column */}
        <div className="flex flex-col gap-8 max-w-2xl mx-auto w-full">
          {posts.map((post) => {
            const isLiked = likedPosts.has(post.id);

            return (
              <article
                key={post.id}
                className="glass-panel rounded-3xl overflow-hidden border border-purple-500/20 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col"
              >
                {/* Author Bar */}
                <div className="p-4 sm:p-5 flex items-center justify-between border-b border-white/5 bg-[#080B12]/80">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-10 h-10 rounded-full object-cover border border-purple-500/40"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-white">
                          {post.author.name}
                        </span>
                        {post.author.verified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/20" />
                        )}
                        <span className="text-xs text-purple-400 font-mono">
                          {post.author.handle}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">
                        Published via CreatorX Pipeline ? {post.publishedAt}
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded-full border border-cyan-400/30 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>Viral Index 98</span>
                  </span>
                </div>

                {/* 9:16 Media Container */}
                <div className="relative aspect-[9/14] w-full max-h-[620px] bg-black overflow-hidden flex items-center justify-center group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.thumbnailUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

                  {/* Top Qoneqt Tag */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-black/70 backdrop-blur-md border border-purple-500/40 text-purple-300">
                      QONEQT CREATORX
                    </span>
                  </div>

                  {/* Floating Action Buttons on Right (TikTok/Reels Style) */}
                  <div className="absolute right-4 bottom-20 flex flex-col items-center gap-4 z-10">
                    <button
                      onClick={() => handleToggleLike(post.id)}
                      className={`w-12 h-12 rounded-full flex flex-col items-center justify-center backdrop-blur-md border transition-all ${
                        isLiked
                          ? "bg-red-500/30 border-red-500 text-red-400 scale-110 shadow-[0_0_20px_rgba(239,68,68,0.5)]"
                          : "bg-black/60 border-white/20 text-white hover:bg-black/80"
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
                      <span className="text-[10px] font-mono mt-0.5">{post.likes}</span>
                    </button>

                    <button className="w-12 h-12 rounded-full flex flex-col items-center justify-center bg-black/60 border border-white/20 text-white hover:bg-black/80 backdrop-blur-md transition-all">
                      <MessageCircle className="w-5 h-5 text-cyan-400" />
                      <span className="text-[10px] font-mono mt-0.5">{post.comments}</span>
                    </button>

                    <button className="w-12 h-12 rounded-full flex flex-col items-center justify-center bg-black/60 border border-white/20 text-white hover:bg-black/80 backdrop-blur-md transition-all">
                      <Repeat className="w-5 h-5 text-purple-400" />
                      <span className="text-[10px] font-mono mt-0.5">{post.remixes}</span>
                    </button>

                    <button className="w-12 h-12 rounded-full flex flex-col items-center justify-center bg-black/60 border border-white/20 text-white hover:bg-black/80 backdrop-blur-md transition-all">
                      <Share2 className="w-5 h-5 text-slate-300" />
                      <span className="text-[10px] font-mono mt-0.5">Share</span>
                    </button>
                  </div>

                  {/* Caption & Title at Bottom */}
                  <div className="absolute bottom-4 left-4 right-20 text-left z-10">
                    <h3 className="text-base sm:text-lg font-display font-extrabold text-white drop-shadow-md leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-200 mt-1 line-clamp-2 drop-shadow">
                      {post.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {post.hashtags.map((tag) => (
                        <span key={tag} className="text-[11px] font-mono text-cyan-300 drop-shadow">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer metrics bar */}
                <div className="p-4 bg-[#080B12] border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Views: <strong className="text-white">{post.views.toLocaleString()}</strong></span>
                  <span className="text-purple-300">CreatorX Pipeline Certified ?</span>
                  <Link
                    href="/"
                    className="text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>Remix Pipeline</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
