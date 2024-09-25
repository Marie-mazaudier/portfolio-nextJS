"use client"; // Ce fichier est un Client Component

import React from "react";

interface NavItemProps {
  label: string;
  href: string;
}

const NavItem: React.FC<NavItemProps> = ({ label, href }) => {
  return (
    <li className="flex flex-col w-4/12 max-md:ml-0 max-md:w-full">
      <a
        href={href}
        className="box-border relative shrink-0 my-auto m-auto h-auto text-nav font-regular tracking-wider text-left  text-primary">
        {label}
      </a>
    </li>
  );
};

export default NavItem;
