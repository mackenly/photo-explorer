import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';
import { Photos } from '../../../utils/types';
import { getPhotos } from '../../../utils/photoFetcher';

export async function GET(request: Request) {
    // only accept requests from the same origin
    if (new URL(request.url).host !== request.headers.get('host')) {
        redirect('/');
    }

    // if API key is not set and valid, return 404
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');
    if (!process.env.NEXT_PUBLIC_API_KEY || !key || key !== process.env.NEXT_PUBLIC_API_KEY) {
        return new Response(null, { status: 404 });
    }
    
    // get photos using the page query param
    const page: number = Number(searchParams.get('page')) || 1;
    const photos = await getPhotos(page);
    return new Response(JSON.stringify(photos));
}

export const runtime = 'edge';