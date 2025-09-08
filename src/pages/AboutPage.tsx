import React from "react";
import { Link } from "react-router-dom";
import {
  Award,
  Users,
  Globe,
  TrendingUp,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const AboutPage: React.FC = () => {
  const stats = [
    { icon: Globe, value: "1+", label: "Countries Served" },
    { icon: Users, value: "10+", label: "Happy Clients" },
    { icon: Award, value: "25+", label: "Years Experience" },
    { icon: TrendingUp, value: "95%", label: "Success Rate" },
  ];

  const values = [
    {
      title: "Quality Excellence",
      description:
        "We maintain the highest standards of quality in all our products and services.",
      icon: CheckCircle,
    },
    {
      title: "Global Reach",
      description:
        "Connecting India's finest agricultural products to markets worldwide.",
      icon: Globe,
    },
    {
      title: "Sustainable Growth",
      description:
        "Committed to environmentally responsible and sustainable business practices.",
      icon: TrendingUp,
    },
    {
      title: "Customer Focus",
      description:
        "Building long-term relationships through exceptional service and support.",
      icon: Users,
    },
  ];

  const timeline = [
    {
      year: "1998",
      title: "Company Founded",
      description:
        "Started as a small export business in agricultural products.",
    },
    {
      year: "2005",
      title: "Global Expansion",
      description:
        "Expanded operations to 20+ countries across Asia and Europe.",
    },
    {
      year: "2012",
      title: "Quality Certification",
      description:
        "Achieved ISO 9001:2015 certification for quality management.",
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description: "Launched comprehensive digital platform for global trade.",
    },
    {
      year: "2024",
      title: "Market Leader",
      description:
        "Established as a leading agricultural export company in India.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-serif">
            About <span className="text-amber-400">Namaste EXIM</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            Connecting India's finest agricultural products to global markets
            with excellence, sustainability, and unwavering commitment to
            quality since 1998.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-10 h-10 text-emerald-600" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-lg text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
                Our <span className="text-emerald-600">Story</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded in 1998, Namaste EXIM began as a small family business
                with a vision to showcase India's rich agricultural heritage to
                the world. What started as a modest export operation has grown
                into a global enterprise serving over 50 countries.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Today, we are proud to be one of India's leading agricultural
                export companies, known for our commitment to quality,
                sustainability, and customer satisfaction. Our journey reflects
                the resilience and excellence of Indian agriculture.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center space-x-2 bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-700 transform hover:scale-105 transition-all duration-300"
              >
                <span>Explore Our Products</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl shadow-2xl">
                <div
                  className="w-full h-full bg-cover bg-center rounded-2xl opacity-80"
                  style={{
                    backgroundImage:
                      'url("https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")',
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
              Our <span className="text-emerald-600">Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide our business and shape our relationships
              with customers, partners, and communities worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
              Our <span className="text-emerald-600">Journey</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A timeline of key milestones that have shaped our company's growth
              and success.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-emerald-200"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-emerald-600 rounded-full border-4 border-white shadow-lg"></div>

                  {/* Content */}
                  <div
                    className={`w-5/12 ${
                      index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"
                    }`}
                  >
                    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="text-2xl font-bold text-emerald-600 mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">
            Ready to Partner With Us?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Join our network of successful global partners and discover the
            opportunities that await in India's agricultural export market.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/partnerships"
              className="bg-white text-emerald-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
            >
              Become a Partner
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-emerald-600 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
