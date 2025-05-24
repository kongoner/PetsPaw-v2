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
    const [images, setImages] = useState([]);
    const [breeds, setBreeds] = useState([]);
    const [breedId, setBreedId] = useState(null)
    const [limit, setLimit] = useState(5);
    const [order, setOrder] = useState('ASC');
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchImages = async () => {
            setIsLoading(true);
            try {
                let res;
                if (breedId) {
                    res = await getAllBreeds(); // no filters
                } else {
                    const params = { limit, order, page };
                    res = await getAllBreeds(params);
                }

                let breedsData = res.data.filter(breed => breed.image?.url);

                if (breedId) {
                    breedsData = breedsData.filter(breed => breed.id === breedId);
                }

                const cards = breedsData.map(breed => ({
                    id: breed.id,
                    url: breed.image.url,
                    name: breed.name,
                }));

                setImages(cards);
                if (!breedId && res.headers['pagination-count']) {
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
    }, [breedId, limit, order, page]);

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

    return (
        <div className={styles.page}>
            <div className={styles.breedPageToolbar}>
                <Breadcrumbs />
                <div className={styles.breedPageFilters}>
                    <Dropdown
                        id='breeds-selector'
                        alt='Breeds selector'
                        onChange={(e) => setBreedId(e.target.value)}
                        value={''}
                    >
                        <option value=''>All breeds</option>
                        {breeds.map((breed) => (
                            <option key={breed.id} value={breed.id}>
                                {breed.name}
                            </option>
                        ))}
                    </Dropdown>
                    <Dropdown
                        id='limit-selector'
                        alt='Limit selector'
                        onChange={(e) => {
                            setLimit(e.target.value);
                            setPage(0);
                        } }
                        value={limit}
                        disabled={!!breedId}
                    >
                        <option value="5">Limit: 5</option>
                        <option value="10">Limit: 10</option>
                        <option value="15">Limit: 15</option>
                        <option value="20">Limit: 20</option>
                    </Dropdown>
                    <OrderRadioButton
                        value={order}
                        onChange={(e) => {
                            setOrder(e.target.value);
                            setPage(0);
                        } }
                        disabled={!!breedId}
                    />
                </div>
            </div>
            {isLoading ? (
                <Loader />
            ) : (
                <div className={styles.gridWrapper}>
                    <ImageGrid>
                        {images.map((img) => (
                            <BreedCard
                                key={img.id}
                                imageUrl={img.url}
                                breedName={img.name}
                                onClick={() => navigate(`/breeds/${img.id}`)}
                            />
                        ))}
                    </ImageGrid>
                    {!breedId && (
                        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
                    )}
                </div>
            )}
        </div>
    );
}