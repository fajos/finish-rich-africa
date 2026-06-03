import { groq } from 'next-sanity'

export const postsQuery = groq`*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  mainImage,
  publishedAt,
  excerpt,
  "author": author->name,
  "categories": categories[]->title
}`

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  mainImage,
  publishedAt,
  excerpt,
  "author": author->name,
  "categories": categories[]->title,
  body
}`
