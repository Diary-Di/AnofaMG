import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Bell, X } from "lucide-react";
import HomePage from "./pages/HomePage";
import PublishListingPage from "./pages/PublishListingPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import { subscribeToTransactions } from "./services/websocket";

export default function App() {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    return subscribeToTransactions((transaction) => {
      setNotification(transaction);
      window.setTimeout(() => setNotification(null), 6000);
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/publier" element={<PublishListingPage />} />
          <Route path="/recherche" element={<SearchResultsPage />} />
        </Routes>
      </BrowserRouter>

      {notification && (
        <div
          role="status"
          aria-live="polite"
          className="fixed right-4 top-20 z-[60] flex w-[min(360px,calc(100vw-2rem))] items-start gap-3 rounded-[12px] border border-brand-blue/20 bg-white p-4 shadow-xl"
        >
          <Bell className="mt-0.5 shrink-0 text-brand-blue" size={20} />
          <div className="flex-1">
            <p className="font-semibold text-black">Nouvelle transaction</p>
            <p className="text-sm text-neutral-600">
              {notification.text || "Une annonce vient d'être créée."}
            </p>
          </div>
          <button
            type="button"
            aria-label="Fermer la notification"
            onClick={() => setNotification(null)}
            className="text-neutral-400 transition-colors hover:text-black"
          >
            <X size={18} />
          </button>
        </div>
      )}
    </>
  );
}
