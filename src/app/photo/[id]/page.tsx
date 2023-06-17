import styles from './page.module.css';
import { getPhoto } from '../../../utils/photoFetcher';
import { Photo } from '../../../utils/types';

type Props = {
	params: {
		id: string;
	};
};

export default async function Image({ params }: Props) {
	const id = params.id;
	const photo: Photo = await getPhoto(id);
	console.log(photo);
	return (
		<main className={styles.main}>
			<p className={styles.photo_name}>
				{new Date(photo.created_at).getFullYear()}
				{new Date(photo.created_at).getMonth()}
				{new Date(photo.created_at).getDay()}-{photo.user.username.slice(0, 4)}
				.jpg
			</p>
			<div className={styles.image_container}>
				<img
					src={photo.urls.regular}
					alt={photo.alt_description}
					className={styles.image}
					width={photo.width}
					height={photo.height}
					style={{
						objectFit: photo.width > photo.height ? 'cover' : 'contain',
					}}
					title={'Photo of ' + photo.alt_description + ' by ' + photo.user.name + ' via Unsplash'}
				/>
			</div>
			<p className={styles.desc}>{photo.alt_description}</p>
			<p className={styles.credit}>
				Photo by{' '}
				<a
					href={photo.user.links.html + '?utm_source=photo_explorer&utm_medium=referral'}
					target="_blank"
					rel="noopener noreferrer"
				>
					{photo.user.name}
				</a>{' '}
				on{' '}
				<a href="https://unsplash.com/?utm_source=photo_explorer&utm_medium=referral" target="_blank" rel="noopener noreferrer">
					Unsplash
				</a>
			</p>
		</main>
	);
}
