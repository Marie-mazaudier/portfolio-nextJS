"use client";
import { builder, Builder } from "@builder.io/react";
import Counter from "./components/molecules/Counter/Counter";
import Footer from "./components/organisms/Footer/Footer";
import FooterItem from "./components/molecules/navbar/FooterItem";
import { Menu } from "./components/molecules/navbar/Menu";
import PostCard from "./components/molecules/post/PostCard";
import List from "./components/atoms/list/list";
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

// Design tokens settings
Builder.register("editor.settings", {
  designTokensOptional: true, // Make your design tokens optional
  designTokens: {
    colors: [
      { name: "Bleu", value: "var(--primary-color, #063dcc)" },
      { name: "Beige", value: "var(--secondary-color, #fffeee)" },
    ],
    fontFamily: [
      { name: "Regular", value: "var(--regular-font, sans-serif)" },
      { name: "Semi-bold", value: "semi-bold-font, sans-serif" },
      { name: "Thin", value: "thin-font, sans-serif" },
    ],
  },
});

// Enregistrement du composant List avec support de l'option gap
Builder.registerComponent(List, {
  name: "List",
  inputs: [
    {
      name: "lists",
      type: "list",
      subFields: [
        {
          name: "listItem",
          type: "string",
          required: true,
          defaultValue: "Item",
        },
      ],
      required: true,
      defaultValue: [{ listItem: "Item 1" }, { listItem: "Item 2" }],
    },
    {
      name: "direction",
      type: "string",
      enum: ["horizontal", "vertical"],
      defaultValue: "horizontal",
    },
    {
      name: "alignment",
      type: "string",
      enum: ["left", "center", "right"],
      defaultValue: "center",
    },
    {
      name: "separator",
      type: "boolean",
      defaultValue: false,
    },
    {
      name: "separatorHeight",
      type: "string",
      defaultValue: "2px",
    },
    {
      name: "separatorColor",
      type: "color",
      defaultValue: "#fff", // Couleur par défaut du séparateur en noir
    },
    {
      name: "gap",
      type: "number",
      defaultValue: 50, // Espacement par défaut de 50px entre les éléments
    },
    {
      name: "className",
      type: "string",
      required: false,
    },
  ],
});

// Register other components like Counter, Footer, Menu, etc.
Builder.registerComponent(Counter, {
  name: "Counter",
  inputs: [
    {
      name: "initialCount",
      type: "number",
    },
  ],
});

Builder.registerComponent(PostCard, {
  name: "PostCard",
  inputs: [
    {
      name: "author",
      type: "object",
      meta: { ts: "{ image: string; name: string; }" },
      required: true,
    },
    {
      name: "coverImage",
      type: "string",
      required: true,
    },
    {
      name: "intro",
      type: "string",
      required: true,
    },
    {
      name: "slug",
      type: "string",
      required: true,
    },
    {
      name: "title",
      type: "string",
      required: true,
    },
  ],
});

Builder.registerComponent(Menu, {
  name: "Menu",
  inputs: [
    {
      name: "isSticky",
      type: "boolean",
      required: true,
      defaultValue: false,
    },
    {
      name: "menuData",
      type: "list",
      subFields: [
        { name: "id", type: "string", required: true },
        {
          name: "label",
          type: "string",
          required: true,
          defaultValue: "Menu Item",
        },
        { name: "path", type: "url", required: true, defaultValue: "/" },
        {
          name: "children",
          type: "list",
          subFields: [
            { name: "id", type: "string", required: true },
            {
              name: "label",
              type: "string",
              required: true,
              defaultValue: "Sub Item",
            },
            { name: "path", type: "url", required: true, defaultValue: "/" },
          ],
        },
      ],
    },
  ],
});

Builder.registerComponent(Footer, { name: "Footer" });

Builder.registerComponent(FooterItem, {
  name: "FooterItem",
  inputs: [{ name: "text", type: "string", required: true }],
});
