"use client";
import { builder, Builder } from "@builder.io/react";
import Counter from "./components/molecules/Counter/Counter";
import Footer from "./components/organisms/Footer/Footer";
import FooterItem from "./components/molecules/navbar/FooterItem";
import { Menu } from "./components/molecules/navbar/Menu";
import PostCard from "./components/molecules/post/PostCard";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

Builder.register("editor.settings", {
  designTokensOptional: true, // <-- make your design tokens optional
  designTokens: {
    colors: [
      { name: "Bleu", value: "var(--primary-color, #063dcc)" },
      { name: "Beige", value: "var(--secondary-color, #fffeee)" },
    ],
    fontFamily: [
      { name: 'Regular', value: 'var(--regular-font, sans-serif)' },
      { name: 'Semi-bold', value: 'semi-bold-font, sans-serif' },
      { name: 'Thin', value: 'thin-font, sans-serif' },
    ]
  },
});
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
      hideFromUI: true,
      meta: {
        ts: "{ image: string; name: string; }",
      },
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
      defaultValue: false, // Vous pouvez définir une valeur par défaut
    },
    {
      name: "menuData",
      type: "list",
      subFields: [
        {
          name: "id",
          type: "string",
          required: true,
        },
        {
          name: "label",
          type: "string",
          required: true,
          defaultValue: "Menu Item",
        },
        {
          name: "path",
          type: "url",
          required: true,
          defaultValue: "/",
        },
        {
          name: "children",
          type: "list",
          subFields: [
            {
              name: "id",
              type: "string",
              required: true,
            },
            {
              name: "label",
              type: "string",
              required: true,
              defaultValue: "Sub Item",
            },
            {
              name: "path",
              type: "url",
              required: true,
              defaultValue: "/",
            },
          ],
        },
      ],
    },
  ],
});

Builder.registerComponent(Footer, {
  name: "Footer",
});

Builder.registerComponent(FooterItem, {
  name: "FooterItem",
  inputs: [
    {
      name: "text",
      type: "string",
      required: true,
    },
  ],
});

