import { builder } from '@builder.io/sdk';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export async function fetchBlogPosts(limit: number = 4) {
  const content = await builder.getAll('post', {
    limit: limit,
  });
  return content;
}
