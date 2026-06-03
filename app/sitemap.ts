import { MetadataRoute } from 'next';
import { client } from "@/sanity/lib/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.finishrichafrica.com';

  // Fetch all post slugs from Sanity
  const posts = await client.fetch(`*[_type == "post"]{ "slug": slug.current, _updatedAt }`);

  const postEntries = posts.map((post: any) => ({
    url: `${baseUrl}/journal/${post.slug}`,
    lastModified: new Date(post._updatedAt),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/journal`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...postEntries,
  ];
}
