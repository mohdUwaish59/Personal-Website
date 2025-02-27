import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/blog");

export async function getSortedPosts() {
  try {
    const fileNames = fs.readdirSync(postsDirectory);

    const posts = fileNames
      .map((fileName) => {
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);

        return {
          slug: fileName.replace(".mdx", ""),
          title: data.title,
          excerpt: data.excerpt,
          coverImage: data.coverImage || "/default-cover.jpg",
          author: data.author || { name: "Unknown", image: "/default-avatar.jpg" },
          tags: data.tags || [],
          readingTime: data.readingTime || 5,
          publishedAt: data.publishedAt ? new Date(data.publishedAt).toISOString() : new Date().toISOString(), // ✅ Ensure it's always a valid date
        };
      })
      .sort((a, b) => {
        const dateA = new Date(a.publishedAt).getTime();
        const dateB = new Date(b.publishedAt).getTime();
        return dateB - dateA; // ✅ Sort in descending order
      });

    console.log("✅ getSortedPosts() returned:", posts); // Debugging Log
    return posts; // Ensure an array is returned
  } catch (error) {
    console.error("❌ Error reading blog posts:", error);
    return []; // Return empty array if an error occurs
  }
}
