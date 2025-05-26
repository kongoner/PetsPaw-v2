import styles from './page.module.scss';
import { useEffect, useState } from 'react';
import { getAllBreeds } from '../api/breeds';
import { getGalleryImages } from '../api/gallery';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import UploadButton from '../components/Buttons/UploadButton/UploadButton';
import DropdownLabeled from '../components/Dropdowns/DropdownLabeled';
import ReloadButton from '../components/Buttons/ReloadButton/ReloadButton';
import ImageGrid from '../components/ImageGrid/ImageGrid';
import GalleryFavouriteCard from '../components/ImageCards/GalleryFavouriteCard';
import Pagination from '../components/Pagination/Pagination';
import Loader from '../components/Loader/Loader';
import UploadPopup from '../components/Upload/UploadPopup';

export default function GalleryPage() {
	const [breeds, setBreeds] = useState([]);
	const [images, setImages] = useState([]);
	const [filters, setFilters] = useState({
		breed_ids: null,
		mime_types: null,
		limit: 5,
		order: 'ASC',
	});
	const [stagedFilters, setStagedFilters] = useState(filters);
	const [page, setPage] = useState(0);
	const [totalPages, setTotalPages] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [showUploadPopup, setShowUploadPopup] = useState(false);

	// Load breed list for dropdown
	useEffect(() => {
		const fetchBreeds = async () => {
			try {
				const res = await getAllBreeds();
				setBreeds(res.data);
			} catch (err) {
				console.error('Failed to load breeds', err);
			}
		};

		fetchBreeds();
	}, []);

	// Load gallery images whenever filters or page changes
	useEffect(() => {
		const fetchImages = async () => {
			setIsLoading(true);
			try {
				const { breed_ids, limit, order, mime_types } = filters;
				const params = { breed_ids, limit, order, page, mime_types };
				const res = await getGalleryImages(params);

				const galleryImages = res.data.map((img) => ({
					id: img.id,
					url: img.url,
				}));

				setImages(galleryImages);

				// Update total pages based on header
				if (res.headers['pagination-count']) {
					const totalCount = parseInt(res.headers['pagination-count'], 10);
					const pageCount = Math.ceil(totalCount / limit);
					setTotalPages(pageCount);
				}
			} catch (err) {
				console.error('Failed to load gallery images', err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchImages();
	}, [filters, page]);

	// Handlers to stage filters before applying
	const handleStagedFilterChange = (key, value) => {
		setStagedFilters((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const handleReload = () => {
		setFilters(stagedFilters);
		setPage(0);
	};

	return (
		<div className={styles.page}>
			<div className={styles.toolsGallery}>
				<Breadcrumbs />
				<UploadButton onClick={() => setShowUploadPopup(true)} />
			</div>

			{/* Filter dropdowns */}
			<div className={styles.filtersGallery}>
				<DropdownLabeled
					label='Order'
					alt='Order selector'
					onChange={(e) => handleStagedFilterChange('order', e.target.value)}
				>
					<option value='ASC'>Ascending</option>
					<option value='DESC'>Descending</option>
				</DropdownLabeled>

				<DropdownLabeled
					label='Image type'
					alt='Image type selector'
					disabled={stagedFilters.breed_ids}
					onChange={(e) =>
						handleStagedFilterChange('mime_types', e.target.value)
					}
				>
					<option value=''>All</option>
					<option value='jpg,png'>Static</option>
					<option value='gif'>Animated</option>
				</DropdownLabeled>

				<DropdownLabeled
					label='Breed'
					alt='Breed selector'
					disabled={stagedFilters.mime_types === 'gif'}
					onChange={(e) =>
						handleStagedFilterChange('breed_ids', e.target.value)
					}
				>
					<option value=''>All breeds</option>
					{breeds.map((breed) => (
						<option key={breed.id} value={breed.id}>
							{breed.name}
						</option>
					))}
				</DropdownLabeled>

				<div className={styles.dropdownWithReload}>
					<DropdownLabeled
						label='Limit'
						alt='Limit selector'
						onChange={(e) =>
							handleStagedFilterChange('limit', Number(e.target.value))
						}
					>
						<option value='5'>5 items per page</option>
						<option value='10'>10 items per page</option>
						<option value='15'>15 items per page</option>
						<option value='20'>20 items per page</option>
					</DropdownLabeled>
					<ReloadButton onClick={handleReload} />
				</div>
			</div>

			{/* Image results */}
			{isLoading ? (
				<Loader />
			) : (
				<div className={styles.gridWrapper}>
					<ImageGrid>
						{images.map(({ id, url }) => (
							<GalleryFavouriteCard key={id} imageUrl={url} imageId={id} />
						))}
					</ImageGrid>
					<Pagination page={page} setPage={setPage} totalPages={totalPages} />
				</div>
			)}

			{/* Upload modal */}
			{showUploadPopup && (
				<UploadPopup onClose={() => setShowUploadPopup(false)} />
			)}
		</div>
	);
}
