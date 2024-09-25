"use client"; // Ce fichier est un Client Component

import React from "react";
import Link from "next/link";
import { BodyText } from "../../atoms/typography/bodyText/BodyText";
import { RiArrowDownSLine } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";

interface MenuItem {
  id: string;
  label?: string;
  path: string;
  children?: MenuItem[];
}

interface MenuProps {
  menuData: MenuItem[];
  isSticky: boolean;
}

const renderMenuItems = (items: MenuItem[] | undefined) => {
  if (!items) {
    console.error("Menu items are undefined.");
    return <p>No menu items available.</p>;
  }
  return items.map((item) => (
    <div
      key={item.id}
      className={`relative ${
        item.children && item.children.length > 0 ? "group" : ""
      }`}>
      {item.children && item.children.length > 0 ? (
        <div className="relative flex items-center justify-center gap-1">
          <Link legacyBehavior href={item.path}>
            <a>
              <BodyText
                size="lg"
                intent="medium"
                className="item uppercase main_font whitespace-nowrap group-hover:text-themeBlack transition group-hover:duration-500 py-2">
                {item.label}
              </BodyText>
            </a>
          </Link>
          <RiArrowDownSLine className="text-lg black whitespace-nowrap group-hover:text-themeBlack transition group-hover:duration-500" />
          <div className="opacity-0 absolute bg-principal p-2 top-10 left-0 invisible group-hover:opacity-100 group-hover:visible transition group-hover:duration-500 z-10 ease-in-out">
            {renderMenuItems(item.children)}
          </div>
        </div>
      ) : (
        <Link legacyBehavior href={item.path}>
          <a>
            <BodyText
              size="lg"
              intent="medium"
              className="main_font uppercase black whitespace-nowrap hover:text-themeBlack transition hover:duration-500 py-2">
              {item.label}
            </BodyText>
          </a>
        </Link>
      )}
    </div>
  ));
};

export const Menu = ({ isSticky, menuData }: MenuProps) => {
  return (
    <nav
      className={`bg-transparent hidden md:block black-menu ${
        isSticky ? "sticky" : ""
      }`}>
      <div className="container mx-auto px-5 md:px-0 flex items-center justify-center">
        <div className="flex items-center gap-14">
          <div className="hidden lg:block">
            <div className="flex justify-center gap-6">
              {renderMenuItems(menuData)}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
