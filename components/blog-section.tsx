"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { useState, useEffect } from "react";

// ✅ Define the Blog Post type explicitly
type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  author: {
    name: string;
    image: string;
  };
  tags: string[];
  readingTime: number;
};

export function BlogSection() {
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]); // ✅ Type the state properly

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/blog"); // ✅ Ensure this API returns BlogPost[]
        const data: BlogPost[] = await res.json(); // ✅ Explicitly cast response to BlogPost[]
        setLatestPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, []);

  return (
    <section id="blog" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-2">Latest Articles</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Thoughts, stories, and ideas about web development, design, and technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {latestPosts.map((post, index) => (
            <motion.div
              key={post.slug} // ✅ No more TypeScript error here
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`} passHref>
                <Card className="h-full overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="font-normal">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center pt-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{format(new Date(post.publishedAt), "MMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{post.readingTime} min read</span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
