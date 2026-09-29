from typing import List, Optional
from pydantic import BaseModel, Field

class ContentGenome(BaseModel):
    topic: str
    audience: str = "Curious social media innovators"
    tone: str = "curious"
    duration: int = 30
    language: str = "English"
    visualStyle: str = "cinematic"
    hookType: str = "Curiosity Paradox"
    pacing: str = "fast"
    cta: str = "Discover more on Qoneqt Global Feed"
    captionStyle: str = "kinetic-neon"
    voiceStyle: str = "documentary"

class HookOption(BaseModel):
    id: str
    title: str
    text: str
    type: str
    curiosity: int
    clarity: int
    engagement: int
    rationale: str
    selected: bool = False

class ScriptSection(BaseModel):
    text: str
    timing: str
    durationSec: int

class ScriptStructure(BaseModel):
    hook: ScriptSection
    body: ScriptSection
    payoff: ScriptSection
    cta: ScriptSection
    fullScript: str

class Scene(BaseModel):
    id: str
    sceneNumber: int
    title: str
    purpose: str
    startSec: int
    endSec: int
    durationSec: int
    visualPrompt: str
    camera: str
    mediaType: str = "image"
    mediaUrl: str
    voiceNarration: str
    captionText: str
    status: str = "ready"
    fallbackUsed: Optional[bool] = False

class QualityReport(BaseModel):
    hookScore: int
    storyScore: int
    visualMatchScore: int
    audioSyncScore: int
    captionScore: int
    overallScore: int
    verdict: str
    diagnosticFeedback: List[str]
    problematicSceneId: Optional[str] = None
    evaluatedAt: str

class PublishedPost(BaseModel):
    id: str
    projectId: str
    title: str
    description: str
    hashtags: List[str]
    thumbnailUrl: str
    publishedAt: str
    feedUrl: str
    views: int = 1
    likes: int = 1
    remixes: int = 0
    comments: int = 0

class Project(BaseModel):
    id: str
    title: str
    topic: str
    createdAt: str
    updatedAt: str
    status: str = "ready"
    contentGenome: ContentGenome
    hooks: List[HookOption]
    selectedHookId: str
    script: ScriptStructure
    scenes: List[Scene]
    qualityReport: QualityReport
    isDemoMode: bool = True
