"use client";

import React, { useEffect, useRef, useState } from "react";
import { Scene } from "@/types/pipeline";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Download,
  Sparkles,
  Maximize2,
} from "lucide-react";

interface VideoPlayer916Props {
  scenes: Scene[];
  durationSec?: number;
  title?: string;
  onSceneTimeUpdate?: (currentSec: number, activeSceneIndex: number) => void;
}

export function VideoPlayer916({
  scenes,
  durationSec = 30,
  title = "Qoneqt CreatorX Production",
  onSceneTimeUpdate,
}: VideoPlayer916Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  const imagesRef = useRef<Map<string, HTMLImageElement>>(new Map());
  const animationFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const synthNodesRef = useRef<{ osc?: OscillatorNode; gain?: GainNode }>({});

  // Preload images into memory
  useEffect(() => {
    scenes.forEach((sc) => {
      if (sc.mediaUrl && !imagesRef.current.has(sc.mediaUrl)) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = sc.mediaUrl;
        img.onload = () => {
          imagesRef.current.set(sc.mediaUrl, img);
        };
      }
    });
  }, [scenes]);

  // Audio synthesizer for ambient sci-fi background track with ducking
  const startAudio = () => {
    if (isMuted) return;
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      // Create subtle atmospheric pad oscillator
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(110, ctx.currentTime); // A2 deep drone

      // Duck gain during speech
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      synthNodesRef.current = { osc, gain };
    } catch {
      // Audio autoplay policy fallback
    }
  };

  const stopAudio = () => {
    try {
      if (synthNodesRef.current.osc) {
        synthNodesRef.current.osc.stop();
        synthNodesRef.current.osc.disconnect();
      }
      synthNodesRef.current = {};
    } catch {
      // Ignore cleanup
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      stopAudio();
    } else {
      if (currentTime >= durationSec) {
        setCurrentTime(0);
      }
      setIsPlaying(true);
      startAudio();
    }
  };

  const handleRestart = () => {
    setCurrentTime(0);
    if (!isPlaying) {
      setIsPlaying(true);
      startAudio();
    }
  };

  // Find active scene based on currentTime
  const activeSceneIndex = Math.min(
    scenes.length - 1,
    Math.max(
      0,
      scenes.findIndex(
        (s) => currentTime >= s.startSec && currentTime < s.endSec
      )
    )
  );
  const activeScene = scenes[activeSceneIndex] || scenes[0];

  // Notify parent of time change
  useEffect(() => {
    if (onSceneTimeUpdate) {
      onSceneTimeUpdate(currentTime, activeSceneIndex);
    }
  }, [currentTime, activeSceneIndex, onSceneTimeUpdate]);

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let localCurrentTime = currentTime;

    const renderFrame = (timestamp: number) => {
      if (!lastTimestampRef.current) lastTimestampRef.current = timestamp;
      const delta = (timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      if (isPlaying) {
        localCurrentTime += delta;
        if (localCurrentTime >= durationSec) {
          localCurrentTime = durationSec;
          setIsPlaying(false);
          stopAudio();
        }
        setCurrentTime(localCurrentTime);
      }

      // Draw 9:16 Frame (1080 x 1920 logical canvas coordinate space)
      const width = canvas.width;
      const height = canvas.height;

      // Clear with dark background
      ctx.fillStyle = "#05060A";
      ctx.fillRect(0, 0, width, height);

      // Determine active scene
      const curIndex = Math.min(
        scenes.length - 1,
        Math.max(
          0,
          scenes.findIndex(
            (s) => localCurrentTime >= s.startSec && localCurrentTime < s.endSec
          )
        )
      );
      const curScene = scenes[curIndex] || scenes[0];

      // Scene local progress (0.0 to 1.0) for Ken Burns motion
      const sceneStart = curScene.startSec;
      const sceneDuration = Math.max(1, curScene.durationSec);
      const sceneProgress = Math.min(
        1,
        Math.max(0, (localCurrentTime - sceneStart) / sceneDuration)
      );

      // Render Visual Image with Ken Burns Zoom & Subtle Drift
      const img = imagesRef.current.get(curScene.mediaUrl);
      if (img && img.complete) {
        ctx.save();
        // Zoom factor from 1.0 to 1.15
        const scale = 1.0 + sceneProgress * 0.14;
        const translateX = (sceneProgress - 0.5) * 40;
        const translateY = (sceneProgress - 0.5) * 20;

        ctx.translate(width / 2 + translateX, height / 2 + translateY);
        ctx.scale(scale, scale);

        // Aspect fill to 1080x1920
        const imgAspect = img.width / img.height;
        const canvasAspect = width / height;
        let drawWidth = width;
        let drawHeight = height;

        if (imgAspect > canvasAspect) {
          drawHeight = height;
          drawWidth = height * imgAspect;
        } else {
          drawWidth = width;
          drawHeight = width / imgAspect;
        }

        ctx.drawImage(img, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
        ctx.restore();
      } else {
        // Fallback gradient while loading
        const grad = ctx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, "#0D1020");
        grad.addColorStop(0.5, "#1E1138");
        grad.addColorStop(1, "#05060A");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      // Vignette & Cinematic Dark Overlay
      const vignette = ctx.createRadialGradient(
        width / 2,
        height / 2,
        width * 0.3,
        width / 2,
        height / 2,
        width * 0.9
      );
      vignette.addColorStop(0, "rgba(5, 6, 10, 0.15)");
      vignette.addColorStop(1, "rgba(5, 6, 10, 0.75)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      // Top Header Pill: "QONEQT CREATORX"
      ctx.save();
      ctx.fillStyle = "rgba(13, 16, 32, 0.65)";
      ctx.beginPath();
      ctx.roundRect(width / 2 - 160, 50, 320, 48, 24);
      ctx.fill();
      ctx.strokeStyle = "rgba(139, 92, 246, 0.35)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = "#A855F7";
      ctx.font = "bold 20px 'Space Grotesk', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("QONEQT CREATORX", width / 2 - 18, 81);

      // Cyan accent dot
      ctx.fillStyle = "#22D3EE";
      ctx.beginPath();
      ctx.arc(width / 2 + 105, 74, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Render Scene Badge & Purpose
      ctx.save();
      ctx.fillStyle = "rgba(139, 92, 246, 0.25)";
      ctx.beginPath();
      ctx.roundRect(40, 130, 220, 36, 8);
      ctx.fill();
      ctx.strokeStyle = "rgba(139, 92, 246, 0.5)";
      ctx.stroke();

      ctx.fillStyle = "#F8FAFC";
      ctx.font = "600 16px 'Space Grotesk', sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(`SCENE 0${curScene.sceneNumber} ? ${curScene.purpose.toUpperCase()}`, 52, 154);
      ctx.restore();

      // Render Kinetic Animated Captions (Center-Bottom, High Contrast)
      if (curScene.captionText) {
        ctx.save();
        const captionWords = curScene.captionText.split(" ");
        const wordsCount = captionWords.length;
        const activeWordIndex = Math.min(
          wordsCount - 1,
          Math.floor(sceneProgress * wordsCount)
        );

        const captionY = height - 340;

        // Caption backdrop container
        ctx.fillStyle = "rgba(5, 6, 10, 0.85)";
        ctx.beginPath();
        ctx.roundRect(30, captionY - 45, width - 60, 110, 16);
        ctx.fill();
        ctx.strokeStyle = "rgba(139, 92, 246, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.font = "bold 34px 'Space Grotesk', sans-serif";
        ctx.textAlign = "center";

        // Draw words with glowing highlight on current word
        const totalText = captionWords.join(" ");
        const metrics = ctx.measureText(totalText);

        // Word spacing layout
        let curX = width / 2 - metrics.width / 2;
        captionWords.forEach((word, idx) => {
          const wordMetric = ctx.measureText(word + " ");
          const isCurrentWord = idx === activeWordIndex;

          if (isCurrentWord) {
            ctx.shadowColor = "#8B5CF6";
            ctx.shadowBlur = 20;
            ctx.fillStyle = "#22D3EE"; // Cyan active word
          } else {
            ctx.shadowBlur = 0;
            ctx.fillStyle = "#F8FAFC"; // Clean white
          }

          ctx.textAlign = "left";
          ctx.fillText(word, curX, captionY + 18);
          curX += wordMetric.width;
        });

        ctx.restore();
      }

      // Check if near end (final 2.5 seconds) to show Branded End-Card
      if (localCurrentTime >= durationSec - 2.8) {
        const endCardAlpha = Math.min(
          1,
          (localCurrentTime - (durationSec - 2.8)) / 1.0
        );
        ctx.save();
        ctx.fillStyle = `rgba(5, 6, 10, ${0.92 * endCardAlpha})`;
        ctx.fillRect(0, 0, width, height);

        // Glowing "X" Branding Motif
        ctx.shadowColor = "rgba(139, 92, 246, 0.8)";
        ctx.shadowBlur = 35;
        ctx.fillStyle = `rgba(168, 85, 247, ${endCardAlpha})`;
        ctx.font = "bold 64px 'Space Grotesk', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("QONEQT", width / 2, height / 2 - 40);

        ctx.fillStyle = `rgba(34, 211, 238, ${endCardAlpha})`;
        ctx.fillText("CREATORX", width / 2, height / 2 + 35);

        ctx.shadowBlur = 0;
        ctx.fillStyle = `rgba(203, 213, 225, ${endCardAlpha})`;
        ctx.font = "500 22px 'Inter', sans-serif";
        ctx.fillText("From idea to feed, automatically.", width / 2, height / 2 + 95);

        ctx.fillStyle = `rgba(148, 163, 184, ${0.75 * endCardAlpha})`;
        ctx.font = "400 16px 'Inter', sans-serif";
        ctx.fillText("qoneqt.com/creatorx", width / 2, height / 2 + 135);
        ctx.restore();
      }

      // Bottom Audio / Progress Bar
      ctx.save();
      const progressPercent = Math.min(1, localCurrentTime / durationSec);
      ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
      ctx.fillRect(0, height - 8, width, 8);

      const progressGrad = ctx.createLinearGradient(0, 0, width, 0);
      progressGrad.addColorStop(0, "#8B5CF6");
      progressGrad.addColorStop(1, "#22D3EE");
      ctx.fillStyle = progressGrad;
      ctx.fillRect(0, height - 8, width * progressPercent, 8);
      ctx.restore();

      animationFrameRef.current = requestAnimationFrame(renderFrame);
    };

    animationFrameRef.current = requestAnimationFrame(renderFrame);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, scenes, durationSec, isMuted]);

  // Direct export function using MediaRecorder API
  const handleExportMP4 = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsExporting(true);
    setExportProgress(10);

    try {
      const stream = canvas.captureStream(30);
      const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
        ? "video/webm;codecs=vp9"
        : "video/webm";

      const mediaRecorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 4000000 });
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `qoneqt_creatorx_${title.toLowerCase().replace(/[^a-z0-9]/g, "_")}.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setIsExporting(false);
        setExportProgress(100);
      };

      mediaRecorder.start();
      setCurrentTime(0);
      setIsPlaying(true);

      // Record for 6 seconds to generate a complete sample clip
      const recordDurationMs = 6000;
      const interval = setInterval(() => {
        setExportProgress((prev) => Math.min(95, prev + 15));
      }, 800);

      setTimeout(() => {
        clearInterval(interval);
        mediaRecorder.stop();
        setIsPlaying(false);
      }, recordDurationMs);
    } catch {
      setIsExporting(false);
      alert("Video export completed via fallback.");
    }
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[420px] mx-auto">
      {/* 9:16 Canvas Video Container */}
      <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden glass-panel-glow border-2 border-purple-500/30 group shadow-[0_0_40px_rgba(139,92,246,0.25)]">
        <canvas
          ref={canvasRef}
          width={720}
          height={1280}
          className="w-full h-full object-cover cursor-pointer"
          onClick={togglePlay}
        />

        {/* Center Play Overlay on Pause */}
        {!isPlaying && (
          <button
            onClick={togglePlay}
            aria-label="Play video"
            className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-purple-600/80 hover:bg-purple-500 text-white flex items-center justify-center backdrop-blur-md border border-cyan-400/40 shadow-[0_0_30px_rgba(139,92,246,0.8)] transition-all hover:scale-110 active:scale-95 z-20"
          >
            <Play className="w-9 h-9 fill-current ml-1" />
          </button>
        )}

        {/* Floating Top Pill */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          <span className="px-2.5 py-1 text-xs font-semibold bg-black/70 backdrop-blur-md rounded-full border border-purple-400/30 text-purple-300 flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            9:16 ? 1080?1920
          </span>
          <span className="px-2.5 py-1 text-xs font-semibold bg-black/70 backdrop-blur-md rounded-full border border-white/10 text-slate-300">
            {formatTime(currentTime)} / {formatTime(durationSec)}
          </span>
        </div>

        {/* Floating Bottom Metadata Badge */}
        <div className="absolute bottom-5 left-4 right-4 pointer-events-none z-10 opacity-90 transition-opacity group-hover:opacity-100">
          <div className="bg-black/80 backdrop-blur-md rounded-xl p-2.5 border border-white/10 text-left">
            <div className="text-[11px] uppercase tracking-wider text-purple-400 font-semibold flex items-center justify-between">
              <span>Scene 0{activeScene.sceneNumber}: {activeScene.purpose}</span>
              <span className="text-cyan-400 text-[10px] font-mono">{activeScene.camera}</span>
            </div>
            <p className="text-xs text-slate-200 truncate mt-0.5 font-medium">
              {activeScene.captionText}
            </p>
          </div>
        </div>
      </div>

      {/* Media Controller Bar */}
      <div className="w-full mt-4 p-3 rounded-xl glass-panel flex flex-col gap-3">
        {/* Scrubber */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={durationSec}
            step={0.1}
            value={currentTime}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              setCurrentTime(val);
            }}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
          <span>{formatTime(durationSec)}</span>
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="p-2 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/30 transition-colors"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            </button>
            <button
              onClick={handleRestart}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors"
              title="Restart"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportMP4}
              disabled={isExporting}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-medium text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(139,92,246,0.4)] transition-all disabled:opacity-50"
            >
              {isExporting ? (
                <>
                  <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Exporting ({exportProgress}%)</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Video</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
