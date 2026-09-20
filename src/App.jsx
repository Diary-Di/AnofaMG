import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PublishListingPage from "./pages/PublishListingPage";
import SearchResultsPage from "./pages/SearchResultsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/publier" element={<PublishListingPage />} />
        <Route path="/recherche" element={<SearchResultsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
