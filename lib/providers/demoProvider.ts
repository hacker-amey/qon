import {
  ContentGenome,
  HookOption,
  QualityReport,
  Scene,
  ScriptStructure,
  VoiceStyleOption,
  VisualStyleOption,
} from "@/types/pipeline";
import {
  GeneratedAudioResult,
  GeneratedMediaResult,
  IImageProvider,
  ILLMProvider,
  ITTSProvider,
  IVideoProvider,
} from "./types";
import { SAMPLE_PROJECT_DREAMS, SAMPLE_PROJECT_QUANTUM } from "../demo/sampleData";

export class DemoLLMProvider implements ILLMProvider {
  name = "CreatorX Demo LLM Engine (Llama-3 / Claude-3.5 Fallback)";

  async generateContentGenome(
    topic: string,
    partialOptions?: Partial<ContentGenome>
  ): Promise<ContentGenome> {
    await new Promise((r) => setTimeout(r, 600));

    const lower = topic.toLowerCase();
    if (lower.includes("dream")) {
      return { ...SAMPLE_PROJECT_DREAMS.contentGenome, ...partialOptions };
    }
    if (lower.includes("quantum")) {
      return { ...SAMPLE_PROJECT_QUANTUM.contentGenome, ...partialOptions };
    }

    return {
      topic,
      audience: "Curious social media innovators",
      tone: partialOptions?.tone || "cinematic",
      duration: partialOptions?.duration || 30,
      language: partialOptions?.language || "English",
      visualStyle: partialOptions?.visualStyle || "cinematic",
      hookType: "Cognitive Paradox",
      pacing: "fast",
      cta: "Discover more on Qoneqt Global Feed",
      captionStyle: "kinetic-neon",
      voiceStyle: partialOptions?.voiceStyle || "documentary",
    };
  }

  async generateHookBattle(
    topic: string,
    genome: ContentGenome
  ): Promise<HookOption[]> {
    await new Promise((r) => setTimeout(r, 800));

    const lower = topic.toLowerCase();
    if (lower.includes("dream")) {
      return SAMPLE_PROJECT_DREAMS.hooks;
    }
    if (lower.includes("quantum")) {
      return SAMPLE_PROJECT_QUANTUM.hooks;
    }

    // Dynamic generation for any topic
    return [
      {
        id: "hook_opt_a",
        title: "Hook A: The Paradox",
        text: `Everything you thought you knew about ${topic.toLowerCase()} is fundamentally backwards.`,
        type: "Counter-Intuition",
        curiosity: 95,
        clarity: 91,
        engagement: 94,
        rationale: "Creates an immediate cognitive gap that compels the user to stay through the 3-second retention mark.",
        selected: true,
      },
      {
        id: "hook_opt_b",
        title: "Hook B: The Direct Question",
        text: `What if the secret behind ${topic.toLowerCase()} is already happening right under your nose?`,
        type: "Curiosity Inversion",
        curiosity: 88,
        clarity: 93,
        engagement: 87,
        rationale: "Relatable question format, ideal for broad educational virality.",
        selected: false,
      },
      {
        id: "hook_opt_c",
        title: "Hook C: The High Stakes",
        text: `In the next 60 seconds, your entire perspective on ${topic.toLowerCase()} will change forever.`,
        type: "High Urgency",
        curiosity: 92,
        clarity: 89,
        engagement: 90,
        rationale: "Strong pacing incentive, excellent for fast social feeds.",
        selected: false,
      },
    ];
  }

  async generateScript(
    topic: string,
    selectedHook: HookOption,
    genome: ContentGenome
  ): Promise<ScriptStructure> {
    await new Promise((r) => setTimeout(r, 900));

    const lower = topic.toLowerCase();
    if (lower.includes("dream")) {
      return SAMPLE_PROJECT_DREAMS.script;
    }
    if (lower.includes("quantum")) {
      return SAMPLE_PROJECT_QUANTUM.script;
    }

    const hookText = selectedHook.text;
    const bodyText = `Behind the surface of ${topic}, intricate systems are in motion. Scientists and innovators are uncovering breakthrough evidence that reveals how this forces us to rethink modern principles, unlocking capabilities that were once considered impossible.`;
    const payoffText = `The true revelation isn't just how ${topic} works?it's how it permanently rewrites our future reality.`;
    const ctaText = `What's your take on this? Share your thoughts below and subscribe on Qoneqt for daily frontier stories.`;

    return {
      hook: { text: hookText, timing: "0?4 sec", durationSec: 4 },
      body: { text: bodyText, timing: "4?22 sec", durationSec: 18 },
      payoff: { text: payoffText, timing: "22?27 sec", durationSec: 5 },
      cta: { text: ctaText, timing: "27?30 sec", durationSec: 3 },
      fullScript: `${hookText} ${bodyText} ${payoffText} ${ctaText}`,
    };
  }

  async generateScenePlan(
    script: ScriptStructure,
    genome: ContentGenome
  ): Promise<Scene[]> {
    await new Promise((r) => setTimeout(r, 850));

    const lower = genome.topic.toLowerCase();
    if (lower.includes("dream")) {
      return SAMPLE_PROJECT_DREAMS.scenes;
    }
    if (lower.includes("quantum")) {
      return SAMPLE_PROJECT_QUANTUM.scenes;
    }

    return [
      {
        id: "sc_01",
        sceneNumber: 1,
        title: "The Opening Catalyst",
        purpose: "Hook",
        startSec: 0,
        endSec: 4,
        durationSec: 4,
        visualPrompt: `High-impact cinematic shot representing ${genome.topic}, dramatic rim lighting, electric violet and cyan accents, 8k resolution`,
        camera: "Rapid push-in macro",
        mediaType: "image",
        mediaUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1080&q=80",
        voiceNarration: script.hook.text,
        captionText: script.hook.text.split(".")[0] || script.hook.text,
        status: "ready",
      },
      {
        id: "sc_02",
        sceneNumber: 2,
        title: "The Core Mechanism",
        purpose: "Explanation",
        startSec: 4,
        endSec: 12,
        durationSec: 8,
        visualPrompt: `Futuristic dynamic visualization demonstrating the mechanics of ${genome.topic}, complex technological energy streams`,
        camera: "Slow rotational orbit",
        mediaType: "image",
        mediaUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1080&q=80",
        voiceNarration: script.body.text.slice(0, 120) + "...",
        captionText: "Complex mechanisms in dynamic motion.",
        status: "ready",
      },
      {
        id: "sc_03",
        sceneNumber: 3,
        title: "The Breakthrough Shift",
        purpose: "Main Insight",
        startSec: 12,
        endSec: 22,
        durationSec: 10,
        visualPrompt: `Expansive cinematic perspective showing the global scale impact of ${genome.topic}, deep atmospheric depth of field`,
        camera: "Dramatic crane sweep",
        mediaType: "image",
        mediaUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1080&q=80",
        voiceNarration: script.payoff.text,
        captionText: "Rewriting the boundaries of possibility.",
        status: "ready",
      },
      {
        id: "sc_04",
        sceneNumber: 4,
        title: "The Vision & Call to Action",
        purpose: "Conclusion",
        startSec: 22,
        endSec: 30,
        durationSec: 8,
        visualPrompt: `Heroic reveal of Qoneqt CreatorX 3D holographic emblem with luminous particle burst, cinematic social video ending`,
        camera: "Macro pull-back to branded lockup",
        mediaType: "image",
        mediaUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1080&q=80",
        voiceNarration: script.cta.text,
        captionText: "Discover more on Qoneqt Global Feed.",
        status: "ready",
      },
    ];
  }

  async evaluateQuality(
    topic: string,
    script: ScriptStructure,
    scenes: Scene[]
  ): Promise<QualityReport> {
    await new Promise((r) => setTimeout(r, 650));

    return {
      hookScore: 93,
      storyScore: 95,
      visualMatchScore: 92,
      audioSyncScore: 98,
      captionScore: 100,
      overallScore: 94,
      verdict: "PUBLISH_READY",
      diagnosticFeedback: [
        "Hook Curiosity Index ranks in the top 5% of viral engagement benchmarks.",
        "Voiceover-to-scene timing transition delta is within 0.1s tolerance.",
        "Kinetic caption chunking matches optimal reading velocity (145 WPM).",
        "Visual style maintains coherent chromatic palette across all 4 scenes.",
      ],
      evaluatedAt: new Date().toISOString(),
    };
  }
}

export class DemoImageProvider implements IImageProvider {
  name = "CreatorX Multimodal Neural Renderer (Runware / Flux Fallback)";

  private curatedImages: string[] = [
    "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1080&q=80",
    "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1080&q=80",
    "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1080&q=80",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1080&q=80",
    "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1080&q=80",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1080&q=80",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1080&q=80",
    "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1080&q=80",
  ];

  async generateImage(
    prompt: string,
    style: VisualStyleOption,
    width = 1080,
    height = 1920
  ): Promise<GeneratedMediaResult> {
    await new Promise((r) => setTimeout(r, 700));

    // Choose image based on hash of prompt to remain deterministic
    let hash = 0;
    for (let i = 0; i < prompt.length; i++) {
      hash = (hash + prompt.charCodeAt(i)) % this.curatedImages.length;
    }
    const selectedUrl = this.curatedImages[hash] || this.curatedImages[0];

    return {
      url: selectedUrl,
      mediaType: "image",
      promptUsed: prompt,
      isDemo: true,
      provider: this.name,
    };
  }
}

export class DemoVideoProvider implements IVideoProvider {
  name = "CreatorX Neural Motion Engine (Luma / Runway Fallback)";

  async generateVideoMotion(
    prompt: string,
    style: VisualStyleOption,
    durationSec: number
  ): Promise<GeneratedMediaResult> {
    await new Promise((r) => setTimeout(r, 900));

    return {
      url: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1080&q=80",
      mediaType: "video",
      promptUsed: prompt,
      isDemo: true,
      provider: this.name,
    };
  }
}

export class DemoTTSProvider implements ITTSProvider {
  name = "CreatorX Acoustic Voice Synthesizer (ElevenLabs Fallback)";

  async generateSpeech(
    text: string,
    voiceStyle: VoiceStyleOption,
    language: string,
    speedMultiplier = 1.0
  ): Promise<GeneratedAudioResult> {
    await new Promise((r) => setTimeout(r, 750));

    // Calculate approximate duration based on word count (approx 140 words per minute)
    const words = text.trim().split(/\s+/).length;
    const durationSec = Math.max(3, Math.round((words / (140 * speedMultiplier)) * 60));

    // Synthesize realistic waveform data points for visualizer
    const samplesCount = 48;
    const waveformSamples: number[] = [];
    for (let i = 0; i < samplesCount; i++) {
      const val = 0.2 + Math.abs(Math.sin(i * 0.4) * 0.6) + Math.random() * 0.2;
      waveformSamples.push(Math.min(1.0, Math.max(0.1, Number(val.toFixed(2)))));
    }

    return {
      audioUrl: "/demo/speech_sample.mp3",
      durationSec,
      waveformSamples,
      isDemo: true,
      provider: this.name,
    };
  }
}
