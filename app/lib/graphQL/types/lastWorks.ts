export interface FeaturedImageNode {
    mediaItemUrl: string;
    altText: string;
}

export interface FeaturedImage {
    node: FeaturedImageNode;
}

export interface TypeDeProjetsNode {
    name: string;
    slug: string;
}

export interface TypeDeProjets {
    nodes: TypeDeProjetsNode[];
}

export interface work {
    title: string;
    featuredImage: FeaturedImage;
    excerpt: string;
    date: string;
    typeDeProjets: TypeDeProjets;
    slug: string;
}

export interface PostsData {
    posts: {
        nodes: work[];
    };
}