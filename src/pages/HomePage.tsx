import React from 'react';
import HeroSection from '../components/Home/HeroSection';
import CorePillars from '../components/Home/CorePillars';
import ProductPreview from '../components/Home/ProductPreview';
import GlobalMap from '../components/Home/GlobalMap';
import SustainabilitySnapshot from '../components/Home/SustainabilitySnapshot';
import QuickContact from '../components/Home/QuickContact';

const HomePage: React.FC = () => {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <CorePillars />
      <ProductPreview />
      <GlobalMap />
      <SustainabilitySnapshot />
      <QuickContact />
    </div>
  );
};

export default HomePage;