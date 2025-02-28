import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import Image from "next/image";
import OnThisPage from "@/components/OnThisPage"; // ✅ Import sidebar

const postsDirectory = path.join(process.cwd(), "content/blog");

// ✅ Generate Static Paths
export async function generateStaticParams() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => ({
    slug: fileName.replace(".mdx", ""),
  }));
}

// ✅ Load & Parse Markdown into HTML
async function getPostContent(slug: string) {
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(fileContents);

  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeDocument, { title: data.title })
    .use(rehypeFormat)
    .use(rehypeStringify)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypePrettyCode, {
      theme: "github-dark",
      transformers: [
        transformerCopyButton({
          visibility: "always",
          feedbackDuration: 3000,
        }),
      ],
    });

  const htmlContent = (await processor.process(content)).toString();
  return { metadata: data, content: htmlContent };
}

// ✅ Render Blog Post Page with a Better Layout
export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostContent(params.slug);
  if (!post) return notFound();

  return (
    <section className="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-12">
      {/* ✅ Blog Content (Main Area) */}
      <article className="w-full lg:w-2/3">
        {/* ✅ Cover Image */}
        {post.metadata.coverImage && (
          <div className="mb-6">
            <Image
              src={post.metadata.coverImage}
              alt={post.metadata.title}
              width={800}
              height={400}
              className="rounded-lg"
            />
          </div>
        )}

        <h1 className="text-4xl font-bold">{post.metadata.title}</h1>
        <p className="text-gray-600 mt-2">
          {new Date(post.metadata.date).toLocaleDateString()} • {post.metadata.readingTime} min read
        </p>

        {/* ✅ Render Markdown as HTML */}
        <div
          dangerouslySetInnerHTML={{ __html: post.content }}
          className="prose prose-lg dark:prose-invert mt-6 scroll-smooth [&_h2]:scroll-mt-24 [&_h3]:scroll-mt-24"
        ></div>

      </article>

      {/* ✅ Sidebar (On This Page Navigation) */}
      <aside className="hidden lg:block w-1/3">
        <OnThisPage htmlContent={post.content} />
      </aside>
    </section>
  );
}
