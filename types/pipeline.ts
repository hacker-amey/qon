export type ToneOption =
  | "cinematic"
  | "educational"
  | "funny"
  | "inspirational"
  | "news"
  | "curious";

export type DurationOption = 15 | 30 | 60;

export type LanguageOption = "English" | "Hindi" | "Hinglish";

export type VisualStyleOption =
  | "cinematic"
  | "minimal"
  | "3d"
  | "documentary"
  | "futuristic";

export type VoiceStyleOption =
  | "professional"
  | "warm"
  | "energetic"
  | "documentary";

export interface ContentGenome {
  topic: string;
  audience: string;
  tone: ToneOption;
  duration: DurationOption;
  language: LanguageOption;
  visualStyle: VisualStyleOption;
  hookType: string;
  pacing: "fast" | "moderate" | "cinematic";
  cta: string;
  captionStyle: "kinetic-neon" | "bold-center" | "clean-minimal";
  voiceStyle: VoiceStyleOption;
}

export interface HookOption {
  id: string;
  title: string;
  text: string;
  type: string;
  curiosity: number;
  clarity: number;
  engagement: number;
  rationale: string;
  selected: boolean;
}

export interface ScriptSection {
  text: string;
  timing: string;
  durationSec: number;
}

export interface ScriptStructure {
  hook: ScriptSection;
  body: ScriptSection;
  payoff: ScriptSection;
  cta: ScriptSection;
  fullScript: string;
}

export interface Scene {
  id: string;
  sceneNumber: number;
  title: string;
  purpose: "Hook" | "Explanation" | "Main Insight" | "Conclusion";
  startSec: number;
  endSec: number;
  durationSec: number;
  visualPrompt: string;
  camera: string;
  mediaType: "video" | "image" | "animation";
  mediaUrl: string;
  voiceNarration: string;
  captionText: string;
  status: "queued" | "generating" | "ready" | "error" | "regenerating";
  fallbackUsed?: boolean;
}

export type PipelineStageId =
  | "idea"
  | "understand"
  | "hook"
  | "script"
  | "scene_plan"
  | "visuals"
  | "voice"
  | "edit"
  | "quality_check"
  | "ready";

export type StageStatus =
  | "queued"
  | "processing"
  | "completed"
  | "failed"
  | "regenerating";

export interface PipelineStageState {
  id: PipelineStageId;
  label: string;
  description: string;
  status: StageStatus;
  progress: number;
  elapsedMs: number;
  previewSnippet?: string;
}

export interface QualityReport {
  hookScore: number;
  storyScore: number;
  visualMatchScore: number;
  audioSyncScore: number;
  captionScore: number;
  overallScore: number;
  verdict: "PUBLISH_READY" | "REGENERATION_REQUIRED";
  diagnosticFeedback: string[];
  problematicSceneId?: string;
  evaluatedAt: string;
}

export interface PublishedPost {
  id: string;
  projectId: string;
  title: string;
  description: string;
  hashtags: string[];
  thumbnailUrl: string;
  publishedAt: string;
  feedUrl: string;
  views: number;
  likes: number;
  remixes: number;
  comments: number;
  author: {
    name: string;
    handle: string;
    avatar: string;
    verified: boolean;
  };
}

export interface AssetRecord {
  id: string;
  projectId: string;
  title: string;
  type: "image" | "video" | "audio" | "script" | "final_video";
  url: string;
  sceneNumber?: number;
  createdAt: string;
  sizeBytes?: number;
  format: string;
  tags: string[];
}

export interface Project {
  id: string;
  title: string;
  topic: string;
  createdAt: string;
  updatedAt: string;
  status: "draft" | "generating" | "ready" | "published";
  contentGenome: ContentGenome;
  hooks: HookOption[];
  selectedHookId: string;
  script: ScriptStructure;
  scenes: Scene[];
  stages: PipelineStageState[];
  qualityReport: QualityReport;
  videoUrl?: string;
  voiceAudioUrl?: string;
  bgmUrl?: string;
  publishedPost?: PublishedPost;
  isDemoMode: boolean;
}
