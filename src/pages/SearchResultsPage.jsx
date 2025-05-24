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
    const [filteredBreeds, setFilteredBreeds] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const query = searchParams.get('query') || '';

    useEffect(() => {
        const fetchBreeds = async () => {
            setIsLoading(true);
            try {
                const res = await getAllBreeds();
                const matched = res.data.filter(b =>
                    b.name.toLowerCase().includes(query.toLowerCase()) && b.image?.url
                );
                const cards = matched.map(b => ({
                    id: b.id,
                    url: b.image.url,
                    name: b.name
                }));
                setFilteredBreeds(cards);
            } catch (err) {
                console.error('Failed to fetch breeds', err);
            } finally {
                setIsLoading(false);
            }
        };

        if (query.trim()) {
            fetchBreeds();
        }
    }, [query]);

    return (
        <div className={styles.page}>
            <Breadcrumbs />
            <p className="subtitle">
                Search results for: <span className="subtitle bold">{query}</span>
            </p>

            {isLoading ? (
                <Loader />
            ) : filteredBreeds.length > 0 ? (
                <ImageGrid>
                    {filteredBreeds.map(breed => (
                        <BreedCard
                            key={breed.id}
                            imageUrl={breed.url}
                            breedName={breed.name}
                            onClick={() => navigate(`/breeds/${breed.id}`)}
                        />
                    ))}
                </ImageGrid>
            ) : (
                <p className={styles.nothingFound}>No item found</p>
            )}
        </div>
    );
}