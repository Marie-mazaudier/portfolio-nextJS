"use client"; // Ce fichier est un Client Component

import Avatar from "../avatar";
import CoverImage from "../cover-image";
import PostTitle from "./post-title";

interface PostHeaderProps {
  title: string;
  author: { name: string; image: string };
}

export default function PostHeader({ title, author }: PostHeaderProps) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        {author && <Avatar name={author.name} picture={author.image} />}
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0"></div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          {author && <Avatar name={author.name} picture={author.image} />}
        </div>
      </div>
    </>
  );
}
