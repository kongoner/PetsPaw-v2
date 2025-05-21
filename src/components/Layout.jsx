import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MainSection from './MainSection/MainSection';
import Toolbar from './Toolbar/Toolbar';
import PageRoutes from './PageRoutes';
import './layout.scss'; 

export default function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.body.getAttribute('data-theme') === 'dark');
    };

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });

    return () => observer.disconnect();
  }, []);

  const hero1x = isDark ? 'src/images/girl-and-pet-light@1x.webp' : 'src/images/girl-and-pet@1x.webp';
  const hero2x = isDark ? 'src/images/girl-and-pet-light@2x.webp' : 'src/images/girl-and-pet@2x.webp';

  return (
    <section className="container">
      <div className={`contentLeft ${!isHome ? 'hideOnTablet' : ''}`}>
        <MainSection />
      </div>

      <div className="contentRight">
        {isHome ? (
          <img
            className="heroImage"
            src={hero1x}
            srcSet={`${hero2x} 2x`}
            alt="Girl and pet"
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