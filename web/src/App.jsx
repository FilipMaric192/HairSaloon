import HomePage from "./pages/homePage";
import { Routes, Route } from "react-router-dom";
import BookingPage from "./pages/bookingPage";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/booking" element={<BookingPage />} />
    </Routes>
  );
}
