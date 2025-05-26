import styles from './page.module.scss';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getBreedById } from '../api/breeds'; // For Breed details
import { getGalleryImages } from '../api/gallery'; // For carousel images
import Loader from '../components/Loader/Loader';
import Carousel from '../components/Carousel/Carousel';

export default function BreedInfoPage() {
	const { breedId } = useParams();
	const [breed, setBreed] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [breedImages, setBreedImages] = useState([]);

	useEffect(() => {
		// Fetch breed details and gallery images in parallel
		const fetchBreedDetails = async () => {
			try {
				const res = await getBreedById(breedId);
				setBreed(res.data);
			} catch (err) {
				console.error('Failed to fetch breed info', err);
			}
		};

		const fetchBreedImages = async () => {
			try {
				const res = await getGalleryImages({
					breed_ids: breedId,
					limit: 5,
					order: 'ASC',
				});
				setBreedImages(res.data);
			} catch (err) {
				console.error('Failed to fetch gallery images', err);
			}
		};

		setIsLoading(true);
		Promise.all([fetchBreedDetails(), fetchBreedImages()]).finally(() =>
			setIsLoading(false),
		);
	}, [breedId]);

	if (isLoading) return <Loader />;
	if (!breed)
		return (
			<>
				<p className={styles.error}>Breed not found</p>
				{/* Display raw API response temporarily for debugging */}
				<pre>{JSON.stringify(breed, null, 2)}</pre>
			</>
		);

	const { name, description, temperament, origin, weight, life_span } = breed;

	return (
		<div className={styles.page}>
			<Breadcrumbs />
			<Carousel data={breedImages} />
			<div className={styles.breedDescriptionWrapper}>
				<h2 className={styles.breedTitle}>{name}</h2>
				<p className={styles.description}>{description}</p>
				<div className={styles.breedDetails}>
					<div className={styles.details}>
						<h4>Temperament</h4>
						<p>{temperament}</p>
					</div>
					<div className={styles.details}>
						<div className={styles.detail}>
							<h4>Origin:</h4>
							<p>{origin}</p>
						</div>
						<div className={styles.detail}>
							<h4>Weight:</h4>
							<p>{weight.metric}</p>
						</div>
						<div className={styles.detail}>
							<h4>Lifespan:</h4>
							<p>{life_span} years</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
