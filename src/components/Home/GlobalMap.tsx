import React from "react";
import { Globe, Building, Users, TrendingUp } from "lucide-react";
import WorkingMap from "../UI/WorkingMap";

const GlobalMap: React.FC = () => {
  // Middle East market markers
  const marketMarkers = [
    {
      id: "uae-dubai",
      position: { lat: 25.2048, lng: 55.2708 },
      title: "UAE - Dubai",
      description: "Major hub for rice, jaggery, and premium products",
      type: "market" as const,
      details: {
        address: "Dubai, United Arab Emirates",
        phone: "+971 4 XXX XXXX",
        email: "uae@namasteeximventures.com",
        products: ["Basmati Rice", "Jaggery", "Spices", "Premium Nuts"],
        volume: "15,000+ MT annually",
      },
    },
    {
      id: "saudi-riyadh",
      position: { lat: 24.7136, lng: 46.6753 },
      title: "Saudi Arabia - Riyadh",
      description: "Growing demand for basmati rice and spices",
      type: "market" as const,
      details: {
        address: "Riyadh, Saudi Arabia",
        phone: "+966 11 XXX XXXX",
        email: "saudi@namasteeximventures.com",
        products: ["Basmati Rice", "Cardamom", "Black Pepper", "Cashews"],
        volume: "12,000+ MT annually",
      },
    },
    {
      id: "qatar-doha",
      position: { lat: 25.2854, lng: 51.531 },
      title: "Qatar - Doha",
      description: "Premium market for luxury food products",
      type: "market" as const,
      details: {
        address: "Doha, Qatar",
        phone: "+974 4 XXX XXXX",
        email: "qatar@namasteeximventures.com",
        products: ["Premium Rice", "Organic Spices", "Luxury Nuts"],
        volume: "8,000+ MT annually",
      },
    },
    {
      id: "kuwait-city",
      position: { lat: 29.3759, lng: 47.9774 },
      title: "Kuwait - Kuwait City",
      description: "Strong demand for traditional Indian products",
      type: "market" as const,
      details: {
        address: "Kuwait City, Kuwait",
        phone: "+965 2 XXX XXXX",
        email: "kuwait@namasteeximventures.com",
        products: ["Traditional Rice", "Jaggery", "Regional Spices"],
        volume: "6,000+ MT annually",
      },
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
        }}
      />

      {/* Middle East Economic Corridor Image */}
      <div className="absolute inset-0 flex items-center justify-center opacity-15">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white bg-opacity-90 rounded-2xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              India-Middle East-Europe Economic Corridor
            </h3>
            <p className="text-gray-700 mb-6">
              Strategic trade route connecting India, Middle East, and Europe
            </p>
            <div className="w-full h-64 bg-gradient-to-r from-emerald-100 via-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <Globe className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                <p className="text-lg font-semibold text-gray-700">
                  Economic Corridor Map
                </p>
                <p className="text-sm text-gray-600">
                  India → Middle East → Europe
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Globe className="w-8 h-8 text-emerald-600" />
            <h2 className="text-4xl font-bold text-gray-900">
              Global Market Presence
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We serve markets across the Middle East with our premium
            agricultural products, ensuring quality and reliability in every
            shipment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Map Section */}
          <div className="order-2 lg:order-1">
            <WorkingMap
              center={{ lat: 26.0, lng: 50.0 }} // Center of Middle East
              zoom={5}
              markers={marketMarkers}
              height="500px"
              className="w-full"
            />
          </div>

          {/* Content Section */}
          <div className="order-1 lg:order-2">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Middle East Markets
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Our strategic presence in the Middle East allows us to serve
                  key markets efficiently, delivering premium Indian
                  agricultural products with unmatched quality and reliability.
                </p>
              </div>

              {/* Market Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <h4 className="font-semibold text-gray-900">UAE</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Major hub for rice, jaggery, and premium products
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <h4 className="font-semibold text-gray-900">
                      Saudi Arabia
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Growing demand for basmati rice and spices
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <h4 className="font-semibold text-gray-900">Qatar</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Premium market for luxury food products
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <h4 className="font-semibold text-gray-900">Kuwait</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Strong demand for traditional Indian products
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 rounded-2xl text-white">
                <h4 className="text-xl font-semibold mb-2">
                  Ready to Expand Your Market?
                </h4>
                <p className="text-emerald-100 mb-4">
                  Partner with us to access premium Indian agricultural products
                  across the Middle East region.
                </p>
                <button className="bg-white text-emerald-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                  Contact Our Team
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Global Network Connectivity Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Global Network Connectivity
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our extensive network spans continents, connecting premium Indian
              products with global markets through strategic partnerships and
              efficient logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Strategic Locations */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                Strategic Locations
              </h4>
              <p className="text-gray-600">
                Offices and warehouses strategically positioned across key
                markets for efficient distribution and customer support.
              </p>
            </div>

            {/* Global Partnerships */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-emerald-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                Global Partnerships
              </h4>
              <p className="text-gray-600">
                Strong relationships with distributors, retailers, and logistics
                partners worldwide ensuring seamless market access.
              </p>
            </div>

            {/* Market Growth */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                Market Growth
              </h4>
              <p className="text-gray-600">
                Expanding presence in emerging markets with growing demand for
                premium Indian agricultural products.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalMap;
