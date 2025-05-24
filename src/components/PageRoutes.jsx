import { Routes, Route } from 'react-router-dom';
import VotingPage from '../pages/VotingPage';
import BreedsPage from '../pages/BreedsPage';
import GalleryPage from '../pages/GalleryPage';
import BreedInfoPage from '../pages/BreedInfoPage';
import SearchResultsPage from '../pages/SearchResultsPage';
import LikesPage from '../pages/LikesPage';
import FavouritesPage from '../pages/FavouritesPage';
import DislikesPage from '../pages/DislikesPage';

export default function PageRoutes() {
  return (
    <Routes>
      <Route path="/voting" element={<VotingPage />} />
      <Route path="/breeds" element={<BreedsPage />} />
      <Route path="/breeds/:breedId" element={<BreedInfoPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/breedInfo" element={<BreedInfoPage />} />
      <Route path="/search" element={<SearchResultsPage />} />
      <Route path="/likes" element={<LikesPage />} />
      <Route path="/favourites" element={<FavouritesPage />} />
      <Route path="/dislikes" element={<DislikesPage />} />
    </Routes>
  );
}