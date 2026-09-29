import { NextResponse } from "next/server";
import { PublishedPost } from "@/types/pipeline";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { projectId, title, description, hashtags, thumbnailUrl } = body;

    const publishedPost: PublishedPost = {
      id: "post_" + Math.random().toString(36).substring(2, 9),
      projectId: projectId || "proj_temp",
      title: title || "Qoneqt CreatorX Production",
      description: description || "Autonomous video production",
      hashtags: Array.isArray(hashtags)
        ? hashtags
        : typeof hashtags === "string"
        ? hashtags.split(/\s+/).filter(Boolean)
        : ["#QoneqtCreatorX"],
      thumbnailUrl: thumbnailUrl || "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=600&q=80",
      publishedAt: "Just now",
      feedUrl: "/feed",
      views: 1,
      likes: 1,
      remixes: 0,
      comments: 0,
      author: {
        name: "CreatorX Studio",
        handle: "@creatorx_studio",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        verified: true,
      },
    };

    return NextResponse.json({ success: true, post: publishedPost }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Publishing failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
