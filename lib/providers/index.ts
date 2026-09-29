import { IAIProviderBundle } from "./types";
import {
  DemoImageProvider,
  DemoLLMProvider,
  DemoTTSProvider,
  DemoVideoProvider,
} from "./demoProvider";
import { GeminiLLMProvider } from "./geminiProvider";

export function getAIProviders(): IAIProviderBundle {
  const geminiKey = process.env.GEMINI_API_KEY;
  const hasLiveLLM = Boolean(geminiKey && geminiKey.trim().length > 10);

  const llm = hasLiveLLM ? new GeminiLLMProvider(geminiKey!) : new DemoLLMProvider();
  const image = new DemoImageProvider();
  const video = new DemoVideoProvider();
  const tts = new DemoTTSProvider();

  return {
    llm,
    image,
    video,
    tts,
    isDemoMode: !hasLiveLLM,
    activeProviderName: hasLiveLLM ? "Hybrid (Gemini 2.0 Flash + Neural Media Engine)" : "CreatorX Demo Mode (Offline High-Fidelity)",
  };
}

export * from "./types";
export * from "./demoProvider";
