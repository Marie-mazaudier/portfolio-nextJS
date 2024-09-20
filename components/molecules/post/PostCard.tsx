'use client';

import Avatar from '../avatar';
import CoverImage from '../cover-image';
import Link from 'next/link';

interface PostCardProps {
  intro: string;
  title: string;
  coverImage: string;
  author: {
    image: string;
    name: string;
  };
  slug: string;
}

export default function PostCard({ title, coverImage, author, slug, intro }: PostCardProps) {
  return (
    <div className="mx-3">
      <div className="mb-5">
        <CoverImage title={title} slug={slug} url={coverImage} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
      <Link href={`/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      <p className="text-lg leading-relaxed mb-4">{intro}</p>
      {author && <Avatar name={author.name} picture={author.image} />}
    </div>
  );
}
