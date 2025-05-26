import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styles from './page.module.scss';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import { getAllBreeds } from '../api/breeds';
import BreedCard from '../components/ImageCards/BreedCard';
import Loader from '../components/Loader/Loader';
import ImageGrid from '../components/ImageGrid/ImageGrid';

export default function SearchResultsPage() {
	const [searchParams] = useSearchParams();
	const query = searchParams.get('query') || '';
	const [filteredBreeds, setFilteredBreeds] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchMatchingBreeds = async () => {
			setIsLoading(true);
			try {
				const res = await getAllBreeds();

				// Filter breeds that include the search query and have an image
				const matchedBreeds = res.data.filter(
					({ name, image }) =>
						name.toLowerCase().includes(query.toLowerCase()) && image?.url,
				);

				// Map to simplified card structure
				const filtered = matchedBreeds.map(({ id, name, image }) => ({
					id,
					name,
					url: image.url,
				}));

				setFilteredBreeds(filtered);
			} catch (err) {
				console.error('Failed to fetch breeds', err);
			} finally {
				setIsLoading(false);
			}
		};

		if (query.trim()) {
			fetchMatchingBreeds();
		}
	}, [query]);

	return (
		<div className={styles.page}>
			<Breadcrumbs />
			<p className='subtitle'>
				Search results for: <span className='subtitle bold'>{query}</span>
			</p>

			{isLoading ? (
				<Loader />
			) : filteredBreeds.length > 0 ? (
				<ImageGrid>
					{filteredBreeds.map(({ id, url, name }) => (
						<BreedCard
							key={id}
							imageUrl={url}
							breedName={name}
							onClick={() => navigate(`/breeds/${id}`)}
						/>
					))}
				</ImageGrid>
			) : (
				<p className={styles.nothingFound}>No item found</p>
			)}
		</div>
	);
}
