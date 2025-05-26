import styles from './page.module.scss';
import { useEffect, useState } from 'react';
import { getAllBreeds } from '../api/breeds';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import Dropdown from '../components/Dropdowns/Dropdown';
import OrderRadioButton from '../components/OrderRadioButton/OrderRadioButton';
import ImageGrid from '../components/ImageGrid/ImageGrid';
import BreedCard from '../components/ImageCards/BreedCard';
import Loader from '../components/Loader/Loader';
import Pagination from '../components/Pagination/Pagination';

export default function BreedsPage() {
	// Unified filters state object
	const [filters, setFilters] = useState({
		breedId: '',
		limit: 5,
		order: 'ASC',
	});
	const [page, setPage] = useState(0);
	const [images, setImages] = useState([]);
	const [breeds, setBreeds] = useState([]);
	const [totalPages, setTotalPages] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const { breedId, limit, order } = filters;
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchBreeds() {
			try {
				const res = await getAllBreeds();
				setBreeds(res.data);
			} catch (err) {
				console.error('Failed to load breeds', err);
			}
		}
		fetchBreeds();
	}, []);

	useEffect(() => {
		async function fetchImages() {
			setIsLoading(true);
			try {
				let res;
				if (breedId) {
					res = await getAllBreeds();
				} else {
					res = await getAllBreeds({ limit, order, page });
				}
				let data = res.data.filter((b) => b.image?.url);
				if (breedId) data = data.filter((b) => b.id === breedId);
				setImages(
					data.map(({ id, image, name }) => ({
						id,
						url: image.url,
						name,
					})),
				);
				if (!breedId && res.headers['pagination-count']) {
					setTotalPages(
						Math.ceil(Number(res.headers['pagination-count']) / limit),
					);
				}
			} catch (err) {
				console.error('Failed to load breed images', err);
			} finally {
				setIsLoading(false);
			}
		}
		fetchImages();
	}, [breedId, limit, order, page]);

	// Generic filter handler
	const handleFilterChange = (field) => (e) => {
		setFilters((prev) => ({
			...prev,
			[field]: e.target.value,
		}));
		setPage(0);
	};

	const limitOptions = [5, 10, 15, 20];

	return (
		<div className={styles.page}>
			<div className={styles.breedPageToolbar}>
				<Breadcrumbs />
				<div className={styles.breedPageFilters}>
					{/* Breed selector dropdown */}
					<Dropdown
						id='breeds-selector'
						alt='Breeds selector'
						onChange={handleFilterChange('breedId')}
						value={breedId}
					>
						<option value=''>All breeds</option>
						{breeds.map((breed) => (
							<option key={breed.id} value={breed.id}>
								{breed.name}
							</option>
						))}
					</Dropdown>
					{/* Limit selector dropdown, disabled if filtering by breed */}
					<Dropdown
						id='limit-selector'
						alt='Limit selector'
						onChange={handleFilterChange('limit')}
						value={limit}
						disabled={!!breedId}
					>
						{limitOptions.map((val) => (
							<option key={val} value={val}>
								Limit: {val}
							</option>
						))}
					</Dropdown>
					{/* Order radio buttons, disabled if filtering by breed */}
					<OrderRadioButton
						value={order}
						onChange={handleFilterChange('order')}
						disabled={!!breedId}
					/>
				</div>
			</div>
			{/* Loader or image grid */}
			{isLoading ? (
				<Loader />
			) : (
				<div className={styles.gridWrapper}>
					<ImageGrid>
						{images.map(({ id, url, name }) => (
							<BreedCard
								key={id}
								imageUrl={url}
								breedName={name}
								onClick={() => navigate(`/breeds/${id}`)}
							/>
						))}
					</ImageGrid>
					{/* Pagination only if not filtering by breed */}
					{!breedId && (
						<Pagination page={page} setPage={setPage} totalPages={totalPages} />
					)}
				</div>
			)}
		</div>
	);
}
