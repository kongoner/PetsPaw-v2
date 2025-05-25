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
	const [breeds, setBreeds] = useState([]); // Breeds list for dropdown
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

	useEffect(() => {
		const fetchImages = async () => {
			setIsLoading(true);
			try {
				const { breed_ids, limit, order, mime_types } = filters;
				const params = { breed_ids, limit, order, page, mime_types };
				const res = await getGalleryImages(params);

				const cards = res.data.map((image) => ({
					id: image.id,
					url: image.url,
				}));

				setImages(cards);
				if (res.headers['pagination-count']) {
					const totalCount = parseInt(res.headers['pagination-count'], 10);
					const pageCount = Math.ceil(totalCount / limit);
					setTotalPages(pageCount);
				}
			} catch (err) {
				console.error('Failed to load breed images', err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchImages();
	}, [filters, page]);

	return (
		<div className={styles.page}>
			<div className={styles.toolsGallery}>
				<Breadcrumbs />
				<UploadButton onClick={() => setShowUploadPopup(true)} />
			</div>
			<div className={styles.filtersGallery}>
				<DropdownLabeled
					label='Order'
					alt='Order selector'
					onChange={(e) => {
						setStagedFilters((prev) => ({ ...prev, order: e.target.value }));
					}}
				>
					<option value='ASC'>Ascending</option>
					<option value='DESC'>Descending</option>
				</DropdownLabeled>
				<DropdownLabeled
					label='Image type'
					alt='Image type selector'
					disabled={stagedFilters.breed_ids}
					onChange={(e) => {
						setStagedFilters((prev) => ({
							...prev,
							mime_types: e.target.value,
						}));
					}}
				>
					<option value=''>All</option>
					<option value='jpg,png'>Static</option>
					<option value='gif'>Animated</option>
				</DropdownLabeled>
				<DropdownLabeled
					label='Breed'
					alt='Breed selector'
					disabled={stagedFilters.mime_types === 'gif'}
					onChange={(e) => {
						setStagedFilters((prev) => ({
							...prev,
							breed_ids: e.target.value,
						}));
					}}
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
						onChange={(e) => {
							setStagedFilters((prev) => ({
								...prev,
								limit: Number(e.target.value),
							}));
						}}
					>
						<option value='5'>5 items per page</option>
						<option value='10'>10 items per page</option>
						<option value='15'>15 items per page</option>
						<option value='20'>20 items per page</option>
					</DropdownLabeled>
					<ReloadButton
						onClick={() => {
							setFilters(stagedFilters);
							setPage(0);
						}}
					/>
				</div>
			</div>
			{isLoading ? (
				<Loader />
			) : (
				<div className={styles.gridWrapper}>
					<ImageGrid>
						{images.map((img) => (
							<GalleryFavouriteCard
								key={img.id}
								imageUrl={img.url}
								imageId={img.id}
							/>
						))}
					</ImageGrid>
					<Pagination page={page} setPage={setPage} totalPages={totalPages} />
				</div>
			)}
			{showUploadPopup && (
				<UploadPopup onClose={() => setShowUploadPopup(false)} />
			)}
		</div>
	);
}
