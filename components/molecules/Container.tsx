"use client"; // Ce fichier est un Client Component

import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return <div className="container mx-auto px-5">{children}</div>;
}
