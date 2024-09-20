import { builder, BuilderContent } from '@builder.io/sdk';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export async function fetchBlogPost(slug: string): Promise<BuilderContent | null> {
  const content = await builder.get('post', {
    query: {
      'data.slug': slug,
    },
  }).toPromise();

  // Vérifiez que le contenu a des données et qu'il est bien du type BuilderContent
  if (content && content.data) {
    return content as BuilderContent;
  }

  console.error('No content found');
  return null;
}
