import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    dateModified: z.date().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
  }),
})

export const collections = { blog }
