"use client"; // Ce fichier est un Client Component

import { ReactNode } from "react";

interface PostTitleProps {
  children: ReactNode;
}

export default function PostTitle({ children }: PostTitleProps) {
  return (
    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
      {children}
    </h1>
  );
}
