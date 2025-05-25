import styles from './page.module.scss';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllBreeds } from '../api/breeds';
import Loader from '../components/Loader/Loader';

export default function BreedsInfoPage() {
	const { breedId } = useParams();
	const [breed, setBreed] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchBreed = async () => {
			try {
				const res = await getAllBreeds();
				const found = res.data.find((b) => b.id === breedId);
				setBreed(found || null);
			} catch (err) {
				console.error('Failed to fetch breed info', err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchBreed();
	}, [breedId]);

	if (isLoading) return <Loader />;
	if (!breed) return <p className={styles.error}>Breed not found</p>;

	return (
		<div className={styles.page}>
			<Breadcrumbs />
			<img
				className={styles.breedPageImg}
				src={breed.image?.url}
				alt={breed.name}
			/>
			<div className={styles.breedDescriptionWrapper}>
				<h2 className={styles.breedTitle}>{breed.name}</h2>
				<p className={styles.description}>{breed.description}</p>
				<div className={styles.breedDetails}>
					<div className={styles.details}>
						<h4>Temperament</h4>
						<p>{breed.temperament}</p>
					</div>
					<div className={styles.details}>
						<div className={styles.detail}>
							<h4>Origin:</h4>
							<p>{breed.origin}</p>
						</div>
						<div className={styles.detail}>
							<h4>Weight:</h4>
							<p>{breed.weight.metric}</p>
						</div>
						<div className={styles.detail}>
							<h4>Lifespan:</h4>
							<p>{breed.life_span} years</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
