import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Globe, Award, Users, TrendingUp } from "lucide-react";
import ExportImportImage from "../../assets/images/Export-Import.jpg";

const HeroSection: React.FC = () => {
  const [currentText, setCurrentText] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const rotatingTexts = [
    "India's Finest to the World",
    "Premium Quality Exports",
    "Global Agricultural Excellence",
    "Sustainable Trade Solutions",
  ];

  useEffect(() => {
    setIsVisible(true);

    // Rotate text
    const textInterval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % rotatingTexts.length);
    }, 4000);

    return () => {
      clearInterval(textInterval);
    };
  }, []);

  const stats = [
    { icon: Globe, value: "1+", label: "Countries Served" },
    { icon: Award, value: "25+", label: "Years Experience" },
    { icon: Users, value: "10+", label: "Happy Clients" },
    { icon: TrendingUp, value: "95%", label: "Success Rate" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${ExportImportImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Main Heading */}
        <div
          className={`mb-8 transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="mb-6">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-4 font-serif leading-tight">
              Namaste{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
                EXIM
              </span>
            </h1>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-light text-white/90 mb-4 font-serif leading-tight">
              Ventures
            </h2>
          </div>

          {/* Subtitle with enhanced animation */}
          <div className="h-24 mb-8 flex items-center justify-center">
            <p className="text-2xl md:text-4xl text-amber-300 font-light transition-all duration-1000 transform opacity-100">
              {rotatingTexts[currentText]}
            </p>
          </div>
        </div>

        {/* Description */}
        <div
          className={`mb-12 transition-all duration-1000 delay-300 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            Connecting India's finest agricultural products to global markets
            with excellence, sustainability, and unwavering commitment to
            quality.
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 transition-all duration-1000 delay-500 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <Link
            to="/products"
            className="group relative bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white px-10 py-5 rounded-full font-bold text-xl hover:shadow-2xl hover:shadow-amber-500/30 transform hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center space-x-3">
              <span>Explore Products</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>

          <Link
            to="/partnerships"
            className="group relative border-3 border-white/80 text-white hover:bg-white hover:text-gray-900 px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 flex items-center space-x-3 backdrop-blur-sm bg-white/10"
          >
            <span>Partner With Us</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>

        {/* Stats Section */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-700 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-8 h-8 text-amber-400" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-amber-200/80 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 hidden lg:block">
        <div className="w-32 h-32 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-full blur-3xl animate-pulse"></div>
      </div>
      <div className="absolute bottom-20 left-10 hidden lg:block">
        <div className="w-40 h-40 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
      </div>
    </section>
  );
};

export default HeroSection;
