import { Photos, Photo } from './types';

export async function getPhotos(page: number): Promise<Photos> {
    const pageParam = page ? `&page=${page}&` : '';
    try {
        // get some photos
        const res = await fetch(`https://api.unsplash.com/photos?${pageParam}per_page=30&order_by=popular`, {
            headers: {
                Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
            },
        });
        const photos: Photos = await res.json();
        return photos;
    } catch (error) {
        console.log(error);
    }
    return [] as Photos;
}

export async function getPhoto(id: string): Promise<Photo> {
    try {
        // get photo
        const res = await fetch(`https://api.unsplash.com/photos/${id}`, {
            headers: {
                Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
            },
        });
        const photo: Photo = await res.json();
        return photo;
    } catch (error) {
        console.log(error);
    }
    return {} as Photo;
}

export const runtime = 'edge';