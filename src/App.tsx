import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import ScrollToTop from "./components/Layout/ScrollToTop";
import ScrollToTopButton from "./components/Layout/ScrollToTopButton";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import GlobalMarketsPage from "./pages/GlobalMarketsPage";
import PartnershipsPage from "./pages/PartnershipsPage";
import TeamPage from "./pages/TeamPage";
import ContactPage from "./pages/ContactPage";
import QuoteRequestPage from "./pages/QuoteRequestPage";

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:categoryId" element={<ProductsPage />} />
            <Route
              path="/products/:categoryId/:productId"
              element={<ProductDetailPage />}
            />
            <Route path="/global-markets" element={<GlobalMarketsPage />} />
            <Route path="/partnerships" element={<PartnershipsPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/quote" element={<QuoteRequestPage />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTopButton />
      </div>
    </Router>
  );
}

export default App;
