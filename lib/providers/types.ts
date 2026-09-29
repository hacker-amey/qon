import {
  ContentGenome,
  HookOption,
  QualityReport,
  Scene,
  ScriptStructure,
  VoiceStyleOption,
  VisualStyleOption,
} from "@/types/pipeline";

export interface ILLMProvider {
  name: string;
  generateContentGenome(topic: string, partialOptions?: Partial<ContentGenome>): Promise<ContentGenome>;
  generateHookBattle(topic: string, genome: ContentGenome): Promise<HookOption[]>;
  generateScript(topic: string, selectedHook: HookOption, genome: ContentGenome): Promise<ScriptStructure>;
  generateScenePlan(script: ScriptStructure, genome: ContentGenome): Promise<Scene[]>;
  evaluateQuality(
    topic: string,
    script: ScriptStructure,
    scenes: Scene[]
  ): Promise<QualityReport>;
}

export interface GeneratedMediaResult {
  url: string;
  mediaType: "image" | "video";
  promptUsed: string;
  isDemo: boolean;
  provider: string;
}

export interface IImageProvider {
  name: string;
  generateImage(
    prompt: string,
    style: VisualStyleOption,
    width?: number,
    height?: number
  ): Promise<GeneratedMediaResult>;
}

export interface IVideoProvider {
  name: string;
  generateVideoMotion(
    prompt: string,
    style: VisualStyleOption,
    durationSec: number
  ): Promise<GeneratedMediaResult>;
}

export interface GeneratedAudioResult {
  audioUrl: string;
  durationSec: number;
  waveformSamples: number[];
  isDemo: boolean;
  provider: string;
}

export interface ITTSProvider {
  name: string;
  generateSpeech(
    text: string,
    voiceStyle: VoiceStyleOption,
    language: string,
    speedMultiplier?: number
  ): Promise<GeneratedAudioResult>;
}

export interface IAIProviderBundle {
  llm: ILLMProvider;
  image: IImageProvider;
  video: IVideoProvider;
  tts: ITTSProvider;
  isDemoMode: boolean;
  activeProviderName: string;
}
