import React from "react";
import Link from "next/link";
import { Sparkles, Terminal, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-purple-500/15 bg-[#05060A]/90 py-10 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-sm tracking-wider text-white">
              QONEQT CREATORX
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono border border-purple-500/30">
              v2.4
            </span>
          </div>
          <p className="text-xs text-slate-400 text-center md:text-left">
            "From idea to feed, automatically." ? Built for the Qoneqt ? CTRL FREAK Challenge.
          </p>
        </div>

        <div className="flex items-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Pipeline Engine Operational</span>
          </div>
          <span className="text-slate-600">|</span>
          <Link href="/pipeline" className="hover:text-cyan-400 transition-colors">
            Architecture
          </Link>
          <span className="text-slate-600">|</span>
          <Link href="/feed" className="hover:text-purple-400 transition-colors">
            Qoneqt Feed Sync
          </Link>
        </div>
      </div>
    </footer>
  );
}
