'use client';

import { useState, useEffect } from 'react';
import { Photo, Photos } from '../utils/types';
import styles from './PhotoGrid.module.css';
import Link from 'next/link';

interface Props {
	initialPhotos: Photos;
}

export default function PhotoGrid({ initialPhotos }: Props) {
	const [photos, setPhotos] = useState(initialPhotos);
	let page = 1;

	// after page load, fetch more photos
	useEffect(() => {
		page = 1;
		addPhotos();
	}, []);

	// Make a request to get more photos
	async function getPhotos() {
		page += 1;
		const res = await fetch('/api/photos?page=' + page + `&key=${process.env.NEXT_PUBLIC_API_KEY}`);
		const data = await res.json();
		return data;
	}

	function addPhotos() {
		// Get the photos
		getPhotos().then((new_photos) => {
			new_photos.forEach((photo: Photo) => {
				// if photo is already in photos, don't add it
				if (photos.some((p) => p.id === photo.id)) return;
				setPhotos((prevPhotos) => [...prevPhotos, photo]);
			});
		});
	}

	// add event listener to window to detect when user has scrolled to bottom of page
	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	function handleScroll() {
		// if user has scrolled to bottom of page, add more photos
		if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
			addPhotos();
		}
	}

	return (
		<div className={styles.grid}>
			{photos.map((photo) => (
				<Link
					href={`/photo/${photo.id}`}
					key={photo.id}
					className={styles.card_link}
					title={'Photo of ' + photo.alt_description + ' by ' + photo.user.name + ' via Unsplash'}
				>
					<div key={photo.id} className={styles.card}>
						<div className={styles.card_image}>
							<img
								src={photo.urls.small}
								alt={'Photo of ' + photo.alt_description + ' by ' + photo.user.name}
								id={photo.id}
								width={photo.width}
								height={photo.height}
							/>
						</div>
						<p className={styles.photo_name}>
							{new Date(photo.created_at).getFullYear()}
							{new Date(photo.created_at).getMonth()}
							{new Date(photo.created_at).getDay()}-{photo.user.username.slice(0, 4)}
							.jpg
						</p>
					</div>
				</Link>
			))}
		</div>
	);
}
