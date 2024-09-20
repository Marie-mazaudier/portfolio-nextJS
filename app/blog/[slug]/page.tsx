import { fetchBlogPost } from '../../lib/fetchBlogPost';
import Layout from '../../../components/Layout';
import PostHeader from '../../../components/molecules/post/post-header';
import PostCard from '../../../components/molecules/post/PostCard';
export const revalidate = 10; // Régénérer toutes les 10 secondes

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const content = await fetchBlogPost(slug);
  console.log('content', content);

  if (!content) {
    console.error('No content fetched');
    return <div>No content available</div>;
  }

  return (
    <Layout>
    
      <PostCard
          intro={content.data?.intro}
          key={content.data?.slug}
          title={content.data?.title}
          coverImage={content.data?.image}
          author={content.data?.author}
          slug={content.data?.slug}
        />
    </Layout>
  );
}
