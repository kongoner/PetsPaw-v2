import { useEffect, useState } from 'react';
import styles from './page.module.scss';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import VoteButtons from '../components/Buttons/VoteButtons/VoteButtons';
import { getRandomImageForVoting, voteForImage } from '../api/voting';
import { getUserVotes } from '../api/logs';
import UserLog from '../components/UserLog/UserLog';
import Loader from '../components/Loader/Loader';

export default function VotingPage() {
  const [image, setImage] = useState(null);
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNewImage = async () => {
    try {
      setIsLoading(true);
      const res = await getRandomImageForVoting();
      setImage(res.data[0]);
    } catch (err) {
      console.error('Failed to load cat image', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLogs = async () => {
    try {
      const res = await getUserVotes(5);
      const parsed = res.data.map((entry) => {
        let actionType = '';
        if (entry.value === 1) actionType = 'like';
        else if (entry.value === 2) actionType = 'favourite';
        else if (entry.value === 3) actionType = 'dislike';
        return {
          timestamp: entry.created_at.slice(11, 16),
          imageId: entry.image_id,
          actionType,
        };
      });
      setLogs(parsed);
    } catch (err) {
      console.error('Failed to load logs', err);
    }
  };

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      await Promise.all([fetchNewImage(), fetchLogs()]);
      setIsLoading(false);
    };
    init();
  }, []);

  const handleVote = async (value) => {
    if (!image) return;
    setIsLoading(true);
    await voteForImage(image.id, value);
    await Promise.all([fetchNewImage(), fetchLogs()]);
    setIsLoading(false);
  };

  return (
    <div className={styles.page}>
      <Breadcrumbs />
      <div className={styles.candidateContainer}>
        <div className={styles.voteImageWrapper}>
          {isLoading ? (
            <Loader />
          ) : (
            image && (
              <img
                className={styles.candidateImage}
                src={image.url}
                alt="Cat candidate"
              />
            )
          )}
        </div>
        <VoteButtons
          onLike={() => handleVote(1)}
          onFavourite={() => handleVote(2)}
          onDislike={() => handleVote(3)}
        />
      </div>
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
    </div>
  );
}