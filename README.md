# Qoneqt Content Automation Platform

A content creation system built for the Qoneqt Global Feed challenge at CTRL FREAK 2026.

The main idea is to simplify the process of turning a topic, prompt, idea or trend into a complete video that can be used as content for the Qoneqt Global Feed.

## Team

Team Name: Six 7

Team ID: team-3F55E76C267F

Team Members:
- Amey Diwakar Pawar
- Qasim Zarak Khan
- Aaftab Sayyed

Hackathon: CTRL FREAK 2026
Challenge: Qoneqt
Venue: York•IE, Ahmedabad

## Problem

Creating good video content involves multiple steps such as deciding the concept, writing the script, planning scenes, creating visuals, generating voice and finally putting everything together.

Doing these steps manually takes time and also makes it difficult to produce content consistently.

The challenge is to build a repeatable pipeline that can take a topic, prompt, idea or trend and turn it into a complete and engaging video for the Qoneqt Global Feed.

## Our Solution

We built a content automation pipeline that connects the different stages of video creation into one workflow.

The basic flow is:

Input
→ AI Processing
→ Script and Story
→ Scene Planning
→ Visual and Video Generation
→ Composition
→ Final Video

The user provides an idea, topic, prompt or trend. The system processes the input and converts it into structured content that can be used to create the final video.

## How It Works

### 1. Input

The user provides the initial content idea.

Examples:
- Topic
- Prompt
- Idea
- Trend

### 2. Content Generation

The AI processes the input and works on the creative direction, hook, script and story.

### 3. Scene Planning

The generated content is divided into scenes.

Each scene can contain information such as:
- Scene order
- Content
- Visual requirements
- Narration
- Timing

### 4. Visual and Video Generation

The planned scenes are converted into the required visual and video assets using the selected AI models and APIs.

### 5. Composition

The generated assets are processed and combined into the final video.

### 6. Final Output

The final result is a complete video that can be used as content for the Qoneqt Global Feed.

## System Architecture

The overall architecture follows this flow:

User Input
    |
    v
Web Interface
    |
    v
Backend / Orchestrator
    |
    +------> LLM
    |          |
    |          v
    |       Script / Story
    |
    +------> Scene Planning
    |          |
    |          v
    |       Scene Structure
    |
    +------> Multimodal Processing
    |          |
    |          v
    |       Visuals / Video
    |
    v
Composition and Processing
    |
    v
Final Video
    |
    v
Qoneqt Global Feed

## Key Features

### AI-assisted Script Generation

Converts the initial idea into a structured script suitable for video content.

### Scene Planning

Breaks the generated content into individual scenes and defines what is required for each part.

### Automated Content Pipeline

Connects multiple stages of content production instead of requiring the user to handle every stage separately.

### Visual and Video Processing

Uses AI models and media processing tools to create or assemble the required visual content.

### Final Video Generation

Combines the generated assets into a complete video ready for publishing.

### Repeatable Workflow

The same pipeline can be used for different topics, prompts and content ideas.

## Technology Stack

### Frontend
- Next.js
- React
- Tailwind CSS

### Backend
- Add the backend framework actually used in the project here

### AI
- LLM API
- Multimodal AI models
- Prompt-based content generation

### Video Processing
- Add the video generation or processing technology actually used here

### Development Tools
- Git
- GitHub
- Visual Studio Code
- Node.js
- npm

## Project Structure

```text
Qoneqt-PulseForge/
│
├── frontend/
├── backend/
├── agents/
├── assets/
├── public/
├── README.md
├── package.json
├── requirements.txt
├── .env.example
└── .gitignore
