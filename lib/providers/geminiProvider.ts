import {
  ContentGenome,
  HookOption,
  QualityReport,
  Scene,
  ScriptStructure,
} from "@/types/pipeline";
import { ILLMProvider } from "./types";
import { DemoLLMProvider } from "./demoProvider";

export class GeminiLLMProvider implements ILLMProvider {
  name = "Google Gemini 2.0 Flash / Pro";
  private apiKey: string;
  private fallback: DemoLLMProvider;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.fallback = new DemoLLMProvider();
  }

  async generateContentGenome(topic: string, partialOptions?: Partial<ContentGenome>): Promise<ContentGenome> {
    if (!this.apiKey) return this.fallback.generateContentGenome(topic, partialOptions);
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are the Lead Creative Director for Qoneqt CreatorX.
Generate a JSON Content Genome for the social video topic: "${topic}".
JSON schema:
{
  "topic": "${topic}",
  "audience": "string",
  "tone": "${partialOptions?.tone || "cinematic"}",
  "duration": ${partialOptions?.duration || 30},
  "language": "${partialOptions?.language || "English"}",
  "visualStyle": "${partialOptions?.visualStyle || "cinematic"}",
  "hookType": "string",
  "pacing": "fast",
  "cta": "Discover more on Qoneqt Global Feed",
  "captionStyle": "kinetic-neon",
  "voiceStyle": "documentary"
}
Output only raw valid JSON without markdown wrapping.`,
                  },
                ],
              },
            ],
          }),
        }
      );
      if (!response.ok) throw new Error("Gemini API error " + response.status);
      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      const cleanJson = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
      return JSON.parse(cleanJson);
    } catch {
      return this.fallback.generateContentGenome(topic, partialOptions);
    }
  }

  async generateHookBattle(topic: string, genome: ContentGenome): Promise<HookOption[]> {
    if (!this.apiKey) return this.fallback.generateHookBattle(topic, genome);
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Analyze topic "${topic}" and generate 3 competing viral hooks for a ${genome.duration}s vertical video.
Return a JSON array of 3 objects with schema:
[
  {
    "id": "hook_a",
    "title": "Hook A: The Paradox",
    "text": "...",
    "type": "Curiosity Paradox",
    "curiosity": 95,
    "clarity": 92,
    "engagement": 94,
    "rationale": "...",
    "selected": true
  },
  ...
]
Return raw JSON only.`,
                  },
                ],
              },
            ],
          }),
        }
      );
      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      const cleanJson = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
      return JSON.parse(cleanJson);
    } catch {
      return this.fallback.generateHookBattle(topic, genome);
    }
  }

  async generateScript(topic: string, selectedHook: HookOption, genome: ContentGenome): Promise<ScriptStructure> {
    if (!this.apiKey) return this.fallback.generateScript(topic, selectedHook, genome);
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Generate a structured 4-act social video script for topic "${topic}".
Hook to use: "${selectedHook.text}".
Duration: ${genome.duration}s.
Return raw JSON with structure:
{
  "hook": { "text": "...", "timing": "0-4 sec", "durationSec": 4 },
  "body": { "text": "...", "timing": "4-22 sec", "durationSec": 18 },
  "payoff": { "text": "...", "timing": "22-27 sec", "durationSec": 5 },
  "cta": { "text": "...", "timing": "27-30 sec", "durationSec": 3 },
  "fullScript": "..."
}`,
                  },
                ],
              },
            ],
          }),
        }
      );
      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      const cleanJson = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
      return JSON.parse(cleanJson);
    } catch {
      return this.fallback.generateScript(topic, selectedHook, genome);
    }
  }

  async generateScenePlan(script: ScriptStructure, genome: ContentGenome): Promise<Scene[]> {
    return this.fallback.generateScenePlan(script, genome);
  }

  async evaluateQuality(topic: string, script: ScriptStructure, scenes: Scene[]): Promise<QualityReport> {
    return this.fallback.evaluateQuality(topic, script, scenes);
  }
}
