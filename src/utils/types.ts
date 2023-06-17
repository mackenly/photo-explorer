type Photo = {
    id: string;
    created_at: string;
    width: number;
    height: number;
    alt_description: string;
    urls: { large: string; regular: string; raw: string; small: string };
    links: { html: string };
    color: string | null;
    user: {
        username: string;
        name: string;
        twitter_username: string | null;
        instagram_username: string | null;
        portfolio_url: string | null;
        links: { html: string };
        profile_image: { small: string; medium: string; large: string };
    };
};

type Photos = Photo[];

export type { Photo, Photos };