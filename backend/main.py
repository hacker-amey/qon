from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict, Any

from .models import Project, PublishedPost, QualityReport
from .orchestrator import PythonPipelineOrchestrator

app = FastAPI(
    title="Qoneqt CreatorX API",
    description="Autonomous Content Production Pipeline Engine for Qoneqt",
    version="2.4.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

orchestrator = PythonPipelineOrchestrator()

# In-memory storage for local dev
projects_db: Dict[str, Project] = {}

class GenerateRequest(BaseModel):
    topic: str = "Why do humans dream?"
    duration: int = 30
    tone: str = "curious"

class PublishRequest(BaseModel):
    projectId: str
    title: str
    description: str
    hashtags: list[str]

@app.get("/")
def read_root():
    return {
        "product": "Qoneqt CreatorX",
        "tagline": "From idea to feed, automatically.",
        "status": "operational",
        "demoMode": True
    }

@app.post("/api/projects", response_model=Project)
def create_project(req: GenerateRequest):
    proj = orchestrator.execute_pipeline(req.topic, req.duration, req.tone)
    projects_db[proj.id] = proj
    return proj

@app.post("/api/projects/{id}/generate", response_model=Project)
def generate_project(id: str, req: GenerateRequest):
    proj = orchestrator.execute_pipeline(req.topic, req.duration, req.tone)
    proj.id = id
    projects_db[id] = proj
    return proj

@app.get("/api/projects/{id}", response_model=Project)
def get_project(id: str):
    if id in projects_db:
        return projects_db[id]
    # Return standard sample if not in memory
    proj = orchestrator.execute_pipeline("Why do humans dream?")
    proj.id = id
    return proj

@app.post("/api/scenes/{id}/regenerate")
def regenerate_scene(id: str, payload: Dict[str, Any]):
    return {
        "sceneId": id,
        "status": "regenerated",
        "mediaUrl": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1080&q=80",
        "message": "Scene asset rerolled successfully."
    }

@app.post("/api/publish")
def publish_to_qoneqt(req: PublishRequest):
    return {
        "success": True,
        "postId": f"feed_post_{req.projectId}",
        "feedUrl": f"/feed/{req.projectId}",
        "message": "Video successfully indexed & broadcast to Qoneqt Global Feed."
    }
