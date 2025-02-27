import { NextResponse } from "next/server";
import { getSortedPosts } from "@/lib/blog";

export async function GET() {
  const posts = await getSortedPosts();
  return NextResponse.json(posts.slice(0, 3)); // Return only latest 3 posts
}
