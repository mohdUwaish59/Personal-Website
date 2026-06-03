import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

// Helper function to fetch blog posts
export async function getBlogPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    "coverImage": coverImage.asset->url,
    "author": author->{name, "image": image.asset->url},
    tags,
    readingTime,
    publishedAt,
    body
  }`;
  
  return await sanityClient.fetch(query);
}

// Helper function to fetch single blog post
export async function getBlogPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    "coverImage": coverImage.asset->url,
    "author": author->{name, "image": image.asset->url},
    tags,
    readingTime,
    publishedAt,
    body
  }`;
  
  return await sanityClient.fetch(query, { slug });
}
