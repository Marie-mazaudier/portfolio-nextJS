import { fetchBlogPosts } from '../lib/fetchBlogPosts';
import Layout from '../../components/Layout';
import Intro from '../../components/molecules/Intro';
import PostCard from '../../components/molecules/post/PostCard';

export const revalidate = 10; // Régénérer toutes les 10 secondes

export default async function Blog() {
  const content = await fetchBlogPosts();

  if (!content || content.length === 0) {
    console.error('No content fetched');
    return <div>No content available</div>;
  }

  const allPosts = content;
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <Layout>
      <Intro />
      {heroPost && (
        <PostCard
          intro={heroPost.data?.intro}
          key={heroPost.data?.slug}
          title={heroPost.data?.title}
          coverImage={heroPost.data?.image}
          author={heroPost.data?.author}
          slug={heroPost.data?.slug}
        />
      )}
      {morePosts.length > 0 && (
        <section>
          <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
            Latest
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32">
            {morePosts.map((post: any) => (
              <PostCard
                intro={post.data.intro}
                key={post.data.slug}
                title={post.data.title}
                coverImage={post.data.image}
                author={post.data.author}
                slug={post.data.slug}
              />
            ))}
          </div>
        </section>
      )}
    </Layout>
  );
}
