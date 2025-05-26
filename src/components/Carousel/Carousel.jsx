import styles from './carousel.module.scss';
import { useState, useEffect, useRef } from 'react';

export default function Carousel({ data }) {
	// State to keep track of the current slide index
	const [currentIndex, setCurrentIndex] = useState(0);
	// Ref to store timeout id for auto-sliding
	const timeoutRef = useRef(null);
	const delay = 5000; // Time between slides in milliseconds

	// Automatically switch to the next slide after a delay
	useEffect(() => {
		timeoutRef.current = setTimeout(() => {
			setCurrentIndex((prevIndex) =>
				prevIndex === data.length - 1 ? 0 : prevIndex + 1,
			);
		}, delay);
		// Clear the timeout if the component unmounts or index changes
		return () => clearTimeout(timeoutRef.current);
	}, [currentIndex, data.length]);

	// Manually switch to a specific slide (dot navigation)
	const goToSlide = (index) => {
		setCurrentIndex(index);
	};

	return (
		<div className={styles.carouselWrapper}>
			<div className={styles.carousel}>
				{data.map((item, index) => (
					<div
						className={styles.carouselItem}
						key={index}
						style={{
							transform: `translateX(-${currentIndex * 100}%)`,
						}}
					>
						<img src={item.url} alt={`Slide ${index}`} />
					</div>
				))}
			</div>
			{/* Dot navigation for slides */}
			<div className={styles.dotsWrapper}>
				{data.map((_, index) => (
					<div
						key={index}
						className={`${styles.dot} ${
							index === currentIndex ? styles.activeDot : ''
						}`}
						onClick={() => goToSlide(index)}
					></div>
				))}
			</div>
		</div>
	);
}
