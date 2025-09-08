import React from "react";
import { Link } from "react-router-dom";
import {
  Globe,
  TrendingUp,
  Users,
  Award,
  MapPin,
  ArrowRight,
  Star,
} from "lucide-react";
import GlobalNetworkImage from "../assets/images/global-network-connectivity-stockcake.jpg";

const GlobalMarketsPage: React.FC = () => {
  const middleEastMarkets = [
    {
      id: "middle-east",
      name: "Middle East",
      countries: ["UAE", "Saudi Arabia", "Qatar", "Kuwait", "Bahrain", "Oman"],
      description: "Strategic hub for premium agricultural exports",
      growth: "35%",
      color: "from-amber-500 to-amber-600",
      image: "/src/assets/images/Middle-East-Map.jpg",
      coordinates: [25.2048, 55.2708], // Dubai
      markerColor: "#f59e0b",
      type: "Premium Market",
      marketSize: "$2.5B",
      keyProducts: "Rice, Spices, Nuts",
    },
  ];

  const marketInsights = [
    {
      title: "Rice Market Growth",
      description:
        "Global rice consumption expected to increase by 15% by 2030",
      trend: "+15%",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      title: "Organic Products Demand",
      description: "Organic food market growing at 12% annually worldwide",
      trend: "+12%",
      color: "from-amber-500 to-amber-600",
    },
    {
      title: "Premium Spices Market",
      description:
        "High-end spice market expanding rapidly in developed economies",
      trend: "+18%",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Sustainable Trade",
      description:
        "Increasing demand for ethically sourced agricultural products",
      trend: "+22%",
      color: "from-purple-500 to-purple-600",
    },
  ];

  const stats = [
    { icon: Users, value: "1000+", label: "Middle East Clients" },
    { icon: Globe, value: "8", label: "Middle East Countries" },
    { icon: TrendingUp, value: "35%", label: "Annual Growth" },
    { icon: Star, value: "4.9/5", label: "Client Rating" },
  ];

  const successMetrics = [
    {
      metric: "Market Penetration",
      value: "85%",
      description: "Successfully established presence in target markets",
    },
    {
      metric: "Client Retention",
      value: "92%",
      description: "Long-term partnerships with global clients",
    },
    {
      metric: "Quality Rating",
      value: "98%",
      description: "Products meeting international quality standards",
    },
    {
      metric: "Delivery Success",
      value: "99.5%",
      description: "On-time delivery performance across all markets",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-serif">
            Global <span className="text-amber-400">Markets</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            Expanding India's agricultural excellence across the Middle East,
            building lasting partnerships and delivering premium quality to
            discerning customers in the region.
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

      {/* Regional Markets Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
              Regional <span className="text-emerald-600">Markets</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our strategic presence across key global regions, serving diverse
              markets with tailored solutions and local expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {middleEastMarkets.map((region, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={region.image}
                    alt={region.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {region.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-amber-300" />
                      <span className="text-amber-300 text-sm">
                        {region.growth} Growth
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {region.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">
                      Key Countries:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {region.countries.map((country, countryIndex) => (
                        <span
                          key={countryIndex}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                        >
                          {country}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div
                      className={`px-4 py-2 bg-gradient-to-r ${region.color} text-white rounded-full text-sm font-semibold`}
                    >
                      {region.growth} Growth
                    </div>
                    <Link
                      to="/contact"
                      className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm flex items-center space-x-1 group-hover:translate-x-1 transition-transform duration-300"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Insights Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
              Market <span className="text-emerald-600">Insights</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay informed about global agricultural market trends and
              opportunities that shape our export strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {marketInsights.map((insight, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 group"
              >
                <div
                  className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${insight.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {insight.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {insight.description}
                </p>
                <div
                  className={`text-2xl font-bold bg-gradient-to-r ${insight.color} bg-clip-text text-transparent`}
                >
                  {insight.trend}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
              Success <span className="text-emerald-600">Metrics</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Measurable achievements that demonstrate our commitment to
              excellence and customer satisfaction across global markets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {successMetrics.map((metric, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-white hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-10 h-10 text-emerald-600" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-emerald-600 mb-2">
                  {metric.value}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {metric.metric}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Network Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
                Our Global <span className="text-emerald-600">Network</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  With over 25 years of experience in international trade, we've
                  built a robust network of partners, distributors, and clients
                  across the globe. Our presence spans from emerging markets to
                  established economies.
                </p>
                <p>
                  Each market presents unique opportunities and challenges, and
                  we've developed specialized strategies to serve diverse
                  customer needs while maintaining our commitment to quality and
                  reliability.
                </p>
                <p>
                  Our global network enables us to provide local expertise,
                  cultural understanding, and market-specific solutions that
                  drive success for our partners worldwide.
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/partnerships"
                  className="bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Become a Partner</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/products"
                  className="border-2 border-emerald-600 text-emerald-600 px-8 py-3 rounded-full font-semibold hover:bg-emerald-600 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl shadow-2xl">
                <div
                  className="w-full h-full bg-cover bg-center rounded-2xl opacity-80"
                  style={{
                    backgroundImage: `url(${GlobalNetworkImage})`,
                  }}
                ></div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -top-6 -right-6 bg-white p-6 rounded-2xl shadow-xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600">1+</div>
                  <div className="text-gray-600 font-semibold">Countries</div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600">25+</div>
                  <div className="text-gray-600 font-semibold">Years</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">
            Ready to Explore{" "}
            <span className="text-amber-400">Global Markets?</span>
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Join our network of successful global partners and discover the
            opportunities that await in international agricultural trade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-emerald-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/partnerships"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-emerald-600 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Partnership Info</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GlobalMarketsPage;
