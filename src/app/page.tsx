import styles from './page.module.css';
import { getPhotos } from '../utils/photoFetcher';
import PhotoGrid from '../components/PhotoGrid';
import { Photos } from '@/utils/types';

export default async function Page() {
	const photos: Photos = await getPhotos(1) as Photos;
	return (
		<>
			<header className={styles.header}>
				<h1 className={styles.title}>
					gallery <span className={styles.thin}>/ popular</span>
				</h1>
			</header>
			<main className={styles.main}>
				<PhotoGrid initialPhotos={photos} />
			</main>
			<footer className={styles.footer}>
				<p className={styles.footer_text}>
					Photos from{' '}
					<a href="https://unsplash.com?utm_source=photo_explorer&utm_medium=referral" target="_blank" rel="noopener noreferrer">
						Unsplash
					</a>
					{' | Made by '}
					<a href="https://mackenly.com" target="_blank" rel="noopener noreferrer">
						Mackenly Jones
					</a>
					{' | Inspired by '}
					<a href="https://dribbble.com/shots/20251335-slrncl-moments" target="_blank" rel="noopener noreferrer">
						slrncl/moments
					</a>
				</p>
			</footer>
		</>
	);
}

export const runtime = 'edge';