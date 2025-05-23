import { useEffect, useState } from 'react';
import styles from './page.module.scss';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import ImageGrid from '../components/ImageGrid/ImageGrid';
import BasicCard from '../components/ImageCards/BasicCard';
import Loader from '../components/Loader/Loader';
import UserLog from '../components/UserLog/UserLog';
import { getVotesByType } from '../api/logs';

export default function LikesPage() {
    const [images, setImages] = useState([]);
    const [logs, setLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchLikes = async () => {
            setIsLoading(true);
            try {
                const votes = await getVotesByType(1); // 1 = like
                const uniqueImages = votes.map(v => ({
                    id: v.image_id,
                    url: v.image?.url,
                    created_at: v.created_at
                }));
                setImages(uniqueImages);

                const parsedLogs = uniqueImages.map((img) => ({
                    timestamp: img.created_at.slice(11, 16),
                    imageId: img.id,
                    actionType: 'like'
                }));
                setLogs(parsedLogs);
            } catch (err) {
                console.error('Failed to load liked images or logs', err);
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
                            <BasicCard key={img.id} imageUrl={img.url} />
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