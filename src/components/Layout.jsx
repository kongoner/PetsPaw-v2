import { useLocation } from 'react-router-dom';
import useThemeListener from '../hooks/useThemeListener';
import MainSection from './MainSection/MainSection';
import Toolbar from './Toolbar/Toolbar';
import PageRoutes from './PageRoutes';
import './layout.scss';

export default function Layout() {
	// Detect if current page is Home
	const { pathname } = useLocation();
	const isHome = pathname === '/';

	// Use custom hook for theme detection
	const isDarkMode = useThemeListener();

	// Determine hero image source based on theme
	const hero1x = isDarkMode
		? `${import.meta.env.BASE_URL}images/girl-and-pet-light@1x.webp`
		: `${import.meta.env.BASE_URL}images/girl-and-pet@1x.webp`;
	const hero2x = isDarkMode
		? `${import.meta.env.BASE_URL}images/girl-and-pet-light@2x.webp`
		: `${import.meta.env.BASE_URL}images/girl-and-pet@2x.webp`;

	// Layout container with conditional content
	return (
		<section className='container'>
			<div className={`contentLeft ${!isHome ? 'hideOnTablet' : ''}`}>
				<MainSection />
			</div>

			<div className='contentRight'>
				{isHome ? (
					<img
						className='heroImage'
						src={hero1x}
						srcSet={`${hero2x} 2x`}
						alt='Girl and pet'
					/>
				) : (
					<>
						<Toolbar />
						<PageRoutes />
					</>
				)}
			</div>
		</section>
	);
}
