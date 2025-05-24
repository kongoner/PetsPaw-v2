import styles from './page.module.scss';
import { useEffect, useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import ImageGrid from '../components/ImageGrid/ImageGrid';
import GalleryFavouriteCard from '../components/ImageCards/GalleryFavouriteCard';
import Loader from '../components/Loader/Loader';
import UserLog from '../components/UserLog/UserLog';
import { getVotesByType } from '../api/logs';

export default function FavouritesPage() {
    const [images, setImages] = useState([]);
    const [logs, setLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchLikes = async () => {
            setIsLoading(true);
            try {
                const votes = await getVotesByType(2); // 2 = favourites
                const uniqueImages = votes.map(v => ({
                    id: v.image_id,
                    url: v.image?.url,
                    created_at: v.created_at
                }));
                setImages(uniqueImages);

                const parsedLogs = uniqueImages.map((img) => ({
                    timestamp: img.created_at.slice(11, 16),
                    imageId: img.id,
                    actionType: 'favourite'
                }));
                setLogs(parsedLogs);
            } catch (err) {
                console.error('Failed to load favourite images or logs', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLikes();
    }, []);

    return (
            <div className={styles.page}>
                <Breadcrumbs />
                {isLoading ? (
                    <Loader />
                ) : images.length === 0 ? (
                    <p className={styles.nothingFound}>No item found</p>
                ) : (
                    <>
                        <ImageGrid>
                            {images.map((img) => (
                                <GalleryFavouriteCard key={img.id} imageId={img.id} imageUrl={img.url} />
                            ))}
                        </ImageGrid>
                        <div className={styles.userActionLogs}>
                            {logs.map((log) => (
                                <UserLog
                                    key={`${log.imageId}-${log.timestamp}`}
                                    timestamp={log.timestamp}
                                    imageId={log.imageId}
                                    actionType={log.actionType}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        );
    }