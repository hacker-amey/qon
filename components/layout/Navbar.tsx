"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  Layers,
  FolderKanban,
  History,
  Radio,
  Zap,
  Cpu,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Studio", href: "/", icon: Sparkles },
    { label: "Pipeline", href: "/pipeline", icon: Layers },
    { label: "Assets", href: "/assets", icon: FolderKanban },
    { label: "History", href: "/history", icon: History },
    { label: "Qoneqt Feed", href: "/feed", icon: Radio },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-purple-500/20 bg-[#05060A]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Lockup */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 p-[1.5px] shadow-[0_0_20px_rgba(139,92,246,0.5)] group-hover:shadow-[0_0_30px_rgba(34,211,238,0.7)] transition-all">
            <div className="w-full h-full bg-[#05060A] rounded-[10px] flex items-center justify-center">
              <span className="font-display font-black text-xl bg-gradient-to-r from-purple-400 via-cyan-300 to-white bg-clip-text text-transparent">
                X
              </span>
            </div>
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping opacity-75" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-display text-sm tracking-[0.2em] font-extrabold text-white">
                QONEQT
              </span>
              <span className="font-display text-sm tracking-[0.2em] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                CREATORX
              </span>
            </div>
            <span className="text-[10px] tracking-wider text-slate-400 uppercase font-mono">
              AI Content Production Pipeline
            </span>
          </div>
        </Link>

        {/* Navigation items */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-all ${
                  isActive
                    ? "bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-[0_0_12px_rgba(139,92,246,0.3)]"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-cyan-400" : ""}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right side Status & CTA */}
        <div className="flex items-center gap-3">
          {/* Demo Mode Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 shadow-inner">
            <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="text-[11px] font-mono font-medium text-purple-200 tracking-wide">
              DEMO MODE
            </span>
          </div>

          <Link
            href="/"
            className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white text-xs font-semibold flex items-center gap-1.5 shadow-[0_0_15px_rgba(139,92,246,0.4)] transition-all hover:scale-105 active:scale-95"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>New Video</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
