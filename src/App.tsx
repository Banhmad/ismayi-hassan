import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Accommodation from "./pages/Accommodation";
import AccommodationDetails from "./pages/AccommodationDetails";
import BookingConfirmation from "./pages/BookingConfirmation";
import Profile from "./pages/Profile";
import Retail from "./pages/Retail";
import RetailDetails from "./pages/RetailDetails";
import Grocery from "./pages/Grocery";
import Transportation from "./pages/Transportation";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/accommodation" element={<Accommodation />} />
          <Route path="/accommodation/:id" element={<AccommodationDetails />} />
          <Route
            path="/booking-confirmation/:id/:roomId"
            element={<BookingConfirmation />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/retail" element={<Retail />} />
          <Route path="/retail/:id" element={<RetailDetails />} />
          <Route path="/grocery" element={<Grocery />} />
          <Route path="/transportation" element={<Transportation />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
