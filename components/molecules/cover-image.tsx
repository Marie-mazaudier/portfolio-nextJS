"use client"; // Ce fichier est un Client Component

import BuilderImage from "../atoms/builder-image";
import Link from "next/link";
import cn from "classnames";

interface CoverImageProps {
  title: string;
  url: string;
  slug: string;
}

export default function CoverImage({ title, url, slug }: CoverImageProps) {
  const image = (
    <BuilderImage
      width={2000}
      height={1000}
      alt={`Cover Image for ${title}`}
      className={cn("shadow-small", {
        "hover:shadow-medium transition-shadow duration-200": slug,
      })}
      src={url}
    />
  );

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link legacyBehavior href={`/blog/${slug}`}>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
