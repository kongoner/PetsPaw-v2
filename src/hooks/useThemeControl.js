import { useEffect, useState } from 'react';

export default function useThemeControl() {
	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		const saved = localStorage.getItem('theme');
		const prefersDark = window.matchMedia(
			'(prefers-color-scheme: dark)',
		).matches;
		const useDark = saved === 'dark' || (!saved && prefersDark);

		document.body.setAttribute('data-theme', useDark ? 'dark' : 'light');
		setIsDarkMode(useDark);
	}, []);

	const toggleTheme = () => {
		const newTheme = isDarkMode ? 'light' : 'dark';
		localStorage.setItem('theme', newTheme);
		document.body.setAttribute('data-theme', newTheme);
		setIsDarkMode(!isDarkMode);
	};

	return [isDarkMode, toggleTheme];
}
